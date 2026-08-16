import type { TemplateResult } from 'lit';
import { nothing, svg } from 'lit';
import { GATE_CENTER } from './bodygraph-render.js';

/**
 * Fixed geometry and renderer for the Human Design penta, the group figure.
 *
 * @remarks
 * The penta is a ladder rather than a bodygraph: three horizontal bars for the Throat, G and Sacral, with the six channels as evenly spaced rungs between them, three above the G and three below. Its channels do sit on bodygraph gates, so {@link GATE_CENTER} decides which end of a rung a gate takes and which row it belongs to, rather than the order a pair is listed in.
 */

/** One rung: its two gates, its name, and whether the group completes it. */
export interface PentaRung {
	gateA: number;
	gateB: number;
	name: string;
	defined: boolean;
	isCore: boolean;
}

/** Who holds a gate, as the member indices the response reports. */
export type PentaHolders = ReadonlyMap<number, readonly number[]>;

const VIEW_W = 360;
const VIEW_H = 470;
const BAR_X = 8;
const BAR_W = VIEW_W - BAR_X * 2;
const BAR_H = 48;
const GATE_R = 15;
/** Badge radius and step, sized so five holders on one gate stay inside their column. */
const BADGE_R = 7;
const BADGE_STEP = 16;

/** The three bars, top to bottom, with the centre each one stands for. */
const BARS = [
	{ id: 'throat', label: 'Throat', y: 0 },
	{ id: 'g', label: 'G', y: 211 },
	{ id: 'sacral', label: 'Sacral', y: 422 },
] as const;

export const PENTA_VIEWBOX = `0 0 ${VIEW_W} ${VIEW_H}`;

/** Column centres, spread evenly across the bars for however many rungs a row holds. */
function columnX(index: number, count: number): number {
	return BAR_X + (BAR_W * (index * 2 + 1)) / (count * 2);
}

/** A rung sits above the G when one of its gates is in the Throat, below it otherwise. */
function isUpper(rung: PentaRung): boolean {
	return (
		GATE_CENTER[rung.gateA] === 'throat' || GATE_CENTER[rung.gateB] === 'throat'
	);
}

/** The gate that takes the top of a rung, which is the one in the higher centre. */
function topGate(rung: PentaRung): number {
	const upper = isUpper(rung);
	const aIsTop = upper
		? GATE_CENTER[rung.gateA] === 'throat'
		: GATE_CENTER[rung.gateA] === 'g';
	return aIsTop ? rung.gateA : rung.gateB;
}

function renderBars(): TemplateResult[] {
	return BARS.map(
		(b) => svg`<g>
			<rect class="pn-bar" x=${BAR_X} y=${b.y} width=${BAR_W} height=${BAR_H} rx="10" />
			<text class="pn-bar-label" x=${VIEW_W / 2} y=${b.y + BAR_H / 2} text-anchor="middle" dominant-baseline="central">${b.label}</text>
		</g>`,
	);
}

/** The letters of everyone holding a gate, laid out beside its circle. */
function renderHolders(
	cx: number,
	cy: number,
	held: readonly number[],
	letterFor: (index: number) => string,
): TemplateResult[] {
	return held.map(
		(m, i) => svg`<g>
			<circle class="pn-badge" cx=${cx + GATE_R + BADGE_R + 2 + i * BADGE_STEP} cy=${cy} r=${BADGE_R} />
			<text class="pn-badge-text" x=${cx + GATE_R + BADGE_R + 2 + i * BADGE_STEP} y=${cy} text-anchor="middle" dominant-baseline="central">${letterFor(m)}</text>
		</g>`,
	);
}

function renderGate(
	cx: number,
	cy: number,
	gate: number,
	held: readonly number[],
	letterFor: (index: number) => string,
): TemplateResult {
	const on = held.length > 0;
	return svg`<g>
		<circle class="pn-gate-dot ${on ? 'on' : ''}" cx=${cx} cy=${cy} r=${GATE_R} />
		<text class="pn-gate ${on ? 'on' : ''}" x=${cx} y=${cy} text-anchor="middle" dominant-baseline="central">${gate}</text>
		${renderHolders(cx, cy, held, letterFor)}
	</g>`;
}

export interface PentaRenderInput {
	rungs: readonly PentaRung[];
	holders: PentaHolders;
	/** How a member index is named on the chart, so the badge and the rows below read the same. */
	letterFor: (index: number) => string;
}

/**
 * Render the penta inner content. The caller wraps it in an `<svg>` with
 * {@link PENTA_VIEWBOX} and applies its own theming CSS.
 */
export function renderPentaSvg(input: PentaRenderInput): TemplateResult {
	const rows: TemplateResult[] = [];
	for (const upper of [true, false]) {
		const inRow = input.rungs.filter((r) => isUpper(r) === upper);
		const top = upper ? BAR_H : BARS[1].y + BAR_H;
		const bottom = upper ? BARS[1].y : BARS[2].y;
		const topCy = top + 26;
		const botCy = bottom - 26;
		const mid = (topCy + botCy) / 2;
		inRow.forEach((rung, i) => {
			const cx = columnX(i, inRow.length);
			const gTop = topGate(rung);
			const gBottom = gTop === rung.gateA ? rung.gateB : rung.gateA;
			const cls = `pn-rung ${rung.defined ? 'on' : ''} ${rung.isCore ? 'core' : ''}`;
			rows.push(svg`<g>
				<line class=${cls} x1=${cx} y1=${topCy + GATE_R} x2=${cx} y2=${mid - 13} />
				<line class=${cls} x1=${cx} y1=${mid + 13} x2=${cx} y2=${botCy - GATE_R} />
				<text class="pn-name ${rung.defined ? 'on' : ''}" x=${cx} y=${mid} text-anchor="middle" dominant-baseline="central">${rung.name}</text>
				${renderGate(cx, topCy, gTop, input.holders.get(gTop) ?? [], input.letterFor)}
				${renderGate(cx, botCy, gBottom, input.holders.get(gBottom) ?? [], input.letterFor)}
			</g>`);
		});
	}
	return svg`${renderBars()}${rows.length > 0 ? rows : nothing}`;
}
