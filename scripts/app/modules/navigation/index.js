define(function (require) {
  var Mn = require('marionette');

  var NavbarController = require('./controllers/navbar-controller');

  return Mn.Module.extend({
    startsWithParent: true,

    onStart: function () {
      this.navbarController = new NavbarController({
        user: new Backbone.Model({
          name: 'Danny',
          email: 'danny@dannytran.ca'
        })
      });

      this.app.header.show(this.navbarController.getView());
    }
  });
});
