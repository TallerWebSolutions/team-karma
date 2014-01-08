
/**
 * ------------------------------------------------------------------------
 * Karma Router
 * ------------------------------------------------------------------------
 * Karma related routing settings.
 */

angular.module('karma')
  
  /* Routing Configuration
  ------------------------ */
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

      // Define main Karma state.
      .state('karma', {
        url: '/karma',
        requireLogin: true,
        abstract: true,
        template: '<div ui-view></div>'
      })

      // Define Karma race state.
      .state('karma.race', {
        url: '/race',
        controller: 'KarmaRaceCtrl',
        templateUrl: 'partials/karma/race.html'
      })

      // Define Karma reports state.
      .state('karma.reports', {
        url: '/reports',
        controller: 'KarmaReportsCtrl',
        templateUrl: 'partials/karma/reports.html'
      });

  });
