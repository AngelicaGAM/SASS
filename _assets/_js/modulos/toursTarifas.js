// JavaScript Document
$(document).ready(function(e) {
	pathname="https://members.beyond-experience.com"
	  console.log($("#wawawa").val());
if($("#wawawa").val()=="malo"){
    if(localStorage.getItem("sesionagencia")!="NONBREG"){

		$.fancybox(
		'<link href="' + pathname + '/_assets/_css/popupInventarioRegina.css?x=<?php echo(rand()); ?>" type="text/css" rel="stylesheet"><div id="InventarioRegina" class="modal"><div class="fullin colorlogo"><img class="logopopregina" src="https://members.beyond-experience.com/_assets/_images/template/logo-1000.png"/></div><img class="fullin tira" src="https://members.beyond-experience.com/_assets/_images/popupInventarioRegina/cintillo.jpg"/><div class="fondopopup"><span class="titulopop">¡Notice!</span><span class="parrafopop">The information was not found, try later.<br><br><a class="linku" href="javascript:window.history.go(-1);"><buttom class="regre">Back</buttom></a></span><div class="centerpop"><div class="iblockpop w70"><img class="telefonopop" src="https://members.beyond-experience.com/_assets/_images/popupInventarioRegina/ico-telefono.png"/><span class="numerospop">	USA, CAN: 1-888-963-7689<br>Mexico: 1-800-272-0294</span></div></div></div></div>',
		{
        		'autoDimensions'	: false,
			'width'         		: 350,
			'height'        		: 'auto',
			'transitionIn'		: 'none',
			'transitionOut'		: 'none',
			'showCloseButton':false
		}
	)
		
	}else{
				$.fancybox(
		'<link href="' + pathname + '/_assets/_css/popupInventarioRegina.css?x=<?php echo(rand()); ?>" type="text/css" rel="stylesheet"><div id="InventarioRegina" class="modal"><div class="fullin colorlogo"><img class="logopopregina" src="https://members.beyond-experience.com/_assets/_images/template/logo-1000.png"/></div><img class="fullin tira" src="https://members.beyond-experience.com/_assets/_images/popupInventarioRegina/cintillo.jpg"/><div class="fondopopup"><span class="titulopop">¡Notice!</span><span class="parrafopop">The information was not found, try later.<br><br><a class="linku" href="javascript:window.history.go(-1);"><buttom class="regre">Back</butom></a></span><div class="centerpop"><div class="iblockpop w70"><img class="telefonopop" src="https://members.beyond-experience.com/_assets/_images/popupInventarioRegina/ico-telefono.png"/><span class="numerospop">	</span></div></div></div></div>',
		{
        		'autoDimensions'	: false,
			'width'         		: 350,
			'height'        		: 'auto',
			'transitionIn'		: 'none',
			'transitionOut'		: 'none',
			'showCloseButton':false
		}
	)
			
	}
	
	}


   	    $("input[type=checkbox]").uniform();
		
		$("body").trigger("validaCheckRW");
		
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
	
		
		
		/// get idioma
		var idioma="";
		$.ajax({
				 url:"../_assets/_controllers/getLang.php",
				 data:{ page: "tours"},
				 type:"POST",
				 dataType:"json",
				 async:false,
				 success: function(data){
				
						idioma =eval(data);
						//return idi;
				 }
			});
			
		$("#loading").hide();	
		
		
		
		var calFecha= new Date();	
		var hoy = new Date(calFecha.getFullYear(),calFecha.getMonth(),calFecha.getDate()+1);
		
		if( ($("input[name='gm-fechaTourTN']").length>0) && ($("input[name='gm-fechaTourTN2']").length>0) )
		{
			var aux=$("input[name='gm-fechaTourTN']").val();
			aux=aux.split("-");
			var aux2=$("input[name='gm-fechaTourTN2']").val();
			aux2=aux2.split("-");
			$( ".calendarioTravel" ).datepicker({ minDate: new Date(aux[0],aux[1],aux[2]),maxDate:new Date(aux2[0],aux2[1],aux2[2]),dateFormat:"dd-mm-yy"
		  });
		}
		
		
		/*$.datepicker.regional['es'] = {
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
		
		
		
		
		
		
		
		
		
		//funcionamient de los calendarios para los tours de mys
		$( ".calendario" ).datepicker({ minDate: hoy,dateFormat:"dd-mm-yy",
			onSelect: function(dateText)
			 { 
				bloqueoSeccion();
				
				var respuesta2 = $.post("../../_assets/_controllers/actualizarDatosBookin.php",
					{
						adulto:$("#adultos").prop("value"),
						nino:$("#ninos").prop("value"),
						fecha:$("#fecha").prop("value"),
						clave:$("#claveTour").prop("value")
					});
				
					respuesta2.done(function(data){
						var datos=data.split(",.-");
						
						desbloqueSeccion();
						
						if(datos[0]=="ok")
						{
						   // funcion que actualiza la hora del select y calcula el precio con los nuevos precios
							actualizacion(datos[1],datos[2]);
							
							$("input[name=gm-fechaTourMYS]").prop("value",dateText);
							
							$("#mensaje").removeClass("menError");
							$("#mensaje").addClass("menErrorHide");
							
							$("#agregarMYS").removeClass("botonAgregarHide");
							$("#agregarMYS").addClass("botonAgregar");
							calculaprecio();
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
			 } 
	  });
	


	$(".calendario").on("click",function(){
		  	
		   $('.calendario').datepicker('show');
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
						calculaprecio();
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
		
	///////////////////////////////////////////////////////////////////////////////////////////////
	//funcionamiento para change de niños cuando cambían adultos para el tour ISLAMUJERESDOLPHINEXP
	$("#adultos.selectBMys").on("change",function(){
			if ($("#claveTour").prop("value") == "ISLAMUJERESDOLPHINEXP") {
				if ($("#adultos").prop("value") == 2) {
					$("#ninos").val(2);
					$("input[name=gm-totalChildrenTourMYS]").prop("value",2);
				} else {
					$("#ninos").val(0);
					$("input[name=gm-totalChildrenTourMYS]").prop("value",0);
				}
			}
	});
		
	///////////////////////////////////////////////////////////////////////////////////////////////
	//funcionamiento para change de adultos cuando cambían niños para el tour ISLAMUJERESDOLPHINEXP
	$("#ninos.selectBMys").on("change",function(){
			if ($("#claveTour").prop("value") == "ISLAMUJERESDOLPHINEXP") {
				if ($("#ninos").prop("value") == 2) {
					$("#adultos").val(2);
					$("#gm-totalAdultsTourMYS").prop("value",2);
				} else {
					$("#adultos").val(3);
					$("#gm-totalAdultsTourMYS").prop("value",3);
				}
			}
	});
		
	/////////////////////////////////////////////////////////////////////////	
	//funcionamiento para el boton de agregar al arreglo de sesion de reserva
	
	$(document).on("click",".botonAgregar",function(){
	
		if( $("#hora").val()==0) {
			  alert(idioma.tarifasTours.errorHora); 
			  
			  return false;
		}
			
	});		
  
     
	 //////////////////////////////////////////////////////////////////////
	//funcionamiento para agregar los adultos al input oculto
	$(document).on("change","#adultos",function(){
	//$("#adultos").change(function(){	
	
			var elemento=$("#adultos").val();
			//console.log("valor de adultos"+elemento);
			if(elemento!=0)
			//{$("input[id=gm-totalAdultsTourMYS]").prop("value",elemento);}
			{$("#gm-totalAdultsTourMYS").prop("value",elemento);}
			else
			//{$("input[id=gm-totalAdultsTourMYS]").prop("value","0");}
			{$("#gm-totalAdultsTourMYS").prop("value","0");}
			
	});	
	
	
  	//////////////////////////////////////////////////////////////////////
	//funcionamiento para agregar los niños al input oculto
	$(document).on("change","#ninos",function(){
	
			var elemento=$("#ninos").val();
			if(elemento!=0)
			{$("input[name=gm-totalChildrenTourMYS]").prop("value",elemento);}
			else
			{$("input[name=gm-totalChildrenTourMYS]").prop("value","0");}
			
	});	
	
	
	///////////////////////////////////////////////////////////////////	
    //funcionamiento para agregar el horario al input oculto
	$(document).on("change",".selectHorario",function(){
	
			var elemento=$("#hora").val();
			
			if(elemento!=0)
			{$("input[name=gm-horaTourMYS]").prop("value",elemento);}
			else
			{$("input[name=gm-horaTourMYS]").prop("value","");}
			
	});	
	
  	
   
   function actualizacion(hora,precios)
   {
	   // actualizo los horarios del combo
		$("#comboHorarioShedule").html(hora);
					
		// recupero los nuevos precios y calculo el total agregando la inf a los input corresponientes
		var aux= precios.split("-/-");
		var totAdulto=0;
		var totNino=0;
		var precioFinal=0;
		
		$("input[name=gm-priceAdultTourMYS]").prop("value",aux[0]);
		$("input[name=gm-priceChildTourMYS]").prop("value",aux[1]);
		
		$("input[name=gm-precioNetoAdultoTourMYS]").prop("value",aux[2]);
		$("input[name=gm-precioNetoNinioTourMYS]").prop("value",aux[3]);
						
		totAdulto=$("#adultos").val()*aux[0];
		
		if($("#ninos").length>0)
		totNino=$("#ninos").val()*aux[1];
		
		precioFinal=parseFloat(totAdulto)+parseFloat(totNino);
		
		$("input[name=gm-totalTourMYS]").prop("value",precioFinal);
   }
 
 	//actualiza el precio de acuerdo al numero de adulto y niños seleccionandos y determina si puede
	//aplicar rewards
    function calculaprecio()
	{
		var respuesta = $.post("../../_assets/_controllers/dibujapreciorwtoursmys.php",
		{
			reward:$("#valorRW").val(),
			precioAdulto:$("input[name='gm-priceAdultTourMYS']").val(),
			precioNino:$("input[name='gm-priceChildTourMYS']").val(),
			adulto:$("#adultos").val(),
			nino:$("#ninos").val(),
		});
			
		respuesta.done(function(data){
			$("#calculaprecio").html("");
			$("#calculaprecio").html(data);
			$("body").trigger("validaCheckRW");
			$("input[type=checkbox]").uniform();
		});
	}


	
	function bloqueoSeccion()
	{
		$('.reservar').block({ 
			message: '<p>'+idioma.tarifasTours.actualizando+'...</p>', 
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
	
	//	Abre el Mapa en otra tab
	$(document).on("click","#textoPrin p:last-child > small > a",function(event)
	{
		event.preventDefault();
		window.open(event.target); 
	});
});