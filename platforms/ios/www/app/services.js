angular.module('app.services', [])


  .factory('Apps', function ($rootScope, $resource) {
    return $resource('http://www.desa-net.com/TOTAI/db/apps/:SEQ/search/:query', {}, {
        getAll: {method: 'GET', isArray: true},
        getOne: {method: 'GET', params: {SEQ: '@SEQ'}},
        findByName: {method: 'GET', params: {query: '@query'}, isArray: true},
        update: {method: 'POST', params: {SEQ: '@SEQ'}},
        new: {method: 'POST'},
        delete: {method: 'DELETE', params: {SEQ: '@SEQ'}}
      }
    );
  })

  .factory('Despacho', function ($rootScope, $resource) {
    return $resource($rootScope.DB_URL + 'despacho/:SEQ', {}, {
        getAll: {method: 'GET', isArray: true},
        getOne: {method: 'GET', params: {SEQ: '@SEQ'}},
        update: {method: 'POST', params: {SEQ: '@SEQ'}},
        new: {method: 'POST'},
        delete: {method: 'DELETE', params: {SEQ: '@SEQ'}}
      }
    );
  })

  .factory('DespachoBatch', function ($rootScope, $resource) {
    return $resource($rootScope.DB_URL + 'despacho_batch/:SEQ:verb', {}, {
        getAll: {method: 'GET', isArray: true},
        getOne: {method: 'GET', params: {SEQ: '@SEQ'}},
        getWithDespacho: {method: 'GET', params: {verb: 'get', despacho_SEQ: '@despacho'}, isArray: true},
        update: {method: 'POST', params: {SEQ: '@SEQ'}},
        new: {method: 'POST'},
        delete: {method: 'DELETE', params: {SEQ: '@SEQ'}}
      }
    );
  })

  .factory('DespachoBatchUnidad', function ($rootScope, $resource) {
    return $resource($rootScope.DB_URL + 'despacho_batch_unidad/:SEQ:verb:verb2:verb3', {}, {
        getAll: {method: 'GET', isArray: true},
        getOne: {method: 'GET', params: {SEQ: '@SEQ'}},
        getWithDespacho: {method: 'GET', params: {verb: 'get', despacho_SEQ: '@despacho'}, isArray: true},
        getWithMany: {method: 'GET', params: {verb: 'get', despacho_SEQ: '@despacho', verb2: 'get', batch_SEQ: '@batch', verb3: 'get', batch_unidad_SEQ: '@unidad'}, isArray: true},
        update: {method: 'POST', params: {SEQ: '@SEQ'}},
        addNew: {method: 'POST', params: {verb: 'X'}},
        delete: {method: 'DELETE', params: {SEQ: '@SEQ'}}
      }
    );
  })

  .factory('DespachoFoto', function ($rootScope, $resource) {
    return $resource($rootScope.DB_URL + 'despacho_foto/:SEQ:verb', {}, {
        getAll: {method: 'GET', isArray: true},
        getOne: {method: 'GET', params: {SEQ: '@SEQ'}},
        getWithDespacho: {method: 'GET', params: {verb: 'get', despacho_SEQ: '@despacho'}, isArray: true},
        getWithTipoSEQ: {method: 'GET', params: {verb: 'get', tipo_SEQ: '@tipo_SEQ'}, isArray: true},
        update: {method: 'POST', params: {SEQ: '@SEQ'}},
        new: {method: 'POST'},
        delete: {method: 'DELETE', params: {SEQ: '@SEQ'}}
      }
    );
  })

  .factory('DespachoFotoTipo', function ($rootScope, $resource) {
    return $resource($rootScope.DB_URL + 'despacho_foto_tipo/:SEQ:verb', {}, {
        getAll: {method: 'GET', isArray: true},
        getOne: {method: 'GET', params: {SEQ: '@SEQ'}},
        getWithCliente: {method: 'GET', params: {verb: 'get', cliente_SEQ: '@cliente'}, isArray: true}
      }
    );
  })

  .factory('Batch', function ($rootScope, $resource) {
    return $resource($rootScope.DB_URL + 'batch/:SEQ', {}, {
        getAll: {method: 'GET', isArray: true},
        getOne: {method: 'GET', params: {SEQ: '@SEQ'}},
        update: {method: 'POST', params: {SEQ: '@SEQ'}},
        new: {method: 'POST'},
        delete: {method: 'DELETE', params: {SEQ: '@SEQ'}}
      }
    );
  })

  .factory('BatchUnidad', function ($rootScope, $resource) {
    return $resource($rootScope.DB_URL + 'batch_unidad/:SEQ', {}, {
        getAll: {method: 'GET', isArray: true},
        getOne: {method: 'GET', params: {SEQ: '@SEQ'}},
        update: {method: 'POST', params: {SEQ: '@SEQ'}},
        new: {method: 'POST'},
        delete: {method: 'DELETE', params: {SEQ: '@SEQ'}}
      }
    );
  })

  .factory('Empresa', function ($rootScope, $resource) {
    return $resource($rootScope.DB_URL + 'transport_empresa/:SEQ:verb', {}, {
        getAll: {method: 'GET', isArray: true},
        getOne: {method: 'GET', params: {SEQ: '@SEQ'}},
        getWithPlaca: {method: 'GET', params: {verb: 'get', placa_numero: '@placa'}, isArray: true},
        update: {method: 'PUT', params: {SEQ: '@SEQ'}},
        new: {method: 'POST'},
        delete: {method: 'DELETE', params: {SEQ: '@SEQ'}}
      }
    );
  })

  .factory('Camion', function ($rootScope, $resource) {
    return $resource($rootScope.DB_URL + 'transport_camion/:SEQ:verb', {}, {
        getAll: {method: 'GET', isArray: true},
        getOne: {method: 'GET', params: {SEQ: '@SEQ'}},
        getWithPlaca: {method: 'GET', params: {verb: 'get', placa_numero: '@placa'}, isArray: true},
        update: {method: 'PUT', params: {SEQ: '@SEQ'}},
        new: {method: 'POST', params: {verb: 'X'}},
        delete: {method: 'DELETE', params: {SEQ: '@SEQ'}}
      }
    );
  })

  .factory('Chofer', function ($rootScope, $resource) {
    return $resource($rootScope.DB_URL + 'transport_chofer/:SEQ:verb', {}, {
        getAll: {method: 'GET', isArray: true},
        getOne: {method: 'GET', params: {SEQ: '@SEQ'}},
        getWithPlaca: {method: 'GET', params: {verb: 'get', placa_numero: '1'}},
        update: {method: 'PUT', params: {SEQ: '@SEQ'}},
        new: {method: 'POST'},
        delete: {method: 'DELETE', params: {SEQ: '@SEQ'}}
      }
    );
  })

  .factory('Persona', function ($rootScope, $resource) {
    return $resource($rootScope.DB_URL + 'persona/:SEQ:verb', {}, {
        getAll: {method: 'GET', isArray: true},
        getOne: {method: 'GET', params: {SEQ: '@SEQ'}},
        getWithName: {method: 'GET', params: {verb: 'get', nombre: ''}},
        update: {method: 'PUT', params: {SEQ: '@SEQ'}},
        new: {method: 'POST'},
        delete: {method: 'DELETE', params: {SEQ: '@SEQ'}}
      }
    );
  })

  .factory('Blob', function ($rootScope, $resource) {
    return $resource($rootScope.DB_URL + 'blob/:SEQ:verb', {}, {
        getAll: {method: 'GET', isArray: true},
        getOne: {method: 'GET', params: {SEQ: '@SEQ'}},
        update: {method: 'PUT', params: {SEQ: '@SEQ'}},
        getWithID: {method: 'GET', params: {verb: 'get', id: '@id'}, isArray: false},
        new: {method: 'POST'},
        delete: {method: 'DELETE', params: {SEQ: '@SEQ'}}
      }
    );
  })


  .factory('Camera', function ($q) {
    return {
      capture: function (options) {
        var q = $q.defer();

        navigator.camera.getPicture(function (success) {
          q.resolve(success);
        }, function (error) {
          q.reject(error);
        }, options);
        return q.promise;
      }
    }
  })


  .factory('Photo', function ($http, $rootScope, $q) {

    return {
      upload: function (imageData, options) {
        var q = $q.defer();
        var url = $rootScope.DB_URL + 'despacho_foto/';
        var ft = new FileTransfer();

        ft.onprogress = function (progressEvent) {
          if (progressEvent.lengthComputable) {
            var percent = Math.floor(progressEvent.loaded / progressEvent.total * 100);
            q.notify(percent);
          }
          else {
            console.log('error');
          }
        };

        ft.upload(imageData, encodeURI(url), function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error);
        }, options);

        return q.promise;
      }
    }
  });