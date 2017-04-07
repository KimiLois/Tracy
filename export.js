
//PRE: The export submit button was pressed
//POST: The current global xml document is serialized to a string
//      and sent over to the server to prompt a download.
function DoSubmit(){

    var xmlString = (new XMLSerializer()).serializeToString(xmlDoc);

    var url='xmlns="http://www.w3.org/1999/xhtml"';
    xmlString = xmlString.replace(/xmlns="http:\/\/www.w3.org\/1999\/xhtml"/g, '');
    //ASSERT: removes the schema added from the XMLSerializer

    document.getElementById("myinput").value = xmlString;
    return true;
}

