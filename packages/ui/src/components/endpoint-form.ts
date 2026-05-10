import { css, html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../utils/base-styles.js';

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
	name: string;
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
		pending = fetch(url).then(async (res) => {
			if (!res.ok) {
				specCache.delete(url);
				throw new Error(`HTTP ${res.status}`);
			}
			return (await res.json()) as OpenApiDoc;
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
 * Build-time hints (x-roxy-ui formGroups) are read by scripts/build.ts and
 * baked into a static map. At runtime the component falls back to runtime
 * fetch of /api/v2/openapi.json when no map is provided.
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
				border-color: var(--roxy-accent-fg, #b45309);
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
				background: var(--roxy-accent-fg, #b45309);
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

	@state()
	private fields: FieldDef[] = [];

	@state()
	private values: Record<string, unknown> = {};

	@state()
	private hasLocation = false;

	@state()
	private loaded = false;

	connectedCallback(): void {
		super.connectedCallback();
		void this.loadSchema();
	}

	private async loadSchema() {
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
			if (!op) return;

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
					fields.push({
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

			for (const param of op.parameters ?? []) {
				if (param.in === 'path' || param.in === 'query') {
					const resolved = this.resolve(param.schema, schemas) ?? {};
					fields.push({
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
			this.hasLocation =
				fields.some((f) => f.name === 'latitude') &&
				fields.some((f) => f.name === 'longitude') &&
				fields.some((f) => f.name === 'timezone');

			// Pre-fill defaults
			const init: Record<string, unknown> = {};
			for (const f of fields) {
				if (f.default !== undefined) init[f.name] = f.default;
			}
			this.values = init;
			this.loaded = true;
		} catch (_err) {
			this.loaded = true;
		}
	}

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

	private onLocation = (e: Event) => {
		const detail = (e as CustomEvent).detail as {
			latitude?: number;
			longitude?: number;
			timezone?: string;
			utcOffset?: number;
		};
		if (detail) {
			this.values = {
				...this.values,
				latitude: detail.latitude,
				longitude: detail.longitude,
				timezone: detail.timezone ?? detail.utcOffset,
			};
		}
	};

	private onSubmit = (e: Event) => {
		e.preventDefault();
		const missing = this.fields
			.filter((f) => f.required)
			.filter(
				(f) => this.values[f.name] === undefined || this.values[f.name] === '',
			);
		if (missing.length > 0) {
			this.dispatchEvent(
				new CustomEvent('roxy-validation-error', {
					detail: { missing: missing.map((m) => m.name) },
					bubbles: true,
					composed: true,
				}),
			);
			return;
		}
		this.dispatchEvent(
			new CustomEvent('roxy-submit', {
				detail: { endpoint: this.endpoint, values: this.values },
				bubbles: true,
				composed: true,
			}),
		);
	};

	render() {
		if (!this.loaded) {
			return html`<form><div class="roxy-skeleton" style="height: 8rem"></div></form>`;
		}

		const renderField = (f: FieldDef) => {
			if (
				this.hasLocation &&
				(f.name === 'latitude' ||
					f.name === 'longitude' ||
					f.name === 'timezone')
			) {
				return nothing;
			}
			const inputId = `roxy-form-${f.name}`;
			return html`<div class="field">
				<label for=${inputId}>
					${humanize(f.name)}${f.required ? html`<span class="req" aria-hidden="true">*</span>` : nothing}
				</label>
				${
					f.enum
						? html`<select
							id=${inputId}
							?required=${f.required}
							@change=${(e: Event) => this.setValue(f.name, (e.target as HTMLSelectElement).value)}
						>
							<option value="">Choose</option>
							${f.enum.map(
								(
									opt,
								) => html`<option value=${opt} ?selected=${this.values[f.name] === opt}>
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
							.value=${(this.values[f.name] ?? '') as string}
							@input=${(e: Event) =>
								this.setValue(
									f.name,
									this.coerce(f.type, (e.target as HTMLInputElement).value),
								)}
						/>`
				}
				${f.description ? html`<small class="help">${f.description}</small>` : nothing}
			</div>`;
		};

		return html`<form @submit=${this.onSubmit}>
			<h2 class="title">${humanize(this.endpoint.split('/').pop() ?? '')}</h2>
			${
				this.hasLocation
					? html`<div class="location-block">
						<label>Birth location</label>
						<roxy-location-search
							@roxy-location-select=${this.onLocation}
							placeholder="City of birth"
						></roxy-location-search>
						<small class="help">
							Required: latitude, longitude, timezone. Pick a city to autofill.
						</small>
					</div>`
					: nothing
			}
			<div class="fields">
				${this.fields.map((f) => renderField(f))}
			</div>
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

function humanize(s: string): string {
	return s
		.replace(/[_-]+/g, ' ')
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		.replace(/^\w/, (c) => c.toUpperCase());
}

declare global {
	interface HTMLElementTagNameMap {
		'roxy-endpoint-form': RoxyEndpointForm;
	}
}
