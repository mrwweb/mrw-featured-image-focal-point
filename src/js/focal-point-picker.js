import './add-block-inline-style.js';

const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
const { Fragment } = wp.element;
const { createHigherOrderComponent } = wp.compose;
const { FocalPointPicker, PanelBody } = wp.components;
const { useEntityProp } = wp.coreData;

/**
 * Add Focal Point Picker to Featured Image on posts.
 *
 * @param {Function} PostFeaturedImage Featured Image component.
 *
 * @return {Function} PostFeaturedImage Modified Featured Image component.
 */
const wrapPostFeaturedImage = createHigherOrderComponent(
	(PostFeaturedImage) => {
		return (props) => {
			const { media } = props;
			const getPostType = () =>
				wp.data.select('core/editor').getCurrentPostType();

			const [meta, setMeta] = useEntityProp(
				'postType',
				getPostType(),
				'meta'
			);

			const setFocalPointMeta = (val) => {
				setMeta(
					Object.assign({}, meta, {
						featured_image_focal_point: val,
					})
				);
			};

			if (media && media.source_url) {
				const url = media.source_url;

				return (
					<Fragment>
						<style>
							{`
                            .mrw-featured-image-focal-point {
                                margin-inline: -16px;
                                overflow: clip; /* focal point picker thumb can cause overflow when placed on edge of image */
                            }
                            .editor-post-featured-image__preview-image {
                                object-position: ${
									meta.featured_image_focal_point.x * 100
								}% ${
									meta.featured_image_focal_point.y * 100
								}% !important;
                            }`}
						</style>
						<PostFeaturedImage {...props} />
						<PanelBody
							name="featured-image-focal-point"
							title="Featured Image Focal Point"
							initialOpen={false}
							className="mrw-featured-image-focal-point"
						>
							<FocalPointPicker
								label={__('Focal point picker')}
								url={url}
								value={meta.featured_image_focal_point}
								__nextHasNoMarginBottom={true}
								onChange={(newFocalPoint) =>
									setFocalPointMeta(newFocalPoint)
								}
							/>
						</PanelBody>
					</Fragment>
				);
			}

			return <PostFeaturedImage {...props} />;
		};
	},
	'wrapPostFeaturedImage'
);

addFilter(
	'editor.PostFeaturedImage',
	'mrw/featured-image-control',
	wrapPostFeaturedImage
);
