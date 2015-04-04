define(function (require) {
  var _ = require('underscore');
  var Radio = require('backbone.radio');
  var ViewController = require('view-controller');

  var RegisterView = require('../views/register-view');
  var SessionModel = require('../models/session-model');
  var LoginController = require('./login-controller');

  return ViewController.extend({
    viewClass: RegisterView,
    viewEvents: {
      'auth:register': 'register'
    },

    initialize: function () {
      this.firebase = new Firebase('https://spooky-love.firebaseio.com');
      this.app = this.getOption('authApp');
      this.loginController = new LoginController({
        authApp: this.app
      });
    },

    register: function (userObj) {
      this.firebase.createUser(userObj, _.bind(function (error, userData) {
        if (error) {
          console.log('Error creating user:', error);
          this.getView().showBanner(error, 'danger');
        } else {
          console.log('Successfully created user account with uid:', userData.uid);

          // Create user account
          this.firebase.onAuth(_.bind(function (authData) {
            if (authData) {
              this.firebase.child('users').child(authData.uid).set({
                email: authData.password.email,
                firstName: userObj.firstName,
                lastName: userObj.lastName,
                interest: userObj.interest,
                sex: userObj.sex,
                birthday: new Date(userObj.birthday).getTime(),
                description: userObj.description
              });
            }
          }, this));

          // Log user in
          this.loginController.login(userObj);
        }
      }, this));
    }
  });
});
