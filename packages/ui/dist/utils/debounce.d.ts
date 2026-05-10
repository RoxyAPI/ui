/**
 * Lightweight debounce for input handlers. Used by location search.
 *
 * The returned function exposes a `.cancel()` method so callers can clear a
 * pending invocation when the host element disconnects, preventing the timer
 * from firing on a detached node and mutating reactive state after teardown.
 */
export interface Debounced<F extends (...args: never[]) => unknown> {
    (...args: Parameters<F>): void;
    cancel: () => void;
}
export declare function debounce<F extends (...args: never[]) => unknown>(fn: F, wait: number): Debounced<F>;
//# sourceMappingURL=debounce.d.ts.map