define(function (require) {
  var Mn = require('marionette');
  var Radio = require('backbone.radio');

  var NavbarController = require('./controllers/navbar-controller');

  return Mn.Module.extend({
    startsWithParent: true,

    initialize: function () {
      Radio.channel('auth').on('ready', _.bind(function () {
        this.navbarController = new NavbarController({
          session: Radio.channel('auth').request('session')
        });

        this.app.header.show(this.navbarController.getView());
      }, this));
    }
  });
});
