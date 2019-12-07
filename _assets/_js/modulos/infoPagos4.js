// JavaScript Document

// template functions

$(document).ready(



 

	function(){
		
	$("#bontonReservacionPago").trigger("click");
	$("input[type=checkbox]").uniform();
	$('.tooltipBotton').tooltipster();
		
		
		
	
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
				 url:"../_assets/_controllers/getLang.php",
				 data:{ page: "infoPago"},
				 type:"POST",
				 dataType:"json",
				 async:false,
				 success: function(data){
				
						idioma =eval(data);
						//return idi;
				 }
			});
						
	//var ban=true;
	var timeoutReference;
	
	$("#verifica").hide();
	$("#frmVuelo").hide();
	$('#vuelotext').hide();
	$('#divErrores').hide();
	$('.divMostrar').hide();
	$('#loading').hide();
	
	
	//$("#xmlCreadoVuelos").hide();
	
	//$('#bontonReservacionPago').('click');
	
	
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	

	
	/////////////////////////////////////////////////////////////////////////
	// oculta los tooltips de los inputs
	$(document).on("focus","input",function(){
		
		if( $(this).prop("id")!="monto"){
			$(this).removeClass('error');
			$(this).prop('value','');
		}
		
		if( $(this).prop("id")=="seguridad")
		{$(this).prop("type","password");}
		
		$(".mensaje").hide();
	});	
	
	///////////////////////////////////////////////////////////////////////
	// Rellenar automaticamente el estado cuando solo es estados unidos y mexico
	$("#paisT").change (function(){
		
		$.ajax({
					 url:"/_assets/_controllers/getEstados.php",
					 //dataType:"html",
					 type:"POST",
					 data:{
								pais:$("#paisT").val(),
								
								
						  }	
					}).done(function(data){
						$("#estadoT").html(data);
			});
		
	});
	
	//////////////////////////////////////////////////////////////////////////
	// Quitar la clase de error para el combo de pais
	$(document).on("change","#paisT,#tipo,#estadoT,#mes,#ano",function(){
		$(this).removeClass("error");
		$(".mensaje").hide();
		
	});
	
	////////////////////////////////////////////////////////////////////////////
	// redireccionamiento al resumencarrito
	
	$(document).on("click","#rebuscar",function(){
		$("#frmPago").hide();
		$('#loading').show();
	});	
	
	function validateCreaditCard(CreditCardNo){
		
		var IsValidlength      = "";
		var CreditCardNoLength = CreditCardNo.length;
		var cmbTarjeta         = $("#tipo").val();
		var flag               = 0;
		
		switch(cmbTarjeta) {
		   // Visa numbers must be 16 or 13 characters long.
		   case "visa":
			 IsValidlength = (CreditCardNoLength == 16 || CreditCardNoLength == 13);
			 ErrorMessage = "Invalid credit card number. Visa credit card numbers must be 16 or 13 characters long.";
			 break;
        
		   // MasterCard numbers must be 16 characters long.
		   case "mastercard":
			 IsValidlength = (CreditCardNoLength == 16);
			 ErrorMessage = "Invalid credit card number. Masterdcard credit card numbers must be 16 characters long.";
			 break;

		   // Amex numbers must be 15 characters long.
		   case "amex":
			 IsValidlength = (CreditCardNoLength == 15);
			 ErrorMessage = "Invalid credit card number. Amex credit card numbers must be 15 characters long.";
			 break;
        
		   default:
			 IsValidlength = (CreditCardNoLength == 16);
			 ErrorMessage = "Invalid credit card number. The numbers must be 16 characters long.";						
        } // end Switch.
 
        if(!IsValidlength) {
           alert(ErrorMessage);
	       flag = 1;	
        }
   
     return flag;
   }


function ValidateCreditCardNoPrefix(CreditCardNo) {

 var IsValidPrefix = false;
 var PrefixRegExp = "";
 var ErrorMessage = "";   
 var CreditCardType = $("#tipo").val();
 var flag               = 0;
    
	 switch(CreditCardType) {
	 
	   // Visa numbers must start with 4.
	   case "visa":
	   PrefixRegExp = /^4/;
	   ErrorMessage = "Visa card numbers must start with 4";
	   break;
			
	   // MasterCard numbers must start with 51|52|53|54|55.           
	   case "mastercard":
	   PrefixRegExp = /^5[1-5]/;
	   ErrorMessage = "Masterdcard card numbers must start with 51, 52, 53, 54 or 55";
	   break;
	
	   // Amex numbers must start with 34|35|36|37.
	   case "amex":
	   PrefixRegExp = /^3(4|7)/;
	   ErrorMessage = "Amex card numbers must start with 34, 35, 36, or 37";
	   break;
	   
	  /* case Discover:
	   PrefixRegExp = /^6/;
	   ErrorMessage = "Discover Card numbers must start with 6";
	   break;  */
			
	 } //END Switch.
 
	 IsValidPrefix = PrefixRegExp.test(CreditCardNo);
		
	 if (!IsValidPrefix) {
	   alert(ErrorMessage);
	   flag=1;
	 }
    
 return flag;
 
}
	
	
	$("#opCash").hide();
	///////////////////////////////////////////////////////////////////////////
	// funcionamiento para el check cash principal
	$("#cashcheck").on("click",function()
	{
		
		if( $(this).is(":checked" ) )
		{
			$(this).prop("value",1);
			$.uniform.update(this);
			var $saldoCashVal=$("#saldoCashValida").prop("value");
			var $totalPagarValida= $("#totalPagarValida").prop("value");

			$("#opCash").show();
			//alert("vale =>"+$("#cashcheck").val()+"  saldoCashVal=>"+$saldoCashVal+" totalPagarValida=>"+$totalPagarValida);
			if($saldoCashVal>=$totalPagarValida)
			{
				$("#cashcheck2").prop("checked",true);
				$("#cashcheck2").prop("value",1);
				$.uniform.update("#cashcheck2");
				$("#tipo").prop("disabled",true);
				$("#numero").prop("disabled",true);
				$("#seguridad").prop("disabled",true);
				$("#mes").prop("disabled",true);
				$("#ano").prop("disabled",true);
				
				$("#tipo").addClass("desabilita");
				$("#numero").addClass("desabilita");
				$("#seguridad").addClass("desabilita");
				$("#mes").addClass("desabilita");
				$("#ano").addClass("desabilita");
				

			}
			else
			{
				$("#cashcheck2").prop("checked",false);
				$("#cashcheck2").prop("value",0);
				$.uniform.update("#cashcheck2");
				$("#ek").hide();
				$("#cashTotal").show();

				

				$("#te").show();
				
			}
			
			
			//$("#cashTotal").show();
		
		} 
		else
		{
			$(this).prop("value",0);
			$.uniform.update(this);
			
			$("#opCash").hide();
			
			$("#cashcheck2").prop("checked",false);
			$("#cashcheck2").prop("value",0);
			$.uniform.update("#cashcheck2");
			
			$("#tipo").prop("disabled",false);
			$("#numero").prop("disabled",false);
			$("#seguridad").prop("disabled",false);
			$("#mes").prop("disabled",false);
			$("#ano").prop("disabled",false);
			
			$("#tipo").removeClass("desabilita");
			$("#numero").removeClass("desabilita");
			$("#seguridad").removeClass("desabilita");
			$("#mes").removeClass("desabilita");
			$("#ano").removeClass("desabilita");
			
			//$("#cashTotal").hide();
			//$("#cashTotal").prop("value","");
		}
		
	});
	
	
	///////////////////////////////////////////////////////////////////////////
	// funcionamiento para el check cash secundario
	$("#cashcheck2").on("click",function()
	{
		
		if( $(this).is(":checked" ) )
		{
			$(this).prop("value",1);
			$.uniform.update(this);
			
			$("#cashTotal").hide();
			$("#cashTotal").prop("value","");
			
			$("#tipo").prop("disabled",true);
			$("#numero").prop("disabled",true);
			$("#seguridad").prop("disabled",true);
			$("#mes").prop("disabled",true);
			$("#ano").prop("disabled",true);
			
			$("#tipo").addClass("desabilita");
			$("#numero").addClass("desabilita");
			$("#seguridad").addClass("desabilita");
			$("#mes").addClass("desabilita");
			$("#ano").addClass("desabilita");
		
		} 
		else
		{
			$(this).prop("value",0);
			$.uniform.update(this);
			
			$("#cashTotal").show();
			
			$("#tipo").prop("disabled",false);
			$("#numero").prop("disabled",false);
			$("#seguridad").prop("disabled",false);
			$("#mes").prop("disabled",false);
			$("#ano").prop("disabled",false);
			
			$("#tipo").removeClass("desabilita");
			$("#numero").removeClass("desabilita");
			$("#seguridad").removeClass("desabilita");
			$("#mes").removeClass("desabilita");
			$("#ano").removeClass("desabilita");
			
			
			
		}
		
	});
	
	
	//////////////////////////////////////////////////////////////////////////
	//	boton para activar
	//$(document).on("click","#bontonReservacionPago, #reintentar",function(){
		$("#bontonReservacionPago, #reintentar").click(function(){
		
		var resulPrefix = 0;
		var ban        = true;
		var numeroCard = $("#numero").val();
		
		////////////////////////////////////////
		// Datos personales
		

		
		/*if( ($("#nombreT2").val()=="") || (/^\s+$/.test($("#nombreT2").val()))  )
		{
			
			$("#nombreT2").addClass('error');
			//$("#nombre").prop("value","Ingrese su nombre completo");
			$("#nombre").prop("value","Campo requerido");
			ban=false;
		}*/
		
		//COMENTADO PARA PRUEBAS DEW TRAVELFUSION
		// ---------------------------------------------------------------------------
		if( ($("#nombreT").val()=="") || (/^\s+$/.test($("#nombreT").val()))  )
		{
			$("#nombreT").addClass("error");
			$("#nombreT").prop("value",idioma.errorInput);
			ban=false;
		}
		
		
		if( ($("#apellidosT").val()=="") || (/^\s+$/.test($("#apellidosT").val()))  )
		{
			
			$("#apellidosT").addClass('error');
			$("#apellidosT").prop("value",idioma.errorInput);
			ban=false;
		}
		
		
		
		
		if( $("#paisT").val()==0   )
		{
			$("#paisT").addClass('error');
			$("#paisT").prop("value",idioma.errorInput);
			ban=false;
		}
		
		if( $("#estadoT").val()==0   )
		{
			$("#estadoT").addClass('error');
			$("#estadoT").prop("value",idioma.errorInput);
			ban=false;
		}
		
		if( ($("#ciudadT").val()=="") || (/^\s+$/.test($("#ciudadT").val()))  )
		{
			$("#ciudadT").addClass('error');
			$("#ciudadT").prop("value",idioma.errorInput);
			ban=false;
		}
		
		
		if( ($("#direccionT").val()=="") || (/^\s+$/.test($("#direccionT").val()))  )
		{
			$("#direccionT").addClass('error');
			$("#direccionT").prop("value",idioma.errorInput);
			ban=false;
		}
		
		
		if( ($("#codigoT").val()=="") || (/^\s+$/.test($("#codigoT").val())) || (isNaN($("#codigoT").val())) || ($("#codigoT").val()==idioma.errorInput)  )
		{
			$("#codigoT").addClass('error');
			$("#codigoT").prop("value",idioma.errorInput);
			ban=false;
		}
		
		////////////////////////////////////////////////////7
		// informacion de tarjeta de credito
		
		
		
		//validaciones si esta seleccionado el checkbox de pago con cash
		if( $("#cashcheck").is(":checked" ))
		{
			
			if( $("#cashcheck2").is(":checked" )==false)
			{
				
				
				if( ($("#cashTotal").val()=="") || (/^\s+$/.test($("#cashTotal").val())) || (isNaN($("#cashTotal").val())) || ($("#cashTotal").val()==idioma.errorInput) || ( parseInt($("#cashTotal").val())>=parseInt( $("#monto").val()) ) || (parseInt($("#cashTotal").val())<=0) )
				{
					alert(idioma.errorInputCash)
					$("#cashTotal").addClass('error');
					$("#cashTotal").prop("value","");
					ban=false;
				}
				
				if( $("#tipo").val()==0   )
				{
					$("#tipo").addClass('error');
					$("#tipo").prop("value",idioma.errorInput);
					ban=false;
				}
				
				
				if( ($("#numero").val()=="") || (/^\s+$/.test($("#numero").val())) || isNaN($("#numero").val())  )
				{
					$("#numero").addClass("error");
					$("#numero").prop("value",idioma.errorInput);
					ban=false;
				}
				
				
				if( $("#mes").val()==0   )
				{
					$("#mes").addClass('error');
					$("#mes").prop("value",idioma.errorInput);
					ban=false;
				}
				
				
				if( $("#ano").val()==0   )
				{
					$("#ano").addClass('error');
					$("#ano").prop("value",idioma.errorInput);
					ban=false;
				}
				
				
				if( ($("#seguridad").val()=="") || (/^\s+$/.test($("#seguridad").val())) || isNaN($("#seguridad").val())  )
				{
					$("#seguridad").addClass("error");
					$("#seguridad").prop("type","text");
					$("#seguridad").prop("value",idioma.errorInput);
					ban=false;
				} 
				
				// 1-abril-2015 
				// Valida tarjetas de credito
				// ------------------------------
				if ($.trim(numeroCard)!="") {
					 
				   resulPrefix = ValidateCreditCardNoPrefix(numeroCard);
				   if (resulPrefix == 1) {
					   ban=false;
				   }		   
					 
				   var resultado =  validateCreaditCard(numeroCard);
				   if (resultado == 1 && resulPrefix == 0) {
					   ban=false;
				   }
				   
				 }
				 //Termina valida Tarjeta
				 // --------------------------------
				
				
				
			}
			
		
		}
		
		else
		{
		
			if( $("#tipo").val()==0   )
			{
				$("#tipo").addClass('error');
				$("#tipo").prop("value",idioma.errorInput);
				ban=false;
			}
			
			
			if( ($("#numero").val()=="") || (/^\s+$/.test($("#numero").val())) || isNaN($("#numero").val())  )
			{
				$("#numero").addClass("error");
				$("#numero").prop("value",idioma.errorInput);
				ban=false;
			}
			
			
			if( $("#mes").val()==0   )
			{
				$("#mes").addClass('error');
				$("#mes").prop("value",idioma.errorInput);
				ban=false;
			}
			
			
			if( $("#ano").val()==0   )
			{
				$("#ano").addClass('error');
				$("#ano").prop("value",idioma.errorInput);
				ban=false;
			}
			
			
			if( ($("#seguridad").val()=="") || (/^\s+$/.test($("#seguridad").val())) || isNaN($("#seguridad").val())  )
			{
				$("#seguridad").addClass("error");
				$("#seguridad").prop("type","text");
				$("#seguridad").prop("value",idioma.errorInput);
				ban=false;
			} 
			
			// 1-abril-2015 
			// Valida tarjetas de credito
			// ------------------------------
			if ($.trim(numeroCard)!="") {
				 
			   resulPrefix = ValidateCreditCardNoPrefix(numeroCard);
			   if (resulPrefix == 1) {
				   ban=false;
			   }		   
				 
			   var resultado =  validateCreaditCard(numeroCard);
			   if (resultado == 1 && resulPrefix == 0) {
				   ban=false;
			   }
			   
			 }
			 //Termina valida Tarjeta
			 // --------------------------------
		}
		
	
		
		if(ban) {
			
			realizaPago();
			/*
			////////////////////////////////////////////////////////////
			// verifico la disponibilidad de hotelds y vuelos
			
			var hasChildren = $("#xmlCreadoHoteles").children('hotelInformacion').length > 0;
			
			if( (hasChildren) )
			{
			
				$.ajax({
						 url:"/_assets/_controllers/validacionXmlPagos.php",
						 //dataType:"html",
						 type:"POST",
						 data:{
									xmlHoteles:$("#xmlCreadoHoteles").val()
							  }	
						}).done(function(data){
							
								///////////////////////////////////////////
								// si el valor de la cadena es 1 disparo le proceso del pago
								// si el valor es diferente a uno es que hay un erro en la disponibilida de hoteles o vuelos y lo regreso al
								// checkout
								var cadena=data.split(",.-");
								
								if(cadena[2]==1)
								{	realizaPago();	}
								else
								{ 
								window.location = "checkout.php";
								}
							
							
				});
			}
			else
			{realizaPago();}*/
			
		}
		else
		{}
		
	});
	
	/*
	$("#cancelarpagotest").click(function(){
		
		$.ajax({
					 url:"/_assets/_controllers/cancelacionPagosXml.php",
					 //dataType:"html",
					 type:"POST",
					 data:{
								referencia:$("#referencia").val(),
								monto:$("#monto").val(),
								comentarios:$("#comentarios").val(),
						  }	
					}).done(function(data){
						
							///////////////////////////////////////////
							// si el valor de la cadena es 1 disparo le proceso del pago
							// si el valor es diferente a uno es que hay un erro en la disponibilida de hoteles o vuelos y lo regreso al
							// checkout
							var cadena=data.split(",.-");
							
							if(cadena[2]==1)
							{	realizaPago();	}
							else
							{
								 //window.location = "checkout.php";
							}
						
						
			});
	
	});*/
	
	function realizaPago()
	{
		var auxTF="";
		
		$(".mensaje").html("");
		$(".mensaje").hide();
		
		$("#bontonReservacionPago").hide();
		$("#divErrores").hide();
		$('.divMostrar').hide();
		
		
		var cashCheck;
		var cashCheck2;
		
		
		if($("#cashcheck").is(":checked"))
		{cashCheck=1;}
		else
		{cashCheck=0;}
		
		if($("#cashcheck2").is(":checked"))
		{cashCheck2=1;}
		else
		{cashCheck2=0;}
	
		
		$('body').block({ 
			message: '<img src="../_assets/_images/template/loading.gif" border="0" width="154" height="175"><br><br><p>'+idioma.mensajito+'</p><br>', 
			css: {
					 width: '25%',
					 height: 'auto',
					 border: '1px solid rgba(150,150,150,1.00)',
					 'text-align': 'center'
				 } 
		}); 
		
		////////////////////////////////////////////////////////
		//paso a hacer el pago
		//alert($("#xmlCreadoVuelos").val());
		$.ajax({
				url:"../_assets/_controllers/pagoReservacion.php",
				//dataType:"html",
			  type:"POST",
					 data:{
									nombre:$("#nombreT").val(),
									nombre2:$("#nombreT2").val(),
									apellidos:$("#apellidosT").val(),
									direccion:$("#direccionT").val(),
													
									pais:$("#paisT").val(),
									estado:$("#estadoT").val(),
									ciudad:$("#ciudadT").val(),
													
									zip:$("#codigoT").val(),
									tipo:$("#tipo").val(),
													
									numero:$("#numero").val(),
									mes:$("#mes").val(),
									ano:$("#ano").val(),
									codigo:$("#seguridad").val(),
									//precio:$("#monto").val(),
									
									comentarios:$("#comentariosT").val(),
									xmlCreadoHoteles:$("#xmlCreadoHoteles").val(),
									xmlCreadoTransfer:$("#xmlCreadoTransfer").val(),
									xmlCreadoVuelos:$("#xmlCreadoVuelos").val(),
									xmlCreadoTours:$("#xmlCreadoTours").val(),
									xmlCreadoToursMYS:$("#xmlCreadoToursMYS").val(),
									vueloTexto:$('#vuelotext').val(),
									xmlCreadoTempMGrData:$("#xmlCreadoTempMGrData").val(),
									xmlCreadoToursMYS:$("#xmlCreadoToursMYS").val(),
									xmlCreadoTransfersGMX:$("#xmlCreadoTransfersGMX").val(),
									xmlCreadoComboGMX:$("#xmlCreadoComboGMX").val(),
									xmlCreadoSeamanasPremium:$("#xmlCreadoSeamanasPremium").val(),
						 			 xmlCreadoInventarioRegina:$("#xmlCreadoInventarioRegina").val(),
						 
									xmlCreadoResortWeeks:$("#xmlCreadoResortWeeks").val(),
									tipoPago:$("#tipoPago").val(),
									xmlCreadoVuelosTF:$("#xmlCreadoVuelosTF").val(),
									xmlCreadoCars:$("#xmlCreadoCars").val(),
									banderacheck:cashCheck,
									cashcheck:cashCheck2,
									cash:$("#cashTotal").val()
													
						  }	
					}).done(function(data){
						
						$('body').unblock(); 
						var aux=data.split(",.-");
						
						
						if(aux[0]=="ok")
						{
							//$("#respuestaPago").prop("value",cad[1]+",.-"+cad[2]);
							$("#rescode").prop("value",aux[1]);
							$("#frmPago").submit();
							$("#bontonReservacionPago").show();
							
						} else {
								
							//$("#mensaje").show();
							//$("#mensaje").html("Lo sentimos, ocurrio un problema con el pago porfavor intente con otra");
							
							
							$("#bontonReservacionPago").show();
							$("#divErrores").show();
							
							if(aux[1]==250)
							{$("#errorHotel").show();}
							
							if(aux[2]==250)
							{$("#errorTour").show();}
							
							if(aux[3]==250)
							{$("#errorVuelo").show();}
							
							if(aux[4]==250)
							{$("#errorTransfer").show();}
							
							if ( $.trim(aux[5])!="" ) {	
														
							   auxTF =aux[5].split("|");
							   if(auxTF[0]==250) {
								 $("#errorVueloTF").show();
								 $("#errorVueloTF").html(auxTF[1]).addClass("mensajeError");
								 $("#bontonReservacionPago").hide();
								 $("#reintentar").hide();
								 
							   }	
							}						
							
							if(aux[1]=="rechazo")
							{$("#errorTarjeta").show();}
							
							if(aux[1]=="proceso")
							{$("#errorProceso").show();}
							
							$('html,body').animate({
								scrollTop: $("#divErrores").offset().top-200 
							}, 2000);
						}
			});

	}
	
});