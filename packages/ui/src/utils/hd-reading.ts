/**
 * The Human Design reading surface: the fact tiles, the lead paragraph, the signature and not-self pills, and the profile keynotes.
 *
 * @remarks
 * `/human-design/type` returns a strict subset of the `/human-design/bodygraph` interpretation fields (type, aura, strategy, authority, their descriptions, signature, not-self, profile), so `roxy-bodygraph` and `roxy-hd-type-card` would otherwise render the same markup and carry the same CSS twice. Both import from here instead: the bodygraph wraps the chart around it, the type card is the reading on its own.
 *
 * The disclosure accordion itself is NOT here. It lives in `utils/interp-accordion.ts`, because the same accordion serves any endpoint that returns a labelled reading (`roxy-hexagram` uses it for the changing lines), and both HD components draw it through `RoxyDataElement.renderInterpretation` so `hide-readings` is honoured. Import `interpAccordionStyles` alongside `hdReadingStyles`.
 */

import { css, html, nothing } from 'lit';
import type { InterpSection } from './interp-accordion.js';

/** One row of the reading accordion. Alias of the shared {@link InterpSection} so HD call sites keep reading naturally. */
export type ReadingSection = InterpSection;

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
	return html`<div class="facts" part="facts">
		${shown.map(
			(f) => html`<div class="fact" part="fact">
				<span>${f.label}</span>
				<strong>${f.value}</strong>
			</div>`,
		)}
	</div>`;
}

/** The signature and not-self pills: the feeling of being in alignment, and the one that signals being out of it. */
export function renderHdThemes(signature?: string, notSelf?: string) {
	if (!signature && !notSelf) return nothing;
	return html`<div class="themes" part="themes">
		${signature ? html`<span class="pill pill--good">Signature: ${signature}</span>` : nothing}
		${notSelf ? html`<span class="pill pill--shadow">Not-self: ${notSelf}</span>` : nothing}
	</div>`;
}

/** The two profile lines, each with the keynote of the line. Personality first: it is the conscious line and the one the profile is read from. */
export function renderHdKeynotes(k: ProfileKeynotes | undefined) {
	if (!k?.personality && !k?.design) return nothing;
	return html`<dl class="keynotes" part="keynotes">
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
