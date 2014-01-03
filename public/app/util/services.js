
/**
 * ------------------------------------------------------------------------
 * Util Service
 * ------------------------------------------------------------------------
 * A simple session service to make available many utillity methods.
 */

angular.module('Util')

  /**
   * Main Util Factory.
   */
  .factory('Util', function ($injector, $modal, $timeout) {

    // Extend Underscore lib, if available.
    var Util = _ || {};

    // Use jQuery extend method, if available.
    Util.extend = typeof jQuery != 'undefined' && jQuery.extend || Util.extend;

    /**
     * Returns the arguments os a function as key/value pairs of an object.
     * @param  {Function} callee    The callee function.
     * @param  {Array}    arguments The callee function's arguments.
     * @return {Object}             A object pairing arguments/values.
     */
    Util.objectArguments = function(args) {

      var annotation  = $injector.annotate(args.callee),
          object      = {},
          length      = Math.max(annotation.length, args.length);

      for(var i = 0; i < annotation.length; i++) {
        object[annotation[i] || i] = args[i] || null;
      }

      return object;
    };

    /**
     * Transform a string into a machine name, following rules.
     * @param  {String} string The text to be transformed.
     * @return {Object}        A object of options.
     */
    Util.toMachineName = function(source, settings) {

      // Default settings for transliteration.
      var defaultSettings = {
        maxlength: 32, // Max resulting length.
        replace: '_', // Replace unallowed chars with this.
        replacePattern: '^[^a-z_]|[^a-z0-9_]+' // Replace anything in this set.
      };

      // Crete settings object.
      settings = Util.extend(true, {}, defaultSettings, settings);

      // Create a regex for not allowed chars.
      var regExp = new RegExp(settings.replacePattern, 'g');

      // Return the transformed text.
      return source.toLowerCase()
                   .replace(regExp, settings.replace)
                   .substr(0, settings.maxlength);
    };

    /**
     * Use a modal to get a user confirmation.
     */
    Util.confirmation = function(settings) {

      // Set settings using defaults.
      settings = Util.extend(true, {
        title: 'Action Confirmation',
        message: 'Are you sure you want to proceed?'
      }, settings);

      // Instantiate confirmation modal.
      var modal = $modal.open({
        templateUrl: 'partials/util/confirmation.html',
        controller: function($scope) {
          // Make settings available to scope.
          $scope.settings = settings;

          /**
           * Handles confirmation.
           */
          $scope.confirm = function() {
            // Run confirmation callback.
            var stop = settings.confirm && settings.confirm();

            // Let user stop modal closure by returnin false from callback.
            if (stop !== false) {
              // Execute common ending code.
              $scope.finally();
            }
          };

          /**
           * Handles cancelation.
           */
          $scope.cancel = function() {
            // Run cancelation callback.
            var stop = settings.cancel && settings.cancel();

            // Let user stop modal closure by returnin false from callback.
            if (stop !== false) {
              // Execute common ending code.
              $scope.finally();
            }
          };

          /**
           * Final execution and closure.
           */
          $scope.finally = function() {
            // Run final callback.
            var stop = settings.finally && settings.finally();

            // Let user stop modal closure by returnin false from callback.
            if (stop !== false) {
              $scope.$dismiss();
            }
          }
        }
      });
    };

    /**
     * Inform user of something.
     */
    Util.alert = function(settings) {

      // Set settings using defaults.
      settings = Util.extend(true, {
        title: 'Notice',
        content: 'You\'ve done something cool!',
        button: {
          text: 'Ok',
          type: 'primary'
        }
      }, settings);

      // Instantiate confirmation modal.
      var modal = $modal.open({
        templateUrl: 'partials/util/alert.html',
        controller: function($scope) {
          // Make settings available to scope.
          $scope.settings = settings;

          /**
           * Final execution and closure.
           */
          $scope.finally = function() {
            // Run final callback.
            var stop = settings.finally && settings.finally();

            // Let user stop modal closure by returnin false from callback.
            if (stop !== false) {
              $scope.$dismiss();
            }
          }
        }
      });

      /**
       * Bootstrap 3.0 adjusment to modal's behaviors.
       */
      modal.opened.finally(function() {
        // Bootstrap 3.0 adjustment.
        jQuery('body').addClass('modal-open');
      });
      modal.result.finally(function() {
        // Bootstrap 3.0 adjustment.
        jQuery('body').removeClass('modal-open');
      });
    };

    /**
     * Handles a simple progress system.
     */
    Util.progress = function(total, duration) {
      this.total = total || 1;
      this.current = 0;

      duration = duration || total;

      // Reference.
      var progress = this;

      // Time duration for each step in miliseconds.
      var stepDuration = total / duration;
      var steping = 0;
      var waiting = false;

      /**
       * Register a step with an optional amount.
       */
      this.step = function(amount) {
        amount = typeof amount != 'undefined' ? amount : 1;
        steping += amount;
        progress.refresh();
      };

      /**
       * Gets a percentage (for current or optional amount)
       */
      this.percentage = function(asText, amount) {
        var perc = (amount || progress.current) / progress.total;
        return asText ? (perc * 100) + '%' : perc;
      };

      /**
       * Force a state refresh.
       */
      this.refresh = function() {
        if (!waiting && steping > 0) {
          waiting = true;
          $timeout(function() {
            waiting = false;
            steping--;
            progress.duration++;
            progress.refresh();
          }, stepDuration);
        }
      };
    };

    // Return the factory handler.
    return Util;
  })
  
  /**
   * Stylesheet Factory.
   */
  .provider('stylesheets', function() {

    // Base source path.
    var _path = '';

    /**
     * Defines the base path to the stylesheets.
     */
    this.setPath = function(path) { _path = path; };

    // Set the service getter.
    this.$get = function() {

      // Array of current active stylesheets.
      var stylesheets = [];

      /**
       * Helper function to parse the args.
       */
      function parseOptions(source, group) {

        var options = typeof source == 'string' ? {
          source: source
        } : source || {};

        // Define group, if set.
        if (group) options.group = group;

        // Set source base path if not set.
        if (options.source && options.source.indexOf(_path) != 0) {
          options.source = _path + options.source;
        }

        // Set file extension if not set.
        if (options.source && options.source.substr(-4) != '.css') {
          options.source += '.css';
        }

        return options;
      }

      // Define the factory;
      var factory = {
        /**
         * Adds a stylesheet to the page.
         * @param {[Object, string]} options A string or a object as follows:
         *                           - String: the path to the stylesheet
         *                           - Object: the following arguments:
         *                             - source: the path to the stylesheet
         *                             - group: the group it belong | 'global'
         */
        add: function(source, group) {

          // Parse the options.
          options = parseOptions(source, group);

          // Remove group if it equals 'unique'.
          if (options.group == 'unique') {
            delete options.group;
          }

          // Set to global group, if none set.
          if (!options.group) {
            options.group = 'global';
          }

          // Check if stylesheet isn't already set and we have a source.
          if (this.get(options).length == 0 && options.source) {
            stylesheets.push(options);
          }

          // Trigger change event.
          $(this).trigger('stylesheets.add', [options, stylesheets]);
        },

        /**
         * Get the stylesheet indexes that match the 'options' values.
         */
        getIndexes: function(options) {

          // Parse the options.
          options = parseOptions(options);

          // Grabber for matched stylesheet indexes.
          var result = [];

          // Iterate current stylesheets.
          stylesheets.forEach(function(stylesheet, index) {
            for(var o in options) {
              if (options[o] != stylesheet[o]) return;
            }
            result.push(index);
          });

          return result;
        },

        /**
         * Get the stylesheets that match the 'options' values.
         */
        get: function(options) {

          // Parse the options.
          options = parseOptions(options);

          // Grabber for matched stylesheets.
          var result = [];

          // Iterate current stylesheets.
          stylesheets.forEach(function(stylesheet) {
            for(var o in options) {
              if (options[o] != stylesheet[o]) return;
            }
            result.push(stylesheet);
          });

          return result;
        },

        /**
         * Removes the stylesheets that match the 'args' values.
         */
        remove: function(options) {

          // Parse the options.
          options = parseOptions(options);

          // Get matched stylesheet indexes.
          var matchedIndexes = this.getIndexes(options);

          // Grabber for removed items.
          var removed = [];

          // Remove the indexes.
          matchedIndexes.reverse().forEach(function(i) {
            removed.concat(stylesheets.splice(i, 1));
          });

          // Trigger change event.
          $(this).trigger('stylesheets.remove', [removed, stylesheets]);
          
          return removed;
        },

        /**
         * Register listeners for changes.
         */
        onChange: function(callback) {
          // @todo : avoid jQuery dependency.
          $(this).on('stylesheets.change', callback);
        }
      }

      // @todo : avoid jQuery dependency.

      $(factory).on('stylesheets.add stylesheets.remove', function(e, changed, stylesheets) {
        $(this).trigger('stylesheets.change', [changed, stylesheets])
      });


      return factory;
    }
  });
