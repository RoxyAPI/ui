<?php
/**
 * Plugin Name: Roxy UI shortcode (example)
 * Description: WordPress shortcode that renders a Roxy UI component. PHP fetches the response server side with your secret key and inlines it, so the key never reaches the browser.
 * Version: 0.2.0
 * License: MIT
 *
 * Usage in a post or page:
 *   [roxy element="horoscope-card" sign="aries" period="daily"]
 *   [roxy element="vedic-kundli" date="1990-01-15" time="14:30:00" latitude="28.6139" longitude="77.209" timezone="5.5"]
 *
 * Set your secret API key once in the roxy_api_key option. Get a key at
 * https://roxyapi.com/account. The key stays on the server; only the rendered
 * response reaches the page.
 */

if (!defined('ABSPATH')) {
	exit;
}

// Load the component bundle once. It defines every roxy-* element.
add_action('wp_enqueue_scripts', function () {
	wp_enqueue_script(
		'roxy-ui',
		'https://cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/cdn/roxy-ui.js',
		[],
		null,
		['strategy' => 'defer']
	);
});

/**
 * Map a shortcode element to the RoxyAPI request that feeds it. Returns
 * [method, path, body] or null for an unknown element.
 */
function roxy_request_for($element, $atts) {
	switch ($element) {
		case 'horoscope-card':
			return ['GET', sprintf('/astrology/horoscope/%s/%s', rawurlencode($atts['sign']), rawurlencode($atts['period'])), null];
		case 'tarot-card':
			return ['POST', '/tarot/daily', new stdClass()];
		case 'numerology-card':
			$parts = explode('-', $atts['date']);
			return ['POST', '/numerology/life-path', ['year' => (int) $parts[0], 'month' => (int) $parts[1], 'day' => (int) $parts[2]]];
		case 'vedic-kundli':
			// Production tip: geocode the birth city with GET /location/search here
			// instead of passing fixed coordinates in the shortcode.
			return ['POST', '/vedic-astrology/birth-chart', [
				'date' => $atts['date'],
				'time' => $atts['time'],
				'latitude' => (float) $atts['latitude'],
				'longitude' => (float) $atts['longitude'],
				'timezone' => (float) $atts['timezone'],
			]];
		default:
			return null;
	}
}

add_shortcode('roxy', function ($atts) {
	$atts = shortcode_atts([
		'element'   => 'horoscope-card',
		'sign'      => 'aries',
		'period'    => 'daily',
		'date'      => '1990-01-15',
		'time'      => '14:30:00',
		'latitude'  => '',
		'longitude' => '',
		'timezone'  => '5.5',
	], $atts);

	$element = sanitize_key($atts['element']);
	$request = roxy_request_for($element, $atts);
	if ($request === null) {
		return '<!-- roxy: unknown element ' . esc_html($element) . ' -->';
	}
	list($method, $path, $body) = $request;

	$key = get_option('roxy_api_key', '');
	if ($key === '') {
		return '<!-- roxy: set the roxy_api_key option to your secret key -->';
	}

	// Cache the response so repeat page views do not re-bill a call.
	$cache_key = 'roxy_' . md5($element . wp_json_encode($atts));
	$data = get_transient($cache_key);

	if ($data === false) {
		$url = 'https://roxyapi.com/api/v2' . $path;
		$args = ['headers' => ['X-API-Key' => $key], 'timeout' => 10];
		if ($method === 'POST') {
			$args['headers']['Content-Type'] = 'application/json';
			$args['body'] = wp_json_encode($body);
			$response = wp_remote_post($url, $args);
		} else {
			$response = wp_remote_get($url, $args);
		}
		if (is_wp_error($response) || wp_remote_retrieve_response_code($response) !== 200) {
			return '<!-- roxy: request failed -->';
		}
		$data = wp_remote_retrieve_body($response);
		set_transient($cache_key, $data, HOUR_IN_SECONDS);
	}

	// Escape the script-unsafe characters so no string field can break out of the
	// inline <script> block. Same rule as serializeRoxyData() in @roxyapi/ui: map
	// <, >, and & to their \uXXXX JSON escapes, which parse back to the identical
	// characters. The API body is already JSON, so this only touches string
	// values, never JSON structure.
	$escaped = str_replace(['<', '>', '&'], ['\u003c', '\u003e', '\u0026'], $data);
	$json = '<script type="application/json" class="roxy-data">' . $escaped . '</script>';

	// Display attributes the component reads alongside data.
	$display = [];
	if ($element === 'horoscope-card') {
		$display['period'] = $atts['period'];
	} elseif ($element === 'numerology-card') {
		$display['type'] = 'life-path';
	} elseif ($element === 'vedic-kundli') {
		$display['chart-style'] = 'south';
	}
	$attr = '';
	foreach ($display as $name => $value) {
		$attr .= sprintf(' %s="%s"', esc_attr($name), esc_attr($value));
	}

	$fallback = '<noscript><a href="https://roxyapi.com">Enable JavaScript or read on RoxyAPI.</a></noscript>';

	return sprintf('<roxy-%s%s>%s</roxy-%s>%s', esc_attr($element), $attr, $json, esc_attr($element), $fallback);
});
