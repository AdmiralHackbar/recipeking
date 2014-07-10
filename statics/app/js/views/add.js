/**
 * @author: AdmiralHackbar
 */
"use strict"
window.APP = window.APP || {};
APP.AddRecipeView = Backbone.View.extend({

    events: {
        "click button.save-recipe": "saveRecipe"
    },

    initialize: function(options) {
        this.recipe = options.recipe;
    },

    render: function() {
        this.$el.html(_.template($('#addTemplate').html(), this.recipe.toJSON()));
        return this;
    },


    saveRecipe: function(event) {
        event.stopPropagation();
        event.preventDefault();

        this.recipe.set({
            name: this.$el.find('input[name=recipeName]').val(),
            description: this.$el.find('textarea[id=recipeDescription]').val(),
            steps: this.$el.find('textarea[id=recipeSteps]').val(),
            ingredients: this.$el.find('textarea[id=recipeIngredients]').val()
        });

        var postData = this.recipe.toJSON();
        console.log(postData);
        var recipe = new APP.RecipeModel();
        // TODO: Handle network error, validation error.
        recipe.save(postData, {
            success: function(model, response) {
                window.location.hash = "view/" + response.id;
            }
        });
    }
});