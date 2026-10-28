/**
 * Turkish chrome strings.
 *
 * @remarks
 * Importing this module registers the catalogue and re-renders every mounted component, so it is a side-effect entry, exactly like a `components/*` module. It is built to `dist/locales/tr.js` and `dist/cdn/locales/tr.js` as its OWN payload rather than compiled into the components, so an English site downloads none of it.
 *
 * Keyed by the English source string as it appears at the call site, so this file diffs directly against the component that renders it and no key vocabulary has to be kept in sync with the copy.
 *
 * Turkish puts the percent sign BEFORE the number; `formatPercent` places it, so no entry here spells it. The brand rule forbids apostrophes, which Turkish otherwise uses before a suffix on a foreign word, so several entries are shaped around it: the attribution needs no suffix on `RoxyAPI`, `apex` is a bare unsuffixed chip, and the Ascendant is `Yükselen` rather than the loanword, because `Ascendant` would force `Ascendant'tan` in the two equal-sector strings. If that string ever has to inflect in running text, switch to `odak gezegen`, which is the native form and takes suffixes cleanly.
 *
 * `Öneriler` rather than `Çareler` for the dosha remedies: Turkish Vedic writing labels remedial measures as recommendations (`Guclendirme Onerileri`, `cozum onerileri`), and `care` reads medical.
 *
 * Every entry below is attested in live Turkish astrology copy rather than machine translated. What follows is the reasoning a maintainer needs; the attestation itself is recorded internally.
 *
 * Four terms here are English loanwords on purpose, not gaps: `relocation`, `orb`, `apex` and `natal` are what Turkish astrologers actually write (`natal harita`, `natal gezegenlerle`). `Relokasyon` in particular appears in NO Turkish astrology source and reads as a mistranslation.
 *
 * Rejected, so nobody restores them: `dissosiye açı` does not exist, the out-of-sign aspect being `burç dışı`; **`Aplikasyon`/`Separasyon` could not be verified in ANY live Turkish source** and the sourced pair is `yaklaşan açı`/`ayrılan açı`; `uygulama`/`ayrılma` reads as *application/app* inside a web component; `ev girişi` is attested for a house cusp but `giriş` means login or data entry in every software context, so `ev başlangıcı` wins; `Zodyak dairesi` and `Zodyak çemberi` are both attested for the sign wheel and were passed over only to keep ONE wheel noun in this catalogue; and `Eşit Ev Sistemi` is the correct name of a house SYSTEM, which is exactly why it must not label the equal-sector fallback, since that fallback fires when the response carried no cusps at all.
 *
 * Three concepts have no attested Turkish astrological term: the bi-wheel, its inner and outer rings, and a 0-100 aspect strength score. `çift çember`, `iç halka` / `dış halka` and `güç` are deliberate plain-Turkish coinages built on the settled `harita çemberi`, with `halka` chosen so the ring noun never collides with `çember`, the wheel noun.
 *
 * **Three values carry a correction and one earlier claim is overturned.**
 *
 * `Uzaklaşan açı` replaced `Ayrılan açı` for the separating aspect, because `Yaklaşan / Uzaklaşan` is the conventional pair across three independent sources. `Ayrılan` is attested but is the minority form and left the pair mismatched.
 *
 * `Süre` replaced `Zamanlama` for the timing paragraph. That was a CONTRACT error: the spec defines the field as how long the transit influence lasts, and `zamanlama` is the act of scheduling.
 *
 * `Öneri` replaced `Yönlendirme` for the guidance paragraph. The spec says practical advice; `yönlendirmek` means to steer or route someone. The advice register is `öneri` or `tavsiye`, and `Öneri` matches the one-word abstract-noun shape of its siblings `Etki` and `Süre`. `Rehberlik` was passed over: it names a guiding relationship rather than a piece of advice.
 *
 * **`çark` is NOT a mechanical gear only, and the earlier rejection note was factually wrong.** Turkish astrology writing uses it for the chart wheel. `harita çemberi` is still the right choice for this catalogue, but on consistency rather than on correctness. Know also that `harita çemberi`, `burç çemberi` and `çift çember` are all UNATTESTED compounds of ours; the attested wheel noun is `Zodyak çemberi`, passed over only to keep one wheel noun in this file.
 *
 * `Önc.`, `Sab.` and `Değ.` for the cross-tab columns are ours: no Turkish source abbreviates the qualities. The trailing period is correct Turkish `kısaltma` orthography, none of the three contains an i or an ı so the dotless-i uppercase hazard cannot bite, and `Değ.` keeps its ğ. The full forms are `Öncü`, `Sabit` and `Değişken`; `Öncülük` is the abstract noun for leadership and would be wrong as a column label.
 *
 * One label noted and not changed: `Nötr` for the neutral aspect class rests on a single weak source. The concept is sound, the label is thin.
 *
 * ## Human Design
 *
 * **The vocabulary is deliberately split.** `aura`, `bodygraph`, `motor`, `aktivasyon` and the type names are LOANWORDS in Turkish Human Design writing, and an invented native replacement for any of them is the error, not the fix. Everything else is native Turkish, and specifically the vocabulary the Human Design endpoints already return for `?lang=tr`, because these labels print directly above those values: `Tanım` heads `Tekli / Bölünmüş / Üçlü Bölünmüş`, `Otorite` heads the seven authority values, `{{circuit}} devre` takes `Bireysel / Kolektif / Kabilesel`, and `Tanımlı` / `Açık` are the two words the API centre prose itself uses. A label naming a different concept than the value beneath it is exactly what this matching exists to prevent.
 *
 * **`{{circuit}} devre` carries no suffix ON PURPOSE, and it is the agglutination trap in this block.** The API substitutes an ADJECTIVE, so `Bireysel devre` is right and `Bireysel devresi` is wrong; the possessive that `kabile devresi` carries elsewhere is there only because `kabile` is a noun. The same reasoning puts the number AFTER the noun in `Kapı {{gate}}`, `Çizgi {{line}}` and `I Ching heksagramı {{number}}`: the ordinal `{{gate}}. kapı` is the more usual Turkish, but the gate tooltip substitutes `51.5` and would render `51.5. kapı`.
 *
 * Three values are identical to their English source and all three are deliberate: `Aura`, `Bodygraph` (the loanword the Turkish Human Design prose uses itself, suffixed, inside the centre biology and definition text this same card renders) and `Motor`. The head noun is dropped from the last two because the chip already sits on a centre. `Beden grafiği` and `Vücut Grafiği` are both attested for the bodygraph and were passed over to keep ONE word for it across the card and the API prose printed inside it.
 *
 * `Otorite`, not `İç Otorite`, and the reason is correctness rather than style: the API `authorities` map includes `Zihinsel`, which Human Design classes as an OUTER authority, so an inner-authority label would be false above that one value. `Tanım` for Definition is the Human Design term and not the dictionary sense, and it is the noun `Tanımlı` is built from, so the card stays consistent with its own chips.
 *
 * Rejected, so nobody restores them: `Baz` for the Variables Base layer, which reads as the chemistry sense; `farkındalık soruları` for the open-centre prompt, which would collide with the `Farkındalık` chip printed beside it; and `Variable` as a loanword, which cannot inflect without the apostrophe this catalogue forbids, where `Değişken` is attested twice.
 *
 * **Thin, and wanting a native practitioner pass: Turkish Human Design writing barely covers the Variables at all.** `Renk`, `Ton` and `Biliş` rest on a narrow base. `Temel` for Base and `Yön` for the arrow direction are the plainest defensible Turkish and are attested in NO practitioner source. `Referans` and `Biyoloji` are ordinary Turkish rather than Human Design terms.
 *
 * ## Monthly ephemeris
 *
 * **`Efemeris` is the Turkish spelling and the native gloss is a definition rather than a heading.** That is also why the section below it can drop the word daily: the card title already carries it.
 *
 * **`Gezegen konumları` is the attested heading and the loss of `günlük` is deliberate.** `Günlük Gezegen Konumları` is grammatical but was found as no rendered heading anywhere, and the `Tarih` column plus the card title already carry the per-day sense. `Konumlar` alone was rejected: Turkish chart forms use `Konum` for the geographic location field.
 *
 * **`Burç değişimleri`, not `Burç geçişleri`, and the collision is with our own product.** `geçiş` is also the standard Turkish for TRANSIT, so on a page that also carries transit content it would name the wrong thing. `Retro` is what Turkish tables print rather than a full loanword.
 *
 * **`{{sign}} burcuna geçiyor` is the one Turkish frame a template can fill, and the reason is structural.** The dative lands on `burç`, never on the sign name: `burç` plus the possessive and the buffer consonant gives `burcuna`, byte-identical for all twelve, with the sign staying in bare nominative. **The bare-sign dative is rejected**: `Koç a`, `Boğa ya`, `İkizler e` need four different endings plus an apostrophe, which is both uncomputable from a substituted string and against the register rule this catalogue follows. The date is separated by a colon for the same reason, since a Turkish postposition on a formatted date would harmonise with its last vowel.
 *
 * `Tarih` is the standard column header above ephemeris dates. The empty state and the table caption are COMPOSED rather than lifted; no astrology page publishes either.
 *
 * ## Form group names
 *
 * **`1. Kişi` and `2. Kişi` are lifted from a live Turkish synastry form, capital K included**, which settles the word, the number-first order and the heading capital at once. A lower-case `1. kişi` is a sentence-medial artifact, and a legend is a heading.
 *
 * **`Relocation` stays English because this file already decided that, and the register rule is why.** `Relokasyon` appears in no Turkish astrology source, and Turkish writing prints `Relocation` bare and unsuffixed, which is why `Relocation haritası` was already the shipped chart name. `Yeni yer` and `Taşınılan yer` are correct Turkish and would name one concept two ways inside one catalogue.
 *
 * **`Doğum` is the bare noun on purpose: the sentence supplies the suffix.** `Doğum yeri` is already this file's separate entry for the flat birth block, so naming the relocation form birth GROUP `Doğum yeri` would render `Doğum yeri yeri`. The same rule rejects `A kişisi` for the lettered pair, which stacks a possessive against the `yeri` and `şehri` that follow it; `A Kişi` keeps the letter-then-bare-noun order Turkish uses for `A Blok` and stays parallel with the numbered pair.
 *
 * **`Doğum haritası yeri` is a chained tamlama, not a stacked-suffix defect**, the same structure as `iş yeri müdürü`. It reads a shade formal, which is a register note rather than a grammar break, so the natal chart group reuses the shipped card heading.
 *
 * `Alan ağırlıkları` is the weakest entry here, composed rather than lifted. Both halves are attested on their own, but nobody publishes the compound. It is also the one name that never renders inside a sentence, so it gets the least stress.
 */
import type { ChromeString } from '../i18n/chrome-strings.js';
import './field-labels/tr.js';
export declare const tr: Record<ChromeString, string>;
