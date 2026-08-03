import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PLANET_GLYPH } from '../tokens/index.js';
import type { CalculateTransitResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import {
	formatDegreeInSign,
	longitudeToSignPosition,
} from '../utils/degree.js';
import {
	formatAspectName,
	formatDateTime,
	formatNumber,
} from '../utils/format.js';
import { capitalize } from '../utils/string.js';

type Transiting = CalculateTransitResponse['transitingPlanets'][number];
type Kaksha = Transiting['kaksha'];

/** Kakshas per sign. Fixed by the definition, not by our data: each sign divides into eight stretches of 3 degrees 45 minutes. */
const KAKSHA_COUNT = 8;

/**
 * Gochara: where each graha is transiting now, which natal house it falls in, and the Ashtakavarga-qualified verdict for the exact stretch it occupies.
 *
 * @remarks
 * This renders `POST /vedic-astrology/transit`, the SINGULAR Vedic operation, which is a different response from the Western `calculateTransits` that {@link RoxyTransitsTable} renders. The two are not interchangeable: the Western one carries `transitPlanets` with speed and retrograde flags, this one carries `natalHouse`, `aspectsToNatal` and `kaksha`.
 *
 * **Kaksha is drawn as a POSITION WITHIN THE SIGN, never as a verdict chip.** The sign says where a graha is; the kaksha says whether the sub-four-degree stretch it currently occupies is one its own Bhinnashtakavarga supports. What a practitioner reads off it is how long until the verdict turns, and a single chip throws that away: a graha two thirds through an unsupported kaksha is a different situation from one that just entered it. The eight-segment bar answers both at a glance.
 *
 * The eight kaksha lords run in a fixed order from the start of every sign, and this component deliberately holds NO copy of that order. Only the CURRENT kaksha is labelled, from the `lord` the response carries. A local table would be a second source of truth for data the API owns, and it would sit in a public repo.
 *
 * **`bindu` is null for Rahu and Ketu and must render blank, never as an unfavourable verdict.** The nodes have no Bhinnashtakavarga of their own, so there is no bindu to give; treating the absence as a negative would invent a reading the tradition does not make. Since the OpenAPI 3.1 nullability fix the type is `boolean | null`, so a `bindu ? a : b` no longer typechecks its way past the distinction.
 */
@customElement('roxy-gochara-table')
export class RoxyGocharaTable extends RoxyDataElement<CalculateTransitResponse> {
	static styles = [
		baseStyles,
		css`
			.wrap {
				background: var(--roxy-surface, #fff);
				color: var(--roxy-fg, #0a0a0a);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				grid-template-columns: minmax(0, 1fr);
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
				line-height: var(--roxy-leading-normal, 1.5);
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
			}
			.glyph {
				margin-right: 0.35em;
				color: var(--roxy-muted, #71717a);
			}
			.pos {
				color: var(--roxy-secondary, #475569);
				font-size: var(--roxy-text-sm, 0.875rem);
				font-variant-numeric: tabular-nums;
			}
			.house {
				font-size: var(--roxy-text-xs, 0.75rem);
				padding: 0.1rem 0.45rem;
				border-radius: var(--roxy-radius-sm, 4px);
				border: 1px solid var(--roxy-border, #e4e4e7);
			}
			/* Eight segments, one per kaksha, in sign order. The current one is filled
			 * and tinted by its verdict; the rest stay neutral because the response
			 * carries a bindu only for the kaksha actually occupied. Tinting the others
			 * would be inventing seven readings we were not given. */
			.kaksha-bar {
				display: grid;
				grid-template-columns: repeat(8, 1fr);
				gap: 2px;
				height: 10px;
				margin: 0.15rem 0;
			}
			.seg {
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 60%, transparent);
				border-radius: 2px;
			}
			.seg.here {
				background: color-mix(in srgb, var(--roxy-muted, #71717a) 45%, transparent);
			}
			.seg.here.yes {
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 55%, transparent);
			}
			.seg.here.no {
				background: color-mix(in srgb, var(--roxy-warning, #f59e0b) 55%, transparent);
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
			.aspects {
				margin: 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-secondary, #475569);
				line-height: var(--roxy-leading-normal, 1.5);
			}
			.key {
				padding: var(--roxy-space-md, 1rem);
				border-top: 2px solid var(--roxy-border, #e4e4e7);
				display: grid;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.key-title {
				margin: 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				color: var(--roxy-muted, #71717a);
			}
			.key-item {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				line-height: var(--roxy-leading-normal, 1.5);
			}
		`,
	];

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No transit data</div>`;
	}

	protected renderData(d: CalculateTransitResponse) {
		const planets = d.transitingPlanets ?? [];
		if (!planets.length) return this.renderEmpty();
		const key = d.keyTransits ?? [];

		return html`<div class="wrap" aria-label="Gochara transits">
			<header class="head">
				<h2 class="title">Gochara</h2>
				<p class="sub">
					Where each graha transits at
					<strong>${formatDateTime(d.transitDatetime)}</strong>, read against the
					natal chart of ${formatDateTime(d.birthDatetime)}.
				</p>
			</header>
			<div>${planets.map((p) => this.renderPlanet(p))}</div>
			${
				key.length
					? html`<section class="key">
						<h3 class="key-title">Key transits</h3>
						${key.map(
							(k) => html`<p class="key-item">
								${k.description}
								${
									typeof k.natalHouse === 'number'
										? html`<span class="meta"> &middot; natal house ${k.natalHouse}</span>`
										: nothing
								}
							</p>`,
						)}
					</section>`
					: nothing
			}
		</div>`;
	}

	private renderPlanet(p: Transiting) {
		const glyph = PLANET_GLYPH[capitalize(p.name ?? '')] ?? '';
		const pos =
			typeof p.longitude === 'number'
				? longitudeToSignPosition(p.longitude)
				: undefined;
		const aspects = p.aspectsToNatal ?? [];

		return html`<article class="row">
			<div class="row-top">
				<span class="graha">
					${glyph ? html`<span class="glyph">${glyph}</span>` : nothing}${p.name}
				</span>
				<span class="pos">
					${p.sign}${pos ? html` ${formatDegreeInSign(pos.degree)}` : nothing}
				</span>
				${
					typeof p.natalHouse === 'number'
						? html`<span class="house">natal house ${p.natalHouse}</span>`
						: nothing
				}
			</div>
			${this.renderKaksha(p.kaksha)}
			${
				aspects.length
					? html`<p class="aspects">
						${aspects
							.map(
								(a) =>
									`${formatAspectName({ type: a.aspectType })} natal ${a.natalPlanet}${
										typeof a.orb === 'number'
											? ` (${formatNumber(a.orb, 1)}°)`
											: ''
									}`,
							)
							.join(' · ')}
					</p>`
					: nothing
			}
		</article>`;
	}

	/**
	 * The eight-segment kaksha bar plus its one-line reading.
	 *
	 * @remarks
	 * `bindu` has three states and each renders differently: `true` supports the transit, `false` does not, and `null` means the graha has no Bhinnashtakavarga at all, which is Rahu and Ketu. The null case gets the neutral segment and NO verdict sentence, the same way the planets table leaves the avastha cells blank for the nodes rather than printing a zero.
	 */
	private renderKaksha(k: Kaksha | undefined) {
		if (!k || typeof k.number !== 'number') return nothing;
		const here = k.number;
		const verdict = k.bindu === true ? 'yes' : k.bindu === false ? 'no' : '';

		return html`<div
				class="kaksha-bar"
				role="img"
				aria-label="Kaksha ${here} of ${KAKSHA_COUNT} within ${''}the current sign"
			>
				${Array.from(
					{ length: KAKSHA_COUNT },
					(_, i) =>
						html`<span
							class="seg ${i + 1 === here ? `here ${verdict}` : ''}"
						></span>`,
				)}
			</div>
			<p class="meta">
				Kaksha <span class="num">${here}</span> of ${KAKSHA_COUNT}${
					k.lord ? html`, ruled by ${k.lord}` : ''
				}${
					typeof k.startDegree === 'number' && typeof k.endDegree === 'number'
						? html`, spanning
							<span class="num"
								>${formatNumber(k.startDegree, 2)}&deg; to
								${formatNumber(k.endDegree, 2)}&deg;</span
							>
							of the sign`
						: ''
				}${
					k.bindu === null || k.bindu === undefined
						? ''
						: html`&nbsp;&middot; this kaksha lord
							${k.bindu ? 'gave' : 'gave no'} bindu${
								typeof k.binduCount === 'number'
									? html`, <span class="num">${k.binduCount}</span> of
										${KAKSHA_COUNT} in this sign`
									: ''
							}`
				}
			</p>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-gochara-table': RoxyGocharaTable;
	}
}
