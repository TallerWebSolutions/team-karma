
/**
 * ------------------------------------------------------------------------
 * Authentication Module Manifest
 * ------------------------------------------------------------------------
 * This file is responsible for instantiating the module itself.
 */

angular.module('auth',
  
  /* Module Dependencies
  --------------------------- */
  [
    'firebase',
    'persistence'
  ])

  /* Application Start Listener
  ----------------------------- */
  .run(function ($rootScope, $state, authentication) {

    // Make authetication information available to root scope.
    $rootScope.auth = authentication;

    // Listen for authentication login.
    $rootScope.$on('$firebaseAuth:login', function (e, user) {
      // Redirect to home or to previously required state.
      
    });

    // Listen for authentication logout.
    $rootScope.$on('$firebaseAuth:logout', function () {
      // Redirect to home, if login required on current state.
      if ($state.current.requireLogin) {
        $state.go('home');
      }
    });
  });
