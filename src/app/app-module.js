angular
  .module('apf.appModule', [
    'ngResource',
    'ngRoute',
    'ui.bootstrap',
    'pascalprecht.translate',
    'patternfly',
    'patternfly.toolbars',
    'patternfly.charts',

    // app-wide services
    'apf.notificationsModule',

    // VM-related plugins
    'apf.vmOverviewModule',
    'apf.vmCpuModule',
    'apf.vmProfilerModule',
    'apf.vmNumaModule',
    'apf.vmGcModule',
    'apf.vmMemoryModule',
    'apf.vmHeapAnalysisModule',
    'apf.vmIoModule',
    'apf.vmThreadsModule',
    'apf.vmCompilerModule',
    'apf.vmClassesModule',
    'apf.vmBytemanModule',
    'apf.vmNotificationsModule',
    'apf.vmNotesModule'
  ])
  .config(['$routeProvider', '$translateProvider',
    function ($routeProvider, $translateProvider) {
      'use strict';

      $routeProvider
        .when('/', {
          redirectTo: '/vm-cpu'
        })
        .when('/vm-cpu', {
          templateUrl: 'src/vm-cpu/vm-cpu.html'
        });

      $translateProvider.translations('default', 'en');
      $translateProvider.preferredLanguage('default');
    }
  ])
  .constant('thermostatWebServerUrl', 'http://127.0.0.1:3000');
