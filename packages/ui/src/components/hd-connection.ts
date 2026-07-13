import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { CalculateConnectionResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { disclosureStyles } from '../utils/disclosure.js';
import { hdReadingStyles, renderHdFacts } from '../utils/hd-reading.js';
import {
	type InterpSection,
	interpAccordionStyles,
	renderInterpAccordion,
} from '../utils/interp-accordion.js';
import { humanize } from '../utils/string.js';

type Connection = CalculateConnectionResponse;
type ConnectionChannel = Connection['channels'][number];
type CombinedCenter = Connection['centers'][number];

/**
 * Human Design connection chart. Renders /human-design/connection: the composite of two charts as the electromagnetic / compromise / dominance channels they form together, plus the combined definition and a summary. The HD analog of synastry. Each channel row shows its two gates, name, circuit, the relationship dynamic, and which person carries which gate.
 *
 * @remarks
 * The chart answers one question: what exists between these two that does not exist in either of them alone. So the combined centers are the lead, not the channel list. `defined` is the state of the COMBINED bodygraph, `definedBy` names who already defines that center in their own chart, and the gap between the two is the reading: a center that comes back defined with an empty `definedBy` is defined by the connection itself, present when the two are together and absent when they are apart.
 *
 * The four dynamics are the taxonomy the summary counts, and a bare count of "Dominance: 2" means nothing to a reader who does not already know the system, so each one carries its definition behind the shared disclosure rather than shipping as a bare label.
 */
@customElement('roxy-hd-connection')
export class RoxyHdConnection extends RoxyDataElement<Connection> {
	static styles = [
		baseStyles,
		disclosureStyles,
		interpAccordionStyles,
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
				/* minmax(0, 1fr), not the implicit auto column. An auto column takes its
				 * MINIMUM from min-content, and the min-content of a nowrap 7-column
				 * table is far wider than the card, so the column blew out to 846px and
				 * dragged every sibling with it: the header, the fact tiles, the lead
				 * paragraph and all three sections were all 846px inside a 556px card,
				 * clipped on the right. Letting the column shrink below min-content is
				 * what lets the scroll container below actually scroll. */
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
				font-variant-numeric: tabular-nums;
			}
			.note {
				margin: 0 0 var(--roxy-space-sm, 0.5rem);
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
			/* The one state the connection exists to surface: defined in the combined
			 * chart and in neither chart alone. It carries the accent so it reads as
			 * the finding it is, not as another neutral row. */
			.badge.together {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 18%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}
			.who {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
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
			.held {
				font-variant-numeric: tabular-nums;
			}
			/* min-width: 0 is what makes the scroll actually scroll. A grid item
			 * defaults to min-width: auto, which resolves to min-content, so an
			 * overflow-x: auto box still GROWS to fit a wide table rather than
			 * clipping it. The channels table sets white-space: nowrap on 7 columns,
			 * so without this the card blew 315px past its own border and clipped the
			 * fact tiles, the lead paragraph, the centers, and the last column. */
			.scroll {
				overflow-x: auto;
				min-width: 0;
			}
		`,
	];

	protected renderData(d: Connection) {
		const channels = d.channels ?? [];
		const centers = d.centers ?? [];
		const definedCenters = centers.filter((c) => c.defined).length;

		return html`<div class="wrap" aria-label="Human Design connection">
			<header class="head">
				<h2 class="title">Connection</h2>
				${typeof d.totalChannels === 'number' ? html`<span class="count">${d.totalChannels} channels</span>` : nothing}
			</header>
			${renderHdFacts([
				{ label: 'Channels', value: d.totalChannels?.toString() },
				{
					label: 'Combined definition',
					value: d.combinedDefinition
						? humanize(String(d.combinedDefinition))
						: undefined,
				},
				{
					label: 'Centers defined',
					value:
						centers.length > 0
							? `${definedCenters} of ${centers.length}`
							: undefined,
				},
			])}
			<p class="lead">
				A connection chart reads the two charts as one bodygraph. Wherever the
				two of them together hold both gates of a channel, that channel is
				defined between them, and the centers it joins are defined in the
				connection whether or not either person defines them alone.
			</p>
			${this.renderDynamics(d.summary)}
			${this.renderCenters(centers)}
			${this.renderChannels(channels, centers)}
		</div>`;
	}

	/**
	 * The four ways two charts can meet in a channel, in canonical order, each with what it means. The count is the aside, so the taxonomy and the tally read as one thing: a dynamic with no channels still shows, because its absence is as much a fact of the connection as its presence.
	 */
	private renderDynamics(s: Connection['summary'] | undefined) {
		if (!s) return nothing;
		const sections: InterpSection[] = [
			{
				label: 'Electromagnetic',
				aside: channelCount(s.electromagnetic),
				body: 'Each person holds one of the two gates, so the channel completes only when they are together. The classic point of attraction.',
			},
			{
				label: 'Dominance',
				aside: channelCount(s.dominance),
				body: 'One person holds both gates and the other holds neither, so the conditioning runs one way, from the person who carries the channel to the person who does not.',
			},
			{
				label: 'Compromise',
				aside: channelCount(s.compromise),
				body: 'One person holds both gates and the other holds a single hanging gate of the same channel, so the channel is complete for one of them and half open for the other.',
			},
			{
				label: 'Companionship',
				aside: channelCount(s.companionship),
				body: 'Both people independently hold both gates, so neither needs the other to complete it. A shared and familiar frequency rather than an attraction.',
			},
		];
		return renderInterpAccordion(sections, 'hd-connection-dynamic', 'Dynamics');
	}

	/**
	 * The nine centers of the combined chart. `defined` is the combined state and `definedBy` is who carries it alone, so the two together say whether a center is brought to the connection or created by it.
	 */
	private renderCenters(centers: CombinedCenter[]) {
		if (centers.length === 0) return nothing;
		return html`<section class="block">
			<h3>Centers</h3>
			<p class="note">
				Defined is the state of the combined chart. Beside it is who already
				defines that center in their own chart. A center defined only together is
				what the connection itself creates: it is there when the two are together
				and gone when they are apart. The combined definition counts how the
				defined centers hang together, so Single is one connected piece and a
				split is more than one.
			</p>
			${centers.map((c) => {
				const by = c.definedBy ?? [];
				const a = by.includes('A');
				const b = by.includes('B');
				// Only the connection defines it: defined in the combined chart, and in
				// neither chart on its own.
				const together = Boolean(c.defined) && !a && !b;
				return html`<div class="row">
					<span class="cname">${c.name ?? humanize(String(c.id ?? ''))}</span>
					<span class="badge ${c.defined ? (together ? 'together' : 'defined') : 'open'}">
						${c.defined ? (together ? 'Only together' : 'Defined') : 'Open'}
					</span>
					<span class="who">${centerWho(Boolean(c.defined), a, b)}</span>
				</div>`;
			})}
		</section>`;
	}

	/**
	 * Every connected channel. The centers a channel joins are named, not left as ids, because the row is what explains a defined center in the block above: this is the wiring that produced it.
	 */
	private renderChannels(
		channels: ConnectionChannel[],
		centers: CombinedCenter[],
	) {
		if (channels.length === 0) return nothing;
		const names = new Map(
			centers.map((c) => [String(c.id ?? ''), c.name ?? ''] as const),
		);
		const centerName = (id: string) => names.get(id) || humanize(id);

		return html`<section class="block">
			<h3>Channels</h3>
			<!-- tabindex + role: a scrollable region must be reachable by keyboard. A
			     table has no focusable content of its own, so without this a keyboard
			     user cannot scroll to the columns that overflow. -->
			<div class="scroll" tabindex="0" role="region" aria-label="Connection channels">
				<table role="table">
					<caption class="roxy-sr-only">
						Connection channels: each channel with its gates, the centers it links, its
						circuit and dynamic, and the gates person A and person B each hold.
					</caption>
					<thead>
						<tr>
							<th scope="col">Channel</th>
							<th scope="col">Gates</th>
							<th scope="col">Centers</th>
							<th scope="col">Circuit</th>
							<th scope="col">Dynamic</th>
							<th scope="col">Person A holds</th>
							<th scope="col">Person B holds</th>
						</tr>
					</thead>
					<tbody>
						${channels.map(
							(c) => html`<tr>
								<td>${c.name ?? ''}</td>
								<td class="gates">${c.gateA}-${c.gateB}</td>
								<td>${(c.centers ?? []).map(centerName).join(' to ')}</td>
								<td>${c.circuit ?? ''}</td>
								<td>${c.dynamic ? html`<span class="dyn">${c.dynamic}</span>` : nothing}</td>
								<td class="held">${gateList(c.personAGates)}</td>
								<td class="held">${gateList(c.personBGates)}</td>
							</tr>`,
						)}
					</tbody>
				</table>
			</div>
		</section>`;
	}

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No connection data</div>`;
	}
}

/** The aside of a dynamic. A zero is stated rather than hidden: no companionship channels is a finding about the pair. */
function channelCount(n: number | undefined): string | undefined {
	if (typeof n !== 'number') return undefined;
	if (n === 0) return 'None';
	return n === 1 ? '1 channel' : `${n} channels`;
}

/** Which gates of the channel this person carries. Neither is possible: a dominance channel is held entirely by the other person. */
function gateList(gates: number[] | undefined): string {
	const list = gates ?? [];
	return list.length > 0 ? list.join(', ') : 'Neither';
}

/** Who defines the center in their own chart, spelled out. `definedBy` is empty both when the center is open in both charts and when only the connection defines it, so the combined state has to disambiguate. */
function centerWho(defined: boolean, a: boolean, b: boolean): string {
	if (a && b) return 'Defined in both charts';
	if (a) return 'Defined by A';
	if (b) return 'Defined by B';
	return defined
		? 'Defined by neither alone, only by the connection'
		: 'Open in both charts';
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-hd-connection': RoxyHdConnection;
	}
}
