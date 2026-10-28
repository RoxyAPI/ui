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
import './field-labels/de.js';
export declare const de: Record<ChromeString, string>;
