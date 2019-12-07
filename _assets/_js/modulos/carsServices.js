// JavaScript Document
// --------------------------------------------

$(document).ready(function(e) {
	
	//$("#redondo").hide();
	$("input[type=radio]").uniform();
	//$("input[type=checkbox]").uniform();
	$("#filtrosSection").hide();
	$("#droploca").hide();
	$("#droploca0").hide();
	//$("#cajaReserva").hide();
	$('.sliderContent').revolution(
        {
            delay           : 5000,
            startwidth      : 1920,
            startheight     : 251,
            hideThumbs      : 10,
            fullWidth       : "on",
            forceFullWidth  : "on",					
            touchenabled    : "on",
            onHoverStop     : "off"
        });	
	
	/////////////////////////////////////////////////////////////////////////////////
    // setear las fechas apartir del calendario seleccionado hacia abajo
    $(".inputFecha").datepicker({
        changeMonth     : true,
        numberOfMonths  : 2,
        dateFormat      : 'dd-mm-yy',
        minDate         : 0,			
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
		
	$("input[type=radio]").on("click",function(e){	
        var val = $(this).val();
        if(val==="airport"){
            $("#droploca").show();
            $("#droploca0").show();
            $("#pickl").hide();
            //$("#multivuelos").prop("value",2);
            //$("#tipovuelo").prop("value","roundtrip");
            //$("#regresoRedondo").show();
            //$("#vuelo3,#vuelo4,#vuelo5,#multivuelosDiv,#botones").hide();
            //$("#multivuelos").find("input, select").prop("disabled","disabled");
            //var dateFormat = $("#startDate_0").datepicker('getDate')
            //$("#endDate_0").datepicker("option", "minDate",dateFormat);
            //$("#endDate_0").datepicker("setDate", dateFormat);
        }
        else if(val==="city")
        {
                //$("#multivuelos").prop("value",2);
                //$("#tipovuelo").prop("value","multiple");
                //$("#multivuelosDiv").show();
                //$("#botones").show();
                //$("#moreF").show();	
                $("#droploca").hide();
                $("#droploca0").hide();
                $("#pickl").show();
                //$("#vuelo3,#vuelo4,#vuelo5, #removeF").hide();
                //$("#vuelo2").find("input, select").prop("disabled","");
                //$("#vuelo2").show();
                //var dateFormat = $("#startDate_0").datepicker('getDate')
                //$("#startDate_1").datepicker("option", "minDate",dateFormat);
                //$("#startDate_1").datepicker("setDate", dateFormat);
        }
    });	
	$("#startDate_0").datepicker("option", "minDate",2);
	///////////////////////////////////////////////////////////////////////////7
	// 	seteo todos los demas vuelos y determino cual mostrar de acuerdo a un campo oculto
	$("#vuelo2").hide();
	$("#vuelo3").hide();
	$("#vuelo4").hide();
	$("#vuelo5").hide();
	$("#vuelo2").find("input, select").prop("disabled","disabled");
	$("#vuelo3").find("input, select").prop("disabled","disabled");
	$("#vuelo4").find("input, select").prop("disabled","disabled");
	$("#vuelo5").find("input, select").prop("disabled","disabled");	
		
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
	var calFecha = new Date();		
	var hoy      = new Date( calFecha.getFullYear(), calFecha.getMonth(), calFecha.getDate() );
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
                                            url:"../_assets/_controllers/getEdadChildVuelo2.php",
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
						$("#startDate_"+i).datepicker("setDate", fecha );
							
					}
				}
			}
		});
		
		
		//---------------------------------------------------------------
		
		
		
		$("#pl1").autocomplete({
			source : function(request, response) {
				$.ajax({
					//url : "https://www.travelnet.com.mx/Autocompleteboxjsonp/ciudades?callback=?",
					url : "_assets/_controllers/autocompleteCars.php",
					dataType : "json",
					data : {
						q : request.term,
						lang:"en" // es  
					},
					success : function(data) {
							response($.map(data,function(item) {
								
																
								return {					
									label : item.ciudad + " " +item.aero,
									value : item.ciudad + " " + item.aero,
									vcodigo:item.codigo
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
				
				
				$("#flightTo_1").val(ui.item.label);
				
				$("#pl_0").val(ui.item.vcodigo);
				$("#cTo_0").val(ui.item.vcodigo);
				
				if(indices[0]==="flightfrom")
				{
					
					//$("#cFrom_"+indices[1]).val(ui.item.cFrom);	
					//$("#tipoDestino1").val(ui.item.vTipo);
					
				}
				if(indices[0]==="flightto")
				{
					
					$("#cTo_"+indices[1]).val(ui.item.vcodigo);	
					//$("#tipoDestino2").val(ui.item.vTipo);
				}

				
			},
			open : function() {
				$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
			},
			close : function() {
				$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
			}
		});
		
		
		//---------------------------------------------------------------
		
		
		$("#flightfrom_0, #flightfrom_1").autocomplete({
			source : function(request, response) {
				$.ajax({
					url : "_assets/_controllers/autocompleteCarsCities.php",
					dataType : "json",
					data : {
						q : request.term,
						lang:"en"
					},
					success : function(data) {
						response($.map(data, function(item) {
							return {
								label : item.ciudad + ", " + item.pais,
								value : item.ciudad,
								cFrom : item.codigo
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
		
		// ----------------------------------------------
		
		
		
		$("#flightTo_1").autocomplete({
			source : function(request, response) {
				$.ajax({
					//url : "https://www.travelnet.com.mx/Autocompleteboxjsonp/ciudades?callback=?",
					url : "_assets/_controllers/autocompleteCars.php",
					dataType : "json",
					data : {
						q : request.term,
						lang:"en" // es  
					},
					success : function(data) {
							response($.map(data,function(item) {
								
																
								return {					
									label : item.ciudad + " " +item.aero,
									value : item.ciudad + " " + item.aero,
									vcodigo:item.codigo
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
				
				
				$("#cTo_0").val(ui.item.vcodigo);
				
				if(indices[0]==="flightfrom")
				{
					
					//$("#cFrom_"+indices[1]).val(ui.item.cFrom);	
					//$("#tipoDestino1").val(ui.item.vTipo);
					
				}
				if(indices[0]==="flightto")
				{
					
					$("#cTo_"+indices[1]).val(ui.item.vcodigo);	
					//$("#tipoDestino2").val(ui.item.vTipo);
				}

				
			},
			open : function() {
				$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
			},
			close : function() {
				$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
			}
		});
		
		
		
		
		//---------------------------------------------------------------
		
		
		
		var jsonpurl="http://www.travelnet.com.mx/Autocompleteboxjsonp/vuelos?callback=?";
		var jsonpaerolineas="http://www.travelnet.com.mx/Autocompleteboxjsonp/aerolineas?callback=?";
		
		/* auto completes*/
		
		$("#flightfrom_2, #flightfrom_3, #flightfrom_4, #flightto_0, #flightto_1, #flightto_2, #flightto_3, #flightto_4").autocomplete({
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
				
    $( "#search" ).click( function() {
        var ban         = true; 
        var ban2        = true;
        var tipoViaje   = $( "input[type=radio]:checked" ).val();
        var calFecha    = new Date();	
        var mes         = calFecha.getMonth() + 1;
        var dia         = calFecha.getDate();
        $( ".hidden_fichas" ).hide();
        $( "#frameContent" ).hide();
        $( "#loading" ).show();
        if( mes >= 1 && mes <= 9 ) { 
            mes = "0" + mes;
        }
        if( dia >= 1 && dia <= 9 ) { 
            dia = "0" + dia; 
        } 
        var hoyCompara  = dia + "-" + mes + "-" + calFecha.getFullYear();
        if( tipoViaje == "city" ) {
            if( $( "#cFrom_0" ).val() == "" && ban ) {
                alert( "Please, select a city from the list" );   
                $("#flightfrom_0").val();
                ban = false;
            }    
        } else {                
            if( $( "#pl1" ).val() == "" && $( "#pl_0" ).val() != "" ) {
                alert( "Please, select an airport from the list" );
                ban = false;
            }    
            if( $( "#pl_0" ).val() == "" && ban ) {
                alert( "Please, select an airport from the list" );
                $( "#pl1" ).val();
                ban = false;
            }
            if( $( "#cTo_0" ).val() == "" && ban ) {
                alert( "Please, select an airport from the list" );
                $( "#flightTo_1" ).val();
                ban = false;
            }
        }
        if( $( "#startDate_0" ).val() == "" && ban ) {
            alert( "Please, select a pick up date" );
            ban = false;
        }
        if( $( "#endDate_0" ).val() == "" && ban ) {
            alert( "Please, select a drop off date" );
            ban = false;
        }		                        
        if( ban ) {            
            var last = $( "#reservasCarWS" ).serializeArray();            
            $( "#frame" ).show();
            $( "#resultadoLista" ).html( "" );      
            $( document ).scrollTop( $( "#loading" ).offset().top - 50 );  
            if( tipoViaje == "oneway" || tipoViaje == "roundtrip" ) {
                if( hoyCompara == $( "#startDate_0" ).val() ) {	
                    $( "#alert" ).show();
                    $( "#frame" ).hide();
                    $( document ).scrollTop( $( "#alert" ).offset().top -200 );
                } else {
                    $( "#frame" ).show();
                    $( "#alert" ).hide();	
                    $( document ).scrollTop( $( "#loading" ).offset().top - 100 ); 	
                }
            } else {
                var totalVisibles = 1;
                for( var a = 1; a <= $( ".vuelosMulti" ).length; a++ ) {
                    var cont = a + 1;
                    if( $( "#vuelo" + cont ).css( "display" ) == "block" ) {  
                        totalVisibles = totalVisibles + 1; 
                    }	
                }
                for( var i = 0; i < totalVisibles; i++ ) {
                    var vuelo = i +	1;
                    if( $( "#startDate_" + i ).val() == hoyCompara ) { 
                        $( "#alert" ).show();
                        $( "#frame" ).hide();
                        $( document ).scrollTop( $( "#alert" ).offset().top - 200 );  
                    } else {
                        $( "#frame" ).show();
                        $( "#alert" ).hide();	
                        $( document ).scrollTop( $( "#loading" ).offset().top - 100 ); 		
                    }
                }
            }
            $.ajax({
                url     : "../_assets/_controllers/CarsProcesaBuscador.php",
                type    : "POST",
                //dataType:"html",
                data    : {
                    valueF :last
                },
                success : function( data ) { 
                    if( data == "" ) {
                        $( "#filtrosSection" ).hide();
                        $( "#resultadoLista" ).html( "" );
                        // $("#resultadoLista").html("<h1>No results try again</h1>");
                        $( "#resultadoLista" ).html( "<p>To obtain a quote for this destination, contact your Personal Concierge who will be glad to assist you. USA, CAN: 1-888-963-7689. México: 800-272-0294</p>" );
                        $( "#loading" ).hide();                            
                    } else {                        
                        $( "#filtrosSection" ).show();
                        $( "#resultadoLista" ).html( data );
                        $( "#loading" ).hide();
                        $( "#filtrosSection" ).show();
                        $( "input[type='checkbox']" ).uniform();
                    }
                }
            });
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
						url:"../_assets/_controllers/filtroVuelos.php",
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
								$("#filtrosSection").show();
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
						//previous :"â† Anterior",
						//next:"Siguiente â†’",
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
		
		
	///////////////////////////////////////////////////////
	//// caja de reserva flotante 

	var altura = $('#cajaReserva').offset().top;
	$(window).on('scroll', function(){
		if ( $(window).scrollTop() > altura){
			$('#cajaReserva').addClass('menu-fixed');
		} else {
			$('#cajaReserva').removeClass('menu-fixed');
		}
	});
		

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
			// genero la clave con los idÂ´s de los vuelos selccionados pegando el precio del vuelo
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
			
}


/*$("#checkCars").on('click', function() {

$.uniform.update(""); 
*/	
	
	 


/*$(document).ready(function () {
        $(function () {
            $("#checkCars").uniform();
        });

        $.uniform.update();
    });*/