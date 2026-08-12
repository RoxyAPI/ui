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
	properties?: Record<string, OpenApiSchema>;
	required?: string[];
	items?: OpenApiSchema;
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
}

/** The digested form model for one operation. The build-time slice is exactly this shape. */
export interface FormModel {
	/** Concise heading derived from the operation summary, falling back to the path. */
	title: string;
	/** Every rendered field. The `lang` query parameter is intentionally excluded (routed via the element `lang` attribute instead). */
	fields: FieldDef[];
	/** True when the operation carries a `lang` query parameter, so the form knows to route an effective language to the query string on submit. */
	hasLang: boolean;
}

/** At most this many enum options render as a tile/chip picker; above it a filterable select is used instead. */
export const TILE_MAX = 12;

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
export function splitCoordinateName(
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
	if (Array.isArray(s.enum))
		return s.enum.length <= TILE_MAX ? 'tiles' : 'select';
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
		min: rep.minimum,
		max: rep.maximum,
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
	let hasLang = false;

	const bodyRef = op.requestBody?.content?.['application/json']?.schema;
	const bodySchema = resolveSchema(bodyRef, schemas);
	if (bodySchema?.properties) {
		const required = new Set(bodySchema.required ?? []);
		for (const [name, sub] of Object.entries(bodySchema.properties)) {
			const resolved = resolveSchema(sub, schemas) ?? {};
			if (resolved.type === 'object' && resolved.properties) {
				const subRequired = new Set(resolved.required ?? []);
				for (const [subName, subSchema] of Object.entries(
					resolved.properties,
				)) {
					const r = resolveSchema(subSchema, schemas) ?? {};
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

	return { title: deriveTitle(op.summary, endpoint), fields, hasLang };
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
 * Outcome-first submit-button label keyed off the endpoint intent. Chart and reading endpoints "Generate", divination endpoints "Cast", comparison endpoints "Compare", and lookup/reading GETs "Get reading". A generic verb beats a bare "Submit" on a widget a visitor never set up.
 *
 * Returns the CANONICAL English verb, which is also its catalogue key: the form translates the result rather than this function doing it, because this module is request-context-free and has no element to resolve a page language from. All four verbs live in `i18n/chrome-strings.ts`, and `tests/i18n.test.ts` runs this function over every operation in the committed spec so a fifth verb cannot be added without a catalogue entry.
 */
export function deriveSubmitLabel(endpoint: string): string {
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
