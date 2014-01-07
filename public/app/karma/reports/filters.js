
/**
 * ------------------------------------------------------------------------
 * Karma Reports Filters
 * ------------------------------------------------------------------------
 */

angular.module('karma.reports')
  
  /* Time Filter
  -------------- */
  .filter('TimePeriod', function() {
    return {
      apply: function($scope, items) {
        return items[0];
      }
    };
  });
