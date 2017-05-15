
var abode = angular.module('abode');

abode.directive('slider', function () {

  return {
    scope: {
      'min': '=?',
      'max': '=?',
      'level': '=',
    },
    restrict: 'E',
    replace: true,
    templateUrl: 'modules/abode/views/slider.html',
    controller: ['$scope', '$document', function ($scope, $document) {
      var startY;
      $scope.level = $scope.level || 0;
      $scope.min = $scope.min || 0;
      $scope.max = $scope.max || 100;

      $scope.level = ($scope.level > $scope.max) ? parseInt($scope.max) : $scope.level;
      $scope.level = ($scope.level < $scope.min) ? parseInt($scope.min) : $scope.level;

      $scope.sliderPosition = {
        'bottom': $scope.level + '%'
      };

      $scope.start = function (event) {
        event.target.setCapture();
        startY = event.clientY;
        $document.on('mousemove', $scope.move);
      };

      $scope.end = function () {
        $document.unbind('mousemove', $scope.move);
      };

      $scope.move = function (event) {
        var value = (startY - event.clientY) + $scope.level;
        if (value > $scope.max) {
          $scope.level = parseInt($scope.max, 10);
          $scope.sliderPosition.bottom = $scope.level + '%';
        console.log($scope.level);
          return;
        }
        if (value < $scope.min) {
          $scope.level = parseInt($scope.min, 10);
          $scope.sliderPosition.bottom = $scope.level + '%';
        console.log($scope.level);
          return;
        }
        $scope.level = parseInt(value, 10);
        $scope.sliderPosition.bottom = $scope.level + '%';
        console.log($scope.level);
      };

    }],
    link: function ($scope, $element) {
      $scope.element = $element;

      $scope.slider = $element.find('div.slider-track');
      console.dir($scope.slider);
    }
  };

});
