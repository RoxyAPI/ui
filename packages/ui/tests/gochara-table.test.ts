import { describe, expect, test } from 'bun:test';

// Importing the index registers every custom element. happy-dom is loaded by
// preload (bunfig.toml).
import '../src/index.js';
import type { CalculateTransitResponse } from '../src/types/index.js';

const settled = (el: Element): Promise<void> =>
	(el as unknown as { updateComplete: Promise<void> }).updateComplete;

async function mount(data: unknown): Promise<HTMLElement> {
	const el = document.createElement('roxy-gochara-table');
	(el as HTMLElement & { data: unknown }).data = data;
	document.body.appendChild(el);
	await settled(el);
	return el;
}

const text = (el: HTMLElement): string =>
	(el.shadowRoot as ShadowRoot).textContent ?? '';

/**
 * Natal Moon in Leo against a Gemini Lagna, so the two references are six signs
 * apart and every house number differs between them.
 *
 * @remarks
 * **The gap is the whole point of the fixture.** A chart whose Moon and Lagna
 * share a sign renders the same number for both readings, so a card that had
 * dropped one of them entirely would still satisfy every assertion below. The
 * first test pins the gap open, which is what stops that from happening quietly
 * the next time a fixture is refreshed from a live capture.
 */
const MOON_SIGN = 'Leo';
const SUN_FROM_LAGNA = 8;
const SUN_FROM_MOON = 6;

const FIXTURE = {
	frame: { ayanamsa: 'lahiri', ayanamsaDegrees: 23.7214 },
	birthDatetime: '1990-01-15T14:30:00',
	transitDatetime: '2026-02-03T12:00:00',
	natalPlanets: [
		{ name: 'Moon', longitude: 147.6686, sign: MOON_SIGN, house: 3 },
		{ name: 'Jupiter', longitude: 69.608, sign: 'Gemini', house: 1 },
	],
	transitingPlanets: [
		{
			name: 'Sun',
			longitude: 290.6484,
			sign: 'Capricorn',
			natalHouse: SUN_FROM_LAGNA,
			houseFromMoon: SUN_FROM_MOON,
			aspectsToNatal: [
				{ natalPlanet: 'Mars', aspectType: 'sextile', orb: 5.76 },
			],
			drishtiToNatal: [
				{ natalPlanet: 'Ketu', aspectType: '7th', strength: 100, orb: 1.2 },
			],
			kaksha: {
				number: 3,
				lord: 'Mars',
				startDegree: 7.5,
				endDegree: 11.25,
				bindu: true,
				binduCount: 4,
			},
		},
	],
	keyTransits: [],
} as unknown as CalculateTransitResponse;

describe('gochara reads from the natal Moon', () => {
	test('the fixture can tell the two references apart', () => {
		expect(SUN_FROM_MOON).not.toBe(SUN_FROM_LAGNA);
	});

	test('both house readings render, each naming its own reference', async () => {
		const body = text(await mount(FIXTURE));
		expect(body).toContain(`house ${SUN_FROM_MOON} from the Moon`);
		expect(body).toContain(`house ${SUN_FROM_LAGNA} from the Lagna`);
	});

	test('the card names the Janma Rashi the houses are counted from', async () => {
		expect(text(await mount(FIXTURE))).toContain(
			`counted from the natal Moon in ${MOON_SIGN}`,
		);
	});

	test('drishti is listed under its own label beside the degree aspects', async () => {
		const body = text(await mount(FIXTURE));
		// Parashari jyotish has no sextile, so the Western vocabulary may appear
		// only where it is labelled as the degree-based reading.
		expect(body).toContain('Drishti');
		expect(body).toContain('7th natal Ketu');
		expect(body).toContain('Aspects');
		expect(body).toContain('Sextile natal Mars');
	});

	test('the sidereal frame the chart was cast in is stated', async () => {
		expect(text(await mount(FIXTURE))).toContain('Lahiri');
	});
});
