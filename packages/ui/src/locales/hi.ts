/**
 * Hindi chrome strings, in Devanagari.
 *
 * @remarks
 * Importing this module registers the catalogue and re-renders every mounted component, so it is a side-effect entry, exactly like a `components/*` module. It is built to `dist/locales/hi.js` and `dist/cdn/locales/hi.js` as its OWN payload rather than compiled into the components, so an English site downloads none of it.
 *
 * Keyed by the English source string as it appears at the call site, so this file diffs directly against the component that renders it and no key vocabulary has to be kept in sync with the copy.
 *
 * **The component is a WESTERN natal chart and the reader is a Jyotisha reader**, so the settled Sanskrit-derived word wins over a transliteration of the English one wherever the concept exists in both traditions: भाव for house, दृष्टि for aspect, वक्री for retrograde, तत्व for element, गुण for modality, योग for a configuration, फलादेश for a reading.
 *
 * **Five entries have no Hindi tradition behind them at all**, and that is a property of the concepts rather than of the search: orb, apex, dissociate, relocation chart and aspect tightness are Western mechanics that Hindi-language astrology does not model, so no publication names them. Each is written here as the plainest defensible Hindi (`ऑर्ब`, `शीर्ष`, `भिन्न राशि`, `स्थान परिवर्तन कुंडली`, `सटीक`) and each wants a bilingual practitioner to confirm it before it is treated as settled. `कक्षा` was rejected for orb deliberately: it means orbit, and would read as a different quantity entirely.
 *
 * **गोचर is the right word for transit and it imports no Vedic technique, because गोचर names the moving planet and its passage, not the method of judging it.** Hindi Wikipedia defines the word as motion and then describes transit-to-natal contact by contact, which is what this bi-wheel draws. What IS Vedic-specific is the judgement rule that follows in the same article, taking the natal Moon sign as house one, and the Ashtakavarga and Sade Sati layers on top of it. That is what a reader means by **गोचर फल**, and the phrase is written NOWHERE in this file. `Transit readings` is `गोचर फलादेश`, built on the catalogue's settled फलादेश, so it reads as readings of the transits rather than as the Moon-sign table. If it ever reads the other way the fix is `गोचर के फलादेश`, never a new word.
 *
 * **भाव संधि is the house cusp, and भाव मध्य is the trap.** भाव मध्य is the MIDPOINT of a bhava, which English-language Vedic writing confusingly also calls a cusp, so software output invites the swap. It is wrong here: the Western cusp is the boundary, and substituting it would move the meaning of every drawn sector by fifteen degrees. This is the weakest-sourced term in the file (Hindi Wikipedia has no article for it) and is in professional use rather than encyclopaedic.
 *
 * **Applying and separating: Tajika DOES name these, as इत्थशाल and इशराफ, and both were rejected on purpose.** They are yogas with conditions this component never computes (a deeptamsha orb table, and Tajika drishti, whose sign scheme differs from Western aspects), so printing them would claim a Varshaphala result the library did not calculate; the spelling is unstable across sources besides. The plainest defensible Hindi is used instead, agreeing in gender with दृष्टि.
 *
 * Three more gaps, all from the same root: a Jyotisha chart is a square diagram, not concentric rings, so nothing in Hindi names a two-ring wheel (`दोहरा चक्र`, plain; `द्विचक्र` rejected, it reads as a two-wheeler), its rings (`वलय`, borrowed from Hindi ASTRONOMY, as in an annular eclipse), or a normalized aspect score. Two sign names are written in Devanagari where the library itself hardcodes them (`मेष`), because with `?lang=hi` the wheel labels come back in Devanagari and the chip has to agree.
 */

import type { ChromeString } from '../i18n/chrome-strings.js';
import { registerLocale } from '../i18n/registry.js';

export const hi: Record<ChromeString, string> = {
	'Edit query': 'विवरण संपादित करें',
	'Spiritual data by RoxyAPI': 'RoxyAPI द्वारा आध्यात्मिक डेटा',
	'No data': 'कोई डेटा नहीं है',
	Loading: 'लोड हो रहा है',
	Reading: 'फलादेश',

	'Natal chart': 'जन्म कुंडली',
	'Relocation chart': 'स्थान परिवर्तन कुंडली',
	'No chart data': 'कुंडली का कोई डेटा नहीं है',
	Wheel: 'कुंडली चक्र',
	'Aspect grid': 'दृष्टि तालिका',
	'Natal chart views': 'जन्म कुंडली के दृश्य',
	'Natal chart wheel': 'जन्म कुंडली चक्र',
	'Natal chart wheel with twelve houses, planets, and aspects':
		'बारह भाव, ग्रह और दृष्टियों सहित जन्म कुंडली चक्र',
	'Natal chart wheel with planets and aspects, houses shown as equal sectors from the Ascendant':
		'ग्रह और दृष्टियों सहित जन्म कुंडली चक्र, भाव लग्न से समान खंडों में दिखाए गए हैं',
	'Equal sectors from the Ascendant, no house cusps in this response':
		'लग्न से समान खंड, इस डेटा में भाव संधियाँ नहीं हैं',
	'Twelve zodiac sign segments around a circular wheel. Planet glyphs are placed at their ecliptic longitudes. Aspect lines connect related planets.':
		'वृत्ताकार चक्र के चारों ओर बारह राशि खंड। ग्रह चिह्न अपने क्रांतिवृत्तीय देशांतर पर स्थित हैं। दृष्टि रेखाएँ संबंधित ग्रहों को जोड़ती हैं।',
	retrograde: 'वक्री',

	'{{count}} planets': 'ग्रह: {{count}}',
	'{{count}} aspects': 'दृष्टियाँ: {{count}}',
	'{{system}} houses': '{{system}} भाव पद्धति',

	'No planets to grid': 'तालिका के लिए कोई ग्रह नहीं है',
	'Planet by planet aspect grid: the aspect each pair of planets forms, read from the planet naming the row across to the planet naming the column.':
		'ग्रह दर ग्रह दृष्टि तालिका: हर ग्रह युग्म जो दृष्टि बनाता है, वह पंक्ति वाले ग्रह से स्तंभ वाले ग्रह तक पढ़ी जाती है।',
	orb: 'ऑर्ब',

	'Dominant element': 'प्रमुख तत्व',
	'Dominant modality': 'प्रमुख गुण',
	Harmonious: 'शुभ',
	Challenging: 'अशुभ',
	Neutral: 'सम',
	'All {{count}} bodies in the chart, placed by sign':
		'कुंडली के सभी {{count}} ग्रह, राशि के अनुसार',
	'Element and modality distribution': 'तत्व और गुण वितरण',
	Total: 'कुल',

	'Chart patterns': 'कुंडली के योग',
	Dissociate: 'भिन्न राशि',
	'Out of sign: one or more planets sit outside the pattern element or modality, so the theme holds but runs weaker.':
		'राशि से बाहर: एक या अधिक ग्रह योग के तत्व या गुण से बाहर हैं, इसलिए भाव बना रहता है पर प्रभाव कम रहता है।',
	'{{percent}}% tight': '{{percent}}% सटीक',
	apex: 'शीर्ष',

	'Planet readings': 'ग्रह फलादेश',

	Transits: 'गोचर',
	'No transit data': 'गोचर का कोई डेटा नहीं है',
	'Aspects to the natal chart: {{count}}': 'जन्म कुंडली पर दृष्टियाँ: {{count}}',
	'Natal and transit bi-wheel': 'जन्म और गोचर का दोहरा चक्र',
	'Bi-wheel with natal bodies on the inner ring and transiting bodies on the outer ring':
		'दोहरा चक्र जिसमें जन्म ग्रह भीतरी वलय पर और गोचर ग्रह बाहरी वलय पर हैं',
	'Twelve zodiac sign segments around a circular wheel. Natal bodies sit at their ecliptic longitudes on the inner ring and transiting bodies on the outer ring, and each line joins a transiting body to the natal body it aspects.':
		'वृत्ताकार चक्र के चारों ओर बारह राशि खंड। जन्म ग्रह अपने क्रांतिवृत्तीय देशांतर पर भीतरी वलय पर स्थित हैं और गोचर ग्रह बाहरी वलय पर, और हर रेखा एक गोचर ग्रह को उस जन्म ग्रह से जोड़ती है जिस पर उसकी दृष्टि है।',

	'{{count}} natal bodies': 'जन्म ग्रह: {{count}}',
	'{{count}} transiting bodies': 'गोचर ग्रह: {{count}}',
	'Ascendant on the left horizon': 'बाएँ क्षितिज पर लग्न',
	'First house cusp on the left horizon': 'बाएँ क्षितिज पर प्रथम भाव की संधि',
	'Sign wheel, 0° Aries on the left': 'राशि चक्र, बाईं ओर 0° मेष',
	'House cusps supplied by the page': 'पृष्ठ से मिली भाव संधियाँ',
	'No house cusps': 'कोई भाव संधि नहीं',

	'Transit aspect summary': 'गोचर दृष्टि सारांश',
	Strongest: 'सबसे बली',
	Natal: 'जन्म',
	Transiting: 'गोचर',
	Applying: 'निकट आती',
	Separating: 'दूर जाती',
	strength: 'बल',

	'Every body with its natal position and its position on the transit date, each as a zodiac sign and a degree.':
		'हर ग्रह की जन्म स्थिति और गोचर दिनांक पर उसकी स्थिति, दोनों राशि और अंश में।',
	'Both house numbers are read against the natal house cusps.':
		'दोनों भाव संख्याएँ जन्म कुंडली की भाव संधियों के अनुसार पढ़ी जाती हैं।',
	Body: 'ग्रह',
	'Natal house': 'जन्म भाव',
	'Transiting house': 'गोचर भाव',

	'Transit readings': 'गोचर फलादेश',
	Impact: 'प्रभाव',
	Timing: 'समय',
	Guidance: 'मार्गदर्शन',
};

registerLocale('hi', hi);
