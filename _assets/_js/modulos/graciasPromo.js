$(document).ready(function(e){

	// Obtenemos el origen del formulario
	var loc = document.location.href;
	var origen = loc.split('=')[1];
	var boton = 0;

	// console.log (origen);

	$(document).on("click","#botonCerrarGraciasPromo",function(){
		switch(origen) {
		    case "banner":
		        boton = 4;
		        break;
		    case "popup":
		        boton = 9;
		        break;
		    default:
		        boton = 9;
		}
		$.ajax({
			url:"../../_assets/_controllers/promoPop.php",
			type:"POST",
			data: { reservara : boton},
			dataType:"json",
			success: function(data){				
				if( data==="ok" ) {
					parent.$.fancybox.close();
				}	
			}
		});
	});
});