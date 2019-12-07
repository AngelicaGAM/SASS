// JavaScript Document

// template functions

$(document).ready(

	function(){
	
	$('#valCasilla').on("click",function(){
		if($('#valCasilla').is(':checked'))
		{
			$("#errorCasilla").hide();
		}
	})

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
				
	// get idioma
	
	var idioma="";
		$.ajax({
				 url:"../_assets/_controllers/getLang.php",
				 data:{ page: "checkout"},
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
	$("#Hoteles").hide();
	$("#xmlCreadoVuelos").hide();
	
	$("#rebuscar").hide();	
									
	
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	

	
	/////////////////////////////////////////////////////////////////////////
	// oculta los tooltips de los inputs
	$(document).on("focus","input",function(){
		
		$(this).removeClass('error');
		$(this).prop('value','');
		
		if( $(this).prop("id")=="pass")
		{$(this).prop("type","password");}
	});	
	
	
	///////////////////////////////////////////////////////////////////////
	// Rellenar automaticamente el estado cuando solo es estados unidos y mexico
	$("#pais").change (function(){
		
		$.ajax({
					 url:"../_assets/_controllers/getEstados.php",
					 //dataType:"html",
					 type:"POST",
					 data:{
								pais:$("#pais").val(),
								
								
						  }	
					}).done(function(data){
						$("#estado").html(data);
			});
		
	});
	
	
	//////////////////////////////////////////////////////////////////////////
	// Quitar la clase de error para el combo de pais
	$(document).on("change","#pais,#tipo,#estado,#mes,#ano,.selectB",function(){
		$(this).removeClass("error");
		
	});
	
	
	
function getAge(dateString, dateVuelo) {
		
  //var now = new Date();
  //var today = new Date(now.getYear(),now.getMonth(),now.getDate());
  
  var dob = new Date(dateString.substring(6,10),
                     dateString.substring(0,2)-1,                   
                     dateString.substring(3,5)                  
                     );
					 
				   
	var today = new Date(dateVuelo.substring(6,10),
						 dateVuelo.substring(0,2)-1,                   
						 dateVuelo.substring(3,5) );
  

  var yearNow = today.getYear();
  var monthNow = today.getMonth();
  var dateNow = today.getDate();



  var yearDob = dob.getYear();
  var monthDob = dob.getMonth();
  var dateDob = dob.getDate();
  var age = {};
  var ageString = "";
  var yearString = "";
  var monthString = "";
  var dayString = "";


  yearAge = yearNow - yearDob;

  if (monthNow >= monthDob)
    var monthAge = monthNow - monthDob;
  else {
    yearAge--;
    var monthAge = 12 + monthNow -monthDob;
  }

  if (dateNow >= dateDob)
    var dateAge = dateNow - dateDob;
  else {
    monthAge--;
    var dateAge = 31 + dateNow - dateDob;

    if (monthAge < 0) {
      monthAge = 11;
      yearAge--;
    }
  }

  age = {
      years: yearAge,
      months: monthAge,
      days: dateAge
      };

  if ( age.years > 1 ) yearString = " year";
  else yearString = " year";
  if ( age.months> 1 ) monthString = " months";
  else monthString = " month";
  if ( age.days > 1 ) dayString = " days";
  else dayString = " day";


  if ( (age.years > 0) && (age.months > 0) && (age.days > 0) )
    ageString = age.years + yearString + ", " + age.months + monthString + ", and " + age.days + dayString + " old.";
  else if ( (age.years == 0) && (age.months == 0) && (age.days > 0) )
    ageString = "Only " + age.days + dayString + " old!";
  else if ( (age.years > 0) && (age.months == 0) && (age.days == 0) )
    ageString = age.years + yearString + " old. Happy Birthday!!";
  else if ( (age.years > 0) && (age.months > 0) && (age.days == 0) )
    ageString = age.years + yearString + " and " + age.months + monthString + " old.";
  else if ( (age.years == 0) && (age.months > 0) && (age.days > 0) )
    ageString = age.months + monthString + " and " + age.days + dayString + " old.";
  else if ( (age.years > 0) && (age.months == 0) && (age.days > 0) )
    ageString = age.years + yearString + " and " + age.days + dayString + " old.";
  else if ( (age.years == 0) && (age.months > 0) && (age.days == 0) )
    ageString = age.months + monthString + " old.";
  else ageString = "Oops! Could not calculate age!";

  return ageString;
}
	
	
		//////////////////////////////////////////////////////////////////////////
	// Quitar la clase de error para el combo de pais
	$(document).on("change",".selectB",function(e){
		
		var fecha     = "";
		var dia ="";
		var mes ="";
		var anio="";
		var dob ="";
		var ft ="";
		var fecha2="";
		var elemento  = $(this).attr("id");
		
		var auxCambio = elemento.split("-");

		var num = auxCambio[0].replace(/[^\d.]/g,'');

	    var elem = auxCambio[0].split(num);
		
		 var fecha1 = $("#fecha1"+auxCambio[2]).val();
		 fecha2 = $("#fecha2"+auxCambio[2]).val();
	
		 if(auxCambio[0].indexOf("cmbDiaNTF")!= -1 || auxCambio[0].indexOf("cmbMesNTF")!= -1 || auxCambio[0].indexOf("cmbAnioNTF")!= -1){
		 ft = fecha1;
		 
		 if( fecha2.length == 10) {
			ft = fecha2;
		 }
		 
		 
				
	    switch(elem[0]) {			
         case "cmbDiaNTF":
		  fecha =$("#cmbDiaNTF"+num + "-" + auxCambio[1] + "-"+ auxCambio[2]).val() + "/" + $("#cmbMesNTF"+num + "-" +auxCambio[1]+ "-"+ auxCambio[2]).val()+"/"+$("#cmbAnioNTF"+num +"-"+ auxCambio[1]+ "-"+ auxCambio[2]).val();
		  dia = $("#cmbDiaNTF"+num + "-" + auxCambio[1] + "-" + auxCambio[2]).val();
		  mes = $("#cmbMesNTF"+num + "-" +auxCambio[1]  + "-" + auxCambio[2]).val();
		  anio =$("#cmbAnioNTF"+num +"-"+ auxCambio[1]  + "-" + auxCambio[2]).val();
		  
		 

          break;
         case "cmbMesNTF":
		  fecha =$("#cmbDiaNTF"+num + "-" + auxCambio[1]+ "-"+ auxCambio[2]).val() + "/" + $("#cmbMesNTF"+num + "-" +auxCambio[1]+ "-"+ auxCambio[2]).val()+"/"+$("#cmbAnioNTF"+num +"-"+ auxCambio[1]+ "-"+ auxCambio[2]).val();	
		  dia = $("#cmbDiaNTF"+ num + "-" + auxCambio[1]+ "-" + auxCambio[2]).val();
		  mes = $("#cmbMesNTF"+ num + "-" +auxCambio[1] + "-" + auxCambio[2]).val();
		  anio =$("#cmbAnioNTF"+ num +"-"+ auxCambio[1] + "-" + auxCambio[2]).val();		    
          break;
	     case "cmbAnioNTF":
		  fecha =$("#cmbDiaNTF"+num + "-" + auxCambio[1]+ "-"+ auxCambio[2]).val() + "/" + $("#cmbMesNTF"+num + "-" +auxCambio[1]+ "-"+ auxCambio[2]).val()+"/"+$("#cmbAnioNTF"+num +"-"+ auxCambio[1]+ "-"+ auxCambio[2]).val();	 
		  dia = $("#cmbDiaNTF"+ num + "-" + auxCambio[1]+ "-" + auxCambio[2]).val();
		  mes = $("#cmbMesNTF"+ num + "-" +auxCambio[1] + "-" + auxCambio[2]).val();
		  anio =$("#cmbAnioNTF"+ num +"-"+ auxCambio[1] + "-" + auxCambio[2]).val();	   
		  break;
        } 
	
				
			var edadReturn ="";	 
			var anioNi="";
			var eNi = "";
			
			
		if (fecha.length == 10) {
			
		
			
			var auxFecha = ft.split("/");
			
			var fechaE1 =  mes + "/" + dia + "/" + anio;
			var fechaE2 = auxFecha[1]+"/"+auxFecha[0]+"/"+auxFecha[2];

			edadReturn = getAge(fechaE1,fechaE2);
			if (edadReturn != "Oops! Could not calculate age!"){
				
			var edadR1= edadReturn.split(",");
			//alert("mucho antes"+edadR1[0]);
			
			
			if (edadR1.length > 0 ){
				
				if(edadR1[0].indexOf("year")!= -1){
					anioNi = edadR1[0].split(" ");
					eNi= anioNi[0];
				} else {
					eNi =0;
				}
			} else {
				eNi =0;
			}
				
			

			} else {
				eNi ="";
			}
			
			//alert("Valor" + eNi);
			
			if (eNi.length == 0) { 
			  alert("The age of the child " + num+ " could not calculate, plese verify it");
			  $("#ninio"+ num + "-" + auxCambio[1]).text(-1);
			} else {
				$("#ninio"+ num + "-" + auxCambio[1]).text(eNi);
			}

			
		}
		
		 }
		
			/*var dob   = new Date("04/29/2014");
    var today = new Date("05/22/2015");
	alert(dob);
    var age = Math.floor((today-dob) / (365.25 * 24 * 60 * 60 * 1000));
    alert(age);*/
		
	});
	

	//////////////////////////////////////////////////////////////////////////
	//	boton para activar
	$(document).on("click","#siguiente",function(){
		
         var ban=true;	
		 
		 //alert($("#precioCheck").val());
		
		// Validacion para vuelos TravelFusion
		var intTotalVuelo = parseInt($("#VuelosTF").val());
		for (var i=1; i<=intTotalVuelo;i++) {
			
		var clave      = $("#clave"+i).val();			
		var ninios     = $("#ninios"+i).val();	
		var adultos    = $("#adultos"+i).val();		
		var currdate   = new Date();
		
		var currentYear  = (new Date).getFullYear();
		var currentMonth = (new Date).getMonth() + 1;		
		var currentDay   = (new Date).getDate();
      
	    if (parseInt(adultos) > 0 ) {
			   
		     var anioAdulto = parseInt(currentYear) - 12;
			   
		     for (var a=1;a<=parseInt(adultos);a++) {				 	
    			//var fechaA = $("#cmbDiaATF"+a+"-"+clave).val() + "/" + $("#cmbMesATF"+a+"-"+clave).val()+ "/"+ ;	
	           
			    if ($("#cmbAnioATF"+a+"-"+clave).val()!="" && $("#cmbAnioATF"+a+"-"+clave).val()!="0" ) {
				   if ( parseInt($("#cmbAnioATF"+a+"-"+clave).val()) >= anioAdulto) {
					  alert("Please, verify the year of birth of the adult " + a + " Flight" + i);
					  ban=false;
				   }
				}
				
		     }
		}	   
	   
			
      if (parseInt(ninios) > 0) {
			  			  
	     for (var n=1;n<=parseInt(ninios);n++) {
			 			 
			 var edadN = $("#ninio"+n+"-"+clave).text();
			 
	
	         if ( edadN == "-1" ) {
				  alert("Please, verify the age of the child " + n + " Flight " + i);
				  ban=false;
			 }
			
		 
		 }
      }			
			
	
	}// End for
	
		
		
			
		////////////////////////////////////////
		// Datos personales
		
		
		if( ($("#nombre").val()=="") || (/^\s+$/.test($("#nombre").val())) || ($("#nombre").val()==idioma.errorInput) )
		{
			
			$("#nombre").addClass('error');
			//$("#nombre").prop("value","Ingrese su nombre completo");
			$("#nombre").prop("value",idioma.errorInput);
			ban=false;
		}
		
		
		if( ($("#apellido").val()=="") || (/^\s+$/.test($("#apellido").val())) || ($("#apellido").val()==idioma.errorInput) )
		{
			
			$("#apellido").addClass('error');
			//$("#apellidos").prop("value","Ingrese sus apellidos");
			$("#apellido").prop("value",idioma.errorInput);
			ban=false;
		}
		
		if( ($("#email").val()=="") || (/^\s+$/.test($("#email").val())) || (!re.test($("#email").val())) || ($("#email").val()==idioma.errorInput)    )
		{
			
			$("#email").addClass('error');
			$("#email").prop("value",idioma.errorInput);
			ban=false;
		}
		
		
		if( ($("#confirmar").val()=="") || (/^\s+$/.test($("#confirmar").val())) || (!re.test($("#confirmar").val())) || ( $("#email").val()!=$("#confirmar").val())        )
		{
			
			$("#confirmar").addClass('error');
			$("#confirmar").prop("value",idioma.errorInput);
			ban=false;
		}
		
		if( ($("#telefono").val()=="") || (/^\s+$/.test($("#telefono").val())) || isNaN($("#telefono").val()) || ($("#telefono").val()==idioma.errorInput)  )
		{
			$("#telefono").addClass('error');
			$("#telefono").prop("value",idioma.errorInputTelefono);
			ban=false;
		}
		
		
		//if( ($("#cel").val()=="") || (/^\s+$/.test($("#cel").val())) || isNaN($("#cel").val())  )
		//{
		//	$("#cel").addClass('error');
		//	$("#cel").prop("value","Campo requerido");
		//	ban=false;
		//}
		
		
		
		if( ($("#direccion").val()=="") || (/^\s+$/.test($("#direccion").val())) || ($("#direccion").val()==idioma.errorInput) )
		{
			
			$("#direccion").addClass('error');
			$("#direccion").prop("value",idioma.errorInput);
			ban=false;
		}
		
		
		if( $("#pais").val()==0   )
		{
			$("#pais").addClass('error');
			$("#pais").prop("value",idioma.errorInput);
			ban=false;
		}
		
		if( $("#estado").val()==0   )
		{
			$("#estado").addClass('error');
			$("#estado").prop("value",idioma.errorInput);
			ban=false;
		}
		
		
		if( ($("#ciudad").val()=="") || (/^\s+$/.test($("#ciudad").val())) || ($("#ciudad").val()==idioma.errorInput) )
		{
			$("#ciudad").addClass('error');
			//$("#ciudad").prop("value","Ingrese la ciudad");
			$("#ciudad").prop("value",idioma.errorInput);
			ban=false;
		}
		
		
		if( ($("#codigo").val()=="") || ($("#codigo").val()==idioma.errorInput) )
		{
			$("#codigo").addClass('error');
			$("#codigo").prop("value",idioma.errorInput);
			ban=false;
		}
		

		/////////////////////////////////////////////////////
		//// INFORMACION DE RESERVA DE CARROS TOURICO

		 if( ($("#Cars").val()!=0) && ($("#Cars").length>0) )
		{
			
			
			
				if( ($("#txtDriver").val()=="") || (/^\s+$/.test($("#txtDriver").val()))  )
				{
					$("#txtDriver").addClass('error');
					$("#txtDriver").prop("value",idioma.errorInput);
					ban=false;
				}
				
				if( ($("#txtDriverApellido").val()=="") || (/^\s+$/.test($("#txtDriverApellido").val()))  )
				{
					$("#txtDriverApellido").addClass('error');
					$("#txtDriverApellido").prop("value",idioma.errorInput);
					ban=false;
				}
				
				
				if( ($("#txtDriverEmail").val()=="") || (/^\s+$/.test($("#txtDriverEmail").val())) || (!re.test($("#txtDriverEmail").val()))    )
				{
					
					$("#txtDriverEmail").addClass('error');
					$("#txtDriverEmail").prop("value",idioma.errorInput);
					ban=false;
				}
				
				
				if( ($("#txtDriverEmailc").val()=="") || (/^\s+$/.test($("#txtDriverEmailc").val())) || (!re.test($("#txtDriverEmailc").val())) || ( $("#txtDriverEmailc").val()!=$("#txtDriverEmail").val())    )
				{
					
					$("#txtDriverEmailc").addClass('error');
					$("#txtDriverEmailc").prop("value",idioma.errorInput);
					ban=false;
				}
				
				if( ($("#txtDriverTelefono").val()=="") || (/^\s+$/.test($("#txtDriverTelefono").val())) || isNaN($("#txtDriverTelefono").val())  )
				{
					$("#txtDriverTelefono").addClass('error');
					$("#txtDriverTelefono").prop("value",idioma.errorInput);
					ban=false;
				}
				
				if( ($("#txtDriverCel").val()=="") || (/^\s+$/.test($("#txtDriverCel").val())) || isNaN($("#txtDriverCel").val())  )
				{
					$("#txtDriverCel").addClass('error');
					$("#txtDriverCel").prop("value",idioma.errorInput);
					ban=false;
				}
				
				if( ($("#txtDriverAge").val()=="") || isNaN($("#txtDriverAge").val())  )
				{
					$("#txtDriverAge").addClass('error');
					$("#txtDriverAge").prop("value",idioma.errorInput);
					ban=false;
				}
			
			
			
		}
	
		////////////////////////////////////////////////////
		// informacion de reserva para los HOTELES
		
		if( ($("#Hoteles").val()!=0) && ($("#Hoteles").length>0) )
		{
				//alert("validaciones de hoteles");				
				$("input[name='N_nombreRH[]']").each(function(){
					if( ($(this).val()=="") || (/^\s+$/.test($(this).val()))  )
					{
						$(this).addClass('error');
						$(this).prop("value",idioma.errorInput);
						ban=false;
					}	       		    
	       		});
				
				$("input[name='N_apellidoRH[]']").each(function(){
					if( ($(this).val()=="") || (/^\s+$/.test($(this).val()))  )
					{
						$(this).addClass('error');
						$(this).prop("value",idioma.errorInput);
						ban=false;
					}					
				});
				
				$("input[name='N_emailRH[]']").each(function(){
					if( ($(this).val()=="") || (/^\s+$/.test($(this).val())) || (!re.test($(this).val()))    )
					{						
						$(this).addClass('error');
						$(this).prop("value",idioma.errorInput);
						ban=false;
					}					
				});
				var ie = 0;
				$("input[name='N_confirmarRH[]']").each(function(){
					if( ($(this).val()=="") || (/^\s+$/.test($(this).val())) || (!re.test($(this).val())) || ( $("input[name='N_emailRH[]']")[ie].value!=$(this).val())    )
					{						
						$(this).addClass('error');
						$(this).prop("value",idioma.errorInput);
						ban=false;
					}
					ie++;					
				});
				
				$("input[name='N_telefonoRH[]']").each(function(){
					if( ($(this).val()=="") || (/^\s+$/.test($(this).val())) || isNaN($(this).val())  )
					{
						$(this).addClass('error');
						$(this).prop("value",idioma.errorInput);
						ban=false;
					}					
				});

				//if( ($("#celRH").val()=="") || (/^\s+$/.test($("#celRH").val())) || isNaN($("#celRH").val())  )
				//{
				//	$("#celRH").addClass('error');
				//	$("#celRH").prop("value","Campo requerido");
				//	ban=false;
				//}
				
				///////////////////////////////////////////////////////////////////////////////////////////////
				// validaciones para los campos de adultos y niños de las habitaciones
				///////////////////////////////////////////////////////////////////////////////////////////////
			
					$(".BanderaHoteles").find('input:text').each(function() {
					
						if( ($(this).val()=="") || (/^\s+$/.test($(this).val()))  )
						{
							$(this).addClass('error');
							$(this).prop("value",idioma.errorInput);
							ban=false;
						}
						
					});
		}

		////////////////////////////////////////////////////
		// informacion de reserva para los HOTELES
		
		if( ($("#vuelos").val()!=0) && ($("#vuelos").length>0) ){
			///////////////////////////////////////////////////////////////////////////////////////////////
			// validaciones para los campos de adultos y niños en vuelos netactica
			///////////////////////////////////////////////////////////////////////////////////////////////
		
			$(".BanderaVuelos").find('input:text').each(function() {
			
				if( ($(this).val()=="") || (/^\s+$/.test($(this).val()))  )
				{
					$(this).addClass('error');
					$(this).prop("value",idioma.errorInput);
					ban=false;
				}
				
			});
		}
		
		
		
		
		////////////////////////////////////////////////////
		// informacion de reserva para los TOURS TRAVELNET
		if( ($("#Tours").val()!=0) && ($("#Tours").length>0) )
		{
				//alert("validaciones de Tours");
			
				if( ($("#txtNombreTitularTour").val()=="") || (/^\s+$/.test($("#txtNombreTitularTour").val()))  )
				{
					$("#txtNombreTitularTour").addClass('error');
					$("#txtNombreTitularTour").prop("value",idioma.errorInput);
					ban=false;
				}
				
				
				
				if( ($("#txtApellidoTitularTour").val()=="") || (/^\s+$/.test($("#txtApellidoTitularTour").val()))  )
				{
					$("#txtApellidoTitularTour").addClass('error');
					$("#txtApellidoTitularTour").prop("value",idioma.errorInput);
					ban=false;
				}
				
				
				if( ($("#txtEmailTour").val()=="") || (/^\s+$/.test($("#txtEmailTour").val())) || (!re.test($("#txtEmailTour").val()))    )
				{
					
					$("#txtEmailTour").addClass('error');
					$("#txtEmailTour").prop("value",idioma.errorInput);
					ban=false;
				}
				
				
				if( ($("#txtEmailTourc").val()=="") || (/^\s+$/.test($("#txtEmailTourc").val())) || (!re.test($("#txtEmailTourc").val())) || ( $("#txtEmailTour").val()!=$("#txtEmailTourc").val())    )
				{
					
					$("#txtEmailTourc").addClass('error');
					$("#txtEmailTourc").prop("value",idioma.errorInput);
					ban=false;
				}
				
				
				if( ($("#txtTelefonoTour").val()=="") || (/^\s+$/.test($("#txtTelefonoTour").val())) || isNaN($("#txtTelefonoTour").val())  )
				{
					$("#txtTelefonoTour").addClass('error');
					$("#txtTelefonoTour").prop("value",idioma.errorInput);
					ban=false;
				}
				
				
				if( ($("#txtHotelTour").val()=="") || (/^\s+$/.test($("#txtHotelTour").val()))  )
				{
					$("#txtHotelTour").addClass('error');
					$("#txtHotelTour").prop("value",idioma.errorInput);
					ban=false;
				}
				
				//if( ($("#txtCelTourc").val()=="") || (/^\s+$/.test($("#txtCelTourc").val())) || isNaN($("#txtCelTourc").val())  )
				//{
				//	$("#txtCelTourc").addClass('error');
				//	$("#txtCelTourc").prop("value","Campo requerido");
				//	ban=false;
				//}
				
				///////////////////////////////////////////////////////////////////////////////////////////////
				// validaciones para los campos de adultos y niños de las habitaciones
				///////////////////////////////////////////////////////////////////////////////////////////////
				
			
					$(".BanderaTours").find('input:text').each(function() {
					
						if( ($(this).val()=="") || (/^\s+$/.test($(this).val())) || ($(this).val()=="Campo requerido")   )
						{
							$(this).addClass('error');
							$(this).prop("value",idioma.errorInput);
							ban=false;
						}
						
					});
				
					
		}
		
		
		
		////////////////////////////////////////////////////
		// informacion de reserva para los TRANSFERS
		if( ($("#Transfers").val()!=0) && ($("#Transfers").length>0) )
		{
				//alert("validaciones de Transfers");
			
				if( ($("#txtNombreTitularTransfer").val()=="") || (/^\s+$/.test($("#txtNombreTitularTransfer").val()))  )
				{
					$("#txtNombreTitularTransfer").addClass('error');
					$("#txtNombreTitularTransfer").prop("value",idioma.errorInput);
					ban=false;
				}
				
				
				
				if( ($("#txtApellidoTitularTransfer").val()=="") || (/^\s+$/.test($("#txtApellidoTitularTransfer").val()))  )
				{
					$("#txtApellidoTitularTransfer").addClass('error');
					$("#txtApellidoTitularTransfer").prop("value",idioma.errorInput);
					ban=false;
				}
				
				
				if( ($("#txtEmailTransfer").val()=="") || (/^\s+$/.test($("#txtEmailTransfer").val())) || (!re.test($("#txtEmailTransfer").val()))    )
				{
					
					$("#txtEmailTransfer").addClass('error');
					$("#txtEmailTransfer").prop("value",idioma.errorInput);
					ban=false;
				}
				
				
				if( ($("#txtEmailTransferc").val()=="") || (/^\s+$/.test($("#txtEmailTransferc").val())) || (!re.test($("#txtEmailTransferc").val())) || ( $("#txtEmailTransfer").val()!=$("#txtEmailTransferc").val())    )
				{
					
					$("#txtEmailTransferc").addClass('error');
					$("#txtEmailTransferc").prop("value",idioma.errorInput);
					ban=false;
				}
				
				
				if( ($("#txtTelefonoTransfer").val()=="") || (/^\s+$/.test($("#txtTelefonoTransfer").val())) || isNaN($("#txtTelefonoTransfer").val())  )
				{
					$("#txtTelefonoTransfer").addClass('error');
					$("#txtTelefonoTransfer").prop("value",idioma.errorInput);
					ban=false;
				}
				
				
				//alert("bandera"+ban);
				
				//if( ($("#txtCelTransferc").val()=="") || (/^\s+$/.test($("#txtCelTransferc").val())) || isNaN($("#txtCelTransferc").val())  )
				//{
				//	$("#txtCelTransferc").addClass('error');
				//	$("#txtCelTransferc").prop("value","Campo requerido");
				//	ban=false;
				//}
				
				///////////////////////////////////////////////////////////////////////////////////////////////
				// validaciones para los campos de adultos y niños de las habitaciones
				///////////////////////////////////////////////////////////////////////////////////////////////
				
				
				$(".BanderaTransfers").find('input:text').each(function() {
						
						if( ($(this).val()=="") || (/^\s+$/.test($(this).val())) || ($(this).val()=="Campo requerido")   )
						{
							$(this).addClass('error');
							$(this).prop("value",idioma.errorInput);
							ban=false;
						}
						
					});
					
					
				
		}
			
		
		
		////////////////////////////////////////////////////
		// informacion de reserva para los VUELOS
		if( ($("#Vuelos").val()!=0) && ($("#Vuelos").length>0) )
		{
				//alert("validaciones de vuelos");
			
				if( ($("#txtNombreTitularVuelo").val()=="") || (/^\s+$/.test($("#txtNombreTitularVuelo").val()))  )
				{
					$("#txtNombreTitularVuelo").addClass('error');
					$("#txtNombreTitularVuelo").prop("value",idioma.errorInput);
					ban=false;
				}
				
				
				
				if( ($("#txtApellidoTitularVuelo").val()=="") || (/^\s+$/.test($("#txtApellidoTitularVuelo").val()))  )
				{
					$("#txtApellidoTitularVuelo").addClass('error');
					$("#txtApellidoTitularVuelo").prop("value",idioma.errorInput);
					ban=false;
				}
				
				
				if( ($("#txtEmailVuelo").val()=="") || (/^\s+$/.test($("#txtEmailVuelo").val())) || (!re.test($("#txtEmailVuelo").val()))    )
				{
					
					$("#txtEmailVuelo").addClass('error');
					$("#txtEmailVuelo").prop("value",idioma.errorInput);
					ban=false;
				}
				
				
				if( ($("#txtEmailVueloc").val()=="") || (/^\s+$/.test($("#txtEmailVueloc").val())) || (!re.test($("#txtEmailVueloc").val())) || ( $("#txtEmailVuelo").val()!=$("#txtEmailVueloc").val())    )
				{
					
					$("#txtEmailVueloc").addClass('error');
					$("#txtEmailVueloc").prop("value",idioma.errorInput);
					ban=false;
				}
				
				
				if( ($("#txtTelefonoVuelo").val()=="") || (/^\s+$/.test($("#txtTelefonoVuelo").val())) || isNaN($("#txtTelefonoVuelo").val())  )
				{
					$("#txtTelefonoVuelo").addClass('error');
					$("#txtTelefonoVuelo").prop("value",idioma.errorInput);
					ban=false;
				}
				
				
				
				//if( ($("#txtCelTransferc").val()=="") || (/^\s+$/.test($("#txtCelTransferc").val())) || isNaN($("#txtCelTransferc").val())  )
				//{
				//	$("#txtCelTransferc").addClass('error');
				//	$("#txtCelTransferc").prop("value","Campo requerido");
				//	ban=false;
				//}
				
				///////////////////////////////////////////////////////////////////////////////////////////////
				// validaciones para los campos de adultos y niños de las habitaciones
				///////////////////////////////////////////////////////////////////////////////////////////////
				
					$(".BanderaVuelos").find('input:text').each(function() {
					
						if( ($(this).val()=="") || (/^\s+$/.test($(this).val())) || ($(this).val()=="Campo requerido")   )
						{
							$(this).addClass('error');
							$(this).prop("value",idioma.errorInput);
							ban=false;
						}
						
					});
					
					
					$(".BanderaVuelos").find('.selectB').each(function() {
					
						if( ($(this).val()==0)     )
						{
							$(this).addClass('error');
							//$(this).prop("value","Campo requerido");
							ban=false;
						}
						
					});
					
					
		}
		
		
		// ------------------------------------------
		// Informacion de vuelos TravelFusion
		// -------------------------------------------------
		$(".BanderaVuelosTF").find('input:text').each(function() {
					
			if( ($(this).val()=="") || (/^\s+$/.test($(this).val())) || ($(this).val()=="Campo requerido")   )
			{
				$(this).addClass('error');
				$(this).prop("value",idioma.errorInput);
				ban=false;
			}
						
		});
		
		$(".BanderaVuelosTF").find('.selectB').each(function() {
					
				if( ($(this).val()==0) )
				{
					$(this).addClass('error');
					//$(this).prop("value","Campo requerido");
					ban=false;
				}
						
		});		
		
		
		//validacion de casilla de verificacion()

		if(!$('#valCasilla').is(':checked') )
		{
			$("#errorCasilla").show();
			ban=false;

		}


			
		//ban=validacionFolio($("#folio").val());
		
		
		if(ban){
			
			//alert("todo ok");
			
		$('body').block({ 
			message: '<img src="../_assets/_images/template/loading.gif" border="0" width="154" height="175"><br><br><p>'+idioma.mensajito+'</p><br>', 
				css: {
							 width: '25%',
							 height: 'auto',
							 border: '1px solid rgba(150,150,150,1.00)',
							 'text-align': 'center'
						 } 
			}); 
				
	//alert($("#xmlCreadoVueloTF").val());
	
	// Modificación: 20 marzo del 2015
	// By valentin.cansino@gomexico.org
	// ya no se validara los servicio de travelnet (vuelos y hoteles) en este punto
	// solo sera los vuelos de TRAVELFUSION
	// -------------------------------------------------
	// if( $("#xmlCreadoHoteles").val()=="" && $("#xmlCreadoVuelos").val()=="" && $("#xmlCreadoVueloTF").val()=="" )
	var preciosActualizadosV = $("#precioCheck").val();
			
	if ( $("#xmlCreadoVueloTF").val()== "" ) {
		
	  $("#formCheckout").submit();
	  $("#siguiente").show();
				
	
	}else {
		
		// Se crea el xml para enviar los datos al XML process de TravelFusion
		// --------------------------------------------------------------------
		var XMLvueloTF = createVueloTFXML();
		var mensajeMostrar="";
		var auxCambio ="";
		var totalcambios="";
		var preciosActualizadosV = $("#precioCheck").val();
		
		//Si el usuario da click con valor en preciosActualizadosV quiere decir
		// que aceptó el cambio de precio, así que ya no ejecutare el ws de Detail y Terms
		
          // alert(XMLvueloTF);
			
			$.ajax({
					url:"../_assets/_controllers/validacionXmlPagos.php",
					//dataType:"xml",
					type:"POST",
					data:{
						xmlHoteles:$("#xmlCreadoHoteles").val(),
						xmlVuelos:$("#xmlCreadoVuelos").val(),
						xmlVuelosTF:XMLvueloTF
					 }	
					}).done(function(data){
						
								var control=true;
								///////////////////////////////////////////
								// si el valor de la cadena es 1 disparo le proceso del pago
								// si el valor es diferente a uno es que hay un erro en la disponibilida de hoteles o vuelos y lo regreso al
							$("#mensajeVuelo").hide();

								// checkout
								var cadena=data.split("#");

								for (var i=0;i<cadena.length;i++){
									
                                   var cadena1 = cadena[i].split("*");
								   
								   if (cadena1[0]!="") {
									   // alert("INDICE "+cadena1[0])
									   if(cadena1[0]!=1) {
										   
										   $("#mensajeVuelo").show();
										   
										   mensajeMostrar = cadena1[1];
										   
										   control  = false; 
										   
										   if(cadena1[0]==2) {
											    
											  auxCambio = mensajeMostrar.split("|");
											  
											  mensajeMostrar  = auxCambio[0];
											  
										      totalcambios = totalcambios + auxCambio[1] + '*';
											  
											  var tempCambio = $("#precioCheck").val();
								
								               tempCambio = tempCambio + auxCambio[1] + '*';
											   $("#precioCheck").val(tempCambio);
											  
											  $('body').unblock();
										   
										   } else if (cadena1[0] == 50) {											   
											   $('body').unblock();	
											  // $("#rebuscar").show();										   
										   } else if (cadena1[0] == 20){
											   //Parametros dinamicos que no correspondan con el valor que requiere el supplier
											   $('body').unblock();
											   
										   } else {
											   $("#siguiente").hide();
										       $("#rebuscar").show();	
										       $('body').unblock();
										   }
										   
										   
									   } else {
										  control  = true;  
									   }// termina if(cadena1[0]!=1) {
									   
									   
								   } // termina if (cadena1[0]!="") {
								   
								   
                                 } 
								// alert(mensajeMostrar);
								 $("#mensajeVuelo").html(mensajeMostrar);
								
								/*var tempCambio = $("#precioCheck").val();
								
								tempCambio = tempCambio + totalcambios;
								
								$("#precioCheck").val(tempCambio);*/
								
								/*if (cadena[0] !="") {
								
								 if(typeof(cadena[0]) != "undefined" && cadena[0] !== null)
								 {
									var aux=cadena[0].split("-/-/-");
									//alert("enra en 1 flag" + aux[0]);
									if(aux[0]!=1) {
									  control=false;	
									 // alert("enra en 1 msg" + aux[1]);
									  $("#mensajeHotel").html(aux[1]);
									  $("#mensajeHotel").focus();
									  $("#siguiente").hide();
									  $('body').unblock();
									}	
								 }
								}*/
								
								
								//if(typeof(cadena[1]) != "undefined" && cadena[1] !== null) {
									    
								  //var aux=cadena[1].split("-/-/-");
								  //alert("enra en 2 flag" + aux[0]);
							 // -/-/-Sin cambios-/-/-2-/-/-The price of flight London - Madrid 03/05/2015 - 05/05/2015 change from 789.42 USD to 804.02 USD|G0FMDRLZ4MZBIAYZ90B72KOGOR25D4NJ-804.02-/-/-	
									
								  /*if(aux[0]!=1) {
									  
									  control = false;	

									  mensajeMostrar = aux[1];
									  
									   // si hubo un cambio en el precio del vuelo
									   if(aux[0]==2) {
										   
										   auxCambio = mensajeMostrar.split("|");
										  
										   mensajeMostrar = auxCambio[0];
										   $("#precioCheck").val(auxCambio[1]);
										   
										   // si el precio del vuelo cambio
										 $('body').unblock();
										 	
									   } else if (aux[0]==50) {
										   // si hay alguna direccion erronea detectado por el XMlProcess
										   $('body').unblock();
										   
									   } else {
										   // Si es un error que haya sucedido inesperadamente
										   $("#siguiente").hide();
										   $("#rebuscar").show();	
										   $('body').unblock();
									   }
									   
									   $("#mensajeVuelo").html(mensajeMostrar);
									   
									  
									}*/
									
									
								  //}
								
								
								
								
 									/*if(typeof(cadena[2]) != "undefined" && cadena[2] !== null)
								   { 
									var aux=cadena[2].split("-/-/-");
									//alert("enra en 3" + aux[0]);
									if(aux[0]!=1)
									control=false;	
									//alert("enra en 3 msg" + aux[2]);
									$("#mensajeVuelo").html(aux[2]);
									$("#siguiente").hide();	
									
									$('body').unblock();
								  }	*/								
								
								
								
								 if(control) {$("#formCheckout").submit() ;	
							}
							
							
				});
			}
			
			
			
			
		}
		else
		{
			
		}
		
	});
	
	function createVueloTFXML() {
		
	 var strXML = "<?xml version='1.0' encoding='utf-8'?>";
	 var nombreTitular   ="";
	 var apellidoTitular = "";
	 var strCadenaParam ="";
	 
	 var paxAdult = "";
	 var paxChild = "";
	 var parametrosAll ="";
	 
	 var intTotalVuelo = parseInt($("#VuelosTF").val());
	 var preciosActualizados = $("#precioCheck").val();
	 
	  strXML = strXML + "<gomexicoreservacion>";  

	  for (var i=1; i<=intTotalVuelo;i++) {
		  
		  paxAdult = "";
		  paxChild = "";
		  strCadenaParam ="";
		  
		  var login      = $("#login"+i).val();
		  var rountingID = $("#rountingID"+i).val();
		  var returnID   = $("#returnID"+i).val();
		  var outwardID  = $("#outwardID"+i).val();
		  
		  var adultos    = $("#adultos"+i).val();
		  var ninios     = $("#ninios"+i).val();
		  
		  var clave      = $("#clave"+i).val();
		  var amount     = $("#amount"+i).val();
		  var amountRe   = $("#amountRe"+i).val();
		  
		  var email = $("#email").val();
		  
		  var tipo   = $("#tipo"+i).val();
		  
		  var viaje1 = $("#viaje1"+i).val();
		  var viaje2 = $("#viaje2"+i).val();
		  var fecha1 = $("#fecha1"+i).val();
		  var fecha2 = $("#fecha2"+i).val();
		  
		  var tipoCambio = $("#tipoCambio"+i).val();
		  
		  var precioVerificado = $("#preciocheck"+i).val();
		  
		 parametrosAll = $("#allParametros"+i).val();
		 //alert($("#allParametros"+i).val());
		 
		 if ( parametrosAll!="" && parametrosAll != undefined) {
			 
			 var paramCadena=parametrosAll.split("**");
			 
			 for (var t=0;t<paramCadena.length;t++){
				 
				 var subparamCadena=paramCadena[t].split("|||");
				 
				 if (subparamCadena[0]!="") {
				   var valorParam = $("#"+subparamCadena[0]+i).val();
				   strCadenaParam = strCadenaParam + subparamCadena[0] +"|"+ valorParam + "&";
				   //alert(strCadenaParam);
				 }
			 }
			 
		 }
		 
		
		  
		  strXML     = strXML + "<item>";
		  
		  strXML = strXML + "<login>" + login + "</login>";
		  strXML = strXML + "<rountingID>"+ rountingID + "</rountingID>";
		  strXML = strXML + "<returnID>"+ returnID + "</returnID>";
		  strXML = strXML + "<outwardID>"+ outwardID + "</outwardID>";
		  strXML = strXML + "<adultos>"+ adultos + "</adultos>";
		  strXML = strXML + "<ninios>"+ ninios + "</ninios>";
		  strXML = strXML + "<clave>"+ clave + "</clave>";
		  strXML = strXML + "<amount>"+ amount + "</amount>";
		  strXML = strXML + "<amountRe>"+ amountRe + "</amountRe>";
		  strXML = strXML + "<tipo>"+ tipo + "</tipo>";
		  strXML = strXML + "<viaje1>"+ viaje1 + "</viaje1>";
		  strXML = strXML + "<viaje2>"+ viaje2 + "</viaje2>";
		  strXML = strXML + "<fecha1>"+ fecha1 + "</fecha1>";
		  strXML = strXML + "<fecha2>"+ fecha2 + "</fecha2>";
		  strXML = strXML + "<email>"+ email + "</email>";
		  strXML = strXML + "<pv>"+ preciosActualizados + "</pv>";
		  strXML = strXML + "<erate>"+ tipoCambio + "</erate>";
		  
		  if ( parametrosAll!="" && parametrosAll != undefined) {
			 strXML = strXML + "<paramDinamico><![CDATA[" + strCadenaParam + "]]></paramDinamico>";
		  } else {
			 strXML = strXML + "<paramDinamico><![CDATA[]]></paramDinamico>";
		  }
		   
		   if (parseInt(adultos) > 0 ) {
			   
		     for (var a=1;a<=parseInt(adultos);a++) {
				 	
    var fechaA = $("#cmbDiaATF"+a+"-"+clave).val() + "/" + $("#cmbMesATF"+a+"-"+clave).val()+ "/"+ $("#cmbAnioATF"+a+"-"+clave).val();	
				 
	paxAdult = paxAdult + $("#cmbTituloTF"+a+"-"+clave).val() + "-" + $("#txtAdultoNombreVueloTF"+a+"-"+clave).val()+"-"+$("#txtAdultoApellidoVueloTF"+a+"-"+clave).val()+"-" + fechaA + "|";
				
		     }
			 
			 strXML = strXML + "<paxAdultos>"+ paxAdult + "</paxAdultos>";			 
		   }
		   
		   
  if (parseInt(ninios) > 0) {
			  			  
	     for (var n=1;n<=parseInt(ninios);n++) {
				  
            var fechaN =$("#cmbDiaNTF"+n+"-"+clave+"-"+i).val() + "/" +$("#cmbMesNTF"+n+"-"+clave+"-"+i).val() +"/" + $("#cmbAnioNTF"+n+"-"+clave+"-"+i).val(); 
				
				 	//$("#edad"+n+"-"+clave).val()	  
            paxChild = paxChild + $("#ninio"+n+"-"+clave).text() + "-" + "Mr" + "-" +$("#txtNinioNombreVueloTF"+n+"-"+clave).val() + "-" + $("#txtNinioApellidoVueloTF"+n+"-"+clave).val() + "-" + fechaN + "|";		  
				  
		 }
			  
			  strXML = strXML + "<paxNinio>"+ paxChild + "</paxNinio>";	
  }
		   
	strXML  = strXML + "</item>";
  }
	  
	  strXML = strXML + "</gomexicoreservacion>";
		
	
		return strXML;
	}
	
	
	///////////////////////////////////////////////////////////////////////////////////
		// mostrar el contenido de mas informacion
		$(".contenidoCajaTitulo").click(
	
			function(){
				
				$(".contenidoCajaTitulo").each(function() {
                    
					var padre= $(this).parent();
					
					if(padre.find(".contenidoCajaCont").css("display")=="block" )
					{
						padre.find(".contenidoCajaCont").slideToggle();
						
						$(this).find(".arrow").removeClass("arrowOpen");
					}
					
                });
				
				var padre=$(this).parent();
				padre.find(".contenidoCajaTitulo").addClass("activoT");
				
				if(padre.find(".contenidoCajaCont").css("display")=="none")
				{
					padre.find(".contenidoCajaCont").slideToggle();
					padre.find(".arrow").addClass("arrowOpen");
				}
				
		});
		
	$('#nombre').on('keyup change paste', function(e){
	     $('.copyTextnom').val($(this).val());
		 $('.copyTextnomtm').val($(this).val());
		 $('.copyTextnomTran').val($(this).val());
		 $('.copyTextnomTF').val($(this).val());
		 $('.copyTextnomV').val($(this).val());
		 
		 $('.copyTextnom1').val($(this).val());
		 $('.copyTextnomtm1').val($(this).val());
		 $('.copyTextnomTran1').val($(this).val());
		 $('.copyTextnomTF1').val($(this).val());
		 $('.copyTextnomV1').val($(this).val());
		 
		 
		 
	});
	
	$('#apellido').on('keyup change paste', function(e){
	     $('.copyTextapellido').val($(this).val());
		 $('.copyTextapellidotm').val($(this).val());	
		 $('.copyTextapellidoTran').val($(this).val());	
		 $('.copyTextapellidoTF').val($(this).val()); 
		 $('.copyTextapellidoV').val($(this).val());
		 
	     $('.copyTextapellido1').val($(this).val());
		 $('.copyTextapellidotm1').val($(this).val());	
		 $('.copyTextapellidoTran1').val($(this).val());	
		 $('.copyTextapellidoTF1').val($(this).val()); 
		 $('.copyTextapellidoV1').val($(this).val());		 
		 
	});
	
	$('#email').on('keyup change paste', function(e){
	     $('.copyTextEmail').val($(this).val())
	});	
	
	$('#confirmar').on('keyup change paste', function(e){
	     $('.copyTextConfirmar').val($(this).val())
	});		
	
	$('#telefono').on('keyup change paste', function(e){
	     $('.copyTextTel').val($(this).val())
	});
	
    $('#cel').on('keyup change paste', function(e){
	     $('.copyTextCel').val($(this).val())
	});	
	
	
	
	
	$('.copyTextnom').on('keyup change paste', function(e){
	        $('.copyTextnom1').val($(this).val())
	 });
	 
	$('.copyTextnomtm').on('keyup change paste', function(e){
	        $('.copyTextnomtm1').val($(this).val())
	 });
	 
	 $('.copyTextnomTran').on('keyup change paste', function(e){
	   $('.copyTextnomTran1').val($(this).val())
	 });
	 
	 $('.copyTextnomTF').on('keyup change paste', function(e){
	   $('.copyTextnomTF1').val($(this).val())
	 });	 
	 
	 
	 
	 $('.copyTextnomV').on('keyup change paste', function(e){
	   $('.copyTextnomV1').val($(this).val())
	 });	 	
	 
	 
	  
		
	$('.copyTextapellido').on('keyup change paste', function(e){
	        $('.copyTextapellido1').val($(this).val())
	 });	
	
	$('.copyTextapellidotm').on('keyup change paste', function(e){
	        $('.copyTextapellidotm1').val($(this).val())
	});	
	 
	$('.copyTextapellidoTran').on('keyup change paste', function(e){
	        $('.copyTextapellidoTran1').val($(this).val())
	}); 
	
	
	$('.copyTextapellidoTF').on('keyup change paste', function(e){
	        $('.copyTextapellidoTF1').val($(this).val())
	});	
		
	$('.copyTextapellidoV').on('keyup change paste', function(e){
	        $('.copyTextapellidoV1').val($(this).val())
	}); 
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});