/* ConsumedItem Model */

var ConsumedItem = Backbone.Model.extend({
  defaults: function () {
    return {
      img_url: "img/cupcake.png"
    , name: "Koala"
    , calories: 123
    }
  }
});
