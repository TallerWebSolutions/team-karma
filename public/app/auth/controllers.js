
/**
 * ------------------------------------------------------------------------
 * Authentication Controllers
 * ------------------------------------------------------------------------
 */

angular.module('auth')

  /* Application Start Listener
  ----------------------------- */
  .controller('UserAuthCtrl', function ($rootScope, $scope, authentication) {

    // Make auth object available to scope.
    $scope.auth = authentication;

    // Define login method.
    $scope.login = function(service) {
      authentication.$login(service || 'facebook');
    };

    // Define logout method.
    $scope.logout = function() {
      authentication.$logout();
    };
  });
