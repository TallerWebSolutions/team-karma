
/**
 * ------------------------------------------------------------------------
 * Karma Reports Directives
 * ------------------------------------------------------------------------
 */

angular.module('karma.reports')

  /* User Authentication
  ---------------------- */
  .directive('editReport', function () {
    return {
      // Work as a hole element.
      restrict: 'A',

      // Parse attributes to directive's scope.
      link: function() {

      }
    }
  });
