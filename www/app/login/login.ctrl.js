angular.module('login.ctrl', [])

.controller ('LoginCtrl', function ($scope) {

  $scope.login = function (credentials) {
    console.log(credentials);
  }

});