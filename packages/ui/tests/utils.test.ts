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
	arcMidpoint,
	formatSignPosition,
	longitudeToSignPosition,
	normalizeLongitude,
	oppositePoint,
	polarToCartesian,
} from '../src/utils/degree.js';
import { toKundliViewModel } from '../src/utils/kundli-render.js';

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

	test('longitudeToSignPosition handles sign boundaries', () => {
		expect(longitudeToSignPosition(29.999).sign).toBe('Aries');
		expect(longitudeToSignPosition(30).sign).toBe('Taurus');
		expect(longitudeToSignPosition(-0.001).sign).toBe('Pisces');
	});

	test('oppositePoint is exactly 180 degrees away, normalized', () => {
		expect(oppositePoint(0)).toBe(180);
		expect(oppositePoint(200)).toBe(20);
		expect(oppositePoint(350)).toBe(170);
	});

	test('arcMidpoint takes the forward arc and handles wrap', () => {
		expect(arcMidpoint(0, 60)).toBeCloseTo(30);
		expect(arcMidpoint(350, 20)).toBeCloseTo(5); // wrap, not 185
		expect(arcMidpoint(100, 100)).toBeCloseTo(100);
		// unequal house: 10 deg cusp, 70 deg next -> midpoint 40
		expect(arcMidpoint(10, 70)).toBeCloseTo(40);
	});
});

describe('utils/kundli-render', () => {
	test('toKundliViewModel buckets each graha into its rashi cell', () => {
		const vm = toKundliViewModel({
			Lagna: { graha: 'Lagna', rashi: 'Libra' },
			Sun: {
				graha: 'Sun',
				rashi: 'Aries',
				longitude: 5.4,
				isRetrograde: false,
			},
			Mars: {
				graha: 'Mars',
				rashi: 'Aries',
				longitude: 12.1,
				isRetrograde: true,
			},
			Moon: { graha: 'Moon', rashi: 'Cancer', longitude: 100 },
		});
		expect(vm.lagnaSign).toBe('Libra');
		expect(Object.keys(vm.placements)).toHaveLength(12);
		const aries = vm.placements.aries ?? [];
		expect(aries.map((p) => p.graha).sort()).toEqual(['Mars', 'Sun']);
		// Lagna flags the sign and is not bucketed as a planet.
		expect(vm.placements.libra).toHaveLength(0);
		expect(vm.placements.cancer?.[0]?.graha).toBe('Moon');
		// retrograde and longitude carried through for the rich label/tooltip.
		const mars = aries.find((p) => p.graha === 'Mars');
		expect(mars?.isRetrograde).toBe(true);
		expect(mars?.longitude).toBe(12.1);
	});

	test('toKundliViewModel tolerates an empty meta map', () => {
		const vm = toKundliViewModel({});
		expect(vm.lagnaSign).toBe('');
		expect(Object.keys(vm.placements)).toHaveLength(12);
		for (const sign of SIGNS_ORDER) {
			expect(vm.placements[sign.toLowerCase()]).toHaveLength(0);
		}
	});

	test('toKundliViewModel propagates the division label', () => {
		const vm = toKundliViewModel({}, 'D9 Navamsa');
		expect(vm.divisionLabel).toBe('D9 Navamsa');
	});

	test('toKundliViewModel detects Lagna via graha field even when the key is not "Lagna"', () => {
		const vm = toKundliViewModel({
			asc: { graha: 'Lagna', rashi: 'Capricorn' },
			Sun: { graha: 'Sun', rashi: 'Aries' },
		});
		expect(vm.lagnaSign).toBe('Capricorn');
		expect(vm.placements.capricorn).toHaveLength(0);
		expect(vm.placements.aries?.[0]?.graha).toBe('Sun');
	});

	test('toKundliViewModel tolerates null and undefined meta', () => {
		const a = toKundliViewModel(undefined as unknown as Record<string, never>);
		const b = toKundliViewModel(null as unknown as Record<string, never>);
		expect(a.lagnaSign).toBe('');
		expect(b.lagnaSign).toBe('');
		expect(Object.keys(a.placements)).toHaveLength(12);
		expect(Object.keys(b.placements)).toHaveLength(12);
	});

	test('toKundliViewModel ignores unrecognised rashi names without throwing', () => {
		const vm = toKundliViewModel({
			Sun: { graha: 'Sun', rashi: 'Atlantis' },
			Moon: { graha: 'Moon', rashi: 'Pisces' },
		});
		expect(vm.placements.pisces?.[0]?.graha).toBe('Moon');
		for (const sign of SIGNS_ORDER) {
			if (sign !== 'Pisces') {
				expect(vm.placements[sign.toLowerCase()]).toHaveLength(0);
			}
		}
	});

	test('PlacedGraha carries nakshatra and awastha into the view model', () => {
		const vm = toKundliViewModel({
			Lagna: { graha: 'Lagna', rashi: 'Taurus' },
			Sun: {
				graha: 'Sun',
				rashi: 'Capricorn',
				longitude: 280.5,
				nakshatra: { name: 'Uttara Ashadha', pada: 2, lord: 'Sun' },
				awastha: 'Yuva',
				isRetrograde: false,
			},
		});
		const sun = vm.placements.capricorn?.[0];
		expect(sun?.nakshatra?.name).toBe('Uttara Ashadha');
		expect(sun?.nakshatra?.pada).toBe(2);
		expect(sun?.awastha).toBe('Yuva');
		expect(sun?.longitude).toBeCloseTo(280.5);
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
