// JavaScript Document
$(document).ready(function (e) {

    $("#sombraArriba").hide();

    var info = $('#ladoB');
    $(".pesta").animate({marginRight: '2'}, 260);
    $("#movsidebar").animate({right: '0'}, 260, function () {
        $(this).hide();
    });


    info.show();
    info.animate({width: '12'}, 60);


    $(document).on("click", "#botonSubmit", function () {

        //$("#urlAnterior").prop("value",window.location.href);
        $.ajax({
            url: "../_assets/_controllers/urlAnterior.php",
            type: "POST",
            //dataType:"html",

            data: {url: window.location.href}
        }).done(function (data) {

            $("#containerTodo").submit();
        });

    });

    ////////////////////////////////////////////////////////////
    // para ocultar el carrito cuando rota el cel o cambia la resolucion
    window.addEventListener("resize", function () {

        if ($(window).width() >= 992)
        {
            info.show();
            info.animate({width: '12'}, 60);
        } else
        {
            info.hide();
            info.animate({width: '0'}, 60);
        }


    }, false);


    /////////////////////////////////////////////////
    // funcionamiento para el scroll
    $("#containerTodo").mCustomScrollbar({
        theme: "rounded",
        scrollbarPosition: "inside"

    });


    /////////////////////////////////////////////////
    // abrir el carrito con la pestaña
    $(".pesta").on("click", function () {
        barra();
        //alert("abierto carro");
    });


    /////////////////////////////////////////////////
    // detecta el click en la pagina, si el ancho es igual o mayor a 340 oculta la pestana del carrito
    $(document).click(function () {

        var ancho = info.width();


        setTimeout(function () {
            $("#containerTodo").mCustomScrollbar("scrollTo", 9, {
                moveDragger: true
            });
        }, 100);

        if (ancho >= 340)
        {
            info.animate({width: '12'}, 260);
            $("#tabimg").animate({marginRight: '2'}, 198);
            $("#movsidebar").animate({right: '-300'}, 260, function () {
                $(this).hide();
            });
            $("#sombraArriba").hide();
            $("#sombraAbajo").hide();
        }

    });




    function barra() {
        //alert("dispara el carro");
        var ancho = info.width();


        setTimeout(function () {
            $("#containerTodo").mCustomScrollbar("scrollTo", 9, {
                moveDragger: true
            });
        }, 100);

        if (ancho == 12)
        {
            info.animate({width: '340'}, 220);
            $('#movsidebar').show();
            $('#movsidebar').css({right: "-300"}).animate({right: '5'}, 270);
            $("#tabimg").animate({marginRight: '330'}, 260);
           
           

            if ($("#containerTodo").height() >= 466)
            {

                $("#sombraArriba").show();
                $("#sombraAbajo").show();
            } else
            {
                $("#sombraArriba").hide();
                $("#sombraAbajo").hide();
            }
        } else
        {

            // $('#sidebar').animate({ width:'-300'}, 260, function() { $(this).hide();});	
            //$("#jcart").animate({marginRight:'-17em'},260);

            info.animate({width: '12'}, 260);
            $("#tabimg").animate({marginRight: '2'}, 198);
            $("#movsidebar").animate({right: '-300'}, 260, function () {
                $(this).hide();
            });
            $("#sombraArriba").hide();
            $("#sombraAbajo").hide();



        }

    }
//console.log(localStorage.getItem("sesionagencia"));
    $(document).on("click", ".chrono-popup .botonP", function (e) {
        e.preventDefault();
        var hotel = $(this).parent().find("input[name='gm-hotelCManual']").val();
        var checkIn = $(this).parent().find("input[name='gm-llegadaCManual']").val();
        var checkOut = $(this).parent().find("input[name='gm-salidaCManual']").val();
        var price = $(this).parent().find("input[name='gm-precioTotalCManual']").val();
        var socio = $(this).parent().find("input[name='gm-idSocioCManual']").val();
        var destination = $(this).parent().find("input[name='gm-destinoCManual']").val();
        var size = $(this).parent().find("input[name='gm-sizeCManual']").val();
        var pax = $(this).parent().find("input[name='gm-capacidadCManual']").val();
        $.ajax({
            type: "POST",
            url: "../_assets/_controllers/chronoPopup.php",
            data: {
                hotel: hotel,
                checkIn: checkIn,
                checkOut: checkOut,
                price: price,
                socio: socio,
                destination: destination,
                size: size,
                pax: pax
            },
            success: function (data) {
                    if(localStorage.getItem("sesionagencia")!="NONBREG"){
                $.fancybox(
                        '<div id="InventarioRegina" class="modal chrono-modal"><div class="fullin colorlogo"><img class="logopopregina" src="https://members.beyond-experience.com/_assets/_images/template/logo-1000.png"/></div><img class="fullin tira" src="https://members.beyond-experience.com/_assets/_images/popupInventarioRegina/cintillo.jpg"/><div class="fondopopup"><span class="titulopop">Dear member</span><span class="parrafopop">Your request has been sent. Shortly, your Personal Concierge will contact you to complete your reservation process.<br /><br />Thank you</span><div class="centerpop"><div class="iblockpop w70"><img class="telefonopop" src="https://members.beyond-experience.com/_assets/_images/popupInventarioRegina/ico-telefono.png"/><span class="numerospop">	<strong>USA, CAN: 1-888-963-7689<br>Mexico: 800-272-0294</strong></span></div></div></div></div>',
                        {
                            'autoDimensions': false,
                            'width': 350,
                            'height': 'auto',
                            'transitionIn': 'none',
                            'transitionOut': 'none'
                        }

                );
            }else{
                $.fancybox(
                        '<div id="InventarioRegina" class="modal chrono-modal"><div class="fullin colorlogo"><img class="logopopregina" src="https://members.beyond-experience.com/_assets/_images/template/logo-1000.png"/></div><img class="fullin tira" src="https://members.beyond-experience.com/_assets/_images/popupInventarioRegina/cintillo.jpg"/><div class="fondopopup"><span class="titulopop">Dear member</span><span class="parrafopop">Your request has been sent. Shortly, your Personal Concierge will contact you to complete your reservation process.<br /><br />Thank you</span><div class="centerpop"><div class="iblockpop w70"><img class="telefonopop" src="https://members.beyond-experience.com/_assets/_images/popupInventarioRegina/ico-telefono.png"/><span class="numerospop">   </span></div></div></div></div>',
                        {
                            'autoDimensions': false,
                            'width': 350,
                            'height': 'auto',
                            'transitionIn': 'none',
                            'transitionOut': 'none'
                        }

                );

            }
            }
        });
    });



});
var info = $('#ladoB');


function barra2() {
    //alert("dispara el carro");
    var ancho = info.width();


    setTimeout(function () {
        $("#containerTodo").mCustomScrollbar("scrollTo", 9, {
            moveDragger: true
        });
    }, 100);

    if (ancho == 12)
    {
        info.animate({width: '340'}, 220);
        $('#movsidebar').show();
        $('#movsidebar').css({right: "-300"}).animate({right: '5'}, 270);
        $("#tabimg").animate({marginRight: '330'}, 260);

        if ($("#containerTodo").height() >= 466)
        {

            $("#sombraArriba").show();
            $("#sombraAbajo").show();
        } else
        {
            $("#sombraArriba").hide();
            $("#sombraAbajo").hide();
        }
    } else
    {

        // $('#sidebar').animate({ width:'-300'}, 260, function() { $(this).hide();});	
        //$("#jcart").animate({marginRight:'-17em'},260);

        info.animate({width: '12'}, 260);
        $("#tabimg").animate({marginRight: '2'}, 198);
        $("#movsidebar").animate({right: '-300'}, 260, function () {
            $(this).hide();
        });
        $("#sombraArriba").hide();
        $("#sombraAbajo").hide();



    }

}
/*
 
 var timer2;
 var set2=0;
 function  notifyMetime2(canti)  {
 
 if(canti >= 1){
 //alert("ready");
 set2 = 1+set2;
 if(set2==1){
 alert("go")
 timer2 = setInterval(function(){ barra2() }, 4000);
 }else{
 
 }
 }
 else if(canti < 1){
 set2=0;
 //alert("clear");
 clearTimeout(timer2);
 }
 
 }	
 */

 
