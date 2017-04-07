//Javascript/JQuery for adding to/editing the VMR sequence
//and repopulation
//Author: Kimi Halverson


//PRE: A new vmr was made and added to the database
//     lineNumber is the line number, sequenceNumber
//     is the identifier for the new vmr
//POST: We add a div to the sequence to show that it
//      is in the database and ready to be edited.
//      Copies the information of the previous vmr
//      to the new vmr to keep track. Disables the previous
//      VMR line number inputs and enabled the most recent
//      vmr.
function addToSequence(lineNumber, sequenceNumber){

    $("#tableRowVmr > td").removeClass().addClass('tableColNH');
    $("#tableRowVmr").append("<td id='vmr"+ sequenceNumber + "' class='tableColH sequenceVMR'><input type='text' value='"+lineNumber+"' class='vmrText'></input></td>");
    //ASSERT: set everything unhighlighted and add the new highlighted vmr

    $("div > p").removeClass().addClass('nonhighlighted');
    $("#line" + lineNumber).removeClass().addClass('highlighted');
    //ASSERT: set all lines unhighlighted and highlight the chosen line
    
    $("#tableRowVmr > td > input").each(function(){
	$(this).prop("disabled", true);
	//ASSERT: sets the vmr's input to be disabled
    });

    $("#tableRowVmr > td > input").last().prop("disabled", false);
    //ASSERT: set the recently made vmr's input to be enabled for edit


    var currentVMR = "vmr[sequenceNumber="+sequenceNumber+"]";
    var prevVMR = "vmr[sequenceNumber="+(sequenceNumber - 1)+"]";
    if(sequenceNumber > 0){
    	var currentFunctions = $(xmlDoc).find(prevVMR).find("funcNumber").text();

	$(xmlDoc).find(currentVMR).find("funcNumber").text(currentFunctions);
	//ASSERT: copy over the current number of variables
	
	$(xmlDoc).find(prevVMR).find("function").each(function(){
    	    $(xmlDoc).find(currentVMR).append($(this).clone());
	});
    }    
}

//PRE: A VMR was clicked on in the sequence that is not highlighted
//POST: Change the clicked element class to 'highlighted', then
//      populate the Trace Section with the corresponding VMR
//      information.
$("#tableRowVmr").on('click', '.tableColNH', function(){ 
    $("#traceSection").html('');
    
    $("#tableRowVmr > td").removeClass().addClass('tableColNH');
    $(this).removeClass().addClass('tableColH');
    //ASSERT: clear the trace section and change highlights
    
    $("div > p").removeClass().addClass('nonhighlighted');
    var lineNumber = $(this).find("input").val();
    $("#line" + lineNumber).removeClass().addClass('highlighted');
    //ASSERT: change highlights of the lines
    
    var sequenceNumber = $(".tableColH")[0].id.substring(3);
    //ASSERT: get the sequence number of the currently highlighted
    //        vmr.

    populateVMR(sequenceNumber);
});

//=====
//LINES
//=====

//PRE: on click event for each line of code 
//POST: the element toggles to the opposite
//      class; once its toggled, the rest
//      are affected.
$(document).on('click', 'p', function(){
    $("div > p").removeClass().addClass("nonhighlighted");
    $(this).removeClass().addClass("highlighted");
});

//=================
//POPULAION OF VMRs
//=================

//PRE: seqNum is an identifier of the selected VMR
//POST: Searches through the XML and populates the webpage
//      with the found information
function populateVMR(seqNum){
    $(xmlDoc).find("vmr[sequenceNumber="+seqNum+"] > function").each(function(){
	var funcNum = $(this).attr("num");

	var newFunc = $("<div/>")
	    .attr("id", "function"+funcNum)
	    .addClass("aFunction");

	$(newFunc).append("<h5>Function</h5>");

	$("#traceSection").prepend(newFunc);

	populateVariables(seqNum, funcNum);
	populateArrays(seqNum, funcNum);
	populatePointers(seqNum, funcNum);

	
    });
}

//=============================================
//POPULATING VARIABLES, ARRAYS, AND/OR POINTERS
//=============================================


//PRE: SequenceNumber is an identifier of the selected VMR
//     funcNum is an identifier of function the pointers
//     exist in
//POST: Searches through the XML and populates the webpage
//      with the found pointer information
function populatePointers(seqNum, funcNum){
    $(xmlDoc).find("vmr[sequenceNumber="+seqNum+"] > function[num="+funcNum+"] > pointers > pt").each(function(){
    	var ptNum = $(this).attr("num");
    	var pointer = $(this).text().split(" ");

	var newDiv = $("<div/>")
            .attr("id", "pointer" + ptNum)
            .addClass("thePointer");

	var someButtons = $("<div/>")
	    .addClass("someButtons pull-right")
	    .html("<button type='button' id='editButton"+ptNum+"' class='btn btn-default btn-xs editButton' disabled><i class='glyphicon glyphicon-edit' aria-hidden='true'></i></button> <button type='button' id='saveButton"+ptNum+"' class='btn btn-default btn-xs saveButton'><i class='glyphicon glyphicon-saved aria-hidden='true'></i></button> <button type='button' id='deleteButton"+ptNum+"' class='btn btn-default btn-xs deleteButton'><i class='glyphicon glyphicon-remove' aria-hidden='true'></i></button>");
		
	var inputName = $("<input type='text'/>")
	    .attr("name", "ptName"+ptNum)
	    .addClass("nameText inputClass")
	    .val(pointer[0]);
	
	var inputValue = $("<input type='text'/>")
            .attr("name", "ptValue"+ptNum)
            .addClass("valueText inputClass")
            .val(pointer[1]);
	
	newDiv.append(someButtons, inputName, inputValue);
	$("#function"+funcNum).append(newDiv);
    });

}


//PRE: SequenceNumber is an identifier of the selected VMR
//     funcNum is an identifier of function the variables
//     exist in
//POST: Searches through the XML and populates the webpage
//      with the found variable information
function populateVariables(seqNum, funcNum){
    $(xmlDoc).find("vmr[sequenceNumber="+seqNum+"] > function[num="+funcNum+"] > variables > var").each(function(){
    	var variableNum = $(this).attr("num");
    	var variable = $(this).text().split(" ");

	var newDiv = $("<div/>")
            .attr("id", "variable" + variableNum)
            .addClass("theVariable");

	var someButtons = $("<div/>")
	    .addClass("someButtons pull-right")
	    .html("<button type='button' id='editButton"+variableNum+"' class='btn btn-default btn-xs editButton' disabled><i class='glyphicon glyphicon-edit' aria-hidden='true'></i></button> <button type='button' id='saveButton"+variableNum+"' class='btn btn-default btn-xs saveButton'><i class='glyphicon glyphicon-saved aria-hidden='true'></i></button> <button type='button' id='deleteButton"+variableNum+"' class='btn btn-default btn-xs deleteButton'><i class='glyphicon glyphicon-remove' aria-hidden='true'></i></button>");
		
	var inputName = $("<input type='text'/>")
	    .attr("name", "varName"+variableNum)
	    .addClass("nameText inputClass")
	    .val(variable[0]);
	
	var inputValue = $("<input type='text'/>")
            .attr("name", "varValue"+variableNum)
            .addClass("valueText inputClass")
            .val(variable[1]);
	
	newDiv.append(someButtons, inputName, inputValue);
	$("#function"+funcNum).append(newDiv);
    });
    

}

//PRE: SequenceNumber is an identifier of the selected VMR
//POST: Searches through the XML and populates the webpage
//      with the found array information
function populateArrays(seqNum, funcNum){
    $(xmlDoc).find("vmr[sequenceNumber="+seqNum+"] > function[num="+funcNum+"] > arrays > arr").each(function(){
	var arrayNum = $(this).attr("num");
	var arrayLength = $(this).find("length").text();
	var arrayName = $(this).find("name").text();

	var newDiv = $("<div/>").attr("id", "array"+arrayNum).addClass("theArray");
	
	var someButtons = $("<div/>")
	    .addClass("someButtons pull-right")
	    .html("<button type='button' id='editButton"+arrayNum+"' class='btn btn-default btn-xs editButton' disabled><i class='glyphicon glyphicon-edit' aria-hidden='true'></i></button> <button type='button' id='saveButton"+arrayNum+"' class='btn btn-default btn-xs saveButton'><i class='glyphicon glyphicon-saved aria-hidden='true'></i></button> <button type='button' id='deleteButton"+arrayNum+"' class='btn btn-default btn-xs deleteButton'><i class='glyphicon glyphicon-remove' aria-hidden='true'></i></button>");
	
	var arrayButtons = $("<div/>")
	    .addClass("arrayButtons")
	    .html("<button type='button' id='addIndex"+arrayNum+"' class='btn btn-default btn-xs addButton'><i class='glyphicon glyphicon-plus' aria-hidden='true'></i></button>  <button type='button' id='removeIndex"+arrayNum+"' class='btn btn-default btn-xs removeButton'><i class='glyphicon glyphicon-minus' aria-hidden='true'></i></button>");
	
	var arrayVals = $("<div/>")
	    .html("<table id='arrayVals'><tr id='arrayRow'><td><input type='text' name='indexName"+arrayNum+"' class='nameText inputClass' placeholder='Name' value="+arrayName+"></td></tr></table>");

	newDiv.append(someButtons, arrayButtons, arrayVals);
	$("#function"+funcNum).append(newDiv);
    
	var currValue;
	for(var i = 0; i < arrayLength; i++){
	    currValue = $(this).find("index"+i).text();
	    $("#array" + arrayNum).find("#arrayRow").append("<td><input type='text' class='indexText inputClass' id='index"+i+"' name='index"+i+"' value="+currValue+"></td>");	    
	}
    });

    
}

//PRE: User clicked on the saveVMR button
//POST: Disables the last input, takes the value
//      and changes the information on the xml
$("#saveVMR").on('click', function(){
    $(this).attr("disabled", true);
    $("#editVMR").attr("disabled", false);

    var sequenceNumber = $("#tableRowVmr > td").last().attr('id');
    sequenceNumber = sequenceNumber.substring(3);
    //ASSERT: gets the sequence number of the currently
    //        selected vmr.
    
    $("#tableRowVmr > td > input").last().prop("disabled", true);
    //ASSERT: disable the input since we are saving

    var newValue = $("#tableRowVmr > td > input").last().val();
    $(xmlDoc).find("vmr[sequenceNumber="+sequenceNumber+"] > lineNumber").text(newValue);

    $("div > p").removeClass().addClass('nonhighlighted');
    $("#line" + newValue).removeClass().addClass('highlighted');
    //ASSERT: change highlights of the lines

    
});

//PRE: User clicked on the editVMR button
//POST: Allow the user to edit the last line number
//      on the vmr sequence while disabling edit button
//      and enabling save.
$("#editVMR").on('click', function(){
    $(this).attr("disabled", true);
    $("#saveVMR").attr("disabled", false);

    $("#tableRowVmr > td > input").last().prop("disabled", false);
    //ASSERT: set the recently made vmr's input to be enabled for edit
});
