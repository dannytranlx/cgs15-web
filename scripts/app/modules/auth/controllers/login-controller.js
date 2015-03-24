define(function (require) {
  var _ = require('underscore');
  var Radio = require('backbone.radio');
  var ViewController = require('view-controller');

  var LoginView = require('../views/login-view');

  return ViewController.extend({
    viewClass: LoginView,
    viewEvents: {
      'auth:login': 'login',
      'auth:reset': 'reset'
    },

    initialize: function () {
      this.firebase = new Firebase('https://spooky-love.firebaseio.com');
    },

    login: function (e) {
      this.firebase.authWithPassword({
        email: $('input[name=email]').val(),
        password: $('input[name=password]').val(),
      }, _.bind(function (error, authData) {
          if (error) {
            console.log('Login Failed!', error);
            this.getView().showBanner(error, 'danger');
          } else {
            console.log('Authenticated successfully with payload:', authData);
            this.getView().showBanner('Authenticated successfully', 'success');

            // Set session to authenticated


            // Navigate to home
            Radio.channel('navigation').command('home');
          }
        }, this));
    },

    reset: function () {
      this.firebase.resetPassword({
        email: $('input[name=email]').val()
      }, _.bind(function (error) {
          if (error === null) {
            this.getView().showBanner('Password reset email sent successfully', 'success');
          } else {
            console.log('Error sending password reset email:', error);
            this.getView().showBanner(error, 'danger');
          }
        }, this));
    }
  });
});
