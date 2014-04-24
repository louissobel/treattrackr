/*
View the the Data Range Picker
*/


var DataDateRangePicker = Backbone.View.extend({
  
  el: '.data-datepicker' // TODO which el?

, events: {
    "click": "handleClick"
  }

, initialize: function () {
    // TODO:
    // we need to listen to the events and change
    // our this.model (a DataDateRange object)
    // as needed
  }

, handleClick: function () {
    this.model.set("start", new Date());
  }
});