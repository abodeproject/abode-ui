
var abode = angular.module('abode');

abode.directive('timeoffset', ['$compile', function () {
  return {
    restrict: 'E',
    replace: 'true',
    scope: {
      time: '=',
      disabled: '@'
    },
    templateUrl: 'modules/abode/views/timeoffset.html',
    link: function (scope) {
      scope.offset = '+';
      var timeWatch, hourWatch, minuteWatch;

      scope.$watch('disabled', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          if (newVal === 'true') {
            clearWatches();
          } else {
            scope.time = (!isNaN(scope.time)) ? scope.time : 0;
            scope.meridian = '-';

            splitTime();
          }
        }
      });

      var updateTime = function () {
        clearWatches();

        var h = 60 * 60 * parseInt('0' + scope.hours, 10);
        var m = 60 * parseInt('0' + scope.minutes);

        if (scope.offset === '-')
          scope.time = -1 * (h + m);
        else {
          scope.time = h + m;
        }

        makeWatches();
      };

      var splitTime = function () {
        clearWatches();

        scope.offset = (scope.time >= 0) ? '+' : '-';
        scope.hours =  Math.abs(parseInt(scope.time / 60 / 60));
        scope.minutes =  Math.abs(parseInt(scope.time % (60 * 60) / 60));

        if (scope.minutes < 10) {
          scope.minutes = '0' + scope.minutes;
        }
        if (scope.hours < 10) {
          scope.hours = '0' + scope.hours;
        }

        makeWatches();
      };

      scope.increaseHour = function () {
        scope.time = parseInt(scope.time + 3600);
      };

      scope.decreaseHour = function () {
        scope.time = parseInt(scope.time - 3600);
      };

      scope.increaseMinute = function () {
        scope.time = parseInt(scope.time + 60);
      };

      scope.decreaseMinute = function () {
        scope.time = parseInt(scope.time + -60);
      };
      var clearWatches = function () {
        if (timeWatch !== undefined) {
          timeWatch();
        }
        if (hourWatch !== undefined) {
          hourWatch();
        }
        if (minuteWatch !== undefined) {
          minuteWatch();
        }
      };

      var makeWatches = function () {
        hourWatch = scope.$watch('hours', function (newVal, oldVal) {
          if (newVal !== oldVal) {
            updateTime();
          }
        });

        minuteWatch = scope.$watch('minutes', function (newVal, oldVal) {
          if (newVal !== oldVal) {
            updateTime();
          }
        });

        timeWatch = scope.$watch('time', function (newVal, oldVal) {
          if (newVal !== oldVal) {
            splitTime();
          }
        });
      };

      scope.changeOffset = function () {
        scope.time = scope.time * -1;
      };

      if (scope.disabled === 'false') {
        scope.time = (!isNaN(scope.time)) ? scope.time : 0;

        splitTime();
      }

    }
  };
}]);
