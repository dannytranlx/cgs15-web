define(function (require) {
  var ViewController = require('view-controller');

  var NavbarView = require('../views/navbar-view');

  return ViewController.extend({
    viewClass: NavbarView,
    viewOptions: function () {
      return {
        model: this.getOption('user')
      };
    },

    viewEvents: {
      'navigation:navigate-home': 'navigateHome',
      'navigation:navigate-users': 'navigateUsers'
    },

    navigateHome: function () {
      Radio.channel('navigation').command('home');
    },

    navigateUsers: function () {
      Radio.channel('navigation').command('users');
    }
  });
});
