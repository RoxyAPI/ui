/**
 * Sample data for every component, shaped to match the live RoxyAPI
 * response schemas. Used by the preview server, Playwright e2e, and
 * manual eyeballing.
 */

const samples = {
	natal: {
		planets: [
			{ name: 'Sun', longitude: 295.5, sign: 'Capricorn', degree: 25.5 },
			{ name: 'Moon', longitude: 134.2, sign: 'Leo', degree: 14.2 },
			{ name: 'Mercury', longitude: 280.1, sign: 'Capricorn', degree: 10.1 },
			{ name: 'Venus', longitude: 320.7, sign: 'Aquarius', degree: 20.7 },
			{ name: 'Mars', longitude: 78.4, sign: 'Gemini', degree: 18.4 },
			{ name: 'Jupiter', longitude: 65.0, sign: 'Taurus', degree: 5.0 },
			{ name: 'Saturn', longitude: 350.2, sign: 'Pisces', degree: 20.2 },
		],
		aspects: [
			{ planet1: 'Sun', planet2: 'Moon', aspect: 'opposition', orb: 5.3 },
			{ planet1: 'Mercury', planet2: 'Venus', aspect: 'sextile', orb: 2.1 },
			{ planet1: 'Mars', planet2: 'Saturn', aspect: 'square', orb: 1.8 },
		],
		houses: [],
		ascendant: 12.5,
		midheaven: 102.3,
		birthDetails: { date: '1990-01-15', time: '14:30', location: 'New Delhi' },
	},
	horoscope: {
		sign: 'aries',
		date: '2026-05-09',
		overview:
			'A focused day brings clarity to a long-running question. Trust the slow channel.',
		love: 'Patient communication wins. Lead with curiosity.',
		career: 'A small task reveals a large opportunity.',
		health: 'Physical energy crests around midday.',
		finance: 'Avoid impulse buys.',
		advice: 'Follow through on one thing rather than starting three.',
		luckyNumber: 7,
		luckyColor: 'amber',
		compatibleSigns: ['leo', 'sagittarius'],
		moonSign: 'Libra',
		moonPhase: 'waxing crescent',
		energyRating: 8,
	},
	synastry: {
		compatibilityScore: 78,
		summary:
			'A grounded match with strong communication. Mind the structure tension between Saturn and Mars.',
		interAspects: [
			{
				planet1: 'Sun',
				planet2: 'Moon',
				aspect: 'trine',
				orb: 2.4,
				strength: 'strong',
			},
			{
				planet1: 'Venus',
				planet2: 'Mars',
				aspect: 'sextile',
				orb: 4.1,
				strength: 'moderate',
			},
			{
				planet1: 'Saturn',
				planet2: 'Mars',
				aspect: 'square',
				orb: 6.7,
				strength: 'mild',
			},
		],
		strengths: ['Shared values', 'Easy emotional rhythm'],
		challenges: ['Different pacing', 'Conflict resolution style'],
		person1: {
			planets: [
				{ name: 'Sun', longitude: 12 },
				{ name: 'Moon', longitude: 200 },
				{ name: 'Venus', longitude: 320 },
			],
		},
		person2: {
			planets: [
				{ name: 'Sun', longitude: 200 },
				{ name: 'Moon', longitude: 12 },
				{ name: 'Mars', longitude: 250 },
			],
		},
	},
	compat: {
		overallScore: 86,
		rating: 'High match',
		emotional: 88,
		communication: 84,
		romance: 86,
		strengths: ['Easy emotional resonance', 'Shared long-term goals'],
		challenges: ['Different pacing on big decisions'],
		relationshipArchetype: 'The steady duo',
		advice: 'Make space for both spontaneity and structure.',
	},
	moon: {
		phase: 'waxing crescent',
		illumination: 0.32,
		age: 4.2,
		sign: 'Taurus',
		degree: 14.7,
		distance: 384400,
		date: '2026-05-09',
		meaning: {
			name: 'Waxing crescent',
			symbol: '🌒',
			description: 'A time for slow, steady growth. Begin small commitments.',
			keywords: ['growth', 'patience', 'beginnings'],
		},
	},
	kundli: {
		meta: {
			Sun: {
				graha: 'Sun',
				rashi: 'Capricorn',
				longitude: 295.5,
				nakshatra: 'Shravana',
				isRetrograde: false,
			},
			Moon: {
				graha: 'Moon',
				rashi: 'Leo',
				longitude: 134.2,
				nakshatra: 'Magha',
				isRetrograde: false,
			},
			Mars: {
				graha: 'Mars',
				rashi: 'Gemini',
				longitude: 78.4,
				nakshatra: 'Ardra',
				isRetrograde: false,
			},
			Mercury: { graha: 'Mercury', rashi: 'Capricorn', longitude: 280.1 },
			Jupiter: { graha: 'Jupiter', rashi: 'Taurus', longitude: 65.0 },
			Venus: { graha: 'Venus', rashi: 'Aquarius', longitude: 320.7 },
			Saturn: { graha: 'Saturn', rashi: 'Pisces', longitude: 350.2 },
		},
		aries: { rashi: 'Aries', signs: [] },
		taurus: {
			rashi: 'Taurus',
			signs: [{ planet: 'Jupiter', longitude: 65.0 }],
		},
		gemini: { rashi: 'Gemini', signs: [{ planet: 'Mars', longitude: 78.4 }] },
		cancer: { rashi: 'Cancer', signs: [] },
		leo: { rashi: 'Leo', signs: [{ planet: 'Moon', longitude: 134.2 }] },
		virgo: { rashi: 'Virgo', signs: [] },
		libra: { rashi: 'Libra', signs: [] },
		scorpio: { rashi: 'Scorpio', signs: [] },
		sagittarius: { rashi: 'Sagittarius', signs: [] },
		capricorn: {
			rashi: 'Capricorn',
			signs: [
				{ planet: 'Sun', longitude: 295.5 },
				{ planet: 'Mercury', longitude: 280.1 },
			],
		},
		aquarius: {
			rashi: 'Aquarius',
			signs: [{ planet: 'Venus', longitude: 320.7 }],
		},
		pisces: {
			rashi: 'Pisces',
			signs: [{ planet: 'Saturn', longitude: 350.2 }],
		},
	},
	panchang: {
		date: '2026-05-09',
		location: { name: 'Mumbai', latitude: 19.07, longitude: 72.87 },
		vara: 'Saturday',
		sunrise: '06:08',
		sunset: '19:01',
		moonrise: '08:42',
		moonset: '21:27',
		sunSign: 'Taurus',
		moonSign: 'Gemini',
		tithi: { name: 'Shukla Tritiya', phase: 'Waxing' },
		nakshatra: { name: 'Rohini', lord: 'Moon' },
		yoga: { name: 'Saubhagya' },
		karana: { name: 'Bava' },
		hora: 'Saturn',
		rahuKaal: { start: '09:00', end: '10:30' },
		yamaganda: { start: '13:30', end: '15:00' },
		gulika: { start: '06:00', end: '07:30' },
		abhijitMuhurta: { start: '11:50', end: '12:36' },
		brahmaMuhurta: { start: '04:32', end: '05:20' },
		vijayaMuhurta: { start: '14:10', end: '14:55' },
		nishitaMuhurta: { start: '23:54', end: '00:38' },
		godhuliMuhurta: { start: '18:45', end: '19:09' },
		pratahSandhya: { start: '05:48', end: '06:28' },
		sayahnaSandhya: { start: '18:51', end: '19:21' },
	},
	dasha: {
		moonNakshatra: 'Magha',
		nakshatraName: 'Magha',
		nakshatraLord: 'Ketu',
		mahadasha: { lord: 'Ketu' },
		antardasha: { lord: 'Venus' },
		pratyantardasha: { lord: 'Mercury' },
		remainingInMahadasha: 4.2,
		remainingInAntardasha: 1.4,
		remainingInPratyantardasha: 0.18,
		mahadashas: [
			{
				lord: 'Ketu',
				startDate: '1988-01-01',
				endDate: '1995-01-01',
				durationYears: 7,
			},
			{
				lord: 'Venus',
				startDate: '1995-01-01',
				endDate: '2015-01-01',
				durationYears: 20,
			},
			{
				lord: 'Sun',
				startDate: '2015-01-01',
				endDate: '2021-01-01',
				durationYears: 6,
			},
			{
				lord: 'Moon',
				startDate: '2021-01-01',
				endDate: '2031-01-01',
				durationYears: 10,
			},
			{
				lord: 'Mars',
				startDate: '2031-01-01',
				endDate: '2038-01-01',
				durationYears: 7,
			},
			{
				lord: 'Rahu',
				startDate: '2038-01-01',
				endDate: '2056-01-01',
				durationYears: 18,
			},
			{
				lord: 'Jupiter',
				startDate: '2056-01-01',
				endDate: '2072-01-01',
				durationYears: 16,
			},
			{
				lord: 'Saturn',
				startDate: '2072-01-01',
				endDate: '2091-01-01',
				durationYears: 19,
			},
			{
				lord: 'Mercury',
				startDate: '2091-01-01',
				endDate: '2108-01-01',
				durationYears: 17,
			},
		],
		totalYears: 120,
	},
	dosha: {
		present: true,
		severity: 'Moderate',
		description:
			'Mangal occupies the 7th house from Lagna. Standard kundli matching applies.',
		exceptions: ['Mars in own sign', 'Mars aspected by Jupiter'],
		remedies: [
			'Mangal Shanti puja',
			'Recitation of Hanuman Chalisa',
			'Donation of red lentils on Tuesdays',
		],
		effects: {
			marriage:
				'Possible delays. Match with another Manglik native is traditionally recommended.',
			personality: 'Strong willpower with occasional impatience.',
			timing: 'Marriage windows open after 28.',
		},
	},
	guna: {
		total: 28,
		maxScore: 36,
		percentage: 78,
		isCompatible: true,
		recommendation: 'Recommended match',
		breakdown: [
			{ name: 'Varna', score: 1, max: 1 },
			{ name: 'Vasya', score: 2, max: 2 },
			{ name: 'Tara', score: 3, max: 3 },
			{ name: 'Yoni', score: 3, max: 4 },
			{ name: 'Maitri', score: 4, max: 5 },
			{ name: 'Gana', score: 6, max: 6 },
			{ name: 'Bhakoot', score: 7, max: 7 },
			{ name: 'Nadi', score: 2, max: 8 },
		],
		doshas: ['Nadi mismatch'],
		doshaCancellations: ['Same nakshatra exception'],
	},
	kp: {
		ayanamsa: 24.124,
		planets: [
			{
				planet: 'Sun',
				sign: 'Capricorn',
				signLord: 'Saturn',
				nakshatra: 'Shravana',
				starLord: 'Moon',
				subLord: 'Saturn',
				subSubLord: 'Venus',
				kpNumber: 8,
			},
			{
				planet: 'Moon',
				sign: 'Leo',
				signLord: 'Sun',
				nakshatra: 'Magha',
				starLord: 'Ketu',
				subLord: 'Venus',
				subSubLord: 'Mercury',
				kpNumber: 5,
			},
			{
				planet: 'Mercury',
				sign: 'Capricorn',
				signLord: 'Saturn',
				nakshatra: 'Shravana',
				starLord: 'Moon',
				subLord: 'Mars',
				subSubLord: 'Jupiter',
				kpNumber: 8,
			},
			{
				planet: 'Venus',
				sign: 'Aquarius',
				signLord: 'Saturn',
				nakshatra: 'Shatabhisha',
				starLord: 'Rahu',
				subLord: 'Sun',
				subSubLord: 'Moon',
				kpNumber: 9,
			},
			{
				planet: 'Mars',
				sign: 'Gemini',
				signLord: 'Mercury',
				nakshatra: 'Ardra',
				starLord: 'Rahu',
				subLord: 'Mercury',
				subSubLord: 'Mars',
				kpNumber: 3,
			},
			{
				planet: 'Jupiter',
				sign: 'Taurus',
				signLord: 'Venus',
				nakshatra: 'Krittika',
				starLord: 'Sun',
				subLord: 'Saturn',
				subSubLord: 'Mercury',
				kpNumber: 2,
			},
			{
				planet: 'Saturn',
				sign: 'Pisces',
				signLord: 'Jupiter',
				nakshatra: 'Revati',
				starLord: 'Mercury',
				subLord: 'Jupiter',
				subSubLord: 'Mars',
				kpNumber: 12,
				retrograde: true,
			},
		],
	},
	num: {
		number: 7,
		calculation:
			'1+9+9+0 + 0+1 + 1+5 = 26 -> 8 (with master check) -> reduces to 7',
		type: 'single',
		hasKarmicDebt: false,
		meaning:
			'The seeker. Reflective and analytical. Drawn to research, philosophy, and inner work.',
	},
	tarot: {
		date: '2026-05-09',
		seed: 'demo-seed',
		card: {
			id: 'the-fool',
			name: 'The Fool',
			arcana: 'major',
			number: 0,
			position: 'upright',
			reversed: false,
			keywords: ['new beginnings', 'innocence', 'spontaneity', 'leap of faith'],
			meaning:
				'A new chapter opens. Step forward with curiosity rather than caution.',
			imageUrl:
				'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/RWS_Tarot_00_Fool.jpg/256px-RWS_Tarot_00_Fool.jpg',
		},
		dailyMessage: 'Embrace the unknown today. The path appears as you walk it.',
	},
	spread: {
		spread: 'three-card',
		positions: [
			{
				label: 'Past',
				card: {
					name: 'The Hermit',
					arcana: 'major',
					keywords: ['solitude'],
					imageUrl: '',
				},
				interpretation: 'A period of inward focus has shaped your direction.',
			},
			{
				label: 'Present',
				card: {
					name: 'The Star',
					arcana: 'major',
					keywords: ['hope', 'renewal'],
					imageUrl: '',
				},
				interpretation: 'Renewal is at hand. Quiet hope returns.',
			},
			{
				label: 'Future',
				card: {
					name: 'Wheel of Fortune',
					arcana: 'major',
					keywords: ['turning point'],
					imageUrl: '',
				},
				interpretation: 'A turning point arrives within the next cycle.',
			},
		],
		reading:
			'A turn from solitude to clarity, then to a meaningful change. Trust the unfolding.',
	},
	bio: {
		birthDate: '1990-01-15',
		targetDate: '2026-05-09',
		daysSinceBirth: 13265,
		cycles: {
			physical: 0.87,
			emotional: -0.42,
			intellectual: 0.66,
			intuitive: 0.21,
			aesthetic: -0.13,
			awareness: 0.55,
			spiritual: -0.78,
			passion: 0.34,
			mastery: 0.42,
			wisdom: 0.18,
		},
		energyRating: 7,
		overallPhase: 'Mid-cycle',
		interpretation:
			'Strong physical energy with a softer emotional surface. Pace yourself.',
		advice:
			'Lead with physical activity in the morning, save delicate conversations for the evening.',
		criticalAlerts: [],
	},
	hex: {
		number: 1,
		symbol: '䷀',
		chinese: '乾',
		english: 'The Creative',
		pinyin: 'Qián',
		upperTrigram: 'heaven',
		lowerTrigram: 'heaven',
		judgment: 'Sublime success comes through perseverance.',
		image:
			'Heaven moves with strength. The superior person makes themselves strong without rest.',
		interpretation: {
			general: 'Pure creative force. A time of leadership and initiative.',
			love: 'Direct expression strengthens the bond.',
			career: 'Take initiative. Your effort multiplies.',
			decision: 'Move forward with discipline.',
			advice: 'Pair vision with patience.',
		},
	},
	form: null,
	loc: null,
	data: {
		title: 'Sample API response',
		summary:
			'A typical RoxyAPI response shaped for the generic fallback renderer.',
		score: 87,
		ranges: ['low', 'medium', 'high'],
		breakdown: [
			{ name: 'Communication', score: 88 },
			{ name: 'Trust', score: 84 },
			{ name: 'Shared values', score: 92 },
		],
	},
};

for (const id of Object.keys(samples)) {
	const el = document.getElementById(id);
	if (el && samples[id] !== null) {
		el.data = samples[id];
	}
}

// Wire location-search submit so the demo shows the event
const loc = document.getElementById('loc');
if (loc) {
	loc.addEventListener('roxy-location-select', (e) => {
		console.log('Selected city:', e.detail);
	});
}
