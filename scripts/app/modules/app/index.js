define(function (require) {
  var Backbone = require('backbone');
  var Mn = require('marionette');
  var Radio = require('backbone.radio');

  // Shim to replace Backbone.Wreqr with Backbone.Radio
  Marionette.Application.prototype._initChannel = function () {
    this.channelName = _.result(this, 'channelName') || 'global';
    this.channel = _.result(this, 'channel') || Radio.channel(this.channelName);
  };

  // Tell jQuery to watch for any 401 or 403 errors and handle them appropriately
  $.ajaxSetup({
    statusCode: {
      401: function () {
        // Redirect the to the login page.
        window.location.replace('/#login');

      },
      403: function () {
        // 403 -- Access denied
        window.location.replace('/#denied');
      }
    }
  });

  // Create our Application
  var app = new Mn.Application();

  // Start history when our application is ready
  app.on('start', function () {
    Backbone.history.start();
  });

  // Modules
  app.module('Navigation', require('modules/navigation/index'));
  app.module('Auth', require('modules/auth/index'));
  app.module('Home', require('modules/home/index'));
  app.module('Search', require('modules/search/index'));
  app.module('Users', require('modules/users/index'));

  // Regions
  app.addRegions({
    header: '#header',
    content: '#content',
    footer: '#footer'
  });

  return app;
});
