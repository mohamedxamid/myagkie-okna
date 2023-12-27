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
})({"js/modules/slider.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function slider(wrapper) {
  var slideIndex = 0;
  var elSlider = wrapper.querySelector(".slider"),
    elSliderWidth = window.getComputedStyle(elSlider).width,
    elSliderField = elSlider.querySelector('.slider-inner'),
    elsSliderItem = elSlider.querySelectorAll('.slider-item'),
    elBtnPrev = wrapper.querySelector('.js-slider-control-prev'),
    elBtnNext = wrapper.querySelector('.js-slider-control-next'),
    elsColor = wrapper.querySelectorAll('.slider-list li');
  elsColor.forEach(function (elColor) {
    elColor.addEventListener('click', function (evt) {
      slideIndex = +evt.target.dataset.slideTo;
      deactivateColors();
      activateColor(slideIndex);
      showSlide(slideIndex);
    });
  });
  elSliderField.style.width = "".concat(100 * elsSliderItem.length, "%");
  elBtnPrev.addEventListener('click', function () {
    slideControl(-1);
  });
  elBtnNext.addEventListener('click', function () {
    slideControl(1);
  });
  function slideControl(number) {
    slideIndex += number;
    if (slideIndex < 0) {
      slideIndex = elsSliderItem.length - 1;
    } else if (slideIndex > elsSliderItem.length - 1) {
      slideIndex = 0;
    }
    showSlide(slideIndex);
    deactivateColors();
    activateColor(slideIndex);
  }
  function showSlide(idx) {
    elSliderField.style.transform = "translateX(-".concat(+elSliderWidth.replace(/(r?em|px|\%)$/g, '') * idx, "px)");
  }
  function activateColor(idx) {
    elsColor[idx].classList.add("products__color--active");
  }
  function deactivateColors() {
    elsColor.forEach(function (elColor) {
      elColor.classList.remove("products__color--active");
    });
  }
}
var _default = exports.default = slider;
},{}],"js/main.js":[function(require,module,exports) {
"use strict";

var _slider = _interopRequireDefault(require("./modules/slider"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
window.addEventListener('DOMContentLoaded', function () {
  (0, _slider.default)(document.querySelector('.services__grid'));
  var elsColor = document.querySelectorAll('.products__item');
  elsColor.forEach(function (item) {
    (0, _slider.default)(item);
  });
  var elsReadMoreBtn = document.querySelectorAll('.products__desc-read-more');
  elsReadMoreBtn.forEach(function (elReadMoreBtn) {
    elReadMoreBtn.addEventListener('click', function (evt) {
      evt.preventDefault();
      elReadMoreBtn.previousElementSibling.classList.toggle("products__desc--active");
    });
  });
  var featureSwitch = document.querySelector('.features__house-windows-toggler input.window-toggler__input'),
    featureHouseWindow = document.querySelector('.features__img--window');
  featureSwitch.addEventListener("click", function (evt) {
    if (evt.target.checked) {
      featureHouseWindow.classList.add('features__img--window_active');
    } else {
      featureHouseWindow.classList.remove('features__img--window_active');
    }
  });
  var introSwitch = document.querySelector('.intro__house-windows-toggler input.window-toggler__input'),
    introHouseWindow = document.querySelector('.intro__house-window');
  introSwitch.addEventListener("click", function (evt) {
    if (evt.target.checked) {
      introHouseWindow.classList.add('intro__house-window--active');
    } else {
      introHouseWindow.classList.remove('intro__house-window--active');
    }
  });
  var isNumericInput = function isNumericInput(event) {
    var key = event.keyCode;
    return key >= 48 && key <= 57 ||
    // Allow number line
    key >= 96 && key <= 105 // Allow number pad
    ;
  };
  var isModifierKey = function isModifierKey(event) {
    var key = event.keyCode;
    return event.shiftKey === true || key === 35 || key === 36 ||
    // Allow Shift, Home, End
    key === 8 || key === 9 || key === 13 || key === 46 ||
    // Allow Backspace, Tab, Enter, Delete
    key > 36 && key < 41 ||
    // Allow left, up, right, down

    // Allow Ctrl/Command + A,C,V,X,Z
    (event.ctrlKey === true || event.metaKey === true) && (key === 65 || key === 67 || key === 86 || key === 88 || key === 90);
  };
  var enforceFormat = function enforceFormat(event) {
    // Input must be of a valid number format or a modifier key, and not longer than ten digits
    if (!isNumericInput(event) && !isModifierKey(event)) {
      event.preventDefault();
    }
  };
  var formatToPhone = function formatToPhone(event) {
    if (isModifierKey(event)) {
      return;
    }
    var input = event.target.value.replace(/\D/g, '').substring(0, 11); // First ten digits of input only
    var countryCode = input.substring(0, 1);
    var areaCode = input.substring(1, 4);
    var middle = input.substring(4, 7);
    var lastOne = input.substring(7, 9);
    var lastTwo = input.substring(9, 11);
    if (input.length > 9) {
      event.target.value = "+".concat(countryCode, " (").concat(areaCode, ") ").concat(middle, "-").concat(lastOne, "-").concat(lastTwo);
    } else if (input.length > 7) {
      event.target.value = "+".concat(countryCode, " (").concat(areaCode, ") ").concat(middle, "-").concat(lastOne);
    } else if (input.length > 4) {
      event.target.value = "+".concat(countryCode, " (").concat(areaCode, ") ").concat(middle);
    } else if (input.length > 1) {
      event.target.value = "+".concat(countryCode, " (").concat(areaCode);
    } else if (input.length > 0) {
      event.target.value = "+".concat(countryCode);
    }
  };
  var inputElement = document.querySelector('.js-phoneNumber');
  inputElement.addEventListener('keydown', enforceFormat);
  inputElement.addEventListener('keyup', formatToPhone);
});
},{"./modules/slider":"js/modules/slider.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59710" + '/');
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
      });

      // Enable HMR for CSS by default.
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
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map