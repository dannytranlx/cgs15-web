define(function (require) {
  require('bootstrap');
  var Mn = require('marionette');

  return Mn.ItemView.extend({
    className: 'navbar navbar-default navbar-fixed-top',
    template: require('hbars!../templates/navbar-template'),

    ui: {
      brandLink: '[data-ui-brand-link]',
      searchLink: '[data-ui-search-link]',
      accountLink: '[data-ui-account-link]',
      logoutLink: '[data-ui-logout-link]'
    },

    triggers: {
      'click @ui.brandLink': 'navigation:navigate-home',
      'click @ui.searchLink': 'navigation:navigate-search'
    }
  });
});
