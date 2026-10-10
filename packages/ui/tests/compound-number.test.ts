import { describe, expect, test } from 'bun:test';

import '../src/index.js';

/** Live `GET /numerology/compound-number/23`, a named fortunate compound. */
const ROYAL_STAR = {
	number: 23,
	name: 'The Royal Star of the Lion',
	nature: 'fortunate',
	meaning:
		'A promise of success, help from superiors and protection from those in high places. In dealing with future events it is one of the most fortunate numbers and a promise that plans will succeed.',
	root: 5,
};

/** Live `GET /numerology/compound-number/33`, an unnamed compound that repeats 24. */
const REPEAT = {
	number: 33,
	name: null,
	nature: 'fortunate',
	meaning:
		'A fortunate number promising the assistance and association of those of rank and position. It also denotes gain through love and through the opposite sex, and is favorable when it relates to future events.',
	root: 6,
	sameAs: 24,
};

async function mount(
	data: unknown,
	attrs: Record<string, string> = {},
): Promise<ShadowRoot> {
	const el = document.createElement('roxy-compound-number');
	for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
	(el as HTMLElement & { data: unknown }).data = data;
	document.body.appendChild(el);
	await (el as unknown as { updateComplete: Promise<void> }).updateComplete;
	return el.shadowRoot as ShadowRoot;
}

const badges = (root: ShadowRoot): string[] =>
	[...root.querySelectorAll('[part~="details"] .badge')].map(
		(b) => b.textContent?.trim() ?? '',
	);

describe('roxy-compound-number', () => {
	test('renders every field of a named compound', async () => {
		const root = await mount(ROYAL_STAR);
		expect(root.querySelector('.numeral')?.textContent).toBe('23');
		expect(root.querySelector('.label')?.textContent).toBe('Compound number');
		expect(root.querySelector('h2')?.textContent).toBe(ROYAL_STAR.name);
		expect(badges(root)).toEqual(['Root number 5', 'Fortunate']);
		expect(root.querySelector('[part~="readings"]')?.textContent).toBe(
			ROYAL_STAR.meaning,
		);
	});

	test('an unnamed repeat prints no title and names the compound it repeats', async () => {
		const root = await mount(REPEAT);
		expect(root.querySelector('h2')).toBeNull();
		expect(badges(root)).toEqual([
			'Root number 6',
			'Fortunate',
			'Same meaning as 24',
		]);
	});

	test('each nature reads in its own status tint', async () => {
		const tones: Record<string, string> = {
			fortunate: 'success',
			unfortunate: 'danger',
			mixed: 'warning',
		};
		for (const [nature, tone] of Object.entries(tones)) {
			const root = await mount({ ...ROYAL_STAR, nature });
			expect(
				root.querySelector(`.badge.${tone}`)?.textContent?.trim(),
			).toBeTruthy();
		}
		const mixed = await mount({ ...ROYAL_STAR, nature: 'mixed' });
		expect(badges(mixed)).toContain('Mixed fortune');
	});

	test('hide-readings drops the meaning and keeps every fact', async () => {
		const root = await mount(REPEAT, { 'hide-readings': '' });
		expect(root.querySelector('[part~="readings"]')).toBeNull();
		expect(root.textContent).not.toContain('assistance');
		expect(badges(root)).toHaveLength(3);
	});
});
