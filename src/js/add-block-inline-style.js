import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
const { useEntityProp } = wp.coreData;
/**
 * Add CSS classes to the block in the editor (but not the save object to avoid issues with block validation)
 */
const addFeaturedImageObjectPosition = createHigherOrderComponent(
	( BlockListBlock ) => {
		return ( props ) => {
			const { name, style } = props;
			const getPostType = () =>
				wp.data.select( 'core/editor' ).getCurrentPostType();

			if ( name !== 'core/post-featured-image' ) {
				return <BlockListBlock { ...props } />;
			}

			const [ meta ] = useEntityProp( 'postType', getPostType(), 'meta' );
			if ( ! meta.hasOwnProperty( 'featured_image_focal_point' ) ) {
				return <BlockListBlock { ...props } />;
			}

			const newStyles = Object.assign( style || {}, {
				objectPosition: `${
					meta.featured_image_focal_point.x * 100
				}% ${ meta.featured_image_focal_point.y * 100 }%`,
			} );

			const wrapperProps = {
				...props.wrapperProps,
				style: newStyles,
			};

			return (
				<BlockListBlock { ...props } wrapperProps={ wrapperProps } />
			);
		};
	},
	'addFeaturedImageObjectPosition'
);

addFilter(
	'editor.BlockListBlock',
	'mrw/featured-image-focal-point',
	addFeaturedImageObjectPosition
);
