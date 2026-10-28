/**
 * Pure, framework-free schema layer shared by the self-fetch form. It turns one OpenAPI operation into a digested list of {@link FieldDef}s whose {@link InputKind} decides which input widget renders, with zero Lit or DOM dependency so the build-time slice generator ({@link ../../../scripts/build-schemas.ts}) and the taxonomy-coverage test consume the exact same classification the browser does.
 *
 * @remarks
 * The registry is by SHAPE, never by name: {@link classifyInput} inspects `enum` / `type` / `format` only, so a new API parameter gets a working widget with no code change, and the taxonomy gate fails loudly (via a `null` return) the day a genuinely new shape appears. Name-driven render intent (hidden values, city searches and the Advanced fold) is resolved here too, so browser and server renderers consume the same decisions.
 */
import { interpolate } from '../i18n/registry.js';
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
    /** Input sets of an object whose fields are all optional yet need one complete set; the first is the one a form asks for. */
    'x-required-any-of'?: string[][];
}
/** One operation's request shape, as read from `spec.paths[path][method]`. */
export interface OperationSchema {
    operationId?: string;
    summary?: string;
    requestBody?: {
        content?: Record<string, {
            schema?: OpenApiSchema | OpenApiSchemaRef;
        }>;
    };
    parameters?: Array<{
        name: string;
        in: string;
        description?: string;
        required?: boolean;
        schema?: OpenApiSchema;
    }>;
}
/** The minimal OpenAPI document surface the form introspects. */
export interface OpenApiDoc {
    paths?: Record<string, Record<string, unknown>>;
    components?: {
        schemas?: Record<string, OpenApiSchema>;
    };
}
/** The fully typed spec document the build-time scripts read from the committed `specs/openapi.json`: every path item value is an {@link OperationSchema}. The runtime form keeps the looser {@link OpenApiDoc} because a live spec fetch is untrusted input it narrows per operation. */
export interface SpecDoc {
    paths: Record<string, Record<string, OperationSchema>>;
    components?: {
        schemas?: Record<string, OpenApiSchema>;
    };
}
/**
 * The widget kind a parameter resolves to. This is the closed set the taxonomy gate enforces: every request parameter in the spec MUST classify to one of these, or {@link classifyInput} returns `null` and the gate fails, forcing a conscious decision when the API grows a new shape.
 */
export type InputKind = 'tiles' | 'select' | 'toggle' | 'date' | 'time' | 'datetime' | 'number' | 'text' | 'array';
/** A single input the form renders, digested from one schema property or parameter. */
export interface FieldDef {
    /** Unique storage + input key: the property name, or "group.name" for a nested object field. */
    key: string;
    /** Schema property name (the label source), e.g. "date". */
    name: string;
    /** Contextual English label, overriding the generic name label when it loses the field's meaning. */
    label?: string;
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
    /** Hidden value or coordinate supplied by a group's city box; absent for a visible input. */
    role?: 'seed' | 'hidden-default' | 'location';
    /** A visible timezone input is a city picker writing an IANA zone, never a typed offset. */
    city?: true;
    /** Left empty, the request carries the viewer's IANA zone: an optional flat timezone no coordinate pair claims, whose API default is UTC rather than the visitor's clock. */
    viewerZone?: true;
    /** The reading's own date or time beside a primary group, kept open; left empty it means now. */
    moment?: true;
    /** True when this input (or its whole group) belongs under Advanced. */
    fold?: true;
    /** The other field and value that disable this one, when its binding declares them. */
    disabledWhen?: FieldCondition;
}
/** One request field holding one value: the condition under which a bound form disables another field. */
export interface FieldCondition {
    field: string;
    value: string;
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
/** One field group, in field order. An absent key denotes the flat top level. */
export interface FormGroup {
    key?: string;
    /** English legend for a named group; absent for the unlabelled flat top level. */
    label?: string;
    fold?: true;
    /** A coordinate pair's city box, with the exact wire keys it fills (including its claimed timezone). */
    location?: {
        fields: string[];
        required: boolean;
    };
}
/** The digested form model shared by browser slices and platform-neutral manifests. */
export interface FormModel {
    /** Concise heading derived from the operation summary, falling back to the path. */
    title: string;
    /** Every request field, including hidden defaults and city-filled coordinates. The `lang` query parameter is intentionally excluded (routed via the element `lang` attribute instead). */
    fields: FieldDef[];
    /** True when the operation carries a `lang` query parameter, so the form knows to route an effective language to the query string on submit. */
    hasLang: boolean;
    /** Resolved render intent. Optional only for older slices; normalize with withRenderIntent. */
    groups?: FormGroup[];
    /** Whether a GET can open on its result without visitor input. */
    opensOnLoad?: boolean;
    /** The array-of-object properties, each already expanded into `min` groups inside `fields`. Absent when the request has none. */
    repeats?: RepeatDef[];
    /** Wire-key sets of an either-or request body: any ONE complete set is a valid request. The first set's fields are marked `required`, as are a nested object's first set. Absent when the body has none. */
    requiredAnyOf?: string[][];
}
/** The group key of the `index`th record of a repeating property, and its inverse. */
export declare const repeatGroup: (key: string, index: number) => string;
export declare function parseRepeatGroup(group: string): {
    key: string;
    index: number;
} | null;
/**
 * A group legend, shared by the browser and published labels. Named objects use the chrome
 * catalogue (whose lookup folds case); repeating records use the array's field label and the
 * catalogued numbered-group template. The defaults produce the same legend in English.
 *
 * Catalogue lookup folds case: `humanize('natalChart')` produces `Natal Chart` and reuses
 * the existing `Natal chart` heading translation. Do not add a capitalized twin, which
 * would overwrite that heading in every locale. A new group with no catalogue entry
 * falls back to its humanized English name, so a missing translation never leaves a key
 * or an empty legend inside translated location labels.
 */
export declare function deriveGroupLabel(group: string, t?: typeof interpolate, fieldText?: (name: string) => string): string;
/**
 * A translated label for a model field, shared by the browser form and published labels.
 * Contextual identifier nouns use the existing chrome catalogue; a label borrowed from another
 * API field (`Transit date`) and a coordinate read the API label of that wire name. Missing
 * translations stay absent rather than degrading to the generic ID label.
 */
export declare function translatedFieldLabel(lang: string | undefined, field: Pick<FieldDef, 'name' | 'label'> & Partial<Pick<FieldDef, 'key'>>): string | undefined;
/** The fields of one record of a repeating property, from the fields of its first record. Every record is the same template, so the form grows a repeat by re-keying record zero. */
export declare function repeatFields(fields: readonly FieldDef[], key: string, index: number): FieldDef[];
/**
 * Tiles or a select for a set of choices, decided by their SHAPE: a letter or a two-character code is a narrow tile, so up to thirty fit a row the way an index bar does, while a word or a name keeps the twelve a zodiac grid needs and anything longer is a select.
 */
export declare function optionKind(values: readonly string[]): 'tiles' | 'select';
/** True for choices that read as an index (letters, two-character codes) rather than words. */
export declare function isIndex(values: readonly string[]): boolean;
/** The latitude+longitude+timezone trio the form suppresses in favour of a city search. Centralised so the render path and tests agree. */
export declare const LOCATION_TRIO: readonly ['latitude', 'longitude', 'timezone'];
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
export declare const LOCATION_PAIR: readonly ['latitude', 'longitude'];
/** Resolve a `$ref` (one hop is all the spec uses) against the schema map; pass non-refs through. */
export declare function resolveSchema(schema: OpenApiSchema | OpenApiSchemaRef | undefined, all: Record<string, OpenApiSchema>): OpenApiSchema | undefined;
/**
 * Map one resolved schema to its {@link InputKind}, or `null` when the shape is genuinely unhandled. The form treats `null` as a plain text fallback (never crashes); the taxonomy gate treats it as a failure (forces a decision). Object schemas are never passed here: an object with `properties` expands into a group of leaf fields upstream, so it has no leaf kind of its own.
 */
/**
 * The single scalar type name a schema resolves to, across both OpenAPI spellings.
 *
 * @remarks
 * OpenAPI 3.1 expresses a nullable scalar as `type: ['number', 'null']` where 3.0 wrote `type: 'number', nullable: true`. Every direct `type === 'number'` comparison silently stops matching the day the served document switches, and the field then classifies as UNHANDLED rather than as a number, which is how a whole form degrades to text boxes without one test noticing. The `null` member carries no input information, so the remaining single member IS the type.
 */
export declare function scalarType(s: OpenApiSchema): string | undefined;
export declare function classifyInput(schema: OpenApiSchema): InputKind | null;
/** True when an enum's values are exactly the twelve zodiac signs (case-insensitive), so the tiles can carry sign glyphs. */
export declare function isZodiacEnum(values: readonly string[]): boolean;
/**
 * Digest one operation into the {@link FormModel} the form renders. This is the single construction path: body properties (nested objects expand to `group.sub` keys) and path+query parameters flow through {@link toField} identically, so a query integer keeps its min/max the same as a body integer. The `lang` query parameter is dropped from `fields` and surfaced as {@link FormModel.hasLang} instead.
 */
export declare function buildFormModel(op: OperationSchema, schemas: Record<string, OpenApiSchema>, endpoint: string, method?: string): FormModel;
/**
 * Resolve render intent once, shared by spec digestion and compatibility with older schema slices.
 *
 * @remarks
 * A coordinate PAIR defines a city box, not a trio: relocation has two pairs and one birth
 * timezone. Only the first pair may claim a flat timezone; an unclaimed timezone remains a
 * visible city picker writing an IANA zone, and an optional flat one sends the viewer's zone when
 * left empty. Keys always retain their original wire identity.
 * A city box is marked required when any of its own coordinate or timezone fields is required,
 * including a required timezone beside optional Human Design coordinates.
 * Optional named groups stay together under Advanced. With no primary required input, groups
 * and undefaulted flat fields stay open so an either-or request still offers its inputs. Beside
 * a primary group, an undefaulted flat date or time is the reading's own moment and stays open.
 */
export declare function withRenderIntent(model: FormModel, method: string, endpoint: string): FormModel;
/** True when a form's moment carries a clock and every moment field is empty, so the request reads the sky right now. */
export declare function readsNow(fields: readonly FieldDef[], values: Record<string, unknown>): boolean;
/**
 * Concise form heading. Prefers the operation summary (spec-authored), taking the clause before the first " - " so "Daily horoscope by zodiac sign - Transit-based forecast" reads as "Daily horoscope by zodiac sign", and falls back to the humanized last path segment.
 */
export declare function deriveTitle(summary: string | undefined, endpoint: string): string;
/**
 * True when a form can show its result before the visitor asks: a read (GET) that needs nothing from them, such as a list, today's phase or a random draw.
 *
 * @remarks
 * The ONE rule the self-fetch component, the hosted embed and the one-tag widget script all ask, so the three never disagree about which forms open on a result. A POST is never one, because a request body with nothing required is usually an either-or the schema cannot state, and sending it empty is a 400 rather than a default reading.
 */
export declare function opensOnLoad(model: FormModel, method: string): boolean;
/**
 * Outcome-first submit-button label keyed off the endpoint intent. A paged collection is searched, chart and reading endpoints "Generate", divination endpoints "Cast", comparison endpoints "Compare", and lookup/reading GETs "Get reading". A generic verb beats a bare "Submit" on a widget a visitor never set up.
 *
 * Returns the CANONICAL English verb, which is also its catalogue key: the form translates the result rather than this function doing it, because this module is request-context-free and has no element to resolve a page language from. Every verb lives in `i18n/chrome-strings.ts`, and `tests/i18n.test.ts` runs this function over every operation in the committed spec so a new verb cannot be added without a catalogue entry.
 *
 * @param fields - The form fields, when known: a request that pages (`limit`, `offset`) lists a collection, which a visitor searches whatever domain the path names.
 */
export declare function deriveSubmitLabel(endpoint: string, fields?: readonly FieldDef[]): string;
/** Where the schema slices live: beside a shipped CDN script (`dist/cdn/roxy-ui.js` or `dist/cdn/components/{slug}.js`) served from any host but jsDelivr, else the version-pinned jsDelivr copy. */
export declare function sliceBase(version: string, scriptSrc?: string): string;
/** Deterministic slice filename for one operation, shared by the generator and the runtime loader so both address the same artifact. */
export declare function sliceFileName(method: string, endpoint: string): string;
/**
 * The choices a collection response offers, read from its shape and never from its name.
 *
 * @remarks
 * Three shapes: a list of strings (each is its own value), a list of records (the value is the record's `id`, else the field's own name, else its `number`; the words are its `name`, else its `english` name, else the value), and a map of counts, where a zero is a choice with nothing behind it. A map keyed by single letters is an index, so the letters it omits are listed too, disabled, and a reader sees the whole alphabet.
 *
 * @param field - The request field the choices fill, which is also where a record may carry its value (an angel number sequence sits in `number`).
 */
export declare function optionsFrom(json: unknown, field?: string): FieldOption[];
/** The total a paged collection reports, or undefined when it reports none. */
export declare function totalOf(json: unknown): number | undefined;
/**
 * The collection a free-string path identifier is chosen from: the GET one segment up, as the spec declares it, or undefined when there is none.
 *
 * @remarks
 * Only a FREE string qualifies: an enum already lists its choices, and a pattern, a format or a number type already tells the input what to accept. So `/dreams/symbols/{id}` picks from `/dreams/symbols`, `/crystals/{id}` from `/crystals`, and `/numerology/meanings/{number}`, whose pattern names its twelve values, keeps its input.
 */
export declare function pickerSource(spec: SpecDoc, path: string, param: {
    name: string;
    required?: boolean;
    schema?: OpenApiSchema;
}): OptionSource | undefined;
/** How a GET collection is read for its choices: its search parameter, its largest page and whether it is localized, all from its declared query parameters. */
export declare function collectionSource(spec: SpecDoc, path: string): OptionSource | undefined;
