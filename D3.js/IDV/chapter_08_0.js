/**
 * Linear scaling using d3.min() and d3.max() to dynamically set 
 * to keep code flexible and scaleable
 * 
 */

//Dynamic,	random	dataset 
var dataset = [];
var numDataPoints = 50;
var xRange = Math.random() * 1000;
var yRange = Math.random() * 1000;
for (var i = 0; i < numDataPoints; i++) {
    var newNumber1 = Math.floor(Math.random() * xRange);
    var newNumber2 = Math.floor(Math.random() * yRange);
    dataset.push([newNumber1, newNumber2]);
}

let scatterplot = function () {
    //Width and height
    var w = 500;
    var h = 300;
    var padding = 30;

    //Create scale functions
    var xScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function (d) {
            return d[0];
        })])
        .range([padding, w - padding * 2]);
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function (d) {
            return d[1];
        })])
        .range([h - padding, padding]);
    var aScale = d3.scaleSqrt()
        .domain([0, d3.max(dataset, function (d) {
            return d[1];
        })])
        .range([0, 10]);
    //Define X axis
    var xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(7);
    //Define Y axis
    var yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(7);
    //Create SVG element
    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
    //Create circles
    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return xScale(d[0]);
        })
        .attr("cy", function (d) {
            return yScale(d[1]);
        })
        .attr("r", function (d) {
            return aScale(d[1]); // a scale for area
        });
    /* Create labels
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function (d) {
            return d[0] + "," + d[1];
        })
        .attr("x", function (d) {
            return xScale(d[0]);
        })
        .attr("y", function (d) {
            return yScale(d[1]);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "red");
    */  
    //Create X axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);

    //Create Y axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

    /*
    // Not used in this example

    // Number formating function for unrounded numbers
    var formatAsPercentage = d3.format(".1%");

    x.Axis.tickFormat(formatAsPercentage);
    */
}