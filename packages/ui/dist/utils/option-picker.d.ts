import { type ReactiveController, type ReactiveControllerHost } from 'lit';
import { type ApiRoute } from './fetch-controller.js';
import { type FieldOption, type OptionSource } from './field-schema.js';
/**
 * Every choice a collection offers, read page by page up to the total it reports, once per route and language.
 *
 * @param field - The request field the choices fill, which is where a record without an `id` carries its value.
 */
export declare function readOptions(route: ApiRoute, source: OptionSource, field: string, lang?: string): Promise<FieldOption[]>;
/**
 * Drop every cached collection read.
 *
 * @internal Test-only, for the same reason the spec cache has one: the cache is module state shared by every test file in one process.
 */
export declare function resetOptionCache(): void;
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
export declare class OptionPicker implements ReactiveController {
    private readonly host;
    private readonly source;
    private readonly field;
    private readonly context;
    private readonly onPick;
    query: string;
    options: FieldOption[];
    open: boolean;
    highlight: number;
    loading: boolean;
    error: string | null;
    private abort?;
    private readonly search;
    constructor(host: ReactiveControllerHost, source: OptionSource, field: string, context: () => PickerContext, onPick: (option: FieldOption) => void);
    hostDisconnected(): void;
    /** Show the matches for what the visitor typed: a server search, or the read collection filtered. */
    input(q: string): void;
    /** Open the whole collection on focus when it is read in place, so a visitor can browse before typing. */
    focus(): void;
    close(): void;
    pick(option: FieldOption): void;
    keydown(e: KeyboardEvent): void;
    private filter;
    private searchServer;
    private show;
    private fail;
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
export declare function renderPicker(p: OptionPicker, id: string, text: PickerText, aria?: {
    labelledby?: string;
    describedby?: string;
    invalid?: boolean;
}): unknown;
/** The box that anchors its listbox; the listbox itself is {@link comboboxStyles}. */
export declare const pickerStyles: import("lit").CSSResult[];
