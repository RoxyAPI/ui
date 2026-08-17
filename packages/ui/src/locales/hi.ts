/**
 * Hindi chrome strings, in Devanagari.
 *
 * @remarks
 * Importing this module registers the catalogue and re-renders every mounted component, so it is a side-effect entry, exactly like a `components/*` module. It is built to `dist/locales/hi.js` and `dist/cdn/locales/hi.js` as its OWN payload rather than compiled into the components, so an English site downloads none of it.
 *
 * Keyed by the English source string as it appears at the call site, so this file diffs directly against the component that renders it and no key vocabulary has to be kept in sync with the copy.
 *
 * Every entry below was checked against live Hindi astrology usage rather than machine translated. What follows is the reasoning a maintainer needs; the attestation itself is recorded internally.
 *
 * **The component is a WESTERN natal chart and the reader is a Jyotisha reader**, so the settled Sanskrit-derived word wins over a transliteration of the English one wherever the concept exists in both traditions: भाव for house, दृष्टि for aspect, वक्री for retrograde, तत्व for element, गुण for modality, योग for a configuration, फलादेश for a reading.
 *
 * **Five entries have no Hindi tradition behind them at all**, and that is a property of the concepts rather than of the search: orb, apex, dissociate, relocation chart and aspect tightness are Western mechanics that Hindi-language astrology does not model. Each is written here as the plainest defensible Hindi and each wants a bilingual practitioner to confirm it. `कक्षा` was rejected for orb deliberately: it means orbit, and would read as a different quantity entirely.
 *
 * **गोचर is the right word for transit and it imports no Vedic technique, because गोचर names the moving planet and its passage, not the method of judging it.** What IS Vedic-specific is the judgement rule that takes the natal Moon sign as house one, plus the Ashtakavarga and Sade Sati layers on top of it. That is what a reader means by **गोचर फल**, and the phrase is written NOWHERE in this file. `Transit readings` is `गोचर फलादेश`, built on the catalogue's settled फलादेश. If it ever reads the other way the fix is `गोचर के फलादेश`, never a new word.
 *
 * **भाव संधि is the house cusp, and भाव मध्य is the trap.** भाव मध्य is the MIDPOINT of a bhava, which English-language Vedic writing confusingly also calls a cusp, so software output invites the swap. It is wrong here: the Western cusp is the boundary, and substituting it would move the meaning of every drawn sector by fifteen degrees. This is the weakest-sourced term in the file and is in professional use rather than encyclopaedic.
 *
 * **Applying and separating: Tajika DOES name these, as इत्थशाल and इशराफ, and both were rejected on purpose.** They are yogas with conditions this component never computes, so printing them would claim a Varshaphala result the library did not calculate, and the spelling is unstable besides. The plainest defensible Hindi is used instead, agreeing in gender with दृष्टि. **This file WON the disagreement on 2026-08-09**: the API shipped `वर्धमान` / `क्षीयमाण`, which name the waxing and waning MOON rather than an aspect closing or opening, and it now carries the same निकट आना / दूर जाना pair. The two surfaces inflect it differently on purpose, `निकट आती` as a standalone chip label here and `निकट आ रही है` as a finite clause in the API sentence, so do not read that as drift and do not "align" them into bad Hindi.
 *
 * Three more gaps, all from the same root: a Jyotisha chart is a square diagram, not concentric rings, so nothing in Hindi names a two-ring wheel (`दोहरा चक्र`; `द्विचक्र` rejected, it reads as a two-wheeler), its rings (`वलय`, borrowed from Hindi ASTRONOMY, as in an annular eclipse), or a normalized aspect score. Two sign names are written in Devanagari where the library itself hardcodes them, because with `?lang=hi` the wheel labels come back in Devanagari and the chip has to agree.
 *
 * **Five values carry a correction, three of them for one reason: a catalogue value must not contradict the API value printed on the same card.**
 *
 * **`सौम्य` / `कठिन` / `तटस्थ` replaced `शुभ` / `अशुभ` / `सम` for the aspect classes.** `शुभ` and `अशुभ` are the Jyotisha BENEFIC and MALEFIC classification of a planet, so a Hindi reader saw `अशुभ` on a square and understood that a malefic was involved rather than that the angle is ninety degrees; this library computes the angle and knows nothing about benefic nature. `सम` is the ग्रह-मैत्री scheme, a third unrelated axis. Verified live against `/astrology/natal-chart?lang=hi`, whose own aspect summary names the same three classes: the legend and the prose beneath it were using different words for one thing.
 *
 * **`दृष्टि संरचनाएँ`, not `कुंडली के योग`, for the aspect figures.** `कुंडली के योग` is the standard heading for NAMED VEDIC YOGAS, which carry life verdicts our five geometric figures assert nothing about. **The obvious replacement is worse:** `आकृति योग` is the Nabhasa shape-yoga family, so it would claim a different detection entirely, and `त्रिकोण` is the Jyotisha trine HOUSES. Hindi-language Western astrology names these figures not at all. `संरचना` is our API's own noun for an aspect figure, so the card and the interpretation under it now use one word. **It is our coinage, not an attested Hindi term.**
 *
 * `स्थानांतरित जन्म कुंडली` replaced `स्थान परिवर्तन कुंडली`, which collided twice: `स्थान परिवर्तन योग` is a real Jyotisha yoga (exchange of house lordships), and in plain Hindi `स्थान परिवर्तन` is the ACT of moving house, so the old string read as a muhurta chart for choosing a moving date rather than the natal chart recast for a new place. Also our coinage.
 *
 * `{{percent}}% निकट` replaced `{{percent}}% सटीक`. `सटीक` means ACCURATE. On a product whose positioning is verified accuracy, a chip reading `82% सटीक` invites the reading that the interpretation is 82 percent accurate.
 *
 * `अवधि` replaced `समय` for the timing paragraph, the same CONTRACT error corrected in five sibling locales: the field is how long the transit lasts, not when it happens, and `समय` is simply `time`. First-party evidence rather than a translation: the API's own Hindi values for this field already use `अवधि`.
 *
 * `राशि से बाहर` replaced `भिन्न राशि` for the dissociate chip so the chip and the sentence explaining it use one phrase. That sentence lost two words in the same edit: `योग`, which had to go with the heading, and `भाव`, which was meant as theme but is this file's word for HOUSE on eight other strings and so read as `the house remains`.
 *
 * **`दोनों भाव संख्याएँ ... चंद्र राशि से नहीं` is the most load-bearing string in this file and must never be shortened.** `गोचर भाव` would otherwise be read with the standard Jyotisha transit convention, which counts houses from the natal MOON. This component counts from the natal house cusps, so the sentence rules the other convention out by name.
 *
 * **The elements and modalities are the best-sourced entries in this file.** चर / स्थिर / द्विस्वभाव map onto cardinal / fixed / mutable sign for sign. The five-tattva problem does not bite: the rashi division is fourfold in every source. `चर` and `स्थिर` are already as short as the words get, so they are not abbreviated at all; `द्विस्व` cuts on a clean akshara boundary and never splits a matra. The abbreviations are ours.
 *
 * **`प्रमुख गुण` was examined and deliberately NOT changed.** Every Hindi authority names this axis `स्वभाव` or `प्रकृति`, never `गुण`, and `गुण` in a kundli context pulls the 36-गुण matching score. But our own API uses `गुण` for exactly this axis, and changing one surface alone recreates the contradiction the three fixes above just removed. **Move both surfaces to `स्वभाव` in one pass or leave both; do not touch this file alone.**
 *
 * **`ऑर्ब` was examined and kept.** It is a bare transliteration that means little to a Hindi reader, and the honest alternative, `अंश अंतर`, is equally unattested. A transliterated loanword is a legitimate strategy for a Western technical term Jyotisha does not model, and it is what `tr.ts` does with `orb` on sourced grounds. Revisit with a practitioner, not with another coinage.
 *
 * **Twelve entries in this file are unattested, not five:** `दृष्टि संरचनाएँ`, `स्थानांतरित जन्म कुंडली`, `{{percent}}% निकट`, `राशि से बाहर`, `ऑर्ब`, `शीर्ष`, `निकट आती` / `दूर जाती`, `दोहरा चक्र`, `वलय`, `भाव संधि`, `कुंडली चक्र`, and the three cross-tab abbreviations. One carries a specific question for the practitioner: whether a bare `शीर्ष` pulls the `शीर्षोदय` sign classification.
 *
 * ## Human Design
 *
 * **The 54 entries below are governed by a DIFFERENT rule from everything above them, and the difference is the whole point.** The rule above is that the settled Sanskrit-derived word wins wherever the concept exists in both traditions, because a Western natal chart and a Jyotisha chart genuinely model the same objects. Human Design is a 1987 Western synthesis and Jyotisha does not model ANY of it, so there is nothing to reach for and reaching anyway is how the file breaks. The Hindi corpus here is not thin, it is absent. **Do not read that as a failed search and go looking for Jyotisha cover.**
 *
 * **The binding source for these entries is FIRST-PARTY: the Hindi the Human Design endpoints themselves return for the same concepts.** These labels print directly above those values, so a label naming a different concept from the value beneath it makes the card contradict itself. Matched from it, verbatim: `प्रकार`, `रणनीति`, `प्राधिकार`, `प्रोफाइल`, `परिभाषा` (the HD sense, NOT a dictionary definition), `आभामंडल`, `अवतार-क्रॉस`, `पर्सनैलिटी` / `डिज़ाइन` for the two chart sides, `बॉडीग्राफ`, `केंद्र`, `चैनल`, `गेट`, `मोटर`, `जागरूकता`, `सक्रियण`, `परिभाषित` / `खुला`, `रेखा`, `वेरिएबल`, `कलर` and `टोन`. **Where the API ships a word, this file does not invent a better one.**
 *
 * **The transliterations are the CORRECT answer here, not a shortcut.** Our API already writes `मैनिफेस्टर`, `प्रोजेक्टर`, `सेक्रल`, `आज्ञा`, `सोलर प्लेक्सस`, `गेट`, `चैनल` and `त्रिग्राम`, so a Devanagari loanword is this system's established register in our own product. `सर्किट` follows for the same reason: `गेट` and `चैनल` are transliterated on both sides of it, and `परिपथ` would be the only Sanskrit-derived member of a triad.
 *
 * **`षट्कोण` was REJECTED for the I Ching hexagram and this is the sharpest call in the block, because our OWN I Ching locale ships it.** Two independent dictionaries gloss `षट्कोण` as a hexagon, a six-angled yantra, and **a Jyotisha house name, the sixth house from the ascendant**. On a card that already prints `भाव` for house on eight strings, `षट्कोण 51` invites a Hindi reader to read the sixth house, and the English word never carried that. `हेक्साग्राम` is used instead: it carries the SAME polysemy the English source carries, which the qualifier `आई चिंग` resolves in the label just as it does in English. **The API is the surface that is wrong here, not this file. Filed for the API, do not "align" this entry backwards.**
 *
 * **Three more Jyotisha or Indic words were considered and refused.** `अनात्म` for Not-self is the philosophical doctrine denying the existence of the soul, which is a metaphysical position and not a conditioning theme, so it is the exact class of defect the `शुभ` / `अशुभ` aspect labels were. `परिपथ` for circuit, above. `आधार` for the PHS Base, rejected only for consistency: its two siblings `कलर` and `टोन` are already transliterated, so a mixed row would read as three unrelated things.
 *
 * **`रंग` and `कलर` are deliberately two different words for two different things and must not be unified.** `कलर` is the PHS Variables layer, a number 1 to 6 with a keynote, never a colour on screen. `रंग` is the actual paint in the bodygraph legend and the long chart description. Same split as the English, which the reader cannot see because English reuses one word.
 *
 * **`रेखा` for a Human Design line does not collide with anything in this file, and the collision to watch is elsewhere.** `पंक्ति` is already this file's word for a TABLE ROW, which is why the HD line is not that; `दृष्टि रेखाएँ` in the natal chart description is aspect lines, an overlap English has too. Both the API's HD locale and its I Ching locale use `रेखा` for a line of a figure, so this is the settled word on three surfaces.
 *
 * **Six of the 54 have no attested Hindi Human Design tradition and want a bilingual practitioner**, and this is a property of the concepts, not of the search: `सिग्नेचर`, `नॉट-सेल्फ` (and `नॉट-सेल्फ प्रश्न`), `आई चिंग हेक्साग्राम`, `सर्किट`, `बेस`, and `जीव विज्ञान`. The first two carry a named risk rather than a vague one: the Hindi words for a WRITTEN signature cover both candidates, so both denote the same wrong thing, and `सिग्नेचर` was chosen only because a marked loanword reads as a term of art while a Devanagari-native `हस्ताक्षर` asserts the everyday meaning with confidence. That is the failure mode where a reader understands something else correctly, and it is the single entry in this block most likely to be wrong.
 *
 * ## Monthly ephemeris
 *
 * **`ग्रह स्थिति` is what Hindi astrology prints over exactly this table, and it beats the loanword.** The transliterated `एफेमेरिस` exists and was rejected, because the material carrying it spells the same word two ways, which is not a term a catalogue can stand on. `पंचांग` was rejected outright: it names the five-limb almanac, not a longitude table, and conflating the two is the exact error this component would be accused of.
 *
 * **`राशि परिवर्तन` for a sign change, not `गोचर`.** Hindi uses `गोचर` for both the event AND the whole residency reading, so it is ambiguous in the one slot where the ambiguity costs something. `वक्री` is the retrograde word a Hindi reader actually carries, and `अवधि` is the period noun.
 *
 * **The ingress string is NOMINAL on purpose.** Hindi astrology writing treats a planet as an honorific and inflects the verb for it, so any verb form forces an agreement decision the UI cannot make from a substituted name. The nominal form takes a bare sign name in front of `राशि` and is what published ingress calendars use.
 *
 * **`दिनांक`, never `तिथि`, and this is the dangerous one.** In a panchang or ephemeris context `तिथि` is the LUNAR day, so a Gregorian date column headed `तिथि` would be read as Dwadashi.
 *
 * The empty state and the table caption are COMPOSED rather than lifted; no astrology page publishes either. Sanskrit register was kept out of both: `निरयण`, `सायन`, `रेखांश` and `स्पष्ट` are correct panchang vocabulary and wrong for a widget a lay reader opens.
 *
 * ## Form group names
 *
 * **`प्रथम` and `द्वितीय`, NOT `पहला` and `दूसरा`, and the reason is the postposition that follows them.** These names are interpolated into `{{group}} का स्थान`, and `पहला` is an आकारांत adjective that must shift to the oblique `पहले` in front of `का`, so `पहला व्यक्ति का स्थान` is simply ungrammatical. The tatsam ordinals never decline, so one stored value is correct both as a bare legend and inside the genitive.
 *
 * **`व्यक्ति क` and `व्यक्ति ख` follow Indian legal drafting, which is where Hindi actually renders English placeholder letters.** The statutory Hindi illustrations run `क`, `ख`, `ग` for A, B, C. A letter-by-letter guess at the English sound is neither the vowel series nor the consonant list-marker series, and is rejected here.
 *
 * `जन्म` is bare for the relocation birth block, matching how this file already builds `जन्म स्थान` and `जन्म कुंडली`, and `गंतव्य` is the standard Hindi destination noun. `स्थानांतरण` was rejected for rendering `स्थानांतरण का स्थान`, which says स्थान twice in three words. **`जन्म कुंडली का स्थान` is correct**: `का` agrees with the possessed noun `स्थान`, never with the feminine `कुंडली`, so the natal chart group reuses the shipped card heading with no inflection problem.
 *
 * `क्षेत्रवार भार` is the weakest entry here. Both halves are ordinary statistical Hindi, but no Hindi source publishes a domain-weighted forecast at all, so the compound rests on our own prior usage rather than on an authority.
 */

import type { ChromeString } from '../i18n/chrome-strings.js';
import { registerLocale } from '../i18n/registry.js';
import './field-labels/hi.js';

export const hi: Record<ChromeString, string> = {
	'Edit query': 'विवरण संपादित करें',
	'Spiritual data by RoxyAPI': 'RoxyAPI द्वारा आध्यात्मिक डेटा',
	'No data': 'कोई डेटा नहीं है',
	Loading: 'लोड हो रहा है',
	Reading: 'फलादेश',

	'Natal chart': 'जन्म कुंडली',
	'Relocation chart': 'स्थानांतरित जन्म कुंडली',
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
	'{{percent}} tight': '{{percent}} निकट',
	apex: 'शीर्ष',

	'Planet readings': 'ग्रह फलादेश',

	Transits: 'गोचर',
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

	Ephemeris: 'ग्रह स्थिति',
	'Signs in this month': 'इस माह की राशियाँ',
	'Sign changes and retrograde periods': 'राशि परिवर्तन और वक्री अवधि',
	'Daily positions': 'दैनिक ग्रह स्थिति',
	Date: 'दिनांक',
	'Enters {{sign}} on {{date}}': '{{date}} को {{sign}} राशि में प्रवेश',
	'Retrograde {{range}}': 'वक्री {{range}}',
	'Every body with its position on each day of the month, as a zodiac sign and a degree.':
		'हर ग्रह की महीने के हर दिन की स्थिति, राशि और अंश में।',

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

	'Personality line': 'पर्सनैलिटी रेखा',
	'Design line': 'डिज़ाइन रेखा',
	Lines: 'रेखाएँ',

	Variables: 'वेरिएबल',
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

	// The FORM path (`<roxy-endpoint-form>` and the `<roxy-location-search>` it slots). What a
	// visitor reads BEFORE any card renders. Field labels and enum options are `humanize()` over
	// spec field names and are deliberately absent: no catalogue keyed on English source text can
	// reach a string computed per operation. The GROUP names below are the exception, because the
	// spec has nine of them rather than 909.
	'Birth location': 'जन्म स्थान',
	'{{group}} location': '{{group}} का स्थान',
	'City of birth': 'जन्म शहर',
	'{{group}} city': '{{group}} का शहर',
	'Person 1': 'प्रथम व्यक्ति',
	'Person 2': 'द्वितीय व्यक्ति',
	'Person A': 'व्यक्ति क',
	'Person B': 'व्यक्ति ख',
	'Birth Data': 'जन्म विवरण',
	Birth: 'जन्म',
	Relocation: 'गंतव्य',
	'Domain Weights': 'क्षेत्रवार भार',
	'Fills {{fields}}. Pick a city to autofill.':
		'यह {{fields}} भरता है। अपने आप भरने के लिए शहर चुनें।',
	Choose: 'चुनें',
	'Comma separated': 'कॉमा लगाकर अलग करें',
	Advanced: 'उन्नत',
	'Please complete:': 'कृपया भरें:',
	'Search city': 'शहर खोजें',
	'No cities found': 'कोई शहर नहीं मिला',
	Compare: 'मिलान करें',
	Cast: 'निकालें',
	'Get reading': 'फलादेश देखें',
	Generate: 'बनाएं',
	'Schema load failed: {{message}}': 'स्कीमा लोड नहीं हो सका: {{message}}',
	'Endpoint {{method}} {{path}} not found in OpenAPI spec':
		'OpenAPI स्पेक में एंडपॉइंट {{method}} {{path}} नहीं मिला',
	'HTTP error {{status}}': 'HTTP त्रुटि {{status}}',
	Retry: 'फिर से कोशिश करें',
	'Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side.':
		'क्लाइंट-साइड कंपोनेंट केवल pk_ प्रकाशन योग्य कुंजी स्वीकार करते हैं। ओरिजिन अनुमति सूची वाली pk_ कुंजी का उपयोग करें, या सर्वर पर रेंडर करें।',
	Severity: 'तीव्रता',
	Remedies: 'उपाय',
	Exceptions: 'अपवाद',
	'Dream symbol': 'स्वप्न प्रतीक',
	'Dream symbols': 'स्वप्न प्रतीक',
	'{{count}} matches': 'परिणाम: {{count}}',
	Hora: 'होरा',
	'Hora periods': 'होरा मुहूर्त',
	'Vedic kundli': 'वैदिक कुंडली',
	'Vedic birth chart with twelve sign houses':
		'बारह राशि भावों वाली वैदिक जन्म कुंडली',
	'Angel number': 'एंजल नंबर',
	'Digit root': 'अंक मूल',
	'Action steps': 'कार्य चरण',
	Colors: 'रंग',
	Keywords: 'मुख्य शब्द',
	'Pairs with': 'साथ में',
	Vargottama: 'वर्गोत्तम',
	'Vargottama planets': 'वर्गोत्तम ग्रह',
	'{{chart}} divisional chart with twelve sign houses':
		'बारह राशि भावों वाली {{chart}} वर्ग कुंडली',
	'Sidereal frame: {{frame}}': 'निरयण पद्धति: {{frame}}',
	'Sidereal frame: {{frame}}, {{degrees}}° subtracted':
		'निरयण पद्धति: {{frame}}, {{degrees}}° घटाया गया',
	Day: 'दिन',
	Night: 'रात',
	Planet: 'ग्रह',
	Hardness: 'कठोरता',
	Vibration: 'कंपन',
	Birthstone: 'जन्म रत्न',
	Chakras: 'चक्र',
	Zodiac: 'राशि',
	Elements: 'तत्व',
	Spiritual: 'आध्यात्मिक',
	Emotional: 'भावनात्मक',
	Physical: 'शारीरिक',
	Master: 'मास्टर',
	'Master number': 'मास्टर संख्या',
	'Birth day profile': 'जन्मदिन प्रोफ़ाइल',
	'Lucky associations': 'शुभ संबंध',
	Missing: 'अनुपस्थित',
	'No numbers are missing from the birth name.':
		'जन्म नाम से कोई संख्या अनुपस्थित नहीं है।',
	'How to overcome': 'इसे कैसे पार करें',
	'Karmic lessons': 'कर्म पाठ',
	Debt: 'ऋण',
	Challenge: 'चुनौती',
	Resolution: 'समाधान',
	'Karmic debt': 'कर्म ऋण',
	'Personal year': 'व्यक्तिगत वर्ष',
	Pinnacles: 'शिखर',
	Lesson: 'पाठ',
	Challenges: 'चुनौतियाँ',
	'Name numbers': 'नाम संख्याएँ',
	'Name letters': 'नाम के अक्षर',
	'Personal month': 'व्यक्तिगत माह',
	'Calendar month': 'कैलेंडर माह',
	Maturity: 'परिपक्वता',
	'Current age': 'वर्तमान आयु',
	Activates: 'सक्रिय करता है',
	Element: 'तत्व',
	'Ruling planet': 'स्वामी ग्रह',
	Gemstones: 'रत्न',
	Compatible: 'अनुकूल',
	Incompatible: 'प्रतिकूल',
	'Life Path': 'जीवन पथ',
	Expression: 'अभिव्यक्ति संख्या',
	'Soul Urge': 'आत्मा प्रेरणा',
	'Birth Day': 'जन्मदिन संख्या',
	'Daily Number': 'दैनिक संख्या',
	'Personal Day': 'व्यक्तिगत दिन',
	'Numerology chart': 'अंक ज्योतिष चार्ट',
	Panchang: 'पंचांग',
	'Auspicious muhurtas': 'शुभ मुहूर्त',
	'Inauspicious periods': 'अशुभ काल',
	'Next transitions': 'अगले संक्रमण',
	'None today': 'आज कोई नहीं',
	'Bhadra (Vishti)': 'भद्रा (विष्टि)',
	Panchaka: 'पंचक',
	'Favorable Moon signs': 'अनुकूल चंद्र राशियाँ',
	'Favorable birth nakshatras': 'अनुकूल जन्म नक्षत्र',
	'Unfavorable birth nakshatras': 'प्रतिकूल जन्म नक्षत्र',
	'Chandrabalam and Tarabalam': 'चंद्रबल और ताराबल',
	None: 'कोई नहीं',
	'Moon sign': 'चंद्र राशि',
	'Sun sign': 'सूर्य राशि',
	'Sun nakshatra': 'सूर्य नक्षत्र',
	'Amrit Kalam': 'अमृत काल',
	'Dur Muhurta': 'दुर्मुहूर्त',
	Varjyam: 'वर्ज्य',
	Sunrise: 'सूर्योदय',
	Sunset: 'सूर्यास्त',
	Moonrise: 'चंद्रोदय',
	Moonset: 'चंद्रास्त',
	Sun: 'सूर्य',
	Moon: 'चंद्रमा',
	'Ashtama Chandra rashi': 'अष्टम चंद्र राशि',
	'{{sign}} until {{time}}': '{{sign}} {{time}} तक',
	'{{sign}} until {{time}}, then {{next}}':
		'{{sign}} {{time}} तक, फिर {{next}}',
	'{{range}} (ends {{date}})': '{{range}} ({{date}} को समाप्त)',
	Tithi: 'तिथि',
	Nakshatra: 'नक्षत्र',
	Yoga: 'योग',
	Karana: 'करण',
	'ends {{time}}': '{{time}} पर समाप्त',
	'ends {{time}} to {{next}}': '{{time}} पर समाप्त, फिर {{next}}',
	'ends {{time}} to {{next}} pada {{pada}}':
		'{{time}} पर समाप्त, फिर {{next}} पाद {{pada}}',
	Strengths: 'शक्तियाँ',
	'Key aspects': 'मुख्य दृष्टियाँ',
	'Aspect breakdown': 'दृष्टि संतुलन',
	'Element balance': 'तत्व संतुलन',
	'Forecast digest': 'पूर्वानुमान सारांश',
	'No notable events.': 'कोई उल्लेखनीय घटना नहीं।',
	'{{count}} events': '{{count}} घटनाएँ',
	'significance {{value}} of 100': 'महत्व {{value}} में से 100',
	'I Ching hexagram': 'आई चिंग हेक्साग्राम',
	Position: 'स्थिति',
	House: 'भाव',
	Motion: 'गति',
	Formula: 'सूत्र',
	'°/day': '°/दिन',
	'Tarot spread': 'टैरो प्रसार',
	'(reversed)': '(उल्टा)',
	'{{arcana}} arcana': '{{arcana}} अर्चना',
	Upper: 'ऊपरी',
	Lower: 'निचला',
	'Changing lines: {{lines}}.': 'परिवर्तनशील रेखाएँ: {{lines}}।',
	'Becomes hexagram {{number}} {{name}}.':
		'हेक्साग्राम {{number}} {{name}} बनता है।',
	'{{chakra}} chakra crystals': '{{chakra}} चक्र क्रिस्टल',
	'{{element}} element crystals': '{{element}} तत्व क्रिस्टल',
	'Crystals for {{sign}}': '{{sign}} के लिए क्रिस्टल',
	'{{month}} birthstones': '{{month}} के जन्म रत्न',
	Crystals: 'क्रिस्टल',
	'Forecast timeline': 'पूर्वानुमान समयरेखा',
	'No events in this window': 'इस अवधि में कोई घटना नहीं',
	'orb {{value}}°': 'ऑर्ब {{value}}°',
	'Guna Milan score': 'गुण मिलान अंक',
	Koota: 'कूट',
	Progress: 'प्रगति',
	Score: 'अंक',
	'{{dosha}} cancelled': '{{dosha}} निरस्त',
	'Moon phase calendar': 'चंद्र कला कैलेंडर',
	'Current moon phase': 'वर्तमान चंद्र कला',
	Illumination: 'प्रकाशित भाग',
	Age: 'आयु',
	Sign: 'राशि',
	Distance: 'दूरी',
	'{{count}} days': '{{count}} दिन',
	'{{value}}k km': '{{value}} हज़ार किमी',
	'Annual profection': 'वार्षिक प्रोफेक्शन',
	For: 'के लिए',
	'Lord of the year': 'वर्ष का स्वामी',
	'What changes at this location': 'इस स्थान पर क्या बदलता है',
	'Angular planets here': 'यहाँ केंद्र में ग्रह',
	'Planets that change house': 'भाव बदलने वाले ग्रह',
	'No planet changes house at this location.':
		'इस स्थान पर कोई ग्रह भाव नहीं बदलता।',
	'Guna Milan breakdown: each koota with the classification of person 1 and person 2, and the score it earned out of its maximum.':
		'गुण मिलान विवरण: प्रत्येक कूट के साथ व्यक्ति 1 और व्यक्ति 2 का वर्गीकरण और अधिकतम में से प्राप्त अंक।',
	'{{sign}} · house {{house}}': '{{sign}} · भाव {{house}}',
	'{{planet}}: house {{from}} to {{to}}': '{{planet}}: भाव {{from}} से {{to}}',
	ASC: 'ASC',
	DSC: 'DSC',
	MC: 'MC',
	IC: 'IC',
	PoF: 'भाग्य',
	Vtx: 'Vtx',
	'Kundli style': 'कुंडली शैली',
	North: 'उत्तर',
	South: 'दक्षिण',
	East: 'पूर्व',
	'in {{sign}}': '{{sign}} में',
	'pada {{n}}': 'पाद {{n}}',
	Vara: 'वार',
	'Tarot card': 'टैरो कार्ड',
	Upright: 'सीधा',
	Reversed: 'उल्टा',
	'Card orientation': 'कार्ड की स्थिति',
	Cornerstone: 'आधार अक्षर',
	Capstone: 'अंतिम अक्षर',
	'First vowel': 'पहला स्वर',
	'Core numbers': 'मूल संख्याएँ',
	Lessons: 'पाठ',
	Debts: 'ऋण',
	'Life phases': 'जीवन चरण',
	'Obstacle periods': 'बाधा काल',
	'Letter analysis': 'अक्षर विश्लेषण',
	Opportunities: 'अवसर',
	Asteroids: 'क्षुद्रग्रह',
	Houses: 'भाव',
	'Black Moon Lilith': 'ब्लैक मून लिलिथ',
	'{{variant}} apogee': '{{variant}} अपभू',
	'Solar arc directions': 'सौर चाप दिशाएँ',
	Arc: 'चाप',
	'Directed to': 'दिशांकन तिथि',
	'Arabic lots': 'अरबी अंश',
	Sect: 'पक्ष',
	Ascendant: 'लग्न',
	Midheaven: 'मध्य आकाश',
	'Secondary progressions': 'द्वितीयक प्रगति',
	'Progressed to': 'प्रगति तिथि',
	Elapsed: 'बीता समय',
	'{{years}} yrs': '{{years}} वर्ष',
	Biblical: 'बाइबिल अर्थ',
	Shadow: 'छाया',
	Readings: 'व्याख्याएँ',
	Advisories: 'सलाह',
	'Sign compatibility': 'राशि अनुकूलता',
	Breakdown: 'विस्तृत विवरण',
	'Changing lines': 'परिवर्तनशील रेखाएँ',
	Dynamics: 'गतिकी',
	Love: 'प्रेम',
	Career: 'करियर',
	Money: 'धन',
	'Twin flame': 'ट्विन फ्लेम',
	'Western planetary positions': 'पाश्चात्य ग्रह स्थितियाँ',
	'Planetary positions': 'ग्रह स्थितियाँ',
	'Western planetary positions: each body with its sign, degree, house and motion.':
		'पाश्चात्य ग्रह स्थितियाँ: प्रत्येक पिंड की राशि, अंश, भाव और गति।',
	Degree: 'अंश',
	'Vedic aspects': 'वैदिक दृष्टियाँ',
	'Chart time {{when}}': 'कुंडली समय {{when}}',
	'Sidereal positions': 'निरयण स्थितियाँ',
	'Mutual aspects': 'परस्पर दृष्टियाँ',
	'Vedic planetary aspects: aspecting planet, aspect type, aspected planet, strength and orb.':
		'वैदिक ग्रह दृष्टियाँ: दृष्टि देने वाला ग्रह, दृष्टि प्रकार, दृष्ट ग्रह, बल और ऑर्ब।',
	From: 'से',
	Aspect: 'दृष्टि',
	To: 'को',
	Strength: 'बल',
	Orb: 'ऑर्ब',
	'Upagraha positions': 'उपग्रह स्थितियाँ',
	Upagrahas: 'उपग्रह',
	Upagraha: 'उपग्रह',
	'{{group}} upagrahas: each sub-planet with its rashi, degree in sign, sidereal longitude, and nakshatra with pada.':
		'{{group}} उपग्रह: प्रत्येक उपग्रह की राशि, राशि में अंश, निरयण देशांतर, और पाद सहित नक्षत्र।',
	'Time based': 'काल आधारित',
	'From the eightfold division of the day or night, so these depend on the birth time, the place and the weekday.':
		'दिन या रात के आठ भागों से निकले, इसलिए ये जन्म समय, स्थान और वार पर निर्भर हैं।',
	'Sun based': 'सूर्य आधारित',
	'The Dhuma group, derived by fixed arc from the Sun. Dhuma is the Sun plus 133 degrees 20 minutes, and each of the rest follows from the one before it.':
		'धूमा समूह, सूर्य से स्थिर चाप द्वारा व्युत्पन्न। धूमा सूर्य में 133 अंश 20 कला जोड़कर मिलता है, और शेष प्रत्येक पिछले से निकलता है।',
	Rashi: 'राशि',
	Longitude: 'देशांतर',
	Pada: 'पाद',
	'Nakshatra {{name}}': 'नक्षत्र {{name}}',
	'Nakshatra {{number}} of 27': '27 में से नक्षत्र {{number}}',
	Lord: 'स्वामी',
	Deity: 'देवता',
	Symbol: 'प्रतीक',
	Characteristics: 'विशेषताएँ',
	'Mantras:': 'मंत्र:',
	'Gemstones:': 'रत्न:',
	'Rituals:': 'अनुष्ठान:',
	N: 'उ',
	NE: 'उ-पू',
	E: 'पू',
	SE: 'द-पू',
	S: 'द',
	SW: 'द-प',
	W: 'प',
	NW: 'उ-प',
	'Local space': 'स्थानीय दिशा',
	'Local space compass': 'स्थानीय दिशा कम्पास',
	'Local space compass of planetary directions from the birthplace':
		'जन्म स्थान से ग्रह दिशाओं का स्थानीय कम्पास',
	'A compass centered on the birthplace. Each body is a line pointing to its azimuth, clockwise from north. Bodies below the horizon are dimmed.':
		'जन्म स्थान पर केंद्रित कम्पास। प्रत्येक पिंड उत्तर से घड़ी की दिशा में अपने दिगंश की ओर एक रेखा है। क्षितिज से नीचे के पिंड धुंधले हैं।',
	'Local space directions: each body with its compass direction, azimuth, altitude and whether it sits above or below the horizon.':
		'स्थानीय दिशाएँ: प्रत्येक पिंड की कम्पास दिशा, दिगंश, उन्नतांश, और वह क्षितिज से ऊपर है या नीचे।',
	'{{planet}} {{direction}} {{azimuth}}° altitude {{altitude}}':
		'{{planet}} {{direction}} {{azimuth}}° उन्नतांश {{altitude}}',
	Azimuth: 'दिगंश',
	Altitude: 'उन्नतांश',
	Horizon: 'क्षितिज',
	Astrocartography: 'ज्योतिष मानचित्रण',
	'Astrocartography world map': 'ज्योतिष मानचित्रण विश्व मानचित्र',
	'World map of planetary astrocartography lines':
		'ग्रह ज्योतिष रेखाओं का विश्व मानचित्र',
	'Equirectangular world map. Each body has a Midheaven and Imum Coeli meridian and a curved Ascendant and Descendant line, colored per body.':
		'समआयत विश्व मानचित्र। प्रत्येक पिंड की मध्य आकाश और पाताल याम्योत्तर तथा वक्र लग्न और अस्त रेखा है, पिंड अनुसार रंगीन।',
	Birthplace: 'जन्म स्थान',
	'{{planet}} {{angle}} line': '{{planet}} {{angle}} रेखा',
	'Solid lines are the Ascendant and Midheaven, dashed are the Descendant and IC.':
		'ठोस रेखाएँ लग्न और मध्य आकाश हैं, बिंदुदार अस्त और पाताल हैं।',
	'Planetary lines': 'ग्रह रेखाएँ',
	Choghadiya: 'चौघड़िया',
	'Day muhurta periods': 'दिन के मुहूर्त',
	'Daytime choghadiya': 'दिन का चौघड़िया',
	'No daytime periods': 'दिन के लिए कोई अवधि नहीं',
	'Night muhurta periods': 'रात के मुहूर्त',
	'Nighttime choghadiya': 'रात का चौघड़िया',
	'No nighttime periods': 'रात के लिए कोई अवधि नहीं',
	Now: 'अभी',
	'Time range': 'समय अवधि',
	'Impact:': 'प्रभाव:',
	'Timing:': 'अवधि:',
	'Guidance:': 'सलाह:',
	'Chara karakas': 'चर कारक',
	Atmakaraka: 'आत्मकारक',
	Darakaraka: 'दाराकारक',
	'Chara karakas in descending rank: each office, the graha holding it, its rashi, the degree it holds, the degree that earned the office, and what the office is read for.':
		'अवरोही क्रम में चर कारक: प्रत्येक पद, उसे धारण करने वाला ग्रह, उसकी राशि, धारित अंश, पद दिलाने वाला अंश, और पद किसके लिए पढ़ा जाता है।',
	Office: 'पद',
	Graha: 'ग्रह',
	'Ranked on': 'क्रम आधार',
	'Read for': 'किसके लिए',
	'measured from the end of the sign': 'राशि के अंत से मापा गया',
	'Heliacal visibility': 'उदय अस्त दृश्यता',
	'Heliacal rising and setting': 'हेलियाकल उदय और अस्त',
	'Whether each graha stands far enough from the Sun to be seen, for {{date}}. The Sun and the nodes never appear here: they have no heliacal event.':
		'क्या प्रत्येक ग्रह दिखने के लिए सूर्य से पर्याप्त दूर है, {{date}} के लिए। सूर्य और छाया ग्रह यहाँ कभी नहीं आते: उनका कोई उदय अस्त नहीं होता।',
	Visible: 'दृश्य',
	Invisible: 'अदृश्य',
	rises: 'उदय हो',
	sets: 'अस्त हो',
	Rose: 'उदय हुआ',
	Set: 'अस्त हुआ',
	'in the east': 'पूर्व में',
	'in the west': 'पश्चिम में',
	'Visible until it {{event}} {{where}} on {{when}}':
		'{{when}} को {{where}} {{event}} जाने तक दृश्य',
	'Invisible until it {{event}} {{where}} on {{when}}':
		'{{when}} को {{where}} {{event}} जाने तक अदृश्य',
	'{{event}} {{where}} on {{when}}, with no further event inside the search window':
		'{{when}} को {{where}} {{event}}, खोज अवधि में आगे कोई घटना नहीं',
	'No rising or setting inside the search window, which is normal for a graha far from the Sun':
		'खोज अवधि में कोई उदय या अस्त नहीं, जो सूर्य से दूर ग्रह के लिए सामान्य है',
	'{{degrees}}° of time from the Sun against a limit of {{limit}}°':
		'सूर्य से {{degrees}}° काल, सीमा {{limit}}° के सापेक्ष',
	'{{degrees}}° of time from the Sun against a limit of {{limit}}°, becoming {{shifted}}° at that event':
		'सूर्य से {{degrees}}° काल, सीमा {{limit}}°, जो उस घटना पर {{shifted}}° हो जाती है',
	'a morning graha, read before sunrise': 'प्रातः ग्रह, सूर्योदय से पहले पढ़ा जाता है',
	'an evening graha, read after sunset': 'सायं ग्रह, सूर्यास्त के बाद पढ़ा जाता है',
	Aspects: 'दृष्टियाँ',
	'Aspect list': 'दृष्टि सूची',
	'Aspect summary': 'दृष्टि सारांश',
	Patterns: 'विन्यास',
	'{{status}} · orb {{orb}}° · str {{strength}}':
		'{{status}} · ऑर्ब {{orb}}° · बल {{strength}}',
	'Number analysis': 'संख्या विश्लेषण',
	'{{count}} digits': '{{count}} अंक',
	'{{count}} unique': '{{count}} अद्वितीय',
	'Digit root {{n}}': 'अंक मूल {{n}}',
	Palindrome: 'पैलिंड्रोम',
	Repeating: 'पुनरावृत्त',
	'Positive energy': 'सकारात्मक ऊर्जा',
	'Neutral energy': 'तटस्थ ऊर्जा',
	'Cautionary energy': 'सचेत करने वाली ऊर्जा',
	'Where you saw it': 'आपने इसे कहाँ देखा',
	'Known angel number': 'ज्ञात एंजल नंबर',
	'What to do next': 'आगे क्या करें',
	'Foundational digit root': 'आधारभूत अंक मूल',
	'Foundational digit root ({{n}})': 'आधारभूत अंक मूल ({{n}})',
	'Aspect patterns': 'दृष्टि विन्यास',
	Above: 'क्षितिज के ऊपर',
	Below: 'क्षितिज के नीचे',
	Active: 'सक्रिय',
	'Not yet active': 'अभी सक्रिय नहीं',
	Present: 'उपस्थित',
	Absent: 'अनुपस्थित',
	'Current phase': 'वर्तमान चरण',
	'Not compatible': 'अनुकूल नहीं',
	'Ascendant moves to {{sign}}': 'लग्न {{sign}} में जाता है',
	'Ascendant stays in {{sign}}': 'लग्न {{sign}} में ही रहता है',
	'Ascendant changes sign': 'लग्न राशि बदलता है',
	'Ascendant keeps its sign': 'लग्न अपनी राशि रखता है',
	'Bhav Chalit': 'भाव चलित',
	'No graha changes house. The Rashi chart and the Chalit chart agree, which is a normal result rather than a missing reading.':
		'कोई ग्रह भाव नहीं बदलता। राशि चक्र और चलित चक्र सहमत हैं, यह सामान्य परिणाम है, कोई छूटा हुआ फल नहीं।',
	'{{count}} of {{total}} grahas change house between the Rashi chart and the unequal Sripati cusps.':
		'{{total}} में से {{count}} ग्रह राशि चक्र और असमान श्रीपति संधियों के बीच भाव बदलते हैं।',
	'house {{from}} in the Rashi chart, house {{to}} here':
		'राशि चक्र में भाव {{from}}, यहाँ भाव {{to}}',
	'Bhava cusps and occupants': 'भाव संधि और स्थित ग्रह',
	Bhava: 'भाव',
	Start: 'आरंभ',
	Madhya: 'मध्य',
	End: 'अंत',
	Span: 'विस्तार',
	Grahas: 'ग्रह',
	'Fixed stars': 'स्थिर तारे',
	'Conjunctions to the chart': 'कुंडली से युति',
	'{{point}} conjunct {{star}}': '{{point}} की {{star}} से युति',
	'No star sits within the orb of a natal point.':
		'कोई तारा जन्म बिंदु के ओर्ब के भीतर नहीं है।',
	'Star catalog ({{count}})': 'तारा सूची ({{count}})',
	'Precessed positions for the chart date':
		'कुंडली तिथि के लिए अयन-संशोधित स्थितियाँ',
	Star: 'तारा',
	Mag: 'कांति',
	Nature: 'प्रकृति',
	Bhavadhipati: 'भावाधिपति',
	Dig: 'दिग्',
	Drishti: 'दृष्टि',
	Sthana: 'स्थान',
	Kala: 'काल',
	Chesta: 'चेष्टा',
	Naisargika: 'नैसर्गिक',
	Drik: 'दृक्',
	'Bhava Bala': 'भाव बल',
	'Twelve houses ranked by strength': 'बारह भाव बल के क्रम में',
	'Twelve houses ranked by strength on the {{system}} frame':
		'{{system}} भाव पद्धति में बारह भाव बल के क्रम में',
	'Component legend': 'घटक संकेत',
	'{{component}} Bala': '{{component}} बल',
	'lord {{graha}}': 'स्वामी {{graha}}',
	'{{value}} rupas': '{{value}} रूप',
	'Bhava Bala {{value}} virupas': 'भाव बल {{value}} विरूप',
	'{{component}} {{value}} virupas': '{{component}} {{value}} विरूप',
	Shadbala: 'षड्बल',
	'Shadbala planetary strength': 'षड्बल ग्रह बल',
	'{{count}} planets ranked by strength': '{{count}} ग्रह बल के क्रम में',
	'Planet strength bars': 'ग्रह बल पट्टियाँ',
	'Strength component legend': 'बल घटक संकेत',
	'Ishta Phala is the capacity to give benefic results, Kashta Phala the capacity to give malefic ones. Both are in virupas and are read together, since a planet can be strong and still deliver hardship.':
		'इष्ट फल शुभ फल देने की क्षमता है, कष्ट फल अशुभ फल देने की। दोनों विरूप में हैं और साथ पढ़े जाते हैं, क्योंकि ग्रह बलवान होकर भी कष्ट दे सकता है।',
	'{{planet}} Shadbala': '{{planet}} षड्बल',
	'rank {{n}}': 'क्रम {{n}}',
	'Strength components for {{planet}}': '{{planet}} के बल घटक',
	'Ishta Phala {{ishta}}, Kashta Phala {{kashta}} virupas':
		'इष्ट फल {{ishta}}, कष्ट फल {{kashta}} विरूप',
	'Ishta {{value}}': 'इष्ट {{value}}',
	'Kashta {{value}}': 'कष्ट {{value}}',
	'House {{n}}': 'भाव {{n}}',
	Positions: 'स्थितियाँ',
	'Aspects ({{count}})': 'दृष्टियाँ ({{count}})',
	'Transit views': 'गोचर दृश्य',
	'Transit aspects': 'गोचर दृष्टियाँ',
	Speed: 'गति',
	Gochara: 'गोचर',
	'Gochara transits': 'गोचर संचार',
	'Where each graha transits at {{when}}, read against the natal chart of {{birth}}.':
		'{{when}} को प्रत्येक ग्रह कहाँ गोचर करता है, {{birth}} की जन्म कुंडली के सापेक्ष।',
	'Key transits': 'मुख्य गोचर',
	'natal house {{n}}': 'जन्म भाव {{n}}',
	'{{aspect}} natal {{planet}}': 'जन्म {{planet}} से {{aspect}}',
	'{{aspect}} natal {{planet}} ({{orb}}°)':
		'जन्म {{planet}} से {{aspect}} ({{orb}}°)',
	'Kaksha {{n}} of {{total}}': '{{total}} में से कक्षा {{n}}',
	'Kaksha {{n}} of {{total}} within the current sign':
		'वर्तमान राशि में {{total}} में से कक्षा {{n}}',
	'Kaksha {{n}} of {{total}}, ruled by {{graha}}':
		'{{total}} में से कक्षा {{n}}, स्वामी {{graha}}',
	'Kaksha {{n}} of {{total}}, spanning {{start}}° to {{end}}° of the sign':
		'{{total}} में से कक्षा {{n}}, राशि के {{start}}° से {{end}}° तक',
	'Kaksha {{n}} of {{total}}, ruled by {{graha}}, spanning {{start}}° to {{end}}° of the sign':
		'{{total}} में से कक्षा {{n}}, स्वामी {{graha}}, राशि के {{start}}° से {{end}}° तक',
	'this kaksha lord gave bindu': 'इस कक्षा स्वामी ने बिंदु दिया',
	'this kaksha lord gave no bindu': 'इस कक्षा स्वामी ने बिंदु नहीं दिया',
	'this kaksha lord gave bindu, {{count}} of {{total}} in this sign':
		'इस कक्षा स्वामी ने बिंदु दिया, इस राशि में {{total}} में से {{count}}',
	'this kaksha lord gave no bindu, {{count}} of {{total}} in this sign':
		'इस कक्षा स्वामी ने बिंदु नहीं दिया, इस राशि में {{total}} में से {{count}}',
	'Transiting planets: each planet with its current sign, degree and daily speed.':
		'गोचर ग्रह: प्रत्येक ग्रह की वर्तमान राशि, अंश और दैनिक गति।',
	'Energy {{value}}/10': 'ऊर्जा {{value}}/10',
	'Energy {{value}} of 10': '10 में से ऊर्जा {{value}}',
	Health: 'स्वास्थ्य',
	Finance: 'वित्त',
	Advice: 'सलाह',
	'Lucky number': 'शुभ अंक',
	'Lucky numbers': 'शुभ अंक',
	'Lucky color': 'शुभ रंग',
	'Lucky days': 'शुभ दिन',
	'Best with': 'सर्वाधिक अनुकूल',
	Phase: 'कला',
	'Active transits': 'सक्रिय गोचर',
	'Week by week': 'सप्ताह दर सप्ताह',
	'Week {{n}}': 'सप्ताह {{n}}',
	'Key dates': 'मुख्य तिथियाँ',
	'Arudha padas': 'अरुढ़ पद',
	Moved: 'स्थानांतरित',
	'marks a pada that fell in its own bhava or the seventh from it and was moved to the tenth from there, as the classical rule requires. {{count}} of {{total}} padas here.':
		'उस पद को दर्शाता है जो अपने ही भाव में या उससे सातवें में पड़ा और शास्त्रीय नियम के अनुसार वहाँ से दसवें में स्थानांतरित हुआ। यहाँ {{total}} में से {{count}} पद।',
	'The twelve Arudha padas: each pada with its bhava, the bhava sign and its lord, the sign the lord occupies, the sign the pada falls in, which house from the Lagna that is, whether the classical exception was applied, and what the pada is read for.':
		'बारह अरुढ़ पद: प्रत्येक पद अपने भाव, भाव राशि और उसके स्वामी, स्वामी की राशि, पद की राशि, लग्न से कौन सा भाव, शास्त्रीय अपवाद लगा या नहीं, और पद किसके लिए पढ़ा जाता है।',
	'Bhava rashi': 'भाव राशि',
	'Lord rashi': 'स्वामी राशि',
	'Pada rashi': 'पद राशि',
	'From Lagna': 'लग्न से',
	Lagna: 'लग्न',
	'Arudha Lagna': 'अरुढ़ लग्न',
	Upapada: 'उपपद',
	Mahadasha: 'महादशा',
	Antardasha: 'अंतर्दशा',
	Pratyantardasha: 'प्रत्यंतर्दशा',
	Sookshma: 'सूक्ष्म',
	Prana: 'प्राण',
	'Dasha timeline': 'दशा कालक्रम',
	Timeline: 'कालक्रम',
	'Chart details': 'कुंडली विवरण',
	'Dasha views': 'दशा दृश्य',
	'Vimshottari Mahadasha': 'विंशोत्तरी महादशा',
	'Active dashas': 'सक्रिय दशाएँ',
	'{{level}} periods in {{planet}} {{parent}}':
		'{{planet}} {{parent}} में {{level}} अवधियाँ',
	'{{planet}} {{level}}': '{{planet}} {{level}}',
	'Inside the {{planet}} {{level}}{{span}}{{duration}}.':
		'{{planet}} {{level}} के भीतर{{span}}{{duration}}।',
	'It began {{date}}, before birth, so only the sub-periods running after the birth date are listed.':
		'यह {{date}} को, जन्म से पहले आरंभ हुई, इसलिए केवल जन्म तिथि के बाद चलने वाली उप अवधियाँ दी गई हैं।',
	'Moon nakshatra: {{name}}': 'चंद्र नक्षत्र: {{name}}',
	'Moon nakshatra: {{name}} (lord {{lord}})':
		'चंद्र नक्षत्र: {{name}} (स्वामी {{lord}})',
	'{{balance}} left': '{{balance}} शेष',
	'Signifies {{houses}}': '{{houses}} का सूचक',
	Biorhythm: 'जैव लय',
	'Daily biorhythm': 'दैनिक जैव लय',
	'Biorhythm forecast': 'जैव लय पूर्वानुमान',
	Forecast: 'पूर्वानुमान',
	'No forecast': 'कोई पूर्वानुमान नहीं',
	'Biorhythm cycle lines across the forecast window':
		'पूर्वानुमान अवधि में जैव लय चक्र रेखाएँ',
	'Spotlight cycle': 'मुख्य चक्र',
	'critical day': 'संकट दिवस',
	'Critical days': 'संकट दिवस',
	'Two or more cycles cross zero on {{dates}}. Take extra care on these dates.':
		'{{dates}} को दो या अधिक चक्र शून्य पार करते हैं। इन तिथियों पर विशेष सावधानी रखें।',
	'Best day': 'सर्वोत्तम दिन',
	'Worst day': 'सबसे कठिन दिन',
	'Average energy': 'औसत ऊर्जा',
	Events: 'घटनाएँ',
	'Double days': 'द्विक दिवस',
	'Triple day': 'त्रिक दिवस',
	'Readings ({{count}})': 'व्याख्याएँ ({{count}})',
	Intellectual: 'बौद्धिक',
	Intuitive: 'सहज',
	'Vedic planetary positions': 'वैदिक ग्रह स्थितियाँ',
	'Vedic planetary positions: each graha with its rashi, degree, nakshatra, pada, nakshatra lord, house, its state in all three avastha systems, and retrograde state. Jagradadi and Deeptadi are read from sign dignity, which the nodes and the Lagna do not have, so those two cells are blank on the Rahu, Ketu and Lagna rows. Uranus, Neptune and Pluto appear only when asked for and rule no sign, so every avastha and house cell is blank on their rows too.':
		'वैदिक ग्रह स्थितियाँ: प्रत्येक ग्रह की राशि, अंश, नक्षत्र, पाद, नक्षत्र स्वामी, भाव, तीनों अवस्था पद्धतियों में उसकी दशा, और वक्री स्थिति। जाग्रदादि और दीप्तादि राशि बल से पढ़े जाते हैं, जो छाया ग्रहों और लग्न के पास नहीं है, इसलिए राहु, केतु और लग्न की पंक्तियों में ये दो खाने रिक्त रहते हैं। यूरेनस, नेपच्यून और प्लूटो केवल माँगे जाने पर आते हैं और किसी राशि के स्वामी नहीं, इसलिए उनकी पंक्तियों में हर अवस्था और भाव खाना भी रिक्त है।',
	'Nak. lord': 'नक्ष. स्वामी',
	Baladi: 'बालादि',
	Jagradadi: 'जाग्रदादि',
	Deeptadi: 'दीप्तादि',
	'Baladi: the five age states, set by degree within the sign':
		'बालादि: राशि में अंश से निर्धारित पाँच आयु अवस्थाएँ',
	'Jagradadi: the three waking states, set by sign dignity. The seven classical grahas only':
		'जाग्रदादि: राशि बल से निर्धारित तीन जाग्रत अवस्थाएँ। केवल सात शास्त्रीय ग्रह',
	'Deeptadi: the nine dispositional states, set by sign dignity. The seven classical grahas only':
		'दीप्तादि: राशि बल से निर्धारित नौ स्वभाव अवस्थाएँ। केवल सात शास्त्रीय ग्रह',
	Retro: 'वक्री',
	'Combust grahas': 'अस्त ग्रह',
	'{{distance}} deg from Sun, within {{orb}} deg orb':
		'सूर्य से {{distance}} अंश, {{orb}} अंश ओर्ब के भीतर',
	'Planetary wars': 'ग्रह युद्ध',
	'{{first}} vs {{second}}': '{{first}} बनाम {{second}}',
	'{{distance}} deg apart': '{{distance}} अंश की दूरी',
	'{{graha}} wins': '{{graha}} जीतता है',
	Interpretations: 'व्याख्याएँ',
	'Rashi.': 'राशि।',
	'Nakshatra.': 'नक्षत्र।',
	'Bhava significations': 'भाव फल',
	Yogas: 'योग',
	Ashtakavarga: 'अष्टकवर्ग',
	'Ashtakavarga grid': 'अष्टकवर्ग सारणी',
	'Ashtakavarga views': 'अष्टकवर्ग दृश्य',
	Sarvashtakavarga: 'सर्वाष्टकवर्ग',
	Bhinnashtakavarga: 'भिन्नाष्टकवर्ग',
	Reduced: 'संक्षिप्त',
	'Reduced SAV': 'संक्षिप्त SAV',
	'Shodhya Pinda': 'शोध्य पिंड',
	'{{count}} signs': '{{count}} राशियाँ',
	'Fewer bindus': 'कम बिंदु',
	'More bindus': 'अधिक बिंदु',
	Bindus: 'बिंदु',
	'Rashi Pinda': 'राशि पिंड',
	'Graha Pinda': 'ग्रह पिंड',
	'No sarvashtakavarga data': 'सर्वाष्टकवर्ग डेटा नहीं',
	'No bhinnashtakavarga data': 'भिन्नाष्टकवर्ग डेटा नहीं',
	'No reduced ashtakavarga data': 'संक्षिप्त अष्टकवर्ग डेटा नहीं',
	'No bindu data': 'बिंदु डेटा नहीं',
	'No shodhya pinda data': 'शोध्य पिंड डेटा नहीं',
	'Sarvashtakavarga: each of the twelve signs and the bindus all planets contribute to it, with a grand total.':
		'सर्वाष्टकवर्ग: बारह राशियों में से प्रत्येक और सभी ग्रहों द्वारा दिए गए बिंदु, कुल योग सहित।',
	'Shodhya Pinda: each planet with its Rashi Pinda, Graha Pinda and Shodhya Pinda strength scores.':
		'शोध्य पिंड: प्रत्येक ग्रह के राशि पिंड, ग्रह पिंड और शोध्य पिंड बल अंक।',
	'Detected yogas': 'पहचाने गए योग',
	'Yoga catalog': 'योग सूची',
	'Yoga results': 'योग परिणाम',
	'No yoga data': 'योग डेटा नहीं',
	'No yogas match your search.': 'आपकी खोज से कोई योग मेल नहीं खाता।',
	'Filter yogas...': 'योग छाँटें...',
	'Filter detected yogas by name': 'पहचाने गए योग नाम से छाँटें',
	'Filter yoga list by name': 'योग सूची नाम से छाँटें',
	'{{count}} of {{total}} present': '{{total}} में से {{count}} उपस्थित',
	'{{count}} total': 'कुल {{count}}',
	'Classical family': 'शास्त्रीय वर्ग',
	Effects: 'फल',
	'Every classical condition is satisfied by this chart.':
		'इस कुंडली में प्रत्येक शास्त्रीय शर्त पूरी होती है।',
	'The rule matched, but a stronger family silences it under the classical precedence norms. Each card names the family that took precedence.':
		'नियम लगा, परंतु शास्त्रीय प्राथमिकता के अनुसार एक प्रबल वर्ग उसे शांत कर देता है। प्रत्येक कार्ड उस वर्ग का नाम देता है जिसे प्राथमिकता मिली।',
	'At least one classical condition fails. Read the evidence for which.':
		'कम से कम एक शास्त्रीय शर्त पूरी नहीं होती। प्रमाण बताते हैं कि कौन सी।',
	Synastry: 'संबंध कुंडली',
	'Synastry compatibility chart': 'संबंध अनुकूलता कुंडली',
	'Synastry dual wheel': 'संबंध द्वि चक्र',
	'Dual chart wheel comparing two natal charts':
		'दो जन्म कुंडलियों की तुलना करता द्वि चक्र',
	'Synastry response missing planet positions.':
		'संबंध कुंडली उत्तर में ग्रह स्थितियाँ नहीं हैं।',
	'A current {{endpoint}} response carries {{first}} and {{second}}, and the inter-aspect readings below still work without them.':
		'वर्तमान {{endpoint}} उत्तर में {{first}} और {{second}} होते हैं, और नीचे की पारस्परिक दृष्टि व्याख्याएँ उनके बिना भी काम करती हैं।',
	'Inter-aspects': 'पारस्परिक दृष्टियाँ',
	'Inter-aspect summary': 'पारस्परिक दृष्टि सारांश',
	'In this pairing': 'इस जोड़ी में',
	'All {{count}} inter-aspects': 'सभी {{count}} पारस्परिक दृष्टियाँ',
	'orb {{orb}}° · str {{strength}}': 'ऑर्ब {{orb}}° · बल {{strength}}',
	'ASC{{n}}': 'ASC{{n}}',
	'Person {{n}}': 'व्यक्ति {{n}}',
	'Planet 1': 'ग्रह 1',
	'Planet 2': 'ग्रह 2',
	'Inter-chart aspects: the planet from chart 1, the planet from chart 2, the aspect between them, the orb in degrees and the strength.':
		'कुंडलियों के बीच दृष्टियाँ: कुंडली 1 का ग्रह, कुंडली 2 का ग्रह, उनके बीच दृष्टि, अंश में ओर्ब और बल।',
};

registerLocale('hi', hi);
