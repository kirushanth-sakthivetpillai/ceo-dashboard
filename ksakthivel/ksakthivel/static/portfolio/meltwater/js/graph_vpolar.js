
(function() {

	$(window).resize(function() {
		drawVPolar("#graph_sentiment", false);
	});

	$(document).ready(function() {
		initVPolar("#graph_sentiment",
			"/static/portfolio/meltwater/data/sentiment.csv");
	});

	function initVPolar(selector, data_url) {
		var $container = $(selector).html("<svg xmlns='http://www.w3.org/2000/svg' perserveAspectRatio='xMinYMid'></svg>")
		var $svg = $container.find('svg');

		var barGap = 4;
		var labelWidth = 60;
		var margin = { top:20, left:10, right:10, bottom:15 };

		var height = $container.height() - margin.top - margin.bottom;
		var width = $container.width() - margin.left - margin.right - labelWidth;

		var xscale = d3.scale.linear();
		var yscale = d3.scale.ordinal();
		
		$svg.data("xscale", xscale);
		$svg.data("yscale", yscale);

		var d3chart = d3.selectAll($svg)
			.append("g")
			.attr("class","container")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		d3.csv(data_url, function(error, data) { 
			if (error) return console.warn(error);

			var keys = data.map(function(d) {
				return d.Key;
			});

			var total = 0;
			var values = data.map(function(d) {
				var n = +d.Value;
				total += n;
				return n;
			});

			keys.push("Avg");
			values.push(total / values.length);

			yscale.domain(values);
			xscale.domain([0, 1]);

			var y = yscale.rangeBands([0, height]);
			var x = xscale.range([0, width]);

			var barHeight = (height / keys.length) - barGap;

			var bars = d3chart.selectAll(".bar")
				.data(values)
				.enter()
				.append("g")
				.attr("transform", function(d, i) { 
					return "translate(" + labelWidth + "," + 
						((height / keys.length) * i) + ")";
				})
				.attr("class", "g");

			bars.append("rect")
				.attr("class", "barbg")
				.style("fill", function(d, i) { 
					return "#fd7c7c"
				})
				.attr("width", 0)
				.attr("x", 0)
				.attr("height", barHeight);

			bars.append("rect")
				.attr("class", "bar")
				.style("fill", function(d, i) { 
					return "#a3eea3"
				})
				.attr("width", 0)
				.attr("x", 0)
				.attr("height", barHeight);

			d3chart.append("line")
				.attr("class", "divider")
				.attr("x1", labelWidth)
				.attr("x2", labelWidth)
				.attr("y1", 0)
				.attr("y2", height)
				.attr("style", "stroke:rgb(255,255,255);stroke-width:2");

			d3chart.selectAll("text.name")
				.data(values)
				.enter().append("text")
				.attr("x", labelWidth - 10)
				.attr("y", function(d, i){ 
					return ((height / keys.length) * i) + barHeight / 2;
				})
				.attr("text-anchor", "end")
				.attr("dominant-baseline", "middle")
				.attr('class', 'name')
				.text(function(d, i) { 
					return keys[i]; 
				});

			drawVPolar(selector, true);
		});
	}

	function drawVPolar(selector, animate) {
		var $container = $(selector);
		var $svg = $container.find('svg');

		var labelWidth = 60;
		var margin = { top:20, left:10, right:10, bottom:15 };

		var height = $container.height() - margin.top - margin.bottom;
		var width = $container.width() - margin.left - margin.right - labelWidth;

		var xscale = $svg.data('xscale');
	    var yscale = $svg.data('yscale');

	    var x = xscale.range([0, width]);

		var d3chart = d3.selectAll($svg);

		var delay_func = function(d, i) { return 100 + 30 * (i); };

	    d3chart.selectAll("rect.bar")
	    	.transition()
			.attr("width", function(d, i) {
				return x(d);
			})
			.ease("in-out")
			.duration(animate ? 500 : 0)
	  		.delay(animate ? delay_func : 0);

	  	d3chart.selectAll("rect.barbg")
	    	.transition()
			.attr("width", width)
			.ease("in-out")
			.duration(animate ? 500 : 0)
	  		.delay(animate ? delay_func : 0);

	  	d3chart.selectAll("line.divider")
	    	.transition()
			.attr("x1", width/2 + labelWidth)
			.attr("x2", width/2 + labelWidth)
			.ease("in-out")
			.duration(animate ? 500 : 0)
	  		.delay(animate ? delay_func : 0);
	}

})();

