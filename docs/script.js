// Define the container where the graph will be rendered
const graphContainer = '#my_dataviz';

function createGraph(dataFile, xLabel, yLabel, title) {
  // Clear the container
  d3.select(graphContainer).selectAll("*").remove();

  // Set the dimensions and margins of the graph
  var margin = { top: 50, right: 30, bottom: 50, left: 80 },
    width = 500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // Append the SVG object to the body of the page
  var svg = d3.select(graphContainer)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Read the data
  d3.csv(dataFile).then(function (data) {

    // Add X axis
    var x = d3.scaleLinear()
        .domain(d3.extent(data, function (d) { return d.year; }))
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.format("d")))
        .append("text")      // Text for the X axis
        .attr("x", width / 2)
        .attr("y", margin.bottom / 1.5)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("fill", "#000")
        .text(xLabel);

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
        .text(yLabel);

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

    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", -margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("text-decoration", "underline")
        .text(title);
  });
}

/*// Function to handle button click events
function handleButtonClick(event) {
  const buttonId = event.target.id;
  switch (buttonId) {
    case 'btn1':
      createGraph('scores_final.csv', 'Year', 'Total Points per Season', 'Total Points per NBA Season By Year');
      break;
    case 'btn2':
      createGraph('3pt_final.csv', 'Year', 'Total 3 Point attempts by Season', 'Total 3 Point attempts by Season By Year');
      break;
    case 'btn3':
      createGraph('C3pt_final.csv', 'Year', 'Total 3 Point attempts by Centers per Season', 'Total 3 Point attempts by Centers per Season By Year');
      break;
    default:
      break;
  }
}

// Add event listeners to the buttons
document.getElementById('btn1').addEventListener('click', handleButtonClick);
document.getElementById('btn2').addEventListener('click', handleButtonClick);
document.getElementById('btn3').addEventListener('click', handleButtonClick);


function createGraph(dataFile, container, xLabel, yLabel, title) {

  // Clear the container
  d3.select(container).selectAll("*").remove();

  // Set the dimensions and margins of the graph
  var margin = { top: 50, right: 30, bottom: 50, left: 80 },
      width = 500 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  // Append the SVG object to the body of the page
  var svg = d3.select(container)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Read the data
  d3.csv(dataFile).then(function (data) {

    // Add X axis
    var x = d3.scaleLinear()
        .domain(d3.extent(data, function (d) { return d.year; }))
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.format("d")))
        .append("text")      // Text for the X axis
        .attr("x", width / 2)
        .attr("y", margin.bottom / 1.5)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("fill", "#000")
        .text(xLabel);

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
        .text(yLabel);

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

    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", -margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("text-decoration", "underline")
        .text(title);
  });
}

document.getElementById('btn1').addEventListener('click', function() {
  createGraph('scores_final.csv', '#my_dataviz', 'Year', 'Total Points per Season', 'Total Points per NBA Season By Year');
});

document.getElementById('btn2').addEventListener('click', function() {
  createGraph('3pt_final.csv', '#my_dataviz', 'Year', 'Total 3 Point attempts by Season', 'Total 3 Point attempts by Season By Year');
});

document.getElementById('btn3').addEventListener('click', function() {
  createGraph('C3pt_final.csv', '#my_dataviz', 'Year', 'Total 3 Point attempts by Centers per Season', 'Total 3 Point attempts by Centers per Season By Year');
});*/


//scores_final.csv
//3pt_final.csv
//C3pt_final.csv
