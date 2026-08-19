import { css, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { planetGlyph } from '../tokens/index.js';
import type { GenerateBodygraphResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import {
	BODYGRAPH_VIEWBOX,
	type BodygraphCenterId,
	CENTER_GEOMETRY,
	type CenterColor,
	type GateSources,
	renderBodygraphSvg,
} from '../utils/bodygraph-render.js';
import { bodygraphChartStyles } from '../utils/bodygraph-styles.js';
import { chevron, disclosureStyles } from '../utils/disclosure.js';
import {
	hdReadingStyles,
	type ReadingSection,
	renderHdFacts,
	renderHdKeynotes,
	renderHdThemes,
	sideWord,
} from '../utils/hd-reading.js';
import { interpAccordionStyles } from '../utils/interp-accordion.js';
import { display } from '../utils/localized.js';
import { renderTablist, tablistStyles } from '../utils/tablist.js';

type Bodygraph = GenerateBodygraphResponse;
type GateActivation = Bodygraph['gates'][number];
type CenterEntry = Bodygraph['centers'][number];
type ChannelEntry = Bodygraph['channels'][number];

/**
 * The order the color key reads in, which is the order the centers themselves are colored in from the crown down: the two identity centers, the mental awareness center, the pressure and expression group, then the two life-force motors.
 *
 * @remarks
 * The four rows and the names inside them are DERIVED from {@link CENTER_GEOMETRY} and the response rather than written out, so a legend can never claim a color for a center the chart draws in another one, and the names in the key are the same words the accordion below prints.
 */
const LEGEND_COLORS: readonly CenterColor[] = ['gold', 'green', 'brown', 'red'];

/** The activations on each gate, in response order. One gate carries several whenever both sides reach it or two bodies share it, which is the case the chart draws as a split circle. */
function groupByGate(gates: GateActivation[]): Map<number, GateActivation[]> {
	const byGate = new Map<number, GateActivation[]>();
	for (const g of gates) {
		if (g.gate == null) continue;
		const bucket = byGate.get(g.gate);
		if (bucket) bucket.push(g);
		else byGate.set(g.gate, [g]);
	}
	return byGate;
}

/**
 * Human Design bodygraph. Pass `data` from /human-design/bodygraph. Renders the nine centers in their canonical positions and shapes, filled when defined and surface-filled and outlined when open, the 36 channels as wiring between gates, and ALL 64 gates: outlined where nothing landed, filled where an activation did, and split down the middle where both sides did.
 *
 * @remarks
 * The response carries a full interpretation, not just labels, so the card is laid out in four passes from identity down to detail. The chart takes the full card width at every size and identity sits under it, never beside it, because a bodygraph is half again taller than it is wide and is read as a whole. Identity is always visible: the type, strategy, authority, profile, and definition tiles, the type description as the lead paragraph, the incarnation cross, and the signature and not-self themes. Everything below is progressive disclosure through the shared exclusive-accordion pattern, so only one body of prose is ever open at a time and the card never becomes a wall of text: the reading (strategy, authority, profile, definition, aura, cross), the defined channels grouped by circuit, the nine centers, and the 26 gate activations split by chart side.
 *
 * A center returns `notSelfQuestion` whatever its state, but the question describes the conditioning of an OPEN center, so it is rendered only when the center is open. `theme` already tracks the defined or open state and is always shown.
 *
 * **Every name on this card is read twice.** A translated response echoes the display value beside the canonical one (`nameLocalized` next to `name`, `planetLocalized` next to `planet`) and keeps the canonical one English in every language, so the reader gets `display(...)` and the machine keeps the English: `planetGlyph` is keyed on `planet`, the defined-center Set and the channel groups are keyed on `id` and `circuit`, and the tab state is the wire value `personality` or `design`. Two fields have no localized partner and print as sent, each with a note at its site: `incarnationCross.name` and `ichingHexagram.english`.
 *
 * **Personality is the dark half of a bodygraph and Design the red half, and the binary the reading rests on is drawn, not just labelled.** It comes from `gates[].side`, so nothing extra is requested: a gate circle takes the colour of the side or sides that activated it, and each half of a channel takes the colour of the gate at its own end, which is why a channel joining a Personality gate to a Design gate is half dark and half red. Literal black cannot survive a dark theme, so Personality follows `--roxy-fg` and inverts with it.
 *
 * The chart is theme-driven through `--roxy-*` custom properties on `:host`, so it adopts the host palette in light and dark without runtime color probing.
 *
 * `hide-readings` leaves the chart, the fact tiles, the incarnation cross, the themes and the legend, and drops the reading accordion together with the channels, centers and activations sections. Those three exist to hold the prose behind each disclosure, and the wiring they describe is already drawn in the chart above them: the gate circles, the lit channels, and the filled centers.
 *
 * Centre names live in each shape's `<title>`, which is the hover tooltip and the accessible name. No margin labels: they need leader lines across the drawing and no printed bodygraph carries either.
 */
@customElement('roxy-bodygraph')
export class RoxyBodygraph extends RoxyDataElement<Bodygraph> {
	/** Which chart side the activations panel is showing. View state, not configuration: the response always carries both sides. */
	@state()
	private side: 'personality' | 'design' = 'personality';

	static styles = [
		baseStyles,
		tablistStyles,
		disclosureStyles,
		interpAccordionStyles,
		hdReadingStyles,
		bodygraphChartStyles,
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
			.head {
				display: flex;
				justify-content: space-between;
				align-items: baseline;
				flex-wrap: wrap;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.type-line {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			/* One column at every width: chart first, identity underneath. A bodygraph
			 * is read as a whole and is far taller than it is wide, so a side-by-side
			 * split trades chart size for prose width. */
			.layout {
				display: grid;
				gap: var(--roxy-space-lg, 1.5rem);
				grid-template-columns: minmax(0, 1fr);
				align-items: start;
			}

			/* Personality is the dark half of a bodygraph and Design the red half, the
			 * two colours everything the renderer marks reads from. Literal black cannot
			 * survive a dark theme, so Personality follows the foreground token; Design
			 * reuses the danger red, already tuned for contrast against the surface in
			 * both themes. Design takes the left half of a split circle, matching the
			 * column order of a printed chart. */
			.wrap {
				--src-left: var(--roxy-danger, #dc2626);
				--src-right: var(--roxy-fg, #0a0a0a);
			}

			.summary {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}
			.cross {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
				border-left: 2px solid var(--roxy-accent, #f59e0b);
				padding-left: var(--roxy-space-sm, 0.5rem);
				margin: 0;
			}
			.cross .gates {
				color: var(--roxy-muted, #71717a);
				font-variant-numeric: tabular-nums;
			}
			/* A legend line that owns its own row. The centre-colour caption needs it so
			 * the key reads as the colours a centre takes when defined rather than a claim
			 * about this chart; the activation key needs it so the two halves of the
			 * binary sit together instead of wrapping apart. */
			.legend-row {
				flex-basis: 100%;
				color: var(--roxy-muted, #71717a);
			}
			.legend-row .swatch:not(:first-child) {
				margin-left: var(--roxy-space-md, 1rem);
			}
			/* Defined-center swatches use the same semantic colors as the chart so
			 * the legend reads as a key, not decoration. Open uses the open-center
			 * outline only. */
			.legend .swatch.defined {
				border-color: color-mix(in srgb, var(--roxy-fg, #0a0a0a) 45%, transparent);
			}

			.group {
				margin-bottom: var(--roxy-space-md, 1rem);
			}
			.group:last-child {
				margin-bottom: 0;
			}
			.group-head {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-fg, #0a0a0a);
			}
			.group-note {
				margin: 0 0 var(--roxy-space-sm, 0.5rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				line-height: 1.6;
			}
			.footnote {
				margin: 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				line-height: 1.6;
			}
			.chip {
				display: inline-block;
				padding: 1px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 45%, transparent);
				color: var(--roxy-fg, #0a0a0a);
			}
			.chip--on {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 18%, transparent);
			}
			.chips {
				display: inline-flex;
				flex-wrap: wrap;
				gap: 0.25rem;
			}
			.gate-id,
			.chan-gates {
				font-variant-numeric: tabular-nums;
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-accent-ink, #b45309);
			}
			.glyph {
				color: var(--roxy-accent-ink, #b45309);
			}
			.side-note {
				margin: 0 0 var(--roxy-space-sm, 0.5rem);
				padding-top: var(--roxy-space-sm, 0.5rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				line-height: 1.6;
			}
		`,
	];

	protected renderData(d: Bodygraph) {
		const centers = d.centers ?? [];
		const definedCenters = new Set<BodygraphCenterId>(
			centers.filter((c) => c.defined).map((c) => c.id as BodygraphCenterId),
		);
		const byGate = groupByGate(d.gates ?? []);
		// Design is the left half of a split circle and Personality the right, which
		// is the column order a printed chart prints them in.
		const gateSources = new Map<number, GateSources>(
			[...byGate].map(([gate, list]) => [
				gate,
				{
					left: list.some((g) => g.side === 'design'),
					right: list.some((g) => g.side === 'personality'),
				},
			]),
		);
		const gateTitles = this.buildGateTitles(byGate);
		// The chart reads the same names the accordion does, so one card cannot name a
		// centre two ways. The set above stays keyed on `id`, the machine value, which
		// is `solar-plexus` in every language.
		const centerNames = new Map<BodygraphCenterId, string>(
			centers.map((c) => [c.id as BodygraphCenterId, display(c, 'name')]),
		);

		return html`<div class="wrap" part="card">
			<header class="head" part="header">
				<h2 class="title">${this.t('Bodygraph')}</h2>
				${
					// One text node, not two: the markup minifier collapses the leading
					// space of an adjacent template and the separator would lose it.
					d.type || d.profile
						? html`<div class="type-line">
							${[
								display(d, 'type'),
								d.profile
									? this.t('Profile {{profile}}', { profile: d.profile })
									: '',
							]
								.filter(Boolean)
								.join(' · ')}
						</div>`
						: nothing
				}
			</header>
			<div class="layout" part="layout">
				<svg
					class="chart"
					part="chart"
					viewBox=${BODYGRAPH_VIEWBOX}
					preserveAspectRatio="xMidYMid meet"
					role="img"
					aria-label=${this.t(
						'Human Design bodygraph with nine centers, channels, and activated gates overlaid on a human silhouette',
					)}
				>
					<title>${this.t('Human Design bodygraph')}</title>
					<desc>
						${this.t(
							'Nine energy centers in their canonical positions over a human silhouette, each filled with its traditional color when defined and outlined when open, wired by channels between activated gates.',
						)}
					</desc>
					${renderBodygraphSvg({
						definedCenters,
						gateSources,
						gateTitles,
						centerNames,
						stateWords: { defined: this.t('Defined'), open: this.t('Open') },
					})}
				</svg>
				${this.renderSummary(d, centerNames)}
			</div>
			${this.renderReading(d)}
			${this.renderChannels(d.channels ?? [], centerNames)}
			${this.renderCenters(centers)}
			${this.renderActivations(d)}
		</div>`;
	}

	/** The hover and accessible text for one gate circle, naming every activation on it rather than one. */
	private buildGateTitles(
		byGate: ReadonlyMap<number, GateActivation[]>,
	): Map<number, string> {
		const titles = new Map<number, string>();
		for (const [gate, list] of byGate) {
			// The line belongs to the activation, not the gate: two bodies on one gate
			// routinely land on different lines, so each carries its own `gate.line` the
			// way a printed planet column prints it.
			const bodies = list.map((g) =>
				[
					this.gateGlyph(g),
					`${gate}${g.line != null ? `.${g.line}` : ''}`,
					sideWord(g.side, this.translator),
				]
					.filter(Boolean)
					.join(' '),
			);
			titles.set(
				gate,
				[
					this.t('Gate {{gate}}', { gate }),
					display(list[0], 'gateName'),
					...bodies,
				]
					.filter(Boolean)
					.join(' · '),
			);
		}
		return titles;
	}

	/** Monochrome planet glyph for an activation, or its body name when the wheel has no glyph for it. The lookup is keyed on the canonical English name, which the API keeps English in every language for exactly this; the fallback TEXT is the reader's. */
	private gateGlyph(g: GateActivation): string {
		if (!g.planet) return '';
		return planetGlyph(g.planet) ?? display(g, 'planet');
	}

	private renderSummary(
		d: Bodygraph,
		centerNames: ReadonlyMap<BodygraphCenterId, string>,
	) {
		const ic = d.incarnationCross;
		return html`<div class="summary" part="details">
			${renderHdFacts([
				{ label: this.t('Type'), value: display(d, 'type') },
				{ label: this.t('Strategy'), value: display(d, 'strategy') },
				{ label: this.t('Authority'), value: display(d, 'authority') },
				{ label: this.t('Profile'), value: d.profile },
				{ label: this.t('Definition'), value: display(d, 'definition') },
			])}
			${
				// The tiles name the type; this paragraph explains it. The cross NAME
				// and its gates below are chart facts and stay.
				d.typeDescription && !this.hideReadings
					? html`<p class="lead">${d.typeDescription}</p>`
					: nothing
			}
			${
				// `incarnationCross.name` is the one piece of vocabulary on this card the
				// API does NOT localize (`Left Angle Cross of the Clarion` comes back
				// English in every language), so it prints as sent. Do not translate it
				// here from `angleLocalized` plus the gates: that is a second translation
				// of the same fact and it can disagree with the reading below.
				ic?.name
					? html`<p class="cross">
						${ic.name}
						${
							ic.gates?.length
								? html`<span class="gates"> (${ic.gates.join(', ')})</span>`
								: nothing
						}
					</p>`
					: nothing
			}
			${renderHdThemes(
				d.signature ? display(d, 'signature') : undefined,
				d.notSelf ? display(d, 'notSelf') : undefined,
				this.translator,
			)}
			${this.renderLegend(centerNames)}
		</div>`;
	}

	/**
	 * The chart key: what an activation colour means, then what a centre colour means.
	 *
	 * @remarks
	 * The centre rows are built from the chart geometry and named with the response
	 * vocabulary, so they can never claim a colour the chart does not draw and never
	 * name a centre in a different language from the accordion. The activation row
	 * leads because it is the half a reader cannot guess.
	 */
	private renderLegend(centerNames: ReadonlyMap<BodygraphCenterId, string>) {
		const named = LEGEND_COLORS.map(
			(color) =>
				[
					color,
					CENTER_GEOMETRY.filter((c) => c.color === color)
						.map((c) => centerNames.get(c.id) || c.label)
						.join(', '),
				] as const,
		);
		return html`<div class="legend" part="legend">
			<span class="legend-row">
				<span class="swatch source src-right"></span>${this.t('Personality')}
				<span class="swatch source src-left"></span>${this.t('Design')}
			</span>
			<span class="legend-row">${this.t('Center colors when defined. Open centers are outlined.')}</span>
			${named.map(
				([color, names]) =>
					html`<span><span class="swatch bg-${color} defined"></span>${names}</span>`,
			)}
			<span><span class="swatch"></span>${this.t('Open center')}</span>
		</div>`;
	}

	/**
	 * The mechanics of the design, in the order a reader needs them: how to engage (strategy), how to decide (authority), the role played (profile), how the definition hangs together, the aura, and the life theme of the incarnation cross. The cross name and gates already sit beside the chart, so only its description is repeated here.
	 */
	private renderReading(d: Bodygraph) {
		const ic = d.incarnationCross;
		const sections: ReadingSection[] = [
			{
				label: this.t('Strategy'),
				aside: display(d, 'strategy'),
				body: d.strategyDescription,
			},
			{
				label: this.t('Authority'),
				aside: display(d, 'authority'),
				body: d.authorityDescription,
			},
			{
				label: this.t('Profile'),
				aside: d.profile,
				body: d.profileDescription,
				extra: renderHdKeynotes(d.profileKeynotes, this.translator),
			},
			{
				label: this.t('Definition'),
				aside: display(d, 'definition'),
				body: d.definitionDescription,
			},
			{ label: this.t('Aura'), body: d.aura },
			{
				label: this.t('Incarnation cross'),
				aside: ic ? display(ic, 'angle') : undefined,
				body: ic?.description ?? '',
			},
		];
		return this.renderInterpretation(sections, 'hd-reading');
	}

	/**
	 * Defined channels, grouped by circuit. The circuit description is the same
	 * text for every channel that belongs to it, so it is lifted to the group
	 * intro instead of repeating inside each row. Groups keep response order, which
	 * is gate order; no circuit ranking is invented.
	 *
	 * @remarks
	 * The two centres a channel joins are what it DOES, so each row names them as
	 * chips beside its gates. They read the same names the chart and the centres
	 * section use, and being names rather than a sentence they need no wording of
	 * their own in any language.
	 */
	private renderChannels(
		channels: ChannelEntry[],
		centerNames: ReadonlyMap<BodygraphCenterId, string>,
	) {
		if (channels.length === 0 || this.hideReadings) return nothing;
		const groups = new Map<string, ChannelEntry[]>();
		for (const c of channels) {
			const key = c.circuit ?? '';
			const bucket = groups.get(key);
			if (bucket) bucket.push(c);
			else groups.set(key, [c]);
		}
		// One accordion group spans every circuit, so the open row is the first
		// channel overall, not the first of each circuit.
		let index = 0;

		return html`<section class="block" part="section channels">
			<h3>${this.t('Defined channels ({{count}})', { count: channels.length })}</h3>
			${[...groups].map(
				([circuit, list]) => html`<div class="group">
					${
						circuit
							? html`<p class="group-head">${this.t('{{circuit}} circuit', {
									circuit: display(list[0], 'circuit'),
								})}</p>`
							: nothing
					}
					${
						list[0]?.circuitDescription
							? html`<p class="group-note">${list[0].circuitDescription}</p>`
							: nothing
					}
					${list.map(
						(
							c,
						) => html`<details class="interp-card" part="reading" name="hd-channel" ?open=${index++ === 0}>
							<summary>
								<span class="interp-lead">
									<span class="chan-gates">${c.gateA}-${c.gateB}</span>
									<span>${display(c, 'name')}</span>
								</span>
								${chevron()}
								<span class="interp-aside">
									<span class="chips">
										${(c.centers ?? []).map(
											(id) =>
												html`<span class="chip">${centerNames.get(id as BodygraphCenterId) || id}</span>`,
										)}
									</span>
								</span>
							</summary>
							<div class="interp-body">
								${c.description ? html`<p>${c.description}</p>` : nothing}
							</div>
						</details>`,
					)}
				</div>`,
			)}
		</section>`;
	}

	/**
	 * The nine centers. `theme` already reflects whether the center came back
	 * defined or open, so it always shows. `notSelfQuestion` is written for the
	 * OPEN state ("the open Spleen clings to..."), so showing it on a defined
	 * center would state the opposite of the chart; it is rendered for open
	 * centers only.
	 */
	private renderCenters(centers: CenterEntry[]) {
		if (centers.length === 0 || this.hideReadings) return nothing;
		const definedCount = centers.filter((c) => c.defined).length;
		return html`<section class="block" part="section centers">
			<h3>${this.t('Centers ({{defined}} defined, {{open}} open)', {
				defined: definedCount,
				open: centers.length - definedCount,
			})}</h3>
			${centers.map(
				(
					c,
					i,
				) => html`<details class="interp-card" part="reading" name="hd-center" ?open=${i === 0}>
					<summary>
						<span class="interp-lead">${display(c, 'name')}</span>
						${chevron()}
						<span class="interp-aside">
							<span class="chips">
								<span class="chip ${c.defined ? 'chip--on' : ''}">${c.defined ? this.t('Defined') : this.t('Open')}</span>
								${c.motor ? html`<span class="chip">${this.t('Motor')}</span>` : nothing}
								${c.awareness ? html`<span class="chip">${this.t('Awareness')}</span>` : nothing}
							</span>
						</span>
					</summary>
					<div class="interp-body">
						${c.theme ? html`<p>${c.theme}</p>` : nothing}
						${
							!c.defined && c.notSelfQuestion
								? html`<dl class="keynotes">
									<dt>${this.t('Not-self question')}</dt>
									<dd>${c.notSelfQuestion}</dd>
								</dl>`
								: nothing
						}
						${c.biology ? html`<p class="footnote">${this.t('Biology')}. ${c.biology}</p>` : nothing}
						${
							c.gates?.length
								? html`<p class="footnote">${this.t('Gates {{gates}}', { gates: c.gates.join(', ') })}</p>`
								: nothing
						}
					</div>
				</details>`,
			)}
		</section>`;
	}

	/**
	 * The 26 activations, split by chart side. Personality is the conscious side
	 * printed in black, design the unconscious side printed in red, and the
	 * response describes each once at the top level, so the side description
	 * becomes the panel intro rather than an orphan glossary entry. Splitting the
	 * list in two also halves what a reader scans: 13 rows per side, in the
	 * canonical planet order the response returns.
	 */
	private renderActivations(d: Bodygraph) {
		const gates = d.gates ?? [];
		if (gates.length === 0 || this.hideReadings) return nothing;

		const personality = gates.filter((g) => g.side === 'personality');
		const design = gates.filter((g) => g.side === 'design');
		// A response with only one side (or an unrecognized side value) still
		// renders: fall back to the flat list and drop the tabs.
		const split = personality.length > 0 && design.length > 0;
		const side = this.side;
		const shown = split ? (side === 'design' ? design : personality) : gates;
		const sideNote = split ? d.sides?.[side] : undefined;

		return html`<section class="block" part="section activations">
			<h3>${this.t('Activations ({{count}})', { count: gates.length })}</h3>
			${
				split
					? renderTablist({
							items: [
								{
									id: 'personality' as const,
									label: `${this.t('Personality')} (${personality.length})`,
								},
								{
									id: 'design' as const,
									label: `${this.t('Design')} (${design.length})`,
								},
							],
							active: side,
							onSelect: (v) => {
								this.side = v;
							},
							label: this.t('Chart sides'),
							idPrefix: 'hd',
							controls: true,
						})
					: nothing
			}
			<div
				id=${split ? `hd-panel-${side}` : nothing}
				part="panel"
				role=${split ? 'tabpanel' : nothing}
				aria-labelledby=${split ? `hd-tab-${side}` : nothing}
			>
				${sideNote ? html`<p class="side-note">${sideNote}</p>` : nothing}
				${shown.map((g, i) => this.renderGate(g, i === 0))}
			</div>
		</section>`;
	}

	private renderGate(g: GateActivation, open: boolean) {
		const glyph = this.gateGlyph(g);
		const body = display(g, 'planet');
		const hex = g.ichingHexagram;
		return html`<details class="interp-card" part="reading" name="hd-gate" ?open=${open}>
			<summary>
				<span class="interp-lead">
					${glyph ? html`<span class="glyph" aria-hidden="true">${glyph}</span>` : nothing}
					<span class="gate-id">${g.gate}${g.line != null ? `.${g.line}` : ''}</span>
					<span>${display(g, 'gateName')}</span>
				</span>
				${chevron()}
				${body ? html`<span class="interp-aside"><small>${body}</small></span>` : nothing}
			</summary>
			<div class="interp-body">
				${g.gateDescription ? html`<p>${g.gateDescription}</p>` : nothing}
				${
					g.lineMeaning
						? html`<dl class="keynotes">
							<dt>${this.t('Line {{line}}', { line: g.line ?? '' })}</dt>
							<dd>${g.lineMeaning}</dd>
						</dl>`
						: nothing
				}
				${
					g.planetDescription
						? html`<p class="footnote">${body}. ${g.planetDescription}</p>`
						: nothing
				}
				${
					// The hexagram name arrives already in the response language and is
					// display text only (the machine key is `number`), so it prints as
					// sent rather than being looked up somewhere else.
					hex?.number
						? html`<p class="footnote">${this.t('I Ching hexagram {{number}}', { number: hex.number })}${hex.english ? `, ${hex.english}` : ''}</p>`
						: nothing
				}
			</div>
		</details>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-bodygraph': RoxyBodygraph;
	}
}
