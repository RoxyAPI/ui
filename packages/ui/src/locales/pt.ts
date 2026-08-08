/**
 * Portuguese chrome strings.
 *
 * @remarks
 * Importing this module registers the catalogue and re-renders every mounted component, so it is a side-effect entry, exactly like a `components/*` module. It is built to `dist/locales/pt.js` and `dist/cdn/locales/pt.js` as its OWN payload rather than compiled into the components, so an English site downloads none of it.
 *
 * Keyed by the English source string as it appears at the call site, so this file diffs directly against the component that renders it and no key vocabulary has to be kept in sync with the copy.
 *
 * One catalogue serves both markets, and where Brazil and Portugal genuinely differ it follows Brazilian usage, which is the larger astrology readership: `orbe` rather than the `órbitas` in the European translation of Astrodienst, `tensos` rather than `desarmoniosos`, and `Áries` rather than the European `Carneiro`. Regional tags resolve here, so `pt-BR` and `pt-PT` both read this file.
 *
 * **`Natal` is Portuguese, not an untranslated fallthrough**: `mapa natal`, `Vênus natal`, `casa natal` are standard, and the spelling coincides with the English.
 *
 * **`Aplicativo` also means "mobile app" in Brazilian Portuguese, and it is still the right word here.** It is what both sourced glossaries print for an applying aspect, it is paired with `Separativo` in the same row, and the reader is a working astrologer. Do not swap in an app-free synonym.
 *
 * Rejected against sources, so nobody restores them: `Em aplicação`/`Em separação` and `Aproximando`/`Afastando` for the aspect pair (phrases and plain motion verbs, not the glossary terms), `anel interno`/`anel externo` for the rings (a literal rendering of "ring" with zero astrological attestation) and `roda interna`/`roda externa` (collides with `roda`, which already names the whole wheel), `casas iguais` for the equal-sector fallback (that names a house SYSTEM, and the fallback fires precisely because no cusps came back), `exatidão` for the strength score (this catalogue already spends that word on aspect tightness, and collapsing two different measures into one word is drift), and `Timing` for the timing paragraph (business jargon in Brazil, never an astrological term).
 *
 * Two gaps, stated rather than papered over. **`Bi-wheel` has no Portuguese noun**: `roda dupla` returns nothing in Portuguese astrology, so nothing was coined; the two entries that need it name the chart and let the inner and outer clause carry the meaning. **`Transiting house` has none either**: Portuguese writes it as a whole clause, and `casa transitada` is Spanish, not Portuguese, so `Casa em trânsito` is a plain construction built on the attested modifier `em trânsito`. A normalized 0-100 aspect strength has no Portuguese term of art at all.
 */

import type { ChromeString } from '../i18n/chrome-strings.js';
import { registerLocale } from '../i18n/registry.js';

export const pt: Record<ChromeString, string> = {
	'Edit query': 'Editar consulta',
	'Spiritual data by RoxyAPI': 'Dados espirituais por RoxyAPI',
	'No data': 'Sem dados',
	Loading: 'Carregando',
	Reading: 'Interpretação',

	'Natal chart': 'Mapa natal',
	'Relocation chart': 'Mapa de relocação',
	'No chart data': 'Sem dados do mapa',
	Wheel: 'Roda',
	'Aspect grid': 'Tabela de aspectos',
	'Natal chart views': 'Visões do mapa natal',
	'Natal chart wheel': 'Roda astrológica',
	'Natal chart wheel with twelve houses, planets, and aspects':
		'Roda astrológica com doze casas, planetas e aspectos',
	'Natal chart wheel with planets and aspects, houses shown as equal sectors from the Ascendant':
		'Roda astrológica com planetas e aspectos, casas mostradas como setores iguais a partir do Ascendente',
	'Equal sectors from the Ascendant, no house cusps in this response':
		'Setores iguais a partir do Ascendente, sem cúspides de casas nesta resposta',
	'Twelve zodiac sign segments around a circular wheel. Planet glyphs are placed at their ecliptic longitudes. Aspect lines connect related planets.':
		'Doze segmentos de signos do zodíaco ao redor de uma roda circular. Os glifos planetários ficam em suas longitudes eclípticas. As linhas de aspecto ligam os planetas relacionados.',
	retrograde: 'retrógrado',

	'{{count}} planets': '{{count}} planetas',
	'{{count}} aspects': '{{count}} aspectos',
	'{{system}} houses': 'casas {{system}}',

	'No planets to grid': 'Sem planetas para a tabela',
	'Planet by planet aspect grid: the aspect each pair of planets forms, read from the planet naming the row across to the planet naming the column.':
		'Tabela de aspectos planeta a planeta: o aspecto que cada par de planetas forma, lido do planeta que nomeia a linha até o planeta que nomeia a coluna.',
	orb: 'orbe',

	'Dominant element': 'Elemento dominante',
	'Dominant modality': 'Qualidade dominante',
	Harmonious: 'Harmoniosos',
	Challenging: 'Tensos',
	Neutral: 'Neutros',
	'All {{count}} bodies in the chart, placed by sign':
		'Os {{count}} astros do mapa, dispostos por signo',
	'Element and modality distribution': 'Distribuição por elemento e qualidade',
	Total: 'Total',

	'Chart patterns': 'Configurações planetárias',
	Dissociate: 'Dissociada',
	'Out of sign: one or more planets sit outside the pattern element or modality, so the theme holds but runs weaker.':
		'Fora de signo: um ou mais planetas ficam fora do elemento ou da qualidade da configuração, então o tema permanece mas atua mais fraco.',
	'{{percent}}% tight': '{{percent}}% de exatidão',
	apex: 'focal',

	'Planet readings': 'Interpretações dos planetas',

	Transits: 'Trânsitos',
	'No transit data': 'Sem dados de trânsitos',
	'Aspects to the natal chart: {{count}}': 'Aspectos ao mapa natal: {{count}}',
	'Natal and transit bi-wheel': 'Roda do mapa natal e dos trânsitos',
	'Bi-wheel with natal bodies on the inner ring and transiting bodies on the outer ring':
		'Roda com os astros natais no círculo interno e os astros em trânsito no círculo externo',
	'Twelve zodiac sign segments around a circular wheel. Natal bodies sit at their ecliptic longitudes on the inner ring and transiting bodies on the outer ring, and each line joins a transiting body to the natal body it aspects.':
		'Doze segmentos de signos do zodíaco ao redor de uma roda circular. Os astros natais ficam em suas longitudes eclípticas no círculo interno e os astros em trânsito no círculo externo, e cada linha liga um astro em trânsito ao astro natal que ele aspecta.',

	'{{count}} natal bodies': '{{count}} astros natais',
	'{{count}} transiting bodies': '{{count}} astros em trânsito',
	'Ascendant on the left horizon': 'Ascendente no horizonte à esquerda',
	'First house cusp on the left horizon':
		'Cúspide da casa 1 no horizonte à esquerda',
	'Sign wheel, 0° Aries on the left': 'Roda zodiacal, 0° de Áries à esquerda',
	'House cusps supplied by the page':
		'Cúspides das casas fornecidas pela página',
	'No house cusps': 'Sem cúspides de casas',

	'Transit aspect summary': 'Resumo dos aspectos de trânsito',
	Strongest: 'Mais forte',
	Natal: 'Natal',
	Transiting: 'Trânsito',
	Applying: 'Aplicativo',
	Separating: 'Separativo',
	strength: 'força',

	'Every body with its natal position and its position on the transit date, each as a zodiac sign and a degree.':
		'Cada astro com sua posição natal e sua posição na data do trânsito, cada uma em signo do zodíaco e grau.',
	'Both house numbers are read against the natal house cusps.':
		'Os dois números de casa são lidos a partir das cúspides das casas natais.',
	Body: 'Astro',
	'Natal house': 'Casa natal',
	'Transiting house': 'Casa em trânsito',

	'Transit readings': 'Interpretações dos trânsitos',
	Impact: 'Impacto',
	Timing: 'Período',
	Guidance: 'Orientação',
};

registerLocale('pt', pt);
