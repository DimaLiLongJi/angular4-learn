webpackJsonp([4],{

/***/ 313:
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

/***/ 592:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(640);

__webpack_require__(641);

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

/***/ 640:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _pdfobject = __webpack_require__(313);

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

/***/ 641:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(642);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(578)(content, options);
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

/***/ 642:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(577)(undefined);
// imports


// module
exports.push([module.i, ".page-padding{padding-right:.38709677rem!important;padding-left:.38709677rem!important}.avatar{width:1.61290323rem;flex:0 0 1.61290323rem;height:1.61290323rem;background-repeat:no-repeat;background-size:100% 100%;box-sizing:border-box}.avatar img{width:100%;height:100%}.btn-sm{padding:0 .12903226rem;height:.58064516rem;line-height:.58064516rem;border-radius:.09677419rem;font-size:12px;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .btn-sm{font-size:24px}[data-dpr=\"3\"] .btn-sm{font-size:36px}.btn-sm.primary{color:#fff;background:#378ced}.btn-md{height:.64516129rem;display:flex;align-items:center;justify-content:center;border-radius:.0483871rem;padding:0 .40322581rem;font-size:14px}[data-dpr=\"2\"] .btn-md{font-size:28px}[data-dpr=\"3\"] .btn-md{font-size:42px}.btn-lg{display:block;width:9.22580645rem;height:1.12903226rem;line-height:1.12903226rem;text-align:center;font-size:16px;background:#378ced;border:none;color:#fff;margin-right:auto;margin-left:auto;border-radius:0;padding:0;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .btn-lg{font-size:32px}[data-dpr=\"3\"] .btn-lg{font-size:48px}.btn-lg.primary{color:#fff;background:#378ced}.btn-md-round{height:.79032258rem;line-height:.79032258rem;border-radius:.40322581rem;padding:0 .40322581rem;box-sizing:content-box;font-size:17px}[data-dpr=\"2\"] .btn-md-round{font-size:34px}[data-dpr=\"3\"] .btn-md-round{font-size:51px}.tag-md{padding:0 .12903226rem;height:.48387097rem;line-height:.48387097rem;border-radius:4px;display:inline-block;font-size:12px;background:#f2f4f5;color:#a0a9b3}[data-dpr=\"2\"] .tag-md{font-size:20px}[data-dpr=\"3\"] .tag-md{font-size:30px}.tag-md.gold{color:#fff;background:#d9bc8b}.tag-md.yellow{color:#fff;background:#ffc244}.tag-md.red{color:#fff;background:#fb6244}.tag-md.grey{color:#fff;background:#cad2db}.tab-selected{position:relative}.tab-selected:after{position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:.78rem;height:.08064516rem;content:\"\";color:#378ced;background:#378ced}.pdf-viwer-images{height:100%;overflow:scroll}.pdf-viwer-images .img-container{background-color:#525659;text-align:center}.pdf-viwer-images .img-container img{width:100vw;height:auto}.pdf-viwer-images p{padding:.19354839rem 0;color:#fff}.clear-float:after{content:\"\";clear:both;display:block}.clear-float{zoom:1}a,a:active,a:hover,a:link,a:visited{text-decoration:none}.show-info span{color:#666}.file-viewer{height:100%}.file-viewer .pdf-viewer{height:100%;overflow:hidden}.file-viewer .pdf-viewer #pdfobject{height:calc(100% + 48/124rem);border:0;transform:translateY(-.38709677rem)}.file-preview-container{min-width:5.80645161rem;width:100%;height:100%;border-radius:.03225806rem}.file-preview-container #image-preview{height:100%;padding:.16129032rem;padding-top:.80645161rem;position:absolute;margin:0 auto;left:0;top:0;right:0;bottom:0;max-width:none;z-index:1;width:auto}.file-preview-container #tool-bar{position:fixed;left:50%;bottom:10%;transform:translateX(-50%);background:rgba(0,0,0,.6);border-radius:.03225806rem;z-index:2;padding:0;width:1.40322581rem}.file-preview-container #tool-bar li{float:left;list-style:none;font-size:.09677419rem}.file-preview-container #tool-bar li a{display:block;color:#fff;width:.16129032rem;height:.16129032rem;line-height:.16129032rem;text-align:center;margin:.08064516rem}.file-preview-container #tool-bar li:first-child a{background:url(\"/images/icons/icons-materials.png\") no-repeat -.92741935rem -.18548387rem}.file-preview-container #tool-bar li:first-child a:hover{background:url(\"/images/icons/icons-materials.png\") no-repeat -.92741935rem 0}.file-preview-container #tool-bar li:nth-child(2) a{min-width:.25806452rem}.file-preview-container #tool-bar li:nth-child(3) a{background:url(\"/images/icons/icons-materials.png\") no-repeat -.70967742rem -.19354839rem}.file-preview-container #tool-bar li:nth-child(3) a:hover{background:url(\"/images/icons/icons-materials.png\") no-repeat -.70967742rem -.00806452rem}.file-preview-container #tool-bar li:nth-child(4) a{background:url(\"/images/icons/icons-materials.png\") no-repeat -1.15322581rem -.18548387rem}.file-preview-container #tool-bar li:nth-child(4) a:hover{background:url(\"/images/icons/icons-materials.png\") no-repeat -1.15322581rem 0}.file-bar{line-height:.32258065rem;background:#fff;color:#333;position:fixed;top:0;z-index:10;width:100%;box-shadow:0 .00806452rem .00806452rem 0 rgba(0,0,0,.9)}.file-bar .file-type-icon{float:left;width:.19354839rem;height:.22580645rem;margin:.04032258rem 0 .12903226rem .12096774rem;background:url(\"/images/icons/icons-materials.png\") no-repeat 0 -.82258065rem}.file-bar .file-type-icon.pdf{background:url(\"/images/icons/icons-materials.png\") no-repeat 0 0}.file-bar .file-type-icon.doc,.file-bar .file-type-icon.docx{background:url(\"/images/icons/icons-materials.png\") no-repeat 0 -.27419355rem}.file-bar .file-type-icon.ppt,.file-bar .file-type-icon.pptx{background:url(\"/images/icons/icons-materials.png\") no-repeat 0 -.5483871rem}.file-bar .file-type-icon.jpeg,.file-bar .file-type-icon.jpg,.file-bar .file-type-icon.png{background:url(\"/images/icons/icons-materials.png\") no-repeat 0 -1.06451613rem}.file-bar .file-name{float:left;margin:0 .08064516rem;font-size:.11290323rem;font-weight:400}.file-bar .download-btn{float:left;text-decoration:none;width:.58870968rem;height:.22580645rem;border:.00806452rem solid #63c655;border-radius:.01612903rem;margin-top:.0483871rem;line-height:.22580645rem;color:#63c655;font-size:.09677419rem}.file-bar .download-btn span{float:left;margin:.0483871rem .0483871rem .0483871rem .11290323rem;width:.16129032rem;height:.12903226rem;background:url(\"/images/icons-materials.png\") no-repeat -.50806452rem 0}.cant-preview-tip{position:absolute;top:0;bottom:0;left:0;right:0;margin:auto}.spinner{position:fixed;z-index:1000;top:50%;left:50%;width:.40322581rem;height:.48387097rem;text-align:center;font-size:.08064516rem;transform:translate(-50%,-50%)}.spinner>div{background-color:#dbdbdb;height:100%;width:.0483871rem;display:inline-block;-webkit-animation:stretchdelay 1.2s infinite ease-in-out;animation:stretchdelay 1.2s infinite ease-in-out}.spinner .rect2{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.spinner .rect3{-webkit-animation-delay:-1s;animation-delay:-1s}.spinner .rect4{-webkit-animation-delay:-.9s;animation-delay:-.9s}.spinner .rect5{-webkit-animation-delay:-.8s;animation-delay:-.8s}@-webkit-keyframes stretchdelay{0%,40%,to{-webkit-transform:scaleY(.4)}20%{-webkit-transform:scaleY(1)}}@keyframes stretchdelay{0%,40%,to{transform:scaleY(.4);-webkit-transform:scaleY(.4)}20%{transform:scaleY(1);-webkit-transform:scaleY(1)}}.preview-container{padding-top:1.09677419rem}.preview-container h3{font-size:18px}[data-dpr=\"2\"] .preview-container h3{font-size:36px}[data-dpr=\"3\"] .preview-container h3{font-size:54px}.preview-container .page-title{width:100%;padding:0 .80645161rem 0 1.12903226rem;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;position:fixed;top:0;z-index:100}", ""]);

// exports


/***/ })

});