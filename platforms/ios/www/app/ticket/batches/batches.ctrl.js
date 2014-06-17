angular.module('ticket.batches.ctrl', [])

  .controller('BatchesCtrl', function ($scope, $rootScope, $stateParams, BatchUnidad, DespachoBatch, DespachoBatchUnidad) {

    var despacho_SEQ = $stateParams.SEQ;
    var batch_SEQs = [];

    DespachoBatch.getWithDespacho({despacho_SEQ: despacho_SEQ}).$promise.then(function (data) {

      angular.forEach(data, function (res) {
        batch_SEQs.push(res.batch_SEQ);
      })
    });

    // load mp3 for success beep
    var successMP3 = 'img/successBeep.mp3';
    window.plugins.LowLatencyAudio.preloadFX(successMP3, successMP3, function (msg) {
    }, function (error) {
      console.log(error);
    });


    $scope.scan = function () {
      cordova.plugins.barcodeScanner.scan(function (code) {

          if (code.text != '' && code.cancelled != 1) {

            window.plugins.LowLatencyAudio.play(successMP3);

            BatchUnidad.getOne({SEQ: code.text}).$promise.then(function (data) {

              if (_.contains(batch_SEQs, data.batch_SEQ)) {

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
              } else {  // doesn't contain Batch SEQ
                alert('WARNING: Wrong Batch Number!');
              }

            }, function (error) { // batch Unidad
              console.log(error);
            });
          }

          if (code.cancelled == 1) { // close scanner && refresh controller
            $rootScope.$emit('refreshMenuData');
            $rootScope.$broadcast('refreshMenuData');
            console.log('cancelled');
          }
        },
        function (error) {  // barcode scan()
          console.log(error);
        });
    };
  })


  .controller('BatchesMenuCtrl', function ($scope,$rootScope, $stateParams, DespachoBatch, DespachoBatchUnidad) {

    var despacho_SEQ = $stateParams.SEQ;

    $rootScope.$on('refreshMenuData', function (event) {
      console.log(event);
      console.log('refresh menu data called');
      init();
    });

    function init() {

      // get all despacho batches with despacho SEQ
      DespachoBatch.getWithDespacho({despacho_SEQ: despacho_SEQ}).$promise.then(function (data) {

        // group data into batch SEQ
        $scope.despachoBatch = data;

        // get total quantity required in despacho
        $scope.unidadTotal = 0;
        angular.forEach(data, function (d) {
          $scope.unidadTotal += parseInt(d.cantidad);
        });


        // get all desp batch unidad with desp SEQ
        DespachoBatchUnidad.getWithDespacho({despacho_SEQ: despacho_SEQ}).$promise.then(function (response) {
          $scope.despachoBatchUnidad = response;

          $scope.unidadCount = response.length;

        }, function (error) { // Despacho batch unidad
          console.log(error);
        });


      }, function (error) { // Despacho Batch
      });

    }

    init();


  });


