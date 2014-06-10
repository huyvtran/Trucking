// TODO: Use SEQ number to obtain initial values
// TODO: Update info to MySql server, on loss of focus
// TODO: Create init function for each controller
// TODO: Validation with tab icons
// TODO: Implement photos
// TODO: Exit and Clear button for each header
// TODO: Implement barcode / QR scanner
// TODO: Copy MySQL data into the form, save the data when you FINALIZE

angular.module('ticket.finalize.ctrl', [])

  .controller('FinalizeCtrl', function ($scope, $stateParams, $ionicLoading, Despacho, DespachoBatch, Empresa, Camion, Chofer) {

    var despacho_SEQ = $stateParams.SEQ;
    $ionicLoading.show({template: 'Loading Data'});



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
        $ionicLoading.hide();
      })
    });


    $scope.pin = {
      admin: {
        pin: '',
        status: 0
      },
      officer: {
        pin: '',
        status: 0
      }
    };

    $scope.sign = function () {

      function onPrompt(results) {
        if (results.buttonIndex === 2) {
          $scope.pin.officer.status = 1;
          console.log($scope.pin.officer.pin);
        }
        alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
      }

      navigator.notification.prompt(
        'Enter PIN to Authorize',
        onPrompt,
        'Finalize - Authentication',
        ['Cancel','Authorize'],
        '',
        'password',
        ''
      );
    };

  });