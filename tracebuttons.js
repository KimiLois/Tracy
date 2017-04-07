
//============================
//BUTTONS FOR VARIABLES/ARRAYS
//============================

//PRE: A delete button was clicked
//POST: Find the identifiers for which variable/array, then remove
//      that information from the webpage and the xml
$("#traceSection").on('click', '.deleteButton', function(){
    
    var parentType = $(this).closest(".theVariable, .theArray, .thePointer").attr('id').replace(/\d+/, '');
    //ASSERT: gets the type of memory by finding the closest class
    
    var seqNum = $(".tableColH")[0].id.substring(3);
    //ASSERT: sequence number of currently selected VMR
    var typeNum = $(this).attr('id').substring(12);
    //ASSERT: declaration of the number of clicked type
    var functionNum = $(this).closest(".aFunction").attr('id').substring(8);;
    //ASSERT: identifier for the function this variable exists in
    
    if(parentType == "variable"){
    	deleteVariable(seqNum, typeNum, functionNum);
    	$("#variable"+typeNum).remove();
    }
    else if(parentType == "array"){
    	deleteArray(seqNum, typeNum, functionNum);
    	$("#array"+typeNum).remove();
    }
    else if(parentType == "pointer"){
	deletePointer(seqNum, typeNum, functionNum);
	$("#pointer"+typeNum).remove();
    }

});


//PRE: A save button was clicked
//POST: Find the identifies for which variable and which vmr, and then
//      take the data in the inputs and save to the XML. Then disable the
//      inputs and the save buttons while enabling the edit button
$("#traceSection").on('click', '.saveButton', function(){

    var parentType = $(this).closest(".theVariable, .theArray, .thePointer").attr('id').replace(/\d+/, '');
    //ASSERT: gets the type of memory by finding the closest class
    
    var sequenceNumber = $(".tableColH")[0].id.substring(3);
    //ASSERT: sequence number of currently selected VMR
    var typeNum = $(this).attr('id').substring(10);
    //ASSERT: declaration of the number of clicked type
    var funcNum = $(this).closest(".aFunction").attr('id').substring(8);
    //ASSERT: identifier for the function this variable exists in
    var funcID = "#function" + funcNum;

    
    if(parentType == "variable"){
	$(funcID + " > #variable"+typeNum).find("#editButton"+typeNum).prop("disabled", false);
	$(funcID + " > #variable"+typeNum).find("#saveButton"+typeNum).prop("disabled", true);
	$(funcID + " > #variable"+typeNum).find("input[name=varName"+typeNum+"]").prop("disabled", true);
	$(funcID + " > #variable"+typeNum).find("input[name=varValue"+typeNum+"]").prop("disabled", true);
	changeVariable(sequenceNumber, typeNum, funcNum, funcID);
    }
    else if(parentType == "array"){
	$(funcID + " > #array"+typeNum).find("#editButton"+typeNum).prop("disabled", false);
	$(funcID + " > #array"+typeNum).find("#saveButton"+typeNum).prop("disabled", true);
	$(funcID).find("#array"+typeNum).find("#arrayRow :input").attr("disabled", true);	
	changeArray(sequenceNumber, typeNum, funcNum, funcID);
    }
    else if(parentType == "pointer"){
	$(funcID + " > #pointer"+typeNum).find("#editButton"+typeNum).prop("disabled", false);
	$(funcID + " > #pointer"+typeNum).find("#saveButton"+typeNum).prop("disabled", true);
	$(funcID).find("#pointer"+typeNum).find("#arrayRow :input").attr("disabled", true);	
	changePointer(sequenceNumber, typeNum, funcNum, funcID);
    }
});


//PRE: An edit button was clicked
//POST: Makes the variable name/value inputs enabled so the user can
//      change information. Save button is enabled.  
$("#traceSection").on('click', '.editButton', function(){

    var parentType = $(this).closest(".theVariable, .theArray").attr('id').replace(/\d+/, '');
    //ASSERT: gets type of parent by checking the closest class

    var sequenceNumber = $(".tableColH")[0].id.substring(3);
    //ASSERT: sequence number of currently selected VMR
    var typeNum = $(this).attr('id').substring(10);
    //ASSERT: declaration of the number of clicked type
    var funcNum = $(this).closest(".aFunction").attr('id').substring(8);;
    //ASSERT: identifier for the function this memory exists in
    var funcID = "#function" + funcNum;
    

    if(parentType == "variable"){
	$(funcID + " > #variable"+typeNum).find("#editButton"+typeNum).prop("disabled", true);
	$(funcID + " > #variable"+typeNum).find("#saveButton"+typeNum).prop("disabled", false);
	
	$(funcID + " > #variable"+typeNum).find("input[name=varName"+typeNum+"]").prop("disabled", false);
	$(funcID + " > #variable"+typeNum).find("input[name=varValue"+typeNum+"]").prop("disabled", false);
    }
    else if(parentType == "array"){
	$(funcID + " > #array"+typeNum).find("#editButton"+typeNum).prop("disabled", true);
	$(funcID + " > #array"+typeNum).find("#saveButton"+typeNum).prop("disabled", false);
	$(funcID).find("#array"+typeNum).find("#arrayRow :input").attr("disabled", false);
    }   
});


//========================
//SAVING/DELETING POINTERS
//========================

//PRE: seqNum is the identifier for the VMR, ptNum
//     is the identifier for the pointer of that VMR. 
//POST: get the names from the inputs and save those locations into the XML
function changePointer(seqNum, ptNum, funcNum, funcID){
    var ptName = $(funcID).find("input[name=ptName"+ptNum+"]").val();
    var ptLoc = $(funcID).find("input[name=ptValue"+ptNum+"]").val();
    
    $(xmlDoc).find("vmr[sequenceNumber='"+seqNum+"'] > function[num="+funcNum+"] > pointers > pt[num='"+ptNum+"']").text(ptName + " " + ptLoc);
}

//PRE: seqNum is the identifier for the VMR, ptNum
//     is the identifier for the pointer of that VMR.
//POST: find the pt element in the xml and remove it
function deletePointer(seqNum, ptNum, funcNum){
    $(xmlDoc).find("vmr[sequenceNumber='"+seqNum+"'] > function[num="+funcNum+"] > pointers > pt[num='"+ptNum+"']").remove();

    var ptCount = $(xmlDoc).find("vmr[sequenceNumber='"+seqNum+"'] > function[num="+funcNum+"] > ptNum").text();
    ptCount = parseInt(ptCount) - 1;
    $(xmlDoc).find("vmr[sequenceNumber='"+seqNum+"'] > function[num="+funcNum+"] > ptNum").text(ptCount);
}


//============================
//SAVING/DELETING VARIABLES
//===========================

//PRE: seqNum is the identifier for the VMR, varNumb
//     is the identifier for the variable of that VMR. 
//POST: get the names from the inputs and save those values into the XML
function changeVariable(seqNum, varNum, funcNum, funcID){
    var variableName = $(funcID).find("input[name=varName"+varNum+"]").val();
    var variableValue = $(funcID).find("input[name=varValue"+varNum+"]").val();
    
    $(xmlDoc).find("vmr[sequenceNumber='"+seqNum+"'] > function[num="+funcNum+"] > variables > var[num='"+varNum+"']").text(variableName + " " + variableValue);
}


//PRE: seqNum is the identifier for the VMR, variableNumber
//     is the identifier for the variable of that VMR.
//POST: find the var element in the xml and remove it
function deleteVariable(seqNum, varNum, funcNum){
    $(xmlDoc).find("vmr[sequenceNumber='"+seqNum+"'] > function[num="+funcNum+"] > variables > var[num='"+varNum+"']").remove();

    var variableCount = $(xmlDoc).find("vmr[sequenceNumber='"+seqNum+"'] > function[num="+funcNum+"] > varNum").text();
    variableCount = parseInt(variableCount) - 1;
    $(xmlDoc).find("vmr[sequenceNumber='"+seqNum+"'] > function[num="+funcNum+"] > varNum").text(variableCount);
}


//======================
//SAVING/DELETING ARRAYS
//======================

//PRE: seqNum is the identifier for the VMR, arrNum
//     is the identifier for the array of that vmr.
//     funcNum is the identifier for the function the
//     array exists in.
//POST: get the names from the inputs and indices and saves them to
//      the database
function changeArray(seqNum, arrNum, funcNum, funcID){
    var arrayName = $("#function"+funcNum).find("#array"+arrNum+" :input[name='indexName"+arrNum+"']").val();
    var arrayLength = $(xmlDoc).find("vmr[sequenceNumber="+seqNum+"] > function[num="+funcNum+"] > arrays > arr[num="+arrNum+"] > length").text();

    $(xmlDoc).find("vmr[sequenceNumber="+seqNum+"] > function[num="+funcNum+"] > arrays > arr[num="+arrNum+"] > name").text(arrayName);

    var curr;
    for(var i = 0; i < arrayLength; i++){
	curr = $(funcID).find("#array"+arrNum+" :input[name='index"+i+"']").val();
	$(xmlDoc).find("vmr[sequenceNumber='"+seqNum+"'] > function[num="+funcNum+"] > arrays > arr[num="+arrNum+"] > index"+i).text(curr); 
    }
    
}


//PRE: seqNum is the identifier for the VMR, arrNum
//     is the identifier for the array of that VMR.
//     funcNum is the identifier for the function
//     the array exists in.
//POST: find the arr element in the xml and remove it
function deleteArray(seqNum, arrNum, funcNum){
    $(xmlDoc).find("vmr[sequenceNumber='"+seqNum+"'] > function[num="+funcNum+"] > arrays > arr[num = '"+arrNum+"']").remove();

    var arrayCount = $(xmlDoc).find("vmr[sequenceNumber='"+seqNum+"'] > function[num="+funcNum+"] > arrNum").text();
    arrayCount = parseInt(arrayCount) - 1;
    $(xmlDoc).find("vmr[sequenceNumber='"+seqNum+"'] > function[num="+funcNum+"] > arrNum").text(arrayCount);
}


//==================================
//ADDING REMOVING INDICES FROM ARRAY
//==================================


//PRE: addButton on an array was clicked
//POST: Gets the appropriate identifiers and adds an index to the
//      array
$("#traceSection").on('click', '.addButton', function(){

    var typeNumber = $(this).attr('id').substring(8);
    //ASSERT: declaration of the number of clicked type
    var sequenceNumber = $(".tableColH")[0].id.substring(3);
    //ASSERT: sequence number of currently selected VMR

    var funcNum = $(this).closest(".aFunction").attr('id').substring(8);;
    //ASSERT: identifier for the function this memory exists in

    var arrayLength = $(xmlDoc).find("vmr[sequenceNumber="+sequenceNumber+"] > function[num="+funcNum+"] > arrays > arr[num="+typeNumber+"] > length").text();
    //ASSERT: current length of the array

    var newIndex = $("<index"+arrayLength+"/>");
    $(xmlDoc).find("vmr[sequenceNumber="+sequenceNumber+"] > function[num="+funcNum+"] > arrays > arr[num="+typeNumber+"]").append(newIndex);
    //ASSERT: add new index to the database
    
    $("#function"+funcNum).find("#array" + typeNumber).find("#arrayRow").append("<td><input type='text' class='indexText inputClass' id='index"+arrayLength+"' name='index"+arrayLength+"' placeholder='-'/></td>");
    arrayLength = parseInt(arrayLength) + 1;
    
    $(xmlDoc).find("vmr[sequenceNumber="+sequenceNumber+"] > function[num="+funcNum+"] > arrays > arr[num="+typeNumber+"] > length").text(arrayLength);
    //ASSERT: increment the array length and edit the database

    if($("#function"+funcNum).find("#saveButton"+typeNumber).prop("disabled") == true){
	$("#function"+funcNum).find("#array"+typeNumber).find("#arrayRow :input").attr("disabled", true);
    	
    }
    
});

//PRE: removeButton on an array was clicked
//POST: Gets the appropriate identifiers and removes an index from
//      the array.
$("#traceSection").on('click', '.removeButton', function(){
    var typeNum = $(this).attr('id').substring(11);
    //ASSERT: declaration of the number of clicked type
    var seqNum = $(".tableColH")[0].id.substring(3);
    //ASSERT: sequence number of currently selected VMR

    var funcNum = $(this).closest(".aFunction").attr('id').substring(8);;
    //ASSERT: identifier for the function this memory exists in
        
    var arrayLength = $(xmlDoc).find("vmr[sequenceNumber="+seqNum+"] > function[num="+funcNum+"] > arrays > arr[num="+typeNum+"] > length").text();
    //ASSERT: current length of the array
    arrayLength = parseInt(arrayLength) - 1;
    $("#array"+typeNum).find("#index"+arrayLength).remove();
    
    $(xmlDoc).find("vmr[sequenceNumber="+seqNum+"] > function[num="+funcNum+"] > arrays > arr[num="+typeNum+"] > length").text(arrayLength);
    //ASSERT: decrement the array length and edit the database    

    $(xmlDoc).find("vmr[sequenceNumber='"+seqNum+"'] > function[num="+funcNum+"] > arrays > arr[num="+typeNum+"] > index"+arrayLength).remove();
    //ASSERT: remove the index from the database
});
