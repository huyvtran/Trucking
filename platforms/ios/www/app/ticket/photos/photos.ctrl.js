// TODO: Use SEQ number to obtain initial values
// TODO: Update info to MySql server, on loss of focus
// TODO: Create init function for each controller
// TODO: Validation with tab icons
// TODO: Implement photos
// TODO: Exit and Clear button for each header
// TODO: Implement barcode / QR scanner
// TODO: Copy MySQL data into the form, save the data when you FINALIZE

angular.module('ticket.photos.ctrl', [])

  .controller('PhotosCtrl', function ($scope, Ticket) {


    // status     0 - missing    1 - complete    2 - warning
    // required   0 - no         1 - yes         2 - maybe??
    $scope.photos = {
      truck: {
        empty: {
          title: 'Empty Truck',
          status: 1,
          required: 0,
          image: 'http://placehold.it/200x150'
        },
        full: {
          title: 'Full Truck',
          status: 2,
          required: 0,
          image: 'http://placehold.it/200x150'
        },
        side_left: {
          title: 'Truck Sideview Left',
          status: 1,
          required: 0,
          image: 'http://placehold.it/200x150'
        },
        side_right: {
          title: 'Truck Sideview Right',
          status: 0,
          required: 0,
          image: 'http://placehold.it/200x150'
        }
      },
      driver: {
        face: {
          title: 'Driver Face',
          status: 1,
          required: 0,
          image: 'http://placehold.it/200x150'
        },
        license_front: {
          title: 'License Front',
          status: 1,
          required: 0,
          image: 'http://placehold.it/200x150'
        },
        license_back: {
          title: 'License Back',
          status: 1,
          required: 0,
          image: 'http://placehold.it/200x150'
        },
        driver_something: {
          title: 'Something Here',
          status: 1,
          required: 0,
          image: 'http://placehold.it/200x150'
        }
      }

    };


    $scope.clear = function (photo) {
      console.log(photo);
      photo.image = 'YOYOYOYOOY';
    };


    $scope.capturePhoto = function (photo) {

      function onSuccess(imageData) {
        $scope.$apply(photo.image = imageData);

        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = 'customTitleHere';
        options.mimeType = "image/jpeg";


        var ft = new FileTransfer();
        var url = "http://www.desa-net.com/SunProd/fs/FILETEST/";
        ft.upload(imageData,
          encodeURI(url),
          function (response) {
            alert('Response Code ' + response.responseCode + 'Response ' + response.response);
          },
          function (error) {
            alert('ERROR file uploaded taken');
            alert('Response Code ' + error.code + 'Response ' + error.source + 'Target ' + error.target);
          },
          options);

      }

      function onFail(message) {
        alert('Failed because: ' + message);
      }

      navigator.camera.getPicture(onSuccess, onFail,
        { quality: 10,
          sourceType: Camera.PictureSourceType.CAMERA,
          destinationType: Camera.DestinationType.FILE_URI
        });

    }

  })
;