import { css, html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../utils/base-styles.js';
import { humanize } from '../utils/string.js';

interface OpenApiSchemaRef {
	$ref?: string;
}

interface OpenApiSchema extends OpenApiSchemaRef {
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
}

interface FieldDef {
	/** Unique storage + input key: the property name, or "group.name" for a nested object field. */
	key: string;
	/** Schema property name (the label source), e.g. "date". */
	name: string;
	/** Parent object key for a nested schema (person1/person2); undefined for a flat field. */
	group?: string;
	type: string;
	required: boolean;
	description?: string;
	enum?: string[];
	min?: number;
	max?: number;
	default?: unknown;
}

interface OpenApiDoc {
	paths?: Record<string, Record<string, unknown>>;
	components?: { schemas?: Record<string, OpenApiSchema> };
}

const specCache = new Map<string, Promise<OpenApiDoc>>();

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

/**
 * Schema-driven form. Pass `endpoint` (e.g. "vedic-astrology/birth-chart").
 * The form introspects the cached OpenAPI spec, slots a roxy-location-search
 * when latitude+longitude+timezone fields are present, and emits a
 * `roxy-submit` CustomEvent with the validated payload on submit. The caller
 * decides what to do (call the SDK, render a chart, navigate).
 *
 * At runtime the component fetches the OpenAPI spec (its `spec-url`, default
 * /api/v2/openapi.json) and builds the fields from the operation's request
 * schema: types, enums, required flags, and property order all come from the
 * spec, so a new endpoint gets a working form with no per-endpoint code.
 */
@customElement('roxy-endpoint-form')
export class RoxyEndpointForm extends LitElement {
	static styles = [
		baseStyles,
		css`
			form {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
				background: var(--roxy-bg, #fff);
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
			.person-group {
				border: 1px solid var(--roxy-border, #e4e4e7);
				border-radius: var(--roxy-radius-md, 8px);
				padding: var(--roxy-space-md, 1rem);
				margin: 0 0 var(--roxy-space-md, 1rem);
				display: grid;
				gap: var(--roxy-space-md, 1rem);
				min-inline-size: 0;
			}
			.person-group legend {
				padding: 0 var(--roxy-space-xs, 0.25rem);
				font-weight: var(--roxy-weight-bold, 600);
				text-transform: capitalize;
			}
			.field {
				display: flex;
				flex-direction: column;
				gap: var(--roxy-space-xs, 0.25rem);
				min-width: 0;
			}
			label {
				font-size: var(--roxy-text-sm, 0.875rem);
				color: var(--roxy-secondary, #475569);
			}
			label .req {
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
			.location-block {
				display: grid;
				gap: var(--roxy-space-xs, 0.25rem);
				grid-column: 1 / -1;
			}
			.coords {
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				gap: var(--roxy-space-sm, 0.5rem);
			}
			.coords input {
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
			.spec-error {
				display: grid;
				gap: var(--roxy-space-md, 1rem);
				justify-items: start;
				background: var(--roxy-bg, #fff);
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

	@property({ type: String, attribute: 'spec-url' })
	specUrl = 'https://roxyapi.com/api/v2/openapi.json';

	@property({ type: String, attribute: 'submit-label' })
	submitLabel = 'Submit';

	/** Prefill values, keyed by field name. Used by `remember` mode to restore the last submission. JS property only. */
	@property({ attribute: false })
	initialValues?: Record<string, unknown>;

	@state()
	private fields: FieldDef[] = [];

	@state()
	private values: Record<string, unknown> = {};

	@state()
	private loaded = false;

	@state()
	private specError: string | null = null;

	connectedCallback(): void {
		super.connectedCallback();
		void this.loadSchema();
	}

	private async loadSchema() {
		this.specError = null;
		try {
			const spec = await loadSpec(this.specUrl);
			const path = `/${this.endpoint.replace(/^\//, '')}`;
			const op = spec.paths?.[path]?.[this.method.toLowerCase()] as
				| {
						requestBody?: {
							content?: Record<
								string,
								{ schema?: OpenApiSchema | OpenApiSchemaRef }
							>;
						};
						parameters?: Array<{
							name: string;
							in: string;
							required?: boolean;
							schema?: OpenApiSchema;
						}>;
				  }
				| undefined;
			if (!op) {
				throw new Error(
					`Endpoint ${this.method} ${path} not found in OpenAPI spec`,
				);
			}

			const schemas = spec.components?.schemas ?? {};
			const fields: FieldDef[] = [];
			let bodySchema: OpenApiSchema | undefined;

			if (op.requestBody) {
				const ref = op.requestBody.content?.['application/json']?.schema;
				bodySchema = this.resolve(ref, schemas);
			}

			if (bodySchema?.properties) {
				const required = new Set(bodySchema.required ?? []);
				for (const [name, sub] of Object.entries(bodySchema.properties)) {
					const resolved = this.resolve(sub, schemas) ?? {};
					// Nested object (e.g. person1/person2 on synastry / guna-milan):
					// expand into a labelled group of sub-fields keyed "group.sub".
					if (resolved.type === 'object' && resolved.properties) {
						const subRequired = new Set(resolved.required ?? []);
						for (const [subName, subSchema] of Object.entries(
							resolved.properties,
						)) {
							const r = this.resolve(subSchema, schemas) ?? {};
							fields.push({
								key: `${name}.${subName}`,
								name: subName,
								group: name,
								type: this.fieldType(r),
								required: required.has(name) && subRequired.has(subName),
								description: r.description,
								enum: r.enum,
								min: r.minimum,
								max: r.maximum,
								default: r.default,
							});
						}
					} else {
						fields.push({
							key: name,
							name,
							type: this.fieldType(resolved),
							required: required.has(name),
							description: resolved.description,
							enum: resolved.enum,
							min: resolved.minimum,
							max: resolved.maximum,
							default: resolved.default,
						});
					}
				}
			}

			for (const param of op.parameters ?? []) {
				if (param.in === 'path' || param.in === 'query') {
					const resolved = this.resolve(param.schema, schemas) ?? {};
					fields.push({
						key: param.name,
						name: param.name,
						type: this.fieldType(resolved),
						required: !!param.required,
						description: resolved.description,
						enum: resolved.enum,
						default: resolved.default,
					});
				}
			}

			this.fields = fields;

			// Pre-fill: schema defaults first, then any remembered/initial values
			// (only for fields this endpoint has) so a stale stored payload from
			// another endpoint cannot inject unknown keys. Remembered values are the
			// previously-submitted shape (nested per group), so read them by group.
			const init: Record<string, unknown> = {};
			for (const f of fields) {
				if (f.default !== undefined) init[f.key] = f.default;
				const remembered = f.group
					? (
							this.initialValues?.[f.group] as
								| Record<string, unknown>
								| undefined
						)?.[f.name]
					: this.initialValues?.[f.name];
				if (remembered !== undefined) init[f.key] = remembered;
			}
			this.values = init;
			this.loaded = true;
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err);
			this.specError = message;
			this.loaded = true;
			this.dispatchEvent(
				new CustomEvent('roxy-spec-error', {
					detail: { url: this.specUrl, message },
					bubbles: true,
					composed: true,
				}),
			);
		}
	}

	private retryLoadSchema = () => {
		this.loaded = false;
		this.specError = null;
		void this.loadSchema();
	};

	private resolve(
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

	private fieldType(s: OpenApiSchema): string {
		if (s.enum) return 'enum';
		if (s.format === 'date') return 'date';
		if (s.format === 'time') return 'time';
		if (s.format === 'date-time') return 'datetime';
		if (s.type === 'integer' || s.type === 'number') return 'number';
		return 'text';
	}

	private setValue(name: string, value: unknown) {
		this.values = { ...this.values, [name]: value };
	}

	/** True when the fields in `group` (or the flat top level) carry latitude+longitude+timezone, so a location-search can autofill them. */
	private groupHasLocation(group?: string): boolean {
		const inGroup = this.fields.filter((f) => f.group === group);
		return (['latitude', 'longitude', 'timezone'] as const).every((n) =>
			inGroup.some((f) => f.name === n),
		);
	}

	/** Location-select handler bound to a group: fills that group's lat/lng/timezone keys (flat top level when group is undefined). */
	private onLocationFor(group?: string) {
		const prefix = group ? `${group}.` : '';
		return (e: Event) => {
			const detail = (e as CustomEvent).detail as {
				latitude?: number;
				longitude?: number;
				timezone?: string;
				utcOffset?: number;
			};
			if (!detail) return;
			this.values = {
				...this.values,
				[`${prefix}latitude`]: detail.latitude,
				[`${prefix}longitude`]: detail.longitude,
				[`${prefix}timezone`]: detail.timezone ?? detail.utcOffset,
			};
		};
	}

	private onSubmit = (e: Event) => {
		e.preventDefault();
		const missing = this.fields
			.filter((f) => f.required)
			.filter(
				(f) => this.values[f.key] === undefined || this.values[f.key] === '',
			);
		if (missing.length > 0) {
			this.dispatchEvent(
				new CustomEvent('roxy-validation-error', {
					detail: { missing: missing.map((m) => m.key) },
					bubbles: true,
					composed: true,
				}),
			);
			return;
		}
		// Reconstruct the request shape: grouped fields nest as { group: { name: value } }.
		const out: Record<string, unknown> = {};
		for (const f of this.fields) {
			const v = this.values[f.key];
			if (v === undefined || v === '') continue;
			if (f.group) {
				const g = (out[f.group] as Record<string, unknown> | undefined) ?? {};
				g[f.name] = v;
				out[f.group] = g;
			} else {
				out[f.name] = v;
			}
		}
		this.dispatchEvent(
			new CustomEvent('roxy-submit', {
				detail: { endpoint: this.endpoint, values: out },
				bubbles: true,
				composed: true,
			}),
		);
	};

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

		const renderField = (f: FieldDef) => {
			if (
				this.groupHasLocation(f.group) &&
				(f.name === 'latitude' ||
					f.name === 'longitude' ||
					f.name === 'timezone')
			) {
				return nothing;
			}
			const inputId = `roxy-form-${f.key}`;
			return html`<div class="field">
				<label for=${inputId}>
					${humanize(f.name)}${f.required ? html`<span class="req" aria-hidden="true">*</span>` : nothing}
				</label>
				${
					f.enum
						? html`<select
							id=${inputId}
							?required=${f.required}
							@change=${(e: Event) => this.setValue(f.key, (e.target as HTMLSelectElement).value)}
						>
							<option value="">Choose</option>
							${f.enum.map(
								(
									opt,
								) => html`<option value=${opt} ?selected=${this.values[f.key] === opt}>
									${opt}
								</option>`,
							)}
						</select>`
						: html`<input
							id=${inputId}
							type=${this.htmlType(f.type)}
							?required=${f.required}
							min=${f.min ?? ''}
							max=${f.max ?? ''}
							step=${f.type === 'number' ? 'any' : ''}
							.value=${(this.values[f.key] ?? '') as string}
							@input=${(e: Event) =>
								this.setValue(
									f.key,
									this.coerce(f.type, (e.target as HTMLInputElement).value),
								)}
						/>`
				}
				${f.description ? html`<small class="help">${f.description}</small>` : nothing}
			</div>`;
		};

		// Ordered list of field groups: the flat top level (undefined) plus each
		// nested object (person1/person2). Order follows first appearance.
		const groups: (string | undefined)[] = [];
		for (const f of this.fields) {
			if (!groups.includes(f.group)) groups.push(f.group);
		}

		const locationBlock = (group?: string) =>
			this.groupHasLocation(group)
				? html`<div class="location-block">
						<label>${group ? `${humanize(group)} location` : 'Birth location'}</label>
						<roxy-location-search
							@roxy-location-select=${this.onLocationFor(group)}
							placeholder="City of birth"
						></roxy-location-search>
						<small class="help">
							Required: latitude, longitude, timezone. Pick a city to autofill.
						</small>
					</div>`
				: nothing;

		const groupBody = (group?: string) => html`${locationBlock(group)}
			<div class="fields">
				${this.fields.filter((f) => f.group === group).map((f) => renderField(f))}
			</div>`;

		return html`<form @submit=${this.onSubmit}>
			<h2 class="title">${humanize(this.endpoint.split('/').pop() ?? '')}</h2>
			${groups.map((g) =>
				g === undefined
					? groupBody(undefined)
					: html`<fieldset class="person-group">
							<legend>${humanize(g)}</legend>
							${groupBody(g)}
						</fieldset>`,
			)}
			<button class="submit" type="submit">${this.submitLabel}</button>
		</form>`;
	}

	private htmlType(t: string): string {
		switch (t) {
			case 'date':
				return 'date';
			case 'time':
				return 'time';
			case 'datetime':
				return 'datetime-local';
			case 'number':
				return 'number';
			default:
				return 'text';
		}
	}

	private coerce(t: string, v: string): unknown {
		if (v === '') return undefined;
		if (t === 'number') {
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
