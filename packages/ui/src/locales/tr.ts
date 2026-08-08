/**
 * Turkish chrome strings.
 *
 * @remarks
 * Importing this module registers the catalogue and re-renders every mounted component, so it is a side-effect entry, exactly like a `components/*` module. It is built to `dist/locales/tr.js` and `dist/cdn/locales/tr.js` as its OWN payload rather than compiled into the components, so an English site downloads none of it.
 *
 * Keyed by the English source string as it appears at the call site, so this file diffs directly against the component that renders it and no key vocabulary has to be kept in sync with the copy.
 *
 * Turkish puts the percent sign BEFORE the number, so `{{percent}}% tight` is written `%{{percent}}`. The brand rule forbids apostrophes, which Turkish otherwise uses before a suffix on a foreign word, so several entries are shaped around it: the attribution is phrased to need no suffix on `RoxyAPI`, `apex` is a bare unsuffixed chip, and the Ascendant is `Yükselen` rather than the loanword, because `Ascendant` would force `Ascendant'tan` in the two equal-sector strings. Turkish astrology writes apex `Apex` and would inflect it `Apex'teki`; if that string ever has to inflect in running text, switch to `odak gezegen`, which is the native form and takes suffixes cleanly.
 *
 * Four terms here are English loanwords on purpose, not gaps: `relocation`, `orb`, `apex` and `natal` are what Turkish astrologers actually write (`natal harita`, `natal gezegenlerle`). `Relokasyon` in particular appears in NO Turkish astrology source and reads as a mistranslation.
 *
 * Rejected against sources, so nobody restores them: `çark` is a mechanical gear and never a chart wheel (the wheel is the `harita çemberi`); `dissosiye açı` does not exist, the out-of-sign aspect being `burç dışı`; **`Aplikasyon`/`Separasyon` could not be verified in ANY live Turkish source** and the sourced pair is `yaklaşan açı`/`ayrılan açı`; `uygulama`/`ayrılma` reads as *application/app* inside a web component; `ev girişi` is attested for a house cusp but `giriş` means login or data entry in every software context, so `ev başlangıcı` wins; `Zodyak dairesi` and `Zodyak çemberi` are both attested for the sign wheel and were passed over only to keep ONE wheel noun in this catalogue; and `Eşit Ev Sistemi` is the correct name of a house SYSTEM, which is exactly why it must not label the equal-sector fallback, since that fallback fires when the response carried no cusps at all.
 *
 * Three concepts have no attested Turkish astrological term: the bi-wheel, its inner and outer rings, and a 0-100 aspect strength score. `çift çember`, `iç halka` / `dış halka` and `güç` are deliberate plain-Turkish coinages built on the settled `harita çemberi`, with `halka` chosen so the ring noun never collides with `çember`, the wheel noun.
 */

import type { ChromeString } from '../i18n/chrome-strings.js';
import { registerLocale } from '../i18n/registry.js';

export const tr: Record<ChromeString, string> = {
	'Edit query': 'Sorguyu düzenle',
	'Spiritual data by RoxyAPI': 'RoxyAPI tarafından sunulan spiritüel veriler',
	'No data': 'Veri yok',
	Loading: 'Yükleniyor',
	Reading: 'Yorum',

	'Natal chart': 'Doğum haritası',
	'Relocation chart': 'Relocation haritası',
	'No chart data': 'Harita verisi yok',
	Wheel: 'Harita çemberi',
	'Aspect grid': 'Açı tablosu',
	'Natal chart views': 'Doğum haritası görünümleri',
	'Natal chart wheel': 'Doğum haritası çemberi',
	'Natal chart wheel with twelve houses, planets, and aspects':
		'On iki ev, gezegen ve açı ile doğum haritası çemberi',
	'Natal chart wheel with planets and aspects, houses shown as equal sectors from the Ascendant':
		'Gezegen ve açı ile doğum haritası çemberi, evler Yükselenden itibaren eşit dilimler olarak gösterilir',
	'Equal sectors from the Ascendant, no house cusps in this response':
		'Yükselenden itibaren eşit dilimler, bu yanıtta ev başlangıcı yok',
	'Twelve zodiac sign segments around a circular wheel. Planet glyphs are placed at their ecliptic longitudes. Aspect lines connect related planets.':
		'Dairesel harita çemberinin çevresinde on iki burç dilimi. Gezegen sembolleri ekliptik boylamlarına yerleştirilir. Açı çizgileri ilgili gezegenleri birleştirir.',
	retrograde: 'retro',

	'{{count}} planets': '{{count}} gezegen',
	'{{count}} aspects': '{{count}} açı',
	'{{system}} houses': '{{system}} evleri',

	'No planets to grid': 'Tabloya alınacak gezegen yok',
	'Planet by planet aspect grid: the aspect each pair of planets forms, read from the planet naming the row across to the planet naming the column.':
		'Gezegenden gezegene açı tablosu: her gezegen çiftinin kurduğu açı, satırdaki gezegenden sütundaki gezegene doğru okunur.',
	orb: 'orb',

	'Dominant element': 'Baskın element',
	'Dominant modality': 'Baskın nitelik',
	Harmonious: 'Uyumlu',
	Challenging: 'Zorlayıcı',
	Neutral: 'Nötr',
	'All {{count}} bodies in the chart, placed by sign':
		'Haritadaki {{count}} gök cismi, burçlara göre dizilmiş',
	'Element and modality distribution': 'Element ve nitelik dağılımı',
	Total: 'Toplam',

	'Chart patterns': 'Açı kalıpları',
	Dissociate: 'Burç dışı',
	'Out of sign: one or more planets sit outside the pattern element or modality, so the theme holds but runs weaker.':
		'Burç dışı: bir veya daha fazla gezegen kalıbın elementi ya da niteliği dışında kalır, tema korunur ama daha zayıf işler.',
	'{{percent}}% tight': '%{{percent}} kesinlik',
	apex: 'apex',

	'Planet readings': 'Gezegen yorumları',

	Transits: 'Transitler',
	'No transit data': 'Transit verisi yok',
	'Aspects to the natal chart: {{count}}':
		'Doğum haritasına yapılan açılar: {{count}}',
	'Natal and transit bi-wheel': 'Natal ve transit çift çemberi',
	'Bi-wheel with natal bodies on the inner ring and transiting bodies on the outer ring':
		'Natal gök cisimleri iç halkada, transit gök cisimleri dış halkada olan çift çember',
	'Twelve zodiac sign segments around a circular wheel. Natal bodies sit at their ecliptic longitudes on the inner ring and transiting bodies on the outer ring, and each line joins a transiting body to the natal body it aspects.':
		'Dairesel harita çemberinin çevresinde on iki burç dilimi. Natal gök cisimleri iç halkada, transit gök cisimleri dış halkada ekliptik boylamlarına yerleştirilir ve her çizgi bir transit gök cismini açı yaptığı natal gök cismine bağlar.',

	'{{count}} natal bodies': '{{count}} natal gök cismi',
	'{{count}} transiting bodies': '{{count}} transit gök cismi',
	'Ascendant on the left horizon': 'Yükselen sol ufukta',
	'First house cusp on the left horizon': '1. ev başlangıcı sol ufukta',
	'Sign wheel, 0° Aries on the left': 'Burç çemberi, 0° Koç solda',
	'House cusps supplied by the page': 'Sayfadan gelen ev başlangıçları',
	'No house cusps': 'Ev başlangıcı yok',

	'Transit aspect summary': 'Transit açıları özeti',
	Strongest: 'En güçlü',
	Natal: 'Natal',
	Transiting: 'Transit',
	Applying: 'Yaklaşan açı',
	Separating: 'Ayrılan açı',
	strength: 'güç',

	'Every body with its natal position and its position on the transit date, each as a zodiac sign and a degree.':
		'Her gök cisminin natal konumu ve transit tarihindeki konumu, her biri burç ve derece olarak.',
	'Both house numbers are read against the natal house cusps.':
		'Her iki ev numarası da natal ev başlangıçlarına göre okunur.',
	Body: 'Gök cismi',
	'Natal house': 'Natal ev',
	'Transiting house': 'Transit ev',

	'Transit readings': 'Transit yorumları',
	Impact: 'Etki',
	Timing: 'Zamanlama',
	Guidance: 'Yönlendirme',
};

registerLocale('tr', tr);
