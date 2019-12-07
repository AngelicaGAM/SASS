// JavaScript Document
var last;
$(document).ready(function(e)
{
			$(".ultratabs").hide();
	$(".esc").hide();
	$(".bannercarga").hide();
	/// get idioma
	var idioma="";
	
	$.ajax({
				 url:"_assets/_controllers/getLang.php",
				 data:{ page: "hotels"},
				 type:"POST",
				 dataType:"json",
				 async:false,
				 success: function(data){
						idioma =eval(data);
				 }
	});

	$("#back").hide();

	/* calendario de reserva */
	var calFecha= new Date();
	var hoy = new Date(calFecha.getFullYear(),calFecha.getMonth(),calFecha.getDate());

	// Inicializa configuracion y control de calendarios
	// $("#checkIn").datepicker({
	// 		minDate : 2,
	// 		changeMonth : true,
	// 		numberOfMonths : 1,
	// 		dateFormat : 'mm-dd-yy',
	// 		beforeShowDay: $.datepicker.noWeekends,
	// 		beforeShowDay: NoDates,
	// 		minDate: "today"+8, // Se le suman 7 dia al dia de hoy
	// 		onClose : function(selectedDate){
	// 			$("#sd").val(selectedDate);
	// 			// Hace o no el Set de valores.
	// 			if(localStorage.getItem("sd")!="")
	// 			{
	// 				localStorage.setItem("sd", selectedDate);
	// 			}
	
	// 			// localStorage.setItem("sd", selectedDate);
	// 			var ed=sumaFecha (7, selectedDate);
	// 			$("#ed").val(ed);
	// 		}
	// });


	// Inicializa configuracion y control de calendarios
	$("#checkIn").datepicker({
			changeMonth : true,
			numberOfMonths : 1,
			dateFormat : 'mm-dd-yy',
			beforeShowDay: $.datepicker.noWeekends,
			beforeShowDay: NoDates,
			minDate: "today"+8, // Se le suman 7 dia al dia de hoy
			
			onClose : function(selectedDate){

				if(localStorage.getItem("sd")!="")
				{
					localStorage.setItem("sd", selectedDate);
				}
				var ed=sumaFecha (7, selectedDate);
				selectedDate=cambio(selectedDate);
				console.log("1-"+selectedDate);
				$("#sd").val(selectedDate);
				ed=cambio(ed);
				console.log("2-"+ed)
				$("#ed").val(ed);
			}
	});




	$.ajax({
				url:"_assets/_controllers/getFichasRW.php",
				type:"POST",
				dataType: "HTML"
				}).done(function(data)
				{
					$("#destinosT").html(data);
				});


	//funcionamiento del boton de buscar
	$("#search").on("click",function()
	{
				$(".ultratabs").hide();
	$(".esc").hide();
		$("#frameContent").hide();
		$("#destinosT").hide();
		$("#loading").show();
		$(".bannercarga").hide();

		localStorage.setItem("seleccionadoBoton", "RW");

		var ban=true;

		if($("#BusquedaPaises").val()=="0" && ban)
		{	alert(idioma.buscador.valida1); ban = false;	}
		if($("#checkIn").val()=="" && ban)
		{	alert(idioma.buscador.valida2); ban=false;	}

		if(ban)
		{
			//var destino = $("#destino").val();
			$("#CManual").hide();
			$("#sort").val("price_asc");
			$("#viewprice").val(1);
			$("#ta").prop("value","buscador");

			// aqui iba el last de formulario 
			last=$("#FormBusqueda").serializeArray();

			// $("#pest").hide();
			// $("#filtrosSection").hide();
			$("#frame").show();
			$("#listado").hide();
			$("#listado").html("");

			// var  mes = calFecha.getMonth()+1;
			// var dia = calFecha.getDate();
			// if(mes>=1 && mes <=9)
			// { mes ="0"+mes;}
			// if(dia>=1 && dia<=9)
			// { dia="0"+dia; }

			// var hoyCompara = dia+"-"+mes+"-"+calFecha.getFullYear();

			// if(hoyCompara ==$("#startDate").val())
			// {
			// 	$("#alert").show();
			// 	$("#frame").hide();
			// 	$(document).scrollTop( $("#alert").offset().top -200);

			// }
			// else
			// {

			// 	$("#frame").show();
			// 	$("#alert").hide();
			// 	$(document).scrollTop( $("#loading").offset().top-100 );
			// }

			$(document).scrollTop( ($("#frame").offset().top-300) );
			var ua = navigator.userAgent.toLowerCase();
					/*if(ua.indexOf('safari') > -1 && ua.indexOf('chrome')==-1 && ua.indexOf('crios')==-1  ) {


						var  dent3=window.open("carga.html","Carga2","directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no, width=1, height=1, top=2000");
						 var dent=window.open("https://www.travelnet.com.mx/boxtravelnet/","ventana","directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no, width=1, height=1, top=2000");
						var  dent2=window.open("carga.html","Carga","directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no, width=1, height=1, top=2000");


					  }  */


			$.ajax({	url:"_assets/_controllers/hotelProcesaBuscadorRW.php",
						type:"POST",
						dataType:"html",
						data:{valueF :last},
						success:function(data){
							if(data[60]==undefined){
								$("#loading").hide();
								$("#filtrosSection").hide();
								$("#listado").show();
								$("#loading").hide();
								$(".bannercarga").hide();
										$(".ultratabs").hide();
	$(".esc2").hide();
								var regiones = localStorage.getItem("regiones");
								// console.log("cargo regioines desde local "+regiones);
								// carga_manual($("#regiones").val(),$("#dc").val(),$("#sd").val(),0);
								$(".bannercarga").hide();
								carga_manual(regiones,$("#dc").val(),$("#sd").val(),1,3);
								$(".contenidoCajaCont").css("display","none");
							}
							else if(data=="")
							{

								$("#loading").hide();
								$("#filtrosSection").hide();
								$("#listado").show();
								$("#loading").hide();
								$(".bannercarga").hide();
								var regiones = localStorage.getItem("regiones");
								// console.log("cargo regioines desde local "+regiones);
								// carga_manual($("#regiones").val(),$("#dc").val(),$("#sd").val(),0);
								$(".bannercarga").hide();
								carga_manual(regiones,$("#dc").val(),$("#sd").val(),1,3);
								$(".contenidoCajaCont").css("display","none");
										$(".ultratabs").hide();
	$(".esc2").hide();
							}
							else
							{
								$("#destinosT").hide();
								$("#filtrosSection").show();
								$("#listado").show();
								$("#listado").html(data);
								$("#loading").hide();
								$("#LRegion").show();
								var regiones = localStorage.getItem("regiones");
								// console.log("cargo regioines desde local "+regiones);
								carga_manual(regiones,$("#dc").val(),$("#sd").val(),1,4);
								$(".bannercarga").hide();

							}
							$("body").trigger("validaCheckRW");
							$("input[type=checkbox]").uniform();
									$(".ultratabs").hide();
	$(".esc2").hide();
						}
				});
		}
	});

	$(document).on("click","input[type=checkbox]",function(){
		
		var id= $(this).prop("id");
		// alert("id "+id);
		var find = id.split("_");

		var cambio = $(this).parent().parent().parent().parent().find("#"+find[1]);
		// alert(cambio.prop("tagName"));
		if($(this).is(":checked")){
			cambio.prop("value","1");
		}
		else{
			cambio.prop("value","0");
		}
	});

	$(document).on("click","button[name='my-add-button']",function(e){
		e.preventDefault();
		var value = $(this).prop("id");
		var vlor = value.split("_");
	
		var $form = $(this).parent().parent().parent().parent().find("#form_"+vlor[1]);
		//alert($form.prop("tagName"));
		$form.submit();
	});
	
	$(".regiones").mouseenter(function()
	{
		var id=$(this).attr("rel");
		$("#region").prop("value",id);
		$.ajax({
				url:"_assets/_controllers/getInfoTotalP.php",
				type:"POST",
				data:{id :id}
				}).done(function(data)
				{	$("#"+id).html(data);	
				});

	});

	$(document).on("click",".regiones",function(e)
	{	
		$(".bannercarga").hide();
		e.preventDefault();
		var id=$(this).attr("rel");
		$("#regiones").prop("value",id);
		localStorage.setItem("regiones", id);
		//$("#CManual").html("").show();
		
		//$("#listado").html("").hide();
		$("#frame").show();
		$("#loading").show();
		selectDestinos(id);

		carga_manual(id,"","",0,4);
	});

	$(document).on("change","#BusquedaPaises",function(e){
		e.preventDefault();
		var valor=$(this).val();
		var temp = valor;
		console.log("valor "+valor);



		if(valor!=0)
		{

		valor=valor.split("_");
		$("#d").val(valor[1]);
		$("#dc").val(valor[2]);
		$("#idPaisHidden").val(valor[3]);
		// Carga LOCAL
		localStorage.setItem("Sel",temp);
		localStorage.setItem("d", valor[1]);
		localStorage.setItem("dc", valor[2]);
		localStorage.setItem("idPaisHidden", valor[3]);
		}
	});

	$(document).on("click","#back",function(e){
		e.preventDefault();
		$("#CManual").html("").hide();
		$(".divBuscador").hide();
		$("#checkIn").prop("value","");
		$("#back").hide();
		$("#listado").html("").hide();
		$("#mapa").show();
		$("#destinosT").show();
		$("#LRegion").html('');
		$("#mapa , #destinosT").show();
	})

	// funcionamiento para realizar la paginacion
	function paginacion ()
	{
		$("div.holder").jPages(
		{
			containerID : "fichasHoteles",
			perPage :15,
			midRange :6,
			previous :idioma.anterior,
			next:idioma.siguiente,
			animation:"fadeIn",
					/*
					callback : function( pages, items ){
						//alert(pages.current);
						startPage:pages.current
						//if(items.count > 10){
						//	$("#legend1").html("Page " + pages.current + " of " + pages.count);
						//	$("#legend2").html(items.range.start + " - " + items.range.end + " of " + items.count);
						//}else{
						//	$("#legend1, #legend2").html('');
						//}

					  }*/
		});
	}

	function NoDates(date)
	{
		var day = date.getDay();
		// aqui indicamos el numero correspondiente a los dias que ha de bloquearse (el 0 es Domingo, 1 Lunes, etc...)
		return [(day != 1 && day != 2 && day != 3 && day != 4), ''];
	};

	// function sumaFecha (d, fecha)
	// {
	// 	var Fecha = new Date();
	// 	var sFecha = fecha || (Fecha.getDate() + "/" + (Fecha.getMonth() +1) + "/" + Fecha.getFullYear());
	// 	var sep = sFecha.indexOf('/') != -1 ? '/' : '-';
	// 	var aFecha = sFecha.split(sep);
	// 	var fecha = aFecha[2]+'/'+aFecha[1]+'/'+aFecha[0];
	// 	fecha= new Date(fecha);
	// 	fecha.setDate(fecha.getDate()+parseInt(d));
	// 	var anno=fecha.getFullYear();
	// 	var mes= fecha.getMonth()+1;
	// 	var dia= fecha.getDate();
	// 	mes = (mes < 10) ? ("0" + mes) : mes;
	// 	dia = (dia < 10) ? ("0" + dia) : dia;
	// 	var fechaFinal = dia+sep+mes+sep+anno;
	//  	return (fechaFinal);
	// }

function sumaFecha (d, fecha)
{
	var Fecha = new Date();
	var sFecha = fecha || ((Fecha.getMonth() +1) + "/" + Fecha.getDate() + "/" + Fecha.getFullYear());
	var sep = sFecha.indexOf('/') != -1 ? '/' : '-'; 
	var aFecha = sFecha.split(sep);
	var fecha = aFecha[2]+'/'+aFecha[0]+'/'+aFecha[1];
	fecha= new Date(fecha);
	fecha.setDate(fecha.getDate()+parseInt(d));
	var anno=fecha.getFullYear();
	var mes= fecha.getMonth()+1;
	var dia= fecha.getDate();
	mes = (mes < 10) ? ("0" + mes) : mes;
	dia = (dia < 10) ? ("0" + dia) : dia;
	// var fechaFinal = dia+sep+mes+sep+anno;
	var fechaFinal = mes+sep+dia+sep+anno;
 	return (fechaFinal);
}

	function selectDestinos(id)
	{

		$.ajax({
				url:"_assets/_controllers/getSelectRegiones.php",
				type:"POST",
				dataType: "HTML",
				data:{id :id},
				success:function(data)
				{
				//	Muestra la Busqueda.
				var dat=data.split(",.-");
				$(".divBuscador").show();
				$(".Busqueda2").show();
				$("#back").show();
				$("#SelectCategoria").html(dat[0]);
				localStorage.setItem("Label",dat[1]);
				$("#LRegion").html('<h3>'+dat[1]+'</h3>');
				$("#mapa").hide();
				$("#destinosT").hide();
				$("#BusquedaPaises").trigger('change');
				if($("#HiddenSession").val()==1)
				{ 
					var ident= localStorage.getItem("Sel");
					var lael = $("#LRegion").text();
					//lael = utf8_encode(lael);
					var optgroup = $('#BusquedaPaises optgroup[label="'+lael+'"]')
					var option = optgroup.find('option[value="'+ident+'"]')
					option.attr('selected', true)
				}
				}
			});

	}

	function carga_manual(region,ciudad,fecha,bandera,bandera2)
	{
		$.ajax({
					url:"_assets/_controllers/getInfoCargaManual.php",
					type:"POST",
					dataType: "HTML",
					data:{id :region, fecha: fecha, ciudad: ciudad},
					success:function(data)
					{
						$("#frame").hide();
						$("#loading").hide();
						$("#CManual").show();
						$("#CManual").html(data);
								$(".ultratabs").hide();
	$(".esc").show();
						// [ Agrega los estilos para la segunda carga ]
						if(bandera==1)
						{
							if(data==""){
								if(bandera2==3){
									//alert("aki");
									$(".bannercarga").show();
									$(".bannercarga .title").text("No results, try again.");
								}else{
									$(".bannercarga").hide();
								}
							}else{
								$(".bannercarga").show();
								$(".bannercarga .title").text("More dates available for your trip");
							}

							$("#CManual .hResortWeek > .info > .masInfoCaja > .contenidoCajaTitulo").css("background","#82aab0");	
							$("#CManual .hResortWeek > .info > .masInfoCaja > .contenidoCajaCont").css("background","#005464");
							$("#CManual .hResortWeek > .info > .masInfoCaja > .contenidoCajaCont > .habitacion > .tarifas table *").css("color","#ffffff");
						}
						else
						{
							$("#CManual .hResortWeek > .info > .masInfoCaja > .contenidoCajaTitulo").css("background","#aaa");	
							$("#CManual .hResortWeek > .info > .masInfoCaja > .contenidoCajaCont").css("background","#f0f0f0");
							$("#CManual .hResortWeek > .info > .masInfoCaja > .contenidoCajaCont").css("color","#000000 !import");

						}
						// [ FIN - Agrega los estilos para la segunda carga ]
						$("input[type=checkbox]").uniform();
					}
				});
	}


	var altura = $('.divBuscador').offset().top;
	
	$(window).on('scroll', function(){
		if ( $(window).scrollTop() > altura){
			$('.divBuscador').addClass('menu-fixed');
		} else {
			$('.divBuscador').removeClass('menu-fixed');
		}
	});

	
	if($("#HiddenSession").val()==1)
	{ 
		$("#mapa , #destinosT").hide();
		$(".divBuscador, .Busqueda2").show();
		prueba();
		var regiones = localStorage.getItem("regiones");
		selectDestinos(regiones);
		//$("#SelectCategoria").prop();

	}

function cambio(fecha){
	// console.log("=>"+fecha);
	var fecha=fecha.split("-");
	return fecha=fecha[1]+"-"+fecha[0]+"-"+fecha[2];
}

function prueba()
{

	var d=localStorage.getItem("d");
	var dc=localStorage.getItem("dc");
	var sd=localStorage.getItem("sd");
	var idPaisHidden=localStorage.getItem("idPaisHidden");
	var regiones = localStorage.getItem("regiones");
	//last=$("#FormBusqueda").serializeArray();
	// console.log("datos en local --"+d+"-"+dc+"-"+idPaisHidden+" ya con los datos se procede a cargar todo");
	$("#d").val(d);
	$("#dc").val(dc);
	$("#idPaisHidden").val(idPaisHidden);
	$("#frame ,#loading").show();
	$("#sd").val($("#HiddenF1").val());
	$("#ed").val($("#HiddenF2").val());
	$("#ta").val("buscador");

	last=$("#FormBusqueda").serializeArray();

	$.ajax({	url:"_assets/_controllers/hotelProcesaBuscadorRW.php",
						type:"POST",
						dataType:"html",
						data:{valueF :last},
					success:function(data)
					{
						if(data=="")
						{
							$("#loading").hide();
							$("#filtrosSection").hide();
							$("#listado").show();
							$("#loading").hide();							
							carga_manual(regiones,$("#dc").val(),$("#sd").val(),1,3);
							//$(".bannercarga").show();
							//carga_manual($("#regiones").val(),$("#dc").val(),$("#sd").val(),0);
							$(".contenidoCajaCont").css("display","none");
						}
						else
						{
							$(".bannercarga").hide();
							$("#destinosT").hide();
							$("#filtrosSection").show();
							$("#listado").show();
							$("#listado").html(data);
							$("#loading").hide();
							$("#LRegion").show();
							carga_manual(regiones,$("#dc").val(),$("#sd").val(),1,4);
						}
						$("body").trigger("validaCheckRW");
						$("input[type=checkbox]").uniform();
					}
				});
}

});