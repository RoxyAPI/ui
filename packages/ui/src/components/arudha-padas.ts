import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { SIGN_GLYPH } from '../tokens/index.js';
import type { ArudhaResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { capitalize } from '../utils/string.js';

type Pada = ArudhaResponse['padas'][number];

/** The two padas lifted to the top of the response, and what each is read for. Both are marked in the table too, so the summary and the rows agree. */
const LEAD_IDS = new Set(['a1', 'a12']);

/**
 * Arudha padas. Renders /vedic-astrology/arudha: the twelve Jaimini padas, each with the bhava it belongs to, the lord and the count that produced it, the sign it lands in, and what it is read for.
 *
 * @remarks
 * All twelve render, and two are marked. The Arudha Lagna (AL, the pada of the first house) is the one most readings start from, and the Upapada (UL, the pada of the twelfth) is the one a marriage reading turns on, so a table that shows only the AL is missing the second question it will be asked.
 *
 * The derivation is shown, not just the answer. Each row carries the bhava sign, its lord and the lord's sign, which is the count a reader checks by hand, plus a mark where the classical exception fired: a pada that fell in its own bhava or the seventh from it is moved to the tenth from there, and that step is the one implementations most often skip.
 */
@customElement('roxy-arudha-padas')
export class RoxyArudhaPadas extends RoxyDataElement<ArudhaResponse> {
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
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
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
				min-width: 700px;
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
			tbody tr.lead-row {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 10%, transparent);
			}
			td.pada {
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-fg, #0a0a0a);
			}
			.abbr {
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-normal, 400);
				margin-left: 0.4em;
			}
			tbody tr.lead-row .abbr,
			tbody tr.lead-row .glyph {
				color: var(--roxy-accent-ink, #b45309);
			}
			.glyph {
				margin-right: 0.4em;
				color: var(--roxy-muted, #71717a);
			}
			.num {
				font-variant-numeric: tabular-nums;
			}
			.exception {
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-warning-fg, #b45309);
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
			.note {
				margin: 0;
				padding: 0 var(--roxy-space-md, 1rem) var(--roxy-space-md, 1rem);
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				line-height: var(--roxy-leading-normal, 1.5);
			}
		`,
	];

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No arudha pada data</div>`;
	}

	protected renderData(d: ArudhaResponse) {
		const padas = d.padas ?? [];
		if (!padas.length) return this.renderEmpty();
		const exceptions = padas.filter((p) => p.exceptionApplied).length;

		return html`<div class="wrap" aria-label="Arudha padas">
			<header class="head">
				<h2 class="title">Arudha padas</h2>
			</header>
			<div class="leads">
				<div class="lead"><span>Lagna</span><strong>${d.lagnaRashi ?? ''}</strong></div>
				<div class="lead">
					<span>Arudha Lagna</span><strong>${d.arudhaLagna ?? ''}</strong>
				</div>
				<div class="lead"><span>Upapada</span><strong>${d.upapada ?? ''}</strong></div>
			</div>
			<div class="scroll" tabindex="0">
				<table role="table">
					<caption class="roxy-sr-only">
						The twelve Arudha padas: each pada with its bhava, the bhava sign and its lord,
						the sign the lord occupies, the sign the pada falls in, which house from the
						Lagna that is, whether the classical exception was applied, and what the pada is
						read for.
					</caption>
					<thead>
						<tr>
							<th scope="col">Pada</th>
							<th scope="col">Bhava</th>
							<th scope="col">Bhava rashi</th>
							<th scope="col">Lord</th>
							<th scope="col">Lord rashi</th>
							<th scope="col">Pada rashi</th>
							<th scope="col">From Lagna</th>
							<th scope="col">Read for</th>
						</tr>
					</thead>
					<tbody>
						${padas.map((p) => this.renderRow(p))}
					</tbody>
				</table>
			</div>
			${
				exceptions > 0
					? html`<p class="note">
						<span class="exception">Moved</span> marks a pada that fell in its own bhava or
						the seventh from it and was moved to the tenth from there, as the classical rule
						requires. ${exceptions} of ${padas.length} padas here.
					</p>`
					: nothing
			}
		</div>`;
	}

	private renderRow(p: Pada) {
		const glyph = (sign?: string) => SIGN_GLYPH[capitalize(sign ?? '')] ?? '';
		const cell = (sign?: string) => {
			const g = glyph(sign);
			return html`${g ? html`<span class="glyph">${g}</span>` : nothing}${sign ?? ''}`;
		};
		return html`<tr class=${LEAD_IDS.has(p.id) ? 'lead-row' : ''}>
			<td class="pada">
				${p.name ?? ''}${p.abbreviation ? html`<span class="abbr">${p.abbreviation}</span>` : nothing}
			</td>
			<td class="num">${p.house ?? ''}</td>
			<td>${cell(p.bhavaRashi)}</td>
			<td>${p.lord ?? ''}</td>
			<td>${cell(p.lordRashi)}</td>
			<td>
				${cell(p.rashi)}
				${p.exceptionApplied ? html`<span class="exception">Moved</span>` : nothing}
			</td>
			<td class="num">${p.houseFromLagna ?? ''}</td>
			<td class="meaning">
				<strong>${p.meaning ?? ''}</strong>
				${p.significations ? html`<p>${p.significations}</p>` : nothing}
			</td>
		</tr>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-arudha-padas': RoxyArudhaPadas;
	}
}
