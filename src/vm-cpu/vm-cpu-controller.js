angular.module('apf.vmCpuModule').controller('vmCpuController', ['$scope',
  function ($scope) {
    'use strict';
    $scope.refreshEnabled = true;
    $scope.vmName = 'FooVm';
    $scope.samplePeriod = "5";

    $('#updateFailedNotification').hide();
  }
]);
