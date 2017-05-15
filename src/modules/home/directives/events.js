
var home = angular.module('abode.home');

home.directive('events', [function () {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      'show': '=',
      'excludeEvents': '=',
      'excludeNames': '=',
      'excludeTags': '=',
      'excludeTypes': '='
    },
    templateUrl: 'modules/home/views/events.html',
    controller: ['$scope', 'abode', 'EventCache', function ($scope, abode, EventCache) {
      $scope.show = $scope.show || 100;
      $scope.exclude_events = (Array.isArray($scope.excludeEvents)) ? $scope.excludeEvents : [];
      $scope.exclude_names = (Array.isArray($scope.excludeBames)) ? $scope.excludeNames : [];
      $scope.exclude_tags = (Array.isArray($scope.excludeTags)) ? $scope.excludeTags : [];
      $scope.exclude_types = (Array.isArray($scope.excludeTypes)) ? $scope.excludeTypes : [];

      $scope.events = [];
      var event_details= {
        'UNKNOWN': {'icon': 'icon-question-sign', 'message': '', 'key': ''},
        'HEARTBEAT': {'icon': 'icon-heart', 'message': 'Abode Heartbeat', 'key': '', 'name': false},
        'TIME_CHANGE': {'icon': 'icon-time', 'message': 'Time Change', 'key': '', 'name': false},
        'DAY_CHANGE': {'icon': 'icon-calendarthree', 'message': 'Day Change', 'key': '', 'name': false},
        'SUNSET': {'icon': 'icon-sunset', 'message': 'Sunset', 'key': '', 'name': false},
        'SUNRISE': {'icon': 'icon-sunrise', 'message': 'Sunrise', 'key': '', 'name': false},
        'SOLAR_NOON': {'icon': 'icon-sun-day', 'message': 'Noon', 'key': '', 'name': false},
        'ON': {'icon': '', 'message': 'is now on', 'key': ''},
        'OFF': {'icon': '', 'message': 'is now off', 'key': ''},
        'OPEN': {'icon': '', 'message': 'is now open', 'key': ''},
        'CLOSE': {'icon': '', 'message': 'is now closed', 'key': ''},
        'LIGHTS_ON': {'icon': 'icon-lightbulb-idea', 'message': 'is now on', 'key': ''},
        'LIGHTS_OFF': {'icon': 'icon-lightbulb-idea', 'message': 'is now off', 'key': ''},
        'FANS_ON': {'icon': 'icon-fan', 'message': 'is now on', 'key': ''},
        'FANS_OFF': {'icon': 'icon-fan', 'message': 'is now off', 'key': ''},
        'APPLIANCES_ON': {'icon': '', 'message': 'is now on', 'key': ''},
        'APPLIANCES_OFF': {'icon': '', 'message': 'is now off', 'key': ''},
        'CONDITIONING_ON': {'icon': '', 'message': 'is now on ', 'key': '_mode'},
        'CONDITIONING_OFF': {'icon': '', 'message': 'is now off', 'key': ''},
        'WINDOWS_OPEN': {'icon': 'fi-window', 'message': 'is now open', 'key': ''},
        'WINDOWS_CLOSED': {'icon': 'fi-window', 'message': 'is now closed', 'key': ''},
        'DOORS_OPEN': {'icon': 'fi-door-closed', 'message': 'is now open', 'key': ''},
        'DOORS_CLOSED': {'icon': 'fi-door-closed', 'message': 'is now closed', 'key': ''},
        'SHADES_OPEN': {'icon': '', 'message': 'is now open', 'key': ''},
        'SHADES_CLOSED': {'icon': '', 'message': 'is now closed', 'key': ''},
        'MOTION_ON': {'icon': 'fi-motion', 'message': 'detected motion', 'key': ''},
        'MOTION_OFF': {'icon': 'fi-motion', 'message': 'no longer detects motion', 'key': ''},
        'TEMPERATURE_CHANGE': {'icon': 'wi wi-thermometer wi-fw', 'message': 'temperature is now', 'key': '_temperature', 'units': '°'},
        'TEMPERATURE_UP': {'icon': 'wi wi-thermometer wi-fw', 'message': 'temperature went up to', 'key': '_temperature', 'units': '°'},
        'TEMPERATURE_DOWN': {'icon': 'wi wi-thermometer wi-fw', 'message': 'temperature went down to', 'key': '_temperature', 'units': '°'},
        'HUMIDITY_CHANGE': {'icon': 'wi wi-humidity wi-fw', 'message': 'humidity is now', 'key': '_humidity', 'units': '%'},
        'HUMIDITY_UP': {'icon': 'wi wi-humidity wi-fw', 'message': 'humidity went up to', 'key': '_humidity', 'units': '%'},
        'HUMIDITY_DOWN': {'icon': 'wi wi-humidity wi-fw', 'message': 'humidity went down to', 'key': '_humidity', 'units': '%'},
        'LUMACITY_CHANGE': {'icon': 'wi wi-day-sunny wi-fw', 'message': 'lumens are now', 'key': '_lumens', 'units': '%'},
        'LUMACITY_UP': {'icon': 'wi wi-day-sunny wi-fw', 'message': 'lumens went up to', 'key': '_lumens', 'units': '%'},
        'LUMACITY_DOWN': {'icon': 'wi wi-day-sunny wi-fw', 'message': 'lumens went down to', 'key': '_lumens', 'units': '%'},
        'UPDATED': {'icon': 'icon-edit', 'message': ' has been updated', 'key': ''},
      };

      var excluded_tag = function (tags) {
        tags = tags || [];
        var has_tag = false;

        tags.forEach(function (tag) {
          has_tag = ($scope.exclude_tags.indexOf(tag) !== -1) ? true : has_tag;
        });

        return has_tag;
      };

      var process_event = function (msg) {
        var details = (event_details[msg.event]) ? event_details[msg.event] : event_details.UNKNOWN;

        msg.icon = details.icon;
        msg.message = details.message || msg.event;
        msg.value = (details.key && msg.object && msg.object[details.key]) ? msg.object[details.key] : '';
        msg.show_name = (details.name === false) ? false : true;
        msg.units = details.units;
        msg.object = msg.object || {};
        msg.object.tags = msg.object.tags || [];

        if ($scope.exclude_events.indexOf(msg.event) === -1 && $scope.exclude_names.indexOf(msg.event) === -1 && $scope.exclude_types.indexOf(msg.type) === -1 && excluded_tag(msg.object.tags) === false) {
          $scope.events.unshift(msg);

          if ($scope.events.length > $scope.show) {
            $scope.events.pop();
          }
        }
      };

      var start_listener = function () {

        abode.scope.$on('ABODE_EVENT', function (event, msg) {
          process_event(msg);
        });

      };

      var last_event = new Date();
      last_event = last_event.getTime() - (1000 * 60 * 30);

      EventCache.query({'last': last_event}).$promise.then(function (response) {
        response = response.map(function (record) { return record.event; });
        response.forEach(process_event);
        start_listener();
      }, function () {
        start_listener();
      });

    }]
  };
}]);
