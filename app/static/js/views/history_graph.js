/*
History Graph
*/

var HistoryGraph = Backbone.View.extend({

  initialize: function (options) {
    this.dataDateRange = options.dataDateRange;
    this.render();
  }

, render: function () {
    this.$el.html(this.dataDateRange.get("mode") + " history");
  }

});