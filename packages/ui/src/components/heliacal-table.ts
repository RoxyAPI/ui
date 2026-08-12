import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { planetGlyph } from '../tokens/index.js';
import type { HeliacalResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatDateTime, formatNumber } from '../utils/format.js';

type Graha = HeliacalResponse['grahas'][number];
type Event = NonNullable<Graha['lastEvent']>;

/** Udaya is the graha re-emerging from the Sun rays, asta is it disappearing into them. Sanskrit keys, never translated by the API, so the display word is ours to choose. */
const EVENT_WORD: Record<Event['type'], string> = {
	udaya: 'Rose',
	asta: 'Set',
};

/** Forward-looking form of the same two events, for the NEXT event rather than the last one. */
const NEXT_EVENT_WORD: Record<Event['type'], string> = {
	udaya: 'rises',
	asta: 'sets',
};

/**
 * Heliacal rising and setting (udaya and asta) for the six grahas that rise and set.
 *
 * @remarks
 * This is the muhurta surface: Guru Asta and Shukra Asta are the periods classical muhurta withholds marriage, so what a practitioner opens this for is a WINDOW, not a status. The window is therefore the headline of every row and the present verdict is the supporting line, because "invisible until 12 August" answers the question and "invisible" alone does not.
 *
 * Three things here are easy to render wrongly, and each is deliberate:
 *
 * `lastEvent` and `nextEvent` are genuinely NULLABLE, not merely optional. A graha far from conjunction can have no event inside the search horizon at all, which is normal for Mars, so a missing event is reported as its own state rather than as a blank date.
 *
 * The `kalamsa` limit on an EVENT can differ from the graha's CURRENT `kalamsa`, because the Surya Siddhanta gives Mercury and Venus a tighter limit while retrograde. Rendering one and labelling it the other would be a quiet lie, so each is shown against the event it belongs to.
 *
 * `horizon` is a real distinction a reader needs, not an internal detail: east means the graha is read before sunrise and is a morning object, west means after sunset and an evening one. A graha crosses to the other horizon as it passes the Sun, which is why an asta and the udaya after it usually sit on opposite horizons.
 */
@customElement('roxy-heliacal-table')
export class RoxyHeliacalTable extends RoxyDataElement<HeliacalResponse> {
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
			.sub {
				margin: 0;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			.rows {
				display: grid;
			}
			.row {
				display: grid;
				grid-template-columns: minmax(0, 1fr);
				gap: var(--roxy-space-xs, 0.25rem);
				padding: var(--roxy-space-md, 1rem);
				border-top: 1px solid var(--roxy-border, #e4e4e7);
			}
			.row-top {
				display: flex;
				align-items: baseline;
				gap: var(--roxy-space-sm, 0.5rem);
				flex-wrap: wrap;
			}
			.graha {
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-fg, #0a0a0a);
			}
			.glyph {
				margin-right: 0.35em;
				color: var(--roxy-muted, #71717a);
			}
			.state {
				font-size: var(--roxy-text-xs, 0.75rem);
				padding: 0.1rem 0.45rem;
				border-radius: var(--roxy-radius-sm, 4px);
				border: 1px solid var(--roxy-border, #e4e4e7);
				color: var(--roxy-fg, #0a0a0a);
			}
			.state.invisible {
				background: color-mix(
					in srgb,
					var(--roxy-warning, #f59e0b) 14%,
					transparent
				);
			}
			.retro {
				color: var(--roxy-warning-fg, #9a3412);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.window {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
			}
			.meta {
				margin: 0;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				line-height: var(--roxy-leading-normal, 1.5);
			}
			.num {
				font-variant-numeric: tabular-nums;
			}
		`,
	];

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No heliacal data</div>`;
	}

	protected renderData(d: HeliacalResponse) {
		const grahas = d.grahas ?? [];
		if (!grahas.length) return this.renderEmpty();

		return html`<div class="wrap" part="card" aria-label="Heliacal visibility">
			<header class="head" part="header">
				<h2 class="title">Heliacal rising and setting</h2>
				<p class="sub">
					Whether each graha stands far enough from the Sun to be seen, for
					${d.date}. The Sun and the nodes never appear here: they have no
					heliacal event.
				</p>
			</header>
			<div class="rows" part="table">${grahas.map((g) => this.renderGraha(g))}</div>
		</div>`;
	}

	private renderGraha(g: Graha) {
		const glyph = planetGlyph(g.graha) ?? '';
		return html`<article class="row">
			<div class="row-top">
				<span class="graha">
					${glyph ? html`<span class="glyph">${glyph}</span>` : nothing}${g.graha}
				</span>
				<span class="state ${g.visible ? 'visible' : 'invisible'}">
					${g.visible ? 'Visible' : 'Invisible'}
				</span>
				${
					g.retrograde
						? html`<span class="retro" title="retrograde">R</span>`
						: nothing
				}
			</div>
			<p class="window" part="window">${this.windowLine(g)}</p>
			<p class="meta" part="details">${this.metaLine(g)}</p>
		</article>`;
	}

	/**
	 * The headline: what a reader came for. Leads with the NEXT event, since that is the date a muhurta decision turns on, and falls back to the last one when nothing lies ahead inside the search horizon.
	 */
	private windowLine(g: Graha) {
		const next = g.nextEvent;
		const last = g.lastEvent;
		if (next) {
			const verb = NEXT_EVENT_WORD[next.type];
			const where = next.horizon === 'east' ? 'in the east' : 'in the west';
			return html`${g.visible ? 'Visible until it' : 'Invisible until it'} ${verb}
			${where} on <strong>${formatDateTime(this.effectiveLang(), next.datetime)}</strong>`;
		}
		if (last) {
			return html`${EVENT_WORD[last.type]}
			${last.horizon === 'east' ? 'in the east' : 'in the west'} on
			<strong>${formatDateTime(this.effectiveLang(), last.datetime)}</strong>, with no further event
			inside the search window`;
		}
		return html`No rising or setting inside the search window, which is normal for
		a graha far from the Sun`;
	}

	/**
	 * The supporting line: the measured separation against the limit it is judged by, plus which horizon the graha belongs to.
	 *
	 * Both numbers are degrees of TIME in oblique ascension rather than a plain longitude gap, which is the measure the Surya Siddhanta defines these limits in and the reason the verdict depends on latitude at all.
	 *
	 * @remarks
	 * The differing-limit note is derived by COMPARING the two numbers the response carries, never by naming which grahas have a retrograde variant. Only Mercury and Venus do: ix.7-8 gives them 12 or 14 and 8 or 10, while Jupiter, Saturn, Mars and the Moon each have one limit whatever their motion. Tying the note to retrograde motion instead would claim a variant limit for a retrograde Jupiter, which does not exist, and a practitioner reads that as the component not knowing the rule. Comparing the data cannot make that mistake and needs no copy of the table.
	 */
	private metaLine(g: Graha) {
		const side =
			g.horizon === 'east'
				? 'a morning graha, read before sunrise'
				: 'an evening graha, read after sunset';
		const at = g.nextEvent ?? g.lastEvent;
		const shifts = at && at.kalamsa !== g.kalamsa;
		return html`<span class="num">${formatNumber(g.timeDegrees, 2)}&deg;</span>
		of time from the Sun against a limit of
		<span class="num">${formatNumber(g.kalamsa, 0)}&deg;</span>${
			shifts
				? html`, becoming
					<span class="num">${formatNumber(at.kalamsa, 0)}&deg;</span> at that
					event`
				: ''
		} &middot; ${side}`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-heliacal-table': RoxyHeliacalTable;
	}
}
