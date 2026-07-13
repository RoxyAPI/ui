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
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { ROXY_COMPONENTS } from '../packages/ui/src/manifest.js';
import { loadUiSource, wrapperMeta } from './wrapper-meta.js';

const OUT_DIR = 'packages/ui-react/src';

const LOAD_UI_TS = loadUiSource({
	ssrNote: 'React server components and Next.js SSR work without a flash.',
	packageName: '@roxyapi/ui-react',
});

function buildComponent(slug: string, pascal: string, tag: string): string {
	const { dataType, hasData, config, events, typeRefs } = wrapperMeta(slug);

	const importLine =
		typeRefs.length > 0
			? `import type { ${typeRefs.join(', ')} } from '@roxyapi/ui/types';`
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

async function main() {
	await mkdir(OUT_DIR, { recursive: true });
	await mkdir(`${OUT_DIR}/components`, { recursive: true });

	await writeFile(`${OUT_DIR}/load-ui.ts`, LOAD_UI_TS);

	const exportLines: string[] = [
		`export { ensureScriptLoaded, ROXY_UI_VERSION } from './load-ui.js';`,
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

	await writeFile(`${OUT_DIR}/index.ts`, `${exportLines.join('\n')}\n`);
	console.log(
		`Generated React wrappers for ${ROXY_COMPONENTS.length} components.`,
	);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
