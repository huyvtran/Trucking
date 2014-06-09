// TODO: Use SEQ number to obtain initial values
// TODO: Update info to MySql server, on loss of focus
// TODO: Create init function for each controller
// TODO: Validation with tab icons
// TODO: Implement photos
// TODO: Exit and Clear button for each header
// TODO: Implement barcode / QR scanner
// TODO: Copy MySQL data into the form, save the data when you FINALIZE

angular.module('ticket.truck.ctrl', [])

  .controller('TruckCtrl', function ($scope, $state, $stateParams, $ionicModal, Despacho, DespachoBatch, Empresa, Camion, Chofer) {

    var despacho_SEQ = $stateParams.SEQ;
    var ticket = ""; //Ticket.getTicket();
    $scope.truck = ticket.truck;
    $scope.photos = ticket.photos;

    // init with data
    Despacho.getOne({SEQ: despacho_SEQ}).$promise.then(function (d) {
      $scope.despacho = d;
      Empresa.getOne({SEQ: despacho_SEQ}).$promise.then(function (d) {
        $scope.empresa = d;
      });

      Camion.getOne({SEQ: despacho_SEQ}).$promise.then(function (d) {
        $scope.camion = d;
        console.log(d);
        $scope.placa_numeros = [];
        angular.forEach(d, function (r) {
          $scope.placa_numeros.push(r.placa_numero);
        });
      });

      Chofer.getOne({SEQ: despacho_SEQ}).$promise.then(function (d) {
        $scope.chofer = d;
      })
    });


    // ionic Modal with template
    $ionicModal.fromTemplateUrl('/app/ticket/truck/newTruck.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });


    // add New Camion
    $scope.newCamion = function () {
      $scope.modal.show();
    };


    // update on typing
    $scope.updateNumeros = function (typed) {
      $scope.newNumeros = Camion.getAll().$promise.then(function (d) {
        $scope.placa_numeros = [];

        angular.forEach(d, function (r) {
          $scope.placa_numeros.push(r.placa_numero);
        });
      });
    };


    // select and fill
    $scope.select = function (placa) {
      Camion.getWithPlaca({placa_numero: placa}).$promise.then(function (d) {
        $scope.camion = d[0];
      });
    };


    // capture photos
    $scope.capturePhoto = function (photo) {
      console.log(photo);
    };


    // get off focus event
    $scope.offFocus = function (type) {
      switch (type) {
        case 0:  // camion
          Camion.update($scope.camion).$promise.then(function (response) {
            //console.log(response);
          });
          break;

        case 1: // chofer
          Chofer.update($scope.chofer).$promise.then(function (response) {
            //console.log(response);
          });
          break;
      }
    };

  });