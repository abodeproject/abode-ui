
var triggers = angular.module('abode.triggers');

triggers.filter('conditionReadable', function ($filter) {
    return function (condition) {
      var left, right, cond;

      var formatSide = function (side) {
        var text,
          type = condition[side + '_type'],
          obj = condition[side + '_object'],
          key = condition[side + '_key'];


        if (['devices', 'scenes', 'rooms'].indexOf(type) != -1) {
          type = type.substr(0, type.length - 1);
          text = 'the ' + type + ' key ' + obj + '.' + key;
        } else if (type === 'boolean') {
          text = key;
        } else if (['string','number'].indexOf(type) !== -1) {
          text = 'the ' + type + ' "' + key + '"';
        } else if (type === 'timeofday') {
          text = 'the time ' + $filter('time')(key);
        } else if (type === 'time' && key === 'time') {
          text = 'the current time';
        } else if (type === 'age') {
          text = 'age of ' + $filter('ageHumanReadable')(key);
        } else {
          text = 'the ' + type + '.' + key;
        }

        return text;
      };

      if ((condition.and && condition.and.length > 0) || (condition.or && condition.or.length > 0)) {
        return condition.name;
      }

      left = formatSide('left');
      right = formatSide('right');

      switch (condition.condition) {
        case 'eq':
          cond = 'equal to';
          break;
        case 'ne':
          cond = 'not equal to';
          break;
        case 'lt':
          cond = 'less then';
          break;
        case 'le':
          cond = 'less then or equal to';
          break;
        case 'gt':
          cond = 'greater then';
          break;
        case 'ge':
          cond = 'greater then or equal to';
          break;
      }

      return 'If ' + left + ' is ' + cond + ' ' + right;
    };
});
