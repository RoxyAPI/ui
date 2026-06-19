import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { CalculatePentaResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';

/**
 * Human Design penta. Renders /human-design/penta: the group field (3 to 5 people) as the penta channels they form, split into the upper (direction) and lower (execution) triangles, with each channel marked defined or open and core or not, and which members hold each gate. The team/business chart.
 */
@customElement('roxy-hd-penta')
export class RoxyHdPenta extends RoxyDataElement<CalculatePentaResponse> {
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
			.section h3 {
				margin: 0 0 var(--roxy-space-xs, 0.25rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.row {
				display: flex;
				align-items: center;
				gap: var(--roxy-space-sm, 0.5rem);
				padding: var(--roxy-space-sm, 0.5rem) 0;
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
				font-size: var(--roxy-text-sm, 0.875rem);
				flex-wrap: wrap;
			}
			.row:last-child {
				border-bottom: none;
			}
			.gates {
				font-variant-numeric: tabular-nums;
				color: var(--roxy-accent-ink, #b45309);
				font-weight: var(--roxy-weight-bold, 600);
				min-width: 3.5rem;
			}
			.cname {
				flex: 1;
				min-width: 8rem;
			}
			.badge {
				display: inline-flex;
				padding: 1px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.badge.defined {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 16%, transparent);
				color: var(--roxy-success-fg, #166534);
			}
			.badge.open {
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 45%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}
			.badge.core {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 18%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}
		`,
	];

	protected renderData(d: CalculatePentaResponse) {
		const channels = d.channels ?? [];
		const upper = channels.filter((c) => c.position === 'upper');
		const lower = channels.filter((c) => c.position === 'lower');
		return html`<div class="wrap" aria-label="Human Design penta">
			<header class="head">
				<h2 class="title">Penta</h2>
				${typeof d.memberCount === 'number' ? html`<span class="count">${d.memberCount} members</span>` : nothing}
			</header>
			${this.renderSummary(d.summary)}
			${this.renderGroup('Upper (direction)', upper)}
			${this.renderGroup('Lower (execution)', lower)}
		</div>`;
	}

	private renderSummary(s: CalculatePentaResponse['summary'] | undefined) {
		if (!s) return nothing;
		const gaps = s.gapGates ?? [];
		return html`<div class="stats" aria-label="Penta summary">
			${typeof s.definedChannels === 'number' ? html`<span class="stat">Defined channels <b>${s.definedChannels}</b></span>` : nothing}
			${typeof s.filledGates === 'number' ? html`<span class="stat">Filled gates <b>${s.filledGates}</b></span>` : nothing}
			${gaps.length > 0 ? html`<span class="stat">Gap gates <b>${gaps.join(', ')}</b></span>` : nothing}
			${typeof s.coreDefined === 'boolean' ? html`<span class="stat">${s.coreDefined ? 'Core defined' : 'Core open'}</span>` : nothing}
		</div>`;
	}

	private renderGroup(
		label: string,
		channels: NonNullable<CalculatePentaResponse['channels']>,
	) {
		if (channels.length === 0) return nothing;
		return html`<div class="section">
			<h3>${label}</h3>
			${channels.map(
				(c) => html`<div class="row">
					<span class="gates">${c.gateA}-${c.gateB}</span>
					<span class="cname">${c.name ?? ''}</span>
					<span class="badge ${c.defined ? 'defined' : 'open'}">${c.defined ? 'Defined' : 'Open'}</span>
					${c.isCore ? html`<span class="badge core">Core</span>` : nothing}
				</div>`,
			)}
		</div>`;
	}

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No penta data</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-hd-penta': RoxyHdPenta;
	}
}
