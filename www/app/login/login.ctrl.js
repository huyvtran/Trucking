angular.module('login.ctrl', [])


  .controller('LoginCtrl', function ($scope, $http, $state, AuthenticationService) {


    $scope.login = function (credentials) {
      console.log(credentials);

      $state.go('despachosMenu.start');

    };

    $scope.message = "";

    $scope.user = {
      username: null,
      password: null
    };

    $scope.login = function () {
      AuthenticationService.login($scope.user);
    };

    $scope.$on('event:auth-loginRequired', function (e, rejection) {
      $scope.loginModal.show();
    });

    $scope.$on('event:auth-loginConfirmed', function () {
      $scope.username = null;
      $scope.password = null;
      $scope.loginModal.hide();
    });

    $scope.$on('event:auth-login-failed', function (e, status) {
      var error = "Login failed.";
      if (status == 401) {
        error = "Invalid Username or Password.";
      }
      $scope.message = error;
    });

    $scope.$on('event:auth-logout-complete', function () {
      $state.go('app.home', {}, {reload: true, inherit: false});
    });
  })

  .controller('HomeCtrl', function ($ionicViewService) {
    // This a temporary solution to solve an issue where the back button is displayed when it should not be.
    // This is fixed in the nightly ionic build so the next release should fix the issue
    $ionicViewService.clearHistory();
  })

  .controller('CustomerCtrl', function ($scope, $state, $http) {
    $scope.customers = [];

    $http.get('https://customers')
      .success(function (data, status, headers, config) {
        $scope.customers = data;
      })
      .error(function (data, status, headers, config) {
        console.log("Error occurred.  Status:" + status);
      });
  })

  .controller('LogoutCtrl', function ($scope, AuthenticationService) {
    AuthenticationService.logout();
  });
