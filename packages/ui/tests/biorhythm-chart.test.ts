import { describe, expect, test } from 'bun:test';
import '../src/index.js';

const FORECAST = {
	birthDate: '1990-01-15',
	startDate: '2026-07-01',
	endDate: '2026-07-02',
	totalDays: 2,
	days: [
		{
			date: '2026-07-01',
			daysSinceBirth: 13316,
			physical: -27.25,
			emotional: -43,
			intellectual: -10,
			intuitive: 48,
			energyRating: 4,
			isCritical: false,
			criticalCycles: [],
		},
		{
			date: '2026-07-02',
			daysSinceBirth: 13317,
			physical: 0,
			emotional: -34,
			intellectual: 9,
			intuitive: 34.5,
			energyRating: 5,
			isCritical: true,
			criticalCycles: ['physical'],
		},
	],
	summary: {
		bestDay: '2026-07-02',
		worstDay: '2026-07-01',
		averageEnergy: 4.5,
		criticalDayCount: 1,
		periodAdvice: 'PERIODREADING',
	},
};

describe('biorhythm forecast exact data access', () => {
	for (const hideReadings of [false, true]) {
		test(`every date and value is reachable with hide-readings ${hideReadings}`, async () => {
			const el = document.createElement('roxy-biorhythm-chart');
			el.mode = 'forecast';
			el.hideReadings = hideReadings;
			el.data = FORECAST;
			document.body.append(el);
			await el.updateComplete;
			const root = el.shadowRoot as ShadowRoot;
			expect(root.querySelector('.forecast-data summary')).not.toBeNull();
			expect(
				root.querySelector('.forecast-scroll')?.getAttribute('tabindex'),
			).toBe('0');
			const rows = [...root.querySelectorAll('.forecast-table tbody tr')];
			expect(rows).toHaveLength(2);
			expect(
				rows.map((row) => row.querySelector('time')?.getAttribute('datetime')),
			).toEqual(FORECAST.days.map((day) => day.date));
			expect(
				[...(rows[0]?.querySelectorAll('td') ?? [])].map(
					(node) => node.textContent,
				),
			).toEqual([
				'-27.25%',
				'-43%',
				'-10%',
				'48%',
				'Energy 4/10',
				'13,316',
				'None',
			]);
			expect(rows[1]?.textContent).toContain('Physical');
			expect(root.querySelector('.forecast-axis')?.textContent).toContain(
				'Jul 1, 2026',
			);
			const card = root.querySelector('[part="card"]')?.textContent ?? '';
			expect(card.includes('PERIODREADING')).toBe(!hideReadings);
			el.remove();
		});
	}
});
