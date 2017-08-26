
var rooms = angular.module('abode.rooms');

rooms.directive('roomListItem', function () {
  return {
    'restrict': 'E',
    'require': 'ngModel',
    'replace': true,
    'templateUrl': 'modules/rooms/views/room_list_item.html',
    'scope': {
      'ngModel': '=',
      'showControls': '@?'
    },
    'controller': function () {

    }
  }
});
