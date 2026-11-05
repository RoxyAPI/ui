import { type Eclipse, type Hemisphere, type MoonState } from './moon.js';
/** The Moon's paint and the inline box it sits in; a component that draws the Moon adopts these. */
export declare const moonStyles: import("lit").CSSResult[];
/** The Moon a card draws inline, in the drawing `./charts` publishes, seen from the element's `hemisphere` and named in its language. */
export declare function renderMoon(host: HTMLElement & {
    hemisphere?: Hemisphere;
}, state: MoonState, size: number, eclipse?: Eclipse): import("lit").TemplateResult<1>;
