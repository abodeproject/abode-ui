
var settings = angular.module('abode.settings');

settings.controller('clientEdit', function ($scope, abode, interfaces, device) {
  $scope.dht_sensors = ['', 'DHT11', 'DHT22', 'AM2302'];
  $scope.interfaces = interfaces;
  $scope.device = device;

  $scope.push_supported = ('serviceWorker' in navigator);

  $scope.subscribe = function () {
    Notification.requestPermission();

    navigator.serviceWorker.register('worker.js').then(function(reg) {
      $scope.serviceWorker_status = 'ok';

      if (!(reg.showNotification)) {
        $scope.pushNotifications_status = 'unsupported';
      } else {
        $scope.pushNotifications_status = 'supported';
      }

      /*
      navigator.serviceWorker.ready.then(function(reg) {
        //Update our worker
        reg.update();

        reg.pushManager.getSubscription()
        .then(function (subscription) {

          if (!subscription) {
            $scope.subscribed = false;
            $scope.subscription_status = 'unsubscribed';
            $scope.$apply();
            return;
          }

          $scope.push_endpoint = subscription.endpoint;
          $scope.push_key = btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('p256dh'))));
          $scope.push_auth = btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('auth'))));

        })
        .catch(function(err) {
          console.log('Error during getSubscription()', err);
          $scope.subscription_status = 'error';
        });
      });
        */
    });

    navigator.serviceWorker.ready.then(function(reg) {
      reg.pushManager.subscribe({userVisibleOnly: true})
        .then(function(subscription) {

          $scope.device.config.push_notifications = true;
          $scope.device.config.push_endpoint = subscription.endpoint;
          $scope.device.config.push_key = btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('p256dh'))));
          $scope.device.config.push_auth = btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('auth'))));

          $scope.save();
        })
        .catch(function(e) {
          abode.message({'type': 'failed', 'message': 'Failed to get push subscription: ' + e});
          console.log('Failed to get subscription:', e);
        });
    });

  };

  $scope.unsubscribe = function () {

    $scope.device.config.push_notifications = false;
    delete $scope.device.config.push_endpoint;
    delete $scope.device.config.push_key;
    delete $scope.device.config.push_auth;

    $scope.save();
  };

  $scope.save = function () {
    $scope.device.$update().then(function (result) {
      angular.merge(abode.config.auth.device.config, result.config);
      abode.message({'type': 'success', 'message': 'Client Saved'});
    }, function (err) {
      abode.message({'type': 'failed', 'message': err.data });
    });
  };
});
