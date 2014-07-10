/**
 * @author: AdmiralHackbar
 */
"use strict"
window.APP = window.APP || {};
APP.RecipeModel = Backbone.Model.extend({
    urlRoot: "/recipe",
    defaults: {
        name: "",
        description: "",
        steps: "",
        ingredients: ""
    },

    validate: function(attrs) {
        var errors = {};
        if (attrs.name == "") {
            errors.name = "Name is required."
        }
        if (attrs.description == "") {
            errors.description = "Description is required."
        }
        if (attrs.steps == "") {
            errors.steps = "Please list the steps."
        }
        if (attrs.ingredients == "") {
            errors.ingredients = "Please list the ingredients used."
        }
        if (!_.isEmpty(errors)) {
            return errors;
        }
        return null;
    }
});

APP.RecipeCollection = Backbone.Collection.extend({
    model: APP.RecipeModel
});