"use strict";
(self["webpackChunkjacdac_docs"] = self["webpackChunkjacdac_docs"] || []).push([[61],{

/***/ 79973:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "i_": function() { return /* binding */ checkProgram; },
  "IJ": function() { return /* binding */ compileProgram; },
  "EB": function() { return /* binding */ toIdentifier; },
  "vf": function() { return /* binding */ toMemberExpression; }
});

// UNUSED EXPORTS: getServiceFromRole

// EXTERNAL MODULE: ./jacdac-ts/src/jdom/spec.ts + 2 modules
var jdom_spec = __webpack_require__(13173);
;// CONCATENATED MODULE: ./jacdac-ts/src/vm/ir.ts
var VMFunctions = [{
  id: "start",
  args: [],
  prompt: "start block",
  context: "command"
}, {
  id: "halt",
  args: [],
  prompt: "terminates the current handler",
  context: "command"
}, {
  id: "nop",
  args: [],
  prompt: "no operation",
  context: "command"
}, {
  id: "label",
  args: ["Identifier"],
  prompt: "label target {1}",
  context: "command"
}, {
  id: "jump",
  args: ["Identifier"],
  prompt: "jump to label {1}",
  context: "command"
}, {
  id: "branchOnCondition",
  args: ["boolean", "Identifier"],
  prompt: "if {1} then jump to label {2}",
  context: "command"
}, {
  id: "wait",
  args: ["number"],
  prompt: "wait for {1} milliseconds",
  context: "command"
}, {
  id: "awaitRegister",
  args: ["register"],
  prompt: "wait on register {1} to change value",
  context: "command"
}, {
  id: "awaitChange",
  args: ["register", "number"],
  prompt: "wait for register {1} to change by {2}",
  context: "command"
}, {
  id: "awaitEvent",
  args: ["event", ["boolean", true]],
  prompt: "wait for event {1} and then check {2} (other events ignored)",
  context: "command"
}, {
  id: "awaitCondition",
  args: ["boolean"],
  prompt: "wait for condition {1}",
  context: "command"
}, {
  id: "writeRegister",
  args: ["register", "number"],
  prompt: "write value {2:val} to {1}",
  context: "command"
}, {
  id: "writeLocal",
  args: ["register", "number"],
  prompt: "write value {2:val} to {1}",
  context: "command"
}, {
  id: "watch",
  args: ["number"],
  prompt: "watch expression {1}",
  context: "command"
}, {
  id: "log",
  args: ["number"],
  prompt: "not used",
  context: "command"
}, {
  id: "roleBound",
  args: ["Identifier", "Identifier"],
  prompt: "role {1} {2}",
  context: "command"
}, {
  id: "roleBoundExpression",
  args: ["Identifier"],
  prompt: "is role {1} bound?",
  context: "expression"
}, {
  id: "onRoleConnected",
  args: ["Identifier"],
  prompt: "fires when a role is connected",
  context: "command"
}, {
  id: "onRoleDisconnected",
  args: ["Identifier"],
  prompt: "fires when a role is disconnected",
  context: "command"
}];
// EXTERNAL MODULE: ./jacdac-ts/jacdac-spec/spectool/jdutils.ts
var jdutils = __webpack_require__(30055);
// EXTERNAL MODULE: ./jacdac-ts/src/jdom/utils.ts
var utils = __webpack_require__(81794);
;// CONCATENATED MODULE: ./jacdac-ts/src/vm/compile.ts




function toIdentifier(id) {
  return {
    type: "Identifier",
    name: id
  };
}
function toMemberExpression(root, field) {
  return {
    type: "MemberExpression",
    object: toIdentifier(root),
    property: typeof field === "string" ? toIdentifier(field) : field,
    computed: false
  };
}

function handlerVisitor(handler, visitITE, visitCommand) {
  handler.commands.forEach(visitBase);

  function visitBase(base) {
    switch (base.type) {
      case "cmd":
        {
          if (visitCommand) visitCommand(base);
          break;
        }

      case "ite":
        {
          var _ite$else, _ite$then;

          var _ite = base;
          if (visitITE) visitITE(_ite, 0);
          _ite === null || _ite === void 0 ? void 0 : (_ite$else = _ite.else) === null || _ite$else === void 0 ? void 0 : _ite$else.forEach(visitBase);
          if (visitITE) visitITE(_ite, 1);
          _ite === null || _ite === void 0 ? void 0 : (_ite$then = _ite.then) === null || _ite$then === void 0 ? void 0 : _ite$then.forEach(visitBase);
          if (visitITE) visitITE(_ite, 2);
        }
    }
  }
}

function compileProgram(_ref) {
  var roles = _ref.roles,
      serverRoles = _ref.serverRoles,
      handlers = _ref.handlers;
  var newProgram = {
    roles: roles,
    serverRoles: serverRoles,
    handlers: []
  }; // process start blocks

  handlers.forEach(startBlock); // remove if-then-else

  newProgram.handlers = handlers.map(function (h) {
    return {
      commands: removeIfThenElse(h),
      errors: h === null || h === void 0 ? void 0 : h.errors
    };
  });
  return newProgram;
}

function checkCall(cmd, id) {
  if (cmd.type === "cmd") {
    var callee = cmd.command.callee;

    if (callee.type === "Identifier") {
      var cid = callee.name;
      return id === cid;
    }
  }

  return undefined;
}

function startBlock(handler) {
  if (handler.commands.length && checkCall(handler.commands[0], "start")) {
    handler.commands.shift();
    handler.commands.push({
      type: "cmd",
      command: {
        type: "CallExpression",
        callee: toIdentifier("halt"),
        arguments: []
      }
    });
  }
}

function removeIfThenElse(handler) {
  var newSequence = [];
  var labels = [];
  var labelId = 1;
  handlerVisitor(handler, function (ite, time) {
    switch (time) {
      case 0:
        {
          // create the labels and branch instruction
          var then = "then_" + labelId;
          var end = "end_" + labelId;
          labels.push({
            then: then,
            end: end
          });
          labelId++;
          newSequence.push({
            type: "cmd",
            command: {
              type: "CallExpression",
              callee: toIdentifier("branchOnCondition"),
              arguments: [ite.expr, toIdentifier(then)]
            }
          });
          break;
        }

      case 1:
        {
          // insert the jump and then label
          var _labels = labels[labels.length - 1],
              _then = _labels.then,
              _end = _labels.end;
          newSequence.push({
            type: "cmd",
            command: {
              type: "CallExpression",
              callee: toIdentifier("jump"),
              arguments: [toIdentifier(_end)]
            }
          });
          newSequence.push({
            type: "cmd",
            command: {
              type: "CallExpression",
              callee: toIdentifier("label"),
              arguments: [toIdentifier(_then)]
            }
          });
          break;
        }

      case 2:
        {
          (0,utils/* assert */.hu)(labels.length > 0);
          var _end2 = labels[labels.length - 1].end;
          newSequence.push({
            type: "cmd",
            command: {
              type: "CallExpression",
              callee: toIdentifier("label"),
              arguments: [toIdentifier(_end2)]
            }
          });
          labels.pop();
        }
    }
  }, function (cmd) {
    newSequence.push(cmd);
  });
  return newSequence;
}

var getServiceFromRole = function getServiceFromRole(info) {
  return function (role) {
    // lookup in roles first
    var roleFound = info.roles.find(function (pair) {
      return pair.role === role;
    });
    var client = true;

    if (!roleFound) {
      roleFound = info.serverRoles.find(function (pair) {
        return pair.role === role;
      });
      client = false;
    }

    if (roleFound) {
      // must succeed
      var spec = (0,jdom_spec/* serviceSpecificationFromClassIdentifier */.d5)(roleFound.serviceClass);
      (0,utils/* assert */.hu)(!!spec, "service class " + roleFound.serviceClass + " not resolved");
      return {
        spec: spec,
        client: client
      };
    } else {
      var _spec = (0,jdom_spec/* serviceSpecificationFromName */.kB)(role);

      return {
        spec: _spec,
        client: true
      };
    }
  };
};
function checkProgram(prog) {
  var allErrors = [];
  var goodHandlers = [];

  var errorFun = function errorFun(e) {
    allErrors.push({
      sourceId: undefined,
      message: e
    });
  };

  var symbolResolver = new jdutils/* SpecSymbolResolver */.ll(undefined, getServiceFromRole(prog), errorFun);
  var checker = new jdutils/* VMChecker */.Ys(symbolResolver, function (_) {
    return true;
  }, errorFun);
  prog.handlers.forEach(function (h) {
    if (h !== null && h !== void 0 && h.errors.length) {
      h === null || h === void 0 ? void 0 : h.errors.forEach(function (e) {
        return allErrors.push(e);
      });
      return;
    }

    var errorCount = allErrors.length;
    symbolResolver.roles = [];
    handlerVisitor(h, undefined, function (c) {
      return checker.checkCommand(c.command, VMFunctions);
    });

    if ((h === null || h === void 0 ? void 0 : h.errors.length) === 0 && allErrors.length === errorCount) {
      h.roles = symbolResolver.roles;
      goodHandlers.push(h);
    } else {
      h === null || h === void 0 ? void 0 : h.errors.forEach(function (e) {
        return allErrors.push(e);
      });
    }
  });
  prog.handlers = goodHandlers;
  return {
    registers: symbolResolver.registers.map(function (s) {
      var _s$split = s.split("."),
          root = _s$split[0],
          fld = _s$split[1];

      return {
        role: root,
        register: fld
      };
    }),
    events: symbolResolver.events.map(function (e) {
      var _e$split = e.split("."),
          root = _e$split[0],
          fld = _e$split[1];

      return {
        role: root,
        event: fld
      };
    }),
    errors: allErrors
  };
}

/***/ }),

/***/ 21910:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tT": function() { return /* binding */ toRoleType; },
/* harmony export */   "eS": function() { return /* binding */ parseRoleType; },
/* harmony export */   "GB": function() { return /* binding */ fieldsToFieldInputs; },
/* harmony export */   "ki": function() { return /* binding */ fieldsToValues; },
/* harmony export */   "Bo": function() { return /* binding */ fieldsToMessage; },
/* harmony export */   "me": function() { return /* binding */ serviceHelp; },
/* harmony export */   "JO": function() { return /* binding */ createServiceColor; },
/* harmony export */   "xH": function() { return /* binding */ roleVariable; },
/* harmony export */   "wi": function() { return /* binding */ getServiceInfo; },
/* harmony export */   "Hy": function() { return /* binding */ ServicesBaseDSL; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(85061);
/* harmony import */ var core_js_modules_es_array_flat_map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(86535);
/* harmony import */ var core_js_modules_es_array_flat_map_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_flat_map_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_unscopables_flat_map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(99244);
/* harmony import */ var core_js_modules_es_array_unscopables_flat_map_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_unscopables_flat_map_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(35313);
/* harmony import */ var _jacdac_ts_jacdac_spec_spectool_jdspec__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13996);
/* harmony import */ var _jacdac_ts_src_jdom_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(71815);
/* harmony import */ var _jacdac_ts_src_jdom_flags__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(21258);
/* harmony import */ var _jacdac_ts_src_jdom_spec__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13173);
/* harmony import */ var _jacdac_ts_src_jdom_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(81794);
/* harmony import */ var _jacdac_ts_src_vm_compile__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(79973);
/* harmony import */ var _fields_NoteField__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(50585);
/* harmony import */ var _fields_ServoAngleField__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(891);
/* harmony import */ var _toolbox__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(16582);
/* harmony import */ var _vm_VMgenerator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(15056);
/* harmony import */ var blockly__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(74640);
/* harmony import */ var blockly__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(blockly__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _palette__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(74602);
















var SET_STATUS_LIGHT_BLOCK = "jacdac_set_status_light";
var ROLE_BOUND_EVENT_BLOCK = "jacdac_role_bound_event";
var ROLE_BOUND_BLOCK = "jacdac_role_bound";

function isBooleanField(field) {
  return field.type === "bool";
}

function isStringField(field) {
  return field.type === "string";
}

function toBlocklyType(field) {
  return field.encoding === "JSON" ? _toolbox__WEBPACK_IMPORTED_MODULE_11__/* .JSON_TYPE */ .oj : isBooleanField(field) ? _toolbox__WEBPACK_IMPORTED_MODULE_11__/* .BOOLEAN_TYPE */ .lu : isStringField(field) ? _toolbox__WEBPACK_IMPORTED_MODULE_11__/* .STRING_TYPE */ .jt : (0,_jacdac_ts_jacdac_spec_spectool_jdspec__WEBPACK_IMPORTED_MODULE_3__/* .isNumericType */ .FV)(field) ? _toolbox__WEBPACK_IMPORTED_MODULE_11__/* .NUMBER_TYPE */ .sS : undefined;
}

function enumInfo(srv, field) {
  var _srv$enums;

  var e = (_srv$enums = srv.enums) === null || _srv$enums === void 0 ? void 0 : _srv$enums[field.type];
  return e;
}

var ignoredServices = [_jacdac_ts_src_jdom_constants__WEBPACK_IMPORTED_MODULE_4__/* .SRV_CONTROL */ .gm9, _jacdac_ts_src_jdom_constants__WEBPACK_IMPORTED_MODULE_4__/* .SRV_LOGGER */ .w9j, _jacdac_ts_src_jdom_constants__WEBPACK_IMPORTED_MODULE_4__/* .SRV_ROLE_MANAGER */ .igi, _jacdac_ts_src_jdom_constants__WEBPACK_IMPORTED_MODULE_4__/* .SRV_PROTO_TEST */ .$Bn, _jacdac_ts_src_jdom_constants__WEBPACK_IMPORTED_MODULE_4__/* .SRV_BOOTLOADER */ .PWm];
var customMessages = [{
  service: _jacdac_ts_src_jdom_constants__WEBPACK_IMPORTED_MODULE_4__/* .SRV_JOYSTICK */ .vRO,
  register: _jacdac_ts_src_jdom_constants__WEBPACK_IMPORTED_MODULE_4__/* .JoystickReg.Direction */ .ztd.Direction,
  field: "buttons",
  get: "is %1 %2 pressed"
}]; // internal helper functions

var customShadows = [{
  serviceClass: _jacdac_ts_src_jdom_constants__WEBPACK_IMPORTED_MODULE_4__/* .SRV_SERVO */ .$X_,
  kind: "rw",
  identifier: _jacdac_ts_src_jdom_constants__WEBPACK_IMPORTED_MODULE_4__/* .ServoReg.Angle */ .pmu.Angle,
  field: "_",
  shadow: {
    kind: "block",
    type: _fields_ServoAngleField__WEBPACK_IMPORTED_MODULE_10__/* .default.SHADOW.type */ .Z.SHADOW.type
  }
}, {
  serviceClass: _jacdac_ts_src_jdom_constants__WEBPACK_IMPORTED_MODULE_4__/* .SRV_BUZZER */ .J1$,
  kind: "command",
  identifier: _jacdac_ts_src_jdom_constants__WEBPACK_IMPORTED_MODULE_4__/* .BuzzerCmd.PlayNote */ .Rv2.PlayNote,
  field: "frequency",
  shadow: {
    kind: "block",
    type: _fields_NoteField__WEBPACK_IMPORTED_MODULE_9__/* .default.SHADOW.type */ .Z.SHADOW.type
  }
}];

var lookupCustomShadow = function lookupCustomShadow(service, info, field) {
  var _customShadows$find;

  return (_customShadows$find = customShadows.find(function (cs) {
    return cs.serviceClass === service.classIdentifier && cs.kind == info.kind && cs.identifier === info.identifier && cs.field == field.name;
  })) === null || _customShadows$find === void 0 ? void 0 : _customShadows$find.shadow;
};

var fieldsSupported = function fieldsSupported(pkt) {
  return pkt.fields.every(toBlocklyType);
};

var fieldName = function fieldName(reg, field) {
  return field.name === "_" ? reg.name : field.name;
};

var fieldToShadow = function fieldToShadow(service, info, field) {
  return lookupCustomShadow(service, info, field) || (isBooleanField(field) ? {
    kind: "block",
    type: "jacdac_on_off"
  } : isStringField(field) ? {
    kind: "block",
    type: "text"
  } : field.unit === "°" ? {
    kind: "block",
    type: "jacdac_angle"
  } : field.unit === "/" ? {
    kind: "block",
    type: "jacdac_ratio"
  } : /^%/.test(field.unit) ? {
    kind: "block",
    type: "jacdac_percent"
  } : field.type === "u8" ? {
    kind: "block",
    type: "jacdac_byte"
  } : {
    kind: "block",
    type: "math_number",
    value: field.defaultValue || 0,
    min: field.typicalMin || field.absoluteMin,
    max: field.typicalMax || field.absoluteMax
  });
};

var variableName = function variableName(srv, client) {
  return "" + (0,_jacdac_ts_jacdac_spec_spectool_jdspec__WEBPACK_IMPORTED_MODULE_3__/* .humanify */ .lW)(srv.camelName).toLowerCase() + (client ? "" : " server") + " 1";
};

var isEnabledRegister = function isEnabledRegister(info) {
  return info.fields.length === 1 && info.fields[0].type === "bool" && info.name === "enabled";
};

var customMessage = function customMessage(srv, reg, field) {
  return customMessages.find(function (m) {
    return m.service === srv.classIdentifier && m.register === reg.identifier && m.field === field.name;
  });
};

var eventFieldGroups = [{
  output: _toolbox__WEBPACK_IMPORTED_MODULE_11__/* .NUMBER_TYPE */ .sS,
  filter: _jacdac_ts_jacdac_spec_spectool_jdspec__WEBPACK_IMPORTED_MODULE_3__/* .isNumericType */ .FV
}, {
  output: _toolbox__WEBPACK_IMPORTED_MODULE_11__/* .BOOLEAN_TYPE */ .lu,
  filter: isBooleanField
}, {
  output: _toolbox__WEBPACK_IMPORTED_MODULE_11__/* .STRING_TYPE */ .jt,
  filter: function filter(f) {
    return isStringField(f) && f.encoding !== "JSON";
  }
}, {
  output: _toolbox__WEBPACK_IMPORTED_MODULE_11__/* .JSON_TYPE */ .oj,
  filter: function filter(f) {
    return isStringField(f) && f.encoding === "JSON";
  }
}];
// exports
function toRoleType(service, client) {
  if (client === void 0) {
    client = true;
  }

  return service.classIdentifier + ":" + (client ? "client" : "server");
}
function parseRoleType(v) {
  var split = v.type.split(":");
  return {
    role: v.name,
    serviceClass: parseInt(split[0]),
    client: split.length === 2 ? split[1] === "client" : true
  };
}
var fieldsToFieldInputs = function fieldsToFieldInputs(info) {
  return info.fields.map(function (field) {
    return {
      type: "input_value",
      name: fieldName(info, field),
      check: toBlocklyType(field)
    };
  });
};
var fieldsToValues = function fieldsToValues(service, info) {
  return (0,_jacdac_ts_src_jdom_utils__WEBPACK_IMPORTED_MODULE_7__/* .toMap */ .qL)(info.fields, function (field) {
    return fieldName(info, field);
  }, function (field) {
    return fieldToShadow(service, info, field);
  });
};
var fieldsToMessage = function fieldsToMessage(info) {
  return info.fields.map(function (field, i) {
    return (0,_jacdac_ts_jacdac_spec_spectool_jdspec__WEBPACK_IMPORTED_MODULE_3__/* .humanify */ .lW)(field.name) + " %" + (2 + i);
  }).join(" ");
};
var serviceHelp = function serviceHelp(service) {
  return (0,gatsby__WEBPACK_IMPORTED_MODULE_2__.withPrefix)("/services/" + service.shortId);
};
var sensorColor = (0,_palette__WEBPACK_IMPORTED_MODULE_14__/* .paletteColorByIndex */ .W)(1);
var otherColor = (0,_palette__WEBPACK_IMPORTED_MODULE_14__/* .paletteColorByIndex */ .W)(3); // eslint-disable-next-line @typescript-eslint/no-unused-vars

var createServiceColor = function createServiceColor(theme) {
  var serviceColor = function serviceColor(srv) {
    return (0,_jacdac_ts_src_jdom_spec__WEBPACK_IMPORTED_MODULE_6__/* .isSensor */ .rq)(srv) ? sensorColor : otherColor;
  };

  return serviceColor;
};
var roleVariable = function roleVariable(service, client) {
  if (client === void 0) {
    client = true;
  }

  return {
    type: "field_variable",
    name: "role",
    variable: variableName(service, client),
    variableTypes: [toRoleType(service, client)],
    defaultType: toRoleType(service, client)
  };
};
var getServiceInfo = function getServiceInfo() {
  var allServices = (0,_jacdac_ts_src_jdom_spec__WEBPACK_IMPORTED_MODULE_6__/* .serviceSpecifications */ .Le)();
  var supportedServices = allServices.filter(function (service) {
    return !/^_/.test(service.shortId) && service.status !== "deprecated";
  }).filter(function (service) {
    return ignoredServices.indexOf(service.classIdentifier) < 0;
  });
  var registers = (0,_jacdac_ts_src_jdom_utils__WEBPACK_IMPORTED_MODULE_7__/* .arrayConcatMany */ .ue)(supportedServices.map(function (service) {
    return service.packets.filter(_jacdac_ts_src_jdom_spec__WEBPACK_IMPORTED_MODULE_6__/* .isHighLevelRegister */ .vr).map(function (register) {
      return {
        service: service,
        register: register
      };
    });
  }));

  var _splitFilter = (0,_jacdac_ts_src_jdom_utils__WEBPACK_IMPORTED_MODULE_7__/* .splitFilter */ .ap)(registers, function (reg) {
    return reg.register.fields.length == 1;
  }),
      registerSimples = _splitFilter[0],
      registerComposites = _splitFilter[1];

  var _splitFilter2 = (0,_jacdac_ts_src_jdom_utils__WEBPACK_IMPORTED_MODULE_7__/* .splitFilter */ .ap)(registerSimples, function (_ref) {
    var register = _ref.register;
    return !!toBlocklyType(register.fields[0]);
  }),
      registerSimpleTypes = _splitFilter2[0],
      registerSimpleOthers = _splitFilter2[1];

  var registerSimpleEnumTypes = registerSimpleOthers.filter(function (_ref2) {
    var service = _ref2.service,
        register = _ref2.register;
    return !!enumInfo(service, register.fields[0]);
  }).map(function (_ref3) {
    var service = _ref3.service,
        register = _ref3.register;
    return {
      service: service,
      register: register,
      field: register.fields[0],
      einfo: enumInfo(service, register.fields[0])
    };
  });
  var registerCompositeEnumTypes = (0,_jacdac_ts_src_jdom_utils__WEBPACK_IMPORTED_MODULE_7__/* .arrayConcatMany */ .ue)(registerComposites.map(function (_ref4) {
    var service = _ref4.service,
        register = _ref4.register;
    return register.fields.map(function (field) {
      return {
        service: service,
        register: register,
        field: field,
        einfo: enumInfo(service, field)
      };
    }).filter(function (_ref5) {
      var einfo = _ref5.einfo;
      return !!einfo;
    });
  }));
  return {
    allServices: allServices,
    supportedServices: supportedServices,
    registers: registers,
    registerSimpleTypes: registerSimpleTypes,
    registerComposites: registerComposites,
    registerSimpleEnumTypes: registerSimpleEnumTypes,
    registerCompositeEnumTypes: registerCompositeEnumTypes,
    events: supportedServices.map(function (service) {
      return {
        service: service,
        events: service.packets.filter(_jacdac_ts_src_jdom_spec__WEBPACK_IMPORTED_MODULE_6__/* .isHighLevelEvent */ .jl)
      };
    }).filter(function (kv) {
      return !!kv.events.length;
    }),
    commands: (0,_jacdac_ts_src_jdom_utils__WEBPACK_IMPORTED_MODULE_7__/* .arrayConcatMany */ .ue)(supportedServices.map(function (service) {
      return service.packets.filter(function (pkt) {
        return (0,_jacdac_ts_src_jdom_spec__WEBPACK_IMPORTED_MODULE_6__/* .isCommand */ .ao)(pkt) && !pkt.lowLevel && fieldsSupported(pkt);
      }).map(function (pkt) {
        return {
          service: service,
          command: pkt
        };
      });
    }))
  };
};
var ServicesBaseDSL = /*#__PURE__*/function () {
  function ServicesBaseDSL() {}

  var _proto = ServicesBaseDSL.prototype;

  // only state required across methods of class
  _proto.makeRegisterSimpleGetBlocks = function makeRegisterSimpleGetBlocks(registers, client) {
    var _this = this;

    if (client === void 0) {
      client = true;
    }

    return registers.map(function (_ref6) {
      var _customMessage;

      var service = _ref6.service,
          register = _ref6.register;
      return {
        kind: "block",
        type: "jacdac_get_simple_" + service.shortId + "_" + register.name + (client ? "" : "_server"),
        message0: ((_customMessage = customMessage(service, register, register.fields[0])) === null || _customMessage === void 0 ? void 0 : _customMessage.get) || "%1 " + (0,_jacdac_ts_jacdac_spec_spectool_jdspec__WEBPACK_IMPORTED_MODULE_3__/* .humanify */ .lW)(register.name),
        args0: [roleVariable(service, client)],
        inputsInline: true,
        output: toBlocklyType(register.fields[0]),
        colour: _this.serviceColor(service),
        tooltip: register.description,
        helpUrl: serviceHelp(service),
        service: service,
        register: register,
        field: register.fields[0],
        template: "register_get"
      };
    });
  };

  _proto.makeRegisterSetBlocks = function makeRegisterSetBlocks(registers, client) {
    var _this2 = this;

    if (client === void 0) {
      client = true;
    }

    return registers.filter(function (_ref7) {
      var register = _ref7.register;
      return !client || register.kind === "rw";
    }).filter(function (_ref8) {
      var register = _ref8.register;
      return fieldsSupported(register);
    }).map(function (_ref9) {
      var service = _ref9.service,
          register = _ref9.register;
      return {
        kind: "block",
        type: "jacdac_set_" + service.shortId + "_" + register.name + (client ? "" : "_server"),
        message0: isEnabledRegister(register) ? "set %1 %2" : "set %1 " + register.name + " to " + (register.fields.length === 1 ? "%2" : fieldsToMessage(register)),
        args0: [roleVariable(service, client)].concat((0,_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_15__/* .default */ .Z)(fieldsToFieldInputs(register))),
        values: fieldsToValues(service, register),
        inputsInline: true,
        colour: _this2.serviceColor(service),
        tooltip: register.description,
        helpUrl: serviceHelp(service),
        service: service,
        register: register,
        previousStatement: _toolbox__WEBPACK_IMPORTED_MODULE_11__/* .CODE_STATEMENT_TYPE */ .lL,
        nextStatement: _toolbox__WEBPACK_IMPORTED_MODULE_11__/* .CODE_STATEMENT_TYPE */ .lL,
        template: "register_set"
      };
    });
  };

  _proto.makeRegisterChangeByEventBlocks = function makeRegisterChangeByEventBlocks(registers, client) {
    var _this3 = this;

    if (client === void 0) {
      client = true;
    }

    return registers.filter(function (_ref10) {
      var service = _ref10.service;
      return !service.packets.some(_jacdac_ts_src_jdom_spec__WEBPACK_IMPORTED_MODULE_6__/* .isHighLevelEvent */ .jl);
    }).filter(function (_ref11) {
      var register = _ref11.register;
      return register.fields.length === 1 && (0,_jacdac_ts_jacdac_spec_spectool_jdspec__WEBPACK_IMPORTED_MODULE_3__/* .isNumericType */ .FV)(register.fields[0]) && register.identifier !== _jacdac_ts_src_jdom_constants__WEBPACK_IMPORTED_MODULE_4__/* .SystemReg.Intensity */ .ZJq.Intensity;
    }).map(function (_ref12) {
      var service = _ref12.service,
          register = _ref12.register;
      return {
        kind: "block",
        type: "jacdac_change_by_events_" + service.shortId + "_" + register.name + (client ? "" : "_server"),
        message0: "on %1 " + (0,_jacdac_ts_jacdac_spec_spectool_jdspec__WEBPACK_IMPORTED_MODULE_3__/* .humanify */ .lW)(register.name) + " change by %2",
        args0: [roleVariable(service, client)].concat((0,_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_15__/* .default */ .Z)(fieldsToFieldInputs(register))).filter(function (v) {
          return !!v;
        }),
        values: fieldsToValues(service, register),
        inputsInline: true,
        nextStatement: _toolbox__WEBPACK_IMPORTED_MODULE_11__/* .CODE_STATEMENT_TYPE */ .lL,
        colour: _this3.serviceColor(service),
        tooltip: "Event raised when " + register.name + " changes",
        helpUrl: serviceHelp(service),
        service: service,
        register: register,
        template: "register_change_event"
      };
    });
  };

  _proto.makeRegisterNumericsGetBlocks = function makeRegisterNumericsGetBlocks(registers, client) {
    var _this4 = this;

    if (client === void 0) {
      client = true;
    }

    return registers.filter(function (re) {
      return re.register.fields.some(_jacdac_ts_jacdac_spec_spectool_jdspec__WEBPACK_IMPORTED_MODULE_3__/* .isNumericType */ .FV);
    }).map(function (_ref13) {
      var service = _ref13.service,
          register = _ref13.register;
      return {
        kind: "block",
        type: "jacdac_get_numerics_" + service.shortId + "_" + register.name + (client ? "" : "_server"),
        message0: "%1 " + (0,_jacdac_ts_jacdac_spec_spectool_jdspec__WEBPACK_IMPORTED_MODULE_3__/* .humanify */ .lW)(register.name) + (register.fields.length > 1 ? " %2" : ""),
        args0: [roleVariable(service, client), register.fields.length > 1 ? {
          type: "field_dropdown",
          name: "field",
          options: register.fields.filter(function (f) {
            return (0,_jacdac_ts_jacdac_spec_spectool_jdspec__WEBPACK_IMPORTED_MODULE_3__/* .isNumericType */ .FV)(f);
          }).map(function (field) {
            return [(0,_jacdac_ts_jacdac_spec_spectool_jdspec__WEBPACK_IMPORTED_MODULE_3__/* .humanify */ .lW)(field.name), fieldName(register, field)];
          })
        } : undefined].filter(function (v) {
          return !!v;
        }),
        inputsInline: true,
        output: "Number",
        colour: _this4.serviceColor(service),
        tooltip: register.description,
        helpUrl: serviceHelp(service),
        service: service,
        register: register,
        template: "register_get"
      };
    });
  };

  _proto.makeRegisterEnumGetBlocks = function makeRegisterEnumGetBlocks(registers, client) {
    var _this5 = this;

    if (client === void 0) {
      client = true;
    }

    return registers.map(function (_ref14) {
      var _customMessage2;

      var service = _ref14.service,
          register = _ref14.register,
          field = _ref14.field,
          einfo = _ref14.einfo;
      return {
        kind: "block",
        type: "jacdac_get_enum_" + service.shortId + "_" + register.name + "_" + field.name + (client ? "" : "_server"),
        message0: ((_customMessage2 = customMessage(service, register, field)) === null || _customMessage2 === void 0 ? void 0 : _customMessage2.get) || "%1 " + (0,_jacdac_ts_jacdac_spec_spectool_jdspec__WEBPACK_IMPORTED_MODULE_3__/* .humanify */ .lW)(register.name) + (field.name === "_" ? "" : " " + field.name) + " %2",
        args0: [roleVariable(service, client), {
          type: "field_dropdown",
          name: field.name,
          options: Object.keys(einfo.members).map(function (member) {
            return [(0,_jacdac_ts_jacdac_spec_spectool_jdspec__WEBPACK_IMPORTED_MODULE_3__/* .humanify */ .lW)(member), member];
          })
        }],
        inputsInline: true,
        output: "Boolean",
        colour: _this5.serviceColor(service),
        tooltip: register.description,
        helpUrl: serviceHelp(service),
        service: service,
        register: register,
        field: field,
        template: "register_get"
      };
    });
  } // generate accessor blocks for event/command data with numbers
  ;

  _proto.makeFieldBlocks = function makeFieldBlocks(sps, client) {
    var _this6 = this;

    if (client === void 0) {
      client = true;
    }

    var worker = function worker(sp, output, filter) {
      var service = sp.service,
          packets = sp.packets;
      return packets.filter(function (pkt) {
        return pkt.fields.filter(filter).length > 0;
      }).map(function (pkt) {
        return {
          service: service,
          pkt: pkt
        };
      }).map(function (_ref15) {
        var service = _ref15.service,
            pkt = _ref15.pkt;
        return {
          kind: "block",
          type: "jacdac_event_field_" + output.toLowerCase() + "_" + service.shortId + "_" + pkt.name + (client ? "" : "_server"),
          message0: pkt.name + " %1",
          args0: [{
            type: "field_dropdown",
            name: "field",
            options: pkt.fields.map(function (field) {
              return [(0,_jacdac_ts_jacdac_spec_spectool_jdspec__WEBPACK_IMPORTED_MODULE_3__/* .humanify */ .lW)(field.name), field.name];
            })
          }],
          colour: _this6.serviceColor(service),
          inputsInline: true,
          tooltip: "Data fields of the " + pkt.name + " " + (client ? "event" : "command"),
          helpUrl: serviceHelp(service),
          service: service,
          event: pkt,
          output: output,
          template: "event_field"
        };
      });
    };

    return (0,_jacdac_ts_src_jdom_utils__WEBPACK_IMPORTED_MODULE_7__/* .arrayConcatMany */ .ue)((0,_jacdac_ts_src_jdom_utils__WEBPACK_IMPORTED_MODULE_7__/* .arrayConcatMany */ .ue)(eventFieldGroups.map(function (_ref16) {
      var output = _ref16.output,
          filter = _ref16.filter;
      return sps.map(function (sp) {
        return worker(sp, output, filter);
      });
    })));
  };

  _proto.createCategoryHelper = function createCategoryHelper(options) {
    var _source$blocks,
        _this7 = this;

    var theme = options.theme,
        source = options.source,
        liveServices = options.liveServices;
    this.serviceColor = createServiceColor(theme);
    var blockServices = (source === null || source === void 0 ? void 0 : source.variables.map(parseRoleType).filter(function (vt) {
      return !!(0,_jacdac_ts_src_jdom_spec__WEBPACK_IMPORTED_MODULE_6__/* .serviceSpecificationFromClassIdentifier */ .d5)(vt.serviceClass);
    })) || [];
    var usedEvents = new Set(source === null || source === void 0 ? void 0 : (_source$blocks = source.blocks) === null || _source$blocks === void 0 ? void 0 : _source$blocks.map(function (block) {
      return {
        block: block,
        definition: (0,_toolbox__WEBPACK_IMPORTED_MODULE_11__/* .resolveBlockDefinition */ .Pq)(block.type)
      };
    }).filter(function (_ref17) {
      var definition = _ref17.definition;
      return (definition === null || definition === void 0 ? void 0 : definition.template) === "event";
    }).map(function (_ref18) {
      var block = _ref18.block,
          definition = _ref18.definition;
      var _ref19 = definition,
          events = _ref19.events;
      if (events.length === 1) return events[0];else {
        var eventName = block.inputs[0].fields["event"].value;
        return events.find(function (ev) {
          return ev.name === eventName;
        });
      }
    }).filter(function (ev) {
      return !!ev;
    }));

    var jdBlocks = this._serviceBlocks.filter(function (block) {
      return !!block.service;
    });

    var services = (0,_jacdac_ts_src_jdom_utils__WEBPACK_IMPORTED_MODULE_7__/* .uniqueMap */ .EM)(jdBlocks, function (block) {
      return block.service.shortId;
    }, function (block) {
      return block.service;
    });
    var toolboxServices = (0,_jacdac_ts_src_jdom_utils__WEBPACK_IMPORTED_MODULE_7__/* .uniqueMap */ .EM)(_jacdac_ts_src_jdom_flags__WEBPACK_IMPORTED_MODULE_5__/* .default.diagnostics */ .Z.diagnostics ? services : [].concat((0,_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_15__/* .default */ .Z)(blockServices.map(function (pair) {
      return services.find(function (service) {
        return service.classIdentifier === pair.serviceClass;
      });
    }).filter(function (srv) {
      return !!srv;
    })), (0,_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_15__/* .default */ .Z)(liveServices.map(function (s) {
      return s.specification;
    }))), function (srv) {
      return srv.shortId;
    }, function (srv) {
      return srv;
    }).filter(function (srv) {
      return srv && ignoredServices.indexOf(srv.classIdentifier) < 0;
    }).sort(function (l, r) {
      return l.name.localeCompare(r.name);
    });

    var getFieldBlocks = function getFieldBlocks(service, fieldBlocks) {
      return fieldBlocks.filter(function (ev) {
        return ev.service === service && usedEvents.has(ev.event);
      }).map(function (block) {
        return {
          kind: "block",
          type: block.type,
          values: block.values
        };
      });
    };

    var makeCategory = function makeCategory(service, isClient, serviceBlocks, eventFieldBLocks) {
      return {
        kind: "category",
        name: service.name + (isClient ? "" : " Server"),
        colour: _this7.serviceColor(service),
        contents: [{
          kind: "button",
          text: "Add " + service.name + " " + (isClient ? "role" : "server"),
          callbackKey: "jacdac_add_role_callback_" + toRoleType(service, isClient),
          callback: function callback(workspace) {
            return blockly__WEBPACK_IMPORTED_MODULE_13__.Variables.createVariableButtonHandler(workspace, null, toRoleType(service, isClient));
          }
        }].concat((0,_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_15__/* .default */ .Z)(serviceBlocks.map(function (block) {
          return {
            kind: "block",
            type: block.type,
            values: block.values
          };
        })), (0,_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_15__/* .default */ .Z)(getFieldBlocks(service, eventFieldBLocks)))
      };
    };

    return function (serviceBlocks, eventFieldBlocks, client) {
      if (client === void 0) {
        client = true;
      }

      return toolboxServices.map(function (serviceClient) {
        return {
          serviceClient: serviceClient,
          serviceBlocks: serviceBlocks.filter(function (block) {
            return block.service === serviceClient;
          })
        };
      }).map(function (sc) {
        return makeCategory(sc.serviceClient, client, sc.serviceBlocks, eventFieldBlocks);
      });
    };
  };

  _proto.compileEventToVM = function compileEventToVM(options) {
    var makeAwaitEvent = function makeAwaitEvent(cmd, role, eventName) {
      return {
        expression: {
          type: "CallExpression",
          arguments: cmd == "awaitEvent" ? [(0,_jacdac_ts_src_vm_compile__WEBPACK_IMPORTED_MODULE_8__/* .toMemberExpression */ .vf)(role.toString(), eventName.toString())] : [(0,_jacdac_ts_src_vm_compile__WEBPACK_IMPORTED_MODULE_8__/* .toIdentifier */ .EB)(role.toString()), (0,_jacdac_ts_src_vm_compile__WEBPACK_IMPORTED_MODULE_8__/* .toIdentifier */ .EB)(eventName.toString())],
          callee: (0,_jacdac_ts_src_vm_compile__WEBPACK_IMPORTED_MODULE_8__/* .toIdentifier */ .EB)(cmd)
        },
        event: {
          role: role.toString(),
          event: eventName.toString()
        }
      };
    };

    var block = options.block,
        definition = options.definition,
        blockToExpression = options.blockToExpression;
    var inputs = block.inputs;
    var template = definition.template;

    switch (template) {
      case "event":
        {
          var role = inputs[0].fields["role"].value;
          var eventName = inputs[0].fields["event"].value;
          return makeAwaitEvent("awaitEvent", role.toString(), eventName.toString());
        }

      case "register_change_event":
        {
          var _role = inputs[0].fields["role"].value;
          var _ref20 = definition,
              register = _ref20.register;

          var _blockToExpression = blockToExpression(undefined, inputs[0].child),
              expr = _blockToExpression.expr,
              errors = _blockToExpression.errors;

          return {
            expression: {
              type: "CallExpression",
              arguments: [(0,_jacdac_ts_src_vm_compile__WEBPACK_IMPORTED_MODULE_8__/* .toMemberExpression */ .vf)(_role.toString(), register.name), expr],
              callee: (0,_jacdac_ts_src_vm_compile__WEBPACK_IMPORTED_MODULE_8__/* .toIdentifier */ .EB)("awaitChange")
            },
            errors: errors
          };
        }

      default:
        {
          var type = block.type;

          switch (type) {
            case ROLE_BOUND_EVENT_BLOCK:
              {
                var _role2 = inputs[0].fields["role"].value;
                var _eventName = inputs[0].fields["event"].value;
                return makeAwaitEvent("roleBound", _role2.toString(), _eventName.toString());
              }
          }
        }
    }

    return undefined;
  };

  _proto.compileExpressionToVM = function compileExpressionToVM(options) {
    var event = options.event,
        definition = options.definition,
        block = options.block;
    var inputs = block.inputs,
        id = block.id;
    var template = definition.template;

    switch (template) {
      case "register_get":
        {
          var _ref21 = definition,
              register = _ref21.register;
          var role = inputs[0].fields["role"].value;
          var _field = inputs[0].fields["field"];
          return {
            expr: (0,_jacdac_ts_src_vm_compile__WEBPACK_IMPORTED_MODULE_8__/* .toMemberExpression */ .vf)(role, _field ? (0,_jacdac_ts_src_vm_compile__WEBPACK_IMPORTED_MODULE_8__/* .toMemberExpression */ .vf)(register.name, _field.value) : register.name),
            errors: []
          };
        }

      case "event_field":
        {
          var _ref22 = definition,
              eventInfo = _ref22.event;
          var errors = [];

          if (event.event !== eventInfo.name) {
            errors.push({
              sourceId: id,
              message: "Event " + eventInfo.name + " is not available in this handler."
            });
          }

          var _field2 = inputs[0].fields["field"];
          return {
            expr: (0,_jacdac_ts_src_vm_compile__WEBPACK_IMPORTED_MODULE_8__/* .toMemberExpression */ .vf)(event.role, (0,_jacdac_ts_src_vm_compile__WEBPACK_IMPORTED_MODULE_8__/* .toMemberExpression */ .vf)(event.event, _field2.value)),
            errors: errors
          };
        }

      default:
        {
          var type = block.type;
          var _errors = [];

          switch (type) {
            case ROLE_BOUND_BLOCK:
              {
                var _role3 = inputs[0].fields["role"].value;
                return {
                  expr: {
                    type: "CallExpression",
                    arguments: [(0,_jacdac_ts_src_vm_compile__WEBPACK_IMPORTED_MODULE_8__/* .toIdentifier */ .EB)(_role3.toString())],
                    callee: (0,_jacdac_ts_src_vm_compile__WEBPACK_IMPORTED_MODULE_8__/* .toMemberExpression */ .vf)("$fun", "roleBoundExpression")
                  },
                  errors: _errors
                };
              }
          }
        }
    }

    return undefined;
  };

  _proto.compileCommandToVM = function compileCommandToVM(options) {
    var event = options.event,
        block = options.block,
        definition = options.definition,
        blockToExpression = options.blockToExpression;
    var template = definition.template;
    var inputs = block.inputs;

    switch (template) {
      case "register_set":
        {
          // TODO: need to handle the case of writing a register with fields
          var _ref23 = definition,
              register = _ref23.register;
          var exprsErrors = inputs.map(function (a) {
            return blockToExpression(event, a.child);
          });
          var role = inputs[0].fields.role.value;
          return {
            cmd: (0,_vm_VMgenerator__WEBPACK_IMPORTED_MODULE_12__/* .makeVMBase */ .IZ)(block, {
              type: "CallExpression",
              arguments: [(0,_jacdac_ts_src_vm_compile__WEBPACK_IMPORTED_MODULE_8__/* .toMemberExpression */ .vf)(role, register.name)].concat((0,_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_15__/* .default */ .Z)(exprsErrors.map(function (p) {
                return p.expr;
              }))),
              callee: (0,_jacdac_ts_src_vm_compile__WEBPACK_IMPORTED_MODULE_8__/* .toIdentifier */ .EB)("writeRegister")
            }),
            errors: exprsErrors.flatMap(function (p) {
              return p.errors;
            })
          };
        }

      case "raiseNo":
      case "raiseArgs":
      case "command":
        {
          var _ref24 = definition,
              serviceCommand = _ref24.command;
          var _role4 = inputs[0].fields.role.value;
          var eventName = template === "raiseNo" ? inputs[0].fields["event"].value.toString() : "";

          var _exprsErrors = template === "raiseNo" ? [] : inputs.map(function (a) {
            return blockToExpression(event, a.child);
          });

          return {
            cmd: (0,_vm_VMgenerator__WEBPACK_IMPORTED_MODULE_12__/* .makeVMBase */ .IZ)(block, {
              type: "CallExpression",
              arguments: _exprsErrors.map(function (p) {
                return p.expr;
              }),
              callee: (0,_jacdac_ts_src_vm_compile__WEBPACK_IMPORTED_MODULE_8__/* .toMemberExpression */ .vf)(_role4, eventName ? eventName : serviceCommand.name)
            }),
            errors: _exprsErrors.flatMap(function (p) {
              return p.errors;
            })
          };
        }

      case "server":
        {
          return {
            cmd: (0,_vm_VMgenerator__WEBPACK_IMPORTED_MODULE_12__/* .makeVMBase */ .IZ)(block, {
              type: "CallExpression",
              arguments: [],
              callee: (0,_jacdac_ts_src_vm_compile__WEBPACK_IMPORTED_MODULE_8__/* .toIdentifier */ .EB)("nop")
            }),
            errors: []
          };
        }

      default:
        {
          var type = block.type;

          switch (type) {
            case SET_STATUS_LIGHT_BLOCK:
              {
                console.log("SET_STATUS");
              }
          }
        }
    }

    return undefined;
  };

  return ServicesBaseDSL;
}();

/***/ }),

/***/ 96958:
/***/ (function(__unused_webpack_module, __webpack_exports__) {

var builtins = {
  jacdac_on_off: function jacdac_on_off(block) {
    return block.getFieldValue("value") === "on";
  },
  jacdac_yes_no: function jacdac_yes_no(block) {
    return block.getFieldValue("value") === "on";
  },
  jacdac_time_picker: function jacdac_time_picker(block) {
    return Number(block.getFieldValue("value") || "0");
  },
  jacdac_angle: function jacdac_angle(block) {
    return Number(block.getFieldValue("value") || "0");
  },
  jacdac_percent: function jacdac_percent(block) {
    return Number(block.getFieldValue("value") || "0");
  },
  jacdac_ratio: function jacdac_ratio(block) {
    return Number(block.getFieldValue("value") || "0");
  }
};
var shadowDsl = {
  id: "shadow",
  createBlocks: function createBlocks() {
    return [{
      kind: "block",
      type: "jacdac_on_off",
      message0: "%1",
      args0: [{
        type: "field_dropdown",
        name: "value",
        options: [["enabled", "on"], ["disabled", "off"]]
      }],
      style: "logic_blocks",
      output: "Boolean"
    }, {
      kind: "block",
      type: "jacdac_yes_no",
      message0: "%1",
      args0: [{
        type: "field_dropdown",
        name: "value",
        options: [["yes", "on"], ["no", "off"]]
      }],
      style: "logic_blocks",
      output: "Boolean"
    }, {
      kind: "block",
      type: "jacdac_time_picker",
      message0: "%1",
      args0: [{
        type: "field_dropdown",
        name: "value",
        options: [["0.1", "0.1"], ["1", "1"], ["5", "5"], ["30", "30"], ["60", "60"]]
      }],
      style: "math_blocks",
      output: "Number"
    }, {
      kind: "block",
      type: "jacdac_angle",
      message0: "%1",
      args0: [{
        type: "field_angle",
        name: "value",
        min: 0,
        max: 360,
        precision: 10
      }],
      style: "math_blocks",
      output: "Number"
    }, {
      kind: "block",
      type: "jacdac_percent",
      message0: "%1",
      args0: [{
        type: "field_slider",
        name: "value",
        min: 0,
        max: 100,
        precision: 1
      }],
      style: "math_blocks",
      output: "Number"
    }, {
      kind: "block",
      type: "jacdac_byte",
      message0: "%1",
      args0: [{
        type: "field_slider",
        name: "value",
        min: 0,
        max: 255,
        precision: 1
      }],
      style: "math_blocks",
      output: "Number"
    }, {
      kind: "block",
      type: "jacdac_ratio",
      message0: "%1",
      args0: [{
        type: "field_slider",
        name: "value",
        min: 0,
        max: 1,
        precision: 0.1
      }],
      style: "math_blocks",
      output: "Number"
    }, {
      kind: "block",
      type: "jacdac_color",
      message0: "%1",
      args0: [{
        type: "field_colour",
        name: "col",
        colour: "#ff0000",
        colourOptions: ["#ff0000", "#ff8000", "#ffff00", "#ff9da5", "#00ff00", "#b09eff", "#00ffff", "#007fff", "#65471f", "#0000ff", "#7f00ff", "#ff0080", "#ff00ff", "#ffffff", "#999999", "#000000"],
        columns: 4
      }],
      style: "math_blocks",
      output: "Color"
    }];
  },
  blockToValue: function blockToValue(block) {
    var _builtins$block$type;

    return (_builtins$block$type = builtins[block.type]) === null || _builtins$block$type === void 0 ? void 0 : _builtins$block$type.call(builtins, block);
  }
};
/* harmony default export */ __webpack_exports__["Z"] = (shadowDsl);

/***/ }),

/***/ 86947:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _jacdac_ts_src_vm_compile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(79973);
/* harmony import */ var _vm_VMgenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15056);


var variablesDsl = {
  id: "variables",
  types: ["variables_get", "variables_set", "math_change"],
  createCategory: function createCategory() {
    return [{
      kind: "category",
      name: "Variables",
      colour: "%{BKY_VARIABLES_HUE}",
      custom: "VARIABLE"
    }];
  },
  compileExpressionToVM: function compileExpressionToVM(_ref) {
    var block = _ref.block;
    var type = block.type,
        inputs = block.inputs;

    if (type === "variables_get") {
      var variable = inputs[0].fields.var.value;
      var ret = {
        expr: (0,_jacdac_ts_src_vm_compile__WEBPACK_IMPORTED_MODULE_0__/* .toMemberExpression */ .vf)("$var", variable.toString()),
        errors: []
      };
      return ret;
    }

    return undefined;
  },
  compileCommandToVM: function compileCommandToVM(_ref2) {
    var event = _ref2.event,
        block = _ref2.block,
        blockToExpression = _ref2.blockToExpression;
    var type = block.type,
        inputs = block.inputs;

    if (type === "math_change" || type === "variables_set") {
      var _blockToExpression = blockToExpression(event, inputs[0].child),
          expr = _blockToExpression.expr,
          errors = _blockToExpression.errors;

      var variable = inputs[0].fields.var.value;
      return {
        cmd: (0,_vm_VMgenerator__WEBPACK_IMPORTED_MODULE_1__/* .makeVMBase */ .IZ)(block, {
          type: "CallExpression",
          arguments: [(0,_jacdac_ts_src_vm_compile__WEBPACK_IMPORTED_MODULE_0__/* .toMemberExpression */ .vf)("$var", variable.toString()), type === "variables_set" ? expr : {
            type: "BinaryExpression",
            operator: "+",
            left: (0,_jacdac_ts_src_vm_compile__WEBPACK_IMPORTED_MODULE_0__/* .toMemberExpression */ .vf)("$var", variable.toString()),
            right: expr
          }],
          callee: (0,_jacdac_ts_src_vm_compile__WEBPACK_IMPORTED_MODULE_0__/* .toIdentifier */ .EB)("writeLocal")
        }),
        errors: errors
      };
    }

    return undefined;
  }
};
/* harmony default export */ __webpack_exports__["Z"] = (variablesDsl);

/***/ }),

/***/ 15056:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IZ": function() { return /* binding */ makeVMBase; },
/* harmony export */   "cC": function() { return /* binding */ processErrors; },
/* harmony export */   "ZP": function() { return /* binding */ workspaceJSONToVMProgram; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(85061);
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(41788);
/* harmony import */ var _babel_runtime_helpers_esm_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(57869);
/* harmony import */ var _jacdac_ts_src_vm_compile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(79973);
/* harmony import */ var _blockly_toolbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16582);
/* harmony import */ var blockly__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(74640);
/* harmony import */ var blockly__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(blockly__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _blockly_dsl_dsl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(94113);
/* harmony import */ var _blockly_dsl_servicesbase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21910);
/* harmony import */ var _jacdac_ts_src_jdom_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(81794);









var makeVMBase = function makeVMBase(block, command) {
  return {
    sourceId: block.id,
    type: "cmd",
    command: command
  };
};
var processErrors = function processErrors(block, errors) {
  return errors.map(function (e) {
    return {
      sourceId: e.sourceId ? e.sourceId : block.id,
      message: e.message
    };
  });
};
function workspaceJSONToVMProgram(workspace, dsls) {
  console.debug("compile vm", {
    workspace: workspace,
    dsls: dsls
  });
  if (!workspace) return undefined;

  var _splitFilter = (0,_jacdac_ts_src_jdom_utils__WEBPACK_IMPORTED_MODULE_5__/* .splitFilter */ .ap)(workspace.variables.filter(function (v) {
    return _blockly_toolbox__WEBPACK_IMPORTED_MODULE_1__/* .BUILTIN_TYPES.indexOf */ .Nd.indexOf(v.type) < 0;
  }).map(_blockly_dsl_servicesbase__WEBPACK_IMPORTED_MODULE_4__/* .parseRoleType */ .eS), function (r) {
    return r.client;
  }),
      roles = _splitFilter[0],
      serverRoles = _splitFilter[1];

  var EmptyExpression = /*#__PURE__*/function (_Error) {
    (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_6__/* .default */ .Z)(EmptyExpression, _Error);

    function EmptyExpression() {
      return _Error.apply(this, arguments) || this;
    }

    return EmptyExpression;
  }( /*#__PURE__*/(0,_babel_runtime_helpers_esm_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_7__/* .default */ .Z)(Error));

  var blockToExpression = function blockToExpression(ev, blockIn) {
    var errors = [];

    var blockToExpressionInner = function blockToExpressionInner(ev, block) {
      if (!block) {
        throw new EmptyExpression();
      }

      var type = block.type,
          value = block.value,
          inputs = block.inputs;
      console.log("block2e", {
        ev: ev,
        block: block,
        type: type,
        value: value,
        inputs: inputs
      });
      if (value !== undefined) // literal
        return {
          type: "Literal",
          value: value,
          raw: value + ""
        };
      var dsl = (0,_blockly_dsl_dsl__WEBPACK_IMPORTED_MODULE_3__/* .resolveDsl */ .u)(dsls, type);

      if (!dsl) {
        console.warn("unknown block " + type, {
          type: type,
          ev: ev,
          block: block,
          d: (blockly__WEBPACK_IMPORTED_MODULE_2___default().Blocks)[type]
        });
        errors.push({
          sourceId: block.id,
          message: "unknown block " + type
        });
      } else {
        var _dsl$compileExpressio;

        var definition = (0,_blockly_toolbox__WEBPACK_IMPORTED_MODULE_1__/* .resolveBlockDefinition */ .Pq)(type);
        var res = (_dsl$compileExpressio = dsl.compileExpressionToVM) === null || _dsl$compileExpressio === void 0 ? void 0 : _dsl$compileExpressio.call(dsl, {
          event: ev,
          definition: definition,
          block: block,
          blockToExpressionInner: blockToExpressionInner
        });

        if (res) {
          if (res.errors) res.errors.forEach(function (e) {
            return errors.push(e);
          });
          return res.expr;
        }

        var template = definition.template;

        if (template === "shadow") {
          var field = inputs[0].fields["value"];
          var v = field.value;
          return {
            type: "Literal",
            value: v,
            raw: v + ""
          };
        }

        errors.push({
          sourceId: block.id,
          message: "unknown block " + type
        });
        console.warn("unsupported expression block " + type, {
          ev: ev,
          block: block,
          definition: definition
        });
      }

      throw new EmptyExpression();
    };

    return {
      expr: blockToExpressionInner(ev, blockIn),
      errors: errors
    };
  };

  var blockToCommand = function blockToCommand(event, block) {
    var type = block.type,
        inputs = block.inputs;
    console.debug("block2c", {
      event: event,
      type: type,
      block: block,
      inputs: inputs
    });

    switch (type) {
      case "dynamic_if":
        {
          var _inputs$, _inputs$2;

          var thenHandler = {
            commands: [],
            errors: []
          };
          var elseHandler = {
            commands: [],
            errors: []
          };
          var t = (_inputs$ = inputs[1]) === null || _inputs$ === void 0 ? void 0 : _inputs$.child;
          var e = (_inputs$2 = inputs[2]) === null || _inputs$2 === void 0 ? void 0 : _inputs$2.child;

          if (t) {
            addCommands(event, [t].concat((0,_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_8__/* .default */ .Z)(t.children ? t.children : [])), thenHandler);
          }

          if (e) {
            addCommands(event, [e].concat((0,_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_8__/* .default */ .Z)(e.children ? e.children : [])), elseHandler);
          }

          var exprErrors = undefined;

          try {
            var _inputs$3;

            exprErrors = blockToExpression(event, (_inputs$3 = inputs[0]) === null || _inputs$3 === void 0 ? void 0 : _inputs$3.child);
          } catch (e) {
            if (e instanceof EmptyExpression) {
              exprErrors = {
                expr: {
                  type: "Literal",
                  value: false,
                  raw: "false "
                },
                errors: []
              };
            } else {
              throw e;
            }
          }

          var _exprErrors = exprErrors,
              expr = _exprErrors.expr,
              errors = _exprErrors.errors;
          var ifThenElse = {
            sourceId: block.id,
            type: "ite",
            expr: expr,
            then: thenHandler.commands,
            else: elseHandler.commands
          };
          console.log("dynamic if");
          return {
            cmd: ifThenElse,
            errors: processErrors(block, errors.concat(thenHandler.errors).concat(elseHandler.errors))
          };
        }
      // more builts

      default:
        {
          var dsl = (0,_blockly_dsl_dsl__WEBPACK_IMPORTED_MODULE_3__/* .resolveDsl */ .u)(dsls, type);

          if (dsl) {
            var _dsl$compileCommandTo;

            var definition = (0,_blockly_toolbox__WEBPACK_IMPORTED_MODULE_1__/* .resolveBlockDefinition */ .Pq)(type);
            var template = definition === null || definition === void 0 ? void 0 : definition.template;
            if (template === "meta") return undefined;
            var dslRes = (_dsl$compileCommandTo = dsl.compileCommandToVM) === null || _dsl$compileCommandTo === void 0 ? void 0 : _dsl$compileCommandTo.call(dsl, {
              event: event,
              block: block,
              definition: definition,
              blockToExpression: blockToExpression
            });

            if (dslRes) {
              dslRes.errors = processErrors(block, dslRes.errors);
              return dslRes;
            }
          }

          console.warn("unsupported command block " + type, {
            block: block
          });
          return {
            cmd: undefined,
            errors: [{
              sourceId: block.id,
              message: "unsupported command block " + type
            }]
          };
        }
    }
  };

  var nop = {
    type: "CallExpression",
    arguments: [],
    callee: (0,_jacdac_ts_src_vm_compile__WEBPACK_IMPORTED_MODULE_0__/* .toIdentifier */ .EB)("nop")
  };

  var addCommands = function addCommands(event, blocks, handler) {
    blocks === null || blocks === void 0 ? void 0 : blocks.filter(function (child) {
      return !!child;
    }).forEach(function (child) {
      try {
        var _ref = blockToCommand(event, child) || {},
            cmd = _ref.cmd,
            errors = _ref.errors;

        if (cmd) handler.commands.push(cmd);
        errors === null || errors === void 0 ? void 0 : errors.forEach(function (e) {
          return handler.errors.push(e);
        });
      } catch (e) {
        if (e instanceof EmptyExpression) {
          handler.commands.push({
            sourceId: child.id,
            type: "cmd",
            command: nop
          });
        } else {
          console.debug(e);
        }
      }
    });
  };

  var handlers = workspace.blocks.map(function (top) {
    var _topErrors2;

    var type = top.type;
    var command;
    var topEvent;
    var topErrors;
    var topMeta = false;

    try {
      var _dsl$compileEventToVM, _topErrors;

      var dsl = (0,_blockly_dsl_dsl__WEBPACK_IMPORTED_MODULE_3__/* .resolveDsl */ .u)(dsls, type);
      var definition = (0,_blockly_toolbox__WEBPACK_IMPORTED_MODULE_1__/* .resolveBlockDefinition */ .Pq)(type);

      var _ref2 = (dsl === null || dsl === void 0 ? void 0 : (_dsl$compileEventToVM = dsl.compileEventToVM) === null || _dsl$compileEventToVM === void 0 ? void 0 : _dsl$compileEventToVM.call(dsl, {
        block: top,
        definition: definition,
        blockToExpression: blockToExpression
      })) || {},
          expression = _ref2.expression,
          errors = _ref2.errors,
          event = _ref2.event,
          meta = _ref2.meta;

      command = expression;
      topErrors = errors;
      topEvent = event;
      topMeta = meta; // if dsl didn't compile anything try again

      var _ref3 = definition || {},
          template = _ref3.template;

      if (!command && !((_topErrors = topErrors) !== null && _topErrors !== void 0 && _topErrors.length)) {
        switch (template) {
          case "meta":
            {
              break;
            }

          default:
            {
              topErrors = [{
                sourceId: top.id,
                message: "unsupported handler block " + type
              }];
              console.debug("unsupported handler template " + template + " for " + type, {
                top: top
              });
              break;
            }
        }
      }
    } catch (e) {
      console.debug(e);

      if (e instanceof EmptyExpression) {
        return undefined;
      } else {
        throw e;
      }
    } // nothing to compile here


    if (!command && !((_topErrors2 = topErrors) !== null && _topErrors2 !== void 0 && _topErrors2.length)) return undefined;
    var handler = {
      commands: [{
        sourceId: top.id,
        type: "cmd",
        command: command
      }],
      errors: topErrors || [],
      meta: !!topMeta
    };
    addCommands(topEvent, top.children, handler);
    return handler;
  }).filter(function (handler) {
    return !!handler;
  });
  return {
    roles: roles,
    serverRoles: serverRoles,
    handlers: handlers
  };
}

/***/ })

}]);