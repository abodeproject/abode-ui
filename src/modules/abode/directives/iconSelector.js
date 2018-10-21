
var abode = angular.module('abode');

abode.directive('iconSelector', ['$compile', function () {
  return {
    restrict: 'E',
    replace: 'true',
    scope: {
      value: '=',
      height: '=',
    },
    templateUrl: 'modules/abode/views/icons.html',
    controller: ['$scope', function ($scope) {

      var height = ($scope.height) ? $scope.height : 8;

      $scope.styles = {
        'max-height': height + 'em'
      };

      $scope.selectIcon = function (icon) {
        $scope.value = icon.class;
      };

      $scope.icons = [
        {
          'name': 'Power ',
          'class': 'icon-off'
        },
        {
          'name': 'Window',
          'class': 'fi-window'
        },
        {
          'name': 'Door Open',
          'class': 'fi-door-open'
        },
        {
          'name': 'Door Closed',
          'class': 'fi-door-closed'
        },
        {
          'name': 'Motion',
          'class': 'fi-motion'
        },
        {
          'name': 'Light',
          'class': 'icon-lightbulb-idea'
        },
        {
          'name': 'Fan',
          'class': 'icon-fan'
        },
        {
          'name': 'Heat',
          'class': 'icon-fire'
        },
        {
          'name': 'Cool',
          'class': 'icon-snow'
        },
        {
          'name': 'Monitor',
          'class': 'icon-monitor'
        },
        {
          'name': 'Security',
          'class': 'icon-securityalt-shieldalt'
        },
        {
          'name': 'Security Alt1',
          'class': 'icon-security-shield'
        },
        {
          'name': 'Controller',
          'class': 'icon-controlpanelalt'
        },
        {
          'name': 'Scene',
          'class': 'icon-picture'
        },
        {
          'name': 'Home',
          'class': 'icon-home'
        },
        {
          'name': 'Notification',
          'class': 'icon-commenttyping'
        },
        {
          'name': 'Laptop',
          'class': 'icon-laptop'
        },
        {
          'name': 'Computer',
          'class': 'icon-server'
        },
        {
          'name': 'Phone',
          'class': 'icon-mobile',
        },
        {
          'name': 'Laptop',
          'class': 'icon-iphone'
        },
        {
          'name': 'Browser',
          'class': 'icon-browser'
        },
        {
          'name': 'Alarm',
          'class': 'icon-alarm'
        },
        {
          'name': 'Alarm Off',
          'class': 'icon-turnoffalarm'
        },
        {
          'name': 'Garage',
          'class': 'icon-garage'
        },
        {
          'name': 'Lock',
          'class': 'icon-lock'
        },
        {
          'name': 'Location',
          'class': 'icon-map-marker'
        },
        {
          'name': 'Brain',
          'class': 'icon-brain'
        },
        {
          'name': 'Unlock',
          'class': 'icon-unlock'
        },
        {
          'name': 'Sleep',
          'class': 'icon-sleep'
        },
        {
          'name': 'Video Camera',
          'class': 'icon-videocamerathree',
        },
        {
          'name': 'Still Camera',
          'class': 'icon-camera',
        },
        {
          'name': 'Sunset',
          'class': 'wi wi-sunset'
        },
        {
          'name': 'Sunrise',
          'class': 'wi wi-sunrise'
        },
        {
          'name': 'Lamp',
          'class': 'icon-lamp'
        },
        {
          'name': 'Lamp Alt1',
          'class': 'icon-desklamp'
        },
        {
          'name': 'Lamp Alt2',
          'class': 'icon-lampalt'
        },
        {
          'name': 'Tablet',
          'class': 'icon-tablet'
        },
        {
          'name': 'Mute',
          'class': 'icon-mutealt'
        },
        {
          'name': 'Horn',
          'class': 'icon-bullhorn'
        },
        {
          'name': 'Torch',
          'class': 'icon-torch'
        },
        {
          'name': 'Pendant',
          'class': 'icon-ceilinglight'
        },
        {
          'name': 'Battery',
          'class': 'icon-aaabattery'
        },
        {
          'name': 'Key Hole',
          'class': 'icon-lockalt-keyhole'
        },
        {
          'name': 'Umbrella',
          'class': 'wi wi-umbrella',
        },
        {
          'name': 'Room',
          'class': 'icon-snaptogrid'
        },
        {
          'name': 'Office Chair',
          'class': 'icon-officechair'
        },
        {
          'name': 'Bed',
          'class': 'icon-bed'
        },
        {
          'name': 'TV',
          'class': 'icon-tv'
        },
        {
          'name': 'Fork',
          'class': 'icon-fork'
        },
        {
          'name': 'Washer',
          'class': 'icon-washer'
        },
        {
          'name': 'Modes',
          'class': 'icon-burstmode'
        },
        {
          'name': 'Tree',
          'class': 'icon-forest-tree'
        },
        {
          'name': 'Tree Christmas',
          'class': 'icon-christmastree'
        },
        {
          'name': 'Tree Alt',
          'class': 'icon-treethree'
        },
        {
          'name': 'Plant',
          'class': 'icon-plantalt'
        },
        {
          'name': 'Plant Alt1',
          'class': 'icon-macro-plant'
        },
        {
          'name': 'Plant Alt2',
          'class': 'icon-flowerpot'
        },
        {
          'name': 'Broom',
          'class': 'icon-broom'
        },
        {
          'name': 'Dog',
          'class': 'icon-dog'
        },
        {
          'name': 'Dog House',
          'class': 'icon-doghouse'
        },
        {
          'name': 'Timer',
          'class': 'icon-timer'
        },
        {
          'name': 'Travel',
          'class': 'icon-travel'
        },
        {
          'name': 'Car',
          'class': 'icon-automobile-car',
        },
        {
          'name': 'Moon',
          'class': 'icon-moon-night',
        },
        {
          'name': 'Hat',
          'class': 'icon-tophat',
        },
        {
          'name': 'Alert',
          'class': 'icon-alertalt'
        },
        {
          'name': 'Baby',
          'class': 'icon-baby'
        },
        {
          'name': 'User',
          'class': 'icon-user'
        },
        {
          'name': 'Password Alt',
          'class': 'icon-passwordalt'
        },
        {
          'name': 'Speaker Off',
          'class': 'icon-volume-off'
        },
        {
          'name': 'Speaker Up',
          'class': 'icon-volume-up'
        },
        {
          'name': 'Speaker Down',
          'class': 'icon-volume-down'
        },
        {
          'name': 'Office',
          'class': 'icon-office-building'
        },
        {
          'name': 'Weather Hot',
          'class': 'wi wi-hot',
        },
        {
          'name': 'Weather Rain',
          'class': 'wi wi-rain'
        },
        {
          'name': 'Thermometer',
          'class': 'wi wi-thermometer'
        },
        {
          'name': 'Music',
          'class': 'icon-music'
        },
        {
          'name': 'Bath',
          'class': 'icon-bathtub'
        },
        {
          'name': 'Movie',
          'class': 'icon-movieclapper'
        },
        {
          'name': 'Movie Alt',
          'class': 'icon-moviereel'
        },
        {
          'name': 'Events',
          'class': 'icon-eventum'
        },
        {
          'name': 'Chandelier',
          'class': 'icon-chandelier'
        },
        {
          'name': 'Tools',
          'class': 'icon-tools'
        },
        {
          'name': 'Tools Alt1',
          'class': 'icon-mootoolsthree'
        },
        {
          'name': 'Tools Alt2',
          'class': 'icon-screwdriver'
        },
        {
          'name': 'Tools Alt3',
          'class': 'icon-screw'
        },
        {
          'name': 'Glass',
          'class': 'icon-wineglass'
        },
        {
          'name': 'Glass Alt1',
          'class': 'icon-glass'
        },
        {
          'name': 'Glass Alt2',
          'class': 'icon-beeralt'
        },
        {
          'name': 'Sport',
          'class': 'icon-football-soccer'
        },
        {
          'name': 'Sport Alt1',
          'class': 'icon-usfootball'
        },
        {
          'name': 'Camp Fire',
          'class': 'icon-campfire'
        },
        {
          'name': 'Tent',
          'class': 'icon-tent-camping'
        },
        {
          'name': 'Tie',
          'class': 'icon-tie-business'
        },
        {
          'name': 'Shirt',
          'class': 'icon-workshirt'
        },
        {
          'name': 'Security Camera',
          'class': 'icon-cctv'
        },
        {
          'name': 'Chair',
          'class': 'icon-chair'
        },
        {
          'name': 'Mirror',
          'class': 'icon-mirror'
        },
        {
          'name': 'Microwave',
          'class': 'icon-microwave'
        },
        {
          'name': 'Turntable',
          'class': 'icon-gramophone'
        },
        {
          'name': 'shade',
          'class': 'icon-pattern'
        },
        {
          'name': 'Windows Alt',
          'class': 'icon-windows'
        },
        {
          'name': 'Drawer',
          'class': 'icon-storagealt-drawer'
        },
        {
          'name': 'Enter',
          'class': 'icon-enter'
        },
        {
          'name': 'Exit',
          'class': 'icon-exit'
        },
        {
          'name': 'Outlet',
          'class': 'icon-powerplugus'
        }
      ];
    }]
  };
}]);
