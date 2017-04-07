//Javascript/Jquery for verification/learning mode
//Author: Kimi Halverson


//PRE: The user has requested to create a new VMR.
//     sequenceNumber is the number of the vmr
//     we are verifying
//POST: Compare the recently made VMR xml with the
//      xml key created in Key Mode.
//      First we check if the chosen line number is correct
//      Then the number of functions existing in the vmr
// 
function verification(seqNum){
    console.log(xmlKey);
    var verified = true;
    //ASSERT: whether the vmr is verified
    //        we are currently verified until we find any
    //        errors
    
    //FIRST STEP: check line Number
    var vmr = $(".tableColH")[0];
    var currentLineNumber = $(vmr).find("input").val();
    var keyLineNumber = $(xmlKey).find("vmr[sequenceNumber="+seqNum+"] > lineNumber").text();
    
    //SECOND STEP: check number of functions in the vmr
    var currFuncNum = $(xmlDoc).find("vmr[sequenceNumber="+seqNum+"] > funcNumber").text();
    var functionKeyNum = $(xmlKey).find("vmr[sequenceNumber="+seqNum+"] > funcNumber").text();


    if(currFuncNum != functionKeyNum){
	alert("ERROR: Incorrect number of functions.");
	verified = false;
    }
    else if(currentLineNumber != keyLineNumber){
	alert("ERROR: Incorrect line number.");
	verified = false;
    }
    else{
	//THIRD STEP: go into each function existing in the vmr
	//            and check it's contents.
	verified = verifyFunction(seqNum, verified);
    }
    return(verified);
}

//PRE: seqNumber is the identifier for the vmr
//POST: Iterates through each function existing
//      in that VMR and validates
function verifyFunction(seqNum, verified){
    console.log("seqNum: " + seqNum);
    $(xmlDoc).find("vmr[sequenceNumber="+seqNum+"] > function").each(function(){
	var funcNum = $(this).attr("num");
	var varNum = $(this).find("varNum").text();
	var arrNum = $(this).find("arrNum").text();
	var ptNum = $(this).find("ptNum").text();

	var currentKeyFunction = $(xmlKey).find("vmr[sequenceNumber="+seqNum+"] > function[num="+funcNum+"]");

	if(varNum == $(currentKeyFunction).find("varNum").text()){
	    verified = verifyVariables(seqNum, funcNum, verified);
	}
	else{
	    alert("ERROR: Incorrect number of variables.");
	    verified = false;
	}
	
	if(arrNum == $(currentKeyFunction).find("arrNum").text()){
	    verified = verifyArrays(seqNum, funcNum, verified);
	}
	else{
	    alert("ERROR: Incorrect number of arrays.");
	    verified = false;
	}
	
	if(ptNum == $(currentKeyFunction).find("ptNum").text()){
	    verified = verifyPointers(seqNum, funcNum, verified);
	}
	else{
	    alert("ERROR: Incorrect number of pointers.");
	    verified = false;
	}
	
    });

    return(verified);
}


//PRE: SequenceNumber is the identifier for the vmr
//     funcNum is the identifier for the function
//     these pointers exist in.
//POST: Goes through each pointer existing in the identified
//      functions and compares names and
//      values. Set verified to false if there is a mismatch.
function verifyPointers(seqNum, funcNum, verified){
    var answerPointers = [];
    $(xmlKey).find("vmr[sequenceNumber="+seqNum+"] > function[num="+funcNum+"] > pointers > pt").each(function(){
	answerPointers.push($(this).text());
    });
    //ASSERT: all names/values of the answer key pointers are placed into an array

    var name;
    var value;
    $(xmlDoc).find("vmr[sequenceNumber="+seqNum+"] > function[num="+funcNum+"] > pointers > pt").each(function(){
	if($.inArray($(this).text(), answerPointers) == -1){
	    //ASSERT: a variable in this specific function is incorrect
	    alert("ERROR: Invalid pointer information in function #"+funcNum);
	    verified = false;
	}
	else{
	    verified = true;
	}
	
    });
    return(verified);
}





//PRE: SequenceNumber is the identifier for the vmr
//     funcNum is the identifier for the function
//     these variables exist in.
//POST: Goes through each variable existing in the identified
//      functions and compares names and
//      values. Set verified to false if there is a mismatch.
function verifyVariables(seqNum, funcNum, verified){
    var answerVariables = [];
    $(xmlKey).find("vmr[sequenceNumber="+seqNum+"] > function[num="+funcNum+"] > variables > var").each(function(){
	answerVariables.push($(this).text());
    });
    //ASSERT: all names/values of the answer key variables are placed into an array

    var name;
    var value;
    $(xmlDoc).find("vmr[sequenceNumber="+seqNum+"] > function[num="+funcNum+"] > variables > var").each(function(){
	if($.inArray($(this).text(), answerVariables) == -1){
	    //ASSERT: a variable in this specific function is incorrect
	    alert("ERROR: Invalid variable information in function #"+funcNum);
	    verified = false;
	}
	else{
	    verified = true;
	}
	
    });
    return(verified);
}

//PRE: SequenceNumber is the identifier for the vmr
//POST: Goes through the arrays and their items and compares
//      names and values. Set verified to false if there is a
//      mismatch.

function verifyArrays(seqNum, funcNum, verified){
    console.log("inside verify arrays");
    var arrayNum;
    $(xmlDoc).find("vmr[sequenceNumber="+seqNum+"] > function").each(function(){
	currentFunc = $(this).attr("num");
	arrayNum = $(this).find("arrNum").text();

	if(arrayNum != $(xmlKey).find("vmr[sequenceNumber="+seqNum+"] > function[num="+currentFunc+"] > arrNum").text()){
	    alert("ERROR: Incorrect number of arrays in function"+currentFunc);
	    verified = false;
	}
	else{
	    for(var i = 0; i < arrayNum; i++){
		verified = eachArray(verified, i, seqNum, funcNum);		
	    }
	}
    });
    return(verified);
}



//PRE: Verified is a boolean, i is the current array we're looking at
//     FuncNum is the function the array exists in
//     SeqNum is the vmr the function exists in
function eachArray(verified, arrayNum, seqNum, funcNum){
    console.log("inside each array");

    var currentArray = $(xmlDoc).find("vmr[sequenceNumber="+seqNum+"] > function[num="+funcNum+"] > arrays > arr[num="+arrayNum+"]");
    var keyArray = $(xmlKey).find("vmr[sequenceNumber="+seqNum+"] > function[num="+funcNum+"] > arrays > arr[num="+arrayNum+"]");

    var currentLength = $(currentArray).find("length").text();
    var currentName = $(currentArray).find("name").text();

    var currIndex;
    var keyIndex;
    
    if(currentLength != $(keyArray).find("length").text()){
	alert("ERROR: Invalid length of array.");
	verified = false;
    }
    else if(currentName != $(keyArray).find("name").text()){
	alert("ERROR: Invalid name in array.");
	verified = false;
    }
    else{
	for(var i = 0; i < currentLength; i++){
	    currIndex = $(currentArray).find("index"+i).text();
	    keyIndex = $(keyArray).find("index"+i).text();

	    if(currIndex != keyIndex){
		alert("ERROR: Invalid values in array.");
		verified = false;
		i = currentLength;
		//ASSERT: we found a mismatched value, so
		//        set verified to false and end the loop
	    }
	}

    }
    return(verified);
}

