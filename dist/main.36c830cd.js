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
})({"rvFm":[function(require,module,exports) {
module.exports = "bg1.51c6900a.jpg";
},{}],"tiI8":[function(require,module,exports) {
module.exports = "bg2.a85f9539.jpg";
},{}],"Z4J5":[function(require,module,exports) {
module.exports = "bg3.749ef799.jpg";
},{}],"XJRA":[function(require,module,exports) {
module.exports = "bg4.45297229.jpg";
},{}],"epB2":[function(require,module,exports) {
"use strict";

var _bg = _interopRequireDefault(require("./assets/bgImage/bg1.jpg"));

var _bg2 = _interopRequireDefault(require("./assets/bgImage/bg2.jpg"));

var _bg3 = _interopRequireDefault(require("./assets/bgImage/bg3.jpg"));

var _bg4 = _interopRequireDefault(require("./assets/bgImage/bg4.jpg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $siteList = $('.siteList');
var $lastLi = $siteList.find('li.last');
var x = localStorage.getItem('x');
var xObject = JSON.parse(x);
var imgArray = [null, _bg.default, _bg2.default, _bg3.default, _bg4.default];
var i = 1;
var hashMap = xObject || [{
  logo: 'B',
  logoType: 'text',
  url: 'https://www.bilibili.com'
}, {
  logo: 'M',
  logoType: 'image',
  url: 'https://mail.google.com'
}, {
  logo: 'B',
  logoType: 'image',
  url: 'https://baidu.com'
}, {
  logo: 'I',
  logoType: 'image',
  url: 'https://www.iconfont.cn'
}, {
  logo: 'C',
  logoType: 'image',
  url: 'https://www.cnki.net'
}, {
  logo: 'J',
  logoType: 'image',
  url: 'https://juejin.im'
}, {
  logo: 'Y',
  logoType: 'image',
  url: 'https://www.yuque.com'
}];

var removeHttps = function removeHttps(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
};

var render = function render() {
  $siteList.find('li:not(.last)').remove();
  hashMap.forEach(function (node, index) {
    //node.logo = removeHttps(node.url)[0].toUpperCase()
    var $li = $("\n        <li>\n            <div class=\"site\">\n                <div class=\"logo\">".concat(node.logo, "</div>\n                <div class=\"link\">").concat(removeHttps(node.url), "</div>\n                <div class=\"close\">\n                <svg class=\"icon\" >\n    <use xlink:href=\"#icon-Close\"></use></svg>\n                </div>\n            </div>\n        </li>")).insertBefore($lastLi);
    $li.on('click', function () {
      window.open(node.url);
    });
    $li.on('click', '.close', function (e) {
      e.stopPropagation(); //阻止冒泡

      hashMap.splice(index, 1);
      render();
    });
  });
};

render();
$('.add').on('click', function () {
  var url = window.prompt('请输入网址：');

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  }

  hashMap.push({
    logo: removeHttps(url)[0].toUpperCase(),
    logoType: 'image',
    url: url
  });
  render();
});
$('.changeTheme').on('click', function () {
  var showImg = imgArray[i % imgArray.length];
  $('body').css('background-image', "url(".concat(showImg, ")"));
  i++;
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem('x', string);
};

$(document).on('keypress', function (e) {
  var key = e.key;
  hashMap.forEach(function (node) {
    if (node.logo.toLowerCase() === key) {
      window.open(node.url);
    }
  });
});
},{"./assets/bgImage/bg1.jpg":"rvFm","./assets/bgImage/bg2.jpg":"tiI8","./assets/bgImage/bg3.jpg":"Z4J5","./assets/bgImage/bg4.jpg":"XJRA"}]},{},["epB2"], null)
//# sourceMappingURL=main.36c830cd.js.map