
var abode = angular.module('abode');

abode.directive('deviceStatus', function () {

  return {
    scope: {
    },
    restrict: 'E',
    replace: true,
    templateUrl: 'modules/abode/views/display_status.html',
    controller: ['$scope', '$timeout', '$http', '$uibModal', '$location', 'abode', 'Security', 'power', 'network', function ($scope, $timeout, $http, $uibModal, $location, abode, Security, power, network) {

      var timer;
      var changing = false;
      $scope.display = {};
      $scope.network = {};
      $scope.loading = true;
      $scope.error = false;
      $scope.popover = false;
      $scope.root = abode.scope;

      //This probably needs some work
      //If we get an CLIENT_UPDATED event, merge our client config
      var client_events = abode.scope.$on('CLIENT_UPDATED', function (event, msg) {
        if (msg.object._level !== undefined) {
          changing = true;
          $scope.display.brightness = msg.object._level;
          $scope.slider.level = msg.object._level;
          $timeout(function () {
            changing = false;
          }, 100);
        }
      });

      var set_brightness = function () {
        changing = true;
        $scope.slider.options.disabled = true;
        $http.post('/api/display/brightness/' + $scope.slider.level).then(function () {
          changing = false;
          $scope.slider.options.disabled = false;
        }, function (err) {
          $scope.slider.level = parseInt($scope.display.brightness, 10);
          $timeout(function () {
            $scope.slider.options.disabled = false;
            changing = false;
          }, 100);
        });
      };

      $scope.slider = {
        level: 0,
        options: {
          floor: 0,
          ceil: 100,
          hideLimitLabels: true
        }
      };

      $scope.network = function () {
        $scope.popover = false;
        console.log(network.open());
      };

      $scope.power = function () {
        $scope.popover = false;
        power.open();
      };

      $scope.lock = function () {
        $scope.popover = false;
        Security.lock();
      };

      $scope.load = function () {
        if ($location.host().indexOf('localhost') !== 0) {
          $scope.loading = false;
          $scope.device = false;
          return;
        }
        $scope.error = false;
        $scope.loading = true;

        var done = function () {
          $scope.loading = false;
        };

        var load_network = function () {

          $http.get('/api/network').then(function (result) {
            angular.merge($scope.network, result.data);
            done();
          }, function (err) {
            $scope.error = true;
            done();
          });

        };

        var load_display = function () {

          $http.get('/api/display').then(function (result) {
            $scope.device = true;
            angular.merge($scope.display, result.data);
            $scope.slider.level = $scope.display.brightness;
            load_network();
          }, function (err) {
            $scope.error = true;
            $scope.device = false;
            done();
          });

        };

        load_display();

      };

      $timeout($scope.load, 100);

      $scope.$watch('slider.level', function () {
        if (changing || $scope.display.max_brightness === undefined) {
          return;
        }
        if (parseInt($scope.display.brightness) !== parseInt($scope.slider.level)) {
          if (timer) {
            $timeout.cancel(timer);
          }
          timer = $timeout(set_brightness, 1000);
        }
      }, true);

    }]
  };

});
