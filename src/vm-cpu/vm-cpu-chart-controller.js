angular.module('apf.vmCpuModule').controller('vmCpuChartController', ['$scope', '$interval', 'CpuStats',
  function VmCpuChartController ($scope, $interval, CpuStats) {
    'use strict';

    this.xLabel = 'dates';
    this.yLabel = 'used';
    this.timeStamps = [];
    this.usages = [];
    this.updateFailedNotification = {
      type: 'danger',
      header: 'Update failed.',
      message: 'Unable to retrieve CPU stats.'
    };

    $scope.data = {
      used: 0,
      total: 100,
      xData: [this.xLabel],
      yData: [this.yLabel]
    };
    $scope.donutConfig = {
      thresholds: {
        warning: Math.floor(0.4 * $scope.data.total),
        error: Math.floor(0.85 * $scope.data.total)
      }
    };
    $scope.sparklineConfig = {
      axis: {
        y: {
          max: $scope.data.total
        }
      }
    };
    $scope.config = {
      title: 'CPU Utilization',
      units: 'CPU %'
    };

    var self = this;
    var update = function () {
      if (!$scope.refreshEnabled) {
        return;
      }
      CpuStats.query({}, function success (result) {
        var usage = result.response[0].perProcessorUsage;
        var cpuCount = usage.length;
        var time = new Date(parseInt(result.response[0].timeStamp.$numberLong));

        var sum = Math.floor(_.sum(usage) / cpuCount);

        $scope.data.used = sum;
        self.timeStamps.push(time);
        self.usages.push(sum);

        $scope.data.xData = _.union([self.xLabel], _.takeRight(self.timeStamps, $scope.samplePeriod));
        $scope.data.yData = _.union([self.yLabel], _.takeRight(self.usages, $scope.samplePeriod));

        $scope.removeNotification(self.updateFailedNotification);
      }, function failure (result) {
        $scope.addNotification(self.updateFailedNotification);
      });
    };
    update();

    var stop = function () {
      if (angular.isDefined(self.updateTask)) {
        $interval.cancel(self.updateTask);
        self.updateTask = undefined;
      }
    };

    $scope.$watch('updateFreq', function (newVal, oldVal) {
      stop();
      self.updateTask = $interval(update, newVal * 1000);
    });

    $scope.$on("$destroy", stop);
  }]);
