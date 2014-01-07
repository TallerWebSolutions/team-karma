
/**
 * ------------------------------------------------------------------------
 * Util Directives
 * ------------------------------------------------------------------------
 * Some utility directives.
 */

angular.module('Util')
  
  /* Ui-Reference with Status
  --------------------------- */
  .directive('utilSref', function ($state, $compile) {
    return {
      restrict: 'A',
      replace: false,

      // This directive will insert other directives dynamically. We set
      // terminal=true to make this be the last directive to run and
      // priority=1000 (high number) to make it run first. Then we deal
      // with the creating of a new element with new directives and handle
      // the compilation manually.
      terminal: true,
      priority: 1000,
      compile: function (element, attrs) {
        // Insert ui-router directive.
        element.attr('ui-sref', attrs.utilSref);

        // Insert state status directive, if not already set.
        element.attr('util-state-status') || element.attr('util-state-status', attrs.utilSref);

        // Remove self-directive, to avoid looping.
        element.removeAttr('util-sref');

        // Compilation object.
        return {
          post: function (scope, element) {
            // Re-compile element.
            $compile(element)(scope);
          }
        }
      }
    };
  })

  /* Set Status for State Links
  ----------------------------- */
  .directive('utilStateStatus', function ($state, $compile) {
    return {
      restrict: 'A',
      link: function ($scope, element, attrs) {

        // Grab referenced state.
        var state = $state.get(attrs.utilStateStatus);

        // Define the target element.
        var parent = element.parent();
        var target = parent.is('li') ? parent : element;

        // Listen for state changes.
        $scope.$on('$stateChangeSuccess', function (e, to) {
          target.toggleClass('active', to.name == state.name);
        });
      }
    };
  });
