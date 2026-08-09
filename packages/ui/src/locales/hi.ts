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
 * **Applying and separating: Tajika DOES name these, as इत्थशाल and इशराफ, and both were rejected on purpose.** They are yogas with conditions this component never computes (a deeptamsha orb table, and Tajika drishti, whose sign scheme differs from Western aspects), so printing them would claim a Varshaphala result the library did not calculate; the spelling is unstable across sources besides. The plainest defensible Hindi is used instead, agreeing in gender with दृष्टि. **This file WON the disagreement on 2026-08-09**: the API shipped `वर्धमान` / `क्षीयमाण`, which name the waxing and waning MOON rather than an aspect closing or opening, and it now carries the same निकट आना / दूर जाना pair. The two surfaces inflect it differently on purpose, `निकट आती` as a standalone chip label here and `निकट आ रही है` as a finite clause in the API sentence, so do not read that as drift and do not "align" them into bad Hindi.
 *
 * Three more gaps, all from the same root: a Jyotisha chart is a square diagram, not concentric rings, so nothing in Hindi names a two-ring wheel (`दोहरा चक्र`, plain; `द्विचक्र` rejected, it reads as a two-wheeler), its rings (`वलय`, borrowed from Hindi ASTRONOMY, as in an annular eclipse), or a normalized aspect score. Two sign names are written in Devanagari where the library itself hardcodes them (`मेष`), because with `?lang=hi` the wheel labels come back in Devanagari and the chip has to agree.
 *
 * **Five values were corrected on 2026-08-09, and three of them were the same defect: the catalogue was contradicting our own API on the same card.**
 *
 * **`सौम्य` / `कठिन` / `तटस्थ` replaced `शुभ` / `अशुभ` / `सम` for the aspect classes.** `शुभ` and `अशुभ` are the Jyotisha BENEFIC and MALEFIC classification of a planet (astrosage, `चन्द्रमा, बुध, शुक्र, गुरू शुभ ग्रह हैं`), so a Hindi reader saw `अशुभ` on a square and understood that a malefic was involved rather than that the angle is ninety degrees; this library computes the angle and knows nothing about benefic nature. `सम` is the ग्रह-मैत्री scheme (मित्र / सम / शत्रु), a third unrelated axis. Verified live on 2026-08-09 against `/astrology/natal-chart?lang=hi`, whose own aspect summary reads `आपकी कुंडली में 38 युतियाँ हैं: 13 सौम्य, 14 कठिन और 11 तटस्थ`: the legend and the prose beneath it were naming the same three classes with different words.
 *
 * **`दृष्टि संरचनाएँ` replaced `कुंडली के योग` for the aspect figures, and this is the Hindi form of the defect that started the whole sweep.** `कुंडली के योग` is character for character the title of a major Hindi astrology portal page about NAMED VEDIC YOGAS (astroyogi, listing गजकेसरी योग, बुधादित्य योग, राज योग), which carry life verdicts our five geometric figures assert nothing about. **The obvious replacement is worse:** `आकृति योग` is the Nabhasa shape-yoga family (गदा, शकट, विहंग), so it would claim a different detection entirely, and `त्रिकोण` is the Jyotisha trine HOUSES. Hindi-language Western astrology names these figures not at all: `ग्रैंड ट्राइन` returns zero hits on hi.wikipedia and `टी-स्क्वायर` returns nine, none astrological. `संरचना` is our API's own shipped noun for an aspect figure (it writes `एक उच्च-तनाव संरचना` for the Grand Cross and `एक संतुलित संरचना` for the Mystic Rectangle), so the card and the interpretation under it now use one word. **It is our coinage, not an attested Hindi term.**
 *
 * `स्थानांतरित जन्म कुंडली` replaced `स्थान परिवर्तन कुंडली`, which collided twice: `स्थान परिवर्तन योग` is a real Jyotisha yoga (exchange of house lordships), and in plain Hindi `स्थान परिवर्तन` is the ACT of moving house, so the old string read as a muhurta chart for choosing a moving date rather than the natal chart recast for a new place. Also our coinage.
 *
 * `{{percent}}% निकट` replaced `{{percent}}% सटीक`. `सटीक` means ACCURATE, and astrosage uses it in exactly the phrase `सटीक फलादेश`, an accurate prediction. On a product whose positioning is verified accuracy, a chip reading `82% सटीक` invites the reading that the interpretation is 82 percent accurate.
 *
 * `अवधि` replaced `समय` for the timing paragraph, the same CONTRACT error that was corrected in five sibling locales: the field is how long the transit lasts, not when it happens, and `समय` is simply `time`. First-party evidence rather than a translation: the API's own Hindi values for this field are `कुछ घंटों के लिए सक्रिय` and `विस्तारित अवधि के लिए सक्रिय`, so `अवधि` is the word already sitting inside the sentence this label heads.
 *
 * `राशि से बाहर` replaced `भिन्न राशि` for the dissociate chip so the chip and the sentence explaining it use one phrase. That sentence lost two words in the same edit: `योग`, which had to go with the heading, and `भाव`, which was meant as theme but is this file's word for HOUSE on eight other strings and so read as `the house remains`.
 *
 * **`दोनों भाव संख्याएँ ... चंद्र राशि से नहीं` is the most load-bearing string in this file and must never be shortened.** `गोचर भाव` would otherwise be read with the standard Jyotisha transit convention, which counts houses from the natal MOON (astrosage, `जन्मकुंडली में चंद्रमा जिस भाव में स्थित होता है उसे लग्न भाव मानकर गोचर के ग्रहों का फलकथन कहा जाता है`). This component counts from the natal house cusps, so the sentence now rules the other convention out by name.
 *
 * **The elements and modalities are the best-sourced entries in this file.** चर / स्थिर / द्विस्वभाव map onto cardinal / fixed / mutable sign for sign, and futurestudyonline gives the English gloss itself (`अंग्रजी में इसे फिक्स राशि कहते हैं`). The five-tattva problem does not bite: the rashi division is fourfold in every source, and astrosage's own Hindi WESTERN sun-sign page prints `तत्व: अग्नि` for Aries and `तत्व: पृथ्वी` for Taurus under the heading `पाश्चात्य ज्योतिष में सूर्य राशि`. `चर` and `स्थिर` are already as short as the words get, so they are not abbreviated at all; `द्विस्व` cuts on a clean akshara boundary and never splits a matra. The abbreviations are ours.
 *
 * **`प्रमुख गुण` was examined and deliberately NOT changed.** Every Hindi authority names this axis `स्वभाव` or `प्रकृति`, never `गुण`, and `गुण` in a kundli context pulls the 36-गुण matching score. But our own API uses `गुण` for exactly this axis, and changing one surface alone recreates the contradiction the three fixes above just removed. **Move both surfaces to `स्वभाव` in one pass or leave both; do not touch this file alone.**
 *
 * **`ऑर्ब` was examined and kept.** It is a bare transliteration that means nothing to a Hindi reader (the general corpus resolves it to video-game orbs) and the honest alternative, `अंश अंतर`, is equally unattested. A transliterated loanword is a legitimate strategy for a Western technical term that Jyotisha does not model, and it is what `tr.ts` does with `orb` on sourced grounds. Revisit with a practitioner, not with another coinage.
 *
 * **Twelve entries in this file are unattested, not five.** `दृष्टि संरचनाएँ`, `स्थानांतरित जन्म कुंडली`, `{{percent}}% निकट`, `राशि से बाहर`, `ऑर्ब`, `शीर्ष`, `निकट आती` / `दूर जाती`, `दोहरा चक्र`, `वलय`, `भाव संधि`, `कुंडली चक्र`, and the three cross-tab abbreviations. One carries a specific question for the practitioner: whether a bare `शीर्ष` pulls the `शीर्षोदय` sign classification. The applying and separating pair no longer does, because the API adopted this file's choice on 2026-08-09; both surfaces are now unattested in the SAME direction, which is a decision on record rather than a disagreement.
 *
 * ---
 *
 * **HUMAN DESIGN, added 2026-08-09. The 54 entries below are governed by a DIFFERENT rule from everything above them, and the difference is the whole point.** The rule above is "the settled Sanskrit-derived word wins wherever the concept exists in both traditions", because a Western natal chart and a Jyotisha chart genuinely model the same objects. Human Design is a 1987 Western synthesis and Jyotisha does not model ANY of it, so there is nothing to reach for and reaching anyway is how the file breaks. Searched live on 2026-08-09 and the corpus is not thin, it is absent: hi.wikipedia has no `ह्यूमन डिज़ाइन` article, and Hindi web searches for the types, the centres, the Incarnation Cross and the Variables arrows return font generators, electrical channel gates and unrelated HR pages. **Do not read that as a failed search and go looking for Jyotisha cover.**
 *
 * **The binding source for these entries is FIRST-PARTY: `~/per/roxy/roxyapi/packages/human-design/src/locales/hi.ts`, the Hindi our own API already ships for the same concepts.** These labels are printed directly above values that endpoint returns, so a label naming a different concept from the value beneath it makes the card contradict itself. Matched from it, verbatim: `प्रकार` sits above the `types` values (`जनरेटर`, `प्रोजेक्टर`); `रणनीति` and `प्राधिकार` are the API's own nouns for Strategy and Authority in prose it already ships (`जब रणनीति और प्राधिकार निर्णय को चला रहे हों`, `जाल यह है कि मन को ही प्राधिकार समझ लेना`); `प्रोफाइल` from `profileDescriptions`; `परिभाषा` is the API's noun for HD Definition (`पूरी परिभाषा से होकर बहती है`, `किसी भी परिभाषा में सबसे धीमा`), NOT a dictionary definition; `आभामंडल` from `typeAuras`; `अवतार-क्रॉस` from `planetDescriptions`; `पर्सनैलिटी` / `डिज़ाइन` are the API's transliterations for the two chart sides (`पर्सनैलिटी सूर्य`, `डिज़ाइन नोड्स`), and its `sideDescriptions` then open `सचेत पक्ष` and `अचेतन पक्ष`, so tab and description agree exactly as they do in English; `बॉडीग्राफ` (16 uses); `केंद्र`, `चैनल`, `गेट`, `मोटर`, `जागरूकता`, `सक्रियण`, `परिभाषित` / `खुला`, `रेखा` for a profile line; `वेरिएबल`, `कलर` and `टोन` from `baseDescription` and `layerDescriptions`. **Where the API ships a word, this file does not invent a better one.**
 *
 * **The transliterations are the CORRECT answer here, not a shortcut.** Our API already writes `मैनिफेस्टर`, `प्रोजेक्टर`, `सेक्रल`, `आज्ञा`, `सोलर प्लेक्सस`, `गेट`, `चैनल`, `त्रिग्राम`, so a Devanagari loanword is this system's established register in our own product, and `सर्किट` is written the same way for the same reason: `गेट` and `चैनल` are transliterated on both sides of it, and `परिपथ` (hinkhoj, shabdkosh: the scientific word) would be the only Sanskrit-derived member of a triad. `ह्यूमन डिज़ाइन` is the compound live on the Hindi product page of a Hindi-serving competitor (astrology-api.io/hi/p/human-design-api, fetched 2026-08-09), and `ह्यूमन` is shabdkosh's own rendering of `human`.
 *
 * **`षट्कोण` was REJECTED for the I Ching hexagram and this is the sharpest call in the block, because our OWN API ships it.** `packages/iching/src/locales/hi.ts` writes `{{date}} के लिए आपका षट्कोण`. Two independent dictionaries say that word cannot carry this: hindwi (Rekhta Foundation) and hi.wiktionary's Shabdsagar entry both gloss `षट्कोण` as (1) six-cornered, a hexagon, (2) **`ज्योतिष में लग्न से छठा घर जो रिपुक स्थान कहा जाता है`**, and (3) a six-angled yantra. It is a JYOTISHA HOUSE NAME. On a card that already prints `भाव` for house on eight strings, `षट्कोण 51` invites a Hindi reader to read the sixth house, and the English word never carried that. `हेक्साग्राम` is used instead: hi.wikipedia has the article under exactly that title, and it carries the SAME polysemy the English source carries (six-pointed star first, I Ching figure second), which the qualifier `आई चिंग` resolves in the label just as it does in English. `आई चिंग` is attested in running text on hi.wikipedia's `हस्तरेखा शास्त्र` article (`चीनी वाईजिंग (आई चिंग)`); there is no hi.wikipedia article for the text under any title. **The API is the surface that is wrong here, not this file. Filed for the API, do not "align" this entry backwards.**
 *
 * **Three more Jyotisha or Indic words were considered and refused.** `अनात्म` / `अनात्मवाद` for Not-self: hi.wikipedia defines it as the philosophical doctrine that denies the existence of the soul, held by Buddhist and Charvaka darshana, which is a metaphysical position and not a conditioning theme, so it is the exact class of defect the API's `शुभ` / `अशुभ` aspect labels were. `परिपथ` for circuit, above. `आधार` for the PHS Base, rejected only for consistency: its two siblings `कलर` and `टोन` are already transliterated by the API, so a mixed `कलर · टोन · आधार` row would read as three unrelated things.
 *
 * **`रंग` and `कलर` are deliberately two different words for two different things and must not be unified.** `कलर` is the PHS Variables layer, a number 1 to 6 with a keynote, never a colour on screen, and the API's own Hindi already uses `कलर` for it. `रंग` is the actual paint in the bodygraph legend and the long chart description. Same split as the English, which the reader cannot see because English reuses one word.
 *
 * Sourced dictionary entries for the words that are plain Hindi rather than first-party, all fetched live 2026-08-09: `संज्ञान` for Cognition is hi.wikipedia's own article, which glosses it `संज्ञान (cognition, कोग्निशन)` and lists attention, memory, decision making and problem solving, matching the API's `संज्ञानात्मक क्षमता`; `जीव विज्ञान` (hinkhoj) for Biology, the same discipline-word-as-category-label stretch the English makes; `जागरूकता` (hinkhoj) for Awareness, corroborating the API; `संदर्भ` (hinkhoj) for Reference; `रूपरेखा` (hinkhoj) for outlined; `छायाकृति` (hinkhoj) for silhouette; `कगार` (hinkhoj, `brink`) for the knife-edge warning; `विश्वसनीयता` (hinkhoj, `RELIABILITY` / `CREDIBILITY`) for low confidence; `प्रकार`, `रणनीति`, `परिभाषा`, `प्रोफाइल`, `टोन`, `कलर`, `बेस`, `सर्किट` and `प्राधिकार` (hinkhoj, `प्राधिकार = AUTHORITY`) all confirmed against the same dictionary in both directions.
 *
 * **`रेखा` for a Human Design line does not collide with anything in this file, and the collision to watch is elsewhere.** `पंक्ति` is already this file's word for a TABLE ROW (`पंक्तियाँ: {{count}}`), which is why the HD line is not that; `दृष्टि रेखाएँ` in the natal chart description is aspect lines, an overlap English has too. Both the API's HD locale and its I Ching locale use `रेखा` for a line of a figure, so this is the settled word on three surfaces.
 *
 * **Six of the 54 have no attested Hindi Human Design tradition and want a bilingual practitioner before they are treated as settled**, and this is a property of the concepts, not of the search: `सिग्नेचर`, `नॉट-सेल्फ` (and `नॉट-सेल्फ प्रश्न`), `आई चिंग हेक्साग्राम`, `सर्किट`, `बेस`, and `जीव विज्ञान`. The first two carry a named risk rather than a vague one: hinkhoj gives `हस्ताक्षर`, `दस्तखत` AND `सिग्नेचर` all three for a WRITTEN signature, so both candidates denote the same wrong thing, and `सिग्नेचर` was chosen only because a marked loanword reads as a term of art while a Devanagari-native `हस्ताक्षर` asserts the everyday meaning with confidence. That is lesson 32's failure mode, a reader understanding something else correctly, and it is the single entry in this block most likely to be wrong.
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
	'Relocation chart': 'स्थानांतरित जन्म कुंडली',
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
	Harmonious: 'सौम्य',
	Challenging: 'कठिन',
	Neutral: 'तटस्थ',
	'All {{count}} bodies in the chart, placed by sign':
		'कुंडली के सभी {{count}} ग्रह, राशि के अनुसार',
	'Element and modality distribution': 'तत्व और गुण वितरण',
	Total: 'कुल',

	Fire: 'अग्नि',
	Earth: 'पृथ्वी',
	Air: 'वायु',
	Water: 'जल',
	Cardinal: 'चर',
	Fixed: 'स्थिर',
	Mutable: 'द्विस्वभाव',
	Car: 'चर',
	Fix: 'स्थिर',
	Mut: 'द्विस्व',

	'Chart patterns': 'दृष्टि संरचनाएँ',
	Dissociate: 'राशि से बाहर',
	'Out of sign: one or more planets sit outside the pattern element or modality, so the theme holds but runs weaker.':
		'राशि से बाहर: एक या अधिक ग्रह संरचना के तत्व या गुण से बाहर हैं, इसलिए इसका मूल असर वही रहता है पर कम प्रबल रहता है।',
	'{{percent}}% tight': '{{percent}}% निकट',
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
	'House cusps from the response': 'उत्तर से मिली भाव संधियाँ',
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
		'दोनों भाव संख्याएँ जन्म कुंडली की भाव संधियों से गिनी जाती हैं, चंद्र राशि से नहीं।',
	Body: 'ग्रह',
	'Natal house': 'जन्म भाव',
	'Transiting house': 'गोचर भाव',

	'Transit readings': 'गोचर फलादेश',
	Impact: 'प्रभाव',
	Timing: 'अवधि',
	Guidance: 'मार्गदर्शन',

	'Nested data omitted': 'भीतरी डेटा नहीं दिखाया गया',
	'Generic data display': 'सामान्य डेटा प्रदर्शन',
	'Empty list': 'खाली सूची',
	'Data table': 'डेटा तालिका',
	'{{count}} rows': 'पंक्तियाँ: {{count}}',
	Yes: 'हाँ',
	No: 'नहीं',
	illustration: 'चित्र',

	Type: 'प्रकार',
	Strategy: 'रणनीति',
	Authority: 'प्राधिकार',
	Profile: 'प्रोफाइल',
	Definition: 'परिभाषा',
	Aura: 'आभामंडल',
	'Incarnation cross': 'अवतार-क्रॉस',
	'Signature: {{value}}': 'सिग्नेचर: {{value}}',
	'Not-self: {{value}}': 'नॉट-सेल्फ: {{value}}',
	'Profile {{profile}}': 'प्रोफाइल {{profile}}',
	'Line {{line}} · Personality': 'रेखा {{line}} · पर्सनैलिटी',
	'Line {{line}} · Design': 'रेखा {{line}} · डिज़ाइन',
	Personality: 'पर्सनैलिटी',
	Design: 'डिज़ाइन',

	Bodygraph: 'बॉडीग्राफ',
	'No bodygraph data': 'बॉडीग्राफ का कोई डेटा नहीं है',
	'Human Design bodygraph': 'ह्यूमन डिज़ाइन बॉडीग्राफ',
	'Human Design bodygraph with nine centers, channels, and activated gates overlaid on a human silhouette':
		'नौ केंद्रों, चैनलों और सक्रिय गेटों सहित ह्यूमन डिज़ाइन बॉडीग्राफ, एक मानव छायाकृति पर बना हुआ',
	'Nine energy centers in their canonical positions over a human silhouette, each filled with its traditional color when defined and outlined when open, wired by channels between activated gates.':
		'एक मानव छायाकृति पर नौ ऊर्जा केंद्र अपनी निश्चित स्थितियों में। परिभाषित होने पर हर केंद्र अपने पारंपरिक रंग से भरा रहता है और खुला होने पर केवल रूपरेखा में रहता है, और सक्रिय गेटों के बीच चैनल उन्हें आपस में जोड़ते हैं।',
	'Center colors when defined. Open centers are outlined.':
		'परिभाषित होने पर केंद्रों के रंग। खुले केंद्र केवल रूपरेखा में रहते हैं।',
	'Open center': 'खुला केंद्र',
	'Defined channels ({{count}})': 'परिभाषित चैनल ({{count}})',
	'{{circuit}} circuit': '{{circuit}} सर्किट',
	'Centers ({{defined}} defined, {{open}} open)':
		'केंद्र ({{defined}} परिभाषित, {{open}} खुले)',
	Defined: 'परिभाषित',
	Open: 'खुला',
	Motor: 'मोटर',
	Awareness: 'जागरूकता',
	'Not-self question': 'नॉट-सेल्फ प्रश्न',
	Biology: 'जीव विज्ञान',
	'Gates {{gates}}': 'गेट {{gates}}',
	'Activations ({{count}})': 'सक्रियण ({{count}})',
	'Chart sides': 'चार्ट के पक्ष',
	'Line {{line}}': 'रेखा {{line}}',
	'Gate {{gate}}': 'गेट {{gate}}',
	'I Ching hexagram {{number}}': 'आई चिंग हेक्साग्राम {{number}}',

	'No Human Design data': 'ह्यूमन डिज़ाइन का कोई डेटा नहीं है',
	'Personality line': 'पर्सनैलिटी रेखा',
	'Design line': 'डिज़ाइन रेखा',
	Lines: 'रेखाएँ',

	Variables: 'वेरिएबल',
	'No variables data': 'वेरिएबल का कोई डेटा नहीं है',
	'Human Design variables': 'ह्यूमन डिज़ाइन वेरिएबल',
	'Low confidence: a birth time near a color or tone boundary. Verify the exact birth time.':
		'कम विश्वसनीयता: जन्म समय किसी कलर या टोन की सीमा के निकट है। सटीक जन्म समय की पुष्टि करें।',
	'Low confidence: a birth time near a color or tone boundary (within {{margin}}°). Verify the exact birth time.':
		'कम विश्वसनीयता: जन्म समय किसी कलर या टोन की सीमा के निकट है ({{margin}}° के भीतर)। सटीक जन्म समय की पुष्टि करें।',
	'Color {{color}} · Tone {{tone}} · Base {{base}}':
		'कलर {{color}} · टोन {{tone}} · बेस {{base}}',
	'Knife-edge: could flip with a more precise birth time.':
		'कगार पर: अधिक सटीक जन्म समय मिलने पर यह बदल सकता है।',
	Base: 'बेस',
	Color: 'कलर',
	Tone: 'टोन',
	Direction: 'दिशा',
	Cognition: 'संज्ञान',

	Reference: 'संदर्भ',
	'No reference data': 'संदर्भ का कोई डेटा नहीं है',
};

registerLocale('hi', hi);
