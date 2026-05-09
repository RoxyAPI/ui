import { describe, expect, test } from 'bun:test';
import {
	MOON_PHASE_EMOJI,
	PLANET_ABBR,
	PLANET_GLYPH,
	SIGN_ABBR,
	SIGN_GLYPH,
	SIGNS_ORDER,
	TRIGRAM_GLYPH,
} from '../src/tokens/index.js';
import { debounce } from '../src/utils/debounce.js';
import {
	formatSignPosition,
	longitudeToSignPosition,
	normalizeLongitude,
	polarToCartesian,
} from '../src/utils/degree.js';

describe('utils/degree', () => {
	test('normalizes negative longitude into [0, 360)', () => {
		expect(normalizeLongitude(-15)).toBeCloseTo(345);
		expect(normalizeLongitude(0)).toBe(0);
		expect(normalizeLongitude(360)).toBe(0);
		expect(normalizeLongitude(720)).toBe(0);
	});

	test('converts longitude to sign/degree/minute', () => {
		const aries0 = longitudeToSignPosition(0);
		expect(aries0.sign).toBe('Aries');
		expect(aries0.degree).toBe(0);

		const leo15 = longitudeToSignPosition(135.5);
		expect(leo15.sign).toBe('Leo');
		expect(leo15.degree).toBe(15);
		expect(leo15.minute).toBe(30);
	});

	test('formatSignPosition returns compact string', () => {
		expect(formatSignPosition(135.5)).toBe("15° Leo 30'");
		expect(formatSignPosition(330.05)).toBe("0° Pisces 03'");
	});

	test('polar to cartesian places east at angle 0', () => {
		const p = polarToCartesian(100, 100, 50, 0);
		expect(p.x).toBeCloseTo(150);
		expect(p.y).toBeCloseTo(100);
	});

	test('handles wrap-around at 360 degrees', () => {
		const p = longitudeToSignPosition(360);
		expect(p.sign).toBe('Aries');
		expect(p.degree).toBe(0);
	});
});

describe('utils/debounce', () => {
	test('debounces calls within the wait window', async () => {
		let count = 0;
		const fn = debounce(() => {
			count++;
		}, 30);
		fn();
		fn();
		fn();
		expect(count).toBe(0);
		await new Promise((r) => setTimeout(r, 60));
		expect(count).toBe(1);
	});

	test('runs once per quiet window', async () => {
		let count = 0;
		const fn = debounce(() => {
			count++;
		}, 20);
		fn();
		await new Promise((r) => setTimeout(r, 40));
		fn();
		await new Promise((r) => setTimeout(r, 40));
		expect(count).toBe(2);
	});
});

describe('tokens', () => {
	test('SIGNS_ORDER has 12 signs in canonical order', () => {
		expect(SIGNS_ORDER).toHaveLength(12);
		expect(SIGNS_ORDER[0]).toBe('Aries');
		expect(SIGNS_ORDER[11]).toBe('Pisces');
	});

	test('PLANET_GLYPH covers all classical seven plus nodes', () => {
		expect(PLANET_GLYPH.Sun).toBe('☉');
		expect(PLANET_GLYPH.Moon).toBe('☽');
		expect(PLANET_GLYPH.Rahu).toBe('☊');
		expect(PLANET_GLYPH.Ketu).toBe('☋');
	});

	test('PLANET_ABBR has two-letter codes', () => {
		expect(PLANET_ABBR.Sun).toBe('Su');
		expect(PLANET_ABBR.Saturn).toBe('Sa');
		expect(PLANET_ABBR.Rahu).toBe('Ra');
	});

	test('SIGN_GLYPH and SIGN_ABBR cover all 12 signs', () => {
		for (const s of SIGNS_ORDER) {
			expect(SIGN_GLYPH[s]).toBeTruthy();
			expect(SIGN_ABBR[s]).toBeTruthy();
		}
	});

	test('TRIGRAM_GLYPH covers eight directions', () => {
		expect(TRIGRAM_GLYPH.heaven).toBe('☰');
		expect(TRIGRAM_GLYPH.earth).toBe('☷');
		expect(TRIGRAM_GLYPH.fire).toBe('☲');
		expect(TRIGRAM_GLYPH.water).toBe('☵');
	});

	test('MOON_PHASE_EMOJI covers eight phases', () => {
		expect(Object.keys(MOON_PHASE_EMOJI)).toHaveLength(8);
		expect(MOON_PHASE_EMOJI['new moon']).toBe('🌑');
		expect(MOON_PHASE_EMOJI['full moon']).toBe('🌕');
	});
});
