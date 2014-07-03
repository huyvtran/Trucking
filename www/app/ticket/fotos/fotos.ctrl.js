angular.module('ticket.photos.ctrl', [])

  // main photo controller
  .controller('FotosCtrl', function ($rootScope, $scope, $stateParams, $timeout, $ionicModal, $ionicSlideBoxDelegate, Photo, Camera, DespachoFoto, DespachoFotoTipo, Blob) {

    var despacho_SEQ = $stateParams.SEQ;
    $scope.despacho_SEQ = despacho_SEQ;

    $scope.progressStyle = function (photo) {
      return {'width': ' ' + photo.progress + '%'};
    };


    // get foto requirements
    DespachoFotoTipo.getWithCliente({cliente_SEQ: 0}).$promise.then(function (data) {
      $scope.fotoTipos = data;

      // get fotos stored in db
      DespachoFoto.getWithDespacho({despacho_SEQ: despacho_SEQ}).$promise.then(function (data) {

        var groupedDespachoFoto = _.groupBy(data, 'tipo_SEQ');

        // set foto id for each to latest photo
        angular.forEach($scope.fotoTipos, function (each) {
          each.taken = 0;
          angular.forEach(groupedDespachoFoto, function (d) {
            if (each.SEQ == d[0].tipo_SEQ) {
            // uses $ rootScope DB_URL
              each.photo = $rootScope.DB_URL + 'blob/get?id=' + d[d.length - 1].foto_id;
              each.taken = d.length;
            }
          });
        });

      }, function (error) {
        console.log(error);
      });
    }, function (error) {
      console.log(error);
    });

    $scope.expandPhotos = function (photo) {
      $scope.modal.show();

      $scope.slidePhotos = [];
      DespachoFoto.getWithTipoSEQ({tipo_SEQ: photo.SEQ}).$promise.then(function (data) {
        angular.forEach(data, function (d) {
          if (d.despacho_SEQ == despacho_SEQ) {
            $scope.slidePhotos.push($rootScope.DB_URL + 'blob/get?id=' + d.foto_id);
            $timeout(function () {
              $ionicSlideBoxDelegate.slide(0);
              $ionicSlideBoxDelegate.update();
            }, 500);
          }
        });

      });
    };

    $ionicModal.fromTemplateUrl('viewPhotos.html', {
      scope: $scope,
      animation: 'slide-in-up',
      backdropClickToClose: false
    }).then(function (modal) {
      $scope.modal = modal;
    });


    // capture + upload + mysql record
    $scope.capturePhoto = function (photo) {

      var cameraOptions = { quality: 10,
        allowEdit: false,
        encodingType: 0, //JPEG
        targetWidth: 600,
        targetHeight: 600,
        saveToPhotoAlbum: false,
        correctOrientation: false,
        sourceType: 1, // Camera
        destinationType: 1 // File Uri
      };

      Camera.capture(cameraOptions).then(function (imageData) {

          alert('imageData: ' + imageData);

          $scope.$apply(photo.photo = imageData);

          // upload options
          var options = new FileUploadOptions();
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
            producto: photo.producto,
            etapa: photo.etapa
          };

          Photo.upload(imageData, options).then(
            function (result) {
              console.log('upload success');
              alert('Code: ' + result.responseCode + '  Response:  ' + result.response);
            },
            function (error) {
              console.log('upload error');
              alert('ERROR:   Code: ' + error.code + 'Source: ' + error.source + 'http: ' + error.http_status);
            },
            // progress of upload
            function (progress) {
              //photo.progress = progress;
            });

        },
        function (error) {
          alert('camera error: ' + error);
        });
    }

  })


  .controller('ViewFotosCtrl', function ($scope) {

    $scope.closeModal = function () {
      $scope.slidePhotos.length = 0;
      $scope.modal.hide();
    };

  })

  // photo sidemenu controller
  .controller('FotosMenuCtrl', function ($scope, $stateParams, $ionicLoading, Photo, DespachoFoto, DespachoFotoTipo) {

    var despacho_SEQ = $stateParams.SEQ;
    $scope.despacho_SEQ = despacho_SEQ;

    // get all foto requirements
    DespachoFotoTipo.getWithCliente({cliente_SEQ: 0}).$promise.then(function (data) {
      $scope.fotoTipos = data;

      // get fotos stored in db
      DespachoFoto.getWithDespacho({despacho_SEQ: despacho_SEQ}).$promise.then(function (data) {

        var groupedDespachoFoto = _.groupBy(data, 'tipo_SEQ');

        // set foto id for each to latest photo
        angular.forEach($scope.fotoTipos, function (each) {
          each.taken = 0;
          angular.forEach(groupedDespachoFoto, function (d) {
            if (each.SEQ == d[0].tipo_SEQ) {
              each.taken = d.length;
            }
          });
        });

      }, function (error) {
        console.log(error);
      });
    }, function (error) {
      console.log(error);
    });
  })
;




