/**
 * Pure, framework-free schema layer shared by the self-fetch form. It turns one OpenAPI operation into a digested list of {@link FieldDef}s whose {@link InputKind} decides which input widget renders, with zero Lit or DOM dependency so the build-time slice generator ({@link ../../../scripts/build-schemas.ts}) and the taxonomy-coverage test consume the exact same classification the browser does.
 *
 * @remarks
 * The registry is by SHAPE, never by name: {@link classifyInput} inspects `enum` / `type` / `format` only, so a new API parameter gets a working widget with no code change, and the taxonomy gate fails loudly (via a `null` return) the day a genuinely new shape appears. Name-driven behaviour (suppressing `lang`, hiding `seed` / `limit` / `offset`, replacing the latitude+longitude+timezone trio with a city search) is a separate render-time concern layered on top by the form, never encoded here.
 */

import { SIGNS_ORDER } from '../tokens/index.js';
import { humanize } from './string.js';

/** A JSON `$ref` node, before resolution against `components.schemas`. */
export interface OpenApiSchemaRef {
	$ref?: string;
}

/** The subset of an OpenAPI 3 schema object the form reads. */
export interface OpenApiSchema extends OpenApiSchemaRef {
	/** A plain name in 3.0, or an ARRAY in 3.1 where nullability is spelled `['number', 'null']`. Read it through {@link scalarType}, never compare it directly. */
	type?: string | string[];
	format?: string;
	description?: string;
	enum?: string[];
	default?: unknown;
	minimum?: number;
	maximum?: number;
	exclusiveMinimum?: number;
	exclusiveMaximum?: number;
	pattern?: string;
	properties?: Record<string, OpenApiSchema>;
	required?: string[];
	items?: OpenApiSchema;
	minItems?: number;
	maxItems?: number;
	example?: unknown;
	anyOf?: OpenApiSchema[];
	oneOf?: OpenApiSchema[];
}

/** One operation's request shape, as read from `spec.paths[path][method]`. */
export interface OperationSchema {
	summary?: string;
	requestBody?: {
		content?: Record<string, { schema?: OpenApiSchema | OpenApiSchemaRef }>;
	};
	parameters?: Array<{
		name: string;
		in: string;
		required?: boolean;
		schema?: OpenApiSchema;
	}>;
}

/** The minimal OpenAPI document surface the form introspects. */
export interface OpenApiDoc {
	paths?: Record<string, Record<string, unknown>>;
	components?: { schemas?: Record<string, OpenApiSchema> };
}

/** The fully typed spec document the build-time scripts read from the committed `specs/openapi.json`: every path item value is an {@link OperationSchema}. The runtime form keeps the looser {@link OpenApiDoc} because a live spec fetch is untrusted input it narrows per operation. */
export interface SpecDoc {
	paths: Record<string, Record<string, OperationSchema>>;
	components?: { schemas?: Record<string, OpenApiSchema> };
}

/**
 * The widget kind a parameter resolves to. This is the closed set the taxonomy gate enforces: every request parameter in the spec MUST classify to one of these, or {@link classifyInput} returns `null` and the gate fails, forcing a conscious decision when the API grows a new shape.
 */
export type InputKind =
	| 'tiles'
	| 'select'
	| 'toggle'
	| 'date'
	| 'time'
	| 'datetime'
	| 'number'
	| 'text'
	| 'array';

/** A single input the form renders, digested from one schema property or parameter. */
export interface FieldDef {
	/** Unique storage + input key: the property name, or "group.name" for a nested object field. */
	key: string;
	/** Schema property name (the label source), e.g. "date". */
	name: string;
	/** Parent object key for a nested schema (person1/person2); undefined for a flat field. */
	group?: string;
	/** True when the spec declares the field as `in: query`, so it belongs in the query string even on a POST. */
	inQuery?: boolean;
	/** The resolved widget kind. */
	kind: InputKind;
	required: boolean;
	description?: string;
	enum?: string[];
	min?: number;
	max?: number;
	default?: unknown;
	/** Spec `example`, used as the placeholder for a text input. */
	example?: unknown;
	/** Where the choices for this field are listed, when the API serves them; the form reads them at run time. */
	source?: OptionSource;
}

/**
 * A GET collection on the API that lists the choices for one request field.
 *
 * @remarks
 * Two kinds reach a form, both resolved at build time into `generated/option-sources.ts`: a filter whose values the API serves as a list of their own (the letters the dream dictionary holds, the colours the crystal list filters on), and a free-string path identifier (`/dreams/symbols/{id}`), whose choices are the collection one segment up. The spec stays UI-agnostic either way: the first is a hint declared in `scripts/bindings.config.ts`, the second is derived from the paths.
 */
export interface OptionSource {
	/** Path of the collection, leading slash. */
	path: string;
	/** The query parameter that searches the collection, when it has one; absent, the whole collection is read once and filtered as the visitor types. */
	search?: string;
	/** The largest page the collection serves, so a read asks for as much of it as one request allows. */
	limit?: number;
	/** True when the collection takes `?lang=`, so its names arrive in the page language. */
	lang?: true;
}

/** One choice a field offers: the wire value, the words a visitor reads, and whether it can be picked. */
export interface FieldOption {
	value: string;
	label: string;
	disabled?: boolean;
}

/** The digested form model for one operation. The build-time slice is exactly this shape. */
/**
 * A request property that is an ARRAY of objects, each a card of its own on the form.
 *
 * @remarks
 * A penta takes three to five birth records and a custom spread one to ten positions. The item schema expands into one group per record, keyed `{key}.{index}` so the group machinery (legend, city search, validation) treats each record like a `person1`; the model carries `min` records and the form grows to `max`. A comma-separated text box cannot take a birth record, which is what this exists to replace.
 */
export interface RepeatDef {
	/** The array property name on the wire, e.g. `members`. */
	key: string;
	min: number;
	max: number;
}

export interface FormModel {
	/** Concise heading derived from the operation summary, falling back to the path. */
	title: string;
	/** Every rendered field. The `lang` query parameter is intentionally excluded (routed via the element `lang` attribute instead). */
	fields: FieldDef[];
	/** True when the operation carries a `lang` query parameter, so the form knows to route an effective language to the query string on submit. */
	hasLang: boolean;
	/** The array-of-object properties, each already expanded into `min` groups inside `fields`. Absent when the request has none. */
	repeats?: RepeatDef[];
}

/** The group key of the `index`th record of a repeating property, and its inverse. */
export const repeatGroup = (key: string, index: number): string =>
	`${key}.${index}`;
export function parseRepeatGroup(
	group: string,
): { key: string; index: number } | null {
	const m = /^(.+)\.(\d+)$/.exec(group);
	return m ? { key: m[1] as string, index: Number(m[2]) } : null;
}

/** The fields of one record of a repeating property, from the fields of its first record. Every record is the same template, so the form grows a repeat by re-keying record zero. */
export function repeatFields(
	fields: readonly FieldDef[],
	key: string,
	index: number,
): FieldDef[] {
	const first = repeatGroup(key, 0);
	return fields
		.filter((f) => f.group === first)
		.map((f) => ({
			...f,
			key: `${repeatGroup(key, index)}.${f.name}`,
			group: repeatGroup(key, index),
		}));
}

/**
 * Tiles or a select for a set of choices, decided by their SHAPE: a letter or a two-character code is a narrow tile, so up to thirty fit a row the way an index bar does, while a word or a name keeps the twelve a zodiac grid needs and anything longer is a select.
 */
export function optionKind(values: readonly string[]): 'tiles' | 'select' {
	return values.length <= (isIndex(values) ? 30 : 12) ? 'tiles' : 'select';
}

/** True for choices that read as an index (letters, two-character codes) rather than words. */
export function isIndex(values: readonly string[]): boolean {
	return values.every((v) => v.length <= 2);
}

/** The latitude+longitude+timezone trio the form suppresses in favour of a city search. Centralised so the render path and tests agree. */
export const LOCATION_TRIO = ['latitude', 'longitude', 'timezone'] as const;

/**
 * The coordinate pair that DEFINES a location group. `timezone` is deliberately absent.
 *
 * @remarks
 * A group qualifies for a city search on latitude+longitude alone, because a timezone is not always
 * part of the group that owns the coordinates: `generateRelocationChart` carries two coordinate
 * pairs and exactly ONE top-level `timezone`, which is the BIRTH timezone (relocating does not move
 * the birth moment), so the relocation pair correctly has no timezone of its own. Requiring all
 * three would leave that operation rendering raw number inputs, which is the bug this exists to
 * prevent.
 */
export const LOCATION_PAIR = ['latitude', 'longitude'] as const;

/**
 * Split a flat coordinate property into its group prefix and canonical leaf name, or `null` when the
 * name is not a prefixed coordinate.
 *
 * @remarks
 * **Two shapes carry two locations in one request and this handles the second one.** Most
 * multi-location operations nest per person (`person1`/`person2`, `personA`/`personB`), so object
 * nesting alone already groups them. `generateRelocationChart` is the only operation in the spec
 * that instead puts both pairs at the TOP level and distinguishes them by a name prefix
 * (`birthLatitude` / `relocationLatitude`). Keying the grouping off the prefix as well as off the
 * nesting means both shapes converge on the same group machinery, and a future `partnerLatitude`
 * needs no code change.
 *
 * Matching is deliberately restricted to the coordinate pair. A prefix is NOT harvested from any
 * other field name, so `birthDate` stays an ordinary field in the flat group and does not invent a
 * phantom `birth` group with a lone date in it.
 */
function splitCoordinateName(
	name: string,
): { group: string; leaf: (typeof LOCATION_PAIR)[number] } | null {
	const m = name.match(/^(.+?)(Latitude|Longitude)$/);
	if (!m) return null;
	return {
		group: m[1],
		leaf: m[2].toLowerCase() as (typeof LOCATION_PAIR)[number],
	};
}

/** Canonical lowercase zodiac set, derived from {@link SIGNS_ORDER} so sign detection and the glyph map can never disagree. */
const ZODIAC_LOWER = SIGNS_ORDER.map((s) => s.toLowerCase());

/** Resolve a `$ref` (one hop is all the spec uses) against the schema map; pass non-refs through. */
export function resolveSchema(
	schema: OpenApiSchema | OpenApiSchemaRef | undefined,
	all: Record<string, OpenApiSchema>,
): OpenApiSchema | undefined {
	if (!schema) return undefined;
	if ('$ref' in schema && schema.$ref) {
		const name = schema.$ref.split('/').pop();
		return name ? all[name] : undefined;
	}
	return schema as OpenApiSchema;
}

/**
 * Collapse an `anyOf`/`oneOf` union to the single member that decides the widget: an enum member wins (so `houseSystem` as enum-or-string renders as a picker), then any concrete-typed member (so timezone as number-or-string resolves to a real kind), else the first member. Non-union schemas pass through untouched.
 */
function representative(s: OpenApiSchema): OpenApiSchema {
	const union = s.anyOf ?? s.oneOf;
	if (!union || union.length === 0) return s;
	return (
		union.find((m) => Array.isArray(m.enum)) ??
		union.find((m) => scalarType(m) && scalarType(m) !== 'null') ??
		union[0] ??
		s
	);
}

/**
 * Map one resolved schema to its {@link InputKind}, or `null` when the shape is genuinely unhandled. The form treats `null` as a plain text fallback (never crashes); the taxonomy gate treats it as a failure (forces a decision). Object schemas are never passed here: an object with `properties` expands into a group of leaf fields upstream, so it has no leaf kind of its own.
 */
/**
 * The single scalar type name a schema resolves to, across both OpenAPI spellings.
 *
 * @remarks
 * OpenAPI 3.1 expresses a nullable scalar as `type: ['number', 'null']` where 3.0 wrote `type: 'number', nullable: true`. Every direct `type === 'number'` comparison silently stops matching the day the served document switches, and the field then classifies as UNHANDLED rather than as a number, which is how a whole form degrades to text boxes without one test noticing. The `null` member carries no input information, so the remaining single member IS the type.
 */
export function scalarType(s: OpenApiSchema): string | undefined {
	if (typeof s.type === 'string') return s.type;
	if (!Array.isArray(s.type)) return undefined;
	const real = s.type.filter((t) => t !== 'null');
	return real.length === 1 ? real[0] : undefined;
}

export function classifyInput(schema: OpenApiSchema): InputKind | null {
	const s = representative(schema);
	const type = scalarType(s);
	if (Array.isArray(s.enum)) return optionKind(s.enum);
	if (type === 'boolean') return 'toggle';
	if (s.format === 'date') return 'date';
	if (s.format === 'time') return 'time';
	if (s.format === 'date-time') return 'datetime';
	if (type === 'integer' || type === 'number') return 'number';
	if (type === 'string') return 'text';
	if (type === 'array') return 'array';
	return null;
}

/** True when an enum's values are exactly the twelve zodiac signs (case-insensitive), so the tiles can carry sign glyphs. */
export function isZodiacEnum(values: readonly string[]): boolean {
	if (values.length !== 12) return false;
	const lower = new Set(values.map((v) => v.toLowerCase()));
	return ZODIAC_LOWER.every((s) => lower.has(s));
}

/** One digested leaf field from a resolved schema. Shared by the flat and grouped construction paths so params and body props carry identical metadata (min/max included). */
function toField(
	name: string,
	resolved: OpenApiSchema,
	opts: { key: string; group?: string; required: boolean; inQuery?: boolean },
): FieldDef {
	const rep = representative(resolved);
	return {
		key: opts.key,
		name,
		group: opts.group,
		inQuery: opts.inQuery,
		kind: classifyInput(resolved) ?? 'text',
		required: opts.required,
		description: rep.description ?? resolved.description,
		enum: rep.enum,
		// HTML has no exclusive bound, so an exclusive one is the nearest an input can state; the API refuses the bound itself and prints why under the field.
		min: rep.minimum ?? rep.exclusiveMinimum,
		max: rep.maximum ?? rep.exclusiveMaximum,
		default: resolved.default ?? rep.default,
		example: resolved.example ?? rep.example,
	};
}

/**
 * Digest one operation into the {@link FormModel} the form renders. This is the single construction path: body properties (nested objects expand to `group.sub` keys) and path+query parameters flow through {@link toField} identically, so a query integer keeps its min/max the same as a body integer. The `lang` query parameter is dropped from `fields` and surfaced as {@link FormModel.hasLang} instead.
 */
export function buildFormModel(
	op: OperationSchema,
	schemas: Record<string, OpenApiSchema>,
	endpoint: string,
): FormModel {
	const fields: FieldDef[] = [];
	const repeats: RepeatDef[] = [];
	let hasLang = false;

	const bodyRef = op.requestBody?.content?.['application/json']?.schema;
	const bodySchema = resolveSchema(bodyRef, schemas);
	if (bodySchema?.properties) {
		const required = new Set(bodySchema.required ?? []);
		for (const [name, sub] of Object.entries(bodySchema.properties)) {
			const resolved = resolveSchema(sub, schemas) ?? {};
			const item =
				resolved.type === 'array'
					? resolveSchema(resolved.items, schemas)
					: undefined;
			if (item?.type === 'object' && item.properties) {
				const min = Math.max(1, resolved.minItems ?? 1);
				const itemRequired = new Set(item.required ?? []);
				repeats.push({ key: name, min, max: resolved.maxItems ?? min });
				for (let i = 0; i < min; i++) {
					for (const [subName, subSchema] of Object.entries(item.properties)) {
						const r = resolveSchema(subSchema, schemas) ?? {};
						fields.push(
							toField(subName, r, {
								key: `${repeatGroup(name, i)}.${subName}`,
								group: repeatGroup(name, i),
								required: required.has(name) && itemRequired.has(subName),
							}),
						);
					}
				}
			} else if (resolved.type === 'object' && resolved.properties) {
				const subRequired = new Set(resolved.required ?? []);
				for (const [subName, subSchema] of Object.entries(
					resolved.properties,
				)) {
					const r = resolveSchema(subSchema, schemas) ?? {};
					// A list of objects nested inside a group (a plot's polygon points) has no
					// input a visitor can fill, and a text box for it can only produce a
					// rejected request; the group's scalar alternative (width and depth) is
					// what the form offers.
					if (
						r.type === 'array' &&
						resolveSchema(r.items, schemas)?.type === 'object'
					)
						continue;
					fields.push(
						toField(subName, r, {
							key: `${name}.${subName}`,
							group: name,
							required: required.has(name) && subRequired.has(subName),
						}),
					);
				}
			} else {
				// A prefixed coordinate joins a group named after its prefix and reports the
				// canonical leaf name, so the trio logic and the city search match it unchanged.
				// `key` stays the ORIGINAL property name because it is the storage and wire
				// identity: rewriting it to `birth.latitude` would serialise a body the API
				// rejects.
				const coord = splitCoordinateName(name);
				fields.push(
					coord
						? toField(coord.leaf, resolved, {
								key: name,
								group: coord.group,
								required: required.has(name),
							})
						: toField(name, resolved, {
								key: name,
								required: required.has(name),
							}),
				);
			}
		}
	}

	for (const param of op.parameters ?? []) {
		if (param.in !== 'path' && param.in !== 'query') continue;
		// lang is site-owner chrome, not a visitor field: route it through the
		// element `lang` attribute, never render it in the form.
		if (param.name === 'lang' && param.in === 'query') {
			hasLang = true;
			continue;
		}
		const resolved = resolveSchema(param.schema, schemas) ?? {};
		fields.push(
			toField(param.name, resolved, {
				key: param.name,
				required: !!param.required,
				inQuery: param.in === 'query',
			}),
		);
	}

	return {
		title: deriveTitle(op.summary, endpoint),
		fields,
		hasLang,
		...(repeats.length > 0 ? { repeats } : {}),
	};
}

/**
 * Concise form heading. Prefers the operation summary (spec-authored), taking the clause before the first " - " so "Daily horoscope by zodiac sign - Transit-based forecast" reads as "Daily horoscope by zodiac sign", and falls back to the humanized last path segment.
 */
export function deriveTitle(
	summary: string | undefined,
	endpoint: string,
): string {
	const lead = summary?.split(' - ')[0]?.trim();
	if (lead) return lead;
	return humanize(endpoint.split('/').pop() ?? '');
}

/**
 * True when a form can show its result before the visitor asks: a read (GET) that needs nothing from them, such as a list, today's phase or a random draw.
 *
 * @remarks
 * The ONE rule the self-fetch component, the hosted embed and the one-tag widget script all ask, so the three never disagree about which forms open on a result. A POST is never one, because a request body with nothing required is usually an either-or the schema cannot state, and sending it empty is a 400 rather than a default reading.
 */
export function opensOnLoad(model: FormModel, method: string): boolean {
	return (
		method.toUpperCase() === 'GET' && !model.fields.some((f) => f.required)
	);
}

/**
 * Outcome-first submit-button label keyed off the endpoint intent. A paged collection is searched, chart and reading endpoints "Generate", divination endpoints "Cast", comparison endpoints "Compare", and lookup/reading GETs "Get reading". A generic verb beats a bare "Submit" on a widget a visitor never set up.
 *
 * Returns the CANONICAL English verb, which is also its catalogue key: the form translates the result rather than this function doing it, because this module is request-context-free and has no element to resolve a page language from. Every verb lives in `i18n/chrome-strings.ts`, and `tests/i18n.test.ts` runs this function over every operation in the committed spec so a new verb cannot be added without a catalogue entry.
 *
 * @param fields - The form fields, when known: a request that pages (`limit`, `offset`) lists a collection, which a visitor searches whatever domain the path names.
 */
export function deriveSubmitLabel(
	endpoint: string,
	fields: readonly FieldDef[] = [],
): string {
	if (fields.some((f) => f.name === 'limit' || f.name === 'offset'))
		return 'Search';
	const e = endpoint.toLowerCase();
	if (/compat|synastry|guna|connection|penta|composite/.test(e))
		return 'Compare';
	if (/\bcast\b|\/draw|iching|hexagram|tarot/.test(e)) return 'Cast';
	if (/horoscope|dream|angel|nakshatra|crystal|meaning|reference/.test(e))
		return 'Get reading';
	return 'Generate';
}

/** Deterministic slice filename for one operation, shared by the generator and the runtime loader so both address the same artifact. */
export function sliceFileName(method: string, endpoint: string): string {
	const path = endpoint
		.replace(/^\//, '')
		.replace(/[{}]/g, '')
		.replace(/\//g, '-');
	return `${method.toLowerCase()}--${path}.json`;
}

/** The array or count map a collection response carries its entries in: the response itself when it is a list, else its first list, else its first object of counts. */
function entriesOf(json: unknown): unknown[] | Record<string, number> | null {
	if (Array.isArray(json)) return json;
	if (!json || typeof json !== 'object') return null;
	const values = Object.values(json as Record<string, unknown>);
	const list = values.find(Array.isArray);
	if (list) return list as unknown[];
	const counts = values.find(
		(v) =>
			!!v &&
			typeof v === 'object' &&
			Object.values(v).every((n) => typeof n === 'number'),
	);
	return (counts as Record<string, number> | undefined) ?? null;
}

/**
 * The choices a collection response offers, read from its shape and never from its name.
 *
 * @remarks
 * Three shapes: a list of strings (each is its own value), a list of records (the value is the record's `id`, else the field's own name, else its `number`; the words are its `name`, else its `english` name, else the value), and a map of counts, where a zero is a choice with nothing behind it. A map keyed by single letters is an index, so the letters it omits are listed too, disabled, and a reader sees the whole alphabet.
 *
 * @param field - The request field the choices fill, which is also where a record may carry its value (an angel number sequence sits in `number`).
 */
export function optionsFrom(json: unknown, field = 'id'): FieldOption[] {
	const entries = entriesOf(json);
	if (!entries) return [];
	if (!Array.isArray(entries)) {
		const keys = Object.keys(entries);
		const index = keys.length > 0 && keys.every((k) => /^[a-z]$/.test(k));
		const all = index ? [...'abcdefghijklmnopqrstuvwxyz'] : keys;
		return all.map((k) => ({
			value: k,
			label: index ? k.toUpperCase() : k,
			disabled: !entries[k],
		}));
	}
	const out: FieldOption[] = [];
	for (const item of entries) {
		if (typeof item === 'string') {
			out.push({ value: item, label: item });
			continue;
		}
		if (!item || typeof item !== 'object') continue;
		const r = item as Record<string, unknown>;
		const raw = r.id ?? r[field] ?? r.number;
		if (raw == null) continue;
		const value = String(raw);
		const name = r.name ?? r.english;
		out.push({ value, label: typeof name === 'string' ? name : value });
	}
	return out;
}

/** The total a paged collection reports, or undefined when it reports none. */
export function totalOf(json: unknown): number | undefined {
	const t = (json as { total?: unknown } | null)?.total;
	return typeof t === 'number' ? t : undefined;
}

/**
 * The collection a free-string path identifier is chosen from: the GET one segment up, as the spec declares it, or undefined when there is none.
 *
 * @remarks
 * Only a FREE string qualifies: an enum already lists its choices, and a pattern, a format or a number type already tells the input what to accept. So `/dreams/symbols/{id}` picks from `/dreams/symbols`, `/crystals/{id}` from `/crystals`, and `/numerology/meanings/{number}`, whose pattern names its twelve values, keeps its input.
 */
export function pickerSource(
	spec: SpecDoc,
	path: string,
	param: { name: string; required?: boolean; schema?: OpenApiSchema },
): OptionSource | undefined {
	const s = resolveSchema(param.schema, spec.components?.schemas ?? {}) ?? {};
	if (!param.required || scalarType(s) !== 'string') return undefined;
	if (s.enum || s.pattern || s.format) return undefined;
	const suffix = `/{${param.name}}`;
	if (!path.endsWith(suffix)) return undefined;
	const parent = path.slice(0, -suffix.length);
	return parent ? collectionSource(spec, parent) : undefined;
}

/** How a GET collection is read for its choices: its search parameter, its largest page and whether it is localized, all from its declared query parameters. */
export function collectionSource(
	spec: SpecDoc,
	path: string,
): OptionSource | undefined {
	const op = spec.paths[path]?.get;
	if (!op) return undefined;
	const schemas = spec.components?.schemas ?? {};
	const query = (op.parameters ?? []).filter((p) => p.in === 'query');
	const limit = query.find((p) => p.name === 'limit');
	const max = resolveSchema(limit?.schema, schemas)?.maximum;
	return {
		path,
		...(query.some((p) => p.name === 'q') ? { search: 'q' } : {}),
		...(max !== undefined ? { limit: max } : {}),
		...(query.some((p) => p.name === 'lang') ? { lang: true as const } : {}),
	};
}
