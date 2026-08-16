import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type {
	GetAvasthaResponse,
	GetCenterResponse,
	GetCompoundNumberResponse,
	GetGateResponse,
	GetNumberMeaningResponse,
	GetPlanetMeaningResponse,
	GetRashiResponse,
	GetTrigramResponse,
	GetZodiacSignResponse,
} from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { foldLocalized } from '../utils/localized.js';
import { humanize } from '../utils/string.js';

/**
 * Every reference / glossary lookup this card renders. They do NOT share field names (a zodiac sign has 17 fields, a number meaning has 3), so the card renders heuristically rather than by fixed keys: a symbol + title hero, the prose fields as labelled paragraphs, keyword and string-list fields as chips, and every remaining scalar as an attribute grid. One card replaces eight near-identical bespoke ones.
 *
 * It is the second GENERIC renderer in the library, and it shares `<roxy-data>`'s two consequences. Its field labels come from the wire name through `humanize()`, so they are derived rather than literal and no catalogue keyed on English source text can reach them: `Reference` and the empty state are the only two words the card writes itself. And because it enumerates `Object.keys`, an additive API field is not automatically backwards compatible for it, which is why every level that reads a key runs through `foldLocalized` first.
 *
 * `hide-readings` needs no second classification here, because the bucketing IS the line: what `collect` calls prose is the reading and what it calls a fact is the data. So the labelled paragraphs go, the keyword chips go, and a list whose items run to sentence length (a sign's `strengths`) goes with them, while the attribute grid and the short-item lists (`famous`, `compatibleSigns`, chakras) stay. On a lookup that is almost entirely prose the card keeps its symbol, title and whatever facts the response carries, which is the same flat shape it already renders for a response that had no prose to begin with.
 */
type ReferenceData =
	| GetZodiacSignResponse
	| GetPlanetMeaningResponse
	| GetRashiResponse
	| GetTrigramResponse
	| GetGateResponse
	| GetCenterResponse
	| GetNumberMeaningResponse
	| GetCompoundNumberResponse
	| GetAvasthaResponse;

/** Keys used to derive the title, in priority order. */
const TITLE_KEYS = ['name', 'english', 'title'];
/** Keys whose string value is always treated as prose, even when short. */
const PROSE_KEYS = new Set([
	'description',
	'meaning',
	'characteristics',
	'tagline',
	'definedMeaning',
	'undefinedMeaning',
	'motto',
]);
/** Keys never shown as their own row/section (rendered elsewhere or noise). */
const SKIP_KEYS = new Set(['id', 'symbol', ...TITLE_KEYS]);

/**
 * Longest a string may be before it is read as prose rather than as a value. The same threshold decides a scalar field and a list item, so `motto: "I am."` stays a fact while `strengths: ["You are the most courageous and ambitious sign, ..."]` is recognised as sentences laid out as chips.
 */
const PROSE_LENGTH = 48;

/**
 * A response key as a `part` name. Derived through {@link humanize} so one rule covers camelCase, snake_case and the space-joined keys `collect` builds for a nested field (`description short`), and the result is always the kebab-case a `part` has to be.
 */
function partName(key: string): string {
	return humanize(key).toLowerCase().replace(/\s+/g, '-');
}

/** Best-effort one-line label for an object inside an array (e.g. a gate channel partner), joining its primitive values so it never renders as [object Object]. Folded first, or a translated response joins each value to its own translation. */
function objectLabel(obj: Record<string, unknown>): string {
	return Object.values(foldLocalized(obj))
		.filter((v) => typeof v === 'string' || typeof v === 'number')
		.map(String)
		.join(' · ');
}

@customElement('roxy-reference-card')
export class RoxyReferenceCard extends RoxyDataElement<ReferenceData> {
	static styles = [
		baseStyles,
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
			}
			.symbol {
				font-size: 2.5rem;
				line-height: 1;
				color: var(--roxy-accent-ink, #b45309);
				flex: none;
			}
			.label {
				margin: 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.name {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.prose {
				margin: 0;
				line-height: 1.6;
			}
			.prose .prose-label {
				display: block;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.05em;
				margin-bottom: 2px;
			}
			.chips {
				display: flex;
				flex-wrap: wrap;
				gap: var(--roxy-space-xs, 0.25rem);
			}
			.chips span {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 14%, transparent);
				padding: 2px 8px;
				border-radius: var(--roxy-radius-full, 9999px);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			.list h3,
			.facts-wrap h3 {
				margin: 0 0 var(--roxy-space-xs, 0.25rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.facts {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
				gap: var(--roxy-space-sm, 0.5rem);
				margin: 0;
			}
			.fact dt {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: capitalize;
			}
			.fact dd {
				margin: 0;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
		`,
	];

	protected renderData(d: ReferenceData) {
		// Folded before anything reads a key. This card builds its whole output from
		// `Object.entries`, so the day the API began echoing `nameLocalized` beside
		// `name` it started drawing the same fact twice, once under each heading, on
		// a page whose owner changed nothing. The fold puts the reader's value under
		// the canonical key and drops the twin (lesson 31, the `<roxy-data>` half).
		const rec = foldLocalized(d as Record<string, unknown>);
		const title = this.deriveTitle(rec);
		const symbol = typeof rec.symbol === 'string' ? rec.symbol : undefined;
		const keywords = Array.isArray(rec.keywords)
			? (rec.keywords as unknown[]).map(String)
			: [];

		const prose: Array<[string, string]> = [];
		/** Label, items, and whether the items read as sentences rather than values. */
		const lists: Array<[string, string[], boolean]> = [];
		const facts: Array<[string, string]> = [];
		// Bucket each field into prose / chip-list / fact. Recurses one level into
		// nested objects (description {short,long}, keywords {positive,negative},
		// meaning {...}, ichingHexagram {number,english}) and labels object-array
		// items by their primitives, so nested content is never dropped and an array
		// of objects never stringifies to [object Object].
		const collect = (label: string, value: unknown, depth: number): void => {
			if (value == null) return;
			if (Array.isArray(value)) {
				const items = value
					.filter((v) => v != null)
					.map((v) =>
						typeof v === 'object'
							? objectLabel(v as Record<string, unknown>)
							: String(v),
					)
					.filter((s) => s.length > 0);
				if (items.length > 0)
					lists.push([
						label,
						items,
						items.some((i) => i.length > PROSE_LENGTH),
					]);
			} else if (typeof value === 'string') {
				if (PROSE_KEYS.has(label) || value.length > PROSE_LENGTH)
					prose.push([label, value]);
				else facts.push([label, value]);
			} else if (typeof value === 'number' || typeof value === 'boolean') {
				facts.push([label, String(value)]);
			} else if (typeof value === 'object' && depth < 2) {
				for (const [k, v] of Object.entries(
					foldLocalized(value as Record<string, unknown>),
				)) {
					collect(`${label} ${k}`, v, depth + 1);
				}
			}
		};
		for (const [key, value] of Object.entries(rec)) {
			if (SKIP_KEYS.has(key)) continue;
			// The hero chip row already shows a top-level keywords ARRAY; an object
			// keywords ({positive,negative}) falls through to collect() instead.
			if (key === 'keywords' && Array.isArray(value)) continue;
			collect(key, value, 0);
		}

		const readings = !this.hideReadings;

		return html`<article class="card" part="card" aria-label=${title}>
			<header class="head" part="header">
				${symbol ? html`<span class="symbol" aria-hidden="true">${symbol}</span>` : nothing}
				<div>
					<p class="label">${this.t('Reference')}</p>
					<h2 class="name">${title}</h2>
				</div>
			</header>
			${keywords.length > 0 && readings ? html`<div class="chips">${keywords.map((k) => html`<span>${k}</span>`)}</div>` : nothing}
			${
				readings
					? prose.map(
							([key, text]) => html`<p class="prose">
						<span class="prose-label">${humanize(key)}</span>${text}
					</p>`,
						)
					: nothing
			}
			${
				facts.length > 0
					? html`<div class="facts-wrap" part="details">
						<dl class="facts">
							${facts.map(
								([key, value]) => html`<div class="fact">
									<dt>${humanize(key)}</dt>
									<dd>${value}</dd>
								</div>`,
							)}
						</dl>
					</div>`
					: nothing
			}
			${lists.map(([key, items, isProse]) =>
				isProse && !readings
					? nothing
					: html`<div class="list" part="section ${partName(key)}">
					<h3>${humanize(key)}</h3>
					<div class="chips">${items.map((i) => html`<span>${i}</span>`)}</div>
				</div>`,
			)}
		</article>`;
	}

	private deriveTitle(rec: Record<string, unknown>): string {
		for (const key of TITLE_KEYS) {
			if (typeof rec[key] === 'string') return rec[key] as string;
		}
		const type = typeof rec.type === 'string' ? humanize(rec.type) : '';
		const number = rec.number;
		if (number != null) return `${type} ${number}`.trim();
		return this.t('Reference');
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-reference-card': RoxyReferenceCard;
	}
}
