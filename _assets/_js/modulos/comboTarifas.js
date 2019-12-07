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
				
	
	/// get idioma
	var idioma="";
	$.ajax({
				 url:"../_assets/_controllers/getLang.php",
				 data:{ page: "combos"},
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
		var hoy = new Date(calFecha.getFullYear(),calFecha.getMonth(),calFecha.getDate());
				
		
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
		
		
		
	$( ".calendario" ).datepicker({ minDate: hoy,dateFormat:"dd-mm-yy",
		onSelect: function(dateText)
		 { 
			bloqueoSeccion();
			var elemento=$(this).prop("id").split("_");
			
			var respuesta2 = $.post("../../_assets/_controllers/actualizarDatosBookinCombos.php",
				{
					adulto:$("#adultos").prop("value"),
					nino:$("#ninos").prop("value"),
					fecha:$("#fecha_"+elemento[1]).prop("value"),
					clave:$("#claveC_"+elemento[1]).prop("value"),
					indice:elemento[1]
				});
			
				respuesta2.done(function(data){
					var datos=data.split(",.-");
					
					desbloqueSeccion();
					
					
					if(datos[0]=="ok")
					{
						
						// funcion que actualiza la hora del select y calcula el precio con los nuevos precios
						actualizacion(elemento[1],datos[1],datos[2]);
						
						$("input[name=gm-fecha_"+elemento[1]+" ]").prop("value",dateText);
						
						//$("#mensaje_"+elemento[1]).removeClass("menError");
						//$("#mensaje_"+elemento[1]).addClass("menErrorHide");
						$("#mensaje_"+elemento[1]).html("");
						
						$("#agregarMYS").removeClass("botonAgregarHide");
						$("#agregarMYS").addClass("botonAgregar");
					}
					else
					{
						$("#mensaje_"+elemento[1]).html(datos[1]);
						//$("#mensaje").html(datos[1]);
						//$("#mensaje").removeClass("menErrorHide");
						//$("#mensaje").addClass("menError");
						$("#agregarMYS").removeClass("botonAgregar");
						$("#agregarMYS").addClass("botonAgregarHide");
					}
				});
		 } 
  });
	


	$(".calendario").on("clic",function(){
		  	
		   $('.calendario').datepicker('show');
	});
		
		
		
		
		
		/////////////////////////////////////////////////////////////////////////////////
		// bonton de reservar
		
		$(".botonG").click(
		function(){
		
			
                var padre=$(this).parent();	
			
				//alert(padre.attr("class"));
				padre.find(".reservar").slideToggle();
		});
		
	
	/*	
	////////////////////////////////////////////////////////////////////////////////////	
	//funcionamiento para los change de los select de adultos y niños
	$(".selectBMys").on("change",function(){
		
			bloqueoSeccion();
			
			var respuesta = $.post("../../_assets/_controllers/actualizarDatosBookinCombos.php",
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
			
	});*/
	
	
	
	//////////////////////////////////////////////////////////////////////////
	// Quitar la clase de error para el combo de pais
	$(document).on("change",".selectHorario",function(){
		$(this).parent().addClass ('selectPersonalizaHorario');
		$(this).parent().removeClass('selectPersonalizaHorarioError');
	});
		
	/////////////////////////////////////////////////////////////////////////	
	//funcionamiento para el boton de agregar al arreglo de sesion de reserva
	
	$(document).on("click",".botonAgregar",function(){
		var control=true;
		$(".selectHorario").each(function() {
				
					
				if( ($(this).val()==0) ||  ($(this).val()==idioma.error)   )
				{
					$(this).parent().removeClass('selectPersonalizaHorario');
					$(this).parent().addClass('selectPersonalizaHorarioError');
					//$(this).prop("value",idioma.error);
					control=false;
				}
						
		});
		if(!control)
		{return false;}	
	});		
  
     
	 //////////////////////////////////////////////////////////////////////
	//funcionamiento para agregar los adultos al input oculto
	$(document).on("click","#adultos",function(){
	
			var elemento=$("#adultos").val();
			if(elemento!=0)
			{$("input[name=gm-adultoCombo]").prop("value",elemento);}
			else
			{$("input[name=gm-adultoCombo]").prop("value","0");}
			
	});	
	
	
  	//////////////////////////////////////////////////////////////////////
	//funcionamiento para agregar los niños al input oculto
	$(document).on("click","#ninos",function(){
	
			var elemento=$("#ninos").val();
			if(elemento!=0)
			{$("input[name=gm-ninoCombo]").prop("value",elemento);}
			else
			{$("input[name=gm-ninoCombo]").prop("value","0");}
			
	});	
	
	
	///////////////////////////////////////////////////////////////////	
    //funcionamiento para agregar el horario al input oculto
	$(document).on("click",".selectHorario",function(){
			var elemento=$(this).prop("id").split("_");
			//var elemento=$("#hora").val();
			
			if($(this).val()!=0)
			{
				$("input[name=gm-hora_"+elemento[1]+"]").prop("value",$(this).val()); 
				
			}
			else
			{$("input[name=gm-hora_"+elemento[1]+"]").prop("value","");}
			
			
			
	});	
	
  	
   
   function actualizacion(indice,hora,precios)
   {
	   // actualizo los horarios del combo
		$("#comboHorarioShedule_"+indice).html(hora);
		
		/*			
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
		
		precioFinal=parseInt(totAdulto)+parseInt(totNino);
		
		$("input[name=gm-totalTourMYS]").prop("value",precioFinal);*/
   }
 
    
	function bloqueoSeccion()
	{
		$('.reservar').block({ 
			message: '<p>'+idioma.actualizando+'...</p>', 
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