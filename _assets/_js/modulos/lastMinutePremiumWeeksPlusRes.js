// JavaScript Document

$(document).ready(function(e)
{
	
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
	
	LastMinute();

    $("#search").click(function()
    {
        var mantenimiento = 0;
        if (mantenimiento == 0)
        {
            if ($("#LM").val() != 0)
            {
                var LM = $("#LM").val();
                var posicon = $("#datos_pp").offset().top;
                posicon = posicon - 200;
                $("html, body").animate({
                    scrollTop: posicon + "px"
                });
                $("#datos_pp").html("");
                LastMinute(LM);
            }
            else
            {
                var posicon = $("#datos_pp").offset().top;
                posicon = posicon - 200;
                $("html, body").animate({
                    scrollTop: posicon + "px"
                });
                $("#datos_pp").html("");
                LastMinute();
                $("#LM").val(0);
            }
        }
        else
        {
			var htmlfancy =  '<link href="' + pathname + '/_assets/_css/popupInventarioRegina.css?x=' + (Math.floor(Math.random() * 100)) +'" type="text/css" rel="stylesheet">'+
			'<div id="InventarioRegina" class="modal chrono-modal">'+
				'<div class="headerImagen">'+
				
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
			$.fancybox.open({
				src:  htmlfancy,
				type:'html',
				 iframe : {
					css : {
						width : '600px',
						height :'500px'
					}
				}
			});
        }
	});
	
	$(document).on("click","#cerrarPP",function()
	{
		LastMinute();
		$("#LM").val(0);
	});

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
	
	//actualiza los datos de la semana para prepara el envio de datos en el formulario
	$( document ).on( "click", ".check-chrono", function()
	{
		// alert();
		// if($(this).is(":checked" ))
		// {

		
		// console.log("asd");

		var currentHotelId = $(this).attr("data-current-item");
		var detectedRadio = ".current-item-" + currentHotelId;
		// $(".current-item-" + currentHotelId ).attr("checked",false);
		

		$(detectedRadio).each(function()
		{
		    if($(this).attr("value") == 1)
		    {
		        $(this).attr("value",0);
		    }
		});

		$(this).attr("value", 1);


		// alert($(this).attr("data-hotel"));

		// 	var id = $(this).attr("data-id");
		// 	var form = "#form_" +id;

		// 	var price 		= $( this ).parent().find( "input[name=lm-pricefinal]" ).val();
		// 	var unit		= $( this ).parent().find( "input[name=lm-unittype]" ).val();
		// 	var occupancy	= $( this ).parent().find( "input[name=lm-occupancy]" ).val();
		// 	var invtype		= $( this ).parent().find( "input[name=lm-invtype]" ).val();
		// 	var inventoryID = $( this ).parent().find( "input[name=lm-inventoryid]" ).val();

		// 	$(form).find("input[name=gm-precioSocioCManual]").val(price);
		// 	$(form).find("input[name=gm-precioTotalCManual]").val(price);
		// 	$(form).find("input[name=gm-sizeCManual]").val(unit);
		// 	$(form).find("input[name=gm-capacidadCManual]").val(occupancy);
		// 	$(form).find("input[name=gm-invtype]").val(invtype);
		// 	$(form).find("input[name=gm-inventoryid]").val(inventoryID);
		// 	// $(form).find("input[name=folio-aplicado]").val();

		// }

	});


	
	
});

function LastMinute( dia=90 )
{

	$( "#frame" ).show();
	$( "#loading" ).show();
	$.ajax(
	{
		url		: "_assets/_controllers/getLastMinutePremiumWeeksPlusRes.php",
		type	: "POST",
		data	:
		{ 
			dia : dia, 
			id	: $( "#HiddenId" ).val()
		},
		success : function(data)
		{
			$( "#frame" ).hide();
			$( "#loading" ).hide();
			$( "#datos_pp" ).css("display","none");
			$( "#datos_pp" ).html( data );
			
			// premiumweeksplus-chronosoft-data
			premiumWeeksPlusChronosoft();

		}
	});
}

function premiumWeeksPlusChronosoft()
{

	$( "#frame" ).show();
	$( "#loading" ).show();

	$.ajax({
		url		: "_assets/_controllers/getLastMinutePremiumWeeksPlusChronosoftRes.php",
		type	: "POST",
		data	:
		{ 
			dia : null, 
			id	: $( "#HiddenId" ).val(),
			month: 1
		},
		success : function(data)
		{
			$("#frame").hide();
			$("#loading").hide();

			$("#premiumweeksplus-chronosoft-data").html(data);

			var manualDOM = $("#datos_pp .contenedorLM");
			$("#premiumweeksplus-chronosoft-data").prepend(manualDOM);
			
			$( "#premiumweeksplus-chronosoft-data" ).jscroll(
			{
				loadingHtml		 : '<div style="margin: 1em auto; width: 100%;"><div style="height: auto; margin: 0 auto; margin-top: 2em;"><img src="_assets/_images/template/loading.gif" class="loading" width="150" /></div></div>',
			    padding			 : 0,
			    autoTrigger		 : true,
			    callback		 : function()
			    {
				    $( '.jscroll-added' ).children().unwrap();

					var cantidadReal = parseInt( $("#premiumweeksplus-chronosoft-data .ocultado").length / 3) * 3;
					var vueltas = cantidadReal / 3;

					var specialBand = 1;

					if(vueltas >= 1)
					{
						$( ".ocultado" ).each(function( index,value )
						{
							
						    if( (index+1) <= cantidadReal)
							{
								if(!$(value).hasClass("mostrado"))
								{
									
									$(value).delay(500*index).fadeIn("slow",function()
									{
									
										$(value).removeClass("ocultado");
										$(value).addClass("mostrado");

									});
					    			
								}
							}

						});

						specialBand = 0;
					}

					if(specialBand == 1 && $(".current-iterator:last-child").html() > 12 )
					{
						$( ".ocultado" ).each(function( index,value )
						{

							$(value).delay(500*index).fadeIn("slow",function()
							{

								$(value).removeClass("ocultado");
				    			$(value).addClass("mostrado");

							});
				    		
						});
					}

					$(".jscroll-loading").css("display","none");
				
				}
			});

		}

	});

}