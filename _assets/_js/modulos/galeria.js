// JavaScript Document
$(document).ready(function(e) {
	
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
			
		
		$(".fancybox").fancybox({
			
			
			});
	
	
	$(".various").fancybox({
			width:800,
			height:600
		});


		var boton =localStorage.getItem("seleccionadoBoton");
		var url= $('#urlorigen').val();
		
		if(boton=="H"){
		$("#linkbackgaleria").attr('href', url+'/hotelServices.php');
		$("#linkbackgaleria").text('Hotels');
		}else if(boton=="BW"){
		$("#linkbackgaleria").attr('href', url+'/beyondWeeks.php');
		$("#linkbackgaleria").text('Beyond Special');
		}else if(boton=="RW"){
		$("#linkbackgaleria").attr('href', url+'/resortWeeks.php');
		$("#linkbackgaleria").text('Resort Stays');
		}


	
});