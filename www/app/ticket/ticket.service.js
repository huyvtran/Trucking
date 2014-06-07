angular.module('ticket.service', [])


  .service('Ticket', function ($http) {


    var despacho = {
      SEQ: '',
      venta_SEQ: '',
      export_SEQ: '',
      cliente_SEQ: '',
      factura_num: '',
      fecha_pedido: '',
      fecha_despacho: '',
      fecha_llegado: '',
      contenador_num: '',
      precintos: '',
      puerto: '',
      frontera: '',
      destino: ''
    };

    var transport_empresa = {
      SEQ: '',
      codigo: '',
      nombre: '',
      contacto: '',
      direccion: '',
      telefono: ''
    };

    var transport_camion = {
      SEQ: '',
      placa_numero: '',
      placa_pais: '',
      empresa_SEQ: '',
      marca: '',
      tipo: '',
      max_kg: '',
      tara_kg: '',
      ejes: '',
      ejes_trailer: ''
    };

    var transport_chofer = {
      SEQ: '',
      codigo: '',
      nombre: '',
      contacto: '',
      direccion: '',
      telefono: ''
    };

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
      setDespachoSEQ: function (SEQ) {
        despachoSEQ = SEQ;
      },

      getDespachoSEQ: function () {
        return despachoSEQ;
      },


      saveTruck: function (t) {
        ticket.truck = t;
      },

      getIcons: function () {
        return icons;
      },

      getTicket: function () {
        return ticket;
      }
    }
  })


  .factory('Despacho', function ($resource) {
    return $resource('http://www.desa-net.com/TOTAI/db/despacho/:SEQ', {}, {
        getAll: {method: 'GET', isArray: true},
        getOne: {method: 'GET', params: {SEQ: '@SEQ'}},
        update: {method: 'POST', params: {SEQ: '@SEQ'}},
        new: {method: 'POST'},
        delete: {method: 'DELETE', params: {SEQ: '@SEQ'}}
      }
    );
  })

  .factory('DespachoBatch', function ($resource) {
    return $resource('http://www.desa-net.com/TOTAI/db/despacho_batch/:SEQ:verb', {}, {
        getAll: {method: 'GET', isArray: true},
        getOne: {method: 'GET', params: {SEQ: '@SEQ'}},
        getWithDespacho: {method: 'GET', params: {verb: 'get', despacho_SEQ: '@despacho'}, isArray: true},
        update: {method: 'POST', params: {SEQ: '@SEQ'}},
        new: {method: 'POST'},
        delete: {method: 'DELETE', params: {SEQ: '@SEQ'}}
      }
    );
  })

  .factory('Batch', function ($resource) {
    return $resource('http://www.desa-net.com/TOTAI/db/batch/:SEQ', {}, {
        getAll: {method: 'GET', isArray: true},
        getOne: {method: 'GET', params: {SEQ: '@SEQ'}},
        update: {method: 'POST', params: {SEQ: '@SEQ'}},
        new: {method: 'POST'},
        delete: {method: 'DELETE', params: {SEQ: '@SEQ'}}
      }
    );
  })


  .factory('Empresa', function ($resource) {
    return $resource('http://www.desa-net.com/TOTAI/db/transport_empresa/:SEQ:verb', {}, {
        getAll: {method: 'GET', isArray: true},
        getOne: {method: 'GET', params: {SEQ: '@SEQ'}},
        getWithPlaca: {method: 'GET', params: {verb: 'get', placa_numero: '@placa'}, isArray: true},
        update: {method: 'PUT', params: {SEQ: '@SEQ'}},
        new: {method: 'POST'},
        delete: {method: 'DELETE', params: {SEQ: '@SEQ'}}
      }
    );
  })


  .factory('Camion', function ($resource) {
    return $resource('http://www.desa-net.com/TOTAI/db/transport_camion/:SEQ:verb', {}, {
        getAll: {method: 'GET', isArray: true},
        getOne: {method: 'GET', params: {SEQ: '@SEQ'}},
        getWithPlaca: {method: 'GET', params: {verb: 'get', placa_numero: '@placa'}, isArray: true},
        update: {method: 'PUT', params: {SEQ: '@SEQ'}},
        new: {method: 'POST'},
        delete: {method: 'DELETE', params: {SEQ: '@SEQ'}}
      }
    );
  })


  .factory('Chofer', function ($resource) {
    return $resource('http://www.desa-net.com/TOTAI/db/transport_chofer/:SEQ:verb', {}, {
        getAll: {method: 'GET', isArray: true},
        getOne: {method: 'GET', params: {SEQ: '@SEQ'}},
        getWithPlaca: {method: 'GET', params: {verb: 'get', placa_numero: '1'}},
        update: {method: 'PUT', params: {SEQ: '@SEQ'}},
        new: {method: 'POST'},
        delete: {method: 'DELETE', params: {SEQ: '@SEQ'}}
      }
    );
  });