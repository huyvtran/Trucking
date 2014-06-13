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
            image: './img/blank_img.jpg'
          },
          full: {
            title: 'Full Truck',
            status: 2,
            required: 0,
            image: './img/blank_img.jpg'
          },
          side_left: {
            title: 'Truck Sideview Left',
            status: 1,
            required: 0,
            image: './img/blank_img.jpg'
          },
          side_right: {
            title: 'Truck Sideview Right',
            status: 0,
            required: 0,
            image: './img/blank_img.jpg'
          }
        },
        driver: {
          face: {
            title: 'Driver Face',
            status: 1,
            required: 0,
            image: './img/blank_img.jpg'
          },
          license_front: {
            title: 'License Front',
            status: 1,
            required: 0,
            image: './img/blank_img.jpg'
          },
          license_back: {
            title: 'License Back',
            status: 1,
            required: 0,
            image: './img/blank_img.jpg'
          },
          driver_something: {
            title: 'Something Here',
            status: 1,
            required: 0,
            image: './img/blank_img.jpg'
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

  .factory('DespachoFoto', function ($resource) {
    return $resource('http://www.desa-net.com/TOTAI/db/despacho_foto/:SEQ:verb', {}, {
        getAll: {method: 'GET', isArray: true},
        getOne: {method: 'GET', params: {SEQ: '@SEQ'}},
        getWithDespacho: {method: 'GET', params: {verb: 'get', despacho_SEQ: '@despacho'}, isArray: true},
        update: {method: 'POST', params: {SEQ: '@SEQ'}},
        new: {method: 'POST'},
        delete: {method: 'DELETE', params: {SEQ: '@SEQ'}}
      }
    );
  })

  .factory('DespachoFotoTipo', function ($resource) {
    return $resource('http://www.desa-net.com/TOTAI/db/despacho_foto_tipo/:SEQ:verb', {}, {
        getAll: {method: 'GET', isArray: true},
        getOne: {method: 'GET', params: {SEQ: '@SEQ'}},
        getWithCliente: {method: 'GET', params: {verb: 'get', cliente_SEQ: '@cliente'}, isArray: true}
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
        new: {method: 'POST', params: {verb: 'X'}},
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
  })

  .factory('Persona', function ($resource) {
    return $resource('http://www.desa-net.com/TOTAI/db/persona/:SEQ:verb', {}, {
        getAll: {method: 'GET', isArray: true},
        getOne: {method: 'GET', params: {SEQ: '@SEQ'}},
        getWithName: {method: 'GET', params: {verb: 'get', nombre: ''}},
        update: {method: 'PUT', params: {SEQ: '@SEQ'}},
        new: {method: 'POST'},
        delete: {method: 'DELETE', params: {SEQ: '@SEQ'}}
      }
    );
  })

  .factory('Blob', function ($resource) {
    return $resource('http://www.desa-net.com/TOTAI/db/blob/:SEQ:verb', {}, {
        getAll: {method: 'GET', isArray: true},
        getOne: {method: 'GET', params: {SEQ: '@SEQ'}},
        update: {method: 'PUT', params: {SEQ: '@SEQ'}},
        getWithID: {method: 'GET', params: {verb: 'get', id: '@id'}, isArray:false},
        new: {method: 'POST'},
        delete: {method: 'DELETE', params: {SEQ: '@SEQ'}}
      }
    );
  })


  .factory('Photo', function ($http, $q) {

    return {
      upload: function (imageData, options) {
        var q = $q.defer();
        var url = "http://www.desa-net.com/TOTAI/db/despacho_foto/";
        var ft = new FileTransfer();

        ft.onprogress = function (progressEvent) {
          if (progressEvent.lengthComputable) {
            var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
            q.notify(perc);
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
      },

      donwload: function (url) {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);

        function fileSystemSuccess(fileSystem) {
          var download_link = encodeURI(URL);
          ext = download_link.substr(download_link.lastIndexOf('.') + 1); //Get extension of URL

          var directoryEntry = fileSystem.root; // to get root path of directory
          directoryEntry.getDirectory(Folder_Name, { create: true, exclusive: false }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
          var rootdir = fileSystem.root;
          var fp = rootdir.fullPath; // Returns Fulpath of local directory

          fp = fp + "/" + Folder_Name + "/" + File_Name + "." + ext; // fullpath and name of the file which we want to give
          // download function call
          filetransfer(download_link, fp);
        }

        function onDirectorySuccess(parent) {
          // Directory created successfuly
        }

        function onDirectoryFail(error) {
          //Error while creating directory
          alert("Unable to create new directory: " + error.code);
        }

        function fileSystemFail(evt) {
          //Unable to access file system
          alert(evt.target.error.code);
        }

      }
    }
  })


  .factory('PhotoRequirements', function ($resource) {

    var photoRequirements = [
      {
        tipo: 'Truck',
        detaille: 'Empty',
        status: 0,
        obligatorio: 1,
        progress: 0,
        image: './img/blank_img.jpg'
      },
      { tipo: 'Truck',
        detaille: 'Full',
        status: 0,
        obligatorio: 2,
        progress: 0,
        image: './img/blank_img.jpg'
      },
      { tipo: 'Truck',
        detaille: 'Front',
        status: 0,
        obligatorio: 1,
        progress: 0,
        image: './img/blank_img.jpg'
      },
      { tipo: 'Truck',
        detaille: 'License',
        status: 0,
        obligatorio: 2,
        progress: 0,
        image: './img/blank_img.jpg'
      },
      { tipo: 'Driver',
        detaille: 'Person',
        status: 0,
        obligatorio: 1,
        progress: 0,
        image: './img/blank_img.jpg'
      },
      { tipo: 'Driver',
        detaille: 'License',
        status: 0,
        obligatorio: 1,
        progress: 0,
        image: './img/blank_img.jpg'
      },
      { tipo: 'Truck',
        detaille: 'Right',
        status: 0,
        obligatorio: 1,
        progress: 0,
        image: './img/blank_img.jpg'
      },
      { tipo: 'Truck',
        detaille: 'Right',
        status: 0,
        obligatorio: 1,
        progress: 0,
        image: './img/blank_img.jpg'
      },
      { tipo: 'Truck',
        detaille: 'Right',
        status: 0,
        obligatorio: 1,
        progress: 0,
        image: './img/blank_img.jpg'
      },
      { tipo: 'Truck',
        detaille: 'Right',
        status: 0,
        obligatorio: 0,
        progress: 0,
        image: './img/blank_img.jpg'
      },
      { tipo: 'Truck',
        detaille: 'Right',
        status: 0,
        obligatorio: 1,
        progress: 0,
        image: './img/blank_img.jpg'
      },
      { tipo: 'Truck',
        detaille: 'Right',
        status: 0,
        obligatorio: 0,
        progress: 0,
        image: './img/blank_img.jpg'
      }
    ];

    return {

      getAll: function () {
        return photoRequirements;
      },

      setImage: function (tipo, detaille) {
        angular.forEach(photoRequirements, function (res) {
          if (res.tipo === tipo && res.detaille === detaille) {
            res.image = 'HELLO';
          }
        });
      }
    }
  })
;