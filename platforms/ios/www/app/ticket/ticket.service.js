angular.module('ticket.service', [])


  .service('Ticket', function ($http) {

    var ticket = {
      truck: {
        license: {
          number: '',
          country: ''
        },
        marca: '',
        tipo: '',
        ejes: ''
      },

      driver: {
        apellido: '',
        nombre: '',
        telefono: '',
        patente: ''
      },

      peso: {
        tara: null,
        total: null,
        net: null
      },

      photos: {
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
      }
    };

    var icons = {
      truck: 1,
      driver: 0,
      weight: 0,
      batches: 1,
      photos: 2,
      finalize: 0
    };

    return {


      saveTruck: function (t) {
        ticket.truck = t;
      },

      getIcons: function () {
        return icons;
      },


      getTicket: function () {
        return ticket;
      },


      // get ALL Despachos
      getDesp: function () {
        return $http.get('http://www.desa-net.com/TOTAI/db/despacho/').then(function (resp) {
          return resp.data;
        })
      },


      // get Despacho with SEQ #
      getDesp_SEQ: function (SEQ) {
        return $http.get('http://www.desa-net.com/TOTAI/db/despacho/' + SEQ).then(function (resp) {
          return resp.data;
        })
      },


      // get ALL Transport Empresas
      getTransEmpresa: function () {
        return $http.get('http://www.desa-net.com/TOTAI/db/transport_empresa/').then(function (resp) {
          return resp.data;
        });
      },


      // get Transport Empresa with SEQ
      getTransEmpresa_SEQ: function (SEQ) {
        return $http.get('http://www.desa-net.com/TOTAI/db/transport_empresa/' + SEQ).then(function (resp) {
          return resp.data;
        });
      },


      // get ALL Transport Camion
      getTransCamion: function () {
        return $http.get('http://www.desa-net.com/TOTAI/db/transport_camion/').then(function (resp) {
          return resp.data;
        })
      },


      // get Transport Camion with SEQ
      getTransCamion_SEQ: function (SEQ) {
        return $http.get('http://www.desa-net.com/TOTAI/db/transport_camion/' + SEQ).then(function (resp) {
          return resp.data;
        })
      },


      // get Transport Camion with placa number
      getTransCamion_Placa: function (placa) {
        return $http.get('http://www.desa-net.com/TOTAI/db/transport_camion/get?placa_numero=' + placa).then(function (resp) {
          return resp.data;
        })
      },


      // get ALL Despacho Batches
      getDespBatch: function () {
        return $http.get('http://www.desa-net.com/TOTAI/db/despacho_batch/').then(function (resp) {
          return resp.data;
        })
      },


      // get ALL Despacho Batches WHERE despacho = SEQ
      getDespBatchWHERE_SEQ: function (SEQ) {
        return $http.get('http://www.desa-net.com/TOTAI/db/despacho_batch/get?despacho_SEQ=' + SEQ).then(function (resp) {
          return resp.data;
        })
      },


      // get Batch with SEQ
      getBatch_SEQ: function (SEQ) {
        return $http.get('http://www.desa-net.com/TOTAI/db/batch/' + SEQ).then(function (resp) {
          return resp.data;
        })
      }
    }
  });