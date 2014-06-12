// TODO: Create init function for each controller
// TODO: Implement barcode / QR scanner
// TODO: Copy MySQL data into the form, save the data when you FINALIZE

angular.module('ticket.photos.ctrl', [])

  .controller('PhotosCtrl', function ($scope, $stateParams, Photo, DespachoFotoTipo) {

    var despacho_SEQ = $stateParams.SEQ;

    $scope.progressStyle = function (photo) {
      return {'width': ' ' + photo.progress + '%'};
    };


    DespachoFotoTipo.getWithCliente({cliente_SEQ: 0}).$promise.then(function (data) {
      $scope.fotoTipos = data;
    });


    // capture + upload + mysql record
    $scope.capturePhoto = function (photo) {

      function onSuccess(imageData) {
        $scope.$apply(photo.image = imageData);

        var now = new Date();
        var dateTime = now.toISOString();
        var filename = despacho_SEQ + '_' + photo.tipo + '_' + photo.detaille;

        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = filename;
        options.mimeType = "image/jpeg";
        options.chunkedMode = false;
        options.headers = {Connection: "close"};
        options.params = {
          'despacho_SEQ': despacho_SEQ
        };

        photo.progress = 0;

        Photo.upload(imageData, options).then(function (result) {

          var newPhoto = {
            despacho_SEQ: despacho_SEQ,
            tipo: photo.tipo,
            detaille: photo.detaille,
            obligatorio: photo.obligatorio,
            status: 1,
            archivo_nombre: filename,
            archivo_ruta: 'var/' + despacho_SEQ + '/' + filename,
            mime_type: "image/jpeg",
            fecha_hora: dateTime
          };

          Photo.post(newPhoto).then(function (result) {
            console.log(result);
          }, function (error) {
            console.log(error);
          });
          alert('Code: ' + result.responseCode + '  Response ' + result.response);
        }, function (error) {
          alert('Code: ' + error.code + 'Source: ' + error.source + 'http: ' + error.http_status);
        }, function (progress) {
          photo.progress = progress;
        });
      }

      function onFail(message) {
        alert('Failed because: ' + message);
      }

      navigator.camera.getPicture(onSuccess, onFail,
        { quality: 10,
          allowEdit: false,
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