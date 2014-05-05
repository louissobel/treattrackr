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


	var barChartData = {
		labels : ["January","February","March","April","May","June","July"],
		datasets : [
			{
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,1)",
				data : [65,59,90,81,56,55,40]
			},
			{
				fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,1)",
				data : [28,48,40,19,96,27,100]
			}
		]
		
	}

	$canvas.attr('height', this.$el.css('height'));
	$canvas.attr('width', this.$el.css('width'));
	this.chart = new Chart($canvas[0].getContext("2d")).Bar(barChartData);

//    console.log(this.$el.find(".canvas"));
  }

});