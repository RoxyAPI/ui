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
 * **`Apex` is a false friend and stays banned.** Astrodienst reserves it for the Sonnenapex, the direction of the solar system's motion: `der Apex - genauer: Sonnenapex - ist der Fluchtpunkt der Bewegung unserer Sonne`, and `da dem Apex kein Himmelskörper entspricht, gilt er in der Astrologie als sensitiver Punkt`. German astrology has an Apex, it sits near 2 degrees Capricorn, and it is not the focal planet of a figure.
 *
 * **The focal planet is `Fokus`, corrected 2026-08-09 from `Spitze`.** Astrodienst leads with it on both figure pages: T-Quadrat, `der dritte Planet steht im Fokus (Brennpunkt) und trägt gewissermaßen die Spannung zwischen den beiden Planeten in Opposition aus`; Yod-Figur, `im Brennpunkt befindet sich derjenige Planet, auf den die beiden Quinkunxe zulaufen`. `Spitze` was defensible German and was ALSO this file's word for a house cusp (`Spitze des ersten Hauses`, `Häuserspitzen`), so one file was asking a reader to hold two senses of it. `Brennpunkt` is the same concept at ten characters if the chip ever has room.
 *
 * **The claim that `Aspektarium` is a reference book was wrong and is corrected here.** There is no Astrowiki article for it, so that rejection had no basis; shipping German astrology software uses it for the aspect GRID graphic (AstroWorx, `Aspekte als Aspektarium-Grafik und als sortierbare Liste`). `Aspekttabelle` still wins, but on transparency rather than on correctness: it needs no gloss.
 *
 * **`Über die Zeichengrenze` replaced `Zeichenfremd` in the out-of-sign sentence, also 2026-08-09.** `Zeichenfremd` returned no attestation anywhere; German states this as a boundary, per Astrowiki Dissoziierter Aspekt: `zu einem dissoziierten Aspekt kommt es, wenn die beiden an einem Aspekt beteiligten Planeten in der Nähe der Zeichengrenze stehen`. The `Dissoziiert` chip above it is a genuine term of art and does not move.
 *
 * **`Veränderlich` is spelled with the umlaut here and the API spells it `Veraenderlich`.** Astrowiki Qualität: `die drei Qualitäten sind: kardinal, fix und veränderlich`. Every other German string the API serves keeps its umlaut (`Schütze`, `Löwe`), so the modality table alone is de-umlauted and that is an API defect, not a catalogue choice. `tests/i18n.test.ts` pins every other element and modality to the API word and carries this one pair as a declared exception; delete the exception when the API is fixed. `Beweglich` is a fully attested synonym (Astrowiki lists it) and `Flexibel` is not; `labil` is attested and explicitly discouraged by the source for its negative connotation. If the full word ever changes to `Beweglich`, the `Mut` abbreviation must change to `Bew` in the same edit.
 *
 * `Kard` and `Verä` for the cross-tab columns are ours: neither Astrodienst nor AstroWorx abbreviates the qualities anywhere, they print all three in full. `Fix` needs no abbreviation because it IS the German word. `Kardinal` is uninflected because a bare column label takes the citation form; `kardinale` only ever appears in front of a noun (`das kardinale Kreuz`, `kardinale Häuser`).
 *
 * One term verified and deliberately not changed: `Herausfordernd` for the challenging aspect class. It is genuine German astrological wording (Astrowiki Analytischer Aspekt glosses the Ring term as `spannungsreich, herausfordernd`), though the conventional counterpart to `harmonisch` in a two-way split is `gespannt`. Both read correctly; this is register, not meaning.
 *
 * **`Radix` and `Geburtshoroskop` are both used, deliberately.** The short label positions (table columns, legend chips, the ring word in a tooltip) take `Radix`, which is what German astrologers write beside a value; the running prose keeps `Geburtshoroskop`. German switches between the two exactly this way.
 *
 * **`Bi-wheel` has no German astrological term.** Verified negatively: the Astrowiki fulltext search returns zero results for `Doppelrad`, `Doppelkreis` and `Bi-Wheel`, and German names this chart by what it contains (`Geburtshoroskop mit Transiten`) rather than by its two rings. Nothing was invented: the two entries needing it are built on `Horoskopzeichnung`, the word the Astrowiki uses for the drawing itself, plus the plain descriptive `mit zwei Ringen`.
 *
 * Rejected against sources, so nobody restores them: `zunehmend`/`abnehmend` for applying and separating (those are the waxing and waning MOON), `Zeichenrad` and `Tierkreisrad` for the sign wheel (zero German astrological usage), `äquale Häuser` for the equal-sector fallback (that names a house SYSTEM, and the fallback fires precisely when the response named none), and `Radixhaus`/`Transithaus` for the house columns (unattested, and `Transithaus` actively misreads as a house of the transit chart rather than the natal house being passed through).
 *
 * ## Human Design
 *
 * **The API is the first source, checked before any external site.** `packages/human-design/src/locales/de.ts` already ships German prose for the same concepts these labels sit above, so this file spends the same words rather than a dictionary's: `Bodygraph` untranslated, sixteen times inline (`im Bodygraph ist diese Drüse die Quelle des Drucks`, `das offene Bodygraph jeden Tag in einer anderen Konfiguration`, `im gesamten Bodygraph`), which settles the card title before any Human Design site does. `Bewusstsein` for the awareness chip is the same pairing: the API names channel 61-24 `Bewusstsein` and writes `ohne ein Bewusstseinszentrum dazwischen`. `Seite` for a chart side is the API's word too (`Die bewusste Seite, schwarz gedruckt`, `Die unbewusste Seite, rot gedruckt`), which is why `Chart sides` compounds onto it rather than onto a community synonym.
 *
 * **Five entries match their English source and are declared identical.** `Definition` (irisvanbebber.com Glossar: `Die Definition beschreibt wie unsere definierten Zenter über die aktivierten Kanäle miteinander verbunden sind`, matching the API's own `Einfach`/`Gespalten` values one row below), `Aura` (irisvanbebber.com, `Die Aura ist das energetische Feld rund um deinen Körper. Nach Human Design hat jeder Energietyp eine jeweils etwas anders beschaffene Aura`), `Motor` (institut-humandesign.com, `Motorenzentren`, `vier spezifische Zentren, die als Motorenzentren bekannt sind`; irisvanbebber.com, `Motor-Zenter`), `Design` as the chart-side tab (irisvanbebber.com, `Design(seite)`; humandesign-tribe.com, `die Linie der Designseite`), and `Bodygraph` per the API citation above. Community sites confirm German never coins a replacement for any of the five; the values printed beside them (`Einfach`, `Sakral`, `Persönlichkeit`/`Design`) disambiguate the same way the API's own prose already does.
 *
 * **`Typ`, `Strategie`, `Autorität`, `Profil` are the bare community nouns, not the fuller phrases they are often introduced with.** humandesignsystem-bremen.de titles a page `Typ / Strategie und Autorität`; irisvanbebber.com's glossary heads separate entries `Autorität`, `Strategie` and `Profil` and cross-refers `Typ` to `Energietyp`; humandesign-coaching.com's Minilexikon uses all four bare in running prose (`Deine Strategie leitet sich aus deinem Typ ab`, `Wie ein innerer Kompass zeigt dir die Autorität`). `Autorität` alone, not `Innere Autorität`, because the tile also prints `Mental` and `Lunar`, two of the API's seven authority values that read false under an `innere` qualifier baked into the label itself.
 *
 * **`Signatur` and `Nicht-Selbst` are the printed German, matching the API's own `signatures`/`notSelfKeynotes` values one row below the pill.** irisvanbebber.com: `Die Signatur ist genau der Zustand ... wenn du im Einklang mit deinem Typ ... lebst`; humandesign-coaching.com: `Nicht-Selbst-Thema`, `Frustration bei Generatoren, Verbitterung bei Projektoren`. `Inkarnationskreuz` is irisvanbebber.com (`Das Inkarnationskreuz stellt deine Lebensaufgabe dar`) and humandesignkosmos.de (`Das Inkarnationskreuz enthält Informationen über den Sinn unseres Lebens`).
 *
 * **`Definiert`/`Offen`, `Zentren`, `Kanäle`, `Tore`, `Aktivierungen` and `Biologie` are the community's and the API's shared vocabulary for the bodygraph accordion**, all independently attested: ilkapricker.de and humandesignkosmos.de both run `definiert`/`offen` as the standing pair for a center's two states; irisvanbebber.com defines `Kanal` (`Die Verbindung von zwei Zentren über jeweils zwei einander gegenüber liegende Tore`) and `Tor` (`In den einzelnen Zentern sind jeweils mehrere Tore vorhanden. Insgesamt gibt es 64 Tore`); humandesign-coaching.com heads a section `Die 9 Energie-Zentren`, which is where `energy centers` gets `Energiezentren` rather than a shorter `Zentren`. `Biologie` mirrors the API's own `biologische Entsprechungen` (irisvanbebber.com, Zenter entry) for the gland/organ sentence the label sits above. `Schaltkreis` for circuit is irisvanbebber.com (`den individuellen Schaltkreis, den Stammes-Schaltkreis, den kollektiven Schaltkreis`). The API's `circuits` map ships the bare nouns `Individuell` / `Kollektiv` / `Stamm` (not the community's inflected `individuellen`/`Stammes-`/`kollektiven`), so `{{circuit}} circuit` is worded `Schaltkreis: {{circuit}}` rather than forcing agreement onto a value the component does not control; it reuses the label-colon-value shape `Signature: {{value}}` and `Not-self: {{value}}` already establish two rows up.
 *
 * **`I-Ging-Hexagramm` is the German Wikipedia's own compound, not this file's invention**: the Unicode block of hexagram glyphs is titled, in German, `Unicodeblock I-Ging-Hexagramme`. `I Ging` alone (no hyphen) is attested by both the same article (`frühere deutsche Transkription: I Ging`) and by humandesign-coaching.com (`64 Hexagramme des chinesischen I Ging`); the hyphenated compound form is what appears the moment a second noun is appended, exactly as it is here.
 *
 * **The Variables card sources from Amaya Blanco Alzola's German counterpart in structure: three PHS-specific German course providers, cross-checked against the API's own `layerDescriptions` text.** `Farbe`, `Ton`, `Basen` (plural; `Basis` is this file's own singular, argued below) run through howimetmyhumandesign.de's own module list (`Die Farben des Körpers`, `Die Töne des Körpers`, `Die Basen`) and humandesign-system.ch's PHS course outline (`Die Verschiebung der Farben`, `Die Fixierung der Farben auf Tonebene`). `Kognition` is the same humandesign-system.ch page (`Die Kognition – die spezifischen Sensoren des Körpers`, `Potenzial Ihrer Kognition (spezifischen Wahrnehmung)`) corroborated by howimetmyhumandesign.de (`Den individuellen Kognitionstyp bestimmen`). `Richtung` for the arrow direction is howimetmyhumandesign.de's own `Pfeilrichtung`, matching the API's `Oben links`/`Unten rechts` position labels one section up. The two `Low confidence` sentences and the `Zentrum`-scoped `Base`/`Color`/`Tone` labels all echo `Farb- oder Tongrenze` deliberately, the same cross-string agreement `es.ts` builds around `límite de Color o de Tono`.
 *
 * **`Basis`, not `Base`, for the finest substructure layer.** Every source above attests only the plural `Basen`, which is the correct plural of BOTH `die Basis` (foundation, the sense this layer needs) and `die Base` (a chemistry alkali): German splits what English spells one way. `Basis` is chosen on the concept, not the cognate: the API's own `baseNames` (`Reaktiv`, `Integrativ`, `Objektiv`, `Progressiv`, `Subjektiv`) describe a foundational disposition, never a substance, and `die Basis` is the ordinary German word for a foundational layer everything else is built on. No source directly attests the singular in this technical sense; flagged below for a practitioner pass.
 *
 * **`Lexikon` replaces the Spanish catalogue's `Referencia` for the generic glossary card, and the two languages part ways on purpose.** Duden's first two senses of `Referenz` are a professional's recommendation and the person who gives one (`die Bewerberin hat gute Referenzen aufzuweisen`, `darf ich Sie als Referenz angeben`); a kicker reading `REFERENZ` over `Widder` risks the exact class of misreading lesson 32 describes, just in German rather than Spanish. `Lexikon` is what German astrology already titles this precise content, a per-term glossary of signs, aspects and points: kernastro.de runs `Astrologie Lexikon - Fachbegriffe zur Astrologie` with entries like `Aszendent` and `Applikation`; telectron.de runs `Das große TI Lexikon der Astrologie` (`Was bedeutet was in der Astrologie? Schlagen Sie nach`) with entries for `Widder`, `Aszendent`, `Deszendent`. It reads correctly both as the kicker above a title and as the fallback title on its own.
 *
 * **Three entries are the plainest defensible German rather than a single attested compound, and want a native practitioner pass**, each built from two independently-sourced components rather than found whole: `Nicht-Selbst-Frage` for the not-self question (simis.at prints `Nicht-Selbst-Themen` and frames the open-center prompts as a `Liste von Fragen`; humandesignkosmos.de and irisvanbebber.com both attest `Nicht-Selbst` as the stem); `Chartseiten` for the tab list (built on the API's own `Seite` plus the community's `-seite` suffix pattern, `Designseite`/`Persönlichkeitsseite`, neither source compounds it with `Chart` directly); `Persönlichkeitslinie`/`Designlinie` for the two profile-line fact tiles (humandesign-tribe.com writes `Linie der Persönlichkeitsseite`/`Linie der Designseite` as a phrase, never as one compound word, though German compounding it onto a single noun is the ordinary move and matches how `Chartseiten` above is built from the same `Seite` stem).
 *
 * **`Grenzfall` for the knife-edge warning has no attested German Human Design idiom**; searches for `auf der Kippe` and similar returned birth-time-precision advice but never a fixed phrase for a Color/Tone boundary. `Grenzfall` (borderline case) is plain, unambiguous German chosen to echo `Grenze` in the two `Low confidence` sentences immediately around it, the same deliberate cross-reference `es.ts` makes with `límite`.
 *
 * Rejected against sources, so nobody restores them: `Referenz` for the glossary card (attested German, but its dominant sense is a professional's recommendation, not a lookup entry); `Innere Autorität` for the authority tile (attested and common, but false for the API's `Mental` and `Lunar` values); `Base` for the PHS substructure layer (the wrong homograph, a chemistry alkali); `Körpergrafik` for the bodygraph card (real and widespread, beaten by the API's own sixteen inline uses of `Bodygraph`); and `Zenter` for center, which several community sites use but the API and this catalogue both spell `Zentrum`/`Zentren`. *
 * ## Monthly ephemeris
 *
 * **`Ephemeriden` for the card and `Planetenstände` for the table, which is the split German astrology actually uses.** astrologie-schule.com publishes the tables under `Ephemeriden 2026` and calls the grid itself an `Ephemeridentabelle`; `Planetenstände` is the unanimous German heading over a positions table and `Tagespositionen` returned no heading attestation at all, so `Tägliche Planetenstände` keeps the attested head noun and carries the daily sense in a modifier. `Aktuelle Planetenstände` is attested and was rejected because it means CURRENT, which is wrong over a whole month.
 *
 * **`Zeichenwechsel` is settled by Astrodienst, which lists it as the synonym of the loanword**: astro.com/astrowiki/de/Ingress opens `Als "Ingress" bezeichnet man den Eintritt eines Planeten in ein neues Tierkreiszeichen` and gives `Synonym: Zeichenwechsel`. **`Ingresse` is rejected outright**, and the proof is that a German astrology portal glossary resolves the word to the mobile game (astroportal.com/wiki/ingress: `Ingress ist ein Spiel, das von Niantic entwickelt wurde`). `Rückläufigkeiten` is the same page family: astro.com/astrowiki/de/Rückläufigkeit heads its table columns `Beginn Rückläufigkeit (UT)` and `Ende Rückläufigkeit (UT)`. `Rücklauf` was rejected because DWDS gives it as the return rate of questionnaires.
 *
 * **`Wechsel in das Zeichen {{sign}}` exists because the obvious phrasing cannot be templated.** German ingress prose puts the sign in a gendered article and two of the twelve are weak nouns, so `wechselt in den Löwen` and `zum Schützen` inflect the very word the UI substitutes. Article-free calendar rows are the way out: mondrausch.com prints all twelve as `Sternzeichenwechsel Krebs → Löwe` and `Sternzeichenwechsel Skorpion → Schütze`, and astroschmid.ch uses the column header `Zeichenwechsel` with cells reading `Mond in Löwe`. Putting the sign in apposition to the neuter `Zeichen` keeps every one of the twelve in bare nominative. Both halves are attested (astro-mentoring.de, `in das erste Tierkreiszeichen Widder eintritt`; universumspost.de, `verlässt ... das Zeichen Fische`). `Eintritt {{sign}}` and `Wechsel zu {{sign}}` were rejected: the first is attested only with a preposition and an article, the second takes the dative and reintroduces `zum Löwen`.
 *
 * `Datum` is the plain column header. `Termine` was rejected for this slot: it is correct over a list of dated EVENTS, which is how astro.com/astrowiki/de/Rückläufigkeit uses it in `Zeiträume und Termine`, and wrong as the header of a column of calendar dates.
 *
 * Two of the eight are COMPOSED rather than lifted, because no astrology page publishes an empty state or a screen-reader caption: `Keine Ephemeridendaten` follows this file's other empty states and the table caption is the transit caption above it with the month clause swapped in.
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

	Fire: 'Feuer',
	Earth: 'Erde',
	Air: 'Luft',
	Water: 'Wasser',
	Cardinal: 'Kardinal',
	Fixed: 'Fix',
	Mutable: 'Veränderlich',
	Car: 'Kard',
	Fix: 'Fix',
	Mut: 'Verä',

	'Chart patterns': 'Aspektfiguren',
	Dissociate: 'Dissoziiert',
	'Out of sign: one or more planets sit outside the pattern element or modality, so the theme holds but runs weaker.':
		'Über die Zeichengrenze: ein oder mehrere Planeten liegen außerhalb von Element oder Qualität der Figur, das Thema bleibt also bestehen, wirkt aber schwächer.',
	'{{percent}}% tight': '{{percent}}% genau',
	apex: 'Fokus',

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
	'House cusps from the response': 'Aus der Antwort übernommene Häuserspitzen',
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

	Ephemeris: 'Ephemeriden',
	'No ephemeris data': 'Keine Ephemeridendaten',
	'Sign changes and retrograde periods': 'Zeichenwechsel und Rückläufigkeiten',
	'Daily positions': 'Tägliche Planetenstände',
	Date: 'Datum',
	'Enters {{sign}} on {{date}}': 'Wechsel in das Zeichen {{sign}} am {{date}}',
	'Retrograde {{range}}': 'Rückläufig {{range}}',
	'Every body with its position on each day of the month, as a zodiac sign and a degree.':
		'Jeder Himmelskörper mit seiner Position an jedem Tag des Monats, als Tierkreiszeichen und Grad.',

	'Nested data omitted': 'Verschachtelte Daten ausgelassen',
	'Generic data display': 'Generische Datenanzeige',
	'Empty list': 'Leere Liste',
	'Data table': 'Datentabelle',
	'{{count}} rows': '{{count}} Zeilen',
	Yes: 'Ja',
	No: 'Nein',
	illustration: 'Illustration',

	Type: 'Typ',
	Strategy: 'Strategie',
	Authority: 'Autorität',
	Profile: 'Profil',
	Definition: 'Definition',
	Aura: 'Aura',
	'Incarnation cross': 'Inkarnationskreuz',
	'Signature: {{value}}': 'Signatur: {{value}}',
	'Not-self: {{value}}': 'Nicht-Selbst: {{value}}',
	'Profile {{profile}}': 'Profil {{profile}}',
	'Line {{line}} · Personality': 'Linie {{line}} · Persönlichkeit',
	'Line {{line}} · Design': 'Linie {{line}} · Design',
	Personality: 'Persönlichkeit',
	Design: 'Design',

	Bodygraph: 'Bodygraph',
	'No bodygraph data': 'Keine Bodygraph-Daten',
	'Human Design bodygraph': 'Human-Design-Bodygraph',
	'Human Design bodygraph with nine centers, channels, and activated gates overlaid on a human silhouette':
		'Human-Design-Bodygraph mit neun Zentren, Kanälen und aktivierten Toren über einer menschlichen Silhouette',
	'Nine energy centers in their canonical positions over a human silhouette, each filled with its traditional color when defined and outlined when open, wired by channels between activated gates.':
		'Neun Energiezentren in ihren kanonischen Positionen über einer menschlichen Silhouette, jedes bei Definition in seiner traditionellen Farbe gefüllt und bei Offenheit nur umrandet, verbunden durch Kanäle zwischen aktivierten Toren.',
	'Center colors when defined. Open centers are outlined.':
		'Farben der Zentren bei Definition. Offene Zentren sind nur umrandet.',
	'Open center': 'Offenes Zentrum',
	'Defined channels ({{count}})': 'Definierte Kanäle ({{count}})',
	'{{circuit}} circuit': 'Schaltkreis: {{circuit}}',
	'Centers ({{defined}} defined, {{open}} open)':
		'Zentren ({{defined}} definiert, {{open}} offen)',
	Defined: 'Definiert',
	Open: 'Offen',
	Motor: 'Motor',
	Awareness: 'Bewusstsein',
	'Not-self question': 'Nicht-Selbst-Frage',
	Biology: 'Biologie',
	'Gates {{gates}}': 'Tore {{gates}}',
	'Activations ({{count}})': 'Aktivierungen ({{count}})',
	'Chart sides': 'Chartseiten',
	'Line {{line}}': 'Linie {{line}}',
	'Gate {{gate}}': 'Tor {{gate}}',
	'I Ching hexagram {{number}}': 'I-Ging-Hexagramm {{number}}',

	'No Human Design data': 'Keine Human-Design-Daten',
	'Personality line': 'Persönlichkeitslinie',
	'Design line': 'Designlinie',
	Lines: 'Linien',

	Variables: 'Variablen',
	'No variables data': 'Keine Variablendaten',
	'Human Design variables': 'Human-Design-Variablen',
	'Low confidence: a birth time near a color or tone boundary. Verify the exact birth time.':
		'Geringe Sicherheit: eine Geburtszeit nahe einer Farb- oder Tongrenze. Überprüfen Sie die genaue Geburtszeit.',
	'Low confidence: a birth time near a color or tone boundary (within {{margin}}°). Verify the exact birth time.':
		'Geringe Sicherheit: eine Geburtszeit nahe einer Farb- oder Tongrenze (innerhalb von {{margin}}°). Überprüfen Sie die genaue Geburtszeit.',
	'Color {{color}} · Tone {{tone}} · Base {{base}}':
		'Farbe {{color}} · Ton {{tone}} · Basis {{base}}',
	'Knife-edge: could flip with a more precise birth time.':
		'Grenzfall: könnte sich bei einer präziseren Geburtszeit noch ändern.',
	Base: 'Basis',
	Color: 'Farbe',
	Tone: 'Ton',
	Direction: 'Richtung',
	Cognition: 'Kognition',

	Reference: 'Lexikon',
	'No reference data': 'Keine Lexikondaten',
};

registerLocale('de', de);
