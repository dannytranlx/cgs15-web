define(function (require) {
  var ViewController = require('view-controller');

  var UserView = require('../views/user-view');

  return ViewController.extend({
    viewClass: UserView,
    viewOptions: function () {
      return {
        model: this.getOption('user'),
        isSelf: this.getOption('isSelf')
      };
    }
  });
});
