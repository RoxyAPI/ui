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
	type?: string;
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
		union.find((m) => m.type && m.type !== 'null') ??
		union[0] ??
		s
	);
}

/**
 * Map one resolved schema to its {@link InputKind}, or `null` when the shape is genuinely unhandled. The form treats `null` as a plain text fallback (never crashes); the taxonomy gate treats it as a failure (forces a decision). Object schemas are never passed here: an object with `properties` expands into a group of leaf fields upstream, so it has no leaf kind of its own.
 */
export function classifyInput(schema: OpenApiSchema): InputKind | null {
	const s = representative(schema);
	if (Array.isArray(s.enum))
		return s.enum.length <= TILE_MAX ? 'tiles' : 'select';
	if (s.type === 'boolean') return 'toggle';
	if (s.format === 'date') return 'date';
	if (s.format === 'time') return 'time';
	if (s.format === 'date-time') return 'datetime';
	if (s.type === 'integer' || s.type === 'number') return 'number';
	if (s.type === 'string') return 'text';
	if (s.type === 'array') return 'array';
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
				fields.push(
					toField(name, resolved, { key: name, required: required.has(name) }),
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
