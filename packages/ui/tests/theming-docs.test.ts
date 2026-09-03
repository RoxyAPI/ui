/**
 * THEMING.md is the token contract a consumer themes against, so it may not drift from
 * `src/styles/tokens.css`.
 *
 * @remarks
 * This exists because the omission of `--roxy-surface` cost a downstream consumer real
 * time: a chart with no surface token renders as a white rectangle, and two integrations
 * ended up learning the token list from `tokens.css` rather than from the document written
 * for exactly that purpose. A doc nobody can trust is worse than no doc, because the
 * reader does not know which half is missing.
 *
 * @remarks
 * The table stays HAND-WRITTEN rather than generated. The "Used by" column is the part
 * worth reading and a generator would have to drop it, so the trade taken here is to keep
 * the prose and assert the facts: every token must appear, and the light and dark defaults
 * printed beside it must be the ones `tokens.css` actually sets. Presence alone would not
 * be enough — the first draft of the completed table carried a copy-pasted `--roxy-info-fg`
 * dark value, which reads perfectly and is simply wrong.
 */

import { describe, expect, test } from 'bun:test';

const TOKENS_CSS = 'packages/ui/src/styles/tokens.css';
const THEMING_MD = 'packages/ui/THEMING.md';

/** A `--roxy-*` declaration and its value, e.g. `['--roxy-bg', '#ffffff']`. */
const DECL = /(--roxy-[a-z0-9-]+)\s*:\s*([^;]+);/g;

/**
 * Tokens as `tokens.css` defines them, split by theme.
 *
 * The light set is everything declared before the first `prefers-color-scheme: dark`
 * block; the dark set is what that block redefines. Later blocks in the file are the
 * explicit `[data-theme]` opt-in and opt-out selectors, which restate the same pairs, so
 * reading the first of each is enough and keeps this parser from having to model the
 * whole cascade.
 */
async function tokensFromCss(): Promise<{
	light: Map<string, string>;
	dark: Map<string, string>;
}> {
	// Comments are blanked, not deleted, so every offset below still lines up with the
	// source. The file's own header prose names `@media (prefers-color-scheme: dark)`
	// while explaining the cascade, and searching the raw text finds THAT first, which
	// silently reads the light block as the dark one.
	const css = (await Bun.file(TOKENS_CSS).text()).replace(
		/\/\*[\s\S]*?\*\//g,
		(m) => m.replace(/[^\n]/g, ' '),
	);
	const darkAt = css.search(/@media\s*\(\s*prefers-color-scheme:\s*dark\s*\)/);
	expect(darkAt).toBeGreaterThan(-1);

	const read = (chunk: string) => {
		const out = new Map<string, string>();
		for (const [, name, value] of chunk.matchAll(DECL)) {
			// First declaration wins: a later selector block restating a token is the
			// same value under a different trigger.
			if (!out.has(name as string))
				out.set(name as string, (value as string).trim());
		}
		return out;
	};

	return {
		light: read(css.slice(0, darkAt)),
		dark: read(blockAt(css, darkAt)),
	};
}

/**
 * The body of the brace-delimited block starting at or after `from`, found by matching
 * braces rather than by searching for a closing pattern.
 *
 * Matching is the point. Locating the end with a literal like `\n}\n}` reads correctly
 * today and silently returns the REST OF THE FILE the moment the formatter changes how
 * those braces are laid out, which would hand the caller the `[data-theme="light"]` block
 * as if it were the dark one and quietly invert every assertion built on it.
 */
function blockAt(css: string, from: number): string {
	const open = css.indexOf('{', from);
	expect(open, 'no block opens after the dark media query').toBeGreaterThan(-1);

	let depth = 0;
	for (let i = open; i < css.length; i++) {
		if (css[i] === '{') depth++;
		else if (css[i] === '}') {
			depth--;
			if (depth === 0) return css.slice(open + 1, i);
		}
	}
	throw new Error(
		'tokens.css has an unbalanced brace after the dark media query',
	);
}

/** Every token the doc names anywhere: table row, prose or example. */
async function documentedTokens(): Promise<Set<string>> {
	const md = await Bun.file(THEMING_MD).text();
	return new Set(
		[...md.matchAll(/--roxy-[a-z0-9-]+/g)].map((m) => m[0] as string),
	);
}

/**
 * Token rows whose printed defaults can be compared, keyed by token.
 *
 * Deliberately narrow: only rows printing a bare HEX colour in both theme columns. That
 * is where drift is SILENT and unreadable, which is the whole risk (the first draft of
 * the completed table carried a copy-pasted `--roxy-info-fg` dark value that reads
 * perfectly and is simply wrong). Composite values are skipped on purpose: shadows are
 * abbreviated with an ellipsis for readability, and derived values like
 * `color-mix(... var(--roxy-accent) ...)` are prose-annotated. Asserting those would force
 * the doc to be a worse document to satisfy a test.
 */
async function comparableRows(): Promise<
	Map<string, { light: string; dark: string }>
> {
	const md = await Bun.file(THEMING_MD).text();
	const out = new Map<string, { light: string; dark: string }>();
	const HEX = /^#[0-9a-f]{3,8}$/i;

	const ROW =
		/^\|\s*`(--roxy-[a-z0-9-]+)`\s*\|\s*`([^`]+)`\s*\|\s*`([^`]+)`\s*\|/gm;
	for (const [, name, light, dark] of md.matchAll(ROW)) {
		if (HEX.test(light as string) && HEX.test(dark as string)) {
			out.set(name as string, { light: light as string, dark: dark as string });
		}
	}
	return out;
}

describe('THEMING.md is the token contract and may not drift from tokens.css', () => {
	test('every token tokens.css defines is documented', async () => {
		const { light } = await tokensFromCss();
		const doc = await documentedTokens();

		const undocumented = [...light.keys()].filter((t) => !doc.has(t)).sort();
		expect(
			undocumented,
			`Defined in ${TOKENS_CSS} and missing from ${THEMING_MD}. A consumer themes ` +
				'against this doc, so an omitted token is one they discover by reading our source ' +
				'or by shipping a broken chart:\n  ' +
				undocumented.join('\n  '),
		).toEqual([]);
	});

	test('every colour token has a ROW in the table, not only a mention in prose', async () => {
		const { light, dark } = await tokensFromCss();
		const rows = await comparableRows();
		const HEX = /^#[0-9a-f]{3,8}$/i;
		const missing = [...light.keys()]
			.filter(
				(t) => HEX.test(light.get(t) ?? '') && HEX.test(dark.get(t) ?? ''),
			)
			.filter((t) => !rows.has(t))
			.sort();
		expect(
			missing,
			'A hex-valued token named only in prose or a preset is invisible to a reader scanning ' +
				'the table, which is how the surface and secondary tokens went unbridged downstream:\n  ' +
				missing.join('\n  '),
		).toEqual([]);
	});

	test('the doc names no token that does not exist', async () => {
		const { light, dark } = await tokensFromCss();
		const doc = await documentedTokens();

		const invented = [...doc]
			.filter((t) => !light.has(t) && !dark.has(t))
			.sort();
		expect(
			invented,
			`Documented in ${THEMING_MD} but defined nowhere in ${TOKENS_CSS}. Overriding one ` +
				'of these does nothing, which is worse than an undocumented token:\n  ' +
				invented.join('\n  '),
		).toEqual([]);
	});

	test('every printed hex default is the one tokens.css sets', async () => {
		const { light, dark } = await tokensFromCss();
		const rows = await comparableRows();
		expect(
			rows.size,
			'the hex-row parser matched nothing, so this asserts nothing',
		).toBeGreaterThan(10);

		const wrong: string[] = [];
		for (const [name, printed] of rows) {
			const actualLight = light.get(name);
			if (
				actualLight &&
				printed.light.toLowerCase() !== actualLight.toLowerCase()
			) {
				wrong.push(
					`${name} light: doc says ${printed.light}, css says ${actualLight}`,
				);
			}
			// A token the dark block does not redefine keeps its light value, and the doc
			// prints that same value in both columns, so there is nothing to disagree with.
			const actualDark = dark.get(name);
			if (
				actualDark &&
				printed.dark.toLowerCase() !== actualDark.toLowerCase()
			) {
				wrong.push(
					`${name} dark: doc says ${printed.dark}, css says ${actualDark}`,
				);
			}
		}

		expect(
			wrong.sort(),
			'A printed default disagrees with tokens.css. These read perfectly and are simply ' +
				'wrong, which is why presence alone is not enough:\n  ' +
				wrong.join('\n  '),
		).toEqual([]);
	});
});
