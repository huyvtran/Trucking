// TODO: Use SEQ number to obtain initial values
// TODO: Update info to MySql server, on loss of focus
// TODO: Create init function for each controller
// TODO: Validation with tab icons
// TODO: Implement photos
// TODO: Exit and Clear button for each header
// TODO: Implement barcode / QR scanner
// TODO: Copy MySQL data into the form, save the data when you FINALIZE

angular.module('ticket.photos.ctrl', [])

  .controller('PhotosCtrl', function ($scope, $stateParams, Photo, PhotoRequirements) {
    var despacho_SEQ = $stateParams.SEQ;

    $scope.photoRequirements = PhotoRequirements.getAll();


    Photo.getAll().then(function (data) {
      var photosAll = data;
    });

    Photo.getWithDespacho(despacho_SEQ).then(function (data) {
      angular.forEach(data, function (d) {
        console.log('tipo: ' + d.tipo + ' detaille: ' + d.detaille);
      })
    });

    $scope.progressStyle = function (photo) {
      return {'width': ' ' + photo.progress + '%'};
    };

    $scope.capturePhoto = function (photo) {

      function onSuccess(imageData) {
        $scope.$apply(photo.image = imageData);

        var now = new Date();
        var dateTime = now.toISOString();

        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = despacho_SEQ + '_' + photo.type + '_' + photo.detaille + '_' + dateTime;
        options.mimeType = "image/jpeg";
        options.chunkedMode = false;
        options.headers = {Connection: "close"};
        options.params = {
          'despacho_SEQ': despacho_SEQ
        };

        Photo.upload(imageData, options).then(function (result) {
          photo.status = 1;

          var thisPhoto = {};
          thisPhoto.despacho_SEQ = despacho_SEQ;
          thisPhoto.tipo = photo.tipo;
          thisPhoto.detaille = photo.detaille;
          thisPhoto.obligatorio = photo.obligatorio;
          thisPhoto.status = photo.status;
          thisPhoto.archivo_nombre = despacho_SEQ + '_' + thisPhoto.tipo + '_' + thisPhoto.detaille + '_' + dateTime;
          thisPhoto.archivo_ruta = 'var/' + despacho_SEQ + '/' + thisPhoto.archivo_nombre;
          thisPhoto.mime_type = "image/jpeg";
          thisPhoto.fecha_hora = dateTime;

          Photo.post(thisPhoto).then(function (result) {
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
        { quality: 20,
          allowEdit: false,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 700,
          targetHeight: 700,
          saveToPhotoAlbum: false,
          sourceType: Camera.PictureSourceType.CAMERA,
          destinationType: Camera.DestinationType.FILE_URI
        });
    }

  })
;