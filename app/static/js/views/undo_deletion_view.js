/*
undo a deletion
*/

var UndoDeletionView = Backbone.View.extend({

   el: ".undo-deletion"
, events: {
    "click .close" : "hide"
  , "click .undo" : "handleUndo"
  }

, initialize: function () {
    this.innardsTemplate = _.template($('#undo-deletion-innards-template').html());
    this._undo = null;
  }

, showUndo: function (obj) {
    this._undo = obj;
    this.render();
    this.$el.show();
  }

, render: function () {
    var messageParts = {
      item_type: this._undo.get("item_type")
    , name: this._undo.get("name")
    , date: moment(this._undo.get("date")).format("M/D/YYYY")
    }
    var contents = this.innardsTemplate(messageParts);
    this.$el.find('.undo-button-innards').html(contents);
  }

, hide: function () {
    this.$el.hide();
  }

, handleUndo: function () {
    this.trigger("undo", this._undo);
    this.$el.fadeOut();
  }

});