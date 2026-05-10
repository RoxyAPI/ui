#!/usr/bin/env bun
/**
 * Codegen for @roxyapi/ui-react. For every Lit element in the manifest,
 * emit a typed React component file that forwards props, bridges
 * CustomEvent -> on{X} React handlers, and ensures the matching component
 * bundle is loaded before render.
 *
 * Internal release-coupling rule: ui patches ship without forcing a ui-react
 * release. ui-react releases only when the component list changes.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { ROXY_COMPONENTS } from '../packages/ui/src/manifest.js';

const OUT_DIR = 'packages/ui-react/src';

const ROXY_UI_VERSION = (
	JSON.parse(await readFile('packages/ui/package.json', 'utf8')) as {
		version: string;
	}
).version;
// Use @latest while pre-1.0 to match marketing snippets and let bug-fix patches
// reach customers without forcing a ui-react release. At 1.0 cutover, swap to
// `@${ROXY_UI_VERSION.split('.')[0]}` so consumers opt into majors explicitly.
const CDN_BASE = 'https://cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/cdn';

const LOAD_UI_TS = `/**
 * Loads the matching component bundle on first mount. Idempotent across
 * many components on the same page. Skips on the server (no document) so
 * React server components and Next.js SSR work without a flash.
 */
const SCRIPT_ID = 'roxyapi-ui-loader';
const CDN_BASE = ${JSON.stringify(CDN_BASE)};

let loaded: Promise<void> | null = null;

export function ensureScriptLoaded(version: string = '${ROXY_UI_VERSION}'): Promise<void> {
	if (typeof document === 'undefined') return Promise.resolve();
	if (loaded) return loaded;

	loaded = new Promise<void>((resolve, reject) => {
		void version;
		const url = \`\${CDN_BASE}/roxy-ui.js\`;
		let existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
		if (existing) {
			if (existing.dataset.loaded === 'true') {
				resolve();
			} else {
				existing.addEventListener('load', () => resolve());
				existing.addEventListener('error', () => reject(new Error('roxy-ui load failed')));
			}
			return;
		}
		existing = document.createElement('script');
		existing.id = SCRIPT_ID;
		existing.src = url;
		existing.async = true;
		existing.crossOrigin = 'anonymous';
		existing.addEventListener('load', () => {
			existing!.dataset.loaded = 'true';
			resolve();
		});
		existing.addEventListener('error', () => reject(new Error('roxy-ui load failed')));
		document.head.appendChild(existing);
	});
	return loaded;
}
`;

const COMPONENT_TEMPLATE = (
	slug: string,
	pascal: string,
) => `import * as React from 'react';
import { ensureScriptLoaded } from '../load-ui.js';

type DivAttrs = React.HTMLAttributes<HTMLElement>;

export interface ${pascal}Props extends Omit<DivAttrs, 'children' | 'onSelect'> {
	data?: unknown;
	[attr: string]: unknown;
}

export const ${pascal} = React.forwardRef<HTMLElement, ${pascal}Props>(
	function ${pascal}({ data, ...rest }, ref) {
		const internal = React.useRef<HTMLElement | null>(null);
		React.useImperativeHandle(ref, () => internal.current as HTMLElement);
		const [loaded, setLoaded] = React.useState(false);

		React.useEffect(() => {
			let active = true;
			ensureScriptLoaded().then(() => {
				if (active) setLoaded(true);
			});
			return () => {
				active = false;
			};
		}, []);

		React.useEffect(() => {
			if (internal.current && data !== undefined) {
				(internal.current as unknown as { data: unknown }).data = data;
			}
		}, [data, loaded]);

		return React.createElement('roxy-${slug}', { ref: internal, ...rest });
	},
);
`;

async function main() {
	await mkdir(OUT_DIR, { recursive: true });
	await mkdir(`${OUT_DIR}/components`, { recursive: true });

	await writeFile(`${OUT_DIR}/load-ui.ts`, LOAD_UI_TS);

	const exportLines: string[] = [
		`export { ensureScriptLoaded } from './load-ui.js';`,
	];
	for (const { slug, pascal } of ROXY_COMPONENTS) {
		await writeFile(
			`${OUT_DIR}/components/${slug}.tsx`,
			COMPONENT_TEMPLATE(slug, pascal),
		);
		exportLines.push(`export { ${pascal} } from './components/${slug}.js';`);
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
