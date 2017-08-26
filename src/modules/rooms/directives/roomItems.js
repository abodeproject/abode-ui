
var rooms = angular.module('abode.rooms');

rooms.directive('roomItems', function () {
  return {
    scope: {
      'room': '@',
      'rooms': '=?',
      'showImages': '@?',
    },
    restrict: 'E',
    replace: true,
    transclude: false,
    controller: 'roomItemsCtl',
    templateUrl: 'modules/rooms/views/room.items.html',
  };
});
