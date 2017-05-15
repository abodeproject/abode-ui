
var abode = angular.module('abode');

abode.directive('epochduration', ['$compile', function () {
  return {
    restrict: 'E',
    replace: 'true',
    scope: {
      time: '='
    },
    template: '<div class="epochtime"><div class="epochtime-days"><button ng-click="increaseDay()"><i class="icon-pigpenv"></i></button><input type="text" ng-model="days"><button ng-click="decreaseDay()"><i class="icon-pigpens"></i></button></div><div class="epochtime-label">:</div><div class="epochtime-hours"><button ng-click="increaseHour()"><i class="icon-pigpenv"></i></button><input type="text" ng-model="hours"><button ng-click="decreaseHour()"><i class="icon-pigpens"></i></button></div><div class="epochtime-label">:</div><div class="epochtime-minutes"><button ng-click="increaseMinute()"><i class="icon-pigpenv"></i></button><input type="text" ng-model="minutes"><button ng-click="decreaseMinute()"><i class="icon-pigpens"></i></button></div></div>',
    link: function (scope) {
      scope.time = scope.time || 0;
      var dayWatch, timeWatch, hourWatch, minuteWatch, meridianWatch;

      var updateTime = function () {
        clearWatches();

        var d = 60 * 60 * 24 * scope.days;
        var h = 60 * 60 * scope.hours;
        var m = 60 * scope.minutes;

        scope.time = h + m + d;

        makeWatches();
      };

      var splitTime = function () {
        clearWatches();

        scope.time = scope.time || 0;
        scope.days =  parseInt(scope.time / (60 * 60 * 24));
        scope.hours =  parseInt(scope.time / 60 / 60);
        scope.minutes =  parseInt(scope.time % (60 * 60) / 60);

        makeWatches();
      };

      scope.increaseDay = function () {
        scope.days = parseInt(scope.days, 10);
        scope.days += 1;
      };

      scope.decreaseDay = function () {
        scope.days = parseInt(scope.days, 10);
        if (scope.days === 0) {
          scope.days = 0;
        } else {
          scope.days -= 1;
        }
      };

      scope.increaseHour = function () {
        scope.hours = parseInt(scope.hours, 10);
        if (scope.hours === 23) {
          scope.hours = 0;
          scope.increaseDay();
        } else {
          scope.hours += 1;
        }
      };

      scope.decreaseHour = function () {
        scope.hours = parseInt(scope.hours, 10);
        if (scope.hours === 0) {
          scope.hours = 23;
          scope.decreaseDay();
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
        if (dayWatch !== undefined) {
          dayWatch();
        }
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
        dayWatch = scope.$watch('days', function (newVal, oldVal) {
          if (newVal !== oldVal) {
            updateTime();
          }
        });

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
            console.log('time change', newVal, oldVal);
            splitTime();
          }
        });
      };

      scope.changeMeridian = function () {
        scope.meridian = (scope.meridian === 'PM') ? 'AM' : 'PM';
      };


      splitTime();
    }
  };
}]);
