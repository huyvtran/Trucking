// TODO: Create init function for each controller
// TODO: Implement barcode / QR scanner
// TODO: Copy MySQL data into the form, save the data when you FINALIZE

angular.module('ticket.photos.ctrl', [])

  // main photo controller
  .controller('PhotosCtrl', function ($scope, $stateParams, $timeout, $ionicModal, $ionicSlideBoxDelegate, Photo, DespachoFoto, DespachoFotoTipo, Blob) {

    // get global despacho SEQ
    var despacho_SEQ = $stateParams.SEQ;

    // set progress with width
    $scope.progressStyle = function (photo) {
      return {'width': ' ' + photo.progress + '%'};
    };

    // get all blobs
    Blob.getAll().$promise.then(function (result) {
      //console.log(result);
    }, function (error) {
      console.log(error);
    });

    // get foto requirements
    DespachoFotoTipo.getWithCliente({cliente_SEQ: 0}).$promise.then(function (data) {
      $scope.fotoTipos = data;

      // get foto SEQ for each requirement
      angular.forEach(data, function (res) {
        console.log(res.SEQ);
      });

      // get fotos stored in db
      DespachoFoto.getWithDespacho({despacho_SEQ: despacho_SEQ}).$promise.then(function (data) {
        var fotoID = [];
        var fotoTipoSEQ = [];
        angular.forEach(data, function (res) {
          fotoID.push(res.foto_id);
          fotoTipoSEQ.push(res.tipo_SEQ);
        });

        // set foto id for each
        var i = 0;
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


    $ionicModal.fromTemplateUrl('viewPhotos.html', {
      scope: $scope,
      animation: 'slide-in-up',
      backdropClickToClose: true
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.expandPhotos = function (photo) {
      $scope.modal.show();

      $timeout(function () {
        $ionicSlideBoxDelegate.update();
        $scope.tempPhoto = photo;
        console.log($scope.tempPhoto);
      });
    };


    // capture + upload + mysql record
    $scope.capturePhoto = function (photo) {

      // photo success
      function cameraSuccess(imageData) {
        $scope.$apply(photo.photo = imageData);
        photo.progress = 0;

        // upload options
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
          tipo_SEQ: photo.SEQ,
          producto: photo.requerido,
          etapa: photo.etapa
        };


        // upload photo w/ imageData
        Photo.upload(imageData, options).then(
          function (result) {
            alert('Code: ' + result.responseCode + '  Response:  ' + result.response);
          },
          function (error) {
            alert('ERROR:   Code: ' + error.code + 'Source: ' + error.source + 'http: ' + error.http_status);
          },
          // progress of upload
          function (progress) {
            photo.progress = progress;
          });
      }

      // photo error
      function cameraError(message) {
        alert('Failed because: ' + message);
      }

      // take picture
      navigator.camera.getPicture(cameraSuccess, cameraError,
        // options
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

  // photo sidemenu controller
  .controller('PhotosMenuCtrl', function ($scope, $stateParams, $ionicLoading, Photo, DespachoFotoTipo) {

    // get all foto requirements
    DespachoFotoTipo.getWithCliente({cliente_SEQ: 0}).$promise.then(function (data) {
      $scope.fotoTipos = data;
    });
  })

  .controller('ViewPhotosCtrl', function ($scope, $timeout, $stateParams, $ionicLoading, Photo, DespachoFotoTipo) {
      $scope.modalPhotos = $scope.tempPhoto;


  });




