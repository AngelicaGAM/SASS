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
					
					touchenabled:"on",
					onHoverStop:"off"
				});	
	
	
		
	
	
		/// get idioma
		var idioma="";
		$.ajax({
				 url:"_assets/_controllers/getLang.php",
				 data:{ page: "cruises"},
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
	
	var variables= getVarsUrl();
	$.ajax({
							url:"_assets/_controllers/getDiasCrucerosRequest.php",
							type:"POST",
							dataType:"json",
							data:{ claveCrucero:variables.clave },
							success: function(data){
								 var fechasHotel=new Array();
								for(i=0; i<data.length; i++)
								{ 
									//alert(data[i].date);
									elemento=  new Date(data[i].date);
									//alert(elemento.getDate());
									fechasHotel[i]=elemento.getDate()+"/"+elemento.getMonth()+"/"+elemento.getFullYear();
									//alert(fechasHotel[i]);
								}
								
								 $('#fecha').datepicker("option","beforeShowDay",function(date){
									 	//var dia=date.getDate();
									 	//var mes =parseInt(date.getMonth())+1;
									 	
										//if(dia<=9){ dia = "0"+dia;}
										//if(mes<=9){ mes="0"+mes; }
									 
										
									//	alert(theday);
										//alert(date);
										var dia =date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
										/*for(var i=0; i<fechasHotel.length; i++)
										{	
											alert("compara fecha habilitar "+fechasHotel[i]+"  -- - dia "+dia);
										}*/
										//alert($.inArray(dia,fechasHotel));
										
	        							if( $.inArray(dia,fechasHotel) == -1 )return  [false,""];
										return [true,""];
								        
								});
									
						}
						
					});
	
	
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
				$("#errorEmail").html(idioma.formulario.campo11Valida);	
				ban=false;
		}
		if(!digitsReg.test($("#phone").val()))
		{
				$("#errortel").css("display","block");
				$("#errortel").html(idioma.formulario.campo12Valida);
				ban=false;	
		}
		
		if($("#fecha").val()=="" || vacioReg.test($("#fecha").val()))
		{
				$("#errorFecha").css("display","block");
				$("#errorFecha").html("Select date");	
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
				{ $("#adultopax_"+a).html(idioma.formulario.validaAdulto+" "+a).css("display","block");  ban=false; }	
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
			
			var vuelo=0; var transfer=0; var excursion=0; var hotel=0;
			
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
			
			if($("#vuelo").prop("checked")==true)
			{ vuelo=1; }
			if($("#transfer").prop("checked")==true)
			{ transfer=1; }
			if($("#excursion").prop("checked")==true)
			{ excursion=1; }
			if($("#hotel").prop("checked")==true)
			{ hotel=1; }
		
			var respuesta = $.post("../../_assets/_controllers/envioCruises.php",
			{
				nombre:$("#nombre").val(),
				
				email:$("#email").val(),
				phone:$("#phone").val(),
				
				crucero:$("#resort").val(),
				fecha:$("#fecha").val(),
				peticiones:$("#peticiones").val(),
				cabina:$("#cabina").val(),
				vuelo:vuelo,
				transfer:transfer,
				excursion:excursion,
				hotel:hotel,
				adultos:adultosNombre,
				ninos:ninos,
				edades:edades,
				aplicarw:$("input[name='fichaAplicaReward']").val(),
				rw:$("input[name='fichaPrecioReward']").val(),
				fichaTotal:$("input[name='fichaTotal']").val()
				
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
	
	$(document).on("focus",".input, .inputFecha",function(){
		$(this).parent().find(".error").hide();
			
	});
	
	
	$("input[type=checkbox]").uniform();
	
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
						$("#adultosInfo").append('<section><span class="label">'+idioma.formulario.campos4+' '+t+'</span><div class="error" id="adultopax_'+t+'"></div><input class="input" name="pax'+t+'" id="pax'+t+'" type="text" /></section>');
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
					$("#infoChild").append('<section><div class="contieneSelect"><span class="label">'+idioma.formulario.campo5+' '+t+'</span>'+
					'<div class="error" id="ninospax_'+t+'"></div>'+
					'<input class="input" name="child'+t+'" id="child'+t+'" type="text" /> </div>'+
							'<div class="contieneSelect">'+
							'<span class="label">'+idioma.formulario.campo6+' '+t+'</span>'+
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
						'</section>');
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

function getVarsUrl(){
    var url= location.search.replace("?", "");
    var arrUrl = url.split("&");
    var urlObj={};   
    for(var i=0; i<arrUrl.length; i++){
        var x= arrUrl[i].split("=");
        urlObj[x[0]]=x[1]
    }
    return urlObj;
}