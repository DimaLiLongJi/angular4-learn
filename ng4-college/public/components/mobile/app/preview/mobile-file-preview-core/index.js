import PDFObject from 'pdfobject';

angular.module('App')
    .component('filePreviewCore', {
      templateUrl: '/components/mobile/app/preview/mobile-file-preview-core/template.html',
      controller: filePreviewCtr,
      controllerAs: 'vm',
      bindings: {
        fileInfo: '=',
      },
    });

  filePreviewCtr.$inject = [
    '$document',
    '$scope',
    '$timeout',
    'fileService'
  ];

  function filePreviewCtr(
    $document,
    $scope,
    $timeout,
    fileService
  ) {
    let vm = this;
    let widthInit,
      imageDom,
      imageWidth,
      imageHeight,
      clientWidth,
      clientHeight,
      scale = 1,
      angle = 0;
    vm.percent = 100;
    vm.loadState = true;


    vm.zoom = zoom;
    vm.rotate = rotate;

    $scope.$watch('vm.fileInfo', (n) => {
      if (n && n.name) activate();
    });

    function activate() {
      vm.file = parseFile(vm.fileInfo);
      // return activateIEMode();
      if (vm.file.type === 'img') return activateImg();
      if (vm.file.type !== 'pdf' && vm.file.type !== 'office') {
        vm.noPreview = true;
        return 1;
      } else if (PDFObject.supportsPDFs) {
        if (vm.file.type === 'pdf' && PDFObject.supportsPDFs) {
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
      PDFObject.embed(vm.file.src, '#pdfobject');
      vm.loadState = false;
    }

    function activateOffice() {
      vm.file.type = 'pdf';
      const defaultDomain = 'http://media.careerfrog.com.cn/';
      return fileService.getFileHashName(vm.file.fileId)
        .then((file) => {
          if (isOfficeDoc(file.hashName)) {
            vm.file.src =
              `${defaultDomain}${encodeURIComponent(file.hashName)}?odconv/pdf`; // qiniu doc convert api
          }
          return activatePdf();
        })
        .catch((err) => {
          console.error('err is', err);
        });
    }

    function activateIEMode() {
      vm.IEMode = true;
      fileService.getFileHashName(vm.file.fileId, true)
        .then((file) => {
          if (isOfficeDoc(file.hashName)) {
            $timeout(activateIEMode, 2000);
          } else {
            fileService.getImages(vm.file.fileId, true)
              .then((result) => {
                vm.file.images = [];
                result.images.forEach((url, idx) => {
                  vm.file.images.push({
                    id: 'img-' + idx,
                    url,
                  });
                })
                $timeout(() => {
                  $('.pdf-viwer-images')
                    .hide();
                  let img = document.getElementById(vm.file.images[
                      0]
                    .id);
                  img.onload = () => {
                    vm.loadState = false;
                    $('#loader')
                      .hide();
                    $('.pdf-viwer-images')
                      .show();
                  };
                  $timeout(() => {
                    if (vm.loadState) {
                      $('#loader')
                        .hide();
                      $('.pdf-viwer-images')
                        .show();
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

      imageDom[0].onload = function() {
        imageWidth = imageDom[0].width;
        imageHeight = imageDom[0].height;
        widthInit = imageDom.width();
        $scope.$apply(() => {
          vm.loadState = false;
        });
        if (imageWidth > clientWidth || imageHeight > clientHeight) {
          imageDom.css('width', imageWidth * 0.5 + 'px');
          widthInit = imageWidth * 0.5;
          $scope.$apply(() => {
            vm.percent = 50;
          });
        } else {
          widthInit = imageDom.width();
        }
      };
    }

    function parseFile(f) {
      if (!f) return;
      let sizeInKB = f.size / 1000;
      f.download =
        `${f.download.split('originalName')[0]}&originalName=${encodeURIComponent(f.name)}&download=1`;
      // f.src =`${f.download.split('originalName')[0]}&originalName=${encodeURIComponent(f.name)}`;
      f.size = sizeInKB < 500 ? `${sizeInKB.toFixed(1)} KB` :
        `${(sizeInKB/1000).toFixed(1)} MB`;
      f.extName = f.name.substring(f.name.lastIndexOf('.') + 1)
        .toLowerCase();
      if (f.extName === 'pdf') f.type = 'pdf';
      if (f.extName === 'jpg' || f.extName === 'jpeg' || f.extName === 'png')
        f.type = 'img';
      if (isOfficeDoc(f.extName)) f.type = 'office';
      return f;
    }

    function isOfficeDoc(filename) {
      return /(doc)|(docx)|(ppt)|(pptx)|(xls)|(xlsx)$/.test(filename);
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
