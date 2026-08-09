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
 *
 * **Three values were corrected on 2026-08-09 and one docblock claim below was overturned.**
 *
 * `Uzaklaşan açı` replaced `Ayrılan açı` for the separating aspect. `Yaklaşan / Uzaklaşan` is the conventional pair, in three independent sources: Öner Döşer, `klasik astrolojide, açının yaklaşan bir açı mı, yoksa uzaklaşan bir açı mı olduğu çok önemlidir`; eylulesintisi citing Hakan Kırkoğlu and Barış İlhan, `Natal ve Transit açı tablosunda yaklaşan açı (A), uzaklaşan açı ise (S) harfi ile gösterilir`; and gokyuzudoktoru, `A yaklaşan S uzaklaşan şeklinde görünür`. `Ayrılan` is attested but is the minority form and left the pair mismatched.
 *
 * `Süre` replaced `Zamanlama` for the timing paragraph. That was a CONTRACT error: the spec defines the field as how long the transit influence lasts, and `zamanlama` is the act of scheduling.
 *
 * `Öneri` replaced `Yönlendirme` for the guidance paragraph. The spec says practical advice; `yönlendirmek` means to steer or route someone (`bizi şöyle bir yol takip etmeye yönlendirir`). The advice register is `öneri` or `tavsiye`, and `Öneri` matches the one-word abstract-noun shape of its siblings `Etki` and `Süre`. `Rehberlik` was passed over: it names a guiding relationship rather than a piece of advice.
 *
 * **`çark` is NOT a mechanical gear only, and the rejection note below was factually wrong.** Turkish astrology writers use it for the chart wheel: Nurcan Arı, `zodyak çarkı, astrolojinin temelini oluşturan ve bireyin doğum anındaki gezegenlerin konumlarını gösteren bir haritadır`; Vogue Türkiye, `bugün kullandığımız zodyak çarkını oluşturdular`. `harita çemberi` is still the right choice for this catalogue, but on consistency rather than on correctness. Know also that `harita çemberi`, `burç çemberi` and `çift çember` are all UNATTESTED compounds of ours; the attested wheel noun is `Zodyak çemberi`, passed over only to keep one wheel noun in this file.
 *
 * `Önc.`, `Sab.` and `Değ.` for the cross-tab columns are ours: no Turkish source abbreviates the qualities. The trailing period is correct Turkish `kısaltma` orthography, none of the three contains an i or an ı so the dotless-i uppercase hazard cannot bite, and `Değ.` keeps its ğ. The full forms are `Öncü`, `Sabit` and `Değişken`, which dharmaastroloji prints as the bare cells of an actual 4x3 element-by-quality table; `Öncülük` is the abstract noun for leadership and would be wrong as a column label.
 *
 * One label noted and not changed: `Nötr` for the neutral aspect class rests on a single weak source. The concept is sound, the label is thin.
 *
 * ---
 *
 * **Human Design, 54 strings added 2026-08-09, sourced from practising Turkish Human Design writers rather than translated.**
 *
 * The vocabulary is deliberately split. `aura`, `bodygraph`, `motor`, `aktivasyon` and the type names are LOANWORDS in Turkish Human Design writing and an invented native replacement for any of them is the defect, not the fix. Everything else is native Turkish, and it is specifically the vocabulary the RoxyAPI Human Design endpoints already return for `?lang=tr`, because these labels print directly above those values: `Tanım` heads `Tekli / Bölünmüş / Üçlü Bölünmüş`, `Otorite` heads `Sakral / Duygusal / Splenik / Ego / Kendine Yansıyan / Zihinsel / Ay`, `{{circuit}} devre` takes `Bireysel / Kolektif / Kabilesel`, and `Tanımlı` / `Açık` are the two words the API centre prose itself uses (`Açık Tepe`, `Tanımlı merkezler`). A label naming a different concept than the value beneath it is exactly what this matching exists to prevent.
 *
 * Sources, all fetched live on 2026-08-09. humandesignrehberi.com, an IHDS-certified practitioner, defines `Strateji`, `İmza` and `Öz olmayan tema` as field names and calls the Solar Plexus `hem bir farkındalık merkezi hem de bir motor merkezi`, which settles both centre chips at once. ucretsizegitimal.com gives `Tanım` with its four types, `İç Otorite`, `Enkarnasyon Haçı`, `Değişken`, the `Kişilik` and `Tasarım` chart sides, `Motor merkezler`, and the heading `AÇIK MERKEZ NEDİR (TANIMSIZ)`. ozgecuhadaroglu.com heads a real analysis with `Merkezler / Tip / Profil / Kanallar / Kapılar / Çizgiler` and writes `64 heksagram`. perikulahci.com gives `Motor Merkezi`, `kabile devresi`, `Bireysel Merkezleme Devresi` and `kapı 51`. whereishuman.com gives `öz olmayan` and `aktivasyon`; arzuzencengiz.com gives `heksagram` and `aktif heksagram`; astrology-api.io/tr gives `Devre Analizi`, `Değişkenler`, `Renk`, `Ton` and `Biliş`.
 *
 * **`{{circuit}} devre` carries no suffix ON PURPOSE, and it is the agglutination trap in this block.** The API substitutes an ADJECTIVE, so `Bireysel devre` is right and `Bireysel devresi` is wrong; the possessive that `kabile devresi` carries in the sources is there only because `kabile` is a noun. The same reasoning puts the number AFTER the noun in `Kapı {{gate}}`, `Çizgi {{line}}` and `I Ching heksagramı {{number}}`: the ordinal `{{gate}}. kapı` is the more usual Turkish, but the gate tooltip substitutes `51.5` and would render `51.5. kapı`, and `kapı 51` is what perikulahci actually prints.
 *
 * Three values are identical to their English source and all three are deliberate: `Aura` (humandesignrehberi, `bu alana aura diyoruz`), `Bodygraph` (the loanword the RoxyAPI Turkish Human Design prose uses itself, suffixed, inside the centre biology and definition text this same card renders; ucretsizegitimal writes `BodyGraph`) and `Motor` (`Motor merkezler` in ucretsizegitimal, `Motor Merkezi` in perikulahci). The head noun is dropped from the last two because the chip already sits on a centre. `Beden grafiği` and `Vücut Grafiği` are both attested for the bodygraph and were passed over to keep ONE word for it across the card and the API prose printed inside that card.
 *
 * `Otorite`, not `İç Otorite`, and the reason is correctness rather than style: the API `authorities` map includes `Zihinsel`, which Human Design classes as an OUTER authority, so an inner-authority label would be false above that one value. `Tanım` for Definition is the Human Design term and not the dictionary sense, and it is the noun `Tanımlı` is built from, so the card stays consistent with its own chips.
 *
 * Rejected against sources, so nobody restores them: `Baz` for the Variables Base layer, which astrology-api.io prints but which reads as the chemistry sense, where humandesignhub.app writes `temeller` for the same 1-5 layer; `farkındalık soruları`, which perikulahci uses for exactly this open-centre prompt but which would collide with the `Farkındalık` chip printed beside it; and `Variable` as a loanword, which the API prose uses but which cannot inflect without the apostrophe this catalogue forbids, where `Değişken` is attested twice.
 *
 * **Thin, and wanting a native practitioner pass: Turkish Human Design writing online barely covers the Variables at all.** `Renk`, `Ton` and `Biliş` rest on astrology-api.io plus the RoxyAPI Turkish descriptions, which name Ton and Renk in running text and speak of bilişsel potansiyel. `Temel` for Base and `Yön` for the arrow direction are the plainest defensible Turkish and are attested in NO practitioner source. `Referans` and `Biyoloji` are ordinary Turkish rather than Human Design terms.
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

	Fire: 'Ateş',
	Earth: 'Toprak',
	Air: 'Hava',
	Water: 'Su',
	Cardinal: 'Öncü',
	Fixed: 'Sabit',
	Mutable: 'Değişken',
	Car: 'Önc.',
	Fix: 'Sab.',
	Mut: 'Değ.',

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
	Separating: 'Uzaklaşan açı',
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
	Timing: 'Süre',
	Guidance: 'Öneri',

	'Nested data omitted': 'İç içe veri gösterilmiyor',
	'Generic data display': 'Veri görünümü',
	'Empty list': 'Liste boş',
	'Data table': 'Veri tablosu',
	'{{count}} rows': '{{count}} satır',
	Yes: 'Evet',
	No: 'Hayır',
	illustration: 'Resim',

	Type: 'Tip',
	Strategy: 'Strateji',
	Authority: 'Otorite',
	Profile: 'Profil',
	Definition: 'Tanım',
	Aura: 'Aura',
	'Incarnation cross': 'Enkarnasyon haçı',
	'Signature: {{value}}': 'İmza: {{value}}',
	'Not-self: {{value}}': 'Öz olmayan tema: {{value}}',
	'Profile {{profile}}': 'Profil {{profile}}',
	'Line {{line}} · Personality': 'Çizgi {{line}} · Kişilik',
	'Line {{line}} · Design': 'Çizgi {{line}} · Tasarım',
	Personality: 'Kişilik',
	Design: 'Tasarım',

	Bodygraph: 'Bodygraph',
	'No bodygraph data': 'Bodygraph verisi yok',
	'Human Design bodygraph': 'İnsan Tasarımı bodygraph',
	'Human Design bodygraph with nine centers, channels, and activated gates overlaid on a human silhouette':
		'Bir insan silueti üzerine yerleştirilmiş dokuz merkez, kanal ve aktif kapı ile İnsan Tasarımı bodygraph',
	'Nine energy centers in their canonical positions over a human silhouette, each filled with its traditional color when defined and outlined when open, wired by channels between activated gates.':
		'Bir insan silueti üzerinde yerleşik konumlarındaki dokuz enerji merkezi, her biri tanımlıyken geleneksel rengiyle dolu, açıkken yalnızca çerçeveli, aktif kapılar arasındaki kanallarla birbirine bağlı.',
	'Center colors when defined. Open centers are outlined.':
		'Tanımlı olduğunda merkez renkleri. Açık merkezler yalnızca çerçeveyle gösterilir.',
	'Open center': 'Açık merkez',
	'Defined channels ({{count}})': 'Tanımlı kanallar ({{count}})',
	'{{circuit}} circuit': '{{circuit}} devre',
	'Centers ({{defined}} defined, {{open}} open)':
		'Merkezler ({{defined}} tanımlı, {{open}} açık)',
	Defined: 'Tanımlı',
	Open: 'Açık',
	Motor: 'Motor',
	Awareness: 'Farkındalık',
	'Not-self question': 'Öz olmayan sorusu',
	Biology: 'Biyoloji',
	'Gates {{gates}}': 'Kapılar {{gates}}',
	'Activations ({{count}})': 'Aktivasyonlar ({{count}})',
	'Chart sides': 'Harita tarafları',
	'Line {{line}}': 'Çizgi {{line}}',
	'Gate {{gate}}': 'Kapı {{gate}}',
	'I Ching hexagram {{number}}': 'I Ching heksagramı {{number}}',

	'No Human Design data': 'İnsan Tasarımı verisi yok',
	'Personality line': 'Kişilik çizgisi',
	'Design line': 'Tasarım çizgisi',
	Lines: 'Çizgiler',

	Variables: 'Değişkenler',
	'No variables data': 'Değişken verisi yok',
	'Human Design variables': 'İnsan Tasarımı değişkenleri',
	'Low confidence: a birth time near a color or tone boundary. Verify the exact birth time.':
		'Düşük güven: doğum saati bir Renk ya da Ton sınırına yakın. Tam doğum saatini doğrulayın.',
	'Low confidence: a birth time near a color or tone boundary (within {{margin}}°). Verify the exact birth time.':
		'Düşük güven: doğum saati bir Renk ya da Ton sınırına yakın ({{margin}}° içinde). Tam doğum saatini doğrulayın.',
	'Color {{color}} · Tone {{tone}} · Base {{base}}':
		'Renk {{color}} · Ton {{tone}} · Temel {{base}}',
	'Knife-edge: could flip with a more precise birth time.':
		'Sınırda: daha kesin bir doğum saatiyle değişebilir.',
	Base: 'Temel',
	Color: 'Renk',
	Tone: 'Ton',
	Direction: 'Yön',
	Cognition: 'Biliş',

	Reference: 'Referans',
	'No reference data': 'Referans verisi yok',
};

registerLocale('tr', tr);
