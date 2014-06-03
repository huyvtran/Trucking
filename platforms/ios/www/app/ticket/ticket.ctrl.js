// TODO: Use SEQ number to obtain initial values
// TODO: Update info to MySql server, on loss of focus
// TODO: Create init function for each controller
// TODO: Validation with tab icons
// TODO: Implement photos
// TODO: Exit and Clear button for each header
// TODO: Implement barcode / QR scanner
// TODO: Copy MySQL data into the form, save the data when you FINALIZE


angular.module('ticket.ctrl', [])

  // Tabs
  .controller('TicketCtrl', function ($scope, $stateParams, Ticket) {
    $scope.icons = Ticket.getIcons();

    //console.log($stateParams.SEQ); //bug: stateParams not working

    // set Icon Color depending on Status
    $scope.iconStatus = function (icon) {
      // missing = 0,   ok = 1,   warning = 2
      if (icon == 0) {
        return 'assertive'
      }
      else if (icon == 1) {
        return 'balanced'
      }
      else if (icon == 2) {
        return 'energized'
      }
      else return ''
    };
  })


  // Truck
  .controller('TruckCtrl', function ($scope, $state, Ticket) {

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


    $scope.capturePhoto = function (photo) {
      console.log(photo);
    };


    $scope.exit = function () {
      $state.go('despachosMenu.start');
    };


    $scope.clear = function () {
      console.log($scope.truck);
      Ticket.saveTruck($scope.truck);
      console.log(Ticket.getTicket());
    }
  })


  // Driver
  .controller('DriverCtrl', function ($scope, Ticket) {

    var ticket = Ticket.getTicket();
    $scope.driver = ticket.driver;

    $scope.photos = ticket.photos;

    $scope.capturePhoto = function (photo) {
      console.log(photo);
    };

  })


  // Weight
  .controller('WeightCtrl', function ($scope, Ticket) {
    console.log('Weight');

    var ticket = Ticket.getTicket();
    $scope.peso = ticket.peso;



  })


  // Batches
  .controller('BatchesCtrl', function ($scope, $ionicPlatform, Ticket) {

    $scope.scan = function () {
      $ionicPlatform.ready(function () {

        cordova.plugins.barcodeScanner.scan(
          function (result) {
            console.log(result.text);
            console.log(result.format);
            console.log(result.cancelled);
          },
          function (error) {
            console.log(error);
          }
        );

      });
    };
  })


  // Photos
  .controller('PhotosCtrl', function ($scope, Ticket, Camera) {


    // status     0 - missing    1 - complete    2 - warning
    // required   0 - no         1 - yes         2 - maybe??
    $scope.photos = {
      truck: {
        empty: {
          title: 'Empty Truck',
          status: 1,
          required: 0,
          image: 'http://placehold.it/200x150'
        },
        full: {
          title: 'Full Truck',
          status: 2,
          required: 0,
          image: 'http://placehold.it/200x150'
        },
        side_left: {
          title: 'Truck Sideview Left',
          status: 1,
          required: 0,
          image: 'http://placehold.it/200x150'
        },
        side_right: {
          title: 'Truck Sideview Right',
          status: 0,
          required: 0,
          image: 'http://placehold.it/200x150'
        }
      },
      driver: {
        face: {
          title: 'Driver Face',
          status: 1,
          required: 0,
          image: 'http://placehold.it/200x150'
        },
        license_front: {
          title: 'License Front',
          status: 1,
          required: 0,
          image: 'http://placehold.it/200x150'
        },
        license_back: {
          title: 'License Back',
          status: 1,
          required: 0,
          image: 'http://placehold.it/200x150'
        },
        driver_something: {
          title: 'Something Here',
          status: 1,
          required: 0,
          image: 'http://placehold.it/200x150'
        }
      }

    };

    $scope.clear = function (photo) {
      console.log(photo);
      photo.image = 'YOYOYOYOOY';
    };


    $scope.capturePhoto = function (photo) {

      function onSuccess(imageData) {
        $scope.$apply(photo.image = imageData);
      }

      function onFail(message) {
        alert('Failed because: ' + message);
      }

      navigator.camera.getPicture(onSuccess, onFail,
        { quality: 20,
          sourceType: Camera.PictureSourceType.CAMERA,
          destinationType: Camera.DestinationType.FILE_URL
        });

    }

  })


// Finalize
  .
  controller('FinalizeCtrl', function ($scope, Ticket) {
    console.log('Truck');

  });