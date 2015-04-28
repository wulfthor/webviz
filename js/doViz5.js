

/**
 * Created by thw on 28/04/15.
 */

var w = 1000;
var h = 900;
var padding = 20;

var parseDate = d3.time.format("%m/%d/%Y %H:%M:%S").parse;

function showHeader (ds) {
    var tmpString = ds['object'];
    console.log(tmpString);
    d3.select("body").append("h1")
        .text(tmpString);
}

function generateVis (ds) {
    console.log("into viz");
    console.log(ds['stats'].length);
    /*
    ds['stats'].forEach(function(d) {
    //d.Poll_Time = parseDate(d.Poll_Time);
        console.log(parseDate(d.Poll_Time));
        console.log("R: " + d.Response_Time_ms);
        console.log("S: " + d.Average_Busy_Queue_Length);
    });
    */


    var time_extent = d3.extent(ds['stats'], function(d) { return parseDate(d.Poll_Time); });
    console.log(time_extent);
    var time_scale = d3.time.scale()
        .domain(time_extent)
        .range([padding, w-padding]);

    var y_extent = d3.extent(ds['stats'], function (d) { return Math.floor(d.Response_Time_ms); });
    var y_max = d3.max(ds['stats'], function (d) { return Math.floor(d.Response_Time_ms);});
    var y_min = d3.min(ds['stats'], function (d) { return Math.floor(d.Response_Time_ms);});

    console.log(y_extent);
    console.log(y_max);
    console.log(y_min);


    var yScale = d3.scale.linear()
        .domain([0, y_max])
        .range([padding,h]);


    var xAxisGen = d3.svg.axis().scale(time_scale).orient("bottom");

    var yAxisGen = d3.svg.axis().scale(yScale).orient("left");


    var i = 0;
    var lineFun = d3.svg.line()
        .x(function(d) { return time_scale((parseDate(d.Poll_Time)))})
        .y(function(d) {return yScale(Math.floor(d.Response_Time_ms))})
        .interpolate("basis");


    var lineFun2 = d3.svg.line()
        .x(function(d) { return time_scale((parseDate(d.Poll_Time)))})
        .y(function(d) {return yScale(Math.floor(d.Average_Busy_Queue_Length))})
        .interpolate("basis");


    var svg = d3.select("body").append("svg").attr({
        height:h, width: w
    });

    var yAxis = svg.append("g").call(yAxisGen)
        .attr("class","axis")
        .attr("transform", "translate(" + (4 + padding)  + ",0)");

    var xAxis = svg.append("g").call(xAxisGen)
        .attr("class","axis")
        .attr("transform", "translate(10," + (h - padding)  + ")");


    var viz;
    viz = svg.append("path")
        .attr({
            d: lineFun(ds['stats']),
            "stroke":"purple",
            "stroke-width": 2,
            "fill":"none"
        });
/*
    ds['stats'].forEach(function(d) {
        console.log(d.Response_Time_ms);
    });
    */

    var vizService;
    vizService = svg.append("path")
        .attr({
            d: lineFun2(ds['stats']),
            "stroke":"blue",
            "stroke-width": 4,
            "fill":"none"
        });
/*
    ds['stats'].forEach(function(d) {
        console.log(d.Average_Busy_Queue_Length);
    });
    */



    var labels = svg.selectAll("text")
        .data(ds['stats'])
        .enter()
        .append("text")
        .text(function(d) {
            //console.log("ddd " + Math.floor(d.Response_Time_ms));
            return (Math.floor(d.Response_Time_ms))})
        .attr({
            "text-anchor":"middle",
            x: function(d) {
                //console.log("into xlabel " + d.Poll_Time);
                return time_scale(parseDate(d.Poll_Time));},
            y: function(d) {
                //console.log("into ylabel " + d.Response_Time_ms);
                return (Math.floor(d.Response_Time_ms))},
            "font-size":"12px",
            "font-family":"sans-serif",
            "text-anchor":"start",
            "dy":".35em"

        });


}


d3.json("/webviz/data/total.json", function(error, data) {
    console.log("into .xx");
    /**
     * Created by thw on 21/04/15.
     */
    if (error) {
        console.log(error);
    }

    data.forEach(function(ds){
        //console.log(ds['object']);
        if (ds['object'].contains("Lun")) {
            console.log(ds['object']);
            showHeader(ds);
            generateVis(ds);
        }
    });

});


