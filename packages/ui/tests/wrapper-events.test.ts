import { afterEach, describe, expect, test } from 'bun:test';
import { type ComponentType, createElement } from 'react';
import { type Component, createApp, h, nextTick } from 'vue';
import {
	RoxyCrystalGrid as ReactCrystalGrid,
	RoxyDreamSearch as ReactDreamSearch,
	RoxyTarotCatalog as ReactTarotCatalog,
} from '../../ui-react/src/index.js';
import {
	RoxyCrystalGrid as VueCrystalGrid,
	RoxyDreamSearch as VueDreamSearch,
	RoxyTarotCatalog as VueTarotCatalog,
} from '../../ui-vue/src/index.js';
import '../src/index.js';

/**
 * The three lists announce a pick as `roxy-symbol-select`, and both generated wrappers type it as `onRoxySymbolSelect`; these mount each wrapper and dispatch the event from the element it renders, so a handler a React or Vue host passes is the one that runs.
 */

/** react-dom ships no type declarations here and this file needs two calls of it, so they are declared at the require. */
const { flushSync } = require('react-dom') as {
	flushSync(fn: () => void): void;
};
const { createRoot } = require('react-dom/client') as {
	createRoot(el: Element): { render(node: unknown): void; unmount(): void };
};

/** The wrappers load the bundle before they mount the element; a loader already marked loaded stands in for it, since the elements are registered above. */
function markBundleLoaded() {
	if (document.getElementById('roxyapi-ui-loader')) return;
	const s = document.createElement('script');
	s.id = 'roxyapi-ui-loader';
	s.dataset.loaded = 'true';
	document.head.appendChild(s);
}

// Vue reads two DOM constructors the shared test window does not put on the global scope.
const g = globalThis as unknown as Record<string, unknown>;
const w = window as unknown as Record<string, unknown>;
g.SVGElement ??= w.SVGElement;
g.MathMLElement ??= w.MathMLElement ?? class {};

const ticks = async () => {
	for (let i = 0; i < 6; i++) await new Promise((r) => setTimeout(r, 0));
};

const pick = (host: HTMLElement, tag: string) =>
	host.querySelector(tag)?.dispatchEvent(
		new CustomEvent('roxy-symbol-select', {
			detail: { id: 'snake', name: 'Snake' },
			bubbles: true,
			composed: true,
		}),
	);

/** Each list with its two wrappers, typed only as far as the handler this file passes. */
type Handler = { onRoxySymbolSelect: (e: CustomEvent) => void };
const CASES: [string, ComponentType<Handler>, Component][] = [
	[
		'roxy-dream-search',
		ReactDreamSearch as ComponentType<Handler>,
		VueDreamSearch,
	],
	[
		'roxy-crystal-grid',
		ReactCrystalGrid as ComponentType<Handler>,
		VueCrystalGrid,
	],
	[
		'roxy-tarot-catalog',
		ReactTarotCatalog as ComponentType<Handler>,
		VueTarotCatalog,
	],
];

afterEach(() => {
	document.body.innerHTML = '';
});

describe('the list wrappers hand roxy-symbol-select to the host handler', () => {
	for (const [tag, ReactWrapper, VueWrapper] of CASES) {
		test(`React onRoxySymbolSelect fires on ${tag}`, async () => {
			markBundleLoaded();
			const host = document.createElement('div');
			document.body.appendChild(host);
			const seen: unknown[] = [];
			const root = createRoot(host);
			flushSync(() =>
				root.render(
					createElement(ReactWrapper, {
						onRoxySymbolSelect: (e: CustomEvent) => seen.push(e.detail),
					}),
				),
			);
			await ticks();
			pick(host, tag);
			expect(seen).toEqual([{ id: 'snake', name: 'Snake' }]);
			root.unmount();
		});

		test(`Vue onRoxySymbolSelect fires on ${tag}`, async () => {
			markBundleLoaded();
			const host = document.createElement('div');
			document.body.appendChild(host);
			const seen: unknown[] = [];
			const app = createApp({
				render: () =>
					h(VueWrapper, {
						onRoxySymbolSelect: (e: CustomEvent) => seen.push(e.detail),
					}),
			});
			app.mount(host);
			await nextTick();
			await ticks();
			pick(host, tag);
			expect(seen).toEqual([{ id: 'snake', name: 'Snake' }]);
			app.unmount();
		});
	}
});
