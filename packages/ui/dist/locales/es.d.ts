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
import './field-labels/es.js';
export declare const es: Record<ChromeString, string>;
