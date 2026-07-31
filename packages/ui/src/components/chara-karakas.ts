import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PLANET_GLYPH, SIGN_GLYPH } from '../tokens/index.js';
import type { CharaKarakaResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatNumber } from '../utils/format.js';
import { capitalize } from '../utils/string.js';

type Karaka = CharaKarakaResponse['karakas'][number];

/** What each scheme is, stated on the card rather than left implicit. Read from the response `scheme`, which the API echoes for exactly this reason. */
const SCHEMES: Record<string, string> = {
	eight:
		'Eight karaka scheme, Rahu included and ranked from the end of its sign.',
	seven:
		'Seven karaka scheme, Rahu excluded and the Pitrikaraka office not assigned.',
};

/**
 * Chara Karakas. Renders /vedic-astrology/chara-karakas: the movable significators of Jaimini astrology, the offices ranked by how far each graha has advanced into its sign, Atmakaraka first.
 *
 * @remarks
 * The scheme is shown, never hidden. The seven and eight karaka schemes name a DIFFERENT Atmakaraka on the same chart, so a reader who follows one school has to be able to see at a glance which one produced the ranking in front of them. The value is the one the response echoes, so the label can never disagree with the ranking beside it.
 *
 * Rahu is flagged where it appears. It advances backward through a sign, so it is ranked on thirty degrees minus its position, and the response carries both figures: the degree a chart displays and the degree that earned the office. Showing only one of them makes the order look wrong.
 */
@customElement('roxy-chara-karakas')
export class RoxyCharaKarakas extends RoxyDataElement<CharaKarakaResponse> {
	static styles = [
		baseStyles,
		css`
			.wrap {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				background: var(--roxy-surface, #fff);
				box-shadow: var(--roxy-shadow-sm);
				overflow: hidden;
			}
			.head {
				padding: var(--roxy-space-md, 1rem);
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.scheme {
				display: flex;
				flex-wrap: wrap;
				align-items: baseline;
				gap: var(--roxy-space-sm, 0.5rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				line-height: var(--roxy-leading-normal, 1.5);
			}
			.scheme-chip {
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				letter-spacing: 0.05em;
				padding: 0.15em 0.6em;
				border-radius: 999px;
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 16%, transparent);
				color: var(--roxy-accent-ink, #b45309);
			}
			.leads {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
				gap: var(--roxy-space-md, 1rem);
				padding: var(--roxy-space-md, 1rem);
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
			}
			.lead span {
				display: block;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.lead strong {
				font-size: var(--roxy-text-base, 1rem);
				color: var(--roxy-fg, #0a0a0a);
			}
			.scroll {
				overflow-x: auto;
				min-width: 0;
			}
			table {
				width: 100%;
				border-collapse: collapse;
				font-size: var(--roxy-text-sm, 0.875rem);
				min-width: 640px;
			}
			thead {
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 20%, transparent);
			}
			th,
			td {
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				text-align: left;
				white-space: nowrap;
			}
			th {
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				font-size: var(--roxy-text-xs, 0.75rem);
				letter-spacing: 0.04em;
			}
			tbody tr {
				border-top: 1px solid var(--roxy-border, #e4e4e7);
			}
			/* The Atmakaraka outranks every graha in the chart, so the first row is
			 * marked rather than left to be counted. */
			tbody tr.ak {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 10%, transparent);
			}
			td.office {
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-fg, #0a0a0a);
			}
			.abbr {
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-normal, 400);
				margin-left: 0.4em;
			}
			tbody tr.ak .abbr {
				color: var(--roxy-accent-ink, #b45309);
			}
			.glyph {
				margin-right: 0.4em;
				color: var(--roxy-muted, #71717a);
			}
			tbody tr.ak .glyph {
				color: var(--roxy-accent-ink, #b45309);
			}
			.num {
				font-variant-numeric: tabular-nums;
			}
			.reversed {
				display: block;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			.meaning {
				white-space: normal;
				min-width: 12rem;
			}
			.meaning strong {
				display: block;
				font-weight: var(--roxy-weight-bold, 600);
			}
			.meaning p {
				margin: 0;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				line-height: var(--roxy-leading-normal, 1.5);
			}
		`,
	];

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No chara karaka data</div>`;
	}

	protected renderData(d: CharaKarakaResponse) {
		const karakas = d.karakas ?? [];
		if (!karakas.length) return this.renderEmpty();

		return html`<div class="wrap" aria-label="Chara karakas">
			<header class="head">
				<h2 class="title">Chara karakas</h2>
				<p class="scheme">
					<span class="scheme-chip">${d.scheme ?? ''}</span>
					${d.scheme ? (SCHEMES[d.scheme] ?? '') : ''}
				</p>
			</header>
			<div class="leads">
				<div class="lead"><span>Atmakaraka</span><strong>${d.atmakaraka ?? ''}</strong></div>
				<div class="lead"><span>Darakaraka</span><strong>${d.darakaraka ?? ''}</strong></div>
			</div>
			<div class="scroll" tabindex="0">
				<table role="table">
					<caption class="roxy-sr-only">
						Chara karakas in descending rank: each office, the graha holding it, its rashi,
						the degree it holds, the degree that earned the office, and what the office is
						read for.
					</caption>
					<thead>
						<tr>
							<th scope="col">Office</th>
							<th scope="col">Graha</th>
							<th scope="col">Rashi</th>
							<th scope="col">Degree</th>
							<th scope="col">Ranked on</th>
							<th scope="col">Read for</th>
						</tr>
					</thead>
					<tbody>
						${karakas.map((k, i) => this.renderRow(k, i === 0))}
					</tbody>
				</table>
			</div>
		</div>`;
	}

	private renderRow(k: Karaka, isFirst: boolean) {
		const glyph = PLANET_GLYPH[capitalize(k.graha ?? '')] ?? '';
		const signGlyph = SIGN_GLYPH[capitalize(k.rashi ?? '')] ?? '';
		return html`<tr class=${isFirst ? 'ak' : ''}>
			<td class="office">
				${k.name ?? ''}${k.abbreviation ? html`<span class="abbr">${k.abbreviation}</span>` : nothing}
			</td>
			<td>
				${glyph ? html`<span class="glyph">${glyph}</span>` : nothing}${k.graha ?? ''}
			</td>
			<td>
				${signGlyph ? html`<span class="glyph">${signGlyph}</span>` : nothing}${k.rashi ?? ''}
			</td>
			<td class="num">${formatNumber(k.degreeInRashi, 2)}</td>
			<td class="num">
				${formatNumber(k.rankingDegree, 2)}
				${k.isReversed ? html`<span class="reversed">measured from the end of the sign</span>` : nothing}
			</td>
			<td class="meaning">
				<strong>${k.meaning ?? ''}</strong>
				${k.significations ? html`<p>${k.significations}</p>` : nothing}
			</td>
		</tr>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-chara-karakas': RoxyCharaKarakas;
	}
}
