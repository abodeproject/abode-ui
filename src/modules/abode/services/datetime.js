
var abode = angular.module('abode');

abode.service('datetime', function ($interval, $http, $state) {

  var obj = {is: {}};
  var updater;

  var parseDetails = function (response) {
    obj.time = response.data.time;
    obj.is = response.data.is;
  };

  var getDetails = function () {
    if ($state.current.name !== 'index.home') {
      $interval.cancel(updater);
      return;
    }
    $http({ url: '/api/time' }).then(parseDetails);
  };

  var updateTime = function () {
    obj.date = new Date();
  };

  updateTime();
  getDetails();

  $interval(updateTime, 200);
  updater = $interval(getDetails, 1000 * 60);

  return {
    get: function () {
      return obj;
    }
  };
});
