/**
 * @author: AdmiralHackbar
 */
window.APP = window.APP || {};
APP.IndexView = Backbone.View.extend({
    events: {
        "click button.search-recipe": "search"
    },

    initialize: function(options) {
    },

    render: function() {
        this.$el.html(_.template($('#indexTemplate').html(), {results: null}));
        return this;
    },

    search: function(event) {
        event.stopPropagation();
        event.preventDefault();
        var hash = "search/" + this.$el.find('input[name=query]').val();
        window.location.hash = hash;
    }
});