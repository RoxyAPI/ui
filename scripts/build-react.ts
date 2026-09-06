#!/usr/bin/env bun
/**
 * Codegen for @roxyapi/ui-react. For every Lit element in the manifest,
 * emit a typed React component file that:
 *   - accepts a `data` prop typed against the spec-derived response type
 *     (mirrors the union aliases used in the matching Lit component);
 *   - bridges the documented widget CustomEvents (`roxy-submit`,
 *     `roxy-location-select`, `roxy-validation-error`, `roxy-spec-error`)
 *     to typed React handler props with proper cleanup;
 *   - forwards `className`, `style`, and arbitrary HTML attributes;
 *   - renders a role="alert" element if the bundle fails to load.
 *
 * Helper widgets that do not consume a typed RoxyAPI response (the
 * generic renderer, location search, and endpoint form) skip the `data`
 * prop entirely so the wrapper surface matches the underlying element.
 *
 * The type surface (which response each `data` takes, which config props and
 * events each element exposes) lives in `scripts/wrapper-meta.ts` and is shared
 * with the Vue generator. Add a component there, not here.
 *
 * It also emits `jsx.ts`, the raw-tag typings, for the other way a React page
 * renders these elements: the tag itself, server-side, with no wrapper and no
 * hydration. Attribute names and their types come from the elements' own
 * `@property` declarations through `scripts/element-attrs.ts`.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { ROXY_COMPONENTS } from '../packages/ui/src/manifest.js';
import {
	baseAttributes,
	type ElementAttr,
	extendsBase,
	ownAttributes,
} from './element-attrs.js';
import {
	emitToolHelpers,
	emitTypes,
	loadUiSource,
	TOOL_HELPER_EXPORTS,
	wrapperMeta,
} from './wrapper-meta.js';

const OUT_DIR = 'packages/ui-react/src';

const LOAD_UI_TS = loadUiSource({
	ssrNote: 'React server components and Next.js SSR work without a flash.',
	packageName: '@roxyapi/ui-react',
});

function buildComponent(slug: string, pascal: string, tag: string): string {
	const { dataType, hasData, config, events, typeRefs } = wrapperMeta(slug);

	const importLine =
		typeRefs.length > 0
			? `import type { ${typeRefs.join(', ')} } from '../types/index.js';`
			: '';

	const configPropsBlock = config
		.map((c) => `\t/** ${c.comment} */\n\t${c.prop}?: ${c.type};`)
		.join('\n');

	const configEffectBlocks = config
		.map(
			(c) => `\t\tReact.useEffect(() => {
\t\t\tconst el = internal.current;
\t\t\tif (el && ${c.prop} !== undefined) {
\t\t\t\t(el as unknown as { ${c.prop}: ${c.type} }).${c.prop} = ${c.prop};
\t\t\t}
\t\t}, [${c.prop}, loaded]);`,
		)
		.join('\n\n');

	const eventPropsBlock = events
		.map(
			(e) =>
				`\t/** Fires when the underlying <${tag}> dispatches \`${e.event}\`. */\n\t${e.prop}?: (event: CustomEvent<${e.detailType}>) => void;`,
		)
		.join('\n');

	const eventEffectBlocks = events
		.map((e) => {
			return `\t\tReact.useEffect(() => {
\t\t\tconst el = internal.current;
\t\t\tconst handler = ${e.prop};
\t\t\tif (!el || !handler) return;
\t\t\tconst listener = (event: Event) => handler(event as CustomEvent<${e.detailType}>);
\t\t\tel.addEventListener('${e.event}', listener);
\t\t\treturn () => el.removeEventListener('${e.event}', listener);
\t\t}, [${e.prop}, loaded]);`;
		})
		.join('\n\n');

	const handlerDestructure =
		events.length > 0 ? `, ${events.map((e) => e.prop).join(', ')}` : '';

	const configDestructure =
		config.length > 0 ? `, ${config.map((c) => c.prop).join(', ')}` : '';

	const dataDestructure = hasData ? 'data, ' : '';
	const dataPropDecl = hasData
		? `\t/** Spec-derived response payload. Pass the raw RoxyAPI response. */
\tdata?: ${dataType};
\t`
		: '\t';
	const elementAttrsOmit = hasData ? `'children' | 'data'` : `'children'`;
	const dataEffectBlock = hasData
		? `\t\tReact.useEffect(() => {
\t\t\tconst el = internal.current;
\t\t\tif (el && data !== undefined) {
\t\t\t\t(el as unknown as { data: unknown }).data = data;
\t\t\t}
\t\t}, [data, loaded]);

`
		: '';

	return `import * as React from 'react';
import { ensureScriptLoaded } from '../load-ui.js';
${importLine ? `${importLine}\n` : ''}
type ElementAttrs = Omit<
\tReact.HTMLAttributes<HTMLElement>,
\t${elementAttrsOmit}
>;

export interface ${pascal}Props extends ElementAttrs {
${dataPropDecl}className?: string;
\tstyle?: React.CSSProperties;
${configPropsBlock ? `${configPropsBlock}\n` : ''}${eventPropsBlock}
}

export const ${pascal} = React.forwardRef<HTMLElement | null, ${pascal}Props>(
\tfunction ${pascal}({ ${dataDestructure}className, style${configDestructure}${handlerDestructure}, ...rest }, ref) {
\t\tconst internal = React.useRef<HTMLElement | null>(null);
\t\tReact.useImperativeHandle<HTMLElement | null, HTMLElement | null>(
\t\t\tref,
\t\t\t() => internal.current,
\t\t\t[],
\t\t);
\t\tconst [loaded, setLoaded] = React.useState(false);
\t\tconst [error, setError] = React.useState<Error | null>(null);

\t\tReact.useEffect(() => {
\t\t\tlet active = true;
\t\t\tensureScriptLoaded()
\t\t\t\t.then(() => {
\t\t\t\t\tif (active) setLoaded(true);
\t\t\t\t})
\t\t\t\t.catch((err: unknown) => {
\t\t\t\t\tif (!active) return;
\t\t\t\t\tsetError(err instanceof Error ? err : new Error(String(err)));
\t\t\t\t});
\t\t\treturn () => {
\t\t\t\tactive = false;
\t\t\t};
\t\t}, []);

${dataEffectBlock}${configEffectBlocks ? `${configEffectBlocks}\n\n` : ''}${eventEffectBlocks ? `${eventEffectBlocks}\n\n` : ''}\t\tif (error) {
\t\t\treturn React.createElement(
\t\t\t\t'div',
\t\t\t\t{ role: 'alert', className, style },
\t\t\t\t\`Roxy UI script load failed: \${error.message}\`,
\t\t\t);
\t\t}

\t\treturn React.createElement('${tag}', {
\t\t\tref: internal,
\t\t\tclassName,
\t\t\tstyle,
\t\t\t...rest,
\t\t});
\t},
);
`;
}

/** One attribute as a typed, documented member of an element's JSX props. */
function attrMember(a: ElementAttr): string {
	const doc = a.comment ? `\t\t\t/** ${a.comment} */\n` : '';
	return `${doc}\t\t\t${JSON.stringify(a.attribute)}?: ${a.type};`;
}

/**
 * `jsx.ts`: the custom elements as JSX intrinsic elements, so a page can render `<roxy-tarot-spread>` as a tag and still be typed.
 *
 * @remarks
 * The React 19 shape, which is a module augmentation of `react` rather than of a global namespace: React 19 removed the global `JSX` namespace in favour of `React.JSX`, so an augmentation written the old way types nothing and reports no error.
 *
 * Every attribute is optional and every element also accepts the standard HTML attribute surface, which is where `className`, `style`, `slot`, `id`, `lang`, `dir` and `suppressHydrationWarning` come from. `data` is deliberately absent: it is declared `attribute: false` on the element, so it is set as a property (through a ref, or by using the wrapper component) and never written in markup.
 */
function buildJsxTypes(): string {
	const base = baseAttributes();
	const inherited = new Set(base.map((a) => a.attribute));
	const rows = ROXY_COMPONENTS.map(({ slug, tag, pascal }) => {
		const fromBase = extendsBase(slug);
		const own = ownAttributes(slug).filter(
			(a) => !fromBase || !inherited.has(a.attribute),
		);
		const parts = [
			...(fromBase ? ['RoxyBaseAttributes'] : []),
			...(own.length > 0
				? [`{\n${own.map(attrMember).join('\n')}\n\t\t}`]
				: []),
		];
		// `unknown` intersects away, so an element with no attributes of its own
		// still gets the standard HTML surface and nothing else.
		const attrs = parts.length > 0 ? parts.join(' & ') : 'unknown';
		return `\t\t\t/** \`<${pascal}>\` as a tag. */\n\t\t\t${JSON.stringify(tag)}: RoxyElement<${attrs}>;`;
	});

	return `/**
 * Raw-tag typings for the Roxy custom elements, so \`<roxy-natal-chart heading="Chart">\` type-checks in a React file with no wrapper component and no client JavaScript.
 *
 * @remarks
 * GENERATED. Import it once anywhere in your project and every Roxy tag is typed everywhere:
 *
 * \`\`\`ts
 * import '@roxyapi/ui-react/jsx';
 * \`\`\`
 *
 * The wrapper components remain the path for a page that passes a response: they set \`data\` as a property, which markup cannot carry. This file is for the other case, a tag rendered on the server and left alone.
 *
 * Attribute names are the elements' own: several are renamed at the element and the rest are lowercased, so they are read from the source rather than derived from the prop names.
 */
import type * as React from 'react';

/** The standard HTML attribute surface every custom element accepts, plus its own attributes. */
type RoxyElement<A> = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLElement>,
	HTMLElement
> &
	A;

/** The attributes every data component takes, from the shared base element. Referenced by the rows below, not exported: the public surface of this module is the tag typings themselves. */
interface RoxyBaseAttributes {
${base.map((a) => attrMember(a).replace(/^\t\t\t/gm, '\t')).join('\n')}
}

declare module 'react' {
	namespace JSX {
		interface IntrinsicElements {
${rows.join('\n')}
		}
	}
}
`;
}

async function main() {
	await mkdir(OUT_DIR, { recursive: true });
	await mkdir(`${OUT_DIR}/components`, { recursive: true });
	await emitTypes(OUT_DIR);
	await emitToolHelpers(OUT_DIR);
	await writeFile(`${OUT_DIR}/jsx.ts`, buildJsxTypes());

	await writeFile(`${OUT_DIR}/load-ui.ts`, LOAD_UI_TS);

	const exportLines: string[] = [
		`export {\n\tensureLocaleLoaded,\n\tensureScriptLoaded,\n\tROXY_UI_LOCALES,\n\tROXY_UI_VERSION,\n} from './load-ui.js';\n\n/**\n * Every response type these components accept, re-exported so you can type your own\n * fetch helper without installing a second package. For example:\n * import type { NatalChartResponse } from '@roxyapi/ui-react';\n */\nexport type * from './types/index.js';\n`,
	];
	for (const { slug, pascal, tag } of ROXY_COMPONENTS) {
		await writeFile(
			`${OUT_DIR}/components/${slug}.tsx`,
			buildComponent(slug, pascal, tag),
		);
		exportLines.push(
			`export { ${pascal}, type ${pascal}Props } from './components/${slug}.js';`,
		);
	}

	await writeFile(
		`${OUT_DIR}/index.ts`,
		`${exportLines.join('\n')}\n${TOOL_HELPER_EXPORTS}`,
	);
	console.log(
		`Generated React wrappers for ${ROXY_COMPONENTS.length} components.`,
	);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
