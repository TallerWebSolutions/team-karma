
/**
 * ------------------------------------------------------------------------
 * Karma Reports Router
 * ------------------------------------------------------------------------
 * Karma Reports related routing settings.
 */

angular.module('karma.reports')
  
  /* Routing Configuration
  ------------------------ */
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

      // Define karma reports main state.
      .state('karma.reports', {
        url: '/reports',
        controller: 'KarmaReportsCtrl',
        templateUrl: 'partials/karma/reports.html'
      });
  });
