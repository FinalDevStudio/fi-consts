'use strict';

const path = require('path');
const walk = require('walk');
const is = require('fi-is');

const CONSTS = {};

var debug = function () {};

module.exports = (config) => {
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
    throw new Error('The config\'s basedir property must be a [String]!');
  }

  console.log(config);

  walk.walkSync(config.basedir, {
    listeners: {
      file: (root, stats, next) => {
        if (path.extname(stats.name) !== '.json') {
          return next();
        }

        console.log(root, stats.name);

        var parent = CONSTS;
        var propPath = root.replace(stats.name, '')
          .replace(config.basedir, '').replace(/^[\/\\]+|[\/\\]+$/g, '')
          .toUpperCase();

        console.log('PROP_PATH: %s (%d)', propPath, propPath.length);

        if (propPath.length) {
          propPath = propPath.split(/[\/\\]/);

          propPath.forEach((prop) => {
            if (!parent[prop] || is.not.object(parent[prop])) {
              parent[prop] = {};
            }

            parent = parent[prop];
          });
        }

        var propName = path.basename(stats.name, '.json').toUpperCase();
        var propData = require(path.join(root, stats.name));

        parent[propName] = propData;

        next();
      },

      errors: (root, stats, next) => {
        debug('Could not register constants!\n', root, stats);
        next();
      }
    }
  });

  module.exports = CONSTS;

  Object.freeze(module.exports);

  return module.exports;
};
