#!/usr/bin/env bun
/**
 * Codegen thin React wrappers for each Lit element. The output package
 * @roxyapi/ui-react has NO runtime dependency on @roxyapi/ui. It lazy-loads
 * the jsdelivr UMD bundle on mount and renders the registered custom element
 * with prop forwarding and CustomEvent -> on{X} bridging.
 *
 * Decoupling rule: ui patches ship via jsdelivr without forcing a ui-react
 * release. ui-react releases only when the component list changes.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const COMPONENTS_FILE = 'packages/ui/src/index.ts';
const OUT_DIR = 'packages/ui-react/src';

const ROXY_UI_VERSION = '0.1.0';
const CDN_BASE = `https://cdn.jsdelivr.net/npm/@roxyapi/ui@${ROXY_UI_VERSION.split('.')[0]}/dist/cdn`;

async function readComponentList(): Promise<string[]> {
	const text = await readFile(COMPONENTS_FILE, 'utf8');
	const match = text.match(/ROXY_UI_COMPONENTS\s*=\s*\[([\s\S]*?)\]/);
	if (!match) throw new Error('Could not parse ROXY_UI_COMPONENTS');
	return match[1]
		.split(',')
		.map((s) => s.trim().replace(/['"]/g, ''))
		.filter(Boolean);
}

function pascalCase(name: string): string {
	return name
		.split('-')
		.map((s) => s.charAt(0).toUpperCase() + s.slice(1))
		.join('');
}

const LOAD_UI_TS = `/**
 * Idempotent jsdelivr UMD loader. Safe to call from many components on the
 * same page; only injects the script once per version. Skips on the server
 * (no document) so React server components do not break.
 */
const SCRIPT_ID = 'roxyapi-ui-loader';
const CDN_BASE = ${JSON.stringify(CDN_BASE)};

let loaded: Promise<void> | null = null;

export function ensureScriptLoaded(version: string = '${ROXY_UI_VERSION}'): Promise<void> {
	if (typeof document === 'undefined') return Promise.resolve();
	if (loaded) return loaded;

	loaded = new Promise<void>((resolve, reject) => {
		const major = version.split('.')[0];
		const url = \`\${CDN_BASE.replace('@${ROXY_UI_VERSION.split('.')[0]}', '@' + major)}/roxy-ui.js\`;
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
	name: string,
	pascal: string,
) => `import * as React from 'react';
import { ensureScriptLoaded } from '../load-ui.js';

type DivAttrs = React.HTMLAttributes<HTMLElement>;

export interface Roxy${pascal}Props extends Omit<DivAttrs, 'children' | 'onSelect'> {
	data?: unknown;
	[attr: string]: unknown;
}

export const Roxy${pascal} = React.forwardRef<HTMLElement, Roxy${pascal}Props>(
	function Roxy${pascal}({ data, ...rest }, ref) {
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

		return React.createElement('roxy-${name}', { ref: internal, ...rest });
	},
);
`;

async function main() {
	const components = await readComponentList();

	await mkdir(OUT_DIR, { recursive: true });
	await mkdir(`${OUT_DIR}/components`, { recursive: true });

	await writeFile(`${OUT_DIR}/load-ui.ts`, LOAD_UI_TS);

	const exportLines: string[] = [
		`export { ensureScriptLoaded } from './load-ui.js';`,
	];
	for (const name of components) {
		const pascal = `${pascalCase(name)}`;
		await writeFile(
			`${OUT_DIR}/components/${name}.tsx`,
			COMPONENT_TEMPLATE(name, pascal),
		);
		exportLines.push(
			`export { Roxy${pascal} } from './components/${name}.js';`,
		);
	}

	await writeFile(`${OUT_DIR}/index.ts`, `${exportLines.join('\n')}\n`);
	console.log(`Generated React wrappers for ${components.length} components.`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
