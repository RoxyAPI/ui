import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type {
	CalculateBirthDayResponse,
	CalculateExpressionResponse,
	CalculateLifePathResponse,
	CalculateMaturityResponse,
	CalculatePersonalDayResponse,
	CalculatePersonalityResponse,
	CalculatePersonalMonthResponse,
	CalculatePersonalYearResponse,
	CalculateSoulUrgeResponse,
	GenerateNumerologyChartResponse,
	GetDailyNumberResponse,
} from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { disclosureStyles } from '../utils/disclosure.js';
import { formatDate } from '../utils/format.js';
import {
	type InterpSection,
	interpAccordionStyles,
	renderInterpAccordion,
} from '../utils/interp-accordion.js';
import { humanize } from '../utils/string.js';

/**
 * Single-number numerology responses that share the number + meaning + calculation + karmic-debt shape. {@link RoxyNumerologyCard.renderNumberCard} renders any of them; the `type` attribute selects only the heading label.
 */
type NumberCardData =
	| CalculateLifePathResponse
	| CalculateExpressionResponse
	| CalculateSoulUrgeResponse
	| CalculatePersonalityResponse
	| CalculateBirthDayResponse
	| CalculateMaturityResponse;

type NumerologyData =
	| NumberCardData
	| CalculatePersonalYearResponse
	| CalculatePersonalDayResponse
	| CalculatePersonalMonthResponse
	| GetDailyNumberResponse
	| GenerateNumerologyChartResponse;

/**
 * The interpretation block a numerology number carries: archetype keywords, the long reading, the strengths and challenges lists, and the three life-area readings. Every core number, the daily number, and the birth-day profile ship this same block (the profile omits spirituality), so one renderer serves them all. Partial, because the birth-day profile is the narrower shape.
 */
type NumerologyReading = Partial<CalculateLifePathResponse['meaning']>;

/** Master numbers are never reduced, and a reader has to see immediately that they are looking at one. */
const MASTER_NUMBERS = new Set([11, 22, 33]);

/** The three life-area readings, in the order a numerologist gives them. */
const GUIDANCE_FIELDS: ReadonlyArray<[keyof NumerologyReading, string]> = [
	['career', 'Career'],
	['relationships', 'Relationships'],
	['spirituality', 'Spirituality'],
];

/**
 * Numerology card. Renders /numerology/{life-path,expression,soul-urge,personality,birth-day,maturity,daily,personal-day,personal-month,personal-year,chart}.
 * Use the `type` attribute to switch the heading; the single-number types all share one layout.
 */
@customElement('roxy-numerology-card')
export class RoxyNumerologyCard extends RoxyDataElement<NumerologyData> {
	static styles = [
		baseStyles,
		disclosureStyles,
		interpAccordionStyles,
		css`
			.card {
				background: var(--roxy-surface, #fff);
				color: var(--roxy-fg, #0a0a0a);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}

			.hero {
				display: flex;
				align-items: center;
				gap: var(--roxy-space-md, 1rem);
			}
			.numeral {
				font-size: 4rem;
				line-height: 1;
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-accent-ink, #b45309);
				font-variant-numeric: tabular-nums;
			}
			.label {
				margin: 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.meaning {
				margin: 0;
				color: var(--roxy-fg, #0a0a0a);
			}
			/* The tint carries the accent; the text stays --roxy-fg, because accent
			 * ink on a tinted chip misses WCAG AA. */
			.master {
				display: inline-block;
				margin-top: 2px;
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 18%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				border-radius: var(--roxy-radius-full, 9999px);
				padding: 2px 10px;
				font-size: var(--roxy-text-xs, 0.75rem);
				font-weight: var(--roxy-weight-bold, 600);
			}

			.calc {
				margin: 0;
				font-family: var(--roxy-font-mono);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				background: color-mix(in srgb, var(--roxy-border, #e4e4e7) 30%, transparent);
				padding: var(--roxy-space-sm, 0.5rem);
				border-radius: var(--roxy-radius-sm, 4px);
				white-space: pre-wrap;
				overflow-wrap: anywhere;
			}

			.chips {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.chips span {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
				color: var(--roxy-fg, #0a0a0a);
				padding: 2px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
			}

			.cores {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
				gap: var(--roxy-space-sm, 0.5rem);
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				padding-top: var(--roxy-space-md, 1rem);
			}
			.cores .item {
				display: grid;
				gap: 2px;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			.cores .item .core-head {
				display: flex;
				align-items: baseline;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.cores .item .core-key {
				color: var(--roxy-muted, #71717a);
				text-transform: capitalize;
			}
			.cores .item strong {
				color: var(--roxy-accent-ink, #b45309);
				font-variant-numeric: tabular-nums;
				font-size: var(--roxy-text-base, 1rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.cores .item .core-title {
				color: var(--roxy-fg, #0a0a0a);
				font-size: var(--roxy-text-xs, 0.75rem);
			}

			.lists {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
				gap: var(--roxy-space-md, 1rem);
			}
			.lists h3 {
				margin: 0 0 var(--roxy-space-xs, 0.25rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.lists ul {
				margin: 0;
				padding-left: 1.1rem;
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				line-height: 1.6;
			}

			.sub {
				display: grid;
				gap: var(--roxy-space-sm, 0.5rem);
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				padding-top: var(--roxy-space-md, 1rem);
			}
			/* Direct child, and a class for the inner title: the accordion and the
			 * strengths/challenges lists render their own h3 one level down, and a bare
			 * element selector here would repaint both. */
			.sub > h3 {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.sub-title {
				margin: 0;
				font-size: var(--roxy-text-base, 1rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.sub p {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				line-height: 1.6;
			}

			.attrs {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
				gap: var(--roxy-space-sm, 0.5rem);
				margin: 0;
			}
			.attr {
				display: grid;
				gap: 2px;
			}
			.attr dt {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.05em;
			}
			.attr dd {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: 500;
			}

			.karmic {
				background: color-mix(in srgb, var(--roxy-warning, #ea580c) 12%, transparent);
				border: 1px solid color-mix(in srgb, var(--roxy-warning, #ea580c) 32%, transparent);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				border-radius: var(--roxy-radius-md, 8px);
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
			}
		`,
	];

	@property({ type: String, reflect: true })
	type:
		| 'life-path'
		| 'expression'
		| 'soul-urge'
		| 'personality'
		| 'birth-day'
		| 'maturity'
		| 'daily'
		| 'personal-day'
		| 'personal-month'
		| 'personal-year'
		| 'chart' = 'life-path';

	protected renderData(d: NumerologyData) {
		const headerLabel = LABELS[this.type] ?? this.type;
		if ('coreNumbers' in d) return this.renderChart(d, headerLabel);
		// Period reads share a number+theme+body shape but differ in field names;
		// check the most specific key first (a personal-day response also carries
		// personalMonth/personalYear), so the order is day -> month -> year.
		if ('personalDay' in d) return this.renderPersonalDay(d, headerLabel);
		if ('personalMonth' in d) return this.renderPersonalMonth(d, headerLabel);
		if ('personalYear' in d) return this.renderPersonalYear(d, headerLabel);
		if ('dailyMessage' in d) return this.renderDailyNumber(d, headerLabel);
		return this.renderNumberCard(d as NumberCardData, headerLabel);
	}

	protected renderEmpty() {
		return html`<div class="roxy-empty" role="status">No numerology data</div>`;
	}

	private renderNumberCard(d: NumberCardData, headerLabel: string) {
		return html`<article class="card" aria-label=${headerLabel}>
			${this.renderHero(headerLabel, d.number, d.meaning?.title, isMaster(d.number, d.type))}
			${d.meaning?.description ? html`<p class="meaning">${d.meaning.description}</p>` : nothing}
			${d.calculation ? html`<pre class="calc">${d.calculation}</pre>` : nothing}
			${
				d.hasKarmicDebt && d.karmicDebtNumber
					? html`<div class="karmic">
						Karmic debt ${d.karmicDebtNumber}.
						${karmicDebtText(d.karmicDebtMeaning)}
					</div>`
					: nothing
			}
			${this.renderReading(d.meaning, 'numerology-guidance')}
		</article>`;
	}

	/** The daily number carries the same full interpretation as a core number, plus the message for the day. */
	private renderDailyNumber(d: GetDailyNumberResponse, headerLabel: string) {
		return html`<article class="card" aria-label=${headerLabel}>
			${this.renderHero(headerLabel, d.number, d.meaning?.title, isMaster(d.number, d.type))}
			${d.dailyMessage ? html`<p class="meaning">${d.dailyMessage}</p>` : nothing}
			${d.meaning?.description ? html`<p class="meaning">${d.meaning.description}</p>` : nothing}
			${this.renderReading(d.meaning, 'numerology-daily-guidance')}
		</article>`;
	}

	/** A personal day sits inside its personal month, which sits inside its personal year. Dropping that nesting strips the day of the context that gives it meaning. */
	private renderPersonalDay(
		d: CalculatePersonalDayResponse,
		headerLabel: string,
	) {
		return html`<article class="card" aria-label=${headerLabel}>
			${this.renderHero(headerLabel, d.personalDay, d.theme)}
			${d.guidance ? html`<p class="meaning">${d.guidance}</p>` : nothing}
			<dl class="attrs">
				${this.attr('Date', formatDate(d.targetDate))}
				${this.attr(
					'Personal month',
					joinCycle(d.personalMonth, d.personalMonthTheme),
				)}
				${this.attr(
					'Personal year',
					joinCycle(d.personalYear, d.personalYearTheme),
				)}
			</dl>
		</article>`;
	}

	private renderPersonalMonth(
		d: CalculatePersonalMonthResponse,
		headerLabel: string,
	) {
		return html`<article class="card" aria-label=${headerLabel}>
			${this.renderHero(headerLabel, d.personalMonth, d.theme)}
			${d.focus ? html`<p class="meaning">${d.focus}</p>` : nothing}
			<dl class="attrs">
				${this.attr('Calendar month', d.calendarMonth)}
				${this.attr(
					'Personal year',
					joinCycle(d.personalYear, d.personalYearTheme),
				)}
			</dl>
		</article>`;
	}

	private renderPersonalYear(
		d: CalculatePersonalYearResponse,
		headerLabel: string,
	) {
		return html`<article class="card" aria-label=${headerLabel}>
			${this.renderHero(headerLabel, d.personalYear, d.theme)}
			${d.cycle ? html`<p class="label">${d.cycle}</p>` : nothing}
			${d.forecast ? html`<p class="meaning">${d.forecast}</p>` : nothing}
			${this.renderLists(
				['Opportunities', d.opportunities],
				['Challenges', d.challenges],
			)}
			${d.advice ? html`<p class="meaning">${d.advice}</p>` : nothing}
		</article>`;
	}

	private renderChart(d: GenerateNumerologyChartResponse, headerLabel: string) {
		const cores = Object.entries(d.coreNumbers ?? {}).filter(([, v]) => v);
		const ins = d.additionalInsights;
		const lucky = d.luckyAssociations;
		const profile = d.birthDayProfile;
		const maturity = d.maturityStatus;

		return html`<article class="card" aria-label=${headerLabel}>
			<div>
				<p class="label">${headerLabel}</p>
				${d.profile?.name ? html`<h2 class="title">${d.profile.name}</h2>` : nothing}
				${d.profile?.birthdate ? html`<p class="label">${formatDate(d.profile.birthdate)}</p>` : nothing}
			</div>
			${d.summary ? html`<p class="meaning">${d.summary}</p>` : nothing}
			${
				cores.length > 0
					? html`<div class="cores">
						${cores.map(
							([k, v]) => html`<div class="item">
								<div class="core-head">
									<span class="core-key">${humanize(k)}</span>
									<strong>${v.number ?? ''}</strong>
								</div>
								${v.meaning?.title ? html`<span class="core-title">${v.meaning.title}</span>` : nothing}
								${isMaster(v.number, v.type) ? html`<span class="master">Master ${v.number}</span>` : nothing}
							</div>`,
						)}
					</div>`
					: nothing
			}
			${renderInterpAccordion(
				cores.map(([k, v]) => ({
					label: humanize(k),
					aside: [
						v.number != null ? `${v.number}` : '',
						isMaster(v.number, v.type) ? 'master' : '',
						v.hasKarmicDebt && v.karmicDebtNumber
							? `karmic debt ${v.karmicDebtNumber}`
							: '',
					]
						.filter(Boolean)
						.join(' · '),
					body: v.meaning?.description ?? '',
					extra: this.renderReading(v.meaning, `numerology-core-${k}`),
				})),
				'numerology-cores',
				'Core numbers',
			)}
			${
				maturity
					? html`<dl class="attrs">
						${this.attr('Maturity', maturity.isActive ? 'Active' : 'Not yet active')}
						${this.attr('Current age', maturity.currentAge)}
						${this.attr('Activates', maturity.activationRange)}
					</dl>`
					: nothing
			}
			${
				profile
					? html`<section class="sub">
						<h3>Birth day profile</h3>
						${
							profile.title
								? html`<h4 class="sub-title">
									${[profile.day ? `Day ${profile.day}` : '', profile.title].filter(Boolean).join(' · ')}
								</h4>`
								: nothing
						}
						${profile.description ? html`<p>${profile.description}</p>` : nothing}
						${this.renderReading(profile, 'numerology-birth-day-profile')}
					</section>`
					: nothing
			}
			${ins ? this.renderInsights(ins) : nothing}
			${
				lucky
					? html`<section class="sub">
						<h3>Lucky associations</h3>
						<dl class="attrs">
							${this.attr('Day', lucky.day)}
							${this.attr('Element', lucky.element)}
							${this.attr('Ruling planet', lucky.rulingPlanet)}
							${this.attr('Colors', lucky.colors?.join(', '))}
							${this.attr('Gemstones', lucky.gemstones?.join(', '))}
							${this.attr('Compatible', lucky.compatibleNumbers?.join(', '))}
							${this.attr('Incompatible', lucky.incompatibleNumbers?.join(', '))}
						</dl>
					</section>`
					: nothing
			}
		</article>`;
	}

	/** Everything the chart carries beyond the six core numbers: the karmic analysis, the current year and month, the four pinnacles and their paired challenges, the name-derived numbers, and the letter analysis. */
	private renderInsights(
		ins: NonNullable<GenerateNumerologyChartResponse['additionalInsights']>,
	) {
		const lessons = ins.karmicLessons;
		const debt = ins.karmicDebt;
		const year = ins.personalYear;
		const passion = ins.hiddenPassion;
		const subconscious = ins.subconsciousSelf;
		const letters = ins.nameLetters;
		const present = Object.entries(lessons?.presentNumbers ?? {});

		return html`${
			lessons
				? html`<section class="sub">
					<h3>Karmic lessons</h3>
					${
						lessons.missingNumbers?.length
							? html`<div class="chips">
								${lessons.missingNumbers.map((n) => html`<span>Missing ${n}</span>`)}
							</div>`
							: html`<p>No numbers are missing from the birth name.</p>`
					}
					${
						present.length > 0
							? html`<div class="chips">
								${present.map(([digit, count]) => html`<span>${digit} x ${count}</span>`)}
							</div>`
							: nothing
					}
					${renderInterpAccordion(
						(lessons.lessons ?? []).map((l) => ({
							label: l.lesson ?? `Lesson ${l.number}`,
							aside: l.number != null ? `${l.number}` : '',
							body: l.description ?? '',
							extra: l.howToOvercome
								? html`<p><strong>How to overcome.</strong> ${l.howToOvercome}</p>`
								: nothing,
						})),
						'numerology-karmic-lessons',
						'Lessons',
					)}
				</section>`
				: nothing
		}${
			debt?.hasKarmicDebt
				? html`<section class="sub">
					<h3>Karmic debt</h3>
					${
						debt.debtNumbers?.length
							? html`<div class="chips">
								${debt.debtNumbers.map((n) => html`<span>Debt ${n}</span>`)}
							</div>`
							: nothing
					}
					${renderInterpAccordion(
						(debt.meanings ?? []).map((m) => ({
							label: `Karmic debt ${m.number}`,
							body: m.description ?? '',
							extra: html`${
								m.challenge
									? html`<p><strong>Challenge.</strong> ${m.challenge}</p>`
									: nothing
							}${
								m.resolution
									? html`<p><strong>Resolution.</strong> ${m.resolution}</p>`
									: nothing
							}`,
						})),
						'numerology-karmic-debt',
						'Debts',
					)}
				</section>`
				: nothing
		}${
			year
				? html`<section class="sub">
					<h3>Personal year</h3>
					<h4 class="sub-title">
						${[
							year.personalYear != null ? `${year.personalYear}` : '',
							year.theme ?? '',
							year.cycle ?? '',
						]
							.filter(Boolean)
							.join(' · ')}
					</h4>
					${year.forecast ? html`<p>${year.forecast}</p>` : nothing}
					${this.renderLists(
						['Opportunities', year.opportunities],
						['Challenges', year.challenges],
					)}
					${year.advice ? html`<p>${year.advice}</p>` : nothing}
					${
						year.personalMonth
							? html`<p>
								<strong>${[
									year.personalMonth.personalMonth != null
										? `Personal month ${year.personalMonth.personalMonth}`
										: 'Personal month',
									year.personalMonth.theme ?? '',
								]
									.filter(Boolean)
									.join(' · ')}.</strong>
								${year.personalMonth.focus ?? ''}
							</p>`
							: nothing
					}
				</section>`
				: nothing
		}${
			ins.pinnacles?.length
				? html`<section class="sub">
					<h3>Pinnacles</h3>
					${renderInterpAccordion(
						ins.pinnacles.map((p) => ({
							label: [
								p.position != null ? `Pinnacle ${p.position}` : 'Pinnacle',
								p.meaning?.title ?? '',
							]
								.filter(Boolean)
								.join(' · '),
							aside: [
								p.number != null ? `${p.number}` : '',
								ageRange(p.startAge, p.endAge),
							]
								.filter(Boolean)
								.join(' · '),
							body: p.meaning?.description ?? '',
							extra: this.renderLists(
								['Opportunities', p.meaning?.opportunities],
								['Challenges', p.meaning?.challenges],
							),
						})),
						'numerology-pinnacles',
						'Life phases',
					)}
				</section>`
				: nothing
		}${
			ins.challenges?.length
				? html`<section class="sub">
					<h3>Challenges</h3>
					${renderInterpAccordion(
						ins.challenges.map((c) => ({
							label: [
								c.position != null ? `Challenge ${c.position}` : 'Challenge',
								c.meaning?.title ?? '',
							]
								.filter(Boolean)
								.join(' · '),
							aside: [
								c.number != null ? `${c.number}` : '',
								ageRange(c.startAge, c.endAge),
							]
								.filter(Boolean)
								.join(' · '),
							body: c.meaning?.description ?? '',
							extra: html`${
								c.meaning?.lesson
									? html`<p><strong>Lesson.</strong> ${c.meaning.lesson}</p>`
									: nothing
							}${
								c.meaning?.howToOvercome
									? html`<p><strong>How to overcome.</strong> ${c.meaning.howToOvercome}</p>`
									: nothing
							}`,
						})),
						'numerology-challenges',
						'Obstacle periods',
					)}
				</section>`
				: nothing
		}${
			passion || subconscious
				? html`<section class="sub">
					<h3>Name numbers</h3>
					${
						passion
							? html`<div>
								<h4 class="sub-title">
									${[
										passion.number != null
											? `Hidden passion ${passion.number}`
											: 'Hidden passion',
										passion.title ?? '',
									]
										.filter(Boolean)
										.join(' · ')}
								</h4>
								${passion.description ? html`<p>${passion.description}</p>` : nothing}
								${
									typeof passion.count === 'number'
										? html`<p class="label">${`Appears ${passion.count} times in the name`}</p>`
										: nothing
								}
							</div>`
							: nothing
					}
					${
						subconscious
							? html`<div>
								<h4 class="sub-title">
									${[
										subconscious.number != null
											? `Subconscious self ${subconscious.number}`
											: 'Subconscious self',
										subconscious.title ?? '',
									]
										.filter(Boolean)
										.join(' · ')}
								</h4>
								${subconscious.description ? html`<p>${subconscious.description}</p>` : nothing}
								${
									subconscious.uniqueNumbers?.length
										? html`<p class="label">${`Numbers present: ${subconscious.uniqueNumbers.join(', ')}`}</p>`
										: nothing
								}
							</div>`
							: nothing
					}
				</section>`
				: nothing
		}${
			letters
				? html`<section class="sub">
					<h3>Name letters</h3>
					${renderInterpAccordion(
						[
							{
								label: 'Cornerstone',
								aside: letterAside(
									letters.cornerstone?.letter,
									letters.cornerstone?.number,
								),
								body: letters.cornerstone?.meaning ?? '',
							},
							{
								label: 'Capstone',
								aside: letterAside(
									letters.capstone?.letter,
									letters.capstone?.number,
								),
								body: letters.capstone?.meaning ?? '',
							},
							{
								label: 'First vowel',
								aside: letterAside(letters.firstVowel?.letter),
								body: letters.firstVowel?.meaning ?? '',
							},
						],
						'numerology-name-letters',
						'Letter analysis',
					)}
				</section>`
				: nothing
		}`;
	}

	/** Hero row shared by every single-number view: the numeral, the label, the archetype, and the master-number badge when the number is 11, 22, or 33. */
	private renderHero(
		headerLabel: string,
		num: number | undefined,
		title: string | undefined,
		master = false,
	) {
		return html`<div class="hero">
			${typeof num === 'number' ? html`<div class="numeral">${num}</div>` : nothing}
			<div>
				<p class="label">${headerLabel}</p>
				${title ? html`<h2 class="title">${title}</h2>` : nothing}
				${master ? html`<span class="master">Master number</span>` : nothing}
			</div>
		</div>`;
	}

	/** Keyword chips, the strengths and challenges lists, and the three life-area readings behind a disclosure. The whole interpretation, laid out as a reading. */
	private renderReading(r: NumerologyReading | undefined, name: string) {
		if (!r) return nothing;
		const sections: InterpSection[] = GUIDANCE_FIELDS.map(([key, label]) => ({
			label,
			body: (r[key] as string | undefined) ?? '',
		}));
		return html`${
			r.keywords?.length
				? html`<div class="chips">${r.keywords.map((k) => html`<span>${k}</span>`)}</div>`
				: nothing
		}${this.renderLists(['Strengths', r.strengths], ['Challenges', r.challenges])}${renderInterpAccordion(sections, name, 'Guidance')}`;
	}

	/**
	 * Side-by-side prose lists. Each entry names a trait and explains it, so they are bulleted paragraphs, never chips.
	 *
	 * @remarks
	 * `h3`, not `h4`. This renders at the TOP level of the single-number card, where the only heading above it is the `h2` title, so an `h4` skips a level and fails the axe `heading-order` rule. Inside a chart section or an accordion body the heading above is already an `h3`, and a repeated level is fine: the rule flags skips, not repeats.
	 */
	private renderLists(
		...lists: Array<[string, ReadonlyArray<string> | undefined]>
	) {
		const shown = lists.filter(([, items]) => items && items.length > 0);
		if (shown.length === 0) return nothing;
		return html`<div class="lists">
			${shown.map(
				([label, items]) => html`<div>
					<h3>${label}</h3>
					<ul>
						${(items ?? []).map((item) => html`<li>${item}</li>`)}
					</ul>
				</div>`,
			)}
		</div>`;
	}

	private attr(label: string, value: string | number | undefined) {
		if (value === undefined || value === null || value === '') return nothing;
		return html`<div class="attr"><dt>${label}</dt><dd>${value}</dd></div>`;
	}
}

const LABELS: Record<string, string> = {
	'life-path': 'Life Path',
	expression: 'Expression',
	'soul-urge': 'Soul Urge',
	personality: 'Personality',
	'birth-day': 'Birth Day',
	maturity: 'Maturity',
	daily: 'Daily Number',
	'personal-day': 'Personal Day',
	'personal-month': 'Personal Month',
	'personal-year': 'Personal Year',
	chart: 'Numerology chart',
};

type KarmicDebtMeaning = CalculateLifePathResponse['karmicDebtMeaning'];

function karmicDebtText(value: KarmicDebtMeaning | undefined): string {
	if (!value) return '';
	return [value.description, value.challenge, value.resolution]
		.filter(Boolean)
		.join(' ');
}

/** A number is master when the API says so, or when it is one of the three that are never reduced. Both checks, because the period cycles carry the number without the `type` flag. */
function isMaster(num: number | undefined, type?: string): boolean {
	return type === 'master' || (num !== undefined && MASTER_NUMBERS.has(num));
}

/** "5 · Freedom and change", the cycle a smaller cycle sits inside. Empty when the API sent neither half. */
function joinCycle(num: number | undefined, theme: string | undefined): string {
	return [num != null ? `${num}` : '', theme ?? ''].filter(Boolean).join(' · ');
}

/** "ages 27 to 35", or "ages 54 onward" for the final phase, which the API closes with a null end age. */
function ageRange(start: number | undefined, end: number | undefined): string {
	if (start == null) return '';
	return end == null ? `ages ${start} onward` : `ages ${start} to ${end}`;
}

/** "A · 1" for a letter that carries a Pythagorean value, "A" for the first vowel, which does not. */
function letterAside(letter?: string, num?: number): string {
	return [letter ?? '', num != null ? `${num}` : '']
		.filter(Boolean)
		.join(' · ');
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-numerology-card': RoxyNumerologyCard;
	}
}
