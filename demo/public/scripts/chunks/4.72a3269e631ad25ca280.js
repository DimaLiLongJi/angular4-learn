webpackJsonp([4],{

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global ActiveXObject, window, console, define, module, jQuery */
//jshint unused:false, strict: false

/*
    PDFObject v2.0.201604172
    https://github.com/pipwerks/PDFObject
    Copyright (c) 2008-2016 Philip Hutchison
    MIT-style license: http://pipwerks.mit-license.org/
    UMD module pattern from https://github.com/umdjs/umd/blob/master/templates/returnExports.js
*/

(function (root, factory) {
    if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.PDFObject = factory();
  }
}(this, function () {

    "use strict";
    //jshint unused:true

    //PDFObject is designed for client-side (browsers), not server-side (node)
    //Will choke on undefined navigator and window vars when run on server
    //Return boolean false and exit function when running server-side

    if(typeof window === "undefined" || typeof navigator === "undefined"){ return false; }

    var pdfobjectversion = "2.0.201604172",
        supportsPDFs,

        //declare functions
        createAXO,
        isIE,
        supportsPdfMimeType = (typeof navigator.mimeTypes['application/pdf'] !== "undefined"),
        supportsPdfActiveX,
        buildFragmentString,
        log,
        embedError,
        embed,
        getTargetElement,
        generatePDFJSiframe,
        isIOS = (function (){ return (/iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase())); })(),
        generateEmbedElement;


    /* ----------------------------------------------------
       Supporting functions
       ---------------------------------------------------- */

    createAXO = function (type){
        var ax;
        try {
            ax = new ActiveXObject(type);
        } catch (e) {
            ax = null; //ensure ax remains null
        }
        return ax;
    };

    //IE11 still uses ActiveX for Adobe Reader, but IE 11 doesn't expose
    //window.ActiveXObject the same way previous versions of IE did
    //window.ActiveXObject will evaluate to false in IE 11, but "ActiveXObject" in window evaluates to true
    //so check the first one for older IE, and the second for IE11
    //FWIW, MS Edge (replacing IE11) does not support ActiveX at all, both will evaluate false
    //Constructed as a method (not a prop) to avoid unneccesarry overhead -- will only be evaluated if needed
    isIE = function (){ return !!(window.ActiveXObject || "ActiveXObject" in window); };

    //If either ActiveX support for "AcroPDF.PDF" or "PDF.PdfCtrl" are found, return true
    //Constructed as a method (not a prop) to avoid unneccesarry overhead -- will only be evaluated if needed
    supportsPdfActiveX = function (){ return !!(createAXO("AcroPDF.PDF") || createAXO("PDF.PdfCtrl")); };

    //Determines whether PDF support is available
    supportsPDFs = (supportsPdfMimeType || (isIE() && supportsPdfActiveX()));

    //Create a fragment identifier for using PDF Open parameters when embedding PDF
    buildFragmentString = function(pdfParams){

        var string = "",
            prop;

        if(pdfParams){

            for (prop in pdfParams) {
                if (pdfParams.hasOwnProperty(prop)) {
                    string += encodeURIComponent(prop) + "=" + encodeURIComponent(pdfParams[prop]) + "&";
                }
            }

            //The string will be empty if no PDF Params found
            if(string){

                string = "#" + string;

                //Remove last ampersand
                string = string.slice(0, string.length - 1);

            }

        }

        return string;

    };

    log = function (msg){
        if(typeof console !== "undefined" && console.log){
            console.log("[PDFObject] " + msg);
        }
    };

    embedError = function (msg){
        log(msg);
        return false;
    };

    getTargetElement = function (targetSelector){

        //Default to body for full-browser PDF
        var targetNode = document.body;

        //If a targetSelector is specified, check to see whether
        //it's passing a selector, jQuery object, or an HTML element

        if(typeof targetSelector === "string"){

            //Is CSS selector
            targetNode = document.querySelector(targetSelector);

        } else if (typeof jQuery !== "undefined" && targetSelector instanceof jQuery && targetSelector.length) {

            //Is jQuery element. Extract HTML node
            targetNode = targetSelector.get(0);

        } else if (typeof targetSelector.nodeType !== "undefined" && targetSelector.nodeType === 1){

            //Is HTML element
            targetNode = targetSelector;

        }

        return targetNode;

    };

    generatePDFJSiframe = function (targetNode, url, pdfOpenFragment, PDFJS_URL, id){

        var fullURL = PDFJS_URL + "?file=" + encodeURIComponent(url) + pdfOpenFragment;
        var scrollfix = (isIOS) ? "-webkit-overflow-scrolling: touch; overflow-y: scroll; " : "overflow: hidden; ";
        var iframe = "<div style='" + scrollfix + "position: absolute; top: 0; right: 0; bottom: 0; left: 0;'><iframe  " + id + " src='" + fullURL + "' style='border: none; width: 100%; height: 100%;' frameborder='0'></iframe></div>";
        targetNode.className += " pdfobject-container";
        targetNode.style.position = "relative";
        targetNode.style.overflow = "auto";
        targetNode.innerHTML = iframe;
        return targetNode.getElementsByTagName("iframe")[0];

    };

    generateEmbedElement = function (targetNode, targetSelector, url, pdfOpenFragment, width, height, id){

        var style = "";

        if(targetSelector && targetSelector !== document.body){
            style = "width: " + width + "; height: " + height + ";";
        } else {
            style = "position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;";
        }

        targetNode.className += " pdfobject-container";
        targetNode.innerHTML = "<embed " + id + " class='pdfobject' src='" + url + pdfOpenFragment + "' type='application/pdf' style='overflow: auto; " + style + "'/>";

        return targetNode.getElementsByTagName("embed")[0];

    };

    embed = function(url, targetSelector, options){

        //Ensure URL is available. If not, exit now.
        if(typeof url !== "string"){ return embedError("URL is not valid"); }

        //If targetSelector is not defined, convert to boolean
        targetSelector = (typeof targetSelector !== "undefined") ? targetSelector : false;

        //Ensure options object is not undefined -- enables easier error checking below
        options = (typeof options !== "undefined") ? options : {};

        //Get passed options, or set reasonable defaults
        var id = (options.id && typeof options.id === "string") ? "id='" + options.id + "'" : "",
            page = (options.page) ? options.page : false,
            pdfOpenParams = (options.pdfOpenParams) ? options.pdfOpenParams : {},
            fallbackLink = (typeof options.fallbackLink !== "undefined") ? options.fallbackLink : true,
            width = (options.width) ? options.width : "100%",
            height = (options.height) ? options.height : "100%",
            forcePDFJS = (typeof options.forcePDFJS === "boolean") ? options.forcePDFJS : false,
            PDFJS_URL = (options.PDFJS_URL) ? options.PDFJS_URL : false,
            targetNode = getTargetElement(targetSelector),
            fallbackHTML = "",
            pdfOpenFragment = "",
            fallbackHTML_default = "<p>This browser does not support inline PDFs. Please download the PDF to view it: <a href='[url]'>Download PDF</a></p>";

        //If target element is specified but is not valid, exit without doing anything
        if(!targetNode){ return embedError("Target element cannot be determined"); }


        //page option overrides pdfOpenParams, if found
        if(page){
            pdfOpenParams.page = page;
        }

        //Stringify optional Adobe params for opening document (as fragment identifier)
        pdfOpenFragment = buildFragmentString(pdfOpenParams);

        //Do the dance
        if(forcePDFJS && PDFJS_URL){

            return generatePDFJSiframe(targetNode, url, pdfOpenFragment, PDFJS_URL, id);

        } else if(supportsPDFs){

            return generateEmbedElement(targetNode, targetSelector, url, pdfOpenFragment, width, height, id);

        } else {

            if(PDFJS_URL){

                return generatePDFJSiframe(targetNode, url, pdfOpenFragment, PDFJS_URL, id);

            } else if(fallbackLink){

                fallbackHTML = (typeof fallbackLink === "string") ? fallbackLink : fallbackHTML_default;
                targetNode.innerHTML = fallbackHTML.replace(/\[url\]/g, url);

            }

            return embedError("This browser does not support embedded PDFs");

        }

    };

    return {
        embed: function (a,b,c){ return embed(a,b,c); },
        pdfobjectversion: (function () { return pdfobjectversion; })(),
        supportsPDFs: (function (){ return supportsPDFs; })()
    };

}));

/***/ }),

/***/ 393:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(442);

__webpack_require__(443);

exports.default = angular.module('App').controller('previewCtrl', previewCtrl);

previewCtrl.$inject = ['CF_FILE_BASE_URL', 'fileService', '$location'];

function previewCtrl(CF_FILE_BASE_URL, fileService, $location) {
  var vm = this;
  vm.$onInit = function () {
    vm.file = {
      fileId: $location.$$url.match(/.+\/(\d+)/)[1],
      encodeOriginalName: $location.$$url.match(/.+\/(\d+)\/(.+)/)[2],
      originalName: decodeURIComponent(decodeURIComponent($location.$$url.match(/.+\/(\d+)\/(.+)/)[2]))
    };
    vm.fileInfo = {
      name: '' + vm.file.encodeOriginalName,
      src: CF_FILE_BASE_URL + '/' + vm.file.fileId + '?originalName=' + vm.file.encodeOriginalName,
      download: CF_FILE_BASE_URL + '/' + vm.file.fileId + '?originalName=' + vm.file.encodeOriginalName + '&download=1',
      fileId: vm.file.fileId,
      originalName: vm.file.originalName
    };

    vm.goBack = goBack;
  };

  function goBack() {
    window.history.back();
  }
}

/***/ }),

/***/ 442:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _pdfobject = __webpack_require__(256);

var _pdfobject2 = _interopRequireDefault(_pdfobject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module('App').component('filePreviewCore', {
  templateUrl: '/components/mobile/app/preview/mobile-file-preview-core/template.html',
  controller: filePreviewCtr,
  controllerAs: 'vm',
  bindings: {
    fileInfo: '='
  }
});

filePreviewCtr.$inject = ['$document', '$scope', '$timeout', 'fileService'];

function filePreviewCtr($document, $scope, $timeout, fileService) {
  var vm = this;
  var widthInit = void 0,
      imageDom = void 0,
      imageWidth = void 0,
      imageHeight = void 0,
      clientWidth = void 0,
      clientHeight = void 0,
      scale = 1,
      angle = 0;
  vm.percent = 100;
  vm.loadState = true;

  vm.zoom = zoom;
  vm.rotate = rotate;

  $scope.$watch('vm.fileInfo', function (n) {
    if (n && n.name) activate();
  });

  function activate() {
    vm.file = parseFile(vm.fileInfo);
    // return activateIEMode();
    if (vm.file.type === 'img') return activateImg();
    if (vm.file.type !== 'pdf' && vm.file.type !== 'office') {
      vm.noPreview = true;
      return 1;
    } else if (_pdfobject2.default.supportsPDFs) {
      if (vm.file.type === 'pdf' && _pdfobject2.default.supportsPDFs) {
        return activatePdf();
      }
      if (vm.file.type === 'office') {
        return activateOffice();
      }
    } else {
      return activateIEMode();
    }
  }

  function activatePdf() {
    _pdfobject2.default.embed(vm.file.src, '#pdfobject');
    vm.loadState = false;
  }

  function activateOffice() {
    vm.file.type = 'pdf';
    var defaultDomain = 'http://media.careerfrog.com.cn/';
    return fileService.getFileHashName(vm.file.fileId).then(function (file) {
      if (isOfficeDoc(file.hashName)) {
        vm.file.src = '' + defaultDomain + encodeURIComponent(file.hashName) + '?odconv/pdf'; // qiniu doc convert api
      }
      return activatePdf();
    }).catch(function (err) {
      console.error('err is', err);
    });
  }

  function activateIEMode() {
    vm.IEMode = true;
    fileService.getFileHashName(vm.file.fileId, true).then(function (file) {
      if (isOfficeDoc(file.hashName)) {
        $timeout(activateIEMode, 2000);
      } else {
        fileService.getImages(vm.file.fileId, true).then(function (result) {
          vm.file.images = [];
          result.images.forEach(function (url, idx) {
            vm.file.images.push({
              id: 'img-' + idx,
              url: url
            });
          });
          $timeout(function () {
            $('.pdf-viwer-images').hide();
            var img = document.getElementById(vm.file.images[0].id);
            img.onload = function () {
              vm.loadState = false;
              $('#loader').hide();
              $('.pdf-viwer-images').show();
            };
            $timeout(function () {
              if (vm.loadState) {
                $('#loader').hide();
                $('.pdf-viwer-images').show();
              }
            }, 500);
          }, 0);
        });
      }
    });
  }

  function activateImg() {
    vm.loadState = true;
    vm.imageUrl = vm.file.src;
    clientWidth = $document.find('body')[0].clientWidth;
    clientHeight = $document.find('body')[0].scrollHeight;
    imageDom = $document.find('#image-preview');

    imageDom[0].onload = function () {
      imageWidth = imageDom[0].width;
      imageHeight = imageDom[0].height;
      widthInit = imageDom.width();
      $scope.$apply(function () {
        vm.loadState = false;
      });
      if (imageWidth > clientWidth || imageHeight > clientHeight) {
        imageDom.css('width', imageWidth * 0.5 + 'px');
        widthInit = imageWidth * 0.5;
        $scope.$apply(function () {
          vm.percent = 50;
        });
      } else {
        widthInit = imageDom.width();
      }
    };
  }

  function parseFile(f) {
    if (!f) return;
    var sizeInKB = f.size / 1000;
    f.download = f.download.split('originalName')[0] + '&originalName=' + encodeURIComponent(f.name) + '&download=1';
    // f.src =`${f.download.split('originalName')[0]}&originalName=${encodeURIComponent(f.name)}`;
    f.size = sizeInKB < 500 ? sizeInKB.toFixed(1) + ' KB' : (sizeInKB / 1000).toFixed(1) + ' MB';
    f.extName = f.name.substring(f.name.lastIndexOf('.') + 1).toLowerCase();
    if (f.extName === 'pdf') f.type = 'pdf';
    if (f.extName === 'jpg' || f.extName === 'jpeg' || f.extName === 'png') f.type = 'img';
    if (isOfficeDoc(f.extName)) f.type = 'office';
    return f;
  }

  function isOfficeDoc(filename) {
    return (/(doc)|(docx)|(ppt)|(pptx)|(xls)|(xlsx)$/.test(filename)
    );
  }

  function zoom(order) {
    if (order === 'in') {
      scale += 0.1;
      vm.percent += 10;
    } else {
      if (vm.percent <= 50) return;
      scale -= 0.1;
      vm.percent -= 10;
    }
    imageDom.css('width', scale * widthInit + 'px');
  }

  function rotate() {
    angle += 90;
    imageDom.css('transform', 'rotate(' + angle + 'deg)');
  }
}

/***/ }),

/***/ 443:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(444);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(379)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/_css-loader@0.28.7@css-loader/index.js??ref--3-2!../../../../../node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js??ref--3-3!./style.less", function() {
			var newContent = require("!!../../../../../node_modules/_css-loader@0.28.7@css-loader/index.js??ref--3-2!../../../../../node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js??ref--3-3!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 444:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: Cannot find module 'less'\n    at Function.Module._resolveFilename (module.js:469:15)\n    at Function.Module._load (module.js:417:25)\n    at Module.require (module.js:497:17)\n    at require (internal/module.js:20:19)\n    at Object.<anonymous> (/Users/bin/Desktop/angular4-learn/demo/node_modules/_less-loader@4.0.5@less-loader/dist/index.js:7:13)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)\n    at Function.Module._load (module.js:438:3)\n    at Module.require (module.js:497:17)\n    at require (internal/module.js:20:19)\n    at Object.<anonymous> (/Users/bin/Desktop/angular4-learn/demo/node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js:3:18)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)\n    at Function.Module._load (module.js:438:3)\n    at Module.require (module.js:497:17)\n    at require (internal/module.js:20:19)\n    at loadLoader (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/loadLoader.js:13:17)\n    at iteratePitchingLoaders (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:165:10)\n    at /Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:173:18\n    at loadLoader (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/loadLoader.js:36:3)\n    at iteratePitchingLoaders (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:169:2)\n    at runLoaders (/Users/bin/Desktop/angular4-learn/demo/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:362:2)\n    at NormalModule.doBuild (/Users/bin/Desktop/angular4-learn/demo/node_modules/_webpack@3.10.0@webpack/lib/NormalModule.js:182:3)\n    at NormalModule.build (/Users/bin/Desktop/angular4-learn/demo/node_modules/_webpack@3.10.0@webpack/lib/NormalModule.js:275:15)\n    at Compilation.buildModule (/Users/bin/Desktop/angular4-learn/demo/node_modules/_webpack@3.10.0@webpack/lib/Compilation.js:151:10)");

/***/ })

});