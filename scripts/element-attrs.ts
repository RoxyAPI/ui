/**
 * Read the ATTRIBUTES a custom element accepts, straight from its `@property` declarations.
 *
 * The wrapper metadata in `wrapper-meta.ts` describes the PROPERTY surface, which is what the React and Vue components set on an instance. A page that renders the tag itself, server-side and with no wrapper, writes attributes instead, and an attribute name is not always the property name: Lit lowercases by default and several declarations rename explicitly. Guessing the transform is how a typed surface starts lying, so it is read.
 *
 * Two rules make the scan exact. Comments are stripped first, because docblocks in this library quote `@property` while explaining it. And a declaration marked `attribute: false` is dropped, because that property exists only as a property and no attribute reaches it.
 *
 * `tests/jsx-types.test.ts` holds the result to Lit's own `elementProperties`, read off the finalized class in a DOM, so the scan and the runtime cannot drift apart quietly.
 */
import { readFileSync } from 'node:fs';
import { code, sourcePathForSlug } from './component-parts.js';
import { BASE_PROPS, CONFIG_PROPS } from './wrapper-meta.js';

const BASE_ELEMENT_SOURCE = 'packages/ui/src/utils/base-element.ts';

/** One attribute a tag accepts, ready to print into a typings file. */
export interface ElementAttr {
	/** The attribute name as it is written in markup. */
	attribute: string;
	/** The TypeScript type of the attribute VALUE, which is not always the property type: an attribute carrying JSON is a string. */
	type: string;
	/** Documentation for the attribute, where the wrapper metadata already writes it. */
	comment?: string;
}

/** A `@property(...)` decorator and the field it decorates. Every options object in this library is one line with no nested parentheses, which is what lets the options be captured as a flat slice. */
const DECL =
	/@property\(([^)]*)\)\s*(?:accessor\s+)?(?:declare\s+)?([A-Za-z_$][\w$]*)/g;

/** Property name to attribute name, exactly as Lit resolves it: an explicit string wins, `false` means no attribute at all, and the default is the lowercased property name. */
function attributeFor(options: string, prop: string): string | undefined {
	if (/attribute:\s*false/.test(options)) return undefined;
	const explicit = options.match(/attribute:\s*['"]([^'"]+)['"]/);
	return explicit?.[1] ?? prop.toLowerCase();
}

/**
 * The type to print for an attribute value.
 *
 * @remarks
 * The Lit converter decides the shape: `Boolean` reads presence, `Number` parses a number, and everything else arrives as text, including the `Array` and custom-converter properties whose attribute is JSON. Where the wrapper metadata already narrows a string property to a literal union (`'wheel' | 'table'`), that union is the better answer and is reused, so the tag typing and the wrapper typing cannot disagree about which values are legal.
 */
function attributeType(
	options: string,
	wrapperType: string | undefined,
): string {
	if (/type:\s*Boolean/.test(options)) return 'boolean';
	if (/type:\s*Number/.test(options)) return 'number';
	return wrapperType?.startsWith("'") ? wrapperType : 'string';
}

/** Every attributed property declared in one source file, in declaration order. */
function scan(source: string, docs: Map<string, string>): ElementAttr[] {
	const out: ElementAttr[] = [];
	const seen = new Set<string>();
	for (const [, options, prop] of code(source).matchAll(DECL)) {
		const attribute = attributeFor(options as string, prop as string);
		if (!attribute || seen.has(attribute)) continue;
		seen.add(attribute);
		out.push({
			attribute,
			type: attributeType(options as string, docs.get(`${prop}:type`)),
			comment: docs.get(`${prop}:comment`),
		});
	}
	return out;
}

/** Wrapper metadata as a flat lookup, so the scan can borrow a narrowed type and its documentation without re-deriving either. */
function docsFor(props: { prop: string; type: string; comment: string }[]) {
	const map = new Map<string, string>();
	for (const p of props) {
		map.set(`${p.prop}:type`, p.type);
		map.set(`${p.prop}:comment`, p.comment);
	}
	return map;
}

/** The attributes on `RoxyDataElement`, which every data component inherits and therefore accepts. */
export function baseAttributes(): ElementAttr[] {
	return scan(readFileSync(BASE_ELEMENT_SOURCE, 'utf8'), docsFor(BASE_PROPS));
}

/**
 * The attributes one component declares itself, without the inherited ones.
 *
 * @remarks
 * A component that does not extend `RoxyDataElement` (the self-fetch form and the city search) declares its whole surface in its own file, so its list is complete on its own; {@link extendsBase} is what tells the two cases apart.
 */
export function ownAttributes(slug: string): ElementAttr[] {
	const source = readFileSync(sourcePathForSlug(slug), 'utf8');
	return scan(source, docsFor(CONFIG_PROPS[slug] ?? []));
}

/** Whether a component inherits the base attribute set. */
export function extendsBase(slug: string): boolean {
	return /extends\s+RoxyDataElement/.test(
		code(readFileSync(sourcePathForSlug(slug), 'utf8')),
	);
}
