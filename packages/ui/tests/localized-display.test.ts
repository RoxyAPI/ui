import { describe, expect, test } from 'bun:test';
import '../src/index.js';
import { ENDPOINT_BINDINGS } from '../src/generated/endpoint-bindings.js';

/**
 * A value the API returns twice prints its localized half wherever it prints at all.
 *
 * @remarks
 * Derived, never listed: every response property of a bound operation that the spec gives a `{name}Localized` sibling is a pair, and every demo card renders its sample with each pair rewritten so the canonical half is a unique token and the localized half another. A token that reaches the reader (a text node, a `title`, an `aria-label`) is a canonical value printed where the translation belongs. Lookups keyed on the canonical value (glyphs, classes, order) see only an unknown name, so they stay out of the result. A new component, a new binding or a new `*Localized` field joins the sweep with no edit here.
 */

type Schema = Record<string, unknown> & { $ref?: string };

/** The two components whose doctrine stays English by decision; their chrome rows in `i18n.test.ts` say why. */
const ENGLISH_BY_DECISION = new Set(['roxy-hd-connection', 'roxy-hd-penta']);

const spec = (await Bun.file('specs/openapi.json').json()) as {
	paths: Record<string, Record<string, Schema>>;
};

function deref(s: unknown): Schema | undefined {
	let node = s as Schema | undefined;
	for (let i = 0; node?.$ref && i < 20; i++) {
		node = node.$ref
			.split('/')
			.slice(1)
			.reduce<unknown>(
				(o, k) => (o as Record<string, unknown>)[k],
				spec,
			) as Schema;
	}
	return node;
}

/** Every path (`planets[].name`) whose schema declares a `nameLocalized` sibling. */
function localizedPaths(
	s: unknown,
	path: string[],
	out: Map<string, string[]>,
	seen: Set<unknown>,
): void {
	const node = deref(s);
	if (!node || seen.has(node)) return;
	const inner = new Set(seen).add(node);
	for (const k of ['allOf', 'anyOf', 'oneOf'])
		for (const x of (node[k] as unknown[]) ?? [])
			localizedPaths(x, path, out, inner);
	if (node.items) localizedPaths(node.items, [...path, '[]'], out, inner);
	const props = (node.properties ?? {}) as Record<string, unknown>;
	for (const [k, v] of Object.entries(props)) {
		if (k.endsWith('Localized') && k.slice(0, -9) in props) {
			const key = [...path, k.slice(0, -9)];
			out.set(key.join('.'), key);
		}
		localizedPaths(v, [...path, k], out, inner);
	}
}

/** Tag -> every localized pair any operation it renders declares. */
const PAIRS = new Map<string, string[][]>();
for (const [tag, bindings] of Object.entries(ENDPOINT_BINDINGS)) {
	const out = new Map<string, string[]>();
	for (const b of bindings) {
		const op = spec.paths[b.path]?.[b.method.toLowerCase()] as
			| { responses?: Record<string, { content?: Record<string, Schema> }> }
			| undefined;
		localizedPaths(
			op?.responses?.['200']?.content?.['application/json']?.schema,
			[],
			out,
			new Set(),
		);
	}
	if (out.size) PAIRS.set(tag, [...out.values()]);
}

/** The demo cards and their samples, read the way the showcase reads them. */
async function loadDemos() {
	const w: Record<string, unknown> = {};
	const holder = globalThis as { window?: unknown };
	const saved = holder.window;
	holder.window = w;
	try {
		new Function(await Bun.file('apps/docs/manifest.js').text())();
		new Function(await Bun.file('apps/docs/components-manifest.js').text())();
	} finally {
		holder.window = saved;
	}
	const src = await Bun.file('apps/docs/sample-data.js').text();
	const samples = new Function(
		`${src.slice(0, src.indexOf('for (const id of Object.keys(samples))'))}\nreturn samples;`,
	)() as Record<string, unknown>;
	return {
		demos: w.ROXY_UI_DEMOS as { id: string; tag: string; attrs: string }[],
		samples,
	};
}

/** Rewrite every pair under `path` in place: the canonical half becomes a unique token, the localized half another. Returns how many were rewritten. */
function inject(node: unknown, path: string[], next: () => number): number {
	if (node == null || typeof node !== 'object') return 0;
	const [head, ...rest] = path;
	if (head === '[]')
		return Array.isArray(node)
			? node.reduce((n, item) => n + inject(item, rest, next), 0)
			: 0;
	const rec = node as Record<string, unknown>;
	if (head === undefined) return 0;
	if (rest.length) return inject(rec[head], rest, next);
	const value = rec[head];
	const one = () => {
		const n = next();
		return [`ZQ${n}Q`, `LOC${n}`];
	};
	if (typeof value === 'string') {
		const [canonical, localized] = one();
		rec[head] = canonical;
		rec[`${head}Localized`] = localized;
		return 1;
	}
	if (Array.isArray(value) && value.every((v) => typeof v === 'string')) {
		const tokens = value.map(() => one());
		rec[head] = tokens.map((t) => t[0]);
		rec[`${head}Localized`] = tokens.map((t) => t[1]);
		return tokens.length;
	}
	return 0;
}

/** Everything a reader gets: text nodes, `title` and `aria-label`, through every shadow root. */
function readerText(node: Node, out: string[] = []): string[] {
	if (node.nodeName === 'STYLE' || node.nodeName === 'SCRIPT') return out;
	if (node.nodeType === 3) out.push(node.textContent ?? '');
	if (node.nodeType === 1) {
		const el = node as Element;
		for (const a of ['title', 'aria-label']) {
			const v = el.getAttribute(a);
			if (v) out.push(v);
		}
		const root = (el as Element & { shadowRoot?: ShadowRoot | null })
			.shadowRoot;
		if (root) for (const c of root.childNodes) readerText(c, out);
	}
	for (const c of node.childNodes) readerText(c, out);
	return out;
}

/** Wait for an element and every element it rendered. */
async function settle(el: Element): Promise<void> {
	for (let i = 0; i < 4; i++) {
		const all: Element[] = [];
		const walk = (n: Node) => {
			if (n.nodeType === 1) {
				all.push(n as Element);
				const r = (n as Element & { shadowRoot?: ShadowRoot | null })
					.shadowRoot;
				if (r) for (const c of r.childNodes) walk(c);
			}
			for (const c of n.childNodes) walk(c);
		};
		walk(el);
		await Promise.all(
			all.map(
				(e) =>
					(e as Element & { updateComplete?: Promise<unknown> }).updateComplete,
			),
		);
	}
}

describe('a value the API returns twice prints its localized half', () => {
	test('the spec declares localized pairs on bound operations', () => {
		expect(PAIRS.size).toBeGreaterThan(20);
	});

	test('no demo prints the canonical half of a localized pair', async () => {
		const { demos, samples } = await loadDemos();
		const leaks: string[] = [];
		const exercised = new Set<string>();
		for (const demo of demos) {
			const pairs = PAIRS.get(demo.tag);
			if (!pairs || ENGLISH_BY_DECISION.has(demo.tag) || !samples[demo.id])
				continue;
			const data = structuredClone(samples[demo.id]);
			let n = 0;
			const names = new Map<number, string>();
			for (const path of pairs) {
				const before = n;
				inject(data, path, () => {
					names.set(n, path.join('.'));
					return n++;
				});
				if (n > before) exercised.add(demo.tag);
			}
			if (n === 0) continue;
			const el = document.createElement(demo.tag) as HTMLElement & {
				data: unknown;
			};
			for (const [, k, v] of demo.attrs.matchAll(/([\w-]+)(?:="([^"]*)")?/g))
				el.setAttribute(k as string, v ?? '');
			let threw = false;
			el.addEventListener('roxy-render-error', () => {
				threw = true;
			});
			document.body.appendChild(el);
			el.data = data;
			await settle(el);
			if (threw) leaks.push(`${demo.tag} (${demo.id}): could not draw it`);
			for (const text of readerText(el))
				for (const [, id] of text.matchAll(/ZQ(\d+)Q?/gi))
					leaks.push(
						`${demo.tag} (${demo.id}): ${names.get(Number(id))}, e.g. "${text.trim().replace(/ZQ\d+Q?/gi, 'ZQ')}"`,
					);
			el.remove();
		}
		expect(
			[...new Set(leaks)],
			`Print these through display()/displayList() from utils/localized.ts; keep lookups on the canonical value:\n  ${[...new Set(leaks)].join('\n  ')}`,
		).toEqual([]);
		// Not vacuous: every component that renders a pair had one rewritten in its sample.
		expect(
			[...PAIRS.keys()].filter(
				(t) => !exercised.has(t) && !ENGLISH_BY_DECISION.has(t),
			),
		).toEqual([]);
	});
});
