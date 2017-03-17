angular
  .module('apf.vmCpuModule')
  .factory('CpuStats', ['thermostatWebServerUrl', '$resource',
    function(thermostatEndpoint, $resource) {
      'use strict';
      return $resource(thermostatEndpoint + '/cpu-stats/latest', {}, {
        query: {
          method: 'GET'
        }
      });
    }]);
