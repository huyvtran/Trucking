angular.module('login.ctrl', [])

   .controller('LoginCtrl', function ($scope, $rootScope, $http, $state, Authenticate) {

      $scope.message = ""

      $scope.login = function () {
         Authenticate.login($scope.user)
      }

      $scope.$on('event:auth-loginRequired', function (e, rejection) {
         $scope.user = {
            usuario: null,
            contrasena: null
         }
         $scope.loginModal.show()
      })

      $scope.$on('event:auth-loginConfirmed', function () {
         $scope.loginModal.hide()
      })

      $scope.$on('event:auth-login-failed', function (e, status) {
         var error = "Login failed."
         if (status == 401) {
            error = "Usuario / Contraseña Invalida..."
         }
         $scope.message = error
      })

      $scope.$on('event:auth-logout-complete', function () {
         $state.go('despachos.start', {}, {reload: true, inherit: false})
      })
   })

   .controller('HomeCtrl', function ($ionicViewService) {
      // This a temporary solution to solve an issue where the back button is displayed when it should not be.
      // This is fixed in the nightly ionic build so the next release should fix the issue
      $ionicViewService.clearHistory()
   })

   .controller('LogoutCtrl', function ($scope, Authenticate) {
      alert('logging out')
      Authenticate.logout()
   })