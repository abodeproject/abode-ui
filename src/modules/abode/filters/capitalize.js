
var abode = angular.module('abode');

abode.filter('capitalize', function() {
  return function(token) {
    return (typeof(token) === 'string') ? token.charAt(0).toUpperCase() + token.slice(1) : token;
  };
});
