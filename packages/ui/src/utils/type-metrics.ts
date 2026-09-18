import type { ReactiveController, ReactiveControllerHost } from 'lit';

/**
 * Re-renders the host whenever its box changes.
 *
 * @remarks
 * A wheel fans its marks apart by the width of the text it draws, and that width is decided by a container query the stylesheet resolves after the marks are placed: below the phone breakpoint the degree band grows from 7 to 10 user units, and nothing inside a render pass can see which size applied. Observing the host turns a breakpoint crossing into one more pass, and that pass reads the size back through {@link renderedFontSize}, so the stylesheet stays the only place a size is written.
 */
export class RerenderOnResize implements ReactiveController {
	private readonly host: ReactiveControllerHost & Element;
	private observer?: ResizeObserver;

	constructor(host: ReactiveControllerHost & Element) {
		this.host = host;
		host.addController(this);
	}

	hostConnected(): void {
		if (typeof ResizeObserver === 'undefined') return;
		this.observer = new ResizeObserver(() => this.host.requestUpdate());
		this.observer.observe(this.host);
	}

	hostDisconnected(): void {
		this.observer?.disconnect();
		this.observer = undefined;
	}
}

/**
 * The font size the stylesheet resolved for the first element matching `selector`, in the units the SVG draws in.
 *
 * @remarks
 * Inside a `viewBox` a CSS pixel is a user unit, so the number this returns is directly comparable with the radii a wheel is laid out on. Where nothing matches yet, or the platform reports no layout, `fallback` is returned: a first render or a unit test then draws on the size the stylesheet declares for a wide host.
 */
export function renderedFontSize(
	root: ParentNode | null | undefined,
	selector: string,
	fallback: number,
): number {
	const el = root?.querySelector(selector);
	if (!el || typeof getComputedStyle !== 'function') return fallback;
	const px = Number.parseFloat(getComputedStyle(el).fontSize);
	return Number.isFinite(px) && px > 0 ? px : fallback;
}
