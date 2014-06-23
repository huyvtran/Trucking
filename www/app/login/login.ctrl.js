angular.module('login.ctrl', [])

.controller ('LoginCtrl', function ($scope, $state) {

  $scope.login = function (credentials) {
    console.log(credentials);

    $state.go('despachosMenu.start');

  };



});