
var insteon = angular.module('insteon');

insteon.filter('insteonRate', function() {
  var rates = [
    '9 min',
    '8 min',
    '7 min',
    '6 min',
    '5 min',
    '4.5 min',
    '4 min',
    '3.5 min',
    '3 min',
    '2.5 min',
    '2 min',
    '1.5 min',
    '1 min',
    '47 sec',
    '43 sec',
    '38.5 sec',
    '34 sec',
    '32 sec',
    '30 sec',
    '28 sec',
    '26 sec',
    '23.5 sec',
    '21.5 sec',
    '19 sec',
    '8.5 sec',
    '6.5 sec',
    '4.5 sec',
    '2.0 sec',
    '0.5 sec',
    '0.3 sec',
    '0.2 sec',
    '0.1 sec'
  ];

  return function(rate) {
    return (rates[rate]) ? rates[rate] : rate;
  };
});