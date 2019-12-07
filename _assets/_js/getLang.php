<?php
include("../_clases/hotelesWS.php");
$var 	= new hotelesWS();
$banner = new hotelesWS();
$var->idiomaModulo 		= $var->getlang("vuelos"); 
$banner->idiomaModulo 	= $var->getlang("template"); 
?>

var x = <?=json_encode($var->idiomaModulo) ?>;