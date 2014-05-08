/* View for FoodAdder */

var FoodAdderView = Backbone.View.extend({
  
  el: '.food-adder'

, initialize: function () {
    this.dataDateRange = new DataDateRange({
      start: new Date()
    })
    this.consumableItems = new ConsumableItemCollection(window.TTDATA.consumableItems);
    this.consumedItems = new ConsumedItemCollection(TTDATA.history);
    this.consumedItemTable = new ConsumedItemTable({
      model: this.consumedItems
    , dataDateRange: this.dataDateRange
    });
    this.consumedItemTableDatePicker = new ConsumedItemTableDatePicker({
      model: this.dataDateRange
    });
    this.undoDeletionView = new UndoDeletionView();

    this.listenTo(this.consumedItems, 'add', this.persistNewItem);
    this.listenTo(this.consumedItems, 'add', this.showDateOfJustAdded);
    this.listenTo(this.consumedItems, 'remove', this.handleItemDeleted);
    this.listenTo(this.consumedItems, 'remove', this.undoDeletionView.showUndo.bind(this.undoDeletionView));
    this.listenTo(this.dataDateRange, 'change', this.dateChanged);
    this.listenTo(this.undoDeletionView, 'undo', this.itemAdded); // route it straight back in
    this.listenTo(this.consumedItems, 'add', this.hideUndo);
    this.listenTo(this.dataDateRange, 'change', this.hideUndo);

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

, dateChanged: function () {
    // When the date we're showing changes, have the item adders
    // update their default date.
    var dateString
      , now = new Date()
      , showing = this.dataDateRange.get("start")
      ;
    if (now.getYear() === showing.getYear() && now.getMonth() === showing.getMonth() && now.getDate() === showing.getDate()) {
      dateString = 'Today';
    } else {
      dateString = moment(this.dataDateRange.get("start")).format("M/D/YYYY");
    }
    this.foodAdder.setDefaultDate(dateString);
    this.exerciseAdder.setDefaultDate(dateString);
  }

, itemAdded: function (item) {
    this.consumedItems.add(item);
  }

, persistNewItem: function (item) {
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
    var url = "/users/" + TTDATA.user.id + "/history/" + item.id;
    $.post(url);
  }

, showDateOfJustAdded: function (item) {
    this.dataDateRange.set('start', new Date(item.get('date')));
  }

, hideUndo: function () {
    this.undoDeletionView.hide();
  }

});