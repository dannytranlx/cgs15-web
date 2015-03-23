'use strict';

requirejs.config({
  paths: {
    modules: 'app/modules',
    backbone: 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
    'backbone.radio': 'https://cdnjs.cloudflare.com/ajax/libs/backbone.radio/0.9.0/backbone.radio.min',
    bootstrap: '//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min',
    jquery: '//code.jquery.com/jquery-1.11.2.min',
    marionette: 'https://cdnjs.cloudflare.com/ajax/libs/backbone.marionette/2.4.1/backbone.marionette',
    underscore: 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.2/underscore-min',
    'view-controller': 'lib/view-controller',
    Handlebars: '//cdnjs.cloudflare.com/ajax/libs/handlebars.js/3.0.0/handlebars.min',
    text: '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text',
    hbars: 'https://cdnjs.cloudflare.com/ajax/libs/requirejs-handlebars/0.0.2/hbars.min',
    firebase: 'https://cdn.firebase.com/js/client/2.2.3/firebase',
    'backbone.firebase': 'https://cdn.firebase.com/libs/backbonefire/0.5.1/backbonefire.min'
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
    'backbone.firebase': {
      deps: ['backbone', 'firebase']
    },
    'backbone.radio': {
      deps: ['backbone']
    },
    marionette: {
      exports: 'Marionette',
      deps: ['backbone']
    },
    'view-controller': {
      deps: ['marionette']
    },
    Handlebars: {
      exports: 'Handlebars'
    }
  },

  hbars: {
    extension: '.hbs', // default = '.html'
    compileOptions: {} // options object which is passed to Handlebars compiler
  }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/index']);
