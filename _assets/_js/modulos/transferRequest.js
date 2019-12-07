// JavaScript Document

$(document).ready(function(e) {
	$("body").trigger("validaCheckRW");
    $("input[type=checkbox]").uniform();
	
    $('.sliderContent').revolution(
				{
					delay:5000,
					startwidth:1920,
					startheight:250,
					hideThumbs:10,
					fullWidth:"on",
					forceFullWidth:"on",
					navigationType:"none",
					
					touchenabled:"on",
					onHoverStop:"off"
				});	
	
	
		
		/// get idioma
		var idioma="";
		$.ajax({
				 url:"_assets/_controllers/getLang.php",
				 data:{ page: "transfer"},
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
	
	$("#send").on("click",function(){
		
		var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
		var vacioReg =new RegExp(/^\s+$/);
		var digitsReg = /^\d+$/;
		var ban=true;
		
		$("#idEnvio").css("display","none");
		if($("#resort").val()=="Resort name" || $("#resort").val()=="Resort name" || vacioReg.test($("#resort").val()))
		{
				$("#errorResort").css("display","block");
				$("#errorResort").html('Type a cruise name');	
				ban=false;
		}		
		if($("#nombre").val()=="" || vacioReg.test($("#nombre").val()))
		{
				$("#errorNombre").css("display","block");
				$("#errorNombre").html(idioma.formulario.campo1Valida);	
				ban=false;
		}
		
		if(!emailReg.test($("#email").val()))
		{
				$("#errorEmail").css("display","block");
				$("#errorEmail").html(idioma.formulario.campo12Valida);	
				ban=false;
		}
		if(!digitsReg.test($("#phone").val()))
		{
				$("#errortel").css("display","block");
				$("#errortel").html(idioma.formulario.campo13Valida);
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
		if($("#fecha").val()=="" || vacioReg.test($("#fecha").val()) )
		{
				$("#errorFecha").css("display","block");
				$("#errorFecha").html(idioma.formulario.campo11Valida);	
				ban=false;
		}
		if(ban)
		{
			
			
			
			var respuesta = $.post("../../_assets/_controllers/envioTransfer.php",
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
				//aplicarw:$("input[name='fichaAplicaReward']").val(),
				//rw:$("input[name='fichaPrecioReward']").val(),
				fichaTotal:$("input[name='fichaTotal']").val(),
				brocker:$("#brocker").val(),
				clave_semana:$("#clave_semana").val()
				 
				
			});
			
			respuesta.done(function(data){
				
				if(data=="ok")
				{
					
					$("#formulario").css("display","none");
					$("#idEnvio").css("display","block");
					$("#idEnvio").addClass("accep");
					$("#idEnvio").html(idioma.formulario.mensaje);	
					$(".input, .inputFecha, .inputTextA").prop("value","");	
					
					
				}
				else
				{
					$("#formulario").css("display","none");
					$("#idEnvio").css("display","block");
					$("#idEnvio").removeClass("accep");
					$("#idEnvio").addClass("error");
					$("#idEnvio").html(idioma.formulario.mensajeerror);
				}
			});
		}
		
		
		
	});
	
	$(".input, .inputFecha").on("focus",function(){
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
						$("#adultosInfo").append('<section><span class="label">'+idioma.formulario.campo4+' '+t+'</span><input class="input" name="pax'+t+'" id="pax'+t+'" type="text" placeholder="'+idioma.formulario.campo4+' '+t+' "></section>');
				}
				
				
			}
			else
			{
				//remove
				var quita=total-value
				for(var i=0; i<quita; i++)
				{
						$("#adultosInfo:last").remove();
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
					$("#infoChild").append('<section><span class="label">'+idioma.formulario.campo5+' '+t+'</span><input class="input" name="child'+t+'" id="child'+t+'" type="text" placeholder="'+idioma.formulario.campo5+' '+t+'"/>'+
							'<div class="limpiar"></div>'+
							'<span class="label2">'+idioma.formulario.campo6+' '+t+'</span>'+
								'<span class="cubreSelect2">'+
									'<select name="ac'+t+'" id="ac'+t+'" class="cubierto2">'+
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
						'</section>');
				}
			}
			else
			{
				//remove
				var quita=total-value
				for(var i=0; i<quita; i++)
				{
						$("#infoChild:last").remove();
				}
					
			}
	});
	
	
	
});