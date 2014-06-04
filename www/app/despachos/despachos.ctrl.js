angular.module('despachos.ctrl', [])


  //  MENU

  .controller('DespachosMenuCtrl', function ($scope, Despachos) {

    Despachos.getDesp().then(function (d) {
      $scope.despachos = d;
    });
  })


  //  START

  .controller('DespachosStartCtrl', function ($scope, $state, Despachos) {
    $scope.go = function () {
      $state.go('ticket.truck');
    };

    $scope.goSidemenu = function () {
      $state.go('');
    }
  })


  // DETAIL

  .controller('DespachosDetailCtrl', function ($scope, $stateParams, $state, Despachos) {
    var SEQ = $stateParams.SEQ;
    $scope.batches = [];

    Despachos.getDesp_SEQ(SEQ).then(function (d) {
      $scope.despacho = d;
    });

    Despachos.getDespBatchWHERE_SEQ(SEQ).then(function (d) {

      angular.forEach(d, function (r) {
        $scope.batch_quantidad = r.batch_quantidad;

        Despachos.getBatch_SEQ(r.batch_SEQ).then(function (resp) {
          $scope.batches.push(resp);
        });
      });
    });


    $scope.selectDespacho = function () {
      $state.go('ticket.start');
    };

  });