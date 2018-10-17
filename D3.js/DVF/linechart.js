var w = 350;
var h = 400;

var monthlySales = [
    {'month': 10, 'sales':20},
    {'month': 20, 'sales':30},
    {'month': 30, 'sales':50},
    {'month': 40, 'sales':40},
    {'month': 50, 'sales':80},
    {'month': 60, 'sales':10},
    {'month': 70, 'sales':70},
    {'month': 80, 'sales':50},
    {'month': 90, 'sales':80},
    {'month': 100, 'sales':20},
];

// Update to version d3.4
var lineFunction = d3.svg.path()
                        .x((d) => d.month*2)
                        .y((d) => d.sales)
                        .interpolate('linear');

var svg = d3.select('body').append('svg')
            .attr('width', w)
            .attr('height', h);

