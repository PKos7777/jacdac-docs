"use strict";
(self["webpackChunkjacdac_docs"] = self["webpackChunkjacdac_docs"] || []).push([[1931,274],{

/***/ 52377:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;


var _interopRequireDefault = __webpack_require__(8580);

var _interopRequireWildcard = __webpack_require__(1022);

__webpack_unused_export__ = ({
  value: true
});
exports.Z = void 0;

var React = _interopRequireWildcard(__webpack_require__(67294));

var _createSvgIcon = _interopRequireDefault(__webpack_require__(58786));

var _default = (0, _createSvgIcon.default)( /*#__PURE__*/React.createElement("path", {
  d: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"
}), 'GetApp');

exports.Z = _default;

/***/ }),

/***/ 58504:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;


var _interopRequireDefault = __webpack_require__(8580);

var _interopRequireWildcard = __webpack_require__(1022);

__webpack_unused_export__ = ({
  value: true
});
exports.Z = void 0;

var React = _interopRequireWildcard(__webpack_require__(67294));

var _createSvgIcon = _interopRequireDefault(__webpack_require__(58786));

var _default = (0, _createSvgIcon.default)( /*#__PURE__*/React.createElement("path", {
  d: "M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
}), 'Launch');

exports.Z = _default;

/***/ }),

/***/ 50274:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ CodeBlock; }
});

// EXTERNAL MODULE: ./node_modules/gatsby/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(47895);
// EXTERNAL MODULE: ./node_modules/gatsby/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(75167);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/prism-react-renderer/dist/index.js + 2 modules
var dist = __webpack_require__(18328);
// EXTERNAL MODULE: ./node_modules/prism-react-renderer/themes/github/index.js
var github = __webpack_require__(13019);
// EXTERNAL MODULE: ./node_modules/prism-react-renderer/themes/vsDark/index.js
var vsDark = __webpack_require__(41194);
// EXTERNAL MODULE: ./src/components/ui/DarkModeContext.tsx
var DarkModeContext = __webpack_require__(91350);
// EXTERNAL MODULE: ./node_modules/gatsby-theme-material-ui/index.js
var gatsby_theme_material_ui = __webpack_require__(36176);
// EXTERNAL MODULE: ./node_modules/@material-ui/icons/GetApp.js
var GetApp = __webpack_require__(52377);
// EXTERNAL MODULE: ./node_modules/@material-ui/icons/Launch.js
var Launch = __webpack_require__(58504);
// EXTERNAL MODULE: ./src/components/ui/Tooltip.tsx
var Tooltip = __webpack_require__(60102);
// EXTERNAL MODULE: ./src/components/ui/PaperBox.tsx
var PaperBox = __webpack_require__(79739);
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Tabs/Tabs.js + 7 modules
var Tabs = __webpack_require__(44942);
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Tab/Tab.js
var Tab = __webpack_require__(342);
// EXTERNAL MODULE: ./src/components/ui/TabPanel.tsx
var TabPanel = __webpack_require__(3263);
// EXTERNAL MODULE: ./src/components/makecode/MakeCodeSnippetContext.tsx
var makecode_MakeCodeSnippetContext = __webpack_require__(54888);
// EXTERNAL MODULE: ./jacdac-ts/src/jdom/utils.ts
var utils = __webpack_require__(81794);
// EXTERNAL MODULE: ./src/components/makecode/services.ts + 1 modules
var services = __webpack_require__(21389);
;// CONCATENATED MODULE: ./src/components/hooks/useWindowEvent.ts

function useWindowEvent_useWindowEvent(type, listener, passive, deps) {
  if (passive === void 0) {
    passive = false;
  }

  useEffect(() => {
    if (typeof window === "undefined") return undefined; // SSR
    // initiate the event handler

    window.addEventListener(type, listener, passive); // this will clean up the event every time the component is re-rendered

    return () => {
      window.removeEventListener(type, listener);
    };
  }, [type, listener, passive].concat(deps || []));
}
;// CONCATENATED MODULE: ./src/components/makecode/useMakeCodeRenderer.ts





function parseMakeCodeSnippet(source) {
  var ghost;
  var code;
  var meta = {
    dependencies: []
  };

  if (/^---\n/.test(source)) {
    var _front;

    var front;
    var parts = source.replace(/^---\n/, '').split(/---\n/gm);

    switch (parts.length) {
      case 1:
        front = ghost = undefined;
        code = source;
        break;

      case 2:
        [front, code] = parts;
        break;

      default:
        [front, ghost, code] = parts;
        break;
    } // parse front matter


    (_front = front) === null || _front === void 0 ? void 0 : _front.replace(/(.+):\s*(.+)\s*\n/g, (m, name, value) => {
      switch (name) {
        case "dep":
          meta.dependencies.push(value);
          break;

        case "snippet":
          meta.snippet = !!value;
          break;

        default:
          meta[name] = value;
      }

      return "";
    });
  } else {
    code = source;
  } // sniff services


  var mkcds = (0,services/* makeCodeServices */.qs)();
  mkcds.filter(info => {
    var src = (ghost || "") + "\n" + (code || "");
    return src.indexOf(info.client.qName) > -1 || info.client.default && src.indexOf(info.client.default) > -1;
  }).map(info => info.client.name.replace(/^pxt-/, '') + "=github:" + info.client.repo).forEach(dep => meta.dependencies.push(dep)); // add jacdac by default

  if (!meta.dependencies.length) meta.dependencies.push("jacdac=github:microsoft/pxt-jacdac"); // ensure unique deps

  meta.dependencies = (0,utils/* unique */.Tw)(meta.dependencies);
  return {
    code,
    ghost,
    meta
  };
}
function useMakeCodeRenderer() {
  var {
    target,
    rendererUrl
  } = useContext(MakeCodeSnippetContext);
  var lang = "";
  var iframeId = "makecoderenderer" + target;
  var pendingRequests = useMemo(() => ({}), [target, lang]);

  var sendRequest = req => {
    var iframe = typeof document !== "undefined" && document.getElementById(iframeId);
    if (iframe !== null && iframe !== void 0 && iframe.dataset.ready) iframe === null || iframe === void 0 ? void 0 : iframe.contentWindow.postMessage(req, rendererUrl);
  };

  var render = source => {
    var {
      code,
      ghost,
      meta
    } = source;
    var {
      dependencies,
      snippet
    } = meta; // spin up iframe on demans

    if (typeof document !== "undefined" && !document.getElementById(iframeId)) {
      console.log("mkcd: loading iframe");
      var f = document.createElement("iframe");
      f.id = iframeId;
      f.style.position = "absolute";
      f.style.left = "0";
      f.style.bottom = "0";
      f.style.width = "1px";
      f.style.height = "1px";
      f.src = rendererUrl + "?render=1" + (lang ? "&lang=" + lang : '');
      document.body.appendChild(f);
    }

    var req = {
      type: "renderblocks",
      id: "r" + Math.random(),
      code,
      ghost,
      options: {
        dependencies,
        snippetMode: snippet
      }
    };
    return new Promise((resolve, reject) => {
      pendingRequests[req.id] = {
        req,
        resolve,
        reject
      };
      sendRequest(req);
    });
  }; // listen for messages


  var handleMessage = ev => {
    var msg = ev.data;
    if (msg.source != "makecode") return;

    switch (msg.type) {
      case "renderready":
        {
          console.log("mkcd: renderer ready, " + Object.keys(pendingRequests).length + " pending");
          var iframe = typeof document !== "undefined" && document.getElementById(iframeId);

          if (iframe) {
            console.log("flushing messages");
            iframe.dataset.ready = "1";
            Object.keys(pendingRequests).forEach(k => sendRequest(pendingRequests[k].req));
          }

          break;
        }

      case "renderblocks":
        {
          var id = msg.id; // this is the id you sent

          var r = pendingRequests[id];
          if (!r) return;
          delete pendingRequests[id];
          r.resolve(msg);
          break;
        }
    }
  };

  useWindowEvent("message", handleMessage, false, []);
  return {
    render
  };
}
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/makeStyles.js
var makeStyles = __webpack_require__(10920);
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/createStyles.js
var createStyles = __webpack_require__(70274);
// EXTERNAL MODULE: ./jacdac-ts/src/jdom/constants.ts
var constants = __webpack_require__(71815);
// EXTERNAL MODULE: ./src/jacdac/Context.tsx
var Context = __webpack_require__(20392);
;// CONCATENATED MODULE: ./src/components/makecode/MakeCodeSimulator.tsx






var useStyles = (0,makeStyles/* default */.Z)(() => (0,createStyles/* default */.Z)({
  root: {
    width: "100%"
  },
  root2: {
    position: "relative",
    paddingTop: "86.75%"
  },
  iframe: {
    position: "absolute",
    left: 0,
    top: 0,
    border: "none",
    width: "100%",
    height: "100%"
  }
}));
function MakeCodeSimulator(props) {
  var {
    simUrl
  } = (0,react.useContext)(makecode_MakeCodeSnippetContext/* default */.Z);
  var {
    snippet
  } = props;
  var {
    code,
    ghost,
    meta
  } = snippet;
  var {
    dependencies
  } = meta;
  var {
    bus
  } = (0,react.useContext)(Context/* default */.Z);
  var frameRef = (0,react.useRef)();
  var classes = useStyles();
  var src = (ghost || "") + "\n" + (code || "");
  var url = simUrl + "#single=1&fullscren=1&nofooter=1&deps=" + encodeURIComponent(dependencies.join(",")) + "&code=" + encodeURIComponent(src);
  var origin = new URL(url).origin;
  (0,react.useEffect)(() => bus.subscribe([constants/* PACKET_SEND */.RaS, constants/* PACKET_PROCESS */.wY8], pkt => {
    var _frameRef$current, _frameRef$current$con;

    this.packetSent++;
    var msg = {
      type: "messagepacket",
      channel: "jacdac",
      broadcast: true,
      data: pkt.toBuffer(),
      sender: pkt.sender
    };
    (_frameRef$current = frameRef.current) === null || _frameRef$current === void 0 ? void 0 : (_frameRef$current$con = _frameRef$current.contentWindow) === null || _frameRef$current$con === void 0 ? void 0 : _frameRef$current$con.postMessage(msg, origin);
  }));
  return /*#__PURE__*/react.createElement(PaperBox/* default */.Z, null, /*#__PURE__*/react.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/react.createElement("div", {
    className: classes.root2
  }, /*#__PURE__*/react.createElement("iframe", {
    ref: frameRef,
    className: classes.iframe,
    src: url,
    title: "MakeCode rendering iframe to generate blocks images."
  }))));
}
// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js
var gatsby_browser_entry = __webpack_require__(35313);
;// CONCATENATED MODULE: ./src/components/makecode/MakeCodeSnippet.tsx









function MakeCodeSnippet(props) {
  var {
    renderedSource
  } = props;
  var {
    source,
    rendered
  } = JSON.parse(renderedSource);
  var {
    height,
    width,
    url
  } = rendered || {};
  var tabs = ["blocks", "typescript", "sim"];
  var {
    editor,
    setEditor
  } = (0,react.useContext)(makecode_MakeCodeSnippetContext/* default */.Z);
  var {
    0: tab,
    1: setTab
  } = (0,react.useState)(tabs.indexOf(editor) || 0);

  var handleTabChange = (event, newValue) => {
    if (newValue < tabs.length - 1) setEditor(tabs[newValue]);
    setTab(newValue);
  };

  var snippet = (0,react.useMemo)(() => parseMakeCodeSnippet(source), [source]);
  var {
    code
  } = snippet;
  return /*#__PURE__*/react.createElement(PaperBox/* default */.Z, null, /*#__PURE__*/react.createElement(Tabs/* default */.Z, {
    value: tab,
    onChange: handleTabChange,
    "aria-label": "Select MakeCode editor"
  }, /*#__PURE__*/react.createElement(Tab/* default */.Z, {
    label: "Blocks"
  }), /*#__PURE__*/react.createElement(Tab/* default */.Z, {
    label: "JavaScript"
  }), /*#__PURE__*/react.createElement(Tab/* default */.Z, {
    label: "Simulator"
  })), /*#__PURE__*/react.createElement(TabPanel/* default */.Z, {
    value: tab,
    index: 0
  }, /*#__PURE__*/react.createElement("img", {
    src: (0,gatsby_browser_entry.withPrefix)(url),
    alt: source,
    loading: "lazy"
  })), /*#__PURE__*/react.createElement(TabPanel/* default */.Z, {
    value: tab,
    index: 1
  }, /*#__PURE__*/react.createElement(CodeBlock, {
    className: "typescript"
  }, code)), /*#__PURE__*/react.createElement(TabPanel/* default */.Z, {
    value: tab,
    index: 2
  }, /*#__PURE__*/react.createElement(MakeCodeSimulator, {
    snippet: snippet
  })));
}
// EXTERNAL MODULE: ./src/components/ui/Suspense.tsx
var Suspense = __webpack_require__(69672);
;// CONCATENATED MODULE: ./src/components/CodeBlock.tsx


var _excluded = ["children", "className"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0,defineProperty/* default */.Z)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


 // tslint:disable-next-line: no-submodule-imports match-default-export-name

 // tslint:disable-next-line: no-submodule-imports match-default-export-name



 // tslint:disable-next-line: no-submodule-imports match-default-export-name

 // tslint:disable-next-line: no-submodule-imports match-default-export-name





var TraceSnippet = /*#__PURE__*/(0,react.lazy)(() => __webpack_require__.e(/* import() */ 5599).then(__webpack_require__.bind(__webpack_require__, 15599)));
var CodeSandboxButton = /*#__PURE__*/(0,react.lazy)(() => __webpack_require__.e(/* import() */ 8574).then(__webpack_require__.bind(__webpack_require__, 18574)));

function HighlightedCode(props) {
  var {
    children,
    codeSandbox,
    className,
    downloadName,
    downloadText,
    actions,
    url
  } = props;
  var {
    darkMode
  } = (0,react.useContext)(DarkModeContext/* default */.Z);
  var language = (className === null || className === void 0 ? void 0 : className.replace(/language-/, "")) || "";
  var theme = darkMode === "dark" ? vsDark/* default */.Z : github/* default */.Z;
  var valueUri = !!downloadText && "data:application/json;charset=UTF-8," + encodeURIComponent(downloadText);
  return /*#__PURE__*/react.createElement(dist/* default */.ZP, Object.assign({}, dist/* defaultProps */.lG, {
    code: (children === null || children === void 0 ? void 0 : children.replace(/[\s\r\n]*$/g, "")) || "",
    language: language,
    theme: theme
  }), _ref => {
    var {
      className,
      style,
      tokens,
      getLineProps,
      getTokenProps
    } = _ref;
    return /*#__PURE__*/react.createElement("pre", {
      className: className,
      style: _objectSpread({}, style)
    }, !!url && /*#__PURE__*/react.createElement(gatsby_theme_material_ui.Link, {
      style: {
        float: "right"
      },
      href: url
    }, /*#__PURE__*/react.createElement(Tooltip/* default */.Z, {
      title: "Open " + url
    }, /*#__PURE__*/react.createElement(gatsby_theme_material_ui.IconButton, null, /*#__PURE__*/react.createElement(Launch/* default */.Z, null)))), !!downloadText && /*#__PURE__*/react.createElement(gatsby_theme_material_ui.Link, {
      style: {
        float: "right"
      },
      href: valueUri,
      download: downloadName || "download"
    }, /*#__PURE__*/react.createElement(Tooltip/* default */.Z, {
      title: "Download"
    }, /*#__PURE__*/react.createElement(gatsby_theme_material_ui.IconButton, null, /*#__PURE__*/react.createElement(GetApp/* default */.Z, null)))), codeSandbox && /*#__PURE__*/react.createElement("div", {
      style: {
        float: "right"
      }
    }, /*#__PURE__*/react.createElement(Suspense/* default */.Z, null, /*#__PURE__*/react.createElement(CodeSandboxButton, {
      source: codeSandbox
    }))), actions && /*#__PURE__*/react.createElement("div", {
      style: {
        float: "right"
      }
    }, actions), tokens === null || tokens === void 0 ? void 0 : tokens.map((line, index) => {
      var lineProps = getLineProps({
        line,
        key: index
      });
      return /*#__PURE__*/react.createElement("div", Object.assign({
        key: index
      }, lineProps), line.map((token, key) => /*#__PURE__*/react.createElement("span", Object.assign({
        key: key
      }, getTokenProps({
        token,
        key
      })))));
    }));
  });
}

function CodeBlock(props) {
  var {
    children,
    className
  } = props,
      rest = (0,objectWithoutProperties/* default */.Z)(props, _excluded);

  var language = (className === null || className === void 0 ? void 0 : className.replace(/language-/, "")) || "";

  switch (language) {
    case "trace":
      return /*#__PURE__*/react.createElement(Suspense/* default */.Z, null, /*#__PURE__*/react.createElement(TraceSnippet, {
        source: children
      }));

    case "blocks":
      return /*#__PURE__*/react.createElement(MakeCodeSnippet, {
        renderedSource: children
      });

    case "vanilla":
      {
        var [source, js, html] = children.split(/\n-{5,}\n/gi);
        return /*#__PURE__*/react.createElement(HighlightedCode, Object.assign({}, rest, {
          className: "javascript",
          codeSandbox: {
            js,
            html
          }
        }), source);
      }

    default:
      return /*#__PURE__*/react.createElement(HighlightedCode, props);
  }
}

/***/ }),

/***/ 31931:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ DashboardAzureIoTHubHealth; }
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Grid/Grid.js
var Grid = __webpack_require__(80838);
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Typography/Typography.js
var Typography = __webpack_require__(80453);
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Switch/Switch.js
var Switch = __webpack_require__(6210);
// EXTERNAL MODULE: ./src/jacdac/useChange.ts
var useChange = __webpack_require__(54774);
;// CONCATENATED MODULE: ./src/jacdac/useServiceClient.ts

function useServiceClient(service, factory) {
  var {
    0: client,
    1: setClient
  } = (0,react.useState)(undefined);
  (0,react.useEffect)(() => {
    var c = service && factory(service);
    setClient(c);
    return () => c === null || c === void 0 ? void 0 : c.unmount();
  }, [service, factory]);
  return client;
}
// EXTERNAL MODULE: ./node_modules/gatsby/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(73108);
// EXTERNAL MODULE: ./node_modules/gatsby/node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(53719);
// EXTERNAL MODULE: ./node_modules/gatsby/node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
var inheritsLoose = __webpack_require__(85413);
// EXTERNAL MODULE: ./jacdac-ts/src/jdom/constants.ts
var constants = __webpack_require__(71815);
// EXTERNAL MODULE: ./jacdac-ts/src/jdom/pack.ts
var pack = __webpack_require__(91635);
// EXTERNAL MODULE: ./jacdac-ts/src/jdom/serviceclient.ts
var serviceclient = __webpack_require__(56763);
// EXTERNAL MODULE: ./jacdac-ts/src/jdom/utils.ts
var utils = __webpack_require__(81794);
;// CONCATENATED MODULE: ./jacdac-ts/src/clients/azureiothubhealthclient.ts







var AzureIoTHubHealthClient = /*#__PURE__*/function (_JDServiceClient) {
  (0,inheritsLoose/* default */.Z)(AzureIoTHubHealthClient, _JDServiceClient);

  function AzureIoTHubHealthClient(service) {
    var _this;

    _this = _JDServiceClient.call(this, service) || this;
    (0,utils/* assert */.hu)(service.serviceClass === constants/* SRV_AZURE_IOT_HUB_HEALTH */.tOR); // tell the bus to refresh these register

    _this.hubNameRegister = _this.service.register(constants/* AzureIotHubHealthReg.HubName */.q7s.HubName);
    _this.connectionStatusRegister = _this.service.register(constants/* AzureIotHubHealthReg.ConnectionStatus */.q7s.ConnectionStatus);
    _this.statisticsRegister = _this.service.register(constants/* AzureIotHubHealthReg.Statistics */.q7s.Statistics);

    _this.mount(() => _this.hubNameRegister.subscribe(constants/* REPORT_UPDATE */.rGZ, () => _this.emit(constants/* CHANGE */.Ver)));

    _this.mount(() => _this.connectionStatusRegister.subscribe(constants/* REPORT_UPDATE */.rGZ, () => _this.emit(constants/* CHANGE */.Ver)));

    _this.mount(() => _this.statisticsRegister.subscribe(constants/* REPORT_UPDATE */.rGZ, () => _this.emit(constants/* CHANGE */.Ver)));

    _this.mount(() => _this.service.event(constants/* AzureIotHubHealthEvent.TwinChange */.qqS.TwinChange).on(constants/* EVENT */.Ks0, () => _this.emit(constants/* CHANGE */.Ver)));

    _this.mount(() => _this.service.event(constants/* AzureIotHubHealthEvent.ConnectionStatusChange */.qqS.ConnectionStatusChange).on(constants/* EVENT */.Ks0, () => _this.connectionStatusRegister.refresh()));

    return _this;
  }

  var _proto = AzureIoTHubHealthClient.prototype;

  /**
   * Sends a connect command to the hub
   */
  _proto.connect =
  /*#__PURE__*/
  function () {
    var _connect = (0,asyncToGenerator/* default */.Z)(function* () {
      yield this.service.sendCmdAsync(constants/* AzureIotHubHealthCmd.Connect */.FhJ.Connect, undefined, true);
    });

    function connect() {
      return _connect.apply(this, arguments);
    }

    return connect;
  }()
  /**
   * Sends a disconnect command to the hub
   */
  ;

  _proto.disconnect =
  /*#__PURE__*/
  function () {
    var _disconnect = (0,asyncToGenerator/* default */.Z)(function* () {
      yield this.service.sendCmdAsync(constants/* AzureIotHubHealthCmd.Disconnect */.FhJ.Disconnect, undefined, true);
    });

    function disconnect() {
      return _disconnect.apply(this, arguments);
    }

    return disconnect;
  }()
  /**
   * Sends a ping command with a given value. The Azure IoT Hub will send ping message to the hub with that value in the payload.
   * @param value
   */
  ;

  _proto.ping =
  /*#__PURE__*/
  function () {
    var _ping = (0,asyncToGenerator/* default */.Z)(function* (value) {
      var data = (0,pack/* jdpack */.AV)("u32", [value]);
      yield this.service.sendCmdAsync(constants/* AzureIotHubHealthCmd.Ping */.FhJ.Ping, data, true);
    });

    function ping(_x) {
      return _ping.apply(this, arguments);
    }

    return ping;
  }()
  /**
   * Queries the service for the current twin content
   * @returns
   */
  ;

  _proto.twin =
  /*#__PURE__*/
  function () {
    var _twin = (0,asyncToGenerator/* default */.Z)(function* () {
      var [content] = yield this.service.receiveWithInPipe(constants/* AzureIotHubHealthCmd.Twin */.FhJ.Twin, "s");
      return content === null || content === void 0 ? void 0 : content.join();
    });

    function twin() {
      return _twin.apply(this, arguments);
    }

    return twin;
  }()
  /**
   * Sends a new connection string to the iot debice
   * @param connectionString
   */
  ;

  _proto.setConnectionString =
  /*#__PURE__*/
  function () {
    var _setConnectionString = (0,asyncToGenerator/* default */.Z)(function* (connectionString) {
      var data = (0,pack/* jdpack */.AV)("s", [connectionString || ""]);
      yield this.service.sendCmdAsync(constants/* AzureIotHubHealthCmd.SetConnectionString */.FhJ.SetConnectionString, data, true);
    });

    function setConnectionString(_x2) {
      return _setConnectionString.apply(this, arguments);
    }

    return setConnectionString;
  }();

  (0,createClass/* default */.Z)(AzureIoTHubHealthClient, [{
    key: "hubName",
    get: function get() {
      return this.hubNameRegister.stringValue;
    }
  }, {
    key: "connectionStatus",
    get: function get() {
      var _reg$unpackedValue;

      var reg = this.connectionStatusRegister;
      return (_reg$unpackedValue = reg.unpackedValue) === null || _reg$unpackedValue === void 0 ? void 0 : _reg$unpackedValue[0];
    }
  }, {
    key: "statistics",
    get: function get() {
      var [reading, event, twinReported, twinDesired] = this.statisticsRegister.unpackedValue;
      return {
        reading,
        event,
        twinReported,
        twinDesired
      };
    }
  }]);

  return AzureIoTHubHealthClient;
}(serviceclient/* JDServiceClient */.P);
/* harmony default export */ var azureiothubhealthclient = (AzureIoTHubHealthClient);
// EXTERNAL MODULE: ./src/components/widgets/useWidgetTheme.ts
var useWidgetTheme = __webpack_require__(60650);
// EXTERNAL MODULE: ./jacdac-ts/jacdac-spec/dist/specconstants.ts
var specconstants = __webpack_require__(73512);
// EXTERNAL MODULE: ./node_modules/react-use-id-hook/dist/react-use-id-hook.esm.js
var react_use_id_hook_esm = __webpack_require__(19640);
// EXTERNAL MODULE: ./src/components/ui/Snippet.tsx
var Snippet = __webpack_require__(34276);
;// CONCATENATED MODULE: ./src/components/dashboard/DashboardAzureIoTHubHealth.tsx









function DashboardAzureIoTHubHealth(props) {
  var {
    service
  } = props;
  var connectId = (0,react_use_id_hook_esm/* useId */.Me)();
  var factory = (0,react.useCallback)(srv => new azureiothubhealthclient(srv), []);
  var client = useServiceClient(service, factory);
  var hubName = (0,useChange/* default */.Z)(client, _ => _ === null || _ === void 0 ? void 0 : _.hubName);
  var connectionStatus = (0,useChange/* default */.Z)(client, _ => _ === null || _ === void 0 ? void 0 : _.connectionStatus);
  var color = "primary";
  var {
    textPrimary
  } = (0,useWidgetTheme/* default */.Z)(color);
  var connected = connectionStatus === specconstants/* AzureIotHubHealthConnectionStatus.Connected */.gaB.Connected;
  var twin = (0,useChange/* useChangeAsync */.R)(client, _ => _ === null || _ === void 0 ? void 0 : _.twin());
  return /*#__PURE__*/react.createElement(Grid/* default */.Z, {
    container: true,
    spacing: 1,
    style: {
      color: textPrimary,
      minWidth: "16rem"
    }
  }, /*#__PURE__*/react.createElement(Grid/* default */.Z, {
    item: true,
    xs: 12
  }, /*#__PURE__*/react.createElement(Typography/* default */.Z, {
    component: "span",
    variant: "subtitle1"
  }, "hub: ", hubName), /*#__PURE__*/react.createElement(Switch/* default */.Z, {
    checked: connected,
    "aria-labelledby": connectId
  }), /*#__PURE__*/react.createElement("label", {
    className: ".no-pointer-events",
    id: connectId
  }, specconstants/* AzureIotHubHealthConnectionStatus */.gaB[connectionStatus])), twin && /*#__PURE__*/react.createElement(Grid/* default */.Z, {
    item: true,
    xs: 12
  }, /*#__PURE__*/react.createElement(Snippet/* default */.Z, {
    mode: "json",
    value: twin
  })));
}

/***/ }),

/***/ 79739:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": function() { return /* binding */ PaperBox; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(47895);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(59355);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(33287);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(58063);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);

var _excluded = ["children", "padding", "elevation", "bgcolor"];


function PaperBox(props) {
  var {
    children,
    padding,
    elevation,
    bgcolor
  } = props,
      others = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z)(props, _excluded);

  var theme = (0,_material_ui_core__WEBPACK_IMPORTED_MODULE_2__/* .default */ .Z)();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__/* .default */ .Z, Object.assign({}, others, {
    bgcolor: bgcolor,
    mb: theme.spacing(0.25)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__/* .default */ .Z, {
    square: true,
    elevation: elevation
  }, padding !== 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__/* .default */ .Z, {
    p: theme.spacing(padding || 0.25)
  }, children), padding === 0 && children));
}

/***/ }),

/***/ 34276:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": function() { return /* binding */ Snippet; }
/* harmony export */ });
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(80453);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);
/* harmony import */ var _CodeBlock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(50274);



function Snippet(props) {
  var {
    value,
    mode,
    download,
    url,
    caption,
    actions
  } = props;
  var v = typeof value === "function" ? value() : value;
  var className = mode && "language-" + (mode === "sts" ? "ts" : mode);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_CodeBlock__WEBPACK_IMPORTED_MODULE_1__.default, {
    className: className,
    downloadName: download,
    downloadText: download && v,
    actions: actions,
    url: url
  }, v), caption && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__/* .default */ .Z, {
    variant: "caption"
  }, caption));
}

/***/ })

}]);
//# sourceMappingURL=1931-a8094a012a8190fc92f7.js.map