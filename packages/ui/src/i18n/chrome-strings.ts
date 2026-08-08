/**
 * Every English chrome string currently covered by a shipped locale, and the type a catalogue is checked against.
 *
 * @remarks
 * **Chrome only.** These are the words the library itself writes: headings, tab labels, table captions, legends, empty states, accessible names. Domain vocabulary (planet, sign, aspect, element and modality NAMES) is deliberately absent: those are values the API returns, they are being localized server-side as additive display fields, and duplicating them here would create a second translation of the same fact that can disagree with the response rendered beside it.
 *
 * **Scope is the two Western chart wheels plus the shared chrome they inherit**, which is what a Western practitioner site needs to read as a Spanish product: a natal card in Spanish over an English transit wheel is the half-translated state this list exists to remove. The other components still render English chrome; extending the scope is adding entries here and to each locale, not new machinery.
 *
 * **Two entries may never differ only by case.** The runtime key is {@link lookupKey} of the source string, so `harmonious` and `Harmonious` are ONE key and the second silently overwrites the first in every catalogue. Both shipped, which is why the natal legend read `Armónicos` in Spanish where English read `harmonious`. Only the capitalized forms remain and `tests/i18n.test.ts` fails on any new pair that collides.
 *
 * This module is imported for its TYPE by the locale files and by value only by the tests, so it never reaches a component bundle. It exists so a locale cannot silently omit a string and a component cannot silently introduce one: `tests/i18n.test.ts` scans the component sources for `t(...)` call sites and fails on anything absent from this list, then fails again on any locale missing a key.
 */

export const CHROME_STRINGS = [
	// Shared chrome, inherited by every data component from the base element
	// and the interpretation accordion.
	'Edit query',
	'Spiritual data by RoxyAPI',
	'No data',
	'Loading',
	'Reading',

	// Natal chart: card, views, wheel. `Relocation chart` is here because
	// `<roxy-relocation-wheel>` composes this exact card and passes its own
	// heading in; without it that card renders one English word inside otherwise
	// translated chrome. The last two are the honest fallback: a response that
	// carries no cusps is drawn as equal sectors, and both the accessible name and
	// a visible chip have to say so instead of asserting twelve houses.
	'Natal chart',
	'Relocation chart',
	'No chart data',
	'Wheel',
	'Aspect grid',
	'Natal chart views',
	'Natal chart wheel',
	'Natal chart wheel with twelve houses, planets, and aspects',
	'Natal chart wheel with planets and aspects, houses shown as equal sectors from the Ascendant',
	'Equal sectors from the Ascendant, no house cusps in this response',
	'Twelve zodiac sign segments around a circular wheel. Planet glyphs are placed at their ecliptic longitudes. Aspect lines connect related planets.',
	'retrograde',

	// Natal chart: legend.
	'{{count}} planets',
	'{{count}} aspects',
	'{{system}} houses',

	// Natal chart: aspect grid.
	'No planets to grid',
	'Planet by planet aspect grid: the aspect each pair of planets forms, read from the planet naming the row across to the planet naming the column.',
	'orb',

	// Natal chart: balance details.
	'Dominant element',
	'Dominant modality',
	'Harmonious',
	'Challenging',
	'Neutral',
	'All {{count}} bodies in the chart, placed by sign',
	'Element and modality distribution',
	'Total',

	// Natal chart: configurations.
	'Chart patterns',
	'Dissociate',
	'Out of sign: one or more planets sit outside the pattern element or modality, so the theme holds but runs weaker.',
	'{{percent}}% tight',
	'apex',

	// Natal chart: readings.
	'Planet readings',

	// Transit bi-wheel: card and wheel. The three orientation chips and the two
	// cusp chips are also the sentences the SVG description is built from, so the
	// picture and its accessible text can never claim different orientations.
	'Transits',
	'No transit data',
	'Aspects to the natal chart: {{count}}',
	'Natal and transit bi-wheel',
	'Bi-wheel with natal bodies on the inner ring and transiting bodies on the outer ring',
	'Twelve zodiac sign segments around a circular wheel. Natal bodies sit at their ecliptic longitudes on the inner ring and transiting bodies on the outer ring, and each line joins a transiting body to the natal body it aspects.',

	// Transit bi-wheel: legend.
	'{{count}} natal bodies',
	'{{count}} transiting bodies',
	'Ascendant on the left horizon',
	'First house cusp on the left horizon',
	'Sign wheel, 0° Aries on the left',
	'House cusps supplied by the page',
	'No house cusps',

	// Transit bi-wheel: summary and the tightest contact. `Natal` and
	// `Transiting` do double duty as table headers and as the word in front of a
	// body name in a tooltip, which is why there is no lower-case pair.
	'Transit aspect summary',
	'Strongest',
	'Natal',
	'Transiting',
	'Applying',
	'Separating',
	'strength',

	// Transit bi-wheel: positions table.
	'Every body with its natal position and its position on the transit date, each as a zodiac sign and a degree.',
	'Both house numbers are read against the natal house cusps.',
	'Body',
	'Natal house',
	'Transiting house',

	// Transit bi-wheel: readings.
	'Transit readings',
	'Impact',
	'Timing',
	'Guidance',
] as const;

/** One of the English source strings a shipped catalogue must translate. */
export type ChromeString = (typeof CHROME_STRINGS)[number];
