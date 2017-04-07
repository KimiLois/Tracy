//Javascript to handle Files
//Kimi Halverson


//PRE: The user has uploaded a file
//POST: The file gets opened using FileReader to
//      get the information from it
function openFile(e) {
    var file = e.target.files[0];
    if (!file) {
	return;
    }
    //ASSERT: grab the file and check if it's null
    
    var reader = new FileReader();
    reader.onload = function(e) {
    	var info = e.target.result;
	//ASSERT: grab the information, store it 
    	setCode(info);
    };
    reader.readAsText(file);

}

//PRE: The user uploaded the xml key
//POST: File gets open and read, the string
//      is parsed into an XML dom
function setKey(f){
    var file = f.target.files[0];
    if(!file){
	return;
    }
    //ASSERT: grab file and check if null

    var reader = new FileReader();
    reader.onload = function(f){
	var key = f.target.result;
	xmlKey = $.parseXML(key);
	//ASSERT: parse the key and turn into an xml
	//        doc
    };
    reader.readAsText(file);

    $("#importXML").attr('disabled', true);
    if($("#importButton").attr('disabled')){
	$("#buttonVMR").attr('disabled', false);
	$("#functionButton").attr('disabled', false);
	$("#deleteFunction").attr('disabled', false);
    }
}


//PRE: Info is the string pulled from the input file
//POST: Takes the text and placed onto an html file
//      Then enables the needed buttons to continue
function setCode(info) {
    var lines = info.split('\n');
    var section = document.getElementById('codeSection');
    var lineNumber = 0; 
    for(var i = 0; i < lines.length; i++){ 
	section.innerHTML += '<p id=line'+lineNumber+' class="nonhighlighted">' + i + ". " + lines[i] + '</p>';
	lineNumber++;
    }

    if($("#keyMode").prop('checked') == true){
	$("#buttonVMR").attr('disabled', false);
	$("#importButton").attr('disabled', true);
	$("#functionButton").attr('disabled', false);
	$("#deleteFunction").attr('disabled', false);
    }
    else if($("#learningMode").prop('checked') == true){
	$("#importButton").attr('disabled', true);
	if($("#importXML").attr('disabled')){
	    $("#buttonVMR").attr('disabled', false);
	    $("#functionButton").attr('disabled', false);
	    $("#deleteFunction").attr('disabled', true);
	}
    }
}


//PRE: User clicked on the "import code" button
//POST: Trigger the action of clicking the input file
//    button
$("#importButton").click(function (){
    $("#inputFile").trigger('click');
});

document.getElementById('inputFile').addEventListener('change', openFile, false);
//ASSERT: Call the openFile function when the user uploads a file

//PRE: The import key button was clicked
//POST: Trigger the action of clicking the input file
//      button
$("#importXML").on('click', function (){
    $("#inputKey").trigger('click');
});

document.getElementById('inputKey').addEventListener('change', setKey, false)
//ASSERT: Call the setKey function when the user uploads a file

//PRE: One of the radio buttons was selected
//POST: If "KEY MODE" selected, enable the export button and disable the rest
//      If "LEARNING MODE" selected, disable export button and enable
//      the rest
$("#radioButtons input:radio").click(function(){
    if($(this).val() == '1'){
	$("#exportButton").attr('disabled', true);
	$("#importButton").attr('disabled', false);
	$("#importXML").attr('disabled', false);
    }
    else if($(this).val() == '0'){

	$("#exportButton").attr('disabled', false);
	$("#importButton").attr('disabled', false);
	$("#importXML").attr('disabled', true);	
    }
    
});


//PRE: The import button was clicked
//POST: Trigger the action of clicking the input file
//      button
$("#importKey").click(function (){
    $("#inputFile").trigger('click');
});


