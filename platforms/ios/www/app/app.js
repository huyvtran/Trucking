angular.module('trucking', [
  'ionic',
  'ngResource',
  'autocomplete',
  'app.directives',

  // Login
  'login.ctrl',
  'login.service',

  // Despachos
  'despachos.ctrl',
  'despachos.service',


  // truck
  'ticket.truck.ctrl',
  'ticket.weight.ctrl',
  'ticket.batches.ctrl',
  'ticket.photos.ctrl',
  'ticket.finalize.ctrl',
  'ticket.sideMenu.ctrl',
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


      // SIDEMENU TRUCK

      .state('ticket', {
        url: "/:SEQ/ticket",
        abstract: true,
        templateUrl: "app/ticket/ticket.html",
        controller: 'TicketCtrl'
      })


      .state('ticket.menu', {
        url: '/menu',
        views: {
          'side-view': {
            templateUrl: 'app/ticket/sideMenu.html',
            controller: 'SideMenuCtrl'
          }
        }
      })

      .state('ticket.start', {
        url: '/start',
        views: {
          'side-view': {
            templateUrl: 'app/ticket/sideMenu.html',
            controller: 'SideMenuCtrl'

          },
          'content-view': {
            templateUrl: 'app/ticket/start/start.html',
            controller: 'SideMenuCtrl'
          }
        }
      })

      .state('ticket.truck', {
        url: '/truck',
        views: {
          'side-view': {
            templateUrl: 'app/ticket/truck/truckMenu.html',
            controller: 'TruckCtrl'
          },
          'content-view': {
            templateUrl: 'app/ticket/truck/truck.html',
            controller: 'TruckCtrl'
          }
        }
      })

      .state('ticket.weight', {
        url: '/weight',
        views: {
          'side-view': {
            templateUrl: 'app/ticket/weight/weightMenu.html',
            controller: 'WeightCtrl'
          },

          'content-view': {
            templateUrl: 'app/ticket/weight/weight.html',
            controller: 'WeightCtrl'
          }
        }
      })

      .state('ticket.batches', {
        url: '/batches',
        views: {
          'side-view': {
            templateUrl: 'app/ticket/batches/batchesMenu.html',
            controller: 'BatchesCtrl'
          },
          'content-view': {
            templateUrl: 'app/ticket/batches/batches.html',
            controller: 'BatchesCtrl'
          }
        }
      })

      .state('ticket.photos', {
        url: '/photos',
        views: {
          'side-view': {
            templateUrl: 'app/ticket/photos/photosMenu.html'
          },
          'content-view': {
            templateUrl: 'app/ticket/photos/photos.html',
            controller: 'PhotosCtrl'
          }
        }
      })


      .state('ticket.finalize', {
        url: '/finalize',
        views: {
          'side-view': {
            templateUrl: 'app/ticket/finalize/finalizeMenu.html',
            controller: 'FinalizeCtrl'
          },
          'content-view': {
            templateUrl: 'app/ticket/finalize/finalize.html',
            controller: 'FinalizeCtrl'
          }
        }
      });


    $urlRouterProvider.otherwise('/despachos/start');
    //$urlRouterProvider.otherwise('/ticket/truck');

  });

