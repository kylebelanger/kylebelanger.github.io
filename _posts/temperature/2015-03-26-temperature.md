---
layout: post

description: "A D3.js learning experiment - a simple line graph with tooltip, displaying (30 day range) historical temperature data for any input location."

title:  "<i><a href='/posts/temperature'>Temperature data visualization</a></i>"
article: "Temperature data visualization w/ D3.js"
date:   2015-04-03

link:       null
readmore:   null
---

A beautiful D3.js learning experiment - a simple interactive line graph displaying historical temperature data (30 day range) for any input location. *( Sigh... the free API only allows queries of 30 day intervals. )*

This first project uses some of D3's graphing functions, <code>d3.svg.axis()</code>, and <code>d3.svg.line()</code> to draw an SVG-based line graph with interactive tooltip. The historical weather data API response is parsed, formatted, and displayed as a set of <i>x</i> (date) and <i>y</i> (fahrenheit temperature) axis values.

<hr class="dash">

<table class="width-800px">
  <tr>
    <td>Location:</td>
    <td><input type="text" id="location" name="location" onkeyup="delayUpdate()" onchange="updateData()" placeholder="Baltimore, MD" required autofocus></td>     
  </tr>
  <tr>
    <td>Date:</td>      
    <td><span id="previous-date">March 15</span> - <span id="current-date">April 15</span></td>
  </tr>
</table>

<p id="location_display">Baltimore, MD, USA</p>

<div id="graph"></div>

<hr class="dash margin-bottom-30px">

The somewhat easy part was parsing the data response, and creating an array of objects. Once we have an array of data objects, it's just a matter of mapping the data to the graph.

<pre class="code-block">
<code>// data variables
var lineData = [],
    day = {};

// Request and parse data
d3.json(address, function(error, data) {

    var days = data.data.weather;

    // step through each day
    days.forEach(function(d) {
        day = {date: new Date(d.date), temp: d.maxtempF};   // add data to day
        lineData.push(day);                                 // push to array
    });
});
</code>
</pre>

The graph is updated asynchronously with a two-second timeout as the input value changes. This is accomplished by adding an <code>onKeyUp()</code> event listener to the form input, and setting a timeout delay to avoid requesting data with each keystroke.

<pre class="code-block">
<code>// Get location input from page
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
            }, 500); // .5 second delay
}</code>
</pre>

<hr class="dash">

<table class="width-400px">
  <tr>
    <td>The full code is available on:</td>
    <td><a href="https://github.com/kylesb/static/blob/master/JS/temperature-graph/index.html">GitHub</a></td>     
  </tr>
  <tr>
    <td>Date source:</td>      
    <td><a href="http://www.worldweatheronline.com/api/docs/historical-weather-api.aspx">Historic Weather API</a></td>
  </tr>
</table>

<!-- scripts for this page -->
<script type="text/javascript" src="/js/posts/temperature/temperature.js"></script>
<!-- / scripts -->

<!-- initialize -->
<script>
    // append CSS for this page to the <head>
    var linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = "/css/posts/temperature/temperature.css";
    // append CSS file
    document.head.appendChild(linkElement);
</script>
<!-- / initialize -->
