// TODO: Use SEQ number to obtain initial values
// TODO: Update info to MySql server, on loss of focus
// TODO: Create init function for each controller
// TODO: Validation with tab icons
// TODO: Implement photos
// TODO: Exit and Clear button for each header
// TODO: Implement barcode / QR scanner
// TODO: Copy MySQL data into the form, save the data when you FINALIZE

angular.module('ticket.truck.ctrl', [])

  // Truck
  .controller('TruckCtrl', function ($scope, $state, Ticket) {

    //$ionicViewService.clearHistory();

    // base truck structure
    var ticket = Ticket.getTicket();
    $scope.truck = ticket.truck;
    $scope.photos = ticket.photos;


    // init with truck info
    Ticket.getTransCamion().then(function (d) {
      $scope.placa_numeros = [];
      $scope.transCamions = d;

      angular.forEach(d, function (r) {
        $scope.placa_numeros.push(r.placa_numero);
      });
    });


    // update on typing
    $scope.updateNumeros = function (typed) {
      $scope.newNumeros = Ticket.getTransCamion().then(function (d) {
        $scope.placa_numeros = [];

        angular.forEach(d, function (r) {
          $scope.placa_numeros.push(r.placa_numero);
        })
      });
    };


    // select and fill
    $scope.select = function (placa) {
      Ticket.getTransCamion_Placa(placa).then(function (d) {
        var camion = d[0];
        $scope.truck.license.number = camion.placa_numero;
        $scope.truck.license.country = camion.placa_pais;
        $scope.truck.marca = camion.marca;
        $scope.truck.tipo = camion.tipo;
        $scope.truck.ejes = camion.ejes;
      });
    };


    // capture photos
    $scope.capturePhoto = function (photo) {
      console.log(photo);
    };


    $scope.offFocus = function () {
      console.log('No more focus!');
    }

  });