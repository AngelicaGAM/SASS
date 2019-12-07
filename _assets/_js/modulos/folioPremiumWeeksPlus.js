$(document).ready(function(e)
{
	
	$("#alertFolio").hide();

	$(document).on("click","#enviarEl",function(e)
	{
		
		var folio=$("#folio").prop("value");
		var id = $("#idSemana").prop("value");
		var counter = $("#counter").prop("value");
		var processDataServiceType = $("#processDataServiceType").prop("value");

		if(folio!="")
		{

			//genero correo 
			$.ajax(
			{
				url:"_assets/_controllers/generaNotificacionSPPremiumWeeksPlus.php",
				type:"POST",
				data:{
					semanaF:id,
					folio:folio,
					processDataServiceType:processDataServiceType
				},
				success:function(data)
				{
					console.log(data);
					var result = JSON.parse(data);
					// var resultado = $.parseJSON(dat);
					// console.log(result.status);
					// var data = dat.split("_");
					// console.log(data);

					if(result.status=="ok")
					{
						$(".elemnto").css("padding-top","50px");
						$(".elemnto").css("height","310px");
						$(".conteF").css({width:"100%", textAlign:"center", color:"#003d4c"});
						$(".conteF").html('<span class="aceptado">¡Congratulations! <br> Your reservation has been processed successfully. You will receive an email with the confirmation number shortly.</span>');


						$(".folio-aplicado-"+counter, $(parent.document)).val(folio);

						$("#form_"+counter, $(parent.document)).submit();



					}

					// if(result.status=="error")
					// {
					// 	$("#alertFolio").show();
					// 	$("#folio").prop('value', '');
					// 	$("#alertFolio").html('Please verify your folio');
					// 	$("#folio").addClass('warning2');
					// }


					// else if (data[0] == "okc")
					// {
					// 	if(data[1]!=0)
					// 	{

					// 		window.parent.$("#certificate_"+id).prop('checked' , false);
					// 		window.parent.$("form#"+id).append('<input type="hidden" name="gm-folioPW" class="dele" value=" '+data[1]+"__"+folio+"__"+id+' "/>');
					// 		window.parent.$("form#"+id+" span.boton").submit();
					// 		window.parent.$("form#"+id+" input.dele[type='hidden']").remove().delay(3000);
					// 		window.parent.$.fancybox.close();

					// 	}
					// 	else
					// 	{

					// 		console.error("No hay cuota: "+data[1]);
					// 		$(".elemnto").css("padding-top","50px");
					// 		$(".elemnto").css("height","310px");
					// 		$(".conteF").css({width:"100%", textAlign:"center", color:"#003d4c"});
					// 		$(".conteF").html('<span class="aceptado">¡Felicidades! <br> Su reservación se ha procesado con éxito. En breve recibirá un correo electrónico con el número de confirmación.</span>');

					// 	}
					// }

					// else if(data[0]=="")
					if(result.status=="")
					{
						$("#alertFolio").show();
						$("#folio").prop('value', '');
						$("#alertFolio").html('The folio you entered is incorrect. Please check and try again.');
						$("#folio").addClass('warning2');
					}
					// else if(data[0]=="checkin")
					if(result.status=="checkin")
					{
						$("#alertFolio").show();
						$("#folio").prop('value', '');
						$("#alertFolio").html('The validity of this certificate is not within the dates of the chosen lodging.');
						$("#folio").addClass('warning2');
					}
					// else if(data[0]=="nouso")
					if(result.status=="nouso")
					{
						$.ajax(
							{
								url:"_assets/_controllers/fechafolio.php",
								type:"POST",
								data:{
									folio:folio
								},
								success:function(dato)
								{
									fecha=dato;
									$("#alertFolio").show();
									$("#folio").prop('value', '');
									$("#alertFolio").html('This certificate is not yet in period of use. It can be applied from:'+fecha);
									$("#folio").addClass('warning2');
								}
							});

					}
					// else if(data[0]=="nofinal")
					if(result.status=="nofinal")
					{
						$("#alertFolio").show();
						$("#folio").prop('value', '');
						$("#alertFolio").html('This certificate has expired. Please enter a valid certificate.');
						$("#folio").addClass('warning2');
					}
					// else if(data[0] == "comprada")
					// if(result.status=="comprada")
					// {
					// 	$(".parrafopop").html('<b>DISPONIBILIDAD AGOTADA</b>');
					// 	$(".parrafopop").css({ width: "100%", padding: "3% 0" });
					// 	$(".elemnto").css("padding-top", "50px");
					// 	$(".elemnto").css("height", "310px");
					// 	$(".conteF").css({ width: "100%", textAlign: "center", color: "#003d4c" });
					// 	$(".conteF").html('<span class="aceptado">Estimado socio, <br> Lamentamos informarle que esta semana ha sido adquirida hace unos momentos por otro socio. Le pedimos atentamente se comunique con nosotros para poder brindarle toda la variedad de opciones disponibles para que usted disfrute de los beneficios de Grupo Experiencias. <br> De antemano le ofrecemos una disculpa por las molestias ocasionadas. <br> <b>MX 01 800 845 03 46 | USA 1 800 935 2365</b></span>');
					// }
				}
			});
		}
		else
		{
			$("#alertFolio").show();
			$("#folio").prop('value', '');
			$("#alertFolio").html('Enter Certificate Folio');
			$("#folio").addClass('warning2');
		}

		setTimeout(function() {$("#alertFolio").hide();},5000);
			
	});

});