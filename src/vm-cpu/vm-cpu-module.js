angular
  .module('apf.vmCpuModule', ['ngResource'])
  .config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider
      .when('/vm-cpu', {
        templateUrl: 'src/vm-cpu/vm-cpu.html'
      });
  }])
  .directive('tmsNotificationCenter',
    function () {
      'use strict';
      return {
        restrict: 'EA',
        transclude: true,
        scope: {
          notifications: '='
        },
        templateUrl: 'src/vm-cpu/tms-notification-center.html'
      };
    })
;
