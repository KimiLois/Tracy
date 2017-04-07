


//PRE: The user right clicked on a function
//POST: Reveals the context menu
$("#traceSection").on('contextmenu', '.aFunction', function (e) {

    functionID = $(this).attr("id");

    e.preventDefault();
    //ASSERT: cancels out the default context menu
    
    var leftPos = e.pageX;
    var topPos = e.pageY;
    var menuW = $("#menu").width();
    //ASSERT: the widths of left/top positions and of the menu is defined

    var bodyW = $("#theBody").width();
    
    if((bodyW - leftPos) < menuW){
	//ASSERT: the context menu has potential to be cut off
	//        the screen
	$("#menu").css("left", e.pageX - 60);
    }
    else{
	$("#menu").css("left", e.pageX);
    }
  
    $("#menu").css("top", e.pageY);    
    $("#menu").show(1, startFocusOut());
});

//PRE: The context or delete menu appeared on the screen 
//POST: When the user clicks on any part of the page,
//      both menus disappear.
function startFocusOut() {
    $(document).on("click", function () {
	$("#menu").hide();
	$(document).off("click");
    });
}
