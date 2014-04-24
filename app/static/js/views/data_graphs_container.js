/*
View to hold the other data views
*/

var DataGraphsContainer = Backbone.View.extend({
  
  el: null // TODO which el?

, initialize: function (options) {
    options = options || {};
    // The `model` will be the history object
    this.dataDateRange = options.dataDateRange;
    if (this.dataDateRange === null) {
      // That's a problem.
      throw new Error("No DataDateRange provided to DataView");
    };
    // TODO:
    //  - create the three subviews
  }
});