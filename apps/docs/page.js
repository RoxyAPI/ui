/**
 * Demo grid renderer + filter tabs + theme + customize dialog + iframe theme
 * bridge. Pure vanilla JS, no framework.
 */

(function () {
	const grid = document.getElementById('demo-grid');
	const filterBar = document.getElementById('filter-tabs');
	if (!grid || !filterBar || !Array.isArray(window.ROXY_UI_DEMOS)) return;

	const demos = window.ROXY_UI_DEMOS;
	const CATEGORY_ORDER = [
		'All',
		'Astrology',
		'Vedic',
		'Numerology',
		'Tarot',
		'Biorhythm',
		'I Ching',
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

	renderFilterTabs();
	grid.innerHTML = demos.map(renderCard).join('');

	// Endpoint-form submit feedback below the form
	const form = document.getElementById('form');
	if (form) {
		const out = document.createElement('pre');
		out.id = 'form-output';
		out.style.cssText =
			'margin-top:0.75rem; padding:0.5rem 0.75rem; background: color-mix(in srgb, var(--roxy-border) 30%, transparent); border-radius:6px; font-size:0.75rem; color:var(--roxy-muted); white-space:pre-wrap; display:none;';
		form.parentElement.appendChild(out);
		form.addEventListener('roxy-submit', (e) => {
			out.style.display = 'block';
			out.textContent = `roxy-submit · ${JSON.stringify(e.detail.values, null, 2)}`;
		});
		form.addEventListener('roxy-validation-error', (e) => {
			out.style.display = 'block';
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
		document.documentElement.dataset.theme = theme;
		document.body.dataset.theme = theme;
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
		'primary', 'secondary', 'accent', 'accent-ink',
		'success', 'warning', 'danger', 'info',
		'bg', 'fg', 'muted', 'border',
	];
	const DEFAULTS = {
		light: {
			primary: '#0f172a', secondary: '#475569', accent: '#f59e0b', 'accent-ink': '#b45309',
			success: '#16a34a', warning: '#ea580c', danger: '#dc2626', info: '#0284c7',
			bg: '#ffffff', fg: '#0a0a0a', muted: '#71717a', border: '#e4e4e7',
		},
		dark: {
			primary: '#f8fafc', secondary: '#94a3b8', accent: '#fbbf24', 'accent-ink': '#fbbf24',
			success: '#22c55e', warning: '#fb923c', danger: '#ef4444', info: '#38bdf8',
			bg: '#0a0a0a', fg: '#fafafa', muted: '#a1a1aa', border: '#27272a',
		},
	};
	const state = JSON.parse(JSON.stringify(DEFAULTS));

	const swatchRow = document.getElementById('swatch-row');
	const snippetEl = document.getElementById('customize-snippet');
	const modeTabs = document.querySelectorAll('.mode-tabs [role="tab"]');
	const resetBtn = document.getElementById('customize-reset');
	let mode = 'light';

	// Inject a runtime <style> we own so dark-mode swatch edits show up live
	// even when the page itself is currently rendered in light.
	const customStyle = document.createElement('style');
	customStyle.id = 'roxy-ui-customizer';
	document.head.appendChild(customStyle);

	function applyState() {
		const lightLines = TOKENS.map((t) => `\t--roxy-${t}: ${state.light[t]};`).join('\n');
		const darkLines = TOKENS.map((t) => `\t--roxy-${t}: ${state.dark[t]};`).join('\n');
		// Internal style (covers both :root and :host so the live preview repaints
		// inside the component shadow DOMs too).
		customStyle.textContent =
			`:root,:host {\n${lightLines}\n}\n:root[data-theme="dark"],:host([data-theme="dark"]) {\n${darkLines}\n}`;
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
				<span>--roxy-${t}</span>
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
	resetBtn?.addEventListener('click', () => {
		Object.assign(state, JSON.parse(JSON.stringify(DEFAULTS)));
		applyState();
		renderSwatches();
	});

	renderSwatches();
	applyState();
})();
