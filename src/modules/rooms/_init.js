var rooms = angular.module('abode.rooms', ['ui.router','ngResource']);

rooms.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/rooms', '/rooms/list');

  $stateProvider
  .state('main.rooms', {
    url: '/rooms',
    templateUrl: 'modules/rooms/views/rooms.html',
  })
  .state('main.rooms.list', {
    url: '/list',
    templateUrl: 'modules/rooms/views/rooms.list.html',
    controller: 'roomsList'
  })
  .state('main.rooms.add', {
    url: '/add',
    templateUrl: 'modules/rooms/views/rooms.add.html',
    controller: 'roomsAdd'
  })
  .state('main.rooms.edit', {
    url: '/:name',
    templateUrl: 'modules/rooms/views/rooms.edit.html',
    controller: 'roomsEdit',
    resolve: {
      'room': function ($stateParams, $state, Rooms) {

        return Rooms.get({'id': $stateParams.name}).$promise;

      }
    }
  });
});
