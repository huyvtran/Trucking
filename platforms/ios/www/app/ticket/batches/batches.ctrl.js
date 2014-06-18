angular.module('ticket.batches.ctrl', [])

  // MAIN
  .controller('BatchesCtrl', function ($scope, $rootScope, $stateParams, $ionicPlatform, BatchUnidad, DespachoBatch, DespachoBatchUnidad) {

    var despacho_SEQ = $stateParams.SEQ;
    var batch_SEQs = [];

    DespachoBatch.getWithDespacho({despacho_SEQ: despacho_SEQ}).$promise.then(function (data) {

      angular.forEach(data, function (res) {
        batch_SEQs.push(res.batch_SEQ);
      })
    });

    $rootScope.$on('updateBatchDetail', function () {
      $scope.showBatchDetail = true;
    });

    $rootScope.$on('updateUnidadDetail', function () {
      $scope.showUnidadDetail = true;
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
            $rootScope.$broadcast('refreshMenuData');
          }
        },
        function (error) {  // barcode scan()
          console.log(error);
        });
    };
  })


  // MENU
  .controller('BatchesMenuCtrl', function ($scope, $rootScope, $stateParams, $state, DespachoBatch, DespachoBatchUnidad) {

    var despacho_SEQ = $stateParams.SEQ;

    $rootScope.$on('refreshMenuData', function () {
      init();
    });

    $scope.toggleGroup = function (group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
      }
      $rootScope.$broadcast('updateBatchDetail', group);
    };

    $scope.isGroupShown = function (group) {
      return $scope.shownGroup === group;
    };

    $scope.updateUnidad = function (batch) {
      $rootScope.$broadcast('updateUnidadDetail', batch);
      $scope.activeClass = batch.SEQ;
    };


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
          var groupedDespBatchUnidad = _.groupBy(response, 'batch_SEQ');

          angular.forEach($scope.despachoBatch, function (each) {
            each.taken = 0;
            angular.forEach(groupedDespBatchUnidad, function (d) {
              if (each.batch_SEQ == d[0].batch_SEQ) {
                each.taken = d.length;
              }
            });
          });

          $scope.unidadCount = response.length;

        }, function (error) { // Despacho batch unidad
          console.log(error);
        });


      }, function (error) { // Despacho Batch
      });

    }

    init();
  })


  .controller('BatchDetailCtrl', function ($scope, $rootScope, Batch) {
    $rootScope.$on('updateBatchDetail', function (event, args) {

      Batch.getOne({SEQ: args.batch_SEQ}).$promise.then(function (data) {
        $scope.batchDetail = data;
      })
    });
  })


  .controller('UnidadDetailCtrl', function ($scope, $rootScope, BatchUnidad) {

    $rootScope.$on('updateUnidadDetail', function (event, args) {
      BatchUnidad.getOne({SEQ: args.batch_unidad_SEQ}).$promise.then(function (data) {
        $scope.unidadDetail = data;
      })


    });
  });


