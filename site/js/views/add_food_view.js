/* View for FoodAdder */

var FoodAdderView = Backbone.View.extend({
  
  el: '.food-adder'

, events: {
    "click .food-adder-submit": "addNewFood"
  }

, initialize: function () {
    // Really, it would be a model that new about the current
    // date, time, et cetera, but whatever.
    this.consumedItems = new ConsumedItemCollection();
    this.consumedItemTable = new ConsumedItemTable({
      model: this.consumedItems
    });
  }


, addNewFood: function (e) {
    e.preventDefault();
    this.consumedItems.add({
      name: "Koala Bear " + this.consumedItems.length
    , calories: 100 * (Math.pow(3, this.consumedItems.length) % 7)
    })
  }
});