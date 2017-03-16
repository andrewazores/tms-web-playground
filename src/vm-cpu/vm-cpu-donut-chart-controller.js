angular.module('apf.vmCpuModule').controller('vmCpuDonutChartController', ['$scope', '$interval', 'CpuStats',
  function VmCpuDonutChartController($scope, $interval, CpuStats) {
    'use strict';
    $scope.config = {
      units: 'CPU %',
      thresholds: {
        warning: 40,
        error: 85
      }
    };
    $scope.data = {
      used: 0,
      total: 100
    };

    $interval(function() {
      CpuStats.query({}, function(result) {
        var usage = result.response[0].perProcessorUsage;
        var sum = 0;
        for (var i = 0; i < usage.length; i++) {
          sum += usage[i];
        }
        sum = Math.floor(sum / usage.length);
        $scope.data = {
          used: sum,
          total: 100
        };
      });
    }, 2000);
  }]);
