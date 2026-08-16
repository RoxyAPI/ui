import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type {
	CalculateProfileResponse,
	CalculateTypeResponse,
} from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { disclosureStyles } from '../utils/disclosure.js';
import {
	hdReadingStyles,
	renderHdFacts,
	renderHdKeynotes,
	renderHdThemes,
} from '../utils/hd-reading.js';
import { interpAccordionStyles } from '../utils/interp-accordion.js';
import { display } from '../utils/localized.js';

type HdIdentity = CalculateTypeResponse | CalculateProfileResponse;

/**
 * The Human Design identity read on its own, without the chart. Pass `data` from `/human-design/type` or `/human-design/profile`.
 *
 * @remarks
 * Both endpoints answer "who is this person" rather than "how is the chart wired", so one card serves both and detects which it was given: the type response leads with the type and carries the strategy, authority, and aura readings; the profile response carries the two lines and their keynotes. This is the same shape-detecting pattern `roxy-positions-table` uses across the five Western point-list endpoints.
 *
 * The interpretation surface (fact tiles, lead paragraph, signature and not-self pills, the exclusive reading accordion, the line keynotes) is shared with `roxy-bodygraph` through `utils/hd-reading.ts`, because `/human-design/type` returns a strict subset of the bodygraph interpretation fields. Reach for `roxy-bodygraph` when the chart itself is wanted; reach for this when only the reading is.
 *
 * The type, strategy, authority, signature and not-self values are read through `display()`, so a translated response prints the display half and the canonical English stays available to anything that compares. `/human-design/profile` carries no vocabulary at all: its profile is `5/1` and its two keynotes are prose the API translates in place.
 */
@customElement('roxy-hd-type-card')
export class RoxyHdTypeCard extends RoxyDataElement<HdIdentity> {
	static styles = [
		baseStyles,
		disclosureStyles,
		interpAccordionStyles,
		hdReadingStyles,
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
		`,
	];

	protected renderData(d: HdIdentity) {
		return isTypeShape(d) ? this.renderType(d) : this.renderProfile(d);
	}

	/**
	 * The type read. The tiles answer it at a glance, the lead paragraph grounds the type label in what the aura actually does, and the accordion carries the three interpretations that make the chart actionable: how to engage (strategy), how to decide (authority), and how the field is felt by others (aura).
	 */
	private renderType(d: CalculateTypeResponse) {
		return html`<div class="wrap" part="card">
			<header class="head" part="header">
				<h2 class="title">${this.t('Type')}</h2>
				${
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
			${renderHdFacts([
				{ label: this.t('Type'), value: display(d, 'type') },
				{ label: this.t('Strategy'), value: display(d, 'strategy') },
				{ label: this.t('Authority'), value: display(d, 'authority') },
				{ label: this.t('Profile'), value: d.profile },
			])}
			${
				// The tiles above name the type; this paragraph explains it.
				d.typeDescription && !this.hideReadings
					? html`<p class="lead">${d.typeDescription}</p>`
					: nothing
			}
			${renderHdThemes(
				d.signature ? display(d, 'signature') : undefined,
				d.notSelf ? display(d, 'notSelf') : undefined,
				this.translator,
			)}
			${this.renderInterpretation(
				[
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
					{ label: this.t('Aura'), body: d.aura },
				],
				'hd-type-reading',
			)}
		</div>`;
	}

	/**
	 * The profile read. Two keynote sentences, so they render open as a definition list rather than behind a disclosure: putting a single sentence behind a click costs the reader more than it saves.
	 */
	private renderProfile(d: CalculateProfileResponse) {
		return html`<div class="wrap" part="card">
			<header class="head" part="header">
				<h2 class="title">${this.t('Profile')}</h2>
				${d.profile ? html`<div class="type-line">${d.profile}</div>` : nothing}
			</header>
			${renderHdFacts([
				{ label: this.t('Profile'), value: d.profile },
				{
					label: this.t('Personality line'),
					value: d.personalityLine?.toString(),
				},
				{ label: this.t('Design line'), value: d.designLine?.toString() },
			])}
			${
				// The section holds nothing but the two keynote sentences, and the line
				// numbers are already tiles above it, so it goes whole.
				this.hideReadings
					? nothing
					: html`<section class="block" part="section lines">
						<h3>${this.t('Lines')}</h3>
						${renderHdKeynotes(
							{
								personality: d.personalityKeynote,
								personalityLine: d.personalityLine,
								design: d.designKeynote,
								designLine: d.designLine,
							},
							this.translator,
						)}
					</section>`
			}
		</div>`;
	}
}

/** The two responses share only `profile`, so the type field is what tells them apart. */
function isTypeShape(d: HdIdentity): d is CalculateTypeResponse {
	return typeof (d as CalculateTypeResponse).type === 'string';
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-hd-type-card': RoxyHdTypeCard;
	}
}
