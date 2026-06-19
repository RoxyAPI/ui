import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { CalculateConnectionResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { humanize } from '../utils/string.js';

/**
 * Human Design connection chart. Renders /human-design/connection: the composite of two charts as the electromagnetic / compromise / dominance channels they form together, plus the combined definition and a summary. The HD analog of synastry. Each channel row shows its two gates, name, circuit, the relationship dynamic, and which person carries which gate.
 */
@customElement('roxy-hd-connection')
export class RoxyHdConnection extends RoxyDataElement<CalculateConnectionResponse> {
	static styles = [
		baseStyles,
		css`
			.wrap {
				background: var(--roxy-surface, #fff);
				color: var(--roxy-fg, #0a0a0a);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}
			.head {
				display: flex;
				align-items: baseline;
				justify-content: space-between;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.count {
				color: var(--roxy-accent-ink, #b45309);
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: var(--roxy-weight-bold, 600);
				font-variant-numeric: tabular-nums;
			}
			.def {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-muted, #71717a);
			}
			.def strong {
				color: var(--roxy-fg, #0a0a0a);
				text-transform: capitalize;
			}
			.stats {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.stat {
				display: inline-flex;
				align-items: baseline;
				gap: 0.35rem;
				padding: 2px 10px;
				border-radius: var(--roxy-radius-full, 9999px);
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 12%, transparent);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-fg, #0a0a0a);
			}
			.stat b {
				color: var(--roxy-fg, #0a0a0a);
				font-variant-numeric: tabular-nums;
			}
			table {
				width: 100%;
				border-collapse: collapse;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			th,
			td {
				text-align: left;
				padding: var(--roxy-space-sm, 0.5rem);
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
				white-space: nowrap;
			}
			th {
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				font-size: var(--roxy-text-xs, 0.75rem);
				letter-spacing: 0.04em;
			}
			tbody tr:last-child td {
				border-bottom: none;
			}
			.gates {
				font-variant-numeric: tabular-nums;
				color: var(--roxy-accent-ink, #b45309);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.dyn {
				display: inline-block;
				padding: 1px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 16%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}
			.who {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			.scroll {
				overflow-x: auto;
			}
		`,
	];

	protected renderData(d: CalculateConnectionResponse) {
		const channels = d.channels ?? [];
		return html`<div class="wrap" aria-label="Human Design connection">
			<header class="head">
				<h2 class="title">Connection</h2>
				${typeof d.totalChannels === 'number' ? html`<span class="count">${d.totalChannels} channels</span>` : nothing}
			</header>
			${d.combinedDefinition ? html`<p class="def">Combined definition: <strong>${humanize(String(d.combinedDefinition))}</strong></p>` : nothing}
			${this.renderSummary(d.summary)}
			${
				channels.length > 0
					? html`<div class="scroll">
						<table role="table" aria-label="Connection channels">
							<thead>
								<tr>
									<th scope="col">Channel</th>
									<th scope="col">Gates</th>
									<th scope="col">Circuit</th>
									<th scope="col">Dynamic</th>
									<th scope="col">Held by</th>
								</tr>
							</thead>
							<tbody>
								${channels.map((c) => this.renderChannel(c))}
							</tbody>
						</table>
					</div>`
					: nothing
			}
		</div>`;
	}

	private renderSummary(s: CalculateConnectionResponse['summary'] | undefined) {
		if (!s) return nothing;
		// The four ways two charts meet in a channel, in canonical HD order.
		const rows: Array<[string, number | undefined]> = [
			['Electromagnetic', s.electromagnetic],
			['Dominance', s.dominance],
			['Compromise', s.compromise],
			['Companionship', s.companionship],
		];
		return html`<div class="stats" aria-label="Channel dynamics">
			${rows.map(([label, n]) => (typeof n === 'number' ? html`<span class="stat">${label} <b>${n}</b></span>` : nothing))}
		</div>`;
	}

	private renderChannel(
		c: NonNullable<CalculateConnectionResponse['channels']>[number],
	) {
		const a = c.personAGates ?? [];
		const b = c.personBGates ?? [];
		const held =
			[a.length ? 'A' : '', b.length ? 'B' : ''].filter(Boolean).join(' + ') ||
			'-';
		return html`<tr>
			<td>${c.name ?? ''}</td>
			<td class="gates">${c.gateA}-${c.gateB}</td>
			<td>${c.circuit ?? ''}</td>
			<td>${c.dynamic ? html`<span class="dyn">${c.dynamic}</span>` : ''}</td>
			<td class="who">${held}</td>
		</tr>`;
	}

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No connection data</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-hd-connection': RoxyHdConnection;
	}
}
