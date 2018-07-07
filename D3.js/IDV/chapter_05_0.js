var dataset;

// Function to handle conversion of each column
var rowConverter = function(d) {
    return {
        Food: d.Food, // No converstion
        Deliciousness: parseFloat(d.Deliciousness)
    };
}

// Load csv format dataset
d3.csv("food.csv").then(function(data) {
    dataset = data;
    rowConverter(data);
    console.log(data);
});