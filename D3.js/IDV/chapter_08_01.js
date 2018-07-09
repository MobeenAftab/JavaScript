var timeSeries = function () {
    //Width and height
    var w = 500;
    var h = 300;
    var padding = 40;

    var dataset, xScale, yScale, xAxis, yAxis; //Empty, for now
    //For converting strings to Dates
    var parseTime = d3.timeParse("%m/%d/%y");
    //For converting Dates to strings
    var formatTime = d3.timeFormat("%e");
    //Function for converting CSV values from strings to Dates and numbers
    var rowConverter = function (d) {
        return {
            Date: parseTime(d.Date),
            Amount: parseInt(d.Amount)
        };
    }
    //Load in the data
    d3.csv("time_scale_data.csv", rowConverter).then(function (data) {
        //Copy data into global dataset
        dataset = data;
        //Discover start and end dates in dataset
        var startDate = d3.min(dataset, function (d) {
            return d.Date;
        });
        var endDate = d3.max(dataset, function (d) {
            return d.Date;
        });
        //Create scale functions
        xScale = d3.scaleTime()
            .domain([
                d3.timeDay.offset(startDate, -1), //startDate minus one day, for padding
                d3.timeDay.offset(endDate, 1) //endDate plus one day, for padding
            ])
            .range([padding, w - padding]);
        yScale = d3.scaleLinear()
            .domain([
                0, //Because I want a zero baseline
                d3.max(dataset, function (d) {
                    return d.Amount;
                })
            ])
            .range([h - padding, padding]);
        //Define X axis
        xAxis = d3.axisBottom()
            .scale(xScale)
            .ticks(9)
            .tickFormat(formatTime);
        //Define Y axis
        yAxis = d3.axisLeft()
            .scale(yScale)
            .ticks(10);
        //Create SVG element
        var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
        //Generate guide lines
        svg.selectAll("line")
            .data(dataset)
            .enter()
            .append("line")
            .attr("x1", function (d) {
                return xScale(d.Date);
            })
            .attr("x2", function (d) {
                return xScale(d.Date);
            })
            .attr("y1", h - padding)
            .attr("y2", function (d) {
                return yScale(d.Amount);
            })
            .attr("stroke", "#ddd")
            .attr("stroke-width", 1);
        //Generate circles last, so they appear in front
        svg.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return xScale(d.Date);
            })
            .attr("cy", function (d) {
                return yScale(d.Amount);
            })
            .attr("r", 2);

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
    });
}