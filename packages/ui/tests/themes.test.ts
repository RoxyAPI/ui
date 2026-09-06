import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import {
	type Palette,
	type PaletteName,
	ROXY_PALETTES,
	SELF_HOSTED_FACES,
	SELF_HOSTED_FONT_PALETTE,
	SHARED_THEME,
} from '../src/styles/palettes.js';

/**
 * Every shipped theme file is generated from ROXY_PALETTES by scripts/sync-themes.ts. This suite parses each generated CSS and pins it back to the data: the four trigger blocks are present, each carries exactly its token set, and every value equals the palette (or the shared chrome / the accent-ink and ring derivations). A hand-edit to a generated file, a dropped block, or a palette that drifts from its CSS fails here. It is the whole preset contract, so theming.test.ts asserts the token source only.
 */
const norm = (v: string) => v.replace(/\s+/g, ' ').trim();
const LIGHT_INK = 'color-mix(in oklab, var(--roxy-accent) 70%, black)';
const DARK_INK = 'var(--roxy-accent)';

function read(name: PaletteName): string {
	return readFileSync(
		new URL(`../src/styles/themes/${name}.css`, import.meta.url),
		'utf8',
	);
}

/** Declaration body of the `{ ... }` that follows the first `) {` at or after `from`. Token blocks never nest braces, so the first `}` closes the block. */
function bodyFrom(css: string, from: number): string {
	const open = css.indexOf('{', css.indexOf(') {', from));
	const close = css.indexOf('}', open);
	return css.slice(open + 1, close);
}

/** `--roxy-{name}` declarations in a block, name -> whitespace-normalised value. */
function parseTokens(body: string): Record<string, string> {
	const out: Record<string, string> = {};
	for (const m of body.matchAll(/--roxy-([\w-]+)\s*:\s*([^;]+);/g)) {
		out[m[1]] = norm(m[2]);
	}
	return out;
}

function lightColors(p: Palette, ring: boolean): Record<string, string> {
	return {
		accent: p.light.accent,
		'accent-ink': LIGHT_INK,
		...(ring ? { ring: 'var(--roxy-accent)' } : {}),
		secondary: p.light.secondary,
		danger: SHARED_THEME.danger.light,
		bg: p.light.bg,
		surface: p.light.surface,
		fg: p.light.fg,
		muted: p.light.muted,
		border: p.light.border,
	};
}

function darkColors(p: Palette): Record<string, string> {
	return {
		accent: p.dark.accent,
		'accent-ink': DARK_INK,
		secondary: p.dark.secondary,
		danger: SHARED_THEME.danger.dark,
		bg: p.dark.bg,
		surface: p.dark.surface,
		fg: p.dark.fg,
		muted: p.dark.muted,
		border: p.dark.border,
	};
}

const NAMES = Object.keys(ROXY_PALETTES) as PaletteName[];

describe('generated theme presets', () => {
	test('the rosewater palette ships as the practitioner.css shipped URL', () => {
		expect(NAMES).toContain('practitioner');
		expect(() => read('practitioner')).not.toThrow();
	});

	for (const name of NAMES) {
		const p = ROXY_PALETTES[name];

		const selfHosted = name === SELF_HOSTED_FONT_PALETTE;

		describe(name, () => {
			const css = read(name);
			const noComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
			// @font-face declares font-family/font-style/src/etc, none of them
			// --roxy-*, so it is stripped alongside @import before the custom-
			// property scan below rather than counted as drift.
			const noFontFaces = noComments.replace(/@font-face\s*\{[^}]*\}/g, '');

			test('reassigns its tokens inside the roxy.theme layer, after the defaults', () => {
				// A preset exists to beat the token defaults, and a host links it in an
				// order we do not control, so the order is DECLARED rather than assumed:
				// the statement names roxy.tokens first, and both files carry it so
				// either one loading alone establishes the pair. Font rules stay outside
				// the layer, because a family is matched by name rather than by the
				// cascade and an @import may be preceded only by @charset and a layer
				// statement.
				// Read from tokens.css rather than restated, so renaming a layer in one
				// file and not the other fails here instead of silently inverting the
				// preset against the defaults it exists to reassign.
				const declared = (readFileSync(
					new URL('../src/styles/tokens.css', import.meta.url),
					'utf8',
				)
					// Comments first: that file explains the host contract with a layer
					// statement of its own, and matching prose would pin this to an example.
					.replace(/\/\*[\s\S]*?\*\//g, '')
					.match(/@layer\s+[^;{]+;/) ?? [])[0] as string;
				expect(declared).toBeDefined();
				expect(noComments).toContain(declared);
				const statement = noComments.indexOf(declared);
				const block = noComments.indexOf('@layer roxy.theme {');
				expect(block).toBeGreaterThan(statement);
				expect(noComments.indexOf('--roxy-')).toBeGreaterThan(block);
			});

			test('carries the four trigger blocks at zero specificity', () => {
				const generic = [...noComments.matchAll(/:where\(:root, :host\)/g)];
				expect(generic).toHaveLength(2); // light default + OS-dark
				expect(noComments).toContain('@media (prefers-color-scheme: dark)');
				expect(noComments).toContain(':root[data-theme="light"]');
				expect(noComments).toContain(':root[data-theme="dark"]');
				const opens = (css.match(/\{/g) ?? []).length;
				const closes = (css.match(/\}/g) ?? []).length;
				expect(opens).toBe(closes);
			});

			if (selfHosted) {
				test('self-hosts its fonts: no Google @import, one @font-face per subset, pinned to the package version on jsDelivr', () => {
					expect(css).not.toMatch(/@import url\("https:\/\/fonts\.googleapis/);
					const pkgVersion = (
						JSON.parse(
							readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
						) as { version: string }
					).version;
					for (const face of SELF_HOSTED_FACES) {
						expect(noComments).toContain(`font-family: "${face.family}"`);
						expect(noComments).toContain(
							`src: url("https://cdn.jsdelivr.net/npm/@roxyapi/ui@${pkgVersion}/dist/styles/fonts/${face.file}")`,
						);
						expect(noComments).toContain('font-weight: 400 600;');
					}
				});
			} else {
				test('carries the shared Google Fonts @import', () => {
					expect(css).toMatch(/@import url\("https:\/\/fonts\.googleapis/);
					expect(noComments).not.toContain('@font-face');
				});
			}

			test('only ever declares --roxy-* custom properties', () => {
				const body = noFontFaces.replace(/@import[^;]+;/g, '');
				const props = [...body.matchAll(/([\w-]+)\s*:\s*[^{};]+;/g)].map(
					(m) => m[1],
				);
				expect(props.length).toBeGreaterThan(10);
				expect(props.filter((prop) => !prop.startsWith('--roxy-'))).toEqual([]);
			});

			test('light default block: shared chrome + light palette + ring', () => {
				const first = noComments.indexOf(':where(:root, :host)');
				const tokens = parseTokens(bodyFrom(noComments, first));
				expect(tokens).toEqual({
					'font-sans': norm(SHARED_THEME.fontSans),
					'font-display': norm(SHARED_THEME.fontDisplay),
					'radius-sm': SHARED_THEME.radius.sm,
					'radius-md': SHARED_THEME.radius.md,
					'radius-lg': SHARED_THEME.radius.lg,
					'shadow-sm': SHARED_THEME.shadow.sm,
					'shadow-md': SHARED_THEME.shadow.md,
					'shadow-lg': SHARED_THEME.shadow.lg,
					...lightColors(p, true),
				});
			});

			test('OS-dark block: dark palette, accent-ink follows accent', () => {
				const first = noComments.indexOf(':where(:root, :host)');
				const second = noComments.indexOf(':where(:root, :host)', first + 1);
				expect(parseTokens(bodyFrom(noComments, second))).toEqual(
					darkColors(p),
				);
			});

			test('explicit-light opt-out block: light palette, no ring or chrome', () => {
				const at = noComments.indexOf(':root[data-theme="light"]');
				expect(parseTokens(bodyFrom(noComments, at))).toEqual(
					lightColors(p, false),
				);
			});

			test('explicit-dark opt-in block: dark palette', () => {
				const at = noComments.indexOf(':root[data-theme="dark"]');
				expect(parseTokens(bodyFrom(noComments, at))).toEqual(darkColors(p));
			});
		});
	}
});
