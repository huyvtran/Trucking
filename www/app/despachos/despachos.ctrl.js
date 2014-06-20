angular.module('despachos.ctrl', [])


  //  MENU
  .controller('DespachosMenuCtrl', function ($scope, $ionicLoading, $location, Despacho) {

    $scope.search = { SEQ: '' };
    //$ionicLoading.show({template: 'Loading Despachos'});


    Despacho.getAll().$promise.then(function (d) {
      $scope.despachos = d;
      $scope.lastUpdate = moment().format('D/M - H:mm');
      //$ionicLoading.hide();
    });

    $scope.doRefresh = function () {
      Despacho.getAll().$promise.then(function (d) {
        $scope.despachos = d;
      }).finally(function () {
        $scope.$broadcast('scroll.refreshComplete');
        $scope.lastUpdate = moment().format('D/M - H:mm');
      });
    };

    $scope.clearSearch = function () {
      $scope.search.SEQ = '';
    };

  })


  //  START
  .controller('DespachosStartCtrl', function ($scope, $state) {
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


    $scope.selectDespacho = function (loc) {
      switch (loc) {
        case 'truck':
          $state.go('ticket.truck', {SEQ: SEQ});
          $state.go('ticket.truck.submenu', {SEQ: SEQ});
          break;
        case 'batches':
          $state.go('ticket.batches', {SEQ: SEQ});
          $state.go('ticket.batches.submenu', {SEQ: SEQ});
          break;
        case 'muestras':
          $state.go('ticket.muestras', {SEQ: SEQ});
          $state.go('ticket.muestras.submenu', {SEQ: SEQ});
          break;
        case 'fotos':
          $state.go('ticket.photos', {SEQ: SEQ});
          $state.go('ticket.photos.submenu', {SEQ: SEQ});
          break;
        case 'otras':
          $state.go('ticket.otras', {SEQ: SEQ});
          $state.go('ticket.otras.submenu', {SEQ: SEQ});
          break;
      }
    };

  });