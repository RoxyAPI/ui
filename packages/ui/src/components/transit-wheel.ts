import { css, html, nothing, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PLANET_GLYPH, SIGN_GLYPH, SIGNS_ORDER } from '../tokens/index.js';
import type { CalculateTransitAspectsResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import {
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
	normalizeAspect,
} from '../utils/format.js';
import {
	type InterpSection,
	interpAccordionStyles,
} from '../utils/interp-accordion.js';
import { capitalize } from '../utils/string.js';

type Body = CalculateTransitAspectsResponse['transitPlanets'][number];
type TransitAspect = CalculateTransitAspectsResponse['aspects'][number];
type TransitSummary = CalculateTransitAspectsResponse['summary'];

/**
 * Radii, outermost first. Every one is explicit rather than derived from its
 * neighbour, because the two rings of glyphs and their two bands of degree
 * labels have to interleave without touching, and an offset-from-the-last-ring
 * scheme hides which pair is actually the tight one.
 */
const SIZE = 400;
const CENTER = SIZE / 2;
/** ASC/DSC label. Inside the rim by more than half the label width, or the axis text clips on the viewBox edge. */
const AXIS_LABEL_R = 184;
/** Outer rim of the zodiac band. */
const OUTER_R = 170;
/** Sign glyphs, and the inner edge of the band that holds them. */
const SIGN_R = 154;
const BAND_R = 140;
/** Transiting bodies: the OUTER ring, which is how a bi-wheel is read. Degree labels sit outward, into the free space under the sign band. */
const TRANSIT_R = 124;
const TRANSIT_DEG_R = 135;
/** Natal bodies: the INNER ring, the chart being transited. Degree labels sit inward, so the two bands of numbers never meet. */
const NATAL_R = 94;
const NATAL_DEG_R = 83;
/** Aspect lines run between the rings: out of the transit ring, in to the natal one. */
const TRANSIT_LINE_R = 112;
const NATAL_LINE_R = 104;
/** Innermost circle, closing the wheel under the natal degree labels. */
const HUB_R = 70;
/**
 * Widths a fanned cluster has to clear. The glyph is the wider mark but sits on
 * the larger radius, and the degree label is narrower on a smaller one, so which
 * of the two actually binds depends on the ring and neither can be assumed.
 */
const GLYPH_WIDTH = 13;
const DEG_LABEL_WIDTH = 15;
/** Leader line: a tick at the body's true longitude, and the foot of the line beside the displaced glyph. Both offsets are measured from the ring, signed so the leader always runs into the gap between the two rings. */
const LEADER_TICK = 8;
const LEADER_FOOT = 4;

/** Glyph for an API body name. `capitalize` folds "North Node" onto the map's "North node" key, which is how every chart in the library resolves the nodes and Black Moon Lilith. */
const glyphFor = (name: string): string =>
	PLANET_GLYPH[capitalize(name)] ?? name.slice(0, 2);

/** `12°34'` from a raw ecliptic longitude, the form a practitioner reads off a wheel. */
const degLabel = (longitude: number): string => {
	const sp = longitudeToSignPosition(longitude);
	return `${sp.degree}°${String(sp.minute).padStart(2, '0')}'`;
};

/**
 * Round a 0-100 score for display. Not `formatNumber(v, 0)`, which strips
 * trailing zeros from the formatted string and would render a strength of 100
 * as "1". Same local helper, and the same reason, as `roxy-aspects-table`.
 */
const score = (v: unknown): string =>
	typeof v === 'number' && Number.isFinite(v) ? String(Math.round(v)) : '';

/** Bodies keyed by their canonical name, so an aspect or a table row can find a longitude without rescanning the array. */
const byName = (list: Body[]): Map<string, Body> => {
	const m = new Map<string, Body>();
	for (const p of list) m.set(capitalize(p.name), p);
	return m;
};

/**
 * Natal and transit bi-wheel: the natal chart on the inner ring, the transiting
 * bodies on the outer ring, and a line for every transit-to-natal aspect the
 * response returns. Pass `data` from /astrology/transit-aspects.
 *
 * @remarks
 * **Nothing astrological is computed here.** Every aspect line is drawn from an
 * entry in the response `aspects` array; the only arithmetic is placing a
 * longitude on a circle. `planet1` is the TRANSITING body and `planet2` the
 * NATAL one, which was settled empirically rather than from the field
 * description because reading them the other way round still draws a
 * plausible-looking wheel: against a live response every one of the 70 returned
 * orbs reconciles with the transit-to-natal separation, and only 4 with the
 * reverse.
 *
 * **The wheel is sign-based, and that is a property of the response, not a
 * shortcut.** /astrology/transit-aspects returns no ascendant and no house-cusp
 * longitudes, so there is nothing to orient a house wheel to. It does carry a
 * `house` number per body, but that number comes back as `1` for every body on
 * every chart tested, so it is not a placement and is deliberately never
 * rendered: printing it would put twenty-eight bodies in the first house. The
 * default wheel fixes 0 degrees Aries on the left horizon, says so in the legend
 * and in the SVG description rather than leaving a reader to discover it, and
 * draws no house divisions at all. A host that already holds the ascendant (from
 * /astrology/natal-chart) can pass {@link RoxyTransitWheel.ascendant} to rotate
 * the same wheel onto the real horizon; that is a rotation of supplied data,
 * never a derived cusp, so no house sectors appear in that mode either.
 */
@customElement('roxy-transit-wheel')
export class RoxyTransitWheel extends RoxyDataElement<CalculateTransitAspectsResponse> {
	static styles = [
		baseStyles,
		disclosureStyles,
		interpAccordionStyles,
		css`
			.wrap {
				background: var(--roxy-surface, #fff);
				color: var(--roxy-fg, #0a0a0a);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				/* minmax(0, 1fr), not the implicit auto column. An auto grid column
				 * takes its MINIMUM from min-content, so a nowrap table wider than the
				 * card blows the column out and drags every sibling with it, clipped on
				 * the right. This is what lets the scroll box inside actually scroll. */
				grid-template-columns: minmax(0, 1fr);
				gap: var(--roxy-space-md, 1rem);
			}
			.head {
				display: flex;
				justify-content: space-between;
				align-items: baseline;
				gap: var(--roxy-space-md, 1rem);
				flex-wrap: wrap;
			}
			.title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
			}
			.subtitle {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
				margin: 0;
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
			.natal-glyph {
				fill: var(--roxy-accent-ink, #b45309);
				font-size: 13px;
				font-weight: 600;
				font-family: var(--roxy-font-sans);
			}
			.transit-glyph {
				fill: var(--roxy-info, #0284c7);
				font-size: 13px;
				font-weight: 600;
				font-family: var(--roxy-font-sans);
			}
			/* A leader ties a displaced glyph back to its true longitude. Thin and
			 * ring-coloured, and drawn in the gap between the rings, so it reads as
			 * part of its own ring rather than as another aspect line. */
			.leader {
				stroke: currentColor;
				stroke-width: 0.6;
				opacity: 0.6;
			}
			.leader.natal-glyph {
				stroke: var(--roxy-accent-ink, #b45309);
			}
			.leader.transit-glyph {
				stroke: var(--roxy-info, #0284c7);
			}
			.planet-deg {
				fill: var(--roxy-muted, #71717a);
				font-size: 7px;
				font-family: var(--roxy-font-sans);
			}
			.planet-deg .retro {
				fill: var(--roxy-danger, #dc2626);
			}
			/* Below 480px the card shrinks to roughly 320px on a phone, so lift the
			 * in-SVG type proportionally or the 7px degree band lands under 6px. */
			@container (max-width: 480px) {
				.sign-glyph,
				.natal-glyph,
				.transit-glyph {
					font-size: 18px;
				}
				.planet-deg {
					font-size: 10px;
				}
			}
			.tick {
				stroke: var(--roxy-border, #e4e4e7);
			}
			.tick-major {
				stroke: var(--roxy-secondary, #475569);
			}
			.axis-tick {
				stroke: var(--roxy-accent-ink, #b45309);
				stroke-width: 1.5;
			}
			.axis-label {
				fill: var(--roxy-accent-ink, #b45309);
				font-size: 10px;
				font-weight: 700;
				font-family: var(--roxy-font-sans);
				letter-spacing: 0.04em;
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

			.swatch {
				display: inline-block;
				width: 8px;
				height: 8px;
				border-radius: 50%;
				margin-right: 4px;
				vertical-align: middle;
			}
			.swatch--natal {
				background: var(--roxy-accent-ink, #b45309);
			}
			.swatch--transit {
				background: var(--roxy-info, #0284c7);
			}
			.swatch--harmonious {
				background: var(--roxy-success, #16a34a);
			}
			.swatch--challenging {
				background: var(--roxy-danger, #dc2626);
			}

			.legend {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-md, 1rem);
			}

			.summary-pills {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem);
				margin-bottom: var(--roxy-space-sm, 0.5rem);
			}
			.pill {
				display: inline-flex;
				align-items: center;
				gap: 4px;
				padding: 2px var(--roxy-space-sm, 0.5rem);
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
				border: 1px solid currentColor;
			}
			.pill--muted {
				color: var(--roxy-fg, #0a0a0a);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 60%, transparent);
			}
			.pill--success {
				color: var(--roxy-success-fg, #166534);
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 10%, transparent);
			}
			.pill--danger {
				color: var(--roxy-danger-fg, #991b1b);
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 10%, transparent);
			}

			.strongest {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				gap: 0.4rem;
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.strongest .label {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				font-weight: var(--roxy-weight-bold, 600);
			}
			.strongest .meta {
				margin-left: auto;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-variant-numeric: tabular-nums;
			}
			.glyph {
				font-size: 1.1em;
				line-height: 1;
			}
			.nature-badge {
				display: inline-block;
				padding: 1px 8px;
				border-radius: 9999px;
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: 600;
				text-transform: capitalize;
			}
			.nature-badge.harmonious {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 12%, transparent);
				color: var(--roxy-success-fg, #166534);
			}
			.nature-badge.challenging {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 12%, transparent);
				color: var(--roxy-danger-fg, #991b1b);
			}
			.nature-badge.neutral {
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 60%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}

			/* min-width: 0 so the scroll box can shrink below its content. A grid
			 * item defaults to min-width: auto and grows to fit instead of scrolling. */
			.scroll {
				overflow-x: auto;
				min-width: 0;
				-webkit-overflow-scrolling: touch;
			}
			table {
				width: 100%;
				border-collapse: collapse;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			th,
			td {
				padding: var(--roxy-space-sm, 0.5rem);
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
				text-align: left;
				white-space: nowrap;
			}
			thead th {
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				font-size: var(--roxy-text-xs, 0.75rem);
				letter-spacing: 0.06em;
			}
			th {
				font-weight: var(--roxy-weight-bold, 600);
			}
			td {
				font-variant-numeric: tabular-nums;
			}
			.retro-badge {
				color: var(--roxy-danger-fg, #991b1b);
				font-weight: var(--roxy-weight-bold, 600);
				margin-left: 0.25rem;
			}

			.interp-keywords {
				display: flex;
				flex-wrap: wrap;
				gap: 0.25rem;
			}
			.interp-keywords .kw {
				padding: 1px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
		`,
	];

	/** Heading above the wheel. */
	@property({ type: String })
	heading = 'Transits';

	/**
	 * Natal Ascendant as an ecliptic longitude in degrees (0-360), supplied by the
	 * page from a chart endpoint that returns one.
	 *
	 * @remarks
	 * /astrology/transit-aspects returns no ascendant, so this is the only way the
	 * wheel can sit on a real horizon. Setting it ROTATES the wheel so the given
	 * longitude falls on the left horizon and draws the ASC/DSC axis. Nothing else
	 * changes, and no house cusps are drawn, because none are available to draw.
	 * Leave it unset for the honest default: 0 degrees Aries on the left.
	 */
	@property({ type: Number })
	ascendant?: number;

	/** True when the page supplied a usable ascendant, so the wheel sits on a real horizon rather than the Aries default. */
	private get oriented(): boolean {
		return (
			typeof this.ascendant === 'number' && Number.isFinite(this.ascendant)
		);
	}

	/**
	 * Ecliptic longitude to SVG angle. 0 degrees is at 3 o'clock and positive
	 * angles run clockwise on screen, so subtracting the longitude makes the
	 * zodiac run counterclockwise, which is how a chart wheel is read. The 180
	 * offset puts the reference point on the left horizon: 0 Aries by default,
	 * the supplied Ascendant when there is one.
	 */
	private toAngle(longitude: number): number {
		return 180 + (this.oriented ? (this.ascendant as number) : 0) - longitude;
	}

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No transit data</div>`;
	}

	protected renderData(d: CalculateTransitAspectsResponse) {
		const natal = d.natalPlanets ?? [];
		const transit = d.transitPlanets ?? [];
		const aspects = d.aspects ?? [];
		const when = formatDateTime(d.transitDate);
		const count =
			aspects.length > 0
				? `${aspects.length} aspect${aspects.length === 1 ? '' : 's'} to the natal chart`
				: '';

		return html`<div class="wrap" part="card" aria-label="Natal and transit bi-wheel">
			<div class="head" part="header">
				<h2 class="title">${this.heading}</h2>
				${
					when || count
						? html`<p class="subtitle">${[when, count].filter(Boolean).join(' · ')}</p>`
						: nothing
				}
			</div>
			${this.renderWheel(natal, transit, aspects)}
			${this.renderLegend(natal, transit, aspects)}
			${this.renderSummary(d.summary)}
			${this.renderPositions(natal, transit)}
			${this.renderReadings(aspects)}
		</div>`;
	}

	private renderWheel(
		natal: Body[],
		transit: Body[],
		aspects: TransitAspect[],
	) {
		return html`<svg
			viewBox="0 0 ${SIZE} ${SIZE}"
			part="chart"
			role="img"
			aria-label="Bi-wheel with natal bodies on the inner ring and transiting bodies on the outer ring"
		>
			<title>Natal and transit bi-wheel</title>
			<desc>
				Twelve zodiac sign segments around a circular wheel. Natal bodies sit at
				their ecliptic longitudes on the inner ring and transiting bodies on the
				outer ring, and each line joins a transiting body to the natal body it
				aspects.
				${
					this.oriented
						? 'The Ascendant supplied by the page sits on the left horizon.'
						: 'Fixed zodiacal orientation, 0 degrees Aries on the left horizon. This response carries no Ascendant and no house cusps, so no houses are drawn.'
				}
			</desc>
			<circle class="wheel-line" cx=${CENTER} cy=${CENTER} r=${OUTER_R} stroke-width="1.5" />
			<circle class="wheel-line" cx=${CENTER} cy=${CENTER} r=${BAND_R} stroke-width="0.8" />
			<circle class="wheel-line" cx=${CENTER} cy=${CENTER} r=${TRANSIT_LINE_R} stroke-width="0.6" />
			<circle class="wheel-line" cx=${CENTER} cy=${CENTER} r=${HUB_R} stroke-width="0.5" />
			${this.renderTicks()} ${this.renderSpokes()} ${this.renderSigns()}
			${this.renderAspectLines(natal, transit, aspects)}
			${this.renderRing(natal, NATAL_R, NATAL_DEG_R, 'natal-glyph', 'natal', 1)}
			${this.renderRing(transit, TRANSIT_R, TRANSIT_DEG_R, 'transit-glyph', 'transiting', -1)}
			${this.renderAxis()}
		</svg>`;
	}

	/** A short mark every 5 degrees and a longer one on each sign cusp, so the band reads as a degree scale rather than a bare ring. */
	private renderTicks() {
		const ticks = [];
		for (let deg = 0; deg < 360; deg += 5) {
			const angle = this.toAngle(deg);
			const isMajor = deg % 30 === 0;
			const a = polarToCartesian(
				CENTER,
				CENTER,
				isMajor ? BAND_R : OUTER_R - 5,
				angle,
			);
			const b = polarToCartesian(CENTER, CENTER, OUTER_R, angle);
			ticks.push(
				svg`<line class=${isMajor ? 'tick tick-major' : 'tick'} x1=${a.x} y1=${a.y} x2=${b.x} y2=${b.y} stroke-width=${isMajor ? 1 : 0.5} />`,
			);
		}
		return ticks;
	}

	/** Twelve sign boundaries, drawn from the inner ring outward. Sign divisions, never house cusps: the response carries no cusp longitudes. */
	private renderSpokes() {
		return SIGNS_ORDER.map((_, i) => {
			const angle = this.toAngle(i * 30);
			const start = polarToCartesian(CENTER, CENTER, HUB_R, angle);
			const end = polarToCartesian(CENTER, CENTER, OUTER_R, angle);
			return svg`<line class="wheel-line" x1=${start.x} y1=${start.y} x2=${end.x} y2=${end.y} stroke-width="0.6" />`;
		});
	}

	private renderSigns() {
		return SIGNS_ORDER.map((sign, i) => {
			const pos = polarToCartesian(
				CENTER,
				CENTER,
				SIGN_R,
				this.toAngle(i * 30 + 15),
			);
			return svg`<text class="sign-glyph" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central">${SIGN_GLYPH[sign]}</text>`;
		});
	}

	/**
	 * One ring of bodies, fanned apart only as far as legibility demands.
	 *
	 * @remarks
	 * A real transit chart stacks four bodies inside a couple of degrees often
	 * enough that drawing every glyph at its exact angle makes the inner ring
	 * unreadable, degree labels printed over each other included. {@link fanOut}
	 * pushes a crowded member forward and a thin leader line runs from the glyph
	 * back to a tick at its TRUE longitude, so the drawing never claims a position
	 * the response did not give. The separation is derived from the radius, so the
	 * inner ring automatically asks for more degrees of arc than the outer one for
	 * the same glyph.
	 *
	 * `leaderSign` points that tick outward from the natal ring and inward from
	 * the transit ring, i.e. always into the gap between the two, so a leader is
	 * never mistaken for one of the aspect lines crossing the middle.
	 */
	private renderRing(
		bodies: Body[],
		radius: number,
		degRadius: number,
		cls: string,
		kind: string,
		leaderSign: 1 | -1,
	) {
		const separation = Math.max(
			arcSeparation(GLYPH_WIDTH, radius),
			arcSeparation(DEG_LABEL_WIDTH, degRadius),
		);
		return fanOut(bodies, (p) => p.longitude, separation).map(
			({ item: p, longitude, displayLongitude }) => {
				const angle = this.toAngle(displayLongitude);
				const pos = polarToCartesian(CENTER, CENTER, radius, angle);
				const degPos = polarToCartesian(CENTER, CENTER, degRadius, angle);
				const retro = p.isRetrograde === true;
				// Whole degrees on the wheel and the full degree-and-minute in the
				// tooltip and the positions table, matching `roxy-synastry-chart`, the
				// other two-ring wheel here. A `12°34'` label is roughly twice as wide as
				// `12°`, and on a ring this size two of them collide in a cluster the
				// fan-out has already separated the GLYPHS of, so the extra precision
				// costs the legibility of the position it is trying to state.
				const label = `${longitudeToSignPosition(longitude).degree}°`;
				const tooltip = `${kind} ${p.name}${retro ? ' retrograde' : ''} - ${degLabel(longitude)} ${p.sign ?? ''}`;
				const displaced = Math.abs(displayLongitude - longitude) > 0.5;
				const tick = polarToCartesian(
					CENTER,
					CENTER,
					radius + leaderSign * LEADER_TICK,
					this.toAngle(longitude),
				);
				const foot = polarToCartesian(
					CENTER,
					CENTER,
					radius + leaderSign * LEADER_FOOT,
					angle,
				);
				return svg`<g>
				${
					displaced
						? svg`<line class=${`leader ${cls}`} x1=${tick.x} y1=${tick.y} x2=${foot.x} y2=${foot.y} />`
						: nothing
				}
				<text class=${cls} x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central"><title>${tooltip}</title>${glyphFor(p.name)}</text>
				<text class="planet-deg" x=${degPos.x} y=${degPos.y} text-anchor="middle" dominant-baseline="central">${label}${retro ? svg`<tspan class="retro"> ℞</tspan>` : nothing}</text>
			</g>`;
			},
		);
	}

	/** One line per returned aspect, from the transiting body on the outer ring to the natal body on the inner one. */
	private renderAspectLines(
		natal: Body[],
		transit: Body[],
		aspects: TransitAspect[],
	) {
		const natalBy = byName(natal);
		const transitBy = byName(transit);
		return aspects.map((a) => {
			const t = transitBy.get(capitalize(a.planet1));
			const n = natalBy.get(capitalize(a.planet2));
			if (
				!t ||
				!n ||
				!Number.isFinite(t.longitude) ||
				!Number.isFinite(n.longitude)
			)
				return nothing;
			const from = polarToCartesian(
				CENTER,
				CENTER,
				TRANSIT_LINE_R,
				this.toAngle(t.longitude),
			);
			const to = polarToCartesian(
				CENTER,
				CENTER,
				NATAL_LINE_R,
				this.toAngle(n.longitude),
			);
			const name = normalizeAspect(a);
			const orb = formatNumber(a.orb, 1);
			return svg`<line class=${`aspect ${ASPECT_CLASS[name] ?? 'aspect-other'}`} x1=${from.x} y1=${from.y} x2=${to.x} y2=${to.y}><title>transiting ${a.planet1} ${name} natal ${a.planet2}${orb ? ` (orb ${orb}°)` : ''}</title></line>`;
		});
	}

	/** ASC and DSC ticks, drawn ONLY when the page supplied an ascendant. Nothing is derived: the descendant is the exact opposite point of the value given. */
	private renderAxis() {
		if (!this.oriented) return nothing;
		const asc = normalizeLongitude(this.ascendant as number);
		return [asc, oppositePoint(asc)].map((lon, i) => {
			const angle = this.toAngle(lon);
			const inner = polarToCartesian(CENTER, CENTER, OUTER_R, angle);
			const outer = polarToCartesian(CENTER, CENTER, AXIS_LABEL_R, angle);
			return svg`<g>
				<line class="axis-tick" x1=${inner.x} y1=${inner.y} x2=${outer.x} y2=${outer.y} />
				<text class="axis-label" x=${outer.x} y=${outer.y} text-anchor="middle" dominant-baseline="central">${i === 0 ? 'ASC' : 'DSC'}</text>
			</g>`;
		});
	}

	/**
	 * The key to the wheel, and the one place the orientation is stated in words.
	 * A reader who cannot tell whether the divisions are signs or houses cannot
	 * reconcile the chart against another calculator, so the caption is
	 * provenance rather than decoration.
	 */
	private renderLegend(
		natal: Body[],
		transit: Body[],
		aspects: TransitAspect[],
	) {
		return html`<div class="legend" part="legend">
			<span><span class="swatch swatch--natal"></span>${natal.length} natal</span>
			<span><span class="swatch swatch--transit"></span>${transit.length} transiting</span>
			${
				aspects.length > 0
					? html`<span><span class="swatch swatch--harmonious"></span>harmonious</span>
						<span><span class="swatch swatch--challenging"></span>challenging</span>`
					: nothing
			}
			<span>${this.oriented ? 'Ascendant on the left horizon' : 'Sign wheel, 0° Aries on the left, no houses'}</span>
		</div>`;
	}

	/** Transit weather: the counts and the tightest contact. All of it is data, so all of it survives hide-readings. */
	private renderSummary(s: TransitSummary | undefined) {
		if (!s) return nothing;
		const byType = Object.entries(s.byType ?? {}).sort((a, b) => b[1] - a[1]);
		return html`<div part="details">
			<div class="summary-pills" role="region" aria-label="Transit aspect summary">
				${typeof s.total === 'number' ? html`<span class="pill pill--muted">Total: ${s.total}</span>` : nothing}
				<span class="pill pill--success">Harmonious: ${s.harmonious}</span>
				<span class="pill pill--danger">Challenging: ${s.challenging}</span>
				<span class="pill pill--muted">Neutral: ${s.neutral}</span>
				${byType.map(
					([type, count]) =>
						html`<span class="pill pill--muted">${formatAspectName({ type })}: ${count}</span>`,
				)}
			</div>
			${s.strongest ? this.renderStrongest(s.strongest) : nothing}
		</div>`;
	}

	/** The tightest transit by orb: the one contact most likely to be felt, lifted out so it is not buried among seventy others. */
	private renderStrongest(s: NonNullable<TransitSummary['strongest']>) {
		return html`<div class="strongest" part="details strongest">
			<span class="label">Strongest</span>
			<span aria-hidden="true" class="glyph">${glyphFor(s.planet1)}</span>transiting ${s.planet1}
			<span class="nature-badge ${(s.interpretation ?? 'neutral').toLowerCase()}">${formatAspectName(s)}</span>
			<span aria-hidden="true" class="glyph">${glyphFor(s.planet2)}</span>natal ${s.planet2}
			<span class="meta">${s.isApplying ? 'Applying' : 'Separating'} · orb ${formatNumber(s.orb, 2)}° · str ${score(s.strength)}</span>
		</div>`;
	}

	/**
	 * Both rings as exact positions, so every degree the wheel abbreviates to a
	 * glyph stays readable and nothing the response carries is dropped.
	 *
	 * @remarks
	 * The per-body `house` the response also carries is deliberately absent: it
	 * comes back as `1` for every body on every chart, so a House column would
	 * report twenty-eight bodies in the first house, which is worse than no
	 * column.
	 */
	private renderPositions(natal: Body[], transit: Body[]) {
		if (natal.length === 0 && transit.length === 0) return nothing;
		const natalBy = byName(natal);
		const transitBy = byName(transit);
		const rows = natal.length > 0 ? natal : transit;
		const cell = (p: Body | undefined) =>
			p
				? html`${SIGN_GLYPH[capitalize(p.sign ?? '')] ?? ''} ${degLabel(p.longitude)} ${p.sign ?? ''}${p.isRetrograde ? html`<span class="retro-badge" aria-label="retrograde">℞</span>` : nothing}`
				: nothing;
		return html`<div class="scroll" part="table">
			<table>
				<caption class="roxy-sr-only">
					Every body with its natal position and its position on the transit date,
					each as a zodiac sign and a degree.
				</caption>
				<thead>
					<tr>
						<th scope="col">Body</th>
						<th scope="col"><span class="swatch swatch--natal" aria-hidden="true"></span>Natal</th>
						<th scope="col"><span class="swatch swatch--transit" aria-hidden="true"></span>Transiting</th>
					</tr>
				</thead>
				<tbody>
					${rows.map((p) => {
						const key = capitalize(p.name);
						return html`<tr>
							<th scope="row"><span aria-hidden="true" class="glyph">${glyphFor(p.name)}</span> ${p.name}</th>
							<td>${cell(natalBy.get(key))}</td>
							<td>${cell(transitBy.get(key))}</td>
						</tr>`;
					})}
				</tbody>
			</table>
		</div>`;
	}

	/**
	 * The written transit readings, routed through the base so one `hide-readings`
	 * attribute drops every one of them from the markup. The aspect itself (both
	 * bodies, the type, applying or separating, orb and strength) is data and
	 * stays on the wheel, in the summary and in the positions table regardless.
	 */
	private renderReadings(aspects: TransitAspect[]) {
		const sections: InterpSection[] = aspects
			.filter((a) => a.transitInterpretation?.summary)
			.map((a) => {
				const t = a.transitInterpretation as NonNullable<
					TransitAspect['transitInterpretation']
				>;
				return {
					label: `${glyphFor(a.planet1)} ${a.planet1} ${formatAspectName(a)} ${glyphFor(a.planet2)} ${a.planet2}`,
					aside: `orb ${formatNumber(a.orb, 2)}° · str ${score(a.strength)}`,
					body: t.summary,
					extra: html`${t.impact ? html`<p><strong>Impact:</strong> ${t.impact}</p>` : nothing}
					${t.timing ? html`<p><strong>Timing:</strong> ${t.timing}</p>` : nothing}
					${t.guidance ? html`<p><strong>Guidance:</strong> ${t.guidance}</p>` : nothing}
					${
						t.keywords?.length
							? html`<div class="interp-keywords">${t.keywords.map((k) => html`<span class="kw">${k}</span>`)}</div>`
							: nothing
					}`,
				};
			});
		return this.renderInterpretation(
			sections,
			'transit-aspect-readings',
			'Transit readings',
		);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-transit-wheel': RoxyTransitWheel;
	}
}
