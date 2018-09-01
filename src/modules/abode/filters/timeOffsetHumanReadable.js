
var abode = angular.module('abode');

abode.filter('timeOffsetHumanReadable', function () {


  var secondsToString = function (seconds) {
    var duration = Math.abs(seconds);
    var numyears = Math.floor(duration / 31536000);
    var numdays = Math.floor((duration % 31536000) / 86400);
    var numhours = Math.floor(((duration % 31536000) % 86400) / 3600);
    var numminutes = Math.floor((((duration % 31536000) % 86400) % 3600) / 60);
    var numseconds = Math.floor((((duration % 31536000) % 86400) % 3600) % 60);
    numyears = (numyears === 0) ? '' : numyears + ' years ';
    numdays = (numdays === 0) ? '' : numdays + ' days ';
    numhours = (numhours === 0) ? '' : numhours + ' hour[s] ';
    numminutes = (numminutes === 0) ? '' : numminutes + ' min ';
    numseconds = (numseconds === 0) ? '' : numseconds + ' sec ';

    var offset = (seconds < 0) ? 'before ' : 'after ';

    return numyears + numdays + numhours + numminutes + numseconds + offset;

  };

  return function (input) {
    return (!isNaN(input)) ? secondsToString(input): '&nbsp;';
  };

});
