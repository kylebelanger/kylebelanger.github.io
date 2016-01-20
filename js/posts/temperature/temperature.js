
// Add to Date function
// --------------------------------------
Date.prototype.addDays = function (n) {
    var time = this.getTime();
    var changedDate = new Date(time + (n * 24 * 60 * 60 * 1000));
    this.setTime(changedDate.getTime());
    return this;
};

// Set SVG elements 
// --------------------------------------
 
// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 650 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%d-%b-%y").parse,
    formatDate = d3.time.format("%d-%b"),
    bisectDate = d3.bisector(function(d) { return d.date; }).left;


// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(4);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Define the line
var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.temp); });

// Adds the svg canvas
var svg = d3.select("#graph")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

// Tooltip
var lineSvg = svg.append("g"); 
var focus = svg.append("g") 
    .style("display", "none");




    // Get initial data
    // --------------------------------------

    // data variables
    var lineData = [],
        day = {};

    // location variables
    var location_ = 21201,
        current_date = new Date().toJSON().slice(0,10),
        previous_date = new Date().addDays(-30).toJSON().slice(0,10);
        address = "http://api.worldweatheronline.com/free/v2/past-weather.ashx?key=528953c5fb814683cde647b8c6e31&q=" + location_ + "&date=" + previous_date + "&enddate=" + current_date + "&format=json";

    // change the dates on page
    document.getElementById('previous-date').innerHTML = previous_date.slice(5, 10);
    document.getElementById('current-date').innerHTML = current_date.slice(5, 10);


    // Request and parse data
    d3.json(address, function(error, data) {

        var days = data.data.weather;

        // step through each day
        days.forEach(function(d) {

            day = {date: new Date(d.date), temp: d.maxtempF};   // add data to day
            lineData.push(day);                                 // push to array

        });

        // Scale the range of the data
        x.domain(d3.extent(lineData, function(d) { return d.date; }));
        y.domain([0, d3.max(lineData, function(d) { return d.temp * 1.2; })]);

        // Add the valueline path.
        lineSvg.append("path")
            .attr("class", "line")
            .attr("d", valueline(lineData));

        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

       // append the y tooltip
        focus.append("line")
            .attr("class", "y-tip")
            .attr("y1", 0)
            .attr("y2", height);

        // append the x tooltip
        focus.append("line")
            .attr("class", "x-tip")
            .attr("x1", width)
            .attr("x2", width);

        // append the circle at the intersection
        focus.append("circle")
            .attr("class", "y")
            .style("fill", "none")
            .style("stroke", "blue")
            .attr("r", 4);

        // place the value at the intersection
        focus.append("text")
            .attr("class", "y1")
            .style("stroke", "white")
            .style("stroke-width", "3.5px")
            .style("opacity", 0.8)
            .attr("dx", 8)
            .attr("dy", "-.3em");
        focus.append("text")
            .attr("class", "y2")
            .attr("dx", 8)
            .attr("dy", "-.3em");

        // place the date at the intersection
        focus.append("text")
            .attr("class", "y3")
            .style("stroke", "white")
            .style("stroke-width", "3.5px")
            .style("opacity", 0.8)
            .attr("dx", 8)
            .attr("dy", "1em");
        focus.append("text")
            .attr("class", "y4")
            .attr("dx", 8)
            .attr("dy", "1em");
        
        // append the rectangle to capture mouse
        svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .style("fill", "none")
            .style("pointer-events", "all")
            .on("mouseover", function() { focus.style("display", null); })
            .on("mouseout", function() { focus.style("display", "none"); })
            .on("mousemove", mousemove);

        function mousemove() {
            var x0 = x.invert(d3.mouse(this)[0]),
                i = bisectDate(lineData, x0, 1),
                d0 = lineData[i - 1],
                d1 = lineData[i],
                d = x0 - d0.date > d1.date - x0 ? d1 : d0;

            focus.select("circle.y")
                .attr("transform",
                      "translate(" + x(d.date) + "," +
                                     y(d.temp) + ")");

            focus.select("text.y1")
                .attr("transform",
                      "translate(" + x(d.date) + "," +
                                     y(d.temp) + ")")
                .text(d.temp);

            focus.select("text.y2")
                .attr("transform",
                      "translate(" + x(d.date) + "," +
                                     y(d.temp) + ")")
                .text(d.temp);

            focus.select("text.y3")
                .attr("transform",
                      "translate(" + x(d.date) + "," +
                                     y(d.temp) + ")")
                .text(formatDate(d.date));

            focus.select("text.y4")
                .attr("transform",
                      "translate(" + x(d.date) + "," +
                                     y(d.temp) + ")")
                .text(formatDate(d.date));

            focus.select(".y-tip")
                .attr("transform",
                      "translate(" + x(d.date) + "," +
                                     y(d.temp) + ")")
                           .attr("y2", height - y(d.temp));

            focus.select(".x-tip")
                .attr("transform",
                      "translate(" + width * -1 + "," +
                                     y(d.temp) + ")")
                           .attr("x2", width + width);
        }


    });
    // End getData
    // ----------------------------------

    // delayUpdate function
    // Add event listener to pragmatically update the graph when input value is changed
    // ----------------------------------
    // Get location input from page
    var input_location = document.getElementById("location"),
        timer = null;

    input_location.addEventListener('keyup', delayUpdate, false);

    function delayUpdate() {

        clearTimeout(timer);
        
        timer = setTimeout(function() {
                    // if more than 3 charecters entered
                    if (input_location.value.length > 2) {
                        updateData();
                    }
                }, 2000); // 2 seconds
    }

    // updateData function
    // ----------------------------------
    function updateData() {

        var url_address;
            
        lineData = [];  // reset lineData 
        day = {};       // reset day

        var weather_api = "http://api.worldweatheronline.com/free/v2/past-weather.ashx?key=528953c5fb814683cde647b8c6e31&q=" + input_location.value + "&date=" + previous_date + "&enddate=" + current_date + "&format=json";
        var map_api = "http://maps.googleapis.com/maps/api/geocode/json?address=" + input_location.value + "&sensor=true";

        // Get the data again
        d3.json(weather_api, function(error, data) {

            // get the city name from input
            d3.json(map_api, function(error, map) {
                // update the city name with updated input
                document.getElementById('location_display').innerHTML = map.results[0].formatted_address;
            });

            var days = data.data.weather;

            // step through each day
            days.forEach(function(d) {

                // add data to day
                day = {date: new Date(d.date), temp: d.maxtempF};
                // push day to results array
                lineData.push(day);

            });

            // Scale the range of the data again 
            x.domain(d3.extent(lineData, function(d) { return d.date; }));
            y.domain([0, d3.max(lineData, function(d) { return d.temp; })]);

        // Select the section we want to apply our changes to
        var svg = d3.select("body").transition();

        // Make the changes
            svg.select(".line")   // change the line
                .duration(750)
                .attr("d", valueline(lineData));

            svg.select(".x.axis") // change the x axis
                .duration(750)
                .call(xAxis);
            svg.select(".y.axis") // change the y axis
                .duration(750)
                .call(yAxis);


        });
    }