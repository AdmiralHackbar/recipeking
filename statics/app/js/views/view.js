/**
 * @author: AdmiralHackbar
 */
"use strict"
window.APP = window.APP || {};
APP.ViewRecipeView = Backbone.View.extend({

    initialize: function(options) {
        this.recipe = options.recipe;
        this.listenTo(this.recipe,'change', this.render);
    },

    render: function() {
        this.$el.html(_.template($('#viewTemplate').html(), this.recipe.toJSON()));
        return this;
    }
});