<?php
include("header.php");
?>
<link type="text/css" rel="stylesheet" href="http://localhost:8089/_assets/_css/nav.css?x=<?php echo (rand()); ?>">

<link type="text/css" rel="stylesheet" href="http://localhost:8089/_assets/_css/nav2.css?x=<?php echo (rand()); ?>">

<link type="text/css" rel="stylesheet" href="http://localhost:8089/_assets/_css/nav2.css?x=<?php echo (rand()); ?>">

<header class="">
    <div class="menu-top bg-beyond">
     
            <ul>

                <li>
                    <div class="select-menu-top">
                     
                        <select name="slct" id="divisa">
                            <option value="USD" selected="selected">Select DIVISA</option>
                            <option value="USD" id="inline" href="#data" >USD - USD Dollar</option>
                            <option value="MXN" id="inline" href="#data" >MXN - Mexican Peso</option>
                            <option value="CAD" id="inline" href="#data" >CAD - Canadian Dollar</option>
                            <option value="EUR" id="inline" href="#data" >EUR - Euro</option>
                            <option value="BRL" id="inline" href="#data" >BRL - Brazilian Real</option>
                        </select>
                    </div>
                </li>

                <li class="d-none d-lg-block">
                    <a class=" acomodoDe" id="carrito" href="http://localhost:8089reservacion/resumenCarritoRes.php">
                        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                        <span class="cantidadcarro2">
                    0
                        </span>
                    </a>
                </li>

                <li class="nav-item imgmenu menuMini">
                    <a class="">
                        <i class="fa fa-circle" aria-hidden="true"></i>
                        <i class="fa fa-circle" aria-hidden="true"></i>
                        <i class="fa fa-circle" aria-hidden="true"></i>
                    </a>
                </li>
                <li class="nav-item imgmenu">
                    <a class=" fancyB fancybox.iframe" href="logueo.html" title="<?php echo $banner->idiomaModulo["log"]; ?>">
                        <i class="fa fa-power-off" aria-hidden="true"></i>
                    </a>
                </li>
                <li>
                    <a href="https://www.beyond-experience.com/PanelAdministradorVendedor/" target="_blank" class="casitaLogo">
                        <i class="fa fa-cog" aria-hidden="true"></i>
                    </a>
                </li>
            </ul>
    </div>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-sm-start bg-beyond">
        <a class="navbar-brand order-1 order-lg-0 ml-lg-0 ml-2 m-auto" href="http://localhost:8089homeRes.php">
            <img src="http://localhost:8089/_assets/_images/template/logo_beyond.png" class="img-fluid logoBeyond">
            <img src="http://localhost:8089/_assets/_images/template/logoBeyondMobile.png" class="img-fluid logoBeyondMobile">
        </a>
        <button class="navbar-toggler align-self-start" type="button">
            <!-- <span class="navbar-toggler-icon"></span> -->
            <div class="burger-menu">
                <div class="burger"></div>
            </div>
        </button>
        <div class="d-block  d-sm-block d-md-block d-lg-none" id="custom_fc_button" style="visibility:hidden;">
            <a id="open_fc_widget" onClick="openWidget()" style="cursor:pointer;">
               
            </a>
        </div>
        <div class="shopMobile order-2">
      
                    
                    <div class="imgmenu menuMini">
                        <a class="">
                            <i class="fa fa-circle" aria-hidden="true"></i>
                            <i class="fa fa-circle" aria-hidden="true"></i>
                            <i class="fa fa-circle" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>

        </div>

  
