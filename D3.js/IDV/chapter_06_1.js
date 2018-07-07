var dataset = [
    [5, 20],
    [480, 90],
    [250, 50],
    [100, 33],
    [330, 95],
    [410, 12],
    [475, 44],
    [25, 67],
    [85, 21],
    [220, 88]
];

let scatterplot = function() {
    let w = 500;
    let h = 100;

    // Create SVG element
    let svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        // Assign [x,y] value on scatterplot for each data element
        .attr("cx", function(d) { return d[0]; })
        .attr("cy", function(d) { return d[1]; })
        .attr("r", function(d) { return Math.sqrt(h - d[1]); });

    // Attach labels to circles
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        // Specify each elements data points
        .text(function(d) { return d[0] + "," + d[1] })
        .attr("x", function(d) { return d[0]; })
        .attr("y", function(d) { return d[1]; })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "red");
}