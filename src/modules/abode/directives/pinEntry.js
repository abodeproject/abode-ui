
var abode = angular.module('abode');

abode.directive('pinEntry', function () {

  return {
    restrict: 'E',
    replace: true,
    scope: {
      pinModel: '=',
      randomize: '=?',
      showSubmit: '=?',
      submit: '&',
      checking: '=?',
      error: '=?',
      success: '=?',
    },
    templateUrl: 'modules/abode/views/pin_entry.html',
    controller: ['$scope', function ($scope) {
      $scope.pinModel = '';
      $scope.hashed = '';
      $scope.randomize = $scope.randomize || false;
      $scope.showSubmit = $scope.showSubmit || false;
      $scope.checking = $scope.checking || false;
      $scope.error = $scope.error || false;
      $scope.success = $scope.success || false;
      $scope.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

      var shuffle = function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      };

      if ($scope.randomize) {
        $scope.numbers = shuffle($scope.numbers);
      }

      $scope.entry = function (v) {
        if (v === 'back') {
          $scope.pinModel = $scope.pinModel.slice(0, $scope.pinModel.length - 1);
          return;
        }
        $scope.pinModel += String(v);
      };
    }]
  };

});
