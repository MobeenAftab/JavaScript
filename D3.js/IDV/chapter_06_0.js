var dataset = [];

// Generate random dataset 
for (var i = 0; i < 25; i++) {
    var newNumber = Math.floor(Math.random() * 30);
    dataset.push(newNumber);
}

console.log(dataset);

var barChart = function () {
    d3.select("body").selectAll("div")
        .data(dataset)
        .enter()
        .append("div")
        .attr("class", "bar")
        .style("height", function (d) {
            return d * 5 + "px" // Change height pixel based on data value
        });
};

var SVG = function() {
    let w = 500;
    let h = 50;

    let svg = d3.select("body").append("svg");
    // svg is a reference to the DOM element and thus you can
    // apply methods directly to that element, use this to hold
    // DOM references to dynamically apply changes
    svg.attr("width", w)
        .attr("height", h);

    // Draw SVG
    let circles = svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle");
    
    circles.attr("cx", function(d, i){
        return (i * 50) + 25;
    })
    .attr("cy", h/2)
    .attr("r", function(d) {
        return d;
    })
    .attr("stroke-width", function(d) { return d/2; });
}

var barChart2 = function() {
    let w = 500;
    let h = 100;
    let barPadding = 1;

    // Create SVG elemnt
    let svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h);
    
    // Generate rects for each data element
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", function(d) {
            // Draw barChart from bottom up
            return h - d;   // Height minus data value
        })
        .attr("width", w / dataset.length -	barPadding)
        .attr("height", function(d) {
            return d * 4;
        })
        .attr("x", function(d, i) {
            return i * (w / dataset.length); // Bar width padding
        })
        .attr("fill", function(d) {
            // Dual encoding the data values colours
            return "rgb(0, 0, " + Math.round(d * 10) + ")";
        });
}