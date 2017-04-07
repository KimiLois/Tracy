//Javascript/Jquery for adding tracesvar
//Author: Kimi Halverson


//=============================
//CONTEXT MENU IN TRACE SECTION
//=============================

//PRE: One of the items in the context menu was clicked
//POST: Call the appropriate functions depending on
//      what was clicked. If the xml dom hasn't been
//      defined yet, we tell the user to make a trace
//      first.
$("#items > li").on('click', function () {
    if($(this).text() == "New variable"){
    	if(typeof xmlDoc == 'undefined'){
    	    alert("Create a trace first!");
    	}
    	else{
	    addVariable($(".tableColH")[0].id, functionID);
	}
	
    }
    else if($(this).text() == "New array"){
    	if(typeof xmlDoc == 'undefined'){
    	    alert("Create a trace first!");
    	}
    	else{
	    addArray($(".tableColH")[0].id, functionID);
    	}
    }
    else if($(this).text() == "New pointer"){
	if(typeof xmlDoc == 'undefined'){
	    alert("Create a trace first!");
	}else{
	    addPointer($(".tableColH")[0].id, functionID);
	}
    }

});

//================================
//ADDING VARIABLES/ARRAYS/POINTERS
//================================

//PRE: The user right clicked on "New pointer" in the
//     context menu. sequenceID and functionID are
//     identifiers
//POST: A new pointer is added to the Trace Section
//      and the database
function addPointer(sequenceID, functionID){
    var functionNum = functionID.substring(8);    
    var sequenceNumber = sequenceID.substring(3);
    var ptNum = $(xmlDoc).find("vmr[sequenceNumber="+sequenceNumber+"] > function[num="+functionNum+"] > ptNum").text();

    
    var newDiv = $("<div/>")
        .attr("id", "pointer" + ptNum)
        .addClass("thePointer");

    var someButtons = $("<div/>")
        .addClass("someButtons pull-right")
        .html("<button type='button' id='editButton"+ptNum+"' class='btn btn-default btn-xs editButton' disabled><i class='glyphicon glyphicon-edit' aria-hidden='true'></i></button> <button type='button' id='saveButton"+ptNum+"' class='btn btn-default btn-xs saveButton'><i class='glyphicon glyphicon-saved aria-hidden='true'></i></button> <button type='button' id='deleteButton"+ptNum+"' class='btn btn-default btn-xs deleteButton'><i class='glyphicon glyphicon-remove' aria-hidden='true'></i></button>");

    var inputName = $("<input type='text'/>")
	.attr("name", "ptName"+ptNum)
	.addClass("nameText inputClass")
        .attr("placeholder", "Name");

    var inputValue = $("<input type='text'/>")
        .attr("name", "ptValue"+ptNum)
        .addClass("nameText inputClass")
        .attr("placeholder", "Location");
    
    newDiv.append(someButtons, inputName, inputValue);
    $("#"+functionID).append(newDiv);
    //ASSERT: The variable Div along with the buttons and input are created and
    //        appended into the trace container
    addPointerDatabase(sequenceNumber, ptNum, functionNum);
    
}

//PRE: user created a pointer
//POST: adds pointer information to database
function addPointerDatabase(sequenceNumber, ptNum, functionNum){
    var vmrSeq = "vmr[sequenceNumber="+sequenceNumber+"]";

    var newPointer = $("<pt></pt>").attr("num", ptNum);
    $(xmlDoc).find("vmr[sequenceNumber="+sequenceNumber+"] > function[num="+functionNum+"] > pointers").append(newPointer);
    //ASSERT: create a new variable element to append to the XML document
    ptNum = parseInt(ptNum) + 1;
    //ASSERT: increase the number of variables
    $(xmlDoc).find("vmr[sequenceNumber="+sequenceNumber+"] > function[num="+functionNum+"] > ptNum").text(ptNum);
    // //ASSERT: updates the xml for the vmr
}


//PRE: The user right clicked on "New array" in the
//     context menu. sequenceID and functionID are
//     identifiers
//POST: A new array is added to the Trace Section
//      and the database
function addArray(sequenceID, functionID){
    var functionNum = functionID.substring(8);
    var sequenceNumber = sequenceID.substring(3);
    var arrNum = $(xmlDoc).find("vmr[sequenceNumber="+sequenceNumber+"] > function[num="+functionNum+"] > arrNum").text();
    var newDiv = $("<div/>").attr("id", "array"+arrNum).addClass("theArray");

    var someButtons = $("<div/>")
	.addClass("someButtons pull-right")
	.html("<button type='button' id='editButton"+arrNum+"' class='btn btn-default btn-xs editButton' disabled><i class='glyphicon glyphicon-edit' aria-hidden='true'></i></button> <button type='button' id='saveButton"+arrNum+"' class='btn btn-default btn-xs saveButton'><i class='glyphicon glyphicon-saved aria-hidden='true'></i></button> <button type='button' id='deleteButton"+arrNum+"' class='btn btn-default btn-xs deleteButton'><i class='glyphicon glyphicon-remove' aria-hidden='true'></i></button>");

    var arrayButtons = $("<div/>")
	.addClass("arrayButtons")
	.html("<button type='button' id='addIndex"+arrNum+"' class='btn btn-default btn-xs addButton'><i class='glyphicon glyphicon-plus' aria-hidden='true'></i></button>  <button type='button' id='removeIndex"+arrNum+"' class='btn btn-default btn-xs removeButton'><i class='glyphicon glyphicon-minus' aria-hidden='true'></i></button>");

    var arrayVals = $("<div/>")
	.html("<table id='arrayVals'><tr id='arrayRow'><td><input type='text' name='indexName"+arrNum+"' class='nameText inputClass' placeholder='Name'/></td></tr></table>");

    newDiv.append(someButtons, arrayButtons, arrayVals);
    $("#"+functionID).append(newDiv);

    
    addArrayDatabase(sequenceNumber, arrNum, functionNum);
}

//PRE: user created a variable
//POST: adds array information to database
function addArrayDatabase(sequenceNumber, arrNum, functionNum){
    var newArray = $("<arr></arr>").attr("num", arrNum);
    var arrayLength = $("<length/>").text("0");
    var arrayName = $("<name/>").text("");
    newArray.append(arrayLength, arrayName);
    $(xmlDoc).find("vmr[sequenceNumber="+sequenceNumber+"] > function[num="+functionNum+"] > arrays").append(newArray);
    //ASSERT: create a new array element to append to the XML document
    arrNum = parseInt(arrNum) + 1;
    //ASSERT: increase the number of arrays
    $(xmlDoc).find("vmr[sequenceNumber="+sequenceNumber+"] > function[num="+functionNum+"] > arrNum").text(arrNum);
}

//PRE: The user right clicked on "New variable" in the
//     context menu. sequenceID and functionID are
//     identifiers
//POST: A new variable is added to the Trace Section
function addVariable(sequenceID, functionID){
    var functionNum = functionID.substring(8);
    
    var sequenceNumber = sequenceID.substring(3);

    var variableNum = $(xmlDoc).find("vmr[sequenceNumber="+sequenceNumber+"] > function[num="+functionNum+"] > varNum").text();

    
    var newDiv = $("<div/>")
        .attr("id", "variable" + variableNum)
        .addClass("theVariable");

    var someButtons = $("<div/>")
        .addClass("someButtons pull-right")
        .html("<button type='button' id='editButton"+variableNum+"' class='btn btn-default btn-xs editButton' disabled><i class='glyphicon glyphicon-edit' aria-hidden='true'></i></button> <button type='button' id='saveButton"+variableNum+"' class='btn btn-default btn-xs saveButton'><i class='glyphicon glyphicon-saved aria-hidden='true'></i></button> <button type='button' id='deleteButton"+variableNum+"' class='btn btn-default btn-xs deleteButton'><i class='glyphicon glyphicon-remove' aria-hidden='true'></i></button>");

    var inputName = $("<input type='text'/>")
	.attr("name", "varName"+variableNum)
	.addClass("nameText inputClass")
        .attr("placeholder", "Name");

    var inputValue = $("<input type='text'/>")
        .attr("name", "varValue"+variableNum)
        .addClass("valueText inputClass")
        .attr("placeholder", "Value");
    
    newDiv.append(someButtons, inputName, inputValue);
    $("#"+functionID).append(newDiv);
    //ASSERT: The variable Div along with the buttons and input are created and
    //        appended into the trace container

    addVarDatabase(sequenceNumber, variableNum, functionNum);
}

//PRE: user created a variable
//POST: adds variable information to database
function addVarDatabase(sequenceNumber, variableNum, functionNum){
    var vmrSeq = "vmr[sequenceNumber="+sequenceNumber+"]";

    var newVariable = $("<var></var>").attr("num", variableNum);
    $(xmlDoc).find("vmr[sequenceNumber="+sequenceNumber+"] > function[num="+functionNum+"] > variables").append(newVariable);
    //ASSERT: create a new variable element to append to the XML document
    variableNum = parseInt(variableNum) + 1;
    //ASSERT: increase the number of variables
    $(xmlDoc).find("vmr[sequenceNumber="+sequenceNumber+"] > function[num="+functionNum+"] > varNum").text(variableNum);
    // //ASSERT: updates the xml for the vmr
}

