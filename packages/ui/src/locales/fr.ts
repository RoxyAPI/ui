/**
 * French chrome strings.
 *
 * @remarks
 * Importing this module registers the catalogue and re-renders every mounted component, so it is a side-effect entry, exactly like a `components/*` module. It is built to `dist/locales/fr.js` and `dist/cdn/locales/fr.js` as its OWN payload rather than compiled into the components, so an English site downloads none of it.
 *
 * Keyed by the English source string as it appears at the call site, so this file diffs directly against the component that renders it and no key vocabulary has to be kept in sync with the copy.
 *
 * **Every elision is routed around, because the brand rule forbids apostrophes.** French forces `l'orbe` and `l'apex` the moment either takes an article, so both are written as bare labels (`orbe`, `apex`), which is also how the sources use them beside a value. The same rule is what drops the article in `à partir du degré Ascendant`: `depuis l'Ascendant` is the natural phrasing and is unusable here. Any future entry has to be phrased the same way rather than reaching for the apostrophe.
 *
 * **`roue` is the only wheel noun in this file, deliberately.** French astrology software says `double roue` (Auréas) and the French astrology web says `double carte` (Astrotheme) for the same drawing; both are attested, and forking to `carte` inside one component would leave the library with two nouns for one thing. Nothing about `double roue` is canonical the way `bi-wheel` is in English, so this is a consistency choice rather than a term of art.
 *
 * Rejected against sources, so nobody restores them: `Applicatif`/`Séparatif` for applying and separating (the obvious calque, found on no French astrology source; the specialist glossaries and Auréas both print `appliquant`/`séparant`), `bi-roue` (an invented calque with zero attestation), `anneau` for a chart ring (forces the banned elision and is not the French word for this), `pointe` alone for a cusp (a real synonym but ambiguous out of context, where `cuspide` is not), `Maison en transit` for the transited house (it reverses the semantics and says the HOUSE is transiting), and `corps céleste` for a body (correct, but long for a column header and it breaks continuity with `astres` in the natal catalogue).
 *
 * Two entries sit in front of an API-returned body name, so they are the noun forms `Transit` and `Natal` rather than the attested adjective `transitante`, which French places after the noun and which the component cannot compose. The tooltip therefore reads `Transit Mars carré Natal Venus`, which is the T. and N. convention French chart software already uses.
 *
 * `Impact`, `Timing` and `Guidance` have no French astrological vocabulary behind them at all: they are report-layout labels, so `Effets`, `Période` and `Conseils` are plain French. `Datation` is the technical French word for the timing dimension if a more expert register is ever wanted.
 */

import type { ChromeString } from '../i18n/chrome-strings.js';
import { registerLocale } from '../i18n/registry.js';

export const fr: Record<ChromeString, string> = {
	'Edit query': 'Modifier la requête',
	'Spiritual data by RoxyAPI': 'Données spirituelles par RoxyAPI',
	'No data': 'Aucune donnée',
	Loading: 'Chargement',
	Reading: 'Interprétation',

	'Natal chart': 'Thème natal',
	'Relocation chart': 'Thème de relocalisation',
	'No chart data': 'Aucune donnée de thème',
	Wheel: 'Roue',
	'Aspect grid': 'Grille des aspects',
	'Natal chart views': 'Vues du thème natal',
	'Natal chart wheel': 'Roue du thème natal',
	'Natal chart wheel with twelve houses, planets, and aspects':
		'Roue du thème natal avec douze maisons, planètes et aspects',
	'Natal chart wheel with planets and aspects, houses shown as equal sectors from the Ascendant':
		'Roue du thème natal avec planètes et aspects, maisons affichées en secteurs égaux à partir du degré Ascendant',
	'Equal sectors from the Ascendant, no house cusps in this response':
		'Secteurs égaux à partir du degré Ascendant, aucune cuspide de maison dans cette réponse',
	'Twelve zodiac sign segments around a circular wheel. Planet glyphs are placed at their ecliptic longitudes. Aspect lines connect related planets.':
		'Douze segments de signes du zodiaque autour de la roue. Les glyphes planétaires occupent leurs longitudes écliptiques. Les lignes relient les planètes en aspect.',
	retrograde: 'rétrograde',

	'{{count}} planets': '{{count}} planètes',
	'{{count}} aspects': '{{count}} aspects',
	'{{system}} houses': 'maisons {{system}}',

	'No planets to grid': 'Aucune planète pour la grille',
	'Planet by planet aspect grid: the aspect each pair of planets forms, read from the planet naming the row across to the planet naming the column.':
		'Grille des aspects planète par planète : chaque paire de planètes affiche son aspect, lu depuis la planète de la ligne vers la planète de la colonne.',
	orb: 'orbe',

	'Dominant element': 'Élément dominant',
	'Dominant modality': 'Modalité dominante',
	Harmonious: 'Harmoniques',
	Challenging: 'Tendus',
	Neutral: 'Neutres',
	'All {{count}} bodies in the chart, placed by sign':
		'Les {{count}} astres du thème, classés par signe',
	'Element and modality distribution': 'Répartition par élément et modalité',
	Total: 'Total',

	'Chart patterns': 'Configurations du thème',
	Dissociate: 'Dissociée',
	'Out of sign: one or more planets sit outside the pattern element or modality, so the theme holds but runs weaker.':
		'Hors signe : une ou plusieurs planètes sortent du même élément ou de la même modalité que la configuration, le thème demeure donc mais agit plus faiblement.',
	'{{percent}}% tight': '{{percent}}% de précision',
	apex: 'apex',

	'Planet readings': 'Interprétations des planètes',

	Transits: 'Transits',
	'No transit data': 'Aucune donnée de transit',
	'Aspects to the natal chart: {{count}}': 'Aspects au thème natal : {{count}}',
	'Natal and transit bi-wheel': 'Double roue du thème natal et des transits',
	'Bi-wheel with natal bodies on the inner ring and transiting bodies on the outer ring':
		'Double roue avec les astres du thème natal sur le cercle intérieur et les astres en transit sur le cercle extérieur',
	'Twelve zodiac sign segments around a circular wheel. Natal bodies sit at their ecliptic longitudes on the inner ring and transiting bodies on the outer ring, and each line joins a transiting body to the natal body it aspects.':
		'Douze segments de signes du zodiaque autour de la roue. Les astres du thème natal occupent leurs longitudes écliptiques sur le cercle intérieur et les astres en transit sur le cercle extérieur, et chaque ligne relie un astre en transit à un astre natal avec lequel il forme un aspect.',

	'{{count}} natal bodies': '{{count}} astres du thème natal',
	'{{count}} transiting bodies': '{{count}} astres en transit',
	'Ascendant on the left horizon': 'Ascendant à gauche',
	'First house cusp on the left horizon': 'Cuspide de la maison 1 à gauche',
	'Sign wheel, 0° Aries on the left': 'Roue des signes, 0° Bélier à gauche',
	'House cusps supplied by the page': 'Cuspides de maison fournies par la page',
	'No house cusps': 'Aucune cuspide de maison',

	'Transit aspect summary': 'Résumé des aspects de transits',
	Strongest: 'Le plus fort',
	Natal: 'Natal',
	Transiting: 'Transit',
	Applying: 'Appliquant',
	Separating: 'Séparant',
	strength: 'force',

	'Every body with its natal position and its position on the transit date, each as a zodiac sign and a degree.':
		'Chaque astre avec sa position natale et sa position à la date du transit, chacune indiquée en signe du zodiaque et en degré.',
	'Both house numbers are read against the natal house cusps.':
		'Les deux numéros de maison se lisent sur les cuspides des maisons natales.',
	Body: 'Astre',
	'Natal house': 'Maison natale',
	'Transiting house': 'Maison transitée',

	'Transit readings': 'Interprétations des transits',
	Impact: 'Effets',
	Timing: 'Période',
	Guidance: 'Conseils',
};

registerLocale('fr', fr);
