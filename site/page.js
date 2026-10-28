/**
 * Demo grid renderer + filter tabs + theme, language and preset controls + customize dialog +
 * iframe theme bridge. Pure vanilla JS, no framework.
 */

(function () {
	const grid = document.getElementById('demo-grid');
	const filterBar = document.getElementById('filter-tabs');
	if (!grid || !filterBar || !Array.isArray(window.ROXY_UI_DEMOS)) return;

	const demos = window.ROXY_UI_DEMOS;
	// The canonical domain order, never a reordered or shortened version of it.
	const CATEGORY_ORDER = [
		'All',
		'Astrology',
		'Vedic',
		'Forecast',
		'Human Design',
		'Chinese Astrology',
		'Feng Shui',
		'Mesoamerican',
		'Vastu',
		'Numerology',
		'Kabbalah',
		'Tarot',
		'Biorhythm',
		'Ayurveda',
		'I Ching',
		'Crystals',
		'Dreams',
		'Angel Numbers',
		'Helpers',
	];

	function escapeHtml(s) {
		return String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);
	}

	function renderFilterTabs() {
		const counts = { All: demos.length };
		for (const d of demos) counts[d.topic] = (counts[d.topic] ?? 0) + 1;
		const html = CATEGORY_ORDER.filter((c) => counts[c]).map((c, i) => `
			<button type="button"
				class="filter-tab"
				data-filter="${escapeHtml(c)}"
				aria-pressed="${i === 0 ? 'true' : 'false'}"
			>${escapeHtml(c)}<span class="count">${counts[c]}</span></button>
		`).join('');
		filterBar.innerHTML = html;
	}

	function renderCard(demo) {
		const tabs = [
			{ key: 'preview', label: 'Preview', body: `<${demo.tag} id="${demo.id}"${demo.attrs}></${demo.tag}>` },
			{ key: 'code', label: 'Code', body: codeBlock(`code-${demo.id}`, demo.code) },
			{ key: 'shadcn', label: 'shadcn', body: codeBlock(`shadcn-${demo.id}`, demo.shadcn) },
		];
		// Endpoint-bound components get a copy-paste Embed tab; the three unbound
		// helpers (demo.embed === null) do not.
		if (demo.embed) {
			tabs.push({ key: 'embed', label: 'Embed', body: embedPanel(demo) });
		}
		const tablist = tabs
			.map((t, i) => `
				<button role="tab"
					id="tab-${demo.id}-${t.key}"
					aria-controls="panel-${demo.id}-${t.key}"
					aria-selected="${i === 0 ? 'true' : 'false'}"
					tabindex="${i === 0 ? '0' : '-1'}"
				>${t.label}</button>
			`)
			.join('');
		const panels = tabs
			.map((t, i) => `
				<div id="panel-${demo.id}-${t.key}"
					role="tabpanel"
					aria-labelledby="tab-${demo.id}-${t.key}"
					class="${t.key === 'preview' ? 'preview-pad' : 'code-pad'}"
					${i === 0 ? '' : 'hidden'}
				>${t.body}</div>
			`)
			.join('');
		return `
			<article class="demo-card" data-topic="${escapeHtml(demo.topic)}">
				<header>
					<div class="title-block">
						<h2>${escapeHtml(demo.heading)}</h2>
						<p class="seo-line">${escapeHtml(demo.seoLine)}</p>
						<code class="tag-name">&lt;${escapeHtml(demo.tag)}&gt;</code>
					</div>
					<div class="tab-toggle" role="tablist" aria-label="${escapeHtml(demo.heading)} view">${tablist}</div>
				</header>
				${panels}
			</article>
		`;
	}

	function codeBlock(id, code) {
		return `
			<div class="code-block">
				<button type="button" class="copy-btn" data-copy-target="${id}">Copy</button>
				<pre><code id="${id}">${escapeHtml(code)}</code></pre>
			</div>
		`;
	}

	// Embed tab: derived entirely from demo.embed (component tag + first binding,
	// built in components-manifest.js). Two copy-paste snippets reusing the shared
	// codeBlock machinery, plus the key/host hint.
	function embedPanel(demo) {
		const e = demo.embed;
		return `
			<div class="embed-panel stack">
				<p class="embed-lead">Script tag plus one element. No build step:</p>
				${codeBlock(`embed-script-${demo.id}`, e.script)}
				<p class="embed-lead">Or the one-tag auto-mount:</p>
				${codeBlock(`embed-onetag-${demo.id}`, e.oneTag)}
				<p class="embed-hint">${escapeHtml(e.hint)}</p>
			</div>
		`;
	}

	renderFilterTabs();
	grid.innerHTML = demos.map(renderCard).join('');

	// Endpoint-form submit feedback below the form
	const form = document.getElementById('form');
	if (form) {
		const out = document.createElement('pre');
		out.id = 'form-output';
		out.className = 'form-output';
		out.hidden = true;
		form.parentElement.appendChild(out);
		form.addEventListener('roxy-submit', (e) => {
			out.hidden = false;
			out.textContent = `roxy-submit · ${JSON.stringify(e.detail.values, null, 2)}`;
		});
		form.addEventListener('roxy-validation-error', (e) => {
			out.hidden = false;
			out.textContent = `Missing required: ${e.detail.missing.join(', ')}`;
		});
	}

	// Filter-tab click → show only matching demo cards.
	filterBar.addEventListener('click', (e) => {
		const tab = e.target.closest('.filter-tab');
		if (!tab) return;
		const filter = tab.dataset.filter;
		filterBar.querySelectorAll('.filter-tab').forEach((t) => {
			t.setAttribute('aria-pressed', t === tab ? 'true' : 'false');
		});
		grid.querySelectorAll('.demo-card').forEach((card) => {
			const match = filter === 'All' || card.dataset.topic === filter;
			card.hidden = !match;
		});
		const slug = filter.toLowerCase().replace(/\s+/g, '-');
		history.replaceState(null, '', filter === 'All' ? '#' : `#${slug}`);
	});

	// Honor a hash on initial load so deep-links (#vedic, #tarot) work.
	const initialHash = location.hash.replace(/^#/, '');
	if (initialHash) {
		const target = filterBar.querySelector(
			`.filter-tab[data-filter="${initialHash.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}"]`,
		);
		if (target) target.click();
	}

	// Card-level Preview/Code tab switch.
	grid.addEventListener('click', (e) => {
		const tab = e.target.closest('[role="tab"]');
		if (!tab) return;
		const tablist = tab.closest('[role="tablist"]');
		const card = tab.closest('.demo-card');
		if (!tablist || !card) return;
		tablist.querySelectorAll('[role="tab"]').forEach((t) => {
			const selected = t === tab;
			t.setAttribute('aria-selected', selected ? 'true' : 'false');
			t.setAttribute('tabindex', selected ? '0' : '-1');
		});
		card.querySelectorAll('[role="tabpanel"]').forEach((panel) => {
			panel.hidden = panel.id !== tab.getAttribute('aria-controls');
		});
	});

	// Quick-start tab switch, the same shape as the card tabs but outside the grid.
	document.getElementById('quickstart-tabs')?.addEventListener('click', (e) => {
		const tab = e.target.closest('[role="tab"]');
		if (!tab) return;
		const list = tab.closest('[role="tablist"]');
		list.querySelectorAll('[role="tab"]').forEach((t) => {
			const selected = t === tab;
			t.setAttribute('aria-selected', selected ? 'true' : 'false');
			t.setAttribute('tabindex', selected ? '0' : '-1');
		});
		tab.closest('.quickstart').querySelectorAll('[role="tabpanel"]').forEach((panel) => {
			panel.hidden = panel.id !== tab.getAttribute('aria-controls');
		});
	});

	// Native <dialog> open/close on data-dialog-open / data-dialog-close.
	document.addEventListener('click', (e) => {
		const opener = e.target.closest('[data-dialog-open]');
		if (opener) {
			const id = opener.getAttribute('data-dialog-open');
			document.getElementById(id)?.showModal?.();
			return;
		}
		const closer = e.target.closest('[data-dialog-close]');
		if (closer) closer.closest('dialog')?.close?.();
	});

	// Copy-to-clipboard for [data-copy-target] (target element id) and
	// [data-copy-text] (literal text). Flashes "Copied" for 3 seconds.
	document.addEventListener('click', async (e) => {
		const btn = e.target.closest('[data-copy-target], [data-copy-text]');
		if (!btn) return;
		let payload = '';
		if (btn.dataset.copyTarget) {
			const target = document.getElementById(btn.dataset.copyTarget);
			payload = target?.textContent ?? '';
		} else {
			payload = btn.dataset.copyText ?? '';
		}
		if (!payload) return;
		try {
			await navigator.clipboard.writeText(payload);
			const labelEl = btn.querySelector('[data-copy-label]') ?? btn;
			const original = labelEl.textContent;
			labelEl.textContent = 'Copied';
			labelEl.setAttribute('aria-live', 'polite');
			setTimeout(() => {
				labelEl.textContent = original;
			}, 3000);
		} catch (err) {
			console.error('Copy failed', err);
		}
	});

	// Theme toggle: read current preference, reflect in pressed state, persist.
	const lightBtn = document.getElementById('theme-light');
	const darkBtn = document.getElementById('theme-dark');
	function applyTheme(theme) {
		// :root ONLY. Setting it on <body> too made the token block re-declare every
		// var directly ON body, and a direct declaration beats a value inherited from
		// <html>, so a visitor's own `:root { --roxy-accent }` was silently shadowed.
		// It is also just how a consumer app does it.
		document.documentElement.dataset.theme = theme;
		lightBtn?.setAttribute('aria-pressed', theme === 'light');
		darkBtn?.setAttribute('aria-pressed', theme === 'dark');
		try {
			localStorage.setItem('roxy-ui-theme', theme);
		} catch {}
	}
	function initialTheme() {
		try {
			const stored = localStorage.getItem('roxy-ui-theme');
			if (stored === 'light' || stored === 'dark') return stored;
		} catch {}
		return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}
	applyTheme(initialTheme());
	lightBtn?.addEventListener('click', () => applyTheme('light'));
	darkBtn?.addEventListener('click', () => applyTheme('dark'));

	// Language: the same switch a host page makes by setting <html lang>, plus the
	// one payload that carries the words. English needs no payload, because the
	// catalogue key IS the English source.
	const langSelect = document.getElementById('lang-select');
	const loadedLocales = new Set();
	function localeName(code) {
		try {
			return new Intl.DisplayNames([code], { type: 'language' }).of(code);
		} catch {
			return code;
		}
	}
	function loadLocale(code) {
		if (code === 'en' || loadedLocales.has(code)) return;
		loadedLocales.add(code);
		const el = document.createElement('script');
		el.src = `dist/cdn/locales/${code}.js`;
		el.defer = true;
		document.head.append(el);
	}
	function applyLang(code) {
		document.documentElement.lang = code;
		loadLocale(code);
		if (langSelect) langSelect.value = code;
		try {
			localStorage.setItem('roxy-ui-lang', code);
		} catch {}
	}
	if (langSelect) {
		// Derived from the payloads the build actually emitted, so a new language is
		// one file and this picker gains it with no edit.
		for (const code of window.ROXY_LOCALES ?? []) {
			const opt = document.createElement('option');
			opt.value = code;
			opt.textContent = localeName(code);
			langSelect.append(opt);
		}
		let initial = 'en';
		try {
			const stored = localStorage.getItem('roxy-ui-lang');
			if (stored === 'en' || (window.ROXY_LOCALES ?? []).includes(stored))
				initial = stored;
		} catch {}
		applyLang(initial);
		langSelect.addEventListener('change', () => applyLang(langSelect.value));
	}

	// Iframe protocol:
	//   1. On load, this page posts { type: 'roxy-ui-ready' } so the parent can
	//      respond with its current theme.
	//   2. Parent posts { type: 'roxy-set-theme', theme: 'dark' | 'light' } at
	//      any time. We apply it.
	//   3. Standalone (top-level) tab — window.parent === window, no parent —
	//      falls back to localStorage / prefers-color-scheme already.
	window.addEventListener('message', (e) => {
		const msg = e.data;
		if (!msg || typeof msg !== 'object') return;
		if (msg.type === 'roxy-set-theme' && (msg.theme === 'light' || msg.theme === 'dark')) {
			applyTheme(msg.theme);
		}
	});
	if (window.parent && window.parent !== window) {
		document.body.classList.add('is-iframed');
		try {
			window.parent.postMessage({ type: 'roxy-ui-ready' }, '*');
		} catch {}
	}

	// Color customizer: 12 color tokens × 2 modes (light, dark). Active-mode
	// edits preview live by writing to either documentElement.style (current
	// data-theme) or a data-theme="dark" rule injected at runtime.
	const TOKENS = [
		// No accent-ink: it derives from accent (color-mix), so emitting it here would
		// override the derivation and hand the visitor a snippet that pins it to one hue.
		'primary', 'secondary', 'accent',
		'success', 'warning', 'danger', 'info',
		// surface is the token that actually paints a component card face; bg is the
		// page behind it. Both are editable so a preset can lift the card off the page.
		'bg', 'surface', 'fg', 'muted', 'border',
	];
	// The stock tokens resolved to hex for the swatches: primary, secondary, muted, border and
	// surface are derivations of bg and fg in tokens.css, printed here as they compute.
	const DEFAULTS = {
		light: {
			primary: '#0a0a0a', secondary: '#363636', accent: '#4a6297',
			success: '#16a34a', warning: '#ea580c', danger: '#dc2626', info: '#0284c7',
			bg: '#ffffff', surface: '#ffffff', fg: '#0a0a0a', muted: '#5f5f5f', border: '#d7d7d7',
		},
		dark: {
			primary: '#fafafa', secondary: '#bebebe', accent: '#92aade',
			success: '#22c55e', warning: '#fb923c', danger: '#ef4444', info: '#38bdf8',
			bg: '#0a0a0a', surface: '#0a0a0a', fg: '#fafafa', muted: '#8f8f8f', border: '#252525',
		},
	};
	const state = JSON.parse(JSON.stringify(DEFAULTS));
	// The colours of the active preset: a swatch counts as edited only when it differs from these.
	let baseline = DEFAULTS;
	// Swatch names match the WordPress plugin settings, with the token beneath for developers.
	const LABELS = {
		primary: 'Brand base', secondary: 'Labels', accent: 'Accent',
		success: 'Positive', warning: 'Caution', danger: 'Warnings', info: 'Information',
		bg: 'Page background', surface: 'Card background', fg: 'Text', muted: 'Secondary text', border: 'Borders',
	};

	// Named presets, built from window.ROXY_THEME_PRESETS (generated from the palette
	// SSOT, so the demo never hand-copies hexes). Each palette overrides only the
	// tokens its shipped theme file sets (accent, secondary, danger, bg, surface, fg,
	// muted, border); primary and the status colors stay at the stock defaults, so the
	// copyable snippet matches what the linked theme file produces. Choosing a preset
	// links its real theme file, so fonts and radii render too.
	const THEME_PRESETS = window.ROXY_THEME_PRESETS ?? {};
	const PRESETS = { default: DEFAULTS };
	for (const [name, p] of Object.entries(THEME_PRESETS)) {
		PRESETS[name] = {
			light: { ...DEFAULTS.light, ...p.light },
			dark: { ...DEFAULTS.dark, ...p.dark },
		};
	}
	const linkFor = (file) =>
		`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/styles/themes/${file}">`;

	// The stylesheet link is the recommended one-line adoption path for every named
	// preset; only "default" (the stock library look) has no file to link.
	const presetLink = document.createElement('link');
	presetLink.rel = 'stylesheet';
	presetLink.id = 'theme-preset';
	let presetKey = 'default';

	// Every preset picker on the page (the header and the customizer) is filled here from the
	// generated presets and bound to the one setter, so the two can never disagree.
	const presetSelects = [...document.querySelectorAll('[data-preset-select]')];
	function renderPresetSelect(select) {
		select.replaceChildren(
			new Option('Default', 'default'),
			...Object.entries(THEME_PRESETS)
				.filter(([, p]) => p.file)
				.map(([name, p]) => new Option(p.displayName, name)),
		);
		select.value = presetKey;
		select.addEventListener('change', () => setPreset(select.value));
	}
	presetSelects.forEach(renderPresetSelect);

	const swatchRow = document.getElementById('swatch-row');
	const snippetEl = document.getElementById('customize-snippet');
	const modeTabs = document.querySelectorAll('.mode-tabs [role="tab"]');
	const resetBtn = document.getElementById('customize-reset');
	const presetLinkAlt = document.getElementById('preset-link-alt');
	const presetLinkSnippet = document.getElementById('preset-link-snippet');
	let mode = 'light';

	// Inject a runtime <style> we own so dark-mode swatch edits show up live
	// even when the page itself is currently rendered in light.
	const customStyle = document.createElement('style');
	customStyle.id = 'roxy-ui-customizer';
	document.head.appendChild(customStyle);

	function isDefault() {
		return TOKENS.every(
			(t) => state.light[t] === baseline.light[t] && state.dark[t] === baseline.dark[t],
		);
	}

	function applyState() {
		// Only the tokens edited in either mode, in both blocks: an untouched derived token keeps
		// following its bases, and an edited one cannot leak its light value into dark mode.
		const edited = TOKENS.filter(
			(t) => state.light[t] !== baseline.light[t] || state.dark[t] !== baseline.dark[t],
		);
		const shown = edited.length > 0 ? edited : TOKENS;
		const lightLines = shown.map((t) => `\t--roxy-${t}: ${state.light[t]};`).join('\n');
		const darkLines = shown.map((t) => `\t--roxy-${t}: ${state.dark[t]};`).join('\n');
		// Inject NOTHING while the swatches match the active preset. The library token
		// selectors carry zero specificity (:where) so that a consumer's declaration
		// always wins; emitting the defaults back at real specificity would beat the
		// library's own dark block and pin the page to light. Only a real edit should
		// outrank the library, which is exactly what a consumer stylesheet does.
		if (isDefault()) {
			customStyle.textContent = '';
			if (snippetEl) {
				snippetEl.textContent = `:root {\n${lightLines}\n}\n:root[data-theme="dark"] {\n${darkLines}\n}`;
			}
			return;
		}
		// Internal style (covers both :root and :host so the live preview repaints
		// inside the component shadow DOMs too).
		customStyle.textContent =
			`:root,:host {\n${lightLines}\n}\n:root[data-theme="dark"],:root.dark,.dark,:host([data-theme="dark"]) {\n${darkLines}\n}`;
		// Copyable output — :root is enough; consumers paste this into their
		// own stylesheet and tokens cascade into every roxy component.
		if (snippetEl) {
			snippetEl.textContent =
				`:root {\n${lightLines}\n}\n:root[data-theme="dark"] {\n${darkLines}\n}`;
		}
	}

	function renderSwatches() {
		if (!swatchRow) return;
		swatchRow.innerHTML = TOKENS.map((t) => `
			<label>
				<input type="color" data-token="${t}" value="${state[mode][t]}">
				<span>${LABELS[t]}<small>--roxy-${t}</small></span>
			</label>
		`).join('');
		swatchRow.querySelectorAll('input[type="color"]').forEach((input) => {
			input.addEventListener('input', () => {
				state[mode][input.dataset.token] = input.value;
				applyState();
			});
		});
	}

	function setMode(next) {
		mode = next;
		modeTabs.forEach((t) => t.setAttribute('aria-selected', t.dataset.mode === next ? 'true' : 'false'));
		renderSwatches();
	}

	modeTabs.forEach((t) => {
		t.addEventListener('click', () => setMode(t.dataset.mode));
	});

	// The one preset setter: link the theme file, fill every swatch (both modes) from it,
	// regenerate the snippet, sync every picker, remember the choice, and surface the
	// one-line link alternative for a named preset.
	function setPreset(name) {
		const key = Object.hasOwn(PRESETS, name) ? name : 'default';
		presetKey = key;
		const file = THEME_PRESETS[key]?.file;
		if (file) {
			presetLink.href = `./dist/styles/themes/${file}`;
			if (!presetLink.isConnected) document.head.append(presetLink);
		} else {
			presetLink.remove();
		}
		baseline = PRESETS[key];
		Object.assign(state, JSON.parse(JSON.stringify(baseline)));
		applyState();
		renderSwatches();
		for (const select of presetSelects) select.value = key;
		if (presetLinkAlt) presetLinkAlt.hidden = !file;
		if (file && presetLinkSnippet) presetLinkSnippet.textContent = linkFor(file);
		try {
			localStorage.setItem('roxy-ui-preset', key);
		} catch {}
	}
	resetBtn?.addEventListener('click', () => setPreset(presetKey));

	let initialPreset = 'default';
	try {
		initialPreset = localStorage.getItem('roxy-ui-preset') ?? 'default';
	} catch {}
	setPreset(initialPreset);
})();
