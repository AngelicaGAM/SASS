//#ULTRATABS BY GLPUERTOR

$(document).on("click",".info",function(){
	$("body").trigger("validaCheckRW");
	///////captura los valores y los registra en las siguientes variables
	var val = $(this).data('val');
	var url = $(this).data('url');
	var accion = $(this).data('accion');

	if (url == "tarifasstays"){
		$(".btabs"+val).removeClass("activo");
		$("#b"+val+"tarifas").addClass("activo");
		$('html,body').animate({
			scrollTop: $("#hotelito_"+val).offset().top-200
		}, 2000);
		$("#working"+val).slideUp();	
		$("#mostrar2"+val).show();
		$("#mostrar"+val).hide();
		$("#ultratabs"+val).slideDown();
	} else if (url == "ultratabs"){
		if(accion == "show"){
			$("#mostrar"+val).show();
			$("#mostrar2"+val).hide();
			$('html,body').animate({
				scrollTop: $("#hotelito_"+val).offset().top-200
			}, 2000);
			$("#"+url+val).slideDown();
			$(".btabs"+val).removeClass("activo");
			$("#working"+val).slideDown();	
			$("#b"+val+"tarifas").addClass("activo");
			$.ajax({
				type: "POST",
				url: "../_assets/_controllers/tarifas.php",
				data: {"code" : val},	
				dataType:"text",
				success:function(texto){
					$("#mostrar"+val).html(texto);
					$(".btabs"+val).removeClass("activo");
					$("#b"+val+"tarifas").addClass("activo");
					$("#working" + val).slideUp();
					$("body").trigger("validaCheckRW");
				},
			})
		}
		if(accion == "hide"){
			//$("#" + url + val).slideUp();
			$("#mostrar" + val).hide();
			$(".btabs" + val).removeClass("activo");
		}
	} else if(url == "cargamanual"){
		$("body").trigger("validaCheckRW");
		$("#mostrar"+val).show();
		$("#mostrar2"+val).hide();
		if(accion=="show") {
			$("#habitacion"+val).slideDown();
		}
		if(accion == "hide") {
			$("#habitacion"+val).slideUp();
		}
	} else if(url == "ubicacion") {
		$("#mostrar"+val).show();
		$("#mostrar2"+val).hide();
		$("#working"+val).slideDown();
		$.ajax({
			type: "POST",
			url: "../_assets/_controllers/"+url+".php",
			data: {"code" : val},	
			dataType:"html",
			success:function(texto){
				$("#mostrar"+val).html(texto);
				$(".btabs"+val).removeClass("activo");
				$("#b"+val+url).addClass("activo");
				$("#working"+val).slideUp();
				var cords = $("#coord"+val).prop("value");
		  	 	cords = cords.split(",");
				$("#mapaCentral"+val).gmap3({
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
		   		
			},
		})
		
		.fail(function(){  		
			alert("hubo un error al querer traer la informacion, llame a su concierge para cualquier aclaracion");
		})
		.always(function(){
			$(".btabs"+val).removeClass("activo");
			$("#b"+val+url).addClass("activo");
		});
	} else {
		$("#mostrar"+val).show();
		$("#mostrar2"+val).hide();
		$("#working"+val).slideDown();
		$("#ultratabs"+val).slideDown();
		$.ajax({
			type: "POST",
			url: "../_assets/_controllers/"+url+".php",
			data: {"code" : val},	
			dataType:"html",
			success:function(texto){
				$("#mostrar"+val).html(texto);
				$(".btabs"+val).removeClass("activo");
				$("#b"+val+url).addClass("activo");
				$("#working"+val).slideUp();
			},
		})
		.fail(function(){  		
			alert("hubo un error al querer traer la informacion, llame a su concierge para cualquier aclaracion");
		})
		.always(function(){
			$(".btabs"+val).removeClass("activo");
			$("#b"+val+url).addClass("activo");
				$("body").trigger("validaCheckRW");
		});
	}
});