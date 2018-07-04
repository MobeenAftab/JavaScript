var dataset = [ 5, 10, 15, 20, 25 ];

var barChart = function () {
    d3.select("body").selectAll("div")
        .data(dataset)
        .enter()
        .append("div")
        .attr("class", "bar");
};

barChart();