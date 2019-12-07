// JavaScript Document
$(document).ready(function() {
	
	$("body").trigger("validaCheckRW");	
	//$("input[type=checkbox]").uniform();
	
	/// get idioma
	var idioma="";
	$.ajax({
		url:"_assets/_controllers/getLang.php",
		data:{ page: "golf"},
		type:"POST",
		dataType:"json",
		async:false,
		success: function(data){
			idioma =eval(data);
			//return idi;
		}
	});

	var calFecha= new Date();	
	var hoy = new Date(calFecha.getFullYear(),calFecha.getMonth(),calFecha.getDate());
	var fechaIni = $("#fecha").datepicker({minDate:hoy, dateFormat:"dd/mm/yy"});

	// funcionamiento del envio
	var resta = 300;
	$("#send").on("click",function(){

		var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
		var vacioReg =new RegExp(/^\s+$/);
		var digitsReg = /^\d+$/;
		var ban=true;
		$("#idEnvio").css("display", "none");
		let listaErrores = idioma.formulario.mensajeerror + "<br/>";
		if($("#resort").val()=="Resort name" || $("#resort").val()=="Resort name" || vacioReg.test($("#resort").val()))
		{
			//$("#errorResort").css("display","block");
			//$("#errorResort").html('Type a cruise name');
			listaErrores += 'Type a cruise name' + "<br/>";
			ban=false;
		}		
		if($("#nombre").val()=="" || vacioReg.test($("#nombre").val()))
		{
			//$("#errorNombre").css("display","block");
			//$("#errorNombre").html(idioma.formulario.campo1Valida);
			listaErrores += idioma.formulario.campo1Valida + "<br/>";
			ban=false;
		}
		if(!emailReg.test($("#email").val()))
		{
			//$("#errorEmail").css("display","block");
			//$("#errorEmail").html(idioma.formulario.campo11Valida);
			listaErrores += idioma.formulario.campo11Valida + "<br/>";
			ban=false;
		}
		if(!digitsReg.test($("#phone").val()))
		{
			//$("#errortel").css("display","block");
			//$("#errortel").html(idioma.formulario.campo12Valida);
			listaErrores += idioma.formulario.campo12Valida + "<br/>";
			ban=false;	
		}
		/*
		if($("#num").val()=="" || vacioReg.test($("#num").val()) || isNaN($("#num").val()))
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
				{
					$("#adultopax_" + a).html(idioma.formulario.validaAdulto + " " + a).css("display", "block"); ban = false;
				}	
			}	
		}		
		
		if(totalNinosMostrados>0)
		{
			for(a=1; a<=totalNinosMostrados; a++)
			{
				var nameN ="#child"+a;	
				if($(nameN).val()=="")
					{ $("#ninospax_"+a).html(idioma.formulario.validaNino+" "+a).css("display","block");   ban=false; }
			}	
		}
		
		if(ban)
		{
			
			var totalAdultos =$("#adultosInfo").find("section").length;
			var adultosNombre =new Array();
			var totalNinos = $("#infoChild").find("section").length;
			var ninos=new Array();
			var edades=new Array();
			
			for(var i=1; i<=totalAdultos; i++)
			{
				var pax = "#pax"+i;
				//alert("pax "+$(pax).prop("value"));
				//adultosNombre.push($(pax).prop("value"));
				
				
				if( $(pax).val()!="" )
					{adultosNombre.push($(pax).prop("value"));}
				else
					{adultosNombre.push("-");}
				
			}
			for(var j=1; j<=totalNinos; j++)
			{
				var paxNino ="#child"+j;
				var edadesNino ="#ac"+j;
				//ninos.push($(paxNino).prop("value"));
				//edades.push($(edadesNino).prop("value"));
				
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
			
			var respuesta = $.post("_assets/_controllers/envioGolf.php",
			{
				nombre:$("#nombre").val(),
				email:$("#email").val(),
				phone:$("#phone").val(),
				crucero:$("#resort").val(),
				num:$("#num").val(),
				expiram:$("#expiram").val(),
				expiraa:$("#expiraa").val(),
				cvv:$("#cvv").val(),
				fecha:$("#fecha").val(),
				peticiones:$("#peticiones").val(),
				cuando:$("#cuando").val(),
				adultos:adultosNombre,
				ninos:ninos,
				edades:edades,
				aplicarw:$("input[name='fichaAplicaReward']").val(),
				rw:$("input[name='fichaPrecioReward']").val(),
				fichaTotal:$("input[name='fichaTotal']").val(),
				resDate:$("#fecha").val(),
				teeTime:$("#teeTime").val(),
				players:$("#players").val(),
				holes:$("#hole").val(),
				clubRental:$("#crlr").val(),
				caddy:$("#caddy").val(),
				cart:$("#cart").val(),
				//brocker clavesemana
				brocker:$("#brocker").val(),
				clave_semana:$("#clave_semana").val()
			});
			
			respuesta.done(function(data){
				
				if(data=="ok")
				{
					$(".forms").hide();
					$("#concierge").css("display", "block");
					$("#idEnvio").css("display", "block").removeClass("error").addClass("accep").html(idioma.formulario.mensaje);	
					$(".input, .inputFecha, .inputTextA").prop("value","");	
					$("#adultos").val(0);
					//$("#hora").val(0);
					$("#teeTime").val(0);
					$("#players").val(0);
					$("#hole").val(0);
					//$("#ninos").val(0);
					$("#ac1").val(0);
					$("#ac2").val(0);
					$("#ac3").val(0);
					$("#ac4").val(0);
					$("#ac5").val(0);
				}
				else
				{
					$("#idEnvio").css("display","block").removeClass("accep").addClass("error").html(idioma.formulario.mensajeerror);
				}
			});
		}
		else {
			$("#idEnvio").css("display", "block").removeClass("accep").addClass("error").html(listaErrores);
		}
		$('html,body').animate({
			scrollTop: $(".titulos").offset().top - resta
		}, 500);
	});

	$(document).on("focus",".input, .inputFecha",function(){
		$(this).parent().find(".error").hide();
	});


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
				//alert(i);
				$("#adultosInfo").append('<section><span class="label">'+idioma.formulario.campo4+' '+t+'</span><div class="error" id="adultopax_'+t+'"></div><input class="input" name="pax'+t+'" id="pax'+t+'" type="text" /></section>');
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
				$("#infoChild").append(
					'<section>'+
						'<div class= "contieneSelect" >' +
							'<span class="label">' + idioma.formulario.campo5 + ' ' + t + '</span>' +
							'<div class="error" id="ninospax_'+t+'"></div>'+
							'<input class="input" name="child' + t + '" id="child' + t + '" type="text" />' +
						'</div>' +
						'<div class="contieneSelect">'+
							'<span class="label">'+idioma.formulario.campo6+' '+t+'</span>'+
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
						'</div>' +
					'</section>'
				);
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
});
