var _ga = window._ga || {}

_ga.configuracion={ 
				id:0,
				agencia:"",
				clave:"",
				tipoUser:"",
				location:""
            };
_ga.evento={
	categoria:"",
	accion:"",
	etiqueta:"", 
	valor:""
};

_ga.tiposEvento=["Búsqueda de Hoteles",
			"Búsqueda de Tours",
			"Búsqueda de Vuelos",
			"Búsqueda de Autos",
			"Hoteles agregar a carrito",
			"Tours agregar a carrito",
			"Vuelos agregar a carrito",
			"Autos agregar a carrito",
			"Hoteles ver mapa",
			"Hoteles eliminar carrito"
	]


_ga.duplicarObjetos = function (o, flag) {
	return jQuery.extend(true, (flag ? [] : {}), o);
};

_ga.envioEvento = function(tipo,datos){

	ga('send', 'event', `${tipo} - ${datos.categoria}`, datos.accion,  datos.etiqueta, datos.valor);
};


_ga.asignaValores= function(datos){
	
	var evento=_ga.duplicarObjetos(_ga.evento,false);
	evento.categoria=datos[0];
	evento.accion=_ga.configuracion.tipoUser+' - '+_ga.configuracion.location+' - '+_ga.configuracion.id+' - '+_ga.configuracion.agencia+' - '+_ga.configuracion.clave;
	evento.etiqueta=datos[1];
	evento.valor=datos[2];
	return evento;
}