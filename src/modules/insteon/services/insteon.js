
var insteon = angular.module('insteon');

insteon.service('insteon', function ($http, $q, abode, settings) {

  var get_config = function () {

    return settings.get_config('insteon');

  };

  var save_config = function (config) {

    return settings.save_config('insteon', config);

  };

  var status = function () {
    var defer = $q.defer();

    $http.get(abode.url('/api/insteon').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var enable = function () {
    var defer = $q.defer();

    $http.post(abode.url('/api/insteon/enable').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var disable = function () {
    var defer = $q.defer();

    $http.post(abode.url('/api/insteon/disable').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var beep = function (addr) {
    var defer = $q.defer();

    $http.post(abode.url('/api/insteon/devices/' + addr + '/beep').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var enterlinking = function (addr, group) {
    var defer = $q.defer();

    group = group || 1;
    $http.post(abode.url('/api/insteon/devices/' + addr + '/enter_linking_mode/' + group).value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var idrequest = function (addr) {
    var defer = $q.defer();

    $http.post(abode.url('/api/insteon/devices/' + addr + '/id_request').value()).then(function (response) {
      defer.resolve(response.data);
    }, function(err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var enterunlinking = function (addr, group) {
    var defer = $q.defer();

    group = group || 1;
    $http.post(abode.url('/api/insteon/devices/' + addr + '/enter_unlinking_mode/' + group).value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var exitlinking = function (addr) {
    var defer = $q.defer();

    $http.post(abode.url('/api/insteon/devices/' + addr + '/exit_linking_mode').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var delete_database_record = function (address, offset) {
    var defer = $q.defer();

    $http.delete(abode.url('/api/insteon/devices/' + address + '/database/' + offset).value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var rates = [
    {'value': 0, 'text': '9 min'},
    {'value': 1, 'text': '8 min'},
    {'value': 2, 'text': '7 min'},
    {'value': 3, 'text': '6 min'},
    {'value': 4, 'text': '5 min'},
    {'value': 5, 'text': '4.5 min'},
    {'value': 6, 'text': '4 min'},
    {'value': 7, 'text': '3.5 min'},
    {'value': 8, 'text': '3 min'},
    {'value': 9, 'text': '2.5 min'},
    {'value': 10, 'text': '2 min'},
    {'value': 11, 'text': '1.5 min'},
    {'value': 12, 'text': '1 min'},
    {'value': 13, 'text': '47 sec'},
    {'value': 14, 'text': '43 sec'},
    {'value': 15, 'text': '38.5 sec'},
    {'value': 16, 'text': '34 sec'},
    {'value': 17, 'text': '32 sec'},
    {'value': 18, 'text': '30 sec'},
    {'value': 19, 'text': '28 sec'},
    {'value': 20, 'text': '26 sec'},
    {'value': 21, 'text': '23.5 sec'},
    {'value': 22, 'text': '21.5 sec'},
    {'value': 23, 'text': '19 sec'},
    {'value': 24, 'text': '8.5 sec'},
    {'value': 25, 'text': '6.5 sec'},
    {'value': 26, 'text': '4.5 sec'},
    {'value': 27, 'text': '2.0 sec'},
    {'value': 28, 'text': '0.5 sec'},
    {'value': 29, 'text': '0.3 sec'},
    {'value': 30, 'text': '0.2 sec'},
    {'value': 31, 'text': '0.1 sec'}
  ];

  var get_devices = function () {
    var defer = $q.defer();

    $http.get(abode.url('/api/insteon/devices').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  var update_database_record = function (address, offset, record) {
    var defer = $q.defer();
    var data = angular.copy(record);

    if (data.on_level) {
      data.on_level = parseInt(data.on_level /100 * 255, 10);
    }

    $http.put(abode.url('/api/insteon/devices/' + address + '/database/' + offset).value(), data).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  var add_database_record = function (address, record) {
    var defer = $q.defer();
    var data = angular.copy(record);

    if (data.on_level) {
      data.on_level = parseInt(data.on_level /100 * 255, 10);
    }

    $http.post(abode.url('/api/insteon/devices/' + address + '/database').value(), data).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  var modem_get_database = function () {
    var defer = $q.defer();

    $http.get(abode.url('/api/insteon/database').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  var modem_load_database = function () {
    var defer = $q.defer();

    $http.post(abode.url('/api/insteon/load_database').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  var modem_start_all_linking = function (controller, group) {
    var defer = $q.defer();
    var url = (group) ? '/api/insteon/start_all_linking/' + group : '/api/insteon/start_all_linking';

    $http.post(abode.url(url).value(), {'conroller': controller}).then(function () {
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  var modem_cancel_all_linking = function (controller, group) {
    var defer = $q.defer();

    $http.post(abode.url('/api/insteon/cancel_all_linking').value()).then(function (response) {
      defer.resolve(response.data);
    }, function (err) {
      defer.reject(err.data);
    });

    return defer.promise;
  };

  return {
    get_config: get_config,
    save: save_config,
    status: status,
    enable: enable,
    disable: disable,
    beep: beep,
    enterlinking: enterlinking,
    enterunlinking: enterunlinking,
    exitlinking: exitlinking,
    delete_database_record: delete_database_record,
    rates: rates,
    get_devices: get_devices,
    update_database_record: update_database_record,
    add_database_record: add_database_record,
    idrequest: idrequest,
    modem_get_database: modem_get_database,
    modem_load_database: modem_load_database,
    modem_start_all_linking: modem_start_all_linking,
    modem_cancel_all_linking: modem_cancel_all_linking
  };

});
