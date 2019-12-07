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
				 data:{ page: "lastMinute"},
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
	
	
		//$( "#fecha" ).datepicker({minDate:hoy,dateFormat:"d/m/yy",altField:"#fecha"});
		//$( "#fecha" ).prop("value",$.datepicker.formatDate('d/m/yy', new Date()) );
		
		//$( "#fecha2" ).datepicker({minDate:hoy2,dateFormat:"d/m/yy",altField:"#fecha2"});
		//$( "#fecha2" ).prop("value",$.datepicker.formatDate('d/m/yy', new Date(calFecha.getFullYear(),calFecha.getMonth(),calFecha.getDate()+1)) );
		
		
		
	// funcionamiento del envio 	
	
	$("#send").on("click",function(){
		
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
		if($("#num").val()==="" || vacioReg.test($("#num").val()) || isNaN($("#num").val()))
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
			
			
			$("#idEnvio").css("display","none");
					
			var respuesta = $.post("../../_assets/_controllers/envioLastMinute.php",
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
				edades:edades
			});
			
			respuesta.done(function(data){
				
				if(data=="ok")
				{
					
					$("#idEnvio").css("display","block");
					$("#idEnvio").addClass("accep");
					$("#idEnvio").html(idioma.formulario.mensaje);	
					$(".input, .inputFecha, .inputTextA").prop("value","");
					$("select").val(0);
					
					
				}
				else
				{
					$("#idEnvio").css("display","block");
					$("#idEnvio").removeClass("accep");
					$("#idEnvio").addClass("error");
					$("#idEnvio").html(idioma.formulario.mensajeerror);
					
					
				}
			});
		}
		
		
		
	});
	
	
	// funcionamiento de mostrar y ocultar las alertas
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