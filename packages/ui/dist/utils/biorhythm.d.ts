import type { ChromeString } from '../i18n/chrome-strings.js';
/** The four biorhythm cycles in the order every chart and legend draws them. */
export declare const BIORHYTHM_CYCLES: readonly ['physical', 'emotional', 'intellectual', 'intuitive'];
/** A cycle key to the English SOURCE its name is looked up by; the key indexes the payload and stays lower case. */
export declare const CYCLE_LABEL: Record<(typeof BIORHYTHM_CYCLES)[number], ChromeString>;
/** A cycle key as a reader sees it: its name through `t` for the four, else the key humanized. */
export declare function cycleName(cycle: string, t: (source: ChromeString) => string): string;
