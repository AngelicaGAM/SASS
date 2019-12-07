// JavaScript Document

$(document).ready(function(e)
{
    /// get idioma
	var idioma="";
	$.ajax({
		url:"_assets/_controllers/getLang.php",
		data:{ page: "cruises"},
		type:"POST",
		dataType:"json",
		async:false,
		success: function (data) {
			idioma = eval(data);
		}
	});   
			
	////////////////////////////////////////////////////////////////////////////////////
	//	funcionamiento para el filtro de fichas por la zona de salida
	$("#claveD").on("change",function()
	{
		var valor= $(this).val();
		localStorage.setItem("selectedCruise", valor);
		idChange(valor);
	});

	function idChange(valor)
	{
		////////////////////////////////////////////////////////
		// 	Lleno el combo de los meses con las opciones de zona de salida o / y 
		// duracion
		$.ajax(
		{
			url:"_assets/_controllers/getDiasCruceros.php",
			dataType:"html",
			type:"POST",
			data:{
				salida:valor,
				duracion:$("#duracion").val(),
			}	
		}).done(function(data)
		{
			$("#fecha").empty();
			$("#fecha").append(data)
		});		
				
		// Saco los cruceros con la zona seleccionada en el combo utilizo el controler
		// de duracion.
		setTimeout(function()
		{
			$.ajax({
				url:"_assets/_controllers/getDuracionRes.php",
				dataType:"html",
				type:"POST",
				data:{
					salida:valor,
					duracion:$("#duracion").val(),
					mes:$("#fecha").val()
				}	
			}).done(function(data)
			{
				$("#listado").html(data);
			});
		}, 150);
	}
		
	////////////////////////////////////////////////////////////////////////////////////
	//	funcionamiento para el filtro de fichas por la duracion
	$("#duracion").on("change",function()
	{
		var valor= $(this).val();
		localStorage.setItem("selectedDuracion", valor);
		duracionChange(valor);
	});

	function duracionChange(valor)
	{
		////////////////////////////////////////////////////////
		// 	Lleno el combo de los meses con las opciones de zona de salida o / y 
		// duracion
		$.ajax(
		{
			url:"_assets/_controllers/getDiasCruceros.php",
			dataType:"html",
			type:"POST",
			data:{
				salida:$("#claveD").val(),
				duracion:valor,
				mes:$("#fecha").val(),
			}	
		}).done(function(data)
		{
			$("#fecha").empty();
			$("#fecha").append(data)
		});		
				
		setTimeout(function()
		{
			$.ajax(
			{
				url:"_assets/_controllers/getDuracionRes.php",
				dataType:"html",
				type:"POST",
				data:{
					salida:$("#claveD").val(),
					duracion:valor,
					mes:$("#fecha").val()
				}	
			}).done(function(data)
			{
				$("#listado").html(data);
			});
		}, 150);
	}
		
	////////////////////////////////////////////////////////////////////////////////////
	//	funcionamiento para el filtro de los meses

	$("#fecha").on("change",function()
	{
		var valor= $(this).val();
		localStorage.setItem("selectedFecha", valor);
		fechaChange(valor);
	});

	function fechaChange(valor)
	{
		$.ajax(
		{
			url:"_assets/_controllers/getDuracionRes.php",
			dataType:"html",
			type:"POST",
			data:{
				salida:$("#claveD").val(),
				duracion:$("#duracion").val(),
				mes:valor
			}	
		}).done(function(data)
		{
			$("#listado").html(data);
		});
	}
		
	///////////////////////////////////////////////////////////////////////////////
	// funcionamiento del busqueda
	$("#search").click(	function()
	{
		var ban=true;
		if($("#claveD").val()=="0" && $("#duracion").val()=="0"  && $("#fecha").val()==-1 )
		{
			alert(idioma.buscador.titulo1Valida);
			ban=false;
		}
		if(ban)
		{
			$('html,body').animate({ scrollTop: $("#listado").offset().top-100 }, 2000);
		}
	});
	
	$(window).load(function(){
			
		var cruise = localStorage.getItem('selectedCruise');
		var duracion = localStorage.getItem('selectedDuracion');
		var fecha = localStorage.getItem('selectedFecha');
		if(cruise!=null){
			var optgroup = $('#claveD');
			var option = optgroup.find('option[value="'+cruise+'"]');
			option.attr('selected', true);
			idChange(cruise);
		}if(duracion!=null){
			duracionChange(duracion);
			var optgroup2 = $('#duracion');
			var option2 = optgroup2.find('option[value="'+duracion+'"]');
			option2.attr('selected', true);
		}if(fecha!=null){
			fechaChange(fecha);
			var optgroup3 = $('#fecha');
			var option3 = optgroup3.find('option[value="'+fecha+'"]');
			option3.attr('selected', true);
		}
	});
	
	var altura = $('#cajaReserva').offset().top;
		$(window).on('scroll', function(){
			if ( $(window).scrollTop() > altura+200){
				$('#cajaReserva').addClass('menu-fixed');
				$('#cajaReserva').addClass('dib');
			} else {
				$('#cajaReserva').removeClass('menu-fixed');
				$('#cajaReserva').removeClass('dib');
			}
		});	
				
});