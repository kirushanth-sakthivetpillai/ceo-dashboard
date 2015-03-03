
(function() {

	$(window).resize(function() {
		drawPercent();
	});

	$(document).ready(function() {
		initPercent();
	});

	function initPercent() {
		var $container = $("#graph_percent").html("<svg xmlns='http://www.w3.org/2000/svg' perserveAspectRatio='xMinYMid'></svg>")
		var $svg = $container.find('svg');
		var height = $container.height();
		var width = $container.width();

		var padding = 15;
		var radius = Math.floor(height / 2) - padding;
		var innerRadius = radius * 0.7;

		var dataset = ["Tesla", "Audi", "Porche", "BMW"];
		var dataLength = dataset.length;

		var color = d3.scale.ordinal()
		    .range(["#4bb8f3", "#e4e9eb", "#979696", "#c9c9c9"])
		    .domain(dataset);
	    var tcolor = d3.scale.ordinal()
		    .range(["#fff", "#333", "#fff", "#333"])
		    .domain(dataset);

		$svg.attr("width", width).attr("height", height);

		var arc = d3.svg.arc()
			.innerRadius(innerRadius)
			.outerRadius(radius)
		  	.startAngle(function(d, i) { return ((2 * Math.PI) / dataLength) * i; })
		  	.endAngle(function(d, i) { return ((2 * Math.PI) / dataLength) * (i + 1); });

		var svg = d3.select($svg[0])
		  	.selectAll("g")
		  	.data(dataset)
		  	.enter()
		  	.append("g")
		  	.attr("transform", "translate(" + width / 2 + "," + (10 + height / 2) + ")");

		var circle = svg.append("g");

		circle.append("circle")
				.style("fill", "#193b57")
				.attr("cx", 0)
				.attr("cy", 0)
				.attr("r", innerRadius);

		var arcs = svg.append("path")
		  	.attr("fill", function(d, i) { return color(d) })
		  	.attr("id", function(d, i) { return "s"+i; })
		  	.attr("d", arc);

		var label = svg.append("g")
		  	.style("fill","#333")
		  	.attr("class", "label");

		label.append("text")
		  	.attr("letter-spacing", 2)
		  	.attr("dy", 8)
		  	.append("textPath")
		  		.style("fill", function(d, i) {
		  			return tcolor(d);
		  		})
		  		.attr("xlink:href", function(d,i) { return "#s"+i; })
		  		.attr("text-anchor", "middle")
		  		.attr("startOffset", radius * 0.25 * Math.PI)
				.attr("dominant-baseline", "hanging")
		  		.text(function(d) { return d; })
	}

	function drawPercent() {
		var $container = $("#graph_percent");
		var $svg = $container.find('svg');
		var height = $container.height();
		var width = $container.width();

		$svg.attr("width", width)
			.attr("height", height)
			.children('g')
				.attr("transform", "translate(" + width / 2 + "," + (10 + height / 2) + ")");
	}

})();

