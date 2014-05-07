var ConsumedItemTableDatePicker = Backbone.View.extend({

    el: ".food-add-list-nav"

    ,
    events: {
        "click .left-nav": "goBackADay"
    ,   "click .right-nav": "goForwardADay"
    }

    ,
    initialize: function(options) {
        this.listenTo(this.model, "change", this.render);
        this.render();
    }

    , goForwardADay: function () {
        // TODO HANDLE STOPPING AT TODAY.
        var current = this.model.get("start")
          , next = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 1)
          ;
        this.model.set("start", next);
    }

    , goBackADay: function () {
        // TODO HANDLE STOPPING AT TODAY.
        var current = this.model.get("start")
          , next = new Date(current.getFullYear(), current.getMonth(), current.getDate() - 1)
          ;
        this.model.set("start", next);
    }

    ,
    render: function () {
        this.$el.find('.food-add-list-nav-heading').html(
          moment(this.model.get("start")).format("M/D/YYYY")
        )
    }

});