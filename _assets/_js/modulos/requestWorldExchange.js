// JavaScript Document

$(document).ready(function(e) {
    
		$('.sliderContent').revolution(
				{
					delay:5000,
					startwidth:1920,
					startheight:250,
					hideThumbs:10,
					fullWidth:"on",
					forceFullWidth:"on",
					
					touchenabled:"on",
					onHoverStop:"off"
				});	
	
		
		
		/// get idioma
		var idioma="";
		$.ajax({
				 url:"_assets/_controllers/getLang.php",
				 data:{ page: "worldExchange"},
				 type:"POST",
				 dataType:"json",
				 async:false,
				 success: function(data){
				
						idioma =eval(data);
						//return idi;
				 }
			});
			
			
		
		$("#pest li").on("click",function(){
			var value = $(this).attr("value");
			//alert(value);
			$("#pest li").removeClass("activo");
			$(this).addClass("activo");
			$("#share, #request").hide();
			$("#"+value).show();
		});
	
	
		// seteo los calendarios
		var calFecha= new Date();	
		var hoy = new Date(calFecha.getFullYear(),calFecha.getMonth(),calFecha.getDate());
		var hoy2 = new Date(calFecha.getFullYear(),calFecha.getMonth(),calFecha.getDate()+1);
	
	
		$("#fechaShare, #fechaRequest, #fecha2Share, #fecha2Request" ).datepicker({minDate:hoy,dateFormat:"dd/mm/yy" });
		
		
		/* envio share */
		$("#sendShare").on("click",function(){
			var ban=true;
			$("#idEnvioShare").css("display","none");
			if($("#resortShare").val()==idioma.formulario.campo7Valida || $("#resortShare").val()==="" || /^\s+$/.test($("#resortShare").val()))
			{
				$("#errorResortNameShare").show();
				$("#errorResortNameShare").html(idioma.formulario.campo7Valida);	
				ban=false;
			}
			if($("#fechaShare").val()==="" || /^\s+$/.test($("#fechaShare").val()))
			{
				$("#errorFechaShare").show();
				$("#errorFechaShare").html(idioma.formulario.campo8Valida);
			}
			if($("#fecha2Share").val()==="" ||  /^\s+$/.test($("#fecha2Share").val())) 
			{
				$("#errorFecha2Share").show();
				$("#errorFecha2Share").html(idioma.formulario.campo9Valida);	
			} 
			if($("#ocupacionShare").val()=="" || /^\s+$/.test($("#ocupacionShare").val()))
			{
				$("#errorOcupacionShare").css("display","block");
				$("#errorOcupacionShare").html(idioma.formulario.campo11Valida);	
				ban=false;
			}
			if($("#reservaShare").val()=="" || /^\s+$/.test($("#reservaShare").val()))
			{
					$("#errorReservaShare").css("display","block");
					$("#errorReservaShare").html(idioma.formulario.campo12Valida);	
					ban=false;
			}
			if(ban)
			{
				var respuesta = $.post("../../_assets/_controllers/envioWordExchangeShare.php",
				{
					/*datsos*/
					nombre:$("#nameShare").val(),
					correo:$("#mailShare").val(),
					pais:$("#countryShare").val(),
					ciudad:$("#cityShare").val(),
					tel:$("#phoneShare").val(),
					direccion:$("#addressShare").val(),
					resort:$("#resortShare").val(),
					checkin:$("#fechaShare").val(),
					checkout:$("#fecha2Share").val(),
					size:$("#unidadShare").val(),
					ocupancy:$("#ocupacionShare").val(),
					reservationNumber:$("#reservaShare").val(),
					additional:$("#peticionesShare").val()
					
				});
				
				respuesta.done(function(data){
					
					if(data=="ok")
					{
						//$("#wordExchange").hide();
						$("#idEnvioShare").css("display","block");
						$("#idEnvioShare").addClass("accep");
						$("#idEnvioShare").html(idioma.formulario.mensaje);	
						$(".input, .inputFecha, .inputTextA").prop("value","");
						
						
						popUp();
					}
					else
					{
						$("#idEnvioShare").css("display","block");
						$("#idEnvioShare").removeClass("accep");
						$("#idEnvioShare").addClass("error");
						$("#idEnvioShare").html(idioma.formulario.mensajeerror);
					}
				});
			}
		
		
		
	});
	
		/*envio request*/
		$("#sendRequest").on("click",function(){
			var ban=true;
			$("#idEnvioRequest").css("display","none");
			if($("#resortRequest").val()==idioma.formulario.campo7Valida || $("#resortRequest").val()==="" || /^\s+$/.test($("#resortRequest").val()))
			{
				$("#errorResortNameRequest").show();
				$("#errorResortNameRequest").html(idioma.formulario.campo7Valida);	
				ban=false;
			}
			if($("#fechaRequest").val()==="" || /^\s+$/.test($("#fechaShare").val()))
			{
				$("#errorFechaRequest").show();
				$("#errorFechaRequest").html(idioma.formulario.campo8Valida);
			}
			if($("#fecha2Request").val()==="" ||  /^\s+$/.test($("#fecha2Share").val())) 
			{
				$("#errorFecha2Request").show();
				$("#errorFecha2Request").html(idioma.formulario.campo9Valida);	
			} 
			if($("#ocupacionRequest").val()=="" || /^\s+$/.test($("#ocupacionShare").val()))
			{
				$("#errorOcupacionRequest").css("display","block");
				$("#errorOcupacionRequest").html(idioma.formulario.campo11Valida);	
				ban=false;
			}
			if($("#reservaRequest").val()=="" || /^\s+$/.test($("#reservaRequest").val()))
			{
					$("#errorReservaRequest").css("display","block");
					$("#errorReservaRequest").html(idioma.formulario.campo12Valida);	
					ban=false;
			}
			if(ban)
			{
				var respuesta = $.post("../../_assets/_controllers/envioWordExchangeRequest.php",
				{
					/*datsos*/
					nombre:$("#nameRequest").val(),
					correo:$("#mailRequest").val(),
					pais:$("#countryRequest").val(),
					ciudad:$("#cityRequest").val(),
					tel:$("#phoneRequest").val(),
					direccion:$("#addressRequest").val(),
					resort:$("#resortRequest").val(),
					checkin:$("#fechaRequest").val(),
					checkout:$("#fecha2Request").val(),
					size:$("#unidadRequest").val(),
					ocupancy:$("#ocupacionRequest").val(),
					reservationNumber:$("#reservaRequest").val(),
					additional:$("#peticionesRequest").val()
					
				});
				
				respuesta.done(function(data){
					
					if(data=="ok")
					{
						//$("#wordExchange").hide();
						$("#idEnvioRequest").css("display","block");
						$("#idEnvioRequest").addClass("accep");
						$("#idEnvioRequest").html(idioma.formulario.mensaje);	
						$(".input, .inputFecha, .inputTextA").prop("value","");
						
						
					}
					else
					{
						$("#idEnvioRequest").css("display","block");
						$("#idEnvioRequest").removeClass("accep");
						$("#idEnvioRequest").addClass("error");
						$("#idEnvioRequest").html(idioma.fomulario.mensajeerror);
					}
				});
			}
		
		
		
	});
		
	
	$(".input, .inputFecha").on("focus",function(){
		$(this).parent().find(".error").hide();
			
	});
	
	
		
			
	
}); // fin



function popUp (){ 	
	if(localStorage.getItem("sesionagencia")!="NONBREG"){
			$.fancybox(
		'<div id="InventarioRegina" class="modal"><div class="fullin colorlogo"><img class="logopopregina" src="https://members.beyond-experience.com/_assets/_images/template/logo-1000.png"/></div><img class="fullin tira" src="https://members.beyond-experience.com/_assets/_images/popupInventarioRegina/cintillo.jpg"/><div class="fondopopup"><span class="titulopop">¡Success!</span><span class="parrafopop">Thank you for your request. Soon, you will receive an email with the detailed application.</span><div class="centerpop"><div class="iblockpop w70"><img class="telefonopop" src="https://members.beyond-experience.com/_assets/_images/popupInventarioRegina/ico-telefono.png"/><span class="numerospop">	USA, CAN: 1-888-963-7689<br>Mexico: 1-800-272-0294</span></div></div></div></div>',
		{
        		'autoDimensions'	: false,
			'width'         		: 350,
			'height'        		: 'auto',
			'transitionIn'		: 'none',
			'transitionOut'		: 'none'
		}
	).trigger('#in');
	}else{
					$.fancybox(
		'<div id="InventarioRegina" class="modal"><div class="fullin colorlogo"><img class="logopopregina" src="https://members.beyond-experience.com/_assets/_images/template/logo-1000.png"/></div><img class="fullin tira" src="https://members.beyond-experience.com/_assets/_images/popupInventarioRegina/cintillo.jpg"/><div class="fondopopup"><span class="titulopop">¡Success!</span><span class="parrafopop">Thank you for your request. Soon, you will receive an email with the detailed application.</span><div class="centerpop"><div class="iblockpop w70"><img class="telefonopop" src="https://members.beyond-experience.com/_assets/_images/popupInventarioRegina/ico-telefono.png"/><span class="numerospop"></span></div></div></div></div>',
		{
        		'autoDimensions'	: false,
			'width'         		: 350,
			'height'        		: 'auto',
			'transitionIn'		: 'none',
			'transitionOut'		: 'none'
		}
	).trigger('#in');
	}
}