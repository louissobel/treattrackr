/* ConsumedItem Model */

var ConsumedItem = Backbone.Model.extend({
    defaults: function() {
        return {
            img_url: "static/img/food.png",
            name: "Koala",
            calories: 123
        }
    }
});