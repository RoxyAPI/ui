/**
 * Spanish chrome strings.
 *
 * @remarks
 * Importing this module registers the catalogue and re-renders every mounted component, so it is a side-effect entry, exactly like a `components/*` module. It is built to `dist/locales/es.js` and `dist/cdn/locales/es.js` as its OWN payload rather than compiled into the components, so an English site downloads none of it.
 *
 * Keyed by the English source string as it appears at the call site, so this file diffs directly against the component that renders it and no key vocabulary has to be kept in sync with the copy.
 *
 * Regional Spanish resolves here: the registry falls back from `es-AR` to `es`, so a page that carries any Spanish tag reads this catalogue without the site owner naming a variant.
 *
 * **`Natal` is Spanish, not an untranslated fallthrough.** Spanish astrology writes `carta natal`, `planetas natales`, `cúspides de casas natales`; the spelling coincides with English and the word does not.
 *
 * Rejected against sources, so nobody restores them: `Aplicante`/`Separante` for applying and separating (Spanish Wikipedia phrases it that way in passing, but the two astrologer-authored references write `aplicativo`/`separativo`), `Aplicación`/`Separación` (what Astro-Seek prints, and that UI is demonstrably machine-translated on aspect vocabulary: it renders SQUARE as `Cuadrado`, which is not `Cuadratura`), `birrueda` for the bi-wheel (zero attestation, an invention) and `carta superpuesta` for it (attested, but it names the overlay rather than the two-ring structure the inner and outer strings are built on), and `astros` for a body (idiomatic, but this catalogue already spends one word on that concept, `cuerpos`, and both would have to move together).
 *
 * Two entries are the plainest defensible Spanish rather than sourced vocabulary, and are flagged for a bilingual practitioner: `Tiempos` for the timing paragraph, which Spanish astrology writes around rather than naming, and `Casa en tránsito` for the natal house a transiting body is passing through, which Spanish only says as a whole clause. `Casa transitada` is the one defensible alternative for the second and was passed over because it breaks the natal / en tránsito pairing the rest of the card establishes.
 *
 * One structural cost, accepted: entries 16 and 17 sit in front of an API-returned body name, so a tooltip reads `En tránsito Marte cuadratura Natal Venus` where correct Spanish would put the qualifier after the noun. No wording repairs it while the component composes label then body, and both strings do double duty as table column headers, where the order is right.
 */

import type { ChromeString } from '../i18n/chrome-strings.js';
import { registerLocale } from '../i18n/registry.js';

export const es: Record<ChromeString, string> = {
	'Edit query': 'Editar consulta',
	'Spiritual data by RoxyAPI': 'Datos espirituales de RoxyAPI',
	'No data': 'Sin datos',
	Loading: 'Cargando',
	Reading: 'Lectura',

	'Natal chart': 'Carta natal',
	'Relocation chart': 'Carta de relocalización',
	'No chart data': 'Sin datos de la carta',
	Wheel: 'Rueda',
	'Aspect grid': 'Cuadrícula de aspectos',
	'Natal chart views': 'Vistas de la carta natal',
	'Natal chart wheel': 'Rueda de la carta natal',
	'Natal chart wheel with twelve houses, planets, and aspects':
		'Rueda de la carta natal con doce casas, planetas y aspectos',
	'Natal chart wheel with planets and aspects, houses shown as equal sectors from the Ascendant':
		'Rueda de la carta natal con planetas y aspectos, casas mostradas como sectores iguales desde el Ascendente',
	'Equal sectors from the Ascendant, no house cusps in this response':
		'Sectores iguales desde el Ascendente, sin cúspides de casas en esta respuesta',
	'Twelve zodiac sign segments around a circular wheel. Planet glyphs are placed at their ecliptic longitudes. Aspect lines connect related planets.':
		'Doce segmentos de signos zodiacales alrededor de una rueda circular. Los glifos planetarios se ubican en sus longitudes eclípticas. Las líneas de aspecto conectan los planetas relacionados.',
	retrograde: 'retrógrado',

	'{{count}} planets': '{{count}} planetas',
	'{{count}} aspects': '{{count}} aspectos',
	'{{system}} houses': 'casas {{system}}',

	'No planets to grid': 'Sin planetas para la cuadrícula',
	'Planet by planet aspect grid: the aspect each pair of planets forms, read from the planet naming the row across to the planet naming the column.':
		'Cuadrícula planeta por planeta: el aspecto que forma cada par de planetas, leído desde el planeta que nombra la fila hasta el planeta que nombra la columna.',
	orb: 'orbe',

	'Dominant element': 'Elemento dominante',
	'Dominant modality': 'Modalidad dominante',
	Harmonious: 'Armónicos',
	Challenging: 'Tensos',
	Neutral: 'Neutros',
	'All {{count}} bodies in the chart, placed by sign':
		'Los {{count}} cuerpos de la carta, ubicados por signo',
	'Element and modality distribution': 'Distribución por elemento y modalidad',
	Total: 'Total',

	'Chart patterns': 'Configuraciones de la carta',
	Dissociate: 'Disociada',
	'Out of sign: one or more planets sit outside the pattern element or modality, so the theme holds but runs weaker.':
		'Fuera de signo: uno o más planetas quedan fuera del elemento o la modalidad de la configuración, así que el tema se mantiene pero actúa más débil.',
	'{{percent}}% tight': '{{percent}}% de exactitud',
	apex: 'ápice',

	'Planet readings': 'Lecturas planetarias',

	Transits: 'Tránsitos',
	'No transit data': 'Sin datos de tránsitos',
	'Aspects to the natal chart: {{count}}':
		'Aspectos a la carta natal: {{count}}',
	'Natal and transit bi-wheel': 'Rueda doble natal y de tránsitos',
	'Bi-wheel with natal bodies on the inner ring and transiting bodies on the outer ring':
		'Rueda doble con los cuerpos natales en el anillo interior y los cuerpos en tránsito en el anillo exterior',
	'Twelve zodiac sign segments around a circular wheel. Natal bodies sit at their ecliptic longitudes on the inner ring and transiting bodies on the outer ring, and each line joins a transiting body to the natal body it aspects.':
		'Doce segmentos de signos zodiacales alrededor de una rueda circular. Los cuerpos natales se ubican en sus longitudes eclípticas en el anillo interior y los cuerpos en tránsito en el anillo exterior, y cada línea une un cuerpo en tránsito con el cuerpo natal al que aspecta.',

	'{{count}} natal bodies': '{{count}} cuerpos natales',
	'{{count}} transiting bodies': '{{count}} cuerpos en tránsito',
	'Ascendant on the left horizon': 'Ascendente en el horizonte izquierdo',
	'First house cusp on the left horizon':
		'Cúspide de la casa 1 en el horizonte izquierdo',
	'Sign wheel, 0° Aries on the left':
		'Rueda de signos, 0° Aries a la izquierda',
	'House cusps supplied by the page':
		'Cúspides de casas proporcionadas por la página',
	'No house cusps': 'Sin cúspides de casas',

	'Transit aspect summary': 'Resumen de aspectos de tránsito',
	Strongest: 'El más fuerte',
	Natal: 'Natal',
	Transiting: 'En tránsito',
	Applying: 'Aplicativo',
	Separating: 'Separativo',
	strength: 'fuerza',

	'Every body with its natal position and its position on the transit date, each as a zodiac sign and a degree.':
		'Cada cuerpo con su posición natal y su posición en la fecha del tránsito, cada una con su signo zodiacal y su grado.',
	'Both house numbers are read against the natal house cusps.':
		'Los dos números de casa se leen respecto a las cúspides de las casas natales.',
	Body: 'Cuerpo',
	'Natal house': 'Casa natal',
	'Transiting house': 'Casa en tránsito',

	'Transit readings': 'Lecturas de tránsitos',
	Impact: 'Impacto',
	Timing: 'Tiempos',
	Guidance: 'Orientación',
};

registerLocale('es', es);
