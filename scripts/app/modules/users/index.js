define(function (require) {
  var Mn = require('marionette');
  var Radio = require('backbone.radio');

  var UsersCollection = require('./collections/users');
  var UsersController = require('./controllers/users-controller');
  var UserController = require('./controllers/user-controller');

  var Router = Mn.AppRouter.extend({
    appRoutes: {
      'users': 'showUsers',
      'user/me': 'showMe',
      'user/:id': 'showUser'
    }
  });

  return Mn.Module.extend({
    startsWithParent: true,

    onStart: function () {
      this.router = new Router({
        controller: this
      });

      Radio.channel('navigation').comply('users', this.showUsers, this);
      Radio.channel('navigation').comply('user', this.showUser, this);
      Radio.channel('navigation').comply('me', this.showMe, this);
    },

    showUsers: function () {
      Backbone.history.navigate('/users');
      this.usersCollection = new UsersCollection();

      this.usersController = new UsersController({
        users: this.usersCollection
      });

      this.app.content.show(this.usersController.getView());
    },

    showUser: function (userId) {
      Backbone.history.navigate('/user/' + userId);
      this.usersCollection = new UsersCollection();
      var user = this.usersCollection.find(userId);

      this.userController = new UserController({
        user: user
      });

      this.app.content.show(this.userController.getView());
    },

    showMe: function () {
      Backbone.history.navigate('/user/me');
      var user = Radio.channel('auth').request('user');

      this.userController = new UserController({
        user: user
      });

      this.app.content.show(this.userController.getView());
    }
  });
});
