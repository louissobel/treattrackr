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
        this.setUpDatePicker();
        this.render();
    }

    , setUpDatePicker: function () {
        var nowTemp = new Date()
          , now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0)
          ;

        this.$el.find('.data-date')
          .datepicker({
             onRender: function(date) {
                return date.valueOf() > now.valueOf() ? 'disabled' : '';
              }
          })
          .on('changeDate', function (e) {
            this.$el.find('.data-date').datepicker('hide');
            this.model.set("start", e.date);
          }.bind(this));
          ;
    }

    , goForwardADay: function (e) {
        if ($(e.target).hasClass('enabled')) {
          var current = this.model.get("start")
            , next = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 1)
            ;
          this.model.set("start", next);
        } else {
          // Fuck it, ignore it.
        }
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
        var now = new Date()
          , showing = this.model.get("start")
          , string
          ;
        if (now.getYear() === showing.getYear() && now.getMonth() === showing.getMonth() && now.getDate() === showing.getDate()) {
          string = "Today";
          // disable forward nav past today
          this.$el.find('.right-nav').removeClass('enabled');
        } else {
          string = moment(this.model.get("start")).format("M/D/YYYY");
          this.$el.find('.right-nav').addClass('enabled');
        }
        this.$el.find('.food-add-list-nav-heading').html(string);
        this.$el.find('.data-date').datepicker('setValue', showing);
    }

});