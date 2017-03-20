angular
  .module('apf.dataUtilModule')
  .factory('DataUtil', [
    function () {
      'use strict';
      return {
        assemble: function (title, samples) {
          return [title].concat(samples);
        }
      };
    }
  ]);
