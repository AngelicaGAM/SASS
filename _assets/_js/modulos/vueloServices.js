// JavaScript Document
// --------------------------------------------

$(document).ready(function(e) {
	var mantenimiento = 0;
    if (mantenimiento == 1){
    	setTimeout(function(){
    		$.fancybox(
	            '<link href="' + pathname + '/_assets/_css/popupInventarioRegina.css?x=' + (Math.floor(Math.random() * 100)) +'" type="text/css" rel="stylesheet">'+
	            '<div id="InventarioRegina" class="modal chrono-modal">'+
	                '<div class="headerImagen">'+                    
	                '</div>'+
	                '<div class="fondopopup">'+
	                    '<span class="parrafopop" style="width:90%;">'+
	                        '<b>Dear member,</b><br />'+
	                        'This section is undergoing maintenance. We are working to provide you the best options for your vacations. Please contact your Personal Concierge to assist you with your flight tickets and any additional requirements. We apologize for any inconvenience caused.<br />'+                        
	                    '</span>'+
	                    '<div class="iblockpop w70">USA/CAN: 1-888-963-7689 México: 800-272-0294</div>'+
	                '</div>'+
	            '</div>', {
	                'autoDimensions': false,
	                'width': 350,
	                'height': 'auto',
	                'transitionIn': 'none',
	                'transitionOut': 'none'
	            }
	        );	
    	},1000);
    	
    }
	
	 $(".iconoAvion1").addClass('avionOrange');  
		 $("#laflecha").hide();
	 $("#redondo").hide();
	 $(".radio").uniform();
	 $("input[type=checkbox]").uniform();
	 $("#filtrosSection").hide();
	$("#botonesMultuple").hide();


	//buscador limpio
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
	


	$(".alertGood").hide();										
	$(".alertBad2").hide();
	$(".alertBad").hide();

	$(document).on("click","div.holder > a",function(e) {
		//alert("prpr");
		e.preventDefault();
		$('html, body').animate({scrollTop : 250},1400);
		/*var mipagina=$(this).text();
		if(mipagina=="previous" || mipagina=="next") {
			mipagina=$("#listado > div:nth-child(2) > div > a.jp-current").text();
		}
		if(!isNaN(mipagina)) {
			localStorage.setItem("pagina", mipagina);
			console.log("es numerico y se guardo ["+localStorage.getItem("pagina")+"]");
		}
		console.log("pagina vale ["+mipagina+"]");
		//mapa(mostrar,mipagina)
		/*$("#listado #fichasHoteles").find(".ubica").each(function(){
			//console.log("stao");
			$(this).trigger("click");
		});*/
	});

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

	 /////////////////////////////////////////////////////////////////////////////////
	 //stick menu
	 	var altura = $('#cajaReserva').offset().top;
			$(window).on('scroll', function(){
				if ( $(window).scrollTop() > altura+400){
					$('#cajaReserva').addClass('menu-fixed');
				} else {
					$('#cajaReserva').removeClass('menu-fixed');
				}
			});
	
		$("#laflecha").click(function()
	{	
		$("#prit2").slideToggle();
	});
	
	
	
	/////////////////////////////////////////////////////////////////////////////////
		// setear las fechas apartir del calendario seleccionado hacia abajo
		$(".inputFecha").datepicker({
			changeMonth : true,
			numberOfMonths : 2,
			dateFormat : 'dd-mm-yy',
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
		$(".iconoAvion1").on("click",function(e){
			//e.preventDefault();
    if ($(this).hasClass('avionOrange')){
        $(".iconoAvion1").removeClass('avionOrange'); 
    }else{
        $(".iconoAvion1").addClass('avionOrange');  
    }
		$("#prit2").slideToggle();

	});
	
	$("input[type=radio]").on("click",function(e){
			$(".iconoAvion1").addClass('avionOrange');  
			$("#prit2").slideDown();

				var val = $(this).val();
														$(".alertGood").hide();
											$(".alertBad2").hide();
											$(".alertBad").hide();
				if(val==="roundtrip"){
					$("#multivuelos").prop("value",2);
					$("#tipovuelo").prop("value","roundtrip");
					$("#regresoRedondo").show();
					$("#regresoRedondo2").show();
					$("#botonesMultuple").hide();
					$("#vuelo3,#vuelo4,#vuelo5,#multivuelosDiv,#botones").hide();
					$("#multivuelos").find("input, select").prop("disabled","disabled");
					var dateFormat = $("#startDate_0").datepicker('getDate')
					$("#endDate_0").datepicker("option", "minDate",dateFormat);
					$("#endDate_0").datepicker("setDate", dateFormat);
				}
			
				else if(val==="multiple")
				{
						$("#multivuelos").prop("value",2);
						$("#tipovuelo").prop("value","multiple");
						$("#multivuelosDiv").show();
						$("#botones").show();
						$("#moreF").show();	
						$("#regresoRedondo").hide();
						$("#regresoRedondo2").hide();
						$("#botonesMultuple").show();
						$("#vuelo3,#vuelo4,#vuelo5, #removeF").hide();
						$("#vuelo2").find("input, select").prop("disabled","");
						$("#vuelo2").show();
						var dateFormat = $("#startDate_0").datepicker('getDate')
						$("#startDate_1").datepicker("option", "minDate",dateFormat);
						$("#startDate_1").datepicker("setDate", dateFormat);
						
				}
				else
				{
					$("#multivuelos").prop("value",1);	
					$("#tipovuelo").prop("value","oneway");	
					$("#regresoRedondo").hide();
					$("#regresoRedondo2").hide();
					$("#botonesMultuple").hide();
					$("#vuelo3,#vuelo4,#vuelo5,#multivuelosDiv,#botones").hide();	
					$("#multivuelos").find("input, select").prop("disabled","disabled");
					
				}
				
				
	});
		
	$("#moreF").on("click",function(){
			
			var total = $("#multivuelosDiv .vuelosMulti").length;
			//alert(total);
			var visible =1;
			for(var i=0; i<total; i++ )
			{
				if($("#multivuelosDiv .vuelosMulti").eq(i).css("display")==="block")
				{ visible = visible+1; }
			}
			if(visible>=1)
			{
				//alert("pasassssss ");
				
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
							var totalMostrado=$("#ninosSelect li").length;
							$("#habitaciones").show();
							
							if(solicitado==0)
							{
									
								//$("#edadesV_"+id[1]+" li").remove();
								//$("#edadv_"+id[1]).css("display","none");
								$("#ninosSelect li").remove();
									
							} else {
								
								$("#edadv_"+id[1]).css("display","block");
									
								if(totalMostrado<solicitado) {
										//saco la diferencia y muestro los que tengo que mostrar
									var m = solicitado-totalMostrado;
								
									//	for(var i=0; i<m; i++)
										//{
											//var ha=totalMostrado+(i+1);
											$.ajax({
												url:"_assets/_controllers/getEdadChildVuelo2.php",
												dataType:"html",
												type:"POST",
												data:{
													cantidadN:m,
													hab:1,
													m:totalMostrado
													}	
												}).done(function(data){
												
												$("#ninosSelect").append(data);
												//$("input[type=checkbox]").uniform();
												
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
												$("#ninosSelect li:last").remove();
												//$("#edadesV_"+id[1]+" li:last").remove();
										}
									}
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
			dateFormat : 'dd-mm-yy',
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
		
		
		var jsonpurl="https://www.travelnet.com.mx/Autocompleteboxjsonp/vuelos?callback=?";
		var jsonpaerolineas="https://www.travelnet.com.mx/Autocompleteboxjsonp/aerolineas?callback=?";
		
		/* auto completes*/
		
		$("#flightfrom_0, #flightfrom_1, #flightfrom_2, #flightfrom_3, #flightfrom_4, #flightto_0, #flightto_1, #flightto_2, #flightto_3, #flightto_4").autocomplete({
			source : function(request, response) {
				$.ajax({
					url : jsonpurl,
					dataType : "jsonp",
					data : {
						q : request.term,
						lang:"en"
					},
					success : function(data) {
						response($.map(data, function(item) {
							return {
								label : item.ciudad + ", " + item.pais,
								value : item.ciudad,
								cFrom : item.city_code,
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
					
				}
				if(indices[0]==="flightto")
				{
					$("#cTo_"+indices[1]).val(ui.item.cFrom);	
				}

				
			},
			open : function() {
				$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
			},
			close : function() {
				$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
			}
		});
		
		
		$(document).on("keypress","[id*='flightfrom']",function(){
			
			var id= $(this).prop("id");
			var indice = id.split("_");
			$("#cFrom_"+indice[1]).prop("value","");
		});

		$(document).on("keypress","[id*='flightto']",function(){
			var id= $(this).prop("id");
			var indice = id.split("_");
			$("#cTo_"+indice[1]).prop("value","");
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
		
		
		// funcionamiento para setear el slider de rango de precios
		$( "#slider-range" ).slider
		({
																	
			  range: true,
			  min: 0,
			  max: 100,
			  values: [ 0, 100 ],
			  slide: function( event, ui ) {
																					  
					 $("#minimo").text("$"+addCommas(ui.values[0])+" USD");
					 $("#max").text("$"+addCommas(ui.values[1])+" USD"); 
																						  
					//$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
			}
		});
											
		$("#search").click(
			function(){
				var ban=true; var ban2=true;
				$("#frameContent").hide();
				$("#loading").show();
				var tipoViaje = $("input[type=radio]:checked").val();
				console.log(tipoViaje);
				var calFecha= new Date();	
				var  mes = calFecha.getMonth()+1;
				var dia = calFecha.getDate();
				if(mes>=1 && mes <=9)
				{ mes ="0"+mes;}
				if(dia>=1 && dia<=9)
				{ dia="0"+dia; }
				var hoyCompara = dia+"-"+mes+"-"+calFecha.getFullYear();
				if(tipoViaje==="oneway")
				{
					if(($("#flightfrom_0").val()=="" && ban) || ($("#cFrom_0").val()=="" && ban))
					{ 

						$(".alertGood").hide();
											$(".alertBad").hide();
											$(".alertBad2").show();
					 ban=false; }
					if(($("#flightto_0").val()=="" && ban) || ($("#cTo_0").val()=="" && ban))
					{ 

						$(".alertGood").hide();
											$(".alertBad").hide();
											$(".alertBad2").show();
					 ban=false; }
					if($("#startDate_0").val()=="" && ban)
					{ 

						$(".alertGood").hide();
											$(".alertBad").hide();
											$(".alertBad2").show();
					 ban=false;  }
					if($("#adult").val()==0 && ban)
					{ 

						$(".alertGood").hide();
											$(".alertBad").hide();
											$(".alertBad2").show();
					 ban=false; }
				}
				else if(tipoViaje==="roundtrip")
				{
					if(($("#flightfrom_0").val()=="" && ban) || ($("#cFrom_0").val()=="" && ban))
					{

						$(".alertGood").hide();
											$(".alertBad").hide();
											$(".alertBad2").show();
					 ban=false; }
					if(($("#flightto_0").val()=="" && ban) || ($("#cTo_0").val()=="" && ban))
					{ 

						$(".alertGood").hide();
											$(".alertBad").hide();
											$(".alertBad2").show();
					 ban=false; }
					if($("#startDate_0").val()=="" && ban)
					{ 

						$(".alertGood").hide();
											$(".alertBad").hide();
											$(".alertBad2").show();
					 ban=false;  }
					if($("#endDate_0").val()=="" && ban)
					{ 

						$(".alertGood").hide();
											$(".alertBad").hide();
											$(".alertBad2").show();
						ban=false; }
					if($("#adult").val()==0 && ban)
					{ 

						$(".alertGood").hide();
											$(".alertBad").hide();
											$(".alertBad2").show();
					 ban=false; }
				}
				else
				{
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
						{ 

						$(".alertGood").hide();
											$(".alertBad").hide();
											$(".alertBad2").show();
						 ban=false; }
						if(($("#flightto_"+i).val()=="" && ban) || ($("#cTo_"+i).val()=="" && ban))
						{ 

						$(".alertGood").hide();
											$(".alertBad").hide();
											$(".alertBad2").show();
						 ban=false; }
						if($("#startDate_"+i).val()=="" && ban)
						{ 

						$(".alertGood").hide();
											$(".alertBad").hide();
											$(".alertBad2").show();
							ban=false;  }
						if($("#adult").val()==0 && ban)
						{ 

						$(".alertGood").hide();
											$(".alertBad").hide();
											$(".alertBad2").show();
						 ban=false; }
					}
				}
				var ch = $("#child").val();
				console.log(ch);
				for(var i = 0; i<=ch; i++){
					console.log(ch);
					console.log("#edadNV_1_"+i);


					if($("#edadNV_1_"+i).val()=="-" && ban){
						alert("select children "+i+" age");
						ban=false;
						
					}
					
				}

				


				
				if(ban)
				{
				$(".alertGood").show();
				$(".alertBad").hide();
				$(".alertBad2").hide();

					var last=$("#reservas").serializeArray();
					//alert(last);
					$("#frame").show();
					$("#resultadoLista").html("");
					$("#filtrosSection").hide();
					
					$(document).scrollTop( $("#loading").offset().top-50 );  
					
					if(tipoViaje=="oneway" || tipoViaje=="roundtrip")
					  {
							if(hoyCompara ==$("#startDate_0").val())
							{	
								$("#alert").show();
								$("#frame").hide();
								$(document).scrollTop( $("#alert").offset().top -200);
							}
							else
							{
								$("#frame").show();
								$("#alert").hide();	
								$(document).scrollTop( $("#loading").offset().top-100 ); 	
							}
					  }
					  else
					  {
					  		var totalVisibles=1;
							for(var a=1; a<=$(".vuelosMulti").length; a++)
							{
								var cont = a+1;
								if($("#vuelo"+cont).css("display")=="block")
								{  totalVisibles=totalVisibles+1; }	
							}
							for(var i = 0; i<totalVisibles; i++)
							{
								var vuelo = i +	1;
								if($("#startDate_"+i).val()==hoyCompara )
								{ 
									$("#alert").show();
									$("#frame").hide();
									$(document).scrollTop( $("#alert").offset().top -200);  
								}
								else
								{
									$("#frame").show();
									$("#alert").hide();	
									$(document).scrollTop( $("#loading").offset().top-100 ); 		
								}
							}
					  }
					   
					   $.ajax({
									 url:"_assets/_controllers/vuelosProcesaBuscador.php",
									 type:"POST",
									 //dataType:"html",
									 data:{valueF :last}
									 }).done(function(data){ 
									
										if(data=="")
										{
											$(".alertGood").hide();
											$(".alertBad2").hide();
											$(".alertBad").show();

											$("#filtrosSection").hide();
											$("#resultadoLista").html("");
											// $("#resultadoLista").html("<h1>No results try again</h1>");
											//$("#resultadoLista").html("<p>To obtain a quote for this destination, contact your Personal Concierge who will be glad to assist you. USA, CAN: 1-888-963-7689. México: 800-272-0294</p>");
											$("#loading").hide();
											
										}
										else
										{

											//$("#filtrosSection").show();
											$("#resultadoLista").html(data);
											$("#loading").hide();
																						$("#prit2").hide();
																						$("#laflecha").show();
											//$("#filtrosSection").show();
											paginacion();
											
											//$("#minimo").text("$"+0+" USD");
											//$("#max").text("$"+$("#maxprecio").val()+" USD");
																					
											//$('#slider-range').slider( "option", "max",$("#maxprecio").val().replace(/,/g, '') );
											//$('#slider-range').slider( "option", "values",[0,$("#maxprecio").val().replace(/,/g, '')] );
											//$('#slider-range').slider("value", $('#slider-range').slider("value")); 
											
											var valorMaximo=parseInt($("#maxprecio").val().replace(/,/g, ''));
											var valorMinimo=parseInt($("#minprecio").val().replace(/,/g, ''));
											
											$("#minimo").text("$"+$("#minprecio").val()+" USD");
											$("#max").text("$"+$("#maxprecio").val()+" USD");
												
																			
											$('#slider-range').slider( "option", "min",valorMinimo );
											$('#slider-range').slider( "option", "max",valorMaximo );
											$('#slider-range').slider( "option", "values",[valorMinimo,valorMaximo] );
											$('#slider-range').slider("value", $('#slider-range').slider("value"));
											
																						$(".alertGood").hide();
											$(".alertBad2").hide();
											$(".alertBad").hide();
											if(tipoViaje=="oneway"){
												$("#tituloBusqueda").html("SINGLE");
											}
											if(tipoViaje=="roundtrip"){
												$("#tituloBusqueda").html("ROUNDTRIP");
											}
											if(tipoViaje=="multiple"){
												$("#tituloBusqueda").html("MULTIPLE");
											}
											$(".iconoAvion1").removeClass('avionOrange'); 
											
										}
							});
								
					  //$("#frameContent").prop("src","https://www.travelnet.com.mx/boxtravelnet/vuelos?"+last);
					  //$("#frameContent").load(function(){
					  //	$("#loading").hide();
					  //	$(this).css("display","block");					
						
							 
					
						
				}
		});
		
		
		
		
		// dispara la busqueda con los filtros seleccionados
	
	$(document).on("click","#botonFiltro",function(){
			
			
			
			$("#filtrosSection").hide();
			$("#frame").show();
			$("#resultadoLista").hide();
			$("#resultadoLista").html("");
			$("#loading").show();
			$(document).scrollTop( ($("#frame").offset().top-300) );  
			
			$.ajax({
						url:"_assets/_controllers/filtroVuelos.php",
						type:"POST",
						//dataType:"html",
						data:{
								precioInicio :$("#minimo").html(),
								precioFinal:$("#max").html()
								
							 }
						}).done(
						function(data){ 
						
							if(data=="")
							{
								$("#filtrosSection").hide();
								$("#resultadoLista").html("");
								// $("#resultadoLista").html("<h1>No results try again</h1>");
								$("#resultadoLista").html("<p>To obtain a quote for this destination, contact your Personal Concierge who will be glad to assist you. USA, CAN: 1-888-963-7689. México: 800-272-0294</p>");
								$("#loading").hide();
							}
							else
							{
								//$("#filtrosSection").show();
								$("#resultadoLista").show();
								$("#resultadoLista").html(data);
								$("#loading").hide();
								paginacion();
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
		
		///////////////////////////////////////////////////////////////////////////
		// funcionamiento del boton de reservacion
		//$('.botonG2').on(function(){checkSelectedFlights(this);});
		
		$(document).on("click",'.botonG2',function(){ checkSelectedFlights(this);});
		
		// funcionamiento para la seleccion del renglon del vuelo ya sea sobre el radio boton o sobre cualquier parte del div
		prepareResults();
		
		
		

});


function prepareResults(){

	$('.selectable_option.itinerary input[name^="selected"]:checked').closest('.selectable_option.itinerary').addClass('active');

	// para mostrar los detalles del vuelo	
	$(document).on("click",'.detailslink',function(){
			
		$(this).toggleClass('less');
		$(this).closest('.flight_option_summary').next().slideToggle();	
	});
	
	$(document).on("click",'.selectable_option.itinerary.enabled',function(e){ 
		 if ( $(e.target).is('.detailslink') ) { return; }
		 checkOption(this);
		
	});
}

function checkOption(o){
	
	$(o).closest('.flight_sequence').find('.selectable_option').removeClass('active');
	$(o).addClass('active');
	$(o).find('input[name^="selected"]').prop('checked', true);
	$(o).closest('.flight_sequence').find('.selectable_option.itinerary').removeClass('error');
	$(o).closest('.flight_sequence').find('.flight_error.itinerary.required_field').hide();
}


function fixedEncodeURIComponent(str){
     return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
}



function checkSelectedFlights(ele){
	
	nflights = $('input[name="nFlights"]').val(); 
	//option = ele.id.substring(11,ele.id.length);
	var option=ele.id;
	
	
	// recorro todos los div contenedores y voy poniendo en false los radiobottom
	// a excepcion del ultimo seleccionado
	$('.results_option').each(function() {
			
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
	//if($('#form-'+option+' input[name^="selected"]').length==2)
	//	{
	//		$('#form-'+option+' input[name^="selected"]').each(function() {
			
	//			$(this).prop('checked', true);
						
	//	 	});
	//	}
	
	// saco el total de todos los radios seleccionados en el div contenedor	
	selected = $('#form-'+option+' input[name^="selected"]:checked').length;
	
	//alert(selected);
	//alert(nflights);
	
	// comparo con el total de vuelos buscados con el total de radios seleccionados si son iguales
	// recupero el id del radio que es el mismo que el id del formulario que contiene los datos de cada vuelo
	// para agregarlo al carrito
	if(nflights == selected)
	{
			// genero la clave con los id´s de los vuelos selccionados pegando el precio del vuelo
			// esa clave una vez generado se lo agrego al campo oculto del formularo para mandarlo al carrito
			// la libreria uuid es una libreria que crea id unicos
			var clave="";
			$('#form-'+option+' input[name^="selected"]:checked').each(function(i,el) {
				//clave=clave+$(el).val()+ $('#form-'+option+' input[name="gmx-VueloPrice"]').val();
				clave=uuid.v1()+ $('#form-'+option+' input[name="gmx-VueloPrice"]').val();
			});
		
			// pego la clave generada al input
			$('input[name="gmx-claveUnica"]').prop("value",clave);
			
			//le hago submid a los fomurlarios de cada vuelo seleccionado para agregarlos al carrito
			$('#form-'+option+' input[name^="selected"]:checked').each(function(i,el) {
				
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