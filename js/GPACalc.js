var numberSemesters = 1;
var arrayOfCourseNumbers = [1];

function printNewSemesterToScreen() {
    numberSemesters++;
    arrayOfCourseNumbers.push(1);
    var num = numberSemesters;
    return '<div class="semester" name="semester-' + num + '">' + 
        '<div class="semesterName">Semester Name' +
            '<input type="text" name="semesterName-' + num + '">' +
            '<button type="submit" class="deleteSemester" name="'+ num +'">Delete</button>' +
        '</div>' +
    '<div>' +
      '<table class="classList-'+ num +'">' +
        '<!--Heading for the course list table for this semester-->' +
        '<tr>'+
            '<th>Major?</th><th>Course Name</th><th>Grade</th><th>Credit #</th><th>GPA</th><th>Delete</th>'+
        '</tr>' +
        '<!--This will be a div that gets duplicated and removed as classes get added or removed dynamically-->' +
        '<tr name="course-'+ num +'-1">'+
            '<td><input type="checkbox" name="major-'+ num +'-1" value="major"></td>' +
            '<td><input type="text" name="courseName-'+ num +'-1"></td>' +
            '<td><input type="text" name="courseGrade-'+ num +'-1"></td>' +
            '<td><input type="text" name="creditNumber-'+ num +'-1"></td>' +
            '<td><div name="GPAOutput-'+ num +'-1">-.--</div></td>' +
            '<td><button type="submit" class="deleteCourse" semester="'+ num +'" course="1">Delete</button></td>' +
            '</tr>' +
        '<!--Here is where other courses would get added -->' +
      '</table>' +
      '<div class="overallDisplay">' +
        '<!--output divs for major and normal gpa for this semester-->' +
        '<div class="leftGPA" name="GPA-' + num + '">gpa: </div>' + 
        '<div class="rightGPA" name="majorGPA-' + num + '">major gpa: </div>' +
        '<!--button to add course to this semester-->' +
        '<button class="button addCourse" name="' + num + '">Add course</button>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function printNewCourseToScreen(semesterNum) {
    arrayOfCourseNumbers[semesterNum-1]++;
    var num = arrayOfCourseNumbers[semesterNum-1];
    return'<tr name="course-'+ semesterNum +'-'+ num +'">'+
      '<td><input type="checkbox" name="major-' + semesterNum + '-' + num + '" value="major"></td>' +
      '<td><input type="text" name="courseName-' + semesterNum + '-' + num + '"></td>' + 
      '<td><input type="text" name="courseGrade-' + semesterNum + '-' + num + '"></td>' +
      '<td><input type="text" name="creditNumber-' + semesterNum + '-' + num + '"></td>' +
      '<td><div name="GPAOutput-' + semesterNum + '-' + num + '">-.--</div></td>' +
      '<td><button type="submit" class="deleteCourse" semester="'+ semesterNum +'" course="' + num + '">Delete</button></td>' +
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

    for(var s = 1; s <= numberSemesters; s++) {
        runningCN = 0;
        runningGPA = 0;
        runningMCN = 0;
        runningMGPA = 0;
        for( var c = 1; c <= arrayOfCourseNumbers[s-1]; c++) {   
            var grade = $('input[name=courseGrade-'+s+'-'+c+']').val();
            var gpa = "0"
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
            $('div[name=GPAOutput-'+s+'-'+c+']').html(gpa)

            var creditNumber = parseFloat($('input[name=creditNumber-'+s+'-'+c+']').val())

            if($('input[name=major-'+s+'-'+c+']').is(':checked')) {
                console.log("test")
                runningMGPA = runningMGPA + (creditNumber*gpa)
                runningMCN = runningMCN + creditNumber;
            }
            runningGPA = runningGPA + (creditNumber*gpa)
            runningCN = runningCN + creditNumber;

        }
        var finalGPA = runningGPA/runningCN
        var finalMajGPA = runningMGPA/runningMCN
        $('div[name=GPA-'+s+']').html("GPA: " + finalGPA)
        $('div[name=majorGPA-'+s+']').html("Major GPA: " + finalMajGPA)


        runningOCN = runningOCN + runningCN; // overall credit num
        runningOGPA = runningOGPA + runningGPA; // overall gpa
        runningOMCN = runningOMCN + runningMCN; // overall major credit num
        runningOMGPA = runningOMGPA + runningMGPA; // overall major gpa
    }
    var finalOGPA = runningOGPA/runningOCN
    var finalMajOGPA = runningOMGPA/runningOMCN
    $('div[name=GPA]').html("Overall GPA: " + finalOGPA)
    $('div[name=majorGPA]').html("Overall Major GPA: " + finalMajOGPA)
}

$(document).ready(function () {

  });
  

  $('button[name=addSemester]').on('click',function() { //add new semester
    $(".semesterList").prepend(printNewSemesterToScreen());
    console.log(arrayOfCourseNumbers);
  });

  $('.semesterList').on('click','.addCourse',function() {
    sem = $(this).attr('name')
    $(".classList-"+sem+" > tbody:last-child").append(printNewCourseToScreen(sem));
    console.log(sem);
    console.log(arrayOfCourseNumbers);
  });

  $('.semesterList').on('click','.deleteSemester',function() {
    sem = $(this).attr('name')
    console.log(sem);
    $("div[name=semester-"+sem+"]").remove();
    numberSemesters--;
    arrayOfCourseNumbers.splice(sem-1, 1);
    console.log(arrayOfCourseNumbers);
  });

  $('.semesterList').on('click','.deleteCourse',function() {
    var s =  $(this).attr('semester')
    var c =  $(this).attr('course')
    $("tr[name=course-"+s+"-"+c+"]").remove();
    arrayOfCourseNumbers[s-1]--;
    console.log(arrayOfCourseNumbers);
  });

  $('.semesterList').on('blur','input',function() {
    updateScreen();

});


