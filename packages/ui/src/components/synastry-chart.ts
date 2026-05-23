import { css, html, LitElement, nothing, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PLANET_GLYPH, SIGN_GLYPH, SIGNS_ORDER } from '../tokens/index.js';
import type {
	CalculateSynastryResponse,
	NatalChartResponse,
} from '../types/index.js';
import { baseStyles } from '../utils/base-styles.js';
import { longitudeToSignPosition, polarToCartesian } from '../utils/degree.js';
import {
	ASPECT_CLASS,
	formatNumber,
	normalizeAspect,
} from '../utils/format.js';
import { MarkupDataController } from '../utils/markup-data.js';
import { capitalize } from '../utils/string.js';

type PlanetEntry = NatalChartResponse['planets'][number];
type InterAspect = CalculateSynastryResponse['interAspects'][number];

// Drawing the dual wheel requires per-person planet longitudes alongside
// the synastry response. Callers can merge planet arrays from
// /astrology/natal-chart into `person1.planets` and `person2.planets`
// before passing the payload in; without them, the component falls back
// to the inter-aspects table and a status note instead of an empty wheel.
type SynastryWithPlanets = CalculateSynastryResponse & {
	person1?: { planets?: PlanetEntry[] };
	person2?: { planets?: PlanetEntry[] };
};

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
export class RoxySynastryChart extends LitElement {
	static styles = [
		baseStyles,
		css`
			.wrap {
				display: grid;
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
				max-width: 560px;
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

	constructor() {
		super();
		// Enables hydrating `data` from a direct-child
		// <script type="application/json" class="roxy-data"> for server-rendered
		// and cached consumers. The JavaScript `data` property still wins.
		new MarkupDataController(this);
	}

	@property({ attribute: false })
	data: SynastryWithPlanets | null = null;

	render() {
		if (!this.data)
			return html`<div class="roxy-empty" role="status">No synastry data</div>`;
		const { person1, person2, compatibilityScore, analysis } = this.data;
		const interAspects = this.data.interAspects ?? [];
		const p1Planets = person1?.planets ?? [];
		const p2Planets = person2?.planets ?? [];

		const score =
			typeof compatibilityScore === 'number'
				? Math.round(compatibilityScore)
				: undefined;
		const summaryText = analysis?.overall;
		const strengths = analysis?.strengths ?? [];
		const challenges = analysis?.challenges ?? [];

		// /astrology/synastry does not return per-person planet positions, so the
		// dual-wheel cannot be drawn from a bare synastry response. Surface this
		// explicitly instead of rendering a blank wheel; keep the inter-aspects
		// table when it is present so callers still get useful output.
		const hasPlanets = p1Planets.length > 0 && p2Planets.length > 0;
		if (!hasPlanets) {
			return html`<div
				class="wrap"
				aria-label="Synastry compatibility chart"
			>
				<div class="head">
					<h2 class="title">Synastry</h2>
					${
						typeof score === 'number'
							? html`<span class="score" aria-label=${`Score ${score} of 100`}
								>${score} / 100</span
							>`
							: nothing
					}
				</div>
				<div class="missing-planets" role="status">
					Synastry response missing planet positions. Pass
					<code>data</code> with <code>person1.planets</code> and
					<code>person2.planets</code> arrays from the natal-chart endpoint, or
					use the <code>&lt;roxy-data&gt;</code> fallback.
				</div>
				${summaryText ? html`<p class="summary">${summaryText}</p>` : nothing}
				${interAspects.length > 0 ? this.renderAspects(interAspects) : nothing}
				${
					strengths.length > 0 || challenges.length > 0
						? html`<div class="lists">
							${
								strengths.length
									? html`<div>
										<h3>Strengths</h3>
										<ul>
											${strengths.map((s) => html`<li>${s}</li>`)}
										</ul>
									</div>`
									: nothing
							}
							${
								challenges.length
									? html`<div>
										<h3>Challenges</h3>
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

		return html`<div
			class="wrap"
			aria-label="Synastry compatibility chart"
		>
			<div class="head">
				<h2 class="title">Synastry</h2>
				${
					typeof score === 'number'
						? html`<span class="score" aria-label=${`Score ${score} of 100`}
							>${score} / 100</span
						>`
						: nothing
				}
			</div>
			<svg
				viewBox="0 0 ${SIZE} ${SIZE}"
				role="img"
				aria-label="Dual chart wheel comparing two natal charts"
			>
				<title>Synastry dual wheel</title>
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
				${this.renderAscendants(this.data)}
			</svg>
			<div class="legend-row">
				<span><span class="swatch" style="background: var(--roxy-accent)"></span>Person 1</span>
				<span><span class="swatch" style="background: var(--roxy-info)"></span>Person 2</span>
				<span><span class="swatch" style="background: var(--roxy-success)"></span>harmonious</span>
				<span><span class="swatch" style="background: var(--roxy-danger)"></span>challenging</span>
			</div>
			${summaryText ? html`<p class="summary">${summaryText}</p>` : nothing}
			${interAspects.length > 0 ? this.renderAspects(interAspects) : nothing}
			${
				strengths.length > 0 || challenges.length > 0
					? html`<div class="lists">
						${
							strengths.length
								? html`<div>
									<h3>Strengths</h3>
									<ul>
										${strengths.map((s) => html`<li>${s}</li>`)}
									</ul>
								</div>`
								: nothing
						}
						${
							challenges.length
								? html`<div>
									<h3>Challenges</h3>
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
			return svg`<text class="sign" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central">${SIGN_GLYPH[s]}</text>`;
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
			const glyph = PLANET_GLYPH[capitalize(p.name)] ?? p.name.slice(0, 2);
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
	private renderAscendants(data: SynastryWithPlanets) {
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
				<text class="asc-label" x=${labelPos.x} y=${labelPos.y} text-anchor="middle" dominant-baseline="central">Asc${personIndex}</text>
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
			const orbLabel = formatNumber(a.orb, 1);
			return svg`<line class=${`aspect ${cls}`} x1=${out.x} y1=${out.y} x2=${inn.x} y2=${inn.y}><title>${a.planet1} ${aspectName} ${a.planet2}${orbLabel ? ` (orb ${orbLabel}°)` : ''}</title></line>`;
		});
	}

	private renderAspects(aspects: InterAspect[]) {
		return html`<table>
			<thead>
				<tr>
					<th>Planet 1</th>
					<th>Planet 2</th>
					<th>Aspect</th>
					<th>Orb</th>
					<th>Strength</th>
				</tr>
			</thead>
			<tbody>
				${aspects.slice(0, 12).map(
					(a) => html`<tr>
						<td>${a.planet1}</td>
						<td>${a.planet2}</td>
						<td>${normalizeAspect(a) || ''}</td>
						<td class="orb">${formatNumber(a.orb, 1)}</td>
						<td>${formatStrength(a.strength)}</td>
					</tr>`,
				)}
			</tbody>
		</table>`;
	}
}

function formatStrength(s: number | undefined): string {
	if (typeof s === 'number') return Math.round(s).toString();
	return '';
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-synastry-chart': RoxySynastryChart;
	}
}
