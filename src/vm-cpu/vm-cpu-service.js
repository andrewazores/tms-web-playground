var useLiveData = false;
if (useLiveData) {
  angular
    .module('apf.vmCpuModule')
    .factory('CpuStats', ['thermostatWebServerUrl', '$resource',
      function (thermostatWebServerUrl, $resource) {
        'use strict';
        return $resource(thermostatWebServerUrl + '/cpu-stats/latest', {}, {
          query: {
            method: 'GET'
          }
        });
      }]);
} else {
  angular
    .module('apf.vmCpuModule')
    .factory('CpuStats', ['thermostatWebServerUrl', '$resource',
      function (thermostatWebServerUrl, $resource) {
        'use strict';
        return {
          query: function (config, onSuccess, onFailure) {
            onSuccess({
              response: [
                {
                  timeStamp: {
                    $numberLong: Date.now()
                  },
                  perProcessorUsage: [ Math.random() * 100 ]
                }
              ]
            });
          }
        };
      }]);
}
