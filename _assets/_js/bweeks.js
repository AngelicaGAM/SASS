var models=window.models || {};
var common=window.common || {};
models.listaActual=[];
models.listaFiltrada=[];
models.listaRespaldo=[];
models.hotelesSecciones=[];
models.url='/';
if(location.pathname.indexOf('/es/')>=0)
	models.url='/es/';

models.items=10;
models.itemsSolicitados=50;
models.itemsActual=0;
models.itemsTotal=0;
models.token=0;
models.simbolo='$';
models.moneda=idioma.comparador.moneda;
models.destino="";
models.pintando=0;
models.decimal=".";
models.miles=",";
models.hotelito="";
models.longitudDescripcion=40;
models.bandFiltro = false;
models.progressStatus = false;
models.imagenDefault = null;
models.goSearchBox = false;
models.openMap = false;
models.recargaSeccionC = 0;
models.bandCargandoFiltro = false;
models.hotelesMap = "";
Number.prototype.formatMoney = function (c, d, t) {
	var tempResult = "";
	try {
	var n = this,
		s = n < 0 ? "-" : "",
		i = parseInt(n = Math.abs(+n || 0).toFixed(c), 10) + "", j = (j = i.length) > 3 ? j % 3 : 0;
		c = isNaN(c = Math.abs(c)) ? 2 : c;
		d = d == undefined ? models.decimal : d;
		t = t == undefined ? models.miles : t;
		//Con decimales
		// tempResult = s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
		//sin decimales
		tempResult = s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t);
	} catch (e) {
		BD.fn.util.trackJsError(e);
	}
	return tempResult;
};


models.Otas=[
{nombre:"Expedia",total:0,uid:"aHR0cHM6Ly93d3cuZXhwZWRpYS5jb20=",tarifa_x_noche_publico:0,porcentajeAhorro:99,idGrupo:1}
,{nombre:"Booking",total:0,uid:"aHR0cHM6Ly93d3cuYm9va2luZy5jb20=",tarifa_x_noche_publico:0,porcentajeAhorro:99,idGrupo:2}
,{nombre:"Hotels",total:0,uid:"aHR0cHM6Ly93d3cuaG90ZWxzLmNvbQ==",tarifa_x_noche_publico:0,porcentajeAhorro:99,idGrupo:1}
,{nombre:"Priceline",total:0,uid:"aHR0cHM6Ly93d3cucHJpY2VsaW5lLmNvbQ==",tarifa_x_noche_publico:0,porcentajeAhorro:99,idGrupo:2}
,{nombre:"Hotwire",total:0,uid:"aHR0cHM6Ly93d3cuaG90d2lyZS5jb20=",tarifa_x_noche_publico:0,porcentajeAhorro:99,idGrupo:1}
,{nombre:"Orbitz",total:0,uid:"aHR0cHM6Ly93d3cub3JiaXR6LmNvbQ==",tarifa_x_noche_publico:0,porcentajeAhorro:99,idGrupo:1}
,{nombre:"Travelocity",total:0,uid:"aHR0cHM6Ly93d3cudHJhdmVsb2NpdHkuY29tLw==",tarifa_x_noche_publico:0,porcentajeAhorro:99,idGrupo:1}
,{nombre:"Agoda",total:0,uid:"aHR0cHM6Ly93d3cuYWdvZGEuY29t",tarifa_x_noche_publico:0,porcentajeAhorro:99,idGrupo:2}]


//funcionamiento para mostrar los campos de las habitaciones
function cambioHabitaciones()
{
	$(".cubiertoNino").val(0);
	$(".edadninio").val("-");
	$(".edadninio").attr('disabled','disabled');
	var cuartos=parseInt($(this).val()?$(this).val():1);
	var TotalH=parseInt($("#totalHab").val()?$("#totalHab").val():1);
	if (cuartos > 0) 
	{
		$("#habitaciones").show("slow");
		for(var a=3; a>=2 ; a--)
		{ 

			$(".room_"+ a,"#habitaciones").hide("slow");
			$(".room_"+ a,"#habitaciones").remove();
		}

		for(var a=2; a<=cuartos; a++)
		{ 
			var years="";
			for (var j = 1; j < 13; j++) {
				years+='<option value="'+j+'">'+j+' '+(j>1?idioma.buscador.titulo10:idioma.buscador.titulo9)+'</option>';
			}
			$("#habitaciones").append(
				'<div class="habitacion room_' + a + '" id="habitacion_' + a + '" style="display:none">' +           
					'<div class="group">'+
						'<div class="hab val item"><i class="icon-bed" style="font-size: 25px"></i>&#160;&#160;<span style="font-size: 18px">'+a+'</span> </div>'+
					'</div>'+
					'<div class="group">'+
						'<i class="inside icon-standing-up-man"></i>'+
						'<input type="hidden" class="habitacion'+a+'" value="'+a+'">'+
						'<select id="adultos_'+a+'" name="r'+a+'a" class="obl item custom-select selecta">'+
							'<option value="1" >1 '+idioma.buscador.titulo4+'</option>'+
							'<option value="2" selected>2 '+idioma.buscador.titulo4+'</option>'+
							'<option value="3">3 '+idioma.buscador.titulo4+'</option>'+
							'<option value="4">4 '+idioma.buscador.titulo4+'</option>'+
						'</select>'+
					'</div>'+
					'<div class="group">'+
						'<i class="inside icon-kids-couple"></i>'+
						'<select id="nino_'+a+'" name="r'+a+'k" class="cubiertoNino obl item custom-select selecta">'+
							'<option value="0" selected>'+idioma.buscador.ninios+'</option>'+
							'<option value="1">1 '+idioma.buscador.ninio+'</option>'+
							'<option value="2">2 '+idioma.buscador.ninios+'</option>'+
						'</select>'+
					'</div>'+
					'<div class="group">'+
						'<i class="inside icon-kids-couple"></i>'+
						'<select id="edadNH_'+a+'_1" name="r'+a+'k1a" class="edadninio obl item custom-select selecta" disabled>'+
							'<option value="-" selected>'+idioma.buscador.combo+'</option>'+
							'<option value="0" >'+idioma.buscador.titulo8+'</option>'+years+
							
						'</select>'+
					'</div>'+
					'<div class="group">'+
						'<i class="inside icon-kids-couple"></i>'+
						'<select id="edadNH_'+a+'_2" name="r'+a+'k2a" class="edadninio obl item custom-select selecta" disabled>'+
							'<option value="-" selected>'+idioma.buscador.combo+'</option>'+
							'<option value="0" >'+idioma.buscador.titulo8+'</option>'+years+
						'</select>'+
					'</div>'+
			'</div>'
			);
			$("#habitacion_" + a,"#habitaciones").show("slow");		
		}
		$("#totalHab").val(cuartos);
	}
	// else
	// {
	// 	$("#habitaciones").hide("slow");
	// }
}


$(document).ready(function(e)
{
	$("#laflecha, #habitaciones, #filtrosSection").hide();
	$(".buscadorTexto",".divBuscador").hide();
	$("#cerraBusqueda").hide();
	$(".filtrosTexto","#prit").hide();
	$("#cambiaBusqueda").bind("click",models.muestraBusqueda);
	$(".busquedabtnCerrar",".divBuscador").bind("click",models.ocultaBusqueda);
	//$(".cambiaFiltros","#prit").bind("click",models.muestraFiltros);
	$("#destino, #startDate, #endDate").prop("value","");
	$("#rooms").on("change",cambioHabitaciones);
	$("#rooms").trigger('change');
	// $("#rango").prop("value",0);
	$("#listado, #mapHoteles").on("click",".NetOptShow",models.ShowMoreOptNet);
	$("#listado, #mapHoteles").on("click",".NetOptHide",models.HideLessOptNet);
	// $("#rooms").prop("value",0);
	let tempCodes = [],
		respuestaErronea = "sin respuesta del ws",
		mostrar = 10, altura
	 $("a.goOtaFancy").fancybox({
	 		'autoDimensions': false,
            'width': 530,
            'height': 'auto',
	 		'scrolling': 'no',
	 		padding: 0
	 	});
	 $(document).on("click", "#showMap", function(e){
	 	if(models.listaActual.length == 0)
	 		return false;

	 	if(models.openMap == false){
			models.openMap = true;
			$('body, html').animate({ scrollTop: '0px'}, 300);
			$("#showMap").text(idioma.buscador.hideMap);
			$("#listado").hide("slow");

			$("#frame2").hide("slow");
			$("#frame").show();
			$("#loading").show();

			$("#showMap").text(idioma.buscador.hideMap);
			//models.pintando=1;
			//models.pintando=0;
			
			$("#navFilter").css("position", "fixed");
			$("#contenidoDiv").css('cssText', "max-width: 1330px !important");
			
			/*if(!$(".divSection").hasClass("map")){
				$(".divSection").addClass("mapaActivo");
			}*/
			$("#cajaReserva").hide("slow");
			$(".divSection:not([class*='map'])").addClass("mapaActivo");

			models.showMapDos();
	 	}else{
			models.openMap = false;
			clearTimeout(models.timerOpenMap);
			e.stopPropagation && e.stopPropagation();    
    		e.preventDefault && e.preventDefault();
	 		$("#showMap").text(idioma.buscador.seeMap);
	 		$("#listado").show("slow");
	 		$("#mapHoteles").hide("slow");
			//models.pintando=0;
			$(".divSection").removeClass("mapaActivo");
			//$("#contenidoDiv").style.setProperty("max-width", "1330px", "important");
			$("#contenidoDiv").css('cssText', "");
	 	}
	 });
	 $(document).on("click", ".see_details", function(e){
	 	$("#detallesHotelInMap").show("slow");
	 });
	 $(document).on("click", "a.goOtaFancy", function(e){
	 	e.preventDefault();
	 	var actual = $(this);
	 	var href = actual.data('href');
	 	var noches = actual.data('noches');
        var ahorro = actual.data('ahorro');
        var total = actual.data('total');
        $("#linkOta").attr('href', "");
        $("#linkOta").html("<i class='fa fa-spinner fa-pulse fa-3x fa-fw'></i>");
        $("#linkOta").addClass("not-active");
        $("#otaPopupCont2").hide();
        $("#otaPopupCont").show();
        var otas=[ "aHR0cHM6Ly93d3cuZXhwZWRpYS5jb20=", "aHR0cHM6Ly93d3cuYm9va2luZy5jb20=", "aHR0cHM6Ly93d3cuaG90ZWxzLmNvbQ==", "aHR0cHM6Ly93d3cucHJpY2VsaW5lLmNvbQ==", "aHR0cHM6Ly93d3cuaG90d2lyZS5jb20=", "aHR0cHM6Ly93d3cub3JiaXR6LmNvbQ==", "aHR0cHM6Ly93d3cudHJhdmVsb2NpdHkuY29tLw==", "aHR0cHM6Ly93d3cuYWdvZGEuY29t"];
        var pattern = /^(http|https)\:\/\/[a-z0-9\.-]+\.[a-z]{2,4}/gi;
        if(!otas.includes(href)){
	        $.ajax(
			{
				url:models.url+"_assets/_controllers/getOtaLink.php",
				data:{ link: href},
				type:"POST",
				async:true,
				success: function(data)
				{
					if(data.match(pattern)){
						var hr=JSON.parse("{\"a\":\""+data+"\"}")
		        		$("#linkOta").attr('href', hr.a);
		        		$("#linkOta").html("Compare");
	        			$("#linkOta").removeClass("not-active");
					}else{
						$("#otaPopupCont").hide();
						$("#otaPopupCont2").show();
						data = 'expirado';
					}
				}
			});	
		}else{
	        $("#linkOta").attr('href', atob(href));
	        $("#linkOta").html("Compare");
        	$("#linkOta").removeClass("not-active");
			$("#otaPopupCont2").hide();
        	$("#otaPopupCont").show();
		}
		if(noches>1){
        	$("#otaNoches").html(noches+" nights");
		}else{
			$("#otaNoches").html(noches+" night");
		}
        $("#otaTotal").html(total);
        $("#otaAhorro").html(ahorro);
	 });
	  
	$(document).on("click",".buttonGoOta", function(e){
		if($("#linkOta").attr('href') == ''){
	 		return false;
	  	}/*else if($("#linkOta").attr('href') == 'expirado'){
	 		$.fancybox.close();
			alert("Link no disponible, favor de realizar la busqueda de nuevo");
	 		return false;
	  	}*/
	 	$.fancybox.close();
	});
	/**
	 * JSON para el idioma de la pagina
	 */
	
	/**
	 * Seteo de calendarios CheckIn | CheckOut
	 */
	$("#startDate").datepicker(
		{
				minDate : 2,
				changeMonth : true,
				numberOfMonths : 2,
				dateFormat:"dd-mm-yy",
				onClose : function(selectedDate) {
					
					
					var dias = $("#rango").val();
					
					if(dias>0)
					{  
						var finDate=sumarDias(dias,selectedDate); 
						$("#endDate").prop("value",finDate);
					
					}
					
							
				}
			});

	$("#rango").on("change",function(){
			var dias=$(this).val();
			var fecha = $("#startDate").val();
			var finDate =sumarDias(dias,fecha);
			//alert(finDate);
			$("#endDate").prop("value",finDate);
	});

	/**
	 * Menu Fixed
	 */
	altura = $('#cajaReserva').offset().top;
	$(window).on('scroll', function(e)
	{
		e.preventDefault();
		if($("#contenedorHoteles").css("display") == "block" && $("#listado").html().length > 0){			
			if ( $(window).scrollTop() > 0)
			{
				if(models.goSearchBox == false){
					$("#navFilter").css("position", "fixed");
					$("#cajaReserva").hide("slow");
				}
			} else
			{	
				if(models.goSearchBox == false && models.bandCargandoFiltro == false && models.openMap == false){
					$("#navFilter").css("position", "unset");
				}
			}
		}
	});

	/**
	 * Autocomplete para destino
	 */
	 $.widget( "custom.catcomplete", $.ui.autocomplete, {
    _create: function() {
      this._super();
	  this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category)" );
	  $("#ui-id-1").scrollTop(0);
    },
    _renderMenu: function( ul, items ) {
      var that = this,
        currentCategory = "";
      $.each( items, function( index, item ) {
        var li;
        if ( item.category != currentCategory ) {
          ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
          currentCategory = item.category;
        }
        li = that._renderItemData( ul, item );
        if ( item.category ) {
          li.attr( "aria-label", item.category + " : " + item.label );
        }
      });
    }
  });

 	$("#destino").catcomplete(
	{
		source : function(request, response)
		{
			$.ajax(
			{
				url : models.url+"_assets/_controllers/autocompleteHotelesNet.php",
				dataType : "json",
				data : { q : request.term, lang:"en" },
				success : function(data)
				{
					response($.map(	data,
									function(item)
									{
										return{
											label : item.nombre+ ", " +(item.tipo==1?item.nombrePais:item.destino),
											category :(item.tipo==1?'Destination':'Hotels'),
											value : item.ciudad,
											destino: item.destino,
											citycode : item.cityCode,
											type: item.tipo,
											codigohotel : item.codigoHotel
										}
									}));
									$("#ui-id-1").scrollTop(0);
				}
			});
		},
		minLength : 3,
		maxLength : 6,
		select : function(event, ui)
		{
			$("#citycode").val(ui.item.citycode);
			$("#type").val(ui.item.type);
			$("#hotelcode").val(ui.item.codigohotel);
			$("#destinoName").val(ui.item.destino);
			$("#ui-id-1").scrollTop(0);
		},
	}); 

	/**
	 * Reser input #cityCode
	 */
	$(document ).on("keypress","#destino",function()
	{
	 	$("#citycode").val("");
	});

	/**
	 * Validacion de Paginador [<<] ... [>>]
	 */
	$(document).on("click",".resultados_busqueda > .holder > a",function(e)
	{
		e.preventDefault();
		$('html, body').animate({scrollTop : 180},1400);
		var mipagina=$(this).text();
		if(mipagina=="previous" || mipagina=="next")
		{
			mipagina=$("#listado > div:nth-child(2) > div > a.jp-current").text();
		}
		if(!isNaN(mipagina))
		{
			localStorage.setItem("pagina", mipagina);
		}
	});

	/**
	 * PENDIENTES //////
	 */
	
	/**
	 * Realiza el filtrado de Hoteles segun sea el caso.
	 */
	$(document).on("click","#botonFiltro",function()
	{
		models.filtraHoteles();
	});
		
	/**
	 * Funcionamiento para busqueda de hoteles
	 */
	$("#search").on("click",function(e)
	{
		var ban=true;
		ban = validaBusquedaHotel();

		if(ban)
		{			
			var last=$("#formHoteles").serializeArray();
			$(".buscadorh [type=text], .buscadorh select").attr("disabled", true);
			$(".alertBad, .alertBad2, #frameContent, #destinosT, #mapita, #pest, #filtrosSection, #bannerT, #frame").hide();
			$("#contenedorHoteles").hide("slow");
			localStorage.setItem("seleccionadoBoton", "H");
			$("#sort").val("price_asc");
			$("#viewprice").val(1);
			$("#ta").prop("value","buscador");
			
			$("#frame2").show();
			$("#listado").html("");
			//$(document).scrollTop( ($("#frame2").offset().top-200) );  
			models.itemsActual=0;
			models.itemsTotal=0;
			models.listaActual=[];
			models.listaRespaldo=[];
			models.hotelesSecciones=[];
			models.token=0;
			models.destino="";
			$("#filtrosSection").hide();
			$(".filtrosTexto","#prit").hide();
			$("#cerraBusqueda").hide();
			$(".encontrados").hide();
			$.ajax({
				url:models.url+"_assets/_controllers/buscadorHotel.php",
				dataType:"json",
				method :"POST",
				beforeSend: function(e) {
					models.progressStatus = true;
					models.progressBarE.progressbar( "option", "value", 0 );
					setTimeout( models.progressBar(), 300 );
		        },
				data:{valueF :last},
				success: function(data)
				{					
					if(data==null || data=="" || data == {}){
						$("#frame2").hide();
						$(".alertGood,.alertBad").hide();
						$(".alertBad").show();
						setTimeout(function() {$(".alertBad").hide();},4000);
						$(".buscadorh [type=text], .buscadorh select").removeAttr("disabled");
					}else{
						if(data.total==0){
							$("#frame2").hide();
							$(".alertGood,.alertBad").hide();
							$(".alertBad").show();
							setTimeout(function() {$(".alertBad").hide();},4000);
							$(".buscadorh [type=text], .buscadorh select").removeAttr("disabled");
						}else{
							models.CargaHoteles(data);
						}
					}			
					
				},
				error: function(){
						$("#frame2").hide();
						$(".alertGood,.alertBad").hide();
						$(".alertBad").show();
						setTimeout(function() {$(".alertBad").hide();},4000);
						$(".buscadorh [type=text], .buscadorh select").removeAttr("disabled");
				},
			});
		}
	});
		
	//	[Se agrega la opcion para el seguimiento de la Caja de Busqueda]
	altura = $('#cajaReserva').offset().top;
	$(window).on('scroll', function()
	{
		$('#nh').catcomplete('close');
		$('#destino').catcomplete('close');
		//if ( $(window).scrollTop() > altura-100){$('#cajaReserva').addClass('menu-fixed');}else{$('#cajaReserva').removeClass('menu-fixed');}
	});	
	//	[Muestra la opcion de de slideToogle]
	$("#laflecha").click(function()
	{	
		$("#prit2").slideToggle();
	});
		
	////	FUNCIONAMIENTO DEL AUTOCOMPLETE
	$.widget( "custom.catcomplete", $.ui.autocomplete,
	{
		_renderMenu: function( ul, items )
		{
			var that = this, currentCategory = "";
			$.each( items, function( index, item )
			{
				that._renderItemData( ul, item );
			});
		}
	});
			
	//autocomplete del filtro por nombre de hotel
	$( "#nh" ).catcomplete(
	{
		minLength: 3,
		delay: 0,
		source: function(request, response) {
			var accentMap = 
			{
				"á": "a",
				"é": "e",
				"í": "i",
				"ó": "o",
				"ú": "u",
				"ñ": "n"
			};
			var normalize = function()
			{
				var ret = "";
				for ( var i = 0; i < request.term.length; i++ )
				{
					ret += accentMap[ request.term.charAt(i) ] || request.term.charAt(i);
				}
				return ret;
			}
		    var datamap = models.duplicarObjetos(models.hotelesFiltros, true);
		    var key = request.term.trim();
		    var stars = parseInt($("#starselect").val());
			var filterStars = [3, 4, 5, 6];
			
			if(filterStars.includes(stars)){
				datamap = datamap.filter(function(i) {
					numero=parseInt((""+(i.categoryName)?""+i.categoryName:"0")[0]);
		    		return numero == stars;
				});
			}
		    datamap = datamap.filter(function(i) {
		      return i.name.toLowerCase().indexOf(key.toLowerCase()) >= 0;
		    });
		    models.listaFiltrada = datamap;
			response($.map(datamap,function(item)
			{
				$("#nombreFiltros").css('background-color','#F0F0F0');
				return {
					label : item.name,
					value : item.name,
					itemcode : item.code,				
				}
			}));
		},
		search: function(){$(this).addClass('ui-autocomplete-loading');},
		focus: function( event, ui ) {
        	$( "#nh" ).val( ui.item.label );
            return false;
       	},
       	select: function( event, ui ) {
        	$( "#nh" ).val( ui.item.label );
          	$( "#hotelSel" ).val( ui.item.itemcode );
		    models.filtraHoteles();
          	return false;
       	}
	});

	$(document).on("keyup", "#nh",function(e)
	{
		if (e.keyCode == 13 || $(this).val() == '') {
			$('#nh').catcomplete('close');
			models.filtraHoteles();
	        return false;
	    }
	});

	$(document).on("change", "#nh",function(e)
	{
		if ($(this).val() == '') {
			models.filtraHoteles();
	        return false;
	    }
	});

	$(document).on("change", "#starselect",function(e)
	{
		models.filtraHoteles();
		//models.creaTextoFiltros();
	});
			
	$(document).on('change', ".cubiertoNino", function ()
	{
		var n = $(this).val();
		var id= $(this).attr("id");
		id=id.split("_");
		var h= id[1];

		if(n == 0)
		{
			$("#edadNH_"+h+"_1").attr('disabled','disabled');
			$("#edadNH_"+h+"_2").attr('disabled','disabled');
			$("#edadNH_"+h+"_1").val("-");
			$("#edadNH_"+h+"_2").val("-");
		}
		if(n == 1)
		{
			$("#edadNH_"+h+"_1").removeAttr('disabled');
			$("#edadNH_"+h+"_2").attr('disabled','disabled');
			$("#edadNH_"+h+"_2").val("-");
		}
		if(n == 2)
		{
			$("#edadNH_"+h+"_1").removeAttr('disabled');
			$("#edadNH_"+h+"_2").removeAttr('disabled');
		}
	});
	

	
	// Inicializa configuracion y control de calendarios


	// funcioanmiento para volver a dibujar el listado de resultados cuando regrese de al seccion de hoteles o si viene del directorio		
	if(location.search!="")
	{
		var variables= getVarsUrl();
		//funcionamiento para mostrar los resultados cuando se hace una busqueda desde el buscador
		if(variables.ta=="buscador")
		{
			$("#frame, #loading").show();
			$("#destinosT").hide();
			$("#contenedorHoteles").hide("slow");
			$("#listado").html("");
			$("#ta").prop("value","buscador");
			$(document).scrollTop( ($("#frame").offset().top-300) );  
			$.ajax(
			{
				url:models.url+"_assets/_controllers/getListadoHoteles.php",
				dataType:"html",
				type:"POST",
				data:{ }	
			}).done(function(data)
			{
				$("#destinosT, #loading, #prit2, .alertGood").hide();
				$("#filtrosSection, #contenedorHoteles, .ultratabs, #laflecha").show();
				$("#listado").html(data);
				paginacion(mostrar);
			});
		}
		// funcionamiento para cuando viene desde las semanas premium
		if(variables.ta=="sp")		
		{
			var precioManda=parseInt(variables.price.replace(/,/g, ''));
			$("#destinosT").hide();
			$("#citycode").val(variables.claveC);
			$("#viewprice").val(variables.viewprice);
			var c =variables.claveC;
			$("#startDate").datepicker("option","minDate", variables.fecha1);
			$("#startDate").datepicker("setDate", variables.fecha1);
			$("#endDate").datepicker("setDate", variables.fecha2);
			$("#viewprice").prop("value","1");
			$("#ta").prop("value","sp");
			$("#plan").prop("value",5);
			//para forzar el limpiado de las variables de session.
			// $("#rooms").val(0);
			// $("#rooms").trigger('change');
			$("#rooms").val(1);
			$("#rooms").trigger('change');
			models.itemsActual=0;
			models.itemsTotal=0;
			models.listaActual=[];
			models.listaRespaldo=[];
			models.token=0;
			models.destino="";
			$.ajax(
			{
				url:models.url+"_assets/_controllers/getDestinoNombre.php",
				dataType:"text",
				type:"POST",
				data:{ clave:c}
			}).done(function(data)
			{
				$("#destino").val(data);
				//$("#search").trigger('click');
				var last=$("#formHoteles").serializeArray();
				$(".buscadorh [type=text], .buscadorh select").attr("disabled", true);
				$("#pest, #filtrosSection").hide();
				$("#contenedorHoteles").hide("slow");
				$(".alertBad2, .alertBad, #destinosT, #pest, #filtrosSection, #bannerT").hide();
				$("#frame").show();
				$("#listado").html("");
				$(document).scrollTop( ($("#frame").offset().top-300) ); 
				/****/
                $("#filtrosSection").hide();
                $(".filtrosTexto","#prit").hide();
                $("#cerraBusqueda").hide();
                $(".encontrados").hide();
                $.ajax({
                url:models.url+"_assets/_controllers/buscadorHotel.php",
                dataType:"json",
                method :"POST",
                beforeSend: function(e) {
                    models.progressStatus = true;
                    models.progressBarE.progressbar( "option", "value", 0 );
                    setTimeout( models.progressBar(), 300 );
                },
                complete:function(){
                    //models.progressBarE.progressbar( "option", "value", 100);
                    //models.progressStatus = false;
                },
                data:{valueF :last},
                success: function(data)
                {
					if(data==null || data=="" || data == {}){
						$("#frame2").hide();
						$(".alertGood,.alertBad").hide();
						$(".alertBad").show();
						setTimeout(function() {$(".alertBad").hide();},4000);
						$(".buscadorh [type=text], .buscadorh select").removeAttr("disabled");
					}else{
						if(data.total==0){
							$("#frame2").hide();
							$(".alertGood,.alertBad").hide();
							$(".alertBad").show();
							setTimeout(function() {$(".alertBad").hide();},4000);
							$(".buscadorh [type=text], .buscadorh select").removeAttr("disabled");
						}else{
						models.CargaHoteles(data);
						}
					}			
										
				},
				error: function(){
					console.log("error");
						$("#frame2").hide();
						$(".alertGood,.alertBad").hide();
						$(".alertBad").show();
						setTimeout(function() {$(".alertBad").hide();},4000);
						$(".buscadorh [type=text], .buscadorh select").removeAttr("disabled");
				}
            });
			});
		}
			
		// funcionamiento para cuando viene del directorio
		if(variables.ta=="dt")
		{
			$("#citycode").val(variables.claveC);
			$("#viewprice").val(variables.viewprice);
			var c =variables.claveC;
			$("#destinosT").hide();
			$("#sort").val("start_desc");
			$("#startDate").datepicker("setDate", "+90d");
			$("#endDate").datepicker("setDate", "+91d");
			$("#ta").prop("value","dt");
			// $("#rooms").val(0);
			// $("#rooms").trigger('change');
			$("#rooms").val(1);
			$("#rooms").trigger('change');
			models.itemsActual=0;
			models.itemsTotal=0;
			models.listaActual=[];
			models.listaRespaldo=[];
			models.token=0;
			models.destino="";
			$.ajax(
			{
				url:"_assets/_controllers/getDestinoNombre.php",
				dataType:"text",
				type:"POST",
				data:{ clave:c }
			}).done(function(data)
			{
				$("#destino").val(data);
				var last=$("#formHoteles").serializeArray();
				$(".buscadorh [type=text], .buscadorh select").attr("disabled", true);
				$("#pest, .alertBad2, .alertBad").hide();
				$("#contenedorHoteles").hide("slow");
				$("#loading,  #frame2").show();
				$("#listado").html("");
				$(document).scrollTop(($("#frame").offset().top - 300));
				/***/
				 $(".alertBad2, .alertBad, #destinosT, #pest, #filtrosSection, #bannerT").hide();
               // $("#filtrosSection").hide();
                $(".filtrosTexto","#prit").hide();
                $("#cerraBusqueda").hide();
                $(".encontrados").hide();
                $.ajax({
                url:models.url+"_assets/_controllers/buscadorHotel.php",
                dataType:"json",
                method :"POST",
                beforeSend: function(e) {
                    models.progressStatus = true;
                    models.progressBarE.progressbar( "option", "value", 0 );
                    setTimeout( models.progressBar(), 300 );
                },
                complete:function(){
                    //models.progressBarE.progressbar( "option", "value", 100);
                    //models.progressStatus = false;
                },
                data:{valueF :last},
                success: function(data)
                {
					if(data==null || data=="" || data == {}){
						$("#frame2").hide();
						$(".alertGood,.alertBad").hide();
						$(".alertBad").show();
						setTimeout(function() {$(".alertBad").hide();},4000);
						$(".buscadorh [type=text], .buscadorh select").removeAttr("disabled");
					}else{
						if(data.total==0){
							$("#frame2").hide();
							$(".alertGood,.alertBad").hide();
							$(".alertBad").show();
							setTimeout(function() {$(".alertBad").hide();},4000);
							$(".buscadorh [type=text], .buscadorh select").removeAttr("disabled");
						}else{
							models.CargaHoteles(data);
						}
					}			
									
				},
				error: function(){
					console.log("error");
						$("#frame2").hide();
						$(".alertGood,.alertBad").hide();
						$(".alertBad").show();
						setTimeout(function() {$(".alertBad").hide();},4000);
						$(".buscadorh [type=text], .buscadorh select").removeAttr("disabled");
                }
            });

			});
		}
	}

	/**
	 * Muestra la imagen en Bigger 
	 */
	$(document).on('click', '.imgBigger', function ()
	{
		var src = $(this).attr('src');
		var data = $(this).data('img');
		$('.img_bigger_' + data).html('<img src="' + src + '"/>');
	});

	/**
	 * Busqueda de acuerdo a las fichas del home de hoteles.
	 */
	$(document).on("click",".destinoFF",function(e)
	{
		e.preventDefault();
		//$(".alertGood").show();
		$(".alertBad2, .alertBad, #destinosT, #pest, #filtrosSection, #bannerT").hide();
		$("#contenedorHoteles").hide("slow");
		var id=$(this).prop("id");
		$("#citycode").prop("value",id);
		if($("#startDate").datepicker("getDate") === null || $("#endDate").datepicker("getDate") === null) {
			$("#startDate").datepicker("setDate", "+15d");
			$("#endDate").datepicker("setDate", "+18d");
		}

		// $("#rooms").val(0);
		// $("#rooms").trigger('change');
		$("#rooms").val(1);
		$("#rooms").trigger('change');
		$("#destinoName").val( $(this).data("name") );
		$("#destino").val( $(this).data("name") );
		var last=$("#formHoteles").serializeArray();
		$(".buscadorh [type=text], .buscadorh select").attr("disabled", true);
		$("#frame2").show();
		$("#listado").html("");
		$(document).scrollTop( ($("#frame2").offset().top-200) );
		models.itemsActual=0;
		models.itemsTotal=0;
		models.listaActual=[];
		models.listaRespaldo=[];
		models.hotelesSecciones=[];
		models.token=0;
		models.destino="";
		$("#filtrosSection").hide();
		$("#cerraBusqueda").hide();
		$(".filtrosTexto","#prit").hide();
		$(".buscadorTexto").hide();
		$.ajax({
			url:models.url+"_assets/_controllers/buscadorHotel.php",
			dataType:"json",
			method :"POST",
			beforeSend: function(e) {
				models.progressStatus = true;
				models.progressBarE.progressbar( "option", "value", 0 );
				setTimeout( models.progressBar(), 300 );
	        },
		    complete:function(){		        
		        //models.progressBarE.progressbar( "option", "value", 100);
		        //models.progressStatus = false;
		    },
			data:{valueF :last},
			success: function(data)
			{
				if(data==null || data==""){
					$("#frame2").hide();
					$(".alertGood,.alertBad").hide();
					$(".alertBad").show();
					setTimeout(function() {$(".alertBad").hide();},4000);
					$(".buscadorh [type=text], .buscadorh select").removeAttr("disabled");
				}else{
					if(data.total==0){
						$("#frame2").hide();
						$(".alertGood,.alertBad").hide();
						$(".alertBad").show();
						setTimeout(function() {$(".alertBad").hide();},4000);
						$(".buscadorh [type=text], .buscadorh select").removeAttr("disabled");
					}else{
						models.CargaHoteles(data);
					}
				}			
								
			},
			error: function(){
				console.log("error");
					$("#frame2").hide();
					$(".alertGood,.alertBad").hide();
					$(".alertBad").show();
					setTimeout(function() {$(".alertBad").hide();},4000);
					$(".buscadorh [type=text], .buscadorh select").removeAttr("disabled");
			}
		});
	});

	$(window).load(function()
	{
		var valueSession= $("#sessionHotels").val();
		localStorage.setItem("seleccionadoBoton", "H");
		if(localStorage.getItem("hotelB")=="BH")
		{
			$("#ta").val("buscador");
		}
		if(valueSession==1)
		{
			$("#ta").prop("value","buscador");
		}
	});
	/**
	 * Paginacion de Resultados
	 *  
	 * @param int $motrar elementos a mostrar por pagina.
	 */
	function paginacion (mostrar)
	{
		$("div.holder").jPages(
		{
			containerID : "fichasHoteles",
			perPage :mostrar,
			midRange :8,
			previous :idioma.anterior,
			next:idioma.siguiente,
			animation:"fadeIn",
		});	
	}

	/**
	 * Funcion para validar cuando se aplique RW x habitacion
	 */
	$(document).on("click",".ARW", function()
	{
		var t = $(this);
		var c = t[0].checked;
		codigoHotel = $(this).data("hotelcode");
		if( c == true ){ $(this).attr("value",1); $("label.ARW_"+codigoHotel).addClass("withRw");}
		else{ $(this).attr("value",0); $("label.ARW_"+codigoHotel).removeClass("withRw"); }
	});

	/* ... Validaciones Habitaciones ... */
	
	$(document).on("click",".validarRadio",function()
	{
		var pref = models.openMap ? 'map-' : '' ;
		let v = $(this).val(),
			datox = $(this).data("code").split("__"),
			b = $(this).data("code"),
			codigoHotel = $(this).data("hotelcode"),
			td = datox[0]+"__"+datox[1]+"__"+datox[3];
			datox.push($(this).data("token"));
			$.ajax(
				{
					url:models.url+"_assets/_controllers/handleRoom.php",
					type:"POST",
					data:{ datos :datox}
				});
		
		if( $('input[name="habitacion_'+v+'_'+codigoHotel+'"]').is(':checked') )
		{
			if( datox[4] == "S" )
			{	
				$( "#agregar_"+datox[0] ).attr("disabled",false).removeClass("btnOff").addClass("btnOn");

				tempCodes = [];
			}
			else
			{	
				var actual = $(this).closest("div.contenedorHabitaciones");
				$("body").find("div#"+pref+"mostrar"+datox[0]).find(".imgCheck_"+v+'_'+codigoHotel).removeClass("ocultar").addClass("mostrar");

				actual.find("div.tabHab_"+datox[1]).removeClass("tabActiva").addClass("activochecked");
				tempCodes.push( td );
				let limpio = eliminateDuplicates( tempCodes );
				let c=0;
				
				for( let i=0; i<limpio.length; i++)
				{
					let s = limpio[i].split("__");
					
					if( s[0] == datox[0]){ c++; }
					if( s[0] == datox[0] && c == $("#rooms").val() )
					{
						
						// if ( c == $("#rooms").val() )
						// {
							$( "#agregar_"+datox[0] ).attr("disabled",false).removeClass("btnOff").addClass("btnOn");
							tempCodes = [];
						// }
					}
					
				}
			}
		}else {
			alert('You must select an option.');
		}
	});

	/**
	 * 	Funcion para mostrar/ocultar informaciond de los Rooms por tabs.
	 */
	$(document).on("click", ".informacionHabitacion ", function()
	{
		var pref = models.openMap ? 'map-' : '' ;
		let th = $(this).data("hab").split("__"),
			body = $("body").find("div#"+pref+"mostrar"+th[1]);
		body.find(".contenedorIndividual").hide();
		body.find(".informacionHabitacion").removeClass("tabActiva");
		
		body.find(".hab_"+th[0]).show();
		body.find(".tabHab_"+th[0]).addClass("tabActiva");
	});

	$(document).on("click",".info",function(){
		tempCodes = [];
		$.ajax(
			{
				url:models.url+"_assets/_controllers/handleRoom.php?t="+(new Date()).getTime(),
				type:"POST",
				data:{ datos :0}
			});
		let tabsData = $(this).data("tabs").split("__");
		tabsData.push(models.net);
		tabsData.push(models.token);
		$("body").trigger("validaCheckRW");
		///////captura los valores y los registra en las siguientes variables
		var val = $(this).data('val');
		var url = $(this).data('url');
		var accion = $(this).data('accion');
		var pref = models.openMap ? 'map-' : '' ;
		if (url == "tarifasstays"){
			$(".btabs"+val).removeClass("activo");
			$("#b"+val+"tarifas").addClass("activo");
			$('html,body').animate({
				scrollTop: $("#hotelito_"+val).offset().top-200
			}, 2000);
			$("#working"+val).slideUp();	
			$("#mostrar2"+val).show();
			$("#mostrar"+val).hide();
			$("#ultratabs"+val).slideDown();
		} else if (url == "ultratabs"){
			if(accion == "show"){
				
				$("#mostrar"+val).show();
				$("#mostrar2"+val).hide();
				$('html,body').animate({
					scrollTop: $("#hotelito_"+val).offset().top-200
				}, 2000);
				$("#"+url+val).slideDown();
				$(".btabs"+val).removeClass("activo");
				$("#working"+val).slideDown();	
				$("#b"+val+"tarifas").addClass("activo");
				$.ajax({
					type: "POST",
					url: models.url+"_assets/_controllers/tarifas.php",
					data: {"code" : val},	
					dataType:"text",
					success:function(texto){
						$("#mostrar"+val).html(texto);
						$(".btabs"+val).removeClass("activo");
						$("#b"+val+"tarifas").addClass("activo");
						$("#working" + val).slideUp();
						$("body").trigger("validaCheckRW");
					},
				})
			}
			if(accion == "hide"){
				//$("#" + url + val).slideUp();
				$("#"+pref+"mostrar"+val).html("");
				$(".btabs" + val).removeClass("activo");
			}
		} else if(url == "cargamanual"){
			$("body").trigger("validaCheckRW");
			$("#mostrar"+val).show();
			$("#mostrar2"+val).hide();
			if(accion=="show") {
				$("#habitacion"+val).slideDown();
			}
			if(accion == "hide") {
				$("#habitacion"+val).slideUp();
			}
		} else if(url == "ubicacion") {
			$("#mostrar"+val).show();
			$("#mostrar2"+val).hide();
			$("#working"+val).slideDown();
			$.ajax({
				type: "POST",
				url: models.url+"_assets/_controllers/"+url+".php",
				data: {"code" : val, tab: tabsData},	
				dataType:"html",
				success:function(texto){
					$("#mostrar"+val).html(texto);
					$(".btabs"+val).removeClass("activo");
					$("#b"+val+url).addClass("activo");
					$("#working"+val).slideUp();
					var cords = $("#coord"+val).prop("value");
					   cords = cords.split(",");
					$("#mapaCentral"+val).gmap3({
						map:{
							options:{
								center:[cords[0],cords[1]],
								zoom:15,
								mapTypeId: google.maps.MapTypeId.ROADMAP,
								mapTypeControl: false,
								mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU },
								navigationControl: {style: google.maps.NavigationControlStyle.SMALL},
								scrollwheel: true,
								  streetViewControl: true
							}
						},
						marker:{
							values:[{ latLng:[cords[0],cords[1]], data:"Hotel "+cords[2] }],
							options:{ draggable:false}
						}
					});
					   
				},
			})
			
			.fail(function(){  		
				alert(idioma.comparador.alerta);
			}) 
			.always(function(){
				$(".btabs"+val).removeClass("activo");
				$("#b"+val+url).addClass("activo");
			});
		} else {
			$("#"+pref+"mostrar"+val).html("");
			$("#"+pref+"mostrar"+val).show();
			$("#"+pref+"mostrar2"+val).hide();
			$("#"+pref+"working"+val).slideDown();
			$("#"+pref+"ultratabs"+val).slideDown();
			$.ajax({
				type: "POST",
				url: models.url+"_assets/_controllers/"+url+".php",
				data: {"code" : val, tab: tabsData},	
				dataType:"html",
				success:function(texto){
					$("#"+pref+"mostrar"+val).html(texto);
					$(".btabs"+val).removeClass("activo");
					$("#"+pref+"b"+val+url).addClass("activo");
					$("#"+pref+"working"+val).slideUp();
				},
			})
			.fail(function(){  		
				alert(idioma.comparador.alerta);
			})
			.always(function(){
				$(".btabs"+val).removeClass("activo");
				$("#"+pref+"b"+val+url).addClass("activo");
					$("body").trigger("validaCheckRW");
			});
		}
	});

	/**
	 * Toggle para Cancelar.
	 */
	$(document).on("click",".infoCancelar",function()
	{
		$( ".dataCancelar" ).slideToggle( "slow");
	});

	/**
	 * 	Procesa data para cancelar.
	 */
	$(document).on("click",".btnCancelar",function()
	{
		if( $("#cancelarData").val() != "" )
		{
			$.ajax({
				type: "POST",
				url: models.url+"_assets/_controllers/dataCancelar.php",
				data: {"code" : $("#cancelarData").val() }
			}).done( function (res)
			{
				alert( res );
			});
		}
		else
		{
			alert("Enter information to continue.");
		}
	});
	$(window).scroll(function() {
	//	console.log($(window).scrollTop(),$(document).height() ,$(window).height());
    

    if(($( document ).height()-$(window).scrollTop())< ($( window ).height()+$("div#footer2").height())) {
    	if((models.itemsTotal>0 && models.itemsTotal>models.itemsActual) && models.pintando==0 && models.openMap == false && models.bandCargandoFiltro == false){
    		$("#frame").show();
    		$("#loading").show();
    		models.pintando=1;
    		setTimeout(function() {
    			if(models.openMap == true){
		    		$("#frame").hide();
		    		$("#loading").hide();    				
	    			models.pintando=0;
    			}else{    				
	    			models.dibujaHoteles();
	    			models.pintando=0;
    			}
    		},2000);
            
    	}
    	//if(models.itemsTotal > 1)
    		//$("#bannerT").css("display", "none");
    }
});

	/*$('#loadingSearchH').owlCarousel({
	    items:1,
	    loop:true,
	    margin:10,
	    autoplay:true,
	    autoplayTimeout:4000,
	    autoplayHoverPause:true
	});*/

	$("#progress").progressbar({
      change: function() {
        $( "#progress-label" ).text( $("#progress").progressbar( "value" ) + "%" );
      },
      complete: function() {
        $( "#progress-label" ).text( "100%" );
      }
    });

    models.progressBarE = $("#progress");
});

function getVarsUrl()
{
    var url= location.search.replace("?", "");
    var arrUrl = url.split("&");
    var urlObj={};   
    for(var i=0; i<arrUrl.length; i++){
        var x= arrUrl[i].split("=");
        urlObj[x[0]]=x[1]
    }
    return urlObj;
}


/**
 * [validaBusquedaHotel Valida los inputs que no se encuentren vacios.
 * @return {[True/False]} Regresa True si los campos estan Ok | Retorna False cuando falte un dato
 */
function validaBusquedaHotel()
{
	var ban=true;
	var banDestinos=true;
	var banNinios=true;
	// Por el momento solo estamos validando numericos y strings de los inputs
	// ["clase/id input"."tipo:str-num"]
	var strInput = ["#destino.str","#citycode.str","#startDate.str","#endDate.str","#rooms.num"];

	for (var ix = 0; ix < strInput.length; ix++) {
		var items 	= strInput[ix].split(".");
		nameInput 	= items[0];
		strType 	= items[1];
		valorDefault = (strType == "str") ? "" : 0 ;
		if($(nameInput).val()==valorDefault && ban){
			//console.log("Input Vacio:" + nameInput );
			if(ix==1 || ix==0){
				banDestinos=false;
			}
			ban = false;
			break;
		}
	}

	/**
	 * Validamos los niños de las habitaciones
	 */
	var totalHab = $("#rooms").val();
	for (var hab = 1; hab <= totalHab; hab++) {
		var totalNiHab = $("#nino_" + hab).val(); // Total de Niños por habitacion
		//console.log("Habitacion: " + hab + " Niños en Hab: " + totalNiHab);
		for (var ni = 1; ni <= totalNiHab; ni++) {
			//console.log("Edad Niño no seleccionada en la HAB:" + hab + " N° nino:" + ni);
			if( $("#edadNH_" + hab + "_" + ni).val() == "-" && ban ){
				// console.log("Edad Niño no seleccionada en la HAB:" + hab + " N° niño:" + ni);
				banNinios=false;
				ban = false;
				break;
			}
		}
	}

	if(!banDestinos){
		$(".alertGood,.alertBad").hide();
		$(".alertBad3").show();
		setTimeout(function() {$(".alertBad3").hide();},4000);
	}

	if(!banNinios){
		$(".alertGood,.alertBad").hide();
		$(".alertBad4").show();
		setTimeout(function() {$(".alertBad4").hide();},4000);
	}

	if(!ban && banDestinos && banNinios){
		$(".alertGood,.alertBad").hide();
		$(".alertBad2").show();
		setTimeout(function() {$(".alertBad2").hide();},4000);
	}
	return ban;
}

/**
 * Elimina elementos duplicados de un array
 * @param {array} arreglo para limpiar elementos duplicados.
 * @return {array} Regresa un arreglo limpio
 */
function eliminateDuplicates(arr)
{
	var i,
		len=arr.length,
		out=[],
		obj={};
	for (i=0;i<len;i++) { obj[arr[i]]=0; }
	for (i in obj) { out.push(i); }
	return out;
}


common.toDraw=function (str, objOriginal) {
        str = str.replace(/{[^{}]+}/g, function (key) {
        var temp = "";
        if (key.indexOf(".") < 0) {
            temp = objOriginal[key.replace(/[{}]+/g, "")] || "";
        } else {
            var keyArray = (key.replace(/[{}]+/g, "")).split(".");
            var obj2 = objOriginal;
                for (var i = 0; i < keyArray.length; i++) {
                if (obj2 && obj2.hasOwnProperty(keyArray[i])) {
                        if (i == (keyArray.length - 1)) { 
                            temp = obj2[keyArray[i]] || "";
                        } else { 
                        obj2 = obj2[keyArray[i]];
                    }

                } else {
                    break;
                }
            }

        }
        return temp;
    });
    return str;
};



models.hotels='<div id="hotelito_{id}" class="contenedorHotelesBusqueda animated fadeIn {encontrado}">'
+'<div id="hotel_0" class="contenedor_interno hotel">'
+'<div class="contenidoImagen effect2">'
+'<div>{descuento}'
+'<img class="masInformacion" src="{imagen}" onerror="models.imagenesDefault(this);" alt="{name}" data-val="{id}" data-url="galeria">'
+'<div class="estrellasHotel">{estrellas}</div></div></div>'
+'<div class="contenedor_informacion contprin"><div class="contenedor_informacion_centro">'
+'<div class="header"><div class="titles"><div class="nombre"> {name} </div>'
+'<div class="liston base-liston"><div  class="texto"> <span class="sub" style="font-size: 14px;">'+divisa.simbolo+'</span> {precioPorNoche} <span class="top" style="font-size: 11px;vertical-align: super;">'+divisa.moneda+'</span><br><span style="font-size: 14px;display: block;">'+idioma.comparador.priceby+' </span><span style="font-size: 14px;display: block;">'+idioma.comparador.night+'</span></div></div></div>'
+'<div class="titles"><div class="fechas">'+idioma.comparador.fecha+' {fechas} </div></div></div>'
+'<div><span class="ubica">'+idioma.comparador.destino+'</span> {destino} </div> '
+'<div class="descrip" data-val="{id}" data-url="informacion">{HotelDescription}</div></div></div>'
+'<div class="contenedor_precio">'
+'<div class="informacionPrecios">'
+'<div class="tituloPrecios"><div class="tituloPrice"><span class="tituloPrice">'+idioma.comparador.promedioBW+'</span><span class="tax">'+idioma.comparador.incluidos+'</span></div>{nuevoPrecio}'
+'{save}'
+'<div class="public naranja" >'+idioma.comparador.socios+': <span class="izq">{precioSocio} </span></div> '
+'</div></div>{tooltipXDXDXD}</div></div>'
+'<div class="ultratabs" id="ultratabs{id}">'
+'<div class="menuHotels">'
+'<ul class="tabs">'
+'<li id="b{id}informacion" class="btabstab info btabs{id}" data-val="{id}" data-url="informacion" data-accion="show" data-tabs="{dataTabs}">'+idioma.comparador.info+'</li>'
+'<li id="b{id}tarifas" class="btabstab info btabs{id}" data-val="{id}" data-url="tarifas" data-accion="show" data-tabs="{dataTabs}">'+idioma.buscador.cuartos+'</li>'
+'<li id="b{id}ubicacion" class="btabstab info btabs{id}" data-val="{id}" data-url="ubicacion" data-accion="show" data-tabs="{dataTabs}">'+idioma.comparador.locacion+'</li>'
+'<li id="b{id}galeria" class="btabstab info btabs{id}" data-val="{id}" data-url="galeria" data-accion="show" data-tabs="{dataTabs}">'+idioma.comparador.galeria+'</li>'
+'<li class="btabstab info" data-val="{id}" data-url="ultratabs" data-accion="hide" data-tabs="{dataTabs}">'+idioma.comparador.cerrar+'</li>'
+'<div class="limpiar"></div>'
+'</ul></div><div id="working{id}" class="working" style="display:none;">'
+'<span class="parpadea">'+idioma.comparador.parpadea+'</span>'
+'</div><div id="mostrar{id}" class="mostrar"></div>'
+'</div></div>';

models.hotelMap = `<div class="contenedorX">
						<div id="basic_information">
					        <div class="content_image effect2">
					            <div>
					                <div class="discount"></div>
					                <div class="discount2">
					                	<span>{mapPorcentajeAhorro}</span>
					                </div>
					                <img class="masInformacion" src="{imagen}" onerror="models.imagenesDefault(this);" alt="{name}" data-val="{id}">
					            </div>
					        </div>
					        <div id="basic_hotel_information">
				            	<div id="basic_info_tittle">{name}</div>
					            <div class="starsHotel">
					            	{estrellas}
					            </div>
					            {mapPrecioPublico}
					            {mapUstedAhorra}
					            {mapMemberPrice}
					            <span class="" id="btn_showInformation" onclick="models.showMoreInformation()" style="align-items: center;background: rgb(0,193,186);border-radius: 5px !important;color: #fff;cursor: pointer;display: inline-flex;justify-content: center;margin: 4px;width: 50%;height: 2em;">`+idioma.comparador.verdetalles+`</span>
				        	</div>
						</div>
					</div>
					<div id="popup_hotel" style="display:none">													
						<div id="hotelito_{id}" class="containerHotelSearch animated fadeIn">
							<div id="hotel_0" class="container_interno hotel_search">
								<div class="content_image effect2">
									<div>
										<div class="discount"></div>
										<div class="discount2">
											<span>{mapPorcentajeAhorro}</span>
										</div>
										<img class="moreInformation" src="{imagen}" onerror="models.imagenesDefault(this);" alt="{name}" data-val="{id}" data-url="galeria">
										<div class="estrellasHotel" style="text-align:center;">{estrellas}</div>
									</div>
								</div>
								<div class="container_information contprin">
									<div class="container_information_center">
										<div class="header">
											<div class="titles">
												<div class="name_hotel"> {name} </div>
												<div class="liston_pop base-liston_pop">
													<div  class="text"> 
														<span class="sub" style="font-size: 14px;">${divisa.simbolo}</span> {precioPorNoche} <span class="top" style="font-size: 10px;vertical-align: super;">`+divisa.moneda+`</span>
														<br><span style="font-size: 11px;display: block;">`+idioma.comparador.priceby+` </span><span style="font-size: 11px;display: block;">`+idioma.comparador.night+`</span>
													</div>
												</div>
											</div>
											<div class="titles">
												<div class="dates">`+idioma.comparador.fecha+` {fechas} </div>
											</div>
										</div>
										<div><span class="ubication">`+idioma.comparador.destino+`</span> {destino} </div>
										<div class="description" data-val="{id}" data-url="informacion">{HotelDescription}</div>
									</div>
								</div>
								<div class="container_price">
									<div class="information_price">
										<div class="tittle_prices">
											<div class="tittle_price">
												<span class="tittle_price">`+idioma.comparador.promedioBW+`</span>
												<span class="taxes">`+idioma.comparador.incluidos+`</span>
											</div>
											{mapPrecioPublico2}
					            			{mapUstedAhorra2}
											<div class="public_price naranja" >`+idioma.comparador.socios+`: <span class="left">{precioSocio} </span></div>
										</div>
									</div>
									{tooltipXDXD}
								</div>
							</div>
							<div class="ultratabs" id="map-ultratabs{id}">
								<div class="menuHotels">
									<ul class="tabs">
										<li id="map-b{id}informacion" class="btabstab info btabs{id}" data-val="{id}" data-url="informacion" data-accion="show" data-tabs="{dataTabs}">`+idioma.comparador.info+`</li>
										<li id="map-b{id}tarifas" class="btabstab info btabs{id}" data-val="{id}" data-url="tarifas" data-accion="show" data-tabs="{dataTabs}">`+idioma.buscador.cuartos+`</li>
										<li id="map-b{id}galeria" class="btabstab info btabs{id}" data-val="{id}" data-url="galeria" data-accion="show" data-tabs="{dataTabs}">`+idioma.comparador.galeria +`</li>
										<li class="btabstab info" data-val="{id}" data-url="ultratabs" data-accion="hide" data-tabs="{dataTabs}">`+idioma.comparador.cerrar+`</li>
										<div class="limpiar"></div>
									</ul>
								</div>
								<div id="map-working{id}" class="working" style="display:none;">
									<span class="parpadea">`+idioma.comparador.parpadea+`</span>
								</div>
								<div id="map-mostrar{id}" class="mostrar">
									<style>
										.info-header {
											color: var(--colorBeyond);
											font-size: 1.2em;
											padding: 0.5em .0em;
										}
									</style>
								</div>
							</div>
						</div>
					</div>`;

models.dibujaHoteles=function(){
	if(models.openMap == true)
		return false;

	var i= models.itemsActual;
	if(i==0){
		$("#listado").html("");
	}
	for( ;i<(models.itemsActual+models.items) && i<models.itemsTotal;i++){
	    var hotel=	models.listaActual[i];	  
		if(hotel == undefined){
			setTimeout(function(){
				models.dibujaHoteles();
    			models.pintando=0;
			}, 1000);
			return false;
		}
		if(hotel.id == 0)
			break;
	    $("#listado").append(common.toDraw(models.hotels,hotel));
	    models.cargadescripcion(i);
	    models.creaTooltips($(".tooltip"+hotel.id));
	}
	models.itemsActual=i;
	$("#frame").hide();
	$("#frame2").hide();
	$("#listado").show();
};
	
models.convertirEstrella =function( estrella ){
        var numero =0, star ="", half ="",
        media = '<img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0ZWQgYnkgSWNvTW9vbi5pbyAtLT4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNiAxNiI+CjxwYXRoIGZpbGw9IiNkNzc1MDgiIGQ9Ik0xNS45IDYuMmwtNS41LTAuOC0yLjQtNS0yLjQgNS01LjUgMC44IDMuOSAzLjgtMC45IDUuNCA0LjktMi41IDQuOSAyLjYtMC45LTUuNSAzLjktMy44ek04IDExLjh2LTkuMWwxLjggMy42IDQgMC42LTIuOSAyLjggMC43IDQtMy42LTEuOXoiLz4KPC9zdmc+Cg==" />';
        numero=parseInt((""+(estrella)?""+estrella:"0")[0]);
        if(estrella>parseInt(""+10))
        	half = 1;
        for( var  a=1; a<=numero; a++){
            star += '<img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQ3NS4wNzUgNDc1LjA3NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc1LjA3NSA0NzUuMDc1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTQ3NS4wNzUsMTg2LjU3M2MwLTcuMDQzLTUuMzI4LTExLjQyLTE1Ljk5Mi0xMy4xMzVMMzE1Ljc2NiwxNTIuNkwyNTEuNTI5LDIyLjY5NGMtMy42MTQtNy44MDQtOC4yODEtMTEuNzA0LTEzLjk5LTExLjcwNCAgIGMtNS43MDgsMC0xMC4zNzIsMy45LTEzLjk4OSwxMS43MDRMMTU5LjMxLDE1Mi42TDE1Ljk4NiwxNzMuNDM4QzUuMzMsMTc1LjE1MywwLDE3OS41MywwLDE4Ni41NzNjMCwzLjk5OSwyLjM4LDguNTY3LDcuMTM5LDEzLjcwNiAgIGwxMDMuOTI0LDEwMS4wNjhMODYuNTEsNDQ0LjA5NmMtMC4zODEsMi42NjYtMC41Nyw0LjU3NS0wLjU3LDUuNzEyYzAsMy45OTcsMC45OTgsNy4zNzQsMi45OTYsMTAuMTM2ICAgYzEuOTk3LDIuNzY2LDQuOTkzLDQuMTQyLDguOTkyLDQuMTQyYzMuNDI4LDAsNy4yMzMtMS4xMzcsMTEuNDItMy40MjNsMTI4LjE4OC02Ny4zODZsMTI4LjE5Nyw2Ny4zODYgICBjNC4wMDQsMi4yODYsNy44MSwzLjQyMywxMS40MTYsMy40MjNjMy44MTksMCw2LjcxNS0xLjM3Niw4LjcxMy00LjE0MmMxLjk5Mi0yLjc1OCwyLjk5MS02LjEzOSwyLjk5MS0xMC4xMzYgICBjMC0yLjQ3MS0wLjA5Ni00LjM3NC0wLjI4Ny01LjcxMmwtMjQuNTU1LTE0Mi43NDlsMTAzLjYzNy0xMDEuMDY4QzQ3Mi42MDQsMTk1LjMzLDQ3NS4wNzUsMTkwLjc2LDQ3NS4wNzUsMTg2LjU3M3oiIGZpbGw9IiNmZDczM2MiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />';
        }
        if( half == 1 ){ 
        	star= star +media;}
        return star;
};

models.convertirMoneda =function( cantidad ){
	var cambioMoneda = divisa.tipoCambio * cantidad;
	// return models.simbolo+" "+cantidad.formatMoney()+" "+models.moneda;
	return `${divisa.simbolo} ${cambioMoneda.formatMoney()} ${divisa.moneda}`;
}

models.convertirSinMoneda =function( cantidad ){
	return models.simbolo+" "+cantidad.formatMoney();
}

models.convertirMonedaNoSimbolos = function (cantidad){
	var cambioMoneda = divisa.tipoCambio * cantidad;
	return cambioMoneda.formatMoney();
}

models.cargaMasHoteles =  function(){
	if(models.itemsTotal <= 50 ){
		if(models.itemsTotal>= 1 ){
			$("#filtrosSection").show();
		}
		return 0;
	}
	if(models.secciones>models.seccionActual){
		models.seccionActual+=1;
		var last=JSON.stringify({token :models.token, posicion: models.seccionActual});
		if(models.token!=0  ){
		$.ajax(
			{
				url:models.url+"_assets/_controllers/buscadorHotel.php",
				dataType:"json",
				method :"POST",
				data: {token :models.token, posicion: models.seccionActual},
				success: function(data)
				{
					if(models.secciones==models.seccionActual){
						$("#filtrosSection").show();
					}
					data.hoteles = models.agregarTax(data.hoteles); 
					for (var i = data.hoteles.length - 1; i >= 0; i--) {
						data.hoteles[i].name = models.limpiaTexto(data.hoteles[i].name); 						
					}
					models.listaActual=models.listaActual.concat(data.hoteles);
					models.listaRespaldo=models.listaRespaldo.concat(data.hoteles);
					if(models.secciones>models.seccionActual){
						models.cargaMasHoteles();
					}
					$(".working").slideUp();
				}
			});
		}
	}
};

models.limpiaOtas =  function(otas) {
	for (var i = otas.length - 1; i > 0; i--) {
		for (var j = otas.length - 2; j >= 0; j--) {
			if(otas[i].OTALink == otas[j].OTALink &&  otas[i].Total != otas[j].Total){
				if(otas[i].Total > otas[j].Total){
					otas.splice(i,1);
					i--;
				}
			}
		}
	}
return otas;
}
                      
models.creaTooltips=function($element) {
    $element.tooltipster({
        theme: 'tooltipster-shadow',
        animation: 'fade',
        interactive: true,
        side: 'left',
        trigger: 'custom',
		onlyOne: true,
        triggerOpen: {
            click: true,
        },
        triggerClose:{
            mouseleave: true,
        },
        zIndex: 1,
        contentAsHTML: true,
        functionReady: function(instance, helper) {

        }
	});                  
}

models.actualizaOtas=function(otas){
    var listaN=models.duplicarObjetos(models.Otas,true);
    var indice=otas.length-1;
    var lista=[];

    for (var j = 0; j < otas.length; j++) {
        if((otas[indice].Total<otas[j].Total ) && j>0){
            indice=j;
        }
        var ota=otas[j];
        var obj={};

   		obj.nombre=models.nombreOta(ota.OTALink).toLowerCase();
        obj.tarifa_x_noche_publico= ota.tarifa_x_noche_publico;
        obj.uid=ota.uid;
        obj.total=ota.Total;
        obj.porcentajeAhorro=ota.porcentajeAhorro;
        obj.tax=ota.Tax;
        lista.push(obj);
    }

    for (var i = 0; i <listaN.length &&  lista.length<6 ; i++) {
 		var obj=listaN[i];
 		var esta=0;
        for (var j = 0; j < lista.length; j++) {
       		var obj2=lista[j];
       		if(obj.nombre.toLowerCase()==obj2.nombre.toLowerCase()){
       			esta=1;
       		}
		}	
	        
        if(esta==0){
            var ota=otas[indice];
            var incremento=(Math.random()*(10))+10
            obj.tarifa_x_noche_publico= ota.tarifa_x_noche_publico+incremento;
            obj.total=ota.Total+incremento;
            obj.tax=obj.total*.16;
            //obj.tax=obj.total*((Math.floor(Math.random()*((24-1)-16))+16)/100);
            obj.porcentajeAhorro=ota.porcentajeAhorro;
            obj.tax=ota.Tax;
            lista.push(obj);
        }
    }

    lista.sort(function (a, b) {
      if (a.tarifa_x_noche_publico > b.tarifa_x_noche_publico) {
        return -1;
      }
      if (a.tarifa_x_noche_publico < b.tarifa_x_noche_publico) {
        return 1;
      }
      return 0;
    });
    return lista;
};

models.duplicarObjetos = function (o, flag) {
	return jQuery.extend(true, (flag ? [] : {}), o);
};

models.cargadescripcion= function (i){
	var hotel=models.listaActual[i];

	if(hotel.HotelDescription == ""){
		$.ajax(
			{
				url:models.url+"_assets/_controllers/buscadorHotelDetalles.php?Code="+hotel.code+"&HotelProvider="+hotel.BookingSource+"&Id="+hotel.id+"&net="+models.net,
				dataType:"json",
				method :"POST",
				data: {token :models.token, posicion: models.listaActual.length},
				success: function(data){ 
					var descripcion=models.limpiaTexto(data.description);
					descripcion = descripcion.split(" ");
					var temp="";
					if(descripcion.length<=models.longitudDescripcion){
						temp = descripcion.join(" ");						
					}else{
						for (var i = 0; i <=models.longitudDescripcion ; i++) {
							temp+=descripcion[i]+" ";
						}
						temp += "...";
					}
					$(".descrip","#hotelito_"+data.code).html('<span class="ubica">'+idioma.buscador.titulo12+':</span> '+temp);
					$(".description","#hotelito_"+data.code).html('<span class="ubica">'+idioma.buscador.titulo12+':</span> '+temp);
					hotel.HotelDescription = temp;
				}
		});
	}

}
models.muestraBusqueda=function(){
	models.goSearchBox = true;
	$(".buscadorh [type=text], .buscadorh select").removeAttr("disabled");
	$(".cubiertoNino").trigger('change');
	$("#cajaReserva").removeClass("menu-fixed");
	$("#navFilter").css("position", "unset");
	$('body, html').animate({ scrollTop: '0px'}, 300, function() { models.goSearchBox = false; });
	$("#cajaReserva").show("slow");
}

models.ocultaBusqueda=function(){
	$("#navFilter").css("position", "fixed");
	$("#cajaReserva").hide("slow");
	models.goSearchBox = false;
}
models.muestraFiltros=function(){
	$(".filtrosTexto","#prit").hide("slow");
	if(models.listaActual.length>0){
		$("#filtrosSection").show("slow");
	}
}
models.creaTextoBusqueda=function(){
	var div=$(".buscadorTexto");
	var forma=$("#formHoteles");
	var cuartos=$("#totalHab",forma).val()
	var destino=$("#destino",forma).val()
	var checkIn=$("#startDate",forma).val()
	var checkOut=$("#endDate",forma).val()
	var totalAdultos=0;
	var totalNinios=0;
	var adultos=$("select[id^=adultos_]","#formHoteles");
	var ninios=$("select[id^=nino_]","#formHoteles");
	for (var i = 0; i < adultos.length; i++) {
		totalAdultos+=parseInt($(adultos[i]).val())
	}
	for (var i = 0; i < ninios.length; i++) {
		totalNinios+=parseInt($(ninios[i]).val());
	}
	$('.habitaciones',div).html(cuartos+" "+((cuartos>1? idioma.buscador.cuartos2:idioma.buscador.cuarto)));
	$('.destination',div).html(destino);
	$('.from',div).html(checkIn);
	$('.adults',div).html(totalAdultos+" "+idioma.buscador.titulo4);
	if(totalNinios>0){
		$('.children',div).html(" "+totalNinios+" "+(totalNinios>1? idioma.buscador.ninios: idioma.buscador.ninio));
	}else{
		$('.children',div).html('0 '+idioma.buscador.ninio);
	}
	$('.to',div).html(checkOut);
	div.show("slow");
	var listaEstrellas = models.hotelesFiltros.map(function(obj){return parseInt((""+(obj.categoryName)?""+obj.categoryName:"0")[0]) }).filter(function(item,pos,self){return self.indexOf(item) == pos;});	
	$("#starselect").find("option:gt(0)").hide();
	listaEstrellas.forEach(function(e, i){		
		$("#starselect .start"+e).show();
	});
}

models.filtraHoteles = function(){
	var stars = parseInt($("#starselect").val());
	var hotel = $("#nh").val().trim();
	if(isNaN(stars) == true && hotel == "" && models.bandFiltro == false)
		return false;
/*
	models.listaFiltrada = models.duplicarObjetos(models.listaRespaldo, true);
	var filterStars = [3, 4, 5, 6];
	
	if(filterStars.includes(stars)){
		models.listaFiltrada = models.listaFiltrada.filter(function(i) {
			numero=parseInt((""+(i.categoryName)?""+i.categoryName:"0")[0]);
		    return numero == stars;
		});
	}
	if(hotel.length > 0){
		models.listaFiltrada = models.listaFiltrada.filter(function(i) {
		    return i.name.toLowerCase().indexOf(hotel.toLowerCase()) >= 0;
		});
	}
	if (models.listaFiltrada.length == 0) {
		//$(".alertBad").show();
		//setTimeout(function() { $(".alertBad").hide(); },5000);
	}
*/
	var filterStars = [3, 4, 5, 6];
	var r = [];
	if($("#hotelSel").val() != ""){
		r= models.listaActual.filter(function(i){return i.code == $("#hotelSel").val()});
	}
	if(r.length == 0){
		if (models.listaRespaldo.length < models.hotelesFiltros.length) {
			setTimeout(function(){
				models.filtraHoteles();
			}, 4000);
				models.bandCargandoFiltro = true;
			models.bandFiltro = true;
			$("#listado").hide("slow");
			$("#navFilter").css("position", "fixed");
			$("#frame").show();
			$("#loading").show();
			return false;
		}else{
				models.bandCargandoFiltro = false;
				models.listaFiltrada = models.duplicarObjetos(models.listaRespaldo, true);
		}
	}else{
		$("#hotelSel").val("");
		models.listaFiltrada = models.duplicarObjetos(models.listaActual, true);
	}

	if(filterStars.includes(stars)){
		models.listaFiltrada = models.listaFiltrada.filter(function(i) {
			numero=parseInt((""+(i.categoryName)?""+i.categoryName:"0")[0]);
		    return numero == stars;
		});
	}
	if(hotel.length > 0){
		models.listaFiltrada = models.listaFiltrada.filter(function(i) {
		    return i.name.toLowerCase().indexOf(hotel.toLowerCase()) >= 0;
		});
	}

	if(models.listaFiltrada.length>0){
		models.listaActual = models.duplicarObjetos(models.listaFiltrada, true);
		models.itemsActual = 0;
		models.itemsTotal = models.listaActual.length;
		
	}else{
		
		if ( !$("#noResultsText2").length ) {
			$("#listado").prepend(`<span id="noResultsText2" class="alertBad alert" 
		style="width: 100% !important;display: flex;margin-bottom: 1em;flex-direction: column;position: relative; float:none;">${idioma.buscador.coincidencias}</span>`);
		  }
		  $("#noResultsText2").show();
			// setTimeout(, 2000);
	
			setTimeout(function(){
				$("#noResultsText2").hide("slow")
			},3500); 
		
		

	}

	$("#totalResultados").text(models.itemsTotal);
		//models.ordenaHoteles();
		models.dibujaHoteles();
	
	$('html, body').animate({scrollTop:10}, 'slow');
	//models.creaTextoFiltros();

	if(!isNaN(stars) == true || hotel != "" ){
		models.bandFiltro = true;
	}else{
		models.bandFiltro = false;
	}

	if(models.listaActual.length == 0){
		//$("#showMap").addClass("showMapDisabled");
		$('#showMap').attr('style', 'cursor: default;color: #666666 !important;background-color: #cccccc;');
	}else{
		$('#showMap').attr('style', '');		
	}
	return false;
}

models.creaTextoFiltros=function(){
	var div=$(".filtrosTexto");
	var forma=$("#filtrosSection");
	var estrellas=$("#starselect",forma).val();
	var hotel=$("#nh",forma).val()
	if(estrellas){
		$(".filtroEstrallas",div).html('<i class="icon-star" style="color: rgb(215, 117, 8);"> </i>'+estrellas+' Stars');
	}else{
		$(".filtroEstrallas",div).html('<i class="icon-star" style="color: rgb(215, 117, 8);"></i>');
	}

	if(hotel){
		$(".filtroHotel",div).html(' | <i class="icon-building" style="color: rgb(215, 117, 8);"> </i>'+hotel+' ');
	}else{
		$(".filtroHotel",div).html(' | <i class="icon-building" style="color: rgb(215, 117, 8);"> </i>');
	}

	if(hotel){
		forma.hide("slow");
		div.show("slow");
	}
	else{
		div.hide("slow");
		forma.show("slow");
	}
}

models.ordenaHoteles = function(){
	if(models.listaActual.length == 0)
		return false;

	var bandOtas = (models.listaActual[0].OTA == null)?false:true;
	if(!bandOtas){
		models.listaActual.sort(function (a, b) {
			if (a.tarifa_x_noche_be > b.tarifa_x_noche_be) {
		    	return 1;
		   	}
	    	if (a.tarifa_x_noche_be < b.tarifa_x_noche_be) {
		    	return -1;
		    }
	    	return 0;
	    });
	}
}

models.limpiaTexto = function(cadena){
	return $("<div />").html(cadena).text()
}

models.decodeUtf8 = function(cadena){
	return decodeURIComponent(escape(cadena));
}

models.encodeUtf8 = function(cadena){
	return unescape(decodeURIComponent(cadena));
}

models.progressBar = function(){
	if(models.progressStatus == false){
		return false;
	}

    var val = models.progressBarE.progressbar( "option", "value" ) || 0;
 	var a = Math.random() * (3000 - 50) + 50;
 	var b = Math.floor(Math.random()*(5-1))+1;

 	if(100 - val > 5 )
    	models.progressBarE.progressbar( "option", "value", val + b );
 
  	if ( val < 94 ) {
    	setTimeout( models.progressBar, a );
  	}
}

models.imagenesDefault = function(image){
	var img = [
	  "_assets/_images/nodisponible/hotel-img-default1.jpg",
	  "_assets/_images/nodisponible/hotel-img-default2.jpg",
	  "_assets/_images/nodisponible/hotel-img-default3.jpg",
	  "_assets/_images/nodisponible/hotel-img-default4.jpg",
	  "_assets/_images/nodisponible/hotel-img-default5.jpg",
	  "_assets/_images/nodisponible/hotel-img-default6.jpg",
	  "_assets/_images/nodisponible/hotel-img-default7.jpg",
	  "_assets/_images/nodisponible/hotel-img-default8.jpg",
	  "_assets/_images/nodisponible/hotel-img-default9.jpg"
	];
	if(models.imagenDefault == null || models.imagenDefault.length == 0){
		models.imagenDefault = models.duplicarObjetos(img, true);
	}

	var band = true;
	var a = "";
	while(band){
		var i = Math.floor(Math.random()*((models.imagenDefault.length-1)-0))+0;
		if(models.imagenDefault[i] != undefined){
			a = models.imagenDefault[i];
			models.imagenDefault.splice(i, 1);
			band = false;
		}
	}
	image.onerror = "";
    image.src = a;
    return true;
}

models.agregarTax = function(hoteles){
	var a = hoteles.length;
	for(i=0 ;i<a;i++){
		var tx = (Math.floor(Math.random()*(24-16+1)+16))/100;
		var aleatorio = Math.round(Math.random()*1);
		var matrizProbabilidad = [0.3, 0.7];
		var matriz = [0, tx];
		for (x=0; x<2; x++){
			if (Math.random()<matrizProbabilidad[x])
				tx = matriz[x];
		}
		hoteles[i].tax = hoteles[i].tarifa_x_noche_memb*tx;
	}
	return hoteles;
}

models.nombreOta = function(url){
	if(!url)
		return '';
	
    var hn;
    if (url.indexOf("//") > -1) {
        hn = url.split('/')[2];
    }else {
        hn = url.split('/')[0];
    }
    hn = hn.split(':')[0];
    hn = hn.split('?')[0];

	var parsed = psl.parse(hn);

	var name = parsed.domain.split('.');
    return (name[0])?name[0]:'';
}

models.ShowMoreOptNet = function(){
	var actual = $(this).closest("table");

	$("tr.ocultarctm",actual).show("slow");

	$(this).hide();
	$("div.NetOptHide",actual).show();
}
models.HideLessOptNet = function(){
	var actual = $(this).closest("table");

	$("tr.ocultarctm",actual).hide("slow");
	$(this).hide();
	$("div.NetOptShow",actual).show();
}
models.CargaHoteles = function(data){	
	$(".alertGood").hide();
	if(data.hotelesFiltros.length>0){
		data.hotelesFiltros = models.agregarTax(data.hotelesFiltros);
		for (var i = data.hotelesFiltros.length - 1; i >= 0; i--) {
			data.hotelesFiltros[i].name = models.limpiaTexto(data.hotelesFiltros[i].name);
		}
		models.hotelesFiltros=data.hotelesFiltros;
		for (var i = 0; i < data.secciones; i++) {
			models.hotelesSecciones.push([]);
		}
		models.token=data.token;
		models.net=data.net;
		models.secciones=data.secciones;
		models.itemsTotal=parseInt(""+data.total);
		models.destino=data.destino;
        models.cargaHotelesCache(1);
		setTimeout(function(){
            for (var i = 2; i <= models.secciones; i++) {
                models.cargaHotelesCache(i);
            }
        }, 2000);

		models.validacargaHoteles();
	}else{
		$("#frame2").hide();
		$(".alertBad").show("slow");
	}
	//$("#loading, #frame2").hide();
}

models.cargaHotelesCache =  function(seccion){
	var last={token :models.token, posicion: seccion};
	$.ajax({
			url:models.url+"_assets/_controllers/buscadorHotel.php",
			dataType:"json",
			method :"POST",
			data: last,
			success: function(data){
				data.hoteles = models.agregarTax(data.hoteles); 
				for (var i = data.hoteles.length - 1; i >= 0; i--) {
					data.hoteles[i].name = models.limpiaTexto(data.hoteles[i].name);
					var hotel=	data.hoteles[i];
					hotel.precioNoche=models.convertirMoneda(hotel.tarifa_x_noche_be);
						
					hotel.destino=models.destino;
					
					hotel.precioSocio =models.convertirMoneda(hotel.tarifa_x_noche_memb);
					var textOtas="";
					if(hotel.OTA){
						var otas=hotel.OTA//    
						hotel.OTASCalculadas=models.actualizaOtas(models.limpiaOtas(otas));
						hotel.textOtas ="<table style='width:100%;border-collapse: collapse;'><tr style='font-size:14px;text-align:center; color:#fff !important;background:#005464;border:0px'><td></td><td style=' color:#fff !important;background:#005464;border:0px'>"+idioma.comparador.porestancia+"</td><td style='font-size:14px;text-align:center; color:#fff !important;background:#005464;'>"+idioma.comparador.pornoche+"</td></tr>"+"<tr height='20' style='font-size:10px;'><th style='width:30%'></th><th style='width:30%; color:gray;'>"+idioma.comparador.preciosendolares+"</th><th style='width:30%;color:gray;'>"+idioma.comparador.preciosendolares+"</th></tr>";
							var indice=otas.length - 1;
							var otas=hotel.OTASCalculadas;
							for (var j = otas.length - 1; j >= 0; j--) {
								if((otas[indice].total>otas[j].total && otas[j].tarifa_x_noche_publico) && j>0){
									indice=j;
								}
								ota=otas[j];

								hotel.textOtas +="<tr height='22'><th style='width:30%'><a class='goOtaFancy' href='#popupComparador' target='_blank' data-href='"+ota.uid+"' alt='"+ota.nombre
							+"' id='"+ota.nombre+"' data-provider='"+ota.nombre+"'  data-ahorro='"+hotel.porcentajeAhorro+"' data-noches='"+hotel.noches+"' data-total='"+hotel.precioSocio+"'><span class='default _"+(ota.nombre).toLowerCase()+"'>"+(ota.nombre)+"</span> "+
							"</a></th><th style='width:35%'><strong style='padding-top: 0px;color:#005464;font-size: 110%;'>"+models.convertirSinMoneda(ota.tarifa_x_noche_publico)+"</strong></th><th style='width:35%'><strong style='padding-top: 0px;color:#005464;font-size: 110%;'>"+models.convertirSinMoneda(((ota.total-ota.tax)/hotel.noches))+"</strong></th></tr>";

						}
						hotel.textOtas +="</table>";
						hotel.porcentajeAhorro=otas[indice].porcentajeAhorro;
						hotel.tarifa_x_noche_publico=otas[indice].tarifa_x_noche_publico;
						hotel.tarifa_x_noche_publico=otas[indice].tarifa_x_noche_publico;
						hotel.precioPublicoNoche=models.convertirMoneda(otas[indice].tarifa_x_noche_publico);
						
					}

					if(hotel.hasOwnProperty("tarifa_x_noche_publico")){
						hotel.precioPublicoF = hotel.precioPublicoNoche;
						hotel.precioReward=models.convertirMoneda(hotel.tarifa_x_noche_publico - hotel.tarifa_x_noche_memb);
					}else{
						hotel.precioPublicoF = hotel.precioSocio;
					}
					
					hotel.porcentajeAhorroRound ="";
					hotel.lineaSave=""
					hotel.porcentajeAhorroRound="";
					hotel.tooltip="";
					hotel.precioPublicoText="";
					hotel.precioPublicoTextF="";
					 if(hotel.porcentajeAhorro>15 ){

					 	hotel.descuento='<div class="descuento"></div><div class="descuento2"><span>'+idioma.comparador.ahorra+' '+hotel.porcentajeAhorro+'%</span></div>'
					 	hotel.precioPublicoText= idioma.comparador.publico+':';
					 	hotel.precioPublicoTextF= hotel.precioPublicoF;
						hotel.porcentajeAhorroRound ='<li class="boldd">'+Math.round(hotel.porcentajeAhorro)+ " % </li>";
						hotel.lineaSave='<div class="lineaSave"></div>';
						hotel.save='<div class="save"> '+idioma.comparador.ustedAhorra+': <span  class="izq">'+hotel.precioReward+'</span></div> ';
						hotel.nuevoPrecio='<div class="public">'+idioma.comparador.publico+' <span  class="izq">'+hotel.precioPublicoTextF+'</span></div>'
					 	hotel.tooltip='<span  class="tooltipOtas tooltip'+hotel.id+'" title="'+hotel.textOtas+'"  style="align-items: center;background: rgb(0,193,186);border-radius: 5px !important;color: #fff;cursor: pointer;display: flex;justify-content: center;margin-top: 4px;width: 100%;float: right;display: flex;height: 2em;">'+idioma.comparador.comparar+'</span>'
					 }
					 if(hotel.porcentajeAhorro==0){
					 	// console.log(hotel.id,hotel.OTA);
					 }

					hotel.precioPorNoche=((hotel.tarifa_x_noche_memb/*-hotel.tax*/)/hotel.noches).formatMoney(0);
					temp = (hotel.tarifa_x_noche_memb/*-hotel.tax*/)/hotel.noches;
					hotel.precioPorNoche=models.convertirMonedaNoSimbolos(temp);
					hotel.fechas=$("#startDate").val()+' / '+$("#endDate").val();
					hotel.dataTabs= hotel["AvailToken"]+"__"+hotel["code"]+"__"+hotel["BookingSource"]+"__"+hotel["id"]+"__"+hotel["seccion"];
					hotel.HotelDescription="";
					hotel.estrellas=models.convertirEstrella (hotel.categoryName);
				}

				var falta = models.hotelesFiltros.length - (models.hotelesSecciones.reduce((a, b) => a + b.length, 0));
				models.hotelesSecciones[data.seccion-1]=data.hoteles;
				//SINO LLEGO LA SECCION RELLENAR CON ID HOTEL 0, Y VALIDAR EN EL PINTADO QUE NO APLIUQUE PARA´POSESION CERO
				if(models.secciones>1){
					falta = falta > 30 ? 30 : falta;					
					if(models.hotelesSecciones[data.seccion-1].length == 0){
						for (var i = 0; i <= falta; i++) {
							models.hotelesSecciones[data.seccion - 1][i].id = 0;
						}
					}
					models.listaActual=[];
					for (var i = 0; i < models.secciones; i++) {
						models.listaActual=models.listaActual.concat(models.hotelesSecciones[i]);

					}
					models.listaRespaldo=models.listaActual;
					
				}else{
					models.listaActual=models.hotelesSecciones[0];
					if(models.hotelesSecciones.length == 1)
						models.listaRespaldo=models.listaActual;
				}
			}
		});
};

models.validacargaHoteles = function(){
	if(models.hotelesSecciones[0].length == 0){
		setTimeout(function(){ models.validacargaHoteles(); }, 600);
	}else{
		setTimeout(function(){
			models.progressBarE.progressbar( "option", "value", 100);
			models.progressStatus = false;
			$("#loading, #frame2").hide();
			models.listaActual=models.hotelesSecciones[0];
			$("#totalResultados").text(models.itemsTotal);
			$(".encontrados").show();
			$("#cajaReserva").hide();
			models.creaTextoBusqueda();
			//models.ordenaHoteles();
			models.dibujaHoteles();
			$("#cerraBusqueda").show();
			$("#starselect").val("");
			$("#nh").val("");
			$(".working").slideUp();
			$("#filtrosSection").show();
			$("#contenedorHoteles").show();
			//$(".filtrosTexto","#prit").show();
		}, 1000);
	}

}

function rad2degr(rad) { return rad * 180 / Math.PI; }
function degr2rad(degr) { return degr * Math.PI / 180; }

models.getLatLngCenter = function(latLngInDegr) {
    var sumX = 0;
    var sumY = 0;
    var sumZ = 0;

    for (var i=0; i<latLngInDegr.length; i++) {
    	if(latLngInDegr[i]['latitude'] == 0 || latLngInDegr[i]['longitude'] == 0)
    		continue;
        var lat = degr2rad(latLngInDegr[i]['latitude']);
        var lng = degr2rad(latLngInDegr[i]['longitude']);
        sumX += Math.cos(lat) * Math.cos(lng);
        sumY += Math.cos(lat) * Math.sin(lng);
        sumZ += Math.sin(lat);
    }

    var avgX = sumX / latLngInDegr.length;
    var avgY = sumY / latLngInDegr.length;
    var avgZ = sumZ / latLngInDegr.length;

    var lng = Math.atan2(avgY, avgX);
    var hyp = Math.sqrt(avgX * avgX + avgY * avgY);
    var lat = Math.atan2(avgZ, hyp);

    return ([rad2degr(lat), rad2degr(lng)]);
}

models.showMapDos = function(){
	if(models.openMap == false)
		return false;

	var totalHoteles = models.hotelesSecciones.reduce((a, b) => a + b.length, 0);
	if (totalHoteles < models.hotelesFiltros.length) {
		models.timerOpenMap = setTimeout(function(){models.showMapDos();}, 2000);

		models.bandCargandoFiltro = true;		
		$("#navFilter").css("position", "fixed");
		
		$("#frame").show();
		$("#loading").show();
		return false;
	}else{
		models.bandCargandoFiltro = false;		
	}

	var stars = parseInt($("#starselect").val());
	var hotel = $("#nh").val().trim();
	
	if(isNaN(stars) == true && hotel == ""){
		var r = models.duplicarObjetos(models.listaRespaldo, true);			
	}else{
		var r = models.duplicarObjetos(models.listaActual, true);
	}

	cords = models.getLatLngCenter(r);
	//models.openMap = true;
	var myLatLng = 	{
						lat: cords[0],
				    	lng: cords[1]
				  	};
	models.hotelesMap = new google.maps.Map(document.getElementById('mapHoteles'), {
		zoom: 13,
		center: myLatLng,
		streetViewControl: false,
    	fullscreenControl: false
	});
	var infowindow = new google.maps.InfoWindow();
	var bound = new google.maps.LatLngBounds();

	var markers = [];
	r.forEach(function(val, key){
		if(val.latitude == 0 || val.longitude == 0)
			return;

		var colorIcono = val.porcentajeAhorro > 20 ? '#0c74d6' : '#F08D46';
		
		var latLng = new google.maps.LatLng(val.latitude, val.longitude);		
		if(markers.length != 0) {
            for (i=0; i < markers.length; i++) {
                var existingMarker = markers[i];
                var pos = existingMarker.getPosition();
                if (latLng.equals(pos)) {
                    var a = 360.0 / markers.length;
                    var newLat = pos.lat() + -.00004 * Math.cos((+a*i) / 180 * Math.PI);  //x
                    var newLng = pos.lng() + -.00004 * Math.sin((+a*i) / 180 * Math.PI);  //Y
                    var latLng = new google.maps.LatLng(newLat,newLng);
                }
            }
        }

    	var marker = new google.maps.Marker({
        	position: latLng,       	
        	map: models.hotelesMap,
        	icon: {
				path: google.maps.SymbolPath.CIRCLE,
				scale: 10, 
				strokeColor: '#fff',
				strokeWeight: 1,
				fillColor: colorIcono,
				fillOpacity: 1
			}
		});
		bound.extend (marker.position);
		markers.push(marker);
    	if(val.porcentajeAhorro > 15){
    		val.mapPorcentajeAhorro = idioma.comparador.ahorra+ ' ' + val.porcentajeAhorro + '%';
    		val.mapPrecioPublico = '<div class="public_price"><span>' + idioma.comparador.publico + ' </span> <span>' + val.precioPublicoF + '</span></div>';
    		val.mapUstedAhorra = '<div class="savings"> '+idioma.comparador.ustedAhorra+' <span>' + val.precioReward + '</span></div>';
    		val.mapPrecioPublico2 = '<div class="public_price"> ' + idioma.comparador.publico + ' <span class="left">' + val.precioPublicoF + '</span></div>';
    		val.mapUstedAhorra2 = '<div class="savings"> ' + idioma.comparador.ustedAhorra + ' <span class="left">' + val.precioReward + '</span></div>';
    	}else{
    		val.mapPorcentajeAhorro = '';
    		val.mapPrecioPublico = '';
    		val.mapUstedAhorra = '';    		
    	}
    	val.mapMemberPrice = '<div class="public_price naranja">' + idioma.comparador.socios + ' <span>' + val.precioSocio + '</span></div>';

        google.maps.event.addListener(marker, 'click', (function(marker) {
		    return function() {
		        infowindow.setContent(common.toDraw(models.hotelMap,val));
		        if(val.HotelDescription ==""){		        	
		        	models.cargadescripcion(key);	
		        }
		        infowindow.open(models.hotelesMap, marker);
		    }
	    })(marker));
	});
	google.maps.event.addListener(models.hotelesMap, "click", function(event) {
	    infowindow.close();
	});
	google.maps.event.addListener(models.hotelesMap, 'zoom_changed', function() {
	   /*zoomChangeBoundsListener = 
	        google.maps.event.addListener(models.hotelesMap, 'bounds_changed', function(event) {
	            if (this.getZoom() > 15 && this.initialZoom == true) {
	                // Change max/min zoom here
	                this.setZoom(15);
	                this.initialZoom = false;
	            }
	        google.maps.event.removeListener(zoomChangeBoundsListener);
	    });*/
	    if (infowindow) {
            infowindow.close();
        }
	});
	if(markers.length > 2)
		var markerCluster = new MarkerClusterer(models.hotelesMap, markers, {imagePath: '_assets/_images/cluster_images/m'});

		models.hotelesMap.initialZoom = true;
		models.hotelesMap.fitBounds(bound);
  		$("#frame").hide();
		$("#loading").hide();
		$("#mapHoteles").show();

	return false;
}

models.showMoreInformation = function(){
	$("#basic_information").hide(350);
	$("#basic_information").promise().done(function(){
		$("#popup_hotel").show(350);
	});
	
}

models.hideMoreInformation = function(){
	$("#popup_hotel").hide(350);
	$("#popup_hotel").promise().done(function(){
		$("#basic_information").show(350);
	});
}

function arg(id, valor) {
	$(function($) {

		// $( "#"+id ).change(function() {
		$("input[name=" + id + "]").val(valor);
		// });

	});
}

function sumarDias(dias,fechaDD)
{
	var arrayDate = fechaDD.split("-");
	var fecha = new Date(arrayDate[2],(arrayDate[1] - 1), arrayDate[0]);
 	fecha.setDate(fecha.getDate() + parseInt(dias));
  	
	var anio=fecha.getFullYear();
  	var mes= fecha.getMonth()+1;
  	var dia= fecha.getDate();
 
  if(mes.toString().length<2){
    mes="0".concat(mes);        
  }    
 
  if(dia.toString().length<2){
    dia="0".concat(dia);        
  }
 
 return dia+"-"+mes+"-"+anio;
 // alert(anio+"-"+mes+"-"+dia);
}
