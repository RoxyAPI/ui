/**
 * The shared Human Design reading surface: the fact tiles, the lead paragraph, the signature and not-self pills, the exclusive interpretation accordion, and the profile keynotes.
 *
 * @remarks
 * `/human-design/type` returns a strict subset of the `/human-design/bodygraph` interpretation fields (type, aura, strategy, authority, their descriptions, signature, not-self, profile), so `roxy-bodygraph` and `roxy-hd-type-card` would otherwise render the same markup and carry the same CSS twice. Both import from here instead: the bodygraph wraps the chart around it, the type card is the reading on its own. A change to how a reading looks lands in both by construction.
 *
 * The accordion is exclusive (`<details name>`), so a card grows by at most one open section and never becomes a wall of prose. Callers pass their own group `name` so two of these on one page never fight over which section is open.
 */

import { css, html, nothing } from 'lit';
import { chevron } from './disclosure.js';

/** One row of the reading accordion: the label, the short value shown as the aside, and the interpretation body. `extra` renders under the body for a section that carries more than prose. */
export interface ReadingSection {
	label: string;
	aside?: string;
	body: string;
	extra?: unknown;
}

/** A labelled value tile. A fact with no value is dropped, so a narrower response renders fewer tiles rather than empty ones. */
export interface Fact {
	label: string;
	value?: string;
}

/** The two profile lines with the keynote of each. Normalized: the bodygraph nests these under `profileKeynotes`, `/human-design/profile` returns them flat, and both map onto this. */
export interface ProfileKeynotes {
	personality?: string;
	personalityLine?: number;
	design?: string;
	designLine?: number;
}

export const hdReadingStyles = css`
	.facts {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
		gap: var(--roxy-space-sm, 0.5rem);
	}
	.fact {
		border: 1px solid var(--roxy-border, #e4e4e7);
		border-radius: var(--roxy-radius-md, 8px);
		padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
		background: var(--roxy-surface, #fff);
	}
	.fact span {
		display: block;
		color: var(--roxy-muted, #71717a);
		font-size: var(--roxy-text-xs, 0.75rem);
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}
	.fact strong {
		font-size: var(--roxy-text-base, 1rem);
		color: var(--roxy-fg, #0a0a0a);
	}
	.lead {
		margin: 0;
		color: var(--roxy-fg, #0a0a0a);
		font-size: var(--roxy-text-sm, 0.875rem);
		line-height: 1.6;
	}
	.themes {
		display: flex;
		flex-wrap: wrap;
		gap: var(--roxy-space-sm, 0.5rem);
	}
	.pill {
		padding: 2px 10px;
		border-radius: var(--roxy-radius-full, 9999px);
		font-size: var(--roxy-text-xs, 0.75rem);
	}
	.pill--good {
		background: color-mix(in srgb, var(--roxy-success, #16a34a) 16%, transparent);
		color: var(--roxy-success-fg, #166534);
	}
	.pill--shadow {
		background: color-mix(in srgb, var(--roxy-danger, #dc2626) 16%, transparent);
		color: var(--roxy-danger-fg, #991b1b);
	}

	/* Interpretation blocks. The identity reads at a glance; every body of prose
	 * below sits in an exclusive accordion, so the card grows by one open section
	 * at most. */
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
	.keynotes {
		margin: 0;
		display: grid;
		gap: var(--roxy-space-xs, 0.25rem);
	}
	.keynotes dt {
		font-size: var(--roxy-text-xs, 0.75rem);
		color: var(--roxy-muted, #71717a);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.keynotes dd {
		margin: 0;
	}
`;

/** The labelled value tiles. Values the response does not carry are dropped rather than rendered empty. */
export function renderHdFacts(facts: Fact[]) {
	const shown = facts.filter((f) => Boolean(f.value));
	if (shown.length === 0) return nothing;
	return html`<div class="facts">
		${shown.map(
			(f) => html`<div class="fact">
				<span>${f.label}</span>
				<strong>${f.value}</strong>
			</div>`,
		)}
	</div>`;
}

/** The signature and not-self pills: the feeling of being in alignment, and the one that signals being out of it. */
export function renderHdThemes(signature?: string, notSelf?: string) {
	if (!signature && !notSelf) return nothing;
	return html`<div class="themes">
		${signature ? html`<span class="pill pill--good">Signature: ${signature}</span>` : nothing}
		${notSelf ? html`<span class="pill pill--shadow">Not-self: ${notSelf}</span>` : nothing}
	</div>`;
}

/**
 * The interpretation accordion. Sections with no body are dropped, so a caller can pass the full set and let a narrower response render only what it carries. `name` groups the `<details>` exclusively, so opening one closes the last.
 */
export function renderHdReading(
	sections: ReadingSection[],
	name: string,
	heading = 'Reading',
) {
	const shown = sections.filter((s) => Boolean(s.body));
	if (shown.length === 0) return nothing;

	return html`<section class="block">
		<h3>${heading}</h3>
		${shown.map(
			(s, i) => html`<details class="interp-card" name=${name} ?open=${i === 0}>
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

/** The two profile lines, each with the keynote of the line. Personality first: it is the conscious line and the one the profile is read from. */
export function renderHdKeynotes(k: ProfileKeynotes | undefined) {
	if (!k?.personality && !k?.design) return nothing;
	return html`<dl class="keynotes">
		${
			k.personality
				? html`<dt>Line ${k.personalityLine ?? ''} · Personality</dt>
					<dd>${k.personality}</dd>`
				: nothing
		}
		${
			k.design
				? html`<dt>Line ${k.designLine ?? ''} · Design</dt>
					<dd>${k.design}</dd>`
				: nothing
		}
	</dl>`;
}
