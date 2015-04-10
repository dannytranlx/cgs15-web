define(function (require) {
  require('bootstrap');
  var Mn = require('marionette');

  return Mn.ItemView.extend({
    className: 'row user-view',
    template: require('hbars!../templates/user-template'),
    serializeData: function () {
      return {
        email: this.model.get('email'),
        sex: this.model.get('sex'),
        firstName: this.model.get('firstName'),
        lastName: this.model.get('lastName'),
        age: this.model.getAge(),
        description: this.model.get('description'),
        interest: this.model.get('interest'),
        gravatarHash: this.model.getGravatarHash(),
        showEmail: this.getOption('isSelf')
      };
    }
  });
});
