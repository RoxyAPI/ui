import { css, html, nothing, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { planetGlyph, SIGNS_ORDER, signGlyph } from '../tokens/index.js';
import type {
	CalculateTransitAspectsResponse,
	NatalChartResponse,
} from '../types/index.js';
import { aspectLineStyle, aspectLineStyles } from '../utils/aspect-line.js';
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
	normalizeAspect,
} from '../utils/format.js';
import {
	type InterpSection,
	interpAccordionStyles,
	renderKeywordChips,
} from '../utils/interp-accordion.js';
import { display } from '../utils/localized.js';
import { capitalize } from '../utils/string.js';

type Body = CalculateTransitAspectsResponse['transitPlanets'][number];
type TransitAspect = CalculateTransitAspectsResponse['aspects'][number];
type TransitSummary = CalculateTransitAspectsResponse['summary'];

/**
 * The transit-aspects response plus the natal frame it now carries.
 *
 * @remarks
 * `/astrology/transit-aspects` returns `houses` and `ascendant` field for field identical to the
 * natal-chart ones, which is what lets the prop and the payload share one code path below. They are
 * declared here as OPTIONAL rather than read straight off the generated response type because
 * `specs/openapi.json` is refreshed from live only after the API deploys, so the type does not name
 * them yet and this component must compile against both the old spec and the new one. Once the spec
 * refresh lands the intersection is a no-op and this alias can go.
 */
type TransitAspectsPayload = CalculateTransitAspectsResponse &
	Partial<Pick<NatalChartResponse, 'houses' | 'ascendant'>>;

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
/** House sector numbers, inside the hub: the only band on this wheel with nothing else in it. Drawn ONLY from real cusps, the response ones or a page override. */
const HOUSE_NUM_R = 58;
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

/**
 * Glyph for an API body, or the name a reader sees when the library has none: the SVG ring position is the sole identifier for that body, so a miss must stay visibly wrong rather than a plausible fabricated abbreviation.
 *
 * Two arguments because the two halves answer to different languages. `name` is the canonical English value the glyph table is keyed on and must stay English; `label` is what is left ON SCREEN when that lookup misses, so it is the localized one.
 */
const glyphFor = (name: string, label: string): string =>
	planetGlyph(name) ?? label;

/** `12°34'` from a raw ecliptic longitude, the form a practitioner reads off a wheel. */
const degLabel = (longitude: number): string => {
	const sp = longitudeToSignPosition(longitude);
	return `${sp.degree}°${String(sp.minute).padStart(2, '0')}'`;
};

/** Bodies keyed by their canonical ENGLISH name, so an aspect or a table row can find a longitude without rescanning the array. The API keeps `name` English in every language for exactly this, and keying on `nameLocalized` would resolve nothing on a translated page. */
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
 * **The response carries real houses, and it did not always.** Every body comes
 * back with a `house` read against the NATAL cusps (a transiting body reports the
 * natal house it is currently passing through) plus a top-level `houseSystem`.
 * The fourteen natal house numbers reconcile body
 * for body with /astrology/natal-chart for the same birth data, and requesting
 * `whole-sign` moves them. An earlier revision of the API did return `1` for
 * every body, and the comment saying so outlived the fix and went on justifying a
 * missing House column for months. The numbers are rendered, in their own
 * columns, labelled with the system the response names.
 *
 * **The GEOMETRY arrived next, and the wheel now draws itself.** The response also
 * carries the twelve natal cusps as `houses` and the natal `ascendant`, the same
 * twelve the house numbers above were read against, so the sector ring and the
 * real horizon come out of the one call the page already made. That closed the
 * house-less bi-wheel every embed drew through WordPress, /embed and the CDN
 * widgets, none of which can compose a second call. {@link RoxyTransitWheel.houses}
 * and {@link RoxyTransitWheel.ascendant} remain as OVERRIDES and keep winning
 * where a page sets them, which is what a stored response predating the fields,
 * or a trimming proxy, needs.
 *
 * **Nothing is ever derived, whichever source it came from.** A payload with
 * neither field still fixes 0 degrees Aries on the left horizon, says so in the
 * legend and in the SVG description rather than leaving a reader to discover it,
 * and draws no house divisions at all. Equal sectors derived from an Ascendant
 * and labelled with a quadrant system would replace one false statement with a
 * worse one. Every cusp on this wheel is a longitude some source stated, placed
 * on a circle, never one this component worked out.
 */
@customElement('roxy-transit-wheel')
export class RoxyTransitWheel extends RoxyDataElement<CalculateTransitAspectsResponse> {
	static styles = [
		baseStyles,
		aspectLineStyles,
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
				.house-num {
					font-size: 12px;
				}
			}
			.tick {
				stroke: var(--roxy-border, #e4e4e7);
			}
			.tick-major {
				stroke: var(--roxy-secondary, #475569);
			}
			/* Dashed, so a house cusp is never mistaken for one of the solid sign
			 * boundaries it crosses. Only ever drawn from supplied cusps. */
			.house-cusp {
				stroke: var(--roxy-secondary, #475569);
				stroke-width: 1;
				stroke-dasharray: 3 3;
			}
			.house-num {
				fill: var(--roxy-secondary, #475569);
				font-size: 9px;
				font-family: var(--roxy-font-sans);
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

		`,
	];

	/** Heading above the wheel. The default is translated; a heading the page sets is passed through the catalogue too, so a host that supplies its own English wording still gets it localized when one is registered for it. */
	@property({ type: String })
	heading = 'Transits';

	/**
	 * Natal Ascendant as an ecliptic longitude in degrees (0-360), to override the
	 * one the response carries.
	 *
	 * @remarks
	 * Leave it unset on a live /astrology/transit-aspects response: that endpoint
	 * returns the natal `ascendant` and the wheel reads it, so the horizon is
	 * right with no page wiring at all. Set it only to orient the wheel on a
	 * DIFFERENT horizon than the response describes, or to give one to a payload
	 * that carries none. Either way it ROTATES the wheel so the given longitude
	 * falls on the left horizon and draws the ASC/DSC axis. It draws no house
	 * divisions, because a rotation is not a cusp; that is what
	 * {@link RoxyTransitWheel.houses} is for. With neither the prop nor a payload
	 * ascendant the wheel falls back to the honest default: 0 degrees Aries on
	 * the left.
	 */
	@property({ type: Number })
	ascendant?: number;

	/**
	 * The twelve natal house cusps, to override the ones the response carries.
	 * Takes the /astrology/natal-chart `houses` array verbatim, or twelve bare
	 * cusp longitudes in house order.
	 *
	 * @remarks
	 * Leave it unset on a live /astrology/transit-aspects response: that endpoint
	 * returns the same twelve natal cusps its house numbers are read against, so
	 * the sector ring draws itself. Set it to draw a different cusp set than the
	 * response carries, or to give one to a payload that carries none (a stored
	 * response predating the field, or a proxy that trims it). Supplying either
	 * source draws the twelve cusp lines and their numbers and, unless an
	 * ascendant is also available, rotates the first cusp onto the left horizon.
	 *
	 * Both accepted shapes exist because the natural source is a natal-chart
	 * response a host already holds, and passing `chart.houses` straight through
	 * has to work; twelve numbers is the terser form for a host that stored only
	 * the longitudes. Anything that does not resolve to houses 1 to 12 with finite
	 * longitudes is ignored outright rather than half drawn, which is the same
	 * degrade-honestly rule the rest of this component follows: a partial house
	 * ring is a claim about placements the wheel cannot support.
	 */
	@property({ type: Array })
	houses?: NatalChartResponse['houses'] | number[];

	/** The response widened to the natal frame it carries. One cast, so nothing below repeats it. */
	private get payload(): TransitAspectsPayload | undefined {
		return this.data as TransitAspectsPayload | undefined;
	}

	/**
	 * The Ascendant longitude the wheel orients on, or undefined.
	 *
	 * @remarks
	 * The PROP wins over the payload wherever both exist: a page that passes one
	 * has said something the response cannot know, and silently preferring the
	 * response would make the prop dead on exactly the responses that carry the
	 * field.
	 */
	private get effectiveAscendant(): number | undefined {
		for (const value of [this.ascendant, this.payload?.ascendant?.longitude]) {
			if (typeof value === 'number' && Number.isFinite(value)) return value;
		}
		return undefined;
	}

	/** True when an ascendant is available at all, so the ASC/DSC axis is a real horizon rather than one derived from a cusp. */
	private get ascendantGiven(): boolean {
		return this.effectiveAscendant !== undefined;
	}

	/** True when the sector ring came from the page rather than from the response, so the legend can say which. */
	private get cuspsFromPage(): boolean {
		return Array.isArray(this.houses);
	}

	/**
	 * The cusps to draw, normalized to houses 1 to 12 in order, or null. The prop
	 * first, then the ones the response carries, on the same precedence rule as
	 * {@link RoxyTransitWheel.effectiveAscendant}.
	 *
	 * @remarks
	 * Sorted by house number rather than trusted in array order, and rejected
	 * whole unless the twelve numbers are exactly 1 to 12 with finite longitudes.
	 * A cusp set that fails either check is not a house division, and drawing part
	 * of one would put a sector boundary where the host never claimed there was
	 * one. A malformed PROP is rejected outright rather than falling through to
	 * the payload: the page overrode the response on purpose, and quietly drawing
	 * the response cusps under a bad override would be a different chart than
	 * either source asked for.
	 */
	private get cusps(): Array<{ number: number; longitude: number }> | null {
		const raw = this.houses ?? this.payload?.houses;
		if (!Array.isArray(raw) || raw.length !== 12) return null;
		const out = raw
			.map((h, i) =>
				typeof h === 'number'
					? { number: i + 1, longitude: h }
					: { number: Number(h?.number), longitude: Number(h?.longitude) },
			)
			.sort((a, b) => a.number - b.number);
		const complete = out.every(
			(c, i) => c.number === i + 1 && Number.isFinite(c.longitude),
		);
		return complete ? out : null;
	}

	/**
	 * Ecliptic longitude to SVG angle. 0 degrees is at 3 o'clock and positive
	 * angles run clockwise on screen, so subtracting the longitude makes the
	 * zodiac run counterclockwise, which is how a chart wheel is read. The 180
	 * offset puts the reference point on the left horizon: the supplied Ascendant
	 * first, else the supplied first house cusp, else 0 Aries.
	 *
	 * The Ascendant wins because the two are not the same longitude under every
	 * system: whole-sign puts cusp 1 at 0 degrees of the rising sign, which can be
	 * most of a sign away from the Ascendant itself.
	 */
	private toAngle(longitude: number): number {
		const origin = this.effectiveAscendant ?? this.cusps?.[0]?.longitude ?? 0;
		return 180 + origin - longitude;
	}

	protected renderData(d: CalculateTransitAspectsResponse) {
		const natal = d.natalPlanets ?? [];
		const transit = d.transitPlanets ?? [];
		const aspects = d.aspects ?? [];
		const when = formatDateTime(this.effectiveLang(), d.transitDate);
		// Label then number, at every count and in every language: the catalogue
		// carries no plural rules, so "1 aspects" is the alternative in English and
		// three wrong endings are the alternative in Russian.
		const count =
			aspects.length > 0
				? this.t('Aspects to the natal chart: {{count}}', {
						count: aspects.length,
					})
				: '';
		// The House columns and the house-system chip both stand on the SAME fact:
		// that a body came back with a house. Derived once from the payload rather
		// than assumed from the type, so a host feeding an older captured response
		// loses the columns instead of printing a column of blanks under a system
		// name.
		const houses = [...natal, ...transit].some((p) => Number.isFinite(p.house));

		return html`<div class="wrap" part="card" aria-label=${this.t('Natal and transit bi-wheel')}>
			<div class="head" part="header">
				<h2 class="title">${this.t(this.heading)}</h2>
				${
					when || count
						? html`<p class="subtitle">${[when, count].filter(Boolean).join(' · ')}</p>`
						: nothing
				}
			</div>
			${this.renderWheel(natal, transit, aspects)}
			${this.renderLegend(natal, transit, aspects, houses ? d.houseSystem : undefined)}
			${this.renderSummary(d.summary)}
			${this.renderPositions(natal, transit, houses)}
			${this.renderReadings(aspects)}
		</div>`;
	}

	/**
	 * What sits on the left horizon, in words. Rendered as a legend chip AND as a
	 * sentence of the SVG description, from this one getter, so the drawing and
	 * its accessible text cannot end up claiming different orientations.
	 */
	private get orientationCaption(): string {
		if (this.ascendantGiven) return this.t('Ascendant on the left horizon');
		if (this.cusps) return this.t('First house cusp on the left horizon');
		return this.t('Sign wheel, 0° Aries on the left');
	}

	/**
	 * Whether the twelve sectors on the wheel are real cusps, in words, and where
	 * they came from. Same dual use as {@link RoxyTransitWheel.orientationCaption}.
	 *
	 * @remarks
	 * The source is named because the caption is provenance: a reader
	 * reconciling this wheel against another calculator needs to know whether the
	 * cusps are the ones the endpoint computed the house numbers against, or a set
	 * the page substituted for them.
	 */
	private get cuspCaption(): string {
		if (!this.cusps) return this.t('No house cusps');
		return this.cuspsFromPage
			? this.t('House cusps supplied by the page')
			: this.t('House cusps from the response');
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
			aria-label=${this.t('Bi-wheel with natal bodies on the inner ring and transiting bodies on the outer ring')}
		>
			<title>${this.t('Natal and transit bi-wheel')}</title>
			<desc>
				${this.t('Twelve zodiac sign segments around a circular wheel. Natal bodies sit at their ecliptic longitudes on the inner ring and transiting bodies on the outer ring, and each line joins a transiting body to the natal body it aspects.')}
				${this.orientationCaption}. ${this.cuspCaption}.
			</desc>
			<circle class="wheel-line" cx=${CENTER} cy=${CENTER} r=${OUTER_R} stroke-width="1.5" />
			<circle class="wheel-line" cx=${CENTER} cy=${CENTER} r=${BAND_R} stroke-width="0.8" />
			<circle class="wheel-line" cx=${CENTER} cy=${CENTER} r=${TRANSIT_LINE_R} stroke-width="0.6" />
			<circle class="wheel-line" cx=${CENTER} cy=${CENTER} r=${HUB_R} stroke-width="0.5" />
			${this.renderTicks()} ${this.renderSpokes()} ${this.renderSigns()}
			${this.renderHouses()}
			${this.renderAspectLines(natal, transit, aspects)}
			${this.renderRing(natal, NATAL_R, NATAL_DEG_R, 'natal-glyph', this.t('Natal'), 1)}
			${this.renderRing(transit, TRANSIT_R, TRANSIT_DEG_R, 'transit-glyph', this.t('Transiting'), -1)}
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

	/** Twelve sign boundaries, drawn from the inner ring outward. Solid, and always exactly 30 degrees apart: house cusps are the dashed lines from {@link RoxyTransitWheel.renderHouses} and only exist when a cusp set is available. */
	private renderSpokes() {
		return SIGNS_ORDER.map((_, i) => {
			const angle = this.toAngle(i * 30);
			const start = polarToCartesian(CENTER, CENTER, HUB_R, angle);
			const end = polarToCartesian(CENTER, CENTER, OUTER_R, angle);
			return svg`<line class="wheel-line" x1=${start.x} y1=${start.y} x2=${end.x} y2=${end.y} stroke-width="0.6" />`;
		});
	}

	/**
	 * The twelve house sectors, drawn ONLY from cusps some source stated: the ones
	 * the response carries, or the {@link RoxyTransitWheel.houses} override.
	 *
	 * @remarks
	 * Dashed and inset to the sign band, because the solid spokes beside them are
	 * sign boundaries and a reader who cannot tell the two apart cannot reconcile
	 * the chart against another calculator. Each number sits at the arc midpoint
	 * of its own sector, so an unequal house carries its label inside itself; the
	 * hub is the one band on this wheel with nothing else in it.
	 *
	 * Nothing here is derived. With no cusps available this renders nothing at all
	 * rather than twelve equal sectors from the Ascendant, which would be a
	 * different chart wearing the same label.
	 *
	 * **Known and accepted: a fanned glyph can sit one sector off.** {@link fanOut}
	 * displaces a crowded glyph in ANGLE, so a body a degree inside a cusp can be
	 * drawn just past it; measured on a real Capricorn stellium, the natal Sun
	 * glyph landed in the ninth sector while the body is in the eighth. The leader
	 * runs back to a tick at the true longitude and the House column is the
	 * authoritative number, which is the same trade professional chart software
	 * makes. Do not "fix" it by clamping a glyph to its sector: that would move the
	 * mark AND still not be the position.
	 */
	private renderHouses() {
		const cusps = this.cusps;
		if (!cusps) return nothing;
		return cusps.map((cusp, i) => {
			const next = cusps[(i + 1) % 12];
			const angle = this.toAngle(cusp.longitude);
			const start = polarToCartesian(CENTER, CENTER, HUB_R, angle);
			const end = polarToCartesian(CENTER, CENTER, BAND_R, angle);
			const label = polarToCartesian(
				CENTER,
				CENTER,
				HOUSE_NUM_R,
				this.toAngle(
					arcMidpoint(cusp.longitude, next?.longitude ?? cusp.longitude + 30),
				),
			);
			return svg`<g>
				<line class="house-cusp" x1=${start.x} y1=${start.y} x2=${end.x} y2=${end.y} />
				<text class="house-num" x=${label.x} y=${label.y} text-anchor="middle" dominant-baseline="central">${cusp.number}</text>
			</g>`;
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
			return svg`<text class="sign-glyph" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central">${signGlyph(sign)}</text>`;
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
				const body = display(p, 'name');
				const tooltip = `${kind} ${body}${retro ? ` ${this.t('retrograde')}` : ''} - ${degLabel(longitude)} ${display(p, 'sign')}`;
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
				<text class=${cls} x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central"><title>${tooltip}</title>${glyphFor(p.name, body)}</text>
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
			const orb = formatNumber(this.effectiveLang(), a.orb, 1);
			return svg`<line class=${`aspect ${ASPECT_CLASS[name] ?? 'aspect-other'}`} style=${aspectLineStyle(a)} x1=${from.x} y1=${from.y} x2=${to.x} y2=${to.y}><title>${this.t('Transiting')} ${display(a, 'planet1')} ${display(a, 'type', name)} ${this.t('Natal')} ${display(a, 'planet2')}${orb ? ` (${this.t('Orb')} ${orb}°)` : ''}</title></line>`;
		});
	}

	/**
	 * ASC and DSC ticks, drawn ONLY when an ascendant is available, from the prop
	 * or from the response. Nothing is derived: the descendant is the exact
	 * opposite point of that value.
	 *
	 * Gated on the ascendant alone, never on the cusps. Under whole-sign the first
	 * cusp is 0 degrees of the rising sign rather than the Ascendant, so labelling
	 * it ASC would be wrong on exactly the charts a traditional reader casts.
	 */
	private renderAxis() {
		const given = this.effectiveAscendant;
		if (given === undefined) return nothing;
		const asc = normalizeLongitude(given);
		return [asc, oppositePoint(asc)].map((lon, i) => {
			const angle = this.toAngle(lon);
			const inner = polarToCartesian(CENTER, CENTER, OUTER_R, angle);
			const outer = polarToCartesian(CENTER, CENTER, AXIS_LABEL_R, angle);
			return svg`<g>
				<line class="axis-tick" x1=${inner.x} y1=${inner.y} x2=${outer.x} y2=${outer.y} />
				<text class="axis-label" x=${outer.x} y=${outer.y} text-anchor="middle" dominant-baseline="central">${i === 0 ? this.t('ASC') : this.t('DSC')}</text>
			</g>`;
		});
	}

	/**
	 * The key to the wheel, and the one place the orientation is stated in words.
	 * A reader who cannot tell whether the divisions are signs or houses cannot
	 * reconcile the chart against another calculator, so the caption is
	 * provenance rather than decoration.
	 *
	 * `houseSystem` labels the house NUMBERS in the table, which is the only thing
	 * the response can vouch for, and the cusp chip separately says where the
	 * drawn sectors came from. Two statements, each true on its own, rather than
	 * one chip implying the ring and the numbers share a source.
	 */
	private renderLegend(
		natal: Body[],
		transit: Body[],
		aspects: TransitAspect[],
		houseSystem: string | undefined,
	) {
		return html`<div class="legend" part="legend">
			<span><span class="swatch swatch--natal"></span>${this.t('{{count}} natal bodies', { count: natal.length })}</span>
			<span><span class="swatch swatch--transit"></span>${this.t('{{count}} transiting bodies', { count: transit.length })}</span>
			${
				aspects.length > 0
					? html`<span><span class="swatch swatch--harmonious"></span>${this.t('Harmonious')}</span>
						<span><span class="swatch swatch--challenging"></span>${this.t('Challenging')}</span>`
					: nothing
			}
			${houseSystem ? html`<span>${this.t('{{system}} houses', { system: houseSystem })}</span>` : nothing}
			<span>${this.orientationCaption}</span>
			<span>${this.cuspCaption}</span>
		</div>`;
	}

	/** Transit weather: the counts and the tightest contact. All of it is data, so all of it survives hide-readings. */
	private renderSummary(s: TransitSummary | undefined) {
		if (!s) return nothing;
		const byType = Object.entries(s.byType ?? {}).sort((a, b) => b[1] - a[1]);
		return html`<div part="details">
			<div class="summary-pills" role="region" aria-label=${this.t('Transit aspect summary')}>
				${typeof s.total === 'number' ? html`<span class="pill pill--muted">${this.t('Total')}: ${s.total}</span>` : nothing}
				<span class="pill pill--success">${this.t('Harmonious')}: ${s.harmonious}</span>
				<span class="pill pill--danger">${this.t('Challenging')}: ${s.challenging}</span>
				<span class="pill pill--muted">${this.t('Neutral')}: ${s.neutral}</span>
				${byType.map(
					// English in every language, and nothing to do about it here: `byType`
					// is an object KEYED by the canonical aspect name, so the response
					// carries no localized partner for these the way `aspects[]` does.
					([type, count]) =>
						html`<span class="pill pill--muted">${formatAspectName({ type })}: ${count}</span>`,
				)}
			</div>
			${s.strongest ? this.renderStrongest(s.strongest) : nothing}
		</div>`;
	}

	/** The tightest transit by orb: the one contact most likely to be felt, lifted out so it is not buried among seventy others. */
	private renderStrongest(s: NonNullable<TransitSummary['strongest']>) {
		const transiting = display(s, 'planet1');
		const natal = display(s, 'planet2');
		return html`<div class="strongest" part="details strongest">
			<span class="label">${this.t('Strongest')}</span>
			<span aria-hidden="true" class="glyph">${glyphFor(s.planet1, transiting)}</span>${this.t('Transiting')} ${transiting}
			<span class="nature-badge ${(s.interpretation ?? 'neutral').toLowerCase()}">${display(s, 'type', formatAspectName(s))}</span>
			<span aria-hidden="true" class="glyph">${glyphFor(s.planet2, natal)}</span>${this.t('Natal')} ${natal}
			<span class="meta">${s.isApplying ? this.t('Applying') : this.t('Separating')} · ${this.t('Orb')} ${formatNumber(this.effectiveLang(), s.orb, 2)}° · ${this.t('Strength')} ${formatNumber(this.effectiveLang(), s.strength, 0)}</span>
		</div>`;
	}

	/**
	 * Both rings as exact positions, so every degree the wheel abbreviates to a
	 * glyph stays readable and nothing the response carries is dropped.
	 *
	 * @remarks
	 * The House columns are where the response's house numbers land, because the
	 * wheel has no sectors to put them in unless a cusp set is available. Both
	 * columns are read against the NATAL cusps: the transiting one is the natal
	 * house that body is currently passing through, which is the whole point of a
	 * transit report and is why the two are not the same fact under one heading.
	 * `showHouses` comes from the payload rather than the type, so a response
	 * without them loses the columns instead of printing a column of blanks.
	 */
	private renderPositions(natal: Body[], transit: Body[], showHouses: boolean) {
		if (natal.length === 0 && transit.length === 0) return nothing;
		const natalBy = byName(natal);
		const transitBy = byName(transit);
		const rows = natal.length > 0 ? natal : transit;
		const cell = (p: Body | undefined) =>
			p
				? html`${signGlyph(p.sign) ?? ''} ${degLabel(p.longitude)} ${display(p, 'sign')}${p.isRetrograde ? html`<span class="retro-badge" aria-label=${this.t('retrograde')}>℞</span>` : nothing}`
				: nothing;
		const houseCell = (p: Body | undefined) =>
			showHouses
				? html`<td>${p && Number.isFinite(p.house) ? p.house : nothing}</td>`
				: nothing;
		// tabindex + role: the House columns pushed this table past the card, so it
		// genuinely scrolls now, and a scrollable region with no focusable content
		// of its own is unreachable by keyboard. Same pattern as `hd-connection`,
		// except the name is borrowed from the caption rather than written again:
		// one translated sentence, and it cannot drift from what the table holds.
		return html`<div
			class="scroll"
			part="table"
			tabindex="0"
			role="region"
			aria-labelledby="transit-positions"
		>
			<table>
				<caption id="transit-positions" class="roxy-sr-only">
					${this.t('Every body with its natal position and its position on the transit date, each as a zodiac sign and a degree.')}
					${showHouses ? this.t('Both house numbers are read against the natal house cusps.') : nothing}
				</caption>
				<thead>
					<tr>
						<th scope="col">${this.t('Body')}</th>
						<th scope="col"><span class="swatch swatch--natal" aria-hidden="true"></span>${this.t('Natal')}</th>
						${showHouses ? html`<th scope="col">${this.t('Natal house')}</th>` : nothing}
						<th scope="col"><span class="swatch swatch--transit" aria-hidden="true"></span>${this.t('Transiting')}</th>
						${showHouses ? html`<th scope="col">${this.t('Transiting house')}</th>` : nothing}
					</tr>
				</thead>
				<tbody>
					${rows.map((p) => {
						const key = capitalize(p.name);
						const body = display(p, 'name');
						return html`<tr>
							<th scope="row"><span aria-hidden="true" class="glyph">${glyphFor(p.name, body)}</span> ${body}</th>
							<td>${cell(natalBy.get(key))}</td>
							${houseCell(natalBy.get(key))}
							<td>${cell(transitBy.get(key))}</td>
							${houseCell(transitBy.get(key))}
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
				const transiting = display(a, 'planet1');
				const natal = display(a, 'planet2');
				return {
					label: `${glyphFor(a.planet1, transiting)} ${transiting} ${display(a, 'type', formatAspectName(a))} ${glyphFor(a.planet2, natal)} ${natal}`,
					aside: `${this.t('Orb')} ${formatNumber(this.effectiveLang(), a.orb, 2)}° · ${this.t('Strength')} ${formatNumber(this.effectiveLang(), a.strength, 0)}`,
					body: t.summary,
					extra: html`${t.impact ? html`<p><strong>${this.t('Impact')}:</strong> ${t.impact}</p>` : nothing}
					${t.timing ? html`<p><strong>${this.t('Timing')}:</strong> ${t.timing}</p>` : nothing}
					${t.guidance ? html`<p><strong>${this.t('Guidance')}:</strong> ${t.guidance}</p>` : nothing}
					${renderKeywordChips(t.keywords)}`,
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
