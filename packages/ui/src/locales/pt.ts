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
 *
 * **`Configurações planetárias` was re-examined on 2026-08-09 and KEPT, with the risk written down rather than assumed away.** The Spanish sibling shipped `Configuraciones de la carta`, which back-translated to chart SETTINGS and cost a customer complaint, and `Configurações` is likewise the word every Portuguese OS UI uses for Settings. It survives here because the qualifier carries it and because it is the attested class term, twice: astrothon, `uma configuração planetária é uma figura geométrica com significado astrológico, definida pelas linhas que desenham os aspectos maiores entre os planetas (um mínimo de três) que a formam`; and Escola Astroletiva (Fernando Fernandes), `o astrólogo sempre enfrenta um desafio adicional quando encontra no mapa configurações críticas, que unem vários planetas num esquema geométrico bem definido`, naming stellium, Grande Trígono, Quadratura T and Grande Quadratura. **Every alternative is worse**: `Padrões planetários` is actively wrong, it names Rudhyar chart SHAPES (bowl, bundle, splash); `Figuras de aspectos` is Spanish usage with no Brazilian attestation. **If a Brazilian reader ever reports the settings reading, the pre-vetted fallback is `Configurações de aspectos`** and nothing else.
 *
 * `Car`, `Fix` and `Mut` for the cross-tab columns are three-character truncations of `Cardinal`, `Fixo` and `Mutável` that happen to coincide with the English set; no Portuguese source abbreviates the qualities at all, so the scheme is ours. `Card` was rejected because `card` is a live English loanword in Brazilian tech usage for a visual card.
 *
 * **`Cardinal` versus `Cardeal` is a genuine live split, not an error.** Astrolink writes `A qualidade CARDINAL marca o início da temporada`; Personare writes `Cardeal: é o ritmo dos signos que iniciam as estações`. It is not a Brazil versus Portugal split. This file follows the API, which returns `Cardinal`, because the dominant pill and the grid row it tints must read the same word.
 *
 * Two entries remain unsourced after the 2026-08-09 sweep and want a bilingual practitioner: **`Mapa de relocação`**, where no Brazilian astrology source uses `relocação`, `relocalização` or `mapa relocado` and the local material goes to `astrocartografia` instead; and **`Dissociada`**, where no Brazilian source applies `dissociado` to an out-of-sign aspect. The tooltip carries the meaning in both cases. Also noted and not changed: `casas {{system}}` renders `casas Placidus`, where Brazilian usage would write `casas de Placidus`; it reads as a compressed label rather than an error.
 *
 * **The 54 Human Design entries added 2026-08-09 follow established Brazilian Human Design usage, cross-checked against the API's own `@roxy/human-design` Portuguese overlay wherever a concept overlaps, per Shop Siddhi's glossary (`siddhi.pt/blogs/glossario-de-human-design`), `desenhohumano.com.br`, `desenhohumanobrasil.com.br`, `humandesign.com.br` and `arquetipos.com.br`.** Siddhi settles the identity cluster in one place: `Estratégia`, `Autoridade`, `Assinatura`, `Perfil`, `Definição`, `Centros`, `Canais`, `Cruz de encarnação`, `Variáveis` and `Bodygraph` are all glossed there in those exact words, and `Cruz de Encarnação` is confirmed again independently by `humandesign.com.br` and `desenhohumanobrasil.com.br`. `desenhohumano.com.br`'s `/centros/` page settles the defined/open pair (`Centro definido` / `Centro aberto`, "Quando está definido, opera com consistência. Quando está aberto, recebe e amplifica o que vem pelo ambiente") and the motor/awareness split ("a Solar Plexus, o Sacral, o Ego e a Raiz" as centros motores; "Ajna, Splenic e Solar Plexus" as centros de consciência, the latter confirmed independently in the WebSearch summary of the same cluster of sources).
 *
 * **`Portão`, never `Porta`, for a Gate.** `pt.ts` in `@roxy/human-design` writes `portão 11`, `este portão da obscuridade` and `o portão do Sol da Personalidade` throughout its own body text, reserving `porta` for a literal door inside a reading's metaphor (`porta que nunca esteve trancada`, `porta aberta`). European sources (Siddhi, `desenho-humano.com`) write `Porta`/`Portas` instead, a live regional split of the same shape this file already documents for `Cardinal`/`Cardeal`; this catalogue follows the API it sits beside, because the tooltip prefix and the footnote have to read as the same word as whatever the bodygraph card's data-driven vocabulary already prints.
 *
 * **`Design` and `Bodygraph` are Portuguese, not untranslated fallthroughs, the same way `Natal` already is.** `desenhohumanobrasil.com.br` titles its own explainer `PERSONALIDADE VS. DESIGN` and glosses the red column as `Design (coluna vermelha)` in running Brazilian prose, never `Desenho`; `arquetipos.com.br` runs a glossary entry titled `Bodygraph | Desenho Humano` and `desenhohumano.com.br` uses lower-case `bodygraph` as a common noun mid-sentence ("o bodygraph do Desenho Humano é formado por 9 centros"). `Aura` and `Motor` are likewise the same word in Portuguese: Siddhi glosses `Aura (tipo)` without translating it, and every centers source above names the motor cluster `Centro Motor` with the identical noun. `Base` (the third Primary Health System layer, alongside Color and Tone) is shipped as the same word too, but on cognate grounds only: no Portuguese Human Design source was found naming that specific layer, so it wants a practitioner check same as the two flagged items below.
 *
 * **`Não-eu` is the noun, not a coined compound.** The WebSearch summary of `desenhohumano.com.br`'s `/tema-do-nao-ser/` cluster and `humandesign.com.br`'s companion pages both use `Não-Eu` as the standalone term for the concept English calls not-self ("o 'Não-Eu' que está a pressionar a mente"), distinct from `Tema do Não-Ser`, which names the four type-specific feelings (`signatures`/`notSelf` in the API locale) rather than the mechanic itself. `Pergunta do não-eu` composes that sourced noun with the plain word for "question"; no source was found quoting that exact three-word phrase, so it is the plainest defensible construction, not a fully attested term of art, and wants a practitioner pass.
 *
 * Two further entries are the plainest defensible Portuguese rather than sourced vocabulary, flagged for the same bilingual-practitioner pass as the two Western entries above. **`Lados do bodygraph`** for the accessible name of the Personality/Design tab list: `Personalidade` and the sourced loanword `Design` both check out individually, but no source names the pair together as UI chrome, since every source above discusses them as chart-reading doctrine, not as interface labels. **`No limite`** for the knife-edge warning: the literal Portuguese idiom `no fio da navalha` exists but reads as literary rather than a UI warning chip, so this catalogue takes the plain paraphrase instead and never coins the idiom.
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
	'No bodygraph data': 'Sem dados do bodygraph',
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

	'No Human Design data': 'Sem dados de Human Design',
	'Personality line': 'Linha da personalidade',
	'Design line': 'Linha do design',
	Lines: 'Linhas',

	Variables: 'Variáveis',
	'No variables data': 'Sem dados de variáveis',
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
	'No reference data': 'Sem dados de referência',
};

registerLocale('pt', pt);
