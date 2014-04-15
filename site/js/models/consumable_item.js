// ConsumableItem - template for ConsumedItem,
// What you search for in search boxes

var ConsumableItem = Backbone.Model.extend({
  defaults: function () {
    return {
      img_url: "img/cupcake.png"
    }
  }
}, {
  DEFAULT_IMG_URL: "img/cupcake.png"
});
