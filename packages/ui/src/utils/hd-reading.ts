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

/**
 * A component's own {@link RoxyDataElement.t}, threaded in so a shared render helper can name its rows.
 *
 * @remarks
 * These helpers are plain functions with no host, so they cannot resolve a page language on their own, and a label they hardcode is one English word inside otherwise translated chrome. Taking the translator as an argument keeps each English source literal in the file that renders it, which is what `tests/i18n.test.ts` scans (it walks `utils/` as well as `components/`), so a string added here still cannot ship without a catalogue entry. That scanner reads comments too, so do not write a sample call in one.
 */
export type Translate = (
	source: string,
	vars?: Record<string, string | number>,
) => string;

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

/**
 * The chart side as a word a reader sees.
 *
 * @remarks
 * Personality is the conscious side calculated at birth, design the unconscious side 88 degrees of solar arc before it, and the wire carries them as the machine enum `personality` and `design` with no localized partner. The component is what turns an enum into a word, so this is chrome and comes from the catalogue: the same two words label the bodygraph activation tabs, name the side inside a chart tooltip, and sit under a Variables arrow. An unrecognized value is passed through rather than guessed at.
 */
export function sideWord(side: string | undefined, t: Translate): string {
	if (side === 'design') return t('Design');
	if (side === 'personality') return t('Personality');
	return side ?? '';
}

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

/**
 * The signature and not-self pills: the feeling of being in alignment, and the one that signals being out of it.
 *
 * @remarks
 * Both values arrive already resolved to what a reader should see, because the response carries `signatureLocalized` and `notSelfLocalized` beside the canonical English pair and only the caller knows which half it is holding. The two words around them are this card's own and go through `t`.
 */
export function renderHdThemes(
	signature: string | undefined,
	notSelf: string | undefined,
	t: Translate,
) {
	if (!signature && !notSelf) return nothing;
	return html`<div class="themes" part="themes">
		${signature ? html`<span class="pill pill--good">${t('Signature: {{value}}', { value: signature })}</span>` : nothing}
		${notSelf ? html`<span class="pill pill--shadow">${t('Not-self: {{value}}', { value: notSelf })}</span>` : nothing}
	</div>`;
}

/** The two profile lines, each with the keynote of the line. Personality first: it is the conscious line and the one the profile is read from. */
export function renderHdKeynotes(k: ProfileKeynotes | undefined, t: Translate) {
	if (!k?.personality && !k?.design) return nothing;
	return html`<dl class="keynotes" part="keynotes">
		${
			k.personality
				? html`<dt>${t('Line {{line}} · Personality', { line: k.personalityLine ?? '' })}</dt>
					<dd>${k.personality}</dd>`
				: nothing
		}
		${
			k.design
				? html`<dt>${t('Line {{line}} · Design', { line: k.designLine ?? '' })}</dt>
					<dd>${k.design}</dd>`
				: nothing
		}
	</dl>`;
}
