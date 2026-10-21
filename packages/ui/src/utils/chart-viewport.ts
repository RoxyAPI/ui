import {
	css,
	html,
	nothing,
	type ReactiveController,
	type ReactiveControllerHost,
} from 'lit';
import type { Translate } from './hd-reading.js';

type ChartHost = ReactiveControllerHost & { renderRoot: ParentNode };

/** An enlarged, scrollable chart with native modal focus and keyboard handling. */
export class ChartViewport implements ReactiveController {
	private state: 'closed' | 'opening' | 'open' = 'closed';
	private zoom = 1;
	private position?: { x: number; y: number };

	constructor(private readonly host: ChartHost) {
		host.addController(this);
	}

	hostUpdated(): void {
		const dialog =
			this.host.renderRoot.querySelector<HTMLDialogElement>(
				'.roxy-chart-dialog',
			);
		if (!dialog) this.reset();
		else if (dialog.isConnected && this.state !== 'closed') {
			if (this.state === 'opening') {
				this.state = 'open';
				if (!dialog.open) dialog.showModal();
			}
			const scroll = dialog.querySelector<HTMLElement>('.roxy-chart-scroll');
			if (dialog.open && scroll && this.position) {
				scroll.scrollLeft =
					scroll.scrollWidth * this.position.x - scroll.clientWidth / 2;
				scroll.scrollTop =
					scroll.scrollHeight * this.position.y - scroll.clientHeight / 2;
				this.position = undefined;
			}
		}
	}

	hostDisconnected(): void {
		this.reset();
		this.host.renderRoot
			.querySelector<HTMLDialogElement>('.roxy-chart-dialog')
			?.close();
	}

	private reset(): void {
		this.state = 'closed';
		this.zoom = 1;
		this.position = undefined;
	}

	private resize(delta: number): void {
		const scroll =
			this.host.renderRoot.querySelector<HTMLElement>('.roxy-chart-scroll');
		this.position =
			delta === 0
				? { x: 0.5, y: 0 }
				: scroll
					? {
							x:
								(scroll.scrollLeft + scroll.clientWidth / 2) /
								scroll.scrollWidth,
							y:
								(scroll.scrollTop + scroll.clientHeight / 2) /
								scroll.scrollHeight,
						}
					: undefined;
		this.zoom = delta === 0 ? 1 : Math.min(3, Math.max(1, this.zoom + delta));
		this.host.requestUpdate();
	}

	renderChartViewport(chart: unknown, label: string, t: Translate): unknown {
		return html`<div class="roxy-chart-view">
			${chart}
			<div class="roxy-chart-tools" part="chart-controls">
				<button type="button" @click=${() => {
					this.state = 'opening';
					this.position = { x: 0.5, y: 0 };
					this.host.requestUpdate();
				}}>${t('Enlarge chart')}</button>
			</div>
			<dialog class="roxy-chart-dialog" part="chart-dialog" aria-label=${label} @close=${() => {
				this.reset();
				this.host.requestUpdate();
			}}>
				${
					this.state !== 'closed'
						? html`<div class="roxy-chart-bar">
					<strong>${label}</strong>
					<div class="roxy-chart-tools">
						<button type="button" aria-label=${t('Zoom out')} ?disabled=${this.zoom === 1} @click=${() => this.resize(-0.5)}>−</button>
						<button type="button" @click=${() => this.resize(0)}>${t('Reset zoom')}</button>
						<button type="button" aria-label=${t('Zoom in')} ?disabled=${this.zoom === 3} @click=${() => this.resize(0.5)}>+</button>
						<button type="button" @click=${() => this.host.renderRoot.querySelector<HTMLDialogElement>('.roxy-chart-dialog')?.close()}>${t('Close')}</button>
					</div>
				</div>
				<div class="roxy-chart-scroll" role="region" tabindex="0" aria-label=${label}>
					<div class="roxy-chart-expanded" style=${`--chart-zoom:${this.zoom}`}>${chart}</div>
				</div>`
						: nothing
				}
			</dialog>
		</div>`;
	}
}

export const chartViewportStyles = css`
	.roxy-chart-view { min-width: 0; }
	.roxy-chart-tools { display: flex; flex-wrap: wrap; gap: var(--roxy-space-sm, .5rem); align-items: center; justify-content: flex-end; }
	.roxy-chart-tools button { font: inherit; font-size: var(--roxy-text-sm, .875rem); color: var(--roxy-secondary, #475569); background: var(--roxy-surface, #fff); border: 1px solid var(--roxy-border, #e4e4e7); border-radius: var(--roxy-radius-sm, 4px); min-width: 2.5rem; min-height: 2.5rem; padding: .35rem .7rem; cursor: pointer; }
	.roxy-chart-tools button:disabled { opacity: .45; cursor: default; }
	.roxy-chart-tools button:focus-visible, .roxy-chart-scroll:focus-visible { outline: 2px solid var(--roxy-ring, #b45309); outline-offset: 2px; }
	.roxy-chart-dialog { --roxy-surface: var(--roxy-bg, #fff); width: calc(100vw - 2rem); max-width: 72rem; max-height: calc(100dvh - 2rem); padding: var(--roxy-space-md, 1rem); margin: auto; border: 1px solid var(--roxy-border, #e4e4e7); border-radius: var(--roxy-radius-md, 8px); color: var(--roxy-fg, #0a0a0a); background: var(--roxy-bg, #fff); box-shadow: var(--roxy-shadow-lg); }
	.roxy-chart-dialog[open] { display: flex; flex-direction: column; overflow: hidden; }
	.roxy-chart-dialog::backdrop { background: rgb(0 0 0 / .55); }
	.roxy-chart-bar { flex-shrink: 0; display: flex; align-items: center; justify-content: space-between; gap: var(--roxy-space-md, 1rem); flex-wrap: wrap; margin-bottom: var(--roxy-space-md, 1rem); }
	.roxy-chart-bar > strong { min-width: 0; overflow-wrap: anywhere; }
	.roxy-chart-scroll { flex: 1 1 auto; min-height: 0; overflow: auto; overscroll-behavior: contain; }
	.roxy-chart-expanded { width: max(100%, calc(60rem * var(--chart-zoom, 1))); padding: var(--roxy-space-sm, .5rem); }
	.roxy-chart-expanded > svg { width: 100%; max-width: none; height: auto; margin: 0; }
`;
