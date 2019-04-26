google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

  var user = JSON.parse(sessionStorage.getItem('json'));

  var dataarray = []

  dataarray.push(['Semester', 'GPA', 'Major GPA']);
  
  for(var s = 0; s < user.semesterData.semesters.length; s++) 
  {
      dataarray.push([user.semesterData.semesters[s].name, 
        parseFloat(user.semesterData.semesters[s].GPA), 
        parseFloat(user.semesterData.semesters[s].MajorGPA)]);
  }
  console.log(dataarray);

  var data = google.visualization.arrayToDataTable(dataarray);

  var options = {
    title: 'Your GPA Trend Over Time',
    curveType: 'function',
    legend: { position: 'bottom' },
    interpolateNulls: true,
    vAxis: {
        maxValue: 4.00,
        viewWindow: {
            max: 4.25
        }
    }

  };

  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

  chart.draw(data, options);
  
}

$(document).ready(function () {
  // If the user isn't logged in, reidrect
  if(sessionStorage.getItem("infoLoaded"))
  {
    //NOP
  }
  else
  {
    window.location.href = "signin.html";
  }
    

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


    $('input[name=user]').on('click',function() {
      //logged in
      if(sessionStorage.getItem("infoLoaded")) { 
          window.location.href = "home.html";
      } else { //not logged in
          window.location.href = "signin.html";
      }
    });

});
