angular
  .module('apf.vmCpuModule')
  .factory('CpuStats', ['$resource',
    function($resource) {
      'use strict';
      return $resource('http://127.0.0.1:3000/cpu-stats/latest', {}, {
        query: {
          method: 'GET'
        }
      });
    }]);
