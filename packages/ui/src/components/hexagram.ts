import { css, html, LitElement, nothing, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TRIGRAM_GLYPH } from '../tokens/index.js';
import { baseStyles } from '../utils/base-styles.js';

interface HexagramData {
	number?: number;
	symbol?: string;
	chinese?: string;
	english?: string;
	pinyin?: string;
	upperTrigram?: string;
	lowerTrigram?: string;
	judgment?: string;
	image?: string;
	interpretation?: {
		general?: string;
		love?: string;
		career?: string;
		decision?: string;
		advice?: string;
	};
	changingLines?: number[];
	resultingHexagram?: HexagramData;
	dailyMessage?: string;
	hexagram?: HexagramData;
	lines?: number[]; // 6, 7, 8, 9 cast values
	changingLinePositions?: number[];
	seed?: string;
	date?: string;
}

/**
 * I Ching hexagram card. Renders /iching/hexagrams/{number}, /iching/cast,
 * /iching/daily, /iching/daily/cast.
 */
@customElement('roxy-hexagram')
export class RoxyHexagram extends LitElement {
	static styles = [
		baseStyles,
		css`
			.card {
				background: var(--roxy-bg, #fff);
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

			.glyphs {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
				justify-items: center;
			}
			.symbol {
				font-size: 3rem;
				line-height: 1;
				color: var(--roxy-accent-fg, #b45309);
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
				color: var(--roxy-accent-fg, #b45309);
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

			.changing {
				margin-top: var(--roxy-space-md, 1rem);
				padding-top: var(--roxy-space-md, 1rem);
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				color: var(--roxy-accent-fg, #b45309);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
		`,
	];

	@property({ attribute: false })
	data: HexagramData | null = null;

	@property({ type: String, reflect: true })
	mode: 'lookup' | 'cast' | 'daily' = 'lookup';

	private getHexagram(): HexagramData | null {
		if (!this.data) return null;
		if ('hexagram' in this.data && this.data.hexagram) {
			return {
				...this.data.hexagram,
				lines: this.data.lines,
				changingLinePositions: this.data.changingLinePositions,
			};
		}
		return this.data;
	}

	render() {
		const h = this.getHexagram();
		if (!h)
			return html`<div class="roxy-empty" role="status">No hexagram data</div>`;

		const lines = h.lines ?? this.derivedLines(h);
		const changing = new Set(h.changingLinePositions ?? []);

		return html`<article class="card" aria-label="I Ching hexagram">
			<div class="glyphs">
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
			<div>
				<h2 class="title">
					${h.number ? html`${h.number}. ` : nothing}${h.english ?? h.chinese ?? 'Hexagram'}
				</h2>
				<p class="subtitle">
					${h.chinese ? html`${h.chinese}` : nothing}
					${h.pinyin ? html` · ${h.pinyin}` : nothing}
				</p>
				<div class="trigrams">
					${
						h.upperTrigram
							? html`<div>
								Upper
								<span class="tri-glyph"
									>${TRIGRAM_GLYPH[h.upperTrigram] ?? ''}</span
								>${h.upperTrigram}
							</div>`
							: nothing
					}
					${
						h.lowerTrigram
							? html`<div>
								Lower
								<span class="tri-glyph"
									>${TRIGRAM_GLYPH[h.lowerTrigram] ?? ''}</span
								>${h.lowerTrigram}
							</div>`
							: nothing
					}
				</div>
				${h.judgment ? html`<p class="judgment">${h.judgment}</p>` : nothing}
				${h.image ? html`<p class="image">${h.image}</p>` : nothing}
				${h.dailyMessage ? html`<p class="message">${h.dailyMessage}</p>` : nothing}
				${
					h.interpretation?.general
						? html`<p>${h.interpretation.general}</p>`
						: nothing
				}
				${
					changing.size > 0
						? html`<div class="changing">
							Changing lines: ${Array.from(changing)
								.sort((a, b) => a - b)
								.join(', ')}.
							${
								h.resultingHexagram?.english
									? html` Becomes hexagram ${h.resultingHexagram.number}
										${h.resultingHexagram.english}.`
									: nothing
							}
						</div>`
						: nothing
				}
			</div>
		</article>`;
	}

	/** When the API only ships symbol+number with no line array, render six solid yang. */
	private derivedLines(h: HexagramData): number[] {
		if (!h.symbol) return Array.from({ length: 6 }, () => 7);
		// Map each character of the unicode hexagram block (U+4DC0..) to broken/solid
		const cp = h.symbol.codePointAt(0) ?? 0;
		if (cp >= 0x4dc0 && cp <= 0x4dff) {
			const offset = cp - 0x4dc0;
			const lines: number[] = [];
			for (let i = 0; i < 6; i++) {
				const broken = (offset >> i) & 1;
				lines.push(broken ? 8 : 7);
			}
			return lines;
		}
		return Array.from({ length: 6 }, () => 7);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-hexagram': RoxyHexagram;
	}
}
