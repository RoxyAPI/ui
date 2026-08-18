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
	'Chandra lagna': 'Чандра лагна',
	'No ascendant in this chart, so the houses are not numbered.':
		'В этой карте нет асцендента, поэтому дома не пронумерованы.',
	combust: 'сожжённый',
	'planetary war': 'планетарная война',
	'planetary war with {{graha}}': 'планетарная война с {{graha}}',
	'planetary war with {{graha}}, won by {{winner}}':
		'планетарная война с {{graha}}, победил {{winner}}',
	'nakshatra lord {{graha}}': 'управитель накшатры {{graha}}',
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
	Strengths: 'Сильные стороны',
	'Key aspects': 'Ключевые аспекты',
	'Aspect breakdown': 'Баланс аспектов',
	'Element balance': 'Баланс стихий',
	'Forecast digest': 'Сводка прогноза',
	'No notable events.': 'Заметных событий нет.',
	'{{count}} events': 'событий: {{count}}',
	'significance {{value}} of 100': 'значимость {{value}} из 100',
	'I Ching hexagram': 'Гексаграмма И Цзин',
	Position: 'Положение',
	House: 'Дом',
	Motion: 'Движение',
	Formula: 'Формула',
	'°/day': '°/день',
	'Tarot spread': 'Расклад Таро',
	'(reversed)': '(перевёрнутая)',
	'{{arcana}} arcana': 'Арканы {{arcana}}',
	Upper: 'Верхняя',
	Lower: 'Нижняя',
	'Changing lines: {{lines}}.': 'Меняющиеся линии: {{lines}}.',
	'Becomes hexagram {{number}} {{name}}.':
		'Становится гексаграммой {{number}} {{name}}.',
	'{{chakra}} chakra crystals': 'Кристаллы чакры {{chakra}}',
	'{{element}} element crystals': 'Кристаллы стихии {{element}}',
	'Crystals for {{sign}}': 'Кристаллы для {{sign}}',
	'{{month}} birthstones': 'Камни рождения: {{month}}',
	Crystals: 'Кристаллы',
	'Forecast timeline': 'Лента прогноза',
	'No events in this window': 'В этот период событий нет',
	'orb {{value}}°': 'орбис {{value}}°',
	'Guna Milan score': 'Балл Гуна Милан',
	Koota: 'Кута',
	Progress: 'Прогресс',
	Score: 'Баллы',
	'{{dosha}} cancelled': '{{dosha}} отменена',
	'Moon phase calendar': 'Календарь фаз Луны',
	'Current moon phase': 'Текущая фаза Луны',
	Illumination: 'Освещённость',
	Age: 'Возраст',
	Sign: 'Знак',
	Distance: 'Расстояние',
	'{{count}} days': 'дней: {{count}}',
	'{{value}}k km': '{{value}} тыс. км',
	'Annual profection': 'Годовая профекция',
	For: 'На',
	'Lord of the year': 'Управитель года',
	'What changes at this location': 'Что меняется в этом месте',
	'Angular planets here': 'Угловые планеты здесь',
	'Planets that change house': 'Планеты, меняющие дом',
	'No planet changes house at this location.':
		'Здесь ни одна планета не меняет дом.',
	'Guna Milan breakdown: each koota with the classification of person 1 and person 2, and the score it earned out of its maximum.':
		'Разбор Гуна Милан: каждая кута с классификацией первого и второго человека и набранными баллами из возможных.',
	'{{sign}} · house {{house}}': '{{sign}} · дом {{house}}',
	'{{planet}}: house {{from}} to {{to}}': '{{planet}}: дом {{from}} в {{to}}',
	ASC: 'Асц',
	DSC: 'Дсц',
	MC: 'MC',
	IC: 'IC',
	PoF: 'ПФ',
	Vtx: 'Vtx',
	'Kundli style': 'Стиль кундли',
	North: 'Северная',
	South: 'Южная',
	East: 'Восточная',
	'in {{sign}}': 'в знаке {{sign}}',
	'pada {{n}}': 'пада {{n}}',
	Vara: 'Вара',
	'Tarot card': 'Карта таро',
	Upright: 'Прямое',
	Reversed: 'Перевёрнутое',
	'Card orientation': 'Положение карты',
	Cornerstone: 'Краеугольный камень',
	Capstone: 'Замковый камень',
	'First vowel': 'Первая гласная',
	'Core numbers': 'Ключевые числа',
	Lessons: 'Уроки',
	Debts: 'Долги',
	'Life phases': 'Жизненные этапы',
	'Obstacle periods': 'Периоды препятствий',
	'Letter analysis': 'Анализ букв',
	Opportunities: 'Возможности',
	Asteroids: 'Астероиды',
	Houses: 'Дома',
	'Black Moon Lilith': 'Чёрная Луна Лилит',
	'{{variant}} apogee': 'Апогей {{variant}}',
	'Solar arc directions': 'Дирекции солнечной дуги',
	Arc: 'Дуга',
	'Directed to': 'Дирекция на',
	'Arabic lots': 'Арабские жребии',
	Sect: 'Секта',
	Ascendant: 'Асцендент',
	Midheaven: 'Середина неба',
	'Secondary progressions': 'Вторичные прогрессии',
	'Progressed to': 'Прогрессия на',
	Elapsed: 'Прошло',
	'{{years}} yrs': '{{years}} л.',
	Biblical: 'Библейское',
	Shadow: 'Тень',
	Readings: 'Толкования',
	Advisories: 'Рекомендации',
	'Sign compatibility': 'Совместимость знаков',
	Breakdown: 'Разбор',
	'Changing lines': 'Изменяющиеся черты',
	Dynamics: 'Динамики',
	Love: 'Любовь',
	Career: 'Карьера',
	Money: 'Деньги',
	'Twin flame': 'Близнецовое пламя',
	'Western planetary positions': 'Западные положения планет',
	'Planetary positions': 'Положения планет',
	'Western planetary positions: each body with its sign, degree, house, essential dignity and motion. The dignity cell is blank for the lunar nodes, Chiron and Lilith, which rule no sign and therefore hold no dignity at all.':
		'Западные положения планет: каждое тело со знаком, градусом, домом, эссенциальным достоинством и движением. Ячейка достоинства пуста для лунных узлов, Хирона и Лилит, которые не управляют знаком и потому не имеют достоинства.',
	Dignity: 'Достоинство',
	Degree: 'Градус',
	'Vedic aspects': 'Ведические аспекты',
	'Chart time {{when}}': 'Время карты {{when}}',
	'Sidereal positions': 'Сидерические положения',
	'Mutual aspects': 'Взаимные аспекты',
	'Vedic planetary aspects: aspecting planet, aspect type, aspected planet, strength and orb.':
		'Ведические планетные аспекты: аспектирующая планета, тип аспекта, аспектируемая планета, сила и орбис.',
	From: 'От',
	Aspect: 'Аспект',
	To: 'К',
	Strength: 'Сила',
	Orb: 'Орбис',
	'Upagraha positions': 'Положения упаграх',
	Upagrahas: 'Упаграхи',
	Upagraha: 'Упаграха',
	'{{group}} upagrahas: each sub-planet with its rashi, degree in sign, sidereal longitude, and nakshatra with pada.':
		'Упаграхи {{group}}: каждая подпланета с раши, градусом в знаке, сидерической долготой и накшатрой с падой.',
	'Time based': 'По времени',
	'From the eightfold division of the day or night, so these depend on the birth time, the place and the weekday.':
		'Из восьмичастного деления дня или ночи, поэтому они зависят от времени рождения, места и дня недели.',
	'Sun based': 'По Солнцу',
	'The Dhuma group, derived by fixed arc from the Sun. Dhuma is the Sun plus 133 degrees 20 minutes, and each of the rest follows from the one before it.':
		'Группа Дхума, полученная фиксированной дугой от Солнца. Дхума это Солнце плюс 133 градуса 20 минут, и каждая следующая следует из предыдущей.',
	Rashi: 'Раши',
	Longitude: 'Долгота',
	Pada: 'Пада',
	'Nakshatra {{name}}': 'Накшатра {{name}}',
	'Nakshatra {{number}} of 27': 'Накшатра {{number}} из 27',
	Lord: 'Управитель',
	Deity: 'Божество',
	Symbol: 'Символ',
	Characteristics: 'Характеристики',
	'Mantras:': 'Мантры:',
	'Gemstones:': 'Камни:',
	'Rituals:': 'Ритуалы:',
	N: 'С',
	NE: 'СВ',
	E: 'В',
	SE: 'ЮВ',
	S: 'Ю',
	SW: 'ЮЗ',
	W: 'З',
	NW: 'СЗ',
	'Local space': 'Локальное пространство',
	'Local space compass': 'Компас локального пространства',
	'Local space compass of planetary directions from the birthplace':
		'Компас локального пространства с направлениями планет от места рождения',
	'A compass centered on the birthplace. Each body is a line pointing to its azimuth, clockwise from north. Bodies below the horizon are dimmed.':
		'Компас с центром в месте рождения. Каждое тело это линия к своему азимуту, по часовой стрелке от севера. Тела под горизонтом затемнены.',
	'Local space directions: each body with its compass direction, azimuth, altitude and whether it sits above or below the horizon.':
		'Направления локального пространства: каждое тело с направлением по компасу, азимутом, высотой и положением над или под горизонтом.',
	'{{planet}} {{direction}} {{azimuth}}° altitude {{altitude}}':
		'{{planet}} {{direction}} {{azimuth}}° высота {{altitude}}',
	Azimuth: 'Азимут',
	Altitude: 'Высота',
	Horizon: 'Горизонт',
	Astrocartography: 'Астрокартография',
	'Astrocartography world map': 'Мировая карта астрокартографии',
	'World map of planetary astrocartography lines':
		'Мировая карта планетных линий астрокартографии',
	'Equirectangular world map. Each body has a Midheaven and Imum Coeli meridian and a curved Ascendant and Descendant line, colored per body.':
		'Равнопромежуточная мировая карта. У каждого тела есть меридиан Середины неба и Глубины неба и изогнутая линия Асцендента и Десцендента, окрашенная по телу.',
	'{{planet}} {{angle}} line': 'Линия {{angle}} для {{planet}}',
	'Solid lines are the Ascendant and Midheaven, dashed are the Descendant and IC.':
		'Сплошные линии это Асцендент и Середина неба, пунктирные Десцендент и Глубина неба.',
	'Planetary lines': 'Планетные линии',
	Choghadiya: 'Чогхадия',
	'Day muhurta periods': 'Дневные периоды мухурты',
	'Daytime choghadiya': 'Дневная чогхадия',
	'No daytime periods': 'Нет дневных периодов',
	'Night muhurta periods': 'Ночные периоды мухурты',
	'Nighttime choghadiya': 'Ночная чогхадия',
	'No nighttime periods': 'Нет ночных периодов',
	Now: 'Сейчас',
	'Time range': 'Временной интервал',
	'Impact:': 'Влияние:',
	'Timing:': 'Длительность:',
	'Guidance:': 'Совет:',
	'Chara karakas': 'Чара караки',
	Atmakaraka: 'Атмакарака',
	Darakaraka: 'Даракарака',
	'Chara karakas in descending rank: each office, the graha holding it, its rashi, the degree it holds, the degree that earned the office, and what the office is read for.':
		'Чара караки в порядке убывания: каждая должность, граха, её занимающая, раши, градус, градус, давший должность, и что по ней читают.',
	Office: 'Должность',
	Graha: 'Граха',
	'Ranked on': 'Ранг по',
	'Read for': 'Читается для',
	'measured from the end of the sign': 'отсчитано от конца знака',
	'Heliacal visibility': 'Гелиакическая видимость',
	'Heliacal rising and setting': 'Гелиакический восход и заход',
	'Whether each graha stands far enough from the Sun to be seen, for {{date}}. The Sun and the nodes never appear here: they have no heliacal event.':
		'Достаточно ли каждая граха удалена от Солнца, чтобы быть видимой, на {{date}}. Солнце и узлы здесь не появляются: у них нет гелиакического явления.',
	Visible: 'Видима',
	Invisible: 'Невидима',
	rises: 'взойдёт',
	sets: 'зайдёт',
	Rose: 'Взошла',
	Set: 'Зашла',
	'in the east': 'на востоке',
	'in the west': 'на западе',
	'Visible until it {{event}} {{where}} on {{when}}':
		'Видима, пока {{when}} не {{event}} {{where}}',
	'Invisible until it {{event}} {{where}} on {{when}}':
		'Невидима, пока {{when}} не {{event}} {{where}}',
	'{{event}} {{where}} on {{when}}, with no further event inside the search window':
		'{{event}} {{where}} {{when}}, других явлений в окне поиска нет',
	'No rising or setting inside the search window, which is normal for a graha far from the Sun':
		'Ни восхода, ни захода в окне поиска, что нормально для грахи, далёкой от Солнца',
	'{{degrees}}° of time from the Sun against a limit of {{limit}}°':
		'{{degrees}}° времени от Солнца при пределе {{limit}}°',
	'{{degrees}}° of time from the Sun against a limit of {{limit}}°, becoming {{shifted}}° at that event':
		'{{degrees}}° времени от Солнца при пределе {{limit}}°, который в этом явлении становится {{shifted}}°',
	'a morning graha, read before sunrise': 'утренняя граха, читается до восхода',
	'an evening graha, read after sunset':
		'вечерняя граха, читается после захода',
	Aspects: 'Аспекты',
	'Aspect list': 'Список аспектов',
	'Aspect summary': 'Сводка аспектов',
	Patterns: 'Конфигурации',
	'{{status}} · orb {{orb}}° · str {{strength}}':
		'{{status}} · орбис {{orb}}° · сила {{strength}}',
	'Number analysis': 'Разбор числа',
	'{{count}} digits': '{{count}} цифр',
	'{{count}} unique': '{{count}} уникальных',
	'Digit root {{n}}': 'Цифровой корень {{n}}',
	Palindrome: 'Палиндром',
	Repeating: 'Повторяющееся',
	'Positive energy': 'Позитивная энергия',
	'Neutral energy': 'Нейтральная энергия',
	'Cautionary energy': 'Предостерегающая энергия',
	'Where you saw it': 'Где вы её увидели',
	'Known angel number': 'Известное ангельское число',
	'What to do next': 'Что делать дальше',
	'Foundational digit root': 'Базовый цифровой корень',
	'Foundational digit root ({{n}})': 'Базовый цифровой корень ({{n}})',
	Above: 'Над горизонтом',
	Below: 'Под горизонтом',
	Active: 'Активен',
	'Not yet active': 'Ещё не активен',
	Present: 'Присутствует',
	Absent: 'Отсутствует',
	'Current phase': 'Текущая фаза',
	'Not compatible': 'Не совместимы',
	'Ascendant moves to {{sign}}': 'Асцендент переходит в {{sign}}',
	'Ascendant stays in {{sign}}': 'Асцендент остаётся в {{sign}}',
	'Ascendant changes sign': 'Асцендент меняет знак',
	'Ascendant keeps its sign': 'Асцендент сохраняет знак',
	'Bhav Chalit': 'Бхав Чалит',
	'No graha changes house. The Rashi chart and the Chalit chart agree, which is a normal result rather than a missing reading.':
		'Ни одна граха не меняет дом. Карта раши и карта чалит совпадают, это нормальный результат, а не пропущенное толкование.',
	'{{count}} of {{total}} grahas change house between the Rashi chart and the unequal Sripati cusps.':
		'{{count}} из {{total}} грах меняют дом между картой раши и неравными куспидами Шрипати.',
	'house {{from}} in the Rashi chart, house {{to}} here':
		'дом {{from}} в карте раши, здесь дом {{to}}',
	'Bhava cusps and occupants': 'Куспиды бхав и занимающие их грахи',
	Bhava: 'Бхава',
	Start: 'Начало',
	Madhya: 'Мадхья',
	End: 'Конец',
	Span: 'Протяжённость',
	Grahas: 'Грахи',
	'Fixed stars': 'Неподвижные звёзды',
	'Conjunctions to the chart': 'Соединения с картой',
	'{{point}} conjunct {{star}}': '{{point}} в соединении с {{star}}',
	'No star sits within the orb of a natal point.':
		'Ни одна звезда не попадает в орбис натальной точки.',
	'Star catalog ({{count}})': 'Каталог звёзд ({{count}})',
	'Precessed positions for the chart date':
		'Прецессированные положения на дату карты',
	Star: 'Звезда',
	Mag: 'Вел',
	Nature: 'Природа',
	Bhavadhipati: 'Бхавадхипати',
	Dig: 'Диг',
	Drishti: 'Дришти',
	Sthana: 'Стхана',
	Kala: 'Кала',
	Chesta: 'Чешта',
	Naisargika: 'Найсаргика',
	Drik: 'Дрик',
	'Bhava Bala': 'Бхава Бала',
	'Twelve houses ranked by strength': 'Двенадцать домов по убыванию силы',
	'Twelve houses ranked by strength on the {{system}} frame':
		'Двенадцать домов по убыванию силы в системе {{system}}',
	'Component legend': 'Условные обозначения составляющих',
	'{{component}} Bala': '{{component}} Бала',
	'lord {{graha}}': 'управитель {{graha}}',
	'{{value}} rupas': '{{value}} рупа',
	'Bhava Bala {{value}} virupas': 'Бхава Бала {{value}} вирупа',
	'{{component}} {{value}} virupas': '{{component}} {{value}} вирупа',
	Shadbala: 'Шадбала',
	'Shadbala planetary strength': 'Планетная сила Шадбала',
	'{{count}} planets ranked by strength': '{{count}} планет по убыванию силы',
	'Planet strength bars': 'Столбцы силы планет',
	'Strength component legend': 'Условные обозначения составляющих силы',
	'Ishta Phala is the capacity to give benefic results, Kashta Phala the capacity to give malefic ones. Both are in virupas and are read together, since a planet can be strong and still deliver hardship.':
		'Ишта Пхала это способность давать благие результаты, Кашта Пхала способность давать неблагие. Обе в вирупах и читаются вместе, ведь планета может быть сильной и всё равно приносить трудности.',
	'{{planet}} Shadbala': '{{planet}} Шадбала',
	'rank {{n}}': 'ранг {{n}}',
	'Strength components for {{planet}}': 'Составляющие силы для {{planet}}',
	'Ishta Phala {{ishta}}, Kashta Phala {{kashta}} virupas':
		'Ишта Пхала {{ishta}}, Кашта Пхала {{kashta}} вирупа',
	'Ishta {{value}}': 'Ишта {{value}}',
	'Kashta {{value}}': 'Кашта {{value}}',
	'House {{n}}': 'Дом {{n}}',
	Positions: 'Положения',
	'Aspects ({{count}})': 'Аспекты ({{count}})',
	'Transit views': 'Виды транзитов',
	'Transit aspects': 'Транзитные аспекты',
	Speed: 'Скорость',
	Gochara: 'Гочара',
	'Gochara transits': 'Транзиты гочара',
	'Where each graha transits at {{when}}, read against the natal chart of {{birth}}.':
		'Где каждая граха транзитирует {{when}}, в сопоставлении с натальной картой от {{birth}}.',
	'Key transits': 'Ключевые транзиты',
	'Gochara houses are counted from the natal Moon in {{sign}}.':
		'Дома гочары отсчитываются от натальной Луны в знаке {{sign}}.',
	'house {{n}} from the Moon': 'дом {{n}} от Луны',
	'house {{n}} from the Lagna': 'дом {{n}} от лагны',
	'{{aspect}} natal {{planet}}': '{{aspect}} к натальной {{planet}}',
	'{{aspect}} natal {{planet}} ({{orb}}°)':
		'{{aspect}} к натальной {{planet}} ({{orb}}°)',
	'Kaksha {{n}} of {{total}}': 'Какша {{n}} из {{total}}',
	'Kaksha {{n}} of {{total}} within the current sign':
		'Какша {{n}} из {{total}} в текущем знаке',
	'Kaksha {{n}} of {{total}}, ruled by {{graha}}':
		'Какша {{n}} из {{total}}, управитель {{graha}}',
	'Kaksha {{n}} of {{total}}, spanning {{start}}° to {{end}}° of the sign':
		'Какша {{n}} из {{total}}, от {{start}}° до {{end}}° знака',
	'Kaksha {{n}} of {{total}}, ruled by {{graha}}, spanning {{start}}° to {{end}}° of the sign':
		'Какша {{n}} из {{total}}, управитель {{graha}}, от {{start}}° до {{end}}° знака',
	'this kaksha lord gave bindu': 'управитель этой какши дал бинду',
	'this kaksha lord gave no bindu': 'управитель этой какши не дал бинду',
	'this kaksha lord gave bindu, {{count}} of {{total}} in this sign':
		'управитель этой какши дал бинду, {{count}} из {{total}} в этом знаке',
	'this kaksha lord gave no bindu, {{count}} of {{total}} in this sign':
		'управитель этой какши не дал бинду, {{count}} из {{total}} в этом знаке',
	'Transiting planets: each planet with its current sign, degree and daily speed.':
		'Транзитные планеты: каждая планета со знаком, градусом и суточным движением.',
	'Vedic daily': 'Ведический день',
	'Vedic daily reading': 'Ведическое дневное прочтение',
	'{{supportive}} of {{evaluated}} grahas support this day':
		'{{supportive}} из {{evaluated}} грах поддерживают этот день',
	'Born with the Moon in {{rashi}}, nakshatra {{nakshatra}}':
		'Рождение с Луной в {{rashi}}, накшатра {{nakshatra}}',
	'{{component}} unavailable: {{reason}}':
		'{{component}} недоступно: {{reason}}',
	Paksha: 'Пакша',
	'until {{time}}': 'до {{time}}',
	'Grahas today': 'Грахи сегодня',
	'Each transiting graha with its sign, the house it occupies from the natal Moon, its bindus, its kaksha and the state the classical rules give it.':
		'Каждая транзитная граха со знаком, домом от натальной Луны, её бинду, её какшей и состоянием, которое дают классические правила.',
	Kaksha: 'Какша',
	State: 'Состояние',
	Favourable: 'Благоприятная',
	Underdelivered: 'Недоданная',
	Obstructed: 'Заблокированная',
	Void: 'Без результата',
	Aggravated: 'Отягощённая',
	Unfavourable: 'Неблагоприятная',
	'Very strong': 'Очень сильный',
	Strong: 'Сильный',
	Moderate: 'Умеренный',
	Weak: 'Слабый',
	'Tara and Chandrabala': 'Тара и чандрабала',
	'Moon in {{sign}}, house {{n}}': 'Луна в {{sign}}, дом {{n}}',
	'Ashtama Chandra': 'Аштама чандра',
	Drivers: 'Драйверы',
	Cautions: 'Предостережения',
	'{{positive}} positive against {{negative}} negative':
		'{{positive}} положительных против {{negative}} отрицательных',
	'level {{level}} {{grade}}': 'уровень {{level}} {{grade}}',
	Dasha: 'Даша',
	', governs {{sections}}': ', определяет {{sections}}',
	'Energy {{value}}/10': 'Энергия {{value}}/10',
	'Energy {{value}} of 10': 'Энергия {{value}} из 10',
	Health: 'Здоровье',
	Finance: 'Финансы',
	Advice: 'Совет',
	'Lucky number': 'Счастливое число',
	'Lucky numbers': 'Счастливые числа',
	'Lucky color': 'Счастливый цвет',
	'Lucky days': 'Счастливые дни',
	'Best with': 'Лучше всего с',
	Phase: 'Фаза',
	'Active transits': 'Активные транзиты',
	'Week by week': 'Неделя за неделей',
	'Week {{n}}': 'Неделя {{n}}',
	'Key dates': 'Ключевые даты',
	'Arudha padas': 'Арудха пады',
	Moved: 'Смещён',
	'marks a pada that fell in its own bhava or the seventh from it and was moved to the tenth from there, as the classical rule requires. {{count}} of {{total}} padas here.':
		'отмечает паду, попавшую в свою же бхаву или в седьмую от неё и смещённую в десятую оттуда, как требует классическое правило. Здесь {{count}} из {{total}} пад.',
	'The twelve Arudha padas: each pada with its bhava, the bhava sign and its lord, the sign the lord occupies, the sign the pada falls in, which house from the Lagna that is, whether the classical exception was applied, and what the pada is read for.':
		'Двенадцать арудха пад: каждая пада с её бхавой, знаком бхавы и его управителем, знаком управителя, знаком самой пады, номером дома от лагны, применялось ли классическое исключение, и что по ней читают.',
	'Bhava rashi': 'Раши бхавы',
	'Lord rashi': 'Раши управителя',
	'Pada rashi': 'Раши пады',
	'From Lagna': 'От лагны',
	Lagna: 'Лагна',
	'Arudha Lagna': 'Арудха лагна',
	Upapada: 'Упапада',
	Mahadasha: 'Махадаша',
	Antardasha: 'Антардаша',
	Pratyantardasha: 'Пратьянтардаша',
	Sookshma: 'Сукшма',
	Prana: 'Прана',
	'Dasha timeline': 'Хронология даш',
	Timeline: 'Хронология',
	'Chart details': 'Детали карты',
	'Dasha views': 'Виды даш',
	'Vimshottari Mahadasha': 'Вимшоттари махадаша',
	'Active dashas': 'Активные даши',
	'{{level}} periods in {{planet}} {{parent}}':
		'Периоды {{level}} в {{planet}} {{parent}}',
	'{{planet}} {{level}}': '{{planet}} {{level}}',
	'Inside the {{planet}} {{level}}{{span}}{{duration}}.':
		'Внутри {{level}} {{planet}}{{span}}{{duration}}.',
	'It began {{date}}, before birth, so only the sub-periods running after the birth date are listed.':
		'Она началась {{date}}, до рождения, поэтому перечислены только подпериоды после даты рождения.',
	'Moon nakshatra: {{name}}': 'Накшатра Луны: {{name}}',
	'Moon nakshatra: {{name}} (lord {{lord}})':
		'Накшатра Луны: {{name}} (управитель {{lord}})',
	'{{balance}} left': 'осталось {{balance}}',
	'Signifies {{houses}}': 'Обозначает {{houses}}',
	Biorhythm: 'Биоритм',
	'Daily biorhythm': 'Дневной биоритм',
	'Biorhythm forecast': 'Прогноз биоритма',
	Forecast: 'Прогноз',
	'No forecast': 'Прогноза нет',
	'Biorhythm cycle lines across the forecast window':
		'Кривые циклов биоритма на всём окне прогноза',
	'Spotlight cycle': 'Выделенный цикл',
	'critical day': 'критический день',
	'Critical days': 'Критические дни',
	'Two or more cycles cross zero on {{dates}}. Take extra care on these dates.':
		'Два и более цикла пересекают ноль {{dates}}. В эти дни стоит быть особенно внимательным.',
	'Best day': 'Лучший день',
	'Worst day': 'Худший день',
	'Average energy': 'Средняя энергия',
	Events: 'События',
	'Double days': 'Двойные дни',
	'Triple day': 'Тройной день',
	'Readings ({{count}})': 'Толкования ({{count}})',
	Intellectual: 'Интеллектуальный',
	Intuitive: 'Интуитивный',
	'Vedic planetary positions': 'Ведические положения планет',
	'Vedic planetary positions: each graha with its rashi, degree, nakshatra, pada, nakshatra lord, house, its state in all three avastha systems, and retrograde state. Jagradadi and Deeptadi are read from sign dignity, which the nodes and the Lagna do not have, so those two cells are blank on the Rahu, Ketu and Lagna rows. Uranus, Neptune and Pluto appear only when asked for and rule no sign, so every avastha and house cell is blank on their rows too.':
		'Ведические положения планет: каждая граха с раши, градусом, накшатрой, падой, управителем накшатры, домом, состоянием во всех трёх системах авастха и попятностью. Джаградади и Диптади читаются по достоинству в знаке, которого нет у узлов и лагны, поэтому эти две ячейки пусты в строках Раху, Кету и лагны. Уран, Нептун и Плутон появляются только по запросу и не управляют знаками, поэтому в их строках пусты все ячейки авастхи и дома.',
	'Nak. lord': 'Упр. накш.',
	Baladi: 'Балади',
	Jagradadi: 'Джаградади',
	Deeptadi: 'Диптади',
	'Baladi: the five age states, set by degree within the sign':
		'Балади: пять возрастных состояний, по градусу внутри знака',
	'Jagradadi: the three waking states, set by sign dignity. The seven classical grahas only':
		'Джаградади: три состояния бодрствования, по достоинству в знаке. Только семь классических грах',
	'Deeptadi: the nine dispositional states, set by sign dignity. The seven classical grahas only':
		'Диптади: девять состояний расположения, по достоинству в знаке. Только семь классических грах',
	Retro: 'Ретро',
	'Combust grahas': 'Сожжённые грахи',
	'{{distance}} deg from Sun, within {{orb}} deg orb':
		'{{distance}} градусов от Солнца, в пределах орбиса {{orb}} градусов',
	'Planetary wars': 'Планетные войны',
	'{{first}} vs {{second}}': '{{first}} против {{second}}',
	'{{distance}} deg apart': '{{distance}} градусов между ними',
	'{{graha}} wins': 'побеждает {{graha}}',
	Interpretations: 'Толкования',
	'Rashi.': 'Раши.',
	'Nakshatra.': 'Накшатра.',
	'Bhava significations': 'Значения бхав',
	Yogas: 'Йоги',
	Ashtakavarga: 'Аштакаварга',
	'Ashtakavarga grid': 'Сетка аштакаварги',
	'Ashtakavarga views': 'Виды аштакаварги',
	Sarvashtakavarga: 'Сарваштакаварга',
	Bhinnashtakavarga: 'Бхиннаштакаварга',
	Reduced: 'Сокращённая',
	'Reduced SAV': 'Сокращённая САВ',
	'Shodhya Pinda': 'Шодхья Пинда',
	'{{count}} signs': 'знаков: {{count}}',
	'Fewer bindus': 'Меньше бинду',
	'More bindus': 'Больше бинду',
	Bindus: 'Бинду',
	'Rashi Pinda': 'Раши Пинда',
	'Graha Pinda': 'Граха Пинда',
	'No sarvashtakavarga data': 'Нет данных сарваштакаварги',
	'No bhinnashtakavarga data': 'Нет данных бхиннаштакаварги',
	'No reduced ashtakavarga data': 'Нет данных сокращённой аштакаварги',
	'No bindu data': 'Нет данных по бинду',
	'No shodhya pinda data': 'Нет данных шодхья пинды',
	'Sarvashtakavarga: each of the twelve signs and the bindus all planets contribute to it, with a grand total.':
		'Сарваштакаварга: каждый из двенадцати знаков и бинду, которые дают ему все планеты, с общим итогом.',
	'Shodhya Pinda: each planet with its Rashi Pinda, Graha Pinda and Shodhya Pinda strength scores.':
		'Шодхья Пинда: каждая планета со значениями силы Раши Пинда, Граха Пинда и Шодхья Пинда.',
	'Detected yogas': 'Обнаруженные йоги',
	'Yoga catalog': 'Каталог йог',
	'Yoga results': 'Результаты по йогам',
	'No yoga data': 'Нет данных по йогам',
	'No yogas match your search.': 'Ни одна йога не подходит под запрос.',
	'Filter yogas...': 'Фильтр йог...',
	'Filter detected yogas by name': 'Фильтровать обнаруженные йоги по названию',
	'Filter yoga list by name': 'Фильтровать список йог по названию',
	'{{count}} of {{total}} present': '{{count}} из {{total}} присутствуют',
	'{{count}} total': 'всего: {{count}}',
	'Classical family': 'Классическое семейство',
	Effects: 'Действие',
	'Every classical condition is satisfied by this chart.':
		'В этой карте выполнено каждое классическое условие.',
	'The rule matched, but a stronger family silences it under the classical precedence norms. Each card names the family that took precedence.':
		'Правило сработало, но более сильное семейство подавляет его по классическим нормам старшинства. На каждой карточке указано семейство, получившее приоритет.',
	'At least one classical condition fails. Read the evidence for which.':
		'Хотя бы одно классическое условие не выполнено. В обоснованиях видно какое.',
	Synastry: 'Синастрия',
	'Synastry compatibility chart': 'Карта совместимости синастрии',
	'Synastry dual wheel': 'Двойное колесо синастрии',
	'Dual chart wheel comparing two natal charts':
		'Двойное колесо, сравнивающее две натальные карты',
	'Synastry response missing planet positions.':
		'В ответе синастрии нет положений планет.',
	'A current {{endpoint}} response carries {{first}} and {{second}}, and the inter-aspect readings below still work without them.':
		'Актуальный ответ {{endpoint}} содержит {{first}} и {{second}}, а толкования межаспектов ниже работают и без них.',
	'Inter-aspects': 'Межаспекты',
	'Inter-aspect summary': 'Сводка межаспектов',
	'In this pairing': 'В этой паре',
	'All {{count}} inter-aspects': 'Все межаспекты: {{count}}',
	'orb {{orb}}° · str {{strength}}': 'орбис {{orb}}° · сила {{strength}}',
	'ASC{{n}}': 'Асц{{n}}',
	'Person {{n}}': 'Человек {{n}}',
	'Score {{score}} of 100': 'Оценка {{score}} из 100',
	'Sign sectors, not houses': 'Секторы знаков, не дома',
	'Planet 1': 'Планета 1',
	'Planet 2': 'Планета 2',
	'Inter-chart aspects: the planet from chart 1, the planet from chart 2, the aspect between them, the orb in degrees and the strength.':
		'Аспекты между картами: планета из карты 1, планета из карты 2, аспект между ними, орбис в градусах и сила.',
};

registerLocale('ru', ru);
