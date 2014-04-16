/* View for FoodAdder */

var consumableItems = new ConsumableItemCollection();
consumableItems.add({
  img_url: 'img/items/pizza.jpg'
, name: 'Pizza'
, calories: 100
, default_quantity: "1 slice"
});

consumableItems.add({
  img_url: "img/items/hamburger.jpg"
, name: 'Hamburger'
, calories: 1000
, default_quantity: "1 Quarter Pounder"
});

consumableItems.add({
  img_url: "img/items/koala.jpg"
, name: 'Koala'
, calories: 160
, default_quantity: "1 Endangered Species"
});

var FoodAdderView = Backbone.View.extend({
  
  el: '.food-adder'

, initialize: function () {
    // Really, it would be a model that new about the current
    // date, time, et cetera, but whatever.
    this.consumedItems = new ConsumedItemCollection();
    this.consumedItemTable = new ConsumedItemTable({
      model: this.consumedItems
    });

    // Two ItemAdders, one for food, one for exercise
    $('.food-adder-section').each(function (i, e) {
      var itemType = $(e).data('itemType')
        , ia = new ItemAdder({
            el: e
          , model: consumableItems
          , itemType: $(e).data('itemType')
          })
        ;
      this.listenTo(ia, "newItem", this.itemAdded)

      if ($(e).data('itemType') == 'food') {
        this.foodAdder = ia;
      } else {
        this.exerciseAdder = ia;
      }
    }.bind(this));

  }


, itemAdded: function (itemType, item) {
    this.consumedItems.add(item);
  }
});