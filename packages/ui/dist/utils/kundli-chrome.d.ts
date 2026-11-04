import type { TemplateResult } from 'lit';
import type { Translate } from '../i18n/registry.js';
import { type ChartStyle, type KundliViewModel, type toKundliViewModel } from './kundli-render.js';
/**
 * Every caption that belongs under a kundli: why the layout changed when no ascendant arrived, and the key to the state marks the cells carry.
 *
 * @remarks
 * One entry point rather than two, because both callers need the identical set and a caller that rendered only one of them would explain the marks on a chart whose layout had silently changed, or the reverse. Uses the shared frame-caption class, so a component already showing the sidereal frame needs no extra styles.
 */
export declare function renderKundliCaptions(vm: KundliViewModel, t: Translate): TemplateResult[];
/**
 * Render a WAI-ARIA-compliant tablist that lets the end user switch between
 * South / North / East kundli styles at runtime. The hosting component owns
 * the `chartStyle` state; this helper renders the buttons and wires the
 * arrow-key navigation plus click handler.
 *
 * @param active - The currently selected style.
 * @param setStyle - Callback the host component uses to update its state.
 */
export declare function renderKundliStyleTablist(active: ChartStyle, setStyle: (next: ChartStyle) => void, t: Translate): TemplateResult;
/** Divisional placements stay distinct from the natal position and nakshatra returned beside them. */
export declare function renderVargaReferenceTable(meta: Parameters<typeof toKundliViewModel>[0], division: number, locale: string | undefined, t: Translate): TemplateResult;
