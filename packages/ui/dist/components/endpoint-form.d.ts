import { RoxyLocalizedElement } from '../i18n/localized-element.js';
import { type ApiIssue, type ApiRoute } from '../utils/fetch-controller.js';
/**
 * Drop every cached spec promise.

 * @remarks
 * Test-only, and deliberately NOT re-exported from the package entry. The cache is module state shared by every test file in a single `bun test` process, and it only self-evicts on rejection, so one file that resolves a spec leaves a warm entry that silently satisfies a later file assertion about fetching. That made slice-fallback coverage pass or fail purely on file order.

 * @internal
 */
export declare function resetSpecCache(): void;
/**
 * Schema-driven form. Pass `endpoint` (e.g. "vedic-astrology/birth-chart"). The form digests the operation's request schema into a spec-derived input for each parameter (a zodiac tile grid, a date or time input, a city search, a toggle) with progressive disclosure, and emits a `roxy-submit` CustomEvent carrying the validated payload. The caller decides what to do (call the SDK, render a chart, navigate).
 *
 * @remarks
 * Schema resolution order: an explicit `spec-url` fetches that full spec and digests it (unchanged, the demo path); otherwise the form tries a small version-pinned per-operation slice from the CDN, and on any miss falls back to fetching the production spec. Each input kind is chosen purely from the parameter shape (see {@link ../utils/field-schema.ts}), so a new endpoint gets a working, on-brand form with no per-endpoint code.
 *
 * The visitor-facing `lang` parameter is never rendered: a site owner sets the element `lang` attribute, and the form routes it to the query string on submit. Optional parameters collapse under one Advanced disclosure behind the required ones; when nothing is required, every group and every undefaulted parameter renders in the open and only the defaulted ones collapse, so a request the schema can only describe as one of two optional shapes still shows its inputs. A form whose only required field is an enum submits on selection.
 *
 * **Two languages are in play here and they are different answers.** {@link RoxyLocalizedElement.effectiveLang} is the DISPLAY tag, region included, and it is what every `t()` call and the city search read. {@link RoxyEndpointForm.requestLang} is the WIRE value, region stripped and unsupported languages omitted, and it is what reaches `?lang=`. Swapping them is silent in both directions: the request one demotes every regional visitor, and the display one is a 400.
 *
 * **Field labels and option text ARE translated now, and they arrive over the network rather than from a catalogue.** They are keyed by the WIRE NAME the spec uses, not by the English text, because that English text is itself computed here by `humanize()`: there is no constant for a source-keyed catalogue to key on, which is why the chrome catalogue could never reach them. {@link RoxyEndpointForm.fieldText} and {@link RoxyEndpointForm.optionText} read a map baked into the per-language payload at build time and published through the same registry the chrome strings use. It rides the `locales/{lang}.js` download a translated page already makes, so it costs no extra request, needs no network at render time, and cannot flash English before correcting itself.
 *
 * **`humanize()` remains, as the fallback, and that is what makes this safe.** The payload is cosmetic and never awaited: a form draws immediately, an offline page or a blocked request renders exactly what it rendered before labels existed, and a language with no translation for a given key falls back to English server-side. There is no state in which a missing label breaks a form. Operation SUMMARIES and field DESCRIPTIONS are deliberately NOT in that map: a description is developer-facing reference prose, most of it collapsed behind a disclosure, and the widget already states the same contract language-neutrally through its input type and bounds. GROUP names stay catalogued rather than fetched, because the spec has nine of them: see {@link RoxyEndpointForm.groupName}.
 */
export declare class RoxyEndpointForm extends RoxyLocalizedElement {
    static styles: (import("lit").CSSResult[] | import("lit").CSSResult)[];
    endpoint: string;
    method: 'GET' | 'POST';
    /** Explicit OpenAPI spec URL. When set, the form fetches and digests that full spec (the demo path). When empty, it resolves a version-pinned slice first, then the production spec. */
    specUrl: string;
    /** Override the submit-button label. Empty derives an outcome-first label from the endpoint. */
    submitLabel: string;
    /** Browser-safe publishable key, forwarded to the slotted city search so the natal or synastry form can geocode; a key the guard refuses replaces the inputs with the reason. */
    publishableKey?: string;
    /** Where the slotted city search sends its GET, absolute or relative to the page. Unset, the search goes through the proxy route a component hands this form, else to the public location endpoint. */
    locationUrl?: string;
    /** Prefill values, keyed by field name (nested per group). Used by `remember` mode and to restore the previous submission. JS property only. */
    initialValues?: Record<string, unknown>;
    /**
     * The fields the API rejected on the last submit, by wire path, as the host's fetch reported them. JS property only.
     *
     * @remarks
     * The wire path is the same identity a field is keyed by (`year`, `person1.date`, `members.0.date`, `birthLatitude`), so each issue prints under the input it names and the input is marked invalid; an issue on a whole group (`members.0`) prints on that card, and one the form cannot place prints in the summary alone. Editing a field clears its issue, so a corrected value is not still marked wrong.
     */
    serverIssues: ApiIssue[] | null;
    /** Where the choices for a field are read through, handed in by a component in self-fetch mode so a proxied page reads them through its own route; a placed form reads them with its own publishable key. JS property only. */
    apiRoute?: ApiRoute;
    /** Submit once on load when the request needs nothing from the visitor, set by a component in self-fetch mode so a list or today's reading opens on its result. JS property only. */
    autoload: boolean;
    /** Ask a hidden `limit` for the largest page the API serves rather than its default, set by a list component that pages its own rows. JS property only. */
    fullPages: boolean;
    /** The choices read for each optional field the API lists values for, or the read in flight; absent when they could not be read, and the field keeps its plain input. */
    private choices;
    /** One search-as-you-type picker per required free-string identifier, keyed by field. */
    private pickers;
    /** Issues the visitor has since edited away, by wire path. */
    private clearedIssues;
    private fields;
    private groups;
    private modelOpensOnLoad;
    /** The array-of-object request properties, each a set of cards the visitor can grow up to `max` and shrink back to `min`. */
    private repeats;
    private formTitle;
    private hasLang;
    private values;
    private loaded;
    private specError;
    private validationErrors;
    connectedCallback(): void;
    private loadSchema;
    /** The failure sentence a visitor reads. Composed here rather than at the throw, so the shared spec-cache promise cannot freeze one form's language onto another. A message from anywhere else (a browser network error) is a wire fact and passes through untranslated. */
    private specErrorMessage;
    /** Resolve the form model: explicit spec-url wins; else a version-pinned slice; else the production spec. */
    private resolveModel;
    /** Fetch and digest one operation from a full OpenAPI document. */
    private modelFromSpec;
    /** Try the small precomputed slice; return null on any miss so the caller falls back to the full spec. */
    private tryLoadSlice;
    private applyModel;
    /** The route the choices are read through. */
    private get route();
    /** Read the choices of every sourced field when this form can reach the API: a picker for a required identifier, a list read once for an optional filter. */
    private loadChoices;
    private retryLoadSchema;
    private setValue;
    /** Writes several values at once and clears the issue on each one the API named. */
    private setValues;
    /** True while another field holds the value this field waits on, so it takes no input and sends nothing. */
    private isDisabled;
    /** The values with every disabled field dropped, so a choice made before it was disabled is never sent. */
    private withoutDisabled;
    /** The live issues: what the API reported, less what has been edited since. A new report resets the edits. */
    protected willUpdate(changed: Map<PropertyKey, unknown>): void;
    private liveIssues;
    /** The issue on exactly this field, if the API named it. */
    private issueFor;
    /** The issues on the coordinates and timezone a group's city box writes, which have no input of their own to sit under. */
    private cityIssues;
    /** The issues on a whole group card (`members.0`), as opposed to one of its fields. */
    private issuesForGroup;
    /**
     * A field named the way its input is labelled on the form, for a message that sends the visitor back to it.
     *
     * @remarks
     * The group half translates and the field half cannot, which is not a half-measure: this names a block the visitor has to go back to, so the word in the message has to be the word printed on the fieldset legend. A message saying `Person 1` over a legend reading `Persona 1` points at nothing.
     */
    private fieldLabel;
    /** The issues the API reported on a whole card or a city box, printed under it. */
    private issueLines;
    /** The inline message under an input, and the attributes that tie it to the input for assistive tech. */
    private fieldIssue;
    /**
     * The summary of what the API rejected: one line per issue, the field named by
     * its label on the form rather than by its wire path, so the reader is sent to
     * the input they can see. The message is the API's own and prints as sent.
     */
    private renderIssueSummary;
    /** The field's render role: a hidden autogenerated seed, a hidden defaulted limit/offset, a suppressed location coordinate, or a normally rendered input. */
    private roleOf;
    /** True when the model assigns the field its own input. */
    private isRendered;
    /** Groups in the model's render order, including the flat top level. */
    private groupKeys;
    /** The city box assigned to this group by the model. */
    private groupHasLocation;
    /** The group whose city box fills this field, including a claimed flat timezone. */
    private cityGroup;
    /** The field whose spec description says what place a group's city box asks for: its latitude, or a timezone standing alone. */
    private placeField;
    /** Whether the model marks this city box required. */
    private locationRequired;
    /**
     * The single visible required choice, when the whole form reduces to exactly one: no location block, no named group, one required rendered enum or picker. This is what turns the horoscope form into a tap-to-load sign grid and the dream card into type, pick, read; returns null otherwise.
     */
    private get soleChoice();
    /** True when this form opens on its result, so it stays above the result as a filter bar. */
    private get opensOnLoad();
    /** True for an optional filter on a form that opens on load: a listed choice that submits when picked and clears the other filters. */
    private isFilter;
    /** True when every input on the form sends it by itself (a sole choice, or a filter bar with nothing typed), so it draws no submit button. */
    private get selfSubmits();
    /** Tiles or a select for a choice field: by the shape of its choices, except that a filter of words is a select, so a list that opens on load keeps its filters to one compact row and only an index (letters, short codes) stays a tile bar. */
    private choiceKind;
    /** The choices a field offers: its enum with the published option text, or the list the API served for it. */
    private choicesOf;
    /** The submit-button label. A caller-supplied one is theirs and is printed verbatim; the derived verb is ours, so it goes through the catalogue. {@link deriveSubmitLabel} returns the canonical English verb, which IS the catalogue key; an empty moment with a clock reads as now. */
    private effectiveSubmitLabel;
    /**
     * The value this form may put on `?lang=`, or undefined to leave the request on the API default.
     *
     * @remarks
     * NOT the display language, and the name says so: `effectiveLang()` on the base class is the full display tag every `t()` reads. `?lang=es-AR` is a 400 and `?lang=es` is a 200, and the language resolves from `<html lang>` rather than only from an attribute a developer typed, so the unfiltered tag reaching the query string would break every regional and every untranslated locale. {@link apiLang} does both narrowings; this method exists so the submit path reads as one call.
     */
    private requestLang;
    /**
     * The words this form writes over a request field, and the options under it.
     *
     * @remarks
     * `humanize()` is the FALLBACK, not the default, and it stays because it has to: the labels
     * arrive over the network and a form must draw before they land, on an offline page, and when
     * the request fails. So the worst case is exactly what this form rendered before labels
     * existed, and the best case is a translated one, with no state in between where it breaks.
     *
     * Keyed by WIRE NAME rather than by the English text, because the English text is itself
     * computed here by `humanize()`; there is no constant to key on. Same reason the label map is
     * a separate key space from the chrome catalogue.
     *
     * English ships no payload, so the API English label is compiled in and comes before `humanize()`.
     * A contextual model label (a picker noun, a transit date) reads its translation through `translatedFieldLabel`.
     */
    private fieldText;
    /** The option text under one field, falling back the same way. */
    private optionText;
    /**
     * Location-select handler bound to a group: fills that group's coordinate keys plus whichever
     * timezone field it owns.
     *
     * Keys are LOOKED UP from the model rather than built as `group.name`. That assumption held only
     * while every group came from object nesting; a prefixed group stores under the original wire
     * name (`birthLatitude`), so constructing `birth.latitude` would write a key the request builder
     * never reads and the coordinates would silently stay empty.
     */
    private onLocationFor;
    /** Records a chosen option, and submits at once when it is the only input the form has or a filter; picking the chosen filter again clears it. */
    private chooseOption;
    /** Records a value, then sends a form that draws no submit button once its one choice is made. */
    private pickChoice;
    /** A form that reduces to one choice sends itself on that pick and again on every later change to another input, carrying the choice it holds. */
    private resend;
    /** Sets one filter and clears the others and the text search, so a list is narrowed one way at a time. */
    private setFilter;
    /** Roving-tabindex arrow-key navigation for a tile radiogroup, modeled on the shared tablist pattern (selection follows focus). */
    private onTilesKeyDown;
    private onSubmit;
    /** Validate, then emit `roxy-submit` with the reconstructed payload, the spec query keys, and whether the form stays above its result. */
    private submit;
    /** Required fields left empty, with the location trio collapsed to one entry per group. Seed and hidden defaults never block. */
    private collectMissing;
    /** True on a page that reads in English, the one language the operation summary and the field descriptions are written in. */
    private get readsEnglish();
    /** The operation summary as the form heading, on an English page only: it is API reference copy, so another language draws no heading rather than an English one. */
    private renderTitle;
    private reqMark;
    /**
     * A description under a field: rendered inline when short, collapsed behind a disclosure showing its first line when long.
     *
     * @remarks
     * Both shapes carry `part="hint"` on their outermost element, so one `::part(hint)` rule reaches every field description on the form. The words are the API reference text for the request field, which is the right register on a developer page and the wrong one on a page written for a client, and hiding them leaves the label, the input and its validation untouched. They are English reference copy, so a page in another language draws none.
     */
    private description;
    private renderTiles;
    private renderSelect;
    /** A required identifier picked from its collection as the visitor types; the sole input on its form is named by the form title wherever one is drawn. */
    private renderPickerField;
    private renderToggle;
    private renderInput;
    private renderField;
    /** The shared group legend, using this form's chrome and field-label catalogues. */
    private groupName;
    /** How many records a repeating property currently shows. */
    private repeatCount;
    /** Appends a record with the same fields as the first, pre-filled with the schema defaults the first record was. */
    private addRecord;
    /** Drops the last record and every value it held, so a removed card cannot ride along in the body. */
    private removeRecord;
    /** The add and remove controls under the records of one repeating property, each only where the spec leaves room for it. */
    private repeatControls;
    /**
     * The name of one location block, and of the same block in a validation message, which is why it is a method rather than two literals.
     *
     * The placeholder carries the group rather than the form concatenating a name in front of a translated noun, so a translator owns the word order: `Person 1 location` is English syntax, and Turkish suffixes the head noun, Hindi takes a genitive, Russian a parenthetical and German a colon. The four shapes are deliberately different and normalizing them breaks three languages.
     */
    private locationLabel;
    /** One city search standing in for a group's raw coordinates. */
    private locationBlock;
    /** A `timezone` no coordinate pair claims, asked for as a city and labelled as the place: the IANA zone it writes resolves to the offset in force on the requested date. */
    private renderTimezoneCity;
    /** The one city search every location input draws, its placeholder named for the place; `lang`, `endpoint` and the proxy route are forwarded because a shadow root hides the host page from it. */
    private citySearch;
    private groupCard;
    render(): import("lit").TemplateResult<1>;
    private coerce;
}
declare global {
    interface HTMLElementTagNameMap {
        'roxy-endpoint-form': RoxyEndpointForm;
    }
}
