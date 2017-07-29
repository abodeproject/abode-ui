
var insteon = angular.module('insteon');

insteon.directive('insteonSceneMembers', function () {

  return {
    restrict: 'E',
    transclude: false,
    scope: {
      'ngModel': '=',
    },
    require: 'ngModel',
    controller: function ($scope, $timeout, $uibModal, insteon, confirm) {
      $scope.ngModel.config.scene_members = $scope.ngModel.config.scene_members || [];
      $scope.status = 'idle';

      var openMember = function (member) {
        var modal = $uibModal.open({
          animation: true,
          templateUrl: 'modules/insteon/views/scene_member_modal.html',
          size: 'sm',
          controller: function ($scope, $timeout, $uibModalInstance, member, devices) {
            $scope.member = member;
            $scope.devices = devices;
            $scope.rates = insteon.rates;
            $scope.editing = (member.address !== undefined);

            $scope.changeDevice = function (device) {
              $scope.member.name = device.name;
              $scope.member.address = device.config.address;
            };

            $scope.save = function () {
              var matches = $scope.devices.filter(function (device) {
                return (device.config.address === $scope.member.address);
              });

              if (matches.length > 0) {
                $scope.member.name = matches[0].name;
              }
              $uibModalInstance.close($scope.member);
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss();
            };

            $timeout(function () {
                $scope.$broadcast('rzSliderForceRender');
            });
          },
          resolve: {
            'member': function () {
              return angular.copy(member);
            },
            'devices': function ($q, insteon) {
              var defer = $q.defer();

              insteon.get_devices().then(function (devices) {
                var existing = $scope.ngModel.config.scene_members.map(function (device) {
                  return device.address;
                });

                var filtered = devices.filter(function (dev) {
                  return (existing.indexOf(dev.config.address) === -1);
                });

                defer.resolve(filtered);
              }, function (err) {
                defer.reject(err);
              });

              return defer.promise;
            },
          }
        });

        return modal;
      };

      $scope.add_member = function () {

        var modal = openMember({'button': 1, 'on_level': 100, 'ramp_rate': 31});

        modal.result.then(function (member) {
          member.action = 'add';
          member.status = 'pending';
          $scope.ngModel.config.scene_members.push(member);
        });
      };

      $scope.edit_member = function (member) {
        if ($scope.status === 'applying') {
          return;
        }

        var index = $scope.ngModel.config.scene_members.indexOf(member),
          modal = openMember(member);

        modal.result.then(function (member) {
          member.action = (member.action === 'add') ? 'add' : 'update';
          member.status = 'pending';
          $scope.ngModel.config.scene_members.splice(index, 1, member);
        });
      };

      $scope.delete_member = function (member) {
        if (member.action !== 'delete') {
          confirm('Delete scene member?').then(function () {
            if (member.action === 'add') {
              var index = $scope.ngModel.config.scene_members.indexOf(member);
              $scope.ngModel.config.scene_members.splice(index, 1);
            } else {
              member.status = 'pending';
              member.action = 'delete';
            }
          });

        } else {
          confirm('Force remove scene member?').then(function () {
            var index = $scope.ngModel.config.scene_members.indexOf(member);
            $scope.ngModel.config.scene_members.splice(index, 1);
          });
        }
      };

      $scope.apply = function () {
        var index = -1,
            deleted = [],
            pending = $scope.ngModel.config.scene_members.filter(function (member) {
          return (member.status === 'pending' || member.status === 'failed');
        });

        var apply_member = function () {
          index += 1;
          var promise,
              member = pending[index];

          if (!member) {
            deleted.forEach(function () {
               $scope.ngModel.config.scene_members.splice($scope.ngModel.config.scene_members.indexOf(member), 1);
            });

            $scope.status = '';
            $scope.ngModel.config.scene_members.forEach(function (member) {
              delete member.$processing;
            });
            return;
          }

          member.$processing = true;

          switch (member.action) {
            case 'add':
              promise = insteon.add_scene_member($scope.ngModel.config.address, member);
              break;
            case 'update':
              promise = insteon.update_scene_member($scope.ngModel.config.address, member);
              break;
            case 'delete':
              promise = insteon.delete_scene_member($scope.ngModel.config.address, member);
              break;
          }

          promise.then(function () {
            $timeout(function () {
              if (member.action === 'delete') {
                deleted.push(member);
              }
              member.status = 'complete';
              member.action = '';
              member.$processing = false;
              apply_member();
            }, 1000);
          }, function () {
            $timeout(function () {
              member.status = 'failed';
              member.$processing = false;
              apply_member();
            }, 1000);
          });
        }

        $scope.status = 'applying';
        apply_member();
      };

      $scope.has_pending = function () {
        var matches = $scope.ngModel.config.scene_members.filter(function (member) {
          return (member.status === 'pending' || member.status === 'failed');
        });

        return (matches.length > 0);
      };
    },
    templateUrl: 'modules/insteon/views/scene_members.html',
    replace: true,
  };

});
