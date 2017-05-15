
var abode = angular.module('abode');

abode.directive('tags', function () {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      tagModel: '='
    },
    templateUrl: 'modules/abode/views/tags.html',
    controller: ['$scope', '$uibModal', function ($scope, $uibModal) {

      $scope.tagModel = $scope.tagModel || [];

      $scope.removeTag = function (index) {
        $scope.tagModel.splice(index, 1);
      };

      $scope.addTag = function () {
        $uibModal.open({
          animation: false,
          templateUrl: 'modules/abode/views/tags.add.html',
          size: 'sm',
          controller: ['$scope', '$uibModalInstance', function ($uiScope, $uibModalInstance) {

            $uiScope.error = '';
            $uiScope.tag = {'name': undefined};

            $uiScope.add = function () {
              if ($uiScope.tag.name === '' || $uiScope.tag.name === undefined) {
                $uiScope.error = 'Tag not specified';
                return;
              }
              var matches = $scope.tagModel.filter(function (tag) {
                return (tag.toLowerCase() === $uiScope.tag.name.toLowerCase());
              });

              if (matches.length > 0) {
                $uiScope.error = 'Tag already exists';
                return;
              }

              $uiScope.error = '';
              $scope.tagModel.push($uiScope.tag.name);

              $uibModalInstance.close();
            };

            $uiScope.cancel = function () {
              $uibModalInstance.dismiss();
            };
          }]
        });
      };
    }]
  };
});
