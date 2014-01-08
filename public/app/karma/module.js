
/**
 * ------------------------------------------------------------------------
 * Karma Module Manifest
 * ------------------------------------------------------------------------
 * This file is responsible for instantiating the module itself.
 */

angular.module('karma',
  
  /* Module Dependencies
  --------------------------- */
  [
    'persistence',
    'auth',
    'karma.reports'
  ])

  /* Karma Configuration
  ---------------------------- */
  .config(function (persistenceProvider) {

    // Set base persistence path.
    persistenceProvider.setConnection({
      url: 'https://taller-karma.firebaseio.com/dev'
    });
  });
