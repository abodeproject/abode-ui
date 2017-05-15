
var abode = angular.module('abode');

abode.filter('ageHumanReadable', function () {


  var secondsToString = function (seconds) {
    var numyears = Math.floor(seconds / 31536000);
    var numdays = Math.floor((seconds % 31536000) / 86400);
    var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
    var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
    var numseconds = Math.floor((((seconds % 31536000) % 86400) % 3600) % 60);
    numyears = (numyears === 0) ? '' : numyears + ' years ';
    numdays = (numdays === 0) ? '' : numdays + ' days ';
    numhours = (numhours === 0) ? '' : numhours + ' hours ';
    numminutes = (numminutes === 0) ? '' : numminutes + ' min ';
    numseconds = (numseconds === 0) ? '' : numseconds + ' sec ';

    return numyears + numdays + numhours + numminutes + numseconds;

  };

  return function (input) {
    return (!isNaN(input)) ? secondsToString(input): '&nbsp;';
  };

});
