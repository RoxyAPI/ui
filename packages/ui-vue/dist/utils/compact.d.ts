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
export declare function expandCompact<T>(value: T): T;
