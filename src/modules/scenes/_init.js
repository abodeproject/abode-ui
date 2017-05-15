var scenes = angular.module('abode.scenes', ['ui.router','ngResource']);

scenes.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/scenes', '/scenes/list');

  $stateProvider
  .state('main.scenes', {
    url: '/scenes',
    templateUrl: 'modules/scenes/views/scenes.html',
  })
  .state('main.scenes.list', {
    url: '/list',
    templateUrl: 'modules/scenes/views/scenes.list.html',
    controller: 'scenesList'
  })
  .state('main.scenes.add', {
    url: '/add',
    templateUrl: 'modules/scenes/views/scenes.add.html',
    controller: 'scenesAdd'
  })
  .state('main.scenes.edit', {
    url: '/:name',
    templateUrl: 'modules/scenes/views/scenes.edit.html',
    controller: 'scenesEdit',
    resolve: {
      'scene': function ($stateParams, $state, $q, Scenes) {

        return Scenes.get({'id': $stateParams.name}).$promise;

      }
    }
  });
});







