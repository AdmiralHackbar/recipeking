/**
 * @author: AdmiralHackbar
 */
window.APP = window.APP || {};
APP.SearchResults = Backbone.Model.extend({
    urlRoot: "/search",

    initialize: function(){
        this.recipies = new APP.RecipeCollection(this.get("recipies"));
    }

});