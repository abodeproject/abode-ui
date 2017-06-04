
var insteon = angular.module('insteon');

insteon.filter('toHex', function () {
  return function(value) {
    var hex = parseInt(value, 10).toString(16);
    if (hex.length % 2 !== 0) {
      hex = '0' + hex;
    }
    return '0x' + hex;
  };
});