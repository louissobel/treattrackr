/*
History Graph
*/

var HistoryGraph = Backbone.View.extend({

  initialize: function (options) {
    this.dataDateRange = options.dataDateRange;
    this.render();
  }

, render: function () {
    $canvas = this.$el.find(".canvas");
    var start = moment(this.dataDateRange.get("start"));
    var end = moment(this.dataDateRange.get("end"));
    var length = end.diff(start, "days") + 1;
    var food_data = []
    var exercise_data = []
    var labels_data = []
    for (var i=0;i<length;i++) {
    	food_data.push(0);
    	exercise_data.push(0);
    	labels_data.push(moment(start).add('days', i).format('MM/DD/YYYY'));
    }
    for (var i in this.model) {
    	var item = this.model[i];
    	if (moment(item.date) < start || moment(item.date) > end)
			continue;
    	if (item.item_type == "food") {
    		food_data[moment(new Date(item.date)).diff(start, "days")] += item.calories;
    	} else {
    		exercise_data[moment(new Date(item.date)).diff(start, "days")] += item.calories;
    	}
    }
    if (length == 1) {
    	// Push zeros at the front and the back
    	// of the arrays, so that the graph shows
    	// actual data in the middle :)
    	labels_data.splice(0,0,"");
    	food_data.splice(0,0,0);
    	exercise_data.splice(0,0,0);
    	labels_data.push("");
    	food_data.push(0);
    	exercise_data.push(0);
    }

	var lineChartData = {
		labels : labels_data,
		datasets : [
			{
				fillColor : "rgba(231, 76, 60, 0.5)",
				strokeColor : "rgba(231, 76, 60, 1.0)",
				pointColor : "#e74c3c",
				pointStrokeColor : "#fdd",
				data : food_data
			},
			{
				fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,1)",
				pointColor : "rgba(151,187,205,1)",
				pointStrokeColor : "#ddf",
				data : exercise_data
			}
		]
		
	}

	$canvas.attr('height', this.$el.css('height'));
	$canvas.attr('width', this.$el.css('width'));
	this.chart = new Chart($canvas[0].getContext("2d")).Line(lineChartData);

  }

});