/*
View to hold the other data views
*/

var DataGraphsContainer = Backbone.View.extend({
  
  el: '.data-holder'

, initialize: function (options) {
    options = options || {};
    // The `model` will be the history object
    this.dataDateRange = options.dataDateRange;
    if (this.dataDateRange === null) {
      // That's a problem.
      throw new Error("No DataDateRange provided to DataView");
    };
    // TODO:
    this.graphs = [
      new HighlightsGraph({
        el: this.$el.find('.data-food-highlights')
      , model: this.model
      , dataDateRange: this.dataDateRange
      , type: 'food'
      })
    , new HighlightsGraph({
        el: this.$el.find('.data-exercise-highlights')
      , model: this.model
      , dataDateRange: this.dataDateRange
      , type: 'exercise'
      })
    , new HistoryGraph({
        el: this.$el.find('.data-history')
      , model: this.model
      , dataDateRange: this.dataDateRange
      })
    ]

    this.listenTo(this.dataDateRange, "change", this.render);
  }

, render: function () {
    _.each(this.graphs, function (g) {
      g.render();
    })
  }
});