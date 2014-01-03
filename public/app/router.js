
/**
 * ------------------------------------------------------------------------
 * Application Router
 * ------------------------------------------------------------------------
 * The main application router to serve rule based views.
 * Read more: https://github.com/angular-ui/ui-router/wiki
 */

angular.module(window.app.name)
  
  /* Routing Configuration
  ------------------------ */
  .config(function ($stateProvider, $urlRouterProvider) {
    
    // Redirect to home if URL not found.
    $urlRouterProvider.otherwise('/');

    $stateProvider

      // Define home state.
      .state('home', {
        url: '/', // '/' means this is the 'index' state.
        templateUrl: 'partials/home.html',  // Load template markup from a file.
      });
  });
