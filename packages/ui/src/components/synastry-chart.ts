import { css, html, nothing, svg } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { ChromeString } from '../i18n/chrome-strings.js';
import { planetGlyph, SIGNS_ORDER, signGlyph } from '../tokens/index.js';
import type { CalculateSynastryResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { longitudeToSignPosition, polarToCartesian } from '../utils/degree.js';
import { chevron, disclosureStyles } from '../utils/disclosure.js';
import {
	ASPECT_CLASS,
	formatAspectName,
	formatNumber,
	normalizeAspect,
} from '../utils/format.js';
import { interpAccordionStyles } from '../utils/interp-accordion.js';
import { capitalize } from '../utils/string.js';

/**
 * A planet as the synastry response now returns it.
 *
 * @remarks
 * Was `NatalChartResponse['planets'][number]`, because `/astrology/synastry` did not return positions and a caller had to merge two natal responses in by hand. The endpoint returns them, so the wheel is drawable from ONE call. The synastry shape is the plotting subset (no `interpretation`, `speed` or `latitude`); the wheel only ever read `name`, `longitude` and `isRetrograde`, so nothing is lost.
 */
type PlanetEntry = CalculateSynastryResponse['person1']['planets'][number];
type InterAspect = CalculateSynastryResponse['interAspects'][number];
type SynastrySummary = CalculateSynastryResponse['summary'];
type SynastryPerson = CalculateSynastryResponse['person1'];

/** How many inter-aspects get a full reading before the rest fall back to the catalog table. A synastry can return 90+ contacts; a practitioner works the tightest ones. */
const READING_COUNT = 12;

const SIZE = 360;
const CENTER = SIZE / 2;
const OUTER_R = 170;
const SIGN_R = 154;
const P1_R = 124;
const P2_R = 96;

/**
 * Dual-wheel synastry chart with inter-aspects table. Pass `data` from
 * /astrology/synastry.
 */
@customElement('roxy-synastry-chart')
export class RoxySynastryChart extends RoxyDataElement<CalculateSynastryResponse> {
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
				/* minmax(0, 1fr), not the implicit auto column. An auto grid column takes
				 * its MINIMUM from min-content, so a nowrap table wider than the card blows
				 * the column out and drags every sibling with it, clipped on the right. This
				 * is what lets the scroll container inside actually scroll. */
				grid-template-columns: minmax(0, 1fr);
				gap: var(--roxy-space-md, 1rem);
			}

			.head {
				display: flex;
				justify-content: space-between;
				align-items: center;
				gap: var(--roxy-space-md, 1rem);
				flex-wrap: wrap;
			}

			.title {
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				margin: 0;
			}

			.score {
				font-variant-numeric: tabular-nums;
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-accent-ink, #b45309);
				font-size: var(--roxy-text-xl, 1.5rem);
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
			.sign {
				fill: var(--roxy-secondary, #475569);
				font-size: 14px;
			}
			.p1 {
				fill: var(--roxy-accent, #f59e0b);
				font-weight: 600;
				font-size: 13px;
			}
			.p2 {
				fill: var(--roxy-info, #0284c7);
				font-weight: 600;
				font-size: 13px;
			}
			.person-tag {
				font-size: 7px;
				font-weight: 700;
				opacity: 0.85;
			}
			.planet-deg {
				fill: var(--roxy-muted, #71717a);
				font-size: 7px;
				font-family: var(--roxy-font-sans);
			}
			.planet-deg .retro {
				fill: var(--roxy-danger, #dc2626);
			}
			.asc-tick {
				stroke: var(--roxy-accent-ink, #b45309);
				stroke-width: 1;
				opacity: 0.75;
			}
			.asc-label {
				fill: var(--roxy-accent-ink, #b45309);
				font-size: 9px;
				font-weight: 700;
				font-family: var(--roxy-font-sans);
				letter-spacing: 0.04em;
			}
			.aspect {
				stroke-width: 0.8;
				fill: none;
				opacity: 0.5;
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
				opacity: 0.35;
			}
			.legend-row {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				margin-top: calc(var(--roxy-space-xs, 0.25rem) * -1);
			}
			.legend-row .swatch {
				display: inline-block;
				width: 8px;
				height: 8px;
				border-radius: 50%;
				margin-right: 4px;
				vertical-align: middle;
			}

			.summary {
				margin: 0;
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-base, 1rem);
			}

			.people {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.person {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				display: grid;
				gap: 0.3rem;
			}
			.person-name {
				display: flex;
				align-items: center;
				gap: 0.4rem;
				font-weight: var(--roxy-weight-bold, 600);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.person-dot {
				width: 8px;
				height: 8px;
				border-radius: 50%;
				flex-shrink: 0;
			}
			.person-dot.p1 {
				background: var(--roxy-accent, #f59e0b);
			}
			.person-dot.p2 {
				background: var(--roxy-info, #0284c7);
			}
			.big-three {
				display: flex;
				flex-wrap: wrap;
				gap: 0.25rem 0.75rem;
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
			}
			.big-three span {
				display: inline-flex;
				align-items: baseline;
				gap: 0.25rem;
			}
			.big-three .lbl {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
			}

			.summary-pills {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.pill {
				padding: 2px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 60%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}
			.pill--success {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 12%, transparent);
				color: var(--roxy-success-fg, #166534);
			}
			.pill--danger {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 12%, transparent);
				color: var(--roxy-danger-fg, #991b1b);
			}

			.glyph {
				font-size: 1.1em;
				line-height: 1;
			}
			/* An aspect with no meaning block has nothing to disclose, so it renders
			 * as a flat row rather than an empty accordion. Same header, no chevron. */
			.static-head {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				gap: var(--roxy-space-sm, 0.5rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: 500;
			}
			.asp-name {
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: capitalize;
			}
			.asp-name.harmonious {
				color: var(--roxy-success-fg, #166534);
			}
			.asp-name.challenging {
				color: var(--roxy-danger-fg, #991b1b);
			}
			.context {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				font-weight: var(--roxy-weight-bold, 600);
			}
			.catalog > summary {
				cursor: pointer;
				font-weight: var(--roxy-weight-bold, 600);
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
				display: flex;
				align-items: center;
				gap: 0.5rem;
			}
			.scroll {
				overflow-x: auto;
				min-width: 0;
				margin-top: var(--roxy-space-sm, 0.5rem);
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
			}
			th {
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				font-size: var(--roxy-text-xs, 0.75rem);
				letter-spacing: 0.06em;
			}
			td.orb {
				font-variant-numeric: tabular-nums;
				color: var(--roxy-muted, #71717a);
			}

			.lists {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
				gap: var(--roxy-space-md, 1rem);
			}
			.lists h3 {
				margin: 0 0 var(--roxy-space-xs, 0.25rem) 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.lists ul {
				margin: 0;
				padding-left: var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
			}

			.missing-planets {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 8%, transparent);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-md, 1rem);
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-sm, 0.875rem);
				line-height: 1.5;
			}
			.missing-planets code {
				font-family: var(--roxy-font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
				font-size: 0.95em;
				background: color-mix(in srgb, var(--roxy-fg, #0a0a0a) 6%, transparent);
				padding: 0 4px;
				border-radius: 4px;
			}
		`,
	];

	protected renderData(d: CalculateSynastryResponse) {
		const { person1, person2, compatibilityScore, analysis } = d;
		const interAspects = d.interAspects ?? [];
		const p1Planets = person1?.planets ?? [];
		const p2Planets = person2?.planets ?? [];

		const score =
			typeof compatibilityScore === 'number'
				? Math.round(compatibilityScore)
				: undefined;
		const summaryText = analysis?.overall;
		const strengths = analysis?.strengths ?? [];
		const challenges = analysis?.challenges ?? [];

		// /astrology/synastry returns chart highlights (Sun, Moon, Ascendant) but
		// not full planet positions, so the dual wheel cannot be drawn from a bare
		// synastry response. Say so instead of rendering a blank wheel; every other
		// block still renders, so a caller who passes the bare response gets the
		// full reading minus the drawing.
		const hasPlanets = p1Planets.length > 0 && p2Planets.length > 0;
		// The tightest contacts carry the reading. Sort a copy: `data` is the
		// caller's object.
		const ranked = [...interAspects].sort(
			(a, b) => (b.strength ?? 0) - (a.strength ?? 0),
		);
		const lead = ranked.slice(0, READING_COUNT);

		return html`<div class="wrap" part="card" aria-label=${this.t('Synastry compatibility chart')}>
			<div class="head" part="header">
				<h2 class="title">${this.t('Synastry')}</h2>
				${
					typeof score === 'number'
						? html`<span class="score" aria-label=${`Score ${score} of 100`}
							>${score} / 100</span
						>`
						: nothing
				}
			</div>
			${this.renderPeople(person1, person2)}
			${
				hasPlanets
					? html`<svg
							viewBox="0 0 ${SIZE} ${SIZE}"
							part="chart"
							role="img"
							aria-label=${this.t('Dual chart wheel comparing two natal charts')}
						>
							<title>${this.t('Synastry dual wheel')}</title>
							<circle
								class="wheel-line"
								cx=${CENTER}
								cy=${CENTER}
								r=${OUTER_R}
								stroke-width="1.5"
							/>
							<circle
								class="wheel-line"
								cx=${CENTER}
								cy=${CENTER}
								r=${P2_R + 14}
								stroke-width="0.8"
							/>
							<circle
								class="wheel-line"
								cx=${CENTER}
								cy=${CENTER}
								r=${P2_R - 14}
								stroke-width="0.6"
							/>
							${this.renderSpokes()} ${this.renderSigns()}
							${this.renderInterAspectLines(p1Planets, p2Planets, interAspects)}
							${this.renderRing(p1Planets, P1_R, 'p1', 1)} ${this.renderRing(p2Planets, P2_R, 'p2', 2)}
							${this.renderAscendants(d)}
						</svg>
						<div class="legend-row" part="legend">
							<span><span class="swatch" style="background: var(--roxy-accent)"></span>${this.t('Person 1')}</span>
							<span><span class="swatch" style="background: var(--roxy-info)"></span>${this.t('Person 2')}</span>
							<span><span class="swatch" style="background: var(--roxy-success)"></span>${this.t('Harmonious')}</span>
							<span><span class="swatch" style="background: var(--roxy-danger)"></span>${this.t('Challenging')}</span>
						</div>`
					: html`<div class="missing-planets" role="status">
						${this.t('Synastry response missing planet positions.')}
						${this.t(
							'A current {{endpoint}} response carries {{first}} and {{second}}, and the inter-aspect readings below still work without them.',
							{
								endpoint: '/astrology/synastry',
								first: 'person1.planets',
								second: 'person2.planets',
							},
						)}
					</div>`
			}
			${this.renderSummaryPills(d.summary)}
			${
				// The contact counts above are the data; this paragraph is the read.
				summaryText && !this.hideReadings
					? html`<p class="summary">${summaryText}</p>`
					: nothing
			}
			${
				lead.length > 0
					? html`<section class="block" part="section inter-aspects">
						<h3>${this.t('Inter-aspects')}</h3>
						${lead.map((a, i) => this.renderAspectCard(a, i))}
					</section>`
					: nothing
			}
			${ranked.length > lead.length ? this.renderCatalog(ranked) : nothing}
			${
				// Each entry is a sentence about the pair, so the two lists are prose
				// laid out as bullets rather than data.
				!this.hideReadings && (strengths.length > 0 || challenges.length > 0)
					? html`<div class="lists" part="section strengths-challenges">
						${
							strengths.length
								? html`<div>
									<h3>${this.t('Strengths')}</h3>
									<ul>
										${strengths.map((s) => html`<li>${s}</li>`)}
									</ul>
								</div>`
								: nothing
						}
						${
							challenges.length
								? html`<div>
									<h3>${this.t('Challenges')}</h3>
									<ul>
										${challenges.map((s) => html`<li>${s}</li>`)}
									</ul>
								</div>`
								: nothing
						}
					</div>`
					: nothing
			}
		</div>`;
	}

	/** Chart highlights for both people: the Sun, Moon, and Ascendant a reader checks before any aspect. Colour-dotted to match each person ring on the wheel. */
	private renderPeople(
		p1: SynastryPerson | undefined,
		p2: SynastryPerson | undefined,
	) {
		const card = (p: SynastryPerson | undefined, index: 1 | 2) => {
			if (!p) return nothing;
			const big: Array<[ChromeString, string]> = [
				['Sun', p.sunSign ?? ''],
				['Moon', p.moonSign ?? ''],
				[
					'ASC',
					p.ascendant
						? `${p.ascendant.sign} ${formatNumber(this.effectiveLang(), p.ascendant.degree, 0)}°`
						: '',
				],
			];
			const shown = big.filter(([, value]) => value);
			if (shown.length === 0) return nothing;
			return html`<div class="person">
				<span class="person-name">
					<span class="person-dot p${index}" aria-hidden="true"></span>
					${p.name || this.t('Person {{n}}', { n: index })}
				</span>
				<div class="big-three">
					${shown.map(
						([label, value]) => html`<span>
							<span class="lbl">${this.t(label)}</span>
							<span aria-hidden="true">${signGlyph(value.split(' ')[0]) ?? ''}</span>
							${value}
						</span>`,
					)}
				</div>
			</div>`;
		};
		const cards = [card(p1, 1), card(p2, 2)].filter((c) => c !== nothing);
		if (cards.length === 0) return nothing;
		return html`<div class="people">${cards}</div>`;
	}

	/** Contact balance for the pair. `byType` is a map, so its pairs are rendered, never the object. */
	private renderSummaryPills(s: SynastrySummary | undefined) {
		if (!s || typeof s !== 'object') return nothing;
		const byType = Object.entries(s.byType ?? {}).sort((a, b) => b[1] - a[1]);
		if (typeof s.total !== 'number' && byType.length === 0) return nothing;
		return html`<div class="summary-pills" part="details" role="region" aria-label=${this.t('Inter-aspect summary')}>
			${typeof s.total === 'number' ? html`<span class="pill">${this.t('Total')}: ${s.total}</span>` : nothing}
			<span class="pill pill--success">${this.t('Harmonious')}: ${s.harmonious}</span>
			<span class="pill pill--danger">${this.t('Challenging')}: ${s.challenging}</span>
			<span class="pill">${this.t('Neutral')}: ${s.neutral}</span>
			${byType.map(
				([type, count]) =>
					html`<span class="pill">${formatAspectName({ type })}: ${count}</span>`,
			)}
		</div>`;
	}

	/**
	 * One inter-chart contact as a reading. The header is the scannable line (both bodies, the aspect coloured by nature, orb and strength); the body leads with `meaning.relationshipContext`, which is the whole point of a synastry aspect: not what a trine means, but what THIS trine does to THESE two people.
	 */
	private renderAspectCard(a: InterAspect, index: number) {
		const g1 = planetGlyph(a.planet1) ?? '';
		const g2 = planetGlyph(a.planet2) ?? '';
		const nature = (a.interpretation ?? 'neutral').toLowerCase();
		const meaning = a.meaning;
		const lead = html`<span class="interp-lead">
			<span aria-hidden="true" class="glyph">${g1}</span>${a.planet1}
			<span class="asp-name ${nature}">${formatAspectName(a)}</span>
			<span aria-hidden="true" class="glyph">${g2}</span>${a.planet2}
		</span>`;
		const aside = html`<span class="interp-aside">
			<small>${this.t('orb {{orb}}° · str {{strength}}', { orb: formatNumber(this.effectiveLang(), a.orb, 2), strength: formatNumber(this.effectiveLang(), a.strength, 0) })}</small>
		</span>`;
		// The header is the contact itself (both bodies, the aspect, orb and
		// strength) and is never a reading, so a card with nothing to disclose
		// already renders flat. Hiding the readings reuses that shape rather than
		// dropping the contact.
		if (
			this.hideReadings ||
			(!meaning?.relationshipContext && !meaning?.description?.short)
		) {
			return html`<div class="interp-card" part="reading">
				<div class="static-head">${lead}${aside}</div>
			</div>`;
		}
		return html`<details class="interp-card" part="reading" name="synastry-aspects" ?open=${index === 0}>
			<summary>${lead}${chevron()}${aside}</summary>
			<div class="interp-body">
				${
					meaning.relationshipContext
						? html`<p><span class="context">${this.t('In this pairing')}</span> ${meaning.relationshipContext}</p>`
						: nothing
				}
				${meaning.description?.short ? html`<p>${meaning.description.short}</p>` : nothing}
				${
					meaning.keywords?.length
						? html`<div class="interp-keywords">${meaning.keywords.map((k) => html`<span class="kw">${k}</span>`)}</div>`
						: nothing
				}
			</div>
		</details>`;
	}

	/** Every remaining contact, so nothing the endpoint returned is dropped. */
	private renderCatalog(ranked: InterAspect[]) {
		return html`<details class="catalog">
			<summary>${chevron()} ${this.t('All {{count}} inter-aspects', { count: ranked.length })}</summary>
			<div class="scroll" part="table">${this.renderAspects(ranked)}</div>
		</details>`;
	}

	private toAngle(longitude: number): number {
		return 180 - longitude;
	}

	private renderSpokes() {
		return Array.from({ length: 12 }, (_, i) => {
			const angle = this.toAngle(i * 30);
			const start = polarToCartesian(CENTER, CENTER, P2_R - 14, angle);
			const end = polarToCartesian(CENTER, CENTER, OUTER_R, angle);
			return svg`<line class="wheel-line" x1=${start.x} y1=${start.y} x2=${end.x} y2=${end.y} stroke-width="0.6" />`;
		});
	}

	private renderSigns() {
		return SIGNS_ORDER.map((s, i) => {
			const angle = this.toAngle(i * 30 + 15);
			const pos = polarToCartesian(CENTER, CENTER, SIGN_R, angle);
			return svg`<text class="sign" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central">${signGlyph(s)}</text>`;
		});
	}

	private renderRing(
		planets: PlanetEntry[],
		radius: number,
		cls: string,
		personIndex: 1 | 2,
	) {
		return planets.map((p) => {
			if (!Number.isFinite(p.longitude)) return nothing;
			const angle = this.toAngle(p.longitude);
			const pos = polarToCartesian(CENTER, CENTER, radius, angle);
			// Degree label sits one tier inward from the glyph so the two
			// concentric rings never blur their numbers into the aspect lines.
			const degOffset = personIndex === 1 ? -12 : -10;
			const degPos = polarToCartesian(
				CENTER,
				CENTER,
				radius + degOffset,
				angle,
			);
			const glyph = planetGlyph(p.name) ?? p.name;
			const sp = longitudeToSignPosition(p.longitude);
			const retro = p.isRetrograde === true;
			const degLabel = `${sp.degree}°${String(sp.minute).padStart(2, '0')}'`;
			const tooltip = `${p.name}${retro ? ' retrograde' : ''} - ${degLabel} ${sp.sign}`;
			return svg`<g>
				<text class=${cls} x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central"><title>${tooltip}</title>${glyph}<tspan class="person-tag" dy="-0.55em" dx="0.15em">${personIndex}</tspan></text>
				<text class="planet-deg" x=${degPos.x} y=${degPos.y} text-anchor="middle" dominant-baseline="central">${sp.degree}°${retro ? svg`<tspan class="retro"> ℞</tspan>` : nothing}</text>
			</g>`;
		});
	}

	/**
	 * Ascendant markers for both people. Drawn as small spokes at the inner
	 * rim with the label outside, so the two rising signs are immediately
	 * scannable on the wheel without depending on tooltips.
	 */
	private renderAscendants(data: CalculateSynastryResponse) {
		const items: ReturnType<typeof svg>[] = [];
		const make = (
			asc: { sign: string; degree: number } | undefined,
			personIndex: 1 | 2,
		) => {
			if (!asc) return;
			const signIdx = SIGNS_ORDER.findIndex(
				(s) => s.toLowerCase() === asc.sign.toLowerCase(),
			);
			if (signIdx === -1) return;
			const longitude = signIdx * 30 + asc.degree;
			const angle = this.toAngle(longitude);
			const innerR = personIndex === 1 ? P1_R + 14 : P2_R + 14;
			const tickPos = polarToCartesian(CENTER, CENTER, innerR, angle);
			const labelPos = polarToCartesian(CENTER, CENTER, OUTER_R + 14, angle);
			items.push(svg`<g>
				<line class="asc-tick" x1=${tickPos.x} y1=${tickPos.y} x2=${labelPos.x} y2=${labelPos.y} />
				<text class="asc-label" x=${labelPos.x} y=${labelPos.y} text-anchor="middle" dominant-baseline="central">${this.t('ASC{{n}}', { n: personIndex })}</text>
			</g>`);
		};
		make(data.person1?.ascendant, 1);
		make(data.person2?.ascendant, 2);
		return items;
	}

	private renderInterAspectLines(
		p1: PlanetEntry[],
		p2: PlanetEntry[],
		aspects: InterAspect[],
	) {
		const longitudeOf = (
			list: PlanetEntry[],
			name: string,
		): number | undefined => {
			const target = capitalize(name);
			for (const p of list) {
				if (capitalize(p.name) !== target) continue;
				if (typeof p.longitude === 'number') return p.longitude;
			}
			return undefined;
		};
		return aspects.map((a) => {
			const l1 = longitudeOf(p1, a.planet1);
			const l2 = longitudeOf(p2, a.planet2);
			if (l1 === undefined || l2 === undefined) return nothing;
			const out = polarToCartesian(CENTER, CENTER, P1_R - 12, this.toAngle(l1));
			const inn = polarToCartesian(CENTER, CENTER, P2_R + 8, this.toAngle(l2));
			const aspectName = normalizeAspect(a);
			const cls = ASPECT_CLASS[aspectName] ?? 'aspect-other';
			const orbLabel = formatNumber(this.effectiveLang(), a.orb, 1);
			return svg`<line class=${`aspect ${cls}`} x1=${out.x} y1=${out.y} x2=${inn.x} y2=${inn.y}><title>${a.planet1} ${aspectName} ${a.planet2}${orbLabel ? ` (orb ${orbLabel}°)` : ''}</title></line>`;
		});
	}

	private renderAspects(aspects: InterAspect[]) {
		return html`<table>
			<caption class="roxy-sr-only">
				${this.t(
					'Inter-chart aspects: the planet from chart 1, the planet from chart 2, the aspect between them, the orb in degrees and the strength.',
				)}
			</caption>
			<thead>
				<tr>
					<th scope="col">${this.t('Planet 1')}</th>
					<th scope="col">${this.t('Planet 2')}</th>
					<th scope="col">${this.t('Aspect')}</th>
					<th scope="col">${this.t('Orb')}</th>
					<th scope="col">${this.t('Strength')}</th>
				</tr>
			</thead>
			<tbody>
				${aspects.map(
					(a) => html`<tr>
						<td>${a.planet1}</td>
						<td>${a.planet2}</td>
						<td>${formatAspectName(a)}</td>
						<td class="orb">${formatNumber(this.effectiveLang(), a.orb, 1)}</td>
						<td>${formatNumber(this.effectiveLang(), a.strength, 0)}</td>
					</tr>`,
				)}
			</tbody>
		</table>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-synastry-chart': RoxySynastryChart;
	}
}
