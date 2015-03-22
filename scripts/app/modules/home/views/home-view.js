define(function (require) {
  require('bootstrap');
  var Mn = require('marionette');

  return Mn.ItemView.extend({
    template: require('hbars!../templates/home-template')
  });
});
