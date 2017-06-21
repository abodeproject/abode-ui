
var devices = angular.module('abode.devices');

devices.service('devices', function ($q, $http, $uibModal, $rootScope, $timeout, $resource, abode, DeviceRooms) {
  var model = $resource(abode.url('/api/devices/:id/:action'), {id: '@_id'}, {
    'update': { method: 'PUT' },
    'on': { method: 'POST', params: {'action': 'on'}},
    'off': { method: 'POST', params: {'action': 'off'}}
  });
  var devices = {};


  var methods = {};

  methods.$rooms = function () {
    return DeviceRooms.query({'device': this.name});

  };

  methods.$refresh = function (force) {
    var req,
      self = this,
      defer = $q.defer(),
      url = abode.url('/api/devices/' + this._id).value();


    if (force && self.active) {
      req = $http.post(abode.url('/api/devices/' + this._id + '/status').value());
    } else {
      req = $http.get(abode.url('/api/devices/' + this._id ).value());
    }

    self.$loading = true;
    self.$error = false;

    req.then(function (response) {
      var results = response.data.response || response.data;

      for (var key in results) {
        if (results.hasOwnProperty(key)) {
          self[key] = results[key];
        }
      }
      self.$loading = false;
      defer.resolve(self);
    }, function (err) {
      self.$loading = false;
      self.$error = true;
      defer.reject(err.data);
    });

    return defer.promise;
  };

  methods.$lock = function () {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/devices/' + this._id + '/lock').value();

    $http.post(url).then(function (response) {
      self._on = true;
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  methods.$unlock = function () {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/devices/' + this._id + '/unlock').value();

    $http.post(url).then(function (response) {
      self._on = false;
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  methods.$beep = function () {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/devices/' + this._id + '/beep').value();

    self.$loading = true;
    self.$error = false;

    $http.post(url).then(function (response) {
      self.$loading = false;
      defer.resolve(response.data);
    }, function (err) {
      self.$loading = false;
      self.$error = true;
      defer.reject(err.data);
    });

    return defer.promise;
  };

  methods.$on = function () {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/devices/' + this._id + '/on').value();

    self.$loading = true;
    self.$error = false;

    $http.post(url).then(function (response) {
      self.$loading = false;
      self._on = true;
      self._level = 100;
      defer.resolve(response.data);
    }, function (err) {
      self.$loading = false;
      self.$error = true;
      defer.reject(err.data);
    });

    return defer.promise;
  };

  methods.$off = function () {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/devices/' + this._id + '/off').value();

    self.$loading = true;
    self.$error = false;

    $http.post(url).then(function (response) {
      self.$loading = false;
      self._on = false;
      self._level = 0;
      defer.resolve(response.data);
    }, function (err) {
      self.$loading = false;
      self.$error = true;
      defer.reject(err.data);
    });

    return defer.promise;
  };

  methods.$motion_on = function () {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/devices/' + this._id + '/motion_on').value();

    $http.post(url).then(function (response) {
      self._on = true;
      self._motion = true;
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  methods.$motion_off = function () {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/devices/' + this._id + '/motion_off').value();

    $http.post(url).then(function (response) {
      self._on = false;
      self._motion = false;
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  methods.$toggle = function () {
    var action,
      self = this,
      defer = $q.defer(),
      url = abode.url('/api/devices/' + this.name).value();

    if (self.active) {
      action = (self._on) ? self.$off : self.$on;
      action.apply(self).then(function (response) {
        defer.resolve(response);
      }, function (err) {
        defer.reject(err);
      });
    } else {
      $http.put(url, {'_on': !self._on}).then(function (response) {
        self._on = !self._on;
        defer.resolve(response.data);
      }, function (err) {
        defer.reject(err.data);
      });
    }

    return defer.promise;
  };

  methods.$toggle_motion = function () {
    var action,
      self = this,
      defer = $q.defer(),
      url = abode.url('/api/devices/' + this.name).value();

    if (self.active) {
      action = (self._on) ? self.$motion_off : self.$motion_on;
      action.apply(self).then(function (response) {
        defer.resolve(response);
      }, function (err) {
        defer.reject(err);
      });
    } else {
      $http.put(url, {'_on': !self._on, '_motion': !self._motion}).then(function (response) {
        self._on = !self._on;
        self._motion = !self._motion;
        defer.resolve(response.data);
      }, function (err) {
        defer.reject(err.data);
      });
    }

    return defer.promise;
  };

  methods.$open = function () {
    var self = this;

    return openDevice(self);
  };

  methods.$camera = function () {
    var self = this;

    openCamera(self);
  };

  methods.$set_mode = function (mode) {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/devices/' + this._id + '/set_mode').value();

    $http.post(url, [mode]).then(function (response) {
      self._mode = mode;
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  methods.$set_temp = function (temp) {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/devices/' + this._id + '/set_point').value();

    $http.post(url, [temp]).then(function (response) {
      self._set_point = temp;
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  methods.$set_level = function (level) {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/devices/' + this._id + '/set_level').value();

    self.$loading = true;
    self.$error = false;

    $http.post(url, [level]).then(function (response) {
      self.$loading = false;
      self._level = level;
      self._on = (level > 0) ? true : false;

      defer.resolve(response.data);
    }, function (err) {
      self.$loading = false;
      self.$error = true;
      defer.reject(err.data);
    });

    return defer.promise;

  };

  methods.$image_url = function () {
    var random = new Date();
    return (this.config.image_url) ? abode.url('/api/devices/' + this._id + '/image?' + random.getTime() + '&client_token=' + abode.config.auth.token.client_token + '&auth_token=' + abode.config.auth.token.auth_token).value() : undefined;

  };

  methods.$video_url = function () {
    var random = new Date();
    return (this.config.video_url) ? abode.url('/api/devices/' + this._id + '/video?live=true&client_token=' + abode.config.auth.token.client_token + '&auth_token=' + abode.config.auth.token.auth_token).value() : undefined;

  };

  $rootScope.$on('DEVICE_CHANGE', function (event, args) {

    args.source = args.source || 'local';
    setDevice(args.object, args.source);


    //console.log('Device event from %s: %s', args.source, args.object.name);
  });

  var get_by_name = function (name, source) {
    var found;

    source = source || 'local';

    if (!devices[source]) {
      return;
    }

    if (devices[source][name]) {
      return devices[source][name];
    }

    Object.keys(devices[source]).forEach(function (id) {
      if (devices[source][id].name === name) {
        found = devices[source][id];
      }
    });

    return found;
  };

  var makeAges = function (device) {

    if (device._on === true) {
      device.age = new Date() - new Date(device.last_on);
    } else {
      device.age = new Date() - new Date(device.last_off);
    }

    if (!isNaN(device.age)) {
      device.age = device.age / 1000;
    } else {
      device.age = 0;
    }

    return device;
  };

  var setDevice = function (device, source) {

    source = source || 'local';

    if (device._on === true) {
      device.age = new Date() - new Date(device.last_on);
    } else {
      device.age = new Date() - new Date(device.last_off);
    }

    if (!isNaN(device.age)) {
      device.age = device.age / 1000;
    } else {
      device.age = 0;
    }

    if (!devices[source]) { devices[source] = {}; }
    if (!devices[source][device._id]) {
      devices[source][device._id] = {};
    }

    Object.keys(device).forEach(function (key) {
      devices[source][device._id][key] = device[key];
    });

    return devices[source][device._id];

  };

  var getDevice = function (device, source, force) {
    var defer = $q.defer();
    var req_timeout;
    var source_uri = (source === undefined) ? '/api' : '/api/sources/' + source;

    var config = {
      'method': 'GET',
      'url': source_uri + '/devices/' + device,
      'timeout': 9000
    };

    model.get({'source': source, 'id': device}).$promise.then(function (result) {
      result.source = source;
      source = source || 'local';
      $timeout.cancel(req_timeout);

      result.$open = function () {
        return openDevice(device, source);
      };

      setDevice(result, source );

      defer.resolve(devices[source][result._id]);
    }, function (err) {
      $timeout.cancel(req_timeout);
      defer.reject(err);
    });

    req_timeout = $timeout(function () {
      defer.reject('Request timed out');
    }, 10000);

    return defer.promise;
  };

  var load = function (source) {
    var defer = $q.defer();

    model.query({'source': source}).$promise.then(function (results) {
      var devs = [];
      results.forEach(function (device) {
        devs.push(setDevice(device, source));
      });

      defer.resolve(devs);
    }, function (err) {
      defer.reject(err);
    });
    return defer.promise;
  };

  var openCamera = function (device, source) {
    return $uibModal.open({
      animation: true,
      templateUrl: 'modules/devices/views/devices.camera.html',
      size: 'lg',
      controller: function ($scope, $uibModalInstance) {
        var source_uri = (source === undefined) ? '/api' : '/api/sources/' + source;

        $scope.device = device;

        $scope.ok = function () {
          $uibModalInstance.close($scope.device);
        };

        if (device.config.video_url) {
          $scope.camera_url = abode.url(source_uri + '/devices/' + device._id + '/video?client_token=' + abode.config.auth.token.client_token + '&auth_token=' + abode.config.auth.token.auth_token).value();
        } else {
          $scope.camera_url = abode.url(source_uri + '/devices/' + device._id + '/image?client_token=' + abode.config.auth.token.client_token + '&auth_token=' + abode.config.auth.token.auth_token).value();
        }
      }
    });
  };

  var openDevice =function (device, source) {

    return $uibModal.open({
      animation: false,
      templateUrl: 'modules/devices/views/devices.view.html',
      size: 'sm',
      controller: function ($scope, $uibModalInstance, $interval, $timeout, $state, device, source) {
        var intervals = [];
        var reload_interval;
        var temp_wait, level_wait;
        var source_uri = (source === undefined) ? '/api' : '/api/sources/' + source;

        var success_splay = 1000 * 60 * Math.floor((Math.random() * 5) + 5);
        var error_splay = 1000 * Math.floor((Math.random() * 5) + 1);

        $scope.image_url = device.$image_url();
        $scope.device = device;
        $scope.processing = false;
        $scope.errors = false;
        $scope.source = source;
        $scope.capabilities = angular.copy(device.capabilities).map(function (c) {
          return {
            'name': c,
            'view': 'modules/devices/views/capabilities/' + c + '.html'
          };

        });

        //If we get an EVENTS_RESET event, schedule a refresh
        var feed_detector = abode.scope.$on('EVENTS_RESET', function (event, msg) {
          $scope.loader = $timeout($scope.reload, error_splay);
        });

        var event_handler = abode.scope.$on('ABODE_EVENT', function (event, msg) {

          if (!$scope.device) {
            return;
          }

          if (reload_interval) {
            $timeout.cancel(reload_interval);
          }

          if (msg.type === 'device' && $scope.device.name === msg.name) {

            if (msg.event === 'UPDATED') {

              for (var key in msg.object) {
                if (msg.object.hasOwnProperty(key) && key[0] === '_') {
                  $scope.device[key] = msg.object[key];
                }
              }
            }

            reload_interval = $interval($scope.reload, success_splay);
            $scope.$digest();
          }
        });

        $scope.edit = function () {
          $uibModalInstance.close({'recurse': true});
          $state.go('main.devices.edit', {'name': device.name});
        };

        $scope.sensors = $scope.capabilities.filter(function (c) {

          return (c.name.indexOf('_sensor') > -1);

        });

        $scope.controls = $scope.capabilities.filter(function (c) {

          return (c.name.indexOf('_sensor') === -1);

        });

        $scope.openVideo = function (device) {
          openCamera(device, source);
        };

        $scope.has_capability = function (capability) {
          var match = $scope.capabilities.filter(function (c) {

            return (c.name === capability);

          });

          return (match.length > 0);
        };

        $scope.name = device.name;

        $scope.reload = function (force) {

          if ($scope.processing || temp_wait || level_wait) {
            return;
          }

          $scope.processing = true;
          $scope.errors = false;

          $scope.device.$refresh(force).then(function (result) {
            $scope.processing = false;
            $scope.errors = false;
          }, function () {
            $scope.processing = false;
            $scope.errors = true;
          });

        };

        $scope.ok = function () {
          $uibModalInstance.close($scope.device);
        };

        $scope.display_unlock = function () {

          $scope.processing = true;
          $scope.errors = false;

          $scope.device.$unlock().then(function () {
            $scope.device.locked = false;
            $scope.processing = false;
            $scope.errors = false;
          }, function (err) {
            console.log(err);
            $scope.processing = false;
            $scope.errors = true;
          });
        };

        $scope.display_lock = function () {

          $scope.processing = true;
          $scope.errors = false;

          $scope.device.$lock().then(function () {
            $scope.device.locked = true;
            $scope.processing = false;
            $scope.errors = false;
          }, function (err) {
            console.log(err);
            $scope.processing = false;
            $scope.errors = true;
          });
        };

        $scope.unlock = function () {

          $scope.processing = true;
          $scope.errors = false;

          $scope.device.$unlock().then(function () {
            $scope.processing = false;
            $scope.errors = false;
          }, function (err) {
            console.log(err);
            $scope.processing = false;
            $scope.errors = true;
          });
        };

        $scope.lock = function () {

          $scope.processing = true;
          $scope.errors = false;

          $scope.device.$lock().then(function () {
            $scope.processing = false;
            $scope.errors = false;
          }, function (err) {
            console.log(err);
            $scope.processing = false;
            $scope.errors = true;
          });
        };

        $scope.toggle_onoff = function () {

          $scope.processing = true;
          $scope.errors = false;

          $scope.device.$toggle().then(function () {
            $scope.processing = false;
            $scope.errors = false;
          }, function (err) {
            console.log(err);
            $scope.processing = false;
            $scope.errors = true;
          });
        };

        $scope.beep = function (count) {

          $scope.processing = true;
          $scope.errors = false;

          $scope.device.$beep().then(function () {
            $scope.processing = false;
            $scope.errors = false;
          }, function (err) {
            console.log(err);
            $scope.processing = false;
            $scope.errors = true;
          });
        };

        $scope.on = function () {

          $scope.processing = true;
          $scope.errors = false;

          $scope.device.$on().then(function () {
            $scope.processing = false;
            $scope.errors = false;
          }, function (err) {
            console.log(err);
            $scope.processing = false;
            $scope.errors = true;
          });
        };

        $scope.off = function () {

          $scope.processing = true;
          $scope.errors = false;

          $scope.device.$off().then(function () {
            $scope.processing = false;
            $scope.errors = false;
          }, function (err) {
            console.log(err);
            $scope.processing = false;
            $scope.errors = true;
          });
        };

        $scope.toggle_motion = function () {

          $scope.processing = true;
          $scope.errors = false;

          $scope.device.$toggle_motion().then(function () {
            $scope.processing = false;
            $scope.errors = false;
          }, function (err) {
            console.log(err);
            $scope.processing = false;
            $scope.errors = true;
          });
        };

        $scope.set_mode = function (mode) {

          $scope.processing = true;
          $scope.errors = false;

          $scope.device.$set_mode(mode).then(function () {
            $scope.processing = false;
            $scope.errors = false;
          }, function (err) {
            console.log(err);
            $scope.processing = false;
            $scope.errors = true;
          });
        };


        $scope.temp_up = function () {
          $scope.processing = true;
          $scope.errors = false;
          if (temp_wait) {
            $timeout.cancel(temp_wait);
          }
          $scope.device._set_point += 1;

          temp_wait = $timeout($scope.set_temp, 2000);
        };

        $scope.temp_down = function () {
          $scope.processing = true;
          $scope.errors = false;
          if (temp_wait) {
            $timeout.cancel(temp_wait);
          }
          $scope.device._set_point -= 1;

          temp_wait = $timeout($scope.set_temp, 2000);
        };

        $scope.set_temp = function () {

          $scope.processing = true;
          $scope.errors = false;

          $scope.device.$set_temp($scope.device._set_point).then(function () {
          //$http.post(source_uri + '/devices/' + $scope.device.name + '/set_point', [$scope.device._set_point]).then(function (response) {
            temp_wait = undefined;
            $scope.processing = false;
            $scope.errors = false;
          }, function () {
            temp_wait = undefined;
            $scope.processing = false;
            $scope.errors = true;
          });
        };

        $scope.level_up = function () {
          $scope.processing = true;
          $scope.errors = false;
          if (level_wait) {
            $timeout.cancel(level_wait);
          }
          if ($scope.device._level < 100){
            $scope.device._level += 1;
          }

          level_wait = $timeout($scope.set_level, 2000);
        };

        $scope.level_down = function () {
          $scope.processing = true;
          $scope.errors = false;
          if (level_wait) {
            $timeout.cancel(level_wait);
          }

          if ($scope.device._level > 0){
            $scope.device._level -= 1;
          }

          level_wait = $timeout($scope.set_level, 2000);
        };

        $scope.level_wait = function (id, value) {
          $scope.processing = true;
          $scope.errors = false;
          console.log('1');
          if (level_wait) {
            $timeout.cancel(level_wait);
          }

          level_wait = $timeout($scope.set_level, 2000);
        };

        $scope.set_level = function () {

          $scope.processing = true;
          $scope.errors = false;

          $scope.device.$set_level($scope.device._level).then(function () {
            level_wait = undefined;
            $scope.processing = false;
            $scope.errors = false;
          }, function () {
            level_wait = undefined;
            $scope.processing = false;
            $scope.errors = true;
          });
        };

        reload_interval = $interval($scope.reload, success_splay);

        $scope.$on('$destroy', function () {
          $interval.cancel(reload_interval);
          intervals.forEach($interval.cancel);
          event_handler();
          feed_detector();
        });
      },
      resolve: {
        device: function (Devices) {
          if (typeof device === 'object') {
            return Devices.get({'id': device._id}).$promise;
          } else {
            return Devices.get({'id': device}).$promise;
          }
        },
        source: function () {
          return source;
        },
      }
    });

  };

  var addDevice = function (config) {
    var defer = $q.defer();

    $http.post('/api/devices', config).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var saveDevice = function (device) {
    var defer = $q.defer();

    $http.put('/api/devices/' + device._id, device).then(function () {
      defer.resolve();
    }, function () {
      defer.reject();
    });

    return defer.promise;
  };

  var removeDevice = function (device) {
    var defer = $q.defer();

    $http.delete('/api/devices/' + device).then(function () {
      defer.resolve();
    }, function () {
      defer.reject();
    });

    return defer.promise;
  };

  var getDeviceRooms = function (device) {
    var defer = $q.defer();

    $http({ url: '/api/devices/' + device + '/rooms'}).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var addDeviceRoom = function (device, room) {
    var defer = $q.defer();

    $http.post('/api/devices/' + device + '/rooms', {'name': room}).then(function () {
      defer.resolve();
    }, function () {
      defer.reject();
    });

    return defer.promise;
  };

  var removeDeviceRoom = function (device, room) {
    var defer = $q.defer();

    $http.delete('/api/devices/' + device + '/rooms/' + room).then(function () {
      defer.resolve();
    }, function () {
      defer.reject();
    });

    return defer.promise;
  };

  return {
    'load': load,
    'set': setDevice,
    'add': addDevice,
    'view': openDevice,
    'get': getDevice,
    'save': saveDevice,
    'remove': removeDevice,
    'getRooms': getDeviceRooms,
    'addRoom': addDeviceRoom,
    'removeRoom': removeDeviceRoom,
    'openDevice': openDevice,
    'openCamera': openCamera,
    'methods': methods,
  };
});
