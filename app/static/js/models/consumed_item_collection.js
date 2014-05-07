/* container for consumed Item */

var ConsumedItemCollection = Backbone.Collection.extend({
  model: ConsumedItem

, itemsOnDay: function (date) {
    // Date could be any time of that day, we want it to be 000
    var timestamp = (new Date(date.getFullYear(), date.getMonth(), date.getDate())).valueOf();
    return this.where({date: timestamp});
  }

});