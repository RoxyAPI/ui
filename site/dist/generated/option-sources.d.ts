import type { FieldCondition, OptionSource } from '../utils/field-schema.js';
/** `METHOD /path` of a bound operation -> request field -> the collection its choices are read from. */
export declare const OPTION_SOURCES: Record<string, Record<string, OptionSource>>;
/** `METHOD /path` of a bound operation -> request field -> the other field and value that disable it. */
export declare const DISABLED_WHEN: Record<string, Record<string, FieldCondition>>;
