// TODO: Use SEQ number to obtain initial values
// TODO: Update info to MySql server, on loss of focus
// TODO: Create init function for each controller
// TODO: Validation with tab icons
// TODO: Implement photos
// TODO: Exit and Clear button for each header
// TODO: Implement barcode / QR scanner
// TODO: Copy MySQL data into the form, save the data when you FINALIZE

angular.module('ticket.truck.ctrl', [])


  .controller('TruckMenuCtrl', function ($scope, $state, $stateParams, Despacho, Empresa, Camion, Chofer) {
    var despacho_SEQ = $stateParams.SEQ;

    Despacho.getOne({SEQ: despacho_SEQ}).$promise.then(function (d) {
      $scope.despacho = d;
      Empresa.getOne({SEQ: despacho_SEQ}).$promise.then(function (d) {
        $scope.empresa = d;
      });

      Camion.getOne({SEQ: despacho_SEQ}).$promise.then(function (d) {
        $scope.camion = d;
        $scope.placa_numeros = [];
        angular.forEach(d, function (r) {
          $scope.placa_numeros.push(r.placa_numero);
        });
      });

      Chofer.getOne({SEQ: despacho_SEQ}).$promise.then(function (d) {
        $scope.chofer = d;
      })
    });


  })

  .controller('TruckCtrl', function ($scope, $state, $stateParams, $ionicModal, $ionicLoading, Despacho, DespachoBatch, Empresa, Camion, Chofer) {

    var despacho_SEQ = $stateParams.SEQ;
    var ticket = ""; //Ticket.getTicket();
    $scope.truck = ticket.truck;
    $scope.photos = ticket.photos;

    $ionicLoading.show({template: 'Loading Data'});

    // init with data
    Despacho.getOne({SEQ: despacho_SEQ}).$promise.then(function (d) {
      $scope.despacho = d;
      Empresa.getOne({SEQ: despacho_SEQ}).$promise.then(function (d) {
        $scope.empresa = d;
      });

      Camion.getOne({SEQ: despacho_SEQ}).$promise.then(function (d) {
        $scope.camion = d;
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


    // new camion modal
    $ionicModal.fromTemplateUrl('newCamion.html', {
      scope: $scope,
      focusFirstInput: true,
      backdropClickToClose: false
    }).then(function (modal) {
      $scope.camionModal = modal;
    });

    // show Camion modal
    $scope.createNewCamion = function () {
      $scope.camionModal.show();
    };




    // new Chofer modal
    $ionicModal.fromTemplateUrl('newChofer.html', {
      scope: $scope,
      focusFirstInput: true,
      backdropClickToClose: false
    }).then(function (modal) {
      $scope.choferModal = modal;
    });

    // show Chofer modal
    $scope.createNewChofer = function () {
      $scope.choferModal.show();
    };

    /*
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

     */


    // capture photos
    // TODO implement photos
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

  })


  // new camion controller
  .controller('NewCamionModalCtrl', function ($scope, Camion) {
    var newCamion = {
      SEQ: '',
      placa_numero: '',
      placa_pais: '',
      placa: '',
      empresa_SEQ: '',
      marca: '',
      tipo: '',
      max_kg: '',
      tara_kg: '',
      ejes: '',
      ejes_trailer: ''
    };

    $scope.newCamion = angular.copy(newCamion);

    // disable submit new
    $scope.disable = function (c) {
      return !!(c.placa_numero === '' || c.placa_pais === '' || c.marca === '' || c.tipo === '' || c.ejes === '');
    };


    // close Camion modal
    $scope.closeCamionModal = function () {
      $scope.newCamion = angular.copy(newCamion);
      $scope.camionModal.hide();
    };

    // post new truck
    // TODO check if already exists
    // TODO use Empresa SEQ into camion
    $scope.saveNewTruck = function () {
      Camion.new($scope.newCamion).$promise.then(function () {
        $scope.newCamion = angular.copy(newCamion);
        $scope.camionModal.hide();
      })
    }
  })

  .controller('NewChoferModalCtrl', function ($scope, Chofer) {
    var newChofer = {
      SEQ: '',
      apellido: '',
      nombre: '',
      telefono: '',
      patente: '',
      empresa_codigo: '',
      empresa_SEQ: ''
    };

    $scope.newChofer = angular.copy(newChofer);

    $scope.disable = function (c) {
      return !!(c.apellido === '' || c.nombre === '' || c.telefono === '' || c.patente === '');
    };

    $scope.closeChoferModal = function () {
      $scope.newChofer = angular.copy(newChofer);
      $scope.choferModal.hide();
    };


    $scope.saveNewChofer = function () {
      Chofer.new($scope.newChofer).$promise.then(function () {
        $scope.newChofer = angular.copy(newChofer);
        $scope.choferModal.hide();
      })
    }
  });