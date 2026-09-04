import { css, html, nothing, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { ChromeString } from '../i18n/chrome-strings.js';
import type {
	CalculateEntrancePadaResponse,
	GenerateMandalaResponse,
} from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { citationLine } from '../utils/citation.js';
import { formatInteger, formatNumber } from '../utils/format.js';
import { displayField, displayOption } from '../utils/localized.js';
import { humanize } from '../utils/string.js';

type VastuData = GenerateMandalaResponse | CalculateEntrancePadaResponse;
type Mandala = GenerateMandalaResponse;
type Entrance = CalculateEntrancePadaResponse;
type Cell = NonNullable<Mandala['cells']>[number];
type Citation = NonNullable<Mandala['sources']>[number];
type Point = { x?: number; y?: number };

/**
 * The four sides of the plot, in the order they are drawn around the grid.
 *
 * @remarks
 * The words come from the published field-label payload rather than from the chrome catalogue: the
 * eight compass sectors are already a request enum the API names in every language, so reading them
 * is what stops a Vastu edge and a form field disagreeing about the word for north.
 */
const SIDES = ['North', 'East', 'South', 'West'] as const;

/**
 * What each ring of the mandala is called.
 *
 * @remarks
 * The four values the 81 pada grid uses, closed, with no localized partner on the response, so these
 * are words the component writes. Typed `ChromeString`, which is what keeps a dynamic lookup
 * catalogued. **The centre is `center` and not `brahma`**: the 64 pada division carries a different
 * structural vocabulary in `role`, and a table keyed on the wrong one of the two resolves nothing
 * while looking exactly like a table that works. That division names no devatas, so its roles fall
 * back to the humanized wire value until a reader asks for them in their own language.
 */
const RING_LABEL: Record<string, ChromeString> = {
	perimeter: 'Perimeter',
	innerRing: 'Inner ring',
	innerCorner: 'Inner corner',
	center: 'Center',
};

/**
 * How the stated effect of an entrance pada reads. Three values, closed, no localized partner.
 *
 * @remarks
 * A gain and a harm take the pair the library already carries for that verdict rather than a second
 * word for the same thing: seven catalogues would otherwise hold two entries a translator would
 * render identically, which is how one concept comes to be spelled two ways.
 */
const VERDICT_LABEL: Record<string, ChromeString> = {
	auspicious: 'Favourable',
	inauspicious: 'Unfavourable',
	mixed: 'Mixed',
};

/**
 * Margin around the grid, in pada units.
 *
 * @remarks
 * Half a stroke, so the outermost squares and a door drawn on the edge keep their whole outline. The
 * compass words sit outside the drawing rather than inside this margin, because SVG text is measured
 * in USER units: a word inside the viewBox shrinks with the plate and reaches about six CSS pixels on
 * a phone, and a longer word in another language runs into the grid at every width.
 */
const MARGIN = 0.04;

/**
 * Longest devata name a square draws at its natural width.
 *
 * @remarks
 * `textLength` SETS a width rather than capping one, so applying it to every label stretches the
 * short names across their squares and letter-spaces a three letter name into something nobody reads
 * as a word. It is applied only past the point where a name would otherwise leave its square, which
 * at this font size is around eight characters; under that the text is drawn as it is.
 */
const FIT_ABOVE = 8;

/** Width a squeezed label is compressed into, in pada units: the square minus its padding. */
const LABEL_WIDTH = 0.88;

/** The grid as a coordinate system: how many padas a side, and how plot coordinates map onto it. */
interface PadaGrid {
	/** Padas along one edge: nine on the Paramasayika, eight on the Manduka. */
	size: number;
	/** Plot coordinate of the western edge, and the width of one pada. */
	originX: number;
	cellW: number;
	/** Plot coordinate of the southern edge, and the depth of one pada. */
	originY: number;
	cellH: number;
}

/** True for the projection payload, which is the one carrying every square. */
function isMandala(d: VastuData): d is Mandala {
	return 'cells' in d;
}

/**
 * The grid a mandala response was projected on, read off the square centres it returned.
 *
 * @remarks
 * The centres are the only thing that ties the drawing to the plot, and they are on a regular
 * lattice over the plot bounding box even where the outline is irregular, which is what
 * `withinPlot` exists to mark. Deriving the lattice from them rather than from the requested
 * dimensions is what lets the brahmasthan polygon and the vamsa lines, both of which arrive in plot
 * coordinates, be drawn on the same grid as the squares.
 */
function gridFromCells(cells: readonly Cell[]): PadaGrid | undefined {
	const xs = cells
		.map((c) => c.center?.x)
		.filter((n): n is number => n != null);
	const ys = cells
		.map((c) => c.center?.y)
		.filter((n): n is number => n != null);
	const size = Math.max(
		0,
		...cells.map((c) => c.rowFromNorth ?? 0),
		...cells.map((c) => c.columnFromWest ?? 0),
	);
	if (size < 2 || xs.length === 0 || ys.length === 0) return undefined;
	const cellW = (Math.max(...xs) - Math.min(...xs)) / (size - 1);
	const cellH = (Math.max(...ys) - Math.min(...ys)) / (size - 1);
	if (!(cellW > 0) || !(cellH > 0)) return undefined;
	return {
		size,
		cellW,
		cellH,
		originX: Math.min(...xs) - cellW / 2,
		originY: Math.min(...ys) - cellH / 2,
	};
}

/** A plot coordinate in pada units, with the y axis flipped so north is the top of the drawing. */
function toPada(g: PadaGrid, p: Point | undefined): [number, number] {
	const u = ((p?.x ?? 0) - g.originX) / g.cellW;
	const v = g.size - ((p?.y ?? 0) - g.originY) / g.cellH;
	return [round(u), round(v)];
}

/** Three decimals is under a hundredth of a pada, and it keeps the emitted path readable. */
function round(n: number): number {
	return Math.round(n * 1000) / 1000;
}

/**
 * Vastu Purusha Mandala. Pass `data` from POST /vastu/mandala, or set `mode="entrance"` and pass
 * POST /vastu/entrance.
 *
 * @remarks
 * **North is the top of the drawing and west is the left, and the four edges say so.** The response
 * numbers every square by its row from the north and its column from the west, so a drawing on any
 * other orientation would contradict the field names a developer reads beside it. The edge labels
 * are there because a reader arrives holding a plate drawn some other way round, and a grid that
 * does not name its own orientation cannot be laid over a site plan.
 *
 * **Everything drawn comes from the response, including the geometry.** The square centres, the
 * brahmasthan corners and the vamsa endpoints all arrive in plot coordinates, so the lattice is read
 * off the centres and the other two are mapped onto it. Recomputing any of them here would put a
 * second implementation of the projection in front of the one the verses were read into.
 *
 * **A square whose centre falls outside an irregular plot is drawn and marked, never dropped.** The
 * mandala is projected over the whole bounding box; a missing corner is a fact about the ground
 * rather than a gap in the grid, and deleting those squares would silently renumber nothing while
 * making the plate unreadable against the plan.
 *
 * **The entrance read draws the same grid with the door square lit, and nothing else on it.** That
 * response names the door square and no other, so the favourable padas it also returns are listed as
 * numbers rather than placed: siting them would mean reimplementing the pada to square mapping the
 * chapter fixes, and a second implementation of that is exactly what a reader is checking us against.
 * `mode` says which read was asked for and the shape check narrows under it, so a page that asked
 * for the projection never grows a door its endpoint did not return.
 *
 * `hide-readings` keeps the whole grid, the devatas, the brahmasthan, the vamsa lines, the crossing
 * points, the door square, its pada number and its citation. The verse effect and the composed
 * verdict sentence go.
 */
@customElement('roxy-vastu-mandala')
export class RoxyVastuMandala extends RoxyDataElement<VastuData> {
	static styles = [
		baseStyles,
		css`
			.card {
				background: var(--roxy-surface, #fff);
				color: var(--roxy-fg, #0a0a0a);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				/* Never an implicit auto column: it floors at min-content, so one long
				 * unbreakable string widens the track past the padded card. */
				grid-template-columns: minmax(0, 1fr);
				gap: var(--roxy-space-md, 1rem);
			}

			.head {
				display: flex;
				align-items: baseline;
				flex-wrap: wrap;
				gap: 0.35rem var(--roxy-space-md, 1rem);
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				letter-spacing: var(--roxy-tracking-tight);
			}
			.verdict {
				display: inline-block;
				padding: 0.1rem 0.4rem;
				border-radius: var(--roxy-radius-sm, 4px);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-fg, #0a0a0a);
				background: color-mix(in srgb, var(--roxy-info, #0284c7) 12%, var(--roxy-surface, #fff));
			}
			.verdict-auspicious {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 12%, var(--roxy-surface, #fff));
			}
			.verdict-inauspicious {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 12%, var(--roxy-surface, #fff));
			}

			/* The plate keeps a square cap like every other square drawing in the library,
			 * and the four compass words sit around it in HTML so they hold their size in
			 * CSS pixels whatever the plate is scaled to, in any language. */
			.frame {
				display: grid;
				grid-template-columns: auto minmax(0, 1fr) auto;
				grid-template-areas: '. n .' 'w plate e' '. s .';
				align-items: center;
				justify-items: center;
				gap: 0.15rem 0.25rem;
				max-width: var(--roxy-chart-max-width, 32rem);
				margin-inline: auto;
				width: 100%;
			}
			.compass {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				letter-spacing: 0.06em;
			}
			.compass-n {
				grid-area: n;
			}
			.compass-s {
				grid-area: s;
			}
			/* Upright the side words would cost the plate a word width on each edge, which
			 * is a quarter of a phone. Turned, each costs one line height. */
			.compass-w,
			.compass-e {
				writing-mode: vertical-rl;
			}
			.compass-w {
				grid-area: w;
				rotate: 180deg;
			}
			.compass-e {
				grid-area: e;
			}
			svg {
				grid-area: plate;
				width: 100%;
				height: auto;
				display: block;
			}
			.pada {
				fill: var(--roxy-surface, #fff);
				stroke: var(--roxy-border, #e4e4e7);
				stroke-width: 0.012;
			}
			/* The two divisions name their rings differently, so both vocabularies are
			 * painted: the class field on the 81 pada grid, the role field on the 64. */
			.pada-innerRing,
			.pada-innerCorner,
			.pada-around-brahma {
				fill: color-mix(in srgb, var(--roxy-accent, #f59e0b) 7%, var(--roxy-surface, #fff));
			}
			.pada-center,
			.pada-brahma {
				fill: color-mix(in srgb, var(--roxy-accent, #f59e0b) 16%, var(--roxy-surface, #fff));
			}
			.pada-outside {
				fill: color-mix(in srgb, var(--roxy-muted, #71717a) 18%, var(--roxy-surface, #fff));
			}
			.pada-door {
				fill: color-mix(in srgb, var(--roxy-success, #16a34a) 26%, var(--roxy-surface, #fff));
				stroke: var(--roxy-fg, #0a0a0a);
				stroke-width: 0.03;
			}
			.brahmasthan {
				fill: none;
				stroke: var(--roxy-accent-ink, #b45309);
				stroke-width: 0.05;
			}
			.vamsa {
				stroke: var(--roxy-secondary, #475569);
				stroke-width: 0.02;
				stroke-dasharray: 0.12 0.1;
			}
			.atimarma {
				fill: var(--roxy-accent-ink, #b45309);
			}
			text {
				fill: var(--roxy-fg, #0a0a0a);
				font-family: var(--roxy-font-sans, system-ui, sans-serif);
			}
			.devata {
				font-size: 0.19px;
				text-anchor: middle;
			}
			.square-no {
				font-size: 0.14px;
				text-anchor: middle;
				fill: var(--roxy-muted, #71717a);
			}
			/* A label is a fraction of a pada, so its size on screen is the plate over nine.
			 * Below this the name lands near four CSS pixels, which is texture and not text,
			 * so the square carries its NUMBER at a readable size and the list under the
			 * plate is where the names are read. Every value stays on the card either way. */
			@container (max-width: 30rem) {
				.devata {
					display: none;
				}
				.square-no {
					font-size: 0.34px;
					dominant-baseline: middle;
					transform: translateY(0.16px);
				}
			}

			.facts {
				display: flex;
				flex-wrap: wrap;
				gap: 0.35rem var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-secondary, #475569);
			}
			.lbl {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				font-weight: var(--roxy-weight-bold, 600);
				margin-right: 0.35rem;
			}
			.facts b {
				color: var(--roxy-fg, #0a0a0a);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.block-title {
				margin: 0 0 var(--roxy-space-sm, 0.5rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.devatas {
				margin: 0;
				padding: 0;
				list-style: none;
				display: flex;
				flex-wrap: wrap;
				gap: 0.2rem var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-secondary, #475569);
				font-variant-numeric: tabular-nums;
			}
			.devatas b {
				color: var(--roxy-fg, #0a0a0a);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.legend {
				display: flex;
				flex-wrap: wrap;
				gap: 0.35rem var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
			}
			.legend .swatch {
				display: inline-block;
				width: 10px;
				height: 10px;
				border-radius: 2px;
				margin-right: 4px;
				vertical-align: middle;
				border: 1px solid var(--roxy-border, #e4e4e7);
			}
			.swatch-brahma {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 16%, var(--roxy-surface, #fff));
			}
			.swatch-outside {
				background: color-mix(in srgb, var(--roxy-muted, #71717a) 18%, var(--roxy-surface, #fff));
			}
			.swatch-door {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 26%, var(--roxy-surface, #fff));
			}

			.effect {
				margin: 0;
				font-size: var(--roxy-text-base, 1rem);
				line-height: var(--roxy-leading-relaxed, 1.65);
			}
			.reading {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				line-height: var(--roxy-leading-relaxed, 1.65);
				color: var(--roxy-secondary, #475569);
			}
			.cites {
				margin: 0;
				padding: 0;
				list-style: none;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				line-height: var(--roxy-leading-normal, 1.5);
			}
		`,
	];

	/** Which read the response is: the projected grid, or the entrance pada on it. */
	@property({ type: String, reflect: true })
	mode: 'mandala' | 'entrance' = 'mandala';

	protected renderData(d: VastuData) {
		const locale = this.effectiveLang();
		const mandala = isMandala(d) ? d : undefined;
		const entrance = this.mode === 'entrance' && !isMandala(d) ? d : undefined;
		const grid = mandala
			? gridFromCells(mandala.cells ?? [])
			: unitGrid(d.conventions?.grid);
		return html`<article class="card" part="card" aria-labelledby="vastu-title">
			<header class="head" part="header">
				<h2 class="title" id="vastu-title">
					${entrance ? this.t('Entrance pada') : this.t('Vastu mandala')}
				</h2>
				${
					entrance?.auspiciousness
						? html`<span class=${`verdict verdict-${entrance.auspiciousness}`}
							>${this.verdictLabel(entrance.auspiciousness)}</span
						>`
						: nothing
				}
			</header>

			${this.renderGrid(locale, grid, mandala, entrance)}
			${this.renderLegend(entrance, mandala)}
			${this.renderDevatas(locale, mandala?.cells)}
			${this.renderFacts(locale, d, mandala, entrance)}
			${
				entrance?.effect && !this.hideReadings
					? html`<p class="effect" part="reading">${entrance.effect}</p>`
					: nothing
			}
			${
				entrance?.reading && !this.hideReadings
					? html`<p class="reading" part="reading">${entrance.reading}</p>`
					: nothing
			}
			${this.renderSources(mandala?.sources ?? (entrance?.source ? [entrance.source] : []))}
		</article>`;
	}

	/** The grid itself: every square, the brahmasthan, the vamsa lines and the door, north at the top. */
	private renderGrid(
		locale: string | undefined,
		grid: PadaGrid | undefined,
		mandala: Mandala | undefined,
		entrance: Entrance | undefined,
	) {
		if (!grid) return nothing;
		const n = grid.size;
		const box = `${-MARGIN} ${-MARGIN} ${n + MARGIN * 2} ${n + MARGIN * 2}`;
		return html`<div class="frame">
			${SIDES.map(
				(side) =>
					html`<span class=${`compass compass-${side[0]?.toLowerCase()}`}
						>${displayOption(locale, 'facing', side)}</span
					>`,
			)}
			<svg
				viewBox=${box}
				part="chart"
				role="img"
				aria-label=${this.t('Vastu grid, north at the top and west on the left')}
			>
				${(mandala?.cells ?? []).map((c) => this.renderCell(locale, c))}
				${entrance ? this.renderEmptyGrid(n) : nothing}
				${entrance ? this.renderDoor(locale, entrance) : nothing}
				${this.renderVamsa(grid, mandala?.vamsa)}
				${this.renderBrahmasthan(grid, mandala?.brahmasthan?.polygon)}
				${this.renderAtimarma(grid, mandala)}
			</svg>
		</div>`;
	}

	/** One square of the projection, placed by its own row and column. */
	private renderCell(locale: string | undefined, c: Cell) {
		const ring = c.class ?? c.role ?? '';
		const cls = [
			'pada',
			ring ? `pada-${ring}` : '',
			c.withinPlot === false ? 'pada-outside' : '',
		]
			.filter(Boolean)
			.join(' ');
		const name = c.devataName ?? '';
		return this.renderPada(
			locale,
			c.columnFromWest,
			c.rowFromNorth,
			cls,
			c.square,
			name,
			[name, this.ringLabel(ring)].filter(Boolean).join(' · '),
		);
	}

	/**
	 * One square: its fill, its number and the devata holding it.
	 *
	 * @remarks
	 * Shared by the projection and the entrance read so the two cannot draw the same square two
	 * different ways, which is the whole reason a reader can lay one card over the other.
	 */
	private renderPada(
		locale: string | undefined,
		column: number | undefined,
		rowFromNorth: number | undefined,
		cls: string,
		square: number | undefined,
		name: string,
		title: string,
	) {
		const col = (column ?? 1) - 1;
		const row = (rowFromNorth ?? 1) - 1;
		const squeeze = name.length > FIT_ABOVE;
		return svg`<g>
			<rect class=${cls} x=${col} y=${row} width="1" height="1">
				<title>${title}</title>
			</rect>
			<text class="square-no" x=${col + 0.5} y=${row + 0.34}>${formatInteger(locale, square)}</text>
			${
				name
					? svg`<text
						class="devata"
						x=${col + 0.5}
						y=${row + 0.68}
						textLength=${ifDefined(squeeze ? LABEL_WIDTH : undefined)}
						lengthAdjust=${ifDefined(squeeze ? 'spacingAndGlyphs' : undefined)}
						>${name}</text
					>`
					: nothing
			}
		</g>`;
	}

	/** The bare lattice, for the entrance read, which names one square and no others. */
	private renderEmptyGrid(n: number) {
		const cells = [];
		for (let row = 0; row < n; row++) {
			for (let col = 0; col < n; col++) {
				cells.push(
					svg`<rect class="pada" x=${col} y=${row} width="1" height="1"></rect>`,
				);
			}
		}
		return cells;
	}

	/** The square the main door falls on, lit and numbered with its pada. */
	private renderDoor(locale: string | undefined, entrance: Entrance) {
		const name = entrance.devata?.name ?? '';
		return this.renderPada(
			locale,
			entrance.cell?.columnFromWest,
			entrance.cell?.rowFromNorth,
			'pada pada-door',
			entrance.square,
			name,
			name,
		);
	}

	/** The six diagonals of 53.63, drawn from the endpoints the response gives in plot coordinates. */
	private renderVamsa(grid: PadaGrid, vamsa: Mandala['vamsa'] | undefined) {
		return (vamsa ?? []).map((line) => {
			const [x1, y1] = toPada(grid, line.from);
			const [x2, y2] = toPada(grid, line.to);
			return svg`<line class="vamsa" x1=${x1} y1=${y1} x2=${x2} y2=${y2}></line>`;
		});
	}

	/** The central block, drawn from the corners the response returns rather than from the square list. */
	private renderBrahmasthan(
		grid: PadaGrid,
		polygon: NonNullable<Mandala['brahmasthan']>['polygon'] | undefined,
	) {
		const corners = polygon ?? [];
		if (corners.length < 3) return nothing;
		const points = corners.map((p) => toPada(grid, p).join(',')).join(' ');
		return svg`<polygon class="brahmasthan" points=${points}></polygon>`;
	}

	/** Where the six diagonals cross, which the response names by square rather than by coordinate. */
	private renderAtimarma(grid: PadaGrid, mandala: Mandala | undefined) {
		const squares = new Set(mandala?.atimarma ?? []);
		if (squares.size === 0) return nothing;
		return (mandala?.cells ?? [])
			.filter((c) => c.square != null && squares.has(c.square))
			.map((c) => {
				const [x, y] = toPada(grid, c.center);
				return svg`<circle class="atimarma" cx=${x} cy=${y} r="0.06"></circle>`;
			});
	}

	/**
	 * Every devata on the projection, with the squares it holds.
	 *
	 * @remarks
	 * The names are the one thing a nine by nine plate cannot draw at a readable size on a phone, and a
	 * square title is unreachable on a touch screen, so they are listed once here at the card's own text
	 * size. Grouped by devata, because several hold more than one square and a reader looks a name up
	 * rather than reading eighty one rows; the squares inside a group ascend, so a number read off the
	 * plate is found here. The division that names no devatas renders no list.
	 */
	private renderDevatas(
		locale: string | undefined,
		cells: Mandala['cells'] | undefined,
	) {
		const held = new Map<string, number[]>();
		for (const c of cells ?? []) {
			if (!c.devataName || c.square == null) continue;
			held.set(c.devataName, [...(held.get(c.devataName) ?? []), c.square]);
		}
		if (held.size === 0) return nothing;
		return html`<section part="section devatas">
			<h3 class="block-title">${this.t('Devata')}</h3>
			<ul class="devatas">
				${[...held].map(
					([name, squares]) => html`<li>
						<b>${name}</b>
						${squares
							.sort((a, b) => a - b)
							.map((n) => formatInteger(locale, n))
							.join(', ')}
					</li>`,
				)}
			</ul>
		</section>`;
	}

	/**
	 * What the fills mean.
	 *
	 * @remarks
	 * The outside-the-plot key is drawn only when a square actually falls outside one, because a
	 * legend entry for a fill nothing on the drawing carries reads as a missing feature.
	 */
	private renderLegend(
		entrance: Entrance | undefined,
		mandala: Mandala | undefined,
	) {
		if (entrance) {
			return html`<div class="legend" part="legend">
				<span><span class="swatch swatch-door"></span>${this.t('Door pada')}</span>
			</div>`;
		}
		const hasOutside = (mandala?.cells ?? []).some(
			(c) => c.withinPlot === false,
		);
		return html`<div class="legend" part="legend">
			<span><span class="swatch swatch-brahma"></span>${this.t('Brahmasthan')}</span>
			${
				hasOutside
					? html`<span><span class="swatch swatch-outside"></span>${this.t('Outside the plot')}</span>`
					: nothing
			}
		</div>`;
	}

	/** The numbers a reader takes off the projection or the entrance read. */
	private renderFacts(
		locale: string | undefined,
		d: VastuData,
		mandala: Mandala | undefined,
		entrance: Entrance | undefined,
	) {
		const gridValue = d.conventions?.grid;
		return html`<div class="facts" part="details">
			${
				gridValue
					? html`<span
						><span class="lbl">${displayField(locale, 'grid')}</span
						><b>${displayOption(locale, 'grid', gridValue)}</b></span
					>`
					: nothing
			}
			${
				entrance?.pada != null
					? html`<span><span class="lbl">${this.t('Pada')}</span><b>${formatInteger(locale, entrance.pada)}</b></span>`
					: nothing
			}
			${
				entrance?.side
					? html`<span
						><span class="lbl">${this.t('Side')}</span
						><b>${displayOption(locale, 'facing', entrance.side)}</b></span
					>`
					: nothing
			}
			${
				entrance?.startCorner
					? html`<span
						><span class="lbl">${this.t('Counted from')}</span
						>${displayOption(locale, 'facing', entrance.startCorner)}
						${
							entrance.ordinalOnSide != null
								? html`· ${formatInteger(locale, entrance.ordinalOnSide)}`
								: nothing
						}</span
					>`
					: nothing
			}
			${
				entrance?.devata?.name
					? html`<span
						><span class="lbl">${this.t('Devata')}</span><b>${entrance.devata.name}</b>
						${
							entrance.devata.padaCount != null
								? html`· ${this.t('Pada')} ${formatInteger(locale, entrance.devata.padaCount)}`
								: nothing
						}</span
					>`
					: nothing
			}
			${
				entrance?.recommendedPadas?.length
					? html`<span
						><span class="lbl">${this.t('Recommended padas')}</span
						>${entrance.recommendedPadas.map((p) => formatInteger(locale, p)).join(', ')}</span
					>`
					: nothing
			}
			${
				mandala?.brahmasthan?.area != null
					? html`<span
						><span class="lbl">${this.t('Brahmasthan')}</span
						><b>${formatNumber(locale, mandala.brahmasthan.area, 2)}</b></span
					>`
					: nothing
			}
			${
				mandala?.marma?.areaEach != null
					? html`<span
						><span class="lbl">${this.t('Marma')}</span
						>${formatNumber(locale, mandala.marma.areaEach, 2)}</span
					>`
					: nothing
			}
			${
				mandala?.atimarma?.length
					? html`<span
						><span class="lbl">${this.t('Crossing points')}</span
						>${mandala.atimarma.map((s) => formatInteger(locale, s)).join(', ')}</span
					>`
					: nothing
			}
		</div>`;
	}

	/** Every verse the drawing rests on, or the convention where no verse states the rule. */
	private renderSources(sources: readonly Citation[]) {
		if (sources.length === 0) return nothing;
		return html`<section part="section sources">
			<ul class="cites">
				${sources.map((s) => html`<li>${citationLine(s)}</li>`)}
			</ul>
		</section>`;
	}

	/** The name of one ring, falling back to the wire id for a class the API might add. */
	private ringLabel(ring: string): string {
		const source = RING_LABEL[ring];
		return source ? this.t(source) : humanize(ring);
	}

	/** How the stated effect reads, falling back to the wire value. */
	private verdictLabel(verdict: string): string {
		const source = VERDICT_LABEL[verdict];
		return source ? this.t(source) : humanize(verdict);
	}
}

/**
 * A bare lattice for a response that carries no square centres, sized from the grid it names.
 *
 * @remarks
 * The entrance read returns one square and the division it was read on, so the drawing is in pada
 * units from the start and the plot mapping is the identity. Nothing here derives a square position
 * the response did not give.
 */
function unitGrid(grid: string | undefined): PadaGrid | undefined {
	const size = Number.parseInt(grid ?? '', 10);
	const side = Math.round(Math.sqrt(size));
	if (!Number.isFinite(side) || side < 2 || side * side !== size)
		return undefined;
	return { size: side, originX: 0, cellW: 1, originY: 0, cellH: 1 };
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-vastu-mandala': RoxyVastuMandala;
	}
}
