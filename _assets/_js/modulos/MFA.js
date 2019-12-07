$( window ).load(function() {
	console.log(localStorage.getItem("MFAOK"));
	if(localStorage.getItem("MFAOK")!=1){
		window.location.assign( pathname +'/home.php');
	}

	if($("#MFALISTA").val()!="MFAOK" &&  $("#MFACONTRATO").val()!=""){

		console.log($("#MFALISTA").val());
		console.log($("#MFACONTRATO").val());
			window.location.assign( pathname +'/home.php');
	}
	//$("#cintilloMFA").css("display","none");
});
$(document).ready(function(e) {
		var calFecha= new Date();
	var mostrar = 10;
	var hoy = new Date(calFecha.getFullYear(),calFecha.getMonth(),calFecha.getDate());
		
		$('.error_messages').each(function(){
			$(this).parent().after($(this));
		});
		$("#fecha")
			.datepicker(
					{
						minDate : 2,
						changeMonth : true,
						numberOfMonths : 1,
						dateFormat : 'dd-mm-yy',
					
	});
$('#hora').clockpicker({
    placement: 'top',
    align: 'left',
    donetext: 'Aceptar'
});


});

var resta = 300;
$(document).on("click", "#enviarDatos", function () {
		var ban=true;
		let listaErrores = "";
		var loginMFA = $("#loginMFA").val();
		console.log(loginMFA);
		if($("#telefono").val()=="" || $("#hora").val()=="" || $("#fecha").val()==""){
			ban=false;
			listaErrores += 'Complete the fields marked' + "<br/>";
		}
		if(ban){
			let listaErrores = "";

			var respuesta = $.post(pathname+"/_assets/_controllers/datosMFA.php",{
				fecha:$("#fecha").val(),
				hora:$("#hora").val(),
				telefono:$("#telefono").val(),

				
			});	
			respuesta.done(function(data){
				if(data=="ok"){
					listaErrores += 'Se enviaron los datos con exito' + "<br/>";
					console.log("si");
					$("#error").addClass("bueno");
				
					//limpiaform("frmindex");	
				//	localStorage.setItem("completadoformulario", "si");
					setTimeout(function (){
						if (loginMFA == 2) {
							$.ajax({
								data: { action: 'logout' },
								type: 'POST',
								dataType: 'JSON',
								url: pathname + "/_assets/_controllers/login/SessionController.php",
								success: function(response) {
									if (response.logout) {
										agencia = $("#out").attr("name");
										if (agencia == "IAC110720126MH") {
											window.location.assign('https://www.infiniteallianceclub.com');
										} else {
											window.location.assign('https://www.beyond-experience.com');
										}
										localStorage.setItem("promoHome", 0);
									} else {
										console.log('Error. Logout failed.');
									}
								}
							});
						}else{
							window.location.href = pathname+"/home.php";
						}
					},3000);
				}else{
					console.log("no");
				//	localStorage.setItem("completadoformulario", "no");
				//	$("#alertbad").show();
				//	$("#alertbad").html("Hubo un error al guardar sus datos comuniquese a su concierge.");
				$("#error").removeClass("bueno");
				listaErrores += 'Hubo un problema al enviar sus datos' + "<br/>";
				}
				$("#error").show();
			$("#error").html(listaErrores);
			setTimeout(function() {$("#error").hide();},5000);

			$('html,body').animate({
				scrollTop: $("#error").offset().top - resta
			}, 500);
			});

		}else{
			$("#error").removeClass("bueno");
								$("#error").show();
			$("#error").html(listaErrores);
			setTimeout(function() {$("#error").hide();},5000);

			$('html,body').animate({
				scrollTop: $("#error").offset().top - resta
			}, 500);
	}

});

