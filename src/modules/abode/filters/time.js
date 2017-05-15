
var abode = angular.module('abode');

abode.filter('time', function() {
  return function(seconds) {
    var r = 'AM';
    var h = Math.floor(((seconds % 31536000) % 86400) / 3600);
    var m = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
    m = (m < 10) ? '0' + m : m;
    if (h > 12) {
      h = h - 12;
      r = 'PM';
    } else if (h === 0) {
      h = 12;
    }
    return h + ':' + m + ' ' + r;
  };
});
