define(function (require) {
  var ViewController = require('view-controller');

  var UsersView = require('../views/users-view');

  return ViewController.extend({
    viewClass: UsersView,
    viewOptions: function () {
      return {
        collection: this.getOption('users')
      };
    }
  });
});
