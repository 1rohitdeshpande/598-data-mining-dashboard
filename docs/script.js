// Specify the size of the visualization
var margin = {top: 20, right: 20, bottom: 50, left: 70},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Define the scales to convert our data to screen coordinates
var xScale = d3.scaleLinear().range([0, width]);
var yScale = d3.scaleLinear().range([height, 0]);

// Define our axes
var xAxis = d3.axisBottom().scale(xScale);
var yAxis = d3.axisLeft().scale(yScale);

// Define the line generator function
var line = d3.line()
    .x(function(d) { return xScale(d.year); })
    .y(function(d) { return yScale(d.total_points); });

// Create the SVG and its inner group element
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Load the data and visualize
d3.csv("final_scores.csv", function(error, data) {
  if (error) throw error;

  // Parse the data to numbers
  data.forEach(function(d) {
    d.year = +d.year;
    d.total_points = +d.total_points;
  });

  // Set the domains of our scales
  xScale.domain(d3.extent(data, function(d) { return d.year; }));
  yScale.domain([0, d3.max(data, function(d) { return d.total_points; })]);

  // Draw the line!
  svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);

  // Add the axes
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Year");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Total Points per Season");
});
