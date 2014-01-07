
/**
 * ------------------------------------------------------------------------
 * Projects Controllers
 * ------------------------------------------------------------------------
 */

angular.module('karma.reports')

  /* Main Controller
  --------------------- */
  .controller('KarmaReportsCtrl', function ($scope, Reports) {

    // Make the data available to scope.
    $scope.reports = Reports;

  });
