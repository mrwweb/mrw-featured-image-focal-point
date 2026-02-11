import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
const { useEntityProp } = wp.coreData;
/**
 * Add CSS classes to the block in the editor (but not the save object to avoid issues with block validation)
 */
const addFeaturedImageObjectPosition = createHigherOrderComponent(
	(BlockListBlock) => {
		return (props) => {
			const {
				name,
				className,
				attributes: { useFeaturedImage, focalPoint },
				wrapperProps,
			} = props;

			const getPostType = () =>
				wp.data.select('core/editor').getCurrentPostType();

			if (
				!(
					name === 'core/post-featured-image' ||
					(name === 'core/media-text' &&
						useFeaturedImage &&
						focalPoint === undefined)
				)
			) {
				return <BlockListBlock {...props} />;
			}

			const [meta] = useEntityProp('postType', getPostType(), 'meta');
			if (
				meta === undefined ||
				!meta.hasOwnProperty('featured_image_focal_point')
			) {
				return <BlockListBlock {...props} />;
			}

			const newStyles = Object.assign(wrapperProps?.style || {}, {
				'--featured-image-focal-point': `${
					meta.featured_image_focal_point.x * 100
				}% ${meta.featured_image_focal_point.y * 100}%`,
			});

			const newWrapperProps = {
				...props.wrapperProps,
				style: newStyles,
				className: className + ' use-featured-image-focal-point ',
			};

			return <BlockListBlock {...props} wrapperProps={newWrapperProps} />;
		};
	},
	'addFeaturedImageObjectPosition'
);

addFilter(
	'editor.BlockListBlock',
	'mrw/featured-image-focal-point',
	addFeaturedImageObjectPosition
);
