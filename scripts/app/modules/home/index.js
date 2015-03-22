define(function (require) {
  var Mn = require('marionette');
  var Radio = require('backbone.radio');

  var HomeController = require('./controllers/home-controller');

  var Router = Mn.AppRouter.extend({
    appRoutes: {
      '': 'showHome'
    }
  });

  return Mn.Module.extend({
    startsWithParent: true,

    onStart: function () {
      this.router = new Router({
        controller: this
      });

      Radio.channel('navigation').comply('home', this.showHome, this);
    },

    showHome: function () {
      this.homeController = new HomeController();

      this.app.content.show(this.homeController.getView());
    }
  });
});
