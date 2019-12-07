// JavaScript Document
$(document).ready(function(e) {
	
		 
		 /// get idioma
	
		
		 var cords = $("#coord").prop("value");
	
		   cords = cords.split(",");
		   console.log(cords);
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
	


	
});