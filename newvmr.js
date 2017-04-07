
//JQuery Code used for creating new VMRs
// This includes validating input, checking to see if the VMR was already
// created for the specific line number, etc.

//Author: Kimi Halverson

var xml_file;
var sequenceNumber = 0;


//PRE: The vmr create button is clocked
//POST: If TRACE is selected, create a new XML doc. If vmr,
//      check if XML doc exists and add to it
$("#vmrButton").on('click', function(){
    if($("#createTrace").prop("checked")){

	if(sequenceNumber != 0){
	    if(confirm('Are you sure you want to start a new trace?')){
		sequenceNumber = 0;
		//ASSERT: reset the number to 0

		$("#tableRowVmr").empty();
		//ASSERT: clear the sequence of vmrs
		
		newTrace($("#lineInput").val());

		//TODO: Clear the xml document so we can recreate it.
	    }
	}
	else{
	    newTrace($("#lineInput").val());
	}

    }
    else if($("#createVmr").prop("checked")){
	newVMR($("#lineInput").val(), false);
    }

    //ASSERT: The modal will disappear
    $("#vmrModal").css("display", "none");
    $("#newTraceContainer").css("display", "none");

    
});


//PRE: lineNumber is the number of the line we want a
//     VMR for. name is the name of the file
//POST: An XML file is created.
function newTrace(lineNumber){
    xml_file = "<?xml version='1.0' encoding='UTF-8'?><trace></trace>",
    xmlDoc = $.parseXML( xml_file ),
    $xml = $( xmlDoc );

    newVMR(lineNumber, true);
}

//PRE: lineNumber is the number of the line we want a
//     VMR for. firstVMR is a boolean
//PRE: A new element is added to the trace xml with the line number
//     being the input number. The sequence global variable is also
//     incremented.
//     The initial value of the number of variables is set to 0.
//     if firstVMR is true, then we do not have to verify.
//     if false, we call the verify function
function newVMR(lineNumber, firstVMR){
    var verified = true;
    if(typeof xmlDoc == 'undefined'){
	//ASSERT: An XML file does not yet exist
	alert("Create a new trace first!");
    }
    else{
	if(!firstVMR && $("#learningMode").prop('checked')){
	    verified = verification(sequenceNumber-1);
	    //ASSERT: call verification for the previously made
	    //        vmr
	}
	if(verified){
	    var newVMR = xmlDoc.createElement("vmr");
	    newVMR.setAttribute("sequenceNumber", sequenceNumber);

	    var newLine = xmlDoc.createElement("lineNumber");
	    newLine.appendChild(xmlDoc.createTextNode(lineNumber));

	    var funcNum = xmlDoc.createElement("funcNumber");
	    funcNum.appendChild(xmlDoc.createTextNode("0"));

	    newVMR.appendChild(newLine);
	    newVMR.appendChild(funcNum);
	    
	    xmlDoc.getElementsByTagName("trace")[0].appendChild(newVMR);
	    //ASSERT: appends currently empty tags variables and arrays
	    
	    addToSequence(lineNumber, sequenceNumber);

	    $("#saveVMR").attr("disabled", false);
	    
	    sequenceNumber = sequenceNumber + 1;
	    //ASSERT: increments the sequence number since we have created a vmr    
	}
    }
}


//PRE: XML button is clicked
//POST: for developer use. console logs the current xml document
//      being built
$("#xmlButton").on('click', function(){
    console.log(xmlDoc);
});

