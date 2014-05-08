/* ConsumedItem Model */

var ConsumedItem = Backbone.Model.extend({

        initialize: function() {
            console.log(this;
                if (this.get('item_type') == 'food') {
                    this.set('item_type', '/static/img/food.png');
                } else {
                    this.set('item_type', '/static/img/exercise.png');
                }
            }
        });