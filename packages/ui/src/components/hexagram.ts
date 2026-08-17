import { css, html, nothing, svg } from 'lit';
import { customElement } from 'lit/decorators.js';
import { trigramGlyph } from '../tokens/index.js';
import type {
	CastReadingResponse,
	GetDailyHexagramResponse,
	GetHexagramResponse,
	GetRandomHexagramResponse,
	Hexagram,
	LookupHexagramResponse,
} from '../types/index.js';
import { RoxyDataElement } from '../utils/base-element.js';
import { baseStyles } from '../utils/base-styles.js';
import { disclosureStyles } from '../utils/disclosure.js';
import {
	type InterpSection,
	interpAccordionStyles,
} from '../utils/interp-accordion.js';

type HexagramData =
	| GetHexagramResponse
	| GetRandomHexagramResponse
	| LookupHexagramResponse
	| GetDailyHexagramResponse
	| CastReadingResponse;

/**
 * I Ching hexagram card. Renders /iching/hexagrams/{number}, /iching/cast,
 * /iching/daily, /iching/daily/cast.
 *
 * @remarks
 * **There is deliberately no `mode` input.** Which of the four shapes arrived is
 * shape-detected from the payload in {@link RoxyHexagram.resolveHexagram}, which
 * is the rule for every multi-endpoint component here: an attribute and a
 * response can disagree, and only one of them is the reading. A `mode` property
 * shipped anyway, reflected and typed into both framework wrappers, and nothing
 * ever read it.
 */
@customElement('roxy-hexagram')
export class RoxyHexagram extends RoxyDataElement<HexagramData> {
	static styles = [
		baseStyles,
		disclosureStyles,
		interpAccordionStyles,
		css`
			.card {
				background: var(--roxy-surface, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
				display: grid;
				grid-template-columns: 6rem 1fr;
				gap: var(--roxy-space-lg, 1.5rem);
			}

			@container (max-width: 480px) {
				.card {
					grid-template-columns: 1fr;
				}
			}

			/* Hug the top. As a grid item this column would otherwise stretch to the
			 * full card height, and because .lines is itself a grid its six rows
			 * would stretch with it, pulling the figure apart into a ladder that
			 * drifts away from the header. The card grew a line-readings accordion,
			 * which is exactly when that started to show. */
			.glyphs {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
				justify-items: center;
				align-self: start;
				align-content: start;
			}
			.symbol {
				font-size: 3rem;
				line-height: 1;
				color: var(--roxy-accent-ink, #b45309);
			}
			.lines {
				display: grid;
				gap: 4px;
				width: 4rem;
			}
			.line {
				display: flex;
				gap: 4px;
				justify-content: center;
				align-items: center;
				height: 8px;
			}
			.seg {
				display: block;
				height: 6px;
				background: var(--roxy-fg, #0a0a0a);
				border-radius: 1px;
			}
			.line.broken .seg {
				width: 1.4rem;
			}
			.line.solid .seg {
				width: 3rem;
			}
			.line.changing .seg {
				background: var(--roxy-accent, #f59e0b);
			}

			.title {
				margin: 0;
				font-size: var(--roxy-text-xl, 1.5rem);
				font-weight: var(--roxy-weight-bold, 600);
				letter-spacing: var(--roxy-tracking-tight);
			}
			.subtitle {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-sm, 0.875rem);
				margin: 0 0 var(--roxy-space-sm, 0.5rem);
			}
			.trigrams {
				display: flex;
				gap: var(--roxy-space-md, 1rem);
				margin-bottom: var(--roxy-space-sm, 0.5rem);
				color: var(--roxy-secondary, #475569);
				font-size: var(--roxy-text-xs, 0.75rem);
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
			.tri-glyph {
				font-size: var(--roxy-text-xl, 1.5rem);
				color: var(--roxy-accent-ink, #b45309);
				margin-right: 4px;
				vertical-align: middle;
			}
			.judgment,
			.image,
			.message {
				margin: 0 0 var(--roxy-space-sm, 0.5rem);
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-fg, #0a0a0a);
			}
			.judgment::before {
				content: 'Judgment. ';
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-secondary, #475569);
			}
			.image::before {
				content: 'Image. ';
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-secondary, #475569);
			}

			/* The oracle statement is the line; the meaning is the reading OF the line.
			 * Setting it apart stops the two from reading as one run-on paragraph. */
			.line-meaning {
				margin: 0;
				padding-left: var(--roxy-space-sm, 0.5rem);
				border-left: 2px solid var(--roxy-border, #e4e4e7);
				color: var(--roxy-muted, #71717a);
			}
			.changing {
				margin-top: var(--roxy-space-md, 1rem);
				padding-top: var(--roxy-space-md, 1rem);
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				color: var(--roxy-accent-ink, #b45309);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
		`,
	];

	private resolveHexagram(): {
		hex: Hexagram;
		lines?: number[];
		changingLinePositions?: number[];
		dailyMessage?: string;
		resultingHexagram?: Hexagram;
	} | null {
		const d = this.data;
		if (!d) return null;
		if ('hexagram' in d && d.hexagram) {
			if ('lines' in d) {
				const cast = d as CastReadingResponse;
				return {
					hex: cast.hexagram as Hexagram,
					lines: cast.lines,
					changingLinePositions: cast.changingLinePositions,
					resultingHexagram: cast.resultingHexagram as Hexagram | undefined,
				};
			}
			const daily = d as GetDailyHexagramResponse;
			return {
				hex: daily.hexagram as Hexagram,
				dailyMessage: daily.dailyMessage,
			};
		}
		return { hex: d as Hexagram };
	}

	protected renderData() {
		const resolved = this.resolveHexagram();
		if (!resolved) return this.renderEmpty();

		const {
			hex: h,
			lines: castLines,
			changingLinePositions,
			dailyMessage,
			resultingHexagram,
		} = resolved;
		const lines = castLines ?? this.derivedLines(h);
		const changing = new Set(changingLinePositions ?? []);

		const readings = !this.hideReadings;

		return html`<article class="card" part="card" aria-label=${this.t('I Ching hexagram')}>
			<div class="glyphs" part="chart">
				${h.symbol ? html`<div class="symbol">${h.symbol}</div>` : nothing}
				<div class="lines" aria-hidden="true">
					${lines
						.slice()
						.reverse()
						.map((l, idx) => {
							// reverse so visual top is line 6
							const realIdx = lines.length - 1 - idx + 1;
							const isChanging = changing.has(realIdx);
							const broken = l === 6 || l === 8;
							const cls = `${broken ? 'broken' : 'solid'}${isChanging ? ' changing' : ''}`;
							return html`<div class="line ${cls}">
								${
									broken
										? svg`<span class="seg"></span><span class="seg"></span>`
										: svg`<span class="seg"></span>`
								}
							</div>`;
						})}
				</div>
			</div>
			<div part="header">
				<h2 class="title">
					${
						// One text node, not two. The markup minifier collapses the space
						// between adjacent template expressions, which rendered the title as
						// "30.The Clinging" with the separator eaten. Join in JS instead.
						[
							h.number != null ? `${h.number}.` : '',
							h.english ?? h.chinese ?? 'Hexagram',
						]
							.filter(Boolean)
							.join(' ')
					}
				</h2>
				<p class="subtitle">
					${h.chinese ? html`${h.chinese}` : nothing}
					${h.pinyin ? html` · ${h.pinyin}` : nothing}
				</p>
				<div class="trigrams" part="details">
					${
						h.upperTrigram
							? html`<div>
								${this.t('Upper')}
								<span class="tri-glyph"
									>${trigramGlyph(h.upperTrigram) ?? ''}</span
								>${h.upperTrigram}
							</div>`
							: nothing
					}
					${
						h.lowerTrigram
							? html`<div>
								${this.t('Lower')}
								<span class="tri-glyph"
									>${trigramGlyph(h.lowerTrigram) ?? ''}</span
								>${h.lowerTrigram}
							</div>`
							: nothing
					}
				</div>
				${
					// The Judgment and the Image are the written oracle of the figure, so
					// they go with the readings; the figure, the trigrams and which lines
					// are moving are what stays.
					h.judgment && readings
						? html`<p class="judgment">${h.judgment}</p>`
						: nothing
				}
				${h.image && readings ? html`<p class="image">${h.image}</p>` : nothing}
				${dailyMessage && readings ? html`<p class="message">${dailyMessage}</p>` : nothing}
				${
					h.interpretation?.general && readings
						? html`<p>${h.interpretation.general}</p>`
						: nothing
				}
				${
					changing.size > 0
						? html`<div class="changing" part="section changing-lines">
							${this.t('Changing lines: {{lines}}.', {
								lines: Array.from(changing)
									.sort((a, b) => a - b)
									.join(', '),
							})}
							${
								resultingHexagram?.english
									? html` ${this.t('Becomes hexagram {{number}} {{name}}.', {
											number: resultingHexagram.number,
											name: resultingHexagram.english,
										})}`
									: nothing
							}
						</div>`
						: nothing
				}
				${this.renderLines(h, changing)}
			</div>
		</article>`;
	}

	/**
	 * The line readings. Each line carries its oracle statement and, since the 2026-07 API rewrite, a written meaning. Both are rendered: a bare "Changing lines: 3" leaves a reader no way to know what line 3 is telling them.
	 *
	 * @remarks
	 * When lines are moving, only those lines are shown: a cast turns on the moving lines, and listing the other five buries the answer. With no lines moving (a lookup, a random draw, the daily hexagram) all six are shown, because there the hexagram is being read as a reference rather than as an answer to a question.
	 */
	private renderLines(h: Hexagram, changing: Set<number>) {
		const all = h.changingLines ?? [];
		if (all.length === 0) return nothing;

		const isCast = changing.size > 0;
		const shown = isCast ? all.filter((l) => changing.has(l.position)) : all;
		if (shown.length === 0) return nothing;

		const sections: InterpSection[] = shown.map((l) => ({
			label: `Line ${l.position}`,
			body: l.text ?? '',
			extra: l.meaning
				? html`<p class="line-meaning">${l.meaning}</p>`
				: nothing,
		}));

		return this.renderInterpretation(
			sections,
			'hexagram-lines',
			isCast ? 'Changing lines' : 'Lines',
		);
	}

	/**
	 * Lines for a static hexagram (lookup/random/daily, which carry no cast `lines` array): read the `binary` pattern. 6 digits BOTTOM to top, so index 0 is line 1, the bottom line, exactly like the cast `lines` array. 1 = yang (solid, 7), 0 = yin (broken, 8). Falls back to all-yang only if `binary` is malformed. The Unicode `symbol` block (U+4DC0) is in King Wen order, NOT line order, so it must never be used to derive the lines.
	 *
	 * @remarks
	 * This used to `.reverse()`, because the API served `binary` top-to-bottom while documenting it bottom-to-top, and reversing was the only way to render the figure the right way up. The API fixed the data in 2026-07 (the same inversion was making `/cast` return the vertically MIRRORED hexagram for 56 of the 64 figures), so `binary` and `lines` now point the same way and the reverse would flip every asymmetric hexagram upside down. Do not put it back.
	 */
	private derivedLines(h: Hexagram): number[] {
		const binary = h.binary ?? '';
		if (/^[01]{6}$/.test(binary)) {
			return Array.from(binary, (c) => (c === '1' ? 7 : 8));
		}
		return Array.from({ length: 6 }, () => 7);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-hexagram': RoxyHexagram;
	}
}
