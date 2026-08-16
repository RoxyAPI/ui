import { css, html, nothing, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
	aspectSymbol,
	planetGlyph,
	SIGNS_ORDER,
	signGlyph,
} from '../tokens/index.js';
import type { NatalChartResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import {
	arcMidpoint,
	arcSeparation,
	fanOut,
	longitudeToSignPosition,
	normalizeLongitude,
	oppositePoint,
	polarToCartesian,
} from '../utils/degree.js';
import { disclosureStyles } from '../utils/disclosure.js';
import {
	ASPECT_CLASS,
	formatAspectName,
	formatDateTime,
	formatNumber,
	formatPercent,
	normalizeAspect,
} from '../utils/format.js';
import {
	type InterpSection,
	interpAccordionStyles,
} from '../utils/interp-accordion.js';
import { display, displayList } from '../utils/localized.js';
import { capitalize, lookupKey } from '../utils/string.js';
import { renderTablist, tablistStyles } from '../utils/tablist.js';

type PlanetEntry = NatalChartResponse['planets'][number];
type AspectEntry = NatalChartResponse['aspects'][number];
type PatternEntry = NonNullable<NatalChartResponse['patterns']>[number];

/**
 * Reading order for detected configurations. A practitioner reads the rare, chart-defining figures first (a Grand Cross reframes the whole chart) and the common ones last, so the response order is re-sorted rather than dumped. Ties break on tightness, the closest to exact first.
 */
const PATTERN_ORDER: Record<string, number> = {
	GRAND_CROSS: 0,
	GRAND_TRINE: 1,
	KITE: 2,
	T_SQUARE: 3,
	YOD: 4,
	MYSTIC_RECTANGLE: 5,
	STELLIUM: 6,
};

const SIZE = 420;
const CENTER = SIZE / 2;
const OUTER_R = 164;
const SIGN_R = 146;
const HOUSE_R = 120;
const PLANET_R = 96;
const ANGLE_TICK_R = 178;
const ANGLE_LABEL_R = 196;
/**
 * How wide each mark on the wheel is, in user units, so {@link arcSeparation}
 * can turn it into the degrees of arc that mark needs at its own radius. These
 * are type metrics rather than shared constants: the glyph width tracks the
 * `.planet-glyph` font size, the degree allowance the `.planet-deg` one, and the
 * angle label the widest of `ASC`, `DSC`, `MC`, `IC`, `PoF` and `Vtx` plus the
 * gap that keeps two of them apart.
 */
const GLYPH_WIDTH = 14;
const DEG_LABEL_WIDTH = 15;
const ANGLE_LABEL_WIDTH = 28;

/**
 * The chart shape the wheel actually renders.
 *
 * @remarks
 * `RelocationChartResponse` carries the same planets, houses, angles and birth details as `NatalChartResponse` (`RelocationPlanet` is field-for-field identical to the natal planet item), and differs only by having no `aspects`, `aspectsInterpretation`, `patterns`, `partOfFortune` or `summary`. The wheel already renders without them, so those five are simply optional here.
 *
 * Typing that contract is what lets {@link RoxyRelocationWheel} compose this component honestly. It used to pass its response through a `data as unknown as NatalChartResponse` double cast, which silently asserted five required fields that were not there.
 */
type ChartExtras =
	| 'aspects'
	| 'aspectsInterpretation'
	| 'patterns'
	| 'partOfFortune'
	| 'summary';
export type WheelChart = Omit<NatalChartResponse, ChartExtras> &
	Partial<Pick<NatalChartResponse, ChartExtras>>;

/**
 * Western natal chart wheel. Renders the 12 zodiac signs, 12 houses, planet
 * markers, and aspect lines from a /astrology/natal-chart response.
 *
 * @remarks
 * **There is deliberately no `house-system` input, and re-adding one would be a
 * lie in the types.** The house system is a REQUEST parameter: /astrology/natal-chart
 * and /astrology/relocation-chart both take it and both echo the system they
 * actually used as a required `houseSystem` field, which is what the legend
 * chip reads. This component computes nothing astrological, so an attribute
 * could never move a cusp; all it could do is print a label contradicting the
 * cusps drawn beside it. One shipped anyway, declared and typed and wired
 * through both framework wrappers, and nothing ever read it, so a consumer who
 * followed our own generated types set it and got silence. Change the system in
 * the REQUEST (the self-fetch form already offers it, straight off the spec) and
 * the response relabels itself.
 *
 * **The equal-sector fallback is visible, on purpose.** With fewer than twelve
 * cusps in the response the wheel draws twelve equal 30 degree sectors from the
 * Ascendant, which is a different chart from a Placidus one; it says so in the
 * accessible name and in a legend chip rather than numbering the sectors 1 to 12
 * and letting a reader assume the response carried them.
 */
@customElement('roxy-natal-chart')
export class RoxyNatalChart extends RoxyDataElement<WheelChart> {
	static styles = [
		baseStyles,
		tablistStyles,
		disclosureStyles,
		interpAccordionStyles,
		css`
			.wrap {
				width: 100%;
				background: var(--roxy-surface, #fff);
				color: var(--roxy-fg, #0a0a0a);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				/* minmax(0, 1fr), not the implicit auto column. An auto grid column takes
				 * its MINIMUM from min-content, so a nowrap table wider than the card blows
				 * the column out and drags every sibling with it, clipped on the right. This
				 * is what lets the scroll container inside actually scroll. */
				grid-template-columns: minmax(0, 1fr);
				gap: var(--roxy-space-md, 1rem);
			}

			.title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
				color: var(--roxy-primary, #0f172a);
			}

			.meta {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}

			svg {
				display: block;
				width: 100%;
				max-width: var(--roxy-chart-max-width, 560px);
				aspect-ratio: 1 / 1;
				height: auto;
				margin: 0 auto;
			}

			.wheel-line {
				fill: none;
				stroke: var(--roxy-border, #e4e4e7);
			}

			.sign-glyph {
				fill: var(--roxy-secondary, #475569);
				font-size: 14px;
				font-family: var(--roxy-font-sans);
			}

			.planet-glyph {
				fill: var(--roxy-accent, #f59e0b);
				font-size: 14px;
				font-weight: 600;
				font-family: var(--roxy-font-sans);
			}

			.planet-deg {
				fill: var(--roxy-fg, #0a0a0a);
				font-size: 7px;
				font-family: var(--roxy-font-sans);
			}

			/* Below 480px the chart container shrinks to ~320px on phones.
			 * Bump in-SVG text up proportionally so the 7px degree band
			 * does not collapse below ~6px on screen.
			 */
			@container (max-width: 480px) {
				.sign-glyph,
				.planet-glyph {
					font-size: 18px;
				}
				.planet-deg {
					font-size: 10px;
				}
				.house-num {
					font-size: 12px;
				}
			}

			.planet-deg .retro {
				fill: var(--roxy-danger, #dc2626);
			}

			.planet-leader {
				stroke: var(--roxy-accent, #f59e0b);
				stroke-width: 0.5;
				opacity: 0.55;
			}

			.house-num {
				fill: var(--roxy-muted, #71717a);
				font-size: 9px;
				font-family: var(--roxy-font-sans);
			}

			.cusp-deg {
				fill: var(--roxy-muted, #71717a);
				font-size: 6px;
				font-family: var(--roxy-font-sans);
			}

			.tick {
				stroke: var(--roxy-border, #e4e4e7);
			}
			.tick-major {
				stroke: var(--roxy-secondary, #475569);
			}

			.aspect {
				stroke-width: 0.8;
				fill: none;
				opacity: 0.55;
			}
			.aspect-trine,
			.aspect-sextile {
				stroke: var(--roxy-success, #16a34a);
			}
			.aspect-square,
			.aspect-opposition {
				stroke: var(--roxy-danger, #dc2626);
			}
			.aspect-conjunction {
				stroke: var(--roxy-accent-ink, #b45309);
			}
			.aspect-other {
				stroke: var(--roxy-muted, #71717a);
				opacity: 0.4;
			}

			.angle-marker {
				fill: var(--roxy-accent-ink, #b45309);
				font-size: 10px;
				font-weight: 700;
				font-family: var(--roxy-font-sans);
				letter-spacing: 0.04em;
			}
			.angle-tick {
				stroke: var(--roxy-accent-ink, #b45309);
				stroke-width: 1.5;
			}

			.legend {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-md, 1rem);
			}
			.legend-swatch {
				display: inline-block;
				width: 8px;
				height: 8px;
				border-radius: 50%;
				margin-right: 4px;
				vertical-align: middle;
			}
			/* The equal-sector fallback has to be READ, not blend into the muted
			 * legend beside it, so it takes --roxy-fg and a border. Not a tint with
			 * coloured text: on a tinted chip that measures below the 4.5 floor. */
			.legend .caveat {
				color: var(--roxy-fg, #0a0a0a);
				font-weight: var(--roxy-weight-bold, 600);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-full, 9999px);
				padding: 1px 8px;
			}

			.grid-scroll {
				overflow-x: auto;
				min-width: 0;
				-webkit-overflow-scrolling: touch;
			}
			table.aspect-grid {
				border-collapse: collapse;
				font-size: var(--roxy-text-xs, 0.75rem);
				margin: 0 auto;
			}
			table.aspect-grid th,
			table.aspect-grid td {
				width: 1.6rem;
				height: 1.6rem;
				text-align: center;
				border: 1px solid var(--roxy-border, #e4e4e7);
				padding: 0;
			}
			table.aspect-grid th {
				color: var(--roxy-secondary, #475569);
				font-weight: var(--roxy-weight-bold, 600);
			}
			table.aspect-grid td.cell {
				cursor: default;
			}
			table.aspect-grid td.empty {
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 18%, transparent);
			}
			table.aspect-grid td .asp {
				font-size: 0.95em;
				line-height: 1;
			}
			table.aspect-grid td.aspect-trine .asp,
			table.aspect-grid td.aspect-sextile .asp {
				color: var(--roxy-success, #16a34a);
			}
			table.aspect-grid td.aspect-square .asp,
			table.aspect-grid td.aspect-opposition .asp {
				color: var(--roxy-danger, #dc2626);
			}
			table.aspect-grid td.aspect-conjunction .asp {
				color: var(--roxy-accent-ink, #b45309);
			}
			table.aspect-grid td.aspect-other .asp {
				color: var(--roxy-muted, #71717a);
			}

			.details {
				margin-top: var(--roxy-space-md, 1rem);
			}

			.pill-row {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
				margin-bottom: var(--roxy-space-xs, 0.25rem);
			}

			.pill {
				padding: 2px 8px;
				border-radius: var(--roxy-radius-sm, 4px);
				font-size: var(--roxy-text-xs, 0.75rem);
				background: color-mix(in srgb, var(--roxy-fg, #0f172a) 8%, transparent);
				color: var(--roxy-fg, #0f172a);
			}

			/* Ink on a status tint is the -fg token, never the base status colour: the
			 * base is tuned to read on the surface, and on a tint of itself it lands
			 * near 3:1. The sibling tables take the same pair. */
			.pill--success {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 15%, transparent);
				color: var(--roxy-success-fg, #166534);
			}

			.pill--danger {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 15%, transparent);
				color: var(--roxy-danger-fg, #991b1b);
			}

			.pill--muted {
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 60%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}

			.summary {
				color: var(--roxy-fg, #0f172a);
				font-size: var(--roxy-text-sm, 0.875rem);
				margin: var(--roxy-space-md, 1rem) 0;
			}

			.em-grid {
				border-collapse: collapse;
				font-size: var(--roxy-text-xs, 0.75rem);
				width: 100%;
			}
			.em-grid caption {
				caption-side: top;
				text-align: left;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				padding-bottom: var(--roxy-space-xs, 0.25rem);
			}
			.em-grid th,
			.em-grid td {
				border: 1px solid var(--roxy-border, #e4e4e7);
				padding: 3px 5px;
				text-align: center;
				vertical-align: middle;
			}
			.em-grid th {
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				letter-spacing: 0.04em;
			}
			.em-grid th[scope='row'] {
				text-align: left;
			}
			.em-grid td {
				color: var(--roxy-accent, #f59e0b);
				font-size: 0.95em;
				line-height: 1.4;
				min-width: 1.4rem;
			}
			.em-grid .em-total {
				color: var(--roxy-fg, #0a0a0a);
				font-weight: var(--roxy-weight-bold, 600);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 25%, transparent);
			}
			/* The dominant element row and modality column carry the same claim as
			 * the summary pills above the grid, so tint them: the pill and the cell
			 * a reader lands on must agree. */
			.em-grid .dominant {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 10%, transparent);
			}
			.em-grid th.dominant,
			.em-grid td.em-total.dominant {
				color: var(--roxy-fg, #0a0a0a);
			}

			.pattern {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				margin-bottom: var(--roxy-space-xs, 0.25rem);
				display: grid;
				gap: 0.35rem;
			}
			.pattern-head {
				display: flex;
				align-items: baseline;
				gap: 0.5rem;
				flex-wrap: wrap;
			}
			.pattern-name {
				font-weight: var(--roxy-weight-bold, 600);
			}
			.pattern-tag {
				padding: 1px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 55%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				text-transform: capitalize;
			}
			.pattern-tight {
				margin-left: auto;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-variant-numeric: tabular-nums;
			}
			.pattern-planets {
				display: flex;
				flex-wrap: wrap;
				gap: 0.25rem;
			}
			.planet-chip {
				display: inline-flex;
				align-items: baseline;
				gap: 0.3rem;
				padding: 1px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 45%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}
			/* The apex is where the configuration discharges, so it leads the chip
			 * row and carries the accent tint. Text stays --roxy-fg: accent-ink on a
			 * tinted chip fails AA. */
			.planet-chip.apex {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 20%, transparent);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.planet-chip .apex-tag {
				font-size: 0.85em;
				font-weight: 400;
				text-transform: uppercase;
				letter-spacing: 0.04em;
			}
			.pattern-interp {
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-sm, 0.875rem);
				line-height: 1.45;
				margin: 0;
			}

			.interp-keywords {
				display: flex;
				flex-wrap: wrap;
				gap: 0.25rem;
			}
			.interp-keywords .kw {
				padding: 1px 8px;
				border-radius: 9999px;
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
		`,
	];

	/** Heading above the wheel. Defaults to "Natal chart"; reuse (e.g. the relocation wheel) sets its own. */
	@property({ type: String })
	heading = 'Natal chart';

	/** Which view is showing: the wheel or the planet-by-planet aspect grid. */
	@state()
	private view: 'wheel' | 'grid' = 'wheel';

	private getPlanets(): PlanetEntry[] {
		return this.data?.planets ?? [];
	}

	private getAscendant(): number {
		return this.data?.ascendant?.longitude ?? 0;
	}

	private getMidheaven(): number | null {
		const m = this.data?.midheaven?.longitude;
		return typeof m === 'number' ? m : null;
	}

	/**
	 * True when the response carried all twelve house cusps, so every house on the
	 * wheel is a longitude the API sent rather than a 30 degree sector this
	 * component invented. Read by the spokes, the numbers, the cusp degrees, the
	 * accessible name and the legend, so the drawing and the words about it cannot
	 * disagree about which chart is on screen.
	 */
	private get hasCusps(): boolean {
		return (this.data?.houses ?? []).length === 12;
	}

	private toAngle(lon: number): number {
		return 180 + this.getAscendant() - lon;
	}

	protected renderData(data: WheelChart) {
		const planets = this.getPlanets();
		const aspects = data.aspects ?? [];
		const view = this.view;

		return html`<div class="wrap" part="card">
			<header part="header">
				<h2 class="title">${this.t(this.heading)}</h2>
				${
					data.birthDetails
						? html`<div class="meta">
							${formatDateTime(this.effectiveLang(), data.birthDetails.date, data.birthDetails.time)}
						</div>`
						: nothing
				}
			</header>
			${
				aspects.length > 0
					? html`${renderTablist({
							items: [
								{ id: 'wheel', label: this.t('Wheel') },
								{ id: 'grid', label: this.t('Aspect grid') },
							],
							active: view,
							onSelect: (v) => {
								this.view = v;
							},
							label: this.t('Natal chart views'),
							idPrefix: 'natal',
							controls: true,
						})}
						<div
							id="natal-panel-${view}"
							part="panel"
							role="tabpanel"
							aria-labelledby="natal-tab-${view}"
						>
							${view === 'wheel' ? this.renderWheel(planets, aspects) : this.renderAspectGrid(planets, aspects)}
						</div>`
					: this.renderWheel(planets, aspects)
			}
			<div class="legend" part="legend">
				<span>${this.t('{{count}} planets', { count: planets.length })}</span>
				${aspects.length > 0 ? html`<span>${this.t('{{count}} aspects', { count: aspects.length })}</span>` : nothing}
				${
					// The system names the CUSPS, so it is only true while there are
					// cusps. Without them the caveat takes its place rather than sitting
					// beside it and contradicting it.
					this.hasCusps && data.houseSystem
						? html`<span>${this.t('{{system}} houses', { system: data.houseSystem })}</span>`
						: html`<span class="caveat">${this.t('Equal sectors from the Ascendant, no house cusps in this response')}</span>`
				}
				${
					aspects.length > 0
						? html`<span><span class="legend-swatch" style="background: var(--roxy-success)"></span>${this.t('Harmonious')}</span>
							<span><span class="legend-swatch" style="background: var(--roxy-danger)"></span>${this.t('Challenging')}</span>`
						: nothing
				}
			</div>
			${this.renderDetails()}
			${
				// Ungated on purpose. The figures are chart geometry, not a reading, and
				// only the paragraph inside each card answers to hide-readings. Do NOT
				// wrap this call in the flag: the reasoning, and the escape hatch for a
				// page that wants the block gone anyway, are on renderPatterns.
				this.renderPatterns()
			}
			${this.renderInterpretations()}
		</div>`;
	}

	private renderWheel(planets: PlanetEntry[], aspects: AspectEntry[]) {
		return html`<svg
			viewBox="0 0 ${SIZE} ${SIZE}"
			part="chart"
			role="img"
			aria-label=${
				this.hasCusps
					? this.t('Natal chart wheel with twelve houses, planets, and aspects')
					: this.t(
							'Natal chart wheel with planets and aspects, houses shown as equal sectors from the Ascendant',
						)
			}
		>
			<title>${this.t('Natal chart wheel')}</title>
			<desc>
				${this.t('Twelve zodiac sign segments around a circular wheel. Planet glyphs are placed at their ecliptic longitudes. Aspect lines connect related planets.')}
			</desc>
			<circle class="wheel-line" cx=${CENTER} cy=${CENTER} r=${OUTER_R} stroke-width="1.5" />
			<circle class="wheel-line" cx=${CENTER} cy=${CENTER} r=${SIGN_R - 14} stroke-width="0.8" />
			<circle class="wheel-line" cx=${CENTER} cy=${CENTER} r=${HOUSE_R} stroke-width="1" />
			<circle class="wheel-line" cx=${CENTER} cy=${CENTER} r=${PLANET_R - 16} stroke-width="0.5" />
			${this.renderTicks()} ${this.renderSpokes()} ${this.renderSigns()}
			${this.renderHouseNumbers()} ${this.renderCuspDegrees()}
			${this.renderAspects(planets, aspects)} ${this.renderPlanets(planets)}
			${this.renderAngles()}
		</svg>`;
	}

	/**
	 * Planet-by-planet aspect grid: the lower-triangular matrix astrologers read
	 * alongside the wheel. Each filled cell shows the aspect glyph colored by
	 * nature, with the exact orb in the SVG-free `<title>` tooltip.
	 */
	private renderAspectGrid(planets: PlanetEntry[], aspects: AspectEntry[]) {
		// Both values per body, deliberately: `name` is the English one the pairing
		// and the glyph table are keyed on, `label` is the one a reader sees. The
		// label is rendered verbatim, never through `capitalize`, which lowercases
		// the rest of the string and made a tooltip read "North node"; the pairing
		// folds through `lookupKey`, the same normalizer the glyph table uses.
		const bodies = planets.map((p) => ({
			name: p.name,
			label: display(p, 'name'),
		}));
		const pairKey = (a: string, b: string) =>
			[lookupKey(a), lookupKey(b)].sort().join('|');
		const byPair = new Map<string, AspectEntry>();
		for (const a of aspects) byPair.set(pairKey(a.planet1, a.planet2), a);
		if (bodies.length === 0)
			return html`<p class="roxy-empty" role="status">${this.t('No planets to grid')}</p>`;

		return html`<div class="grid-scroll" part="section aspects table aspect-grid">
			<table class="aspect-grid">
				<caption class="roxy-sr-only">
					${this.t('Planet by planet aspect grid: the aspect each pair of planets forms, read from the planet naming the row across to the planet naming the column.')}
				</caption>
				<thead>
					<tr>
						<th></th>
						${bodies.slice(0, -1).map((b) => {
							const g = planetGlyph(b.name) ?? b.label;
							return html`<th scope="col" title=${b.label}>${g}</th>`;
						})}
					</tr>
				</thead>
				<tbody>
					${bodies.slice(1).map((row, ri) => {
						const rowGlyph = planetGlyph(row.name) ?? row.label;
						// Row i (1-based) pairs with columns 0..i-1.
						return html`<tr>
							<th scope="row" title=${row.label}>${rowGlyph}</th>
							${bodies.slice(0, ri + 1).map((col) => {
								const a = byPair.get(pairKey(row.name, col.name));
								if (!a) return html`<td class="empty"></td>`;
								const name = normalizeAspect(a);
								// Every aspect the API returns has a glyph, and a miss falls
								// back to the full aspect NAME. Never to initials or a slice:
								// an invented two-letter code in a one-glyph cell reads as a
								// deliberate abbreviation, which is how `sesquiquadrate`
								// once shipped rendering as the literal text `ses`.
								const sym =
									aspectSymbol(name) ?? display(a, 'type', formatAspectName(a));
								const cls = ASPECT_CLASS[name] ?? 'aspect-other';
								const orb = formatNumber(this.effectiveLang(), a.orb, 1);
								return html`<td class=${`cell ${cls}`} title=${`${row.label} ${display(a, 'type', name)} ${col.label}${orb ? ` (${this.t('orb')} ${orb}°)` : ''}`}>
									<span class="asp">${sym}</span>
								</td>`;
							})}
							${bodies.slice(ri + 1, -1).map(() => html`<td class="empty"></td>`)}
						</tr>`;
					})}
				</tbody>
			</table>
		</div>`;
	}

	/**
	 * The angle marks, fanned so two of them never print over each other.
	 *
	 * @remarks
	 * Part of Fortune and the Vertex land wherever the chart puts them, and either
	 * can fall within a couple of degrees of an axis, which is close enough for two
	 * three-letter labels on one ring to become a single unreadable mash. They go
	 * through the same {@link fanOut} the bodies do, so a crowded label steps
	 * aside while its TICK stays at the true longitude and a leader joins the two.
	 * The ring has about fourteen user units of margin left inside the viewBox, so
	 * a crowded label cannot be pushed outward; it moves along the ring instead.
	 */
	private renderAngles() {
		const asc = this.getAscendant();
		const mc = this.getMidheaven();
		// ASC/DESC and MC/IC are exact axes; DESC and IC are the opposite points.
		const marks: Array<{ longitude: number; label: string }> = [
			{ longitude: asc, label: 'ASC' },
			{ longitude: oppositePoint(asc), label: 'DSC' },
		];
		if (mc !== null) {
			marks.push({ longitude: mc, label: 'MC' });
			marks.push({ longitude: oppositePoint(mc), label: 'IC' });
		}
		const pof = this.data?.partOfFortune?.longitude;
		if (typeof pof === 'number') {
			marks.push({ longitude: normalizeLongitude(pof), label: 'PoF' });
		}
		const vertex = this.data?.vertex?.longitude;
		if (typeof vertex === 'number') {
			marks.push({ longitude: normalizeLongitude(vertex), label: 'Vtx' });
		}
		return fanOut(
			marks,
			(m) => m.longitude,
			arcSeparation(ANGLE_LABEL_WIDTH, ANGLE_LABEL_R),
		).map(({ item, longitude, displayLongitude }) =>
			this.renderAngleMark(longitude, displayLongitude, item.label),
		);
	}

	private renderAngleMark(
		longitude: number,
		displayLongitude: number,
		label: string,
	) {
		// The tick is the claim about position, so it stays at the true longitude;
		// the label is only a name for it and may step aside. A leader appears only
		// when the two part company, so an uncrowded chart draws exactly what it
		// drew before.
		const angle = this.toAngle(longitude);
		const labelAngle = this.toAngle(displayLongitude);
		const tickInner = polarToCartesian(CENTER, CENTER, OUTER_R, angle);
		const tickOuter = polarToCartesian(CENTER, CENTER, ANGLE_TICK_R, angle);
		const labelPos = polarToCartesian(
			CENTER,
			CENTER,
			ANGLE_LABEL_R,
			labelAngle,
		);
		const moved = Math.abs(displayLongitude - longitude) > 0.5;
		const leaderEnd = polarToCartesian(
			CENTER,
			CENTER,
			ANGLE_LABEL_R - 8,
			labelAngle,
		);
		return svg`
			<g>
				<line class="angle-tick" x1=${tickInner.x} y1=${tickInner.y} x2=${tickOuter.x} y2=${tickOuter.y} />
				${
					moved
						? svg`<line class="angle-tick" x1=${tickOuter.x} y1=${tickOuter.y} x2=${leaderEnd.x} y2=${leaderEnd.y} />`
						: nothing
				}
				<text class="angle-marker" x=${labelPos.x} y=${labelPos.y} text-anchor="middle" dominant-baseline="central">${label}</text>
			</g>
		`;
	}

	private renderSpokes() {
		// Draw a spoke at each real house cusp longitude so Placidus / Koch
		// unequal houses render correctly. Fall back to 12 equal spokes from the
		// Ascendant only when the response carries no houses array, which the
		// accessible name and the legend caveat both declare.
		const houses = this.data?.houses ?? [];
		const cuspLongitudes = this.hasCusps
			? houses.map((h) => h.longitude)
			: Array.from({ length: 12 }, (_, i) => this.getAscendant() + i * 30);
		return cuspLongitudes.map((lon) => {
			const angle = this.toAngle(lon);
			const start = polarToCartesian(CENTER, CENTER, HOUSE_R, angle);
			const end = polarToCartesian(CENTER, CENTER, OUTER_R, angle);
			return svg`<line class="wheel-line" x1=${start.x} y1=${start.y} x2=${end.x} y2=${end.y} stroke-width="0.8" />`;
		});
	}

	private renderSigns() {
		return SIGNS_ORDER.map((sign, i) => {
			const angle = this.toAngle(i * 30 + 15);
			const pos = polarToCartesian(CENTER, CENTER, SIGN_R, angle);
			return svg`<text class="sign-glyph" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central">${signGlyph(sign) ?? ''}</text>`;
		});
	}

	private renderHouseNumbers() {
		const houses = this.data?.houses ?? [];
		// Place each house number at the angular midpoint between its cusp and
		// the next, so the label sits inside the house even when houses are
		// unequal. Fall back to equal 30-degree sectors when houses are absent.
		if (this.hasCusps) {
			return houses.map((house, i) => {
				const next = houses[(i + 1) % 12];
				const mid = arcMidpoint(
					house.longitude,
					next ? next.longitude : house.longitude + 30,
				);
				const pos = polarToCartesian(
					CENTER,
					CENTER,
					HOUSE_R - 12,
					this.toAngle(mid),
				);
				return svg`<text class="house-num" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central">${house.number}</text>`;
			});
		}
		const ascSignIndex = Math.floor(this.getAscendant() / 30);
		return Array.from({ length: 12 }, (_, i) => {
			const angle = this.toAngle(i * 30 + 15);
			const pos = polarToCartesian(CENTER, CENTER, HOUSE_R - 12, angle);
			const houseNum = ((i - ascSignIndex + 12) % 12) + 1;
			return svg`<text class="house-num" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central">${houseNum}</text>`;
		});
	}

	/**
	 * Degree ticks on the outer zodiac band: a short mark every 5 degrees and a
	 * longer one on each 30-degree sign cusp, so the wheel reads like a
	 * reference-grade chart rather than a bare ring of glyphs.
	 */
	private renderTicks() {
		const ticks = [];
		for (let deg = 0; deg < 360; deg += 5) {
			const angle = this.toAngle(deg);
			const isMajor = deg % 30 === 0;
			const inner = isMajor ? SIGN_R - 14 : OUTER_R - 5;
			const a = polarToCartesian(CENTER, CENTER, inner, angle);
			const b = polarToCartesian(CENTER, CENTER, OUTER_R, angle);
			ticks.push(
				svg`<line class=${isMajor ? 'tick tick-major' : 'tick'} x1=${a.x} y1=${a.y} x2=${b.x} y2=${b.y} stroke-width=${isMajor ? 1 : 0.5} />`,
			);
		}
		return ticks;
	}

	/**
	 * Degree-and-minute label printed next to each house cusp on the wheel, so
	 * the exact cusp position is readable without leaving the chart.
	 */
	private renderCuspDegrees() {
		const houses = this.data?.houses ?? [];
		if (!this.hasCusps) return nothing;
		return houses.map((house) => {
			const angle = this.toAngle(house.longitude);
			const pos = polarToCartesian(CENTER, CENTER, HOUSE_R + 9, angle);
			const sp = longitudeToSignPosition(house.longitude);
			return svg`<text class="cusp-deg" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central">${sp.degree}°${String(sp.minute).padStart(2, '0')}'</text>`;
		});
	}

	/**
	 * The bodies, fanned so a stellium stays readable.
	 *
	 * @remarks
	 * Conjunctions inside a few degrees are the norm rather than the exception, so
	 * every glyph is pushed forward only as far as it takes to clear its neighbour
	 * and a leader runs back to the body's TRUE longitude on the rim. The
	 * separation is derived from the radius each mark is drawn at rather than
	 * fixed, so the degree label, which sits on a tighter ring than the glyph and
	 * is the wider of the two, is what decides the spacing.
	 */
	private renderPlanets(planets: PlanetEntry[]) {
		const separation = Math.max(
			arcSeparation(GLYPH_WIDTH, PLANET_R),
			arcSeparation(DEG_LABEL_WIDTH, PLANET_R - 13),
		);
		return fanOut(planets, (p) => p.longitude, separation).map((placed) => {
			const {
				item: p,
				longitude: trueLon,
				displayLongitude: displayLon,
			} = placed;
			const trueAngle = this.toAngle(trueLon);
			const displayAngle = this.toAngle(displayLon);
			const glyphPos = polarToCartesian(CENTER, CENTER, PLANET_R, displayAngle);
			const degPos = polarToCartesian(
				CENTER,
				CENTER,
				PLANET_R - 13,
				displayAngle,
			);
			const rimPos = polarToCartesian(CENTER, CENTER, OUTER_R - 4, trueAngle);
			const leaderInner = polarToCartesian(
				CENTER,
				CENTER,
				PLANET_R + 8,
				displayAngle,
			);
			// The glyph is looked up on the canonical English name and its fallback is
			// the localized one, because the fallback is TEXT the reader is left with.
			const label = display(p, 'name');
			const glyph = planetGlyph(p.name) ?? label;
			const sp = longitudeToSignPosition(p.longitude);
			const retro = p.isRetrograde === true;
			const degLabel = `${sp.degree}°${String(sp.minute).padStart(2, '0')}'`;
			const offset = Math.abs(displayLon - trueLon) > 0.5;
			return svg`<g>
				${
					offset
						? svg`<line class="planet-leader" x1=${rimPos.x} y1=${rimPos.y} x2=${leaderInner.x} y2=${leaderInner.y} />`
						: nothing
				}
				<text class="planet-glyph" x=${glyphPos.x} y=${glyphPos.y} text-anchor="middle" dominant-baseline="central"><title>${label}${retro ? ` ${this.t('retrograde')}` : ''} - ${degLabel} ${display(p, 'sign')}</title>${glyph}</text>
				<text class="planet-deg" x=${degPos.x} y=${degPos.y} text-anchor="middle" dominant-baseline="central">${degLabel}${retro ? svg`<tspan class="retro"> ℞</tspan>` : nothing}</text>
			</g>`;
		});
	}

	private renderDetails() {
		const summary = this.data?.summary;
		const ai = this.data?.aspectsInterpretation;
		if (!summary && !ai) return nothing;

		// Pairs, not names: the glyph beside each retrograde body is looked up on the
		// English value while the pill prints the localized one, and the two arrays
		// the API returns are index-aligned, which is what makes that possible.
		const retrogrades = displayList(summary, 'retrogradePlanets');

		return html`<div class="details" part="details">
			${
				summary?.dominantElement || summary?.dominantModality
					? html`<div class="pill-row">
						${summary.dominantElement ? html`<span class="pill">${this.t('Dominant element')}: ${display(summary, 'dominantElement')}</span>` : nothing}
						${summary.dominantModality ? html`<span class="pill">${this.t('Dominant modality')}: ${display(summary, 'dominantModality')}</span>` : nothing}
					</div>`
					: nothing
			}
			${
				ai
					? html`<div class="pill-row">
						<span class="pill pill--success">${this.t('Harmonious')} ${ai.harmonious}</span>
						<span class="pill pill--danger">${this.t('Challenging')} ${ai.challenging}</span>
						<span class="pill pill--muted">${this.t('Neutral')} ${ai.neutral}</span>
					</div>`
					: nothing
			}
			${
				retrogrades.length > 0
					? html`<div class="pill-row">
						${retrogrades.map(({ value, label }) => {
							// `?? ''` and never a slice: the full name is printed right
							// beside the glyph, so a miss must drop the glyph, not invent
							// one. This is the site that shipped `No North Node R`,
							// `So South Node R` and `Bl Black Moon Lilith` on a live chart.
							const glyph = planetGlyph(value) ?? '';
							return html`<span class="pill pill--muted">${glyph} ${label} R</span>`;
						})}
					</div>`
					: nothing
			}
			${
				// Prose about the aspect balance, not the balance itself: the counts
				// above it are the data and stay.
				ai?.summary && !this.hideReadings
					? html`<p class="summary">${ai.summary}</p>`
					: nothing
			}
			${this.renderElementModalityGrid()}
		</div>`;
	}

	/**
	 * Element by modality grid: the 4x3 cross-tab astrologers read for chart balance. Each body is placed by its sign into one cell (Fire/Earth/Air/Water row, Cardinal/Fixed/Mutable column).
	 *
	 * @remarks
	 * The cells are derived from the planet signs, not read from `summary.elementDistribution`, because a 1D distribution cannot fill a cross-tab. That makes the body set the reconciliation risk: the API counts every body it returns (nodes, Chiron, and Black Moon Lilith included), so the grid must too, or the totals here would contradict the dominant-element pill rendered right above it. Hence the totals count placed bodies rather than `planets.length` (an unrecognized sign would otherwise inflate the grand total past the sum of its rows), the caption names the body set, and the dominant row and column are tinted from `summary` so the pill and the grid land on the same cell.
	 *
	 * **The seven headers are CHROME, not response vocabulary, and that is what licenses translating them.** The axes are the component's own 4x3 construction, so six of the seven have no field in the response to defer to and the seventh (the dominant pair) would otherwise have been the only translated word in the table. They therefore go through the chrome catalogue like every other heading here, and each catalogue value is pinned to what the API returns for `dominantElementLocalized` / `dominantModalityLocalized` so the tinted pill above the grid and the header on its row cannot read two different words for one element. `tests/i18n.test.ts` re-asserts that agreement on a render.
	 *
	 * **The English arrays stay, because they are the CELL KEYS.** `SIGNS_ORDER.indexOf` resolves each sign to an index and the modulo picks the bucket, so the array values are compared and keyed on, never read (lesson 31). Only the header text nodes move.
	 */
	private renderElementModalityGrid() {
		const planets = this.getPlanets();
		if (planets.length === 0) return nothing;
		const ELEMENTS = ['Fire', 'Earth', 'Air', 'Water'] as const;
		const MODALITIES = ['Cardinal', 'Fixed', 'Mutable'] as const;
		// Header text, keyed by the canonical bucket name. Written out as literal
		// `t()` calls rather than `this.t(el)` so the static scan in
		// `tests/i18n.test.ts` can see every one of them: a dynamic key is exactly
		// the shape that ships a string no catalogue carries.
		const ELEMENT_LABEL: Record<string, string> = {
			Fire: this.t('Fire'),
			Earth: this.t('Earth'),
			Air: this.t('Air'),
			Water: this.t('Water'),
		};
		// The column is three glyphs wide, so it shows an abbreviation the
		// CATALOGUE supplies and carries the full word as its `title`. Never a
		// substring of the translated word: `slice(0, 3)` counts UTF-16 units with
		// no idea where the word ends, so Spanish read `Fij` and Devanagari split a
		// matra off its consonant. `tokens.test.ts` fails on any small slice now.
		const MODALITY_LABEL: Record<string, { abbr: string; full: string }> = {
			Cardinal: { abbr: this.t('Car'), full: this.t('Cardinal') },
			Fixed: { abbr: this.t('Fix'), full: this.t('Fixed') },
			Mutable: { abbr: this.t('Mut'), full: this.t('Mutable') },
		};
		const order = SIGNS_ORDER as readonly string[];
		const summary = this.data?.summary;
		// English on both sides, on purpose. These three are lookups, not labels:
		// the dominant pair is COMPARED against the local element and modality
		// arrays and each sign is resolved to its index in SIGNS_ORDER, so reading
		// `dominantElementLocalized` or `signLocalized` here would match nothing on
		// a translated page and everything on an English one.
		const dominantEl = capitalize(summary?.dominantElement ?? '');
		const dominantMod = capitalize(summary?.dominantModality ?? '');

		const cells: Record<string, Record<string, string[]>> = {};
		for (const el of ELEMENTS)
			cells[el] = { Cardinal: [], Fixed: [], Mutable: [] };
		let placed = 0;
		for (const p of planets) {
			const idx = order.indexOf(capitalize(p.sign ?? ''));
			if (idx < 0) continue;
			const el = ELEMENTS[idx % 4];
			const mod = MODALITIES[idx % 3];
			// The cell shows the glyph alone, so a miss falls back to the full name:
			// wide and obviously wrong, rather than a plausible two-letter code.
			const glyph = planetGlyph(p.name) ?? display(p, 'name');
			cells[el]?.[mod]?.push(glyph);
			placed++;
		}
		if (placed === 0) return nothing;

		const colTotal = (m: string) =>
			ELEMENTS.reduce((s, el) => s + (cells[el]?.[m]?.length ?? 0), 0);

		// Same scroll box as the aspect grid beside it. A cell holds a joined list
		// of glyphs, so it is normally tiny, but a body with no glyph renders its
		// FULL name there by design, and the table has to carry that without
		// dragging the card out with it. `.grid-scroll` pairs `overflow-x: auto`
		// with `min-width: 0`, and it is the `min-width` half that actually lets a
		// grid item scroll instead of growing to fit.
		return html`<div class="grid-scroll">
			<table
				class="em-grid"
				part="table element-modality"
				aria-label=${this.t('Element and modality distribution')}
			>
			<caption>
				${this.t('All {{count}} bodies in the chart, placed by sign', { count: placed })}
			</caption>
			<thead>
				<tr>
					<th></th>
					${MODALITIES.map(
						(m) =>
							html`<th scope="col" title=${MODALITY_LABEL[m]?.full ?? m} class=${m === dominantMod ? 'dominant' : ''}>${MODALITY_LABEL[m]?.abbr ?? m}</th>`,
					)}
					<th scope="col">${this.t('Total')}</th>
				</tr>
			</thead>
			<tbody>
				${ELEMENTS.map((el) => {
					const isDomRow = el === dominantEl;
					const rowTotal = MODALITIES.reduce(
						(s, m) => s + (cells[el]?.[m]?.length ?? 0),
						0,
					);
					return html`<tr>
						<th scope="row" class=${isDomRow ? 'dominant' : ''}>${ELEMENT_LABEL[el] ?? el}</th>
						${MODALITIES.map(
							(m) =>
								html`<td class=${isDomRow || m === dominantMod ? 'dominant' : ''}>${(cells[el]?.[m] ?? []).join(' ')}</td>`,
						)}
						<td class=${isDomRow ? 'em-total dominant' : 'em-total'}>${rowTotal}</td>
					</tr>`;
				})}
				<tr>
					<th scope="row">${this.t('Total')}</th>
					${MODALITIES.map(
						(m) =>
							html`<td class=${m === dominantMod ? 'em-total dominant' : 'em-total'}>${colTotal(m)}</td>`,
					)}
					<td class="em-total">${placed}</td>
				</tr>
				</tbody>
			</table>
		</div>`;
	}

	/**
	 * Detected multi-planet configurations. Each card names the figure, tags the element or modality it pivots on, flags a dissociate (out-of-sign) figure, and puts the apex planet first with its own chip, because the apex is the point the whole configuration discharges through.
	 *
	 * @remarks
	 * A pattern carries no localized partner for its `name`, `element`, `modality` or its `planets` list, so all four render English on every page. Do NOT translate the chips by looking each body up in `planets[].nameLocalized`: the response is the authority for its own vocabulary, and a second translation of the same fact assembled here is exactly what can end up disagreeing with the wheel beside it.
	 *
	 * **This block is DATA, so `hide-readings` thins it rather than removing it, and that split is deliberate.** A T-Square is a geometric fact about where the bodies sit, exactly like the aspect rows and the house cusps: the figure, its element and modality, its tightness and its planets are all measurements, and the only reading in the card is the paragraph, which {@link RoxyNatalChart.renderPattern} already drops. The line is the one the library states everywhere else and the one the docs promise: "wheels, maps, tables, grids, legends, badges and every number stay, the interpretive prose goes". `<roxy-aspects-table>` renders this identical `patterns` payload and makes the identical cut, so gating the whole block here would make the same figure appear and disappear depending on which component a page reached for.
	 *
	 * **A page that wants the block gone entirely has a lever, and it is not this flag.** The section carries `part="section patterns"`, so `roxy-natal-chart::part(patterns) { display: none }` removes it. That is the documented answer for dropping a block of DATA, the same way `::part(readings)` styles the interpretation; `hide-readings` is the answer for prose, and stretching it to cover measurements would leave a practitioner with no way to publish the figures without the words.
	 */
	private renderPatterns() {
		const patterns = this.data?.patterns ?? [];
		if (patterns.length === 0) return nothing;
		const sorted = [...patterns].sort(
			(a, b) =>
				(PATTERN_ORDER[a.kind] ?? 9) - (PATTERN_ORDER[b.kind] ?? 9) ||
				(b.tightness ?? 0) - (a.tightness ?? 0),
		);
		return html`<section class="block" part="section patterns">
			<h3>${this.t('Chart patterns')}</h3>
			${sorted.map((p) => this.renderPattern(p))}
		</section>`;
	}

	private renderPattern(p: PatternEntry) {
		const planets = p.planets ?? [];
		// Apex first: the spec already orders it first for Kite, T-Square, and Yod,
		// but sorting here keeps the chip row honest for any future pattern kind.
		const ordered = p.apex
			? [...planets].sort((a, b) => Number(b === p.apex) - Number(a === p.apex))
			: planets;
		return html`<div class="pattern" part="pattern">
			<div class="pattern-head">
				<span class="pattern-name">${p.name}</span>
				${p.element ? html`<span class="pattern-tag">${p.element}</span>` : nothing}
				${p.modality ? html`<span class="pattern-tag">${p.modality}</span>` : nothing}
				${
					p.dissociate
						? html`<span class="pattern-tag" title=${this.t('Out of sign: one or more planets sit outside the pattern element or modality, so the theme holds but runs weaker.')}>${this.t('Dissociate')}</span>`
						: nothing
				}
				${
					// Math.round, not formatNumber(this.effectiveLang(), x, 0): that helper strips trailing
					// zeros, so a 100% tight pattern renders as "1%".
					typeof p.tightness === 'number'
						? html`<span class="pattern-tight">${this.t('{{percent}} tight', { percent: formatPercent(this.effectiveLang(), p.tightness, 0) })}</span>`
						: nothing
				}
			</div>
			<div class="pattern-planets">
				${ordered.map((name) => {
					const glyph = planetGlyph(name);
					const isApex = Boolean(p.apex) && name === p.apex;
					return html`<span class=${isApex ? 'planet-chip apex' : 'planet-chip'}>
						${glyph ? html`<span aria-hidden="true">${glyph}</span>` : nothing}${name}${isApex ? html`<span class="apex-tag">${this.t('apex')}</span>` : nothing}
					</span>`;
				})}
			</div>
			${
				// The figure, its planets and its tightness are the finding; the
				// paragraph is the reading of it.
				p.interpretation && !this.hideReadings
					? html`<p class="pattern-interp">${p.interpretation}</p>`
					: nothing
			}
		</div>`;
	}

	private renderInterpretations() {
		const sections: InterpSection[] = this.getPlanets()
			.filter((p) => p.interpretation)
			.map((p) => {
				const interp = p.interpretation!;
				const glyph = planetGlyph(p.name) ?? '';
				const deg = formatNumber(this.effectiveLang(), p.degree ?? 0, 1);
				const label = display(p, 'name');
				const lead = interp.summary || interp.detailed || '';
				// `detailed` only becomes a second paragraph when `summary` already
				// took the lead line, so a response carrying one or the other never
				// prints the same prose twice.
				const detail = interp.summary ? interp.detailed : undefined;
				return {
					label: `${glyph} ${label}`.trim(),
					aside: [display(p, 'sign'), deg].filter(Boolean).join(' '),
					body: lead,
					extra: html`${detail ? html`<p>${detail}</p>` : nothing}
					${
						interp.keywords?.length
							? html`<div class="interp-keywords">${interp.keywords.map((k) => html`<span class="kw">${k}</span>`)}</div>`
							: nothing
					}`,
				};
			});
		return this.renderInterpretation(
			sections,
			'natal-planet-readings',
			this.t('Planet readings'),
		);
	}

	private renderAspects(planets: PlanetEntry[], aspects: AspectEntry[]) {
		// Keyed on the canonical English name at BOTH ends, because this map is how
		// an aspect finds the two longitudes its line is drawn between. The localized
		// names go in the `<title>` and nowhere near the key.
		const planetMap = new Map<string, number>();
		for (const p of planets) {
			if (typeof p.longitude !== 'number') continue;
			const name = lookupKey(p.name);
			if (name) planetMap.set(name, p.longitude);
		}
		return aspects.map((a) => {
			const l1 = planetMap.get(lookupKey(a.planet1));
			const l2 = planetMap.get(lookupKey(a.planet2));
			if (l1 === undefined || l2 === undefined) return nothing;
			const p1 = polarToCartesian(
				CENTER,
				CENTER,
				PLANET_R - 18,
				this.toAngle(l1),
			);
			const p2 = polarToCartesian(
				CENTER,
				CENTER,
				PLANET_R - 18,
				this.toAngle(l2),
			);
			const aspectName = normalizeAspect(a);
			const aspectClass = ASPECT_CLASS[aspectName] ?? 'aspect-other';
			const orbLabel = formatNumber(this.effectiveLang(), a.orb, 1);
			return svg`<line class=${`aspect ${aspectClass}`} x1=${p1.x} y1=${p1.y} x2=${p2.x} y2=${p2.y}><title>${display(a, 'planet1')} ${display(a, 'type', aspectName)} ${display(a, 'planet2')}${orbLabel ? ` (${this.t('orb')} ${orbLabel}°)` : ''}</title></line>`;
		});
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-natal-chart': RoxyNatalChart;
	}
}
