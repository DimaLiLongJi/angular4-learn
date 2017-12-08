import 'ng-file-upload';

(function() {



  angular.module('App')
    .factory('fileService', fileService);

  fileService.$inject = [
    'CF_FILE_BASE_URL',
    '$q',
    'Upload',
    '$resource'
  ];

  function fileService(
    CF_FILE_BASE_URL,
    $q,
    Upload,
    $resource
  ) {
    var fileService = {
      upload,
      download,
      getImages,
      getFileHashName,
    };
    return fileService;

    function upload(files) {
      return Upload.upload({
        url: CF_FILE_BASE_URL,
        data: {
          files: files[0]
        }
      });
    }

    function download(id, originalName, download) {
      var params = {
        originalName: originalName,
        download: download
      };
      return $resource(CF_FILE_BASE_URL + ':id')
        .get({
          id: id
        }, params);
    }

    // function getFileHashName(id, ieMode) {
    //   let deferred = $q.defer();
    //   $resource((ieMode ? '/api/files/' : CF_FILE_BASE_URL) +
    //       ':id/hash_name/', {
    //         id: '@id'
    //       })
    //     .get({
    //       id: id
    //     }, result => {
    //       deferred.resolve(result);
    //     }, error => {
    //       deferred.reject(error);
    //     });
    //   return deferred.promise;
    // }

    function getImages(id) {
      return $resource(`${CF_FILE_BASE_URL}/:id/images/`, {
          id: '@id',
        })
        .get({
          id,
        })
        .$promise;
    }


    function getFileHashName(id) {
      const deferred = $q.defer();
      $resource(`${CF_FILE_BASE_URL}:id/hash_name/`, {
          id: '@id',
        })
        .get({
          id,
        }, (result) => {
          deferred.resolve(result);
        }, (error) => {
          deferred.reject(error);
        });
      return deferred.promise;
    }
  }
})();
