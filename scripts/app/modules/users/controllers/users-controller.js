define(function (require) {
  var Radio = require('backbone.radio');
  var ViewController = require('view-controller');

  var UsersView = require('../views/users-view');

  return ViewController.extend({
    viewClass: UsersView,
    viewOptions: function () {
      return {
        collection: this.getOption('users')
      };
    },
    viewEvents: {
      'navigation:navigate-user': 'showUser'
    },

    showUser: function (user) {
      Radio.channel('navigation').command('user', user.get('id'));
    }
  });
});
