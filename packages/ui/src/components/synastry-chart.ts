import { css, html, LitElement, nothing, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PLANET_GLYPH, SIGN_GLYPH } from '../tokens/index.js';
import { baseStyles } from '../utils/base-styles.js';
import { polarToCartesian } from '../utils/degree.js';

interface PlanetEntry {
	name?: string;
	planet?: string;
	longitude?: number;
	degree?: number;
	sign?: string;
}

interface InterAspect {
	planet1?: string;
	planet2?: string;
	aspect?: string;
	orb?: number;
	strength?: string;
	interpretation?: string;
}

interface SynastryData {
	person1?: {
		planets?: PlanetEntry[] | Record<string, PlanetEntry>;
		name?: string;
	};
	person2?: {
		planets?: PlanetEntry[] | Record<string, PlanetEntry>;
		name?: string;
	};
	compatibilityScore?: number;
	summary?: string;
	interAspects?: InterAspect[];
	strengths?: string[];
	challenges?: string[];
}

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
				color: var(--roxy-accent-fg, #b45309);
				font-size: var(--roxy-text-xl, 1.5rem);
			}

			svg {
				display: block;
				width: 100%;
				max-width: 400px;
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
		`,
	];

	@property({ attribute: false })
	data: SynastryData | null = null;

	render() {
		if (!this.data)
			return html`<div class="roxy-empty" role="status">No synastry data</div>`;
		const {
			person1,
			person2,
			compatibilityScore,
			summary,
			interAspects = [],
		} = this.data;
		const p1Planets = this.normalizePlanets(person1?.planets);
		const p2Planets = this.normalizePlanets(person2?.planets);

		return html`<div
			class="wrap"
			aria-label="Synastry compatibility chart"
		>
			<div class="head">
				<h2 class="title">Synastry</h2>
				${
					typeof compatibilityScore === 'number'
						? html`<span class="score" aria-label=${`Score ${compatibilityScore} of 100`}
							>${compatibilityScore} / 100</span
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
				${this.renderRing(p1Planets, P1_R, 'p1')} ${this.renderRing(p2Planets, P2_R, 'p2')}
			</svg>
			${summary ? html`<p class="summary">${summary}</p>` : nothing}
			${interAspects.length > 0 ? this.renderAspects(interAspects) : nothing}
			${
				(this.data.strengths?.length ?? 0) > 0 ||
				(this.data.challenges?.length ?? 0) > 0
					? html`<div class="lists">
						${
							this.data.strengths?.length
								? html`<div>
									<h3>Strengths</h3>
									<ul>
										${this.data.strengths.map((s) => html`<li>${s}</li>`)}
									</ul>
								</div>`
								: nothing
						}
						${
							this.data.challenges?.length
								? html`<div>
									<h3>Challenges</h3>
									<ul>
										${this.data.challenges.map((s) => html`<li>${s}</li>`)}
									</ul>
								</div>`
								: nothing
						}
					</div>`
					: nothing
			}
		</div>`;
	}

	private normalizePlanets(
		p: PlanetEntry[] | Record<string, PlanetEntry> | undefined,
	) {
		if (!p) return [];
		if (Array.isArray(p)) return p;
		return Object.entries(p).map(([name, e]) => ({ ...e, name }));
	}

	private renderSpokes() {
		return Array.from({ length: 12 }, (_, i) => {
			const angle = i * 30 - 90;
			const start = polarToCartesian(CENTER, CENTER, P2_R - 14, angle);
			const end = polarToCartesian(CENTER, CENTER, OUTER_R, angle);
			return svg`<line class="wheel-line" x1=${start.x} y1=${start.y} x2=${end.x} y2=${end.y} stroke-width="0.6" />`;
		});
	}

	private renderSigns() {
		const order = [
			'Aries',
			'Taurus',
			'Gemini',
			'Cancer',
			'Leo',
			'Virgo',
			'Libra',
			'Scorpio',
			'Sagittarius',
			'Capricorn',
			'Aquarius',
			'Pisces',
		];
		return order.map((s, i) => {
			const angle = i * 30 + 15 - 90;
			const pos = polarToCartesian(CENTER, CENTER, SIGN_R, angle);
			return svg`<text class="sign" x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central">${SIGN_GLYPH[s]}</text>`;
		});
	}

	private renderRing(planets: PlanetEntry[], radius: number, cls: string) {
		return planets.map((p) => {
			const lon =
				typeof p.longitude === 'number'
					? p.longitude
					: typeof p.degree === 'number'
						? p.degree
						: NaN;
			if (!Number.isFinite(lon)) return nothing;
			const pos = polarToCartesian(CENTER, CENTER, radius, lon - 90);
			const name = p.name ?? p.planet ?? '';
			const glyph = PLANET_GLYPH[capitalize(name)] ?? name.slice(0, 2);
			return svg`<text class=${cls} x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central"><title>${name}</title>${glyph}</text>`;
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
				${aspects.slice(0, 16).map(
					(a) => html`<tr>
						<td>${a.planet1 ?? ''}</td>
						<td>${a.planet2 ?? ''}</td>
						<td>${a.aspect ?? ''}</td>
						<td class="orb">
							${typeof a.orb === 'number' ? a.orb.toFixed(1) : ''}
						</td>
						<td>${a.strength ?? ''}</td>
					</tr>`,
				)}
			</tbody>
		</table>`;
	}
}

function capitalize(s: string): string {
	if (!s) return '';
	return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-synastry-chart': RoxySynastryChart;
	}
}
