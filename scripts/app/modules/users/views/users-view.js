define(function (require) {
  require('bootstrap');
  var Mn = require('marionette');

  var UserItemView = Mn.ItemView.extend({
    tagName: 'tr',
    template: require('hbars!../templates/user-list-item-template')
  });

  return Mn.CompositeView.extend({
    className: 'container',
    template: require('hbars!../templates/users-list-template'),
    childView: UserItemView,
    childViewContainer: 'tbody'
  });
});
