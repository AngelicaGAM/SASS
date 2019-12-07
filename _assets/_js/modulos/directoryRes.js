// JavaScript Document

$(window).load(function(e) {
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


				$.ajax({
					url:"_assets/_controllers/getListMobile.php",
					type:"POST",
					dataType:"html",
					success: function(data){
						//console.log(data);
						if(data!="")
						$("#mobileDirectorio").html(data);
						else
						$("#mobileDirectorio").html("No info");
					}
				});
	
	//alert($("#continentes ul li:eq(0)").attr("value"));
	
	$.ajax({
			url:"_assets/_controllers/getListaPaisesRes.php",
			type:"POST",
			dataType:"html",
			data:{ continente:$("#continentes ul li:eq(0)").attr("value")},
			success: function(data){
				console.log(data);
				if(data!="")
				$("#direc").html(data);
				else
				$("#direc").html("No info");
			}
		});
	
		var anchoClick = parseInt($("#continentes ul li:eq(0)").css("width"))+40;
		var anc = (anchoClick/2)-5;
		var posicionFinal = anc+0;
		$("#flecha").css("margin-left",posicionFinal+"px");
	
	
	
    $("#continentes li").click(
		function(){
				var tamano = parseInt($(this).css("width"));
				var inicial = parseInt($("#flecha").css("margin-left"));
				
				var elementoClick =$(this).index();
				var elementoActual = $("#continentes li.activo").index();
				
				//alert(" al que click "+elementoClick+"  al actual   "+elementoActual);
				var pix =parseInt($("#flecha").css("margin-left"));
				
				var posicionFinal = $("#continentes ul li:eq("+elementoClick+")").position().left;
				var posOri = $("#riel").position().left;
				
				posicionFinal = posicionFinal-posOri;
				
				// saco la posicion de la mitad
				
				var anchoClick = parseInt($("#continentes ul li:eq("+elementoClick+")").css("width"))+40;
								
				var anc = (anchoClick/2)-5;
				 posicionFinal = anc+posicionFinal;
			
						
				$("#flecha").css("margin-left",pix).stop().animate({marginLeft:posicionFinal+"px"},500,"linear",function(){
					
						$.ajax({
							url:"_assets/_controllers/getListaPaisesRes.php",
							type:"POST",
							dataType:"html",
							data:{ continente:$("#continentes ul li:eq("+elementoClick+")").attr("value")},
							success: function(data){
								
								$("#direc").html(data);
							}
						});
					});
				$("#continentes ul li:eq("+elementoActual+")").removeClass("activo");
				$("#continentes ul li:eq("+elementoClick+")").addClass("activo");
				
				
		});
		
		//  click a paises para mostrar ciudades 
		
	

		$(document).on("click",".columna ul li a",function(){
			var clave=$(this).parent().attr("value");
			//alert($(this).parent().attr("data-link"));
			var $container = $(this).closest(".card-body");
			var cajadirectorio = $container.find(".paisesDirectorio");
			  
			if(clave!="" && clave!=0)
			{
					//* carga las ciudades */
					$.ajax({
							url:"_assets/_controllers/getListaCiudadesRes.php",
							type:"POST",
							dataType:"html",
							data:{ pais: clave},
							success: function(data){

								
								$("#direc").html(data);
								cajadirectorio.html(data);
							}
					});
						
			}
			if(clave==0)
			{
				//alert("este es una ciudad"+$(this).parent().attr("data-link"));
				window.location = $(this).parent().attr("data-link");
			}
			
		});


		
		$(document).on("click","#return",function(){
			var $container = $(this).closest(".card-body");
			var cajadirectorio = $container.find(".paisesDirectorio");

			$.ajax({
					url:"_assets/_controllers/getListaPaisesRes.php",
					type:"POST",
					dataType:"html",
					data:{ continente:$("#continentes ul li.activo").attr("value")},
					success: function(data){
						
						

						cajadirectorio.html(data);
						$("#direc").html(data);
					}
				});
		});
		
		
		
	
	
});