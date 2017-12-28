webpackJsonp([4],{

/***/ 592:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(640);

__webpack_require__(641);

__webpack_require__(681);

exports.default = angular.module('App').controller('previewCtrl', previewCtrl);

previewCtrl.$inject = ['CF_FILE_BASE_URL', 'fileService', '$location', 'wechatService', '$stateParams'];

function previewCtrl(CF_FILE_BASE_URL, fileService, $location, wechatService, $stateParams) {
  var vm = this;
  vm.goBack = goBack;
  vm.$onInit = function () {
    console.log('$location.$$url==', $location.$$url);
    vm.file = {
      fileId: $location.$$url.match(/.+\/(\d+)/)[1],
      encodeOriginalName: $location.$$url.match(/.+\/(\d+)\/(.+)/)[2].replace(/\?.*/g, ''),
      originalName: decodeURIComponent(decodeURIComponent($location.$$url.match(/.+\/(\d+)\/(.+)/)[2].replace(/\?.*/g, '')))
    };

    vm.fileInfo = {
      name: '' + vm.file.encodeOriginalName,
      src: CF_FILE_BASE_URL + '/' + vm.file.fileId + '?originalName=' + vm.file.encodeOriginalName,
      download: CF_FILE_BASE_URL + '/' + vm.file.fileId + '?originalName=' + vm.file.encodeOriginalName + '&download=1',
      fileId: vm.file.fileId,
      originalName: vm.file.originalName
    };
    if ($stateParams.isInterviewMaterial) {
      wechatService.setWxShareInfo({
        link: $location.absUrl(),
        title: vm.fileInfo.originalName,
        desc: '求职学堂精品推出，最热门行业面经汇总，立刻前往查看→',
        imgUrl: 'http://static.careerfrog.com.cn/cf-college/images/share.06b6e3ab.jpg'
      });
    }

    // // vm.showPreviewMask =
    // if (!localStrage.getItem('firstUsedPreview')) {
    //   localStrage.setItem('firstUsedPreview', )
    // }
  };

  function goBack() {
    var history = sessionStorage.getItem('industryInterviewPreviewModalFrom');
    if (history) {
      window.history.back();
    } else {
      window.open('/mobile//discovery/interview_material', '_self');
    }
  }
}

/***/ }),

/***/ 640:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _photoswipe = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"photoswipe\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _photoswipe2 = _interopRequireDefault(_photoswipe);

var _photoswipeUiDefault = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"photoswipe/dist/photoswipe-ui-default\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _photoswipeUiDefault2 = _interopRequireDefault(_photoswipeUiDefault);

__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"photoswipe/dist/photoswipe.css\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"photoswipe/dist/default-skin/default-skin.css\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import PDFObject from 'pdfobject';
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

  // vm.zoom = zoom;
  // vm.rotate = rotate;

  // $scope.$watch('vm.fileInfo', (n) => {
  //   if (n && n.name) activate();
  // });
  vm.$onInit = function () {
    // $('.pswp').height($('body').height() - $('.page-title').height());
    activateIEMode().then(function () {
      var pswpElement = $('.pswp')[0];
      var items = void 0;
      if (vm.fileInfo.images) {
        items = vm.fileInfo.images.map(function (image) {
          return {
            src: image.url,
            w: 600,
            h: 600,
            doGetSlideDimensions: true
          };
        });
      }
      var options = {
        index: 0, // start at first slide
        preload: [1, 2],
        loop: false,
        pinchToClose: false,
        closeOnVerticalDrag: false,
        history: false,
        closeEl: false,
        fullscreenEl: false,
        shareEl: false,
        tapToToggleControls: false
      };
      if (window.devicePixelRatio && devicePixelRatio >= 2) {
        options.maxSpreadZoom = 3;
      }
      var gallery = new _photoswipe2.default(pswpElement, _photoswipeUiDefault2.default, items, options);
      // gettingData event fires each time PhotoSwipe retrieves image source & size
      var currentIndex = void 0;
      gallery.listen('gettingData', function (index, slide) {
        currentIndex = index;
        if (slide.doGetSlideDimensions) {
          setTimeout(
          // use setTimeout so that it runs in the event loop
          function () {
            getSlideDimensions(index, slide);
          }, 300);
        }
      });

      gallery.listen('imageLoadComplete', function (index, slide) {
        if (slide.doGetSlideDimensions) {
          getSlideDimensions(index, slide);
        }
      });

      function getSlideDimensions(index, slide) {
        if (!slide.doGetSlideDimensions) {
          return;
        }

        var img = new Image();
        var indexWhenStartLoading = currentIndex;

        $(img).on('error', function () {
          // make sure we don't keep requesting the image if it doesn't exist etc.
          slide.doGetSlideDimensions = false;
        });

        $(img).on('load', function () {
          slide.doGetSlideDimensions = false;

          slide.w = img.naturalWidth;
          slide.h = img.naturalHeight;
          if (index === indexWhenStartLoading || index === 0) {
            gallery.invalidateCurrItems();
            gallery.updateSize(true);
          }
        });

        img.src = slide.src;
      }
      if (items) {
        gallery.init();
      }
    });
  };

  // function activatePdf() {
  //   PDFObject.embed(vm.fileInfo.src, '#pdfobject');
  //   vm.loadState = false;
  // }

  // function activateOffice() {
  //   vm.fileInfo.type = 'pdf';
  //   const defaultDomain = 'http://media.careerfrog.com.cn/';
  //   return fileService.getFileHashName(vm.fileInfo.fileId)
  //     .then((file) => {
  //       if (isOfficeDoc(file.hashName)) {
  //         vm.fileInfo.src =
  //           `${defaultDomain}${encodeURIComponent(file.hashName)}?odconv/pdf`; // qiniu doc convert api
  //       }
  //       return activatePdf();
  //     })
  //     .catch((err) => {
  //       console.error('err is', err);
  //     });
  // }

  function activateIEMode() {
    vm.IEMode = true;

    return fileService.getFileHashName(vm.fileInfo.fileId, true).then(function (file) {
      if (isOfficeDoc(file.hashName)) {
        $timeout(activateIEMode, 2000);
      } else {
        return fileService.getImages(vm.fileInfo.fileId, true).then(function (result) {
          vm.fileInfo.images = [];
          result.images.forEach(function (url, idx) {
            vm.fileInfo.images.push({
              id: 'img-' + idx,
              url: url
            });
          });

          $timeout(function () {
            $('.pdf-viwer-images').hide();
            $timeout(function () {
              if (vm.loadState) {
                $('#loader').hide();
                $('.pdf-viwer-images').show();
              }
            }, 500);
          }, 0);
          return Promise.resolve();
        });
      }
    });
  }

  function activateImg() {
    vm.loadState = true;
    vm.imageUrl = vm.fileInfo.src;
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
    if (f.extName === 'jpg' || f.extName === 'jpeg' || f.extName === 'png') {
      f.type = 'img';
    }
    if (isOfficeDoc(f.extName)) f.type = 'office';
  }

  function isOfficeDoc(filename) {
    return (/(doc)|(docx)|(ppt)|(pptx)|(xls)|(xlsx)$/.test(filename)
    );
  }

  // function zoom(order) {
  //   if (!PDFObject.supportsPDFs && !widthInit) {
  //     imageDom = $document.find('img');
  //     widthInit = imageDom[2].width;
  //   }
  //   if (order === 'in') {
  //     scale += 0.1;
  //     vm.percent += 10;
  //   } else {
  //     if (vm.percent <= 100) return;
  //     scale -= 0.1;
  //     vm.percent -= 10;
  //   }
  //   imageDom.css('width', `${scale * widthInit}px`);
  //   const imgContainer = document.getElementsByClassName('img-container');
  //   Array.prototype.forEach.call(imgContainer, (element) => {
  //     element.style.width = `${scale * widthInit}px`;
  //   });
  // }

  //   function rotate() {
  //     if (!PDFObject.supportsPDFs && !widthInit) {
  //       imageDom = $document.find('img');
  //       widthInit = imageDom[2].width;
  //     }
  //     angle += 90;
  //     imageDom.css('transform', `rotate(${angle}deg)`);
  //   }
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
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/bin/Desktop/careerfrog/cf-college/node_modules/_svgo@0.7.2@svgo/lib/svgo/../../.svgo.yml'\n    at Error (native)\n    at Object.fs.openSync (fs.js:641:18)\n    at Object.fs.readFileSync (fs.js:509:33)\n    at module.exports (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_svgo@0.7.2@svgo/lib/svgo/config.js:31:48)\n    at new module.exports (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_svgo@0.7.2@svgo/lib/svgo.js:21:19)\n    at /Users/bin/Desktop/careerfrog/cf-college/node_modules/_postcss-svgo@2.1.6@postcss-svgo/dist/index.js:95:16\n    at Object.creator [as postcssSvgo] (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_postcss@5.2.18@postcss/lib/postcss.js:150:35)\n    at /Users/bin/Desktop/careerfrog/cf-college/node_modules/_cssnano@3.10.0@cssnano/dist/index.js:295:40\n    at Array.forEach (native)\n    at /Users/bin/Desktop/careerfrog/cf-college/node_modules/_cssnano@3.10.0@cssnano/dist/index.js:282:29\n    at creator (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_postcss@5.2.18@postcss/lib/postcss.js:150:35)\n    at processCss (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_css-loader@0.28.7@css-loader/lib/processCss.js:199:16)\n    at Object.module.exports (/Users/bin/Desktop/careerfrog/cf-college/node_modules/_css-loader@0.28.7@css-loader/lib/loader.js:40:2)");

/***/ }),

/***/ 681:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('App').component('previewMask', {
  templateUrl: '/components/mobile/app/preview/preview-mask/template.html',
  controller: previewMaskCtr,
  controllerAs: 'vm'
});

previewMaskCtr.$inject = ['$USER'];

function previewMaskCtr($USER) {
  var vm = this;

  vm.$onInit = function () {
    vm.user = $USER;

    if (window.localStorage.getItem('firstlyUsedPreviewBy') === vm.user.id.toString()) {
      vm.show = false;
    } else {
      vm.show = true;
      window.localStorage.setItem('firstlyUsedPreviewBy', vm.user.id);
    }
    vm.closeMask = closeMask;
  };

  function closeMask() {
    if (!vm.show) return;
    vm.show = !vm.show;
  }
}

/***/ })

});