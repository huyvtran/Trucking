angular.module('ticket.batches.ctrl', [])

  .controller('BatchesCtrl', function ($scope, $stateParams, BatchUnidad, DespachoBatchUnidad, $ionicPlatform, Ticket) {

    var despacho_SEQ = $stateParams.SEQ;

    var successMP3 = 'img/successBeep.mp3';

    window.plugins.LowLatencyAudio.preloadFX(successMP3, successMP3, function (msg) {
    }, function (error) {
      console.log(error);
    });


    $scope.scan = function () {
      cordova.plugins.barcodeScanner.scan(function (code) {

          console.log(code);

          if (code.text != '' && code.cancelled != 1) {
            window.plugins.LowLatencyAudio.play(successMP3);
            window.plugins.toast.showLongTop('Success' + code.text);


            BatchUnidad.getOne({SEQ: code.text}).$promise.then(function (data) {
              var newUnidad = {
                'despacho_SEQ': despacho_SEQ,
                'despacho_batch_SEQ': 4,
                'batch_SEQ': data.batch_SEQ,
                'batch_unidad_SEQ': code.text
              };

              DespachoBatchUnidad.addNew(newUnidad).$promise.then(function (success) {
                console.log(success);
              }, function (error) {
                console.log(error);
              });

            }, function (error) {
              console.log(error);
            });
          }
        },
        function (error) {
          console.log(error);
        });
    };
  })


  .controller('BatchesMenuCtrl', function ($scope, $stateParams, DespachoBatch, DespachoBatchUnidad, Ticket) {

    var despacho_SEQ = $stateParams.SEQ;

    DespachoBatch.getWithDespacho({despacho_SEQ: despacho_SEQ}).$promise.then(function (data) {
      $scope.despachoBatch = data;
    }, function (error) {
      console.log(error);
    });

    DespachoBatchUnidad.getAll().$promise.then(function (data) {
      $scope.despachoBatchUnidad = data;
    }, function (error) {
      console.log(error);
    })

  });


