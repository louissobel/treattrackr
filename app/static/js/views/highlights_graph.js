/*
Highlights Graph
*/

var HighlightsGraph = Backbone.View.extend({

  initialize: function (options) {
    this.dataDateRange = options.dataDateRange;
    this.type = options.type;
    this.render();
  }

, render: function () {
    this.$el.html(this.dataDateRange.get("mode") + " " + this.type + " highlights");
  }

});