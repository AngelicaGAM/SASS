// JavaScript Document

$(document).ready(function(e) {
	
	$("body").trigger("validaCheckRW");
    // $("input[type=checkbox]").uniform();
	
	$.datepicker.regional['es'] = {
			closeText : 'Cerrar',
			prevText : '<Ant',
			nextText : 'Sig>',
			currentText : 'Hoy',
			monthNames : [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
					'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre',
					'Diciembre' ],
			monthNamesShort : [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul',
					'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
			dayNames : [ 'Domingo', 'Lunes', 'Martes', 'Mi\u00E9rcoles', 'Jueves',
					'Viernes', 'S\u00E1bado' ],
			dayNamesShort : [ 'Dom', 'Lun', 'Mar', 'Mi\u00E9', 'Juv', 'Vie', 'S\u00E1b' ],
			dayNamesMin : [ 'Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'S\u00E1' ],
			weekHeader : 'Sm',
			dateFormat : 'dd-mm-yy',
			firstDay : 0,
			isRTL : false,
			showMonthAfterYear : false,
			yearSuffix : '',

		};
    $('.sliderContent').revolution(
				{
					delay:5000,
					startwidth:1920,
					startheight:250,
					hideThumbs:10,
					fullWidth:"on",
					forceFullWidth:"on",
					
					touchenabled:"on",
					onHoverStop:"off"
				});	
	
	
		/// get idioma
		var idioma="";
		$.ajax({
				 url:"_assets/_controllers/getLang.php",
				 data:{ page: "semanasInventarioRegina"},
				 type:"POST",
				 dataType:"json",
				 async:false,
				 success: function(data){
				
						idioma =eval(data);
						//return idi;
				 }
			});
			
	// 	var calFecha= new Date();	
	// 	var hoy = new Date(calFecha.getFullYear(),calFecha.getMonth(),calFecha.getDate());



	// var fechaIni = $("#fecha1").datepicker({minDate:hoy, dateFormat:"dd/mm/yy"});
	// var fechafi = $("#fecha2").datepicker({minDate:hoy, dateFormat:"dd/mm/yy"});
	

	var calFecha= new Date();	
	var hoy = new Date(calFecha.getFullYear(),calFecha.getMonth(),calFecha.getDate());
	$("#fecha1").datepicker({minDate:hoy,dateFormat:"d/mm/yy",altField:"#checkin"});
	$( "#fecha1" ).prop("value",$.datepicker.formatDate('d/mm/yy', new Date()) )

	$("#fecha2").datepicker({minDate:hoy,dateFormat:"d/mm/yy",altField:"#checkout"});
	$( "#fecha2" ).prop("value",$.datepicker.formatDate('d/mm/yy', new Date()) )
		// funcionamiento del envio 	
	
	$("#send").on("click",function(){
		
		var ban=true;
		
		var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
		var vacioReg =new RegExp(/^\s+$/);
		var digitsReg = /^\d+$/;
		
		
		$("#idEnvio").css("display","none");
		$("#idEnvio").hide();
		if($("#nombre").val()=="" || vacioReg.test($("#nombre").val()))
		{
				$("#errorNombre").css("display","block");
				$("#errorNombre").html("Type a name");	
				ban=false;

		}
		if(!emailReg.test($("#email").val()))
		{
				$("#errorEmail").css("display","block");
				$("#errorEmail").html("Type email");	
				ban=false;
		}

		if(ban)
		{

			var respuesta = $.post("_assets/_controllers/envioRegina.php",
			{
				nombre:$("#nombre").val(),
				correo:$("#email").val(),
				tel:$("#phone").val(),
				fecha1:$("#fecha1").val(),
				fecha2:$("#fecha2").val(),
				Children:$("#Children").val(),
				Adults:$("#Adults").val(),
				room:$("#room").val(),
				comentarios:$("#comentarios").val(),

			});

			respuesta.done(function(data){
				// console.log(respuesta);
				if(data=="ok")
				{
					$("#concierge").css("display", "block");
					$("#formcomp").css("display","none");
					$("#idEnvio").css("display","block");
					$("#idEnvio").addClass("accep");
					$("#idEnvio").html("We have received your request!. Your personal concierge will contact you within the next 48 hours. Thank you!");
					$(".input, .inputFecha, .inputTextA").prop("value","");
					$("#adultos").val(0);

				}
			
			});
		}
		if(ban)
		{
	
		}
		else{
		
			$("#concierge").css("display", "block");
			$("#idEnvio").css("display","block");
			$("#idEnvio").removeClass("accep");
			$("#idEnvio").addClass("error");
			$("#idEnvio").html('Problem encountered when sending the information. Please try again');
		}

	});



	$(document).on("focus",".input, .inputFecha",function(){
		$(this).parent().find(".error").hide();
			
	});




	
		
	
});