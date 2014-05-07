var ConsumedItemTable = Backbone.View.extend({

    el: ".food-adder-list-table-holder"

    ,
    events: {
        "click .food-list-delete-item": "deleteConsumedItem"
    }

    ,
    initialize: function(options) {
        this.dataDateRange = options.dataDateRange;

        this.listenTo(this.model, "add", this.render);
        this.listenTo(this.model, "remove", this.render);

        this.listenTo(this.dataDateRange, "change", this.render);

        this.rowTemplate = _.template($('#food-list-row-template').html())
        this.render();
    }

    ,
    deleteConsumedItem: function(e) {
        deletedId = $(e.target).closest('tr').data('foodItemId');
        this.model.remove(this.model.get(deletedId));
    }

    ,
    render: function () {
        this.$el.find('tbody').empty();
        var itemsForTheDay = this.model.itemsOnDay(this.dataDateRange.get('start'));
        _.forEach(itemsForTheDay, this._appendItem.bind(this));

        // Update the total calories.
        // TODO. exercises should be negative......
        var totalCalories = _.reduce(itemsForTheDay, function (runningTotal, item) {
          return runningTotal + item.get('calories');
        }, 0);
        this.$el.find('.sum-of-calories').html(totalCalories);
    }

    ,
    _appendItem: function (e) {
      var templateData = e.toJSON();
      templateData['cid'] = e.cid;

      var row = this.rowTemplate(templateData);
      this.$el.find('tbody').append(row);
    }

});