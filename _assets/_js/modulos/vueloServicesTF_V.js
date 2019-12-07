// JavaScript Document
// --------------------------------------------
$(document).ready(function(e) {
	        $(".iconoTipoVuelo").addClass('avionOrange');

	/*$.fancybox(
		'<div id="InventarioRegina" class="modal"><div class="fullin colorlogo"><img class="logopopregina" src="https://members.beyond-experience.com/_assets/_images/template/logo-1000.png"/></div><img class="fullin tira" src="https://members.beyond-experience.com/_assets/_images/popupInventarioRegina/cintillo.jpg"/><div class="fondopopup"><span class="titulopop">We’re sorry </span><span class="parrafopop">This section is currently in maintenance, please contact your Travel Concierge for any question or request. Thank you!.</span><div class="centerpop"><div class="iblockpop w70"><img class="telefonopop" src="https://members.beyond-experience.com/_assets/_images/popupInventarioRegina/ico-telefono.png"/><span class="numerospop">	USA, CAN: 1-888-963-7689<br>Mexico: 1-800-272-0294</span></div></div></div></div>',
		{
        		'autoDimensions'	: false,
			'width'         		: 350,
			'height'        		: 'auto',
			'transitionIn'		: 'none',
			'transitionOut'		: 'none'
		}
	).trigger('#in');*/




	//Escondemos las alertas desde el inicio
	$(".alertGood").hide();
	$(".alertBad").hide();
	$(".alertBad2").hide();

	//Escondemos los mensajes de selección de vuelo
	$(".vueloSalida").hide();
	$(".vueloRegreso").hide();

	$("#laflecha").hide();
	$("#redondo").hide();
	$("#backToReturn").hide();
   
	$(".radio").uniform();
	$("input[type=checkbox]").uniform();

		$("#flightfrom_0").prop("value","");
	$("#flightto_0").prop("value","");
	$("#startDate_0").prop("value","");
/*
	$("#sh_0").prop("value",);
	$("#sh_1").prop("value",);
	$("#sh_2").prop("value",);
	$("#sh_3").prop("value",);
	$("#sh_4").prop("value",);
*/

	$(".custom-select").prop("value","");
	$("#child").prop("value",0);
	$("#adult").prop("value",0);
	$("#flightto_1").prop("value","");
	$("#flightto_2").prop("value","");
	$("#flightto_3").prop("value","");
	$("#flightto_4").prop("value","");
	$("#flightfrom_1").prop("value","");
	$("#flightfrom_2").prop("value","");
	$("#flightfrom_3").prop("value","");
	$("#flightfrom_4").prop("value","");
		
	$("a.retorno").click(function() {
		var lastt = $("#reservas").serializeArray();
		$("#loading").show();
		$("#ListaVuelosReturn").hide();
		$("#backToReturn").hide();
		$("#infoVO").hide();
		$(".vueloSalida").hide();
		$(".vueloRegreso").hide();
		$.ajax({
			url:"_assets/_controllers/vuelosProcesaBuscadorTF_V.php",
			type:"POST",
			//dataType:"html",
			data: {
				valueF: lastt,
				retorno: "llena"
			}
		}).done(function(data){
			//alert(data);
			if ( data=="malo" ){
				$("#muestraInfo").show();
				$("#resultadoLista").show();
				$("#loading").hide();
			} else {
				$("#resultadoLista").html(data);
				$("#loading").hide();
				$(".vueloSalida").show();
				$("#resultadoLista").show();					
				$("#listado0").hide();
				$("#listado1").hide();
				$("#listado2").hide();
				$("#listado3").show();
				$("#listado4").hide();
				$("#listado5").hide();
				$("#listado6").hide();
				$("#filtrosSection").show();
				paginacion();
			}
		});	 
		return false;
	})

	function getUrlVars() {
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for (var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
    }

	//alert($("#multivuelos").val());
	//var dob   =(new Date("29/04/2014"), 'MM dd yyyy');
	
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
		
		$(document).on("click",".pestanas li",function(){
			
			$(".pestanas li").removeClass("activo");
			var acc = $(this);
			acc.addClass("activo");
			
			
			switch( acc.attr("value") ) {
			 case "0":
        		$("#listado0").show();
				$("#listado1").hide();
				$("#listado2").hide();
				$("#listado3").hide();
				$("#listado4").hide();
				$("#listado5").hide();
				$("#listado6").hide();			 
			 break;
    		 case "1":
        		$("#listado1").show();
				$("#listado0").hide();
				$("#listado2").hide();
				$("#listado3").hide();
				$("#listado4").hide();
				$("#listado5").hide();
				$("#listado6").hide();
        		break;
    		 case "2":
			    $("#listado0").hide();
         		$("#listado1").hide();
				$("#listado2").show();
				$("#listado3").hide();
				$("#listado4").hide();
				$("#listado5").hide();
				$("#listado6").hide();
        		break;
    		 case "3":
			    $("#listado0").hide();
         		$("#listado1").hide();
				$("#listado2").hide();
				$("#listado3").show();
				$("#listado4").hide();
				$("#listado5").hide();
				$("#listado6").hide();
        		break;
    		 case "4":
			    $("#listado0").hide();
         		$("#listado1").hide();
				$("#listado2").hide();
				$("#listado3").hide();
				$("#listado4").show();
				$("#listado5").hide();
				$("#listado6").hide();
        		break;	
    		 case "5":
			    $("#listado0").hide();
         		$("#listado1").hide();
				$("#listado2").hide();
				$("#listado3").hide();
				$("#listado4").hide();
				$("#listado5").show();
				$("#listado6").hide();
        		break;	
    		 case "6":
			    $("#listado0").hide();
         		$("#listado1").hide();
				$("#listado2").hide();
				$("#listado3").hide();
				$("#listado4").hide();
				$("#listado5").hide();
				$("#listado6").show();
        		break;																	
			}
			
			/*if(acc.attr("value")=="1")
			{
									
									 $("#listado1").show();
									 $("#listado2").hide();
				 
										
								} else 			if(acc.attr("value")=="2")
								{
									
									 $("#listado1").hide();
									 $("#listado2").show();
				 
										
								}*/
  
               });	
				
		
		
		//-----------------------------------------------------------------		
		$(document).on("click",".botoncitoOD",function(){
			var auxx ="";			
			var dato       = $(this).data("value");		   
			var claveBtn   = $(this).attr('id');		   
			var xxcve      = claveBtn.split("_");
			var nombreText = "salidaIda_"+xxcve[1];
			var fshow  = "";		  
			var fshowd = $("#"+nombreText).val();		  
			var fshowA = fshowd.split("#"); 

			//alert($("#"+nombreText).val());
			//alert();
			// alert(claveBtn);		   		 
			auxx = dato.split("|");
			fshow  = auxx[10];

			$("#resultadoLista").hide();
			$(".vueloSalida").hide();
			$(".vueloRegreso").hide();
			$("#loading").show();

			var strVuelo = "Outward Flight : " + fshow + " Vendor: " + auxx[6];	

			$("#infoVO").show();		  
			$("#infoVO").html(strVuelo);	  

			$.ajax({
				url:"_assets/_controllers/vuelosProcesaBuscadorTFR.php",
				type:"POST",
				//dataType:"html",
				data: {
					grupoID: auxx[0],
					outwardID:auxx[1],
					routingID:auxx[2],
					loginID:auxx[3],
					precio1:auxx[4],
					tipoCambio:auxx[5],
					vendor:auxx[6],
					logo:auxx[7],
					viajeIda:$("#"+nombreText).val(),
					precio:auxx[8],
					fechaI: auxx[9]
				},
				success: function (data) {
					$("#loading").hide();
					$("#ListaVuelosReturn").html(data);
					$("#ListaVuelosReturn").show();
					$("#backToReturn").show();
					$(".vueloSalida").hide();
					$(".vueloRegreso").show();
								
					/*if(data=="malo"){
						$("#muestraInfo").show();
						$("#resultadoLista").show();
						$("#loading").hide();
					} else {
						$("#resultadoLista").html(data);
						$("#loading").hide();
						$("#resultadoLista").show();					
						$("#listado0").hide();
						$("#listado1").hide();
						$("#listado2").hide();
						$("#listado3").show();
						$("#listado4").hide();
						$("#listado5").hide();
						$("#listado6").hide();
						$("#filtrosSection").show();
						paginacion();
					}*/
				}
			});		  	
			// $("#loading").show();	
			//				
			// alert(dato);
			//window.location = '../tours/'+normalize($("#destinoTours").val())+'/'+normalize(auxx[5])+'/'+auxx[1]+'/informacion';		    
		});
		
		
	//-----------------------------------------------------------------				
	$("#pest li").on("click",function(){
			
		$("#pest li").removeClass("activo");
				
		var acc = $(this);
		acc.addClass("activo");
	
		if ( acc.attr("value")=="1" ) {
									
			$("#listado1").show();
			$("#listado2").hide();
				 
										
		} else if (acc.attr("value")=="2") {
									
			$("#listado1").hide();
			$("#listado2").show();
				 										
		}
				
							
				/*$.ajax({
							url:"_assets/_controllers/cargaBWeeks.php",
							data: { clave:acc.attr("value") },
							success: function(data){ 
								$("#listado").html(data);
								
								if(acc.attr("value")=="RBW")
								{
									console.log("fsadjafhdsjkfds");
									 $("input[type=checkbox]").uniform();
									 $("body").trigger("validaCheckRW");
				 
									$('.tooltipBotton').tooltipster();	
								}
							}
						
					});*/
				
				
				
		});				
				
	
	/////////////////////////////////////////////////////////////////////////////////
		// setear las fechas apartir del calendario seleccionado hacia abajo
		$(".inputFecha").datepicker({
			changeMonth : true,
			numberOfMonths : 2,
			dateFormat : 'mm/dd/yy',
			minDate:0,			
			onSelect : function(selectedDate) {
				
				var id = $(this).prop("id");
				var indice = id.split("_");
				
				if( indice[0]=="startDate" )
				{
					var valor=parseInt(indice[1])+parseInt(1);
					var arrayDate = selectedDate.split("-");
					var fecha = new Date(arrayDate[2], arrayDate[1]-1,arrayDate[0]);
					fecha.setDate(fecha.getDate() );
					
					////////////////////////////////////////////////////////////////
					// seteo el calendario de round trip
					if(indice[1]=="0")
					{
						var fecha = new Date(arrayDate[2], arrayDate[1]-1,arrayDate[0]);
						fecha.setDate(fecha.getDate());
						
						var  nomb = "#endDate_"+indice[1];
						
						$(nomb).datepicker("option", "minDate",selectedDate);
						$(nomb).datepicker("setDate", fecha);
					}
					
					////////////////////////////////////////////////////////////////
					// seteo todos los calendario
					for(var i=valor; i<5; i++)
					{
						//alert(selectedDate);
						$("#startDate_"+i).datepicker("option","minDate",fecha);
						$("#startDate_"+i).datepicker("setDate", fecha);
							
					}
				}
			}
		});
		$("#startDate_0").datepicker("option", "minDate",2);
	
	///////////////////////////////////////////////////////////////////////////7
	// 	seteo todos los demas vuelos y determino cual mostrar de acuerdo a un campo oculto
		
			//$("#fechaLlegada").hide();
			//$("#horaLlegada").hide();
				
			$("#vuelo2").hide();
			$("#vuelo3").hide();
			$("#vuelo4").hide();
			$("#vuelo5").hide();
				
			//$("#agregarVuelo").hide();
				
			$("#vuelo2").find("input, select").prop("disabled","disabled");
			$("#vuelo3").find("input, select").prop("disabled","disabled");
			$("#vuelo4").find("input, select").prop("disabled","disabled");
			$("#vuelo5").find("input, select").prop("disabled","disabled");	
			
			//////////////////////////////////////////////////////////////////
			// recupero el valor de tipo de viaje para determinar si se muestra o no los vuelos multiples
			if($("#tipovuelo").val()=="multiple")
			{
				var control=0;
				var control2=1;
				
				for(var a=2; a<=$("#multivuelos").val(); a++)
				{
					$("#vuelo"+a).show();
					$("#vuelo"+a).find("input, select").prop("disabled","");
					
					var dateFormat = $("#startDate_"+control).datepicker('getDate')
					$("#startDate_"+control2).datepicker("option", "minDate",dateFormat);
					control++;
					control2++;
				}
			}
			
			if( ($("#multivuelos").val()<=5) && ($("#tipovuelo").val()=="multiple"))
			{
				$("#botones").show();
				if($("#multivuelos").val()==5)
				{$("#moreF").hide();}
				else
				{$("#moreF").show();}
			}
			
			$(document).on("keypress","#flightfrom_0",function(){
				$("#cFrom_0").val("");
			});
			
			$(document).on("keypress","#flightto_0",function(){
				$("#cTo_0").val("");
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
	
			$(".iconoTipoVuelo").on("click",function(e){
			//e.preventDefault();
    if ($(this).hasClass('avionOrange')){
        $(".iconoTipoVuelo").removeClass('avionOrange'); 
    }else{
        $(".iconoTipoVuelo").addClass('avionOrange');  
    }
		$("#prit2").slideToggle();

	});
	$("input[type=radio]").on("click", function (e) {
						$(".iconoTipoVuelo").addClass('avionOrange');  
$("#prit2").slideDown();
		var val = $(this).val();
		$(".vueloSalida").hide();
		$(".vueloRegreso").hide();
		$("#backToReturn").hide();
		//$("#resultadoLista").html("");
		$("#ListaVuelosReturn").hide();
		if(val==="roundtrip"){
			$("#multivuelos").prop("value",2);
			//alert($("#multivuelos").val());
			$("#tipovuelo").prop("value", "roundtrip");
			$("#regresoRedondo").show();
			$("#vuelo3,#vuelo4,#vuelo5,#multivuelosDiv,#botones").hide();
			$("#multivuelos").find("input, select").prop("disabled","disabled");
			var dateFormat = $("#startDate_0").datepicker('getDate')
			$("#endDate_0").datepicker("option", "minDate",dateFormat);
			$("#endDate_0").datepicker("setDate", dateFormat);
		} else {
			$("#multivuelos").prop("value",1);	
			$("#tipovuelo").prop("value", "oneway");
			$("#startDate").css("margin-right", "0");
			$("#regresoRedondo").hide();
			$("#vuelo3,#vuelo4,#vuelo5,#multivuelosDiv,#botones").hide();	
			$("#multivuelos").find("input, select").prop("disabled","disabled");
		}
	});
		
	$("#moreF").on("click",function(){
			
			var total = $("#multivuelosDiv .vuelosMulti").length;
			
			var visible =1;
			for(var i=0; i<total; i++ )
			{
				if($("#multivuelosDiv .vuelosMulti").eq(i).css("display")==="block")
				{ visible = visible+1; }
			}
			if(visible>=1)
			{
			
				
				visible=visible+1;
				if(visible<5)
				{
					//alert(visible);
					var nom = "#vuelo"+visible+"";
					//alert(nom);
					$(nom).show();	
					$(nom).find("input, select").prop("disabled","");
					$("#removeF").show();
				}
				else if(visible===5)
				{
						var nom = "#vuelo"+visible+"";
					//alert(nom);
					$(nom).show();	
					$(nom).find("input, select").prop("disabled","");
					$(this).hide();
				}
				else
				{ $(this).hide(); }
			}
			$("#multivuelos").prop("value",parseInt($("#multivuelos").val())+parseInt(1));
	});
		
		$("#removeF").on("click",function(){
			var total = $("#multivuelosDiv .vuelosMulti").length;
			var visible =1;
			for(var i=0; i<total; i++ )
			{
				if($("#multivuelosDiv .vuelosMulti").eq(i).css("display")==="block")
				{ visible = visible+1; }
			}
			//alert(visible);
			
			
			/*$("#vuelo"+nom).find("input").val("");
			$("#vuelo"+nom).find("select").val(0);
			
			*/
			$("#vuelo"+visible).find("input, select").prop("value","");
			
			$("#vuelo"+visible).find("input, select").prop("disabled","disabled");
			$("#vuelo"+visible).hide();
			
			if(visible===5)
			{
				$("#moreF").show();	
			}
			if(visible===3)
			{
				$(this).hide();	
			}
			$("#multivuelos").prop("value",$("#multivuelos").val()-1);
			
		});
		
		
		/* calendario de reserva */
		
		var calFecha= new Date();	
		
		var hoy = new Date(calFecha.getFullYear(),calFecha.getMonth(),calFecha.getDate());
		
	
		//funcionamiento para mostrar los campos de las habitaciones
		
		$("#child").on("change",function(){
			var id = $(this).attr("id").split("_");
			var solicitado = $(this).val();
			//if(id[0]=="ninosAV") {
			// saco la cuenta de cuantos existen 
			var totalMostrado = $("#habitaciones div").length;
			$("#habitaciones").show();
			if(solicitado == 0) {
				//$("#edadesV_"+id[1]+" li").remove();
				//$("#edadv_"+id[1]).css("display","none");
				$("#habitaciones div").remove();
			} else {
				//$("#edadv_"+id[1]).css("display","block");
				$("#habitaciones").html("");
				$.ajax({
					url: "_assets/_controllers/getEdadChildVueloTF.php",
					dataType: "html",
					type: "POST",
					data: {
						cantidadN: solicitado,
						hab: 1,
						m: totalMostrado
					}
				}).done(function (data) {
					$("#habitaciones").append(data);
					//$("input[type=checkbox]").uniform();
				});
				/*if(totalMostrado < solicitado) {
					//saco la diferencia y muestro los que tengo que mostrar
					var m = solicitado-totalMostrado;
					//for(var i=0; i<m; i++) {
						//var ha=totalMostrado+(i+1);
						$.ajax({
							url:"../_assets/_controllers/getEdadChildVueloTF.php",
							dataType:"html",
							type:"POST",
							data:{
								cantidadN:m,
								hab:1,
								m:totalMostrado
							}	
						}).done(function(data){
							$("#habitaciones").append(data);
							//$("input[type=checkbox]").uniform();
						});
					//}
				} else {
					// elimino 	
					var m=totalMostrado-solicitado;
					//alert(m);
					for(var i=0; i<m; i++) {
							//alert("dsaf "+i);
							$("#habitaciones div:last").remove();
							//$("#edadesV_"+id[1]+" li:last").remove();
					}
				}*/
			}
							
						//}
						
			/*var cuartos=$(this).val();
			var totalElementos =$("#ninosSelect li").length;
			if(cuartos>0)
			{
				$("#habitaciones").show();	
				/// cuento los elemetos que estan en block 	
				var total =0;
				
				for(var i=0; i<=totalElementos; i++)
				{
					if($("#age_"+i).css("display")==="block")
					{
						total = total+1;	
					}	
				}
				
				if(total<cuartos)
				{
					/// muestra los elementos
					for(var a=total; a<=cuartos; a++)
					{
						$("#age_"+a).css("display","block");	
					}	
				}
				else
				{
					var elementosOcultos = total-cuartos;
					
					//alert(elementosOcultos+" - -- - - "+ total);
					
					for(var a=total;  a>cuartos; a--)
					{
						//alert(a);
						$("#age_"+a).css("display","none");	
						
						$("#edadNH_"+a).val(0);
						$("input[name=s1k"+a+"]").prop("value",0);
						$("#asit_"+a).show();
						$("#asiento_"+a).prop("checked",false);
						$.uniform.update($("#asiento_"+a));
						
				
						
					}
					
				}
				
				
			}
			else
			{
				$(".liNino").hide();
				$("#habitaciones").hide();	
				
				for(var b=0; b<9; b++)
				{
					$("#edadNH_"+b).val(0);
					$("input[name=s1k"+b+"]").prop("value",0);
					$("#asit_"+b).show();
					$("#asiento_"+b).prop("checked",false);
					$.uniform.update($("#asiento_"+b));
				}
				
			}*/
		});
		
		
		/* oculta asiento*/
		$(document).on("change","#habitaciones select",function(){
			
			var ids=$(this).prop("id");
				
				if($(this).prop("value")>2)
				{
					//alert(ids);
					var ele = ids.split("_");
					
					//$("#asiento_"+ele[2]).find($("#asit_"+ele[2]).hide());
					$("#asiento_"+ele[2]).hide();
					$("#asit_"+ele[2]).prop("checked",false);	
					//$.uniform.update($("#asit_"+ele[2]));
					$("input[name=s1k"+ele[2]+"]").prop("value",0);
					
				}
				else
				{
					var ele = ids.split("_");
					//$("#asiento_"+ele[2]).find($("#asit_"+ele[2]).show());
					$("#asiento_"+ele[2]).show();
					
				}
				
			/*var ids=$(this).prop("id");
			
			if($(this).prop("value")>2)
			{
				//alert(ids);
				var ele = ids.split("_");
				$("#habitaciones").find("#asit_"+ele[1]).hide();
				$("#asiento_"+ele[1]).prop("checked",false);	
				$.uniform.update($("#asiento_"+ele[1]));
				$("input[name=s1k"+ele[1]+"]").prop("value",0);
				
			}
			else
			{
				var ele = ids.split("_");
				$("#habitaciones").find("#asit_"+ele[1]).show();
				
				
			}	*/
		
			
		});
		
		
		
		
		/////////////////////////////////////////////////////////
		// funcionamiento para el clic en el check box de asiento
		
		$("input[type=checkbox]").on("click",function(e){
			
				var name = $(this).prop("id").split("_");
				
				if($(this).is(":checked"))
				{$("input[name=s1k"+name[1]+"]").prop("value",1);}
				
				else
				{$("input[name=s1k"+name[1]+"]").prop("value",0);}
				
		});
		
		
		
		
		
		/* urls de y funcionamiento de las cajas de travelnet*/
		
		//date picker
		/*
		$(".inputFecha").datepicker({
			changeMonth : true,
			numberOfMonths : 2,
			dateFormat : 'dd-mm-yy',
			minDate:0,			
			onClose : function(selectedDate) {
				var id = $(this).prop("id");
				
				var arrayDate = selectedDate.split("-");
				var fecha = new Date(arrayDate[2], arrayDate[1]-1,arrayDate[0]);
				fecha.setDate(fecha.getDate() + 1)
				$(this).datepicker("setDate", fecha);
				
				var indice = id.split("_");
				if(indice[1]=="0")
				{
					//alert("pasa")
					if(indice[0]=="startDate")
					{
						//alert("se activa");
						var  nomb = "#endDate_"+indice[1];
						$(nomb).datepicker("option", "minDate",selectedDate);
						$(nomb).datepicker("setDate", fecha);
						
						
					
						var tipoViaje = $("input[type=radio]:checked").val();
						
						if(tipoViaje==="multiple")
						{
							
							for(var i=1; i<5; i++)
							{
								var arrayDate = selectedDate.split("-");
								var fecha = new Date(arrayDate[2], arrayDate[1]-1,arrayDate[0]);
								fecha.setDate(fecha.getDate() + i);
								
								
								var nombMulti = "#startDate_"+i;
								
								$(nombMulti).datepicker("option","minDate",fecha);
								$(nombMulti).datepicker("setDate", fecha);
							}
						}
					}
				}
				else
				{
					
					var multi = parseInt(indice[1]);
					
					for(var i=multi; i<5; i++)
					{
						//alert(selectedDate);
						
						var arrayDate = selectedDate.split("-");
						var fecha = new Date(arrayDate[2], arrayDate[1]-1,arrayDate[0]);
						
						fecha.setDate(fecha.getDate() + i);
						$("#startDate_"+multi).datepicker("option","minDate",fecha);
						$("#startDate_"+multi).datepicker("setDate", fecha);
						
					}
				}
				
				
				
			}
		});*/
		
		/////////////////////////////////////////////////////////////////////////////////
		// setear las fechas apartir del calendario seleccionado hacia abajo
		$(".inputFecha").datepicker({
			changeMonth : true,
			numberOfMonths : 2,
			dateFormat : 'mm-dd-yy',
			minDate:0,			
			onSelect : function(selectedDate) {
				
				var id = $(this).prop("id");
				var indice = id.split("_");
				
				if(indice[0]=="startDate")
				{
					var valor=parseInt(indice[1])+parseInt(1);
					var arrayDate = selectedDate.split("-");
					var fecha = new Date(arrayDate[2], arrayDate[1]-1,arrayDate[0]);
					fecha.setDate(fecha.getDate() );
					
					////////////////////////////////////////////////////////////////
					// seteo el calendario de round trip
					if(indice[1]=="0")
					{
						var fecha = new Date(arrayDate[2], arrayDate[1]-1,arrayDate[0]);
						fecha.setDate(fecha.getDate());
						
						var  nomb = "#endDate_"+indice[1];
						
						$(nomb).datepicker("option", "minDate",selectedDate);
						$(nomb).datepicker("setDate", fecha);
					}
					
					////////////////////////////////////////////////////////////////
					// seteo todos los calendario
					for(var i=valor; i<5; i++)
					{
						//alert(selectedDate);
						$("#startDate_"+i).datepicker("option","minDate",fecha);
						$("#startDate_"+i).datepicker("setDate", fecha);
							
					}
				}
			}
		});
		
		
		var jsonpurl="http://www.travelnet.com.mx/Autocompleteboxjsonp/vuelos?callback=?";
		var jsonpaerolineas="http://www.travelnet.com.mx/Autocompleteboxjsonp/aerolineas?callback=?";
		
		var jsonGMX = "https://wsgmx.gomexico.travel/TFShowCities";
		
		/* auto completes ,
						lang:"en"  	#flightfrom_1, #flightfrom_2, #flightfrom_3, #flightfrom_4	, #flightto_1, #flightto_2, #flightto_3, #flightto_4"			*/
		
		$("#flightfrom_0, #flightto_0").autocomplete({
			source : function(request, response) {
				$.ajax({
					//url : "https://www.travelnet.com.mx/Autocompleteboxjsonp/ciudades?callback=?",
					url : "_assets/_controllers/autocompleteVuelosTF.php",
					dataType : "json",
					data : {
						q : request.term,
						lang:"en" // es  
					},
					success : function(data) {
							response($.map(data,function(item) {								
								return {					
									label : item.ciudad + ", " + item.pais + " " + item.tipo + " " + item.aeropuerto,
									value : item.ciudad,
									cFrom : item.citycode,
									vTipo : item.tipov,
								}							
							}));
						}
					});
			},
			minLength : 2,
			maxLength : 5,
			select : function(event, ui) {
				var id = $(this).prop("id");
				var indices = id.split("_");
				
				if(indices[0]==="flightfrom")
				{
					
					$("#cFrom_"+indices[1]).val(ui.item.cFrom);	
					$("#tipoDestino1").val(ui.item.vTipo);
					
				}
				if(indices[0]==="flightto")
				{
					
					$("#cTo_"+indices[1]).val(ui.item.cFrom);	
					$("#tipoDestino2").val(ui.item.vTipo);
				}

				
			},
			open : function() {
				$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
			},
			close : function() {
				$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
			}
		});
		
		
		
		$("#airline").autocomplete({
			source : function(request, response) {
				$.ajax({
					url : jsonpaerolineas,
					dataType : "jsonp",
					data : {
						q : request.term,
						lang:"en"
					},
					success : function(data) {
						response($.map(data, function(item) {
							return {
								label : item.aerolinea,
								airline_code : item.code
							}
						}));
					}
				});
			},
			minLength : 2,
			maxLength : 5,
			select : function(event, ui) {

				$("#airline_code").val(ui.item.airline_code);
				/*
				log( ui.item ?
				"Selected: " + ui.item.label :
				"Nothing selected, input was " + this.value);
				 */

			},
			open : function() {
				$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
			},
			close : function() {
				$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
			}
		});
	/*
	$("#laflecha").click(function(){	
		$("#prit2").slideToggle();
	});

	$("#iconoAvion").click(function () {
		if ($("#iconoAvion").hasClass("iconoAvionResultado")) {
			$("#prit2").slideToggle();
			//$("#iconoAvion").removeClass("iconoAvionResultado")
		}
	});
	*/
		
		$("#search").click(function(){
			var mantenimiento = 0;
			if (mantenimiento == 0) {
				var ban=true; var ban2=true;
				$("#frameContent").hide();
				var tipoViaje = $("input[type=radio]:checked").val();
				var calFecha= new Date();	
				var mes = calFecha.getMonth()+1;
				var dia = calFecha.getDate();
				if(mes>=1 && mes <=9)
				{ mes ="0"+mes;}
				if(dia>=1 && dia<=9)
				{ dia="0"+dia; }
				var hoyCompara = dia+"-"+mes+"-"+calFecha.getFullYear();
				//alert(tipoViaje);
				//Ocultamos siempre los mensajes de selección de vuelo
				$(".vueloSalida").hide();
				$(".vueloRegreso").hide();
				if(tipoViaje==="oneway") {
					//alert("flightfrom_0" +$("#flightfrom_0").val());
					//alert("cFrom_0" + $("#cFrom_0").val() );
					if(($("#flightfrom_0").val()=="" && ban) || ($("#cFrom_0").val()=="" && ban)) {
						//alert("Select your origin from the list"); 
						$(".alertGood").hide();
						$(".alertWarning").hide();
						$(".alertBad").show();
						setTimeout(function () {
							$(".alertBad").hide();
						}, 5000);
						ban=false;
					}
					if(($("#flightto_0").val()=="" && ban) || ($("#cTo_0").val()=="" && ban)) {
						//alert("Select your destination from the list");  
						$(".alertGood").hide();
						$(".alertWarning").hide();
						$(".alertBad").show();
						setTimeout(function () {
							$(".alertBad").hide();
						}, 5000);
						return false;
						ban=false;
					}
					if($("#startDate_0").val()=="" && ban) {
						//alert("Select your departure date"); 
						$(".alertGood").hide();
						$(".alertWarning").hide();
						$(".alertBad").show();
						setTimeout(function () {
							$(".alertBad").hide();
						}, 5000);
						ban=false;
					}
					if($("#adult").val()==0 && ban) {
						//alert("Select adult number"); 
						$(".alertGood").hide();
						$(".alertWarning").hide();
						$(".alertBad").show();
						setTimeout(function () {
							$(".alertBad").hide();
						}, 5000);
						ban=false;
					}
				} else if(tipoViaje==="roundtrip") {
					if(($("#flightfrom_0").val()=="" && ban) || ($("#cFrom_0").val()=="" && ban)) {
						//alert("Select your origin from the list"); 
						$(".alertGood").hide();
						$(".alertWarning").hide();
						$(".alertBad").show();
						setTimeout(function () {
							$(".alertBad").hide();
						}, 5000);
						ban=false;
					}
					if(($("#flightto_0").val()=="" && ban) || ($("#cTo_0").val()=="" && ban)) {
						//alert("Select your destination from the list"); 
						$(".alertGood").hide();
						$(".alertWarning").hide();
						$(".alertBad").show();
						setTimeout(function () {
							$(".alertBad").hide();
						}, 5000);
						ban=false;
					}
					if($("#startDate_0").val()=="" && ban) {
						//alert("Select your departure date"); 
						$(".alertGood").hide();
						$(".alertWarning").hide();
						$(".alertBad").show();
						setTimeout(function () {
							$(".alertBad").hide();
						}, 5000);
						ban=false;
					}
					if($("#endDate_0").val()=="" && ban) {
						//alert("Select your arrival date"); 
						$(".alertGood").hide();
						$(".alertWarning").hide();
						$(".alertBad").show();
						setTimeout(function () {
							$(".alertBad").hide();
						}, 5000);
						ban=false;
					}
					if($("#adult").val()==0 && ban) {
						//alert("Select adult number"); 
						$(".alertGood").hide();
						$(".alertWarning").hide();
						$(".alertBad").show();
						setTimeout(function () {
							$(".alertBad").hide();
						}, 5000);
						ban=false;
					}
				}
				else {
					//multiple
					var totalVisibles=1;
					for(var a=1; a<=$(".vuelosMulti").length; a++)
					{
						var cont = a+1;
						if($("#vuelo"+cont).css("display")=="block")
						{ 
							totalVisibles=totalVisibles+1;
						}	
					}
					for(var i = 0; i<totalVisibles; i++)
					{
						var vuelo = i +	1;
						if(($("#flightfrom_"+i).val()=="" && ban) || ($("#cFrom_"+i).val()=="" && ban))
						{ alert("Select your origin to flight "+vuelo+" from the list"); ban=false; }
						if(($("#flightto_"+i).val()=="" && ban) || ($("#cFrom_"+i).val()=="" && ban))
						{ alert("Select your destination to flight "+vuelo+" from the list"); ban=false; }
						if($("#startDate_"+i).val()=="" && ban)
						{ alert("Select your departure date to flight "+vuelo); ban=false;  }
						if($("#adult").val()==0 && ban)
						{ alert("Select adult number"); ban=false; }
					}
				}
				
				if (ban) {
					var last = $("#reservas").serializeArray();
					//alert(last);
					$(".alertGood").show();
					$(".alertWarning").hide();
					$(".alertBad").hide();
					$("#loading").show();
					$("#frame").show();
					$("#resultadoLista").html("");
					$("#ListaVuelosReturn").hide();
					$("#infoVO").hide();
					$("#backToReturn").hide();
					$(document).scrollTop( $("#loading").offset().top - 50 );  

					if (tipoViaje == "oneway" || tipoViaje == "roundtrip") {
						if (hoyCompara == $("#startDate_0").val()) {	
							$("#alert").show();
							$("#frame").hide();
							$(document).scrollTop( $("#alert").offset().top - 200 );
						} else {
							$("#frame").show();
							$("#alert").hide();	
							$(document).scrollTop( $("#loading").offset().top - 100 ); 	
						}
					} else {
						var totalVisibles = 1;
						for (var a = 1; a <= $(".vuelosMulti").length; a++) {
							var cont = a + 1;
							if ($("#vuelo" + cont).css("display") == "block") { totalVisibles = totalVisibles + 1; }	
						}
						for (var i = 0; i < totalVisibles; i++) {
							var vuelo = i +	1;
							if ($("#startDate_" + i).val() == hoyCompara) { 
								$("#alert").show();
								$("#frame").hide();
								$(document).scrollTop( $("#alert").offset().top - 200 );  
							} else {
								$("#frame").show();
								$("#alert").hide();	
								$(document).scrollTop( $("#loading").offset().top - 100 ); 		
							}
						}
					}
					   
					$.ajax({
						url: "_assets/_controllers/vuelosProcesaBuscadorTF_V.php",
						type: "POST",
						//dataType:"html",
						data: { valueF: last, retorno: "0" }
					}).done(function (data) {
						resultado = data.split(".-");
						if (resultado[0] == "malo") {
							//alert("Lo sentimos no se obtuvo resultados, intente cambiando la información de busqueda");
							$("#muestraInfo").show();
							$("#resultadoLista").show();
							$("#loading").hide();
							$("#ListaVuelosReturn").hide();
							$(".alertGood").hide();
							$(".alertWarning").show();
							$(".alertBad").hide();
							/*setTimeout(function () {
								$(".alertWarning").hide();
							}, 5000);*/
						} else {
							$(".alertGood").hide();
							$(".alertWarning").hide();
							$(".alertBad").hide();
							$("#ListaVuelosReturn").hide();
							$("#resultadoLista").show();
							$("#resultadoLista").html(data);
							$("#loading").hide();
							$("#listado0").hide();
							$("#listado1").hide();
							$("#listado2").hide();
							$("#listado3").show();
							$("#listado4").hide();
							$("#listado5").hide();
							$("#listado6").hide();
							$("#filtrosSection").show();
							$("#prit2").hide();
							//$(".divTipoVuelo").addClass("divTipoVueloResultados");
							$("#iconoAvion").addClass("iconoAvionResultado");
							$(".vueloSalida").show();
							$(".vueloRegreso").hide();
							//$("#laflecha").show();
							$(".iconoTipoVuelo").removeClass('avionOrange'); 
							paginacion();
														if(tipoViaje=="roundtrip"){
								$("#pest").hide();
								$(".selectFlight").hide();
							}else{
								$("#pest").show();
								//$(".selectFlight").show();
							}
						}
					});

					//$("#frameContent").prop("src","https://www.travelnet.com.mx/boxtravelnet/vuelos?"+last);
					//$("#frameContent").load(function(){
					//	$("#loading").hide();
					//	$(this).css("display","block");
				}
			} else {
				$.fancybox(
					'<link href="' + pathname + '/_assets/_css/popupInventarioRegina.css?x=' + (Math.floor(Math.random() * 100)) +'" type="text/css" rel="stylesheet">'+
					'<div id="InventarioRegina" class="modal chrono-modal">'+
						'<div class="headerImagen">'+
							'<img src="' + pathname + '/_assets/_images/template/logo-1000.png"/>'+
						'</div>'+	
						'<div class="fondopopup">'+
							'<span class="titulopop">Dear member,</span>'+
							'<span class="parrafopop">At the moment, this section is undergoing maintance. Sorry for any inconvenience this may cause you.<br /><br />Please contact your Personal Concierge.</span>'+
							'<div class="iblockpop w70"></div>'+
						'</div>'+
					'</div>', {
						'autoDimensions': false,
						'width': 350,
						'height': 'auto',
						'transitionIn': 'none',
						'transitionOut': 'none'
					}
				);
			}
		});
		
		//////////////////////////////////////////////////////////////////////////////
		// funcionamiento para realizar la paginacion	 
		function paginacion ()
		{
						
					$("div.holder").jPages({
						containerID : "fichasHoteles",
						perPage :15,
						midRange :6,
						//previous :"← Anterior",
						//next:"Siguiente →",
						previous :"previous",
						next:"next",
						animation:"fadeIn"
					});
		}
	////////////////////////////////////////////////////777777
	var altura = $('#cajaReserva').offset().top;
	$(window).on('scroll', function(){
		if ( $(window).scrollTop() > altura -20){
			$('#cajaReserva').addClass('menu-fixed');
			$('#cajaReserva').addClass('dib');
		} else {
			$('#cajaReserva').removeClass('menu-fixed');
			$('#cajaReserva').removeClass('dib');
		}
	});
	/////////////////////////////////////////////////////////////////////////////////
		///////////////////////////////////////////////////////////////////////////
		// funcionamiento del boton de reservacion
		//$('.botonG2').on(function(){checkSelectedFlights(this);});
		
		$(document).on("click",'.botonG2000',function(){ checkSelectedFlights(this);});
		

});


function fixedEncodeURIComponent(str){
   return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
}



function checkSelectedFlights(ele){
	
	nflights = $('input[name="nFlights"]').val(); 
	//option = ele.id.substring(11,ele.id.length);
	var option=ele.id;
	
	//alert(option);	
	// recorro todos los div contenedores y voy poniendo en false los radiobottom
	// a excepcion del ultimo seleccionado
	$('.controlGeneral').each(function() {
		
			//alert("id"+$(this).prop("id")+ " " + 'form-'+option)
			
			if($(this).prop("id")!='form-'+option)
			{
				//alert("entra1")
				
				
				$("#"+$(this).prop("id")+' input[name^="selected"]').each(function() {
					//alert("entra2");
					$(this).prop('checked', false);		
				});
			}
							
	});
	
	//valido si solo son 2 radios en todo el div contenedor, quiere decir que solo tiene una opcion de vuelo por cada uno
	//por lo cual los selecciono 	
	if($('#form-'+option+' input[name^="selected"]').length==2)
		{
		  $('#form-'+option+' input[name^="selected"]').each(function() {			
			$(this).prop('checked', true);						
		  });
		}
	
	// saco el total de todos los radios seleccionados en el div contenedor	
	selected = $('#form-'+option+' input[name^="selected"]:checked').length;
	
	//alert(selected);
	//alert(nflights);
	
	// comparo con el total de vuelos buscados con el total de radios seleccionados si son iguales
	// recupero el id del radio que es el mismo que el id del formulario que contiene los datos de cada vuelo
	// para agregarlo al carrito
	if(nflights == selected) {
		
		// genero la clave con los id´s de los vuelos selccionados pegando el precio del vuelo
		// esa clave una vez generado se lo agrego al campo oculto del formularo para mandarlo al carrito
		var clave="";
		$('#form-'+option+' input[name^="selected"]:checked').each(function(i,el) {				
		clave=clave+$(el).val()+ $('#form-'+option+' input[name="TF-outwardID"]').val();				
		clave=clave+$(el).val()+ $('#form-'+option+' input[name="TF-returnID"]').val();
	    });
			
			//alert(clave);
		
			// pego la clave generada al input
			$('input[name="TF-claveVuelo"]').prop("value",clave);
			
			//le hago submid a los fomurlarios de cada vuelo seleccionado para agregarlos al carrito
			$('#form-'+option+' input[name^="selected"]:checked').each(function(i,el) {
				//alert("#"+$(el).val());
				setTimeout(function(){
				   $("#"+$(el).val()).submit();
				},150 + ( i * 150 ));
				
				//var id=$( this ).closest( "form" ).prop("id");
				//console.log($(this).val());
				
			});
		
		
	}
	
	else
	{alert("Please select all option of flight")}
		

	
	//alert("vuelos"+nflights);
	//alert("result    "+option);
	//alert(option);
	
	/*
	for(i=0;i<nflights;i++){
		
		nOptions = $('#form-'+option+' input[name="selected['+i+']"]').length;
		nSelected = $('#form-'+option+' input[name="selected['+i+']"]:checked').length;
		
		//alert(nOptions);
		//alert(nSelected);
		
		if(nOptions == 1 && nSelected ==0){
			//$('#form-'+option+' #'+option+'-flight_'+cuentale+' .selectable_option.itinerary.enabled').addClass('active');
			$('#form-'+option+' input[name="selected['+i+']"]').prop('checked', true);
		}
		if(nOptions > 1 && nSelected ==0){
			//$('#form-'+option+' #'+option+'-flight_'+cuentale+' .selectable_option.itinerary').addClass('error');
			$('#form-'+option+' #'+option+'-flight_'+i+' .itinerary.required_field').show();
			alert("Error falta selecionar");
		}
	}*/
	
	/*
	selected = $('#form-'+option+' input[name^="selected"]:checked').length;
	
	
	if(nflights == selected)
	{
		
		$('#form-'+option+' input[name^="selected"]:checked').each(function() {
			
			//var id=$( this ).closest( "form" ).prop("id");
			//console.log($(this).val());
			var id= $(this).val();
			$("#"+id).submit();
						
		 });
		 
										
		//$('<input/>').attr('type', 'hidden').attr('name', 'search').attr('value', $('#searchParamsReq').val()).appendTo('#form-'+option);
		//$('#form-'+option).submit();
	}
	*/
	

	
	
}