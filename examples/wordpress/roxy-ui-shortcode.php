<?php
/**
 * Plugin Name: Roxy UI shortcode (example)
 * Description: WordPress shortcode that renders any Roxy UI component by name.
 * Version: 0.1.0
 * License: MIT
 *
 * Usage in a post or page:
 *   [roxy element="natal-chart" date="1990-01-15" time="14:30:00" latitude="28.6139" longitude="77.209" timezone="5.5"]
 *
 * The shortcode emits a <div data-roxy-widget="..."> the widgets script picks up
 * and a <noscript> fallback for AMP, RSS, and feed readers.
 */

if (!defined('ABSPATH')) {
	exit;
}

add_action('wp_enqueue_scripts', function () {
	wp_enqueue_script(
		'roxy-ui-widgets',
		'https://cdn.jsdelivr.net/npm/@roxyapi/ui@1/dist/cdn/widgets.js',
		[],
		null,
		['strategy' => 'defer']
	);
});

add_shortcode('roxy', function ($atts) {
	$atts = shortcode_atts([
		'element'            => 'horoscope-card',
		'publishable_key'    => get_option('roxy_publishable_key', ''),
		'sign'               => 'aries',
		'period'             => 'daily',
		'date'               => '',
		'time'               => '',
		'latitude'           => '',
		'longitude'          => '',
		'timezone'           => '',
	], $atts);

	$attrs = '';
	foreach ($atts as $key => $value) {
		if ($value === '' || $key === 'element') {
			continue;
		}
		$attrs .= sprintf(' data-%s="%s"', esc_attr(str_replace('_', '-', $key)), esc_attr($value));
	}

	$widget = sprintf(
		'<div data-roxy-widget="%s"%s></div>',
		esc_attr($atts['element']),
		$attrs
	);

	$fallback = '<noscript><a href="https://roxyapi.com">Enable JavaScript or read on RoxyAPI.</a></noscript>';

	return $widget . $fallback;
});
