// TODO: Use SEQ number to obtain initial values
// TODO: Update info to MySql server, on loss of focus
// TODO: Create init function for each controller
// TODO: Validation with tab icons
// TODO: Implement photos
// TODO: Exit and Clear button for each header
// TODO: Implement barcode / QR scanner
// TODO: Copy MySQL data into the form, save the data when you FINALIZE

angular.module('ticket.finalize.ctrl', [])

  .controller('FinalizeCtrl', function ($scope, Ticket) {

    console.log('finalize');

    var ticket = Ticket.getTicket();
    $scope.peso = ticket.peso;

  });