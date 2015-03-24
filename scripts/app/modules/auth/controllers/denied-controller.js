define(function (require) {
  var _ = require('underscore');
  var Radio = require('backbone.radio');
  var ViewController = require('view-controller');

  var DeniedView = require('../views/denied-view');

  return ViewController.extend({
    viewClass: DeniedView
  });
});
