/**
 * Guards on the published part vocabulary in `components-catalog.json`.
 *
 * The catalog is a published contract: consumers fetch it at a pinned version
 * and act on what it says. The `parts` list is the half a consumer cannot
 * verify for itself, because it describes shadow-DOM internals it can only
 * reach through `::part()`. These tests make a stale or unscannable vocabulary
 * fail here rather than downstream, where the symptom is a rule that silently
 * matches nothing.
 */

import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import {
	baseParts,
	code,
	hasDynamicPart,
	partsForSlug,
	partsInSource,
	sourcePathForSlug,
} from '../../../scripts/component-parts.js';
import catalog from '../components-catalog.json';

const components = catalog.components as Array<{
	tag: string;
	slug: string;
	parts?: string[];
}>;

describe('published part vocabulary', () => {
	test('every component resolves to a source file', () => {
		// The scan is only exact because one component is one file named for its
		// slug. If that ever stops holding, the generator throws rather than
		// publishing an empty list, and this names the offender first.
		for (const c of components) {
			expect(() => partsForSlug(c.slug)).not.toThrow();
		}
	});

	test('every component publishes a part of its OWN, not just the inherited ones', () => {
		// Six parts arrive from the shared base whether a component asks or not, so
		// a component that adds none of its own is reachable at its loading and
		// error states and opaque everywhere else: a host can hide the whole card
		// or nothing inside it. Two of the widgets were in exactly that state.
		//
		// The floor is DERIVED as the set every component shares rather than
		// written out, so a part added to or dropped from the base moves it here
		// automatically and this test never needs editing to stay true.
		const sets = components.map((c) => new Set(c.parts ?? []));
		const shared = [...(sets[0] ?? new Set<string>())].filter((name) =>
			sets.every((s) => s.has(name)),
		);
		expect(shared.length).toBeGreaterThan(0);

		const opaque = components
			.filter((c) => (c.parts ?? []).every((p) => shared.includes(p)))
			.map((c) => c.tag);
		expect(
			opaque,
			`These publish only the inherited parts, so nothing inside them can be reached with ::part():\n  ${opaque.join('\n  ')}`,
		).toEqual([]);
	});

	test('the committed catalog matches a fresh scan of source', () => {
		// The failure this exists for: a part renamed in a component, the catalog
		// not regenerated, and a consumer pinning a version whose contract no
		// longer describes the bundle shipped beside it.
		for (const c of components) {
			expect({ slug: c.slug, parts: c.parts ?? [] }).toEqual({
				slug: c.slug,
				parts: partsForSlug(c.slug),
			});
		}
	});

	test('only the known generic card derives part names at runtime', () => {
		// A computed `part=${...}` cannot be resolved without running the
		// component, so those names are absent from the published list and a
		// consumer will conclude the block cannot be targeted. That is a fair
		// trade for exactly one generic card whose sections ARE the response
		// keys, and a trap anywhere else. Pinned as a set so a new dynamic part
		// fails here, and so does making this one static without updating the
		// list.
		const dynamic = components
			.filter((c) =>
				hasDynamicPart(readFileSync(sourcePathForSlug(c.slug), 'utf8')),
			)
			.map((c) => c.slug)
			.sort();
		expect(dynamic).toEqual(['reference-card']);
	});

	test('a part written in a comment is not read as real', () => {
		// Found the hard way: `upagraha-table.ts` carries a comment explaining why
		// a part name must not be interpolated, and quotes `part=${...}` to say so.
		// Scanning raw source reported that component as dynamic. The same flaw
		// would publish a `part="name"` quoted in a doc example as a name the
		// component does not actually expose, which is worse: a consumer would
		// then hide a block that never matches.
		const src = [
			// biome-ignore-start lint/suspicious/noTemplateCurlyInString: the `${` is the fixture. This is source text handed to a scanner, not a template, and interpolating it would test nothing.
			'/** Docs: never write part="ghost-block" or part=${computed} here. */',
			'// Also part="line-comment-ghost"',
			'const t = html`<div part="real thing">${x}</div>`;',
			// biome-ignore-end lint/suspicious/noTemplateCurlyInString: end of fixture.
		].join('\n');
		expect(partsInSource(src)).toEqual(['real', 'thing']);
		expect(hasDynamicPart(src)).toBe(false);
		// A genuine interpolation in code is still caught.
		// biome-ignore lint/suspicious/noTemplateCurlyInString: as above, the literal `${` is what is under test.
		expect(hasDynamicPart('html`<i part="section ${n}">`')).toBe(true);
		// Strings survive comment stripping, or every real answer would vanish.
		expect(code('const u = "https://x.test/a"; // gone')).toContain(
			'https://x.test/a',
		);
	});

	test('part names are kebab-case and carry no component prefix', () => {
		for (const c of components) {
			for (const name of c.parts ?? []) {
				expect({
					slug: c.slug,
					name,
					ok: /^[a-z][a-z0-9-]*$/.test(name),
				}).toEqual({ slug: c.slug, name, ok: true });
				expect({
					slug: c.slug,
					name,
					prefixed: name.startsWith('roxy-'),
				}).toEqual({ slug: c.slug, name, prefixed: false });
			}
		}
	});

	test('a nested component forwards every part of the component it wraps', () => {
		// `exportparts` is the only way an inner part stays addressable one root
		// out, and it is a hand-written list beside a generated one, so it goes
		// stale exactly when someone adds a part to the inner component. It did:
		// the relocation wheel forwarded `aspect-grid` and not `aspects`.
		const byTag = new Map(components.map((c) => [c.tag, c]));
		// The base class draws these on the outer component too, so forwarding the
		// inner ones would leave one host with two elements answering the same
		// name. Read from the scanner rather than listed here, or the exemption
		// goes stale the moment the base class grows a branch.
		const inherited = new Set(baseParts());
		for (const c of components) {
			const src = code(readFileSync(sourcePathForSlug(c.slug), 'utf8'));
			const exported = new Set(
				[...src.matchAll(/\bexportparts="([^"]+)"/g)].flatMap(([, v]) =>
					v.split(',').map((e) => e.slice(e.indexOf(':') + 1).trim()),
				),
			);
			if (exported.size === 0) continue;
			const nested = new Set(
				[...src.matchAll(/<(roxy-[a-z-]+)/g)].map(([, tag]) => tag),
			);
			for (const tag of nested) {
				const inner = byTag.get(tag);
				if (!inner || inner.tag === c.tag) continue;
				const missing = (inner.parts ?? []).filter(
					(p) => !exported.has(p) && !inherited.has(p),
				);
				expect({ outer: c.slug, inner: tag, missing }).toEqual({
					outer: c.slug,
					inner: tag,
					missing: [],
				});
			}
		}
	});

	test('one concept keeps one name across components that render it', () => {
		// Pins the regression this vocabulary work was done for. The natal chart
		// and the aspects table render the same chart aspects, so one
		// `::part(aspects)` rule has to reach both. The natal chart answers to
		// `aspects` beside its own `aspect-grid`, because a rule written against one
		// component reaches the other only through the shared name.
		for (const slug of ['natal-chart', 'aspects-table']) {
			expect({ slug, exposes: partsForSlug(slug).includes('aspects') }).toEqual(
				{
					slug,
					exposes: true,
				},
			);
		}
	});
});
