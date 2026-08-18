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
 * Every entry below is attested in live German astrology copy rather than machine translated. What follows is the reasoning a maintainer needs; the attestation itself is recorded internally.
 *
 * **`Apex` is a false friend and stays banned.** German astrology already has an Apex, the direction of the solar system's motion near 2 degrees Capricorn, and it is not the focal planet of a figure.
 *
 * **The focal planet is `Fokus`, not `Spitze`.** `Spitze` is defensible German but is ALSO this file's word for a house cusp (`Spitze des ersten Hauses`), so one file was asking a reader to hold two senses of it. `Brennpunkt` is the same concept at ten characters if the chip ever has room.
 *
 * `Aspekttabelle` beats `Aspektarium` for the grid on transparency rather than correctness: both are real, and only one needs no gloss.
 *
 * **`Über die Zeichengrenze` replaced `Zeichenfremd` in the out-of-sign sentence, 2026-08-09.** `Zeichenfremd` has no attestation, and German states this as a boundary. The `Dissoziiert` chip above it is a genuine term of art and does not move.
 *
 * **`Veränderlich` carries its umlaut here while the API serves `Veraenderlich`.** `tests/i18n.test.ts` pins every other element and modality to the API word and carries this one pair as a declared exception; delete the exception once the two agree. `Beweglich` is a fully attested synonym, and if the full word ever changes to it, the `Mut` abbreviation must become `Bew` in the same edit.
 *
 * `Kard` and `Verä` for the cross-tab columns are ours, because German prints all three qualities in full. `Fix` needs no abbreviation because it IS the German word. `Kardinal` is uninflected: a bare column label takes the citation form, where `kardinale` only ever appears in front of a noun.
 *
 * **`Radix` and `Geburtshoroskop` are both used, deliberately.** Short label positions (table columns, legend chips, the ring word in a tooltip) take `Radix`, which is what German astrologers write beside a value; running prose keeps `Geburtshoroskop`.
 *
 * **`Bi-wheel` has no German astrological term**, verified negatively rather than assumed. German names this chart by what it contains rather than by its two rings, so nothing was invented: the two entries needing it are built on `Horoskopzeichnung` plus the plain descriptive `mit zwei Ringen`.
 *
 * Rejected, so nobody restores them: `zunehmend`/`abnehmend` for applying and separating (those are the waxing and waning MOON), `Zeichenrad` and `Tierkreisrad` for the sign wheel (no German astrological usage), `äquale Häuser` for the equal-sector fallback (that names a house SYSTEM, and the fallback fires precisely when the response named none), and `Radixhaus`/`Transithaus` for the house columns (`Transithaus` misreads as a house of the transit chart rather than the natal house being passed through).
 *
 * ## Human Design
 *
 * **The API is the first source, checked before anything else.** Every label here sits above a value the Human Design endpoints already return in German, so this file spends the same word rather than a dictionary's: `Bodygraph` untranslated, `Bewusstsein` for the awareness chip, and `Seite` for a chart side, which is why `Chart sides` compounds onto it rather than onto a synonym.
 *
 * **Five entries match their English source and are declared identical:** `Definition`, `Aura`, `Motor`, `Design` as the chart-side tab, and `Bodygraph`. German coins no replacement for any of the five, and the value printed beside each one disambiguates it.
 *
 * **`Typ`, `Strategie`, `Autorität` and `Profil` are the bare nouns, not the fuller phrases they are often introduced with.** `Autorität` alone, never `Innere Autorität`, because the tile also prints `Mental` and `Lunar`, two of the seven authority values that read false under an `innere` qualifier baked into the label itself.
 *
 * `Signatur`, `Nicht-Selbst` and `Inkarnationskreuz` match the API's own values one row below the pill. `Definiert`/`Offen`, `Zentren`, `Kanäle`, `Tore`, `Aktivierungen` and `Biologie` are the shared vocabulary for the bodygraph accordion, with `Energiezentren` rather than a shorter `Zentren` for the nine. `{{circuit}} circuit` is worded `Schaltkreis: {{circuit}}` rather than forcing agreement onto a value the component does not control, reusing the label-colon-value shape `Signature: {{value}}` already establishes two rows up.
 *
 * **`Basis`, not `Base`, for the finest substructure layer.** The attested plural `Basen` is the plural of BOTH `die Basis` (a foundation, the sense this layer needs) and `die Base` (a chemistry alkali), so German splits what English spells one way. `Basis` is chosen on the concept: the API's own base names describe a foundational disposition, never a substance.
 *
 * **`Lexikon`, where the Spanish catalogue says `Referencia`, and the two languages part ways on purpose.** The first senses of `Referenz` are a professional's recommendation and the person who gives one, so a kicker reading `REFERENZ` over `Widder` invites the wrong reading. `Lexikon` is what German astrology already titles a per-term glossary, and it works both as the kicker above a title and as the fallback title alone.
 *
 * `Grenzfall` for the knife-edge warning is plain German chosen to echo `Grenze` in the two low-confidence sentences around it, the same cross-string agreement `es.ts` builds around `límite`.
 *
 * Three entries are built from two sourced components rather than found whole and want a native practitioner pass: `Nicht-Selbst-Frage`, `Chartseiten` for the tab list, and `Persönlichkeitslinie`/`Designlinie` for the two profile-line tiles.
 *
 * Rejected here too: `Referenz` for the glossary card, `Innere Autorität` for the authority tile (false for `Mental` and `Lunar`), `Base` for the substructure layer (the wrong homograph), `Körpergrafik` for the bodygraph card (real and widespread, beaten by the API's own inline usage), and `Zenter` for a centre, which this catalogue and the API both spell `Zentrum`/`Zentren`.
 *
 * ## Monthly ephemeris
 *
 * **`Ephemeriden` for the card and `Planetenstände` for the table, which is the split German astrology actually uses.** `Planetenstände` is the standard heading over a positions table where `Tagespositionen` has none, so `Tägliche Planetenstände` keeps the attested head noun and carries the daily sense in a modifier. `Aktuelle Planetenstände` is attested and was rejected because it means CURRENT, which is wrong over a whole month.
 *
 * `Datum` is the plain column header. `Termine` was rejected for this slot: it is correct over a list of dated EVENTS and wrong as the header of a column of calendar dates.
 *
 * Two of the eight are COMPOSED rather than lifted, because no astrology page publishes an empty state or a screen-reader caption: `Keine Ephemeridendaten` follows this file's other empty states, and the table caption is the transit caption above it with the month clause swapped in.
 *
 * ## Form group names
 *
 * **Four of the eight are character-identical to the English, and that is what the sources say rather than a gap.** German synastry forms label their two inputs `Geburtsdaten Person 1` and `Geburtsdaten Person 2`, so `Person 1` and `Person 2` are already German; `Person A` and `Person B` keep the same head noun for the Human Design connection form.
 *
 * **`Geburt` and `Relokation` are EVENT nouns on purpose, and the attested place words lost to the colon.** `Geburtsort` and `Zielort` are both better words in isolation and both rejected here, because this file renders the group as `Ort: {{group}}` and either one says Ort twice in one label. If a native pass disagrees, `Zielort` is the documented fallback for the relocation half.
 *
 * **`Lebensbereichsgewichtung` is COMPOSED and deliberately drops `Domänengewichtung`.** German `Domäne` is a computing term or a person's field of expertise, never a name for love, career, health and finance, where `-gewichtung` compounds freely. `Gewichtung der Lebensbereiche` is the better running prose and lost on legend width.
 *
 * `Person A` and `Person B` are the weakest pair here and want a native pass: no German Human Design source uses a letter pair for the two people, though they stay consistent with the letter pair the spec itself draws.
 */

import type { ChromeString } from '../i18n/chrome-strings.js';
import { registerLocale } from '../i18n/registry.js';
import './field-labels/de.js';

export const de: Record<ChromeString, string> = {
	'Edit query': 'Abfrage bearbeiten',
	'Spiritual data by RoxyAPI': 'Spirituelle Daten von RoxyAPI',
	'No data': 'Keine Daten',
	Loading: 'Wird geladen',
	Reading: 'Deutung',

	'Natal chart': 'Geburtshoroskop',
	'Relocation chart': 'Relokationshoroskop',
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
	'{{percent}} tight': '{{percent}} genau',
	apex: 'Fokus',

	'Planet readings': 'Planetendeutungen',

	Transits: 'Transite',
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
	'Signs in this month': 'Zeichen in diesem Monat',
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

	'Personality line': 'Persönlichkeitslinie',
	'Design line': 'Designlinie',
	Lines: 'Linien',

	Variables: 'Variablen',
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

	// The FORM path (`<roxy-endpoint-form>` and the `<roxy-location-search>` it slots). What a
	// visitor reads BEFORE any card renders. Field labels and enum options are `humanize()` over
	// spec field names and are deliberately absent: no catalogue keyed on English source text can
	// reach a string computed per operation. The GROUP names below are the exception, because the
	// spec has nine of them rather than 909.
	'Birth location': 'Geburtsort',
	'{{group}} location': 'Ort: {{group}}',
	'City of birth': 'Geburtsstadt',
	'{{group}} city': 'Stadt: {{group}}',
	'Person 1': 'Person 1',
	'Person 2': 'Person 2',
	'Person A': 'Person A',
	'Person B': 'Person B',
	'Birth Data': 'Geburtsdaten',
	Birth: 'Geburt',
	Relocation: 'Relokation',
	'Domain Weights': 'Lebensbereichsgewichtung',
	'Fills {{fields}}. Pick a city to autofill.':
		'Das füllt {{fields}} aus. Wählen Sie eine Stadt zum automatischen Ausfüllen.',
	Choose: 'Bitte wählen',
	'Comma separated': 'Kommagetrennt',
	Advanced: 'Erweitert',
	'Please complete:': 'Bitte ausfüllen:',
	'Search city': 'Stadt suchen',
	'No cities found': 'Keine Städte gefunden',
	Compare: 'Vergleichen',
	Cast: 'Ziehen',
	'Get reading': 'Deutung anzeigen',
	Generate: 'Berechnen',
	'Schema load failed: {{message}}':
		'Schema konnte nicht geladen werden: {{message}}',
	'Endpoint {{method}} {{path}} not found in OpenAPI spec':
		'Endpunkt {{method}} {{path}} nicht in der OpenAPI-Spezifikation gefunden',
	'HTTP error {{status}}': 'HTTP-Fehler {{status}}',
	Retry: 'Wiederholen',
	'Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side.':
		'Clientseitige Komponenten akzeptieren nur einen veröffentlichbaren pk_-Schlüssel. Verwenden Sie einen veröffentlichbaren Schlüssel mit einer Origin-Allowlist, oder rendern Sie serverseitig.',
	Severity: 'Schweregrad',
	Remedies: 'Abhilfen',
	Exceptions: 'Ausnahmen',
	'Dream symbol': 'Traumsymbol',
	'Dream symbols': 'Traumsymbole',
	'{{count}} matches': '{{count}} Treffer',
	Hora: 'Hora',
	'Hora periods': 'Planetenstunden',
	'Vedic kundli': 'Vedisches Geburtshoroskop',
	'Chandra lagna': 'Chandra lagna',
	'No ascendant in this chart, so the houses are not numbered.':
		'Kein Aszendent in diesem Chart, daher sind die Häuser nicht nummeriert.',
	'Vedic birth chart with twelve sign houses':
		'Vedisches Geburtshoroskop mit zwölf Zeichenhäusern',
	'Angel number': 'Engelszahl',
	'Digit root': 'Quersumme',
	'Action steps': 'Handlungsschritte',
	Colors: 'Farben',
	Keywords: 'Schlüsselwörter',
	'Pairs with': 'Passt zu',
	Vargottama: 'Vargottama',
	'Vargottama planets': 'Vargottama-Planeten',
	'{{chart}} divisional chart with twelve sign houses':
		'Teilungshoroskop {{chart}} mit zwölf Zeichenhäusern',
	'Sidereal frame: {{frame}}': 'Siderischer Rahmen: {{frame}}',
	'Sidereal frame: {{frame}}, {{degrees}}° subtracted':
		'Siderischer Rahmen: {{frame}}, {{degrees}}° abgezogen',
	Day: 'Tag',
	Night: 'Nacht',
	Planet: 'Planet',
	Hardness: 'Härte',
	Vibration: 'Schwingung',
	Birthstone: 'Geburtsstein',
	Chakras: 'Chakren',
	Zodiac: 'Sternzeichen',
	Elements: 'Elemente',
	Spiritual: 'Spirituell',
	Emotional: 'Emotional',
	Physical: 'Körperlich',
	Master: 'Meister',
	'Master number': 'Meisterzahl',
	'Birth day profile': 'Geburtstagsprofil',
	'Lucky associations': 'Glücksentsprechungen',
	Missing: 'Fehlend',
	'No numbers are missing from the birth name.':
		'Im Geburtsnamen fehlt keine Zahl.',
	'How to overcome': 'Wie man sie überwindet',
	'Karmic lessons': 'Karmische Lektionen',
	Debt: 'Schuld',
	Challenge: 'Herausforderung',
	Resolution: 'Auflösung',
	'Karmic debt': 'Karmische Schuld',
	'Personal year': 'Persönliches Jahr',
	Pinnacles: 'Höhepunkte',
	Lesson: 'Lektion',
	Challenges: 'Herausforderungen',
	'Name numbers': 'Namenszahlen',
	'Name letters': 'Namensbuchstaben',
	'Personal month': 'Persönlicher Monat',
	'Calendar month': 'Kalendermonat',
	Maturity: 'Reife',
	'Current age': 'Aktuelles Alter',
	Activates: 'Aktiviert',
	Element: 'Element',
	'Ruling planet': 'Herrscherplanet',
	Gemstones: 'Edelsteine',
	Compatible: 'Kompatibel',
	Incompatible: 'Inkompatibel',
	'Life Path': 'Lebenszahl',
	Expression: 'Ausdruckszahl',
	'Soul Urge': 'Seelenzahl',
	'Birth Day': 'Geburtstagszahl',
	'Daily Number': 'Tageszahl',
	'Personal Day': 'Persönlicher Tag',
	'Numerology chart': 'Numerologie-Chart',
	Panchang: 'Panchang',
	'Auspicious muhurtas': 'Günstige Muhurtas',
	'Inauspicious periods': 'Ungünstige Zeiten',
	'Next transitions': 'Nächste Übergänge',
	'None today': 'Heute keine',
	'Bhadra (Vishti)': 'Bhadra (Vishti)',
	Panchaka: 'Panchaka',
	'Favorable Moon signs': 'Günstige Mondzeichen',
	'Favorable birth nakshatras': 'Günstige Geburtsnakshatras',
	'Unfavorable birth nakshatras': 'Ungünstige Geburtsnakshatras',
	'Chandrabalam and Tarabalam': 'Chandrabalam und Tarabalam',
	None: 'Keine',
	'Moon sign': 'Mondzeichen',
	'Sun sign': 'Sonnenzeichen',
	'Sun nakshatra': 'Sonnen-Nakshatra',
	'Amrit Kalam': 'Amrit Kalam',
	'Dur Muhurta': 'Dur Muhurta',
	Varjyam: 'Varjyam',
	Sunrise: 'Sonnenaufgang',
	Sunset: 'Sonnenuntergang',
	Moonrise: 'Mondaufgang',
	Moonset: 'Monduntergang',
	Sun: 'Sonne',
	Moon: 'Mond',
	'Ashtama Chandra rashi': 'Ashtama Chandra Rashi',
	'{{sign}} until {{time}}': '{{sign}} bis {{time}}',
	'{{sign}} until {{time}}, then {{next}}':
		'{{sign}} bis {{time}}, dann {{next}}',
	'{{range}} (ends {{date}})': '{{range}} (endet {{date}})',
	Tithi: 'Tithi',
	Nakshatra: 'Nakshatra',
	Yoga: 'Yoga',
	Karana: 'Karana',
	'ends {{time}}': 'endet {{time}}',
	'ends {{time}} to {{next}}': 'endet {{time}}, dann {{next}}',
	'ends {{time}} to {{next}} pada {{pada}}':
		'endet {{time}}, dann {{next}} Pada {{pada}}',
	Strengths: 'Stärken',
	'Key aspects': 'Wichtige Aspekte',
	'Aspect breakdown': 'Aspektbilanz',
	'Element balance': 'Elementebalance',
	'Forecast digest': 'Prognoseüberblick',
	'No notable events.': 'Keine nennenswerten Ereignisse.',
	'{{count}} events': '{{count}} Ereignisse',
	'significance {{value}} of 100': 'Signifikanz {{value}} von 100',
	'I Ching hexagram': 'I-Ging-Hexagramm',
	Position: 'Position',
	House: 'Haus',
	Motion: 'Tagesbewegung',
	Formula: 'Formel',
	'°/day': '°/Tag',
	'Tarot spread': 'Tarot-Legung',
	'(reversed)': '(umgekehrt)',
	'{{arcana}} arcana': '{{arcana}} Arkana',
	Upper: 'Oberes',
	Lower: 'Unteres',
	'Changing lines: {{lines}}.': 'Wandelnde Linien: {{lines}}.',
	'Becomes hexagram {{number}} {{name}}.':
		'Wird zu Hexagramm {{number}} {{name}}.',
	'{{chakra}} chakra crystals': '{{chakra}}-Chakra-Kristalle',
	'{{element}} element crystals': '{{element}}-Element-Kristalle',
	'Crystals for {{sign}}': 'Kristalle für {{sign}}',
	'{{month}} birthstones': '{{month}}-Geburtssteine',
	Crystals: 'Kristalle',
	'Forecast timeline': 'Prognose-Zeitleiste',
	'No events in this window': 'Keine Ereignisse in diesem Zeitraum',
	'orb {{value}}°': 'Orbis {{value}}°',
	'Guna Milan score': 'Guna-Milan-Punktzahl',
	Koota: 'Koota',
	Progress: 'Fortschritt',
	Score: 'Punkte',
	'{{dosha}} cancelled': '{{dosha}} aufgehoben',
	'Moon phase calendar': 'Mondphasenkalender',
	'Current moon phase': 'Aktuelle Mondphase',
	Illumination: 'Beleuchtung',
	Age: 'Alter',
	Sign: 'Zeichen',
	Distance: 'Entfernung',
	'{{count}} days': '{{count}} Tage',
	'{{value}}k km': '{{value}} Tsd. km',
	'Annual profection': 'Jahresprofektion',
	For: 'Für',
	'Lord of the year': 'Herr des Jahres',
	'What changes at this location': 'Was sich an diesem Ort ändert',
	'Angular planets here': 'Hier winkelständige Planeten',
	'Planets that change house': 'Planeten mit Hauswechsel',
	'No planet changes house at this location.':
		'An diesem Ort wechselt kein Planet das Haus.',
	'Guna Milan breakdown: each koota with the classification of person 1 and person 2, and the score it earned out of its maximum.':
		'Guna-Milan-Aufstellung: jede Koota mit der Einstufung von Person 1 und Person 2 und der erreichten Punktzahl von der möglichen.',
	'{{sign}} · house {{house}}': '{{sign}} · Haus {{house}}',
	'{{planet}}: house {{from}} to {{to}}':
		'{{planet}}: Haus {{from}} nach {{to}}',
	ASC: 'AC',
	DSC: 'DC',
	MC: 'MC',
	IC: 'IC',
	PoF: 'GP',
	Vtx: 'Vtx',
	'Kundli style': 'Kundli-Stil',
	North: 'Nord',
	South: 'Süd',
	East: 'Ost',
	'in {{sign}}': 'in {{sign}}',
	'pada {{n}}': 'Pada {{n}}',
	Vara: 'Vara',
	'Tarot card': 'Tarotkarte',
	Upright: 'Aufrecht',
	Reversed: 'Umgekehrt',
	'Card orientation': 'Kartenlage',
	Cornerstone: 'Eckstein',
	Capstone: 'Schlussstein',
	'First vowel': 'Erster Vokal',
	'Core numbers': 'Kernzahlen',
	Lessons: 'Lektionen',
	Debts: 'Schulden',
	'Life phases': 'Lebensphasen',
	'Obstacle periods': 'Hindernisphasen',
	'Letter analysis': 'Buchstabenanalyse',
	Opportunities: 'Chancen',
	Asteroids: 'Asteroiden',
	Houses: 'Häuser',
	'Black Moon Lilith': 'Schwarzer Mond Lilith',
	'{{variant}} apogee': 'Apogäum {{variant}}',
	'Solar arc directions': 'Sonnenbogendirektionen',
	Arc: 'Bogen',
	'Directed to': 'Direktion auf',
	'Arabic lots': 'Arabische Punkte',
	Sect: 'Sekte',
	Ascendant: 'Aszendent',
	Midheaven: 'Himmelsmitte',
	'Secondary progressions': 'Sekundärdirektionen',
	'Progressed to': 'Progression auf',
	Elapsed: 'Verstrichen',
	'{{years}} yrs': '{{years}} J.',
	Biblical: 'Biblisch',
	Shadow: 'Schatten',
	Readings: 'Deutungen',
	Advisories: 'Hinweise',
	'Sign compatibility': 'Zeichenkompatibilität',
	Breakdown: 'Aufschlüsselung',
	'Changing lines': 'Wandelnde Linien',
	Dynamics: 'Dynamiken',
	Love: 'Liebe',
	Career: 'Beruf',
	Money: 'Geld',
	'Twin flame': 'Dualseele',
	'Western planetary positions': 'Westliche Planetenpositionen',
	'Planetary positions': 'Planetenpositionen',
	'Western planetary positions: each body with its sign, degree, house and motion.':
		'Westliche Planetenpositionen: jeder Himmelskörper mit Zeichen, Grad, Haus und Bewegung.',
	Degree: 'Grad',
	'Vedic aspects': 'Vedische Aspekte',
	'Chart time {{when}}': 'Horoskopzeit {{when}}',
	'Sidereal positions': 'Siderische Positionen',
	'Mutual aspects': 'Gegenseitige Aspekte',
	'Vedic planetary aspects: aspecting planet, aspect type, aspected planet, strength and orb.':
		'Vedische Planetenaspekte: aspektierender Planet, Aspektart, aspektierter Planet, Stärke und Orbis.',
	From: 'Von',
	Aspect: 'Aspekt',
	To: 'Auf',
	Strength: 'Stärke',
	Orb: 'Orbis',
	'Upagraha positions': 'Upagraha-Positionen',
	Upagrahas: 'Upagrahas',
	Upagraha: 'Upagraha',
	'{{group}} upagrahas: each sub-planet with its rashi, degree in sign, sidereal longitude, and nakshatra with pada.':
		'Upagrahas {{group}}: jeder Nebenplanet mit Rashi, Grad im Zeichen, siderischer Länge und Nakshatra mit Pada.',
	'Time based': 'Zeitbasiert',
	'From the eightfold division of the day or night, so these depend on the birth time, the place and the weekday.':
		'Aus der achtfachen Teilung des Tages oder der Nacht, daher hängen sie von Geburtszeit, Ort und Wochentag ab.',
	'Sun based': 'Sonnenbasiert',
	'The Dhuma group, derived by fixed arc from the Sun. Dhuma is the Sun plus 133 degrees 20 minutes, and each of the rest follows from the one before it.':
		'Die Dhuma-Gruppe, aus einem festen Bogen ab der Sonne abgeleitet. Dhuma ist die Sonne plus 133 Grad 20 Minuten, und jeder weitere folgt aus dem vorhergehenden.',
	Rashi: 'Rashi',
	Longitude: 'Länge',
	Pada: 'Pada',
	'Nakshatra {{name}}': 'Nakshatra {{name}}',
	'Nakshatra {{number}} of 27': 'Nakshatra {{number}} von 27',
	Lord: 'Herrscher',
	Deity: 'Gottheit',
	Symbol: 'Symbol',
	Characteristics: 'Eigenschaften',
	'Mantras:': 'Mantras:',
	'Gemstones:': 'Edelsteine:',
	'Rituals:': 'Rituale:',
	N: 'N',
	NE: 'NO',
	E: 'O',
	SE: 'SO',
	S: 'S',
	SW: 'SW',
	W: 'W',
	NW: 'NW',
	'Local space': 'Lokaler Raum',
	'Local space compass': 'Lokalraum-Kompass',
	'Local space compass of planetary directions from the birthplace':
		'Lokalraum-Kompass der Planetenrichtungen vom Geburtsort aus',
	'A compass centered on the birthplace. Each body is a line pointing to its azimuth, clockwise from north. Bodies below the horizon are dimmed.':
		'Ein Kompass mit dem Geburtsort im Zentrum. Jeder Himmelskörper ist eine Linie zu seinem Azimut, im Uhrzeigersinn ab Norden. Körper unter dem Horizont sind gedimmt.',
	'Local space directions: each body with its compass direction, azimuth, altitude and whether it sits above or below the horizon.':
		'Lokalraum-Richtungen: jeder Himmelskörper mit Kompassrichtung, Azimut, Höhe und Lage über oder unter dem Horizont.',
	'{{planet}} {{direction}} {{azimuth}}° altitude {{altitude}}':
		'{{planet}} {{direction}} {{azimuth}}° Höhe {{altitude}}',
	Azimuth: 'Azimut',
	Altitude: 'Höhe',
	Horizon: 'Horizont',
	Astrocartography: 'Astrokartografie',
	'Astrocartography world map': 'Astrokartografie-Weltkarte',
	'World map of planetary astrocartography lines':
		'Weltkarte der planetaren Astrokartografie-Linien',
	'Equirectangular world map. Each body has a Midheaven and Imum Coeli meridian and a curved Ascendant and Descendant line, colored per body.':
		'Plattkarte der Welt. Jeder Himmelskörper hat einen Meridian für Himmelsmitte und Himmelstiefe sowie eine gebogene Aszendenten- und Deszendentenlinie, je Körper eingefärbt.',
	'{{planet}} {{angle}} line': '{{planet}}-{{angle}}-Linie',
	'Solid lines are the Ascendant and Midheaven, dashed are the Descendant and IC.':
		'Durchgezogene Linien sind Aszendent und Himmelsmitte, gestrichelte sind Deszendent und Himmelstiefe.',
	'Planetary lines': 'Planetenlinien',
	Choghadiya: 'Choghadiya',
	'Day muhurta periods': 'Muhurta-Zeiten am Tag',
	'Daytime choghadiya': 'Choghadiya am Tag',
	'No daytime periods': 'Keine Zeiten am Tag',
	'Night muhurta periods': 'Muhurta-Zeiten in der Nacht',
	'Nighttime choghadiya': 'Choghadiya in der Nacht',
	'No nighttime periods': 'Keine Zeiten in der Nacht',
	Now: 'Jetzt',
	'Time range': 'Zeitspanne',
	'Impact:': 'Wirkung:',
	'Timing:': 'Zeitraum:',
	'Guidance:': 'Empfehlung:',
	'Chara karakas': 'Chara Karakas',
	Atmakaraka: 'Atmakaraka',
	Darakaraka: 'Darakaraka',
	'Chara karakas in descending rank: each office, the graha holding it, its rashi, the degree it holds, the degree that earned the office, and what the office is read for.':
		'Chara Karakas in absteigendem Rang: jedes Amt, der Graha, der es hält, sein Rashi, der gehaltene Grad, der Grad, der das Amt verdient hat, und wofür das Amt gelesen wird.',
	Office: 'Amt',
	Graha: 'Graha',
	'Ranked on': 'Gereiht nach',
	'Read for': 'Gelesen für',
	'measured from the end of the sign': 'vom Ende des Zeichens gemessen',
	'Heliacal visibility': 'Heliakische Sichtbarkeit',
	'Heliacal rising and setting': 'Heliakischer Auf- und Untergang',
	'Whether each graha stands far enough from the Sun to be seen, for {{date}}. The Sun and the nodes never appear here: they have no heliacal event.':
		'Ob jeder Graha weit genug von der Sonne steht, um gesehen zu werden, für {{date}}. Sonne und Knoten erscheinen hier nie: sie haben kein heliakisches Ereignis.',
	Visible: 'Sichtbar',
	Invisible: 'Unsichtbar',
	rises: 'aufgeht',
	sets: 'untergeht',
	Rose: 'Aufgegangen',
	Set: 'Untergegangen',
	'in the east': 'im Osten',
	'in the west': 'im Westen',
	'Visible until it {{event}} {{where}} on {{when}}':
		'Sichtbar, bis sie am {{when}} {{where}} {{event}}',
	'Invisible until it {{event}} {{where}} on {{when}}':
		'Unsichtbar, bis sie am {{when}} {{where}} {{event}}',
	'{{event}} {{where}} on {{when}}, with no further event inside the search window':
		'{{event}} {{where}} am {{when}}, ohne weiteres Ereignis im Suchfenster',
	'No rising or setting inside the search window, which is normal for a graha far from the Sun':
		'Kein Auf- oder Untergang im Suchfenster, was für einen Graha weit von der Sonne normal ist',
	'{{degrees}}° of time from the Sun against a limit of {{limit}}°':
		'{{degrees}}° Zeit von der Sonne gegen eine Grenze von {{limit}}°',
	'{{degrees}}° of time from the Sun against a limit of {{limit}}°, becoming {{shifted}}° at that event':
		'{{degrees}}° Zeit von der Sonne gegen eine Grenze von {{limit}}°, die bei diesem Ereignis {{shifted}}° wird',
	'a morning graha, read before sunrise':
		'ein Morgengraha, vor Sonnenaufgang gelesen',
	'an evening graha, read after sunset':
		'ein Abendgraha, nach Sonnenuntergang gelesen',
	Aspects: 'Aspekte',
	'Aspect list': 'Aspektliste',
	'Aspect summary': 'Aspektübersicht',
	Patterns: 'Figuren',
	'{{status}} · orb {{orb}}° · str {{strength}}':
		'{{status}} · Orbis {{orb}}° · Stärke {{strength}}',
	'Number analysis': 'Zahlenanalyse',
	'{{count}} digits': '{{count}} Ziffern',
	'{{count}} unique': '{{count}} verschiedene',
	'Digit root {{n}}': 'Quersumme {{n}}',
	Palindrome: 'Palindrom',
	Repeating: 'Wiederholend',
	'Positive energy': 'Positive Energie',
	'Neutral energy': 'Neutrale Energie',
	'Cautionary energy': 'Mahnende Energie',
	'Where you saw it': 'Wo Sie sie gesehen haben',
	'Known angel number': 'Bekannte Engelszahl',
	'What to do next': 'Was als Nächstes zu tun ist',
	'Foundational digit root': 'Grundlegende Quersumme',
	'Foundational digit root ({{n}})': 'Grundlegende Quersumme ({{n}})',
	Above: 'Über dem Horizont',
	Below: 'Unter dem Horizont',
	Active: 'Aktiv',
	'Not yet active': 'Noch nicht aktiv',
	Present: 'Vorhanden',
	Absent: 'Nicht vorhanden',
	'Current phase': 'Aktuelle Phase',
	'Not compatible': 'Nicht kompatibel',
	'Ascendant moves to {{sign}}': 'Aszendent wechselt nach {{sign}}',
	'Ascendant stays in {{sign}}': 'Aszendent bleibt in {{sign}}',
	'Ascendant changes sign': 'Aszendent wechselt das Zeichen',
	'Ascendant keeps its sign': 'Aszendent behält sein Zeichen',
	'Bhav Chalit': 'Bhav Chalit',
	'No graha changes house. The Rashi chart and the Chalit chart agree, which is a normal result rather than a missing reading.':
		'Kein Graha wechselt das Haus. Rashi-Chart und Chalit-Chart stimmen überein, was ein normales Ergebnis ist und keine fehlende Deutung.',
	'{{count}} of {{total}} grahas change house between the Rashi chart and the unequal Sripati cusps.':
		'{{count}} von {{total}} Grahas wechseln zwischen dem Rashi-Chart und den ungleichen Sripati-Spitzen das Haus.',
	'house {{from}} in the Rashi chart, house {{to}} here':
		'Haus {{from}} im Rashi-Chart, hier Haus {{to}}',
	'Bhava cusps and occupants': 'Bhava-Spitzen und Belegung',
	Bhava: 'Bhava',
	Start: 'Beginn',
	Madhya: 'Madhya',
	End: 'Ende',
	Span: 'Spanne',
	Grahas: 'Grahas',
	'Fixed stars': 'Fixsterne',
	'Conjunctions to the chart': 'Konjunktionen zum Horoskop',
	'{{point}} conjunct {{star}}': '{{point}} Konjunktion {{star}}',
	'No star sits within the orb of a natal point.':
		'Kein Stern liegt innerhalb des Orbis eines Radixpunktes.',
	'Star catalog ({{count}})': 'Sternkatalog ({{count}})',
	'Precessed positions for the chart date':
		'Präzedierte Positionen zum Horoskopdatum',
	Star: 'Stern',
	Mag: 'Mag',
	Nature: 'Natur',
	Bhavadhipati: 'Bhavadhipati',
	Dig: 'Dig',
	Drishti: 'Drishti',
	Sthana: 'Sthana',
	Kala: 'Kala',
	Chesta: 'Chesta',
	Naisargika: 'Naisargika',
	Drik: 'Drik',
	'Bhava Bala': 'Bhava Bala',
	'Twelve houses ranked by strength': 'Zwölf Häuser nach Stärke geordnet',
	'Twelve houses ranked by strength on the {{system}} frame':
		'Zwölf Häuser nach Stärke geordnet im {{system}}-Häusersystem',
	'Component legend': 'Komponentenlegende',
	'{{component}} Bala': '{{component}} Bala',
	'lord {{graha}}': 'Herrscher {{graha}}',
	'{{value}} rupas': '{{value}} Rupas',
	'Bhava Bala {{value}} virupas': 'Bhava Bala {{value}} Virupas',
	'{{component}} {{value}} virupas': '{{component}} {{value}} Virupas',
	Shadbala: 'Shadbala',
	'Shadbala planetary strength': 'Shadbala Planetenstärke',
	'{{count}} planets ranked by strength':
		'{{count}} Planeten nach Stärke geordnet',
	'Planet strength bars': 'Balken der Planetenstärke',
	'Strength component legend': 'Legende der Stärkekomponenten',
	'Ishta Phala is the capacity to give benefic results, Kashta Phala the capacity to give malefic ones. Both are in virupas and are read together, since a planet can be strong and still deliver hardship.':
		'Ishta Phala ist die Fähigkeit, günstige Ergebnisse zu geben, Kashta Phala die Fähigkeit, ungünstige zu geben. Beide stehen in Virupas und werden zusammen gelesen, denn ein Planet kann stark sein und dennoch Härte bringen.',
	'{{planet}} Shadbala': '{{planet}} Shadbala',
	'rank {{n}}': 'Rang {{n}}',
	'Strength components for {{planet}}': 'Stärkekomponenten für {{planet}}',
	'Ishta Phala {{ishta}}, Kashta Phala {{kashta}} virupas':
		'Ishta Phala {{ishta}}, Kashta Phala {{kashta}} Virupas',
	'Ishta {{value}}': 'Ishta {{value}}',
	'Kashta {{value}}': 'Kashta {{value}}',
	'House {{n}}': 'Haus {{n}}',
	Positions: 'Positionen',
	'Aspects ({{count}})': 'Aspekte ({{count}})',
	'Transit views': 'Transit-Ansichten',
	'Transit aspects': 'Transit-Aspekte',
	Speed: 'Geschwindigkeit',
	Gochara: 'Gochara',
	'Gochara transits': 'Gochara-Transite',
	'Where each graha transits at {{when}}, read against the natal chart of {{birth}}.':
		'Wo jeder Graha am {{when}} transitiert, gelesen gegen das Geburtshoroskop vom {{birth}}.',
	'Key transits': 'Wichtige Transite',
	'Gochara houses are counted from the natal Moon in {{sign}}.':
		'Gochara-Häuser werden vom Radix-Mond in {{sign}} gezählt.',
	'house {{n}} from the Moon': 'Haus {{n}} vom Mond',
	'house {{n}} from the Lagna': 'Haus {{n}} vom Lagna',
	'{{aspect}} natal {{planet}}': '{{aspect}} Radix-{{planet}}',
	'{{aspect}} natal {{planet}} ({{orb}}°)':
		'{{aspect}} Radix-{{planet}} ({{orb}}°)',
	'Kaksha {{n}} of {{total}}': 'Kaksha {{n}} von {{total}}',
	'Kaksha {{n}} of {{total}} within the current sign':
		'Kaksha {{n}} von {{total}} im aktuellen Zeichen',
	'Kaksha {{n}} of {{total}}, ruled by {{graha}}':
		'Kaksha {{n}} von {{total}}, beherrscht von {{graha}}',
	'Kaksha {{n}} of {{total}}, spanning {{start}}° to {{end}}° of the sign':
		'Kaksha {{n}} von {{total}}, von {{start}}° bis {{end}}° des Zeichens',
	'Kaksha {{n}} of {{total}}, ruled by {{graha}}, spanning {{start}}° to {{end}}° of the sign':
		'Kaksha {{n}} von {{total}}, beherrscht von {{graha}}, von {{start}}° bis {{end}}° des Zeichens',
	'this kaksha lord gave bindu': 'dieser Kaksha-Herrscher gab einen Bindu',
	'this kaksha lord gave no bindu': 'dieser Kaksha-Herrscher gab keinen Bindu',
	'this kaksha lord gave bindu, {{count}} of {{total}} in this sign':
		'dieser Kaksha-Herrscher gab einen Bindu, {{count}} von {{total}} in diesem Zeichen',
	'this kaksha lord gave no bindu, {{count}} of {{total}} in this sign':
		'dieser Kaksha-Herrscher gab keinen Bindu, {{count}} von {{total}} in diesem Zeichen',
	'Transiting planets: each planet with its current sign, degree and daily speed.':
		'Transitierende Planeten: jeder Planet mit aktuellem Zeichen, Grad und Tagesbewegung.',
	'Energy {{value}}/10': 'Energie {{value}}/10',
	'Energy {{value}} of 10': 'Energie {{value}} von 10',
	Health: 'Gesundheit',
	Finance: 'Finanzen',
	Advice: 'Empfehlung',
	'Lucky number': 'Glückszahl',
	'Lucky numbers': 'Glückszahlen',
	'Lucky color': 'Glücksfarbe',
	'Lucky days': 'Glückstage',
	'Best with': 'Am besten mit',
	Phase: 'Phase',
	'Active transits': 'Aktive Transite',
	'Week by week': 'Woche für Woche',
	'Week {{n}}': 'Woche {{n}}',
	'Key dates': 'Wichtige Daten',
	'Arudha padas': 'Arudha Padas',
	Moved: 'Verschoben',
	'marks a pada that fell in its own bhava or the seventh from it and was moved to the tenth from there, as the classical rule requires. {{count}} of {{total}} padas here.':
		'kennzeichnet ein Pada, das in seinem eigenen Bhava oder im siebten davon lag und wie von der klassischen Regel gefordert auf das zehnte von dort verschoben wurde. Hier {{count}} von {{total}} Padas.',
	'The twelve Arudha padas: each pada with its bhava, the bhava sign and its lord, the sign the lord occupies, the sign the pada falls in, which house from the Lagna that is, whether the classical exception was applied, and what the pada is read for.':
		'Die zwölf Arudha Padas: jedes Pada mit seinem Bhava, dem Bhava-Zeichen und dessen Herrscher, dem Zeichen des Herrschers, dem Zeichen des Padas, dem wievielten Haus vom Lagna das ist, ob die klassische Ausnahme griff, und wofür das Pada gelesen wird.',
	'Bhava rashi': 'Bhava-Rashi',
	'Lord rashi': 'Rashi des Herrschers',
	'Pada rashi': 'Pada-Rashi',
	'From Lagna': 'Vom Lagna',
	Lagna: 'Lagna',
	'Arudha Lagna': 'Arudha Lagna',
	Upapada: 'Upapada',
	Mahadasha: 'Mahadasha',
	Antardasha: 'Antardasha',
	Pratyantardasha: 'Pratyantardasha',
	Sookshma: 'Sookshma',
	Prana: 'Prana',
	'Dasha timeline': 'Dasha-Zeitleiste',
	Timeline: 'Zeitleiste',
	'Chart details': 'Horoskopdetails',
	'Dasha views': 'Dasha-Ansichten',
	'Vimshottari Mahadasha': 'Vimshottari Mahadasha',
	'Active dashas': 'Aktive Dashas',
	'{{level}} periods in {{planet}} {{parent}}':
		'{{level}}-Perioden in {{planet}} {{parent}}',
	'{{planet}} {{level}}': '{{planet}} {{level}}',
	'Inside the {{planet}} {{level}}{{span}}{{duration}}.':
		'In der {{planet}}-{{level}}{{span}}{{duration}}.',
	'It began {{date}}, before birth, so only the sub-periods running after the birth date are listed.':
		'Sie begann am {{date}}, vor der Geburt, daher sind nur die Unterperioden nach dem Geburtsdatum aufgeführt.',
	'Moon nakshatra: {{name}}': 'Mond-Nakshatra: {{name}}',
	'Moon nakshatra: {{name}} (lord {{lord}})':
		'Mond-Nakshatra: {{name}} (Herrscher {{lord}})',
	'{{balance}} left': '{{balance}} verbleibend',
	'Signifies {{houses}}': 'Bezeichnet {{houses}}',
	Biorhythm: 'Biorhythmus',
	'Daily biorhythm': 'Täglicher Biorhythmus',
	'Biorhythm forecast': 'Biorhythmus-Prognose',
	Forecast: 'Prognose',
	'No forecast': 'Keine Prognose',
	'Biorhythm cycle lines across the forecast window':
		'Biorhythmus-Kurven über den Prognosezeitraum',
	'Spotlight cycle': 'Hervorgehobener Zyklus',
	'critical day': 'kritischer Tag',
	'Critical days': 'Kritische Tage',
	'Two or more cycles cross zero on {{dates}}. Take extra care on these dates.':
		'Zwei oder mehr Zyklen kreuzen die Null am {{dates}}. An diesen Tagen ist besondere Vorsicht angebracht.',
	'Best day': 'Bester Tag',
	'Worst day': 'Schlechtester Tag',
	'Average energy': 'Durchschnittliche Energie',
	Events: 'Ereignisse',
	'Double days': 'Doppeltage',
	'Triple day': 'Dreifachtag',
	'Readings ({{count}})': 'Deutungen ({{count}})',
	Intellectual: 'Intellektuell',
	Intuitive: 'Intuitiv',
	'Vedic planetary positions': 'Vedische Planetenpositionen',
	'Vedic planetary positions: each graha with its rashi, degree, nakshatra, pada, nakshatra lord, house, its state in all three avastha systems, and retrograde state. Jagradadi and Deeptadi are read from sign dignity, which the nodes and the Lagna do not have, so those two cells are blank on the Rahu, Ketu and Lagna rows. Uranus, Neptune and Pluto appear only when asked for and rule no sign, so every avastha and house cell is blank on their rows too.':
		'Vedische Planetenpositionen: jeder Graha mit Rashi, Grad, Nakshatra, Pada, Nakshatra-Herrscher, Haus, seinem Zustand in allen drei Avastha-Systemen und Rückläufigkeit. Jagradadi und Deeptadi werden aus der Zeichenwürde gelesen, die Knoten und Lagna nicht haben, daher bleiben diese Zellen in den Zeilen Rahu, Ketu und Lagna leer. Uranus, Neptun und Pluto erscheinen nur auf Anfrage und beherrschen kein Zeichen, daher bleiben in ihren Zeilen alle Avastha- und Hauszellen ebenfalls leer.',
	'Nak. lord': 'Nak.-Herrscher',
	Baladi: 'Baladi',
	Jagradadi: 'Jagradadi',
	Deeptadi: 'Deeptadi',
	'Baladi: the five age states, set by degree within the sign':
		'Baladi: die fünf Altersstufen, bestimmt durch den Grad im Zeichen',
	'Jagradadi: the three waking states, set by sign dignity. The seven classical grahas only':
		'Jagradadi: die drei Wachzustände, bestimmt durch die Zeichenwürde. Nur die sieben klassischen Grahas',
	'Deeptadi: the nine dispositional states, set by sign dignity. The seven classical grahas only':
		'Deeptadi: die neun Gemütszustände, bestimmt durch die Zeichenwürde. Nur die sieben klassischen Grahas',
	Retro: 'Rückl.',
	'Combust grahas': 'Verbrannte Grahas',
	'{{distance}} deg from Sun, within {{orb}} deg orb':
		'{{distance}} Grad von der Sonne, innerhalb von {{orb}} Grad Orbis',
	'Planetary wars': 'Planetenkriege',
	'{{first}} vs {{second}}': '{{first}} gegen {{second}}',
	'{{distance}} deg apart': '{{distance}} Grad Abstand',
	'{{graha}} wins': '{{graha}} gewinnt',
	Interpretations: 'Deutungen',
	'Rashi.': 'Rashi.',
	'Nakshatra.': 'Nakshatra.',
	'Bhava significations': 'Bhava-Bedeutungen',
	Yogas: 'Yogas',
	Ashtakavarga: 'Ashtakavarga',
	'Ashtakavarga grid': 'Ashtakavarga-Raster',
	'Ashtakavarga views': 'Ashtakavarga-Ansichten',
	Sarvashtakavarga: 'Sarvashtakavarga',
	Bhinnashtakavarga: 'Bhinnashtakavarga',
	Reduced: 'Reduziert',
	'Reduced SAV': 'Reduziertes SAV',
	'Shodhya Pinda': 'Shodhya Pinda',
	'{{count}} signs': '{{count}} Zeichen',
	'Fewer bindus': 'Weniger Bindus',
	'More bindus': 'Mehr Bindus',
	Bindus: 'Bindus',
	'Rashi Pinda': 'Rashi Pinda',
	'Graha Pinda': 'Graha Pinda',
	'No sarvashtakavarga data': 'Keine Sarvashtakavarga-Daten',
	'No bhinnashtakavarga data': 'Keine Bhinnashtakavarga-Daten',
	'No reduced ashtakavarga data': 'Keine reduzierten Ashtakavarga-Daten',
	'No bindu data': 'Keine Bindu-Daten',
	'No shodhya pinda data': 'Keine Shodhya-Pinda-Daten',
	'Sarvashtakavarga: each of the twelve signs and the bindus all planets contribute to it, with a grand total.':
		'Sarvashtakavarga: jedes der zwölf Zeichen und die Bindus, die alle Planeten dazu beitragen, mit einer Gesamtsumme.',
	'Shodhya Pinda: each planet with its Rashi Pinda, Graha Pinda and Shodhya Pinda strength scores.':
		'Shodhya Pinda: jeder Planet mit seinen Stärkewerten für Rashi Pinda, Graha Pinda und Shodhya Pinda.',
	'Detected yogas': 'Erkannte Yogas',
	'Yoga catalog': 'Yoga-Katalog',
	'Yoga results': 'Yoga-Ergebnisse',
	'No yoga data': 'Keine Yoga-Daten',
	'No yogas match your search.': 'Keine Yogas entsprechen Ihrer Suche.',
	'Filter yogas...': 'Yogas filtern...',
	'Filter detected yogas by name': 'Erkannte Yogas nach Namen filtern',
	'Filter yoga list by name': 'Yoga-Liste nach Namen filtern',
	'{{count}} of {{total}} present': '{{count}} von {{total}} vorhanden',
	'{{count}} total': '{{count}} insgesamt',
	'Classical family': 'Klassische Familie',
	Effects: 'Wirkungen',
	'Every classical condition is satisfied by this chart.':
		'Jede klassische Bedingung ist in diesem Horoskop erfüllt.',
	'The rule matched, but a stronger family silences it under the classical precedence norms. Each card names the family that took precedence.':
		'Die Regel traf zu, doch eine stärkere Familie hebt sie nach den klassischen Vorrangregeln auf. Jede Karte nennt die Familie, die Vorrang hatte.',
	'At least one classical condition fails. Read the evidence for which.':
		'Mindestens eine klassische Bedingung ist nicht erfüllt. Die Belege zeigen, welche.',
	Synastry: 'Synastrie',
	'Synastry compatibility chart': 'Synastrie-Kompatibilitätshoroskop',
	'Synastry dual wheel': 'Synastrie-Doppelrad',
	'Dual chart wheel comparing two natal charts':
		'Doppelrad, das zwei Geburtshoroskope vergleicht',
	'Synastry response missing planet positions.':
		'In der Synastrie-Antwort fehlen die Planetenpositionen.',
	'A current {{endpoint}} response carries {{first}} and {{second}}, and the inter-aspect readings below still work without them.':
		'Eine aktuelle {{endpoint}}-Antwort enthält {{first}} und {{second}}, und die Interaspekt-Deutungen unten funktionieren auch ohne sie.',
	'Inter-aspects': 'Interaspekte',
	'Inter-aspect summary': 'Interaspekt-Übersicht',
	'In this pairing': 'In dieser Verbindung',
	'All {{count}} inter-aspects': 'Alle {{count}} Interaspekte',
	'orb {{orb}}° · str {{strength}}': 'Orbis {{orb}}° · Stärke {{strength}}',
	'ASC{{n}}': 'AC{{n}}',
	'Person {{n}}': 'Person {{n}}',
	'Score {{score}} of 100': 'Wert {{score}} von 100',
	'Sign sectors, not houses': 'Zeichensektoren, keine Häuser',
	'Planet 1': 'Planet 1',
	'Planet 2': 'Planet 2',
	'Inter-chart aspects: the planet from chart 1, the planet from chart 2, the aspect between them, the orb in degrees and the strength.':
		'Aspekte zwischen den Horoskopen: der Planet aus Horoskop 1, der Planet aus Horoskop 2, der Aspekt zwischen ihnen, der Orbis in Grad und die Stärke.',
};

registerLocale('de', de);
