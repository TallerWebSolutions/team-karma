
/**
 * ------------------------------------------------------------------------
 * Authentication Directives
 * ------------------------------------------------------------------------
 */

angular.module('auth')

  /* User Authentication
  ---------------------- */
  .directive('userAuth', function () {
    return {
      // Work as a hole element.
      restrict: 'E',

      // Replace with template.
      templateUrl: 'partials/auth/user-auth.html',
      replace: true,

      // Parse attributes to directive's scope.
      scope: true,
      controller: 'UserAuthCtrl'
    }
  });
