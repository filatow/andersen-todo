// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/nanoid/url-alphabet/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlAlphabet = void 0;
let urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
exports.urlAlphabet = urlAlphabet;
},{}],"node_modules/nanoid/index.browser.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.random = exports.nanoid = exports.customRandom = exports.customAlphabet = void 0;
Object.defineProperty(exports, "urlAlphabet", {
  enumerable: true,
  get: function () {
    return _index.urlAlphabet;
  }
});

var _index = require("./url-alphabet/index.js");

if ("development" !== 'production') {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative' && typeof crypto === 'undefined') {
    throw new Error('React Native does not have a built-in secure random generator. ' + 'If you don’t need unpredictable IDs use `nanoid/non-secure`. ' + 'For secure IDs, import `react-native-get-random-values` ' + 'before Nano ID.');
  }

  if (typeof msCrypto !== 'undefined' && typeof crypto === 'undefined') {
    throw new Error('Import file with `if (!window.crypto) window.crypto = window.msCrypto`' + ' before importing Nano ID to fix IE 11 support');
  }

  if (typeof crypto === 'undefined') {
    throw new Error('Your browser does not have secure random generator. ' + 'If you don’t need unpredictable IDs, you can use nanoid/non-secure.');
  }
}

var random = function random(bytes) {
  return crypto.getRandomValues(new Uint8Array(bytes));
};

exports.random = random;

var customRandom = function customRandom(alphabet, size, getRandom) {
  var mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1;
  var step = -~(1.6 * mask * size / alphabet.length);
  return function () {
    var id = '';

    while (true) {
      var bytes = getRandom(step);
      var j = step;

      while (j--) {
        id += alphabet[bytes[j] & mask] || '';
        if (id.length === size) return id;
      }
    }
  };
};

exports.customRandom = customRandom;

var customAlphabet = function customAlphabet(alphabet, size) {
  return customRandom(alphabet, size, random);
};

exports.customAlphabet = customAlphabet;

var nanoid = function nanoid() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 21;
  var id = '';
  var bytes = crypto.getRandomValues(new Uint8Array(size));

  while (size--) {
    var byte = bytes[size] & 63;

    if (byte < 36) {
      id += byte.toString(36);
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase();
    } else if (byte < 63) {
      id += '_';
    } else {
      id += '-';
    }
  }

  return id;
};

exports.nanoid = nanoid;
},{"./url-alphabet/index.js":"node_modules/nanoid/url-alphabet/index.js"}],"js/Abstract.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Abstract = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var _state = /*#__PURE__*/new WeakMap();

var _binding = /*#__PURE__*/new WeakMap();

var Abstract = /*#__PURE__*/function () {
  function Abstract() {
    _classCallCheck(this, Abstract);

    _classPrivateFieldInitSpec(this, _state, {
      writable: true,
      value: {}
    });

    _classPrivateFieldInitSpec(this, _binding, {
      writable: true,
      value: {}
    });

    if ((this instanceof Abstract ? this.constructor : void 0) === Abstract) {
      throw new Error("Can't instantiate Abstract, only concrete one.");
    }
  }

  _createClass(Abstract, [{
    key: "state",
    get: function get() {
      // temporary; for debug only
      return _classPrivateFieldGet(this, _state);
    }
  }, {
    key: "binding",
    get: function get() {
      // temporary; for debug only
      return _classPrivateFieldGet(this, _binding);
    }
  }, {
    key: "getState",
    value: function getState(variable) {
      return _classPrivateFieldGet(this, _state)[variable];
    }
  }, {
    key: "setState",
    value: function setState(variable, value) {
      if (typeof variable !== 'string') return;
      _classPrivateFieldGet(this, _state)[variable] = value;
      this.updateBinding(variable);
    }
  }, {
    key: "setBinding",
    value: function setBinding(stateVariable, bindedElement, format) {
      var property = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'value';
      if (typeof property !== 'string') return;

      function updateElementValue(newValue) {
        if (typeof format === 'function') {
          bindedElement[property] = format(newValue);
        } else {
          bindedElement[property] = newValue;
        }
      }

      if (_classPrivateFieldGet(this, _binding)[stateVariable]) {
        _classPrivateFieldGet(this, _binding)[stateVariable].push(updateElementValue);
      } else {
        _classPrivateFieldGet(this, _binding)[stateVariable] = [updateElementValue];
      }
    }
  }, {
    key: "updateBinding",
    value: function updateBinding(variable) {
      var _this = this;

      if (!_classPrivateFieldGet(this, _binding)[variable]) {
        return;
      }

      ;

      _classPrivateFieldGet(this, _binding)[variable].forEach(function (updateFunc) {
        updateFunc(_classPrivateFieldGet(_this, _state)[variable]);
      });
    }
  }]);

  return Abstract;
}();

exports.Abstract = Abstract;
},{}],"js/consts.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortingType = exports.positionToInsert = exports.newItem = exports.keyCode = exports.filterByStatus = exports.editItem = exports.DAY_IN_MS = void 0;
var DAY_IN_MS = 86400000;
exports.DAY_IN_MS = DAY_IN_MS;
var positionToInsert = {
  BEFORE_BEGIN: 'beforebegin',
  AFTER_BEGIN: 'afterbegin',
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend'
};
exports.positionToInsert = positionToInsert;
var keyCode = {
  ENTER: 'Enter'
};
exports.keyCode = keyCode;
var newItem = {
  TEXT: 'newItemText',
  CREATION_DATE: 'newItemCreationDate',
  EXPIRATION_DATE: 'newItemExpirationDate'
};
exports.newItem = newItem;
var editItem = {
  ID: 'editItemId',
  TEXT: 'editItemText',
  CREATION_DATE: 'editItemCreationDate',
  EXPIRATION_DATE: 'editItemExpirationDate'
};
exports.editItem = editItem;
var filterByStatus = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
};
exports.filterByStatus = filterByStatus;
var sortingType = {
  UNSORTED: 'unsorted',
  BY_TEXT: 'by-text',
  BY_CREATION_DATE: 'by-creation-date',
  BY_EXPIRATION_DATE: 'by-expiration-date'
};
exports.sortingType = sortingType;
},{}],"node_modules/dayjs/dayjs.min.js":[function(require,module,exports) {
var define;
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).dayjs=e()}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",v={};v[D]=M;var p=function(t){return t instanceof _},S=function(t,e,n){var r;if(!t)return D;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else{var i=t.name;v[i]=t,r=i}return!n&&r&&(D=r),r||!n&&D},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var D=this.$locale().weekStart||0,v=(y<D?y+7:y)-D;return $(r?m-v:m+(6-v),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,D=O.m(this,M);return D=(l={},l[c]=D/12,l[f]=D,l[h]=D/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?D:O.a(D)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return v[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=v[D],w.Ls=v,w.p={},w}));
},{}],"js/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDate = formatDate;
exports.sanitize = sanitize;

var _dayjs = _interopRequireDefault(require("dayjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sanitize(input, invalidChar) {
  return input.replaceAll(invalidChar, '');
}

function formatDate(date) {
  return (0, _dayjs.default)(date).format('YYYY-MM-DD');
}
},{"dayjs":"node_modules/dayjs/dayjs.min.js"}],"js/TodoItem.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodoItem = void 0;

var _nanoid = require("nanoid");

var _Abstract2 = require("./Abstract");

var _consts = require("./consts");

var _utils = require("./utils");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var CHARS_IN_ID = 8;

var _id = /*#__PURE__*/new WeakMap();

var _text = /*#__PURE__*/new WeakMap();

var _isDone = /*#__PURE__*/new WeakMap();

var _creationDate = /*#__PURE__*/new WeakMap();

var _expirationDate = /*#__PURE__*/new WeakMap();

var TodoItem = /*#__PURE__*/function (_Abstract) {
  _inherits(TodoItem, _Abstract);

  var _super = _createSuper(TodoItem);

  function TodoItem(text, creationDate, expirationDate) {
    var _this;

    _classCallCheck(this, TodoItem);

    _this = _super.call(this);

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _id, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _text, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _isDone, {
      writable: true,
      value: false
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _creationDate, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _expirationDate, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(_assertThisInitialized(_this), _id, (0, _nanoid.nanoid)(CHARS_IN_ID));

    _classPrivateFieldSet(_assertThisInitialized(_this), _text, text);

    _classPrivateFieldSet(_assertThisInitialized(_this), _creationDate, creationDate || (0, _utils.formatDate)(new Date()));

    _classPrivateFieldSet(_assertThisInitialized(_this), _expirationDate, expirationDate || (0, _utils.formatDate)(new Date(Date.parse(_classPrivateFieldGet(_assertThisInitialized(_this), _creationDate)) + _consts.DAY_IN_MS)));

    return _this;
  }

  _createClass(TodoItem, [{
    key: "text",
    get: function get() {
      return _classPrivateFieldGet(this, _text);
    },
    set: function set(value) {
      _classPrivateFieldSet(this, _text, value);
    }
  }, {
    key: "id",
    get: function get() {
      return _classPrivateFieldGet(this, _id);
    }
  }, {
    key: "isDone",
    get: function get() {
      return _classPrivateFieldGet(this, _isDone);
    },
    set: function set(value) {
      _classPrivateFieldSet(this, _isDone, value);
    }
  }, {
    key: "creationDate",
    get: function get() {
      return _classPrivateFieldGet(this, _creationDate);
    },
    set: function set(value) {
      _classPrivateFieldSet(this, _creationDate, value);
    }
  }, {
    key: "expirationDate",
    get: function get() {
      return _classPrivateFieldGet(this, _expirationDate);
    },
    set: function set(value) {
      _classPrivateFieldSet(this, _expirationDate, value);
    }
  }, {
    key: "getMarkup",
    value: function getMarkup() {
      return "\n    <li\n      class=\"list-group-item list-group-item-warning d-flex justify-content-between align-items-center\"\n      data-id=".concat(_classPrivateFieldGet(this, _id), "\n    >\n      <label ").concat(_classPrivateFieldGet(this, _isDone) ? 'class="text-decoration-line-through text-secondary"' : '', ">\n        <input\n          class=\"form-check-input me-1\"\n          type=\"checkbox\"\n          ").concat(_classPrivateFieldGet(this, _isDone) ? 'checked' : '', "\n          ").concat(_classPrivateFieldGet(this, _isDone) ? 'disabled' : '', "\n        />\n        ").concat(_classPrivateFieldGet(this, _text), "\n      </label>\n      <div>\n        <button type=\"button\" class=\"btn btn-outline-danger delete-item\" title=\"delete item\">\n          <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\"    fill=\"currentColor\" class=\"bi bi-x\" viewBox=\"0 0 16 16\">\n            <path d=\"M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z\"/>\n          </svg>\n        </button>\n        <button\n          type=\"button\"\n          class=\"btn btn-outline-primary edit-item\"\n          title=\"edit item\"\n          data-bs-toggle=\"modal\"\n          data-bs-target=\"#edit-item-modal\"\n        >\n          <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\"  fill=\"currentColor\" class=\"bi bi-pencil\" viewBox=\"0 0 16 16\">\n            <path d=\"M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z\"/>\n          </svg>\n        </button>\n      </div>\n    </li>");
    }
  }]);

  return TodoItem;
}(_Abstract2.Abstract);

exports.TodoItem = TodoItem;
},{"nanoid":"node_modules/nanoid/index.browser.js","./Abstract":"js/Abstract.js","./consts":"js/consts.js","./utils":"js/utils.js"}],"js/TodoList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodoList = void 0;

var _TodoItem = require("./TodoItem");

var _consts = require("./consts");

var _utils = require("./utils");

var _Abstract2 = require("./Abstract");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var getNewItemInputGroupMarkup = function getNewItemInputGroupMarkup() {
  var newItemInputGroupMarkup = "\n  <div class=\"input-group mb-3\">\n    <button\n      class=\"btn btn-outline-light fs-5 toggle-sort-and-filter-panel-button\"\n      type=\"button\"\n    >\n    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-funnel-fill\" viewBox=\"0 0 16 16\">\n      <path d=\"M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z\"/>\n    </svg>\n    </button>\n    <input\n      type=\"text\" class=\"form-control\"\n      id=\"new-item-input\" placeholder=\"Enter task text...\"\n    >\n    <button\n      class=\"btn btn-warning fs-4\"\n      type=\"button\"\n      data-bs-toggle=\"modal\"\n      data-bs-target=\"#new-item-modal\"\n    >+</button>\n  </div>";
  return newItemInputGroupMarkup;
};

var getSortAndFilterPanelMarkup = function getSortAndFilterPanelMarkup() {
  var sortAndFilterPanelMarkup = "\n  <div class=\"d-none\" id=\"sort-and-filter-panel\">\n    <div\n      class=\"row row-cols-lg-auto g-3 align-items-center text-white mb-3\"\n    >\n      <div class=\"col\">\n        <span class=\"fs-6 fw-bold\">Sort by</span>\n      </div>\n      <div class=\"col\">\n        <select class=\"form-select\" id=\"sorting-type-select\">\n          <option value=\"unsorted\" selected>Choose...</option>\n          <option value=\"by-text\">Text</option>\n          <option value=\"by-creation-date\">Creation date</option>\n          <option value=\"by-expiration-date\">\n            Expiration date\n          </option>\n        </select>\n      </div>\n      <div class=\"col\">\n        <div class=\"form-check\">\n          <label\n            class=\"form-check-label\"\n            for=\"reverse-sorting-order\"\n          >\n            <input\n              class=\"form-check-input\"\n              type=\"checkbox\"\n              id=\"reverse-sorting-order\"\n            />\n            reverse order\n          </label>\n        </div>\n      </div>\n    </div>\n    <div class=\"row mb-1 text-white\">\n      <div class=\"col\">\n        <span class=\"fs-6 fw-bold\">Search by :</span>\n      </div>\n    </div>\n    <div class=\"row text-white\">\n      <div class=\"col\">\n        <label for=\"search-by-text-input\" class=\"form-label\"\n          >Text</label\n        >\n        <div class=\"input-group mb-3\">\n          <input\n            type=\"text\"\n            class=\"form-control\"\n            id=\"search-by-text-input\"\n            placeholder=\"Enter text...\"\n          />\n        </div>\n      </div>\n      <div class=\"col\">\n        <label for=\"search-by-creation-date-input\" class=\"form-label\"\n          >Creation date</label\n        >\n        <input\n          type=\"date\"\n          class=\"form-control\"\n          id=\"search-by-creation-date-input\"\n        />\n      </div>\n      <div class=\"col\">\n        <label for=\"search-by-expiration-date-input\" class=\"form-label\"\n          >Expiration date</label\n        >\n        <input\n          type=\"date\"\n          class=\"form-control\"\n          id=\"search-by-expiration-date-input\"\n        />\n      </div>\n    </div>\n  </div>";
  return sortAndFilterPanelMarkup;
};

var getTodoListMarkup = function getTodoListMarkup() {
  var todoItemsMarkup = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var todoListMarkup = "<ul class=\"list-group mb-3\">".concat(todoItemsMarkup, "</ul>");
  return todoListMarkup;
};

var getNewItemCreateModalMarkup = function getNewItemCreateModalMarkup(itemCreationDate, itemExpirationDate) {
  var newItemModalMarkup = "\n  <div class=\"modal fade\" id=\"new-item-modal\" tabindex=\"-1\">\n    <div class=\"modal-dialog modal-dialog-centered\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <h5 class=\"modal-title\">New task</h5>\n          <button\n            type=\"button\"\n            class=\"btn-close\"\n            data-bs-dismiss=\"modal\"\n          ></button>\n        </div>\n        <div class=\"modal-body\">\n          <div class=\"input-group mb-3\">\n            <input\n              type=\"text\"\n              class=\"form-control\"\n              id=\"new-item-input-modal\"\n              placeholder=\"Enter text...\"\n            />\n          </div>\n          <div class=\"row\">\n            <div class=\"col\">\n              <label for=\"creation-date-input-modal\" class=\"form-label\">Creation date</label>\n              <input\n                type=\"date\"\n                class=\"form-control\"\n                id=\"creation-date-input-modal\"\n                value=\"".concat(itemCreationDate, "\"\n              />\n            </div>\n            <div class=\"col\">\n              <label for=\"expiration-date-input-modal\" class=\"form-label\">Expiration date</label>\n              <input\n                type=\"date\"\n                class=\"form-control\"\n                id=\"expiration-date-input-modal\"\n                min=\"").concat(itemCreationDate, "\"\n                value=\"").concat(itemExpirationDate, "\"\n              />\n            </div>\n          </div>\n        </div>\n        <div class=\"modal-footer\">\n          <button\n            type=\"button\"\n            class=\"btn btn-outline-secondary\"\n            data-bs-dismiss=\"modal\"\n          >\n            Cancel\n          </button>\n          <button\n            type=\"button\" class=\"btn btn-primary\"\n            id=\"create-new-item-button-modal\"\n          >\n            Create\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>");
  return newItemModalMarkup;
};

var getEditItemModalMarkup = function getEditItemModalMarkup(itemCreationDate, itemExpirationDate) {
  var editItemModalMarkup = "\n  <div class=\"modal fade\" id=\"edit-item-modal\" tabindex=\"-1\">\n    <div class=\"modal-dialog modal-dialog-centered\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <h5 class=\"modal-title\">Edit task</h5>\n          <button\n            type=\"button\"\n            class=\"btn-close\"\n            data-bs-dismiss=\"modal\"\n          ></button>\n        </div>\n        <div class=\"modal-body\">\n          <div class=\"input-group mb-3\">\n            <input\n              type=\"text\"\n              class=\"form-control\"\n              id=\"edit-item-input-modal\"\n              placeholder=\"Enter text...\"\n            />\n          </div>\n          <div class=\"row\">\n            <div class=\"col\">\n              <label for=\"edit-creation-date-input-modal\" class=\"form-label\">Creation date</label>\n              <input\n                type=\"date\"\n                class=\"form-control\"\n                id=\"edit-creation-date-input-modal\"\n                value=\"".concat(itemCreationDate, "\"\n              />\n            </div>\n            <div class=\"col\">\n              <label for=\"edit-expiration-date-input-modal\" class=\"form-label\">Expiration date</label>\n              <input\n                type=\"date\"\n                class=\"form-control\"\n                id=\"edit-expiration-date-input-modal\"\n                value=\"").concat(itemExpirationDate, "\"\n              />\n            </div>\n          </div>\n        </div>\n        <div class=\"modal-footer\">\n          <button\n            type=\"button\"\n            class=\"btn btn-outline-secondary\"\n            data-bs-dismiss=\"modal\"\n          >\n            Cancel\n          </button>\n          <button\n            type=\"button\" class=\"btn btn-primary\"\n            data-bs-dismiss=\"modal\"\n            id=\"save-edited-item-button-modal\"\n          >\n            Save\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>");
  return editItemModalMarkup;
};

var getFilterBarMarkup = function getFilterBarMarkup() {
  var filterBarMarkup = "\n    <div\n      id=\"filter-bar\"\n      class=\"d-flex justify-content-between align-items-center\"\n    >\n      <div class=\"d-inline-block\">\n        <span class=\"badge bg-light text-dark\">\n          <span class=\"active-items-count fs-6\">10</span> items left\n        </span>\n      </div>\n      <div class=\"d-inline-block\">\n        <button\n          type=\"button\"\n          class=\"btn btn-light status-filter-button \n          status-filter-all-button\"\n        >\n          All\n        </button>\n        <button\n          type=\"button\"\n          class=\"btn btn-outline-light status-filter-button status-filter-active-button\"\n        >\n          Active\n        </button>\n        <button\n          type=\"button\"\n          class=\"btn btn-outline-light status-filter-button status-filter-completed-button\"\n        >\n          Completed\n        </button>\n        <button type=\"button\" class=\"btn btn-outline-warning clear-completed-button\">\n          Clear completed\n        </button>\n      </div>\n    </div>\n  ";
  return filterBarMarkup;
};

var _container = /*#__PURE__*/new WeakMap();

var _todoItems = /*#__PURE__*/new WeakMap();

var _defaultListItemCreationDate = /*#__PURE__*/new WeakMap();

var _defaultListItemExpirationDate = /*#__PURE__*/new WeakMap();

var _viewSetting = /*#__PURE__*/new WeakMap();

var _setDefaultNewItemValues = /*#__PURE__*/new WeakSet();

var _listItemCheckboxClickHandler = /*#__PURE__*/new WeakMap();

var _listItemDeleteButtonClickHandler = /*#__PURE__*/new WeakMap();

var _listItemEditButtonClickHandler = /*#__PURE__*/new WeakMap();

var _editCreationDateInputModalChangeHandler = /*#__PURE__*/new WeakMap();

var _enterKeydownHandler = /*#__PURE__*/new WeakMap();

var _newItemInputHandler = /*#__PURE__*/new WeakMap();

var _creationDateInputModalChangeHandler = /*#__PURE__*/new WeakMap();

var _expirationDateInputModalChangeHandler = /*#__PURE__*/new WeakMap();

var _saveNewItemButtonModalClickHandler = /*#__PURE__*/new WeakMap();

var _saveEditedItemButtonModalClickHandler = /*#__PURE__*/new WeakMap();

var _activeTodoItemsCountIncrement = /*#__PURE__*/new WeakSet();

var _activeTodoItemsCountDecrement = /*#__PURE__*/new WeakSet();

var _addToList = /*#__PURE__*/new WeakSet();

var _getTodoItemsMarkup = /*#__PURE__*/new WeakMap();

var _updateListOfItems = /*#__PURE__*/new WeakMap();

var _statusFilterButtonClickHandler = /*#__PURE__*/new WeakMap();

var _toggleSortAndFilterPanelButtonClickHandler = /*#__PURE__*/new WeakMap();

var _sortingTypeSelectClickHandler = /*#__PURE__*/new WeakMap();

var _reverseSortingOrderClickHandler = /*#__PURE__*/new WeakMap();

var _searchByTextInputInputHandler = /*#__PURE__*/new WeakMap();

var _searchByCreationDateChangeHandler = /*#__PURE__*/new WeakMap();

var _searchByExpirationDateChangeHandler = /*#__PURE__*/new WeakMap();

var TodoList = /*#__PURE__*/function (_Abstract) {
  _inherits(TodoList, _Abstract);

  var _super = _createSuper(TodoList);

  function TodoList(container) {
    var _this;

    var _items = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, TodoList);

    _this = _super.call(this);

    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _addToList);

    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _activeTodoItemsCountDecrement);

    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _activeTodoItemsCountIncrement);

    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _setDefaultNewItemValues);

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _container, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _todoItems, {
      writable: true,
      value: []
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _defaultListItemCreationDate, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _defaultListItemExpirationDate, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _viewSetting, {
      writable: true,
      value: {
        status: _consts.filterByStatus.ALL,
        sorting: _consts.sortingType.UNSORTED,
        searchByText: null,
        searchByCreationDate: null,
        searchByExpirationDate: null,
        isReversed: false
      }
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _listItemCheckboxClickHandler, {
      writable: true,
      value: function value(evt) {
        var clickedLabel = evt.target.closest('label');
        if (!clickedLabel) return;
        var clickedItemElement = evt.target.closest('li');
        if (!clickedItemElement) return;

        var itemToUpdate = _classPrivateFieldGet(_assertThisInitialized(_this), _todoItems).find(function (item) {
          return item.id === clickedItemElement.dataset.id;
        });

        itemToUpdate.isDone = !itemToUpdate.isDone;

        if (itemToUpdate.isDone) {
          _classPrivateMethodGet(_assertThisInitialized(_this), _activeTodoItemsCountDecrement, _activeTodoItemsCountDecrement2).call(_assertThisInitialized(_this));
        } else {
          _classPrivateMethodGet(_assertThisInitialized(_this), _activeTodoItemsCountIncrement, _activeTodoItemsCountIncrement2).call(_assertThisInitialized(_this));
        }

        _classPrivateFieldGet(_assertThisInitialized(_this), _updateListOfItems).call(_assertThisInitialized(_this));
      }
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _listItemDeleteButtonClickHandler, {
      writable: true,
      value: function value(evt) {
        var button = evt.target.closest('button.delete-item');
        if (!button) return;
        var itemElementToDelete = evt.target.closest('li');
        if (!itemElementToDelete) return;

        var itemToDeleteIndex = _classPrivateFieldGet(_assertThisInitialized(_this), _todoItems).findIndex(function (item) {
          return item.id === itemElementToDelete.dataset.id;
        });

        itemElementToDelete.remove();

        var _classPrivateFieldGet2 = _classPrivateFieldGet(_assertThisInitialized(_this), _todoItems).splice(itemToDeleteIndex, 1),
            _classPrivateFieldGet3 = _slicedToArray(_classPrivateFieldGet2, 1),
            deletedItem = _classPrivateFieldGet3[0];

        if (!deletedItem.isDone) {
          _classPrivateMethodGet(_assertThisInitialized(_this), _activeTodoItemsCountDecrement, _activeTodoItemsCountDecrement2).call(_assertThisInitialized(_this));
        }
      }
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _listItemEditButtonClickHandler, {
      writable: true,
      value: function value(evt) {
        var button = evt.target.closest('button.edit-item');
        if (!button) return;
        var itemToEditElement = evt.target.closest('li');
        if (!itemToEditElement) return;

        var itemToEditIndex = _classPrivateFieldGet(_assertThisInitialized(_this), _todoItems).findIndex(function (item) {
          return item.id === itemToEditElement.dataset.id;
        });

        var itemToEdit = _classPrivateFieldGet(_assertThisInitialized(_this), _todoItems)[itemToEditIndex];

        _this.setState(_consts.editItem.ID, itemToEdit.id);

        _this.setState(_consts.editItem.TEXT, itemToEdit.text);

        _this.setState(_consts.editItem.CREATION_DATE, itemToEdit.creationDate);

        _this.setState(_consts.editItem.EXPIRATION_DATE, itemToEdit.expirationDate);

        var editItemInputModal = _classPrivateFieldGet(_assertThisInitialized(_this), _container).querySelector('#edit-item-input-modal');

        var editCreationDateInputModal = _classPrivateFieldGet(_assertThisInitialized(_this), _container).querySelector('#edit-creation-date-input-modal');

        var editExpirationDateInputModal = _classPrivateFieldGet(_assertThisInitialized(_this), _container).querySelector('#edit-expiration-date-input-modal');

        editItemInputModal.value = itemToEdit.text;
        editCreationDateInputModal.value = itemToEdit.creationDate;
        editExpirationDateInputModal.min = itemToEdit.creationDate;
        editExpirationDateInputModal.value = itemToEdit.expirationDate;
      }
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _editCreationDateInputModalChangeHandler, {
      writable: true,
      value: function value(evt) {
        _this.setState(_consts.editItem.CREATION_DATE, evt.target.value);

        var currentCreationDate = _this.getState(_consts.editItem.CREATION_DATE);

        var currentExpirationDate = _this.getState(_consts.editItem.EXPIRATION_DATE);

        var editExpirationDateInputModal = _classPrivateFieldGet(_assertThisInitialized(_this), _container).querySelector('#edit-expiration-date-input-modal');

        editExpirationDateInputModal.min = currentCreationDate;

        if (currentCreationDate >= currentExpirationDate) {
          editExpirationDateInputModal.value = currentCreationDate;
        }
      }
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _enterKeydownHandler, {
      writable: true,
      value: function value(evt) {
        var enterIsPressed = evt.code === _consts.keyCode.ENTER;

        if (enterIsPressed) {
          if (!_this.getState(_consts.newItem.TEXT)) return;

          _this.addItem();
        }
      }
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _newItemInputHandler, {
      writable: true,
      value: function value(evt) {
        var invalidChar = /[^\w\s,!?()'";:#%$&\-\.]/g;
        evt.target.value = (0, _utils.sanitize)(evt.target.value, invalidChar);

        _this.setState(_consts.newItem.TEXT, evt.target.value);
      }
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _creationDateInputModalChangeHandler, {
      writable: true,
      value: function value(evt) {
        _this.setState(_consts.newItem.CREATION_DATE, evt.target.value);

        var currentCreationDate = _this.getState(_consts.newItem.CREATION_DATE);

        var currentExpirationDate = _this.getState(_consts.newItem.EXPIRATION_DATE);

        var expirationDateInputModal = _classPrivateFieldGet(_assertThisInitialized(_this), _container).querySelector('#expiration-date-input-modal');

        expirationDateInputModal.min = currentCreationDate;

        if (currentCreationDate >= currentExpirationDate) {
          _this.setState(_consts.newItem.EXPIRATION_DATE, (0, _utils.formatDate)(evt.target.value));
        }
      }
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _expirationDateInputModalChangeHandler, {
      writable: true,
      value: function value(evt) {
        _this.setState(_consts.newItem.EXPIRATION_DATE, evt.target.value);
      }
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _saveNewItemButtonModalClickHandler, {
      writable: true,
      value: function value() {
        _this.addItem();
      }
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _saveEditedItemButtonModalClickHandler, {
      writable: true,
      value: function value() {
        var itemToUpdate = _classPrivateFieldGet(_assertThisInitialized(_this), _todoItems).find(function (item) {
          return item.id === _this.getState(_consts.editItem.ID);
        });

        var editItemInputModal = _classPrivateFieldGet(_assertThisInitialized(_this), _container).querySelector('#edit-item-input-modal');

        var editCreationDateInputModal = _classPrivateFieldGet(_assertThisInitialized(_this), _container).querySelector('#edit-creation-date-input-modal');

        var editExpirationDateInputModal = _classPrivateFieldGet(_assertThisInitialized(_this), _container).querySelector('#edit-expiration-date-input-modal');

        itemToUpdate.text = editItemInputModal.value;
        itemToUpdate.creationDate = editCreationDateInputModal.value;
        itemToUpdate.expirationDate = editExpirationDateInputModal.value;

        var elementToReplace = _classPrivateFieldGet(_assertThisInitialized(_this), _container).querySelector("[data-id=".concat(itemToUpdate.id, "]"));

        elementToReplace.insertAdjacentHTML(_consts.positionToInsert.AFTER_END, itemToUpdate.getMarkup());
        elementToReplace.remove();
      }
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _getTodoItemsMarkup, {
      writable: true,
      value: function value(items) {
        var todoItemsMarkup = items.map(function (item) {
          return item.getMarkup();
        }).join('');
        return todoItemsMarkup;
      }
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _updateListOfItems, {
      writable: true,
      value: function value() {
        var _classPrivateFieldGet4 = _classPrivateFieldGet(_assertThisInitialized(_this), _viewSetting),
            status = _classPrivateFieldGet4.status,
            sorting = _classPrivateFieldGet4.sorting;

        var itemsToShow;

        switch (status) {
          case _consts.filterByStatus.ALL:
            itemsToShow = _toConsumableArray(_classPrivateFieldGet(_assertThisInitialized(_this), _todoItems));
            break;

          case _consts.filterByStatus.ACTIVE:
            itemsToShow = _classPrivateFieldGet(_assertThisInitialized(_this), _todoItems).filter(function (item) {
              return !item.isDone;
            });
            break;

          case _consts.filterByStatus.COMPLETED:
            itemsToShow = _classPrivateFieldGet(_assertThisInitialized(_this), _todoItems).filter(function (item) {
              return item.isDone;
            });
            break;
        }

        switch (sorting) {
          case _consts.sortingType.UNSORTED:
            break;

          case _consts.sortingType.BY_TEXT:
            itemsToShow.sort(function (a, b) {
              return a.text > b.text ? 1 : -1;
            });
            break;

          case _consts.sortingType.BY_CREATION_DATE:
            itemsToShow.sort(function (a, b) {
              return a.creationDate > b.creationDate ? 1 : -1;
            });
            break;

          case _consts.sortingType.BY_EXPIRATION_DATE:
            itemsToShow.sort(function (a, b) {
              return a.expirationDate > b.expirationDate ? 1 : -1;
            });
            break;
        }

        if (_classPrivateFieldGet(_assertThisInitialized(_this), _viewSetting).searchByText) {
          itemsToShow = itemsToShow.filter(function (item) {
            return item.text.includes(_classPrivateFieldGet(_assertThisInitialized(_this), _viewSetting).searchByText);
          });
        }

        if (_classPrivateFieldGet(_assertThisInitialized(_this), _viewSetting).searchByCreationDate) {
          itemsToShow = itemsToShow.filter(function (item) {
            return item.creationDate === _classPrivateFieldGet(_assertThisInitialized(_this), _viewSetting).searchByCreationDate;
          });
        }

        if (_classPrivateFieldGet(_assertThisInitialized(_this), _viewSetting).searchByExpirationDate) {
          itemsToShow = itemsToShow.filter(function (item) {
            return item.expirationDate === _classPrivateFieldGet(_assertThisInitialized(_this), _viewSetting).searchByExpirationDate;
          });
        }

        if (_classPrivateFieldGet(_assertThisInitialized(_this), _viewSetting).isReversed) itemsToShow.reverse();

        var listElement = _classPrivateFieldGet(_assertThisInitialized(_this), _container).querySelector('ul');

        listElement.innerHTML = _classPrivateFieldGet(_assertThisInitialized(_this), _getTodoItemsMarkup).call(_assertThisInitialized(_this), itemsToShow);
      }
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _statusFilterButtonClickHandler, {
      writable: true,
      value: function value(itemStatus) {
        return function (evt) {
          _classPrivateFieldGet(_assertThisInitialized(_this), _container).querySelectorAll('.status-filter-button').forEach(function (filterButton) {
            if (filterButton === evt.target) {
              filterButton.classList.add('btn-light');
              filterButton.classList.remove('btn-outline-light');
            } else {
              filterButton.classList.add('btn-outline-light');
              filterButton.classList.remove('btn-light');
            }
          });

          _classPrivateFieldGet(_assertThisInitialized(_this), _viewSetting).status = itemStatus;

          _classPrivateFieldGet(_assertThisInitialized(_this), _updateListOfItems).call(_assertThisInitialized(_this));
        };
      }
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _toggleSortAndFilterPanelButtonClickHandler, {
      writable: true,
      value: function value() {
        var sortAndFilterPanelElement = _classPrivateFieldGet(_assertThisInitialized(_this), _container).querySelector('#sort-and-filter-panel');

        sortAndFilterPanelElement.classList.toggle('d-none');
      }
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _sortingTypeSelectClickHandler, {
      writable: true,
      value: function value(evt) {
        _classPrivateFieldGet(_assertThisInitialized(_this), _viewSetting).sorting = evt.target.value;

        var reverseSortingOrder = _classPrivateFieldGet(_assertThisInitialized(_this), _container).querySelector('#reverse-sorting-order');

        _classPrivateFieldGet(_assertThisInitialized(_this), _updateListOfItems).call(_assertThisInitialized(_this), reverseSortingOrder.checked);
      }
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _reverseSortingOrderClickHandler, {
      writable: true,
      value: function value(evt) {
        _classPrivateFieldGet(_assertThisInitialized(_this), _viewSetting).isReversed = evt.target.checked;

        _classPrivateFieldGet(_assertThisInitialized(_this), _updateListOfItems).call(_assertThisInitialized(_this));
      }
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _searchByTextInputInputHandler, {
      writable: true,
      value: function value(evt) {
        _classPrivateFieldGet(_assertThisInitialized(_this), _viewSetting).searchByText = evt.target.value;

        _classPrivateFieldGet(_assertThisInitialized(_this), _updateListOfItems).call(_assertThisInitialized(_this));
      }
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _searchByCreationDateChangeHandler, {
      writable: true,
      value: function value(evt) {
        _classPrivateFieldGet(_assertThisInitialized(_this), _viewSetting).searchByCreationDate = evt.target.value;

        _classPrivateFieldGet(_assertThisInitialized(_this), _updateListOfItems).call(_assertThisInitialized(_this));
      }
    });

    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _searchByExpirationDateChangeHandler, {
      writable: true,
      value: function value(evt) {
        _classPrivateFieldGet(_assertThisInitialized(_this), _viewSetting).searchByExpirationDate = evt.target.value;

        _classPrivateFieldGet(_assertThisInitialized(_this), _updateListOfItems).call(_assertThisInitialized(_this));
      }
    });

    _classPrivateFieldSet(_assertThisInitialized(_this), _container, container);

    _classPrivateFieldSet(_assertThisInitialized(_this), _defaultListItemCreationDate, (0, _utils.formatDate)(new Date()));

    _classPrivateFieldSet(_assertThisInitialized(_this), _defaultListItemExpirationDate, (0, _utils.formatDate)(new Date(Date.parse(_classPrivateFieldGet(_assertThisInitialized(_this), _defaultListItemCreationDate)) + _consts.DAY_IN_MS)));

    _classPrivateMethodGet(_assertThisInitialized(_this), _setDefaultNewItemValues, _setDefaultNewItemValues2).call(_assertThisInitialized(_this));

    _this.setState('activeTodoItemsCount', 0);

    _classPrivateMethodGet(_assertThisInitialized(_this), _addToList, _addToList2).call(_assertThisInitialized(_this), _items);

    return _this;
  }

  _createClass(TodoList, [{
    key: "addItem",
    value: function addItem() {
      var _this2 = this;

      var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getState(_consts.newItem.TEXT);
      var creationDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getState(_consts.newItem.CREATION_DATE);
      var expirationDate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.getState(_consts.newItem.EXPIRATION_DATE);

      var todoListElement = _classPrivateFieldGet(this, _container).querySelector('ul');

      var insertItemMarkup = function insertItemMarkup() {
        todoListElement.insertAdjacentHTML(_consts.positionToInsert.BEFORE_END, _classPrivateFieldGet(_this2, _todoItems)[_classPrivateFieldGet(_this2, _todoItems).length - 1].getMarkup());
      };

      if (!text || typeof text !== 'string') return;

      _classPrivateMethodGet(this, _addToList, _addToList2).call(this, {
        text: text,
        creationDate: creationDate,
        expirationDate: expirationDate
      });

      insertItemMarkup();

      _classPrivateMethodGet(this, _setDefaultNewItemValues, _setDefaultNewItemValues2).call(this);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      _classPrivateFieldGet(this, _container).insertAdjacentHTML(_consts.positionToInsert.BEFORE_END, getNewItemInputGroupMarkup());

      _classPrivateFieldGet(this, _container).insertAdjacentHTML(_consts.positionToInsert.BEFORE_END, getSortAndFilterPanelMarkup());

      _classPrivateFieldGet(this, _container).insertAdjacentHTML(_consts.positionToInsert.BEFORE_END, getTodoListMarkup(_classPrivateFieldGet(this, _getTodoItemsMarkup).call(this, _classPrivateFieldGet(this, _todoItems))));

      _classPrivateFieldGet(this, _container).insertAdjacentHTML(_consts.positionToInsert.BEFORE_END, getFilterBarMarkup());

      _classPrivateFieldGet(this, _container).insertAdjacentHTML(_consts.positionToInsert.BEFORE_END, getNewItemCreateModalMarkup(_classPrivateFieldGet(this, _defaultListItemCreationDate), _classPrivateFieldGet(this, _defaultListItemExpirationDate)));

      _classPrivateFieldGet(this, _container).insertAdjacentHTML(_consts.positionToInsert.BEFORE_END, getEditItemModalMarkup(_classPrivateFieldGet(this, _defaultListItemCreationDate), _classPrivateFieldGet(this, _defaultListItemExpirationDate)));

      _classPrivateFieldGet(this, _container).addEventListener('click', _classPrivateFieldGet(this, _listItemCheckboxClickHandler));

      _classPrivateFieldGet(this, _container).addEventListener('click', _classPrivateFieldGet(this, _listItemDeleteButtonClickHandler));

      _classPrivateFieldGet(this, _container).addEventListener('click', _classPrivateFieldGet(this, _listItemEditButtonClickHandler));

      _classPrivateFieldGet(this, _container).addEventListener('keydown', _classPrivateFieldGet(this, _enterKeydownHandler));

      var newItemInput = _classPrivateFieldGet(this, _container).querySelector('#new-item-input');

      var newItemInputModal = _classPrivateFieldGet(this, _container).querySelector('#new-item-input-modal');

      [newItemInput, newItemInputModal].forEach(function (input) {
        input.addEventListener('input', _classPrivateFieldGet(_this3, _newItemInputHandler));

        _this3.setBinding(_consts.newItem.TEXT, input);
      });

      var editCreationDateInputModal = _classPrivateFieldGet(this, _container).querySelector('#edit-creation-date-input-modal');

      editCreationDateInputModal.addEventListener('change', _classPrivateFieldGet(this, _editCreationDateInputModalChangeHandler));

      var activeItemsCountElement = _classPrivateFieldGet(this, _container).querySelector('.active-items-count');

      activeItemsCountElement.textContent = this.getState('activeTodoItemsCount');
      this.setBinding('activeTodoItemsCount', activeItemsCountElement, null, 'textContent');

      var creationDateInputModal = _classPrivateFieldGet(this, _container).querySelector('#creation-date-input-modal');

      creationDateInputModal.addEventListener('change', _classPrivateFieldGet(this, _creationDateInputModalChangeHandler));
      this.setBinding(_consts.newItem.CREATION_DATE, creationDateInputModal);

      var expirationDateInputModal = _classPrivateFieldGet(this, _container).querySelector('#expiration-date-input-modal');

      expirationDateInputModal.addEventListener('change', _classPrivateFieldGet(this, _expirationDateInputModalChangeHandler));
      this.setBinding(_consts.newItem.EXPIRATION_DATE, expirationDateInputModal);

      var saveNewItemButtonModal = _classPrivateFieldGet(this, _container).querySelector('#create-new-item-button-modal');

      saveNewItemButtonModal.addEventListener('click', _classPrivateFieldGet(this, _saveNewItemButtonModalClickHandler));

      var saveEditedItemButtonModal = _classPrivateFieldGet(this, _container).querySelector('#save-edited-item-button-modal');

      saveEditedItemButtonModal.addEventListener('click', _classPrivateFieldGet(this, _saveEditedItemButtonModalClickHandler));

      var statusFilterAllButton = _classPrivateFieldGet(this, _container).querySelector('.status-filter-all-button');

      statusFilterAllButton.addEventListener('click', _classPrivateFieldGet(this, _statusFilterButtonClickHandler).call(this, _consts.filterByStatus.ALL));

      var statusFilterActiveButton = _classPrivateFieldGet(this, _container).querySelector('.status-filter-active-button');

      statusFilterActiveButton.addEventListener('click', _classPrivateFieldGet(this, _statusFilterButtonClickHandler).call(this, _consts.filterByStatus.ACTIVE));

      var statusFilterCompletedButton = _classPrivateFieldGet(this, _container).querySelector('.status-filter-completed-button');

      statusFilterCompletedButton.addEventListener('click', _classPrivateFieldGet(this, _statusFilterButtonClickHandler).call(this, _consts.filterByStatus.COMPLETED));

      var clearCompletedButton = _classPrivateFieldGet(this, _container).querySelector('.clear-completed-button');

      clearCompletedButton.addEventListener('click', function () {
        _classPrivateFieldSet(_this3, _todoItems, _classPrivateFieldGet(_this3, _todoItems).filter(function (item) {
          return !item.isDone;
        }));

        _classPrivateFieldGet(_this3, _container).querySelector('.status-filter-all-button').click();
      });

      var toggleSortAndFilterPanelButton = _classPrivateFieldGet(this, _container).querySelector('.toggle-sort-and-filter-panel-button');

      toggleSortAndFilterPanelButton.addEventListener('click', _classPrivateFieldGet(this, _toggleSortAndFilterPanelButtonClickHandler));

      var sortingTypeSelect = _classPrivateFieldGet(this, _container).querySelector('#sorting-type-select');

      sortingTypeSelect.addEventListener('change', _classPrivateFieldGet(this, _sortingTypeSelectClickHandler));

      var reverseSortingOrder = _classPrivateFieldGet(this, _container).querySelector('#reverse-sorting-order');

      reverseSortingOrder.addEventListener('change', _classPrivateFieldGet(this, _reverseSortingOrderClickHandler));

      var searchByTextInput = _classPrivateFieldGet(this, _container).querySelector('#search-by-text-input');

      searchByTextInput.addEventListener('input', _classPrivateFieldGet(this, _searchByTextInputInputHandler));

      var searchByCreationDateInput = _classPrivateFieldGet(this, _container).querySelector('#search-by-creation-date-input');

      searchByCreationDateInput.addEventListener('change', _classPrivateFieldGet(this, _searchByCreationDateChangeHandler));

      var searchByExpirationDateInput = _classPrivateFieldGet(this, _container).querySelector('#search-by-expiration-date-input');

      searchByExpirationDateInput.addEventListener('change', _classPrivateFieldGet(this, _searchByExpirationDateChangeHandler));
    }
  }]);

  return TodoList;
}(_Abstract2.Abstract);

exports.TodoList = TodoList;

function _setDefaultNewItemValues2() {
  this.setState(_consts.newItem.TEXT, '');
  this.setState(_consts.newItem.CREATION_DATE, _classPrivateFieldGet(this, _defaultListItemCreationDate));
  this.setState(_consts.newItem.EXPIRATION_DATE, _classPrivateFieldGet(this, _defaultListItemExpirationDate));
}

function _activeTodoItemsCountIncrement2() {
  this.setState('activeTodoItemsCount', this.getState('activeTodoItemsCount') + 1);
}

function _activeTodoItemsCountDecrement2() {
  this.setState('activeTodoItemsCount', this.getState('activeTodoItemsCount') - 1);
}

function _addToList2(data) {
  var _this4 = this;

  if (Array.isArray(data)) {
    _classPrivateFieldSet(this, _todoItems, [].concat(_toConsumableArray(_classPrivateFieldGet(this, _todoItems)), _toConsumableArray(data.map(function (item) {
      _classPrivateMethodGet(_this4, _activeTodoItemsCountIncrement, _activeTodoItemsCountIncrement2).call(_this4);

      return new _TodoItem.TodoItem(item.text, item.creationDate, item.expirationDate);
    }))));
  } else {
    _classPrivateMethodGet(this, _activeTodoItemsCountIncrement, _activeTodoItemsCountIncrement2).call(this);

    _classPrivateFieldGet(this, _todoItems).push(new _TodoItem.TodoItem(data.text, data.creationDate, data.expirationDate));
  }
}
},{"./TodoItem":"js/TodoItem.js","./consts":"js/consts.js","./utils":"js/utils.js","./Abstract":"js/Abstract.js"}],"js/mock.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockTasks = void 0;
var mockTasks = [{
  text: 'First task',
  creationDate: '2022-01-10',
  expirationDate: '2022-01-12'
}, {
  text: 'Second task',
  creationDate: '2022-01-13',
  expirationDate: '2022-01-15'
}, {
  text: 'Another task',
  creationDate: '2021-12-25',
  expirationDate: '2022-12-31'
}, {
  text: 'Next task',
  creationDate: '2022-01-16',
  expirationDate: '2022-01-18'
}, {
  text: 'Last task',
  creationDate: '2022-01-19',
  expirationDate: '2022-01-21'
}];
exports.mockTasks = mockTasks;
},{}],"js/index.js":[function(require,module,exports) {
"use strict";

var _TodoList = require("./TodoList");

var _mock = require("./mock");

var init = function init() {
  var todoListContainer = document.querySelector('#todo-list-container');
  var todoList = new _TodoList.TodoList(todoListContainer, _mock.mockTasks);
  todoList.render();
};

init();
},{"./TodoList":"js/TodoList.js","./mock":"js/mock.js"}],"C:/Users/notf/AppData/Roaming/nvm/v14.7.0/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55556" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/notf/AppData/Roaming/nvm/v14.7.0/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map