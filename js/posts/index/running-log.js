// global data variable
var data = null;

// Convert running log JSON data into readable format for heatmap calendar
function convertRunningLog() {

  // set get URL
  var json_url = "https://raw.githubusercontent.com/kylesb/static/master/JSON/running_log.json";
  // declare object variable
  var ob = {};

  // Get running log file from repository
  d3.json(json_url, function(error, result) {

    // for each data entry
    for (var i = 0; i < result.data.length; i++) {

      // get date and miles
      var apoche = date_to_epoch(result['data'][i]['date']).toString();
      var miles = parseFloat(result['data'][i]['miles']);

      // set date and miles
      ob[apoche.toString()] = miles;
    }

    var json_string = JSON.stringify(ob);
    data = JSON.parse(json_string);

    var cal = new CalHeatMap();
    cal.init({
      itemSelector: "#running-heatmap",
      domain: "month",
      subDomain: "x_day",
      data: data,
      cellSize: 20,
      cellPadding: 5,
      domainGutter: 20,
      range: 1,
      domainDynamicDimension: false,
      previousSelector: "#previous",
      nextSelector: "#next",
      subDomainTextFormat: "%d",
      legend: [0.5, 2, 4, 5],
      tooltip: true,
      label: {
          position: "top",
          align: "left",
          offset: {x: -85, y: 0}
      },
      weekStartOnMonday: false,
      displayLegend: false,

      legendColors: {
          min: "#ecf5e2",
          max: "#A2AE9E"
      },
      itemName: "mile"
    });


  });
}

// Convert strings to date objects
function date_to_epoch(key) {
  var epoch_seconds = new Date(key).getTime();
  return Math.floor(epoch_seconds / 1000);
}

convertRunningLog();
