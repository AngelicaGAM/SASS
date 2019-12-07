
<?php
include("header.php");
?>

<script language="javascript" type="text/javascript">
/* Visit http://www.yaldex.com/ for full source code
and get more free JavaScript, CSS and DHTML scripts! */

function getTime() {
now = new Date();
y2k = new Date("Jan 1 2055 14:00:00");
days = (y2k - now) / 1000 / 60 / 60 / 24;
daysRound = Math.floor(days);
hours = (y2k - now) / 1000 / 60 / 60 - (24 * daysRound);
hoursRound = Math.floor(hours);
minutes = (y2k - now) / 1000 /60 - (24 * 60 * daysRound) - (60 * hoursRound);
minutesRound = Math.floor(minutes);
seconds = (y2k - now) / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
secondsRound = Math.round(seconds);
sec = (secondsRound == 1) ? " second." : " .";
min = (minutesRound == 1) ? " minute" : " : ";
hr = (hoursRound == 1) ? " hour" : " hours, ";
dy = (daysRound == 1)  ? " day" : " days, "
document.timeForm.input1.value = "Tiempo restante de sesión: " + min + secondsRound + sec;
newtime = window.setTimeout("getTime();", 1000);
}
window.onload=getTime;
//  End -->
</script>
<header class="">
    <div class="container-fluid menu-all">
        <div class="row justify-content-md-center menu-color">
            <div class="menu-top col-xl-11 col-lg-11 col-md-12 d-none d-sm-block d-xs-block menu-top">
                <nav class="menu-top-bottom navbar navbar-light bg-secondary navbar-expand justify-content-end">
                    <ul class="navbar-nav upnav" id="menuup">
                   
                
                        <li class="nav-item">
                            <a class="nav-link textmenuWelcome"   id='CuentaAtras' href="proyecto.php">
                            </a>
                        </li>
                
                        <li class="nav-item call-orange">
                            
                            <a class="call-now nav-link textmenu" href="proyecto.php">
                            <i href="proyecto.php" class="inside icon-passage-of-time"></i>
                            </a>
                        </li>
                        <li class="nav-item call-orange">
                            
                            <a class="call-now nav-link textmenu" href="perfil.php">
                            <i href="perfil.php" class="inside icon-ic_account_circle_black_24px"></i>
                            </a>
                        </li>
                
                        <li class="nav-item call-orange">
                            
                            <a class="call-now nav-link textmenu" href="login.php">
                            <i class="fa fa-sign-out" aria-hidden="true"></i>
                            </a>
                        </li>
                

                    </ul>
                </nav>
            </div>

            <div class="col-xl-2  col-lg-2  col-sm-12 col-12">
                <nav class="navbar navbar-light bg-secondary navbar-expand justify-content-end navLogo">
                    <a class="navbar-brand  img-responsive img-top-logo hidden-xs" href="login.php">
                        <img src="http://localhost:8089/_assets/images/logo.png" class="img-fluid">
                    </a>
                </nav>
                
            </div>
            <i class="fa fa-sign-out" aria-hidden="true"></i>

            <div class="menu-bottom col-xl-9  col-lg-9  col-sm-12 col-12">
                <nav class="menuMobile navbar  navbar-expand-md navbar-dark bg-secondary">
                    <div class="contentHeaderMobile">
                       
                        <div id="img-car-andham">
                            <button class="sin-borde navbar-toggler" id="car-mobile" type="button" href="#!"><img src="/_assets\_images\img-mobile/ico-carrito.png"></button>
                            <button class="sin-borde navbar-toggler" id="ico-mobile" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                                <div class="burger-menu">
                                    <div class="burger"></div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div class="collapse navbar-collapse justify-content-lg-end justify-content-md-center" id="navbarToggler">
                        <div class="barra-movile-icon navbar-toggler" id="navbarToggler">
                            <div class="mobile-menu-sub">
                                <div class="img-mobile-submenu" id="ico-logout-be">
                                    <a class="nav-link"><img src="/_assets\_images\img-mobile/ico-logout.png"> </a>
                                </div>
                            </div>
                        </div>
             
                        <ul class="navbar-nav justify-content-end navigation-txt d-lg-flex s-md-flex" id="byebye">
                          
                            <li class="nav-item dropdown ">
                                <a class="text-submenu nav-link" href="oferta.php"> Oferta de Proyectos</a>
                                <div class="menu-icon dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a class="text-submenu dropdown-item" href="oferta.php">Inscribirse a un Proyecto</a>
                                </div>  
                              </li>

                              
                            <li class="nav-item dropdown">
                                <a class="text-submenu nav-link dropdown-toggle" href="proyecto.php" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Documentos 
                                </a>
                                <div class="menu-icon dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item text-submenu" href="https://uclb.ucaribe.edu.mx/sass/docs/Informe_Final.doc">Formato de Informe Final</a>
                                </div>
                                <div class="menu-icon dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item text-submenu"   target="_blank"href="https://uclb.ucaribe.edu.mx/sass/docs/lineamientos.doc">Formato de Informe Final</a>
                                </div>
                            </li> 
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </div>

</header>
<link href="_assets/_css/inicio.css?x=22577" type="text/css" rel="stylesheet">

<script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
<script src="_assets\_js\vue\vuejs.js"></script>



        
            </body></html>