
var abode = angular.module('abode');

abode.directive('messages', function () {
  return {
    restrict: 'E',
    replace: true,
    scope: {
    },
    templateUrl: 'modules/abode/views/message.html',
    controller: ['$scope', 'abode', function ($scope, abode) {
      abode.message_scope($scope);
      $scope.messages = abode.messages;
    }]
  };
});
