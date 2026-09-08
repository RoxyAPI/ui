/**
 * Mount ONE component, with no page chrome around it, picked by `?c={slug}`.
 *
 * Nothing here is written per component: the slug resolves through the same two
 * manifest globals the showcase and the capture page read, so a component that
 * gains a manifest entry and a demo card gains this page with no edit. Runs
 * BEFORE the deferred sample-data.js module, so the element exists by id when
 * that module assigns .data. Kept vanilla to match page.js.
 *
 * Query string, all validated against the manifests before use:
 *   c      required, a component slug. Anything else renders a plain line.
 *   theme  light or dark, applied by the head script in preview.html.
 *   lang   one of the language payloads the build emitted.
 */

(function () {
	const mount = document.getElementById('mount');
	const notice = document.getElementById('notice');
	const components = window.ROXY_COMPONENTS || [];
	const demos = window.ROXY_UI_DEMOS || [];
	if (!mount) return;
	if (!components.length || !demos.length) {
		throw new Error(
			'preview.js: ROXY_COMPONENTS / ROXY_UI_DEMOS globals missing (build + manifests must load first)',
		);
	}

	function esc(s) {
		return String(s).replace(
			/[&<>]/g,
			(c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c],
		);
	}

	const params = new URLSearchParams(window.location.search);
	const component = components.find((c) => c.slug === params.get('c'));

	// The query string is public input, so an unrecognised slug renders a fixed
	// line and mounts nothing; the value itself never reaches the document.
	if (!component) {
		mount.innerHTML = '<p class="notice">Unknown component.</p>';
		if (notice) notice.remove();
		return;
	}

	// First demo per tag is the widgets-map default variant, 1:1 with the catalog
	// slug. Its id keys the sample-data.js fixture that hydrates the element.
	const demo = demos.find((d) => d.tag === component.tag);
	if (!demo) {
		throw new Error(
			`preview.js: component ${component.slug} (${component.tag}) has no matching demo in ROXY_UI_DEMOS`,
		);
	}

	document.title = `${component.heading} · Roxy UI`;
	mount.innerHTML = `<${component.tag} id="${esc(demo.id)}"${demo.attrs || ''}></${component.tag}>`;

	// Language: the same switch a host page makes by setting <html lang>, plus the
	// one payload that carries the words. English needs no payload, because the
	// catalogue key IS the English source. Checked against the payloads the build
	// emitted, so the value cannot reach a script src unrecognised.
	const lang = params.get('lang');
	if (lang && lang !== 'en' && (window.ROXY_LOCALES || []).includes(lang)) {
		document.documentElement.lang = lang;
		const el = document.createElement('script');
		el.src = `dist/cdn/locales/${lang}.js`;
		el.defer = true;
		document.head.append(el);
		if (notice) {
			notice.textContent = `${notice.textContent} The labels follow the requested language; the sample values stay English.`;
		}
	}

	// Same message the showcase accepts, so a host that repaints while this page is
	// open stays in sync. Nothing is posted back: the theme arrives in the URL, and
	// a page that announced itself would also reach every other frame on the host.
	window.addEventListener('message', (e) => {
		const msg = e.data;
		if (!msg || typeof msg !== 'object') return;
		if (
			msg.type === 'roxy-set-theme' &&
			(msg.theme === 'light' || msg.theme === 'dark')
		) {
			document.documentElement.dataset.theme = msg.theme;
		}
	});
})();
