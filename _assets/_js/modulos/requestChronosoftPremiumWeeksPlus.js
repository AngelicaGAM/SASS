$(document).ready(function(e)
{
	/// get idioma
	$(".bell").hide();
	var idioma="";
	$.ajax({
			url:"_assets/_controllers/getLang.php",
			data:{ page: "lastMinute"},
			type:"POST",
			dataType:"json",
			async:false,
			success: function(data)
			{
				idioma =eval(data);
			}
	});
	// seteo los calendarios
	var calFecha= new Date();	
	var hoy = new Date(calFecha.getFullYear(),calFecha.getMonth(),calFecha.getDate());
	var hoy2 = new Date(calFecha.getFullYear(),calFecha.getMonth(),calFecha.getDate()+1);
		
	// funcionamiento del envio 	
	$("#popsito").on("click",function()
	{
		var ban=true;
		$("#idEnvio").css("display","none");
		var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
		var vacioReg =new RegExp(/^\s+$/);
		var digitsReg = /^\d+$/;
		let listaErrores = idioma.formulario.mensajeerror + "<br/>";
		if($("#nombre").val()==="" || vacioReg.test($("#nombre").val()))
		{
			listaErrores += idioma.formulario.campo1Valida + "<br/>";
			ban=false;
		}
		if(!emailReg.test($("#email").val()))
		{
			listaErrores += idioma.formulario.campo11Valida + "<br/>";
			ban=false;
		}
		if(!digitsReg.test($("#phone").val()))
		{
			listaErrores += idioma.formulario.campo12Valida + "<br/>";
			ban=false;	
		}
		if(ban)
		{
			var idCManual 			= $(this).closest("form").find("input[name=idhotel]").val();
			var hotelCManual 		= $(this).closest("form").find("input[name=hotel]").val(); 	
			var destinoCManual 		= $(this).closest("form").find("input[name=destination]").val();
			var llegadaCManual 		= $(this).closest("form").find("input[name=checkIn]").val(); 	
			var salidaCManual 		= $(this).closest("form").find("input[name=checkOut]").val();
			var sizeCManual 		= $(this).closest("form").find("input[name=size]").val(); 
			var capacidadCManual 	= $(this).closest("form").find("input[name=pax]").val();
			var servicio 			= $(this).closest("form").find("input[name=servicio]").val();

			if(popupUserIsDemo == "" || popupUserIsDemo == "0")
	        {

				$.fancybox(
					'<link href="_assets/_css/popupInventarioRegina.css?x=<?php echo(rand()); ?>" type="text/css" rel="stylesheet">'+
					'<div id="InventarioRegina" class="modal chrono-modal">'+
						'<div class="headerImagen" style="background:url(_assets/_images/popupInventarioRegina/bg.jpg) no-repeat;">'+
							'<img src="' + pathname + '/_assets/_images/template/logo-1000.png"/>'+
						'</div>'+	
						'<div class="fondopopup">'+
							'<span class="parrafopop">Dear member, this lodging has not yet been confirmed. By accepting, your information will be registered to make a reservation request. We recommend you ensure your lodging before purchasing your flight tickets.<br> Would you like to continue?<br></span>'+
							'<div class="iblockpop w70">'+
								'<input class="botonPop btnUserIsGoingToShop" type="button" value="Accept" data-idCManual="'+idCManual+'" data-hotelCManual="'+hotelCManual+'" data-destinoCManual="'+destinoCManual+'" data-llegadaCManual="'+llegadaCManual+'" data-salidaCManual="'+salidaCManual+'" data-sizeCManual="'+sizeCManual+'" data-capacidadCManual="'+capacidadCManual+'" data-servicio="'+servicio+'">\
								<input  class="botonPop cancelPop" type="button" value="Cancel" onClick="parent.jQuery.fancybox.close();"> '+
							'</div>'+
						'</div>'+
					'</div>', {
					'autoDimensions': false,
					'width': 350,
					'height': 'auto',
					'transitionIn': 'none',
					'transitionOut': 'none'
				});

			}
			else
			{
				$.fancybox(
				'<link href="' + pathname + '/_assets/_css/popupInventarioRegina.css?x=<?php echo(rand()); ?>" type="text/css" rel="stylesheet">'+
				'<div id="InventarioRegina" class="modal chrono-modal">'+
					'<div class="headerImagen" style="background:url(' + pathname + '/_assets/_images/popupInventarioRegina/bg.jpg) no-repeat;">'+
						'<img src="' + pathname + '/_assets/_images/template/logo-1000.png"/>'+
					'</div>'+	
					'<div class="fondopopup">'+
						'<span class="parrafopop">By accepting, your information will be <br> registered to generate an application.<br> Do you wish continue?<br></span>'+
						'<div class="iblockpop w70">'+
							'<input onClick="parent.jQuery.fancybox.close();" class="botonPop" id="env" type="button" value="Send" > <input  class="botonPop cancelPop" type="button" value="Cancel" onClick="parent.jQuery.fancybox.close();"> '+
						'</div>'+
					'</div>'+
				'</div>', {
				'autoDimensions': false,
				'width': 350,
				'height': 'auto',
				'transitionIn': 'none',
				'transitionOut': 'none'
				});
			}
			// $.fancybox(
			// 	'<link href="' + pathname + '/_assets/_css/popupInventarioRegina.css?x=<?php echo(rand()); ?>" type="text/css" rel="stylesheet">'+
			// 	'<div id="InventarioRegina" class="modal chrono-modal">'+
			// 		'<div class="headerImagen" style="background:url(' + pathname + '/_assets/_images/popupInventarioRegina/bg.jpg) no-repeat;">'+
			// 			'<img src="' + pathname + '/_assets/_images/template/logo-1000.png"/>'+
			// 		'</div>'+	
			// 		'<div class="fondopopup">'+
			// 			'<span class="parrafopop">By accepting, your information will be <br> registered to generate an application.<br> Do you wish continue?<br></span>'+
			// 			'<div class="iblockpop w70">'+
			// 				'<input onClick="parent.jQuery.fancybox.close();" class="botonPop" id="env" type="button" value="Send" > <input  class="botonPop cancelPop" type="button" value="Cancel" onClick="parent.jQuery.fancybox.close();"> '+
			// 			'</div>'+
			// 		'</div>'+
			// 	'</div>', {
			// 	'autoDimensions': false,
			// 	'width': 350,
			// 	'height': 'auto',
			// 	'transitionIn': 'none',
			// 	'transitionOut': 'none'
			// });
		}
		else
		{
			$("#idEnvio").css("display","block").removeClass("accep").addClass("error").html(listaErrores);
		}
});

	$(document).on("click",".btnUserIsGoingToShop",function(e)
	{

		var idCManual 			= $(this).attr("data-idCManual");
		var hotelCManual 		= $(this).attr("data-hotelCManual"); 	
		var destinoCManual 		= $(this).attr("data-destinoCManual");
		var llegadaCManual 		= $(this).attr("data-llegadaCManual"); 	
		var salidaCManual 		= $(this).attr("data-salidaCManual");
		var sizeCManual 		= $(this).attr("data-sizeCManual"); 
		var capacidadCManual 	= $(this).attr("data-capacidadCManual");
		var seccion 			= $(this).attr("data-servicio");
		var currentLocation 	= window.location.href;

		$.ajax(
		{

			url:'_assets/_controllers/LogController.php',
			type:'post',
			data:{id:idCManual,hotel:hotelCManual,destino:destinoCManual,llegada:llegadaCManual,salida:salidaCManual,size:sizeCManual,capacidad:capacidadCManual,seccion:seccion,currentLocation:currentLocation},
			beforeSend:function()
			{

			},
			success:function(data)
			{
				console.log(data);

				setTimeout(function()
				{
					$('#send').trigger('click');
					parent.jQuery.fancybox.close();

				},2000);

			}

		});

		

	});

	$(document).on("click","#env",function(){
		$('#send').trigger('click');
		$('#popsito').slideUp();
	});
	
	$(document).on("click","#send",function()
	{
		var ban=true;
		$("#idEnvio").css("display","none");
		var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
		var vacioReg =new RegExp(/^\s+$/);
		var digitsReg = /^\d+$/;
		
		if($("#nombre").val()==="" || vacioReg.test($("#nombre").val()))
		{
			$("#errorNombre").css("display","block");
			$("#errorNombre").html(idioma.formulario.campo1Valida);	
			ban=false;
		}
		if(!emailReg.test($("#email").val()))
		{
			$("#errorEmail").css("display","block");
			$("#errorEmail").html(idioma.formulario.campo11Valida);	
			ban=false;
		}
		if(!digitsReg.test($("#phone").val()))
		{
			$("#errortel").css("display","block");
			$("#errortel").html(idioma.formulario.campo12Valida);
			ban=false;	
		}
		/*if($("#num").val()==="" || vacioReg.test($("#num").val()) || isNaN($("#num").val()))
		{
				$("#errorNum").css("display","block");
				$("#errorNum").html(idioma.formulario.campo8Valida);	
				ban=false;
		}
		if($("#cvv").val()=="" || vacioReg.test($("#cvv").val()) || isNaN($("#cvv").val()))
		{
				$("#errorCvv").css("display","block");
				$("#errorCvv").html(idioma.formulario.campo10Valida);	
				ban=false;
		}
		*/
		/*  proceso de validacion de adultos y niños */
		var totalAdultosMostrados =$("#adultosInfo").find("section").length;
		var totalNinosMostrados = $("#infoChild").find("section").length;
	    var a;	
		
		if(totalAdultosMostrados>0)
		{
			/// validar adultos
			for(a=1; a<=totalAdultosMostrados; a++)
			{
				var name = "#pax"+a;
				if($(name).val()=="")
				{ $("#adultopax_"+a).html(idioma.formulario.validaAdulto+" "+a).css("display","block"); ban=false; }	
			}	
		}		
		
		if(totalNinosMostrados>0)
		{
			for(a=1; a<=totalNinosMostrados; a++)
			{
				var nameN ="#child"+a;	
				if($(nameN).val()=="")
				{ $("#ninospax_"+a).html(idioma.formulario.validaNino+" "+a).css("display","block"); ban=false; }
			}	
		}
		
		if(ban)
		{
			var totalAdultos =$("#adultosInfo").find("section").length;
			var adultosNombre =new Array();
			var totalNinos = $("#infoChild").find("section").length;
			var ninos=new Array();
			var edades=new Array();
			var vuelo=0; var transfer=0; var excursion=0; var hotel=0;
			
			for(var i=1; i<=totalAdultos; i++)
			{
				var pax = "#pax"+i;
				//alert("pax "+$(pax).prop("value"));
				if( $(pax).val()!="" )
				{adultosNombre.push($(pax).prop("value"));}
				else
				{adultosNombre.push("-");}
				
			}
			for(var j=1; j<=totalNinos; j++)
			{
				var paxNino ="#child"+j;
				var edadesNino ="#ac"+j;
				
				if( $(paxNino).val()!="" )
				{ninos.push($(paxNino).prop("value"));}
				else
				{ninos.push("-");}
				
				if( $(edadesNino).val()!="<1" )
				{edades.push($(edadesNino).prop("value"));}
				else
				{edades.push(-1);}
			}
	
			adultosNombre =adultosNombre.join(".-,");
			ninos=ninos.join(".-,");
			edades=edades.join(".-,");
			// console.log($("input[name='fichaAplicaReward']").val());
			
			$("#idEnvio").css("display","none");
					
			var respuesta = $.post("../../_assets/_controllers/envioChronosoftPremiumWeeksPlus.php",
			{
				nombre:$("#nombre").val(),
				
				email:$("#email").val(),
				phone:$("#phone").val(),
				
				resort:$("#resort").val(),
				fecha:$("#fecha").val(),
				fecha2:$("#fecha2").val(),
				num:$("#num").val(),
				expiram:$("#expiram").val(),
				expiraa:$("#expiraa").val(),
				cvv:$("#cvv").val(),
				comenta:$("#peticiones").val(),
				addmail:$("#addMail").val(),
				adultos:adultosNombre,
				ninos:ninos,
				edades:edades,
				idhotel:$("#idhotel").val(),
				hotel:$("#hotel").val(),
				checkIn:$("#checkIn").val(),
				checkOut:$("#checkOut").val(),
				destination:$("#destination").val(),
				
				pax:$("#pax").val(),
				size:$("#size").val(),
				price:$("#price").val(),
				priceconrewards:$("#priceconrewards").val(),
				//aplicarw:$("input[name='fichaAplicaReward']").val(),
				rw:$("#fichaPrecioReward").val(),
				servicio:$("#servicio").val() 
			});
			
			respuesta.done(function(data){
				
				if(data=="ok")
				{
					
					$("#idEnvio").css("display","block");
					$("#idEnvio").addClass("accep");
					$("#idEnvio").removeClass("error");
					$("#idEnvio").html("We have received your request! Your Personal Concierge will contact you shortly.");	
					$(".input, .inputFecha, .inputTextA").prop("value","");
					$("#expiram").val(0);
					$("#expiraa").val(0);
					$("#adultos").val(0);
					//$("#hora").val(0);
					$("#cabina").val(0);
					//$("#ninos").val(0);
					$("#ac1").val(0);
					$("#ac2").val(0);
					$("#ac3").val(0);
					$("#ac4").val(0);
					$("#ac5").val(0);
					$(".bell").show();
					$("#share").hide();
				}
				else
				{
					$("#idEnvio").css("display","block");
					$("#idEnvio").removeClass("accep");
					$("#idEnvio").addClass("error");
					$("#idEnvio").html(idioma.formulario.mensajeerror);
				}
				$("#send").hide();
			});
		}
	});
	
	
	// funcionamiento de mostrar y ocultar las alertas
	// $(document).on("focus",".input, .inputFecha",function(){
	// 	$(this).parent().find(".error").hide();
		
	// });
	
	
	$("#adultos").on("change",function(){
		
			var value=$(this).val();
			var total=$("#adultosInfo").find("section").length;
			//alert(total);	
			
			if(value>total)
			{
				//agregar	
				for(var i = total; i<value; i++)
				{
					var t=i+1;
					$("#adultosInfo").append('<section><span class="label">'+idioma.formulario.campos5+' '+t+'</span><div class="error" id="adultopax_'+t+'"></div><input class="input" name="pax'+t+'" id="pax'+t+'" type="text" /></section>');
				}				
			}
			else
			{
				//remove
				var quita=total-value
				for(var i=0; i<quita; i++)
				{
						$("#adultosInfo section:last").remove();
				}
					
			}
	});
	
	$("#ninos").on("change",function(){
			var value=$(this).val();
			var total=$("#infoChild").find("section").length;
			if(value>total)
			{
				//agregar	
				for(var i = total; i<value; i++)
				{
					var t=i+1;
					$("#infoChild").append('<section><div class="contieneSelect"><span class="label">'+idioma.formulario.campo6+' '+t+'</span>'+
					'<div class="error" id="ninospax_'+t+'"></div>'+
					'<input class="input" name="'+idioma.formulario.campo6+''+t+'" id="child' +t+'" type="text" /></div>'+
							'<div class="contieneSelect"><span class="label">'+idioma.formulario.campo7+''+t+'</span>'+
								'<span class="cubreSelectEdad">'+
									'<select name="ac'+t+'" id="ac'+t+'" class="cubiertoEdad">'+
										'<option value="<1"><1</option>'+
										'<option>1</option>'+
										'<option>2</option>'+
										'<option>3</option>'+
										'<option>4</option>'+
										'<option>5</option>'+
										'<option>6</option>'+
										'<option>7</option>'+
										'<option>8</option>'+
										'<option>9</option>'+
										'<option>10</option>'+
										'<option>11</option>'+
										'<option>12</option>'+
								  '</select>'+
                               	'</span>'+
						'</div></section>');
				}
			}
			else
			{
				//remove
				var quita=total-value
				for(var i=0; i<quita; i++)
				{
						$("#infoChild section:last").remove();
				}
					
			}
	});
			
	
}); // fin