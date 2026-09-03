/**
 * Guards on the tool-name rule and on the lookup built from it.
 *
 * The rule is applied in two places that ship separately: the MCP servers name
 * their tools with it, and the endpoint map here derives the same name so a tool
 * result can be routed to the component that draws it. Nothing in this repo can
 * see the other half of that pair, so `specs/mcp-tools.json` carries the names
 * the live servers publish and these tests assert every derived name is among
 * them. A rule that drifts, or a server that is renamed, fails here rather than
 * on a page that quietly renders nothing.
 */

import { describe, expect, test } from 'bun:test';
import catalog from '../components-catalog.json';
import { ENDPOINT_BINDINGS } from '../src/generated/endpoint-bindings.js';
import { componentForTool } from '../src/utils/tool-component.js';
import { toolNameFor } from '../src/utils/tool-name.js';

const mcpTools = (await Bun.file('specs/mcp-tools.json').json()) as {
	generated: string;
	servers: Record<string, string[]>;
};

const publishedNames = new Set(Object.values(mcpTools.servers).flat());

const bindings = Object.entries(ENDPOINT_BINDINGS).flatMap(([tag, list]) =>
	list.map((b) => ({ tag, ...b })),
);

const catalogEndpoints = (
	catalog.components as Array<{
		tag: string;
		endpoints: Array<{ operationId: string; toolName?: string }>;
	}>
).flatMap((c) => c.endpoints.map((e) => ({ tag: c.tag, ...e })));

describe('toolNameFor', () => {
	test('names an endpoint the way its server does', () => {
		expect(toolNameFor('GET', '/astrology/horoscope')).toBe(
			'get_astrology_horoscope',
		);
		expect(toolNameFor('POST', '/tarot/spreads/three-card')).toBe(
			'post_tarot_spreads_three_card',
		);
		expect(toolNameFor('GET', '/tarot/cards/{id}')).toBe('get_tarot_cards_id');
	});

	test('collapses a parameter named after the segment before it', () => {
		expect(toolNameFor('GET', '/crystals/chakra/{chakra}')).toBe(
			'get_crystals_chakra',
		);
	});

	test('keeps a segment that repeats later rather than immediately', () => {
		// Merging these would point two endpoints at one name, which is the failure
		// the adjacent-only rule exists to prevent.
		expect(toolNameFor('GET', '/a/b/a')).toBe('get_a_b_a');
	});
});

describe('derived names against the live servers', () => {
	test('the captured tool list is populated', () => {
		expect(Object.keys(mcpTools.servers).length).toBeGreaterThan(0);
		expect(publishedNames.size).toBeGreaterThan(0);
	});

	test('every bound endpoint carries a name its server publishes', () => {
		const absent = bindings
			.filter((b) => !publishedNames.has(b.toolName))
			.map((b) => `${b.toolName} (${b.tag}, ${b.method} ${b.path})`);
		expect(
			absent,
			`Derived tool names no live server publishes:\n  ${absent.join('\n  ')}`,
		).toEqual([]);
	});

	test('the published catalog carries the same name for every endpoint', () => {
		const absent = catalogEndpoints
			.filter((e) => !e.toolName || !publishedNames.has(e.toolName))
			.map((e) => `${e.tag} ${e.operationId} -> ${String(e.toolName)}`);
		expect(
			absent,
			`Catalog endpoints with a missing or unpublished tool name:\n  ${absent.join('\n  ')}`,
		).toEqual([]);
	});

	test('the name on every binding is the one the rule derives', () => {
		for (const b of bindings) {
			expect(b.toolName).toBe(toolNameFor(b.method, b.path));
		}
	});

	test('no two operations derive the same name', () => {
		const owner = new Map<string, string>();
		const collisions: string[] = [];
		for (const b of bindings) {
			const held = owner.get(b.toolName);
			if (held && held !== b.operationId) {
				collisions.push(`${b.toolName}: ${held} and ${b.operationId}`);
			} else if (!held) {
				owner.set(b.toolName, b.operationId);
			}
		}
		expect(
			collisions,
			`One tool name resolving to two operations:\n  ${collisions.join('\n  ')}`,
		).toEqual([]);
	});
});

describe('componentForTool', () => {
	test('resolves every bound tool to a component the library ships', () => {
		const unresolved = bindings
			.map((b) => b.toolName)
			.filter((name) => !componentForTool(name));
		expect(
			unresolved,
			`Bound tools with no component:\n  ${unresolved.join('\n  ')}`,
		).toEqual([]);
	});

	test('carries the tag, the export name and the selecting attributes', () => {
		expect(componentForTool('post_tarot_spreads_three_card')).toEqual({
			tag: 'roxy-tarot-spread',
			pascal: 'RoxyTarotSpread',
			operationId: 'castThreeCard',
			toolName: 'post_tarot_spreads_three_card',
			attrs: { spread: 'three-card' },
		});
	});

	test('accepts a name a host prefixed with the server it came from', () => {
		expect(componentForTool('roxy_tarot:post_tarot_daily')).toEqual(
			componentForTool('post_tarot_daily'),
		);
	});

	test('leads with the component that draws the response, not the one that lists it', () => {
		// Two components render each of these, and the manifest order decides which
		// one a tool result lands in.
		expect(componentForTool('post_astrology_natal_chart')?.tag).toBe(
			'roxy-natal-chart',
		);
		expect(componentForTool('post_astrology_transit_aspects')?.tag).toBe(
			'roxy-transit-wheel',
		);
		expect(componentForTool('post_vedic_astrology_birth_chart')?.tag).toBe(
			'roxy-vedic-kundli',
		);
	});

	test('returns nothing for a tool no component renders', () => {
		expect(componentForTool('get_nothing_at_all')).toBeUndefined();
	});
});
