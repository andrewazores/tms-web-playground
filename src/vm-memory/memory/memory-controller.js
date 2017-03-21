angular
  .module('apf.vmMemory.memoryModule')
  .controller('vmMemory.memoryController', [ '$scope', 'MemoryService',
    function ($scope, MemoryService) {
      'use strict';
      MemoryService.query({}, function success (result) {
        $scope.data = JSON.parse(result.message).response;
        console.log($scope.data);
      });

      $scope.parseDate = function (timeStamp) {
        return new Date(parseInt(timeStamp.$numberLong));
      };
    }
  ]);
