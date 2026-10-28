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
 * **Thirteen entries in this file are unattested, not five:** `दृष्टि संरचनाएँ`, `स्थानांतरित जन्म कुंडली`, `{{percent}}% निकट`, `राशि से बाहर`, `ऑर्ब`, `शीर्ष`, `निकट आती` / `दूर जाती`, `दोहरा चक्र`, `वलय`, `भाव संधि`, `कुंडली चक्र`, `वर्टेक्स`, and the three cross-tab abbreviations. `वर्टेक्स` is a transliteration on the same grounds as `ऑर्ब`: the Vertex is a Western point Jyotisha does not model, and searching Hindi astrology writing for it returns the concept described in English rather than a Hindi name for it. Every other language uses the Latin word unchanged, and Russian transliterates it, so a transliteration is what the term does everywhere it travels. One carries a specific question for the practitioner: whether a bare `शीर्ष` pulls the `शीर्षोदय` sign classification.
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
import './field-labels/hi.js';
export declare const hi: Record<ChromeString, string>;
