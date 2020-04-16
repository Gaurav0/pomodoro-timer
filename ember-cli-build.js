'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'ember-cli-string-helpers': {
      only: ['html-safe']
    }
  });

  return app.toTree();
};
