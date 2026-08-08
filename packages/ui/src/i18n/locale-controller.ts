import type { ReactiveController, ReactiveControllerHost } from 'lit';
import { onLocaleChange } from './registry.js';

/**
 * Re-renders its host when a chrome-string catalogue arrives.
 *
 * @remarks
 * Without this the catalogue would have to be on the page BEFORE the elements upgrade, which is not something a component can require of a real host. WordPress orders enqueued scripts by dependency and a site owner can add `defer` to any of them; a CDN embed is two independent `<script src>` tags. Any of those can land the locale payload after the first paint, and the visible result would be a chart that renders in English on a Spanish page for no reason the site owner can see or fix.
 *
 * Mirrors `MarkupDataController`: constructed in {@link RoxyDataElement}'s constructor, subscribes on connect, drops the subscription on disconnect. Registration is idempotent and a re-register of the same language simply re-renders, so a payload loaded twice is harmless.
 */
export class LocaleController implements ReactiveController {
	private readonly host: ReactiveControllerHost;
	private unsubscribe?: () => void;

	constructor(host: ReactiveControllerHost) {
		this.host = host;
		host.addController(this);
	}

	hostConnected(): void {
		this.unsubscribe = onLocaleChange(() => this.host.requestUpdate());
	}

	hostDisconnected(): void {
		this.unsubscribe?.();
		this.unsubscribe = undefined;
	}
}
