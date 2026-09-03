/**
 * The MCP tool name an endpoint answers to, derived from its HTTP method and spec path.
 *
 * @remarks
 * One rule, applied at build time onto every entry of the generated endpoint map, so nothing has to compute a name while a page is rendering: lower-case the method, drop the leading slash, fold every `/` and `-` into `_`, remove path-parameter punctuation, then collapse a segment that immediately repeats the one before it. Only an ADJACENT repeat collapses, which is what stops a parameter named after its parent from doubling the word; a segment that recurs later in the path is kept, so two different endpoints can never fold onto one name.
 *
 * `specs/mcp-tools.json` holds the names the live servers publish and a unit test asserts every derived name is among them, so a rule that drifts fails a gate here.
 *
 * @example
 * ```ts
 * toolNameFor('GET', '/astrology/horoscope'); // get_astrology_horoscope
 * toolNameFor('GET', '/crystals/chakra/{chakra}'); // get_crystals_chakra
 * toolNameFor('POST', '/tarot/spreads/three-card'); // post_tarot_spreads_three_card
 * ```
 */
export function toolNameFor(method: string, path: string): string {
	const raw = `${method.toLowerCase()}_${path
		.replace(/^\//, '')
		.replace(/\//g, '_')
		.replace(/[{}:]/g, '')
		.replace(/-/g, '_')}`;
	const segments: string[] = [];
	for (const segment of raw.split('_')) {
		if (segments[segments.length - 1] !== segment) segments.push(segment);
	}
	return segments.join('_');
}
