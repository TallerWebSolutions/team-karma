
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
    'firebase'
  ])

  /* Karma Configuration
  ---------------------------- */
  .config(function (persistenceConfigProvider) {

    // Set base persistence path.
    persistenceConfigProvider.setUrl('https://taller-karma.firebaseio.com/dev');
  });
