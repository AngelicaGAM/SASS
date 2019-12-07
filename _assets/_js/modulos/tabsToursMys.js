// JavaScript Document


$(document).ready(function(e) {

				
		////////////////////////////////////////////////////////////////////////////////////
		// funcionamiento para las fichas preestablecidas recuperando el id ques el codigo del destino
				$(document).on("click",".tabs li",function(){
				
					$("#muestraInfo").hide();
					$("#loading").show();
					var elemento=$(this).data("value").split("_");
					var id=$(this).prop("id");
					
					// si es un destino mando a llamar la funcion que arma la congifuracion inical.
					if( elemento[0]=="destino" )
					{
						//alert("es el destino");
						
						$("#muestraInfo").hide();
						$("#loading").show();
						var aux=$(this).data("value");
						$.ajax({
								url:"../_assets/_controllers/getConfiguracionToursMys.php",
								 type:"POST",
								 dataType:"html",
													 
								data:{
										clave :elemento[1]
									 }
								}).done(function(data){
									
									$("#listado").html(data);
									
									$("#loading").hide();
									$("#muestraInfo").show();
									
									$('.sliderContent2').revolution(
									{
										delay:5000,
										startwidth:640,
										startheight:230,
										hideThumbs:10,
										fullWidth:"on",
										navigationType :"bullet",
										navigationHAlign:"right",
										navigationVAlign:"bottom",
										navigationStyle:"round",
										navigationHOffset:1,
										navigationVOffset:-15,
										touchenabled:"on",
										onHoverStop:"off"
									});
									$(".tabs li").removeClass("activo");
									$("#"+id).addClass("activo");
									
						 });
						 
						
						
					}
					
					// si es un subdestino verifico si es cozumel o isla mujeres
					// por el momento solo este funcinamiento lo tiene CANCUN
					if(elemento[0]=="subdestino")
					{
						$(".tabs li").removeClass("activo");
						$(this).addClass("activo");
						// isla mujeres saco los tours de la categoria ism o saco los tours de cozumel
						if((elemento[1]=="ISM") || (elemento[1])=="COZUMEL")
						{
							if(elemento[1]=="ISM")
							{toursPorCategorias(elemento[1]);}
							
							if((elemento[1]=="COZUMEL"))
							{
								$.ajax({
								url:"../_assets/_controllers/getlistadoEspecificoToursMys.php",
								 type:"POST",
								 dataType:"html",
													 
								data:{
										clave :elemento[1]
									 }
								}).done(function(data){
									
									$("#muestraInfo").html(data);
									$("#loading").hide();
									$("#muestraInfo").show();
									
								 });
							}
						}
						else
						{}
								
								
						
					}
					
					// checo si es un combo lo redirijo a la url de combos con el destino como parametro
					if(elemento[0]=="combo")
					{
						//alert($(this).data("value"));
						//window.location = "tours/combos/"+$(this).data("value");
						
						$("#muestraInfo").hide();
						$("#loading").show();
						window.location = "../tours/combos.php?code="+elemento[1];
					}
					
					
					/*$("#muestraInfo").hide();
					$("#loading").show();
								
					var aux=$(this).prop("id").split(",.-");
					$.ajax({
							 url:"../_assets/_controllers/hotelFichaIndex.php",
							 type:"POST",
							 //dataType:"html",
										 
							 data:{
									ciudad :aux[1],
									destino :aux[0]
								  }
							 }).done(function(data){
							 	window.location = "../hoteles/resultados/"
					 });*/
					
				});
				
				
				///////////////////////////////////////////////////////////////////////////////////
				// funcionamiento para sacar los tour por categorias seleccionada
				
				$(document).on("click",".sombraImagen",function(){
					
					$("#muestraInfo").hide();
					$("#loading").show();
					//var aux=$(this).data("value");
					toursPorCategorias($(this).data("value"));
					
				});		
				
				
				////////////////////////////////////////////////////////////////////////////////////
				// recupera los tours por la categoria seleccionada
				function toursPorCategorias(clave)
				{
					$.ajax({
							url:"../_assets/_controllers/getListadoToursMys.php",
							 type:"POST",
							 dataType:"html",
												 
							data:{
									clave :clave
								 }
							}).done(function(data){
								
								$("#muestraInfo").html(data);
								$("#loading").hide();
								$("#muestraInfo").show();
					 });
				}
				
				
				/////////////////////////////////////////////////////////////////////////////////
		// clic en el boton de book del tour
			$(document).on("click",".boton",function(){
				
				$("#muestraInfo").hide();
				$("#loading").show();
					
				dato = $(this).data("value");
				var auxx=dato.split(",.-");
				
				window.location = '../tours/'+normalize($("#destinoTours").val())+'/'+normalize(auxx[5])+'/'+auxx[1]+'/informacion';
			});	
		
		/////////////////////////////////////////////////////////////////////////////////
		// clic en el boton de leer mas
			$(document).on("click",".leer",function(){
				
				$("#muestraInfo").hide();
				$("#loading").show();
				
				var busco="#"+$(this).parent().parent().parent().prop("id");
				dato=$(busco).find("input").data("value");
				var auxx=dato.split(",.-");
				
				window.location = '../tours/'+normalize($("#destinoTours").val())+'/'+normalize(auxx[5])+'/'+auxx[1]+'/informacion';
			});		
		
		/////////////////////////////////////////////////////////////////////////////////
		// clic en el boton del titulo del tour mas
			$(document).on("click",".titulo",function(){
				
				$("#muestraInfo").hide();
				$("#loading").show();
					
				var busco="#"+$(this).parent().prop("id");
				dato=$(busco).find("input").data("value");
				var auxx=dato.split(",.-");
				
				window.location = '../tours/'+normalize($("#destinoTours").val())+'/'+normalize(auxx[5])+'/'+auxx[1]+'/informacion';
			});			
			
			
			
			var normalize = (function() {
			  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
				  to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
				  mapping = {};
			 
			  for(var i = 0, j = from.length; i < j; i++ )
				  mapping[ from.charAt( i ) ] = to.charAt( i );
			 
			  return function( str ) {
				  var ret = [];
				  for( var i = 0, j = str.length; i < j; i++ ) {
					  var c = str.charAt( i );
					  if( mapping.hasOwnProperty( str.charAt( i ) ) )
						  ret.push( mapping[ c ] );
					  else
						  ret.push( c );
				  }
				  //return ret.join( '' );
				  return ret.join( '' ).replace( /[^-A-Za-z0-9]+/g, '-' ).toLowerCase();
			  }
			 
			})();
	
		
});