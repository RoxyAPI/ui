const COLS = '__cols';
const ROWS = '__rows';

function isPlainObject(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Walk a value, rebuilding only the branches that actually hold an encoded array.
 *
 * @remarks
 * The identity return is the contract, not an optimisation: a response with nothing encoded in it comes back as the same object, so every render path that existed before this decoder sees the exact bytes it always saw.
 */
function decode(value: unknown): unknown {
	if (Array.isArray(value)) {
		let rebuilt = false;
		const out = value.map((item) => {
			const next = decode(item);
			if (next !== item) rebuilt = true;
			return next;
		});
		return rebuilt ? out : value;
	}
	if (!isPlainObject(value)) return value;

	const cols = value[COLS];
	const rows = value[ROWS];
	// Exactly the two keys and nothing else: a real payload that happens to carry
	// a field of either name is left alone.
	if (
		Array.isArray(cols) &&
		Array.isArray(rows) &&
		Object.keys(value).length === 2
	) {
		return rows.map((row) => {
			const item: Record<string, unknown> = {};
			(cols as string[]).forEach((col, i) => {
				item[col] = decode((row as unknown[])[i]);
			});
			return item;
		});
	}

	let rebuilt = false;
	const out: Record<string, unknown> = {};
	for (const [key, item] of Object.entries(value)) {
		const next = decode(item);
		if (next !== item) rebuilt = true;
		out[key] = next;
	}
	return rebuilt ? out : value;
}

/**
 * Turn a compact API response back into the plain shape the components render.
 *
 * @remarks
 * Asking a Remote MCP tool for a compact result trades repeated field names for a header: an array of same-shaped objects arrives as `{ __cols: [names], __rows: [[values]] }`, which costs an agent far fewer tokens to read and carries exactly the same data. This is the decoder, applied at every depth, so a compact result renders in a component with nothing else to do.
 *
 * Every data component runs it on the way in, so a page that sets `data` from a tool result needs no call of its own. It is exported for the paths that hold the JSON before an element does.
 *
 * A value with nothing encoded in it is returned unchanged, by reference.
 *
 * @example
 * ```ts
 * expandCompact({ aspects: { __cols: ['a', 'b'], __rows: [['sun', 'moon'], ['sun', 'mars'], ['moon', 'mars']] } });
 * // { aspects: [{ a: 'sun', b: 'moon' }, { a: 'sun', b: 'mars' }, { a: 'moon', b: 'mars' }] }
 * ```
 */
export function expandCompact<T>(value: T): T {
	return decode(value) as T;
}
