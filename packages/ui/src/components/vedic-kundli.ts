import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { BirthChartResponse } from '../types/index.js';
import { baseStyles } from '../utils/base-styles.js';
import {
	type ChartStyle,
	type KundliViewModel,
	renderKundliStyleTablist,
	renderKundliSvg,
	toKundliViewModel,
} from '../utils/kundli-render.js';
import { kundliStyles } from '../utils/kundli-styles.js';
import { MarkupDataController } from '../utils/markup-data.js';

/**
 * Vedic kundli (D1 Rashi chart). Pass `data` from /vedic-astrology/birth-chart.
 * Three regional render styles are available; the visible tablist lets the
 * end user switch between South / North / East at any time. The same planet-
 * in-sign data feeds every style, so the toggle is purely a layout choice.
 *
 * Each planet shows its abbreviation and whole-degree-within-sign, with an
 * SVG tooltip carrying exact position, nakshatra, pada, and avastha. The host
 * page sets the initial style via `chart-style` attribute; from there the
 * user takes over.
 *
 * Theming flows through CSS custom properties on `:host`, so the chart
 * adopts the host page palette without runtime color probing.
 */
@customElement('roxy-vedic-kundli')
export class RoxyVedicKundli extends LitElement {
	static styles = [baseStyles, kundliStyles];

	constructor() {
		super();
		// Enables hydrating `data` from a direct-child
		// <script type="application/json" class="roxy-data"> for server-rendered
		// and cached consumers. The JavaScript `data` property still wins.
		new MarkupDataController(this);
	}

	@property({ attribute: false })
	data: BirthChartResponse | null = null;

	@property({ type: String, reflect: true, attribute: 'chart-style' })
	chartStyle: ChartStyle = 'north';

	private viewModel(): KundliViewModel | null {
		if (!this.data?.meta) return null;
		return toKundliViewModel(this.data.meta, 'D1 Rashi');
	}

	private setStyle = (next: ChartStyle) => {
		this.chartStyle = next;
	};

	render() {
		const vm = this.viewModel();
		if (!vm)
			return html`<div class="roxy-empty" role="status">No kundli data</div>`;
		return html`<div class="wrap">
			<div class="header">
				<h2 class="title">Vedic kundli</h2>
				${renderKundliStyleTablist(this.chartStyle, this.setStyle)}
			</div>
			<svg
				viewBox="0 0 400 400"
				preserveAspectRatio="xMidYMid meet"
				role="img"
				aria-label="Vedic birth chart with twelve sign houses"
			>
				<title>Vedic kundli</title>
				${renderKundliSvg(vm, this.chartStyle)}
			</svg>
		</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-vedic-kundli': RoxyVedicKundli;
	}
}
