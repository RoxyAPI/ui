import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { CalculateGematriaResponse } from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { formatInteger } from '../utils/format.js';
import { displayField, displayOption } from '../utils/localized.js';
import { humanize } from '../utils/string.js';

type Gematria = CalculateGematriaResponse;
type HebrewForm = NonNullable<Gematria['hebrewForms']>[number];
type CipherValue = NonNullable<Gematria['values']>[number];

/**
 * Gematria calculator. Pass `data` from POST /kabbalah/gematria.
 *
 * @remarks
 * **Hebrew is written right to left and the letter strip has to be laid out that way, or the
 * breakdown contradicts the word above it.** The response lists letters in string order, so the
 * strip carries `dir="rtl"` and the first letter takes the RIGHTMOST tile. Each tile is `dir="ltr"`
 * inside, because the letter name and its number are Latin and read the other way, and `lang="he"`
 * marks the GLYPH rather than the strip, so a host page picks a Hebrew face for the letter and not
 * for the transliteration beside it. A final form scores differently under the finals reading, so it
 * is tinted AND keyed under the strip: a tint with a hover title is no marker on a touch screen.
 *
 * **Every candidate spelling is shown, because that is the whole answer.** A Latin name has more
 * than one defensible Hebrew spelling, one is chosen for the totals, and a calculator that hides the
 * others is asking to be trusted rather than checked. The chosen one is marked and the rule that
 * chose it is printed beside it.
 *
 * **A cipher with no computed value is left out of the table rather than shown as a zero or a blank.**
 * One catalogued cipher carries a null value on every response, and an absent number and the number
 * zero are different answers: printing it as either would publish a total nobody calculated, and
 * printing a placeholder on every response would be a row that never says anything.
 *
 * `hide-readings` keeps the spellings, every cipher value, the per letter breakdown, the
 * substitutions, the Latin ciphers and the equal-value words with their meanings. Only what the
 * tradition SAYS about an equality goes, which is the one interpretive sentence on the card.
 */
@customElement('roxy-gematria')
export class RoxyGematria extends RoxyDataElement<Gematria> {
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
				display: grid;
				/* Shrink each line to its own content, so a right-to-left word sits at
				 * the start of the card rather than out at the far edge of the grid. */
				justify-items: start;
				gap: 0.15rem;
				min-width: 0;
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
				letter-spacing: var(--roxy-tracking-tight);
			}
			.hebrew {
				font-size: 2rem;
				line-height: 1.4;
				font-weight: var(--roxy-weight-bold, 600);
			}
			.roman {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-secondary, #475569);
				letter-spacing: 0.04em;
			}
			.rule {
				margin: 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				line-height: var(--roxy-leading-normal, 1.5);
			}

			.lbl {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				font-weight: var(--roxy-weight-bold, 600);
				margin-right: 0.35rem;
			}
			.block-title {
				margin: 0 0 var(--roxy-space-sm, 0.5rem);
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}

			.letters {
				display: flex;
				flex-wrap: wrap;
				gap: 0.35rem;
			}
			.letter {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-sm, 4px);
				padding: 0.3rem 0.45rem;
				display: grid;
				justify-items: center;
				gap: 0.1rem;
				min-width: 3rem;
			}
			.letter .glyph {
				font-size: var(--roxy-text-lg, 1.125rem);
				line-height: 1.3;
			}
			.letter .name {
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-secondary, #475569);
			}
			.letter .num {
				font-size: var(--roxy-text-xs, 0.75rem);
				font-variant-numeric: tabular-nums;
				color: var(--roxy-fg, #0a0a0a);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.letter.is-final {
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 12%, var(--roxy-surface, #fff));
			}
			.legend {
				margin: var(--roxy-space-sm, 0.5rem) 0 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
			}
			.legend .swatch {
				display: inline-block;
				width: 10px;
				height: 10px;
				border-radius: 2px;
				margin-right: 4px;
				vertical-align: middle;
				border: 1px solid var(--roxy-border, #e4e4e7);
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 12%, var(--roxy-surface, #fff));
			}

			.scroll {
				overflow-x: auto;
				min-width: 0;
			}
			table {
				border-collapse: collapse;
				width: 100%;
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			th,
			td {
				text-align: left;
				padding: 0.35rem 0.5rem;
				border-bottom: 1px solid var(--roxy-border, #e4e4e7);
				vertical-align: top;
			}
			th {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				white-space: nowrap;
			}
			td.num {
				font-variant-numeric: tabular-nums;
				white-space: nowrap;
			}
			.provenance {
				margin: var(--roxy-space-sm, 0.5rem) 0 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-muted, #71717a);
				line-height: var(--roxy-leading-normal, 1.5);
			}
			.lineage {
				margin: 0.15rem 0 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-secondary, #475569);
				white-space: normal;
			}
			a {
				color: var(--roxy-accent-ink, #b45309);
			}

			.forms {
				margin: 0;
				padding: 0;
				list-style: none;
				display: grid;
				gap: var(--roxy-space-md, 1rem);
			}
			.form {
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				padding-top: var(--roxy-space-sm, 0.5rem);
				display: grid;
				gap: 0.35rem;
				min-width: 0;
			}
			.form:first-child {
				border-top: 0;
				padding-top: 0;
			}
			.chosen {
				display: inline-block;
				padding: 0.1rem 0.4rem;
				border-radius: var(--roxy-radius-sm, 4px);
				font-size: var(--roxy-text-xs, 0.75rem);
				background: color-mix(in srgb, var(--roxy-success, #16a34a) 12%, var(--roxy-surface, #fff));
				color: var(--roxy-fg, #0a0a0a);
			}
			.match-note {
				margin: 0.15rem 0 0;
				font-size: var(--roxy-text-xs, 0.75rem);
				color: var(--roxy-secondary, #475569);
				white-space: normal;
			}
		`,
	];

	protected renderData(d: Gematria) {
		const locale = this.effectiveLang();
		const chosen = d.chosen;
		const input = d.input?.text ?? d.input?.textHebrew ?? '';
		return html`<article class="card" part="card" aria-labelledby="gematria-title">
			<header class="head" part="header">
				<h2 class="title" id="gematria-title">
					${input ? `${this.t('Gematria')} · ${input}` : this.t('Gematria')}
				</h2>
				${
					chosen?.hebrew
						? html`<span class="hebrew" lang="he" dir="rtl">${chosen.hebrew}</span>`
						: nothing
				}
				${
					this.chosenForm(d)?.romanization
						? html`<span class="roman">${this.chosenForm(d)?.romanization}</span>`
						: nothing
				}
				${chosen?.rule ? html`<p class="rule">${chosen.rule}</p>` : nothing}
			</header>

			${this.renderLetters(locale, this.chosenForm(d)?.letters)}
			${this.renderValues(locale, d.values, this.t('Cipher values'))}
			${this.renderForms(locale, d)}
			${this.renderTransformations(locale, d.transformations)}
			${this.renderLatin(locale, d.latinValues)}
			${this.renderMatches(locale, d.matches)}
			${this.renderConventions(d.conventions)}
		</article>`;
	}

	/** The spelling the totals were taken from, matched back to the form that carries its letters. */
	private chosenForm(d: Gematria): HebrewForm | undefined {
		const forms = d.hebrewForms ?? [];
		return forms.find((f) => f.hebrew === d.chosen?.hebrew) ?? forms[0];
	}

	/**
	 * The per letter breakdown of the chosen spelling.
	 *
	 * @remarks
	 * `dir="rtl"` on the strip is the correctness half: the response lists letters in string order and
	 * Hebrew reads right to left, so without it the first letter would sit where a reader looks for
	 * the last. Each tile is `dir="ltr"` so its Latin name and number are not reordered with it.
	 */
	private renderLetters(
		locale: string | undefined,
		letters: HebrewForm['letters'] | undefined,
	) {
		const rows = letters ?? [];
		if (rows.length === 0) return nothing;
		return html`<section part="section letters">
			<h3 class="block-title">${this.t('Letters')}</h3>
			<div class="letters" part="chart" dir="rtl">
				${rows.map(
					(l) => html`<div
						class=${`letter${l.isFinal ? ' is-final' : ''}`}
						dir="ltr"
						title=${ifDefined(l.isFinal ? this.t('Final form') : undefined)}
					>
						<span class="glyph" lang="he">${l.glyph ?? ''}</span>
						<span class="name">${l.name ?? ''}</span>
						<span class="num">${formatInteger(locale, l.value)}</span>
					</div>`,
				)}
			</div>
			${
				// A tint plus a hover title is no marker at all on a phone, so the key is
				// drawn whenever a final form is on the strip and never when none is.
				rows.some((l) => l.isFinal)
					? html`<p class="legend" part="legend">
						<span class="swatch"></span>${this.t('Final form')}
					</p>`
					: nothing
			}
		</section>`;
	}

	/** Every cipher applied to one spelling, with the provenance the whole block shares beneath it. */
	private renderValues(
		locale: string | undefined,
		values: Gematria['values'] | undefined,
		heading: string,
	) {
		// A cipher this API does not compute carries a null value, which is not a
		// zero and not a blank, so the row is dropped rather than given a number.
		const rows = (values ?? []).filter((v) => typeof v.value === 'number');
		if (rows.length === 0) return nothing;
		// The spec says a second published total is present only where the cipher is
		// not single valued, so the column is drawn on presence for the same reason a
		// null cipher is dropped: a column that says nothing on every row is not data.
		const alternates = rows.some((v) => (v.alternateValues ?? []).length > 0);
		return html`<section part="section values">
			<h3 class="block-title">${heading}</h3>
			<div class="scroll">
				<table>
					<thead>
						<tr>
							<th>${this.t('Cipher')}</th>
							<th>${this.t('Value')}</th>
							${alternates ? html`<th>${this.t('Also published')}</th>` : nothing}
						</tr>
					</thead>
					<tbody>
						${rows.map(
							(v) => html`<tr>
								<td>${humanize(v.id ?? '')}</td>
								<td class="num">${formatInteger(locale, v.value)}</td>
								${
									alternates
										? html`<td class="num">
											${(v.alternateValues ?? [])
												.map((n) => formatInteger(locale, n))
												.join(', ')}
										</td>`
										: nothing
								}
							</tr>`,
						)}
					</tbody>
				</table>
			</div>
			${this.renderProvenance(rows)}
		</section>`;
	}

	/** The distinct tradition and source behind a block of ciphers, once rather than on every row. */
	private renderProvenance(rows: readonly CipherValue[]) {
		const seen = new Map<string, string | undefined>();
		for (const r of rows) {
			if (r.tradition && !seen.has(r.tradition))
				seen.set(r.tradition, r.source);
		}
		if (seen.size === 0) return nothing;
		return html`<p class="provenance">
			<span class="lbl">${this.t('Tradition')}</span>
			${[...seen].map(
				([tradition, source], i) =>
					html`${i > 0 ? ' · ' : ''}${humanize(tradition)}${
						source
							? html` <a href=${source} target="_blank" rel="noopener noreferrer">${this.t('Source')}</a>`
							: nothing
					}`,
			)}
		</p>`;
	}

	/**
	 * Every Hebrew spelling the input can be written as.
	 *
	 * @remarks
	 * Rendered only when there is a choice to show. One spelling is not a set of candidates, and a
	 * heading over a single row that repeats the word already at the top of the card reads as a bug.
	 */
	private renderForms(locale: string | undefined, d: Gematria) {
		const forms = d.hebrewForms ?? [];
		if (forms.length < 2) return nothing;
		return html`<section part="section spellings">
			<h3 class="block-title">${this.t('Spellings')}</h3>
			<ul class="forms">
				${forms.map(
					(f) => html`<li class="form">
						<div>
							<span class="hebrew" lang="he" dir="rtl">${f.hebrew ?? ''}</span>
							${
								f.hebrew === d.chosen?.hebrew
									? html`<span class="chosen">${this.t('Chosen')}</span>`
									: nothing
							}
						</div>
						<span class="roman">${f.romanization ?? ''}</span>
						${f.rule ? html`<p class="rule">${f.rule}</p>` : nothing}
						${this.renderFormTotals(locale, f)}
					</li>`,
				)}
			</ul>
		</section>`;
	}

	/** The standard reading of one candidate spelling, which is what a reader compares the spellings on. */
	private renderFormTotals(
		locale: string | undefined,
		form: HebrewForm,
	): unknown {
		const first = (form.values ?? []).find((v) => typeof v.value === 'number');
		if (!first) return nothing;
		return html`<p class="rule">
			<span class="lbl">${humanize(first.id ?? '')}</span>
			${formatInteger(locale, first.value)}
		</p>`;
	}

	/** AtBash and Albam: the substituted word and what it scores. */
	private renderTransformations(
		locale: string | undefined,
		rows: Gematria['transformations'] | undefined,
	) {
		const table = rows ?? [];
		if (table.length === 0) return nothing;
		return html`<section part="section substitutions">
			<h3 class="block-title">${this.t('Substitutions')}</h3>
			<div class="scroll">
				<table>
					<thead>
						<tr>
							<th>${this.t('Cipher')}</th>
							<th>${this.t('Output')}</th>
							<th>${this.t('Value')}</th>
						</tr>
					</thead>
					<tbody>
						${table.map(
							(r) => html`<tr>
								<td>${humanize(r.id ?? '')}</td>
								<td>
									${r.output ? html`<span lang="he" dir="rtl">${r.output}</span>` : nothing}
									${r.outputRomanization ? html`<span class="roman"> ${r.outputRomanization}</span>` : nothing}
								</td>
								<td class="num">${formatInteger(locale, r.value)}</td>
							</tr>`,
						)}
					</tbody>
				</table>
			</div>
		</section>`;
	}

	/**
	 * The Latin alphabet ciphers.
	 *
	 * @remarks
	 * Each carries its own lineage sentence and it is kept: it says where the cipher comes from, which
	 * is what stops a Renaissance Christian or modern cipher being read as a rabbinic one. That is a
	 * fact about the column rather than a claim about the word, so it is data.
	 */
	private renderLatin(
		locale: string | undefined,
		rows: Gematria['latinValues'] | undefined,
	) {
		const table = rows ?? [];
		if (table.length === 0) return nothing;
		return html`<section part="section latin-ciphers">
			<h3 class="block-title">${this.t('Latin ciphers')}</h3>
			<div class="scroll">
				<table>
					<thead>
						<tr>
							<th>${this.t('Cipher')}</th>
							<th>${this.t('Value')}</th>
							<th>${this.t('Tradition')}</th>
						</tr>
					</thead>
					<tbody>
						${table.map(
							(r) => html`<tr>
								<td>
									${humanize(r.id ?? '')}
									${r.lineage ? html`<p class="lineage">${r.lineage}</p>` : nothing}
								</td>
								<td class="num">${formatInteger(locale, r.value)}</td>
								<td>${humanize(r.tradition ?? '')}</td>
							</tr>`,
						)}
					</tbody>
				</table>
			</div>
		</section>`;
	}

	/** Curated words whose standard value equals the chosen spelling. */
	private renderMatches(
		locale: string | undefined,
		rows: Gematria['matches'] | undefined,
	) {
		const table = rows ?? [];
		if (table.length === 0) return nothing;
		return html`<section part="section matches">
			<h3 class="block-title">${this.t('Equal values')}</h3>
			<div class="scroll">
				<table>
					<thead>
						<tr>
							<th>${this.t('Word')}</th>
							<th>${this.t('Meaning')}</th>
							<th>${this.t('Value')}</th>
						</tr>
					</thead>
					<tbody>
						${table.map(
							(m) => html`<tr>
								<td>
									<span lang="he" dir="rtl">${m.hebrew ?? ''}</span>
									<span class="roman"> ${m.romanization ?? ''}</span>
								</td>
								<td>
									${m.meaning ?? ''}
									${
										m.note && !this.hideReadings
											? html`<p class="match-note" part="reading">${m.note}</p>`
											: nothing
									}
								</td>
								<td class="num">${formatInteger(locale, m.value)}</td>
							</tr>`,
						)}
					</tbody>
				</table>
			</div>
		</section>`;
	}

	/**
	 * The switches this answer was computed under.
	 *
	 * @remarks
	 * Provenance rather than decoration, the same reason a Vedic chart names its frame: the name
	 * mispar gadol is used for two different methods, and a total printed without saying which one
	 * produced it cannot be reconciled against any other calculator.
	 */
	private renderConventions(conventions: Gematria['conventions'] | undefined) {
		const locale = this.effectiveLang();
		// Both switches are REQUEST fields, so the published field-label payload
		// already names each one and each of its options in the reader's language.
		// Reading it is what stops a second translation of the same choice.
		const pairs: Array<[string, string]> = [];
		for (const key of ['transliteration', 'misparGadol'] as const) {
			const value = conventions?.[key];
			if (!value) continue;
			pairs.push([
				displayField(locale, key),
				displayOption(locale, key, value),
			]);
		}
		if (pairs.length === 0) return nothing;
		return html`<p class="provenance">
			${pairs.map(
				([label, value], i) =>
					html`${i > 0 ? ' · ' : ''}<span class="lbl">${label}</span>${value}`,
			)}
		</p>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-gematria': RoxyGematria;
	}
}
