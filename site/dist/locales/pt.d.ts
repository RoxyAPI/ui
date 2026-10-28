/**
 * Portuguese chrome strings.
 *
 * @remarks
 * Importing this module registers the catalogue and re-renders every mounted component, so it is a side-effect entry, exactly like a `components/*` module. It is built to `dist/locales/pt.js` and `dist/cdn/locales/pt.js` as its OWN payload rather than compiled into the components, so an English site downloads none of it.
 *
 * Keyed by the English source string as it appears at the call site, so this file diffs directly against the component that renders it and no key vocabulary has to be kept in sync with the copy.
 *
 * One catalogue serves both markets, and where Brazil and Portugal genuinely differ it follows Brazilian usage, which is the larger astrology readership: `orbe`, `tensos` and `Áries` rather than the European `órbitas`, `desarmoniosos` and `Carneiro`. Regional tags resolve here, so `pt-BR` and `pt-PT` both read this file.
 *
 * Every entry below is attested in live Portuguese astrology copy rather than machine translated. What follows is the reasoning a maintainer needs; the attestation itself is recorded internally.
 *
 * **`Natal` is Portuguese, not an untranslated fallthrough**: `mapa natal`, `Vênus natal`, `casa natal` are standard, and the spelling coincides with the English.
 *
 * **`Aplicativo` also means "mobile app" in Brazilian Portuguese, and it is still the right word here.** It is what both sourced glossaries print for an applying aspect, it is paired with `Separativo` in the same row, and the reader is a working astrologer. Do not swap in an app-free synonym.
 *
 * Rejected, so nobody restores them: `Em aplicação`/`Em separação` and `Aproximando`/`Afastando` for the aspect pair (phrases and plain motion verbs, not the glossary terms), `anel interno`/`anel externo` for the rings (a literal rendering of "ring" with zero astrological attestation), `roda interna`/`roda externa` (collides with `roda`, which already names the whole wheel), `casas iguais` for the equal-sector fallback (that names a house SYSTEM, and the fallback fires precisely because no cusps came back), `exatidão` for the strength score (this catalogue already spends that word on aspect tightness, and collapsing two different measures into one word is drift), and `Timing` for the timing paragraph (business jargon in Brazil, never an astrological term).
 *
 * Two gaps, stated rather than papered over. **`Bi-wheel` has no Portuguese noun**, so nothing was coined; the two entries that need it name the chart and let the inner and outer clause carry the meaning. **`Transiting house` has none either**: Portuguese writes it as a whole clause, and `casa transitada` is Spanish rather than Portuguese, so `Casa em trânsito` is a plain construction built on the attested modifier `em trânsito`. A normalized 0-100 aspect strength has no Portuguese term of art at all.
 *
 * **`Configurações planetárias` is KEPT, with the risk written down rather than assumed away.** A bare `Configuraciones` heading reads as a preferences panel in Spanish, and `Configurações` is likewise the word every Portuguese OS UI uses for Settings. It survives here because the qualifier carries it and because it is the attested class term for exactly our set. **Every alternative is worse**: `Padrões planetários` is actively wrong, naming the Rudhyar chart SHAPES (bowl, bundle, splash), and `Figuras de aspectos` is Spanish usage with no Brazilian attestation. **If a Brazilian reader ever reports the settings reading, the pre-vetted fallback is `Configurações de aspectos`** and nothing else.
 *
 * `Car`, `Fix` and `Mut` for the cross-tab columns are three-character truncations of `Cardinal`, `Fixo` and `Mutável` that happen to coincide with the English set; no Portuguese source abbreviates the qualities at all, so the scheme is ours. `Card` was rejected because `card` is a live English loanword in Brazilian tech usage for a visual card.
 *
 * **`Cardinal` versus `Cardeal` is a genuine live split, not an error**, and it is not a Brazil versus Portugal split either. This file follows the API, which returns `Cardinal`, because the dominant pill and the grid row it tints must read the same word.
 *
 * `Mapa de relocação` is the shipped term and is attested in Brazilian material, alongside the more common `astrocartografia`. `Realocação` stays rejected for disagreeing with the term this file already ships.
 *
 * One entry remains unsourced and wants a bilingual practitioner: **`Dissociada`**, where no Brazilian source applies `dissociado` to an out-of-sign aspect. The tooltip carries the meaning. Also noted and not changed: `casas {{system}}` renders `casas Placidus`, where Brazilian usage would write `casas de Placidus`; it reads as a compressed label rather than an error.
 *
 * ## Human Design
 *
 * **The 54 entries follow established Brazilian Human Design usage, cross-checked against the Portuguese the Human Design endpoints themselves return wherever a concept overlaps.** `Estratégia`, `Autoridade`, `Assinatura`, `Perfil`, `Definição`, `Centros`, `Canais`, `Cruz de encarnação`, `Variáveis` and `Bodygraph` are all settled that way, as are the defined/open pair and the motor/awareness split.
 *
 * **`Portão`, never `Porta`, for a Gate.** The Portuguese the API returns writes `portão` throughout its own body text, reserving `porta` for a literal door inside a reading's metaphor. European sources write `Porta` instead, a live regional split of the same shape this file already documents for `Cardinal`/`Cardeal`; this catalogue follows the API it sits beside, because the tooltip prefix and the footnote have to read as the same word the card's data-driven vocabulary already prints.
 *
 * **`Design` and `Bodygraph` are Portuguese, not untranslated fallthroughs, the same way `Natal` already is.** Brazilian prose glosses the red column as `Design`, never `Desenho`, and uses lower-case `bodygraph` as a common noun mid-sentence. `Aura` and `Motor` are likewise the same word in Portuguese. `Base` is shipped as the same word too, but on cognate grounds only: no Portuguese Human Design source names that specific layer, so it wants a practitioner check.
 *
 * **`Não-eu` is the noun, not a coined compound**, and is distinct from `Tema do Não-Ser`, which names the four type-specific feelings rather than the mechanic itself. `Pergunta do não-eu` composes that sourced noun with the plain word for "question"; no source uses that exact three-word phrase, so it is the plainest defensible construction and wants a practitioner pass.
 *
 * Two further entries are the plainest defensible Portuguese rather than sourced vocabulary and are flagged for the same pass. **`Lados do bodygraph`** for the accessible name of the Personality/Design tab list: both halves check out individually, but no source names the pair together as UI chrome, since they are discussed as chart-reading doctrine rather than interface labels. **`No limite`** for the knife-edge warning: the literal idiom `no fio da navalha` exists but reads as literary rather than a UI warning chip, so this catalogue takes the plain paraphrase and never coins the idiom.
 *
 * ## Monthly ephemeris
 *
 * **`Efemérides`, always plural.** In Brazilian journalism `efemérides` also means an on-this-day anniversary, so the word is safe inside an astrology card and should not be reused elsewhere.
 *
 * **`Mudanças de signo` over `Ingressos`.** `Ingresso` is the practitioner word and is attested, but only ever inside the full phrase; standing alone on a chip it is the everyday Brazilian word for an admission ticket. `entradas de signos` was rejected as a calque.
 *
 * **`Retrogradação` is the noun on purpose.** The adjective was rejected for the chip because it agrees in gender with whatever it sits under, and this card also prints the lunar nodes and Black Moon Lilith, which are not reliably masculine.
 *
 * **`Entra em {{sign}} no dia {{date}}` substitutes safely for all twelve**, since `em` takes no article before a sign name and never contracts, so no exception table is needed. `Data` is the standard column header on these tables.
 *
 * The empty state and the table caption are COMPOSED rather than lifted, following the patterns already in this file. Portugal spellings were kept out: `posições actuais` is pre-reform orthography and this catalogue is Brazilian.
 *
 * ## Form group names
 *
 * **`Pessoa A` and `Pessoa B` are what live Portuguese two-person forms print.** Portuguese uses the same alphabet and the same `Plano A` convention, so the letters stay letters. The numbered pair takes the same head noun and the bare numeral, which sidesteps the gender agreement `primeira` and `segundo` would drag in. `Você` and `Seu parceiro` were rejected: these forms are also read for family, friends and business partners.
 *
 * **`Nascimento` is bare for the relocation birth block so the interpolation reproduces the strings this file already ships**, `Local de nascimento` and `Cidade de nascimento`, rather than a second phrasing of them. `Dados de nascimento` stays on the forecast block. `Pesos por domínio` is kept because this is settings chrome rather than coaching copy, where Brazilian coaching would say `áreas da vida`.
 *
 * The two blocks that name a THING rather than a person are the weakest here: `Local de Dados de nascimento` is circular, since birth data already contains a place, and `Local de Mapa natal` asks where a chart is, which is a category mismatch a reader resolves from the legend directly above the field. Both are the standing `casas Placidus` trade recorded above: telegraphic UI chrome, not an error. The natal chart one cannot be reworded here in any case, because that group reuses the card heading by construction.
 */
import type { ChromeString } from '../i18n/chrome-strings.js';
import './field-labels/pt.js';
export declare const pt: Record<ChromeString, string>;
