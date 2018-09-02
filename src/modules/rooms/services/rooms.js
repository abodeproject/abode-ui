
var rooms = angular.module('abode.rooms');

rooms.service('rooms', function ($http, $q, $uibModal, $resource, $rootScope, $timeout, abode, RoomScenes, RoomDevices, devices) {
  var rooms = {};

  $rootScope.$on('ROOM_CHANGE', function (event, args) {

    args.source = args.source || 'local';
    rooms[args.source] = rooms[args.source] || {};
    rooms[args.source][args.object._id] = args.object;
    rooms[args.source][args.object._id].$updated = new Date();
    //console.log('Room event from %s: %s', args.source, args);

  });

  var loadRooms = function (source) {
    var defer = $q.defer();
    var req_timeout;

    Rooms.query({'source': source}).$promise.then(function (results) {
      $timeout.cancel(req_timeout);
      defer.resolve(results);
    }, function (err) {
      $timeout.cancel(req_timeout);
      defer.reject(err);
    });

    req_timeout = $timeout(function () {
      defer.reject('Request timed out');
    }, 10000);

    return defer.promise;
  };

  var addRoom = function (config) {
    var defer = $q.defer();
    var room = new Rooms(config);

    room.$save().then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var get_by_name = function (name, source) {
    var found;

    source = source || 'local';

    if (!rooms[source]) {
      return;
    }

    if (rooms[source][name]) {
      return rooms[source][name];
    }

    Object.keys(rooms[source]).forEach(function (id) {
      if (rooms[source][id].name === name) {
        found = rooms[source][id];
      }
    });

    return found;
  };

  var getRoom = function (room, source) {
    var defer = $q.defer();
    var req_timeout;

    source = source || 'local';

    var lookup = get_by_name(room, source);
    var now = new Date();

    if (lookup) {

      if ( ((now - lookup.$updated) < 1000 * 60) ) {
        defer.resolve(lookup);
        return defer.promise;
      }
    }

    Room.get({'id': room}).$promise.then(function (response) {
      $timeout.cancel(req_timeout);
      rooms[source] = rooms[source] || {};
      rooms[source][response.data._id] = response.data;
      rooms[source][response.data._id].$updated = new Date();

      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    req_timeout = $timeout(function () {
      defer.reject('Request timed out');
    }, 25000);

    return defer.promise;
  };

  var getRoomScenes = function (room, source) {
    var defer = $q.defer();

    RoomScenes.query({'room': room, 'source': source}).$promise.then(function (results) {

      results.forEach(function (scene) {
        if (scene._on === true) {
          scene.age = new Date() - new Date(scene.last_on);
        } else {
          scene.age = new Date() - new Date(scene.last_off);
        }

        if (!isNaN(scene.age)) {
          scene.age = scene.age / 1000;
        } else {
          scene.age = 0;
        }
      });

      defer.resolve(results);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var getRoomDevices = function (room, source) {
    var defer = $q.defer();

    RoomDevices.query({'room': room, 'source': source}).$promise.then(function (results) {
      var devs = [];

      results.forEach(function (device) {

        devs.push(devices.set(device));

      });

      defer.resolve(results);

    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var viewRoom = function (room, devices, scenes, controls, options) {

    return $uibModal.open({
      animation: false,
      templateUrl: 'modules/rooms/views/rooms.view.html',
      size: 'lg',
      controller: function ($scope, $rootScope, $uibModalInstance, $interval, $timeout, $state, rooms, room, devices, scenes) {
        var intervals = [];
        var reload_timer;

        var state_listener = $rootScope.$on('$stateChangeStart', function () {
          $scope.ok();
        });

        $scope.name = room.name;
        $scope.room = room;
        $scope.devices = devices;
        $scope.scenes = scenes;
        $scope.cameras = [];
        $scope.open = devices.openDevice;
        $scope.filter_counts = {};
        $scope.on_counts = {};
        $scope.room_temperature = '?';
        $scope.destroyed = false;
        $scope.controls = controls || false;

        $scope.doors = $scope.devices.filter(function (device) {
          return (device.$is('door'));
        });

        $scope.locks = $scope.devices.filter(function (device) {
          return (device.$is('lock'));
        });

        var filters = {
          'light': ['light', 'scene'],
          'motion_sensor': ['motion_sensor'],
          'window': ['window'],
          'door': ['door'],
          'temperature_sensor': ['conditioner', 'temperature_sensor', 'fan', 'humidity_sensor'],
          'shade': ['shade'],
          'scenes': ['scene'],
        };
        $scope.set_device_level = function (device) {
          return function (id, level) {
            device.$set_level(level);
          };
        };

        $scope.toggleControls = function () {
          $scope.controls = (!$scope.controls);

          if ($scope.controls) {
            $timeout(function () {
                $scope.$broadcast('rzSliderForceRender');
            }, 100);
          }
        };

        $scope.filter = function (filter) {
          $scope.filter_condition = (filter !== $scope.filter_condition) ? filter : '';
        };

        $scope.check_filter = function (device) {

          if ($scope.filter_condition === '' || $scope.filter_condition === undefined) {
            return true;
          }

          return $scope.has_capability(device, filters[$scope.filter_condition]);
        };

        $scope.devices_on = function (c) {
          var devs = $scope.devices.filter(function (d) {
            return (d._on === true && d.capabilities.indexOf(c) !== 0);
          });

          return (devs.length > 0);
        };

        $scope.openScene = function (scene) {
          var modal = scene.$view();
          modal.result.then(function(config) {
            if (config && config.recurse) {
              $uibModalInstance.close(config);
            }
          });
        };

        $scope.open = function (device) {
          var modal = device.$open();
          modal.result.then(function(config) {
            if (config && config.recurse) {
              $uibModalInstance.close(config);
            }
          });
        };

        $scope.ok = function () {
          $uibModalInstance.close();
        };

        $scope.edit = function () {
          $uibModalInstance.close({'recurse': true});
          $state.go('main.rooms.edit', {'name': room.name});
        };


        $scope.default_filter = function () {

          var temp = 0;
          var temp_count = 0;

          var temps = $scope.devices.filter(function (d) {
            if (d.capabilities.indexOf('temperature_sensor') !== -1) {
              if (d._temperature > 0) {
                temp += d._temperature ;
                temp_count += 1;
              }
              return true;
            }
            return false;
          });

          $scope.cameras = $scope.devices.filter( function (d) { return d.capabilities.indexOf('camera') !== -1; } );

          $scope.room_temperature = parseInt(temp / temp_count, 10) || ' ';

          Object.keys(filters).forEach(function (f) {


            var match = $scope.devices.filter(function (d) {
              return $scope.has_capability(d, filters[f]);
            });

            $scope.filter_counts[f] = match.length;
            $scope.on_counts[f] = match.filter( function (d) {
              return (d.capabilities.indexOf('motion_sensor') === -1 && d._on) || (d.capabilities.indexOf('motion_sensor') > -1 && d._motion);
            }).length;

            if ($scope.filter_condition !== undefined) return;

            if (match.length > 0) {
              $scope.filter_condition = f;
            }
          });

          if ($scope.filter_condition !== undefined) return;
          if ($scope.scenes.length > 0) {
            $scope.filter_condition = 'scenes';
          }
        };

        $scope.reload = function () {

          var errors = false;
          if ($scope.controls) {
            return;
          }

          $scope.processing = true;
          $scope.errors = false;

          $timeout.cancel(reload_timer);

          var done = function () {
            $scope.errors = errors;
            $scope.processing = false;

            if ($scope.destroyed) {
              return;
            }
            reload_timer = $timeout($scope.reload, 5000);
          };

          var room_scenes = function () {
            $scope.room.$scenes().$promise.then(function (scenes) {

              scenes.forEach(function (scene) {
                var match = $scope.scenes.filter(function (item) {
                  return (scene._id === item._id);
                });

                if (match.length > 0) {
                  angular.merge(match[0], scene);
                } else {
                  $scope.scenes.push(scene);
                }
              });

              //$scope.scenes = scenes;
              $scope.filter_counts.scenes = $scope.scenes.length;
              $scope.on_counts.scenes = $scope.scenes.filter(function (d) { return d._on; });

              done();
            }, function () {
              errors = true;
              done();
            });
          };

          var room_devices = function () {

            $scope.room.$devices().$promise.then(function (devices) {

              devices.forEach(function (device) {
                var match = $scope.devices.filter(function (item) {
                  return (device._id === item._id);
                });

                if (match.length > 0) {
                  angular.merge(match[0], device);
                } else {
                  $scope.devices.push(device);
                }
              });
              //$scope.devices = devices;
              $scope.default_filter();

              room_scenes();

            }, function () {
              errors = true;
              room_scenes();
            });

          };

          $scope.room.$refresh().then(function (room) {

            room_devices();
          }, function () {
            errors = true;
            done();
          });


        };

        $scope.has_capability = function (device, cap) {
          var has = false;
          if (!(cap instanceof Array)) {
            cap = [cap];
          }

          cap.forEach(function (c) {
            has = (device.capabilities.indexOf(c) !== -1) ? true : has;
          });

          return has;
        };

        $scope.device_state = function (device, key, match, cap) {
          if (cap) {
            return (device[key] === match && $scope.has_capability(device, cap));
          } else {
            return (device[key] === match);
          }
        };

        $scope.default_filter();
        $scope.reload();

        $scope.$on('$destroy', function () {
          $scope.destroyed = true;
          $timeout.cancel(reload_timer);
          intervals.forEach($interval.cancel);
          state_listener();
        });
      },
      resolve: {
        room: function (Rooms) {
          if (typeof room === 'object') {
            return room;
          } else {
            return Rooms.get({'id': room});
          }
        },
        devices: function () {
          return devices || room.$devices().$promise;
        },
        scenes: function () {
          return scenes || room.$scenes().$promise;
        }
      },
    });

  };

  var addRoomDevice = function (room, device) {
    var defer = $q.defer();

    roomdevice = new RoomDevices({'id': room, 'source': source, 'name': device}).then(function () {
      defer.resolve();
    }, function () {
      defer.reject();
    });

    return defer.promise;
  };

  var removeRoomDevice = function (room, device) {
    var defer = $q.defer();

    $http.delete('/api/rooms/' + room + '/devices/' + device).then(function () {
      defer.resolve();
    }, function () {
      defer.reject();
    });

    return defer.promise;
  };

  var saveRoom = function (room) {
    var defer = $q.defer();

    $http.put('/api/rooms/' + room._id, room).then(function () {
      defer.resolve();
    }, function () {
      defer.reject();
    });

    return defer.promise;
  };

  var removeRoom = function (room) {
    var defer = $q.defer();

    $http.delete('/api/rooms/' + room).then(function () {
      defer.resolve();
    }, function () {
      defer.reject();
    });

    return defer.promise;
  };

  return {
    'load': loadRooms,
    'add': addRoom,
    'view': viewRoom,
    'get': getRoom,
    'save': saveRoom,
    'remove': removeRoom,
    'getDevices': getRoomDevices,
    'addDevice': addRoomDevice,
    'removeDevice': removeRoomDevice,
  };
});
