(self["webpackChunkjacdac_docs"] = self["webpackChunkjacdac_docs"] || []).push([[6953],{

/***/ 80791:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export styles */
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(22122);
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(81253);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(85505);
/* harmony import */ var _styles_withStyles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(34621);
/* harmony import */ var _ListContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(38582);






var styles = {
  /* Styles applied to the root element. */
  root: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    position: 'relative'
  },

  /* Styles applied to the root element if `disablePadding={false}`. */
  padding: {
    paddingTop: 8,
    paddingBottom: 8
  },

  /* Styles applied to the root element if dense. */
  dense: {},

  /* Styles applied to the root element if a `subheader` is provided. */
  subheader: {
    paddingTop: 0
  }
};
var List = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function List(props, ref) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'ul' : _props$component,
      _props$dense = props.dense,
      dense = _props$dense === void 0 ? false : _props$dense,
      _props$disablePadding = props.disablePadding,
      disablePadding = _props$disablePadding === void 0 ? false : _props$disablePadding,
      subheader = props.subheader,
      other = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z)(props, ["children", "classes", "className", "component", "dense", "disablePadding", "subheader"]);

  var context = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return {
      dense: dense
    };
  }, [dense]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ListContext__WEBPACK_IMPORTED_MODULE_2__/* .default.Provider */ .Z.Provider, {
    value: context
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__/* .default */ .Z)({
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_4__/* .default */ .Z)(classes.root, className, dense && classes.dense, !disablePadding && classes.padding, subheader && classes.subheader),
    ref: ref
  }, other), subheader, children));
});
 false ? 0 : void 0;
/* harmony default export */ __webpack_exports__["Z"] = ((0,_styles_withStyles__WEBPACK_IMPORTED_MODULE_5__/* .default */ .Z)(styles, {
  name: 'MuiList'
})(List));

/***/ }),

/***/ 38582:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);

/**
 * @ignore - internal component.
 */

var ListContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext({});

if (false) {}

/* harmony default export */ __webpack_exports__["Z"] = (ListContext);

/***/ }),

/***/ 4381:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export styles */
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(22122);
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(81253);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(85505);
/* harmony import */ var _styles_withStyles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(34621);
/* harmony import */ var _ButtonBase__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(67055);
/* harmony import */ var _utils_isMuiElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(61008);
/* harmony import */ var _utils_useForkRef__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11291);
/* harmony import */ var _List_ListContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(38582);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(73935);











var styles = function styles(theme) {
  return {
    /* Styles applied to the (normally root) `component` element. May be wrapped by a `container`. */
    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      position: 'relative',
      textDecoration: 'none',
      width: '100%',
      boxSizing: 'border-box',
      textAlign: 'left',
      paddingTop: 8,
      paddingBottom: 8,
      '&$focusVisible': {
        backgroundColor: theme.palette.action.selected
      },
      '&$selected, &$selected:hover': {
        backgroundColor: theme.palette.action.selected
      },
      '&$disabled': {
        opacity: 0.5
      }
    },

    /* Styles applied to the `container` element if `children` includes `ListItemSecondaryAction`. */
    container: {
      position: 'relative'
    },

    /* Pseudo-class applied to the `component`'s `focusVisibleClassName` prop if `button={true}`. */
    focusVisible: {},

    /* Styles applied to the `component` element if dense. */
    dense: {
      paddingTop: 4,
      paddingBottom: 4
    },

    /* Styles applied to the `component` element if `alignItems="flex-start"`. */
    alignItemsFlexStart: {
      alignItems: 'flex-start'
    },

    /* Pseudo-class applied to the inner `component` element if `disabled={true}`. */
    disabled: {},

    /* Styles applied to the inner `component` element if `divider={true}`. */
    divider: {
      borderBottom: "1px solid ".concat(theme.palette.divider),
      backgroundClip: 'padding-box'
    },

    /* Styles applied to the inner `component` element if `disableGutters={false}`. */
    gutters: {
      paddingLeft: 16,
      paddingRight: 16
    },

    /* Styles applied to the inner `component` element if `button={true}`. */
    button: {
      transition: theme.transitions.create('background-color', {
        duration: theme.transitions.duration.shortest
      }),
      '&:hover': {
        textDecoration: 'none',
        backgroundColor: theme.palette.action.hover,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      }
    },

    /* Styles applied to the `component` element if `children` includes `ListItemSecondaryAction`. */
    secondaryAction: {
      // Add some space to avoid collision as `ListItemSecondaryAction`
      // is absolutely positioned.
      paddingRight: 48
    },

    /* Pseudo-class applied to the root element if `selected={true}`. */
    selected: {}
  };
};
var useEnhancedEffect = typeof window === 'undefined' ? react__WEBPACK_IMPORTED_MODULE_0__.useEffect : react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect;
/**
 * Uses an additional container component if `ListItemSecondaryAction` is the last child.
 */

var ListItem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function ListItem(props, ref) {
  var _props$alignItems = props.alignItems,
      alignItems = _props$alignItems === void 0 ? 'center' : _props$alignItems,
      _props$autoFocus = props.autoFocus,
      autoFocus = _props$autoFocus === void 0 ? false : _props$autoFocus,
      _props$button = props.button,
      button = _props$button === void 0 ? false : _props$button,
      childrenProp = props.children,
      classes = props.classes,
      className = props.className,
      componentProp = props.component,
      _props$ContainerCompo = props.ContainerComponent,
      ContainerComponent = _props$ContainerCompo === void 0 ? 'li' : _props$ContainerCompo,
      _props$ContainerProps = props.ContainerProps;
  _props$ContainerProps = _props$ContainerProps === void 0 ? {} : _props$ContainerProps;

  var ContainerClassName = _props$ContainerProps.className,
      ContainerProps = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__/* .default */ .Z)(_props$ContainerProps, ["className"]),
      _props$dense = props.dense,
      dense = _props$dense === void 0 ? false : _props$dense,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$disableGutters = props.disableGutters,
      disableGutters = _props$disableGutters === void 0 ? false : _props$disableGutters,
      _props$divider = props.divider,
      divider = _props$divider === void 0 ? false : _props$divider,
      focusVisibleClassName = props.focusVisibleClassName,
      _props$selected = props.selected,
      selected = _props$selected === void 0 ? false : _props$selected,
      other = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__/* .default */ .Z)(props, ["alignItems", "autoFocus", "button", "children", "classes", "className", "component", "ContainerComponent", "ContainerProps", "dense", "disabled", "disableGutters", "divider", "focusVisibleClassName", "selected"]);

  var context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(_List_ListContext__WEBPACK_IMPORTED_MODULE_3__/* .default */ .Z);
  var childContext = {
    dense: dense || context.dense || false,
    alignItems: alignItems
  };
  var listItemRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  useEnhancedEffect(function () {
    if (autoFocus) {
      if (listItemRef.current) {
        listItemRef.current.focus();
      } else if (false) {}
    }
  }, [autoFocus]);
  var children = react__WEBPACK_IMPORTED_MODULE_0__.Children.toArray(childrenProp);
  var hasSecondaryAction = children.length && (0,_utils_isMuiElement__WEBPACK_IMPORTED_MODULE_4__/* .default */ .Z)(children[children.length - 1], ['ListItemSecondaryAction']);
  var handleOwnRef = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(function (instance) {
    // #StrictMode ready
    listItemRef.current = react_dom__WEBPACK_IMPORTED_MODULE_1__.findDOMNode(instance);
  }, []);
  var handleRef = (0,_utils_useForkRef__WEBPACK_IMPORTED_MODULE_5__/* .default */ .Z)(handleOwnRef, ref);

  var componentProps = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_6__/* .default */ .Z)({
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_7__/* .default */ .Z)(classes.root, className, childContext.dense && classes.dense, !disableGutters && classes.gutters, divider && classes.divider, disabled && classes.disabled, button && classes.button, alignItems !== "center" && classes.alignItemsFlexStart, hasSecondaryAction && classes.secondaryAction, selected && classes.selected),
    disabled: disabled
  }, other);

  var Component = componentProp || 'li';

  if (button) {
    componentProps.component = componentProp || 'div';
    componentProps.focusVisibleClassName = (0,clsx__WEBPACK_IMPORTED_MODULE_7__/* .default */ .Z)(classes.focusVisible, focusVisibleClassName);
    Component = _ButtonBase__WEBPACK_IMPORTED_MODULE_8__/* .default */ .Z;
  }

  if (hasSecondaryAction) {
    // Use div by default.
    Component = !componentProps.component && !componentProp ? 'div' : Component; // Avoid nesting of li > li.

    if (ContainerComponent === 'li') {
      if (Component === 'li') {
        Component = 'div';
      } else if (componentProps.component === 'li') {
        componentProps.component = 'div';
      }
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_List_ListContext__WEBPACK_IMPORTED_MODULE_3__/* .default.Provider */ .Z.Provider, {
      value: childContext
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ContainerComponent, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_6__/* .default */ .Z)({
      className: (0,clsx__WEBPACK_IMPORTED_MODULE_7__/* .default */ .Z)(classes.container, ContainerClassName),
      ref: handleRef
    }, ContainerProps), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component, componentProps, children), children.pop()));
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_List_ListContext__WEBPACK_IMPORTED_MODULE_3__/* .default.Provider */ .Z.Provider, {
    value: childContext
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_6__/* .default */ .Z)({
    ref: handleRef
  }, componentProps), children));
});
 false ? 0 : void 0;
/* harmony default export */ __webpack_exports__["Z"] = ((0,_styles_withStyles__WEBPACK_IMPORTED_MODULE_9__/* .default */ .Z)(styles, {
  name: 'MuiListItem'
})(ListItem));

/***/ }),

/***/ 50144:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export styles */
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(22122);
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(81253);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(85505);
/* harmony import */ var _styles_withStyles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(34621);
/* harmony import */ var _List_ListContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(38582);






var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      minWidth: 56,
      color: theme.palette.action.active,
      flexShrink: 0,
      display: 'inline-flex'
    },

    /* Styles applied to the root element when the parent `ListItem` uses `alignItems="flex-start"`. */
    alignItemsFlexStart: {
      marginTop: 8
    }
  };
};
/**
 * A simple wrapper to apply `List` styles to an `Icon` or `SvgIcon`.
 */

var ListItemIcon = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function ListItemIcon(props, ref) {
  var classes = props.classes,
      className = props.className,
      other = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z)(props, ["classes", "className"]);

  var context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(_List_ListContext__WEBPACK_IMPORTED_MODULE_2__/* .default */ .Z);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__/* .default */ .Z)({
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_4__/* .default */ .Z)(classes.root, className, context.alignItems === 'flex-start' && classes.alignItemsFlexStart),
    ref: ref
  }, other));
});
 false ? 0 : void 0;
/* harmony default export */ __webpack_exports__["Z"] = ((0,_styles_withStyles__WEBPACK_IMPORTED_MODULE_5__/* .default */ .Z)(styles, {
  name: 'MuiListItemIcon'
})(ListItemIcon));

/***/ }),

/***/ 65735:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var __webpack_unused_export__;


var _interopRequireDefault = __webpack_require__(95318);

var _interopRequireWildcard = __webpack_require__(20862);

__webpack_unused_export__ = ({
  value: true
});
exports.Z = void 0;

var React = _interopRequireWildcard(__webpack_require__(67294));

var _createSvgIcon = _interopRequireDefault(__webpack_require__(58786));

var _default = (0, _createSvgIcon.default)( /*#__PURE__*/React.createElement("path", {
  d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
}), 'ChevronRight');

exports.Z = _default;

/***/ }),

/***/ 80837:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var __webpack_unused_export__;


var _interopRequireDefault = __webpack_require__(95318);

var _interopRequireWildcard = __webpack_require__(20862);

__webpack_unused_export__ = ({
  value: true
});
exports.Z = void 0;

var React = _interopRequireWildcard(__webpack_require__(67294));

var _createSvgIcon = _interopRequireDefault(__webpack_require__(58786));

var _default = (0, _createSvgIcon.default)( /*#__PURE__*/React.createElement("path", {
  d: "M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02zM8 16h2.5l1.5 1.5 1.5-1.5H16v-2.5l1.5-1.5-1.5-1.5V8h-2.5L12 6.5 10.5 8H8v2.5L6.5 12 8 13.5V16zm4-7c1.66 0 3 1.34 3 3s-1.34 3-3 3V9z"
}), 'SettingsBrightness');

exports.Z = _default;

/***/ }),

/***/ 14695:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var __webpack_unused_export__;


var _interopRequireDefault = __webpack_require__(95318);

var _interopRequireWildcard = __webpack_require__(20862);

__webpack_unused_export__ = ({
  value: true
});
exports.Z = void 0;

var React = _interopRequireWildcard(__webpack_require__(67294));

var _createSvgIcon = _interopRequireDefault(__webpack_require__(58786));

var _default = (0, _createSvgIcon.default)( /*#__PURE__*/React.createElement("path", {
  d: "M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"
}), 'Wifi');

exports.Z = _default;

/***/ }),

/***/ 26953:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ ToolsDrawer; }
});

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(96156);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/makeStyles.js
var makeStyles = __webpack_require__(10920);
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/createStyles.js
var createStyles = __webpack_require__(70274);
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/ListItem/ListItem.js
var ListItem = __webpack_require__(4381);
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/ListItemIcon/ListItemIcon.js
var ListItemIcon = __webpack_require__(50144);
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/ListItemText/ListItemText.js
var ListItemText = __webpack_require__(38030);
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Drawer/Drawer.js
var Drawer = __webpack_require__(71892);
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/List/List.js
var List = __webpack_require__(80791);
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Divider/Divider.js
var Divider = __webpack_require__(62846);
// EXTERNAL MODULE: ./node_modules/gatsby-theme-material-ui/index.js
var gatsby_theme_material_ui = __webpack_require__(36176);
// EXTERNAL MODULE: ./src/components/layout.tsx + 16 modules
var layout = __webpack_require__(67784);
// EXTERNAL MODULE: ./src/components/AppContext.tsx
var AppContext = __webpack_require__(84377);
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/utils/createSvgIcon.js
var createSvgIcon = __webpack_require__(6018);
;// CONCATENATED MODULE: ./node_modules/@material-ui/icons/esm/OpenInNew.js


/* harmony default export */ var OpenInNew = ((0,createSvgIcon/* default */.Z)( /*#__PURE__*/react.createElement("path", {
  d: "M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
}), 'OpenInNew'));
// EXTERNAL MODULE: ./node_modules/@material-ui/icons/ChevronRight.js
var ChevronRight = __webpack_require__(65735);
// EXTERNAL MODULE: ./node_modules/@material-ui/icons/SettingsBrightness.js
var SettingsBrightness = __webpack_require__(80837);
// EXTERNAL MODULE: ./node_modules/@material-ui/icons/SystemUpdateAlt.js
var SystemUpdateAlt = __webpack_require__(96898);
// EXTERNAL MODULE: ./node_modules/@material-ui/icons/Wifi.js
var Wifi = __webpack_require__(14695);
// EXTERNAL MODULE: ./src/components/ui/DarkModeContext.tsx
var DarkModeContext = __webpack_require__(91350);
// EXTERNAL MODULE: ./src/components/KindIcon.tsx
var KindIcon = __webpack_require__(50048);
// EXTERNAL MODULE: ./src/components/icons/MakeCodeIcon.tsx
var MakeCodeIcon = __webpack_require__(70654);
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/SvgIcon/SvgIcon.js
var SvgIcon = __webpack_require__(46982);
;// CONCATENATED MODULE: ./src/components/icons/JupyterIcon.tsx


/* harmony default export */ var JupyterIcon = (function (props) {
  return /*#__PURE__*/react.createElement(SvgIcon/* default */.Z, props, /*#__PURE__*/react.createElement("g", {
    transform: "scale(0.046, 0.046)"
  }, /*#__PURE__*/react.createElement("path", {
    d: "M363.1749878,34.3386345c0.8400269,19.7925911-14.3702087,36.5211449-33.9805298,37.3691826c-19.6002808,0.8480377-36.1755371-14.5075035-37.015564-34.3000946S306.5491333,0.8815286,326.1544189,0.033491S362.3349609,14.5460396,363.1749878,34.3386345 M193.5356445,384.5007019c-78.2163391,0-146.3281555-28.4102173-181.7874756-70.3781433c26.833786,75.240448,98.0906677,129.0350952,181.7874756,129.0350952s154.9537048-53.7946472,181.7874756-129.0350952C339.8638,356.0904846,271.7519836,384.5007019,193.5356445,384.5007019 M193.5356445,111.3343964c78.2163391,0,146.3281555,28.4065704,181.7874756,70.3781586c-26.8337708-75.2404785-98.0906677-129.0387421-181.7874756-129.0387421S38.581955,106.4720764,11.7481689,181.7125549C47.2074814,139.7409668,115.3193054,111.3343964,193.5356445,111.3343964 M101.3917084,467.5608215c0.996994,23.5126343-17.0774078,43.38797-40.3688049,44.3994751c-23.2914047,1.0064392-42.9797745-17.239624-43.9767761-40.7522583c-1.0019455-23.5126343,17.072464-43.3930054,40.3638611-44.3994751C80.7013855,425.802124,100.3946991,444.0481873,101.3917084,467.5608215 M26.9179688,95.017662C12.6761246,95.6327286,0.6337129,84.4763947,0.0244142,70.0946655c-0.6142578-14.3767166,10.4374084-26.5331802,24.6842041-27.1482506c14.2418442-0.6150742,26.2842484,10.5412636,26.8935547,24.9179802C52.2164307,82.2461243,41.1598053,94.4025803,26.9179688,95.017662z"
  })));
});
// EXTERNAL MODULE: ./jacdac-ts/src/jdom/constants.ts
var constants = __webpack_require__(71815);
// EXTERNAL MODULE: ./src/jacdac/Flags.ts
var Flags = __webpack_require__(39840);
;// CONCATENATED MODULE: ./src/components/ToolsDrawer.tsx


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0,defineProperty/* default */.Z)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }






 // tslint:disable-next-line: no-submodule-imports match-default-export-name

 // tslint:disable-next-line: no-submodule-imports match-default-export-name

 // tslint:disable-next-line: no-submodule-imports match-default-export-name

 // tslint:disable-next-line: no-submodule-imports match-default-export-name








var useStyles = (0,makeStyles/* default */.Z)(function (theme) {
  var _drawer, _drawerPaper;

  return (0,createStyles/* default */.Z)({
    drawer: (_drawer = {
      width: layout/* TOOLS_DRAWER_WIDTH */.wW + "rem",
      flexShrink: 0
    }, _drawer[theme.breakpoints.down(layout/* MOBILE_BREAKPOINT */.Gh)] = {
      width: layout/* MOBILE_TOOLS_DRAWER_WIDTH */.Po + "rem"
    }, _drawer),
    drawerPaper: (_drawerPaper = {
      width: layout/* TOOLS_DRAWER_WIDTH */.wW + "rem"
    }, _drawerPaper[theme.breakpoints.down(layout/* MOBILE_BREAKPOINT */.Gh)] = {
      width: layout/* MOBILE_TOOLS_DRAWER_WIDTH */.Po + "rem"
    }, _drawerPaper),
    drawerHeader: _objectSpread(_objectSpread({
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1)
    }, theme.mixins.toolbar), {}, {
      justifyContent: "flex-start"
    })
  });
});

function ToolsListItem(props) {
  var text = props.text,
      url = props.url,
      icon = props.icon,
      onClick = props.onClick,
      onClose = props.onClose;
  return url ? /*#__PURE__*/react.createElement(gatsby_theme_material_ui.Link, {
    to: url,
    "aria-label": "Toggle Dark Mode",
    onClick: onClose
  }, /*#__PURE__*/react.createElement(ListItem/* default */.Z, {
    button: true
  }, /*#__PURE__*/react.createElement(ListItemIcon/* default */.Z, null, icon), /*#__PURE__*/react.createElement(ListItemText/* default */.Z, {
    primaryTypographyProps: {
      color: "textPrimary"
    },
    primary: /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("span", null, text), /^https:\/\//.test(url) && /*#__PURE__*/react.createElement(OpenInNew, {
      fontSize: "small",
      color: "action"
    }))
  }))) : /*#__PURE__*/react.createElement(ListItem/* default */.Z, {
    button: true,
    onClick: onClick,
    "aria-label": text
  }, /*#__PURE__*/react.createElement(ListItemIcon/* default */.Z, null, icon), /*#__PURE__*/react.createElement(ListItemText/* default */.Z, {
    primaryTypographyProps: {
      color: "textPrimary"
    },
    primary: text
  }));
}

function ToolsDrawer() {
  var classes = useStyles();

  var _useContext = (0,react.useContext)(AppContext/* default */.ZP),
      toolsMenu = _useContext.toolsMenu,
      setToolsMenu = _useContext.setToolsMenu,
      toggleShowDeviceHostsDialog = _useContext.toggleShowDeviceHostsDialog;

  var _useContext2 = (0,react.useContext)(DarkModeContext/* default */.Z),
      toggleDarkMode = _useContext2.toggleDarkMode,
      darkMode = _useContext2.darkMode;

  var handleClick = function handleClick(link) {
    return function () {
      setToolsMenu(false);
      link === null || link === void 0 ? void 0 : link.action();
    };
  };

  var handleDrawerClose = function handleDrawerClose() {
    setToolsMenu(false);
  };

  var handleDarkMode = function handleDarkMode() {
    setToolsMenu(false);
    toggleDarkMode();
  };

  var links = [{
    text: "Start simulator",
    action: toggleShowDeviceHostsDialog,
    icon: /*#__PURE__*/react.createElement(KindIcon/* default */.ZP, {
      kind: constants/* VIRTUAL_DEVICE_NODE_NAME */.UX7
    })
  }, Flags/* default.peers */.Z.peers && {
    text: "Peers",
    url: "/tools/peers",
    icon: /*#__PURE__*/react.createElement(Wifi/* default */.Z, null)
  }, {}, {
    text: "Firmware Update",
    url: "/tools/updater",
    icon: /*#__PURE__*/react.createElement(SystemUpdateAlt/* default */.Z, null)
  }, {// separator
  }, {
    text: "MakeCode",
    url: "/tools/makecode",
    icon: /*#__PURE__*/react.createElement(MakeCodeIcon/* default */.Z, null)
  }, {
    text: "Jupyter Lab",
    url: "/tools/jupyterlab",
    icon: /*#__PURE__*/react.createElement(JupyterIcon, null)
  },
  /*
      {
          text: "Edge Impulse",
          url: "/tools/edge-impulse",
          icon: <EdgeImpulseIcon />
      },
      {
      text: "Azure IoT Hub",
              url: "/tools/azure-iot-hub",
              icon: <CloudIcon />
      },
  */
  {// separator
  }, {
    text: "Service Editor",
    url: "/tools/service-editor",
    icon: /*#__PURE__*/react.createElement(KindIcon/* default */.ZP, {
      kind: constants/* SERVICE_NODE_NAME */.M_U
    })
  }, {
    text: "Service Test Editor",
    url: "/tools/service-test-editor",
    icon: /*#__PURE__*/react.createElement(KindIcon/* default */.ZP, {
      kind: constants/* SERVICE_TEST_NODE_NAME */.BCz
    })
  }, {
    text: "Device registration",
    url: "/tools/device-registration",
    icon: /*#__PURE__*/react.createElement(KindIcon/* default */.ZP, {
      kind: constants/* DEVICE_NODE_NAME */.tY6
    })
  }].filter(function (l) {
    return !!l;
  });
  if (!toolsMenu) return null;
  return /*#__PURE__*/react.createElement(Drawer/* default */.ZP, {
    className: classes.drawer,
    variant: "persistent",
    anchor: "right",
    open: toolsMenu,
    classes: {
      paper: classes.drawerPaper
    }
  }, /*#__PURE__*/react.createElement("div", {
    className: classes.drawerHeader
  }, /*#__PURE__*/react.createElement(gatsby_theme_material_ui.IconButton, {
    "aria-label": "Collapse",
    onClick: handleDrawerClose
  }, /*#__PURE__*/react.createElement(ChevronRight/* default */.Z, null))), /*#__PURE__*/react.createElement(List/* default */.Z, null, links.map(function (link, i) {
    return link.text ? /*#__PURE__*/react.createElement(ToolsListItem, Object.assign({
      key: link.text
    }, link, {
      onClick: handleClick(link),
      onClose: handleDrawerClose
    })) : /*#__PURE__*/react.createElement(Divider/* default */.Z, {
      key: "div" + i
    });
  }), /*#__PURE__*/react.createElement(Divider/* default */.Z, null), /*#__PURE__*/react.createElement(ListItem/* default */.Z, {
    button: true,
    onClick: handleDarkMode,
    "aria-label": "Toggle Dark Mode"
  }, /*#__PURE__*/react.createElement(ListItemIcon/* default */.Z, null, /*#__PURE__*/react.createElement(SettingsBrightness/* default */.Z, null)), /*#__PURE__*/react.createElement(ListItemText/* default */.Z, null, darkMode === "light" ? "Dark Mode" : "Light mode"))));
}

/***/ }),

/***/ 70654:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(46982);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);


/* harmony default export */ __webpack_exports__["Z"] = (function (props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z, props, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M4.703 2.615s-.505.05-.72.15a3.011 3.011 0 00-.391.221c-.22.12-.42.266-.6.444-.52.516-.795 1.2-.834 2.05a6.857 6.857 0 00-.066.961V8.36a5.117 5.117 0 01-.137 1.032 1.73 1.73 0 01-.4.773 2.006 2.006 0 00-.15.149 6.534 6.534 0 01-.848.617c-.303.196-.481.474-.537.83v.017c-.01.07-.017.14-.018.215L0 12.006v.008c0 .08.003.156.012.226h.002c.024.214.082.378.177.492.129.153.345.328.649.52.304.192.552.398.74.62.19.221.332.549.428.985.037.17.065.54.084 1.106v1.514c0 .285.023.542.056.787.001.047 0 .092.002.14.007.587.135 1.107.385 1.559.25.453.604.803 1.063 1.05.458.248.978.372 1.56.372h14.139c.262 0 .505-.05.72-.15.139-.064.267-.14.391-.221.218-.12.42-.266.6-.444.52-.516.795-1.2.834-2.05.042-.299.066-.618.066-.963v-1.918c.014-.372.059-.715.137-1.03.078-.314.213-.572.4-.775a1.98 1.98 0 00.15-.146c.2-.179.48-.384.848-.618.303-.196.481-.475.537-.832l.002-.015a1.66 1.66 0 00.018-.217V11.988c0-.08-.004-.156-.012-.226h-.002c-.024-.214-.082-.378-.177-.492-.129-.153-.345-.328-.649-.52a3.208 3.208 0 01-.74-.62c-.19-.221-.332-.55-.428-.987-.037-.17-.065-.538-.084-1.104V6.523c0-.285-.023-.542-.056-.787-.001-.047 0-.092-.002-.14-.007-.587-.135-1.107-.385-1.559a2.598 2.598 0 00-1.063-1.05c-.458-.248-.978-.372-1.56-.372H4.703zm1.22 1.24c.307 0 .533.058.673.172.115.096.168.24.168.453a.885.885 0 01-.069.36.501.501 0 01-.142.201.346.346 0 01-.18.07c-.31.042-.543.095-.713.164a1.03 1.03 0 00-.543.536c-.093.201-.149.47-.174.818-.022.301-.033.725-.033 1.293-.012.796-.058 1.422-.137 1.861-.07.398-.206.74-.4 1.02-.197.282-.499.552-.898.804l-.616.39.618.386c.286.18.52.368.695.558.166.18.304.407.414.672.115.277.2.614.248 1.004.051.413.076.908.076 1.47 0 .587.013 1.025.037 1.34.03.367.094.64.196.835.123.236.303.403.537.496.168.067.395.114.693.148a.404.404 0 01.268.16c.081.1.123.259.123.471 0 .308-.064.608-.84.608-.477 0-.898-.094-1.25-.282a2.006 2.006 0 01-.813-.785 2.402 2.402 0 01-.31-1.197c-.048-2.666-.098-3.199-.139-3.37-.115-.472-.286-.83-.525-1.097a3.373 3.373 0 00-.776-.633c-.216-.13-.375-.254-.47-.369-.027-.032-.088-.136-.088-.416 0-.288.09-.471.293-.596.454-.28.781-.522.998-.746.244-.251.415-.565.51-.931.084-.328.132-.788.148-1.407.015-.58.03-1.305.049-2.177.016-.706.229-1.25.654-1.666.426-.416.988-.618 1.719-.618zm12.153 0c.477 0 .898.095 1.25.282.348.185.612.442.813.785.2.343.305.746.31 1.197.048 2.666.098 3.199.139 3.37.115.472.286.83.525 1.097.216.24.476.452.776.633.217.131.376.255.47.369.027.032.088.136.088.416 0 .287-.09.471-.293.596-.454.28-.78.522-.998.746-.243.25-.415.565-.51.931-.084.328-.132.788-.148 1.407-.015.58-.03 1.305-.049 2.177-.016.706-.229 1.25-.654 1.666-.426.416-.988.618-1.719.618-.307 0-.533-.058-.672-.172-.116-.096-.168-.24-.168-.453 0-.135.021-.253.069-.36a.512.512 0 01.14-.201.353.353 0 01.182-.07c.31-.042.543-.095.713-.164.238-.099.424-.284.54-.538.094-.201.152-.468.177-.816.021-.301.033-.727.033-1.295.012-.796.058-1.42.137-1.86.07-.397.204-.74.398-1.019.196-.281.499-.552.898-.804l.616-.39-.616-.386a3.412 3.412 0 01-.695-.558 2.275 2.275 0 01-.416-.672 3.871 3.871 0 01-.246-1.004 12.22 12.22 0 01-.078-1.47c0-.587-.012-1.025-.037-1.34-.03-.367-.092-.64-.194-.835a1.021 1.021 0 00-.539-.496 2.76 2.76 0 00-.691-.148.4.4 0 01-.268-.16c-.082-.1-.123-.259-.123-.471 0-.308.064-.608.84-.608zm-6.29 1.348c.052-.005.341-.005.394 0v.01a1.524 1.524 0 011.287 1.457c0 .62-.332.891-.332.916-.33.346-.123.744.467.695 0 0 2.4.012 2.445 0a.576.576 0 01.422.555l-.002 2.574c-.106.3-.396.36-.658.111-.025 0-.296-.332-.916-.332a1.521 1.521 0 00-1.457 1.286h-.008a4.897 4.897 0 000 .394h.008a1.524 1.524 0 001.457 1.287c.62 0 .89-.332.916-.332.27-.256.557-.225.658.112v2.783a.562.562 0 01-.563.562H8.061a.561.561 0 01-.563-.562V8.836c0-.261.18-.492.422-.555.046.012 2.443 0 2.443 0 .659.032.798-.349.469-.695 0-.025-.332-.296-.332-.916a1.521 1.521 0 011.285-1.457v-.01z",
    strokeWidth: ".75"
  }));
});

/***/ })

}]);
//# sourceMappingURL=6953-d4e8d1a2de540ffb2773.js.map