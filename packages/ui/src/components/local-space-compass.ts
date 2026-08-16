import { css, html, nothing, svg } from 'lit';
import { customElement } from 'lit/decorators.js';
import { planetGlyph } from '../tokens/index.js';
import type { LocalSpaceResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatDateTime } from '../utils/format.js';
import { planetColor } from '../utils/planet-color.js';

type Body = LocalSpaceResponse['bodies'][number];

const SIZE = 320;
const CENTER = SIZE / 2;
const RIM = 128;
const SPOKE = 118;
const GLYPH_R = 140;
const TICK_LABEL_R = 150;

// Compass azimuth (0 = north, clockwise) to a screen point. North is up, east
// is right, matching how the local space line is read off a real compass.
function azimuthPoint(az: number, r: number): { x: number; y: number } {
	const rad = (az * Math.PI) / 180;
	return { x: CENTER + r * Math.sin(rad), y: CENTER - r * Math.cos(rad) };
}

const PRINCIPAL = [
	{ az: 0, label: 'N' },
	{ az: 45, label: 'NE' },
	{ az: 90, label: 'E' },
	{ az: 135, label: 'SE' },
	{ az: 180, label: 'S' },
	{ az: 225, label: 'SW' },
	{ az: 270, label: 'W' },
	{ az: 315, label: 'NW' },
];

/**
 * Local space compass. Plots each body from a /astrology/local-space response as
 * a directional line radiating from the birthplace at its azimuth (0 = north,
 * clockwise), with a 16-point ring. Bodies below the horizon are dimmed. Color
 * is per body and theme-token driven.
 */
@customElement('roxy-local-space-compass')
export class RoxyLocalSpaceCompass extends RoxyDataElement<LocalSpaceResponse> {
	static styles = [
		baseStyles,
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
				/* Never an implicit auto column: it floors at min-content, so one long
				 * unbreakable string widens the track past the padded card. */
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
				max-width: var(--roxy-chart-max-width, 480px);
				aspect-ratio: 1 / 1;
				height: auto;
				margin: 0 auto;
			}
			.dial {
				fill: none;
				stroke: var(--roxy-border, #e4e4e7);
			}
			.dial-fill {
				fill: color-mix(in srgb, var(--roxy-border, #e4e4e7) 10%, transparent);
				stroke: var(--roxy-border, #e4e4e7);
				stroke-width: 1;
			}
			.cardinal-axis {
				stroke: var(--roxy-border, #e4e4e7);
				stroke-width: 0.5;
			}
			.tick {
				stroke: var(--roxy-secondary, #475569);
				stroke-width: 0.6;
				opacity: 0.5;
			}
			.compass-label {
				fill: var(--roxy-secondary, #475569);
				font-size: 9px;
				font-weight: 600;
				font-family: var(--roxy-font-sans);
			}
			.compass-label.cardinal {
				fill: var(--roxy-fg, #0a0a0a);
			}
			.center-dot {
				fill: var(--roxy-fg, #0a0a0a);
			}
			.spoke {
				stroke-width: 1.4;
			}
			.spoke.below {
				stroke-dasharray: 3 3;
				opacity: 0.4;
			}
			.body-glyph {
				font-size: 11px;
				font-weight: 600;
				font-family: var(--roxy-font-sans);
			}
			.body-glyph.below {
				opacity: 0.45;
			}

			/* A grid item keeps min-width: auto, so it refuses to shrink below its
			 * min-content and instead widens the track. One wide table therefore
			 * dragged the header, dial and summary out past the card edge with it,
			 * and the overflow was unreachable because nothing scrolled. Let the
			 * items shrink and give the table its own scroller. */
			.wrap > * {
				min-width: 0;
			}
			.table-scroll {
				overflow-x: auto;
				min-width: 0;
				-webkit-overflow-scrolling: touch;
			}
			.list {
				width: 100%;
				border-collapse: collapse;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.list th,
			.list td {
				text-align: left;
				padding: 4px 8px;
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
			}
			.list th {
				color: var(--roxy-muted, #71717a);
				font-weight: 600;
				text-transform: uppercase;
				letter-spacing: 0.04em;
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			.list td.num {
				text-align: right;
				font-variant-numeric: tabular-nums;
			}
			.body-cell {
				display: inline-flex;
				align-items: center;
				gap: 0.4rem;
			}
			.body-dot {
				width: 10px;
				height: 10px;
				border-radius: 50%;
				flex-shrink: 0;
			}
			.horizon-pill {
				padding: 1px 7px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			.horizon-pill.up {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 16%, transparent);
				color: var(--roxy-success-fg, #166534);
			}
			.horizon-pill.down {
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 55%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}
			.summary {
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-sm, 0.875rem);
				margin: 0;
			}
		`,
	];

	protected renderData(data: LocalSpaceResponse) {
		const bodies = data.bodies ?? [];
		const bd = data.birthDetails;
		return html`<div class="wrap" part="card">
			<header part="header">
				<h2 class="title">Local space</h2>
				${
					bd
						? html`<div class="meta">${formatDateTime(this.effectiveLang(), bd.date, bd.time)}</div>`
						: nothing
				}
			</header>
			${this.renderDial(bodies)}
			${data.summary ? html`<p class="summary">${data.summary}</p>` : nothing}
			${this.renderList(bodies)}
		</div>`;
	}

	private renderDial(bodies: Body[]) {
		return html`<svg
			viewBox="0 0 ${SIZE} ${SIZE}"
			part="chart"
			role="img"
			aria-label="Local space compass of planetary directions from the birthplace"
		>
			<title>Local space compass</title>
			<desc>
				A compass centered on the birthplace. Each body is a line pointing to
				its azimuth, clockwise from north. Bodies below the horizon are dimmed.
			</desc>
			<circle class="dial-fill" cx=${CENTER} cy=${CENTER} r=${RIM} />
			<circle class="dial" cx=${CENTER} cy=${CENTER} r=${RIM * 0.66} stroke-width="0.5" />
			<circle class="dial" cx=${CENTER} cy=${CENTER} r=${RIM * 0.33} stroke-width="0.5" />
			${this.renderCompassRing()}
			${this.renderSpokes(bodies)}
			<circle class="center-dot" cx=${CENTER} cy=${CENTER} r="2.5" />
		</svg>`;
	}

	private renderCompassRing() {
		const ticks = [];
		// 16-point ring: a tick every 22.5 degrees.
		for (let az = 0; az < 360; az += 22.5) {
			const outer = azimuthPoint(az, RIM);
			const inner = azimuthPoint(az, RIM - (az % 45 === 0 ? 8 : 4));
			ticks.push(
				svg`<line class="tick" x1=${inner.x} y1=${inner.y} x2=${outer.x} y2=${outer.y} />`,
			);
		}
		// Cardinal cross.
		const ns1 = azimuthPoint(0, RIM);
		const ns2 = azimuthPoint(180, RIM);
		const ew1 = azimuthPoint(90, RIM);
		const ew2 = azimuthPoint(270, RIM);
		const labels = PRINCIPAL.map(({ az, label }) => {
			const pos = azimuthPoint(az, TICK_LABEL_R);
			const cardinal = az % 90 === 0;
			return svg`<text class=${`compass-label${cardinal ? ' cardinal' : ''}`} x=${pos.x} y=${pos.y} text-anchor="middle" dominant-baseline="central">${label}</text>`;
		});
		return svg`
			<line class="cardinal-axis" x1=${ns1.x} y1=${ns1.y} x2=${ns2.x} y2=${ns2.y} />
			<line class="cardinal-axis" x1=${ew1.x} y1=${ew1.y} x2=${ew2.x} y2=${ew2.y} />
			${ticks}${labels}`;
	}

	private renderSpokes(bodies: Body[]) {
		return bodies.map((b, i) => {
			const color = planetColor(b.planet, i);
			const below = b.aboveHorizon === false;
			const end = azimuthPoint(b.azimuth, SPOKE);
			const glyphPos = azimuthPoint(b.azimuth, GLYPH_R);
			// Response symbol first, then the shared table, then the full name. Never a
			// truncation: `North Node.slice(0, 2)` drew a compass spoke labelled "No".
			const glyph = b.symbol || planetGlyph(b.planet) || b.planet;
			const altLabel = `${b.altitude > 0 ? '+' : ''}${Math.round(b.altitude)}°`;
			return svg`<g>
				<line class=${`spoke${below ? ' below' : ''}`} stroke=${color} x1=${CENTER} y1=${CENTER} x2=${end.x} y2=${end.y}><title>${b.planet} ${b.compassDirection} ${Math.round(b.azimuth)}° altitude ${altLabel}</title></line>
				<text class=${`body-glyph${below ? ' below' : ''}`} fill=${color} x=${glyphPos.x} y=${glyphPos.y} text-anchor="middle" dominant-baseline="central">${glyph}</text>
			</g>`;
		});
	}

	private renderList(bodies: Body[]) {
		if (bodies.length === 0) return nothing;
		return html`<div class="table-scroll" part="table"><table class="list">
			<caption class="roxy-sr-only">
				Local space directions: each body with its compass direction, azimuth,
				altitude and whether it sits above or below the horizon.
			</caption>
			<thead>
				<tr>
					<th scope="col">Body</th>
					<th scope="col">Direction</th>
					<th scope="col" class="num">Azimuth</th>
					<th scope="col" class="num">Altitude</th>
					<th scope="col">Horizon</th>
				</tr>
			</thead>
			<tbody>
				${bodies.map((b, i) => {
					const color = planetColor(b.planet, i);
					const below = b.aboveHorizon === false;
					return html`<tr>
						<td>
							<span class="body-cell">
								<span class="body-dot" style=${`background: ${color}`}></span>
								${b.symbol ? html`${b.symbol} ` : nothing}${b.planet}
							</span>
						</td>
						<td>${b.compassDirection}</td>
						<td class="num">${Math.round(b.azimuth)}°</td>
						<td class="num">${b.altitude > 0 ? '+' : ''}${Math.round(b.altitude)}°</td>
						<td>
							<span class=${`horizon-pill ${below ? 'down' : 'up'}`}>
								${below ? 'Below' : 'Above'}
							</span>
						</td>
					</tr>`;
				})}
			</tbody>
		</table></div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-local-space-compass': RoxyLocalSpaceCompass;
	}
}
