// JavaScript Document
$(document).ready(function(e) {
	
	
	$("body").trigger("validaCheckRW");
    $("input[type=checkbox]").uniform();
	
	$("#filtrosSection").hide();
	
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
				 url:"_assets/_controllers/getLang.php",
				 data:{ page: "hotels"},
				 type:"POST",
				 dataType:"json",
				 async:false,
				 success: function(data){
				
						idioma =eval(data);
						//return idi;
				 }
			});
			
		
		
		
		
		$(".contenidoCajaCont").css("display","none");
		$(".contenidoCajaCont").each(
			function(){
			
			 var padre = $(this).parent();		
			 padre.find(".contenidoCajaTitulo").find(".arrow").removeClass("arrowOpen");
		});
		
		$(".contenidoCajaTitulo").click(
				function(){
					var padre=$(this).parent();
					if(padre.find(".contenidoCajaCont").css("display")=="none")
					{
							padre.find(".arrow").addClass("arrowOpen");
					}
					else
					{
						padre.find(".arrow").removeClass("arrowOpen");
					}
				
					padre.find(".contenidoCajaCont").slideToggle();
					
			});
		


		var boton =localStorage.getItem("seleccionadoBoton");
		var url= $('#urlorigen').val();

		if(boton=="H"){
		$("#linkbackhabitaciones").attr('href', url+"/hotelServices.php");
				$("#linkbackhabitaciones").text('Hotels');

		}else if(boton=="BW"){
		$("#linkbackhabitaciones").attr('href', url+"/beyondWeeks.php");
				$("#linkbackhabitaciones").text('Beyond Special');
		}else if(boton=="RW"){
		$("#linkbackhabitaciones").attr('href', url+"/resortWeeks.php");
		$("#linkbackhabitaciones").text('Resort Stays');
		}
		

});