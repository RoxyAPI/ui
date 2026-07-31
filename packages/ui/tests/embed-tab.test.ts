import { describe, expect, test } from 'bun:test';
import { ENDPOINT_BINDINGS } from '../src/generated/endpoint-bindings.js';
import { ROXY_COMPONENTS } from '../src/manifest.js';

/**
 * The demo Embed tab derives entirely from two GENERATED browser globals, exactly as the static docs site builds them: `apps/docs/manifest.js` (mirror of the component manifest + endpoint bindings) and `apps/docs/components-manifest.js` (which reads those globals and builds `window.ROXY_UI_DEMOS`, each bound card carrying an `embed` snippet). These evaluate both committed files against a window stub, in the same order index.html loads them, then assert (1) the mirror matches source and (2) every endpoint-bound card derives a snippet naming its tag and its first-binding endpoint, while every unbound card derives none.
 */

const HELPER_TAGS = new Set([
	'roxy-data',
	'roxy-endpoint-form',
	'roxy-location-search',
]);

interface EmbedSnippet {
	script: string;
	oneTag: string;
	hint: string;
}
interface Demo {
	id: string;
	tag: string;
	embed: EmbedSnippet | null;
}

/** Evaluate manifest.js then components-manifest.js against a window stub and return the built demo list plus the mirrored globals, exactly as the browser would. Neither file touches `document`, so a plain object is a sufficient window. */
async function loadDemos(): Promise<{
	demos: Demo[];
	bindings: unknown;
	components: unknown;
}> {
	const manifestJs = await Bun.file('apps/docs/manifest.js').text();
	const componentsJs = await Bun.file(
		'apps/docs/components-manifest.js',
	).text();
	const w: Record<string, unknown> = {};
	const holder = globalThis as { window?: unknown };
	const saved = holder.window;
	holder.window = w;
	try {
		new Function(manifestJs)();
		new Function(componentsJs)();
	} finally {
		holder.window = saved;
	}
	return {
		demos: w.ROXY_UI_DEMOS as Demo[],
		bindings: w.ROXY_ENDPOINT_BINDINGS,
		components: w.ROXY_COMPONENTS,
	};
}

describe('demo manifest mirror', () => {
	test('manifest.js mirrors the generated endpoint bindings and the component manifest verbatim', async () => {
		const { bindings, components } = await loadDemos();
		expect(bindings).toEqual(ENDPOINT_BINDINGS);
		expect(components).toEqual(ROXY_COMPONENTS);
	});
});

describe('embed tab derivation', () => {
	test('every endpoint-bound card derives a snippet with its tag and first-binding endpoint; helpers get none', async () => {
		const { demos } = await loadDemos();
		let boundChecked = 0;
		let helperChecked = 0;

		for (const demo of demos) {
			const bindings = ENDPOINT_BINDINGS[demo.tag];
			const bound = !!bindings?.length && !HELPER_TAGS.has(demo.tag);

			if (!bound) {
				expect(
					demo.embed,
					`${demo.tag} (${demo.id}) unbound -> no Embed`,
				).toBeNull();
				helperChecked++;
				continue;
			}

			const e = demo.embed;
			expect(e, `${demo.tag} (${demo.id}) embed`).toBeTruthy();
			if (!e) continue;

			const first = bindings[0];
			const endpoint = first.path.replace(/^\//, '');
			// Script snippet: the exact element tag, open and close, and the default endpoint.
			expect(e.script).toContain(`<${demo.tag}`);
			expect(e.script).toContain(`</${demo.tag}>`);
			expect(e.script).toContain(`data-endpoint="${endpoint}"`);
			// GET surfaces an explicit method; POST omits it (the element default).
			if (first.method === 'POST') expect(e.script).not.toContain(' method=');
			else expect(e.script).toContain(` method="${first.method}"`);
			expect(e.script).toContain('publishable-key="pk_live_..."');

			// One-tag variant references the widgets slug and the widgets.js script.
			const comp = ROXY_COMPONENTS.find((c) => c.tag === demo.tag);
			expect(comp, `${demo.tag} in manifest`).toBeTruthy();
			if (!comp) continue;
			expect(e.oneTag).toContain(`data-roxy-widget="${comp.slug}"`);
			expect(e.oneTag).toContain('widgets.js');
			expect(e.hint).toContain('roxyapi.com/account');
			boundChecked++;
		}

		// The test itself must have exercised both branches. The unbound side is the
		// three helpers plus every component deliberately kept out of the auto-mount
		// widget build, derived rather than counted so adding one is not a red gate.
		const unbound = new Set(
			ROXY_COMPONENTS.filter((c) => !ENDPOINT_BINDINGS[c.tag]?.length).map(
				(c) => c.tag,
			),
		);
		expect(boundChecked).toBeGreaterThan(40);
		expect(unbound.size).toBeGreaterThanOrEqual(3);
		expect(helperChecked).toBe(demos.filter((d) => unbound.has(d.tag)).length);
	});

	test('a multi-variant component surfaces its other selector values on the hint line', async () => {
		const { demos } = await loadDemos();
		// horoscope-card: daily (default) + weekly + monthly, selector `period`.
		const horoscope = demos.find((d) => d.tag === 'roxy-horoscope-card');
		expect(horoscope?.embed?.hint).toContain('data-period');
		expect(horoscope?.embed?.hint).toContain('weekly');
		expect(horoscope?.embed?.hint).toContain('monthly');
	});
});
