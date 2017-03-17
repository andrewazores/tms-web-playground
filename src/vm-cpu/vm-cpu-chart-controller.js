angular.module('apf.vmCpuModule').controller('vmCpuChartController', ['$scope', '$interval', 'CpuStats', 'DataUtil',
  function VmCpuChartController ($scope, $interval, CpuStats, DataUtil) {
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
    this.xLabel = 'dates';
    this.yLabel = 'used';
    this.timeStamps = [];
    this.usages = [];

    var self = this;
    var update = function () {
      CpuStats.query({}, function (result) {
        var usage = result.response[0].perProcessorUsage;
        var time = new Date(parseInt(result.response[0].timeStamp.$numberLong));
        var sum = 0;
        for (var i = 0; i < usage.length; i++) {
          sum += usage[i];
        }
        sum = Math.floor(sum / usage.length);

        $scope.data.used = sum;
        self.timeStamps.push(time);
        self.usages.push(sum);

        $scope.data.xData = DataUtil.assemble(self.xLabel, DataUtil.trim(self.timeStamps, 15));
        $scope.data.yData = DataUtil.assemble(self.yLabel, DataUtil.trim(self.usages, 15));
      });
    };
    $interval(update, 2000);
    update();
  }]);
