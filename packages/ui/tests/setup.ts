/**
 * Bun test setup. Registers a happy-dom Window globally so Lit element
 * instantiation works under bun test. Bun's test runner is fast enough
 * that we set up DOM globals once per worker.
 */
import { Window } from 'happy-dom';

const window = new Window({
	url: 'http://localhost:3000',
	settings: { disableJavaScriptEvaluation: false },
});

const target = globalThis as unknown as Record<string, unknown>;

target.window = window;
target.document = window.document;
target.HTMLElement = window.HTMLElement;
target.HTMLAnchorElement = window.HTMLAnchorElement;
target.HTMLInputElement = window.HTMLInputElement;
target.HTMLSelectElement = window.HTMLSelectElement;
target.HTMLButtonElement = window.HTMLButtonElement;
target.HTMLFormElement = window.HTMLFormElement;
target.HTMLImageElement = window.HTMLImageElement;
target.HTMLDivElement = window.HTMLDivElement;
target.Element = window.Element;
target.Node = window.Node;
target.customElements = window.customElements;
target.Event = window.Event;
target.CustomEvent = window.CustomEvent;
target.MutationObserver = window.MutationObserver;
target.requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(cb, 16);
target.cancelAnimationFrame = (id: number) => clearTimeout(id);
target.matchMedia = (q: string) => ({
	matches: false,
	media: q,
	onchange: null,
	addListener: () => undefined,
	removeListener: () => undefined,
	addEventListener: () => undefined,
	removeEventListener: () => undefined,
	dispatchEvent: () => false,
});
