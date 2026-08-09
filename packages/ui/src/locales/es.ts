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
 * **`Natal` is Spanish, not an untranslated fallthrough.** Spanish astrology writes `carta natal`, `planetas natales`, `cúspides de casas natales`; the spelling coincides with English and the word does not. `Cardinal` and `Mutable` coincide the same way and are likewise real Spanish.
 *
 * **`Figuras planetarias` replaced `Configuraciones de la carta` on 2026-08-09, and that string is why this file now carries citations.** It back-translated to "chart SETTINGS": a live Spanish agency read the block heading as a settings panel and emailed asking us to hide his own T-Squares and Stellium. It is not a near miss, it is the reading a competitor product actively teaches: carta-natal.es heads its show/hide controls `Configuración de los aspectos` and tells the reader to click there `para ocultar todos los aspectos`. The replacement is the class term two Spanish sources use for exactly our five figures: Astralbalance, `las figuras planetarias son formaciones que se crean cuando tres o más planetas interactúan a través de aspectos específicos`, listing Stellium, T Cuadrada, Gran Cruz, Yod and Gran Trígono; and mi-horoscopo-del-dia.com, `las figuras planetarias suponen un medio excelente para visualizar una carta en su conjunto`. `Figuras de aspectos` (Tito Maciá, and the Spanish Huber title) was the runner-up and lost only because this block contains a Stellium, which is a conjunction cluster rather than an aspect figure.
 *
 * **`foco` replaced `ápice` in the same pass.** `ápice` is unattested in Spanish astrology and idiomatically means a shred (`ni un ápice de`). Spanish names this planet `foco` / `punto focal` / `planeta focal`, or borrows `apex` outright: Paula Lustemberg writes `Planetas en Sextil o Trígono al Foco`, segundoruiz.com `Neptuno en Piscis en el apex o Punto Focal de la T`. `foco` is the only form every source agrees on and the only one that fits the chip.
 *
 * **`Duración` replaced `Tiempos`, and this one is a CONTRACT error rather than a vocabulary one.** The field is not a schedule: the spec says `how long this transit influence lasts`, and the values are buckets like `Active for a few hours`. `Tiempos:` in front of that does not read as a duration. `Duración` is also what Spanish astrology calls it (astroworld.es, `la duración de esa activación depende directamente de la velocidad orbital del planeta en tránsito`) and it is what `fr.ts` and `pt.ts` were already saying.
 *
 * Rejected against sources, so nobody restores them: `Aplicante`/`Separante` for applying and separating (Spanish Wikipedia phrases it that way in passing, but the two astrologer-authored references write `aplicativo`/`separativo`), `Aplicación`/`Separación` (what Astro-Seek prints, and that UI is demonstrably machine-translated on aspect vocabulary: it renders SQUARE as `Cuadrado`, which is not `Cuadratura`), `birrueda` for the bi-wheel (zero attestation, an invention) and `carta superpuesta` for it (attested, but it names the overlay rather than the two-ring structure the inner and outer strings are built on), `astros` for a body (idiomatic, but this catalogue already spends one word on that concept, `cuerpos`, and both would have to move together), `ápice` for the apex and `Configuraciones planetarias` for the figures (real Spanish, and rejected for keeping the exact `configuración` stem that produced the support ticket on a card where a settings panel is plausible).
 *
 * One entry is the plainest defensible Spanish rather than sourced vocabulary, and is flagged for a bilingual practitioner: `Casa en tránsito` for the natal house a transiting body is passing through, which Spanish only says as a whole clause. `Casa transitada` is the one defensible alternative and was passed over because it breaks the natal / en tránsito pairing the rest of the card establishes.
 *
 * **`Fija` now agrees with BOTH the API and the grammar, and the earlier masculine `Fijo` is gone.** Spanish agrees the quality with its head noun, and the head noun here is `la modalidad`, not `el signo`: three astrologer-authored references name the three qualities in the feminine (astroworld.es `Son tres: cardinal, fija y mutable`, espaciodemafe.com `se dividen en tres categorías: cardinal, fija y mutable`, lunadominante.com `las tres modalidades ... cardinal, fija y mutable`), and every one of them switches to `signos fijos` the moment the head noun changes. `dominantModalityLocalized` returned `Fijo` until 2026-08-09 and this entry followed it, because the dominant pill prints the API word and the grid header prints this one on the same card. The API was corrected first, so the pairing that forced the compromise now holds on the correct word. Note that the header TINT is not what pins them: the grid compares canonical English (`summary.dominantModality`), so what has to agree is the two words a reader sees, not a lookup.
 *
 * `Card` for the cardinal column is ours. Twelve Spanish sources, including live chart software and a school course guide, spell all three qualities out in full even in compact side panels, so there is no Spanish abbreviation convention to follow; `Card` is the natural truncation, `Fija` and `Mut` are already short enough to need none. The element row labels are never abbreviated: `Aire` and `Agua` collide on their first letter.
 *
 * One structural cost, accepted: entries 16 and 17 sit in front of an API-returned body name, so a tooltip reads `En tránsito Marte cuadratura Natal Venus` where correct Spanish would put the qualifier after the noun. No wording repairs it while the component composes label then body, and both strings do double duty as table column headers, where the order is right.
 *
 * ## Human Design
 *
 * **The 54 Human Design strings were sourced before they were written, and the first anchor is the API, not a dictionary.** These labels print directly above values `/human-design/*` already returns in Spanish, so wherever `packages/human-design/src/locales/es.ts` had already spent a word, this file spends the same one: `Conciencia` for the awareness chip (the overlay writes `conciencia` 31 times and `consciencia` never, though half the community spells it the other way), `Abierto` for an undefined centre (its centre themes read `La Cabeza abierta`, `El Ajna abierto`, `La Garganta abierta`), `Lados de la carta` for the two chart sides (`El lado consciente, impreso en negro`), `Motor` and `Puerta` and `Línea` in the same spellings, and the tú imperative in `Verifica la hora exacta de nacimiento`, which is the register its open-centre themes already use (`Aprende a no actuar`, `Adapta la voz`). Community sources settled only what the API had no word for.
 *
 * **`Bodygraph` is deliberately untranslated, and `Cuerpo gráfico` lost on the API pairing rather than on attestation.** The Spanish term is real and widespread: micartadisenohumano.com heads a dictionary entry `Diseño Humano, Cuerpo gráfico`, tuautoridadinterna.com captions every chart image `El Cuerpo Gráfico de Diseño Humano`, designinmovement.com writes `las vías únicas en las cuales la energía está diseñada para fluir a través del Cuerpo Gráfico de cada persona`. It still loses, because the prose that renders INSIDE this card says the other one: all nine centre `biology` strings end `y en el bodygraph esta glándula...`, sixteen occurrences in the overlay, and they print under the `Biología` label two rows below the card title. A card headed `Cuerpo gráfico` over a footnote reading `en el bodygraph` names one thing twice on one screen. The loanword is also what Genetic Matrix prints throughout its Spanish learning hub (`El Bodygraph contiene nueve Centros`) and what Rachel Breitenbucher uses across her Spanish Variables series (`puedas distinguir mirando un bodygraph de dónde surge cada cosa`).
 *
 * **`Autoridad`, NOT `Autoridad interna`, and the reason sits in the API value set rather than in the label.** Spanish Human Design says `Autoridad Interna` constantly, micartadisenohumano.com included (`respetas tu Autoridad Interna`), and the longer form looks like the more careful choice. It is false for two of the seven values this tile can print: designinmovement.com lists `AUTORIDAD EXTERNA` and `AUTORIDAD LUNAR` among the authorities themselves, and our `authorities` map ships `Mental` and `Lunar`, so `Autoridad interna: Mental` would be a label contradicting the word underneath it. `Autoridad` alone is what designinmovement.com heads its own section with, and it is true of all seven.
 *
 * **`Definición` was checked against the failure that produced this file and kept.** It carries the same hazard shape as `Configuraciones`, since Spanish also uses it for picture resolution and for a dictionary gloss, but it is the term the sources use for exactly this field (espaciohumano.org, `Nuestra definición, todo lo que está coloreado en nuestro Diseño, es quiénes somos`; micartadisenohumano.com runs an article titled `Cómo interactúas con los demás según tu Definición`), and the value printed under it is `Simple` or `Dividida` from the API, which no reader mistakes for a resolution. Same reasoning holds for `Firma`, which micartadisenohumano.com opens its own dictionary entry by joking about (`La firma es un signo manuscrito... Es coña`) before defining it as the Human Design term, and which designinmovement.com writes as `la Firma de tu Tipo: paz, satisfacción, éxito, sorpresa`. The pill renders `Firma: Satisfacción`, so the value disambiguates in the same glance.
 *
 * **`No-Ser` is the printed Spanish, hyphen and capitals included**, from micartadisenohumano.com (dictionary entry `¿Que significa NO-SER?`) and espaciohumano.org (`El tema de su No-Ser es la Frustración`), which is also where `Pregunta del No-Ser` comes from. `Cruz de Encarnación` is Genetic Matrix (`Su Cruz de Encarnación está definida por cuatro activaciones de Puerta y Línea`) and caminosenespiral.com. `Activaciones` is that same Genetic Matrix sentence plus nshumandesign.com (`cada una de las activaciones listadas en las bases de datos`); `Canales definidos` is arcanepattern.com (`Los canales definidos son la columna vertebral de tu composición energética`) and mapainterno.com; `Centros ... definidos / abiertos` is micartadisenohumano.com (`un centro se considera abierto (o indefinido)`) with Genetic Matrix (`sus Centros definidos, indefinidos y abiertos`); `centros energéticos` in the long chart description is sunrisehumandesign.com; `Motor` and `Conciencia` are the two centre classes micartadisenohumano.com prints per centre (`Un centro motor`, `Un centro de conciencia`), corroborated by sunrisehumandesign.com and tuautoridadinterna.com. `Hexagrama {{number}} del I Ching` follows Genetic Matrix and mapainterno.com, both of which say `los 64 hexagramas del I Ching`.
 *
 * **`Personalidad` and `Diseño` keep their capitals inside `Línea de Personalidad` and `Línea de Diseño`, and that is a disambiguation, not a style slip.** Every source capitalises them mid-sentence because they are proper Human Design terms: nshumandesign.com, `los datos de la personalidad, codificados en negro... los datos del diseño, codificados en rojo`; micartadisenohumano.com, `nuestras columnas de Diseño y Personalidad`; arcanepattern.com, `planetas de Personalidad, planetas de Diseño`. Lower-cased, `línea de diseño` reads as a graphic-design line, which is the one wrong reading available on a card that draws a diagram. The two-line composite itself is how sunrisehumandesign.com explains the profile (`la línea del sol de personalidad`, `la línea del sol de diseño`).
 *
 * **`Circuito {{circuit}}` is the attested word order and it happens to agree for free.** micartadisenohumano.com heads its three sections `Circuito Individual`, `Circuito Tribal`, `Circuito Colectivo`, which is exactly the phrase the placeholder builds, and `circuito` is masculine while `Colectivo` is already masculine and `Individual` and `Tribal` are invariable, so no value the API can supply breaks the agreement. English word order (`{{circuit}} circuito`) had no attestation at all.
 *
 * **The Variables vocabulary comes from The Human Design LAB, whose course pages are written by Amaya Blanco Alzola, a Spanish analyst trained directly with Ra Uru Hu and Alokanand Díaz del Río.** Its substructure series is titled from `las 5 bases` through `los 6 tonos`, `los 6 colores` and `las 6 líneas`, and it names the cognition axis `Cognición Izquierda, Estratégica` and `Cognición Derecha, Receptiva`, which settles `Base`, `Tono`, `Color` and `Cognición` in one source; Genetic Matrix corroborates (`Las cuatro flechas... revelan sus Variables, que se derivan del Tono`) as does Rachel Breitenbucher (`color, tono y base`). `Color` here is the Human Design layer, never a colour on screen, which is why the two low-confidence notes say `un límite de Color o de Tono` with the capitals: they name the layers the arrow can flip between, not a hue and a pitch.
 *
 * **`Dirección` for the arrow direction survived two better-looking alternatives.** `Sentido` is disqualified by a collision this catalogue cannot afford: `Sentido` is what micartadisenohumano.com calls the cognition Variable itself, and it sells a course listing `Digestión, Entorno, Sentido, Motivación y Perspectiva`, so `Sentido` in the direction slot would name the row directly below it. `Orientación` is already spent on `Guidance` in this same file. `Dirección` is left, it is what the left and right arrows mechanically are, and the row sits in a list with `Color`, `Tono` and `Cognición`, which forecloses the address reading.
 *
 * Six entries match their English source and are correct that way. `Aura` (espaciohumano.org, `Aura cerrada y que repele`; designinmovement.com, `a nivel del Aura`; arcanepattern.com, `cuando estás en su aura`), `Motor` (the centre class above), `Variables` (Genetic Matrix and Rachel Breitenbucher both write `las Variables`), `Base` and `Color` (The Human Design LAB), and `Bodygraph` for the reason set out above. None of them is an untranslated fallthrough, and inventing a Spanish word for any of them would be the defect.
 *
 * Four entries are the plainest defensible Spanish rather than sourced vocabulary, and want a bilingual practitioner: `En el límite` for the knife-edge warning, which has no Spanish Human Design idiom and is deliberately worded off `límite de Color o de Tono` in the note above it so the two agree; `Confianza baja` for the low-confidence note; `Lados de la carta` for the tab list, where the community says `las dos columnas` of the graph and the API says `lado`, and the API won because its side descriptions render in the panel underneath; and `Referencia` on the glossary card, which is generic chrome with no Human Design content at all.
 *
 * Rejected against sources, so nobody restores them: `Cuerpo gráfico` for the card title (attested, beaten by the API pairing), `Autoridad interna` for the authority tile (attested, false for `Mental` and `Lunar`), `Sentido` and `Orientación` for the arrow direction (one collides with the Cognition Variable, the other is already in use), `consciencia` for the awareness chip (half the sources spell it that way and the API spells it the other), `sin definir` for an open centre (what sunrisehumandesign.com and designinmovement.com print, and it contradicts the `abierta` the API prose uses three rows down), and lower-cased `línea de diseño`, which reads as a graphic-design line on a card that draws one.
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
	'{{percent}}% tight': '{{percent}}% de exactitud',
	apex: 'foco',

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
	'House cusps from the response':
		'Cúspides de casas incluidas en la respuesta',
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
	Timing: 'Duración',
	Guidance: 'Orientación',

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
	'No bodygraph data': 'Sin datos del bodygraph',
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

	'No Human Design data': 'Sin datos de Diseño Humano',
	'Personality line': 'Línea de Personalidad',
	'Design line': 'Línea de Diseño',
	Lines: 'Líneas',

	Variables: 'Variables',
	'No variables data': 'Sin datos de las Variables',
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
	'No reference data': 'Sin datos de referencia',
};

registerLocale('es', es);
