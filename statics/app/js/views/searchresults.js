/**
 * @author: AdmiralHackbar
 */
"use strict"
window.APP = window.APP || {};
APP.SearchResultsView = Backbone.View.extend({

    events: {
        "click button.search-recipe": "search"
    },

    initialize: function(options) {
        this.results = options.results;
        this.listenTo(this.results,'change', this.render);
    },

    render: function() {
        this.$el.html(_.template($('#indexTemplate').html(), {results: this.results.toJSON()}));
        return this;
    },

    search: function(event) {
    event.stopPropagation();
    event.preventDefault();
    var hash = "search/" + this.$el.find('input[name=query]').val();
    window.location.hash = hash;
}
});