


//Javascript/JQuery for the Modal Window for VMR
//Author: Kimi Halverson

//PRE: The VMR button is pressed
//POST: The modal window appears 
$("#buttonVMR").click(function(){
    $("#vmrModal").css("display", "block");
});

//PRE: The new trace button was pressed
//POST: The modal window appears with the extra content added 
$("#traceButton").click(function(){
    $("#vmrModal").css("display", "block");
    $("#newTraceContainer").css("display", "block");
});

//PRE: We click anywhere else except the modal
//POST: The modal will close
window.onclick = function(event){
    var modal = document.getElementById("vmrModal");
    if(event.target == modal){
	$("#vmrModal").css("display", "none");
	$("#newTraceContainer").css("display", "none");
    }
}

//PRE: The modal window has been opened
//POST: The button is disabled if the user didn't place
//      any text in the input.
$("#lineInput").on("keyup", action);
function action(){
    if($("#lineInput").val().length > 0){
	$("#vmrButton").prop("disabled", false);
    }
    else{
	$("#vmrButton").prop("disabled", true);
    }
}
