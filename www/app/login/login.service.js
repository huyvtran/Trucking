angular.module('login.service', ['http-auth-interceptor'])

   .factory('Authenticate', function ($rootScope, $http, authService, $httpBackend) {

      var service = {
         login: function (user) {
            $http.post($rootScope.DB_URL + 'persona/login', user, { ignoreAuthModule: true })
               .success(function (data, status, headers, config) {

                  $rootScope.usuario = user.usuario
                  $rootScope.$emit('handleEmit', {usuario: 'new'})

                  $http.defaults.headers.common.Authorization = data.Auth_token
                  $http.defaults.headers.common.Auth_Expire = data.Auth_Expire
                  $rootScope.authExpire = data.Auth_Expire

                  authService.loginConfirmed(data, function (config) {
                     config.headers.Authorization = data.Auth_token
                     $rootScope.$broadcast('event:auth-loginConfirmed', status)
                     return config
                  })
               })
               .error(function (data, status, headers, config) {
                  $rootScope.$broadcast('event:auth-login-failed', status)
               })
         },
         logout: function () {
            $http.post($rootScope.DB_URL + 'persona/logout', {}, { ignoreAuthModule: true })
               .finally(function () {
                  delete $http.defaults.headers.common.Authorization
                  $rootScope.$broadcast('event:auth-logout-complete')
                  //alert('LOG OUT')
               })
         },
         loginCancelled: function () {
            authService.loginCancelled()
         }
      }
      return service
   })