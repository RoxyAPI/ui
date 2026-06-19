import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { BirthChartResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import {
	type ChartStyle,
	type KundliViewModel,
	renderKundliStyleTablist,
	renderKundliSvg,
	toKundliViewModel,
} from '../utils/kundli-render.js';
import { kundliStyles } from '../utils/kundli-styles.js';
import { tablistStyles } from '../utils/tablist.js';

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
 * The ascendant (house 1) defaults to the Janma Lagna carried in the response
 * `meta`. Set `chart-reference="moon"` to render the Chandra Lagna (Moon as
 * ascendant) from the same response, or `lagna-override="<rashi>"` to pin the
 * reference to any sign (Surya Lagna, Arudha Lagna, a custom point). The same
 * planet-in-sign data feeds every reference; only the house numbering rotates.
 *
 * Theming flows through CSS custom properties on `:host`, so the chart
 * adopts the host page palette without runtime color probing.
 */
@customElement('roxy-vedic-kundli')
export class RoxyVedicKundli extends RoxyDataElement<BirthChartResponse> {
	static styles = [baseStyles, kundliStyles, tablistStyles];

	@property({ type: String, reflect: true, attribute: 'chart-style' })
	chartStyle: ChartStyle = 'north';

	/**
	 * Ascendant reference point. `'lagna'` (default) uses the Janma Lagna from the response; `'moon'` renders the Chandra Lagna (Moon sign as house 1) from the same response. An explicit {@link lagnaOverride} wins over this.
	 */
	@property({ type: String, reflect: true, attribute: 'chart-reference' })
	chartReference: 'lagna' | 'moon' = 'lagna';

	/**
	 * Explicit rashi/sign name (case-insensitive, e.g. `"cancer"`) to use as the ascendant, overriding both the Janma Lagna and {@link chartReference}. Empty by default (standard Janma Lagna). Use for Surya Lagna, Arudha Lagna, or any custom reference chart.
	 */
	@property({ type: String, reflect: true, attribute: 'lagna-override' })
	lagnaOverride = '';

	/**
	 * Resolve the ascendant override fed to {@link toKundliViewModel}. An explicit `lagna-override` wins; otherwise `chart-reference="moon"` derives the Moon rashi from the response `meta`. Returns `undefined` for the default Janma Lagna path.
	 */
	private resolveReference(): string | undefined {
		if (this.lagnaOverride) return this.lagnaOverride;
		if (this.chartReference === 'moon') return this.data?.meta?.Moon?.rashi;
		return undefined;
	}

	private viewModel(): KundliViewModel | null {
		if (!this.data?.meta) return null;
		return toKundliViewModel(
			this.data.meta,
			'D1 Rashi',
			this.resolveReference(),
		);
	}

	private setStyle = (next: ChartStyle) => {
		this.chartStyle = next;
	};

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No kundli data</div>`;
	}

	protected renderData(_d: BirthChartResponse) {
		const vm = this.viewModel();
		if (!vm) return this.renderEmpty();
		const title =
			this.chartReference === 'moon' && !this.lagnaOverride
				? 'Chandra lagna'
				: 'Vedic kundli';
		return html`<div class="wrap">
			<div class="header">
				<h2 class="title">${title}</h2>
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
