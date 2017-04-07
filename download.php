
<?php

header('Content-type: application/pdf');
header('Content-Disposition: attachment; filename="downloaded.txt"');
echo $_POST['myinput'];

?>