angular.module('ticket.batches.ctrl', [])

  .controller('BatchesCtrl', function ($scope, $ionicPlatform, Ticket) {

    $scope.scanOther = function () {

      cordova.plugins.barcodeScanner.scan(
        function (success) {
          console.log(success);
        },
        function (error) {
          console.log(error);
        });
    }
  });