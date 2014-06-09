// TODO: Use SEQ number to obtain initial values
// TODO: Update info to MySql server, on loss of focus
// TODO: Create init function for each controller
// TODO: Validation with tab icons
// TODO: Implement photos
// TODO: Exit and Clear button for each header
// TODO: Implement barcode / QR scanner
// TODO: Copy MySQL data into the form, save the data when you FINALIZE

angular.module('ticket.finalize.ctrl', [])

  .controller('FinalizeCtrl', function ($scope, $stateParams, $ionicPopup, Despacho, DespachoBatch, Empresa, Camion, Chofer) {

    var despacho_SEQ = $stateParams.SEQ;

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

    $scope.sig1 = function () {
      var adminPopup = $ionicPopup.show({
        template: '<input type="password" ng-model="pin.admin.pin" autoFocus>',
        title: 'Enter PIN to Authorize',
        subTitle: 'Please use normal things',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {text: '<b>Authorize</b>',
            type: 'button-positive',
            onTap: function (e) {
              if (!$scope.pin.admin.pin) {
                e.preventDefault();
              }
              else {
                $scope.pin.admin.status = 1;
                return $scope.pin.admin.pin;
              }
            }
          }
        ]
      });

      adminPopup.then(function (res) {
        console.log('Tapped!', res);
      });
    };

    $scope.sig2 = function () {
      var adminPopup = $ionicPopup.show({
        template: '<input type="password" ng-model="pin.office.pin" autoFocus>',
        title: 'Enter PIN to Authorize',
        subTitle: 'Please use normal things',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {text: '<b>Authorize</b>',
            type: 'button-positive',
            onTap: function (e) {
              if (!$scope.pin.officer) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                $scope.pin.officer.status = 1;
                return $scope.pin.officer.pin;
              }
            }
          }
        ]
      });

      adminPopup.then(function (res) {
        console.log('Tapped!', res);
      });
    };

  });