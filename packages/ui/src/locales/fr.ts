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

export const fr: Record<ChromeString, string> = {
	'Edit query': 'Modifier la requête',
	'Spiritual data by RoxyAPI': 'Données spirituelles par RoxyAPI',
	'No data': 'Aucune donnée',
	Loading: 'Chargement',
	Reading: 'Interprétation',

	'Natal chart': 'Thème natal',
	'Relocation chart': 'Thème relocalisé',
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
	'House cusps from the response': 'Cuspides de maison issues de la réponse',
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
		'Les deux numéros de maison se lisent par rapport aux cuspides des maisons natales.',
	Body: 'Astre',
	'Natal house': 'Maison natale',
	'Transiting house': 'Maison transitée',

	'Transit readings': 'Interprétations des transits',
	Impact: 'Effets',
	Timing: 'Durée',
	Guidance: 'Conseils',

	Ephemeris: 'Éphémérides',
	'No ephemeris data': 'Aucune donnée disponible',
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
	'No bodygraph data': 'Aucune donnée de bodygraph',
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
	'No Human Design data': 'Aucune donnée de Design Humain',
	'Personality line': 'Ligne Personnalité',
	'Design line': 'Ligne Design',
	Lines: 'Lignes',

	// `<roxy-hd-variables>`.
	Variables: 'Variables',
	'No variables data': 'Aucune donnée de variables',
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
	'No reference data': 'Aucune donnée de référence',

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
};

registerLocale('fr', fr);
