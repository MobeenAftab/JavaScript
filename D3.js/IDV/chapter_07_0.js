/**
 * Linear scaling using d3.min() and d3.max() to dynamically set 
 * to keep code flexible and scaleable
 * 
 * Scale takes input domain and output range, the output range translate
 * to display values in pixel units.
 */

let dataset = [
    [5, 20],
    [480, 90],
    [250, 50],
    [100, 33],
    [330, 95],
    [410, 12],
    [475, 44],
    [25, 67],
    [85, 21],
    [220, 88],
    [600, 150]
];


let scatterplot = function () {
    //Width and height
    var w = 500;
    var h = 300;
    var padding = 20;

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

    // Custom scale for circle radius
    var rScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function (d) {
            return d[1];
        })])
        .range([2, 5]);

    // Calculate area of circle for scale
    var aScale = d3.scaleSqrt()
        .domain([0, d3.max(dataset, function (d) {
            return d[1];
        })])
        .range([0, 10]);

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
            return aScale(d[1]);   // a scale for area
        });

    //Create labels
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

}