import { describe, expect, test } from 'bun:test';
import { readdirSync, readFileSync } from 'node:fs';

/**
 * Width invariant. Every component fills its parent so the consumer sizes the
 * parent; only the aspect-ratio SVG charts cap their width, and they do it with
 * the overridable `--roxy-chart-max-width` token (never a hardcoded px width on
 * the root). This guards the exact regression a bulk migration introduced once:
 * the token was applied to a table (kp-chart) and a glyph card (hexagram), which
 * froze their width. A card that draws through a shared stylesheet inherits the
 * token from there and does not name it directly: vedic-kundli and
 * divisional-chart through kundli-styles.ts, bodygraph and hd-connection through
 * bodygraph-styles.ts.
 */
const TOKEN = '--roxy-chart-max-width';
const ALLOWED = new Set([
	'components/natal-chart.ts',
	'components/synastry-chart.ts',
	'components/transit-wheel.ts',
	'components/biorhythm-chart.ts',
	'components/local-space-compass.ts',
	'utils/kundli-styles.ts',
	'utils/bodygraph-styles.ts',
	'components/hd-penta.ts',
]);

function uses(rel: string): boolean {
	return readFileSync(`packages/ui/src/${rel}`, 'utf8').includes(TOKEN);
}

describe('chart width token', () => {
	test('--roxy-chart-max-width is used only by SVG chart sources', () => {
		const offenders: string[] = [];
		for (const dir of ['components', 'utils']) {
			for (const f of readdirSync(`packages/ui/src/${dir}`)) {
				if (!f.endsWith('.ts') || f.endsWith('.test.ts')) continue;
				const rel = `${dir}/${f}`;
				if (uses(rel) && !ALLOWED.has(rel)) offenders.push(rel);
			}
		}
		expect(
			offenders,
			`Non-chart sources cap width with ${TOKEN}:\n  ${offenders.join('\n  ')}`,
		).toEqual([]);
	});

	test('the chart allowlist is not stale', () => {
		const missing = [...ALLOWED].filter((rel) => !uses(rel));
		expect(
			missing,
			`Allowlisted chart sources no longer use ${TOKEN}:\n  ${missing.join('\n  ')}`,
		).toEqual([]);
	});
});

/**
 * Surface invariant (P0-2). Every data component must paint an opaque
 * `--roxy-surface` on its root so text reads on any host page in any theme,
 * never light-on-light. Components that paint via the shared `kundli-styles.ts`
 * count as covered. Pairs with the e2e dark-mode test (computed token cascade).
 */
describe('component surface', () => {
	test('every data component resolves a --roxy-surface paint', () => {
		const dir = 'packages/ui/src/components';
		const offenders: string[] = [];
		for (const f of readdirSync(dir)) {
			if (!f.endsWith('.ts') || f.endsWith('.test.ts')) continue;
			const src = readFileSync(`${dir}/${f}`, 'utf8');
			if (!src.includes('extends RoxyDataElement')) continue;
			if (!src.includes('--roxy-surface') && !src.includes('kundli-styles')) {
				offenders.push(f);
			}
		}
		expect(
			offenders,
			`Data components with a transparent root (add background: var(--roxy-surface, #fff)):\n  ${offenders.join('\n  ')}`,
		).toEqual([]);
	});

	test('the endpoint form paints --roxy-surface so it reads on any host background', () => {
		const src = readFileSync(
			'packages/ui/src/components/endpoint-form.ts',
			'utf8',
		);
		expect(src).toContain('background: var(--roxy-surface');
	});
});
