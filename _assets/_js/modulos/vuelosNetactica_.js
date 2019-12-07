var models=window.models || {};
var common=window.common || {};

models.listaActual=[];
models.listaLimpia = [];
models.data = [];
models.listaFiltrada=[];
models.listaRespaldo=[];
models.vueloSecciones=[];
models.config = [];
models.url='/';
if(location.pathname.indexOf('/es/')>=0){
	models.url='/es/';
}

models.modeloPintado = `
<div id="vuelo_0" class=" row vuelo">
    <div class="col-sm-1">
        <img src="/_assets/_images/aerolineas/AM.jpg" width="60px">
    </div>
    <div class="col-sm-2" style="font-size: 12px;">
        <span>{horaSalida}</span>
        <br>
        <span>{departureDestination}</span>

    </div>
    <div class="col-sm-1">
        --0--
    </div>
    <div class="col-sm-2" style="font-size: 12px;">
        <span>{horaLlegada}</span>
        <br>
        <span>{arrivalDestination}</span>
        <br>
        <span class="verDetalle cerrado">Más detalles</span>
    </div>
    <div class="col-sm-2" style="vertical-align: middle; align-items: center;">
        <div style="border:1px solid #ddd; border-radius: 5px;vertical-align: middle; text-align: center; padding: 10px 0 10px 0">
            <span>{publicPrice}</span>
        </div>
    </div>
    <div class="col-sm-2" style="vertical-align: middle; align-items: center;">
        <div style="border:1px solid #ddd; border-radius: 5px;vertical-align: middle; text-align: center; padding: 10px 0 10px 0">
            <span>{publicPrice2}</span>
        </div>
    </div>
    <div class="col-sm-2" style="vertical-align: middle; align-items: center;">
        <div style="border:1px solid #ddd; border-radius: 5px;vertical-align: middle; text-align: center; padding: 10px 0 10px 0">
            <span>{publicPrice3}</span>
        </div>
    </div>
    <div class="col-sm-12 detalle">
        <div class="row segmento">
            <div class="col-sm-1_5">
                <span>Juev {dayFly}</span>
                <br>
                <span>{monthFly} {yearFly}</span>
            </div>
            <div class="col-sm-1_5">
                <span>Vuelo</span>
                <br>
                <span>{numberFly}</span>
            </div>
            <div class="col-sm-1 flecha">
                <img src="/_assets/_images/aerolineas/AM.jpg" width="60px">
            </div>
            <div class="col-sm-5">
                <span class="horario">{departureHour} - {arrivalHour}</span>
                <br>
                <span>{departureDestination} - {arrivalDestination} </span> <span class="asientos">Quedan 12 asientos </span>
                <br>
                <span>Aeromexico 2587 </span> - <span>Jet de Fuselaje angosto - Embraer 170 </span>
                <br>
                <span>operado por Aerolitoral DBA Aeromexico Connect </span>
            </div>
            <div class="col-sm-3">
                <span>Tiempo de Vuelo</span> <span class="horario">{timeFly} </span>
                <br>
                <span>Clase: {classTrip}</span>
            </div>
        </div>
        <div class="row segmento">
            <div class="col-sm-1_5">
                <span>Juev 10</span>
                <br>
                <span>Feb 2019</span>
            </div>
            <div class="col-sm-1_5">
                <span>Vuelo</span>
                <br>
                <span>321</span>
            </div>
            <div class="col-sm-1 flecha">
                <img src="/_assets/_images/aerolineas/AM.jpg" width="60px">
            </div>
            <div class="col-sm-5">
                <span class="horario">08:05 - 09:41</span>
                <br>
                <span>Monterrey - CDMX </span> <span class="asientos">Quedan 12 asientos </span>
                <br>
                <span>Aeromexico 2587 </span> - <span>Jet de Fuselaje angosto - Embraer 170 </span>
                <br>
                <span>operado por Aerolitoral DBA Aeromexico Connect </span>
            </div>
            <div class="col-sm-3">
                <span>Tiempo de Vuelo</span> <span class="horario">1h 40m </span>
                <br>
                <span>Clase: Ejecutivo</span>
            </div>
        </div>

    </div>
</div>`;

// models.config.items=10;
// models.config.itemsSolicitados=50;
// models.config.itemsActual=0;
// models.config.itemsTotal=0;
// models.config.token=0;
// models.config.simbolo='$';
// models.config.destino="";
// models.config.pintando=0;
// models.config.decimal=".";
// models.config.miles=",";
// models.config.vuelo="";
// models.config.longitudDescripcion=40;
// models.config.bandFiltro = false;
// models.config.progressStatus = false;
// models.config.imagenDefault = null;
// models.config.goSearchBox = false;
// models.config.recargaSeccionC = 0;
// models.config.bandCargandoFiltro = false;

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

Array.prototype.unique=function(a){
	return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
  });

// $(document).ready(function(e)
// {
// 	if(location.pathname.indexOf('/es/')>=0){
// 		 $.datepicker.regional['es'] = {
// 		 closeText: 'Cerrar',
// 		 prevText: '< Ant',
// 		 nextText: 'Sig >',
// 		 currentText: 'Hoy',
// 		 monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
// 		 monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
// 		 dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
// 		 dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
// 		 dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
// 		 weekHeader: 'Sm',
// 		 dateFormat: 'dd/mm/yy',
// 		 firstDay: 1,
// 		 isRTL: false,
// 		 showMonthAfterYear: false,
// 		 yearSuffix: ''
// 		 };
// 		 $.datepicker.setDefaults($.datepicker.regional['es']);
// 	}

	



// var jsonDestinoFrom="";
// var jsonpaerolineas="";

// var models=models||{};
models.modelo=models.modelo||{};
models.modelo.fn=models.modelo.fn||{};
models.modelo.fn.vuelos=models.modelo.fn.vuelos||{};
$(document).ready(function(){
	$("a.flightsMenu").click(models.modelo.fn.vuelos.verBooking);
	$("#listaVuelos").on("click",".verDetalle.cerrado",models.modelo.fn.muestraDetallesVuelos );
	$("#listaVuelos").on("click",".verDetalle.abierto",models.modelo.fn.ocultaDetallesVuelos );
	$("button#changeSearch").click(models.modelo.fn.vuelos.verBooking);
	$("#searchFlights").on("click",models.modelo.fn.cargaVuelos);
	models.modelo.fn.inicializaCalendarios();
	models.modelo.fn.inicializaAutocomplete();
})

var jsonpurl="https://www.travelnet.com.mx/Autocompleteboxjsonp/vuelos?callback=?";
var jsonpaerolineas="https://www.travelnet.com.mx/Autocompleteboxjsonp/aerolineas?callback=?";
models.modelo.fn.vuelos.verBooking=function(e){
e.preventDefault();
$("#bookingBox").show();
};

models.modelo.fn.inicializaCalendarios=function(){

	$("#startDate_0").datepicker(
	{
		minDate : 2,
		changeMonth : true,
		numberOfMonths : 2,
		dateFormat : 'dd-mm-yy',
		onClose : function(selectedDate)
		{
			$("#endDate_0").datepicker("option", "minDate",selectedDate);
			var arrayDate = selectedDate.split("-");
			var fecha = new Date(arrayDate[2],(arrayDate[1] - 1), arrayDate[0]);
			var fechaMas30 = new Date(arrayDate[2],(arrayDate[1] - 1), arrayDate[0]);
			fecha.setDate(fecha.getDate() +1);
			fechaMas30.setDate(fechaMas30.getDate() + 29);
			$("#endDate_0").datepicker("setDate", fecha);
			//$("#endDate").datepicker("option", "maxDate",fechaMas30);
			$("#endDate_0").datepicker("option", "minDate",fecha);
		}
	});
	
	$("#endDate_0").datepicker(
	{
		defaultDate : "+1d",
		changeMonth : true,
		numberOfMonths : 2,
		dateFormat : 'dd-mm-yy',
		onClose : function(selectedDate) { }
	});
}

models.modelo.fn.inicializaAutocomplete=function(){
	$("#flightfrom_0,#flightto_0").autocomplete({
		source : function(request, response) {
			$.ajax({
				url : jsonpurl,
				dataType : "jsonp",
				data : {
					q : request.term,
					lang:"en"
				},
				success : function(data) {
					response($.map(data, function(item) {
						return {
							label : item.ciudad + ", " + item.pais,
							value : item.ciudad,
							cFrom : item.city_code,
						}
					}));
				}
			});
		},
		minLength : 2,
		maxLength : 5,
		select : function(event, ui) {
			var id = $(this).prop("id");
			var indices = id.split("_");
			if(indices[0]==="flightfrom")
			{
				$("#cFrom_"+indices[1]).val(ui.item.cFrom);	
				
			}
			if(indices[0]==="flightto")
			{
				$("#cTo_"+indices[1]).val(ui.item.cFrom);	
			}

			
		},
		open : function() {
			$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
		},
		close : function() {
			$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
		}
	});
}

models.modelo.fn.cargaVuelos=function(){

	var last=$("#formVuelos").serializeArray();

	let validar= validaDatosVuelos();
	console.log(validar);
	if(validar){
		$.ajax({
			url : '/_assets/_controllers/vuelosProcesaBuscadorNet.php',
			 type:"POST",
			 dataType:"json",
			 data:{valueF :last}
			 }).done(function(data){
				console.log(data);
				 if(data.Resultados.Message){
					console.warn(data.Resultados.Message);
				 }else{
					
					if(data.errorCode){
					   console.warn(data.errorInfo);
					} else{
					   models.data = data;
					   crearLista();
					   informacionCajaBusqueda();
					}
				 }
				
				
				 
			});
	}
	

}

function crearLista(){
	models.listaActual = models.data.Resultados.Trips;
	let vueloClean = []
	models.listaActual.forEach(function(itemVuelo, indexVuelo) {
		models.data.Resultados.Catalogs.Airlines.forEach(function(itemAirline,indexAirline){
			if(itemAirline.Code == itemVuelo.Fare.ValidatingCarrier){
				models.listaActual[indexVuelo].Airline = itemAirline;
				itemVuelo.Airline = itemAirline;
			}
		});
		models.listaActual[indexVuelo].Stretch = []; //Inicializamos array vacío
		itemVuelo.Stretch = [];
		models.data.Resultados.Stretches.forEach(function(itemStretch,indexStretch){
			if(itemStretch.Id == itemVuelo.UniqueID){//Validamos que el Stretch pertenezca al vuelo
				// if(itemVuelo.Stretch != []){
				// 	console.log("Llega aquí");
				// 	itemVuelo.Stretch.forEach(function(item2,index2){//Verificamos que no se repita
				// 		if(item2.UniqueID != itemStretch.UniqueID){//Si es diferente lo agregamos 
				// 			console.log("Llega aquí 2");
							models.listaActual[indexVuelo].Stretch.push(itemStretch);
							itemVuelo.Stretch.push(itemStretch);
				// 		}
				// 	});	
				// }
				// else{
				// 	models.listaActual[indexVuelo].Stretch.push(itemStretch);
				// 	itemVuelo.Stretch.push(itemStretch);
				// }
			}
		});
		models.listaActual[indexVuelo].Stretch = models.listaActual[indexVuelo].Stretch.unique();
	vueloClean.Airline = itemVuelo.Airline.Description_Es;

	// if(itemVuelo.Stretch != undefined){
	// 	vueloClean.departureDestination = itemVuelo.Stretch.Departure.AirportCode;
	// 	vueloClean.departureDate = itemVuelo.Stretch.Departure.FormatDate;
	// 	vueloClean.departureHour = itemVuelo.Stretch.Departure.FormatTime;
	// 	vueloClean.arrivalDestination = itemVuelo.Stretch.Arrival.AirportCode;
	// 	vueloClean.arrivalDate = itemVuelo.Stretch.Arrival.FormatDate;
	// 	vueloClean.arrivalHour = itemVuelo.Stretch.Arrival.FormatTime;
		
	// }
	models.listaLimpia.push(vueloClean);
	  });
	  console.log(models.listaLimpia);
	  console.log(models.listaActual);
}

function informacionCajaBusqueda(){
 let caja = `<div class="cajaResumen">
				<p style="font-size: 18px">Resumen de la B&uacute;squeda </p>
				<ul  style="font-size: 12px">
					<li>Cancun - Monterrey 23-Ene-2019</li> 
					<li>Monterrey - Cancun  24-Feb-2019</li> 
					<li>1 Adulto</li> 
				</ul> 
			</div>`;
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

models.modelo.fn.muestraDetallesVuelos=function(){
	var actual=$(this).closest(".vuelo");
	$(this).removeClass("cerrado")
	$(this).addClass("abierto")
	$(".detalle",actual).toggle("slow");
}
models.modelo.fn.ocultaDetallesVuelos=function(){
	var actual=$(this).closest(".vuelo");
	$(this).removeClass("abierto");
	$(this).addClass("cerrado");
	$(".detalle",actual).toggle("slow");
}

function validaDatosVuelos(){
	let validate = true;
	cerrarInputsFeedback();
	let last		=	$("#formVuelos").serializeArray();
	let adultos 	= 	$("#adultos").val();
	let children 	= 	$("#child").val();
	let origen 		= 	$("#flightfrom_0").val();
	let origenCode 	=	$("#flightfrom_1").val();
	let destino 	= 	$("#flightto_0").val();
	let destinoCode = 	$("#flightto_1").val();
	let startDate 	= 	$("#startDate_0").val();
	let endDate		= 	$("#endDate_0").val();
	if(parseInt(adultos)==NaN || adultos == "" || (adultos<=0 && adultos >= 10)){
		mostrarInputFeedback('Select a valid number', '#adultos');
		validate=false
	}else{
		mostrarInputFeedback('Ok', '#adultos','is-valid','is-valid' );
	}

	if(parseInt(children)==NaN || children == "" || children<0 || children >= 10){
		mostrarInputFeedback('Select a valid number', '#child');
		validate=false;
	}else{
		mostrarInputFeedback('', '#child','is-valid','is-valid' );
	}

	if(origen=="" || origenCode==""){
		mostrarInputFeedback('Select a destination', "#flightfrom_0");
		validate=false;
	}else{
		mostrarInputFeedback('', '#flightfrom_0','is-valid','is-valid' );
	}

	if(destino=="" || destinoCode==""){
		mostrarInputFeedback('Select a destination', "#flightto_0");
		validate=false;
	}else{
		mostrarInputFeedback('', '#flightto_0','is-valid','is-valid' );
	}

	if(startDate==""){
		mostrarInputFeedback('Select a valid date', "#startDate_0");
		validate=false;
	}else{
		mostrarInputFeedback('', '#startDate_0','is-valid','is-valid' );
	}

	if(endDate==""){
		mostrarInputFeedback('Select a valid date', "#endDate_0");
		validate=false;
	}else{
		mostrarInputFeedback('', '#endDate_0','is-valid','is-valid' );
	}

	return validate;

}

function mostrarInputFeedback(msgFeedback, selectorInput, classFeedbackInput = 'is-invalid', classFeedbackMsg = 'invalid-feedback'){
	let elementoPadre = $(selectorInput).parent();

	classFeedbackInput == 'is-invalid' && $(selectorInput).removeClass('is-valid');
	classFeedbackInput == 'is-valid' && $(selectorInput).removeClass('is-invalid');
	
	$(selectorInput).addClass(classFeedbackInput);
	$(elementoPadre).append(`<div class="feedback ${classFeedbackMsg}">${msgFeedback}</div>`)
}

function cerrarInputsFeedback ( selectorInput = null ) {
	if ( selectorInput == null ) {
		$('.feedback').parent().children('.is-invalid').removeClass('is-invalid');
		$('.feedback').remove();
	} else {
		let elementoPadre = $(selectorInput).parent();

		$(elementoPadre).children('.is-invalid').removeClass('is-invalid');
		$(elementoPadre).children('.feedback').remove();
	}
}