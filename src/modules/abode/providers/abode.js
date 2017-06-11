
var abode = angular.module('abode');

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
  this.scope.status = {'connected': false, 'messages': 0, 'errors': 0};
  this.last_event = new Date();
  this.last_event = this.last_event.getTime();
  this.starting_events = false;

  this.get_events = function () {
    var eventSource;

    if (self.starting_events || self.scope.status.connected) {
      return;
    }

    self.starting_events = true;

    $http.post(self.url('/api/events').value(),{}, {'headers': $httpProvider.defaults.headers.common}).then(function (result) {
      var key = result.data.key;

      //Get the current time
      var now = new Date();
      now = now.getTime();

      //If it's been over 10 minutes, reset our event stream
      if ((now - self.last_event) > 1000 * 60 * 10) {
        this.last_event = now;
        self.scope.$broadcast('EVENTS_RESET', {});
      }

      self.eventSource = new EventSource(self.url('/api/events/feed/' + key + '?last=' + self.last_event).value());

      self.eventSource.addEventListener('message', function (msg) {
        var event = JSON.parse(msg.data);
        var client_name = (self.config.auth && self.config.auth.device && self.config.auth.device.name) ? self.config.auth.device.name : '';
        self.last_event = event.id;

        //If our client device got updated, update our auth object
        if (event.type === 'device' && event.object.name === client_name) {
          self.scope.$broadcast('CLIENT_UPDATED', event);
        }

        if (event.event) {
          self.scope.$broadcast(event.event, event);
        }
        self.scope.$broadcast('ABODE_EVENT', event);
        self.scope.status.messages += 1;


      }, false);

      self.eventSource.onopen = function () {
        self.scope.status.connected = true;
        self.starting_events = false;
        $timeout.cancel(self.event_error);
      };

      self.eventSource.onerror = function (err) {
        console.error('Event feed died');
        self.scope.status.errors += 1;
        self.scope.status.connected = false;
        self.starting_events = false;
        err.target.close();
        self.scope.$broadcast('EVENTS_DIED', err);
      };
    }, function (err) {
      console.dir('Failed to get event feed');
      self.starting_events = false;
      self.scope.status.connected = false;
      self.scope.$broadcast('EVENTS_DIED', err);
    });

  };

  this.scope.$on('EVENTS_DIED', function (event) {
    self.event_error = $timeout(function () {
      //self.message({'type': 'failed', 'message': 'Connection to Abode Died.', 'details': event});
      self.get_events();
    }, 5 * 1000);
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
      this.config = this.config || {'server': ''};
      this.config.server = this.config.server || '';

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

  this.lock = function () {

  };

  this.unlock = function () {

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
      lock: self.lock,
      unlock: self.unlock
    };
  };

}]);
