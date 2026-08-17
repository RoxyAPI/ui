/**
 * Every English chrome string currently covered by a shipped locale, and the type a catalogue is checked against.
 *
 * @remarks
 * **Chrome only.** These are the words the library itself writes: headings, tab labels, table captions, legends, empty states, accessible names. Planet, sign and aspect NAMES are deliberately absent: those are values the API returns, it localizes them as additive display fields, and duplicating them here would create a second translation of the same fact that can disagree with the response rendered beside it.
 *
 * **The four elements and three modalities are the one exception, and they are here because the component WROTE them.** The element-modality cross-tab derives its 4x3 axes from a local array, not from the response, so there is no API value to defer to for six of the seven headers and the seventh (the dominant pair) would have been the only translated word in the table. Two rules keep that from becoming a second translation: the arrays stay canonical English because they are the CELL KEYS, and every value in every catalogue is pinned to what `/astrology/natal-chart?lang=` returns for `dominantElementLocalized` and `dominantModalityLocalized`, so the tinted pill above the grid and the header on its row read the same word. `tests/i18n.test.ts` asserts that agreement on a real render. Anything the response carries a localized partner for still belongs to the response.
 *
 * **`Car`, `Fix` and `Mut` are catalogue entries, not a truncation.** A `modality.slice(0, 3)` would be a byte operation with no idea of the word: Spanish would read `Fij`, and Hindi and Russian would split a matra or a Cyrillic word mid-stem. A translator decides the abbreviation, and the full modality name rides beside it as the column `title` so a reader can expand it.
 *
 * **Scope is the FORM PATH (`<roxy-endpoint-form>` and `<roxy-location-search>`), the two Western chart wheels, the monthly ephemeris table, the Human Design bodygraph, type and variables cards, the dosha card, the dream symbol card and its search, the hora table, the Vedic rashi and divisional charts, the angel number and crystal cards, the two generic fallbacks (`<roxy-data>`, `<roxy-reference-card>`), and the shared chrome they inherit.** The form path is first because it is what a visitor reads first: every widget that needs birth data mounts a form, so an English form stood in front of every translated card in the library. A natal card in Spanish over an English transit wheel is the half-translated state this list exists to remove, and the generic pair is in scope for a second reason: both build their output from `Object.keys(row)`, so both fold the API localized values into it and were rendering Spanish data under `Yes`, `No` and `31 rows`. The ephemeris table joined for the first reason and the second at once: it was unbound, so a monthly ephemeris rendered through `<roxy-data>` as `Year 2026 / Month 8 / 31 Rows` on every site in every language. The other components still render English chrome; extending the scope is adding entries here and to each locale, not new machinery.
 *
 * **A component earns its vocabulary by having its chrome here, and the two move in ONE change.** Reading `nameLocalized` under an English heading is worse than reading `name` under one, so a card is either translated or it is not. `<roxy-hd-connection>` and `<roxy-hd-penta>` are deliberately absent: almost all of their chrome is Human Design doctrine the COMPONENT wrote (what an electromagnetic channel is, what the upper triangle of a penta carries), so translating them is a paragraph-level meaning risk of exactly the shape lesson 32 describes, and they stay English end to end until a practitioner pass can source them.
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

	// Natal chart: balance details.
	'Dominant element',
	'Dominant modality',
	'Harmonious',
	'Challenging',
	'Neutral',
	'All {{count}} bodies in the chart, placed by sign',
	'Element and modality distribution',
	'Total',

	// Natal chart: the element-modality cross-tab axes. The four elements name
	// the rows in full; the three modalities name the columns as an abbreviation
	// with the full word on the column `title`, because three glyph-wide columns
	// cannot carry `Veraenderlich` or a Cyrillic adjective.
	'Fire',
	'Earth',
	'Air',
	'Water',
	'Cardinal',
	'Fixed',
	'Mutable',
	'Car',
	'Fix',
	'Mut',

	// Natal chart: configurations.
	'Chart patterns',
	'Dissociate',
	'Out of sign: one or more planets sit outside the pattern element or modality, so the theme holds but runs weaker.',
	'{{percent}} tight',
	'apex',

	// Natal chart: readings.
	'Planet readings',

	// Transit bi-wheel: card and wheel. The three orientation chips and the two
	// cusp chips are also the sentences the SVG description is built from, so the
	// picture and its accessible text can never claim different orientations.
	'Transits',
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
	'House cusps from the response',
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

	// `<roxy-ephemeris-table>`, which renders BOTH monthly ephemerides, the
	// tropical Western one and the sidereal Navagraha one. Body and sign names
	// come back localized and are read off the wire; the two things this card
	// derives itself, a sign change and a retrograde stretch, are what it has to
	// write words for. `Enters {{sign}} on {{date}}` is the accessible name of a
	// chip whose visible text is already the localized sign and the date, so the
	// only word it adds is the verb.
	'Ephemeris',
	'Signs in this month',
	'Sign changes and retrograde periods',
	'Daily positions',
	'Date',
	'Enters {{sign}} on {{date}}',
	'Retrograde {{range}}',
	'Every body with its position on each day of the month, as a zodiac sign and a degree.',

	// `<roxy-data>`, the generic fallback every unbound endpoint renders through.
	// It has no domain vocabulary of its own: its column headings come from the
	// wire field names via `humanize()`, so they are derived rather than literal
	// and a catalogue keyed on English source text cannot reach them. Everything
	// below is a word the component itself wrote.
	'Nested data omitted',
	'Generic data display',
	'Empty list',
	'Data table',
	'{{count}} rows',
	'Yes',
	'No',
	'illustration',

	// Human Design, shared by `<roxy-bodygraph>` and `<roxy-hd-type-card>`.
	// `/human-design/type` returns a strict subset of the bodygraph
	// interpretation, so the two cards render the same identity vocabulary
	// through `utils/hd-reading.ts` and translating one without the other puts a
	// Spanish bodygraph over an English type card on the same page.
	// `Personality` and `Design` name the two chart SIDES, which the wire carries
	// as the machine values `personality` and `design`: the component is what
	// turns those into words, so they are chrome. The count in a tab label rides
	// outside the string as digits in parentheses.
	'Type',
	'Strategy',
	'Authority',
	'Profile',
	'Definition',
	'Aura',
	'Incarnation cross',
	'Signature: {{value}}',
	'Not-self: {{value}}',
	'Profile {{profile}}',
	'Line {{line}} · Personality',
	'Line {{line}} · Design',
	'Personality',
	'Design',

	// `<roxy-bodygraph>`. The nine centre names, the channel names, the circuit
	// families and the activating bodies are NOT here: the response carries a
	// localized partner for every one of them, so the card reads them off the
	// wire and the colour legend is assembled from the same names the accordion
	// prints.
	'Bodygraph',
	'Human Design bodygraph',
	'Human Design bodygraph with nine centers, channels, and activated gates overlaid on a human silhouette',
	'Nine energy centers in their canonical positions over a human silhouette, each filled with its traditional color when defined and outlined when open, wired by channels between activated gates.',
	'Center colors when defined. Open centers are outlined.',
	'Open center',
	'Defined channels ({{count}})',
	'{{circuit}} circuit',
	'Centers ({{defined}} defined, {{open}} open)',
	'Defined',
	'Open',
	'Motor',
	'Awareness',
	'Not-self question',
	'Biology',
	'Gates {{gates}}',
	'Activations ({{count}})',
	'Chart sides',
	'Line {{line}}',
	'Gate {{gate}}',
	'I Ching hexagram {{number}}',

	// `<roxy-hd-type-card>`, on top of the shared identity block above.
	'Personality line',
	'Design line',
	'Lines',

	// `<roxy-hd-variables>`. The four arrow names, their layers, their bodygraph
	// positions and every Color, Direction, Base and Cognition VALUE come back
	// localized, so only the words the card writes around them are here.
	'Variables',
	'Human Design variables',
	'Low confidence: a birth time near a color or tone boundary. Verify the exact birth time.',
	'Low confidence: a birth time near a color or tone boundary (within {{margin}}°). Verify the exact birth time.',
	'Color {{color}} · Tone {{tone}} · Base {{base}}',
	'Knife-edge: could flip with a more precise birth time.',
	'Base',
	'Color',
	'Tone',
	'Direction',
	'Cognition',

	// `<roxy-reference-card>`, the second generic renderer. Like `<roxy-data>` it
	// derives every field label from the wire name through `humanize()`, so these
	// two are the only words it writes itself.
	'Reference',

	// The FORM path: `<roxy-endpoint-form>` and the `<roxy-location-search>` it
	// slots. This is the half of a widget a visitor fills in BEFORE any of the
	// cards above render, so an English form in front of a Spanish reading was the
	// most visible half-translated state left in the library.
	//
	// What is here is only what the form WRITES, plus the group names below. Every
	// field label and enum option is `humanize()` over a spec field name, and the
	// heading is the operation summary, so those are computed per operation and no
	// catalogue keyed on English source text can reach them. Measured: the 147
	// entries above resolve 5 of the 83 request-side field names, about 6%. That
	// is the shared field-name-to-label artifact, not a gap in this list.
	//
	// The group name rides INSIDE the two location strings as `{{group}}` rather
	// than being concatenated in front of them, so a translator owns the word
	// order: `Person 1 location` is English syntax and most of these languages put
	// the possessor after the noun.
	'Birth location',
	'{{group}} location',
	'City of birth',
	'{{group}} city',

	// The group names themselves, which is the one part of a form label that is
	// derived AND enumerable. Every other label is `humanize()` over one of 909
	// spec field names; a group is `humanize()` over the handful of names an
	// object-valued request property or a coordinate PREFIX can have, and the
	// committed spec has exactly nine across 176 operations. So these are a closed
	// set a catalogue can carry, and leaving them out left an English token inside
	// translated prose: `Local de Natal Chart`, `Место (Birth Data)`. A tenth group
	// still degrades safely, because a catalogue miss returns the humanized English.
	//
	// Each renders in three places and a translation has to hold in all three: the
	// fieldset legend, `{{group}} location` and `{{group}} city`. `Domain Weights`
	// is the one exception and reaches only the legend, because a group earns a
	// city search by carrying a latitude and longitude and that one carries neither.
	//
	// `Natal Chart` is DELIBERATELY ABSENT and is not an omission. `humanize` gives
	// it a capital C where the natal card heading above is `Natal chart`, and
	// `lookupKey` folds both to one key, so the heading already answers for it.
	// Adding the twin would not read as a duplicate in review: `registerLocale`
	// normalizes on the way in, so the second entry SILENTLY OVERWRITES the first in
	// every locale, and the card heading would start printing the group wording.
	// That is the `harmonious` defect in the note above, and `tests/i18n.test.ts`
	// fails on the collision as well as on a group name no catalogue can resolve.
	'Person 1',
	'Person 2',
	'Person A',
	'Person B',
	'Birth Data',
	'Birth',
	'Relocation',
	'Domain Weights',
	'Fills {{fields}}. Pick a city to autofill.',
	'Choose',
	'Comma separated',
	'Advanced',
	'Please complete:',
	'Search city',
	'No cities found',

	// The four submit verbs. They are RETURNED by `deriveSubmitLabel()` in
	// `utils/field-schema.ts` rather than written at a `t()` call site, so the
	// literal scan cannot see them; `tests/i18n.test.ts` runs that function over
	// every operation in the committed spec instead and fails on a verb missing
	// from this list.
	'Compare',
	'Cast',
	'Get reading',
	'Generate',

	// Form failure states. `{{message}}` is one of the two below or a raw browser
	// network error, which is a wire fact and stays as the browser worded it.
	'Schema load failed: {{message}}',
	'Endpoint {{method}} {{path}} not found in OpenAPI spec',
	'HTTP error {{status}}',
	'Retry',

	// Angel number card, crystal card, and the vargottama pills on a divisional chart.
	'Angel number',
	'Digit root',
	'Action steps',
	'Colors',
	'Keywords',
	'Pairs with',
	'Vargottama',
	'Vargottama planets',
	'{{chart}} divisional chart with twelve sign houses',

	// The sidereal frame caption, shared by every Vedic card that carries a frame.
	'Sidereal frame: {{frame}}',
	'Sidereal frame: {{frame}}, {{degrees}}° subtracted',
	'Day',
	'Night',

	// Hora table and the Vedic rashi chart.
	'Hora',
	'Hora periods',
	'Vedic kundli',
	'Vedic birth chart with twelve sign houses',

	// Forecast timeline, guna milan, moon phase, profection and relocation.
	'Forecast timeline',
	'No events in this window',
	'orb {{value}}°',
	'Guna Milan score',
	'Koota',
	'Guna Milan breakdown: each koota with the classification of person 1 and person 2, and the score it earned out of its maximum.',
	'{{sign}} · house {{house}}',
	'{{planet}}: house {{from}} to {{to}}',
	'Progress',
	'Score',
	'{{dosha}} cancelled',
	'Moon phase calendar',
	'Current moon phase',
	'Illumination',
	'Age',
	'Sign',
	'Distance',
	'{{count}} days',
	'{{value}}k km',
	'Annual profection',
	'For',
	'Lord of the year',
	'What changes at this location',
	'Angular planets here',
	'Planets that change house',
	'No planet changes house at this location.',

	// Compatibility, forecast digest, hexagram, positions table and tarot spread.
	'Strengths',
	'Key aspects',
	'Aspect breakdown',
	'Element balance',
	'Forecast digest',
	'No notable events.',
	'{{count}} events',
	'significance {{value}} of 100',
	'I Ching hexagram',
	'Upper',
	'Lower',
	'Changing lines: {{lines}}.',
	'Becomes hexagram {{number}} {{name}}.',
	'Position',
	'House',
	'Motion',
	'Formula',
	'°/day',
	'Tarot spread',
	'(reversed)',
	'{{arcana}} arcana',
	'{{chakra}} chakra crystals',
	'{{element}} element crystals',
	'Crystals for {{sign}}',
	'{{month}} birthstones',
	'Crystals',

	// Panchang table. The Sanskrit terms print as themselves in most languages;
	// `Sun` and `Moon` label a longitude the response gives as a number, so both
	// are pinned to the name the API returns for that body in each language.
	'Panchang',
	'Auspicious muhurtas',
	'Inauspicious periods',
	'Next transitions',
	'None today',
	'Bhadra (Vishti)',
	'Panchaka',
	'Favorable Moon signs',
	'Favorable birth nakshatras',
	'Unfavorable birth nakshatras',
	'Chandrabalam and Tarabalam',
	'None',
	'Moon sign',
	'Sun sign',
	'Sun nakshatra',
	'Amrit Kalam',
	'Dur Muhurta',
	'Varjyam',
	'Sunrise',
	'Sunset',
	'Moonrise',
	'Moonset',
	'Sun',
	'Moon',
	'Ashtama Chandra rashi',
	'{{sign}} until {{time}}',
	'{{sign}} until {{time}}, then {{next}}',
	'{{range}} (ends {{date}})',
	'Tithi',
	'Nakshatra',
	'Yoga',
	'Karana',
	'ends {{time}}',
	'ends {{time}} to {{next}}',
	'ends {{time}} to {{next}} pada {{pada}}',

	// Numerology card: the number profiles, karmic sections and lucky associations.
	'Master',
	'Master number',
	'Birth day profile',
	'Lucky associations',
	'Missing',
	'No numbers are missing from the birth name.',
	'How to overcome',
	'Karmic lessons',
	'Debt',
	'Challenge',
	'Resolution',
	'Karmic debt',
	'Personal year',
	'Pinnacles',
	'Lesson',
	'Challenges',
	'Name numbers',
	'Name letters',
	'Personal month',
	'Calendar month',
	'Maturity',
	'Current age',
	'Activates',
	'Element',
	'Ruling planet',
	'Gemstones',
	'Compatible',
	'Incompatible',
	'Life Path',
	'Expression',
	'Soul Urge',
	'Birth Day',
	'Daily Number',
	'Personal Day',
	'Numerology chart',

	// Crystal card attributes and the three meaning headings.
	'Planet',
	'Hardness',
	'Vibration',
	'Birthstone',
	'Chakras',
	'Zodiac',
	'Elements',
	'Spiritual',
	'Emotional',
	'Physical',

	// Dream symbols: the single-symbol card and the search results beside it.
	'Dream symbol',
	'Dream symbols',
	'{{count}} matches',

	// Dosha card. The three headings the card writes around a response that is
	// otherwise prose: how strong the dosha is, what cancels it, and what is
	// prescribed for it.
	'Severity',
	'Remedies',
	'Exceptions',

	// The key refusal, shown in place of a widget when a site owner puts a secret
	// key in a browser page. Two components render this ONE constant
	// (`utils/key-guard.ts`), so it is translated where each renders and never
	// copied: `<roxy-location-search>` in its own shadow root, and every data
	// component through `renderError`. `pk_` is a literal key prefix and stays
	// verbatim in every language.
	'Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side.',

	// Western chart axes drawn on the natal wheel. Short by necessity: the label ring
	// has a fixed width, so each one is the abbreviation that language's own charts
	// print, not a shortened translation of the full name.
	'ASC',
	'DSC',
	'MC',
	'IC',
	'PoF',
	'Vtx',

	// Kundli chart: the style switcher and the two words the SVG writes into a cell
	// tooltip. The regional names are compass directions, translated as such.
	'Kundli style',
	'North',
	'South',
	'East',
	'in {{sign}}',
	'pada {{n}}',

	// Panchang: the weekday limb. Sanskrit, and it prints as itself wherever the
	// script allows.
	'Vara',

	// Tarot: the card fallback name and the upright / reversed switch above it.
	'Tarot card',
	'Upright',
	'Reversed',
	'Card orientation',

	// Numerology: the three letter positions of a name, and the section headings the
	// card writes over readings the response returns.
	'Cornerstone',
	'Capstone',
	'First vowel',
	'Core numbers',
	'Lessons',
	'Debts',
	'Life phases',
	'Obstacle periods',
	'Letter analysis',
	'Opportunities',

	// The shared positions table: five response shapes through one component, so each
	// title names the shape and the badges beside it name what that shape was cast for.
	'Asteroids',
	'Houses',
	'Black Moon Lilith',
	'{{variant}} apogee',
	'Solar arc directions',
	'Arc',
	'Directed to',
	'Arabic lots',
	'Sect',
	'Ascendant',
	'Midheaven',
	'Secondary progressions',
	'Progressed to',
	'Elapsed',
	'{{years}} yrs',

	// Angel numbers: the two readings that sit outside the life-area group.
	'Biblical',
	'Shadow',

	// Accordion headings. Every component that overrides the default routes its
	// heading through the base, so these are one vocabulary rather than one per card.
	'Readings',
	'Advisories',
	'Sign compatibility',
	'Breakdown',
	'Changing lines',
	'Dynamics',

	// The four life areas an angel-number reading is split into, beside the
	// `Spiritual` one already above.
	'Love',
	'Career',
	'Money',
	'Twin flame',

	// The Western positions grid: the card name, the heading over it, and the columns
	// a reader scans. `Degree` is shared with the Vedic tables below.
	'Western planetary positions',
	'Planetary positions',
	'Western planetary positions: each body with its sign, degree, house and motion.',
	'Degree',

	// Vedic drishti: the card, the two section labels above the pills, and the five
	// columns of the aspect table.
	'Vedic aspects',
	'Chart time {{when}}',
	'Sidereal positions',
	'Mutual aspects',
	'Vedic planetary aspects: aspecting planet, aspect type, aspected planet, strength and orb.',
	'From',
	'Aspect',
	'To',
	'Strength',
	'Orb',

	// Upagrahas: the card, its two classical groups with the line that says what each
	// group is derived from, and the columns.
	'Upagraha positions',
	'Upagrahas',
	'Upagraha',
	'{{group}} upagrahas: each sub-planet with its rashi, degree in sign, sidereal longitude, and nakshatra with pada.',
	'Time based',
	'From the eightfold division of the day or night, so these depend on the birth time, the place and the weekday.',
	'Sun based',
	'The Dhuma group, derived by fixed arc from the Sun. Dhuma is the Sun plus 133 degrees 20 minutes, and each of the rest follows from the one before it.',
	'Rashi',
	'Longitude',
	'Pada',

	// The nakshatra card: its accessible name, the mansion counter, the three facts a
	// mansion is identified by, and the remedy lines under them.
	'Nakshatra {{name}}',
	'Nakshatra {{number}} of 27',
	'Lord',
	'Deity',
	'Symbol',
	'Characteristics',
	'Mantras:',
	'Gemstones:',
	'Rituals:',

	// The compass rose, all eight principal points. Cardinal initials are the ones a
	// language actually prints, so German reads O for Ost and Turkish K for Kuzey.
	'N',
	'NE',
	'E',
	'SE',
	'S',
	'SW',
	'W',
	'NW',

	// Local space: the card, the compass description a screen reader hears, the
	// per-body tooltip, and the three columns beside the direction.
	'Local space',
	'Local space compass',
	'Local space compass of planetary directions from the birthplace',
	'A compass centered on the birthplace. Each body is a line pointing to its azimuth, clockwise from north. Bodies below the horizon are dimmed.',
	'Local space directions: each body with its compass direction, azimuth, altitude and whether it sits above or below the horizon.',
	'{{planet}} {{direction}} {{azimuth}}° altitude {{altitude}}',
	'Azimuth',
	'Altitude',
	'Horizon',

	// Astrocartography: the card, the map a screen reader hears described, the
	// per-line tooltip, and the legend under it.
	'Astrocartography',
	'Astrocartography world map',
	'World map of planetary astrocartography lines',
	'Equirectangular world map. Each body has a Midheaven and Imum Coeli meridian and a curved Ascendant and Descendant line, colored per body.',
	'Birthplace',
	'{{planet}} {{angle}} line',
	'Solid lines are the Ascendant and Midheaven, dashed are the Descendant and IC.',
	'Planetary lines',

	// Choghadiya: the card, its day and night columns with the accessible name of
	// each list, and the two labels on a period tile.
	'Choghadiya',
	'Day muhurta periods',
	'Daytime choghadiya',
	'No daytime periods',
	'Night muhurta periods',
	'Nighttime choghadiya',
	'No nighttime periods',
	'Now',
	'Time range',
] as const;

/** One of the English source strings a shipped catalogue must translate. */
export type ChromeString = (typeof CHROME_STRINGS)[number];
