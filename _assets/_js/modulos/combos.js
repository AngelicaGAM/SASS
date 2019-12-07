// JavaScript Document


$(document).ready(function(e) {

	 
	 
	 
		$("#loading").hide();
		
		
		$(document).on("click",".tabs li",function(){
			$("#muestraInfo").hide();
			$("#loading").show();
		});
		
		
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
				
				
		////////////////////////////////////////////////////////////////////////////////////
		// funcionamiento para las fichas preestablecidas recuperando el id ques el codigo del destino
				$(".botonMasInfo").on("click",function(){
					var dato = $(this).data("value").split(",.-");
					
					$("#muestraInfo").hide();
					$("#loading").show();
					//window.location = '../tours/'+normalize($("#destinoTours").val())+'/'+normalize(auxx[5])+'/'+auxx[1]+'/informacion';
					var info=$(location).attr('href').split("="); 
					
					var respuesta = $.post("../../_assets/_controllers/getClaveCombo.php",
							{clave:dato[0]});
							respuesta.done(function(data){
								//window.location = '../tours/combotours/'+normalize($("#destinoTours").val())+'/'+normalize(dato[1])+'/detalle';
								window.location = '../tours/tarifascombos.php?destino='+normalize(info[1]);
					});
							
					
					
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