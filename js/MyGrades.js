var userData;
var testUserData = 
{
"UserID":"123",
"semesterData":
    { "GPA":"3.08" ,"MajorGPA":"3.10" ,"semesters":[
        { "name":"Freshmen 1" ,"GPA":"3.23" ,"MajorGPA":"3.04" ,"courses":[
            { "name":"Physics" ,"major":"false" ,"credits":"3" ,"grade":"A-" ,"GPA":"3.70"},
            { "name":"Physics Lab " ,"major":"false" ,"credits":"1" ,"grade":"C+" ,"GPA":"2.30"},
            { "name":"Computing 1" ,"major":"true" ,"credits":"4" ,"grade":"B+" ,"GPA":"3.30"},
            { "name":"Circuits 1" ,"major":"true" ,"credits":"3" ,"grade":"B-" ,"GPA":"2.70"},
            { "name":"Freshmen Seminar" ,"major":"false" ,"credits":"1" ,"grade":"A" ,"GPA":"4.00"}]
        },{ "name":"Freshmen 2" ,"GPA":"2.68" ,"MajorGPA":"2.85" ,"courses":[
            { "name":"Chemistry" ,"major":"false" ,"credits":"3" ,"grade":"B-" ,"GPA":"2.70"},
            { "name":"Chemistry Lab" ,"major":"false" ,"credits":"1" ,"grade":"D+" ,"GPA":"1.3"},
            { "name":"Computing 2" ,"major":"true" ,"credits":"4" ,"grade":"A" ,"GPA":"4.00"},
            { "name":"Assembly" ,"major":"true" ,"credits":"4" ,"grade":"C-" ,"GPA":"1.70"}]
        },{ "name":"Sophmore 1" ,"GPA":"3.39" ,"MajorGPA":"3.43" ,"courses":[
            { "name":"Comp Architecture" ,"major":"true" ,"credits":"3" ,"grade":"A" ,"GPA":"4.00"},
            { "name":"Computing 3" ,"major":"true" ,"credits":"4" ,"grade":"B" ,"GPA":"3.00"},
            { "name":"Intro to Psych" ,"major":"false" ,"credits":"3" ,"grade":"B+" ,"GPA":"3.30"}]
        }]
    },
"classData":
    { "currentCourses":[
            {"Name":"Intro to Psych" ,"Grade":"87.95%" ,"MajorCourse":"false" ,"CreditNumber":"3" ,"cats":[
                { "Name":"Test" ,"Weight":"30" ,"Average":"78" },
                { "Name":"Quizzes" ,"Weight":"25" ,"Average":"86" },
                { "Name":"Homework" ,"Weight":"15" ,"Average":"98" },
                { "Name":"Research Paper" ,"Weight":"15" ,"Average":"89" },
                { "Name":"Attendence" ,"Weight":"15" ,"Average":"100" },]
            },
            {"Name":"GUI 1" ,"Grade":"89.10%" ,"MajorCourse":"true" ,"CreditNumber":"3" ,"cats":[
                { "Name":"Assignments" ,"Weight":"70" ,"Average":"93" },
                { "Name":"Test" ,"Weight":"15" ,"Average":"76" },
                { "Name":"Quizzes" ,"Weight":"15" ,"Average":"84" },]
            },
            {"Name":"Economics 2" ,"Grade":"73.80%" ,"MajorCourse":"false" ,"CreditNumber":"3" ,"cats":[
                { "Name":"Exam" ,"Weight":"30" ,"Average":"65" },
                { "Name":"Final" ,"Weight":"20" ,"Average":"73" },
                { "Name":"Homework" ,"Weight":"10" ,"Average":"98" },
                { "Name":"Paper" ,"Weight":"30" ,"Average":"78" },
                { "Name":"Attendence" ,"Weight":"10" ,"Average":"65" },]
            },
            {"Name":"Physics" ,"Grade":"71.20%" ,"MajorCourse":"false" ,"CreditNumber":"3" ,"cats":[
                { "Name":"Exams" ,"Weight":"45" ,"Average":"39" },
                { "Name":"Homework" ,"Weight":"35" ,"Average":"99" },
                { "Name":"Clicker Questions" ,"Weight":"20" ,"Average":"95" },]
            },
            {"Name":"Computing 4" ,"Grade":"93.40%" ,"MajorCourse":"true" ,"CreditNumber":"4" ,"cats":[
                { "Name":"Assignments" ,"Weight":"65" ,"Average":"96" },
                { "Name":"Exams" ,"Weight":"20" ,"Average":"83" },
                { "Name":"Quizzes" ,"Weight":"7.5" ,"Average":"92" },
                { "Name":"Attendence" ,"Weight":"7.5" ,"Average":"100" },]
            }
        ]
    }
};
var testClassData = {}

function loadSemesterData(data) {
    console.log(data);
    $('div[name=GPA]').text(data.GPA);
    $('div[name=majorGPA]').text(data.MajorGPA);
    printNewSemsesters(data.semesters.length);
    for(var s = 0; s < data.semesters.length; s++) {
        $('a[name=semesterName-' + s + ']').text(data.semesters[s].name);
        $('a[name=majorGPA-' + s + ']').text(data.semesters[s].MajorGPA);
        $('a[name=overallGPA-' + s + ']').text(data.semesters[s].GPA);
    }
}

function loadClassData(data) {
    var overallGrade = 0;
    var majorGrade = 0;
    var overallCreditCount = 0;
    var majorCreditCount = 0;

    printNewClasses(data.currentCourses.length);
    for(var i = 0; i < data.currentCourses.length; i++) {
        $('a[name=className-' + i + ']').text(data.currentCourses[i].Name);
        $('a[name=credit-' + i + ']').text(data.currentCourses[i].CreditNumber);
        $('a[name=grade-' + i + ']').text(data.currentCourses[i].Grade);

        var grade = parseFloat(data.currentCourses[i].Grade);
        var credit = parseFloat(data.currentCourses[i].CreditNumber);


        if(data.currentCourses[i].MajorCourse=='true') {
            $('a[name=major-' + i + ']').text("Yes");
            majorGrade += (grade*credit);
            majorCreditCount += credit;
        } else {
            $('a[name=major-' + i + ']').text("No");
        }
        overallGrade += (grade*credit);
        overallCreditCount += credit;
    }

    var finalMajorGrade = majorGrade/majorCreditCount;
    var finalGrade = overallGrade/overallCreditCount;
    console.log(overallCreditCount);
    $('div[name=semGPA]').text(percentToGPA(finalGrade/100));
    $('div[name=semMajorGPA]').text(percentToGPA(finalMajorGrade/100));
}

function loadUserJson() {
    var data = userData;
    /*
    This will be where we load in the JSON's from the specific user
    */
    loadSemesterData(data.semesterData);
    loadClassData(data.classData);

}

function printNewSemsesters(num) {
    for(var i = 0; i < num; i++) {
        newTR = '<tr>'+
        '<td><a name="semesterName-'+i+'"></a></td>'+
        '<td><a name="majorGPA-'+i+'"></a></td>'+
        '<td><a name="overallGPA-'+i+'"></a></td>'+
        '</tr>'
        $(".semesters").append(newTR);
    }
}

function printNewClasses(num) {
    for(var i = 0; i < num; i++) {
        var data = JSON.stringify(testUserData.classData.currentCourses[i]);
        newTR = '<tr>'+
        '<td><a name="className-'+i+'"></a></td>'+
        '<td><a name="major-'+i+'"></a></td>'+
        '<td><a name="credit-'+i+'"></a></td>'+
        '<td><a name="grade-'+i+'"></a></td>'+
        '<td><form method="post" action="GradeCalc.html?course='+i+'"><button class="deletebtn" name="editCourse-'+i+'">Edit</button></form></td>'+
        '</tr>'
        $(".classes").append(newTR);
    }
}

function percentToGPA(percent) {
    var gpa = "N/a";
    console.log(percent);
    if(percent >= .93 ) {
        gpa = "4.00";
    } else if(percent >= .90) {
        gpa = "3.70"
    } else if(percent >= .87) {
        gpa = "3.30"
    } else if(percent >= .83) {
        gpa = "3.00"
    } else if(percent >= .80) {
        gpa = "2.70"
    } else if(percent >= .77) {
        gpa = "2.30"
    } else if(percent >= .73) {
        gpa = "2.00"
    } else if(percent >= .70) {
        gpa = "1.70"
    } else if(percent >= .67) {
        gpa = "1.3"
    } else if(percent >= .60) {
        gpa = "1.00"
    } else if(percent >= 0) {
        gpa = "0.00"
    }
    return gpa;
}

$(document).ready(function () {
    userData = JSON.parse(sessionStorage.getItem('json'));
    console.log(userData);
    if(userData == null) {
        console.log("wut");
        userData = testUserData;
        sessionStorage.setItem('json', JSON.stringify(userData));
    }
    loadUserJson();
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


