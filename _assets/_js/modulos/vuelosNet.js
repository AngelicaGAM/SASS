var $BE=$BE||{};
$BE.modelo=$BE.modelo||{};
$BE.modelo.fn=$BE.modelo.fn||{};
$BE.modelo.fn.vuelos=$BE.modelo.fn.vuelos||{};
$(document).ready(function(){
	$("a.flightsMenu").click($BE.modelo.fn.vuelos.verBooking);
	$("#listaVuelos").on("click",".verDetalle.cerrado",$BE.modelo.fn.muestraDetallesVuelos );
	$("#listaVuelos").on("click",".verDetalle.abierto",$BE.modelo.fn.ocultaDetallesVuelos );
	$("button#changeSearch").click($BE.modelo.fn.vuelos.verBooking);

	$BE.modelo.fn.inicializaCalendarios();
	$BE.modelo.fn.inicializaAutocomplete();
})

var jsonpurl="https://www.travelnet.com.mx/Autocompleteboxjsonp/vuelos?callback=?";
var jsonpaerolineas="https://www.travelnet.com.mx/Autocompleteboxjsonp/aerolineas?callback=?";
$BE.modelo.fn.vuelos.verBooking=function(e){
e.preventDefault();
$("#bookingBox").show();
};

$BE.modelo.fn.inicializaCalendarios=function(){

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
			fecha.setDate(fecha.getDate() );
			//fechaMas30.setDate(fechaMas30.getDate() + 29);
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

$BE.modelo.fn.inicializaAutocomplete=function(){
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

$BE.modelo.fn.cargaVuelos=function(){
	var last=$("#formVuelos").serializeArray();
	$.ajax({
		url : '/_assets/_controllers/vuelosProcesaBuscadorNet.php',
		 type:"POST",
		 data:{valueF :last}
		 }).done(function(data){ 
		 	console.log(data)
		});

}

$BE.modelo.fn.muestraDetallesVuelos=function(){
	var actual=$(this).closest(".vuelo");
	$(this).removeClass("cerrado")
	$(this).addClass("abierto")
	$(".detalle",actual).toggle("slow");
}
$BE.modelo.fn.ocultaDetallesVuelos=function(){
	var actual=$(this).closest(".vuelo");
	$(this).removeClass("abierto");
	$(this).addClass("cerrado");
	$(".detalle",actual).toggle("slow");
}