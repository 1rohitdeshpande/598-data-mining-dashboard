// Set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// Append the SVG object to the body of the page
var svg = d3.select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Read the data
d3.csv("scores_final.csv").then(function (data) {

  // Add X axis
  var x = d3.scaleLinear()
    .domain(d3.extent(data, function (d) { return d.year; }))
    .range([0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickFormat(d3.format("d")))
    .append("text")      // Text for the X axis
    .attr("x", width / 2)
    .attr("y", margin.bottom)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("fill", "#000")
    .text("Year");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) { return +d.total_points; })])
    .range([height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y))
    .append("text")      // Text for the Y axis
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left)
    .attr("x", -(height / 2))
    .attr("dy", "1em")
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("fill", "#000")
    .text("Total Points per Season");

  // Add the line
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function (d) { return x(d.year) })
      .y(function (d) { return y(d.total_points) })
    );
});
