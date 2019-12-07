
// JavaScript Document
$(document).ready(function(e) {
	
	
	
	 
	 $('.sliderContent').revolution(
				{
					delay:5000,
					startwidth:1920,
					startheight:251,
					hideThumbs:10,
					fullWidth:"on",
					forceFullWidth:"on",
					
					touchenabled:"on",
					onHoverStop:"off"
				});	
	
	
	//////////////////////////////////////////////////////////
	/// get idioma
		var idioma="";
		$.ajax({
				 url:pathname+"/_assets/_controllers/getLang.php",
				 data:{ page: "perfil"},
				 type:"POST",
				 dataType:"json",
				 async:false,
				 success: function(data){
				
						idioma =eval(data);
						//return idi;
				 }
			});   
	
	
	
	
			
	///////////////////////////////////////////////		
	// edicion de pass					
	
	$(document).on("click","#pencil",function(){
			$("#muestra").slideUp(50,function(){
				$("#cambio").slideDown(60);
				$("#pass").prop("value","");	
				$("#pass").focus();	
			});		
	});
	
	
  $(document).on("click","#cancel",function(){
			$("#cambio").slideUp(50,function(){
				$("#muestra").slideDown(60);	
			});		
	});
	
	
	$("#pass").focus(function(){
		$("#errorNombre").css("display","none");
		$("#errorNombre").html("");	
		});
	
	$(document).on("click","#accep",function(){
		
		var ban=true;
		if($("#pass").val()=="" || /^\s+$/.test($("#pass").val()) )
		{
			ban=false;
			$("#errorNombre").css("display","block");
			$("#errorNombre").html(idioma.valida2);	
		}
		
		if(ban)
		{
			var respuesta = $.post(pathname+"/_assets/_controllers/cambioPass.php",
			{
				pass:$("#pass").val(),
								
			});
			
			respuesta.done(function(data){
				if(data=="ok")
				{
					
					$("#mensajeC").css("display","block");
					$("#mensajeC").html(idioma.validaOk);
					setTimeout(function(){
										$("#mensajeC").css("display","none");
										$("#mensajeC").html("");
										$("#cambio").slideUp(50,function(){
											
											$.get(pathname+"/_assets/_controllers/getPass.php",function(data){
													$("#muestra").html(data+' <span class="icon-pencil" id="pencil"></span>');
											});
											
											$("#muestra").slideDown(60);	
										});		
									}, 1500);	
				}
			});
		}
		
			
	});
	
	
	//////////////////////////////////////////////////////////////
	// Funcionamiento del los checkbox
	
	$(document).on("click",".checkclic",function(){
		
			var respuesta = $.post(pathname+"/_assets/_controllers/setPrincipal.php",
			{
				op:$(this).val(),
								
			});
			
			respuesta.done(function(data){
				checarPrincipal();
			});
		
	});
	
	/////////////////////////////////////////////////////////////
	// Funcionamiento de boton de edicion/finalizar
	
	$(document).on("click","#botonEdicion", function(){
		
		if($(this).text()==idioma.boton1)
		{
			$('[class^="icon-"]').show();
			checarcorreo();
			checarPrincipal();
			$(this).text(idioma.boton2);
			
			
			
		}
		else
		{
			$('[class^="icon-"]').hide();
			checarPrincipalEdicion();
			$(this).text(idioma.boton1);
				
		}
		
	});	
	///////////////////////
	$(document).on("click","#botonEdicionCotitular", function(){
		
		if($(this).text()=="Edit Co-owner")
		{
			$('.penCo').show();

			$(this).text(idioma.boton2);
		}
		else
		{
			$('.penCo').hide();

			$(this).text("Edit Co-owner");
		}
		
	});
		$(document).on("click","#botonEdicionBeneficiario", function(){
		
		if($(this).text()=="Edit Beneficiary")
		{
			$('.penBe').show();

			$(this).text(idioma.boton2);
		}
		else
		{
			$('.penBe').hide();

			$(this).text("Edit Beneficiary");
		}
		
	});
	
		
		$(document).on("click",".addBe", function(){
			var num = $(this).data('val');
		
			var respuesta = $.post(pathname+"/_assets/_controllers/addBe.php",
			{
				num:num,
								
			});
			
			respuesta.done(function(data){
				location.reload();
			});
	});
	//////////////
	//checo si tiene un correo adicional ya ingresado y muestro los campos
	function checarcorreo(){
	$.get(pathname+"/_assets/_controllers/getEmailSecundario.php",function(data){
					if(data=="")
					{
						
						$("#emailAdicionalTitulo").hide();
						$("#emailAdicionalInfo").hide();
						//$("#plus").show();
						//$("#pencilEmail").hide();
												
					}
					else
					{
						
						$("#emailAdicionalTitulo").show();
						$("#emailAdicionalInfo").show();
						$("#plus").hide();
						//$("#pencilEmail").show();
						
					}

				});
	}
	
	
	//checo si tiene un correo adicional ya ingresado y muestro los campos
	function checarPrincipal(){
	$.get(pathname+"/_assets/_controllers/getPrincipal.php",function(data){
		
					if(data==0)
					{
						
						$("#divEmail").html(' &nbsp; <span class="Principal">(Principal)</span>');
						$("#divEmailAdicional").html(' &nbsp; <input value="adicional" class="checkclic" type="checkbox"  />Principal');
						
					}
					else
					{
						$("#divEmail").html(' &nbsp; <input value="email" class="checkclic" type="checkbox"  />Principal');
						$("#divEmailAdicional").html(' &nbsp; <span class="Principal">(Principal)</span>');
					}

				});
	}
	
	
	//checo si tiene un correo adicional para mostrar el dato cuando se pulsa el boton de finalizar la edicion
	function checarPrincipalEdicion(){
	$.get(pathname+"/_assets/_controllers/getPrincipal.php",function(data){
		
					if(data==0)
					{
						
						$("#divEmail").html(' &nbsp; <span class="Principal">(Principal)</span>');
						$("#divEmailAdicional").html('');
						
					}
					else
					{
						$("#divEmail").html('');
						$("#divEmailAdicional").html(' &nbsp; <span class="Principal">(Principal)</span>');
					}

				});
	}
	
	
	checarcorreo();
	checarPrincipalEdicion();
	
	
	//////////////////////////////////////////////////////////////
	//  agrego el Mail secundario
		
	
	
	$(document).on("click","#plus",function(){
			//$("#muestraMailSecundario").slideUp(50,function(){
				$("#cambioAgregaEmail").slideDown(60);
				$("#agregaEmail").prop("value","");	
				$("#agregaEmail").focus();	
				
			//});		
	});
	
	
	$(document).on("click","#cancelAgregaEmail",function(){
				$("#cambioAgregaEmail").slideUp(50,function(){
				$("#muestraEmail").slideDown(60);	
			});		
	});
	
	
	$("#agregaEmail").focus(function(){
		$("#errorAgregaEmail").css("display","none");
		$("#errorAgregaEmail").html("");	
		});
	
	
	$(document).on("click","#accepAgregaEmail",function(){
		
		var ban=true;
		if($("#agregaEmail").val()=="" || /^\s+$/.test($("#agregaEmail").val()) )
		{
			ban=false;
			$("#errorAgregaEmail").css("display","block");
			$("#errorAgregaEmail").html(idioma.valida4);	
		}
		
		
		
		if(ban)
		{
			var respuesta = $.post(pathname+"/_assets/_controllers/correoSecundario.php",
			{
				correo:$("#agregaEmail").val(),
								
			});
			
			respuesta.done(function(data){
				if(data=="ok")
				{
					
					$("#mensajeCAgregaEmail").css("display","block");
					$("#mensajeCAgregaEmail").html(idioma.validaOk);
					$("#agregaEmail").hide();
					$("#accepAgregaEmail").hide();
					$("#cancelAgregaEmail").hide();
					
					setTimeout(function(){
										$("#mensajeCAgregaEmail").css("display","none");
										$("#mensajeCAgregaEmail").html("");
										//$("#cambioMailSecundario").slideUp(50,function(){
											
											$.get(pathname+"/_assets/_controllers/getEmailSecundario.php",function(data){
												$("#emailAdicionalTitulo").show();
												$("#emailAdicionalInfo").show();
												$("#muestraMailSecundario").html(data+' <span class="icon-pencil" id="edicionEmailAdicional"></span><div id="divEmailAdicional" style="float:right;" ></div>');
												$("#plus").hide();
												checarPrincipal();
												//$("#pencilEmail").show();
												
											});
											
											//$("#mailSecundario").slideDown(60);	
										//});		
									}, 1500);	
				}
			});
		}
		
			
	});
	
	
	
	
	/////////////////////////////////////////////////	
	// edicion de email				
		
	$(document).on("click","#pencilEmail",function(){
			$("#muestraEmail").slideUp(50,function(){
				$("#cambioEmail").slideDown(60);
				$("#edicionEmail").prop("value","");	
				$("#edicionEmail").focus();	
			});		
	});
	
	
  $(document).on("click","#cancelEmail",function(){
			$("#cambioEmail").slideUp(50,function(){
				$("#muestraEmail").slideDown(60);	
			});		
	});
	
	
	$("#edicionEmail").focus(function(){
		$("#errorEmail").css("display","none");
		$("#errorEmail").html("");	
		});
	
	$(document).on("click","#accepEmail",function(){
		
		var ban=true;
		if($("#edicionEmail").val()=="" || /^\s+$/.test($("#edicionEmail").val()) )
		{
			ban=false;
			$("#errorEmail").css("display","block");
			$("#errorEmail").html(idioma.valida3);	
		}
		
		if(ban)
		{
			var respuesta = $.post(pathname+"/_assets/_controllers/editarCorreo.php",
			{
				correo:$("#edicionEmail").val(),
								
			});
			
			respuesta.done(function(data){
				if(data=="ok")
				{
					
					$("#mensajeCEmail").css("display","block");
					$("#mensajeCEmail").html(idioma.validaOk);
					setTimeout(function(){
										$("#mensajeCEmail").css("display","none");
										$("#mensajeCEmail").html("");
										$("#cambioEmail").slideUp(50,function(){
											
											$.get(pathname+"/_assets/_controllers/getEmail.php",function(data){
													$("#muestraEmail").html(data+' <span id="plus" class="icon-plus"></span> <span class="icon-pencil" id="pencilEmail"></span><div id="divEmail" style="float:right;" ></div>');
											
											checarcorreo();
											checarPrincipal();
											});
											
											$("#muestraEmail").slideDown(60);	
										});		
									}, 1500);
						
				}
			});
		}
		
			
	});
	
	
	
	
	
	
	/////////////////////////////////////////////////	
	// edicion de email	adicional			
		
	$(document).on("click","#edicionEmailAdicional",function(){
			$("#muestraMailSecundario").slideUp(50,function(){
				$("#cambioMailSecundario").slideDown(60);
				$("#edicioMailSecundario").prop("value","");	
				$("#edicionMailSecundario").focus();	
			});		
	});
	
	
  $(document).on("click","#cancelMailSecundario",function(){
			$("#cambioMailSecundario").slideUp(50,function(){
				$("#muestraMailSecundario").slideDown(60);	
			});		
	});
	
	
	$("#edicionMailSecundario").focus(function(){
		$("#errorMailSecundario").css("display","none");
		$("#errorMailSecundario").html("");	
		});
	
	$(document).on("click","#accepMailSecundario",function(){
		
		var ban=true;
		if($("#edicionMailSecundario").val()=="" || /^\s+$/.test($("#edicionMailSecundario").val()) )
		{
			ban=false;
			$("#errorMailSecundario").css("display","block");
			$("#errorMailSecundario").html(idioma.valida4);	
		}
		
		if(ban)
		{
			var respuesta = $.post(pathname+"/_assets/_controllers/editarCorreoSecundario.php",
			{
				correo:$("#edicionMailSecundario").val(),
								
			});
			
			respuesta.done(function(data){
				if(data=="ok")
				{
					
					$("#mensajeCMailSecundario").css("display","block");
					$("#mensajeCMailSecundario").html(idioma.validaOk);
					setTimeout(function(){
										$("#mensajeCMailSecundario").css("display","none");
										$("#mensajeCMailSecundario").html("");
										$("#cambioMailSecundario").slideUp(50,function(){
											
											$.get(pathname+"/_assets/_controllers/getEmailSecundario.php",function(data){
													$("#muestraMailSecundario").html(data+' <span class="icon-pencil" id="edicionEmailAdicional"></span><div id="divEmailAdicional" style="float:right;" ></div>');
											checarPrincipal();
											});
											
											$("#muestraMailSecundario").slideDown(60);	
										});		
									}, 1500);	
				}
			});
		}
		
			
	});
	
	
	
	
	
	/////////////////////////////////////////////////	
	// edicion de nombre			
		
	$(document).on("click","#pencilNombre",function(){
			$("#muestraNombre").slideUp(50,function(){
				$("#cambioNombre").slideDown(60);
				$("#nombre").prop("value","");	
				$("#nombre").focus();	
			});		
	});
	
	
  $(document).on("click","#cancelNombre",function(){
			$("#cambioNombre").slideUp(50,function(){
				$("#muestraNombre").slideDown(60);	
			});		
	});
	
	
	$("#nombre").focus(function(){
		$("#errorNombreEdicion").css("display","none");
		$("#errorNombreEdicion").html("");	
		});
	
	$(document).on("click","#accepNombre",function(){
		
		var ban=true;
		if($("#nombre").val()=="" || /^\s+$/.test($("#nombre").val()) )
		{
			ban=false;
			$("#errorNombreEdicion").css("display","block");
			$("#errorNombreEdicion").html(idioma.valida1);	
		}
		
		if(ban)
		{
			var respuesta = $.post(pathname+"/_assets/_controllers/editarNombre.php",
			{
				nombre:$("#nombre").val(),
								
			});
			
			respuesta.done(function(data){
				if(data=="ok")
				{
					
					$("#mensajeCNombre").css("display","block");
					$("#mensajeCNombre").html(idioma.validaOk);
					setTimeout(function(){
										$("#mensajeCNombre").css("display","none");
										$("#mensajeCNombre").html("");
										$("#cambioNombre").slideUp(50,function(){
											
											$.get(pathname+"/_assets/_controllers/getNombre.php",function(data){
													$("#muestraNombre").html(data+' <span class="icon-pencil" id="pencilNombre"></span>');
											});
											
											$("#muestraNombre").slideDown(60);	
										});		
									}, 1500);	
				}
			});
		}
		
			
	});
	
	
	
	
	
	/////////////////////////////////////////////////	
	// edicion de telefono			
		
	$(document).on("click","#pencilTelefono",function(){
			$("#muestraTelefono").slideUp(50,function(){
				$("#cambioTelefono").slideDown(60);
				$("#telefono").prop("value","");	
				$("#telefono").focus();	
			});		
	});
	
	
  $(document).on("click","#cancelTelefono",function(){
			$("#cambioTelefono").slideUp(50,function(){
				$("#muestraTelefono").slideDown(60);	
			});		
	});
	
	
	$("#telefono").focus(function(){
		$("#errorTelefonoEdicion").css("display","none");
		$("#errorTelefonoEdicion").html("");	
		});
	
	$(document).on("click","#accepTelefono",function(){
		
		var ban=true;
		if($("#telefono").val()=="" || /^\s+$/.test($("#telefono").val()) )
		{
			ban=false;
			$("#errorTelefonoEdicion").css("display","block");
			$("#errorTelefonoEdicion").html(idioma.valida5);	
		}
		
		if(ban)
		{
			var respuesta = $.post(pathname+"/_assets/_controllers/editarTelefono.php",
			{
				telefono:$("#telefono").val(),
								
			});
			
			respuesta.done(function(data){
				if(data=="ok")
				{
					
					$("#mensajeCTelefono").css("display","block");
					$("#mensajeCTelefono").html(idioma.validaOk);
					setTimeout(function(){
										$("#mensajeCTelefono").css("display","none");
										$("#mensajeCTelefono").html("");
										$("#cambioTelefono").slideUp(50,function(){
											
											$.get(pathname+"/_assets/_controllers/getTelefono.php",function(data){
													$("#muestraTelefono").html(data+' <span class="icon-pencil" id="pencilTelefono"></span>');
											});
											
											$("#muestraTelefono").slideDown(60);	
										});		
									}, 1500);	
				}
			});
		}
		
			
	});
	
	
	
		////////////////////////////////////////////////////////////////////////
		$(document).on("click","#pencilNombreCotitular",function(){
			$("#muestraNombreCotitular").slideUp(50,function(){
				$("#cambioNombreCotitular").slideDown(60);
				$("#nombreCotitular").prop("value","");	
				$("#nombreCotitular").focus();	
			});		
	});
	
	
  $(document).on("click","#cancelNombreCotitular",function(){
			$("#cambioNombreCotitular").slideUp(50,function(){
				$("#muestraNombreCotitular").slideDown(60);	
			});		
	});
	
	
	$("#nombreCotitular").focus(function(){
		$("#errorNombreEdicionCotitular").css("display","none");
		$("#errorNombreEdicionCotitular").html("");	
		});
	
	$(document).on("click","#accepNombreCotitular",function(){
		
		var ban=true;
		if($("#nombreCotitular").val()=="" || /^\s+$/.test($("#nombreCotitular").val()) )
		{
			ban=false;
			$("#errorNombreEdicionCotitular").css("display","block");
			$("#errorNombreEdicionCotitular").html(idioma.valida1);	
		}
		
		if(ban)
		{
			var respuesta = $.post(pathname+"/_assets/_controllers/editarNombreCotitular.php",
			{
				nombre:$("#nombreCotitular").val(),
								
			});
			
			respuesta.done(function(data){
				console.log("hola");
				if(data=="ok")
				{
					
					$("#mensajeNombreCotitular").css("display","block");
					$("#mensajeNombreCotitular").html(idioma.validaOk);
					setTimeout(function(){
										$("#mensajeNombreCotitular").css("display","none");
										$("#mensajeNombreCotitular").html("");
										$("#cambioNombreCotitular").slideUp(50,function(){
											
											$.get(pathname+"/_assets/_controllers/getNombreCotitular.php",function(data){
													$("#muestraNombreCotitular").html(data+' <span class="icon-pencil penCo" id="pencilNombreCotitular"></span>');
											});
											
											$("#muestraNombreCotitular").slideDown(60);	
										});		
									}, 1500);	
				}
			});
		}
		
			
	});
	
	
	/////////////////////////////////////////////////	
	//apellido cotitular
	//////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////
		$(document).on("click","#pencilApellidoCotitular",function(){
			$("#muestraApellidoCotitular").slideUp(50,function(){
				$("#cambioApellidoCotitular").slideDown(60);
				$("#apellidoCotitular").prop("value","");	
				$("#apellidoCotitular").focus();	
			});		
	});
	
	
  $(document).on("click","#cancelApellidoCotitular",function(){
			$("#cambioApellidoCotitular").slideUp(50,function(){
				$("#muestraApellidoCotitular").slideDown(60);	
			});		
	});
	
	
	$("#apellidoCotitular").focus(function(){
		$("#errorApellidoEdicionCotitular").css("display","none");
		$("#errorApellidoEdicionCotitular").html("");	
		});
	
	$(document).on("click","#accepApellidoCotitular",function(){
		
		var ban=true;
		if($("#apellidoCotitular").val()=="" || /^\s+$/.test($("#apellidoCotitular").val()) )
		{
			ban=false;
			$("#errorApellidoEdicionCotitular").css("display","block");
			$("#errorApellidoEdicionCotitular").html(idioma.valida1);	
		}
		
		if(ban)
		{
			var respuesta = $.post(pathname+"/_assets/_controllers/editarApellidoCotitular.php",
			{
				apellido:$("#apellidoCotitular").val(),
								
			});
			
			respuesta.done(function(data){
				console.log("hola");
				if(data=="ok")
				{
					
					$("#mensajeApellidoCotitular").css("display","block");
					$("#mensajeApellidoCotitular").html(idioma.validaOk);
					setTimeout(function(){
										$("#mensajeApellidoCotitular").css("display","none");
										$("#mensajeApellidoCotitular").html("");
										$("#cambioApellidoCotitular").slideUp(50,function(){
											
											$.get(pathname+"/_assets/_controllers/getApellidoCotitular.php",function(data){
													$("#muestraApellidoCotitular").html(data+' <span class="icon-pencil penCo" id="pencilApellidoCotitular"></span>');
											});
											
											$("#muestraApellidoCotitular").slideDown(60);	
										});		
									}, 1500);	
				}
			});
		}
		
			
	});
	
	///////////////////////////////
	
		/////////////////////////////////////////////////	
	//telefono cotitular
	//////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////
		$(document).on("click","#pencilTelefonoCotitular",function(){
			$("#muestraTelefonoCotitular").slideUp(50,function(){
				$("#cambioTelefonoCotitular").slideDown(60);
				$("#telefonoCotitular").prop("value","");	
				$("#telefonoCotitular").focus();	
			});		
	});
	
	
  $(document).on("click","#cancelTelefonoCotitular",function(){
			$("#cambioTelefonoCotitular").slideUp(50,function(){
				$("#muestraTelefonoCotitular").slideDown(60);	
			});		
	});
	
	
	$("#telefonoCotitular").focus(function(){
		$("#errorTelefonoEdicionCotitular").css("display","none");
		$("#errorTelefonoEdicionCotitular").html("");	
		});
	
	$(document).on("click","#accepTelefonoCotitular",function(){
		
		var ban=true;
		if($("#telefonoCotitular").val()=="" || /^\s+$/.test($("#telefonoCotitular").val()) )
		{
			ban=false;
			$("#errorTelefonoEdicionCotitular").css("display","block");
			$("#errorTelefonoEdicionCotitular").html(idioma.valida1);	
		}
		
		if(ban)
		{
			var respuesta = $.post(pathname+"/_assets/_controllers/editarTelefonoCotitular.php",
			{
				telefono:$("#telefonoCotitular").val(),
								
			});
			
			respuesta.done(function(data){
				console.log("hola");
				if(data=="ok")
				{
				console.log("hola");

					$("#mensajeTelefonoCotitular").css("display","block");
					$("#mensajeTelefonoCotitular").html(idioma.validaOk);
					setTimeout(function(){
										$("#mensajeTelefonoCotitular").css("display","none");
										$("#mensajeTelefonoCotitular").html("");
										$("#cambioTelefonoCotitular").slideUp(50,function(){
											
											$.get(pathname+"/_assets/_controllers/getTelefonoCotitular.php",function(data){
													$("#muestraTelefonoCotitular").html(data+' <span class="icon-pencil penCo" id="pencilTelefono"></span>');
											});
											
											$("#muestraTelefonoCotitular").slideDown(60);	
										});		
									}, 1500);	
				}
			});
		}
		
			
	});
	
	///////////////////////////////
			/////////////////////////////////////////////////	
	//email cotitular
	//////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////
		$(document).on("click","#pencilEmailCotitular",function(){
			$("#muestraEmailCotitular").slideUp(50,function(){
				$("#cambioEmailCotitular").slideDown(60);
				$("#emailCotitular").prop("value","");	
				$("#emailCotitular").focus();	
			});		
	});
	
	
  $(document).on("click","#cancelEmailCotitular",function(){
			$("#cambioEmailCotitular").slideUp(50,function(){
				$("#muestraEmailCotitular").slideDown(60);	
			});		
	});
	
	
	$("#emailCotitular").focus(function(){
		$("#errorEmailCotitularEdicion").css("display","none");
		$("#errorEmailCotitularEdicion").html("");	
		});
	
	$(document).on("click","#accepEmailCotitular",function(){
		
		var ban=true;
		if($("#emailCotitular").val()=="" || /^\s+$/.test($("#emailCotitular").val()) )
		{
			ban=false;
			$("#errorEmailCotitularEdicion").css("display","block");
			$("#errorEmailCotitularEdicion").html(idioma.valida1);	
		}
		
		if(ban)
		{
			var respuesta = $.post(pathname+"/_assets/_controllers/editarEmailCotitular.php",
			{
				email:$("#emailCotitular").val(),
								
			});
			
			respuesta.done(function(data){
				if(data=="ok")
				{
					
					$("#mensajeEmailCotitular").css("display","block");
					$("#mensajeEmailCotitular").html(idioma.validaOk);
					setTimeout(function(){
										$("#mensajeEmailCotitular").css("display","none");
										$("#mensajeEmailCotitular").html("");
										$("#cambioEmailCotitular").slideUp(50,function(){
											
											$.get(pathname+"/_assets/_controllers/getEmailCotitular.php",function(data){
													$("#muestraEmailCotitular").html(data+' <span class="icon-pencil" id="pencilEmail"></span>');
											});
											
											$("#muestraEmailCotitular").slideDown(60);	
										});		
									}, 1500);	
				}
			});
		}
		
			
	});
	
	///////////////////////////////
		///////////////////////////////
		//nombreBeneficiario
	//////////////////////////////////////////
		////////cantidad////////////////////////////////////////////////////////////////
//	for (var i=0; i<=4; i++) {
    

	//////////
$(document).on("click","#pencilNombreBeneficiario1",function(){
			$("#muestraNombreBeneficiario1").slideUp(50,function(){
				$("#cambioNombreBeneficiario1").slideDown(60);
				$("#nombreBeneficiario1").prop("value","");	
				$("#nombreBeneficiario1").focus();	
			});		
	});
	
	
  $(document).on("click","#cancelNombreBeneficiario1",function(){
			$("#cambioNombreBeneficiario1").slideUp(50,function(){
				$("#muestraNombreBeneficiario1").slideDown(60);	
			});		
	});
	
	
	$("#nombreBeneficiario1").focus(function(){
		$("#errorNombreBeneficiarioEdicion1").css("display","none");
		$("#errorNombreBeneficiarioEdicion1").html("");	
		});
	
	$(document).on("click","#accepNombreBeneficiario1",function(){
		
		var ban=true;
		if($("#nombreBeneficiario1").val()=="" || /^\s+$/.test($("#nombreBeneficiario1").val()) )
		{
			ban=false;
			$("#errorNombreBeneficiarioEdicion1").css("display","block");
			$("#errorNombreBeneficiarioEdicion1").html(idioma.valida1);	
		}
		
		if(ban)
		{
			var respuesta = $.post(pathname+"/_assets/_controllers/editarNombreBeneficiario.php",
			{
				nombre:$("#nombreBeneficiario1").val(),
				num:1,
			});
			
			respuesta.done(function(data){
				if(data=="ok")
				{
					
					$("#mensajeNombreBeneficiario1").css("display","block");
					$("#mensajeNombreBeneficiario1").html(idioma.validaOk);
					setTimeout(function(){
										$("#mensajeNombreBeneficiario1").css("display","none");
										$("#mensajeNombreBeneficiario1").html("");
										$("#cambioNombreBeneficiario1").slideUp(50,function(){
											
											$.get(pathname+"/_assets/_controllers/getNombreBeneficiario1.php",function(data){
													$("#muestraNombreBeneficiario1").html(data+' <span class="icon-pencil" id="pencilNombreBeneficiario1');
											});
											
											$("#muestraNombreBeneficiario1").slideDown(60);	
										});		
									}, 1500);	
				}
			});
		}
		
			
	});
	
	///////////////////////////////
		
	//	}
	
	////////////////////
			////////cantidad////////////////////////////////////////////////////////////////
//	for (var i=0; i<=4; i++) {
    

	//////////
$(document).on("click","#pencilNombreBeneficiario2",function(){
			$("#muestraNombreBeneficiario2").slideUp(50,function(){
				$("#cambioNombreBeneficiario2").slideDown(60);
				$("#nombreBeneficiario2").prop("value","");	
				$("#nombreBeneficiario2").focus();	
			});		
	});
	
	
  $(document).on("click","#cancelNombreBeneficiario2",function(){
			$("#cambioNombreBeneficiario2").slideUp(50,function(){
				$("#muestraNombreBeneficiario2").slideDown(60);	
			});		
	});
	
	
	$("#nombreBeneficiario2").focus(function(){
		$("#errorNombreBeneficiarioEdicion2").css("display","none");
		$("#errorNombreBeneficiarioEdicion2").html("");	
		});
	
	$(document).on("click","#accepNombreBeneficiario2",function(){
		
		var ban=true;
		if($("#nombreBeneficiario2").val()=="" || /^\s+$/.test($("#nombreBeneficiario2").val()) )
		{
			ban=false;
			$("#errorNombreBeneficiarioEdicion2").css("display","block");
			$("#errorNombreBeneficiarioEdicion2").html(idioma.valida1);	
		}
		
		if(ban)
		{
			var respuesta = $.post(pathname+"/_assets/_controllers/editarNombreBeneficiario.php",
			{
				nombre:$("#nombreBeneficiario2").val(),
				num:2,
			});
			
			respuesta.done(function(data){
				if(data=="ok")
				{
					
					$("#mensajeNombreBeneficiario2").css("display","block");
					$("#mensajeNombreBeneficiario2").html(idioma.validaOk);
					setTimeout(function(){
										$("#mensajeNombreBeneficiario2").css("display","none");
										$("#mensajeNombreBeneficiario2").html("");
										$("#cambioNombreBeneficiario2").slideUp(50,function(){
											
											$.get(pathname+"/_assets/_controllers/getNombreBeneficiario2.php",function(data){
													$("#muestraNombreBeneficiario2").html(data+' <span class="icon-pencil" id="pencilNombreBeneficiario2');
											});
											
											$("#muestraNombreBeneficiario2").slideDown(60);	
										});		
									}, 1500);	
				}else{
									
				}
			});
		}
		
			
	});
	
	///////////////////////////////
		
	//	}
	
	////////////////////
			////////cantidad////////////////////////////////////////////////////////////////
//	for (var i=0; i<=4; i++) {
    

	//////////
$(document).on("click","#pencilNombreBeneficiario3",function(){
			$("#muestraNombreBeneficiario3").slideUp(50,function(){
				$("#cambioNombreBeneficiario3").slideDown(60);
				$("#nombreBeneficiario3").prop("value","");	
				$("#nombreBeneficiario3").focus();	
			});		
	});
	
	
  $(document).on("click","#cancelNombreBeneficiario3",function(){
			$("#cambioNombreBeneficiario3").slideUp(50,function(){
				$("#muestraNombreBeneficiario3").slideDown(60);	
			});		
	});
	
	
	$("#nombreBeneficiario3").focus(function(){
		$("#errorNombreBeneficiarioEdicion3").css("display","none");
		$("#errorNombreBeneficiarioEdicion3").html("");	
		});
	
	$(document).on("click","#accepNombreBeneficiario3",function(){
		
		var ban=true;
		if($("#nombreBeneficiario3").val()=="" || /^\s+$/.test($("#nombreBeneficiario3").val()) )
		{
			ban=false;
			$("#errorNombreBeneficiarioEdicion3").css("display","block");
			$("#errorNombreBeneficiarioEdicion3").html(idioma.valida1);	
		}
		
		if(ban)
		{
			var respuesta = $.post(pathname+"/_assets/_controllers/editarNombreBeneficiario.php",
			{
				nombre:$("#nombreBeneficiario3").val(),
				num:3,
			});
			
			respuesta.done(function(data){
				if(data=="ok")
				{
					
					$("#mensajeNombreBeneficiario3").css("display","block");
					$("#mensajeNombreBeneficiario3").html(idioma.validaOk);
					setTimeout(function(){
										$("#mensajeNombreBeneficiario3").css("display","none");
										$("#mensajeNombreBeneficiario3").html("");
										$("#cambioNombreBeneficiario3").slideUp(50,function(){
											
											$.get(pathname+"/_assets/_controllers/getNombreBeneficiario3.php",function(data){
													$("#muestraNombreBeneficiario3").html(data+' <span class="icon-pencil" id="pencilNombreBeneficiario3');
											});
											
											$("#muestraNombreBeneficiario3").slideDown(60);	
										});		
									}, 1500);	
				}
			});
		}
		
			
	});
	
	///////////////////////////////
		
	//	}
	
	////////////////////
			////////cantidad////////////////////////////////////////////////////////////////
//	for (var i=0; i<=4; i++) {
    

	//////////
$(document).on("click","#pencilNombreBeneficiario4",function(){
			$("#muestraNombreBeneficiario4").slideUp(50,function(){
				$("#cambioNombreBeneficiario4").slideDown(60);
				$("#nombreBeneficiario4").prop("value","");	
				$("#nombreBeneficiario4").focus();	
			});		
	});
	
	
  $(document).on("click","#cancelNombreBeneficiario4",function(){
			$("#cambioNombreBeneficiario4").slideUp(50,function(){
				$("#muestraNombreBeneficiario4").slideDown(60);	
			});		
	});
	
	
	$("#nombreBeneficiario4").focus(function(){
		$("#errorNombreBeneficiarioEdicion4").css("display","none");
		$("#errorNombreBeneficiarioEdicion4").html("");	
		});
	
	$(document).on("click","#accepNombreBeneficiario4",function(){
		
		var ban=true;
		if($("#nombreBeneficiario4").val()=="" || /^\s+$/.test($("#nombreBeneficiario4").val()) )
		{
			ban=false;
			$("#errorNombreBeneficiarioEdicion4").css("display","block");
			$("#errorNombreBeneficiarioEdicion4").html(idioma.valida1);	
		}
		
		if(ban)
		{
			var respuesta = $.post(pathname+"/_assets/_controllers/editarNombreBeneficiario.php",
			{
				nombre:$("#nombreBeneficiario4").val(),
				num:4,
			});
			
			respuesta.done(function(data){
				if(data=="ok")
				{
					
					$("#mensajeNombreBeneficiario4").css("display","block");
					$("#mensajeNombreBeneficiario4").html(idioma.validaOk);
					setTimeout(function(){
										$("#mensajeNombreBeneficiario4").css("display","none");
										$("#mensajeNombreBeneficiario4").html("");
										$("#cambioNombreBeneficiario4").slideUp(50,function(){
											
											$.get(pathname+"/_assets/_controllers/getNombreBeneficiario4.php",function(data){
													$("#muestraNombreBeneficiario4").html(data+' <span class="icon-pencil" id="pencilNombreBeneficiario4');
											});
											
											$("#muestraNombreBeneficiario4").slideDown(60);	
										});		
									}, 1500);	
				}
			});
		}
		
			
	});
	
	///////////////////////////////
		
	//	}
	
	////////////////////
	//////////
$(document).on("click","#pencilApellidoBeneficiario1",function(){
			$("#muestraApellidoBeneficiario1").slideUp(50,function(){
				$("#cambioApellidoBeneficiario1").slideDown(60);
				$("#nombreBeneficiario1").prop("value","");	
				$("#nombreBeneficiario1").focus();	
			});		
	});
	
	
  $(document).on("click","#cancelApellidoBeneficiario1",function(){
			$("#cambioApellidoBeneficiario1").slideUp(50,function(){
				$("#muestraApellidoBeneficiario1").slideDown(60);	
			});		
	});
	
	
	$("#ApellidoBeneficiario1").focus(function(){
		$("#errorApellidoBeneficiarioEdicion1").css("display","none");
		$("#errorApellidoBeneficiarioEdicion1").html("");	
		});
	
	$(document).on("click","#accepApellidoBeneficiario1",function(){
		
		var ban=true;
		if($("#ApellidoBeneficiario1").val()=="" || /^\s+$/.test($("#ApellidoBeneficiario1").val()) )
		{
			ban=false;
			$("#errorApellidoBeneficiarioEdicion1").css("display","block");
			$("#errorApellidoBeneficiarioEdicion1").html(idioma.valida1);	
		}
		
		if(ban)
		{
			var respuesta = $.post(pathname+"/_assets/_controllers/editarApellidoBeneficiario.php",
			{
				apellido:$("#apellidoBeneficiario1").val(),
				num:1,
			});
			
			respuesta.done(function(data){
				if(data=="ok")
				{
					
					$("#mensajeApellidoBeneficiario1").css("display","block");
					$("#mensajeApellidoBeneficiario1").html(idioma.validaOk);
					setTimeout(function(){
										$("#mensajeApellidoBeneficiario1").css("display","none");
										$("#mensajeApellidoBeneficiario1").html("");
										$("#cambioApellidoBeneficiario1").slideUp(50,function(){
											
											$.get(pathname+"/_assets/_controllers/getApellidoBeneficiario1.php",function(data){
													$("#muestraApellidoBeneficiario1").html(data+' <span class="icon-pencil" id="pencilApellidoBeneficiario1');
											});
											
											$("#muestraApellidoBeneficiario1").slideDown(60);	
										});		
									}, 1500);	
				}
			});
		}
		
			
	});
		////////////////////
	//////////
$(document).on("click","#pencilApellidoBeneficiario2",function(){
			$("#muestraApellidoBeneficiario2").slideUp(50,function(){
				$("#cambioApellidoBeneficiario2").slideDown(60);
				$("#nombreBeneficiario2").prop("value","");	
				$("#nombreBeneficiario2").focus();	
			});		
	});
	
	
  $(document).on("click","#cancelApellidoBeneficiario2",function(){
			$("#cambioApellidoBeneficiario2").slideUp(50,function(){
				$("#muestraApellidoBeneficiario2").slideDown(60);	
			});		
	});
	
	
	$("#ApellidoBeneficiario2").focus(function(){
		$("#errorApellidoBeneficiarioEdicion2").css("display","none");
		$("#errorApellidoBeneficiarioEdicion2").html("");	
		});
	
	$(document).on("click","#accepApellidoBeneficiario2",function(){
		
		var ban=true;
		if($("#ApellidoBeneficiario2").val()=="" || /^\s+$/.test($("#ApellidoBeneficiario2").val()) )
		{
			ban=false;
			$("#errorApellidoBeneficiarioEdicion2").css("display","block");
			$("#errorApellidoBeneficiarioEdicion2").html(idioma.valida1);	
		}
		
		if(ban)
		{
			var respuesta = $.post(pathname+"/_assets/_controllers/editarApellidoBeneficiario.php",
			{
				apellido:$("#apellidoBeneficiario2").val(),
				num:2,
			});
			
			respuesta.done(function(data){
				if(data=="ok")
				{
					
					$("#mensajeApellidoBeneficiario2").css("display","block");
					$("#mensajeApellidoBeneficiario2").html(idioma.validaOk);
					setTimeout(function(){
										$("#mensajeApellidoBeneficiario2").css("display","none");
										$("#mensajeApellidoBeneficiario2").html("");
										$("#cambioApellidoBeneficiario2").slideUp(50,function(){
											
											$.get(pathname+"/_assets/_controllers/getApellidoBeneficiario2.php",function(data){
													$("#muestraApellidoBeneficiario2").html(data+' <span class="icon-pencil" id="pencilApellidoBeneficiario2');
											});
											
											$("#muestraApellidoBeneficiario2").slideDown(60);	
										});		
									}, 1500);	
				}
			});
		}
		
			
	});
		////////////////////
	//////////
$(document).on("click","#pencilApellidoBeneficiario3",function(){
			$("#muestraApellidoBeneficiario3").slideUp(50,function(){
				$("#cambioApellidoBeneficiario3").slideDown(60);
				$("#nombreBeneficiario3").prop("value","");	
				$("#nombreBeneficiario3").focus();	
			});		
	});
	
	
  $(document).on("click","#cancelApellidoBeneficiario3",function(){
			$("#cambioApellidoBeneficiario3").slideUp(50,function(){
				$("#muestraApellidoBeneficiario3").slideDown(60);	
			});		
	});
	
	
	$("#ApellidoBeneficiario3").focus(function(){
		$("#errorApellidoBeneficiarioEdicion3").css("display","none");
		$("#errorApellidoBeneficiarioEdicion3").html("");	
		});
	
	$(document).on("click","#accepApellidoBeneficiario3",function(){
		
		var ban=true;
		if($("#ApellidoBeneficiario3").val()=="" || /^\s+$/.test($("#ApellidoBeneficiario3").val()) )
		{
			ban=false;
			$("#errorApellidoBeneficiarioEdicion3").css("display","block");
			$("#errorApellidoBeneficiarioEdicion3").html(idioma.valida1);	
		}
		
		if(ban)
		{
			var respuesta = $.post(pathname+"/_assets/_controllers/editarApellidoBeneficiario.php",
			{
				apellido:$("#apellidoBeneficiario3").val(),
				num:3,
			});
			
			respuesta.done(function(data){
				if(data=="ok")
				{
					
					$("#mensajeApellidoBeneficiario3").css("display","block");
					$("#mensajeApellidoBeneficiario3").html(idioma.validaOk);
					setTimeout(function(){
										$("#mensajeApellidoBeneficiario3").css("display","none");
										$("#mensajeApellidoBeneficiario3").html("");
										$("#cambioApellidoBeneficiario3").slideUp(50,function(){
											
											$.get(pathname+"/_assets/_controllers/getApellidoBeneficiario3.php",function(data){
													$("#muestraApellidoBeneficiario3").html(data+' <span class="icon-pencil" id="pencilApellidoBeneficiario3');
											});
											
											$("#muestraApellidoBeneficiario3").slideDown(60);	
										});		
									}, 1500);	
				}
			});
		}
		
			
	});
		////////////////////
	//////////
$(document).on("click","#pencilApellidoBeneficiario4",function(){
			$("#muestraApellidoBeneficiario4").slideUp(50,function(){
				$("#cambioApellidoBeneficiario4").slideDown(60);
				$("#nombreBeneficiario4").prop("value","");	
				$("#nombreBeneficiario4").focus();	
			});		
	});
	
	
  $(document).on("click","#cancelApellidoBeneficiario4",function(){
			$("#cambioApellidoBeneficiario4").slideUp(50,function(){
				$("#muestraApellidoBeneficiario4").slideDown(60);	
			});		
	});
	
	
	$("#ApellidoBeneficiario4").focus(function(){
		$("#errorApellidoBeneficiarioEdicion4").css("display","none");
		$("#errorApellidoBeneficiarioEdicion4").html("");	
		});
	
	$(document).on("click","#accepApellidoBeneficiario4",function(){
		
		var ban=true;
		if($("#ApellidoBeneficiario4").val()=="" || /^\s+$/.test($("#ApellidoBeneficiario4").val()) )
		{
			ban=false;
			$("#errorApellidoBeneficiarioEdicion4").css("display","block");
			$("#errorApellidoBeneficiarioEdicion4").html(idioma.valida1);	
		}
		
		if(ban)
		{
			var respuesta = $.post(pathname+"/_assets/_controllers/editarApellidoBeneficiario.php",
			{
			apellido:$("#apellidoBeneficiario4").val(),
				num:4,
			});
			
			respuesta.done(function(data){
				if(data=="ok")
				{
					
					$("#mensajeApellidoBeneficiario4").css("display","block");
					$("#mensajeApellidoBeneficiario4").html(idioma.validaOk);
					setTimeout(function(){
										$("#mensajeApellidoBeneficiario4").css("display","none");
										$("#mensajeApellidoBeneficiario4").html("");
										$("#cambioApellidoBeneficiario4").slideUp(50,function(){
											
											$.get(pathname+"/_assets/_controllers/getApellidoBeneficiario4.php",function(data){
													$("#muestraApellidoBeneficiario4").html(data+' <span class="icon-pencil" id="pencilApellidoBeneficiario4');
											});
											
											$("#muestraApellidoBeneficiario4").slideDown(60);	
										});		
									}, 1500);	
				}
			});
		}
		
			
	});
		////////////////////
	//////////
$(document).on("click","#pencilParentescoBeneficiario1",function(){
			$("#muestraParentescoBeneficiario1").slideUp(50,function(){
				$("#cambioParentescoBeneficiario1").slideDown(60);
				$("#parentescoBeneficiario1").prop("value","");	
				$("#parentescoBeneficiario1").focus();	
			});		
	});
	
	
  $(document).on("click","#cancelParentescoBeneficiario1",function(){
			$("#cambioParentescoBeneficiario1").slideUp(50,function(){
				$("#muestraParentescoBeneficiario1").slideDown(60);	
			});		
	});
	
	
	$("#ParentescoBeneficiario1").focus(function(){
		$("#errorParentescoBeneficiarioEdicion1").css("display","none");
		$("#errorParentescoBeneficiarioEdicion1").html("");	
		});
	
	$(document).on("click","#accepParentescoBeneficiario1",function(){
		
		var ban=true;
		if($("#parentescoBeneficiario1").val()=="" || /^\s+$/.test($("#parentescoBeneficiario1").val()) )
		{
			ban=false;
			$("#errorParentescoBeneficiarioEdicion1").css("display","block");
			$("#errorParentescoBeneficiarioEdicion1").html(idioma.valida1);	
		}
		
		if(ban)
		{
			var respuesta = $.post(pathname+"/_assets/_controllers/editarParentescoBeneficiario.php",
			{
				parentesco:$("#parentescoBeneficiario1").val(),
				num:1,
			});
			
			respuesta.done(function(data){
				if(data=="ok")
				{
					
					$("#mensajeParentescoBeneficiario1").css("display","block");
					$("#mensajeParentescoBeneficiario1").html(idioma.validaOk);
					setTimeout(function(){
										$("#mensajeParentescoBeneficiario1").css("display","none");
										$("#mensajeParentescoBeneficiario1").html("");
										$("#cambioParentescoBeneficiario1").slideUp(50,function(){
											
											$.get(pathname+"/_assets/_controllers/getParentescoBeneficiario1.php",function(data){
													$("#muestraParentescoBeneficiario1").html(data+' <span class="icon-pencil" id="pencilParentescoBeneficiario1');
											});
											
											$("#muestraParentescoBeneficiario1").slideDown(60);	
										});		
									}, 1500);	
				}
			});
		}
		
			
	});
		////////////////////
		//////////
$(document).on("click","#pencilParentescoBeneficiario2",function(){
			$("#muestraParentescoBeneficiario2").slideUp(50,function(){
				$("#cambioParentescoBeneficiario2").slideDown(60);
				$("#parentescoBeneficiario2").prop("value","");	
				$("#parentescoBeneficiario2").focus();	
			});		
	});
	
	
  $(document).on("click","#cancelParentescoBeneficiario2",function(){
			$("#cambioParentescoBeneficiario2").slideUp(50,function(){
				$("#muestraParentescoBeneficiario2").slideDown(60);	
			});		
	});
	
	
	$("#ParentescoBeneficiario2").focus(function(){
		$("#errorParentescoBeneficiarioEdicion2").css("display","none");
		$("#errorParentescoBeneficiarioEdicion2").html("");	
		});
	
	$(document).on("click","#accepParentescoBeneficiario2",function(){
		
		var ban=true;
		if($("#parentescoBeneficiario2").val()=="" || /^\s+$/.test($("#parentescoBeneficiario2").val()) )
		{
			ban=false;
			$("#errorParentescoBeneficiarioEdicion2").css("display","block");
			$("#errorParentescoBeneficiarioEdicion2").html(idioma.valida1);	
		}
		
		if(ban)
		{
			var respuesta = $.post(pathname+"/_assets/_controllers/editarParentescoBeneficiario.php",
			{
				parentesco:$("#parentescoBeneficiario2").val(),
				num:2,
			});
			
			respuesta.done(function(data){
				if(data=="ok")
				{
					
					$("#mensajeParentescoBeneficiario2").css("display","block");
					$("#mensajeParentescoBeneficiario2").html(idioma.validaOk);
					setTimeout(function(){
										$("#mensajeParentescoBeneficiario2").css("display","none");
										$("#mensajeParentescoBeneficiario2").html("");
										$("#cambioParentescoBeneficiario2").slideUp(50,function(){
											
											$.get(pathname+"/_assets/_controllers/getParentescoBeneficiario2.php",function(data){
													$("#muestraParentescoBeneficiario2").html(data+' <span class="icon-pencil" id="pencilParentescoBeneficiario2');
											});
											
											$("#muestraParentescoBeneficiario2").slideDown(60);	
										});		
									}, 1500);	
				}
			});
		}
		
			
	});
		////////////////////
		//////////
$(document).on("click","#pencilParentescoBeneficiario3",function(){
			$("#muestraParentescoBeneficiario3").slideUp(50,function(){
				$("#cambioParentescoBeneficiario3").slideDown(60);
				$("#parentescoBeneficiario3").prop("value","");	
				$("#parentescoBeneficiario3").focus();	
			});		
	});
	
	
  $(document).on("click","#cancelParentescoBeneficiario3",function(){
			$("#cambioParentescoBeneficiario3").slideUp(50,function(){
				$("#muestraParentescoBeneficiario3").slideDown(60);	
			});		
	});
	
	
	$("#ParentescoBeneficiario3").focus(function(){
		$("#errorParentescoBeneficiarioEdicion3").css("display","none");
		$("#errorParentescoBeneficiarioEdicion3").html("");	
		});
	
	$(document).on("click","#accepParentescoBeneficiario3",function(){
		
		var ban=true;
		if($("#parentescoBeneficiario3").val()=="" || /^\s+$/.test($("#parentescoBeneficiario3").val()) )
		{
			ban=false;
			$("#errorParentescoBeneficiarioEdicion3").css("display","block");
			$("#errorParentescoBeneficiarioEdicion3").html(idioma.valida1);	
		}
		
		if(ban)
		{
			var respuesta = $.post(pathname+"/_assets/_controllers/editarParentescoBeneficiario.php",
			{
				parentesco:$("#parentescoBeneficiario3").val(),
				num:3,
			});
			
			respuesta.done(function(data){
				if(data=="ok")
				{
					
					$("#mensajeParentescoBeneficiario3").css("display","block");
					$("#mensajeParentescoBeneficiario3").html(idioma.validaOk);
					setTimeout(function(){
										$("#mensajeParentescoBeneficiario3").css("display","none");
										$("#mensajeParentescoBeneficiario3").html("");
										$("#cambioParentescoBeneficiario3").slideUp(50,function(){
											
											$.get(pathname+"/_assets/_controllers/getParentescoBeneficiario3.php",function(data){
													$("#muestraParentescoBeneficiario3").html(data+' <span class="icon-pencil" id="pencilParentescoBeneficiario3');
											});
											
											$("#muestraParentescoBeneficiario3").slideDown(60);	
										});		
									}, 1500);	
				}
			});
		}
		
			
	});
		////////////////////
		//////////
$(document).on("click","#pencilParentescoBeneficiario4",function(){
			$("#muestraParentescoBeneficiario4").slideUp(50,function(){
				$("#cambioParentescoBeneficiario4").slideDown(60);
				$("#parentescoBeneficiario4").prop("value","");	
				$("#parentescoBeneficiario4").focus();	
			});		
	});
	
	
  $(document).on("click","#cancelParentescoBeneficiario4",function(){
			$("#cambioParentescoBeneficiario4").slideUp(50,function(){
				$("#muestraParentescoBeneficiario4").slideDown(60);	
			});		
	});
	
	
	$("#ParentescoBeneficiario4").focus(function(){
		$("#errorParentescoBeneficiarioEdicion4").css("display","none");
		$("#errorParentescoBeneficiarioEdicion4").html("");	
		});
	
	$(document).on("click","#accepParentescoBeneficiario4",function(){
		
		var ban=true;
		if($("#parentescoBeneficiario4").val()=="" || /^\s+$/.test($("#parentescoBeneficiario4").val()) )
		{
			ban=false;
			$("#errorParentescoBeneficiarioEdicion4").css("display","block");
			$("#errorParentescoBeneficiarioEdicion4").html(idioma.valida1);	
		}
		
		if(ban)
		{
			var respuesta = $.post(pathname+"/_assets/_controllers/editarParentescoBeneficiario.php",
			{
				parentesco:$("#parentescoBeneficiario4").val(),
				num:4,
			});
			
			respuesta.done(function(data){
				if(data=="ok")
				{
					
					$("#mensajeParentescoBeneficiario4").css("display","block");
					$("#mensajeParentescoBeneficiario4").html(idioma.validaOk);
					setTimeout(function(){
										$("#mensajeParentescoBeneficiario4").css("display","none");
										$("#mensajeParentescoBeneficiario4").html("");
										$("#cambioParentescoBeneficiario4").slideUp(50,function(){
											
											$.get(pathname+"/_assets/_controllers/getParentescoBeneficiario4.php",function(data){
													$("#muestraParentescoBeneficiario4").html(data+' <span class="icon-pencil" id="pencilParentescoBeneficiario4');
											});
											
											$("#muestraParentescoBeneficiario4").slideDown(60);	
										});		
									}, 1500);	
				}
			});
		}
		
			
	});
		////////////////////
	
	/////////////////////////////////////////////////	
	// edicion de Direccion			
		
	$(document).on("click","#pencilDir",function(){
			$("#muestraDir").slideUp(50,function(){
				$("#cambioDir").slideDown(60);
				$("#dir").prop("value","");	
				$("#dir").focus();	
			});		
	});
	
	
  $(document).on("click","#cancelDir",function(){
			$("#cambioDir").slideUp(50,function(){
				$("#muestraDir").slideDown(60);	
			});		
	});
	
	
	$("#dir").focus(function(){
		$("#errorDirEdicion").css("display","none");
		$("#errorDirEdicion").html("");	
		});
	
	$(document).on("click","#accepDir",function(){
		
		var ban=true;
		if($("#dir").val()=="" || /^\s+$/.test($("#dir").val()) )
		{
			ban=false;
			$("#errorDirEdicion").css("display","block");
			$("#errorDirEdicion").html(idioma.valida6);	
		}
		
		if(ban)
		{
			var respuesta = $.post(pathname+"/_assets/_controllers/editarDir.php",
			{
				dir:$("#dir").val(),
								
			});
			
			respuesta.done(function(data){
				if(data=="ok")
				{
					
					$("#mensajeCDir").css("display","block");
					$("#mensajeCDir").html(idioma.validaOk);
					setTimeout(function(){
										$("#mensajeCDir").css("display","none");
										$("#mensajeCDir").html("");
										$("#cambioDir").slideUp(50,function(){
											
											$.get(pathname+"/_assets/_controllers/getDir.php",function(data){
													$("#muestraDir").html(data+' <span class="icon-pencil" id="pencilDir"></span>');
											});
											
											$("#muestraDir").slideDown(60);	
										});		
									}, 1500);	
				}
			});
		}
		
			
	});
	
	
	// oculto todas las clases de los icon para la edicion
	$('[class^="icon-"]').hide();
	
	
	//muestra inputs para editar los datos de tarjeta
	$(document).on('click','#botonDatosTarjeta',function(){
					
			if($(this).text()==idioma.boton1)
			{
				$('#datosTarjeta .muestra').slideUp(50,function(){
					$('#datosTarjeta .inputs').slideDown(60);
				});
				
				
				
				$('[class^="icon-close"]').show();
				$(this).text(idioma.boton2);
			}
			else
			{
			   // envia el dato a almacenar
			   
			  //console.log("actual tarjeta = "+$tarjetaActual+" - - "+$codigoActual);
			   
			   var $titularN =$("#titularName").prop("value");
			   var $titularA = $("#titularApellido").prop("value");
			   
			   var $tipoTarjeta = $("#tipoTarjetaS").prop("value");
			   
			   
			   
			   var $numTarjeta ="";
			   
			   
			   $numTarjeta = $("#numTarjeta").prop("value"); 
			   
			   
			   //alert($numTarjeta);
			   var $venceMes = $("#mesVence").prop("value");
			   var $venceAno = $("#anoVence").prop("value");
			  
			   var $codigo =""
			   $codigo = $("#codigo").prop("value"); 
			   
			   
				   // segundo nombre
				var $secondName = $("#secondName").prop("value");
				var $direccion=$("#direccion").prop("value");
				var $pais = $("#pais").prop("value");
				var $estado = $("#estado").prop("value");
				var $ciudad = $("#ciudad").prop("value");
				var $codigoP = $("#codigoPostal").prop("value");
				   
				 var  band=true;
			 
			// validar datos;
			
				if($titularN=="")
				{ $("#errorTitularName").html("Type a cardholder name").show(); band=false;	}
				if($titularA=="")
				{ $("#errorTitularApellido").html("Type last name").show(); band=false;	}
				if($pais==0)
				{ $("#errorPais").html("Select country").show(); band=false;  }
				if($estado==0)
				{ $("#errorEstado").html("Select state").show(); band=false; }
				if($ciudad=="")
				{ $("#errorCiudad").html("Type a city").show(); band=false; }
				if($direccion=="")
				{ $("#errorDireccion").html("Type your  address").show(); band=false;  }
				if($codigoP=="")
				{ $("#errorCodigoP").html("Type your zip code").show(); band=false;  }
				
				if($tipoTarjeta==0)
				{ $("#errorTipoTarjeta").html("Select a credit card type").show(); band=false; }
				
				if($numTarjeta=="")
				{ $("#errorNumTarjeta").html("Type a card number").show(); band=false; }
				
				if($codigo=="")
				{ $("#errorCodigoVV").html("Type a card security code").show(); band=false; }
				
			   if(band)
			   {	 		   
				   
				   
				   $.post(pathname+"/_assets/_controllers/datosTarjeta.php",{ titularName:$titularN, titularA:$titularA, tipoTarjeta:$tipoTarjeta, numTarjeta:$numTarjeta, mesVence:$venceMes, anoVence:$venceAno, codigo:$codigo, secondN:$secondName, direccion:$direccion, pais:$pais, estado:$estado, ciudad:$ciudad, codigoP:$codigoP },function(data){
						
							if(data=="ok")
							{
								$.post(pathname+"/_assets/_controllers/actualizaInfoTarjeta.php",function(data){
									
										$("#datosTarjeta").html(data);	
								
								});	
							}
										   
						});
					
				}
			}
			
	});
	
	
	$(document).on("change", "#pais", function(e){
			e.preventDefault();
			e.preventDefault();
		
			$.ajax({
					 url:pathname+"/_assets/_controllers/getEstados.php",
					 //dataType:"html",
					 type:"POST",
					 data:{
								pais:$("#pais").prop("value"),
								
								
						  }	
					}).done(function(data){
						$("#estado").html(data);
			});
	});
	
	
	
	//se dispara al hacer click en el boton cancelar de cualquier campo de edicion de la seccion de datos de tarjeta
	/*	$(document).on('click','#datosTarjeta  [class^="icon-close"]',function(){
		 var $elemento  = $(this).parent().parent();
		 
		 $elemento.find('.inputs').slideUp(50,function(){
				$elemento.find('.muestra').slideDown(60);	 
		});
		 
	});
	
	
	/*
	$(document).on('click','#datosTarjeta [class^="icon-checkmark"]',function(){
		
		var $elemento = $(this).parent().parent();
		
		
		
	});
	*/
	
	
	
	//borra mensajes de error en datos de tarjetas 
	
	$(document).on("blur","#titularName",function(){
		
		var $val = $(this).prop("value");
		if($val!="")
		{ $("#errorTitularName").hide(); }
	});
	
	
	$(document).on("blur","#titularApellido",function(){
		var $val = $(this).prop("value");
		if($val!="")
		{ $("#errorTitularApellido").hide(); }
	});
	
	
	$(document).on("change","#pais",function(){
		var $val = $(this).prop("value");
		if($val!=0)
		{ $("#errorPais").hide();  }
		
	});
	
	$(document).on("change","#estado",function(){
		
		var $val =$(this).prop("value");
		if($val!=0)
		{ $("#errorEstado").hide(); }	
	});
	
	
	$(document).on("blur","#ciudad",function(){
		var $val = $(this).prop("value");
		if($val!="")
		{ $("#errorCiudad").hide(); }
		
	});
	
	
	
	$(document).on("blur","#direccion",function(){
		var $val=$(this).prop("value");
		if($val!="")
		{ $("#errorDireccion").hide(); }
	});
	
	$(document).on("blur","#codigoPostal",function(){ 
		var $val=$(this).prop("value");
		if($val!="")
		{ $("#errorCodigoP").hide(); }
	});
	
	
	$(document).on("change","#tipoTarjetaS",function(){
		var $val=$(this).prop("value");
		if($val!=0)
		{ $("#errorTipoTarjeta").hide(); }  
	});
	
	
	$(document).on("blur","#numTarjeta", function(){ 
		var $val = $(this).prop("value");
		if($val!="")
		{ $("#errorNumTarjeta").hide(); 	}
	});
	
	
	$(document).on("blur","#codigo",function(){
		var $val = $(this).prop("value");
		if($val!="")
		{ $("#errorCodigoVV").hide(); }	
	});
	
	
	
	
	
	$('.penCo').hide();
	$("#cambioNombreCotitular").hide();
	$("#cambioApellidoCotitular").hide();
	$("#cambioEmailCotitular").hide();
	$("#cambioTelefonoCotitular").hide();
	$(".cambio").hide();
});