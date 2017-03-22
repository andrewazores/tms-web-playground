angular.module ('apf.vmMemoryModule',
  ['apf.vmMemory.memoryModule',
   'apf.vmMemory.tlabModule'
  ])
  .config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider
      .when('/vm-memory', {
        redirectTo: '/vm-memory/memory'
      })
      .when('/vm-memory/memory', {
        templateUrl: 'src/vm-memory/memory/memory.html'
      })
      .when('/vm-memory/tlab', {
        templateUrl: 'src/vm-memory/tlab/tlab.html',
        controller: 'vmMemory.tlabController'
      });
  }]);
