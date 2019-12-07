<!doctype html>
<html lang="en">
<title>.:SISTEMA AUTOMATIZADO DE SERVICIO SOCIAL - SASS</title>




<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script> 
<link type="text/css" rel="stylesheet" href="_assets/_css/iconos/style.css?x=<?php echo(rand()); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">


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
                  <div class="form-group">
                      <input type="text" id="user" class="form-control" placeholder="User Name">
                  </div>
                  <div class="form-group">
                     <input type="password" id="pass" class="form-control" placeholder="Password">
                  </div>
                   <button type="submit" id="access"  onclick="login()" class="btn btn-black">Login</button>   
               </form>
               </div>
                  <div id="datoscorrectos" class="alert alert-danger"  role="alert">¡Usuario o Contraseña incorrecta! </div>
                  <div id="datosincorrectos"  class="alert alert-success"  role="alert">¡Bienvenido!</div>

            <form>
         </div>
      </div>
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js"></script>
  <!-- Add Firebase products that you want to use -->
  <script src="https://www.gstatic.com/firebasejs/6.2.0/firebase-auth.js"></script>
  <script src="https://www.gstatic.com/firebasejs/6.2.0/firebase-firestore.js"></script>

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyA6ydB84_pYXrP_fwmHJCuSU-y6rD76ddI",
    authDomain: "sass-ce034.firebaseapp.com",
    databaseURL: "https://sass-ce034.firebaseio.com",
    projectId: "sass-ce034",
    storageBucket: "sass-ce034.appspot.com",
    messagingSenderId: "818907911992",
    appId: "1:818907911992:web:5bac77131e0423bcb853cd",
    measurementId: "G-GCCYXKX9P4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
</script>
<script>
   
   firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
       
         // User is signed in.
       } 
      });

      function login(){
         var user = $("#user").val();
         var  pass = $("#pass").val();
if (user == '160300749@ucaribe.edu.mx' && pass == 'Unicaribe123'){
   window.location="oferta.php";
}else{
  
                        $("#datoscorrectos").css("display","block");
                        $("#datoscorrectos").css("display","block");
                    
}
      firebase.auth().signInWithEmailAndPassword(user, pass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      var ban = errorMessage;
      if ((ban == null) || (ban == '') ) {
         alert('hola');
         
         // User is signed in.
       } else{
         alert('no');
         var ban = 9;
       }
       if (ban==9){
        
       }
      alert(errorMessage);
      });



      }
   
</script>

</html>