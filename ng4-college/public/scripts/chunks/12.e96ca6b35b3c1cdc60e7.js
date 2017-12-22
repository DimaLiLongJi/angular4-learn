webpackJsonp([12],{

/***/ 355:
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ 576:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 577:
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(355);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 584:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(623);

exports.default = angular.module('App').controller('favoriteCtrl', favoriteCtrl);


favoriteCtrl.$inject = ['$USER', 'userService', '$state'];

function favoriteCtrl($USER, userService, $state) {
  var vm = this;
  vm.user = $USER;
  vm.itemsPerPage = 10;
  vm.questionPageNum = 1;
  vm.oppPageNum = 1;
  vm.questionTotalItems = 0;
  vm.oppTotalItems = 0;
  vm.oppList = null;
  vm.questionList = null;
  console.log(sessionStorage.favoriteTab);
  vm.status = sessionStorage.favoriteTab || 'opportunity';
  sessionStorage.favoriteTab = '';
  vm.getList = getList;
  vm.loadMore = loadMore;
  vm.toggleStatus = toggleStatus;
  vm.goOpp = goOpp;
  vm.goQuestion = goQuestion;
  vm.unfavorOpp = unfavorOpp;
  vm.unfavorQuestion = unfavorQuestion;
  vm.gotoAccount = gotoAccount;

  // activate();
  var pageShow = void 0;
  window.onpageshow = function () {
    pageShow = true;
    activate();
  };
  if (!pageShow) {
    activate();
  }

  function activate() {
    getList('question');
    getList('opportunity');
  }

  function getList(status) {
    // if (vm.questionList || vm.oppList) {
    //   return;
    // }
    userService.getFavoriteList({
      type: status,
      userId: $USER.id
    }).then(function (result) {
      var favorites = result.favorites || [];
      if (status === 'question') {
        // vm.questionList = (vm.questionList || []).concat(favorites);
        vm.questionList = favorites;
        vm.questionTotalItems = result.totalItems;
      } else {
        // vm.oppList = (vm.oppList || []).concat(favorites);
        vm.oppList = favorites;
        vm.oppTotalItems = result.totalItems;
      }
    });
  }

  function loadMore() {
    if (vm.status === 'question') {
      if (vm.questionPageNum * vm.itemsPerPage) {
        vm.questionPageNum++;
      } else {
        vm.oppPageNum++;
      }
      getList(vm.status);
    }
  }

  function toggleStatus(status) {
    vm.status = status;
  }

  function goOpp(opp) {
    if (!opp.applied && opp.status !== 3) {
      sessionStorage.favoriteTab = 'opportunity';
      window.location.href = '/opportunity/' + opp.id;
    }
  }

  function goQuestion(qs) {
    sessionStorage.favoriteTab = 'question';
    $state.go('discovery.question-detail', {
      id: qs.id
    });
  }

  function unfavorOpp(opp, index) {
    userService.disableFavorite({
      userId: $USER && $USER.id,
      entityId: opp.id,
      entityType: 'opportunity'
    }).then(function () {
      // $state.reload();
      vm.oppList.splice(index, 1);
    });
  }

  function unfavorQuestion(qs, index, $event) {
    $event.stopImmediatePropagation();
    console.log($event);
    userService.disableFavorite({
      userId: $USER && $USER.id,
      entityId: qs.id,
      entityType: 'question'
    }).then(function () {
      vm.questionList.splice(index, 1);
    });
  }

  function gotoAccount() {
    window.location.href = '/mobile/account';
  }
}

/***/ }),

/***/ 623:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(624);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(577)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../../node_modules/_css-loader@0.28.7@css-loader/index.js??ref--3-2!../../../../../../node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js??ref--3-3!./style.less", function() {
			var newContent = require("!!../../../../../../node_modules/_css-loader@0.28.7@css-loader/index.js??ref--3-2!../../../../../../node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js??ref--3-3!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 624:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(576)(undefined);
// imports


// module
exports.push([module.i, ".page-padding{padding-right:.38709677rem!important;padding-left:.38709677rem!important}.avatar{width:1.61290323rem;flex:0 0 1.61290323rem;height:1.61290323rem;background-repeat:no-repeat;background-size:100% 100%;box-sizing:border-box}.avatar img{width:100%;height:100%}.btn-sm{padding:0 .12903226rem;height:.58064516rem;line-height:.58064516rem;border-radius:.09677419rem;font-size:12px;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .btn-sm{font-size:24px}[data-dpr=\"3\"] .btn-sm{font-size:36px}.btn-sm.primary{color:#fff;background:#378ced}.btn-md{height:.64516129rem;display:flex;align-items:center;justify-content:center;border-radius:.0483871rem;padding:0 .40322581rem;font-size:14px}[data-dpr=\"2\"] .btn-md{font-size:28px}[data-dpr=\"3\"] .btn-md{font-size:42px}.btn-lg{display:block;width:9.22580645rem;height:1.12903226rem;line-height:1.12903226rem;text-align:center;font-size:16px;background:#378ced;border:none;color:#fff;margin-right:auto;margin-left:auto;border-radius:0;padding:0;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .btn-lg{font-size:32px}[data-dpr=\"3\"] .btn-lg{font-size:48px}.btn-lg.primary{color:#fff;background:#378ced}.btn-md-round{height:.79032258rem;line-height:.79032258rem;border-radius:.40322581rem;padding:0 .40322581rem;box-sizing:content-box;font-size:17px}[data-dpr=\"2\"] .btn-md-round{font-size:34px}[data-dpr=\"3\"] .btn-md-round{font-size:51px}.tag-md{padding:0 .12903226rem;height:.48387097rem;line-height:.48387097rem;border-radius:4px;display:inline-block;font-size:12px;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .tag-md{font-size:20px}[data-dpr=\"3\"] .tag-md{font-size:30px}.tag-md.gold{color:#fff;background:#d9bc8b}.tag-md.yellow{color:#fff;background:#ffc244}.tag-md.red{color:#fff;background:#fb6244}.tag-md.grey{color:#fff;background:#cad2db}.tab-selected{position:relative}.tab-selected:after{position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:.78rem;height:.08064516rem;content:\"\";color:#378ced;background:#378ced}.favorite-wrap{display:flex;flex-direction:column;height:100%}.favorite-wrap .blue-btn{display:inline-block;background:#378ced;border-radius:.0483871rem;width:4.43548387rem;line-height:1.12903226rem;color:#fff;font-size:.38709677rem}.favorite-wrap .tab-wrap{flex:1;overflow:auto;background:#f5f5f5}.favorite-wrap .red-circle{background:#ff3f24;width:.17741935rem;height:.17741935rem;border-radius:50%;position:absolute;top:.12903226rem;left:60%}.favorite-wrap .navs{display:flex;border-bottom:1px solid #c2c2c2;min-height:1.12903226rem;font-size:14px}[data-dpr=\"2\"] .favorite-wrap .navs{font-size:28px}[data-dpr=\"3\"] .favorite-wrap .navs{font-size:42px}.favorite-wrap .navs li{width:50%;text-align:center;height:1.12903226rem;line-height:1.12903226rem;color:#666;font-size:14px}[data-dpr=\"2\"] .favorite-wrap .navs li{font-size:28px}[data-dpr=\"3\"] .favorite-wrap .navs li{font-size:42px}.favorite-wrap .navs li.active{position:relative}.favorite-wrap .navs li.active:after{position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:.78rem;height:.08064516rem;content:\"\";color:#378ced;background:#378ced}.favorite-wrap .no-items{height:100vh;background:#f5f5f5;text-align:center}.favorite-wrap .no-items img{width:2.5rem;margin-top:2.33870968rem;margin-bottom:.54032258rem}.favorite-wrap .no-items .no-item-desc{font-size:16px;color:#c2c2c2;line-height:1.5;margin-bottom:.56451613rem}[data-dpr=\"2\"] .favorite-wrap .no-items .no-item-desc{font-size:32px}[data-dpr=\"3\"] .favorite-wrap .no-items .no-item-desc{font-size:48px}.favorite-wrap .opp-entry{background:#fff;margin-bottom:.18548387rem;position:relative}.favorite-wrap .opp-entry .opp-card{display:flex;padding:.42741935rem .46774194rem;border-bottom:1px solid #c2c2c2}.favorite-wrap .opp-entry .opp-card .avatar-container{width:1.59677419rem;height:1.59677419rem;flex-basis:1.59677419rem}.favorite-wrap .opp-entry .opp-card .opp-info{flex:1;line-height:1;margin-left:.40322581rem;overflow:hidden}.favorite-wrap .opp-entry .opp-card .opp-info .opp-title{color:#378ced;font-size:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}[data-dpr=\"2\"] .favorite-wrap .opp-entry .opp-card .opp-info .opp-title{font-size:32px}[data-dpr=\"3\"] .favorite-wrap .opp-entry .opp-card .opp-info .opp-title{font-size:48px}.favorite-wrap .opp-entry .opp-card .opp-info .opp-info1{margin:.2016129rem 0}.favorite-wrap .opp-entry .opp-card .opp-info .opp-info1 span{color:#666}.favorite-wrap .opp-entry .opp-card .opp-info .opp-info2{color:#c2c2c2}.favorite-wrap .opp-entry .opp-card .opp-time{align-self:flex-end;color:#c2c2c2;white-space:nowrap}.favorite-wrap .opp-entry .opp-btns{display:flex;height:1.07258065rem;line-height:1.07258065rem;text-align:center}.favorite-wrap .opp-entry .opp-btns .opp-btn{flex:1;font-size:14px}[data-dpr=\"2\"] .favorite-wrap .opp-entry .opp-btns .opp-btn{font-size:28px}[data-dpr=\"3\"] .favorite-wrap .opp-entry .opp-btns .opp-btn{font-size:42px}.favorite-wrap .opp-entry .opp-btns .separator{color:#c2c2c2}.favorite-wrap .opp-entry .opp-btns .go-detail{color:#378ced}.favorite-wrap .opp-entry>img{position:absolute;width:2.41935484rem;top:.61290323rem;right:1.41129032rem}.favorite-wrap .opp-entry.is-applied .go-detail,.favorite-wrap .opp-entry.is-outdated .go-detail,.favorite-wrap .opp-entry.is-outdated .opp-info .opp-info1,.favorite-wrap .opp-entry.is-outdated .opp-info .opp-info1 span,.favorite-wrap .opp-entry.is-outdated .opp-info .opp-title{color:#c2c2c2}.favorite-wrap .question-entry{background:#fff;margin-bottom:.18548387rem;padding:.46774194rem .44354839rem}.favorite-wrap .question-entry .question-content{display:flex}.favorite-wrap .question-entry .question-content .question-label{color:#ff3f24;font-size:14px;flex-basis:2em}[data-dpr=\"2\"] .favorite-wrap .question-entry .question-content .question-label{font-size:28px}[data-dpr=\"3\"] .favorite-wrap .question-entry .question-content .question-label{font-size:42px}.favorite-wrap .question-entry .question-content .question-text{flex:1;font-size:14px;line-height:1.4}[data-dpr=\"2\"] .favorite-wrap .question-entry .question-content .question-text{font-size:28px}[data-dpr=\"3\"] .favorite-wrap .question-entry .question-content .question-text{font-size:42px}.favorite-wrap .question-entry .tag-container{width:100%;display:flex;justify-content:space-between;align-items:center;margin-top:.40322581rem}.favorite-wrap .question-entry .tag-container .tag span{display:inline-block;color:#fff;background:#d9bc8b;padding:.3em .5em;line-height:1;margin-right:.24193548rem;font-size:12px;border-radius:.167em}[data-dpr=\"2\"] .favorite-wrap .question-entry .tag-container .tag span{font-size:24px}[data-dpr=\"3\"] .favorite-wrap .question-entry .tag-container .tag span{font-size:36px}.favorite-wrap .question-entry .tag-container .unfavor-btn{color:#378ced}", ""]);

// exports


/***/ })

});