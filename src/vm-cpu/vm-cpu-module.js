angular
  .module('apf.vmCpuModule', ['ngResource', 'angular-uuid'])
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
  .factory('tmsNotificationService', ['uuid',
    function (uuid) {
      'use strict';

      var notifications = {};
      var listeners = {};

      var addOwner = function (owner) {
        if (!angular.isDefined(listeners[owner])) {
          listeners[owner] = [];
        }
        if (!angular.isDefined(notifications[owner])) {
          notifications[owner] = [];
        }
      };

      var notify = function (owner) {
        for (var i = 0; i < listeners[owner].length; i++) {
          listeners[owner][i](notifications[owner]);
        }
      };

      this.addListener = function (owner, listener) {
        addOwner(owner);
        listeners[owner].push(listener);
      };

      this.removeListener = function (owner, listener) {
        addOwner(owner);
        _.pull(listeners[owner], listener);
      };

      this.addNotification = function (owner, notification) {
        addOwner(owner);
        var id = uuid.v4();
        var n = {
          type: notification.type,
          header: notification.header,
          message: notification.message,
          id: id
        };
        notifications[owner].push(n);
        notify(owner);
        return id;
      };

      this.removeNotification = function (owner, id) {
        addOwner(owner);
        _.remove(notifications[owner], function (n) {
          return n.id === id;
        });
        notify(owner);
      };

      this.clearNotifications = function (owner) {
        addOwner(owner);
        notifications[owner] = [];
        notify(owner);
      };

      return {
        addListener: this.addListener,
        removeListener: this.removeListener,
        addNotification: this.addNotification,
        removeNotification: this.removeNotification,
        clearNotifications: this.clearNotifications
      };
    }]
  )
;
