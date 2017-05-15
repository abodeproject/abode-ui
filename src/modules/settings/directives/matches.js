
var settings = angular.module('abode.settings');

settings.directive('matches', function() {

  return {
    require: 'ngModel',
    scope: {
      matches: '='
    },
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.matches = function(modelValue, viewValue) {
        if (scope.matches == modelValue) {
          // consider empty models to be valid
          return true;
        }

        return false;
      };

      scope.$watch( 'matches', function() {
          ctrl.$validate();
      } );

    }
  };

});
