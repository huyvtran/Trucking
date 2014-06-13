// TODO: Create init function for each controller
// TODO: Implement barcode / QR scanner
// TODO: Copy MySQL data into the form, save the data when you FINALIZE

angular.module('ticket.photos.ctrl', [])

  .controller('PhotosCtrl', function ($scope, $stateParams, $http, Photo, DespachoFoto, DespachoFotoTipo, Blob) {

    var despacho_SEQ = $stateParams.SEQ;

    $scope.progressStyle = function (photo) {
      return {'width': ' ' + photo.progress + '%'};
    };

    Blob.getAll().$promise.then(function (result) {
      //console.log(result);
    }, function (error) {
      console.log(error);
    });

    DespachoFotoTipo.getWithCliente({cliente_SEQ: 0}).$promise.then(function (data) {
      $scope.fotoTipos = data;

      angular.forEach(data, function (res) {
        console.log(res.SEQ);
      });

      DespachoFoto.getWithDespacho({despacho_SEQ: despacho_SEQ}).$promise.then(function (data) {
        var fotoID = [];
        angular.forEach(data, function (res) {
          fotoID.push(res.foto_id);
        });

        var i =0;
        angular.forEach($scope.fotoTipos, function (each) {
          each.photo = 'http://www.desa-net.com/TOTAI/db/blob/get?id=' + fotoID[i];
          i++;
        });

      }, function (error) {
        console.log(error);
      });
    }, function (error) {
      console.log(error);
    });




    // capture + upload + mysql record
    $scope.capturePhoto = function (photo) {

      function onSuccess(imageData) {
        $scope.$apply(photo.photo = imageData);
        photo.progress = 0;

        var options = new FileUploadOptions();
        console.log(FileUploadOptions);
        options.fileKey = "file";
        options.fileName = 'filename';
        options.mimeType = "image/jpeg";
        options.chunkedMode = false;
        options.headers = {Connection: "close"};
        options.params = {
          despacho_SEQ: despacho_SEQ,
          categoria: photo.categoria,
          detaille: photo.detaille,
          filetype: 'JPG',
          db: 'desanet',
          tabla: 'despacho_foto',
          tipo_SEQ: photo.SEQ
        };


        Photo.upload(imageData, options).then(
          function (result) {
            alert('Code: ' + result.responseCode + '  Response:  ' + result.response);
          },
          function (error) {
            alert('ERROR:   Code: ' + error.code + 'Source: ' + error.source + 'http: ' + error.http_status);
          },
          function (progress) {
            photo.progress = progress;
          });
      }

      function onFail(message) {
        alert('Failed because: ' + message);
      }

      navigator.camera.getPicture(onSuccess, onFail,
        { quality: 10,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 600,
          targetHeight: 600,
          saveToPhotoAlbum: false,
          correctOrientation: false,
          sourceType: Camera.PictureSourceType.CAMERA,
          destinationType: Camera.DestinationType.FILE_URI
        });
    }

  })


  .controller('PhotosMenuCtrl', function ($scope, $stateParams, $ionicLoading, Photo, DespachoFotoTipo) {

    DespachoFotoTipo.getWithCliente({cliente_SEQ: 0}).$promise.then(function (data) {
      $scope.fotoTipos = data;
    });

  });