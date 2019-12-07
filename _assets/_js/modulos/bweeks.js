// JavaScript Document
$(document).ready(function(e) {
	/*
	var cuartito = $("#rooms").val();
	if (cuartito==0){
		$(".filtro2").hide();
		$(".filtro1").show();
	}else{
		$(".filtro2").show();
		$(".filtro1").hide();
	}
	*/
	
	/*$(document).on("load",window,function(){
  		setTimeout(function(){
    		window.scrollTo(0, 1);
  		}, 0);
  	});	*/
	 
	
	 $("#laflecha").hide();
	 $(".ultratabs").hide();
	 $("#filtrosSection").hide();
	 $(".alertGood").hide();
	 $(".alertBad").hide();
		$(".alertBad2").hide();

	$("#destino").prop("value","");
		$("#startDate").prop("value","");
		$("#rango").prop("value",0);
		$("#rooms").prop("value",0);
		$("#habitaciones").hide();
	 
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
		var idiomaHotel="";
		
		$.ajax({
				 url:"_assets/_controllers/getLang.php",
				 data:{ page: "beyondWeeks"},
				 type:"POST",
				 dataType:"json",
				 async:false,
				 success: function(data){
				
						idioma =eval(data);
						//return idi;
				 }
			});
			
		

		$.ajax({
				 url:"_assets/_controllers/getLang.php",
				 data:{ page: "hotels"},
				 type:"POST",
				 dataType:"json",
				 async:false,
				 success: function(data){
				
						idiomaHotel =eval(data);
						//return idi;
				 }
			});		
			
		// Menu Fixed

//funcionamiento del mapa
	var mostrar=10;
	function mapa(mostrar,pagina) {
		$.ajax({
			url:"_assets/_controllers/mapa.php",
			type:"POST",
			data: { cantidad: mostrar, pagina:pagina},
			dataType: "HTML",
		}).done(function(res) {
			$("#mapita").show().html(res);
		});
	}

//	Scroll que regresa al TOP
    $(window).scroll(function()
    {
        if ($(this).scrollTop() > 100) 
        {	$('.scrollToTop').fadeIn();	}
        else
        {	$('.scrollToTop').fadeOut();	}
    });

    // Click event to scroll to top
    $('.scrollToTop').click(function()
    {
        $('html, body').animate({scrollTop : 0},800);
    	return false;
    });

	
	// funcionamiento para realizar la paginacion	 
	$("#laflecha").click(function()
	{	
		$("#prit2").slideToggle();
	});

	// funcionamiento para realizar la paginacion
	function paginacion (mostrar) {	
		$("div.holder").jPages({
			containerID : "fichasHoteles",
			perPage :mostrar,
			midRange :8,
			previous :idioma.anterior,
			next:idioma.siguiente,
			animation:"fadeIn",
		});
		//mapa(mostrar,1);
		$("#listado #fichasHoteles").find(".ubica").each(function(){
			//console.log("stao");
			$(this).trigger("click");
		});
	}
	
	$(document).on("click",".resultados_busqueda > .holder > a",function() {
		$('html, body').animate({scrollTop : 380},1400);
		var mipagina=$(this).text();
		if(mipagina=="previous" || mipagina=="next") {
			mipagina=$("#listado > div:nth-child(2) > div > a.jp-current").text();
		}
		if(!isNaN(mipagina)) {
			localStorage.setItem("pagina", mipagina);
			console.log("es numerico y se guardo ["+localStorage.getItem("pagina")+"]");
		}
		console.log("pagina vale ["+mipagina+"]")
		//mapa(mostrar,mipagina)
		$("#listado #fichasHoteles").find(".ubica").each(function(){
			//console.log("stao");
			$(this).trigger("click");
		});
	});

	var resta=300;
	$(document).on("click",".mapaHotel",function() {
		var code = $(this).data("codigoh");
		//$(".mas_info_"+code).slideDown();
		//$("#hab_"+code).show();
		$("#ultratabs"+code).slideDown();
		$(".btabs"+code).removeClass("activo");
		$("#working"+code).slideDown();	
		$("#b"+code+"tarifas").addClass("activo");
		$.ajax({
			type: "POST",
			url: "../_assets/_controllers/tarifas.php",
			data: {"code" : code},	
			dataType:"text",
			success:function(texto){
				$("#mostrar"+code).html(texto);
				$(".btabs"+code).removeClass("activo");
				$("#b"+code+"tarifas").addClass("activo");
				$("#working"+code).slideUp();
			},
		})
		console.log(code);
	    $('html,body').animate({
	        scrollTop: $("#hotelito_"+code).offset().top-resta
	    }, 2000);
	});
	
	// Menu Fixed
	var altura = $('#cajaReserva').offset().top;
	$(window).on('scroll', function() {
		if ( $(window).scrollTop() > altura+400) {
			$('#cajaReserva').addClass('menu-fixed');
			$('#cajaReserva').addClass('dib');
		} else {
			$('#cajaReserva').removeClass('menu-fixed');
			$('#cajaReserva').removeClass('dib');
		}
	});

	// Menu Fixed filtro
	/*var alturaf = $('#filtrosSection').offset().top;
		$(window).on('scroll', function(){
			if ( $(window).scrollTop() > alturaf+550){
				console.log("prit!");
				
				//$('#filtrosSection').addClass('filtro-fixed');
				
			$('#filtrosSection').appendTo('#prit');
			} else {
			$('#filtrosSection').appendTo('#prit2');
					//$('#filtrosSection').removeClass('filtro-fixed');
			}
		});	
	*/
		/*$("#pest li").on("click",function(){
			$("#pest li").removeClass("activo");
			var acc = $(this);
			acc.addClass("activo");
			$.ajax({
				url:"_assets/_controllers/cargaBWeeks.php",
				data: { clave:acc.attr("value") },
				success: function(data) {
					$("#listado").html(data);
					if(acc.attr("value")=="RBW") {
						//console.log("fsadjafhdsjkfds");
						$("input[type=checkbox]").uniform();
						$("body").trigger("validaCheckRW");
						$('.tooltipBotton').tooltipster();
					}
				}
			});
		});*/
		
		
		$(document).on("click",".my-add-buttonSP",function(){
										var elemento=$(this).data("value"); 
										$("#"+elemento).submit();
									});		


		/* calendario de reserva */
		var calFecha= new Date();	
		var hoy = new Date(calFecha.getFullYear(),calFecha.getMonth(),calFecha.getDate());
		$("#checkin").datepicker({minDate:2,dateFormat:"dd-mm-yy",altField:"#checkin"});
		$( "#checkin" ).prop("value",$.datepicker.formatDate('dd-mm-yy', new Date()));

		$(document ).on("keypress","#destino",function() {
		 	//console.log("prueba");
		 	$("#citycode").val("")
		});

		$("#search").on("click",
			function(){
				localStorage.setItem("seleccionadoBoton", "BW");

				var last=$("#formHoteles").serializeArray();

				
				var ban=true;
				if($("#citycode").val()=="" && ban)
				{
					alert(idioma.buscador.valida1);
					ban = false;
				}
				if($("#startDate").val()=="" && ban)
				{
					alert(idioma.buscador.valida2);
					ban=false;
				}
				if($("#rango").val()==0 && ban)
				{
					alert(idioma.buscador.valida3);
					ban=false;
				}
				if($("#rooms").val()==0 && ban)
				{
					alert(idioma.buscador.valida4);
					ban=false;
				}
				if($("#citycode").val()=="" && ban)
				{
					alert(idioma.buscador.valida5);
					ban=false;	
				}


				if($("#nino_1").val()=="1" && ban){
					if($("#edadNH_1_1").val()=="-" && ban){
						alert("select children 1 age");
						ban=false;
					}
				}
				if($("#nino_1").val()=="2" && ban){
					if($("#edadNH_1_1").val()=="-" && ban){
						alert("select children 1 age");
						ban=false;
					}

					if($("#edadNH_1_2").val()=="-" && ban){
						alert("select children 2 age");
						ban=false;
					}
				}

				if($("#nino_2").val()=="1" && ban){
					if($("#edadNH_2_1").val()=="-" && ban){
						alert("select children 1 age");
						ban=false;
					}
				}
				if($("#nino_2").val()=="2" && ban){
					if($("#edadNH_2_1").val()=="-" && ban){
						alert("select children 1 age");
						ban=false;
					}

					if($("#edadNH_2_2").val()=="-" && ban){
						alert("select children 2 age");
						ban=false;
					}
				}
				
				if($("#nino_3").val()=="1" && ban){
					if($("#edadNH_3_1").val()=="-" && ban){
						alert("select children 1 age");
						ban=false;
					}
				}
				if($("#nino_3").val()=="2" && ban){
					if($("#edadNH_3_1").val()=="-" && ban){
						alert("select children 1 age");
						ban=false;
					}

					if($("#edadNH_3_2").val()=="-" && ban){
						alert("select children 2 age");
						ban=false;
					}
				}



				if(ban)
				{

													$("#frameContent").hide();
				$("#loading").show();
			$("#mapita").hide();
				$("#mapa").hide();

								$("#pest").hide();
				$("#filtrosSection").hide();
				$("#frame").show();
				$("#listado").hide();
				$("#listado").html("");
					//var last=$("#formHoteles").serialize();
					//$("#listado").hide();
					//$("#pest").hide();
					
					
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
					}
					else
					{
						$("#frame").show();
						$("#alert").hide();	
						$(document).scrollTop( $("#loading").offset().top-100 ); 	
					}
					
					
					$.ajax({
									 url:"_assets/_controllers/hotelProcesaBuscador.php",
									 type:"POST",
									 //dataType:"html",
									 data:{valueF :last}
									 }).done(function(data){ 
										if(data=="") {


											$(".alertGood").hide();
											$(".alertBad2").hide();
											$(".alertBad").show();
											setTimeout(function() {
													$(".alertBad").hide();
												},5000);
											//alert("Lo sentimos no se obtuvo resultados, intente cambiando la información de busqueda");	
											//$("#muestraInfo").show();
											//$("#resultadoLista").show();
											$("#loading").hide();
											$("#filtrosSection").hide();
											$("#listado").show();
											//$("#listado").html("<p>"+idioma.resultadosHoteles.error+"</p>");
											$("#loading").hide();
											
											setSlider();
											paginacion(mostrar);
											/*
											$("#filtrosSection").hide();
											$("#listado").show();
											$("#listado").html("<p>"+idiomaHotel.resultadosHoteles.error+"</p>");
											$("#loading").hide();
											$(".ultratabs").hide();*/
										}
										else {
											$("#habitaciones").hide();
											$("#filtrosSection").show();
											$("#listado").show();
											$("#listado").html(data);
											$("#loading").hide();
											$(".ultratabs").show();
											$("#prit2").hide();
											$("#laflecha").show();
											$(".alertGood").hide();
											$(".alertBad2").hide();
											paginacion(mostrar);
											//mapa(mostrar,1);
										}
							});
					
					
					/*var ua = navigator.userAgent.toLowerCase();
					if(ua.indexOf('safari') > -1 && ua.indexOf('chrome')==-1 && ua.indexOf('crios')==-1  ) { 
						var  dent3=window.open("carga.html","Carga2","directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no, width=1, height=1, top=2000");  	
						//var dent=window.open("https://www.travelnet.com.mx/boxtravel/","ventana","directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no, width=1, height=1, top=2000"); 
						 var dent=window.open("https://www.travelnet.com.mx/boxtravelnet/","ventana","directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no, width=1, height=1, top=2000"); 
						var  dent2=window.open("carga.html","Carga","directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no, width=1, height=1, top=2000");  	
					}
					//alert ("debug"); //$("#loading").load("https://www.travelnet.com.mx/boxtravelnet/hotels?"+last);
					*/
					
					
					
					
					//$("#frameContent").iframeHeight({ debugMode:true });
					//$("#frameContent").prop("src","https://www.travelnet.com.mx/boxtravelnet/hotels?"+last);
					//$("#frameContent").load(function(){
						//$("#loading").hide();
						//$(this).css("display","block");		
						/*if (ua.indexOf('safari') > -1 && ua.indexOf('chrome')==-1 && ua.indexOf('crios')==-1 ) { 	
							dent.close(); dent2.close();     dent3.close();                                                        
						}*/
						
					//});
					
					
					
					
				}
		});
		
		
		// funcionamiento para cargar los campos de edad de los niños
		
		//$(".cubiertoNino").change(function(){
			/*
			$(document).on('change', ".cubiertoNino", function () {
			
			var id=$(this).prop("id").split("_");
			var solicitado=$(this).val();
			
			var totalMostrado=$("#habitacion_"+id[1]+" ul li").length - 3;
			
			
			if(solicitado==0)
			{
				for(i=0; i<totalMostrado; i++)
				{		
					$("#habitacion_"+id[1]+" li:last").remove();
					//$("#habitacion_"+id[1]).css("display","none");
				}
				//$("#habitacion_"+id[1]).css("display","none");
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
		
		
		*/
		//funcionamiento para mostrar los campos de las habitaciones
	
	
	$(document).on('change', ".cubiertoNino", function () {
				
				var n = $(this).val();
				var id= $(this).attr("id");
				
				
				
				id=id.split("_");
				var h= id[1];
				
				if(n == 0){
					$("#edadNH_"+h+"_1").attr('disabled','disabled');
					$("#edadNH_"+h+"_2").attr('disabled','disabled');
					$("#edadNH_"+h+"_1").val("-");
					$("#edadNH_"+h+"_2").val("-");
					
					

				}if(n == 1){
					$("#edadNH_"+h+"_1").removeAttr('disabled');
					$("#edadNH_"+h+"_2").attr('disabled','disabled');
					$("#edadNH_"+h+"_2").val("-");
				}
					if(n == 2){
				
				
					$("#edadNH_"+h+"_1").removeAttr('disabled');
					$("#edadNH_"+h+"_2").removeAttr('disabled');
					
				}
			
			});
	
		
		$("#rooms").on("change",function(){
			
			var cuartos=$(this).val();
			
			//alert(cuartos);
			if (cuartos > 0) {
				$("#habitaciones").show();
				//$(".filtro2").hide();
				var act = $("#habitaciones div").length;
				//if(cuartos>act) {
				$("#habitaciones").html("");
				for(var i=0; i<cuartos; i++) {
					//$(".filtro2").show();
					var a = i+1;
					$("#habitaciones").append(
						'<div class="habitacion" id="habitacion_' + a + '">' +           
						'<div class="group">'+
						'<span class="tituloHabi">'+idioma.buscador.titulo3+' '+a+':</span>'+
						'</div>'+
						'<div class="group">'+
						'<i class="inside icon-male"></i>'+
						'<input type="hidden" class="habitacion'+a+'" value="'+a+'">'+
						'<!--<span class="label">'+idioma.buscador.titulo4+'</span>-->'+
						'<select id="adultos_'+a+'" name="r'+a+'a" class="obl item custom-select">'+
						'<option value="1" >1 Adult(s)</option>'+
						'<option value="2" selected>2 Adult(s)</option>'+
						'<option value="3">3 Adult(s)</option>'+
						'<option value="4">4 Adult(s)</option>'+
						'</select>'+
						'</div>'+
						'<div class="group">'+
						'<!--<span class="label">'+idioma.buscador.titulo5+'</span>-->'+
						'<i class="inside icon-child"></i>'+
						'<select id="nino_'+a+'" name="r'+a+'k" class="cubiertoNino obl item custom-select">'+
						'<option value="0" selected>'+idioma.buscador.titulo5+'</option>'+
						'<option value="1">1 Children</option>'+
						'<option value="2">2 Children</option>'+
						'</select>'+
						'</div>'+
						'<div class="group">'+
						'<i class="inside icon-child"></i>'+
						'<select id="edadNH_'+a+'_1" name="r'+a+'k1a" class="edadninio obl item custom-select" disabled>'+
						'<option value="-" selected>Select</option>'+
						'<option value="0" >Less than one year</option>'+
						'<option value="1">1 Year</option>'+
						'<option value="2">2 Years</option>'+
						'<option value="3">3 Years</option>'+
						'<option value="4">4 Years</option>'+
						'<option value="5">5 Years</option>'+
						'<option value="6">6 Years</option>'+
						'<option value="7">7 Years</option>'+
						'<option value="8">8 Years</option>'+
						'<option value="9">9 Years</option>'+
						'<option value="10">10 Years</option>'+
						'<option value="11">11 Years</option>'+
						'<option value="12">12 Years</option>'+
						'</select>'+
						'</div>'+
						'<div class="group">'+
						'<i class="inside icon-child"></i>'+
						'<select id="edadNH_'+a+'_2" name="r'+a+'k2a" class="edadninio obl item custom-select" disabled>'+
						'<option value="-" selected>Select</option>'+
						'<option value="0" >Less than one year</option>'+
						'<option value="1">1 Year</option>'+
						'<option value="2">2 Years</option>'+
						'<option value="3">3 Years</option>'+
						'<option value="4">4 Years</option>'+
						'<option value="5">5 Years</option>'+
						'<option value="6">6 Years</option>'+
						'<option value="7">7 Years</option>'+
						'<option value="8">8 Years</option>'+
						'<option value="9">9 Years</option>'+
						'<option value="10">10 Years</option>'+
						'<option value="11">11 Years</option>'+
						'<option value="12">12 Years</option>'+
						'</select>'+
						'</div>'+
						'</div>'
					);		
				}
				/*} else {
					//alert("aqu");
					var val = (cuartos-act)*-1;
					//alert(val);
					for(var i=0; i<val; i++) {
						$("#habitaciones div:last-child").remove();	
							
					}
					
				}*/
				$("#totalHab").val(cuartos);
			} else {
				$("#habitaciones").html("");	
			}
		});
		
		/*$("#rooms").on("change",function(){
			
			var totalUl =$("li.referencia").length;
			var anterior=$("#totalHab").val();
			var actual=$(this).val();
			
			if(actual>0)
			{
				$("#masHabi").slideDown(500);	
			}
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
					var respuesta = $.post("../../_assets/_controllers/masHabitaciones.php",
					{solicitado:actual,mostrados:totalUl});
						
					respuesta.done(function(data){
						$("#masHabi").append(data);
						$("#totalHab").prop("value",$("li.referencia").length);
					});
				}
			}
			
			
			
			
		});*/
		
		/* calendaros */
	/*	$.datepicker.regional['es'] = {
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

	// Inicializa configuracion y control de calendarios
	$("#startDate")
			.datepicker(
					{
						minDate : 2,
						changeMonth : true,
						numberOfMonths : 2,
						dateFormat:"dd-mm-yy",
						onClose : function(selectedDate) {
							
							
							var dias = $("#rango").val();
							
							if(dias>0)
							{  
								var finDate=sumarDias(dias,selectedDate); 
								$("#endDate").prop("value",finDate);
							
							}
							
									
						}
					});

	$("#rango").on("change",function(){
			var dias=$(this).val();
			var fecha = $("#startDate").val();
			var finDate =sumarDias(dias,fecha);
			//alert(finDate);
			$("#endDate").prop("value",finDate);
	});

	
	
	
	
	//////////////////////////////////////////////////////////////////////
		// dispara la busqueda con los filtros seleccionados
		/*		var a;
				var de;
	var val;*/
		$(document).on("click","#botonFiltro",function(){
		/*	val = $("#precioselect").val();
			if (val == 2){
				a = $("#minimo").html();
				de = $("#max").html();
				//alert("si");
			}else if(val == 1){
				de = $("#minimo").html();
				a = $("#max").html();
				//alert("no");
			}*/
			if($("#nh").val()=="")
			{$("#hotelSel").prop("value","");}
			$("#mapita").hide();
			$("#mapa").hide();
			$("#pest").hide();
			$("#filtrosSection").hide();
			$("#frame").show();
			$("#listado").hide();
			$("#listado").html("");
			$("#loading").show();
			$(document).scrollTop( ($("#frame").offset().top-300) );  
			
			$.ajax({
						url:"../_assets/_controllers/filtroHoteles.php",
						type:"POST",
						//dataType:"html",
						data:{
							/*
								precioInicio :$("#minimo").html(),
								precioFinal:$("#max").html(),
								categoriaInicio :$("#starminimo").html(),
								categoriaFinal:$("#starmax").html(),
								nombre:$("#hotelSel").val(),
								plan:$("#plan").val()
								*/
									
							/*	precioInicio :de,
								precioFinal:a,*/
								mayormenorh:$("#precioselect").val(),
								categoriaInicio :$("#starselect").val(),
								categoriaFinal:$("#starselect").val(),
								nombre:$("#hotelSel").val(),
								plan:$("#plan").val()
							 }
						}).done(
						function(data){ 
							if(data=="") {
								$("#filtrosSection").hide();
								$("#listado").show();
								$("#listado").html("<p>"+idiomaHotel.resultadosHoteles.error+"</p>");
								$("#loading").hide();
								$(".ultratabs").hide();
							}
							else {
								$("#filtrosSection").show();
								$("#listado").show();
								$("#listado").html(data);
								$("#loading").hide();
								$(".ultratabs").show();
								$("#prit2").hide();
								$("#laflecha").show();
								paginacion(mostrar);
								//mapa(mostrar,1);
							}
						});
			
		});
		
		
		////////////////////////////////////////////////////////////////////////////////
		// funcionamiento para realizar la paginacion	 
	/*
			function paginacion ()
			{
				 	
				$("div.holder").jPages({
					containerID : "fichasHoteles",
					perPage :15,
					midRange :6,
					//previous :"← Anterior",
					//next:"Siguiente →",
					previous :idioma.anterior,
					next:idioma.siguiente,
					animation:"fadeIn"
				});
				
			}
		*/
		
		$('.error_messages').each(function(){
			$(this).parent().after($(this));
		});
		
		
		function setSlider ()
	{
		var valorMaximo = $("#maxprecioDIVISA").val().split(",.-");
		var valorMinimo = $("#minprecioDIVISA").val().split(",.-");
		var minH = parseInt(valorMinimo[0].replace(/,/g, ''));
		var maxH = parseInt(valorMaximo[0].replace(/,/g, ''));
		$("#minimo").text(valorMinimo[0]+".00 "+valorMinimo[1]);
		$("#max").text(valorMaximo[0]+".00 "+valorMaximo[1]);
		localStorage.setItem("divisa", valorMaximo[1]);
										
		$('#slider-rangeH').slider( "option", "min",minH );
		$('#slider-rangeH').slider( "option", "max",maxH );
		$('#slider-rangeH').slider( "option", "values",[minH,maxH] );
   		$('#slider-rangeH').slider("value", $('#slider-rangeH').slider("value"));
		
		// cambio las imagenes de acuerdo al rango de estrellas que se manda por la url
		$("#star1IMG").attr("src","../../_assets/_images/estrellas/S1.gif");
		$("#star2IMG").attr("src","../../_assets/_images/estrellas/S6.gif");
											
		$('#slider-range2').slider( "option", "values",[1,6] );
		$('#slider-range2').slider("value", $('#slider-range2').slider("value"));
												
		$("#starminimo").text("");
		$("#starmax").text("");
		
		}
		
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
		
			////////////////////////////////////////////////////////////////////////////////////
			// funcionamiento para setear el slider
			$( "#slider-rangeH" ).slider
									({
																								
									  range: true,
									  min: 0,
									  max: 10,
									  values: [ 0, 10 ],
									  slide: function( event, ui ) {
																												  
									 // $("#minimo").text("$"+addCommas(ui.values[0])+" USD");
									 // $("#m9ax").text("$"+addCommas(ui.values[1])+" USD"); 
									$("#minimo").text("$"+addCommas(ui.values[0])+localStorage.getItem("divisa"));
									$("#max").text("$"+addCommas(ui.values[1])+localStorage.getItem("divisa"));																				  
									//$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
							  }
		});
												
		//funcionamiento para setear el slider de rango de estrellas										
		$( "#slider-range2" ).slider({
		
								   range: true,
								   min: 1,
								   max: 6,
								   values: [ 1, 6 ],
								   slide: function( event, ui ) {
																																									  
										 $("#1star").html(ui.values[0]+" Star");
										 $("#fullstar").html(ui.values[1]+" Star"); 
																																					 
										 $("#starminimo").html(ui.values[0]);
										 $("#starmax").html(ui.values[1]); 
										 $("#star1IMG").attr("src","../../_assets/_images/estrellas/S"+ui.values[0]+".gif");
										  $("#star2IMG").attr("src","../../_assets/_images/estrellas/S"+ui.values[1]+".gif");
																																			  
										//$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
							}
		}); 
											
					
												
		/////////////////////////////////////////////////////////////////////
		////	FUNCIONAMIENTO DEL AUTOCOMPLETE
			$.widget( "custom.catcomplete", $.ui.autocomplete,
			{
					_renderMenu: function( ul, items )
						   {
								var that = this,
									currentCategory = "";
								$.each( items, function( index, item )
								 {
									/*if ( item.categoria != currentCategory ) 
									{
										ul.append( "<li class='ui-autocomplete-category'>" + item.categoria + "</li>" );
										currentCategory = item.categoria;
									}*/
									that._renderItemData( ul, item );
								});
							}
			});
			
			////////////////////////////////////////////////////////////////	
			//autocomplete del filtro por nombre de hotel
			$( "#nh" ).catcomplete({
														
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
																	
																	url:"../_assets/_controllers/autoNombreHoteles.php",
																	dataType:"json",
																	type:"POST",
																	data:
																	{term:normalize	},
															
															success:function(data)
															{
																// limpio la variable opcion para obligar a la seleccion de la lista
																opcionfiltro="";
																response($.map(data,function(item){
																				$("#nombreFiltros").css('background-color','#F0F0F0');
																				return {
																							label : item.hotel,
																							value : item.value,
																							itemcode : item.itemcode,				
																						}
																		
																		
																}));
																	
																	///////////////////////////////////////////////////////////////////////////////
																	///			SIRVE PARA VALIDAR QUE TENGA DATOS EL JSON							
																	if (data == "")
																	{	//$("#nombreFiltros").removeClass('ui-autocomplete-input');
																		//$("#nombreFiltros").prop("value","Debe seleccionar una opcion");
																		//$("#nombreFiltros").css('background-color','#EDA5A6');
																	}
																	
															}
															
														  })
															
														},
														
														select: function( event, ui )
														{
															opcionfiltro=""; 
															opcionfiltro=ui.item.id;
															$("#hotelSel").prop("value",ui.item.itemcode);
														},
														 
														search: function(){$(this).addClass('ui-autocomplete-loading');},
														 
														open: function(){
															  
																$(this).removeClass('ui-autocomplete-loading');
																
																if($("body").find(".ui-autocomplete").css("display")=="block")
																{
																	var na=$("body").find(".ui-autocomplete").prop("id");
																	$("#"+na).find(".ui-autocomplete-category").addClass("completeHoteles");
																	//alert("es visivle");	
																}
																	
															
																
																 
														}
														
																				 
	});

	//  Muestra imagen mas grande respecto a la galeria
	$(document).on('click', '.imgBigger', function () {
		var src = $(this).attr('src');
		var data = $(this).data('img');
		console.log('src: ', src, ', data: ', data);
		/*var res = src.replace('medium', 'bigger');
		$('.img_bigger_' + data).html('<img src="' + res + '"/>');*/
		$('.img_bigger_' + data).html('<img src="' + src + '"/>');
	});

			if(location.search!="")
			{
				
				var variables= getVarsUrl();
				
				if(variables.ta=="buscador")
				{
					$("#frame").show();
					$("#listado").hide();
					$("#listado").html("");
					$("#loading").show();
					$("#pest").hide();
					$("#filtrosSection").hide();
					$(document).scrollTop( ($("#frame").offset().top-300) );  
						$.ajax({
								url:"_assets/_controllers/getListadoHoteles.php",
								dataType:"html",
									type:"POST",
									data:{
											
										}	
									}).done(function(data)
									{
										$("#filtrosSection").show();
										$("#listado").show();
										$("#listado").html(data);
										$("#loading").hide();
							$(".ultratabs").show();
								paginacion(mostrar);
								//mapa(mostrar,1);		
						});
				}
				
				
			}
			


			/* obtengo la dire */
	$(document).on("click",".ubica",function(e){
		e.preventDefault();
		var elemento = $(this).find(".direc").prop("id");
		var idE = elemento.split("_");
		//console.log("entra item "+idE[1]);
		var idR = idE[1];

		var estatus = $("#hotelito_"+idR).css("display");

		if(estatus=="block")
		{
			$.ajax({
				url:"../_assets/_controllers/ubicaList.php",
				type:"POST",
				data:{ item: idR },
				success:function(data){
					var d = data.split("--,,..");
					if(d[0]!="")
					{ $("#dir_"+d[1]).html(d[0]);	}
				}
			});
		}
		
	});
	// Finaliza configuracion y control de calendarios

	

	/*$("#warning").css("display", "none");
	$("#warningDest").css("display", "none");

	$("#ver_precios").click(function(e) {

		e.preventDefault();
		var eval = $("#startDate").val();
		var dest = $("#citycode").val();
		if (eval == "dd-mm-yyyy" || dest == "") {
			if (eval == "dd-mm-yyyy") {
				$("#warning").show("slow");
			}
			if (dest == "") {
				$("#warningDest").show("slow");
			}
		} else {
			$("#formHoteles").submit();
		}

	});*/
	/*
$(window).load(function(){
var valueSession= $("#sessionHotels").val();
localStorage.setItem("seleccionadoBoton", "BW");

if(localStorage.getItem("weekB")=="BW"){
	$("#ta").val("sp");
}

	if(valueSession==1){
		$("#frameContent").hide();
		$("#loading").show();
				
		var last=$("#formHoteles").serializeArray();
		$("#pest").hide();
		$("#filtrosSection").hide();
		$("#frame").show();
		$("#listado").hide();

		var last=$("#formHoteles").serializeArray();
							$.ajax({
									 url:"_assets/_controllers/hotelProcesaBuscador.php",
									 type:"POST",
									 data:{valueF :last}
									 }).done(function(data){ 
										if(data=="") {
											$("#filtrosSection").hide();
											$("#listado").show();
											$("#listado").html("<p>"+idioma.resultadosHoteles.error+"</p>");
											$("#frame #loading").hide();
											$("#ta").val("sp");
											$(".ultratabs").hide();
										}
										else {
											$("#destinosT").hide();
											$("#habitaciones").hide();
											$("#filtrosSection").show();
											$("#listado").show();
											$("#listado").html(data);
											$("#loading").hide();
											$("#ta").val("sp");
											$(".ultratabs").show();
											paginacion(mostrar);
											//mapa(mostrar,1);
										}
					 });
					
	}else{
		localStorage.setItem("weekB", "BW");
	}
});
*/
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

$(document).ready(function(e) {
	
var altura = $('#cajaReserva').offset().top;
	$(window).on('scroll', function(){
		if ( $(window).scrollTop() > altura+400){
			$('#cajaReserva').addClass('menu-fixed');
		} else {
			$('#cajaReserva').removeClass('menu-fixed');
		}
	});
});