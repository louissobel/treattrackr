/*
Base View for the Data Page
*/

var DataView = Backbone.View.extend({

  initialize: function () {

    // TODO:
    // get the global history object?
    var dataDateRange = new DataDateRange();

    this.dataDateRangePicker = new DataDateRangePicker({
      model: dataDateRange
    });

    this.dataGraphsContainer = new DataGraphsContainer({
      dataDateRange: dataDateRange
    , model: window.TTDATA.history
    });
  }

});