(self["webpackChunkjacdac_docs"] = self["webpackChunkjacdac_docs"] || []).push([[3356],{

/***/ 73356:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ DashboardSolenoid; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);
/* harmony import */ var _jacdac_useRegisterValue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(89196);
/* harmony import */ var _widgets_SvgWidget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(48059);
/* harmony import */ var _widgets_useWidgetTheme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(60650);
/* harmony import */ var _jacdac_ts_src_jdom_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(71815);
/* harmony import */ var _hooks_useThrottledValue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(72901);
/* harmony import */ var _hooks_useSvgButtonProps__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(30833);
/* harmony import */ var _hooks_useServiceServer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(49013);
/* harmony import */ var _hooks_useRegister__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(82677);









function DashboardSolenoid(props) {
  var service = props.service;
  var pulledRegister = (0,_hooks_useRegister__WEBPACK_IMPORTED_MODULE_7__/* .default */ .Z)(service, _jacdac_ts_src_jdom_constants__WEBPACK_IMPORTED_MODULE_4__/* .SolenoidReg.Pulled */ .o$M.Pulled);
  var pulled = (0,_jacdac_useRegisterValue__WEBPACK_IMPORTED_MODULE_1__/* .useRegisterBoolValue */ .I8)(pulledRegister, props);
  var server = (0,_hooks_useServiceServer__WEBPACK_IMPORTED_MODULE_6__/* .default */ .Z)(service);
  var color = server ? "secondary" : "primary";

  var _useWidgetTheme = (0,_widgets_useWidgetTheme__WEBPACK_IMPORTED_MODULE_3__/* .default */ .Z)(color),
      active = _useWidgetTheme.active,
      background = _useWidgetTheme.background,
      controlBackground = _useWidgetTheme.controlBackground,
      textProps = _useWidgetTheme.textProps;

  var w = 128;
  var bw = 84;
  var h = 72;
  var m = 6;
  var bh = h - 2 * m;
  var bsh = bh - 6 * m;
  var pos = (0,_hooks_useThrottledValue__WEBPACK_IMPORTED_MODULE_5__/* .default */ .Z)(pulled ? m : w - bw - 2 * m, w);
  var label = pulled ? "pull solenoid" : "push solenoid";

  var onToggle = function onToggle(ev) {
    var _server$register;

    server === null || server === void 0 ? void 0 : (_server$register = server.register(_jacdac_ts_src_jdom_constants__WEBPACK_IMPORTED_MODULE_4__/* .SolenoidReg.Pulled */ .o$M.Pulled)) === null || _server$register === void 0 ? void 0 : _server$register.setValues([!pulled ? 1 : 0]);
    pulledRegister.refresh();
  };

  var buttonProps = (0,_hooks_useSvgButtonProps__WEBPACK_IMPORTED_MODULE_8__/* .default */ .Z)(label, !!server && onToggle);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_widgets_SvgWidget__WEBPACK_IMPORTED_MODULE_2__/* .default */ .Z, {
    width: w,
    height: h,
    background: background
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
    x: m + pos,
    y: m + (bh - bsh) / 2,
    width: bw,
    height: bsh,
    rx: m,
    ry: m,
    fill: active,
    stroke: controlBackground
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", Object.assign({
    x: m,
    y: m,
    width: bw,
    height: bh,
    rx: m,
    ry: m,
    stroke: background,
    fill: controlBackground
  }, buttonProps)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("text", Object.assign({}, textProps, {
    x: m + bw / 2,
    y: m + bh / 2
  }), pulled ? "pulled" : "pushed"));
}

/***/ })

}]);