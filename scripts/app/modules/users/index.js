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

    initialize: function () {
      this.usersCollection = new UsersCollection();
    },

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

      this.usersController = new UsersController({
        users: this.usersCollection
      });

      this.app.content.show(this.usersController.getView());
    },

    showUser: function (userId) {
      if (this.usersCollection.length > 0) {
        var user = this._findUser(userId);
        if (user) {
          this._showUser(user);
        }
      } else {
        this.listenTo(this.usersCollection, 'sync', function () {
          var user = this._findUser(userId);
          if (user) {
            this._showUser(user);
          }
        });
      }
    },

    showMe: function () {
      var user = Radio.channel('auth').request('user');
      if (user) {
        this._showUser(user, true);
      } else {
        Radio.channel('auth').on('ready', _.bind(function () {
          var user = Radio.channel('auth').request('user');
          this._showUser(user, true);
        }, this));
      }
    },

    _findUser: function (userId) {
      var user = this.usersCollection.get(userId);
      if (user) {
        return user;
      } else {
        Radio.channel('navigation').command('404');
      }
    },

    _showUser: function (user, isSelf) {
      var userId = isSelf ? 'me' : user.get('id');
      Backbone.history.navigate('/user/' + userId);

      this.userController = new UserController({
        user: user,
        isSelf: isSelf
      });

      this.app.content.show(this.userController.getView());
    }
  });
});
