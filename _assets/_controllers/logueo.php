<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
date_default_timezone_set("UTC");

session_start();
include("../_clases/logueo.php");

$login = new logueo();
$user = $login->request("user");
$pass =$login->request("pass");

/*
echo "<pre>";
var_dump($_SESSION);
echo"</pre>";
		
*/
if($user!="" && $pass!="" )
{
	$data = $login->logueo($user,$pass);
}
else{
			echo "<pre>";
			var_dump($_SESSION);
			echo"</pre>";
}

echo $data;
