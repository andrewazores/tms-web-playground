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
        controller: [
          '$scope', '$element', '$attrs',
          function ($scope, $element, $attrs) {
            tmsNotificationService.addListener($attrs.owner, function (notifications) {
              $scope.notifications = Array.from(notifications);
            });

            $scope.$on('$destroy', function () {
              tmsNotificationService.removeListener($attrs.owner);
            });
          }
        ]
      };
    }
  ])
  .factory('tmsNotificationService', function () {
    'use strict';

    return {
      notifications: [],
      listeners: {},

      addListener: function (owner, listener) {
        this.listeners[owner] = listener;
      },

      removeListener: function (owner) {
        this.listeners[owner] = undefined;
      },

      addNotification: function (owner, notification) {
        if (!this.notifications[owner]) {
          this.notifications[owner] = new Set();
        }
        if (!this.notifications[owner].has(notification)) {
          this.notifications[owner].add(notification);
          this.listeners[owner](this.notifications[owner].values());
        }
      },

      removeNotification: function (owner, notification) {
        if (this.notifications[owner]) {
          if (this.notifications[owner].has(notification)) {
            this.notifications[owner].delete(notification);
            this.listeners[owner](this.notifications[owner].values());
          }
        }
      },

      clearNotifications: function (owner) {
        if (this.notifications[owner]) {
          this.notifications[owner].clear();
        }
      }
    };
  })
;
