'use strict';

requirejs.config({
  paths: {
    modules: 'app/modules',
    backbone: 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
    bootstrap: '//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min',
    jquery: 'http://code.jquery.com/jquery-1.11.2.min',
    marionette: 'https://cdnjs.cloudflare.com/ajax/libs/backbone.marionette/2.4.1/backbone.marionette',
    underscore: 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.2/underscore-min'
  },

  shim: {
    jquery: {
      exports: '$'
    },
    underscore: {
      exports: '_'
    },
    backbone: {
      exports: 'Backbone',
      deps: ['jquery', 'underscore']
    },
    marionette: {
      exports: 'Marionette',
      deps: ['backbone']
    }
  }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/index']);
