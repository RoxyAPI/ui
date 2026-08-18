import { describe, expect, test } from 'bun:test';

// Importing the index registers every custom element. happy-dom is loaded by
// preload (bunfig.toml).
import '../src/index.js';
import { registerLocale } from '../src/i18n/registry.js';
import { es } from '../src/locales/es.js';
import type { CalculateSynastryResponse } from '../src/types/index.js';

const settled = (el: Element): Promise<void> =>
	(el as unknown as { updateComplete: Promise<void> }).updateComplete;

async function mount(data: unknown): Promise<HTMLElement> {
	const el = document.createElement('roxy-synastry-chart');
	(el as HTMLElement & { data: unknown }).data = data;
	document.body.appendChild(el);
	await settled(el);
	return el;
}

const root = (el: HTMLElement): ShadowRoot => el.shadowRoot as ShadowRoot;
const text = (el: HTMLElement): string => root(el).textContent ?? '';

/** Every `<title>` the wheel emits, which is what a hover and a screen reader read. */
const tooltips = (el: HTMLElement): string[] =>
	[...root(el).querySelectorAll('title')].map((n) => n.textContent ?? '');

const person = (name: string, house: number) => ({
	name,
	ascendant: { sign: 'Leo', degree: 12.5 },
	sunSign: 'Aries',
	moonSign: 'Taurus',
	planets: [
		{
			name: 'Venus',
			longitude: 42.5,
			sign: 'Taurus',
			degree: 12.5,
			house,
			isRetrograde: false,
		},
	],
});

const FIXTURE = {
	person1: person('A', 10),
	person2: person('B', 4),
	compatibilityScore: 72,
	interAspects: [],
	summary: { total: 0, harmonious: 0, challenging: 0, neutral: 0 },
} as unknown as CalculateSynastryResponse;

describe('the synastry wheel says what it draws', () => {
	test('the legend names the sectors as signs', async () => {
		// Twelve spokes on a round chart read as house cusps to anyone used to a
		// house wheel, and this wheel divides by sign. The words are the only thing
		// standing between the two readings.
		expect(text(await mount(FIXTURE))).toContain('Sign sectors, not houses');
	});

	test('each planet carries the house it holds in its own chart', async () => {
		const found = tooltips(await mount(FIXTURE));
		expect(found.some((t) => t.includes('House 10'))).toBe(true);
		expect(found.some((t) => t.includes('House 4'))).toBe(true);
	});

	test('the score is announced through the catalogue, not a bare literal', async () => {
		// Asserted in Spanish on purpose. In English a catalogue lookup and a bare
		// template literal produce the same bytes, so an English assertion cannot
		// tell them apart and would pass on the untranslated form.
		registerLocale('es', es);
		document.documentElement.lang = 'es';
		const el = await mount(FIXTURE);
		expect(root(el).querySelector('.score')?.getAttribute('aria-label')).toBe(
			es['Score {{score}} of 100'].replace('{{score}}', '72'),
		);
		document.documentElement.lang = '';
		el.remove();
	});
});
