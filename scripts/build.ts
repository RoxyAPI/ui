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
import { copyFile, mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import * as esbuild from 'esbuild';

const UI_DIR = 'packages/ui';
const SRC_COMPONENTS = `${UI_DIR}/src/components`;
const DIST = `${UI_DIR}/dist`;

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
		minify: false,
		sourcemap: true,
		external: ['lit', 'lit/*', '@lit/*'],
		splitting: false,
		treeShaking: true,
	});

	await esbuild.build({
		entryPoints: { index: `${UI_DIR}/src/index.ts` },
		outdir: DIST,
		format: 'cjs',
		platform: 'neutral',
		target: ['es2022'],
		bundle: true,
		minify: false,
		sourcemap: true,
		external: ['lit', 'lit/*', '@lit/*'],
		outExtension: { '.js': '.cjs' },
	});
}

async function buildCdn(components: string[]) {
	await esbuild.build({
		entryPoints: { 'cdn/roxy-ui': `${UI_DIR}/src/index.ts` },
		outdir: DIST,
		format: 'iife',
		globalName: 'RoxyUI',
		platform: 'browser',
		target: ['chrome120', 'firefox120', 'safari17', 'edge120'],
		bundle: true,
		minify: true,
		sourcemap: true,
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
// README.md and LICENSE from that directory only, so the root files do not
// land in the tarball. Copy them into both packages before each build so
// npmjs.com renders the same README the github repo shows.
async function copyRootDocsToWorkspaces() {
	const targets = ['packages/ui', 'packages/ui-react'];
	for (const target of targets) {
		await copyFile('README.md', `${target}/README.md`);
		await copyFile('LICENSE', `${target}/LICENSE`);
	}
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
		minify: false,
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
		minify: false,
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

async function emitMetadata(components: string[]) {
	const meta = {
		generatedAt: new Date().toISOString(),
		components,
	};
	await writeFile(`${DIST}/manifest.json`, JSON.stringify(meta, null, 2));
}

async function main() {
	console.log('Syncing version...');
	execSync('bun run scripts/sync-version.ts', { stdio: 'inherit' });

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

	console.log('Build complete.');
}

main().catch((err) => {
	console.error('Build failed:', err);
	process.exit(1);
});
