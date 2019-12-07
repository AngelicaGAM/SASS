<?php
include("header.php");
?>

<?php @session_start();
//"IAC110720126MH"
$agenciasRegina = ["REINCSL", "Club Regina Puerto Vallarta", "Club Regina Los cabos", "Club Regina Cancun"];
$array_antiguo_menu = array(
    "BE2017", "BECAMBIO", "BOL", "BookVIP", "BR", "Carlos Tellez", "CCB", "Club Mayor de Mexico 2", "Club Regina Cancun", "Club Regina Los cabos", "Club Regina Puerto Vallarta", "COM", "Cristhian Orozco CTOMOR",
    "fixvip", "GPH-G", "GPH-Q", "GTR", "HBPC", "HEMF", "HERSIF", "HEVB", "AC110720126MH", "INFINITEBE", "INSPIRA", "ITC", "LCGR", "MIA", "ORDEPE", "ORDERM", "ORG", "ORTEM", "RAV", "REARES", "REINCSL", "trav",
    "uvc", "UVC898", "VAMAR", "VG", "Viajes del Caribe", "VIBO2", "xvacationp", "YRB", "IAC110720126MH"
);
if (in_array($_SESSION['user']['agencia'], $array_antiguo_menu)) {
    ?>
    <link type="text/css" rel="stylesheet" href="<?php echo $banner->domain; ?>/_assets/_css/nav.css?x=<?php echo (rand()); ?>">
<?php
} else {
    ?>
    <link type="text/css" rel="stylesheet" href="<?php echo $banner->domain; ?>/_assets/_css/nav2.css?x=<?php echo (rand()); ?>">
<?php
}
?>
<input type="hidden" id="agencia" value="<?php print_r(@$_SESSION['user']["agencia"]); ?>">

<header class="">
    <div class="menu-top bg-beyond">
        <?php
        if (!isset($_SESSION["user"])) {   ?>
            <ul>

                <li>
                    <div class="select-menu-top">
                        <?php $selected = "selected='selected'"; ?>
                        <select name="slct" id="divisa">
                            <option value="USD" selected="selected">Select DIVISA</option>
                            <option value="USD" id="inline" href="#data" <?php if ($_SESSION["user"]["divisa"] == "USD") {
                                                                                echo $selected;
                                                                            } ?>>USD - USD Dollar</option>
                            <option value="MXN" id="inline" href="#data" <?php if ($_SESSION["user"]["divisa"] == "MXN") {
                                                                                echo $selected;
                                                                            } ?>>MXN - Mexican Peso</option>
                            <option value="CAD" id="inline" href="#data" <?php if ($_SESSION["user"]["divisa"] == "CAD") {
                                                                                echo $selected;
                                                                            } ?>>CAD - Canadian Dollar</option>
                            <option value="EUR" id="inline" href="#data" <?php if ($_SESSION["user"]["divisa"] == "EUR") {
                                                                                echo $selected;
                                                                            } ?>>EUR - Euro</option>
                            <option value="BRL" id="inline" href="#data" <?php if ($_SESSION["user"]["divisa"] == "BRL") {
                                                                                echo $selected;
                                                                            } ?>>BRL - Brazilian Real</option>
                        </select>
                    </div>
                </li>

                <li class="d-none d-lg-block">
                    <a class=" acomodoDe" id="carrito" href="<?php echo $banner->domain; ?>reservacion/resumenCarritoRes.php">
                        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                        <span class="cantidadcarro2">
                            <?php
                            if ($_SESSION["cantiitem"] == "" || $_SESSION["cantiitem"] == 0) {
                                echo  0;
                            } else {
                                echo  $_SESSION["cantiitem"];
                            }
                            ?>
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
                    <a class=" fancyB fancybox.iframe" href="login.html" title="<?php echo $banner->idiomaModulo["log"]; ?>">
                        <i class="fa fa-power-off" aria-hidden="true"></i>
                    </a>
                </li>
                <li>
                    <a href="https://www.beyond-experience.com/PanelAdministradorVendedor/" target="_blank" class="casitaLogo">
                        <i class="fa fa-cog" aria-hidden="true"></i>
                    </a>
                </li>
            </ul>
        <?php } else { ?>
            <ul>
                <?php
                // genera funcion que consulta fecha de venta para poder validar que sea usuario apartir del sabado 24-sep-2016
                $validaFecha = $banner->getFechaGarantia($_SESSION["user"]["id"], "2016-09-24");
                // genera funcion que consulta fecha de venta para poder validar que sea usuario apartir del sabado 21-oct-2017 de la agencia Real Resorts
                $validaFechaREARES = $banner->getFechaGarantia($_SESSION["user"]["id"], "2017-10-21");
                if ((($_SESSION["user"]["agencia"] == "Club Regina Cancun" || $_SESSION["user"]["agencia"] == "Club Regina Los cabos" || $_SESSION["user"]["agencia"] == "Club Regina Puerto Vallarta" || $_SESSION["user"]["agencia"] == "IAC110720126MH" || $_SESSION["user"]["agencia"] == "REINCSL" || $_SESSION["user"]["agencia"] == "BE2017" || $_SESSION["user"]["agencia"] == "MIA") && $validaFecha) || (($_SESSION["user"]["agencia"] == "REARES" || $_SESSION["user"]["agencia"] == "INSPIRA") && $validaFechaREARES)) { ?>
                    <?php if ($banner->getSudamericano() == "sudamericano" || $_SESSION['user']['agencia'] == 'SPLBE' || $_SESSION['user']['agencia'] == 'SPLBELE' || $_SESSION["user"]["demo"] == 1) { ?>
                        <li class="nav-item call-orange" id="">
                            <a class="call-now  textmenu" id="click2call-icono"> <i class="fa fa-phone" aria-hidden="true"></i></a>
                        </li>
                    <?php } ?>

                    <li>
                        <div class="select-menu-top">
                            <?php $selected = "selected='selected'"; ?>
                            <select name="slct" id="divisa">
                                <option value="USD" selected="selected">Select Currency</option>
                                <option value="USD" <?php if ($_SESSION["user"]["divisa"] == "USD") {
                                                        echo $selected;
                                                    } ?>>USD - USD Dollar</option>
                                <option value="MXN" <?php if ($_SESSION["user"]["divisa"] == "MXN") {
                                                        echo $selected;
                                                    } ?>>MXN - Mexican Peso</option>
                                <option value="CAD" <?php if ($_SESSION["user"]["divisa"] == "CAD") {
                                                        echo $selected;
                                                    } ?>>CAD - Canadian Dollar</option>
                                <option value="EUR" <?php if ($_SESSION["user"]["divisa"] == "EUR") {
                                                        echo $selected;
                                                    } ?>>EUR - Euro</option>
                                <option value="BRL" <?php if ($_SESSION["user"]["divisa"] == "BRL") {
                                                        echo $selected;
                                                    } ?>>BRL - Brazilian Real</option>
                                <option value="COP" <?php if ($_SESSION["user"]["divisa"] == "COP") {
                                                        echo $selected;
                                                    } ?>>COP - Colombian Peso</option>
                            </select>
                        </div>
                    </li>
                    <?php
                    if ($_SESSION["user"]["agencia"] != "NONBREG") { ?>
                        <li class="last" id="">
                            <a data-fancybox href="https://members.beyond-experience.com/_assets/_images/tools/price.jpg" class="textmenuWelcome">Price Guarantee</a>
                        </li>
                    <?php
                }
            } else { ?>
                    <?php if ($banner->getSudamericano() == "sudamericano" || $_SESSION['user']['agencia'] == 'SPLBE' || $_SESSION['user']['agencia'] == 'SPLBELE' || $_SESSION["user"]["demo"] == 1) { ?>
                        <li class="nav-item call-orange" id="">
                            <a class="call-now  textmenu" id="click2call-icono"> <i class="fa fa-phone" aria-hidden="true"></i></a>
                        </li>
                    <?php } ?>

                    <li>
                        <div class="select-menu-top">
                            <?php $selected = "selected='selected'"; ?>
                            <select name="slct" id="divisa">
                                <option value="USD" selected="selected">Select Currency</option>
                                <option value="USD" <?php if ($_SESSION["user"]["divisa"] == "USD") {
                                                        echo $selected;
                                                    } ?>>USD - USD Dollar</option>
                                <option value="MXN" <?php if ($_SESSION["user"]["divisa"] == "MXN") {
                                                        echo $selected;
                                                    } ?>>MXN - Mexican Peso</option>
                                <option value="CAD" <?php if ($_SESSION["user"]["divisa"] == "CAD") {
                                                        echo $selected;
                                                    } ?>>CAD - Canadian Dollar</option>
                                <option value="EUR" <?php if ($_SESSION["user"]["divisa"] == "EUR") {
                                                        echo $selected;
                                                    } ?>>EUR - Euro</option>
                                <option value="BRL" <?php if ($_SESSION["user"]["divisa"] == "BRL") {
                                                        echo $selected;
                                                    } ?>>BRL - Brazilian Real</option>
                                <option value="COP" <?php if ($_SESSION["user"]["divisa"] == "COP") {
                                                        echo $selected;
                                                    } ?>>COP - Colombian Peso</option>
                            </select>
                        </div>
                    </li>

                <?php } ?>
                <li>
                    <div class="select-menu-top">
                        <select name="area" id="language" class="cambiaIdioma">
                            <option value="<?php echo $banner->domain; ?>homeRes.php">English</option>
                            <option value="<?php echo $banner->domain; ?>es/homeRes.php">Español</option>
                        </select>
                    </div>
                </li>
                <li class="nav-item">
                    <a class=" textmenuWelcome" href="<?php echo $banner->domain; ?>perfilRes.php"> <?php echo $banner->idiomaModulo["perfil"]; ?> <?php echo (isset($_SESSION["user"])) ? $_SESSION["user"]["nombre"] : ""  ?></a>
                </li>
                <li class="nav-item imgmenu avatar">
                    <a class="dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fa fa-user-circle" aria-hidden="true"></i>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <img class="perfil-menu" src="/_assets/_images/perfil.png" alt="">
                        <small>B-Rewards</small>
                        <div class="rewards-box">
                            <div class="item-rewards">
                                <span>Total</span>
                                <span>Used</span>
                            </div>
                            <div class="item-rewards">
                                <span>0</span>
                                <span>0</span>
                            </div>
                        </div>
                    </div>
                </li>
                <?php
                // genera funcion que consulta fecha de venta para poder validar que sea usuario apartir del sabado 24-sep-2016
                $validaFecha = $banner->getFechaGarantia($_SESSION["user"]["id"], "2016-09-24");
                // genera funcion que consulta fecha de venta para poder validar que sea usuario apartir del sabado 21-oct-2017 de la agencia Real Resorts
                $validaFechaREARES = $banner->getFechaGarantia($_SESSION["user"]["id"], "2017-10-21");
                if ((($_SESSION["user"]["agencia"] == "Club Regina Cancun" || $_SESSION["user"]["agencia"] == "Club Regina Los cabos" || $_SESSION["user"]["agencia"] == "Club Regina Puerto Vallarta" || $_SESSION["user"]["agencia"] == "IAC110720126MH" || $_SESSION["user"]["agencia"] == "REINCSL" || $_SESSION["user"]["agencia"] == "BE2017" || $_SESSION["user"]["agencia"] == "MIA") && $validaFecha) || (($_SESSION["user"]["agencia"] == "REARES" || $_SESSION["user"]["agencia"] == "INSPIRA") && $validaFechaREARES)) { ?>

                    <li class="d-none d-lg-block">
                        <a class=" acomodoDe" id="carrito" href="<?php echo $banner->domain; ?>reservacion/resumenCarritoRes.php">
                            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                            <span class="cantidadcarro2">
                                <?php
                                if ($_SESSION["cantiitem"] == "" || $_SESSION["cantiitem"] == 0) {
                                    echo  0;
                                } else {
                                    echo  $_SESSION["cantiitem"];
                                }
                                ?>
                            </span>
                        </a>
                    </li>

                <?php

            } else { ?>

                    <li class="d-none d-lg-block d-xl-none">
                        <a class=" acomodoDe" id="carrito" href="<?php echo $banner->domain; ?>reservacion/resumenCarritoRes.php">
                            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                            <span class="cantidadcarro2">
                                <?php
                                if ($_SESSION["cantiitem"] == "" || $_SESSION["cantiitem"] == 0) {
                                    echo  0;
                                } else {
                                    echo  $_SESSION["cantiitem"];
                                }
                                ?>
                            </span>
                        </a>
                    </li>


                <?php
            }
            ?>
                <li class="nav-item imgmenu menuMini">
                    <a class="">
                        <i class="fa fa-circle" aria-hidden="true"></i>
                        <i class="fa fa-circle" aria-hidden="true"></i>
                        <i class="fa fa-circle" aria-hidden="true"></i>
                    </a>
                </li>
                <li class="nav-item imgmenu last">
                    <a class="" id="out" name="<?php echo $_SESSION["user"]["agencia"]; ?>">
                        <i class="fa fa-power-off" aria-hidden="true"></i>
                    </a>
                </li>
                <?php
                if ($_SESSION["user"]["vendedor"] === 1) { ?>
                    <li>
                        <a href="https://www.beyond-experience.com/PanelAdministradorVendedor/" target="_blank" class="casitaLogo">
                            <i class="fa fa-cog" aria-hidden="true"></i>
                        </a>
                    </li>
                <?php
            } ?>
            </ul>
        <?php
    }
    ?>
    </div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-sm-start bg-beyond">
        <a class="navbar-brand order-1 order-lg-0 ml-lg-0 ml-2 m-auto" href="<?php echo $banner->domain; ?>homeRes.php">
            <img src="<?php echo $banner->domain; ?>/_assets/_images/template/logo_beyond.png" class="img-fluid logoBeyond">
            <img src="<?php echo $banner->domain; ?>/_assets/_images/template/logoBeyondMobile.png" class="img-fluid logoBeyondMobile">
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
            <?php
            // genera funcion que consulta fecha de venta para poder validar que sea usuario apartir del sabado 24-sep-2016
            $validaFecha = $banner->getFechaGarantia($_SESSION["user"]["id"], "2016-09-24");
            // genera funcion que consulta fecha de venta para poder validar que sea usuario apartir del sabado 21-oct-2017 de la agencia Real Resorts
            $validaFechaREARES = $banner->getFechaGarantia($_SESSION["user"]["id"], "2017-10-21");
            if ((($_SESSION["user"]["agencia"] == "Club Regina Cancun" || $_SESSION["user"]["agencia"] == "Club Regina Los cabos" || $_SESSION["user"]["agencia"] == "Club Regina Puerto Vallarta" || $_SESSION["user"]["agencia"] == "IAC110720126MH" || $_SESSION["user"]["agencia"] == "REINCSL" || $_SESSION["user"]["agencia"] == "BE2017" || $_SESSION["user"]["agencia"] == "MIA") && $validaFecha) || (($_SESSION["user"]["agencia"] == "REARES" || $_SESSION["user"]["agencia"] == "INSPIRA") && $validaFechaREARES)) { ?>

                <div class="carMobile">
                    <?php if ($banner->getSudamericano() == "sudamericano" || $_SESSION['user']['agencia'] == 'SPLBE' || $_SESSION['user']['agencia'] == 'SPLBELE' || $_SESSION["user"]["demo"] == 1) { ?>
                        <div class="nav-item call-orange" id="">
                            <a class="call-now  textmenu" id="click2call-icono"> <i class="fa fa-phone" aria-hidden="true"></i></a>
                        </div>
                    <?php } ?>
                    <a class=" acomodoDe" id="carrito" href="<?php echo $banner->domain; ?>reservacion/resumenCarritoRes.php">
                        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                        <span class="cantidadcarro">
                            <?php
                            if ($_SESSION["cantiitem"] == "" || $_SESSION["cantiitem"] == 0) {
                                echo  0;
                            } else {
                                echo  $_SESSION["cantiitem"];
                            }
                            ?>
                        </span>
                    </a>
                    <div class="imgmenu menuMini">
                        <a class="">
                            <i class="fa fa-circle" aria-hidden="true"></i>
                            <i class="fa fa-circle" aria-hidden="true"></i>
                            <i class="fa fa-circle" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
            <?php
        } else { ?>

                <div class="carMobile">
                    <?php if ($banner->getSudamericano() == "sudamericano" || $_SESSION['user']['agencia'] == 'SPLBE' || $_SESSION['user']['agencia'] == 'SPLBELE' || $_SESSION["user"]["demo"] == 1) { ?>
                        <div class="nav-item call-orange" id="">
                            <a class="call-now  textmenu" id="click2call-icono"> <i class="fa fa-phone" aria-hidden="true"></i></a>
                        </div>

                    <?php } ?>


                    <a class=" acomodoDe" id="carrito" href="<?php echo $banner->domain; ?>reservacion/resumenCarritoRes.php">
                        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                        <span class="cantidadcarro">
                            <?php
                            if ($_SESSION["cantiitem"] == "" || $_SESSION["cantiitem"] == 0) {
                                echo  0;
                            } else {
                                echo  $_SESSION["cantiitem"];
                            }
                            ?>
                        </span>
                    </a>
                    <div class="imgmenu menuMini">
                        <a class="">
                            <i class="fa fa-circle" aria-hidden="true"></i>
                            <i class="fa fa-circle" aria-hidden="true"></i>
                            <i class="fa fa-circle" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
            <?php
        }
        ?>
        </div>

        <div class="collapse navbar-collapse d-flex flex-column flex-lg-row flex-xl-row justify-content-lg-end  p-3 p-lg-0  mt-lg-0 mobileMenu" id="navbarSupportedContent">
            <div class="ActionMobile">
                <div class="botonesSalir">
                    <a href="<?php echo $banner->domain; ?>homeRes.php">
                        <i class="fa fa-home" aria-hidden="true"></i>
                    </a>
                    <a class="closeMenuMobile">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </a>
                </div>
                <div class="OptionMobile">
                    <?php
                    if (!isset($_SESSION["user"])) {   ?>
                        <div class="select-menu-top">
                            <?php $selected = "selected='selected'"; ?>
                            <select name="slct" id="divisa">
                                <option value="USD" selected="selected">Select DIVISA</option>
                                <option value="USD" id="inline" href="#data" <?php if ($_SESSION["user"]["divisa"] == "USD") {
                                                                                    echo $selected;
                                                                                } ?>>USD - USD Dollar</option>
                                <option value="MXN" id="inline" href="#data" <?php if ($_SESSION["user"]["divisa"] == "MXN") {
                                                                                    echo $selected;
                                                                                } ?>>MXN - Mexican Peso</option>
                                <option value="CAD" id="inline" href="#data" <?php if ($_SESSION["user"]["divisa"] == "CAD") {
                                                                                    echo $selected;
                                                                                } ?>>CAD - Canadian Dollar</option>
                                <option value="EUR" id="inline" href="#data" <?php if ($_SESSION["user"]["divisa"] == "EUR") {
                                                                                    echo $selected;
                                                                                } ?>>EUR - Euro</option>
                                <option value="BRL" id="inline" href="#data" <?php if ($_SESSION["user"]["divisa"] == "BRL") {
                                                                                    echo $selected;
                                                                                } ?>>BRL - Brazilian Real</option>
                            </select>
                        </div>
                    <?php } else { ?>

                        <?php
                        // genera funcion que consulta fecha de venta para poder validar que sea usuario apartir del sabado 24-sep-2016
                        $validaFecha = $banner->getFechaGarantia($_SESSION["user"]["id"], "2016-09-24");
                        // genera funcion que consulta fecha de venta para poder validar que sea usuario apartir del sabado 21-oct-2017 de la agencia Real Resorts
                        $validaFechaREARES = $banner->getFechaGarantia($_SESSION["user"]["id"], "2017-10-21");
                        if ((($_SESSION["user"]["agencia"] == "Club Regina Cancun" || $_SESSION["user"]["agencia"] == "Club Regina Los cabos" || $_SESSION["user"]["agencia"] == "Club Regina Puerto Vallarta" || $_SESSION["user"]["agencia"] == "IAC110720126MH" || $_SESSION["user"]["agencia"] == "REINCSL" || $_SESSION["user"]["agencia"] == "BE2017" || $_SESSION["user"]["agencia"] == "MIA") && $validaFecha) || (($_SESSION["user"]["agencia"] == "REARES" || $_SESSION["user"]["agencia"] == "INSPIRA") && $validaFechaREARES)) { ?>


                            <div>
                                <div class="select-menu-top">
                                    <?php $selected = "selected='selected'"; ?>
                                    <select name="slct" id="divisa">
                                        <option value="USD" selected="selected">Select Currency</option>
                                        <option value="USD" <?php if ($_SESSION["user"]["divisa"] == "USD") {
                                                                echo $selected;
                                                            } ?>>USD - USD Dollar</option>
                                        <option value="MXN" <?php if ($_SESSION["user"]["divisa"] == "MXN") {
                                                                echo $selected;
                                                            } ?>>MXN - Mexican Peso</option>
                                        <option value="CAD" <?php if ($_SESSION["user"]["divisa"] == "CAD") {
                                                                echo $selected;
                                                            } ?>>CAD - Canadian Dollar</option>
                                        <option value="EUR" <?php if ($_SESSION["user"]["divisa"] == "EUR") {
                                                                echo $selected;
                                                            } ?>>EUR - Euro</option>
                                        <option value="BRL" <?php if ($_SESSION["user"]["divisa"] == "BRL") {
                                                                echo $selected;
                                                            } ?>>BRL - Brazilian Real</option>
                                        <option value="COP" <?php if ($_SESSION["user"]["divisa"] == "COP") {
                                                                echo $selected;
                                                            } ?>>COP - Colombian Peso</option>
                                    </select>
                                </div>
                            </div>

                        <?php

                    } else { ?>

                            <div>
                                <div class="select-menu-top">
                                    <?php $selected = "selected='selected'"; ?>
                                    <select name="slct" id="divisa">
                                        <option value="USD" selected="selected">Select Currency</option>
                                        <option value="USD" <?php if ($_SESSION["user"]["divisa"] == "USD") {
                                                                echo $selected;
                                                            } ?>>USD - USD Dollar</option>
                                        <option value="MXN" <?php if ($_SESSION["user"]["divisa"] == "MXN") {
                                                                echo $selected;
                                                            } ?>>MXN - Mexican Peso</option>
                                        <option value="CAD" <?php if ($_SESSION["user"]["divisa"] == "CAD") {
                                                                echo $selected;
                                                            } ?>>CAD - Canadian Dollar</option>
                                        <option value="EUR" <?php if ($_SESSION["user"]["divisa"] == "EUR") {
                                                                echo $selected;
                                                            } ?>>EUR - Euro</option>
                                        <option value="BRL" <?php if ($_SESSION["user"]["divisa"] == "BRL") {
                                                                echo $selected;
                                                            } ?>>BRL - Brazilian Real</option>
                                        <option value="COP" <?php if ($_SESSION["user"]["divisa"] == "COP") {
                                                                echo $selected;
                                                            } ?>>COP - Colombian Peso</option>
                                    </select>
                                </div>
                            </div>

                        <?php } ?>
                        <div class="select-menu-top">
                            <select name="area" id="language" class="cambiaIdioma">
                                <option value="<?php echo $banner->domain; ?>homeRes.php">English</option>
                                <option value="<?php echo $banner->domain; ?>es/homeRes.php">Español</option>
                            </select>
                        </div>
                    <?php }  ?>
                </div>
            </div>

            <?php
            if (!isset($_SESSION["user"])) {   ?>

                <ul class="navbar-nav align-self-stretch">
                    <li class="nav-item">
                        <a class="nav-link" href="<?php echo $banner->domain; ?>bookPremium_Res.php">
                            <?php
                            if (in_array($_SESSION["user"]["agencia"], $agenciasRegina)) {
                                echo "Premium Weeks:)";
                            } else {
                                echo $banner->idiomaModulo["menu"]["semanasP"];
                            }
                            ?>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="<?php echo $banner->domain; ?>resortWeeksRes.php">
                            <?php echo $banner->idiomaModulo["menu"]["ResortW"]; ?>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="<?php echo $banner->domain; ?>lastminuteRes.php">
                            <?php echo $banner->idiomaModulo["menu"]["op3"]; ?>
                        </a>
                    </li>
                    <?php
                    if (in_array($_SESSION['user']['agencia'], $array_antiguo_menu)) {
                        ?>

                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="ml-auto"></span>
                                <?php echo $banner->idiomaModulo["menu"]["op4"]; ?>
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="<?php echo $banner->domain; ?>beyondWeeksRes.php"><?php echo $banner->idiomaModulo["menu"]["op41"]; ?></a>
                                <a class="dropdown-item" href="<?php echo $banner->domain; ?>directoryRes.php"><?php echo $banner->idiomaModulo["menu"]["op1"]; ?></a>

                                <?php
                                if (in_array($_SESSION["user"]["agencia"], $agenciasRegina)) {
                                    /*
                                        infiniti aliance = IAC110720126MH   
                                        Regina Cabos San Lucas ===  REINCSL  
                                        Raintree Club Regina Vallarta =  Club Regina Puerto Vallarta
                                        Raintree Club Regina Los Cabos == Club Regina Los cabos 
                                        Raintree Club Regina Cancun ==Club Regina Cancun
                                        */
                                    ?>
                                    <!--  <a class="dropdown-item" href="<?php echo $banner->domain; ?>inventarioReginaRes.php"><?php echo "Inventory Regina"; ?></a> -->
                                <?php
                            } ?>
                            </div>
                        </li>
                    <?php
                }
                ?>
                    <li class="nav-item">
                        <a class="nav-link" href="<?php echo $banner->domain; ?>cruisesRes.php">
                            <?php echo $banner->idiomaModulo["menu"]["op6"]; ?>
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="ml-auto"></span>
                            <?php echo $banner->idiomaModulo["menu"]["op14"]; ?>

                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="<?php echo $banner->domain; ?>vueloServices.php"><?php echo $banner->idiomaModulo["menu"]["op72"]; ?></a>
                            <a class="dropdown-item" href="<?php echo $banner->domain; ?>vueloServicesTF.php"><?php echo $banner->idiomaModulo["menu"]["op141"]; ?></a>

                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="<?php echo $banner->domain; ?>hotelServicesRes.php">
                            <?php echo $banner->idiomaModulo["menu"]["op71"]; ?>
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="ml-auto"></span>
                            <?php echo $banner->idiomaModulo["menu"]["op7"]; ?>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                             <a class="dropdown-item" href="<?php echo $banner->domain; ?>tours_Res.php">
                                    <?php echo $banner->idiomaModulo["menu"]["op82"]; ?>
                                </a>
                                <!-- <a class="dropdown-item" href="<?php echo $banner->domain; ?>transferRes.php">
                                    <?php echo $banner->idiomaModulo["menu"]["op83"]; ?>
                                </a> -->
                            <a class="dropdown-item" href="<?php echo $banner->domain; ?>carrosRes.php">
                                <?php echo $banner->idiomaModulo["menu"]["op73"]; ?>
                            </a>
                            <a class="dropdown-item" href="<?php echo $banner->domain; ?>ticketsRes.php">
                                <?php echo $banner->idiomaModulo["menu"]["op81"]; ?>
                            </a>
                            <a class="dropdown-item" href="<?php echo $banner->domain; ?>bucketRes.php">
                                <?php echo $banner->idiomaModulo["menu"]["op5"]; ?>
                            </a>
                            <a class="dropdown-item" href="<?php echo $banner->domain; ?>golfRes.php">
                                <?php echo $banner->idiomaModulo["menu"]["op85"]; ?>
                            </a>
                            <?php
                            if ($_SESSION["user"]["agencia"] != "REARES" && $_SESSION["user"]["agencia"] != "INSPIRA") { ?>

                                <a class="dropdown-item" href="<?php echo $banner->domain; ?>worldExchangeRes.php">
                                    <?php echo $banner->idiomaModulo["menu"]["op2"]; ?>
                                </a>
                            <?php
                        }
                        if (!in_array($_SESSION['user']['agencia'], $array_antiguo_menu)) {
                            ?>
                                <a class="dropdown-item" href="<?php echo $banner->domain; ?>directoryRes.php">
                                    <?php echo $banner->idiomaModulo["menu"]["op1"]; ?>
                                </a>
                            <?php
                        }
                        ?>
                        </div>
                    </li>
                </ul>
            <?php
        } else { ?>
                <ul class="navbar-nav align-self-stretch">
                    <li class="nav-item">
                        <a class="nav-link" href="<?php echo $banner->domain; ?>bookPremium_Res.php">
                            <?php
                            if (in_array($_SESSION["user"]["agencia"], $agenciasRegina)) {
                                echo "Premium Weeks";
                            } else {
                                echo $banner->idiomaModulo["menu"]["semanasP"];
                            }
                            ?>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="<?php echo $banner->domain; ?>resortWeeksRes.php">
                            <?php echo $banner->idiomaModulo["menu"]["ResortW"]; ?>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="<?php echo $banner->domain; ?>lastminuteRes.php">
                            <?php echo $banner->idiomaModulo["menu"]["op3"]; ?>
                        </a>
                    </li>
                    <?php
                    if (in_array($_SESSION['user']['agencia'], $array_antiguo_menu)) {
                        ?>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle " href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="ml-auto"></span>
                                <?php echo $banner->idiomaModulo["menu"]["op4"]; ?>

                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="<?php echo $banner->domain; ?>beyondWeeksRes.php"><?php echo $banner->idiomaModulo["menu"]["op41"]; ?></a>
                                <a class="dropdown-item" href="<?php echo $banner->domain; ?>directoryRes.php"><?php echo $banner->idiomaModulo["menu"]["op1"]; ?></a>

                                <?php
                                if (in_array($_SESSION["user"]["agencia"], $agenciasRegina)) {
                                    /*
                                        infiniti aliance = IAC110720126MH   
                                        Regina Cabos San Lucas ===  REINCSL  
                                        Raintree Club Regina Vallarta =  Club Regina Puerto Vallarta
                                        Raintree Club Regina Los Cabos == Club Regina Los cabos 
                                        Raintree Club Regina Cancun ==Club Regina Cancun
                                        */
                                    ?>
                                    <!--  <a class="dropdown-item" href="<?php echo $banner->domain; ?>inventarioReginaRes.php"><?php echo "Inventory Regina"; ?></a> -->
                                <?php
                            } ?>
                            </div>
                        </li>
                    <?php
                }
                ?>
                    <li class="nav-item">
                        <a class="nav-link" href="<?php echo $banner->domain; ?>cruisesRes.php">
                            <?php echo $banner->idiomaModulo["menu"]["op6"]; ?>
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="ml-auto"></span>
                            <?php echo $banner->idiomaModulo["menu"]["op14"]; ?>

                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="<?php echo $banner->domain; ?>vueloServices.php"><?php echo $banner->idiomaModulo["menu"]["op72"]; ?></a>
                            <a class="dropdown-item" href="<?php echo $banner->domain; ?>vueloServicesTF.php"><?php echo $banner->idiomaModulo["menu"]["op141"]; ?></a>

                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="<?php echo $banner->domain; ?>hotelServicesRes.php">
                            <?php echo $banner->idiomaModulo["menu"]["op71"]; ?>
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="ml-auto"></span>
                            <?php echo $banner->idiomaModulo["menu"]["op7"]; ?>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                             <a class="dropdown-item" href="<?php echo $banner->domain; ?>tours_Res.php">
                                    <?php echo $banner->idiomaModulo["menu"]["op82"]; ?>
                                </a>
                              <!--  <a class="dropdown-item" href="<?php echo $banner->domain; ?>transferRes.php">
                                    <?php echo $banner->idiomaModulo["menu"]["op83"]; ?>
                                </a> -->
                            <a class="dropdown-item" href="<?php echo $banner->domain; ?>carrosRes.php">
                                <?php echo $banner->idiomaModulo["menu"]["op73"]; ?>
                            </a>
                            <a class="dropdown-item" href="<?php echo $banner->domain; ?>ticketsRes.php">
                                <?php echo $banner->idiomaModulo["menu"]["op81"]; ?>
                            </a>
                            <a class="dropdown-item" href="<?php echo $banner->domain; ?>bucketRes.php">
                                <?php echo $banner->idiomaModulo["menu"]["op5"]; ?>
                            </a>
                            <a class="dropdown-item" href="<?php echo $banner->domain; ?>golfRes.php">
                                <?php echo $banner->idiomaModulo["menu"]["op85"]; ?>
                            </a>
                            <?php if ($_SESSION["user"]["agencia"] != "REARES" && $_SESSION["user"]["agencia"] != "INSPIRA") { ?>

                                <a class="dropdown-item" href="<?php echo $banner->domain; ?>worldExchangeRes.php">
                                    <?php echo $banner->idiomaModulo["menu"]["op2"]; ?>
                                </a>
                            <?php
                        }
                        if (!in_array($_SESSION['user']['agencia'], $array_antiguo_menu)) {
                            ?>
                                <a class="dropdown-item" href="<?php echo $banner->domain; ?>directoryRes.php">
                                    <?php echo $banner->idiomaModulo["menu"]["op1"]; ?>
                                </a>
                            <?php
                        }
                        ?>
                        </div>
                    </li>
                </ul>
            <?php
        } ?>
            <div class="perfilMobile">
                <?php
                if (!isset($_SESSION["user"])) {   ?>

                <?php } else { ?>
                    <a class=" textmenuWelcome" href="<?php echo $banner->domain; ?>perfilRes.php"> <?php echo $banner->idiomaModulo["perfil"]; ?>
                        <span class="nombrePerfil"><?php echo (isset($_SESSION["user"])) ? $_SESSION["user"]["nombre"] : ""  ?></span>
                    </a>
                <?php } ?>

                <a class="" id="out" name="<?php echo $_SESSION["user"]["agencia"]; ?>">
                    <i class="fa fa-sign-in" aria-hidden="true"></i> Logout
                </a>
            </div>
        </div>
    </nav>
    <div class="overlayMenu"></div>




    <div class="container-fluid menuHide" id="opciones-menu">
        <div class="">
            <div class="cerrarMIniMenu"><i class="fa fa-times cierroMini" aria-hidden="true"></i></div>
            <?php
            if (!isset($_SESSION["user"])) {   ?>
                <ul>
                    <li class="nav-item  submenu-cuadro">
                        <a href="<?php echo $banner->domain; ?>rewardsRes.php"><i class="fa fa-bold" aria-hidden="true"></i> <?php echo $banner->idiomaModulo["menu"]["rewards"]; ?></a>
                    </li>
                    <li class="nav-item  submenu-cuadro">
                        <a href="<?php echo $banner->domain; ?>conciergeRes.php"><i class="icon-concierge-01" aria-hidden="true"></i> <?php echo $banner->idiomaModulo["menu"]["op84"]; ?></a>
                    </li>
                </ul>
            <?php
        } else { ?>
                <ul>
                    <?php
                    $validaFecha = $banner->getFechaGarantia($_SESSION["user"]["id"], "2016-09-24");
                    // genera funcion que consulta fecha de venta para poder validar que sea usuario apartir del sabado 21-oct-2017 de la agencia Real Resorts
                    $validaFechaREARES = $banner->getFechaGarantia($_SESSION["user"]["id"], "2017-10-21");
                    if ((($_SESSION["user"]["agencia"] == "Club Regina Cancun" || $_SESSION["user"]["agencia"] == "Club Regina Los cabos" || $_SESSION["user"]["agencia"] == "Club Regina Puerto Vallarta" || $_SESSION["user"]["agencia"] == "IAC110720126MH" || $_SESSION["user"]["agencia"] == "REINCSL" || $_SESSION["user"]["agencia"] == "BE2017" || $_SESSION["user"]["agencia"] == "MIA") && $validaFecha) || (($_SESSION["user"]["agencia"] == "REARES" || $_SESSION["user"]["agencia"] == "INSPIRA") && $validaFechaREARES)) { ?>
                        <?php
                        if ($_SESSION["user"]["agencia"] != "NONBREG") { ?>
                            <li class="nav-item  submenu-cuadro d-block d-sm-block d-md-none d-lg-none">
                                <a data-fancybox href="https://members.beyond-experience.com/_assets/_images/tools/price.jpg" class="textmenuWelcome"> <i class="fa fa-certificate" aria-hidden="true"></i> Price Guarantee</a>
                            </li>
                        <?php
                    }
                } ?>
                    <li class="nav-item  submenu-cuadro">
                        <a href="https://blog.beyond-experience.com/category/travel-tips/" target="_blank"><i class="fa fa-commenting-o" aria-hidden="true"></i> Blog</a>
                    </li>
                    <li class="nav-item  submenu-cuadro">
                        <a href="<?php echo $banner->domain; ?>BE-Newsletter.html" target="_blank"><i class="fa fa-envelope-open-o" aria-hidden="true"></i> News</a>
                    </li>
                    <li class="nav-item  submenu-cuadro">
                        <a href="<?php echo $banner->domain; ?>rewardsRes.php"><i class="fa fa-bold" aria-hidden="true"></i> -<?php echo $banner->idiomaModulo["menu"]["rewards"]; ?></a>
                    </li>
                    <li class="nav-item  submenu-cuadro">
                        <a href="<?php echo $banner->domain; ?>conciergeRes.php"><i class="icon-concierge-01" aria-hidden="true"></i> <?php echo $banner->idiomaModulo["menu"]["op84"]; ?></a>
                    </li>
                </ul>

            <?php
        }
        ?>
        </div>

    </div>




    <?php
    $_SESSION["user"]["MFA"] = $banner->get_data($_SESSION["user"]["id"], "id_mfa", "log_cambiomfa", "id_cliente");
    $_SESSION["user"]["MFAactivo"] = $banner->get_data($_SESSION["user"]["id"], "activo", "log_cambiomfa", "id_cliente");
    $fechaVenta = $banner->get_dataAnyDate("fechaVenta", "clientes", " where id_cliente=" . $_SESSION["user"]["id"]);
    $fechaVentaArr = explode("-", $fechaVenta);
    $_SESSION["user"]["fechaVenta"] = strtotime($fechaVentaArr[2] . "-" . $fechaVentaArr[0] . "-" . $fechaVentaArr[1]);
    //echo $_SESSION["user"]["MFA"];
    //echo $_SESSION["user"]["MFAactivo"];
    $MFARES = "";
    if ($_SESSION["user"]["MFA"] != "" && $_SESSION["user"]["MFAactivo"] == 1) {
        $MFARES = "SI";
    }

    //$MFARES="SI"; 

    //echo $MFARES;
    //echo "<br>"; 
    if ($_SESSION["user"]["agencia"] == "Club Regina Los cabos" || $_SESSION["user"]["agencia"] == "Club Regina Puerto Vallarta" || $_SESSION["user"]["agencia"] == "Club Regina Cancun") {
        $contratoexplode = explode("41", $_SESSION["user"]["numeroContrato"]);
        $contratoexplode2 = explode("42", $_SESSION["user"]["numeroContrato"]);
        $contratoexplode3 = explode("-", $_SESSION["user"]["numeroContrato"]);
        $nContract = array(1, 2, 3, 4, 5, 6, 7, 8, 9);

        if ($contratoexplode[0] == "" || $contratoexplode2[0] == "" || in_array($contratoexplode3[0], $nContract)) {
            $mfaok = "MFAOK";
        }
    }
    //$_SESSION["user"]["MFALISTA"]=$MFARES="SI"; 
    //$_SESSION["user"]["MFACONTRATO"]=$mfaok="MFAOK";
    $_SESSION["user"]["MFALISTA"] = $MFARES;
    $_SESSION["user"]["MFACONTRATO"] = $mfaok;
    if ($MFARES == "" && $mfaok == "MFAOK" && $_SERVER['REQUEST_URI'] != "/MFAcertificado.php" && $_SESSION["user"]["fechaVenta"] >= strtotime("2018-05-08")) {
        ?>


        <div id="cintilloMFA">
            <div>
                <i class="flechaMFA icon-arrow-right"></i>
                <span>Activate your MFA Certificate if you want to recover your maintenance fee</span>
                <a href="<?php echo $banner->domain; ?>/MFAcertificado.php" class="logoLink">
                    <button id="irMFA">Go to activation module</button>
                </a>
                <i class="flechaMFA icon-nextlef"></i>
                <i class="icon-cancel close" id="closeMFA"></i>
            </div>
        </div>
    <?php
}
?>
    <input type="hidden" id="MFACONTRATO" value="<?php echo $MFARES; ?>">
    <input type="hidden" id="MFALISTA" value="<?php echo $mfaok; ?>">
    <div class="bordeHeader"></div>
</header>