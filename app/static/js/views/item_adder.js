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
        this.defaultDate = 'Today';

        this.resetForm();

        this.addOnClickErrorRemoval();
    }

    ,
    events: {
        "click .food-adder-submit": "newItemAdded",
    }

    ,
    resetForm: function() {
        this.$el.find(".food-adder-input").each(function(i, input) {
            var $i = $(input);
            if ($i.hasClass('date')) {
                $i.datepicker('setValue', this.defaultDate);
                $i.find('input').val(this.defaultDate);
            } else {
                input.value = "";
            }
        }.bind(this));
        this._setItem(null);
    }

    ,
    setDefaultDate: function(dateString) {
        this.$el.find('.food-adder-input.date').datepicker('setValue', dateString);
        this.$el.find('.food-adder-input.date input').val(dateString);
        this.defaultDate = dateString;
    }

    ,

    addOnClickErrorRemoval: function() {
        this.$el.find(".can-be-red").each(function(i, div) {

            // $input = $div.find('.food-adder-input').first();
            // $input.focus(function() {
            //     $div.removeClass('has-error');
            // });
            // $input.change(function() {
            //     $div.removeClass('has-error');
            // });

            $(div).find('.food-adder-input').first().focus(function() {
                $(div).removeClass('has-error');
            });
            $(div).find('.food-adder-input').first().change(function() {
                $(div).removeClass('has-error');
            });
        });
    }

    ,
    newItemAdded: function(e) {
        e.preventDefault();
        var newItem = this._obtainNewItem();
        if (newItem !== undefined) {
            this.resetForm();
            this.trigger('newItem', newItem);
        }
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
                var dateString = $i.find('input').val();
                if (dateString === 'Today') {
                    dateString = moment().format('MM/DD/YYYY')
                }
                form['date'] = moment(dateString).valueOf();
            } else if (input.name === 'calories') {
                // Validation
                if (isNaN(input.value) || input.value == "") {
                    form[input.name] = NaN;
                    this.$el.find(".calories-div").first().addClass('has-error');
                } else {
                    form[input.name] = parseInt(input.value, 10);
                }
            } else {
                form[input.name] = input.value;
                if (input.name === 'quantity' && input.value === '') {
                    this.$el.find(".quantity-div").first().addClass('has-error');
                }
                if (input.name === 'name' && input.value === '') {
                    this.$el.find(".name-div").first().addClass('has-error');
                }
            }
        }.bind(this));

        if (this._selectedItem) {
            // Should be a `merge` method
            form['img_url'] = this._selectedItem.get("img_url")
        }
        if (isNaN(form['calories']) || form['quantity'] === '' || form['name'] === '')
            return;
        console.log(form);
        return form;
    }

    ,
    setUpDatePicker: function() {
        var nowTemp = new Date();
        var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

        var dateEl = this.$el.find('.food-adder-input.date');
        dateEl.datepicker({
              onRender: function(date) {
                return date.valueOf() > now.valueOf() ? 'disabled' : '';
              }
        })
        .on('changeDate', function (e) {
          dateEl.datepicker('hide');
        });
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
                return regexp.test(consumableItem.get("name")) && consumableItem.get("item_type") == this.itemType;
            }.bind(this));
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
            this.$el.find('.food-adder-input[name=quantity]').change(); // Clears the .has-error class
            this.$el.find('.food-adder-input[name=calories]').val(this._selectedItem.get("default_calories"));
            this.$el.find('.food-adder-input[name=calories]').change(); // Clears the .has-error class
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
            // show the other
            src = consumableItem.get('img_url');
            this.$el.find('.item-adder-other-image')
              .removeClass('hidden')
              .find('img')
              .attr('src', src)
              ;
            this.$el.find('.item-adder-default-image').addClass('hidden');
        } else {
          this.$el.find('.item-adder-other-image').addClass('hidden');
          this.$el.find('.item-adder-default-image').removeClass('hidden');
        }
    }



});