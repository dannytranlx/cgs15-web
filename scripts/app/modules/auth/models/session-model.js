define(function (require) {
  var Backbone = require('backbone');

  var UserModel = require('../../users/models/user-model');

  return Backbone.Model.extend({
    defaults: {
      loggedIn: undefined,
      user: undefined
    },

    initialize: function (authData) {
      this.setAuth(authData);
    },

    setAuth: function (authData) {
      if (authData) {
        this.firebase = new Firebase('https://spooky-love.firebaseio.com');

        this.firebase.child('users').child(authData.uid).once('value', _.bind(function (snap) {
          this.set('user', new UserModel(snap.val()));
          this.set('loggedIn', true);
        }, this));
      }
    }
  });
});
