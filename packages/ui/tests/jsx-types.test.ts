import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';

import {
	baseAttributes,
	extendsBase,
	ownAttributes,
} from '../../../scripts/element-attrs.js';
import { ROXY_COMPONENTS } from '../src/manifest.js';
import '../src/index.js';

/**
 * The raw-tag typings say what a page may write in markup, so they are held to what the elements actually accept.
 *
 * @remarks
 * `packages/ui-react/src/jsx.ts` is generated from a SCAN of the `@property` declarations, because a build script has no DOM and cannot finalize a Lit class to ask it. A scan can be wrong in ways nothing else notices: a renamed attribute, a property declared through a helper, a decorator this regex cannot see. So the scan is checked here, in the one environment that has both, against `elementProperties`, which is Lit's own answer after finalizing the class.
 *
 * A typing that promises an attribute the element ignores is the failure this exists for: the page compiles, the attribute is written into the markup, and nothing reads it.
 */
const JSX_TYPES = readFileSync(
	new URL('../../ui-react/src/jsx.ts', import.meta.url),
	'utf8',
);

/** What Lit resolved for one element after finalize: every property that has an attribute, by attribute name. */
function litAttributes(tag: string): Set<string> {
	const ctor = customElements.get(tag) as
		| (CustomElementConstructor & {
				elementProperties?: Map<string | symbol, { attribute?: unknown }>;
		  })
		| undefined;
	expect(ctor, `${tag} is not registered`).toBeDefined();
	const props = ctor?.elementProperties;
	expect(props?.size ?? 0).toBeGreaterThan(0);
	const out = new Set<string>();
	for (const [name, options] of props ?? []) {
		if (options.attribute === false) continue;
		out.add(
			typeof options.attribute === 'string'
				? options.attribute
				: String(name).toLowerCase(),
		);
	}
	return out;
}

describe('raw-tag typings', () => {
	test('every component is a typed intrinsic element', () => {
		for (const { tag } of ROXY_COMPONENTS) {
			expect(JSX_TYPES, `${tag} is missing from jsx.ts`).toContain(`'${tag}'`);
		}
		// React 19 removed the global JSX namespace, so the augmentation has to be
		// written into the react module or it types nothing and reports nothing.
		expect(JSX_TYPES).toContain("declare module 'react'");
		expect(JSX_TYPES).toContain('interface IntrinsicElements');
	});

	test('the scanned attributes are the ones the elements actually accept', () => {
		for (const { slug, tag } of ROXY_COMPONENTS) {
			const scanned = new Set(
				[
					...(extendsBase(slug) ? baseAttributes() : []),
					...ownAttributes(slug),
				].map((a) => a.attribute),
			);
			// `lang` is read as a native attribute rather than declared as a reactive
			// property, so Lit does not list it and React types it already.
			const declared = litAttributes(tag);
			expect(
				[...declared].filter((a) => !scanned.has(a)),
				`${tag}: accepted by the element, missing from the typings`,
			).toEqual([]);
			expect(
				[...scanned].filter((a) => !declared.has(a)),
				`${tag}: typed as an attribute the element does not read`,
			).toEqual([]);
		}
	});

	test('a property with no attribute is not typed as one', () => {
		// `data` is `attribute: false`: it is set as a property, and a page that
		// wrote it in markup would be handing the component a string.
		expect(JSX_TYPES).not.toContain("'data'?:");
		expect(baseAttributes().some((a) => a.attribute === 'data')).toBe(false);
	});
});
