var models = window.models || {};
models.maqueta = models.maqueta || {};

models.maqueta.diagonal = '<div class="textoIda">Ida</div>' +
    '<div class="skewed"></div>' +
    '<div class="textoVuelta">Vuelta</div>'

models.maqueta.calendarioMatriz = '<tr id="{tr}" class="preciosFechas {principal} hvr-back-pulse"><td data-dateIda="{DateIda}" data-dateRegreso="{DateRegreso}"><div class="fromspan">FROM</div> <div class="pricespan">${From} MXN</div></td></tr>';
models.maqueta.calendarioMatrizSinDisponibilidad = '<tr  data-notavailable="nodisponible" class="preciosFechas hvr-buzz-out"><td data-date="{Date}"><div class="fromspan"></span> {Empty}</td></tr>';


models.maqueta.calendarioRegreso = '<li class="col-sm-12 calendar-itemRounded" data-type="calendar" data-date="{Date}" data-dateFormat="{formatoFecha}"><span class="fecha">{formatoFecha}</span> </li>';
models.maqueta.calendarioPrincipalRegreso = '<li class="col-sm-12 calendar-itemRounded activa" data-type="calendar" data-date="{Date}" data-dateFormat="{formatoFecha}"><span class="fecha">{formatoFecha}</span></li>';
models.maqueta.calendarioDisabledRegreso = `<li class="col-sm-12 disabled-calendar" data-type="calendar" data-date="{Date}" data-dateFormat="{formatoFecha}" title="&#xf129;" data-content="To obtain a quote for this date, contact your Personal Concierge who will be glad to assist you <br><strong>USA, CAN: 1-888-963-7689 <br> México: 01-800-272-0294</strong> " rel="popover" data-html="true" data-placement="bottom" data-original-title="Title" data-trigger="hover"><span class="fecha">{formatoFecha}</span></li>`;

models.maqueta.calendarioIda = '<li class="col-sm-1_5 calendar-item" data-type="calendar" data-date="{dateIda}" data-dateFormat="{fechaIda}"><div class="fecha">{fechaIda}</div></li>';
models.maqueta.calendarioPrincipalIda = '<li class="col-sm-2 calendar-item activa" data-type="calendar" data-date="{dateIda}" data-dateFormat="{fechaIda}"><div class="fecha">{fechaIda}</div></li>';


models.maqueta.calendario = '<li class="col-sm-1_5 calendar-item" data-type="calendar" data-date="{Date}" data-dateFormat="{formatoFecha}"><div class="fecha">{formatoFecha}</div></li>';
models.maqueta.calendarioDisabled = `<li class="col-sm-1_5 disabled-calendar" data-type="calendar" data-date="{Date}" data-dateFormat="{formatoFecha}" title="&#xf129;" data-content="To obtain a quote for this date, contact your Personal Concierge who will be glad to assist you <br><strong>USA, CAN: 1-888-963-7689 <br> México: 01-800-272-0294</strong> " rel="popover" data-html="true" data-placement="bottom" data-original-title="Title" data-trigger="hover"><div class="fecha">{formatoFecha}</div></li>`;
models.maqueta.calendarioPrincipal = '<li class="col-sm-2 calendar-item activa" data-type="calendar" data-date="{Date}" data-dateFormat="{formatoFecha}"><div class="fecha">{formatoFecha}</div></li>';

models.maqueta.modeloPintadoOneWay = '<div id="vuelo_0" class=" row vuelo" data-tokenVuelo="{uid}" data-jcartToken="22222" data-gmelemento="9998" data-tokenBusqueda="{token}" data-tokenNetactica="{SessionNet}" data-seccion="{seccion}">' +
    '<div class="col-sm-1">' +
    '<img src="/_assets/_images/aerolineas/isotipo-{AirlineCode}.png" style="width: 50px;">' +
    '</div>' +
    '<div class="col-sm-2 titulosVuelos" >' +
    '<span>{DepartureDate}</span>' +
    '<br>' +
    '<span>{horarioDeparture}</span>' +
    '<br>' +
    '<span>{departureCity.Description_Es}</span>' +
    '</div>' +
    '<div class="col-sm-3">' +
    '  --{Stops}--' +
    '</div>' +
    '<div class="col-sm-2 titulosVuelos" >' +
    '<span>{ArrivalDate}</span>' +
    '<br>' +
    '<span>{horarioArrival} {diaMas}</span>' +
    '<br>' +
    '<span>{arrivalCity.Description_Es}</span>' +
    '<br>' +
    '</div>' +
    '<div class="col-sm-2" style="vertical-align: middle; align-items: center;">' +
    '<form id="formVuelo-{uid}" class="jcart">' +
    '<button class="agregarCarrito botonAgregar my-add-button" name="my-add-button" data-c="{uid}" >${TotalAmount}</button>' +
    '</form>' +
    '</div>' +
    '<div class="col-sm-2" style="vertical-align: middle; align-items: center;">' +
    '<span class="verDetalle cerrado"  data-segmento="1">Más detalles <i class="fa fa-chevron-down"></i></span>' +
    '</div>' +
    '<div class="col-sm-12 detalle" id="mostrarDetalle1">' +
    '</div>' +
    '</div><div class="limpiar"></div> <hr>';

models.maqueta.modeloPintadoRound = '<div id="vuelo_0" class=" row vuelo" data-tokenVuelo="{ida.uid}" data-jcartToken="22222" data-gmelemento="9998" data-tokenBusqueda="{ida.token}" data-tokenNetactica="{ida.sessionNet}" data-seccion="{seccion}">' +
    '<div class="VueloIda row" data-tokenVuelo="{ida.uid}">' +
    '<div class="col-sm-12 estiloTarjeta">Ida, {ida.DepartureDate}</div>' +
    '<div class="col-sm-1">' +
    '<br>' +
    '<img src="/_assets/_images/aerolineas/isotipo-{ida.AirlineCode}.png" style="width: 50px;">' +
    '</div>' +
    '<div class="col-sm-2" style="font-size: 12px;">' +
    '<br>' +
    '<span class="estiloHorario">{ida.horarioDeparture}</span>' +
    '<br>' +
    '<span class="estiloDestino">{ida.departureCity.Description_Es}</span>' +
    '</div>' +
    '<div class="col-sm-2">' +
    ' <span class="idaStops">{ida.Stops}</span>' +
    '<br>' +
    ' <span><hr class="lineaStops"></span>' +
    '</div>' +
    '<div class="col-sm-2" style="font-size: 12px;">' +
    '<br>' +
    '<span class="estiloHorario">{ida.horarioArrival} {diaMas}</span>' +
    '<br>' +
    '<span class="estiloDestino">{ida.arrivalCity.Description_Es}</span>' +
    '<br>' +
    '</div>' +
    '<div class="col-sm-2" style="vertical-align: middle; align-items: center;">' +
    '<br>' +
    '<span class="verDetalle cerrado"  data-segmento="1">Más detalles <i class="fa fa-chevron-down"></i></span>' +
    '</div>' +
    '<div class="col-sm-12 detalle" id="mostrarDetalle1">' +
    '</div>' +
    '</div><div class="limpiar"></div>' +
    '<div class="VueloRegreso row" data-tokenVuelo="{ida.uid}">' +
    '<div class="col-sm-12 estiloTarjeta">Regreso, {regreso.DepartureDate}</div>' +
    '<div class="col-sm-1">' +
    '<br>' +
    '<img src="/_assets/_images/aerolineas/isotipo-{regreso.AirlineCode}.png" style="width: 50px;">' +
    '</div>' +
    '<div class="col-sm-2" style="font-size: 12px;">' +
    '<br>' +
    '<span class="estiloHorario">{regreso.horarioDeparture}</span>' +
    '<br>' +
    '<span class="estiloDestino">{regreso.departureCity.Description_Es}</span>' +
    '</div>' +
    '<div class="col-sm-2">' +
    ' <span class="idaStops">{regreso.Stops}</span>' +
    '<br>' +
    ' <span><hr class="lineaStops"></span>' +
    '</div>' +
    '<div class="col-sm-2" style="font-size: 12px;">' +
    '<br>' +
    '<span class="estiloHorario">{regreso.horarioArrival} {regreso.diaMas}</span>' +
    '<br>' +
    '<span class="estiloDestino">{regreso.arrivalCity.Description_Es}</span>' +
    '<br>' +
    '</div>' +
    '<div class="col-sm-2" style="vertical-align: middle; align-items: center;">' +
    '<br>' +
    '<span class="verDetalle cerrado" data-segmento="2">Más detalles <i class="fa fa-chevron-down"></i></span>' +
    '</div>' +
    '<div class="col-sm-2 estiloPrecioBoton">' +
    '<br><br><br>' +
    '<form id="formVuelo-{ida.uid}" class="jcart">' +
    '<span class="estiloPrecio">${ida.TotalAmount}</span>' +
    '<button class="agregarCarrito botonAgregar my-add-button" name="my-add-button" data-c="{ida.uid}" >Select</button>' +
    '</form>' +
    '</div>' +
    '<div class="col-sm-12 detalle" id="mostrarDetalle2">' +
    '</div>' +

    '</div><div class="limpiar"></div>' +
    '</div> <hr>';

models.maqueta.detalles = '<div class="row segmento">' +
    '<div class="col-sm-1_5">' +
    '<span>{PersonalizedArrivalDate}</span>' +
    '</div>' +
    '<div class="col-sm-1_5">' +
    '<span>Vuelo</span>' +
    '<br>' +
    '<span>{FlightNumber}</span>' +
    '</div>' +
    '<div class="col-sm-1 flecha">' +
    '<img src="/_assets/_images/aerolineas/isotipo-{AirlineCode}.png" style="width: 50px;">' +
    '</div>' +
    '<div class="col-sm-5">' +
    '<span class="horario">{horarioDeparture} - {horarioArrival}</span>' +
    '<br>' +
    '<span>{DepartureAirport} - {ArrivalAirport} </span> <!--<span class="asientos">Quedan 12 asientos </span>-->' +
    '<br>' +
    '<span>{Airline.Description_Es} {FlightNumber} </span> - <span> {EquipmentCode} </span>' +
    '<br>' +
    '<span>Operado por {OperatingAirlineCode.Description_Es} </span>' +
    '</div>' +
    '<div class="col-sm-3">' +
    '<span>Tiempo de Vuelo</span> <span class="horario">{Duracion} </span>' +
    '<br>' +
    '<span>Clase: {CabinType}</span>' +
    '</div>' +
    '</div>'


models.maqueta.escalas = '<div class="row escalaPintado" id="mostrarTiempoEscala"><span> <img src="/_assets/_images/aerolineas/relojVuelos.png" alt="reloj" style="width: 11px;"/> <span>{tiempoEscalaFormateado}</span> </span></div>'