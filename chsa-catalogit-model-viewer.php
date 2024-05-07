<?php
/**
 * Plugin Name:       CHSA CatalogIt Model Viewer
 * Description:       This block plug-in makes it easy to embed 3D models stored in entries in CatalogIt.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Francis Li <mail@francisli.com>
 * License:           GPL-3.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       chsa-catalogit-model-viewer
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function chsa_catalogit_model_viewer_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'chsa_catalogit_model_viewer_block_init' );
