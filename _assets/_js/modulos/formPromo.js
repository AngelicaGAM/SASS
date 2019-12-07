$(document).ready(function(e){

	// Obtenemos el origen del formulario
	var loc = document.location.href;
	var origen = loc.split('=')[1];
	var boton = 0;

	// console.log (origen);

	$(document).on("click","#botonCerrarForm",function(){
		switch(origen) {
		    case "banner":
		        boton = 2;
		        break;
		    case "popup":
		        boton = 7;
		        break;
		    default:
		        boton = 7;
		}
		$.ajax({
			url:"../../_assets/_controllers/promoPop.php",
			type:"POST",
			data: { reservara : boton },
			dataType:"json",
			success: function(data){				
				if( data==="ok" ) {
					parent.$.fancybox.close();
				}	
			}
		});
	});
	$(document).on("click","#botonSend",function(e){
		
		var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
		var vacioReg = new RegExp(/^\s+$/);
		var digitsReg = /^\d+$/;
		
		var ban = true;
		$("#idEnvio").css("display","none");
		if($("#nombre").val()=="" || vacioReg.test($("#nombre").val())) {
				$("#nombre").attr("placeholder", "Type name");
				$("#nombre").css({
					'color': '#a60000',
					'background': '#ffcccc',
					'background-image': 'url(../_images/popup/promo/namePromo.png)',
					'background-repeat': 'no-repeat',
				    'background-position': '15px 0px',
				    'background-size': 'contain',
				});
				ban=false;
		}
		if(!emailReg.test($("#email").val())){
				$("#email").attr("placeholder", "Type email");
				$("#email").css({
					'color': '#a60000',
					'background': '#ffcccc',
					'background-image': 'url(../_images/popup/promo/mailPromo.png)',
					'background-repeat': 'no-repeat',
				    'background-position': '15px 0px',
				    'background-size': 'contain',
				});
				ban=false;
		}
		if($("#telefono").val()=="" || vacioReg.test($("#telefono").val())){
				$("#telefono").attr("placeholder", "Type telephone");
				$("#telefono").css({
					'color': '#a60000',
					'background': '#ffcccc',
					'background-image': 'url(../_images/popup/promo/telephonePromo.png)',
					'background-repeat': 'no-repeat',
				    'background-position': '15px 0px',
				    'background-size': 'contain',
				});
				ban=false;
		}
		if($("#pais").val()=="" || vacioReg.test($("#pais").val())){
				$("#pais").attr("placeholder", "Type country");
				$("#pais").css({
					'color': '#a60000',
					'background': '#ffcccc',
					'background-image': 'url(../_images/popup/promo/countryPromo.png)',
					'background-repeat': 'no-repeat',
				    'background-position': '15px 0px',
				    'background-size': 'contain',
				});
				ban=false;
		}
		/*if($("#direccion").val()=="" || vacioReg.test($("#direccion").val())){
				$("#direccion").attr("placeholder", "Type address");
				$("#direccion").css({
					'color': '#a60000',
					'background': '#ffcccc',
					'background-image': 'url(../_images/popup/promo/cityPromo.png)',
					'background-repeat': 'no-repeat',
				    'background-position': '15px 0px',
				    'background-size': 'contain',
				});
				ban=false;
		}*/
		if($("#ciudad").val()=="" || vacioReg.test($("#ciudad").val())){
				$("#ciudad").attr("placeholder", "Type city");
				$("#ciudad").css({
					'color': '#a60000',
					'background': '#ffcccc',
					'background-image': 'url(../_images/popup/promo/cityPromo.png)',
					'background-repeat': 'no-repeat',
				    'background-position': '15px 0px',
				    'background-size': 'contain',
				});
				ban=false;
		}
		if($("#comentarios").val()=="" || vacioReg.test($("#comentarios").val())){
				$("#comentarios").attr("placeholder", "Type comments");
				$("#comentarios").css({
					'color': '#a60000',
					'background': '#ffcccc',
					'background-image': 'url(../_images/popup/promo/commentPromo.png)',
					'background-repeat': 'no-repeat',
				    'background-position': '12px -3px',
				    'background-size': '40px',
				});
				ban=false;
		}
		if (ban) {
			switch(origen) {
			    case "banner":
			        boton = 3;
			        break;
			    case "popup":
			        boton = 8;
			        break;
			    default:
			        boton = 8;
			}
			$.ajax({
				url:"../../_assets/_controllers/promoPop.php",
				type:"POST",
				data: { reservara : boton },
				dataType:"json",
				success: function(data) {
					if(data==="ok") {
						var respuesta = $.post("../../_assets/_controllers/envioFormPop.php", {
							nombre:$("#nombre").val(),
							email:$("#email").val(),
							telefono:$("#telefono").val(),
							pais:$("#pais").val(),
							direccion:$("#direccion").val(),
							ciudad:$("#ciudad").val(),
							comentarios:$("#comentarios").val()
						});
						respuesta.done(function(data2){
							if(data2==="ok") {
								window.location="../../_assets/_popup/graciasPromo.php?origen="+origen;
								/*$("#idEnvio").css("display","block");
								$("#idEnvio").addClass("accep");
								$("#idEnvio").html(idioma.formulario.mensaje);
								
								//$.fancybox.close( true);	
								$(".input, .inputFecha, .inputTextA").prop("value","");*/
							}
							/*else {
								$("#idEnvio").css("display","block");
								$("#idEnvio").removeClass("accep");
								$("#idEnvio").addClass("error");
								$("#idEnvio").html(idioma.formulario.mensajeerror);
							}*/
						});
					}	
				}
			});
		}
	});
});