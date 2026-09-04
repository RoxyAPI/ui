/**
 * The shadcn registry theme (`registry/theme.json`) is the bridge a shadcn host installs, so it
 * is held to `src/styles/tokens.css`.
 *
 * @remarks
 * A bridge entry that is absent is not an error, it is a default: the token keeps the library
 * value and the component paints a stock card on a themed host, with nothing to fail. So the
 * required set is derived from the token source rather than listed here, and the assertions run
 * on the committed JSON, because that file is what jsDelivr serves at the release tag. THEMING.md
 * is held to the same source by `theming-docs.test.ts`, on the same parser.
 */

import { describe, expect, test } from 'bun:test';
import { HEX, TOKENS_CSS, tokensFromCss } from './token-source.js';

const REGISTRY_THEME = 'registry/theme.json';

type Bridge = Record<string, string>;

/** The `:root` bridge and the `.dark` overrides the registry theme declares. */
async function bridge(): Promise<{ root: Bridge; dark: Bridge }> {
	const entry = JSON.parse(await Bun.file(REGISTRY_THEME).text()) as {
		css: { '@layer base': { ':root': Bridge; '.dark'?: Bridge } };
	};
	const base = entry.css['@layer base'];
	return { root: base[':root'], dark: base['.dark'] ?? {} };
}

/** Radius tokens with a host counterpart. The pill radius is a shape, not a scale step, so no shadcn `--radius` derivation is right for it. */
const RADIUS_WITHOUT_HOST = new Set(['--roxy-radius-full']);

describe('registry/theme.json is the shadcn bridge and may not drift from tokens.css', () => {
	test('every colour token tokens.css defines is bridged', async () => {
		const { light } = await tokensFromCss();
		const { root } = await bridge();
		const colours = [...light.keys()].filter((t) =>
			HEX.test(light.get(t) ?? ''),
		);
		expect(
			colours.length,
			'the colour filter matched nothing, so this asserts nothing',
		).toBeGreaterThan(10);

		const unbridged = colours.filter((t) => !(t in root)).sort();
		expect(
			unbridged,
			`Defined in ${TOKENS_CSS} and absent from ${REGISTRY_THEME}. A shadcn host that installs ` +
				'the theme keeps these at the library default, which paints a stock card on a themed ' +
				'host:\n  ' +
				unbridged.join('\n  '),
		).toEqual([]);
	});

	test('the bridge names no token that does not exist', async () => {
		const { light, dark } = await tokensFromCss();
		const { root, dark: darkBridge } = await bridge();
		const invented = [...Object.keys(root), ...Object.keys(darkBridge)]
			.filter((t) => !light.has(t) && !dark.has(t))
			.sort();
		expect(
			invented,
			`Bridged in ${REGISTRY_THEME} but defined nowhere in ${TOKENS_CSS}, so the host value goes nowhere:\n  ` +
				invented.join('\n  '),
		).toEqual([]);
	});

	test('the card and the input field follow different host tokens', async () => {
		const { root } = await bridge();
		// shadcn paints its cards with `--card`, not `--background`, so the two must not share
		// a host token or a themed host gets a page-coloured sheet where the card should be.
		expect(root['--roxy-surface']).toMatch(/var\(--card\b/);
		expect(root['--roxy-bg']).toMatch(/var\(--background\b/);
	});

	test('every host reference carries a fallback, so an unthemed host still renders', async () => {
		const { root, dark } = await bridge();
		const bare: string[] = [];
		for (const [name, value] of [
			...Object.entries(root),
			...Object.entries(dark),
		]) {
			const refs = value.match(/var\(/g)?.length ?? 0;
			const withFallback = value.match(/var\(--[a-z0-9-]+\s*,/g)?.length ?? 0;
			if (refs !== withFallback) bare.push(`${name}: ${value}`);
		}
		expect(
			bare,
			'A host token referenced with no fallback is `initial` on a page that never set it, ' +
				'which paints transparent surfaces and invisible text:\n  ' +
				bare.join('\n  '),
		).toEqual([]);
	});

	test('a literal colour in the light bridge has a dark override, and every override has a light entry', async () => {
		const { root, dark } = await bridge();
		// A literal cannot follow the host theme, so the `.dark` block is the only thing that
		// stops light-surface status ink landing on a dark card.
		const stuck = Object.entries(root)
			.filter(([, v]) => HEX.test(v))
			.map(([name]) => name)
			.filter((name) => !HEX.test(dark[name] ?? ''))
			.sort();
		expect(
			stuck,
			'Bridged as a bare colour with no dark counterpart, so it stays a light-theme value on a dark host:\n  ' +
				stuck.join('\n  '),
		).toEqual([]);

		const orphaned = Object.keys(dark)
			.filter((name) => !(name in root))
			.sort();
		expect(
			orphaned,
			'A dark-only override bridges nothing in light mode:\n  ' +
				orphaned.join('\n  '),
		).toEqual([]);
	});

	test('the radius scale follows the host radius', async () => {
		const { light } = await tokensFromCss();
		const { root } = await bridge();
		const radii = [...light.keys()].filter(
			(t) => t.startsWith('--roxy-radius-') && !RADIUS_WITHOUT_HOST.has(t),
		);
		expect(radii.length).toBeGreaterThan(0);

		const off = radii
			.filter((t) => !/var\(--radius\b/.test(root[t] ?? ''))
			.sort();
		expect(
			off,
			'A radius step not derived from the host `--radius` gives a component corners that ' +
				'disagree with the buttons beside it:\n  ' +
				off.join('\n  '),
		).toEqual([]);
	});
});
