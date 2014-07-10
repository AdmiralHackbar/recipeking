/**
 * @author: AdmiralHackbar
 */
"use strict"
window.APP = window.APP || {};
APP.RecipeKingRouter = Backbone.Router.extend({
    routes: {
        '': 'index',
        'search/:query': 'search',
        'view/:id': 'viewRecipe',
        'add': 'addRecipe'
    },

    initialize: function (options) {
        this.index();
    },

    index: function(query) {
        this.currentView = new APP.IndexView({});
        $('#content').html(this.currentView.render().el);
    },

    search: function(query) {
        var searchResults = new APP.SearchResults({id: query});
        searchResults.fetch();
        this.currentView = new APP.SearchResultsView({results: searchResults});
        $('#content').html(this.currentView.render().el);
    },

    viewRecipe: function(id) {
        var recipe = new APP.RecipeModel({id: id});
        recipe.fetch();
        this.currentView = new APP.ViewRecipeView({recipe: recipe});
        $('#content').html(this.currentView.render().el);
    },

    addRecipe: function() {
        this.currentView = new APP.AddRecipeView({
            recipe: new APP.RecipeModel()
        });
        $('#content').html(this.currentView.render().el);
    }
});