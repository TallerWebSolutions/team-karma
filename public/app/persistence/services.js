
/**
 * ------------------------------------------------------------------------
 * Persistence Factories
 * ------------------------------------------------------------------------
 */

angular.module('persistence')
  
  /**
   * General configuration for persistence.
   */
  .provider('persistenceConfig', function() {
    
    // Base URL.
    var _url = 'https://element-tracker.firebaseio.com';

    /**
     * Defines a URL to be used on persistence bindings.
     */
    this.setUrl = function(url) { _url = url; };

    /**
     * Provider.
     */
    this.$get = function() {
      return {
        /**
         * Access function to the URL variable.
         */
        getURL: function() { return _url; }
      };
    };
  })

  /**
   * Persistence responsible factory.
   */
  .factory('persistence', function($firebase, persistenceConfig, Util) {

    // Get Firebase main URL from provider.
    var _url = persistenceConfig.getURL();

    // Cache references and Firebase objects.
    var _refs = {};

    var persistence = {
      /**
       * Main Firebase reference receiver.
       * Will always use an existing one, if available.
       */
      getReference: function(persistenceMap) {

        // Construct the reference URL.
        var url = _url + '/' + persistenceMap;

        // Return a cachable reference.
        return _refs[url] = _refs[url] || new Firebase(url);
      },
      /**
       * Extends a Firebase object with custom methods.
       */
      extend: function(fobj) {

        // Keep track of load state.
        var loaded = false;

        /**
         * Runs on load event or instantly if already loaded.
         */
        fobj.$loaded = function(callback) {
          loaded ? callback() : fobj.$on('loaded', callback);
        };

        /**
         * Runs on change eventor instantly if already loaded.
         */
        fobj.$onChange = function(callback) {
          loaded ? callback() : fobj.$on('change', callback);
        };

        /**
         * Find items by attribute.
         * Returns Firebase objects for the items.
         */
        fobj.$findByAttr = function(attrName, value) {
          var result = [];
          // Iterate items.
          fobj.$getIndex().forEach(function(key, index) {
            if (fobj[key] && fobj[key][attrName] && fobj[key][attrName] == value) {
              result.push(fobj.$child(key));
            }
          });
          return result;
        };

        /**
         * Find item by ID.
         * Returns a Firebase object for the item.
         */
        fobj.$findByID = function(id, idAttr) {
          idAttr = idAttr || 'id';
          return fobj.$findByAttr(idAttr, id)[0] || null;
        };

        /**
         * Bind a child.
         */
        fobj.$bindChild = function(scope, model, key) {

          // Default key to model's value.
          key = key || model;

          // Make the bond.
          projects.$child(key).$bind(scope, model);
        };

        /**
         * Bind a child by ID.
         */
        fobj.$bindChildByID = function(scope, model, id, idAttr) {
          var child = this.$findByID(id, idAttr);

          // Make bond.
          return child && child.$bind(scope, model) && true || false;
        };

        /**
         * Find the number above the current highest ID.
         */
        fobj.$nextID = function(idAttr, current, step) {

          // Parse defaults.
          idAttr = idAttr || 'id';
          step = step || 1;
          current = current || step;

          // Iterate items.
          fobj.$getIndex().forEach(function(key, index) {
            if (fobj[key] && fobj[key][idAttr] && fobj[key][idAttr] >= current) {
              current = parseInt(fobj[key][idAttr]) + step;
            }
          });
          return current;
        };

        /**
         * Replace $child method to extend children too.
         */
        var child = fobj.$child;
        fobj.$child = function(key) {

          // Create child.
          var pupil = child.call(fobj, key);

          // Extend child.
          persistence.extend(pupil);

          return pupil;
        };

        // Track state.
        fobj.$on('loaded', function() { loaded = true; });
      },
      /**
       * Main Firebase object receiver.
       * Will always use an existing one, if available.
       */
      getFirebaseObject: function(persistenceMap, original) {

        // Get a cachable reference.
        var ref = this.getReference(persistenceMap);

        // Get a Firebase object.
        var fobj = $firebase(ref);

        // If not explicitaly told to keep object as original, extend it.
        if (!original) { this.extend(fobj); }

        return fobj;
      },
      /**
       * Binds a scope variable to it's persistent equivalent.
       */
      bind: function($scope, attrName, persistenceMap) {

        // Simplify usage by defaulting to attrName when no map is specified.
        persistenceMap = persistenceMap || attrName;

        // Get a Firebase object.
        var fobj = this.getFirebaseObject(persistenceMap);

        // Bind the values.
        var promise = fobj.$bind($scope, attrName);

        // Return workable promise.
        return promise;
      },
      /**
       * Executes a callback when multiple Firebase objects have loaded.
       */
      onLoad: function(fobjs, callback) {

        // Set initiating loaded amount status.
        var loaded = 0;

        // Callback runner.
        function tryNow() {
          if (++loaded == fobjs.length) {
            callback();
          }
        }

        // Iterate given persistence objects.
        fobjs.forEach(function(fobj) {
          // Check if object has the custom method.
          if (fobj.$loaded) {
            fobj.$loaded(tryNow);
          }
          // Otherwise, just count it as loaded.
          else {
            tryNow();
          }
        });
      }
    };

    // Return the tracker persistence factory.
    return persistence;
  });
