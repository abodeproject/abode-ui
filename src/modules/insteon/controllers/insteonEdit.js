
var insteon = angular.module('insteon');

insteon.controller('insteonEdit', function ($scope, $http, $uibModal, $timeout, abode, insteon) {
  $scope.device = $scope.$parent.device;
  $scope.loading = false;
  $scope.error = false;
  $scope.linking_loading = false;
  $scope.linking_error = false;
  $scope.beep_error = false;
  $scope.beep_loading = false;

  $scope.reload_database = function () {
    $scope.loading = true;
    $scope.error = false;
    $http.post(abode.url('/api/insteon/devices/' + $scope.device.config.address + '/load_database').value()).then(function (response) {
      $scope.loading = false;
      $scope.error = false;
      $scope.device.config.database = response.data;
    }, function (err) {
      $scope.loading = false;
      $scope.error = true;
    });
  };

  $scope.beep = function () {
    $scope.beep_loading = true;
    $scope.beep_error = false;

    insteon.beep($scope.device.config.address)
        .then(function () {
            $scope.beep_loading = false;
        }, function () {
          $scope.beep_error = true;

          $timeout(function () {
            $scope.beep_error = false;
            $scope.beep_loading = false;
          }, 2500);
        });
  };

  $scope.enterlinking = function (group) {
    $scope.linking_loading = true;
    $scope.linking_error = false;

    insteon.enterlinking($scope.device.config.address, group)
        .then(function () {
            $scope.linking_loading = false;
        }, function () {
          $scope.linking_error = true;

          $timeout(function () {
            $scope.linking_error = false;
            $scope.linking_loading = false;
          }, 2500);
        });
  };

  $scope.enterunlinking = function (group) {
    $scope.linking_loading = true;
    insteon.enterunlinking($scope.device.config.address, group)
        .then(function () {
            $scope.linking_loading = false;
        }, function () {
          $scope.linking_error = true;

          $timeout(function () {
            $scope.linking_error = false;
            $scope.linking_loading = false;
          }, 2500);
        });
  };

  $scope.exitlinking = function () {
    $scope.linking_loading = true;
    insteon.exitlinking($scope.device.config.address)
        .then(function () {
            $scope.linking_loading = false;
        }, function () {
          $scope.linking_error = true;

          $timeout(function () {
            $scope.linking_error = false;
            $scope.linking_loading = false;
          }, 2500);
        });
  };

  $scope.idrequest = function () {
    $scope.id_success = false;
    $scope.id_error = false;
    $scope.id_loading = true;

    insteon.idrequest($scope.device.config.address).then(function (result) {
      $scope.device.config.device_cat = result.devcat;
      $scope.device.config.device_subcat = result.subcat;
      $scope.device.config.firmware = result.firmware;

      $scope.id_error = false;
      $scope.id_loading = false;
      $scope.id_success = true;

      $timeout(function () {
        $scope.id_success = false;
      }, 5000);
    }, function () {
      $scope.id_error = true;
      $scope.id_loading = false;
      $scope.id_success = false;

      $timeout(function () {
        $scope.id_error = false;
      }, 5000);
    });
  };

  $scope.add_link = function () {
    var modal = $uibModal.open({
      animation: false,
      templateUrl: 'modules/insteon/views/link.html',
      size: 'sm',
      backdrop: 'static',
      keyboard: false,
      resolve: {
        device: function () { return $scope.device; },
      },
      controller: ['$scope', '$uibModalInstance', '$timeout', 'insteon', 'device', function ($uiScope, $uibModalInstance, $timeout, insteon, device) {
        $uiScope.action = 'Add';
        $uiScope.loading = true;
        $uiScope.error = '';
        $uiScope.rates = insteon.rates;

        insteon.get_devices().then(function (results) {
          $uiScope.loading = false;
          $uiScope.devices = results;
        }, function () {
          $uiScope.loading = false;
        });

        $uiScope.controller_options =[
          {'text': 'Control Device', 'value': true},
          {'text': 'Response to Device', 'value': false}
        ];
        $uiScope.record = {
          controller: true,
          group: 1,
          on_level: 100,
          ramp_rate: 31,
          button: 1,
        };

        $uiScope.cancel = function () {
          $uibModalInstance.dismiss();
        };

        $uiScope.save = function () {
          $uiScope.loading = true;
          $uiScope.error = '';

          insteon.add_database_record(device.config.address, $uiScope.record).then(function () {
            $uibModalInstance.close();
          }, function (err) {
            $uiScope.error = err;
            $uiScope.loading = false;
          });
        };

        $timeout(function () {
            $uiScope.$broadcast('rzSliderForceRender');
        }, 100);
      }]
    });

    modal.result.then(function () {
      $scope.reload_database();
    });
  };

  $scope.edit_link = function (record) {
    var modal = $uibModal.open({
      animation: false,
      templateUrl: 'modules/insteon/views/link.html',
      size: 'sm',
      resolve: {
        device: function () { return $scope.device; },
        record: function () { return angular.copy(record); }
      },
      controller: ['$scope', '$uibModalInstance', '$timeout', 'insteon', 'device', 'record', function ($uiScope, $uibModalInstance, $timeout, insteon, device, record) {
        $uiScope.action = 'Edit';
        $uiScope.record = record;
        $uiScope.loading = true;
        $uiScope.error = '';
        $uiScope.rates = insteon.rates;

        if ($uiScope.record.on_level) {
          $uiScope.record.on_level = parseInt($uiScope.record.on_level / 255 * 100, 10);
        }

        $uiScope.controller_options =[
          {'text': 'Control Device', 'value': true},
          {'text': 'Response to Device', 'value': false}
        ];

        insteon.get_devices().then(function (results) {
          $uiScope.loading = false;

          results = results.filter(function (item) {
            return (item.config.address !== device.config.address);
          });

          var matches = results.filter(function (item) {
            return (item.address === record.address);
          });

          if (matches.length === 0) {
            results.push({'config': {'address': record.address}, 'name': record.address});
          }

          $uiScope.devices = results;
        }, function () {
          $uiScope.loading = false;
        });


        $uiScope.cancel = function () {
          $uibModalInstance.dismiss();
        };

        $uiScope.save = function () {
          $uiScope.loading = true;
          $uiScope.error = '';

          insteon.update_database_record(device.config.address, $uiScope.record.id, $uiScope.record).then(function () {
            $uibModalInstance.close();
          }, function (err) {
            $uiScope.error = err;
            $uiScope.loading = false;
          });
        };

        $timeout(function () {
            $uiScope.$broadcast('rzSliderForceRender');
        }, 100);
      }]
    });

    modal.result.then(function () {
      $scope.reload_database();
    });
  };

  $scope.delete_link = function (record) {
    var modal = $uibModal.open({
      animation: false,
      templateUrl: 'modules/insteon/views/confirm_delete.html',
      size: 'sm',
      backdrop: 'static',
      keyboard: false,
      resolve: {
        device: function () { return $scope.device; },
        record: function () { return record; }
      },
      controller: ['$scope', '$uibModalInstance', 'device', 'record', function ($uiScope, $uibModalInstance, device, record) {

        $uiScope.loading = false;
        $uiScope.record = record;
        $uiScope.device = device;
        $uiScope.error = '';

        $uiScope.cancel = function () {
          $uibModalInstance.dismiss();
        };

        $uiScope.confirm = function () {
          $uiScope.loading = true;
          $uiScope.error = '';
          insteon.delete_database_record(device.config.address, record.id).then(function () {
            $uibModalInstance.close();
          }, function (err) {
            $uiScope.error = err.data;
            $uiScope.loading = false;
          });
        };
      }]
    });

    modal.result.then(function () {
      $scope.reload_database();
    });
  };

});
