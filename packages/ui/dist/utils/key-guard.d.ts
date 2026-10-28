/**
 * The one place the "publishable key only" rule lives. Every client-side fetch boundary ({@link ../components/location-search.ts}, {@link ./fetch-controller.ts}) and the self-fetch form ({@link ../components/endpoint-form.ts}) call through here so a refused key is refused identically: no network call, the same visible message, the same `roxy-validation-error` event. Centralising it is what stops the paths drifting into different answers for the same key, one warning and fetching where another refuses.
 */
/** The sample key every copy-paste snippet ships with; pages that offer a live key input search snippets for this exact string, so changing it breaks them. */
export declare const SAMPLE_PUBLISHABLE_KEY = "pk_live_YOUR_KEY";
/** Each reason a key is refused: the `roxy-validation-error` detail reason and the English source of the message, translated where it renders. */
export declare const KEY_REFUSALS: {
    readonly secret: {
        readonly reason: 'possible-secret-key';
        readonly message: 'Client-side components accept a pk_ publishable key only. Use a publishable key with an origin allowlist, or render server-side.';
    };
    readonly sample: {
        readonly reason: 'sample-key';
        readonly message: 'Replace the sample key with your own publishable key from your RoxyAPI account.';
    };
};
export type KeyRefusal = (typeof KEY_REFUSALS)[keyof typeof KEY_REFUSALS];
/** Why a present key may not be sent (a secret or unprefixed key, or the snippet sample no account owns), or undefined when it may, an absent key included. */
export declare function keyRefusal(key: string | undefined | null): KeyRefusal | undefined;
/** Dispatch the shared bubbling `roxy-validation-error` for a refused key, and log it once when `warn` is set; the caller shows the message and skips the fetch. */
export declare function dispatchKeyRefusal(host: EventTarget, refusal: KeyRefusal, opts?: {
    warn?: boolean;
}): void;
