
var abode = angular.module('abode');

abode.directive('epochtime', ['$compile', function () {
  return {
    restrict: 'E',
    replace: 'true',
    scope: {
      time: '=',
      disabled: '@'
    },
    template: '<div class="epochtime"><div class="epochtime-hours"><button ng-click="increaseHour()"><i class="icon-pigpenv"></i></button><input type="text" ng-model="hours"><button ng-click="decreaseHour()"><i class="icon-pigpens"></i></button></div><div class="epochtime-label">:</div><div class="epochtime-minutes"><button ng-click="increaseMinute()"><i class="icon-pigpenv"></i></button><input type="text" ng-model="minutes"><button ng-click="decreaseMinute()"><i class="icon-pigpens"></i></button></div><div class="epochtime-meridian"><button ng-click="changeMeridian()">{{meridian}}</button></div></div>',
    link: function (scope) {
      scope.meridian = 'AM';
      var timeWatch, hourWatch, minuteWatch, meridianWatch;

      scope.$watch('disabled', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          if (newVal === 'true') {
            clearWatches();
          } else {
            scope.time = (!isNaN(scope.time)) ? scope.time : 0;
            scope.meridian = 'AM';

            splitTime();
          }
        }
      });

      var updateTime = function () {
        clearWatches();

        var h = 60 * 60 * scope.hours;
        var m = 60 * scope.minutes;
        var o = (scope.meridian === 'PM' && scope.hours !== 12) ? (60 * 60 * 12) : 0;
        h = (scope.meridian === 'AM' && scope.hours === 12) ? 0 : h;

        scope.time = h + m + o;

        makeWatches();
      };

      var splitTime = function () {
        clearWatches();

        scope.hours =  parseInt(scope.time / 60 / 60);
        scope.minutes =  parseInt(scope.time % (60 * 60) / 60);
        scope.meridian = (scope.hours >= 12) ? 'PM' : 'AM';

        if (scope.meridian === 'PM') {
          scope.hours = scope.hours - 12 || 12;
        } else if (scope.meridian === 'AM') {
          scope.hours = scope.hours || 12;
        }

        makeWatches();
      };

      scope.increaseHour = function () {
        scope.hours = parseInt(scope.hours, 10);
        if (scope.hours === 11 && scope.meridian === 'AM') {
          scope.hours = 12;
          scope.meridian = 'PM';
        } else if (scope.hours === 11 && scope.meridian === 'PM') {
          scope.hours = 12;
          scope.meridian = 'AM';
        } else if (scope.hours === 12 && scope.meridian === 'PM') {
          scope.hours = 1;
          scope.meridian = 'PM';
        } else if (scope.hours === 12 && scope.meridian === 'AM') {
          scope.hours = 1;
          scope.meridian = 'AM';
        } else {
          scope.hours += 1;
        }
      };

      scope.decreaseHour = function () {
        scope.hours = parseInt(scope.hours, 10);
        if (scope.hours === 12 && scope.meridian === 'AM') {
          scope.hours = 11;
          scope.meridian = 'PM';
        } else if (scope.hours === 12 && scope.meridian === 'PM') {
          scope.hours =11;
          scope.meridian = 'AM';
        } else if (scope.hours === 1 && scope.meridian === 'AM') {
          scope.hours = 12;
          scope.meridian = 'AM';
        } else if (scope.hours === 1 && scope.meridian === 'PM') {
          scope.hours = 12;
          scope.meridian = 'PM';
        } else {
          scope.hours -= 1;
        }
      };

      scope.increaseMinute = function () {
        scope.minutes = parseInt(scope.minutes, 10);
        if (scope.minutes === 59) {
          scope.minutes = 0;
          scope.increaseHour();
        } else {
          scope.minutes += 1;
        }
      };

      scope.decreaseMinute = function () {
        scope.minutes = parseInt(scope.minutes, 10);
        if (scope.minutes === 0) {
          scope.minutes = 0;
          scope.decreaseHour();
        } else {
          scope.minutes -= 1;
        }
      };
      var clearWatches = function () {
        if (hourWatch !== undefined) {
          hourWatch();
        }
        if (minuteWatch !== undefined) {
          minuteWatch();
        }
        if (meridianWatch !== undefined) {
          meridianWatch();
        }
        if (timeWatch !== undefined) {
          timeWatch();
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

        meridianWatch = scope.$watch('meridian', function (newVal, oldVal) {
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

      scope.changeMeridian = function () {
        scope.meridian = (scope.meridian === 'PM') ? 'AM' : 'PM';
      };

      if (scope.disabled === 'false') {
        scope.time = (!isNaN(scope.time)) ? scope.time : 0;

        splitTime();
      }

    }
  };
}]);
