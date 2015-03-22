define(function (require) {
  var Mn = require('marionette');
  var Radio = require('backbone.radio');

  var NavbarController = require('./controllers/navbar-controller');

  return Mn.Module.extend({
    startsWithParent: true,

    onStart: function () {
      this.navbarController = new NavbarController({
        user: Radio.channel('auth').request('user')
      });

      this.app.header.show(this.navbarController.getView());
    }
  });
});
