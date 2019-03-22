
// Global(s)
var catCount = 1; // Used to differentiate categories 

/**
 * Adds a new course row to the categoryList table
 */
function addCategory() {

    var emptyCategroy = 
    "<tr class=\"category\" name=cat-"+ catCount +"\">" +
        "<td><input type=\"text\" name=\"catName-" + catCount + "\"></td>" +
        "<td><input type=\"text\" class=\"weight\" name=\"catWeight-" + catCount + "\"></td>" +
        "<td><input type=\"text\" class=\"avg\" name=\"catAvg-" + catCount + "\"></td>" +
        "<td><button type=\"submit\" class=\"deleteCat\" category=\"" + catCount + "\">Delete</button></td>" +
    "</tr>";

    $(".categoryList").append( emptyCategroy );

    console.log("Added new  category-" + catCount);

    catCount++;
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

        totalWeight += currWeight;

        // Assuming weight is a percentage
        currWeight = ( currWeight / 100 );

        grade += ( currWeight * currAvg );
    }

    $('.currentGrade').html("Current Grade " + grade + "/" + totalWeight);
 }

 /**
  * TODO: Save the data by sending it to some server
  */
 function saveCourse() {
    
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