// JavaScript Document
$(document).ready(function(e) {
	
	// para dispara el evento que agrega al carrito la semana
	$(document).on("click",".my-add-button",function(){
		var elemento=$(this).data("value");
		$("#"+elemento).submit();
	});	
	
	 $('.sliderContent').revolution({
		delay			: 5000,
		startwidth		: 1920,
		startheight		: 251,
		hideThumbs		: 10,
		fullWidth		: "on",
		forceFullWidth	: "on",					
		touchenabled	: "on",
		onHoverStop		: "off"
	});	
	
	//$('.tooltipBotton').tooltipster();
	 LastMinute();
    $("#search").click(function () {
        var mantenimiento = 0;
        if (mantenimiento == 0) {
            if ($("#LM").val() != 0) {
                var LM = $("#LM").val();
                var posicon = $("#datos_pp").offset().top;
                posicon = posicon - 200;
                $("html, body").animate({
                    scrollTop: posicon + "px"
                });
                $("#datos_pp").html("");
                LastMinute(LM);
            } else {
                var posicon = $("#datos_pp").offset().top;
                posicon = posicon - 200;
                $("html, body").animate({
                    scrollTop: posicon + "px"
                });
                $("#datos_pp").html("");
                LastMinute();
                $("#LM").val(0);
            }
        } else {
            var htmlInventario = '<link href="' + pathname + '/_assets/_css/popupInventarioRegina.css?x=' + (Math.floor(Math.random() * 100)) +'" type="text/css" rel="stylesheet">'+
            '<div id="InventarioRegina" class="modal chrono-modal">'+
                '<div class="headerImagen">'+
                    '<img src="' + pathname + '/_assets/_images/template/logo-1000.png"/>'+
                '</div>'+
                '<div class="fondopopup">'+
                    '<span class="parrafopop" style="width:90%;">'+
                        '<b>Inventario limitado por mantenimiento.</b><br />'+
                        'Lamentamos las molestias que esto pueda causarle.<br />'+
                        'Por favor contacte a su Concierge Personal para asistencia.'+
                    '</span>'+
                    '<div class="iblockpop w70">USA/CAN: 1-888-963-7689 México: 01-800-272-0294</div>'+
                '</div>'+
            '</div>';

          	$.fancybox.open(htmlInventario, {
				type: 'iframe'
			})
        }
	});
	
	$(document).on("click","#cerrarPP",function(){
		LastMinute();
		$("#LM").val(0);
	});
	
	$( document ).on( "click", "#reservar_chronosoft", function() {
		var data = $( this ).parent().serialize();
		$.ajax({
			type	: "POST",
			//url		: "_assets/_controllers/reserveChronosoft.php",
			url		: "_assets/_controllers/getLastMinuteRes.php",
			data	: data,
			success : function( data ) {
				console.log( data );
			}
		});
	})

	var altura = $('.buscadorLMinute').offset().top;
	$(window).on('scroll', function () {
		if ($(window).scrollTop() > altura + 400) {
			$('.buscadorLMinute').addClass('menu-fixed');
			// $('.buscadorLMinute').addClass('dib');
		} else {
			$('.buscadorLMinute').removeClass('menu-fixed');
			// $('.buscadorLMinute').removeClass('dib');
		}
	});
	
	$( document ).on( "click", ".check-chrono", function() {
		if( $( this ).is( ":checked" ) ) {
			console.log( "Checado" );
			var price 		= $( this ).parent().find( "input[name=lm-pricefinal]" ).val();
			var unit		= $( this ).parent().find( "input[name=lm-unittype]" ).val();
			var occupancy	= $( this ).parent().find( "input[name=lm-occupancy]" ).val();
			var invtype		= $( this ).parent().find( "input[name=lm-invtype]" ).val();
			var inventoryID = $( this ).parent().find( "input[name=lm-inventoryid]" ).val();
			$( this ).parent().parent().parent().parent().find( "input[name=gm-precioSocioCManual]" ).val( price );
			$( this ).parent().parent().parent().parent().find( "input[name=gm-precioTotalCManual]" ).val( price );
			$( this ).parent().parent().parent().parent().find( "input[name=gm-sizeCManual]" ).val( unit );
			$( this ).parent().parent().parent().parent().find( "input[name=gm-capacidadCManual]" ).val( occupancy );
			$( this ).parent().parent().parent().parent().find( "input[name=gm-invtype]" ).val( invtype );
			$( this ).parent().parent().parent().parent().find( "input[name=gm-inventoryid]" ).val( inventoryID );
		}
	});
	
});

function LastMinute( dia ) {
	$( "#frame" ).show();
	$( "#loading" ).show();
	$.ajax({
		url		: "_assets/_controllers/getLastMinuteRes.php",
		type	: "POST",
		data	: { 
			dia : dia, 
			id	: $( "#HiddenId" ).val()
		},
		success : function( data ) {
			$( "#frame" ).hide();
			$( "#loading" ).hide();
			$( "#datos_pp" ).html( data );
			$( "#datos_pp" ).jscroll({
				loadingHtml		 : '<div style="margin: 1em auto; width: 100%;"><div style="width: 100%; height: auto; margin: 0 auto; margin-top: 2em;"><img src="_assets/_images/template/loading.gif" class="loading" width="150" /><div style="font-size: 1.5em; color: #c09c74; margin: 1.5em 0 0 0; text-align: center; width: 100%;"><!--Loading......--></div></div></div>',
			    padding			 : 20,
			    autoTrigger		 : true,
			    autoTriggerUntil : 4,
			    callback		 : function() {
				    $( '.jscroll-added' ).children().unwrap();
			    	/*$("body").trigger("validaCheckRW");
					$("input[type=checkbox]").uniform();
					$(".ultratabs").hide();*/
					$.ajax({
					    type	: "POST",
					    url		: "carrito/jcart-ajax.php",
					    success : function( data ) {
						    $( ".jcartws" ).html( data );
					    }
					});
					$(".alertBad").css("display", "none");
					$("#datos_pp>div>span:nth-child(3)").css("display", "block");
				}
			});
			$(".alertBad").css("display", "none");
			$("#datos_pp>div>span:nth-child(3)").css("display", "block");
		}
	});
}