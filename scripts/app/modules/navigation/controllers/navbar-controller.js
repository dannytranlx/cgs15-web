define(function (require) {
  var Radio = require('backbone.radio');
  var ViewController = require('view-controller');

  var NavbarView = require('../views/navbar-view');

  return ViewController.extend({
    viewClass: NavbarView,
    viewOptions: function () {
      return {
        model: this.getOption('session')
      };
    },

    viewEvents: {
      'navigation:navigate-home': 'navigateHome',
      'navigation:navigate-search': 'navigateSearch',
      'navigation:navigate-users': 'navigateUsers',
      'navigation:navigate-login': 'navigateLogin',
      'navigation:navigate-logout': 'navigateLogout'
    },

    navigateHome: function () {
      Radio.channel('navigation').command('home');
    },

    navigateSearch: function () {
      Radio.channel('navigation').command('search');
    },

    navigateUsers: function () {
      Radio.channel('navigation').command('users');
    },

    navigateLogin: function () {
      Radio.channel('navigation').command('login');
    },

    navigateLogout: function () {
      Radio.channel('navigation').command('logout');
    }
  });
});
