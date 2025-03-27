<?php
/**
 * Load the script to add to the focal point and filter the featured image block in the post editor to have correct object-position style
 * 
 * @package MRW_Featured_Image_Focal_Point
 */

namespace MRW\FeaturedImageFocalPoint;

add_action( 'init', __NAMESPACE__ . '\featured_image_focal_point_post_meta' );
/**
 * Register post meta for featured image focal point
 */
function featured_image_focal_point_post_meta() {
	register_post_meta( '', 'featured_image_focal_point', array(
		'type' => 'object',
		'description' => 'Focal point of the featured image',
		'single' => true,
		'show_in_rest' => array(
			'schema' => array(
				'type'       => 'object',
				'properties' => array(
					'x' => array(
						'type' => 'number',
					),
					'y'  => array(
						'type' => 'number',
					),
				),
			),
		),
	) );
}

add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\editor_assets' );
/**
 * Enqueue the styles and scripts that customize the block editor
 */
function editor_assets() {

	$asset_file = include plugin_dir_path( dirname( __FILE__ ) ) . '/js/focal-point-picker.asset.php';
	wp_enqueue_script(
		'mrw-focal-point-picker',
		plugins_url( 'js/focal-point-picker.js', dirname(__FILE__) ),
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);
    
}