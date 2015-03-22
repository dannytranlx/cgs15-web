define(function (require) {
  var Mn = require('marionette');
  var Radio = require('backbone.radio');

  var UsersCollection = require('./collections/users');
  var UsersController = require('./controllers/users-controller');

  var Router = Mn.AppRouter.extend({
    appRoutes: {
      'users': 'showUsers'
    }
  });

  return Mn.Module.extend({
    startsWithParent: true,

    onStart: function () {
      this.router = new Router({
        controller: this
      });

      Radio.channel('navigation').comply('users', this.showUsers, this);
    },

    showUsers: function () {
      Backbone.history.navigate('/users');
      this.usersCollection = new UsersCollection();

      this.usersController = new UsersController({
        users: this.usersCollection
      });

      this.app.content.show(this.usersController.getView());
    }
  });
});
