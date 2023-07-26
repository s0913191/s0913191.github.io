function buildLine() {
    // ds is going to be an array d[N][2]

    // Default parameters
    var width = 800;
    var height = 500;
    var columnForX = "year";
    var columnForY = "travelers";
    var lineColor = "steelblue";
    var dotsColor = "steelblue";
    var showDots = true;
    var xAxisLabel = "x-axis";
    var yAxisLabel = "y-axis";
    var xAxisTicks = 1;
    var yAxisTicks = 2;
    var xShowAxisLabel = true;
    var yShowAxisLabel = true;
    var chartTitle = "Chart Title";
    var showChartTitle = true;

    function chart(selection) {
        var data = selection.datum();
        var div = selection;
        var svg = div.append('svg');
        svg.attr('width', width).attr('height', height);

        const margin = { top: 20, right: 20, bottom: 30, left: 100 };
        const graphWidth = width - margin.left - margin.right;
        const graphHeight = height - margin.top - margin.bottom;


        // Tooltip configurations
        const tooltip = div.append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style("color", "white")
            .style("padding", "8px")
            .style("background-color", "#626D71")
            .style("border-radius", "6px")
            .style("text-align", "center")
            .style("font-family", "monospace")
            //.style("width", "400px")
            .style("font-size", "12px")
            .style("stroke", "transparent")
            .text("");

        const mouseover = (event, d) => {
            const [x, y] = d3.pointer(event, document.body);
            tooltip.html(d[columnForX] + "<br/>" + numberWithCommas(d[columnForY]));
            tooltip.style("top", (y + 0) + "px").style("left", (x + 50) + "px");
            return tooltip.style("visibility", "visible");
        };

        const mouseout = (event, d) => {
            return tooltip.style("visibility", "hidden");
        };

        // Scaler functions
        const xScale = d3.scaleTime()
            .domain([d3.min(data, function (d) { return +d[columnForX]; }), d3.max(data, function (d) { return +d[columnForX]; })])
            .range([0, graphWidth]);
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) { return +d[columnForY]; })])
            .range([graphHeight, 0]);

        const xAxisGen = d3.axisBottom(xScale)
            .tickFormat(d3.format("d"))
            .ticks(xAxisTicks);
        const yAxisGen = d3.axisLeft(yScale)
            .ticks(yAxisTicks);
        const lineFun = d3.line()
            .x(d => xScale(d[columnForX]))
            .y(d => yScale(d[columnForY]));

        const graph = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        graph.append("g")
            .call(xAxisGen)
            .attr("class", "x-axis")
            .attr("transform", `translate(0, ${graphHeight})`);

        graph.append("g")
            .call(yAxisGen)
            .attr("class", "y-axis");

        graph.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", lineColor)
            .attr("stroke-width", 1.5)
            .attr("d", lineFun);



        if (showDots) {
            graph.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", d => xScale(d[columnForX]))
                .attr("cy", d => yScale(d[columnForY]))
                .attr("r", 4)
                .attr("fill", dotsColor)
                .on("mouseover", mouseover)
                .on("mouseout", mouseout);
        }

        if (xShowAxisLabel) {
            graph.append("g")
                .attr("class", "x-axis-label")
                .append("text")
                .attr("text-anchor", "end")
                .attr("x", graphWidth)
                .attr("y", graphHeight + 30)
                .text(xAxisLabel);
        }

        if (yShowAxisLabel) {
            graph.append("g")
                .attr("class", "y-axis-label")
                .append("text")
                .attr("text-anchor", "end")
                .attr("transform", "rotate(-90)")
                .attr("x", -margin.top)
                .attr("y", -margin.left + 20)
                .text(yAxisLabel);
        }

        if (showChartTitle) {
            graph.append("g")
                .attr("class", "chart-title")
                .append("text")
                .attr("text-anchor", "middle")
                .attr("x", graphWidth / 2)
                .attr("y", 0)
                .text(chartTitle);
        }

    }

    // Accesor
    chart.width = function (value) {
        if (!arguments.length) { return width; }
        width = value;
        return chart;
    };

    chart.height = function (value) {
        if (!arguments.length) { return height; }
        height = value;
        return chart;
    };

    chart.showDots = function (value) {
        if (!arguments.length) { return showDots; }
        showDots = value;
        return chart;
    };

    chart.xAxisLabel = function (value) {
        if (!arguments.length) { return xAxisLabel; }
        xAxisLabel = value;
        return chart;
    };

    chart.yAxisLabel = function (value) {
        if (!arguments.length) { return yAxisLabel; }
        yAxisLabel = value;
        return chart;
    };

    chart.xShowAxisLabel = function (value) {
        if (!arguments.length) { return xShowAxisLabel; }
        xShowAxisLabel = value;
        return chart;
    };

    chart.yShowAxisLabel = function (value) {
        if (!arguments.length) { return yShowAxisLabel; }
        yShowAxisLabel = value;
        return chart;
    };

    chart.showChartTitle = function (value) {
        if (!arguments.length) { return showChartTitle; }
        showChartTitle = value;
        return chart;
    };

    chart.chartTitle = function (value) {
        if (!arguments.length) { return chartTitle; }
        chartTitle = value;
        return chart;
    };


    chart.xAxisTicks = function (value) {
        if (!arguments.length) { return xAxisTicks; }
        xAxisTicks = value;
        return chart;
    };


    chart.yAxisTicks = function (value) {
        if (!arguments.length) { return yAxisTicks; }
        yAxisTicks = value;
        return chart;
    };

    return chart;
}
