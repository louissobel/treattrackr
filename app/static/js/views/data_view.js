/*
Base View for the Data Page
*/

var DataView = Backbone.View.extend({
  
  el: null // TODO which el?

, initialize: function () {

    // TODO:
    // get the global history object?
    var dataDateRange = new DataDateRange({
      mode: DAILY_DATA_MODE
    , start: new Date() // Start off showing today
    , end: new Date() // And ending today. correcT?
    });

    this.dataDateRangePicker = new DataDateRangePicker({
      model: dataDateRange
    });

    this.dataGraphsContainer = new DataGraphsContainer({
      dataDateRange: dataDateRange
    });
  }

});