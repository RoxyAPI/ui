import { describe, expect, test } from 'bun:test';
import { existsSync, readdirSync, readFileSync } from 'node:fs';

/**
 * Every published subpath resolves to something the build wrote, and to the SAME module the package index uses.
 *
 * @remarks
 * A subpath is a promise in `package.json` and nothing checks it: a renamed source file, a generator that stopped writing one, or an entry missing from the bundler leaves an export that 404s at install time and nowhere earlier. The three packages also have to agree, because a consumer moving between them expects one name.
 *
 * `./tool-component` exists so a module that only maps an AI tool name to a component imports the lookup without the elements or the wrappers beside it. That only holds while the index RE-EXPORTS the subpath rather than declaring the same names again: two copies of the table would be two copies in the bundle.
 */
interface Pkg {
	name: string;
	exports: Record<
		string,
		{ types?: string; import?: string; require?: string } | string
	>;
}

const PACKAGES = ['ui', 'ui-react', 'ui-vue'] as const;

const read = (pkg: string): Pkg =>
	JSON.parse(
		readFileSync(new URL(`../../${pkg}/package.json`, import.meta.url), 'utf8'),
	) as Pkg;

const source = (pkg: string, file: string) =>
	new URL(`../../${pkg}/src/${file}`, import.meta.url);

describe('the ./tool-component subpath', () => {
	for (const pkg of PACKAGES) {
		describe(pkg, () => {
			const json = read(pkg);
			const entry = json.exports['./tool-component'];

			test('is DUAL, like the package root', () => {
				// A subpath offering only `import` throws
				// ERR_PACKAGE_PATH_NOT_EXPORTED under `require`, and this one is sold
				// for a route handler and a worker, which are exactly the places a
				// consumer may still be on CommonJS.
				expect(typeof entry).toBe('object');
				expect(entry).toEqual({
					types: './dist/tool-component.d.ts',
					import: './dist/tool-component.js',
					require: './dist/tool-component.cjs',
				});
			});

			test('has a source module the build can compile', () => {
				expect(existsSync(source(pkg, 'tool-component.ts'))).toBe(true);
			});

			test('is the module the package index re-exports, not a second copy', () => {
				const index = readFileSync(source(pkg, 'index.ts'), 'utf8');
				expect(index).toContain("from './tool-component.js'");
				expect(index).toContain('componentForTool');
				// The lookup and the decoder travel together: a page that draws a tool
				// result needs both, and reaching for one through the root would pull
				// the components back in.
				expect(index).toContain('expandCompact');
				expect(index).not.toContain("from './utils/tool-component.js'");
			});
		});
	}
});

describe('every published subpath resolves to a built file', () => {
	/**
	 * An entry that points at a path the build never writes installs cleanly and 404s on the first
	 * import, which is a failure a consumer finds rather than a gate. A pattern entry is checked by
	 * its directory plus at least one match, because the star stands for a name the consumer
	 * supplies.
	 *
	 * dist is a build artifact and gitignored, so this runs once `bun run build` has populated it,
	 * which is the order `ci.yml` uses.
	 */
	for (const pkg of PACKAGES) {
		test(`${pkg} names nothing the build does not write`, () => {
			const json = read(pkg);
			if (!existsSync(new URL(`../../${pkg}/dist`, import.meta.url))) return;
			const missing: string[] = [];
			for (const [subpath, entry] of Object.entries(json.exports)) {
				const targets =
					typeof entry === 'string' ? [entry] : Object.values(entry);
				for (const target of targets) {
					if (!target) continue;
					const rel = target.replace(/^\.\//, '');
					if (rel.includes('*')) {
						const [dir, tail] = rel.split('*');
						const at = new URL(`../../${pkg}/${dir}`, import.meta.url);
						const matched =
							existsSync(at) &&
							readdirSync(at).some((f) => f.endsWith(tail ?? ''));
						if (!matched) missing.push(`${subpath} -> ${target}`);
					} else if (
						!existsSync(new URL(`../../${pkg}/${rel}`, import.meta.url))
					) {
						missing.push(`${subpath} -> ${target}`);
					}
				}
			}
			expect(
				missing,
				`Published in package.json and absent from the tarball, so the import 404s:\n  ${missing.join('\n  ')}`,
			).toEqual([]);
		});
	}
});

describe('the ./jsx subpath', () => {
	test('is published by the React package only, which is the one with a JSX namespace', () => {
		expect(read('ui-react').exports['./jsx']).toEqual({
			types: './dist/jsx.d.ts',
			import: './dist/jsx.js',
			require: './dist/jsx.cjs',
		});
		expect(read('ui').exports['./jsx']).toBeUndefined();
		expect(read('ui-vue').exports['./jsx']).toBeUndefined();
		expect(existsSync(source('ui-react', 'jsx.ts'))).toBe(true);
	});
});
