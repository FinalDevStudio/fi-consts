'use strict';

const merge = require('merge');
const path = require('path');
const walk = require('walk');
const is = require('fi-is');

var debug = function () {};

exports = module.exports = {};

Object.defineProperty(module.exports, 'load', {
  value: function init(config) {
    if (is.not.object(config)) {
      throw new Error('The config parameter must be an [Object]!');
    }

    /* Check debug type */
    if (is.function(config.debug)) {
      debug = config.debug;
    } else if (config.debug) {
      debug = console.log;
    }

    if (is.not.string(config.basedir)) {
      throw new Error(
        'The config\'s basedir property must be a [String]!');
    }

    debug(config);

    walk.walkSync(config.basedir, {
      listeners: {
        file: (root, stats, next) => {
          if (path.extname(stats.name) !== '.json') {
            return next();
          }

          debug(root, stats.name);

          var parent = exports = module.exports;
          var propPath = root.replace(stats.name, '') // Strip file name
            .replace(config.basedir, '') // Strip the basedir path
            .replace(/^[\/\\]+|[\/\\]+$/g, '') // Trim slashes
            .toUpperCase(); // Make uppercase

          debug('PROP_PATH: %s (%d)', propPath, propPath.length);

          // Define object paths if any
          if (propPath.length) {
            propPath = propPath.split(/[\/\\]/);
            propPath.forEach((prop) => {
              if (!parent[prop]) {
                parent[prop] = {};
              }

              parent = parent[prop];
            });
          }

          var name = path.basename(stats.name, '.json').toUpperCase();
          var data = require(path.join(root, stats.name));
          var curr = parent[name];

          if (is.object(data) && is.object(curr || {})) {
            parent[name] = merge.recursive(parent[name] || {}, data);
          } else if (is.array(data) && is.array(curr || [])) {
            parent[name] = (parent[name] || []).concat(data);
          } else {
            throw new Error('Incompatible data types! ' + name +
              ': ' +
              Object.prototype.toString.call(data) +
              ' !== ' +
              Object.prototype.toString.call(parent[name])
            );
          }

          next();
        },

        errors: (root, stats) => {
          debug('Error!', stats[0].error);
          throw new Error(stats[0].error);
        }
      }
    });

    Object.freeze(module.exports);
  }
});
