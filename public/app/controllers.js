
/**
 * ------------------------------------------------------------------------
 * Application Controllers
 * ------------------------------------------------------------------------
 * The application's main controllers.
 */

angular.module(window.app.name)
  
  .controller('StylesheetCtrl', function($scope, stylesheets) {

    // Bind.
    $scope.stylesheets = stylesheets.get();

    // Listen to stylesheet changes.
    stylesheets.onChange(function() {
      $scope.stylesheets = stylesheets.get();
    });
  });
