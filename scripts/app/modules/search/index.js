define(function (require) {
  var Mn = require('marionette');
  var Radio = require('backbone.radio');

  var SearchController = require('./controllers/search-controller');

  var Router = Mn.AppRouter.extend({
    appRoutes: {
      'search': 'showSearch'
    }
  });

  return Mn.Module.extend({
    startsWithParent: true,

    onStart: function () {
      this.router = new Router({
        controller: this
      });

      Radio.channel('navigation').comply('search', this.showSearch, this);
    },

    showSearch: function () {
      Backbone.history.navigate('/search');
      this.searchController = new SearchController();
      this.app.content.show(this.searchController.getView());
    }
  });
});
