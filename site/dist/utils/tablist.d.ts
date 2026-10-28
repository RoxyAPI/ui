import type { TemplateResult } from 'lit';
/** A single tab in a {@link renderTablist} strip. */
export interface TablistItem<T extends string = string> {
    id: T;
    label: string;
}
/**
 * Shared styling for every horizontal tab strip in the library (natal chart views, transits, kundli styles); the ring and the font come from the recipes.
 */
export declare const tablistStyles: import("lit").CSSResult;
/**
 * Render a WAI-ARIA tablist. The host component owns the active-tab state; this
 * helper draws the buttons, wires click plus Left/Right arrow navigation with a
 * roving tabindex, and moves focus to the newly selected tab. Pair with
 * {@link tablistStyles}.
 *
 * The strip carries `part="tablist"` and each button `part="tab"`, so a host page can restyle or hide the view switch from outside the shadow root without knowing which component drew it.
 *
 * Pass `controls: true` when each tab governs a sibling
 * `<div role="tabpanel" id="${idPrefix}-panel-${id}">` so the buttons advertise
 * `aria-controls`. The host renders only the ACTIVE panel; this helper emits an
 * empty hidden panel for each of the others so the `aria-controls` on every tab
 * resolves. Omit it for tablists that swap a single rendered view in place with
 * no separate panel element (the kundli style switch).
 *
 * @example
 * ```ts
 * renderTablist({
 *   items: [{ id: 'wheel', label: 'Wheel' }, { id: 'grid', label: 'Aspect grid' }],
 *   active: this.view,
 *   onSelect: (v) => { this.view = v; },
 *   label: 'Natal chart views',
 *   idPrefix: 'natal',
 *   controls: true,
 * })
 * ```
 */
export declare function renderTablist<T extends string>(opts: {
    items: ReadonlyArray<TablistItem<T>>;
    active: T;
    onSelect: (id: T) => void;
    label: string;
    idPrefix: string;
    controls?: boolean;
}): TemplateResult;
