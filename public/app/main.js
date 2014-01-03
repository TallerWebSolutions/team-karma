
/**
 * ------------------------------------------------------------------------
 * Main Application Starter
 * ------------------------------------------------------------------------
 * As we intend to use RequireJS to asynchronously start our app, we should
 * handle AngularJS bootstraping so that we make sure it only occurs after
 * we load all our modules and their dependencies.
 */

angular.element().ready(function() {

  /**
   * Generic Application Initiator.
   */
  function initiate(app) {
    // If no scope is given, use the document.
    // p.s.: Note that each DOM's element can have only one App attached to it.
    app.scope = app.scope || document;

    // If no modules where given to be initiated, try to initiate
    // the App name as a module.
    app.modules = app.modules || [app.name];

    // Initializing an App means bootstraping some modules into a given scope.
    angular.bootstrap(app.scope, app.modules);
  }

  // Start main App.
  initiate(window.app);
});