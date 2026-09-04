/**
 * `tokens.css` as data, for every test that holds a downstream artefact to the token contract
 * (THEMING.md, the shadcn registry theme). One parser, so two guards cannot disagree about what a
 * token is or which block is the dark one.
 */

import { expect } from 'bun:test';

export const TOKENS_CSS = 'packages/ui/src/styles/tokens.css';

/** A bare hex colour, the shape of every token whose absence downstream is silent. */
export const HEX = /^#[0-9a-f]{3,8}$/i;

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
export async function tokensFromCss(): Promise<{
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
