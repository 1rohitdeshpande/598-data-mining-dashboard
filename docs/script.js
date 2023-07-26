// Define the container where the graph will be rendered
const graphContainer = '#my_dataviz';

function createGraph(dataFile, xLabel, yLabel, title, description, tooltiplabel) {
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
    var xScale = d3.scaleLinear()
      .domain(d3.extent(data, function (d) { return d.year; }))
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale).tickFormat(d3.format("d")))
      .append("text")      // Text for the X axis
      .attr("x", width / 2)
      .attr("y", margin.bottom / 1.5)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("fill", "#000")
      .text(xLabel);

    // Add Y axis
    var yScale = d3.scaleLinear()
      .domain([0, d3.max(data, function (d) { return +d.total_points; })])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(yScale))
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
        .x(function (d) { return xScale(d.year) })
        .y(function (d) { return yScale(d.total_points) })
      );

    // Add data points to the chart with tooltips
    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.year))
      .attr("cy", d => yScale(d.total_points))
      .attr("r", 5)
      .attr("fill", "steelblue")
      .on("mouseover", function (event, d) {
        showTooltip(event, d, d.year, d.total_points, tooltiplabel);
      })
      .on("mouseout", hideTooltip);

    d3.select("#chart-summary").text(description);
  });
}

// Function to handle button click events
function handleButtonClick(event) {
  const buttonId = event.target.id;
  switch (buttonId) {
    case 'btn1':
      var desc = 'This graph shows the points per season increasing as the years go on, showing the nature of the changing game. The 2 outliers to this trend are 2011 which was a shortened season due to contractual disputes between players and the NBA, and 2020 which was a shortened season due to COVID.';
      createGraph('scores_final.csv', 'Year', 'Total Points per Season', 'Total Points per NBA Season By Year', desc, 'Total Points');
      break;
    case 'btn2':
      var desc = 'This graph shows how the NBA has evolved into more 3 point shots per game. Players like Ray Allen, Stephen Curry, and Reggie Miller, just to name a few, revolutionized the 3 point shot and made it a commonplace in today\'s game. Now you might notice a couple outliers at 2011 and 2020. 2011 was a shortened season due to contractual disputes between players and the NBA, and 2020 was a shortened season due to COVID.';
      createGraph('3pt_final.csv', 'Year', 'Total 3 Point attempts by Season', 'Total 3 Point attempts by Season By Year', desc, 'Total 3-pt Attempts');
      break;
    case 'btn3':
      var desc = 'This position has seen the most dynamic change in thr last 20 years. What was once a position that lived in the paint shooting layups and dunks only is today shooting more threes than ever before. Now you might notice a couple outliers at 2011 and 2020. 2011 was a shortened season due to contractual disputes between players and the NBA, and 2020 was a shortened season due to COVID.';
      createGraph('C3pt_final.csv', 'Year', 'Total 3 Point attempts by Centers per Season', 'Total 3 Point attempts by Centers per Season By Year', desc, 'Total 3-pt Attempts by Centers');
      break;
    case 'btn4':
      var desc = 'This graph shows the percentage of field goal attempts that are 3 point attempts. While the other graphs show that the number of 3 point attempts have gone up, this shows how 3 point attemps compare to 2 point attempts. The trend shows to indicate that the 3 pointer is only becoming more popular. One interesting thing to note is that there are no dips in 2011 or 2020 for shortened seasons because we are looking at the 3 point shot as a percentage of total shot attempts, not just pure volume.';
      createGraph('fg_3pt_percentage.csv', 'Year', 'Percentage of FG attempts from 3-pt', 'Percentage of FG attempts from 3-pt By Year', desc, 'Percentage of FG attempts from 3-pt');
      break;
    default:
      break;
  }
}

// Function to create and display the tooltip
function showTooltip(event, dataPoint, xValue, yValue, yLabel) {
  // Remove existing tooltips before adding a new one
  d3.selectAll(".tooltip").remove();

  if (yLabel.includes("Percentage")) {
    const tooltip = d3.select(graphContainer)
      .append("div")
      .attr("class", "tooltip")
      .html(`<strong>Year:</strong> ${xValue}<br><strong>${yLabel}:</strong> ${parseFloat(yValue).toFixed(3)}`)
      .style("left", `${event.pageX}px`)
      .style("top", `${event.pageY - 30}px`) // Shift the tooltip up to be near the data point
      .style("opacity", 0.9);
  } else {
    const tooltip = d3.select(graphContainer)
      .append("div")
      .attr("class", "tooltip")
      .html(`<strong>Year:</strong> ${xValue}<br><strong>${yLabel}:</strong> ${parseInt(yValue)}`)
      .style("left", `${event.pageX}px`)
      .style("top", `${event.pageY - 30}px`) // Shift the tooltip up to be near the data point
      .style("opacity", 0.9);
  }
}

// Function to remove the tooltip
function hideTooltip() {
  d3.selectAll(".tooltip").remove();
}


// Add event listeners to the buttons
document.getElementById('btn1').addEventListener('click', handleButtonClick);
document.getElementById('btn2').addEventListener('click', handleButtonClick);
document.getElementById('btn3').addEventListener('click', handleButtonClick);
document.getElementById('btn4').addEventListener('click', handleButtonClick);

//scores_final.csv
//3pt_final.csv
//C3pt_final.csv
