<?php
/**
 * Filters front-end markup of Featured Image (via PHP template or block) to insert the object-position inline style
 * 
 * @package MRW_Featured_Image_Focal_Point
 */

namespace MRW\FeaturedImageFocalPoint;

use WP_HTML_Tag_Processor;

add_filter( 'post_thumbnail_html', __NAMESPACE__ . '\post_thumbnail_focal_point', 10, 2 );
function post_thumbnail_focal_point( $html, $post_id ) {
    $focal_point = get_focal_point( $post_id );    
    if( $focal_point ) {
        $processor = new WP_HTML_Tag_Processor( $html );
        if( $processor->next_tag( 'img' ) ) {
            $existing_styles = $processor->get_attribute( 'style' );
            if( $existing_styles && ! str_contains( $existing_styles, 'object-position' ) ) {
                $processor->set_attribute( 'style', $existing_styles . ' ' . $focal_point );
                $html = $processor->get_updated_html();
            }
        }
    }
    return $html;
}

add_filter( 'render_block_core/media-text', __NAMESPACE__ . '\media_text_focal_point', 10, 3 );
/**
 * Add focal point data to image blocks
 *
 * @param string $block_content The block content about to be rendered.
 * @param array  $block         The block being rendered.
 *
 * @return string
 */
function media_text_focal_point( $block_content, $block, $post ) {
    /* Only set a focal point when using the Featured Image and the block doesn't have it's own focal point set */
    if (
        isset( $block['attrs']['useFeaturedImage'] ) &&
        $block['attrs']['useFeaturedImage'] &&
        ! isset( $block['attrs']['focalPoint'] )
    ) {
        /* For synced patterns, we need to get the block context to use as Post ID */
        if( is_object( $post ) && get_class( $post ) === 'WP_Block' ) {
            $post = $post->context['postId'];
        }
        
        $focal_point = get_focal_point( $post );
        if ( $focal_point ) {
            $processor = new WP_HTML_Tag_Processor( $block_content );
            $processor->next_tag( [ 'class_name' => 'wp-block-media-text__media' ] );
            if( $processor->next_tag( 'img' ) ) {
                $existing_styles = $processor->get_attribute( 'style' );
                $existing_styles = str_replace( 'object-position:50% 50%;', '', $existing_styles );
                $processor->set_attribute( 'style', $existing_styles . $focal_point );
                $block_content = $processor->get_updated_html();
            }
        }
    }
    
	return $block_content;
}

function get_focal_point( $post ) {
    $focal_point = get_post_meta( $post, 'featured_image_focal_point', true );
    if ( $focal_point ) {
        $focal_point_style = 'object-position:' . 100 * $focal_point['x'] . '% ' . 100 * $focal_point['y'] . '%;';
        return $focal_point_style;
    } else {
        return false;
    }
}