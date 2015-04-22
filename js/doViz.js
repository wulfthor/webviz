 var w = 300;
 var h = 100;
 var padding = 20;

 var dataset;

 var parseDate = d3.time.format("%m/%d/%Y %H:%M:%S").parse;

 function generateVis () {
     console.log("into viz");
     dataset.forEach(function(d) {
         console.log(d.Response_Time_ms);
     });


     var time_extent = d3.extent(dataset, function(d) { return d.Poll_Time; });
     console.log(time_extent);
     var time_scale = d3.time.scale()
         .domain(time_extent)
         .range([padding, w-padding]);

     var yScale = d3.scale.linear()
         .domain([0, d3.max(dataset, function (d) { return d.Response_Time_ms; })])
         .range([0,w]);


     var xAxisGen = d3.svg.axis()
         .scale(time_scale)
         .orient("bottom");

     var yAxisGen = d3.svg.axis()
         .scale(yScale)
         .orient("left")
         .ticks(5);


    var i = 0;
     var lineFun = d3.svg.line()
         .x(function(d) { return time_scale(d.Poll_Time);})
         .y(function(d) {return yScale(d.Response_Time_ms);})
         .interpolate("basis");

     var svg = d3.select("body").append("svg").attr({
         height:500, width: 900
     });

     var yAxis = svg.append("g").call(yAxisGen)
         .attr("class","axis")
         .attr("transform", "translate(" + padding  + ",0)");

     var xAxis = svg.append("g").call(xAxisGen)
         .attr("class","axis")
         .attr("transform", "translate(0" + ( h - padding)  + ")");


     var viz;
     viz = svg.append("path")
        .attr({
             d: lineFun(dataset),
             "stroke":"purple",
             "stroke-width": 2,
             "fill":"none"
         });

     var labels = svg.selectAll("text")
         .data(dataset)
         .enter()
         .append("text")
         .text(function(d) { return d.Response_Time_ms})
         .attr({
             x: function(d) {return d.Poll_Time*3;},
             y: function(d) {return h-d.Response_Time_ms},
             "font-size":"12px",
             "font-family":"sans-serif",
             "text-anchor":"start",
             "dy":".35em",
             "font-weight": function(d,i) {
                 if (i===0 || i==(dataset.length-1)) {
                     return "bold"; }
                 else {
                     return "normal";}
                 }
             });


 }


 d3.csv("/webviz/data/dataLun11.csv", function(error, data) {
     console.log("into .xx");
     /**
      * Created by thw on 21/04/15.
      */
     if (error) {
         console.log(error);
     }

     dataset = data;
     data.forEach(function(d) {
         d.Poll_Time = parseDate(d.Poll_Time);
         d.Response_Time_ms = Math.floor(d.Response_Time_ms)
         console.log("this ..");
         console.log(d.Poll_Time);
         console.log(d.Response_Time_ms);
     });

     generateVis();

 });



