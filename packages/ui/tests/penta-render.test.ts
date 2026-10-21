import { describe, expect, test } from 'bun:test';
import '../src/index.js';

const CHANNELS = [
	[7, 31],
	[1, 8],
	[13, 33],
	[15, 5],
	[2, 14],
	[46, 29],
];

describe('penta member ownership stays inside every column', () => {
	for (const count of [3, 4, 5]) {
		test(`${count} members fit with matching figure and list letters`, async () => {
			const heldBy = Array.from({ length: count }, (_, i) => i);
			const el = document.createElement('roxy-hd-penta');
			el.data = {
				memberCount: count,
				summary: {
					definedChannels: CHANNELS.length,
					filledGates: CHANNELS.flat().length,
					gapGates: [],
					coreDefined: true,
				},
				channels: CHANNELS.map(([gateA, gateB], i) => ({
					gateA,
					gateB,
					name: `Channel ${i}`,
					circuit: 'Individual',
					isCore: i === 4,
					defined: true,
					position: i < 3 ? 'upper' : 'lower',
					gateAHeldBy: heldBy,
					gateBHeldBy: heldBy,
				})),
				gates: CHANNELS.flat().map((gate) => ({
					gate,
					gateName: String(gate),
					filled: true,
					heldBy,
				})),
			};
			document.body.append(el);
			await el.updateComplete;
			const root = el.shadowRoot as ShadowRoot;
			const svg = root.querySelector('svg.chart') as SVGSVGElement;
			const [, , width, height] = (svg.getAttribute('viewBox') ?? '')
				.split(' ')
				.map(Number);
			const circles = [...root.querySelectorAll('.pn-badge')];
			expect(circles).toHaveLength(CHANNELS.length * 2 * count);
			for (const circle of circles) {
				const x = Number(circle.getAttribute('cx'));
				const y = Number(circle.getAttribute('cy'));
				const r = Number(circle.getAttribute('r'));
				expect(x - r).toBeGreaterThanOrEqual(0);
				expect(x + r).toBeLessThanOrEqual(width as number);
				expect(y - r).toBeGreaterThanOrEqual(0);
				expect(y + r).toBeLessThanOrEqual(height as number);
			}
			const letters = 'ABCDE'.slice(0, count).split('');
			const firstGate = root.querySelector('.pn-gate')?.closest('g');
			expect(
				[...(firstGate?.querySelectorAll('.pn-badge-text') ?? [])].map(
					(n) => n.textContent,
				),
			).toEqual(letters);
			expect(root.querySelector('.held')?.textContent).toContain(
				letters.join(', '),
			);
			(
				root.querySelector('.roxy-chart-tools button') as HTMLButtonElement
			).click();
			await el.updateComplete;
			const expanded = root.querySelector('.roxy-chart-expanded svg');
			expect(expanded?.namespaceURI).toBe('http://www.w3.org/2000/svg');
			expect(expanded?.querySelectorAll('.pn-badge')).toHaveLength(
				circles.length,
			);
			el.remove();
		});
	}
});
