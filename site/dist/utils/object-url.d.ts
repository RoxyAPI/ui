import type { ReactiveController, ReactiveControllerHost } from 'lit';
/** Decode a base64 string into a Blob of the given media type. */
export declare function base64Blob(base64: string, type: string): Blob;
/** One object URL for the latest base64 source, revoked when the source changes and when the host disconnects; a host that reconnects renders a fresh one. */
export declare class ObjectUrlController implements ReactiveController {
    private readonly host;
    private readonly type;
    private source?;
    private url?;
    private revokedOnDisconnect;
    constructor(host: ReactiveControllerHost, type: string);
    /** The object URL of this base64 source, created once per source. */
    urlFor(base64: string): string;
    hostConnected(): void;
    hostDisconnected(): void;
    private revoke;
}
