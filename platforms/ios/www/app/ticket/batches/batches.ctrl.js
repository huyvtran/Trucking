// TODO: Use SEQ number to obtain initial values
// TODO: Update info to MySql server, on loss of focus
// TODO: Create init function for each controller
// TODO: Validation with tab icons
// TODO: Implement photos
// TODO: Exit and Clear button for each header
// TODO: Implement barcode / QR scanner
// TODO: Copy MySQL data into the form, save the data when you FINALIZE

angular.module('ticket.batches.ctrl', [])

  .controller('BatchesCtrl', function ($scope, $ionicPlatform, Scandit, Barcode, Ticket) {

    $scope.scan = function () {
      var options = {
        "beep": true,
        "1DScanning": true,
        "2DScanning": true
      };

      Scandit.scan(options).then(function (success) {
          console.log(success);
          $scope.response = success[0];
          $scope.code = success[1];
          alert(success[0] + ' ' + success[1]);
        },
        function (error) {
          console.log(error);
          alert(error);
        })
    };


    $scope.scanOther = function () {

      cordova.plugins.barcodeScanner.scan(function (success) {
          console.log(success);
        },
        function (error) {
          console.log(error);
        });

      /*Barcode.scan().then(function (result) {
       console.log(result);
       alert(result);

       },
       function (error) {
       alert(error);
       console.log(error);
       },
       function (notify) {
       console.log(notify);
       alert(notify);
       }
       );
       */
    }
  });