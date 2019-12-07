// JavaScript Document

$(document).ready(function(e) {
	

				
     $('.sliderContent').revolution({
					delay:5000,
					startwidth:1920,
					startheight:251,
					hideThumbs:10,
					fullWidth:"on",
					forceFullWidth:"on",
					
					touchenabled:"on",
					onHoverStop:"off"
				});
				
				
	/*formulario de envio de datos */
	
	/// get idioma
		var idioma="";
		$.ajax({
				 url:"_assets/_controllers/getLang.php",
				 data:{ page: "certificados"},
				 type:"POST",
				 dataType:"json",
				 async:false,
				 success: function(data){
				
						idioma =eval(data);
						//return idi;
				 }
			});
	
	// seteo los calendarios
	var calFecha= new Date();	
	var hoy = new Date(calFecha.getFullYear(),calFecha.getMonth(),calFecha.getDate());
	var hoy2 = new Date(calFecha.getFullYear(),calFecha.getMonth(),calFecha.getDate()+1);
	$("#fechaShare,  #fecha2Share" ).datepicker({minDate:hoy,dateFormat:"dd/mm/yy" });
	
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
				var respuesta = $.post("../../_assets/_controllers/envioCertificados.php",
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
						$("select").val(0);
						
						
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
	
	
	
	
	
	
});