define(['backbone', 'marionette'], function (Backbone, Mn) {
  // Create our Application
  var app = new Mn.Application();

  // Start history when our application is ready
  app.on('start', function () {
    Backbone.history.start();
  });

  return app;
});
