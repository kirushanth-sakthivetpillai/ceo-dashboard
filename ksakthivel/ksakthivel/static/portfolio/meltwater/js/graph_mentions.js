(function() {

	$(window).resize(function() {
		drawMentions("#graph_mentions",
			false);
		drawMentions("#graph_advertising",
			false);
	});

	$(document).ready(function() {
		initMentions("#graph_mentions", 
			"/portfolio/meltwater/api/mentions/");
		initMentions("#graph_advertising",
			"/portfolio/meltwater/api/mentions/");
	});

	function initMentions(selector, data_url) {
		var $container = $(selector).html("<svg xmlns='http://www.w3.org/2000/svg' perserveAspectRatio='xMinYMid'></svg>")
		var $svg = $container.find('svg');

		var barGap = 4;
		var labelWidth = 70;
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

			var companies = data.map(function(d) {
				return d.Key;
			});

			var total_mentions = 0;
			var mentions = data.map(function(d) {
				var val = +d.Value;
				total_mentions += val;
				return val;
			});

			companies.push("Avg");
			mentions.push(total_mentions / mentions.length);

			yscale.domain(mentions);
			var y = yscale.rangeBands([0, height]);	

			xscale.domain([0, d3.max(mentions)]);
			var x = xscale.range([0, width]);

			var barHeight = (height / mentions.length) - barGap;

			color.domain(mentions);

			d3chart.selectAll("rect")
				.data(mentions)
				.enter().append("rect")
				.attr("class", "bar")
				.style("fill", function(d) { 
					return color(d); 
				})
				.attr("width", 0)
				.attr("x", labelWidth)
				.attr("y", function(d, i) { 
					return ((height / mentions.length) * i);
				})
				.attr("height", barHeight);

			d3chart.selectAll("text.score")
				.data(mentions)
				.enter().append("text")
				.attr("opacity", 0)
				.attr("x", labelWidth)
				.attr("y", function(d, i) { 
					return ((height / mentions.length) * i) + barHeight / 2;
				})
				.attr("text-anchor", "end")
				.attr("dominant-baseline", "middle")
				.attr('class', 'score')
				.text(function(d) { return d; });

			d3chart.selectAll("text.name")
				.data(mentions)
				.enter().append("text")
				.attr("x", labelWidth - 10)
				.attr("y", function(d, i){ 
					return ((height / mentions.length) * i) + barHeight / 2;
				})
				.attr("text-anchor", "end")
				.attr("dominant-baseline", "middle")
				.attr('class', 'name')
				.text(function(d, i) { return companies[i]; });

			drawMentions(selector, true);

		});
	}

	function drawMentions(selector, animate) {
		var $container = $(selector);
		var $svg = $container.find('svg');

		var labelWidth = 70;
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
			.attr("width", x)
			.ease("in-out")
			.duration(animate ? 500 : 0)
	  		.delay(animate ? delay_func : 0);

		d3chart.selectAll("text.score")
			.transition()
			.attr("opacity", 1)
			.attr("x", function(d) { return x(d) + labelWidth - 10; })
			.ease("in-out")
			.duration(animate ? 500 : 0)
	  		.delay(animate ? delay_func : 0);

	}

})();

