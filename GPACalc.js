



//total number of all the courses and semester made even including the deleted ones
var uniqueSemesterID = 0;
var uniqueCourseID = 0;

//array of all the active semester id's
var activeSemesterIDs = [];
var activeCourseIDs = [[]];

function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            console.log("test");
            arr.splice(ax, 1);
        }
    }
    return arr;
}

function printInfo() {
    console.log("uniqueCourseID: " + uniqueCourseID);
    console.log("uniqueSemesterID: " + uniqueSemesterID);
    console.log("activeCourseIDs: " + activeCourseIDs); 
    console.log("activeSemesterIDs: " + activeSemesterIDs);
}

function newSemester() {
    $(".semesterList").prepend(printNewSemesterToScreen());
    //add another semester id to the array
    activeSemesterIDs.push(uniqueSemesterID);
    activeCourseIDs.push([]);
    printInfo();
    for(var i = 0; i < 4; i++)
    { newCourse(uniqueSemesterID); }
    uniqueSemesterID++;
}

function newCourse(semID) {
    $(".classList-"+semID+" > tbody:last-child").append(printNewCourseToScreen(semID));
    activeCourseIDs[semID].push(uniqueCourseID); //push the start of the array for this semester
    printInfo();
    uniqueCourseID++;
}

function deleteSemester(id) {
    $("div[name=semester-"+id+"]").remove();;
    removeA(activeSemesterIDs, parseFloat(id));
    activeCourseIDs[id]=[-1];
    if(activeSemesterIDs.length < 1) {
        newSemester();
    }
    printInfo();
}

function deleteCourse(semID,cID) {
    if(activeCourseIDs[semID].length <= 1) {
        deleteSemester(semID);
    } else {
    $("tr[name=course-"+semID+"-"+cID+"]").remove();
    removeA(activeCourseIDs[semID], parseFloat(cID));
    printInfo()
    }
}

function printNewSemesterToScreen() {
    return '<div class="semester" name="semester-' + uniqueSemesterID + '">' + 
        '<div class="semesterName">Semester Name' +
            '<input type="text" name="semesterName-' + uniqueSemesterID + '">' +
            '<button type="submit" class="deleteSemester" name="'+ uniqueSemesterID +'">Delete</button>' +
        '</div>' +
    '<div>' +
      '<table class="classList-'+ uniqueSemesterID +'">' +
        '<!--Heading for the course list table for this semester-->' +
        '<tr>'+
            '<th>Major?</th><th>Course Name</th><th>Grade</th><th>Credit #</th><th>GPA</th><th>Delete</th>'+
        '</tr>' +
        '<!--This will be a div that gets duplicated and removed as classes get added or removed dynamically-->' +
        '<!--Here is where other courses would get added -->' +
      '</table>' +
      '<div class="overallDisplay">' +
        '<!--output divs for major and normal gpa for this semester-->' +
        '<div class="leftGPA" name="GPA-' + uniqueSemesterID + '">GPA: N/a </div>' + 
        '<div class="rightGPA" name="majorGPA-' + uniqueSemesterID + '">Major GPA: N/a</div>' +
        '<!--button to add course to this semester-->' +
        '<button class="button addCourse" name="' + uniqueSemesterID + '">Add course</button>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function printNewCourseToScreen(semesterID) {
    return newDiv = '<tr name="course-'+ semesterID +'-'+ uniqueCourseID +'">'+
      '<td><input type="checkbox" name="major-' + semesterID + '-' + uniqueCourseID + '" value="major"></td>' +
      '<td><input type="text" name="courseName-' + semesterID + '-' + uniqueCourseID + '"></td>' + 
      '<td><input type="text" name="courseGrade-' + semesterID + '-' + uniqueCourseID + '"></td>' +
      '<td><input type="text" name="creditNumber-' + semesterID + '-' + uniqueCourseID + '"></td>' +
      '<td><div name="GPAOutput-' + semesterID + '-' + uniqueCourseID + '">-.--</div></td>' +
      '<td><button type="submit" class="deleteCourse" semester="'+ semesterID +'" course="' + uniqueCourseID + '">Delete</button></td>' +
    '</tr>';
}

function updateScreen() {
    var runningCN; // credit num [semester]
    var runningGPA; // gpa [semester]
    var runningMCN; // major credit num [semester]
    var runningMGPA; // major gpa [semester]
    var runningOCN = 0; // overall credit num
    var runningOGPA = 0; // overall gpa
    var runningOMCN = 0; // overall major credit num
    var runningOMGPA = 0; // overall major gpa

    for(var s = 0; s < activeSemesterIDs.length; s++) {
        console.log("test")
        var sem = activeSemesterIDs[s];
        runningCN = 0;
        runningGPA = 0;
        runningMCN = 0;
        runningMGPA = 0;
        if(activeCourseIDs[sem] != -1)  {
            for( var c = 0; c < activeCourseIDs[sem].length; c++) {
                var cor = activeCourseIDs[sem][c];
                var grade = $('input[name=courseGrade-'+sem+'-'+cor+']').val();
                grade = grade.toUpperCase();
                var gpa = "0.00"
                if(grade == 'A') {
                    gpa = "4.00"
                } else if(grade == 'A-') {
                    gpa = "3.70"
                } else if(grade == 'B+') {
                    gpa = "3.30"
                } else if(grade == 'B') {
                    gpa = "3.00"
                } else if(grade == 'B-') {
                    gpa = "2.70"
                } else if(grade == 'C+') {
                    gpa = "2.30"
                } else if(grade == 'C') {
                    gpa = "2.00"
                } else if(grade == 'C-') {
                    gpa = "1.70"
                } else if(grade == 'D+') {
                    gpa = "1.3"
                } else if(grade == 'D') {
                    gpa = "1.00"
                } else if(grade == 'F') {
                    gpa = "0.00"
                } else {
                }
                $('div[name=GPAOutput-'+sem+'-'+cor+']').html(gpa)

                var creditNumber = parseFloat($('input[name=creditNumber-'+sem+'-'+cor+']').val())
                if(!isNaN(creditNumber) && gpa != "0.00") {
                    if($('input[name=major-'+sem+'-'+cor+']').is(':checked')) {
                        console.log("test")
                        runningMGPA = runningMGPA + (creditNumber*gpa)
                        runningMCN = runningMCN + creditNumber;
                    }
                    runningGPA = runningGPA + (creditNumber*gpa)
                    runningCN = runningCN + creditNumber;
                }
            }
        }else{
            console.log("empty sem");
        }
        var finalGPA = (runningGPA/runningCN).toFixed(2);
        var finalMGPA = (runningMGPA/runningMCN).toFixed(2);
        if(isNaN(finalGPA)) {
            finalGPA = "N/a"
        }
        if(isNaN(finalMGPA)) {
            finalMGPA = "N/a"
        }
        $('div[name=GPA-'+sem+']').html("GPA: " + finalGPA)
        $('div[name=majorGPA-'+sem+']').html("Major GPA: " + finalMGPA)
        runningOCN = runningOCN + runningCN; // overall credit num
        runningOGPA = runningOGPA + runningGPA; // overall gpa
        runningOMCN = runningOMCN + runningMCN; // overall major credit num
        runningOMGPA = runningOMGPA + runningMGPA; // overall major gpa
    }
    var finalOGPA = (runningOGPA/runningOCN).toFixed(2);
    var finalMOGPA = (runningOMGPA/runningOMCN).toFixed(2);
    if(isNaN(finalOGPA)) {
        finalOGPA = "N/a"
    }

    if(isNaN(finalMOGPA)) {
        finalMOGPA = "N/a"
    }

    $('div[name=GPA]').html("Overall GPA: " + finalOGPA)
    $('div[name=majorGPA]').html("Overall Major GPA: " + finalMOGPA)
}

$(document).ready(function () {
    newSemester();
  });
  

  $('button[name=addSemester]').on('click',function() { //add new semester
    newSemester();
  });

  $('.semesterList').on('click','.addCourse',function() {  
    newCourse($(this).attr('name'));
  });

  $('.semesterList').on('click','.deleteSemester',function() {
    deleteSemester($(this).attr('name'));
    updateScreen();
  });

  $('.semesterList').on('click','.deleteCourse',function() {
    deleteCourse($(this).attr('semester'),$(this).attr('course'));
    updateScreen();
  });

  $('.semesterList').on('blur','input',function() {
    updateScreen();
});


