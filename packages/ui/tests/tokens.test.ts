import { describe, expect, test } from 'bun:test';
import { readdir } from 'node:fs/promises';
import {
	aspectSymbol,
	planetGlyph,
	SIGNS_ORDER,
	signGlyph,
} from '../src/tokens/index.js';
import { lookupKey } from '../src/utils/string.js';

/**
 * Glyph coverage, derived from the committed spec rather than from a list somebody keeps.
 *
 * @remarks
 * What this stops: a table keyed `North node`, the spelling `capitalize` produces, against an API that returns `North Node`. Every call site reaching the table without normalising misses, falls through to `name.slice(0, 2)`, and draws `No North Node R`, `So South Node R` and `Bl Black Moon Lilith` in the retrograde row of a live chart. Nothing fails: the fabricated code reads exactly like a deliberate abbreviation.
 *
 * Same shape as the sidereal-frame guard in `bindings.test.ts` and for the same reason (lesson 23): a coverage requirement policed by a hand-kept list of qualifying values will miss the next value the API adds. This scans every `enum` and `example` array in the spec, classifies each by whether it is a planet, sign or aspect vocabulary, and requires every member to resolve. A fourteenth body added upstream fails here on the next spec refresh.
 */

const SPEC_PATH = 'specs/openapi.json';

/** A vocabulary qualifies on at least this many anchors, so an unrelated string enum is never scanned as one. */
const MIN_ANCHORS = 3;
const PLANET_ANCHORS = new Set([
	'sun',
	'moon',
	'mercury',
	'venus',
	'mars',
	'jupiter',
	'saturn',
]);
const SIGN_ANCHORS = new Set(SIGNS_ORDER.map((s) => lookupKey(s)));
const ASPECT_ANCHORS = new Set([
	'conjunction',
	'opposition',
	'trine',
	'square',
	'sextile',
]);

const anchorHits = (values: string[], anchors: Set<string>): number =>
	values.filter((v) => anchors.has(lookupKey(v))).length;

/**
 * Every string vocabulary the spec declares, bucketed by domain.
 *
 * Only `enum` and `example` positions are read. A `required` array is also a list of strings and is
 * NOT a vocabulary (`compatibility-score` requires `["sun","moon","venus","mars"]` as OBJECT KEYS),
 * so reading it would assert against property names rather than against values a response carries.
 */
function collectVocabularies(spec: unknown) {
	const planets = new Set<string>();
	const signs = new Set<string>();
	const aspects = new Set<string>();

	const consider = (values: string[]) => {
		if (anchorHits(values, PLANET_ANCHORS) >= MIN_ANCHORS)
			for (const v of values) planets.add(v);
		if (anchorHits(values, SIGN_ANCHORS) >= MIN_ANCHORS)
			for (const v of values) signs.add(v);
		if (anchorHits(values, ASPECT_ANCHORS) >= MIN_ANCHORS)
			for (const v of values) aspects.add(v);
	};

	const walk = (node: unknown) => {
		if (Array.isArray(node)) {
			for (const item of node) walk(item);
			return;
		}
		if (node === null || typeof node !== 'object') return;
		for (const [key, value] of Object.entries(node)) {
			if (
				(key === 'enum' || key === 'example') &&
				Array.isArray(value) &&
				value.length > 0 &&
				value.every((v) => typeof v === 'string')
			) {
				consider(value as string[]);
			}
			walk(value);
		}
	};

	walk(spec);
	return { planets, signs, aspects };
}

describe('every name the spec can emit resolves to a glyph', () => {
	test('planets, signs and aspects all resolve, in every spelling the spec uses', async () => {
		const spec = await Bun.file(SPEC_PATH).json();
		const { planets, signs, aspects } = collectVocabularies(spec);

		// Not vacuous: the scan has to have found the real vocabularies, including
		// the three multi-word bodies whose keys were wrong.
		expect(planets.size).toBeGreaterThan(10);
		expect(signs.size).toBeGreaterThanOrEqual(12);
		expect(aspects.size).toBeGreaterThanOrEqual(9);
		for (const body of ['North Node', 'South Node', 'Black Moon Lilith']) {
			expect(planets.has(body)).toBe(true);
		}

		const unresolved: string[] = [];
		for (const name of planets)
			if (!planetGlyph(name)) unresolved.push(`planet: ${name}`);
		for (const name of signs)
			if (!signGlyph(name)) unresolved.push(`sign: ${name}`);
		for (const name of aspects)
			if (!aspectSymbol(name)) unresolved.push(`aspect: ${name}`);

		expect(
			unresolved,
			`Names the spec emits with no glyph (add them to packages/ui/src/tokens/index.ts):\n  ${unresolved.join('\n  ')}`,
		).toEqual([]);
	});

	test('the same body resolves however the response happens to space or case it', () => {
		// One normalizer at BOTH ends is what removes the class. Before it, the
		// table stored one guessed spelling and each call site had to reproduce it.
		const north = planetGlyph('North Node');
		expect(north).toBeTruthy();
		for (const spelling of [
			'north node',
			'NORTH NODE',
			'North node',
			'north-node',
			'North_Node',
			'  North   Node  ',
		]) {
			expect(planetGlyph(spelling)).toBe(north as string);
		}
	});
});

/**
 * The fallback, not the table, was the reason the bug shipped. `?? name.slice(0, 2)` turns any miss
 * into a plausible two-letter code, so a lookup failure renders as something that reads like a
 * deliberate abbreviation and nothing about the output says it is broken.
 *
 * @remarks
 * The guard was originally anchored on `??`, which is only the half of the class that had bitten us. The other half had shipped at the same time and the anchor could not see it: the element-modality cross-tab wrote its column headers as `modality.slice(0, 3)` with no fallback in sight, so `Cardinal` became `Car` on purpose and every translated word became debris. **A short `slice` on a string is a byte operation with no idea where the word ends**, so it produces `Fij` in Spanish and splits a matra off its consonant in Devanagari or a stem mid-word in Cyrillic, in a header slot where the reader has no way to tell a truncation from an abbreviation. An abbreviation is a decision a translator makes and a catalogue carries; it is never a substring.
 *
 * So the pattern is now any `.slice(0, n)` for n of 1 to 4, `??` or not. That upper bound is what keeps it honest rather than noisy: every legitimate slice in the tree is either negative (`slice(0, -1)`), non-literal (`slice(0, ri + 1)`), an offset (`slice(1)`), or a genuinely larger window (`slice(0, 6)`, `slice(0, 10)`), and none of those manufactures a label. Sabotage-verified by restoring the `m.slice(0, 3)` header, which turns this test red on its own.
 */
describe('a glyph miss is never papered over with a truncation', () => {
	test('no component or shared renderer renders a sliced name', async () => {
		const TRUNCATING_FALLBACK = /\.slice\(\s*0\s*,\s*[1-4]\s*\)/;
		// Comments out, code only. Half the files that ever carried this bug now
		// carry a why-note QUOTING it, so a scan over raw lines would fail on the
		// documentation of the fix and pass on nothing.
		const codeLines = (src: string): Array<[number, string]> =>
			src
				.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
				.split('\n')
				.map((line, i) => [i + 1, line] as [number, string])
				.filter(([, line]) => {
					const t = line.trim();
					return !t.startsWith('//') && !t.startsWith('*');
				});
		const offenders: string[] = [];
		for (const dir of ['components', 'utils']) {
			const base = `packages/ui/src/${dir}`;
			for (const file of await readdir(base)) {
				if (!file.endsWith('.ts') || file.endsWith('.test.ts')) continue;
				const src = await Bun.file(`${base}/${file}`).text();
				for (const [n, line] of codeLines(src)) {
					if (TRUNCATING_FALLBACK.test(line)) {
						offenders.push(`${dir}/${file}:${n} ${line.trim()}`);
					}
				}
			}
		}
		expect(
			offenders,
			`A lookup miss must render the FULL name, never a slice of it:\n  ${offenders.join('\n  ')}`,
		).toEqual([]);
	});
});
