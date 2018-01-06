angular.module('synology', [])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('main.settings.synology', {
    url: '/synology',
    templateUrl: 'modules/synology/views/settings.html',
    controller: 'synologySettings',
    resolve: {
      status: function (synology) {
        return synology.status();
      },
      config: function (synology) {
        return synology.get_config();
      }
    }
  });
})
