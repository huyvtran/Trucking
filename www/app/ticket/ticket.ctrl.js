// TODO: Validation with tab icons

angular.module('ticket.ctrl', [])

  .controller('TicketCtrl', function ($scope, $state) {

    $scope.logout = function () {
      console.log('logged out now from ticket');
      $state.go('login');
    }
  });