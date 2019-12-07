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
			
		
		$(document).on("mouseover",".thumb",function(){
				
				$rutaNova = $(this).attr("src");
                
				$(".thumb").removeClass("act");
					
						//$("#cambiI").attr("src",ruta+d[pos[1]].imgB);
				$("#cambiI").attr("src",$rutaNova);
					
				$(this).addClass("act");
				
			});
		
		
		$(".contenidoCajaCont").css("display","none");
		$("#con_0 .contenidoCajaCont").css("display","block");
		
		
		$(".contenidoCajaTitulo").click(
			function(){
				var id=$(this).parent().attr("id");
				
				$(".contenidoCajaTitulo").each(function() {
                    
					var padre= $(this).parent();
					
					var idT = $(this).parent().attr("id");
					
					if(padre.find(".contenidoCajaCont").css("display")=="block" && id!=idT)
					{
						padre.find(".contenidoCajaCont").slideToggle();
						$(this).removeClass("activoT");
						$(this).find(".arrow").removeClass("arrowOpen");
					}
					
                });
				
				var padre=$(this).parent();
				padre.find(".contenidoCajaTitulo").addClass("activoT");
				padre.find(".arrow").addClass("arrowOpen");
				if(padre.find(".contenidoCajaCont").css("display")=="none")
				{
					padre.find(".contenidoCajaCont").slideToggle();
				}
				
		});
	


		var boton =localStorage.getItem("seleccionadoBoton");
		var url= $('#urlorigen').val();

		if(boton=="H"){
		$("#linkbackinformacion").attr('href', url+"/hotelServices.php");
				$("#linkbackinformacion").text('Hotels');
		}else if(boton=="BW"){
		$("#linkbackinformacion").attr('href', url+"/beyondWeeks.php");
			$("#linkbackinformacion").text('Beyond Special');
		}else if(boton=="RW"){
		$("#linkbackinformacion").attr('href', url+"/resortWeeks.php");
		$("#linkbackinformacion").text('Resort Stays');
		}

	
});