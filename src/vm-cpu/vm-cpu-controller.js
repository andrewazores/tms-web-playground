angular.module('apf.vmCpuModule').controller('vmCpuController', ['$scope',
  function ($scope) {
    'use strict';
    $scope.vmName = 'FooVm';
    $scope.dropdownActions = ['Action 1', 'Action 2'];
  }
]);
