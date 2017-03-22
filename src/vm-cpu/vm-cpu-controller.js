angular.module('apf.vmCpuModule').controller('vmCpuController', ['$scope',
  function ($scope) {
    'use strict';
    $scope.refreshEnabled = true;
    $scope.vmName = 'FooVm';
    $scope.updateFreq = '2';
    $scope.samplePeriod = '5';
    $scope.notifications = [];

    $scope.addNotification = function (notification) {
      if (_.indexOf($scope.notifications, notification)) {
        $scope.notifications.push(notification);
      }
    };

    $scope.removeNotification = function (notification) {
      _.remove($scope.notifications, _.identity(notification));
    };
  }
]);
