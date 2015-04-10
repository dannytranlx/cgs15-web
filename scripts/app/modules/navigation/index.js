define(function (require) {
  var Mn = require('marionette');
  var Radio = require('backbone.radio');

  var NavbarController = require('./controllers/navbar-controller');
  var NotFoundController = require('./controllers/notfound-controller');

  var Router = Mn.AppRouter.extend({
    appRoutes: {
      '404': 'show404'
    }
  });

  return Mn.Module.extend({
    startsWithParent: true,


    initialize: function () {
      Radio.channel('auth').on('ready', _.bind(function () {
        this.navbarController = new NavbarController({
          session: Radio.channel('auth').request('session')
        });

        this.app.header.show(this.navbarController.getView());
      }, this));
    },

    onStart: function () {
      this.router = new Router({
        controller: this
      });

      Radio.channel('navigation').comply('404', this.show404, this);
    },

    show404: function () {
      Backbone.history.navigate('/404');

      this.notFoundController = new NotFoundController();
      this.app.content.show(this.notFoundController.getView());
    }
  });
});
