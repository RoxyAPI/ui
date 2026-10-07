import {
	css,
	html,
	nothing,
	type ReactiveController,
	type ReactiveControllerHost,
} from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { comboboxStyles } from './combobox-styles.js';
import { debounce } from './debounce.js';
import { type ApiRoute, apiFetch } from './fetch-controller.js';
import {
	type FieldOption,
	type OptionSource,
	optionsFrom,
	totalOf,
} from './field-schema.js';

/** How many suggestions a server search asks for while a visitor types. */
const SUGGESTIONS = 10;

/** The most pages one collection is read in, a ceiling for a collection that keeps reporting more than it sends. */
const MAX_PAGES = 10;

/** One read of each collection per route and language, shared by every form on the page; a failure is evicted so the next mount asks again. */
const optionCache = new Map<string, Promise<FieldOption[]>>();

/** The query one read of a collection sends: its largest page, the offset reached, the page language when it is localized, and the search when there is one. */
function sourceQuery(
	source: OptionSource,
	lang: string | undefined,
	extra: Record<string, string | number> = {},
): Record<string, string | number> {
	return {
		...(source.limit ? { limit: source.limit } : {}),
		...(source.lang && lang ? { lang } : {}),
		...extra,
	};
}

/**
 * Every choice a collection offers, read page by page up to the total it reports, once per route and language.
 *
 * @param field - The request field the choices fill, which is where a record without an `id` carries its value.
 */
export function readOptions(
	route: ApiRoute,
	source: OptionSource,
	field: string,
	lang?: string,
): Promise<FieldOption[]> {
	const key = JSON.stringify([
		route.submitUrl ?? route.baseUrl,
		source.path,
		field,
		lang,
	]);
	let pending = optionCache.get(key);
	if (!pending) {
		pending = readAll(route, source, field, lang).catch((err) => {
			optionCache.delete(key);
			throw err;
		});
		optionCache.set(key, pending);
	}
	return pending;
}

async function readAll(
	route: ApiRoute,
	source: OptionSource,
	field: string,
	lang?: string,
): Promise<FieldOption[]> {
	const out: FieldOption[] = [];
	for (let page = 0; page < MAX_PAGES; page++) {
		const json = await apiFetch(route, {
			path: source.path,
			method: 'GET',
			query: sourceQuery(
				source,
				lang,
				out.length ? { offset: out.length } : {},
			),
		});
		const got = optionsFrom(json, field);
		out.push(...got);
		const total = totalOf(json);
		if (
			!source.limit ||
			total === undefined ||
			out.length >= total ||
			!got.length
		)
			break;
	}
	return out;
}

/**
 * Drop every cached collection read.
 *
 * @internal Test-only, for the same reason the spec cache has one: the cache is module state shared by every test file in one process.
 */
export function resetOptionCache(): void {
	optionCache.clear();
}

/** Folded for matching: lower case with the accents removed, so `cafe` finds `Café`. */
const fold = (s: string): string =>
	s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();

/** What a picker reads from the element that owns it, at the moment it fetches. */
export interface PickerContext {
	route: ApiRoute;
	lang?: string;
}

/**
 * A search-as-you-type choice of one entry of a collection, the state behind a WAI-ARIA 1.2 combobox.
 *
 * @remarks
 * A collection with a search parameter is searched as the visitor types, debounced, with the stale request aborted; one without is read once and filtered in place, which also lets the list open on focus before anything is typed. Every request goes through {@link apiFetch}, so a refused key never leaves the page and a failure prints the API message under the box. The host draws it with {@link renderPicker}.
 */
export class OptionPicker implements ReactiveController {
	query = '';
	options: FieldOption[] = [];
	open = false;
	highlight = -1;
	loading = false;
	error: string | null = null;
	private abort?: AbortController;
	private readonly search = debounce((q: string) => {
		void this.searchServer(q);
	}, 250);

	constructor(
		private readonly host: ReactiveControllerHost,
		private readonly source: OptionSource,
		private readonly field: string,
		private readonly context: () => PickerContext,
		private readonly onPick: (option: FieldOption) => void,
	) {
		host.addController(this);
	}

	hostDisconnected(): void {
		this.search.cancel();
		this.abort?.abort();
	}

	/** Show the matches for what the visitor typed: a server search, or the read collection filtered. */
	input(q: string): void {
		this.query = q;
		this.error = null;
		if (this.source.search) {
			if (q.trim().length < 2) this.close();
			else this.search(q);
		} else void this.filter(q);
		this.host.requestUpdate();
	}

	/** Open the whole collection on focus when it is read in place, so a visitor can browse before typing. */
	focus(): void {
		if (!this.source.search && !this.open) void this.filter(this.query);
	}

	close(): void {
		this.open = false;
		this.highlight = -1;
		this.host.requestUpdate();
	}

	pick(option: FieldOption): void {
		this.query = option.label;
		this.close();
		this.onPick(option);
	}

	keydown(e: KeyboardEvent): void {
		const n = this.options.length;
		if (e.key === 'Escape') {
			this.close();
			return;
		}
		if (e.key === 'ArrowDown' && !this.open) {
			e.preventDefault();
			this.input(this.query);
			return;
		}
		if (!this.open || n === 0) return;
		if (e.key === 'ArrowDown') this.highlight = (this.highlight + 1) % n;
		else if (e.key === 'ArrowUp') this.highlight = (this.highlight - 1 + n) % n;
		else if (e.key === 'Home') this.highlight = 0;
		else if (e.key === 'End') this.highlight = n - 1;
		else if (e.key === 'Enter') {
			const option = this.options[this.highlight] ?? this.options[0];
			if (option) this.pick(option);
		} else return;
		e.preventDefault();
		this.host.requestUpdate();
	}

	private async filter(q: string): Promise<void> {
		const { route, lang } = this.context();
		this.loading = true;
		this.host.requestUpdate();
		try {
			const all = await readOptions(route, this.source, this.field, lang);
			if (q !== this.query) return;
			const needle = fold(q.trim());
			this.show(
				all.filter(
					(o) =>
						fold(o.label).includes(needle) || fold(o.value).includes(needle),
				),
			);
		} catch (err) {
			this.fail(err);
		} finally {
			this.loading = false;
			this.host.requestUpdate();
		}
	}

	private async searchServer(q: string): Promise<void> {
		const { route, lang } = this.context();
		const search = this.source.search as string;
		this.abort?.abort();
		const controller = new AbortController();
		this.abort = controller;
		this.loading = true;
		this.host.requestUpdate();
		try {
			const json = await apiFetch(
				route,
				{
					path: this.source.path,
					method: 'GET',
					query: sourceQuery({ ...this.source, limit: SUGGESTIONS }, lang, {
						[search]: q,
					}),
				},
				controller.signal,
			);
			if (controller.signal.aborted) return;
			this.show(optionsFrom(json, this.field));
		} catch (err) {
			if (controller.signal.aborted) return;
			this.fail(err);
		} finally {
			if (this.abort === controller) this.abort = undefined;
			if (!controller.signal.aborted) {
				this.loading = false;
				this.host.requestUpdate();
			}
		}
	}

	private show(options: FieldOption[]): void {
		this.options = options;
		this.open = true;
		this.highlight = options.length ? 0 : -1;
	}

	private fail(err: unknown): void {
		this.options = [];
		this.open = false;
		this.error = err instanceof Error ? err.message : String(err);
	}
}

/** The words a picker shows that its owner translates. */
export interface PickerText {
	placeholder: string;
	empty: string;
	loading: string;
}

/**
 * Draw an {@link OptionPicker} as a WAI-ARIA 1.2 combobox: a text input owning a listbox, the active option announced through `aria-activedescendant`, and the API message under the box when a read fails.
 *
 * @param id - The input id; the listbox and options are named from it, so two pickers on one form never share an id.
 * @param labelledby - The id that names the box when no `<label for>` does.
 */
export function renderPicker(
	p: OptionPicker,
	id: string,
	text: PickerText,
	aria: { labelledby?: string; describedby?: string; invalid?: boolean } = {},
): unknown {
	const listbox = `${id}-listbox`;
	return html`<div class="picker">
			<input
				id=${id}
				type="text"
				role="combobox"
				aria-expanded=${p.open ? 'true' : 'false'}
				aria-controls=${listbox}
				aria-autocomplete="list"
				aria-labelledby=${ifDefined(aria.labelledby)}
				aria-describedby=${ifDefined(aria.describedby)}
				aria-invalid=${ifDefined(aria.invalid ? 'true' : undefined)}
				aria-activedescendant=${p.open && p.highlight >= 0 ? `${id}-opt-${p.highlight}` : ''}
				autocomplete="off"
				placeholder=${text.placeholder}
				.value=${p.query}
				@input=${(e: Event) => p.input((e.target as HTMLInputElement).value)}
				@keydown=${(e: KeyboardEvent) => p.keydown(e)}
				@focus=${() => p.focus()}
				@blur=${() => p.close()}
			/>
			${p.loading ? html`<span class="spinner" role="status" aria-label=${text.loading}></span>` : nothing}
			${
				p.open
					? html`<ul id=${listbox} class="results" role="listbox">
							${
								p.options.length === 0
									? html`<li class="empty" role="status">${text.empty}</li>`
									: p.options.map(
											(o, i) => html`<li
												id=${`${id}-opt-${i}`}
												class="option"
												role="option"
												aria-selected=${p.highlight === i ? 'true' : 'false'}
												@mousedown=${(e: Event) => e.preventDefault()}
												@click=${() => p.pick(o)}
											>
												${o.label}
											</li>`,
										)
							}
						</ul>`
					: nothing
			}
		</div>
		${p.error ? html`<small class="field-error" role="alert">${p.error}</small>` : nothing}`;
}

/** The box that anchors its listbox; the listbox itself is {@link comboboxStyles}. */
export const pickerStyles = [
	comboboxStyles,
	css`
		.picker {
			position: relative;
		}
	`,
];
