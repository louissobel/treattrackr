var ConsumedItemTable = Backbone.View.extend({

    el: ".food-adder-list-table-holder tbody"

    ,
    events: {
        "click .food-list-delete-item": "deleteConsumedItem"
    }

    ,
    initialize: function() {
        this.listenTo(this.model, "add", this.itemAdded);
        this.listenTo(this.model, "remove", this.itemRemoved)
        this.rowTemplate = _.template($('#food-list-row-template').html())
    }

    ,
    itemAdded: function(e) {
        var templateData = e.toJSON();
        templateData['cid'] = e.cid;

        var row = this.rowTemplate(templateData);
        this.$el.append(row);
    }

    ,
    itemRemoved: function(e) {
        var selector = 'tr[data-food-item-id=' + e.cid + ']';
        this.$(selector).remove()
    }

    ,
    deleteConsumedItem: function(e) {
        deletedId = $(e.target).closest('tr').data('foodItemId');
        this.model.remove(this.model.get(deletedId));
    }

});