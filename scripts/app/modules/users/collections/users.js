define(function (require) {
  require('backbone.firebase');
  var Backbone = require('backbone');

  var User = require('../models/user');

  return Backbone.Firebase.Collection.extend({
    model: User,
    url: 'https://spooky-love.firebaseio.com'
  });
});
