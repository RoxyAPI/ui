import type { TemplateResult } from 'lit';
import { nothing, svg } from 'lit';
import { PLANET_ABBR, SIGN_ABBR, SIGNS_ORDER } from '../tokens/index.js';
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

export interface HouseDef {
	/** 1-based house number. */
	number: number;
	/** Sign name (TitleCase, e.g. "Aries"). */
	sign: string;
	/** Planet abbreviation strings to display. */
	planets: string[];
	/** Whether this house is the ascendant (Lagna). */
	isLagna: boolean;
}

/**
 * Render a single house group: lagna highlight, sign abbreviation, planet labels.
 * Returns an SVG fragment for use inside an `<svg>` element.
 */
export function renderSouthHouseGroup(
	h: HouseDef,
): TemplateResult | typeof nothing {
	const center = SOUTH_HOUSE_CENTERS[h.number];
	const signPos = SOUTH_SIGN_POSITIONS[h.number];
	if (!center || !signPos) return nothing;
	const signAbbr = SIGN_ABBR[h.sign] ?? '';
	const planets = h.planets;
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
			${planets.map((planet, j) => {
				const abbr = PLANET_ABBR[capitalize(planet)] ?? planet.slice(0, 2);
				const lineHeight = 13;
				const baseY = h.isLagna ? center.y + 8 : center.y;
				const startY = baseY - ((planets.length - 1) * lineHeight) / 2;
				const yPos = startY + j * lineHeight;
				return svg`<text class="planet-text" x=${center.x} y=${yPos} text-anchor="middle" dominant-baseline="central">${abbr}</text>`;
			})}
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
	const planets = h.planets;
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
			${planets.map((planet, j) => {
				const abbr = PLANET_ABBR[capitalize(planet)] ?? planet.slice(0, 2);
				const lineHeight = 11;
				const startY = center.y + 14 - ((planets.length - 1) * lineHeight) / 2;
				const yPos = startY + j * lineHeight;
				return svg`<text class="planet-text" x=${center.x} y=${yPos} text-anchor="middle" dominant-baseline="central">${abbr}</text>`;
			})}
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
