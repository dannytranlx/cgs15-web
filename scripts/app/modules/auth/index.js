define(function (require) {
  var _ = require('underscore');
  var Mn = require('marionette');
  var Radio = require('backbone.radio');

  var SessionModel = require('./models/session-model');
  var UsersCollection = require('../users/collections/users');
  var LoginController = require('./controllers/login-controller');
  var DeniedController = require('./controllers/denied-controller');
  var RegisterController = require('./controllers/register-controller');

  var Router = Mn.AppRouter.extend({
    appRoutes: {
      'login': 'showLogin',
      'denied': 'showDenied',
      'register': 'showRegister'
    }
  });

  return Mn.Module.extend({
    startsWithParent: true,

    initialize: function () {
      this.channel = Radio.channel('auth');
      this.session = new SessionModel();
      this.firebase = new Firebase('https://spooky-love.firebaseio.com');

      this.listenTo(this.session, 'change:loggedIn', _.bind(function (loggedIn) {
        this.channel.trigger('ready');
      }, this));
    },

    onStart: function () {
      this.router = new Router({
        controller: this
      });

      this.firebase.onAuth(_.bind(function (authData) {
        if (authData) {
          console.log('User ' + authData.uid + ' is logged in with ' + authData.provider);
          this.session.setAuth(authData);
        } else {
          console.log('User is logged out');
          this.session.set('loggedIn', false);
        }
      }, this));

      this.channel.reply('user', this.getUser, this);
      this.channel.reply('session', this.getSession, this);
      Radio.channel('navigation').comply('login', this.showLogin, this);
      Radio.channel('navigation').comply('logout', this.showLogout, this);
      Radio.channel('navigation').comply('register', this.showRegister, this);
    },

    getUser: function () {
      return this.session.get('user');
    },

    getSession: function () {
      return this.session;
    },

    showLogin: function () {
      Backbone.history.navigate('/login');
      this.loginController = new LoginController({
        authApp: this
      });

      this.app.content.show(this.loginController.getView());
    },

    showLogout: function () {
      this.firebase.unauth();
      this.session.set('loggedIn', false);
      this.session.set('user', undefined);
      this.showLogin();
    },

    showRegister: function () {
      Backbone.history.navigate('/register');
      this.registerController = new RegisterController({
        authApp: this
      });

      this.app.content.show(this.registerController.getView());
    },

    showDenied: function () {
      Backbone.history.navigate('/denied');
      this.deniedController = new DeniedController();
      this.app.content.show(this.deniedController.getView());
    }
  });
});
