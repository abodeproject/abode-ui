
var abode = angular.module('abode');

abode.service('slideNavSvc', ['$window', '$document', function () {
  var menu, nav_scope;
  var status = {
    left: 0,
    menu_width: 0,
    is_open: false,
    is_down: false,
    has_touch: false
  };

  var get_size = function () {
    status.menu_width = menu.offsetWidth;
  };

  var press = function (e) {
    status.event = e.type;
    if (!e.touches[0]) {
      return;
    }
    status.x = e.touches[0].clientX;

    if (status.x < nav_scope.minLeft || (status.is_open && status.x > status.menu_width)) {
      status.is_down = true;
      status.is_open = false;
      status.start_time = new Date();
    }
  };

  var release = function (e) {
    status.event = e.type;
    if (!status.is_down || status.is_open) {
      return;
    }


    get_size();

    status.is_down = false;
    status.end_time = new Date();
    status.x = e.changedTouches[0].clientX;
    status.time_diff = status.end_time - status.start_time;
    status.left_percent = (status.x / status.menu_width * 100);

    if ((status.time_diff < nav_scope.minTime && status.left_percent > 20) || status.left_percent > nav_scope.minLeft) {
      open();
    } else {
      close();
    }
  };

  var move = function (e) {
    status.event = e.type;

    if (e.touches[0].clientX < 4) {
      status.is_down = true;
    }

    if (!status.is_down) {
      return
    }

    get_size();

    status.x = e.touches[0].clientX;
    status.shade_alpha = (status.x / status.menu_width);
    status.left = (status.x / status.menu_width) * status.menu_width - status.menu_width;

    if (status.left < (-1 * status.menu_width) || status.left > 0) {
      return;
    }

    nav_scope.$broadcast('set_state', {
      'is_open': false,
      'nav': {
        'left': status.left + 'px',
        'transition': 'none'
      },
      'shade': {
        'display': 'block',
        'background-color': 'rgba(0,0,0,' + status.shade_alpha / 2 + ')'
      }
    });
  };

  var init = function (scope, element) {
    menu = element[0].childNodes[0];
    nav_scope = scope;

    get_size();

    document.addEventListener('resize', get_size);

    document.addEventListener('touchstart', press, true);
    document.addEventListener('touchend', release, true);
    document.addEventListener('touchmove', move, true);

  };

  var open = function () {
    if (!nav_scope) { return; }
    status.is_open = true;
    nav_scope.$broadcast('set_state', {
      'is_open': status.is_open,
      'nav': {
        'left': '0px',
        'transition': 'left .5s ease'
      },
      'shade': {
        'display': 'block',
        'background-color': 'rgba(0,0,0,.5)'
      }
    });
  };

  var close = function () {
    if (!nav_scope) { return; }
    status.is_open = false;
    nav_scope.$broadcast('set_state', {
      'is_open': status.is_open,
      'nav': {
        'left': (-1 * status.menu_width) + 'px',
        'transition': 'left .5s'
      },
      'shade': {
        'display': 'none',
        'background-color': 'rgba(0,0,0,0)'
      }
    });
  };

  return {
    'init': init,
    'open': open,
    'close': close,
    'status': status
  }
}]);
