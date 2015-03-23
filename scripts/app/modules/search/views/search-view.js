define(function (require) {
  require('bootstrap');
  var Mn = require('marionette');

  return Mn.ItemView.extend({
    className: 'container',
    template: require('hbars!../templates/search-template'),

    ui: {

    },

    triggers: {

    }
  });
});
