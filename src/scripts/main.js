var abode = angular.module('abode', [
  'ng',
  'ngResource',
  'ui.router',
  'ui.bootstrap',
  'abode.welcome',
  'abode.home',
  'abode.devices',
  'abode.rooms',
  'abode.scenes',
  'abode.triggers',
  'abode.settings',
  'abode.weather',
  'abode.alarmclock',
  'abode.notifications',
  'insteon',
  'insteonhub',
  'camera',
  'wunderground',
  'ifttt'
]);

abode.directive('iconSelector', ['$compile', function () {
  return {
    restrict: 'E',
    replace: 'true',
    scope: {
      value: '='
    },
    templateUrl: 'views/main/icons.html',
    controller: ['$scope', function ($scope) {

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
      ];
    }]
  };
}]);

abode.config(['$stateProvider', '$urlRouterProvider', 'abodeProvider', function($state, $urlRouter, abode) {

  abode.load();

  if (abode.config && abode.config.auth && abode.config.auth.device && abode.config.auth.device.config && abode.config.auth.device.config.interface) {
    $urlRouter.otherwise('/Home/' + abode.config.auth.device.config.interface);
    $urlRouter.when('', '/Home/' + abode.config.auth.device.config.interface);
  } else {
    $urlRouter.otherwise('/Welcome');
    $urlRouter.when('', '/Welcome');
  }

  $state
    .state('main', {
      url: '',
      templateUrl: "views/main/index.html",
      controller: 'mainController',
      resolve: {
        auth: ['$q', '$uibModal', 'abode', 'Auth', function ($q, $uibModal, abode, Auth) {
          var defer = $q.defer();

          if (!abode.config.server) {
            defer.reject({'state': 'welcome', 'message': 'Login Expired'});
            return defer.promise;
          }

          Auth.check().$promise.then(function (auth) {
            abode.config.auth = auth;
            abode.save(abode.config);
            abode.load();
            defer.resolve(auth);
          },
          function (response) {
            delete abode.config.auth;
            abode.save();

            if (response.status === 403) {
              defer.reject({'state': 'welcome', 'message': 'Login Expired'});
            } else if (response.status === 401) {
              defer.reject({'state': 'welcome', 'message': 'Login Expired'});
            } else {
              defer.reject({'message': 'Server has gone away', 'action': 'serverGone'});

            }

          });

          return defer.promise;
        }]
      }
    });

}]);

abode.factory('Auth', ['$resource', '$q', '$http', 'abode', function($resource, $q, $http, abode) {

  var model = $resource(abode.url('/api/auth/:action'), {}, {
    login: {
      method: 'POST',
      params: {'action': 'login'}
    },
    logout: {
      method: 'POST',
      params: {'action': 'logout'}
    },
    check: {
      method: 'GET',
      params: {'action': 'check'}
    },
  });

  model.prototype.$assign = function (device) {
    var defer = $q.defer(),
      url = abode.url('/api/auth/assign').value();

    $http.post(url, device).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  return model;
}]);

abode.factory('AuthDevices', ['$resource', 'abode', function($resource, abode) {

  var model = $resource(abode.url('/api/auth/devices'), {}, {
  });

  return model;
}]);

abode.factory('AuthDevice', ['$resource', '$q', '$http', 'abode', function($resource, $q, $http, abode) {

  var model = $resource(abode.url('/api/auth/device'), {}, {
    'update': {'method': 'PUT'}
  });

  model.prototype.$set_interface = function (interface) {
    var defer = $q.defer(),
      url = abode.url('/api/auth/device/set_interface').value();

    $http.post(url, {'interface': interface}).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  return model;
}]);

abode.provider('abode', ['$httpProvider', function ($httpProvider) {
  var self = this,
    headers = {},
    initInjector = angular.injector(['ng']);

  var $q = initInjector.get('$q'),
    $http = initInjector.get('$http'),
    $timeout = initInjector.get('$timeout'),
    $rootScope = initInjector.get('$rootScope');

  this.config = {};
  this.auth = {};
  this.messages = [];
  this.message_scope = null;
  this.scope = $rootScope;

  this.get_events = function () {
    var expires,
      auth_query,
      eventSource;

    if (self.config && self.config.auth && self.config.auth.token) {

      expires = new Date(); expires.setDate(expires.getDate() + 1);
      auth_query = [
        'auth_token=' + self.config.auth.token.auth_token,
        'client_token=' + self.config.auth.token.client_token,
      ];

      auth_query = auth_query.join('&');
    }

    self.eventSource = new EventSource(self.url('/api/abode/events?' + auth_query).value());

    self.eventSource.addEventListener('message', function (msg) {
      var event = JSON.parse(msg.data);

      if (event.event) {
        self.scope.$broadcast(event.event, event);
      }
      self.scope.$broadcast('ABODE_EVENT', event);


    }, false);

    self.eventSource.onopen = function () {
      $timeout.cancel(self.event_error);
    };

    self.eventSource.onerror = function (err) {
      self.event_error = $timeout(function () {
        self.message({'type': 'failed', 'message': 'Connection to Abode Died.', 'details': err});
        self.scope.$broadcast('EVENTS_DIED');
      }, 10 * 1000);
    };

  };

  this.scope.$on('EVENTS_DIED', function () {
    self.get_events();
  });

  this.url = function (uri, source) {
    var url = {};

    url.value = function() {self.load(); return self.config.server + uri; };
    url.split = function (separator,limit) { return url.value().split(separator,limit); };
    url.replace = function (match, other) { return url.value().replace(match, other); };
    url.toString = function() { return url.value(); };

    return url;
  };

  this.message = function (config) {
    config.type = config.type || 'info';
    self.messages.push(config);

    $timeout(function () {
      self.messages.shift();
      if (self.message_scope) {
        self.message_scope.$digest();
      }
    }, 5000 * self.messages.length);
  };

  this.load = function () {

    try {
      this.config = JSON.parse(localStorage.getItem('abode'));
      this.config = this.config || {};

      if (this.config.auth && this.config.auth.token) {
        $httpProvider.defaults.headers.common.client_token = this.config.auth.token.client_token;
        $httpProvider.defaults.headers.common.auth_token = this.config.auth.token.auth_token;
      }
    } catch (e) {
      this.config = {};
    }
  };
  this.save = function (config) {
    config = config || self.config;

    localStorage.setItem('abode', JSON.stringify(config));

  };

  this.$get = function () {
    return {
      config: self.config,
      load: self.load,
      save: self.save,
      auth: self.auth,
      url: self.url,
      messages: self.messages,
      message: self.message,
      message_scope: function (scope) {
        self.message_scope = scope;
      },
      get_events: self.get_events,
      scope: self.scope,
    };
  };

}]);

abode.directive('messages', function () {
  return {
    restrict: 'E',
    replace: true,
    scope: {
    },
    templateUrl: 'views/message.html',
    controller: ['$scope', 'abode', function ($scope, abode) {
      abode.message_scope($scope);
      $scope.messages = abode.messages;
    }]
  };
});

abode.controller('rootController', ['$rootScope', '$scope', '$state', '$window', 'abode', '$timeout', '$uibModal', function ($rootScope, $scope, $state, $window, abode, $timeout, $uibModal) {

  var idleTimer;

  $scope.is_idle = false;

  $rootScope.breakIdle = function ($event) {
    var dim,
      delay;

    if (abode.config && abode.config.auth && abode.config.auth.device) {
      dim = abode.config.auth.device.config.dim_display;
      delay = abode.config.auth.device.config.dim_after || 15;
    }
    if (idleTimer) {
      $timeout.cancel(idleTimer);
    }

    if ($scope.is_idle) {
      if ($event) { $event.preventDefault(); }
      $timeout(function () {
        $scope.is_idle = false;
        $scope.$digest();
      }, 250);
    }

    if (dim) {
      idleTimer = $timeout(function () {
        $scope.is_idle = true;
      }, 1000 * delay);

    }
  };

  $window.addEventListener('click', $rootScope.breakIdle);
  $window.addEventListener('mousemove', $rootScope.breakIdle);
  $window.addEventListener('keypress', $rootScope.breakIdle);

  $rootScope.breakIdle();

  $scope.serverGone_modal = false;
  $scope.serverGone = function (toState, toParams) {

    if ($scope.serverGone_modal) {
      return;
    }

    $scope.serverGone_modal = true;
    return $uibModal.open({
      animation: false,
      keyboard: false,
      backdrop: 'static',
      templateUrl: 'views/main/server_gone.html',
      size: 'lg',
      controller: ['$scope', '$uibModalInstance', '$state', function (scope, $uibModalInstance, $state) {

        scope.retry = function () {
          $scope.serverGone_modal = false;
          $uibModalInstance.close();
          $state.go(toState, toParams);
        };

        scope.select = function () {
          $scope.serverGone_modal = false;
          abode.save({});

          $uibModalInstance.close();
          $state.go('welcome');
        };
      }]
    });
  };

  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {

    if (error.action && $scope[error.action]) {
      $scope[error.action](toState, toParams);
      return;
    }
    if (error.message || error.state !== 'welcome') {
      abode.message({'message': error.message || 'Error Loading Page', 'type': 'error'});
      console.dir(error);
    }
    $rootScope.loading = false;
    event.preventDefault();
    if ( ! error ) {
      alert('Application failed to load');
    } else {
      if (error.state && toState.name !== error.state) {
        $state.go(error.state, error);
      }
    }
  });

}]);

abode.controller('mainController', ['$scope', '$state', 'abode', 'Interfaces', 'auth', function ($scope, $state, abode, Interfaces, auth) {

  $scope.interfaces = Interfaces.query();

  $scope.logout = function () {
    auth.$logout().then(function () {
      abode.save({'server': abode.config.server});
      $state.go('welcome');
    }, function (err) {
      abode.message({'message': err.message || 'Unknown Error Occured', 'type': 'failed'});
      /*
      abode.config = {};
      abode.save({});
      $state.go('welcome');
      */
    });
  };
}]);

abode.service('confirm', function ($q, $uibModal) {
  return function (msg) {
    var defer = $q.defer();

    var modal = $uibModal.open({
      animation: true,
      templateUrl: 'views/confirm.html',
      size: 'sm',
      controller: function ($scope, $uibModalInstance) {
        $scope.msg = msg;

        $scope.no = function () {
          $uibModalInstance.dismiss();
        };

        $scope.yes = function () {
          $uibModalInstance.close();
        };

      }
    });

    modal.result.then(function () {
      defer.resolve();
    }, function () {
      defer.reject();
    });

    return defer.promise;
  };
});

abode.filter('capitalize', function() {
  return function(token) {
    return (typeof(token) === 'string') ? token.charAt(0).toUpperCase() + token.slice(1) : token;
  };
});
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
abode.directive('epochtime', ['$compile', function () {
  return {
    restrict: 'E',
    replace: 'true',
    scope: {
      time: '=',
      disabled: '@'
    },
    template: '<div class="epochtime"><div class="epochtime-hours"><button ng-click="increaseHour()"><i class="icon-pigpenv"></i></button><input type="text" ng-model="hours"><button ng-click="decreaseHour()"><i class="icon-pigpens"></i></button></div><div class="epochtime-label">:</div><div class="epochtime-minutes"><button ng-click="increaseMinute()"><i class="icon-pigpenv"></i></button><input type="text" ng-model="minutes"><button ng-click="decreaseMinute()"><i class="icon-pigpens"></i></button></div><div class="epochtime-meridian"><button ng-click="changeMeridian()">{{meridian}}</button></div></div>',
    link: function (scope) {
      scope.meridian = 'AM';
      var timeWatch, hourWatch, minuteWatch, meridianWatch;

      scope.$watch('disabled', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          if (newVal === 'true') {
            clearWatches();
          } else {
            scope.time = (!isNaN(scope.time)) ? scope.time : 0;
            scope.meridian = 'AM';

            splitTime();
          }
        }
      });

      var updateTime = function () {
        clearWatches();

        var h = 60 * 60 * scope.hours;
        var m = 60 * scope.minutes;
        var o = (scope.meridian === 'PM') ? (60 * 60 * 12) : 0;

        scope.time = h + m + o;

        makeWatches();
      };

      var splitTime = function () {
        clearWatches();

        scope.hours =  parseInt(scope.time / 60 / 60);
        scope.minutes =  parseInt(scope.time % (60 * 60) / 60);
        scope.meridian = (scope.hours >= 12) ? 'PM' : 'AM';

        console.log(scope.hours);
        if (scope.meridian === 'PM') {
          scope.hours = scope.hours - 12;
        }

        makeWatches();
      };

      scope.increaseHour = function () {
        scope.hours = parseInt(scope.hours, 10);
        if (scope.hours === 12 && scope.meridian === 'AM') {
          scope.hours = 1;
          scope.meridian = 'PM';
        } else if (scope.hours === 12 && scope.meridian === 'PM') {
          scope.hours = 1;
          scope.meridian = 'AM';
        } else {
          scope.hours += 1;
        }
      };

      scope.decreaseHour = function () {
        scope.hours = parseInt(scope.hours, 10);
        if (scope.hours === 1 && scope.meridian === 'AM') {
          scope.hours = 12;
          scope.meridian = 'PM';
        } else if (scope.hours === 1 && scope.meridian === 'PM') {
          scope.hours =12;
          scope.meridian = 'AM';
        } else {
          scope.hours -= 1;
        }
      };

      scope.increaseMinute = function () {
        scope.minutes = parseInt(scope.minutes, 10);
        if (scope.minutes === 59) {
          scope.minutes = 0;
          scope.increaseHour();
        } else {
          scope.minutes += 1;
        }
      };

      scope.decreaseMinute = function () {
        scope.minutes = parseInt(scope.minutes, 10);
        if (scope.minutes === 0) {
          scope.minutes = 0;
          scope.decreaseHour();
        } else {
          scope.minutes -= 1;
        }
      };
      var clearWatches = function () {
        if (hourWatch !== undefined) {
          hourWatch();
        }
        if (minuteWatch !== undefined) {
          minuteWatch();
        }
        if (meridianWatch !== undefined) {
          meridianWatch();
        }
        if (timeWatch !== undefined) {
          timeWatch();
        }
      };

      var makeWatches = function () {
        hourWatch = scope.$watch('hours', function (newVal, oldVal) {
          if (newVal !== oldVal) {
            updateTime();
          }
        });

        minuteWatch = scope.$watch('minutes', function (newVal, oldVal) {
          if (newVal !== oldVal) {
            updateTime();
          }
        });

        meridianWatch = scope.$watch('meridian', function (newVal, oldVal) {
          if (newVal !== oldVal) {
            updateTime();
          }
        });

        timeWatch = scope.$watch('time', function (newVal, oldVal) {
          if (newVal !== oldVal) {
            splitTime();
          }
        });
      };

      scope.changeMeridian = function () {
        scope.meridian = (scope.meridian === 'PM') ? 'AM' : 'PM';
      };

      if (scope.disabled === 'false') {
        scope.time = (!isNaN(scope.time)) ? scope.time : 0;

        splitTime();
      }

    }
  };
}]);
abode.directive('epochduration', ['$compile', function () {
  return {
    restrict: 'E',
    replace: 'true',
    scope: {
      time: '='
    },
    template: '<div class="epochtime"><div class="epochtime-days"><button ng-click="increaseDay()"><i class="icon-pigpenv"></i></button><input type="text" ng-model="days"><button ng-click="decreaseDay()"><i class="icon-pigpens"></i></button></div><div class="epochtime-label">:</div><div class="epochtime-hours"><button ng-click="increaseHour()"><i class="icon-pigpenv"></i></button><input type="text" ng-model="hours"><button ng-click="decreaseHour()"><i class="icon-pigpens"></i></button></div><div class="epochtime-label">:</div><div class="epochtime-minutes"><button ng-click="increaseMinute()"><i class="icon-pigpenv"></i></button><input type="text" ng-model="minutes"><button ng-click="decreaseMinute()"><i class="icon-pigpens"></i></button></div></div>',
    link: function (scope) {
      scope.time = scope.time || 0;
      var dayWatch, timeWatch, hourWatch, minuteWatch, meridianWatch;

      var updateTime = function () {
        clearWatches();

        var d = 60 * 60 * 24 * scope.days;
        var h = 60 * 60 * scope.hours;
        var m = 60 * scope.minutes;

        scope.time = h + m + d;

        makeWatches();
      };

      var splitTime = function () {
        clearWatches();

        scope.time = scope.time || 0;
        scope.days =  parseInt(scope.time / (60 * 60 * 24));
        scope.hours =  parseInt(scope.time / 60 / 60);
        scope.minutes =  parseInt(scope.time % (60 * 60) / 60);

        makeWatches();
      };

      scope.increaseDay = function () {
        scope.days = parseInt(scope.days, 10);
        scope.days += 1;
      };

      scope.decreaseDay = function () {
        scope.days = parseInt(scope.days, 10);
        if (scope.days === 0) {
          scope.days = 0;
        } else {
          scope.days -= 1;
        }
      };

      scope.increaseHour = function () {
        scope.hours = parseInt(scope.hours, 10);
        if (scope.hours === 23) {
          scope.hours = 0;
          scope.increaseDay();
        } else {
          scope.hours += 1;
        }
      };

      scope.decreaseHour = function () {
        scope.hours = parseInt(scope.hours, 10);
        if (scope.hours === 0) {
          scope.hours = 23;
          scope.decreaseDay();
        } else {
          scope.hours -= 1;
        }
      };

      scope.increaseMinute = function () {
        scope.minutes = parseInt(scope.minutes, 10);
        if (scope.minutes === 59) {
          scope.minutes = 0;
          scope.increaseHour();
        } else {
          scope.minutes += 1;
        }
      };

      scope.decreaseMinute = function () {
        scope.minutes = parseInt(scope.minutes, 10);
        if (scope.minutes === 0) {
          scope.minutes = 0;
          scope.decreaseHour();
        } else {
          scope.minutes -= 1;
        }
      };

      var clearWatches = function () {
        if (dayWatch !== undefined) {
          dayWatch();
        }
        if (hourWatch !== undefined) {
          hourWatch();
        }
        if (minuteWatch !== undefined) {
          minuteWatch();
        }
        if (meridianWatch !== undefined) {
          meridianWatch();
        }
        if (timeWatch !== undefined) {
          timeWatch();
        }
      };

      var makeWatches = function () {
        dayWatch = scope.$watch('days', function (newVal, oldVal) {
          if (newVal !== oldVal) {
            updateTime();
          }
        });

        hourWatch = scope.$watch('hours', function (newVal, oldVal) {
          if (newVal !== oldVal) {
            updateTime();
          }
        });

        minuteWatch = scope.$watch('minutes', function (newVal, oldVal) {
          if (newVal !== oldVal) {
            updateTime();
          }
        });

        meridianWatch = scope.$watch('meridian', function (newVal, oldVal) {
          if (newVal !== oldVal) {
            updateTime();
          }
        });

        timeWatch = scope.$watch('time', function (newVal, oldVal) {
          if (newVal !== oldVal) {
            console.log('time change', newVal, oldVal);
            splitTime();
          }
        });
      };

      scope.changeMeridian = function () {
        scope.meridian = (scope.meridian === 'PM') ? 'AM' : 'PM';
      };


      splitTime();
    }
  };
}]);
abode.directive('toggle', function () {
  return {
    restrict: 'E',
    transclude: false,
    scope: {
      on: '@',
      off: '@',
      value: '=',
    },
    controller: function ($scope) {
      $scope.styles = {};
      $scope.value = ($scope.value === true) ? true : false;

      if (!$scope.on) { $scope.on = 'On'; }
      if (!$scope.off) { $scope.on = 'Off'; }

      var setStyles = function () {
        if ($scope.value) {
          $scope.styles.left = '1em';
        } else {
          $scope.styles.left = '0em';
        }
      };

      setStyles();

      $scope.styles = {
        'top': '0em',
        'bottom': '0em',
        'width': '1em',
        'background-color': '#eee',
        'box-sizing': 'border-box',
        'position': 'absolute',
        'transition': '.2s',
        'border-radius': '.1em',
      };

      $scope.toggle = function () {
        if ($scope.value) {
          $scope.value = false;
        } else {
          $scope.value = true;
        }
      };

      $scope.$watch('value', function () {
        setStyles();
      }, true);

    },
    template: '<div ng-click="toggle()" ng-class="{\'bg-success\': (value == true)}" style="border-radius: .1em; cursor: pointer; transition: .2s; position: relative; box-sizing: border-box; width: 2em; height: 1em; line-height: 1em; display:inline-block; border: 1px solid #aaa;"><div ng-style="styles"></div></div>',
    replace: true,
  };
});
abode.directive('stopEvent', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attr) {
      element.bind('click', function (e) {
          e.stopPropagation();
      });
    }
  };
});
abode.directive('content', function () {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      format: '@',
      top: '@',
      bottom: '@',
      left: '@',
      right: '@',
      height: '@',
      width: '@',
      align: '@',
      valign: '@',
      size: '@',
      background: '@',
      color: '@',
      shadow: '@',
      margin: '@'
    },
    controller: function ($scope) {
      $scope.outerStyles = {};
      $scope.innerStyles = {};

      if ($scope.top) { $scope.outerStyles.top = ($scope.top.indexOf('%') === -1) ? $scope.top + 'em' : $scope.top; }
      if ($scope.bottom) { $scope.outerStyles.bottom = ($scope.bottom.indexOf('%') === -1) ? $scope.bottom + 'em' : $scope.bottom; }
      if ($scope.left) { $scope.outerStyles.left = ($scope.left.indexOf('%') === -1) ? $scope.left + 'em' : $scope.left; }
      if ($scope.right) { $scope.outerStyles.right = ($scope.right.indexOf('%') === -1) ? $scope.right + 'em' : $scope.right; }
      if ($scope.height) { $scope.outerStyles.height = ($scope.height.indexOf('%') === -1) ? $scope.height + 'em' : $scope.height; }
      if ($scope.width) { $scope.outerStyles.width = ($scope.width.indexOf('%') === -1) ? $scope.width + 'em' : $scope.width; }
      if ($scope.align) { $scope.innerStyles['text-align'] = $scope.align; }
      if ($scope.valign) { $scope.innerStyles['vertical-align'] = $scope.valign; }
      if ($scope.size) { $scope.innerStyles['font-size'] = $scope.size + 'em'; }
      if ($scope.background) { $scope.outerStyles.background = $scope.background; }
      if ($scope.color) { $scope.innerStyles.color = $scope.color; }
      if ($scope.shadow) { $scope.innerStyles['text-shadow'] = $scope.shadow; }
      if ($scope.margin) { $scope.innerStyles.margin = (isNaN($scope.margin)) ? $scope.margin : $scope.margin + 'em'; }

    },
    template: '<div class="content" ng-style="outerStyles"><div style="display:table; height: 100%; width: 100%"><div style="display:table-cell;" ng-style="innerStyles" ng-transclude></div></div></div>',
    replace: true,
  };
});

abode.service('datetime', function ($interval, $http, $state) {

  var obj = {is: {}};
  var updater;

  var parseDetails = function (response) {
    obj.time = response.data.time;
    obj.is = response.data.is;
  };

  var getDetails = function () {
    if ($state.current.name !== 'index.home') {
      $interval.cancel(updater);
      return;
    }
    $http({ url: '/api/time' }).then(parseDetails);
  };

  var updateTime = function () {
    obj.date = new Date();
  };

  updateTime();
  getDetails();

  $interval(updateTime, 200);
  updater = $interval(getDetails, 1000 * 60);

  return {
    get: function () {
      return obj;
    }
  };
});

abode.directive('datetime', function () {

  return {
    restrict: 'E',
    transclude: true,
    scope: {
      format: '@',
      top: '@',
      bottom: '@',
      left: '@',
      right: '@',
      height: '@',
      width: '@',
      align: '@',
      size: '@',
      background: '@',
      color: '@',
      shadow: '@',
      margin: '@'
    },
    controller: function ($scope, $filter, $interval, datetime) {
      $scope.styles = {position: 'absolute'};
      $scope.now = datetime.get();
      $scope.format = $scope.format || 'short';
      $scope.interval = $scope.interval || 1;

      if ($scope.top) { $scope.styles.top = $scope.top + 'em'; }
      if ($scope.bottom) { $scope.styles.bottom = $scope.bottom + 'em'; }
      if ($scope.left) { $scope.styles.left = $scope.left + 'em'; }
      if ($scope.right) { $scope.styles.right = $scope.right + 'em'; }
      if ($scope.height) { $scope.styles.height = $scope.height + 'em'; }
      if ($scope.width) { $scope.styles.width = $scope.width + 'em'; }
      if ($scope.align) { $scope.styles['text-align'] = $scope.align; }
      if ($scope.size) { $scope.styles['font-size'] = $scope.size + 'em'; }
      if ($scope.background) { $scope.styles.background = $scope.background; }
      if ($scope.color) { $scope.styles.color = $scope.color; }
      if ($scope.shadow) { $scope.styles['text-shadow'] = $scope.shadow; }
      if ($scope.margin) { $scope.styles.margin = (isNaN($scope.margin)) ? $scope.margin : $scope.margin + 'em'; }

      $interval(function () {
        $scope.formatted = $filter('date')($scope.now.date, $scope.format);
      }, $scope.interval * 1000);

    },
    template: '<div class="datetime" ng-style="styles">{{formatted}}</div>',
    replace: true,
  };

});
