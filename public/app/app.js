
/**
 * ------------------------------------------------------------------------
 * Main Application Module
 * ------------------------------------------------------------------------
 * This script is the first dependency after requiring AngularJS. It
 * starts the main app module as well as requires other dependencies
 * that might be needed by application.
 */

angular.module(window.app.name,
  
  /* Application Dependencies
  --------------------------- */
  ['ngRoute', 'ui.router', 'Util', 'karma'])

  /* Application Constants
  ------------------------ */
  .constant('AppConfig', window.app)

  /* Application Configuration
  ---------------------------- */
  .config(function (AppConfig, stylesheetsProvider) {

    // Set base stylesheet paths.
    stylesheetsProvider.setPath('styles/');
  })

  /* Application Start Listener
  ----------------------------- */
  .run(function ($rootScope, $state, $stateParams, stylesheets) {

    // Give easy access to states on all modules via rootScope.
    $rootScope.$state = $rootScope.$prevState = $state;
    $rootScope.$stateParams = $rootScope.$prevStateParams = $stateParams;

    // Track state changes.
    $rootScope.$on('$stateChangeSuccess', function (e, to, toParams, from, fromParams) {
      
      // Update previous state info.
      $rootScope.$prevState = to;
      $rootScope.$prevStateParams = toParams;

      // Clean state stylesheets.
      stylesheets.remove({ group: 'state' });

      // Avoid errors when name is not set.
      if (to.name) {
        var parts = to.name.split('.');

        parts.forEach(function(part, index) {
          stylesheets.add({
            source: parts.slice(0, index+1).join('/'),
            group: 'state'
          });
        });
      }
    });
  });
