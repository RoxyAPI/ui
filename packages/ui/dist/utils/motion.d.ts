/**
 * Motion guard. All component animations honor:
 *   1. --roxy-motion-duration CSS variable (set to 0ms to disable)
 *   2. prefers-reduced-motion: reduce media query (forces 0ms regardless)
 *
 * Components apply transitions and entry animations using the duration var
 * directly. The reduced-motion override is enforced at the tokens.css layer.
 */
export declare function prefersReducedMotion(): boolean;
/** CSS snippet that components paste into their styles to read the motion duration. */
export declare const MOTION_DURATION = "var(--roxy-motion-duration, 200ms)";
export declare const MOTION_EASING = "var(--roxy-motion-easing, cubic-bezier(0.4, 0, 0.2, 1))";
//# sourceMappingURL=motion.d.ts.map