/**
 * Portuguese chrome strings.
 *
 * @remarks
 * Importing this module registers the catalogue and re-renders every mounted component, so it is a side-effect entry, exactly like a `components/*` module. It is built to `dist/locales/pt.js` and `dist/cdn/locales/pt.js` as its OWN payload rather than compiled into the components, so an English site downloads none of it.
 *
 * Keyed by the English source string as it appears at the call site, so this file diffs directly against the component that renders it and no key vocabulary has to be kept in sync with the copy.
 *
 * One catalogue serves both markets, and where Brazil and Portugal genuinely differ it follows Brazilian usage, which is the larger astrology readership: `orbe`, `tensos` and `Áries` rather than the European `órbitas`, `desarmoniosos` and `Carneiro`. Regional tags resolve here, so `pt-BR` and `pt-PT` both read this file.
 *
 * Every entry below is attested in live Portuguese astrology copy rather than machine translated. What follows is the reasoning a maintainer needs; the attestation itself is recorded internally.
 *
 * **`Natal` is Portuguese, not an untranslated fallthrough**: `mapa natal`, `Vênus natal`, `casa natal` are standard, and the spelling coincides with the English.
 *
 * **`Aplicativo` also means "mobile app" in Brazilian Portuguese, and it is still the right word here.** It is what both sourced glossaries print for an applying aspect, it is paired with `Separativo` in the same row, and the reader is a working astrologer. Do not swap in an app-free synonym.
 *
 * Rejected, so nobody restores them: `Em aplicação`/`Em separação` and `Aproximando`/`Afastando` for the aspect pair (phrases and plain motion verbs, not the glossary terms), `anel interno`/`anel externo` for the rings (a literal rendering of "ring" with zero astrological attestation), `roda interna`/`roda externa` (collides with `roda`, which already names the whole wheel), `casas iguais` for the equal-sector fallback (that names a house SYSTEM, and the fallback fires precisely because no cusps came back), `exatidão` for the strength score (this catalogue already spends that word on aspect tightness, and collapsing two different measures into one word is drift), and `Timing` for the timing paragraph (business jargon in Brazil, never an astrological term).
 *
 * Two gaps, stated rather than papered over. **`Bi-wheel` has no Portuguese noun**, so nothing was coined; the two entries that need it name the chart and let the inner and outer clause carry the meaning. **`Transiting house` has none either**: Portuguese writes it as a whole clause, and `casa transitada` is Spanish rather than Portuguese, so `Casa em trânsito` is a plain construction built on the attested modifier `em trânsito`. A normalized 0-100 aspect strength has no Portuguese term of art at all.
 *
 * **`Configurações planetárias` is KEPT, with the risk written down rather than assumed away.** A bare `Configuraciones` heading reads as a preferences panel in Spanish, and `Configurações` is likewise the word every Portuguese OS UI uses for Settings. It survives here because the qualifier carries it and because it is the attested class term for exactly our set. **Every alternative is worse**: `Padrões planetários` is actively wrong, naming the Rudhyar chart SHAPES (bowl, bundle, splash), and `Figuras de aspectos` is Spanish usage with no Brazilian attestation. **If a Brazilian reader ever reports the settings reading, the pre-vetted fallback is `Configurações de aspectos`** and nothing else.
 *
 * `Car`, `Fix` and `Mut` for the cross-tab columns are three-character truncations of `Cardinal`, `Fixo` and `Mutável` that happen to coincide with the English set; no Portuguese source abbreviates the qualities at all, so the scheme is ours. `Card` was rejected because `card` is a live English loanword in Brazilian tech usage for a visual card.
 *
 * **`Cardinal` versus `Cardeal` is a genuine live split, not an error**, and it is not a Brazil versus Portugal split either. This file follows the API, which returns `Cardinal`, because the dominant pill and the grid row it tints must read the same word.
 *
 * `Mapa de relocação` is the shipped term and is attested in Brazilian material, alongside the more common `astrocartografia`. `Realocação` stays rejected for disagreeing with the term this file already ships.
 *
 * One entry remains unsourced and wants a bilingual practitioner: **`Dissociada`**, where no Brazilian source applies `dissociado` to an out-of-sign aspect. The tooltip carries the meaning. Also noted and not changed: `casas {{system}}` renders `casas Placidus`, where Brazilian usage would write `casas de Placidus`; it reads as a compressed label rather than an error.
 *
 * ## Human Design
 *
 * **The 54 entries follow established Brazilian Human Design usage, cross-checked against the Portuguese the Human Design endpoints themselves return wherever a concept overlaps.** `Estratégia`, `Autoridade`, `Assinatura`, `Perfil`, `Definição`, `Centros`, `Canais`, `Cruz de encarnação`, `Variáveis` and `Bodygraph` are all settled that way, as are the defined/open pair and the motor/awareness split.
 *
 * **`Portão`, never `Porta`, for a Gate.** The Portuguese the API returns writes `portão` throughout its own body text, reserving `porta` for a literal door inside a reading's metaphor. European sources write `Porta` instead, a live regional split of the same shape this file already documents for `Cardinal`/`Cardeal`; this catalogue follows the API it sits beside, because the tooltip prefix and the footnote have to read as the same word the card's data-driven vocabulary already prints.
 *
 * **`Design` and `Bodygraph` are Portuguese, not untranslated fallthroughs, the same way `Natal` already is.** Brazilian prose glosses the red column as `Design`, never `Desenho`, and uses lower-case `bodygraph` as a common noun mid-sentence. `Aura` and `Motor` are likewise the same word in Portuguese. `Base` is shipped as the same word too, but on cognate grounds only: no Portuguese Human Design source names that specific layer, so it wants a practitioner check.
 *
 * **`Não-eu` is the noun, not a coined compound**, and is distinct from `Tema do Não-Ser`, which names the four type-specific feelings rather than the mechanic itself. `Pergunta do não-eu` composes that sourced noun with the plain word for "question"; no source uses that exact three-word phrase, so it is the plainest defensible construction and wants a practitioner pass.
 *
 * Two further entries are the plainest defensible Portuguese rather than sourced vocabulary and are flagged for the same pass. **`Lados do bodygraph`** for the accessible name of the Personality/Design tab list: both halves check out individually, but no source names the pair together as UI chrome, since they are discussed as chart-reading doctrine rather than interface labels. **`No limite`** for the knife-edge warning: the literal idiom `no fio da navalha` exists but reads as literary rather than a UI warning chip, so this catalogue takes the plain paraphrase and never coins the idiom.
 *
 * ## Monthly ephemeris
 *
 * **`Efemérides`, always plural.** In Brazilian journalism `efemérides` also means an on-this-day anniversary, so the word is safe inside an astrology card and should not be reused elsewhere.
 *
 * **`Mudanças de signo` over `Ingressos`.** `Ingresso` is the practitioner word and is attested, but only ever inside the full phrase; standing alone on a chip it is the everyday Brazilian word for an admission ticket. `entradas de signos` was rejected as a calque.
 *
 * **`Retrogradação` is the noun on purpose.** The adjective was rejected for the chip because it agrees in gender with whatever it sits under, and this card also prints the lunar nodes and Black Moon Lilith, which are not reliably masculine.
 *
 * **`Entra em {{sign}} no dia {{date}}` substitutes safely for all twelve**, since `em` takes no article before a sign name and never contracts, so no exception table is needed. `Data` is the standard column header on these tables.
 *
 * The empty state and the table caption are COMPOSED rather than lifted, following the patterns already in this file. Portugal spellings were kept out: `posições actuais` is pre-reform orthography and this catalogue is Brazilian.
 *
 * ## Form group names
 *
 * **`Pessoa A` and `Pessoa B` are what live Portuguese two-person forms print.** Portuguese uses the same alphabet and the same `Plano A` convention, so the letters stay letters. The numbered pair takes the same head noun and the bare numeral, which sidesteps the gender agreement `primeira` and `segundo` would drag in. `Você` and `Seu parceiro` were rejected: these forms are also read for family, friends and business partners.
 *
 * **`Nascimento` is bare for the relocation birth block so the interpolation reproduces the strings this file already ships**, `Local de nascimento` and `Cidade de nascimento`, rather than a second phrasing of them. `Dados de nascimento` stays on the forecast block. `Pesos por domínio` is kept because this is settings chrome rather than coaching copy, where Brazilian coaching would say `áreas da vida`.
 *
 * The two blocks that name a THING rather than a person are the weakest here: `Local de Dados de nascimento` is circular, since birth data already contains a place, and `Local de Mapa natal` asks where a chart is, which is a category mismatch a reader resolves from the legend directly above the field. Both are the standing `casas Placidus` trade recorded above: telegraphic UI chrome, not an error. The natal chart one cannot be reworded here in any case, because that group reuses the card heading by construction.
 */

import type { ChromeString } from '../i18n/chrome-strings.js';
import { registerLocale } from '../i18n/registry.js';
import './field-labels/pt.js';

export const pt: Record<ChromeString, string> = {
	'Edit query': 'Editar consulta',
	'Spiritual data by RoxyAPI': 'Dados espirituais por RoxyAPI',
	'No data': 'Sem dados',
	Loading: 'Carregando',
	Reading: 'Interpretação',

	'Natal chart': 'Mapa natal',
	'Relocation chart': 'Mapa de relocação',
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

	'Dominant element': 'Elemento dominante',
	'Dominant modality': 'Qualidade dominante',
	Harmonious: 'Harmoniosos',
	Challenging: 'Tensos',
	Neutral: 'Neutros',
	'All {{count}} bodies in the chart, placed by sign':
		'Os {{count}} astros do mapa, dispostos por signo',
	'Element and modality distribution': 'Distribuição por elemento e qualidade',
	Total: 'Total',

	Fire: 'Fogo',
	Earth: 'Terra',
	Air: 'Ar',
	Water: 'Água',
	Cardinal: 'Cardinal',
	Fixed: 'Fixo',
	Mutable: 'Mutável',
	Car: 'Car',
	Fix: 'Fix',
	Mut: 'Mut',

	'Chart patterns': 'Configurações planetárias',
	Dissociate: 'Dissociada',
	'Out of sign: one or more planets sit outside the pattern element or modality, so the theme holds but runs weaker.':
		'Fora de signo: um ou mais planetas ficam fora do elemento ou da qualidade da configuração, então o tema permanece mas atua mais fraco.',
	'{{percent}} tight': '{{percent}} de exatidão',
	apex: 'focal',

	'Planet readings': 'Interpretações dos planetas',

	Transits: 'Trânsitos',
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
	'House cusps from the response': 'Cúspides das casas incluídas na resposta',
	'No house cusps': 'Sem cúspides de casas',

	'Transit aspect summary': 'Resumo dos aspectos de trânsito',
	Strongest: 'Mais forte',
	Natal: 'Natal',
	Transiting: 'Trânsito',
	Applying: 'Aplicativo',
	Separating: 'Separativo',

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

	Ephemeris: 'Efemérides',
	'Signs in this month': 'Signos deste mês',
	'Sign changes and retrograde periods': 'Mudanças de signo e retrogradações',
	'Daily positions': 'Posições diárias dos planetas',
	Date: 'Data',
	'Enters {{sign}} on {{date}}': 'Entra em {{sign}} no dia {{date}}',
	'Retrograde {{range}}': 'Retrogradação {{range}}',
	'Every body with its position on each day of the month, as a zodiac sign and a degree.':
		'Cada astro com sua posição em cada dia do mês, em signo do zodíaco e grau.',

	'Nested data omitted': 'Dados aninhados omitidos',
	'Generic data display': 'Exibição genérica de dados',
	'Empty list': 'Lista vazia',
	'Data table': 'Tabela de dados',
	'{{count}} rows': '{{count}} linhas',
	Yes: 'Sim',
	No: 'Não',
	illustration: 'ilustração',

	Type: 'Tipo',
	Strategy: 'Estratégia',
	Authority: 'Autoridade',
	Profile: 'Perfil',
	Definition: 'Definição',
	Aura: 'Aura',
	'Incarnation cross': 'Cruz de encarnação',
	'Signature: {{value}}': 'Assinatura: {{value}}',
	'Not-self: {{value}}': 'Não-eu: {{value}}',
	'Profile {{profile}}': 'Perfil {{profile}}',
	'Line {{line}} · Personality': 'Linha {{line}} · Personalidade',
	'Line {{line}} · Design': 'Linha {{line}} · Design',
	Personality: 'Personalidade',
	Design: 'Design',

	Bodygraph: 'Bodygraph',
	'Human Design bodygraph': 'Bodygraph de Human Design',
	'Human Design bodygraph with nine centers, channels, and activated gates overlaid on a human silhouette':
		'Bodygraph de Human Design com nove centros, canais e portões ativados sobre uma silhueta humana',
	'Nine energy centers in their canonical positions over a human silhouette, each filled with its traditional color when defined and outlined when open, wired by channels between activated gates.':
		'Nove centros de energia em suas posições canônicas sobre uma silhueta humana, cada um preenchido com sua cor tradicional quando definido e apenas contornado quando aberto, ligados por canais entre portões ativados.',
	'Center colors when defined. Open centers are outlined.':
		'Cores dos centros quando definidos. Centros abertos aparecem apenas contornados.',
	'Open center': 'Centro aberto',
	'Defined channels ({{count}})': 'Canais definidos ({{count}})',
	'{{circuit}} circuit': 'Circuito {{circuit}}',
	'Centers ({{defined}} defined, {{open}} open)':
		'Centros ({{defined}} definidos, {{open}} abertos)',
	Defined: 'Definido',
	Open: 'Aberto',
	Motor: 'Motor',
	Awareness: 'Consciência',
	'Not-self question': 'Pergunta do não-eu',
	Biology: 'Biologia',
	'Gates {{gates}}': 'Portões {{gates}}',
	'Activations ({{count}})': 'Ativações ({{count}})',
	'Chart sides': 'Lados do bodygraph',
	'Line {{line}}': 'Linha {{line}}',
	'Gate {{gate}}': 'Portão {{gate}}',
	'I Ching hexagram {{number}}': 'Hexagrama do I Ching {{number}}',

	'Personality line': 'Linha da personalidade',
	'Design line': 'Linha do design',
	Lines: 'Linhas',

	Variables: 'Variáveis',
	'Human Design variables': 'Variáveis de Human Design',
	'Low confidence: a birth time near a color or tone boundary. Verify the exact birth time.':
		'Baixa confiança: um horário de nascimento próximo de um limite de cor ou tom. Verifique o horário exato de nascimento.',
	'Low confidence: a birth time near a color or tone boundary (within {{margin}}°). Verify the exact birth time.':
		'Baixa confiança: um horário de nascimento próximo de um limite de cor ou tom (dentro de {{margin}}°). Verifique o horário exato de nascimento.',
	'Color {{color}} · Tone {{tone}} · Base {{base}}':
		'Cor {{color}} · Tom {{tone}} · Base {{base}}',
	'Knife-edge: could flip with a more precise birth time.':
		'No limite: pode mudar com um horário de nascimento mais preciso.',
	Base: 'Base',
	Color: 'Cor',
	Tone: 'Tom',
	Direction: 'Direção',
	Cognition: 'Cognição',

	Reference: 'Referência',

	// The FORM path (`<roxy-endpoint-form>` and the `<roxy-location-search>` it slots). What a
	// visitor reads BEFORE any card renders. Field labels and enum options are `humanize()` over
	// spec field names and are deliberately absent: no catalogue keyed on English source text can
	// reach a string computed per operation. The GROUP names below are the exception, because the
	// spec has nine of them rather than 909.
	'Birth location': 'Local de nascimento',
	'{{group}} location': 'Local de {{group}}',
	'City of birth': 'Cidade de nascimento',
	'{{group}} city': 'Cidade de {{group}}',
	'Person 1': 'Pessoa 1',
	'Person 2': 'Pessoa 2',
	'Person A': 'Pessoa A',
	'Person B': 'Pessoa B',
	'Birth Data': 'Dados de nascimento',
	Birth: 'Nascimento',
	Relocation: 'Relocação',
	'Domain Weights': 'Pesos por domínio',
	'Fills {{fields}}. Pick a city to autofill.':
		'Preenche {{fields}}. Escolha uma cidade para preencher automaticamente.',
	Choose: 'Escolha',
	'Comma separated': 'Separados por vírgula',
	Advanced: 'Avançado',
	'Please complete:': 'Preencha:',
	'Search city': 'Buscar cidade',
	'No cities found': 'Nenhuma cidade encontrada',
	Compare: 'Comparar',
	Cast: 'Consultar',
	'Get reading': 'Ver interpretação',
	Generate: 'Gerar',
	'Schema load failed: {{message}}': 'Falha ao carregar o esquema: {{message}}',
	'Endpoint {{method}} {{path}} not found in OpenAPI spec':
		'Endpoint {{method}} {{path}} não encontrado na especificação OpenAPI',
	'HTTP error {{status}}': 'Erro HTTP {{status}}',
	Retry: 'Tentar novamente',
	'Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side.':
		'Componentes do lado do cliente aceitam apenas uma chave publicável pk_. Use uma chave publicável com lista de permissões de origem, ou renderize no lado do servidor.',
	Severity: 'Gravidade',
	Remedies: 'Remédios',
	Exceptions: 'Exceções',
	'Dream symbol': 'Símbolo onírico',
	'Dream symbols': 'Símbolos oníricos',
	'{{count}} matches': '{{count}} correspondências',
	Hora: 'Hora',
	'Hora periods': 'Horas planetárias',
	'Vedic kundli': 'Mapa védico',
	'Vedic birth chart with twelve sign houses':
		'Mapa natal védico com doze casas por signo',
	'Angel number': 'Número angelical',
	'Digit root': 'Raiz digital',
	'Action steps': 'Passos a seguir',
	Colors: 'Cores',
	Keywords: 'Palavras-chave',
	'Pairs with': 'Combina com',
	Vargottama: 'Vargottama',
	'Vargottama planets': 'Planetas vargottama',
	'{{chart}} divisional chart with twelve sign houses':
		'Mapa divisional {{chart}} com doze casas por signo',
	'Sidereal frame: {{frame}}': 'Referencial sideral: {{frame}}',
	'Sidereal frame: {{frame}}, {{degrees}}° subtracted':
		'Referencial sideral: {{frame}}, {{degrees}}° subtraídos',
	Day: 'Dia',
	Night: 'Noite',
	Planet: 'Planeta',
	Hardness: 'Dureza',
	Vibration: 'Vibração',
	Birthstone: 'Pedra de nascimento',
	Chakras: 'Chakras',
	Zodiac: 'Signo zodiacal',
	Elements: 'Elementos',
	Spiritual: 'Espiritual',
	Emotional: 'Emocional',
	Physical: 'Físico',
	Master: 'Mestre',
	'Master number': 'Número mestre',
	'Birth day profile': 'Perfil do dia de nascimento',
	'Lucky associations': 'Associações de sorte',
	Missing: 'Ausente',
	'No numbers are missing from the birth name.':
		'Não falta nenhum número no nome de nascimento.',
	'How to overcome': 'Como superar',
	'Karmic lessons': 'Lições cármicas',
	Debt: 'Dívida',
	Challenge: 'Desafio',
	Resolution: 'Resolução',
	'Karmic debt': 'Dívida cármica',
	'Personal year': 'Ano pessoal',
	Pinnacles: 'Pináculos',
	Lesson: 'Lição',
	Challenges: 'Desafios',
	'Name numbers': 'Números do nome',
	'Name letters': 'Letras do nome',
	'Personal month': 'Mês pessoal',
	'Calendar month': 'Mês do calendário',
	Maturity: 'Maturidade',
	'Current age': 'Idade atual',
	Activates: 'Ativa',
	Element: 'Elemento',
	'Ruling planet': 'Planeta regente',
	Gemstones: 'Gemas',
	Compatible: 'Compatível',
	Incompatible: 'Incompatível',
	'Life Path': 'Caminho de vida',
	Expression: 'Número de expressão',
	'Soul Urge': 'Impulso da alma',
	'Birth Day': 'Número de nascimento',
	'Daily Number': 'Número diário',
	'Personal Day': 'Dia pessoal',
	'Numerology chart': 'Mapa numerológico',
	Panchang: 'Panchang',
	'Auspicious muhurtas': 'Muhurtas auspiciosos',
	'Inauspicious periods': 'Períodos inauspiciosos',
	'Next transitions': 'Próximas transições',
	'None today': 'Nenhum hoje',
	'Bhadra (Vishti)': 'Bhadra (Vishti)',
	Panchaka: 'Panchaka',
	'Favorable Moon signs': 'Signos lunares favoráveis',
	'Favorable birth nakshatras': 'Nakshatras de nascimento favoráveis',
	'Unfavorable birth nakshatras': 'Nakshatras de nascimento desfavoráveis',
	'Chandrabalam and Tarabalam': 'Chandrabalam e Tarabalam',
	None: 'Nenhum',
	'Moon sign': 'Signo lunar',
	'Sun sign': 'Signo solar',
	'Sun nakshatra': 'Nakshatra solar',
	'Amrit Kalam': 'Amrit Kalam',
	'Dur Muhurta': 'Dur Muhurta',
	Varjyam: 'Varjyam',
	Sunrise: 'Nascer do sol',
	Sunset: 'Pôr do sol',
	Moonrise: 'Nascer da lua',
	Moonset: 'Ocaso da lua',
	Sun: 'Sol',
	Moon: 'Lua',
	'Ashtama Chandra rashi': 'Ashtama Chandra rashi',
	'{{sign}} until {{time}}': '{{sign}} até {{time}}',
	'{{sign}} until {{time}}, then {{next}}':
		'{{sign}} até {{time}}, depois {{next}}',
	'{{range}} (ends {{date}})': '{{range}} (termina {{date}})',
	Tithi: 'Tithi',
	Nakshatra: 'Nakshatra',
	Yoga: 'Yoga',
	Karana: 'Karana',
	'ends {{time}}': 'termina {{time}}',
	'ends {{time}} to {{next}}': 'termina {{time}}, depois {{next}}',
	'ends {{time}} to {{next}} pada {{pada}}':
		'termina {{time}}, depois {{next}} pada {{pada}}',
	Strengths: 'Forças',
	'Key aspects': 'Aspectos principais',
	'Aspect breakdown': 'Balanço de aspectos',
	'Element balance': 'Equilíbrio dos elementos',
	'Forecast digest': 'Resumo da previsão',
	'No notable events.': 'Sem eventos notáveis.',
	'{{count}} events': '{{count}} eventos',
	'significance {{value}} of 100': 'significância {{value}} de 100',
	'I Ching hexagram': 'Hexagrama do I Ching',
	Position: 'Posição',
	House: 'Casa',
	Motion: 'Movimento',
	Formula: 'Fórmula',
	'°/day': '°/dia',
	'Tarot spread': 'Tiragem de tarô',
	'(reversed)': '(invertida)',
	'{{arcana}} arcana': 'Arcanos {{arcana}}',
	Upper: 'Superior',
	Lower: 'Inferior',
	'Changing lines: {{lines}}.': 'Linhas mutáveis: {{lines}}.',
	'Becomes hexagram {{number}} {{name}}.':
		'Torna-se hexagrama {{number}} {{name}}.',
	'{{chakra}} chakra crystals': 'Cristais do chacra {{chakra}}',
	'{{element}} element crystals': 'Cristais do elemento {{element}}',
	'Crystals for {{sign}}': 'Cristais para {{sign}}',
	'{{month}} birthstones': 'Pedras de nascimento de {{month}}',
	Crystals: 'Cristais',
	'Forecast timeline': 'Linha do tempo da previsão',
	'No events in this window': 'Sem eventos neste período',
	'orb {{value}}°': 'orbe {{value}}°',
	'Guna Milan score': 'Pontuação de Guna Milan',
	Koota: 'Koota',
	Progress: 'Progresso',
	Score: 'Pontos',
	'{{dosha}} cancelled': '{{dosha}} cancelado',
	'Moon phase calendar': 'Calendário das fases da lua',
	'Current moon phase': 'Fase lunar atual',
	Illumination: 'Iluminação',
	Age: 'Idade',
	Sign: 'Signo',
	Distance: 'Distância',
	'{{count}} days': '{{count}} dias',
	'{{value}}k km': '{{value}} mil km',
	'Annual profection': 'Profecção anual',
	For: 'Para',
	'Lord of the year': 'Senhor do ano',
	'What changes at this location': 'O que muda neste local',
	'Angular planets here': 'Planetas angulares aqui',
	'Planets that change house': 'Planetas que mudam de casa',
	'No planet changes house at this location.':
		'Nenhum planeta muda de casa neste local.',
	'Guna Milan breakdown: each koota with the classification of person 1 and person 2, and the score it earned out of its maximum.':
		'Detalhe do Guna Milan: cada koota com a classificação da pessoa 1 e da pessoa 2 e os pontos obtidos sobre o máximo.',
	'{{sign}} · house {{house}}': '{{sign}} · casa {{house}}',
	'{{planet}}: house {{from}} to {{to}}':
		'{{planet}}: casa {{from}} para {{to}}',
	ASC: 'ASC',
	DSC: 'DSC',
	MC: 'MC',
	IC: 'IC',
	PoF: 'PdF',
	Vtx: 'Vtx',
	'Kundli style': 'Estilo de kundli',
	North: 'Norte',
	South: 'Sul',
	East: 'Leste',
	'in {{sign}}': 'em {{sign}}',
	'pada {{n}}': 'pada {{n}}',
	Vara: 'Vara',
	'Tarot card': 'Carta de tarô',
	Upright: 'Direita',
	Reversed: 'Invertida',
	'Card orientation': 'Orientação da carta',
	Cornerstone: 'Pedra angular',
	Capstone: 'Pedra de fecho',
	'First vowel': 'Primeira vogal',
	'Core numbers': 'Números centrais',
	Lessons: 'Lições',
	Debts: 'Dívidas',
	'Life phases': 'Fases da vida',
	'Obstacle periods': 'Períodos de obstáculos',
	'Letter analysis': 'Análise das letras',
	Opportunities: 'Oportunidades',
	Asteroids: 'Asteroides',
	Houses: 'Casas',
	'Black Moon Lilith': 'Lua Negra Lilith',
	'{{variant}} apogee': 'Apogeu {{variant}}',
	'Solar arc directions': 'Direções de arco solar',
	Arc: 'Arco',
	'Directed to': 'Dirigido a',
	'Arabic lots': 'Partes árabes',
	Sect: 'Seita',
	Ascendant: 'Ascendente',
	Midheaven: 'Meio do Céu',
	'Secondary progressions': 'Progressões secundárias',
	'Progressed to': 'Progredido a',
	Elapsed: 'Decorrido',
	'{{years}} yrs': '{{years}} anos',
	Biblical: 'Bíblico',
	Shadow: 'Sombra',
	Readings: 'Leituras',
	Advisories: 'Avisos',
	'Sign compatibility': 'Compatibilidade dos signos',
	Breakdown: 'Detalhamento',
	'Changing lines': 'Linhas mutáveis',
	Dynamics: 'Dinâmicas',
	Love: 'Amor',
	Career: 'Carreira',
	Money: 'Dinheiro',
	'Twin flame': 'Chama gêmea',
	'Western planetary positions': 'Posições planetárias ocidentais',
	'Planetary positions': 'Posições planetárias',
	'Western planetary positions: each body with its sign, degree, house and motion.':
		'Posições planetárias ocidentais: cada corpo com o seu signo, grau, casa e movimento.',
	Degree: 'Grau',
	'Vedic aspects': 'Aspectos védicos',
	'Chart time {{when}}': 'Hora do mapa {{when}}',
	'Sidereal positions': 'Posições siderais',
	'Mutual aspects': 'Aspectos mútuos',
	'Vedic planetary aspects: aspecting planet, aspect type, aspected planet, strength and orb.':
		'Aspectos planetários védicos: planeta que aspecta, tipo de aspecto, planeta aspectado, força e orbe.',
	From: 'De',
	Aspect: 'Aspecto',
	To: 'Para',
	Strength: 'Força',
	Orb: 'Orbe',
	'Upagraha positions': 'Posições dos upagrahas',
	Upagrahas: 'Upagrahas',
	Upagraha: 'Upagraha',
	'{{group}} upagrahas: each sub-planet with its rashi, degree in sign, sidereal longitude, and nakshatra with pada.':
		'Upagrahas {{group}}: cada subplaneta com o seu rashi, grau no signo, longitude sideral e nakshatra com pada.',
	'Time based': 'Baseados no tempo',
	'From the eightfold division of the day or night, so these depend on the birth time, the place and the weekday.':
		'Da divisão em oito partes do dia ou da noite, pelo que dependem da hora de nascimento, do lugar e do dia da semana.',
	'Sun based': 'Baseados no Sol',
	'The Dhuma group, derived by fixed arc from the Sun. Dhuma is the Sun plus 133 degrees 20 minutes, and each of the rest follows from the one before it.':
		'O grupo Dhuma, derivado por arco fixo a partir do Sol. Dhuma é o Sol mais 133 graus 20 minutos, e cada um dos restantes decorre do anterior.',
	Rashi: 'Rashi',
	Longitude: 'Longitude',
	Pada: 'Pada',
	'Nakshatra {{name}}': 'Nakshatra {{name}}',
	'Nakshatra {{number}} of 27': 'Nakshatra {{number}} de 27',
	Lord: 'Regente',
	Deity: 'Divindade',
	Symbol: 'Símbolo',
	Characteristics: 'Características',
	'Mantras:': 'Mantras:',
	'Gemstones:': 'Gemas:',
	'Rituals:': 'Rituais:',
	N: 'N',
	NE: 'NE',
	E: 'E',
	SE: 'SE',
	S: 'S',
	SW: 'SO',
	W: 'O',
	NW: 'NO',
	'Local space': 'Espaço local',
	'Local space compass': 'Bússola de espaço local',
	'Local space compass of planetary directions from the birthplace':
		'Bússola de espaço local com as direções planetárias a partir do local de nascimento',
	'A compass centered on the birthplace. Each body is a line pointing to its azimuth, clockwise from north. Bodies below the horizon are dimmed.':
		'Uma bússola centrada no local de nascimento. Cada corpo é uma linha que aponta para o seu azimute, no sentido horário a partir do norte. Os corpos abaixo do horizonte ficam esbatidos.',
	'Local space directions: each body with its compass direction, azimuth, altitude and whether it sits above or below the horizon.':
		'Direções de espaço local: cada corpo com a sua direção, azimute, altura e se está acima ou abaixo do horizonte.',
	'{{planet}} {{direction}} {{azimuth}}° altitude {{altitude}}':
		'{{planet}} {{direction}} {{azimuth}}° altura {{altitude}}',
	Azimuth: 'Azimute',
	Altitude: 'Altura',
	Horizon: 'Horizonte',
	Astrocartography: 'Astrocartografia',
	'Astrocartography world map': 'Mapa-múndi de astrocartografia',
	'World map of planetary astrocartography lines':
		'Mapa-múndi das linhas planetárias de astrocartografia',
	'Equirectangular world map. Each body has a Midheaven and Imum Coeli meridian and a curved Ascendant and Descendant line, colored per body.':
		'Mapa-múndi equirretangular. Cada corpo tem um meridiano de Meio do Céu e Fundo do Céu e uma linha curva de Ascendente e Descendente, colorida por corpo.',
	Birthplace: 'Local de nascimento',
	'{{planet}} {{angle}} line': 'Linha {{angle}} de {{planet}}',
	'Solid lines are the Ascendant and Midheaven, dashed are the Descendant and IC.':
		'As linhas contínuas são o Ascendente e o Meio do Céu, as tracejadas o Descendente e o Fundo do Céu.',
	'Planetary lines': 'Linhas planetárias',
	Choghadiya: 'Choghadiya',
	'Day muhurta periods': 'Períodos muhurta do dia',
	'Daytime choghadiya': 'Choghadiya diurno',
	'No daytime periods': 'Sem períodos diurnos',
	'Night muhurta periods': 'Períodos muhurta da noite',
	'Nighttime choghadiya': 'Choghadiya noturno',
	'No nighttime periods': 'Sem períodos noturnos',
	Now: 'Agora',
	'Time range': 'Intervalo de tempo',
	'Impact:': 'Impacto:',
	'Timing:': 'Duração:',
	'Guidance:': 'Conselho:',
	'Chara karakas': 'Chara karakas',
	Atmakaraka: 'Atmakaraka',
	Darakaraka: 'Darakaraka',
	'Chara karakas in descending rank: each office, the graha holding it, its rashi, the degree it holds, the degree that earned the office, and what the office is read for.':
		'Chara karakas em ordem decrescente: cada cargo, o graha que o ocupa, o seu rashi, o grau ocupado, o grau que lhe valeu o cargo e para que se lê.',
	Office: 'Cargo',
	Graha: 'Graha',
	'Ranked on': 'Ordenado por',
	'Read for': 'Lê-se para',
	'measured from the end of the sign': 'medido a partir do fim do signo',
	'Heliacal visibility': 'Visibilidade heliacal',
	'Heliacal rising and setting': 'Nascer e ocaso heliacais',
	'Whether each graha stands far enough from the Sun to be seen, for {{date}}. The Sun and the nodes never appear here: they have no heliacal event.':
		'Se cada graha está suficientemente longe do Sol para ser visto, para {{date}}. O Sol e os nodos nunca aparecem aqui: não têm evento heliacal.',
	Visible: 'Visível',
	Invisible: 'Invisível',
	rises: 'nasce',
	sets: 'se põe',
	Rose: 'Nasceu',
	Set: 'Pôs-se',
	'in the east': 'a leste',
	'in the west': 'a oeste',
	'Visible until it {{event}} {{where}} on {{when}}':
		'Visível até {{event}} {{where}} em {{when}}',
	'Invisible until it {{event}} {{where}} on {{when}}':
		'Invisível até {{event}} {{where}} em {{when}}',
	'{{event}} {{where}} on {{when}}, with no further event inside the search window':
		'{{event}} {{where}} em {{when}}, sem mais eventos dentro da janela de pesquisa',
	'No rising or setting inside the search window, which is normal for a graha far from the Sun':
		'Sem nascer nem ocaso dentro da janela de pesquisa, o que é normal para um graha longe do Sol',
	'{{degrees}}° of time from the Sun against a limit of {{limit}}°':
		'{{degrees}}° de tempo desde o Sol face a um limite de {{limit}}°',
	'{{degrees}}° of time from the Sun against a limit of {{limit}}°, becoming {{shifted}}° at that event':
		'{{degrees}}° de tempo desde o Sol face a um limite de {{limit}}°, que passa a {{shifted}}° nesse evento',
	'a morning graha, read before sunrise':
		'um graha matutino, lido antes do nascer do Sol',
	'an evening graha, read after sunset':
		'um graha vespertino, lido após o ocaso',
	Aspects: 'Aspectos',
	'Aspect list': 'Lista de aspectos',
	'Aspect summary': 'Resumo dos aspectos',
	Patterns: 'Figuras',
	'{{status}} · orb {{orb}}° · str {{strength}}':
		'{{status}} · orbe {{orb}}° · força {{strength}}',
	'Number analysis': 'Análise do número',
	'{{count}} digits': '{{count}} dígitos',
	'{{count}} unique': '{{count}} únicos',
	'Digit root {{n}}': 'Raiz digital {{n}}',
	Palindrome: 'Palíndromo',
	Repeating: 'Repetido',
	'Positive energy': 'Energia positiva',
	'Neutral energy': 'Energia neutra',
	'Cautionary energy': 'Energia de advertência',
	'Where you saw it': 'Onde a viu',
	'Known angel number': 'Número de anjo conhecido',
	'What to do next': 'O que fazer a seguir',
	'Foundational digit root': 'Raiz digital de base',
	'Foundational digit root ({{n}})': 'Raiz digital de base ({{n}})',
	'Aspect patterns': 'Figuras de aspectos',
	Above: 'Acima',
	Below: 'Abaixo',
	Active: 'Ativo',
	'Not yet active': 'Ainda não ativo',
	Present: 'Presente',
	Absent: 'Ausente',
	'Current phase': 'Fase atual',
	'Not compatible': 'Não compatível',
	'Ascendant moves to {{sign}}': 'O Ascendente passa a {{sign}}',
	'Ascendant stays in {{sign}}': 'O Ascendente permanece em {{sign}}',
	'Ascendant changes sign': 'O Ascendente muda de signo',
	'Ascendant keeps its sign': 'O Ascendente mantém o seu signo',
};

registerLocale('pt', pt);
