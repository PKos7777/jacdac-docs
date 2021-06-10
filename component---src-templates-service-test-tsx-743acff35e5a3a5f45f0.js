(self["webpackChunkjacdac_docs"] = self["webpackChunkjacdac_docs"] || []).push([[636],{

/***/ 99202:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ ServiceTest; }
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./src/jacdac/Context.tsx
var Context = __webpack_require__(20392);
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Button/Button.js
var Button = __webpack_require__(83332);
// EXTERNAL MODULE: ./node_modules/@material-ui/lab/esm/AlertTitle/AlertTitle.js
var AlertTitle = __webpack_require__(99330);
// EXTERNAL MODULE: ./node_modules/@material-ui/icons/Info.js
var Info = __webpack_require__(12531);
// EXTERNAL MODULE: ./src/components/ui/Alert.tsx
var Alert = __webpack_require__(95453);
// EXTERNAL MODULE: ./src/components/ui/IconButtonWithTooltip.tsx + 1 modules
var IconButtonWithTooltip = __webpack_require__(79885);
// EXTERNAL MODULE: ./jacdac-ts/src/servers/servers.ts + 24 modules
var servers = __webpack_require__(10595);
// EXTERNAL MODULE: ./jacdac-ts/src/jdom/flags.ts
var flags = __webpack_require__(21258);
// EXTERNAL MODULE: ./jacdac-ts/src/test/testspec.ts + 1 modules
var testspec = __webpack_require__(45831);
// EXTERNAL MODULE: ./src/components/useGridBreakpoints.ts
var useGridBreakpoints = __webpack_require__(7746);
// EXTERNAL MODULE: ./src/jacdac/useChange.ts
var useChange = __webpack_require__(54774);
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Grid/Grid.js
var Grid = __webpack_require__(80838);
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Card/Card.js
var Card = __webpack_require__(85420);
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/CardActions/CardActions.js
var CardActions = __webpack_require__(31186);
// EXTERNAL MODULE: ./src/components/DeviceCardHeader.tsx + 2 modules
var DeviceCardHeader = __webpack_require__(31477);
;// CONCATENATED MODULE: ./src/components/select/SelectServiceGrid.tsx







function SelectServiceGrid(props) {
  var _useContext = (0,react.useContext)(Context/* default */.Z),
      bus = _useContext.bus;

  var serviceClass = props.serviceClass,
      buttonText = props.buttonText,
      onSelect = props.onSelect,
      disabled = props.disabled;
  var services = (0,useChange/* default */.Z)(bus, function (n) {
    return n.services({
      serviceClass: serviceClass
    });
  }, []);
  var gridBreakpoints = (0,useGridBreakpoints/* default */.Z)();

  var handleSelect = function handleSelect(service) {
    return function () {
      return onSelect(service);
    };
  };

  return /*#__PURE__*/react.createElement(react.Fragment, null, !!services.length && /*#__PURE__*/react.createElement(Grid/* default */.Z, {
    container: true,
    spacing: 2
  }, services.map(function (service) {
    return /*#__PURE__*/react.createElement(Grid/* default */.Z, Object.assign({
      key: service.id,
      item: true
    }, gridBreakpoints), /*#__PURE__*/react.createElement(Card/* default */.Z, null, /*#__PURE__*/react.createElement(DeviceCardHeader/* default */.Z, {
      device: service.device,
      showAvatar: true
    }), /*#__PURE__*/react.createElement(CardActions/* default */.Z, null, /*#__PURE__*/react.createElement(Button/* default */.Z, {
      variant: "contained",
      color: "primary",
      onClick: handleSelect(service),
      disabled: disabled
    }, buttonText || "Select"))));
  })), !(services !== null && services !== void 0 && services.length) && /*#__PURE__*/react.createElement(Alert/* default */.Z, {
    severity: "info"
  }, "Not seeing your device? Try some of the following.", /*#__PURE__*/react.createElement("ul", null, /*#__PURE__*/react.createElement("li", null, "Check that your device is connected"), /*#__PURE__*/react.createElement("li", null, "Use the ", /*#__PURE__*/react.createElement("strong", null, "packet console"), " to monitor packets on the bus"), /*#__PURE__*/react.createElement("li", null, "Check the class identifier in your annoucement packets"))));
}
// EXTERNAL MODULE: ./src/components/test/ServiceTestRunner.tsx + 2 modules
var ServiceTestRunner = __webpack_require__(43676);
// EXTERNAL MODULE: ./jacdac-ts/src/jdom/constants.ts
var constants = __webpack_require__(71815);
;// CONCATENATED MODULE: ./src/components/test/ServiceTest.tsx


 // tslint:disable-next-line: no-submodule-imports

 // tslint:disable-next-line: match-default-export-name no-submodule-imports











function Diagnostics(props) {
  var serviceClass = props.serviceClass;

  var _useContext = (0,react.useContext)(Context/* default */.Z),
      bus = _useContext.bus;

  var hostDefinition = (0,servers/* serviceProviderDefinitionFromServiceClass */.vd)(serviceClass);

  var handleStartSimulator = function handleStartSimulator() {
    return (0,servers/* addServiceProvider */.Q6)(bus, hostDefinition);
  };

  if (!hostDefinition) return null;
  return /*#__PURE__*/react.createElement(Alert/* default */.Z, {
    severity: "info"
  }, /*#__PURE__*/react.createElement(AlertTitle/* default */.Z, null, "Developer zone"), /*#__PURE__*/react.createElement(Button/* default */.Z, {
    variant: "outlined",
    onClick: handleStartSimulator
  }, "start simulator"));
}

function ServiceTestRunnerSelect(props) {
  var serviceClass = props.serviceClass,
      onSelect = props.onSelect;
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("h3", null, "Select a device to test"), /*#__PURE__*/react.createElement(SelectServiceGrid, {
    serviceClass: serviceClass,
    onSelect: onSelect
  }));
}

function ServiceTest(props) {
  var serviceSpec = props.serviceSpec,
      showStartSimulator = props.showStartSimulator,
      _props$serviceTest = props.serviceTest,
      serviceTest = _props$serviceTest === void 0 ? (0,testspec/* serviceTestFromServiceClass */.H)(serviceSpec === null || serviceSpec === void 0 ? void 0 : serviceSpec.classIdentifier) : _props$serviceTest;
  var serviceClass = serviceSpec.classIdentifier;

  var _useState = (0,react.useState)(undefined),
      service = _useState[0],
      setService = _useState[1];

  var handleSelect = function handleSelect(service) {
    return setService(service);
  }; // clear selected service when json changes


  (0,react.useEffect)(function () {
    setService(undefined);
  }, [serviceTest]); // clear service if device disconnects

  (0,react.useEffect)(function () {
    var _service$device;

    return service === null || service === void 0 ? void 0 : (_service$device = service.device) === null || _service$device === void 0 ? void 0 : _service$device.subscribe(constants/* DISCONNECT */.PYu, function () {
      setService(undefined);
    });
  }, [service]);
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("h1", null, serviceSpec.name + " tests", /*#__PURE__*/react.createElement(IconButtonWithTooltip/* default */.Z, {
    title: "go to specification",
    to: "/services/" + serviceSpec.shortId + "/"
  }, /*#__PURE__*/react.createElement(Info/* default */.Z, null))), (flags/* default.diagnostics */.Z.diagnostics || showStartSimulator) && /*#__PURE__*/react.createElement(Diagnostics, {
    serviceClass: serviceClass
  }), !service && /*#__PURE__*/react.createElement(ServiceTestRunnerSelect, {
    serviceClass: serviceClass,
    onSelect: handleSelect
  }), service && /*#__PURE__*/react.createElement(ServiceTestRunner/* default */.Z, {
    service: service,
    serviceTest: serviceTest
  }));
}

/***/ }),

/***/ 88387:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Page; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);
/* harmony import */ var gatsby_theme_material_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(36176);
/* harmony import */ var _jacdac_ts_src_jdom_spec__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13173);
/* harmony import */ var _components_test_ServiceTest__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(99202);




function Page(props) {
  var spec = (0,_jacdac_ts_src_jdom_spec__WEBPACK_IMPORTED_MODULE_2__/* .serviceSpecificationFromClassIdentifier */ .d5)(props.pageContext.node.classIdentifier);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_test_ServiceTest__WEBPACK_IMPORTED_MODULE_3__/* .default */ .Z, {
    serviceSpec: spec
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", null, "See Also"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
    href: "https://github.com/microsoft/jacdac/tree/main/services/" + props.pageContext.node.shortId + ".md"
  }, "Edit specification source"), "."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", null, "Read ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(gatsby_theme_material_ui__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "/reference/service-specification/"
  }, "Service Specification Language"), " reference"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", null, "Create a new service specification using the ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(gatsby_theme_material_ui__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "/tools/service-editor/"
  }, "Service Editor")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", null, "Using services in JavaScript with the ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(gatsby_theme_material_ui__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "/clients/javascript/jdom"
  }, "Jacdac Object Model (JDOM)"))));
}

/***/ })

}]);
//# sourceMappingURL=component---src-templates-service-test-tsx-743acff35e5a3a5f45f0.js.map