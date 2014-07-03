angular.module('trucking', [
   // Libraries
   'ionic',
   'ngResource',
   'ngCookies',
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
      $rootScope.DB_URL = '../../TOTAI/db/'
      //$rootScope.DB_URL = 'http://www.desa-net.com/TOTAI/db/'
      $rootScope.totaiAppStore = 'http://desa-net.com/totaiAppStore/'
      $rootScope.appName = 'Despacho'
      $rootScope.authExpire = "0"

      // Handle comm's between Controllers
      $rootScope.$on('handleEmit', function (event, args) {
         $rootScope.$broadcast('handleBroadcast', args)
      })

      // Handle new versions in Cordova -- load default plugin values
      var newVersion = ''
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

         // DESPACHOS - split view

         .state('despachos', {
            url: "/despachos",
            abstract: true,
            templateUrl: "app/despachos/despachos.html",
            controller: "DespachosMenuCtrl"
         })

         .state('despachos.start', {
            url: "/start",
            views: {
               'side-view': {
                  templateUrl: "app/despachos/despachos-menu.html",
                  controller: "DespachosMenuCtrl"
               },
               'content-view': {
                  templateUrl: "app/despachos/despachos-start.html",
                  controller: "DespachosMenuCtrl"
               }
            }
         })

         .state('despachos.SEQ', {
            url: "/:SEQ",
            views: {
               'side-view': {
                  templateUrl: "app/despachos/despachos-menu.html",
                  controller: "DespachosMenuCtrl"
               },
               'content-view': {
                  templateUrl: "app/despachos/despachos-detail.html",
                  controller: "DespachosDetailCtrl",
                  params: ['SEQ']
               }
            }
         })

         .state('despachos.logout', {
            url: "/start",
            views: {
               'menuContent': {
                  templateUrl: "app/despachos/despachos-menu.html",
                  controller: "LogoutCtrl"
               }
            }
         })

         // Ticket

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

         .state('ticket.fotos', {
            url: '/fotos',
            views: {
               'side-view': {
                  template: '<ui-view>'
               },
               'content-view': {
                  templateUrl: 'app/ticket/fotos/fotos.html',
                  controller: 'FotosCtrl'
               }
            }
         })

         .state('ticket.fotos.menu', {
            url: '/menu',
            templateUrl: 'app/ticket/sideMenu.html',
            controller: 'SideMenuCtrl'
         })

         .state('ticket.fotos.submenu', {
            url: '/submenu',
            templateUrl: 'app/ticket/fotos/fotosMenu.html',
            controller: 'FotosMenuCtrl'
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
         })

      $urlRouterProvider.otherwise('/despachos/start')

   })

