// TODO: Use SEQ number to obtain initial values
// TODO: Update info to MySql server, on loss of focus
// TODO: Create init function for each controller
// TODO: Validation with tab icons
// TODO: Implement photos
// TODO: Exit and Clear button for each header
// TODO: Implement barcode / QR scanner
// TODO: Copy MySQL data into the form, save the data when you FINALIZE

angular.module('ticket.batches.ctrl', [])

  .controller('BatchesCtrl', function ($scope, $ionicPlatform, Ticket) {

    $scope.scan = function () {
      $ionicPlatform.ready(function () {

        cordova.plugins.barcodeScanner.scan(
          function (result) {
            console.log(result.text);
            console.log(result.format);
            console.log(result.cancelled);
          },
          function (error) {
            console.log(error);
          }
        );

      });
    };
  });