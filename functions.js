//Javascript/JQuery for adding functions
//Author: Kimi Halverson


//PRE: User clicked on the add function button
//POST: Prepends a new function to the trace section.
//      increments the number of functions
$("#functionButton").on('click', function(){
    var sequenceNumber = $(".tableColH")[0].id.substring(3);
    //ASSERT: sequence number of currently selected VMR

    var functionNumber = $(xmlDoc).find("vmr[sequenceNumber="+sequenceNumber+"] > funcNumber").text();
    
    var newFunction = $("<div/>")
        .attr("id", "function" + functionNumber)
        .addClass("aFunction");

    $(newFunction).append("<h6>Function</h6>");
    //ASSERT: create a simple header for the function

    $("#traceSection").prepend(newFunction);
    
    addFunctionDatabase(sequenceNumber, functionNumber);

    functionNumber = parseInt(functionNumber) + 1;
    $(xmlDoc).find("vmr[sequenceNumber="+sequenceNumber+"] > funcNumber").text(functionNumber);
    //ASSERT: update the number of functions after we've made our changes
});


//PRE: User clicked on the delete function button
//POST: Removes the most recently added function and all of it's contents.
$("#deleteFunction").on('click', function(){
    var sequenceNumber = $(".tableColH")[0].id.substring(3);
    //ASSERT: sequence number of currently selected VMR
    var funcNum = $(xmlDoc).find("vmr[sequenceNumber="+sequenceNumber+"] > funcNumber").text();
    //ASSERT: number of functions existing for that vmr
    
    $("#traceSection").find('div:first').remove();

    funcNum = parseInt(funcNum) - 1;
    //ASSERT: decrement the number because we are zero-based and we need to match
    //        the last identifier.

    $(xmlDoc).find("vmr[sequenceNumber="+sequenceNumber+"] > function[num="+funcNum+"]").remove();
    //ASSERT: finds the appropriate function (most recently created) and removes it

    var funcNum = $(xmlDoc).find("vmr[sequenceNumber="+sequenceNumber+"] > funcNumber").text(funcNum);
});


//PRE: The user has added a function to the database. SequenceNumber
//     and functionNumbers are identifiers for the VMR and the currently
//     created function
function addFunctionDatabase(sequenceNumber, functionNumber){
    var newFunction = $("<function/>").attr("num", functionNumber);

    var varNum = xmlDoc.createElement("varNum");
    varNum.appendChild(xmlDoc.createTextNode("0"));
    var arrNum = xmlDoc.createElement("arrNum");
    arrNum.appendChild(xmlDoc.createTextNode("0"));
    var ptNum = xmlDoc.createElement("ptNum");
    ptNum.appendChild(xmlDoc.createTextNode("0"));

    $(newFunction).append(varNum, arrNum, ptNum);
    $(newFunction).append("<variables></variables>");
    $(newFunction).append("<arrays></arrays>");
    $(newFunction).append("<pointers></pointers>");

    $(xmlDoc).find("vmr[sequenceNumber="+sequenceNumber+"]").append(newFunction);
    //ASSERT: create all necessary tags to the function and append to the database
}
