import { css, html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { apiLang } from '../i18n/lang.js';
import { signGlyph } from '../tokens/index.js';
import { baseStyles } from '../utils/base-styles.js';
import { chevron, disclosureStyles } from '../utils/disclosure.js';
import {
	buildFormModel,
	deriveSubmitLabel,
	type FieldDef,
	type FormModel,
	isZodiacEnum,
	LOCATION_PAIR,
	LOCATION_TRIO,
	type OpenApiDoc,
	type OperationSchema,
	sliceFileName,
} from '../utils/field-schema.js';
import { humanize } from '../utils/string.js';
import { ROXY_UI_VERSION } from '../version.js';

/** Production spec, fetched when no slice is available and no explicit `spec-url` is set. */
const PROD_SPEC_URL = 'https://roxyapi.com/api/v2/openapi.json';

/** Version-pinned jsDelivr base for the digested per-operation schema slices, mirroring the wrapper CDN pinning so a slice matches the bundle it ships beside. */
const SLICE_BASE = `https://cdn.jsdelivr.net/npm/@roxyapi/ui@${ROXY_UI_VERSION}/dist/schemas`;

const specCache = new Map<string, Promise<OpenApiDoc>>();

/**
 * Drop every cached spec promise.

 * @remarks
 * Test-only, and deliberately NOT re-exported from the package entry. The cache is module state shared by every test file in a single `bun test` process, and it only self-evicts on rejection, so one file that resolves a spec leaves a warm entry that silently satisfies a later file assertion about fetching. That made slice-fallback coverage pass or fail purely on file order.

 * @internal
 */
export function resetSpecCache(): void {
	specCache.clear();
}

async function loadSpec(url: string): Promise<OpenApiDoc> {
	let pending = specCache.get(url);
	if (!pending) {
		pending = fetch(url)
			.then(async (res) => {
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				return (await res.json()) as OpenApiDoc;
			})
			.catch((err) => {
				// Evict the rejected promise BEFORE rethrowing so subsequent
				// callers (the user clicking Retry, a remount) hit the network
				// again instead of replaying the cached failure forever.
				specCache.delete(url);
				throw err;
			});
		specCache.set(url, pending);
	}
	return pending;
}

/** A fresh seed for a hidden `seed` field, so each submit is a new draw unless the caller pinned one. */
function randomSeed(): string {
	return (
		globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)
	);
}

/** Parse an array-field text value into a real array: JSON when it parses to one, else comma-separated tokens. */
function parseArrayValue(raw: string): unknown {
	const trimmed = raw.trim();
	if (!trimmed) return [];
	try {
		const parsed = JSON.parse(trimmed);
		if (Array.isArray(parsed)) return parsed;
	} catch {
		// Not JSON: fall through to comma splitting.
	}
	return trimmed
		.split(',')
		.map((s) => s.trim())
		.filter(Boolean);
}

/**
 * Schema-driven form. Pass `endpoint` (e.g. "vedic-astrology/birth-chart"). The form digests the operation's request schema into a spec-derived input for each parameter (a zodiac tile grid, a date or time input, a city search, a toggle) with progressive disclosure, and emits a `roxy-submit` CustomEvent carrying the validated payload. The caller decides what to do (call the SDK, render a chart, navigate).
 *
 * @remarks
 * Schema resolution order: an explicit `spec-url` fetches that full spec and digests it (unchanged, the demo path); otherwise the form tries a small version-pinned per-operation slice from the CDN, and on any miss falls back to fetching the production spec. Each input kind is chosen purely from the parameter shape (see {@link ../utils/field-schema.ts}), so a new endpoint gets a working, on-brand form with no per-endpoint code.
 *
 * The visitor-facing `lang` parameter is never rendered: a site owner sets the element `lang` attribute, and the form routes it to the query string on submit. Optional parameters collapse under one Advanced disclosure; a form whose only required field is an enum submits on selection.
 */
@customElement('roxy-endpoint-form')
export class RoxyEndpointForm extends LitElement {
	static styles = [
		baseStyles,
		disclosureStyles,
		css`
			form {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
				background: var(--roxy-surface, #fff);
				color: var(--roxy-fg, #0a0a0a);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				box-shadow: var(--roxy-shadow-sm);
			}
			.title {
				margin: 0;
				font-size: var(--roxy-text-lg, 1.125rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.fields {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
				align-items: start;
				gap: var(--roxy-space-md, 1rem);
			}
			.fields:empty {
				display: none;
			}
			.person-group {
				background: var(--roxy-surface, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-md, 1rem);
				margin: 0;
				display: grid;
				gap: var(--roxy-space-md, 1rem);
				min-inline-size: 0;
			}
			.person-group legend {
				padding: 0 var(--roxy-space-xs, 0.25rem);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.field {
				display: flex;
				flex-direction: column;
				gap: var(--roxy-space-xs, 0.25rem);
				min-width: 0;
			}
			.tiles-field {
				grid-column: 1 / -1;
			}
			label,
			.label {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-secondary, #475569);
			}
			.req {
				color: var(--roxy-danger-fg, #991b1b);
				margin-left: 4px;
			}
			input,
			select {
				width: 100%;
				box-sizing: border-box;
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-md, 1rem);
				font-size: var(--roxy-text-base, 1rem);
				font-family: inherit;
				color: var(--roxy-fg, #0a0a0a);
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
			}
			input:focus,
			select:focus {
				outline: 2px solid var(--roxy-ring, rgba(245, 158, 11, 0.4));
				outline-offset: 2px;
				border-color: var(--roxy-accent-ink, #b45309);
			}
			.help {
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			/* Long descriptions collapse: the summary shows the first line, the body the rest. */
			.help-details > summary {
				display: flex;
				align-items: center;
				gap: 4px;
				cursor: pointer;
				color: var(--roxy-muted, #71717a);
				font-size: var(--roxy-text-xs, 0.75rem);
			}
			.help-details .help-lead {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.help-details .help-full {
				display: block;
				margin-top: var(--roxy-space-xs, 0.25rem);
			}
			.location-block {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
				grid-column: 1 / -1;
			}
			.tiles {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(5.5rem, 1fr));
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.tile {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				gap: 2px;
				min-height: 44px;
				padding: var(--roxy-space-sm, 0.5rem);
				background: var(--roxy-bg, #fff);
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				color: var(--roxy-fg, #0a0a0a);
				font-family: inherit;
				font-size: var(--roxy-text-sm, 0.875rem);
				cursor: pointer;
				transition:
					border-color var(--roxy-motion-duration, 200ms) var(--roxy-motion-easing, ease),
					background-color var(--roxy-motion-duration, 200ms) var(--roxy-motion-easing, ease);
			}
			.tile:hover {
				border-color: var(--roxy-accent, #f59e0b);
			}
			.tile[aria-checked='true'] {
				border-color: var(--roxy-accent, #f59e0b);
				background: color-mix(in srgb, var(--roxy-accent, #f59e0b) 12%, transparent);
				color: var(--roxy-accent-ink, #b45309);
				font-weight: var(--roxy-weight-bold, 600);
			}
			.tile:focus-visible {
				outline: 2px solid var(--roxy-ring, rgba(245, 158, 11, 0.4));
				outline-offset: 2px;
			}
			.tile-glyph {
				font-size: 1.35em;
				line-height: 1;
			}
			.toggle-row {
				display: flex;
				align-items: center;
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.toggle {
				position: relative;
				flex-shrink: 0;
				width: 44px;
				height: 26px;
				padding: 0;
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-full, 9999px);
				background: var(--roxy-border, #e4e4e7);
				cursor: pointer;
				transition: background-color var(--roxy-motion-duration, 200ms) var(--roxy-motion-easing, ease);
			}
			.toggle[aria-checked='true'] {
				background: var(--roxy-accent, #f59e0b);
				border-color: var(--roxy-accent, #f59e0b);
			}
			.toggle .knob {
				position: absolute;
				top: 2px;
				left: 2px;
				width: 20px;
				height: 20px;
				border-radius: 50%;
				background: var(--roxy-bg, #fff);
				transition: transform var(--roxy-motion-duration, 200ms) var(--roxy-motion-easing, ease);
			}
			.toggle[aria-checked='true'] .knob {
				transform: translateX(18px);
			}
			.toggle:focus-visible {
				outline: 2px solid var(--roxy-ring, rgba(245, 158, 11, 0.4));
				outline-offset: 2px;
			}
			.toggle-label {
				cursor: pointer;
			}
			@media (prefers-reduced-motion: reduce) {
				.tile,
				.toggle,
				.toggle .knob {
					transition: none;
				}
			}
			.advanced {
				border-top: 1px solid var(--roxy-border, #e4e4e7);
				padding-top: var(--roxy-space-md, 1rem);
			}
			.advanced > summary {
				display: flex;
				align-items: center;
				gap: 6px;
				cursor: pointer;
				font-size: var(--roxy-text-sm, 0.875rem);
				font-weight: var(--roxy-weight-bold, 600);
				color: var(--roxy-fg, #0a0a0a);
			}
			.advanced[open] > summary {
				margin-bottom: var(--roxy-space-md, 1rem);
			}
			.advanced .fields,
			.advanced .person-group {
				margin-top: var(--roxy-space-md, 1rem);
			}
			.validation-error {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
				padding: var(--roxy-space-md, 1rem);
				background: color-mix(in srgb, var(--roxy-danger, #dc2626) 8%, transparent);
				border: 1px solid var(--roxy-danger, #dc2626);
				border-radius: var(--roxy-radius-md, 8px);
				color: var(--roxy-danger-fg, #991b1b);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
			button.submit {
				justify-self: start;
				background: var(--roxy-accent-ink, #b45309);
				color: var(--roxy-bg, #fff);
				border: 0;
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-sm, 0.5rem) var(--roxy-space-lg, 1.5rem);
				font-size: var(--roxy-text-base, 1rem);
				font-weight: var(--roxy-weight-bold, 600);
				cursor: pointer;
				transition:
					transform var(--roxy-motion-duration, 200ms)
					var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1));
			}
			button.submit:hover {
				transform: scale(1.02);
			}
			button.submit:focus-visible {
				outline: 2px solid var(--roxy-ring, rgba(245, 158, 11, 0.4));
				outline-offset: 2px;
			}
			@media (prefers-reduced-motion: reduce) {
				button.submit {
					transition: none;
				}
			}
			.spec-error {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
				justify-items: start;
				background: var(--roxy-surface, #fff);
				border: 1px solid var(--roxy-danger, #dc2626);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-lg, 1.5rem);
				color: var(--roxy-danger-fg, #991b1b);
				font-size: var(--roxy-text-sm, 0.875rem);
			}
		`,
	];

	@property({ type: String, attribute: 'data-endpoint' })
	endpoint = 'vedic-astrology/birth-chart';

	@property({ type: String })
	method: 'GET' | 'POST' = 'POST';

	/** Explicit OpenAPI spec URL. When set, the form fetches and digests that full spec (the demo path). When empty, it resolves a version-pinned slice first, then the production spec. */
	@property({ type: String, attribute: 'spec-url' })
	specUrl = '';

	/** Override the submit-button label. Empty derives an outcome-first label from the endpoint. */
	@property({ type: String, attribute: 'submit-label' })
	submitLabel = '';

	/** Browser-safe publishable key, forwarded to the slotted city search so the natal or synastry form can geocode. */
	@property({ type: String, attribute: 'publishable-key' })
	publishableKey?: string;

	/** Prefill values, keyed by field name (nested per group). Used by `remember` mode and to restore the previous submission. JS property only. */
	@property({ attribute: false })
	initialValues?: Record<string, unknown>;

	@state()
	private fields: FieldDef[] = [];

	@state()
	private formTitle = '';

	@state()
	private hasLang = false;

	@state()
	private values: Record<string, unknown> = {};

	@state()
	private loaded = false;

	@state()
	private specError: string | null = null;

	@state()
	private validationErrors: string[] = [];

	connectedCallback(): void {
		super.connectedCallback();
		void this.loadSchema();
	}

	private async loadSchema() {
		this.specError = null;
		try {
			this.applyModel(await this.resolveModel());
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err);
			this.specError = message;
			this.loaded = true;
			this.dispatchEvent(
				new CustomEvent('roxy-spec-error', {
					detail: { url: this.specUrl || PROD_SPEC_URL, message },
					bubbles: true,
					composed: true,
				}),
			);
		}
	}

	/** Resolve the form model: explicit spec-url wins; else a version-pinned slice; else the production spec. */
	private async resolveModel(): Promise<FormModel> {
		if (this.specUrl) return this.modelFromSpec(this.specUrl);
		const slice = await this.tryLoadSlice();
		return slice ?? this.modelFromSpec(PROD_SPEC_URL);
	}

	/** Fetch and digest one operation from a full OpenAPI document. */
	private async modelFromSpec(url: string): Promise<FormModel> {
		const spec = await loadSpec(url);
		const path = `/${this.endpoint.replace(/^\//, '')}`;
		const op = spec.paths?.[path]?.[this.method.toLowerCase()] as
			| OperationSchema
			| undefined;
		if (!op) {
			throw new Error(
				`Endpoint ${this.method} ${path} not found in OpenAPI spec`,
			);
		}
		return buildFormModel(op, spec.components?.schemas ?? {}, this.endpoint);
	}

	/** Try the small precomputed slice; return null on any miss so the caller falls back to the full spec. */
	private async tryLoadSlice(): Promise<FormModel | null> {
		try {
			const res = await fetch(
				`${SLICE_BASE}/${sliceFileName(this.method, this.endpoint)}`,
			);
			if (!res.ok) return null;
			return (await res.json()) as FormModel;
		} catch {
			return null;
		}
	}

	private applyModel(model: FormModel) {
		this.fields = model.fields;
		this.formTitle = model.title;
		this.hasLang = model.hasLang;
		// Pre-fill: schema defaults first, then any remembered/initial values (only
		// for fields this endpoint has) so a stale stored payload from another
		// endpoint cannot inject unknown keys. Remembered values are nested per
		// group, so read them by group.
		const init: Record<string, unknown> = {};
		for (const f of model.fields) {
			if (f.default !== undefined) init[f.key] = f.default;
			const remembered = f.group
				? (
						this.initialValues?.[f.group] as Record<string, unknown> | undefined
					)?.[f.name]
				: this.initialValues?.[f.name];
			if (remembered !== undefined) init[f.key] = remembered;
		}
		this.values = init;
		this.loaded = true;
	}

	private retryLoadSchema = () => {
		this.loaded = false;
		this.specError = null;
		void this.loadSchema();
	};

	private setValue(name: string, value: unknown) {
		this.values = { ...this.values, [name]: value };
	}

	/** The field's render role: a hidden autogenerated seed, a hidden defaulted limit/offset, a suppressed location coordinate, or a normally rendered input. */
	private roleOf(
		f: FieldDef,
	): 'seed' | 'hidden-default' | 'location' | 'normal' {
		if (f.name === 'seed') return 'seed';
		if ((f.name === 'limit' || f.name === 'offset') && !f.required)
			return 'hidden-default';
		if (
			(LOCATION_TRIO as readonly string[]).includes(f.name) &&
			this.groupHasLocation(f.group)
		)
			return 'location';
		// A flat timezone in a group with no coordinates of its own is still suppressed when a
		// location group has claimed it, otherwise the prefixed shape shows a raw decimal-hours
		// box beside two city searches that already know the answer.
		if (
			f.name === 'timezone' &&
			this.locationGroups().some((g) => this.timezoneFieldFor(g)?.key === f.key)
		)
			return 'location';
		return 'normal';
	}

	/** True when the field renders its own input (as opposed to being hidden or replaced by the city search). */
	private isRendered(f: FieldDef): boolean {
		return this.roleOf(f) === 'normal';
	}

	/** Ordered, de-duplicated group keys (undefined flat group plus each named object). */
	private groupKeys(): (string | undefined)[] {
		const keys: (string | undefined)[] = [];
		for (const f of this.fields)
			if (!keys.includes(f.group)) keys.push(f.group);
		return keys;
	}

	/** True when the fields in `group` (or the flat top level) carry a latitude+longitude pair, so a location-search can autofill them. Timezone is NOT required here, see {@link LOCATION_PAIR}. */
	private groupHasLocation(group?: string): boolean {
		const inGroup = this.fields.filter((f) => f.group === group);
		return LOCATION_PAIR.every((n) => inGroup.some((f) => f.name === n));
	}

	/**
	 * Location groups in field order. Order is load-bearing: when a request carries coordinate
	 * groups but only ONE unprefixed top-level `timezone`, the FIRST group owns it, because that
	 * timezone belongs to the primary moment (`generateRelocationChart` has one `timezone` and it is
	 * the birth timezone). Without an owner both city boxes would write the same key and the second
	 * pick would silently overwrite the first with the wrong offset.
	 */
	private locationGroups(): (string | undefined)[] {
		return this.groupKeys().filter((g) => this.groupHasLocation(g));
	}

	/**
	 * The timezone field a group's city search should fill, or undefined when there is none.
	 *
	 * Prefers a timezone inside the group (the nested `person1`/`person2` shape has its own). Falls
	 * back to an unowned flat `timezone` for the first location group only, which is what makes the
	 * prefixed shape work without leaving a decimal-hours box for a visitor to guess at.
	 */
	private timezoneFieldFor(group?: string): FieldDef | undefined {
		const own = this.fields.find(
			(f) => f.group === group && f.name === 'timezone',
		);
		if (own) return own;
		if (this.locationGroups()[0] !== group) return undefined;
		return this.fields.find(
			(f) => f.group === undefined && f.name === 'timezone',
		);
	}

	/**
	 * True when the location block must show a required mark, i.e. ANY member of the trio is required. The block is a single city-search input that fills all three, so if even one is required (e.g. bodygraph requires `timezone` while `latitude`/`longitude` are optional) the input is required and `collectMissing` blocks submit without it. Requiring ALL three understated that: the asterisk went missing on a block the form still enforced, which reads as optional to a non-technical embedder.
	 */
	private locationRequired(group?: string): boolean {
		const inGroup = this.fields.filter((f) => f.group === group);
		return LOCATION_TRIO.some((n) =>
			inGroup.some((f) => f.name === n && f.required),
		);
	}

	/** A named group is a required input when any of its leaf fields is required or it carries a location. */
	private groupIsRequired(group: string): boolean {
		return (
			this.groupHasLocation(group) ||
			this.fields.some((f) => f.group === group && f.required)
		);
	}

	/**
	 * The single visible required enum field, when the whole form reduces to exactly one: no location block, no named group, one required rendered enum. This is what turns the horoscope form into a tap-to-load sign grid; returns null otherwise.
	 */
	private get singleEnumField(): FieldDef | null {
		if (this.groupKeys().some((g) => this.groupHasLocation(g))) return null;
		if (this.groupKeys().some((g) => g !== undefined)) return null;
		const req = this.fields.filter((f) => f.required && this.isRendered(f));
		const only = req[0];
		if (req.length !== 1 || !only) return null;
		return only.kind === 'tiles' || only.kind === 'select' ? only : null;
	}

	private effectiveSubmitLabel(): string {
		return this.submitLabel || deriveSubmitLabel(this.endpoint);
	}

	/**
	 * The value this form may put on `?lang=`, or undefined to leave the request on the API default.
	 *
	 * @remarks
	 * NOT the raw site language. `?lang=es-AR` is a 400 and `?lang=es` is a 200, and the language now resolves from `<html lang>` rather than only from an attribute a developer typed, so the unfiltered tag reaching the query string would break every regional and every untranslated locale. {@link apiLang} does both narrowings; this method exists so the submit path reads as one call.
	 */
	private effectiveLang(): string | undefined {
		return apiLang(this);
	}

	/**
	 * Location-select handler bound to a group: fills that group's coordinate keys plus whichever
	 * timezone field it owns.
	 *
	 * Keys are LOOKED UP from the model rather than built as `group.name`. That assumption held only
	 * while every group came from object nesting; a prefixed group stores under the original wire
	 * name (`birthLatitude`), so constructing `birth.latitude` would write a key the request builder
	 * never reads and the coordinates would silently stay empty.
	 */
	private onLocationFor(group?: string) {
		return (e: Event) => {
			const detail = (e as CustomEvent).detail as {
				latitude?: number;
				longitude?: number;
				timezone?: string;
				utcOffset?: number;
			};
			if (!detail) return;
			const keyOf = (name: string) =>
				this.fields.find((f) => f.group === group && f.name === name)?.key;
			const next: Record<string, unknown> = { ...this.values };
			const lat = keyOf('latitude');
			const lon = keyOf('longitude');
			if (lat) next[lat] = detail.latitude;
			if (lon) next[lon] = detail.longitude;
			const tz = this.timezoneFieldFor(group);
			if (tz) next[tz.key] = detail.timezone ?? detail.utcOffset;
			this.values = next;
		};
	}

	private selectTile(f: FieldDef, value: string) {
		this.setValue(f.key, value);
		if (this.singleEnumField?.key === f.key) this.submit();
	}

	/** Roving-tabindex arrow-key navigation for a tile radiogroup, modeled on the shared tablist pattern (selection follows focus). */
	private onTilesKeyDown(f: FieldDef) {
		return (e: KeyboardEvent) => {
			const opts = f.enum ?? [];
			if (opts.length === 0) return;
			const cur = opts.indexOf(this.values[f.key] as string);
			let next: number;
			if (e.key === 'Home') next = 0;
			else if (e.key === 'End') next = opts.length - 1;
			else if (e.key === 'ArrowRight' || e.key === 'ArrowDown')
				next = cur === -1 ? 0 : (cur + 1) % opts.length;
			else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp')
				next =
					cur === -1 ? opts.length - 1 : (cur - 1 + opts.length) % opts.length;
			else return;
			e.preventDefault();
			const value = opts[next];
			if (value === undefined) return;
			this.selectTile(f, value);
			const root = e.currentTarget as HTMLElement;
			requestAnimationFrame(() =>
				root.querySelector<HTMLButtonElement>(`[data-tile='${next}']`)?.focus(),
			);
		};
	}

	private onSubmit = (e: Event) => {
		e.preventDefault();
		this.submit();
	};

	/** Validate, then emit `roxy-submit` with the reconstructed payload, the spec query keys, and whether the form was a single-enum sticky picker. */
	private submit() {
		const missing = this.collectMissing();
		if (missing.keys.length > 0) {
			this.validationErrors = missing.labels;
			this.dispatchEvent(
				new CustomEvent('roxy-validation-error', {
					detail: { missing: missing.keys },
					bubbles: true,
					composed: true,
				}),
			);
			return;
		}
		this.validationErrors = [];
		const out: Record<string, unknown> = {};
		for (const f of this.fields) {
			let v = this.values[f.key];
			// A hidden seed autogenerates per submit unless a value was remembered.
			if (f.name === 'seed' && (v === undefined || v === '')) v = randomSeed();
			if (v === undefined || v === '') continue;
			if (f.kind === 'array' && typeof v === 'string') v = parseArrayValue(v);
			if (f.group) {
				const g = (out[f.group] as Record<string, unknown> | undefined) ?? {};
				g[f.name] = v;
				out[f.group] = g;
			} else {
				out[f.name] = v;
			}
		}
		// The spec knows which parameters belong in the query string; the listener
		// does not. Report them (including a site-owner lang) so a POST with a query
		// parameter reaches the API correctly instead of being dropped in the body.
		const queryKeys = this.fields.filter((f) => f.inQuery).map((f) => f.name);
		const lang = this.effectiveLang();
		if (this.hasLang && lang) {
			out.lang = lang;
			queryKeys.push('lang');
		}
		this.dispatchEvent(
			new CustomEvent('roxy-submit', {
				detail: {
					endpoint: this.endpoint,
					values: out,
					queryKeys,
					sticky: this.singleEnumField != null,
				},
				bubbles: true,
				composed: true,
			}),
		);
	}

	/** Required fields left empty, with the location trio collapsed to one entry per group. Seed and hidden defaults never block. */
	private collectMissing(): { keys: string[]; labels: string[] } {
		const keys: string[] = [];
		const labels: string[] = [];
		const locGroups = new Set<string | undefined>();
		for (const f of this.fields) {
			if (!f.required) continue;
			const isLocation = this.roleOf(f) === 'location';
			if (!this.isRendered(f) && !isLocation) continue;
			const v = this.values[f.key];
			if (v !== undefined && v !== '') continue;
			keys.push(f.key);
			if (isLocation) {
				locGroups.add(f.group);
				continue;
			}
			labels.push(
				f.group ? `${humanize(f.group)} ${humanize(f.name)}` : humanize(f.name),
			);
		}
		for (const g of locGroups) {
			labels.push(g ? `${humanize(g)} location` : 'Birth location');
		}
		return { keys, labels };
	}

	private reqMark(f: FieldDef) {
		return f.required
			? html`<span class="req" aria-hidden="true">*</span>`
			: nothing;
	}

	/** A description under a field: rendered inline when short, collapsed behind a disclosure showing its first line when long. */
	private description(f: FieldDef) {
		if (!f.description) return nothing;
		if (f.description.length <= 120) {
			return html`<small class="help">${f.description}</small>`;
		}
		const lead = f.description.split('. ')[0] ?? f.description;
		return html`<details class="help-details">
			<summary><span class="help-lead">${lead}</span>${chevron()}</summary>
			<small class="help help-full">${f.description}</small>
		</details>`;
	}

	private renderTiles(f: FieldDef) {
		const labelId = `roxy-form-${f.key}-label`;
		const zodiac = !!f.enum && isZodiacEnum(f.enum);
		const opts = f.enum ?? [];
		const cur = opts.indexOf(this.values[f.key] as string);
		const active = cur === -1 ? 0 : cur;
		return html`<div class="field tiles-field">
			<span class="label" id=${labelId}>${humanize(f.name)}${this.reqMark(f)}</span>
			<div
				class="tiles"
				role="radiogroup"
				aria-labelledby=${labelId}
				@keydown=${this.onTilesKeyDown(f)}
			>
				${opts.map((opt, i) => {
					const selected = this.values[f.key] === opt;
					const glyph = zodiac ? signGlyph(opt) : undefined;
					return html`<button
						type="button"
						class="tile"
						role="radio"
						data-tile=${i}
						aria-checked=${selected ? 'true' : 'false'}
						tabindex=${i === active ? '0' : '-1'}
						@click=${() => this.selectTile(f, opt)}
					>
						${
							glyph
								? html`<span class="tile-glyph" aria-hidden="true">${glyph}</span>`
								: nothing
						}
						<span class="tile-label">${humanize(opt)}</span>
					</button>`;
				})}
			</div>
			${this.description(f)}
		</div>`;
	}

	private renderSelect(f: FieldDef) {
		const id = `roxy-form-${f.key}`;
		return html`<div class="field">
			<label for=${id}>${humanize(f.name)}${this.reqMark(f)}</label>
			<select
				id=${id}
				?required=${f.required}
				@change=${(e: Event) =>
					this.setValue(f.key, (e.target as HTMLSelectElement).value)}
			>
				<option value="">Choose</option>
				${(f.enum ?? []).map(
					(
						opt,
					) => html`<option value=${opt} ?selected=${this.values[f.key] === opt}>
						${humanize(opt)}
					</option>`,
				)}
			</select>
			${this.description(f)}
		</div>`;
	}

	private renderToggle(f: FieldDef) {
		const id = `roxy-form-${f.key}`;
		const checked = this.values[f.key] === true;
		return html`<div class="field">
			<div class="toggle-row">
				<button
					type="button"
					id=${id}
					class="toggle"
					role="switch"
					aria-checked=${checked ? 'true' : 'false'}
					@click=${() => this.setValue(f.key, !checked)}
				>
					<span class="knob"></span>
				</button>
				<label class="toggle-label" for=${id}
					>${humanize(f.name)}${this.reqMark(f)}</label
				>
			</div>
			${this.description(f)}
		</div>`;
	}

	private renderInput(f: FieldDef) {
		const id = `roxy-form-${f.key}`;
		const type =
			f.kind === 'datetime'
				? 'datetime-local'
				: f.kind === 'number'
					? 'number'
					: f.kind;
		const placeholder =
			f.kind === 'array'
				? 'Comma separated'
				: f.example != null
					? String(f.example)
					: '';
		return html`<div class="field">
			<label for=${id}>${humanize(f.name)}${this.reqMark(f)}</label>
			<input
				id=${id}
				type=${f.kind === 'array' ? 'text' : type}
				?required=${f.required}
				min=${ifDefined(f.min)}
				max=${ifDefined(f.max)}
				step=${f.kind === 'number' ? 'any' : nothing}
				placeholder=${placeholder || nothing}
				.value=${(this.values[f.key] ?? '') as string}
				@input=${(e: Event) =>
					this.setValue(
						f.key,
						this.coerce(f.kind, (e.target as HTMLInputElement).value),
					)}
			/>
			${this.description(f)}
		</div>`;
	}

	private renderField(f: FieldDef) {
		switch (f.kind) {
			case 'tiles':
				return this.renderTiles(f);
			case 'select':
				return this.renderSelect(f);
			case 'toggle':
				return this.renderToggle(f);
			default:
				return this.renderInput(f);
		}
	}

	/**
	 * The fields this group's city search actually fills, named in the help text.
	 *
	 * Not the hardcoded "latitude, longitude, timezone" it used to say: a group does not always own a
	 * timezone. `generateRelocationChart` has one top-level `timezone` that belongs to the birth
	 * moment, so the relocation block fills coordinates only, and promising a timezone there would be
	 * a visible lie on the one form that made this method necessary.
	 */
	private locationFillList(group?: string): string {
		const names = [...LOCATION_PAIR] as string[];
		if (this.timezoneFieldFor(group)) names.push('timezone');
		return names.join(', ');
	}

	private locationBlock(group?: string) {
		return html`<div class="location-block">
			<label
				>${group ? `${humanize(group)} location` : 'Birth location'}${
					this.locationRequired(group)
						? html`<span class="req" aria-hidden="true">*</span>`
						: nothing
				}</label
			>
			<roxy-location-search
				publishable-key=${ifDefined(this.publishableKey)}
				@roxy-location-select=${this.onLocationFor(group)}
				placeholder=${group ? `${humanize(group)} city` : 'City of birth'}
			></roxy-location-search>
			<small class="help">
				Fills ${this.locationFillList(group)}. Pick a city to autofill.
			</small>
		</div>`;
	}

	private groupCard(group: string) {
		const fields = this.fields.filter(
			(f) => f.group === group && this.isRendered(f),
		);
		return html`<fieldset class="person-group">
			<legend>${humanize(group)}</legend>
			${this.groupHasLocation(group) ? this.locationBlock(group) : nothing}
			<div class="fields">${fields.map((f) => this.renderField(f))}</div>
		</fieldset>`;
	}

	render() {
		if (!this.loaded) {
			return html`<form><div class="roxy-skeleton" style="height: 8rem"></div></form>`;
		}
		if (this.specError) {
			return html`<div class="spec-error" role="alert">
				Schema load failed: ${this.specError}
				<button type="button" class="submit" @click=${this.retryLoadSchema}>Retry</button>
			</div>`;
		}

		const flat = this.fields.filter((f) => !f.group && this.isRendered(f));
		const flatReq = flat.filter((f) => f.required);
		const flatOpt = flat.filter((f) => !f.required);
		const named = this.groupKeys().filter((g): g is string => g !== undefined);
		const reqGroups = named.filter((g) => this.groupIsRequired(g));
		const optGroups = named.filter((g) => !this.groupIsRequired(g));
		const hasAdvanced = flatOpt.length > 0 || optGroups.length > 0;

		return html`<form @submit=${this.onSubmit}>
			<h2 class="title">${this.formTitle}</h2>
			${
				this.validationErrors.length > 0
					? html`<div class="validation-error" role="alert">
							<strong>Please complete:</strong> ${this.validationErrors.join(', ')}
						</div>`
					: nothing
			}
			<div class="fields">${flatReq.map((f) => this.renderField(f))}</div>
			${this.groupHasLocation(undefined) ? this.locationBlock(undefined) : nothing}
			${reqGroups.map((g) => this.groupCard(g))}
			${
				hasAdvanced
					? html`<details class="advanced">
							<summary>Advanced${chevron()}</summary>
							<div class="fields">${flatOpt.map((f) => this.renderField(f))}</div>
							${optGroups.map((g) => this.groupCard(g))}
						</details>`
					: nothing
			}
			${
				this.singleEnumField
					? nothing
					: html`<button class="submit" type="submit">${this.effectiveSubmitLabel()}</button>`
			}
		</form>`;
	}

	private coerce(kind: string, v: string): unknown {
		if (v === '') return undefined;
		if (kind === 'number') {
			const n = Number(v);
			return Number.isFinite(n) ? n : undefined;
		}
		return v;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-endpoint-form': RoxyEndpointForm;
	}
}
