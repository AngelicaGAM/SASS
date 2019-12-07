// JavaScript Document
$(document).ready(function(e) {
	

		// Galeria
			
	
		 
		 /// mapa
	
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

	//Cambiar las imagenes de la galeria
	$(document).on("click", ".galchica", function () {
		var src = $(this).attr('src');
		console.log('src: ', src);
		/*var res = src.replace('medium', 'bigger');
		$('.img_bigger_' + data).html('<img src="' + res + '"/>');*/
		$('.img_bigger_').html('<img src="' + src + '"/>');
	});

	

	
});