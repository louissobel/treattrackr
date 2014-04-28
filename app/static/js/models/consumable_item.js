// ConsumableItem - template for ConsumedItem,
// What you search for in search boxes

var ConsumableItem = Backbone.Model.extend({
    defaults: function() {
        return {
            img_url: "static/img/food.png"
        }
    }
}, {
    DEFAULT_IMG_URL: "static/img/food.png"
});