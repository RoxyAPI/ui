/**
 * Read the CSS shadow parts a component exposes, straight from its source.
 *
 * The part vocabulary is a published contract: a host page styles or hides a
 * block with `::part(name)`, and a consumer that cannot enumerate the names has
 * to guess. Guessing is what this exists to stop. The WordPress plugin pairs a
 * `::part()` rule with a server-side strip of the matching response key, so a
 * name it believes in that the component does not expose costs real data on the
 * no-JavaScript render.
 *
 * Scanned rather than hand-listed, so a component added or a part renamed
 * updates the catalog by rebuilding it. Every `part` attribute in this library
 * is a static string literal, which is what makes a scan exact; a computed
 * `part=${...}` would silently read as absent, so `catalog.test.ts` fails if one
 * ever appears.
 *
 * A component file is NOT the whole answer, which is the trap this module exists
 * to survive. Four shared modules render parts on a component's behalf, and the
 * flagship name is one of them: `readings` is emitted by `interp-accordion.ts`,
 * reached through the `renderInterps` method on `RoxyDataElement`. Reading only
 * `components/{slug}.ts` published a catalog that said the natal chart had no
 * readings part while the browser plainly showed one, which is the worst shape
 * of wrong here: a consumer concludes the block cannot be targeted and stops.
 * So the shared modules are resolved as a call graph, and `parts.e2e.ts` checks
 * the result against what the components actually render.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';

const SRC_ROOT = 'packages/ui/src';
const SOURCE_DIR = `${SRC_ROOT}/components`;

/** Every component is one file named for its slug. Asserted for all of them by `catalog.test.ts`. */
export const sourcePathForSlug = (slug: string) => `${SOURCE_DIR}/${slug}.ts`;

/** Matches a computed part attribute, which this scanner cannot see through. Apply to {@link code}, never to raw source. */
const DYNAMIC_PART = /\bpart=(?:\$\{|"[^"]*\$\{)/;

/**
 * Source with comments removed, which is the only text either scan may read.
 *
 * A comment is prose about the code, not the code, and this library writes
 * comments ABOUT parts: `upagraha-table.ts` explains why a part name must not be
 * interpolated and quotes `part=${...}` to do it. Read raw, that sentence
 * reports the component as dynamic, and a `part="name"` quoted in a doc example
 * would be published as a part the component does not have. Both are silent, and
 * the second one is worse, because a consumer would then hide a block that never
 * matches.
 *
 * String and template contents are KEPT: `part="..."` lives inside an html
 * template literal, so stripping strings would remove every real answer.
 */
export function code(src: string): string {
	let out = '';
	let mode: 'code' | 'line' | 'block' | "'" | '"' | '`' = 'code';
	for (let i = 0; i < src.length; i++) {
		const c = src[i];
		const d = src[i + 1];
		if (mode === 'code') {
			if (c === '/' && d === '/') {
				mode = 'line';
				i++;
			} else if (c === '/' && d === '*') {
				mode = 'block';
				i++;
			} else {
				if (c === "'" || c === '"' || c === '`') mode = c;
				out += c;
			}
		} else if (mode === 'line') {
			if (c === '\n') {
				mode = 'code';
				out += c;
			}
		} else if (mode === 'block') {
			if (c === '*' && d === '/') {
				mode = 'code';
				i++;
			}
		} else {
			// Inside a string or template. Copy an escape pair whole so a trailing
			// backslash cannot swallow the closing quote.
			if (c === '\\') {
				out += c + (d ?? '');
				i++;
			} else {
				if (c === mode) mode = 'code';
				out += c;
			}
		}
	}
	return out;
}

/** Whether a component builds a part name at runtime, which the scan cannot resolve. */
export const hasDynamicPart = (src: string) => DYNAMIC_PART.test(code(src));

/**
 * Keywords that take a parenthesis and are not declarations. Without this an
 * `if (` at one tab inside a top-level function reads as a function named `if`,
 * and since every module has one, `if` becomes a shared emitter that hands its
 * neighbour's parts to all 63 components. That is not hypothetical: it is what
 * the first run of this file did.
 */
const KEYWORDS = new Set([
	'if',
	'for',
	'while',
	'switch',
	'catch',
	'return',
	'typeof',
	'await',
	'new',
	'function',
	'of',
	'in',
	'do',
	'else',
	'case',
	'delete',
	'void',
	'yield',
	'super',
]);

/** A function or method signature start: `NAME(` at indent 0 or one tab. */
const DECL_CALLABLE =
	/^\t?(?:export\s+)?(?:(?:protected|private|public)\s+)?(?:static\s+)?(?:async\s+)?(?:function\s+)?([A-Za-z_$][\w$]*)\s*(?:<[^>\n]*>)?\(/gm;

/** A module-level binding, which is how several helpers are written. Indent 0 only: a `const` inside a body is a local, not a declaration this should split on. */
const DECL_CONST = /^(?:export\s+)?const\s+([A-Za-z_$][\w$]*)\s*=/gm;

/**
 * Whether the `(` at `open` closes into a body, i.e. `) {`, `): Type {`. The one
 * reliable way to tell `renderForm(` the declaration from `renderForm(` the call,
 * both of which can start a line.
 */
function opensABody(src: string, open: number): boolean {
	let depth = 0;
	for (let i = open; i < src.length; i++) {
		if (src[i] === '(') depth++;
		else if (src[i] === ')' && --depth === 0)
			return /^\s*(?::[^;{()]*)?\{/.test(src.slice(i + 1, i + 200));
	}
	return false;
}

/** Names this text calls, so a component can be matched to the helpers it invokes. */
const callsIn = (src: string) =>
	new Set(
		[...src.matchAll(/\b([A-Za-z_$][\w$]*)\s*\(/g)]
			.map(([, name]) => name)
			.filter((name) => !KEYWORDS.has(name)),
	);

/** Every declaration in one module, as `{ name, body }`, body running to the next declaration. */
function declarations(src: string): Array<{ name: string; body: string }> {
	const starts: Array<{ name: string; at: number }> = [];
	for (const m of src.matchAll(DECL_CALLABLE)) {
		const name = m[1] as string;
		const at = m.index ?? 0;
		if (KEYWORDS.has(name)) continue;
		if (!opensABody(src, at + m[0].length - 1)) continue;
		starts.push({ name, at });
	}
	for (const m of src.matchAll(DECL_CONST))
		starts.push({ name: m[1] as string, at: m.index ?? 0 });
	starts.sort((a, b) => a.at - b.at);
	return starts.map((s, i) => ({
		name: s.name,
		body: src.slice(s.at, starts[i + 1]?.at ?? src.length),
	}));
}

/** Every `.ts` under `src/` outside `components/`, so a new helper is discovered rather than listed. */
function sharedModules(dir = SRC_ROOT): string[] {
	const out: string[] = [];
	for (const e of readdirSync(dir, { withFileTypes: true })) {
		const path = `${dir}/${e.name}`;
		if (e.isDirectory()) {
			if (path !== SOURCE_DIR) out.push(...sharedModules(path));
		} else if (e.name.endsWith('.ts') && !e.name.endsWith('.test.ts')) {
			out.push(path);
		}
	}
	return out;
}

/**
 * The parts each shared helper renders, resolved through the calls it makes.
 *
 * Two things fall out of this that a flat scan cannot express. A helper that
 * calls another helper inherits its parts, which is how `renderKundliStyleTablist`
 * carries the tablist vocabulary to a component that has never heard of
 * `tablist.ts`. And the base class is split rather than special-cased: whatever
 * `RoxyDataElement.render` reaches is on EVERY component, because the base class
 * draws it unasked, while `renderInterps` is a helper like any other and lands
 * only on the components that call it. Attributing the accordion to all 63
 * components would be as wrong as attributing it to none.
 */
let graph: {
	partsOf: Map<string, Set<string>>;
	byName: Map<string, string[]>;
	always: Set<string>;
} | null = null;

function emitterGraph() {
	if (graph) return graph;
	const own = new Map<string, Set<string>>();
	const calls = new Map<string, Set<string>>();
	const byName = new Map<string, string[]>();
	for (const path of sharedModules()) {
		// Every shared module, including the ones with no part of their own: a
		// pass-through is exactly how the vocabulary travels. `kundli-render.ts`
		// writes no `part` and calls `renderTablist`, so skipping it for having
		// none of its own cut the chain and left `roxy-vedic-kundli` publishing no
		// tablist it plainly renders.
		const src = code(readFileSync(path, 'utf8'));
		for (const { name, body } of declarations(src)) {
			const key = `${path}#${name}`;
			own.set(key, new Set(partsInSource(body)));
			calls.set(key, callsIn(body));
			byName.set(name, [...(byName.get(name) ?? []), key]);
		}
	}

	const seen = new Map<string, Set<string>>();
	const resolve = (key: string, stack: Set<string>): Set<string> => {
		const done = seen.get(key);
		if (done) return done;
		if (stack.has(key)) return new Set();
		stack.add(key);
		const acc = new Set(own.get(key) ?? []);
		for (const name of calls.get(key) ?? []) {
			for (const next of byName.get(name) ?? []) {
				if (next !== key) for (const p of resolve(next, stack)) acc.add(p);
			}
		}
		stack.delete(key);
		seen.set(key, acc);
		return acc;
	};
	const partsOf = new Map<string, Set<string>>();
	for (const key of own.keys()) partsOf.set(key, resolve(key, new Set()));

	const always = new Set<string>();
	for (const key of byName.get('render') ?? []) {
		if (key.startsWith(`${SRC_ROOT}/utils/base-element.ts#`)) {
			for (const p of partsOf.get(key) ?? []) always.add(p);
		}
	}
	graph = { partsOf, byName, always };
	return graph;
}

/**
 * The parts `RoxyDataElement` draws for every component, whether or not it asks.
 *
 * Published per component because a page styling `::part(loading)` needs to know
 * it can, and exported because they are the one group a nesting component must
 * NOT forward: the outer element extends the same base class and already answers
 * to each of these names, so re-exporting the inner ones would put two elements
 * under one name on a single host.
 */
export const baseParts = (): string[] => [...emitterGraph().always].sort();

export function partsForSlug(slug: string): string[] {
	const path = sourcePathForSlug(slug);
	if (!existsSync(path)) {
		throw new Error(
			`[component-parts] no source at ${path} for slug "${slug}". Refusing to publish an empty part list, which would read downstream as "this component exposes nothing".`,
		);
	}
	const raw = readFileSync(path, 'utf8');
	const src = code(raw);
	const { partsOf, byName, always } = emitterGraph();
	const names = new Set([...partsInSource(raw), ...always]);
	// A component that declares a name of its own shadows the shared helper of
	// that name rather than calling it, so its own render method never counts as
	// an invocation of someone else's.
	const declared = new Set(declarations(src).map((d) => d.name));
	for (const name of callsIn(src)) {
		if (declared.has(name)) continue;
		for (const key of byName.get(name) ?? [])
			for (const p of partsOf.get(key) ?? []) names.add(p);
	}
	return [...names].sort();
}

export function partsInSource(raw: string): string[] {
	const src = code(raw);
	const names = new Set<string>();
	for (const [, value] of src.matchAll(/\bpart="([^"]+)"/g)) {
		// A token can be interpolated (`part="section ${partName(key)}"`), which
		// only `roxy-reference-card` does, deriving a name per response key. That
		// half cannot be resolved without running the component, so drop it and
		// keep the static tokens beside it. Publishing the raw `${...}` text as a
		// name would be worse than omitting it: a consumer would match on a string
		// no element ever carries.
		for (const name of value.split(/\s+/))
			if (name && !name.includes('${')) names.add(name);
	}
	// A component that nests another forwards names through `exportparts`, and a
	// forwarded name IS addressable on the outer host, so it belongs in this
	// list. `inner: exposed` renames on the way out; the exposed half is the one
	// a page can target.
	for (const [, value] of src.matchAll(/\bexportparts="([^"]+)"/g)) {
		for (const entry of value.split(',')) {
			const exposed = entry.includes(':')
				? entry.slice(entry.indexOf(':') + 1)
				: entry;
			const name = exposed.trim();
			if (name) names.add(name);
		}
	}
	return [...names].sort();
}
