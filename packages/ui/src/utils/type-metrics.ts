import type { ReactiveController, ReactiveControllerHost } from 'lit';

/** A host whose shadow root can be measured after each render. */
type MeasuredHost = ReactiveControllerHost &
	Element & { renderRoot: ParentNode };

/**
 * The font sizes a stylesheet actually applied to the marks of a drawing, read back after each render and kept current across the host's breakpoints.
 *
 * @remarks
 * A wheel fans its marks apart by the width of the text it draws, and that width is decided by a container query the stylesheet resolves after the marks are placed: below the phone breakpoint the degree band grows from 7 to 10 user units, and nothing inside a render pass can see which size applied. Inside a `viewBox` a CSS pixel is a user unit, so the number read back is directly comparable with the radii the drawing is laid out on. Each entry is a selector for one mark and the size the stylesheet declares for a wide host, which is what the first render draws on, and what a unit test with no layout draws on. A change of size after a render, or a resize of the host, requests one more render, so a breakpoint crossing is one extra pass and a wide host never re-renders for it. The stylesheet stays the only place a size is written.
 */
export class MeasuredType<K extends string> implements ReactiveController {
	/** The size in play for each mark, in user units. */
	readonly size: Record<K, number>;
	private readonly host: MeasuredHost;
	private readonly marks: Record<
		K,
		readonly [selector: string, declared: number]
	>;
	private observer?: ResizeObserver;

	constructor(
		host: MeasuredHost,
		marks: Record<K, readonly [selector: string, declared: number]>,
	) {
		this.host = host;
		this.marks = marks;
		this.size = Object.fromEntries(
			(Object.keys(marks) as K[]).map((k) => [k, marks[k][1]]),
		) as Record<K, number>;
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

	hostUpdated(): void {
		let changed = false;
		for (const k of Object.keys(this.marks) as K[]) {
			const [selector] = this.marks[k];
			const next = renderedFontSize(
				this.host.renderRoot,
				selector,
				this.size[k],
			);
			if (next !== this.size[k]) {
				this.size[k] = next;
				changed = true;
			}
		}
		if (changed) this.host.requestUpdate();
	}
}

/**
 * The font size the stylesheet resolved for the first element matching `selector`, in the units the SVG draws in.
 *
 * @remarks
 * Where nothing matches yet, or the platform reports no layout, `fallback` is returned, so a first render and a unit test draw on the size the stylesheet declares for a wide host.
 */
function renderedFontSize(
	root: ParentNode | null | undefined,
	selector: string,
	fallback: number,
): number {
	const el = root?.querySelector(selector);
	if (!el || typeof getComputedStyle !== 'function') return fallback;
	const px = Number.parseFloat(getComputedStyle(el).fontSize);
	return Number.isFinite(px) && px > 0 ? px : fallback;
}
