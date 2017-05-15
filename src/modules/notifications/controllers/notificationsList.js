
var notifications = angular.module('abode.notifications');

notifications.controller('notificationsList', ['$scope', 'Notifications', function ($scope, Notifications) {

  $scope.notifications = Notifications.query();

  $scope.add = function () {

  };

}]);
