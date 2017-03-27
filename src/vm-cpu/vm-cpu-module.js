angular
  .module('apf.vmCpuModule', ['ngResource'])
  .config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider
      .when('/vm-cpu', {
        templateUrl: 'src/vm-cpu/vm-cpu.html'
      });
  }])
  .directive('tmsNotificationCenter', ['tmsNotificationService',
    function (tmsNotificationService) {
      'use strict';
      return {
        restrict: 'EA',
        transclude: true,
        scope: {
          owner: '='
        },
        templateUrl: 'src/vm-cpu/tms-notification-center.html',
        controller: ['$scope', '$element', '$attrs',
          function ($scope, $element, $attrs) {
            tmsNotificationService.addListener($attrs.owner, function (notifications) {
              $scope.notifications = notifications;
            });

            $scope.$on('$destroy', function () {
              tmsNotificationService.removeListener($attrs.owner);
            });
          }]
      };
    }
  ])
  .factory('tmsNotificationService', function () {
    'use strict';

    var notifications = [];
    var listeners = {};

    var addOwner = function (owner) {
      if (!angular.isDefined(listeners[owner])) {
        listeners[owner] = [];
      }
      if (!angular.isDefined(notifications[owner])) {
        notifications[owner] = new Set();
      }
    };

    this.addListener = function (owner, listener) {
      addOwner(owner);
      listeners[owner].push(listener);
    };

    this.removeListener = function (owner, listener) {
      addOwner(owner);
      _.pull(listeners, listener);
    };

    this.addNotification = function (owner, notification) {
      addOwner(owner);
      if (!notifications[owner].has(notification)) {
        notifications[owner].add(notification);
        for (var i = 0; i < listeners[owner].length; i++) {
          listeners[owner][i](Array.from(notifications[owner].values()));
        }
      }
    };

    this.removeNotification = function (owner, notification) {
      addOwner(owner);
      if (notifications[owner].has(notification)) {
        notifications[owner].delete(notification);
        for (var i = 0; i < listeners[owner].length; i++) {
          listeners[owner][i](Array.from(notifications[owner].values()));
        }
      }
    };

    this.clearNotifications = function (owner) {
      addOwner(owner);
      notifications[owner].clear();
    };

    return {
      addListener: this.addListener,
      removeListener: this.removeListener,
      addNotification: this.addNotification,
      removeNotification: this.removeNotification,
      clearNotifications: this.clearNotifications
    };
  })
;
