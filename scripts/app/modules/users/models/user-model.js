define(function (require) {
  var md5 = require('md5');
  var Backbone = require('backbone');

  return Backbone.Model.extend({
    getAge: function () {
      if (!this.get('birthday')) {
        return false;
      }

      var age = new Date().getTime() - new Date(this.get('birthday')).getTime();
      return Math.floor(age / (1000 * 60 * 60 * 24 * 365.25));
    },

    getGravatarHash: function () {
      return md5(this.get('email'));
    }
  });
});
