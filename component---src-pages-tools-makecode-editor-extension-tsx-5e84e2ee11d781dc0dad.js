(self["webpackChunkjacdac_docs"] = self["webpackChunkjacdac_docs"] || []).push([[6456],{

/***/ 88880:
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
  d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
}), 'Add');

exports.Z = _default;

/***/ }),

/***/ 94500:
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
  d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
}), 'Delete');

exports.Z = _default;

/***/ }),

/***/ 8567:
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
  d: "M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"
}), 'Save');

exports.Z = _default;

/***/ }),

/***/ 2864:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LM": function() { return /* binding */ DTDL_CONTEXT; },
/* harmony export */   "Jg": function() { return /* binding */ escapeName; },
/* harmony export */   "xA": function() { return /* binding */ serviceSpecificationToComponent; },
/* harmony export */   "__": function() { return /* binding */ deviceSpecificationToDTDL; }
/* harmony export */ });
/* unused harmony exports DTDL_REFERENCE_URL, DTDL_NAME, serviceSpecificationToDTDL, serviceSpecificationDTMI, deviceSpecificationDTMI, DTMIToRoute */
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(85061);
/* harmony import */ var _jdom_spec__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13173);
/* harmony import */ var _jdom_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(81794);


/* eslint-disable @typescript-eslint/no-explicit-any */

/***
 * Jacdac service/device specification to DTDL
 *
 *  DTDL specification: https://github.com/Azure/opendigitaltwins-dtdl/blob/master/DTDL/v2/dtdlv2.md.
 */


var DTDL_REFERENCE_URL = "https://github.com/Azure/opendigitaltwins-dtdl/blob/master/DTDL/v2/dtdlv2.md";
var DTDL_NAME = "Digital Twins Definition Language";
var DTDL_CONTEXT = "dtmi:dtdl:context;2"; // https://github.com/Azure/digital-twin-model-identifier
// ^dtmi:(?:_+[A-Za-z0-9]|[A-Za-z])(?:[A-Za-z0-9_]*[A-Za-z0-9])?(?::(?:_+[A-Za-z0-9]|[A-Za-z])(?:[A-Za-z0-9_]*[A-Za-z0-9])?)*;[1-9][0-9]{0,8}$

function toDTMI(segments, version) {
  return ("dtmi:jacdac:" + (0,_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__/* .default */ .Z)(segments).map(function (seg) {
    return seg === undefined ? "???" : typeof seg === "string" ? seg : "x" + seg.toString(16);
  }).map(function (seg) {
    return seg.replace(/(-|_)/g, "");
  }).join(":") + ";" + (version !== undefined ? version : 1)).toLowerCase();
}

function toUnit(pkt) {
  if (pkt.fields.length !== 1) return undefined;
  var field = pkt.fields[0];
  if (!field.unit) return undefined;
  /**
   *     type Unit = "m" | "kg" | "g" | "s" | "A" | "K" | "cd" | "mol" | "Hz" | "rad" | "sr" | "N" | "Pa" | "J" | "W" | "C" | "V" | "F" | "Ohm"
      | "S" | "Wb" | "T" | "H" | "Cel" | "lm" | "lx" | "Bq" | "Gy" | "Sv" | "kat" | "m2" | "m3" | "l" | "m/s" | "m/s2" | "m3/s" | "l/s"
      | "W/m2" | "cd/m2" | "bit" | "bit/s" | "lat" | "lon" | "pH" | "dB" | "dBW" | "Bspl" | "count" | "/" | "%RH" | "%EL" | "EL"
      | "1/s" | "1/min" | "beat/min" | "beats" | "S/m" | "B" | "VA" | "VAs" | "var" | "vars" | "J/m" | "kg/m3" | "deg";
   type SecondaryUnit = "ms" | "min" | "h" | "MHz" | "kW" | "kVA" | "kvar" | "Ah" | "Wh" | "kWh"
      | "varh" | "kvarh" | "kVAh" | "Wh/km" | "KiB" | "GB" | "Mbit/s" | "B/s" | "MB/s" | "mV" | "mA" | "dBm" | "ug/m3"
      | "mm/h" | "m/h" | "ppm" | "/100" | "/1000" | "hPa" | "mm" | "cm" | "km" | "km/h";
   */

  var units = {
    "m/s2": {
      semantic: "Acceleration",
      unit: "metrePerSecondSquared"
    },
    rad: {
      semantic: "Angle",
      unit: "radian"
    },
    "rad/s": {
      semantic: "AngularVelocity",
      unit: "radianPerSecond"
    },
    "rad/s2": {
      semantic: "AngularAcceleration",
      unit: "radianPerSecondSquared"
    },
    m: {
      semantic: "Length",
      unit: "metre"
    },
    m2: {
      semantic: "Area",
      unit: "squareMetre"
    },
    s: {
      semantic: "TimeSpan",
      unit: "second"
    },
    ms: {
      semantic: "TimeSpan",
      unit: "millisecond"
    },
    us: {
      semantic: "TimeSpan",
      unit: "microsecond"
    },
    K: {
      semantic: "Temperature",
      unit: "kelvin"
    },
    C: {
      semantic: "Temperature",
      unit: "degreeCelsius"
    },
    F: {
      semantic: "Temperature",
      unit: "degreeFahrenheit"
    },
    g: {
      semantic: "Acceleration",
      unit: "gForce"
    },
    mA: {
      semantic: "Current",
      unit: "milliampere"
    },
    uA: {
      semantic: "Current",
      unit: "microampere"
    },
    A: {
      semantic: "Current",
      unit: "ampere"
    },
    mV: {
      semantic: "Voltage",
      unit: "millivolt"
    },
    uV: {
      semantic: "Voltage",
      unit: "microvolt"
    },
    V: {
      semantic: "Voltage",
      unit: "volt"
    }
  };
  var unit = units[field.unit];
  if (unit) return unit; // ignoring some known units

  if (["#", "/"].indexOf(field.unit) > -1) return undefined; //console.warn(`unsupported unit ${field.unit}`)

  return undefined;
} // https://github.com/Azure/opendigitaltwins-dtdl/blob/master/DTDL/v2/dtdlv2.md#primitive-schemas


function enumDTDI(srv, en) {
  return toDTMI([srv.classIdentifier, en.name]);
}

function enumSchema(srv, en) {
  var dtdl = {
    "@type": "Enum",
    "@id": enumDTDI(srv, en),
    valueSchema: "integer",
    enumValues: Object.keys(en.members).map(function (k) {
      return {
        name: escapeName(k),
        displayName: k,
        enumValue: en.members[k]
      };
    })
  };
  return dtdl;
}

function fieldType(srv, pkt, field) {
  var type;
  if (field.type == "bool") type = "boolean";else if (field.isFloat) type = "float";else if (field.isSimpleType) {
    if (/^(u|i)/.test(field.type)) type = "integer";else if (field.type === "B") // base64 encoded binary data
      type = "string";
  } else if (field.type === "string" || field.type == "string0") type = "string";else if (field.shift && /^(u|i)/.test(field.type)) type = "float"; // decimal type
  else {
      var en = srv.enums[field.type];
      if (en) type = enumDTDI(srv, en);
    } //if (!type)
  //    console.warn(`unknown field type ${field.type}`, field)

  return {
    name: field.name == "_" ? pkt.name : field.name,
    type: type
  };
} // warps fields into an object


function objectSchema(schemas) {
  return {
    "@type": "Object",
    fields: schemas
  };
} // wraps a schema into an array


function arraySchema(schema) {
  return {
    "@type": "Array",
    elementSchema: schema
  };
} // converts JADAC pkt data layout into a DTDL schema


function toSchema(srv, pkt, supportsArray) {
  var fields = pkt.fields.map(function (field) {
    return fieldType(srv, pkt, field);
  });
  if (!fields.length) return undefined; // a single data entry

  if (fields.length === 1 && !pkt.fields[0].startRepeats) return fields[0].type; // map fields into schema

  var schemas = fields.map(function (field) {
    return {
      name: field.name,
      schema: field.type
    };
  }); // is there an array?

  var repeatIndex = pkt.fields.findIndex(function (field) {
    return field.startRepeats;
  });

  if (repeatIndex < 0) {
    // no array
    // wrap schemas into an object
    return objectSchema(schemas);
  } // check if arrays are supported


  if (!supportsArray) {
    //console.warn(`arrays not supported in ${srv.shortName}.${pkt.name}`)
    return undefined;
  }

  if (repeatIndex == 0) {
    // the whole structure is an array
    return arraySchema(objectSchema(schemas));
  } else {
    // split fields into prelude and array data
    var nonRepeat = schemas.slice(0, repeatIndex);
    var repeats = schemas.slice(repeatIndex);
    return objectSchema([].concat((0,_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__/* .default */ .Z)(nonRepeat), [{
      name: "repeat",
      schema: arraySchema(repeats.length > 1 ? objectSchema(repeats) : repeats[0])
    }]));
  }
}

function packetToDTDL(srv, pkt) {
  var types = {
    const: "Property",
    rw: "Property",
    ro: "Telemetry",
    event: "Telemetry"
  }; // eslint-disable-next-line @typescript-eslint/no-explicit-any

  var dtdl = {
    "@type": types[pkt.kind] || "Unsupported" + pkt.kind,
    name: pkt.name,
    "@id": toDTMI([srv.classIdentifier, pkt.kind, pkt.name]),
    description: pkt.description
  };

  switch (pkt.kind) {
    case "report":
    case "command":
      // https://docs.microsoft.com/en-us/azure/digital-twins/concepts-models#azure-digital-twins-dtdl-implementation-specifics
      return undefined;

    case "const":
    case "rw":
    case "ro":
    case "event":
      {
        var unit = toUnit(pkt);

        if (unit) {
          dtdl.unit = unit.unit;
        }

        dtdl.schema = toSchema(srv, pkt, false);
        if (pkt.kind === "rw") dtdl.writable = true;

        if (!dtdl.schema && pkt.kind === "event") {
          // keep a count of the events
          dtdl["@type"] = [dtdl["@type"], "Event"];
          dtdl.schema = toDTMI([srv.classIdentifier, "event"]);
        } else if (unit && unit.semantic) dtdl["@type"] = [dtdl["@type"], unit.semantic];

        break;
      }

    default:
      //console.log(`unknown packet kind ${pkt.kind}`)
      break;
  }

  if (!dtdl.schema) {
    //console.log(`unknown schema for ${srv.name}.${pkt.name}`);
    return undefined;
  }

  return dtdl;
}

function escapeName(name) {
  name = name.trim().replace(/[^a-zA-Z0-9_]/g, "_");
  if (!/^[a-zA-Z]/.test(name)) name = "a" + name;
  name = name[0].toLowerCase() + name.slice(1);
  return name.slice(0, 64);
}

function escapeDisplayName(name) {
  return name.slice(0, 64);
}

function serviceSpecificationToDTDL(srv) {
  var dtdl = {
    "@type": "Interface",
    "@id": serviceSpecificationDTMI(srv),
    displayName: escapeDisplayName(srv.name),
    description: srv.notes["short"],
    contents: srv.packets.filter(function (pkt) {
      return !pkt.derived && !pkt.internal;
    }).map(function (pkt) {
      try {
        return packetToDTDL(srv, pkt);
      } catch (e) {
        console.log("failed to generate DTDL for " + srv.name, e);
        return undefined;
      }
    }).filter(function (c) {
      return !!c;
    })
  };
  if (srv.extends.length) dtdl.extends = srv.extends.map(function (id) {
    return serviceSpecificationDTMI((0,_jdom_spec__WEBPACK_IMPORTED_MODULE_0__/* .serviceSpecificationFromName */ .kB)(id));
  });
  var hasEvents = srv.packets.find(function (pkt) {
    return pkt.kind === "event";
  });
  var hasEnums = Object.keys(srv.enums).length;

  if (hasEvents || hasEnums) {
    dtdl.schemas = [];
    if (hasEvents) dtdl.schemas.push({
      "@id": toDTMI([srv.classIdentifier, "event"]),
      "@type": "Object",
      fields: [{
        name: "count",
        schema: "integer"
      }]
    });
    if (hasEnums) dtdl.schemas = dtdl.schemas.concat(Object.keys(srv.enums).map(function (en) {
      return enumSchema(srv, srv.enums[en]);
    }));
  }

  dtdl["@context"] = DTDL_CONTEXT;
  return dtdl;
}
function serviceSpecificationToComponent(srv, name) {
  var dtdl = {
    "@type": "Component",
    name: name,
    displayName: escapeDisplayName(srv.name),
    schema: serviceSpecificationDTMI(srv)
  };
  return dtdl;
}
function serviceSpecificationDTMI(srv) {
  return toDTMI(["services", srv.classIdentifier]);
}
function deviceSpecificationDTMI(dev) {
  return toDTMI(["devices", dev.id.replace(/-/g, ":")]);
}
function DTMIToRoute(dtmi) {
  var route = dtmi.toLowerCase().replace(/;/, "-").replace(/:/g, "/") + ".json";
  return route;
}
function deviceSpecificationToDTDL(dev, options) {
  var services = dev.services.map(function (srv) {
    return (0,_jdom_spec__WEBPACK_IMPORTED_MODULE_0__/* .serviceSpecificationFromClassIdentifier */ .d5)(srv);
  });
  var uniqueServices = (0,_jdom_utils__WEBPACK_IMPORTED_MODULE_1__/* .uniqueMap */ .EM)(services, function (srv) {
    return srv.classIdentifier.toString();
  }, function (srv) {
    return srv;
  });
  var schemas = uniqueServices.map(function (srv) {
    return serviceSpecificationToDTDL(srv);
  }); // allocate names

  var names = [];
  services.forEach(function (srv) {
    var name = escapeName(srv.shortId || srv.shortName);
    if (names.indexOf(name) < 0) names.push(name);else {
      var count = 2;

      while (names.indexOf(name + count) > -1) {
        count++;
      }

      names.push(name + count);
    }
  });
  var dtdl = {
    "@type": "Interface",
    "@id": deviceSpecificationDTMI(dev),
    displayName: escapeDisplayName(dev.name),
    description: dev.description,
    contents: services.map(function (srv, i) {
      return serviceSpecificationToComponent(srv, names[i]);
    }),
    "@context": DTDL_CONTEXT
  };
  if (options !== null && options !== void 0 && options.inlineServices) return [dtdl].concat((0,_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__/* .default */ .Z)(schemas));else return dtdl;
}

/***/ }),

/***/ 27498:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": function() { return /* binding */ AddServiceIconButton; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(45650);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(65541);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(80453);
/* harmony import */ var _jacdac_ts_src_jdom_spec__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13173);
/* harmony import */ var _material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(88880);
/* harmony import */ var _ui_IconButtonWithTooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(79885);
/* harmony import */ var react_use_id_hook__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19640);


 // tslint:disable-next-line: match-default-export-name no-submodule-imports

 // tslint:disable-next-line: match-default-export-name no-submodule-imports



function AddServiceIconButton(props) {
  var error = props.error,
      onAdd = props.onAdd,
      children = props.children,
      serviceFilter = props.serviceFilter;

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
      servicesAnchorEl = _React$useState[0],
      setServicesAnchorEl = _React$useState[1];

  var servicesMenuId = (0,react_use_id_hook__WEBPACK_IMPORTED_MODULE_3__/* .useId */ .Me)();
  var services = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return (0,_jacdac_ts_src_jdom_spec__WEBPACK_IMPORTED_MODULE_1__/* .serviceSpecifications */ .Le)().filter(function (srv) {
      return !(0,_jacdac_ts_src_jdom_spec__WEBPACK_IMPORTED_MODULE_1__/* .isInfrastructure */ .lz)(srv);
    }).filter(function (srv) {
      return !serviceFilter || serviceFilter(srv);
    });
  }, [serviceFilter]);

  var handleServiceAddClick = function handleServiceAddClick(event) {
    setServicesAnchorEl(event.currentTarget);
  };

  var handleServiceAddClose = function handleServiceAddClose(id) {
    return function () {
      setServicesAnchorEl(null);

      if (id !== undefined) {
        var srv = (0,_jacdac_ts_src_jdom_spec__WEBPACK_IMPORTED_MODULE_1__/* .serviceSpecificationFromClassIdentifier */ .d5)(id);
        onAdd(srv);
      }
    };
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui_IconButtonWithTooltip__WEBPACK_IMPORTED_MODULE_2__/* .default */ .Z, {
    title: "Add a service",
    "aria-controls": servicesMenuId,
    "aria-haspopup": "true",
    onClick: handleServiceAddClick
  }, children || /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_4__/* .default */ .Z, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__/* .default */ .Z, {
    id: servicesMenuId,
    anchorEl: servicesAnchorEl,
    keepMounted: true,
    open: Boolean(servicesAnchorEl),
    onClose: handleServiceAddClose(undefined)
  }, services.map(function (srv) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__/* .default */ .Z, {
      key: srv.classIdentifier,
      value: srv.classIdentifier.toString(16),
      onClick: handleServiceAddClose(srv.classIdentifier)
    }, srv.name);
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__/* .default */ .Z, {
    variant: "caption",
    color: error ? "error" : "inherit",
    component: "div"
  }, error || "Select one or more services."));
}

/***/ }),

/***/ 14247:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": function() { return /* binding */ ServiceSpecificationSelect; }
/* harmony export */ });
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10920);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(70274);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1059);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(65541);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);
/* harmony import */ var _jacdac_ts_src_jdom_spec__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13173);



var useStyles = (0,_material_ui_core__WEBPACK_IMPORTED_MODULE_2__/* .default */ .Z)(function () {
  return (0,_material_ui_core__WEBPACK_IMPORTED_MODULE_3__/* .default */ .Z)({
    root: {
      minWidth: "18rem"
    }
  });
});
function ServiceSpecificationSelect(props) {
  var label = props.label,
      serviceClass = props.serviceClass,
      setServiceClass = props.setServiceClass,
      variant = props.variant,
      fullWidth = props.fullWidth,
      error = props.error;

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('select-' + Math.random()),
      labelId = _useState[0];

  var classes = useStyles();
  var specs = (0,_jacdac_ts_src_jdom_spec__WEBPACK_IMPORTED_MODULE_1__/* .serviceSpecifications */ .Le)().filter(function (spec) {
    return !/^_/.test(spec.shortId);
  });

  var handleChange = function handleChange(event) {
    return setServiceClass(parseInt(event.target.value));
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__/* .default */ .Z, {
    id: labelId,
    className: classes.root,
    label: label,
    error: !!error,
    helperText: error,
    value: serviceClass,
    select: true,
    variant: variant,
    fullWidth: fullWidth,
    onChange: handleChange
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__/* .default */ .Z, {
    key: "none",
    value: "NaN"
  }, "No service selected"), specs.map(function (spec) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__/* .default */ .Z, {
      key: spec.classIdentifier,
      value: spec.classIdentifier
    }, spec.name);
  }));
}

/***/ }),

/***/ 79739:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": function() { return /* binding */ PaperBox; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19756);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(59355);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8266);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(58063);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);



function PaperBox(props) {
  var children = props.children,
      padding = props.padding,
      elevation = props.elevation,
      bgcolor = props.bgcolor,
      others = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z)(props, ["children", "padding", "elevation", "bgcolor"]);

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

/***/ 25900:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ MakeCodeEditorExtensionPage; }
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/createStyles.js
var createStyles = __webpack_require__(70274);
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/createMuiTheme.js + 14 modules
var createMuiTheme = __webpack_require__(81864);
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/responsiveFontSizes.js + 1 modules
var responsiveFontSizes = __webpack_require__(23581);
// EXTERNAL MODULE: ./src/components/ui/ThemedLayout.tsx + 1 modules
var ThemedLayout = __webpack_require__(25463);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(92137);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(87757);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Grid/Grid.js
var Grid = __webpack_require__(80838);
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/TextField/TextField.js
var TextField = __webpack_require__(1059);
// EXTERNAL MODULE: ./jacdac-ts/src/jdom/utils.ts
var utils = __webpack_require__(81794);
// EXTERNAL MODULE: ./src/jacdac/useChange.ts
var useChange = __webpack_require__(54774);
// EXTERNAL MODULE: ./node_modules/@material-ui/icons/Delete.js
var Delete = __webpack_require__(94500);
// EXTERNAL MODULE: ./jacdac-ts/src/jdom/spec.ts + 2 modules
var spec = __webpack_require__(13173);
// EXTERNAL MODULE: ./src/components/AddServiceIconButton.tsx
var AddServiceIconButton = __webpack_require__(27498);
// EXTERNAL MODULE: ./src/components/ServiceSpecificationSelect.tsx
var ServiceSpecificationSelect = __webpack_require__(14247);
// EXTERNAL MODULE: ./jacdac-ts/src/azure-iot/dtdl.ts
var dtdl = __webpack_require__(2864);
// EXTERNAL MODULE: ./src/components/ui/IconButtonWithTooltip.tsx + 1 modules
var IconButtonWithTooltip = __webpack_require__(79885);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(5991);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(63349);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
var inheritsLoose = __webpack_require__(41788);
// EXTERNAL MODULE: ./jacdac-ts/src/jdom/client.ts
var client = __webpack_require__(47235);
// EXTERNAL MODULE: ./jacdac-ts/src/jdom/constants.ts
var constants = __webpack_require__(71815);
// EXTERNAL MODULE: ./jacdac-ts/src/jdom/iframeclient.ts
var iframeclient = __webpack_require__(9809);
// EXTERNAL MODULE: ./jacdac-ts/src/jdom/packet.ts
var packet = __webpack_require__(57683);
// EXTERNAL MODULE: ./src/jacdac/Context.tsx
var Context = __webpack_require__(20392);
;// CONCATENATED MODULE: ./src/components/makecode/MakeCodeEditorExtensionClient.ts





function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }








var READ = "read";
var MESSAGE_PACKET = "messagepacket";
var HIDDEN = "hidden";
var SHOWN = "shown";
var SENDER = "jacdac-editor-extension";
var MakeCodeEditorExtensionClient = /*#__PURE__*/function (_JDClient) {
  (0,inheritsLoose/* default */.Z)(MakeCodeEditorExtensionClient, _JDClient);

  // full apptarget
  function MakeCodeEditorExtensionClient() {
    var _this;

    _this = _JDClient.call(this) || this;
    _this.pendingCommands = {};
    _this.extensionId = (0,iframeclient/* inIFrame */.H)() ? window.location.hash.substr(1) : undefined;
    _this._connected = false;
    _this._visible = false;
    _this.nextRequestId = 1;
    _this.handleMessage = _this.handleMessage.bind((0,assertThisInitialized/* default */.Z)(_this));

    if (typeof window !== "undefined") {
      window.addEventListener("message", _this.handleMessage, false);

      _this.mount(function () {
        return window.removeEventListener("message", _this.handleMessage);
      });
    } // always refresh on load


    _this.on(SHOWN, function () {
      return _this.refresh();
    }); // notify parent that we're ready


    _this.init();

    return _this;
  }

  var _proto = MakeCodeEditorExtensionClient.prototype;

  _proto.setVisible = function setVisible(vis) {
    if (this._visible !== vis) {
      this._visible = vis;
      this.emit(constants/* CHANGE */.Ver);
    }
  };

  _proto.mkRequest = function mkRequest(resolve, reject, action, body) {
    var id = "jd_" + this.nextRequestId++;
    this.pendingCommands[id] = {
      action: action,
      resolve: resolve,
      reject: reject
    };
    return {
      type: "pxtpkgext",
      action: action,
      extId: this.extensionId,
      response: true,
      id: id,
      body: body
    };
  };

  _proto.sendRequest = function sendRequest(action, body) {
    var _this2 = this;

    this.log("send " + action);
    if (!this.extensionId) return Promise.resolve(undefined);
    return new Promise(function (resolve, reject) {
      var msg = _this2.mkRequest(resolve, reject, action, body);

      window.parent.postMessage(msg, "*");
    });
  };

  _proto.handleMessage = function handleMessage(ev) {
    var msg = ev.data;
    if ((msg === null || msg === void 0 ? void 0 : msg.type) !== "pxtpkgext") return;

    if (!msg.id) {
      switch (msg.event) {
        case "extinit":
          this.log("init");
          this._target = msg.target;
          this._connected = true;
          this.emit(constants/* CONNECT */.JD8);
          this.emit(constants/* CHANGE */.Ver);
          break;

        case "extloaded":
          this.log("loaded");
          break;

        case "extshown":
          this.setVisible(true);
          this.emit(SHOWN);
          this.emit(constants/* CHANGE */.Ver);
          break;

        case "exthidden":
          this.setVisible(false);
          this.emit(HIDDEN);
          this.emit(constants/* CHANGE */.Ver);
          break;

        case "extdatastream":
          this.emit('datastream', true);
          break;

        case "extconsole":
          this.emit('console', msg.body);
          break;

        case "extmessagepacket":
          this.emit(MESSAGE_PACKET, msg.body);
          break;

        default:
          console.debug("Unhandled event", msg);
      }
    } else {
      var _ref = this.pendingCommands[msg.id] || {},
          action = _ref.action,
          resolve = _ref.resolve,
          reject = _ref.reject;

      delete this.pendingCommands[msg.id];
      if (msg.success && resolve) resolve(msg.resp);else if (!msg.success && reject) reject(msg.resp); // raise event as well

      switch (action) {
        case "extinit":
          this._connected = true;
          this.emit(constants/* CONNECT */.JD8);
          this.emit(constants/* CHANGE */.Ver);
          break;

        case "extusercode":
          // Loaded, set the target
          this.emit('readuser', msg.resp);
          this.emit(constants/* CHANGE */.Ver);
          break;

        case "extreadcode":
          // Loaded, set the target
          this.emit(READ, msg.resp);
          this.emit(constants/* CHANGE */.Ver);
          break;

        case "extwritecode":
          this.emit('written', undefined);
          break;
      }
    }
  };

  _proto.init = /*#__PURE__*/function () {
    var _init = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee() {
      return regenerator_default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.log("initializing");
              _context.next = 3;
              return this.sendRequest('extinit');

            case 3:
              this.log("connected");
              _context.next = 6;
              return this.refresh();

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function init() {
      return _init.apply(this, arguments);
    }

    return init;
  }();

  _proto.refresh = /*#__PURE__*/function () {
    var _refresh = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee2() {
      var r;
      return regenerator_default().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.log("refresh");
              _context2.next = 3;
              return this.read();

            case 3:
              r = _context2.sent;

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function refresh() {
      return _refresh.apply(this, arguments);
    }

    return refresh;
  }();

  _proto.read = /*#__PURE__*/function () {
    var _read = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee3() {
      var r, _resp;

      return regenerator_default().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (this.extensionId) {
                _context3.next = 6;
                break;
              }

              r = {};
              this.emit(READ, r);
              return _context3.abrupt("return", r);

            case 6:
              _context3.next = 8;
              return this.sendRequest('extreadcode');

            case 8:
              _resp = _context3.sent;
              return _context3.abrupt("return", _resp);

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function read() {
      return _read.apply(this, arguments);
    }

    return read;
  }();

  _proto.readUser = /*#__PURE__*/function () {
    var _readUser = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee4() {
      return regenerator_default().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.sendRequest('extusercode');

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function readUser() {
      return _readUser.apply(this, arguments);
    }

    return readUser;
  }();

  _proto.write = /*#__PURE__*/function () {
    var _write = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee5(code, json, jres, dependencies) {
      return regenerator_default().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (this.extensionId) {
                _context5.next = 4;
                break;
              }

              // Write to local storage instead
              this.emit('written', undefined);
              _context5.next = 6;
              break;

            case 4:
              _context5.next = 6;
              return this.sendRequest('extwritecode', {
                code: code || undefined,
                json: json || undefined,
                jres: jres || undefined,
                dependencies: dependencies
              });

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function write(_x, _x2, _x3, _x4) {
      return _write.apply(this, arguments);
    }

    return write;
  }();

  _proto.queryPermission = /*#__PURE__*/function () {
    var _queryPermission = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee6() {
      return regenerator_default().wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.sendRequest('extquerypermission');

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function queryPermission() {
      return _queryPermission.apply(this, arguments);
    }

    return queryPermission;
  }();

  _proto.requestPermission = /*#__PURE__*/function () {
    var _requestPermission = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee7(console) {
      return regenerator_default().wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return this.sendRequest('extrequestpermission', {
                console: console
              });

            case 2:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function requestPermission(_x5) {
      return _requestPermission.apply(this, arguments);
    }

    return requestPermission;
  }();

  _proto.dataStreamConsole = /*#__PURE__*/function () {
    var _dataStreamConsole = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee8(console) {
      return regenerator_default().wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return this.sendRequest('extdatastream', {
                console: console
              });

            case 2:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function dataStreamConsole(_x6) {
      return _dataStreamConsole.apply(this, arguments);
    }

    return dataStreamConsole;
  }();

  _proto.dataStreamMessages = /*#__PURE__*/function () {
    var _dataStreamMessages = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee9(messages) {
      return regenerator_default().wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return this.sendRequest('extdatastream', {
                messages: messages
              });

            case 2:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function dataStreamMessages(_x7) {
      return _dataStreamMessages.apply(this, arguments);
    }

    return dataStreamMessages;
  }();

  (0,createClass/* default */.Z)(MakeCodeEditorExtensionClient, [{
    key: "target",
    get: function get() {
      return this._target;
    }
  }, {
    key: "connected",
    get: function get() {
      return this._connected;
    }
  }, {
    key: "visible",
    get: function get() {
      return this._visible;
    }
  }]);

  return MakeCodeEditorExtensionClient;
}(client/* JDClient */.z);
function useMakeCodeEditorExtensionClient() {
  var _useContext = (0,react.useContext)(Context/* default */.Z),
      bus = _useContext.bus;

  var _useState = (0,react.useState)(undefined),
      client = _useState[0],
      setClient = _useState[1];

  (0,react.useEffect)(function () {
    console.log("mkcd: new editor client");
    var c = new MakeCodeEditorExtensionClient();
    c.on(constants/* CONNECT */.JD8, function () {
      console.log("mkcd: stream messages");
      c.dataStreamMessages(true);
    });
    c.on([HIDDEN, SHOWN], function () {
      return bus.clear();
    });
    c.on(MESSAGE_PACKET, function (msg) {
      if (msg.channel === "jacdac" && msg.source !== SENDER) {
        var pkts = packet/* default.fromFrame */.Z.fromFrame(msg.data, bus.timestamp);

        for (var _iterator = _createForOfIteratorHelperLoose(pkts), _step; !(_step = _iterator()).done;) {
          var pkt = _step.value;
          pkt.sender = msg.source || "makecode";
          bus.processPacket(pkt);
        }
      }
    });
    setClient(c);
    return function () {
      return c === null || c === void 0 ? void 0 : c.unmount();
    };
  }, []);
  return client;
}
// EXTERNAL MODULE: ./src/components/CmdButton.tsx + 1 modules
var CmdButton = __webpack_require__(82613);
// EXTERNAL MODULE: ./node_modules/@material-ui/icons/Save.js
var Save = __webpack_require__(8567);
// EXTERNAL MODULE: ./jacdac-ts/jacdac-spec/spectool/jdspec.ts
var jdspec = __webpack_require__(13996);
// EXTERNAL MODULE: ./node_modules/react-use-id-hook/dist/react-use-id-hook.esm.js
var react_use_id_hook_esm = __webpack_require__(19640);
// EXTERNAL MODULE: ./jacdac-ts/src/jdom/makecode.ts + 1 modules
var makecode = __webpack_require__(93127);
;// CONCATENATED MODULE: ./src/components/makecode/MakeCodeEditorExtension.tsx





 // tslint:disable-next-line: no-submodule-imports match-default-export-name








 // tslint:disable-next-line: no-submodule-imports match-default-export-name






function toTypescript(config) {
  var ns = "myModules";
  return "// auto-generated, do not edit.\nnamespace " + ns + " {\n" + config.roles.map(function (role) {
    return "\n    //% fixedInstance block=\"" + role.name + "\"\n    export const " + (0,jdspec/* camelize */._A)(role.name) + " = new " + (0,makecode/* resolveMakecodeServiceFromClassIdentifier */.WB)(role.service).client.qName + "(\"" + (0,jdspec/* camelize */._A)(role.name) + "\");\n";
  }).join("") + "\n\n    // start after main\n    control.runInParallel(function() {\n        " + config.roles.map(function (role) {
    return "    " + ns + "." + (0,jdspec/* camelize */._A)(role.name) + ".start();\n        ";
  }).join("") + "\n    })\n}\n    ";
}

function toDependencies(config) {
  var r = {};
  config === null || config === void 0 ? void 0 : config.roles.forEach(function (role) {
    var mk = (0,makecode/* resolveMakecodeServiceFromClassIdentifier */.WB)(role.service);
    r[mk.client.name] = "github:" + mk.client.repo;
  });
  return r;
}

function toJSON(config) {
  return config && JSON.stringify(config, null, 4);
}

function ClientRoleRow(props) {
  var component = props.component,
      onUpdate = props.onUpdate,
      config = props.config;
  var name = component.name,
      service = component.service;

  var _useMemo = (0,react.useMemo)(function () {
    return validateClientRole(config, component);
  }, [config, component]),
      nameError = _useMemo.nameError,
      serviceError = _useMemo.serviceError;

  var textId = (0,react_use_id_hook_esm/* useId */.Me)();

  var handleComponentNameChange = function handleComponentNameChange(ev) {
    component.name = (0,dtdl/* escapeName */.Jg)(ev.target.value);
    onUpdate();
  };

  var handleSetService = function handleSetService(serviceClass) {
    component.service = serviceClass;
    onUpdate();
  };

  var handleComponentDelete = function handleComponentDelete() {
    config.roles.splice(config.roles.indexOf(component), 1);
    onUpdate();
  };

  return /*#__PURE__*/react.createElement(Grid/* default */.Z, {
    item: true,
    xs: 12
  }, /*#__PURE__*/react.createElement(Grid/* default */.Z, {
    container: true,
    spacing: 2
  }, /*#__PURE__*/react.createElement(Grid/* default */.Z, {
    item: true,
    xs: 4,
    md: 6
  }, /*#__PURE__*/react.createElement(TextField/* default */.Z, {
    id: textId,
    fullWidth: true,
    error: !!nameError,
    variant: "outlined",
    label: "name",
    helperText: nameError,
    value: name,
    onChange: handleComponentNameChange
  })), /*#__PURE__*/react.createElement(Grid/* default */.Z, {
    item: true,
    xs: 4,
    md: 4
  }, /*#__PURE__*/react.createElement(ServiceSpecificationSelect/* default */.Z, {
    variant: "outlined",
    label: "service",
    serviceClass: service,
    setServiceClass: handleSetService,
    error: serviceError
  })), /*#__PURE__*/react.createElement(Grid/* default */.Z, {
    item: true
  }, /*#__PURE__*/react.createElement(IconButtonWithTooltip/* default */.Z, {
    title: "Remove service",
    onClick: handleComponentDelete
  }, /*#__PURE__*/react.createElement(Delete/* default */.Z, null)))));
} // eslint-disable-next-line @typescript-eslint/no-unused-vars


function validateClientRole(config, role) {
  var serviceError = undefined;
  var nameError = undefined; // TODO

  return {
    serviceError: serviceError,
    nameError: nameError
  };
}

function MakeCodeEditorExtension() {
  var _configuration$roles;

  var client = useMakeCodeEditorExtensionClient();
  var connected = (0,useChange/* default */.Z)(client, function (c) {
    return c === null || c === void 0 ? void 0 : c.connected;
  });

  var _useState = (0,react.useState)({
    roles: []
  }),
      configuration = _useState[0],
      setConfiguration = _useState[1];

  (0,react.useEffect)(function () {
    return client === null || client === void 0 ? void 0 : client.subscribe(READ, function (resp) {
      console.log("mkcd: read received");
      var cfg = (0,utils/* JSONTryParse */.ZZ)(resp.json);
      console.log({
        resp: resp,
        cfg: cfg
      });
      if (cfg) setConfiguration(cfg);
    });
  }, [client]);

  var hasMakeCodeService = function hasMakeCodeService(srv) {
    return !!(0,makecode/* resolveMakecodeService */.K9)(srv);
  };

  var update = function update() {
    setConfiguration((0,utils/* clone */.d9)(configuration));
  };

  var handleAddService = function handleAddService(service) {
    if (!configuration.roles) configuration.roles = [];
    var names = configuration.roles.map(function (c) {
      return c.name;
    }).concat((0,spec/* serviceSpecifications */.Le)().map(function (spec) {
      return spec.camelName;
    })).filter(function (n) {
      return !!n;
    });
    configuration.roles.push({
      name: (0,utils/* uniqueName */.yZ)(names, service.camelName || service.shortId),
      service: service.classIdentifier
    });
    update();
  };

  var handleSave = /*#__PURE__*/function () {
    var _ref = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee() {
      var ts, json, deps;
      return regenerator_default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              ts = toTypescript(configuration);
              json = toJSON(configuration);
              deps = toDependencies(configuration);
              console.log("mkcd: saving...");
              _context.next = 6;
              return client.write(ts, json, undefined, deps);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleSave() {
      return _ref.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/react.createElement(Grid/* default */.Z, {
    container: true,
    direction: "row",
    spacing: 2
  }, (_configuration$roles = configuration.roles) === null || _configuration$roles === void 0 ? void 0 : _configuration$roles.map(function (c, i) {
    return /*#__PURE__*/react.createElement(ClientRoleRow, {
      key: "config" + i,
      config: configuration,
      component: c,
      onUpdate: update
    });
  }), /*#__PURE__*/react.createElement(Grid/* default */.Z, {
    item: true,
    xs: 12
  }, /*#__PURE__*/react.createElement(AddServiceIconButton/* default */.Z, {
    serviceFilter: hasMakeCodeService,
    onAdd: handleAddService
  })), /*#__PURE__*/react.createElement(Grid/* default */.Z, {
    item: true,
    xs: 12
  }, /*#__PURE__*/react.createElement(CmdButton/* default */.Z, {
    trackName: "makecode.save",
    variant: "contained",
    disabled: !connected,
    icon: /*#__PURE__*/react.createElement(Save/* default */.Z, null),
    onClick: handleSave
  }, "save")));
}
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/makeStyles.js
var makeStyles = __webpack_require__(10920);
// EXTERNAL MODULE: ./src/components/ui/PaperBox.tsx
var PaperBox = __webpack_require__(79739);
// EXTERNAL MODULE: ./src/components/ui/DarkModeContext.tsx
var DarkModeContext = __webpack_require__(91350);
;// CONCATENATED MODULE: ./src/pages/tools/makecode-editor-extension.tsx







var useStyles = (0,makeStyles/* default */.Z)(function (theme) {
  return (0,createStyles/* default */.Z)({
    content: {
      display: "flex",
      minHeight: "100vh",
      minWidth: "10rem",
      flexDirection: "column",
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      flexGrow: 1
    }
  });
});
function MakeCodeEditorExtensionPage() {
  var _useContext = (0,react.useContext)(DarkModeContext/* default */.Z),
      toggleDarkMode = _useContext.toggleDarkMode,
      darkModeMounted = _useContext.darkModeMounted;

  var rawTheme = (0,createMuiTheme/* default */.Z)({
    palette: {
      primary: {
        main: "#2e7d32"
      },
      secondary: {
        main: "#ffc400"
      },
      contrastThreshold: 5.1,
      type: "dark"
    }
  });
  var classes = useStyles();
  var theme = (0,responsiveFontSizes/* default */.Z)(rawTheme);
  (0,react.useEffect)(function () {
    if (darkModeMounted) toggleDarkMode("light");
  }, [darkModeMounted]);
  return /*#__PURE__*/react.createElement(ThemedLayout/* default */.Z, {
    theme: theme
  }, /*#__PURE__*/react.createElement("div", {
    className: classes.content
  }, /*#__PURE__*/react.createElement(PaperBox/* default */.Z, null, /*#__PURE__*/react.createElement(MakeCodeEditorExtension, null))));
}

/***/ })

}]);
//# sourceMappingURL=component---src-pages-tools-makecode-editor-extension-tsx-5e84e2ee11d781dc0dad.js.map