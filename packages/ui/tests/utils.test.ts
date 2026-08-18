import { describe, expect, test } from 'bun:test';
import {
	aspectSymbol,
	moonPhaseEmoji,
	planetAbbr,
	planetGlyph,
	SIGNS_ORDER,
	signAbbr,
	signGlyph,
	trigramGlyph,
} from '../src/tokens/index.js';
import { aspectLineStyle } from '../src/utils/aspect-line.js';
import { debounce } from '../src/utils/debounce.js';
import {
	arcMidpoint,
	arcSeparation,
	fanOut,
	formatSignPosition,
	longitudeToSignPosition,
	normalizeLongitude,
	oppositePoint,
	polarToCartesian,
} from '../src/utils/degree.js';
import {
	AYANAMSA_LABEL,
	distinctSanskrit,
	formatAspectName,
	formatAyanamsa,
	formatDate,
	formatDateGrain,
	formatDateRange,
	formatDateTime,
	formatInteger,
	formatNumber,
	formatPercent,
	formatTime,
	formatTimeRange,
	formatWithSanskrit,
	monthName,
	normalizeAspect,
} from '../src/utils/format.js';
import { toKundliViewModel } from '../src/utils/kundli-render.js';
import { display, displayList, foldLocalized } from '../src/utils/localized.js';
import { MarkupDataController } from '../src/utils/markup-data.js';
import { capitalize, humanize } from '../src/utils/string.js';

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

	test('arcSeparation is the angle a fixed-width mark spans at a radius', () => {
		// A mark as wide as the radius spans one radian.
		expect(arcSeparation(50, 50)).toBeCloseTo(180 / Math.PI);
		// Half the radius, half the angle: a smaller ring needs MORE degrees for
		// the same glyph, which is the whole reason this is derived per ring.
		expect(arcSeparation(13, 86)).toBeGreaterThan(arcSeparation(13, 122));
		expect(arcSeparation(10, 0)).toBe(0);
	});

	test('fanOut leaves an uncrowded set exactly where it was', () => {
		const out = fanOut([{ l: 0 }, { l: 90 }, { l: 200 }], (p) => p.l, 8);
		expect(out.map((p) => p.longitude)).toEqual([0, 90, 200]);
		expect(out.map((p) => p.displayLongitude)).toEqual([0, 90, 200]);
	});

	test('fanOut spreads a conjunction apart without moving its true longitude', () => {
		const out = fanOut(
			[{ l: 100 }, { l: 101 }, { l: 102 }, { l: 103 }],
			(p) => p.l,
			8,
		);
		// The reported positions are untouched; only the display value moves.
		expect(out.map((p) => p.longitude)).toEqual([100, 101, 102, 103]);
		expect(out.map((p) => p.displayLongitude)).toEqual([100, 108, 116, 124]);
		for (let i = 1; i < out.length; i++) {
			const gap =
				(out[i]?.displayLongitude ?? 0) - (out[i - 1]?.displayLongitude ?? 0);
			expect(gap).toBeGreaterThanOrEqual(8);
		}
	});

	test('fanOut sorts by longitude and drops non-finite entries', () => {
		const out = fanOut(
			[{ l: 300 }, { l: Number.NaN }, { l: 10 }, { l: -20 }],
			(p) => p.l,
			5,
		);
		// -20 normalizes to 340, so the order is 10, 300, 340.
		expect(out.map((p) => p.longitude)).toEqual([10, 300, 340]);
	});

	test('a cluster that overruns 360 slides back instead of wrapping', () => {
		const out = fanOut([{ l: 355 }, { l: 356 }, { l: 357 }], (p) => p.l, 10);
		// Last would land at 375, so everything shifts back by 15 and the stack
		// stays anchored near its real longitudes rather than jumping to Aries.
		expect(out.map((p) => p.displayLongitude)).toEqual([340, 350, 360]);
		expect(out.map((p) => p.longitude)).toEqual([355, 356, 357]);
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
		const vm = toKundliViewModel({}, { divisionLabel: 'D9 Navamsa' });
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

	test('planetGlyph covers all classical seven plus nodes', () => {
		expect(planetGlyph('Sun')).toBe('☉');
		expect(planetGlyph('Moon')).toBe('☽');
		expect(planetGlyph('Rahu')).toBe('☊');
		expect(planetGlyph('Ketu')).toBe('☋');
	});

	test('planetAbbr has two-letter codes', () => {
		expect(planetAbbr('Sun')).toBe('Su');
		expect(planetAbbr('Saturn')).toBe('Sa');
		expect(planetAbbr('Rahu')).toBe('Ra');
	});

	test('signGlyph and signAbbr cover all 12 signs', () => {
		for (const s of SIGNS_ORDER) {
			expect(signGlyph(s)).toBeTruthy();
			expect(signAbbr(s)).toBeTruthy();
		}
	});

	test('trigramGlyph covers eight directions', () => {
		expect(trigramGlyph('heaven')).toBe('☰');
		expect(trigramGlyph('Earth')).toBe('☷');
		expect(trigramGlyph('fire')).toBe('☲');
		expect(trigramGlyph('WATER')).toBe('☵');
	});

	test('moonPhaseEmoji resolves the suffixed and unsuffixed API spellings', () => {
		expect(moonPhaseEmoji('new moon')).toBe('🌑');
		expect(moonPhaseEmoji('Full Moon')).toBe('🌕');
		expect(moonPhaseEmoji('Waxing Gibbous Moon')).toBe('🌔');
		expect(moonPhaseEmoji('Third Quarter Moon')).toBe('🌗');
	});

	test('every accessor returns undefined on a miss, never a fabricated code', () => {
		// The whole point of the accessor API: a lookup failure has to be
		// visible to the caller so it can render the FULL name. The old records
		// let each call site invent `name.slice(0, 2)` instead, which is how
		// `No North Node R` and `Bl Black Moon Lilith` reaching a live chart.
		for (const get of [
			planetGlyph,
			planetAbbr,
			signGlyph,
			signAbbr,
			aspectSymbol,
			trigramGlyph,
			moonPhaseEmoji,
		]) {
			expect(get('Nibiru')).toBeUndefined();
			expect(get('')).toBeUndefined();
			expect(get(undefined)).toBeUndefined();
			expect(get(null)).toBeUndefined();
		}
	});
});

/**
 * MarkupDataController is exercised against a stub host so the assertions stay
 * focused on the source-resolution logic. End-to-end hydration through a real
 * connected custom element is covered by the headless-Chromium audit, which
 * renders the markup-driven section in apps/docs/index.html.
 */
describe('utils/markup-data', () => {
	function jsonScript(json: string, opts: { cls?: string } = {}) {
		const s = document.createElement('script');
		s.setAttribute('type', 'application/json');
		if (opts.cls) s.className = opts.cls;
		s.textContent = json;
		return s;
	}

	/** Minimal host the controller can drive without connecting a custom element. */
	function makeHost(
		children: Element[] = [],
		attrs: Record<string, string> = {},
	) {
		const root = document.createElement('div');
		for (const c of children) root.appendChild(c);
		let updates = 0;
		const host = {
			data: undefined as unknown,
			children: root.children,
			getAttribute: (name: string) => attrs[name] ?? null,
			ownerDocument: document,
			addController() {},
			requestUpdate() {
				updates += 1;
			},
		};
		return {
			host,
			get updates() {
				return updates;
			},
		};
	}

	test('hydrates from a direct-child roxy-data script', () => {
		const { host } = makeHost([
			jsonScript('{"lifePathNumber":7}', { cls: 'roxy-data' }),
		]);
		new MarkupDataController(host as never).hostConnected();
		expect((host.data as { lifePathNumber: number }).lifePathNumber).toBe(7);
	});

	test('requests an update after hydrating', () => {
		const ctx = makeHost([jsonScript('{"n":1}', { cls: 'roxy-data' })]);
		new MarkupDataController(ctx.host as never).hostConnected();
		expect(ctx.updates).toBe(1);
	});

	test('property already set wins over markup', () => {
		const { host } = makeHost([
			jsonScript('{"lifePathNumber":1}', { cls: 'roxy-data' }),
		]);
		host.data = { lifePathNumber: 9 };
		new MarkupDataController(host as never).hostConnected();
		expect((host.data as { lifePathNumber: number }).lifePathNumber).toBe(9);
	});

	test('ignores a script that lacks the roxy-data marker class', () => {
		const { host } = makeHost([jsonScript('{"lifePathNumber":7}')]);
		new MarkupDataController(host as never).hostConnected();
		expect(host.data).toBeUndefined();
	});

	test('leaves sibling fallback markup in place', () => {
		const fallback = document.createElement('div');
		fallback.textContent = 'Life Path 7';
		const { host } = makeHost([
			fallback,
			jsonScript('{"lifePathNumber":7}', { cls: 'roxy-data' }),
		]);
		new MarkupDataController(host as never).hostConnected();
		expect((host.data as { lifePathNumber: number }).lifePathNumber).toBe(7);
		expect(host.children).toContain(fallback);
		expect(fallback.textContent).toBe('Life Path 7');
	});

	test('malformed JSON fails safe and leaves data unset', () => {
		const ctx = makeHost([jsonScript('{bad json', { cls: 'roxy-data' })]);
		new MarkupDataController(ctx.host as never).hostConnected();
		expect(ctx.host.data).toBeUndefined();
		expect(ctx.updates).toBe(0);
	});

	test('empty script body fails safe', () => {
		const { host } = makeHost([jsonScript('   ', { cls: 'roxy-data' })]);
		new MarkupDataController(host as never).hostConnected();
		expect(host.data).toBeUndefined();
	});

	test('no children leaves the property path untouched', () => {
		const { host } = makeHost([]);
		new MarkupDataController(host as never).hostConnected();
		expect(host.data).toBeUndefined();
	});

	// Guards the != null check against a future refactor to a truthiness test:
	// a legitimately falsy property value (false, 0, empty array) must never be
	// clobbered by markup.
	test('a falsy-but-present property value is preserved over markup', () => {
		for (const present of [false, 0, '', [] as unknown[]]) {
			const { host } = makeHost([
				jsonScript('{"clobbered":true}', { cls: 'roxy-data' }),
			]);
			host.data = present;
			new MarkupDataController(host as never).hostConnected();
			expect(host.data).toBe(present);
		}
	});
});

/**
 * Zeros may only be dropped AFTER a decimal point. Stripping trailing zeros from the whole string eats them off the integer at `dp = 0`, turning 100 into "1", 90 into "9" and 0 into the empty string, which reads as a plausible number rather than as an error.
 */
describe('formatNumber does not eat integer zeros', () => {
	test('integers survive at dp 0', () => {
		expect(formatNumber('en', 100, 0)).toBe('100');
		expect(formatNumber('en', 90, 0)).toBe('90');
		expect(formatNumber('en', 20, 0)).toBe('20');
		expect(formatNumber('en', 10, 0)).toBe('10');
	});

	test('zero renders as zero, not as an empty string', () => {
		expect(formatNumber('en', 0, 0)).toBe('0');
		expect(formatNumber('en', 0, 2)).toBe('0');
	});

	test('trailing zeros still go, but only after the decimal point', () => {
		expect(formatNumber('en', 2.5, 1)).toBe('2.5');
		expect(formatNumber('en', 2.0, 1)).toBe('2');
		expect(formatNumber('en', 2.5, 2)).toBe('2.5');
		expect(formatNumber('en', 10.0, 1)).toBe('10');
		expect(formatNumber('en', 100.5, 1)).toBe('100.5');
	});

	test('percent inherits the fix', () => {
		expect(formatPercent('en', 100, 0)).toBe('100%');
	});

	test('non-numbers stay empty', () => {
		expect(formatNumber('en', undefined, 0)).toBe('');
		expect(formatNumber('en', Number.NaN, 0)).toBe('');
	});
});

/** Every decimal a reader sees is a plain quantity, never sexagesimal notation, so it takes the reader's locale. */
describe('a decimal follows the reader, not the author', () => {
	test('the separator is the locale, not the point', () => {
		expect(formatNumber('en', 2.5, 1)).toBe('2.5');
		expect(formatNumber('de', 2.5, 1)).toBe('2,5');
		expect(formatNumber('fr', 2.5, 1)).toBe('2,5');
		// Hindi writes the decimal point, so a translated page is not a comma page.
		expect(formatNumber('hi', 2.5, 1)).toBe('2.5');
	});

	test('grouping follows it too', () => {
		expect(formatNumber('en', 12345.6, 1)).toBe('12,345.6');
		expect(formatNumber('de', 12345.6, 1)).toBe('12.345,6');
	});

	test('an unknown or absent locale falls back to English, never to the runtime', () => {
		expect(formatNumber(undefined, 2.5, 1)).toBe('2.5');
		expect(formatNumber('zz-nonsense', 2.5, 1)).toBe('2.5');
	});

	/** Turkish puts the sign in front, which appending it never produces. */
	test('the percent sign sits where the locale puts it', () => {
		expect(formatPercent('en', 82.5, 1)).toBe('82.5%');
		expect(formatPercent('tr', 82.5, 1).startsWith('%')).toBe(true);
		expect(formatPercent('fr', 82.5, 1)).toMatch(/^82,5\s%$/u);
	});

	test('a localized decimal never reaches SVG geometry', async () => {
		// In a path coordinate a decimal comma IS the separator, so the shape collapses.
		const src = await Bun.file(
			'packages/ui/src/components/biorhythm-chart.ts',
		).text();
		expect(src).toContain('toFixed(2)');
		expect(src).not.toContain('formatNumber(this.effectiveLang(), x,');
	});
});

/**
 * A naive API timestamp is a WALL CLOCK, not an instant: `2026-07-13T04:36:00` means 04:36 in the chart's own timezone, so sunrise must read 04:36 for a viewer in Tokyo and a viewer in Chicago alike.
 *
 * @remarks
 * The old formatters handed the naive string straight to `new Date()`, which makes the runtime read it in the VIEWER's zone. That is a silent one-hour corruption whenever the wall clock lands in the viewer's DST gap: in America/New_York the clock jumps 02:00 to 03:00 on 2026-03-08, so `02:30` rendered as `3:30 AM` there and `2:30 AM` everywhere else. Same chart, two different times, and nothing failed.
 *
 * `hora-table` had independently dodged this by slicing the string, and `choghadiya-grid` had its own third formatter that was locale-dependent on top (a US viewer saw `04:36 AM`, everyone else `04:36`). All three now share one helper that pins a naive wall clock to UTC, which has no DST and therefore no gap.
 */
describe('naive timestamps render as wall clocks, not instants', () => {
	const withTz = <T>(tz: string, fn: () => T): T => {
		const prev = process.env.TZ;
		process.env.TZ = tz;
		try {
			return fn();
		} finally {
			process.env.TZ = prev;
		}
	};
	const ZONES = ['America/New_York', 'Asia/Kolkata', 'Europe/London', 'UTC'];

	test('a wall clock is identical for every viewer on earth', () => {
		const seen = ZONES.map((tz) =>
			withTz(tz, () => formatTime('en', '2026-07-13T04:36:00')),
		);
		expect(new Set(seen).size).toBe(1);
		expect(seen[0]).toBe('4:36 AM');
	});

	test('a wall clock inside the viewer DST gap does not shift an hour', () => {
		// 2026-03-08 02:30 does not exist in New York: the clock jumps 02:00 -> 03:00.
		expect(
			withTz('America/New_York', () => formatTime('en', '2026-03-08T02:30:00')),
		).toBe('2:30 AM');
		expect(
			withTz('Asia/Kolkata', () => formatTime('en', '2026-03-08T02:30:00')),
		).toBe('2:30 AM');
	});

	test('the calendar day never rolls under the viewer timezone', () => {
		const seen = ZONES.map((tz) =>
			withTz(tz, () => formatDate('en', '1990-06-15T00:30:00')),
		);
		expect(new Set(seen).size).toBe(1);
		expect(seen[0]).toBe('Jun 15, 1990');
	});

	test('a DATE_ONLY value keeps its calendar day at every grain', () => {
		// `formatDateGrain` handed the bare date straight to `new Date()`, which
		// reads it as UTC midnight, and then let Intl render it in the viewer's
		// zone, so every grain below `year` showed 31 Jul west of Greenwich. Its
		// only caller passes full datetimes, so nothing on screen is affected yet
		// and nothing would have failed the day one date-only field reached it.
		const GRAINS = ['year', 'month', 'day', 'time'] as const;
		const west = 'America/Los_Angeles';
		for (const grain of GRAINS) {
			const seen = [...ZONES, west].map((tz) =>
				withTz(tz, () => formatDateGrain('en', '2026-08-01', grain)),
			);
			expect(new Set(seen).size).toBe(1);
		}
		const grain = (g: (typeof GRAINS)[number]) =>
			withTz(west, () => formatDateGrain('en', '2026-08-01', g));
		expect(grain('year')).toBe('2026');
		expect(grain('month')).toBe('Aug 2026');
		expect(grain('day')).toBe('Aug 1, 2026');
		expect(grain('time')).toBe('Aug 1, 2026, 12:00 AM');
	});

	test('a full datetime still reads as its own wall clock at every grain', () => {
		const GRAINS = ['year', 'month', 'day', 'time'] as const;
		const expected = [
			'1990',
			'Jan 1990',
			'Jan 15, 1990',
			'Jan 15, 1990, 2:30 PM',
		];
		GRAINS.forEach((g, i) => {
			const seen = [...ZONES, 'America/Los_Angeles'].map((tz) =>
				withTz(tz, () => formatDateGrain('en', '1990-01-15T14:30:00', g)),
			);
			expect(new Set(seen).size).toBe(1);
			expect(seen[0]).toBe(expected[i]);
		});
	});

	test('an offset-bearing timestamp IS an instant and still converts to viewer local', () => {
		const ny = withTz('America/New_York', () =>
			formatTime('en', '2026-07-13T12:00:00Z'),
		);
		const kolkata = withTz('Asia/Kolkata', () =>
			formatTime('en', '2026-07-13T12:00:00Z'),
		);
		expect(ny).toBe('8:00 AM');
		expect(kolkata).toBe('5:30 PM');
	});
});

/**
 * The date and the heading above it must come from the SAME language. Chrome was localized first, so a Spanish page rendered `Carta natal` over `Jan 15, 1990, 2:30 PM`: the formatters were still passing `undefined` to Intl, which means the locale of whoever happens to be looking.
 *
 * @remarks
 * The locale threaded here is the DISPLAY one (`resolveLang`, full tag), never the API one (`apiLang`, region stripped and unsupported languages dropped). They are deliberately different values and swapping them is silent: `?lang=es-AR` is a 400, so the wire value must be `es`, while Intl wants `es-AR` because an Argentine reader and a Castilian reader do not write the same date. Passing the wire value to Intl would degrade every regional visitor to the base language and nothing would fail.
 */
describe('dates and numbers follow the page locale, not the viewer', () => {
	const D = '1990-01-15T14:30:00';

	test('the region is kept, because es-AR and es do not write a date the same way', () => {
		// The whole point of taking the DISPLAY locale. Truncating to what the API
		// query accepts (`es`) would render this Argentine page in Castilian
		// conventions, and no gate would notice.
		expect(formatDate('es-AR', D)).not.toBe(formatDate('es', D));
		expect(formatDate('es-AR', D)).toContain('ene');
		expect(formatDate('es', D)).toContain('ene');
	});

	test('the hour cycle is the locale, not a hardcoded 12-hour clock', () => {
		// pinning `hour12: true` for every locale gives a German or
		// Castilian page printed an AM/PM clock beside a form labelled "24 horas".
		expect(formatTime('de', D)).toBe('14:30');
		expect(formatTime('es', D)).toBe('14:30');
		expect(formatTime('en', D)).toBe('2:30 PM');
		expect(formatTimeRange('de', { start: '06:00', end: '18:30' })).toBe(
			'6:00 - 18:30',
		);
	});

	test('no language signal is English, never the browser default', () => {
		// A page that declares no language is English as far as this library is
		// concerned, which is what the chrome catalogue already falls back to.
		// `navigator.language` is the VISITOR's preference and is deliberately out
		// of the chain: two people on one page must see one string.
		for (const value of [undefined, '']) {
			expect(formatDate(value, D)).toBe(formatDate('en', D));
			expect(formatDateTime(value, D)).toBe('Jan 15, 1990, 2:30 PM');
		}
	});

	test('a lang attribute a site owner typed by hand degrades, never throws', () => {
		// `lang` is author-controlled. `en_US` and `english` make Intl raise a
		// RangeError, which inside a render is a blank component; a structurally
		// valid but unknown tag silently falls back to the RUNTIME default, which
		// is the viewer again.
		for (const tag of ['english', 'en_US', 'zz', 'x']) {
			expect(() => formatDate(tag, D)).not.toThrow();
			expect(formatDate(tag, D)).toBe(formatDate('en', D));
		}
	});

	test('the grain formatter localizes every level except the bare year', () => {
		expect(formatDateGrain('es', D, 'year')).toBe('1990');
		expect(formatDateGrain('en', D, 'year')).toBe('1990');
		expect(formatDateGrain('es', D, 'month')).toBe('ene 1990');
		expect(formatDateGrain('en', D, 'month')).toBe('Jan 1990');
		expect(formatDateGrain('de', D, 'time')).toContain('14:30');
		expect(formatDateGrain('en', D, 'time')).toContain('2:30 PM');
		expect(formatDateGrain('en', undefined, 'day')).toBe('');
	});

	test('month names come from Intl, not from a table of English strings', () => {
		// Two components carried a byte-identical array of twelve English months.
		expect(monthName('en', 1)).toBe('January');
		expect(monthName('es', 1)).toBe('enero');
		expect(monthName('fr', 12)).toBe('décembre');
		for (const bad of [0, 13, 1.5, '3', undefined]) {
			expect(monthName('en', bad)).toBe('');
		}
	});

	test('digit grouping follows the page too', () => {
		expect(formatInteger('en', 12345.6)).toBe('12,346');
		expect(formatInteger('de', 12345.6)).toBe('12.346');
		expect(formatInteger('en', undefined)).toBe('');
		expect(formatInteger('en', Number.NaN)).toBe('');
	});
});

describe('utils/string humanize', () => {
	test('splits snake, kebab, and camel case into a titled label', () => {
		expect(humanize('birth_date')).toBe('Birth date');
		expect(humanize('mahadasha-end')).toBe('Mahadasha end');
		expect(humanize('houseSystem')).toBe('House System');
	});

	test('splits a trailing digit off a word (the group-legend fix)', () => {
		expect(humanize('person1')).toBe('Person 1');
		expect(humanize('person2')).toBe('Person 2');
		expect(humanize('personA')).toBe('Person A');
	});

	test('capitalize normalizes a lowercase enum value for glyph lookup', () => {
		expect(capitalize('aries')).toBe('Aries');
		expect(capitalize('SCORPIO')).toBe('Scorpio');
	});
});

describe('aspect names normalize across both API separators', () => {
	test('underscore and space forms collapse to the same canonical key', () => {
		// /aspects returns `SEMI SEXTILE`, synastry returns `SEMI_SEXTILE`. Folding
		// only the underscore left the space form failing every ASPECT_CLASS and
		// ASPECT_SYMBOL lookup, so the same aspect rendered correctly coloured in
		// one component and in the neutral fallback in another.
		expect(normalizeAspect({ type: 'SEMI_SEXTILE' })).toBe('semi-sextile');
		expect(normalizeAspect({ type: 'SEMI SEXTILE' })).toBe('semi-sextile');
		expect(normalizeAspect({ type: 'Semi  Sextile ' })).toBe('semi-sextile');
	});

	test('the display label is capitalized, never the raw enum', () => {
		expect(formatAspectName({ type: 'SEMI_SQUARE' })).toBe('Semi-square');
		expect(formatAspectName({ type: 'TRINE' })).toBe('Trine');
		expect(formatAspectName({})).toBe('');
	});

	test('every aspect the API returns resolves to a glyph, none to a slug', () => {
		// The nine values in the astrology + vedic specs. A miss here is what
		// rendered `sesquiquadrate` into the aspect grid as the literal text `ses`.
		const apiAspects = [
			'CONJUNCTION',
			'SEMI_SEXTILE',
			'SEMI_SQUARE',
			'SEXTILE',
			'SQUARE',
			'TRINE',
			'SESQUIQUADRATE',
			'QUINCUNX',
			'OPPOSITION',
		];
		for (const type of apiAspects) {
			// Both the raw enum and the normalized key must resolve: the accessor
			// folds the separator itself, so no call site has to remember which
			// spelling the endpoint it renders happens to use.
			expect(aspectSymbol(type)).toBeTruthy();
			expect(aspectSymbol(normalizeAspect({ type }))).toBe(
				aspectSymbol(type) as string,
			);
		}
	});

	test('semisextile and quincunx are not swapped', () => {
		// Unicode defines the set at 260C, 26BA, 2220, 26B9, 25A1, 25B3, 26BC,
		// 26BB, 260D for 0/30/45/60/90/120/135/150/180 degrees. An earlier
		// revision used the XOR and NAND operators Unicode lists as cross
		// references, and had the two the wrong way round.
		expect(aspectSymbol('semisextile')).toBe('\u26ba');
		expect(aspectSymbol('quincunx')).toBe('\u26bb');
		expect(aspectSymbol('sesquiquadrate')).toBe('\u26bc');
		expect(aspectSymbol('semisquare')).toBe('\u2220');
	});
});

describe('shared display formatters', () => {
	test('formatDateTime merges the split date and time birth fields', () => {
		// Birth details arrive as two fields, not one timestamp.
		expect(formatDateTime('en', '1990-01-15', '14:30:00')).toBe(
			'Jan 15, 1990, 2:30 PM',
		);
		expect(formatDateTime('en', '1990-01-15T14:30:00')).toBe(
			'Jan 15, 1990, 2:30 PM',
		);
		expect(formatDateTime('en', '1990-01-15')).toBe('Jan 15, 1990');
		expect(formatDateTime('en', undefined)).toBe('');
	});

	test('formatDateRange falls back to whichever end is present', () => {
		expect(formatDateRange('en', '2026-01-01', '2026-01-07')).toBe(
			'Jan 1, 2026 - Jan 7, 2026',
		);
		expect(formatDateRange('en', '2026-01-01', undefined)).toBe('Jan 1, 2026');
		expect(formatDateRange('en', undefined, undefined)).toBe('');
	});

	test('every ayanamsa the spec accepts has a human label', async () => {
		// The map is hand-written because no humanizer can know that KP is an initialism or
		// that Raman is a person. That is exactly why it goes stale: `raman` shipped months
		// after the map and rendered as a bare "Raman" until someone read the output. Bind it
		// to the committed spec so the next frame cannot arrive unlabelled.
		const spec = await Bun.file('specs/openapi.json').json();
		const frames: string[] =
			spec.components.schemas.BirthChartRequest.properties.ayanamsa.enum;
		expect(frames.length).toBeGreaterThan(3);
		expect(frames.filter((f) => !AYANAMSA_LABEL[f])).toEqual([]);
	});

	test('formatAyanamsa keeps KP uppercase and degrades unknown frames', () => {
		expect(formatAyanamsa('en', 'kp-newcomb', 23.6214)).toBe(
			'KP Newcomb (23.62\u00b0)',
		);
		expect(formatAyanamsa('en', 'lahiri', 23.72)).toBe('Lahiri (23.72\u00b0)');
		expect(formatAyanamsa('en', 'lahiri')).toBe('Lahiri');
		expect(formatAyanamsa('en', 'raman', 22.5)).toBe('B.V. Raman (22.5\u00b0)');
		expect(formatAyanamsa('en', 'raman-something')).toBe('Raman something');
	});

	test('formatWithSanskrit only appends a Sanskrit form that actually differs', () => {
		expect(formatWithSanskrit('Tuesday', 'Mangalavara')).toBe(
			'Tuesday (Mangalavara)',
		);
		// The guard this helper exists for. Several nakshatras and rashis carry the
		// same string in both fields, and without it they render as `Ashwini (Ashwini)`.
		expect(formatWithSanskrit('Ashwini', 'Ashwini')).toBe('Ashwini');
		expect(formatWithSanskrit('Tuesday', undefined)).toBe('Tuesday');
		expect(formatWithSanskrit(undefined, 'Mangalavara')).toBe('Mangalavara');
		expect(formatWithSanskrit(undefined, undefined)).toBe('');
	});

	test('distinctSanskrit reports absence rather than an empty string', () => {
		expect(distinctSanskrit('Ashwini', 'Ashwini')).toBeUndefined();
		expect(distinctSanskrit('Aries', 'Mesha')).toBe('Mesha');
		expect(distinctSanskrit('Aries', '')).toBeUndefined();
	});
});

describe('no component re-implements aspect or enum formatting inline', () => {
	test('every aspect label goes through the shared helpers', async () => {
		// Six separate inline normalizers had grown by 0.19.x, and they disagreed:
		// one folded underscores to hyphens, one to SPACES, one did neither, so the
		// same aspect rendered three ways and two of them missed every ASPECT_CLASS
		// lookup. Grep is the only gate that catches a seventh being added.
		const { readdirSync, readFileSync } = await import('node:fs');
		const dir = new URL('../src/components/', import.meta.url).pathname;
		const offenders: string[] = [];
		for (const f of readdirSync(dir).filter((n) => n.endsWith('.ts'))) {
			const src = readFileSync(dir + f, 'utf8');
			for (const [i, line] of src.split('\n').entries()) {
				if (line.trimStart().startsWith('*')) continue;
				// An aspect, phase or type VALUE reshaped by hand rather than by
				// normalizeAspect / formatAspectName / humanize. Scoped to those
				// nouns on purpose: `data.ts` normKey strips the same separators to
				// build a LOOKUP key, which is not display formatting and must not
				// trip this.
				if (
					/\breplace\(\/\[?_/.test(line) &&
					/\b(type|aspect|phase)\b/i.test(line) &&
					!/formatAspectName|normalizeAspect|humanize/.test(line)
				) {
					offenders.push(`${f}:${i + 1} ${line.trim()}`);
				}
			}
		}
		expect(offenders, offenders.join('\n')).toEqual([]);
	});
});

/**
 * The canonical/localized pair, at the level of the helpers rather than a render.
 *
 * @remarks
 * The API answers a translated request with the display value BESIDE the canonical one and keeps the canonical one English in every language, because that is what code compares against. Every rule about which half goes where lives in `utils/localized.ts`, so it is pinned here once instead of at the thirty call sites that read it.
 */
describe('the localized half of a response, and the English half beside it', () => {
	test('display prefers the localized value and falls back to the canonical one', () => {
		expect(display({ name: 'Sun', nameLocalized: 'Sol' }, 'name')).toBe('Sol');
		// An English response omits the field entirely, which is the common case.
		expect(display({ name: 'Sun' }, 'name')).toBe('Sun');
		// An empty translation is not a translation.
		expect(display({ name: 'Sun', nameLocalized: '' }, 'name')).toBe('Sun');
		// The shape a component actually holds: a row it looked for and did not
		// find, which must read as empty rather than throw mid-render.
		const rows: Array<{ name?: string; nameLocalized?: string }> = [];
		expect(display(rows.find(Boolean), 'name')).toBe('');
	});

	test('the English fallback can be a formatted form of the canonical value', () => {
		// `type` is `SEMI_SEXTILE` on the wire and never that on screen, so the
		// English branch is the display helper rather than the raw field.
		const aspect = { type: 'SEMI_SEXTILE' };
		expect(display(aspect, 'type', formatAspectName(aspect))).toBe(
			'Semi-sextile',
		);
		expect(
			display({ ...aspect, typeLocalized: 'Semisextil' }, 'type', 'ignored'),
		).toBe('Semisextil');
	});

	test('displayList zips by index and never re-sorts one side', () => {
		expect(
			displayList(
				{
					retrogradePlanets: ['Mars', 'Saturn'],
					retrogradePlanetsLocalized: ['Marte', 'Saturno'],
				},
				'retrogradePlanets',
			),
		).toEqual([
			{ value: 'Mars', label: 'Marte' },
			{ value: 'Saturn', label: 'Saturno' },
		]);
		// A short or absent localized list degrades per item, so every glyph still
		// resolves off the value half.
		expect(
			displayList(
				{
					retrogradePlanets: ['Mars', 'Pluto'],
					retrogradePlanetsLocalized: [],
				},
				'retrogradePlanets',
			),
		).toEqual([
			{ value: 'Mars', label: 'Mars' },
			{ value: 'Pluto', label: 'Pluto' },
		]);
		const noSummary: { retrogradePlanets?: string[] } = {};
		expect(displayList(noSummary, 'retrogradePlanets')).toEqual([]);
	});

	test('foldLocalized collapses the twin into its partner and keeps the order', () => {
		expect(
			foldLocalized({
				planet: 'Sun',
				planetLocalized: 'Sol',
				longitude: 105.03,
				sign: 'Cancer',
				signLocalized: 'Cáncer',
			}),
		).toEqual({ planet: 'Sol', longitude: 105.03, sign: 'Cáncer' });
		// Position, not just membership: the generic renderer builds its columns
		// out of this key order, so a translated response has to lay out exactly
		// like an English one.
		expect(
			Object.keys(
				foldLocalized({
					planet: 'Sun',
					planetLocalized: 'Sol',
					longitude: 105.03,
					sign: 'Cancer',
					signLocalized: 'Cáncer',
				}),
			),
		).toEqual(['planet', 'longitude', 'sign']);
	});

	test('a row with nothing to fold is returned untouched, not rebuilt', () => {
		// Reference identity, because "the English path is unchanged" is a stronger
		// claim than "the English path is equivalent" and this is how it is proved.
		const row = { planet: 'Sun', longitude: 105.03, sign: 'Cancer' };
		expect(foldLocalized(row)).toBe(row);
	});

	test('a localized key with NO canonical partner is left alone', () => {
		// Suppressing on the name alone would delete the only copy of the value.
		const row = { planet: 'Sun', noteLocalized: 'Nota' };
		expect(foldLocalized(row)).toBe(row);
		expect(foldLocalized({ Localized: 'x' })).toEqual({ Localized: 'x' });
	});

	test('an empty translation does not blank out the canonical value', () => {
		expect(foldLocalized({ sign: 'Cancer', signLocalized: '' })).toEqual({
			sign: 'Cancer',
		});
		expect(foldLocalized({ sign: 'Cancer', signLocalized: null })).toEqual({
			sign: 'Cancer',
		});
	});
});

describe('utils/aspect-line', () => {
	/** The two numbers a rendered line actually carries. */
	const parse = (style: string | undefined) => {
		const opacity = Number(/opacity:([\d.]+)/.exec(style ?? '')?.[1]);
		const width = Number(/stroke-width:([\d.]+)/.exec(style ?? '')?.[1]);
		return { opacity, width };
	};

	test('a tighter aspect draws heavier than a wider one', () => {
		const tight = parse(aspectLineStyle({ strength: 95 }));
		const wide = parse(aspectLineStyle({ strength: 10 }));
		expect(tight.opacity).toBeGreaterThan(wide.opacity);
		expect(tight.width).toBeGreaterThan(wide.width);
	});

	test('the weakest aspect is still drawn', () => {
		// A wide aspect is weak, not absent. An invisible line reads as a contact
		// the chart never found, which is a different claim from a faint one.
		const { opacity, width } = parse(aspectLineStyle({ strength: 0 }));
		expect(opacity).toBeGreaterThan(0.2);
		expect(width).toBeGreaterThan(0.3);
	});

	test('strength outside 0-100 is clamped rather than trusted', () => {
		expect(parse(aspectLineStyle({ strength: 400 }))).toEqual(
			parse(aspectLineStyle({ strength: 100 })),
		);
		expect(parse(aspectLineStyle({ strength: -50 }))).toEqual(
			parse(aspectLineStyle({ strength: 0 })),
		);
	});

	test('no strength means no inline weight, so the shared default stands', () => {
		expect(aspectLineStyle({})).toBeUndefined();
		expect(aspectLineStyle({ strength: Number.NaN })).toBeUndefined();
	});
});
