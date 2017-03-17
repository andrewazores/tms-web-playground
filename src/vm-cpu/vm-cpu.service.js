angular
  .module('apf.vmCpuModule')
  .factory('CpuStats', ['thermostatWebServerUrl', '$resource',
    function(thermostatWebServerUrl, $resource) {
      'use strict';
      return $resource(thermostatWebServerUrl + '/cpu-stats/latest', {}, {
        query: {
          method: 'GET'
        }
      });
    }]);
