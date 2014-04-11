var ConsumedItemTable = Backbone.View.extend({

  el: ".food-adder-list-table-holder tbody"

, initialize: function () {
    this.listenTo(this.model, "add", this.addItem);
    this.rowTemplate = _.template($('#food-list-row-template').html())
  }

, addItem: function (e) {
    var row = this.rowTemplate(e.toJSON());
    this.$el.append(row);
  }

});