// JavaScript Document
$(document).ready(function(e) {
	
		
		$("#hideAll").hide();
     	$("#divSalida").hide();
	 	$("#datosLlegada").hide(); 
	 
	 	$(document).on("click",".botonAgregar",function(){
	
		/*if( $("#hora").val()==0) {
			  alert("seleccione un horario"); 
			  
			  return false;
		}*/
			
		});	
	
		
		/// get idioma
		var idioma="";
		$.ajax({
				 url:"../_assets/_controllers/getLang.php",
				 data:{ page: "transfer"},
				 type:"POST",
				 dataType:"json",
				 async:false,
				 success: function(data){
				
						idioma =eval(data);
						//return idi;
				 }
		});
			
						
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
				
   	
	
		$("#loading").hide();	
		
		
		
		var calFecha= new Date();	
		//	>	Se agrega "+2" para que sea 2 dias mas apartir de HOY
		var hoy = new Date(calFecha.getFullYear(),calFecha.getMonth(),calFecha.getDate()+2);
				
		/*
		$.datepicker.regional['es'] = {
				closeText : 'Cerrar',
				prevText : '<Ant',
				nextText : 'Sig>',
				currentText : 'Hoy',
				monthNames : [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
						'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre',
						'Diciembre' ],
				monthNamesShort : [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul',
						'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
				dayNames : [ 'Domingo', 'Lunes', 'Martes', 'Mi\u00E9rcoles', 'Jueves',
						'Viernes', 'S\u00E1bado' ],
				dayNamesShort : [ 'Dom', 'Lun', 'Mar', 'Mi\u00E9', 'Juv', 'Vie', 'S\u00E1b' ],
				dayNamesMin : [ 'Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'S\u00E1' ],
				weekHeader : 'Sm',
				dateFormat : 'dd-mm-yy',
				firstDay : 0,
				isRTL : false,
				showMonthAfterYear : false,
				yearSuffix : '',
	
			};
		$.datepicker.setDefaults($.datepicker.regional['es']);
			var meses = [ "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ags",
					"Sep", "Oct", "Nov", "Dic" ];*/
		
		
		
	$( ".calendario" ).datepicker({ minDate: hoy,dateFormat:"mm/dd/yy" });
	


	$(".calendario").on("clic",function(){
	  $('.calendario').datepicker('show');
	});
	
	
	
   $(document).on("click","#agregarTransfer",function(){
	   
	   var valSelect = $("select[name=gmx-tipoTransferGMX]").val();
	   
	   //alert(valSelect);
	   
	   if ( valSelect == "" ) {
		   alert(idioma.erroTipoTraslado);
		   return false;
	   }
	   
	   if (valSelect == 2 || valSelect == 1) {
	     
		   if ( valSelect == "" ) {
			   alert(idioma.erroTipoTraslado);
			   return false;
		   }
		   
		   if ($("#fecha").val() == "") {
			   alert(idioma.errorFechaLlegada);
			   return false;		   
		   }
		   
		   if ($("#gmx-llegaAerolineaTransferGMX").val() == "") {
			   alert(idioma.errorAerolineaLlegada);
			   return false;		   
		   }
		   
		   if ($("#gmx-llegaNumerodeVueloTransferGMX").val() == "") {
			   alert(idioma.errorNumeroVueloLlegada);
			   return false;		   
		   }
		   
		   if ($("#gmx-llegaHoraTransferGMX").val() == "") {
			   alert(idioma.errorHoraLlegada);
			   return false;		   
		   }	
		   
		   if ($("#gmx-llegaDesdeTransferGMX").val() == "") {
			   alert(idioma.errorDondeLlega);
			   return false;		   
		   }
		   
		   if ($("#gmx-llegaHotelTransferGMX").val() == "") {
			   alert(idioma.errorHotel);
			   return false;		   
		   }
	   	
	   }
	   
	 //  --------------------------------------------
	 //  Salida
	 /// --------------------------------------------	 
	   
	 if ( valSelect == 3 || valSelect == 1 ) {
	        
		  if ( $("#fechaSalida").val() == "" ) {
			 alert(idioma.errorFechaSalida);
			 return false;		   
		  }	
		  
		  
		  
		  if ( $("#gmx-salidaAerolineaTransferGMX").val() == "" ) {
			 alert(idioma.errorAerolineaSalida);
			 return false;		  
		  }
		  
		   if ( $("#gmx-salidaNumerodeVueloTransferGMX").val() == "" ) {
			 alert(idioma.errorNumeroVueloSalida);
			 return false;		  
		   }	  
		  
		  if ( $("#gmx-salidaHoraTransferGMX").val() == "" ) {
			 alert(idioma.errorHoraSalida);
			 return false;		   
		  }	
		  
		   if ( $("#gmx-salidaATransferGMX").val() == "" ) {
			 alert(idioma.errorDestino);
			 return false;		  
		   }	 
		  
		   if ( $("#gmx-salidaHotelTransferGMX").val() == "" ) {
			 alert(idioma.errorHotel);
			 return false;		  
		   }	
		  
		   if ( $("#gmx-pickupTimeTransferGMX").val() == "" ) {
			 alert(idioma.errorPickup);
			 return false;		  
		   }		   
	  
	  }
	  	  	  
   });	
		
		
		
		///////////////////////////////////////////////////////////////////////////////////
		// mostrar el contenido de mas informacion
		$(".contenidoCajaTitulo").click(
	
			function(){
				
				$(".contenidoCajaTitulo").each(function() {
                    
					var padre= $(this).parent();
					
					if(padre.find(".contenidoCajaCont").css("display")=="block" )
					{
						padre.find(".contenidoCajaCont").slideToggle();
						
						$(this).find(".arrow").removeClass("arrowOpen");
					}
					
                });
				
				var padre=$(this).parent();
				padre.find(".contenidoCajaTitulo").addClass("activoT");
				
				if(padre.find(".contenidoCajaCont").css("display")=="none")
				{
					padre.find(".contenidoCajaCont").slideToggle();
					padre.find(".arrow").addClass("arrowOpen");
				}
				
		});
		
		$(".selectTransfer2").on("change",function(){
			//alert($(this).val());
			 var k = $(this).val();
			 
			 if (k == 1) {
				 $("#datosLlegada").show();
				 $("#divSalida").show();				 				 
			 } else if (k == 2){
				 $("#datosLlegada").show();
				 $("#divSalida").hide();				 
			 } else if (k == 3) {
				 $("#divSalida").show();
				 $("#datosLlegada").hide();
			 } else  {
				$("#divSalida").hide();
				 $("#datosLlegada").hide(); 
			 }
			 
			 if(k!="")
			 {
				calculaPrecio();
				$("#hideAll").show();
				 
				 
			 }
			 else
			 {
				 $("#formBoton").hide();
				 $("#formBoton").html("");
				 $("#hideAll").hide();
			 }
			 
			 
			 
			});
			
			
			$("#gmx-numVansGMX,#gmx-numPasajerosGMX").on("change",function(){
				calculaPrecio();
			});
		
		/////////////////////////////////////////////////////////////////////////////////
		// bonton de reservar
		
		$(".botonG").click(
		function(){
		
			
                var padre=$(this).parent();	
			
				//alert(padre.attr("class"));
				padre.find(".reservar").slideToggle();
		});
		
		
	////////////////////////////////////////////////////////////////////////////////////	
	//funcionamiento para los change de los select de adultos y niños
	$(".selectBMys").on("change",function(){
		
			bloqueoSeccion();
			
			var respuesta = $.post("../../_assets/_controllers/actualizarDatosBookin.php",
				{
					adulto:$("#adultos").prop("value"),
					nino:$("#ninos").prop("value"),
					fecha:$("#fecha").prop("value"),
					clave:$("#claveTour").prop("value")
				});
			
				respuesta.done(function(data){
					var datos=data.split(",.-");
					
					desbloqueSeccion();
					
					
					if(datos[0]=="ok")
					{
						// funcion que actualiza la hora del select y calcula el precio con los nuevos precios
						actualizacion(datos[1],datos[2]);
						
						$("#mensaje").removeClass("menError");
						$("#mensaje").addClass("menErrorHide");
						
						$("#agregarMYS").removeClass("botonAgregarHide");
						$("#agregarMYS").addClass("botonAgregar");
						$("#mensaje").removeClass("menError");
						$("#mensaje").addClass("menErrorHide");
						
						$("#agregarMYS").removeClass("botonAgregarHide");
						$("#agregarMYS").addClass("botonAgregar");
					}
					else
					{
						$("#mensaje").html(datos[1]);
						$("#mensaje").removeClass("menErrorHide");
						$("#mensaje").addClass("menError");
						$("#agregarMYS").removeClass("botonAgregar");
						$("#agregarMYS").addClass("botonAgregarHide");
					}
				});
			
	});
		
	/////////////////////////////////////////////////////////////////////////	
	//funcionamiento para el boton de agregar al arreglo de sesion de reserva
	
	$(document).on("click",".botonAgregar",function(){
	
		if( $("#hora").val()==0) {
			  alert("seleccione un horario"); 
			  
			  return false;
		}
			
	});		
  
     
	 //////////////////////////////////////////////////////////////////////
	//funcionamiento para agregar los adultos al input oculto
	$(document).on("click","#adultos",function(){
	
			var elemento=$("#adultos").val();
			if(elemento!=0)
			{$("input[name=gm-totalAdultsTourMYS]").prop("value",elemento);}
			else
			{$("input[name=gm-totalAdultsTourMYS]").prop("value","0");}
			
	});	
	
	
  	//////////////////////////////////////////////////////////////////////
	//funcionamiento para agregar los niños al input oculto
	$(document).on("click","#ninos",function(){
	
			var elemento=$("#ninos").val();
			if(elemento!=0)
			{$("input[name=gm-totalChildrenTourMYS]").prop("value",elemento);}
			else
			{$("input[name=gm-totalChildrenTourMYS]").prop("value","0");}
			
	});	
	
	
	///////////////////////////////////////////////////////////////////	
    //funcionamiento para agregar el horario al input oculto
	$(document).on("click",".selectHorario",function(){
	
			var elemento=$("#hora").val();
			
			if(elemento!=0)
			{$("input[name=gm-horaTourMYS]").prop("value",elemento);}
			else
			{$("input[name=gm-horaTourMYS]").prop("value","");}
			
	});	
	
	
	
	
	
	
  	function calculaPrecio()
	{
		 var van=0;
		 if($("#gmx-numVansGMX").length>0)
		 {van=$("#gmx-numVansGMX").val();}
				 
		 $.ajax({
				 url:"../_assets/_controllers/dibujapreciorw.php",
				 data:{ 
				 		bandera: $("#banderaTipo").val(),
						reward:$("#valorRW").val(),
						tipo:$("#gmx-tipoTransferGMX").val(),
						redondo:$("input[name='gmx-tarifaRedondoTransferGMX']").val(),
						sencillo:$("input[name='gmx-tarifaSencilloTransferGMX']").val(),
						sencilloA:$("input[name='gmx-tarifaSencilloATransferGMX']").val(),
						pax:$("#gmx-numPasajerosGMX").val(),
						van:van
						
					},
				 type:"POST",
				 dataType:"html",
				 async:false,
				 success: function(data){
				
						$("#formBoton").show();
				 		$("#formBoton").html(data);
						$("body").trigger("validaCheckRW");
						$("input[type=checkbox]").uniform();
				 }
		});
	}
   
   
   
   
   function actualizacion(hora,precios)
   {
	   // actualizo los horarios del combo
		$("#comboHorarioShedule").html(hora);
					
		// recupero los nuevos precios y calculo el total agregando la inf a los input corresponientes
		var aux= precios.split("-/-");
		var totAdulto=0;
		var totNino=0;
		var precioFinal=0;
		
		alert(aux);
		
		$("input[name=gm-priceAdultTourMYS]").prop("value",aux[0]);
		$("input[name=gm-priceChildTourMYS]").prop("value",aux[1]);
		
		$("input[name=gm-precioNetoAdultoTourMYS]").prop("value",aux[2]);
		$("input[name=gm-precioNetoNinioTourMYS]").prop("value",aux[3]);
						
		totAdulto=$("#adultos").val()*aux[0];
		
		if($("#ninos").length>0)
		totNino=$("#ninos").val()*aux[1];
		
		precioFinal=parseInt(totAdulto)+parseInt(totNino);
		
		$("input[name=gm-totalTourMYS]").prop("value",precioFinal);
   }
 
    
	function bloqueoSeccion()
	{
		$('.reservar').block({ 
			message: '<p>Actualizando...</p>', 
			css: {
					 width: '25%',
					 height: 'auto',
					 border: '1px solid rgba(150,150,150,1.00)',
					 'text-align': 'center'
				 } 
		}); 
					
	}
	
	function desbloqueSeccion()
	{
		$('.reservar').unblock(); 
	}
			
});