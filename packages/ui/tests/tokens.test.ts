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
 * The defect this exists to stop shipped live: `PLANET_GLYPH` was keyed `North node`, the spelling `capitalize` happens to produce, while the API returns `North Node`. Every call site that reached the table without first calling `capitalize` missed, fell through to `name.slice(0, 2)`, and drew `No North Node R`, `So South Node R` and `Bl Black Moon Lilith` in the retrograde row of a customer's natal chart. Nothing failed: the fabricated code reads exactly like a deliberate abbreviation.
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
 */
describe('a glyph miss is never papered over with a truncation', () => {
	test('no component or shared renderer falls back to a sliced name', async () => {
		const TRUNCATING_FALLBACK =
			/\?\?\s*[\w.?[\]']+\.slice\(\s*0\s*,\s*[23]\s*\)/;
		const offenders: string[] = [];
		for (const dir of ['components', 'utils']) {
			const base = `packages/ui/src/${dir}`;
			for (const file of await readdir(base)) {
				if (!file.endsWith('.ts') || file.endsWith('.test.ts')) continue;
				const src = await Bun.file(`${base}/${file}`).text();
				for (const [i, line] of src.split('\n').entries()) {
					if (TRUNCATING_FALLBACK.test(line)) {
						offenders.push(`${dir}/${file}:${i + 1} ${line.trim()}`);
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
