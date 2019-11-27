<!doctype html>
<html lang="en">
<title>.:SISTEMA AUTOMATIZADO DE SERVICIO SOCIAL - SASS</title>

<!-- bootstrap 4 vue.js -->
<?php
include("header.php");
?>

<link href="_assets/_css/login.css?x=<?php echo(rand()); ?>" type="text/css" rel="stylesheet" />


<div class="sidenav">
         <div class="login-main-text text-login">
         <h2> Bienvenido a la nueva versión del sistema automatizado de servicio social "SASS". </h2>

            
            <p>Para ingresar por favor utiliza tu matrícula o email de la universidad, es decir;
                ingresa tal como lo haces para el Sistema de Servicios Escolares (SIGMAA).</p>
         </div>
         <div>

</div>
      </div>
      <div class="main">
         <div class="col-md-6 col-sm-12">
            <div class="login-form">
               <h3> SISTEMA AUTOMATIZADO DE SERVICIO SOCIAL SASS     </h3>
               <form>
                  <div class="form-group">
                      <input type="text" class="form-control" placeholder="User Name">
                  </div>
                  <div class="form-group">
                     <input type="password" class="form-control" placeholder="Password">
                  </div>
                   <button type="submit" class="btn btn-black">Login</button> 
                  
                  
               </form>
            </div>
         </div>
      </div>
</html>