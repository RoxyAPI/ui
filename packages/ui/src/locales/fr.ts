/**
 * French chrome strings.
 *
 * @remarks
 * Importing this module registers the catalogue and re-renders every mounted component, so it is a side-effect entry, exactly like a `components/*` module. It is built to `dist/locales/fr.js` and `dist/cdn/locales/fr.js` as its OWN payload rather than compiled into the components, so an English site downloads none of it.
 *
 * Keyed by the English source string as it appears at the call site, so this file diffs directly against the component that renders it and no key vocabulary has to be kept in sync with the copy.
 *
 * Every entry below is attested in live French astrology copy rather than machine translated. What follows is the reasoning a maintainer needs; the attestation itself is recorded internally.
 *
 * **Every elision is routed around, because the brand rule forbids apostrophes.** French forces `l'orbe` and `l'apex` the moment either takes an article, so both are written as bare labels (`orbe`, `apex`), which is also how they appear beside a value. The same rule drops the article in `à partir du degré Ascendant`, where `depuis l'Ascendant` is the natural phrasing and is unusable here. Any future entry has to be phrased the same way rather than reaching for the apostrophe.
 *
 * **`roue` is the only wheel noun in this file, deliberately.** French says both `double roue` and `double carte` for the same drawing; both are attested, and forking to `carte` inside one component would leave the library with two nouns for one thing. Nothing about `double roue` is canonical the way `bi-wheel` is in English, so this is a consistency choice rather than a term of art.
 *
 * **`Aspects composés` replaced `Configurations du thème` on 2026-08-09, and the Spanish fix for the same string does NOT transfer here.** In French, `figures` and `dessins planétaires` name the whole-chart shapes (Bol, Seau, Éclaboussure, Locomotive), one level up from the chips in this block. French sorts our exact set under `aspects composés`. `Configurations planétaires` is attested for the same figures and was the runner-up; it lost for keeping the `configuration` stem, which in French software is exactly the settings word.
 *
 * **`le thème` was removed from the out-of-sign tooltip in the same pass, and it was a live mistranslation rather than a style fix.** French reserves `le thème` for the birth chart itself, so `le thème demeure donc mais agit plus faiblement` read as "the birth chart persists but acts more weakly", which is nonsense. The English `theme` meant the pattern character. `qui reste donc valable` now refers unambiguously to `la configuration`.
 *
 * **`Dissonants` replaced `Tendus` and `Durée` replaced `Période`.** `Tendus` is real French but pairs badly with `Neutres`, since the conjunction is defined as `ni harmonique ni tendue`, so a legend carrying both reads as overlapping. `Période` was not wrong either, but the field is a duration, and `Période` names WHICH span is active rather than HOW LONG it lasts.
 *
 * `Card` for the cardinal column is ours, not a convention: French sources spell all three modalities out in full. `Car` was rejected because it is a high-frequency French conjunction and a common noun; `Fixe` needs no truncation at all.
 *
 * Rejected, so nobody restores them: `Applicatif`/`Séparatif` for applying and separating (the obvious calque, found on no French astrology source, which prints `appliquant`/`séparant`), `bi-roue` (an invented calque with zero attestation), `anneau` for a chart ring (forces the banned elision and is not the French word for this), `pointe` alone for a cusp (a real synonym but ambiguous out of context, where `cuspide` is not), `Maison en transit` for the transited house (it reverses the semantics and says the HOUSE is transiting), and `corps céleste` for a body (correct, but long for a column header and it breaks continuity with `astres`).
 *
 * Two entries sit in front of an API-returned body name, so they are the noun forms `Transit` and `Natal` rather than the attested adjective `transitante`, which French places after the noun and which the component cannot compose. The tooltip therefore reads `Transit Mars carré Natal Venus`, which is the T. and N. convention French chart software already uses.
 *
 * `Impact`, `Timing` and `Guidance` have no French astrological vocabulary behind them at all: they are report-layout labels, so `Effets`, `Période` and `Conseils` are plain French. `Datation` is the technical French word for the timing dimension if a more expert register is ever wanted.
 *
 * ## Human Design
 *
 * **The API is the higher-authority source and was read first.** Where a chrome label sits over a value the API already translates (`Type`, the four circuit names, the nine centre names, `Personality`/`Design` as chart sides), the two were read side by side so the label and the value it captions never name different concepts.
 *
 * **`Type`, `Aura`, `Design`, `Bodygraph`, `Activations`, `Variables`, `Base`, `Direction` and `Cognition` ship byte-identical to their English source, each independently attested rather than assumed identical.** `bodygraph` stays lower case inside a sentence and capitalised only as the card title, matching the API's own usage. `Direction` is the ordinary French word already used for the G Center's function, reused here for the arrow's own direction.
 *
 * **`Incarnation cross` is `Incarnation en croix`, not the attested `croix d'incarnation`, because the register gate forbids the apostrophe that phrase cannot avoid.** Every live source uses the elided form and none offers an alternative, so this is not a community-attested rendering: it borrows the ordinary French idiom `en croix` to keep both words without the elision, and it wants a native Human Design reader's sign-off before it is treated as settled.
 *
 * **`{{circuit}} circuit` becomes `Circuit {{circuit}}` and `I Ching hexagram {{number}}` becomes `Hexagramme {{number}} du Yi-King`, both reordered against the English word order**, following French noun-before-adjective order and the hyphenated spelling of the divination text.
 *
 * **`Non-Soi` replaces a literal `Not-Self` calque**, so `Not-self: {{value}}` is `Non-Soi : {{value}}` and `Not-self question` is `Question du Non-Soi` (the `du` elides cleanly, since `Non-Soi` starts on a consonant). The motor and awareness centre chips take `Moteur` and `Conscience`.
 *
 * **`Human Design` itself is rendered `Design Humain`** in the three strings that name the product rather than a chart part, matching the name French Human Design writing uses for itself rather than leaving the system name in English.
 *
 * **The two low-confidence warnings and the knife-edge string were rewritten around the same elision the rest of this file routes around.** A literal `proche d'une limite` and `Vérifiez l'heure de naissance exacte` each force an apostrophe, so both became telegraphic labels instead, the same technique already used for `orbe` and `apex`. `Knife-edge` takes the attested French idiom `sur le fil du rasoir` rather than an invented literal calque.
 *
 * **`Ligne Personnalité` and `Ligne Design` have no attested source as a fixed compact label.** The underlying concept is well attested but not this exact tile pairing, so the two are built compositionally and want a native Human Design reader's pass. `Côtés du thème` is not compositional in the same risky sense: it reuses `côté`, the API's own word for a chart side.
 *
 * ## Monthly ephemeris
 *
 * **`Éphémérides` is settled by the two authorities above astrology**, the national lexical database and the national ephemeris institute, which also pins the feminine plural agreement.
 *
 * **`Changements de signe` over `ingrès`.** `Ingrès` is real French astrology vocabulary and is rejected anyway on two counts: it is insider vocabulary a lay reader does not carry, and its own practitioners disagree about the accent.
 *
 * **`Entrée en {{sign}} le {{date}}` substitutes safely for all twelve.** Every French sign name begins with a consonant and `en` never elides, so no exception table is needed.
 *
 * `Date` is identical to the English and is the real French word; every French table this was checked against pairs it with `Heure`, never with `Temps`.
 *
 * **The empty state is deliberately generic, and that is a two-part decision.** French elision would make it `Aucune donnée d ephemerides`, and the brand rule banning apostrophes is an ENGLISH typography convention that cannot be applied to a mandatory French elision without producing broken text; and the singular `éphéméride` is everyday French for a tear-off desk calendar, which is exactly the false-friend shape this catalogue exists to avoid. `Aucune donnée disponible` sidesteps both, at the cost of not naming the card. If a future string needs an article before a vowel, say so rather than mangling the French.
 *
 * The empty state and the table caption are COMPOSED rather than lifted; no astrology page publishes either. The vocabulary in both is sourced, the sentence frame is judgement.
 *
 * ## Form group names
 *
 * **The letter pair is real French and was checked rather than assumed**, so the Human Design pair keeps its letters instead of becoming `Première personne`. The numbered pair takes the same head noun.
 *
 * **`Destination` beat `Relocalisation`, and the reason is that one names a PLACE and the other names a technique.** `Relocalisation` is well attested and this file already carries `Thème relocalisé` for the chart itself. It still loses the legend, because the field holds a city and `Lieu de Relocalisation` reads as the location of the relocation process, one abstraction away from what the visitor is being asked for. `Lieu de référence` was rejected for the opposite failure: outside a sequential settings screen it reads as the ORIGINAL place, which is the other fieldset.
 *
 * **`Naissance` is bare on purpose while `Données de naissance` keeps the fuller wording**, so the short and full English pair survives, and both slot into this file's existing `Lieu de naissance` and `Ville de naissance` when interpolated. `Pondération des domaines` is the term French weighting UIs use for a percentage split; `Poids des domaines` was rejected because `poids` reads as physical mass.
 *
 * `Données de naissance` is the weakest entry here: it renders as `Lieu de Données de naissance`, which stacks two `de` in one label. It is correct and it is heavy, and the only lighter option is to reuse the bare `Naissance` already spent on the relocation birth block. The two fieldsets never appear on the same form, so a native pass may decide the duplication is the better trade.
 */

import type { ChromeString } from '../i18n/chrome-strings.js';
import { registerLocale } from '../i18n/registry.js';
import './field-labels/fr.js';

export const fr: Record<ChromeString, string> = {
	'Edit query': 'Modifier la requête',
	'Spiritual data by RoxyAPI': 'Données spirituelles par RoxyAPI',
	'No data': 'Aucune donnée',
	Loading: 'Chargement',
	Reading: 'Interprétation',

	'Natal chart': 'Thème natal',
	'Relocation chart': 'Thème relocalisé',
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

	'Dominant element': 'Élément dominant',
	'Dominant modality': 'Modalité dominante',
	Harmonious: 'Harmoniques',
	Challenging: 'Dissonants',
	Neutral: 'Neutres',
	'All {{count}} bodies in the chart, placed by sign':
		'Les {{count}} astres du thème, classés par signe',
	'Element and modality distribution': 'Répartition par éléments et modalités',
	Total: 'Total',

	Fire: 'Feu',
	Earth: 'Terre',
	Air: 'Air',
	Water: 'Eau',
	Cardinal: 'Cardinal',
	Fixed: 'Fixe',
	Mutable: 'Mutable',
	Car: 'Card',
	Fix: 'Fixe',
	Mut: 'Mut',

	'Chart patterns': 'Aspects composés',
	Dissociate: 'Dissociée',
	'Out of sign: one or more planets sit outside the pattern element or modality, so the theme holds but runs weaker.':
		'Hors signe : une ou plusieurs planètes sortent du même élément ou de la même modalité que la configuration, qui reste donc valable mais agit plus faiblement.',
	'{{percent}} tight': '{{percent}} de précision',
	apex: 'apex',

	'Planet readings': 'Interprétations des planètes',

	Transits: 'Transits',
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
	'House cusps from the response': 'Cuspides de maison issues de la réponse',
	'No house cusps': 'Aucune cuspide de maison',

	'Transit aspect summary': 'Résumé des aspects de transits',
	Strongest: 'Le plus fort',
	Natal: 'Natal',
	Transiting: 'Transit',
	Applying: 'Appliquant',
	Separating: 'Séparant',

	'Every body with its natal position and its position on the transit date, each as a zodiac sign and a degree.':
		'Chaque astre avec sa position natale et sa position à la date du transit, chacune indiquée en signe du zodiaque et en degré.',
	'Both house numbers are read against the natal house cusps.':
		'Les deux numéros de maison se lisent par rapport aux cuspides des maisons natales.',
	Body: 'Astre',
	'Natal house': 'Maison natale',
	'Transiting house': 'Maison transitée',

	'Transit readings': 'Interprétations des transits',
	Impact: 'Effets',
	Timing: 'Durée',
	Guidance: 'Conseils',

	Ephemeris: 'Éphémérides',
	'Signs in this month': 'Signes de ce mois',
	'Sign changes and retrograde periods':
		'Changements de signe et rétrogradations',
	'Daily positions': 'Positions planétaires au quotidien',
	Date: 'Date',
	'Enters {{sign}} on {{date}}': 'Entrée en {{sign}} le {{date}}',
	'Retrograde {{range}}': 'Rétrograde {{range}}',
	'Every body with its position on each day of the month, as a zodiac sign and a degree.':
		'Chaque astre avec sa position à chaque jour du mois, indiquée en signe du zodiaque et en degré.',

	'Nested data omitted': 'Données imbriquées omises',
	'Generic data display': 'Affichage générique de données',
	'Empty list': 'Liste vide',
	'Data table': 'Tableau de données',
	'{{count}} rows': '{{count}} lignes',
	Yes: 'Oui',
	No: 'Non',
	illustration: 'illustration',

	// Human Design identity, shared by `<roxy-bodygraph>` and `<roxy-hd-type-card>`.
	Type: 'Type',
	Strategy: 'Stratégie',
	Authority: 'Autorité',
	Profile: 'Profil',
	Definition: 'Définition',
	Aura: 'Aura',
	'Incarnation cross': 'Incarnation en croix',
	'Signature: {{value}}': 'Signature : {{value}}',
	'Not-self: {{value}}': 'Non-Soi : {{value}}',
	'Profile {{profile}}': 'Profil {{profile}}',
	'Line {{line}} · Personality': 'Ligne {{line}} · Personnalité',
	'Line {{line}} · Design': 'Ligne {{line}} · Design',
	Personality: 'Personnalité',
	Design: 'Design',

	// `<roxy-bodygraph>`.
	Bodygraph: 'Bodygraph',
	'Human Design bodygraph': 'Bodygraph du Design Humain',
	'Human Design bodygraph with nine centers, channels, and activated gates overlaid on a human silhouette':
		'Bodygraph du Design Humain avec neuf centres, canaux et portes activées superposés à une silhouette humaine',
	'Nine energy centers in their canonical positions over a human silhouette, each filled with its traditional color when defined and outlined when open, wired by channels between activated gates.':
		'Neuf centres énergétiques à leurs positions canoniques sur une silhouette humaine, chacun rempli de sa couleur traditionnelle quand il est défini et juste contouré quand il est ouvert, reliés par des canaux entre portes activées.',
	'Center colors when defined. Open centers are outlined.':
		'Couleur des centres définis. Les centres ouverts sont juste contourés.',
	'Open center': 'Centre ouvert',
	'Defined channels ({{count}})': 'Canaux définis ({{count}})',
	'{{circuit}} circuit': 'Circuit {{circuit}}',
	'Centers ({{defined}} defined, {{open}} open)':
		'Centres ({{defined}} définis, {{open}} ouverts)',
	Defined: 'Défini',
	Open: 'Ouvert',
	Motor: 'Moteur',
	Awareness: 'Conscience',
	'Not-self question': 'Question du Non-Soi',
	Biology: 'Biologie',
	'Gates {{gates}}': 'Portes {{gates}}',
	'Activations ({{count}})': 'Activations ({{count}})',
	'Chart sides': 'Côtés du thème',
	'Line {{line}}': 'Ligne {{line}}',
	'Gate {{gate}}': 'Porte {{gate}}',
	'I Ching hexagram {{number}}': 'Hexagramme {{number}} du Yi-King',

	// `<roxy-hd-type-card>`, on top of the shared identity block above.
	'Personality line': 'Ligne Personnalité',
	'Design line': 'Ligne Design',
	Lines: 'Lignes',

	// `<roxy-hd-variables>`.
	Variables: 'Variables',
	'Human Design variables': 'Variables du Design Humain',
	'Low confidence: a birth time near a color or tone boundary. Verify the exact birth time.':
		'Confiance faible : heure de naissance en limite de couleur ou de ton. Heure de naissance exacte à vérifier.',
	'Low confidence: a birth time near a color or tone boundary (within {{margin}}°). Verify the exact birth time.':
		'Confiance faible : heure de naissance en limite de couleur ou de ton (à {{margin}}° près). Heure de naissance exacte à vérifier.',
	'Color {{color}} · Tone {{tone}} · Base {{base}}':
		'Couleur {{color}} · Ton {{tone}} · Base {{base}}',
	'Knife-edge: could flip with a more precise birth time.':
		'Sur le fil du rasoir : pourrait basculer avec une heure de naissance plus précise.',
	Base: 'Base',
	Color: 'Couleur',
	Tone: 'Ton',
	Direction: 'Direction',
	Cognition: 'Cognition',

	// `<roxy-reference-card>`.
	Reference: 'Référence',

	// The FORM path (`<roxy-endpoint-form>` and the `<roxy-location-search>` it slots). What a
	// visitor reads BEFORE any card renders. Field labels and enum options are `humanize()` over
	// spec field names and are deliberately absent: no catalogue keyed on English source text can
	// reach a string computed per operation. The GROUP names below are the exception, because the
	// spec has nine of them rather than 909.
	'Birth location': 'Lieu de naissance',
	'{{group}} location': 'Lieu de {{group}}',
	'City of birth': 'Ville de naissance',
	'{{group}} city': 'Ville de {{group}}',
	'Person 1': 'Personne 1',
	'Person 2': 'Personne 2',
	'Person A': 'Personne A',
	'Person B': 'Personne B',
	'Birth Data': 'Données de naissance',
	Birth: 'Naissance',
	Relocation: 'Destination',
	'Domain Weights': 'Pondération des domaines',
	'Fills {{fields}}. Pick a city to autofill.':
		'Remplit {{fields}}. Choisissez une ville pour le remplissage automatique.',
	Choose: 'Choisir',
	'Comma separated': 'Séparés par des virgules',
	Advanced: 'Avancé',
	'Please complete:': 'Veuillez renseigner :',
	'Search city': 'Rechercher une ville',
	'No cities found': 'Aucune ville trouvée',
	Compare: 'Comparer',
	Cast: 'Tirer',
	'Get reading': 'Obtenir une interprétation',
	Generate: 'Générer',
	'Schema load failed: {{message}}':
		'Échec du chargement du schéma : {{message}}',
	'Endpoint {{method}} {{path}} not found in OpenAPI spec':
		'Point de terminaison {{method}} {{path}} introuvable dans la spécification OpenAPI',
	'HTTP error {{status}}': 'Erreur HTTP {{status}}',
	Retry: 'Réessayer',
	'Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side.':
		'Les composants côté client acceptent uniquement une clé publiable pk_. Utilisez une clé publiable avec une liste des origines autorisées, ou effectuez le rendu côté serveur.',
	Severity: 'Gravité',
	Remedies: 'Remèdes',
	Exceptions: 'Exceptions',
	'Dream symbol': 'Symbole onirique',
	'Dream symbols': 'Symboles oniriques',
	'{{count}} matches': '{{count}} résultats',
	Hora: 'Hora',
	'Hora periods': 'Heures planétaires',
	'Vedic kundli': 'Thème védique',
	'Vedic birth chart with twelve sign houses':
		'Thème natal védique à douze maisons de signe',
	'Angel number': 'Nombre angélique',
	'Digit root': 'Racine numérique',
	'Action steps': 'Étapes à suivre',
	Colors: 'Couleurs',
	Keywords: 'Mots-clés',
	'Pairs with': 'À associer avec',
	Vargottama: 'Vargottama',
	'Vargottama planets': 'Planètes vargottama',
	'{{chart}} divisional chart with twelve sign houses':
		'Thème divisionnel {{chart}} à douze maisons de signe',
	'Sidereal frame: {{frame}}': 'Cadre sidéral : {{frame}}',
	'Sidereal frame: {{frame}}, {{degrees}}° subtracted':
		'Cadre sidéral : {{frame}}, {{degrees}}° soustraits',
	Day: 'Jour',
	Night: 'Nuit',
	Planet: 'Planète',
	Hardness: 'Dureté',
	Vibration: 'Vibration',
	Birthstone: 'Pierre de naissance',
	Chakras: 'Chakras',
	Zodiac: 'Zodiaque',
	Elements: 'Éléments',
	Spiritual: 'Spirituel',
	Emotional: 'Émotionnel',
	Physical: 'Physique',
	Master: 'Maître',
	'Master number': 'Nombre maître',
	'Birth day profile': 'Profil du jour de naissance',
	'Lucky associations': 'Correspondances porte-bonheur',
	Missing: 'Manquant',
	'No numbers are missing from the birth name.':
		'Aucun nombre ne manque dans le nom de naissance.',
	'How to overcome': 'Comment la surmonter',
	'Karmic lessons': 'Leçons karmiques',
	Debt: 'Dette',
	Challenge: 'Défi',
	Resolution: 'Résolution',
	'Karmic debt': 'Dette karmique',
	'Personal year': 'Année personnelle',
	Pinnacles: 'Pinacles',
	Lesson: 'Leçon',
	Challenges: 'Défis',
	'Name numbers': 'Nombres du nom',
	'Name letters': 'Lettres du nom',
	'Personal month': 'Mois personnel',
	'Calendar month': 'Mois calendaire',
	Maturity: 'Maturité',
	'Current age': 'Âge actuel',
	Activates: 'Active',
	Element: 'Élément',
	'Ruling planet': 'Planète maîtresse',
	Gemstones: 'Pierres précieuses',
	Compatible: 'Compatible',
	Incompatible: 'Incompatible',
	'Life Path': 'Chemin de vie',
	Expression: 'Expression',
	'Soul Urge': 'Nombre intime',
	'Birth Day': 'Nombre du jour de naissance',
	'Daily Number': 'Nombre du jour',
	'Personal Day': 'Jour personnel',
	'Numerology chart': 'Thème numérologique',
	Panchang: 'Panchang',
	'Auspicious muhurtas': 'Muhurtas favorables',
	'Inauspicious periods': 'Périodes défavorables',
	'Next transitions': 'Prochaines transitions',
	'None today': 'Aucun ce jour',
	'Bhadra (Vishti)': 'Bhadra (Vishti)',
	Panchaka: 'Panchaka',
	'Favorable Moon signs': 'Signes lunaires favorables',
	'Favorable birth nakshatras': 'Nakshatras de naissance favorables',
	'Unfavorable birth nakshatras': 'Nakshatras de naissance défavorables',
	'Chandrabalam and Tarabalam': 'Chandrabalam et Tarabalam',
	None: 'Aucun',
	'Moon sign': 'Signe lunaire',
	'Sun sign': 'Signe solaire',
	'Sun nakshatra': 'Nakshatra solaire',
	'Amrit Kalam': 'Amrit Kalam',
	'Dur Muhurta': 'Dur Muhurta',
	Varjyam: 'Varjyam',
	Sunrise: 'Lever du soleil',
	Sunset: 'Coucher du soleil',
	Moonrise: 'Lever de la lune',
	Moonset: 'Coucher de la lune',
	Sun: 'Soleil',
	Moon: 'Lune',
	'Ashtama Chandra rashi': 'Ashtama Chandra rashi',
	'{{sign}} until {{time}}': '{{sign}} avant {{time}}',
	'{{sign}} until {{time}}, then {{next}}':
		'{{sign}} avant {{time}}, puis {{next}}',
	'{{range}} (ends {{date}})': '{{range}} (fin {{date}})',
	Tithi: 'Tithi',
	Nakshatra: 'Nakshatra',
	Yoga: 'Yoga',
	Karana: 'Karana',
	'ends {{time}}': 'fin {{time}}',
	'ends {{time}} to {{next}}': 'fin {{time}}, puis {{next}}',
	'ends {{time}} to {{next}} pada {{pada}}':
		'fin {{time}}, puis {{next}} pada {{pada}}',
	Strengths: 'Forces',
	'Key aspects': 'Aspects clés',
	'Aspect breakdown': 'Bilan des aspects',
	'Element balance': 'Équilibre des éléments',
	'Forecast digest': 'Aperçu des prévisions',
	'No notable events.': 'Aucun événement notable.',
	'{{count}} events': '{{count}} événements',
	'significance {{value}} of 100': 'importance {{value}} sur 100',
	'I Ching hexagram': 'Hexagramme du Yi King',
	Position: 'Position',
	House: 'Maison',
	Motion: 'Mouvement',
	Formula: 'Formule',
	'°/day': '°/jour',
	'Tarot spread': 'Tirage de tarot',
	'(reversed)': '(renversée)',
	'{{arcana}} arcana': 'Arcanes {{arcana}}',
	Upper: 'Supérieur',
	Lower: 'Inférieur',
	'Changing lines: {{lines}}.': 'Lignes mutantes : {{lines}}.',
	'Becomes hexagram {{number}} {{name}}.':
		'Devient hexagramme {{number}} {{name}}.',
	'{{chakra}} chakra crystals': 'Cristaux du chakra {{chakra}}',
	'{{element}} element crystals': 'Cristaux de l element {{element}}',
	'Crystals for {{sign}}': 'Cristaux pour {{sign}}',
	'{{month}} birthstones': 'Pierres de naissance de {{month}}',
	Crystals: 'Cristaux',
	'Forecast timeline': 'Chronologie des prévisions',
	'No events in this window': 'Aucun événement sur cette période',
	'orb {{value}}°': 'orbe {{value}}°',
	'Guna Milan score': 'Score de Guna Milan',
	Koota: 'Koota',
	Progress: 'Progression',
	Score: 'Points',
	'{{dosha}} cancelled': '{{dosha}} annulé',
	'Moon phase calendar': 'Calendrier des phases lunaires',
	'Current moon phase': 'Phase lunaire actuelle',
	Illumination: 'Illumination',
	Age: 'Âge',
	Sign: 'Signe',
	Distance: 'Distance',
	'{{count}} days': '{{count}} jours',
	'{{value}}k km': '{{value}} mille km',
	'Annual profection': 'Profection annuelle',
	For: 'Pour',
	'Lord of the year': 'Maître de année',
	'What changes at this location': 'Ce qui change en ce lieu',
	'Angular planets here': 'Planètes angulaires ici',
	'Planets that change house': 'Planètes changeant de maison',
	'No planet changes house at this location.':
		'Aucune planète ne change de maison en ce lieu.',
	'Guna Milan breakdown: each koota with the classification of person 1 and person 2, and the score it earned out of its maximum.':
		'Détail du Guna Milan : chaque koota avec le classement de la personne 1 et de la personne 2 et les points obtenus sur le maximum.',
	'{{sign}} · house {{house}}': '{{sign}} · maison {{house}}',
	'{{planet}}: house {{from}} to {{to}}':
		'{{planet}} : maison {{from}} vers {{to}}',
	ASC: 'ASC',
	DSC: 'DS',
	MC: 'MC',
	IC: 'FC',
	PoF: 'PdF',
	Vtx: 'Vtx',
	'Kundli style': 'Style de kundli',
	North: 'Nord',
	South: 'Sud',
	East: 'Est',
	'in {{sign}}': 'en {{sign}}',
	'pada {{n}}': 'pada {{n}}',
	Vara: 'Vara',
	'Tarot card': 'Carte de tarot',
	Upright: 'Droite',
	Reversed: 'Renversée',
	'Card orientation': 'Orientation de la carte',
	Cornerstone: 'Pierre angulaire',
	Capstone: 'Clé de voûte',
	'First vowel': 'Première voyelle',
	'Core numbers': 'Nombres essentiels',
	Lessons: 'Leçons',
	Debts: 'Dettes',
	'Life phases': 'Phases de vie',
	'Obstacle periods': 'Périodes de défi',
	'Letter analysis': 'Analyse des lettres',
	Opportunities: 'Opportunités',
	Asteroids: 'Astéroïdes',
	Houses: 'Maisons',
	'Black Moon Lilith': 'Lune Noire Lilith',
	'{{variant}} apogee': 'Apogée {{variant}}',
	'Solar arc directions': 'Directions par arc solaire',
	Arc: 'Arc',
	'Directed to': 'Dirigé au',
	'Arabic lots': 'Parts arabes',
	Sect: 'Secte',
	Ascendant: 'Ascendant',
	Midheaven: 'Milieu du Ciel',
	'Secondary progressions': 'Progressions secondaires',
	'Progressed to': 'Progressé au',
	Elapsed: 'Écoulé',
	'{{years}} yrs': '{{years}} ans',
	Biblical: 'Biblique',
	Shadow: 'Ombre',
	Readings: 'Lectures',
	Advisories: 'Conseils',
	'Sign compatibility': 'Compatibilité des signes',
	Breakdown: 'Détail',
	'Changing lines': 'Lignes mutantes',
	Dynamics: 'Dynamiques',
	Love: 'Amour',
	Career: 'Carrière',
	Money: 'Argent',
	'Twin flame': 'Flamme jumelle',
	'Western planetary positions': 'Positions planétaires occidentales',
	'Planetary positions': 'Positions planétaires',
	'Western planetary positions: each body with its sign, degree, house and motion.':
		'Positions planétaires occidentales: chaque corps avec son signe, son degré, sa maison et son mouvement.',
	Degree: 'Degré',
	'Vedic aspects': 'Aspects védiques',
	'Chart time {{when}}': 'Heure du thème {{when}}',
	'Sidereal positions': 'Positions sidérales',
	'Mutual aspects': 'Aspects mutuels',
	'Vedic planetary aspects: aspecting planet, aspect type, aspected planet, strength and orb.':
		'Aspects planétaires védiques: planète aspectante, type, planète aspectée, force et orbe.',
	From: 'De',
	Aspect: 'Aspect',
	To: 'Vers',
	Strength: 'Force',
	Orb: 'Orbe',
	'Upagraha positions': 'Positions des upagrahas',
	Upagrahas: 'Upagrahas',
	Upagraha: 'Upagraha',
	'{{group}} upagrahas: each sub-planet with its rashi, degree in sign, sidereal longitude, and nakshatra with pada.':
		'Upagrahas {{group}}: chaque sous-planète avec son rashi, son degré dans le signe, sa longitude sidérale et son nakshatra avec pada.',
	'Time based': 'Fondés sur le temps',
	'From the eightfold division of the day or night, so these depend on the birth time, the place and the weekday.':
		'Issus de la division en huit du jour ou de la nuit, ils dépendent donc du moment de naissance, du lieu et du jour de la semaine.',
	'Sun based': 'Fondés sur le Soleil',
	'The Dhuma group, derived by fixed arc from the Sun. Dhuma is the Sun plus 133 degrees 20 minutes, and each of the rest follows from the one before it.':
		'Le groupe Dhuma, dérivé par arc fixe depuis le Soleil. Dhuma est le Soleil plus 133 degrés 20 minutes, et chacun des autres découle du précédent.',
	Rashi: 'Rashi',
	Longitude: 'Longitude',
	Pada: 'Pada',
	'Nakshatra {{name}}': 'Nakshatra {{name}}',
	'Nakshatra {{number}} of 27': 'Nakshatra {{number}} sur 27',
	Lord: 'Maître',
	Deity: 'Divinité',
	Symbol: 'Symbole',
	Characteristics: 'Caractéristiques',
	'Mantras:': 'Mantras:',
	'Gemstones:': 'Pierres:',
	'Rituals:': 'Rituels:',
	N: 'N',
	NE: 'NE',
	E: 'E',
	SE: 'SE',
	S: 'S',
	SW: 'SO',
	W: 'O',
	NW: 'NO',
	'Local space': 'Espace local',
	'Local space compass': 'Boussole en espace local',
	'Local space compass of planetary directions from the birthplace':
		'Boussole en espace local des directions planétaires depuis le lieu de naissance',
	'A compass centered on the birthplace. Each body is a line pointing to its azimuth, clockwise from north. Bodies below the horizon are dimmed.':
		'Une boussole centrée sur le lieu de naissance. Chaque corps est une ligne pointant vers son azimut, dans le sens horaire depuis le nord. Les corps sous le plan horizontal sont atténués.',
	'Local space directions: each body with its compass direction, azimuth, altitude and whether it sits above or below the horizon.':
		'Directions en espace local: chaque corps avec sa direction, son azimut, sa hauteur et sa position au-dessus ou au-dessous du plan horizontal.',
	'{{planet}} {{direction}} {{azimuth}}° altitude {{altitude}}':
		'{{planet}} {{direction}} {{azimuth}}° hauteur {{altitude}}',
	Azimuth: 'Azimut',
	Altitude: 'Hauteur',
	Horizon: 'Horizon',
	Astrocartography: 'Astrocartographie',
	'Astrocartography world map': 'Carte du monde astrocartographique',
	'World map of planetary astrocartography lines':
		'Carte du monde des lignes planétaires en astrocartographie',
	'Equirectangular world map. Each body has a Midheaven and Imum Coeli meridian and a curved Ascendant and Descendant line, colored per body.':
		'Carte du monde équirectangulaire. Chaque corps a un méridien de Milieu du Ciel et de Fond du Ciel, plus une ligne courbe Ascendant et Descendant, colorée par corps.',
	Birthplace: 'Lieu de naissance',
	'{{planet}} {{angle}} line': 'Ligne {{angle}} de {{planet}}',
	'Solid lines are the Ascendant and Midheaven, dashed are the Descendant and IC.':
		'Les lignes pleines marquent Ascendant et Milieu du Ciel, les pointillées Descendant et Fond du Ciel.',
	'Planetary lines': 'Lignes planétaires',
	Choghadiya: 'Choghadiya',
	'Day muhurta periods': 'Périodes muhurta du jour',
	'Daytime choghadiya': 'Choghadiya de jour',
	'No daytime periods': 'Aucune période de jour',
	'Night muhurta periods': 'Périodes muhurta de la nuit',
	'Nighttime choghadiya': 'Choghadiya de nuit',
	'No nighttime periods': 'Aucune période de nuit',
	Now: 'Maintenant',
	'Time range': 'Plage horaire',
	'Impact:': 'Impact:',
	'Timing:': 'Durée:',
	'Guidance:': 'Conseil:',
	'Chara karakas': 'Chara karakas',
	Atmakaraka: 'Atmakaraka',
	Darakaraka: 'Darakaraka',
	'Chara karakas in descending rank: each office, the graha holding it, its rashi, the degree it holds, the degree that earned the office, and what the office is read for.':
		'Chara karakas par rang décroissant: chaque charge, le graha qui la tient, son rashi, le degré occupé, le degré qui a valu la charge et ce que la charge indique.',
	Office: 'Charge',
	Graha: 'Graha',
	'Ranked on': 'Classé sur',
	'Read for': 'Indique',
	'measured from the end of the sign': 'mesuré depuis la fin du signe',
	'Heliacal visibility': 'Visibilité héliaque',
	'Heliacal rising and setting': 'Lever et coucher héliaques',
	'Whether each graha stands far enough from the Sun to be seen, for {{date}}. The Sun and the nodes never appear here: they have no heliacal event.':
		'Si chaque graha se tient assez loin du Soleil pour être vu, pour {{date}}. Le Soleil et les noeuds ne figurent jamais ici: ils ne connaissent aucun événement héliaque.',
	Visible: 'Visible',
	Invisible: 'Invisible',
	rises: 'se lève',
	sets: 'se couche',
	Rose: 'Levé',
	Set: 'Couché',
	'in the east': 'au levant',
	'in the west': 'au couchant',
	'Visible until it {{event}} {{where}} on {{when}}':
		'Visible, puis {{event}} {{where}} le {{when}}',
	'Invisible until it {{event}} {{where}} on {{when}}':
		'Invisible, puis {{event}} {{where}} le {{when}}',
	'{{event}} {{where}} on {{when}}, with no further event inside the search window':
		'{{event}} {{where}} le {{when}}, sans autre événement dans la fenêtre de recherche',
	'No rising or setting inside the search window, which is normal for a graha far from the Sun':
		'Aucun lever ni coucher dans la fenêtre de recherche, ce qui est normal pour un graha loin du Soleil',
	'{{degrees}}° of time from the Sun against a limit of {{limit}}°':
		'{{degrees}}° de temps depuis le Soleil pour une limite de {{limit}}°',
	'{{degrees}}° of time from the Sun against a limit of {{limit}}°, becoming {{shifted}}° at that event':
		'{{degrees}}° de temps depuis le Soleil pour une limite de {{limit}}°, qui devient {{shifted}}° lors de cet événement',
	'a morning graha, read before sunrise':
		'un graha du matin, lu avant le lever du Soleil',
	'an evening graha, read after sunset':
		'un graha du soir, lu après le coucher du Soleil',
	Aspects: 'Aspects',
	'Aspect list': 'Liste des aspects',
	'Aspect summary': 'Résumé des aspects',
	Patterns: 'Figures',
	'{{status}} · orb {{orb}}° · str {{strength}}':
		'{{status}} · orbe {{orb}}° · force {{strength}}',
	'Number analysis': 'Analyse du nombre',
	'{{count}} digits': '{{count}} chiffres',
	'{{count}} unique': '{{count}} distincts',
	'Digit root {{n}}': 'Racine numérique {{n}}',
	Palindrome: 'Palindrome',
	Repeating: 'Répété',
	'Positive energy': 'Énergie positive',
	'Neutral energy': 'Énergie neutre',
	'Cautionary energy': 'Énergie de vigilance',
	'Where you saw it': 'Où vous avez vu ce nombre',
	'Known angel number': 'Nombre angélique connu',
	'What to do next': 'Que faire ensuite',
	'Foundational digit root': 'Racine numérique de base',
	'Foundational digit root ({{n}})': 'Racine numérique de base ({{n}})',
	'Aspect patterns': 'Figures planétaires',
	Above: 'Au-dessus',
	Below: 'Au-dessous',
	Active: 'Actif',
	'Not yet active': 'Pas encore actif',
	Present: 'Présent',
	Absent: 'Absent',
	'Current phase': 'Phase actuelle',
	'Not compatible': 'Non compatible',
	'Ascendant moves to {{sign}}': 'Ascendant passe en {{sign}}',
	'Ascendant stays in {{sign}}': 'Ascendant reste en {{sign}}',
	'Ascendant changes sign': 'Ascendant change de signe',
	'Ascendant keeps its sign': 'Ascendant garde son signe',
};

registerLocale('fr', fr);
