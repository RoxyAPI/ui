var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// packages/ui/src/components/hexagram.ts
import { css as css2, html, LitElement, nothing, svg } from "lit";
import { customElement, property } from "lit/decorators.js";

// packages/ui/src/tokens/index.ts
var TRIGRAM_GLYPH = {
  heaven: "\u2630",
  lake: "\u2631",
  fire: "\u2632",
  thunder: "\u2633",
  wind: "\u2634",
  water: "\u2635",
  mountain: "\u2636",
  earth: "\u2637",
  Heaven: "\u2630",
  Lake: "\u2631",
  Fire: "\u2632",
  Thunder: "\u2633",
  Wind: "\u2634",
  Water: "\u2635",
  Mountain: "\u2636",
  Earth: "\u2637"
};

// packages/ui/src/utils/base-styles.ts
import { css } from "lit";
var baseStyles = css`
	:host {
		display: block;
		container-type: inline-size;
		font-family: var(
			--roxy-font-sans,
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			sans-serif
		);
		color: var(--roxy-fg, #0a0a0a);
		background: transparent;
		font-size: var(--roxy-text-base, 1rem);
		line-height: var(--roxy-leading-normal, 1.5);
		animation: roxy-fade-in var(--roxy-motion-duration, 200ms)
			var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1)) both;
	}

	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	@keyframes roxy-fade-in {
		from {
			opacity: 0;
			transform: translateY(2px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		:host {
			animation: none;
		}
	}

	.roxy-skeleton {
		background: linear-gradient(
			90deg,
			var(--roxy-border, #e4e4e7) 0%,
			color-mix(in srgb, var(--roxy-border, #e4e4e7) 60%, transparent) 50%,
			var(--roxy-border, #e4e4e7) 100%
		);
		background-size: 200% 100%;
		animation: roxy-shimmer 1.4s ease-in-out infinite;
		border-radius: var(--roxy-radius-md, 8px);
	}

	@keyframes roxy-shimmer {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.roxy-skeleton {
			animation: none;
		}
	}

	.roxy-empty {
		padding: var(--roxy-space-lg, 1.5rem);
		color: var(--roxy-muted, #71717a);
		text-align: center;
		font-size: var(--roxy-text-sm, 0.875rem);
	}

	:host(:focus-within) .roxy-card {
		outline: 2px solid var(--roxy-ring, rgba(245, 158, 11, 0.4));
		outline-offset: 2px;
	}
`;

// packages/ui/src/components/hexagram.ts
var RoxyHexagram = class extends LitElement {
  constructor() {
    super(...arguments);
    this.data = null;
    this.mode = "lookup";
  }
  getHexagram() {
    if (!this.data) return null;
    if ("hexagram" in this.data && this.data.hexagram) {
      return {
        ...this.data.hexagram,
        lines: this.data.lines,
        changingLinePositions: this.data.changingLinePositions
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
					${lines.slice().reverse().map((l, idx) => {
      const realIdx = lines.length - 1 - idx + 1;
      const isChanging = changing.has(realIdx);
      const broken = l === 6 || l === 8;
      const cls = `${broken ? "broken" : "solid"}${isChanging ? " changing" : ""}`;
      return html`<div class="line ${cls}">
								${broken ? svg`<span class="seg"></span><span class="seg"></span>` : svg`<span class="seg"></span>`}
							</div>`;
    })}
				</div>
			</div>
			<div>
				<h2 class="title">
					${h.number ? html`${h.number}. ` : nothing}${h.english ?? h.chinese ?? "Hexagram"}
				</h2>
				<p class="subtitle">
					${h.chinese ? html`${h.chinese}` : nothing}
					${h.pinyin ? html` · ${h.pinyin}` : nothing}
				</p>
				<div class="trigrams">
					${h.upperTrigram ? html`<div>
								Upper
								<span class="tri-glyph"
									>${TRIGRAM_GLYPH[h.upperTrigram] ?? ""}</span
								>${h.upperTrigram}
							</div>` : nothing}
					${h.lowerTrigram ? html`<div>
								Lower
								<span class="tri-glyph"
									>${TRIGRAM_GLYPH[h.lowerTrigram] ?? ""}</span
								>${h.lowerTrigram}
							</div>` : nothing}
				</div>
				${h.judgment ? html`<p class="judgment">${h.judgment}</p>` : nothing}
				${h.image ? html`<p class="image">${h.image}</p>` : nothing}
				${h.dailyMessage ? html`<p class="message">${h.dailyMessage}</p>` : nothing}
				${h.interpretation?.general ? html`<p>${h.interpretation.general}</p>` : nothing}
				${changing.size > 0 ? html`<div class="changing">
							Changing lines: ${Array.from(changing).sort((a, b) => a - b).join(", ")}.
							${h.resultingHexagram?.english ? html` Becomes hexagram ${h.resultingHexagram.number}
										${h.resultingHexagram.english}.` : nothing}
						</div>` : nothing}
			</div>
		</article>`;
  }
  /** When the API only ships symbol+number with no line array, render six solid yang. */
  derivedLines(h) {
    if (!h.symbol) return Array.from({ length: 6 }, () => 7);
    const cp = h.symbol.codePointAt(0) ?? 0;
    if (cp >= 19904 && cp <= 19967) {
      const offset = cp - 19904;
      const lines = [];
      for (let i = 0; i < 6; i++) {
        const broken = offset >> i & 1;
        lines.push(broken ? 8 : 7);
      }
      return lines;
    }
    return Array.from({ length: 6 }, () => 7);
  }
};
RoxyHexagram.styles = [
  baseStyles,
  css2`
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
		`
];
__decorateClass([
  property({ attribute: false })
], RoxyHexagram.prototype, "data", 2);
__decorateClass([
  property({ type: String, reflect: true })
], RoxyHexagram.prototype, "mode", 2);
RoxyHexagram = __decorateClass([
  customElement("roxy-hexagram")
], RoxyHexagram);
export {
  RoxyHexagram
};
//# sourceMappingURL=hexagram.js.map
