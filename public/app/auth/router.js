
/**
 * ------------------------------------------------------------------------
 * Authentication Router
 * ------------------------------------------------------------------------
 * Authentication related routing settings.
 */

angular.module('auth')

  /* Application Start Listener
  ----------------------------- */
  .run(function ($rootScope, $state, Util, authentication) {

    // Listen for state changes.
    $rootScope.$on('$stateChangeStart', function (e, to, toParams, from, fromParams) {

      // Construct the state hierarchy.
      var states = Util.namespaceHierarchy(to.name);

      // Check for authenticated user.
      if (!authentication || !authentication.user) {

        // Default to no requirement.
        var requireLogin = false;

        // Iterate hierarchi of states.
        for (var s = 0; s < states.length; s++) {
          requireLogin = typeof $state.get(states[s]).requireLogin != 'undefined' ? $state.get(states[s]).requireLogin : requireLogin;
        }
        
        // Check if state requires authetication.
        if (requireLogin) {

          // Tell user.
          Util.alert({
            title: 'Access Denied',
            content: 'You need to be logged in to access this state.'
          });

          // Stop state entrance.
          e.preventDefault();

          // If there is no concrete login-unrequired state to stay, go home.
          if (from.abstract || from.requiredLogin) {
            $state.go('home');
          }
        }
      }
    });
  });
