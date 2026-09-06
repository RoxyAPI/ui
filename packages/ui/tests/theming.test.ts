import { describe, expect, test } from 'bun:test';
import { readdirSync, readFileSync } from 'node:fs';

import { ROXY_UI_TOKENS_CSS } from '../src/styles/tokens-css.js';
import {
	injectRoxyTokens,
	ROXY_UI_TOKENS_STYLE_ID,
} from '../src/utils/inject-tokens.js';

const TOKENS_CSS = readFileSync(
	new URL('../src/styles/tokens.css', import.meta.url),
	'utf8',
);

describe('tokens.css theme selectors', () => {
	test('dark block targets light-DOM ancestor selectors, not the dead `.dark :host`', () => {
		// The fix: tokens.css ships as a global light-DOM sheet, so dark must be
		// triggered by light-DOM selectors whose vars inherit through the shadow
		// boundary. `.dark :host` matched nothing in global delivery.
		expect(TOKENS_CSS).toContain(':root.dark');
		// Whitespace-agnostic: the rules are indented inside the @layer block.
		expect(TOKENS_CSS).toMatch(/^\s*\.dark,$/m);
		expect(TOKENS_CSS).toContain('[data-theme="dark"]');
		expect(TOKENS_CSS).not.toContain('.dark :host');
	});

	test('light opt-out block targets light-DOM ancestor selectors, not the dead `.light :host`', () => {
		expect(TOKENS_CSS).toContain(':root.light');
		expect(TOKENS_CSS).toMatch(/^\s*\.light,$/m);
		expect(TOKENS_CSS).toContain('[data-theme="light"]');
		expect(TOKENS_CSS).not.toContain('.light :host');
	});

	test('no :host-context (Firefox does not support it)', () => {
		expect(TOKENS_CSS).not.toContain(':host-context');
	});

	test('keeps the OS preference and explicit blocks', () => {
		expect(TOKENS_CSS).toContain('@media (prefers-color-scheme: dark)');
		expect(TOKENS_CSS).toContain(':root[data-theme="dark"]');
	});

	test('explicit dark block comes after the @media block so a choice beats the OS default', () => {
		const mediaIdx = TOKENS_CSS.indexOf('@media (prefers-color-scheme: dark)');
		const explicitDarkIdx = TOKENS_CSS.indexOf(':root.dark');
		expect(mediaIdx).toBeGreaterThanOrEqual(0);
		expect(explicitDarkIdx).toBeGreaterThan(mediaIdx);
	});
});

/**
 * The defaults live in a cascade layer, which is half of what puts the host page in charge.
 *
 * @remarks
 * `:where()` answers a host rule of equal or lower SPECIFICITY. It cannot answer a host rule
 * written inside a layer, because an unlayered declaration beats a layered one at any
 * specificity, and a framework that writes its tokens in `@layer base` therefore lost to these
 * defaults however it was written. Both mechanisms are kept: the layer settles the layered case,
 * `:where()` settles the rest.
 *
 * The order statement is asserted too, because a layer that is never named sorts LAST among
 * layers, which would invert the theme presets against the defaults they reassign.
 *
 * `tests/e2e/theming.e2e.ts` proves the effect in a real cascade, in both modes. This suite only
 * proves the shape, which is what a browser cannot be asked about cheaply on every run.
 */
describe('tokens.css cascade layer', () => {
	const withoutComments = TOKENS_CSS.replace(/\/\*[\s\S]*?\*\//g, '');

	test('declares the layer order before anything else', () => {
		expect(
			withoutComments.trim().startsWith('@layer roxy.tokens, roxy.theme;'),
		).toBe(true);
	});

	test('every rule sits inside the roxy.tokens layer', () => {
		const body = withoutComments.slice(
			withoutComments.indexOf('@layer roxy.tokens, roxy.theme;') +
				'@layer roxy.tokens, roxy.theme;'.length,
		);
		// One block, opened once and closed at the end of the file: anything after
		// the closing brace would be an unlayered rule outranking the host page.
		expect(body.trim().startsWith('@layer roxy.tokens {')).toBe(true);
		expect(body.trim().endsWith('}')).toBe(true);
		expect([...body.matchAll(/@layer\s+roxy\.tokens\s*\{/g)]).toHaveLength(1);
		const opens = (body.match(/\{/g) ?? []).length;
		const closes = (body.match(/\}/g) ?? []).length;
		expect(opens).toBe(closes);
	});

	test('a block added later cannot open at non-zero specificity', () => {
		// The ratchet beside the named-selector check below, which pins the four
		// triggers this file has today: this one holds any FIFTH block to the same
		// rule, because both halves are needed. A layer alone loses to any unlayered
		// rule the host never meant as an override, and :where() alone loses to a
		// layered one.
		const selectors = [
			...withoutComments.matchAll(/^\t(:where\(|:root|\.\w)/gm),
		];
		expect(selectors.length).toBeGreaterThan(0);
		for (const [, opener] of selectors) expect(opener).toBe(':where(');
	});
});

describe('tokens-css.ts codegen', () => {
	test('is byte-identical to tokens.css (run `bun run tokens:sync` if this fails)', () => {
		expect(ROXY_UI_TOKENS_CSS).toBe(TOKENS_CSS);
	});

	test('carries the dark token value so a CDN-only page can theme', () => {
		expect(ROXY_UI_TOKENS_CSS).toContain('--roxy-bg: #0a0a0a');
		expect(ROXY_UI_TOKENS_CSS).toContain('--roxy-fg: #fafafa');
	});
});

describe('injectRoxyTokens', () => {
	test('injects one #roxy-ui-tokens style, prepended, and is idempotent', () => {
		document.head.innerHTML = '';
		// A consumer override placed first; the prepended token style must land
		// before it so the override still wins on ties.
		const consumerOverride = document.createElement('style');
		consumerOverride.id = 'consumer-brand';
		document.head.appendChild(consumerOverride);

		const countTokenStyles = () =>
			[...document.head.children].filter(
				(el) => el.id === ROXY_UI_TOKENS_STYLE_ID,
			).length;

		const first = injectRoxyTokens();
		expect(first).not.toBeNull();
		expect(first?.id).toBe(ROXY_UI_TOKENS_STYLE_ID);

		expect(countTokenStyles()).toBe(1);
		// Prepended: it is the first child, before the consumer override.
		expect(document.head.firstElementChild?.id).toBe(ROXY_UI_TOKENS_STYLE_ID);

		// Second call is a no-op: still exactly one, same element.
		const second = injectRoxyTokens();
		expect(second).toBe(first);
		expect(countTokenStyles()).toBe(1);
	});

	test('carries the full token contract including dark values', () => {
		document.head.innerHTML = '';
		const style = injectRoxyTokens();
		expect(style?.textContent).toContain('--roxy-bg: #0a0a0a');
		expect(style?.textContent).toContain('.dark');
	});
});

/**
 * `--roxy-accent-ink` and `--roxy-ring` DERIVE from `--roxy-accent`, so overriding the accent alone rebrands the library instead of leaving the active tab, the conjunction aspect lines and the focus ring painting the old amber.
 *
 * @remarks
 * The defaults are BOTH layered and `:where()`d, and the two answer different halves: the layer settles a host rule written inside a layer of its own, `:where()` settles the rest. The consequence to keep in mind when touching anything that emits tokens is that ANY unlayered declaration of a `--roxy-*` wins, in both modes, which is the contract and is also a trap for our own pages: emitting the DEFAULTS back out at real specificity, as a colour picker sitting at its initial state would, pins the page to whichever mode those values came from. The showcase customizer therefore injects nothing until a swatch is edited, and then injects a light block and a dark one. A consumer who themes dark differently sets the accent in their dark block too, exactly as shadcn requires.
 */
describe('theming contract', () => {
	test('every library selector has ZERO specificity via :where()', () => {
		// Without this, `:root.dark` and `[data-theme="dark"]` (0,1,1) outrank a
		// consumer's plain `:root` (0,1,0), so their brand accent survived under
		// prefers-color-scheme and reverts to amber under the other two
		// dark signals: one override, three different results.
		expect(TOKENS_CSS).toContain(':where(:root, :host)');
		expect(TOKENS_CSS).toMatch(/:where\(\s*:root\[data-theme="dark"\]/);
		expect(TOKENS_CSS).toMatch(/:where\(\s*:root\[data-theme="light"\]/);
		// No bare high-specificity theme selector may remain.
		expect(TOKENS_CSS).not.toMatch(/^:root\[data-theme="dark"\],$/m);
		expect(TOKENS_CSS).not.toMatch(/^\.dark,$/m);
	});

	test('every theme trigger declares color-scheme, or native controls stay light', () => {
		// A <select> we colour ourselves looks right closed and then opens a popup the OS
		// paints in its LIGHT appearance, whose <option> rows inherit our near-white
		// --roxy-fg: white text on white. Reported on the hosted embed forms. The popup is
		// rendered outside the DOM, so no selector reaches it and `color-scheme` is the only
		// control we have. Same omission dims the date and time pickers, the number spinner,
		// the autofill highlight and the scrollbar.
		//
		// Counted rather than merely present: there are four theme triggers (light default,
		// the prefers-color-scheme block, and the explicit light and dark opt-ins), and one
		// missing declaration means that ONE path renders native controls in the wrong scheme
		// while the other three look correct, which is the hardest shape to notice.
		// Anchored to a declaration, because `prefers-color-scheme: dark` CONTAINS the
		// substring `color-scheme: dark`: a loose match counts all four media queries and
		// their prose and reports 6 where there are 2, passing whether or not the property
		// is declared at all.
		const light = TOKENS_CSS.match(/^\s*color-scheme:\s*light;/gm) ?? [];
		const dark = TOKENS_CSS.match(/^\s*color-scheme:\s*dark;/gm) ?? [];
		expect(
			light.length,
			'color-scheme: light must be in the default and explicit-light blocks',
		).toBe(2);
		expect(
			dark.length,
			'color-scheme: dark must be in the media block and the explicit-dark block',
		).toBe(2);
	});

	test('accent-ink and ring derive from --roxy-accent, never hardcoded', () => {
		expect(TOKENS_CSS).not.toMatch(/--roxy-accent-ink:\s*#/);
		expect(TOKENS_CSS).not.toMatch(/--roxy-ring:\s*rgba\(/);
		expect(TOKENS_CSS).toContain(
			'--roxy-accent-ink: color-mix(in oklab, var(--roxy-accent) 70%, black)',
		);
		expect(TOKENS_CSS).toContain(
			'--roxy-ring: color-mix(in srgb, var(--roxy-accent) 40%, transparent)',
		);
	});

	/**
	 * The four status inks get the accent-ink treatment, and the same guard, because the same defect is available to them: a fixed ink beside a re-pointed base paints the old hue on every rule that reads it, which is what the practitioner preset shows when it moves `--roxy-danger` alone.
	 *
	 * Both directions are asserted per status, because a partial derivation is the worst outcome: a light block that mixes and a dark block that does not is a legible page in one mode and a dark green on near-black in the other.
	 */
	for (const status of ['success', 'warning', 'danger', 'info'] as const) {
		test(`--roxy-${status}-fg derives from its base in every block`, () => {
			expect(TOKENS_CSS).not.toMatch(new RegExp(`--roxy-${status}-fg:\\s*#`));
			const derived = [
				...TOKENS_CSS.matchAll(
					new RegExp(
						`--roxy-${status}-fg: color-mix\\(in oklab, var\\(--roxy-${status}\\) 70%, (black|white)\\);`,
						'g',
					),
				),
			].map(([, toward]) => toward);
			// Four theme triggers: light default and the explicit light opt-out mix
			// toward black, the media block and the explicit dark opt-in toward white.
			expect(derived.filter((t) => t === 'black')).toHaveLength(2);
			expect(derived.filter((t) => t === 'white')).toHaveLength(2);
		});
	}
});

/**
 * The display-font token aliases the sans stack by default, so an existing consumer sees no change; a preset overrides it to restyle every result heading and the form title in one token. happy-dom cannot resolve a var() chain, so the default is proven by construction (the token literally references --roxy-font-sans) plus a computed check that lives in the e2e suite.
 */
describe('font-display token', () => {
	test('defaults to the sans stack, so an unset preset renders headings in the body font', () => {
		expect(TOKENS_CSS).toContain('--roxy-font-display: var(--roxy-font-sans)');
		// It is only ever the alias, never a hardcoded (quoted) family, which would
		// break the "unset equals sans" guarantee.
		expect(TOKENS_CSS).not.toMatch(/--roxy-font-display:\s*"/);
	});

	test('the shared heading rule consumes the display token with a sans fallback', () => {
		const base = readFileSync(
			new URL('../src/utils/base-styles.ts', import.meta.url),
			'utf8',
		);
		expect(base).toMatch(/h1,\s*h2,\s*h3,\s*h4/);
		expect(base).toMatch(
			/font-family:\s*var\(\s*--roxy-font-display,\s*var\(\s*--roxy-font-sans/,
		);
	});
});

/**
 * Ink on a status tint. `--roxy-success` and its siblings are tuned to read on
 * the card surface; painted on a tint of themselves they land near 3:1, which is
 * why the palette carries a `-fg` partner for exactly that case. The failure is
 * invisible on a screenshot and, when the tint sits behind a disclosure, invisible
 * to the accessibility pass too, so it is asserted from source instead.
 */
describe('status ink is the -fg token wherever a status tint is the background', () => {
	const STATUS = ['success', 'danger', 'warning', 'info'] as const;
	/** Every declaration block in a component stylesheet, as its own string. */
	const blocks = (src: string): string[] => src.match(/\{[^{}]*\}/g) ?? [];

	test('no component paints a status colour on a tint of itself', () => {
		const offenders: string[] = [];
		for (const rel of readdirSync('packages/ui/src/components')) {
			if (!rel.endsWith('.ts') || rel.endsWith('.test.ts')) continue;
			const src = readFileSync(`packages/ui/src/components/${rel}`, 'utf8');
			for (const block of blocks(src)) {
				for (const name of STATUS) {
					const tinted = new RegExp(
						`background[^;]*color-mix\\([^;]*--roxy-${name}[,)\\s]`,
					).test(block);
					if (!tinted) continue;
					const ink = /color:\s*var\(\s*(--roxy-[\w-]+)/.exec(block)?.[1];
					if (ink && !ink.endsWith('-fg')) {
						offenders.push(`${rel}: ${name} tint painted with ${ink}`);
					}
				}
			}
		}
		expect(
			offenders,
			`Use the -fg partner for ink on a status tint:\n  ${offenders.join('\n  ')}`,
		).toEqual([]);
	});
});

/**
 * Contrast of the chart gate marks, computed from the token file rather than
 * measured in a browser.
 *
 * @remarks
 * The accessibility pass cannot read these. SVG text is painted by `fill`, and a
 * gate number sits on its own disc, which is a SIBLING shape rather than an
 * ancestor; the scan resolves the inherited `color` against the centre polygon
 * behind the disc instead, so it reports a pair that is never painted, and it
 * resolves it differently per engine. The values below are the pairs the browser
 * actually paints, so they are asserted here and the chart is excluded there.
 */
describe('gate marks clear AA against the disc they are painted on', () => {
	const luminance = (hex: string): number => {
		const h = hex.replace('#', '');
		const c = [0, 2, 4]
			.map((i) => Number.parseInt(h.slice(i, i + 2), 16) / 255)
			.map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
		return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
	};
	const contrast = (a: string, b: string): number => {
		const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
		return (hi + 0.05) / (lo + 0.05);
	};

	/** ink, disc, label. Light and dark values as the token file sets them. */
	const PAIRS: ReadonlyArray<readonly [string, string, string]> = [
		// Unactivated gate: muted number on a surface disc.
		['#71717a', '#ffffff', 'light unactivated'],
		['#a1a1aa', '#18181b', 'dark unactivated'],
		// Single chart: the two sides, ink knocked out in the surface colour.
		['#ffffff', '#0a0a0a', 'light personality'],
		['#ffffff', '#dc2626', 'light design'],
		['#18181b', '#fafafa', 'dark personality'],
		['#18181b', '#ef4444', 'dark design'],
		// Composite chart: constant colours, so the ink is pinned white in both.
		['#ffffff', '#1f6fb2', 'person A'],
		['#ffffff', '#b04e14', 'person B'],
	];

	test('every ink and disc pair clears 4.5:1', () => {
		const weak = PAIRS.filter(([ink, disc]) => contrast(ink, disc) < 4.5).map(
			([ink, disc, label]) =>
				`${label}: ${ink} on ${disc} is ${contrast(ink, disc).toFixed(2)}`,
		);
		expect(weak, weak.join('\n')).toEqual([]);
	});

	test('the pairs are the values the token file actually sets', () => {
		for (const value of [
			'#71717a',
			'#a1a1aa',
			'#0a0a0a',
			'#fafafa',
			'#dc2626',
			'#ef4444',
		]) {
			expect(TOKENS_CSS, `${value} is no longer in tokens.css`).toContain(
				value,
			);
		}
	});
});
