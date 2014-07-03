// TODO: Validation with tab icons

angular.module('ticket.ctrl', [])

   .controller('TicketCtrl', function ($scope, $rootScope, $state, $ionicModal, Authenticate) {

      $ionicModal.fromTemplateUrl('app/login/login.html', function (modal) {
            $scope.loginModal = modal
         },
         {  scope: $scope, animation: 'slide-in-up', focusFirstInput: true, backdropClickToClose: false  }
      )
      $scope.$on('$destroy', function () {
         $scope.loginModal.remove()
      })

      $scope.logout = function(){
         Authenticate.logout()
      }

      $scope.$on('handleBroadcast', function(event, args) {
         $scope.usuario = $rootScope.usuario
         console.log($scope.usuario)
      })

   })