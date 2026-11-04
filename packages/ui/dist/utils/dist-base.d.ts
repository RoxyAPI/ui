/** The `dist` folder of this release on the host that served `src` (a shipped CDN script or ES module), version-pinned on jsDelivr; undefined for anything else, such as an app bundle or a file path, so no caller ever reaches a host the page did not choose. */
export declare function servedDist(version: string, src?: string): string | undefined;
