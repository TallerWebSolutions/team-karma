
/**
 * ------------------------------------------------------------------------
 * Util Directives
 * ------------------------------------------------------------------------
 * Some utility directives.
 */

angular.module('Util')
  
  /**
   * Makes a element draggable.
   */
  .directive('andyDraggable', function() {
    return {
      restrict: 'A',
      link: function(scope, elm, attrs) {
        var options = scope.$eval(attrs.andyDraggable); //allow options to be passed in
        elm.draggable(options);
      }
    };
  });

  /**
   * Prints stylesheets on the page.
   */
  // .directive('utilStylesheets', function(stylesheets) {

  //   // Define the directive.
  //   var directive = {
  //     restrict: 'AE',
  //     templateUrl: 'partials/util/stylesheets.html'
  //   }

  //   return directive;
  // });