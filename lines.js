var classDataPromise = d3.json("classData.json");
    classDataPromise.then (function(student){
            console.log("worked", student); 
        
        intGraph(student);
                                      
                                      },
                      function(err){
                    console.log("failed:", err);
    })

var intGraph = function(target, students)
{
    var screen = {width:500, height:400}
    
    var margins = {top:15,bottom:40,left:70,right: 40}
var graph =
    {
        width:screen.widht-margins.left-margins.right,
        height:screen.height-margins.top-margins.bottom,
    }
    d3.select(target)
        .attr("width",screen.width)
        .attr("height",screen.height)
    var g = d3.select(target)
        .append("g")
        .classed("graph", true)
        .attr("transform", "translate("+margins.left+","+margins.top+")")
    var xScale = d3.scaleLinear()
        .domain([0,students.quizes.day.length-1])
        .range([0,graph.width])
    var highD = d3.max(students,function(student)
                      {return d3.max(student.quizes.day)
                      })
    var yScale = d3.scaleLinear()
        .domain([0,highD])
        .range([graph.height,0])
    
    var gradeScale = d3.scaleOrdinal(d3.schemeCategory10)
    var createLabels = function(screen, margins, graph, target)
{
   var labels = d3.select(target)
        .append("g")
        .classed("labels", true)
   
   labels.append("text")
        .text("Quiz Grades per Day")
        .classed("title", true)
        .attr("text-anchor", "middle")
        .attr("x", margins.left+(graph.width/2))
        .attr("y",margins.top)
    labels.append("text")
        .text("Day")
        .classed("label", true)
        .attr("text-anchor", "middle")
        .attr("x", margins.left+(graph.width/2))
        .attr("y",screen.height)
    labels.append("g")
        .attr("transform", "translate(20,"+(margins.top+(graph.height/2))+")")
        .append("text")
        .text("Quiz Grade")
        .classed("label", true)
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(90)")
    
}

 var createAxes = function(screen,margins,graph,target,xScale,yScale)
 {
   var xAxis = d3.axisBottom(xScale)
   var yAxis = d3.axisLeft(yScale)
   
   var axes = d3.select(target)
        .append("g")
    axes.append("g")
        .attr("transform","translate("+margins.left+","+(margins.top+graph.height)+")")
        .call(xAxis)
    axes.append("g")
        .attr("transform","translate("+margins.left+","+(margins.top)+")")
        .call(yAxis)
        
 }
 
 var drawLines = function(students,graph,target,xScale,yScale,gradeScale)
 {
     var lineGenerator = d3.line()
        .x(function(quizes,i){return xScale(i)})
        .y(function(quizes){return yScale(quizes)})
     
     var lines = d3.select(target)
        .select(".graph")
        .selectALl("g")
        .data(students)
        .enter()
        .append("g")
        .classed("line", true)
        .attr("fill","none")
        .attr("stroke",function(student)
                {
            return gradeScale(student.quizes.grade)
        })
     
     lines.append("path")
        .datum(function(student)
                {return student.quizes.day})
        .attr("d",lineGenerator)
 }
  
}

   
  





































































/*var baseline = function(students)
    {
        xScale = d3.scaleTime()
                    .domain([
                        d3.min(students, function(d){return QDay(student)}),
                        d3.max(students, function(d){return QDay(student)})
                            ])
                        .range([0,w])
        
        yScale = d3.scaleLinear()
                    .domain([0,d3.max(students, function(d){return getQGrade(student)})])
                    .range([h, 0])
        
        
    var line = d3.line()
                .x(function(d) {return xScale(QDay(student));})
                .y(function(d) {return yScale(getQGrade(student));})
    var svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
    svg.append("path")
        .datum(student)
        .attr("class", "line")
        .attr("d", line)
        
       
        var drawLines = function(students, graph, target, xScale, yScale, gradeScale)
        {
            var lineGenerator = d3.line()
                    .x (function(getQuiz, i){return xScale(i);})
                    .y (function(getQuiz){return yScale(getQuiz);})
            var lines = d3.select(target)
                .select(".graph")
                .selectAll("g")
                .data(students)
                .enter()
                .append("g")
                .classed("line", true)
                .attr("fill", "none")
                .attr("stroke", function(student)
                   {return Qnum(student)
                        })
            lines.append("path")
                    .datum(function(student)
                     {return Qnum(student)})
                    .attr("d", lineGenerator);
        }
       
    
    }
    */