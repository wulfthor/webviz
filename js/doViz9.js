 var w = 500;
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
     ds['stats'].forEach(function(d) {
         //d.Poll_Time = parseDate(d.Poll_Time);
         console.log(parseDate(d.Poll_Time));
     });


     var time_extent = d3.extent(ds['stats'], function(d) { return parseDate(d.Poll_Time); });
     console.log(time_extent);
     var time_scale = d3.time.scale()
         .domain(time_extent)
         .range([padding, w-padding]);

     var y_extent = d3.extent(ds['stats'], function (d) { return d.Response_Time_ms; });
     console.log(y_extent);
     var yScale = d3.scale.linear()
         .domain(y_extent)
         .range([h,padding]);


     var xAxisGen = d3.svg.axis().scale(time_scale).orient("bottom");

     var yAxisGen = d3.svg.axis().scale(yScale).orient("left");


    var i = 0;
     var lineFun = d3.svg.line()
         .x(function(d) { return time_scale((parseDate(d.Poll_Time)))})
         .y(function(d) {return yScale(d.Response_Time_ms)})
         .interpolate("basis");

     var svg = d3.select("body").append("svg").attr({
         height:h, width: w
     });

     var yAxis = svg.append("g").call(yAxisGen)
         .attr("class","axis")
         .attr("transform", "translate(" + padding  + ",0)");

     var xAxis = svg.append("g").call(xAxisGen)
         .attr("class","axis")
         .attr("transform", "translate(0," + (h - padding)  + ")");


     var viz;
     viz = svg.append("path")
        .attr({
             d: lineFun(ds['stats']),
             "stroke":"purple",
             "stroke-width": 2,
             "fill":"none"
         });

     var labels = svg.selectAll("text")
         .data(ds['stats'])
         .enter()
         .append("text")
         .text(function(d) { return Math.floor(d.Response_Time_ms)})
         .attr({
             x: function(d) {return parseDate(d.Poll_Time);},
             y: function(d) {return h-d.Response_Time_ms},
             "font-size":"12px",
             "font-family":"sans-serif",
             "text-anchor":"start",
             "dy":".35em",
             "font-weight": function(d,i) {
                 if (i===0 || i==(ds['stats'].length-1)) {
                     return "bold"; }
                 else {
                     return "normal";}
                 }
             });


 }


 d3.json("/webviz/data/parsed4.json", function(error, data) {
     console.log("into .xx");
     /**
      * Created by thw on 21/04/15.
      */
     if (error) {
         console.log(error);
     }

     /*
     data.forEach(function(d) {
         d.Poll_Time = parseDate(d.Poll_Time);
         d.Response_Time_ms = Math.floor(d.Response_Time_ms)
         console.log("this ..");
         console.log(d.Poll_Time);
         console.log(d.Response_Time_ms);
     });
     */

     data.content.forEach(function(ds){
         console.log(ds);
         showHeader(ds);
         generateVis(ds)
     });

 });



