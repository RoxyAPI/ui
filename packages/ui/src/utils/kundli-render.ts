import type { TemplateResult } from 'lit';
import { nothing, svg } from 'lit';
import { PLANET_ABBR, SIGN_ABBR, SIGNS_ORDER } from '../tokens/index.js';
import { longitudeToSignPosition } from './degree.js';
import { capitalize } from './string.js';

export const KUNDLI_SIZE = 300;
export const KUNDLI_CENTER = 150;

/**
 * Maps a lowercase rashi key (e.g. "aries") back to its canonical sign name
 * (e.g. "Aries"). Used by every kundli consumer to bridge spec lowercase
 * rashi keys to the title-cased SIGNS_ORDER tokens.
 */
export const RASHI_TO_SIGN: Record<string, string> = Object.fromEntries(
	SIGNS_ORDER.map((s) => [s.toLowerCase(), s] as const),
);

/**
 * A planet placed in a kundli house. This is a render-only view model, not an
 * API type: it carries just enough per-graha detail to draw a compact label
 * (abbreviation plus degree-within-sign plus retrograde mark) and a rich SVG
 * `<title>` tooltip (full position, nakshatra, pada, avastha). Both the D1
 * birth chart and the Dx divisional charts feed it from their `meta` map.
 */
export interface PlacedGraha {
	graha: string;
	longitude?: number;
	nakshatra?: { name?: string; pada?: number; lord?: string };
	isRetrograde?: boolean;
	awastha?: string;
}

export interface HouseDef {
	/** 1-based cell number. For the sign-fixed styles (south, east) this is the rashi index, Aries = 1. */
	number: number;
	/** Sign name (TitleCase, e.g. "Aries"). */
	sign: string;
	/** Planets occupying this house, with full detail for label + tooltip. */
	planets: PlacedGraha[];
	/** Whether this house is the ascendant (Lagna). */
	isLagna: boolean;
}

/** Superscript "r" used as a compact retrograde marker on planet labels. */
const RETRO_MARK = 'ʳ';

/**
 * Compact in-cell label for a placed graha: abbreviation, whole-degree within
 * the sign, and a retrograde mark. Degree is omitted when longitude is absent.
 */
function grahaLabel(p: PlacedGraha): string {
	const abbr = PLANET_ABBR[capitalize(p.graha)] ?? p.graha.slice(0, 2);
	const retro = p.isRetrograde ? RETRO_MARK : '';
	if (typeof p.longitude !== 'number' || !Number.isFinite(p.longitude)) {
		return `${abbr}${retro}`;
	}
	const { degree } = longitudeToSignPosition(p.longitude);
	return `${abbr} ${degree}°${retro}`;
}

/**
 * Full-detail tooltip text for a placed graha: name, exact degree and minute,
 * nakshatra and pada, avastha, retrograde. Surfaced via an SVG `<title>` so the
 * chart cell itself stays compact.
 */
function grahaTitle(p: PlacedGraha): string {
	const parts: string[] = [capitalize(p.graha)];
	if (typeof p.longitude === 'number' && Number.isFinite(p.longitude)) {
		const sp = longitudeToSignPosition(p.longitude);
		parts.push(
			`${sp.degree}°${String(sp.minute).padStart(2, '0')}' ${sp.sign}`,
		);
	}
	if (p.nakshatra?.name) {
		const pada = p.nakshatra.pada ? ` pada ${p.nakshatra.pada}` : '';
		parts.push(`${p.nakshatra.name}${pada}`);
	}
	if (p.awastha) parts.push(p.awastha);
	if (p.isRetrograde) parts.push('retrograde');
	return parts.join(' · ');
}

/**
 * Render the stack of planet labels for one house cell. Shared by all three
 * styles: vertically centers the stack on `baseY`, one line per planet, each
 * with a `<title>` tooltip carrying the full detail.
 */
function renderPlanetStack(
	planets: PlacedGraha[],
	cx: number,
	baseY: number,
	lineHeight: number,
): (TemplateResult | typeof nothing)[] {
	const startY = baseY - ((planets.length - 1) * lineHeight) / 2;
	return planets.map((p, j) => {
		const yPos = startY + j * lineHeight;
		return svg`<text class="planet-text" x=${cx} y=${yPos} text-anchor="middle" dominant-baseline="central">${grahaLabel(
			p,
		)}<title>${grahaTitle(p)}</title></text>`;
	});
}

/**
 * South Indian fixed-house square grid: house centers for planet text labels.
 * House 1 is fixed top-center; positions are in the 300x300 viewBox.
 */
export const SOUTH_HOUSE_CENTERS: Record<number, { x: number; y: number }> = {
	1: { x: 150, y: 58 },
	2: { x: 205, y: 52 },
	3: { x: 253, y: 112 },
	4: { x: 243, y: 150 },
	5: { x: 253, y: 188 },
	6: { x: 205, y: 248 },
	7: { x: 150, y: 242 },
	8: { x: 95, y: 248 },
	9: { x: 47, y: 188 },
	10: { x: 57, y: 150 },
	11: { x: 47, y: 112 },
	12: { x: 95, y: 52 },
};

/**
 * South Indian sign abbreviation positions (slightly outward from center).
 */
export const SOUTH_SIGN_POSITIONS: Record<number, { x: number; y: number }> = {
	1: { x: 150, y: 35 },
	2: { x: 222, y: 40 },
	3: { x: 265, y: 100 },
	4: { x: 265, y: 150 },
	5: { x: 265, y: 200 },
	6: { x: 222, y: 260 },
	7: { x: 150, y: 265 },
	8: { x: 78, y: 260 },
	9: { x: 35, y: 200 },
	10: { x: 35, y: 150 },
	11: { x: 35, y: 100 },
	12: { x: 78, y: 40 },
};

/**
 * North Indian style: 12 triangular house positions.
 * Lagna (house 1) is the top diamond, numbered clockwise.
 * Centers represent the visual midpoint of each triangular cell.
 */
export const NORTH_HOUSE_CENTERS: Record<number, { x: number; y: number }> = {
	1: { x: 150, y: 60 },
	2: { x: 225, y: 100 },
	3: { x: 255, y: 150 },
	4: { x: 225, y: 200 },
	5: { x: 150, y: 240 },
	6: { x: 75, y: 200 },
	7: { x: 45, y: 150 },
	8: { x: 75, y: 100 },
	9: { x: 100, y: 80 },
	10: { x: 150, y: 108 },
	11: { x: 200, y: 80 },
	12: { x: 200, y: 220 },
};

/**
 * East Indian style: a fixed-sign square (like South Indian) cut by both
 * diagonals and an inner diamond joining the side midpoints, giving 12 cells.
 * The four inner-diamond quadrilaterals hold the cardinal-position signs
 * (cell 1, 4, 7, 10) and the eight corner half-triangles fill between them,
 * laid out clockwise from the top so cell `n` holds the n-th rashi (Aries = 1).
 * Centers are the visual midpoints of those cells in the 300x300 viewBox,
 * derived from the frame geometry (square 10..290, diagonals, side-midpoint
 * diamond).
 *
 * @remarks The cell geometry is exact; the rashi-to-cell order follows the
 * common clockwise-from-top convention and is slated for a regional
 * reference-image confirmation pass (see docs/todo.md "East Indian polish").
 */
export const EAST_HOUSE_CENTERS: Record<number, { x: number; y: number }> = {
	1: { x: 150, y: 80 }, // inner diamond, top
	2: { x: 220, y: 33 }, // top-right corner, upper triangle
	3: { x: 267, y: 80 }, // top-right corner, right triangle
	4: { x: 220, y: 150 }, // inner diamond, right
	5: { x: 267, y: 220 }, // bottom-right corner, right triangle
	6: { x: 220, y: 267 }, // bottom-right corner, lower triangle
	7: { x: 150, y: 220 }, // inner diamond, bottom
	8: { x: 80, y: 267 }, // bottom-left corner, lower triangle
	9: { x: 33, y: 220 }, // bottom-left corner, left triangle
	10: { x: 80, y: 150 }, // inner diamond, left
	11: { x: 33, y: 80 }, // top-left corner, left triangle
	12: { x: 80, y: 33 }, // top-left corner, upper triangle
};

/**
 * East Indian sign abbreviation positions, nudged toward the outer edge of
 * every cell so the abbreviation and the planet stack do not collide.
 */
export const EAST_SIGN_POSITIONS: Record<number, { x: number; y: number }> = {
	1: { x: 150, y: 55 },
	2: { x: 235, y: 24 },
	3: { x: 276, y: 62 },
	4: { x: 242, y: 150 },
	5: { x: 276, y: 238 },
	6: { x: 235, y: 276 },
	7: { x: 150, y: 245 },
	8: { x: 65, y: 276 },
	9: { x: 24, y: 238 },
	10: { x: 58, y: 150 },
	11: { x: 24, y: 62 },
	12: { x: 65, y: 24 },
};

/**
 * Render a single south-Indian house group: lagna highlight, sign
 * abbreviation, planet labels with degree and tooltip.
 */
export function renderSouthHouseGroup(
	h: HouseDef,
): TemplateResult | typeof nothing {
	const center = SOUTH_HOUSE_CENTERS[h.number];
	const signPos = SOUTH_SIGN_POSITIONS[h.number];
	if (!center || !signPos) return nothing;
	const signAbbr = SIGN_ABBR[h.sign] ?? '';
	const baseY = h.isLagna ? center.y + 8 : center.y;
	return svg`
		<g>
			${
				h.isLagna
					? svg`<rect
							class="lagna-bg"
							x=${center.x - 30} y=${center.y - 28}
							width="60" height="56" rx="6"
						/>`
					: nothing
			}
			${
				signAbbr
					? svg`<text class="sign-text" x=${signPos.x} y=${signPos.y} text-anchor="middle" dominant-baseline="central">${signAbbr}</text>`
					: nothing
			}
			${
				h.isLagna
					? svg`<text class="lagna-marker" x=${center.x} y=${center.y - 18} text-anchor="middle" dominant-baseline="central">LAGNA</text>`
					: nothing
			}
			${renderPlanetStack(h.planets, center.x, baseY, 13)}
		</g>
	`;
}

/**
 * Render a north-Indian-style kundli wheel frame (grid lines only).
 * Returns the SVG structural lines; call `renderNorthHouseGroup` for content.
 */
export function renderNorthFrame(): TemplateResult {
	return svg`
		<polygon class="line" points="150,10 290,150 150,290 10,150" stroke-width="1.5" />
		<line class="line" x1="150" y1="10" x2="150" y2="290" stroke-width="1" />
		<line class="line" x1="10" y1="150" x2="290" y2="150" stroke-width="1" />
		<line class="line" x1="150" y1="10" x2="10" y2="150" stroke-width="0.6" stroke-dasharray="3,3" />
		<line class="line" x1="150" y1="10" x2="290" y2="150" stroke-width="0.6" stroke-dasharray="3,3" />
		<line class="line" x1="150" y1="290" x2="10" y2="150" stroke-width="0.6" stroke-dasharray="3,3" />
		<line class="line" x1="150" y1="290" x2="290" y2="150" stroke-width="0.6" stroke-dasharray="3,3" />
	`;
}

/**
 * Render a north-Indian house group (sign abbr + house number + planets).
 */
export function renderNorthHouseGroup(
	h: HouseDef,
): TemplateResult | typeof nothing {
	const center = NORTH_HOUSE_CENTERS[h.number];
	if (!center) return nothing;
	const signAbbr = SIGN_ABBR[h.sign] ?? '';
	return svg`
		<g>
			${
				h.isLagna
					? svg`<circle class="lagna-bg" cx=${center.x} cy=${center.y} r="22" />`
					: nothing
			}
			${
				signAbbr
					? svg`<text class="sign-text" x=${center.x} y=${center.y - 10} text-anchor="middle" dominant-baseline="central">${signAbbr}</text>`
					: nothing
			}
			<text class="house-num" x=${center.x} y=${center.y + 2} text-anchor="middle" dominant-baseline="central">${h.number}</text>
			${renderPlanetStack(h.planets, center.x, center.y + 14, 11)}
		</g>
	`;
}

/**
 * Render the south-Indian square frame (border diamond + inner square + radial lines).
 */
export function renderSouthFrame(): TemplateResult {
	return svg`
		<polygon class="line" points="150,10 290,150 150,290 10,150" stroke-width="1.5" />
		<polygon class="line" points="220,80 220,220 80,220 80,80" stroke-width="1" fill="none" />
		<line class="line" x1="150" y1="10" x2="80" y2="80" stroke-width="1" />
		<line class="line" x1="150" y1="10" x2="220" y2="80" stroke-width="1" />
		<line class="line" x1="290" y1="150" x2="220" y2="80" stroke-width="1" />
		<line class="line" x1="290" y1="150" x2="220" y2="220" stroke-width="1" />
		<line class="line" x1="150" y1="290" x2="220" y2="220" stroke-width="1" />
		<line class="line" x1="150" y1="290" x2="80" y2="220" stroke-width="1" />
		<line class="line" x1="10" y1="150" x2="80" y2="220" stroke-width="1" />
		<line class="line" x1="10" y1="150" x2="80" y2="80" stroke-width="1" />
	`;
}

/**
 * Render the east-Indian square frame: outer square, both diagonals, and the
 * inner diamond joining the four side midpoints. Twelve triangular cells.
 */
export function renderEastFrame(): TemplateResult {
	return svg`
		<rect class="line" x="10" y="10" width="280" height="280" stroke-width="1.5" fill="none" />
		<line class="line" x1="10" y1="10" x2="290" y2="290" stroke-width="1" />
		<line class="line" x1="290" y1="10" x2="10" y2="290" stroke-width="1" />
		<polygon class="line" points="150,10 290,150 150,290 10,150" stroke-width="1" fill="none" />
	`;
}

/**
 * Render an east-Indian house group. East Indian charts are sign-fixed like
 * the south style, so this mirrors `renderSouthHouseGroup` with the east cell
 * centers and a smaller line height to fit the triangular cells.
 */
export function renderEastHouseGroup(
	h: HouseDef,
): TemplateResult | typeof nothing {
	const center = EAST_HOUSE_CENTERS[h.number];
	const signPos = EAST_SIGN_POSITIONS[h.number];
	if (!center || !signPos) return nothing;
	const signAbbr = SIGN_ABBR[h.sign] ?? '';
	return svg`
		<g>
			${
				h.isLagna
					? svg`<circle class="lagna-bg" cx=${center.x} cy=${center.y} r="20" />`
					: nothing
			}
			${
				signAbbr
					? svg`<text class="sign-text" x=${signPos.x} y=${signPos.y} text-anchor="middle" dominant-baseline="central">${signAbbr}</text>`
					: nothing
			}
			${
				h.isLagna
					? svg`<text class="lagna-marker" x=${center.x} y=${center.y - 14} text-anchor="middle" dominant-baseline="central">LAGNA</text>`
					: nothing
			}
			${renderPlanetStack(h.planets, center.x, center.y + 2, 11)}
		</g>
	`;
}

/**
 * Bucket a graha-keyed `meta` map (from a D1 or Dx chart response) into the 12
 * sign-indexed houses. Shared by the kundli and divisional chart components so
 * both render the same rich per-graha detail. The Lagna entry is consumed only
 * to flag the ascendant cell, not rendered as a planet.
 */
export function buildHousesFromMeta(
	meta: Record<
		string,
		{
			graha?: string;
			rashi?: string;
			longitude?: number;
			nakshatra?: { name?: string; pada?: number; lord?: string };
			isRetrograde?: boolean;
			awastha?: string;
		}
	>,
): HouseDef[] {
	const byRashi = new Map<string, PlacedGraha[]>();
	let lagnaKey = '';
	for (const [name, pos] of Object.entries(meta)) {
		const rashiKey = (pos?.rashi ?? '').toLowerCase();
		if (name === 'Lagna' || pos?.graha === 'Lagna') {
			lagnaKey = rashiKey;
			continue;
		}
		if (!rashiKey) continue;
		const list = byRashi.get(rashiKey) ?? [];
		list.push({
			graha: pos.graha ?? name,
			longitude: pos.longitude,
			nakshatra: pos.nakshatra,
			isRetrograde: pos.isRetrograde,
			awastha: pos.awastha,
		});
		byRashi.set(rashiKey, list);
	}
	return SIGNS_ORDER.map((sign, i) => {
		const key = sign.toLowerCase();
		return {
			number: i + 1,
			sign,
			planets: byRashi.get(key) ?? [],
			isLagna: lagnaKey === key,
		};
	});
}
