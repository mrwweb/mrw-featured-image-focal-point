<?php
/**
 * Load the script to add to the focal point and filter the featured image block in the post editor to have correct object-position style
 * 
 * @package MRW_Featured_Image_Focal_Point
 */

namespace MRW\FeaturedImageFocalPoint;

add_action( 'init', __NAMESPACE__ . '\register_focal_point_meta' );
/**
 * Register post meta for featured image focal point
 */
function register_focal_point_meta() {
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

add_action( 'init', __NAMESPACE__ . '\post_type_support', 9999 );
/**
 * Automatically add support for custom-fields to any post type that supports thumbnails
 *
 * @return void
 */
function post_type_support() {
	/**
	 * Filter the post types that will have custom-fields support added
	 * 
	 * @param string[] $post_types array of post type names
	 * 
	 * @since 0.2.0
	 */
	$post_types = apply_filters(
		'mrw_featured_image_focal_point_post_types', 
		get_post_types_by_support( 'thumbnail' )
	);

	foreach ( $post_types as $post_type ) {
		add_post_type_support( esc_attr( $post_type ), 'custom-fields' );
	}
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

	wp_enqueue_style(
		'mrw-focal-point-editor-style',
		plugins_url( 'js/index.css', dirname(__FILE__) ),
		array(),
		$asset_file['version'],
	);
    
}