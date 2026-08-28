/**
 * The nine-palace grid every feng-shui plate is drawn on, and the square it is built from.
 *
 * @remarks
 * Shared rather than held per component, because two cards now draw the same nine cells over
 * different numbers and a second copy of this order is a second chance to get it wrong. Only the
 * GEOMETRY lives here: the palace names are canonical English on every response whatever the
 * language, so this module is keys and arithmetic with no copy in it, and each card keeps its own
 * labels.
 */

/**
 * The nine palaces in the order they are DRAWN, reading the grid left to right and top to bottom.
 *
 * @remarks
 * **South is at the top.** A feng-shui plate is drawn on the Chinese compass, which puts south
 * above and north below, and every published plate reads that way. The response corroborates it
 * without being asked: the flying-star `base` numbers are the Lo Shu square, and laid out in this
 * order they come out as the square is written, 4 9 2 over 3 5 7 over 8 1 6, with every row,
 * column and diagonal summing to fifteen. `tests/flying-star-chart.test.ts` asserts exactly that
 * against a live plate, which is what makes this an invariant rather than a preference: a grid
 * rotated or mirrored still looks like a plate and still passes every count.
 */
export const GRID_ORDER = [
	'Southeast',
	'South',
	'Southwest',
	'East',
	'Center',
	'West',
	'Northeast',
	'North',
	'Northwest',
] as const;

/**
 * The Lo Shu square in {@link GRID_ORDER}, which is the arrangement every plate is built on.
 *
 * @remarks
 * Held here and asserted against the response rather than derived from it, so a plate whose base
 * numbers do not form the square fails instead of drawing whatever arrived.
 */
export const LO_SHU = [4, 9, 2, 3, 5, 7, 8, 1, 6] as const;

/** The eight compass sectors, without the centre. The order a response lists its sectors in is its own. */
export const COMPASS_SECTORS = GRID_ORDER.filter(
	(p) => p !== 'Center',
) as readonly string[];
