
(function() {

	$(window).resize(function() {
		drawVStacked("#graph_themes,#graph_sources", false);
	});

	$(document).ready(function() {
		initVStacked("#graph_themes,#graph_sources",
			"/static/portfolio/meltwater/data/source.csv");
	});

	function initVStacked(selector, data_url) {
		var $container = $(selector).html("<svg xmlns='http://www.w3.org/2000/svg' perserveAspectRatio='xMinYMid'></svg>")
		var $svg = $container.find('svg');

		var barGap = 4;
		var labelWidth = 60;
		var margin = { top:20, left:10, right:10, bottom:15 };

		var height = $container.height() - margin.top - margin.bottom;
		var width = $container.width() - margin.left - margin.right - labelWidth;

		var xscale = d3.scale.linear();
		var yscale = d3.scale.ordinal();
		var color = d3.scale.ordinal()
		    .range(["#4bb8f3", "#e4e9eb", "#979696", "#c9c9c9", "#333"]);

		$svg.data("xscale", xscale);
		$svg.data("yscale", yscale);

		var d3chart = d3.selectAll($svg)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		d3.csv(data_url, function(error, data) { 
			if (error) return console.warn(error);

			var items = d3.keys(data[0]);
			items.shift();

			var keys = data.map(function(d) {
				return d.Key;
			});

			var max = 0;
			var values = data.map(function(d, di) {
				var num = d3.values(d);
				num.shift();

				var index = 0;
				var stacks = num.map(function(n, ni) {
					return {
						item: items[ni],
						y0: index,
						y1: index += +n
					};
				});

				max = Math.max(max, index);

				return {
					"key": keys[di],
					"stacks" : stacks,
					"total" : index
				};
			});

			color.domain(items);
			yscale.domain(keys);
			xscale.domain([0, max]);

			var y = yscale.rangeBands([0, height]);
			var x = xscale.range([0, width]);

			var barHeight = (height / keys.length) - barGap;

			var bars = d3chart.selectAll(".bar")
				.data(values)
				.enter()
				.append("g")
				.attr("transform", function(d) { 
					return "translate(" + labelWidth + 
						"," + y(d.key) + ")";
				})
				.attr("class", "g");

			bars.selectAll("rect")
				.data(function(d) { 
					return d.stacks; 
				})
				.enter().append("rect")
				.attr("class", "bar")
				.style("fill", function(d, i) { 
					return color(d.item)
				})
				.attr("width", 0)
				.attr("x", 0)
				
				.attr("height", barHeight);

			d3chart.selectAll("text.name")
				.data(values)
				.enter().append("text")
				.attr("x", labelWidth - 10)
				.attr("y", function(d, i){ 
					return y(d.key) + barHeight / 2; 
				})
				.attr("text-anchor", "end")
				.attr("dominant-baseline", "middle")
				.attr('class', 'name')
				.text(function(d, i) { 
					return d.key; 
				});

			drawVStacked(selector, true);
		});
	}

	function drawVStacked(selector, animate) {
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
				return x(d.y1) - x(d.y0);
			})
			.attr("x", function(d, i) {
				return x(d.y0);
			})
			.ease("in-out")
			.duration(animate ? 500 : 0)
	  		.delay(animate ? delay_func : 0);
	}

})();


