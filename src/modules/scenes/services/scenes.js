
var scenes = angular.module('abode.scenes');

scenes.service('scenes', function ($http, $q, $uibModal, $resource, abode, SceneRooms) {
  var model = $resource(abode.url('/api/scenes/:id/:action'), {id: '@_id'}, {
    'update': { method: 'PUT' },
    'on': { method: 'POST', params: {'action': 'on'}},
    'off': { method: 'POST', params: {'action': 'off'}}
  });

  var methods = {};

  methods.$rooms = function () {
    var self = this;
    return SceneRooms.query({'scene': self.name}).$promise;

  };

  methods.$get_history = function (range, key) {
    var req,
      self = this,
      defer = $q.defer(),
      url = abode.url('/api/history/scenes/' + self.name + '/' + range.start + '/' + range.end).value();
      
    $http.get(url).then(function (results) {
      var history = results.data.map(function (record) {
        return {
          'x': record.timestamp,
          'y': record[key]
        };
      });
      
      defer.resolve(history);
    }, function (err) {
      defer.reject(err);
    });
    
    return defer.promise;
  };

  methods.$refresh = function () {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/scenes/' + this._id).value();

    $http.get(url).then(function (response) {
      for (var key in response.data) {
        if (response.data.hasOwnProperty(key)) {
          self[key] = response.data[key];
        }
      }
      defer.resolve(self);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  methods.$toggle = function () {
    var self = this,
      action = 'off';

    if (self._state === 'stopped') {
      return self.$on();
    } else {
      return self.$off();
    }

  };

  methods.$on = function () {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/scenes/' + this._id + '/on').value();

    $http.post(url).then(function (response) {
      self._on = true;
      self._state = 'pending';
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  methods.$off = function () {
    var self = this,
      defer = $q.defer(),
      url = abode.url('/api/scenes/' + this._id + '/off').value();

    $http.post(url).then(function (response) {
      self._on = false;
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  methods.$open = function () {

  };

  methods.$addRoom = function (room) {
    var self = this,
      defer = $q.defer();

    $http.post(abode.url('/api/scenes/' + self.name + '/rooms').value(), {'name': room}).then(function () {
      defer.resolve();
    }, function () {
      defer.reject();
    });

    return defer.promise;
  };

  methods.$removeRoom = function (room) {
    var self = this,
      defer = $q.defer();

    $http.delete(abode.url('/api/scenes/' + self.name + '/rooms/' + room).value()).then(function () {
      defer.resolve();
    }, function () {
      defer.reject();
    });

    return defer.promise;
  };

  methods.$view = function () {
    return viewScene(this);
  };

  var loadScenes = function (source) {
    var defer = $q.defer();

    model.query({'source': source}).$promise.then(function (results) {
      defer.resolve(results);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var addScene = function (config) {
    var defer = $q.defer();

    $http.post('/api/scenes', config).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var getScene = function (scene, source) {
    var defer = $q.defer();
    var source_uri = (source === undefined) ? '/api' : '/api/sources/' + source;

    $http({ url: source_uri + '/scenes/' + scene }).then(function (response) {

      response.data.$on = function () {
        return $http.post(source_uri + '/scenes/' + scene + '/on');
      };
      response.data.$off = function () {
        return $http.post(source_uri + '/scenes/' + scene + '/off');
      };
      response.data.$open = function () {
        return viewScene(scene, source);
      };
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var getSceneRooms = function (scene) {
    var defer = $q.defer();

    $http({ url: '/api/scenes/' + scene + '/rooms'}).then(function (response) {

      defer.resolve(response.data);

    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var viewScene = function (scene, source) {

    return $uibModal.open({
      animation: true,
      templateUrl: 'modules/scenes/views/scenes.view.html',
      size: 'sm',
      controller: function ($scope, $uibModalInstance, $interval, $timeout, $state, scene) {
        var intervals = [];
        var source_uri = (source === undefined) ? '/api' : '/api/sources/' + source;

        $scope.name = scene.name;
        $scope.scene = scene;
        $scope.processing = false;
        $scope.errors = false;

        $scope.ok = function () {
          $uibModalInstance.close();
        };

        $scope.edit = function () {
          $uibModalInstance.close({'recurse': true});
          $state.go('main.scenes.edit', {'name': scene.name});
        };

        $scope.toggle_onoff = function () {

          $scope.scene.$toggle().then(function() {
            $scope.processing = false;
            $scope.errors = false;
            $scope.scene._state = 'pending';

          }, function () {
            $scope.processing = false;
            $scope.errors = true;
          });

        };

        $scope.reload = function () {
          if ($scope.processing) {
            return;
          }

          $scope.processing = true;
          $scope.errors = false;

          $scope.scene.$refresh().then(function(response) {
            $scope.processing = false;
            $scope.errors = false;

          }, function () {
            $scope.processing = false;
            $scope.errors = true;
          });

        };

        $scope.reload();

        intervals.push($interval($scope.reload, 5000));

        $scope.$on('$destroy', function () {
          intervals.forEach($interval.cancel);
        });
      },
      resolve: {
        scene: function (Scenes) {
          if (typeof scene === 'object') {
            return Scenes.get({'id': scene._id}).$promise;
          } else {
            return Scenes.get({'id': scene}).$promise;
          }
        },
        source: function () {
          return source;
        },
      }
    });

  };

  var addSceneRoom = function (scene, room) {
    var defer = $q.defer();

    $http.post('/api/scenes/' + scene + '/rooms', {'name': room}).then(function () {
      defer.resolve();
    }, function () {
      defer.reject();
    });

    return defer.promise;
  };

  var removeSceneRoom = function (scene, room) {
    var defer = $q.defer();

    $http.delete('/api/scenes/' + scene + '/rooms/' + room).then(function () {
      defer.resolve();
    }, function () {
      defer.reject();
    });

    return defer.promise;
  };

  var saveScene = function (scene) {
    var defer = $q.defer();

    $http.put('/api/scenes/' + scene._id, scene).then(function () {
      defer.resolve();
    }, function () {
      defer.reject();
    });

    return defer.promise;
  };

  var removeScene = function (scene) {
    var defer = $q.defer();

    $http.delete('/api/scenes/' + scene).then(function () {
      defer.resolve();
    }, function () {
      defer.reject();
    });

    return defer.promise;
  };

  return {
    'load': loadScenes,
    'add': addScene,
    'view': viewScene,
    'get': getScene,
    'save': saveScene,
    'remove': removeScene,
    'getRooms': getSceneRooms,
    'addRoom': addSceneRoom,
    'removeRoom': removeSceneRoom,
    'methods': methods
  };
});
