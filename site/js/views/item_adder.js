// View for actual item adding

var ItemAdder = Backbone.View.extend({

  initialize: function (options) {
    this.options = options || {};

    // Set up for date picker
    this.setUpDatePicker();
    this.setUpAutoComplete();
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

, setUpDatePicker: function () {
    var dateEl = this.$el.find('.food-adder-input[name=date]');
    dateEl.val('Today');
  }

, setUpAutoComplete: function () {
    var nameEl = this.$el.find('.food-adder-input[name=name]');
    nameEl.autocomplete({
      source: this.autocompleteSource.bind(this)
    , change: this.handleAutocompleteChange.bind(this)
    });
  }

, autocompleteSource: function (request, response) {
    var regexp = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i")
      , results = this.model.filter(function (consumableItem) {
          return regexp.test(consumableItem.get("name"));
        });
    response(results.map(function (consumableItem) {
      return {
        item: consumableItem
      , value: consumableItem.get("name")
      }
    }))
  }

, handleAutocompleteChange: function (e, ui) {
    this.setImageToItem(ui.item.item);
  }

, setImageToItem: function (consumableItem) {
    var src;
    if (consumableItem) {
      src = consumableItem.get('img_url');
    } else {
      src = ConsumableItem.DEFAULT_IMG_URL;
    }
    this.$el.find('.food-adder-img-holder img').attr('src', src);
  }

});
