#!/usr/bin/env bun
/**
 * Build the Roxy UI bundles.
 *
 * Outputs (under packages/ui/dist/):
 *   index.js, index.cjs, index.d.ts                   ESM/CJS/types main entry
 *   components/{name}.js                              per-component ESM
 *   styles/tokens.css                                 token contract
 *   cdn/roxy-ui.js                                    UMD with Lit bundled, all elements registered
 *   cdn/components/{name}.js                          UMD per-component
 *   cdn/widgets.js                                    auto-mount script for [data-roxy-widget]
 *
 * All bundles use esbuild. Per-component is tree-shake friendly via the
 * manifest in src/index.ts.
 */
import { execSync } from 'node:child_process';
import {
	copyFile,
	mkdir,
	readdir,
	readFile,
	rm,
	writeFile,
} from 'node:fs/promises';
import { minifyHTMLLiterals } from '@lit-labs/rollup-plugin-minify-html-literals/lib/minify-html-literals.js';
import * as esbuild from 'esbuild';

const UI_DIR = 'packages/ui';
const SRC_COMPONENTS = `${UI_DIR}/src/components`;
const DIST = `${UI_DIR}/dist`;

// esbuild's minifier only rewrites JavaScript. Everything inside Lit's css`` and
// html`` tagged templates is an opaque string to it, so on its own those
// templates ship with every newline and indent they were authored with, which is
// most of the bundle. Run each source file through the Lit team's template-literal
// minifier first.
//
// We minify css`` and html`` only and leave svg`` fragments verbatim. An svg``
// fragment has no enclosing <svg> tag, so html-minifier does not see SVG context
// and strips the self-closing slash from sibling void-style elements (<line/>,
// <rect/>); the siblings then nest and the chart geometry disappears. SVG inside
// an html`` <svg> still minifies safely (it keeps its slashes), so the chart
// components lose almost nothing. The call is async and returns null when a file
// has nothing to minify; cache by path so a file is only processed once across
// the ESM, CJS, and CDN passes.
const litMinifyCache = new Map<string, string>();
function litTemplateMinify(): esbuild.Plugin {
	return {
		name: 'lit-template-minify',
		setup(build) {
			build.onLoad({ filter: /\.ts$/ }, async (args) => {
				const cached = litMinifyCache.get(args.path);
				if (cached !== undefined) return { contents: cached, loader: 'ts' };
				const source = await readFile(args.path, 'utf8');
				let out = source;
				try {
					const result = await minifyHTMLLiterals(source, {
						fileName: args.path,
						shouldMinify: (template) =>
							!!template.tag && template.tag.toLowerCase().includes('html'),
					});
					if (result) out = result.code;
				} catch (err) {
					console.warn(
						`! lit-template-minify skipped ${args.path} (${err instanceof Error ? err.message : String(err)})`,
					);
				}
				litMinifyCache.set(args.path, out);
				return { contents: out, loader: 'ts' };
			});
		},
	};
}

async function listComponents(): Promise<string[]> {
	const entries = await readdir(SRC_COMPONENTS, { withFileTypes: true });
	return entries
		.filter(
			(e) =>
				e.isFile() && e.name.endsWith('.ts') && !e.name.endsWith('.test.ts'),
		)
		.map((e) => e.name.replace(/\.ts$/, ''));
}

async function clean() {
	await rm(DIST, { recursive: true, force: true });
	await mkdir(DIST, { recursive: true });
	await mkdir(`${DIST}/components`, { recursive: true });
	await mkdir(`${DIST}/cdn/components`, { recursive: true });
	await mkdir(`${DIST}/styles`, { recursive: true });
}

async function buildEsm(components: string[]) {
	const entries: Record<string, string> = {
		index: `${UI_DIR}/src/index.ts`,
	};
	for (const c of components) {
		entries[`components/${c}`] = `${SRC_COMPONENTS}/${c}.ts`;
	}

	await esbuild.build({
		entryPoints: entries,
		outdir: DIST,
		format: 'esm',
		platform: 'browser',
		target: ['chrome120', 'firefox120', 'safari17', 'edge120'],
		bundle: true,
		minify: true,
		sourcemap: true,
		external: ['lit', 'lit/*', '@lit/*'],
		splitting: false,
		treeShaking: true,
		plugins: [litTemplateMinify()],
	});

	await esbuild.build({
		entryPoints: { index: `${UI_DIR}/src/index.ts` },
		outdir: DIST,
		format: 'cjs',
		platform: 'neutral',
		target: ['es2022'],
		bundle: true,
		minify: true,
		sourcemap: true,
		external: ['lit', 'lit/*', '@lit/*'],
		outExtension: { '.js': '.cjs' },
		plugins: [litTemplateMinify()],
	});
}

async function buildCdn(components: string[]) {
	// Full CDN bundle entry is src/cdn.ts (not src/index.ts): it registers every
	// element AND injects tokens.css so a single drop-in script tag yields full
	// theming + dark mode. Per-component CDN files below stay on the pure
	// component entry: a consumer reaching for one surgical component owns its
	// own token delivery (linked tokens.css or :root overrides), and forcing a
	// global stylesheet from each per-component file would fight that. Wiring
	// per-component auto-inject is tracked as a follow-up in docs/todo.md.
	await esbuild.build({
		entryPoints: { 'cdn/roxy-ui': `${UI_DIR}/src/cdn.ts` },
		outdir: DIST,
		format: 'iife',
		globalName: 'RoxyUI',
		platform: 'browser',
		target: ['chrome120', 'firefox120', 'safari17', 'edge120'],
		bundle: true,
		minify: true,
		sourcemap: true,
		plugins: [litTemplateMinify()],
	});

	for (const c of components) {
		await esbuild.build({
			entryPoints: { [`cdn/components/${c}`]: `${SRC_COMPONENTS}/${c}.ts` },
			outdir: DIST,
			format: 'iife',
			globalName: `RoxyUI_${c.replace(/-/g, '_')}`,
			platform: 'browser',
			target: ['chrome120', 'firefox120', 'safari17', 'edge120'],
			bundle: true,
			minify: true,
			sourcemap: true,
			plugins: [litTemplateMinify()],
		});
	}
}

async function copyAssets() {
	await copyFile(
		`${UI_DIR}/src/styles/tokens.css`,
		`${DIST}/styles/tokens.css`,
	);
}

async function syncSiteAssets() {
	const target = 'apps/docs/dist';
	await rm(target, { recursive: true, force: true });
	await mkdir(target, { recursive: true });
	await copyDir(DIST, target);
	await copyFile('specs/openapi.json', 'apps/docs/openapi.json');
}

async function copyDir(from: string, to: string) {
	await mkdir(to, { recursive: true });
	const entries = await readdir(from, { withFileTypes: true });
	for (const e of entries) {
		const src = `${from}/${e.name}`;
		const dst = `${to}/${e.name}`;
		if (e.isDirectory()) await copyDir(src, dst);
		else await copyFile(src, dst);
	}
}

// Each workspace publishes from its own package directory. npm auto-includes
// README.md, LICENSE, and AGENTS.md from that directory only, so the root
// files do not land in the tarball. Mirror all three into both packages on
// every build; the per-package copies are gitignored build artifacts and the
// root files are the single source of truth. AGENTS.md and LICENSE mirror
// verbatim. README is patched so each package renders its own primary
// install path first (jsDelivr UMD + Lit for `@roxyapi/ui`, `npm install
// @roxyapi/ui-react` + JSX for `@roxyapi/ui-react`); the body of every
// other section is shared.
async function copyRootDocsToWorkspaces() {
	const root = await Bun.file('README.md').text();
	const license = await Bun.file('LICENSE').text();
	const agents = await Bun.file('AGENTS.md').text();

	const uiInstall = `## Install

\`\`\`bash
npm install @roxyapi/ui
# or
bun add @roxyapi/ui
\`\`\`

\`\`\`ts
import '@roxyapi/ui';
// or per component
import '@roxyapi/ui/components/natal-chart';
\`\`\`

React users get a typed package with the same components.

\`\`\`bash
npm install @roxyapi/ui-react
\`\`\`

\`\`\`tsx
import { RoxyNatalChart } from '@roxyapi/ui-react';

export function Chart({ data }: { data: NatalChart }) {
\treturn <RoxyNatalChart data={data} />;
}
\`\`\``;

	const reactInstall = `## Install

\`\`\`bash
npm install @roxyapi/ui-react @roxyapi/sdk
\`\`\`

\`\`\`tsx
'use client';

import { RoxyNatalChart } from '@roxyapi/ui-react';

export function Chart({ data }: { data: NatalChart }) {
\treturn <RoxyNatalChart data={data} />;
}
\`\`\`

For frameworks that consume custom elements directly (Vue, Svelte, Angular, Solid, vanilla HTML, WordPress) install \`@roxyapi/ui\` instead.

\`\`\`bash
npm install @roxyapi/ui
\`\`\``;

	const installPattern = /^## Install[\s\S]*?(?=^## )/m;
	if (!installPattern.test(root)) {
		throw new Error(
			"copyRootDocsToWorkspaces: '## Install' section not found in README.md",
		);
	}
	const uiReadme = root.replace(installPattern, `${uiInstall}\n\n`);
	const reactReadme = root.replace(installPattern, `${reactInstall}\n\n`);

	await writeFile('packages/ui/README.md', uiReadme);
	await writeFile('packages/ui/LICENSE', license);
	await writeFile('packages/ui/AGENTS.md', agents);
	await writeFile('packages/ui-react/README.md', reactReadme);
	await writeFile('packages/ui-react/LICENSE', license);
	await writeFile('packages/ui-react/AGENTS.md', agents);
}

async function buildReactBundles() {
	const reactDist = 'packages/ui-react/dist';
	await mkdir(reactDist, { recursive: true });
	await mkdir(`${reactDist}/components`, { recursive: true });
	const components: Record<string, string> = {
		index: 'packages/ui-react/src/index.ts',
		'load-ui': 'packages/ui-react/src/load-ui.ts',
	};
	const reactComponents = (
		await readdir('packages/ui-react/src/components', {
			withFileTypes: true,
		})
	).filter((e) => e.isFile() && e.name.endsWith('.tsx'));
	for (const e of reactComponents) {
		components[`components/${e.name.replace(/\.tsx$/, '')}`] =
			`packages/ui-react/src/components/${e.name}`;
	}
	await esbuild.build({
		entryPoints: components,
		outdir: reactDist,
		format: 'esm',
		platform: 'browser',
		target: ['chrome120', 'firefox120', 'safari17', 'edge120'],
		bundle: true,
		minify: true,
		sourcemap: true,
		external: ['react', 'react-dom', 'react/jsx-runtime'],
		jsx: 'automatic',
	});
	await esbuild.build({
		entryPoints: { index: 'packages/ui-react/src/index.ts' },
		outdir: reactDist,
		format: 'cjs',
		platform: 'neutral',
		target: ['es2022'],
		bundle: true,
		minify: true,
		sourcemap: true,
		external: ['react', 'react-dom', 'react/jsx-runtime'],
		jsx: 'automatic',
		outExtension: { '.js': '.cjs' },
	});
}

async function buildTypes() {
	console.log('Building declaration files (ui)...');
	try {
		execSync('bunx tsc -p packages/ui/tsconfig.build.json', {
			stdio: 'inherit',
		});
	} catch (err) {
		console.warn(
			`! Type emit had issues for ui, continuing anyway (${err instanceof Error ? err.message : String(err)})`,
		);
	}
	console.log('Building declaration files (ui-react)...');
	try {
		execSync('bunx tsc -p packages/ui-react/tsconfig.build.json', {
			stdio: 'inherit',
		});
	} catch (err) {
		console.warn(
			`! Type emit had issues for ui-react, continuing anyway (${err instanceof Error ? err.message : String(err)})`,
		);
	}
}

// Deterministic build metadata: only the component list. A timestamp here
// would diff on every build and pollute git history of the committed dist.
async function emitMetadata(components: string[]) {
	const meta = { components };
	await writeFile(
		`${DIST}/manifest.json`,
		`${JSON.stringify(meta, null, 2)}\n`,
	);
}

async function main() {
	console.log('Syncing version...');
	execSync('bun run scripts/sync-version.ts', { stdio: 'inherit' });

	console.log('Syncing token CSS string for CDN injection...');
	execSync('bun run scripts/sync-tokens.ts', { stdio: 'inherit' });

	console.log('Syncing docs manifest mirror...');
	execSync('bun run scripts/sync-manifest.ts', { stdio: 'inherit' });

	console.log('Cleaning dist...');
	await clean();

	const components = await listComponents();
	console.log(`Found ${components.length} components.`);

	console.log('Building ESM and CJS...');
	await buildEsm(components);

	console.log('Building CDN UMD...');
	await buildCdn(components);

	console.log('Copying assets...');
	await copyAssets();

	console.log('Mirroring README and LICENSE into each workspace...');
	await copyRootDocsToWorkspaces();

	console.log('Generating widgets entry...');
	execSync('bun run scripts/build-widgets.ts', { stdio: 'inherit' });

	console.log('Generating React component wrappers...');
	execSync('bun run scripts/build-react.ts', { stdio: 'inherit' });

	console.log('Building React wrapper bundles...');
	await buildReactBundles();

	console.log('Generating shadcn registry...');
	execSync('bun run scripts/build-registry.ts', { stdio: 'inherit' });

	console.log('Emitting types...');
	await buildTypes();

	console.log('Writing manifest...');
	await emitMetadata(components);

	console.log('Syncing dist into apps/docs for preview parity with Pages...');
	await syncSiteAssets();

	// Format every codegen output through biome so the committed source matches
	// what pre-commit's biome-check would produce. Without this, codegen emits
	// double-quoted strings + un-sorted imports, biome reformats to single-quoted
	// + sorted, and every subsequent rebuild diffs against the committed file.
	console.log('Formatting codegen output...');
	try {
		execSync(
			'bunx biome check --write packages/ui-react/src registry apps/docs/manifest.js',
			{ stdio: 'inherit' },
		);
	} catch (err) {
		console.warn(
			`! biome format on codegen had issues (${err instanceof Error ? err.message : String(err)}); continuing.`,
		);
	}

	console.log('Build complete.');
}

main().catch((err) => {
	console.error('Build failed:', err);
	process.exit(1);
});
