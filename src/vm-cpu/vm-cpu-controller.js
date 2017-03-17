angular.module('apf.vmCpuModule').controller('vmCpuController', ['$scope',
  function ($scope) {
    'use strict';
    $scope.refreshEnabled = true;
    $scope.vmName = 'FooVm';
  }
]);
