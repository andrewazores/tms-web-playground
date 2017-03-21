angular
  .module('apf.vmMemory.memoryModule')
  .factory('MemoryService', [ '$resource',
    function ($resource) {
      'use strict';
      return $resource('http://localhost:30000/jvm-memory/0.0.1/jvm-memory', { limit: 1 }, {
        query: {
          method: 'GET'
        }
      });
    }
  ]);
