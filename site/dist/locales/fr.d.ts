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
 * **`Dissonants` replaced `Tendus` in the aspect count legend and `Durée` replaced `Période`.** `Tendus` is real French but pairs badly with `Neutres`, since the conjunction is defined as `ni harmonique ni tendue`, so a legend carrying both reads as overlapping. The singular state of one interaction or verdict is a key of its own and takes `Tendu`, which never shares a row with `Neutre`. `Période` was not wrong either, but the field is a duration, and `Période` names WHICH span is active rather than HOW LONG it lasts.
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
import './field-labels/fr.js';
export declare const fr: Record<ChromeString, string>;
