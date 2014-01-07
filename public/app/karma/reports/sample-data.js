
/**
 * ------------------------------------------------------------------------
 * Karma Reports Sample Data
 * ------------------------------------------------------------------------
 */

angular.module('karma.reports')
  
  /* Reports Array
  ---------------- */
  .value('ReportsSampleData', [{
    target: [1, 4, 3],
    description: 'Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.',
    kind: 'positive'
  }, {
    target: [2, 3],
    description: 'Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    kind: 'negative'
  }]);
