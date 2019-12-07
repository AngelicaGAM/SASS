$(document).ready(function(e)
{

	/*$.fancybox(
                '<link href="' + pathname + '/_assets/_css/popupInventarioRegina.css?x=' + (Math.floor(Math.random() * 100)) +'" type="text/css" rel="stylesheet">'+
                '<div id="InventarioRegina" class="modal chrono-modal">'+
                    '<div class="headerImagen">'+
                        '<img src="' + pathname + '/_assets/_images/template/logo-1000.png"/>'+
                    '</div>'+
                    '<div class="fondopopup">'+
                        '<span class="parrafopop">'+
                            '<b>Limited inventory for maintenance.</b><br />'+
                            'We apologize for any inconvenience this may cause you.<br />'+
                            'Please contact your Personal Concierge for assistance.'+
                        '</span>'+
                        '<div class="iblockpop w70">USA/CAN: 1-888-963-7689 México: 800-272-0294</div>'+
                    '</div>'+
                '</div>', {
                    'autoDimensions': false,
                    'width': 350,
                    'height': 'auto',
                    'transitionIn': 'none',
                    'transitionOut': 'none'
                }
            );*/

	$(document).on("click",".btnReservar",function(e)
	{

		e.preventDefault();

		var actual = $(this);

		var current_form_id = actual.closest("form").attr("id");
		console.log(current_form_id);

        var id                  = actual.attr("data-special-counter");
        
        var form = "#form_" +id;
        
        var padre = actual.closest(".contenedorLM");
        var html2 = padre.find(".descripcion").html();
        
        var html3 = $(html2).siblings(".special-checked");

        console.log(html3);

        $(html3).each(function(index,value)
        {

            console.log("actual html ");
            console.log(value);

            console.log("actual radio");
            console.log($(value).find(".check-chrono").val());

            var sq = $(value).find(".check-chrono").attr("checked"); 
            
            if( $(value).find(".check-chrono").val() == "1" )
            {
                console.log("checkado");
                console.log(value);
                var price       = $(value).find("input[name=lm-pricefinal]").val();
                var unit        = $(value).find("input[name=lm-unittype]").val();
                var occupancy   = $(value).find("input[name=lm-occupancy]").val();
                var invtype     = $(value).find("input[name=lm-invtype]").val();
                var inventoryID = $(value).find("input[name=lm-inventoryid]").val();

                $(form).find("input[name=gm-precioSocioCManual]").val(price);
                $(form).find("input[name=gm-precioTotalCManual]").val(price);
                $(form).find("input[name=gm-sizeCManual]").val(unit);
                $(form).find("input[name=gm-capacidadCManual]").val(occupancy);
                $(form).find("input[name=gm-invtype]").val(invtype);
                $(form).find("input[name=gm-inventoryid]").val(inventoryID);

            }

        });

		$("#"+current_form_id).submit();

	});

	// para dispara el evento que agrega al carrito la semana
	$(document).on("click",".my-add-button",function()
	{
		var elemento=$(this).data("value");
		$("#"+elemento).submit();
	});	
	
	LastMinute();
    $("#searchBuscador").click(function () {
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
            $.fancybox(
                '<link href="' + pathname + '/_assets/_css/popupInventarioRegina.css?x=' + (Math.floor(Math.random() * 100)) +'" type="text/css" rel="stylesheet">'+
                '<div id="InventarioRegina" class="modal chrono-modal">'+
                    '<div class="headerImagen">'+
                        '<img src="' + pathname + '/_assets/_images/template/logo-1000.png"/>'+
                    '</div>'+
                    '<div class="fondopopup">'+
                        '<span class="parrafopop" style="width:90%;">'+
                            '<b>Limited inventory for maintenance.</b><br />'+
                            'We apologize for any inconvenience this may cause you.<br />'+
                            'Please contact your Personal Concierge for assistance.'+
                        '</span>'+
                        '<div class="iblockpop w70">USA/CAN: 1-888-963-7689 México: 800-272-0294</div>'+
                    '</div>'+
                '</div>', {
                    'autoDimensions': false,
                    'width': 350,
                    'height': 'auto',
                    'transitionIn': 'none',
                    'transitionOut': 'none'
                }
            );
        }
	});
	 
	$(document).on("click","#cerrarPP",function()
	{
		LastMinute();
		$("#LM").val(0);
	});
	
	$( document ).on( "click", "#reservar_chronosoft", function() {
		var data = $( this ).parent().serialize();
		$.ajax({
			type	: "POST",
			//url		: "_assets/_controllers/reserveChronosoft.php",
			url		: "_assets/_controllers/getLastMinute.php",
			data	: data,
			success : function( data ) {
				console.log( data );
			}
		});
	})	

	var altura = $('.buscadorLMinute').offset().top;
	$(window).on('scroll', function(){
		if ( $(window).scrollTop() > altura+400){
			$('.buscadorLMinute').addClass('menu-fixed');
			// $('.buscadorLMinute').addClass('dib');
		} else {
			$('.buscadorLMinute').removeClass('menu-fixed');
			// $('.buscadorLMinute').removeClass('dib');
		}
	});

	$( document ).on( "click", ".check-chrono", function()
	{

		var currentHotelId = $(this).attr("data-current-item");
		var detectedRadio = ".current-item-" + currentHotelId;		

		$(detectedRadio).each(function()
		{
		    if($(this).attr("value") == 1)
		    {
		        $(this).attr("value",0);
		    }
		});

		$(this).attr("value", 1);

	});

});

function LastMinute( dia )
{
	$( "#frame" ).show();
	$( "#loading" ).show();
	$.ajax({
		url		: "_assets/_controllers/getLastMinute.php",
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
				loadingHtml		 : '<div style="margin: 1em auto; width: 1022px;"><div style="width: 150px; height: auto; margin: 0 auto; margin-top: 2em;"><img src="_assets/_images/template/loading.gif" class="loading" width="150" /><div style="font-size: 1.5em; color: #c09c74; margin: 1.5em 0 0 0; text-align: center; width: 100%;"><!--Loading......--></div></div></div>',
			    padding			 : 20,
			    autoTrigger		 : true,
			    autoTriggerUntil : 4,
			    callback		 : function() {
				    $( '.jscroll-added' ).children().unwrap();
				    $.ajax({
					    type	: "POST",
					    url		: "carrito/jcart-ajax.php",
					    success : function( data ) {
						    $( ".jcartws" ).html( data );
					    }
				    });
			    	/*$("body").trigger("validaCheckRW");
					$("input[type=checkbox]").uniform();
					$(".ultratabs").hide();*/
					$(".alertBad").css("display", "none");
					$("#datos_pp>div>span:nth-child(3)").css("display", "block");
				}
			});
			$(".alertBad").css("display", "none");
			$("#datos_pp>div>span:nth-child(3)").css("display", "block");
		}
	});
}