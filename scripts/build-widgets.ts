#!/usr/bin/env bun
/**
 * Emit packages/ui/dist/cdn/widgets.js, the one-tag auto-mount script. Once loaded via the CDN it scans the page for `[data-roxy-widget="{slug}"]` elements carrying `[data-publishable-key="pk_..."]` and mounts each `<roxy-{slug}>`, taking one of two paths per tag:
 *
 *   1. Every required parameter is present as a `data-*` attribute -> hand the element its key and proxy settings and have it `load()` the request, so it renders the result and can still open a row or page a list.
 *   2. A required parameter is missing, or the request opens on load -> set `data-endpoint` / `method` / `publishable-key` and let the component render its own form, which fetches on submit or, for a read that needs nothing, at once with the form kept above the result.
 *
 * @remarks
 * The slug -> endpoint map is GENERATED from the committed endpoint bindings joined with the manifest, never hand-maintained: the first binding per component (bindings are path-sorted) is the default, and its `attrs` sibling bindings become selectable through one `data-*` attribute (for example `data-period` on the horoscope card). Required-parameter names come from the same {@link buildFormModel} the form and the schema slices use, so the widget cannot disagree with the form about what a request needs. Drop-in for plain HTML pages and creator embed surfaces where a full SDK install is not practical.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { transform } from 'esbuild';
import { API_LANGUAGES } from '../packages/ui/src/generated/api-languages.js';
import { ENDPOINT_BINDINGS } from '../packages/ui/src/generated/endpoint-bindings.js';
import { ROXY_COMPONENTS } from '../packages/ui/src/manifest.js';
import {
	buildFormModel,
	opensOnLoad,
	type SpecDoc,
} from '../packages/ui/src/utils/field-schema.js';

const ROXY_UI_VERSION = (
	JSON.parse(await readFile('packages/ui/package.json', 'utf8')) as {
		version: string;
	}
).version;

const SPEC_PATH = 'specs/openapi.json';

/**
 * GZIPPED byte budget for the minified script, asserted at build and in the unit test.
 *
 * @remarks
 * Gzipped, not raw, because that is the weight a browser actually downloads and it matches how every other artifact is budgeted in `check-sizes.ts`. The distinction matters here more than elsewhere: most of this file is an interpolated slug map, and repetitive JSON compresses at roughly ten to one, so a raw measurement overstates the real cost by about threefold and would reject a script no user would notice.
 *
 * Measure compressed before concluding this file is too big.
 */
export const WIDGETS_BUDGET_BYTES = 4096;

/**
 * One selectable request variant a widget can resolve to. Kept minimal so the interpolated map stays small:
 *  - `m` (method) is omitted on a non-default variant, which inherits the default method (a component's endpoints share one method).
 *  - `g` marks a request that renders form mode: one that needs body or query input (birth data, a grouped person1/person2 body, a required query field), entered through the form rather than raw attributes, and one that opens on load (a read that needs nothing), whose form stays above its result exactly as on the component tag. Path parameters are derived from `p` at runtime, so a widget whose only required inputs are path parameters fetches immediately.
 */
interface WidgetVariant {
	m?: string;
	p: string;
	g?: 1;
}

/** The generated per-slug widget descriptor: the default variant (always carries `m`), the optional selector attribute, and its non-default variants. */
export interface WidgetDef extends WidgetVariant {
	m: string;
	s?: string;
	v?: Record<string, WidgetVariant>;
}

/** Path template parameter names, e.g. "/astrology/horoscope/{sign}/daily" -> ["sign"]. */
function pathParams(path: string): string[] {
	return (path.match(/\{([^}]+)\}/g) ?? []).map((t) => t.slice(1, -1));
}

/** The three helper components never auto-mount as a data widget even if a binding is ever added for them. */
const HELPER_TAGS = new Set([
	'roxy-data',
	'roxy-endpoint-form',
	'roxy-location-search',
]);

/** A variant record, marked `g` (form mode) when the request needs a key that is NOT a path parameter or opens on load; path-only and parameter-free POSTs fetch immediately. Read from the SAME {@link buildFormModel} and {@link opensOnLoad} the form uses, so the widget cannot disagree with the form or the hosted embed about what a request needs. */
function variant(spec: SpecDoc, method: string, path: string): WidgetVariant {
	const op = spec.paths[path]?.[method.toLowerCase()];
	const model = op
		? buildFormModel(
				op,
				spec.components?.schemas ?? {},
				path.replace(/^\//, ''),
			)
		: undefined;
	const inPath = new Set(pathParams(path));
	const needsForm = !!model?.fields.some(
		(f) => f.required && f.name !== 'seed' && !inPath.has(f.key),
	);
	return needsForm || (model && opensOnLoad(model, method))
		? { m: method, p: path, g: 1 }
		: { m: method, p: path };
}

/**
 * Build the slug -> {@link WidgetDef} map from the generated endpoint bindings joined with the manifest, resolving each variant's required parameters from the committed spec. Every endpoint-bound data component is included; the three helpers are excluded.
 */
export async function buildWidgetMap(): Promise<Record<string, WidgetDef>> {
	const spec = JSON.parse(await readFile(SPEC_PATH, 'utf8')) as SpecDoc;
	const bySlug: Record<string, WidgetDef> = {};
	for (const c of ROXY_COMPONENTS) {
		if (c.selfFetching || HELPER_TAGS.has(c.tag)) continue;
		const bindings = ENDPOINT_BINDINGS[c.tag];
		if (!bindings?.length) continue;
		const [head, ...rest] = bindings;
		if (!head) continue;

		const selectorKeys = new Set<string>();
		for (const b of bindings)
			for (const k of Object.keys(b.attrs ?? {})) selectorKeys.add(k);
		if (selectorKeys.size > 1) {
			throw new Error(
				`build-widgets: ${c.tag} exposes multiple selector attrs (${[...selectorKeys].join(', ')}); exactly one is expected`,
			);
		}
		const selector = [...selectorKeys][0];

		// The default always carries an explicit method; variants inherit it.
		const def: WidgetDef = {
			...variant(spec, head.method, head.path),
			m: head.method,
		};
		if (selector) {
			def.s = selector;
			const variants: Record<string, WidgetVariant> = {};
			for (const b of rest) {
				const value = b.attrs?.[selector];
				if (value == null) continue;
				const v = variant(spec, b.method, b.path);
				// A variant inherits the default method (a component's endpoints share one).
				if (v.m === head.method) delete v.m;
				variants[value] = v;
			}
			if (Object.keys(variants).length) def.v = variants;
		}
		bySlug[c.slug] = def;
	}
	return bySlug;
}

/** The auto-mount IIFE with the generated map interpolated. Kept out of `main` so the unit test can minify and size-check the exact script that ships. */
export function buildWidgetsScript(map: Record<string, WidgetDef>): string {
	return `(function () {
	'use strict';
	if (window.__ROXY_WIDGETS_LOADED__) return;
	window.__ROXY_WIDGETS_LOADED__ = true;

	var CDN = 'https://cdn.jsdelivr.net/npm/@roxyapi/ui@${ROXY_UI_VERSION.split('.')[0]}/dist/cdn/roxy-ui.js';
	var WIDGETS = ${JSON.stringify(map)};
	var LANGS = ${JSON.stringify(API_LANGUAGES)};

	// The API takes a two-letter code and 400s on anything else, so a site owner
	// writing the tag their page already carries (data-lang="es-AR") would break
	// every request. Truncate the region, and drop a language the API does not
	// accept rather than sending it.
	function apiLang(tag) {
		var base = String(tag || '').toLowerCase().split('-')[0];
		return LANGS.indexOf(base) >= 0 ? base : null;
	}

	// Load the elements from wherever THIS script was loaded from, so a site that
	// self-hosts widgets.js keeps everything on its own origin. Falls back to the
	// CDN when the origin cannot be determined.
	function bundleUrl() {
		var self = document.currentScript && document.currentScript.src;
		if (!self) {
			var tags = document.querySelectorAll('script[src]');
			for (var i = tags.length - 1; i >= 0; i--) {
				if (/widgets\\.js(\\?|$)/.test(tags[i].src)) { self = tags[i].src; break; }
			}
		}
		if (!self) return CDN;
		try { return new URL('roxy-ui.js', self).href; } catch (e) { return CDN; }
	}

	function ensureLoaded() {
		// The elements may already be on the page from a manual <script> include of the full bundle (the Embed tab ships both snippets); injecting a second copy would double-define every custom element.
		if (document.getElementById('roxy-ui-loader') || (window.customElements && window.customElements.get('roxy-data'))) return Promise.resolve();
		return new Promise(function (resolve, reject) {
			var s = document.createElement('script');
			s.id = 'roxy-ui-loader';
			s.src = bundleUrl();
			s.async = true;
			s.crossOrigin = 'anonymous';
			s.onload = function () { resolve(); };
			s.onerror = function () { reject(new Error('roxy-ui load failed')); };
			document.head.appendChild(s);
		});
	}

	// The proxied wire: the two routes on the host page that answer the component's
	// own requests, plus the context the page attaches to the submitted one. Each
	// configures that wire rather than carrying a value the endpoint takes, so they
	// are forwarded to the element and never collected as request parameters.
	var PROXY_ATTRS = ['submit-url', 'location-url', 'submit-context'];
	// Display toggles: forwarded to the element as given, never sent as request parameters.
	var DISPLAY_ATTRS = ['submit-label', 'attribution', 'hide-sections', 'hide-readings'];
	var SKIP = { 'data-roxy-widget': 1, 'data-roxy-mounted': 1, 'data-publishable-key': 1 };
	PROXY_ATTRS.concat(DISPLAY_ATTRS).forEach(function (k) { SKIP['data-' + k] = 1; });

	// data-* attributes as camelCase keys, minus the control attributes that are
	// not request parameters (the widget name, the key, and the display toggles).
	function collectAttrs(el) {
		var out = {};
		for (var i = 0; i < el.attributes.length; i++) {
			var a = el.attributes[i];
			if (a.name.indexOf('data-') === 0 && !SKIP[a.name]) {
				out[a.name.slice(5).replace(/-([a-z])/g, function (_, c) { return c.toUpperCase(); })] = a.value;
			}
		}
		return out;
	}

	function pathParams(path) {
		return (path.match(/\\{([^}]+)\\}/g) || []).map(function (t) { return t.slice(1, -1); });
	}

	function fillTemplate(path, attrs) {
		return path.replace(/\\{([^}]+)\\}/g, function (_, key) {
			return encodeURIComponent(attrs[key] || '');
		});
	}

	// Pick the request variant: the selector data-* attribute chooses one, else the default.
	function resolveVariant(def, attrs) {
		if (def.s && def.v) {
			var v = def.v[attrs[def.s]];
			if (v) return v;
		}
		return def;
	}

	function mount(host) {
		var name = host.getAttribute('data-roxy-widget');
		var def = WIDGETS[name];
		if (!def) return;
		var pk = host.getAttribute('data-publishable-key');
		var attrs = collectAttrs(host);
		var variant = resolveVariant(def, attrs);
		var method = variant.m || def.m;
		var params = pathParams(variant.p);
		// Immediate fetch only when every path parameter is present and the request
		// renders no form (g). Anything else renders form mode.
		var complete = !!pk && !variant.g && params.every(function (k) { return attrs[k] != null && attrs[k] !== ''; });

		ensureLoaded().then(function () {
			var element = document.createElement('roxy-' + name);
			// Forward the selector and path-param attributes so the element renders the
			// right view, and pass lang and the display toggles through.
			if (def.s && attrs[def.s] != null) element.setAttribute(def.s, attrs[def.s]);
			params.forEach(function (k) { if (attrs[k] != null) element.setAttribute(k, attrs[k]); });
			if (attrs.lang != null) element.setAttribute('lang', attrs.lang);
			DISPLAY_ATTRS.forEach(function (k) {
				var v = host.getAttribute('data-' + k);
				if (v != null) element.setAttribute(k, v);
			});

			// The key and the proxy wire reach the element on both paths, so a list it
			// renders can open a row and page on through the same route.
			if (pk) element.setAttribute('publishable-key', pk);
			PROXY_ATTRS.forEach(function (k) {
				var v = host.getAttribute('data-' + k);
				if (v) element.setAttribute(k, v);
			});

			if (!complete) {
				// Form mode: the component renders its own input UI and fetches through
				// one controller, on submit or, for a read that needs nothing, at once.
				element.setAttribute('data-endpoint', variant.p.replace(/^\\//, ''));
				element.setAttribute('method', method);
				host.innerHTML = '';
				host.appendChild(element);
				return;
			}

			host.innerHTML = '';
			host.appendChild(element);

			// Every required parameter present: the element loads it, refusing a
			// secret key and printing a failure the way its own form path does.
			var rest = {};
			Object.keys(attrs).forEach(function (k) {
				if (k === def.s || params.indexOf(k) >= 0) return;
				rest[k] = attrs[k];
			});
			var query = {};
			if (rest.lang != null) { var lang = apiLang(rest.lang); if (lang) query.lang = lang; delete rest.lang; }
			if (method !== 'POST') Object.keys(rest).forEach(function (k) { query[k] = rest[k]; });
			element.load({ path: fillTemplate(variant.p, attrs), method: method, query: query, body: method === 'POST' ? rest : undefined });
		});
	}

	function scan() {
		var nodes = document.querySelectorAll('[data-roxy-widget]:not([data-roxy-mounted])');
		for (var i = 0; i < nodes.length; i++) {
			nodes[i].setAttribute('data-roxy-mounted', 'true');
			mount(nodes[i]);
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', scan);
	} else {
		scan();
	}
})();
`;
}

async function main() {
	const outDir = 'packages/ui/dist/cdn';
	await mkdir(outDir, { recursive: true });
	const map = await buildWidgetMap();
	const { code } = await transform(buildWidgetsScript(map), {
		minify: true,
		target: 'es2017',
		loader: 'js',
	});
	const out = `${code.trim()}\n`;
	const raw = Buffer.byteLength(out, 'utf8');
	const gzipped = Bun.gzipSync(Buffer.from(out), { level: 9 }).length;
	if (gzipped > WIDGETS_BUDGET_BYTES) {
		throw new Error(
			`widgets.js is ${gzipped} bytes gzipped, over the ${WIDGETS_BUDGET_BYTES} budget`,
		);
	}
	await writeFile(`${outDir}/widgets.js`, out);
	console.log(
		`Wrote ${outDir}/widgets.js (${gzipped} bytes gzipped, ${raw} raw, ${Object.keys(map).length} widgets)`,
	);
}

if (import.meta.main) {
	await main();
}
