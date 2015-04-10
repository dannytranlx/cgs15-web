define(function (require) {
  var Radio = require('backbone.radio');
  var ViewController = require('view-controller');

  var NotFoundView = require('../views/notfound-view');

  return ViewController.extend({
    viewClass: NotFoundView
  });
});
