
var welcome = angular.module('abode.welcome');

welcome.controller('welcomeController', ['$scope', '$timeout', '$interval', '$http', '$q', '$state', '$uibModal', '$location', 'abode', 'network', 'Auth', 'Interfaces', 'connection', function ($scope, $timeout, $interval, $http, $q, $state, $uibModal, $location, abode, network, Auth, Interfaces, connection) {

  var ssl_checker;
  var attempts = [
    '',
    'http://abode:8080',
    'https://abode'
  ];

  abode.load();
  $scope.config = abode.config;
  if ($scope.config.server) {
    $state.go('welcome_login');
  }
  $scope.loading = false;
  $scope.failed = false;
  $scope.sources = [];
  $scope.manual = {};
  $scope.state = $state;
  $scope.checking_ssl = false;
  $scope.needs_reboot = false;
  $scope.connection = connection;
  $scope.connected = (connection === false || connection.connected === true) ? true : false;

  $scope.restart = function () {
    $http.post('/api/abode/restart');
  };

  $scope.load = function () {
    var attempt_defers = [];
    $scope.sources = [];
    $scope.interfaces = [];
    $scope.loading = true;

    $timeout(function () {

      $http.get('/api/abode/status').then(function (response) {
        if (response.data.name !== undefined && response.data.url !== undefined) {

          $scope.sources.push({
            'name': response.data.name,
            'url': response.data.url,
            'ssl_url': response.data.ssl_url,
            'mode': response.data.mode,
            'ca_url': response.data.ca_url,
          });

          $http.get('/api/abode/upnp').then(function (response) {
            $scope.sources.push.apply($scope.sources, response.data);
            $scope.loading = false;
          }, function () {
            $scope.loading = false;
          });

        } else {
          $scope.loading = false;
        }
      }, function (err) {
        if (err.status === 401) {

          $scope.sources.push({
            'name': 'Login to this Abode',
            'url': $location.protocol() + '://' + $location.host(),
            'mode': 'server',
          });

          $scope.loading = false;

        } else {
          $scope.loading = false;
        }
      });

    }, 100);

  };

  $scope.cancel_check = function () {
    if (ssl_checker) {
      $timeout.cancel(ssl_checker);
    }
    $scope.checking_ssl = false;
    $scope.checking = false;
  };

  $scope.connect = function (source) {
    if (source.mode === 'device') {
      abode.save({});
      $state.go('welcome_configure');
      return;
    }

    var check_server = function () {

      $scope.auth = new Auth();
      $scope.auth.$check().then(function (status) {
        if (status.client_token && status.auth_token) {
          $scope.config.auth = response.data;
          abode.save($scope.config);
          $staet.go('welcome_devices');
        } else {
          abode.save($scope.config);
          $state.go('welcome_login');
        }

      }, function (error) {
        if (error.status === 401) {
          abode.save($scope.config);
          $state.go('welcome_login');
        } else if (error.status === 403) {
          abode.save($scope.config);
          $state.go('welcome_devices');
        } else {
          abode.message({'type': 'failed', 'message': 'Failed to connect'});
          source.error = true;
          $scope.cancel_check();
        }
      });

    };

    var check_ssl = function () {
      $scope.checking_ssl = true;
      $scope.checking = true;

      $http.get(source.url + '/api/abode/status').then(function () {
        abode.config.server = source.url;
        abode.save(abode.config);
        check_server();
      }, function (err) {
        if (err.status > 0) {
          check_server();
        } else {
          ssl_checker = $timeout(check_ssl, 5000);
        }
      });
    };

    var install_cert = function (status) {
      var check_count = 0;

      //If a SSL URL and a CA_URL are specified, check the SSL status
      if (source.url.indexOf('https') === 0) {

        //If we are on localhost, try to import the cert transparently
        if (document.location.host.indexOf('localhost') >= 0) {
          $http.post('/api/abode/import_ca', {'url': source.url}).then(function () {
            $scope.needs_reboot = true;
          }, function () {
            abode.message({'type': 'failed', 'message': 'Unable to install CA Certificate'});
            source.error = true;
            $scope.cancel_check();
          });
        //Otherwise prompt to download the certificate
        } else {
            var dl_link = document.createElement('A');
            dl_link.href = source.url + '/ca_chain.crt';
            dl_link.style.display = 'none';
            dl_link.target = '_new';
            document.body.appendChild(dl_link);
            dl_link.click();

            check_ssl();
        }
      } else {
        abode.config.server = source.url;
        abode.save(abode.config);
        check_server();
      }
    };

    //Get the status of the selected server.  If success, check server, otherwise try installing a cert
    $scope.checking = true;
    $http.get(source.url + '/api/abode/status').then(function () {
      abode.config.server = source.url;
      abode.save(abode.config);
      check_server();
    }, function (err) {
      if (err.status > 0) {
        abode.config.server = source.url;
        abode.save(abode.config);
        check_server();
      } else {
        install_cert();
      }
    });

  };

  if (connection.connected === false) {
    network.open().closed.then($scope.load);
  } else {
    $timeout($scope.load, 100);
  }

}]);
