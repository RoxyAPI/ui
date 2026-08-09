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
 * **`Natal` and `Transiting` are NOUNS here (`Натал`, `Транзит`), not the adjectives `Натальный` and `Транзитный`, and that is the same class of fix as the numeral one above.** Both strings sit in front of an API-returned body name, and Russian adjectives agree in gender across all three the API returns (Марс m., Венера f., Солнце n.), so one invariant adjective is wrong on most rows. An invariable noun label is correct on all of them, and it is how ZET writes its own compound chart names (`натал-муж`, `транзит-бракосочетание`). The adjective forms ARE used wherever the noun they modify is fixed and known: `транзитных объектов`, `натальных домов`, `Сводка транзитных аспектов`.
 *
 * Rejected against sources, so nobody restores them: `формирующийся`/`распадающийся` for applying and separating (Russian Wikipedia lists that as a SEPARATE axis alongside сходящиеся/расходящиеся, so substituting it changes what the chip asserts), `бикольцо` for the bi-wheel (zero attestation, a bare calque; the professional form is `двойная карта`, per the ZET 9 manual), `вершина дома` for a cusp (correct Russian, but this catalogue already spends `вершина` on the aspect-pattern apex, and every Russian program UI writes `куспид`), `космограмма` for the sign-wheel chip (it names the whole chart TYPE and would claim the chart has no houses, which is a different chip), and `равнодомная система` for the equal-sector fallback (a house-system name, and the fallback fires precisely when the response named none).
 *
 * One caveat recorded rather than hidden: the applying and separating pair is attested in two Russian Wikipedia articles citing two different published Russian astrology books, but one publisher. Worth a second look if anyone reaches a second independent source.
 *
 * **`Аспектные фигуры` replaced `Конфигурации аспектов` on 2026-08-09, and the evidence genuinely cuts both ways.** The old string was the MORE attested term (astromeridian, `аспекты в натальной карте называются конфигурациями`; astromaya, `образовывать геометрические фигуры, которые и называют конфигурациями`; astro21). It was replaced anyway, for the reason the Spanish sibling records: `конфигурация` is also the generic Russian tech word for settings, Russian astrology software really does ship an aspect-configuration screen with the orb tables on it (ZET, `Аспектация`), and we have already paid once for a heading that a reader could resolve to a settings panel. The replacement is attested for exactly this class with no such reading: vgoroskope, `эта структура в астрологии называется аспектными фигурами`. It also matches `de.ts` `Aspektfiguren` and `es.ts` `Figuras planetarias`, so all three locales now name the same thing the same way. Mitigating fact for anyone reconsidering: ZET itself calls settings `Настройка` and `Установки`, never `конфигурация`.
 *
 * **`Через знак` replaced `Диссоциированная` in the same pass.** The old word had no attestation in Russian astrology at all. The new one is the native term and its source sentence is almost our own: astro21, `если одна планета в аспекте в конце знака, а другая в начале, то такой аспект называется аспектом через знак (или рваным аспектом). Тогда это будет соединение в разных знаках, трин в разных стихиях или напряженный аспект в разных крестах.` The explanation sentence moved with the chip so the two use one word. **Caveat recorded rather than hidden: that is ONE school across two pages, not two independent authorities.** `Вне знака` is the plain-Russian fallback if a second source never turns up. Separately, that same page holds that out-of-sign aspects work at full strength, which our English source string contradicts; the translation stays faithful to the source rather than taking a side, and the disagreement is the API's to settle.
 *
 * **`Длительность` replaced `Сроки` for the timing paragraph, and that was a CONTRACT error rather than a vocabulary one.** The spec defines the field as how long the transit influence lasts, with buckets like a few hours or a few days. `Сроки` reads as deadlines or terms, which is a schedule. Every sibling locale already used a duration word.
 *
 * `Кард.`, `Фикс.` and `Мут.` for the cross-tab columns are ours: every Russian source spells all three qualities out, including in the tally panel beside a chart. The trailing period is correct Russian truncation orthography. The full forms are the bare MASCULINE ADJECTIVES rather than the noun `крест`, which is what a Russian distribution table actually prints: astrologbrova tallies a chart and writes `Итог - Кардинальный 5, Фиксированный 3, Мутабельный 2`. `крест` stays where it belongs, in `Преобладающий крест` and `по стихиям и крестам`.
 *
 * One thing noted and not changed: `дома по системе {{system}}` renders `по системе Плацидус` where Russian wants the genitive `Плацидуса`. The interpolated value comes off the wire in nominative form and no wording here can decline it.
 *
 * **The 54 Human Design strings added on 2026-08-09 were SOURCED, not translated, because Human Design vocabulary is a settled Russian jargon and guessing at it produces grammatical strings that name the wrong thing.** The governing rule of that pass: where `packages/human-design/src/locales/ru.ts` in the API already ships Russian for a concept, the label MATCHES it, because every one of these labels prints directly above one of those values. The centre chips sit over `Голова / Аджна / Горло / G-центр / Сердце / Сакральный / Солнечное сплетение / Селезёнка / Корень`; `{{circuit}} контур` sits over `Индивидуальный / Коллективный / Племенной`, which are masculine nominatives and so agree with `контур` for all three; `Внутренний авторитет` sits over `Сакральный / Эмоциональный / Селезёночный`, masculine again; and `База` sits over `Реактивная / Интегративная / Объективная`, which are FEMININE and are themselves the proof that the Base layer is `База` here and not the neuter synonym `Основание`.
 *
 * Sources, all fetched live and all Russian Human Design practice rather than dictionaries. hdeducation.ru (the school running the certified analyst programme) for `Тип`, `Стратегия`, `Внутренний Авторитет`, `Ложное Я`, the heading `Определенность и Открытость` that both centre chips come from, `моторных центров`, and `Награда Манифестора (подпись Типа)`. humdes.com knowledge base for the section titles `Ворота`, `Каналы`, `Центры`, `Профили`, `Контуры`, and its Переменные article for `Когниция` (`Когниция это не продукт упражнения сознания личности, это продукт работы мозга`) and for `Цвета, Тона и Базы`. lybomudr.ru for `Линии`, `Инкарнационные кресты`, `Гексаграммы И-Цзин`, `Переменные`, and `D сторона Дизайна, P сторона Личности`, which is where `Стороны карты` comes from. realfaq.ru, whose pinned thread is titled `Цвет, Тон и База в Дизайне Человека`, and which also supplies the mechanism behind the two low-confidence strings (`Период устойчивости Базы` is about 8 minutes, of Тона about 40 minutes). ihumandesign.su for `Бодиграф`, `Определенность`, `Переменные Дизайна Человека` and `активации` (`Красно-черные активации указывают на две и более активаций одних и тех же ворот`). human-design.space for `Индивидуальный контур`, `Коллективный контур`, `Племенной контур`. gate65.ee and humandesignart.ru for `подпись` as the reward-for-correctness term. chronos.mg for `И-цзин` and `Инкарнационный крест`.
 *
 * **Three entries are judgements rather than lookups, so they are written down before someone quietly reverses them.**
 *
 * `Definition` is `Тип определённости`, NOT `Определение`. The concept really is `определённость` in Russian (lybomudr and realfaq both title articles `Определённости`, ihumandesign heads a section `Определенность`, and the API prose says `самый медленный из всех типов определённости`), but the bare noun is already spent on the centre chips below it, and `Определение` is unusable twice over: it is the ordinary Russian word for a dictionary definition, and the Variables card on the same page already prints an ARROW called `Определение`, the Determination arrow. One word over two Human Design concepts on one page is lesson 32 with the language swapped.
 *
 * `Defined` and `Open` are the NOUNS `Определённость` and `Открытость`, not adjectives, and that is the same fix as `Натал` and `Транзит` above. The SVG renders `{centre}: {word}` and the nine centre names run across all three genders (`Голова` f., `Горло` n., `Сакральный` m.), so any one adjective is wrong on most rows. The noun pair is not a workaround either: it is hdeducation's own heading for exactly this distinction. `Открытый центр` keeps its adjective because there the noun it modifies is the fixed masculine `центр`.
 *
 * `Signature` is `Подпись типа`, and the extra word is deliberate. `Подпись` alone is the Russian UI word for a caption, and this string is a pill sitting under a chart, which is precisely the slot where a reader resolves a label to the wrong thing correctly. `подпись Типа` is the attested full phrase and carries no such reading.
 *
 * Rejected against sources, so nobody restores them: `Сигнатура` for the signature (no attestation in any Russian Human Design source read here, against three that print `подпись`), `Основание` for the PHS Base (attested at realfaq as a synonym, but neuter, and every base name the API returns is feminine), `Определение` for `Definition` (above), and `Врата` for the gates. **That last one is the one open caveat and it is a divergence, not an oversight:** the API's own gate prose writes `врата`, while humdes, hdeducation, lybomudr, ihumandesign and human-design.space all print `Ворота`, so the chrome follows the five sources and the card ends up carrying both forms. They are register variants of one word, not two concepts, which is why this was left to stand rather than fixed from the wrong repo.
 */

import type { ChromeString } from '../i18n/chrome-strings.js';
import { registerLocale } from '../i18n/registry.js';

export const ru: Record<ChromeString, string> = {
	'Edit query': 'Изменить запрос',
	'Spiritual data by RoxyAPI': 'Духовные данные от RoxyAPI',
	'No data': 'Нет данных',
	Loading: 'Загрузка',
	Reading: 'Трактовка',

	'Natal chart': 'Натальная карта',
	'Relocation chart': 'Карта релокации',
	'No chart data': 'Нет данных карты',
	Wheel: 'Круг карты',
	'Aspect grid': 'Таблица аспектов',
	'Natal chart views': 'Виды натальной карты',
	'Natal chart wheel': 'Круг натальной карты',
	'Natal chart wheel with twelve houses, planets, and aspects':
		'Круг натальной карты с двенадцатью домами, планетами и аспектами',
	'Natal chart wheel with planets and aspects, houses shown as equal sectors from the Ascendant':
		'Круг натальной карты с планетами и аспектами, дома показаны равными секторами от Асцендента',
	'Equal sectors from the Ascendant, no house cusps in this response':
		'Равные секторы от Асцендента, куспидов домов в этом ответе нет',
	'Twelve zodiac sign segments around a circular wheel. Planet glyphs are placed at their ecliptic longitudes. Aspect lines connect related planets.':
		'Двенадцать секторов знаков зодиака по кругу. Символы планет стоят на своих эклиптических долготах. Линии аспектов соединяют связанные планеты.',
	retrograde: 'ретроградный',

	'{{count}} planets': 'планет: {{count}}',
	'{{count}} aspects': 'аспектов: {{count}}',
	'{{system}} houses': 'дома по системе {{system}}',

	'No planets to grid': 'Нет планет для таблицы',
	'Planet by planet aspect grid: the aspect each pair of planets forms, read from the planet naming the row across to the planet naming the column.':
		'Таблица аспектов планета за планетой: аспект каждой пары планет читается от планеты в строке к планете в столбце.',
	orb: 'орбис',

	'Dominant element': 'Преобладающая стихия',
	'Dominant modality': 'Преобладающий крест',
	Harmonious: 'Гармоничные',
	Challenging: 'Напряжённые',
	Neutral: 'Нейтральные',
	'All {{count}} bodies in the chart, placed by sign':
		'Все объекты карты ({{count}}), распределённые по знакам',
	'Element and modality distribution': 'Распределение по стихиям и крестам',
	Total: 'Всего',

	Fire: 'Огонь',
	Earth: 'Земля',
	Air: 'Воздух',
	Water: 'Вода',
	Cardinal: 'Кардинальный',
	Fixed: 'Фиксированный',
	Mutable: 'Мутабельный',
	Car: 'Кард.',
	Fix: 'Фикс.',
	Mut: 'Мут.',

	'Chart patterns': 'Аспектные фигуры',
	Dissociate: 'Через знак',
	'Out of sign: one or more planets sit outside the pattern element or modality, so the theme holds but runs weaker.':
		'Через знак: одна или несколько планет выходят за стихию или крест фигуры, поэтому тема сохраняется, но действует слабее.',
	'{{percent}}% tight': 'точность {{percent}}%',
	apex: 'вершина',

	'Planet readings': 'Трактовки планет',

	Transits: 'Транзиты',
	'No transit data': 'Нет данных о транзитах',
	'Aspects to the natal chart: {{count}}':
		'Аспектов к натальной карте: {{count}}',
	'Natal and transit bi-wheel': 'Двойная карта: натал и транзит',
	'Bi-wheel with natal bodies on the inner ring and transiting bodies on the outer ring':
		'Двойная карта: натальные объекты во внутреннем круге, транзитные объекты во внешнем круге',
	'Twelve zodiac sign segments around a circular wheel. Natal bodies sit at their ecliptic longitudes on the inner ring and transiting bodies on the outer ring, and each line joins a transiting body to the natal body it aspects.':
		'Двенадцать секторов знаков зодиака по кругу. Натальные объекты стоят на своих эклиптических долготах во внутреннем круге, транзитные во внешнем, и каждая линия соединяет транзитный объект с натальным, с которым он образует аспект.',

	'{{count}} natal bodies': 'натальных объектов: {{count}}',
	'{{count}} transiting bodies': 'транзитных объектов: {{count}}',
	'Ascendant on the left horizon': 'Асцендент слева на горизонте',
	'First house cusp on the left horizon':
		'Куспид первого дома слева на горизонте',
	'Sign wheel, 0° Aries on the left': 'Зодиакальный круг, 0° Овна слева',
	'House cusps supplied by the page': 'Куспиды домов заданы страницей',
	'House cusps from the response': 'Куспиды домов из ответа',
	'No house cusps': 'Без куспидов домов',

	'Transit aspect summary': 'Сводка транзитных аспектов',
	Strongest: 'Самый сильный',
	Natal: 'Натал',
	Transiting: 'Транзит',
	Applying: 'Сходящийся',
	Separating: 'Расходящийся',
	strength: 'сила',

	'Every body with its natal position and its position on the transit date, each as a zodiac sign and a degree.':
		'Каждый объект с его натальным положением и положением на дату транзита, оба указаны знаком зодиака и градусом.',
	'Both house numbers are read against the natal house cusps.':
		'Оба номера домов отсчитываются по куспидам натальных домов.',
	Body: 'Объект',
	'Natal house': 'Дом в натале',
	'Transiting house': 'Дом на транзите',

	'Transit readings': 'Трактовки транзитов',
	Impact: 'Влияние',
	Timing: 'Длительность',
	Guidance: 'Рекомендации',

	'Nested data omitted': 'Вложенные данные не отображаются',
	'Generic data display': 'Отображение данных',
	'Empty list': 'Список пуст',
	'Data table': 'Таблица данных',
	'{{count}} rows': 'Строк: {{count}}',
	Yes: 'Да',
	No: 'Нет',
	illustration: 'Иллюстрация',

	Type: 'Тип',
	Strategy: 'Стратегия',
	Authority: 'Внутренний авторитет',
	Profile: 'Профиль',
	Definition: 'Тип определённости',
	Aura: 'Аура',
	'Incarnation cross': 'Инкарнационный крест',
	'Signature: {{value}}': 'Подпись типа: {{value}}',
	'Not-self: {{value}}': 'Ложное Я: {{value}}',
	'Profile {{profile}}': 'Профиль {{profile}}',
	'Line {{line}} · Personality': 'Линия {{line}} · Личность',
	'Line {{line}} · Design': 'Линия {{line}} · Дизайн',
	Personality: 'Личность',
	Design: 'Дизайн',

	Bodygraph: 'Бодиграф',
	'No bodygraph data': 'Нет данных бодиграфа',
	'Human Design bodygraph': 'Бодиграф Дизайна Человека',
	'Human Design bodygraph with nine centers, channels, and activated gates overlaid on a human silhouette':
		'Бодиграф Дизайна Человека с девятью центрами, каналами и активированными воротами на силуэте человека',
	'Nine energy centers in their canonical positions over a human silhouette, each filled with its traditional color when defined and outlined when open, wired by channels between activated gates.':
		'Девять энергетических центров в их каноническом расположении на силуэте человека: определённые залиты своим традиционным цветом, открытые показаны контуром, а каналы соединяют активированные ворота.',
	'Center colors when defined. Open centers are outlined.':
		'Цвета центров в определённом состоянии. Открытые центры показаны контуром.',
	'Open center': 'Открытый центр',
	'Defined channels ({{count}})': 'Определённые каналы ({{count}})',
	'{{circuit}} circuit': '{{circuit}} контур',
	'Centers ({{defined}} defined, {{open}} open)':
		'Центры (определённых: {{defined}}, открытых: {{open}})',
	Defined: 'Определённость',
	Open: 'Открытость',
	Motor: 'Мотор',
	Awareness: 'Осознанность',
	'Not-self question': 'Вопрос ложного Я',
	Biology: 'Биология',
	'Gates {{gates}}': 'Ворота {{gates}}',
	'Activations ({{count}})': 'Активации ({{count}})',
	'Chart sides': 'Стороны карты',
	'Line {{line}}': 'Линия {{line}}',
	'Gate {{gate}}': 'Ворота {{gate}}',
	'I Ching hexagram {{number}}': 'Гексаграмма И-цзин {{number}}',

	'No Human Design data': 'Нет данных Дизайна Человека',
	'Personality line': 'Линия Личности',
	'Design line': 'Линия Дизайна',
	Lines: 'Линии',

	Variables: 'Переменные',
	'No variables data': 'Нет данных о переменных',
	'Human Design variables': 'Переменные Дизайна Человека',
	'Low confidence: a birth time near a color or tone boundary. Verify the exact birth time.':
		'Низкая достоверность: время рождения близко к границе цвета или тона. Уточните точное время рождения.',
	'Low confidence: a birth time near a color or tone boundary (within {{margin}}°). Verify the exact birth time.':
		'Низкая достоверность: время рождения близко к границе цвета или тона (в пределах {{margin}}°). Уточните точное время рождения.',
	'Color {{color}} · Tone {{tone}} · Base {{base}}':
		'Цвет {{color}} · Тон {{tone}} · База {{base}}',
	'Knife-edge: could flip with a more precise birth time.':
		'На грани: значение может измениться при более точном времени рождения.',
	Base: 'База',
	Color: 'Цвет',
	Tone: 'Тон',
	Direction: 'Направление',
	Cognition: 'Когниция',

	Reference: 'Справочник',
	'No reference data': 'Нет данных справочника',
};

registerLocale('ru', ru);
