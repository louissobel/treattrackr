// View for actual item adding

var ItemAdder = Backbone.View.extend({

    initialize: function(options) {
        this.options = options || {};
        this.itemType = options.itemType;
        if (!this.itemType) {
          throw new Error("No item type provided to itemAdder");
        }

        // Set up for date picker
        this.setUpDatePicker();
        this.setUpAutoComplete();
    }

    ,
    events: {
        "click .food-adder-submit": "newItemAdded",
    }

    ,
    newItemAdded: function(e) {
        e.preventDefault();
        var newItem = this._obtainNewItem();
        this.trigger('newItem', this.options.itemType, newItem);
    }

    ,
    _obtainNewItem: function() {
        // Get it from the form :/
        // Augment it from model if we have one
        var form = {
          item_type: this.itemType
        };
        this.$el.find(".food-adder-input").each(function(i, input) {
            var $i = $(input);
            if ($i.hasClass('date')) {
                form['date'] = $i.find('input').val();
            } else {
                form[input.name] = input.value;
            }
        });

        if (this._selectedItem) {
            // Should be a `merge` method
            form['img_url'] = this._selectedItem.get("img_url")
        }
        return form
    }

    ,
    setUpDatePicker: function() {
        var dateEl = this.$el.find('.food-adder-input.date');
        dateEl.datepicker();
        dateEl.find('input').val('Today');
    }

    ,
    setUpAutoComplete: function() {
        var nameEl = this.$el.find('.food-adder-input[name=name]');
        nameEl.autocomplete({
            source: this.autocompleteSource.bind(this),
            select: this.handleAutocompleteSelect.bind(this),
            focus: this.handleAutocompleteFocus.bind(this),
            close: this.handleAutocompleteClose.bind(this)
        });
    }

    ,
    autocompleteSource: function(request, response) {
        var regexp = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i"),
            results = this.model.filter(function(consumableItem) {
                return regexp.test(consumableItem.get("name"));
            });
        response(results.map(function(consumableItem) {
            return {
                item: consumableItem,
                value: consumableItem.get("name")
            }
        }))
    }

    ,
    handleAutocompleteSelect: function(e, ui) {
        var item = ui.item ? ui.item.item : null;
        this._setItem(item);
    }

    ,
    handleAutocompleteFocus: function(e, ui) {
        var item = ui.item ? ui.item.item : null;
        this._setItem(item);
    }

    ,
    handleAutocompleteClose: function(e, ui) {
        // If we have one, auto populate caloreis
        // quantity and move to submit. otherwise,
        // do nothgin
        if (this._selectedItem) {
            this.$el.find('.food-adder-input[name=quantity]').val(this._selectedItem.get("default_quantity"));
            this.$el.find('.food-adder-input[name=calories]').val(this._selectedItem.get("default_calories"));
            this.$el.find('.food-adder-submit').focus();
        }
    }

    ,
    _setItem: function(item) {
        this._selectedItem = item;
        this._setImageToItem(item);
    }

    ,
    _setImageToItem: function(consumableItem) {
        var src;
        if (consumableItem) {
            src = consumableItem.get('img_url');
        } else {
            src = ConsumableItem.DEFAULT_IMG_URL;
        }
        this.$el.find('.food-adder-img-holder img').attr('src', src);
    }



});