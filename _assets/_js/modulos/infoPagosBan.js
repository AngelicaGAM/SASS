// JavaScript Document

// template functions

$(document).ready(

	function(){
	//$('#bontonReservacionPagoBan').hide();	
	var strResultado = "";
	
	$("#verifica").hide();
	$("#frmVuelo").hide();
	$('#vuelotext').hide();
	$('#divErrores').hide();
	$('.divMostrar').hide();
	$('#loading').hide();

	
	var contactID        = getUrlVars()["codeResponse"];
	var paramRescode     = getUrlVars()["paramRescode"];
	var mensajeTarjeta   = getUrlVars()["codeResponseMsg"]; 
	
	var vpcTransactionNo = getUrlVars()["vpcTransactionNo"];
	var vpcAuthorizeId   = getUrlVars()["vpcAuthorizeId"];
	var vpcCard          = getUrlVars()["vpcCard"];
	var cantidadp        = getUrlVars()["cantidad"];
	
	var recep           = getUrlVars()["vpcReceiptNo"];
	var currencyParam   = "";
	var lenguajeParam   = "";
	
		
	//$("#bontonReservacionPago").trigger("click");
	$("input[type=checkbox]").uniform();
	$('.tooltipBotton').tooltipster();
	
	/*$("#chkMoneda").change(function(){
  
   alert($("input:radio[name=chkMoneda]:checked").val());
});*/

  /*$('.small').click(function() {
 
               var selectedRB = $('input[name=gg]:checked').val();
               alert(selectedRB);
			   
			   if( $("#chkMoneda").is(":checked" ))
		{
			alert("ckedo");
		}
       });*/


		
    function getUrlVars() {

      var vars = [], hash;
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		
      for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
      }
		
      return vars;
    } 	

	
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
	
	
    if (contactID != "" && contactID != undefined ){	
		
		$('body').block({ 
			message: '<img src="../_assets/_images/template/loading.gif" border="0" width="154" height="175"><br><br><p>'+idioma.mensajito+'</p><br>', 
			css: {
					 width: '25%',
					 height: 'auto',
					 border: '1px solid rgba(150,150,150,1.00)',
					 'text-align': 'center'
				 } 
		}); 
		
		
		strResultado = String(contactID);
		
		// Si el resultado del pago fue correcto
		if (strResultado == "0") {
			
			
			
			
		$.ajax({
		  url:"../_assets/_controllers/pagoReservacionFinishBan.php",
				//dataType:"html",
		  type:"POST",
		  data:{
			paramRescode:paramRescode,
			vpcTransactionNo:vpcTransactionNo,
			vpcAuthorizeId:vpcAuthorizeId,
			vpcCard:vpcCard,
			cantidad:cantidadp
		 }	
		
		}).done(function(data){
						
						$('body').unblock(); 
						
						var dato = data;
		

							//$("#respuestaPago").prop("value",cad[1]+",.-"+cad[2]);
							
			$("#parametro1").prop("value",recep);
			$("#parametro2").prop("value",vpcAuthorizeId);

							$("#rescode").prop("value",dato);
							$("#frmPago").submit();
							$("#bontonReservacionPago").show();
							
						
			});			
			
			
			
		} else {
			
			// Si el pago no fue correcto
			// ------------------------------------
			
			
			
		$.ajax({
		  url:"../_assets/_controllers/cancelReservacionBan.php",
				//dataType:"html",
		  type:"POST",
		  data:{
			rescode:paramRescode
		 }	
		
		}).done(function(data){
        });	
			
			
			$("#bontonReservacionPagoBan").hide();
			    
			$("#reintentar").hide();
			$("#divErrores").show();
			$("#errorTarjeta").show();
				
			mensajeTarjeta = mensajeTarjeta.replace("%", " ");
			mensajeTarjeta = mensajeTarjeta.replace("20", " ");
			var mensajeTarjetaF = decodeURI(mensajeTarjeta);
				
			$("#errorTarjeta").html(mensajeTarjetaF).addClass("mensajeError");
				
			$('body').unblock(); 
							
			$('html,body').animate({
				scrollTop: $("#divErrores").offset().top-200 
			}, 2000);
			
			
			
		}
		
		
	}
	
	$("#reintentar").click(function(){
		
			var ban        = true;
		
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
		
				//validaciones si esta seleccionado el checkbox de pago con cash
		if( $("#cashcheck").is(":checked" ))
		{
			
			if( $("#cashcheck2").is(":checked" )==false)
			{
				
				
				if( ($("#cashTotal").val()=="") || (/^\s+$/.test($("#cashTotal").val())) || (isNaN($("#cashTotal").val())) || ($("#cashTotal").val()==idioma.errorInput) || ( parseInt($("#cashTotal").val())>=parseInt( $("#monto").val()) )  )
				{
					alert(idioma.errorInputCash)
					$("#cashTotal").addClass('error');
					$("#cashTotal").prop("value","");
					ban=false;
				}
			}
		}
		
	
					     /*    var rsultadoMoneda = $('input[name=gg]:checked').val();
 							cantidadp           = $("#montoUSD").val();
							
							
							if($("#cashcheck").is(":checked"))
							{
								if($("#cashcheck2").is(":checked") == false) {
									
									var decCash = $("#cashTotal").val();
									decCash     = decCash + "00";
									decCash     = decCash.replace(".", "");
									decCash     = decCash.replace(",", "");
									cantidadp   = (cantidadp - decCash);				
								}
							}
			
							if( rsultadoMoneda == "USD" ) {
								
								currencyParam = "USD";
								lenguajeParam = "en_MX";
								
							} else {
								
								var tcb       = $("#tcb").val();
								cantidadp     = (cantidadp * tcb);
								currencyParam = "MXN";
								lenguajeParam = "es_MX";
							}	
							
							paramRescode  = getUrlVars()["paramRescode"];
							
		
	
	    			$("#rescode").prop("value",paramRescode);
					
					if (ban) {
					
window.location.href = "http://wspayment.gomexico.travel/3Party_Order.aspx?vUrl=1&pMerchTxnRef="+paramRescode+"&pAmount="+cantidadp+"&pCurrency="+currencyParam+"&pLocale="+lenguajeParam;
					}*/

	});

	
	
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
			
			$("#opCash").show();
			
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
	
	
	$("#bontonReservacionPagoBan").click(function(){
		
		var ban        = true;
		
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
		
				//validaciones si esta seleccionado el checkbox de pago con cash
		if( $("#cashcheck").is(":checked" ))
		{
			
			if( $("#cashcheck2").is(":checked" )==false)
			{
				
				
				if( ($("#cashTotal").val()=="") || (/^\s+$/.test($("#cashTotal").val())) || (isNaN($("#cashTotal").val())) || ($("#cashTotal").val()==idioma.errorInput) || ( parseInt($("#cashTotal").val())>=parseInt( $("#monto").val()) )  )
				{
					alert(idioma.errorInputCash)
					$("#cashTotal").addClass('error');
					$("#cashTotal").prop("value","");
					ban=false;
				}
			}
		}
		
		if (ban) {
	    realizaPago();
		}
	});
		
	
	//////////////////////////////////////////////////////////////////////////
	//	boton para activar
	//$(document).on("click","#bontonReservacionPago, #reintentar",function(){
		$("#bontonReservacionPago, #reintentar00").click(function(){
		
		var resulPrefix = 0;
		var ban        = true;
		var numeroCard = $("#numero").val();
		
		////////////////////////////////////////
		// Datos personales
		

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
				
				
				if( ($("#cashTotal").val()=="") || (/^\s+$/.test($("#cashTotal").val())) || (isNaN($("#cashTotal").val())) || ($("#cashTotal").val()==idioma.errorInput) || ( parseInt($("#cashTotal").val())>=parseInt( $("#monto").val()) )  )
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
		
		/*
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
		 */
		
		
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
	
function realizaPago() {
	
	var GcashCheck = 0;
    var auxTF      = "";
		
    $(".mensaje").html("");
    $(".mensaje").hide();
		
	$("#bontonReservacionPago").hide();
	$("#divErrores").hide();
	$('.divMostrar').hide();
	
	if($("#cashcheck").is(":checked"))
	 {cashCheck=1;}
	else
	 {cashCheck=0;}
				
	if($("#cashcheck2").is(":checked"))
		{cashCheck2=1;}
	else
		{cashCheck2=0;}
		
		
		var cashCheck;
		var cashCheck2;
		var contactID  = getUrlVars()["codeResponse"];
		
		$('body').block({ 
					message: '<img src="../_assets/_images/template/loading.gif" border="0" width="154" height="175"><br><br><p>'+idioma.mensajito+'</p><br>', 
					css: {
							 width: '25%',
							 height: 'auto',
							 border: '1px solid rgba(150,150,150,1.00)',
							 'text-align': 'center'
						 } 
		}); 
		

		if (contactID != "" && contactID != undefined ){
	
			
						
			/*var rsultadoMoneda = $('input[name=gg]:checked').val();
 			cantidadp           = $("#montoUSD").val();
							
							
							if($("#cashcheck").is(":checked"))
							{
								if($("#cashcheck2").is(":checked") == false) {
									
									var decCash = $("#cashTotal").val();
									decCash     = decCash + "00";
									decCash     = decCash.replace(".", "");
									decCash     = decCash.replace(",", "");
									cantidadp   = (cantidadp - decCash);				
								}
							}
			
							if( rsultadoMoneda == "USD" ) {
								
								currencyParam = "USD";
								lenguajeParam = "en_MX";
								
							} else {
								
								var tcb       = $("#tcb").val();
								cantidadp     = (cantidadp * tcb);
								currencyParam = "MXN";
								lenguajeParam = "es_MX";
							}							
							

							paramRescode  = getUrlVars()["paramRescode"];
						
							$("#rescode").prop("value",paramRescode);
			
window.location.href = "http://wspayment.gomexico.travel/3Party_Order.aspx?vUrl=1&pMerchTxnRef="+paramRescode+"&pAmount="+cantidadp+"&pCurrency="+currencyParam+"&pLocale="+lenguajeParam ;*/
	
			
		} else {
		


				
				
		
				////////////////////////////////////////////////////////
		//paso a hacer el pago
		//alert($("#xmlCreadoVuelos").val());
		$.ajax({
		  url:"../_assets/_controllers/pagoReservacionBan.php",
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
									tipoPago:$("#tipoPago").val(),
									xmlCreadoVuelosTF:$("#xmlCreadoVuelosTF").val(),
									banderacheck:cashCheck,
									cashcheck:cashCheck2,
									cash:$("#cashTotal").val()
													
						  }	
					}).done(function(data){
						
						$('body').unblock(); 
						var aux=data.split(",.-");
						

						if($.trim(aux[0])=="ok")
						{
							
							
							var cantidad = aux[2];
							// rsultadoMoneda = $("input:radio[name=chkMoneda]:checked").val();
							 
							 //rsultadoMoneda = $("#chkMoneda").attr('value');
							 
							
					         var rsultadoMoneda = $('input[name=gg]:checked').val();
							//$("#respuestaPago").prop("value",cad[1]+",.-"+cad[2]);
							//rsultadoMoneda= $("#chkMoneda").attr('value');&pOrderInfo=333
							//alert(rsultadoMoneda);
 							cantidadp = $("#montoUSD").val();
							
							
							if($("#cashcheck").is(":checked"))
									{
										if($("#cashcheck2").is(":checked") == false)
										{
											var decCash = $("#cashTotal").val();
											decCash = decCash + "00";
											decCash = decCash.replace(".", "");
											decCash = decCash.replace(",", "");
											
											
											
											cantidadp = (cantidadp - decCash);
											
										}
									}
			
							if( rsultadoMoneda == "USD" ) {
								

								//cantidadp = $("#montoUSD").val();
								currencyParam = "USD";
								lenguajeParam = "en_MX";
								
							} else {
								
								var tcb = $("#tcb").val();
								//alert(tcb);
								cantidadp = (cantidadp * tcb);
								//alert(cantidadp);
								//cantidadp = cantidadp.replace(".", "");
								//cantidadp = cantidadp.replace(",", "");

								currencyParam = "MXN";
								lenguajeParam = "es_MX";
							}
							
							
							
							$("#rescode").prop("value",aux[1]);
							
							
window.location.href = "http://wspayment.gomexico.travel/3Party_Order.aspx?vUrl=1&pMerchTxnRef="+aux[1]+"&pAmount="+cantidadp+"&pCurrency="+currencyParam+"&pLocale="+lenguajeParam;

							//$("#frmPago").submit();
							//$("#bontonReservacionPago").show();
							
						} else {
								
							//$("#mensaje").show();
							//$("#mensaje").html("Lo sentimos, ocurrio un problema con el pago porfavor intente con otra");
							
							
							$("#reintentar").hide();
							$("#bontonReservacionPagoBan").hide();
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
	
	//Se genera el rescode
	
	// se guardan los datos en las tablas temporales
	
	// se ejecutan las reservas en travel net
	
	// se hace el pago con el rescode generado
	
	// Si es exitoso se pasa a confirmacion y se copia a las tablas reales
	
	// si falla se queda aqui y debe mandar mensaje notifdicando
	
	//si se intenta de nuevo sera con el mismo rescode
	
	

}
	
	


	
});