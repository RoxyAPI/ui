/**
 * The interpretation accordion: the one way this library shows a label, a short value, and a body of prose behind a disclosure.
 *
 * @remarks
 * Exclusive by construction (`<details name>`), so a card grows by at most one open section and never becomes a wall of text. Callers pass their own group `name` so two accordions on one page do not fight over which section is open.
 *
 * This lives here rather than in a component because the same accordion is the right shape wherever an endpoint returns a labelled reading: the Human Design bodygraph and type card use it for strategy, authority, and aura; `roxy-hexagram` uses it for the changing lines. A card that draws its own disclosure, because its summary carries more than a label and an aside, still renders the shared body and imports {@link readingDetailStyles} for it rather than restating those rules.
 *
 * **Call it through `RoxyDataElement.renderInterpretation`, never directly.** That method is where `hide-readings` is honoured, so a direct call renders prose a host asked to be left out. The section it emits carries `part="section readings"` and each row `part="reading"`, which is what makes the readings of EVERY component addressable under one name from outside the shadow root.
 */

import { css, html, nothing } from 'lit';
import type { ChromeString } from '../i18n/chrome-strings.js';
import { chevron } from './disclosure.js';
import type { Translate } from './hd-reading.js';

/** One row: the label, the short value shown as the aside, and the interpretation body. `extra` renders under the body for a section that carries more than prose. */
export interface InterpSection {
	label: string;
	aside?: string;
	body: string;
	extra?: unknown;
}

/**
 * Styles for the markup {@link renderReadingDetail} emits. Import this wherever that helper is called; {@link interpAccordionStyles} already embeds it, so an accordion caller needs only the one.
 *
 * @remarks
 * Separate from the accordion shell because the two are needed independently: a card can draw its own disclosure and still render the shared reading body, and hand-copying these rules is how the chip colour and spacing drifted apart across five components.
 *
 * No margin-top on the chip row. The body above already spaces its children, so a margin here would set the chips twice as far out as every other row.
 */
export const readingDetailStyles = css`
	.interp-keywords {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
	}
	.interp-keywords .kw {
		padding: 1px 8px;
		border-radius: var(--roxy-radius-full, 9999px);
		background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
		color: var(--roxy-fg, #0a0a0a);
		font-size: var(--roxy-text-xs, 0.75rem);
	}
`;

export const interpAccordionStyles = css`
	.block {
		border-top: 1px solid var(--roxy-border, #e4e4e7);
		padding-top: var(--roxy-space-md, 1rem);
	}
	.block h3 {
		margin: 0 0 var(--roxy-space-sm, 0.5rem);
		font-size: var(--roxy-text-sm, 0.875rem);
		font-weight: var(--roxy-weight-bold, 600);
		color: var(--roxy-muted, #71717a);
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}
	.interp-card {
		border: 1px solid var(--roxy-border, #e4e4e7);
		border-radius: var(--roxy-radius-md, 8px);
		padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
		margin-bottom: var(--roxy-space-xs, 0.25rem);
	}
	.interp-card summary {
		cursor: pointer;
		font-weight: 500;
		color: var(--roxy-fg, #0a0a0a);
		display: flex;
		align-items: center;
		gap: var(--roxy-space-sm, 0.5rem);
		font-size: var(--roxy-text-sm, 0.875rem);
	}
	.interp-card summary:focus-visible {
		outline: 2px solid var(--roxy-ring, rgba(245, 158, 11, 0.4));
		outline-offset: 2px;
		border-radius: var(--roxy-radius-sm, 4px);
	}
	/* min-width: 0 lets a long label wrap on its word boundaries instead of
	 * pushing the aside out of the card; the aside never shrinks below its
	 * own text. */
	.interp-lead {
		display: inline-flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 0.4rem;
		min-width: 0;
		flex: 1 1 auto;
		order: 1;
	}
	/* The chevron is authored before the aside so it can stay on the label line
	 * when the aside wraps below it on a narrow card; order restores the read
	 * sequence (label, aside, chevron) on a wide one. */
	.interp-aside {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		flex-shrink: 0;
		order: 2;
	}
	.roxy-chevron {
		order: 3;
	}
	.interp-aside small {
		color: var(--roxy-muted, #71717a);
		font-weight: 400;
		white-space: nowrap;
	}
	/* Narrow card: a label plus its state chips cannot share a line with the
	 * label without breaking it mid-word ("Solar / Plexus"), so the aside drops
	 * to its own right-aligned line. The chevron stays on the label line via the
	 * explicit order, so the row still reads as one clickable header. */
	@container (max-width: 26rem) {
		.interp-card summary {
			flex-wrap: wrap;
		}
		.roxy-chevron {
			order: 2;
		}
		.interp-aside {
			order: 3;
			flex-basis: 100%;
			justify-content: flex-end;
		}
	}
	.interp-body {
		margin-top: var(--roxy-space-sm, 0.5rem);
		display: grid;
		gap: var(--roxy-space-sm, 0.5rem);
		color: var(--roxy-fg, #0a0a0a);
		font-size: var(--roxy-text-sm, 0.875rem);
		line-height: 1.6;
		/* Long single-token prose (a gate name, a URL-ish string) must wrap
		 * inside the card rather than widen it. */
		overflow-wrap: anywhere;
	}
	.interp-body p {
		margin: 0;
	}
	${readingDetailStyles}
`;

/** The prose an endpoint returns ABOUT one contact: a summary, up to three labelled lines, and the keyword chips under them. Every field is optional, so a narrower response renders fewer rows rather than empty ones. */
export interface ReadingDetail {
	summary?: string;
	impact?: string;
	timing?: string;
	guidance?: string;
	keywords?: readonly string[];
}

/** Render one {@link ReadingDetail}. The three labels are copy, so this takes the translator, and they are typed {@link ChromeString} because the lookup is one indirection from the call: a scan of `t(...)` sites cannot follow that, and the compiler can. */
export function renderReadingDetail(
	d: ReadingDetail | undefined,
	t: Translate,
) {
	if (!d) return nothing;
	const line = (label: ChromeString, value: string | undefined) =>
		value ? html`<p><strong>${t(label)}</strong> ${value}</p>` : nothing;
	return html`${d.summary ? html`<p>${d.summary}</p>` : nothing}
		${line('Impact:', d.impact)}${line('Timing:', d.timing)}${line('Guidance:', d.guidance)}
		${
			d.keywords?.length
				? html`<div class="interp-keywords">${d.keywords.map((k) => html`<span class="kw">${k}</span>`)}</div>`
				: nothing
		}`;
}

/**
 * Render the accordion. Sections with no body are dropped, so a caller can pass the full set and let a narrower response render only what it carries. `name` groups the `<details>` exclusively, so opening one closes the last.
 */
export function renderInterpAccordion(
	sections: InterpSection[],
	name: string,
	heading: string,
) {
	const shown = sections.filter((s) => Boolean(s.body));
	if (shown.length === 0) return nothing;

	return html`<section class="block" part="section readings">
		<h3>${heading}</h3>
		${shown.map(
			(
				s,
				i,
			) => html`<details class="interp-card" part="reading" name=${name} ?open=${i === 0}>
				<summary>
					<span class="interp-lead">${s.label}</span>
					${chevron()}
					${s.aside ? html`<span class="interp-aside"><small>${s.aside}</small></span>` : nothing}
				</summary>
				<div class="interp-body">
					<p>${s.body}</p>
					${s.extra ?? nothing}
				</div>
			</details>`,
		)}
	</section>`;
}
