var triggers = angular.module('abode.triggers');

triggers.directive('conditionSide', function ($uibModal, devices, rooms, scenes) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      'side': '@',
      'value': '=',
      'devices': '=',
      'rooms': '=',
      'scenes': '=',
      'pins': '=',
    },
    controller: function ($scope) {
      $scope.expanded = true;
      $scope.capabilities = [];
      $scope.type = $scope.value[$scope.side + '_type'];
      $scope.obj = $scope.value[$scope.side + '_object'];
      $scope.key = $scope.value[$scope.side + '_key'];
      $scope.watched = {};

      if ($scope.type === 'devices') {
        devices.get($scope.obj).then(function (result) {
          $scope.capabilities = result.capabilities;
        });
      } else if ($scope.type !== 'devices' && $scope.type !== 'scenes' && $scope.type !== 'rooms') {
        $scope.watched.key = $scope.key;
      }

      $scope.condition_types = [
        {name: 'Device', value: 'devices', icon: 'glyphicon glyphicon-oil'},
        {name: 'Room', value: 'rooms', icon: 'glyphicon glyphicon-modal-window', capabilities: ['room']},
        {name: 'Scene', value: 'scenes', icon: 'icon-picture', capabilities: ['onoff']},
        {name: 'Pin', value: 'pins', icon: 'icon-passwordalt', capabilities: ['enabledisable']},
        {name: 'Video', value: 'video', icon: 'icon-playvideo', capabilities: ['video']},
        {name: 'Display', value: 'display', icon: 'icon-monitor', capabilities: ['display']},
        {name: 'Time', value: 'timeofday', icon: 'icon-clockalt-timealt'},
        {name: 'Date/Time', value: 'time', icon: 'icon-calendar', capabilities: ['time']},
        {name: 'Time is...', value: 'time.is', icon: 'icon-calendarthree', capabilities: ['time.is']},
        {name: 'Boolean', value: 'boolean', icon: 'icon-moonfirstquarter'},
        {name: 'Number', value: 'number', icon: 'icon-counter'},
        {name: 'String', value: 'string', icon: 'icon-textcursor'},
        {name: 'Age', value: 'age', icon: 'icon-stopwatch'},
      ];

      $scope.condition_keys = [
        {name: 'Is On', value: 'is_on', arguments: [], capabilities: ['light', 'dimmer', 'display', 'fan', 'onoff']},
        {name: 'Is Off', value: 'is_off', arguments: [], capabilities: ['light', 'dimmer', 'display', 'fan', 'onoff']},
        {name: 'Is Enabled', value: 'is_enabled', arguments: [], capabilities: ['enabledisable']},
        {name: 'Is Disabled', value: 'is_disabled', arguments: [], capabilities: ['enabledisable']},
        {name: 'On Time', value: 'on_time', arguments: [], capabilities: ['light', 'dimmer', 'display', 'fan', 'onoff']},
        {name: 'Off Time', value: 'off_time', arguments: [], capabilities: ['light', 'dimmer', 'display', 'fan', 'onoff']},
        {name: 'Has Motion', value: '_motion', arguments: [], capabilities: ['motion_sensor']},
        {name: 'Motion On', value: '_motion_on', arguments: [], capabilities: ['room']},
        {name: 'Motion On Age', value: 'motion_on_age', arguments: [], capabilities: ['room', 'motion_sensor']},
        {name: 'Motion Off', value: '_motion_off', arguments: [], capabilities: ['room']},
        {name: 'Motion Off Age', value: 'motion_off_age', arguments: [], capabilities: ['room', 'motion_sensor']},
        {name: 'Lights On', value: 'lights_on', arguments: [], capabilities: ['room']},
        {name: 'Lights Off', value: 'lights_off', arguments: [], capabilities: ['room']},
        {name: 'Light On Age', value: 'light_on_age', arguments: [], capabilities: ['room']},
        {name: 'Light Off Age', value: 'light_off_age', arguments: [], capabilities: ['room']},
        {name: 'Windows Open', value: 'windows_open', arguments: [], capabilities: ['room']},
        {name: 'Windows Closed', value: 'windows_closed', arguments: [], capabilities: ['room']},
        {name: 'Windows Open Age', value: 'windows_open_age', arguments: [], capabilities: ['room']},
        {name: 'Windows Closed Age', value: 'windows_closed_age', arguments: [], capabilities: ['room']},
        {name: 'Doors Open', value: 'doors_open', arguments: [], capabilities: ['room']},
        {name: 'Doors Closed', value: 'doors_closed', arguments: [], capabilities: ['room']},
        {name: 'Doors Open Age', value: 'doors_open_age', arguments: [], capabilities: ['room']},
        {name: 'Doors Closed Age', value: 'doors_closed_age', arguments: [], capabilities: ['room']},
        {name: 'Is Locked', value: 'is_locked', arguments: [], capabilities: ['room', 'lock']},
        {name: 'Is Unlocked', value: 'is_unlocked', arguments: [], capabilities: ['room', 'lock']},
        {name: 'Locked Age', value: 'locked_age', arguments: [], capabilities: ['room', 'lock']},
        {name: 'Unlocked Age', value: 'unlocked_age', arguments: [], capabilities: ['room', 'lock']},
        {name: 'Heat On', value: 'mode_heat', arguments: [], capabilities: ['room']},
        {name: 'Cool On', value: 'mode_cool', arguments: [], capabilities: ['room']},
        {name: 'Open', value: '_on', arguments: [], capabilities: ['door', 'window']},
        {name: 'Level', value: '_level', arguments: ['level'], capabilities: ['dimmer']},
        {name: 'Mode', value: '_mode', arguments: ['mode'], capabilities: ['conditioner']},
        {name: 'Set Point', value: '_set_point', arguments: ['temperature'], capabilities: ['conditioner']},
        {name: 'Temperature', value: '_temperature', arguments: ['temperature'], capabilities: ['temperature_sensor']},
        {name: 'Humidity', value: '_humidity', arguments: ['temperature'], capabilities: ['humidity_sensor']},
        {name: 'Rain (last hour)', value: '_weather.rain_1hr', arguments: [], capabilities: ['weather']},
        {name: 'Rain (total)', value: '_weather.rain_total', arguments: [], capabilities: ['weather']},
        {name: 'Wind', value: '_weather.wind', arguments: [], capabilities: ['weather']},
        {name: 'Gusts', value: '_weather.gusts', arguments: [], capabilities: ['weather']},
        {name: 'Lumacity', value: '_lumens', arguments: ['temperature'], capabilities: ['light_sensor']},
        {name: 'Current Time', value: 'time', arguments: [], capabilities: ['time']},
        {name: 'Day of Week', value: 'day', arguments: [], capabilities: ['time']},
        {name: 'Time of Sunset', value: 'sunset', arguments: [], capabilities: ['time']},
        {name: 'Time of Sunrise', value: 'sunrise', arguments: [], capabilities: ['time']},
        {name: 'Time of Noon', value: 'solar_noon', arguments: [], capabilities: ['time']},
        {name: 'Sun Altitude', value: 'sun_altitude', arguments: [], capabilities: ['time']},
        {name: 'Sun Azimuth', value: 'sun_azimuth', arguments: [], capabilities: ['time']},
        {name: 'Moon Altitude', value: 'moon_altitude', arguments: [], capabilities: ['time']},
        {name: 'Moon Azimuth', value: 'moon_azimuth', arguments: [], capabilities: ['time']},
        {name: 'Moon Phase', value: 'moon_phase', arguments: [], capabilities: ['time']},
        {name: 'Sunday', value: 'sunday', arguments: [], capabilities: ['time.is']},
        {name: 'Monday', value: 'monday', arguments: [], capabilities: ['time.is']},
        {name: 'Tuesday', value: 'tuesday', arguments: [], capabilities: ['time.is']},
        {name: 'Wednesday', value: 'wednesday', arguments: [], capabilities: ['time.is']},
        {name: 'Thursday', value: 'thursday', arguments: [], capabilities: ['time.is']},
        {name: 'Friday', value: 'friday', arguments: [], capabilities: ['time.is']},
        {name: 'Saturday', value: 'saturday', arguments: [], capabilities: ['time.is']},
        {name: 'Day', value: 'day', arguments: [], capabilities: ['time.is']},
        {name: 'Night', value: 'night', arguments: [], capabilities: ['time.is']},
        {name: 'Today High', value: '_forecast.0.temp_high', arguments: [], capabilities: ['weather']},
        {name: 'Today Low', value: '_forecast.0.temp_low', arguments: [], capabilities: ['weather']},
        {name: 'Today Rain', value: '_forecast.0.rain', arguments: [], capabilities: ['weather']},
        {name: 'Today Snow', value: '_forecast.0.snow', arguments: [], capabilities: ['weather']},
        {name: 'Tomorrow High', value: '_forecast.1.temp_high', arguments: [], capabilities: ['weather']},
        {name: 'Tomorrow Low', value: '_forecast.1.temp_low', arguments: [], capabilities: ['weather']},
        {name: 'Tomorrow Rain', value: '_forecast.1.rain', arguments: [], capabilities: ['weather']},
        {name: 'Tomorrow Snow', value: '_forecast.1.snow', arguments: [], capabilities: ['weather']},
        {name: 'Day After High', value: '_forecast.2.temp_high', arguments: [], capabilities: ['weather']},
        {name: 'Day After Low', value: '_forecast.2.temp_low', arguments: [], capabilities: ['weather']},
        {name: 'Day After Rain', value: '_forecast.2.rain', arguments: [], capabilities: ['weather']},
        {name: 'Day After Snow', value: '_forecast.2.snow', arguments: [], capabilities: ['weather']},
      ];


      if ($scope.type !== 'devices') {
        $scope.condition_types.forEach(function (t) {
          if (t.value === $scope.type) {
            $scope.capabilities = t.capabilities;
          }
        });
      }

      $scope.$watch('watched', function (value) {
        if ($scope.obj) {
          return;
        }
        if ($scope.value[$scope.side + '_key'] !== value.key) {
          $scope.value[$scope.side + '_key'] = value.key;
        }
      }, true);

      $scope.toggle = function () {
        $scope.expanded = ($scope.expanded) ? false : true;
      };

      $scope.changeType = function (t) {
        $scope.capabilities = t.capabilities || [];
        $scope.value[$scope.side + '_type'] = t.value;
        $scope.value[$scope.side + '_object'] = undefined;
        $scope.value[$scope.side + '_key'] = undefined;
        $scope.watched.key = undefined;

        $scope.type = $scope.value[$scope.side + '_type'];
        $scope.obj = $scope.value[$scope.side + '_object'];
        $scope.key = $scope.value[$scope.side + '_key'];
      };
      $scope.changeItem = function (i) {
        if (i.capabilities) {
          $scope.capabilities = i.capabilities;
        }
        $scope.value[$scope.side + '_object'] = i.name;
        $scope.value[$scope.side + '_key'] = undefined;
        $scope.watched.key = undefined;

        $scope.obj = $scope.value[$scope.side + '_object'];
        $scope.key = $scope.value[$scope.side + '_key'];
      };
      $scope.changeKey = function (k) {
        $scope.value[$scope.side + '_key'] = k.value;
        $scope.watched.key = undefined;

        $scope.key = $scope.value[$scope.side + '_key'];
      };

      $scope.hasCapability = function (c) {
        var has = false;

        $scope.capabilities.forEach(function (capability) {
          if (c.indexOf(capability) !== -1) {
            has = true;
          }
        });

        return has;
      };
    },
    templateUrl: 'modules/triggers/views/conditions.side.html',
    replace: true,
  };
});
