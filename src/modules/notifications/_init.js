var notifications = angular.module('abode.notifications', ['ngResource']);

notifications.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/notifications', '/notifications/list');

  $stateProvider
  .state('main.notifications', {
    url: '/notifications',
    templateUrl: 'modules/notifications/views/notifications.html',
  })
  .state('main.notifications.list', {
    url: '/list',
    templateUrl: 'modules/notifications/views/notifications.list.html',
    controller: 'notificationsList'
  })
  .state('main.notifications.add', {
    url: '/add',
    templateUrl: 'modules/notifications/views/notifications.add.html',
    controller: 'notificationsAdd'
  })
  .state('main.notifications.edit', {
    url: '/:id',
    templateUrl: 'modules/notifications/views/notifications.edit.html',
    controller: 'notificationsEdit',
    resolve: {
      'notification': ['$stateParams', '$state', 'Notifications', function ($stateParams, $state, Notifications) {

        return Notifications.get({'id': $stateParams.id}).$promise;

      }]
    }
  });
});
