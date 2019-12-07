<?php
/*ini_set('default_charset', 'utf-8');
error_reporting(E_ALL);
ini_set("display_errors", 1);*/
include('carrito/jcart/jcart.php'); 
include("_assets/_session/session.php");
include("_assets/_clases/carWS.php");
$var                   = new carWS();
$var->idiomaModulo     =$var->getlang("carros");
$banner                = new carWS();
$banner->idiomaModulo  = $var->getlang("template"); 
$filtros               = new carWS();
$filtros->idiomaModulo = $var->getlang("filtros");

include("Header.php");
?>
<link href="_assets/_css/carros.css" type="text/css" rel="stylesheet">
<script language="javascript" type="text/javascript" src="_assets/_js/modulos/carros.js"></script>
<!-- Extras -->
<link href="_assets/_js/_plugins/jquery-ui-1.10.3.custom/css/humanity/jquery-ui.min.css" type="text/css" rel="stylesheet" />
<link rel="stylesheet" href="_assets/_css/foundation.css">
 <link href="_assets/_js/_plugins/uniform/css/uniform.default.css" type="text/css" rel="stylesheet" />
<link href="_assets/_css/iconos/style.css" type="text/css" rel="stylesheet" />
<link href="_assets/_css/carWSServices.css" type="text/css" rel="stylesheet">
<link href="_assets/_css/carWS.css" type="text/css" rel="stylesheet">
<link href="_assets/_js/_plugins/malihu-custom-scrollbar-plugin-3.0.3/malihu-custom-scrollbar-plugin-3.0.3/jquery.mCustomScrollbar.css" type="text/css" rel="stylesheet">
<link href="_assets/_js/_plugins/jPages-master/jPages-master/css/jPages.css" type="text/css" rel="stylesheet">
<link href="_assets/_js/_plugins/jPages-master/jPages-master/css/animate.css" type="text/css" rel="stylesheet">

<script language="javascript" type="text/javascript" src="_assets/_js/_plugins/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<script language="javascript" type="text/javascript" src="_assets/_js/_plugins/uniform/jquery.uniform.min.js"></script>
<script language="javascript" type="text/javascript" src="_assets/_js/modulos/funcionamientoCarrito.js"></script>
<script language="javascript" type="text/javascript" src="_assets/_js/modulos/carsServices.js"></script>
<script language="javascript" type="text/javascript" src="_assets/_js/_plugins/scroller/js/minified/jquery.mousewheel.min.js"></script>
<script language="javascript" type="text/javascript" src="_assets/_js/_plugins/scroller/js/minified/jquery.mCustomScrollbar.min.js"></script>
<script language="javascript" type="text/javascript" src="_assets/_js/_plugins/jPages-master/jPages-master/js/jPages.min.js"></script>
<script type="text/javascript" src="carrito/jcart/js/jcart.min.js"></script>
<script src="_assets/_js/_plugins/malihu-custom-scrollbar-plugin-3.0.3/malihu-custom-scrollbar-plugin-3.0.3/js/minified/jquery.mCustomScrollbar.min.js"></script>
<script language="javascript" type="text/javascript" src="_assets/_js/_plugins/uuid.js"></script>

</head>
<body>
<?php include("Menu.php"); ?>
<div id="contenidoSube">

<div id="cajaReserva">
<div class="continidoReserva">
<form id="reservasCarWS">                                       
  <ul>  
  <li>
   <ul>
   
   <li class="acomodo">
     <ul id="elementos">
       <li class="labelR">
         <?php echo "Search by City"; ?>
       </li>
       <li class="inputR">
         <input class="radio" 
                id="flightType-roundtrip" 
                value="city" 
                name="flightType" 
                type="radio" <?php if(isset($_SESSION["buscadorCarWS"]["tipo"]) && ($_SESSION["buscadorCarWS"]["tipo"]=="city")){?> checked <?php } else {  ?> checked <?php } ?> />
       </li>
     </ul>
   </li>
   
   
  <li class="acomodo">
     <ul id="elementos">
       <li class="labelR">
         <?php echo "Or by Airport"; ?>
       </li>
       <li class="inputR">
         <input class="radio" 
                id="flightType-roundtrip" 
                value="airport" 
                name="flightType" 
                type="radio" <?php if(isset($_SESSION["buscadorCarWS"]["tipo"]) && ($_SESSION["buscadorCarWS"]["tipo"]=="airport")){?> checked <?php } else {  ?>  <?php } ?> />
       </li>
     </ul>
   </li>   
   
   
   </ul>
  </li>               
    <li>
        <ul>
        <div id="pickl">
        
          <span class="label">
              <?php echo "Pick-up Location:"; ?>
          </span>            
          <input id="flightfrom_0" class="input" type="text" placeholder="<?php //echo $var->idiomaModulo["buscador"]["inputT"]; ?>" name="flightfrom_1" value="<?php if(isset($_SESSION["buscadorCarWS"]["strFrom1Text"])){echo $_SESSION["buscadorCarWS"]["strFrom1Text"]; }  ?>" autocomplete="off">
            <input id="cFrom_0" value="<?php if(isset($_SESSION["buscadorCarWS"]["strFrom1"])){echo $_SESSION["buscadorCarWS"]["strFrom1"]; }  ?>" name="flightcFrom_1" type="hidden"/> 
            </div>
            
          <div id="droploca0">
         
         <span class="label">
              <?php echo "Pick-up Location:"; ?>
         </span>            
          <input id="pl1" class="input" type="text" placeholder="" name="pl1" value="<?php if(isset($_SESSION["buscadorCarWS"]["location1Text"])){echo $_SESSION["buscadorCarWS"]["location1Text"]; }  ?>" autocomplete="off"/>
          
    <input id="pl_0" 
          value="<?php if(isset($_SESSION["buscadorCarWS"]["location1"])){echo $_SESSION["buscadorCarWS"]["location1"]; }  ?>" 
          name="pl_0" 
          type="hidden" />
        
         </div>
                    
            
         </ul>   
         <ul>
          
         <div id="droploca">
         
           <span class="label">
              <?php echo "Drop-off Location:"; ?>
           </span>            
          <input id="flightTo_1" class="input" type="text" placeholder="<?php //echo $var->idiomaModulo["buscador"]["inputT"]; ?>" name="flightTo_1" value="<?php if(isset($_SESSION["buscadorCarWS"]["location2Text"])){echo $_SESSION["buscadorCarWS"]["location2Text"]; }  ?>" autocomplete="off"/>
          
    <input id="cTo_0" 
           value="<?php if(isset($_SESSION["buscadorCarWS"]["location2"])){echo $_SESSION["buscadorCarWS"]["location2"]; }  ?>" 
           name="cTo_0" 
           type="hidden" />
        
         </div>
         
         </ul>       
      </li>        
      <li>
        <span class="label"><?php echo "Pick-up Date"; ?></span>
        <input name="flightsd_1" 
               placeholder="dd-mm-yyyy" 
               type="text" 
               class="inputFecha" 
               id="startDate_0" 
               value="<?php echo (isset($_SESSION["buscadorCarWS"]["strStartDate1"])?$_SESSION["buscadorCarWS"]["strStartDate1"]:"");?>" readonly />   
               
         <span class="label"><?php echo "Pick-up Time"; ?></span>
         <span class="cubreSelectHORA">
         <select id="sh_0" name="flightsh_1" class="cubiertoAdultoHORA">
<option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime1"])) && ($_SESSION["buscadorCarWS"]["strStartTime1"]=="00:00")){?> selected <?php }  ?> label="00:00" value="00">00:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime1"])) && ($_SESSION["buscadorCarWS"]["strStartTime1"]=="01:00")){?> selected <?php }  ?>label="01:00" value="01">01:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime1"])) && ($_SESSION["buscadorCarWS"]["strStartTime1"]=="02:00")){?> selected <?php }  ?>label="02:00" value="02">02:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime1"])) && ($_SESSION["buscadorCarWS"]["strStartTime1"]=="03:00")){?> selected <?php }  ?> label="03:00" value="03">03:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime1"])) && ($_SESSION["buscadorCarWS"]["strStartTime1"]=="04:00")){?> selected <?php }  ?>label="04:00" value="04">04:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime1"])) && ($_SESSION["buscadorCarWS"]["strStartTime1"]=="05:00")){?> selected <?php }  ?> label="05:00" value="05:00">05:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime1"])) && ($_SESSION["buscadorCarWS"]["strStartTime1"]=="06:00")){?> selected <?php }  ?> label="06:00" value="06">06:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime1"])) && ($_SESSION["buscadorCarWS"]["strStartTime1"]=="07:00")){?> selected <?php }  ?>label="07:00" value="07">07:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime1"])) && ($_SESSION["buscadorCarWS"]["strStartTime1"]=="08:00")){?> selected <?php }  ?> label="08:00" value="08">08:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime1"])) && ($_SESSION["buscadorCarWS"]["strStartTime1"]=="09:00")){?> selected <?php }  ?> label="09:00" value="09">09:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime1"])) && ($_SESSION["buscadorCarWS"]["strStartTime1"]=="10:00")){?> selected <?php }  ?> label="10:00" value="10">10:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime1"])) && ($_SESSION["buscadorCarWS"]["strStartTime1"]=="11:00")){?> selected <?php } else {  ?> selected <?php }?> label="11:00" value="11" >11:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime1"])) && ($_SESSION["buscadorCarWS"]["strStartTime1"]=="12:00")){?> selected <?php }  ?> label="12:00" value="12">12:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime1"])) && ($_SESSION["buscadorCarWS"]["strStartTime1"]=="13:00")){?> selected <?php }  ?> label="13:00" value="13">13:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime1"])) && ($_SESSION["buscadorCarWS"]["strStartTime1"]=="14:00")){?> selected <?php }  ?> label="14:00" value="14">14:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime1"])) && ($_SESSION["buscadorCarWS"]["strStartTime1"]=="15:00")){?> selected <?php }  ?> label="15:00" value="15">15:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime1"])) && ($_SESSION["buscadorCarWS"]["strStartTime1"]=="16:00")){?> selected <?php }  ?> label="16:00" value="16">16:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime1"])) && ($_SESSION["buscadorCarWS"]["strStartTime1"]=="17:00")){?> selected <?php }  ?> label="17:00" value="17">17:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime1"])) && ($_SESSION["buscadorCarWS"]["strStartTime1"]=="18:00")){?> selected <?php }  ?> label="18:00" value="18">18:00</option>
                                     <option <?php if((isset($_SESSION["buscadorVuelo"]["strStartTime1"])) && ($_SESSION["buscadorCarWS"]["strStartTime1"]=="19:00")){?> selected <?php }  ?> label="19:00" value="19">19:00</option>
                                     <option <?php if((isset($_SESSION["buscadorVuelo"]["strStartTime1"])) && ($_SESSION["buscadorCarWS"]["strStartTime1"]=="20:00")){?> selected <?php }  ?> label="20:00" value="20">20:00</option>
                                     <option <?php if((isset($_SESSION["buscadorVuelo"]["strStartTime1"])) && ($_SESSION["buscadorCarWS"]["strStartTime1"]=="21:00")){?> selected <?php }  ?> label="21:00" value="21">21:00</option>
                                     <option <?php if((isset($_SESSION["buscadorVuelo"]["strStartTime1"])) && ($_SESSION["buscadorCarWS"]["strStartTime1"]=="22:00")){?> selected <?php }  ?> label="22:00" value="22">22:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime1"])) && ($_SESSION["buscadorCarWS"]["strStartTime1"]=="23:00")){?> selected <?php }  ?> label="23:00" value="23">23:00</option> 
                                </select>
                            </span>
                          
                        </li>
                        
<li id="regresoRedondoNoEfective">
 <span class="label"><?php echo "Drop-off Date:"; ?></span>
 <input name="flightsed_1" placeholder="dd-mm-yyyy" type="text" class="inputFecha" id="endDate_0" value="<?php echo( isset($_SESSION["buscadorCarWS"]["strStartDate2"]) ? $_SESSION["buscadorCarWS"]["strStartDate2"] : "");?>" readonly />
  <span class="label"><?php echo "Drop-off Time"; ?></span>
  <span class="cubreSelectHORA">
  <select id="sh_0" name="flighteh_1" class="cubiertoAdultoHORA">                                                   
      <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime2"])) && ($_SESSION["buscadorCarWS"]["strStartTime2"]=="00:00")){?> selected <?php }  ?> label="00:00" value="00">00:00</option>
                    <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime2"])) && ($_SESSION["buscadorCarWS"]["strStartTime2"]=="01:00")){?> selected <?php }  ?>label="01:00" value="01">01:00</option>
                    <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime2"])) && ($_SESSION["buscadorCarWS"]["strStartTime2"]=="02:00")){?> selected <?php }  ?>label="02:00" value="02">02:00</option>
                    <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime2"])) && ($_SESSION["buscadorCarWS"]["strStartTime2"]=="03:00")){?> selected <?php }  ?> label="03:00" value="03">03:00</option>
                    <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime2"])) && ($_SESSION["buscadorCarWS"]["strStartTime2"]=="04:00")){?> selected <?php }  ?>label="04:00" value="04">04:00</option>
                    <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime2"])) && ($_SESSION["buscadorCarWS"]["strStartTime2"]=="05:00")){?> selected <?php }  ?> label="05:00" value="05">05:00</option>
                    <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime2"])) && ($_SESSION["buscadorCarWS"]["strStartTime2"]=="06:00")){?> selected <?php }  ?> label="06:00" value="06">06:00</option>
                    <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime2"])) && ($_SESSION["buscadorCarWS"]["strStartTime2"]=="07:00")){?> selected <?php }  ?>label="07:00" value="07">07:00</option>
                    <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime2"])) && ($_SESSION["buscadorCarWS"]["strStartTime2"]=="08:00")){?> selected <?php }  ?> label="08:00" value="08">08:00</option>
                    <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime2"])) && ($_SESSION["buscadorCarWS"]["strStartTime2"]=="09:00")){?> selected <?php }  ?> label="09:00" value="09">09:00</option>
                    <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime2"])) && ($_SESSION["buscadorCarWS"]["strStartTime2"]=="10:00")){?> selected <?php }  ?> label="10:00" value="10">10:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime2"])) && ($_SESSION["buscadorCarWS"]["strStartTime2"]=="11:00")){?> selected <?php } else {  ?> selected <?php }?>  label="11:00" value="11">11:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime2"])) && ($_SESSION["buscadorCarWS"]["strStartTime2"]=="12:00")){?> selected <?php }  ?> label="12:00" value="12">12:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime2"])) && ($_SESSION["buscadorCarWS"]["strStartTime2"]=="13:00")){?> selected <?php }  ?> label="13:00" value="13">13:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime2"])) && ($_SESSION["buscadorCarWS"]["strStartTime2"]=="14:00")){?> selected <?php }  ?> label="14:00" value="14">14:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime2"])) && ($_SESSION["buscadorCarWS"]["strStartTime2"]=="15:00")){?> selected <?php }  ?> label="15:00" value="15">15:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime2"])) && ($_SESSION["buscadorCarWS"]["strStartTime2"]=="16:00")){?> selected <?php }  ?> label="16:00" value="16">16:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime2"])) && ($_SESSION["buscadorCarWS"]["strStartTime2"]=="17:00")){?> selected <?php }  ?> label="17:00" value="17">17:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime2"])) && ($_SESSION["buscadorCarWS"]["strStartTime2"]=="18:00")){?> selected <?php }  ?> label="18:00" value="18">18:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime2"])) && ($_SESSION["buscadorCarWS"]["strStartTime2"]=="19:00")){?> selected <?php }  ?> label="19:00" value="19">19:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime2"])) && ($_SESSION["buscadorCarWS"]["strStartTime2"]=="20:00")){?> selected <?php }  ?> label="20:00" value="20">20:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime2"])) && ($_SESSION["buscadorCarWS"]["strStartTime2"]=="21:00")){?> selected <?php }  ?> label="21:00" value="21">21:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime2"])) && ($_SESSION["buscadorCarWS"]["strStartTime2"]=="22:00")){?> selected <?php }  ?> label="22:00" value="22">22:00</option>
                                     <option <?php if((isset($_SESSION["buscadorCarWS"]["strStartTime2"])) && ($_SESSION["buscadorCarWS"]["strStartTime2"]=="23:00")){?> selected <?php }  ?> label="23:00" value="23">23:00</option>
                                     
                                </select>
                            </span>
                        </li>
         
                        <li> <button id="search" type="button" name="search"><?php echo "Search";?></button>
                        </li>
                </ul>
                <div id="multivuelosDiv">
                </div>
                                  
                <!--  <input type="hidden" name="language" value="<?php //echo $banner->idiomaModulo["lenguaje"];?>" />         
                  <input value="<?php //echo $banner->idiomaModulo["moneda"];?>" name="c" type="hidden">-->
                       
                 </form>
            </div>
        </div>

<div id="contenidoDiv">
  <p class="breadCrum"><a href="<?php echo $banner->domain; ?>/home.php">Home</a> &gt; <?php echo $var->idiomaModulo["breacum"]; ?> </p>
    <div class="hidden_fichas">
    <h1><?php echo $var->idiomaModulo["titulo"]; ?></h1>
    <h2><?php echo $var->idiomaModulo["subTitulo"]; ?></h2>
    <p><?php echo $var->idiomaModulo["texto"]; ?></p>
    <div id="bannerPromo">
    <div id="bannerPeque">
        <div class="contenido">
        <span class="title"><?php echo $banner->idiomaModulo["bannerSmall"]; ?></span>
      </div>
      <div class="mundo"><img src="_assets/_images/template/botonPromo/mundoPeque.png"></div>
    </div>
    <span id="bannerGrande">
      <div class="contenido">
        <div  id="cerrar-bnt"></div>
        <div  class="textobnt">
            <span class="title"><?php echo $banner->idiomaModulo["bannerBig"]["text1"]; ?></span>
            <span class="text"><?php echo $banner->idiomaModulo["bannerBig"]["text2"]; ?></span>
        </div>
        <a href="fomResquetPlan.php" class="ownPlan fancybox.iframe">
          <div class="botonRequest"><?php echo $banner->idiomaModulo["bannerBig"]["boton"]; ?></div>
        </a>
      </div>
      <div class="mundo"><img src="_assets/_images/template/botonPromo/mundoGrande.png"></div>
    </span>
    <div class="limpiar"></div>
    </div>
  </div>
  <div id="resultadoLista"></div>
  <div id="frame">
    <div id="loading">
      <img src="_assets/_images/template/loading.gif" class="loading" />
      <div class="textLoading">Loading......</div>
    </div>
  </div>
  
  <div class="hidden_fichas">      
    <div id="listado">
        <?php $var->getFichas(""); ?>
    </div>
  </div>
</div>
    
  </div>
 <!--  <div id="ladoB">
   <div class='pesta' id="tabimg"> 
     <img id="iconocar" src="_assets/_images/_carrito/iconoCar.png" border="0" width="18px" height="18px"> 
   </div>
   <div id="movsidebar"> 
     <div id="jcart" class="jcartws">
       <?php if (is_object($jcart))
                      { $jcart->display_cart();    } 
       ?>
     </div>
   </div>
 </div>  -->
         
<?php include("Footer.php"); ?>
</body>
</html>