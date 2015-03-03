
(function() {

	$(window).resize(function(e) {
		// jquery ui resizable bug
		if ($(e.target).hasClass('ui-resizable')) return;

		initReach();
		drawReachMini();

		var $scrubWindow = $('#graph_reach_window');
		var position = $scrubWindow.position();
		updateReachScrubber($scrubWindow, position);
	});

	$(document).ready(function() {
		initReachMini();
		initReachScrubber();
	});

	var _reachData;

	function initReach() {
		var $container = $("#graph_media_reach").html("<svg xmlns='http://www.w3.org/2000/svg' perserveAspectRatio='xMinYMid'></svg>")
		var $svg = $container.find('svg');
		var width = $container.width() - 80;
		var height = $container.height() - 60;

		var $scrubWindow = $('#graph_reach_window');
		var swidth = $scrubWindow.width();
		var sleft = $scrubWindow.position().left;

		var x = d3.time.scale()
			.rangeRound([0, width]);

		var y = d3.scale.linear()
			.rangeRound([height, 0]);		

		var color = d3.scale.ordinal()
		    .range(["#4bb8f3", "#e4e9eb", "#979696", "#c9c9c9"]);

		var xAxis = d3.svg.axis()
		    .scale(x)
	    	.tickFormat(d3.time.format('%m/%d'))
		    .orient("bottom");

		var yAxis = d3.svg.axis()
		    .scale(y)
		    .ticks(6)
		    .orient("left")
		    .tickFormat(d3.format(".2s"));

		var svg = d3.select($svg[0])
			.append("g")
			.attr("transform", "translate(" + 50 + "," + 10 + ")");

		// attach all data
		$svg.data("x", x);
		$svg.data("y", y);
		$svg.data("xAxis", xAxis);
		$svg.data("yAxis", yAxis);

		var data = _reachData.slice(0);
		var $scrubBar = $('#graph_reach_mini_scrub');
		var sbWidth = $scrubBar.width();
		var dwidth = Math.round((swidth / sbWidth) * data.length);
		var dleft = Math.round((sleft / sbWidth) * data.length);
		data = data.slice(dleft, dleft + dwidth);

		color.domain(d3.keys(data[0]).filter(function(key) { return key !== "Date"; }));

		x.domain([new Date(data[0].Date), d3.time.day.offset(new Date(data[data.length - 1].Date), 1)]);
		// x.domain(data.map(function(d) { return new Date(d.Date); }));
		y.domain([0, Math.round(1.1 * d3.max(data, function(d) { return d.total; })) ]);

		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);

		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)

		var tip = d3.tip()
	  		.attr('class', 'reachtip')
	  		.html(function(d) {
	  			var html = $('#tip_template').clone();
	  			html.find('.content')
	  				.html("<div class='name'>" + d.name + "</div>" +
	  					"<div class='reach'>Total Reach</div>" +
	  					"<div class='value'>" + (d.y1 - d.y0) + "</div>");
	  			return html.html();
	  		})
	  		.direction(function(d, i) {
	  			if (x(new Date(d.date)) > width / 2) return 'w';
	  			else return 'e';
			})
			.offset(function(d, i) {
				if (x(new Date(d.date)) > width / 2) return [0, -3];
	  			else return [0, 3];
			});

		var state = svg.selectAll(".state")
			.data(data)
			.enter().append("g")
			.attr("class", "g")
			.attr("transform", function(d) { 
	    		return "translate(" + x(new Date(d.Date)) + ",0)"; 
	    	});

		state.selectAll("rect")
			.data(function(d) { return d.reach; })
			.enter().append("rect")
			.attr("class", "bar")
			.style("fill", function(d) { return color(d.name); })
			.attr('width', Math.floor(width / data.length) - 1)
	        .attr("y", function(d) { 
	        	return y(d.y1); 
	        })
			.attr("height", function(d) { 
				return y(d.y0) - y(d.y1); 
			})
			.call(tip)
			.on('mouseover', tip.show)
	  		.on('mouseout', tip.hide);
	}

	function initReachMini() {
		var $container = $("#graph_reach_mini,#graph_reach_mini_scrub").html("<svg xmlns='http://www.w3.org/2000/svg' perserveAspectRatio='xMinYMid'></svg>")
		var $svg = $container.find('svg');
		var width = $container.width();
		var height = $container.height();

		var xscale = d3.time.scale();
		var x =	xscale.rangeRound([0, width]);

		var yscale = d3.scale.linear();
		var y = yscale.rangeRound([0, height]);

		var svg = d3.selectAll($svg)
			.append("g");

		// attach all data
		$svg.data("xscale", xscale);
		$svg.data("yscale", yscale);

		d3.csv("/static/portfolio/meltwater/data/meltwater.csv", function(error, data) {
			if (error) return console.warn(error);

			_reachData = jQuery.extend(true, [], data);
			
			// setting up data with colors
			var keys = d3.keys(_reachData[0]);
			keys.shift();

			_reachData.forEach(function(d, i) {
				var y0 = 0;
				d.reach = keys.map(function(name) { 
					return {
						date: d.Date,
						index: i,
						name: name, 
						y0: y0, 
						y1: y0 += +d[name]
					}; 
				});
				d.total = d.reach[d.reach.length - 1].y1;
			});

			// setting up data with colors
			var max = 0;
			var values = data.map(function (d, i) {	
				var num = d3.values(d);
				var date = num.shift();

				var sum = num.reduce(function(a, b) {
	 				return +a + +b;
				});

				max = Math.max(max, sum);

				return {
					"total": sum,
					"date": date
				};
			});

			$svg.data("values",values);

			x.domain([new Date(data[0].Date), 
					d3.time.day.offset(new Date(data[data.length - 1].Date), 1)]);
			y.domain([0, (1.2 * max)]);

			var bars = svg.append("g")
				.attr("class", "g")

			bars.selectAll("rect")
				.data(values)
				.enter().append("rect")
				.attr("class", "bar")
				.attr("width", Math.round(width / values.length) - 1);

			svg.each(function(d, i) {
				d3.select(this)
					.selectAll("rect.bar")
					.style("fill", i == 0 ? "#e0e0e0" : "#4cb9f4");
			});

			drawReachMini();
			initReach();

		});

	}

	function drawReachMini() {
		var $container = $("#graph_reach_mini,#graph_reach_mini_scrub");
		var $svg = $container.find('svg');

		var height = $container.height();
		var width = $container.width();

		var xscale = $svg.data('xscale');
	    var yscale = $svg.data('yscale');

	    var x =	xscale.rangeRound([0, width]);
	    var y = yscale.rangeRound([0, height]);

	    var values = $svg.data('values');

	    var d3chart = d3.selectAll($svg);

	    d3chart.selectAll("rect.bar")
	    	.attr("width", Math.round(width / values.length) - 1)
			.attr("height", function(d, i) {
				return y(d.total);
			})
			.attr("y", function(d, i) {
				return height - y(d.total);	
			})
			.attr("x", function(d, i) {
				return x(new Date(d.date));
			});
	}

	function initReachScrubber() {
		var $scrubWindow = $('#graph_reach_window');

		$scrubWindow.draggable({ 
			axis:"x",
			handle:"div.drag_handle",
			containment: "parent",
			drag: function(event, data) {
				updateReachScrubber(data.helper, data.position);
				initReach();
	      	},
			stop: function() {

			}
		});

		var position = $scrubWindow.position();
		updateReachScrubber($scrubWindow, position);
	}

	function updateReachScrubber(obj, pos) {
		var $scrubWindow = obj;
		var $scrubBar = $('#graph_reach_mini_scrub');

		var bw = $scrubBar.width();
		var sw = $scrubWindow.width();

		sw = Math.min(sw, bw);
		if (sw > bw) {
			sw = bw;
			obj.width(sw);
		}

		var left = pos.left;
		if (bw - left < sw) {
			left = sw;
			obj.css("left", left);		
		}

		$scrubWindow.resizable({
			containment:'parent',
			handles: {
				'e':'.ui-resizable-e',
				'w':'.ui-resizable-w'
			},
			maxHeight: 60,
			maxWidth: bw,
			minHeight: 60,
			minWidth: 200,
	        resize: function(e, ui) {
	        	var $scrubWindow = $(this);
				var position = $scrubWindow.position();
				updateReachScrubber($scrubWindow, position);
				initReach();
	        }
		});

		$scrubBar.css("clip", "rect(0px," + (left + sw) + "px,60px," + (left) + "px)");
	}

})();
