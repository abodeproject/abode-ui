var triggers = angular.module('abode.triggers', ['ui.router','ngResource']);

triggers.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('/triggers', '/triggers/list');

  $stateProvider
  .state('main.triggers', {
    url: '/triggers',
    templateUrl: 'modules/triggers/views/triggers.html',
  })
  .state('main.triggers.list', {
    url: '/list',
    templateUrl: 'modules/triggers/views/triggers.list.html',
    controller: 'triggersList'
  })
  .state('main.triggers.add', {
    url: '/add',
    templateUrl: 'modules/triggers/views/triggers.add.html',
    controller: 'triggersEdit',
    resolve: {
      'trigger': function (Triggers) {

        return new Triggers({'enabled': true, 'conditions': [], 'actions': [], 'notifications': []});

      },
      'types': function (triggers) {

        return triggers.types();

      }
    }
  })
  .state('main.triggers.edit', {
    url: '/:name',
    templateUrl: 'modules/triggers/views/triggers.edit.html',
    controller: 'triggersEdit',
    resolve: {
      'trigger': function ($stateParams, $state, Triggers) {

        return Triggers.get({'id': $stateParams.name}).$promise;

      },
      'types': function (triggers) {

        return triggers.types();

      }
    }
  });
});
