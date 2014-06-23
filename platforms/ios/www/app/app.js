angular.module('trucking', [
  // Libraries
  'ionic',
  'ngResource',
  'autocomplete',
  'ngStorage',
  'monospaced.qrcode',
  //'ngCordova',


  // App
  'app.directives',
  'app.filters',
  'app.services',


  // Login
  'login.ctrl',
  'login.service',

  // Despachos
  'despachos.ctrl',


  // truck
  'ticket.truck.ctrl',
  'ticket.batches.ctrl',
  'ticket.muestras.ctrl',
  'ticket.photos.ctrl',
  'ticket.finalize.ctrl',
  'ticket.sideMenu.ctrl',
  'ticket.ctrl',
  'app.services'
])

  .run(function ($rootScope, $timeout, $ionicPlatform, Apps) {

    // globals
    $rootScope.DB_URL = 'http://www.desa-net.com/TOTAI/db/';
    $rootScope.totaiAppStore = 'http://desa-net.com/totaiAppStore/';
    $rootScope.appName = 'Despacho';
    var newVersion = '';

    // load default plugin values
    $ionicPlatform.ready(function () {
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.getAppVersion(function (version) {
          $rootScope.appVersion = version;

          Apps.findByName({query: $rootScope.appName}).$promise.then(function (data) {
            newVersion = data[0].version;
            if (newVersion > $rootScope.appVersion) {
              navigator.notification.alert('A New Version is Available', function () {
                window.open($rootScope.totaiAppStore, '_system');
              }, 'Update Required', 'update');
            }
          }, function (error) {
            console.log(error);
          });
        })
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      // LOGIN

      .state('login', {
        url: "/login",
        templateUrl: "app/login/login.html",
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
            template: '<ui-view>'
          },
          'content-view': {
            templateUrl: 'app/ticket/truck/truck.html',
            controller: 'TruckCtrl'
          }
        }
      })
      .state('ticket.truck.menu', {
        url: '/menu',
        templateUrl: 'app/ticket/sideMenu.html',
        controller: 'SideMenuCtrl'
      })
      .state('ticket.truck.submenu', {
        url: '/submenu',
        templateUrl: 'app/ticket/truck/truckMenu.html',
        controller: 'TruckMenuCtrl'
      })


      .state('ticket.batches', {
        url: '/batches',
        views: {
          'side-view': {
            template: '<ui-view>'
          },
          'content-view': {
            templateUrl: 'app/ticket/batches/batches.html',
            controller: 'BatchesCtrl'

          },
          'batchDetail@ticket.batches': {
            templateUrl: "app/ticket/batches/batchDetail.html",
            controller: "BatchDetailCtrl"
          },
          'unidadDetail@ticket.batches': {
            templateUrl: "app/ticket/batches/unidadDetail.html",
            controller: "UnidadDetailCtrl"
          }
        }
      })
      .state('ticket.batches.menu', {
        url: '/menu',
        templateUrl: 'app/ticket/sideMenu.html',
        controller: 'SideMenuCtrl'
      })
      .state('ticket.batches.submenu', {
        url: '/submenu',
        templateUrl: 'app/ticket/batches/batchesMenu.html',
        controller: 'BatchesMenuCtrl'
      })


      .state('ticket.muestras', {
        url: '/muestras',
        views: {
          'side-view': {
            template: '<ui-view>'
          },
          'content-view': {
            templateUrl: 'app/ticket/muestras/muestras.html',
            controller: 'MuestrasCtrl'

          },
          'batchDetail@ticket.muestras': {
            templateUrl: "app/ticket/muestras/muestrasDetail.html",
            controller: "MuestrasDetailCtrl"
          },
          'unidadDetail@ticket.muestras': {
            templateUrl: "app/ticket/muestras/unidadDetail.html",
            controller: "UnidadDetailCtrl"
          }
        }
      })
      .state('ticket.muestras.menu', {
        url: '/menu',
        templateUrl: 'app/ticket/sideMenu.html',
        controller: 'SideMenuCtrl'
      })
      .state('ticket.muestras.submenu', {
        url: '/submenu',
        templateUrl: 'app/ticket/muestras/muestrasMenu.html',
        controller: 'MuestrasMenuCtrl'
      })


      .state('ticket.photos', {
        url: '/photos',
        views: {
          'side-view': {
            template: '<ui-view>'
          },
          'content-view': {
            templateUrl: 'app/ticket/photos/photos.html',
            controller: 'PhotosCtrl'
          }
        }
      })

      .state('ticket.photos.menu', {
        url: '/menu',
        templateUrl: 'app/ticket/sideMenu.html',
        controller: 'SideMenuCtrl'
      })

      .state('ticket.photos.submenu', {
        url: '/submenu',
        templateUrl: 'app/ticket/photos/photosMenu.html',
        controller: 'PhotosMenuCtrl'
      })


      .state('ticket.finalize', {
        url: '/finalize',
        views: {
          'side-view': {
            template: '<ui-view>'
          },
          'content-view': {
            templateUrl: 'app/ticket/finalize/finalize.html',
            controller: 'FinalizeCtrl'
          }
        }
      })
      .state('ticket.finalize.menu', {
        url: '/menu',
        templateUrl: 'app/ticket/sideMenu.html',
        controller: 'SideMenuCtrl'
      })

      .state('ticket.finalize.submenu', {
        url: '/submenu',
        templateUrl: 'app/ticket/finalize/finalizeMenu.html',
        controller: 'FinalizeCtrl'
      });


    //$urlRouterProvider.otherwise('/despachos/start');
    $urlRouterProvider.otherwise('/login');

  });

