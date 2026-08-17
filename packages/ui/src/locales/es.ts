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
 * Every entry below is attested in live Spanish astrology copy rather than machine translated. What follows is the reasoning a maintainer needs; the attestation itself is recorded internally.
 *
 * **`Natal` is Spanish, not an untranslated fallthrough.** Spanish astrology writes `carta natal`, `planetas natales`, `cúspides de casas natales`; the spelling coincides with English and the word does not. `Cardinal` and `Mutable` coincide the same way and are likewise real Spanish.
 *
 * **`Figuras planetarias` replaced `Configuraciones de la carta` on 2026-08-09, and that string is why this file carries so much reasoning.** It back-translated to "chart SETTINGS", so a reader took the block for a preferences panel and went looking for a way to switch it off. The replacement is the class term Spanish uses for exactly our five figures. `Figuras de aspectos` was the runner-up and lost only because this block contains a Stellium, which is a conjunction cluster rather than an aspect figure.
 *
 * **`foco` replaced `ápice` in the same pass.** `ápice` is unattested in Spanish astrology and idiomatically means a shred (`ni un ápice de`). Spanish names this planet `foco`, `punto focal` or `planeta focal`, and `foco` is the only form every source agrees on and the only one that fits the chip.
 *
 * **`Duración` replaced `Tiempos`, and this one is a CONTRACT error rather than a vocabulary one.** The field is not a schedule: the spec says how long the transit influence lasts, and the values are buckets like `Active for a few hours`. `Duración` is also what Spanish astrology calls it, and what `fr.ts` and `pt.ts` were already saying.
 *
 * Rejected, so nobody restores them: `Aplicante`/`Separante` for applying and separating (the astrologer-authored references write `aplicativo`/`separativo`), `Aplicación`/`Separación`, `birrueda` for the bi-wheel (zero attestation, an invention), `carta superpuesta` for it (attested, but it names the overlay rather than the two-ring structure the inner and outer strings are built on), `astros` for a body (idiomatic, but this catalogue already spends `cuerpos` on that concept and both would have to move together), `ápice` for the apex, and `Configuraciones planetarias` for the figures (real Spanish, rejected for keeping the exact `configuración` stem that made the earlier entry misread).
 *
 * One entry is the plainest defensible Spanish rather than sourced vocabulary and is flagged for a bilingual practitioner: `Casa en tránsito` for the natal house a transiting body is passing through, which Spanish only says as a whole clause. `Casa transitada` is the one defensible alternative and was passed over because it breaks the natal / en tránsito pairing the rest of the card establishes.
 *
 * **`Fija` agrees with BOTH the API and the grammar, and the earlier masculine `Fijo` is gone.** Spanish agrees the quality with its head noun, and the head noun here is `la modalidad`, not `el signo`; every source switches to `signos fijos` the moment the head noun changes. The API was corrected first, so the pairing that forced the compromise now holds on the correct word. Note that the header TINT is not what pins them: the grid compares canonical English (`summary.dominantModality`), so what has to agree is the two words a reader sees, not a lookup.
 *
 * `Card` for the cardinal column is ours. Spanish spells all three qualities out in full even in compact side panels, so there is no abbreviation convention to follow; `Fija` and `Mut` are already short enough to need none. The element row labels are never abbreviated: `Aire` and `Agua` collide on their first letter.
 *
 * One structural cost, accepted: two entries sit in front of an API-returned body name, so a tooltip reads `En tránsito Marte cuadratura Natal Venus` where correct Spanish would put the qualifier after the noun. No wording repairs it while the component composes label then body, and both strings do double duty as table column headers, where the order is right.
 *
 * ## Human Design
 *
 * **These 54 labels were sourced before they were written, and the first anchor is the API, not a dictionary.** They print directly above values the Human Design endpoints already return in Spanish, so wherever the API had already spent a word this file spends the same one: `Conciencia` for the awareness chip, `Abierto` for an undefined centre, `Lados de la carta` for the two chart sides, and `Motor`, `Puerta` and `Línea` in the same spellings. Community usage settled only what the API had no word for.
 *
 * **`Bodygraph` is deliberately untranslated, and `Cuerpo gráfico` lost on the API pairing rather than on attestation.** The Spanish term is real and widespread. It still loses, because the prose that renders INSIDE this card says the other one: all nine centre `biology` strings end `y en el bodygraph esta glándula...` and print two rows below the card title. A card headed `Cuerpo gráfico` over a footnote reading `en el bodygraph` names one thing twice on one screen.
 *
 * **`Autoridad`, NOT `Autoridad interna`, and the reason sits in the API value set rather than in the label.** Spanish Human Design says `Autoridad Interna` constantly and the longer form looks like the more careful choice. It is false for two of the seven values this tile can print: our `authorities` map ships `Mental` and `Lunar`, so `Autoridad interna: Mental` would be a label contradicting the word underneath it. `Autoridad` alone is true of all seven.
 *
 * **`Definición` was checked against the failure that produced this file and kept.** It carries the same hazard shape as `Configuraciones`, since Spanish also uses it for picture resolution and for a dictionary gloss, but it is the term the sources use for exactly this field, and the value printed under it is `Simple` or `Dividida` from the API, which no reader mistakes for a resolution. Same reasoning holds for `Firma`, where the pill renders `Firma: Satisfacción` and the value disambiguates in the same glance.
 *
 * `No-Ser` is the printed Spanish, hyphen and capitals included, which is also where `Pregunta del No-Ser` comes from. `Cruz de Encarnación`, `Activaciones`, `Canales definidos`, `Centros definidos / abiertos`, `centros energéticos` and `Hexagrama {{number}} del I Ching` all follow the same settled usage.
 *
 * **`Personalidad` and `Diseño` keep their capitals inside `Línea de Personalidad` and `Línea de Diseño`, and that is a disambiguation, not a style slip.** They are proper Human Design terms and every source capitalises them mid-sentence. Lower-cased, `línea de diseño` reads as a graphic-design line, which is the one wrong reading available on a card that draws a diagram.
 *
 * **`Circuito {{circuit}}` is the attested word order and it happens to agree for free.** `circuito` is masculine, `Colectivo` is already masculine, and `Individual` and `Tribal` are invariable, so no value the API can supply breaks the agreement. English word order (`{{circuit}} circuito`) had no attestation at all.
 *
 * `Base`, `Tono`, `Color` and `Cognición` are the Variables vocabulary. `Color` here is the Human Design layer, never a colour on screen, which is why the two low-confidence notes say `un límite de Color o de Tono` with the capitals: they name the layers the arrow can flip between, not a hue and a pitch.
 *
 * **`Dirección` for the arrow direction survived two better-looking alternatives.** `Sentido` is disqualified by a collision this catalogue cannot afford, since it is also a name for the cognition Variable and would label the row directly below it; `Orientación` is already spent on `Guidance` in this same file. `Dirección` is what the left and right arrows mechanically are, and the row sits with `Color`, `Tono` and `Cognición`, which forecloses the address reading.
 *
 * Six entries match their English source and are correct that way: `Aura`, `Motor`, `Variables`, `Base`, `Color` and `Bodygraph`. None is an untranslated fallthrough, and inventing a Spanish word for any of them would be the error.
 *
 * Four entries are the plainest defensible Spanish rather than sourced vocabulary and want a bilingual practitioner: `En el límite` for the knife-edge warning, deliberately worded off `límite de Color o de Tono` above it so the two agree; `Confianza baja`; `Lados de la carta` for the tab list, where the API's `lado` won because its side descriptions render in the panel underneath; and `Referencia` on the glossary card, which is generic chrome with no Human Design content at all.
 *
 * Rejected here too: `Cuerpo gráfico` for the card title, `Autoridad interna` for the authority tile, `Sentido` and `Orientación` for the arrow direction, `consciencia` for the awareness chip (the API spells it the other way), `sin definir` for an open centre (it contradicts the `abierta` the API prose uses three rows down), and lower-cased `línea de diseño`.
 *
 * ## Monthly ephemeris
 *
 * **`Efemérides` is the Spanish word for the table itself and it is plural even when one table is meant.** The same usage settles `Posiciones diarias`, `Cambios de signo` and the retrograde half.
 *
 * **`Cambios de signo` over `Ingresos`, and the reason is the noun rather than the concept.** `Ingreso` is the technical Spanish and the VERB is used freely, but the noun `ingresos` is what Spanish calls income, so a chip headed with it invites the wrong reading on a card that also shows numbers.
 *
 * `Entra en {{sign}}` is the plainest attested verb, and every Spanish sign name takes `en` with no article and no elision, so the substitution is safe for all twelve. `Retrógrado` follows the entry this file already spends on the word, and `Fecha` is the standard column header on this kind of table.
 *
 * Two of the eight are COMPOSED rather than lifted, because no astrology page publishes an empty state or a screen-reader caption: `Sin datos de efemérides` follows the pattern this file already uses, and the table caption is the transit-table caption above it with the transit clause swapped for the month one. The vocabulary in both is sourced; the sentence frame is judgement.
 *
 * Rejected here too: `Ingresos` for the sign-change section, `entradas de signos`, and `Efeméride` singular, which no Spanish source writes for the table.
 *
 * ## Form group names
 *
 * **`Nacimiento` translates BOTH `Birth Data` and `Birth`, and the shared value is the point rather than a shortcut.** The two are the same real concept under two spec spellings, they never render on one form, and `Datos de nacimiento` fails the slot it has to live in: `Lugar de Datos de nacimiento` stacks two `de` and reads bureaucratic, where `Lugar de Nacimiento` and `Ciudad de Nacimiento` are the standard Spanish. This file already spends one Spanish word on two English keys for `Fixed` and `Fix`.
 *
 * `Persona 1` and `Persona 2` are what live Spanish two-person forms print, and the letter pair is attested Spanish astrology prose rather than an English import. `Tú` and `Tu pareja` were rejected because these forms are also read for parent and child, colleagues and friends. `Relocalización` matches this catalogue's existing `Carta de relocalización`; `Reubicación` and `Destino` are both attested and lost to that internal agreement.
 *
 * **`Pesos por área` is COMPOSED and deliberately drops `Pesos por dominio`.** Spanish calls these categories `áreas de vida`, never `dominios`: `dominio` is mastery, an internet domain or territorial rule. Neither half is invented, but no single source prints the pair, which makes it the weakest entry here.
 *
 * **One accepted cost, flagged for a bilingual pass: the `natalChart` group renders `Lugar de Carta natal`.** It reuses the card heading by design (`lookupKey` folds `Natal Chart` onto `Natal chart`, and a second entry would silently overwrite the heading), but stripped of its article `carta` is a common noun and the phrase can be read as where the chart document is rather than where the chart was cast. There is no one-word repair, because `natal` is adjective-only in Spanish and cannot stand alone. The legend directly above the field prints `Carta natal`, so the referent is on screen.
 */

import type { ChromeString } from '../i18n/chrome-strings.js';
import { registerLocale } from '../i18n/registry.js';
import './field-labels/es.js';

export const es: Record<ChromeString, string> = {
	'Edit query': 'Editar consulta',
	'Spiritual data by RoxyAPI': 'Datos espirituales de RoxyAPI',
	'No data': 'Sin datos',
	Loading: 'Cargando',
	Reading: 'Lectura',

	'Natal chart': 'Carta natal',
	'Relocation chart': 'Carta de relocalización',
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

	'Dominant element': 'Elemento dominante',
	'Dominant modality': 'Modalidad dominante',
	Harmonious: 'Armónicos',
	Challenging: 'Tensos',
	Neutral: 'Neutros',
	'All {{count}} bodies in the chart, placed by sign':
		'Los {{count}} cuerpos de la carta, ubicados por signo',
	'Element and modality distribution':
		'Distribución por elementos y modalidades',
	Total: 'Total',

	Fire: 'Fuego',
	Earth: 'Tierra',
	Air: 'Aire',
	Water: 'Agua',
	Cardinal: 'Cardinal',
	Fixed: 'Fija',
	Mutable: 'Mutable',
	Car: 'Card',
	Fix: 'Fija',
	Mut: 'Mut',

	'Chart patterns': 'Figuras planetarias',
	Dissociate: 'Disociada',
	'Out of sign: one or more planets sit outside the pattern element or modality, so the theme holds but runs weaker.':
		'Fuera de signo: uno o más planetas quedan fuera del elemento o la modalidad de la figura, así que el tema se mantiene pero actúa más débil.',
	'{{percent}} tight': '{{percent}} de exactitud',
	apex: 'foco',

	'Planet readings': 'Lecturas planetarias',

	Transits: 'Tránsitos',
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
	'House cusps from the response':
		'Cúspides de casas incluidas en la respuesta',
	'No house cusps': 'Sin cúspides de casas',

	'Transit aspect summary': 'Resumen de aspectos de tránsito',
	Strongest: 'El más fuerte',
	Natal: 'Natal',
	Transiting: 'En tránsito',
	Applying: 'Aplicativo',
	Separating: 'Separativo',

	'Every body with its natal position and its position on the transit date, each as a zodiac sign and a degree.':
		'Cada cuerpo con su posición natal y su posición en la fecha del tránsito, cada una con su signo zodiacal y su grado.',
	'Both house numbers are read against the natal house cusps.':
		'Los dos números de casa se leen respecto a las cúspides de las casas natales.',
	Body: 'Cuerpo',
	'Natal house': 'Casa natal',
	'Transiting house': 'Casa en tránsito',

	'Transit readings': 'Lecturas de tránsitos',
	Impact: 'Impacto',
	Timing: 'Duración',
	Guidance: 'Orientación',

	Ephemeris: 'Efemérides',
	'Signs in this month': 'Signos de este mes',
	'Sign changes and retrograde periods':
		'Cambios de signo y períodos retrógrados',
	'Daily positions': 'Posiciones diarias',
	Date: 'Fecha',
	'Enters {{sign}} on {{date}}': 'Entra en {{sign}} el {{date}}',
	'Retrograde {{range}}': 'Retrógrado {{range}}',
	'Every body with its position on each day of the month, as a zodiac sign and a degree.':
		'Cada cuerpo con su posición en cada día del mes, con su signo zodiacal y su grado.',

	'Nested data omitted': 'Datos anidados omitidos',
	'Generic data display': 'Visualización de datos genérica',
	'Empty list': 'Lista vacía',
	'Data table': 'Tabla de datos',
	'{{count}} rows': '{{count}} filas',
	Yes: 'Sí',
	No: 'No',
	illustration: 'ilustración',

	Type: 'Tipo',
	Strategy: 'Estrategia',
	Authority: 'Autoridad',
	Profile: 'Perfil',
	Definition: 'Definición',
	Aura: 'Aura',
	'Incarnation cross': 'Cruz de Encarnación',
	'Signature: {{value}}': 'Firma: {{value}}',
	'Not-self: {{value}}': 'No-Ser: {{value}}',
	'Profile {{profile}}': 'Perfil {{profile}}',
	'Line {{line}} · Personality': 'Línea {{line}} · Personalidad',
	'Line {{line}} · Design': 'Línea {{line}} · Diseño',
	Personality: 'Personalidad',
	Design: 'Diseño',

	Bodygraph: 'Bodygraph',
	'Human Design bodygraph': 'Bodygraph de Diseño Humano',
	'Human Design bodygraph with nine centers, channels, and activated gates overlaid on a human silhouette':
		'Bodygraph de Diseño Humano con nueve centros, canales y puertas activadas superpuestos sobre una silueta humana',
	'Nine energy centers in their canonical positions over a human silhouette, each filled with its traditional color when defined and outlined when open, wired by channels between activated gates.':
		'Nueve centros energéticos en sus posiciones canónicas sobre una silueta humana, cada uno relleno con su color tradicional cuando está definido y solo con el contorno cuando está abierto, conectados por canales entre las puertas activadas.',
	'Center colors when defined. Open centers are outlined.':
		'Colores de los centros cuando están definidos. Los centros abiertos se dibujan solo con el contorno.',
	'Open center': 'Centro abierto',
	'Defined channels ({{count}})': 'Canales definidos ({{count}})',
	'{{circuit}} circuit': 'Circuito {{circuit}}',
	'Centers ({{defined}} defined, {{open}} open)':
		'Centros ({{defined}} definidos, {{open}} abiertos)',
	Defined: 'Definido',
	Open: 'Abierto',
	Motor: 'Motor',
	Awareness: 'Conciencia',
	'Not-self question': 'Pregunta del No-Ser',
	Biology: 'Biología',
	'Gates {{gates}}': 'Puertas {{gates}}',
	'Activations ({{count}})': 'Activaciones ({{count}})',
	'Chart sides': 'Lados de la carta',
	'Line {{line}}': 'Línea {{line}}',
	'Gate {{gate}}': 'Puerta {{gate}}',
	'I Ching hexagram {{number}}': 'Hexagrama {{number}} del I Ching',

	'Personality line': 'Línea de Personalidad',
	'Design line': 'Línea de Diseño',
	Lines: 'Líneas',

	Variables: 'Variables',
	'Human Design variables': 'Variables de Diseño Humano',
	'Low confidence: a birth time near a color or tone boundary. Verify the exact birth time.':
		'Confianza baja: una hora de nacimiento cercana a un límite de Color o de Tono. Verifica la hora exacta de nacimiento.',
	'Low confidence: a birth time near a color or tone boundary (within {{margin}}°). Verify the exact birth time.':
		'Confianza baja: una hora de nacimiento cercana a un límite de Color o de Tono (a menos de {{margin}}°). Verifica la hora exacta de nacimiento.',
	'Color {{color}} · Tone {{tone}} · Base {{base}}':
		'Color {{color}} · Tono {{tone}} · Base {{base}}',
	'Knife-edge: could flip with a more precise birth time.':
		'En el límite: podría cambiar con una hora de nacimiento más precisa.',
	Base: 'Base',
	Color: 'Color',
	Tone: 'Tono',
	Direction: 'Dirección',
	Cognition: 'Cognición',

	Reference: 'Referencia',

	// The FORM path (`<roxy-endpoint-form>` and the `<roxy-location-search>` it slots). What a
	// visitor reads BEFORE any card renders. Field labels and enum options are `humanize()` over
	// spec field names and are deliberately absent: no catalogue keyed on English source text can
	// reach a string computed per operation. The GROUP names below are the exception, because the
	// spec has nine of them rather than 909.
	'Birth location': 'Lugar de nacimiento',
	'{{group}} location': 'Lugar de {{group}}',
	'City of birth': 'Ciudad de nacimiento',
	'{{group}} city': 'Ciudad de {{group}}',
	'Person 1': 'Persona 1',
	'Person 2': 'Persona 2',
	'Person A': 'Persona A',
	'Person B': 'Persona B',
	'Birth Data': 'Nacimiento',
	Birth: 'Nacimiento',
	Relocation: 'Relocalización',
	'Domain Weights': 'Pesos por área',
	'Fills {{fields}}. Pick a city to autofill.':
		'Completa {{fields}}. Elige una ciudad para autocompletar.',
	Choose: 'Seleccionar',
	'Comma separated': 'Separados por comas',
	Advanced: 'Avanzado',
	'Please complete:': 'Completa:',
	'Search city': 'Buscar ciudad',
	'No cities found': 'Sin ciudades',
	Compare: 'Comparar',
	Cast: 'Tirar',
	'Get reading': 'Obtener lectura',
	Generate: 'Generar',
	'Schema load failed: {{message}}': 'Error al cargar el esquema: {{message}}',
	'Endpoint {{method}} {{path}} not found in OpenAPI spec':
		'Endpoint {{method}} {{path}} no encontrado en la especificación OpenAPI',
	'HTTP error {{status}}': 'Error HTTP {{status}}',
	Retry: 'Reintentar',
	'Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side.':
		'Los componentes del lado del cliente solo aceptan una clave publicable pk_. Usa una clave publicable con una lista de orígenes permitidos, o renderiza en el servidor.',
	Severity: 'Gravedad',
	Remedies: 'Remedios',
	Exceptions: 'Excepciones',
	'Dream symbol': 'Símbolo onírico',
	'Dream symbols': 'Símbolos oníricos',
	'{{count}} matches': '{{count}} coincidencias',
	Hora: 'Hora',
	'Hora periods': 'Horas planetarias',
	'Vedic kundli': 'Carta védica',
	'Vedic birth chart with twelve sign houses':
		'Carta natal védica con doce casas por signo',
	'Angel number': 'Número angelical',
	'Digit root': 'Raíz digital',
	'Action steps': 'Pasos a seguir',
	Colors: 'Colores',
	Keywords: 'Palabras clave',
	'Pairs with': 'Combina con',
	Vargottama: 'Vargottama',
	'Vargottama planets': 'Planetas vargottama',
	'{{chart}} divisional chart with twelve sign houses':
		'Carta divisional {{chart}} con doce casas por signo',
	'Sidereal frame: {{frame}}': 'Marco sideral: {{frame}}',
	'Sidereal frame: {{frame}}, {{degrees}}° subtracted':
		'Marco sideral: {{frame}}, {{degrees}}° restados',
	Day: 'Día',
	Night: 'Noche',
	Planet: 'Planeta',
	Hardness: 'Dureza',
	Vibration: 'Vibración',
	Birthstone: 'Piedra de nacimiento',
	Chakras: 'Chakras',
	Zodiac: 'Signo zodiacal',
	Elements: 'Elementos',
	Spiritual: 'Espiritual',
	Emotional: 'Emocional',
	Physical: 'Físico',
	Master: 'Maestro',
	'Master number': 'Número maestro',
	'Birth day profile': 'Perfil del día de nacimiento',
	'Lucky associations': 'Asociaciones de suerte',
	Missing: 'Ausente',
	'No numbers are missing from the birth name.':
		'No falta ningún número en el nombre de nacimiento.',
	'How to overcome': 'Cómo superarlo',
	'Karmic lessons': 'Lecciones kármicas',
	Debt: 'Deuda',
	Challenge: 'Desafío',
	Resolution: 'Resolución',
	'Karmic debt': 'Deuda kármica',
	'Personal year': 'Año personal',
	Pinnacles: 'Pináculos',
	Lesson: 'Lección',
	Challenges: 'Desafíos',
	'Name numbers': 'Números del nombre',
	'Name letters': 'Letras del nombre',
	'Personal month': 'Mes personal',
	'Calendar month': 'Mes calendario',
	Maturity: 'Madurez',
	'Current age': 'Edad actual',
	Activates: 'Activa',
	Element: 'Elemento',
	'Ruling planet': 'Planeta regente',
	Gemstones: 'Gemas',
	Compatible: 'Compatible',
	Incompatible: 'Incompatible',
	'Life Path': 'Camino de vida',
	Expression: 'Número de expresión',
	'Soul Urge': 'Impulso del alma',
	'Birth Day': 'Número de nacimiento',
	'Daily Number': 'Número diario',
	'Personal Day': 'Día personal',
	'Numerology chart': 'Carta numerológica',
	Panchang: 'Panchang',
	'Auspicious muhurtas': 'Muhurtas auspiciosos',
	'Inauspicious periods': 'Periodos inauspiciosos',
	'Next transitions': 'Próximas transiciones',
	'None today': 'Ninguno hoy',
	'Bhadra (Vishti)': 'Bhadra (Vishti)',
	Panchaka: 'Panchaka',
	'Favorable Moon signs': 'Signos lunares favorables',
	'Favorable birth nakshatras': 'Nakshatras de nacimiento favorables',
	'Unfavorable birth nakshatras': 'Nakshatras de nacimiento desfavorables',
	'Chandrabalam and Tarabalam': 'Chandrabalam y Tarabalam',
	None: 'Ninguno',
	'Moon sign': 'Signo lunar',
	'Sun sign': 'Signo solar',
	'Sun nakshatra': 'Nakshatra solar',
	'Amrit Kalam': 'Amrit Kalam',
	'Dur Muhurta': 'Dur Muhurta',
	Varjyam: 'Varjyam',
	Sunrise: 'Amanecer',
	Sunset: 'Atardecer',
	Moonrise: 'Salida de la Luna',
	Moonset: 'Puesta de la Luna',
	Sun: 'Sol',
	Moon: 'Luna',
	'Ashtama Chandra rashi': 'Ashtama Chandra rashi',
	'{{sign}} until {{time}}': '{{sign}} hasta {{time}}',
	'{{sign}} until {{time}}, then {{next}}':
		'{{sign}} hasta {{time}}, luego {{next}}',
	'{{range}} (ends {{date}})': '{{range}} (termina {{date}})',
	Tithi: 'Tithi',
	Nakshatra: 'Nakshatra',
	Yoga: 'Yoga',
	Karana: 'Karana',
	'ends {{time}}': 'termina {{time}}',
	'ends {{time}} to {{next}}': 'termina {{time}}, luego {{next}}',
	'ends {{time}} to {{next}} pada {{pada}}':
		'termina {{time}}, luego {{next}} pada {{pada}}',
	Strengths: 'Fortalezas',
	'Key aspects': 'Aspectos clave',
	'Aspect breakdown': 'Balance de aspectos',
	'Element balance': 'Balance de elementos',
	'Forecast digest': 'Resumen de pronóstico',
	'No notable events.': 'Sin eventos destacados.',
	'{{count}} events': '{{count}} eventos',
	'significance {{value}} of 100': 'significancia {{value}} de 100',
	'I Ching hexagram': 'Hexagrama del I Ching',
	Position: 'Posición',
	House: 'Casa',
	Motion: 'Movimiento',
	Formula: 'Fórmula',
	'°/day': '°/día',
	'Tarot spread': 'Tirada de tarot',
	'(reversed)': '(invertida)',
	'{{arcana}} arcana': 'Arcanos {{arcana}}',
	Upper: 'Superior',
	Lower: 'Inferior',
	'Changing lines: {{lines}}.': 'Líneas mutantes: {{lines}}.',
	'Becomes hexagram {{number}} {{name}}.':
		'Se convierte en el hexagrama {{number}} {{name}}.',
	'{{chakra}} chakra crystals': 'Cristales del chakra {{chakra}}',
	'{{element}} element crystals': 'Cristales del elemento {{element}}',
	'Crystals for {{sign}}': 'Cristales para {{sign}}',
	'{{month}} birthstones': 'Piedras de nacimiento de {{month}}',
	Crystals: 'Cristales',
	'Forecast timeline': 'Línea de tiempo del pronóstico',
	'No events in this window': 'Sin eventos en este periodo',
	'orb {{value}}°': 'orbe {{value}}°',
	'Guna Milan score': 'Puntuación de Guna Milan',
	Koota: 'Koota',
	Progress: 'Progreso',
	Score: 'Puntos',
	'{{dosha}} cancelled': '{{dosha}} cancelado',
	'Moon phase calendar': 'Calendario de fases lunares',
	'Current moon phase': 'Fase lunar actual',
	Illumination: 'Iluminación',
	Age: 'Edad',
	Sign: 'Signo',
	Distance: 'Distancia',
	'{{count}} days': '{{count}} días',
	'{{value}}k km': '{{value}} mil km',
	'Annual profection': 'Profección anual',
	For: 'Para',
	'Lord of the year': 'Señor del año',
	'What changes at this location': 'Qué cambia en este lugar',
	'Angular planets here': 'Planetas angulares aquí',
	'Planets that change house': 'Planetas que cambian de casa',
	'No planet changes house at this location.':
		'Ningún planeta cambia de casa en este lugar.',
	'Guna Milan breakdown: each koota with the classification of person 1 and person 2, and the score it earned out of its maximum.':
		'Desglose de Guna Milan: cada koota con la clasificación de la persona 1 y la persona 2 y los puntos obtenidos sobre el máximo.',
	'{{sign}} · house {{house}}': '{{sign}} · casa {{house}}',
	'{{planet}}: house {{from}} to {{to}}': '{{planet}}: casa {{from}} a {{to}}',
	ASC: 'ASC',
	DSC: 'DSC',
	MC: 'MC',
	IC: 'IC',
	PoF: 'PdF',
	Vtx: 'Vtx',
	'Kundli style': 'Estilo de kundli',
	North: 'Norte',
	South: 'Sur',
	East: 'Este',
	'in {{sign}}': 'en {{sign}}',
	'pada {{n}}': 'pada {{n}}',
	Vara: 'Vara',
	'Tarot card': 'Carta de tarot',
	Upright: 'Al derecho',
	Reversed: 'Invertida',
	'Card orientation': 'Orientación de la carta',
	Cornerstone: 'Piedra angular',
	Capstone: 'Piedra clave',
	'First vowel': 'Primera vocal',
	'Core numbers': 'Números centrales',
	Lessons: 'Lecciones',
	Debts: 'Deudas',
	'Life phases': 'Fases de la vida',
	'Obstacle periods': 'Periodos de obstáculos',
	'Letter analysis': 'Análisis de letras',
	Opportunities: 'Oportunidades',
	Asteroids: 'Asteroides',
	Houses: 'Casas',
	'Black Moon Lilith': 'Luna Negra Lilith',
	'{{variant}} apogee': 'Apogeo {{variant}}',
	'Solar arc directions': 'Direcciones de arco solar',
	Arc: 'Arco',
	'Directed to': 'Dirigido a',
	'Arabic lots': 'Partes árabes',
	Sect: 'Secta',
	Ascendant: 'Ascendente',
	Midheaven: 'Mediocielo',
	'Secondary progressions': 'Progresiones secundarias',
	'Progressed to': 'Progresado a',
	Elapsed: 'Transcurrido',
	'{{years}} yrs': '{{years}} años',
	Biblical: 'Bíblico',
	Shadow: 'Sombra',
	Readings: 'Lecturas',
	Advisories: 'Avisos',
	'Sign compatibility': 'Compatibilidad de signos',
	Breakdown: 'Desglose',
	'Changing lines': 'Líneas mutantes',
	Dynamics: 'Dinámicas',
	Love: 'Amor',
	Career: 'Carrera',
	Money: 'Dinero',
	'Twin flame': 'Llama gemela',
	'Western planetary positions': 'Posiciones planetarias occidentales',
	'Planetary positions': 'Posiciones planetarias',
	'Western planetary positions: each body with its sign, degree, house and motion.':
		'Posiciones planetarias occidentales: cada cuerpo con su signo, grado, casa y movimiento.',
	Degree: 'Grado',
	'Vedic aspects': 'Aspectos védicos',
	'Chart time {{when}}': 'Hora de la carta {{when}}',
	'Sidereal positions': 'Posiciones siderales',
	'Mutual aspects': 'Aspectos mutuos',
	'Vedic planetary aspects: aspecting planet, aspect type, aspected planet, strength and orb.':
		'Aspectos planetarios védicos: planeta que aspecta, tipo de aspecto, planeta aspectado, fuerza y orbe.',
	From: 'Desde',
	Aspect: 'Aspecto',
	To: 'Hacia',
	Strength: 'Fuerza',
	Orb: 'Orbe',
	'Upagraha positions': 'Posiciones de los upagrahas',
	Upagrahas: 'Upagrahas',
	Upagraha: 'Upagraha',
	'{{group}} upagrahas: each sub-planet with its rashi, degree in sign, sidereal longitude, and nakshatra with pada.':
		'Upagrahas {{group}}: cada subplaneta con su rashi, grado en el signo, longitud sideral y nakshatra con pada.',
	'Time based': 'Basados en el tiempo',
	'From the eightfold division of the day or night, so these depend on the birth time, the place and the weekday.':
		'De la división en ocho partes del día o de la noche, por lo que dependen de la hora de nacimiento, el lugar y el día de la semana.',
	'Sun based': 'Basados en el Sol',
	'The Dhuma group, derived by fixed arc from the Sun. Dhuma is the Sun plus 133 degrees 20 minutes, and each of the rest follows from the one before it.':
		'El grupo Dhuma, derivado por arco fijo desde el Sol. Dhuma es el Sol más 133 grados 20 minutos, y cada uno de los demás se deriva del anterior.',
	Rashi: 'Rashi',
	Longitude: 'Longitud',
	Pada: 'Pada',
	'Nakshatra {{name}}': 'Nakshatra {{name}}',
	'Nakshatra {{number}} of 27': 'Nakshatra {{number}} de 27',
	Lord: 'Regente',
	Deity: 'Deidad',
	Symbol: 'Símbolo',
	Characteristics: 'Características',
	'Mantras:': 'Mantras:',
	'Gemstones:': 'Gemas:',
	'Rituals:': 'Rituales:',
	N: 'N',
	NE: 'NE',
	E: 'E',
	SE: 'SE',
	S: 'S',
	SW: 'SO',
	W: 'O',
	NW: 'NO',
	'Local space': 'Espacio local',
	'Local space compass': 'Brújula de espacio local',
	'Local space compass of planetary directions from the birthplace':
		'Brújula de espacio local con las direcciones planetarias desde el lugar de nacimiento',
	'A compass centered on the birthplace. Each body is a line pointing to its azimuth, clockwise from north. Bodies below the horizon are dimmed.':
		'Una brújula centrada en el lugar de nacimiento. Cada cuerpo es una línea que apunta a su acimut, en sentido horario desde el norte. Los cuerpos bajo el horizonte se atenúan.',
	'Local space directions: each body with its compass direction, azimuth, altitude and whether it sits above or below the horizon.':
		'Direcciones de espacio local: cada cuerpo con su dirección, acimut, altura y si está sobre o bajo el horizonte.',
	'{{planet}} {{direction}} {{azimuth}}° altitude {{altitude}}':
		'{{planet}} {{direction}} {{azimuth}}° altura {{altitude}}',
	Azimuth: 'Acimut',
	Altitude: 'Altura',
	Horizon: 'Horizonte',
	Astrocartography: 'Astrocartografía',
	'Astrocartography world map': 'Mapamundi de astrocartografía',
	'World map of planetary astrocartography lines':
		'Mapamundi de las líneas planetarias de astrocartografía',
	'Equirectangular world map. Each body has a Midheaven and Imum Coeli meridian and a curved Ascendant and Descendant line, colored per body.':
		'Mapamundi equirrectangular. Cada cuerpo tiene un meridiano de Mediocielo y Fondocielo y una línea curva de Ascendente y Descendente, coloreada por cuerpo.',
	Birthplace: 'Lugar de nacimiento',
	'{{planet}} {{angle}} line': 'Línea {{angle}} de {{planet}}',
	'Solid lines are the Ascendant and Midheaven, dashed are the Descendant and IC.':
		'Las líneas continuas son el Ascendente y el Mediocielo, las discontinuas el Descendente y el Fondocielo.',
	'Planetary lines': 'Líneas planetarias',
	Choghadiya: 'Choghadiya',
	'Day muhurta periods': 'Periodos muhurta del día',
	'Daytime choghadiya': 'Choghadiya diurno',
	'No daytime periods': 'Sin periodos diurnos',
	'Night muhurta periods': 'Periodos muhurta de la noche',
	'Nighttime choghadiya': 'Choghadiya nocturno',
	'No nighttime periods': 'Sin periodos nocturnos',
	Now: 'Ahora',
	'Time range': 'Intervalo horario',
	'Impact:': 'Impacto:',
	'Timing:': 'Duración:',
	'Guidance:': 'Consejo:',
	'Chara karakas': 'Chara karakas',
	Atmakaraka: 'Atmakaraka',
	Darakaraka: 'Darakaraka',
	'Chara karakas in descending rank: each office, the graha holding it, its rashi, the degree it holds, the degree that earned the office, and what the office is read for.':
		'Chara karakas en rango descendente: cada cargo, el graha que lo ocupa, su rashi, el grado que ocupa, el grado que le valió el cargo y para qué se lee.',
	Office: 'Cargo',
	Graha: 'Graha',
	'Ranked on': 'Ordenado por',
	'Read for': 'Se lee para',
	'measured from the end of the sign': 'medido desde el final del signo',
	'Heliacal visibility': 'Visibilidad heliacal',
	'Heliacal rising and setting': 'Orto y ocaso heliacal',
	'Whether each graha stands far enough from the Sun to be seen, for {{date}}. The Sun and the nodes never appear here: they have no heliacal event.':
		'Si cada graha está lo bastante lejos del Sol para verse, para {{date}}. El Sol y los nodos nunca aparecen aquí: no tienen evento heliacal.',
	Visible: 'Visible',
	Invisible: 'Invisible',
	rises: 'sale',
	sets: 'se pone',
	Rose: 'Salió',
	Set: 'Se puso',
	'in the east': 'por el este',
	'in the west': 'por el oeste',
	'Visible until it {{event}} {{where}} on {{when}}':
		'Visible hasta que {{event}} {{where}} el {{when}}',
	'Invisible until it {{event}} {{where}} on {{when}}':
		'Invisible hasta que {{event}} {{where}} el {{when}}',
	'{{event}} {{where}} on {{when}}, with no further event inside the search window':
		'{{event}} {{where}} el {{when}}, sin más eventos dentro de la ventana de búsqueda',
	'No rising or setting inside the search window, which is normal for a graha far from the Sun':
		'Sin orto ni ocaso dentro de la ventana de búsqueda, lo que es normal en un graha lejos del Sol',
	'{{degrees}}° of time from the Sun against a limit of {{limit}}°':
		'{{degrees}}° de tiempo desde el Sol frente a un límite de {{limit}}°',
	'{{degrees}}° of time from the Sun against a limit of {{limit}}°, becoming {{shifted}}° at that event':
		'{{degrees}}° de tiempo desde el Sol frente a un límite de {{limit}}°, que pasa a {{shifted}}° en ese evento',
	'a morning graha, read before sunrise':
		'un graha matutino, se lee antes del amanecer',
	'an evening graha, read after sunset':
		'un graha vespertino, se lee tras el ocaso',
	Aspects: 'Aspectos',
	'Aspect list': 'Lista de aspectos',
	'Aspect summary': 'Resumen de aspectos',
	Patterns: 'Figuras',
	'{{status}} · orb {{orb}}° · str {{strength}}':
		'{{status}} · orbe {{orb}}° · fuerza {{strength}}',
	'Number analysis': 'Análisis del número',
	'{{count}} digits': '{{count}} dígitos',
	'{{count}} unique': '{{count}} únicos',
	'Digit root {{n}}': 'Raíz digital {{n}}',
	Palindrome: 'Palíndromo',
	Repeating: 'Repetido',
	'Positive energy': 'Energía positiva',
	'Neutral energy': 'Energía neutra',
	'Cautionary energy': 'Energía de advertencia',
	'Where you saw it': 'Dónde la viste',
	'Known angel number': 'Número de ángel conocido',
	'What to do next': 'Qué hacer ahora',
	'Foundational digit root': 'Raíz digital de base',
	'Foundational digit root ({{n}})': 'Raíz digital de base ({{n}})',
	'Aspect patterns': 'Figuras de aspectos',
	Above: 'Sobre el horizonte',
	Below: 'Bajo el horizonte',
	Active: 'Activo',
	'Not yet active': 'Aún no activo',
	Present: 'Presente',
	Absent: 'Ausente',
	'Current phase': 'Fase actual',
	'Not compatible': 'No compatible',
	'Ascendant moves to {{sign}}': 'El Ascendente pasa a {{sign}}',
	'Ascendant stays in {{sign}}': 'El Ascendente sigue en {{sign}}',
	'Ascendant changes sign': 'El Ascendente cambia de signo',
	'Ascendant keeps its sign': 'El Ascendente mantiene su signo',
	'Bhav Chalit': 'Bhav Chalit',
	'No graha changes house. The Rashi chart and the Chalit chart agree, which is a normal result rather than a missing reading.':
		'Ningún graha cambia de casa. La carta Rashi y la carta Chalit coinciden, lo que es un resultado normal y no una lectura faltante.',
	'{{count}} of {{total}} grahas change house between the Rashi chart and the unequal Sripati cusps.':
		'{{count}} de {{total}} grahas cambian de casa entre la carta Rashi y las cúspides desiguales de Sripati.',
	'house {{from}} in the Rashi chart, house {{to}} here':
		'casa {{from}} en la carta Rashi, casa {{to}} aquí',
	'Bhava cusps and occupants': 'Cúspides de bhava y ocupantes',
	Bhava: 'Bhava',
	Start: 'Inicio',
	Madhya: 'Madhya',
	End: 'Fin',
	Span: 'Amplitud',
	Grahas: 'Grahas',
	'Fixed stars': 'Estrellas fijas',
	'Conjunctions to the chart': 'Conjunciones con la carta',
	'{{point}} conjunct {{star}}': '{{point}} en conjunción con {{star}}',
	'No star sits within the orb of a natal point.':
		'Ninguna estrella queda dentro del orbe de un punto natal.',
	'Star catalog ({{count}})': 'Catálogo de estrellas ({{count}})',
	'Precessed positions for the chart date':
		'Posiciones precesadas para la fecha de la carta',
	Star: 'Estrella',
	Mag: 'Mag',
	Nature: 'Naturaleza',
	Bhavadhipati: 'Bhavadhipati',
	Dig: 'Dig',
	Drishti: 'Drishti',
	Sthana: 'Sthana',
	Kala: 'Kala',
	Chesta: 'Chesta',
	Naisargika: 'Naisargika',
	Drik: 'Drik',
	'Bhava Bala': 'Bhava Bala',
	'Twelve houses ranked by strength': 'Doce casas ordenadas por fuerza',
	'Twelve houses ranked by strength on the {{system}} frame':
		'Doce casas ordenadas por fuerza en el sistema {{system}}',
	'Component legend': 'Leyenda de componentes',
	'{{component}} Bala': '{{component}} Bala',
	'lord {{graha}}': 'regente {{graha}}',
	'{{value}} rupas': '{{value}} rupas',
	'Bhava Bala {{value}} virupas': 'Bhava Bala {{value}} virupas',
	'{{component}} {{value}} virupas': '{{component}} {{value}} virupas',
	Shadbala: 'Shadbala',
	'Shadbala planetary strength': 'Fuerza planetaria Shadbala',
	'{{count}} planets ranked by strength':
		'{{count}} planetas ordenados por fuerza',
	'Planet strength bars': 'Barras de fuerza planetaria',
	'Strength component legend': 'Leyenda de componentes de fuerza',
	'Ishta Phala is the capacity to give benefic results, Kashta Phala the capacity to give malefic ones. Both are in virupas and are read together, since a planet can be strong and still deliver hardship.':
		'Ishta Phala es la capacidad de dar resultados benéficos, Kashta Phala la de dar resultados maléficos. Ambos van en virupas y se leen juntos, porque un planeta puede ser fuerte y aun así traer dureza.',
	'{{planet}} Shadbala': '{{planet}} Shadbala',
	'rank {{n}}': 'puesto {{n}}',
	'Strength components for {{planet}}': 'Componentes de fuerza de {{planet}}',
	'Ishta Phala {{ishta}}, Kashta Phala {{kashta}} virupas':
		'Ishta Phala {{ishta}}, Kashta Phala {{kashta}} virupas',
	'Ishta {{value}}': 'Ishta {{value}}',
	'Kashta {{value}}': 'Kashta {{value}}',
	'House {{n}}': 'Casa {{n}}',
	Positions: 'Posiciones',
	'Aspects ({{count}})': 'Aspectos ({{count}})',
	'Transit views': 'Vistas de tránsitos',
	'Transit aspects': 'Aspectos de tránsito',
	Speed: 'Velocidad',
	Gochara: 'Gochara',
	'Gochara transits': 'Tránsitos gochara',
	'Where each graha transits at {{when}}, read against the natal chart of {{birth}}.':
		'Dónde transita cada graha el {{when}}, leído frente a la carta natal del {{birth}}.',
	'Key transits': 'Tránsitos clave',
	'natal house {{n}}': 'casa natal {{n}}',
	'{{aspect}} natal {{planet}}': '{{aspect}} con {{planet}} natal',
	'{{aspect}} natal {{planet}} ({{orb}}°)':
		'{{aspect}} con {{planet}} natal ({{orb}}°)',
	'Kaksha {{n}} of {{total}}': 'Kaksha {{n}} de {{total}}',
	'Kaksha {{n}} of {{total}} within the current sign':
		'Kaksha {{n}} de {{total}} dentro del signo actual',
	'Kaksha {{n}} of {{total}}, ruled by {{graha}}':
		'Kaksha {{n}} de {{total}}, regida por {{graha}}',
	'Kaksha {{n}} of {{total}}, spanning {{start}}° to {{end}}° of the sign':
		'Kaksha {{n}} de {{total}}, de {{start}}° a {{end}}° del signo',
	'Kaksha {{n}} of {{total}}, ruled by {{graha}}, spanning {{start}}° to {{end}}° of the sign':
		'Kaksha {{n}} de {{total}}, regida por {{graha}}, de {{start}}° a {{end}}° del signo',
	'this kaksha lord gave bindu': 'este regente de kaksha dio bindu',
	'this kaksha lord gave no bindu': 'este regente de kaksha no dio bindu',
	'this kaksha lord gave bindu, {{count}} of {{total}} in this sign':
		'este regente de kaksha dio bindu, {{count}} de {{total}} en este signo',
	'this kaksha lord gave no bindu, {{count}} of {{total}} in this sign':
		'este regente de kaksha no dio bindu, {{count}} de {{total}} en este signo',
	'Transiting planets: each planet with its current sign, degree and daily speed.':
		'Planetas en tránsito: cada planeta con su signo actual, grado y movimiento diario.',
	'Energy {{value}}/10': 'Energía {{value}}/10',
	'Energy {{value}} of 10': 'Energía {{value}} de 10',
	Health: 'Salud',
	Finance: 'Finanzas',
	Advice: 'Consejo',
	'Lucky number': 'Número de la suerte',
	'Lucky numbers': 'Números de la suerte',
	'Lucky color': 'Color de la suerte',
	'Lucky days': 'Días de suerte',
	'Best with': 'Mejor con',
	Phase: 'Fase',
	'Active transits': 'Tránsitos activos',
	'Week by week': 'Semana a semana',
	'Week {{n}}': 'Semana {{n}}',
	'Key dates': 'Fechas clave',
	'Arudha padas': 'Arudha padas',
	Moved: 'Desplazado',
	'marks a pada that fell in its own bhava or the seventh from it and was moved to the tenth from there, as the classical rule requires. {{count}} of {{total}} padas here.':
		'señala un pada que caía en su propio bhava o en el séptimo desde él y fue desplazado al décimo desde ahí, como exige la regla clásica. Aquí {{count}} de {{total}} padas.',
	'The twelve Arudha padas: each pada with its bhava, the bhava sign and its lord, the sign the lord occupies, the sign the pada falls in, which house from the Lagna that is, whether the classical exception was applied, and what the pada is read for.':
		'Los doce Arudha padas: cada pada con su bhava, el signo del bhava y su regente, el signo que ocupa el regente, el signo en que cae el pada, qué casa desde el Lagna es, si se aplicó la excepción clásica, y para qué se lee el pada.',
	'Bhava rashi': 'Rashi del bhava',
	'Lord rashi': 'Rashi del regente',
	'Pada rashi': 'Rashi del pada',
	'From Lagna': 'Desde el Lagna',
	Lagna: 'Lagna',
	'Arudha Lagna': 'Arudha Lagna',
	Upapada: 'Upapada',
	Mahadasha: 'Mahadasha',
	Antardasha: 'Antardasha',
	Pratyantardasha: 'Pratyantardasha',
	Sookshma: 'Sookshma',
	Prana: 'Prana',
	'Dasha timeline': 'Línea temporal de dashas',
	Timeline: 'Línea temporal',
	'Chart details': 'Detalles de la carta',
	'Dasha views': 'Vistas de dashas',
	'Vimshottari Mahadasha': 'Mahadasha Vimshottari',
	'Active dashas': 'Dashas activas',
	'{{level}} periods in {{planet}} {{parent}}':
		'Periodos {{level}} en {{planet}} {{parent}}',
	'{{planet}} {{level}}': '{{planet}} {{level}}',
	'Inside the {{planet}} {{level}}{{span}}{{duration}}.':
		'Dentro de la {{level}} de {{planet}}{{span}}{{duration}}.',
	'It began {{date}}, before birth, so only the sub-periods running after the birth date are listed.':
		'Comenzó el {{date}}, antes del nacimiento, por eso solo se listan los subperiodos posteriores a la fecha de nacimiento.',
	'Moon nakshatra: {{name}}': 'Nakshatra de la Luna: {{name}}',
	'Moon nakshatra: {{name}} (lord {{lord}})':
		'Nakshatra de la Luna: {{name}} (regente {{lord}})',
	'{{balance}} left': 'quedan {{balance}}',
	'Signifies {{houses}}': 'Significa {{houses}}',
	Biorhythm: 'Biorritmo',
	'Daily biorhythm': 'Biorritmo diario',
	'Biorhythm forecast': 'Pronóstico de biorritmo',
	Forecast: 'Pronóstico',
	'No forecast': 'Sin pronóstico',
	'Biorhythm cycle lines across the forecast window':
		'Líneas de los ciclos de biorritmo en la ventana de pronóstico',
	'Spotlight cycle': 'Ciclo destacado',
	'critical day': 'día crítico',
	'Critical days': 'Días críticos',
	'Two or more cycles cross zero on {{dates}}. Take extra care on these dates.':
		'Dos o más ciclos cruzan el cero el {{dates}}. Conviene extremar el cuidado esos días.',
	'Best day': 'Mejor día',
	'Worst day': 'Peor día',
	'Average energy': 'Energía media',
	Events: 'Eventos',
	'Double days': 'Días dobles',
	'Triple day': 'Día triple',
	'Readings ({{count}})': 'Lecturas ({{count}})',
	Intellectual: 'Intelectual',
	Intuitive: 'Intuitivo',
	'Vedic planetary positions': 'Posiciones planetarias védicas',
	'Vedic planetary positions: each graha with its rashi, degree, nakshatra, pada, nakshatra lord, house, its state in all three avastha systems, and retrograde state. Jagradadi and Deeptadi are read from sign dignity, which the nodes and the Lagna do not have, so those two cells are blank on the Rahu, Ketu and Lagna rows. Uranus, Neptune and Pluto appear only when asked for and rule no sign, so every avastha and house cell is blank on their rows too.':
		'Posiciones planetarias védicas: cada graha con su rashi, grado, nakshatra, pada, regente del nakshatra, casa, su estado en los tres sistemas de avastha y la retrogradación. Jagradadi y Deeptadi se leen de la dignidad por signo, que los nodos y el Lagna no tienen, por eso esas dos celdas quedan vacías en las filas de Rahu, Ketu y Lagna. Urano, Neptuno y Plutón solo aparecen si se piden y no rigen ningún signo, por eso en sus filas quedan vacías todas las celdas de avastha y de casa.',
	'Nak. lord': 'Regente nak.',
	Baladi: 'Baladi',
	Jagradadi: 'Jagradadi',
	Deeptadi: 'Deeptadi',
	'Baladi: the five age states, set by degree within the sign':
		'Baladi: los cinco estados de edad, según el grado dentro del signo',
	'Jagradadi: the three waking states, set by sign dignity. The seven classical grahas only':
		'Jagradadi: los tres estados de vigilia, según la dignidad por signo. Solo los siete grahas clásicos',
	'Deeptadi: the nine dispositional states, set by sign dignity. The seven classical grahas only':
		'Deeptadi: los nueve estados de disposición, según la dignidad por signo. Solo los siete grahas clásicos',
	Retro: 'Retro',
	'Combust grahas': 'Grahas combustos',
	'{{distance}} deg from Sun, within {{orb}} deg orb':
		'{{distance}} grados del Sol, dentro de un orbe de {{orb}} grados',
	'Planetary wars': 'Guerras planetarias',
	'{{first}} vs {{second}}': '{{first}} contra {{second}}',
	'{{distance}} deg apart': '{{distance}} grados de separación',
	'{{graha}} wins': 'gana {{graha}}',
	Interpretations: 'Interpretaciones',
	'Rashi.': 'Rashi.',
	'Nakshatra.': 'Nakshatra.',
	'Bhava significations': 'Significaciones de los bhavas',
	Yogas: 'Yogas',
	Ashtakavarga: 'Ashtakavarga',
	'Ashtakavarga grid': 'Cuadrícula de ashtakavarga',
	'Ashtakavarga views': 'Vistas de ashtakavarga',
	Sarvashtakavarga: 'Sarvashtakavarga',
	Bhinnashtakavarga: 'Bhinnashtakavarga',
	Reduced: 'Reducido',
	'Reduced SAV': 'SAV reducido',
	'Shodhya Pinda': 'Shodhya Pinda',
	'{{count}} signs': '{{count}} signos',
	'Fewer bindus': 'Menos bindus',
	'More bindus': 'Más bindus',
	Bindus: 'Bindus',
	'Rashi Pinda': 'Rashi Pinda',
	'Graha Pinda': 'Graha Pinda',
	'No sarvashtakavarga data': 'Sin datos de sarvashtakavarga',
	'No bhinnashtakavarga data': 'Sin datos de bhinnashtakavarga',
	'No reduced ashtakavarga data': 'Sin datos de ashtakavarga reducido',
	'No bindu data': 'Sin datos de bindus',
	'No shodhya pinda data': 'Sin datos de shodhya pinda',
	'Sarvashtakavarga: each of the twelve signs and the bindus all planets contribute to it, with a grand total.':
		'Sarvashtakavarga: cada uno de los doce signos y los bindus que todos los planetas le aportan, con un total general.',
	'Shodhya Pinda: each planet with its Rashi Pinda, Graha Pinda and Shodhya Pinda strength scores.':
		'Shodhya Pinda: cada planeta con sus puntuaciones de fuerza de Rashi Pinda, Graha Pinda y Shodhya Pinda.',
	'Detected yogas': 'Yogas detectados',
	'Yoga catalog': 'Catálogo de yogas',
	'Yoga results': 'Resultados de yogas',
	'No yoga data': 'Sin datos de yogas',
	'No yogas match your search.': 'Ningún yoga coincide con tu búsqueda.',
	'Filter yogas...': 'Filtrar yogas...',
	'Filter detected yogas by name': 'Filtrar por nombre los yogas detectados',
	'Filter yoga list by name': 'Filtrar la lista de yogas por nombre',
	'{{count}} of {{total}} present': '{{count}} de {{total}} presentes',
	'{{count}} total': '{{count}} en total',
	'Classical family': 'Familia clásica',
	Effects: 'Efectos',
	'Every classical condition is satisfied by this chart.':
		'Esta carta cumple todas las condiciones clásicas.',
	'The rule matched, but a stronger family silences it under the classical precedence norms. Each card names the family that took precedence.':
		'La regla se cumplió, pero una familia más fuerte la silencia según las normas clásicas de precedencia. Cada tarjeta indica la familia que tuvo precedencia.',
	'At least one classical condition fails. Read the evidence for which.':
		'Al menos una condición clásica falla. La evidencia indica cuál.',
	Synastry: 'Sinastría',
	'Synastry compatibility chart': 'Carta de compatibilidad de sinastría',
	'Synastry dual wheel': 'Rueda doble de sinastría',
	'Dual chart wheel comparing two natal charts':
		'Rueda doble que compara dos cartas natales',
	'Synastry response missing planet positions.':
		'La respuesta de sinastría no trae las posiciones planetarias.',
	'A current {{endpoint}} response carries {{first}} and {{second}}, and the inter-aspect readings below still work without them.':
		'Una respuesta actual de {{endpoint}} incluye {{first}} y {{second}}, y las lecturas de interaspectos de abajo funcionan igualmente sin ellas.',
	'Inter-aspects': 'Interaspectos',
	'Inter-aspect summary': 'Resumen de interaspectos',
	'In this pairing': 'En esta pareja',
	'All {{count}} inter-aspects': 'Los {{count}} interaspectos',
	'orb {{orb}}° · str {{strength}}': 'orbe {{orb}}° · fuerza {{strength}}',
	'ASC{{n}}': 'ASC{{n}}',
	'Person {{n}}': 'Persona {{n}}',
	'Planet 1': 'Planeta 1',
	'Planet 2': 'Planeta 2',
	'Inter-chart aspects: the planet from chart 1, the planet from chart 2, the aspect between them, the orb in degrees and the strength.':
		'Aspectos entre cartas: el planeta de la carta 1, el planeta de la carta 2, el aspecto entre ellos, el orbe en grados y la fuerza.',
};

registerLocale('es', es);
