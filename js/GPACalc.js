var userData;

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
    $("div[name=semester-"+id+"]").remove();
    removeA(activeSemesterIDs, parseFloat(id));
    activeCourseIDs[id]=[];
    if(activeSemesterIDs.length < 1) {
        newSemester(4);
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
        '<div>' +
            '<input type="text" class="semesterName" name="semesterName-' + uniqueSemesterID + '" placeholder = "Semester Name">' +
            '<input class="deletebtn deleteSemester" name="'+ uniqueSemesterID +'" type="image" src="media/delete.png">' +
        '</div>' +
    '<div>' +
      '<table class="classList classList-'+ uniqueSemesterID +'">' +
        '<!--Heading for the course list table for this semester-->' +
        '<tr>'+
            '<th>Major?</th><th>Course Name</th><th>Grade</th><th>Credit</th><th>GPA</th><th></th>'+
        '</tr>' +
        '<!--This will be a div that gets duplicated and removed as classes get added or removed dynamically-->' +
        '<!--Here is where other courses would get added -->' +
      '</table>' +
      '<div class="overallDisplay">' +
        '<!--output divs for major and normal gpa for this semester-->' +
        '<div class="leftGPA">GPA: <div name="GPA-' + uniqueSemesterID + '">N/a</div></div>' + 
        '<div class="rightGPA">Major GPA: <div name="majorGPA-' + uniqueSemesterID + '">N/a</div></div>' +
        '<!--button to add course to this semester-->' +
        '<button class="button addCourse" name="' + uniqueSemesterID + '"><img src="media/add.png"><p>Add course</p></button>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function printNewCourseToScreen(semesterID) {
    return newDiv = '<tr name="course-'+ semesterID +'-'+ uniqueCourseID +'">'+
      '<td><input type="checkbox" name="major-' + semesterID + '-' + uniqueCourseID + '" value="major"></td>' +
      '<td><input type="text" name="courseName-' + semesterID + '-' + uniqueCourseID + '" size="35" placeholder="Course Name"></td>' + 
      '<td><select name="courseGrade-' + semesterID + '-' + uniqueCourseID + '">'+
        '<option value="A">A</option>'+
        '<option value="A-">A-</option>'+
        '<option value="B+">B+</option>'+
        '<option value="B">B</option>'+
        '<option value="B-">B-</option>'+
        '<option value="C+">C+</option>'+
        '<option value="C">C</option>'+
        '<option value="C-">C-</option>'+
        '<option value="D+">D+</option>'+
        '<option value="D">D</option>'+
        '<option value="F">F</option>'+
        '</select></td>' +
      '<td><select name="creditNumber-' + semesterID + '-' + uniqueCourseID + '">'+
      '<option value="1">1 Credits</option>'+
      '<option value="2">2 Credits</option>'+
      '<option value="3">3 Credits</option>'+
      '<option value="4">4 Credits</option>'+
        '</select></td>' +
      '<td><div name="GPAOutput-' + semesterID + '-' + uniqueCourseID + '">N/a</div></td>' +
      '<td><input class="deletebtn deleteCourse" semester="'+ semesterID +'"  course="' + uniqueCourseID + '" type="image" src="media/delete.png"></td>' +
    '</tr>';
}

function saveToJson() {
    var outJ =
        {"GPA":"" ,"MajorGPA":"" ,"semesters":[]};
    var GPA = $('div[name=GPA]').text();
    var majorGPA = $('div[name=majorGPA]').text();

	var message = "Data Saved: ";

    outJ.GPA = GPA; 
    outJ.MajorGPA = majorGPA; 

    for(var s = 0; s < activeSemesterIDs.length; s++) {
        outJ.semesters.push(            
            { "name":"" ,"GPA":"" ,"MajorGPA":"" ,"courses":[]
        })

        var sem = activeSemesterIDs[s];
        var semesterName = $('input[name=semesterName-'+sem+']').val();

        //Check semester name
        if(semesterName != ""){
            outJ.semesters[s].name = semesterName;
        } else {
            message = message.concat( "\nNo name for semester-" + (s+1) + ". Default name used." );
            semesterName = "semester-" + (s+1);
            outJ.semesters[s].name = "semester-" + (s+1); 
        }

        GPA = $('div[name=GPA-'+sem+']').text();
        majorGPA = $('div[name=majorGPA-'+sem+']').text();

        outJ.semesters[s].GPA = GPA; 
        outJ.semesters[s].MajorGPA =majorGPA; 
        
        for( var c = 0; c < activeCourseIDs[sem].length; c++) {
            if($('input[name=courseName-'+sem+'-'+cor+']').val() != "") {
            outJ.semesters[s].courses.push(
                { "name":"" ,"major":"" ,"credits":"" ,"grade":"" ,"GPA":""}
            )
            var cor = activeCourseIDs[sem][c];

            //get value of major course checkbox
            var majorCourse = false;
            if($('input[name=major-'+sem+'-'+cor+']').is(':checked')) {
                majorCourse = true;
            }
            //get value of course Name
            var courseName = $('input[name=courseName-'+sem+'-'+cor+']').val();
            //get value of credit Number $('#Crd option:selected').text();
            var creditNumber = parseFloat($('select[name=creditNumber-'+sem+'-'+cor+'] option:selected').text());
            //get value of grade
            var courseGrade = $('select[name=courseGrade-'+sem+'-'+cor+'] option:selected').text();
            //getValue of GPA
            var GPA = $('div[name=GPAOutput-'+sem+'-'+cor+']').text();

            // Check Courses
            if(GPA != "N/a") {
                if(courseName != ""){
                    outJ.semesters[s].courses[c].name = courseName;
                } else {
                    message = message.concat( "\nNo name for course-" + (c+1) + " in "+ semesterName +". Default name used." );
                    outJ.semesters[s].courses[c].name = "course-" + (c+1); 
                }

                outJ.semesters[s].courses[c].major = majorCourse
                outJ.semesters[s].courses[c].credits = creditNumber
                outJ.semesters[s].courses[c].grade = courseGrade
                outJ.semesters[s].courses[c].GPA = GPA
            }

        }// For - courses
    }
    }// For - Semester
    
    // TODO: remove this alert once default values are added
    //alert(message); // Show any missing info that has been auto filled.
    console.log(outJ);
    if(userData == null) { //no account yet redirect with the option to use this data on a new account
        sessionStorage.setItem('newjson', JSON.stringify(outJ));
    } else {
    userData.semesterData = outJ;
    sessionStorage.setItem('json', JSON.stringify(userData));
        //sessionStorage.setItem('newUserSemesterJson', JSON.stringify(outJ));
    }
    
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
        var sem = activeSemesterIDs[s];

		var semName = $('input[name=semesterName-'+sem+']').val();
        if(semName == ""){
            semName = "semester-" + (s+1); 
        }

        runningCN = 0;
        runningGPA = 0;
        runningMCN = 0;
        runningMGPA = 0;

            console.log("test:"+activeCourseIDs[sem])
            for( var c = 0; c < activeCourseIDs[sem].length; c++) {
                var cor = activeCourseIDs[sem][c];

				var corName = $('input[name=courseName-'+sem+'-'+cor+']').val();
                if(corName == ""){
                    corName = "course-" + (c+1); 
                }

                var grade = $('select[name=courseGrade-'+sem+'-'+cor+'] option:selected').text();
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
                    gpa = "1.30"
                } else if(grade == 'D') {
                    gpa = "1.00"
                } else if(grade == 'F') {
                    gpa = "0.00"
                } else if( grade == "" ) {
					//NOP
				} else { // Invalid input
                   alert("Error: Grade is not Valid. " + semName + " - " + corName +"'s GPA Cannot be calculated - ");
                }

                var creditNumber = parseFloat($('select[name=creditNumber-'+sem+'-'+cor+'] option:selected').text());
                
                if( gpa != "N/a" ) // Don't bother calculating if grade is bad
                {
                    if( isNaN(creditNumber))
                    {
                        //alert("Error: Credit amount must be a number. " + semName + " - " + corName +"'s GPA Cannot be calculated");
                        gpa = "N/a";
                    }
                    else if( (creditNumber < 1 || creditNumber > 4) )
                    {
                        alert("Error: Credit range is 1 - 4. " + semName + " - " + corName +"'s GPA Cannot be calculated");
                        gpa = "N/a";
                    }
                    else
                    {
                        if($('input[name=major-'+sem+'-'+cor+']').is(':checked')) {
                            runningMGPA = runningMGPA + (creditNumber*gpa);
                            runningMCN = runningMCN + creditNumber;
                        }

                        runningGPA = runningGPA + (creditNumber*gpa);
                        runningCN = runningCN + creditNumber;
                    }
                }

                $('div[name=GPAOutput-'+sem+'-'+cor+']').html(gpa)
            } // For Courses

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
    } // For semesters

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

function loadJson(data) {
    uniqueSemesterID = 0;
    uniqueCourseID = 0;
    activeSemesterIDs = [];
    activeCourseIDs = [[]];

    $('div[class=semesterList]').html("");

    var tUCID = 0

    for(var s = 0; s < data.semesters.length; s++) {

        newSemester(data.semesters[s].courses.length);
        $("input[name=semesterName-"+s+"]").val(data.semesters[s].name);

        for( var c = 0; c < data.semesters[s].courses.length; c++) {
            if(data.semesters[s].courses[c].major == true) {
                $('input[name=major-'+s+'-'+tUCID+']').attr('checked',true);
            }
            //$('input[name=major-'+s+'-'+tUCID+']').attr('checked');
            $('input[name=courseName-'+s+'-'+tUCID+']').val(data.semesters[s].courses[c].name);
            $('select[name=creditNumber-'+s+'-'+tUCID+']').val(data.semesters[s].courses[c].credits);
            $('select[name=courseGrade-'+s+'-'+tUCID+']').val(data.semesters[s].courses[c].grade);
            tUCID++;
        }
    }
    updateScreen();
    console.log(data);
}

$(document).ready(function () {
    userData = JSON.parse(sessionStorage.getItem('json'));
    console.log(userData);
    if(userData == null || userData.semesterData.semesters == "")
    {
        newSemester(4);
    } else {
        loadJson(userData.semesterData)
    }
});

$('button[name=addSemester]').on('click',function() { //add new semester
    newSemester(4);
});

$('.semesterList').on('click','.addCourse',function() {  
    newCourse($(this).attr('name'));
});

$('.semesterList').on('click','.deleteSemester',function() {

    if( confirm("Are you sure you want to delete this semester?") )
    {
        deleteSemester($(this).attr('name'));
        updateScreen();
    }
    
});

$('.semesterList').on('click','.deleteCourse',function() {
    deleteCourse($(this).attr('semester'),$(this).attr('course'));
    updateScreen();
});

$('button[name=saveData]').on('click',function() {
    saveToJson();
    window.location.href="MyGrades.html";
});

$('button[name=loadTest]').on('click',function() {
    loadJson();
});

$('.semesterList').on('change',function() { // using 'blur', 'input' can cause infinte calls when tabbing
    updateScreen();
});

$('input[name=user]').on('click',function() {
    //logged in
    if(sessionStorage.getItem("infoLoaded")) { 
        window.location.href = "home.html";
    } else { //not logged in
        window.location.href = "signin.html";
    }
});