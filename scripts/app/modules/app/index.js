define(function (require) {
  var Backbone = require('backbone');
  var Mn = require('marionette');
  var Radio = require('backbone.radio');

  // Shim to replace Backbone.Wreqr with Backbone.Radio
  Marionette.Application.prototype._initChannel = function () {
    this.channelName = _.result(this, 'channelName') || 'global';
    this.channel = _.result(this, 'channel') || Radio.channel(this.channelName);
  };

  // Create our Application
  var app = new Mn.Application();

  // Start history when our application is ready
  app.on('start', function () {
    Backbone.history.start();
  });

  // Modules
  app.module('Navigation', require('modules/navigation/index'));

  // Regions
  app.addRegions({
    header: '#header',
    content: '#container',
    footer: '#footer'
  });

  return app;
});
