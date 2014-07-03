angular.module('despachos.ctrl', [])

   .controller('DespachosMenuCtrl', function ($scope, $rootScope, $state, $ionicLoading, $ionicModal, Despacho, Authenticate) {

      $ionicModal.fromTemplateUrl('app/login/login.html', function (modal) {
            $scope.loginModal = modal
         },
         { scope: $scope, animation: 'slide-in-up', focusFirstInput: true, backdropClickToClose: false }
      )
      //Be sure to cleanup the modal by removing it from the DOM
      $scope.$on('$destroy', function () {
         $scope.loginModal.remove()
      })

      $scope.$on('handleBroadcast', function(event, args) {
         $scope.usuario = $rootScope.usuario
         console.log($scope.usuario)
      })

      $scope.search = { SEQ: '' }
      //$ionicLoading.show({template: 'Loading Despachos'});

      Despacho.getAll().$promise.then(function (d) {
         $scope.despachos = d
         $scope.lastUpdate = moment().format('D/M - H:mm')
         //$ionicLoading.hide()
      })

      $scope.doRefresh = function () {
         Despacho.getAll().$promise.then(function (d) {
            $scope.despachos = d
         }).finally(function () {
            $scope.$broadcast('scroll.refreshComplete')
            $scope.lastUpdate = moment().format('D/M - H:mm')
         })
      }

      $scope.clearSearch = function () {
         $scope.search.SEQ = ''
      }

      $scope.logout = function(){
         Authenticate.logout()
      }

   })

   // DETAIL
   .controller('DespachosDetailCtrl', function ($scope, $stateParams, $state, $ionicLoading, Despacho, DespachoBatch, Batch) {
      var SEQ = $stateParams.SEQ;
      $scope.batches = [];

      //$ionicLoading.show({template: 'Loading Despacho #' + SEQ});

      Despacho.getOne({SEQ: SEQ}).$promise.then(function (d) {
         $scope.despacho = d;
      });

      DespachoBatch.getWithDespacho({despacho_SEQ: SEQ}).$promise.then(function (d) {

         angular.forEach(d, function (r) {
            $scope.batch_quantidad = r.batch_quantidad;

            Batch.getOne({SEQ: r.batch_SEQ}).$promise.then(function (resp) {
               $scope.batches.push(resp);
               $ionicLoading.hide();
            });
         });
      });

      $scope.selectDespacho = function (loc) {
         switch (loc) {
            case 'truck':
               $state.go('ticket.truck', {SEQ: SEQ});
               $state.go('ticket.truck.submenu', {SEQ: SEQ});
               break;
            case 'batches':
               $state.go('ticket.batches', {SEQ: SEQ});
               $state.go('ticket.batches.submenu', {SEQ: SEQ});
               break;
            case 'muestras':
               $state.go('ticket.muestras', {SEQ: SEQ});
               $state.go('ticket.muestras.submenu', {SEQ: SEQ});
               break;
            case 'otros':
               $state.go('ticket.otros', {SEQ: SEQ});
               $state.go('ticket.otros.submenu', {SEQ: SEQ});
               break;
            case 'fotos':
               $state.go('ticket.fotos', {SEQ: SEQ});
               $state.go('ticket.fotos.submenu', {SEQ: SEQ});
               break;
         }
      }

   })