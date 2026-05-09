(function () {
	'use strict';
	if (window.__ROXY_WIDGETS_LOADED__) return;
	window.__ROXY_WIDGETS_LOADED__ = true;

	var CDN = 'https://cdn.jsdelivr.net/npm/@roxyapi/ui@0/dist/cdn/roxy-ui.js';
	var API = 'https://roxyapi.com/api/v2';

	var WIDGET_ENDPOINTS = {
		'natal-chart': { path: '/astrology/natal-chart', method: 'POST' },
		'horoscope-card': { path: '/astrology/horoscope/{sign}/daily', method: 'GET' },
		'synastry-chart': { path: '/astrology/synastry', method: 'POST' },
		'compatibility-card': { path: '/astrology/compatibility-score', method: 'POST' },
		'moon-phase': { path: '/astrology/moon-phase/current', method: 'GET' },
		'vedic-kundli': { path: '/vedic-astrology/birth-chart', method: 'POST' },
		'panchang-table': { path: '/vedic-astrology/panchang/detailed', method: 'POST' },
		'dasha-timeline': { path: '/vedic-astrology/dasha/current', method: 'POST' },
		'dosha-card': { path: '/vedic-astrology/dosha/manglik', method: 'POST' },
		'guna-milan': { path: '/vedic-astrology/compatibility', method: 'POST' },
		'kp-planets-table': { path: '/vedic-astrology/kp/planets', method: 'POST' },
		'numerology-card': { path: '/numerology/life-path', method: 'POST' },
		'tarot-card': { path: '/tarot/daily', method: 'POST' },
		'tarot-spread': { path: '/tarot/spreads/three-card', method: 'POST' },
		'biorhythm-chart': { path: '/biorhythm/daily', method: 'POST' },
		hexagram: { path: '/iching/cast', method: 'GET' },
	};

	function ensureLoaded() {
		if (document.getElementById('roxy-ui-loader')) return Promise.resolve();
		return new Promise(function (resolve, reject) {
			var s = document.createElement('script');
			s.id = 'roxy-ui-loader';
			s.src = CDN;
			s.async = true;
			s.crossOrigin = 'anonymous';
			s.onload = function () { resolve(); };
			s.onerror = function () { reject(new Error('roxy-ui load failed')); };
			document.head.appendChild(s);
		});
	}

	function fillTemplate(path, attrs) {
		return path.replace(/\{([^}]+)\}/g, function (_, key) {
			return encodeURIComponent(attrs[key] || '');
		});
	}

	function collectAttrs(el) {
		var out = {};
		for (var i = 0; i < el.attributes.length; i++) {
			var a = el.attributes[i];
			if (a.name.indexOf('data-') === 0 && a.name !== 'data-roxy-widget' && a.name !== 'data-publishable-key') {
				out[a.name.slice('data-'.length).replace(/-([a-z])/g, function (_, c) { return c.toUpperCase(); })] = a.value;
			}
		}
		return out;
	}

	function mount(host) {
		var name = host.getAttribute('data-roxy-widget');
		var pk = host.getAttribute('data-publishable-key');
		if (!name || !WIDGET_ENDPOINTS[name]) return;

		var endpoint = WIDGET_ENDPOINTS[name];
		var attrs = collectAttrs(host);
		var url = API + fillTemplate(endpoint.path, attrs);

		ensureLoaded().then(function () {
			var element = document.createElement('roxy-' + name);
			Object.keys(attrs).forEach(function (k) {
				if (k === 'sign' || k === 'period' || k === 'mode' || k === 'type' || k === 'spread') {
					element.setAttribute(k, attrs[k]);
				}
			});
			host.innerHTML = '';
			host.appendChild(element);

			if (!pk) {
				console.warn('roxy-widget', name, 'is missing data-publishable-key, skipping fetch');
				return;
			}

			var headers = { Accept: 'application/json' };
			headers['X-API-Key'] = pk;
			var init = { headers: headers, method: endpoint.method };
			if (endpoint.method === 'POST') {
				init.headers['Content-Type'] = 'application/json';
				init.body = JSON.stringify(attrs);
			}

			fetch(url, init)
				.then(function (res) { return res.json(); })
				.then(function (json) { element.data = json; })
				.catch(function (err) {
					element.setAttribute('aria-invalid', 'true');
					console.error('roxy-widget', name, err);
				});
		});
	}

	function scan() {
		var nodes = document.querySelectorAll('[data-roxy-widget]:not([data-roxy-mounted])');
		for (var i = 0; i < nodes.length; i++) {
			nodes[i].setAttribute('data-roxy-mounted', 'true');
			mount(nodes[i]);
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', scan);
	} else {
		scan();
	}
})();
