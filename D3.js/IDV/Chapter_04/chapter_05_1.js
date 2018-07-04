var dataset = [5, 10, 15, 20, 25 ];

// Create a new element for each element in dataset
// reference to element is passed down through method chain
var addParagraph = function() {
    d3.select("body").selectAll("p")   // Select all <p> in <body>
    .data(dataset)  // Counts and parses our data values
    .enter()    // Create new data-bound elements
    .append("p")    // Append <p> element to DOM placeholder
    .style("color", function(d){    // Style elements using annon function
        return d > 15 ? "red" : "black";
    })
    // .text("New paragraph"); // Incert value in newly created <p>
    .text(function(d) {return 'Value: ' + d;}); // Return data from dataset
}

addParagraph();
