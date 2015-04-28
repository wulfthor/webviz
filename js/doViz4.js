/**
 * Created by thw on 23/04/15.
 *
 * Create a bar-chart based on date and response-time
 */


// 1: set the canvas
var test = 1;
var w = 500;
var h = 900;
var padding = 2;
var testdata = { "stats": [5,10,6,2,5,3,2],"Response_Time_ms":[3,2,6,7,12,3]};
var mtestdata = [5,30,16,12,15,23,12];


// 3:Header

function buildHeader(ds) {
    d3.select("body").append("h1")
        .text(ds['object'])
}

function buildBars(ds) {
    console.log("into build");

    // 4: Define svg and append to DOM
    var viz = d3.select("body").append("svg")
        .attr("width",w)
        .attr("height",h);

    // create rects for bar
    viz.selectAll("rect")
        .data(ds)
        .enter()
        .append("rect")
        .attr("x", function(d,i) { return i * (w / ds.length)})
        .attr("y", function(d) { return ( h - d)})
        .attr("width", w / ds.length)
        .attr("height", function(d) { return d;});



}

// 2: get dataset

d3.json("/webviz/data/parsed5.json", function(error, data) {
    if (error) {
        console.log(error);
    } else {
        console.log(data);
        data.content.forEach(function(ds) {
            console.log(ds['stats']);
            console.log(ds['object']);

            buildHeader(ds);
            if (test == 1) {
                buildBars(mtestdata);
            } else {
                buildBars(ds);
            }
        });

    }
});





