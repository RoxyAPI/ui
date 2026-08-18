import type { TemplateResult } from 'lit';
import { css, html, nothing } from 'lit';
import { formatAyanamsa, formatNumber } from './format.js';
import type { Translate } from './hd-reading.js';

/**
 * The sidereal frame a Vedic response was computed in.
 *
 * @remarks
 * Structural rather than imported from one response type, because fifteen different schemas carry the identical object and a component should not have to name whichever one it happens to render. Both fields are required by the schema; they are optional here only so a component can pass `d.frame` without proving the payload is complete first.
 */
export interface SiderealFrame {
	ayanamsa?: string;
	ayanamsaDegrees?: number;
}

/**
 * Shared styling for the frame caption. Include in a component's `static styles` alongside {@link renderFrameCaption}.
 */
export const frameCaptionStyles = css`
	.roxy-frame {
		margin: 0;
		color: var(--roxy-muted, #71717a);
		font-size: var(--roxy-text-xs, 0.75rem);
		line-height: var(--roxy-leading-normal, 1.5);
	}
	.roxy-frame .roxy-frame-deg {
		font-variant-numeric: tabular-nums;
	}
`;

/**
 * One line naming the sidereal frame a chart or strength table was cast in.
 *
 * @remarks
 * **This is provenance, not decoration, and leaving it out is a correctness problem rather than a cosmetic one.** Changing the ayanamsa moves every longitude by up to a degree, which is enough to put a graha in a different rashi. A chart rendered without saying which frame produced it therefore cannot be reconciled against any other calculator, and a reader who changed the frame by accident concludes the component is broken rather than that they are comparing two different skies. Echoing it is the whole reason the response carries it.
 *
 * Renders nothing when the payload has no frame, so it is safe to call unconditionally on a response type that predates the field.
 *
 * The label comes from {@link formatAyanamsa}, so `raman` reads "B.V. Raman" and `kp-newcomb` keeps its initialism, and a frame added upstream cannot arrive as a bare enum without a test failing.
 *
 * @example
 * ```ts
 * static styles = [baseStyles, frameCaptionStyles, css`...`];
 * // in renderData:
 * ${renderFrameCaption(this.effectiveLang(), d.frame, this.translator)}
 * ```
 */
export function renderFrameCaption(
	locale: string | undefined,
	frame: SiderealFrame | undefined,
	t: Translate,
): TemplateResult | typeof nothing {
	if (!frame?.ayanamsa) return nothing;
	const label = formatAyanamsa(locale, frame.ayanamsa);
	if (!label) return nothing;
	// Two whole sentences rather than a stem plus a fragment, so each language
	// orders the frame and the offset the way its own grammar wants.
	const degrees =
		typeof frame.ayanamsaDegrees === 'number'
			? formatNumber(locale, frame.ayanamsaDegrees, 4)
			: undefined;
	return html`<p class="roxy-frame">
		${
			degrees === undefined
				? t('Sidereal frame: {{frame}}', { frame: label })
				: t('Sidereal frame: {{frame}}, {{degrees}}° subtracted', {
						frame: label,
						degrees,
					})
		}
	</p>`;
}

/** One frame in a response computed across several: the frame itself, the instant it was read at, and the sections it decided. */
export interface GoverningFrame extends SiderealFrame {
	at?: string;
	governs?: readonly string[];
}

/**
 * Every frame a multi-frame response was computed in, one line each.
 *
 * @remarks
 * Separate from {@link renderFrameCaption} rather than a widening of it, because the two answer different questions: one chart cast in one frame needs the frame NAMED, while a response assembled from several needs each frame tied to the part of the answer it decided. Collapsing these to a single caption would print one ayanamsa over sections two others produced, which is the provenance failure the caption exists to prevent.
 *
 * The label comes from {@link formatAyanamsa}, the same source the single-frame caption reads, so a frame added upstream reads the same in both.
 */
export function renderFrameProvenance(
	locale: string | undefined,
	frames: Record<string, GoverningFrame | undefined> | undefined,
	t: Translate,
): TemplateResult | typeof nothing {
	const rows = Object.values(frames ?? {}).filter((f): f is GoverningFrame =>
		Boolean(f?.ayanamsa),
	);
	if (rows.length === 0) return nothing;
	return html`<div class="roxy-frame">
		${rows.map((f) => {
			const label = formatAyanamsa(locale, f.ayanamsa);
			const degrees =
				typeof f.ayanamsaDegrees === 'number'
					? formatNumber(locale, f.ayanamsaDegrees, 4)
					: undefined;
			const governs = f.governs?.length ? f.governs.join(', ') : '';
			return html`<p class="roxy-frame">
				${
					degrees === undefined
						? t('Sidereal frame: {{frame}}', { frame: label })
						: t('Sidereal frame: {{frame}}, {{degrees}}° subtracted', {
								frame: label,
								degrees,
							})
				}${governs ? t(', governs {{sections}}', { sections: governs }) : ''}
			</p>`;
		})}
	</div>`;
}
