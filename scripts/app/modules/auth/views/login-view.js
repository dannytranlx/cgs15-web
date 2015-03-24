define(function (require) {
  require('bootstrap');
  var Mn = require('marionette');

  return Mn.ItemView.extend({
    className: 'container',
    template: require('hbars!../templates/login-template'),

    ui: {
      loginForm: '[data-ui-login-form]',
      resetLink: '[data-ui-reset-link]',
      alertBanner: '[data-ui-alert-banner]'
    },

    events: {
      'submit @ui.loginForm': 'onSubmit',
      'click @ui.resetLink': 'onReset'
    },

    onRender: function () {
      this.hideBanner();
    },

    onSubmit: function (e) {
      e.preventDefault();
      this.hideBanner();
      this.trigger('auth:login');
    },

    onReset: function (e) {
      e.preventDefault();
      this.hideBanner();
      this.trigger('auth:reset');
    },

    showBanner: function (text, type) {
      this.ui.alertBanner.addClass('alert-' + type);

      if (type === 'success') {
        this.ui.alertBanner.html(text);
      }

      this.ui.alertBanner.show();
    },

    hideBanner: function () {
      this.ui.alertBanner.removeClass(function (index, css) {
        return (css.match (/(^|\s)alert-\S+/g) || []).join(' ');
      });

      this.ui.alertBanner.hide();
    }
  });
});
