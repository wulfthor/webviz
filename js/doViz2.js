 var w = 300;
 var h = 200;

 var dataset;

 var parseDate = d3.time.format("%m/%d/%Y %H:%M:%S").parse;

 function generateVis () {
     console.log("into viz");
     dataset.forEach(function(d) {
         console.log(d.Response_Time_ms);
     });

     function resCritical(d) {
         if (d > 30) { return "#33cc66";} else
         if (d <=30) { return "#666666";}
     }


     dataset = [
         {"Poll_Time": 10, "Response_Time_ms": 45},
         {"Poll_Time": 20, "Response_Time_ms": 25},
         {"Poll_Time": 30, "Response_Time_ms": 35},
         {"Poll_Time": 40, "Response_Time_ms": 45},
         {"Poll_Time": 50, "Response_Time_ms": 65},
         {"Poll_Time": 60, "Response_Time_ms": 55},
         {"Poll_Time": 70, "Response_Time_ms": 95},
         {"Poll_Time": 80, "Response_Time_ms": 105}
     ];


     var svg = d3.select("body").append("svg").attr({
         height:h, width: w
     });


     var dots = svg.selectAll("circle")
         .data(dataset)
         .enter()
         .append("circle")
         .text(function(d) { return d.Response_Time_ms})
         .attr({
             cx: function(d) {return d.Poll_Time*3;},
             cy: function(d) {return h-d.Response_Time_ms},
             r: 5,

             "font-size":"12px",
             "font-family":"sans-serif",
             "text-anchor":"start",
             "fill": function(d) {return resCritical(d.Response_Time_ms);}
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
         console.log("this ..");
         console.log(d.Poll_Time);
     });

     generateVis();

 });



