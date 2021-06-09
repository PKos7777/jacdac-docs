(self["webpackChunkjacdac_docs"] = self["webpackChunkjacdac_docs"] || []).push([[571],{

/***/ 20571:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ DashboardRoleManager; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(73108);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42656);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(80838);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(80791);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(76544);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67294);
/* harmony import */ var _jacdac_ts_src_jdom_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(71815);
/* harmony import */ var react_use_id_hook__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19640);
/* harmony import */ var _jacdac_useRegisterValue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(89196);
/* harmony import */ var _ui_LoadingProgress__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2285);
/* harmony import */ var _jacdac_Context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(20392);
/* harmony import */ var _jacdac_useChange__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(54774);
/* harmony import */ var _services_RoleListItem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(73588);
/* harmony import */ var _hooks_useRegister__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(82677);












function DashboardRoleManager(props) {
  var service = props.service,
      expanded = props.expanded;

  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_jacdac_Context__WEBPACK_IMPORTED_MODULE_6__/* .default */ .Z),
      bus = _useContext.bus;

  var autoBindRegister = (0,_hooks_useRegister__WEBPACK_IMPORTED_MODULE_9__/* .default */ .Z)(service, _jacdac_ts_src_jdom_constants__WEBPACK_IMPORTED_MODULE_2__/* .RoleManagerReg.AutoBind */ .ydC.AutoBind);
  var autoBind = (0,_jacdac_useRegisterValue__WEBPACK_IMPORTED_MODULE_4__/* .useRegisterBoolValue */ .I8)(autoBindRegister, props);

  var handleChecked = /*#__PURE__*/function () {
    var _ref = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_10__/* .default */ .Z)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(ev, checked) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return autoBindRegister.sendSetBoolAsync(checked, true);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleChecked(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var switchId = (0,react_use_id_hook__WEBPACK_IMPORTED_MODULE_3__/* .useId */ .Me)();
  var labelId = (0,react_use_id_hook__WEBPACK_IMPORTED_MODULE_3__/* .useId */ .Me)();
  var roleManager = (0,_jacdac_useChange__WEBPACK_IMPORTED_MODULE_7__/* .default */ .Z)(bus, function (_) {
    return _.roleManager;
  });
  var roles = (0,_jacdac_useChange__WEBPACK_IMPORTED_MODULE_7__/* .default */ .Z)(roleManager, function (_) {
    return _ === null || _ === void 0 ? void 0 : _.roles;
  });
  if (autoBind === undefined) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_ui_LoadingProgress__WEBPACK_IMPORTED_MODULE_5__/* .default */ .Z, null);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, roles && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_11__/* .default */ .Z, {
    item: true,
    xs: 12
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_12__/* .default */ .Z, {
    dense: true
  }, roles.map(function (role) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_services_RoleListItem__WEBPACK_IMPORTED_MODULE_8__/* .RoleListItem */ .t, {
      key: role.name,
      role: role
    });
  }))), expanded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_11__/* .default */ .Z, {
    item: true,
    xs: 12
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_13__/* .default */ .Z, {
    id: switchId,
    checked: autoBind,
    onChange: handleChecked,
    "aria-labelledby": labelId
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", {
    id: labelId
  }, "auto assign roles")));
}

/***/ })

}]);
//# sourceMappingURL=571-c705ce4628b434764a65.js.map