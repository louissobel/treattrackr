/* View for FoodAdder */

var FoodAdderView = Backbone.View.extend({
  
  el: '.food-adder'

, initialize: function () {
    // Really, it would be a model that new about the current
    // date, time, et cetera, but whatever.
    this.consumableItems = new ConsumableItemCollection(window.TTDATA.consumableItems);
    this.consumedItems = new ConsumedItemCollection();
    this.consumedItemTable = new ConsumedItemTable({
      model: this.consumedItems
    });

    this.listenTo(this.consumedItems, 'add', this.handleItemAdded);
    this.listenTo(this.consumedItems, 'delete', this.handleItemDeleted);

    // Two ItemAdders, one for food, one for exercise
    $('.food-adder-section').each(function (i, e) {
      var itemType = $(e).data('itemType')
        , ia = new ItemAdder({
            el: e
          , model: this.consumableItems
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

, handleItemAdded: function (item) {
    console.log(item);
    // Ajax that change to the server.
    var payload = {
        calories: item.get('calories')
      , img_url: item.get('img_url')
      , name: item.get('name')
      , date: item.get('date')
      , quantity: item.get('quantity')
      , item_type: item.get('item_type')
      }
      , url = "/users/" + TTDATA.user.id + "/history"
      ;
    $.post(url, payload, function (response) {
      item.set('id', response.id);
    });
  }

, handleItemDeleted: function (item) {
    console.log(item);
  }
});