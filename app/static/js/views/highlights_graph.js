/*
Highlights Graph
*/

var HighlightsGraph = Backbone.View.extend({

  initialize: function (options) {
    this.dataDateRange = options.dataDateRange;
    this.type = options.type;
    this.render();
  }

, render: function () {
    $canvas = this.$el.find(".canvas");

    var start = moment(this.dataDateRange.get("start"));
    var end = moment(this.dataDateRange.get("end"));
    var length = end.diff(start, "days") + 1;
    var highlights_data = []
    var labels_data = []
    var aggregate_data = [] // Holds all (name, calories) pairs
    for (var i in this.model) {
    	var item = this.model[i];
    	if (moment(item.date) < start || moment(item.date) > end)
			continue;
    	if (item.item_type == this.type) {
    		var found = false;
    		for (var i=0;i<aggregate_data.length;i++) {
    			if (aggregate_data[i].name == item.name) {
    				found = true;
    				aggregate_data[i].calories += item.calories;
    				break;
    			}
    		}
    		if (!found) {
    			aggregate_data.push({name: item.name, calories: item.calories});
    		}
    	}
    }
    aggregate_data.sort(function(a, b) {return b.calories - a.calories;});
    labels_data = aggregate_data.map(function(x){return x.name;});
    highlights_data = aggregate_data.map(function(x){return x.calories;});
    while(labels_data.length < 5) labels_data.push("");
    while(labels_data.length > 5) labels_data.pop();
    while(highlights_data.length < 5) highlights_data.push(0);
    while(highlights_data.length > 5) highlights_data.pop();

    console.log(labels_data);
    console.log(highlights_data);

    if (this.type == "food") {
    	var col = {
    				fillColor : "rgba(231, 76, 60, 0.5)",
					strokeColor : "rgba(231, 76, 60, 1.0)",
		}
    } else {
    	var col = {
				fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,1)",
    	}
    }

	var barChartData = {
		labels : labels_data,
		datasets : [
			{
				fillColor : col.fillColor,
				strokeColor : col.strokeColor,
				data : highlights_data
			}
		]
		
	}

	$canvas.attr('height', this.$el.css('height'));
	$canvas.attr('width', this.$el.css('width'));
	this.chart = new Chart($canvas[0].getContext("2d")).Bar(barChartData);
  }

});