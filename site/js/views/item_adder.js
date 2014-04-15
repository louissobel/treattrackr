// View for actual item adding

var ItemAdder = Backbone.View.extend({

  initialize: function (options) {
    this.options = options || {};
  }

, events: {
    "click .food-adder-submit": "newItemAdded",
  }

, newItemAdded: function (e) {
    e.preventDefault();
    var newItem = this._obtainNewItem();
    this.trigger('newItem', this.options.itemType, newItem);
  }

, _obtainNewItem: function () {
    // For now, get it from the form :/
    var form = {};
    this.$el.find(".food-adder-input").each(function (i, input) {
      form[input.name] = input.value;
    });
    return form
  }

});
