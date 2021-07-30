(self["webpackChunkjacdac_docs"] = self["webpackChunkjacdac_docs"] || []).push([[7655],{

/***/ 69100:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(99489);

var isNativeReflectConstruct = __webpack_require__(57067);

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct;
    module.exports.default = module.exports, module.exports.__esModule = true;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };

    module.exports.default = module.exports, module.exports.__esModule = true;
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 59713:
/***/ (function(module) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 57067:
/***/ (function(module) {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = _isNativeReflectConstruct;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 52217:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ PageTemplate; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);
/* harmony import */ var gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21274);
/* harmony import */ var gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_1__);

 // eslint-disable-next-line @typescript-eslint/no-explicit-any

function PageTemplate(props) {
  var data = props.data;
  var mdx = data.mdx;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_1__.MDXRenderer, null, mdx.body);
}
var pageQuery = "3961430372";

/***/ }),

/***/ 21274:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/**
 * Welcome to gatsby-plugin-mdx!
 *
 * Start reading in gatsby-node.js
 */
var MDXRenderer = __webpack_require__(41048);

module.exports = {
  MDXRenderer: MDXRenderer
};

/***/ }),

/***/ 41048:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _construct = __webpack_require__(69100);

var _toConsumableArray = __webpack_require__(319);

var _defineProperty = __webpack_require__(59713);

var _objectWithoutPropertiesLoose = __webpack_require__(37316);

var _excluded = ["scope", "children"];

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var React = __webpack_require__(67294);

var _require = __webpack_require__(64983),
    mdx = _require.mdx;

var _require2 = __webpack_require__(93191),
    useMDXScope = _require2.useMDXScope;

module.exports = function MDXRenderer(_ref) {
  var scope = _ref.scope,
      children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  var mdxScope = useMDXScope(scope); // Memoize the compiled component

  var End = React.useMemo(function () {
    if (!children) {
      return null;
    }

    var fullScope = _objectSpread({
      // React is here just in case the user doesn't pass them in
      // in a manual usage of the renderer
      React: React,
      mdx: mdx
    }, mdxScope);

    var keys = Object.keys(fullScope);
    var values = keys.map(function (key) {
      return fullScope[key];
    });

    var fn = _construct(Function, ["_fn"].concat(_toConsumableArray(keys), ["" + children]));

    return fn.apply(void 0, [{}].concat(_toConsumableArray(values)));
  }, [children, scope]);
  return React.createElement(End, _objectSpread({}, props));
};

/***/ })

}]);