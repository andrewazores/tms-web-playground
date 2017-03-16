angular.module('apf.vmCpuModule').controller('vmCpuChartController', ['$scope', '$interval', 'CpuStats',
  function VmCpuChartController($scope, $interval, CpuStats) {
    'use strict';
    $scope.donutConfig = {
      thresholds: {
        warning: 40,
        error: 85
      }
    };
    $scope.sparklineConfig = {
    };
    $scope.config = {
      title: 'CPU Utilization',
      units: 'CPU %'
    };
    $scope.data = {
      used: 0,
      total: 100,
      xData: ['dates'],
      yData: ['used']
    };
    var self = this;

    $interval(function() {
      CpuStats.query({}, function(result) {
        var usage = result.response[0].perProcessorUsage;
        var time = new Date(parseInt(result.response[0].timeStamp.$numberLong));
        var sum = 0;
        for (var i = 0; i < usage.length; i++) {
          sum += usage[i];
        }
        sum = Math.floor(sum / usage.length);
        $scope.data.used = sum;
        $scope.data.xData.push(time);
        $scope.data.yData.push(sum);
      });
    }, 2000);
  }]);
