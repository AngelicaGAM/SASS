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
	
	/// get idioma
		var idioma="";
		$.ajax({
				 url:"_assets/_controllers/getLang.php",
				 data:{ page: "contacto"},
				 type:"POST",
				 dataType:"json",
				 async:false,
				 success: function(data){
				
						idioma =eval(data);
						//return idi;
				 }
			});   
	
	
	$("#sendPR").on("click",function(){
		$("#idEnvio").removeClass("error, accep").hide();
		var ban = true;
		if($("#namePP").val()=="")
		{ $("#errorNombre").html(idioma.formulario.validaName).show(); ban=false; }
		if($("#mail").val()=="" )
		{ $("#errorMail").html(idioma.formulario.validaMail).show(); ban=false; }
		if($("#peticiones").val()=="" )
		{ $("#errorPeticiones").html(idioma.formulario.validaPeticiones).show(); ban=false; }		
		if(ban)
		{
			/*enviar el mensaje de contacto*/
			$.ajax({
						url:"_assets/_controllers/sendContacto.php",
						type:"POST",
						data:{
								nombre:$("#namePP").val(),
								correo:$("#mail").val(),
								pais:$("#country").val(),
								city:$("#city").val(),
								tel:$("#phone").val(),
								direccion:$("#address").val(),
								comentarios:$("#peticiones").val()
							},
						success: function(data){
								
								if(data=="ok")
								{
									$("#idEnvio").addClass("accep").html(idioma.formulario.SendValido).show();
								}
								else
								{  
									$("#idEnvio").addClass("error").html(idioma.formulario.SendError).show();
								}
						}
						
				
				   });
				
		}
	});
	
	$("#namePP").on("focus",function(){
			$(this).prop("value","");
			$("#errorNombre").hide();	
	});
	
	$("#mail").on("focus",function(){
		$(this).prop("value","");
		$("#errorMail").hide();	
	});
	
	$("#country, #city, #phone, #address").on("focus",function(){
		$(this).prop("value","");	
	});
	
	$("#peticiones").on("focus",function(){
		$(this).prop("value","");
		$("#errorPeticiones").hide();	
	});
	

});