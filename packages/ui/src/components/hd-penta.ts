import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { CalculatePentaResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { hdReadingStyles, renderHdFacts } from '../utils/hd-reading.js';

type Penta = CalculatePentaResponse;
type PentaChannel = Penta['channels'][number];
type PentaGate = Penta['gates'][number];

/**
 * Human Design penta. Renders /human-design/penta: the group field (3 to 5 people) as the penta channels they form, split into the upper (direction) and lower (execution) triangles, with each channel marked defined or open and core or not, and which members hold each gate. The team/business chart.
 *
 * @remarks
 * The penta is the only Human Design chart whose subject is a group rather than a person, so every row answers "who supplies this" as well as "is it there". The response reports that as zero-based indices into the member list that was sent, which is the one thing a card must not print raw: members are lettered instead, A for the first member sent, and the footnote says so.
 *
 * Read in two passes. The channels are the functions the group performs, and a channel is a defined Strength only when both of its gates are held somewhere in the group, so the attribution line under each one shows which member carries which end. The twelve gates below are the same data seen per role, and they are where a gap shows up as itself: a gate held by nobody, which the summary also counts.
 */
@customElement('roxy-hd-penta')
export class RoxyHdPenta extends RoxyDataElement<Penta> {
	static styles = [
		baseStyles,
		hdReadingStyles,
		css`
			.wrap {
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
			.section {
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				padding-top: var(--roxy-space-md, 1rem);
			}
			.section h3 {
				margin: 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.note {
				margin: var(--roxy-space-xs, 0.25rem) 0 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				line-height: 1.6;
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
			.gates,
			.gate-id {
				font-variant-numeric: tabular-nums;
				color: var(--roxy-accent-ink, #b45309);
				font-weight: var(--roxy-weight-bold, 600);
				min-width: 3.5rem;
			}
			.cname {
				flex: 1;
				min-width: 8rem;
			}
			/* The circuit family reads as a subtitle of the channel name, not as a
			 * second word in it. */
			.circuit {
				display: block;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			/* The attribution takes the full row so the badges keep their line and a
			 * five-member list still wraps inside the card rather than widening it. */
			.held {
				flex-basis: 100%;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				line-height: 1.6;
			}
			.who {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
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
			.badge.gap {
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 16%, transparent);
				color: var(--roxy-danger-fg, #991b1b);
			}
			.footnote {
				margin: 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				line-height: 1.6;
			}
		`,
	];

	protected renderData(d: Penta) {
		const channels = d.channels ?? [];
		const gates = d.gates ?? [];
		const s = d.summary;
		const gaps = s?.gapGates ?? [];
		const hasCore = channels.some((c) => c.isCore);

		return html`<div class="wrap" aria-label="Human Design penta">
			<header class="head">
				<h2 class="title">Penta</h2>
				${typeof d.memberCount === 'number' ? html`<span class="count">${d.memberCount} members</span>` : nothing}
			</header>
			${renderHdFacts([
				{ label: 'Members', value: d.memberCount?.toString() },
				{
					label: 'Defined channels',
					value:
						typeof s?.definedChannels === 'number' && channels.length > 0
							? `${s.definedChannels} of ${channels.length}`
							: undefined,
				},
				{
					label: 'Filled gates',
					value:
						typeof s?.filledGates === 'number' && gates.length > 0
							? `${s.filledGates} of ${gates.length}`
							: undefined,
				},
				{
					label: 'Core',
					value:
						typeof s?.coreDefined === 'boolean'
							? s.coreDefined
								? 'Defined'
								: 'Open'
							: undefined,
				},
				{
					label: 'Gap gates',
					value: gaps.length > 0 ? gaps.join(', ') : undefined,
				},
			])}
			<p class="lead">
				A penta is the field three to five people form when they work as a group.
				It is read from the twelve penta gates the members bring between them: a
				channel with both of its gates held somewhere in the group is a defined
				Strength, and a gate no member holds is a gap the group has to compensate
				for.
			</p>
			${this.renderGroup(
				'Upper (direction)',
				channels.filter((c) => c.position === 'upper'),
				'Upper channels run from the G Center to the Throat. They carry the leadership of the group and how it presents itself.',
			)}
			${this.renderGroup(
				'Lower (execution)',
				channels.filter((c) => c.position === 'lower'),
				'Lower channels run from the G Center to the Sacral. They carry the managed, generative, resource work.',
			)}
			${
				// A position the API adds later must not silently drop the channel from
				// the card: anything that is neither triangle still renders.
				this.renderGroup(
					'Channels',
					channels.filter(
						(c) => c.position !== 'upper' && c.position !== 'lower',
					),
				)
			}
			${
				hasCore
					? html`<p class="footnote">
						Core is the 2/14 Channel of the Beat, the material core of the penta:
						gate 2 sets the direction for resources, gate 14 is the resources
						themselves.
					</p>`
					: nothing
			}
			${this.renderGates(gates)}
			${
				channels.length > 0 || gates.length > 0
					? html`<p class="footnote">
						Members are lettered in the order they were sent, so A is the first
						member of the group.
					</p>`
					: nothing
			}
		</div>`;
	}

	/**
	 * One triangle of the penta. The note is what the triangle does, so it sits with the heading rather than being repeated on each of its three channels.
	 */
	private renderGroup(label: string, channels: PentaChannel[], note?: string) {
		if (channels.length === 0) return nothing;
		return html`<div class="section">
			<h3>${label}</h3>
			${note ? html`<p class="note">${note}</p>` : nothing}
			${channels.map(
				(c) => html`<div class="row">
					<span class="gates">${c.gateA}-${c.gateB}</span>
					<span class="cname">
						${c.name ?? ''}
						${c.circuit ? html`<span class="circuit">${c.circuit} circuit</span>` : nothing}
					</span>
					<span class="badge ${c.defined ? 'defined' : 'open'}">${c.defined ? 'Defined' : 'Open'}</span>
					${c.isCore ? html`<span class="badge core">Core</span>` : nothing}
					<span class="held">
						Gate ${c.gateA} held by ${members(c.gateAHeldBy)}. Gate ${c.gateB} held
						by ${members(c.gateBHeldBy)}.
					</span>
				</div>`,
			)}
		</div>`;
	}

	/**
	 * The twelve penta gates, each with the role it brings and the members who carry it. A gate nobody holds is the gap the summary counts, so it is flagged rather than left as an empty attribution.
	 */
	private renderGates(gates: PentaGate[]) {
		if (gates.length === 0) return nothing;
		const filled = gates.filter((g) => g.filled).length;
		return html`<div class="section">
			<h3>Gates (${filled} of ${gates.length} filled)</h3>
			<p class="note">
				The role each gate brings to the group, and who carries it. A gap is a
				role no member holds, so the group compensates for it.
			</p>
			${gates.map(
				(g) => html`<div class="row">
					<span class="gate-id">${g.gate}</span>
					<span class="cname">${g.gateName ?? ''}</span>
					${
						g.filled
							? html`<span class="who">Held by ${members(g.heldBy)}</span>`
							: html`<span class="badge gap">Gap</span>`
					}
				</div>`,
			)}
		</div>`;
	}

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No penta data</div>`;
	}
}

/**
 * Members are lettered, not numbered. The response reports them as zero-based indices into the member list that was sent, and printing a raw "0" on a card reads as a bug; "Member 1" for index 0 would contradict the API the developer is reading beside it. A letter is unambiguous either way, and it matches how `roxy-hd-connection` names person A and person B. Five is the ceiling: the endpoint takes 3 to 5 members.
 */
const MEMBER_LETTERS = 'ABCDE';

function members(indices: number[] | undefined): string {
	const held = (indices ?? []).map((i) => MEMBER_LETTERS[i] ?? String(i + 1));
	return held.length > 0 ? held.join(', ') : 'nobody';
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-hd-penta': RoxyHdPenta;
	}
}
