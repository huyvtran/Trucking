angular.module('despachos.service', [])

  .service('Despachos', function ($http) {

    return {

      // get ALL Despachos

      getAllDesp: function () {
        var promise = $http.get('http://www.desa-net.com/TOTAI/db/despacho/').then(function (resp) {
          return resp.data;
        });
        return promise
      },


      // get Despacho with SEQ #

      getDesp_SEQ: function (SEQ) {
        var promise = $http.get('http://www.desa-net.com/TOTAI/db/despacho/' + SEQ).then(function (resp) {
          return resp.data;
        });
        return promise
      },


      // get ALL Transport Empresas

      getTransEmpressa: function () {
        var promise = $http.get('http://www.desa-net.com/TOTAI/db/transport_empresa/').then(function (resp) {
          return resp.data;
        });
        return promise
      },


      // get Transport Empresa with SEQ

      getTransEmpressa_SEQ: function (SEQ) {
        var promise = $http.get('http://www.desa-net.com/TOTAI/db/transport_empresa/' + SEQ).then(function (resp) {
          return resp.data;
        });
        return promise
      },


      // get ALL Despacho Batches

      getAllDespBatch: function () {
        var promise = $http.get('http://www.desa-net.com/TOTAI/db/despacho_batch/').then(function (resp) {
          return resp.data;
        });
        return promise
      },


      // get ALL Despacho Batches WHERE despacho = SEQ

      getDespBatchWHERE_SEQ: function (SEQ) {
        var promise = $http.get('http://www.desa-net.com/TOTAI/db/despacho_batch/get?despacho_SEQ=' + SEQ).then(function (resp) {
          return resp.data;
        });
        return promise
      },



      // get Batch with SEQ

      getBatch_SEQ: function (SEQ) {
        var promise = $http.get('http://www.desa-net.com/TOTAI/db/batch/' + SEQ).then(function (resp) {
          return resp.data;
        });
        return promise
      }
    }

  });