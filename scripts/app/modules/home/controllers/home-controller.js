define(function (require) {
  var ViewController = require('view-controller');

  var HomeView = require('../views/home-view');

  return ViewController.extend({
    viewClass: HomeView
  });
});
