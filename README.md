# FourPointO
GUI II Project Sequence 

JSON FORMAT BETWEEN PAGES

GPACalc.js

GPA Calc can load/save data in the following JSON format:

This JSON contains the overall GPA, the major GPA and an array of semesters

each semester stores the semester name, the semester major GPA, the semester overall GPA and an array of courses

each course stores the course name, whether its a major course, how many credits, what the final grade is and its GPA value

Example:

{"GPA":"3.08" ,"MajorGPA":"3.10" ,"semesters":[
    { "name":" " ,"GPA":"3.23" ,"MajorGPA":"3.04" ,"courses":[
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
    }
]};

GradeCalc.js

GPA Calc can load/save data in the following JSON format:

This JSON contains the course name, the grade %, whether its a major course, the number of credits and an array of catagories

each catagory stores the catagory name, its weight and current average

Example:

{"Name":"Intro to Psych" ,"Grade":"87.95%" ,"MajorCourse":"false" ,"CreditNumber":"3" ,"cats":[
    { "Name":"Test" ,"Weight":"30" ,"Average":"78" },
    { "Name":"Quizzes" ,"Weight":"25" ,"Average":"86" },
    { "Name":"Homework" ,"Weight":"15" ,"Average":"98" },
    { "Name":"Research Paper" ,"Weight":"15" ,"Average":"89" },
    { "Name":"Attendence" ,"Weight":"15" ,"Average":"100" },]
};  

MyGrades.js

This page will load from what should be pretty much the whole database, all that firebase should need is this json per user (with a unique user id)

Format:

Json contains USER id and two objects: semesterData and classData
semester data is exactly the same as the json used in GPAcalc.js

classData is an array called current courses of the exact same jsons we used in GradeCalc.js


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



