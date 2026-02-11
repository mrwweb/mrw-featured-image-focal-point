/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/add-block-inline-style.js":
/*!******************************************!*\
  !*** ./src/js/add-block-inline-style.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



const {
  useEntityProp
} = wp.coreData;
/**
 * Add CSS classes to the block in the editor (but not the save object to avoid issues with block validation)
 */
const addFeaturedImageObjectPosition = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_0__.createHigherOrderComponent)(BlockListBlock => {
  return props => {
    const {
      name,
      className,
      attributes: {
        useFeaturedImage,
        focalPoint
      },
      wrapperProps
    } = props;
    const getPostType = () => wp.data.select('core/editor').getCurrentPostType();
    if (!(name === 'core/post-featured-image' || name === 'core/media-text' && useFeaturedImage && focalPoint === undefined)) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(BlockListBlock, {
        ...props
      });
    }
    const [meta] = useEntityProp('postType', getPostType(), 'meta');
    if (meta === undefined || !meta.hasOwnProperty('featured_image_focal_point')) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(BlockListBlock, {
        ...props
      });
    }
    const newStyles = Object.assign(wrapperProps?.style || {}, {
      '--featured-image-focal-point': `${meta.featured_image_focal_point.x * 100}% ${meta.featured_image_focal_point.y * 100}%`
    });
    const newWrapperProps = {
      ...props.wrapperProps,
      style: newStyles,
      className: className + ' use-featured-image-focal-point '
    };
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(BlockListBlock, {
      ...props,
      wrapperProps: newWrapperProps
    });
  };
}, 'addFeaturedImageObjectPosition');
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__.addFilter)('editor.BlockListBlock', 'mrw/featured-image-focal-point', addFeaturedImageObjectPosition);

/***/ }),

/***/ "./src/js/focal-point-editor-style.scss":
/*!**********************************************!*\
  !*** ./src/js/focal-point-editor-style.scss ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/focal-point-picker.js":
/*!**************************************!*\
  !*** ./src/js/focal-point-picker.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _add_block_inline_style_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-block-inline-style.js */ "./src/js/add-block-inline-style.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


const {
  __
} = wp.i18n;
const {
  addFilter
} = wp.hooks;
const {
  Fragment
} = wp.element;
const {
  createHigherOrderComponent
} = wp.compose;
const {
  FocalPointPicker,
  PanelBody
} = wp.components;
const {
  useEntityProp
} = wp.coreData;

/**
 * Add Focal Point Picker to Featured Image on posts.
 *
 * @param {Function} PostFeaturedImage Featured Image component.
 *
 * @return {Function} PostFeaturedImage Modified Featured Image component.
 */
const wrapPostFeaturedImage = createHigherOrderComponent(PostFeaturedImage => {
  return props => {
    const {
      media
    } = props;
    const getPostType = () => wp.data.select('core/editor').getCurrentPostType();
    const [meta, setMeta] = useEntityProp('postType', getPostType(), 'meta');
    const setFocalPointMeta = val => {
      setMeta(Object.assign({}, meta, {
        featured_image_focal_point: val
      }));
    };
    if (media && media.source_url) {
      const url = media.source_url;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("style", {
          children: `
                            .mrw-featured-image-focal-point {
                                margin-inline: -16px;
                                overflow: clip; /* focal point picker thumb can cause overflow when placed on edge of image */
                            }
                            .editor-post-featured-image__preview-image {
                                object-position: ${meta.featured_image_focal_point.x * 100}% ${meta.featured_image_focal_point.y * 100}% !important;
                            }`
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(PostFeaturedImage, {
          ...props
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(PanelBody, {
          name: "featured-image-focal-point",
          title: "Featured Image Focal Point",
          initialOpen: false,
          className: "mrw-featured-image-focal-point",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(FocalPointPicker, {
            label: __('Focal point picker'),
            url: url,
            value: meta.featured_image_focal_point,
            __nextHasNoMarginBottom: true,
            onChange: newFocalPoint => setFocalPointMeta(newFocalPoint)
          })
        })]
      });
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(PostFeaturedImage, {
      ...props
    });
  };
}, 'wrapPostFeaturedImage');
addFilter('editor.PostFeaturedImage', 'mrw/featured-image-control', wrapPostFeaturedImage);

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ ((module) => {

module.exports = window["wp"]["hooks"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _add_block_inline_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-block-inline-style */ "./src/js/add-block-inline-style.js");
/* harmony import */ var _focal_point_picker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./focal-point-picker */ "./src/js/focal-point-picker.js");
/* harmony import */ var _focal_point_editor_style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./focal-point-editor-style.scss */ "./src/js/focal-point-editor-style.scss");



})();

/******/ })()
;
//# sourceMappingURL=focal-point-picker.js.map