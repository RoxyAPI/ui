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
import { HEX, TOKENS_CSS, tokensFromCss } from './token-source.js';

const THEMING_MD = 'packages/ui/THEMING.md';

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
