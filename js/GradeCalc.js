
// Global(s)
var catCount = 0; // Used to differentiate categories 
var cnum = -1;
/**
 * Adds a new course row to the categoryList table
 */
function addCategory() {

    var emptyCategroy = 
    "<tr class=\"category\" name=cat-"+ catCount +"\">" +
        "<td><input type=\"text\" name=\"catName-" + catCount + "\"></td>" +
        "<td><input type=\"text\" class=\"weight\" name=\"catWeight-" + catCount + "\"></td>" +
        "<td><input type=\"text\" class=\"avg\" name=\"catAvg-" + catCount + "\"></td>" +
        "<td><button class=\"deletebtn deleteCat\" type=\"submit\" class=\"deleteCat\" category=\"" + catCount + "\">Delete</button></td>" +
    "</tr>";

    $(".categoryList").append( emptyCategroy );

    console.log("Added new  category-" + catCount);

    catCount++;
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

/**
 * Removes the row containing the clicked 'delete' button
 * Updates the course grade to reflect this change
 */
function deleteCategory() {

    var catNum = $(this).attr("category"); // Used for debugging

    $(this).parent().parent().remove(); //parent() is the <td>, parent().parent() is <tr>

    updateGrade();

    console.log("Deleted category-" + catNum);

    var courses = document.getElementById("catList").rows;
    console.log(courses.length);
    if(courses.length <= 1) {
        addCategory();
        console.log("Last catagory deleted so it is replaced");
    }
}

 /**
  * Calculates the course grade and updates relevant HTML
  * Needs input validation
  */
 function updateGrade() {

    var currWeight = 0.0;
    var totalWeight = 0.0;
    var currAvg = 0.0;
    var grade = 0.0;
    var courses = document.getElementById("catList").rows;

    for( var i = 1; i < courses.length; i++ ) // Starts at 1 since row 0 is the header row
    {
        // TODO: Input Validation

        currWeight = parseFloat( courses[i].cells[1].children[0].value );
        currAvg = parseFloat( courses[i].cells[2].children[0].value );

        if(!isNaN(currWeight) && !isNaN(currAvg))
        {
            totalWeight += currWeight;

            // Assuming weight is a percentage
            currWeight = ( currWeight / 100 );

            grade += ( currWeight * currAvg );
        }
    }
    if(totalWeight == 100) {
        $('div[name=currentGrade]').html((grade/totalWeight*100).toFixed(2)+'%');
    } else {
        $('div[name=currentGrade]').html(grade+'/'+totalWeight);
    }

 }

/*
  json object
  {
      grade
      name
      creditNumber
      major
      catagories[
            name    
            weight
            average
      ]
  }

*/


 /**
  * TODO: Save the data by sending it to some server
  */
 function saveCourse() {
     console.log("test");
    var grade = $('div[name=currentGrade]').text();
    var name = $('input[name=courseName]').val();
    var creditNumber = $('input[name=creditNumber]').val();
    var majorCourse = false;
    
    if(creditNumber == "") {
        //print "no creditNumber" error
        return;
    }
    if(name == "") {
        //print "no name" error
        return;
    }
    if($('input[name=major]').is(':checked')) {
        majorCourse = true;
    }

    var outJ = {"Name":"" ,"Grade":"" ,"MajorCourse":"" ,"CreditNumber":"" ,"cats":[]}; 
    outJ.Name = name;
    outJ.Grade = grade;
    outJ.MajorCourse = majorCourse;
    outJ.CreditNumber = creditNumber;

    var courses = document.getElementById("catList").rows;

    for( var i = 1; i < courses.length; i++ ) {
        var catName = courses[i].cells[0].children[0].value
        if(catName == "") {
           catName = "cat"+i;
        }
        weight = parseFloat( courses[i].cells[1].children[0].value );
        average = parseFloat( courses[i].cells[2].children[0].value );
        if(weight && average) {
            outJ.cats.push(
                {"Name": catName ,"Weight": weight ,"Average": average }
            )
        }
    }
    console.log(userData);
    if(userData == null) //user not signed in
    {
        console.log("new USer course json")
        sessionStorage.setItem('newUserCourseJson', JSON.stringify(outJ));
    } else if (cnum == null) { //new course
        userData.classData.currentCourses.push(outJ);
        sessionStorage.setItem('json', JSON.stringify(userData));
    } else { //edit existing course
        userData.classData.currentCourses[cnum] = outJ;
        sessionStorage.setItem('json', JSON.stringify(userData));
    }
    console.log(cnum);
 }

function loadJson(data) {
    console.log(data);
    $('input[name=courseName]').val(data.Name);
    $('input[name=creditNumber]').val(data.CreditNumber);
    if(data.MajorCourse == 'true') {
        $('input[name=major]').attr('checked',true);
    } else {
        $('input[name=major]').attr('checked',false);
    }
    $("#catList").find("tr:gt(0)").remove();
    catCount = 0;
    for(var i = 0; i < data.cats.length; i++) {
        addCategory(addCategory);
        $('input[name=catName-'+i+']').val(data.cats[i].Name);
        $('input[name=catWeight-'+i+']').val(data.cats[i].Weight);
        $('input[name=catAvg-'+i+']').val(data.cats[i].Average);
    }
    updateGrade();
}

/**
 * Sets up event listeners when document is fully loaded
 */
$(function() {
    $('button[name=addCat]').on("click", addCategory);
    $('button[name=saveCourse').on("click", saveCourse);
    $('.categoryList').on("click", '.deleteCat', deleteCategory);
    $('.categoryList').on("change", ['.weight', '.avg'], updateGrade);
});

$(document).ready(function () {
    cnum = getUrlVars()["course"];
    userData = JSON.parse(sessionStorage.getItem('json'));
    if(userData != null)
    {
        course = userData.classData.currentCourses[cnum]
        if(course != null)
        {
            loadJson(course);
        } else {
            addCategory();
            addCategory();
            addCategory();
            addCategory(); 
        }
    } else 
    {
        addCategory();
        addCategory();
        addCategory();
        addCategory();
    }
});


$('input[name=user]').on('click',function() {
    //logged in
    if(sessionStorage.getItem("infoLoaded")) { 
        window.location.href = "home.html";
    } else { //not logged in
        window.location.href = "signin.html";
    }
});



$('button[name=saveCourse]').on('click',function() {
   window.location.href="MyGrades.html";
});