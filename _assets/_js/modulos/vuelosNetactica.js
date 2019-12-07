var models = window.models || {};
var common = window.common || {};

//models.modelo=models.modelo||{};
models.fn = models.fn || {};
common.fn = common.fn || {};
models.fn.vuelos = models.fn.vuelos || {};
models.listaActual = [];
models.calendario = [];
models.calendarioRegreso = [];
models.ciudades = [];
models.filtros = [];
models.listaLimpia = [];
models.data = [];
models.listaFiltrada = [];
models.listaRespaldo = [];
models.vueloSecciones = [];
models.config = {};
models.lastSearch = [];
models.url = '/';
models.progressBar = '';
models.progressStatus = false;
models.ver = 1;
models.config.diasCalendario = 7;
models.notAvailable = "";

if (location.pathname.indexOf('/es/') >= 0) {
    models.url = '/es/';
}



$("#progress").progressbar({
  change: function() {
    $("#progress-label").text($("#progress").progressbar("value") + "%");
  },
  complete: function() {
    $("#progress-label").text("100%");
  }
});

models.progressBarE = $("#progress");


Number.prototype.formatMoney = function(c, d, t) {
    var tempResult = "";
    try {
        var n = this,
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c), 10) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        c = isNaN(c = Math.abs(c)) ? 2 : c;
        d = d == undefined ? models.decimal : d;
        t = t == undefined ? models.miles : t;
        tempResult = s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t);
    } catch (e) {
        BD.fn.util.trackJsError(e);
    }
    return tempResult;
};

/* Menu Fixed
 */
altura = $('#cajaReserva').offset().top;
$(window).on('scroll', function(e) {
    e.preventDefault();
    if ($("#contenidoBusqueda").css("display") != "none" && $("#listadoVuelos").html().length > 0) {
        if ($(window).scrollTop() > 0) {
            // if(models.goSearchBox == false){
            // $("#navFilter").css("position", "fixed");
            $("#cajaReserva").hide("slow");
            $("#ui-datepicker-div").hide();
            // }
        }
        // else
        // {	
        // 	if(models.goSearchBox == false && models.bandCargandoFiltro == false && models.openMap == false){
        // 		$("#navFilter").css("position", "unset");
        // 	}
        // }
    }
});

$(document).ready(function() {
    $("a.flightsMenu").click(models.fn.vuelos.verBooking);
    $("#listadoVuelos").on("click", ".verDetalle.cerrado", models.fn.muestraDetallesVuelos);
    $("#listadoVuelos").on("click", ".verDetalle.abierto", models.fn.ocultaDetallesVuelos);
    $("button#changeSearch").click(models.fn.vuelos.verBooking);
    $("#searchFlights").on("click", models.fn.cargaVuelos);
    $("#listadoVuelos").on("click", ".agregarCarrito", models.fn.addToJCart);
    models.fn.inicializaCalendarios(); 
    models.fn.inicializaCards();
    models.fn.inicializaAutocomplete("#departure_0");
    models.fn.inicializaAutocomplete("#arrival_0");
    models.fn.inicializaPersonas();


   
})

var jsonpurl = "https://www.travelnet.com.mx/Autocompleteboxjsonp/vuelos?callback=?";
var jsonpaerolineas = "https://www.travelnet.com.mx/Autocompleteboxjsonp/aerolineas?callback=?";
models.fn.vuelos.verBooking = function(e) {
    e.preventDefault();
    $("#bookingBox").show();
};




models.fn.inicializaCalendarios = function() {

   /*   $("#startDate_0").datepicker({
        minDate: 3,
        changeMonth: true,
        numberOfMonths: 1,
        dateFormat: 'yy-mm-dd',
        onClose: function(selectedDate) {
            $("#endDate_0").datepicker("option", "minDate", selectedDate);
            var arrayDate = selectedDate.split("-");
            var fecha = new Date(arrayDate[0], (arrayDate[1] - 1), arrayDate[2]);
            var fechaMas30 = new Date(arrayDate[2], (arrayDate[1] - 1), arrayDate[0]);

            fecha.setDate(fecha.getDate() + 1);
            fechaMas30.setDate(fechaMas30.getDate() + 29);
            $("#endDate_0").datepicker("setDate", fecha);
            $("#endDate_0").datepicker("option", "minDate", fecha);
        }
    });  */  
   var picker = new Lightpick({
        lang: 'en',
		format: "YYYY-MM-DD",
		minDate: moment().startOf('day').add(3, 'day'),
        field: document.getElementById('startDate_0'),
        onSelect: function(date){
           
        }
    });  
    
    

  /*     $("#endDate_0").datepicker({
        defaultDate: "+1d",
        changeMonth: true,
        numberOfMonths: 1,
        dateFormat: 'yy-mm-dd',
        onClose: function(selectedDate) {}
    });   */
}

models.fn.inicializaAutocomplete = function(inputName) {
    $(inputName).autocomplete({

        source: function(request, response) {
            $.ajax({
                url: jsonpurl,
                dataType: "jsonp",
                data: {
                    q: request.term,
                    lang: "en"
                },
                success: function(data) {
                    response($.map(data, function(item) {
                        return {
                            label: item.ciudad + ", " + item.pais,
                            value: item.ciudad,
                            cFrom: item.city_code,
                        }
                    }));
                }
            });
        },
        minLength: 2,
        maxLength: 5,
        select: function(event, ui) {
            var id = $(this).prop("id");
            var indices = id.split("_");
            $((indices[0] === "departure" ? "#cDeparture" : "#cArrival") + "_" + indices[1]).val(ui.item.cFrom);

        },
        open: function() {
            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function() {
            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
    });
}

models.fn.inicializaPersonas = function() {

    _persons.forEach(function(item, index) {
        let modelo = `
			<div class=" drop-item">
				<div class="row">
					<div class="col col-6 col-md-7">
						<span class="first-text">${item.firstText}</span>
						<div class="row">
							<div class="col-10 col-sm-12 second-text">
								${item.secondText}
							</div>
						</div>
					</div>
					<div class="col col-6 col-md-5 ">
						<div class="input-group input-numeric">
							<div class="input-group-prepend">
								<div class="btn " id="minus-btn"><i class="fa fa-minus fa-less-icon" onclick="lessOne('#${item.name}Number')"></i></div>
							</div>
							<div class="line-2"></div>
							<input type="number" id="${item.name}Number" name="${item.name}Number" class="form-control caja-number" value="${item.valueDefault}" min="${item.valueMin}" max="${item.valueMax}" readonly>
							<div class="line-2"></div>
							<div class="input-group-prepend">
								<div class="btn " id="plus-btn" onclick="plusOne('#${item.name}Number')"><i class="fa fa-plus fa-plus-icon"></i></div>
							</div>
						</div>
					</div>
				</div>
			</div>`;
        $("#cajaPersons").append(modelo);
    });

}

models.fn.inicializaCards = function() {
    $("#vuelosPrincipales").html("");
    _destinations_cards.shuffle();
    _destinations_cards.forEach(function(item, index) {
        let modelo = `
		<div class="col-12  col-sm-6 col-md-4 col-lg-3">
                <div class="vueloP-container" data-destinationcode="${item.code}" data-destinationname="${item.name}">
                <div class="imgVuelosFicha">
                    <img src="${item.image}" alt="..." class="img-vuelosPrincipales">
                </div>
                <div class="infoVuelosFicha">
                    <span>NACIONAL</span>
                    <div class="destinosVuelosFicha">
                        <p><i class="fa fa-plane" aria-hidden="true"></i> ${item.name}</p>
                        <p><i class="fa fa-plane planeArrival" aria-hidden="true"></i> NEW YORK</p>
                    </div>
                    <div class="descriocionVuelosFicha">
                        Devolución al 100% del costo del vuelo en B-Rewards.
                    </div> 
                    <div class="buscarVuelosFicha">
                        <i class="fa fa-search" aria-hidden="true"></i>
                    </div>                       
                </div>               
            </div>

		</div>`;
        $("#vuelosPrincipales").append(modelo);
        // console.log(modelo);

    });

}

models.fn.cargaVuelos = function() {
    var last = models.fn.getFormData($("#formVuelos"));
    models.tipoVuelo = last.tipoVuelo;
    let validar = validaDatosVuelos();

    if (validar) {
        $(".bannerTitulo").hide();
        $("#contenidoCardsVuelos").hide();
        $("#contenidoBusqueda").hide();
        $("#msg_error").hide();
        $("#frame2").show();
        if (models.tipoVuelo == "oneWay") {
            $("#vuelosArmadosIdaVuelta").hide();
            $("#diagonal").hide();
            $("#fechasVuelosRegreso").hide();
            $("#matrizprecios").hide();
            $('.opcionesredondos').hide();
            $("#calendario").removeClass('calendario-abajo')
        } else {
            $("#vuelosArmadosIdaVuelta").hide();
            $("#calendario").addClass('calendario-abajo')
            $("#diagonal").show();
            $("#fechasVuelosRegreso").show();
            $("#matrizprecios").show();
            $('.opcionesredondos').show();
        }
        $.ajax({
            url: '/_assets/_controllers/vuelosProcesaBuscadorNet.php',
            type: "POST",
            dataType: "json",
            data: { valueF: last },
            beforeSend: function(e) {
                models.progressStatus = true;
                models.progressBarE.progressbar("option", "value", 0);
                setTimeout(models.progressBar(), 300);
            },
            success: function(data) {

                console.log(data);
                if (data.errorCode) {
                    console.warn(data.errorInfo);
                } else {
                    models.data = data.Resultados;
                    models.calendario = models.data.Calendario;
                    models.calendarioRegreso = models.data.matriz;
                    models.catalogos = models.data.Catalogos;
                    var _Stretches = data.Resultados.stretches;
                    for (var i = _Stretches.length - 1; i >= 0; i--) {
                        _Stretches[i].Airlines = models.fn.getAirlines(_Stretches[i].Airlines);
                        _Stretches[i].ArrivalAirport = models.fn.getAirports(_Stretches[i].ArrivalAirport);
                        _Stretches[i].DepartureAirport = models.fn.getAirports(_Stretches[i].DepartureAirport);
                        _Stretches[i].arrivalCity = models.fn.getCities(_Stretches[i].ArrivalAirport.CityCode);
                        _Stretches[i].departureCity = models.fn.getCities(_Stretches[i].DepartureAirport.CityCode);

                        var _v = _Stretches[i].vuelos
                        for (var j = 0; j < _v.length; j++) {
                            let tmp = models.fn.getAirlines([_v[j].AirlineCode]);
                            if (tmp.length > 0) {
                                _v[j].Airline = tmp[0];
                            }
                            tmp = models.fn.getAirlines([_v[j].OperatingAirlineCode]);
                            if (tmp.length > 0) {
                                _v[j].OperatingAirlineCode = tmp[0];
                            }
                        }
                    }



                    if (models.data.Trips == null || models.data.Trips.length <= 0) {
                        $("#frame2").hide();
                        $("#cajaReserva").show();
                        $("#msg_error").show();
                    } else {
                        $("#cajaReserva").hide();
                        $("#contenidoBusqueda").show();


                        models.lastSearch = JSON.parse(models.data.parameters);
                        models.stretches = models.data.stretches;
                        for (var i = models.data.Trips.length - 1; i >= 0; i--) {
                            var t = models.data.Trips[i];
                            t.SessionNet = models.data.SesionNet;
                            t.token = models.data.token;
                            if (t.diaMas > 0) {
                                t.diaMas = "+" + t.diaMas;
                            }
                            for (var l = 0; l < t.Stretches.length; l++) {
                                t.Stretches[l] = models.fn.getStretch(t.Stretches[l]);
                            }
                        }

                        models.listaActual = models.data.Trips;
                        models.listaFiltrada = [];

                        models.dibujaCalendario();
                        models.dibujaResumenBusqueda();
                        models.dibujaFiltros();
                        models.dibujaVuelos();
                        $("#frame2").hide();

                        setTimeout(function() {
                            models.progressBarE.progressbar("option", "value", 100);
                            models.progressStatus = false;
                        }, 3000);
                    }
                }
            }

        });
    }

}

models.fn.getStretch = function(token) {
    for (var j = 0; j < models.stretches.length; j++) {

        var stretches = models.stretches[j]

        if (token == stretches.uid) {
            return stretches;
        }
    }
    return {};
}
models.fn.getCities = function(cityCode) {
    var cities = models.catalogos.Cities;
    for (var i = 0; i < cities.length; i++) {
        if (cityCode == cities[i].Code) {
            return cities[i];
        }
    }
    return {};
}

models.fn.getAirports = function(airportCode) {
    var airports = models.catalogos.Airports;
    for (var i = 0; i < airports.length; i++) {
        if (airportCode == airports[i].Code) {
            return airports[i];
        }
    }
    return {};
}

models.fn.getAirlines = function(airlines) {
    var lineas = models.catalogos.Airlines;
    var resp = [];

    for (var i = 0; i < airlines.length; i++) {
        for (var j = lineas.length - 1; j >= 0; j--) {
            if (lineas[j].Code == airlines[i]) {
                resp.push(lineas[j]);
                break;
            }
        }
    }
    return resp;

}

function crearLista() {
    let vueloClean = []
    var fechas = $('#fechasVuelos');
    models.data.Resultados.Calendario.forEach(function(itemCalendario, indexCalendario) {

        models.listaCalendario = itemCalendario;

        console.log(models.listaCalendario);
    });
}

models.dibujaCalendario = function(seccion) {

    if (models.calendario.length < models.config.diasCalendario) {
        let date1 = "";
        let date2 = "";
        for (var i = 0; i < models.config.diasCalendario; i++) {
            let itemCalendar = models.calendario[i];
            if (i == 0) {

                date1 = new Date(models.lastSearch.departing + " 00:00:00");
                date1.setDate(date1.getDate() - 3);
            } else {
                date1.setDate(date1.getDate() + 1);
            }

            date2 = new Date(itemCalendar.Date + " 00:00:00");
            if (date1 < date2) {
                let objeto = new Object();
                objeto.Date = date1.formatoFecha(6);
                objeto.From = 0;
                objeto.To = 0;
                objeto.Currency = null;
                objeto.seccion = 0;
                objeto.disabled = 1;
                models.calendario.splice(i, 0, objeto);
            }
        };

        // if(models.tipoVuelo=="rounded"){
        // 	let date11 = ""; 
        // 	let date22 = "";

        // 	for(var i=0;i<models.config.diasCalendario;i++){
        // 		let itemCalendar = models.calendarioRegreso[i];
        // 		if(i==0) {

        // 			date11 =  new Date(models.lastSearch.departing+" 00:00:00");
        // 			date11.setDate(date11.getDate()-3);
        // 		}else{
        // 			date11.setDate(date11.getDate()+1);
        // 		}
        // 		for(var j=0;j<itemCalendar.precios.length;j++){
        // 			date22 = new Date(itemCalendar.precios[j].Date);
        // 			if(date11 < date22){
        // 				let objeto = new Object();
        // 				objeto.Date = date11.formatoFecha(6);
        // 				objeto.From = 0;
        // 				objeto.To = 0;
        // 				objeto.Currency= null;
        // 				objeto.seccion=0;
        // 				objeto.disabled=1;
        // 				models.calendarioRegreso.splice(i,0,objeto);

        // 				console.log(models.calendarioRegreso);
        // 			}
        // 		}
        // 	};

        // }
    }

    let hoy = new Date();
    hoy.setDate(hoy.getDate() + 3);

    let minDate = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    var principal = "";
    var principalRegreso = "";
    let orden = [3, 4, 2, 5, 2, 6, 0];
    let temp = "";
    $("#fechasVuelos").html("");
    $("#fechasVuelos").html("");

    if (models.tipoVuelo == "oneWay") {

        for (let x = 0; x < orden.length; x++) {
            let temp = orden[x];
            if (principal == "") {
                principal = (models.calendario[temp].seccion != 0) ? temp : "";
            }
        }
        $("#fechasVuelos").append(`<li class="col-sm-0_5 flecha-izq" ><img class="img" src="_assets/_images/flechasVuelos/flecha_izquierda.png" /></li>`);
        for (var i = 0; i < models.config.diasCalendario; i++) {

            var calendario = models.calendario[i];
            calendario.formatoFecha = new Date(calendario.Date + " 00:00:00").formatoFecha(7);

            if (i == principal) {
                $("#fechasVuelos").append(common.fn.toDraw(models.maqueta.calendarioPrincipal, calendario));
            } else {
                let dateFormated = new Date(calendario.Date);
                if (dateFormated < minDate) {
                    $("#fechasVuelos").append(common.fn.toDraw(models.maqueta.calendarioDisabled, calendario));
                } else {
                    if (models.calendario[i].seccion != 0) {
                        $("#fechasVuelos").append(common.fn.toDraw(models.maqueta.calendario, calendario));
                    } else {
                        $("#fechasVuelos").append(common.fn.toDraw(models.maqueta.calendarioDisabled, calendario));
                    }

                }
            }
        }
        $("#fechasVuelos").append(`<li class="col-sm-0_5 flecha-der" ><img class="img" src="_assets/_images/flechasVuelos/flecha_derecha.png" /></li> `);
    }

    $("#fechasVuelosRegreso").html("");
    $("#diagonal").html("");

    if (models.tipoVuelo == "rounded") {
        for (let x = 0; x < orden.length; x++) {
            let temp = orden[x];
            if (principalRegreso == "") {
                principalRegreso = (models.calendarioRegreso[temp].seccion != 0) ? temp : "";
            }
        }
        $("#fechasVuelosRegreso").append(`<li class="col-sm-12 flecha-arriba" ><img class="img" src="_assets/_images/flechasVuelos/flecha_arriba.png" /></li>`);
        $("#fechasVuelos").append(`<li class="col-sm-0_5 flecha-izq" ><img class="img" src="_assets/_images/flechasVuelos/flecha_izquierda.png" /></li>`);

        for (var i = 0; i < models.config.diasCalendario; i++) {

            var calendarioRegreso = models.calendarioRegreso[i];
            var calendarioIda = models.calendarioRegreso[i];

            var calendarioIdaFecha = calendarioIda.fecha.split("T");

            calendarioIda.fechaIda = new Date(calendarioIdaFecha[0] + " " + calendarioIdaFecha[1]).formatoFecha(7);

            calendarioIda.dateIda = new Date(calendarioIdaFecha[0] + " " + calendarioIdaFecha[1]).formatoFecha(6);

            calendarioRegreso.formatoFecha = new Date(calendarioRegreso.precios[i].Date + " 00:00:00").formatoFecha(7);
            calendarioRegreso.Date = new Date(calendarioRegreso.precios[i].Date + " 00:00:00").formatoFecha(6);

            if (i == principalRegreso) {
                $("#fechasVuelosRegreso").append(common.fn.toDraw(models.maqueta.calendarioPrincipalRegreso, calendarioRegreso));
                $("#fechasVuelos").append(common.fn.toDraw(models.maqueta.calendarioPrincipalIda, calendarioIda));
            } else {
                let dateFormated = new Date(calendarioRegreso.precios[i].Date);
                if (dateFormated < minDate) {
                    $("#fechasVuelosRegreso").append(common.fn.toDraw(models.maqueta.calendarioRegreso, calendarioRegreso));
                    $("#fechasVuelos").append(common.fn.toDraw(models.maqueta.calendarioIda, calendarioIda));
                } else {
                    if (models.calendarioRegreso[i].seccion != 0) {
                        $("#fechasVuelosRegreso").append(common.fn.toDraw(models.maqueta.calendarioRegreso, calendarioRegreso));
                        $("#fechasVuelos").append(common.fn.toDraw(models.maqueta.calendarioIda, calendarioIda));
                    } else {
                        $("#fechasVuelosRegreso").append(common.fn.toDraw(models.maqueta.calendarioRegreso, calendarioRegreso));
                        $("#fechasVuelos").append(common.fn.toDraw(models.maqueta.calendarioIda, calendarioIda));
                    }

                }
            }
        }

        $("#fechasVuelos .calendar-item").removeClass("calendar-item");

        $("#fechasVuelos li").each(function() {
            let dateActive1 = $(this).data("type");
            if (dateActive1 == "calendar") {
                $(this).addClass("calendar-itemRounded");
            }
        });

        $("#diagonal").append(common.fn.toDraw(models.maqueta.diagonal, ""));
        $("#fechasVuelos").append(`<li class="col-sm-0_5 flecha-der" ><img class="img" src="_assets/_images/flechasVuelos/flecha_derecha.png" /></li> `);
        $("#fechasVuelosRegreso").append(`<li class="col-sm-12 flecha-abajo" ><img class="img" src="_assets/_images/flechasVuelos/flecha_abajo.png" /></li>`);

        $('#mtabla0 #mtabla1 #mtabla2 #mtabla3 #mtabla4 #mtabla5 #mtabla6').html("");
        $("#matrizprecios").html("")

        for (var i = 0; i < models.data.matriz.length; i++) {
            let datosMatriz = models.data.matriz[i];
            $("#matrizprecios").append('<table id="mtabla' + i + '">');

            let fechaIda = datosMatriz.fecha.split('T');
            for (var j = 0; j < datosMatriz.precios.length; j++) {

                let datosPrecios = datosMatriz.precios[j];
                let dateIda = fechaIda[0];

                if (datosPrecios.From != "99999999") {
                    datosPrecios.DateIda = new Date(dateIda + " 00:00:00").formatoFecha(6);
                    datosPrecios.DateRegreso = new Date(datosPrecios.Date + " 00:00:00").formatoFecha(6);
                    // datosPrecios.Date="";
                    datosPrecios.tr = "filtro" + j;
                    datosPrecios.From = models.numberWithCommas(datosPrecios.From);
                    if (datosPrecios.DateIda == models.lastSearch.departing && datosPrecios.DateRegreso == models.lastSearch.returning) {
                        datosPrecios.principal = "principal-activa";
                    } else {
                        datosPrecios.principal = "";
                    }

                    $('#mtabla' + i).append(common.fn.toDraw(models.maqueta.calendarioMatriz, datosPrecios));
                } else {
                    datosPrecios.From = "";
                    datosPrecios.NotAvailable = "true";
                    datosPrecios.Empty = "<div>NOT</div> <div>AVAILABLE</div>";
                    $('#mtabla' + i).append(common.fn.toDraw(models.maqueta.calendarioMatrizSinDisponibilidad, datosPrecios));
                }

            }
            $("#matrizprecios").append('</table>');
        }

    }

    $('.disabled-calendar').popover();
    $("#calendario").show('slow');
};

models.dibujaResumenBusqueda = function() {

    let parametros = models.data.parameters;
    parametros = JSON.parse(parametros);
    $("#listaVuelosText").html("");
    var calendario = models.calendario[3];
    calendario.formatoFecha = new Date(calendario.Date).formatoFecha(1);
    models.data.Catalogos.Cities.forEach(function(itemCity, indexCity) {
        if (itemCity.Code == parametros.from) {
            parametros.CityFrom = itemCity.Description_Es;
        }
        if (itemCity.Code == parametros.to) {
            parametros.CityTo = itemCity.Description_Es;
        }

    });

    $("#listaVuelosText").append(`	<li> <span class="left-icon"><i class="fa fa-map-marker"></i></span> <span class="left-iconT">${parametros.CityFrom} - ${parametros.CityTo}</span></li> 
										<li><span class="left-icon"><i class="fa fa-calendar"></i></span> <span class="left-iconT">${parametros.departing}</span></li>`);

    if (parametros.typeFlight == 0) {
        $("#listaVuelosText").append(` 	<li> <span class="left-icon"><i class="fa fa-map-marker"></i></span> <span class="left-iconT"> ${parametros.CityTo} - ${parametros.CityFrom}</span></li> 
											<li> <span class="left-icon"> <i class="fa fa-calendar"></i></span> <span class="left-iconT"> ${parametros.returning}</span></li>`);
    }

    if (parseInt(parametros.adults) > 0) {
        $("#listaVuelosText").append(`<li> ${parametros.adults} Adult (s)</li>`);
    }

    if (parseInt(parametros.children) > 0) {
        $("#listaVuelosText").append(`<li> ${parametros.children} Children (s)</li>`);
    }

    if (parseInt(parametros.infants) > 0) {
        $("#listaVuelosText").append(`<li> ${parametros.infants} Infant (s)</li>`);
    }
};

models.numberWithCommas = function(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

models.dibujaFiltros = function() {
    let precioMin = "";
    let precioMax = "";
    models.data.Trips.forEach(function(itemTrip, indexTrip) {
        if (precioMin == "" && precioMax == "") {
            precioMin = itemTrip.TotalAmount;
            precioMax = itemTrip.TotalAmount;
        } else {
            if (precioMin > itemTrip.TotalAmount) {
                precioMin = itemTrip.TotalAmount
            }

            if (precioMax < itemTrip.TotalAmount) {
                precioMax = itemTrip.TotalAmount;
            }
        }

    });

    $("#slider-range").slider({
        range: true,
        min: precioMin,
        max: precioMax,
        values: [precioMin, precioMax],
        slide: function(event, ui) {

            let array_filtrado = _.filter(models.data.Trips, function(trip) {
                if (trip.TotalAmount >= ui.values[0] && trip.TotalAmount <= ui.values[1]) {
                    return trip;
                }
            });
            // console.log(array_filtrado);
            models.listaFiltrada = array_filtrado.unique();
            models.listaActual = models.listaFiltrada;
            models.dibujaVuelos();
            $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);

        }
    });
    $("#amount").val("$" + $("#slider-range").slider("values", 0) +
        " - $" + $("#slider-range").slider("values", 1));

    $("#aerolineasListText").html("");
    models.data.Catalogos.Airlines.forEach(function(itemAirline, indexAirline) {
        $("#aerolineasListText").append(`
		<li>
			<div class="form-check">
				<input class="form-check-input filter-vuelo" type="checkbox" id="airL-${itemAirline.Code}" name="airL-${itemAirline.Code}" value="${itemAirline.Code}" data-type="aerolinea" data-description-filter="${itemAirline.Description_Es}">
				<label class="form-check-label" for="airL-${itemAirline.Code}">${itemAirline.Description_Es}</label>
			</div>
		</li>
			`);
    });

    $("#titleEscalas").html("");
    models.data.Catalogos.Cities.forEach(function(itemCity, indexCity) {
        if (models.lastSearch.from == itemCity.Code) {
            models.lastSearch.fromName = itemCity.Description_Es;
        }
        if (models.lastSearch.to == itemCity.Code) {
            models.lastSearch.toName = itemCity.Description_Es;
        }
    });

    $("#tituloEscalas").html(`<h4>Escalas (<span>${models.lastSearch.fromName}</span> - <span>${models.lastSearch.toName}</span>)</h4>`);
    $("#escalasText").html("");
    let escalas = parseInt(models.data.Filters[0].Stops[0]);
    models.data.Filters[0].Stops.forEach(function(itemStop, indexStop) {
        escalas = parseInt(itemStop);
        if (escalas >= 0) {
            if (escalas == 0) {
                $("#escalasText").append(`
		   <li>
			   <div class="form-check">
				   <input class="form-check-input filter-vuelo" type="checkbox" value="0" id="direct" name="direct" data-type="escala">
				   <label class="form-check-label" for="direct">
				   Directo
				   </label>
			   </div>
		   </li>`);
            }
        }
        if (escalas == 1) {
            $("#escalasText").append(`
		   <li>
			   <div class="form-check">
				   <input class="form-check-input filter-vuelo" type="checkbox" value="1" id="one_escale" name="one_escale" data-type="escala">
				   <label class="form-check-label" for="one_escale">
				   1 Escala
				   </label>
			   </div>
		   </li>`);
        }
        if (escalas >= 2) {
            $("#escalasText").append(`
			   <li>
				   <div class="form-check">
					   <input class="form-check-input filter-vuelo" type="checkbox" value="2" id="two_more" name="two_more" data-type="escala">
					   <label class="form-check-label" for="defaultCheck2">
					   2 o más escalas
					   </label>
				   </div>
			   </li>`);
        }
    });


    //Filtros aeropuertos 
    $("#dpAirportsText").html("");
    if (models.data.Filters[0].AirportsDeparture.length > 1) {
        $("#departureFiltros").show();
        models.data.Filters[0].AirportsDeparture.forEach(function(item, index) {
            models.data.Catalogos.Airports.forEach(function(itemAirport, indexAirport) {
                if (item == itemAirport.Code) {
                    $("#dpAirportsText").append(`
				<li>
					<div class="form-check">
						<input class="form-check-input filter-vuelo" type="checkbox" value="${item}" id="departure-${item}" name="departure-${item}" data-type="departure-airport">
						<label class="form-check-label" for="departure-${item}">
						${itemAirport.Description_Es}
						</label>
					</div>
				</li>`);
                }
            });

        });
    } else {
        $("#departureFiltros").hide();
    }
    $("#arAirportsText").html("");
    if (models.data.Filters[0].AirportsArrival.length > 1) {
        $("#arrivalFiltros").show();
        models.data.Filters[0].AirportsArrival.forEach(function(item, index) {
            models.data.Catalogos.Cities.forEach(function(itemCity, indexCity) {
                if (item == itemCity.Code) {
                    $("#arAirportsText").append(`
					<li>
						<div class="form-check">
							<input class="form-check-input filter-vuelo" type="checkbox" value="${item}" id="arrival-${item}" name="arrival-${item}" data-type="arrival-airport">
							<label class="form-check-label" for="arrival-${item}">
							${itemCity.Description_Es}
							</label>
						</div>
					</li>`);
                }
            });

        });
    } else {
        $("#arrivalFiltros").hide();
    }

}

models.dibujaVuelos = function(seccion) {
    let dateActive = $("#fechasVuelos .activa").data("date");
    $("#listadoVuelos").html("");
    models.ciudades = models.catalogos.Cities;
    banderaNull = false;
    for (var i = 0; i < models.listaActual.length; i++) {
        var vuelo = models.listaActual[i];
        if (models.tipoVuelo == "oneWay") {
            var calendario = $("#fechasVuelos .activa").data("date");
            var strechT = vuelo.Stretches[0];
            if (strechT.DepartureDate == calendario) {
                horariosalidaTemp = strechT.ArrivalTime.split(':');
                vuelo.horarioArrival = horariosalidaTemp[0] + ':' + horariosalidaTemp[1];
                vuelo.Stops = strechT.Stops;
                vuelo.departureCity = strechT.departureCity;
                vuelo.arrivalCity = strechT.arrivalCity;
                vuelo.AirlineCode = strechT.Airlines[0].Code;
                vuelo.DepartureDate = new Date(strechT.DepartureDate + " 00:00:00").formatoFecha();
                vuelo.ArrivalDate = new Date(strechT.ArrivalDate + " 00:00:00").formatoFecha();
                vuelo.diaMas = (strechT.diaMas > 0) ? "+" + strechT.diaMas : "";
                horariollegadaTemp = strechT.DepartureTime.split(':');
                vuelo.horarioDeparture = horariollegadaTemp[0] + ':' + horariollegadaTemp[1];

                $("#listadoVuelos").append(common.fn.toDraw(models.maqueta.modeloPintadoOneWay, vuelo));
            }

        }

        if (models.tipoVuelo == "rounded") {
            var calendarioIda = $("#fechasVuelos .activa").data("date");
            var calendarioRegreso = $("#fechasVuelosRegreso .activa").data("date");
            var strechIda = vuelo.Stretches[0];
            var strechRegreso = vuelo.Stretches[1];
            var totalAmount = vuelo.TotalAmount;
            var uid = vuelo.uid;
            var token = vuelo.token;
            var sessionNet = vuelo.SessionNet;
            console.log(models.notAvailable)
            if (models.notAvailable == "nodisponible") {
                banderaNull = true;
            }

            if (seccion == "9990") {

                models.setInfoToDrawRoundedTrips(strechIda, strechRegreso, totalAmount, uid, token, sessionNet);
            } else {

                if (strechIda.DepartureDate == calendarioIda && strechRegreso.DepartureDate == calendarioRegreso) {


                    models.setInfoToDrawRoundedTrips(strechIda, strechRegreso, totalAmount, uid, token, sessionNet);
                }
            }

        }
    }

    if (models.listaActual.length == 0) {
        $("#listadoVuelos").append(`<div class="alert alert-warning" role="alert">
									This option is not available according to the selected dates. Please select other dates from de table or modify your search.
								  </div>`);
    } else if (models.listaActual.length > 0) {
        $("#listadoVuelos .alert").html("");
    }

}

models.setInfoToDrawRoundedTrips = function(strechIda, strechRegreso, totalAmount, uid, token, sessionNet) {

    var horariosalidaTemp = strechIda.ArrivalTime.split(':');
    strechIda.uid = uid;
    strechIda.token = token;
    strechIda.sessionNet = sessionNet;
    strechIda.horarioArrival = horariosalidaTemp[0] + ':' + horariosalidaTemp[1];
    strechIda.AirlineCode = strechIda.Airlines[0].Code;
    strechIda.DepartureDate = new Date(strechIda.DepartureDate + " 00:00:00").formatoFecha(8);
    strechIda.ArrivalDate = new Date(strechIda.ArrivalDate + " 00:00:00").formatoFecha(8);
    strechIda.diaMas = (strechIda.diaMas > 0) ? "+" + strechIda.diaMas : "";
    horariollegadaTemp = strechIda.DepartureTime.split(':');
    strechIda.horarioDeparture = horariollegadaTemp[0] + ':' + horariollegadaTemp[1];
    strechIda.TotalAmount = totalAmount;
    horariosalidaTemp = strechRegreso.ArrivalTime.split(':');
    strechRegreso.uid = uid;
    strechRegreso.horarioArrival = horariosalidaTemp[0] + ':' + horariosalidaTemp[1];
    strechRegreso.AirlineCode = strechRegreso.Airlines[0].Code;
    strechRegreso.DepartureDate = new Date(strechRegreso.DepartureDate + " 00:00:00").formatoFecha(8);
    strechRegreso.ArrivalDate = new Date(strechRegreso.ArrivalDate + " 00:00:00").formatoFecha(8);
    strechRegreso.diaMas = (strechRegreso.diaMas > 0) ? "+" + strechRegreso.diaMas : "";
    horariollegadaTemp = strechRegreso.DepartureTime.split(':');
    strechRegreso.horarioDeparture = horariollegadaTemp[0] + ':' + horariollegadaTemp[1];
    if (strechIda.Stops == 0) {
        strechIda.Stops = "Direct";
    }
    if (strechRegreso.Stops == 0) {
        strechRegreso.Stops = "Direct";
    }
    var temp = { "ida": strechIda, "regreso": strechRegreso }

    $("#vuelosArmadosIdaVuelta").hide();
    $("#diagonal").show();
    $("#fechasVuelosRegreso").show();
    $("#matrizprecios").show();
    $("#listadoVuelos").append(common.fn.toDraw(models.maqueta.modeloPintadoRound, temp));
    $(".fechasVuelta").hide();
}

models.dibujaDetalles = function(actual, segmento) {
    $token = $(actual).data("tokenvuelo");
    $seccion = $(actual).attr('data-seccion');
    // console.log($token);
    $("#mostrarDetalle" + segmento, actual).html("");
    var vuelo = _.filter(models.listaActual, { 'uid': $token });
    if (vuelo.length > 0) {
        vuelo = vuelo[0];
    }

    //for (var g=0; g<vuelo.Stretches.length;g++){
    var strech = vuelo.Stretches[segmento - 1];
    for (var n = 0; n < strech.vuelos.length; n++) {
        viajes = strech.vuelos[n];
        horariosalidaTemp = viajes.ArrivalTime.split(':');
        viajes.horarioArrival = horariosalidaTemp[0] + ':' + horariosalidaTemp[1];
        horariollegadaTemp = viajes.DepartureTime.split(':');
        viajes.tiempoEscalaFormateado = "";
        viajes.horarioDeparture = horariollegadaTemp[0] + ':' + horariollegadaTemp[1];
        viajes.formatoFechaArrival = new Date(viajes.ArrivalDateTime + " 00:00:00").formatoFecha(2);
        viajes.PersonalizedArrivalDate = getPersonalizedDate(viajes.formatoFechaArrival);
        viajes.formatoFechaDeparture = new Date(viajes.DepartureDateTime + " 00:00:00").formatoFecha(2);
        viajes.PersonalizedDepartureDate = getPersonalizedDate(viajes.formatoFechaDeparture);
        if (viajes.tiempoEscala != "00:00:00") {
            tiempoEspera = viajes.tiempoEscala.split(":");
            viajes.tiempoEscalaFormateado = "Espera de " + (tiempoEspera[0] == "00" ? "" : tiempoEspera[0] + "h ") + tiempoEspera[1] + "m en " + viajes.DepartureAirport;
            $("#mostrarDetalle" + segmento, actual).append(common.fn.toDraw(models.maqueta.escalas, viajes));
        }
        $("#mostrarDetalle" + segmento, actual).append(common.fn.toDraw(models.maqueta.detalles, viajes));


    }
    //}
}

models.progressBar = function() {
    if (models.progressStatus == false) {
        return false;
    }
    var val = models.progressBarE.progressbar("option", "value") || 0;
    var a = Math.random() * (3000 - 50) + 50;
    var b = Math.floor(Math.random() * (5 - 1)) + 1;

    if (100 - val > 5)
        models.progressBarE.progressbar("option", "value", val + b);
    if (val < 94) {
        setTimeout(models.progressBar, a);
    }
}

models.fn.muestraDetallesVuelos = function() {

    var actual = $(this).closest(".row");
    var segmento = $(this).data("segmento");
    $(this).removeClass("cerrado");
    $(this).addClass("abierto");
    // $("#mostrarDetalle",actual).html("");
    models.dibujaDetalles(actual, segmento);
    $(".detalle", actual).toggle("slow");
}

models.fn.ocultaDetallesVuelos = function() {
    var actual = $(this).closest(".row");
    // $("#mostrarDetalle",actual).html("");
    $(this).removeClass("abierto");
    $(this).addClass("cerrado");
    $(".detalle", actual).toggle("slow");
}

models.fn.addToJCart = function() {
    var actual = $(this).closest(".vuelo");
    var tokenVuelo = $(actual).data('tokenvuelo');
    var tokenBusqueda = $(actual).data('tokenbusqueda');
    var tokenNetactica = $(actual).data('tokennetactica');
    var tokenJcart = $(actual).data('jcarttoken');
    var gmelemento = $(actual).data("gmelemento");
    var tokens = { jcartToken: tokenJcart, tokenVuelo, tokenBusqueda: tokenBusqueda, tokenNetactica: tokenNetactica, "gm-elemento": gmelemento };

    $.ajax({
        url: '/carrito/jcart/relay.php',
        type: "POST",
        dataType: "json",
        data: tokens,
        beforeSend: function(e) {

        },
    }).done(function(data) {});
}

// models.fn.getListFromSelectedFlight = funct

function getPersonalizedDate(date) {
    var dayOfWeek = new Date(date).getDay();
    var dia = new Date(date).getDate();
    day = (dia < 10 ? '0' + dia : dia);
    var anio = new Date(date).getFullYear();
    var fecha = parseInt(dayOfWeek + 2);
    if (fecha == 8) { fecha = 7; }
    var month = date.split("/");
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month_index = parseInt(month[1], 10) - 1;
    monthString = months[month_index];
    dayString = ['', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][fecha];
    var fechaFormato = dayString + " " + day + "    " + monthString + " " + anio;
    return fechaFormato;
}

function validaDatosVuelos() {
    let validate = true;
    cerrarInputsFeedback();
    let last = $("#formVuelos").serializeArray();
    let adult = $("#adultNumber").val();
    let olderAdult = $("#olderAdultNumber").val();
    let teen = $("#youngNumber").val();
    let children = $("#childrenNumber").val();
    let origen = $("#departure_0").val();
    let origenCode = $("#cDeparture_0").val();
    let destino = $("#arrival_0").val();
    let destinoCode = $("#cArrival_0").val();
    let startDate = $("#startDate_0").val();

    let adultos = parseInt(adult) + parseInt(olderAdult) + parseInt(teen);
    if (parseInt(adultos) == NaN || adultos == "" || adultos <= 0 || adultos >= 10) {
        mostrarInputFeedback('Select a valid number', '#persons');

        validate = false
    } else {
        mostrarInputFeedback('', '#persons', 'is-valid', 'is-valid');
    }

    if (parseInt(children) == NaN || children == "" || children < 0 || children >= 10) {
        mostrarInputFeedback('Select a valid number', '#child');
        validate = false;
    } else {
        mostrarInputFeedback('', '#child', 'is-valid', 'is-valid');
    }

    if (origen == "" || origenCode == "") {
        mostrarInputFeedback('Select a destination', "#departure_0");
        validate = false;
    } else {
        mostrarInputFeedback('', '#departure_0', 'is-valid', 'is-valid');
    }

    if (destino == "" || destinoCode == "") {
        mostrarInputFeedback('Select a destination', "#arrival_0");
        validate = false;
    } else {
        mostrarInputFeedback('', '#arrival_0', 'is-valid', 'is-valid');
    }

    if (startDate == "") {
        mostrarInputFeedback('Select departure date', "#startDate_0");
        validate = false;
    } else {
        mostrarInputFeedback('', '#startDate_0', 'is-valid', 'is-valid');
    }

    if ($("#rounded").prop("checked")) {
        let endDate = $("#endDate_0").val();
        if (endDate == "") {
            mostrarInputFeedback('Select return date', "#endDate_0");
            validate = false;
        } else {
            mostrarInputFeedback('', '#endDate_0', 'is-valid', 'is-valid');
        }
    }
    return validate;

}

function mostrarInputFeedback(msgFeedback, selectorInput, classFeedbackInput = 'is-invalid', classFeedbackMsg = 'invalid-feedback') {
    let elementoPadre = $(selectorInput).parent();

    classFeedbackInput == 'is-invalid' && $(selectorInput).removeClass('is-valid');
    classFeedbackInput == 'is-valid' && $(selectorInput).removeClass('is-invalid');

    $(selectorInput).addClass(classFeedbackInput);
    $(elementoPadre).append(`<div class="feedback ${classFeedbackMsg}">${msgFeedback}</div>`)
}

function cerrarInputsFeedback(selectorInput = null) {
    if (selectorInput == null) {
        $('.feedback').parent().children('.is-invalid').removeClass('is-invalid');
        $('.feedback').remove();
    } else {
        let elementoPadre = $(selectorInput).parent();

        $(elementoPadre).children('.is-invalid').removeClass('is-invalid');
        $(elementoPadre).children('.feedback').remove();
    }
}

function plusOne(dato) {
    var max = parseInt($(dato).attr('max'));

    let valor = $(dato).val();
    valor = parseInt(valor) + 1;
    if (valor < max) {
        $(dato).val(valor);
    } else {
        $(dato).val(max);
    }
}

function lessOne(dato) {
    var min = parseInt($(dato).attr('min'));
    let valor = $(dato).val();
    valor = parseInt(valor) - 1;
    if (valor > min) {
        $(dato).val(valor);
    } else {
        $(dato).val(min);
    }
}

models.fn.getFormData = function($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i) {
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;

}

function showRoundedCalendar() {
    $("#calendarEnd").show();
    var picker = new Lightpick({
        field: document.getElementById('startDate_0'),
        secondField: document.getElementById('endDate_0'),
        format: "YYYY-MM-DD",
        minDate: moment().startOf('day').add(2, 'day'),
        singleDate: false,
        onSelect: function(start, end){
           
        }
    });  

    
     /*   $("#endDate_0").datepicker({
        defaultDate: "+1d",
        changeMonth: true,
        numberOfMonths: 2,
        dateFormat: 'yy-mm-dd',
        onClose: function(selectedDate) {}
    });
    selectedDate = $("#startDate_0").val();
    if (selectedDate != "") {
        $("#endDate_0").datepicker("option", "minDate", selectedDate);
        var arrayDate = selectedDate.split("-");
        var fecha = new Date(arrayDate[0], (arrayDate[1] - 1), arrayDate[2]);
        var fechaMas30 = new Date(arrayDate[2], (arrayDate[1] - 1), arrayDate[0]);

        fecha.setDate(fecha.getDate() + 1);
        fechaMas30.setDate(fechaMas30.getDate() + 29);
        $("#endDate_0").datepicker("setDate", fecha);
        $("#endDate_0").datepicker("option", "minDate", fecha);
    }  */  
}

function hideRoundedCalendar() {
    $("#calendarEnd").hide();
    var picker = new Lightpick({
        lang: 'en',
        format: "YYYY-MM-DD",
        disabledDatesInRange: true,
		minDate: moment().startOf('day').add(3, 'day'),
        field: document.getElementById('startDate_0'),
        onSelect: function(date){
           
        }
    }); 
}

function mostrarCajaBusqueda() {
    $("#cajaReserva").show();
}

$(document).on("change", ".filter-vuelo", function(e) {
    models.listaFiltrada = [];
    let arr_filtros = $("#filtrosVuelos").serializeArray();
    let bandAerolinea = false;
    let bandDeparture = false;
    let bandArrival = false;
    let bandScale = false;
    if (arr_filtros.length > 0) {
        arr_filtros.forEach(function(itemFiltro, indexFiltro) {
            let tipo_filtro = $('#' + itemFiltro.name).data("type");
            let valor_filtro = $("#" + itemFiltro.name).val();
            console.log(tipo_filtro + " " + valor_filtro);
            let arrayTrips = [];


            if (tipo_filtro == "aerolinea") {

                arrayTrips = common.fn.duplicarObjetos(models.data.Trips, 1);
                bandAerolinea = true;
                arrayTrips.forEach(function(itemTrip, indexTrip) {
                    itemTrip.Stretches.forEach(function(itemStretch, indexStretch) {
                        // let arr_Airlines = itemStretch.Airlines;
                        // if($.inArray(valor_filtro,arr_Airlines)!=-1){
                        // 	models.listaFiltrada.push(itemTrip);
                        // }
                        itemStretch.Airlines.forEach(function(itemAirline, indexAirline) {
                            if (valor_filtro == itemAirline.Code) {
                                models.listaFiltrada.push(itemTrip);
                            }
                        });

                    });
                });
            }

            if (tipo_filtro == "escala") {

                arrayTrips = (bandAerolinea == true && bandScale == false) ? models.listaFiltrada : models.data.Trips;

                let arr_temp = []
                arrayTrips.forEach(function(itemTrip, indexTrip) {
                    itemTrip.Stretches.forEach(function(itemStretch, indexStretch) {
                        let stop = itemStretch.Stops;
                        if (stop == valor_filtro) {
                            arr_temp.push(itemTrip);
                        }

                    });
                });
                models.listaFiltrada = (bandAerolinea == true && bandScale == false) ? arr_temp : models.listaFiltrada.concat(arr_temp);
                bandScale = true;
            }

            if (tipo_filtro == "departure-airport") {
                arrayTrips = ((bandAerolinea == true || bandScale == true) && bandDeparture == false) ? models.listaFiltrada : models.data.Trips;

                let array_filtrado = _.filter(arrayTrips, function(trip) {
                    if (trip.ArrivalAirport == valor_filtro) {
                        return trip;
                    }
                });
                if (bandAerolinea == true && bandDeparture == false) {
                    models.listaFiltrada = array_filtrado;
                } else {
                    models.listaFiltrada = models.listaFiltrada.concat(array_filtrado);
                }

                bandDeparture = true;
            }

            if (tipo_filtro == "arrival-airport") {
                arrayTrips = ((bandDeparture == true || bandAerolinea == true || bandScale == true) && bandArrival == false) ? models.listaFiltrada : models.data.Trips;

                let array_filtrado = _.filter(arrayTrips, function(trip) {
                    if (trip.ArrivalAirport == valor_filtro) {
                        return trip;
                    }

                });


                if ((bandDeparture == true || bandAerolinea == true || bandScale == true) && bandArrival == false) {
                    models.listaFiltrada = array_filtrado;
                } else {
                    models.listaFiltrada = models.listaFiltrada.concat(array_filtrado);
                }

                bandArrival = true;
            }



            models.listaFiltrada = models.listaFiltrada.unique();
        });


        models.listaActual = models.listaFiltrada;

        models.dibujaVuelos();
    } else {
        models.listaActual = models.data.Trips;
        models.dibujaVuelos();
    }



});

$(document).on("click", ".calendar-item", function(e) {
    // $("#filtrosVuelos")[0].reset();
    $(".calendar-item").removeClass("activa col-sm-2");
    $(".calendar-item").addClass("col-sm-1_5");

    $(this).addClass("activa col-sm-2")
    $(this).removeClass("col-sm-1_5");

    let fecha = $(this).data("date");
    let fechaFormatted = $(this).data("dateformat");
    models.dibujaVuelos();

});

$(document).on("click", ".flecha-izq", function(e) {
    $("#filtrosVuelos")[0].reset();
    $("#listadoVuelos").html("");
    $("#listadoVuelos").append(`
		<div id="loadingVuelos" style="position:relative;">
			<img src="_assets/_images/template/GIF_CARGADOR_VUELOS_ENG.gif" class="loading img-fluid" style="border-radius: 8px;" />
		</div>`);
    let hoy = new Date();
    hoy.setDate(hoy.getDate() + 3);
    let date = $("#startDate_0").datepicker("getDate");
    let dateMenos = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 3);
    if (dateMenos < hoy) {
        $("#startDate_0").datepicker("setDate", hoy);
    } else {
        $("#startDate_0").datepicker("setDate", dateMenos);
    }
    models.fn.cargaVuelosDias();
});

$(document).on("click", ".flecha-der", function(e) {
    $("#filtrosVuelos")[0].reset();
    $("#listadoVuelos").html("");
    $("#listadoVuelos").append(`
		<div id="loadingVuelos" style="position:relative;">
			<img src="_assets/_images/template/GIF_CARGADOR_VUELOS_ENG.gif" class="loading img-fluid" style="border-radius: 8px;" />
		</div>`);
    let date = $("#startDate_0").datepicker("getDate");
    let endDate = $("#endDate_0").datepicker("getDate");
    let _day = (date.getDate() + 3);
    $("#startDate_0").datepicker("setDate", new Date(date.getFullYear(), date.getMonth(), _day));

    if (_day == endDate.getDate()) {
        $("#endDate_0").datepicker("setDate", new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + 1));
    } else if (_day > endDate.getDate()) {
        let dif = (_day - endDate.getDate()) + 1;
        $("#endDate_0").datepicker("setDate", new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + dif));
    }
    models.fn.cargaVuelosDias();
});

$(document).on("click", ".flecha-arriba", function(e) {
    $("#filtrosVuelos")[0].reset();
    $("#listadoVuelos").html("");
    $("#listadoVuelos").append(`
		<div id="loadingVuelos" style="position:relative;">
			<img src="_assets/_images/template/GIF_CARGADOR_VUELOS_ENG.gif" class="loading img-fluid" style="border-radius: 8px;" />
		</div>`);

    let hoy = new Date();
    hoy.setDate(hoy.getDate() + 3);

    let date = $("#endDate_0").datepicker("getDate");
    let startDate = $("#startDate_0").datepicker("getDate");

    let dateMenos = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 3);
    let _StartDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if (dateMenos < hoy) {
        $("#endDate_0").datepicker("setDate", hoy);
    } else if (dateMenos < _StartDate) {
        date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1);
        $("#endDate_0").datepicker("setDate", date);
    } else {
        $("#endDate_0").datepicker("setDate", dateMenos);
    }
    models.fn.cargaVuelosDias();

});

$(document).on("click", ".flecha-abajo", function(e) {
    $("#filtrosVuelos")[0].reset();
    $("#listadoVuelos").html("");
    $("#listadoVuelos").append(`
		<div id="loadingVuelos" style="position:relative;">
			<img src="_assets/_images/template/GIF_CARGADOR_VUELOS_ENG.gif" class="loading img-fluid" style="border-radius: 8px;" />
		</div>`);
    let date = $("#endDate_0").datepicker("getDate");
    let endDate = $("#endDate_0").datepicker("getDate");
    let _day = (endDate.getDate() + 3);
    $("#endDate_0").datepicker("setDate", new Date(date.getFullYear(), date.getMonth(), date.getDate() + 3));

    if (_day == endDate.getDate()) {
        $("#startDate_0").datepicker("setDate", new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1));
    } else if (_day < endDate.getDate()) {
        let dif = (endDate.getDate() - _day) + 1;
        $("#startDate_0").datepicker("setDate", new Date(date.getFullYear(), date.getMonth(), date.getDate() + dif));
    }
    models.fn.cargaVuelosDias();

});

$(document).on("click", ".preciosFechas", function(e) {

    var caso = $(this).index();


    let filtroDateIda = $(this).children().data("dateida");
    let filtroDateVuelta = $(this).children().data("dateregreso");
    let array_filtrado;

    switch (caso) {
        case 0:

            array_filtrado = _.filter(models.data.Trips, function(trip) {
                if (trip.Stretches[0].DepartureDate.replace(/\//g, '-') == filtroDateIda && trip.Stretches[1].DepartureDate.replace(/\//g, '-') == filtroDateVuelta) {
                    return trip;
                }
            });
            models.listaFiltrada = array_filtrado.unique();
            models.listaActual = models.listaFiltrada;
            console.log(models.listaActual);
            models.dibujaVuelos("9990");

            break;
        case 1:
            array_filtrado = _.filter(models.data.Trips, function(trip) {
                if (trip.Stretches[0].DepartureDate.replace(/\//g, '-') == filtroDateIda && trip.Stretches[1].DepartureDate.replace(/\//g, '-') == filtroDateVuelta) {
                    return trip;
                }
            });
            models.listaFiltrada = array_filtrado.unique();
            models.listaActual = models.listaFiltrada;
            console.log(models.listaActual);
            models.dibujaVuelos("9990");
            break;
        case 2:
            array_filtrado = _.filter(models.data.Trips, function(trip) {
                if (trip.Stretches[0].DepartureDate.replace(/\//g, '-') == filtroDateIda && trip.Stretches[1].DepartureDate.replace(/\//g, '-') == filtroDateVuelta) {
                    return trip;
                }
            });
            models.listaFiltrada = array_filtrado.unique();
            models.listaActual = models.listaFiltrada;
            console.log(models.listaActual);
            models.dibujaVuelos("9990");
            break;
        case 3:
            array_filtrado = _.filter(models.data.Trips, function(trip) {
                // trip.Stretches[1].DepartureDate.replace(/\//g,'-')
                // trip.Stretches[0].DepartureDate.replace(/\//g,'-')
                if (trip.Stretches[0].DepartureDate.replace(/\//g, '-') == filtroDateIda && trip.Stretches[1].DepartureDate.replace(/\//g, '-') == filtroDateVuelta) {
                    return trip;
                }
            });
            models.listaFiltrada = array_filtrado.unique();
            models.listaActual = models.listaFiltrada;
            console.log(models.listaActual);
            models.dibujaVuelos("9990");
            break;
        case 4:
            array_filtrado = _.filter(models.data.Trips, function(trip) {
                if (trip.Stretches[0].DepartureDate.replace(/\//g, '-') == filtroDateIda && trip.Stretches[1].DepartureDate.replace(/\//g, '-') == filtroDateVuelta) {
                    return trip;
                }
            });
            models.listaFiltrada = array_filtrado.unique();
            models.listaActual = models.listaFiltrada;
            console.log(models.listaActual);
            models.dibujaVuelos("9990");
            break;
        case 5:
            array_filtrado = _.filter(models.data.Trips, function(trip) {
                if (trip.Stretches[0].DepartureDate.replace(/\//g, '-') == filtroDateIda && trip.Stretches[1].DepartureDate.replace(/\//g, '-') == filtroDateVuelta) {
                    return trip;
                }
            });
            models.listaFiltrada = array_filtrado.unique();
            models.listaActual = models.listaFiltrada;
            console.log(models.listaActual);
            models.dibujaVuelos("9990");
            break;
        case 6:
            array_filtrado = _.filter(models.data.Trips, function(trip) {
                if (trip.Stretches[0].DepartureDate.replace(/\//g, '-') == filtroDateIda && trip.Stretches[1].DepartureDate.replace(/\//g, '-') == filtroDateVuelta) {
                    return trip;
                }
            });
            models.listaFiltrada = array_filtrado.unique();
            models.listaActual = models.listaFiltrada;
            console.log(models.listaActual);
            models.dibujaVuelos("9990");
            break;
        default:
            break;
    }


    // console.log(filtroDateIda);
    // console.log(filtroDateVuelta);


});

$(document).on("click", ".botonpaqueteredondo", function(e) {
    $("#calendario").show("slow");
    $("#vuelosArmadosIdaVuelta").hide("slow");
    $(".botonarmadoredondo").removeClass("botonActivoRedondo");
    $(".botonpaqueteredondo").removeClass("botonDesactivadoRedondo");
    $(".botonarmadoredondo").addClass("botonDesactivadoRedondo");
    $(".botonpaqueteredondo").addClass("botonActivoRedondo");

});

$(document).on("click", ".botonarmadoredondo", function(e) {
    $("#calendario").hide("slow");
    $("#vuelosArmadosIdaVuelta").show("slow");
    $(".botonpaqueteredondo").removeClass("botonActivoRedondo");
    $(".botonarmadoredondo").removeClass("botonDesactivadoRedondo");
    $(".botonpaqueteredondo").addClass("botonDesactivadoRedondo");
    $(".botonarmadoredondo").addClass("botonActivoRedondo");
    $("#listadoVuelosOneWayIda").append(common.fn.toDraw(models.maqueta.modeloPintadoOneWay, models.listaActual));
});

$(document).on("click", "#vueloredondoIda", function(e) {
    $(".botonarmadoredondoIda").addClass("botonActivoRedondo");
    $(".botonarmadoredondoIda").removeClass("botonDesactivadoRedondo");
    $(".botonarmadoredondoVuelta").removeClass("botonActivoRedondo");
    $(".botonarmadoredondoVuelta").addClass("botonDesactivadoRedondo");
    $("#listadoVuelosOneWayVuelta").hide();
    $("#listadoVuelosOneWayIda").show();
    $("#listadoVuelosOneWayIda").append(common.fn.toDraw(models.maqueta.modeloPintadoOneWay, models.listaActual));

});

$(document).on("click", "#vueloredondoVuelta", function(e) {
    $(".botonarmadoredondoVuelta").addClass("botonActivoRedondo");
    $(".botonarmadoredondoVuelta").removeClass("botonDesactivadoRedondo");
    $(".botonarmadoredondoIda").removeClass("botonActivoRedondo");
    $(".botonarmadoredondoIda").addClass("botonDesactivadoRedondo");
    $("#listadoVuelosOneWayIda").hide();
    $("#listadoVuelosOneWayVuelta").show();
    $("#listadoVuelosOneWayVuelta").append(common.fn.toDraw(models.maqueta.modeloPintadoOneWay, models.listaActual));
});

$(document).on("click", "#vueloredondoMuestraMatriz", function(e) {
    if ($("#matrizDisponibilidad").hasClass("activo")) {

        $(".fechasVuelta").hide('slow');
        $("#matrizDisponibilidad").removeClass("activo")
    } else {
        $(".fechasVuelta").show('slow');
        $("#matrizDisponibilidad").addClass("activo")
    }
});


models.fn.cargaVuelosDias = function() {

    var last = models.fn.getFormData($("#formVuelos"));

    let validar = validaDatosVuelos();
    if (validar) {

        // $("#fechasVuelos").hide();
        $("#fechasVuelosRegreso").hide();
        $("#diagonal").hide();
        $('#matrizprecios').hide();
        $('.opcionesredondos').hide();
        $("#fechasVuelos").html("");
        $("#fechasVuelos").append(`<div style="font-size:1.5rem;text-align: center;margin-right: 115px;" class="mt-2 mb-2"><i class="fa fa-spinner fa-pulse"></i></div>`);

        // $("#fechasVuelosRegreso").append(`<div style="font-size:1.5rem" class="mt-2 mb-2"><i class="fa fa-spinner fa-pulse"></i> Loading...</div>`);


        $.ajax({
            url: '/_assets/_controllers/vuelosProcesaBuscadorNet.php',
            type: "POST",
            dataType: "json",
            beforeSend: function(e) {


            },
            data: { valueF: last },
            success: function(data) {

                console.log(data);
                if (data.errorCode) {
                    console.warn(data.errorInfo);
                } else {
                    if (models.data.Trips == null || models.data.Trips.length <= 0) {
                        $("#frame2").hide();
                        $("#cajaReserva").show();
                        $("#msg_error").show();
                    } else {
                        models.data = data.Resultados;
                        models.calendario = models.data.Calendario;
                        models.calendarioRegreso = models.data.matriz;
                        models.catalogos = models.data.Catalogos;
                        models.lastSearch = JSON.parse(models.data.parameters);
                        models.stretches = models.data.stretches;
                        for (var i = models.data.Trips.length - 1; i >= 0; i--) {
                            var t = models.data.Trips[i];
                            t.arrivalCity = models.fn.getCities(t.ArrivalAirport);
                            t.departureCity = models.fn.getCities(t.DepartureAirport);
                            t.SessionNet = models.data.SesionNet;
                            t.token = models.data.token;
                            if (t.diaMas > 0) {
                                t.diaMas = "+" + t.diaMas;
                            }
                            for (var l = 0; l < t.Stretches.length; l++) {
                                t.Stretches[l] = models.fn.getStretch(t.Stretches[l]);
                            }
                        }

                        models.listaActual = models.data.Trips;
                        models.listaFiltrada = [];
                        models.dibujaCalendario();
                        models.dibujaResumenBusqueda();
                        models.dibujaFiltros();
                        models.dibujaVuelos();
                    }


                }
                $("#fechasVuelos").show();
                if (models.tipoVuelo == "rounded") {

                    $("#fechasVuelosRegreso").show();
                    $("#diagonal").show();
                    $('#matrizprecios').show();

                    $('.opcionesredondos').show();
                }
            }

        });
    }

}

// models.modelo.fn.filtrado =function(){
// 	var lol = _.filter(models.data.Trips,  function(trip){
// 		trip.Stretches.forEach(function(itemStretch,indexStretch){
// 			itemStretch.vuelos.forEach(function(itemVuelo, indexVuelo){

// 				if(itemVuelo.AirlineCode == "UA"){
// 					console.log(itemVuelo);				
// 				}			

// 			});
// 		});

// 	});

// }

$(document).on("click", ".changeFly", function(e) {
    let departureText = $("#departure_0").val();
    let departureCode = $("#cDeparture_0").val();

    let arrivalText = $("#arrival_0").val();
    let arrivalCode = $("#cArrival_0").val();
    $("#departure_0").val(arrivalText);
    $("#cDeparture_0").val(arrivalCode);
    $("#arrival_0").val(departureText);
    $("#cArrival_0").val(departureCode);
});