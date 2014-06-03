angular.module('trucking', [
  'ionic',
  'autocomplete',
  'app.directives',
  'PhoneGap',
  //'ngCordova',

  // Login
  'login.ctrl',
  'login.service',

  // Despachos
  'despachos.ctrl',
  'despachos.service',

  // Ticket
  'ticket.ctrl',
  'ticket.service'

])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      // LOGIN

      .state('login', {
        url: "/login",
        templateUrl: "login.html",
        controller: 'LoginCtrl'
      })


      // DESPACHOS - split view

      .state('despachosMenu', {
        url: "/despachos",
        abstract: true,
        templateUrl: "app/despachos/despachos-menu.html",
        controller: "DespachosMenuCtrl"
      })

      .state('despachosMenu.start', {
        url: "/start",
        views: {
          'menuContent': {
            templateUrl: "app/despachos/despachos-start.html",
            controller: "DespachosStartCtrl"
          }
        }
      })

      .state('despachosMenu.SEQ', {
        url: "/:SEQ",
        views: {
          'menuContent': {
            templateUrl: "app/despachos/despachos-detail.html",
            controller: "DespachosDetailCtrl",
            params: ['SEQ']
          }
        }
      })


      // TRUCK

      .state('ticket', {
        url: "/ticket",
        abstract: true,
        templateUrl: "app/ticket/tabs.html",
        controller: 'TicketCtrl'
      })


      .state('ticket.truck', {
        url: '/truck',
        views: {
          'ticket-truck': {
            templateUrl: 'app/ticket/truck.html',
            controller: 'TruckCtrl'
          }
        }
      })

      .state('ticket.driver', {
        url: '/driver',
        views: {
          'ticket-driver': {
            templateUrl: 'app/ticket/driver.html',
            controller: 'DriverCtrl'
          }
        }
      })

      .state('ticket.weight', {
        url: '/weight',
        views: {
          'ticket-weight': {
            templateUrl: 'app/ticket/weight.html',
            controller: 'WeightCtrl'
          }
        }
      })

      .state('ticket.batches', {
        url: '/batches',
        views: {
          'ticket-batches': {
            templateUrl: 'app/ticket/batches.html',
            controller: 'BatchesCtrl'
          }
        }
      })

      .state('ticket.photos', {
        url: '/photos',
        views: {
          'ticket-photos': {
            templateUrl: 'app/ticket/photos.html',
            controller: 'PhotosCtrl'
          }
        }
      })

      .state('ticket.finalize', {
        url: '/finalize',
        views: {
          'ticket-finalize': {
            templateUrl: 'app/ticket/finalize.html',
            controller: 'FinalizeCtrl'
          }
        }
      });


    $urlRouterProvider.otherwise('/despachos/start');

  });

