angular.module('despachos.ctrl', [])


  //  MENU
  .controller('DespachosMenuCtrl', function ($scope, $ionicLoading, $location, Despacho) {

    $scope.search = { SEQ: '' };
    //$ionicLoading.show({template: 'Loading Despachos'});


    Despacho.getAll().$promise.then(function (d) {
      $scope.despachos = d;
      //$ionicLoading.hide();
    });

    $scope.doRefresh = function () {
      Despacho.getAll().$promise.then(function (d) {
        $scope.despachos = d;
      })
        .finally(function () {
          $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.clearSearch = function () {
      $scope.search.SEQ = '';
    };


  })


  //  START
  .controller('DespachosStartCtrl', function ($scope, $state, Despacho) {
    $scope.go = function () {
      $state.go('ticket.truck');
    };

    $scope.goSidemenu = function () {
      $state.go('');
    }
  })


  // DETAIL
  .controller('DespachosDetailCtrl', function ($scope, $stateParams, $state, $ionicLoading, Despacho, DespachoBatch, Batch) {
    var SEQ = $stateParams.SEQ;
    $scope.batches = [];

    $ionicLoading.show({template: 'Loading Despacho #' + SEQ});



    Despacho.getOne({SEQ: SEQ}).$promise.then(function (d) {
      $scope.despacho = d;
    });

    DespachoBatch.getWithDespacho({despacho_SEQ: SEQ}).$promise.then(function (d) {

      angular.forEach(d, function (r) {
        $scope.batch_quantidad = r.batch_quantidad;

        Batch.getOne({SEQ: r.batch_SEQ}).$promise.then(function (resp) {
          $scope.batches.push(resp);
          $ionicLoading.hide();
        });
      });
    });


    $scope.selectDespacho = function () {
      $state.go('ticket.start', {SEQ: SEQ});
    };

  });