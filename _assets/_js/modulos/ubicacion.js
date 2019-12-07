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
			
		
		 var cords = $("#coord").prop("value");
	
		   cords = cords.split(",");
		   
		   /* mapa lateral  */
		   $("#mapaCentral").gmap3({
		map:{
				options:{
							center:[cords[0],cords[1]],
							zoom:15,
							mapTypeId: google.maps.MapTypeId.ROADMAP,
							mapTypeControl: false,
							mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU },
							navigationControl: {style: google.maps.NavigationControlStyle.SMALL},
							scrollwheel: true,
  						    streetViewControl: true
						}
			},
	  marker:{
			     values:[{ latLng:[cords[0],cords[1]], data:"Hotel "+cords[2] }],
				 options:{ draggable:false}
			}
	});
	

		
		var boton =localStorage.getItem("seleccionadoBoton");
		var url= $('#urlorigen').val();
		
		if(boton=="H"){
		$("#linkbackubicacion").attr('href', url+"/hotelServices.php");
		$("#linkbackubicacion").text('Hotels');
		}else if(boton=="BW"){
		$("#linkbackubicacion").attr('href', url+"/beyondWeeks.php");
		$("#linkbackubicacion").text('Beyond Special');
		}else if(boton=="RW"){
		$("#linkbackubicacion").attr('href', url+"/resortWeeks.php");
		$("#linkbackubicacion").text('Resort Stays');
		}


	
});