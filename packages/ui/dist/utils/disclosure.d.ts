import type { TemplateResult } from 'lit';
/**
 * Disclosure chevron for `<details>`/`<summary>` accordions. Replaces the
 * browser default triangle with a thin chevron that rotates when the host
 * `<details>` opens. Render it inside the `<summary>` and pair with
 * {@link disclosureStyles}.
 */
export declare function chevron(): TemplateResult;
/**
 * Shared `<details>` accordion styling: hides the native disclosure triangle and rotates the {@link chevron} when the accordion opens; the summary cursor and focus ring come from the recipes.
 */
export declare const disclosureStyles: import("lit").CSSResult;
