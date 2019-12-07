// JavaScript Document

$(document).ready(function(e) {
			$("#laflecha").hide();
	
	$("#filtrosSection").hide();
	$("input[type=checkbox]").uniform();
	
	
	 $(document).on('change', "#ninos", function () {
			
			
			var solicitado=$(this).val();
			
			var totalMostrado=$("#edades li").length;
			
			
			if(solicitado==0)
			{
				for(i=0; i<totalMostrado; i++)
				{		
					$("#edades li:last").remove();
					//$("#habitacion_"+id[1]).css("display","none");
				}
				//$("#habitacion_"+id[1]).css("display","none");
			}
			
			else
			{
				//$("#edades").css("display","block");
				if(totalMostrado<solicitado)
				{
					//saco la diferencia y muestro los que tengo que mostrar
					var m = solicitado-totalMostrado;
							//	for(var i=0; i<m; i++)
								//{
									//var ha=totalMostrado+(i+1);
					$.ajax({
						url:"_assets/_controllers/masEdadesTransferWS.php",
						dataType:"html",
						type:"POST",
						data:{
								cantidadN:m,
								hab:1,
								m:totalMostrado
							}	
						}).done(function(data){
								$("#edades").append(data);
							});
								///}
							
				}
				
				else
				{
					// elimino 	
					var m=totalMostrado-solicitado;
					//alert(m);
					for(var i=0; i<m; i++)
					{
										//alert("dsaf "+i);
						$("#edades li:last").remove();
					}
				}
			}
			
			
			
			
		});
	
	// Menu Fixed
	var altura = $('#cajaReserva').offset().top;
		$(window).on('scroll', function(){
			if ( $(window).scrollTop() > altura+400){
				$('#cajaReserva').addClass('menu-fixed');
				$('#cajaReserva').addClass('dib');
			} else {
				$('#cajaReserva').removeClass('menu-fixed');
				$('#cajaReserva').removeClass('dib');
			}
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
	
	
          
     $( "#slider-rangeH" ).slider
								({
																							
								  range: true,
								  min: 0,
								  max: 10,
								  values: [ 0, 10 ],
								  slide: function( event, ui ) {
																											  
								 $("#minimo").text("$"+addCommas(ui.values[0])+" USD");
								 $("#max").text("$"+addCommas(ui.values[1])+" USD"); 
																												  
								//$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
						  }
	});   
	
	$.widget( "custom.catcomplete", $.ui.autocomplete,
	   {
			_renderMenu: function( ul, items )
				   {
						var that = this,
							currentCategory = "";
						$.each( items, function( index, item )
						 {
							if ( item.categoria != currentCategory ) 
							{
								ul.append( "<li class='ui-autocomplete-category'>" + item.categoria + "</li>" );
								currentCategory = item.categoria;
							}
							that._renderItemData( ul, item );
						});
					}
		});
		
		
	$( "#destino" ).catcomplete({
			
			 delay: 0,
			
			source: function(request,response)
			{
				//var termino=request.term;
				var accentMap = {
					"á": "a",
					"é": "e",
					"í": "i",
					"ó": "o",
					"ú": "u",
					"ñ": "n"
					
				};
				
				var normalize = function()
				 {
					var ret = "";
						for ( var i = 0; i < request.term.length; i++ ) {
						ret += accentMap[ request.term.charAt(i) ] || request.term.charAt(i);
						}
					return ret;
				}
				
				$.ajax({
						
						url:"_assets/_controllers/getDestinosCrucero.php",
						dataType:"json",
						type:"POST",
						data:{term:normalize	},
				
				/*--------------------------------------------------*/
				success:function(data)
				{
					
						// limpio la variable opcion para obligar a la seleccion de la lista
						
						opcion="";
						
						response($.map(data,function(item)
						{
						
								return {
										
										label:item.label,
										id:item.id,
										categoria:item.categoria,
										
									 }
							
						}));
						
					
				}
				
			  })
				
			},
		
			select: function( event, ui )
			 {
				 
				 //alert("ya");
					opcion=""; 
					opcion=ui.item.id;
					$("#claveD").prop("value",ui.item.id);
								
			 },
			 
			 search: function(){$(this).addClass('ui-autocomplete-loading');}
			 
		
		});
		
		
	/* calendario de reserva */
		var calFecha= new Date();	
		var hoy = new Date(calFecha.getFullYear(),calFecha.getMonth(),calFecha.getDate());
		$("#fecha").datepicker({minDate:hoy,dateFormat:"d/mm/yy",altField:"#checkin"});
		$( "#fecha" ).prop("value",$.datepicker.formatDate('d/mm/yy', new Date()) )
		
		$(document ).on("keypress","#llegada",function() {
		 	//console.log("prueba");
		 	$("#ac").val("")
		});
		
		$("#laflecha").click(function()
	{	
		$("#prit2").slideToggle();
	});
	
	
		$("#search").click(	function(){
				
				var ban=true;
				
				/////////////////////////////////////////////////////////////////////////////////
			// solos valido cuando son de los de travelnet
			if($("#esMY").val()==0)
			{		
				if($("#llegada").val()=="" || /^\s+$/.test($("#llegada").val()) || $("#dc").val()=="" || $("#ac").val()=="")
				{
					
					alert(idioma.buscador.valida1);
					ban=false;
				}
				
				if($("#startDate").val()=="" && ban)
				{
					alert(idioma.buscador.valida2);
					ban=false
				}
				
				if($("#trans").val()==0 && ban)
				{
					alert(idioma.buscador.valida3);
					ban=false;	
				}
				if($("#hotel").val()==0 && ban)
				{
					alert(idioma.buscador.valida4);
					ban=false;
				}
				
				
				var  mes = calFecha.getMonth()+1;
					var dia = calFecha.getDate();
					if(mes>=1 && mes <=9)
					{ mes ="0"+mes;}
					if(dia>=1 && dia<=9)
					{ dia="0"+dia; }
					
					var hoyCompara = dia+"-"+mes+"-"+calFecha.getFullYear();
					
					
					if(hoyCompara ==$("#startDate").val())
					{	
						$("#alert").show();
						$("#frame").hide();
						$(document).scrollTop( $("#alert").offset().top -200);
						ban=false;
					
						
					}
					else
					{
						
						//$("#frame").show();
						//$("#alert").hide();	
						//$(document).scrollTop( $("#loading").offset().top-100 ); 	
					}
			}
				
				if(ban)
				{
					var last=$("#reservas").serializeArray();
					
					$("#frameContent").hide();
					$("#loading").show();
					$("#listado").hide();
					$("#frameGo").hide();
					$("#FA").hide();
					$("#frame").show();
					$("#filtrosSection").hide();
					$(document).scrollTop( $("#loading").offset().top-100 );  
				  
					
					
					$("#resultadoLista").html("");
					
					$.ajax({
						 url:"../_assets/_controllers/transferProcesaBuscador.php",
						 type:"POST",
						 dataType:"html",
						 data:{
						  valueF :last,
						  esMY:$("#esMY").val()}									 
						}).done(function(data){ 
												
						if(data=="") {
							$("#filtrosSection").hide();
							$("#resultadoLista").html("");
							$("#resultadoLista").html("<p>"+idioma.resultadosTransfers.error+"</p>");
							$("#loading").hide();
						}
						
						else {
							$("#resultadoLista").html(data);
							$("#loading").hide();
							$("#prit2").hide();
							$("#laflecha").show();
							$("body").trigger("validaCheckRW");
							$("input[type=checkbox]").uniform();

							//$.getScript("../../../carrito/jcart/js/jcart.min.js", function(){ 	 });
							
							if($("#maxprecio").length>0) {
								$("#filtrosSection").show();
								//$("#minimo").text("$"+0+" USD");
								//$("#max").text("$"+$("#maxprecio").val()+" USD");
																
								//$('#slider-rangeH').slider( "option", "max",$("#maxprecio").val().replace(/,/g, '') );
								//$('#slider-rangeH').slider( "option", "values",[0,$("#maxprecio").val().replace(/,/g, '')] );
								//$('#slider-rangeH').slider("value", $('#slider-rangeH').slider("value"));
								
								var valorMaximo=parseInt($("#maxprecio").val().replace(/,/g, ''));
								var valorMinimo=parseInt($("#minprecio").val().replace(/,/g, ''));
										
								$("#minimo").text("$"+$("#minprecio").val()+" USD");
								$("#max").text("$"+$("#maxprecio").val()+" USD");

								$('#slider-rangeH').slider( "option", "min",valorMinimo );
								$('#slider-rangeH').slider( "option", "max",valorMaximo );
								$('#slider-rangeH').slider( "option", "values",[valorMinimo,valorMaximo] );
								$('#slider-rangeH').slider("value", $('#slider-rangeH').slider("value"));
							}								
						}
				   });					
					
					
					
					//$("#loading").hide();
					/*$("#frame").html("Hi!!! This service module is currently under maintenance. It will be operating shortly. Please contact your Travel Concierge by phone or email. Sincerely Development Management.").show();*/
					
					 
					/*$("#frameContent").prop("src","https://www.travelnet.com.mx/Boxtravelnet/traslados?"+last).iframeHeight({ debugMode : true });*/
					
				/*	$("#frameContent").load(function(){
						$("#loading").hide();
						$(this).css("display","block");					
					
					});*/
						
				}
		});
		
		
		// dispara la busqueda con los filtros seleccionados
	/*		var a;
	var de;
	var val;*/
	$(document).on("click","#botonFiltro",function(){
			
	/*			val = $("#precioselect").val();
			if (val == 2){
				a = $("#minimo").html();
				de = $("#max").html();
				//alert("si");
			}else if(val == 1){
				de = $("#minimo").html();
				a = $("#max").html();
				//alert("no");
			}*/
			
			$("#filtrosSection").hide();
			$("#frame").show();
			$("#resultadoLista").hide();
			$("#resultadoLista").html("");
			$("#loading").show();
			$(document).scrollTop( ($("#frame").offset().top-300) );  
			
			$.ajax({
						url:"../_assets/_controllers/filtroTransfers.php",
						type:"POST",
						//dataType:"html",
						data:{
							/*
								precioInicio :$("#minimo").html(),
								precioFinal:$("#max").html(),
								*//*
														precioInicio :de,
								precioFinal:a
								*/	
							mayormenortr:$("#precioselect").val(),
							 }
						}).done(
						function(data) {
							if(data=="") {
								$("#filtrosSection").hide();
								$("#resultadoLista").html("");
								$("#resultadoLista").html("<p>"+idioma.resultadosTransfers.error+"</p>");
								$("#loading").hide();
							}
							else {
								$("#filtrosSection").show();
								$("#resultadoLista").show();
								$("#resultadoLista").html(data);
								$("#loading").hide();
								$("body").trigger("validaCheckRW");
								$("input[type=checkbox]").uniform();
							}
						});
			
	});
		
		function addCommas(nStr)
		{
			nStr += '';
			x = nStr.split('.');
			x1 = x[0];
			x2 = x.length > 1 ? '.' + x[1] : '';
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + ',' + '$2');
			}
			return x1 + x2;
		}
	
		// funcionamiento para cargar los campos de edad de los niños
		
		//$(".cubiertoNino").change(function(){
			
			$(document).on('change', ".cubiertoNino", function () {
			
			var id=$(this).prop("id").split("_");
			var solicitado=$(this).val();
			
			var totalMostrado=$("#habitacion_"+id[1]+" ul li").length - 2;
			
			
			if(solicitado==0)
			{
				for(i=0; i<totalMostrado; i++)
				{		
					$("#habitacion_"+id[1]+" li:last").remove();
					//$("#habitacion_"+id[1]).css("display","none");
				}
			}
			
			else
			{
				$("#habitacion_"+id[1]).css("display","block");
				if(totalMostrado<solicitado)
				{
					//saco la diferencia y muestro los que tengo que mostrar
					var m = solicitado-totalMostrado;
							//	for(var i=0; i<m; i++)
								//{
									//var ha=totalMostrado+(i+1);
					$.ajax({
						url:"_assets/_controllers/masEdades.php",
						dataType:"html",
						type:"POST",
						data:{
								cantidadN:m,
								hab:id[1],
								m:totalMostrado
							}	
						}).done(function(data){
								$("#habitacion_"+id[1]+" ul").append(data);
							});
								///}
							
				}
				
				else
				{
					// elimino 	
					var m=totalMostrado-solicitado;
					//alert(m);
					for(var i=0; i<m; i++)
					{
										//alert("dsaf "+i);
						$("#habitacion_"+id[1]+" li:last").remove();
					}
				}
			}
			
			
			
			
		});
		
		
		
		
		//funcionamiento para mostrar los campos de las habitaciones
		$("#rooms").on("change",function(){
			var cuartos =$(this).val();
			
			if(cuartos>0)
			{
				$.post("../../_assets/_controllers/masHabitacionesCrucero.php",{ solicitado:cuartos}, function(data){
					$("#habitaciones").html(data);		
					
					
				});	
				$("#totalHab").val(cuartos);	
			}
			else
			{
				$("#habitaciones").html("");		
			}
			
			
			/*
			var totalUl =$("li.referencia").length;
			var anterior=$("#totalHab").val();
			var actual=$(this).val();
			
			
			if( actual < anterior)
			{
				var resta=anterior-actual;
				
				for(var a=0; a<resta; a++)
				{$("#masHabi  li.referencia:last").remove();}
				$("#totalHab").prop("value",$("li.referencia").length);
			}
			else
			{
			
				if(totalUl<3)
				{
					var respuesta = $.post("../../_assets/_controllers/masHabitacionesCrucero.php",
					{solicitado:actual,mostrados:totalUl});
						
					respuesta.done(function(data){
						$("#masHabi").append(data);
						$("#totalHab").prop("value",$("li.referencia").length);
					});
				}
			}
			
			*/
			
			
		});
	
		
		
	
		$(document).on("click",".contenidoCajaTitulo",function(){
				
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
		
		
		$(document).on("click",".tabs li",function(){
			//$(".ancla").on("click", function () {
				
				var elemento=$(this).prop("id");
				var div;
				
				if(elemento=="compartidos")
				{div="#anclaCompartidos";}
				else
				{div="#anclaPrivados";}
				
       			$('html,body').animate({
					scrollTop: $(div).offset().top-100 
			    }, 2000);
    	});
		
		
		/////////////////////////////////////////////////////////////////////////////////
		// clic en el boton de book del transfers, mando la clave a un controlador para asignarcela a una variable de session para usar
		// en tarifas.php dentro de la carpeta de transfers
		
		$(document).on("click",".boton",function(){
				var dato = $(this).data("value");
				var auxx=dato.split(",.-");// no funciona para trasfers de travelnet - es unico para traspaso de datos para los transfers de casa
				
				var respuesta = $.post("../../_assets/_controllers/getClaveTransferMys.php",
							{clave:auxx[1]});
							respuesta.done(function(data){
								window.location = '../transfers/tarifas.php';
							});
							
				
		});	
		
		//////////////////////////////////////////////////////////////////////////////////
		/// lleno los combos de aeropuertos y hoteles si ya se cuenta con una consulta previa
		
		var idDC=$("#dc").val();
		var idAC=$("#ac").val();
		var pickup=$("#pickup").val();
		var dropoff=$("#dropoff").val();
				
		$.ajax({
					url: "http://www.travelnet.com.mx/Autocompleteboxjsonp/trasladohotelaeropuerto?callback=?",
					// the name of the callback parameter, as specified by the YQL service
					jsonp: "callback",
					// tell jQuery we're expecting JSONP
					dataType: "jsonp",
					// tell YQL what we want and that we want JSON
					data: {
							ac:idDC,
							dc:idAC,
							'do':pickup,
							pu:dropoff,
							lang:'es'
				},
				// work with the response
				success: function( response ) {
					$( "#trans" ).empty();
					$( "#trans" ).append( "<option value='0'>Seleccione un Aeropuerto...</option>" );
					$( "#hotel" ).empty();
					$( "#hotel" ).append( "<option value='0'>Seleccione un Hotel...</option>" );
					var aero=$("#trans_name").val();
					var hot=$("#hotel_name").val();
					
					//console.log( "Respuesta 2: "+response ); // server response
					$.each( response, function( key, value ) {
	
						$.each( value, function( key2, value2 ) {
	
						//console.log( key+ " - "+ key2 + ": " + value2.name );
						
						if(key=="hotels")
						{
							if(value2.hotel_code==hot)
							{	$("#hotel" ).append( "<option value='"+value2.hotel_code+"' selected>"+value2.name+"</option>" ); }
							else
							{ $("#hotel" ).append( "<option value='"+value2.hotel_code+"'>"+value2.name+"</option>" ); }
							
						}
						else
						{
							if(value2.terminal==aero)
							{ $( "#trans" ).append( "<option value='"+value2.terminal+"' selected >"+value2.name+"</option>" ); }
							else
							{$( "#trans" ).append( "<option value='"+value2.terminal+"'>"+value2.name+"</option>" );}
						}
						
						
						
						});
					//console.log( key + ": " + value );
	
					});
					
				}
			});
			
		
		////////////////////////////////////////////////////////////////////////////////
		// determino si en la url hay que realizar alguna busqueda
		
		if(location.search!="")
		{
			
			var variables= getVarsUrl();
			
			if(variables.bandera=="buscador")
			{
				var last=$("#reservas").serializeArray();
					
					$("#frameContent").hide();
					$("#loading").show();
					$("#listado").hide();
					$("#frameGo").hide();
					$("#FA").hide();
					$("#frame").show();
					$(document).scrollTop( $("#loading").offset().top-100 );  
				  
					
					
					$("#resultadoLista").html("");
					
					$.ajax({
						 url:"../_assets/_controllers/transferProcesaBuscador.php",
						 type:"POST",
						 dataType:"html",
						 data:{
						  valueF :last,
						  esMY:$("#esMY").val()}									 
						}).done(function(data){											
							if(data=="") {
								$("#filtrosSection").hide();
								$("#resultadoLista").html("");
								$("#resultadoLista").html("<p>"+idioma.resultadosTransfers.error+"</p>");
								$("#loading").hide();
							}
							
							else {
								$("#resultadoLista").html(data);
								$("#loading").hide();
								$("body").trigger("validaCheckRW");
								$("input[type=checkbox]").uniform();
								//$.getScript("../../../carrito/jcart/js/jcart.min.js", function(){ 	 });
								
								if($("#maxprecio").length>0) {
									$("#filtrosSection").show();
									//$("#minimo").text("$"+0+" MXN");
									//$("#max").text("$"+$("#maxprecio").val()+" MXN");
																	
									//$('#slider-rangeH').slider( "option", "max",$("#maxprecio").val().replace(/,/g, '') );
									//$('#slider-rangeH').slider( "option", "values",[0,$("#maxprecio").val().replace(/,/g, '')] );
									//$('#slider-rangeH').slider("value", $('#slider-rangeH').slider("value"));
									
									var valorMaximo=parseInt($("#maxprecio").val().replace(/,/g, ''));
									var valorMinimo=parseInt($("#minprecio").val().replace(/,/g, ''));
											
									$("#minimo").text("$"+$("#minprecio").val()+" USD");
									$("#max").text("$"+$("#maxprecio").val()+" USD");

									$('#slider-rangeH').slider( "option", "min",valorMinimo );
									$('#slider-rangeH').slider( "option", "max",valorMaximo );
									$('#slider-rangeH').slider( "option", "values",[valorMinimo,valorMaximo] );
									$('#slider-rangeH').slider("value", $('#slider-rangeH').slider("value"));
								}									
							}
					   });
			}
			
		}
			
$(window).load(function(){
var valueSession= $("#sessionTransfers").val();
localStorage.setItem("seleccionadoBotonTravelService", "Transfers");

	if(valueSession==1){
		var last=$("#reservas").serializeArray();
					
					$("#frameContent").hide();
					$("#loading").show();
					$("#listado").hide();
					$("#frameGo").hide();
					$("#FA").hide();
					$("#frame").show();
					$("#filtrosSection").hide();
					$(document).scrollTop( $("#loading").offset().top-100 );  
				  
					
					
					$("#resultadoLista").html("");
					
					$.ajax({
						 url:"../_assets/_controllers/transferProcesaBuscador.php",
						 type:"POST",
						 dataType:"html",
						 data:{
						  valueF :last,
						  esMY:$("#esMY").val()}									 
						}).done(function(data){ 
												
						if(data=="") {
							$("#filtrosSection").hide();
							$("#resultadoLista").html("");
							$("#resultadoLista").html("<p>"+idioma.resultadosTransfers.error+"</p>");
							$("#loading").hide();
						}
						
						else {
							$("#resultadoLista").html(data);
							$("#loading").hide();
							$("body").trigger("validaCheckRW");
							$("input[type=checkbox]").uniform();
							//$.getScript("../../../carrito/jcart/js/jcart.min.js", function(){ 	 });
							
							if($("#maxprecio").length>0) {
								$("#filtrosSection").show();
								//$("#minimo").text("$"+0+" USD");
								//$("#max").text("$"+$("#maxprecio").val()+" USD");
																
								//$('#slider-rangeH').slider( "option", "max",$("#maxprecio").val().replace(/,/g, '') );
								//$('#slider-rangeH').slider( "option", "values",[0,$("#maxprecio").val().replace(/,/g, '')] );
								//$('#slider-rangeH').slider("value", $('#slider-rangeH').slider("value"));
								
								var valorMaximo=parseInt($("#maxprecio").val().replace(/,/g, ''));
								var valorMinimo=parseInt($("#minprecio").val().replace(/,/g, ''));
										
								$("#minimo").text("$"+$("#minprecio").val()+" USD");
								$("#max").text("$"+$("#maxprecio").val()+" USD");

								$('#slider-rangeH').slider( "option", "min",valorMinimo );
								$('#slider-rangeH').slider( "option", "max",valorMaximo );
								$('#slider-rangeH').slider( "option", "values",[valorMinimo,valorMaximo] );
								$('#slider-rangeH').slider("value", $('#slider-rangeH').slider("value"));
							}
								
							
																
						}
				   });			
					
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