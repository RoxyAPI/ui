export type ClientOptions = {
    baseUrl: 'https://roxyapi.com/api/v2' | (string & {});
};
export type NatalChartResponse = {
    /**
     * Birth details echoed back from the request. Confirms the input used for this chart calculation.
     */
    birthDetails: {
        /**
         * Birth date used for this chart (YYYY-MM-DD).
         */
        date: string;
        /**
         * Birth time used for this chart (HH:MM:SS, 24-hour).
         */
        time: string;
        /**
         * Birth latitude in decimal degrees.
         */
        latitude: number;
        /**
         * Birth longitude in decimal degrees.
         */
        longitude: number;
        /**
         * Timezone offset from UTC in decimal hours.
         */
        timezone: number;
    };
    /**
     * All 10 planetary positions with zodiac signs, house placements, and interpretations.
     */
    planets: Array<{
        /**
         * Planet or point name (Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto, North Node, South Node, Chiron).
         */
        name: string;
        /**
         * Tropical ecliptic longitude in degrees (0-360).
         */
        longitude: number;
        /**
         * Ecliptic latitude in degrees.
         */
        latitude: number;
        /**
         * Tropical zodiac sign this planet occupies.
         */
        sign: string;
        /**
         * Degree within the zodiac sign (0-29.999).
         */
        degree: number;
        /**
         * House placement (1-12) based on the selected house system.
         */
        house: number;
        /**
         * Daily motion in degrees per day. Negative values indicate retrograde.
         */
        speed: number;
        /**
         * Whether the planet is in retrograde motion.
         */
        isRetrograde: boolean;
        /**
         * Planet-in-sign-in-house interpretation. Narrative analysis of what this placement means in the natal chart.
         */
        interpretation?: {
            /**
             * One-sentence interpretation of this planet in its sign and house placement.
             */
            summary: string;
            /**
             * Multi-sentence detailed interpretation with personality insights.
             */
            detailed: string;
            /**
             * Key personality traits and themes for this placement.
             */
            keywords: Array<string>;
        };
    }>;
    /**
     * All 12 house cusps with zodiac positions. House cusps divide the chart into life areas.
     */
    houses: Array<{
        /**
         * House number (1-12).
         */
        number: number;
        /**
         * Ecliptic longitude of this house cusp (0-360).
         */
        longitude: number;
        /**
         * Zodiac sign on this house cusp.
         */
        sign: string;
        /**
         * Degree within the zodiac sign (0-29.999).
         */
        degree: number;
    }>;
    /**
     * House system used for this chart (placidus, whole-sign, equal, or koch).
     */
    houseSystem: string;
    /**
     * All planetary aspects found in this chart with orbs, strength, and interpretation.
     */
    aspects: Array<{
        /**
         * First planet in the aspect pair.
         */
        planet1: string;
        /**
         * Second planet in the aspect pair.
         */
        planet2: string;
        /**
         * Aspect type (CONJUNCTION, OPPOSITION, TRINE, SQUARE, SEXTILE, etc.).
         */
        type: string;
        /**
         * Exact angle of this aspect type in degrees.
         */
        angle: number;
        /**
         * Distance from exact aspect in degrees. Tighter orb means stronger influence.
         */
        orb: number;
        /**
         * Whether the aspect is applying (growing stronger) or separating (fading).
         */
        isApplying: boolean;
        /**
         * Aspect strength percentage (0-100) based on orb tightness.
         */
        strength: number;
        /**
         * Aspect nature: harmonious, challenging, or neutral.
         */
        interpretation: string;
    }>;
    /**
     * Aspect pattern analysis showing the balance of harmonious vs challenging energies in the chart.
     */
    aspectsInterpretation: {
        /**
         * Narrative summary of the overall aspect pattern in this chart.
         */
        summary: string;
        /**
         * Whether the chart is predominantly harmonious, challenging, or balanced.
         */
        dominant: string;
        /**
         * Count of harmonious aspects (trine, sextile).
         */
        harmonious: number;
        /**
         * Count of challenging aspects (square, opposition).
         */
        challenging: number;
        /**
         * Count of neutral aspects (conjunction).
         */
        neutral: number;
    };
    /**
     * Ascendant (rising sign). The eastern horizon at birth, defining outward personality and physical appearance.
     */
    ascendant: {
        /**
         * Zodiac sign on the Ascendant (rising sign).
         */
        sign: string;
        /**
         * Degree within the Ascendant sign (0-29.999).
         */
        degree: number;
        /**
         * Absolute ecliptic longitude of the Ascendant (0-360).
         */
        longitude: number;
    };
    /**
     * Midheaven (MC). The highest point of the ecliptic at birth, representing career direction and public image.
     */
    midheaven: {
        /**
         * Zodiac sign on the Midheaven (MC).
         */
        sign: string;
        /**
         * Degree within the Midheaven sign (0-29.999).
         */
        degree: number;
        /**
         * Absolute ecliptic longitude of the Midheaven (0-360).
         */
        longitude: number;
    };
    /**
     * Chart summary with dominant element, modality, retrograde planets, and distribution analysis.
     */
    summary: {
        /**
         * Most represented element in the chart (Fire, Earth, Air, Water).
         */
        dominantElement: string;
        /**
         * Most represented modality in the chart (Cardinal, Fixed, Mutable).
         */
        dominantModality: string;
        /**
         * Planets in retrograde motion at the time of birth.
         */
        retrogradePlanets: Array<string>;
        /**
         * Count of planets in each element. Shows elemental emphasis in the personality.
         */
        elementDistribution: {
            [key: string]: number;
        };
        /**
         * Count of planets in each modality. Shows the dominant operating mode.
         */
        modalityDistribution: {
            [key: string]: number;
        };
    };
};
export type NatalChartRequest = {
    /**
     * Birth date in YYYY-MM-DD format. Determines planetary positions for the specific calendar day.
     */
    date: string;
    /**
     * Birth time in 24-hour HH:MM:SS format. Determines the Ascendant (rising sign) and house cusps. Use 12:00:00 if unknown.
     */
    time: string;
    /**
     * Birth location latitude in decimal degrees (-90 to 90). Positive = North, negative = South.
     */
    latitude: number;
    /**
     * Birth location longitude in decimal degrees (-180 to 180). Positive = East, negative = West.
     */
    longitude: number;
    /**
     * Timezone: decimal hours from UTC (e.g. -5 for EST, 5.5 for IST) OR IANA name (e.g. "America/New_York", "Asia/Kolkata"). IANA strings are resolved to the DST-correct offset for the given date, so you can pass `cities[0].timezone` from /location/search directly.
     */
    timezone: number | string;
    /**
     * House system for dividing the chart into 12 houses. Placidus (default) is most popular in Western astrology and time-sensitive. Whole Sign assigns one sign per house (simpler, ancient). Equal houses divide chart into 30° segments from Ascendant. Koch emphasizes houses in high latitudes.
     */
    houseSystem?: 'placidus' | 'whole-sign' | 'equal' | 'koch';
};
export type HousesResponse = {
    /**
     * Input date used for this house cusp calculation.
     */
    date: string;
    /**
     * Input time used for this house cusp calculation.
     */
    time: string;
    /**
     * Observer latitude used for horizon-based house calculations.
     */
    latitude: number;
    /**
     * Observer longitude used for local sidereal time.
     */
    longitude: number;
    /**
     * Timezone offset from UTC applied to this calculation.
     */
    timezone: number;
    /**
     * House system used for this calculation (placidus, whole-sign, equal, koch, or all).
     */
    houseSystem: string;
    /**
     * Ascendant (rising sign) position. The eastern horizon point at the moment of birth, defining personality expression and physical appearance in Western astrology.
     */
    ascendant: {
        /**
         * Zodiac sign on the Ascendant (rising sign). Determines the first house cusp.
         */
        sign: string;
        /**
         * Degree within the Ascendant sign (0-29.999).
         */
        degree: number;
        /**
         * Absolute ecliptic longitude of the Ascendant in degrees (0-360).
         */
        longitude: number;
    };
    /**
     * Midheaven (MC) position. The highest point of the ecliptic at birth, representing career aspirations and public image in natal astrology.
     */
    midheaven: {
        /**
         * Zodiac sign on the Midheaven (MC). Indicates career direction and public reputation.
         */
        sign: string;
        /**
         * Degree within the Midheaven sign (0-29.999).
         */
        degree: number;
        /**
         * Absolute ecliptic longitude of the Midheaven in degrees (0-360).
         */
        longitude: number;
    };
    /**
     * All 12 house cusps with their zodiac positions. House cusps divide the chart into life areas: identity (1st), resources (2nd), communication (3rd), home (4th), creativity (5th), health (6th), partnerships (7th), transformation (8th), philosophy (9th), career (10th), community (11th), spirituality (12th).
     */
    houses: Array<{
        /**
         * House number (1-12). Each house governs specific life areas.
         */
        number: number;
        /**
         * Ecliptic longitude of this house cusp in degrees (0-360).
         */
        longitude: number;
        /**
         * Zodiac sign on this house cusp.
         */
        sign: string;
        /**
         * Degree within the zodiac sign on this cusp (0-29.999).
         */
        degree: number;
    }>;
    /**
     * Side-by-side house cusp comparison across all four systems (Placidus, Whole Sign, Equal, Koch). Only included when houseSystem is set to "all". Useful for educational tools and system comparison.
     */
    comparison?: {
        [key: string]: {
            houses: Array<{
                number: number;
                longitude: number;
                sign: string;
                degree: number;
            }>;
        };
    };
};
export type AspectsResponse = {
    /**
     * Date used for this aspect calculation (YYYY-MM-DD).
     */
    date: string;
    /**
     * Time used for this calculation (HH:MM:SS).
     */
    time: string;
    /**
     * Timezone offset from UTC in decimal hours.
     */
    timezone: number;
    /**
     * Total number of aspects found after any filters applied.
     */
    aspectsFound: number;
    /**
     * All aspects found between the specified planets, with strength, orb, and interpretation.
     */
    aspects: Array<{
        /**
         * First planet in the aspect pair.
         */
        planet1: string;
        /**
         * Second planet in the aspect pair.
         */
        planet2: string;
        /**
         * Aspect type (CONJUNCTION, OPPOSITION, TRINE, SQUARE, SEXTILE, etc.).
         */
        type: string;
        /**
         * Exact angle defining this aspect type in degrees.
         */
        angle: number;
        /**
         * Distance from exact aspect in degrees. Tighter orb means stronger influence.
         */
        orb: number;
        /**
         * Whether the aspect is applying (growing stronger) or separating (fading).
         */
        isApplying: boolean;
        /**
         * Aspect strength (0-100) based on orb tightness.
         */
        strength: number;
        /**
         * Aspect nature: harmonious, challenging, or neutral.
         */
        interpretation: string;
        /**
         * Aspect meaning with keywords, description, and nature classification.
         */
        meaning?: {
            /**
             * Aspect display name.
             */
            name: string;
            /**
             * Aspect meaning in short and long form.
             */
            description: {
                /**
                 * Brief aspect description.
                 */
                short: string;
                /**
                 * Detailed aspect description with astrological context.
                 */
                long: string;
            };
            /**
             * Keywords associated with this aspect type.
             */
            keywords: Array<string>;
            /**
             * Aspect nature classification.
             */
            nature: string;
        };
    }>;
    /**
     * Aspect summary with counts by nature and type.
     */
    summary: {
        /**
         * Total aspects found.
         */
        totalAspects: number;
        /**
         * Count of harmonious aspects (trine, sextile).
         */
        harmonious: number;
        /**
         * Count of challenging aspects (square, opposition).
         */
        challenging: number;
        /**
         * Count of neutral aspects (conjunction).
         */
        neutral: number;
        /**
         * Aspect count grouped by type.
         */
        byType: {
            [key: string]: number;
        };
    };
};
export type AspectsRequest = {
    /**
     * Date in YYYY-MM-DD format
     */
    date: string;
    /**
     * Time in HH:MM:SS format (24-hour)
     */
    time: string;
    /**
     * Timezone offset from UTC in decimal hours (NOT minutes format). Examples: New York EST = -5, India IST = 5.5 (NOT 5:30), Tokyo JST = 9. IMPORTANT: Use decimal format (5.5, not 5:30).
     */
    timezone: number | string;
    /**
     * Optional: specific planets to calculate aspects for (defaults to all 10)
     */
    planets?: Array<string>;
    /**
     * Optional: specific aspect types to find (defaults to all 9)
     */
    aspectTypes?: Array<string>;
};
export type TransitsResponse = {
    /**
     * Date of the transit calculation (YYYY-MM-DD).
     */
    transitDate: string;
    /**
     * Time of the transit calculation (HH:MM:SS, 24-hour).
     */
    transitTime: string;
    /**
     * Timezone offset from UTC in hours used for this calculation.
     */
    timezone: number;
    /**
     * Current positions of all 10 planets in the tropical zodiac. Use for daily transit tracking, horoscope generation, and aspect monitoring.
     */
    transitPlanets: Array<{
        /**
         * Planet name (Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto).
         */
        name: string;
        /**
         * Tropical ecliptic longitude in degrees (0-360). Primary coordinate for sign and aspect calculation.
         */
        longitude: number;
        /**
         * Ecliptic latitude in degrees. Near zero for most planets except Moon and Pluto.
         */
        latitude: number;
        /**
         * Tropical zodiac sign the planet currently occupies. Changes when longitude crosses a 30-degree boundary.
         */
        sign: string;
        /**
         * Degree within the current zodiac sign (0-29.999). Indicates how far into the sign the planet has progressed.
         */
        degree: number;
        /**
         * Daily motion in degrees per day. Negative values indicate retrograde motion.
         */
        speed: number;
        /**
         * Whether the planet is currently in apparent retrograde motion. Retrograde transits are considered more introspective and revisionary.
         */
        isRetrograde: boolean;
    }>;
    /**
     * Transit-to-natal aspects (only included when natalChart is provided in the request). Shows which transiting planets are aspecting natal planets.
     */
    transitAspects?: Array<{
        /**
         * Transiting planet forming the aspect.
         */
        transitPlanet: string;
        /**
         * Natal planet being aspected.
         */
        natalPlanet: string;
        /**
         * Aspect type (CONJUNCTION, OPPOSITION, TRINE, SQUARE, SEXTILE, etc.).
         */
        type: string;
        /**
         * Exact angle of this aspect type in degrees.
         */
        angle: number;
        /**
         * Distance from exact aspect in degrees. Tighter orb = stronger influence.
         */
        orb: number;
        /**
         * Whether the transiting planet is moving toward exactitude (applying) or away from it (separating). Applying aspects grow stronger.
         */
        isApplying: boolean;
        /**
         * Aspect strength percentage (0-100). Based on orb tightness — 100 is exact.
         */
        strength: number;
        /**
         * Aspect nature: harmonious (trine, sextile), challenging (square, opposition), or neutral (conjunction).
         */
        nature: string;
        /**
         * Rich interpretation of the transit aspect including narrative summary, timing, impact assessment, practical guidance, and keywords.
         */
        interpretation: {
            /**
             * Narrative interpretation of what this transit aspect means and how it manifests.
             */
            summary: string;
            /**
             * How long this transit influence lasts based on the transiting planet speed.
             */
            timing: string;
            /**
             * Strength and nature of the transit impact on your natal chart.
             */
            impact: string;
            /**
             * Practical advice for working with or navigating this transit energy.
             */
            guidance: string;
            /**
             * Key themes activated by this transit aspect.
             */
            keywords: Array<string>;
        };
    }>;
    /**
     * Transit aspect summary counts (only included when natalChart is provided). Quick overview of the current transit weather.
     */
    summary?: {
        /**
         * Total transit-to-natal aspects found.
         */
        totalAspects: number;
        /**
         * Count of harmonious aspects (trine, sextile).
         */
        harmonious: number;
        /**
         * Count of challenging aspects (square, opposition).
         */
        challenging: number;
        /**
         * Count of neutral aspects (conjunction).
         */
        neutral: number;
    };
};
export type TransitsRequest = {
    /**
     * Transit date in YYYY-MM-DD format (defaults to current date)
     */
    date?: string;
    /**
     * Transit time in HH:MM:SS format (defaults to current time)
     */
    time?: string;
    /**
     * Transit timezone: decimal hours from UTC OR IANA name (e.g. "America/New_York"). IANA resolved to the DST-correct offset for the transit date. Defaults to 0 (UTC).
     */
    timezone?: number | string;
    /**
     * Optional natal chart data to compare transits against
     */
    natalChart?: {
        date: string;
        time: string;
        latitude: number;
        longitude: number;
        /**
         * Natal timezone: decimal hours OR IANA name (e.g. "America/New_York"). IANA resolved to the DST-correct offset for the natal date.
         */
        timezone: number | string;
    };
};
export type BirthChartResponse = {
    aries: {
        /**
         * Zodiac sign name in lowercase.
         */
        rashi: string;
        /**
         * Planets placed in this zodiac sign.
         */
        signs: Array<{
            /**
             * Planet (graha) placed in this sign.
             */
            graha: string;
            /**
             * Sidereal longitude in degrees (0-360) using Lahiri ayanamsa.
             */
            longitude: number;
            nakshatra: {
                /**
                 * Nakshatra (lunar mansion, 1 of 27) the planet occupies.
                 */
                name: string;
                /**
                 * Nakshatra pada (quarter, 1-4). Each nakshatra has 4 padas of 3°20 each.
                 */
                pada: number;
                /**
                 * Nakshatra index (1-27) in the zodiac sequence starting from Ashwini.
                 */
                key: number;
            };
            /**
             * True if planet is in retrograde motion (appears to move backward). Retrograde planets have altered significations.
             */
            isRetrograde: boolean;
        }>;
    };
    /**
     * Quick lookup of all planet positions keyed by planet name. Contains Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu, and Lagna (Ascendant).
     */
    meta: {
        [key: string]: {
            /**
             * Planet (graha) name. One of 9 Navagraha (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu) or Lagna (Ascendant). Used for matching transits and dasha lords to natal positions.
             */
            graha: string;
            /**
             * Zodiac sign (rashi) the planet occupies in the birth chart. One of 12 Vedic rashis from Aries (Mesha) to Pisces (Meena).
             */
            rashi: string;
            /**
             * Sidereal longitude in degrees (0-360) using Lahiri ayanamsa. Precise position used for aspect calculations, divisional chart mapping, and transit analysis.
             */
            longitude: number;
            /**
             * Nakshatra (lunar mansion) data for this planet. Nakshatras are the 27-fold division of the zodiac central to Vedic timing and compatibility systems.
             */
            nakshatra: {
                /**
                 * Nakshatra (lunar mansion) the planet occupies. One of 27 Vedic nakshatras spanning 13 degrees 20 arcminutes each. Determines dasha lord and behavioral qualities.
                 */
                name: string;
                /**
                 * Nakshatra pada (quarter, 1-4). Each nakshatra divides into 4 padas of 3 degrees 20 arcminutes. Pada determines Navamsa sign and refines personality traits.
                 */
                pada: number;
                /**
                 * Nakshatra sequence number (1-27) in zodiac order starting from Ashwini. Used for Tara Bala compatibility and dasha calculations.
                 */
                key: number;
            };
            /**
             * True if the planet is in retrograde motion (appears to move backward through the zodiac). Retrograde planets carry intensified or internalized significations in Vedic interpretation.
             */
            isRetrograde: boolean;
        };
    };
};
export type BirthChartRequest = {
    /**
     * Birth date in YYYY-MM-DD format. Date determines planetary positions and nakshatra calculations for Vedic kundli (janam patri). Accurate birth date is essential for dashas, yoga calculations, and divisional charts (vargas).
     */
    date: string;
    /**
     * Birth time in 24-hour HH:MM:SS format. Time is CRITICAL for Lagna (Ascendant) calculation and house divisions - changes every ~2 hours. Even minutes matter for accurate nakshatra pada and divisional chart (D9, D10) calculations. Without exact time, Lagna and house-based predictions will be incorrect.
     */
    time: string;
    /**
     * Birth location latitude in decimal degrees. Location determines local sidereal time for Lagna calculation and affects bhava (house) cusps. Example: Delhi 28.6139, Mumbai 19.0760, Kathmandu 27.7172.
     */
    latitude: number;
    /**
     * Birth location longitude in decimal degrees. Affects local time calculations and ayanamsha adjustments. Example: Delhi 77.2090, Mumbai 72.8777, Kathmandu 85.3240.
     */
    longitude: number;
    /**
     * Timezone: decimal hours from UTC (e.g. 5.5 for IST, -5 for EST) OR IANA name (e.g. "Asia/Kolkata", "America/New_York"). IANA strings are resolved to the DST-correct offset for the given date, so you can pass `cities[0].timezone` from /location/search directly. Defaults to 5.5 (IST).
     */
    timezone?: number | string;
};
export type NavamsaResponse = {
    /**
     * Navamsa (D9) divisional chart showing planetary positions across 12 rashi houses plus a meta lookup. Same structure as the birth chart response.
     */
    chart: {
        /**
         * Planet positions in the Navamsa (D9) chart keyed by planet name. Contains all 9 Navagraha plus Lagna.
         */
        meta: {
            [key: string]: {
                /**
                 * Planet (graha) name. One of 9 Navagraha (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu) or Lagna (Ascendant). In Navamsa, Venus and Jupiter placements are especially significant for marriage and spiritual growth.
                 */
                graha: string;
                /**
                 * Zodiac sign (rashi) the planet occupies in the Navamsa (D9) chart. D9 sign placement reveals the deeper quality of a planet and is critical for spouse characteristics and marriage timing.
                 */
                rashi: string;
                /**
                 * Sidereal longitude in degrees (0-360) using Lahiri ayanamsa. Same as D1 birth chart longitude, preserved for cross-chart reference and aspect analysis.
                 */
                longitude: number;
                /**
                 * Nakshatra (lunar mansion) data for this planet. Nakshatras are the 27-fold division of the zodiac central to Vedic timing and compatibility systems.
                 */
                nakshatra: {
                    /**
                     * Nakshatra (lunar mansion) the planet occupies. One of 27 Vedic nakshatras spanning 13 degrees 20 arcminutes each. Determines dasha lord and behavioral qualities.
                     */
                    name: string;
                    /**
                     * Nakshatra pada (quarter, 1-4). Each nakshatra divides into 4 padas of 3 degrees 20 arcminutes. Pada determines Navamsa sign and refines personality traits.
                     */
                    pada: number;
                    /**
                     * Nakshatra sequence number (1-27) in zodiac order starting from Ashwini. Used for Tara Bala compatibility and dasha calculations.
                     */
                    key: number;
                };
                /**
                 * True if the planet is in retrograde motion (appears to move backward through the zodiac). Retrograde planets carry intensified or internalized significations in Vedic interpretation.
                 */
                isRetrograde: boolean;
            };
        };
        [key: string]: unknown;
    };
    /**
     * Planets that are Vargottama (same sign in D1 and D9)
     */
    vargottama: Array<string>;
    /**
     * Explanation of Vargottama significance
     */
    vargottamaExplanation: string;
};
export type NavamsaRequest = {
    /**
     * Birth date in YYYY-MM-DD format. Date determines planetary positions and nakshatra calculations for Vedic kundli (janam patri). Accurate birth date is essential for dashas, yoga calculations, and divisional charts (vargas).
     */
    date: string;
    /**
     * Birth time in 24-hour HH:MM:SS format. Time is CRITICAL for Lagna (Ascendant) calculation and house divisions - changes every ~2 hours. Even minutes matter for accurate nakshatra pada and divisional chart (D9, D10) calculations. Without exact time, Lagna and house-based predictions will be incorrect.
     */
    time: string;
    /**
     * Birth location latitude in decimal degrees. Location determines local sidereal time for Lagna calculation and affects bhava (house) cusps. Example: Delhi 28.6139, Mumbai 19.0760, Kathmandu 27.7172.
     */
    latitude: number;
    /**
     * Birth location longitude in decimal degrees. Affects local time calculations and ayanamsha adjustments. Example: Delhi 77.2090, Mumbai 72.8777, Kathmandu 85.3240.
     */
    longitude: number;
    /**
     * Timezone: decimal hours from UTC (e.g. 5.5 for IST, -5 for EST) OR IANA name (e.g. "Asia/Kolkata", "America/New_York"). IANA strings are resolved to the DST-correct offset for the given date, so you can pass `cities[0].timezone` from /location/search directly. Defaults to 5.5 (IST).
     */
    timezone?: number | string;
};
export type DivisionalChartResponse = {
    /**
     * Metadata about the selected divisional chart.
     */
    division: {
        /**
         * Division number (e.g. 10 for D10 Dasamsa).
         */
        number: number;
        /**
         * English name of the divisional chart.
         */
        name: string;
        /**
         * Sanskrit name of the divisional chart.
         */
        sanskritName: string;
        /**
         * Size of each division segment within a 30-degree sign.
         */
        degreesPerDivision: string;
        /**
         * Life areas this divisional chart reveals.
         */
        significance: string;
    };
    /**
     * Divisional chart showing planetary positions across 12 rashi houses plus a meta lookup. Same structure as birth chart and navamsa responses.
     */
    chart: {
        /**
         * Planet positions in the divisional chart keyed by planet name. Contains all 9 Navagraha plus Lagna.
         */
        meta: {
            [key: string]: {
                /**
                 * Planet (graha) name. One of 9 Navagraha (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu) or Lagna (Ascendant). Used to match transits and dasha lords to divisional chart placements.
                 */
                graha: string;
                /**
                 * Zodiac sign (rashi) the planet occupies in this divisional chart. May differ from the D1 birth chart sign. Comparing D1 and divisional rashi reveals Vargottama status and domain-specific strengths.
                 */
                rashi: string;
                /**
                 * Original sidereal longitude in degrees (0-360) using Lahiri ayanamsa, same as D1 birth chart. Sign placement changes per division but longitude is preserved for cross-chart reference.
                 */
                longitude: number;
                /**
                 * Nakshatra (lunar mansion) data for this planet. Nakshatras are the 27-fold division of the zodiac central to Vedic timing and compatibility systems.
                 */
                nakshatra: {
                    /**
                     * Nakshatra (lunar mansion) the planet occupies. One of 27 Vedic nakshatras spanning 13 degrees 20 arcminutes each. Determines dasha lord and behavioral qualities.
                     */
                    name: string;
                    /**
                     * Nakshatra pada (quarter, 1-4). Each nakshatra divides into 4 padas of 3 degrees 20 arcminutes. Pada determines Navamsa sign and refines personality traits.
                     */
                    pada: number;
                    /**
                     * Nakshatra sequence number (1-27) in zodiac order starting from Ashwini. Used for Tara Bala compatibility and dasha calculations.
                     */
                    key: number;
                };
                /**
                 * True if the planet is in retrograde motion (appears to move backward through the zodiac). Retrograde planets carry intensified or internalized significations in Vedic interpretation.
                 */
                isRetrograde: boolean;
            };
        };
        [key: string]: unknown;
    };
    /**
     * Planets that are Vargottama (same sign in D1 and this divisional chart). Vargottama planets deliver strong, consistent results.
     */
    vargottama: Array<string>;
};
export type DivisionalChartRequest = {
    /**
     * Birth date in YYYY-MM-DD format. Date determines planetary positions and nakshatra calculations for Vedic kundli (janam patri). Accurate birth date is essential for dashas, yoga calculations, and divisional charts (vargas).
     */
    date: string;
    /**
     * Birth time in 24-hour HH:MM:SS format. Time is CRITICAL for Lagna (Ascendant) calculation and house divisions - changes every ~2 hours. Even minutes matter for accurate nakshatra pada and divisional chart (D9, D10) calculations. Without exact time, Lagna and house-based predictions will be incorrect.
     */
    time: string;
    /**
     * Birth location latitude in decimal degrees. Location determines local sidereal time for Lagna calculation and affects bhava (house) cusps. Example: Delhi 28.6139, Mumbai 19.0760, Kathmandu 27.7172.
     */
    latitude: number;
    /**
     * Birth location longitude in decimal degrees. Affects local time calculations and ayanamsha adjustments. Example: Delhi 77.2090, Mumbai 72.8777, Kathmandu 85.3240.
     */
    longitude: number;
    /**
     * Timezone: decimal hours from UTC (e.g. 5.5 for IST, -5 for EST) OR IANA name (e.g. "Asia/Kolkata", "America/New_York"). IANA strings are resolved to the DST-correct offset for the given date, so you can pass `cities[0].timezone` from /location/search directly. Defaults to 5.5 (IST).
     */
    timezone?: number | string;
    /**
     * Divisional chart number. Each division reveals a specific life area. Supported: 2 (Hora, wealth), 3 (Drekkana, siblings), 4 (Chaturthamsa, property), 7 (Saptamsa, children), 9 (Navamsa, marriage), 10 (Dasamsa, career), 12 (Dwadasamsa, parents), 16 (Shodasamsa, vehicles), 20 (Vimsamsa, spirituality), 24 (Chaturvimsamsa, education), 27 (Bhamsa, strength), 30 (Trimsamsa, misfortunes), 40 (Khavedamsa, merit), 45 (Akshavedamsa, character), 60 (Shashtiamsa, past life karma).
     */
    division: number;
};
export type CompatibilityResponse = {
    /**
     * Total Ashtakoot Gun Milan score out of 36. Scores above 18 are considered compatible for marriage. Higher scores indicate stronger marital harmony.
     */
    total: number;
    /**
     * Maximum possible Guna Milan score (always 36). The 36 points are distributed across 8 kootas (matching categories).
     */
    maxScore: number;
    /**
     * Compatibility percentage derived from total/maxScore. Above 50% (18/36) is the traditional minimum threshold for marriage compatibility.
     */
    percentage: number;
    /**
     * True when percentage >= 50% (18/36 minimum). Based on the traditional Ashtakoot Gun Milan threshold used by Vedic astrologers for kundli matching.
     */
    isCompatible: boolean;
    /**
     * Human-readable marriage recommendation based on overall score and dosha analysis. Indicates whether the union is recommended, and if not, specifies the reason (e.g. Nadi Dosha, Bhakoot Dosha, low overall score).
     */
    recommendation: string;
    /**
     * List of active (uncancelled) doshas in the matching. Doshas that meet classical cancellation conditions from Muhurta Martanda or BPHS are excluded from this array and appear in doshaCancellations instead. Common doshas: Nadi Dosha (same Nadi type, 0/8 points), Bhakoot Dosha (inauspicious Moon sign distance, 0/7 points). Empty array when no doshas are present or all detected doshas are cancelled.
     */
    doshas: Array<string>;
    /**
     * Doshas detected but cancelled by classical exception rules. Nadi Dosha cancels when partners share the same Moon sign with different nakshatras, same nakshatra with different padas, or same nakshatra spanning different signs. Bhakoot Dosha cancels when Moon sign lords are the same planet or mutual natural friends. Koota score remains 0 but the dosha is not counted against the recommendation.
     */
    doshaCancellations: Array<{
        /**
         * Name of the cancelled dosha (Nadi Dosha or Bhakoot Dosha).
         */
        dosha: string;
        /**
         * Classical cancellation condition that neutralizes this dosha. Based on Muhurta Martanda for Nadi Dosha and BPHS for Bhakoot Dosha.
         */
        reason: string;
    }>;
    /**
     * Detailed breakdown of compatibility scores across all 8 Ashtakoot kootas. Each category evaluates a different aspect of marital compatibility: temperament, physical, mental, financial, and health.
     */
    breakdown: Array<{
        /**
         * One of 8 Ashtakoot matching categories: Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, Nadi.
         */
        category: string;
        /**
         * Points scored in this category. Maximum varies: Varna (1), Vashya (2), Tara (3), Yoni (4), Graha Maitri (5), Gana (6), Bhakoot (7), Nadi (8).
         */
        score: number;
        /**
         * Maximum possible points for this koota category.
         */
        maxScore: number;
        /**
         * Classification of person 1 for this koota (e.g. Vaishya for Varna, Chatushpada for Vashya, Sheep for Yoni).
         */
        person1: string;
        /**
         * Classification of person 2 for this koota.
         */
        person2: string;
        /**
         * Human-readable explanation of what this koota category evaluates.
         */
        description: string;
    }>;
};
export type CompatibilityRequest = {
    /**
     * Birth data of the first person (typically the boy/groom in traditional Ashtakoot matching). Date, time, and location determine Moon nakshatra for koota scoring.
     */
    person1: {
        /**
         * Birth date in YYYY-MM-DD format. Date determines planetary positions and nakshatra calculations for Vedic kundli (janam patri). Accurate birth date is essential for dashas, yoga calculations, and divisional charts (vargas).
         */
        date: string;
        /**
         * Birth time in 24-hour HH:MM:SS format. Time is CRITICAL for Lagna (Ascendant) calculation and house divisions - changes every ~2 hours. Even minutes matter for accurate nakshatra pada and divisional chart (D9, D10) calculations. Without exact time, Lagna and house-based predictions will be incorrect.
         */
        time: string;
        /**
         * Birth location latitude in decimal degrees. Location determines local sidereal time for Lagna calculation and affects bhava (house) cusps. Example: Delhi 28.6139, Mumbai 19.0760, Kathmandu 27.7172.
         */
        latitude: number;
        /**
         * Birth location longitude in decimal degrees. Affects local time calculations and ayanamsha adjustments. Example: Delhi 77.2090, Mumbai 72.8777, Kathmandu 85.3240.
         */
        longitude: number;
        /**
         * Timezone: decimal hours from UTC (e.g. 5.5 for IST, -5 for EST) OR IANA name (e.g. "Asia/Kolkata", "America/New_York"). IANA strings are resolved to the DST-correct offset for the given date, so you can pass `cities[0].timezone` from /location/search directly. Defaults to 5.5 (IST).
         */
        timezone?: number | string;
    };
    /**
     * Birth data of the second person (typically the girl/bride in traditional Ashtakoot matching). Moon nakshatra compared against person 1 across all 8 kootas.
     */
    person2: {
        /**
         * Birth date in YYYY-MM-DD format. Date determines planetary positions and nakshatra calculations for Vedic kundli (janam patri). Accurate birth date is essential for dashas, yoga calculations, and divisional charts (vargas).
         */
        date: string;
        /**
         * Birth time in 24-hour HH:MM:SS format. Time is CRITICAL for Lagna (Ascendant) calculation and house divisions - changes every ~2 hours. Even minutes matter for accurate nakshatra pada and divisional chart (D9, D10) calculations. Without exact time, Lagna and house-based predictions will be incorrect.
         */
        time: string;
        /**
         * Birth location latitude in decimal degrees. Location determines local sidereal time for Lagna calculation and affects bhava (house) cusps. Example: Delhi 28.6139, Mumbai 19.0760, Kathmandu 27.7172.
         */
        latitude: number;
        /**
         * Birth location longitude in decimal degrees. Affects local time calculations and ayanamsha adjustments. Example: Delhi 77.2090, Mumbai 72.8777, Kathmandu 85.3240.
         */
        longitude: number;
        /**
         * Timezone: decimal hours from UTC (e.g. 5.5 for IST, -5 for EST) OR IANA name (e.g. "Asia/Kolkata", "America/New_York"). IANA strings are resolved to the DST-correct offset for the given date, so you can pass `cities[0].timezone` from /location/search directly. Defaults to 5.5 (IST).
         */
        timezone?: number | string;
    };
};
export type PlanetaryPositionsResponse = {
    [key: string]: {
        /**
         * Vedic planet (graha) name. One of the Navagraha: Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu, or Lagna (Ascendant).
         */
        graha: string;
        /**
         * Zodiac sign (rashi) the planet occupies. One of 12 Vedic rashis from Aries to Pisces.
         */
        rashi: string;
        /**
         * Sidereal longitude in degrees (0-360) using Lahiri ayanamsa. Precise planetary position for chart calculations.
         */
        longitude: number;
        /**
         * House number (1-12) the planet occupies using Whole Sign house system. House 1 is the Lagna (Ascendant) sign. Essential for bhava analysis and house-level predictions.
         */
        house: number;
        /**
         * Nakshatra (lunar mansion) data with optional interpretive details from Vedic tradition.
         */
        nakshatra: {
            /**
             * Nakshatra (lunar mansion) the planet occupies. One of 27 Vedic nakshatras spanning 13 degrees 20 arcminutes each.
             */
            name: string;
            /**
             * Nakshatra pada (quarter, 1-4). Each nakshatra divides into 4 padas of 3 degrees 20 arcminutes. Determines Navamsa sign.
             */
            pada: number;
            /**
             * Nakshatra sequence number (1-27) in zodiac order starting from Ashwini. Used for Tara Bala and dasha calculations.
             */
            key: number;
            /**
             * Presiding deity of the nakshatra from Vedic mythology. Influences the spiritual quality and karmic themes of the planet placement.
             */
            deity?: string;
            /**
             * Traditional symbol representing the nakshatra. Reflects core energy and life themes associated with this lunar mansion.
             */
            symbol?: string;
            /**
             * Personality traits and behavioral tendencies when a planet occupies this nakshatra. Used for character analysis and prediction.
             */
            characteristics?: string;
        };
        /**
         * Vedic zodiac sign (rashi) details including Sanskrit name, symbol, elemental energy, and personality characteristics. Present when interpretation data is available.
         */
        rashiDetails?: {
            /**
             * Sanskrit name of the zodiac sign as used in traditional Jyotish texts.
             */
            vedicName?: string;
            /**
             * Traditional symbol representing this zodiac sign.
             */
            symbol?: string;
            /**
             * Elemental and gender classification of the rashi (Masculine/Feminine, Fire/Earth/Air/Water).
             */
            energy?: string;
            /**
             * Key personality traits and behavioral tendencies of this zodiac sign in Vedic astrology.
             */
            characteristics?: string;
        };
        /**
         * Whether the planet is in retrograde motion (vakri). Rahu and Ketu are always retrograde in Vedic astrology.
         */
        isRetrograde: boolean;
        /**
         * Whether the planet is combust (asta, moudhya). A planet is combust when too close to the Sun, weakening its significations. Combustion orbs vary by planet: Moon 12 deg, Mars 17 deg, Mercury 14 deg (12 deg if retrograde), Jupiter 11 deg, Venus 10 deg (8 deg if retrograde), Saturn 15 deg. Sun, Rahu, Ketu, and Lagna are never combust. Based on Surya Siddhanta combustion orbs.
         */
        isCombust?: boolean;
        /**
         * Angular distance from the Sun in degrees (0-180). Smaller values indicate closer proximity. Null for Sun, Rahu, Ketu, and Lagna. Useful for gauging combustion severity and planetary strength analysis.
         */
        combustionDistance?: number;
    };
};
export type PlanetaryPositionsRequest = {
    /**
     * Birth date in YYYY-MM-DD format. Date determines planetary positions and nakshatra calculations for Vedic kundli (janam patri). Accurate birth date is essential for dashas, yoga calculations, and divisional charts (vargas).
     */
    date: string;
    /**
     * Birth time in 24-hour HH:MM:SS format. Time is CRITICAL for Lagna (Ascendant) calculation and house divisions - changes every ~2 hours. Even minutes matter for accurate nakshatra pada and divisional chart (D9, D10) calculations. Without exact time, Lagna and house-based predictions will be incorrect.
     */
    time: string;
    /**
     * Birth location latitude in decimal degrees. Location determines local sidereal time for Lagna calculation and affects bhava (house) cusps. Example: Delhi 28.6139, Mumbai 19.0760, Kathmandu 27.7172.
     */
    latitude: number;
    /**
     * Birth location longitude in decimal degrees. Affects local time calculations and ayanamsha adjustments. Example: Delhi 77.2090, Mumbai 72.8777, Kathmandu 85.3240.
     */
    longitude: number;
    /**
     * Timezone: decimal hours from UTC (e.g. 5.5 for IST, -5 for EST) OR IANA name (e.g. "Asia/Kolkata", "America/New_York"). IANA strings are resolved to the DST-correct offset for the given date, so you can pass `cities[0].timezone` from /location/search directly. Defaults to 5.5 (IST).
     */
    timezone?: number | string;
};
export type ManglikResponse = {
    /**
     * Whether Manglik dosha (Kuja dosha) is present based on Mars placement from Lagna
     */
    present: boolean;
    /**
     * Manglik dosha intensity, Mild (houses 2, 12), Moderate (houses 4, 7), Severe (houses 1, 8)
     */
    severity?: 'Mild' | 'Moderate' | 'Severe';
    /**
     * Human-readable Manglik dosha analysis with Mars house placement
     */
    description: string;
    /**
     * Classical cancellation factors that reduce Manglik dosha severity (own sign, exaltation, benefic aspects)
     */
    exceptions?: Array<string>;
    /**
     * Traditional Vedic remedies for Manglik dosha mitigation based on severity level
     */
    remedies?: Array<string>;
    /**
     * Manglik dosha effects on marriage, personality, and relationships
     */
    effects?: {
        /**
         * Impact of Manglik dosha on marriage and marital harmony
         */
        marriage: string;
        /**
         * Influence on temperament and behavioral traits
         */
        personality: string;
        /**
         * Age-related intensity and Mars maturity effects
         */
        timing: string;
        /**
         * Impact on interpersonal and spousal relationships
         */
        relationships: string;
    };
};
export type ManglikRequest = {
    /**
     * Birth date in YYYY-MM-DD format. Date determines planetary positions and nakshatra calculations for Vedic kundli (janam patri). Accurate birth date is essential for dashas, yoga calculations, and divisional charts (vargas).
     */
    date: string;
    /**
     * Birth time in 24-hour HH:MM:SS format. Time is CRITICAL for Lagna (Ascendant) calculation and house divisions - changes every ~2 hours. Even minutes matter for accurate nakshatra pada and divisional chart (D9, D10) calculations. Without exact time, Lagna and house-based predictions will be incorrect.
     */
    time: string;
    /**
     * Birth location latitude in decimal degrees. Location determines local sidereal time for Lagna calculation and affects bhava (house) cusps. Example: Delhi 28.6139, Mumbai 19.0760, Kathmandu 27.7172.
     */
    latitude: number;
    /**
     * Birth location longitude in decimal degrees. Affects local time calculations and ayanamsha adjustments. Example: Delhi 77.2090, Mumbai 72.8777, Kathmandu 85.3240.
     */
    longitude: number;
    /**
     * Timezone: decimal hours from UTC (e.g. 5.5 for IST, -5 for EST) OR IANA name (e.g. "Asia/Kolkata", "America/New_York"). IANA strings are resolved to the DST-correct offset for the given date, so you can pass `cities[0].timezone` from /location/search directly. Defaults to 5.5 (IST).
     */
    timezone?: number | string;
};
export type KalsarpaResponse = {
    /**
     * Whether Kalsarpa dosha (Kalsarpa yoga) is present, all planets hemmed between Rahu-Ketu axis
     */
    present: boolean;
    /**
     * Kalsarpa dosha intensity based on Rahu-Ketu house positions
     */
    severity?: 'Mild' | 'Moderate' | 'Severe';
    /**
     * One of 12 Kalsarpa types based on Rahu house position (Ananta, Kulik, Vasuki, Shankhapala, Padma, Mahapadma, Takshak, Karkotak, Shankhachud, Ghatak, Vishdhar, Sheshnag)
     */
    type?: string;
    /**
     * Human-readable Kalsarpa dosha analysis with Rahu-Ketu axis details
     */
    description: string;
    /**
     * Traditional Vedic remedies for Kalsarpa dosha including puja, mantras, and spiritual practices
     */
    remedies?: Array<string>;
    /**
     * Kalsarpa dosha effects on career, health, mindset, and relationships
     */
    effects?: {
        /**
         * When Kalsarpa effects are most active in Vimshottari dasha
         */
        duration: string;
        /**
         * Impact on professional growth and career progress
         */
        career: string;
        /**
         * Physical and mental health implications
         */
        health: string;
        /**
         * Impact on family bonds and personal relationships
         */
        relationships: string;
        /**
         * Psychological and emotional effects
         */
        mindset: string;
        /**
         * Potential spiritual and personal growth benefits
         */
        positive: string;
    };
};
export type KalsarpaRequest = {
    /**
     * Birth date in YYYY-MM-DD format. Date determines planetary positions and nakshatra calculations for Vedic kundli (janam patri). Accurate birth date is essential for dashas, yoga calculations, and divisional charts (vargas).
     */
    date: string;
    /**
     * Birth time in 24-hour HH:MM:SS format. Time is CRITICAL for Lagna (Ascendant) calculation and house divisions - changes every ~2 hours. Even minutes matter for accurate nakshatra pada and divisional chart (D9, D10) calculations. Without exact time, Lagna and house-based predictions will be incorrect.
     */
    time: string;
    /**
     * Birth location latitude in decimal degrees. Location determines local sidereal time for Lagna calculation and affects bhava (house) cusps. Example: Delhi 28.6139, Mumbai 19.0760, Kathmandu 27.7172.
     */
    latitude: number;
    /**
     * Birth location longitude in decimal degrees. Affects local time calculations and ayanamsha adjustments. Example: Delhi 77.2090, Mumbai 72.8777, Kathmandu 85.3240.
     */
    longitude: number;
    /**
     * Timezone: decimal hours from UTC (e.g. 5.5 for IST, -5 for EST) OR IANA name (e.g. "Asia/Kolkata", "America/New_York"). IANA strings are resolved to the DST-correct offset for the given date, so you can pass `cities[0].timezone` from /location/search directly. Defaults to 5.5 (IST).
     */
    timezone?: number | string;
};
export type SadhesatiResponse = {
    /**
     * Whether Sade Sati is currently active, Saturn transiting 12th, 1st, or 2nd house from natal Moon
     */
    present: boolean;
    /**
     * Sadhesati intensity: Moderate for Rising/Setting phases, Severe for Peak phase (Saturn over natal Moon)
     */
    severity?: 'Mild' | 'Moderate' | 'Severe';
    /**
     * Current Sadhesati phase: Rising (12th house), Peak (1st house), or Setting (2nd house)
     */
    type?: string;
    /**
     * Human-readable Sadhesati analysis with current Saturn transit phase relative to natal Moon
     */
    description: string;
    /**
     * Traditional Vedic remedies for Shani Sade Sati including Shani mantras, donations, and worship
     */
    remedies?: Array<string>;
    /**
     * Sadhesati effects by transit phase with general and phase-specific impacts
     */
    effects?: {
        /**
         * Overall impact of Saturn transit during Sade Sati period
         */
        general: string;
        /**
         * Phase-specific effects for the current Sadhesati stage (Rising/Peak/Setting)
         */
        phases: {
            [key: string]: string;
        };
    };
};
export type SadhesatiRequest = {
    /**
     * Birth date in YYYY-MM-DD format. Date determines planetary positions and nakshatra calculations for Vedic kundli (janam patri). Accurate birth date is essential for dashas, yoga calculations, and divisional charts (vargas).
     */
    date: string;
    /**
     * Birth time in 24-hour HH:MM:SS format. Time is CRITICAL for Lagna (Ascendant) calculation and house divisions - changes every ~2 hours. Even minutes matter for accurate nakshatra pada and divisional chart (D9, D10) calculations. Without exact time, Lagna and house-based predictions will be incorrect.
     */
    time: string;
    /**
     * Birth location latitude in decimal degrees. Location determines local sidereal time for Lagna calculation and affects bhava (house) cusps. Example: Delhi 28.6139, Mumbai 19.0760, Kathmandu 27.7172.
     */
    latitude: number;
    /**
     * Birth location longitude in decimal degrees. Affects local time calculations and ayanamsha adjustments. Example: Delhi 77.2090, Mumbai 72.8777, Kathmandu 85.3240.
     */
    longitude: number;
    /**
     * Timezone: decimal hours from UTC (e.g. 5.5 for IST, -5 for EST) OR IANA name (e.g. "Asia/Kolkata", "America/New_York"). IANA strings are resolved to the DST-correct offset for the given date, so you can pass `cities[0].timezone` from /location/search directly. Defaults to 5.5 (IST).
     */
    timezone?: number | string;
};
export type KpAyanamsaResponse = {
    /**
     * Date for which ayanamsa was calculated
     */
    date: string;
    /**
     * KP-Newcomb ayanamsa value in degrees
     */
    ayanamsa: number;
    /**
     * Ayanamsa type identifier
     */
    type: string;
    /**
     * Mathematical basis for ayanamsa calculation
     */
    formula: string;
    /**
     * UTC timestamp when calculation was performed
     */
    calculated: string;
};
export type KpPlanetsResponse = {
    /**
     * Applied ayanamsa value in degrees
     */
    ayanamsa: number;
    planets: Array<{
        /**
         * Vedic graha name (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu).
         */
        planet: string;
        /**
         * KP sidereal longitude in degrees (0-360). Used to determine Placidus house placement and KP subdivision (sign, star, sub).
         */
        longitude: number;
        /**
         * Zodiac sign (rashi) this planet occupies in the sidereal zodiac.
         */
        sign: string;
        /**
         * Rashi lord (sign ruler). First level of the KP significator hierarchy. Its house ownership determines L4 significations.
         */
        signLord: string;
        /**
         * Nakshatra (lunar mansion) this planet occupies. One of 27 nakshatras, each spanning 13 degrees 20 minutes.
         */
        nakshatra: string;
        /**
         * Nakshatra sequence number (1-27). Ashwini=1 through Revati=27.
         */
        nakshatraNumber: number;
        /**
         * Nakshatra lord (star ruler) from the Vimshottari dasha sequence. Determines the nature of results this planet delivers in KP.
         */
        nakshatraLord: string;
        /**
         * Nakshatra pada/quarter (1-4)
         */
        pada: number;
        /**
         * Star-lord (same as nakshatra lord in KP system)
         */
        starLord: string;
        /**
         * Sub-lord based on 249-level KP subdivision
         */
        subLord: string;
        /**
         * Sub-sub lord (SSL) based on 2241-level KP subdivision. Third level of Vimshottari dasha proportions.
         */
        subSubLord: string;
        /**
         * KP horary number (1-249)
         */
        kpNumber: number;
        /**
         * Whether planet is in retrograde motion
         */
        retrograde: boolean;
    }>;
};
export type KpPlanetsRequest = {
    /**
     * Birth date in YYYY-MM-DD format
     */
    date: string;
    /**
     * Birth time in 24-hour HH:MM:SS format
     */
    time: string;
    /**
     * Birth location latitude in decimal degrees
     */
    latitude: number;
    /**
     * Birth location longitude in decimal degrees
     */
    longitude: number;
    /**
     * Timezone offset from UTC in hours. Defaults to 5.5 (IST) for Vedic astrology.
     */
    timezone?: number | string;
    /**
     * Ayanamsa system for sidereal conversion. "kp-newcomb" uses the KP-Newcomb dynamic formula (most common for KP). "kp-old" uses the Krishnamurti original table. "lahiri" uses Lahiri/Chitrapaksha ayanamsa matching most traditional Vedic software. "custom" allows providing your own value via ayanamsaValue. Defaults to "kp-newcomb".
     */
    ayanamsa?: 'kp-newcomb' | 'kp-old' | 'lahiri' | 'custom';
    /**
     * Custom ayanamsa value in degrees. When provided, overrides the computed ayanamsa from the selected type. Use for testing with specific ayanamsa values or matching a particular reference source.
     */
    ayanamsaValue?: number;
    /**
     * Lunar node type for Rahu and Ketu positions. "mean" uses the smooth mean node (traditional Vedic astrology default). "true" uses the osculating node with perturbation corrections, oscillating up to 1.5 degrees from mean with a 173-day period. Impacts KP sub-lord assignments in narrow boundary cases. Defaults to "mean".
     */
    nodeType?: 'mean' | 'true';
};
export type KpCuspsResponse = {
    /**
     * Applied ayanamsa value in degrees
     */
    ayanamsa: number;
    /**
     * House system used for calculations
     */
    houseSystem: string;
    cusps: Array<{
        /**
         * House number (1-12)
         */
        house: number;
        /**
         * Cusp longitude in degrees (0-360)
         */
        longitude: number;
        /**
         * Zodiac sign of the cusp
         */
        sign: string;
        /**
         * Rashi lord (sign ruler) of this cusp. In KP, the cusp sign lord is a significator for this house.
         */
        signLord: string;
        /**
         * Nakshatra (lunar mansion) at this cusp degree. The cusp nakshatra lord and sublord together determine the houses complete significator chain.
         */
        nakshatra: string;
        /**
         * Nakshatra lord (star ruler) of the cusp. One of 9 Vimshottari dasha lords. Determines which planet activates this cusp in KP predictions.
         */
        nakshatraLord: string;
        /**
         * Nakshatra pada/quarter (1-4)
         */
        pada: number;
        /**
         * Star-lord (nakshatra lord)
         */
        starLord: string;
        /**
         * Sub-lord based on KP 249-level subdivision
         */
        subLord: string;
        /**
         * Sub-sub lord (SSL) based on 2241-level KP subdivision. Third level of Vimshottari dasha proportions.
         */
        subSubLord: string;
        /**
         * KP horary number (1-249)
         */
        kpNumber: number;
    }>;
};
export type KpCuspsRequest = {
    /**
     * Birth date in YYYY-MM-DD format
     */
    date: string;
    /**
     * Birth time in 24-hour HH:MM:SS format
     */
    time: string;
    /**
     * Birth location latitude in decimal degrees
     */
    latitude: number;
    /**
     * Birth location longitude in decimal degrees
     */
    longitude: number;
    /**
     * Timezone offset from UTC in hours. Defaults to 5.5 (IST) for Vedic astrology.
     */
    timezone?: number | string;
    /**
     * Ayanamsa system for sidereal conversion. "kp-newcomb" uses the KP-Newcomb dynamic formula (most common for KP). "kp-old" uses the Krishnamurti original table. "lahiri" uses Lahiri/Chitrapaksha ayanamsa matching most traditional Vedic software. "custom" allows providing your own value via ayanamsaValue. Defaults to "kp-newcomb".
     */
    ayanamsa?: 'kp-newcomb' | 'kp-old' | 'lahiri' | 'custom';
    /**
     * Custom ayanamsa value in degrees. When provided, overrides the computed ayanamsa from the selected type. Use for testing with specific ayanamsa values or matching a particular reference source.
     */
    ayanamsaValue?: number;
};
export type KpChartResponse = {
    /**
     * Chart metadata including birth data, ayanamsa, and house system.
     */
    meta: {
        /**
         * Birth date in YYYY-MM-DD format used for this KP chart calculation.
         */
        date: string;
        /**
         * Birth time in HH:MM:SS format used for Lagna and Placidus cusp calculations.
         */
        time: string;
        /**
         * Birth location latitude in decimal degrees. Determines Placidus house cusps and Ascendant.
         */
        latitude: number;
        /**
         * Birth location longitude in decimal degrees. Affects local sidereal time for house calculations.
         */
        longitude: number;
        /**
         * Timezone offset from UTC in decimal hours used for time conversion.
         */
        timezone: number;
        /**
         * KP Newcomb ayanamsa value in degrees. Precession correction applied to convert tropical to sidereal positions.
         */
        ayanamsa: number;
        /**
         * Ayanamsa system used (KP Newcomb).
         */
        ayanamsaType: string;
        /**
         * House system used (Placidus, standard for KP astrology).
         */
        houseSystem: string;
    };
    /**
     * Ascendant (Lagna) details with full KP stellar hierarchy.
     */
    ascendant: {
        /**
         * Sidereal longitude of Ascendant (Lagna) in degrees.
         */
        longitude: number;
        /**
         * Zodiac sign of the Ascendant.
         */
        sign: string;
        /**
         * Nakshatra (star) of the Ascendant.
         */
        nakshatra: string;
        /**
         * Lord of the Ascendant nakshatra.
         */
        nakshatraLord: string;
        /**
         * Nakshatra pada (1-4) of the Ascendant.
         */
        pada: number;
        /**
         * KP star lord of the Ascendant position.
         */
        starLord: string;
        /**
         * KP sub lord of the Ascendant. crucial for KP predictions. The Ascendant sub lord determines overall life promise.
         */
        subLord: string;
        /**
         * KP sub-sub lord (SSL) of the Ascendant. Third level of the Vimshottari subdivision hierarchy, used for fine-tuning predictions.
         */
        subSubLord: string;
        /**
         * KP number (1-249) for the Ascendant degree.
         */
        kpNumber: number;
    };
    /**
     * All 12 Placidus house cusps with KP stellar hierarchy. Cusp sub lords are the primary predictive tool in KP astrology.
     */
    cusps: Array<{
        /**
         * House number (1-12).
         */
        house: number;
        /**
         * Placidus cusp longitude in sidereal degrees.
         */
        longitude: number;
        /**
         * Zodiac sign at the cusp.
         */
        sign: string;
        /**
         * Lord of the zodiac sign at the cusp (house owner).
         */
        signLord: string;
        /**
         * Nakshatra at the cusp degree.
         */
        nakshatra: string;
        /**
         * Lord of the nakshatra at the cusp.
         */
        nakshatraLord: string;
        /**
         * Nakshatra pada (1-4) at the cusp.
         */
        pada: number;
        /**
         * KP star lord of the cusp.
         */
        starLord: string;
        /**
         * KP sub lord of the cusp. the deciding factor for house-level predictions in KP astrology.
         */
        subLord: string;
        /**
         * KP sub-sub lord (SSL) of the cusp. Third level of Vimshottari subdivision for fine-grained cusp analysis.
         */
        subSubLord: string;
        /**
         * KP number (1-249) for the cusp degree.
         */
        kpNumber: number;
    }>;
    /**
     * Positions of all 7 visible planets with complete KP stellar breakdown.
     */
    planets: Array<{
        /**
         * Planet name (Sun through Saturn, 7 visible planets).
         */
        planet: string;
        /**
         * Sidereal longitude in degrees (KP ayanamsa corrected).
         */
        longitude: number;
        /**
         * Zodiac sign the planet occupies.
         */
        sign: string;
        /**
         * House number (1-12) based on Placidus cusps.
         */
        house: number;
        /**
         * Nakshatra the planet occupies.
         */
        nakshatra: string;
        /**
         * Nakshatra lord (same as star lord).
         */
        nakshatraLord: string;
        /**
         * Nakshatra pada (1-4).
         */
        pada: number;
        /**
         * KP star lord, determines primary house signification.
         */
        starLord: string;
        /**
         * KP sub lord, the decisive factor. Planet gives results of the houses signified by its sub lord.
         */
        subLord: string;
        /**
         * KP sub-sub lord (SSL) of the planet. Third level of Vimshottari subdivision for precise timing analysis.
         */
        subSubLord: string;
        /**
         * KP number (1-249).
         */
        kpNumber: number;
        /**
         * True if planet is retrograde. Retrograde planets may delay or deny results in KP system.
         */
        retrograde: boolean;
    }>;
    /**
     * Lunar nodes (Rahu and Ketu) with KP stellar hierarchy. Nodes are powerful agents that amplify the significations of their dispositors.
     */
    nodes: {
        /**
         * Rahu (North Lunar Node), shadow planet, always retrograde, acts as agent of its sign lord and star lord.
         */
        rahu: {
            /**
             * Sidereal longitude of Rahu (North Node).
             */
            longitude: number;
            /**
             * Zodiac sign Rahu occupies.
             */
            sign: string;
            /**
             * Occupied house number (1-12) based on Placidus cusps.
             */
            house: number;
            /**
             * Nakshatra of Rahu.
             */
            nakshatra: string;
            /**
             * KP star lord of Rahu.
             */
            starLord: string;
            /**
             * KP sub lord of Rahu.
             */
            subLord: string;
            /**
             * KP sub-sub lord (SSL) of Rahu.
             */
            subSubLord: string;
        };
        /**
         * Ketu (South Lunar Node), shadow planet, spiritual karmic indicator.
         */
        ketu: {
            /**
             * Sidereal longitude of Ketu (South Node). Always 180 degrees from Rahu.
             */
            longitude: number;
            /**
             * Zodiac sign Ketu occupies.
             */
            sign: string;
            /**
             * Occupied house number (1-12) based on Placidus cusps.
             */
            house: number;
            /**
             * Nakshatra of Ketu.
             */
            nakshatra: string;
            /**
             * KP star lord of Ketu.
             */
            starLord: string;
            /**
             * KP sub lord of Ketu.
             */
            subLord: string;
            /**
             * KP sub-sub lord (SSL) of Ketu.
             */
            subSubLord: string;
        };
    };
    /**
     * KP significators for event prediction and timing. Shows which planets signify each house (house-wise) and which houses each planet signifies (planet-wise). Strength order: Level 1 (planets in star of occupant) > Level 2 (occupants) > Level 3 (planets in star of owner) > Level 4 (house owner).
     */
    significators: {
        houseWise: Array<{
            /**
             * House number 1-12
             */
            house: number;
            significators: Array<{
                /**
                 * KP significator strength level (1-4). L1: planets in star of occupant (strongest). L2: occupant itself. L3: planets in star of owner. L4: sign owner. Lower number = stronger signification for this house.
                 */
                level: number;
                /**
                 * Human-readable label for this KP significator level.
                 */
                description: string;
                /**
                 * Planets signifying this house at this strength level.
                 */
                planets: Array<string>;
            }>;
            /**
             * All significators in order of strength
             */
            all: Array<string>;
        }>;
        planetWise: Array<{
            /**
             * Vedic graha (planet) being analyzed for its house significations.
             */
            planet: string;
            signifies: Array<{
                /**
                 * KP significator strength level (1-4). L1 strongest, L4 weakest.
                 */
                level: number;
                /**
                 * House numbers this planet signifies at this strength level.
                 */
                houses: Array<number>;
            }>;
            /**
             * All houses signified in order of strength
             */
            allHouses: Array<number>;
        }>;
    };
};
export type KpChartRequest = {
    /**
     * Birth date in YYYY-MM-DD format
     */
    date: string;
    /**
     * Birth time in 24-hour HH:MM:SS format. CRITICAL for accurate Lagna and house calculations.
     */
    time: string;
    /**
     * Birth location latitude in decimal degrees
     */
    latitude: number;
    /**
     * Birth location longitude in decimal degrees
     */
    longitude: number;
    /**
     * Timezone offset from UTC in hours. Defaults to 5.5 (IST) for Vedic astrology.
     */
    timezone?: number | string;
    /**
     * Ayanamsa system for sidereal conversion. "kp-newcomb" uses the KP-Newcomb dynamic formula (most common for KP). "kp-old" uses the Krishnamurti original table. "lahiri" uses Lahiri/Chitrapaksha ayanamsa matching most traditional Vedic software. "custom" allows providing your own value via ayanamsaValue. Defaults to "kp-newcomb".
     */
    ayanamsa?: 'kp-newcomb' | 'kp-old' | 'lahiri' | 'custom';
    /**
     * Custom ayanamsa value in degrees. When provided, overrides the computed ayanamsa from the selected type. Use for testing with specific ayanamsa values or matching a particular reference source.
     */
    ayanamsaValue?: number;
    /**
     * Lunar node type for Rahu and Ketu positions. "mean" uses the smooth mean node (traditional Vedic astrology default). "true" uses the osculating node with perturbation corrections, oscillating up to 1.5 degrees from mean with a 173-day period. Impacts KP sub-lord assignments in narrow boundary cases. Defaults to "mean".
     */
    nodeType?: 'mean' | 'true';
};
export type KpRulingPlanetsResponse = {
    /**
     * Calculation datetime (ISO 8601)
     */
    datetime: string;
    /**
     * Observer location coordinates
     */
    location: {
        latitude: number;
        longitude: number;
        timezone: number;
    };
    /**
     * Lord of the weekday (Sun=Sunday through Saturn=Saturday)
     */
    dayLord: string;
    /**
     * Lord of the zodiac sign where Moon is placed
     */
    moonSignLord: string;
    /**
     * Lord of the nakshatra where Moon is placed
     */
    moonStarLord: string;
    /**
     * Sub-lord of the KP division where Moon is placed
     */
    moonSublord: string;
    /**
     * Sub-sub lord (SSL) of the KP division where Moon is placed
     */
    moonSubSublord: string;
    /**
     * Lord of the rising zodiac sign (Ascendant)
     */
    lagnaSignLord: string;
    /**
     * Lord of the nakshatra where Ascendant falls
     */
    lagnaStarLord: string;
    /**
     * Sub-lord of the KP division where Ascendant falls
     */
    lagnaSublord: string;
    /**
     * Sub-sub lord (SSL) of the KP division where Ascendant falls
     */
    lagnaSubSublord: string;
    /**
     * Unique ruling planets in order of strength. Strongest planet appears first.
     */
    rulingPlanets: Array<string>;
    /**
     * Houses signified by each ruling planet (only when birthDate and birthTime provided). Based on 4-level KP significator hierarchy from birth chart.
     */
    significators?: Array<{
        /**
         * Planet abbreviation.
         */
        planet: string;
        /**
         * Houses this planet signifies, ordered by KP 4-level strength: L1 (planet in star of occupant, strongest), L2 (planet occupies), L3 (planet in star of owner), L4 (planet owns). First element is the strongest signification, not the occupied house.
         */
        signifies: Array<number>;
    }>;
};
export type KpRulingPlanetsIntervalResponse = {
    /**
     * Start of the KP ruling planets interval range (ISO 8601).
     */
    startDatetime: string;
    /**
     * End of the KP ruling planets interval range (ISO 8601).
     */
    endDatetime: string;
    /**
     * Time gap between consecutive ruling planet calculations in minutes.
     */
    intervalMinutes: number;
    /**
     * Observer location coordinates used for erecting the Placidus prashna chart at each interval.
     */
    location: {
        /**
         * Observer latitude used for Placidus house and Lagna (Ascendant) calculation.
         */
        latitude: number;
        /**
         * Observer longitude used for local sidereal time and Ascendant degree.
         */
        longitude: number;
        /**
         * Timezone offset applied to output times and sunrise-based Day Lord calculation.
         */
        timezone: number;
    };
    /**
     * Total number of intervals returned
     */
    totalIntervals: number;
    /**
     * Ruling planets with significators at each interval
     */
    intervals: Array<{
        /**
         * UTC date for this interval (YYYY-MM-DD).
         */
        date: string;
        /**
         * UTC time for this interval (HH:MM, 24-hour).
         */
        time: string;
        /**
         * Full ISO 8601 timestamp for this interval.
         */
        datetime: string;
        /**
         * Ruling planet of the weekday based on Hindu sunrise Vara. Changes at local sunrise, not midnight.
         */
        dayLord: string;
        /**
         * Lord of the zodiac sign (rashi) where Moon is placed at this moment.
         */
        moonSignLord: string;
        /**
         * Lord of the nakshatra (star, 1 of 27) where Moon is placed. Follows Vimshottari dasha sequence.
         */
        moonStarLord: string;
        /**
         * KP sublord of Moons exact position within the nakshatra subdivision (1 of 249).
         */
        moonSublord: string;
        /**
         * KP sub-sublord (SSL) of Moons position. Finest subdivision for precise timing.
         */
        moonSubSublord: string;
        /**
         * Lord of the Ascendant (Lagna) zodiac sign. Changes roughly every 2 hours as houses rotate.
         */
        lagnaSignLord: string;
        /**
         * Lord of the nakshatra where the Ascendant degree falls.
         */
        lagnaStarLord: string;
        /**
         * KP sublord of the Ascendant degree. Changes every few minutes. key for birth time rectification.
         */
        lagnaSublord: string;
        /**
         * KP sub-sublord of the Ascendant. Most granular level for pinpointing exact moments.
         */
        lagnaSubSublord: string;
        /**
         * Unique set of ruling planets derived from Day Lord, Moon Sign/Star Lords, and Lagna Sign/Star Lords. In KP astrology, events manifest when dasha/transit planets match these ruling planets.
         */
        rulingPlanets: Array<string>;
        /**
         * KP significators for each ruling planet calculated from this moments Placidus chart. Shows which houses (1-12) each ruling planet signifies right now. Significators change as the Ascendant rotates through signs.
         */
        significators: Array<{
            /**
             * Ruling planet name.
             */
            planet: string;
            /**
             * Unique house numbers this planet signifies, ordered by strength. Uses 4-level KP hierarchy: Level 1 (strongest) planets in star of occupant, Level 2 occupants, Level 3 planets in star of owner, Level 4 owner.
             */
            signifies: Array<number>;
        }>;
        /**
         * KP 4-level significator breakdown for the Moon Sign Lord planet. Shows which houses the Moon rashi lord activates at this moment, broken down by strength tier.
         */
        moonSignLordSignifies: {
            /**
             * Level 1 (strongest signification). Houses influenced because this planet sits in the nakshatra (star) of a planet occupying those houses. For Rahu and Ketu, also includes L1 houses from agent planets (conjoined, aspecting, sign lord).
             */
            L1: Array<number>;
            /**
             * Level 2. The house this planet physically occupies in the chart. For Rahu and Ketu, also includes houses occupied by agent planets (conjoined, aspecting, sign lord).
             */
            L2: Array<number>;
            /**
             * Level 3. Houses influenced because this planet sits in the nakshatra of the sign lord (owner) of those houses. For Rahu and Ketu, also includes L3 houses from agent planets.
             */
            L3: Array<number>;
            /**
             * Level 4 (weakest signification). Houses this planet rules by zodiac sign ownership. For Sun through Saturn, can be up to 2 houses. For Rahu and Ketu, includes houses owned by agent planets (conjoined, aspecting, sign lord).
             */
            L4: Array<number>;
        };
        /**
         * KP 4-level significator breakdown for the Moon Star Lord (nakshatra lord) planet. The star lord determines the nature of results Moon delivers.
         */
        moonStarLordSignifies: {
            /**
             * Level 1 (strongest signification). Houses influenced because this planet sits in the nakshatra (star) of a planet occupying those houses. For Rahu and Ketu, also includes L1 houses from agent planets (conjoined, aspecting, sign lord).
             */
            L1: Array<number>;
            /**
             * Level 2. The house this planet physically occupies in the chart. For Rahu and Ketu, also includes houses occupied by agent planets (conjoined, aspecting, sign lord).
             */
            L2: Array<number>;
            /**
             * Level 3. Houses influenced because this planet sits in the nakshatra of the sign lord (owner) of those houses. For Rahu and Ketu, also includes L3 houses from agent planets.
             */
            L3: Array<number>;
            /**
             * Level 4 (weakest signification). Houses this planet rules by zodiac sign ownership. For Sun through Saturn, can be up to 2 houses. For Rahu and Ketu, includes houses owned by agent planets (conjoined, aspecting, sign lord).
             */
            L4: Array<number>;
        };
        /**
         * KP 4-level significator breakdown for the Moon Sub Lord planet. The sub lord determines whether Moon-related events will manifest.
         */
        moonSublordSignifies: {
            /**
             * Level 1 (strongest signification). Houses influenced because this planet sits in the nakshatra (star) of a planet occupying those houses. For Rahu and Ketu, also includes L1 houses from agent planets (conjoined, aspecting, sign lord).
             */
            L1: Array<number>;
            /**
             * Level 2. The house this planet physically occupies in the chart. For Rahu and Ketu, also includes houses occupied by agent planets (conjoined, aspecting, sign lord).
             */
            L2: Array<number>;
            /**
             * Level 3. Houses influenced because this planet sits in the nakshatra of the sign lord (owner) of those houses. For Rahu and Ketu, also includes L3 houses from agent planets.
             */
            L3: Array<number>;
            /**
             * Level 4 (weakest signification). Houses this planet rules by zodiac sign ownership. For Sun through Saturn, can be up to 2 houses. For Rahu and Ketu, includes houses owned by agent planets (conjoined, aspecting, sign lord).
             */
            L4: Array<number>;
        };
        /**
         * KP 4-level significator breakdown for Moon itself. Shows which bhavas Moon directly activates based on its position and star lord in the current moment chart.
         */
        moonSignifies: {
            /**
             * Level 1 (strongest signification). Houses influenced because this planet sits in the nakshatra (star) of a planet occupying those houses. For Rahu and Ketu, also includes L1 houses from agent planets (conjoined, aspecting, sign lord).
             */
            L1: Array<number>;
            /**
             * Level 2. The house this planet physically occupies in the chart. For Rahu and Ketu, also includes houses occupied by agent planets (conjoined, aspecting, sign lord).
             */
            L2: Array<number>;
            /**
             * Level 3. Houses influenced because this planet sits in the nakshatra of the sign lord (owner) of those houses. For Rahu and Ketu, also includes L3 houses from agent planets.
             */
            L3: Array<number>;
            /**
             * Level 4 (weakest signification). Houses this planet rules by zodiac sign ownership. For Sun through Saturn, can be up to 2 houses. For Rahu and Ketu, includes houses owned by agent planets (conjoined, aspecting, sign lord).
             */
            L4: Array<number>;
        };
    }>;
};
export type KpSublordChangesResponse = {
    /**
     * Vedic graha tracked for KP sublord transitions across the 249-division zodiac.
     */
    planet: string;
    /**
     * Beginning of the sublord change search range (YYYY-MM-DD).
     */
    startDate: string;
    /**
     * End of the sublord change search range (YYYY-MM-DD).
     */
    endDate: string;
    /**
     * Total Krishnamurti sublord transitions detected. Moon crosses ~14 sublords per day due to its fast motion.
     */
    totalChanges: number;
    /**
     * Chronological list of KP sublord boundary crossings. Each entry marks when the tracked graha moves from one Krishnamurti subdivision to the next in the 249-part zodiac.
     */
    changes: Array<{
        /**
         * Date of the sublord boundary crossing (YYYY-MM-DD). Adjusted to requested timezone.
         */
        date: string;
        /**
         * Precise sublord transition time (HH:MM, 24-hour). Refined via binary search to ~1 minute accuracy. Adjusted to requested timezone.
         */
        time: string;
        /**
         * Full datetime of the KP sublord change. Adjusted to requested timezone for prashna kundali timing.
         */
        datetime: string;
        /**
         * Previous KP number (1-249) in the Vimshottari-based zodiac subdivision the planet occupied.
         */
        fromKp: number;
        /**
         * New KP number (1-249) the planet enters. Each number maps to a unique star lord and sublord combination.
         */
        toKp: number;
        /**
         * KP sublord planet before transition. The sublord determines whether an event signified by the star lord will manifest.
         */
        fromSublord: string;
        /**
         * New KP sublord planet after transition. A change in sublord shifts the houses signified by the tracked planet.
         */
        toSublord: string;
        /**
         * Nakshatra lord (star lord) before transition. Follows the Vimshottari dasha sequence of 9 planets.
         */
        fromNakshatraLord: string;
        /**
         * Nakshatra lord after transition. Changes only when the planet crosses a nakshatra boundary (every 13d20m).
         */
        toNakshatraLord: string;
    }>;
};
export type KpSublordChangesRequest = {
    /**
     * Planet to track (case-insensitive). Valid values: Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn
     */
    planet: string;
    /**
     * Start date for sublord change search (YYYY-MM-DD format)
     */
    startDate: string;
    /**
     * End date for sublord change search (YYYY-MM-DD format)
     */
    endDate: string;
    /**
     * Decimal hours from UTC OR IANA name (e.g. "Asia/Kolkata"). IANA resolved to the DST-correct offset for startDate. Output times are converted to this timezone. Defaults to 0 (UTC).
     */
    timezone?: number | string;
    /**
     * Ayanamsa system for sidereal conversion. "kp-newcomb" uses the KP-Newcomb dynamic formula, the most common choice for KP astrology. "kp-old" uses the Krishnamurti original table from KP Reader-1 with constant precession rate. "lahiri" uses Lahiri/Chitrapaksha ayanamsa, matching most traditional Vedic software. Defaults to "kp-newcomb".
     */
    ayanamsa?: 'kp-newcomb' | 'kp-old' | 'lahiri';
    /**
     * Lunar node type for Rahu and Ketu positions. "mean" uses the smooth mean node (traditional Vedic astrology default). "true" uses the osculating node with perturbation corrections, oscillating up to 1.5 degrees from mean with a 173-day period. Impacts KP sub-lord assignments in narrow boundary cases. Defaults to "mean".
     */
    nodeType?: 'mean' | 'true';
};
export type KpRasiChangesResponse = {
    /**
     * Vedic graha being tracked for rasi parivartan (sign ingress) events.
     */
    planet: string;
    /**
     * Beginning of the rasi change search range (YYYY-MM-DD).
     */
    startDate: string;
    /**
     * End of the rasi change search range (YYYY-MM-DD).
     */
    endDate: string;
    /**
     * Total rasi parivartan events detected in the date range. Moon averages 12-13 per month, Sun once per month.
     */
    totalChanges: number;
    /**
     * Chronological list of rasi parivartan (zodiac sign change) events with precise ingress timestamps. Each entry marks when the tracked graha crosses a 30-degree sign boundary.
     */
    changes: Array<{
        /**
         * Date of the rasi ingress event (YYYY-MM-DD). Adjusted to requested timezone for local panchang use.
         */
        date: string;
        /**
         * Precise ingress time (HH:MM, 24-hour). Calculated via binary search refinement to ~1 minute accuracy. Adjusted to requested timezone.
         */
        time: string;
        /**
         * Full rasi parivartan datetime. Adjusted to requested timezone for transit calendar integration.
         */
        datetime: string;
        /**
         * Zodiac sign (rashi) the planet is leaving. One of 12 sidereal signs using KP ayanamsa.
         */
        fromSign: string;
        /**
         * Rashi lord (planetary ruler) of the departing sign. Determines the Vimshottari dasha connection.
         */
        fromSignLord: string;
        /**
         * New zodiac sign entered by the planet. Marks the beginning of a new transit phase in Vedic gochar analysis.
         */
        toSign: string;
        /**
         * Rashi lord of the newly entered sign. Key for KP significator analysis and dasha-transit matching.
         */
        toSignLord: string;
    }>;
};
export type KpRasiChangesRequest = {
    /**
     * Planet to track (case-insensitive). Valid values: Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn
     */
    planet: string;
    /**
     * Start date for sign ingress search (YYYY-MM-DD format)
     */
    startDate: string;
    /**
     * End date for sign ingress search (YYYY-MM-DD format)
     */
    endDate: string;
    /**
     * Decimal hours from UTC OR IANA name (e.g. "Asia/Kolkata"). IANA resolved to the DST-correct offset for startDate. Output times are converted to this timezone. Defaults to 0 (UTC).
     */
    timezone?: number | string;
    /**
     * Ayanamsa system for sidereal conversion. "kp-newcomb" uses the KP-Newcomb dynamic formula, the most common choice for KP astrology. "kp-old" uses the Krishnamurti original table from KP Reader-1 with constant precession rate. "lahiri" uses Lahiri/Chitrapaksha ayanamsa, matching most traditional Vedic software. Defaults to "kp-newcomb".
     */
    ayanamsa?: 'kp-newcomb' | 'kp-old' | 'lahiri';
    /**
     * Lunar node type for Rahu and Ketu positions. "mean" uses the smooth mean node (traditional Vedic astrology default). "true" uses the osculating node with perturbation corrections, oscillating up to 1.5 degrees from mean with a 173-day period. Impacts KP sub-lord assignments in narrow boundary cases. Defaults to "mean".
     */
    nodeType?: 'mean' | 'true';
};
export type KpPlanetsIntervalResponse = {
    /**
     * Start of the KP ephemeris interval range (ISO 8601).
     */
    startDatetime: string;
    /**
     * End of the KP ephemeris interval range (ISO 8601).
     */
    endDatetime: string;
    /**
     * Time gap between consecutive planetary snapshots in minutes. Determines the granularity of the KP transit table.
     */
    intervalMinutes: number;
    /**
     * Total number of time points calculated (inclusive of both start and end).
     */
    totalIntervals: number;
    /**
     * Ayanamsa system used for this calculation. "kp-newcomb" = KP-Newcomb (dynamic), "kp-old" = Krishnamurti original (constant rate), "lahiri" = Lahiri/Chitrapaksha.
     */
    ayanamsa: string;
    /**
     * Ayanamsa value in degrees used for sidereal conversion. Verify this against your reference source to confirm correct ayanamsa is applied.
     */
    ayanamsaValue: number;
    /**
     * Array of planetary snapshots at each time interval
     */
    intervals: Array<{
        /**
         * Date for this data point (YYYY-MM-DD). Adjusted to requested timezone.
         */
        date: string;
        /**
         * Time for this data point (HH:MM). Adjusted to requested timezone.
         */
        time: string;
        /**
         * Full datetime for this data point. Adjusted to requested timezone.
         */
        datetime: string;
        /**
         * Planet positions keyed by planet name (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu)
         */
        planets: {
            [key: string]: {
                /**
                 * Sidereal longitude in degrees (0-360) using KP ayanamsa. The primary coordinate for all KP sublord lookups.
                 */
                longitude: number;
                /**
                 * Degree within the current rashi (0-30). Useful for gauging how far into a sign the planet has progressed.
                 */
                degreeInSign: number;
                /**
                 * Sidereal zodiac sign (rashi) the planet occupies at this interval.
                 */
                sign: string;
                /**
                 * Rashi lord (sign ruler). First level of the KP significator hierarchy. Its house ownership determines L4 significations for this planet.
                 */
                signLord: string;
                /**
                 * Nakshatra (lunar mansion) the planet occupies. One of 27 Vedic nakshatras spanning 13 degrees 20 minutes each.
                 */
                nakshatra: string;
                /**
                 * Star lord (nakshatra ruler) from Vimshottari dasha sequence. Determines the nature of results this planet delivers. Its occupied and owned houses become L1 and L3 significations.
                 */
                nakshatraLord: string;
                /**
                 * KP sublord within the 249-part zodiac division. The deciding factor in KP predictions. An event manifests only if the sublord signifies the relevant house.
                 */
                sublord: string;
                /**
                 * KP sub-sublord (SSL). Third level of Vimshottari subdivision (2,241 divisions). Refines timing within the sublord period for precise event prediction.
                 */
                subSublord: string;
                /**
                 * KP number (1-249) identifying the exact Vimshottari subdivision. Each number maps to a unique star lord and sublord combination.
                 */
                kpNumber: number;
                /**
                 * True if the planet is in retrograde (vakri) motion. Rahu and Ketu are always retrograde. Retrograde planets deliver results differently in KP analysis.
                 */
                isRetrograde: boolean;
            };
        };
    }>;
};
export type KpPlanetsIntervalRequest = {
    /**
     * Start datetime in ISO 8601 format. Always interpreted as local time when a non-zero timezone is provided (Z suffix is ignored). With timezone 0, Z suffix is treated as UTC.
     */
    startDatetime: string;
    /**
     * End datetime in ISO 8601 format. Maximum 7 days from start. Always interpreted as local time when a non-zero timezone is provided (Z suffix is ignored).
     */
    endDatetime: string;
    /**
     * Time between calculations in minutes. Range: 15 (quarter-hourly) to 1440 (daily).
     */
    intervalMinutes: number;
    /**
     * Observer latitude in decimal degrees (for future Lagna calculations)
     */
    latitude: number;
    /**
     * Observer longitude in decimal degrees (for future Lagna calculations)
     */
    longitude: number;
    /**
     * Decimal hours from UTC OR IANA name (e.g. "Asia/Kolkata"). IANA resolved to the DST-correct offset for the startDatetime date. When non-zero, all datetimes are treated as local time in this timezone (Z suffix is ignored). Defaults to 0 (UTC).
     */
    timezone?: number | string;
    /**
     * Ayanamsa system for sidereal conversion. "kp-newcomb" uses the KP-Newcomb dynamic formula, the most common choice for KP astrology. "kp-old" uses the Krishnamurti original table from KP Reader-1 with constant precession rate. "lahiri" uses Lahiri/Chitrapaksha ayanamsa, matching most traditional Vedic software. Defaults to "kp-newcomb".
     */
    ayanamsa?: 'kp-newcomb' | 'kp-old' | 'lahiri';
    /**
     * Lunar node type for Rahu and Ketu positions. "mean" uses the smooth mean node (traditional Vedic astrology default). "true" uses the osculating node with perturbation corrections, oscillating up to 1.5 degrees from mean with a 173-day period. Impacts KP sub-lord assignments in narrow boundary cases. Defaults to "mean".
     */
    nodeType?: 'mean' | 'true';
};
export type RashiListResponse = Array<{
    /**
     * Unique slug identifier for the rashi. Used in URL paths and cross-references.
     */
    id: string;
    /**
     * Western zodiac sign name corresponding to this Vedic rashi.
     */
    name: string;
    /**
     * Sanskrit name of the rashi as used in Vedic astrology (Jyotish).
     */
    vedicName: string;
    /**
     * Approximate sidereal date range when the Sun transits this rashi.
     */
    dateRange: string;
    /**
     * Traditional symbol associated with this zodiac sign.
     */
    symbol: string;
    /**
     * Aditya (solar deity) governing this rashi in Vedic tradition.
     */
    energy: string;
    /**
     * Key personality traits and behavioral tendencies of natives born under this rashi.
     */
    characteristics: string;
}>;
export type RashiResponse = {
    /**
     * Unique slug identifier for the rashi. Used in URL paths and cross-references.
     */
    id: string;
    /**
     * Western zodiac sign name corresponding to this Vedic rashi.
     */
    name: string;
    /**
     * Sanskrit name of the rashi as used in Vedic astrology (Jyotish).
     */
    vedicName: string;
    /**
     * Approximate sidereal date range when the Sun transits this rashi.
     */
    dateRange: string;
    /**
     * Traditional symbol associated with this zodiac sign.
     */
    symbol: string;
    /**
     * Aditya (solar deity) governing this rashi in Vedic tradition.
     */
    energy: string;
    /**
     * Key personality traits and behavioral tendencies of natives born under this rashi.
     */
    characteristics: string;
};
export type NakshatraListResponse = Array<{
    /**
     * Unique slug identifier for the nakshatra. Used in URL paths and cross-references.
     */
    id: string;
    /**
     * Nakshatra name as used in Vedic astrology. One of 27 lunar mansions spanning 13 degrees 20 minutes each.
     */
    name: string;
    /**
     * Sequential number (1-27) of this nakshatra in the zodiac starting from 0 degrees Aries.
     */
    number: number;
    /**
     * Sidereal longitude range this nakshatra occupies within its zodiac sign.
     */
    range: string;
    /**
     * Ruling planet (nakshatra lord) used in Vimshottari dasha calculations. Determines the planetary period sequence.
     */
    lord: string;
    /**
     * Presiding deity of the nakshatra. Influences the spiritual qualities and mythology associated with natives.
     */
    deity: string;
    /**
     * Traditional symbol representing this nakshatra. Reflects its core nature and energy.
     */
    symbol: string;
    /**
     * Personality traits, behavioral tendencies, and life themes for natives born under this nakshatra.
     */
    characteristics: string;
    /**
     * Traditional Vedic remedies including mantras, gemstones, and rituals for this nakshatra.
     */
    remedies: {
        /**
         * Recommended mantras for this nakshatra to enhance positive qualities.
         */
        mantras: string;
        /**
         * Recommended gemstones aligned with the ruling planet of this nakshatra.
         */
        gemstones: string;
        /**
         * Spiritual practices and daily rituals beneficial for natives of this nakshatra.
         */
        rituals: string;
    };
}>;
export type NakshatraResponse = {
    /**
     * Unique slug identifier for the nakshatra. Used in URL paths and cross-references.
     */
    id: string;
    /**
     * Nakshatra name as used in Vedic astrology. One of 27 lunar mansions spanning 13 degrees 20 minutes each.
     */
    name: string;
    /**
     * Sequential number (1-27) of this nakshatra in the zodiac starting from 0 degrees Aries.
     */
    number: number;
    /**
     * Sidereal longitude range this nakshatra occupies within its zodiac sign.
     */
    range: string;
    /**
     * Ruling planet (nakshatra lord) used in Vimshottari dasha calculations. Determines the planetary period sequence.
     */
    lord: string;
    /**
     * Presiding deity of the nakshatra. Influences the spiritual qualities and mythology associated with natives.
     */
    deity: string;
    /**
     * Traditional symbol representing this nakshatra. Reflects its core nature and energy.
     */
    symbol: string;
    /**
     * Personality traits, behavioral tendencies, and life themes for natives born under this nakshatra.
     */
    characteristics: string;
    /**
     * Traditional Vedic remedies including mantras, gemstones, and rituals for this nakshatra.
     */
    remedies: {
        /**
         * Recommended mantras for this nakshatra to enhance positive qualities.
         */
        mantras: string;
        /**
         * Recommended gemstones aligned with the ruling planet of this nakshatra.
         */
        gemstones: string;
        /**
         * Spiritual practices and daily rituals beneficial for natives of this nakshatra.
         */
        rituals: string;
    };
};
/**
 * Complete upagraha positions for a birth chart
 */
export type UpagrahaResponse = {
    /**
     * Time-based upagrahas derived from the 8-part division of day or night. Gulika and Mandi are from Saturn segment, others from Sun, Mars, Mercury, Jupiter segments. Positions depend on birth time, location, and weekday.
     */
    timeBased: Array<{
        /**
         * Upagraha name. Time-based: Gulika, Mandi, Kala, Mrityu, Ardhaprahara, Yamaghantaka. Sun-based: Dhuma, Vyatipata, Parivesha, Indra Chapa, Upaketu.
         */
        name: string;
        /**
         * Sidereal longitude in degrees (0 to 360). Used for house placement and aspect analysis.
         */
        longitude: number;
        /**
         * Zodiac sign (rashi) the upagraha occupies. One of 12 Vedic rashis from Aries to Pisces.
         */
        rashi: string;
        /**
         * Degree position within the occupied rashi (0 to 30).
         */
        degreeInSign: number;
        /**
         * Nakshatra (lunar mansion) the upagraha occupies. One of 27 Vedic nakshatras.
         */
        nakshatra: string;
        /**
         * Nakshatra number (1 to 27). Ashwini = 1, Bharani = 2, through Revati = 27.
         */
        nakshatraIndex: number;
        /**
         * Pada (quarter) within the nakshatra (1 to 4). Each pada spans 3 degrees 20 minutes.
         */
        nakshatraPada: number;
    }>;
    /**
     * Sun-longitude-based upagrahas (Dhuma group). Pure arithmetic from the Sun sidereal position. Dhuma = Sun + 133d20m, then each derived from the previous.
     */
    sunBased: Array<{
        /**
         * Upagraha name. Time-based: Gulika, Mandi, Kala, Mrityu, Ardhaprahara, Yamaghantaka. Sun-based: Dhuma, Vyatipata, Parivesha, Indra Chapa, Upaketu.
         */
        name: string;
        /**
         * Sidereal longitude in degrees (0 to 360). Used for house placement and aspect analysis.
         */
        longitude: number;
        /**
         * Zodiac sign (rashi) the upagraha occupies. One of 12 Vedic rashis from Aries to Pisces.
         */
        rashi: string;
        /**
         * Degree position within the occupied rashi (0 to 30).
         */
        degreeInSign: number;
        /**
         * Nakshatra (lunar mansion) the upagraha occupies. One of 27 Vedic nakshatras.
         */
        nakshatra: string;
        /**
         * Nakshatra number (1 to 27). Ashwini = 1, Bharani = 2, through Revati = 27.
         */
        nakshatraIndex: number;
        /**
         * Pada (quarter) within the nakshatra (1 to 4). Each pada spans 3 degrees 20 minutes.
         */
        nakshatraPada: number;
    }>;
};
export type UpagrahaRequest = {
    /**
     * Birth date in YYYY-MM-DD format. Date determines planetary positions and nakshatra calculations for Vedic kundli (janam patri). Accurate birth date is essential for dashas, yoga calculations, and divisional charts (vargas).
     */
    date: string;
    /**
     * Birth time in 24-hour HH:MM:SS format. Time is CRITICAL for Lagna (Ascendant) calculation and house divisions - changes every ~2 hours. Even minutes matter for accurate nakshatra pada and divisional chart (D9, D10) calculations. Without exact time, Lagna and house-based predictions will be incorrect.
     */
    time: string;
    /**
     * Birth location latitude in decimal degrees. Location determines local sidereal time for Lagna calculation and affects bhava (house) cusps. Example: Delhi 28.6139, Mumbai 19.0760, Kathmandu 27.7172.
     */
    latitude: number;
    /**
     * Birth location longitude in decimal degrees. Affects local time calculations and ayanamsha adjustments. Example: Delhi 77.2090, Mumbai 72.8777, Kathmandu 85.3240.
     */
    longitude: number;
    /**
     * Timezone: decimal hours from UTC (e.g. 5.5 for IST, -5 for EST) OR IANA name (e.g. "Asia/Kolkata", "America/New_York"). IANA strings are resolved to the DST-correct offset for the given date, so you can pass `cities[0].timezone` from /location/search directly. Defaults to 5.5 (IST).
     */
    timezone?: number | string;
};
/**
 * Complete Ashtakavarga analysis for a birth chart
 */
export type AshtakavargaResponse = {
    /**
     * Individual planetary strength grids (Bhinnashtakavarga). Eight entries: one for each of the 7 classical planets plus Lagna. Each entry shows how many of the 8 contributors (7 planets + Lagna) give benefic points to that planet in each of the 12 signs.
     */
    bhinnashtakavarga: Array<{
        /**
         * Planet or Lagna name. Seven classical planets (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn) plus Lagna (Ascendant). Rahu and Ketu are excluded from Ashtakavarga per BPHS.
         */
        planet: string;
        /**
         * Benefic points (bindus) for each of the 12 signs, ordered Aries through Pisces (index 0 = Aries, index 11 = Pisces). Each value ranges from 0 to 8, representing how many of the 8 contributors (7 planets + Lagna) provide a benefic point for this planet in that sign. Higher bindus indicate stronger planetary support.
         */
        bindus: Array<number>;
        /**
         * Sum of bindus across all 12 signs. This total is constant per planet regardless of birth chart: Sun = 48, Moon = 49, Mars = 39, Mercury = 54, Jupiter = 56, Venus = 52, Saturn = 39, Lagna = 49. Useful as a validation checksum.
         */
        total: number;
    }>;
    /**
     * Sarvashtakavarga (SAV) combining all 7 planetary Bhinnashtakavarga scores per sign. Total is always 337.
     */
    sarvashtakavarga: {
        /**
         * Combined benefic points per sign from all 7 planets (Lagna excluded from SAV), ordered Aries through Pisces. Higher values indicate stronger signs for transit predictions and house strength analysis. Average is approximately 28 per sign.
         */
        bindus: Array<number>;
        /**
         * Sum of all SAV bindus across 12 signs. Always equals 337 for every birth chart. This mathematical constant serves as a validation checksum for the calculation.
         */
        total: number;
    };
    /**
     * Reduced Bhinnashtakavarga after two-step Shodhana (purification) per BPHS Ch. 67-68. Step 1: Trikona Shodhana subtracts minimum bindu among trine groups (1-5-9, 2-6-10, 3-7-11, 4-8-12). Step 2: Ekadipati Shodhana adjusts dual-lordship sign pairs (Mars: Aries/Scorpio, Venus: Taurus/Libra, Mercury: Gemini/Virgo, Jupiter: Sagittarius/Pisces, Saturn: Capricorn/Aquarius). Used as input for Shodhya Pinda planetary strength.
     */
    reducedBhinnashtakavarga: Array<{
        /**
         * Planet or Lagna name. Seven classical planets (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn) plus Lagna (Ascendant). Rahu and Ketu are excluded from Ashtakavarga per BPHS.
         */
        planet: string;
        /**
         * Benefic points (bindus) for each of the 12 signs, ordered Aries through Pisces (index 0 = Aries, index 11 = Pisces). Each value ranges from 0 to 8, representing how many of the 8 contributors (7 planets + Lagna) provide a benefic point for this planet in that sign. Higher bindus indicate stronger planetary support.
         */
        bindus: Array<number>;
        /**
         * Sum of bindus across all 12 signs. This total is constant per planet regardless of birth chart: Sun = 48, Moon = 49, Mars = 39, Mercury = 54, Jupiter = 56, Venus = 52, Saturn = 39, Lagna = 49. Useful as a validation checksum.
         */
        total: number;
    }>;
    /**
     * Reduced Sarvashtakavarga. Sum of the 7 reduced planetary Bhinnashtakavarga values per sign (Lagna excluded). Indicates relative sign strength after Shodhana purification.
     */
    reducedSarvashtakavarga: {
        /**
         * Combined benefic points per sign from all 7 planets (Lagna excluded from SAV), ordered Aries through Pisces. Higher values indicate stronger signs for transit predictions and house strength analysis. Average is approximately 28 per sign.
         */
        bindus: Array<number>;
        /**
         * Sum of all SAV bindus across 12 signs. Always equals 337 for every birth chart. This mathematical constant serves as a validation checksum for the calculation.
         */
        total: number;
    };
    /**
     * Shodhya Pinda planetary strength scores per BPHS Ch. 69. Derived from Reduced Ashtakavarga. Each entry contains Rashi Pinda (sign-weighted strength), Graha Pinda (planet-association-weighted strength), and total Shodhya Pinda. Used for comparing planetary strength, predicting dasha results, and transit analysis.
     */
    shodhyaPinda: Array<{
        /**
         * Planet or Lagna name. Shodhya Pinda is calculated for all 7 classical planets plus Lagna.
         */
        planet: string;
        /**
         * Rashi Pinda component. Weighted sum of reduced Bhinnashtakavarga bindus per sign multiplied by Rashi Gunakar weights per BPHS Ch. 69. Higher values indicate stronger sign-based planetary strength.
         */
        rashiPinda: number;
        /**
         * Graha Pinda component. Weighted sum of reduced Bhinnashtakavarga bindus per sign multiplied by the Graha Gunakar of planets occupying each sign (Sun=5, Moon=5, Mars=8, Mercury=5, Jupiter=10, Venus=7, Saturn=5). Reflects planetary association strength.
         */
        grahaPinda: number;
        /**
         * Total Shodhya Pinda (Rashi Pinda + Graha Pinda). Primary planetary strength score derived from Ashtakavarga reduction. Used for comparing relative strength of planets in a birth chart and predicting dasha period results.
         */
        shodhyaPinda: number;
    }>;
    /**
     * Sign names in order, for mapping bindus array indices to zodiac signs. Index 0 = Aries through index 11 = Pisces.
     */
    signs: Array<'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces'>;
};
export type AshtakavargaRequest = {
    /**
     * Birth date in YYYY-MM-DD format. Date determines planetary positions and nakshatra calculations for Vedic kundli (janam patri). Accurate birth date is essential for dashas, yoga calculations, and divisional charts (vargas).
     */
    date: string;
    /**
     * Birth time in 24-hour HH:MM:SS format. Time is CRITICAL for Lagna (Ascendant) calculation and house divisions - changes every ~2 hours. Even minutes matter for accurate nakshatra pada and divisional chart (D9, D10) calculations. Without exact time, Lagna and house-based predictions will be incorrect.
     */
    time: string;
    /**
     * Birth location latitude in decimal degrees. Location determines local sidereal time for Lagna calculation and affects bhava (house) cusps. Example: Delhi 28.6139, Mumbai 19.0760, Kathmandu 27.7172.
     */
    latitude: number;
    /**
     * Birth location longitude in decimal degrees. Affects local time calculations and ayanamsha adjustments. Example: Delhi 77.2090, Mumbai 72.8777, Kathmandu 85.3240.
     */
    longitude: number;
    /**
     * Timezone: decimal hours from UTC (e.g. 5.5 for IST, -5 for EST) OR IANA name (e.g. "Asia/Kolkata", "America/New_York"). IANA strings are resolved to the DST-correct offset for the given date, so you can pass `cities[0].timezone` from /location/search directly. Defaults to 5.5 (IST).
     */
    timezone?: number | string;
};
/**
 * Complete Shadbala (six-fold planetary strength) analysis for a birth chart per Brihat Parashara Hora Shastra (BPHS).
 */
export type ShadbalaResponse = {
    /**
     * Shadbala analysis for all 7 classical planets. Ordered: Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn. Each entry contains all 6 strength components, total strength in virupas and Rupas, Ishta/Kashta Phala, minimum required threshold, strength ratio, and relative rank.
     */
    planets: Array<{
        /**
         * Planet name. One of the 7 classical Vedic planets (Saptgraha): Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn. Rahu and Ketu are excluded from Shadbala per BPHS.
         */
        planet: string;
        /**
         * Sthana Bala (Positional Strength) in virupas. Sum of 5 sub-components: Uchcha Bala (exaltation strength), Saptavargaja Bala (7-divisional friendship), Ojayugma Bala (odd/even sign placement), Kendradi Bala (angular house strength), and Drekkana Bala (decanate gender match). Higher values indicate stronger positional placement.
         */
        sthanaBala: number;
        /**
         * Dig Bala (Directional Strength) in virupas. Based on angular distance from the planets directional strength house. Sun and Mars are strong at MC (10th), Moon and Venus at IC (4th), Mercury and Jupiter at ASC (1st), Saturn at DSC (7th). Range 0 to 60.
         */
        digBala: number;
        /**
         * Kala Bala (Temporal Strength) in virupas. Sum of 8 sub-components: Nathonnatha (day/night strength), Paksha (lunar phase), Tribhaga (third of day/night), Vara (weekday lord), Hora (planetary hour), Abda (year lord), Masa (month lord), and Ayana (declination-based seasonal strength).
         */
        kalaBala: number;
        /**
         * Chesta Bala (Motional Strength) in virupas. Based on planetary motion and retrogression. Retrograde planets score higher. Sun uses Ayana Chesta Bala (declination arc), Moon uses elongation from Sun. Other planets use Sheeghrochcha (mean anomaly) from Surya Siddhanta elements. Range 0 to 60.
         */
        chestaBala: number;
        /**
         * Naisargika Bala (Natural Strength) in virupas. Fixed luminosity-based values per BPHS: Sun 60.00, Moon 51.43, Venus 42.86, Jupiter 34.29, Mercury 25.71, Mars 17.14, Saturn 8.57. Invariant across all charts.
         */
        naisargikaBala: number;
        /**
         * Drik Bala (Aspectual Strength) in virupas. Strength gained or lost from aspects received by other planets. Benefic aspects (Jupiter, Venus) add strength, malefic aspects (Sun, Mars, Saturn) reduce it. Can be negative when malefic aspects dominate. Uses Sputa Drishti with Vishesha (special) aspects for Mars, Jupiter, and Saturn.
         */
        drikBala: number;
        /**
         * Total Shadbala in virupas (Shashtiamsas). Sum of all 6 strength components. Higher total indicates a stronger planet in the birth chart. Used for comparing relative planetary strength and evaluating dasha period potential.
         */
        totalVirupas: number;
        /**
         * Total Shadbala in Rupas (totalVirupas / 60). 1 Rupa equals 60 virupas. Rupas are the standard unit for comparing planetary strength against minimum required thresholds.
         */
        totalRupas: number;
        /**
         * Minimum required strength in Rupas per BPHS. Sun 5.0, Moon 6.0, Mars 5.0, Mercury 7.0, Jupiter 6.5, Venus 5.5, Saturn 5.0. A planet below its minimum is considered weak and may underperform in its dasha periods.
         */
        minRequired: number;
        /**
         * Ratio of actual Rupas to minimum required (totalRupas / minRequired). Values above 1.0 indicate sufficient strength. Higher ratios mean proportionally stronger planets. Used for ranking planets by relative strength.
         */
        strengthRatio: number;
        /**
         * Ishta Phala (auspicious strength) in virupas. Derived from Uchcha Bala and Chesta Bala: sqrt(ucchaBala * chestaBala). Indicates the planets capacity to produce favorable results during its dasha and transit periods.
         */
        ishtaPhala: number;
        /**
         * Kashta Phala (malefic strength) in virupas. Derived from complements of Uchcha and Chesta Bala: sqrt((60 - ucchaBala) * (60 - chestaBala)). Indicates the planets capacity to produce unfavorable results. Zero when both Uchcha and Chesta exceed 60.
         */
        kashtaPhala: number;
        /**
         * Relative strength rank among the 7 planets (1 = strongest, 7 = weakest). Ranked by strengthRatio (actual/required), not raw virupas, so each planet is compared fairly against its own BPHS threshold.
         */
        relativeRank: number;
    }>;
};
export type ShadbalaRequest = {
    /**
     * Birth date in YYYY-MM-DD format. Date determines planetary positions and nakshatra calculations for Vedic kundli (janam patri). Accurate birth date is essential for dashas, yoga calculations, and divisional charts (vargas).
     */
    date: string;
    /**
     * Birth time in 24-hour HH:MM:SS format. Time is CRITICAL for Lagna (Ascendant) calculation and house divisions - changes every ~2 hours. Even minutes matter for accurate nakshatra pada and divisional chart (D9, D10) calculations. Without exact time, Lagna and house-based predictions will be incorrect.
     */
    time: string;
    /**
     * Birth location latitude in decimal degrees. Location determines local sidereal time for Lagna calculation and affects bhava (house) cusps. Example: Delhi 28.6139, Mumbai 19.0760, Kathmandu 27.7172.
     */
    latitude: number;
    /**
     * Birth location longitude in decimal degrees. Affects local time calculations and ayanamsha adjustments. Example: Delhi 77.2090, Mumbai 72.8777, Kathmandu 85.3240.
     */
    longitude: number;
    /**
     * Timezone: decimal hours from UTC (e.g. 5.5 for IST, -5 for EST) OR IANA name (e.g. "Asia/Kolkata", "America/New_York"). IANA strings are resolved to the DST-correct offset for the given date, so you can pass `cities[0].timezone` from /location/search directly. Defaults to 5.5 (IST).
     */
    timezone?: number | string;
};
export type BasicCard = {
    /**
     * Unique card identifier in kebab-case (e.g. fool, ace-of-cups, queen-of-swords).
     */
    id: string;
    /**
     * Display name of the tarot card as it appears in the Rider-Waite-Smith tradition.
     */
    name: string;
    /**
     * Whether this card belongs to the Major Arcana (22 trump cards representing major life themes) or Minor Arcana (56 suit cards for daily situations).
     */
    arcana: 'major' | 'minor';
    /**
     * Suit of the card (Minor Arcana only). Cups=emotions, Wands=creativity, Swords=intellect, Pentacles=material. Null for Major Arcana cards.
     */
    suit?: 'cups' | 'wands' | 'swords' | 'pentacles';
    /**
     * Card number within its arcana. Major Arcana: 0 (Fool) through 21 (World). Minor Arcana: 1 (Ace) through 14 (King).
     */
    number: number;
    /**
     * URL to the tarot card artwork image in the Rider-Waite-Smith style.
     */
    imageUrl: string;
};
export type Card = {
    /**
     * Unique card identifier in kebab-case (e.g. fool, ace-of-cups, queen-of-swords).
     */
    id: string;
    /**
     * Display name of the tarot card as it appears in the Rider-Waite-Smith tradition.
     */
    name: string;
    /**
     * Whether this card belongs to the Major Arcana (22 trump cards representing major life themes) or Minor Arcana (56 suit cards for daily situations).
     */
    arcana: 'major' | 'minor';
    /**
     * Suit of the card (Minor Arcana only). Cups=emotions, Wands=creativity, Swords=intellect, Pentacles=material. Null for Major Arcana cards.
     */
    suit?: 'cups' | 'wands' | 'swords' | 'pentacles';
    /**
     * Card number within its arcana. Major Arcana: 0 (Fool) through 21 (World). Minor Arcana: 1 (Ace) through 14 (King).
     */
    number: number;
    /**
     * Keywords for both upright and reversed orientations of this tarot card, useful for quick divination reference.
     */
    keywords: {
        /**
         * Key themes when the card is drawn upright. Used for quick tarot reference and reading summaries.
         */
        upright: Array<string>;
        /**
         * Key themes when the card is drawn reversed (inverted). Reversed meanings often indicate blocked or internalized energy.
         */
        reversed: Array<string>;
    };
    /**
     * Complete upright interpretation including description, keywords, and guidance across love, career, finances, health, and spirituality domains.
     */
    upright: {
        /**
         * Key themes and concepts for this card in the given orientation (upright or reversed). Used for quick tarot reference and divination summaries.
         */
        keywords: Array<string>;
        /**
         * Full narrative interpretation of the card in this orientation. Covers symbolism, life lessons, and guidance for the querent.
         */
        description: string;
        /**
         * Love and relationship interpretation for this orientation. Covers romantic partnerships, dating, emotional connections, and matters of the heart.
         */
        love?: string;
        /**
         * Career and professional interpretation for this orientation. Covers workplace dynamics, job transitions, ambition, and vocational purpose.
         */
        career?: string;
        /**
         * Financial interpretation for this orientation. Covers money management, investments, material prosperity, and abundance mindset.
         */
        finances?: string;
        /**
         * Health and wellbeing interpretation for this orientation. Covers physical vitality, mental health, energy levels, and self-care guidance.
         */
        health?: string;
        /**
         * Spiritual interpretation for this orientation. Covers personal growth, inner wisdom, soul purpose, and metaphysical development.
         */
        spirituality?: string;
    };
    /**
     * Complete reversed (inverted) interpretation including description, keywords, and guidance across love, career, finances, health, and spirituality domains. Reversed cards carry modified or blocked energy.
     */
    reversed: {
        /**
         * Key themes and concepts for this card in the given orientation (upright or reversed). Used for quick tarot reference and divination summaries.
         */
        keywords: Array<string>;
        /**
         * Full narrative interpretation of the card in this orientation. Covers symbolism, life lessons, and guidance for the querent.
         */
        description: string;
        /**
         * Love and relationship interpretation for this orientation. Covers romantic partnerships, dating, emotional connections, and matters of the heart.
         */
        love?: string;
        /**
         * Career and professional interpretation for this orientation. Covers workplace dynamics, job transitions, ambition, and vocational purpose.
         */
        career?: string;
        /**
         * Financial interpretation for this orientation. Covers money management, investments, material prosperity, and abundance mindset.
         */
        finances?: string;
        /**
         * Health and wellbeing interpretation for this orientation. Covers physical vitality, mental health, energy levels, and self-care guidance.
         */
        health?: string;
        /**
         * Spiritual interpretation for this orientation. Covers personal growth, inner wisdom, soul purpose, and metaphysical development.
         */
        spirituality?: string;
    };
    /**
     * URL to the tarot card artwork image in the Rider-Waite-Smith style.
     */
    imageUrl: string;
};
export type DrawnCard = {
    /**
     * Unique card identifier in kebab-case (e.g. the-fool, ace-of-cups, queen-of-swords).
     */
    id: string;
    /**
     * Display name of the tarot card as it appears in the Rider-Waite-Smith tradition.
     */
    name: string;
    /**
     * Whether this card belongs to the Major Arcana (22 trump cards, major life themes) or Minor Arcana (56 suit cards, daily situations).
     */
    arcana: 'major' | 'minor';
    /**
     * Suit of the card (Minor Arcana only). Cups=emotions, Wands=creativity, Swords=intellect, Pentacles=material. Null for Major Arcana cards.
     */
    suit?: 'cups' | 'wands' | 'swords' | 'pentacles';
    /**
     * Card number within its arcana. Major Arcana: 0 (Fool) through 21 (World). Minor Arcana: 1 (Ace) through 14 (King). Null when not applicable.
     */
    number?: number;
    /**
     * Position index of this card in the draw sequence (1-based). Useful for mapping cards to spread positions.
     */
    position: number;
    /**
     * True if the card was drawn reversed (upside down). Reversed cards carry modified or blocked energy compared to upright position.
     */
    reversed: boolean;
    /**
     * Key themes and concepts associated with this card in its current orientation (upright or reversed).
     */
    keywords: Array<string>;
    /**
     * Full interpretation of this card in its current orientation, providing detailed divination guidance.
     */
    meaning: string;
    /**
     * URL to the tarot card artwork image.
     */
    imageUrl: string;
};
export type BasicHexagram = {
    /**
     * Hexagram number in King Wen sequence (1-64).
     */
    number: number;
    /**
     * Unicode hexagram symbol for display.
     */
    symbol: string;
    /**
     * Original Chinese name of the hexagram.
     */
    chinese: string;
    /**
     * English translation of the hexagram name.
     */
    english: string;
    /**
     * Pinyin romanization of the Chinese name with tone marks.
     */
    pinyin: string;
    /**
     * Upper trigram (lines 4-6). One of 8 trigrams: Heaven, Earth, Thunder, Wind, Water, Fire, Mountain, Lake.
     */
    upperTrigram: string;
    /**
     * Lower trigram (lines 1-3). Combines with upper trigram to form the hexagram.
     */
    lowerTrigram: string;
};
export type Hexagram = {
    /**
     * Hexagram number in the traditional King Wen sequence (1-64), the standard ordering used in I-Ching divination for over 3,000 years.
     */
    number: number;
    /**
     * Unicode hexagram symbol (U+4DC0 block) representing all six lines. Use for visual display in I-Ching apps and divination interfaces.
     */
    symbol: string;
    /**
     * Original Chinese character name of the hexagram in traditional script.
     */
    chinese: string;
    /**
     * English translation of the hexagram name, conveying the core concept and life situation it represents.
     */
    english: string;
    /**
     * Pinyin romanization of the Chinese name with tone marks for correct pronunciation.
     */
    pinyin: string;
    /**
     * Binary line pattern (6 digits, bottom to top). 1 = yang (solid line), 0 = yin (broken line). Lines 1-3 form the lower trigram, lines 4-6 form the upper trigram.
     */
    binary: string;
    /**
     * Upper trigram (lines 4-6). One of 8 trigrams: Heaven, Earth, Thunder, Wind, Water, Fire, Mountain, Lake.
     */
    upperTrigram: string;
    /**
     * Lower trigram (lines 1-3). Combines with the upper trigram to form the hexagram and its meaning.
     */
    lowerTrigram: string;
    /**
     * The Judgment (Tuan) text, the primary oracle statement of the hexagram offering core guidance and outcome.
     */
    judgment: string;
    /**
     * The Image (Xiang) text, symbolic guidance derived from the trigram combination describing the ideal attitude and action.
     */
    image: string;
    interpretation: Interpretation;
    /**
     * Changing line interpretations for all 6 lines
     */
    changingLines: Array<ChangingLine>;
};
export type Interpretation = {
    /**
     * General life situation interpretation of this hexagram.
     */
    general: string;
    /**
     * Love and relationship guidance from this hexagram.
     */
    love: string;
    /**
     * Career and professional life interpretation.
     */
    career: string;
    /**
     * Decision-making guidance for whether to act, wait, retreat, or advance based on this hexagram.
     */
    decision: string;
    /**
     * Practical wisdom and actionable advice from this hexagram for daily life application.
     */
    advice: string;
};
export type ChangingLine = {
    /**
     * Line position (1-6, bottom to top). In I-Ching, each hexagram has six lines (yao) read from bottom upward.
     */
    position: number;
    /**
     * Changing line interpretation text. Applies only when this specific line is a changing line (old yin or old yang) in a casting.
     */
    text: string;
};
export type BasicTrigram = {
    /**
     * Trigram number (1-8)
     */
    number: number;
    /**
     * Unicode trigram symbol
     */
    symbol: string;
    /**
     * Chinese name
     */
    chinese: string;
    /**
     * English name
     */
    english: string;
    /**
     * Pinyin romanization
     */
    pinyin: string;
    /**
     * Binary representation (1=Yang solid, 0=Yin broken)
     */
    binary: string;
    /**
     * Core attribute/quality
     */
    attribute: string;
};
export type Trigram = {
    /**
     * Trigram number (1-8) in the traditional I-Ching ordering.
     */
    number: number;
    /**
     * Unicode trigram symbol (three lines) for visual display in I-Ching interfaces and Bagua diagrams.
     */
    symbol: string;
    /**
     * Original Chinese character name of the trigram in traditional script.
     */
    chinese: string;
    /**
     * English name representing the natural force or element this trigram embodies.
     */
    english: string;
    /**
     * Pinyin romanization of the Chinese name with tone marks for correct pronunciation.
     */
    pinyin: string;
    /**
     * Three-digit binary representation of the trigram lines (bottom to top). 1 = yang (solid), 0 = yin (broken).
     */
    binary: string;
    /**
     * Five element (Wu Xing) correspondence: Metal, Wood, Water, Fire, or Earth. Used in Chinese metaphysics and feng shui analysis.
     */
    element: string;
    /**
     * Core attribute or quality this trigram represents in I-Ching philosophy (e.g., Creative, Receptive, Arousing).
     */
    attribute: string;
    /**
     * Family archetype in the Bagua system. Each trigram corresponds to a family role (Father, Mother, First Son, First Daughter, etc.).
     */
    familyMember: string;
    /**
     * Compass direction in the King Wen (Later Heaven) Bagua arrangement. Used in feng shui spatial analysis.
     */
    direction: string;
    /**
     * Body part associated with this trigram in traditional Chinese medicine and I-Ching body mapping.
     */
    bodyPart: string;
    /**
     * Animal symbol associated with this trigram in classical I-Ching imagery and divination.
     */
    animal: string;
    /**
     * Season or time period associated with this trigram in the annual cycle of Chinese cosmology.
     */
    season: string;
    /**
     * Energetic quality describing the dynamic nature of this trigram (e.g., Strong, Devoted, Joyous, Gentle).
     */
    quality: string;
    /**
     * Concise interpretation of the trigram covering its symbolic meaning, key associations, and guidance for understanding hexagrams containing this trigram.
     */
    meaning: string;
};
export type BasicDreamSymbol = {
    /**
     * Unique symbol identifier in kebab-case.
     */
    id: string;
    /**
     * Display name of the dream symbol.
     */
    name: string;
    /**
     * Starting letter for alphabetical filtering.
     */
    letter: string;
};
export type DreamSymbol = {
    /**
     * Unique symbol identifier in kebab-case. Use this to fetch full interpretation via /symbols/{id}.
     */
    id: string;
    /**
     * Display name of the dream symbol.
     */
    name: string;
    /**
     * Starting letter (a-z) for alphabetical dream dictionary navigation.
     */
    letter: string;
    /**
     * Full psychological dream interpretation explaining the subconscious symbolism, emotional significance, and waking-life connections of this dream symbol.
     */
    meaning: string;
};
export type ListZodiacSignsData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/astrology/signs';
};
export type ListZodiacSignsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type ListZodiacSignsError = ListZodiacSignsErrors[keyof ListZodiacSignsErrors];
export type ListZodiacSignsResponses = {
    /**
     * All 12 tropical zodiac signs with names, symbols, elements, date ranges, and descriptions.
     */
    200: Array<{
        /**
         * Lowercase sign identifier (e.g., aries, taurus, gemini).
         */
        id: string;
        /**
         * Display name of the zodiac sign.
         */
        name: string;
        /**
         * Unicode zodiac symbol for this sign.
         */
        symbol?: string;
        /**
         * Elemental classification: Fire, Earth, Air, or Water.
         */
        element: 'fire' | 'earth' | 'air' | 'water';
        /**
         * Tropical zodiac date range for this sign.
         */
        dates: {
            /**
             * Start date of this sign in the tropical zodiac.
             */
            start: string;
            /**
             * End date of this sign in the tropical zodiac.
             */
            end: string;
        };
        /**
         * Brief overview of this zodiac sign personality and themes.
         */
        description: string;
    }>;
};
export type ListZodiacSignsResponse = ListZodiacSignsResponses[keyof ListZodiacSignsResponses];
export type GetZodiacSignData = {
    body?: never;
    path: {
        /**
         * Sign ID (lowercase, e.g., aries, taurus) or display name (case-insensitive, e.g., Aries, TAURUS).
         */
        id: string;
    };
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/astrology/signs/{id}';
};
export type GetZodiacSignErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Zodiac sign not found
     */
    404: {
        /**
         * Human-readable error message. May change wording — do not parse programmatically.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier for programmatic error handling.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetZodiacSignError = GetZodiacSignErrors[keyof GetZodiacSignErrors];
export type GetZodiacSignResponses = {
    /**
     * Successfully retrieved zodiac sign
     */
    200: {
        /**
         * Lowercase sign identifier.
         */
        id: string;
        /**
         * Display name of the zodiac sign.
         */
        name: string;
        /**
         * Unicode zodiac symbol.
         */
        symbol?: string;
        /**
         * Symbol name or mascot associated with this sign.
         */
        symbolName: string;
        /**
         * Elemental classification: Fire, Earth, Air, or Water. Determines temperament and compatibility group.
         */
        element: 'fire' | 'earth' | 'air' | 'water';
        /**
         * Quality/modality: Cardinal (initiating), Fixed (sustaining), or Mutable (adapting).
         */
        modality: 'cardinal' | 'fixed' | 'mutable';
        /**
         * Traditional ruling planet that governs this sign.
         */
        rulingPlanet: string;
        /**
         * Tropical zodiac date range for this sign.
         */
        dates: {
            /**
             * Start date of this sign season.
             */
            start: string;
            /**
             * End date of this sign season.
             */
            end: string;
        };
        /**
         * Key personality traits and descriptive words for this sign.
         */
        keywords: Array<string>;
        /**
         * Sign description in short and long form.
         */
        description: {
            /**
             * Brief 1-2 sentence personality overview.
             */
            short: string;
            /**
             * Detailed multi-paragraph sign profile with personality analysis.
             */
            long: string;
        };
        /**
         * Notable people born under this zodiac sign.
         */
        famous?: Array<string>;
        /**
         * Key strengths and lovable qualities of this sign.
         */
        strengths?: Array<string>;
        /**
         * Signature motto or tagline for this sign.
         */
        motto?: string;
        /**
         * Greatest gifts and natural talents of this sign.
         */
        gifts?: string;
        /**
         * Greatest challenges and growth areas for this sign.
         */
        challenges?: string;
        /**
         * Secret weapon or superpower of this sign.
         */
        weapon?: string;
        /**
         * Most compatible zodiac signs for this sign. Trine partners (same element, 120 degrees apart) listed first, followed by a sextile partner (complementary element, 60 degrees apart). Use for compatibility widgets, dating app onboarding, sign profile cards, and zodiac matchmaking.
         */
        compatibleSigns: Array<string>;
    };
};
export type GetZodiacSignResponse = GetZodiacSignResponses[keyof GetZodiacSignResponses];
export type ListPlanetMeaningsData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/astrology/planet-meanings';
};
export type ListPlanetMeaningsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type ListPlanetMeaningsError = ListPlanetMeaningsErrors[keyof ListPlanetMeaningsErrors];
export type ListPlanetMeaningsResponses = {
    /**
     * All 10 astrological planets with names, symbols, taglines, categories, and brief descriptions.
     */
    200: Array<{
        /**
         * Lowercase planet identifier (e.g., sun, moon, mercury).
         */
        id: string;
        /**
         * Display name of the planet.
         */
        name: string;
        /**
         * Unicode astronomical symbol for this planet.
         */
        symbol: string;
        /**
         * Short tagline summarizing this planet in astrology.
         */
        tagline: string;
        /**
         * Planet classification: personal (Sun-Mars), social (Jupiter-Saturn), or generational (Uranus-Pluto).
         */
        category?: string;
        /**
         * Zodiac sign this planet rules. The sign where the planet operates most naturally. Absent for nodes and Chiron.
         */
        rulership?: string;
        /**
         * Brief overview of the planet and its astrological significance.
         */
        description: string;
    }>;
};
export type ListPlanetMeaningsResponse = ListPlanetMeaningsResponses[keyof ListPlanetMeaningsResponses];
export type GetPlanetMeaningData = {
    body?: never;
    path: {
        /**
         * Planet ID (lowercase, e.g., sun, moon, mercury) or display name (case-insensitive, e.g., Sun, MOON).
         */
        id: string;
    };
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/astrology/planet-meanings/{id}';
};
export type GetPlanetMeaningErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Planet not found
     */
    404: {
        /**
         * Human-readable error message. May change wording — do not parse programmatically.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier for programmatic error handling.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetPlanetMeaningError = GetPlanetMeaningErrors[keyof GetPlanetMeaningErrors];
export type GetPlanetMeaningResponses = {
    /**
     * Successfully retrieved planet meaning
     */
    200: {
        /**
         * Lowercase planet identifier.
         */
        id: string;
        /**
         * Display name of the planet.
         */
        name: string;
        /**
         * Unicode astronomical symbol.
         */
        symbol: string;
        /**
         * Short tagline summarizing this planet.
         */
        tagline: string;
        /**
         * Planet classification: personal (Sun-Mars), social (Jupiter-Saturn), or generational (Uranus-Pluto).
         */
        category?: string;
        /**
         * Traditional planet temperature (Hot, Cold, or Neutral).
         */
        temperature: string;
        /**
         * Orbital period around the Sun or zodiac cycle length.
         */
        orbit: string;
        /**
         * Whether this planet can appear retrograde. Always false for Sun and Moon.
         */
        retrograde?: boolean;
        /**
         * Zodiac sign this planet rules (domicile). Where the planet operates most naturally. Absent for nodes and Chiron.
         */
        rulership?: string;
        /**
         * Sign of detriment. Opposite the rulership sign, where the planet struggles. Absent for nodes and Chiron.
         */
        detriment?: string;
        /**
         * Sign of exaltation. Where the planet is honored and amplified. Absent for nodes and Chiron.
         */
        exultation?: string;
        /**
         * Sign of fall. Opposite the exaltation sign, where the planet is weakened. Absent for nodes and Chiron.
         */
        fall?: string;
        /**
         * Positive and negative keyword associations for this planet.
         */
        keywords: {
            /**
             * Positive traits and keywords when this planet is well-aspected.
             */
            positive: Array<string>;
            /**
             * Shadow traits when this planet is challenged or afflicted.
             */
            negative: Array<string>;
        };
        /**
         * Planet description in short and long form.
         */
        description: {
            /**
             * Brief 1-2 sentence overview of the planet.
             */
            short: string;
            /**
             * Detailed multi-paragraph description of the planet, its symbolism, and astrological meaning.
             */
            long: string;
        };
    };
};
export type GetPlanetMeaningResponse = GetPlanetMeaningResponses[keyof GetPlanetMeaningResponses];
export type GenerateNatalChartData = {
    body?: NatalChartRequest;
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/astrology/natal-chart';
};
export type GenerateNatalChartErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GenerateNatalChartError = GenerateNatalChartErrors[keyof GenerateNatalChartErrors];
export type GenerateNatalChartResponses = {
    /**
     * Successful natal chart calculation with complete astrological data
     */
    200: NatalChartResponse;
};
export type GenerateNatalChartResponse = GenerateNatalChartResponses[keyof GenerateNatalChartResponses];
export type GetPlanetaryPositionsData = {
    body?: {
        /**
         * Target date for planetary positions in YYYY-MM-DD format. Use current date for transit positions, or any historical/future date for research. Planets move daily, so this date determines their zodiac positions.
         */
        date: string;
        /**
         * Time in 24-hour HH:MM:SS format for precise calculations. Moon moves ~13° per day, so time matters for accurate lunar position. Use 12:00:00 (noon) as default if exact time not needed.
         */
        time: string;
        /**
         * Observer latitude in decimal degrees (-90 to 90). While planetary longitudes are geocentric (same worldwide), this is needed for house calculations if extending functionality. For basic ephemeris, use 0 as default.
         */
        latitude: number;
        /**
         * Observer longitude in decimal degrees (-180 to 180). Used for precise local time conversion. For basic planetary positions, this has minimal impact but ensures accuracy.
         */
        longitude: number;
        /**
         * Decimal hours from UTC (e.g. -5 for EST, 5.5 for IST, 9 for JST, 5.75 for NPT) OR IANA name (e.g. "America/New_York"). IANA resolved to the DST-correct offset for the chart date.
         */
        timezone: number | string;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/astrology/planets';
};
export type GetPlanetaryPositionsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetPlanetaryPositionsError = GetPlanetaryPositionsErrors[keyof GetPlanetaryPositionsErrors];
export type GetPlanetaryPositionsResponses = {
    /**
     * Planetary positions calculated successfully
     */
    200: {
        /**
         * All 10 planetary positions with zodiac signs, speeds, retrograde status, meanings, and interpretations.
         */
        planets: Array<{
            /**
             * Planet name (Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto).
             */
            name: string;
            /**
             * Tropical ecliptic longitude in degrees (0-360).
             */
            longitude: number;
            /**
             * Ecliptic latitude in degrees.
             */
            latitude: number;
            /**
             * Tropical zodiac sign this planet occupies.
             */
            sign: string;
            /**
             * Degree within the zodiac sign (0-29.999).
             */
            degree: number;
            /**
             * Daily motion in degrees per day. Negative values indicate retrograde.
             */
            speed: number;
            /**
             * Whether the planet is in apparent retrograde motion.
             */
            isRetrograde: boolean;
            /**
             * Unicode astronomical symbol for this planet.
             */
            symbol?: string;
            /**
             * Short tagline summarizing what this planet governs.
             */
            tagline?: string;
            /**
             * Brief description of this planet in astrological context.
             */
            description?: string;
            /**
             * Key themes and traits associated with this planet.
             */
            keywords?: Array<string>;
            /**
             * Planet-in-sign interpretation. How this planet expresses through the zodiac sign it currently occupies.
             */
            interpretation?: {
                /**
                 * Interpretation of this planet in its current zodiac sign.
                 */
                summary: string;
                /**
                 * General meaning of this planet in astrology.
                 */
                planetMeaning: string;
                /**
                 * How this planet expresses through the current sign.
                 */
                signExpression: string;
                /**
                 * Keywords for this specific planet-in-sign combination.
                 */
                keywords: Array<string>;
            };
        }>;
    };
};
export type GetPlanetaryPositionsResponse = GetPlanetaryPositionsResponses[keyof GetPlanetaryPositionsResponses];
export type GetCurrentMoonPhaseData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
        /**
         * Date in YYYY-MM-DD format. Defaults to today if omitted.
         */
        date?: string;
        /**
         * Time in 24-hour HH:MM:SS format. Defaults to 12:00:00 (noon). Moon moves ~13 degrees per day so time affects phase precision.
         */
        time?: string;
        /**
         * Decimal hours (e.g. 5.5 for IST, -5 for EST) OR IANA name (e.g. "Asia/Kolkata"). IANA resolved to the DST-correct offset for the given date. Defaults to 0 (UTC).
         */
        timezone?: number | string | unknown;
    };
    url: '/astrology/moon-phase/current';
};
export type GetCurrentMoonPhaseErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetCurrentMoonPhaseError = GetCurrentMoonPhaseErrors[keyof GetCurrentMoonPhaseErrors];
export type GetCurrentMoonPhaseResponses = {
    /**
     * Moon phase calculated successfully
     */
    200: {
        /**
         * Date of this moon phase calculation (YYYY-MM-DD).
         */
        date: string;
        /**
         * Current lunar phase name. One of: New Moon, Waxing Crescent Moon, First Quarter Moon, Waxing Gibbous Moon, Full Moon, Waning Gibbous Moon, Last Quarter Moon, Waning Crescent Moon.
         */
        phase: string;
        /**
         * Moon illumination percentage (0-100). 0 = New Moon, 100 = Full Moon.
         */
        illumination: number;
        /**
         * Lunar age in days since the last New Moon. Full lunation cycle is ~29.53 days.
         */
        age: number;
        /**
         * Tropical zodiac sign the Moon currently occupies.
         */
        sign: string;
        /**
         * Degree of the Moon within its current zodiac sign (0-29.999).
         */
        degree: number;
        /**
         * Distance from Earth to the Moon in kilometers.
         */
        distance: number;
        /**
         * Moon phase meaning and astrological interpretation. Includes energy direction, keywords, and guidance for this lunar phase.
         */
        meaning?: {
            /**
             * Moon phase display name.
             */
            name: string;
            /**
             * Moon phase emoji symbol.
             */
            symbol: string;
            /**
             * Astrological interpretation of this lunar phase and its influence on activities, emotions, and intentions.
             */
            description: string;
            /**
             * Key themes and activities aligned with this moon phase.
             */
            keywords: Array<string>;
            /**
             * Lunar energy direction: waxing (building), waning (releasing), new (beginning), or full (culmination).
             */
            energy: 'waxing' | 'waning' | 'new' | 'full';
            /**
             * Illumination range description for this phase.
             */
            illumination: string;
        };
    };
};
export type GetCurrentMoonPhaseResponse = GetCurrentMoonPhaseResponses[keyof GetCurrentMoonPhaseResponses];
export type GetUpcomingMoonPhasesData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
        /**
         * Start date in YYYY-MM-DD format. Defaults to today if omitted.
         */
        startDate?: string;
        /**
         * Number of upcoming moon phase transitions to return (1-20). Defaults to 8.
         */
        count?: number;
    };
    url: '/astrology/moon-phase/upcoming';
};
export type GetUpcomingMoonPhasesErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetUpcomingMoonPhasesError = GetUpcomingMoonPhasesErrors[keyof GetUpcomingMoonPhasesErrors];
export type GetUpcomingMoonPhasesResponses = {
    /**
     * Upcoming moon phases retrieved successfully
     */
    200: {
        /**
         * Upcoming moon phase transition dates in chronological order.
         */
        phases: Array<{
            /**
             * Date of this moon phase transition (YYYY-MM-DD).
             */
            date: string;
            /**
             * Lunar phase name (New Moon, First Quarter, Full Moon, Last Quarter).
             */
            phase: string;
        }>;
    };
};
export type GetUpcomingMoonPhasesResponse = GetUpcomingMoonPhasesResponses[keyof GetUpcomingMoonPhasesResponses];
export type GetMoonCalendarData = {
    body?: never;
    path: {
        /**
         * Calendar year (1900-2100).
         */
        year: number;
        /**
         * Calendar month (1-12). 1 = January, 12 = December.
         */
        month: number;
    };
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/astrology/moon-phase/calendar/{year}/{month}';
};
export type GetMoonCalendarErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetMoonCalendarError = GetMoonCalendarErrors[keyof GetMoonCalendarErrors];
export type GetMoonCalendarResponses = {
    /**
     * Lunar calendar generated successfully
     */
    200: {
        /**
         * Calendar year for this lunar calendar.
         */
        year: number;
        /**
         * Calendar month for this lunar calendar.
         */
        month: number;
        /**
         * Daily moon phase and illumination for every day of the month.
         */
        calendar: Array<{
            /**
             * Calendar date (YYYY-MM-DD).
             */
            date: string;
            /**
             * Lunar phase name for this date.
             */
            phase: string;
            /**
             * Moon illumination percentage (0-100) at noon on this date.
             */
            illumination: number;
        }>;
    };
};
export type GetMoonCalendarResponse = GetMoonCalendarResponses[keyof GetMoonCalendarResponses];
export type CalculateSynastryData = {
    body?: {
        person1: {
            /**
             * Birth date in YYYY-MM-DD format. Determines planetary positions for the specific calendar day.
             */
            date: string;
            /**
             * Birth time in 24-hour HH:MM:SS format. Determines the Ascendant (rising sign) and house cusps. Use 12:00:00 if unknown.
             */
            time: string;
            /**
             * Birth location latitude in decimal degrees (-90 to 90). Positive = North, negative = South.
             */
            latitude: number;
            /**
             * Birth location longitude in decimal degrees (-180 to 180). Positive = East, negative = West.
             */
            longitude: number;
            /**
             * Timezone: decimal hours from UTC (e.g. -5 for EST, 5.5 for IST) OR IANA name (e.g. "America/New_York", "Asia/Kolkata"). IANA strings are resolved to the DST-correct offset for the given date, so you can pass `cities[0].timezone` from /location/search directly.
             */
            timezone: number | string;
            /**
             * Optional display name for this person. Included in the response for easy identification.
             */
            name?: string;
        };
        person2: {
            /**
             * Birth date in YYYY-MM-DD format. Determines planetary positions for the specific calendar day.
             */
            date: string;
            /**
             * Birth time in 24-hour HH:MM:SS format. Determines the Ascendant (rising sign) and house cusps. Use 12:00:00 if unknown.
             */
            time: string;
            /**
             * Birth location latitude in decimal degrees (-90 to 90). Positive = North, negative = South.
             */
            latitude: number;
            /**
             * Birth location longitude in decimal degrees (-180 to 180). Positive = East, negative = West.
             */
            longitude: number;
            /**
             * Timezone: decimal hours from UTC (e.g. -5 for EST, 5.5 for IST) OR IANA name (e.g. "America/New_York", "Asia/Kolkata"). IANA strings are resolved to the DST-correct offset for the given date, so you can pass `cities[0].timezone` from /location/search directly.
             */
            timezone: number | string;
            /**
             * Optional display name for this person. Included in the response for easy identification.
             */
            name?: string;
        };
        /**
         * House system for both natal charts. Placidus (default), Whole Sign, Equal, or Koch.
         */
        houseSystem?: 'placidus' | 'whole-sign' | 'equal' | 'koch';
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/astrology/synastry';
};
export type CalculateSynastryErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CalculateSynastryError = CalculateSynastryErrors[keyof CalculateSynastryErrors];
export type CalculateSynastryResponses = {
    /**
     * Synastry calculated successfully with compatibility analysis
     */
    200: {
        /**
         * Person 1 chart highlights: Ascendant, Sun sign, and Moon sign.
         */
        person1: {
            /**
             * Display name if provided in the request.
             */
            name?: string;
            /**
             * Ascendant position for person 1. Determines first house cusp and outward personality.
             */
            ascendant: {
                /**
                 * Ascendant (rising sign) of this person.
                 */
                sign: string;
                /**
                 * Degree within the Ascendant sign (0-29.999).
                 */
                degree: number;
            };
            /**
             * Sun sign (zodiac sign) of this person. Core identity and ego expression.
             */
            sunSign: string;
            /**
             * Moon sign of this person. Emotional nature and inner needs.
             */
            moonSign: string;
        };
        /**
         * Person 2 chart highlights: Ascendant, Sun sign, and Moon sign.
         */
        person2: {
            /**
             * Display name if provided in the request.
             */
            name?: string;
            /**
             * Ascendant position for person 2.
             */
            ascendant: {
                /**
                 * Ascendant (rising sign) of this person.
                 */
                sign: string;
                /**
                 * Degree within the Ascendant sign (0-29.999).
                 */
                degree: number;
            };
            /**
             * Sun sign of this person.
             */
            sunSign: string;
            /**
             * Moon sign of this person.
             */
            moonSign: string;
        };
        /**
         * Overall compatibility score (0-100). Calculated from the balance of harmonious vs challenging inter-chart aspects weighted by planet importance.
         */
        compatibilityScore: number;
        /**
         * All inter-chart (synastry) aspects between person 1 and person 2 planets. Each aspect reveals a specific dynamic in the relationship.
         */
        interAspects: Array<{
            /**
             * Planet from person 1 chart.
             */
            planet1: string;
            /**
             * Planet from person 2 chart.
             */
            planet2: string;
            /**
             * Aspect type (CONJUNCTION, OPPOSITION, TRINE, SQUARE, SEXTILE, etc.).
             */
            type: string;
            /**
             * Exact angle of this aspect type in degrees.
             */
            angle: number;
            /**
             * Distance from exact aspect in degrees. Tighter orb means stronger influence.
             */
            orb: number;
            /**
             * Aspect strength percentage (0-100) based on orb tightness.
             */
            strength: number;
            /**
             * Aspect nature: harmonious, challenging, or neutral.
             */
            interpretation: string;
            /**
             * Aspect meaning with relationship-specific context for this planet pair.
             */
            meaning?: {
                /**
                 * Aspect display name.
                 */
                name: string;
                /**
                 * Aspect meaning in short and long form.
                 */
                description: {
                    /**
                     * Brief aspect description.
                     */
                    short: string;
                    /**
                     * Detailed aspect description.
                     */
                    long: string;
                };
                /**
                 * Keywords associated with this aspect type.
                 */
                keywords: Array<string>;
                /**
                 * Aspect nature classification.
                 */
                nature: string;
                /**
                 * How this specific planetary pair aspect manifests in relationships.
                 */
                relationshipContext: string;
            };
        }>;
        /**
         * Synastry aspect summary showing the balance of harmonious vs challenging inter-chart connections.
         */
        summary: {
            /**
             * Total number of inter-chart aspects found.
             */
            total: number;
            /**
             * Count of harmonious aspects (trine, sextile). Natural ease and flow.
             */
            harmonious: number;
            /**
             * Count of challenging aspects (square, opposition). Dynamic tension and growth.
             */
            challenging: number;
            /**
             * Count of neutral aspects (conjunction). Outcome depends on planets involved.
             */
            neutral: number;
            /**
             * Aspect count grouped by type. Shows which aspect patterns dominate the relationship.
             */
            byType: {
                [key: string]: number;
            };
        };
        /**
         * Relationship analysis with strengths, challenges, and overall assessment.
         */
        analysis: {
            /**
             * Overall relationship analysis narrative based on aspect patterns.
             */
            overall: string;
            /**
             * Areas where the relationship naturally thrives based on harmonious aspects.
             */
            strengths: Array<string>;
            /**
             * Potential friction points and growth opportunities from challenging aspects.
             */
            challenges: Array<string>;
        };
    };
};
export type CalculateSynastryResponse = CalculateSynastryResponses[keyof CalculateSynastryResponses];
export type CalculateHousesData = {
    body?: {
        /**
         * Birth date in YYYY-MM-DD format. Date is critical for house cusp calculations as it determines planetary positions used in some house systems.
         */
        date: string;
        /**
         * Birth time in 24-hour HH:MM:SS format. Time is ESSENTIAL for accurate house cusps - even minutes matter. The Ascendant (1st house cusp) changes roughly every 4 minutes. Without accurate time, house placements will be incorrect.
         */
        time: string;
        /**
         * Birth location latitude in decimal degrees. Location determines the local horizon and meridian, which are fundamental to house division. Higher latitudes cause more distortion in time-based systems like Placidus.
         */
        latitude: number;
        /**
         * Birth location longitude in decimal degrees. Affects local time and horizon calculations for house cusps.
         */
        longitude: number;
        /**
         * Decimal hours from UTC (e.g. -5 for EST, 5.5 for IST, 9 for JST) OR IANA name (e.g. "America/New_York"). IANA resolved to the DST-correct offset for the chart date.
         */
        timezone: number | string;
        /**
         * House system for dividing ecliptic into 12 houses. Placidus (most popular) uses time, Whole Sign (ancient) uses signs, Equal divides from Ascendant. Use "all" to compare all 4 systems side-by-side for educational purposes.
         */
        houseSystem?: 'placidus' | 'whole-sign' | 'equal' | 'koch' | 'all';
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/astrology/houses';
};
export type CalculateHousesErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CalculateHousesError = CalculateHousesErrors[keyof CalculateHousesErrors];
export type CalculateHousesResponses = {
    /**
     * House cusps calculated successfully
     */
    200: HousesResponse;
};
export type CalculateHousesResponse = CalculateHousesResponses[keyof CalculateHousesResponses];
export type CalculateAspectsData = {
    body?: AspectsRequest;
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/astrology/aspects';
};
export type CalculateAspectsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CalculateAspectsError = CalculateAspectsErrors[keyof CalculateAspectsErrors];
export type CalculateAspectsResponses = {
    /**
     * Aspects calculated successfully
     */
    200: AspectsResponse;
};
export type CalculateAspectsResponse = CalculateAspectsResponses[keyof CalculateAspectsResponses];
export type CalculateTransitsData = {
    body?: TransitsRequest;
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/astrology/transits';
};
export type CalculateTransitsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CalculateTransitsError = CalculateTransitsErrors[keyof CalculateTransitsErrors];
export type CalculateTransitsResponses = {
    /**
     * Transits calculated successfully
     */
    200: TransitsResponse;
};
export type CalculateTransitsResponse = CalculateTransitsResponses[keyof CalculateTransitsResponses];
export type CalculateTransitAspectsData = {
    body?: {
        /**
         * Natal chart birth details (date, time, location, timezone). Used to calculate natal planetary positions that transits are compared against.
         */
        natalChart: {
            /**
             * Birth date in YYYY-MM-DD format. Determines planetary positions for the specific calendar day.
             */
            date: string;
            /**
             * Birth time in 24-hour HH:MM:SS format. Determines the Ascendant (rising sign) and house cusps. Use 12:00:00 if unknown.
             */
            time: string;
            /**
             * Birth location latitude in decimal degrees (-90 to 90). Positive = North, negative = South.
             */
            latitude: number;
            /**
             * Birth location longitude in decimal degrees (-180 to 180). Positive = East, negative = West.
             */
            longitude: number;
            /**
             * Timezone: decimal hours from UTC (e.g. -5 for EST, 5.5 for IST) OR IANA name (e.g. "America/New_York", "Asia/Kolkata"). IANA strings are resolved to the DST-correct offset for the given date, so you can pass `cities[0].timezone` from /location/search directly.
             */
            timezone: number | string;
        };
        /**
         * Transit date in YYYY-MM-DD format. Defaults to current date if omitted. Use future dates for predictive transit analysis.
         */
        transitDate?: string;
        /**
         * Transit time in HH:MM:SS format. Defaults to 12:00:00 (noon) if omitted.
         */
        transitTime?: string;
        /**
         * Filter to specific transiting planets. Omit to include all planets. Useful for focusing on slow-moving outer planet transits (Saturn, Jupiter, Pluto).
         */
        planets?: Array<'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto' | 'North Node' | 'South Node' | 'Chiron'>;
        /**
         * Filter to specific aspect types (conjunction, opposition, trine, square, sextile, etc.). Omit to include all aspect types.
         */
        aspectTypes?: Array<'CONJUNCTION' | 'OPPOSITION' | 'TRINE' | 'SQUARE' | 'SEXTILE' | 'SEMI_SEXTILE' | 'QUINCUNX' | 'SEMI_SQUARE' | 'SESQUIQUADRATE'>;
        /**
         * Minimum aspect strength threshold (0-100). Higher values return only tighter, more potent aspects. Useful for filtering out wide-orb aspects.
         */
        minStrength?: number;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/astrology/transit-aspects';
};
export type CalculateTransitAspectsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CalculateTransitAspectsError = CalculateTransitAspectsErrors[keyof CalculateTransitAspectsErrors];
export type CalculateTransitAspectsResponses = {
    /**
     * Transit aspects calculated successfully
     */
    200: {
        /**
         * Date and time of the transit calculation.
         */
        transitDate: string;
        /**
         * Current transiting planetary positions in the tropical zodiac. All 10 planets from Sun through Pluto.
         */
        transitPlanets: Array<{
            /**
             * Planet name (Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto).
             */
            name: 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto' | 'North Node' | 'South Node' | 'Chiron';
            /**
             * Tropical ecliptic longitude in degrees (0-360). Primary coordinate for zodiac sign and aspect calculations.
             */
            longitude: number;
            /**
             * Ecliptic latitude in degrees. Near zero for most planets, varies for Moon and Pluto.
             */
            latitude: number;
            /**
             * Tropical zodiac sign this planet occupies. Determined by 30-degree divisions of ecliptic longitude.
             */
            sign: string;
            /**
             * Degree within the zodiac sign (0-29.999). Indicates how far the planet has progressed through the sign.
             */
            degree: number;
            /**
             * House placement (1-12). Determined by the selected house system and birth location.
             */
            house: number;
            /**
             * Daily motion in degrees per day. Negative values indicate retrograde motion.
             */
            speed: number;
            /**
             * Whether the planet appears to move backward from Earth perspective. Retrograde periods signal review and introspection.
             */
            isRetrograde: boolean;
        }>;
        /**
         * Natal (birth chart) planetary positions used as the baseline for transit aspect comparison.
         */
        natalPlanets: Array<{
            /**
             * Planet name (Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto).
             */
            name: 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto' | 'North Node' | 'South Node' | 'Chiron';
            /**
             * Tropical ecliptic longitude in degrees (0-360). Primary coordinate for zodiac sign and aspect calculations.
             */
            longitude: number;
            /**
             * Ecliptic latitude in degrees. Near zero for most planets, varies for Moon and Pluto.
             */
            latitude: number;
            /**
             * Tropical zodiac sign this planet occupies. Determined by 30-degree divisions of ecliptic longitude.
             */
            sign: string;
            /**
             * Degree within the zodiac sign (0-29.999). Indicates how far the planet has progressed through the sign.
             */
            degree: number;
            /**
             * House placement (1-12). Determined by the selected house system and birth location.
             */
            house: number;
            /**
             * Daily motion in degrees per day. Negative values indicate retrograde motion.
             */
            speed: number;
            /**
             * Whether the planet appears to move backward from Earth perspective. Retrograde periods signal review and introspection.
             */
            isRetrograde: boolean;
        }>;
        /**
         * Transit-to-natal aspects with interpretations, strength ratings, and guidance. Each aspect represents a transiting planet forming a geometric angle to a natal planet.
         */
        aspects: Array<{
            /**
             * First planet in the aspect pair.
             */
            planet1: 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto' | 'North Node' | 'South Node' | 'Chiron';
            /**
             * Second planet in the aspect pair.
             */
            planet2: 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto' | 'North Node' | 'South Node' | 'Chiron';
            /**
             * Aspect type. Major: conjunction (0), opposition (180), trine (120), square (90), sextile (60). Minor: semi-sextile, quincunx, semi-square, sesquiquadrate.
             */
            type: 'CONJUNCTION' | 'OPPOSITION' | 'TRINE' | 'SQUARE' | 'SEXTILE' | 'SEMI_SEXTILE' | 'QUINCUNX' | 'SEMI_SQUARE' | 'SESQUIQUADRATE';
            /**
             * Exact angular separation that defines this aspect type in degrees.
             */
            angle: number;
            /**
             * Deviation from exact aspect in degrees. Tighter orb means stronger influence.
             */
            orb: number;
            /**
             * Whether the aspect is applying (planets moving toward exact) or separating (moving apart). Applying aspects grow stronger.
             */
            isApplying: boolean;
            /**
             * Aspect strength percentage (0-100). Based on orb tightness relative to the allowed maximum.
             */
            strength: number;
            /**
             * Aspect nature. Harmonious (trine, sextile) flows easily. Challenging (square, opposition) creates tension and growth. Neutral (conjunction) blends energies.
             */
            interpretation: 'harmonious' | 'challenging' | 'neutral';
            transitInterpretation?: {
                /**
                 * Narrative interpretation of this transit aspect and its life impact.
                 */
                summary: string;
                /**
                 * When this transit is most active and how long its influence lasts.
                 */
                timing: string;
                /**
                 * Strength and nature of this transit effect — constructive, challenging, or neutral.
                 */
                impact: string;
                /**
                 * Practical advice for working with this transit energy.
                 */
                guidance: string;
                /**
                 * Key themes activated by this transit aspect.
                 */
                keywords: Array<string>;
            };
        }>;
        /**
         * Statistical summary of all transit aspects. The harmonious-to-challenging ratio reveals the overall transit weather — whether the current period favors ease or demands effort.
         */
        summary: {
            /**
             * Total number of transit-to-natal aspects found.
             */
            total: number;
            /**
             * Count of harmonious aspects (trine, sextile). These transits bring ease, flow, and opportunity.
             */
            harmonious: number;
            /**
             * Count of challenging aspects (square, opposition, semi-square, sesquiquadrate). These transits bring tension, growth pressure, and action.
             */
            challenging: number;
            /**
             * Count of neutral aspects (conjunction, minor aspects). Conjunctions blend energies — the outcome depends on the planets involved.
             */
            neutral: number;
            /**
             * The tightest aspect by orb. This is the most potent transit currently active — the one most likely to be felt.
             */
            strongest: {
                /**
                 * First planet in the aspect pair.
                 */
                planet1: 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto' | 'North Node' | 'South Node' | 'Chiron';
                /**
                 * Second planet in the aspect pair.
                 */
                planet2: 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto' | 'North Node' | 'South Node' | 'Chiron';
                /**
                 * Aspect type. Major: conjunction (0), opposition (180), trine (120), square (90), sextile (60). Minor: semi-sextile, quincunx, semi-square, sesquiquadrate.
                 */
                type: 'CONJUNCTION' | 'OPPOSITION' | 'TRINE' | 'SQUARE' | 'SEXTILE' | 'SEMI_SEXTILE' | 'QUINCUNX' | 'SEMI_SQUARE' | 'SESQUIQUADRATE';
                /**
                 * Exact angular separation that defines this aspect type in degrees.
                 */
                angle: number;
                /**
                 * Deviation from exact aspect in degrees. Tighter orb means stronger influence.
                 */
                orb: number;
                /**
                 * Whether the aspect is applying (planets moving toward exact) or separating (moving apart). Applying aspects grow stronger.
                 */
                isApplying: boolean;
                /**
                 * Aspect strength percentage (0-100). Based on orb tightness relative to the allowed maximum.
                 */
                strength: number;
                /**
                 * Aspect nature. Harmonious (trine, sextile) flows easily. Challenging (square, opposition) creates tension and growth. Neutral (conjunction) blends energies.
                 */
                interpretation: 'harmonious' | 'challenging' | 'neutral';
            };
            /**
             * Transit aspect counts grouped by aspect type (conjunction, trine, square, opposition, sextile, etc.). Useful for quickly assessing the transit weather.
             */
            byType: {
                [key: string]: number;
            };
        };
    };
};
export type CalculateTransitAspectsResponse = CalculateTransitAspectsResponses[keyof CalculateTransitAspectsResponses];
export type GenerateSolarReturnData = {
    body?: {
        /**
         * Original birth date in YYYY-MM-DD format. Used to determine natal Sun longitude for the solar return calculation.
         */
        birthDate: string;
        /**
         * Original birth time in 24-hour HH:MM:SS format. Determines exact natal Sun position for annual return timing.
         */
        birthTime: string;
        /**
         * Year for which to cast the solar return chart. The chart is erected for the exact moment the transiting Sun conjuncts the natal Sun longitude in this year.
         */
        returnYear: number;
        /**
         * Latitude of the solar return location in decimal degrees. Use current residence or travel location at time of birthday — solar return charts are location-sensitive.
         */
        latitude: number;
        /**
         * Longitude of the solar return location in decimal degrees. Affects house cusps and Ascendant of the return chart.
         */
        longitude: number;
        /**
         * Decimal hours from UTC OR IANA name (e.g. "America/New_York"). IANA resolved to the DST-correct offset for the birthDate. Output datetime is adjusted to this timezone.
         */
        timezone: number | string;
        /**
         * House system for the solar return chart. Placidus (default) is most common in Western astrology. Whole Sign, Equal, and Koch also supported.
         */
        houseSystem?: 'placidus' | 'whole-sign' | 'equal' | 'koch';
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/astrology/solar-return';
};
export type GenerateSolarReturnErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GenerateSolarReturnError = GenerateSolarReturnErrors[keyof GenerateSolarReturnErrors];
export type GenerateSolarReturnResponses = {
    /**
     * Solar return chart calculated successfully
     */
    200: {
        /**
         * Original birth date used for natal Sun longitude calculation.
         */
        birthDate: string;
        /**
         * Exact solar return moment — when the transiting Sun conjuncts the natal Sun longitude. Adjusted to requested timezone. This is your astrological birthday for the year.
         */
        solarReturnDate: string;
        /**
         * Year of this solar return chart. Covers the period from this birthday to the next.
         */
        solarReturnYear: number;
        /**
         * Location used for the solar return chart. The Ascendant and house cusps change based on where you are at your birthday — a key technique in relocated solar returns.
         */
        location: {
            /**
             * Observer latitude used for Placidus house cusp and Ascendant calculation in the solar return chart.
             */
            latitude: number;
            /**
             * Observer longitude used for local sidereal time and Midheaven calculation in the solar return chart.
             */
            longitude: number;
            /**
             * Timezone offset from UTC applied to output datetime formatting.
             */
            timezone: number;
        };
        /**
         * Full natal-style chart erected for the solar return moment. Contains all 10 planetary positions, 12 house cusps, aspects, Ascendant, and Midheaven in the tropical zodiac.
         */
        chart: {
            /**
             * Birth details used to generate this chart.
             */
            birthDetails: {
                /**
                 * Birth date in YYYY-MM-DD format. Determines planetary positions for the specific calendar day.
                 */
                date: string;
                /**
                 * Birth time in 24-hour HH:MM:SS format. Determines the Ascendant (rising sign) and house cusps. Use 12:00:00 if unknown.
                 */
                time: string;
                /**
                 * Birth location latitude in decimal degrees (-90 to 90). Positive = North, negative = South.
                 */
                latitude: number;
                /**
                 * Birth location longitude in decimal degrees (-180 to 180). Positive = East, negative = West.
                 */
                longitude: number;
                /**
                 * Timezone offset from UTC in decimal hours. Examples: New York = -5, London = 0, India = 5.5, Tokyo = 9.
                 */
                timezone: number;
            };
            /**
             * All 10 planetary positions (Sun through Pluto) in the tropical zodiac with house placements.
             */
            planets: Array<{
                /**
                 * Planet name (Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto).
                 */
                name: 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto' | 'North Node' | 'South Node' | 'Chiron';
                /**
                 * Tropical ecliptic longitude in degrees (0-360). Primary coordinate for zodiac sign and aspect calculations.
                 */
                longitude: number;
                /**
                 * Ecliptic latitude in degrees. Near zero for most planets, varies for Moon and Pluto.
                 */
                latitude: number;
                /**
                 * Tropical zodiac sign this planet occupies. Determined by 30-degree divisions of ecliptic longitude.
                 */
                sign: string;
                /**
                 * Degree within the zodiac sign (0-29.999). Indicates how far the planet has progressed through the sign.
                 */
                degree: number;
                /**
                 * House placement (1-12). Determined by the selected house system and birth location.
                 */
                house: number;
                /**
                 * Daily motion in degrees per day. Negative values indicate retrograde motion.
                 */
                speed: number;
                /**
                 * Whether the planet appears to move backward from Earth perspective. Retrograde periods signal review and introspection.
                 */
                isRetrograde: boolean;
            }>;
            /**
             * All 12 house cusps calculated using the selected house system.
             */
            houses: Array<{
                /**
                 * House number (1-12). Each house governs specific life themes in Western astrology.
                 */
                number: number;
                /**
                 * Ecliptic longitude of this house cusp in degrees (0-360).
                 */
                longitude: number;
                /**
                 * Zodiac sign on this house cusp. Colors the themes of this life area.
                 */
                sign: string;
                /**
                 * Degree within the zodiac sign on this cusp (0-29.999).
                 */
                degree: number;
            }>;
            /**
             * House system used for this chart (placidus, whole-sign, equal, or koch).
             */
            houseSystem: 'placidus' | 'whole-sign' | 'equal' | 'koch';
            /**
             * All planetary aspects found in this chart with orbs, strength, and applying/separating status.
             */
            aspects: Array<{
                /**
                 * First planet in the aspect pair.
                 */
                planet1: 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto' | 'North Node' | 'South Node' | 'Chiron';
                /**
                 * Second planet in the aspect pair.
                 */
                planet2: 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto' | 'North Node' | 'South Node' | 'Chiron';
                /**
                 * Aspect type. Major: conjunction (0), opposition (180), trine (120), square (90), sextile (60). Minor: semi-sextile, quincunx, semi-square, sesquiquadrate.
                 */
                type: 'CONJUNCTION' | 'OPPOSITION' | 'TRINE' | 'SQUARE' | 'SEXTILE' | 'SEMI_SEXTILE' | 'QUINCUNX' | 'SEMI_SQUARE' | 'SESQUIQUADRATE';
                /**
                 * Exact angular separation that defines this aspect type in degrees.
                 */
                angle: number;
                /**
                 * Deviation from exact aspect in degrees. Tighter orb means stronger influence.
                 */
                orb: number;
                /**
                 * Whether the aspect is applying (planets moving toward exact) or separating (moving apart). Applying aspects grow stronger.
                 */
                isApplying: boolean;
                /**
                 * Aspect strength percentage (0-100). Based on orb tightness relative to the allowed maximum.
                 */
                strength: number;
                /**
                 * Aspect nature. Harmonious (trine, sextile) flows easily. Challenging (square, opposition) creates tension and growth. Neutral (conjunction) blends energies.
                 */
                interpretation: 'harmonious' | 'challenging' | 'neutral';
            }>;
        };
        /**
         * Original natal Sun position that the transiting Sun returns to. This conjunction defines the solar return moment.
         */
        natalSunPosition: {
            /**
             * Natal Sun ecliptic longitude in degrees (0-360). The transiting Sun returns to this exact degree each year.
             */
            longitude: number;
            /**
             * Tropical zodiac sign of the natal Sun (your Sun sign).
             */
            sign: string;
            /**
             * Degree within the zodiac sign (0-29.999). The precise position the Sun returns to.
             */
            degree: number;
        };
        /**
         * Solar return interpretation with annual forecast themes. Solar returns are the primary technique in Western astrology for year-ahead predictions.
         */
        interpretation: {
            /**
             * Narrative overview of the solar return year themes and energy.
             */
            summary: string;
            /**
             * Explanation of how to use solar return charts for annual forecasting, identifying yearly themes, and timing predictions.
             */
            purpose: string;
            /**
             * Key life areas and themes highlighted by this solar return chart. Focus on these for the birthday year.
             */
            keyThemes: Array<string>;
        };
    };
};
export type GenerateSolarReturnResponse = GenerateSolarReturnResponses[keyof GenerateSolarReturnResponses];
export type GenerateLunarReturnData = {
    body?: {
        /**
         * Original birth date in YYYY-MM-DD format. Used to determine natal Moon longitude for the lunar return calculation.
         */
        birthDate: string;
        /**
         * Original birth time in 24-hour HH:MM:SS format. Determines exact natal Moon position for monthly return timing.
         */
        birthTime: string;
        /**
         * Approximate date near the desired lunar return (YYYY-MM-DD). The Moon returns to its natal position every ~27.3 days, so provide a date within a few days of the expected return.
         */
        returnDate: string;
        /**
         * Latitude of the lunar return location in decimal degrees. Affects the Ascendant and house cusps of the return chart.
         */
        latitude: number;
        /**
         * Longitude of the lunar return location in decimal degrees. Determines local sidereal time for house calculations.
         */
        longitude: number;
        /**
         * Decimal hours from UTC OR IANA name (e.g. "America/New_York"). IANA resolved to the DST-correct offset for the birthDate. Output datetime is adjusted to this timezone.
         */
        timezone: number | string;
        /**
         * House system for the lunar return chart. Placidus (default), Whole Sign, Equal, or Koch.
         */
        houseSystem?: 'placidus' | 'whole-sign' | 'equal' | 'koch';
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/astrology/lunar-return';
};
export type GenerateLunarReturnErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GenerateLunarReturnError = GenerateLunarReturnErrors[keyof GenerateLunarReturnErrors];
export type GenerateLunarReturnResponses = {
    /**
     * Lunar return chart calculated successfully
     */
    200: {
        /**
         * Original birth date used for natal Moon longitude calculation.
         */
        birthDate: string;
        /**
         * Exact lunar return moment — when the transiting Moon conjuncts the natal Moon longitude. Adjusted to requested timezone. Occurs approximately every 27.3 days (one sidereal month).
         */
        lunarReturnDate: string;
        /**
         * Location used for the lunar return chart house and Ascendant calculations.
         */
        location: {
            /**
             * Observer latitude used for house cusp calculation in the lunar return chart.
             */
            latitude: number;
            /**
             * Observer longitude used for local sidereal time and Midheaven in the return chart.
             */
            longitude: number;
            /**
             * Timezone offset from UTC applied to output datetime formatting.
             */
            timezone: number;
        };
        /**
         * Full tropical zodiac chart erected for the lunar return moment. Contains planetary positions, house cusps, aspects, Ascendant, and Midheaven.
         */
        chart: {
            /**
             * Birth details used to generate this chart.
             */
            birthDetails: {
                /**
                 * Birth date in YYYY-MM-DD format. Determines planetary positions for the specific calendar day.
                 */
                date: string;
                /**
                 * Birth time in 24-hour HH:MM:SS format. Determines the Ascendant (rising sign) and house cusps. Use 12:00:00 if unknown.
                 */
                time: string;
                /**
                 * Birth location latitude in decimal degrees (-90 to 90). Positive = North, negative = South.
                 */
                latitude: number;
                /**
                 * Birth location longitude in decimal degrees (-180 to 180). Positive = East, negative = West.
                 */
                longitude: number;
                /**
                 * Timezone offset from UTC in decimal hours. Examples: New York = -5, London = 0, India = 5.5, Tokyo = 9.
                 */
                timezone: number;
            };
            /**
             * All 10 planetary positions (Sun through Pluto) in the tropical zodiac with house placements.
             */
            planets: Array<{
                /**
                 * Planet name (Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto).
                 */
                name: 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto' | 'North Node' | 'South Node' | 'Chiron';
                /**
                 * Tropical ecliptic longitude in degrees (0-360). Primary coordinate for zodiac sign and aspect calculations.
                 */
                longitude: number;
                /**
                 * Ecliptic latitude in degrees. Near zero for most planets, varies for Moon and Pluto.
                 */
                latitude: number;
                /**
                 * Tropical zodiac sign this planet occupies. Determined by 30-degree divisions of ecliptic longitude.
                 */
                sign: string;
                /**
                 * Degree within the zodiac sign (0-29.999). Indicates how far the planet has progressed through the sign.
                 */
                degree: number;
                /**
                 * House placement (1-12). Determined by the selected house system and birth location.
                 */
                house: number;
                /**
                 * Daily motion in degrees per day. Negative values indicate retrograde motion.
                 */
                speed: number;
                /**
                 * Whether the planet appears to move backward from Earth perspective. Retrograde periods signal review and introspection.
                 */
                isRetrograde: boolean;
            }>;
            /**
             * All 12 house cusps calculated using the selected house system.
             */
            houses: Array<{
                /**
                 * House number (1-12). Each house governs specific life themes in Western astrology.
                 */
                number: number;
                /**
                 * Ecliptic longitude of this house cusp in degrees (0-360).
                 */
                longitude: number;
                /**
                 * Zodiac sign on this house cusp. Colors the themes of this life area.
                 */
                sign: string;
                /**
                 * Degree within the zodiac sign on this cusp (0-29.999).
                 */
                degree: number;
            }>;
            /**
             * House system used for this chart (placidus, whole-sign, equal, or koch).
             */
            houseSystem: 'placidus' | 'whole-sign' | 'equal' | 'koch';
            /**
             * All planetary aspects found in this chart with orbs, strength, and applying/separating status.
             */
            aspects: Array<{
                /**
                 * First planet in the aspect pair.
                 */
                planet1: 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto' | 'North Node' | 'South Node' | 'Chiron';
                /**
                 * Second planet in the aspect pair.
                 */
                planet2: 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto' | 'North Node' | 'South Node' | 'Chiron';
                /**
                 * Aspect type. Major: conjunction (0), opposition (180), trine (120), square (90), sextile (60). Minor: semi-sextile, quincunx, semi-square, sesquiquadrate.
                 */
                type: 'CONJUNCTION' | 'OPPOSITION' | 'TRINE' | 'SQUARE' | 'SEXTILE' | 'SEMI_SEXTILE' | 'QUINCUNX' | 'SEMI_SQUARE' | 'SESQUIQUADRATE';
                /**
                 * Exact angular separation that defines this aspect type in degrees.
                 */
                angle: number;
                /**
                 * Deviation from exact aspect in degrees. Tighter orb means stronger influence.
                 */
                orb: number;
                /**
                 * Whether the aspect is applying (planets moving toward exact) or separating (moving apart). Applying aspects grow stronger.
                 */
                isApplying: boolean;
                /**
                 * Aspect strength percentage (0-100). Based on orb tightness relative to the allowed maximum.
                 */
                strength: number;
                /**
                 * Aspect nature. Harmonious (trine, sextile) flows easily. Challenging (square, opposition) creates tension and growth. Neutral (conjunction) blends energies.
                 */
                interpretation: 'harmonious' | 'challenging' | 'neutral';
            }>;
        };
        /**
         * Original natal Moon position that the transiting Moon returns to. This conjunction defines the lunar return moment.
         */
        natalMoonPosition: {
            /**
             * Natal Moon ecliptic longitude in degrees (0-360). The transiting Moon returns to this position each month.
             */
            longitude: number;
            /**
             * Tropical zodiac sign of the natal Moon.
             */
            sign: string;
            /**
             * Degree within the zodiac sign (0-29.999).
             */
            degree: number;
        };
        /**
         * Lunar return interpretation with monthly forecast. Lunar returns reveal emotional patterns, domestic focus, and intuitive themes for the upcoming ~27-day cycle.
         */
        interpretation: {
            /**
             * Narrative overview of the monthly emotional themes and lunar cycle focus areas.
             */
            summary: string;
            /**
             * Explanation of how to use lunar return charts for monthly emotional forecasting and self-care planning.
             */
            purpose: string;
            /**
             * Key emotional patterns, domestic themes, and self-care priorities for this lunar month.
             */
            keyThemes: Array<string>;
        };
    };
};
export type GenerateLunarReturnResponse = GenerateLunarReturnResponses[keyof GenerateLunarReturnResponses];
export type GenerateCompositeChartData = {
    body?: {
        /**
         * First person birth details (date, time, location, timezone).
         */
        person1: {
            /**
             * Birth date in YYYY-MM-DD format. Determines planetary positions for the specific calendar day.
             */
            date: string;
            /**
             * Birth time in 24-hour HH:MM:SS format. Determines the Ascendant (rising sign) and house cusps. Use 12:00:00 if unknown.
             */
            time: string;
            /**
             * Birth location latitude in decimal degrees (-90 to 90). Positive = North, negative = South.
             */
            latitude: number;
            /**
             * Birth location longitude in decimal degrees (-180 to 180). Positive = East, negative = West.
             */
            longitude: number;
            /**
             * Timezone: decimal hours from UTC (e.g. -5 for EST, 5.5 for IST) OR IANA name (e.g. "America/New_York", "Asia/Kolkata"). IANA strings are resolved to the DST-correct offset for the given date, so you can pass `cities[0].timezone` from /location/search directly.
             */
            timezone: number | string;
        };
        /**
         * Second person birth details (date, time, location, timezone).
         */
        person2: {
            /**
             * Birth date in YYYY-MM-DD format. Determines planetary positions for the specific calendar day.
             */
            date: string;
            /**
             * Birth time in 24-hour HH:MM:SS format. Determines the Ascendant (rising sign) and house cusps. Use 12:00:00 if unknown.
             */
            time: string;
            /**
             * Birth location latitude in decimal degrees (-90 to 90). Positive = North, negative = South.
             */
            latitude: number;
            /**
             * Birth location longitude in decimal degrees (-180 to 180). Positive = East, negative = West.
             */
            longitude: number;
            /**
             * Timezone: decimal hours from UTC (e.g. -5 for EST, 5.5 for IST) OR IANA name (e.g. "America/New_York", "Asia/Kolkata"). IANA strings are resolved to the DST-correct offset for the given date, so you can pass `cities[0].timezone` from /location/search directly.
             */
            timezone: number | string;
        };
        /**
         * House system for the composite chart. Placidus (default), Whole Sign, Equal, or Koch.
         */
        houseSystem?: 'placidus' | 'whole-sign' | 'equal' | 'koch';
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/astrology/composite-chart';
};
export type GenerateCompositeChartErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GenerateCompositeChartError = GenerateCompositeChartErrors[keyof GenerateCompositeChartErrors];
export type GenerateCompositeChartResponses = {
    /**
     * Composite chart calculated successfully
     */
    200: {
        /**
         * First person birth details.
         */
        person1: {
            /**
             * Birth date in YYYY-MM-DD format. Determines planetary positions for the specific calendar day.
             */
            date: string;
            /**
             * Birth time in 24-hour HH:MM:SS format. Determines the Ascendant (rising sign) and house cusps. Use 12:00:00 if unknown.
             */
            time: string;
            /**
             * Birth location latitude in decimal degrees (-90 to 90). Positive = North, negative = South.
             */
            latitude: number;
            /**
             * Birth location longitude in decimal degrees (-180 to 180). Positive = East, negative = West.
             */
            longitude: number;
            /**
             * Timezone offset from UTC in decimal hours. Examples: New York = -5, London = 0, India = 5.5, Tokyo = 9.
             */
            timezone: number;
        };
        /**
         * Second person birth details.
         */
        person2: {
            /**
             * Birth date in YYYY-MM-DD format. Determines planetary positions for the specific calendar day.
             */
            date: string;
            /**
             * Birth time in 24-hour HH:MM:SS format. Determines the Ascendant (rising sign) and house cusps. Use 12:00:00 if unknown.
             */
            time: string;
            /**
             * Birth location latitude in decimal degrees (-90 to 90). Positive = North, negative = South.
             */
            latitude: number;
            /**
             * Birth location longitude in decimal degrees (-180 to 180). Positive = East, negative = West.
             */
            longitude: number;
            /**
             * Timezone offset from UTC in decimal hours. Examples: New York = -5, London = 0, India = 5.5, Tokyo = 9.
             */
            timezone: number;
        };
        /**
         * Composite planetary positions calculated as midpoints between both charts. Each planet represents a shared energy in the relationship.
         */
        compositePlanets: Array<{
            /**
             * Planet name (Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto).
             */
            name: 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto' | 'North Node' | 'South Node' | 'Chiron';
            /**
             * Tropical ecliptic longitude in degrees (0-360). Primary coordinate for zodiac sign and aspect calculations.
             */
            longitude: number;
            /**
             * Ecliptic latitude in degrees. Near zero for most planets, varies for Moon and Pluto.
             */
            latitude: number;
            /**
             * Tropical zodiac sign this planet occupies. Determined by 30-degree divisions of ecliptic longitude.
             */
            sign: string;
            /**
             * Degree within the zodiac sign (0-29.999). Indicates how far the planet has progressed through the sign.
             */
            degree: number;
            /**
             * House placement (1-12). Determined by the selected house system and birth location.
             */
            house: number;
            /**
             * Daily motion in degrees per day. Negative values indicate retrograde motion.
             */
            speed: number;
            /**
             * Whether the planet appears to move backward from Earth perspective. Retrograde periods signal review and introspection.
             */
            isRetrograde: boolean;
            /**
             * Composite interpretation for this planet in the relationship chart.
             */
            compositeInterpretation?: {
                /**
                 * Narrative interpretation of this composite planet placement.
                 */
                summary: string;
                /**
                 * What this planet represents in the context of the relationship.
                 */
                relationshipMeaning: string;
                /**
                 * Key themes associated with this composite placement.
                 */
                keywords: Array<string>;
            };
        }>;
        /**
         * Composite house cusps. Each house represents shared life areas in the relationship.
         */
        compositeHouses: Array<{
            /**
             * House number (1-12) in the composite chart.
             */
            number: number;
            /**
             * Zodiac sign on the composite house cusp.
             */
            sign: string;
            /**
             * Degree within the zodiac sign (0-29.999).
             */
            degree: number;
            /**
             * Absolute ecliptic longitude in degrees (0-360).
             */
            longitude: number;
        }>;
        /**
         * Composite Ascendant. Represents how the relationship presents itself to the outside world.
         */
        compositeAscendant: {
            /**
             * Zodiac sign on the composite Ascendant.
             */
            sign: string;
            /**
             * Degree within the sign (0-29.999).
             */
            degree: number;
            /**
             * Absolute ecliptic longitude in degrees (0-360).
             */
            longitude: number;
        };
        /**
         * Composite Midheaven (MC). Represents shared goals, public image, and the direction the relationship grows toward.
         */
        compositeMidheaven: {
            /**
             * Zodiac sign on the composite Midheaven.
             */
            sign: string;
            /**
             * Degree within the sign (0-29.999).
             */
            degree: number;
            /**
             * Absolute ecliptic longitude in degrees (0-360).
             */
            longitude: number;
        };
        /**
         * Aspects between composite planets. Reveals the internal dynamics and energy patterns within the relationship.
         */
        aspects: Array<{
            /**
             * First planet in the aspect pair.
             */
            planet1: 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto' | 'North Node' | 'South Node' | 'Chiron';
            /**
             * Second planet in the aspect pair.
             */
            planet2: 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto' | 'North Node' | 'South Node' | 'Chiron';
            /**
             * Aspect type. Major: conjunction (0), opposition (180), trine (120), square (90), sextile (60). Minor: semi-sextile, quincunx, semi-square, sesquiquadrate.
             */
            type: 'CONJUNCTION' | 'OPPOSITION' | 'TRINE' | 'SQUARE' | 'SEXTILE' | 'SEMI_SEXTILE' | 'QUINCUNX' | 'SEMI_SQUARE' | 'SESQUIQUADRATE';
            /**
             * Exact angular separation that defines this aspect type in degrees.
             */
            angle: number;
            /**
             * Deviation from exact aspect in degrees. Tighter orb means stronger influence.
             */
            orb: number;
            /**
             * Whether the aspect is applying (planets moving toward exact) or separating (moving apart). Applying aspects grow stronger.
             */
            isApplying: boolean;
            /**
             * Aspect strength percentage (0-100). Based on orb tightness relative to the allowed maximum.
             */
            strength: number;
            /**
             * Aspect nature. Harmonious (trine, sextile) flows easily. Challenging (square, opposition) creates tension and growth. Neutral (conjunction) blends energies.
             */
            interpretation: 'harmonious' | 'challenging' | 'neutral';
        }>;
        /**
         * Composite chart interpretation with relationship strengths, challenges, and overall assessment.
         */
        interpretation: {
            /**
             * Overall relationship interpretation based on composite chart analysis.
             */
            summary: string;
            /**
             * Areas where the relationship naturally thrives.
             */
            strengths: Array<string>;
            /**
             * Potential friction points and growth opportunities in the relationship.
             */
            challenges: Array<string>;
        };
    };
};
export type GenerateCompositeChartResponse = GenerateCompositeChartResponses[keyof GenerateCompositeChartResponses];
export type CalculateCompatibilityData = {
    body?: {
        /**
         * First person birth details (date, time, location, timezone). Required for calculating natal planetary positions.
         */
        person1: {
            /**
             * Birth date in YYYY-MM-DD format. Determines planetary positions for the specific calendar day.
             */
            date: string;
            /**
             * Birth time in 24-hour HH:MM:SS format. Determines the Ascendant (rising sign) and house cusps. Use 12:00:00 if unknown.
             */
            time: string;
            /**
             * Birth location latitude in decimal degrees (-90 to 90). Positive = North, negative = South.
             */
            latitude: number;
            /**
             * Birth location longitude in decimal degrees (-180 to 180). Positive = East, negative = West.
             */
            longitude: number;
            /**
             * Timezone: decimal hours from UTC (e.g. -5 for EST, 5.5 for IST) OR IANA name (e.g. "America/New_York", "Asia/Kolkata"). IANA strings are resolved to the DST-correct offset for the given date, so you can pass `cities[0].timezone` from /location/search directly.
             */
            timezone: number | string;
        };
        /**
         * Second person birth details. Compared against person1 to evaluate inter-chart aspects and compatibility.
         */
        person2: {
            /**
             * Birth date in YYYY-MM-DD format. Determines planetary positions for the specific calendar day.
             */
            date: string;
            /**
             * Birth time in 24-hour HH:MM:SS format. Determines the Ascendant (rising sign) and house cusps. Use 12:00:00 if unknown.
             */
            time: string;
            /**
             * Birth location latitude in decimal degrees (-90 to 90). Positive = North, negative = South.
             */
            latitude: number;
            /**
             * Birth location longitude in decimal degrees (-180 to 180). Positive = East, negative = West.
             */
            longitude: number;
            /**
             * Timezone: decimal hours from UTC (e.g. -5 for EST, 5.5 for IST) OR IANA name (e.g. "America/New_York", "Asia/Kolkata"). IANA strings are resolved to the DST-correct offset for the given date, so you can pass `cities[0].timezone` from /location/search directly.
             */
            timezone: number | string;
        };
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/astrology/compatibility-score';
};
export type CalculateCompatibilityErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CalculateCompatibilityError = CalculateCompatibilityErrors[keyof CalculateCompatibilityErrors];
export type CalculateCompatibilityResponses = {
    /**
     * Compatibility score calculated successfully
     */
    200: {
        /**
         * Overall compatibility score (0-100). Weighted average across romantic, emotional, intellectual, physical, and spiritual categories.
         */
        overallScore: number;
        /**
         * Compatibility breakdown by life area. Each category evaluates specific planetary pair interactions that govern that domain.
         */
        categories: {
            /**
             * Romantic compatibility score based on Sun-Moon, Venus-Mars, and Sun-Venus inter-aspects.
             */
            romantic: number;
            /**
             * Emotional compatibility score based on Moon-Moon and Moon-Venus inter-aspects.
             */
            emotional: number;
            /**
             * Intellectual compatibility score based on Mercury-Mercury and Sun-Mercury inter-aspects.
             */
            intellectual: number;
            /**
             * Physical compatibility score based on Mars-Mars and Mars-Sun inter-aspects.
             */
            physical: number;
            /**
             * Spiritual compatibility score based on Jupiter-Sun and Jupiter-Jupiter inter-aspects.
             */
            spiritual: number;
        };
        /**
         * Summary of key planetary positions for both people. Includes the four planets most relevant to relationship compatibility.
         */
        persons: {
            /**
             * Key planet positions for person 1. Sun, Moon, Venus, and Mars sign placements.
             */
            person1: {
                /**
                 * Sun sign position. Core identity and ego.
                 */
                sun: {
                    /**
                     * Zodiac sign this planet occupies in the tropical zodiac.
                     */
                    sign: string;
                    /**
                     * Degree within the zodiac sign (0-29.999).
                     */
                    degree: number;
                };
                /**
                 * Moon sign position. Emotional nature and instincts.
                 */
                moon: {
                    /**
                     * Zodiac sign this planet occupies in the tropical zodiac.
                     */
                    sign: string;
                    /**
                     * Degree within the zodiac sign (0-29.999).
                     */
                    degree: number;
                };
                /**
                 * Venus sign position. Love language and relationship style.
                 */
                venus: {
                    /**
                     * Zodiac sign this planet occupies in the tropical zodiac.
                     */
                    sign: string;
                    /**
                     * Degree within the zodiac sign (0-29.999).
                     */
                    degree: number;
                };
                /**
                 * Mars sign position. Passion, desire, and conflict style.
                 */
                mars: {
                    /**
                     * Zodiac sign this planet occupies in the tropical zodiac.
                     */
                    sign: string;
                    /**
                     * Degree within the zodiac sign (0-29.999).
                     */
                    degree: number;
                };
            };
            /**
             * Key planet positions for person 2. Sun, Moon, Venus, and Mars sign placements.
             */
            person2: {
                /**
                 * Sun sign position. Core identity and ego.
                 */
                sun: {
                    /**
                     * Zodiac sign this planet occupies in the tropical zodiac.
                     */
                    sign: string;
                    /**
                     * Degree within the zodiac sign (0-29.999).
                     */
                    degree: number;
                };
                /**
                 * Moon sign position. Emotional nature and instincts.
                 */
                moon: {
                    /**
                     * Zodiac sign this planet occupies in the tropical zodiac.
                     */
                    sign: string;
                    /**
                     * Degree within the zodiac sign (0-29.999).
                     */
                    degree: number;
                };
                /**
                 * Venus sign position. Love language and relationship style.
                 */
                venus: {
                    /**
                     * Zodiac sign this planet occupies in the tropical zodiac.
                     */
                    sign: string;
                    /**
                     * Degree within the zodiac sign (0-29.999).
                     */
                    degree: number;
                };
                /**
                 * Mars sign position. Passion, desire, and conflict style.
                 */
                mars: {
                    /**
                     * Zodiac sign this planet occupies in the tropical zodiac.
                     */
                    sign: string;
                    /**
                     * Degree within the zodiac sign (0-29.999).
                     */
                    degree: number;
                };
            };
        };
        /**
         * Sign-by-sign compatibility analysis for the four key relationship planets. Each entry describes how the two signs interact through that planetary lens.
         */
        signCompatibility: {
            /**
             * Sun sign compatibility. Reveals core personality dynamic as a couple.
             */
            sun: {
                /**
                 * Person 1 sign for this planet.
                 */
                person1Sign: string;
                /**
                 * Person 2 sign for this planet.
                 */
                person2Sign: string;
                /**
                 * Narrative analysis of how these two signs interact through this planet.
                 */
                description: string;
            };
            /**
             * Moon sign compatibility. Reveals how you process emotions and nurture each other.
             */
            moon: {
                /**
                 * Person 1 sign for this planet.
                 */
                person1Sign: string;
                /**
                 * Person 2 sign for this planet.
                 */
                person2Sign: string;
                /**
                 * Narrative analysis of how these two signs interact through this planet.
                 */
                description: string;
            };
            /**
             * Venus sign compatibility. Reveals love languages and what you find beautiful together.
             */
            venus: {
                /**
                 * Person 1 sign for this planet.
                 */
                person1Sign: string;
                /**
                 * Person 2 sign for this planet.
                 */
                person2Sign: string;
                /**
                 * Narrative analysis of how these two signs interact through this planet.
                 */
                description: string;
            };
            /**
             * Mars sign compatibility. Reveals how you handle passion, conflict, and desire.
             */
            mars: {
                /**
                 * Person 1 sign for this planet.
                 */
                person1Sign: string;
                /**
                 * Person 2 sign for this planet.
                 */
                person2Sign: string;
                /**
                 * Narrative analysis of how these two signs interact through this planet.
                 */
                description: string;
            };
        };
        /**
         * Elemental balance comparison. Shows how fire, earth, air, and water energy is distributed across both charts.
         */
        elementBalance: {
            /**
             * Element distribution across person 1 natal planets.
             */
            person1: {
                /**
                 * Count of planets in fire signs (Aries, Leo, Sagittarius).
                 */
                fire: number;
                /**
                 * Count of planets in earth signs (Taurus, Virgo, Capricorn).
                 */
                earth: number;
                /**
                 * Count of planets in air signs (Gemini, Libra, Aquarius).
                 */
                air: number;
                /**
                 * Count of planets in water signs (Cancer, Scorpio, Pisces).
                 */
                water: number;
            };
            /**
             * Element distribution across person 2 natal planets.
             */
            person2: {
                /**
                 * Count of planets in fire signs (Aries, Leo, Sagittarius).
                 */
                fire: number;
                /**
                 * Count of planets in earth signs (Taurus, Virgo, Capricorn).
                 */
                earth: number;
                /**
                 * Count of planets in air signs (Gemini, Libra, Aquarius).
                 */
                air: number;
                /**
                 * Count of planets in water signs (Cancer, Scorpio, Pisces).
                 */
                water: number;
            };
            /**
             * Dominant element shared by both charts, or null if dominant elements differ.
             */
            sharedElement: string;
            /**
             * How the elemental balance between charts shapes the relationship dynamic.
             */
            description: string;
        };
        /**
         * Relationship archetype based on score pattern, category strengths, and elemental balance. One of eight archetypes: Kindred Spirits, Opposites Attract, The Power Couple, The Nurturers, The Adventurers, Growth Partners, The Balancers, The Mystics.
         */
        archetype: {
            /**
             * Relationship archetype label. A headline-friendly label for the dynamic.
             */
            label: string;
            /**
             * Narrative description of the relationship archetype and what it means.
             */
            description: string;
        };
        /**
         * Top relationship strengths based on harmonious inter-chart aspects. Each includes the planet pair, aspect type, and relationship-specific interpretation.
         */
        strengths: Array<string>;
        /**
         * Potential friction points based on challenging inter-chart aspects. Each includes specific guidance for navigating the tension.
         */
        challenges: Array<string>;
        /**
         * Narrative overview of the relationship compatibility, highlighting the dominant themes.
         */
        summary: string;
        /**
         * Detailed compatibility interpretation analyzing the synastry aspect patterns between both charts.
         */
        interpretation: string;
        /**
         * Synastry aspect breakdown showing the balance of harmonious, challenging, and neutral inter-chart aspects.
         */
        aspectBreakdown: {
            /**
             * Total number of inter-chart aspects found between the two natal charts.
             */
            total: number;
            /**
             * Count of harmonious aspects (trine, sextile). These indicate natural ease and flow.
             */
            harmonious: number;
            /**
             * Count of challenging aspects (square, opposition). These create dynamic tension and growth.
             */
            challenging: number;
            /**
             * Count of neutral aspects (conjunction). Outcome depends on the planets involved.
             */
            neutral: number;
        };
        /**
         * The most significant inter-chart aspects involving personal planets (Sun through Saturn), sorted by strength. Each includes a relationship-specific interpretation.
         */
        keyAspects: Array<{
            /**
             * First planet in the aspect.
             */
            planet1: string;
            /**
             * Second planet in the aspect.
             */
            planet2: string;
            /**
             * Aspect type (conjunction, trine, square, etc.).
             */
            type: string;
            /**
             * Deviation from exact aspect in degrees. Tighter orb = stronger influence.
             */
            orb: number;
            /**
             * Aspect nature. Harmonious flows easily. Challenging creates growth-oriented tension.
             */
            interpretation: 'harmonious' | 'challenging' | 'neutral';
            /**
             * Relationship-specific interpretation of this aspect between the two charts.
             */
            description: string;
        }>;
    };
};
export type CalculateCompatibilityResponse = CalculateCompatibilityResponses[keyof CalculateCompatibilityResponses];
export type GetDailyHoroscopeData = {
    body?: never;
    path: {
        /**
         * Zodiac sign, case-insensitive (e.g., aries, Aries, ARIES all work).
         */
        sign: 'aries' | 'taurus' | 'gemini' | 'cancer' | 'leo' | 'virgo' | 'libra' | 'scorpio' | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';
    };
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
        /**
         * Forecast date in YYYY-MM-DD format. Defaults to today. Supports future and past dates for editorial scheduling.
         */
        date?: string;
    };
    url: '/astrology/horoscope/{sign}/daily';
};
export type GetDailyHoroscopeErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetDailyHoroscopeError = GetDailyHoroscopeErrors[keyof GetDailyHoroscopeErrors];
export type GetDailyHoroscopeResponses = {
    /**
     * Daily horoscope retrieved successfully
     */
    200: {
        /**
         * Zodiac sign for this horoscope.
         */
        sign: string;
        /**
         * Date of this daily horoscope (YYYY-MM-DD).
         */
        date: string;
        /**
         * General daily overview based on Moon house activation and planetary transits. Unique per sign based on whole-sign house positions.
         */
        overview: string;
        /**
         * Love and relationship forecast. Based on Venus house position relative to this sign, providing unique guidance per sign.
         */
        love: string;
        /**
         * Career and professional outlook. Based on Mars house position relative to this sign, with Saturn and Jupiter influences.
         */
        career: string;
        /**
         * Health, energy, and wellness guidance for the day.
         */
        health: string;
        /**
         * Financial outlook and money-related guidance.
         */
        finance: string;
        /**
         * Actionable daily advice based on the dominant transit energy.
         */
        advice: string;
        /**
         * Lucky number for the day.
         */
        luckyNumber: number;
        /**
         * Lucky color for the day, derived from the sign element.
         */
        luckyColor: string;
        /**
         * Most compatible zodiac signs for this sign. Trine partners (same element) followed by a sextile partner (complementary element). Use for compatibility widgets, dating app onboarding, and horoscope cards.
         */
        compatibleSigns: Array<string>;
        /**
         * Active planetary transits affecting this sign today, with house activations. Each transit shows the planet, its current sign, and which house it activates for the queried sign.
         */
        activeTransits: Array<string>;
        /**
         * Current Moon sign. Changes every 2-3 days, sets the emotional tone for all signs.
         */
        moonSign: string;
        /**
         * Current lunar phase (New Moon, Waxing Crescent, First Quarter, Waxing Gibbous, Full Moon, Waning Gibbous, Last Quarter, Waning Crescent).
         */
        moonPhase: string;
        /**
         * Overall energy intensity for this sign today (1-10). Higher when more transits activate this sign directly. Useful for content widgets and visual indicators.
         */
        energyRating: number;
    };
};
export type GetDailyHoroscopeResponse = GetDailyHoroscopeResponses[keyof GetDailyHoroscopeResponses];
export type GetWeeklyHoroscopeData = {
    body?: never;
    path: {
        /**
         * Zodiac sign, case-insensitive (e.g., aries, Aries, ARIES all work).
         */
        sign: 'aries' | 'taurus' | 'gemini' | 'cancer' | 'leo' | 'virgo' | 'libra' | 'scorpio' | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';
    };
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/astrology/horoscope/{sign}/weekly';
};
export type GetWeeklyHoroscopeErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetWeeklyHoroscopeError = GetWeeklyHoroscopeErrors[keyof GetWeeklyHoroscopeErrors];
export type GetWeeklyHoroscopeResponses = {
    /**
     * Weekly horoscope retrieved successfully
     */
    200: {
        /**
         * Zodiac sign for this horoscope.
         */
        sign: string;
        /**
         * Start date of the forecast week (Monday).
         */
        week: string;
        /**
         * Weekly overview highlighting the dominant planetary transits through the sign.
         */
        overview: string;
        /**
         * Weekly love and relationship forecast.
         */
        love: string;
        /**
         * Weekly career and professional outlook.
         */
        career: string;
        /**
         * Weekly health, energy, and wellness guidance.
         */
        health: string;
        /**
         * Weekly financial outlook.
         */
        finance: string;
        /**
         * Actionable weekly guidance based on transit patterns.
         */
        advice: string;
        /**
         * Favorable days this week, based on planetary rulership.
         */
        luckyDays: Array<string>;
        /**
         * Lucky numbers for the week.
         */
        luckyNumbers: Array<number>;
        /**
         * Most compatible zodiac signs for this sign. Trine partners (same element) followed by a sextile partner (complementary element).
         */
        compatibleSigns: Array<string>;
    };
};
export type GetWeeklyHoroscopeResponse = GetWeeklyHoroscopeResponses[keyof GetWeeklyHoroscopeResponses];
export type GetMonthlyHoroscopeData = {
    body?: never;
    path: {
        /**
         * Zodiac sign, case-insensitive (e.g., aries, Aries, ARIES all work).
         */
        sign: 'aries' | 'taurus' | 'gemini' | 'cancer' | 'leo' | 'virgo' | 'libra' | 'scorpio' | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';
    };
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/astrology/horoscope/{sign}/monthly';
};
export type GetMonthlyHoroscopeErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetMonthlyHoroscopeError = GetMonthlyHoroscopeErrors[keyof GetMonthlyHoroscopeErrors];
export type GetMonthlyHoroscopeResponses = {
    /**
     * Monthly horoscope retrieved successfully
     */
    200: {
        /**
         * Zodiac sign for this horoscope.
         */
        sign: string;
        /**
         * Month of this forecast (YYYY-MM).
         */
        month: string;
        /**
         * Monthly overview covering the major planetary transits and their impact on the sign.
         */
        overview: string;
        /**
         * Monthly love and relationship forecast.
         */
        love: string;
        /**
         * Monthly career and professional outlook.
         */
        career: string;
        /**
         * Monthly health and wellness guidance.
         */
        health: string;
        /**
         * Monthly financial outlook and guidance.
         */
        finance: string;
        /**
         * Week-by-week breakdown with sign-specific focus areas based on transit house positions.
         */
        weekByWeek: Array<{
            /**
             * Week number within the month (1-4).
             */
            week: number;
            /**
             * Primary focus area for this week, derived from planetary house activations for this sign.
             */
            focus: string;
            /**
             * Specific guidance for this week.
             */
            advice: string;
        }>;
        /**
         * Key astrological dates this month with actual New Moon, Full Moon, and retrograde dates calculated from ephemeris data.
         */
        keyDates: Array<{
            /**
             * Date of the astrological event (YYYY-MM-DD).
             */
            date: string;
            /**
             * Astrological event active on this date (lunar phases, retrogrades, sign ingresses).
             */
            event: string;
        }>;
        /**
         * Lucky numbers for the month.
         */
        luckyNumbers: Array<number>;
        /**
         * Lucky color for the month.
         */
        luckyColor: string;
        /**
         * Most compatible zodiac signs for this sign. Trine partners (same element) followed by a sextile partner (complementary element).
         */
        compatibleSigns: Array<string>;
    };
};
export type GetMonthlyHoroscopeResponse = GetMonthlyHoroscopeResponses[keyof GetMonthlyHoroscopeResponses];
export type GeneratePlanetaryReturnData = {
    body?: {
        /**
         * Original birth date in YYYY-MM-DD format. Used to determine the natal longitude of the selected planet.
         */
        birthDate: string;
        /**
         * Original birth time in 24-hour HH:MM:SS format. Determines exact natal planet position for return timing.
         */
        birthTime: string;
        /**
         * Planet for the return calculation. Supports Mercury (~88 days), Venus (~225 days), Mars (~687 days), Jupiter (~12 years), and Saturn (~29 years). Saturn return is a major life milestone in Western astrology.
         */
        planet: 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn';
        /**
         * Approximate date near the expected planetary return (YYYY-MM-DD). Provide a date within the expected return window — the algorithm searches from this starting point.
         */
        approximateDate: string;
        /**
         * Latitude of the return location in decimal degrees. Affects house cusps and Ascendant of the return chart.
         */
        latitude: number;
        /**
         * Longitude of the return location in decimal degrees.
         */
        longitude: number;
        /**
         * Decimal hours from UTC OR IANA name (e.g. "America/New_York"). IANA resolved to the DST-correct offset for the birthDate. Output datetime is adjusted to this timezone.
         */
        timezone: number | string;
        /**
         * House system for the return chart. Placidus (default), Whole Sign, Equal, or Koch.
         */
        houseSystem?: 'placidus' | 'whole-sign' | 'equal' | 'koch';
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/astrology/planetary-returns';
};
export type GeneratePlanetaryReturnErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GeneratePlanetaryReturnError = GeneratePlanetaryReturnErrors[keyof GeneratePlanetaryReturnErrors];
export type GeneratePlanetaryReturnResponses = {
    /**
     * Planetary return chart calculated successfully
     */
    200: {
        /**
         * Original birth date used for natal planet longitude calculation.
         */
        birthDate: string;
        /**
         * Planet whose return was calculated. Each planet has a different orbital period and return significance.
         */
        planet: string;
        /**
         * Exact planetary return moment — when the transiting planet conjuncts its natal longitude. Adjusted to requested timezone. Marks the beginning of a new cycle for that planet in your life.
         */
        returnDate: string;
        /**
         * Approximate orbital period for this planet. Mercury ~88 days, Venus ~225 days, Mars ~687 days (~1.9 years), Jupiter ~12 years, Saturn ~29 years.
         */
        approximateCycle: string;
        /**
         * Location used for the planetary return chart house and Ascendant calculations.
         */
        location: {
            /**
             * Observer latitude used for house cusp calculation in the return chart.
             */
            latitude: number;
            /**
             * Observer longitude used for Midheaven and local sidereal time.
             */
            longitude: number;
            /**
             * Timezone offset from UTC applied to output datetime formatting.
             */
            timezone: number;
        };
        /**
         * Full tropical zodiac chart erected for the planetary return moment. Contains planetary positions, house cusps, aspects, Ascendant, and Midheaven.
         */
        chart: {
            /**
             * Birth details used to generate this chart.
             */
            birthDetails: {
                /**
                 * Birth date in YYYY-MM-DD format. Determines planetary positions for the specific calendar day.
                 */
                date: string;
                /**
                 * Birth time in 24-hour HH:MM:SS format. Determines the Ascendant (rising sign) and house cusps. Use 12:00:00 if unknown.
                 */
                time: string;
                /**
                 * Birth location latitude in decimal degrees (-90 to 90). Positive = North, negative = South.
                 */
                latitude: number;
                /**
                 * Birth location longitude in decimal degrees (-180 to 180). Positive = East, negative = West.
                 */
                longitude: number;
                /**
                 * Timezone offset from UTC in decimal hours. Examples: New York = -5, London = 0, India = 5.5, Tokyo = 9.
                 */
                timezone: number;
            };
            /**
             * All 10 planetary positions (Sun through Pluto) in the tropical zodiac with house placements.
             */
            planets: Array<{
                /**
                 * Planet name (Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto).
                 */
                name: 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto' | 'North Node' | 'South Node' | 'Chiron';
                /**
                 * Tropical ecliptic longitude in degrees (0-360). Primary coordinate for zodiac sign and aspect calculations.
                 */
                longitude: number;
                /**
                 * Ecliptic latitude in degrees. Near zero for most planets, varies for Moon and Pluto.
                 */
                latitude: number;
                /**
                 * Tropical zodiac sign this planet occupies. Determined by 30-degree divisions of ecliptic longitude.
                 */
                sign: string;
                /**
                 * Degree within the zodiac sign (0-29.999). Indicates how far the planet has progressed through the sign.
                 */
                degree: number;
                /**
                 * House placement (1-12). Determined by the selected house system and birth location.
                 */
                house: number;
                /**
                 * Daily motion in degrees per day. Negative values indicate retrograde motion.
                 */
                speed: number;
                /**
                 * Whether the planet appears to move backward from Earth perspective. Retrograde periods signal review and introspection.
                 */
                isRetrograde: boolean;
            }>;
            /**
             * All 12 house cusps calculated using the selected house system.
             */
            houses: Array<{
                /**
                 * House number (1-12). Each house governs specific life themes in Western astrology.
                 */
                number: number;
                /**
                 * Ecliptic longitude of this house cusp in degrees (0-360).
                 */
                longitude: number;
                /**
                 * Zodiac sign on this house cusp. Colors the themes of this life area.
                 */
                sign: string;
                /**
                 * Degree within the zodiac sign on this cusp (0-29.999).
                 */
                degree: number;
            }>;
            /**
             * House system used for this chart (placidus, whole-sign, equal, or koch).
             */
            houseSystem: 'placidus' | 'whole-sign' | 'equal' | 'koch';
            /**
             * All planetary aspects found in this chart with orbs, strength, and applying/separating status.
             */
            aspects: Array<{
                /**
                 * First planet in the aspect pair.
                 */
                planet1: 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto' | 'North Node' | 'South Node' | 'Chiron';
                /**
                 * Second planet in the aspect pair.
                 */
                planet2: 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto' | 'North Node' | 'South Node' | 'Chiron';
                /**
                 * Aspect type. Major: conjunction (0), opposition (180), trine (120), square (90), sextile (60). Minor: semi-sextile, quincunx, semi-square, sesquiquadrate.
                 */
                type: 'CONJUNCTION' | 'OPPOSITION' | 'TRINE' | 'SQUARE' | 'SEXTILE' | 'SEMI_SEXTILE' | 'QUINCUNX' | 'SEMI_SQUARE' | 'SESQUIQUADRATE';
                /**
                 * Exact angular separation that defines this aspect type in degrees.
                 */
                angle: number;
                /**
                 * Deviation from exact aspect in degrees. Tighter orb means stronger influence.
                 */
                orb: number;
                /**
                 * Whether the aspect is applying (planets moving toward exact) or separating (moving apart). Applying aspects grow stronger.
                 */
                isApplying: boolean;
                /**
                 * Aspect strength percentage (0-100). Based on orb tightness relative to the allowed maximum.
                 */
                strength: number;
                /**
                 * Aspect nature. Harmonious (trine, sextile) flows easily. Challenging (square, opposition) creates tension and growth. Neutral (conjunction) blends energies.
                 */
                interpretation: 'harmonious' | 'challenging' | 'neutral';
            }>;
        };
        /**
         * Original natal planet position that defines the return. The transiting planet conjuncts this longitude to trigger the return.
         */
        natalPlanetPosition: {
            /**
             * Natal planet ecliptic longitude in degrees (0-360). The transiting planet returns to this exact degree.
             */
            longitude: number;
            /**
             * Tropical zodiac sign of the natal planet position.
             */
            sign: string;
            /**
             * Degree within the zodiac sign (0-29.999).
             */
            degree: number;
        };
        /**
         * Planetary return interpretation. Saturn returns (~29 years) mark major life milestones. Jupiter returns (~12 years) signal growth cycles. Inner planet returns offer shorter-term insights.
         */
        interpretation: {
            /**
             * Narrative overview of this planetary return cycle and its significance for personal development.
             */
            summary: string;
            /**
             * Key life themes activated during this return cycle. Focus areas vary by planet — Jupiter brings expansion, Saturn brings structure and responsibility.
             */
            keyThemes: Array<string>;
        };
    };
};
export type GeneratePlanetaryReturnResponse = GeneratePlanetaryReturnResponses[keyof GeneratePlanetaryReturnResponses];
export type GenerateBirthChartData = {
    body?: BirthChartRequest;
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/vedic-astrology/birth-chart';
};
export type GenerateBirthChartErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GenerateBirthChartError = GenerateBirthChartErrors[keyof GenerateBirthChartErrors];
export type GenerateBirthChartResponses = {
    /**
     * D1 Rashi birth chart with all 12 houses, 9 grahas plus Lagna, combustion analysis (Surya Siddhanta orbs), planetary war detection, bhava interpretations, and a meta lookup keyed by planet name.
     */
    200: BirthChartResponse;
};
export type GenerateBirthChartResponse = GenerateBirthChartResponses[keyof GenerateBirthChartResponses];
export type GenerateNavamsaData = {
    body?: NavamsaRequest;
    path?: never;
    query?: never;
    url: '/vedic-astrology/navamsa';
};
export type GenerateNavamsaErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GenerateNavamsaError = GenerateNavamsaErrors[keyof GenerateNavamsaErrors];
export type GenerateNavamsaResponses = {
    /**
     * D9 Navamsa chart with all 12 houses, 9 grahas plus Lagna, Vargottama planet detection, and Vargottama significance explanation. Same structure as birth chart response.
     */
    200: NavamsaResponse;
};
export type GenerateNavamsaResponse = GenerateNavamsaResponses[keyof GenerateNavamsaResponses];
export type GenerateDivisionalChartData = {
    body?: DivisionalChartRequest;
    path?: never;
    query?: never;
    url: '/vedic-astrology/divisional-chart';
};
export type GenerateDivisionalChartErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GenerateDivisionalChartError = GenerateDivisionalChartErrors[keyof GenerateDivisionalChartErrors];
export type GenerateDivisionalChartResponses = {
    /**
     * Divisional chart calculated successfully
     */
    200: DivisionalChartResponse;
};
export type GenerateDivisionalChartResponse = GenerateDivisionalChartResponses[keyof GenerateDivisionalChartResponses];
export type CalculateGunMilanData = {
    body?: CompatibilityRequest;
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/vedic-astrology/compatibility';
};
export type CalculateGunMilanErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CalculateGunMilanError = CalculateGunMilanErrors[keyof CalculateGunMilanErrors];
export type CalculateGunMilanResponses = {
    /**
     * Ashtakoot Gun Milan result with total score out of 36, percentage, compatibility verdict, detected doshas (Nadi/Bhakoot) with cancellation analysis, dosha cancellation reasons when applicable, recommendation, and detailed breakdown of all 8 kootas.
     */
    200: CompatibilityResponse;
};
export type CalculateGunMilanResponse = CalculateGunMilanResponses[keyof CalculateGunMilanResponses];
export type GetPlanetPositionsData = {
    body?: PlanetaryPositionsRequest;
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/vedic-astrology/planetary-positions';
};
export type GetPlanetPositionsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetPlanetPositionsError = GetPlanetPositionsErrors[keyof GetPlanetPositionsErrors];
export type GetPlanetPositionsResponses = {
    /**
     * Successful planetary positions calculation
     */
    200: PlanetaryPositionsResponse;
};
export type GetPlanetPositionsResponse = GetPlanetPositionsResponses[keyof GetPlanetPositionsResponses];
export type GetMonthlyEphemerisData = {
    body?: {
        /**
         * Year for monthly ephemeris (1900-2100).
         */
        year: number;
        /**
         * Month number (1-12) for ephemeris.
         */
        month: number;
        /**
         * Coordinate system for longitude output. "sidereal" (Nirayana) uses Lahiri ayanamsa - standard for Vedic astrology. "tropical" (Sayana) uses raw ecliptic longitude matching Western astrology. Defaults to "sidereal".
         */
        coordinateSystem?: 'sidereal' | 'tropical';
    };
    path?: never;
    query?: never;
    url: '/vedic-astrology/planetary-positions/monthly';
};
export type GetMonthlyEphemerisErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetMonthlyEphemerisError = GetMonthlyEphemerisErrors[keyof GetMonthlyEphemerisErrors];
export type GetMonthlyEphemerisResponses = {
    /**
     * Monthly ephemeris data
     */
    200: {
        /**
         * Year of the ephemeris.
         */
        year: number;
        /**
         * Month of the ephemeris.
         */
        month: number;
        /**
         * Daily planetary position entries for the entire month.
         */
        days: Array<{
            /**
             * Date in YYYY-MM-DD format.
             */
            date: string;
            /**
             * Sidereal positions of all 9 Vedic planets on this date at noon UTC.
             */
            positions: Array<{
                /**
                 * Planet name, one of the Navagraha (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu).
                 */
                planet: string;
                /**
                 * Sidereal ecliptic longitude in degrees (0-360) using Lahiri ayanamsa.
                 */
                longitude: number;
                /**
                 * Zodiac sign (rashi) the planet occupies on this date.
                 */
                sign: string;
                /**
                 * Degrees traversed within the current sign (0-30). Useful for precise transit tracking.
                 */
                degreeInSign: number;
                /**
                 * Whether the planet is in retrograde motion (vakri) on this date.
                 */
                isRetrograde: boolean;
            }>;
        }>;
    };
};
export type GetMonthlyEphemerisResponse = GetMonthlyEphemerisResponses[keyof GetMonthlyEphemerisResponses];
export type GetCurrentDashaData = {
    body?: {
        /**
         * Birth date in YYYY-MM-DD format. Date determines planetary positions and nakshatra calculations for Vedic kundli (janam patri). Accurate birth date is essential for dashas, yoga calculations, and divisional charts (vargas).
         */
        date: string;
        /**
         * Birth time in 24-hour HH:MM:SS format. Time is CRITICAL for Lagna (Ascendant) calculation and house divisions - changes every ~2 hours. Even minutes matter for accurate nakshatra pada and divisional chart (D9, D10) calculations. Without exact time, Lagna and house-based predictions will be incorrect.
         */
        time: string;
        /**
         * Birth location latitude in decimal degrees. Location determines local sidereal time for Lagna calculation and affects bhava (house) cusps. Example: Delhi 28.6139, Mumbai 19.0760, Kathmandu 27.7172.
         */
        latitude: number;
        /**
         * Birth location longitude in decimal degrees. Affects local time calculations and ayanamsha adjustments. Example: Delhi 77.2090, Mumbai 72.8777, Kathmandu 85.3240.
         */
        longitude: number;
        /**
         * Timezone: decimal hours from UTC (e.g. 5.5 for IST, -5 for EST) OR IANA name (e.g. "Asia/Kolkata", "America/New_York"). IANA strings are resolved to the DST-correct offset for the given date, so you can pass `cities[0].timezone` from /location/search directly. Defaults to 5.5 (IST).
         */
        timezone?: number | string;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/vedic-astrology/dasha/current';
};
export type GetCurrentDashaErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetCurrentDashaError = GetCurrentDashaErrors[keyof GetCurrentDashaErrors];
export type GetCurrentDashaResponses = {
    /**
     * Currently active Mahadasha, Antardasha, and Pratyantardasha with start/end dates, remaining balance, Moon nakshatra, and Vedic interpretations for each period.
     */
    200: {
        /**
         * Birth Moon nakshatra number (1-27). This nakshatra determines the starting dasha lord in the Vimshottari 120-year cycle.
         */
        moonNakshatra: number;
        /**
         * Name of the birth Moon nakshatra (lunar mansion). One of 27 Vedic nakshatras from Ashwini to Revati.
         */
        nakshatraName: string;
        /**
         * Vimshottari dasha lord of the birth nakshatra. This planet rules the first Mahadasha in the native life cycle.
         */
        nakshatraLord: 'Ketu' | 'Venus' | 'Sun' | 'Moon' | 'Mars' | 'Rahu' | 'Jupiter' | 'Saturn' | 'Mercury';
        /**
         * Mahadasha (major planetary period) in the 120-year Vimshottari dasha cycle. Start and end dates are determined by Moon nakshatra at birth.
         */
        mahadasha: {
            /**
             * Ruling graha of this Vimshottari dasha period. One of 9 planets in the Ketu-Venus-Sun-Moon-Mars-Rahu-Jupiter-Saturn-Mercury sequence.
             */
            planet: 'Ketu' | 'Venus' | 'Sun' | 'Moon' | 'Mars' | 'Rahu' | 'Jupiter' | 'Saturn' | 'Mercury';
            /**
             * Start datetime of this dasha period. Adjusted to the requested timezone offset.
             */
            startDate: string;
            /**
             * End datetime of this dasha period. Adjusted to the requested timezone offset.
             */
            endDate: string;
            /**
             * Duration of this dasha period in years. Mahadasha durations range from 6 years (Sun) to 20 years (Venus).
             */
            durationYears: number;
            /**
             * Vedic interpretation of the planetary period describing themes, karmic lessons, and life areas affected by this graha.
             */
            interpretation?: string;
        };
        /**
         * Antardasha (bhukti), sub-period within a Mahadasha. Each Mahadasha contains 9 Antardashas proportional to the Vimshottari years of each planet.
         */
        antardasha: {
            /**
             * Ruling graha of this Vimshottari dasha period. One of 9 planets in the Ketu-Venus-Sun-Moon-Mars-Rahu-Jupiter-Saturn-Mercury sequence.
             */
            planet: 'Ketu' | 'Venus' | 'Sun' | 'Moon' | 'Mars' | 'Rahu' | 'Jupiter' | 'Saturn' | 'Mercury';
            /**
             * Start datetime of this dasha period. Adjusted to the requested timezone offset.
             */
            startDate: string;
            /**
             * End datetime of this dasha period. Adjusted to the requested timezone offset.
             */
            endDate: string;
            /**
             * Duration of this dasha period in years. Mahadasha durations range from 6 years (Sun) to 20 years (Venus).
             */
            durationYears: number;
            /**
             * Vedic interpretation of the planetary period describing themes, karmic lessons, and life areas affected by this graha.
             */
            interpretation?: string;
            /**
             * Parent Mahadasha lord under which this Antardasha sub-period runs.
             */
            mahadashaLord: 'Ketu' | 'Venus' | 'Sun' | 'Moon' | 'Mars' | 'Rahu' | 'Jupiter' | 'Saturn' | 'Mercury';
        };
        /**
         * Pratyantardasha (sub-sub-period), the third level of the Vimshottari dasha hierarchy, Provides finer timing within each Antardasha for event prediction.
         */
        pratyantardasha: {
            /**
             * Ruling graha of this Vimshottari dasha period. One of 9 planets in the Ketu-Venus-Sun-Moon-Mars-Rahu-Jupiter-Saturn-Mercury sequence.
             */
            planet: 'Ketu' | 'Venus' | 'Sun' | 'Moon' | 'Mars' | 'Rahu' | 'Jupiter' | 'Saturn' | 'Mercury';
            /**
             * Start datetime of this dasha period. Adjusted to the requested timezone offset.
             */
            startDate: string;
            /**
             * End datetime of this dasha period. Adjusted to the requested timezone offset.
             */
            endDate: string;
            /**
             * Duration of this dasha period in years. Mahadasha durations range from 6 years (Sun) to 20 years (Venus).
             */
            durationYears: number;
            /**
             * Vedic interpretation of the planetary period describing themes, karmic lessons, and life areas affected by this graha.
             */
            interpretation?: string;
            /**
             * Parent Mahadasha lord under which this Antardasha sub-period runs.
             */
            mahadashaLord: 'Ketu' | 'Venus' | 'Sun' | 'Moon' | 'Mars' | 'Rahu' | 'Jupiter' | 'Saturn' | 'Mercury';
            /**
             * Parent Antardasha lord under which this Pratyantardasha runs.
             */
            antardashaLord: 'Ketu' | 'Venus' | 'Sun' | 'Moon' | 'Mars' | 'Rahu' | 'Jupiter' | 'Saturn' | 'Mercury';
        };
        /**
         * Time remaining in the currently running Mahadasha (major period).
         */
        remainingInMahadasha: {
            /**
             * Full years remaining in this Vimshottari dasha period.
             */
            years: number;
            /**
             * Additional months remaining beyond full years.
             */
            months: number;
            /**
             * Additional days remaining beyond full months.
             */
            days: number;
            /**
             * Total remaining days in this dasha period. Useful for progress calculations.
             */
            totalDays: number;
        };
        /**
         * Time remaining in the currently running Antardasha (sub-period) within the Mahadasha.
         */
        remainingInAntardasha: {
            /**
             * Full years remaining in this Vimshottari dasha period.
             */
            years: number;
            /**
             * Additional months remaining beyond full years.
             */
            months: number;
            /**
             * Additional days remaining beyond full months.
             */
            days: number;
            /**
             * Total remaining days in this dasha period. Useful for progress calculations.
             */
            totalDays: number;
        };
        /**
         * Time remaining in the currently running Pratyantardasha (sub-sub-period).
         */
        remainingInPratyantardasha: {
            /**
             * Full years remaining in this Vimshottari dasha period.
             */
            years: number;
            /**
             * Additional months remaining beyond full years.
             */
            months: number;
            /**
             * Additional days remaining beyond full months.
             */
            days: number;
            /**
             * Total remaining days in this dasha period. Useful for progress calculations.
             */
            totalDays: number;
        };
    };
};
export type GetCurrentDashaResponse = GetCurrentDashaResponses[keyof GetCurrentDashaResponses];
export type GetMajorDashasData = {
    body?: {
        /**
         * Birth date in YYYY-MM-DD format. Date determines planetary positions and nakshatra calculations for Vedic kundli (janam patri). Accurate birth date is essential for dashas, yoga calculations, and divisional charts (vargas).
         */
        date: string;
        /**
         * Birth time in 24-hour HH:MM:SS format. Time is CRITICAL for Lagna (Ascendant) calculation and house divisions - changes every ~2 hours. Even minutes matter for accurate nakshatra pada and divisional chart (D9, D10) calculations. Without exact time, Lagna and house-based predictions will be incorrect.
         */
        time: string;
        /**
         * Birth location latitude in decimal degrees. Location determines local sidereal time for Lagna calculation and affects bhava (house) cusps. Example: Delhi 28.6139, Mumbai 19.0760, Kathmandu 27.7172.
         */
        latitude: number;
        /**
         * Birth location longitude in decimal degrees. Affects local time calculations and ayanamsha adjustments. Example: Delhi 77.2090, Mumbai 72.8777, Kathmandu 85.3240.
         */
        longitude: number;
        /**
         * Timezone: decimal hours from UTC (e.g. 5.5 for IST, -5 for EST) OR IANA name (e.g. "Asia/Kolkata", "America/New_York"). IANA strings are resolved to the DST-correct offset for the given date, so you can pass `cities[0].timezone` from /location/search directly. Defaults to 5.5 (IST).
         */
        timezone?: number | string;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/vedic-astrology/dasha/major';
};
export type GetMajorDashasErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetMajorDashasError = GetMajorDashasErrors[keyof GetMajorDashasErrors];
export type GetMajorDashasResponses = {
    /**
     * Complete 120-year Vimshottari Dasha timeline with all 9 Mahadasha periods, birth dasha balance, Moon nakshatra, and start/end dates for each planetary period.
     */
    200: {
        /**
         * Birth Moon nakshatra number (1-27) that determines the Vimshottari starting point.
         */
        moonNakshatra: number;
        /**
         * Birth Moon nakshatra name, one of 27 Vedic lunar mansions.
         */
        nakshatraName: string;
        /**
         * Dasha lord of the birth nakshatra, rules the first Mahadasha.
         */
        nakshatraLord: 'Ketu' | 'Venus' | 'Sun' | 'Moon' | 'Mars' | 'Rahu' | 'Jupiter' | 'Saturn' | 'Mercury';
        /**
         * Remaining balance of the first Mahadasha at birth. Based on Moon degree within the birth nakshatra. partial dasha already elapsed before birth.
         */
        birthDashaBalance: {
            /**
             * Full years remaining in this Vimshottari dasha period.
             */
            years: number;
            /**
             * Additional months remaining beyond full years.
             */
            months: number;
            /**
             * Additional days remaining beyond full months.
             */
            days: number;
            /**
             * Total remaining days in this dasha period. Useful for progress calculations.
             */
            totalDays: number;
        };
        /**
         * Complete sequence of all 9 Mahadasha periods spanning 120 years from birth. Follows the Vimshottari order: Ketu(7), Venus(20), Sun(6), Moon(10), Mars(7), Rahu(18), Jupiter(16), Saturn(19), Mercury(17).
         */
        mahadashas: Array<{
            /**
             * Ruling graha of this Vimshottari dasha period. One of 9 planets in the Ketu-Venus-Sun-Moon-Mars-Rahu-Jupiter-Saturn-Mercury sequence.
             */
            planet: 'Ketu' | 'Venus' | 'Sun' | 'Moon' | 'Mars' | 'Rahu' | 'Jupiter' | 'Saturn' | 'Mercury';
            /**
             * Start datetime of this dasha period. Adjusted to the requested timezone offset.
             */
            startDate: string;
            /**
             * End datetime of this dasha period. Adjusted to the requested timezone offset.
             */
            endDate: string;
            /**
             * Duration of this dasha period in years. Mahadasha durations range from 6 years (Sun) to 20 years (Venus).
             */
            durationYears: number;
            /**
             * Vedic interpretation of the planetary period describing themes, karmic lessons, and life areas affected by this graha.
             */
            interpretation?: string;
        }>;
        /**
         * Total Vimshottari cycle length in years (always 120).
         */
        totalYears: number;
    };
};
export type GetMajorDashasResponse = GetMajorDashasResponses[keyof GetMajorDashasResponses];
export type GetSubDashasData = {
    body?: {
        /**
         * Birth date in YYYY-MM-DD format. Date determines planetary positions and nakshatra calculations for Vedic kundli (janam patri). Accurate birth date is essential for dashas, yoga calculations, and divisional charts (vargas).
         */
        date: string;
        /**
         * Birth time in 24-hour HH:MM:SS format. Time is CRITICAL for Lagna (Ascendant) calculation and house divisions - changes every ~2 hours. Even minutes matter for accurate nakshatra pada and divisional chart (D9, D10) calculations. Without exact time, Lagna and house-based predictions will be incorrect.
         */
        time: string;
        /**
         * Birth location latitude in decimal degrees. Location determines local sidereal time for Lagna calculation and affects bhava (house) cusps. Example: Delhi 28.6139, Mumbai 19.0760, Kathmandu 27.7172.
         */
        latitude: number;
        /**
         * Birth location longitude in decimal degrees. Affects local time calculations and ayanamsha adjustments. Example: Delhi 77.2090, Mumbai 72.8777, Kathmandu 85.3240.
         */
        longitude: number;
        /**
         * Timezone: decimal hours from UTC (e.g. 5.5 for IST, -5 for EST) OR IANA name (e.g. "Asia/Kolkata", "America/New_York"). IANA strings are resolved to the DST-correct offset for the given date, so you can pass `cities[0].timezone` from /location/search directly. Defaults to 5.5 (IST).
         */
        timezone?: number | string;
    };
    path: {
        /**
         * Mahadasha planet name, case-insensitive (e.g., jupiter, Jupiter, JUPITER all work). Valid: Ketu, Venus, Sun, Moon, Mars, Rahu, Jupiter, Saturn, Mercury.
         */
        mahadasha: 'Ketu' | 'Venus' | 'Sun' | 'Moon' | 'Mars' | 'Rahu' | 'Jupiter' | 'Saturn' | 'Mercury';
    };
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/vedic-astrology/dasha/sub/{mahadasha}';
};
export type GetSubDashasErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetSubDashasError = GetSubDashasErrors[keyof GetSubDashasErrors];
export type GetSubDashasResponses = {
    /**
     * All 9 Antardasha sub-periods within the specified Mahadasha, with start/end dates and the parent Mahadasha period details.
     */
    200: {
        /**
         * Ruling planet of the requested Mahadasha period.
         */
        mahadashaLord: 'Ketu' | 'Venus' | 'Sun' | 'Moon' | 'Mars' | 'Rahu' | 'Jupiter' | 'Saturn' | 'Mercury';
        /**
         * Full details of the parent Mahadasha including start/end dates and duration.
         */
        mahadashaPeriod: {
            /**
             * Ruling graha of this Vimshottari dasha period. One of 9 planets in the Ketu-Venus-Sun-Moon-Mars-Rahu-Jupiter-Saturn-Mercury sequence.
             */
            planet: 'Ketu' | 'Venus' | 'Sun' | 'Moon' | 'Mars' | 'Rahu' | 'Jupiter' | 'Saturn' | 'Mercury';
            /**
             * Start datetime of this dasha period. Adjusted to the requested timezone offset.
             */
            startDate: string;
            /**
             * End datetime of this dasha period. Adjusted to the requested timezone offset.
             */
            endDate: string;
            /**
             * Duration of this dasha period in years. Mahadasha durations range from 6 years (Sun) to 20 years (Venus).
             */
            durationYears: number;
            /**
             * Vedic interpretation of the planetary period describing themes, karmic lessons, and life areas affected by this graha.
             */
            interpretation?: string;
        };
        /**
         * All 9 Antardasha sub-periods within this Mahadasha, proportional to each planet Vimshottari years. Sorted chronologically.
         */
        antardashas: Array<{
            /**
             * Ruling graha of this Vimshottari dasha period. One of 9 planets in the Ketu-Venus-Sun-Moon-Mars-Rahu-Jupiter-Saturn-Mercury sequence.
             */
            planet: 'Ketu' | 'Venus' | 'Sun' | 'Moon' | 'Mars' | 'Rahu' | 'Jupiter' | 'Saturn' | 'Mercury';
            /**
             * Start datetime of this dasha period. Adjusted to the requested timezone offset.
             */
            startDate: string;
            /**
             * End datetime of this dasha period. Adjusted to the requested timezone offset.
             */
            endDate: string;
            /**
             * Duration of this dasha period in years. Mahadasha durations range from 6 years (Sun) to 20 years (Venus).
             */
            durationYears: number;
            /**
             * Vedic interpretation of the planetary period describing themes, karmic lessons, and life areas affected by this graha.
             */
            interpretation?: string;
            /**
             * Parent Mahadasha lord under which this Antardasha sub-period runs.
             */
            mahadashaLord: 'Ketu' | 'Venus' | 'Sun' | 'Moon' | 'Mars' | 'Rahu' | 'Jupiter' | 'Saturn' | 'Mercury';
        }>;
    };
};
export type GetSubDashasResponse = GetSubDashasResponses[keyof GetSubDashasResponses];
export type GetBasicPanchangData = {
    body?: {
        /**
         * Date in YYYY-MM-DD format. Panchang elements (Tithi, Nakshatra, Yoga, Karana) are calculated for this date.
         */
        date: string;
        /**
         * Time in HH:MM:SS format (24-hour). Determines the exact Moon and Sun positions for tithi and nakshatra calculation.
         */
        time: string;
        /**
         * Observer latitude in decimal degrees. Determines sunrise/sunset times which define the Vara (weekday) and muhurta boundaries.
         */
        latitude: number;
        /**
         * Observer longitude in decimal degrees. Affects local time calculations for sunrise/sunset-dependent panchang elements.
         */
        longitude: number;
        /**
         * Timezone offset from UTC in decimal hours. Defaults to 5.5 (IST).
         */
        timezone?: number | string;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/vedic-astrology/panchang/basic';
};
export type GetBasicPanchangErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetBasicPanchangError = GetBasicPanchangErrors[keyof GetBasicPanchangErrors];
export type GetBasicPanchangResponses = {
    /**
     * Basic panchang with all five limbs (Tithi, Nakshatra, Yoga, Karana, Vara) including lunar phase, paksha, ruling planets, deities, and interpretive characteristics.
     */
    200: {
        /**
         * Lunar day (tithi) information with interpretations. Central panchang element for determining auspicious timings.
         */
        tithi: {
            /**
             * Tithi number (1-30). 1-15 are Shukla Paksha (waxing), 16-30 are Krishna Paksha (waning). Purnima is 15, Amavasya is 30.
             */
            number: number;
            /**
             * Sanskrit name of the tithi (lunar day). One of 30 tithis in the lunar month cycle.
             */
            name: string;
            /**
             * Lunar fortnight: Shukla (waxing, bright half) or Krishna (waning, dark half).
             */
            paksha: 'Shukla' | 'Krishna';
            /**
             * Percentage of the current tithi elapsed (0-100). Useful for determining tithi strength and transition proximity.
             */
            percent: number;
            /**
             * Presiding deity of this tithi from Vedic tradition.
             */
            deity?: string;
            /**
             * Planetary ruler of this tithi. Influences the day energy and activities.
             */
            rulingPlanet?: string;
            /**
             * Elemental quality of this tithi (Fire, Earth, Air, Water, Ether).
             */
            element?: string;
        };
        /**
         * Nakshatra (lunar mansion) information with interpretations
         */
        nakshatra: {
            /**
             * Nakshatra index (1-27) in the zodiac sequence starting from Ashwini. Each nakshatra spans 13 degrees 20 minutes.
             */
            number: number;
            /**
             * Sanskrit name of the nakshatra (lunar mansion). One of 27 nakshatras spanning the zodiac belt.
             */
            name: string;
            /**
             * Planetary ruler of this nakshatra. Determines Vimshottari dasha lord and influences nakshatra characteristics.
             */
            lord: string;
            /**
             * Pada (quarter, 1-4) of the nakshatra. Each nakshatra has 4 padas spanning 3 degrees 20 minutes each. Determines the navamsha sign and fine-tunes nakshatra predictions.
             */
            pada: number;
            /**
             * Presiding deity of this nakshatra from Vedic mythology. Influences spiritual qualities and karmic themes.
             */
            deity?: string;
            /**
             * Traditional symbol representing this nakshatra. Reflects core energy and life themes.
             */
            symbol?: string;
            /**
             * Personality traits and behavioral tendencies when the Moon occupies this nakshatra. Useful for daily panchang readings.
             */
            characteristics?: string;
        };
        /**
         * Nitya Yoga information. Yoga is the third panchang element, derived from combined Sun-Moon longitude.
         */
        yoga: {
            /**
             * Nitya Yoga index (1-27). Calculated from the sum of Sun and Moon sidereal longitudes divided by 13 degrees 20 minutes.
             */
            number: number;
            /**
             * Sanskrit name of the Nitya Yoga. One of 27 yogas formed by combined Sun-Moon motion, each with distinct auspiciousness.
             */
            name: string;
            /**
             * Characteristics and auspiciousness of this yoga for activity planning.
             */
            characteristics?: string;
        };
        /**
         * Karana (half-tithi) information. Fourth panchang element, changes twice per tithi.
         */
        karana: {
            /**
             * Karana index. There are 11 karanas total (4 fixed + 7 movable) cycling through 60 half-tithis per lunar month.
             */
            number: number;
            /**
             * Sanskrit name of the karana. 7 movable karanas (Bava through Naga) repeat 8 times, plus 4 fixed karanas.
             */
            name: string;
            /**
             * Karana type: Movable (repeating, generally auspicious) or Fixed (occur once per month).
             */
            type?: string;
            /**
             * Activity suitability and characteristics of this karana for muhurta selection.
             */
            characteristics?: string;
        };
        /**
         * Sidereal longitude of the Sun in degrees (0-360). Used for tithi and yoga calculations.
         */
        sunLongitude: number;
        /**
         * Sidereal longitude of the Moon in degrees (0-360). Moon moves ~13 degrees per day through the nakshatras.
         */
        moonLongitude: number;
    };
};
export type GetBasicPanchangResponse = GetBasicPanchangResponses[keyof GetBasicPanchangResponses];
export type GetDetailedPanchangData = {
    body?: {
        /**
         * Date in YYYY-MM-DD format.
         */
        date: string;
        /**
         * Observer latitude in decimal degrees. Determines sunrise and sunset times which define day/night boundaries for muhurta calculations.
         */
        latitude: number;
        /**
         * Observer longitude in decimal degrees. Affects local time calculations for sunrise, sunset, and muhurta period boundaries.
         */
        longitude: number;
        /**
         * Timezone offset from UTC in decimal hours. Used for sunrise/sunset/moonrise/moonset search accuracy and output time formatting. Essential for correct results outside IST. Defaults to 5.5 (IST).
         */
        timezone?: number | string;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/vedic-astrology/panchang/detailed';
};
export type GetDetailedPanchangErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetDetailedPanchangError = GetDetailedPanchangErrors[keyof GetDetailedPanchangErrors];
export type GetDetailedPanchangResponses = {
    /**
     * Full daily panchang with five limbs, sunrise/sunset/moonrise/moonset times, inauspicious periods (Rahu Kaal, Yamaganda, Gulika Kaal), auspicious muhurtas (Abhijit, Brahma), current hora, panchang transitions, and panchaka/bhadra/varjyam/amrit kalam analysis.
     */
    200: {
        /**
         * Date for which panchang is calculated.
         */
        date: string;
        /**
         * Location coordinates used for all time-based calculations.
         */
        location: {
            /**
             * Observer latitude used for sunrise/sunset calculation.
             */
            latitude: number;
            /**
             * Observer longitude used for sunrise/sunset calculation.
             */
            longitude: number;
            /**
             * Timezone offset from UTC in hours.
             */
            timezone: number;
        };
        /**
         * Vara (weekday) information based on Hindu sunrise calendar.
         */
        vara: {
            /**
             * Hindu weekday name. Vara begins at local sunrise, not midnight.
             */
            name: string;
            /**
             * Ruling planet of the day (Vara lord). Influences day-level auspiciousness.
             */
            lord: string;
        };
        /**
         * Local sunrise time in UTC. Marks the start of the Hindu day.
         */
        sunrise: string;
        /**
         * Local sunset time in UTC. Marks the transition to night muhurtas.
         */
        sunset: string;
        /**
         * Moonrise time in the requested timezone. Can be null if Moon does not rise on this date.
         */
        moonrise: string;
        /**
         * Moonset time in the requested timezone. Can be null if Moon does not set on this date.
         */
        moonset: string;
        /**
         * Moon sign (Chandra Rashi) at sunrise. Central to Vedic astrology. determines daily emotional tone, Chandrabalam, and Tarabalam.
         */
        moonSign: {
            /**
             * Moon rashi (sidereal zodiac sign) at sunrise.
             */
            name: string;
            /**
             * Sanskrit name of the Moon rashi.
             */
            sanskritName: string;
        };
        /**
         * Sun sign (Surya Rashi) at sunrise. Determines the solar month (Saura Masa) in the Hindu calendar. Changes approximately once a month (Sankranti).
         */
        sunSign: {
            /**
             * Sun rashi (sidereal zodiac sign) at sunrise.
             */
            name: string;
            /**
             * Sanskrit name of the Sun rashi.
             */
            sanskritName: string;
        };
        /**
         * Sun nakshatra at sunrise. The Sun spends approximately 13-14 days in each nakshatra. Used for Surya-based muhurta and festival calculations.
         */
        sunNakshatra: {
            /**
             * Sun nakshatra number (1-27).
             */
            number: number;
            /**
             * Name of the nakshatra the Sun occupies.
             */
            name: string;
            /**
             * Ruling planet (lord) of the Sun nakshatra.
             */
            lord: string;
            /**
             * Pada (quarter) of the Sun nakshatra.
             */
            pada: number;
        };
        /**
         * Lunar day (tithi) information with interpretations. Central panchang element for determining auspicious timings.
         */
        tithi: {
            /**
             * Tithi number (1-30). 1-15 are Shukla Paksha (waxing), 16-30 are Krishna Paksha (waning). Purnima is 15, Amavasya is 30.
             */
            number: number;
            /**
             * Sanskrit name of the tithi (lunar day). One of 30 tithis in the lunar month cycle.
             */
            name: string;
            /**
             * Lunar fortnight: Shukla (waxing, bright half) or Krishna (waning, dark half).
             */
            paksha: 'Shukla' | 'Krishna';
            /**
             * Percentage of the current tithi elapsed (0-100). Useful for determining tithi strength and transition proximity.
             */
            percent: number;
            /**
             * Presiding deity of this tithi from Vedic tradition.
             */
            deity?: string;
            /**
             * Planetary ruler of this tithi. Influences the day energy and activities.
             */
            rulingPlanet?: string;
            /**
             * Elemental quality of this tithi (Fire, Earth, Air, Water, Ether).
             */
            element?: string;
        };
        /**
         * Nakshatra (lunar mansion) information with interpretations
         */
        nakshatra: {
            /**
             * Nakshatra index (1-27) in the zodiac sequence starting from Ashwini. Each nakshatra spans 13 degrees 20 minutes.
             */
            number: number;
            /**
             * Sanskrit name of the nakshatra (lunar mansion). One of 27 nakshatras spanning the zodiac belt.
             */
            name: string;
            /**
             * Planetary ruler of this nakshatra. Determines Vimshottari dasha lord and influences nakshatra characteristics.
             */
            lord: string;
            /**
             * Pada (quarter, 1-4) of the nakshatra. Each nakshatra has 4 padas spanning 3 degrees 20 minutes each. Determines the navamsha sign and fine-tunes nakshatra predictions.
             */
            pada: number;
            /**
             * Presiding deity of this nakshatra from Vedic mythology. Influences spiritual qualities and karmic themes.
             */
            deity?: string;
            /**
             * Traditional symbol representing this nakshatra. Reflects core energy and life themes.
             */
            symbol?: string;
            /**
             * Personality traits and behavioral tendencies when the Moon occupies this nakshatra. Useful for daily panchang readings.
             */
            characteristics?: string;
        };
        /**
         * Nitya Yoga information. Yoga is the third panchang element, derived from combined Sun-Moon longitude.
         */
        yoga: {
            /**
             * Nitya Yoga index (1-27). Calculated from the sum of Sun and Moon sidereal longitudes divided by 13 degrees 20 minutes.
             */
            number: number;
            /**
             * Sanskrit name of the Nitya Yoga. One of 27 yogas formed by combined Sun-Moon motion, each with distinct auspiciousness.
             */
            name: string;
            /**
             * Characteristics and auspiciousness of this yoga for activity planning.
             */
            characteristics?: string;
        };
        /**
         * Karana (half-tithi) information. Fourth panchang element, changes twice per tithi.
         */
        karana: {
            /**
             * Karana index. There are 11 karanas total (4 fixed + 7 movable) cycling through 60 half-tithis per lunar month.
             */
            number: number;
            /**
             * Sanskrit name of the karana. 7 movable karanas (Bava through Naga) repeat 8 times, plus 4 fixed karanas.
             */
            name: string;
            /**
             * Karana type: Movable (repeating, generally auspicious) or Fixed (occur once per month).
             */
            type?: string;
            /**
             * Activity suitability and characteristics of this karana for muhurta selection.
             */
            characteristics?: string;
        };
        /**
         * Current planetary hora. Used for electional astrology and muhurta selection.
         */
        hora: {
            /**
             * Planet ruling the current hora (planetary hour). Each hora lasts ~1 hour.
             */
            current: string;
            /**
             * Hora number within the day sequence (1-24).
             */
            number: number;
            /**
             * Start time of the current hora in UTC.
             */
            start: string;
            /**
             * End time of the current hora in UTC.
             */
            end: string;
        };
        /**
         * Rahu Kaal, inauspicious period ruled by Rahu. Avoid starting new ventures. Calculated from sunrise duration divided into 8 parts.
         */
        rahuKaal: {
            /**
             * Period start time in ISO 8601 format. Timezone-adjusted based on the input timezone offset.
             */
            start: string;
            /**
             * Period end time in ISO 8601 format. Timezone-adjusted based on the input timezone offset.
             */
            end: string;
        };
        /**
         * Yamaganda, inauspicious period ruled by Yama (lord of death). Avoid important activities.
         */
        yamaganda: {
            /**
             * Period start time in ISO 8601 format. Timezone-adjusted based on the input timezone offset.
             */
            start: string;
            /**
             * Period end time in ISO 8601 format. Timezone-adjusted based on the input timezone offset.
             */
            end: string;
        };
        /**
         * Gulika Kaal, inauspicious period ruled by Saturn son Gulika. Considered harmful for initiating work.
         */
        gulika: {
            /**
             * Period start time in ISO 8601 format. Timezone-adjusted based on the input timezone offset.
             */
            start: string;
            /**
             * Period end time in ISO 8601 format. Timezone-adjusted based on the input timezone offset.
             */
            end: string;
        };
        /**
         * Abhijit Muhurta (Abhijit Muhurat), the most auspicious ~48-minute window around solar noon, the 8th of 15 day muhurtas. Ideal for starting new ventures, signing contracts, and performing rituals when no other shubh muhurat is available. Null on Wednesdays because Abhijit coincides with Dur Muhurta on that weekday per Muhurta Chintamani.
         */
        abhijitMuhurta: {
            /**
             * Period start time in ISO 8601 format. Timezone-adjusted based on the input timezone offset.
             */
            start: string;
            /**
             * Period end time in ISO 8601 format. Timezone-adjusted based on the input timezone offset.
             */
            end: string;
        };
        /**
         * Brahma Muhurta, sacred pre-dawn period approximately 96 minutes before sunrise (14th of 15 night muhurtas). Considered the best time for meditation, mantra japa, Vedic study, and spiritual sadhana. Referenced in Ashtanga Hridaya and Dharmashastra texts.
         */
        brahmaMuhurta: {
            /**
             * Period start time in ISO 8601 format. Timezone-adjusted based on the input timezone offset.
             */
            start: string;
            /**
             * Period end time in ISO 8601 format. Timezone-adjusted based on the input timezone offset.
             */
            end: string;
        };
        /**
         * Vijaya Muhurta (Vijay Muhurat), the 11th of 15 day muhurtas between sunrise and sunset. Auspicious for journeys, legal proceedings, competitions, warfare, and any activity requiring victory or success. Used in electional astrology (muhurta shastra) for timing important undertakings.
         */
        vijayaMuhurta: {
            /**
             * Period start time in ISO 8601 format. Timezone-adjusted based on the input timezone offset.
             */
            start: string;
            /**
             * Period end time in ISO 8601 format. Timezone-adjusted based on the input timezone offset.
             */
            end: string;
        };
        /**
         * Nishita Muhurta (Nishith Kaal), the 8th of 15 night muhurtas from sunset to next sunrise, occurring around midnight. Sacred period for worship of Lord Shiva, especially on Maha Shivaratri. Also significant for Janmashtami midnight celebrations and tantric sadhana.
         */
        nishitaMuhurta: {
            /**
             * Period start time in ISO 8601 format. Timezone-adjusted based on the input timezone offset.
             */
            start: string;
            /**
             * Period end time in ISO 8601 format. Timezone-adjusted based on the input timezone offset.
             */
            end: string;
        };
        /**
         * Godhuli Muhurta (cow dust time), 12 minutes before sunset to 12 minutes after sunset. Universally auspicious for any activity, especially marriages and grihapravesha. No blemish from tithi, vara, nakshatra, karana, or yoga applies during Godhuli. Null only in polar regions where sun does not set.
         */
        godhuliMuhurta: {
            /**
             * Period start time in ISO 8601 format. Timezone-adjusted based on the input timezone offset.
             */
            start: string;
            /**
             * Period end time in ISO 8601 format. Timezone-adjusted based on the input timezone offset.
             */
            end: string;
        };
        /**
         * Pratah Sandhya, morning twilight junction period for Sandhyavandanam prayer. Spans 3 night ghatis before sunrise to sunrise. Duration varies by location and season based on ratrimana (night duration). One of the three daily Sandhya prayer times prescribed in Dharmashastra.
         */
        pratahSandhya: {
            /**
             * Period start time in ISO 8601 format. Timezone-adjusted based on the input timezone offset.
             */
            start: string;
            /**
             * Period end time in ISO 8601 format. Timezone-adjusted based on the input timezone offset.
             */
            end: string;
        };
        /**
         * Sayahna Sandhya, evening twilight junction period for Sandhyavandanam prayer. Spans sunset to 3 night ghatis after sunset. Duration varies by location and season based on ratrimana (night duration). One of the three daily Sandhya prayer times prescribed in Dharmashastra.
         */
        sayahnaSandhya: {
            /**
             * Period start time in ISO 8601 format. Timezone-adjusted based on the input timezone offset.
             */
            start: string;
            /**
             * Period end time in ISO 8601 format. Timezone-adjusted based on the input timezone offset.
             */
            end: string;
        };
        /**
         * Dur Muhurta (Dur Muhurtam), inauspicious muhurta periods determined by the weekday. The daytime is divided into 15 muhurtas from sunrise to sunset. Specific muhurta numbers are inauspicious each weekday per Muhurta Chintamani. Each period lasts ~48 minutes. Most days have 2 Dur Muhurtas, Wednesday and Sunday have 1. Avoid initiating important activities during these periods.
         */
        durMuhurta: Array<{
            /**
             * Period start time in ISO 8601 format. Timezone-adjusted based on the input timezone offset.
             */
            start: string;
            /**
             * Period end time in ISO 8601 format. Timezone-adjusted based on the input timezone offset.
             */
            end: string;
        }>;
        /**
         * Varjyam (Thyajyam, Vishghati, Nakshatra Thyajyam), inauspicious ~96-minute period based on Moon transit through specific ghati fractions within the current nakshatra. Each of the 27 nakshatras has a fixed Varjyam window measured in ghatikas (1 ghati = 24 minutes). Avoid starting new ventures, travel, or auspicious ceremonies during Varjyam. Usually 1-2 periods per panchang day.
         */
        varjyam: Array<{
            /**
             * Period start time in ISO 8601 format. Timezone-adjusted based on the input timezone offset.
             */
            start: string;
            /**
             * Period end time in ISO 8601 format. Timezone-adjusted based on the input timezone offset.
             */
            end: string;
        }>;
        /**
         * Amrit Kalam (Amrit Ghati, Amrita Yoga), the most auspicious ~96-minute period based on Moon transit through specific ghati fractions within the current nakshatra. Each of the 27 nakshatras has a fixed Amrit window. Activities initiated during Amrit Kalam are believed to yield excellent, lasting results. Highly recommended for muhurta selection when other auspicious yogas are absent. Usually 1-2 periods per panchang day.
         */
        amritKalam: Array<{
            /**
             * Period start time in ISO 8601 format. Timezone-adjusted based on the input timezone offset.
             */
            start: string;
            /**
             * Period end time in ISO 8601 format. Timezone-adjusted based on the input timezone offset.
             */
            end: string;
        }>;
        /**
         * Chandrabalam (Moon strength). indicates auspiciousness of Moon transit for each birth rashi. Essential for muhurta selection in Vedic electional astrology.
         */
        chandrabalam: {
            /**
             * Rashis (zodiac signs) for which Moon transit is favorable today. Chandrabalam is positive when Moon transits 1st, 3rd, 6th, 7th, 10th, or 11th house from birth rashi.
             */
            favorableRashis: Array<string>;
            /**
             * Rashi for which Moon is in Ashtama (8th house) position. highly inauspicious. Natives of this rashi should avoid important activities.
             */
            ashtamaChandraRashi: string;
        };
        /**
         * Tarabalam (Star strength). based on the 9-Tara nakshatra cycle. Determines favorability of Moon nakshatra transit relative to each of the 27 birth nakshatras.
         */
        tarabalam: {
            /**
             * Birth nakshatras with favorable Tarabalam based on Moon nakshatra transit. Derived from the 9-Tara system. taras Sampat, Kshema, Sadhaka, Mitra, and Parama Mitra are favorable.
             */
            favorableNakshatras: Array<string>;
            /**
             * Birth nakshatras with unfavorable Tarabalam (Vipat, Pratyari, Vadha taras). Natives of these birth nakshatras should exercise caution.
             */
            unfavorableNakshatras: Array<string>;
        };
        /**
         * Panchaka, inauspicious period when Moon transits nakshatras 23-27. Five types based on the specific nakshatra. Includes timing when active. Avoid major activities during Panchaka.
         */
        panchaka: {
            /**
             * Whether Panchaka is currently active. Panchaka occurs when Moon transits through the last 5 nakshatras (Dhanishta to Revati).
             */
            active: boolean;
            /**
             * Panchaka type when active: Mrityu (death-related), Agni (fire-related), Raja (government-related), Chora (theft-related), or Roga (disease-related). Null when Panchaka is not active.
             */
            type: string;
            /**
             * When the current Panchaka period started (Moon entered Dhanishta nakshatra). Null when not active. In requested timezone.
             */
            startsAt: string;
            /**
             * When the current Panchaka period ends (Moon exits Revati nakshatra). Null when not active. In requested timezone.
             */
            endsAt: string;
        };
        /**
         * Bhadra, occurs during Vishti Karana period. One of the 7 movable karanas, Vishti (also called Bhadra) is avoided for all auspicious activities. Includes timing when active.
         */
        bhadra: {
            /**
             * Whether Bhadra (Vishti Karana) is currently active. Bhadra is considered inauspicious for starting new ventures.
             */
            active: boolean;
            /**
             * When the current Bhadra (Vishti) period started. Null when not active. In requested timezone.
             */
            startsAt: string;
            /**
             * When the current Bhadra (Vishti) period ends. Null when not active. In requested timezone.
             */
            endsAt: string;
        };
        /**
         * Panchang element transition times. exact timing of when each element (tithi, yoga, karana, nakshatra, Moon sign) changes. Calculated using binary search for ~1 minute precision. Essential for precise muhurta determination and panchang calendars.
         */
        transitions: {
            /**
             * Tithi (lunar day) transition timing: when the current tithi ends and the next one begins.
             */
            tithi: {
                /**
                 * ISO 8601 UTC time when the current tithi ends. Precise to ~1 minute via binary search.
                 */
                endsAt: string;
                /**
                 * Name of the next tithi that begins after the transition.
                 */
                next: string;
            };
            /**
             * Nitya Yoga transition timing: when the current yoga period ends. Based on combined Sun-Moon motion.
             */
            yoga: {
                /**
                 * ISO 8601 UTC time when the current yoga ends.
                 */
                endsAt: string;
                /**
                 * Name of the next yoga.
                 */
                next: string;
            };
            /**
             * Karana (half-tithi) transition. karanas change twice per tithi. Important for muhurta timing.
             */
            karana: {
                /**
                 * ISO 8601 UTC time when the current karana ends.
                 */
                endsAt: string;
                /**
                 * Name of the next karana (half-tithi).
                 */
                next: string;
            };
            /**
             * Nakshatra (lunar mansion) transition timing: when Moon moves to the next nakshatra. Critical for muhurta and Tarabalam calculations.
             */
            nakshatra: {
                /**
                 * ISO 8601 UTC time when the Moon leaves the current nakshatra.
                 */
                endsAt: string;
                /**
                 * Name of the next nakshatra the Moon will enter.
                 */
                next: string;
                /**
                 * Pada (quarter, 1-4) of the next nakshatra. Each nakshatra has 4 padas spanning 3 degrees 20 minutes each.
                 */
                nextPada: number;
            };
            /**
             * Moon sign (Chandra rashi) transition, when Moon changes zodiac sign. Affects Chandrabalam, Tarabalam, and daily horoscope predictions.
             */
            moonSign: {
                /**
                 * Current Moon rashi (zodiac sign).
                 */
                current: string;
                /**
                 * ISO 8601 UTC time when Moon enters the next rashi. Moon changes sign approximately every 2.25 days.
                 */
                changesAt: string;
                /**
                 * Next rashi the Moon will enter.
                 */
                next: string;
            };
        };
    };
};
export type GetDetailedPanchangResponse = GetDetailedPanchangResponses[keyof GetDetailedPanchangResponses];
export type GetChoghadiyaData = {
    body?: {
        /**
         * Date in YYYY-MM-DD format.
         */
        date: string;
        /**
         * Observer latitude in decimal degrees. Determines sunrise and sunset times which define day/night boundaries for muhurta calculations.
         */
        latitude: number;
        /**
         * Observer longitude in decimal degrees. Affects local time calculations for sunrise, sunset, and muhurta period boundaries.
         */
        longitude: number;
        /**
         * Timezone offset from UTC in decimal hours. Used for accurate sunrise/sunset calculation and output time formatting. Essential for correct Choghadiya periods outside IST. Defaults to 5.5 (IST).
         */
        timezone?: number | string;
    };
    path?: never;
    query?: never;
    url: '/vedic-astrology/panchang/choghadiya';
};
export type GetChoghadiyaErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetChoghadiyaError = GetChoghadiyaErrors[keyof GetChoghadiyaErrors];
export type GetChoghadiyaResponses = {
    /**
     * 8 daytime and 8 nighttime Choghadiya muhurta periods with names, ruling planets, auspiciousness ratings (Good/Bad), and exact start/end times based on sunrise and sunset.
     */
    200: {
        date: string;
        /**
         * 8 daytime choghadiya periods (sunrise to sunset)
         */
        dayChoghadiya: Array<{
            /**
             * Choghadiya muhurta name. Auspicious: Amrit (Moon), Shubh (Jupiter), Labh (Mercury), Char (Venus). Inauspicious: Udveg (Sun), Rog (Mars), Kaal (Saturn).
             */
            name: 'Udveg' | 'Amrit' | 'Rog' | 'Labh' | 'Shubh' | 'Char' | 'Kaal';
            /**
             * Ruling planet of this Choghadiya period. Planet determines the quality and suitability of activities during this muhurta.
             */
            lord: string;
            /**
             * Auspiciousness of this period. Good periods (Amrit, Shubh, Labh, Char) are suitable for important activities. Bad periods (Udveg, Rog, Kaal) should be avoided.
             */
            effect: 'Good' | 'Bad';
            /**
             * Period start time in ISO 8601 format. Timezone-adjusted based on input timezone offset.
             */
            start: string;
            /**
             * Period end time in ISO 8601 format. Each Choghadiya period is one-eighth of the day or night duration.
             */
            end: string;
        }>;
        /**
         * 8 nighttime choghadiya periods (sunset to next sunrise)
         */
        nightChoghadiya: Array<{
            /**
             * Choghadiya muhurta name. Auspicious: Amrit (Moon), Shubh (Jupiter), Labh (Mercury), Char (Venus). Inauspicious: Udveg (Sun), Rog (Mars), Kaal (Saturn).
             */
            name: 'Udveg' | 'Amrit' | 'Rog' | 'Labh' | 'Shubh' | 'Char' | 'Kaal';
            /**
             * Ruling planet of this Choghadiya period. Planet determines the quality and suitability of activities during this muhurta.
             */
            lord: string;
            /**
             * Auspiciousness of this period. Good periods (Amrit, Shubh, Labh, Char) are suitable for important activities. Bad periods (Udveg, Rog, Kaal) should be avoided.
             */
            effect: 'Good' | 'Bad';
            /**
             * Period start time in ISO 8601 format. Timezone-adjusted based on input timezone offset.
             */
            start: string;
            /**
             * Period end time in ISO 8601 format. Each Choghadiya period is one-eighth of the day or night duration.
             */
            end: string;
        }>;
    };
};
export type GetChoghadiyaResponse = GetChoghadiyaResponses[keyof GetChoghadiyaResponses];
export type GetHoraData = {
    body?: {
        /**
         * Date in YYYY-MM-DD format.
         */
        date: string;
        /**
         * Observer latitude in decimal degrees. Determines sunrise and sunset times which define day/night boundaries for muhurta calculations.
         */
        latitude: number;
        /**
         * Observer longitude in decimal degrees. Affects local time calculations for sunrise, sunset, and muhurta period boundaries.
         */
        longitude: number;
        /**
         * Timezone offset from UTC in decimal hours. Used for accurate sunrise/sunset calculation and output time formatting. Essential for correct Hora periods outside IST. Defaults to 5.5 (IST).
         */
        timezone?: number | string;
    };
    path?: never;
    query?: never;
    url: '/vedic-astrology/panchang/hora';
};
export type GetHoraErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetHoraError = GetHoraErrors[keyof GetHoraErrors];
export type GetHoraResponses = {
    /**
     * 12 daytime and 12 nighttime Hora (planetary hour) periods with ruling planet, sequence number, and exact start/end times based on sunrise and sunset.
     */
    200: {
        /**
         * Date for which hora periods were calculated.
         */
        date: string;
        /**
         * 12 daytime hora periods from sunrise to sunset. Duration varies by season.
         */
        dayHoras: Array<{
            /**
             * Ruling planet of this hora period. Follows the Chaldean planetary order: Sun, Venus, Mercury, Moon, Saturn, Jupiter, Mars.
             */
            planet: string;
            /**
             * Hora period number within the day or night segment (1-12).
             */
            number: number;
            /**
             * Start time of the hora period in ISO 8601 format.
             */
            start: string;
            /**
             * End time of the hora period in ISO 8601 format.
             */
            end: string;
        }>;
        /**
         * 12 nighttime hora periods from sunset to next sunrise. Duration varies by season.
         */
        nightHoras: Array<{
            /**
             * Ruling planet of this hora period. Follows the Chaldean planetary order: Sun, Venus, Mercury, Moon, Saturn, Jupiter, Mars.
             */
            planet: string;
            /**
             * Hora period number within the day or night segment (1-12).
             */
            number: number;
            /**
             * Start time of the hora period in ISO 8601 format.
             */
            start: string;
            /**
             * End time of the hora period in ISO 8601 format.
             */
            end: string;
        }>;
    };
};
export type GetHoraResponse = GetHoraResponses[keyof GetHoraResponses];
export type CheckManglikDoshaData = {
    body?: ManglikRequest;
    path?: never;
    query?: never;
    url: '/vedic-astrology/dosha/manglik';
};
export type CheckManglikDoshaErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CheckManglikDoshaError = CheckManglikDoshaErrors[keyof CheckManglikDoshaErrors];
export type CheckManglikDoshaResponses = {
    /**
     * Manglik dosha detection result with severity, Mars house placement, cancellation exceptions, traditional remedies, and effects on marriage and personality.
     */
    200: ManglikResponse;
};
export type CheckManglikDoshaResponse = CheckManglikDoshaResponses[keyof CheckManglikDoshaResponses];
export type CheckKalsarpaDoshaData = {
    body?: KalsarpaRequest;
    path?: never;
    query?: never;
    url: '/vedic-astrology/dosha/kalsarpa';
};
export type CheckKalsarpaDoshaErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CheckKalsarpaDoshaError = CheckKalsarpaDoshaErrors[keyof CheckKalsarpaDoshaErrors];
export type CheckKalsarpaDoshaResponses = {
    /**
     * Kalsarpa dosha detection result with type identification (1 of 12 types), severity, Rahu-Ketu axis details, traditional remedies, and effects on career, health, and relationships.
     */
    200: KalsarpaResponse;
};
export type CheckKalsarpaDoshaResponse = CheckKalsarpaDoshaResponses[keyof CheckKalsarpaDoshaResponses];
export type CheckSadhesatiData = {
    body?: SadhesatiRequest;
    path?: never;
    query?: never;
    url: '/vedic-astrology/dosha/sadhesati';
};
export type CheckSadhesatiErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CheckSadhesatiError = CheckSadhesatiErrors[keyof CheckSadhesatiErrors];
export type CheckSadhesatiResponses = {
    /**
     * Sade Sati detection result with current phase (Rising/Peak/Setting), Saturn transit position relative to natal Moon, severity, traditional Shani remedies, and phase-specific effects.
     */
    200: SadhesatiResponse;
};
export type CheckSadhesatiResponse = CheckSadhesatiResponses[keyof CheckSadhesatiResponses];
export type ListYogasData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/vedic-astrology/yoga';
};
export type ListYogasErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type ListYogasError = ListYogasErrors[keyof ListYogasErrors];
export type ListYogasResponses = {
    /**
     * List of all yogas (basic info)
     */
    200: {
        /**
         * Array of all planetary yogas with basic identifiers. Use GET /yogas/:id for formation rules, effects, and quality classification.
         */
        yogas: Array<{
            /**
             * Unique yoga identifier in lowercase kebab-case. Use this to fetch full details via GET /yogas/:id.
             */
            id: string;
            /**
             * Traditional Sanskrit name of the planetary yoga combination.
             */
            name: string;
        }>;
        /**
         * Total count of planetary yogas in the database. Includes Raj Yogas, Dhan Yogas, Pancha Mahapurusha Yogas, Nabhasa Yogas, and more.
         */
        total: number;
    };
};
export type ListYogasResponse = ListYogasResponses[keyof ListYogasResponses];
export type GetYogaData = {
    body?: never;
    path: {
        /**
         * Yoga identifier (lowercase, hyphenated)
         */
        id: string;
    };
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/vedic-astrology/yoga/{id}';
};
export type GetYogaErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Yoga not found
     */
    404: {
        /**
         * Human-readable error message. May change wording — do not parse programmatically.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier for programmatic error handling.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetYogaError = GetYogaErrors[keyof GetYogaErrors];
export type GetYogaResponses = {
    /**
     * Detailed yoga information
     */
    200: {
        /**
         * Unique yoga identifier in lowercase kebab-case. Use this to fetch yoga details via GET /yogas/:id.
         */
        id: string;
        /**
         * Traditional Sanskrit name of the planetary yoga combination as referenced in classical Vedic astrology texts.
         */
        name: string;
        /**
         * Brief formation rule describing which planets must be in which houses or signs for this yoga to form in a birth chart.
         */
        description: string;
        /**
         * Detailed prediction of the effects and life outcomes when this yoga is present in a horoscope. Covers personality traits, career, wealth, relationships, and spiritual tendencies.
         */
        result: string;
        /**
         * Overall nature of the yoga. Positive yogas (Raj Yoga, Gajakesari) bestow benefits. Negative yogas (Kemadruma, Kaal Sarp) indicate challenges. Both means the yoga has mixed effects depending on chart context.
         */
        quality: 'Positive' | 'Negative' | 'Both';
    };
};
export type GetYogaResponse = GetYogaResponses[keyof GetYogaResponses];
export type GetKpAyanamsaData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Date for ayanamsa calculation in YYYY-MM-DD format. Defaults to today if not provided. Ayanamsa changes by ~0.01° per month due to Earth's precession.
         */
        date?: string;
    };
    url: '/vedic-astrology/kp/ayanamsa';
};
export type GetKpAyanamsaErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetKpAyanamsaError = GetKpAyanamsaErrors[keyof GetKpAyanamsaErrors];
export type GetKpAyanamsaResponses = {
    /**
     * Successfully calculated KP-Newcomb ayanamsa
     */
    200: KpAyanamsaResponse;
};
export type GetKpAyanamsaResponse = GetKpAyanamsaResponses[keyof GetKpAyanamsaResponses];
export type GetKpPlanetsData = {
    body?: KpPlanetsRequest;
    path?: never;
    query?: never;
    url: '/vedic-astrology/kp/planets';
};
export type GetKpPlanetsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetKpPlanetsError = GetKpPlanetsErrors[keyof GetKpPlanetsErrors];
export type GetKpPlanetsResponses = {
    /**
     * Successfully calculated KP planetary positions
     */
    200: KpPlanetsResponse;
};
export type GetKpPlanetsResponse = GetKpPlanetsResponses[keyof GetKpPlanetsResponses];
export type GetKpCuspsData = {
    body?: KpCuspsRequest;
    path?: never;
    query?: never;
    url: '/vedic-astrology/kp/cusps';
};
export type GetKpCuspsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetKpCuspsError = GetKpCuspsErrors[keyof GetKpCuspsErrors];
export type GetKpCuspsResponses = {
    /**
     * Successfully calculated Placidus house cusps
     */
    200: KpCuspsResponse;
};
export type GetKpCuspsResponse = GetKpCuspsResponses[keyof GetKpCuspsResponses];
export type GenerateKpChartData = {
    body?: KpChartRequest;
    path?: never;
    query?: never;
    url: '/vedic-astrology/kp/chart';
};
export type GenerateKpChartErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GenerateKpChartError = GenerateKpChartErrors[keyof GenerateKpChartErrors];
export type GenerateKpChartResponses = {
    /**
     * Successfully generated KP birth chart
     */
    200: KpChartResponse;
};
export type GenerateKpChartResponse = GenerateKpChartResponses[keyof GenerateKpChartResponses];
export type GetKpRulingPlanetsData = {
    body?: {
        /**
         * Observer latitude in decimal degrees
         */
        latitude: number;
        /**
         * Observer longitude in decimal degrees
         */
        longitude: number;
        /**
         * Timezone: decimal hours from UTC OR IANA name (e.g. "Asia/Kolkata"). IANA resolved to the DST-correct offset based on birthDate or datetime. Defaults to 5.5 (IST).
         */
        timezone?: number | string;
        /**
         * ISO 8601 datetime for ruling planets. Defaults to current time. Always interpreted as local time when a non-zero timezone is provided (Z suffix is ignored).
         */
        datetime?: string;
        /**
         * Birth date (YYYY-MM-DD) to calculate significators. If provided with birthTime, response includes which houses each ruling planet signifies.
         */
        birthDate?: string;
        /**
         * Birth time (HH:MM:SS) for significator calculation. Required if birthDate is provided.
         */
        birthTime?: string;
        /**
         * Lunar node type for Rahu and Ketu positions. "mean" uses the smooth mean node (traditional Vedic astrology default). "true" uses the osculating node with perturbation corrections, oscillating up to 1.5 degrees from mean with a 173-day period. Impacts KP sub-lord assignments in narrow boundary cases. Defaults to "mean".
         */
        nodeType?: 'mean' | 'true';
    };
    path?: never;
    query?: never;
    url: '/vedic-astrology/kp/ruling-planets';
};
export type GetKpRulingPlanetsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetKpRulingPlanetsError = GetKpRulingPlanetsErrors[keyof GetKpRulingPlanetsErrors];
export type GetKpRulingPlanetsResponses = {
    /**
     * Ruling planets calculated successfully
     */
    200: KpRulingPlanetsResponse;
};
export type GetKpRulingPlanetsResponse = GetKpRulingPlanetsResponses[keyof GetKpRulingPlanetsResponses];
export type GetKpRulingIntervalData = {
    body?: {
        /**
         * Start of the interval range in ISO 8601 format. Always interpreted as local time when a non-zero timezone is provided (Z suffix is ignored).
         */
        startDatetime: string;
        /**
         * End of the interval range in ISO 8601 format. Always interpreted as local time when a non-zero timezone is provided (Z suffix is ignored).
         */
        endDatetime: string;
        /**
         * Interval between calculations in minutes (1-1440). Use 1-5 for birth time rectification.
         */
        intervalMinutes: number;
        /**
         * Observer latitude in decimal degrees
         */
        latitude: number;
        /**
         * Observer longitude in decimal degrees
         */
        longitude: number;
        /**
         * Timezone offset from UTC in decimal hours. When non-zero, all datetimes are treated as local time in this timezone (Z suffix is ignored). Output times are also converted to this timezone. Defaults to 5.5 (IST).
         */
        timezone?: number | string;
        /**
         * Ayanamsa system for sidereal conversion. "kp-newcomb" uses the KP-Newcomb dynamic formula, the most common choice for KP astrology. "kp-old" uses the Krishnamurti original table from KP Reader-1 with constant precession rate. "lahiri" uses Lahiri/Chitrapaksha ayanamsa, matching most traditional Vedic software. Defaults to "kp-newcomb".
         */
        ayanamsa?: 'kp-newcomb' | 'kp-old' | 'lahiri';
        /**
         * Lunar node type for Rahu and Ketu positions. "mean" uses the smooth mean node (traditional Vedic astrology default). "true" uses the osculating node with perturbation corrections, oscillating up to 1.5 degrees from mean with a 173-day period. Impacts KP sub-lord assignments in narrow boundary cases. Defaults to "mean".
         */
        nodeType?: 'mean' | 'true';
    };
    path?: never;
    query?: never;
    url: '/vedic-astrology/kp/ruling-planets-interval';
};
export type GetKpRulingIntervalErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetKpRulingIntervalError = GetKpRulingIntervalErrors[keyof GetKpRulingIntervalErrors];
export type GetKpRulingIntervalResponses = {
    /**
     * Ruling planets with significators at intervals
     */
    200: KpRulingPlanetsIntervalResponse;
};
export type GetKpRulingIntervalResponse = GetKpRulingIntervalResponses[keyof GetKpRulingIntervalResponses];
export type GetKpSublordChangesData = {
    body?: KpSublordChangesRequest;
    path?: never;
    query?: never;
    url: '/vedic-astrology/kp/sublord-changes';
};
export type GetKpSublordChangesErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetKpSublordChangesError = GetKpSublordChangesErrors[keyof GetKpSublordChangesErrors];
export type GetKpSublordChangesResponses = {
    /**
     * Sublord change timings calculated successfully
     */
    200: KpSublordChangesResponse;
};
export type GetKpSublordChangesResponse = GetKpSublordChangesResponses[keyof GetKpSublordChangesResponses];
export type GetKpRasiChangesData = {
    body?: KpRasiChangesRequest;
    path?: never;
    query?: never;
    url: '/vedic-astrology/kp/rasi-changes';
};
export type GetKpRasiChangesErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetKpRasiChangesError = GetKpRasiChangesErrors[keyof GetKpRasiChangesErrors];
export type GetKpRasiChangesResponses = {
    /**
     * Sign ingress timings calculated successfully
     */
    200: KpRasiChangesResponse;
};
export type GetKpRasiChangesResponse = GetKpRasiChangesResponses[keyof GetKpRasiChangesResponses];
export type GetKpPlanetsIntervalData = {
    body?: KpPlanetsIntervalRequest;
    path?: never;
    query?: never;
    url: '/vedic-astrology/kp/planets-interval';
};
export type GetKpPlanetsIntervalErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetKpPlanetsIntervalError = GetKpPlanetsIntervalErrors[keyof GetKpPlanetsIntervalErrors];
export type GetKpPlanetsIntervalResponses = {
    /**
     * Planetary positions calculated at all intervals
     */
    200: KpPlanetsIntervalResponse;
};
export type GetKpPlanetsIntervalResponse = GetKpPlanetsIntervalResponses[keyof GetKpPlanetsIntervalResponses];
export type CalculateDrishtiData = {
    body?: {
        /**
         * Date in YYYY-MM-DD format. Planetary positions are calculated for this date to determine mutual aspects (drishti).
         */
        date: string;
        /**
         * Time in HH:MM:SS format (24-hour). Exact time affects fast-moving planets (Moon, Mercury) and aspect orbs.
         */
        time: string;
        /**
         * Observer latitude in decimal degrees. Used for Lagna calculation which affects house-based aspect analysis.
         */
        latitude: number;
        /**
         * Observer longitude in decimal degrees. Affects local sidereal time for positional calculations.
         */
        longitude: number;
        /**
         * Timezone offset from UTC in hours. Defaults to 5.5 (IST).
         */
        timezone?: number | string;
        /**
         * Coordinate system for longitude output. "sidereal" (Nirayana) uses Lahiri ayanamsa - standard for Vedic astrology. "tropical" (Sayana) uses raw ecliptic longitude matching Western astrology. Defaults to "sidereal".
         */
        coordinateSystem?: 'sidereal' | 'tropical';
    };
    path?: never;
    query?: never;
    url: '/vedic-astrology/aspects';
};
export type CalculateDrishtiErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CalculateDrishtiError = CalculateDrishtiErrors[keyof CalculateDrishtiErrors];
export type CalculateDrishtiResponses = {
    /**
     * Aspects calculated successfully
     */
    200: {
        /**
         * UTC datetime used for aspect calculation (ISO 8601).
         */
        datetime: string;
        /**
         * Sidereal positions of all 9 planets at the given time.
         */
        planets: Array<{
            /**
             * Planet name (Sun through Ketu, all 9 Vedic grahas).
             */
            name: string;
            /**
             * Sidereal longitude in degrees (0-360).
             */
            longitude: number;
            /**
             * Vedic zodiac sign (rashi) the planet occupies.
             */
            sign: string;
        }>;
        /**
         * Complete list of all Vedic aspects (drishti) between planets. Includes full (7th) and special aspects (Mars 4th/8th, Jupiter 5th/9th, Saturn 3rd/10th).
         */
        aspects: Array<{
            /**
             * Planet casting the aspect (graha drishti).
             */
            aspectingPlanet: string;
            /**
             * Planet receiving the aspect.
             */
            aspectedPlanet: string;
            /**
             * Vedic aspect type. All planets have 7th aspect. Special aspects: Mars 4th/8th, Jupiter 5th/9th, Saturn 3rd/10th.
             */
            aspectType: 'conjunction' | '7th' | '4th' | '8th' | '5th' | '9th' | '3rd' | '10th';
            /**
             * Aspect strength percentage (0-100). 100 = exact aspect, decreases with orb distance.
             */
            strength: number;
            /**
             * Angular distance from exact aspect in degrees. Smaller orb = more potent aspect.
             */
            orb: number;
        }>;
        /**
         * Aspect table grouped by aspecting planet. useful for rendering aspect grids in astrology software.
         */
        aspectTable: Array<{
            /**
             * Planet casting aspects.
             */
            planet: string;
            /**
             * All aspects cast by this planet.
             */
            aspects: Array<{
                /**
                 * Planet being aspected.
                 */
                planet: string;
                /**
                 * Vedic aspect house (7th, 4th, 8th, 5th, 9th, 3rd, 10th, or conjunction).
                 */
                aspectType: string;
                /**
                 * Aspect strength percentage.
                 */
                strength: number;
            }>;
        }>;
        /**
         * Pairs of planets aspecting each other simultaneously. Mutual aspects amplify planetary influence significantly.
         */
        mutualAspects: Array<{
            /**
             * First planet in the mutual aspect pair.
             */
            planet1: string;
            /**
             * Second planet in the mutual aspect pair.
             */
            planet2: string;
            /**
             * The aspect type shared mutually. Mutual aspects are especially strong in Vedic astrology.
             */
            aspectType: string;
        }>;
    };
};
export type CalculateDrishtiResponse = CalculateDrishtiResponses[keyof CalculateDrishtiResponses];
export type GetMonthlyAspectsData = {
    body?: {
        /**
         * Year for monthly analysis (1900-2100).
         */
        year: number;
        /**
         * Month number (1-12).
         */
        month: number;
        /**
         * Timezone offset from UTC in hours. Output times are converted to this timezone. Defaults to 0 (UTC).
         */
        timezone?: number | string;
        /**
         * Coordinate system for longitude output. "sidereal" (Nirayana) uses Lahiri ayanamsa - standard for Vedic astrology. "tropical" (Sayana) uses raw ecliptic longitude matching Western astrology. Defaults to "sidereal".
         */
        coordinateSystem?: 'sidereal' | 'tropical';
    };
    path?: never;
    query?: never;
    url: '/vedic-astrology/aspects/monthly';
};
export type GetMonthlyAspectsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetMonthlyAspectsError = GetMonthlyAspectsErrors[keyof GetMonthlyAspectsErrors];
export type GetMonthlyAspectsResponses = {
    /**
     * Monthly planetary aspect events
     */
    200: {
        /**
         * Year of the aspect analysis.
         */
        year: number;
        /**
         * Month of the aspect analysis.
         */
        month: number;
        /**
         * All planetary aspect events detected during the month, sorted chronologically by closest approach date.
         */
        events: Array<{
            /**
             * First planet forming the aspect. One of the Navagraha, Sun through Ketu.
             */
            planet1: string;
            /**
             * Second planet forming the aspect.
             */
            planet2: string;
            /**
             * Aspect type. major: conjunction (0 deg), opposition (180 deg), trine (120 deg), square (90 deg), sextile (60 deg). Minor: vigintile (18 deg), semi-sextile (30 deg), undecile (32.73 deg), semi-quintile (36 deg), novile (40 deg), semi-square (45 deg), septile (51.43 deg), quintile (72 deg), binovile (80 deg), centile (100 deg), biseptile (102.86 deg), tredecile (108 deg), sesqui-square (135 deg), bi-quintile (144 deg), quincunx (150 deg), triseptile (154.29 deg), quadranovile (160 deg).
             */
            aspect: string;
            /**
             * Date when the aspect is closest to exact (YYYY-MM-DD). Adjusted to requested timezone.
             */
            date: string;
            /**
             * Time when the aspect is closest to exact (HH:MM, 24-hour). Adjusted to requested timezone.
             */
            time: string;
            /**
             * Full datetime when aspect is closest to exact. Adjusted to requested timezone.
             */
            datetime: string;
            /**
             * Angular distance from exact aspect in degrees at closest approach. Smaller orb indicates a more powerful aspect.
             */
            orb: number;
            /**
             * Actual angular distance between the two planets in degrees at closest approach.
             */
            distance: number;
            /**
             * Sidereal longitude of the first planet at time of aspect (Lahiri ayanamsa).
             */
            planet1Longitude: number;
            /**
             * Sidereal longitude of the second planet at time of aspect.
             */
            planet2Longitude: number;
        }>;
    };
};
export type GetMonthlyAspectsResponse = GetMonthlyAspectsResponses[keyof GetMonthlyAspectsResponses];
export type GetLunarAspectsData = {
    body?: {
        /**
         * Year for monthly analysis (1900-2100).
         */
        year: number;
        /**
         * Month number (1-12).
         */
        month: number;
        /**
         * Timezone offset from UTC in hours. Output times are converted to this timezone. Defaults to 0 (UTC).
         */
        timezone?: number | string;
        /**
         * Coordinate system for longitude output. "sidereal" (Nirayana) uses Lahiri ayanamsa - standard for Vedic astrology. "tropical" (Sayana) uses raw ecliptic longitude matching Western astrology. Defaults to "sidereal".
         */
        coordinateSystem?: 'sidereal' | 'tropical';
    };
    path?: never;
    query?: never;
    url: '/vedic-astrology/aspects/lunar';
};
export type GetLunarAspectsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetLunarAspectsError = GetLunarAspectsErrors[keyof GetLunarAspectsErrors];
export type GetLunarAspectsResponses = {
    /**
     * Monthly lunar aspect events
     */
    200: {
        /**
         * Year of the lunar aspect analysis.
         */
        year: number;
        /**
         * Month of the lunar aspect analysis.
         */
        month: number;
        /**
         * All Moon aspect events during the month, sorted chronologically. Moon completes one full cycle in approximately 27 days.
         */
        events: Array<{
            /**
             * Planet that the Moon forms an aspect with.
             */
            planet: string;
            /**
             * Aspect type. major: conjunction, opposition, trine, square, sextile. Minor: vigintile, semi-sextile, undecile, semi-quintile, novile, semi-square, septile, quintile, binovile, centile, biseptile, tredecile, sesqui-square, bi-quintile, quincunx, triseptile, quadranovile.
             */
            aspect: string;
            /**
             * Date of closest approach for this lunar aspect (YYYY-MM-DD). Adjusted to requested timezone.
             */
            date: string;
            /**
             * Time of closest approach for this lunar aspect (HH:MM, 24-hour). Adjusted to requested timezone.
             */
            time: string;
            /**
             * Full datetime of closest approach. Adjusted to requested timezone.
             */
            datetime: string;
            /**
             * Angular distance from exact lunar aspect in degrees. Smaller orb = stronger Moon influence.
             */
            orb: number;
            /**
             * Actual angular distance between Moon and the aspected planet in degrees.
             */
            distance: number;
            /**
             * Sidereal longitude of the Moon at the time of aspect (Lahiri ayanamsa).
             */
            moonLongitude: number;
            /**
             * Sidereal longitude of the aspected planet at the time of aspect.
             */
            planetLongitude: number;
        }>;
    };
};
export type GetLunarAspectsResponse = GetLunarAspectsResponses[keyof GetLunarAspectsResponses];
export type CalculateTransitData = {
    body?: {
        /**
         * Birth date in YYYY-MM-DD format. Used to calculate the natal chart against which transits are analyzed.
         */
        birthDate: string;
        /**
         * Birth time in HH:MM:SS format (24-hour). Critical for accurate natal Lagna and Placidus house cusps which determine transit house placements.
         */
        birthTime: string;
        /**
         * Transit date to analyze in YYYY-MM-DD format. Planetary positions on this date are overlaid on the natal chart.
         */
        transitDate: string;
        /**
         * Transit time in HH:MM:SS format (24-hour). Affects fast-moving planets like Moon. Defaults to noon.
         */
        transitTime?: string;
        /**
         * Observer latitude in decimal degrees. Determines Placidus house cusps for natal chart house assignments.
         */
        latitude: number;
        /**
         * Observer longitude in decimal degrees. Affects local sidereal time for Lagna and house calculations.
         */
        longitude: number;
        /**
         * Timezone offset from UTC in hours. Defaults to 5.5 (IST).
         */
        timezone?: number | string;
        /**
         * Coordinate system for longitude output. "sidereal" (Nirayana) uses Lahiri ayanamsa - standard for Vedic astrology. "tropical" (Sayana) uses raw ecliptic longitude matching Western astrology. Defaults to "sidereal".
         */
        coordinateSystem?: 'sidereal' | 'tropical';
    };
    path?: never;
    query?: never;
    url: '/vedic-astrology/transit';
};
export type CalculateTransitErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CalculateTransitError = CalculateTransitErrors[keyof CalculateTransitErrors];
export type CalculateTransitResponses = {
    /**
     * Transit analysis calculated successfully
     */
    200: {
        /**
         * Birth datetime used for the natal chart (UTC ISO 8601).
         */
        birthDatetime: string;
        /**
         * Transit datetime being analyzed (UTC ISO 8601).
         */
        transitDatetime: string;
        /**
         * All 9 planetary positions from the natal (birth) chart.
         */
        natalPlanets: Array<{
            /**
             * Planet name (Sun through Ketu plus Lagna).
             */
            name: string;
            /**
             * Sidereal longitude in degrees (0-360) using Lahiri ayanamsa.
             */
            longitude: number;
            /**
             * Vedic zodiac sign (rashi) the planet occupies in the birth chart.
             */
            sign: string;
            /**
             * House number (1-12) in the natal chart based on Placidus cusps.
             */
            house: number;
        }>;
        /**
         * Current planetary positions overlaid on the natal chart with house placements and aspects.
         */
        transitingPlanets: Array<{
            /**
             * Transiting planet name.
             */
            name: string;
            /**
             * Current sidereal longitude of the transiting planet.
             */
            longitude: number;
            /**
             * Current zodiac sign of the transiting planet.
             */
            sign: string;
            /**
             * Which natal house this planet is currently transiting through. Key for Gochar predictions.
             */
            natalHouse: number;
            /**
             * Aspects formed between this transiting planet and natal planets.
             */
            aspectsToNatal: Array<{
                /**
                 * Natal planet being aspected by this transiting planet.
                 */
                natalPlanet: string;
                /**
                 * Aspect type: conjunction, opposition, trine, square, or sextile.
                 */
                aspectType: string;
                /**
                 * Angular distance from exact aspect in degrees. Smaller orb = stronger influence.
                 */
                orb: number;
            }>;
        }>;
        /**
         * Highlighted transits from slow-moving planets (Jupiter, Saturn, Rahu, Ketu), most impactful for Gochar analysis.
         */
        keyTransits: Array<{
            /**
             * Slow-moving planet (Jupiter, Saturn, Rahu, Ketu) forming a significant transit.
             */
            planet: string;
            /**
             * Human-readable transit summary.
             */
            description: string;
            /**
             * Natal house being transited by this slow planet.
             */
            natalHouse: number;
            /**
             * Notable aspects to natal planets from this slow-moving transiting planet.
             */
            aspects: Array<string>;
        }>;
    };
};
export type CalculateTransitResponse = CalculateTransitResponses[keyof CalculateTransitResponses];
export type GetMonthlyTransitsData = {
    body?: {
        /**
         * Year for monthly transit analysis (1900-2100).
         */
        year: number;
        /**
         * Month number (1-12) for transit analysis.
         */
        month: number;
        /**
         * Timezone offset from UTC in hours. Output times are converted to this timezone. Defaults to 0 (UTC).
         */
        timezone?: number | string;
        /**
         * Coordinate system for longitude output. "sidereal" (Nirayana) uses Lahiri ayanamsa - standard for Vedic astrology. "tropical" (Sayana) uses raw ecliptic longitude matching Western astrology. Defaults to "sidereal".
         */
        coordinateSystem?: 'sidereal' | 'tropical';
    };
    path?: never;
    query?: never;
    url: '/vedic-astrology/transit/monthly';
};
export type GetMonthlyTransitsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetMonthlyTransitsError = GetMonthlyTransitsErrors[keyof GetMonthlyTransitsErrors];
export type GetMonthlyTransitsResponses = {
    /**
     * Monthly transit data calculated successfully
     */
    200: {
        /**
         * Year of the monthly transit analysis.
         */
        year: number;
        /**
         * Month of the monthly transit analysis.
         */
        month: number;
        /**
         * Planetary positions at the beginning of the month (day 1, 00:00 UTC).
         */
        startingPositions: Array<{
            /**
             * Planet (graha) name. One of the 9 Navagraha used in Vedic transit (Gochar) analysis.
             */
            planet: string;
            /**
             * Zodiac sign (rashi) the planet occupies at the start of the month.
             */
            sign: string;
            /**
             * Sidereal longitude at the start of the month.
             */
            longitude: number;
        }>;
        /**
         * All sign change events during the month, sorted chronologically. Moon changes sign roughly every 2.25 days, Sun once a month, slow planets less frequently.
         */
        transitEvents: Array<{
            /**
             * Planet that changes sign (rashi) during this month. One of the Navagraha: Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu.
             */
            planet: string;
            /**
             * Zodiac sign the planet is leaving (previous rashi).
             */
            fromSign: string;
            /**
             * Zodiac sign the planet is entering (new rashi transit).
             */
            toSign: string;
            /**
             * Date of the sign change (YYYY-MM-DD). Adjusted to requested timezone.
             */
            date: string;
            /**
             * Time of the sign change (HH:MM, 24-hour). Adjusted to requested timezone. Precise to ~1 minute via binary search.
             */
            time: string;
            /**
             * Full datetime of the sign change. Adjusted to requested timezone.
             */
            datetime: string;
            /**
             * Whether the planet is in retrograde motion (vakri) at the time of sign change. A retrograde ingress means the planet is moving backward into the previous sign, which carries different astrological significance than a direct (forward) ingress. Rahu and Ketu are always retrograde.
             */
            isRetrograde: boolean;
        }>;
    };
};
export type GetMonthlyTransitsResponse = GetMonthlyTransitsResponses[keyof GetMonthlyTransitsResponses];
export type CalculateParallelsData = {
    body?: {
        /**
         * Date in YYYY-MM-DD format. Planetary declinations are calculated for this date to find parallel and contraparallel aspects.
         */
        date: string;
        /**
         * Time in HH:MM:SS format (24-hour). Exact time affects declination values, especially for the fast-moving Moon.
         */
        time: string;
        /**
         * Observer latitude in decimal degrees. Used for topocentric declination corrections.
         */
        latitude: number;
        /**
         * Observer longitude in decimal degrees. Affects local time context for declination calculations.
         */
        longitude: number;
        /**
         * Timezone offset from UTC in hours. Defaults to 5.5 (IST).
         */
        timezone?: number | string;
        /**
         * Orb in degrees for parallel/contraparallel detection. Defaults to 1.5°.
         */
        orb?: number;
    };
    path?: never;
    query?: never;
    url: '/vedic-astrology/parallels';
};
export type CalculateParallelsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CalculateParallelsError = CalculateParallelsErrors[keyof CalculateParallelsErrors];
export type CalculateParallelsResponses = {
    /**
     * Declination parallels calculated successfully
     */
    200: {
        /**
         * UTC datetime used for declination calculation (ISO 8601).
         */
        datetime: string;
        /**
         * Declination and right ascension for each planet at the given moment.
         */
        planets: Array<{
            /**
             * Planet name (Sun through Saturn, the 7 visible planets).
             */
            name: string;
            /**
             * Celestial declination in degrees. Positive = north of celestial equator, negative = south.
             */
            declination: number;
            /**
             * Right ascension in degrees (0-360) along the celestial equator.
             */
            rightAscension: number;
        }>;
        /**
         * All parallel and contraparallel aspects found within the specified orb. Parallels are powerful hidden aspects often overlooked in standard chart analysis.
         */
        parallels: Array<{
            /**
             * First planet in the parallel/contraparallel pair.
             */
            planet1: string;
            /**
             * Second planet in the pair.
             */
            planet2: string;
            /**
             * Parallel = same declination (acts like conjunction). Contraparallel = opposite declination (acts like opposition).
             */
            type: 'parallel' | 'contraparallel';
            /**
             * Angular difference from exact parallel/contraparallel in degrees. Smaller = stronger.
             */
            orb: number;
            /**
             * Declination of the first planet in degrees.
             */
            dec1: number;
            /**
             * Declination of the second planet in degrees.
             */
            dec2: number;
        }>;
    };
};
export type CalculateParallelsResponse = CalculateParallelsResponses[keyof CalculateParallelsResponses];
export type GetMonthlyParallelsData = {
    body?: {
        /**
         * Year for monthly parallel analysis (1900-2100).
         */
        year: number;
        /**
         * Month number (1-12) for parallel analysis.
         */
        month: number;
        /**
         * Timezone offset from UTC in hours. Output times are converted to this timezone. Defaults to 0 (UTC).
         */
        timezone?: number | string;
    };
    path?: never;
    query?: never;
    url: '/vedic-astrology/parallels/monthly';
};
export type GetMonthlyParallelsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetMonthlyParallelsError = GetMonthlyParallelsErrors[keyof GetMonthlyParallelsErrors];
export type GetMonthlyParallelsResponses = {
    /**
     * Monthly parallel events
     */
    200: {
        /**
         * Year of the parallel analysis.
         */
        year: number;
        /**
         * Month of the parallel analysis.
         */
        month: number;
        /**
         * All parallel and contraparallel events detected during the month, sorted chronologically.
         */
        events: Array<{
            /**
             * First planet in the parallel or contraparallel pair.
             */
            planet1: string;
            /**
             * Second planet in the pair.
             */
            planet2: string;
            /**
             * Parallel = same declination (acts like conjunction in strength). Contraparallel = opposite declination (acts like opposition).
             */
            type: 'parallel' | 'contraparallel';
            /**
             * Date of closest declination match (YYYY-MM-DD). Adjusted to requested timezone.
             */
            date: string;
            /**
             * Time of closest declination match (HH:MM, 24-hour). Adjusted to requested timezone.
             */
            time: string;
            /**
             * Full datetime of closest declination match. Adjusted to requested timezone.
             */
            datetime: string;
            /**
             * Declination difference from exact parallel/contraparallel in degrees. Smaller = stronger.
             */
            orb: number;
            /**
             * Declination of the first planet in degrees.
             */
            dec1: number;
            /**
             * Declination of the second planet in degrees.
             */
            dec2: number;
        }>;
    };
};
export type GetMonthlyParallelsResponse = GetMonthlyParallelsResponses[keyof GetMonthlyParallelsResponses];
export type GetEclipticCrossingsData = {
    body?: {
        /**
         * Year to scan for ecliptic crossings (1900-2100).
         */
        year: number;
        /**
         * Timezone offset from UTC in hours. Output times are converted to this timezone. Defaults to 0 (UTC).
         */
        timezone?: number | string;
        /**
         * Coordinate system for longitude output. "sidereal" (Nirayana) uses Lahiri ayanamsa - standard for Vedic astrology. "tropical" (Sayana) uses raw ecliptic longitude matching Western astrology. Defaults to "sidereal".
         */
        coordinateSystem?: 'sidereal' | 'tropical';
    };
    path?: never;
    query?: never;
    url: '/vedic-astrology/ecliptic-crossings';
};
export type GetEclipticCrossingsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetEclipticCrossingsError = GetEclipticCrossingsErrors[keyof GetEclipticCrossingsErrors];
export type GetEclipticCrossingsResponses = {
    /**
     * Ecliptic crossing events for the year
     */
    200: {
        /**
         * Year scanned for ecliptic crossings.
         */
        year: number;
        /**
         * All ecliptic crossing events for visible planets during the year, sorted chronologically.
         */
        events: Array<{
            /**
             * Planet crossing the ecliptic plane. Sun is excluded (always on the ecliptic by definition).
             */
            planet: string;
            /**
             * Date of the ecliptic crossing (YYYY-MM-DD). Adjusted to requested timezone.
             */
            date: string;
            /**
             * Time of the ecliptic crossing (HH:MM, 24-hour). Adjusted to requested timezone.
             */
            time: string;
            /**
             * Full datetime of the ecliptic crossing. Adjusted to requested timezone.
             */
            datetime: string;
            /**
             * Ascending = planet moves from south to north of the ecliptic. Descending = north to south.
             */
            direction: 'ascending' | 'descending';
            /**
             * Sidereal longitude of the planet at the moment of crossing (Lahiri ayanamsa).
             */
            longitude: number;
            /**
             * Vedic zodiac sign (rashi) the planet occupies at the crossing.
             */
            sign: string;
        }>;
    };
};
export type GetEclipticCrossingsResponse = GetEclipticCrossingsResponses[keyof GetEclipticCrossingsResponses];
export type ListRashisData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/vedic-astrology/rashis';
};
export type ListRashisErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type ListRashisError = ListRashisErrors[keyof ListRashisErrors];
export type ListRashisResponses = {
    /**
     * Array of all 12 Vedic rashis (Mesha through Meen) with Sanskrit names, Western equivalents, sidereal date ranges, symbols, governing Adityas, and personality characteristics.
     */
    200: RashiListResponse;
};
export type ListRashisResponse = ListRashisResponses[keyof ListRashisResponses];
export type GetRashiData = {
    body?: never;
    path: {
        /**
         * Rashi ID slug. One of: mesha, vrishabha, mithun, karka, simha, kanya, tula, vrischika, dhanu, makar, kumbha, meen.
         */
        id: string;
    };
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/vedic-astrology/rashis/{id}';
};
export type GetRashiErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Rashi not found
     */
    404: {
        /**
         * Human-readable error message. May change wording — do not parse programmatically.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier for programmatic error handling.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetRashiError = GetRashiErrors[keyof GetRashiErrors];
export type GetRashiResponses = {
    /**
     * Single rashi with Sanskrit name, Western equivalent, sidereal date range, symbol, governing Aditya, and personality characteristics.
     */
    200: RashiResponse;
};
export type GetRashiResponse = GetRashiResponses[keyof GetRashiResponses];
export type ListNakshatrasData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/vedic-astrology/nakshatras';
};
export type ListNakshatrasErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type ListNakshatrasError = ListNakshatrasErrors[keyof ListNakshatrasErrors];
export type ListNakshatrasResponses = {
    /**
     * Array of all 27 nakshatras (Ashwini through Revati) with zodiac ranges, ruling planets, deities, symbols, personality characteristics, and traditional remedies.
     */
    200: NakshatraListResponse;
};
export type ListNakshatrasResponse = ListNakshatrasResponses[keyof ListNakshatrasResponses];
export type GetNakshatraData = {
    body?: never;
    path: {
        /**
         * Nakshatra ID slug. Examples: ashwini, bharani, krittika, rohini, mrigashira, ardra, punarvasu, pushya, ashlesha, magha, etc.
         */
        id: string;
    };
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/vedic-astrology/nakshatras/{id}';
};
export type GetNakshatraErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Nakshatra not found
     */
    404: {
        /**
         * Human-readable error message. May change wording — do not parse programmatically.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier for programmatic error handling.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetNakshatraError = GetNakshatraErrors[keyof GetNakshatraErrors];
export type GetNakshatraResponses = {
    /**
     * Single nakshatra with zodiac range, ruling planet, presiding deity, symbol, personality characteristics, and traditional remedies (mantras, gemstones, rituals).
     */
    200: NakshatraResponse;
};
export type GetNakshatraResponse = GetNakshatraResponses[keyof GetNakshatraResponses];
export type GetUpagrahaPositionsData = {
    body?: UpagrahaRequest;
    path?: never;
    query?: never;
    url: '/vedic-astrology/upagraha';
};
export type GetUpagrahaPositionsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetUpagrahaPositionsError = GetUpagrahaPositionsErrors[keyof GetUpagrahaPositionsErrors];
export type GetUpagrahaPositionsResponses = {
    /**
     * All 11 upagraha positions with rashi, nakshatra, and pada details.
     */
    200: UpagrahaResponse;
};
export type GetUpagrahaPositionsResponse = GetUpagrahaPositionsResponses[keyof GetUpagrahaPositionsResponses];
export type CalculateAshtakavargaData = {
    body?: AshtakavargaRequest;
    path?: never;
    query?: never;
    url: '/vedic-astrology/ashtakavarga';
};
export type CalculateAshtakavargaErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CalculateAshtakavargaError = CalculateAshtakavargaErrors[keyof CalculateAshtakavargaErrors];
export type CalculateAshtakavargaResponses = {
    /**
     * Complete Ashtakavarga with Bhinnashtakavarga, Sarvashtakavarga (337-point), Reduced Ashtakavarga (Trikona + Ekadipati Shodhana), and Shodhya Pinda planetary strength.
     */
    200: AshtakavargaResponse;
};
export type CalculateAshtakavargaResponse = CalculateAshtakavargaResponses[keyof CalculateAshtakavargaResponses];
export type CalculateShadbalaData = {
    body?: ShadbalaRequest;
    path?: never;
    query?: never;
    url: '/vedic-astrology/shadbala';
};
export type CalculateShadbalaErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CalculateShadbalaError = CalculateShadbalaErrors[keyof CalculateShadbalaErrors];
export type CalculateShadbalaResponses = {
    /**
     * Complete Shadbala with 6 strength components, Ishta/Kashta Phala, strength ratios, and relative ranking for all 7 planets.
     */
    200: ShadbalaResponse;
};
export type CalculateShadbalaResponse = CalculateShadbalaResponses[keyof CalculateShadbalaResponses];
export type CalculateLifePathData = {
    body?: {
        /**
         * Birth year between 100 and 2100. Supports historical figures like Einstein (1879) and Shakespeare (1564).
         */
        year: number;
        /**
         * Birth month (1-12)
         */
        month: number;
        /**
         * Birth day (1-31)
         */
        day: number;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/numerology/life-path';
};
export type CalculateLifePathErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CalculateLifePathError = CalculateLifePathErrors[keyof CalculateLifePathErrors];
export type CalculateLifePathResponses = {
    /**
     * Successfully calculated Life Path number with detailed interpretation
     */
    200: {
        /**
         * Your Life Path number, the single most important number in Pythagorean numerology. Values range from 1 to 9 for single digits, or 11, 22, 33 for Master Numbers.
         */
        number: number;
        /**
         * Full step-by-step breakdown of the 3-Cycle Pythagorean reduction. Shows how month, day, and year each reduce independently before combining into the final Life Path number.
         */
        calculation: string;
        /**
         * Whether this is a standard single-digit number (1 to 9) or a Master Number (11, 22, 33). Master Numbers carry amplified spiritual significance and are never reduced further.
         */
        type: 'single' | 'master';
        /**
         * Indicates whether a Karmic Debt number (13, 14, 16, or 19) appeared during the reduction chain. Karmic Debt reveals past-life challenges carried into this lifetime.
         */
        hasKarmicDebt: boolean;
        /**
         * The specific Karmic Debt number detected during reduction, if any. Each debt number (13, 14, 16, 19) represents a distinct past-life lesson requiring resolution.
         */
        karmicDebtNumber?: number;
        /**
         * Detailed interpretation of the Karmic Debt number when present. Only returned when hasKarmicDebt is true.
         */
        karmicDebtMeaning?: {
            /**
             * Title describing the karmic debt theme and core past-life pattern.
             */
            description: string;
            /**
             * The specific challenge or pattern from past lives that must be confronted.
             */
            challenge: string;
            /**
             * Practical guidance for resolving the karmic debt and transforming the challenge into growth.
             */
            resolution: string;
        };
        meaning: {
            /**
             * Numerology archetype name for this Life Path number. Encapsulates the core identity and energy in a single phrase, such as "The Leader" for 1 or "The Master Builder" for 22.
             */
            title: string;
            /**
             * Ten defining personality traits and energetic themes associated with this number. Useful for quick personality snapshots, tag clouds, and compatibility matching.
             */
            keywords: Array<string>;
            /**
             * In-depth 300 to 500 word interpretation covering personality, purpose, and life themes. Written by numerology experts with decades of practice. Suitable for full-page readings and detailed reports.
             */
            description: string;
            /**
             * Core strengths and positive qualities. Each entry includes a trait name followed by a detailed explanation of how it manifests in daily life.
             */
            strengths: Array<string>;
            /**
             * Growth areas and shadow qualities to be aware of. Each entry names the challenge and explains its root cause and how to work through it constructively.
             */
            challenges: Array<string>;
            /**
             * Tailored career guidance covering ideal industries, roles, and work environments. Includes specific job titles and explains why certain professional paths align with this number.
             */
            career: string;
            /**
             * Love, friendship, and family dynamics. Covers romantic compatibility with other Life Path numbers, communication style, and the key relationship lessons for this number.
             */
            relationships: string;
            /**
             * Spiritual path, soul lessons, and recommended practices. Explores the deeper purpose behind this number and offers guidance for personal growth and inner alignment.
             */
            spirituality: string;
        };
    };
};
export type CalculateLifePathResponse = CalculateLifePathResponses[keyof CalculateLifePathResponses];
export type CalculateExpressionData = {
    body?: {
        /**
         * Full birth name (first, middle, last)
         */
        fullName: string;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/numerology/expression';
};
export type CalculateExpressionErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CalculateExpressionError = CalculateExpressionErrors[keyof CalculateExpressionErrors];
export type CalculateExpressionResponses = {
    /**
     * Successfully calculated Expression number with detailed interpretation
     */
    200: {
        /**
         * Expression number (also called Destiny number) derived from all letters in the full birth name. Reveals natural talents, abilities, and the goals you are meant to achieve. Values: 1 to 9, 11, 22, or 33.
         */
        number: number;
        /**
         * Full Pythagorean letter-to-number conversion showing every letter value in the birth name, grouped by word, then summed and reduced to the final Expression number.
         */
        calculation: string;
        /**
         * Single-digit (1 to 9) or Master Number (11, 22, 33). Master Numbers in the Expression position indicate extraordinary innate talent that demands conscious development.
         */
        type: 'single' | 'master';
        /**
         * Whether a Karmic Debt number (13, 14, 16, 19) appeared during the name reduction. Indicates inherited challenges embedded in your given name.
         */
        hasKarmicDebt: boolean;
        /**
         * Specific Karmic Debt number found during reduction. Each debt (13, 14, 16, 19) points to a distinct lesson woven into the talents your name bestows.
         */
        karmicDebtNumber?: number;
        /**
         * Detailed interpretation of the Karmic Debt number when present. Includes the debt theme, the inherited challenge, and guidance for resolution. Only returned when hasKarmicDebt is true.
         */
        karmicDebtMeaning?: {
            /**
             * Title describing the karmic debt theme. Identifies the core past-life pattern that this debt number carries forward.
             */
            description: string;
            /**
             * The specific challenge or pattern from past lives that must be confronted. Explains the root cause of recurring obstacles.
             */
            challenge: string;
            /**
             * Practical guidance for resolving the karmic debt. Actionable steps for transforming the inherited challenge into growth.
             */
            resolution: string;
        };
        meaning: {
            /**
             * Numerology archetype for this Expression number. Captures the essence of your natural abilities, such as "The Communicator" for 3 or "The Master Intuitive" for 11.
             */
            title: string;
            /**
             * Defining traits and talent themes for this Expression number. Ideal for personality profiles, compatibility engines, and talent-matching features.
             */
            keywords: Array<string>;
            /**
             * Expert-written 300 to 500 word interpretation of the natural abilities, life mission, and destiny encoded in your birth name. Covers how these talents manifest across life stages.
             */
            description: string;
            /**
             * Natural talents and innate gifts. Each strength includes a detailed explanation of how it shows up in work, relationships, and personal growth.
             */
            strengths: Array<string>;
            /**
             * Shadow side of your talents and areas requiring conscious effort. Each challenge explains its root cause and practical strategies for transformation.
             */
            challenges: Array<string>;
            /**
             * Professional guidance aligned with your natural Expression talents. Covers ideal industries, specific roles, and the work environments where you will thrive.
             */
            career: string;
            /**
             * How your Expression number shapes love, friendship, and family bonds. Includes compatibility insights with other numbers and communication patterns.
             */
            relationships: string;
            /**
             * The spiritual dimension of your Expression energy. Explores soul lessons, recommended practices, and the deeper purpose your talents are meant to serve.
             */
            spirituality: string;
        };
    };
};
export type CalculateExpressionResponse = CalculateExpressionResponses[keyof CalculateExpressionResponses];
export type CalculateBridgeNumbersData = {
    body?: {
        /**
         * Full legal birth name as it appears on the birth certificate. Used to calculate Expression, Soul Urge, and Personality numbers. Include first, middle, and last names separated by spaces.
         */
        fullName: string;
        /**
         * Birth year between 100 and 2100. Used to calculate the Life Path number via Pythagorean reduction.
         */
        year: number;
        /**
         * Birth month (1 to 12)
         */
        month: number;
        /**
         * Birth day (1 to 31)
         */
        day: number;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/numerology/bridge';
};
export type CalculateBridgeNumbersErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CalculateBridgeNumbersError = CalculateBridgeNumbersErrors[keyof CalculateBridgeNumbersErrors];
export type CalculateBridgeNumbersResponses = {
    /**
     * Successfully calculated three Bridge Numbers with actionable harmony guidance
     */
    200: {
        /**
         * Bridge between Life Path and Expression numbers. Reveals the gap between your destined life purpose (from birth date) and your natural talents and abilities (from birth name). A high bridge here means your innate skills may not directly serve your life mission without conscious effort.
         */
        lifePathExpression: {
            /**
             * Bridge number (0 to 8). The absolute difference between two core numerology numbers after reducing master numbers to single digits. 0 means the two aspects are already in natural harmony. Higher values indicate greater tension requiring conscious adjustment.
             */
            bridge: number;
            from: {
                /**
                 * Name of the first core number in this bridge pair. Identifies which aspect of personality or destiny is being compared.
                 */
                name: string;
                /**
                 * The reduced single-digit value (1 to 9) of the first core number used in the bridge calculation.
                 */
                number: number;
            };
            to: {
                /**
                 * Name of the second core number in this bridge pair. Identifies the other aspect of personality or destiny being compared.
                 */
                name: string;
                /**
                 * The reduced single-digit value (1 to 9) of the second core number used in the bridge calculation.
                 */
                number: number;
            };
            /**
             * Actionable guidance for bridging the gap between these two aspects of your numerology profile. Explains what adjustments to make to bring these energies into harmony.
             */
            meaning: string;
        };
        /**
         * Bridge between Expression and Personality numbers. Reveals the gap between your true talents (all letters) and how others perceive you (consonants only). A high bridge means others may not see your real capabilities, requiring you to present yourself more authentically.
         */
        expressionPersonality: {
            /**
             * Bridge number (0 to 8). The absolute difference between two core numerology numbers after reducing master numbers to single digits. 0 means the two aspects are already in natural harmony. Higher values indicate greater tension requiring conscious adjustment.
             */
            bridge: number;
            from: {
                /**
                 * Name of the first core number in this bridge pair. Identifies which aspect of personality or destiny is being compared.
                 */
                name: string;
                /**
                 * The reduced single-digit value (1 to 9) of the first core number used in the bridge calculation.
                 */
                number: number;
            };
            to: {
                /**
                 * Name of the second core number in this bridge pair. Identifies the other aspect of personality or destiny being compared.
                 */
                name: string;
                /**
                 * The reduced single-digit value (1 to 9) of the second core number used in the bridge calculation.
                 */
                number: number;
            };
            /**
             * Actionable guidance for bridging the gap between these two aspects of your numerology profile. Explains what adjustments to make to bring these energies into harmony.
             */
            meaning: string;
        };
        /**
         * Bridge between Expression and Soul Urge numbers. Reveals the gap between your outward talents (all letters) and your deepest inner desires (vowels only). A high bridge means what you are good at may differ from what your soul truly craves, calling for realignment.
         */
        expressionSoulUrge: {
            /**
             * Bridge number (0 to 8). The absolute difference between two core numerology numbers after reducing master numbers to single digits. 0 means the two aspects are already in natural harmony. Higher values indicate greater tension requiring conscious adjustment.
             */
            bridge: number;
            from: {
                /**
                 * Name of the first core number in this bridge pair. Identifies which aspect of personality or destiny is being compared.
                 */
                name: string;
                /**
                 * The reduced single-digit value (1 to 9) of the first core number used in the bridge calculation.
                 */
                number: number;
            };
            to: {
                /**
                 * Name of the second core number in this bridge pair. Identifies the other aspect of personality or destiny being compared.
                 */
                name: string;
                /**
                 * The reduced single-digit value (1 to 9) of the second core number used in the bridge calculation.
                 */
                number: number;
            };
            /**
             * Actionable guidance for bridging the gap between these two aspects of your numerology profile. Explains what adjustments to make to bring these energies into harmony.
             */
            meaning: string;
        };
    };
};
export type CalculateBridgeNumbersResponse = CalculateBridgeNumbersResponses[keyof CalculateBridgeNumbersResponses];
export type CalculateSoulUrgeData = {
    body?: {
        /**
         * Full birth name (vowels will be extracted)
         */
        fullName: string;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/numerology/soul-urge';
};
export type CalculateSoulUrgeErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CalculateSoulUrgeError = CalculateSoulUrgeErrors[keyof CalculateSoulUrgeErrors];
export type CalculateSoulUrgeResponses = {
    /**
     * Successfully calculated Soul Urge number with detailed interpretation
     */
    200: {
        /**
         * Your Soul Urge number (also called Heart Desire number), revealing your innermost motivations and what your soul truly craves. Values range from 1 to 9 for single digits, or 11, 22, 33 for Master Numbers.
         */
        number: number;
        /**
         * Full step-by-step Pythagorean reduction using only the vowels (A, E, I, O, U) from the birth name. Shows each vowel mapped to its numeric value, grouped by word, then summed and reduced to the final Soul Urge number.
         */
        calculation: string;
        /**
         * Whether this is a standard single-digit number (1 to 9) or a Master Number (11, 22, 33). Master Numbers in the Soul Urge position indicate a soul with amplified spiritual longing and heightened inner sensitivity.
         */
        type: 'single' | 'master';
        /**
         * Indicates whether a Karmic Debt number (13, 14, 16, or 19) appeared during the vowel reduction chain. Karmic Debt in the Soul Urge reveals past-life emotional patterns and unresolved inner desires carried into this lifetime.
         */
        hasKarmicDebt: boolean;
        /**
         * The specific Karmic Debt number detected during the vowel reduction, if any. Each debt number (13, 14, 16, 19) represents a distinct past-life emotional lesson that influences your deepest desires and motivations.
         */
        karmicDebtNumber?: number;
        /**
         * Detailed interpretation of the Karmic Debt number when present. Only returned when hasKarmicDebt is true.
         */
        karmicDebtMeaning?: {
            /**
             * Title describing the karmic debt theme and core past-life pattern.
             */
            description: string;
            /**
             * The specific challenge from past lives that must be confronted.
             */
            challenge: string;
            /**
             * Practical guidance for resolving the karmic debt.
             */
            resolution: string;
        };
        meaning: {
            /**
             * Numerology archetype for this Soul Urge number. Reveals the deepest inner motivation, such as "The Seeker" for 7 or "The Master Teacher" for 33.
             */
            title: string;
            /**
             * Core emotional drives and inner motivations for this Soul Urge. Useful for understanding hidden desires, emotional needs, and what truly fulfills someone at the deepest level.
             */
            keywords: Array<string>;
            /**
             * Expert-written 300 to 500 word exploration of the inner self, hidden desires, and emotional landscape. Reveals what the heart truly craves beneath the surface persona.
             */
            description: string;
            /**
             * Emotional superpowers and inner gifts. Each strength describes how it shapes decision-making, relationships, and the pursuit of personal fulfillment.
             */
            strengths: Array<string>;
            /**
             * Inner shadows and emotional patterns to balance. Explains how each challenge manifests when the Soul Urge energy is overextended or repressed.
             */
            challenges: Array<string>;
            /**
             * Career paths that satisfy your deepest emotional needs. Focuses on work that feeds the soul rather than just the resume, aligned with inner fulfillment.
             */
            career: string;
            /**
             * How your Soul Urge shapes what you need from love, friendship, and family. Covers emotional compatibility, attachment style, and the key to feeling truly seen.
             */
            relationships: string;
            /**
             * The spiritual hunger at your core. Explores what your soul is seeking in this lifetime and the practices that bring you closest to inner peace and alignment.
             */
            spirituality: string;
        };
    };
};
export type CalculateSoulUrgeResponse = CalculateSoulUrgeResponses[keyof CalculateSoulUrgeResponses];
export type CalculatePersonalityData = {
    body?: {
        /**
         * Full birth name (consonants will be extracted)
         */
        fullName: string;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/numerology/personality';
};
export type CalculatePersonalityErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CalculatePersonalityError = CalculatePersonalityErrors[keyof CalculatePersonalityErrors];
export type CalculatePersonalityResponses = {
    /**
     * Successfully calculated Personality number with detailed interpretation
     */
    200: {
        /**
         * Your Personality number, derived from the consonants in your birth name. Reveals how others perceive you, your outer persona, and the first impression you project. Values range from 1 to 9 for single digits, or 11, 22, 33 for Master Numbers.
         */
        number: number;
        /**
         * Full step-by-step Pythagorean reduction using only the consonants from the birth name. Shows each consonant mapped to its numeric value, grouped by word, then summed and reduced to the final Personality number.
         */
        calculation: string;
        /**
         * Whether this is a standard single-digit number (1 to 9) or a Master Number (11, 22, 33). Master Numbers in the Personality position indicate a powerful outer presence that others immediately sense, carrying heightened charisma and public influence.
         */
        type: 'single' | 'master';
        /**
         * Indicates whether a Karmic Debt number (13, 14, 16, or 19) appeared during the consonant reduction chain. Karmic Debt in the Personality position reveals past-life patterns that influence how others perceive you and the social challenges you must overcome.
         */
        hasKarmicDebt: boolean;
        /**
         * The specific Karmic Debt number detected during the consonant reduction, if any. Each debt number (13, 14, 16, 19) represents a distinct past-life lesson that shapes your public image and social interactions.
         */
        karmicDebtNumber?: number;
        /**
         * Detailed interpretation of the Karmic Debt number when present. Only returned when hasKarmicDebt is true.
         */
        karmicDebtMeaning?: {
            /**
             * Title describing the karmic debt theme and core past-life pattern.
             */
            description: string;
            /**
             * The specific challenge from past lives that must be confronted.
             */
            challenge: string;
            /**
             * Practical guidance for resolving the karmic debt.
             */
            resolution: string;
        };
        meaning: {
            /**
             * Numerology archetype for this Personality number. Represents the outer mask you show the world, such as "The Builder" for 4 or "The Powerhouse" for 8.
             */
            title: string;
            /**
             * Traits that define your public persona and first impression. These are the qualities others perceive before they get to know the real you.
             */
            keywords: Array<string>;
            /**
             * Expert-written 300 to 500 word analysis of the outer personality, social presence, and the image you project to the world. Reveals the gap between how others see you and who you truly are.
             */
            description: string;
            /**
             * Your strongest social assets and public-facing gifts. These qualities shape how you are received in professional settings, social gatherings, and first meetings.
             */
            strengths: Array<string>;
            /**
             * Blind spots in your public persona. Patterns others notice that you may not, including defense mechanisms and image-management tendencies that can limit authentic connection.
             */
            challenges: Array<string>;
            /**
             * How your outward presence shapes professional opportunities. Covers the industries, roles, and environments where your public image creates the greatest advantage.
             */
            career: string;
            /**
             * First impressions in love and social dynamics. Explores how your Personality number attracts certain partners, sets relationship expectations, and influences group dynamics.
             */
            relationships: string;
            /**
             * The spiritual energy you radiate to others. Explores how your outer presence serves as a channel for deeper purpose, and what your public path reveals about your soul mission.
             */
            spirituality: string;
        };
    };
};
export type CalculatePersonalityResponse = CalculatePersonalityResponses[keyof CalculatePersonalityResponses];
export type CalculateBirthDayData = {
    body?: {
        /**
         * Day of birth (1-31)
         */
        day: number;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/numerology/birth-day';
};
export type CalculateBirthDayErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CalculateBirthDayError = CalculateBirthDayErrors[keyof CalculateBirthDayErrors];
export type CalculateBirthDayResponses = {
    /**
     * Successfully calculated Birth Day number with detailed interpretation
     */
    200: {
        /**
         * Your Birth Day number, revealing the special talents and innate abilities you carry from the day you were born. Values range from 1 to 9 for single digits, or 11, 22 for Master Numbers (days 11 and 22 are never reduced).
         */
        number: number;
        /**
         * Step-by-step digit reduction of the birth day. Single-digit days (1 to 9) remain as-is, Master Number days (11, 22) are preserved, and all other double-digit days are reduced by summing their digits.
         */
        calculation: string;
        /**
         * Whether this is a standard single-digit number (1 to 9) or a Master Number (11, 22). Master Numbers in the Birth Day position indicate extraordinary innate gifts that are available from birth and demand conscious development.
         */
        type: 'single' | 'master';
        /**
         * Indicates whether a Karmic Debt number (13, 14, 16, or 19) corresponds to the birth day. Karmic Debt in the Birth Day position reveals past-life challenges woven directly into your natural talents, influencing how your gifts manifest.
         */
        hasKarmicDebt: boolean;
        /**
         * The specific Karmic Debt number detected from the birth day, if any. Each debt number (13, 14, 16, 19) represents a distinct past-life lesson embedded in the talents your birth day bestows.
         */
        karmicDebtNumber?: number;
        /**
         * Detailed interpretation of the Karmic Debt number when present. Only returned when hasKarmicDebt is true.
         */
        karmicDebtMeaning?: {
            /**
             * Title describing the karmic debt theme and core past-life pattern.
             */
            description: string;
            /**
             * The specific challenge from past lives that must be confronted.
             */
            challenge: string;
            /**
             * Practical guidance for resolving the karmic debt.
             */
            resolution: string;
        };
        meaning: {
            /**
             * Numerology archetype for this Birth Day number. Represents the specific talent or gift you brought into this life, like "The Nurturer" for 6 or "The Seeker" for 7.
             */
            title: string;
            /**
             * Innate talents and natural aptitudes encoded in your birth day. These gifts are available from birth and become more refined with age.
             */
            keywords: Array<string>;
            /**
             * Expert-written 300 to 500 word reading of the special abilities your birth day bestows. Covers how these gifts complement your Life Path and Expression numbers.
             */
            description: string;
            /**
             * Natural-born strengths that come effortlessly. These are the talents you can rely on even without formal training or conscious development.
             */
            strengths: Array<string>;
            /**
             * The flip side of your gifts. Each challenge explains how an overreliance on natural talent can become a liability without conscious balance.
             */
            challenges: Array<string>;
            /**
             * Professional paths where your birth day talents create an immediate advantage. Covers specific roles, industries, and work styles that align with your innate abilities.
             */
            career: string;
            /**
             * How your birth day gifts shape the way you connect with others. Covers romantic chemistry, friendship dynamics, and the relationship patterns rooted in your natural temperament.
             */
            relationships: string;
            /**
             * The spiritual dimension of your natural gifts. Explores how your birth day talents serve a higher purpose and the practices that help you channel them with intention.
             */
            spirituality: string;
        };
    };
};
export type CalculateBirthDayResponse = CalculateBirthDayResponses[keyof CalculateBirthDayResponses];
export type CalculateMaturityData = {
    body?: {
        /**
         * Your Life Path number (1-9, 11, 22, 33). Optional if year, month, day are provided.
         */
        lifePath?: number;
        /**
         * Your Expression number (1-9, 11, 22, 33). Optional if fullName is provided.
         */
        expression?: number;
        /**
         * Full birth name to calculate Expression number automatically. Use instead of passing expression directly.
         */
        fullName?: string;
        /**
         * Birth year to calculate Life Path automatically. Use with month and day instead of passing lifePath directly.
         */
        year?: number;
        /**
         * Birth month (1-12). Required with year and day for automatic Life Path calculation.
         */
        month?: number;
        /**
         * Birth day (1-31). Required with year and month for automatic Life Path calculation.
         */
        day?: number;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/numerology/maturity';
};
export type CalculateMaturityErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CalculateMaturityError = CalculateMaturityErrors[keyof CalculateMaturityErrors];
export type CalculateMaturityResponses = {
    /**
     * Successfully calculated Maturity number with detailed interpretation
     */
    200: {
        /**
         * Your Maturity number (also called Realization number), revealing who you are becoming in the second half of life. Derived from the sum of your Life Path and Expression numbers. Values range from 1 to 9 for single digits, or 11, 22, 33 for Master Numbers.
         */
        number: number;
        /**
         * Full step-by-step reduction showing Life Path plus Expression combined and reduced to the final Maturity number. This synthesis represents the convergence of your life purpose and natural talents into mature wisdom.
         */
        calculation: string;
        /**
         * Whether this is a standard single-digit number (1 to 9) or a Master Number (11, 22, 33). Master Numbers in the Maturity position indicate a powerful late-life awakening with extraordinary potential for spiritual leadership and legacy.
         */
        type: 'single' | 'master';
        /**
         * Indicates whether a Karmic Debt number (13, 14, 16, or 19) appeared during the Life Path plus Expression reduction. Karmic Debt in the Maturity position reveals past-life lessons that surface during midlife transformation, typically after age 35 to 40.
         */
        hasKarmicDebt: boolean;
        /**
         * The specific Karmic Debt number detected during the Maturity reduction, if any. Each debt number (13, 14, 16, 19) represents a distinct past-life challenge that becomes especially prominent as you enter the second half of life.
         */
        karmicDebtNumber?: number;
        /**
         * Detailed interpretation of the Karmic Debt number when present. Only returned when hasKarmicDebt is true.
         */
        karmicDebtMeaning?: {
            /**
             * Title describing the karmic debt theme and core past-life pattern.
             */
            description: string;
            /**
             * The specific challenge from past lives that must be confronted.
             */
            challenge: string;
            /**
             * Practical guidance for resolving the karmic debt.
             */
            resolution: string;
        };
        meaning: {
            /**
             * Numerology archetype for the Maturity number. Reveals who you are becoming in the second half of life, such as "The Builder" for 4 or "The Humanitarian" for 9.
             */
            title: string;
            /**
             * Emerging traits and qualities that strengthen after age 35 to 40. These energies gradually integrate into your personality as you mature.
             */
            keywords: Array<string>;
            /**
             * Expert-written 300 to 500 word guide to the person you are evolving into. The Maturity number is the sum of Life Path and Expression, representing the wisdom gained through lived experience.
             */
            description: string;
            /**
             * Late-blooming strengths that emerge with age and experience. These are the gifts that become your greatest assets in the second half of life.
             */
            strengths: Array<string>;
            /**
             * Growth areas to watch as Maturity energy intensifies. Understanding these early helps you navigate the transition with awareness and grace.
             */
            challenges: Array<string>;
            /**
             * Career evolution and professional reinvention for the second act. Covers industries, roles, and pursuits that align with your mature energy and accumulated wisdom.
             */
            career: string;
            /**
             * How your relationships deepen and transform as Maturity energy takes hold. Covers evolving partnership needs, family dynamics, and the relationship wisdom that comes with age.
             */
            relationships: string;
            /**
             * Spiritual awakening in the mature years. Explores the deeper meaning that emerges when life experience meets the Maturity number, and practices for this transformative phase.
             */
            spirituality: string;
        };
    };
};
export type CalculateMaturityResponse = CalculateMaturityResponses[keyof CalculateMaturityResponses];
export type AnalyzeKarmicLessonsData = {
    body?: {
        /**
         * Full birth name to analyze for missing numbers
         */
        fullName: string;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/numerology/karmic-lessons';
};
export type AnalyzeKarmicLessonsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type AnalyzeKarmicLessonsError = AnalyzeKarmicLessonsErrors[keyof AnalyzeKarmicLessonsErrors];
export type AnalyzeKarmicLessonsResponses = {
    /**
     * Successfully analyzed karmic lessons with development guidance
     */
    200: {
        /**
         * Numbers missing from name (karmic lessons)
         */
        missingNumbers: Array<number>;
        lessons: Array<{
            /**
             * Missing number
             */
            number: number;
            /**
             * Core lesson summary
             */
            lesson: string;
            /**
             * Detailed lesson explanation
             */
            description: string;
            /**
             * Practical guidance for developing this quality
             */
            howToOvercome: string;
        }>;
        /**
         * Count of each number present in name
         */
        presentNumbers: {
            [key: string]: number;
        };
    };
};
export type AnalyzeKarmicLessonsResponse = AnalyzeKarmicLessonsResponses[keyof AnalyzeKarmicLessonsResponses];
export type CheckKarmicDebtData = {
    body?: {
        /**
         * Birth year (checks Life Path)
         */
        year?: number;
        /**
         * Birth month (checks Life Path)
         */
        month?: number;
        /**
         * Birth day (checks Life Path)
         */
        day?: number;
        /**
         * Full birth name (checks Expression, Soul Urge, Personality)
         */
        fullName?: string;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/numerology/karmic-debt';
};
export type CheckKarmicDebtErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CheckKarmicDebtError = CheckKarmicDebtErrors[keyof CheckKarmicDebtErrors];
export type CheckKarmicDebtResponses = {
    /**
     * Successfully detected karmic debt with detailed meanings
     */
    200: {
        /**
         * Whether any karmic debt numbers were detected
         */
        hasKarmicDebt: boolean;
        /**
         * All karmic debt numbers found (13, 14, 16, 19)
         */
        debtNumbers: Array<number>;
        meanings: Array<{
            /**
             * Karmic debt number
             */
            number: number;
            /**
             * Debt title and nature
             */
            description: string;
            /**
             * Detailed explanation of past life issue and current challenges
             */
            challenge: string;
            /**
             * Guidance for resolving karmic debt in this lifetime
             */
            resolution: string;
        }>;
        /**
         * Human-readable summary. Explains what the karmic debt findings mean or provides a positive affirmation when no debt is found.
         */
        message: string;
    };
};
export type CheckKarmicDebtResponse = CheckKarmicDebtResponses[keyof CheckKarmicDebtResponses];
export type CalculatePersonalDayData = {
    body?: {
        /**
         * Birth month (1-12)
         */
        month: number;
        /**
         * Birth day (1-31)
         */
        day: number;
        /**
         * Target date in YYYY-MM-DD format (defaults to today)
         */
        targetDate?: string;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/numerology/personal-day';
};
export type CalculatePersonalDayErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CalculatePersonalDayError = CalculatePersonalDayErrors[keyof CalculatePersonalDayErrors];
export type CalculatePersonalDayResponses = {
    /**
     * Successfully calculated Personal Day with forecast
     */
    200: {
        /**
         * Personal Day number (1-9). The most granular numerology cycle, revealing the energy and theme for this specific day based on your birth data.
         */
        personalDay: number;
        /**
         * Central theme for this Personal Day. A concise label capturing the dominant energy of the day.
         */
        theme: string;
        /**
         * Actionable daily guidance. Specific advice for how to work with the energy of this Personal Day.
         */
        guidance: string;
        /**
         * The calendar date this forecast applies to in YYYY-MM-DD format.
         */
        targetDate: string;
        /**
         * The parent Personal Month number this day falls within.
         */
        personalMonth: number;
        /**
         * Theme of the parent Personal Month, providing broader context for the daily forecast.
         */
        personalMonthTheme: string;
        /**
         * The parent Personal Year number this day falls within.
         */
        personalYear: number;
        /**
         * Theme of the parent Personal Year, providing the broadest cycle context.
         */
        personalYearTheme: string;
    };
};
export type CalculatePersonalDayResponse = CalculatePersonalDayResponses[keyof CalculatePersonalDayResponses];
export type CalculatePersonalMonthData = {
    body?: {
        /**
         * Birth month (1-12)
         */
        month: number;
        /**
         * Birth day (1-31)
         */
        day: number;
        /**
         * Target year for calculation (defaults to current year)
         */
        year?: number;
        /**
         * Target calendar month to forecast (1-12, defaults to current month)
         */
        targetMonth?: number;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/numerology/personal-month';
};
export type CalculatePersonalMonthErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CalculatePersonalMonthError = CalculatePersonalMonthErrors[keyof CalculatePersonalMonthErrors];
export type CalculatePersonalMonthResponses = {
    /**
     * Successfully calculated Personal Month with forecast
     */
    200: {
        /**
         * Personal Month number (1-9). Each month in the cycle carries specific energy and themes that guide decisions and focus.
         */
        personalMonth: number;
        /**
         * Central theme for this Personal Month. A concise label capturing the dominant energy.
         */
        theme: string;
        /**
         * Practical guidance for this month. Specific actions, areas of focus, and advice for making the most of this monthly energy.
         */
        focus: string;
        /**
         * The calendar month this forecast applies to (1-12).
         */
        calendarMonth: number;
        /**
         * The parent Personal Year number this month falls within.
         */
        personalYear: number;
        /**
         * Theme of the parent Personal Year, providing broader context for the monthly forecast.
         */
        personalYearTheme: string;
    };
};
export type CalculatePersonalMonthResponse = CalculatePersonalMonthResponses[keyof CalculatePersonalMonthResponses];
export type CalculatePersonalYearData = {
    body?: {
        /**
         * Birth month (1-12)
         */
        month: number;
        /**
         * Birth day (1-31)
         */
        day: number;
        /**
         * Year to calculate (defaults to current year)
         */
        year?: number;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/numerology/personal-year';
};
export type CalculatePersonalYearErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CalculatePersonalYearError = CalculatePersonalYearErrors[keyof CalculatePersonalYearErrors];
export type CalculatePersonalYearResponses = {
    /**
     * Successfully calculated Personal Year with forecast
     */
    200: {
        /**
         * Personal Year number (1-9)
         */
        personalYear: number;
        /**
         * Position in the 9-year cycle
         */
        cycle: string;
        /**
         * Main theme of the year
         */
        theme: string;
        /**
         * Detailed year forecast (200-300 words)
         */
        forecast: string;
        /**
         * Key opportunities in this year
         */
        opportunities: Array<string>;
        /**
         * Challenges to navigate
         */
        challenges: Array<string>;
        /**
         * Practical guidance for navigating the year
         */
        advice: string;
    };
};
export type CalculatePersonalYearResponse = CalculatePersonalYearResponses[keyof CalculatePersonalYearResponses];
export type CalculateNumCompatibilityData = {
    body?: {
        person1: {
            /**
             * Person 1 Life Path number (1-9, 11, 22, 33). Optional if year, month, day are provided.
             */
            lifePath?: number;
            /**
             * Person 1 Expression number (1-9, 11, 22, 33). Optional if fullName is provided.
             */
            expression?: number;
            /**
             * Person 1 Soul Urge number (1-9, 11, 22, 33). Optional if fullName is provided.
             */
            soulUrge?: number;
            /**
             * Full birth name to calculate Expression and Soul Urge numbers automatically. Use instead of passing expression and soulUrge directly.
             */
            fullName?: string;
            /**
             * Birth year to calculate Life Path automatically. Use with month and day instead of passing lifePath directly.
             */
            year?: number;
            /**
             * Birth month (1-12). Required with year and day for automatic Life Path calculation.
             */
            month?: number;
            /**
             * Birth day (1-31). Required with year and month for automatic Life Path calculation.
             */
            day?: number;
        };
        person2: {
            /**
             * Person 2 Life Path number (1-9, 11, 22, 33). Optional if year, month, day are provided.
             */
            lifePath?: number;
            /**
             * Person 2 Expression number (1-9, 11, 22, 33). Optional if fullName is provided.
             */
            expression?: number;
            /**
             * Person 2 Soul Urge number (1-9, 11, 22, 33). Optional if fullName is provided.
             */
            soulUrge?: number;
            /**
             * Full birth name to calculate Expression and Soul Urge numbers automatically. Use instead of passing expression and soulUrge directly.
             */
            fullName?: string;
            /**
             * Birth year to calculate Life Path automatically. Use with month and day instead of passing lifePath directly.
             */
            year?: number;
            /**
             * Birth month (1-12). Required with year and day for automatic Life Path calculation.
             */
            month?: number;
            /**
             * Birth day (1-31). Required with year and month for automatic Life Path calculation.
             */
            day?: number;
        };
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/numerology/compatibility';
};
export type CalculateNumCompatibilityErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CalculateNumCompatibilityError = CalculateNumCompatibilityErrors[keyof CalculateNumCompatibilityErrors];
export type CalculateNumCompatibilityResponses = {
    /**
     * Successfully calculated compatibility with detailed analysis
     */
    200: {
        /**
         * Overall compatibility score (0-100)
         */
        overallScore: number;
        /**
         * Compatibility rating: Highly Compatible, Very Compatible, Compatible, Moderately Compatible, or Challenging.
         */
        rating: string;
        lifePath: {
            /**
             * Person 1 Life Path number
             */
            person1: number;
            /**
             * Person 2 Life Path number
             */
            person2: number;
            /**
             * Life Path compatibility score (0-100)
             */
            compatibility: number;
            /**
             * Detailed Life Path compatibility analysis
             */
            description: string;
        };
        expression: {
            /**
             * Person 1 Expression number
             */
            person1: number;
            /**
             * Person 2 Expression number
             */
            person2: number;
            /**
             * Expression compatibility score (0-100)
             */
            compatibility: number;
            /**
             * Detailed Expression compatibility analysis
             */
            description: string;
        };
        soulUrge: {
            /**
             * Person 1 Soul Urge number
             */
            person1: number;
            /**
             * Person 2 Soul Urge number
             */
            person2: number;
            /**
             * Soul Urge compatibility score (0-100)
             */
            compatibility: number;
            /**
             * Detailed Soul Urge compatibility analysis
             */
            description: string;
        };
        /**
         * Key relationship strengths
         */
        strengths: Array<string>;
        /**
         * Potential relationship challenges
         */
        challenges: Array<string>;
        /**
         * Practical relationship advice
         */
        advice: string;
    };
};
export type CalculateNumCompatibilityResponse = CalculateNumCompatibilityResponses[keyof CalculateNumCompatibilityResponses];
export type GenerateNumerologyChartData = {
    body?: {
        /**
         * Full birth name as it appears on the birth certificate. Used for all letter-based Pythagorean numerology calculations including Expression, Soul Urge, Personality, and Karmic Lessons.
         */
        fullName: string;
        /**
         * Birth year between 100 and 2100. Supports historical figures like Einstein (1879) and Shakespeare (1564).
         */
        year: number;
        /**
         * Birth month (1-12)
         */
        month: number;
        /**
         * Birth day (1-31)
         */
        day: number;
        /**
         * Year for Personal Year calculation (defaults to current year)
         */
        currentYear?: number;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/numerology/chart';
};
export type GenerateNumerologyChartErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GenerateNumerologyChartError = GenerateNumerologyChartErrors[keyof GenerateNumerologyChartErrors];
export type GenerateNumerologyChartResponses = {
    /**
     * Successfully generated complete numerology chart
     */
    200: {
        /**
         * Input profile data used to generate the chart.
         */
        profile: {
            /**
             * Full birth name used for letter-based calculations (Expression, Soul Urge, Personality).
             */
            name: string;
            /**
             * Birth date in YYYY-MM-DD format.
             */
            birthdate: string;
        };
        /**
         * Six core numerology numbers with full interpretations. The foundation of any complete numerology reading.
         */
        coreNumbers: {
            /**
             * Life Path. The most significant core number, revealing life purpose and destiny path.
             */
            lifePath: {
                /**
                 * Life Path number (1-9, 11, 22, 33). The most important number in numerology, derived from birth date. Reveals life purpose and destiny.
                 */
                number: number;
                /**
                 * Step-by-step calculation showing how the Life Path number was derived from the birth date.
                 */
                calculation: string;
                /**
                 * Whether this is a single digit (1-9) or master number (11, 22, 33). Master numbers carry amplified spiritual significance.
                 */
                type: 'single' | 'master';
                /**
                 * True if the reduction passed through a karmic debt number (13, 14, 16, 19).
                 */
                hasKarmicDebt: boolean;
                /**
                 * The karmic debt number encountered during reduction, if any.
                 */
                karmicDebtNumber?: number;
                /**
                 * Complete interpretation of the Life Path number with archetype, traits, career guidance, relationship insights, and spiritual direction.
                 */
                meaning: {
                    /**
                     * Numerology archetype name for this Life Path number. A defining phrase that captures the core identity, such as "The Leader" for 1 or "The Humanitarian" for 9.
                     */
                    title: string;
                    /**
                     * Defining personality traits and energetic themes for this Life Path. Useful for compatibility matching, personality snapshots, and building numerology profile summaries.
                     */
                    keywords: Array<string>;
                    /**
                     * Authoritative 300 to 500 word interpretation covering personality, life purpose, and core themes. Written by numerology experts and suitable for full-page readings or PDF report generation.
                     */
                    description: string;
                    /**
                     * Core strengths and positive qualities. Each entry pairs a trait with a detailed explanation of how it manifests in everyday life and decision-making.
                     */
                    strengths: Array<string>;
                    /**
                     * Growth areas and shadow qualities to work through. Each entry explains the root cause, how it surfaces in behavior, and constructive strategies for personal development.
                     */
                    challenges: Array<string>;
                    /**
                     * Tailored career guidance covering ideal industries, roles, and work environments. Includes specific job titles and explains why certain professional paths resonate with this Life Path energy.
                     */
                    career: string;
                    /**
                     * Love, friendship, and family dynamics shaped by this Life Path. Covers romantic compatibility with other numbers, communication style, and the key relationship lessons for lasting partnerships.
                     */
                    relationships: string;
                    /**
                     * Spiritual path, soul lessons, and recommended practices. Explores the deeper purpose behind this Life Path number and guidance for personal growth and inner transformation.
                     */
                    spirituality: string;
                };
            };
            /**
             * Expression (Destiny) number. Reveals natural talents, abilities, and life goals derived from the full birth name.
             */
            expression: {
                /**
                 * Expression (Destiny) number derived from full birth name using Pythagorean numerology.
                 */
                number: number;
                /**
                 * Letter-to-number conversion showing how the Expression number was calculated.
                 */
                calculation: string;
                /**
                 * Single digit or master number.
                 */
                type: 'single' | 'master';
                /**
                 * Whether karmic debt was encountered during calculation.
                 */
                hasKarmicDebt: boolean;
                /**
                 * Karmic debt number if present.
                 */
                karmicDebtNumber?: number;
                /**
                 * Complete interpretation of the Expression number with archetype, talents, career paths, relationship dynamics, and spiritual expression.
                 */
                meaning: {
                    /**
                     * Numerology archetype for this Expression number. Reveals the natural talent blueprint, such as "The Communicator" for 3 or "The Master Builder" for 22.
                     */
                    title: string;
                    /**
                     * Natural talents and abilities encoded in the birth name. These define your innate skill set, creative potential, and the gifts available to you throughout life.
                     */
                    keywords: Array<string>;
                    /**
                     * Expert-written 300 to 500 word analysis of natural abilities, life goals, and the talents your birth name reveals. Suitable for detailed readings and personality assessments.
                     */
                    description: string;
                    /**
                     * Natural-born talents and creative gifts. Each strength describes a specific ability that comes effortlessly and how it contributes to personal and professional success.
                     */
                    strengths: Array<string>;
                    /**
                     * Growth areas where natural talent can become a liability without conscious balance. Explains how each challenge manifests and practical ways to work through it.
                     */
                    challenges: Array<string>;
                    /**
                     * Career paths where your Expression number talents create the greatest professional advantage. Covers specific industries, creative pursuits, and work styles aligned with your name vibration.
                     */
                    career: string;
                    /**
                     * How your Expression number shapes the way you communicate, connect, and express love. Covers partnership dynamics, social style, and the relationship patterns rooted in your name energy.
                     */
                    relationships: string;
                    /**
                     * The spiritual dimension of your natural gifts. Explores how your Expression number talents serve a higher purpose and the creative practices that deepen self-expression.
                     */
                    spirituality: string;
                };
            };
            /**
             * Soul Urge (Heart Desire) number. Reveals innermost desires, motivations, and what truly makes you happy. Calculated from vowels.
             */
            soulUrge: {
                /**
                 * Soul Urge (Heart Desire) number from vowels in birth name.
                 */
                number: number;
                /**
                 * Vowel extraction and reduction calculation.
                 */
                calculation: string;
                /**
                 * Single digit or master number.
                 */
                type: 'single' | 'master';
                /**
                 * Whether karmic debt was encountered.
                 */
                hasKarmicDebt: boolean;
                /**
                 * Karmic debt number if present.
                 */
                karmicDebtNumber?: number;
                /**
                 * Complete interpretation of the Soul Urge number with archetype, emotional drives, relationship needs, and spiritual direction.
                 */
                meaning: {
                    /**
                     * Numerology archetype for this Soul Urge number. Reveals the deepest inner motivation, such as "The Seeker" for 7 or "The Master Teacher" for 33.
                     */
                    title: string;
                    /**
                     * Core emotional drives and inner motivations. These define what truly fulfills you at the deepest level, beyond surface-level desires and social expectations.
                     */
                    keywords: Array<string>;
                    /**
                     * Expert-written 300 to 500 word exploration of the inner self, hidden desires, and emotional landscape. Reveals what the heart truly craves beneath the surface persona.
                     */
                    description: string;
                    /**
                     * Emotional superpowers and inner gifts. Each strength describes how it shapes decision-making, relationships, and the pursuit of personal fulfillment.
                     */
                    strengths: Array<string>;
                    /**
                     * Inner shadows and emotional patterns to balance. Explains how each challenge manifests when the Soul Urge energy is overextended or repressed.
                     */
                    challenges: Array<string>;
                    /**
                     * Career paths that satisfy your deepest emotional needs. Focuses on work that feeds the soul rather than just the resume, aligned with lasting inner fulfillment.
                     */
                    career: string;
                    /**
                     * How your Soul Urge shapes what you need from love, friendship, and family. Covers emotional compatibility, attachment style, and the key to feeling truly seen and understood.
                     */
                    relationships: string;
                    /**
                     * The spiritual hunger at your core. Explores what your soul is seeking in this lifetime and the contemplative practices that bring you closest to inner peace and alignment.
                     */
                    spirituality: string;
                };
            };
            /**
             * Personality number. The outer you, how the world perceives you. Calculated from consonants in the birth name.
             */
            personality: {
                /**
                 * Personality number from consonants in birth name.
                 */
                number: number;
                /**
                 * Consonant extraction and reduction calculation.
                 */
                calculation: string;
                /**
                 * Single digit or master number.
                 */
                type: 'single' | 'master';
                /**
                 * Whether karmic debt was encountered.
                 */
                hasKarmicDebt: boolean;
                /**
                 * Karmic debt number if present.
                 */
                karmicDebtNumber?: number;
                /**
                 * Complete interpretation of the Personality number with archetype, social traits, professional image, and first-impression dynamics.
                 */
                meaning: {
                    /**
                     * Numerology archetype for this Personality number. Represents the outer mask you show the world, such as "The Builder" for 4 or "The Powerhouse" for 8.
                     */
                    title: string;
                    /**
                     * Traits that define your public persona and first impression. These are the qualities others perceive before they get to know the real you.
                     */
                    keywords: Array<string>;
                    /**
                     * Expert-written 300 to 500 word analysis of the outer personality, social presence, and the image you project to the world. Reveals the gap between perception and inner truth.
                     */
                    description: string;
                    /**
                     * Your strongest social assets and public-facing gifts. These qualities shape how you are received in professional settings, social gatherings, and first meetings.
                     */
                    strengths: Array<string>;
                    /**
                     * Blind spots in your public persona. Patterns others notice that you may not, including defense mechanisms and image-management tendencies that can limit authentic connection.
                     */
                    challenges: Array<string>;
                    /**
                     * How your outward presence shapes professional opportunities. Covers the industries, roles, and environments where your public image creates the greatest advantage.
                     */
                    career: string;
                    /**
                     * First impressions in love and social dynamics. Explores how your Personality number attracts certain partners, sets relationship expectations, and influences group dynamics.
                     */
                    relationships: string;
                    /**
                     * The spiritual energy you radiate to others. Explores how your outer presence serves as a channel for deeper purpose and what your public path reveals about your soul mission.
                     */
                    spirituality: string;
                };
            };
            /**
             * Birth Day number. Reveals a special talent or gift based on the calendar day of birth.
             */
            birthDay: {
                /**
                 * Birth Day number (1-31). A special talent number based on the day of the month you were born.
                 */
                number: number;
                /**
                 * Step-by-step calculation showing how the Birth Day number was reduced from the calendar day of birth.
                 */
                calculation: string;
                /**
                 * Whether this is a single digit (1-9) or master number (11, 22). Birth days of 11 and 22 are preserved as master numbers.
                 */
                type: 'single' | 'master';
                /**
                 * True if the birth day is a karmic debt number (13, 14, 16, 19).
                 */
                hasKarmicDebt: boolean;
                /**
                 * The karmic debt number if the birth day carries one (13, 14, 16, or 19).
                 */
                karmicDebtNumber?: number;
                /**
                 * Complete interpretation of the Birth Day number with archetype, innate talents, career advantages, and relationship dynamics.
                 */
                meaning: {
                    /**
                     * Numerology archetype for this Birth Day number. Represents the specific talent or gift you brought into this life, like "The Nurturer" for 6 or "The Seeker" for 7.
                     */
                    title: string;
                    /**
                     * Innate talents and natural aptitudes encoded in your birth day. These gifts are available from birth and become more refined with age and experience.
                     */
                    keywords: Array<string>;
                    /**
                     * Expert-written 300 to 500 word reading of the special abilities your birth day bestows. Covers how these gifts complement your Life Path and Expression numbers.
                     */
                    description: string;
                    /**
                     * Natural-born strengths that come effortlessly. These are the talents you can rely on even without formal training or conscious development.
                     */
                    strengths: Array<string>;
                    /**
                     * The flip side of your gifts. Each challenge explains how an overreliance on natural talent can become a liability without conscious balance.
                     */
                    challenges: Array<string>;
                    /**
                     * Professional paths where your birth day talents create an immediate advantage. Covers specific roles, industries, and work styles aligned with your innate abilities.
                     */
                    career: string;
                    /**
                     * How your birth day gifts shape the way you connect with others. Covers romantic chemistry, friendship dynamics, and the relationship patterns rooted in your natural temperament.
                     */
                    relationships: string;
                    /**
                     * The spiritual dimension of your natural gifts. Explores how your birth day talents serve a higher purpose and the practices that help you channel them with intention.
                     */
                    spirituality: string;
                };
            };
            /**
             * Maturity number. The person you are becoming. Sum of Life Path and Expression, activates around age 35-40.
             */
            maturity: {
                /**
                 * Maturity number (Life Path + Expression). Becomes active around age 35-40.
                 */
                number: number;
                /**
                 * Shows Life Path + Expression reduction.
                 */
                calculation: string;
                /**
                 * Single digit or master number.
                 */
                type: 'single' | 'master';
                /**
                 * Whether karmic debt was encountered.
                 */
                hasKarmicDebt: boolean;
                /**
                 * Karmic debt number if present.
                 */
                karmicDebtNumber?: number;
                /**
                 * Complete interpretation of the Maturity number with archetype, emerging traits, career evolution, and spiritual awakening.
                 */
                meaning: {
                    /**
                     * Numerology archetype for the Maturity number. Reveals who you are becoming in the second half of life, such as "The Builder" for 4 or "The Humanitarian" for 9.
                     */
                    title: string;
                    /**
                     * Emerging traits and qualities that strengthen after age 35 to 40. These energies gradually integrate into your personality as you mature and gain life experience.
                     */
                    keywords: Array<string>;
                    /**
                     * Expert-written 300 to 500 word guide to the person you are evolving into. The Maturity number represents the wisdom gained through lived experience and reveals your ultimate destination.
                     */
                    description: string;
                    /**
                     * Late-blooming strengths that emerge with age and experience. These are the gifts that become your greatest assets in the second half of life.
                     */
                    strengths: Array<string>;
                    /**
                     * Growth areas to watch as Maturity energy intensifies. Understanding these early helps you navigate the transition into your mature self with awareness and grace.
                     */
                    challenges: Array<string>;
                    /**
                     * Career evolution and professional reinvention for the second act. Covers industries, roles, and pursuits that align with your mature energy and accumulated wisdom.
                     */
                    career: string;
                    /**
                     * How your relationships deepen and transform as Maturity energy takes hold. Covers evolving partnership needs, family dynamics, and the relationship wisdom that comes with age.
                     */
                    relationships: string;
                    /**
                     * Spiritual awakening in the mature years. Explores the deeper meaning that emerges when life experience meets the Maturity number and practices for this transformative phase.
                     */
                    spirituality: string;
                };
            };
        };
        /**
         * Additional numerology insights: karmic analysis, yearly/monthly forecasts, pinnacles, challenges, hidden passion, subconscious self, and name letter analysis.
         */
        additionalInsights: {
            /**
             * Karmic Lessons analysis. Identifies lessons the soul needs to learn based on missing numbers in the birth name.
             */
            karmicLessons: {
                /**
                 * Numbers (1-9) missing from the birth name. Each missing number represents a karmic lesson to learn in this lifetime.
                 */
                missingNumbers: Array<number>;
                /**
                 * Detailed karmic lessons for each missing number.
                 */
                lessons: Array<{
                    /**
                     * The missing number representing this karmic lesson.
                     */
                    number: number;
                    /**
                     * Karmic lesson title identifying the core quality or virtue this soul needs to develop in the current lifetime.
                     */
                    lesson: string;
                    /**
                     * What this missing number means for personal growth. Explains the life patterns, recurring situations, and soul-level work required to integrate this energy.
                     */
                    description: string;
                    /**
                     * Actionable guidance for mastering this karmic lesson. Includes specific behaviors, mindset shifts, and daily practices that build the missing quality over time.
                     */
                    howToOvercome: string;
                }>;
                /**
                 * Count of each number (1-9) present in the birth name. High counts indicate natural strengths.
                 */
                presentNumbers: {
                    [key: string]: number;
                };
            };
            /**
             * Karmic Debt analysis. Identifies unresolved karma from past lives carried through specific numbers (13, 14, 16, 19).
             */
            karmicDebt: {
                /**
                 * True if any core number reduces through a karmic debt number (13, 14, 16, 19).
                 */
                hasKarmicDebt: boolean;
                /**
                 * List of karmic debt numbers found (13=laziness, 14=abuse of freedom, 16=ego destruction, 19=selfishness).
                 */
                debtNumbers: Array<number>;
                /**
                 * Detailed meanings for each karmic debt number found.
                 */
                meanings: Array<{
                    /**
                     * Karmic debt number (13, 14, 16, or 19). Each represents a specific pattern of unresolved karma from past lives that demands conscious attention.
                     */
                    number: number;
                    /**
                     * What this karmic debt means for your current lifetime. Explains the past-life pattern, how it manifests today, and why certain struggles keep recurring.
                     */
                    description: string;
                    /**
                     * The central life challenge this debt creates. Identifies the repeating obstacle pattern and the emotional or behavioral trap to watch for.
                     */
                    challenge: string;
                    /**
                     * How to resolve and transcend this karmic debt. Provides the spiritual lesson, practical steps, and the transformative shift that breaks the cycle.
                     */
                    resolution: string;
                }>;
            };
            /**
             * Personal Year forecast with nested Personal Month. Yearly and monthly numerology cycles.
             */
            personalYear: {
                /**
                 * Personal Year number (1-9). Each year in the 9-year cycle has distinct themes and energies.
                 */
                personalYear: number;
                /**
                 * Position in the 9-year numerology cycle (e.g., "Year 5 of 9"). Each position carries distinct energy that shapes the entire year.
                 */
                cycle: string;
                /**
                 * Central theme and energy defining this Personal Year. Provides a one-line summary of the dominant vibration influencing all areas of life.
                 */
                theme: string;
                /**
                 * Detailed yearly forecast covering what to expect across career, relationships, health, and personal development. Provides month-by-month energy shifts and key turning points.
                 */
                forecast: string;
                /**
                 * Key opportunities available during this Personal Year. Each entry identifies a specific area of life where conditions are favorable for growth and forward momentum.
                 */
                opportunities: Array<string>;
                /**
                 * Potential challenges to navigate during this cycle. Each entry identifies a recurring theme or obstacle and how to work with the energy rather than against it.
                 */
                challenges: Array<string>;
                /**
                 * Strategic guidance for making the most of this Personal Year. Covers timing decisions, areas to focus on, and the mindset that aligns with the current numerological energy.
                 */
                advice: string;
                /**
                 * Personal Month forecast nested within the Personal Year cycle.
                 */
                personalMonth: {
                    /**
                     * Personal Month number (1-9).
                     */
                    personalMonth: number;
                    /**
                     * Central theme for this Personal Month.
                     */
                    theme: string;
                    /**
                     * Practical focus and guidance for this month.
                     */
                    focus: string;
                };
            };
            /**
             * Four Pinnacle numbers representing major life phases with age ranges and meanings.
             */
            pinnacles: Array<{
                /**
                 * Pinnacle position (1-4). Four major life phases.
                 */
                position: number;
                /**
                 * Pinnacle number (1-9, 11, 22, 33). Defines the theme of this life phase.
                 */
                number: number;
                /**
                 * Age when this Pinnacle phase begins.
                 */
                startAge: number;
                /**
                 * Age when this phase ends. Null for the 4th Pinnacle (lasts rest of life).
                 */
                endAge: number;
                /**
                 * Meaning and interpretation for this Pinnacle number.
                 */
                meaning: {
                    /**
                     * Pinnacle phase title.
                     */
                    title: string;
                    /**
                     * What this Pinnacle phase brings to your life.
                     */
                    description: string;
                    /**
                     * Key opportunities during this phase.
                     */
                    opportunities: Array<string>;
                    /**
                     * Challenges to navigate during this phase.
                     */
                    challenges: Array<string>;
                };
            }>;
            /**
             * Four Challenge numbers representing life obstacles aligned with Pinnacle timing.
             */
            challenges: Array<{
                /**
                 * Challenge position (1-4). Four life obstacle periods.
                 */
                position: number;
                /**
                 * Challenge number (0-8). Defines the obstacle of this period.
                 */
                number: number;
                /**
                 * Age when this Challenge period begins.
                 */
                startAge: number;
                /**
                 * Age when this period ends. Null for the 4th Challenge.
                 */
                endAge: number;
                /**
                 * Meaning and resolution guidance for this Challenge number.
                 */
                meaning: {
                    /**
                     * Challenge title.
                     */
                    title: string;
                    /**
                     * What this Challenge demands you overcome.
                     */
                    description: string;
                    /**
                     * Core lesson to learn during this period.
                     */
                    lesson: string;
                    /**
                     * Actionable guidance for working through this Challenge.
                     */
                    howToOvercome: string;
                };
            }>;
            /**
             * Hidden Passion number. The most frequent number in the name revealing an overwhelming drive or talent.
             */
            hiddenPassion: {
                /**
                 * Hidden Passion number (1-9). The most frequently occurring number in the birth name.
                 */
                number: number;
                /**
                 * How many times this number appears in the name.
                 */
                count: number;
                /**
                 * All numbers tied for highest frequency (usually one, sometimes multiple).
                 */
                allPassions: Array<number>;
                /**
                 * Archetype title for this Hidden Passion.
                 */
                title: string;
                /**
                 * What this dominant number drive reveals about latent talents and obsessions.
                 */
                description: string;
            };
            /**
             * Subconscious Self number. Reveals inner confidence and emergency response style.
             */
            subconsciousSelf: {
                /**
                 * Subconscious Self number (1-9). Count of unique numbers present in the name.
                 */
                number: number;
                /**
                 * Which numbers (1-9) are present in the birth name.
                 */
                uniqueNumbers: Array<number>;
                /**
                 * Archetype title for this Subconscious Self level.
                 */
                title: string;
                /**
                 * How you handle emergencies and unexpected challenges based on the breadth of numbers in your name.
                 */
                description: string;
            };
            /**
             * Name letter analysis: Cornerstone, Capstone, and First Vowel.
             */
            nameLetters: {
                /**
                 * Cornerstone letter analysis. Reveals approach to new situations.
                 */
                cornerstone: {
                    /**
                     * First letter of the first name.
                     */
                    letter: string;
                    /**
                     * Pythagorean number value of the Cornerstone letter.
                     */
                    number: number;
                    /**
                     * How you approach new situations and initiate action.
                     */
                    meaning: string;
                };
                /**
                 * Capstone letter analysis. Reveals completion and follow-through style.
                 */
                capstone: {
                    /**
                     * Last letter of the first name.
                     */
                    letter: string;
                    /**
                     * Pythagorean number value of the Capstone letter.
                     */
                    number: number;
                    /**
                     * How you complete tasks and handle endings.
                     */
                    meaning: string;
                };
                /**
                 * First Vowel analysis. Reveals instinctive emotional reactions.
                 */
                firstVowel: {
                    /**
                     * First vowel in the full name (A, E, I, O, or U).
                     */
                    letter: string;
                    /**
                     * Instinctive emotional response and inner reaction style.
                     */
                    meaning: string;
                };
            };
        };
        /**
         * Birth Day profile with day-specific meaning (1-31). Unlike the core Birth Day number, this provides unique interpretation per calendar day.
         */
        birthDayProfile?: {
            /**
             * Calendar day of birth (1-31).
             */
            day: number;
            /**
             * Single digit or master number this day reduces to.
             */
            reducesTo: number;
            /**
             * Unique archetype title for this specific birth day.
             */
            title: string;
            /**
             * Personality traits specific to this birth day.
             */
            keywords: Array<string>;
            /**
             * Detailed personality profile unique to this calendar day, not just the reduced digit.
             */
            description: string;
            /**
             * Strengths specific to this birth day.
             */
            strengths: Array<string>;
            /**
             * Challenges specific to this birth day.
             */
            challenges: Array<string>;
            /**
             * Career guidance for this specific birth day.
             */
            career: string;
            /**
             * Relationship dynamics for this birth day.
             */
            relationships: string;
        };
        /**
         * Maturity number activation status based on current age.
         */
        maturityStatus: {
            /**
             * Whether the Maturity number is currently active (typically activates around age 35-40).
             */
            isActive: boolean;
            /**
             * Current age calculated from the birth year.
             */
            currentAge: number;
            /**
             * Age range when the Maturity number typically activates (35-40).
             */
            activationRange: string;
        };
        /**
         * Lucky associations based on Life Path number: colors, gemstones, day, element, planet, and compatibility.
         */
        luckyAssociations?: {
            /**
             * Lucky colors associated with the Life Path number.
             */
            colors: Array<string>;
            /**
             * Lucky gemstones aligned to the ruling planet.
             */
            gemstones: Array<string>;
            /**
             * Lucky day of the week.
             */
            day: string;
            /**
             * Classical element (Fire, Water, Earth, Air).
             */
            element: string;
            /**
             * Ruling planet for this Life Path number.
             */
            rulingPlanet: string;
            /**
             * Most compatible Life Path numbers.
             */
            compatibleNumbers: Array<number>;
            /**
             * Least compatible Life Path numbers.
             */
            incompatibleNumbers: Array<number>;
        };
        /**
         * AI-ready holistic summary weaving all core numbers, karmic insights, and yearly forecast into a cohesive narrative. Ideal for generating personalized reports, chatbot responses, or one-page numerology overviews.
         */
        summary: string;
    };
};
export type GenerateNumerologyChartResponse = GenerateNumerologyChartResponses[keyof GenerateNumerologyChartResponses];
export type GetNumberMeaningData = {
    body?: never;
    path: {
        /**
         * Numerology number (1-9, 11, 22, 33)
         */
        number: string;
    };
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/numerology/meanings/{number}';
};
export type GetNumberMeaningErrors = {
    /**
     * Invalid number (must be 1-9, 11, 22, or 33)
     */
    400: {
        /**
         * Human-readable error message. May change wording — do not parse programmatically.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier for programmatic error handling.
         */
        code: string;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Number meaning not found
     */
    404: {
        /**
         * Human-readable error message. May change wording — do not parse programmatically.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier for programmatic error handling.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetNumberMeaningError = GetNumberMeaningErrors[keyof GetNumberMeaningErrors];
export type GetNumberMeaningResponses = {
    /**
     * Successfully retrieved number meaning
     */
    200: {
        /**
         * Requested number
         */
        number: number;
        /**
         * Number type
         */
        type: 'single' | 'master';
        meaning: {
            /**
             * Numerology archetype name. A single phrase capturing the core identity of this number, such as "The Leader" for 1 or "The Master Builder" for 22.
             */
            title: string;
            /**
             * Ten defining personality traits and energetic themes. Useful for personality snapshots, compatibility matching, and building numerology profile summaries.
             */
            keywords: Array<string>;
            /**
             * Authoritative 300 to 500 word interpretation covering personality, life purpose, and core themes. Written by numerology experts and suitable for full-page readings.
             */
            description: string;
            /**
             * Core strengths and positive qualities. Each entry pairs a trait name with a detailed explanation of how it manifests in real life.
             */
            strengths: Array<string>;
            /**
             * Growth areas and shadow qualities. Each entry explains the root cause, how it surfaces, and constructive strategies for working through it.
             */
            challenges: Array<string>;
            /**
             * Tailored career guidance with specific job titles, industries, and work environments. Explains why certain professional paths resonate with this number.
             */
            career: string;
            /**
             * Love, friendship, and family dynamics. Covers romantic compatibility with other numbers, communication style, and the key relationship lessons.
             */
            relationships: string;
            /**
             * Spiritual path, soul lessons, and recommended practices. Explores the deeper purpose behind this number and guidance for personal growth.
             */
            spirituality: string;
        };
    };
};
export type GetNumberMeaningResponse = GetNumberMeaningResponses[keyof GetNumberMeaningResponses];
export type GetDailyNumberData = {
    body?: {
        /**
         * Optional seed for reproducible readings. Same seed + same date = same number every time. Pass any unique identifier (userId, email hash, session token). Omit for anonymous daily readings.
         */
        seed?: string;
        /**
         * Date for the reading in YYYY-MM-DD format. Defaults to today (UTC). Useful for viewing past daily readings or pre-generating future ones.
         */
        date?: string;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/numerology/daily';
};
export type GetDailyNumberErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetDailyNumberError = GetDailyNumberErrors[keyof GetDailyNumberErrors];
export type GetDailyNumberResponses = {
    /**
     * Daily numerology number with full interpretation
     */
    200: {
        /**
         * Date this daily number is for (YYYY-MM-DD, UTC).
         */
        date: string;
        /**
         * Computed seed used for this reading. Same seed always produces the same number.
         */
        seed: string;
        /**
         * Daily numerology number (1-9, 11, 22, 33). Represents the dominant energy and theme for this day.
         */
        number: number;
        /**
         * Whether this is a single-digit number (1-9) or a Master Number (11, 22, 33). Master Number days carry amplified spiritual significance.
         */
        type: 'single' | 'master';
        /**
         * Concise daily guidance message combining the number archetype with practical advice for the day.
         */
        dailyMessage: string;
        meaning: {
            /**
             * Numerology archetype for this number. Captures the core energy of the day in a single phrase.
             */
            title: string;
            /**
             * Defining traits and energetic themes active today. Useful for daily affirmations, journaling prompts, and focus areas.
             */
            keywords: Array<string>;
            /**
             * Expert-written 300 to 500 word interpretation of the daily energy. Covers personality resonance, life themes, and how this number influences the day.
             */
            description: string;
            /**
             * Qualities that are amplified and accessible today. Lean into these for maximum alignment with the daily energy.
             */
            strengths: Array<string>;
            /**
             * Shadow patterns to watch for today. Awareness of these helps navigate the day with intention and balance.
             */
            challenges: Array<string>;
            /**
             * Professional guidance tuned to the daily energy. Suggests optimal work strategies, meeting approaches, and productivity focus areas.
             */
            career: string;
            /**
             * Relationship dynamics influenced by the daily number. Covers communication style, social energy, and partnership awareness for the day.
             */
            relationships: string;
            /**
             * Spiritual theme of the day. Suggests meditation focus, contemplative practices, and the deeper lesson available today.
             */
            spirituality: string;
        };
    };
};
export type GetDailyNumberResponse = GetDailyNumberResponses[keyof GetDailyNumberResponses];
export type ListCardsData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
        /**
         * Maximum items to return per page. Range: 1-100, default 20.
         */
        limit?: number;
        /**
         * Number of items to skip for pagination. Default 0.
         */
        offset?: number;
        /**
         * Filter by arcana type. Major arcana (0-21) represents life lessons and spiritual themes. Minor arcana (Ace-King in 4 suits) represents daily situations and practical matters.
         */
        arcana?: 'major' | 'minor';
        /**
         * Filter minor arcana by suit. Cups=emotions/relationships, Wands=creativity/passion, Swords=intellect/conflict, Pentacles=material/finances. Only applies to minor arcana cards.
         */
        suit?: 'cups' | 'wands' | 'swords' | 'pentacles';
        /**
         * Filter by card number. Major Arcana: 0 (The Fool) through 21 (The World). Minor Arcana: 1 (Ace) through 14 (King). Combine with arcana or suit filters for precise results.
         */
        number?: number;
    };
    url: '/tarot/cards';
};
export type ListCardsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type ListCardsError = ListCardsErrors[keyof ListCardsErrors];
export type ListCardsResponses = {
    /**
     * List of tarot cards with basic information. Use GET /cards/:id for full details.
     */
    200: {
        /**
         * Total number of tarot cards matching the applied filters. 78 for the full deck, 22 for Major Arcana, 56 for Minor Arcana, 14 per suit.
         */
        total: number;
        /**
         * Maximum items returned per page.
         */
        limit: number;
        /**
         * Number of items skipped from the start of the result set.
         */
        offset: number;
        /**
         * Array of tarot cards with basic metadata. Use GET /cards/:id for full upright and reversed interpretations.
         */
        cards: Array<BasicCard>;
    };
};
export type ListCardsResponse = ListCardsResponses[keyof ListCardsResponses];
export type GetCardData = {
    body?: never;
    path: {
        /**
         * Unique card identifier in kebab-case. Major arcana: "fool", "magician", "death", etc. Minor arcana: "ace-of-cups", "seven-of-wands", "queen-of-swords", "king-of-pentacles", etc.
         */
        id: string;
    };
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/tarot/cards/{id}';
};
export type GetCardErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Card not found
     */
    404: {
        /**
         * Human-readable error message. May change wording — do not parse programmatically.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier for programmatic error handling.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetCardError = GetCardErrors[keyof GetCardErrors];
export type GetCardResponses = {
    /**
     * Card details
     */
    200: Card;
};
export type GetCardResponse = GetCardResponses[keyof GetCardResponses];
export type DrawCardsData = {
    body: {
        /**
         * Number of cards to draw (1-78). Common values: 1 for daily card, 3 for past-present-future, 5 for relationship spread, 10 for Celtic Cross. Drawing 78 returns the entire shuffled deck.
         */
        count: number;
        /**
         * Optional seed for reproducible results. Same seed = same cards in same order. Use format like "userId-date" for daily consistency, or "readingId" for shareable readings. Omit for true randomness.
         */
        seed?: string;
        /**
         * Whether cards can appear reversed (upside down). Reversed cards have different meanings. Set false for upright-only readings. Default: true (50% chance of reversal per card).
         */
        allowReversals?: boolean;
        /**
         * Whether same card can be drawn multiple times. Set false for traditional deck behavior (each card drawn only once). Set true for statistical analysis or oracle-style readings. Default: false.
         */
        allowDuplicates?: boolean;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/tarot/draw';
};
export type DrawCardsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type DrawCardsError = DrawCardsErrors[keyof DrawCardsErrors];
export type DrawCardsResponses = {
    /**
     * Drawn cards
     */
    200: {
        /**
         * Seed used for this reading, if one was provided. Same seed reproduces identical draw results for consistent tarot readings.
         */
        seed?: string;
        /**
         * Array of drawn tarot cards in draw order, each with orientation, keywords, and full meaning for divination.
         */
        cards: Array<DrawnCard>;
    };
};
export type DrawCardsResponse = DrawCardsResponses[keyof DrawCardsResponses];
export type GetDailyCardData = {
    body?: {
        /**
         * Optional seed for reproducible readings. Same seed + same date = same card every time. Pass any unique identifier (userId, email hash, session token). Omit for anonymous daily readings.
         */
        seed?: string;
        /**
         * Date for the reading in YYYY-MM-DD format. Defaults to today (UTC). Useful for viewing past daily readings or pre-generating future ones.
         */
        date?: string;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/tarot/daily';
};
export type GetDailyCardErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Failed to draw card
     */
    500: {
        /**
         * Human-readable error message. May change wording — do not parse programmatically.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier for programmatic error handling.
         */
        code: string;
    };
};
export type GetDailyCardError = GetDailyCardErrors[keyof GetDailyCardErrors];
export type GetDailyCardResponses = {
    /**
     * Daily card reading
     */
    200: {
        /**
         * Date of the daily tarot reading in YYYY-MM-DD format (UTC). Determines which card is drawn for seeded readings.
         */
        date: string;
        /**
         * Seed used for this daily reading. Same seed on the same date always produces the identical card for reproducible daily divination.
         */
        seed: string;
        card: {
            /**
             * Unique card identifier in kebab-case (e.g. the-fool, ace-of-cups).
             */
            id: string;
            /**
             * Display name of the tarot card.
             */
            name: string;
            /**
             * Whether this card belongs to the Major Arcana (22 trump cards, major life themes) or Minor Arcana (56 suit cards, daily situations).
             */
            arcana: 'major' | 'minor';
            /**
             * Position index of the card in the draw sequence (1-based).
             */
            position: number;
            /**
             * True if the card was drawn reversed (upside down). Reversed cards carry modified or blocked energy compared to upright position.
             */
            reversed: boolean;
            /**
             * Key themes and concepts associated with this card in its current orientation (upright or reversed).
             */
            keywords: Array<string>;
            /**
             * Full interpretation of this card in its current orientation, providing daily guidance and reflection.
             */
            meaning: string;
            /**
             * URL to the tarot card artwork image.
             */
            imageUrl: string;
        };
        /**
         * Concise daily tarot message summarizing the card, its orientation, key themes, and brief guidance for the day.
         */
        dailyMessage: string;
    };
};
export type GetDailyCardResponse = GetDailyCardResponses[keyof GetDailyCardResponses];
export type CastYesNoData = {
    body: {
        /**
         * Your specific yes/no question. Be clear and focused. Good: "Should I move to a new city?" Bad: "What should I do about my life?" The more specific the question, the more useful the tarot guidance.
         */
        question?: string;
        /**
         * Optional seed for reproducible results. Same seed + same question = same answer. Useful for testing, sharing readings, or ensuring consistency. Omit for random draws each time.
         */
        seed?: string;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/tarot/yes-no';
};
export type CastYesNoErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Failed to draw card
     */
    500: {
        /**
         * Human-readable error message. May change wording — do not parse programmatically.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier for programmatic error handling.
         */
        code: string;
    };
};
export type CastYesNoError = CastYesNoErrors[keyof CastYesNoErrors];
export type CastYesNoResponses = {
    /**
     * Yes/No answer with interpretation
     */
    200: {
        /**
         * The querent question that was asked, if one was provided.
         */
        question?: string;
        /**
         * Tarot-derived answer. Yes = upright card supports a positive outcome. No = reversed card suggests obstacles. Maybe = inherently ambiguous card drawn (The Hanged Man, Wheel of Fortune, Temperance, Two of Swords, Four of Swords) signaling pause, reflection, or shifting circumstances.
         */
        answer: 'Yes' | 'No' | 'Maybe';
        /**
         * Confidence level of the answer. Strong = Major Arcana card drawn (powerful, definitive cosmic energy). Qualified = Minor Arcana card drawn (nuanced, situational guidance).
         */
        strength: 'Strong' | 'Qualified';
        card: {
            /**
             * Unique card identifier in kebab-case (e.g. the-fool, ace-of-cups).
             */
            id: string;
            /**
             * Display name of the tarot card.
             */
            name: string;
            /**
             * Whether this card belongs to the Major Arcana (22 trump cards, major life themes) or Minor Arcana (56 suit cards, daily situations).
             */
            arcana: 'major' | 'minor';
            /**
             * True if the card was drawn reversed (upside down). Reversed cards carry modified or blocked energy compared to upright position.
             */
            reversed: boolean;
            /**
             * Key themes and concepts associated with this card in its current orientation (upright or reversed).
             */
            keywords: Array<string>;
            /**
             * URL to the tarot card artwork image.
             */
            imageUrl: string;
        };
        /**
         * Contextual narrative explaining why this card answers the question with this result. Connects card meaning, orientation, and arcana strength into actionable guidance.
         */
        interpretation: string;
    };
};
export type CastYesNoResponse = CastYesNoResponses[keyof CastYesNoResponses];
export type CastThreeCardData = {
    body: {
        /**
         * Optional specific question to focus the reading. Examples: "What should I know about my relationship?", "How can I improve my finances?", "What is blocking my creative growth?" Leave empty for general guidance.
         */
        question?: string;
        /**
         * Optional seed for reproducible results. Same seed = same 3 cards in same positions. Useful for sharing readings, testing, or ensuring users get consistent results. Omit for random draws.
         */
        seed?: string;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/tarot/spreads/three-card';
};
export type CastThreeCardErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CastThreeCardError = CastThreeCardErrors[keyof CastThreeCardErrors];
export type CastThreeCardResponses = {
    /**
     * Three-card spread reading
     */
    200: {
        /**
         * Name of the tarot spread used (e.g. Three-Card, Celtic Cross, Career, Love).
         */
        spread: string;
        /**
         * The querent question, if one was provided.
         */
        question?: string;
        /**
         * Seed used for this reading, if one was provided. Same seed reproduces identical results.
         */
        seed?: string;
        /**
         * Array of spread positions, each containing a drawn card with position-specific tarot interpretation.
         */
        positions: Array<{
            /**
             * Position number in the spread layout (1-based).
             */
            position: number;
            /**
             * Position name describing what this card reveals (e.g. Past, Present, Future, Challenge).
             */
            name: string;
            /**
             * Position-specific interpretation of the drawn card, explaining how this card meaning applies to this particular spread position.
             */
            interpretation: string;
            card: {
                /**
                 * Unique card identifier in kebab-case (e.g. the-fool, ace-of-cups).
                 */
                id: string;
                /**
                 * Display name of the tarot card.
                 */
                name: string;
                /**
                 * Whether this card belongs to the Major Arcana (22 trump cards, major life themes) or Minor Arcana (56 suit cards, daily situations).
                 */
                arcana: 'major' | 'minor';
                /**
                 * True if the card was drawn reversed (upside down). Reversed cards carry modified or blocked energy compared to upright position.
                 */
                reversed: boolean;
                /**
                 * Key themes and concepts associated with this card in its current orientation (upright or reversed).
                 */
                keywords: Array<string>;
                /**
                 * Full interpretation of this card in its current orientation.
                 */
                meaning: string;
                /**
                 * URL to the tarot card artwork image.
                 */
                imageUrl: string;
            };
        }>;
        /**
         * AI-generated narrative connecting all cards in the spread into a cohesive reading.
         */
        summary?: string;
    };
};
export type CastThreeCardResponse = CastThreeCardResponses[keyof CastThreeCardResponses];
export type CastCelticCrossData = {
    body: {
        question?: string;
        seed?: string;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/tarot/spreads/celtic-cross';
};
export type CastCelticCrossErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CastCelticCrossError = CastCelticCrossErrors[keyof CastCelticCrossErrors];
export type CastCelticCrossResponses = {
    /**
     * Celtic Cross spread reading
     */
    200: {
        /**
         * Name of the tarot spread used (e.g. Three-Card, Celtic Cross, Career, Love).
         */
        spread: string;
        /**
         * The querent question, if one was provided.
         */
        question?: string;
        /**
         * Seed used for this reading, if one was provided. Same seed reproduces identical results.
         */
        seed?: string;
        /**
         * Array of 10 spread positions forming the complete Celtic Cross layout, each with a drawn card and position-specific interpretation.
         */
        positions: Array<{
            /**
             * Position number in the spread layout (1-based).
             */
            position: number;
            /**
             * Position name describing what this card reveals (e.g. Past, Present, Future, Challenge).
             */
            name: string;
            /**
             * Position-specific interpretation of the drawn card, explaining how this card meaning applies to this particular spread position.
             */
            interpretation: string;
            card: {
                /**
                 * Unique card identifier in kebab-case (e.g. the-fool, ace-of-cups).
                 */
                id: string;
                /**
                 * Display name of the tarot card.
                 */
                name: string;
                /**
                 * Whether this card belongs to the Major Arcana (22 trump cards, major life themes) or Minor Arcana (56 suit cards, daily situations).
                 */
                arcana: 'major' | 'minor';
                /**
                 * True if the card was drawn reversed (upside down). Reversed cards carry modified or blocked energy compared to upright position.
                 */
                reversed: boolean;
                /**
                 * Key themes and concepts associated with this card in its current orientation (upright or reversed).
                 */
                keywords: Array<string>;
                /**
                 * Full interpretation of this card in its current orientation.
                 */
                meaning: string;
                /**
                 * URL to the tarot card artwork image.
                 */
                imageUrl: string;
            };
        }>;
        /**
         * AI-generated narrative connecting all cards in the spread into a cohesive reading.
         */
        summary?: string;
    };
};
export type CastCelticCrossResponse = CastCelticCrossResponses[keyof CastCelticCrossResponses];
export type CastLoveSpreadData = {
    body: {
        question?: string;
        seed?: string;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/tarot/spreads/love';
};
export type CastLoveSpreadErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CastLoveSpreadError = CastLoveSpreadErrors[keyof CastLoveSpreadErrors];
export type CastLoveSpreadResponses = {
    /**
     * Love spread reading
     */
    200: {
        /**
         * Name of the tarot spread used (e.g. Three-Card, Celtic Cross, Career, Love).
         */
        spread: string;
        /**
         * The querent question, if one was provided.
         */
        question?: string;
        /**
         * Seed used for this reading, if one was provided. Same seed reproduces identical results.
         */
        seed?: string;
        /**
         * Array of 5 love spread positions exploring relationship dynamics, each with a drawn card and position-specific interpretation.
         */
        positions: Array<{
            /**
             * Position number in the spread layout (1-based).
             */
            position: number;
            /**
             * Position name describing what this card reveals (e.g. Past, Present, Future, Challenge).
             */
            name: string;
            /**
             * Position-specific interpretation of the drawn card, explaining how this card meaning applies to this particular spread position.
             */
            interpretation: string;
            card: {
                /**
                 * Unique card identifier in kebab-case (e.g. the-fool, ace-of-cups).
                 */
                id: string;
                /**
                 * Display name of the tarot card.
                 */
                name: string;
                /**
                 * Whether this card belongs to the Major Arcana (22 trump cards, major life themes) or Minor Arcana (56 suit cards, daily situations).
                 */
                arcana: 'major' | 'minor';
                /**
                 * True if the card was drawn reversed (upside down). Reversed cards carry modified or blocked energy compared to upright position.
                 */
                reversed: boolean;
                /**
                 * Key themes and concepts associated with this card in its current orientation (upright or reversed).
                 */
                keywords: Array<string>;
                /**
                 * Full interpretation of this card in its current orientation.
                 */
                meaning: string;
                /**
                 * URL to the tarot card artwork image.
                 */
                imageUrl: string;
            };
        }>;
        /**
         * AI-generated narrative connecting all cards in the spread into a cohesive reading.
         */
        summary?: string;
    };
};
export type CastLoveSpreadResponse = CastLoveSpreadResponses[keyof CastLoveSpreadResponses];
export type CastCareerSpreadData = {
    body: {
        question?: string;
        seed?: string;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/tarot/spreads/career';
};
export type CastCareerSpreadErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CastCareerSpreadError = CastCareerSpreadErrors[keyof CastCareerSpreadErrors];
export type CastCareerSpreadResponses = {
    /**
     * Career spread reading
     */
    200: {
        /**
         * Name of the tarot spread used (e.g. Three-Card, Celtic Cross, Career, Love).
         */
        spread: string;
        /**
         * The querent question, if one was provided.
         */
        question?: string;
        /**
         * Seed used for this reading, if one was provided. Same seed reproduces identical results.
         */
        seed?: string;
        /**
         * Array of 7 career spread positions using SWOT framework, each with a drawn card and position-specific interpretation.
         */
        positions: Array<{
            /**
             * Position number in the spread layout (1-based).
             */
            position: number;
            /**
             * Position name describing what this card reveals (e.g. Past, Present, Future, Challenge).
             */
            name: string;
            /**
             * Position-specific interpretation of the drawn card, explaining how this card meaning applies to this particular spread position.
             */
            interpretation: string;
            card: {
                /**
                 * Unique card identifier in kebab-case (e.g. the-fool, ace-of-cups).
                 */
                id: string;
                /**
                 * Display name of the tarot card.
                 */
                name: string;
                /**
                 * Whether this card belongs to the Major Arcana (22 trump cards, major life themes) or Minor Arcana (56 suit cards, daily situations).
                 */
                arcana: 'major' | 'minor';
                /**
                 * True if the card was drawn reversed (upside down). Reversed cards carry modified or blocked energy compared to upright position.
                 */
                reversed: boolean;
                /**
                 * Key themes and concepts associated with this card in its current orientation (upright or reversed).
                 */
                keywords: Array<string>;
                /**
                 * Full interpretation of this card in its current orientation.
                 */
                meaning: string;
                /**
                 * URL to the tarot card artwork image.
                 */
                imageUrl: string;
            };
        }>;
        /**
         * AI-generated narrative connecting all cards in the spread into a cohesive reading.
         */
        summary?: string;
    };
};
export type CastCareerSpreadResponse = CastCareerSpreadResponses[keyof CastCareerSpreadResponses];
export type CastCustomSpreadData = {
    body: {
        /**
         * Optional name for your custom tarot spread layout. Used as the spread identifier in the response.
         */
        spreadName?: string;
        /**
         * Array of 1-10 custom position definitions for your tarot spread. Each position gets one drawn card with a position-specific interpretation.
         */
        positions: Array<{
            /**
             * Name for this position in the spread (e.g. Core Issue, Hidden Factor, Best Action). Defines what aspect of the reading this card represents.
             */
            name: string;
            /**
             * Description of what this position reveals in the reading. Guides the tarot interpretation for the card drawn in this slot.
             */
            interpretation: string;
        }>;
        /**
         * Optional querent question to focus the custom tarot reading. Provides context for position-specific interpretations.
         */
        question?: string;
        /**
         * Optional seed for reproducible results. Same seed with the same positions produces identical card draws for consistent divination.
         */
        seed?: string;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/tarot/spreads/custom';
};
export type CastCustomSpreadErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CastCustomSpreadError = CastCustomSpreadErrors[keyof CastCustomSpreadErrors];
export type CastCustomSpreadResponses = {
    /**
     * Custom spread reading
     */
    200: {
        /**
         * Name of the tarot spread used (e.g. Three-Card, Celtic Cross, Career, Love).
         */
        spread: string;
        /**
         * The querent question, if one was provided.
         */
        question?: string;
        /**
         * Seed used for this reading, if one was provided. Same seed reproduces identical results.
         */
        seed?: string;
        /**
         * Array of custom spread positions matching your defined layout, each with a drawn card and position-specific interpretation.
         */
        positions: Array<{
            /**
             * Position number in the spread layout (1-based).
             */
            position: number;
            /**
             * Position name describing what this card reveals (e.g. Past, Present, Future, Challenge).
             */
            name: string;
            /**
             * Position-specific interpretation of the drawn card, explaining how this card meaning applies to this particular spread position.
             */
            interpretation: string;
            card: {
                /**
                 * Unique card identifier in kebab-case (e.g. the-fool, ace-of-cups).
                 */
                id: string;
                /**
                 * Display name of the tarot card.
                 */
                name: string;
                /**
                 * Whether this card belongs to the Major Arcana (22 trump cards, major life themes) or Minor Arcana (56 suit cards, daily situations).
                 */
                arcana: 'major' | 'minor';
                /**
                 * True if the card was drawn reversed (upside down). Reversed cards carry modified or blocked energy compared to upright position.
                 */
                reversed: boolean;
                /**
                 * Key themes and concepts associated with this card in its current orientation (upright or reversed).
                 */
                keywords: Array<string>;
                /**
                 * Full interpretation of this card in its current orientation.
                 */
                meaning: string;
                /**
                 * URL to the tarot card artwork image.
                 */
                imageUrl: string;
            };
        }>;
        /**
         * AI-generated narrative connecting all cards in the spread into a cohesive reading.
         */
        summary?: string;
    };
};
export type CastCustomSpreadResponse = CastCustomSpreadResponses[keyof CastCustomSpreadResponses];
export type GetReadingData = {
    body?: {
        /**
         * Birth date of the person in YYYY-MM-DD format. This is the anchor for all biorhythm cycle calculations.
         */
        birthDate: string;
        /**
         * Date to calculate the reading for in YYYY-MM-DD format. Defaults to today (UTC) if omitted.
         */
        targetDate?: string;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/biorhythm/reading';
};
export type GetReadingErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetReadingError = GetReadingErrors[keyof GetReadingErrors];
export type GetReadingResponses = {
    /**
     * Complete biorhythm reading with all 10 cycles, energy rating, interpretation, and critical alerts
     */
    200: {
        /**
         * Birth date used for this calculation (YYYY-MM-DD).
         */
        birthDate: string;
        /**
         * Date this reading is for (YYYY-MM-DD).
         */
        targetDate: string;
        /**
         * Total days alive from birth date to target date. This is the basis for all cycle calculations.
         */
        daysSinceBirth: number;
        /**
         * All 10 biorhythm cycle readings. Keys: physical, emotional, intellectual, intuitive, aesthetic, awareness, spiritual, passion, mastery, wisdom.
         */
        cycles: {
            [key: string]: {
                /**
                 * Percentage position in the cycle from -100 (trough) to 100 (peak). 0 represents a critical zero crossing.
                 */
                value: number;
                /**
                 * Raw sine wave value before percentage conversion, ranging from -1.0 to 1.0.
                 */
                rawValue: number;
                /**
                 * Current phase of the cycle. One of: peak, high, rising, critical_ascending, critical_descending, falling, low, trough.
                 */
                phase: string;
                /**
                 * Human-readable phase name for display in UIs, dashboards, and reports.
                 */
                phaseLabel: string;
                /**
                 * Current day position within the cycle (1-based). Ranges from 1 to the cycle period length.
                 */
                dayInCycle: number;
                /**
                 * Number of days until the next peak (100%) in this cycle.
                 */
                daysUntilPeak: number;
                /**
                 * Number of days until the next trough (-100%) in this cycle.
                 */
                daysUntilTrough: number;
                /**
                 * Number of days until the next zero crossing in this cycle.
                 */
                daysUntilCritical: number;
                /**
                 * Short-term direction of the cycle. One of: rising, falling, peaking, bottoming.
                 */
                trend: string;
                /**
                 * Editorial 2-3 sentence reading specific to this cycle at its current phase position.
                 */
                interpretation: string;
            };
        };
        /**
         * Overall energy score from 1 (deep recovery) to 10 (peak performance), derived from the three primary cycle positions.
         */
        energyRating: number;
        /**
         * Summary phase label. One of: high_energy, mixed, recovery, critical.
         */
        overallPhase: string;
        /**
         * Editorial 3-5 sentence reading combining all cycle states into a coherent daily assessment.
         */
        interpretation: string;
        /**
         * Actionable 1-2 sentence guidance for the day based on the combined cycle analysis.
         */
        advice: string;
        /**
         * Critical day alerts. Present only when one or more primary cycles are at or near zero crossing.
         */
        criticalAlerts: Array<{
            /**
             * Which cycle is at or near zero crossing.
             */
            cycle: string;
            /**
             * Alert type. zero_crossing when a cycle crosses zero, approaching_critical when within 1 day of zero.
             */
            type: string;
            /**
             * Whether the cycle is rising through zero (ascending) or falling through zero (descending).
             */
            direction: string;
            /**
             * Specific advisory text for this critical alert.
             */
            advisory: string;
        }>;
    };
};
export type GetReadingResponse = GetReadingResponses[keyof GetReadingResponses];
export type GetForecastData = {
    body?: {
        /**
         * Birth date of the person in YYYY-MM-DD format.
         */
        birthDate: string;
        /**
         * Start date of the forecast range in YYYY-MM-DD format. Defaults to today (UTC).
         */
        startDate?: string;
        /**
         * End date of the forecast range in YYYY-MM-DD format. Defaults to startDate + 30 days. Maximum range: 90 days.
         */
        endDate?: string;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/biorhythm/forecast';
};
export type GetForecastErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetForecastError = GetForecastErrors[keyof GetForecastErrors];
export type GetForecastResponses = {
    /**
     * Biorhythm forecast with daily readings, summary, and best/worst day identification
     */
    200: {
        /**
         * Birth date used for this calculation.
         */
        birthDate: string;
        /**
         * First day of the forecast range.
         */
        startDate: string;
        /**
         * Last day of the forecast range.
         */
        endDate: string;
        /**
         * Number of days in the forecast range.
         */
        totalDays: number;
        summary: {
            /**
             * Date with the highest average primary cycle values in the range. Best day for demanding activities.
             */
            bestDay: string;
            /**
             * Date with the lowest average primary cycle values in the range. Best scheduled as a rest day.
             */
            worstDay: string;
            /**
             * Total number of days where at least one primary cycle crosses zero in the range.
             */
            criticalDayCount: number;
            /**
             * Average energy rating (1-10) across the entire forecast period.
             */
            averageEnergy: number;
            /**
             * Overview guidance for the entire forecast period based on average energy and cycle patterns.
             */
            periodAdvice: string;
        };
        /**
         * Array of daily readings, one per day in the forecast range.
         */
        days: Array<{
            /**
             * Date of this daily reading (YYYY-MM-DD).
             */
            date: string;
            /**
             * Days from birth date to this date.
             */
            daysSinceBirth: number;
            /**
             * Physical cycle value (-100 to 100).
             */
            physical: number;
            /**
             * Emotional cycle value (-100 to 100).
             */
            emotional: number;
            /**
             * Intellectual cycle value (-100 to 100).
             */
            intellectual: number;
            /**
             * Intuitive cycle value (-100 to 100).
             */
            intuitive: number;
            /**
             * Energy rating for this day (1-10).
             */
            energyRating: number;
            /**
             * True if any primary cycle crosses zero on this day.
             */
            isCritical: boolean;
            /**
             * Which primary cycles are critical on this day. Empty array if none.
             */
            criticalCycles: Array<string>;
        }>;
    };
};
export type GetForecastResponse = GetForecastResponses[keyof GetForecastResponses];
export type GetCriticalDaysData = {
    body?: {
        /**
         * Birth date of the person in YYYY-MM-DD format.
         */
        birthDate: string;
        /**
         * Start date of the search range in YYYY-MM-DD format. Defaults to today (UTC).
         */
        startDate?: string;
        /**
         * End date of the search range in YYYY-MM-DD format. Defaults to startDate + 90 days. Maximum range: 180 days.
         */
        endDate?: string;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/biorhythm/critical-days';
};
export type GetCriticalDaysErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetCriticalDaysError = GetCriticalDaysErrors[keyof GetCriticalDaysErrors];
export type GetCriticalDaysResponses = {
    /**
     * Critical days with zero crossing details, severity levels, and advisory text
     */
    200: {
        /**
         * Birth date used for this calculation.
         */
        birthDate: string;
        /**
         * Start of the search range.
         */
        startDate: string;
        /**
         * End of the search range.
         */
        endDate: string;
        /**
         * Total count of critical day events in the range. A double critical day counts as two events.
         */
        totalCriticalDays: number;
        /**
         * All critical day events in the range, sorted by date.
         */
        criticalDays: Array<{
            /**
             * Date of the zero crossing (YYYY-MM-DD).
             */
            date: string;
            /**
             * Which primary cycle crosses zero on this date.
             */
            cycle: string;
            /**
             * Cycle period in days.
             */
            period: number;
            /**
             * Whether the cycle is rising through zero (ascending) or falling through zero (descending).
             */
            direction: string;
            /**
             * How many primary cycles are critical on this date. single, double, or triple.
             */
            severity: string;
            /**
             * Advisory text explaining the significance of this critical day and recommended precautions.
             */
            advisory: string;
        }>;
        /**
         * Dates where 2 or more primary cycles cross zero simultaneously. These are particularly significant days requiring extra caution.
         */
        doubleCriticalDays: Array<string>;
        /**
         * Date where all 3 primary cycles cross zero simultaneously. Extremely rare event. Null if none found in range.
         */
        tripleCriticalDay: string;
    };
};
export type GetCriticalDaysResponse = GetCriticalDaysResponses[keyof GetCriticalDaysResponses];
export type CalculateBioCompatibilityData = {
    body?: {
        person1: {
            /**
             * Birth date of person 1 in YYYY-MM-DD format.
             */
            birthDate: string;
        };
        person2: {
            /**
             * Birth date of person 2 in YYYY-MM-DD format.
             */
            birthDate: string;
        };
        /**
         * Date to evaluate compatibility on in YYYY-MM-DD format. Defaults to today (UTC). Compatibility varies by day since biorhythm cycles are continuous.
         */
        targetDate?: string;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/biorhythm/compatibility';
};
export type CalculateBioCompatibilityErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CalculateBioCompatibilityError = CalculateBioCompatibilityErrors[keyof CalculateBioCompatibilityErrors];
export type CalculateBioCompatibilityResponses = {
    /**
     * Biorhythm compatibility analysis with per-cycle alignment, overall score, and relationship guidance
     */
    200: {
        person1: {
            /**
             * Birth date of person 1.
             */
            birthDate: string;
        };
        person2: {
            /**
             * Birth date of person 2.
             */
            birthDate: string;
        };
        /**
         * Date this compatibility was calculated for.
         */
        targetDate: string;
        /**
         * Overall compatibility score from 0 (fully opposed) to 100 (perfectly synchronized).
         */
        overallScore: number;
        /**
         * Compatibility rating label. One of: Highly Aligned, Well Aligned, Moderately Aligned, Misaligned, Opposed.
         */
        rating: string;
        /**
         * Per-cycle compatibility analysis for physical, emotional, and intellectual cycles.
         */
        cycles: {
            [key: string]: {
                /**
                 * Person 1 cycle value on the target date (-100 to 100).
                 */
                person1Value: number;
                /**
                 * Person 2 cycle value on the target date (-100 to 100).
                 */
                person2Value: number;
                /**
                 * Absolute difference between the two values (0-200). Lower values indicate better alignment.
                 */
                difference: number;
                /**
                 * Alignment score from 0 (perfectly opposed) to 100 (perfectly in sync).
                 */
                alignment: number;
                /**
                 * Alignment phase. One of: in_sync, complementary, neutral, opposing.
                 */
                phase: string;
                /**
                 * Human-readable description of how this cycle alignment affects the relationship.
                 */
                description: string;
            };
        };
        /**
         * Relationship strengths based on the compatibility profile.
         */
        strengths: Array<string>;
        /**
         * Potential relationship challenges to be aware of.
         */
        challenges: Array<string>;
        /**
         * Practical relationship guidance based on the combined cycle analysis.
         */
        advice: string;
        dailySync: {
            /**
             * Absolute difference in physical cycle values (0-200). Lower = more aligned.
             */
            physicalDiff: number;
            /**
             * Absolute difference in emotional cycle values (0-200). Lower = more aligned.
             */
            emotionalDiff: number;
            /**
             * Absolute difference in intellectual cycle values (0-200). Lower = more aligned.
             */
            intellectualDiff: number;
        };
    };
};
export type CalculateBioCompatibilityResponse = CalculateBioCompatibilityResponses[keyof CalculateBioCompatibilityResponses];
export type GetPhasesData = {
    body?: {
        /**
         * Birth date of the person in YYYY-MM-DD format.
         */
        birthDate: string;
        /**
         * Date to get phase information for in YYYY-MM-DD format. Defaults to today (UTC).
         */
        targetDate?: string;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/biorhythm/phases';
};
export type GetPhasesErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetPhasesError = GetPhasesErrors[keyof GetPhasesErrors];
export type GetPhasesResponses = {
    /**
     * Phase information for all 10 cycles with summary
     */
    200: {
        /**
         * Birth date used for this calculation.
         */
        birthDate: string;
        /**
         * Date this phase info is for.
         */
        targetDate: string;
        /**
         * Total days alive from birth date to target date.
         */
        daysSinceBirth: number;
        /**
         * Phase information for all 10 cycles keyed by cycle ID.
         */
        phases: {
            [key: string]: {
                /**
                 * Cycle value from -100 to 100.
                 */
                value: number;
                /**
                 * Current phase identifier.
                 */
                phase: string;
                /**
                 * Human-readable phase label.
                 */
                phaseLabel: string;
                /**
                 * Current day position within the cycle.
                 */
                dayInCycle: number;
                /**
                 * Cycle period in days. 0 for composite cycles (passion, mastery, wisdom).
                 */
                totalDays: number;
                /**
                 * Days until next zero crossing.
                 */
                daysUntilCritical: number;
                /**
                 * Short-term direction: rising, falling, peaking, or bottoming.
                 */
                trend: string;
            };
        };
        /**
         * Quick overview string summarizing the current state of all cycles.
         */
        summary: string;
    };
};
export type GetPhasesResponse = GetPhasesResponses[keyof GetPhasesResponses];
export type GetDailyBiorhythmData = {
    body?: {
        /**
         * Optional seed for reproducible readings. Same seed + same date = same reading every time. Pass any unique identifier (userId, email hash, session token). Omit for anonymous daily readings.
         */
        seed?: string;
        /**
         * Date for the reading in YYYY-MM-DD format. Defaults to today (UTC). Useful for viewing past daily readings or pre-generating future ones.
         */
        date?: string;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/biorhythm/daily';
};
export type GetDailyBiorhythmErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetDailyBiorhythmError = GetDailyBiorhythmErrors[keyof GetDailyBiorhythmErrors];
export type GetDailyBiorhythmResponses = {
    /**
     * Daily biorhythm reading with spotlight cycle and actionable guidance
     */
    200: {
        /**
         * Date this daily reading is for (YYYY-MM-DD, UTC).
         */
        date: string;
        /**
         * Computed seed used for this reading. Same seed always produces the same reading.
         */
        seed: string;
        /**
         * Overall energy score from 1 to 10.
         */
        energyRating: number;
        /**
         * Summary phase. One of: high_energy, mixed, recovery, critical.
         */
        overallPhase: string;
        spotlight: {
            /**
             * Which primary cycle is featured as the daily spotlight.
             */
            cycle: string;
            /**
             * Current value of the spotlight cycle (-100 to 100).
             */
            value: number;
            /**
             * Current phase of the spotlight cycle.
             */
            phase: string;
            /**
             * Personalized message about the spotlight cycle and what it means for today.
             */
            message: string;
        };
        quickRead: {
            /**
             * Physical cycle value (-100 to 100).
             */
            physical: number;
            /**
             * Emotional cycle value (-100 to 100).
             */
            emotional: number;
            /**
             * Intellectual cycle value (-100 to 100).
             */
            intellectual: number;
        };
        /**
         * Concise daily biorhythm message combining energy rating and spotlight cycle.
         */
        dailyMessage: string;
        /**
         * Actionable 1-2 sentence guidance for the day.
         */
        advice: string;
    };
};
export type GetDailyBiorhythmResponse = GetDailyBiorhythmResponses[keyof GetDailyBiorhythmResponses];
export type GetDailyHexagramData = {
    body?: {
        /**
         * Optional seed for reproducible readings. Same seed + same date = same hexagram every time. Pass any unique identifier (userId, email hash, session token). Omit for anonymous daily readings.
         */
        seed?: string;
        /**
         * Date for the reading in YYYY-MM-DD format. Defaults to today (UTC). Useful for viewing past daily readings or pre-generating future ones.
         */
        date?: string;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/iching/daily';
};
export type GetDailyHexagramErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Failed to generate daily hexagram
     */
    500: {
        /**
         * Human-readable error message. May change wording — do not parse programmatically.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier for programmatic error handling.
         */
        code: string;
    };
};
export type GetDailyHexagramError = GetDailyHexagramErrors[keyof GetDailyHexagramErrors];
export type GetDailyHexagramResponses = {
    /**
     * Daily hexagram reading with full interpretation
     */
    200: {
        /**
         * Date this daily hexagram is for (YYYY-MM-DD, UTC).
         */
        date: string;
        /**
         * Computed seed used for this reading. Same seed always produces the same hexagram.
         */
        seed: string;
        hexagram: {
            /**
             * Hexagram number in King Wen sequence (1-64).
             */
            number: number;
            /**
             * Unicode hexagram symbol for display.
             */
            symbol: string;
            /**
             * Original Chinese name.
             */
            chinese: string;
            /**
             * English translation of the hexagram name.
             */
            english: string;
            /**
             * Pinyin romanization with tone marks.
             */
            pinyin: string;
            /**
             * Upper trigram (lines 4-6).
             */
            upperTrigram: string;
            /**
             * Lower trigram (lines 1-3).
             */
            lowerTrigram: string;
            /**
             * The Judgment (Tuan) text, the primary oracle statement of the hexagram offering core guidance.
             */
            judgment: string;
            /**
             * The Image (Xiang) text, symbolic guidance derived from the trigram combination describing the ideal action.
             */
            image: string;
            /**
             * Modern interpretations across life areas based on ancient I-Ching wisdom.
             */
            interpretation: {
                /**
                 * General life situation interpretation.
                 */
                general: string;
                /**
                 * Love and relationship guidance.
                 */
                love: string;
                /**
                 * Career and professional interpretation.
                 */
                career: string;
                /**
                 * Decision-making guidance for whether to act, wait, or change course.
                 */
                decision: string;
                /**
                 * Practical wisdom and actionable advice.
                 */
                advice: string;
            };
        };
        /**
         * Concise daily message summarizing the hexagram guidance
         */
        dailyMessage: string;
    };
};
export type GetDailyHexagramResponse = GetDailyHexagramResponses[keyof GetDailyHexagramResponses];
export type CastDailyReadingData = {
    body?: {
        /**
         * Optional seed for reproducible readings. Same seed + same date = same hexagram every time. Pass any unique identifier (userId, email hash, session token). Omit for anonymous daily readings.
         */
        seed?: string;
        /**
         * Date for the reading in YYYY-MM-DD format. Defaults to today (UTC). Useful for viewing past daily readings or pre-generating future ones.
         */
        date?: string;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/iching/daily/cast';
};
export type CastDailyReadingErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CastDailyReadingError = CastDailyReadingErrors[keyof CastDailyReadingErrors];
export type CastDailyReadingResponses = {
    /**
     * Complete daily casting with primary and resulting hexagrams
     */
    200: {
        /**
         * Date this daily casting is for (YYYY-MM-DD, UTC).
         */
        date: string;
        /**
         * Computed seed for reproducible castings.
         */
        seed: string;
        hexagram?: {
            /**
             * Hexagram number in King Wen sequence (1-64).
             */
            number: number;
            /**
             * Unicode hexagram symbol for display.
             */
            symbol: string;
            /**
             * Original Chinese name.
             */
            chinese: string;
            /**
             * English translation of the hexagram name.
             */
            english: string;
            /**
             * Pinyin romanization with tone marks.
             */
            pinyin: string;
            /**
             * Upper trigram (lines 4-6).
             */
            upperTrigram: string;
            /**
             * Lower trigram (lines 1-3).
             */
            lowerTrigram: string;
            /**
             * The Judgment (Tuan) text, the primary oracle statement of the hexagram offering core guidance.
             */
            judgment: string;
            /**
             * The Image (Xiang) text, symbolic guidance derived from the trigram combination describing the ideal action.
             */
            image: string;
            /**
             * Modern interpretations across life areas based on ancient I-Ching wisdom.
             */
            interpretation: {
                /**
                 * General life situation interpretation.
                 */
                general: string;
                /**
                 * Love and relationship guidance.
                 */
                love: string;
                /**
                 * Career and professional interpretation.
                 */
                career: string;
                /**
                 * Decision-making guidance for whether to act, wait, or change course.
                 */
                decision: string;
                /**
                 * Practical wisdom and actionable advice.
                 */
                advice: string;
            };
        };
        /**
         * Line values (6-9) from bottom to top. 6=old yin (changing), 7=young yang, 8=young yin, 9=old yang (changing).
         */
        lines: Array<number>;
        /**
         * Positions of changing lines (1-6, bottom to top). These lines transform yin to yang or vice versa.
         */
        changingLinePositions: Array<number>;
        /**
         * Hexagram after transformation (if changing lines present)
         */
        resultingHexagram?: {
            /**
             * Hexagram number in King Wen sequence (1-64).
             */
            number: number;
            /**
             * Unicode hexagram symbol for display.
             */
            symbol: string;
            /**
             * Original Chinese name.
             */
            chinese: string;
            /**
             * English translation of the hexagram name.
             */
            english: string;
            /**
             * Pinyin romanization with tone marks.
             */
            pinyin: string;
            /**
             * Upper trigram (lines 4-6).
             */
            upperTrigram: string;
            /**
             * Lower trigram (lines 1-3).
             */
            lowerTrigram: string;
            /**
             * The Judgment (Tuan) text, the primary oracle statement of the hexagram offering core guidance.
             */
            judgment: string;
            /**
             * The Image (Xiang) text, symbolic guidance derived from the trigram combination describing the ideal action.
             */
            image: string;
            /**
             * Modern interpretations across life areas based on ancient I-Ching wisdom.
             */
            interpretation: {
                /**
                 * General life situation interpretation.
                 */
                general: string;
                /**
                 * Love and relationship guidance.
                 */
                love: string;
                /**
                 * Career and professional interpretation.
                 */
                career: string;
                /**
                 * Decision-making guidance for whether to act, wait, or change course.
                 */
                decision: string;
                /**
                 * Practical wisdom and actionable advice.
                 */
                advice: string;
            };
        };
    };
};
export type CastDailyReadingResponse = CastDailyReadingResponses[keyof CastDailyReadingResponses];
export type ListHexagramsData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
        /**
         * Maximum items to return per page. Range: 1-20, default 20.
         */
        limit?: number;
        /**
         * Number of items to skip for pagination. Default 0.
         */
        offset?: number;
    };
    url: '/iching/hexagrams';
};
export type ListHexagramsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type ListHexagramsError = ListHexagramsErrors[keyof ListHexagramsErrors];
export type ListHexagramsResponses = {
    /**
     * List of hexagrams with basic information.
     */
    200: {
        /**
         * Total number of I-Ching hexagrams (always 64).
         */
        total: number;
        /**
         * Page size used for this response.
         */
        limit: number;
        /**
         * Number of hexagrams skipped. Use with limit for pagination.
         */
        offset: number;
        /**
         * Hexagrams for the current page. Use /hexagrams/{number} for full details.
         */
        hexagrams: Array<BasicHexagram>;
    };
};
export type ListHexagramsResponse = ListHexagramsResponses[keyof ListHexagramsResponses];
export type GetRandomHexagramData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/iching/hexagrams/random';
};
export type GetRandomHexagramErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * No hexagrams available.
     */
    404: {
        /**
         * Human-readable error message. May change wording — do not parse programmatically.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier for programmatic error handling.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetRandomHexagramError = GetRandomHexagramErrors[keyof GetRandomHexagramErrors];
export type GetRandomHexagramResponses = {
    /**
     * A random hexagram with full details.
     */
    200: Hexagram;
};
export type GetRandomHexagramResponse = GetRandomHexagramResponses[keyof GetRandomHexagramResponses];
export type LookupHexagramData = {
    body?: never;
    path?: never;
    query: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
        /**
         * Six-digit binary pattern (0=yin/broken, 1=yang/solid) from bottom to top.
         */
        lines: string;
    };
    url: '/iching/hexagrams/lookup';
};
export type LookupHexagramErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * No hexagram found for pattern.
     */
    404: {
        /**
         * Human-readable error message. May change wording — do not parse programmatically.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier for programmatic error handling.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type LookupHexagramError = LookupHexagramErrors[keyof LookupHexagramErrors];
export type LookupHexagramResponses = {
    /**
     * Matching hexagram.
     */
    200: Hexagram;
};
export type LookupHexagramResponse = LookupHexagramResponses[keyof LookupHexagramResponses];
export type GetHexagramData = {
    body?: never;
    path: {
        /**
         * Hexagram number in King Wen sequence (1-64).
         */
        number: number;
    };
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/iching/hexagrams/{number}';
};
export type GetHexagramErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Hexagram not found.
     */
    404: {
        /**
         * Human-readable error message. May change wording — do not parse programmatically.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier for programmatic error handling.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetHexagramError = GetHexagramErrors[keyof GetHexagramErrors];
export type GetHexagramResponses = {
    /**
     * Full hexagram details.
     */
    200: Hexagram;
};
export type GetHexagramResponse = GetHexagramResponses[keyof GetHexagramResponses];
export type CastReadingData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
        /**
         * Optional seed for reproducible castings. Same seed = same casting every time. Pass any unique identifier (userId, session token, question hash). Omit for random casting.
         */
        seed?: string;
    };
    url: '/iching/cast';
};
export type CastReadingErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type CastReadingError = CastReadingErrors[keyof CastReadingErrors];
export type CastReadingResponses = {
    /**
     * Complete I-Ching reading with primary and resulting hexagrams.
     */
    200: {
        /**
         * The seed used for this casting (if provided)
         */
        seed?: string;
        hexagram?: Hexagram & unknown;
        /**
         * Line values (6-9) from bottom to top. 6=old yin (changing), 7=young yang, 8=young yin, 9=old yang (changing)
         */
        lines: Array<number>;
        /**
         * Positions of changing lines (1-6, bottom to top)
         */
        changingLinePositions: Array<number>;
        resultingHexagram?: Hexagram & unknown;
    };
};
export type CastReadingResponse = CastReadingResponses[keyof CastReadingResponses];
export type ListTrigramsData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/iching/trigrams';
};
export type ListTrigramsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type ListTrigramsError = ListTrigramsErrors[keyof ListTrigramsErrors];
export type ListTrigramsResponses = {
    /**
     * List of all 8 trigrams with basic information.
     */
    200: {
        /**
         * Total number of I-Ching trigrams (always 8).
         */
        total: number;
        /**
         * All 8 trigrams (bagua) with basic details.
         */
        trigrams: Array<BasicTrigram>;
    };
};
export type ListTrigramsResponse = ListTrigramsResponses[keyof ListTrigramsResponses];
export type GetTrigramData = {
    body?: never;
    path: {
        /**
         * Trigram number (1-8) or English name (Heaven, Earth, Thunder, Wind, Water, Fire, Mountain, Lake).
         */
        id: string;
    };
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/iching/trigrams/{id}';
};
export type GetTrigramErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Trigram not found.
     */
    404: {
        /**
         * Human-readable error message. May change wording — do not parse programmatically.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier for programmatic error handling.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetTrigramError = GetTrigramErrors[keyof GetTrigramErrors];
export type GetTrigramResponses = {
    /**
     * Trigram details.
     */
    200: Trigram;
};
export type GetTrigramResponse = GetTrigramResponses[keyof GetTrigramResponses];
export type GetCrystalsByZodiacData = {
    body?: never;
    path: {
        /**
         * Zodiac sign name, case-insensitive (e.g., pisces, Pisces, PISCES all work). Valid: aries, taurus, gemini, cancer, leo, virgo, libra, scorpio, sagittarius, capricorn, aquarius, pisces.
         */
        sign: 'aries' | 'taurus' | 'gemini' | 'cancer' | 'leo' | 'virgo' | 'libra' | 'scorpio' | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';
    };
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
        /**
         * Maximum items to return per page. Range: 1-30, default 20.
         */
        limit?: number;
        /**
         * Number of items to skip for pagination. Default 0.
         */
        offset?: number;
    };
    url: '/crystals/zodiac/{sign}';
};
export type GetCrystalsByZodiacErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetCrystalsByZodiacError = GetCrystalsByZodiacErrors[keyof GetCrystalsByZodiacErrors];
export type GetCrystalsByZodiacResponses = {
    /**
     * Paginated list of crystals associated with the zodiac sign
     */
    200: {
        /**
         * The zodiac sign that was queried.
         */
        sign: string;
        /**
         * Total number of crystals associated with this zodiac sign.
         */
        total: number;
        /**
         * Maximum crystals returned per page.
         */
        limit: number;
        /**
         * Number of crystals skipped.
         */
        offset: number;
        /**
         * Crystal summaries for this zodiac sign. Call /crystals/:id for full healing properties.
         */
        crystals: Array<{
            /**
             * Crystal display name.
             */
            name: string;
            /**
             * URL-safe crystal identifier for detail lookup.
             */
            id: string;
            /**
             * URL to crystal photograph for visual identification.
             */
            imageUrl: string;
            /**
             * Primary colors of this crystal variety. Null when color data is unavailable.
             */
            colors: Array<string>;
        }>;
    };
};
export type GetCrystalsByZodiacResponse = GetCrystalsByZodiacResponses[keyof GetCrystalsByZodiacResponses];
export type GetCrystalsByChakraData = {
    body?: never;
    path: {
        /**
         * Chakra name, case-insensitive (e.g., heart, Heart, HEART all work). Valid: Root, Sacral, Solar Plexus, Heart, Throat, Third Eye, Crown.
         */
        chakra: 'Root' | 'Sacral' | 'Solar Plexus' | 'Heart' | 'Throat' | 'Third Eye' | 'Crown';
    };
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
        /**
         * Maximum items to return per page. Range: 1-30, default 20.
         */
        limit?: number;
        /**
         * Number of items to skip for pagination. Default 0.
         */
        offset?: number;
    };
    url: '/crystals/chakra/{chakra}';
};
export type GetCrystalsByChakraErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetCrystalsByChakraError = GetCrystalsByChakraErrors[keyof GetCrystalsByChakraErrors];
export type GetCrystalsByChakraResponses = {
    /**
     * Paginated list of crystals for the specified chakra
     */
    200: {
        /**
         * The chakra energy center that was queried.
         */
        chakra: string;
        /**
         * Total number of crystals associated with this chakra.
         */
        total: number;
        /**
         * Maximum crystals returned per page.
         */
        limit: number;
        /**
         * Number of crystals skipped.
         */
        offset: number;
        /**
         * Crystal summaries for this chakra. Call /crystals/:id for full healing properties.
         */
        crystals: Array<{
            /**
             * Crystal display name.
             */
            name: string;
            /**
             * URL-safe crystal identifier for detail lookup.
             */
            id: string;
            /**
             * URL to crystal photograph for visual identification.
             */
            imageUrl: string;
            /**
             * Primary colors of this crystal variety. Null when color data is unavailable.
             */
            colors: Array<string>;
        }>;
    };
};
export type GetCrystalsByChakraResponse = GetCrystalsByChakraResponses[keyof GetCrystalsByChakraResponses];
export type GetCrystalsByElementData = {
    body?: never;
    path: {
        /**
         * Element name, case-insensitive (e.g., water, Water, WATER all work). Valid: Earth, Water, Fire, Air, Storm.
         */
        element: 'Earth' | 'Water' | 'Fire' | 'Air' | 'Storm';
    };
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
        /**
         * Maximum items to return per page. Range: 1-30, default 20.
         */
        limit?: number;
        /**
         * Number of items to skip for pagination. Default 0.
         */
        offset?: number;
    };
    url: '/crystals/element/{element}';
};
export type GetCrystalsByElementErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetCrystalsByElementError = GetCrystalsByElementErrors[keyof GetCrystalsByElementErrors];
export type GetCrystalsByElementResponses = {
    /**
     * Paginated list of crystals for the specified element
     */
    200: {
        /**
         * The element that was queried.
         */
        element: string;
        /**
         * Total number of crystals associated with this element.
         */
        total: number;
        /**
         * Maximum crystals returned per page.
         */
        limit: number;
        /**
         * Number of crystals skipped.
         */
        offset: number;
        /**
         * Crystal summaries for this element. Call /crystals/:id for full healing properties.
         */
        crystals: Array<{
            /**
             * Crystal display name.
             */
            name: string;
            /**
             * URL-safe crystal identifier for detail lookup.
             */
            id: string;
            /**
             * URL to crystal photograph for visual identification.
             */
            imageUrl: string;
            /**
             * Primary colors of this crystal variety. Null when color data is unavailable.
             */
            colors: Array<string>;
        }>;
    };
};
export type GetCrystalsByElementResponse = GetCrystalsByElementResponses[keyof GetCrystalsByElementResponses];
export type GetBirthstonesData = {
    body?: never;
    path: {
        /**
         * Birth month as a number from 1 (January) to 12 (December).
         */
        month: number;
    };
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/crystals/birthstone/{month}';
};
export type GetBirthstonesErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetBirthstonesError = GetBirthstonesErrors[keyof GetBirthstonesErrors];
export type GetBirthstonesResponses = {
    /**
     * Birthstone crystals for the specified month
     */
    200: {
        /**
         * The month number that was queried (1-12).
         */
        month: number;
        /**
         * Full name of the queried month.
         */
        monthName: string;
        /**
         * Number of birthstone crystals for this month.
         */
        total: number;
        /**
         * Birthstone crystals for this month. Call /crystals/:id for full healing properties.
         */
        crystals: Array<{
            /**
             * Crystal display name.
             */
            name: string;
            /**
             * URL-safe crystal identifier for detail lookup.
             */
            id: string;
            /**
             * URL to crystal photograph for visual identification.
             */
            imageUrl: string;
            /**
             * Primary colors of this crystal variety. Null when color data is unavailable.
             */
            colors: Array<string>;
        }>;
    };
};
export type GetBirthstonesResponse = GetBirthstonesResponses[keyof GetBirthstonesResponses];
export type SearchCrystalsData = {
    body?: never;
    path?: never;
    query: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
        /**
         * Search query (2-50 characters). Matches against crystal names, keywords, descriptions, and meaning fields. Case-insensitive partial matching.
         */
        q: string;
        /**
         * Maximum items to return per page. Range: 1-50, default 20.
         */
        limit?: number;
        /**
         * Number of items to skip for pagination. Default 0.
         */
        offset?: number;
    };
    url: '/crystals/search';
};
export type SearchCrystalsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type SearchCrystalsError = SearchCrystalsErrors[keyof SearchCrystalsErrors];
export type SearchCrystalsResponses = {
    /**
     * Crystals matching the search query
     */
    200: {
        /**
         * The search query that was used.
         */
        query: string;
        /**
         * Total number of crystals matching the query.
         */
        total: number;
        /**
         * Maximum crystals returned per page.
         */
        limit: number;
        /**
         * Number of crystals skipped.
         */
        offset: number;
        /**
         * Matching crystal summaries. Call /crystals/:id for full healing properties.
         */
        crystals: Array<{
            /**
             * Crystal display name.
             */
            name: string;
            /**
             * URL-safe crystal identifier for detail lookup.
             */
            id: string;
            /**
             * URL to crystal photograph for visual identification.
             */
            imageUrl: string;
            /**
             * Primary colors of this crystal variety. Null when color data is unavailable.
             */
            colors: Array<string>;
        }>;
    };
};
export type SearchCrystalsResponse = SearchCrystalsResponses[keyof SearchCrystalsResponses];
export type GetCrystalPairingsData = {
    body?: never;
    path: {
        /**
         * URL-safe crystal identifier to find pairings for (e.g., "amethyst", "rose-quartz").
         */
        id: string;
    };
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/crystals/pairings/{id}';
};
export type GetCrystalPairingsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Crystal not found in database
     */
    404: {
        /**
         * Human-readable error message. May change wording — do not parse programmatically.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier for programmatic error handling.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetCrystalPairingsError = GetCrystalPairingsErrors[keyof GetCrystalPairingsErrors];
export type GetCrystalPairingsResponses = {
    /**
     * Crystal pairing recommendations
     */
    200: {
        /**
         * The crystal identifier that pairings were requested for.
         */
        crystal: string;
        /**
         * Display name of the source crystal.
         */
        name: string;
        /**
         * Number of recommended crystal pairings.
         */
        count: number;
        /**
         * Crystals recommended for use alongside the source crystal for synergistic healing.
         */
        pairings: Array<{
            /**
             * Paired crystal display name.
             */
            name: string;
            /**
             * URL-safe identifier for the paired crystal.
             */
            id: string;
            /**
             * URL to paired crystal photograph.
             */
            imageUrl: string;
            /**
             * Brief overview of the paired crystal.
             */
            description: string;
            /**
             * Chakra associations for the paired crystal.
             */
            chakras: Array<string>;
            /**
             * Healing property keywords for the paired crystal. Null when keyword data is unavailable.
             */
            keywords: Array<string>;
        }>;
    };
};
export type GetCrystalPairingsResponse = GetCrystalPairingsResponses[keyof GetCrystalPairingsResponses];
export type GetDailyCrystalData = {
    body?: {
        /**
         * Optional seed for reproducible readings. Same seed + same date = same crystal every time. Pass any unique identifier (userId, email hash, session token). Omit for anonymous daily readings.
         */
        seed?: string;
        /**
         * Date for the reading in YYYY-MM-DD format. Defaults to today (UTC). Useful for viewing past daily readings or pre-generating future ones.
         */
        date?: string;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/crystals/daily';
};
export type GetDailyCrystalErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetDailyCrystalError = GetDailyCrystalErrors[keyof GetDailyCrystalErrors];
export type GetDailyCrystalResponses = {
    /**
     * Daily crystal teaser with summary information
     */
    200: {
        /**
         * The date used for crystal selection (UTC).
         */
        date: string;
        /**
         * Computed seed used for this reading. Same seed always produces the same crystal.
         */
        seed: string;
        /**
         * Display name of the crystal selected for this date.
         */
        name: string;
        /**
         * URL-safe identifier. Call /crystals/:id for full healing properties.
         */
        id: string;
        /**
         * URL to crystal photograph. Use for daily crystal card display and visual features.
         */
        imageUrl: string;
        /**
         * Overview of the crystal covering primary healing purpose and benefits.
         */
        description: string;
        /**
         * Chakra energy centers this crystal resonates with for energy healing practice.
         */
        chakras: Array<string>;
        /**
         * Zodiac signs this crystal is traditionally associated with. Null when zodiac data is unavailable.
         */
        zodiacSigns: Array<string>;
        /**
         * Positive affirmation aligned with the selected crystal. Use for daily affirmation features and meditation guidance.
         */
        affirmation: string;
    };
};
export type GetDailyCrystalResponse = GetDailyCrystalResponses[keyof GetDailyCrystalResponses];
export type GetRandomCrystalData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/crystals/random';
};
export type GetRandomCrystalErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetRandomCrystalError = GetRandomCrystalErrors[keyof GetRandomCrystalErrors];
export type GetRandomCrystalResponses = {
    /**
     * A randomly selected crystal with summary information
     */
    200: {
        /**
         * Display name of the randomly selected crystal.
         */
        name: string;
        /**
         * URL-safe identifier. Call /crystals/:id for full healing properties.
         */
        id: string;
        /**
         * URL to crystal photograph for visual display.
         */
        imageUrl: string;
        /**
         * Overview of the crystal covering primary healing purpose and benefits.
         */
        description: string;
        /**
         * Chakra energy centers this crystal resonates with.
         */
        chakras: Array<string>;
        /**
         * Zodiac signs this crystal is traditionally associated with. Null when zodiac data is unavailable.
         */
        zodiacSigns: Array<string>;
        /**
         * Positive affirmation aligned with the selected crystal energy.
         */
        affirmation: string;
    };
};
export type GetRandomCrystalResponse = GetRandomCrystalResponses[keyof GetRandomCrystalResponses];
export type ListCrystalColorsData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/crystals/colors';
};
export type ListCrystalColorsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type ListCrystalColorsError = ListCrystalColorsErrors[keyof ListCrystalColorsErrors];
export type ListCrystalColorsResponses = {
    /**
     * All unique crystal colors sorted alphabetically
     */
    200: {
        /**
         * Total number of unique color values in the database.
         */
        count: number;
        /**
         * Alphabetically sorted list of all unique crystal colors. Pass any value to the color filter on GET /crystals.
         */
        colors: Array<string>;
    };
};
export type ListCrystalColorsResponse = ListCrystalColorsResponses[keyof ListCrystalColorsResponses];
export type ListCrystalPlanetsData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/crystals/planets';
};
export type ListCrystalPlanetsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type ListCrystalPlanetsError = ListCrystalPlanetsErrors[keyof ListCrystalPlanetsErrors];
export type ListCrystalPlanetsResponses = {
    /**
     * All unique planetary associations sorted alphabetically
     */
    200: {
        /**
         * Total number of unique planetary values in the database.
         */
        count: number;
        /**
         * Alphabetically sorted list of all unique planetary associations. Pass any value to the planet filter on GET /crystals.
         */
        planets: Array<string>;
    };
};
export type ListCrystalPlanetsResponse = ListCrystalPlanetsResponses[keyof ListCrystalPlanetsResponses];
export type ListCrystalsData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
        /**
         * Filter by chakra association, case-insensitive. Valid values: Root, Sacral, Solar Plexus, Heart, Throat, Third Eye, Crown.
         */
        chakra?: 'Root' | 'Sacral' | 'Solar Plexus' | 'Heart' | 'Throat' | 'Third Eye' | 'Crown';
        /**
         * Filter by zodiac sign, case-insensitive. Valid values: aries, taurus, gemini, cancer, leo, virgo, libra, scorpio, sagittarius, capricorn, aquarius, pisces.
         */
        zodiac?: 'aries' | 'taurus' | 'gemini' | 'cancer' | 'leo' | 'virgo' | 'libra' | 'scorpio' | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';
        /**
         * Filter by elemental association, case-insensitive. Valid values: Earth, Water, Fire, Air, Storm.
         */
        element?: 'Earth' | 'Water' | 'Fire' | 'Air' | 'Storm';
        /**
         * Filter by crystal color (partial match, case-insensitive). E.g., "pink", "green", "blue", "purple". Use GET /colors for valid values.
         */
        color?: string;
        /**
         * Filter by planetary association (partial match, case-insensitive). E.g., "Venus", "Moon", "Jupiter". Use GET /planets for valid values.
         */
        planet?: string;
        /**
         * Maximum items to return per page. Range: 1-100, default 20.
         */
        limit?: number;
        /**
         * Number of items to skip for pagination. Default 0.
         */
        offset?: number;
    };
    url: '/crystals';
};
export type ListCrystalsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type ListCrystalsError = ListCrystalsErrors[keyof ListCrystalsErrors];
export type ListCrystalsResponses = {
    /**
     * Paginated list of crystals with summary information
     */
    200: {
        /**
         * Total number of crystals matching the filter criteria.
         */
        total: number;
        /**
         * Maximum crystals returned per page.
         */
        limit: number;
        /**
         * Number of crystals skipped.
         */
        offset: number;
        /**
         * Crystal summaries for the current page.
         */
        crystals: Array<{
            /**
             * Crystal display name.
             */
            name: string;
            /**
             * URL-safe crystal identifier for detail lookup.
             */
            id: string;
            /**
             * URL to crystal photograph for visual identification.
             */
            imageUrl: string;
            /**
             * Primary colors of this crystal variety. Null when color data is unavailable.
             */
            colors: Array<string>;
            /**
             * Chakra energy centers this crystal resonates with. One of: Root, Sacral, Solar Plexus, Heart, Throat, Third Eye, Crown.
             */
            chakras: Array<string>;
        }>;
    };
};
export type ListCrystalsResponse = ListCrystalsResponses[keyof ListCrystalsResponses];
export type GetCrystalData = {
    body?: never;
    path: {
        /**
         * URL-safe crystal identifier (e.g., "amethyst", "rose-quartz", "black-tourmaline"). Must match an entry in the database.
         */
        id: string;
    };
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/crystals/{id}';
};
export type GetCrystalErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Crystal not found in database
     */
    404: {
        /**
         * Human-readable error message. May change wording — do not parse programmatically.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier for programmatic error handling.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetCrystalError = GetCrystalErrors[keyof GetCrystalErrors];
export type GetCrystalResponses = {
    /**
     * Complete crystal healing properties with all associations
     */
    200: {
        /**
         * Display name of the crystal or healing stone.
         */
        name: string;
        /**
         * URL-safe identifier for the crystal.
         */
        id: string;
        /**
         * URL to a high-quality crystal photograph. Use for visual crystal guides, product listings, and crystal identification features.
         */
        imageUrl: string;
        /**
         * Overview of the crystal covering its primary healing purpose, spiritual significance, and key benefits.
         */
        description: string;
        /**
         * Detailed healing interpretations across three areas: spiritual and metaphysical, emotional and psychological, and physical body associations.
         */
        meaning: {
            /**
             * Spiritual and metaphysical healing properties including energy work, meditation benefits, and higher consciousness connections. Null when spiritual interpretation is unavailable.
             */
            spiritual: string;
            /**
             * Emotional healing properties including stress relief, relationship support, and emotional balance benefits.
             */
            emotional: string;
            /**
             * Physical healing associations traditionally attributed to this crystal in crystal healing practice. Null when physical healing data is unavailable.
             */
            physical: string;
        };
        /**
         * Chakra energy centers this crystal resonates with. One of: Root, Sacral, Solar Plexus, Heart, Throat, Third Eye, Crown.
         */
        chakras: Array<string>;
        /**
         * Zodiac signs this crystal is traditionally associated with. Null when zodiac data is unavailable. Useful for personalized crystal recommendations based on birth chart.
         */
        zodiacSigns: Array<string>;
        /**
         * Ruling planet or celestial body associated with this crystal in astrological tradition. Null when planetary association is unavailable.
         */
        planet: string;
        /**
         * Elemental associations (Earth, Water, Fire, Air, Storm) connecting the crystal to natural forces and energy types. Null when elemental data is unavailable.
         */
        elements: Array<string>;
        /**
         * Primary colors of this crystal variety. Null when color data is unavailable. Useful for color-based crystal selection and filtering.
         */
        colors: Array<string>;
        /**
         * Mohs hardness scale rating (1-10). Indicates durability for jewelry use. Quartz family is 7, Diamond is 10, Selenite is 2.
         */
        hardness: number;
        /**
         * Numerological vibration number linking this crystal to numerology meanings. Connects crystal healing with numerology practice.
         */
        numericalVibration: number;
        /**
         * Five to nine keywords capturing the core healing properties and spiritual themes of this crystal. Null when keyword data is unavailable.
         */
        keywords: Array<string>;
        /**
         * Birth month (1-12) if this crystal is a traditional birthstone. Null if not a birthstone. January is 1, December is 12.
         */
        birthMonth: number;
        /**
         * Positive affirmation aligned with this crystal energy. Use for meditation, journaling, or daily affirmation features.
         */
        affirmation: string;
        /**
         * Crystal identifiers that pair well with this stone for enhanced healing combinations. Use for crystal grid and pairing recommendations.
         */
        pairsWith: Array<string>;
    };
};
export type GetCrystalResponse = GetCrystalResponses[keyof GetCrystalResponses];
export type SearchDreamSymbolsData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Search query to match against symbol names and meanings. Case-insensitive.
         */
        q?: string;
        /**
         * Filter symbols by starting letter (a-z). Case-insensitive.
         */
        letter?: string;
        /**
         * Maximum items to return per page. Range: 1-50, default 20.
         */
        limit?: number;
        /**
         * Number of items to skip for pagination. Default 0.
         */
        offset?: number;
    };
    url: '/dreams/symbols';
};
export type SearchDreamSymbolsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type SearchDreamSymbolsError = SearchDreamSymbolsErrors[keyof SearchDreamSymbolsErrors];
export type SearchDreamSymbolsResponses = {
    /**
     * Paginated list of dream symbols with basic information.
     */
    200: {
        /**
         * Total number of dream symbols matching your search or filter criteria.
         */
        total: number;
        /**
         * Page size used for this response.
         */
        limit: number;
        /**
         * Number of symbols skipped. Use with limit for pagination.
         */
        offset: number;
        /**
         * Dream symbols for the current page. Use /symbols/{id} to get full interpretation.
         */
        symbols: Array<BasicDreamSymbol>;
    };
};
export type SearchDreamSymbolsResponse = SearchDreamSymbolsResponses[keyof SearchDreamSymbolsResponses];
export type GetRandomSymbolsData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Number of random symbols to return (1-10). Default: 1.
         */
        count?: number;
    };
    url: '/dreams/symbols/random';
};
export type GetRandomSymbolsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetRandomSymbolsError = GetRandomSymbolsErrors[keyof GetRandomSymbolsErrors];
export type GetRandomSymbolsResponses = {
    /**
     * Random dream symbol(s) with full interpretations.
     */
    200: {
        symbols: Array<DreamSymbol>;
    };
};
export type GetRandomSymbolsResponse = GetRandomSymbolsResponses[keyof GetRandomSymbolsResponses];
export type GetSymbolLetterCountsData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/dreams/symbols/letters';
};
export type GetSymbolLetterCountsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetSymbolLetterCountsError = GetSymbolLetterCountsErrors[keyof GetSymbolLetterCountsErrors];
export type GetSymbolLetterCountsResponses = {
    /**
     * Symbol counts organized by starting letter.
     */
    200: {
        /**
         * Map of starting letter to symbol count. Use to build A-Z dream dictionary navigation showing how many dream meanings exist per letter.
         */
        letters: {
            [key: string]: number;
        };
        /**
         * Total number of dream symbols in the complete dream interpretation database.
         */
        total: number;
    };
};
export type GetSymbolLetterCountsResponse = GetSymbolLetterCountsResponses[keyof GetSymbolLetterCountsResponses];
export type GetDreamSymbolData = {
    body?: never;
    path: {
        /**
         * Unique symbol identifier in kebab-case (e.g., "snake", "being-chased", "teeth-falling-out").
         */
        id: string;
    };
    query?: never;
    url: '/dreams/symbols/{id}';
};
export type GetDreamSymbolErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Symbol not found.
     */
    404: {
        /**
         * Human-readable error message. May change wording — do not parse programmatically.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier for programmatic error handling.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetDreamSymbolError = GetDreamSymbolErrors[keyof GetDreamSymbolErrors];
export type GetDreamSymbolResponses = {
    /**
     * Full dream symbol with interpretation.
     */
    200: DreamSymbol;
};
export type GetDreamSymbolResponse = GetDreamSymbolResponses[keyof GetDreamSymbolResponses];
export type GetDailyDreamSymbolData = {
    body?: {
        /**
         * Optional seed for reproducible readings. Same seed + same date = same symbol every time. Pass any unique identifier (userId, email hash, session token). Omit for anonymous daily readings.
         */
        seed?: string;
        /**
         * Date for the reading in YYYY-MM-DD format. Defaults to today (UTC). Useful for viewing past daily readings or pre-generating future ones.
         */
        date?: string;
    };
    path?: never;
    query?: never;
    url: '/dreams/daily';
};
export type GetDailyDreamSymbolErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetDailyDreamSymbolError = GetDailyDreamSymbolErrors[keyof GetDailyDreamSymbolErrors];
export type GetDailyDreamSymbolResponses = {
    /**
     * Daily dream symbol with interpretation
     */
    200: {
        /**
         * Date of the daily dream symbol in YYYY-MM-DD format (UTC). Determines which symbol is selected for seeded readings.
         */
        date: string;
        /**
         * Seed used for this daily reading. Same seed on the same date always produces the identical symbol.
         */
        seed: string;
        symbol: {
            /**
             * Unique symbol identifier in kebab-case. Use this to fetch full details via /symbols/{id}.
             */
            id: string;
            /**
             * Display name of the dream symbol.
             */
            name: string;
            /**
             * Starting letter (a-z) for alphabetical navigation.
             */
            letter: string;
            /**
             * Full psychological dream interpretation explaining the subconscious symbolism, emotional significance, and waking-life connections.
             */
            meaning: string;
        };
        /**
         * Concise daily message summarizing the dream symbol and its key themes for quick reflection.
         */
        dailyMessage: string;
    };
};
export type GetDailyDreamSymbolResponse = GetDailyDreamSymbolResponses[keyof GetDailyDreamSymbolResponses];
export type ListAngelNumbersData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
        /**
         * Maximum items to return per page. Range: 1-50, default 20.
         */
        limit?: number;
        /**
         * Number of items to skip for pagination. Default 0.
         */
        offset?: number;
        /**
         * Filter results by angel number pattern type. "repeating" returns numbers like 111, 444, 7777. "sequential" returns patterns like 1234. "mirror" returns palindrome patterns like 1212. "master" returns 11, 22, 33. "root" returns single digits 0-9.
         */
        type?: 'repeating' | 'sequential' | 'mirror' | 'master' | 'root';
    };
    url: '/angel-numbers/numbers';
};
export type ListAngelNumbersErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type ListAngelNumbersError = ListAngelNumbersErrors[keyof ListAngelNumbersErrors];
export type ListAngelNumbersResponses = {
    /**
     * List of angel numbers with summary information
     */
    200: {
        /**
         * Total number of angel numbers matching the applied filters. 43 for the full set, fewer when filtered by type.
         */
        total: number;
        /**
         * Maximum items returned per page.
         */
        limit: number;
        /**
         * Number of items skipped from the start of the result set.
         */
        offset: number;
        /**
         * Array of angel number summaries for the current page.
         */
        numbers: Array<{
            /**
             * Angel number sequence as a string. Common patterns include triple repeating (111-999), quad repeating (1111-9999), master numbers (11, 22, 33), mirror patterns (1212), and sequential numbers (1234).
             */
            number: string;
            /**
             * Short descriptive title capturing the core theme and spiritual significance of this angel number.
             */
            title: string;
            /**
             * One to two sentence summary of the divine message. Ideal for push notifications, daily guidance widgets, and quick reference lookups.
             */
            coreMessage: string;
            /**
             * Pattern classification of the angel number. "repeating" means all digits are the same (111, 4444). "sequential" means consecutive digits (1234). "mirror" means palindrome or alternating pattern (1212, 1221). "master" means numerology master number (11, 22, 33). "root" means single digit (0-9).
             */
            type: string;
            /**
             * Numerology digit root calculated by summing all digits and reducing to a single digit. Links each angel number to foundational numerology meaning. Master numbers 11, 22, 33 are preserved without further reduction.
             */
            digitRoot: number;
            /**
             * Five to eight keywords capturing the spiritual themes and energy of this angel number. Useful for search, filtering, and content generation.
             */
            keywords: Array<string>;
            /**
             * Overall energy classification. "positive" indicates encouraging, uplifting energy. "neutral" indicates transitional energy (neither purely positive nor cautionary). "cautionary" indicates a gentle warning to rebalance or pay attention.
             */
            energy: string;
        }>;
    };
};
export type ListAngelNumbersResponse = ListAngelNumbersResponses[keyof ListAngelNumbersResponses];
export type GetAngelNumberData = {
    body?: never;
    path: {
        /**
         * Angel number sequence to look up (e.g., "111", "444", "1212", "1234"). Must match an entry in the database.
         */
        number: string;
    };
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/angel-numbers/numbers/{number}';
};
export type GetAngelNumberErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Angel number not found in database
     */
    404: {
        /**
         * Human-readable error message. May change wording — do not parse programmatically.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier for programmatic error handling.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetAngelNumberError = GetAngelNumberErrors[keyof GetAngelNumberErrors];
export type GetAngelNumberResponses = {
    /**
     * Complete angel number meaning with all interpretations
     */
    200: {
        /**
         * Angel number sequence as a string. Common patterns include triple repeating (111-999), quad repeating (1111-9999), master numbers (11, 22, 33), mirror patterns (1212), and sequential numbers (1234).
         */
        number: string;
        /**
         * Short descriptive title capturing the core theme and spiritual significance of this angel number.
         */
        title: string;
        /**
         * One to two sentence summary of the divine message. Ideal for push notifications, daily guidance widgets, and quick reference lookups.
         */
        coreMessage: string;
        /**
         * Pattern classification of the angel number. "repeating" means all digits are the same (111, 4444). "sequential" means consecutive digits (1234). "mirror" means palindrome or alternating pattern (1212, 1221). "master" means numerology master number (11, 22, 33). "root" means single digit (0-9).
         */
        type: string;
        /**
         * Numerology digit root calculated by summing all digits and reducing to a single digit. Links each angel number to foundational numerology meaning. Master numbers 11, 22, 33 are preserved without further reduction.
         */
        digitRoot: number;
        /**
         * Five to eight keywords capturing the spiritual themes and energy of this angel number. Useful for search, filtering, and content generation.
         */
        keywords: Array<string>;
        /**
         * Overall energy classification. "positive" indicates encouraging, uplifting energy. "neutral" indicates transitional energy (neither purely positive nor cautionary). "cautionary" indicates a gentle warning to rebalance or pay attention.
         */
        energy: string;
        meaning: {
            /**
             * Two to three paragraph spiritual interpretation covering divine guidance, higher purpose, and the metaphysical significance of this angel number sequence.
             */
            spiritual: string;
            /**
             * Love and relationship interpretation covering singles, couples, and those healing from past relationships. Includes romantic guidance and partnership advice.
             */
            love: string;
            /**
             * Career and financial guidance including professional opportunities, money mindset, and practical advice for work life aligned with this angel number energy.
             */
            career: string;
            /**
             * Twin flame connection interpretation covering union, separation, and spiritual growth within the twin flame journey.
             */
            twinFlame: string;
        };
        /**
         * Positive affirmation aligned with this angel number. Can be used for daily affirmation features, meditation guidance, or spiritual journal prompts.
         */
        affirmation: string;
        /**
         * Three to five specific, actionable steps to take when you see this angel number. Practical spiritual guidance for daily life.
         */
        actionSteps: Array<string>;
    };
};
export type GetAngelNumberResponse = GetAngelNumberResponses[keyof GetAngelNumberResponses];
export type AnalyzeNumberSequenceData = {
    body?: never;
    path?: never;
    query: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
        /**
         * Number sequence to analyze (1-8 digits). Can be any number the user has encountered: clock times (1111), addresses (717), receipts (888), license plates (4444), or any repeating pattern.
         */
        number: string;
    };
    url: '/angel-numbers/lookup';
};
export type AnalyzeNumberSequenceErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type AnalyzeNumberSequenceError = AnalyzeNumberSequenceErrors[keyof AnalyzeNumberSequenceErrors];
export type AnalyzeNumberSequenceResponses = {
    /**
     * Complete analysis of the number sequence with pattern classification and meaning
     */
    200: {
        /**
         * The number sequence that was analyzed.
         */
        number: string;
        /**
         * Pattern classification detected for this number. "repeating" means all same digits. "sequential" means consecutive ascending or descending. "mirror" means palindrome or alternating pattern. "master" means numerology master number. "root" means single digit.
         */
        type: string;
        /**
         * Numerology digit root from summing and reducing all digits. Links to foundational single-digit meaning. Master numbers 11, 22, 33 are preserved.
         */
        digitRoot: number;
        /**
         * Total number of digits in the sequence.
         */
        digits: number;
        /**
         * Count of unique digits. A repeating number like 111 has 1 unique digit; 1234 has 4.
         */
        uniqueDigits: number;
        /**
         * Whether the number reads the same forwards and backwards (e.g., 1221, 1001).
         */
        isPalindrome: boolean;
        /**
         * Whether all digits are identical (e.g., 111, 4444, 777).
         */
        isRepeating: boolean;
        /**
         * Full angel number meaning if this number exists in the database (43 known numbers). Null if the number is not in the database, in which case use the analysis fields (type, digitRoot) for interpretation.
         */
        knownMeaning: {
            /**
             * Title of the matched angel number meaning.
             */
            title: string;
            /**
             * Core message summary.
             */
            coreMessage: string;
            /**
             * Energy classification (positive, neutral, cautionary).
             */
            energy: string;
            /**
             * Keywords for this angel number.
             */
            keywords: Array<string>;
            /**
             * Detailed interpretations across four life areas: spiritual, love, career, and twin flame.
             */
            meaning: {
                /**
                 * Spiritual interpretation covering divine guidance, higher purpose, and metaphysical significance.
                 */
                spiritual: string;
                /**
                 * Love and relationship interpretation for singles, couples, and those healing from past relationships.
                 */
                love: string;
                /**
                 * Career and financial guidance including professional opportunities and money mindset.
                 */
                career: string;
                /**
                 * Twin flame connection interpretation covering union, separation, and spiritual growth.
                 */
                twinFlame: string;
            };
            /**
             * Positive affirmation for this number.
             */
            affirmation: string;
            /**
             * Actionable steps when you see this number.
             */
            actionSteps: Array<string>;
        };
        /**
         * The foundational meaning of this number based on its digit root. Every number reduces to a root digit (0-9) or master number (11, 22, 33), which provides the base interpretation even for unknown sequences.
         */
        digitRootMeaning: {
            /**
             * Root digit number (0-9) or master number (11, 22, 33).
             */
            number: string;
            /**
             * Title of the root digit meaning in numerology.
             */
            title: string;
            /**
             * Core message of the foundational root digit.
             */
            coreMessage: string;
        };
    };
};
export type AnalyzeNumberSequenceResponse = AnalyzeNumberSequenceResponses[keyof AnalyzeNumberSequenceResponses];
export type GetDailyAngelNumberData = {
    body?: {
        /**
         * Optional seed for reproducible readings. Same seed + same date = same angel number every time. Pass any unique identifier (userId, email hash, session token). Omit for anonymous daily readings.
         */
        seed?: string;
        /**
         * Date for the reading in YYYY-MM-DD format. Defaults to today (UTC). Useful for viewing past daily readings or pre-generating future ones.
         */
        date?: string;
    };
    path?: never;
    query?: {
        /**
         * Response language (ISO 639-1). Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. Languages without translations yet return English.
         */
        lang?: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
    };
    url: '/angel-numbers/daily';
};
export type GetDailyAngelNumberErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetDailyAngelNumberError = GetDailyAngelNumberErrors[keyof GetDailyAngelNumberErrors];
export type GetDailyAngelNumberResponses = {
    /**
     * Daily angel number with complete interpretation
     */
    200: {
        /**
         * The date used for angel number selection (UTC).
         */
        date: string;
        /**
         * Computed seed used for this reading. Same seed always produces the same angel number.
         */
        seed: string;
        /**
         * Angel number sequence selected for today. Three or more digit repeating, sequential, or mirror pattern (e.g., 111, 444, 1212).
         */
        number: string;
        /**
         * Short descriptive title capturing the core theme and spiritual significance of the daily angel number.
         */
        title: string;
        /**
         * One to two sentence summary of the divine message for today. Ideal for push notifications, daily guidance widgets, and quick reference.
         */
        coreMessage: string;
        /**
         * Pattern classification of the daily angel number. "repeating" means all digits are the same (111, 4444). "sequential" means consecutive digits (1234). "mirror" means palindrome or alternating pattern (1212, 1221).
         */
        type: string;
        /**
         * Numerology digit root calculated by summing all digits and reducing to a single digit. Links the daily angel number to its foundational numerology meaning.
         */
        digitRoot: number;
        /**
         * Overall energy classification. "positive" indicates encouraging, uplifting energy. "neutral" indicates transitional energy. "cautionary" indicates a gentle warning to rebalance or pay attention.
         */
        energy: string;
        /**
         * Detailed interpretations across four life areas for the daily angel number.
         */
        meaning: {
            /**
             * Two to three paragraph spiritual interpretation covering divine guidance, higher purpose, and the metaphysical significance of the angel number selected for this date.
             */
            spiritual: string;
            /**
             * Love and relationship interpretation covering singles, couples, and those healing from past relationships. Includes romantic guidance and partnership advice.
             */
            love: string;
            /**
             * Career and financial guidance including professional opportunities, money mindset, and practical advice for work life.
             */
            career: string;
            /**
             * Twin flame connection interpretation covering union, separation, and spiritual growth within the twin flame journey.
             */
            twinFlame: string;
        };
        /**
         * Five to eight keywords capturing the spiritual themes and energy of the daily angel number. Useful for search, filtering, and content generation.
         */
        keywords: Array<string>;
        /**
         * Positive affirmation aligned with the daily angel number. Use for daily affirmation features, meditation guidance, or spiritual journal prompts.
         */
        affirmation: string;
        /**
         * Three to five specific, actionable steps to take today based on the angel number guidance. Practical spiritual advice for daily life.
         */
        actionSteps: Array<string>;
    };
};
export type GetDailyAngelNumberResponse = GetDailyAngelNumberResponses[keyof GetDailyAngelNumberResponses];
export type SearchCitiesData = {
    body?: never;
    path?: never;
    query: {
        /**
         * City name to search for. Accepts bare city ("berlin"), city plus country ("berlin germany"), or comma-qualified ("berlin, germany", "springfield, illinois") for disambiguation. Matches against city name, province/state, or combined "city country" queries. Case-insensitive with partial matching (e.g. "ber" matches Berlin, Bern, Bergen).
         */
        q: string;
        /**
         * Maximum items to return per page. Range: 1-50, default 10.
         */
        limit?: number;
        /**
         * Number of items to skip for pagination. Default 0.
         */
        offset?: number;
    };
    url: '/location/search';
};
export type SearchCitiesErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type SearchCitiesError = SearchCitiesErrors[keyof SearchCitiesErrors];
export type SearchCitiesResponses = {
    /**
     * Matching cities sorted by relevance (prefix match first) then population
     */
    200: {
        /**
         * Total number of cities matching the search query.
         */
        total: number;
        /**
         * Page size used for this response.
         */
        limit: number;
        /**
         * Number of cities skipped. Use with limit for pagination.
         */
        offset: number;
        /**
         * City results for the current page, sorted by relevance (prefix match first) then population.
         */
        cities: Array<{
            /**
             * City name as commonly used. Matches the local or internationally recognized name for the location.
             */
            city: string;
            /**
             * State, province, canton, or administrative region. Helps disambiguate cities with the same name across regions (e.g. Springfield IL vs Springfield MO).
             */
            province: string;
            /**
             * Full country name in English.
             */
            country: string;
            /**
             * ISO 3166-1 alpha-2 country code. Use for filtering cities by country or building country-specific location pickers.
             */
            iso2: string;
            /**
             * Geographic latitude in decimal degrees (-90 to 90). Pass directly to birth chart, natal chart, horoscope, synastry, transit, kundli, and panchang API endpoints as the latitude parameter.
             */
            latitude: number;
            /**
             * Geographic longitude in decimal degrees (-180 to 180). Pass directly to astrology, horoscope, and panchang API endpoints alongside latitude.
             */
            longitude: number;
            /**
             * IANA timezone identifier following the tz database standard (e.g. Europe/Berlin, America/New_York, Asia/Tokyo). Use with JavaScript Date, Luxon, day.js, or any date library for accurate local time conversion.
             */
            timezone: string;
            /**
             * Current UTC offset in decimal hours, automatically adjusted for daylight saving time. Pass directly as the timezone parameter in astrology API endpoints. Examples: 1 for CET, 2 for CEST, -5 for EST, 5.5 for IST, 5.75 for Nepal.
             */
            utcOffset: number;
            /**
             * City population estimate from geographic databases. Larger cities rank higher in search results, ensuring major metropolitan areas appear first in autocomplete suggestions.
             */
            population: number;
        }>;
    };
};
export type SearchCitiesResponse = SearchCitiesResponses[keyof SearchCitiesResponses];
export type ListCountriesData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Maximum items to return per page. Range: 1-50, default 50.
         */
        limit?: number;
        /**
         * Number of items to skip for pagination. Default 0.
         */
        offset?: number;
    };
    url: '/location/countries';
};
export type ListCountriesErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type ListCountriesError = ListCountriesErrors[keyof ListCountriesErrors];
export type ListCountriesResponses = {
    /**
     * Alphabetically sorted list of all countries with ISO codes and city counts
     */
    200: {
        /**
         * Total number of countries available.
         */
        total: number;
        /**
         * Page size used for this response.
         */
        limit: number;
        /**
         * Number of countries skipped. Use with limit for pagination.
         */
        offset: number;
        /**
         * Countries for the current page, sorted alphabetically by name.
         */
        countries: Array<{
            /**
             * Full country name in English. Use for display in location pickers and dropdown menus.
             */
            name: string;
            /**
             * ISO 3166-1 alpha-2 country code. Use as the identifier when fetching cities for a specific country via the /countries/{iso2} endpoint.
             */
            iso2: string;
            /**
             * ISO 3166-1 alpha-3 country code. Three-letter standard used in international data exchange.
             */
            iso3: string;
            /**
             * Number of searchable cities available for this country. Useful for showing coverage in UI or deciding whether to offer city search for a given country.
             */
            cityCount: number;
        }>;
    };
};
export type ListCountriesResponse = ListCountriesResponses[keyof ListCountriesResponses];
export type GetCitiesByCountryData = {
    body?: never;
    path: {
        /**
         * ISO 3166-1 alpha-2 country code, case-insensitive. Common codes: DE (Germany), FR (France), GB (United Kingdom), US (United States), ES (Spain), IT (Italy), NL (Netherlands), IN (India), BR (Brazil), JP (Japan).
         */
        iso2: string;
    };
    query?: {
        /**
         * Maximum items to return per page. Range: 1-200, default 50.
         */
        limit?: number;
        /**
         * Number of items to skip for pagination. Default 0.
         */
        offset?: number;
    };
    url: '/location/countries/{iso2}';
};
export type GetCitiesByCountryErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetCitiesByCountryError = GetCitiesByCountryErrors[keyof GetCitiesByCountryErrors];
export type GetCitiesByCountryResponses = {
    /**
     * Cities in the specified country, sorted by population (largest first)
     */
    200: {
        /**
         * Total number of cities available for this country.
         */
        total: number;
        /**
         * Page size used for this response.
         */
        limit: number;
        /**
         * Number of cities skipped. Use with limit for pagination.
         */
        offset: number;
        /**
         * Cities for the current page, sorted by population (largest first).
         */
        cities: Array<{
            /**
             * City name as commonly used. Matches the local or internationally recognized name for the location.
             */
            city: string;
            /**
             * State, province, canton, or administrative region. Helps disambiguate cities with the same name across regions (e.g. Springfield IL vs Springfield MO).
             */
            province: string;
            /**
             * Full country name in English.
             */
            country: string;
            /**
             * ISO 3166-1 alpha-2 country code. Use for filtering cities by country or building country-specific location pickers.
             */
            iso2: string;
            /**
             * Geographic latitude in decimal degrees (-90 to 90). Pass directly to birth chart, natal chart, horoscope, synastry, transit, kundli, and panchang API endpoints as the latitude parameter.
             */
            latitude: number;
            /**
             * Geographic longitude in decimal degrees (-180 to 180). Pass directly to astrology, horoscope, and panchang API endpoints alongside latitude.
             */
            longitude: number;
            /**
             * IANA timezone identifier following the tz database standard (e.g. Europe/Berlin, America/New_York, Asia/Tokyo). Use with JavaScript Date, Luxon, day.js, or any date library for accurate local time conversion.
             */
            timezone: string;
            /**
             * Current UTC offset in decimal hours, automatically adjusted for daylight saving time. Pass directly as the timezone parameter in astrology API endpoints. Examples: 1 for CET, 2 for CEST, -5 for EST, 5.5 for IST, 5.75 for Nepal.
             */
            utcOffset: number;
            /**
             * City population estimate from geographic databases. Larger cities rank higher in search results, ensuring major metropolitan areas appear first in autocomplete suggestions.
             */
            population: number;
        }>;
    };
};
export type GetCitiesByCountryResponse = GetCitiesByCountryResponses[keyof GetCitiesByCountryResponses];
export type GetUsageStatsData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/usage';
};
export type GetUsageStatsErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Subscription not found
     */
    404: {
        error: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type GetUsageStatsError = GetUsageStatsErrors[keyof GetUsageStatsErrors];
export type GetUsageStatsResponses = {
    /**
     * Usage statistics retrieved
     */
    200: {
        plan: string;
        usedThisMonth: number;
        requestsPerMonth: number;
        remainingThisMonth: number;
        email: string;
        status: string;
        endDate: string;
    };
};
export type GetUsageStatsResponse = GetUsageStatsResponses[keyof GetUsageStatsResponses];
export type ListLanguagesData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/languages';
};
export type ListLanguagesErrors = {
    /**
     * Validation error. `issues[]` lists every failed field.
     */
    400: {
        /**
         * First issue summary.
         */
        error: string;
        code: 'validation_error';
        /**
         * Every validation failure. Use this to rebuild a valid request.
         */
        issues: Array<{
            /**
             * Dot-separated field path, or "(root)" for top-level.
             */
            path: string;
            message: string;
            /**
             * Zod issue code (invalid_type, too_small, too_big, invalid_string, ...).
             */
            code?: string;
            /**
             * Expected type for invalid_type.
             */
            expected?: string;
            /**
             * Minimum bound for too_small issues.
             */
            minimum?: number | string;
            /**
             * Maximum bound for too_big issues.
             */
            maximum?: number | string;
            inclusive?: boolean;
            /**
             * Format name for string issues (regex, email, url, uuid).
             */
            format?: string;
            /**
             * Regex pattern when format is regex.
             */
            pattern?: string;
        }>;
    };
    /**
     * Invalid or missing API key
     */
    401: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Method not allowed. The path exists but only responds to the methods listed in `allow[]` and the `Allow` response header.
     */
    405: {
        error: string;
        code: 'method_not_allowed';
        /**
         * Allowed HTTP methods for this path. Mirrors the Allow response header.
         */
        allow: Array<string>;
        /**
         * Link to the product page for this domain.
         */
        docs?: string;
    };
    /**
     * Monthly rate limit exceeded
     */
    429: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
    /**
     * Internal server error
     */
    500: {
        /**
         * Human-readable error message. May change wording.
         */
        error: string;
        /**
         * Machine-readable error code. Stable identifier.
         */
        code: string;
    };
};
export type ListLanguagesError = ListLanguagesErrors[keyof ListLanguagesErrors];
export type ListLanguagesResponses = {
    /**
     * Supported languages
     */
    200: {
        /**
         * All language codes accepted by the `lang` query parameter.
         */
        languages: Array<{
            /**
             * ISO 639-1 language code. Pass this value as the `lang` query parameter.
             */
            code: 'en' | 'tr' | 'de' | 'es' | 'hi' | 'pt' | 'fr' | 'ru';
            /**
             * Language name in English.
             */
            name: string;
            /**
             * Language name written in the language itself.
             */
            nativeName: string;
        }>;
    };
};
export type ListLanguagesResponse = ListLanguagesResponses[keyof ListLanguagesResponses];
//# sourceMappingURL=types.gen.d.ts.map