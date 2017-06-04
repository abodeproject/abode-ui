angular.module('insteon', [])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('main.settings.insteon', {
    url: '/settings',
    templateUrl: 'modules/insteon/views/settings.html',
    controller: 'insteonSettings',
    resolve: {
      status: function (insteon) {
        return insteon.status();
      }
    }
  });
})
