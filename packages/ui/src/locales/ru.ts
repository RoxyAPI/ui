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

	'Chart patterns': 'Конфигурации аспектов',
	Dissociate: 'Диссоциированная',
	'Out of sign: one or more planets sit outside the pattern element or modality, so the theme holds but runs weaker.':
		'Вне знака: одна или несколько планет выходят за стихию или крест конфигурации, поэтому тема сохраняется, но действует слабее.',
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
	Timing: 'Сроки',
	Guidance: 'Рекомендации',
};

registerLocale('ru', ru);
