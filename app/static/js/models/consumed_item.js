/* ConsumedItem Model */

var ConsumedItem = Backbone.Model.extend({

    initialize: function() {
        if (!this.has('img_url')) {
            if (this.get('item_type') == 'food') {
                this.set('img_url', '/static/img/food.png');
            } else {
                this.set('img_url', '/static/img/exercise.png');
            }
        }
    }
});