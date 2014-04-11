/* ConsumedItem Model */

var ConsumedItem = Backbone.Model.extend({
  defaults: function () {
    return {
      img_url: "img/koala.jpg"
    , name: "Koala"
    , calories: 123
    }
  }
});
