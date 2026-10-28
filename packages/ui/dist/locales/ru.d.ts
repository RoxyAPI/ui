/**
 * Russian chrome strings.
 *
 * @remarks
 * Importing this module registers the catalogue and re-renders every mounted component, so it is a side-effect entry, exactly like a `components/*` module. It is built to `dist/locales/ru.js` and `dist/cdn/locales/ru.js` as its OWN payload rather than compiled into the components, so an English site downloads none of it.
 *
 * Keyed by the English source string as it appears at the call site, so this file diffs directly against the component that renders it and no key vocabulary has to be kept in sync with the copy.
 *
 * Two choices worth knowing. The counted legend chips read `планет: {{count}}` rather than `{{count}} планет`, because Russian declines the noun after a numeral (1 планета, 3 планеты, 12 планет) and this catalogue has no plural rules; the label form is correct for every count instead of correct for most. And the vocabulary is the one a working astrologer uses rather than the literal translation: `стихия` not `элемент`, `крест` not `модальность`, `трактовка` not `интерпретация`.
 *
 * **A single-state word agrees with the siblings it is read beside, and the count of aspects is a separate key in the plural.** `Нейтральная` and `Смешанная` are feminine like `Благоприятная` and `Неблагоприятная`, so a KP verdict column reads one gender; `Гармоничный` and `Напряжённый` are masculine like the compatibility verdicts `Отличный` and `Трудный`, and a BaZi interaction tag takes the same pair so its two values agree.
 *
 * Every entry below is attested in live Russian astrology copy rather than machine translated. What follows is the reasoning a maintainer needs; the attestation itself is recorded internally.
 *
 * **`Natal` and `Transiting` are NOUNS here (`Натал`, `Транзит`), not the adjectives `Натальный` and `Транзитный`, and that is the same class of fix as the numeral one above.** Both strings sit in front of an API-returned body name, and Russian adjectives agree in gender across all three genders the API returns (Марс m., Венера f., Солнце n.), so one invariant adjective is wrong on most rows. An invariable noun label is correct on all of them. The adjective forms ARE used wherever the noun they modify is fixed and known: `транзитных объектов`, `натальных домов`, `Сводка транзитных аспектов`.
 *
 * Rejected, so nobody restores them: `формирующийся`/`распадающийся` for applying and separating (that is a SEPARATE axis alongside сходящиеся/расходящиеся, so substituting it changes what the chip asserts), `бикольцо` for the bi-wheel (zero attestation, a bare calque; the professional form is `двойная карта`), `вершина дома` for a cusp (correct Russian, but this catalogue already spends `вершина` on the aspect-pattern apex, and Russian program UIs write `куспид`), `космограмма` for the sign-wheel chip (it names the whole chart TYPE and would claim the chart has no houses, which is a different chip), and `равнодомная система` for the equal-sector fallback (a house-system name, and the fallback fires precisely when the response named none).
 *
 * One caveat recorded rather than hidden: the applying and separating pair rests on two published Russian astrology books from one publisher. Worth a second look if anyone reaches a genuinely independent source.
 *
 * **`Аспектные фигуры` replaced `Конфигурации аспектов` on 2026-08-09, and the evidence genuinely cuts both ways.** The old string was the MORE attested term. It was replaced anyway, for the reason the Spanish sibling records: `конфигурация` is also the generic Russian tech word for settings, Russian astrology software really does ship an aspect-configuration screen with the orb tables on it, and we have already paid once for a heading a reader could resolve to a settings panel. The replacement is attested for exactly this class with no such reading, and it matches `de.ts` `Aspektfiguren` and `es.ts` `Figuras planetarias`, so all three locales now name the same thing the same way.
 *
 * **`Через знак` replaced `Диссоциированная` in the same pass.** The old word had no attestation in Russian astrology at all; the new one is the native term. The explanation sentence moved with the chip so the two use one word. **Caveat recorded rather than hidden: that is ONE school across two pages, not two independent authorities.** `Вне знака` is the plain-Russian fallback if a second source never turns up. Separately, that same school holds that out-of-sign aspects work at full strength, which our English source string contradicts; the translation stays faithful to the source rather than taking a side, and the disagreement is the API's to settle.
 *
 * **`Длительность` replaced `Сроки` for the timing paragraph, and that was a CONTRACT error rather than a vocabulary one.** The spec defines the field as how long the transit influence lasts, with buckets like a few hours or a few days. `Сроки` reads as deadlines or terms, which is a schedule. Every sibling locale already used a duration word.
 *
 * `Кард.`, `Фикс.` and `Мут.` for the cross-tab columns are ours: Russian sources spell all three qualities out, including in the tally panel beside a chart. The trailing period is correct Russian truncation orthography. The full forms are the bare MASCULINE ADJECTIVES rather than the noun `крест`, which is what a Russian distribution table actually prints; `крест` stays where it belongs, in `Преобладающий крест` and `по стихиям и крестам`.
 *
 * One thing noted and not changed: `дома по системе {{system}}` renders `по системе Плацидус` where Russian wants the genitive `Плацидуса`. The interpolated value comes off the wire in nominative form and no wording here can decline it.
 *
 * ## Human Design
 *
 * **The 54 strings were SOURCED, not translated, because Human Design vocabulary is a settled Russian jargon and guessing at it produces grammatical strings that name the wrong thing.** The governing rule: where the API already ships Russian for a concept, the label MATCHES it, because every one of these labels prints directly above one of those values. The centre chips sit over `Голова / Аджна / Горло / G-центр / Сердце / Сакральный / Солнечное сплетение / Селезёнка / Корень`; `{{circuit}} контур` sits over `Индивидуальный / Коллективный / Племенной`, which are masculine nominatives and so agree with `контур` for all three; `Внутренний авторитет` sits over masculine values again; and `База` sits over `Реактивная / Интегративная / Объективная`, which are FEMININE and are themselves the proof that the Base layer is `База` here and not the neuter synonym `Основание`.
 *
 * **Three entries are judgements rather than lookups, so they are written down before someone quietly reverses them.**
 *
 * `Definition` is `Тип определённости`, NOT `Определение`. The concept really is `определённость` in Russian, but the bare noun is already spent on the centre chips below it, and `Определение` is unusable twice over: it is the ordinary Russian word for a dictionary definition, and the Variables card on the same page already prints an ARROW called `Определение`, the Determination arrow. One word over two Human Design concepts on one page is the failure this catalogue exists to prevent.
 *
 * `Defined` and `Open` are the NOUNS `Определённость` and `Открытость`, not adjectives, and that is the same fix as `Натал` and `Транзит` above. The SVG renders `{centre}: {word}` and the nine centre names run across all three genders (`Голова` f., `Горло` n., `Сакральный` m.), so any one adjective is wrong on most rows. The noun pair is not a workaround either: it is the standard heading for exactly this distinction. `Открытый центр` keeps its adjective because there the noun it modifies is the fixed masculine `центр`.
 *
 * `Signature` is `Подпись типа`, and the extra word is deliberate. `Подпись` alone is the Russian UI word for a caption, and this string is a pill sitting under a chart, which is precisely the slot where a reader resolves a label to the wrong thing correctly. `подпись Типа` is the attested full phrase and carries no such reading.
 *
 * Rejected, so nobody restores them: `Сигнатура` for the signature (no attestation in Russian Human Design writing, against three sources that print `подпись`), `Основание` for the PHS Base (attested as a synonym, but neuter, and every base name the API returns is feminine), `Определение` for `Definition` (above), and `Врата` for the gates. **That last one is the one open caveat and it is a divergence, not an oversight:** the API's own gate prose writes `врата` while the practice literature prints `Ворота`, so the chrome follows the five sources and the card ends up carrying both forms. They are register variants of one word, not two concepts, which is why this was left to stand rather than fixed from the wrong repo.
 *
 * ## Monthly ephemeris
 *
 * **`Эфемериды`, always plural.** The singular `эфемерида` was rejected because it reads as one row rather than the table, and the plural is what separates a per-day table from a snapshot.
 *
 * **`Вход в знаки` for the section, not `Ингрессии`**, which is professional vocabulary a lay reader does not carry and which its own users gloss with its Latin etymology. `Транзиты` was rejected for this slot: Russian sells Транзиты as aspects to a natal chart, so an ingress list under that label reads as a personal forecast.
 *
 * **The ingress string is nominal because the verb inflects the sign.** `входит в {{sign}}` fed a bare nominative name produces wrong Russian for every sign, since the accusative differs. `Вход в знак {{sign}}` puts the sign in apposition to the inanimate masculine `знак`, which takes the same form in the accusative, so all twelve stay in the nominative the API sends.
 *
 * **`Ретроградный период` rather than the bare adjective**, for the reason the Portuguese catalogue uses a noun: `ретроградный` agrees in gender with whatever it sits under and this card also prints the lunar nodes. `Дата` is the standard column header above a column of dates; `Число` was rejected as it reads as a count.
 *
 * The empty state and the table caption are COMPOSED rather than lifted, following the patterns already in this file.
 *
 * ## Form group names
 *
 * **`Партнёр` for the numbered pair and `Человек` for the lettered one, which is a real distinction rather than a synonym shuffle.** Live Russian synastry calculators print the first for romantic, family and business synastry alike. The Human Design connection chart is the lettered pair and takes the neutral noun instead, because that reading spans family, couples and colleagues. The letters are CYRILLIC `А` and `Б`, the standing Russian convention for two anonymous entities (`из пункта А в пункт Б`).
 *
 * **`Натал` and `Релокация` are the contrastive pair used for exactly this split.** `Рождение` is plainer and was rejected on both counts that matter here: it is longer in a catalogue that is the tightest of the seven, and this file already committed to the invariant noun `Натал` for the birth-versus-other contrast.
 *
 * **`Веса сфер` is COMPOSED and deliberately drops `Веса доменов`.** Russian `домен` is the DNS term with zero astrology attestation, so that string reads as internet domain weights. `сферы жизни` is what Russian astrology calls the categories, and `веса` is the standard technical word for a numeric coefficient, where `приоритет` and `значимость` would promise a ranking the feature does not do.
 *
 * `Человек А` and `Человек Б` are the weakest entries here: unlike the numbered pair there is no live field label behind them, only the letter convention and the scope argument above.
 */
import type { ChromeString } from '../i18n/chrome-strings.js';
import './field-labels/ru.js';
export declare const ru: Record<ChromeString, string>;
