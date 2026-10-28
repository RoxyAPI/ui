/**
 * The shared look of the recurring parts: card surface, card title, section heading, small label, chip, table, disclosure, focus ring and form field, read from tokens only.
 *
 * @remarks
 * Keyed by part names, elements and `roxy-` classes inside `:where()`, so every rule has zero specificity and any rule a component still writes for the same element wins; deleting that rule later hands the element to the recipe with no specificity to fight. The one exception is a `bare` host, which is an explicit request for no box and outranks the card rule of the component. A card recipe sets no padding: a card whose sections run full bleed pads the sections instead, so padding stays with the layout.
 */
export declare const recipeStyles: import("lit").CSSResult;
