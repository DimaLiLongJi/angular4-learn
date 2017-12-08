webpackJsonp([5],{

/***/ 323:
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

/***/ 506:
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

/***/ 507:
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

var	fixUrls = __webpack_require__(323);

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

/***/ 512:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(548);

__webpack_require__(549);

exports.default = angular.module('App').controller('resumeCtrl', resumeCtrl);


resumeCtrl.$inject = ['$USER', '$state', 'CF_FILE_BASE_URL', 'userService'];

function resumeCtrl($USER, $state, CF_FILE_BASE_URL, userService) {
  var vm = this;

  vm.user = $USER;
  vm.openResumeDeleteModal = openResumeDeleteModal;
  vm.openFilePreviewModal = openFilePreviewModal;
  vm.gotoAccount = gotoAccount;

  activate();

  function activate() {
    getUserResume();
  }

  function getUserResume() {
    var params = {
      userId: vm.user.id
    };
    userService.getUserAttachments(params).then(function (result) {
      vm.resumeArray = result;
      resumeExist();
      console.log(vm.resumeExist);
    }).catch(function (error) {
      console.error(error);
    });
  }

  function resumeExist() {
    vm.resumeExist = vm.resumeArray.length > 0;
  }

  function openResumeDeleteModal(resume) {
    vm.deleteReume = resume;
    vm.showDeleteModal = true;
  }

  function openFilePreviewModal(resume) {
    $state.go('preview', {
      id: resume.fileId,
      name: encodeURIComponent(resume.originalName)
    });
  }

  function gotoAccount() {
    window.location.href = '/mobile/account';
  }
}

/***/ }),

/***/ 548:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('App').component('resumeDeleteModal', {
  templateUrl: '/components/mobile/app/account/resume/resume-delete-modal/template.html',
  controller: resumeDeleteModalCtrl,
  controllerAs: 'vm',
  bindings: {
    showModal: '=',
    resume: '='
  }
});
angular.module('App').controller('resumeDeleteModalCtrl', resumeDeleteModalCtrl);

resumeDeleteModalCtrl.$inject = ['userService', '$USER', '$state'];

function resumeDeleteModalCtrl(userService, $USER, $state) {
  var vm = this;

  vm.user = $USER;

  vm.confirm = confirm;
  vm.cancel = cancel;

  function confirm() {
    var params = {
      userId: vm.user.id,
      attachmentId: vm.resume.id
    };
    userService.deleteAttachment(params).then(function (result) {
      $state.reload();
      // vm.cancel(vm.resume.id);
    }).catch(function (error) {
      console.error(error);
    });
  }

  function cancel() {
    vm.showModal = false;
  }
}

/***/ }),

/***/ 549:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(550);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(507)(content, options);
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

/***/ 550:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(506)(undefined);
// imports


// module
exports.push([module.i, ".page-padding{padding-right:.38709677rem!important;padding-left:.38709677rem!important}.avatar{width:1.61290323rem;flex:0 0 1.61290323rem;height:1.61290323rem;background-repeat:no-repeat;background-size:100% 100%;box-sizing:border-box}.avatar img{width:100%;height:100%}.btn-sm{padding:0 .12903226rem;height:.58064516rem;line-height:.58064516rem;border-radius:.09677419rem;font-size:12px;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .btn-sm{font-size:24px}[data-dpr=\"3\"] .btn-sm{font-size:36px}.btn-sm.primary{color:#fff;background:#378ced}.btn-md{height:.64516129rem;display:flex;align-items:center;justify-content:center;border-radius:.0483871rem;padding:0 .40322581rem;font-size:14px}[data-dpr=\"2\"] .btn-md{font-size:28px}[data-dpr=\"3\"] .btn-md{font-size:42px}.btn-lg{display:block;width:9.22580645rem;height:1.12903226rem;line-height:1.12903226rem;text-align:center;font-size:16px;background:#378ced;border:none;color:#fff;margin-right:auto;margin-left:auto;border-radius:0;padding:0;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .btn-lg{font-size:32px}[data-dpr=\"3\"] .btn-lg{font-size:48px}.btn-lg.primary{color:#fff;background:#378ced}.btn-md-round{height:.79032258rem;line-height:.79032258rem;border-radius:.40322581rem;padding:0 .40322581rem;box-sizing:content-box;font-size:17px}[data-dpr=\"2\"] .btn-md-round{font-size:34px}[data-dpr=\"3\"] .btn-md-round{font-size:51px}.tag-md{padding:0 .12903226rem;height:.48387097rem;line-height:.48387097rem;border-radius:4px;display:inline-block;font-size:12px;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .tag-md{font-size:20px}[data-dpr=\"3\"] .tag-md{font-size:30px}.tag-md.gold{color:#fff;background:#d9bc8b}.tag-md.yellow{color:#fff;background:#ffc244}.tag-md.red{color:#fff;background:#fb6244}.tag-md.grey{color:#fff;background:#cad2db}.tab-selected{position:relative}.tab-selected:after{position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:.78rem;height:.08064516rem;content:\"\";color:#378ced;background:#378ced}.delete-resume-modal{display:none;position:fixed;top:0;right:0;bottom:0;left:0;z-index:1050;overflow:hidden;-webkit-overflow-scrolling:touch;outline:0;background:rgba(0,0,0,.4);border-radius:.06451613rem}.delete-resume-modal .modal-dialog{margin-top:6.00806452rem;margin-left:1.13709677rem;width:7.74193548rem!important;background:#fff}.delete-resume-modal .modal-content{width:7.74193548rem;height:3.17741935rem;overflow:inherit;box-shadow:none}.delete-resume-modal.show-modal{display:block}.delete-resume-modal .btn:active{box-shadow:none}.delete-resume-modal .tips{height:1.95967742rem;line-height:1.95967742rem;text-align:center;font-size:.41935484rem;color:#333;border-bottom:.00806452rem solid #dbdbdb}.delete-resume-modal .btn{padding:0;border:0;display:inline-block;height:1.20967742rem;line-height:1.20967742rem;width:3.79032258rem;font-size:.40322581rem;text-align:center}.delete-resume-modal .cancel-btn{color:#999;border-right:.00806452rem solid #dbdbdb}.delete-resume-modal .delete-btn{color:#378ced}.resume-page{background-color:#f5f5f5;min-height:100vh}.pageFull{height:100vh;overflow:hidden}.no-resume{height:98.90322581vh;background-image:url(\"/images/account/resume/mobile/bg-no-resume1.png\");background-size:6.39516129rem auto;background-position:center 1.9516129rem;background-repeat:no-repeat}.no-resume p{position:relative;top:8.29032258rem;margin:0 auto;background:#ffc244;border-radius:.12903226rem;width:6.39516129rem;height:1.0483871rem;line-height:1.0483871rem;font-size:17px;text-align:center;color:#fff}[data-dpr=\"2\"] .no-resume p{font-size:34px}[data-dpr=\"3\"] .no-resume p{font-size:51px}.has-resume{padding-bottom:.40322581rem}.has-resume .resume-notice{width:100vw;height:2.09677419rem;background-image:url(\"/images/account/resume/mobile/resume-info.jpg\");background-size:100vw auto;background-position:50%;background-repeat:no-repeat}.has-resume .resume-wrap{border-radius:20px;-webkit-border-radius:20px;background-color:#fff;margin:.40322581rem .38709677rem 0 .36290323rem;height:2.98387097rem}.has-resume .resume-wrap .resume-img{float:left;margin-left:.48387097rem;margin-top:.56451613rem;height:1.61290323rem;width:1.61290323rem;background-image:url(\"/images/account/resume/mobile/resume.jpg\");background-size:1.61290323rem 1.61290323rem;background-position:50%;background-repeat:no-repeat}.has-resume .resume-wrap .resume-show{float:left;margin-left:.5483871rem;margin-top:.45967742rem;width:4.79032258rem}.has-resume .resume-wrap .resume-name{width:4.83870968rem;height:1.12903226rem;line-height:.56451613rem;font-size:.35483871rem;color:#333;word-wrap:break-word;text-overflow:ellipsis;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}.has-resume .resume-wrap .resume-info{width:4.83870968rem;margin-top:.08064516rem}.has-resume .resume-wrap .resume-info .icon-dele{float:left;display:inline-block;height:.4516129rem;width:.40322581rem;background-image:url(\"/images/account/resume/mobile/icon-delete.png\");background-size:.40322581rem .4516129rem;background-position:50%;background-repeat:no-repeat}.has-resume .resume-wrap .resume-info .created-at{display:inline-block;float:right}.has-resume .resume-wrap .resume-preview{float:right;height:100%;width:1.77419355rem;text-align:center}.has-resume .resume-wrap .resume-preview .icon-preview{display:block;height:100%;background-image:url(\"/images/account/resume/mobile/icon-preview.png\");background-size:.24193548rem .40322581rem;background-position:50%;background-repeat:no-repeat}", ""]);

// exports


/***/ })

});