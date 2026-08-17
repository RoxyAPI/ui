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
import { registerLocale } from '../i18n/registry.js';
import './field-labels/ru.js';

export const ru: Record<ChromeString, string> = {
	'Edit query': 'Изменить запрос',
	'Spiritual data by RoxyAPI': 'Духовные данные от RoxyAPI',
	'No data': 'Нет данных',
	Loading: 'Загрузка',
	Reading: 'Трактовка',

	'Natal chart': 'Натальная карта',
	'Relocation chart': 'Карта релокации',
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
	'{{percent}} tight': 'точность {{percent}}',
	apex: 'вершина',

	'Planet readings': 'Трактовки планет',

	Transits: 'Транзиты',
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

	Ephemeris: 'Эфемериды',
	'Signs in this month': 'Знаки в этом месяце',
	'Sign changes and retrograde periods': 'Вход в знаки и ретроградные периоды',
	'Daily positions': 'Положения планет по дням',
	Date: 'Дата',
	'Enters {{sign}} on {{date}}': 'Вход в знак {{sign}}, {{date}}',
	'Retrograde {{range}}': 'Ретроградный период {{range}}',
	'Every body with its position on each day of the month, as a zodiac sign and a degree.':
		'Каждый объект с его положением на каждый день месяца, указано знаком зодиака и градусом.',

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

	'Personality line': 'Линия Личности',
	'Design line': 'Линия Дизайна',
	Lines: 'Линии',

	Variables: 'Переменные',
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

	// The FORM path (`<roxy-endpoint-form>` and the `<roxy-location-search>` it slots). What a
	// visitor reads BEFORE any card renders. Field labels and enum options are `humanize()` over
	// spec field names and are deliberately absent: no catalogue keyed on English source text can
	// reach a string computed per operation. The GROUP names below are the exception, because the
	// spec has nine of them rather than 909.
	'Birth location': 'Место рождения',
	'{{group}} location': 'Место ({{group}})',
	'City of birth': 'Город рождения',
	'{{group}} city': 'Город ({{group}})',
	'Person 1': 'Партнёр 1',
	'Person 2': 'Партнёр 2',
	'Person A': 'Человек А',
	'Person B': 'Человек Б',
	'Birth Data': 'Данные рождения',
	Birth: 'Натал',
	Relocation: 'Релокация',
	'Domain Weights': 'Веса сфер',
	'Fills {{fields}}. Pick a city to autofill.':
		'Заполняет {{fields}}. Выберите город для автозаполнения.',
	Choose: 'Выберите',
	'Comma separated': 'Через запятую',
	Advanced: 'Дополнительно',
	'Please complete:': 'Заполните:',
	'Search city': 'Начните вводить город',
	'No cities found': 'Городов не найдено',
	Compare: 'Сравнить',
	Cast: 'Гадать',
	'Get reading': 'Получить трактовку',
	Generate: 'Рассчитать',
	'Schema load failed: {{message}}': 'Не удалось загрузить схему: {{message}}',
	'Endpoint {{method}} {{path}} not found in OpenAPI spec':
		'Эндпоинт {{method}} {{path}} не найден в спецификации OpenAPI',
	'HTTP error {{status}}': 'Ошибка HTTP {{status}}',
	Retry: 'Повторить',
	'Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side.':
		'Клиентские компоненты принимают только публикуемый ключ pk_. Используйте публикуемый ключ со списком разрешённых источников или серверный рендеринг.',
	Severity: 'Степень',
	Remedies: 'Средства',
	Exceptions: 'Исключения',
	'Dream symbol': 'Символ сна',
	'Dream symbols': 'Символы сна',
	'{{count}} matches': 'совпадений: {{count}}',
	Hora: 'Хора',
	'Hora periods': 'Планетные часы',
	'Vedic kundli': 'Ведическая карта',
	'Vedic birth chart with twelve sign houses':
		'Ведическая натальная карта с двенадцатью знаковыми домами',
	'Angel number': 'Число ангела',
	'Digit root': 'Цифровой корень',
	'Action steps': 'Шаги',
	Colors: 'Цвета',
	Keywords: 'Ключевые слова',
	'Pairs with': 'Сочетается с',
	Vargottama: 'Варготтама',
	'Vargottama planets': 'Планеты варготтама',
	'{{chart}} divisional chart with twelve sign houses':
		'Дробная карта {{chart}} с двенадцатью знаковыми домами',
	'Sidereal frame: {{frame}}': 'Сидерическая система: {{frame}}',
	'Sidereal frame: {{frame}}, {{degrees}}° subtracted':
		'Сидерическая система: {{frame}}, вычтено {{degrees}}°',
	Day: 'День',
	Night: 'Ночь',
	Planet: 'Планета',
	Hardness: 'Твёрдость',
	Vibration: 'Вибрация',
	Birthstone: 'Камень рождения',
	Chakras: 'Чакры',
	Zodiac: 'Знак зодиака',
	Elements: 'Стихии',
	Spiritual: 'Духовное',
	Emotional: 'Эмоциональное',
	Physical: 'Физическое',
	Master: 'Мастер',
	'Master number': 'Мастер-число',
	'Birth day profile': 'Профиль дня рождения',
	'Lucky associations': 'Счастливые соответствия',
	Missing: 'Отсутствует',
	'No numbers are missing from the birth name.':
		'В имени при рождении нет пропущенных чисел.',
	'How to overcome': 'Как преодолеть',
	'Karmic lessons': 'Кармические уроки',
	Debt: 'Долг',
	Challenge: 'Испытание',
	Resolution: 'Разрешение',
	'Karmic debt': 'Кармический долг',
	'Personal year': 'Личный год',
	Pinnacles: 'Вершины',
	Lesson: 'Урок',
	Challenges: 'Испытания',
	'Name numbers': 'Числа имени',
	'Name letters': 'Буквы имени',
	'Personal month': 'Личный месяц',
	'Calendar month': 'Календарный месяц',
	Maturity: 'Зрелость',
	'Current age': 'Текущий возраст',
	Activates: 'Активирует',
	Element: 'Стихия',
	'Ruling planet': 'Управляющая планета',
	Gemstones: 'Драгоценные камни',
	Compatible: 'Совместимо',
	Incompatible: 'Несовместимо',
	'Life Path': 'Число жизненного пути',
	Expression: 'Число выражения',
	'Soul Urge': 'Число души',
	'Birth Day': 'Число дня рождения',
	'Daily Number': 'Число дня',
	'Personal Day': 'Личный день',
	'Numerology chart': 'Нумерологическая карта',
	Panchang: 'Панчанга',
	'Auspicious muhurtas': 'Благоприятные мухурты',
	'Inauspicious periods': 'Неблагоприятные периоды',
	'Next transitions': 'Следующие переходы',
	'None today': 'Сегодня нет',
	'Bhadra (Vishti)': 'Бхадра (Вишти)',
	Panchaka: 'Панчака',
	'Favorable Moon signs': 'Благоприятные лунные знаки',
	'Favorable birth nakshatras': 'Благоприятные накшатры рождения',
	'Unfavorable birth nakshatras': 'Неблагоприятные накшатры рождения',
	'Chandrabalam and Tarabalam': 'Чандрабала и Тарабала',
	None: 'Нет',
	'Moon sign': 'Лунный знак',
	'Sun sign': 'Солнечный знак',
	'Sun nakshatra': 'Накшатра Солнца',
	'Amrit Kalam': 'Амрит Калам',
	'Dur Muhurta': 'Дур Мухурта',
	Varjyam: 'Варджьям',
	Sunrise: 'Восход',
	Sunset: 'Закат',
	Moonrise: 'Восход Луны',
	Moonset: 'Заход Луны',
	Sun: 'Солнце',
	Moon: 'Луна',
	'Ashtama Chandra rashi': 'Аштама Чандра раши',
	'{{sign}} until {{time}}': '{{sign}} до {{time}}',
	'{{sign}} until {{time}}, then {{next}}':
		'{{sign}} до {{time}}, затем {{next}}',
	'{{range}} (ends {{date}})': '{{range}} (окончание {{date}})',
	Tithi: 'Титхи',
	Nakshatra: 'Накшатра',
	Yoga: 'Йога',
	Karana: 'Карана',
	'ends {{time}}': 'заканчивается {{time}}',
	'ends {{time}} to {{next}}': 'заканчивается {{time}}, затем {{next}}',
	'ends {{time}} to {{next}} pada {{pada}}':
		'заканчивается {{time}}, затем {{next}} пада {{pada}}',
};

registerLocale('ru', ru);
