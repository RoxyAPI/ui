/**
 * Turkish chrome strings.
 *
 * @remarks
 * Importing this module registers the catalogue and re-renders every mounted component, so it is a side-effect entry, exactly like a `components/*` module. It is built to `dist/locales/tr.js` and `dist/cdn/locales/tr.js` as its OWN payload rather than compiled into the components, so an English site downloads none of it.
 *
 * Keyed by the English source string as it appears at the call site, so this file diffs directly against the component that renders it and no key vocabulary has to be kept in sync with the copy.
 *
 * Turkish puts the percent sign BEFORE the number; `formatPercent` places it, so no entry here spells it. The brand rule forbids apostrophes, which Turkish otherwise uses before a suffix on a foreign word, so several entries are shaped around it: the attribution needs no suffix on `RoxyAPI`, `apex` is a bare unsuffixed chip, and the Ascendant is `Yükselen` rather than the loanword, because `Ascendant` would force `Ascendant'tan` in the two equal-sector strings. If that string ever has to inflect in running text, switch to `odak gezegen`, which is the native form and takes suffixes cleanly.
 *
 * `Öneriler` rather than `Çareler` for the dosha remedies: Turkish Vedic writing labels remedial measures as recommendations (`Guclendirme Onerileri`, `cozum onerileri`), and `care` reads medical.
 *
 * Every entry below is attested in live Turkish astrology copy rather than machine translated. What follows is the reasoning a maintainer needs; the attestation itself is recorded internally.
 *
 * Four terms here are English loanwords on purpose, not gaps: `relocation`, `orb`, `apex` and `natal` are what Turkish astrologers actually write (`natal harita`, `natal gezegenlerle`). `Relokasyon` in particular appears in NO Turkish astrology source and reads as a mistranslation.
 *
 * Rejected, so nobody restores them: `dissosiye açı` does not exist, the out-of-sign aspect being `burç dışı`; **`Aplikasyon`/`Separasyon` could not be verified in ANY live Turkish source** and the sourced pair is `yaklaşan açı`/`ayrılan açı`; `uygulama`/`ayrılma` reads as *application/app* inside a web component; `ev girişi` is attested for a house cusp but `giriş` means login or data entry in every software context, so `ev başlangıcı` wins; `Zodyak dairesi` and `Zodyak çemberi` are both attested for the sign wheel and were passed over only to keep ONE wheel noun in this catalogue; and `Eşit Ev Sistemi` is the correct name of a house SYSTEM, which is exactly why it must not label the equal-sector fallback, since that fallback fires when the response carried no cusps at all.
 *
 * Three concepts have no attested Turkish astrological term: the bi-wheel, its inner and outer rings, and a 0-100 aspect strength score. `çift çember`, `iç halka` / `dış halka` and `güç` are deliberate plain-Turkish coinages built on the settled `harita çemberi`, with `halka` chosen so the ring noun never collides with `çember`, the wheel noun.
 *
 * **Three values carry a correction and one earlier claim is overturned.**
 *
 * `Uzaklaşan açı` replaced `Ayrılan açı` for the separating aspect, because `Yaklaşan / Uzaklaşan` is the conventional pair across three independent sources. `Ayrılan` is attested but is the minority form and left the pair mismatched.
 *
 * `Süre` replaced `Zamanlama` for the timing paragraph. That was a CONTRACT error: the spec defines the field as how long the transit influence lasts, and `zamanlama` is the act of scheduling.
 *
 * `Öneri` replaced `Yönlendirme` for the guidance paragraph. The spec says practical advice; `yönlendirmek` means to steer or route someone. The advice register is `öneri` or `tavsiye`, and `Öneri` matches the one-word abstract-noun shape of its siblings `Etki` and `Süre`. `Rehberlik` was passed over: it names a guiding relationship rather than a piece of advice.
 *
 * **`çark` is NOT a mechanical gear only, and the earlier rejection note was factually wrong.** Turkish astrology writing uses it for the chart wheel. `harita çemberi` is still the right choice for this catalogue, but on consistency rather than on correctness. Know also that `harita çemberi`, `burç çemberi` and `çift çember` are all UNATTESTED compounds of ours; the attested wheel noun is `Zodyak çemberi`, passed over only to keep one wheel noun in this file.
 *
 * `Önc.`, `Sab.` and `Değ.` for the cross-tab columns are ours: no Turkish source abbreviates the qualities. The trailing period is correct Turkish `kısaltma` orthography, none of the three contains an i or an ı so the dotless-i uppercase hazard cannot bite, and `Değ.` keeps its ğ. The full forms are `Öncü`, `Sabit` and `Değişken`; `Öncülük` is the abstract noun for leadership and would be wrong as a column label.
 *
 * One label noted and not changed: `Nötr` for the neutral aspect class rests on a single weak source. The concept is sound, the label is thin.
 *
 * ## Human Design
 *
 * **The vocabulary is deliberately split.** `aura`, `bodygraph`, `motor`, `aktivasyon` and the type names are LOANWORDS in Turkish Human Design writing, and an invented native replacement for any of them is the error, not the fix. Everything else is native Turkish, and specifically the vocabulary the Human Design endpoints already return for `?lang=tr`, because these labels print directly above those values: `Tanım` heads `Tekli / Bölünmüş / Üçlü Bölünmüş`, `Otorite` heads the seven authority values, `{{circuit}} devre` takes `Bireysel / Kolektif / Kabilesel`, and `Tanımlı` / `Açık` are the two words the API centre prose itself uses. A label naming a different concept than the value beneath it is exactly what this matching exists to prevent.
 *
 * **`{{circuit}} devre` carries no suffix ON PURPOSE, and it is the agglutination trap in this block.** The API substitutes an ADJECTIVE, so `Bireysel devre` is right and `Bireysel devresi` is wrong; the possessive that `kabile devresi` carries elsewhere is there only because `kabile` is a noun. The same reasoning puts the number AFTER the noun in `Kapı {{gate}}`, `Çizgi {{line}}` and `I Ching heksagramı {{number}}`: the ordinal `{{gate}}. kapı` is the more usual Turkish, but the gate tooltip substitutes `51.5` and would render `51.5. kapı`.
 *
 * Three values are identical to their English source and all three are deliberate: `Aura`, `Bodygraph` (the loanword the Turkish Human Design prose uses itself, suffixed, inside the centre biology and definition text this same card renders) and `Motor`. The head noun is dropped from the last two because the chip already sits on a centre. `Beden grafiği` and `Vücut Grafiği` are both attested for the bodygraph and were passed over to keep ONE word for it across the card and the API prose printed inside it.
 *
 * `Otorite`, not `İç Otorite`, and the reason is correctness rather than style: the API `authorities` map includes `Zihinsel`, which Human Design classes as an OUTER authority, so an inner-authority label would be false above that one value. `Tanım` for Definition is the Human Design term and not the dictionary sense, and it is the noun `Tanımlı` is built from, so the card stays consistent with its own chips.
 *
 * Rejected, so nobody restores them: `Baz` for the Variables Base layer, which reads as the chemistry sense; `farkındalık soruları` for the open-centre prompt, which would collide with the `Farkındalık` chip printed beside it; and `Variable` as a loanword, which cannot inflect without the apostrophe this catalogue forbids, where `Değişken` is attested twice.
 *
 * **Thin, and wanting a native practitioner pass: Turkish Human Design writing barely covers the Variables at all.** `Renk`, `Ton` and `Biliş` rest on a narrow base. `Temel` for Base and `Yön` for the arrow direction are the plainest defensible Turkish and are attested in NO practitioner source. `Referans` and `Biyoloji` are ordinary Turkish rather than Human Design terms.
 *
 * ## Monthly ephemeris
 *
 * **`Efemeris` is the Turkish spelling and the native gloss is a definition rather than a heading.** That is also why the section below it can drop the word daily: the card title already carries it.
 *
 * **`Gezegen konumları` is the attested heading and the loss of `günlük` is deliberate.** `Günlük Gezegen Konumları` is grammatical but was found as no rendered heading anywhere, and the `Tarih` column plus the card title already carry the per-day sense. `Konumlar` alone was rejected: Turkish chart forms use `Konum` for the geographic location field.
 *
 * **`Burç değişimleri`, not `Burç geçişleri`, and the collision is with our own product.** `geçiş` is also the standard Turkish for TRANSIT, so on a page that also carries transit content it would name the wrong thing. `Retro` is what Turkish tables print rather than a full loanword.
 *
 * **`{{sign}} burcuna geçiyor` is the one Turkish frame a template can fill, and the reason is structural.** The dative lands on `burç`, never on the sign name: `burç` plus the possessive and the buffer consonant gives `burcuna`, byte-identical for all twelve, with the sign staying in bare nominative. **The bare-sign dative is rejected**: `Koç a`, `Boğa ya`, `İkizler e` need four different endings plus an apostrophe, which is both uncomputable from a substituted string and against the register rule this catalogue follows. The date is separated by a colon for the same reason, since a Turkish postposition on a formatted date would harmonise with its last vowel.
 *
 * `Tarih` is the standard column header above ephemeris dates. The empty state and the table caption are COMPOSED rather than lifted; no astrology page publishes either.
 *
 * ## Form group names
 *
 * **`1. Kişi` and `2. Kişi` are lifted from a live Turkish synastry form, capital K included**, which settles the word, the number-first order and the heading capital at once. A lower-case `1. kişi` is a sentence-medial artifact, and a legend is a heading.
 *
 * **`Relocation` stays English because this file already decided that, and the register rule is why.** `Relokasyon` appears in no Turkish astrology source, and Turkish writing prints `Relocation` bare and unsuffixed, which is why `Relocation haritası` was already the shipped chart name. `Yeni yer` and `Taşınılan yer` are correct Turkish and would name one concept two ways inside one catalogue.
 *
 * **`Doğum` is the bare noun on purpose: the sentence supplies the suffix.** `Doğum yeri` is already this file's separate entry for the flat birth block, so naming the relocation form birth GROUP `Doğum yeri` would render `Doğum yeri yeri`. The same rule rejects `A kişisi` for the lettered pair, which stacks a possessive against the `yeri` and `şehri` that follow it; `A Kişi` keeps the letter-then-bare-noun order Turkish uses for `A Blok` and stays parallel with the numbered pair.
 *
 * **`Doğum haritası yeri` is a chained tamlama, not a stacked-suffix defect**, the same structure as `iş yeri müdürü`. It reads a shade formal, which is a register note rather than a grammar break, so the natal chart group reuses the shipped card heading.
 *
 * `Alan ağırlıkları` is the weakest entry here, composed rather than lifted. Both halves are attested on their own, but nobody publishes the compound. It is also the one name that never renders inside a sentence, so it gets the least stress.
 */

import type { ChromeString } from '../i18n/chrome-strings.js';
import { registerLocale } from '../i18n/registry.js';
import './field-labels/tr.js';

export const tr: Record<ChromeString, string> = {
	'Edit query': 'Sorguyu düzenle',
	'Spiritual data by RoxyAPI': 'RoxyAPI tarafından sunulan spiritüel veriler',
	'No data': 'Veri yok',
	Loading: 'Yükleniyor',
	Reading: 'Yorum',

	'Natal chart': 'Doğum haritası',
	'Relocation chart': 'Relocation haritası',
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
	'{{percent}} tight': '{{percent}} kesinlik',
	apex: 'apex',

	'Planet readings': 'Gezegen yorumları',

	Transits: 'Transitler',
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
	'House cusps from the response': 'Yanıttan gelen ev başlangıçları',
	'No house cusps': 'Ev başlangıcı yok',

	'Transit aspect summary': 'Transit açıları özeti',
	Strongest: 'En güçlü',
	Natal: 'Natal',
	Transiting: 'Transit',
	Applying: 'Yaklaşan açı',
	Separating: 'Uzaklaşan açı',

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

	Ephemeris: 'Efemeris',
	'Signs in this month': 'Bu ayki burçlar',
	'Sign changes and retrograde periods': 'Burç değişimleri ve retro dönemleri',
	'Daily positions': 'Gezegen konumları',
	Date: 'Tarih',
	'Enters {{sign}} on {{date}}': '{{date}}: {{sign}} burcuna geçiyor',
	'Retrograde {{range}}': 'Retro: {{range}}',
	'Every body with its position on each day of the month, as a zodiac sign and a degree.':
		'Her gök cisminin ayın her günündeki konumu, burç ve derece olarak.',

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

	'Personality line': 'Kişilik çizgisi',
	'Design line': 'Tasarım çizgisi',
	Lines: 'Çizgiler',

	Variables: 'Değişkenler',
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

	// The FORM path (`<roxy-endpoint-form>` and the `<roxy-location-search>` it slots). What a
	// visitor reads BEFORE any card renders. Field labels and enum options are `humanize()` over
	// spec field names and are deliberately absent: no catalogue keyed on English source text can
	// reach a string computed per operation. The GROUP names below are the exception, because the
	// spec has nine of them rather than 909.
	'Birth location': 'Doğum yeri',
	'{{group}} location': '{{group}} yeri',
	'City of birth': 'Doğum şehri',
	'{{group}} city': '{{group}} şehri',
	'Person 1': '1. Kişi',
	'Person 2': '2. Kişi',
	'Person A': 'A Kişi',
	'Person B': 'B Kişi',
	'Birth Data': 'Doğum bilgileri',
	Birth: 'Doğum',
	Relocation: 'Relocation',
	Plot: 'Arsa',
	Door: 'Kapı',
	'Domain Weights': 'Alan ağırlıkları',
	'Fills {{fields}}. Pick a city to autofill.':
		'{{fields}} alanlarını doldurur. Otomatik doldurmak için bir şehir seçin.',
	Choose: 'Seçin',
	'Comma separated': 'Virgülle ayrılmış',
	Advanced: 'Gelişmiş',
	'Please complete:': 'Lütfen tamamlayın:',
	'Search city': 'Şehir ara',
	'No cities found': 'Şehir bulunamadı',
	Compare: 'Karşılaştır',
	Cast: 'Çek',
	'Get reading': 'Yorum al',
	Generate: 'Oluştur',
	'Schema load failed: {{message}}': 'Şema yüklenemedi: {{message}}',
	'Endpoint {{method}} {{path}} not found in OpenAPI spec':
		'{{method}} {{path}} uç noktası OpenAPI belirtiminde bulunamadı',
	'HTTP error {{status}}': 'HTTP {{status}} hatası',
	Retry: 'Yeniden dene',
	'Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side.':
		'İstemci tarafı bileşenler yalnızca pk_ ön ekli yayınlanabilir anahtar kabul eder. Köken izin listesi olan bir yayınlanabilir anahtar kullanın ya da sunucu tarafında oluşturun.',
	Severity: 'Şiddet',
	Remedies: 'Öneriler',
	Exceptions: 'İstisnalar',
	'Dream symbol': 'Rüya sembolü',
	'Dream symbols': 'Rüya sembolleri',
	'{{count}} matches': '{{count}} sonuç',
	Hora: 'Hora',
	'Hora periods': 'Gezegen saatleri',
	'Vedic kundli': 'Vedik doğum haritası',
	'Chandra lagna': 'Chandra lagna',
	'No ascendant in this chart, so the houses are not numbered.':
		'Bu haritada yükselen yok, bu nedenle evler numaralandırılmamıştır.',
	combust: 'yanık',
	'planetary war': 'gezegen savaşı',
	'planetary war with {{graha}}': '{{graha}} ile gezegen savaşı',
	'planetary war with {{graha}}, won by {{winner}}':
		'{{graha}} ile gezegen savaşı, kazanan {{winner}}',
	'nakshatra lord {{graha}}': 'nakshatra yöneticisi {{graha}}',
	'Vedic birth chart with twelve sign houses':
		'On iki burç evli Vedik doğum haritası',
	'Angel number': 'Melek sayısı',
	'Digit root': 'Kök sayı',
	'Action steps': 'Adımlar',
	Colors: 'Renkler',
	Keywords: 'Anahtar kelimeler',
	'Pairs with': 'Birlikte kullanılır',
	Vargottama: 'Vargottama',
	'Vargottama planets': 'Vargottama gezegenleri',
	'{{chart}} divisional chart with twelve sign houses':
		'On iki burç evli {{chart}} bölüm haritası',
	'Sidereal frame: {{frame}}': 'Sideral çerçeve: {{frame}}',
	'Sidereal frame: {{frame}}, {{degrees}}° subtracted':
		'Sideral çerçeve: {{frame}}, {{degrees}}° çıkarıldı',
	Day: 'Gündüz',
	Night: 'Gece',
	Planet: 'Gezegen',
	Hardness: 'Sertlik',
	Vibration: 'Titreşim',
	Birthstone: 'Doğum taşı',
	Chakras: 'Çakralar',
	Zodiac: 'Burç',
	Elements: 'Elementler',
	Spiritual: 'Ruhsal',
	Emotional: 'Duygusal',
	Physical: 'Fiziksel',
	Master: 'Üstat',
	'Master number': 'Üstat sayı',
	'Birth day profile': 'Doğum günü profili',
	'Lucky associations': 'Şans uyumları',
	Missing: 'Eksik',
	'No numbers are missing from the birth name.': 'Doğum adında eksik sayı yok.',
	'How to overcome': 'Nasıl aşılır',
	'Karmic lessons': 'Karmik dersler',
	Debt: 'Borç',
	Challenge: 'Zorluk',
	Resolution: 'Çözüm',
	'Karmic debt': 'Karmik borç',
	'Personal year': 'Kişisel yıl',
	Pinnacles: 'Zirveler',
	Lesson: 'Ders',
	Challenges: 'Zorluklar',
	'Name numbers': 'Ad sayıları',
	'Name letters': 'Ad harfleri',
	'Personal month': 'Kişisel ay',
	'Calendar month': 'Takvim ayı',
	Maturity: 'Olgunluk',
	'Current age': 'Güncel yaş',
	Activates: 'Etkinleştirir',
	Element: 'Element',
	'Ruling planet': 'Yönetici gezegen',
	Gemstones: 'Değerli taşlar',
	Compatible: 'Uyumlu',
	Incompatible: 'Uyumsuz',
	'Life Path': 'Yaşam yolu',
	Expression: 'İfade sayısı',
	'Soul Urge': 'Ruh arzusu',
	'Birth Day': 'Doğum günü sayısı',
	'Daily Number': 'Günlük sayı',
	'Personal Day': 'Kişisel gün',
	'Numerology chart': 'Numeroloji haritası',
	Panchang: 'Panchang',
	'Auspicious muhurtas': 'Uğurlu muhurtalar',
	'Inauspicious periods': 'Uğursuz dönemler',
	'Next transitions': 'Sonraki geçişler',
	'None today': 'Bugün yok',
	'Bhadra (Vishti)': 'Bhadra (Vishti)',
	Panchaka: 'Panchaka',
	'Favorable Moon signs': 'Uygun Ay burçları',
	'Favorable birth nakshatras': 'Uygun doğum nakshatraları',
	'Unfavorable birth nakshatras': 'Uygun olmayan doğum nakshatraları',
	'Chandrabalam and Tarabalam': 'Chandrabalam ve Tarabalam',
	None: 'Yok',
	'Moon sign': 'Ay burcu',
	'Sun sign': 'Güneş burcu',
	'Sun nakshatra': 'Güneş nakshatrası',
	'Amrit Kalam': 'Amrit Kalam',
	'Dur Muhurta': 'Dur Muhurta',
	Varjyam: 'Varjyam',
	Sunrise: 'Gün doğumu',
	Sunset: 'Gün batımı',
	Moonrise: 'Ay doğumu',
	Moonset: 'Ay batımı',
	Sun: 'Güneş',
	Moon: 'Ay',
	'Ashtama Chandra rashi': 'Ashtama Chandra rashi',
	'{{sign}} until {{time}}': '{{time}} kadar {{sign}}',
	'{{sign}} until {{time}}, then {{next}}':
		'{{time}} kadar {{sign}}, sonra {{next}}',
	'{{range}} (ends {{date}})': '{{range}} ({{date}} tarihinde biter)',
	Tithi: 'Tithi',
	Nakshatra: 'Nakshatra',
	Yoga: 'Yoga',
	Karana: 'Karana',
	'ends {{time}}': '{{time}} biter',
	'ends {{time}} to {{next}}': '{{time}} biter, sonra {{next}}',
	'ends {{time}} to {{next}} pada {{pada}}':
		'{{time}} biter, sonra {{next}} pada {{pada}}',
	Strengths: 'Güçlü yönler',
	'Key aspects': 'Önemli açılar',
	'Aspect breakdown': 'Açı dengesi',
	'Element balance': 'Element dengesi',
	'Forecast digest': 'Tahmin özeti',
	'No notable events.': 'Kayda değer olay yok.',
	'{{count}} events': '{{count}} olay',
	'significance {{value}} of 100': 'önem {{value}} / 100',
	'I Ching hexagram': 'I Ching heksagramı',
	Position: 'Konum',
	House: 'Ev',
	Motion: 'Günlük hareket',
	Formula: 'Formül',
	'°/day': '°/gün',
	'Tarot spread': 'Tarot açılımı',
	'(reversed)': '(ters)',
	'{{arcana}} arcana': '{{arcana}} arkana',
	Upper: 'Üst',
	Lower: 'Alt',
	'Changing lines: {{lines}}.': 'Değişen çizgiler: {{lines}}.',
	'Becomes hexagram {{number}} {{name}}.':
		'{{number}} {{name}} heksagramına dönüşür.',
	'{{chakra}} chakra crystals': '{{chakra}} çakra kristalleri',
	'{{element}} element crystals': '{{element}} element kristalleri',
	'Crystals for {{sign}}': '{{sign}} için kristaller',
	'{{month}} birthstones': '{{month}} doğum taşları',
	Crystals: 'Kristaller',
	'Forecast timeline': 'Tahmin zaman çizelgesi',
	'No events in this window': 'Bu dönemde olay yok',
	'orb {{value}}°': 'orb {{value}}°',
	'Guna Milan score': 'Guna Milan puanı',
	Koota: 'Koota',
	Progress: 'İlerleme',
	Score: 'Puan',
	'{{dosha}} cancelled': '{{dosha}} iptal',
	'Moon phase calendar': 'Ay evreleri takvimi',
	'Current moon phase': 'Güncel ay evresi',
	Illumination: 'Aydınlanma',
	Age: 'Yaş',
	Sign: 'Burç',
	Distance: 'Uzaklık',
	'{{count}} days': '{{count}} gün',
	'{{value}}k km': '{{value}} bin km',
	'Annual profection': 'Yıllık profeksiyon',
	For: 'İçin',
	'Lord of the year': 'Yılın efendisi',
	'What changes at this location': 'Bu konumda ne değişir',
	'Angular planets here': 'Buradaki köşe gezegenleri',
	'Planets that change house': 'Ev değiştiren gezegenler',
	'No planet changes house at this location.':
		'Bu konumda hiçbir gezegen ev değiştirmiyor.',
	'Guna Milan breakdown: each koota with the classification of person 1 and person 2, and the score it earned out of its maximum.':
		'Guna Milan dökümü: her koota, kişi 1 ve kişi 2 sınıflandırması ve olası puandan alınan puan ile.',
	'{{sign}} · house {{house}}': '{{sign}} · ev {{house}}',
	'{{planet}}: house {{from}} to {{to}}': '{{planet}}: ev {{from}} ile {{to}}',
	ASC: 'ASC',
	DSC: 'DSC',
	MC: 'MC',
	IC: 'IC',
	PoF: 'ŞN',
	Vtx: 'Vtx',
	'Kundli style': 'Kundli stili',
	North: 'Kuzey',
	South: 'Güney',
	East: 'Doğu',
	'in {{sign}}': '{{sign}} burcunda',
	'pada {{n}}': 'pada {{n}}',
	Vara: 'Vara',
	'Tarot card': 'Tarot kartı',
	Upright: 'Düz',
	Reversed: 'Ters',
	'Card orientation': 'Kart yönü',
	Cornerstone: 'Köşe taşı',
	Capstone: 'Kilit taşı',
	'First vowel': 'İlk sesli harf',
	'Core numbers': 'Temel sayılar',
	Lessons: 'Dersler',
	Debts: 'Borçlar',
	'Life phases': 'Yaşam evreleri',
	'Obstacle periods': 'Engel dönemleri',
	'Letter analysis': 'Harf analizi',
	Opportunities: 'Fırsatlar',
	Asteroids: 'Asteroitler',
	Houses: 'Evler',
	'Black Moon Lilith': 'Kara Ay Lilith',
	'{{variant}} apogee': '{{variant}} apoje',
	'Solar arc directions': 'Güneş yayı yönelimleri',
	Arc: 'Yay',
	'Directed to': 'Yönlendirme tarihi',
	'Arabic lots': 'Arap noktaları',
	Sect: 'Sekt',
	Ascendant: 'Yükselen',
	Midheaven: 'Gökyüzü ortası',
	'Part of Fortune': 'Şans Noktası',
	Vertex: 'Vertex',
	'Secondary progressions': 'İkincil ilerletmeler',
	'Progressed to': 'İlerletme tarihi',
	Elapsed: 'Geçen süre',
	'{{years}} yrs': '{{years}} yıl',
	Biblical: 'İncil anlamı',
	Shadow: 'Gölge',
	Readings: 'Yorumlar',
	Advisories: 'Uyarılar',
	'Sign compatibility': 'Burç uyumu',
	Breakdown: 'Ayrıntı',
	'Changing lines': 'Değişen çizgiler',
	Dynamics: 'Dinamikler',
	Love: 'Aşk',
	Career: 'Kariyer',
	Money: 'Para',
	'Twin flame': 'İkiz alev',
	'Western planetary positions': 'Batı gezegen konumları',
	'Planetary positions': 'Gezegen konumları',
	'Western planetary positions: each body with its sign, degree, house, essential dignity and motion. The dignity cell is blank for the lunar nodes, Chiron and Lilith, which rule no sign and therefore hold no dignity at all.':
		'Batı gezegen konumları: her gök cismi burcu, derecesi, evi, esas onuru ve hareketi ile. Ay düğümleri, Chiron ve Lilith bir burcu yönetmediği için onur hücresi boş kalır.',
	Dignity: 'Onur',
	Degree: 'Derece',
	'Vedic aspects': 'Vedik açılar',
	'Chart time {{when}}': 'Harita zamanı {{when}}',
	'Sidereal positions': 'Sidereal konumlar',
	'Mutual aspects': 'Karşılıklı açılar',
	'Vedic planetary aspects: aspecting planet, aspect type, aspected planet, strength and orb.':
		'Vedik gezegen açıları: açı yapan gezegen, açı türü, açı alan gezegen, güç ve orb.',
	From: 'Kimden',
	Aspect: 'Açı',
	To: 'Kime',
	Strength: 'Güç',
	Orb: 'Orb',
	'Upagraha positions': 'Upagraha konumları',
	Upagrahas: 'Upagrahalar',
	Upagraha: 'Upagraha',
	'{{group}} upagrahas: each sub-planet with its rashi, degree in sign, sidereal longitude, and nakshatra with pada.':
		'Upagrahalar {{group}}: her alt gezegen rashi, burçtaki derecesi, sidereal boylamı ve pada ile nakshatrasıyla.',
	'Time based': 'Zamana dayalı',
	'From the eightfold division of the day or night, so these depend on the birth time, the place and the weekday.':
		'Gündüzün veya gecenin sekize bölünmesinden gelir, bu yüzden doğum saatine, yere ve haftanın gününe bağlıdır.',
	'Sun based': 'Güneşe dayalı',
	'The Dhuma group, derived by fixed arc from the Sun. Dhuma is the Sun plus 133 degrees 20 minutes, and each of the rest follows from the one before it.':
		'Güneşten sabit yayla türetilen Dhuma grubu. Dhuma, Güneş artı 133 derece 20 dakikadır ve geri kalanların her biri bir öncekinden gelir.',
	Rashi: 'Rashi',
	Longitude: 'Boylam',
	Pada: 'Pada',
	'Nakshatra {{name}}': 'Nakshatra {{name}}',
	'Nakshatra {{number}} of 27': '27 nakshatradan {{number}}',
	Lord: 'Yönetici',
	Deity: 'Tanrısal güç',
	Symbol: 'Sembol',
	Characteristics: 'Özellikler',
	'Mantras:': 'Mantralar:',
	'Gemstones:': 'Taşlar:',
	'Rituals:': 'Ritüeller:',
	N: 'K',
	NE: 'KD',
	E: 'D',
	SE: 'GD',
	S: 'G',
	SW: 'GB',
	W: 'B',
	NW: 'KB',
	'Local space': 'Yerel uzay',
	'Local space compass': 'Yerel uzay pusulası',
	'Local space compass of planetary directions from the birthplace':
		'Doğum yerinden gezegen yönlerini gösteren yerel uzay pusulası',
	'A compass centered on the birthplace. Each body is a line pointing to its azimuth, clockwise from north. Bodies below the horizon are dimmed.':
		'Doğum yerine ortalanmış bir pusula. Her gök cismi, kuzeyden saat yönünde kendi azimutunu gösteren bir çizgidir. Ufkun altındaki cisimler soluklaştırılır.',
	'Local space directions: each body with its compass direction, azimuth, altitude and whether it sits above or below the horizon.':
		'Yerel uzay yönleri: her gök cismi pusula yönü, azimutu, yüksekliği ve ufkun üstünde mi altında mı olduğuyla.',
	'{{planet}} {{direction}} {{azimuth}}° altitude {{altitude}}':
		'{{planet}} {{direction}} {{azimuth}}° yükseklik {{altitude}}',
	Azimuth: 'Azimut',
	Altitude: 'Yükseklik',
	Horizon: 'Ufuk',
	Astrocartography: 'Astrokartografi',
	'Astrocartography world map': 'Astrokartografi dünya haritası',
	'World map of planetary astrocartography lines':
		'Gezegen astrokartografi hatlarının dünya haritası',
	'Equirectangular world map. Each body has a Midheaven and Imum Coeli meridian and a curved Ascendant and Descendant line, colored per body.':
		'Eşdikdörtgen dünya haritası. Her gök cisminin bir Gökyüzü ortası ve Ayakucu meridyeni ile eğri bir Yükselen ve Alçalan hattı vardır, cisme göre renklendirilir.',
	'{{planet}} {{angle}} line': '{{planet}} {{angle}} hattı',
	'Solid lines are the Ascendant and Midheaven, dashed are the Descendant and IC.':
		'Düz çizgiler Yükselen ve Gökyüzü ortası, kesikli olanlar Alçalan ve Ayakucudur.',
	'Planetary lines': 'Gezegen hatları',
	Choghadiya: 'Choghadiya',
	'Day muhurta periods': 'Gündüz muhurta dönemleri',
	'Daytime choghadiya': 'Gündüz choghadiyası',
	'No daytime periods': 'Gündüz dönemi yok',
	'Night muhurta periods': 'Gece muhurta dönemleri',
	'Nighttime choghadiya': 'Gece choghadiyası',
	'No nighttime periods': 'Gece dönemi yok',
	Now: 'Şimdi',
	'Time range': 'Zaman aralığı',
	'Impact:': 'Etki:',
	'Timing:': 'Süre:',
	'Guidance:': 'Öneri:',
	'Chara karakas': 'Chara karakalar',
	Atmakaraka: 'Atmakaraka',
	Darakaraka: 'Darakaraka',
	'Chara karakas in descending rank: each office, the graha holding it, its rashi, the degree it holds, the degree that earned the office, and what the office is read for.':
		'Azalan sıraya göre chara karakalar: her görev, onu tutan graha, rashisi, tuttuğu derece, görevi kazandıran derece ve görevin ne için okunduğu.',
	Office: 'Görev',
	Graha: 'Graha',
	'Ranked on': 'Sıralama ölçütü',
	'Read for': 'Okunduğu konu',
	'measured from the end of the sign': 'burcun sonundan ölçülür',
	'Heliacal visibility': 'Helyakal görünürlük',
	'Heliacal rising and setting': 'Helyakal doğuş ve batış',
	'Whether each graha stands far enough from the Sun to be seen, for {{date}}. The Sun and the nodes never appear here: they have no heliacal event.':
		'Her grahanın görülebilecek kadar Güneşten uzak olup olmadığı, {{date}} için. Güneş ve düğümler burada hiç yer almaz: helyakal olayları yoktur.',
	Visible: 'Görünür',
	Invisible: 'Görünmez',
	rises: 'doğana',
	sets: 'batana',
	Rose: 'Doğdu',
	Set: 'Battı',
	'in the east': 'doğuda',
	'in the west': 'batıda',
	'Visible until it {{event}} {{where}} on {{when}}':
		'{{when}} tarihinde {{where}} {{event}} kadar görünür',
	'Invisible until it {{event}} {{where}} on {{when}}':
		'{{when}} tarihinde {{where}} {{event}} kadar görünmez',
	'{{event}} {{where}} on {{when}}, with no further event inside the search window':
		'{{when}} tarihinde {{where}} {{event}}, arama penceresinde başka olay yok',
	'No rising or setting inside the search window, which is normal for a graha far from the Sun':
		'Arama penceresinde doğuş veya batış yok, bu Güneşten uzak bir graha için normaldir',
	'{{degrees}}° of time from the Sun against a limit of {{limit}}°':
		'Güneşten {{degrees}}° zaman, {{limit}}° sınırına karşı',
	'{{degrees}}° of time from the Sun against a limit of {{limit}}°, becoming {{shifted}}° at that event':
		'Güneşten {{degrees}}° zaman, {{limit}}° sınırına karşı, bu olayda {{shifted}}° olur',
	'a morning graha, read before sunrise':
		'sabah grahası, gün doğumundan önce okunur',
	'an evening graha, read after sunset':
		'akşam grahası, gün batımından sonra okunur',
	Aspects: 'Açılar',
	'Aspect list': 'Açı listesi',
	'Aspect summary': 'Açı özeti',
	Patterns: 'Desenler',
	'{{status}} · orb {{orb}}° · str {{strength}}':
		'{{status}} · orb {{orb}}° · güç {{strength}}',
	'Number analysis': 'Sayı analizi',
	'{{count}} digits': '{{count}} basamak',
	'{{count}} unique': '{{count}} benzersiz',
	'Digit root {{n}}': 'Basamak kökü {{n}}',
	Palindrome: 'Palindrom',
	Repeating: 'Tekrarlayan',
	'Positive energy': 'Olumlu enerji',
	'Neutral energy': 'Nötr enerji',
	'Cautionary energy': 'Uyarıcı enerji',
	'Where you saw it': 'Nerede gördünüz',
	'Known angel number': 'Bilinen melek sayısı',
	'What to do next': 'Sırada ne var',
	'Foundational digit root': 'Temel basamak kökü',
	'Foundational digit root ({{n}})': 'Temel basamak kökü ({{n}})',
	Above: 'Ufkun üstünde',
	Below: 'Ufkun altında',
	Active: 'Etkin',
	'Not yet active': 'Henüz etkin değil',
	Present: 'Var',
	Absent: 'Yok',
	'Current phase': 'Mevcut evre',
	'Not compatible': 'Uyumlu değil',
	'Ascendant moves to {{sign}}': 'Yükselen {{sign}} burcuna geçer',
	'Ascendant stays in {{sign}}': 'Yükselen {{sign}} burcunda kalır',
	'Ascendant changes sign': 'Yükselen burç değiştirir',
	'Ascendant keeps its sign': 'Yükselen burcunu korur',
	'Bhav Chalit': 'Bhav Chalit',
	'No graha changes house. The Rashi chart and the Chalit chart agree, which is a normal result rather than a missing reading.':
		'Hiçbir graha ev değiştirmiyor. Rashi haritası ile Chalit haritası uyuşuyor, bu eksik bir yorum değil normal bir sonuçtur.',
	'{{count}} of {{total}} grahas change house between the Rashi chart and the unequal Sripati cusps.':
		'{{total}} grahadan {{count}} tanesi Rashi haritası ile eşit olmayan Sripati başlangıçları arasında ev değiştiriyor.',
	'house {{from}} in the Rashi chart, house {{to}} here':
		'Rashi haritasında {{from}}. ev, burada {{to}}. ev',
	'Bhava cusps and occupants': 'Bhava başlangıçları ve içindekiler',
	Bhava: 'Bhava',
	Start: 'Başlangıç',
	Madhya: 'Madhya',
	End: 'Bitiş',
	Span: 'Genişlik',
	Grahas: 'Grahalar',
	'Fixed stars': 'Sabit yıldızlar',
	'Conjunctions to the chart': 'Haritaya kavuşumlar',
	'{{point}} conjunct {{star}}': '{{point}} ile {{star}} kavuşumu',
	'No star sits within the orb of a natal point.':
		'Hiçbir yıldız natal bir noktanın orbu içinde değil.',
	'Star catalog ({{count}})': 'Yıldız kataloğu ({{count}})',
	'Precessed positions for the chart date':
		'Harita tarihine göre presesyonlu konumlar',
	Star: 'Yıldız',
	Mag: 'Kad',
	Nature: 'Doğa',
	Bhavadhipati: 'Bhavadhipati',
	Dig: 'Dig',
	Drishti: 'Drishti',
	Sthana: 'Sthana',
	Kala: 'Kala',
	Chesta: 'Chesta',
	Naisargika: 'Naisargika',
	Drik: 'Drik',
	'Bhava Bala': 'Bhava Bala',
	'Twelve houses ranked by strength': 'On iki ev güce göre sıralı',
	'Twelve houses ranked by strength on the {{system}} frame':
		'{{system}} ev sisteminde on iki ev güce göre sıralı',
	'Component legend': 'Bileşen açıklaması',
	'{{component}} Bala': '{{component}} Bala',
	'lord {{graha}}': 'yönetici {{graha}}',
	'{{value}} rupas': '{{value}} rupa',
	'Bhava Bala {{value}} virupas': 'Bhava Bala {{value}} virupa',
	'{{component}} {{value}} virupas': '{{component}} {{value}} virupa',
	Shadbala: 'Shadbala',
	'Shadbala planetary strength': 'Shadbala gezegen gücü',
	'{{count}} planets ranked by strength': '{{count}} gezegen güce göre sıralı',
	'Planet strength bars': 'Gezegen gücü çubukları',
	'Strength component legend': 'Güç bileşeni açıklaması',
	'Ishta Phala is the capacity to give benefic results, Kashta Phala the capacity to give malefic ones. Both are in virupas and are read together, since a planet can be strong and still deliver hardship.':
		'Ishta Phala olumlu sonuç verme kapasitesi, Kashta Phala olumsuz sonuç verme kapasitesidir. İkisi de virupa cinsindendir ve birlikte okunur, çünkü bir gezegen güçlü olup yine de zorluk getirebilir.',
	'{{planet}} Shadbala': '{{planet}} Shadbala',
	'rank {{n}}': 'sıra {{n}}',
	'Strength components for {{planet}}': '{{planet}} için güç bileşenleri',
	'Ishta Phala {{ishta}}, Kashta Phala {{kashta}} virupas':
		'Ishta Phala {{ishta}}, Kashta Phala {{kashta}} virupa',
	'Ishta {{value}}': 'Ishta {{value}}',
	'Kashta {{value}}': 'Kashta {{value}}',
	'House {{n}}': '{{n}}. ev',
	Positions: 'Konumlar',
	'Aspects ({{count}})': 'Açılar ({{count}})',
	'Transit views': 'Transit görünümleri',
	'Transit aspects': 'Transit açıları',
	Speed: 'Hız',
	Gochara: 'Gochara',
	'Gochara transits': 'Gochara transitleri',
	'Where each graha transits at {{when}}, read against the natal chart of {{birth}}.':
		'Her grahanın {{when}} tarihindeki transiti, {{birth}} doğum haritasına karşı okunur.',
	'Key transits': 'Önemli transitler',
	'Gochara houses are counted from the natal Moon in {{sign}}.':
		'Gochara evleri {{sign}} burcundaki natal Aydan sayılır.',
	'house {{n}} from the Moon': 'Aydan {{n}}. ev',
	'house {{n}} from the Lagna': 'Lagnadan {{n}}. ev',
	'{{aspect}} natal {{planet}}': 'natal {{planet}} ile {{aspect}}',
	'{{aspect}} natal {{planet}} ({{orb}}°)':
		'natal {{planet}} ile {{aspect}} ({{orb}}°)',
	'Kaksha {{n}} of {{total}}': '{{total}} kakshadan {{n}}',
	'Kaksha {{n}} of {{total}} within the current sign':
		'Mevcut burçta {{total}} kakshadan {{n}}',
	'Kaksha {{n}} of {{total}}, ruled by {{graha}}':
		'{{total}} kakshadan {{n}}, yöneticisi {{graha}}',
	'Kaksha {{n}} of {{total}}, spanning {{start}}° to {{end}}° of the sign':
		'{{total}} kakshadan {{n}}, burcun {{start}}° ile {{end}}° arası',
	'Kaksha {{n}} of {{total}}, ruled by {{graha}}, spanning {{start}}° to {{end}}° of the sign':
		'{{total}} kakshadan {{n}}, yöneticisi {{graha}}, burcun {{start}}° ile {{end}}° arası',
	'this kaksha lord gave bindu': 'bu kaksha yöneticisi bindu verdi',
	'this kaksha lord gave no bindu': 'bu kaksha yöneticisi bindu vermedi',
	'this kaksha lord gave bindu, {{count}} of {{total}} in this sign':
		'bu kaksha yöneticisi bindu verdi, bu burçta {{total}} içinde {{count}}',
	'this kaksha lord gave no bindu, {{count}} of {{total}} in this sign':
		'bu kaksha yöneticisi bindu vermedi, bu burçta {{total}} içinde {{count}}',
	'Transiting planets: each planet with its current sign, degree and daily speed.':
		'Transit gezegenler: her gezegen mevcut burcu, derecesi ve günlük hareketiyle.',
	'Vedic daily': 'Vedik gün',
	'Vedic daily reading': 'Vedik günlük yorum',
	'{{supportive}} of {{evaluated}} grahas support this day':
		'{{evaluated}} grahadan {{supportive}} tanesi bu günü destekliyor',
	'Born with the Moon in {{rashi}}, nakshatra {{nakshatra}}':
		'Ay {{rashi}} burcunda doğdu, nakshatra {{nakshatra}}',
	'{{component}} unavailable: {{reason}}':
		'{{component}} kullanılamıyor: {{reason}}',
	Paksha: 'Paksha',
	'until {{time}}': '{{time}} saatine kadar',
	'Grahas today': 'Bugünün grahaları',
	'Each transiting graha with its sign, the house it occupies from the natal Moon, its bindus, its kaksha and the state the classical rules give it.':
		'Her transit graha burcu, natal Aydan itibaren bulunduğu ev, binduları, kakshası ve klasik kuralların verdiği durum ile birlikte.',
	Kaksha: 'Kaksha',
	State: 'Durum',
	Favourable: 'Elverişli',
	Underdelivered: 'Eksik kalan',
	Obstructed: 'Engellenmiş',
	Void: 'Etkisiz',
	Aggravated: 'Ağırlaşmış',
	Unfavourable: 'Elverişsiz',
	'Very strong': 'Çok güçlü',
	Strong: 'Güçlü',
	Moderate: 'Orta',
	Weak: 'Zayıf',
	'Tara and Chandrabala': 'Tara ve Chandrabala',
	'Moon in {{sign}}, house {{n}}': 'Ay {{sign}} burcunda, {{n}}. ev',
	'Ashtama Chandra': 'Ashtama Chandra',
	Drivers: 'Destekleyenler',
	Cautions: 'Uyarılar',
	'{{positive}} positive against {{negative}} negative':
		'{{negative}} olumsuza karşı {{positive}} olumlu',
	'level {{level}} {{grade}}': 'seviye {{level}} {{grade}}',
	Dasha: 'Dasha',
	', governs {{sections}}': ', {{sections}} bölümlerini belirler',
	'Energy {{value}}/10': 'Enerji {{value}}/10',
	'Energy {{value}} of 10': '10 üzerinden {{value}} enerji',
	Health: 'Sağlık',
	Finance: 'Finans',
	Advice: 'Öneri',
	'Lucky number': 'Şans sayısı',
	'Lucky numbers': 'Şans sayıları',
	'Lucky color': 'Şans rengi',
	'Lucky days': 'Şanslı günler',
	'Best with': 'En uyumlu',
	Phase: 'Evre',
	'Active transits': 'Etkin transitler',
	'Week by week': 'Hafta hafta',
	'Week {{n}}': '{{n}}. hafta',
	'Key dates': 'Önemli tarihler',
	Daily: 'Günlük',
	Weekly: 'Haftalık',
	Monthly: 'Aylık',
	Yearly: 'Yıllık',
	'Sign ingress': 'Burç değişimi',
	'Retrograde station': 'Durağanlaşma',
	'Lunar phase': 'Ay evresi',
	Eclipse: 'Tutulma',
	'Solar season': 'Güneş sezonu',
	'through {{date}}': '{{date}} tarihine kadar',
	Themes: 'Temalar',
	'Key periods': 'Önemli dönemler',
	Eclipses: 'Tutulmalar',
	Retrogrades: 'Retrolar',
	'Best months': 'En iyi aylar',
	'{{count}} harmonious aspects': '{{count}} uyumlu açı',
	'Year boundary': 'Yıl başlangıcı',
	'Day boundary': 'Gün başlangıcı',
	'Hour clock': 'Saat sistemi',
	'Arudha padas': 'Arudha padalar',
	Moved: 'Kaydırıldı',
	'marks a pada that fell in its own bhava or the seventh from it and was moved to the tenth from there, as the classical rule requires. {{count}} of {{total}} padas here.':
		'kendi bhavasına ya da ondan yedinciye düşen ve klasik kuralın gerektirdiği gibi oradan onuncuya kaydırılan bir padayı gösterir. Burada {{total}} padadan {{count}} tanesi.',
	'The twelve Arudha padas: each pada with its bhava, the bhava sign and its lord, the sign the lord occupies, the sign the pada falls in, which house from the Lagna that is, whether the classical exception was applied, and what the pada is read for.':
		'On iki Arudha pada: her pada bhavasıyla, bhava burcu ve yöneticisiyle, yöneticinin bulunduğu burçla, padanın düştüğü burçla, Lagnadan kaçıncı ev olduğuyla, klasik istisnanın uygulanıp uygulanmadığıyla ve padanın ne için okunduğuyla.',
	'Bhava rashi': 'Bhava rashi',
	'Lord rashi': 'Yönetici rashi',
	'Pada rashi': 'Pada rashi',
	'From Lagna': 'Lagnadan',
	Lagna: 'Lagna',
	'Arudha Lagna': 'Arudha Lagna',
	Upapada: 'Upapada',
	Mahadasha: 'Mahadasha',
	Antardasha: 'Antardasha',
	Pratyantardasha: 'Pratyantardasha',
	Sookshma: 'Sookshma',
	Prana: 'Prana',
	'Dasha timeline': 'Dasha zaman çizelgesi',
	Timeline: 'Zaman çizelgesi',
	'Chart details': 'Harita ayrıntıları',
	'Dasha views': 'Dasha görünümleri',
	'Vimshottari Mahadasha': 'Vimshottari Mahadasha',
	'Active dashas': 'Etkin dashalar',
	'{{level}} periods in {{planet}} {{parent}}':
		'{{planet}} {{parent}} içindeki {{level}} dönemleri',
	'{{planet}} {{level}}': '{{planet}} {{level}}',
	'Inside the {{planet}} {{level}}{{span}}{{duration}}.':
		'{{planet}} {{level}} içinde{{span}}{{duration}}.',
	'It began {{date}}, before birth, so only the sub-periods running after the birth date are listed.':
		'{{date}} tarihinde, doğumdan önce başladı, bu yüzden yalnızca doğum tarihinden sonraki alt dönemler listelenir.',
	'Moon nakshatra: {{name}}': 'Ay nakshatrası: {{name}}',
	'Moon nakshatra: {{name}} (lord {{lord}})':
		'Ay nakshatrası: {{name}} (yönetici {{lord}})',
	'{{balance}} left': '{{balance}} kaldı',
	'Signifies {{houses}}': '{{houses}} anlamına gelir',
	Biorhythm: 'Biyoritim',
	'Daily biorhythm': 'Günlük biyoritim',
	'Biorhythm forecast': 'Biyoritim tahmini',
	Forecast: 'Tahmin',
	'No forecast': 'Tahmin yok',
	'Biorhythm cycle lines across the forecast window':
		'Tahmin penceresi boyunca biyoritim döngü çizgileri',
	'Spotlight cycle': 'Öne çıkan döngü',
	'critical day': 'kritik gün',
	'Critical days': 'Kritik günler',
	'Two or more cycles cross zero on {{dates}}. Take extra care on these dates.':
		'{{dates}} tarihlerinde iki veya daha fazla döngü sıfırı geçiyor. Bu günlerde daha dikkatli olun.',
	'Best day': 'En iyi gün',
	'Worst day': 'En kötü gün',
	'Average energy': 'Ortalama enerji',
	Events: 'Olaylar',
	'Double days': 'Çift günler',
	'Triple day': 'Üçlü gün',
	'Readings ({{count}})': 'Yorumlar ({{count}})',
	Intellectual: 'Zihinsel',
	Intuitive: 'Sezgisel',
	'Vedic planetary positions': 'Vedik gezegen konumları',
	'Vedic planetary positions: each graha with its rashi, degree, nakshatra, pada, nakshatra lord, house, its state in all three avastha systems, and retrograde state. Jagradadi and Deeptadi are read from sign dignity, which the nodes and the Lagna do not have, so those two cells are blank on the Rahu, Ketu and Lagna rows. Uranus, Neptune and Pluto appear only when asked for and rule no sign, so every avastha and house cell is blank on their rows too.':
		'Vedik gezegen konumları: her graha rashisi, derecesi, nakshatrası, padası, nakshatra yöneticisi, evi, üç avastha sistemindeki durumu ve geri hareketiyle. Jagradadi ve Deeptadi burç onurundan okunur, düğümlerde ve Lagnada bu yoktur, bu yüzden Rahu, Ketu ve Lagna satırlarında o iki hücre boştur. Uranüs, Neptün ve Plüton yalnızca istenirse görünür ve hiçbir burcu yönetmez, bu yüzden onların satırlarında da tüm avastha ve ev hücreleri boştur.',
	'Nak. lord': 'Nak. yöneticisi',
	Baladi: 'Baladi',
	Jagradadi: 'Jagradadi',
	Deeptadi: 'Deeptadi',
	'Baladi: the five age states, set by degree within the sign':
		'Baladi: burç içindeki dereceye göre belirlenen beş yaş durumu',
	'Jagradadi: the three waking states, set by sign dignity. The seven classical grahas only':
		'Jagradadi: burç onuruna göre belirlenen üç uyanıklık durumu. Yalnızca yedi klasik graha',
	'Deeptadi: the nine dispositional states, set by sign dignity. The seven classical grahas only':
		'Deeptadi: burç onuruna göre belirlenen dokuz mizaç durumu. Yalnızca yedi klasik graha',
	Retro: 'Geri',
	'Combust grahas': 'Yanık grahalar',
	'{{distance}} deg from Sun, within {{orb}} deg orb':
		'Güneşten {{distance}} derece, {{orb}} derecelik orb içinde',
	'Planetary wars': 'Gezegen savaşları',
	'{{first}} vs {{second}}': '{{first}} ile {{second}}',
	'{{distance}} deg apart': '{{distance}} derece ayrı',
	'{{graha}} wins': '{{graha}} kazanır',
	Interpretations: 'Yorumlar',
	'Rashi.': 'Rashi.',
	'Nakshatra.': 'Nakshatra.',
	'Bhava significations': 'Bhava anlamları',
	Yogas: 'Yogalar',
	Ashtakavarga: 'Ashtakavarga',
	'Ashtakavarga grid': 'Ashtakavarga ızgarası',
	'Ashtakavarga views': 'Ashtakavarga görünümleri',
	Sarvashtakavarga: 'Sarvashtakavarga',
	Bhinnashtakavarga: 'Bhinnashtakavarga',
	Reduced: 'İndirgenmiş',
	'Reduced SAV': 'İndirgenmiş SAV',
	'Shodhya Pinda': 'Shodhya Pinda',
	'{{count}} signs': '{{count}} burç',
	'Fewer bindus': 'Daha az bindu',
	'More bindus': 'Daha çok bindu',
	Bindus: 'Bindular',
	'Rashi Pinda': 'Rashi Pinda',
	'Graha Pinda': 'Graha Pinda',
	'No sarvashtakavarga data': 'Sarvashtakavarga verisi yok',
	'No bhinnashtakavarga data': 'Bhinnashtakavarga verisi yok',
	'No reduced ashtakavarga data': 'İndirgenmiş ashtakavarga verisi yok',
	'No bindu data': 'Bindu verisi yok',
	'No shodhya pinda data': 'Shodhya pinda verisi yok',
	'Sarvashtakavarga: each of the twelve signs and the bindus all planets contribute to it, with a grand total.':
		'Sarvashtakavarga: on iki burcun her biri ve tüm gezegenlerin ona kattığı bindular, genel toplamla.',
	'Shodhya Pinda: each planet with its Rashi Pinda, Graha Pinda and Shodhya Pinda strength scores.':
		'Shodhya Pinda: her gezegen Rashi Pinda, Graha Pinda ve Shodhya Pinda güç puanlarıyla.',
	'Detected yogas': 'Tespit edilen yogalar',
	'Yoga catalog': 'Yoga kataloğu',
	'Yoga results': 'Yoga sonuçları',
	'No yoga data': 'Yoga verisi yok',
	'No yogas match your search.': 'Aramanızla eşleşen yoga yok.',
	'Filter yogas...': 'Yogaları filtrele...',
	'Filter detected yogas by name': 'Tespit edilen yogaları ada göre filtrele',
	'Filter yoga list by name': 'Yoga listesini ada göre filtrele',
	'{{count}} of {{total}} present': '{{total}} yogadan {{count}} tanesi var',
	'{{count}} total': 'toplam {{count}}',
	'Classical family': 'Klasik aile',
	Effects: 'Etkiler',
	'Every classical condition is satisfied by this chart.':
		'Bu harita klasik koşulların hepsini karşılıyor.',
	'The rule matched, but a stronger family silences it under the classical precedence norms. Each card names the family that took precedence.':
		'Kural sağlandı, ancak klasik öncelik normlarına göre daha güçlü bir aile onu susturuyor. Her kart önceliği alan aileyi belirtir.',
	'At least one classical condition fails. Read the evidence for which.':
		'En az bir klasik koşul sağlanmıyor. Hangisi olduğu kanıtlarda görülür.',
	Synastry: 'Sinastri',
	'Synastry compatibility chart': 'Sinastri uyum haritası',
	'Synastry dual wheel': 'Sinastri çift çarkı',
	'Dual chart wheel comparing two natal charts':
		'İki doğum haritasını karşılaştıran çift çark',
	'Synastry response missing planet positions.':
		'Sinastri yanıtında gezegen konumları yok.',
	'A current {{endpoint}} response carries {{first}} and {{second}}, and the inter-aspect readings below still work without them.':
		'Güncel bir {{endpoint}} yanıtı {{first}} ve {{second}} taşır, aşağıdaki karşılıklı açı yorumları onlarsız da çalışır.',
	'Inter-aspects': 'Karşılıklı açılar',
	'Inter-aspect summary': 'Karşılıklı açı özeti',
	'In this pairing': 'Bu eşleşmede',
	'All {{count}} inter-aspects': '{{count}} karşılıklı açının tümü',
	'orb {{orb}}° · str {{strength}}': 'orb {{orb}}° · güç {{strength}}',
	'ASC{{n}}': 'ASC{{n}}',
	'Person {{n}}': 'Kişi {{n}}',
	'Score {{score}} of 100': 'Puan {{score}} / 100',
	'Sign sectors, not houses': 'Burç sektörleri, ev değil',
	'Planet 1': 'Gezegen 1',
	'Planet 2': 'Gezegen 2',
	// An indefinite compound on purpose: the definite form needs a genitive suffix
	// on the NAME, which would require both an apostrophe and vowel harmony computed
	// from a runtime value. Dropping it puts every suffix on `ev`, which is the same
	// manoeuvre recorded above for the sign-ingress line. Possessor first, subject
	// last, which is also the order Turkish astrology headings actually print.
	'{{first}} in the houses of {{second}}': '{{second}} evlerinde {{first}}',
	'Own house': 'Kendi evi',
	'Inter-chart aspects: the planet from chart 1, the planet from chart 2, the aspect between them, the orb in degrees and the strength.':
		'Haritalar arası açılar: harita 1 gezegeni, harita 2 gezegeni, aralarındaki açı, derece cinsinden orb ve güç.',
};

registerLocale('tr', tr);
