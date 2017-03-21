angular
  .module('apf.vmMemory.memoryModule')
  .controller('vmMemory.memoryController', [ '$scope', 'MemoryService',
    function ($scope, MemoryService) {
      'use strict';
      MemoryService.query({}, function success (result) {
        var response = JSON.parse(result.message).response;
        var isGenerational = response.length && angular.isDefined(response[0].generations);
        if (isGenerational) {
          $scope.templateUrl = 'src/vm-memory/memory/generational.html';
          $scope.layoutInline = { type: 'inline' };
          $scope.data = [];
          for (var i = 0; i < response.length; i++) {
            var gens = response[i].generations;
            for (var j = 0; j < gens.length; j++) {
              var g = gens[j];
              for (var k = 0; k < g.spaces.length; k++) {
                var space = g.spaces[k];
                $scope.data.push({
                  title : space.name,
                  data : {
                    used : parseInt(space.used.$numberLong),
                    total : parseInt(space.capacity.$numberLong)
                  }
                });
              }
            }
          }
        } else {
          $scope.templateUrl = 'src/vm-memory/memory/generic.html';
        }
      });

      $scope.parseDate = function (timeStamp) {
        return new Date(parseInt(timeStamp.$numberLong));
      };
    }
  ]);
