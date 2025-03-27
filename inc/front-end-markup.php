<?php
/**
 * Filters front-end markup of Featured Image (via PHP template or block) to insert the object-position inline style
 * 
 * @package MRW_Featured_Image_Focal_Point
 */

namespace MRW\FeaturedImageFocalPoint;

use WP_HTML_Tag_Processor;

add_filter( 'post_thumbnail_html', __NAMESPACE__ . '\maybe_add_object_position_styles', 10 );
add_filter( 'render_block', __NAMESPACE__ . '\add_focal_point_to_image_block', 10, 2 );
/**
 * Add focal point data to image blocks
 *
 * @param string $block_content The block content about to be rendered.
 * @param array  $block         The block being rendered.
 *
 * @return string
 */
function add_focal_point_to_image_block( $block_content, $block ) {
	if ( 'core/post-featured-image' === $block['blockName'] ) {
		$block_content = maybe_add_object_position_styles( $block_content );
	}

	return $block_content;
}

function maybe_add_object_position_styles( $html ) {
    $focal_point = get_post_meta( get_the_ID(), 'featured_image_focal_point', true );
    if ( $focal_point ) {
        $processor = new WP_HTML_Tag_Processor( $html );
        if( $processor->next_tag( 'img' ) ) {
            $new_style = 'object-position:' . 100 * $focal_point['x'] . '% ' . 100 * $focal_point['y'] . '%;';
            $existing_styles = $processor->get_attribute( 'style' );
			if( ! str_contains( $existing_styles, 'object-position' ) ) {
				$processor->set_attribute( 'style', $existing_styles . ' ' . $new_style );
				$html = $processor->get_updated_html();
			}
        }
    }
    return $html;
}
