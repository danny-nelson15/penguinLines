var getFinal = function(student)
    {return (student.final[0].grade)}

var getmeanHW = function(student)
{
  var Grade = student.homework.map(function(homework)
                {
    return (homework.grade)
                })
  return d3.mean(Grade)
}

var getmeanQuiz = function(student)
{
    var Grade = student.quizes.map(function(quizes)
                    {return (quizes.grade)
                    })
    return d3.mean(Grade)
}

var getmeanTest = function(student)
{
    var Grade = student.test.map(function(test)
                                {return (test.grade)})
    return d3.mean(Grade)
}
var classDataPromise = d3.json("classData.json");
    classDataPromise.then (function(student){
            console.log("worked", student); 
        var getSVG =
        d3.select("#quizgrade1");
        intGraph(getSVG, student);
                                      
                                      },
                      function(err){
                    console.log("failed:", err);
    })

var intGraph = function(target, students)
{
    var screen = {width:500, height:400}
    
    var margins = {top:15,bottom:50,left:70,right: 40}
var graph =
    {
        width:screen.width-margins.left-margins.right,
        height:screen.height-margins.top-margins.bottom,
    }
    d3.select(target)
        target.attr("width", screen.width)
        target.attr("height", screen.height)
    var g = 
        target.append("g")
        .classed("graph", true)
        .attr("transform", "translate("+margins.left+","+margins.top+")")
    var xScale = d3.scaleLinear()
        .domain([0,students[0].quizes.length-1])
        .range([0,graph.width])
    var highD = 10;
    var yScale = d3.scaleLinear()
        .domain([0,highD])
        .range([graph.height,0])
    
    createLabels(screen,margins,graph,target);
    createAxes(screen,margins,graph,target,xScale,yScale)
    drawLines(students,graph,target,xScale,yScale,gradeScale)
}


    var gradeScale = d3.scaleOrdinal(d3.schemeCategory10)
    var createLabels = function(screen, margins, graph, target)
   
    
    
{
   var labels = 
        target.append("g")
        .classed("labels", true)
   
   labels.append("text")
        .text("Quiz Grades per Day")
        .classed("title", true)
        .attr("text-anchor", "middle")
        .attr("x", margins.left+(graph.width/2))
        .attr("y",margins.top-5)
    labels.append("text")
        .text("Day")
        .classed("label", true)
        .attr("text-anchor", "middle")
        .attr("x", margins.left+(graph.width/2))
        .attr("y",screen.height-5)
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
   
   var axes = 
        target.append("g")
    axes.append("g")
        .attr("transform","translate("+margins.left+","+(margins.top+graph.height)+")")
        .call(xAxis)
    axes.append("g")
        .attr("transform","translate("+margins.left+","+(margins.top)+")")
        .call(yAxis)
        
 }
 
 var drawLines = function(students,graph,target,xScale,yScale,gradeScale)
 {     
     var lines = 
        target.select(".graph")
        .selectAll("g")
        .data(students)
        .enter()
        .append("g")
        .classed("line", true)
        .append("line")
        .attr("y1",function(student){return yScale(student.quizes[0].grade)})
        .attr("y2",function(student){return yScale(student.quizes[37].grade)})
        .attr("x1",function(student){return xScale(student.quizes[0].day)})
        .attr("x2",function(student){return xScale(student.quizes[37].day)})
        .attr("fill","none")
        .attr("stroke",function(student)
                {
            return gradeScale(student.quizes.grade)
        })
        .attr("stroke-width", 2)
     .on("mouseover", function(student)
        {
         d3.selectAll(".line line")
            .classed("fade",true);
         
         d3.select(this)
            .classed("fade", false).classed("red", true)
            .raise();
        var xPosition = d3.event.pageX;
        var yPosition = d3.event.pageY
            d3.select("#tooltip1")
                .style("left", xPosition+"px")
                .style("top", yPosition+"px")
                .select("img")
                .attr("src", "imgs/"+student.picture)
            
         d3.select("#tooltip1").classed("hidden1", false)
     })
     .on("mouseout", function(student)
        {
         d3.selectAll(".line line")
            .classed("fade", false)
            .classed("red",false)
        d3.select("#tooltip1").classed("hidden1", true)
     })

     
    
     
 }
  
