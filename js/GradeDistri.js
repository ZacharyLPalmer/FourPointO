google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Grade', 'Frequency'],
    [
        'A',2
    ],
    [
        'A-',4
    ],
    [
        'B+',6
    ],
    [
        'B',10
    ],
    [
        'B-',9
    ],
    [
        'C+',5
    ],
    [
        'C',4
    ],
    [
        'C-',2
    ],
    [
        'D+',0
    ],
    [
        'D',1
    ],
    [
        'F',2
    ]
]);

  var options = {
    title: 'Grade Distribution',
    legend: { position: 'none' },
  };

  var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

$(document).ready(function () {
    var dataObject = null;
    console.log(dataObject);
    //user = firebase.auth().currentUser
    //retrieve json snapshot
    console.log("test1");
    //firebase.database().ref('/users/').on('value', function(snapshot) {
    //    snapshot.forEach(function(childSnapshot) {
    //      var childData = childSnapshot.val();
    //      console.log(childData);
    //    });
    //});
});


