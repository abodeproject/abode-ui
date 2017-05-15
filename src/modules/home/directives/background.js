
var home = angular.module('abode.home');

home.directive('background', function () {

  return {
    restrict: 'E',
    transclude: true,
    scope: {
      format: '@',
      bgA: '@',
      bgB: '@',
      interval: '@',
      url: '@',
      refresh: '@',
      video: '@',
    },
    controller: function ($scope, $interval, $timeout, $state, $window) {

      var updater;

      $scope.interval = $scope.interval || 60;
      $scope.interval = ($scope.interval < 5) ? 5 : $scope.interval;
      $scope.refresh = ($scope.refresh === undefined || $scope.refresh === true) ? true : false;
      $scope.bgA = {};
      $scope.bgB = {};

      var bgStyles = [
        'bgA',
        'bgB',
      ];
      var bgImages = [
        'imgA',
        'imgB',
      ];

      var next = 1;
      var previous = 0;
      var delay;

      var sizeImages = function () {
        var clientWidth = window.innerWidth;
        var clientHeight = window.innerHeight;

        var clientRatio = parseInt(clientWidth) / parseInt(clientHeight);
        var imgAratio = parseInt($scope.imgA.naturalWidth) / parseInt($scope.imgA.naturalHeight);
        var imgBratio = parseInt($scope.imgB.naturalWidth) / parseInt($scope.imgB.naturalHeight);

        if (clientRatio > imgAratio) {
          $scope.imgA.style.width = '100%';
          $scope.imgA.style.height = '';
        } else {
          $scope.imgA.style.width = '';
          $scope.imgA.style.height = '100%';
        }
        if (clientRatio > imgBratio) {
          $scope.imgB.style.width = '100%';
          $scope.imgB.style.height = '';
        } else {
          $scope.imgB.style.width = '';
          $scope.imgB.style.height = '100%';
        }

      };

      $scope.$watch(function(){
          return $window.innerWidth + $window.innerHeight;
      }, sizeImages);

      $timeout(function () {

        $scope.imgA.onload = function () {
          if (delay) {
            $timeout.cancel(delay);
          }

          sizeImages();

          if ($scope.imgA.style.opacity !== 0) {
            $scope.imgA.style.opacity = 1;
            $scope.imgB.style.opacity = 0;
          }

          delay = $timeout(transition, 1000 * $scope.interval);
        };

        $scope.imgB.onload = function () {
          if (delay) {
            $timeout.cancel(delay);
          }

          sizeImages();

          if ($scope.imgB.style.opacity !== 0) {
            $scope.imgA.style.opacity = 0;
            $scope.imgB.style.opacity = 1;
          }

          delay = $timeout(transition, 1000 * $scope.interval);
        };


        $scope.imgA.onerror = $scope.imgB.onerror = function () {
          if (delay) {
            $timeout.cancel(delay);
          }

          console.log('error loading', next);
          delay = $timeout(function () {
            transition(false);
          }, 1000 * $scope.interval);
        };

        transition();
      }, 5000);

      var transition = function (increment) {

        if ($state.current.name != 'main.home') {
          return;
        }

        increment = (increment === undefined) ? true : false;

        if (increment) {
          next = (next === 0) ? 1 : 0;
          previous = (next === 0) ? 1 : 0;
        }

        var random = new Date();
        var uri = $scope.url;
          uri += ($scope.url.indexOf('?') > 0) ? '&' : '?';
          uri += random.getTime();

        $scope[bgImages[next]].src = uri;


      };

      var updateBackground = function () {
        var clientWidth = document.body.clientWidth;
        var clientHeight = document.body.clientHeight;

        if ($state.current.name != 'main.home') {
          return;
        }

        next = (next === 0) ? 1 : 0;
        previous = (next === 0) ? 1 : 0;


        var random = new Date();
        var uri = $scope.url;
          uri += ($scope.url.indexOf('?') > 0) ? '&' : '?';
          uri += random.getTime();


        if ($scope.refresh) {
          var img = new Image();

          img.onerror = function () {
            console.log('Error loading image:', uri);
            $timeout(updateBackground, 1000 * $scope.interval * 2);
          };

        console.dir(document.body.clientWidth);

          img.onload = function () {
            if (clientWidth > clientHeight) {
              $scope[bgStyles[next]].width = '100%';
              $scope[bgStyles[next]].height = '';
            } else {
              $scope[bgStyles[next]].width = '';
              $scope[bgStyles[next]].height = '100%';
            }
            $timeout.cancel(delay);
            $scope[bgStyles[next]]['background-image'] = 'url("' + uri + '")';
            $scope[bgStyles[previous]].transition = 'opacity 5s';
            $scope[bgStyles[previous]].opacity = 0;

            $timeout(function () {
              $scope[bgStyles[next]]['z-index'] = 2;
              $scope[bgStyles[previous]]['z-index'] = 1;
              $scope[bgStyles[previous]].transition = '';
              $scope[bgStyles[previous]].opacity = 1;
            }, (1000 * 4 ) );

            delay = $timeout(updateBackground, 1000 * $scope.interval);

          };
          img.src = uri;

        } else {
          $scope[bgStyles[next]]['background-image'] = 'url("' + uri + '")';
          $scope[bgStyles[next]].opacity = 1;
        }

      };

      //updater = $interval(updateBackground, (1000 * $scope.interval));
      //if ($scope.video === undefined) {
      //  updateBackground();
      //}
      //$timeout(function () { console.log($scope.img); }, 5000);

    },
    link: function($scope, element, attrs) {


      if ($scope.video !== undefined) {

        var checker;

        $scope.interval = $scope.interval || 60;
        $scope.interval = ($scope.interval < 5) ? 5 : $scope.interval;

        $scope.img = document.createElement('img');
        $scope.img.style.height = '100%';

        var start = function () {
          var random = new Date();
          var uri = $scope.url;
            uri += ($scope.url.indexOf('?') > 0) ? '&' : '?';
            uri += random.getTime();

          $scope.img.src = uri;
        };

        $scope.img.onload = function () {
          if (checker) {
            clearTimeout(checker);
          }
          checker = setTimeout(start, 10 * 1000);
        };

        $scope.img.onerror = function () {
          if (checker) {
            clearTimeout(checker);
          }
          checker = setTimeout(start, 10 * 1000);
        };
        element[0].appendChild($scope.img);

        start();
      } else {


        $scope.imgA = document.createElement('img');
        //$scope.imgA.style.height = '100%';
        //$scope.imgA.style.minHeight = '100%';
        //$scope.imgA.style.minWidth = '100%';
        //$scope.imgA.style.transition = 'opacity 5s';
        $scope.imgA.style.opacity = 0;
        $scope.imgA.className = 'background';

        $scope.imgB = document.createElement('img');
        //$scope.imgB.style.height = '100%';
        //$scope.imgB.style.minHeight = '100%';
        //$scope.imgB.style.minWidth = '100%';
        //$scope.imgB.style.transition = 'opacity 5s';
        $scope.imgB.style.opacity = 0;
        $scope.imgB.className = 'background';

        element[0].appendChild($scope.imgA);
        element[0].appendChild($scope.imgB);

      }

    },
    template: '<div style="position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px;">  <div ng-style="bgA" class="background"></div><div ng-style="bgB" class="background"></div></div>',
    replace: true,
  };

});
