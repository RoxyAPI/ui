import { describe, expect, test } from 'bun:test';

// Importing the index registers every custom element. happy-dom is loaded by
// preload (bunfig.toml).
import '../src/index.js';
import type { NatalChartResponse } from '../src/types/index.js';

const settled = (el: Element): Promise<void> =>
	(el as unknown as { updateComplete: Promise<void> }).updateComplete;

async function mount(data: unknown): Promise<HTMLElement> {
	const el = document.createElement('roxy-western-planets-table');
	(el as HTMLElement & { data: unknown }).data = data;
	document.body.appendChild(el);
	await settled(el);
	return el;
}

const root = (el: HTMLElement): ShadowRoot => el.shadowRoot as ShadowRoot;

/** The dignity cell of each row, in row order. */
const dignities = (el: HTMLElement): string[] =>
	[...root(el).querySelectorAll('tbody tr')].map(
		(r) => r.querySelector('.dignity')?.textContent?.trim() ?? '',
	);

const FIXTURE = {
	planets: [
		{
			name: 'Sun',
			longitude: 125.4,
			sign: 'Leo',
			degree: 5.4,
			house: 5,
			speed: 0.95,
			isRetrograde: false,
			dignity: 'domicile',
		},
		{
			name: 'Saturn',
			longitude: 125.9,
			sign: 'Leo',
			degree: 5.9,
			house: 5,
			speed: 0.1,
			isRetrograde: false,
			dignity: 'detriment',
		},
		// Rules no sign, so the response sends no dignity at all.
		{
			name: 'North Node',
			longitude: 12.3,
			sign: 'Aries',
			degree: 12.3,
			house: 1,
			speed: -0.05,
			isRetrograde: true,
		},
	],
} as unknown as NatalChartResponse;

describe('essential dignity reaches the positions table', () => {
	test('each body that holds a dignity prints it', async () => {
		const cells = dignities(await mount(FIXTURE));
		expect(cells[0]).toBe('Domicile');
		expect(cells[1]).toBe('Detriment');
	});

	test('a body that rules no sign gets a BLANK cell, never Peregrine', async () => {
		// The response omits the field for the nodes, Chiron and Lilith, and an
		// absent value is a different answer from peregrine: one says the question
		// does not apply, the other says the body is in none of its own signs.
		// Printing the neutral state here invents a reading, exactly as rendering a
		// null bindu as unfavourable would.
		const cells = dignities(await mount(FIXTURE));
		expect(cells[2]).toBe('');
	});

	test('the table announces the dignity column', async () => {
		const headers = [...root(await mount(FIXTURE)).querySelectorAll('th')].map(
			(h) => h.textContent?.trim() ?? '',
		);
		expect(headers).toContain('Dignity');
	});
});
