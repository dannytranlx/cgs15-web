define(function (require) {
  var _ = require('underscore');
  var Mn = require('marionette');
  var Radio = require('backbone.radio');

  var UsersCollection = require('../users/collections/users');
  var LoginController = require('./controllers/login-controller');

  var Router = Mn.AppRouter.extend({
    appRoutes: {
      'login': 'showLogin'
    }
  });

  return Mn.Module.extend({
    startsWithParent: true,

    onStart: function () {
      this.router = new Router({
        controller: this
      });

      Radio.channel('auth').reply('user', this.getUser, this);
      Radio.channel('navigation').comply('login', this.showLogin, this);
    },

    getUser: function () {
      this.usersCollection = new UsersCollection();
      this.usersCollection.fetch({
        success: _.bind(function () {
          return this.usersCollection.at(0);
        }, this),
        error: function () {
          return {};
        }
      });
    },

    showLogin: function () {
      Backbone.history.navigate('/login');
      this.loginController = new LoginController();
      this.app.content.show(this.loginController.getView());
    }
  });
});
