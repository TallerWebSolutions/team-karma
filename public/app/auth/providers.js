
/**
 * ------------------------------------------------------------------------
 * Authentication Providers
 * ------------------------------------------------------------------------
 */

angular.module('auth')
  
  /* Simple Authentication Factory
  -------------------------------- */
  .factory('authentication', function(persistence) {
    return persistence.auth();
  });
