define(function (require) {
  var Radio = require('backbone.radio');
  var ViewController = require('view-controller');

  var SearchView = require('../views/search-view');

  return ViewController.extend({
    viewClass: SearchView,
    viewOptions: function () {
      return {
        model: this.getOption('user')
      };
    }
  });
});
