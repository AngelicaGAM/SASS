$(document).ready(function(e){
	$("#alertFolio").hide();
	$(document).on("click","#enviarEl",function(e){
		
		var folio=$("#folio").prop("value");
		var id = $("#idSemana").prop("value");
		
	/*	$.ajax({
			url:"_assets/_controllers/validaFolioSP.php",
			type:"POST",
			dataType:"html",
			data:{ folio: $folio, semana:$id },
			success:function(data){ 
				var datos  = data.split(".,-");
				*/
				if(folio!=""){
					//genero correo 
					$.ajax({
						url:"_assets/_controllers/generaNotificacionSP.php",
						type:"POST",
						data:{
							semanaF:id,
							folio:folio
						},
						success:function(dat){
							if(dat=="ok")
							{
								$(".elemnto").css("padding-top","50px");
								$(".elemnto").css("height","310px");
								$(".conteF").css({width:"100%", textAlign:"center", color:"#003d4c"});
									//$("#alertFolio").show();
								$(".conteF").html('<span class="aceptado">Congratulations! <br> Your reservation has been processed successfully. You will receive an email with the confirmation number shortly.</span>');
							}else if(dat=="")
							{
								//console.log("novalido");
								$("#folio").prop('value', '');
								$("#alertFolio").show();
								$("#folio").prop('value', '');
								$("#alertFolio").html('The folio you entered is incorrect. Please check and try again.');
								
								$("#folio").addClass('warning2');
							}else if(dat=="checkin")
							{
								//console.log("novalido");
																	$("#alertFolio").show();
																	$("#folio").prop('value', '');
								$("#alertFolio").html('The validity of this certificate is not within the dates of the chosen lodging.');
								$("#folio").addClass('warning2');
							}else if(dat=="nouso")
							{
						$.ajax({
						url:"_assets/_controllers/fechafolio.php",
						type:"POST",
						data:{
							folio:folio
						},
						success:function(dato){
							fecha=dato;
																	$("#alertFolio").show();
																	$("#folio").prop('value', '');
								$("#alertFolio").html('This certificate is not yet in period of use. It can be applied from:'+fecha);

								$("#folio").addClass('warning2');
						}
					});
								//console.log("novalido");

							}else if(dat=="nofinal")
							{
								//console.log("novalido");
																	$("#alertFolio").show();
																	$("#folio").prop('value', '');
								$("#alertFolio").html('This certificate has expired. Please enter a valid certificate.');
								$("#folio").addClass('warning2');
							}

						}
					});
			
				}
				else{
								$("#alertFolio").show();
								$("#folio").prop('value', '');
								$("#alertFolio").html('Enter Certificate Folio');
					$("#folio").addClass('warning2');

				}
setTimeout(function() {$("#alertFolio").hide();},5000);
				/*
			}
		});*/
	});

});