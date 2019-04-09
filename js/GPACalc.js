



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

function newSemester(course) {
    $(".semesterList").prepend(printNewSemesterToScreen());
    //add another semester id to the array
    activeSemesterIDs.push(uniqueSemesterID);
    activeCourseIDs.push([]);
    printInfo();
    for(var i = 0; i < course; i++)
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
    activeCourseIDs[id]=[];
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
        '<div class="leftGPA">GPA: <div name="GPA-' + uniqueSemesterID + '">N/a</div></div>' +
        '<div class="rightGPA">Major GPA: <div name="majorGPA-' + uniqueSemesterID + '">N/a</div></div>' +
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
      '<td><div name="GPAOutput-' + semesterID + '-' + uniqueCourseID + '">N/a</div></td>' +
      '<td><button type="submit" class="deleteCourse" semester="'+ semesterID +'" course="' + uniqueCourseID + '">Delete</button></td>' +
    '</tr>';
}

function saveToJson() {
    var GPA = $('div[name=GPA]').text();
    var majorGPA = $('div[name=majorGPA]').text();
    var outputJSON = "{\"GPA\":\"" + GPA + "\" ,";
    outputJSON += "\"MajorGPA\":\"" + majorGPA + "\" ,";
    outputJSON += "\"semesters\":[";


    for(var s = 0; s < activeSemesterIDs.length; s++) {
        var sem = activeSemesterIDs[s];
        var semesterName = $('input[name=semesterName-'+sem+']').val();
        outputJSON += "{ \"name\":\""
        if(semesterName != ""){
            outputJSON += semesterName;
        } else {
            outputJSON += "semester-" + (s+1);
        }
        GPA = $('div[name=GPA-'+sem+']').text();
        majorGPA = $('div[name=majorGPA-'+sem+']').text();

        outputJSON += "\" ,\"GPA\":\"" + GPA + "\" ,";
        outputJSON += "\"MajorGPA\":\"" + majorGPA + "\" ,";
        outputJSON += "\"courses\":[";
        for( var c = 0; c < activeCourseIDs[sem].length; c++) {
            var cor = activeCourseIDs[sem][c];
            //get value of major course checkbox
            var majorCourse = false;
            if($('input[name=major-'+sem+'-'+cor+']').is(':checked')) {
                majorCourse = true;
            }
            //get value of course Name
            var courseName = $('input[name=courseName-'+sem+'-'+cor+']').val();
            //get value of credit Number
            var creditNumber = parseFloat($('input[name=creditNumber-'+sem+'-'+cor+']').val());
            //get value of grade
            var courseGrade = $('input[name=courseGrade-'+sem+'-'+cor+']').val().toUpperCase();
            //getValue of GPA
            var GPA = $('div[name=GPAOutput-'+sem+'-'+cor+']').text();
            if(GPA != "N/a") {
            outputJSON += "{ \"name\":\"";
                if(courseName != ""){
                    outputJSON += courseName;
                } else {
                    outputJSON += "course-" + (c+1);
                }
                outputJSON += "\" ,\"major\":\"" + majorCourse + "\" ,";
                outputJSON += "\"credits\":\"" + creditNumber + "\" ,";
                outputJSON += "\"grade\":\"" + courseGrade + "\" ,";
                outputJSON += "\"GPA\":\"" + GPA + "\"} ,";
            }
        }
        outputJSON += "]} ,";
        }
    outputJSON += "]}";
    console.log(outputJSON);
    // saveDataToFirebase(outputJSON)
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
            console.log("test:"+activeCourseIDs[sem])
            for( var c = 0; c < activeCourseIDs[sem].length; c++) {
                var cor = activeCourseIDs[sem][c];
                var grade = $('input[name=courseGrade-'+sem+'-'+cor+']').val();
                grade = grade.toUpperCase();
                var gpa = "N/a"
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
                var creditNumber = parseFloat($('input[name=creditNumber-'+sem+'-'+cor+']').val())
                if(!isNaN(creditNumber) && gpa != "N/a") {
                    if($('input[name=major-'+sem+'-'+cor+']').is(':checked')) {
                        runningMGPA = runningMGPA + (creditNumber*gpa)
                        runningMCN = runningMCN + creditNumber;
                    }
                    runningGPA = runningGPA + (creditNumber*gpa)
                    runningCN = runningCN + creditNumber;
                } else {
                    gpa = "N/a";
                }
                $('div[name=GPAOutput-'+sem+'-'+cor+']').html(gpa)
            }
        var finalGPA = (runningGPA/runningCN).toFixed(2);
        var finalMGPA = (runningMGPA/runningMCN).toFixed(2);
        if(isNaN(finalGPA)) {
            finalGPA = "N/a"
        }
        if(isNaN(finalMGPA)) {
            finalMGPA = "N/a"
        }
        $('div[name=GPA-'+sem+']').html(finalGPA)
        $('div[name=majorGPA-'+sem+']').html(finalMGPA)
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

    $('div[name=GPA]').html(finalOGPA)
    $('div[name=majorGPA]').html(finalMOGPA)
};

function loadJson() {
    uniqueSemesterID = 0;
    uniqueCourseID = 0;
    activeSemesterIDs = [];
    activeCourseIDs = [[]];

    $('div[class=semesterList]').html("");

    // var data = loadDataFromFirebase();
    var data = {"GPA":"3.08" ,"MajorGPA":"3.10" ,"semesters":[{ "name":"Freshmen 1" ,"GPA":"3.23" ,"MajorGPA":"3.04" ,"courses":[{ "name":"Physics" ,"major":"false" ,"credits":"3" ,"grade":"A-" ,"GPA":"3.70"},{ "name":"Physics Lab " ,"major":"false" ,"credits":"1" ,"grade":"C+" ,"GPA":"2.30"},{ "name":"Computing 1" ,"major":"true" ,"credits":"4" ,"grade":"B+" ,"GPA":"3.30"},{ "name":"Circuits 1" ,"major":"true" ,"credits":"3" ,"grade":"B-" ,"GPA":"2.70"},{ "name":"Freshmen Seminar" ,"major":"false" ,"credits":"1" ,"grade":"A" ,"GPA":"4.00"}]},{ "name":"Freshmen 2" ,"GPA":"2.68" ,"MajorGPA":"2.85" ,"courses":[{ "name":"Chemistry" ,"major":"false" ,"credits":"3" ,"grade":"B-" ,"GPA":"2.70"},{ "name":"Chemistry Lab" ,"major":"false" ,"credits":"1" ,"grade":"D+" ,"GPA":"1.3"},{ "name":"Computing 2" ,"major":"true" ,"credits":"4" ,"grade":"A" ,"GPA":"4.00"},{ "name":"Assembly" ,"major":"true" ,"credits":"4" ,"grade":"C-" ,"GPA":"1.70"}]},{ "name":"Sophmore 1" ,"GPA":"3.39" ,"MajorGPA":"3.43" ,"courses":[{ "name":"Comp Architecture" ,"major":"true" ,"credits":"3" ,"grade":"A" ,"GPA":"4.00"},{ "name":"Computing 3" ,"major":"true" ,"credits":"4" ,"grade":"B" ,"GPA":"3.00"},{ "name":"Intro to Psych" ,"major":"false" ,"credits":"3" ,"grade":"B+" ,"GPA":"3.30"}]}]};
    var tUCID = 0
    for(var s = 0; s < data.semesters.length; s++) {

        newSemester(data.semesters[s].courses.length);
        $("input[name=semesterName-"+s+"]").val(data.semesters[s].name);

        for( var c = 0; c < data.semesters[s].courses.length; c++) {
            if(data.semesters[s].courses[c].major == 'true') {
                $('input[name=major-'+s+'-'+tUCID+']').attr('checked',true);
            }
            $('input[name=major-'+s+'-'+tUCID+']').attr('checked');
            $('input[name=courseName-'+s+'-'+tUCID+']').val(data.semesters[s].courses[c].name);
            $('input[name=creditNumber-'+s+'-'+tUCID+']').val(data.semesters[s].courses[c].credits);
            $('input[name=courseGrade-'+s+'-'+tUCID+']').val(data.semesters[s].courses[c].grade);
            tUCID++;
        }
    }
    updateScreen();
    console.log(data);
}

$(document).ready(function () {
    newSemester(4);
});




$('button[name=addSemester]').on('click',function() { //add new semester
    newSemester(4);
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

$('button[name=saveData]').on('click',function() {
    saveToJson();
});

$('button[name=loadTest]').on('click',function() {
    loadJson();
});

$('.semesterList').on('blur','input',function() {
    updateScreen();
});
