# MRW Featured Image Focal Point Picker

v0.3.0

Mark Root-Wiley, [MRW Web Design](https://MRWweb.com/)

Adds a focal point picker for the Featured Image in the Post sidebar of the Block Editor. Applies `object-position` inline style with the selected focal point for the Post Featured Image block or templated featured images (i.e. `the_post_thumbnail()`).

## Installation

```sh
wp plugin install --activate https://github.com/mrwweb/mrw-featured-image-focal-point/archive/refs/heads/main.zip
```

## History & Credits

Immense props are due to everyone who contributed code on the [issue requesting this feature](https://github.com/WordPress/gutenberg/issues/20321): @cr0ybot, @ryanapsmith, and @koraysels.

This plugin took that work and added the front-end style output, block style output, an improved editor UI (in my opinion), and the ability to work with post types other than `post`.

## Changelog

### v0.3.0

- Add support for focal point on Media & Text blocks displaying the Featured Image if the featured image has a focal point but the block doesn't
- First some editor errors when meta context isn't defined. I think this closes #2

### v0.2.0

- Automatically add `custom-fields` support to post types that support `thumbnail`
