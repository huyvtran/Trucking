'use strict';

angular.module('PhoneGap', [])
  .factory('PhoneGap', function ($q, $rootScope, $document, $ionicPlatform) {
    var deferred = $q.defer();

    $ionicPlatform.ready(function () {
      console.log('ionic is ready');
      $rootScope.$apply(deferred.resolve);
    });

    return {
      ready: function () {
        return deferred.promise;
      }
    };
  })
  .run(function (PhoneGap) {});

