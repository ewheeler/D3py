function axes(g, ranges, scales){
    
    var tickLength = 8;
    
    /* horizontal axis */
    g.append("svg:line")
        .attr("x1", scales.x(ranges.xMin))
        .attr("y1", scales.y(ranges.yMin))
        .attr("x2", scales.x(ranges.xMax))
        .attr("y2", scales.y(ranges.yMin))
    
    /* vertical axis */
    g.append("svg:line")
        .attr("x1", scales.x(ranges.xMin))
        .attr("y1", scales.y(ranges.yMin))
        .attr("x2", scales.x(ranges.xMin))
        .attr("y2", scales.y(ranges.yMax))
    
    /* x ticks */
    g.selectAll(".xTicks")
        .data(scales.x.ticks(5))
        .enter().append("svg:line")
            .attr("class", "xTicks")
            .attr("x1", function(d) { return scales.x(d); })
            .attr("y1", scales.y(ranges.yMin))
            .attr("x2", function(d) { return scales.x(d); })
            .attr("y2", scales.y(ranges.yMin)+tickLength)
    
    /* y ticks */
    g.selectAll(".yTicks")
        .data(scales.y.ticks(5))
        .enter().append("svg:line")
            .attr("class", "yTicks")
            .attr("x1", scales.x(ranges.xMin)-tickLength)
            .attr("x2", scales.x(ranges.xMin))
            .attr("y1", function(d) { return scales.y(d); })
            .attr("y2", function(d) { return scales.y(d); })

    /* x tick labels */
    g.selectAll(".xTickLabel")
        .data(scales.x.ticks(5))
        .enter().append("svg:text")
            .attr("class", "xLabel")
            .text(function(d, i) { return d; })
            .attr("x", function(d) { return scales.x(d); })
            .attr("y", scales.y(ranges.yMin)+20)
            .attr("text-anchor", "middle")
    
    /* y tick labels */
    g.selectAll(".yTickLabel")
        .data(scales.y.ticks(5))
        .enter().append("svg:text")
            .attr("class", "yLabel")
            .text(function(d, i) { return d3.round(d,2); })
            .attr("x", scales.x(ranges.xMin)-tickLength-20)
            .attr("y", function(d) { return scales.y(d) })
            .attr("text-anchor", "right")
            .attr("dy", 4)
}

function get_scales(w, h, margin, ranges){
    
    /* builds the D3 scales 
    
    Note how the y scale is upside-down! This allows us to never have to
    remeber to multiply everything by a terrible -1 all the time: the origin
    of the SVG canvas is the top-left.
    */
    
    return {
        y: d3.scale.linear()
            .domain([ranges.yMax, ranges.yMin])
            .range([0 + margin, h-margin]), 
        x: d3.scale.linear()
            .domain([ranges.xMin, ranges.xMax])
            .range([0 + margin, w-margin])
    }
    
}

function get_range(data){
    /* 
    returns the max and min of the data in both x and y domains.
    
    Note d3's funky max() function, which allows you to pass in an 
    accessor function just like map()
    */
    
    return {
        xMax : d3.max(data, function(d){return d.x;}),
        xMin : d3.min(data, function(d){return d.x;}),
        yMax : d3.max(data, function(d){return d.y;}),
        yMin : d3.min(data, function(d){return d.y;})
    }
}

function axis_labels(g, labels, margin, scales, ranges){
    
    /* axis labels */
    g.append("svg:text")
        .text(labels.x)
        .attr("x", scales.x(ranges.xMin + ((ranges.xMax-ranges.xMin)/2)))
        .attr("y", scales.y(ranges.yMin)+40)
    
    g.append("svg:text")
        .text(labels.y)
        .attr("y", scales.y(ranges.yMin + ((ranges.yMax-ranges.yMin)/2)))
    
}