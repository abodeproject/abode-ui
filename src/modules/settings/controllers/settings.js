
var settings = angular.module('abode.settings');

settings.controller('settings', function ($scope, $state, abode, settings, config) {
  var notifier = abode.message;

  abode.get_events();
  $scope.config = config;
  $scope.state = $state;
  $scope.reload = function () {
    document.location.reload();
  };

  $scope.sensors = [
    {'name': 'Temperature/Humidity', 'route': 'main.settings.general'},
    {'name': 'Light', 'route': 'main.settings.home'},
    {'name': 'Motion', 'route': 'main.settings.sources'},
  ];

  $scope.providers = [
    {'name': 'IFTTT', 'route': 'main.settings.ifttt'},
    {'name': 'Insteon PLM', 'route': 'main.settings.insteon'},
    {'name': 'Insteon Hub', 'route': 'main.settings.insteonhub'},
    {'name': 'Lutron Caseta', 'route': 'main.settings.lutroncaseta'},
    {'name': 'MQTT', 'route': 'main.settings.mqtt'},
    {'name': 'Rad', 'route': 'main.settings.rad'},
    {'name': 'RadioThermostat', 'route': 'main.settings.radiothermostat'},
    {'name': 'Video', 'route': 'main.settings.video'},
    {'name': 'Wunderground', 'route': 'main.settings.wunderground'},
    {'name': 'Z-Wave', 'route': 'main.settings.zwave'},
    {'name': 'Auto-Shades', 'route': 'main.settings.autoshades'},
  ];

  $scope.sources = [
    {'name': 'Muir', 'route': 'index.settings.insteon'},
  ];

  $scope.providerSettings = function (p) {
    $state.go(p);
  };

  $scope.save = function () {

    settings.save_config(undefined, $scope.config).then(function () {

      $scope.write_config();

    }, function (err) {
      abode.message({
        'type': 'failed',
        'message': 'Settings Failed to Save',
        'details': err
      });
    });

  };

  $scope.write_config = function () {
    settings.write_config().then(function () {

      abode.message({
        'type': 'success',
        'message': 'Config Saved'
      });

    }, function (err) {

      abode.message({
        'type': 'failed',
        'message': 'Failed to Save Config',
        'details': err
      });

    });
  };
});
