/**
 * German chrome strings.
 *
 * @remarks
 * Importing this module registers the catalogue and re-renders every mounted component, so it is a side-effect entry, exactly like a `components/*` module. It is built to `dist/locales/de.js` and `dist/cdn/locales/de.js` as its OWN payload rather than compiled into the components, so an English site downloads none of it.
 *
 * Keyed by the English source string as it appears at the call site, so this file diffs directly against the component that renders it and no key vocabulary has to be kept in sync with the copy.
 *
 * Regional German resolves here: the registry falls back from `de-CH` and `de-AT` to `de`.
 *
 * Two false friends were found while sourcing this and both are the kind that read as correct to an English speaker. **`Apex` is NOT the apex of a T-square in German**: Astrodienst reserves it for the Sonnenapex, the direction of the solar system's motion, and the focal planet of a figure is the `Spitze`. And **`Aspektarium` is not an aspect grid**, it is a reference book of aspect meanings; the grid is the `Aspekttabelle`.
 *
 * **`Spitze` therefore carries two senses in this file and both are correct German.** `apex` is the focal planet of an aspect figure, and `Spitze des ersten Hauses` is the first house CUSP (Astrodienst Astrowiki, `Häuserspitze`). Do not unify them.
 *
 * **`Radix` and `Geburtshoroskop` are both used, deliberately.** The short label positions (table columns, legend chips, the ring word in a tooltip) take `Radix`, which is what German astrologers write beside a value; the running prose keeps `Geburtshoroskop`. German switches between the two exactly this way.
 *
 * **`Bi-wheel` has no German astrological term.** Verified negatively: the Astrowiki fulltext search returns zero results for `Doppelrad`, `Doppelkreis` and `Bi-Wheel`, and German names this chart by what it contains (`Geburtshoroskop mit Transiten`) rather than by its two rings. Nothing was invented: the two entries needing it are built on `Horoskopzeichnung`, the word the Astrowiki uses for the drawing itself, plus the plain descriptive `mit zwei Ringen`.
 *
 * Rejected against sources, so nobody restores them: `zunehmend`/`abnehmend` for applying and separating (those are the waxing and waning MOON), `Zeichenrad` and `Tierkreisrad` for the sign wheel (zero German astrological usage), `äquale Häuser` for the equal-sector fallback (that names a house SYSTEM, and the fallback fires precisely when the response named none), and `Radixhaus`/`Transithaus` for the house columns (unattested, and `Transithaus` actively misreads as a house of the transit chart rather than the natal house being passed through).
 */

import type { ChromeString } from '../i18n/chrome-strings.js';
import { registerLocale } from '../i18n/registry.js';

export const de: Record<ChromeString, string> = {
	'Edit query': 'Abfrage bearbeiten',
	'Spiritual data by RoxyAPI': 'Spirituelle Daten von RoxyAPI',
	'No data': 'Keine Daten',
	Loading: 'Wird geladen',
	Reading: 'Deutung',

	'Natal chart': 'Geburtshoroskop',
	'Relocation chart': 'Relokationshoroskop',
	'No chart data': 'Keine Horoskopdaten',
	Wheel: 'Horoskopgrafik',
	'Aspect grid': 'Aspekttabelle',
	'Natal chart views': 'Ansichten des Geburtshoroskops',
	'Natal chart wheel': 'Horoskopzeichnung',
	'Natal chart wheel with twelve houses, planets, and aspects':
		'Horoskopzeichnung mit zwölf Häusern, Planeten und Aspekten',
	'Natal chart wheel with planets and aspects, houses shown as equal sectors from the Ascendant':
		'Horoskopzeichnung mit Planeten und Aspekten, Häuser als gleich große Sektoren ab dem Aszendenten',
	'Equal sectors from the Ascendant, no house cusps in this response':
		'Gleich große Sektoren ab dem Aszendenten, keine Häuserspitzen in dieser Antwort',
	'Twelve zodiac sign segments around a circular wheel. Planet glyphs are placed at their ecliptic longitudes. Aspect lines connect related planets.':
		'Zwölf Tierkreiszeichen als Segmente um ein kreisförmiges Rad. Die Planetenglyphen stehen auf ihren ekliptikalen Längen. Aspektlinien verbinden die beteiligten Planeten.',
	retrograde: 'rückläufig',

	'{{count}} planets': '{{count}} Planeten',
	'{{count}} aspects': '{{count}} Aspekte',
	'{{system}} houses': 'Häuser nach {{system}}',

	'No planets to grid': 'Keine Planeten für die Tabelle',
	'Planet by planet aspect grid: the aspect each pair of planets forms, read from the planet naming the row across to the planet naming the column.':
		'Aspekttabelle Planet für Planet: der Aspekt, den jedes Planetenpaar bildet, gelesen vom Planeten der Zeile zum Planeten der Spalte.',
	orb: 'Orbis',

	'Dominant element': 'Dominantes Element',
	'Dominant modality': 'Dominante Qualität',
	Harmonious: 'Harmonisch',
	Challenging: 'Herausfordernd',
	Neutral: 'Neutral',
	'All {{count}} bodies in the chart, placed by sign':
		'Alle {{count}} Himmelskörper des Horoskops, nach Zeichen geordnet',
	'Element and modality distribution': 'Verteilung nach Element und Qualität',
	Total: 'Gesamt',

	'Chart patterns': 'Aspektfiguren',
	Dissociate: 'Dissoziiert',
	'Out of sign: one or more planets sit outside the pattern element or modality, so the theme holds but runs weaker.':
		'Zeichenfremd: ein oder mehrere Planeten liegen außerhalb von Element oder Qualität der Figur, das Thema bleibt also bestehen, wirkt aber schwächer.',
	'{{percent}}% tight': '{{percent}}% genau',
	apex: 'Spitze',

	'Planet readings': 'Planetendeutungen',

	Transits: 'Transite',
	'No transit data': 'Keine Transitdaten',
	'Aspects to the natal chart: {{count}}':
		'Aspekte zum Geburtshoroskop: {{count}}',
	'Natal and transit bi-wheel':
		'Horoskopzeichnung mit zwei Ringen für Radix und Transite',
	'Bi-wheel with natal bodies on the inner ring and transiting bodies on the outer ring':
		'Horoskopzeichnung mit zwei Ringen: die Radix-Himmelskörper im inneren Ring, die Transit-Himmelskörper im äußeren Ring',
	'Twelve zodiac sign segments around a circular wheel. Natal bodies sit at their ecliptic longitudes on the inner ring and transiting bodies on the outer ring, and each line joins a transiting body to the natal body it aspects.':
		'Zwölf Tierkreiszeichen als Segmente um ein kreisförmiges Rad. Die Radix-Himmelskörper stehen auf ihren ekliptikalen Längen im inneren Ring, die Transit-Himmelskörper im äußeren Ring, und jede Linie verbindet einen Transit-Himmelskörper mit dem Radix-Himmelskörper, zu dem er einen Aspekt bildet.',

	'{{count}} natal bodies': '{{count}} Radix-Himmelskörper',
	'{{count}} transiting bodies': '{{count}} Transit-Himmelskörper',
	'Ascendant on the left horizon': 'Aszendent am linken Horizont',
	'First house cusp on the left horizon':
		'Spitze des ersten Hauses am linken Horizont',
	'Sign wheel, 0° Aries on the left': 'Tierkreis, 0° Widder links',
	'House cusps supplied by the page': 'Von der Seite übergebene Häuserspitzen',
	'No house cusps': 'Keine Häuserspitzen',

	'Transit aspect summary': 'Übersicht der Transitaspekte',
	Strongest: 'Stärkster Transit',
	Natal: 'Radix',
	Transiting: 'Transit',
	Applying: 'Applikativ',
	Separating: 'Separativ',
	strength: 'Stärke',

	'Every body with its natal position and its position on the transit date, each as a zodiac sign and a degree.':
		'Jeder Himmelskörper mit seiner Radixposition und seiner Position am Transitdatum, jeweils als Tierkreiszeichen und Grad.',
	'Both house numbers are read against the natal house cusps.':
		'Beide Hausnummern werden an den Häuserspitzen des Geburtshoroskops abgelesen.',
	Body: 'Himmelskörper',
	'Natal house': 'Haus im Radix',
	'Transiting house': 'Haus im Transit',

	'Transit readings': 'Transitdeutungen',
	Impact: 'Wirkung',
	Timing: 'Zeitraum',
	Guidance: 'Empfehlung',
};

registerLocale('de', de);
