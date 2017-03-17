angular
  .module('apf.dataUtilModule')
  .factory('DataUtil', [
    function () {
      'use strict';
      return {
        trim : function (arr, lim) {
          var newArr = arr.slice();
          while (newArr.length > lim) {
            newArr.shift();
          }
          return newArr;
        },

        assemble: function (title, samples) {
          return [title].concat(samples);
        }

      };
    }
  ]);
