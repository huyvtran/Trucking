angular.module('trucking', [
  'ionic',
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
  'ticket.driver.ctrl',
  'ticket.weight.ctrl',
  'ticket.batches.ctrl',
  'ticket.photos.ctrl',
  'ticket.finalize.ctrl',
  'ticket.sideMenu.ctrl',


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
            controller: "DespachosDetailCtrl"
            //params: ['SEQ']
          }
        }
      })


      // SIDEMENU TRUCK

      .state('main', {
        url: "/main",
        abstract: true,
        templateUrl: "app/ticket/main.html",
        controller: ''
      })


      .state('main.menu', {
        url: '/menu',
        views: {
          'side-view': {
            templateUrl: 'app/ticket/sideMenu.html',
            controller: 'SideMenuCtrl'
          }
        }
      })

      .state('main.start', {
        url: '/start/truck',
        views: {
          // Side Menu
          'side-view': {
            templateUrl: 'app/ticket/sideMenu.html'
          },

          // Main Content
          'content-view': {
            templateUrl: 'app/ticket/truck/truck.html',
            controller: 'TruckCtrl'
          }
        }
      })

      .state('main.truck', {
        url: '/truck',
        views: {
          // Side Menu
          'side-view': {
            templateUrl: 'app/ticket/truck/subMenu.html',
            controller: 'TruckCtrl'
          },

          // Main Content
          'content-view': {
            templateUrl: 'app/ticket/truck/truck.html',
            controller: 'TruckCtrl'
          }
        }
      })


      .state('main.driver', {
        url: '/driver',
        views: {
          // Side Menu
          'side-view': {
            templateUrl: 'app/ticket/driver/subMenu.html',
            controller: 'DriverCtrl'
          },

          // Main Content
          'content-view': {
            templateUrl: 'app/ticket/driver/driver.html',
            controller: 'DriverCtrl'
          }
        }
      })

      .state('main.weight', {
        url: '/weight',
        views: {
          // Side Menu
          'side-view': {
            templateUrl: 'app/ticket/weight/subMenu.html',
            controller: 'WeightCtrl'
          },

          // Main Content
          'content-view': {
            templateUrl: 'app/ticket/weight/weight.html',
            controller: 'WeightCtrl'
          }
        }
      })

      .state('main.batches', {
        url: '/batches',
        views: {
          // Side Menu
          'side-view': {
            templateUrl: 'app/ticket/batches/subMenu.html',
            controller: 'BatchesCtrl'
          },

          // Main Content
          'content-view': {
            templateUrl: 'app/ticket/batches/batches.html',
            controller: 'BatchesCtrl'
          }
        }
      })

      .state('main.photos', {
        url: '/photos',
        views: {
          // Side Menu
          'side-view': {
            templateUrl: 'app/ticket/photos/subMenu.html',
            controller: 'PhotosCtrl'
          },

          // Main Content
          'content-view': {
            templateUrl: 'app/ticket/photos/photos.html',
            controller: 'PhotosCtrl'
          }
        }
      })


      .state('main.finalize', {
        url: '/finalize',
        views: {
          // Side Menu
          'side-view': {
            templateUrl: 'app/ticket/finalize/subMenu.html',
            controller: 'FinalizeCtrl'
          },

          // Main Content
          'content-view': {
            templateUrl: 'app/ticket/finalize/finalize.html',
            controller: 'FinalizeCtrl'
          }
        }
      });


    $urlRouterProvider.otherwise('/despachos/start');
    //$urlRouterProvider.otherwise('/main/truck');

  });

