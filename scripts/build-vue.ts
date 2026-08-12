#!/usr/bin/env bun
/**
 * Codegen for @roxyapi/ui-vue. The Vue twin of `build-react.ts`: for every Lit
 * element in the manifest, emit a typed `defineComponent` wrapper that
 *   - accepts a `data` prop typed against the spec-derived response type;
 *   - exposes the element's config attributes as typed, camelCase props;
 *   - bridges the documented widget CustomEvents to typed handler props, so
 *     `@roxy-submit="fn"` works and is type-checked;
 *   - renders a role="alert" element if the bundle fails to load.
 *
 * The type surface lives in `scripts/wrapper-meta.ts`, shared with the React
 * generator. Add a component there, not here.
 *
 * @remarks
 * Two Vue-specific decisions, both verified against a real browser rather than
 * assumed, because getting either wrong silently ships a dead component.
 *
 * EVERY prop is bound as a DOM property (the `.`-prefixed vnode key, which is
 * what the `.prop` modifier compiles to), never as an attribute. Vue's default
 * for a custom element is an `in` check: present on the element means property,
 * absent means attribute. That default is wrong for us twice over. `data` is
 * declared `@property({ attribute: false })`, so an attribute is ignored
 * outright. The rest do not map to their own names: Lit reads `chartStyle` from
 * `chart-style` and `endpoint` from `data-endpoint`, so an attribute named after
 * the prop lands nowhere. Setting the property sidesteps the whole mapping and
 * matches what the React wrapper does.
 *
 * The bindings are declarative (no `loaded` flag, no imperative watcher). Vue's
 * patcher sets the property when it mounts the element, which for a lazily
 * loaded CDN bundle is BEFORE `customElements.define` has run for that tag.
 * Lit's ReactiveElement saves own instance properties set before upgrade and
 * re-applies them once the accessors exist, so the value survives.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { ROXY_COMPONENTS } from '../packages/ui/src/manifest.js';
import { emitTypes, loadUiSource, wrapperMeta } from './wrapper-meta.js';

const OUT_DIR = 'packages/ui-vue/src';

const LOAD_UI_TS = loadUiSource({
	ssrNote: 'Nuxt and Vue server rendering work without a flash.',
	packageName: '@roxyapi/ui-vue',
});

/**
 * Vue needs a runtime constructor alongside the compile-time `PropType`. Derive
 * it from the TS type so a future non-string config prop cannot silently be
 * declared as a String.
 */
function runtimeCtor(type: string): string {
	if (type === 'string' || type.startsWith("'")) return 'String';
	if (type === 'number') return 'Number';
	if (type === 'boolean') return 'Boolean';
	if (type.startsWith('(')) return 'Function';
	// A union whose every member is an array is still an Array at runtime, and
	// Vue warns on the console for the whole life of the app if one arrives
	// against a declared Object.
	if (type.split('|').every((t) => /^Array<|\[\]$/.test(t.trim())))
		return 'Array';
	return 'Object';
}

function buildComponent(slug: string, pascal: string, tag: string): string {
	const { dataType, hasData, config, events, typeRefs } = wrapperMeta(slug);

	/** One flat list so the props interface, the runtime `props` block, and the vnode binding all walk the same source. */
	const props: {
		name: string;
		type: string;
		comment: string;
		isEvent: boolean;
	}[] = [
		...(hasData
			? [
					{
						name: 'data',
						type: dataType,
						comment:
							'Spec-derived response payload. Pass the raw RoxyAPI response.',
						isEvent: false,
					},
				]
			: []),
		...config.map((c) => ({
			name: c.prop,
			type: c.type,
			comment: c.comment,
			isEvent: false,
		})),
		...events.map((e) => ({
			name: e.prop,
			type: `(event: CustomEvent<${e.detailType}>) => void`,
			comment: `Fires when the underlying <${tag}> dispatches \`${e.event}\`.`,
			isEvent: true,
		})),
	];

	const typeImport =
		typeRefs.length > 0
			? `import type { ${typeRefs.join(', ')} } from '../types/index.js';\n`
			: '';
	const vueImport =
		props.length > 0
			? `import { defineComponent, h, onMounted, type PropType, ref } from 'vue';`
			: `import { defineComponent, h, onMounted, ref } from 'vue';`;

	const propsInterface =
		props.length > 0
			? `export interface ${pascal}Props {
${props.map((p) => `\t/** ${p.comment} */\n\t${p.name}?: ${p.type};`).join('\n')}
}

`
			: '';

	// Each runtime prop reuses the exported interface as its single source of
	// truth, so the union is written once per file.
	const propsBlock =
		props.length > 0
			? `\tprops: {
${props
	.map(
		(p) =>
			`\t\t${p.name}: { type: ${runtimeCtor(p.type)} as PropType<${pascal}Props['${p.name}']> },`,
	)
	.join('\n')}
\t},
`
			: '';

	const setupArgs = props.length > 0 ? 'props' : '';

	// Event handlers go through Vue's `on*` channel (it hyphenates `onRoxySubmit`
	// to a `roxy-submit` listener). Everything else is forced to a DOM property.
	const bindingLines = props
		.map((p) =>
			p.isEvent
				? `\t\t\tif (props.${p.name}) elementProps.${p.name} = props.${p.name};`
				: `\t\t\tif (props.${p.name} !== undefined) elementProps['.${p.name}'] = props.${p.name};`,
		)
		.join('\n');

	const renderBody =
		props.length > 0
			? `\t\t\tconst elementProps: Record<string, unknown> = {};
${bindingLines}

\t\t\treturn h('${tag}', elementProps);`
			: `\t\t\treturn h('${tag}');`;

	return `${vueImport}
import { ensureScriptLoaded } from '../load-ui.js';
${typeImport}
${propsInterface}export const ${pascal} = defineComponent({
\tname: '${pascal}',
${propsBlock}\tsetup(${setupArgs}) {
\t\tconst loadError = ref<Error | null>(null);

\t\tonMounted(() => {
\t\t\tensureScriptLoaded().catch((err: unknown) => {
\t\t\t\tloadError.value = err instanceof Error ? err : new Error(String(err));
\t\t\t});
\t\t});

\t\treturn () => {
\t\t\tif (loadError.value) {
\t\t\t\treturn h(
\t\t\t\t\t'div',
\t\t\t\t\t{ role: 'alert' },
\t\t\t\t\t\`Roxy UI script load failed: \${loadError.value.message}\`,
\t\t\t\t);
\t\t\t}

${renderBody}
\t\t};
\t},
});
`;
}

async function main() {
	await mkdir(OUT_DIR, { recursive: true });
	await mkdir(`${OUT_DIR}/components`, { recursive: true });
	await emitTypes(OUT_DIR);

	await writeFile(`${OUT_DIR}/load-ui.ts`, LOAD_UI_TS);

	const exportLines: string[] = [
		`export {\n\tensureLocaleLoaded,\n\tensureScriptLoaded,\n\tROXY_UI_LOCALES,\n\tROXY_UI_VERSION,\n} from './load-ui.js';\n\n/**\n * Every response type these components accept, re-exported so you can type your own\n * fetch helper without installing a second package. For example:\n * import type { NatalChartResponse } from '@roxyapi/ui-vue';\n */\nexport type * from './types/index.js';\n`,
	];
	for (const { slug, pascal, tag } of ROXY_COMPONENTS) {
		await writeFile(
			`${OUT_DIR}/components/${slug}.ts`,
			buildComponent(slug, pascal, tag),
		);
		const meta = wrapperMeta(slug);
		const exportsProps =
			meta.hasData || meta.config.length > 0 || meta.events.length > 0;
		exportLines.push(
			exportsProps
				? `export { ${pascal}, type ${pascal}Props } from './components/${slug}.js';`
				: `export { ${pascal} } from './components/${slug}.js';`,
		);
	}

	await writeFile(`${OUT_DIR}/index.ts`, `${exportLines.join('\n')}\n`);
	console.log(
		`Generated Vue wrappers for ${ROXY_COMPONENTS.length} components.`,
	);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
