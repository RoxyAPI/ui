import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type {
	CalculateZodiacAnimalResponse,
	GetDailyZodiacReadingResponse,
	GetZodiacAnimalResponse,
	GetZodiacCompatibilityResponse,
} from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatDate, formatInteger } from '../utils/format.js';
import {
	frameCaptionStyles,
	renderConventionsCaption,
} from '../utils/frame.js';

type ZodiacData =
	| CalculateZodiacAnimalResponse
	| GetZodiacAnimalResponse
	| GetDailyZodiacReadingResponse
	| GetZodiacCompatibilityResponse;

/**
 * The animal identity block, derived from the spec rather than declared here.
 *
 * @remarks
 * Four shapes on this card carry an animal and each carries a different subset of it: the partner
 * animals have no polarity, the daily reading nests one under `animal`, and the reference read IS
 * one at the top level. Taking the fullest of them and making every field optional is what lets one
 * render path read all four, and it keeps the type spec-derived, so a field renamed upstream fails
 * here rather than rendering blank.
 */
type ZodiacAnimal = Partial<CalculateZodiacAnimalResponse['animal']>;

/**
 * Chinese zodiac card. Pass `data` from POST /chinese-astrology/zodiac/sign,
 * GET /chinese-astrology/zodiac/animals/{id}, GET /chinese-astrology/zodiac/{id}/daily, or
 * GET /chinese-astrology/zodiac/compatibility/{sign1}/{sign2}, and set `mode` to match.
 *
 * @remarks
 * Four questions about the same twelve animals, so one card with four layouts rather than four
 * cards that would each redraw the identity block: the animal in hanzi, its romanisation, its
 * element and its polarity. **The hanzi is the identity**, identical in every language the API
 * serves, so it leads and the name sits under it.
 *
 * The animal a date falls in is NOT the animal of the calendar year it falls in, and the card says
 * so by printing the year boundary the response was computed under. A birth in late January is the
 * case that separates the two rules, and a card that hides which one produced its answer cannot be
 * reconciled against the almanac a reader already owns.
 *
 * `hide-readings` keeps every structural fact and drops the prose: the animal, the pillar, the
 * element and polarity, the hours the branch governs, the trine and the three partner animals, the
 * compatibility score and its named relationship all stay. The interpretation, the daily overview
 * and its three topic paragraphs, the traits, strengths and weaknesses lists, the summaries and the
 * advice go.
 *
 * **This card is English end to end, by decision, on the same grounds as the other two
 * Chinese-metaphysics cards.** Its vocabulary was sourced across all seven catalogue languages and
 * could not be written honestly in every one, so it stays English until a practitioner in each can
 * source it, and every value prints as the response sent it rather than half of them arriving
 * translated under an English heading. The one translated line is the conventions caption, drawn by
 * a shared helper rather than by this card.
 */
@customElement('roxy-zodiac-card')
export class RoxyZodiacCard extends RoxyDataElement<ZodiacData> {
	static styles = [
		baseStyles,
		frameCaptionStyles,
		css`
			.card {
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
				align-items: center;
				gap: var(--roxy-space-md, 1rem);
				flex-wrap: wrap;
			}
			.hanzi {
				font-size: 2.75rem;
				line-height: 1;
				color: var(--roxy-accent-ink, #b45309);
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-xl, 1.5rem);
				font-weight: var(--roxy-weight-bold, 600);
				letter-spacing: var(--roxy-tracking-tight);
			}
			.sub {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-muted, #71717a);
			}
			.energy {
				margin-left: auto;
				font-variant-numeric: tabular-nums;
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-secondary, #475569);
			}
			.energy-bar {
				display: inline-block;
				width: 6rem;
				height: 6px;
				background: var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-full, 9999px);
				overflow: hidden;
				margin-left: 6px;
				vertical-align: middle;
			}
			.energy-bar > span {
				display: block;
				height: 100%;
				background: var(--roxy-accent, #f59e0b);
			}

			.facts {
				display: flex;
				flex-wrap: wrap;
				gap: 0.35rem var(--roxy-space-md, 1rem);
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				padding-top: var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-secondary, #475569);
			}
			.facts .lbl {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				font-weight: var(--roxy-weight-bold, 600);
				margin-right: 0.35rem;
			}
			.facts b {
				color: var(--roxy-fg, #0a0a0a);
				font-weight: var(--roxy-weight-bold, 600);
			}

			.block-title {
				margin: 0 0 var(--roxy-space-sm, 0.5rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.prose {
				margin: 0;
				font-size: var(--roxy-text-base, 1rem);
				line-height: 1.7;
				color: var(--roxy-fg, #0a0a0a);
			}
			.sections {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
				gap: var(--roxy-space-md, 1rem);
			}
			.section p {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
			}

			.chips {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.chips span {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 16%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				padding: 2px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			.bullets {
				margin: 0;
				padding-left: 1.1rem;
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
			}

			.partners {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.partner {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem);
				display: grid;
				gap: 0.1rem;
				text-align: center;
			}
			.partner .role {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				font-weight: var(--roxy-weight-bold, 600);
			}
			.partner .glyph {
				font-size: 1.5rem;
				line-height: 1.15;
				color: var(--roxy-accent-ink, #b45309);
			}
			.partner .who {
				font-size: var(--roxy-text-sm, 0.875rem);
			}

			.score {
				display: flex;
				align-items: baseline;
				gap: var(--roxy-space-sm, 0.5rem);
				flex-wrap: wrap;
			}
			.score-value {
				font-size: 2rem;
				font-weight: var(--roxy-weight-bold, 600);
				font-variant-numeric: tabular-nums;
				line-height: 1;
			}
			.score-track {
				flex: 1;
				min-width: 8rem;
				height: 8px;
				background: var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-full, 9999px);
				overflow: hidden;
			}
			.score-fill {
				display: block;
				height: 100%;
				background: var(--roxy-accent, #f59e0b);
			}
			.tag {
				padding: 1px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
				background: color-mix(in srgb, var(--roxy-info, #2563eb) 16%, transparent);
				color: var(--roxy-info-fg, #1e40af);
			}
			.pair {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: var(--roxy-space-md, 1rem);
				flex-wrap: wrap;
			}
			.pair .side {
				display: grid;
				gap: 0.1rem;
				text-align: center;
			}
		`,
	];

	/** Which of the four zodiac reads the response is. */
	@property({ type: String, reflect: true })
	mode: 'sign' | 'animal' | 'daily' | 'compatibility' = 'sign';

	protected renderData(d: ZodiacData) {
		if (this.mode === 'compatibility' && 'signs' in d) {
			return this.renderCompatibility(d);
		}
		const animal: ZodiacAnimal =
			'animal' in d && d.animal ? d.animal : (d as ZodiacAnimal);
		const locale = this.effectiveLang();
		const energy =
			'energyRating' in d && typeof d.energyRating === 'number'
				? d.energyRating
				: null;
		const dateLabel = 'date' in d && d.date ? formatDate(locale, d.date) : '';
		return html`<article class="card" part="card" aria-labelledby="zodiac-title">
			<header class="head" part="header">
				<span class="hanzi" lang="zh">${animal.chinese ?? ''}</span>
				<div>
					<h2 class="title" id="zodiac-title">${animal.name ?? ''}</h2>
					<div class="sub">
						${animal.pinyin ?? ''}${dateLabel ? ` ${dateLabel}` : ''}
					</div>
				</div>
				${
					energy !== null
						? html`<span
							class="energy"
							part="details"
							aria-label=${`Energy ${energy} of 10`}
							>Energy ${formatInteger(locale, energy)}/10
							<span class="energy-bar"
								><span style="width: ${(energy / 10) * 100}%"></span
							></span>
						</span>`
						: nothing
				}
			</header>

			${this.renderIdentity(d, animal)}
			${this.renderDaily(d)}
			${this.renderReference(d)}
			${
				'interpretation' in d && d.interpretation && !this.hideReadings
					? html`<p class="prose" part="section interpretation">${d.interpretation}</p>`
					: nothing
			}
			${
				'conventions' in d
					? renderConventionsCaption(d.conventions, this.translator)
					: nothing
			}
		</article>`;
	}

	/** The facts that identify the animal itself: its element and polarity, its branch, and the pillar it came from. */
	private renderIdentity(d: ZodiacData, animal: ZodiacAnimal) {
		const pillar =
			('yearPillar' in d && d.yearPillar) ||
			('dayPillar' in d && d.dayPillar) ||
			null;
		const hours = 'hours' in d ? d.hours : undefined;
		const element =
			('element' in d && typeof d.element === 'string' && d.element) ||
			animal.element ||
			'';
		const polarity =
			('polarity' in d && typeof d.polarity === 'string' && d.polarity) ||
			animal.polarity ||
			'';
		if (!element && !polarity && !pillar && !hours && !animal.branch) {
			return nothing;
		}
		return html`<div class="facts" part="details">
			${
				element
					? html`<span><span class="lbl">Element</span><b>${element}</b></span>`
					: nothing
			}
			${polarity ? html`<span><span class="lbl">Polarity</span>${polarity}</span>` : nothing}
			${
				animal.branch
					? html`<span><span class="lbl">Branch</span>${animal.branch}</span>`
					: nothing
			}
			${
				// The two shapes that carry a pillar here agree on the stem and the
				// branch and nothing else, so the label is built from those.
				pillar
					? html`<span
						><span class="lbl">Pillar</span> <b>${pillar.stem ?? ''}</b>
						${pillar.branch ?? ''}</span
					>`
					: nothing
			}
			${
				// The branch governs a two-hour double hour, which is what makes it a
				// clock as well as a year name.
				hours && typeof hours.start === 'number'
					? html`<span
						><span class="lbl">Hours</span>${this.hourLabel(hours.start)} to
						${this.hourLabel(hours.end)}</span
					>`
					: nothing
			}
		</div>`;
	}

	/** A double hour printed as a 24-hour clock, which is how an almanac prints it in every language. */
	private hourLabel(hour: unknown): string {
		return typeof hour === 'number'
			? `${String(hour).padStart(2, '0')}:00`
			: '';
	}

	/** The daily reading: what the day's pillar does to this animal, and the year it sits inside. */
	private renderDaily(d: ZodiacData) {
		if (!('relationship' in d) || !('overview' in d)) return nothing;
		const year = 'year' in d ? d.year : undefined;
		const benMing = 'benMingNian' in d ? d.benMingNian : false;
		return html`${html`<div class="facts" part="details">
				<span><span class="lbl">Day</span><b>${d.relationship ?? ''}</b></span>
				${
					year
						? html`<span
							><span class="lbl">Year</span>${year.pillar ?? ''} ${year.animal ?? ''}
							${year.relationship ?? ''}</span
						>`
						: nothing
				}
				${
					// The year of one's own animal, which an almanac flags because the
					// tradition treats it as the year to be careful in.
					benMing ? html`<span class="tag">Ben Ming Nian</span>` : nothing
				}
			</div>`}
		${
			this.hideReadings
				? nothing
				: html`${
						d.overview
							? html`<p class="prose" part="section overview">${d.overview}</p>`
							: nothing
					}
				<div class="sections" part="section outlook">
					${
						'love' in d && d.love
							? html`<div class="section">
								<h3 class="block-title">Love</h3>
								<p>${d.love}</p>
							</div>`
							: nothing
					}
					${
						'career' in d && d.career
							? html`<div class="section">
								<h3 class="block-title">Career</h3>
								<p>${d.career}</p>
							</div>`
							: nothing
					}
					${
						'advice' in d && d.advice
							? html`<div class="section">
								<h3 class="block-title">Advice</h3>
								<p>${d.advice}</p>
							</div>`
							: nothing
					}
				</div>`
		}
		${
			year?.note && !this.hideReadings
				? html`<p class="prose" part="reading">${year.note}</p>`
				: nothing
		}`;
	}

	/** The reference read of one animal: its trine, its three partner animals, and the lists that describe it. */
	private renderReference(d: ZodiacData) {
		if (!('trine' in d) && !('secretFriend' in d)) return nothing;
		const ref = d as GetZodiacAnimalResponse;
		return html`${
			ref.trine
				? html`<section part="section trine">
					<h3 class="block-title">Trine ${ref.trine.number ?? ''}</h3>
					<div class="facts">
						<span
							><b lang="zh">${ref.trine.chinese ?? ''}</b> ${ref.trine.element ?? ''}</span
						>
						${
							ref.trine.members?.length
								? html`<span class="chips"
										>${ref.trine.members.map((m) => html`<span>${m}</span>`)}</span
									>`
								: nothing
						}
						${ref.trine.theme ? html`<span>${ref.trine.theme}</span>` : nothing}
					</div>
				</section>`
				: nothing
		}
		${this.renderPartners(ref)}
		${
			this.hideReadings
				? nothing
				: html`${
						ref.summary
							? html`<p class="prose" part="section summary">${ref.summary}</p>`
							: nothing
					}
				${
					ref.traits?.length
						? html`<section part="section traits">
							<h3 class="block-title">Traits</h3>
							<div class="chips">${ref.traits.map((t) => html`<span>${t}</span>`)}</div>
						</section>`
						: nothing
				}
				${this.bullets('Strengths', ref.strengths)}
				${this.bullets('Weaknesses', ref.weaknesses)}
				${
					ref.compatibilitySummary
						? html`<p class="prose" part="reading">${ref.compatibilitySummary}</p>`
						: nothing
				}`
		}`;
	}

	/**
	 * The three animals the tradition pairs this one with, and it names all three roles.
	 *
	 * @remarks
	 * The secret friend and the clash are opposite verdicts on the same axis, so a card that shows
	 * one and not the other reads as advice rather than as the structure it is. All three or none.
	 */
	private renderPartners(ref: GetZodiacAnimalResponse) {
		const rows: Array<[string, ZodiacAnimal | undefined]> = [
			['Secret friend', ref.secretFriend],
			['Clash', ref.clashPartner],
			['Harm', ref.harmPartner],
		];
		const present = rows.filter(([, who]) => who?.name);
		if (present.length === 0) return nothing;
		return html`<section part="section partners">
			<div class="partners">
				${present.map(
					([role, who]) => html`<div class="partner">
						<span class="role">${role}</span>
						<span class="glyph" lang="zh">${who?.chinese ?? ''}</span>
						<span class="who">${who?.name ?? ''}</span>
					</div>`,
				)}
			</div>
		</section>`;
	}

	/** A named list of sentences laid out as bullets, which is a reading rather than a fact. */
	private bullets(heading: string, items: readonly string[] | undefined) {
		if (!items?.length) return nothing;
		return html`<section part="section list">
			<h3 class="block-title">${heading}</h3>
			<ul class="bullets">
				${items.map((i) => html`<li>${i}</li>`)}
			</ul>
		</section>`;
	}

	/** Two animals and the named relationship between them, scored. */
	private renderCompatibility(d: GetZodiacCompatibilityResponse) {
		const first = d.signs?.first;
		const second = d.signs?.second;
		const score = typeof d.score === 'number' ? d.score : null;
		return html`<article class="card" part="card" aria-labelledby="zodiac-title">
			<header class="head" part="header">
				<div class="pair">
					<span class="side"
						><span class="hanzi" lang="zh">${first?.chinese ?? ''}</span>
						<span class="sub">${first?.name ?? ''}</span></span
					>
					<span class="side"
						><span class="hanzi" lang="zh">${second?.chinese ?? ''}</span>
						<span class="sub">${second?.name ?? ''}</span></span
					>
				</div>
			</header>
			<h2 class="title" id="zodiac-title">
				${d.relationshipName ?? ''}
				<span lang="zh">${d.relationshipChinese ?? ''}</span>
			</h2>
			${
				score !== null
					? html`<div class="score" part="details">
						<span class="score-value">${score}</span>
						<span class="score-track"
							><span
								class="score-fill"
								style="width: ${Math.max(0, Math.min(100, score))}%"
							></span
						></span>
						${d.verdict ? html`<span class="tag">${d.verdict}</span>` : nothing}
					</div>`
					: nothing
			}
			${
				d.sharedElement
					? html`<div class="facts" part="details">
						<span><span class="lbl">Shared element</span><b>${d.sharedElement}</b></span>
					</div>`
					: nothing
			}
			${
				this.hideReadings
					? nothing
					: html`${
							d.summary
								? html`<p class="prose" part="section summary">${d.summary}</p>`
								: nothing
						}
					${this.bullets('Strengths', d.strengths)}
					${this.bullets('Frictions', d.frictions)}
					${d.advice ? html`<p class="prose" part="reading">${d.advice}</p>` : nothing}`
			}
		</article>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-zodiac-card': RoxyZodiacCard;
	}
}
