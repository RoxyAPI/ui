/**
 * The field-label half of the i18n registry: the words a form writes over a request field.
 *
 * @remarks
 * A SEPARATE key space from the chrome catalogue, and these tests exist mainly to hold that
 * separation. Chrome is keyed by the English source string, which is a constant in our source; a
 * field label is keyed by the WIRE NAME, because the English text is itself computed by
 * `humanize()` and there is no constant to key on. Confusing the two is the mistake this file is
 * here to make loud.
 *
 * @remarks
 * Every resolver returns `undefined` on a miss rather than echoing the name back. That is the
 * contract the form depends on: the CALLER owns the fallback (`humanize()`), so an untranslated
 * language, a language we do not ship, a key a translator declined to guess, and a page with no
 * payload at all are one code path, not four.
 */

import { afterAll, beforeEach, describe, expect, test } from 'bun:test';
import {
	fieldLabel,
	optionLabel,
	registerFieldLabels,
	translate,
} from '../src/i18n/registry.js';

const GLOBAL_KEY = '__ROXY_UI_I18N__';
const holder = globalThis as Record<string, unknown>;

/**
 * The registry is a `globalThis` singleton shared by every test FILE in the run, so clearing it
 * outright is not isolation, it is sabotage of whatever ran first: doing exactly that took 14
 * unrelated tests down while this file passed on its own. Snapshot it, hand each test a clean
 * one, and put the original back at the end.
 */
const original = holder[GLOBAL_KEY];

beforeEach(() => {
	holder[GLOBAL_KEY] = undefined;
});

afterAll(() => {
	holder[GLOBAL_KEY] = original;
});

describe('field labels resolve by wire name', () => {
	test('a registered label wins', () => {
		registerFieldLabels('es', {
			fields: { birthDate: 'Fecha de nacimiento' },
			enums: {},
		});
		expect(fieldLabel('es', 'birthDate')).toBe('Fecha de nacimiento');
	});

	test('a key the catalogue lacks returns undefined, so the caller can humanize', () => {
		registerFieldLabels('es', {
			fields: { birthDate: 'Fecha de nacimiento' },
			enums: {},
		});
		// `sookshma` is exactly the shape of a real gap: a deep-Jyotisha term several
		// translators declined to guess rather than invent.
		expect(fieldLabel('es', 'sookshma')).toBeUndefined();
	});

	test('a language with no catalogue returns undefined for every key', () => {
		registerFieldLabels('es', {
			fields: { birthDate: 'Fecha de nacimiento' },
			enums: {},
		});
		expect(fieldLabel('ja', 'birthDate')).toBeUndefined();
	});

	test('no language at all returns undefined rather than throwing', () => {
		expect(fieldLabel(undefined, 'birthDate')).toBeUndefined();
		expect(optionLabel(undefined, 'nodeType', 'mean')).toBeUndefined();
	});

	test('an unregistered registry answers undefined instead of crashing a first paint', () => {
		expect(fieldLabel('es', 'birthDate')).toBeUndefined();
	});
});

describe('a regional tag reads its base catalogue', () => {
	test('es-AR and es-419 both resolve against es', () => {
		registerFieldLabels('es', { fields: { latitude: 'Latitud' }, enums: {} });
		expect(fieldLabel('es-AR', 'latitude')).toBe('Latitud');
		expect(fieldLabel('es-419', 'latitude')).toBe('Latitud');
	});

	test('casing does not decide, because a host page may write ES or es-ar', () => {
		registerFieldLabels('es', { fields: { latitude: 'Latitud' }, enums: {} });
		expect(fieldLabel('ES', 'latitude')).toBe('Latitud');
		expect(fieldLabel('es-AR'.toUpperCase(), 'latitude')).toBe('Latitud');
	});

	test('an exact regional catalogue still wins over the base if one is ever registered', () => {
		registerFieldLabels('es', { fields: { latitude: 'Latitud' }, enums: {} });
		registerFieldLabels('es-AR', {
			fields: { latitude: 'Latitud rioplatense' },
			enums: {},
		});
		expect(fieldLabel('es-AR', 'latitude')).toBe('Latitud rioplatense');
		expect(fieldLabel('es', 'latitude')).toBe('Latitud');
	});
});

describe('option labels are keyed {field}.{value}, not by the bare value', () => {
	test('the same value reads differently under different fields', () => {
		// This is the whole reason the key is composite. `true` is a lunar node convention
		// under `nodeType` and a boolean everywhere else; a flat value map would force one
		// of them to lose.
		registerFieldLabels('es', {
			fields: {},
			enums: { 'nodeType.true': 'Nodo verdadero', 'strictOrbs.true': 'Sí' },
		});
		expect(optionLabel('es', 'nodeType', 'true')).toBe('Nodo verdadero');
		expect(optionLabel('es', 'strictOrbs', 'true')).toBe('Sí');
	});

	test('an option the catalogue lacks returns undefined even when its field is known', () => {
		registerFieldLabels('es', {
			fields: {},
			enums: { 'nodeType.mean': 'Nodo medio' },
		});
		expect(optionLabel('es', 'nodeType', 'true')).toBeUndefined();
	});

	test('a value containing a dot still resolves, because only the FIRST dot is the split', () => {
		registerFieldLabels('es', {
			fields: {},
			enums: { 'houseSystem.whole-sign': 'Signo entero' },
		});
		expect(optionLabel('es', 'houseSystem', 'whole-sign')).toBe('Signo entero');
	});
});

describe('the two key spaces never collide', () => {
	test('a chrome catalogue does not answer field-label lookups, and vice versa', () => {
		// Registering one must not populate the other. They share a registry object and a
		// listener set; they do not share a namespace.
		registerFieldLabels('es', { fields: { Loading: 'NOT-CHROME' }, enums: {} });
		expect(translate('es', 'Loading')).toBe('Loading');
		expect(fieldLabel('es', 'Loading')).toBe('NOT-CHROME');
	});

	test('a later registration replaces that language wholesale rather than merging', () => {
		registerFieldLabels('es', { fields: { a: '1', b: '2' }, enums: {} });
		registerFieldLabels('es', { fields: { a: '9' }, enums: {} });
		expect(fieldLabel('es', 'a')).toBe('9');
		// `b` is gone on purpose: a payload is the whole catalogue for its language, so a
		// merge would let a stale key outlive the build that dropped it.
		expect(fieldLabel('es', 'b')).toBeUndefined();
	});
});
