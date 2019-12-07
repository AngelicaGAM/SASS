var models=window.models || {};
var common=window.common || {};
models.listaActual=[];
models.listaFiltrada=[];
models.listaRespaldo=[];
models.lastSearch =[];
models.progressBar='';
models.progressStatus = false;

models.url='/';
if(location.pathname.indexOf('/es/')>=0){
	models.url='/es/';
}

Date.prototype.formatoFecha= function(valor){
	let dia = this.getDate();
	let mes = this.getMonth()+1;
	let anio = this.getFullYear();
	if(valor==1){

		return (dia<10?'0'+dia:dia)+"/"+(mes<10?'0'+mes:mes)+"/"+anio;
	}else if(valor==2){
		return anio+"/"+(mes<10?'0'+mes:mes)+"/"+(dia<10?'0'+dia:dia);
	}else if (valor==3){
		return anio+"/"+(dia<10?'0'+dia:dia)+"/"+(mes<10?'0'+mes:mes);
	}else if (valor==4){
		return (mes<10?'0'+mes:mes)+"/"+(dia<10?'0'+dia:dia)+"/"+anio;
	}else if (valor==5){
		return (mes<10?''+mes:mes)+"/"+(dia<10?''+dia:dia)+"/"+anio;
	}else if (valor==6){
		return (mes<10?''+mes:mes)+"-"+(dia<10?''+dia:dia)+"-"+anio;
	}
}

Array.prototype.unique=function(a){
	return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
  });

  Array.prototype.shuffle = function() {
	var i = this.length, j, temp;
	if ( i == 0 ) return this;
	while ( --i ) {
	   j = Math.floor( Math.random() * ( i + 1 ) );
	   temp = this[i];
	   this[i] = this[j];
	   this[j] = temp;
	}
	return this;
  }

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

$("#progress").progressbar({
	change: function() {
	  $( "#progress-label" ).text( $("#progress").progressbar( "value" ) + "%" );
	},
	complete: function() {
	  $( "#progress-label" ).text( "100%" );
	}
  });
models.progressBarE = $("#progress");

function available(date) {
	dmy = date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();
	if ($.inArray(dmy, availableDates) != -1) {
	  return [true, "","Available"];
	} else {
	  return [false,"","unAvailable"];
	}
  }

var jsonpurl="https://www.travelnet.com.mx/Autocompleteboxjsonp/vuelos?callback=?";
models.modelo=models.modelo||{};
models.modelo.fn=models.modelo.fn||{};
models.modelo.fn.vuelos=models.modelo.fn.vuelos||{};
	$(document).ready(function(){
		// $("a.flightsMenu").click(models.modelo.fn.vuelos.verBooking);
		// $("#listadoVuelos").on("click",".verDetalle.cerrado",models.modelo.fn.muestraDetallesVuelos );
		// $("#listadoVuelos").on("click",".verDetalle.abierto",models.modelo.fn.ocultaDetallesVuelos );
		// $("button#changeSearch").click(models.modelo.fn.vuelos.verBooking);
		$("#buscarTours").on("click",models.modelo.fn.cargaTours);
		// $("#listadoVuelos").on("click",".agregarCarrito",models.modelo.fn.addToJCart);
		models.modelo.fn.inicializaCalendarios();
		models.modelo.fn.inicializaAutocomplete("#destination");
		models.modelo.fn.inicializaCards();
		models.modelo.fn.inicializaPersonas();
	})
	
	models.modelo.fn.inicializaCalendarios=function(){

		$("#startDate").datepicker(
		{
			minDate : 3,
			changeMonth : true,
			numberOfMonths : 1,
			dateFormat : 'yy-mm-dd'
			
		});  
		
	}

	models.modelo.fn.inicializaAutocomplete=function(inputName){
		$(inputName).autocomplete({
	
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
					$("#destinationCode").val(ui.item.cFrom);	
	
			},
			open : function() {
				$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
			},
			close : function() {
				$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
			}
		});
	}

	models.modelo.fn.inicializaPersonas=function(){

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
			// console.log(modelo);
	
		  });
	
	}

	models.modelo.fn.inicializaCards=function(){
		$("#principalDestinations").html("");
		_destinations_cards.shuffle();
		_destinations_cards.forEach(function(item, index) {
			let modelo = `
			<div class="col-6 col-xs-6 col-sm-6 col-md-4 col-lg-3 destination-card">
					<div class="search-card" data-destinationcode="${item.code}" data-destinationname="${item.name}">
					<img src="${item.image}" alt="..." class="img-destination-card">
					<div class="etiqueta-nombre-card"><span>${item.name}</span></div>
					</div>
			</div>`;
				$("#principalDestinations").append(modelo);
			// console.log(modelo);
	
		  });
	
	}

	function showBusqueda(){
		$("#contenidoCards").hide();
		$(".bannerTitulo").hide();
		$("#contenidoBusqueda").show();
	}
	
	models.modelo.fn.cargaTours = function(){
	
		var last = models.modelo.fn.getFormData($("#formTours"));
		last.divisa = $("#divisa").val();
		let validar= models.modelo.fn.validaFormTours();
		// console.log(validar);
		if(validar){
			$(".bannerTitulo").hide();
			$("#contenidoCards").hide();
			$("#contenidoBusqueda").hide();	
			$("#msg_error").hide();
			$("#frame2").show();
			$.ajax({
				url : '/_assets/_controllers/toursProcesaBuscadorNet.php',
				type:"POST",
				dataType:"json",
				beforeSend: function(e) {
					models.progressStatus = true;
					models.progressBarE.progressbar( "option", "value", 0 );
					setTimeout( models.progressBar(), 300 );
					models.lastSearch = last;
				},
				data: {valueF:last},
				success:function(data){

					console.log(data);
					if(data.Resultados.extras != null && data.Resultados.extras != ""){
						models.modelo.data = data.Resultados.extras;
						models.modelo.token = data.Resultados.token;
						models.modelo.sessionToken = data.Resultados.sesionNet;
						models.modelo.filtros = data.Resultados.filtros;
						$("#contenidoCards").hide();
						$(".bannerTitulo").hide();
						$("#selectedTour").hide();
						$("#contenidoBusqueda").show();
						models.modelo.fn.cargaDatosBusqueda();
						models.modelo.fn.carousel();
						models.modelo.fn.dibujaTours();
						$("#frame2").hide();

						setTimeout(function(){
							models.progressBarE.progressbar( "option", "value", 100);
							models.progressStatus = false;
						}, 3000);

					}
					
					
				}
				
			});
		}

	}

	models.modelo.fn.carousel = function(){
		models.modelo.data.forEach(function(itemTour,indexTour){
			let carousel 		=  `<div id="carousel${itemTour.id}" class="carousel slide card-carousel" data-ride="carousel">`;
			let indicatorsHtml 	= `<ol class="carousel-indicators">`;
			let imagesHtml 		= `<div class="carousel-inner">`;

			if(itemTour.TravelExtraInfo.Images.length == 0){
				let arrayImages = [{"ImageURL": "/_assets/_images/tour/no-disponible/actividadesnoavailable.jpg"}];
				itemTour.TravelExtraInfo.Images = arrayImages;
			}

			itemTour.TravelExtraInfo.Images.forEach(function(itemImage,indexImage){
				if(indexImage < 8){
				indicatorsHtml += `
							<li data-target="#carousel${itemTour.id}" data-slide-to="${indexImage}" class="${indexImage==0 ? "active" : ""}"></li>
				`;
				imagesHtml += `
						<div class="carousel-item ${indexImage==0 ? "active" : ""}">
                            <img src="${itemImage.ImageURL}" class="d-block w-100" alt="...">
                          </div>
				`;
				}
			});

			indicatorsHtml 	+= `</ol><div class="hexagono"><span>Precio por adulto</span><h4>$${itemTour.SellPriceFrom.EquivalentAmount}</h4><span>${itemTour.SellPriceFrom.EquivalentCurrencyCode}</span></div>`;
			imagesHtml 		+= `</div>`;
			carousel 		+= indicatorsHtml + imagesHtml;
			carousel 		+= `
					<a class="carousel-control-prev" href="#carousel${itemTour.id}" role="button" data-slide="prev">
						<span class="carousel-control-prev-icon" aria-hidden="true"></span>
						<span class="sr-only">Previous</span>
					</a>
					<a class="carousel-control-next" href="#carousel${itemTour.id}" role="button" data-slide="next">
						<span class="carousel-control-next-icon" aria-hidden="true"></span>
						<span class="sr-only">Next</span>
					</a>
				</div>
			`;
			models.modelo.data[indexTour].carouselHtml = carousel;
			// console.log(carousel);
		});
	}

	models.modelo.fn.dibujaTours = function(){		
		$("#resultadosTours").html("");
		$("#resultadosTours").show();
		models.modelo.data.forEach(function(itemTour, indexTour){
			htmlCard = `<div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 justify-content-center">
								<div class="card-tours-search">`;
			htmlCard += itemTour.carouselHtml;
			htmlCard += `<div>
							<div class="tittle-tipo">
							<span data-idTour="${itemTour.id}">${itemTour.TravelExtraInfo.Name}</span>
							</div>
							<div class="tittle-tour">
							<span data-idTour="${itemTour.id}">${itemTour.TravelExtraInfo.Name}</span>
							</div>
							<div class="description-tour">
							<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio cumque sequi quos modi excepturi eligendi porro possimus atque necessitatibus placeat voluptate explicabo dolore ratione quidem, perspiciatis qua</p>
							</div>
						</div>
					</div>
				</div>`;
				models.modelo.data[indexTour].cardHtml = htmlCard;

				$("#resultadosTours").append(htmlCard);
		});
		
	}

	models.modelo.fn.cargaDatosBusqueda = function(){
			$("#listaResumenBusqueda").html("");
			$("#listaResumenBusqueda").append(`<li> <i class="fa fa-map-marker"></i> ${models.lastSearch.destination}</li>`);
			$("#listaResumenBusqueda").append(`<li> <i class="fa fa-calendar"></i> ${models.lastSearch.startDate} a ${models.lastSearch.endDate}</li>`);
	}

	models.modelo.fn.getFormData=function($form){
		var unindexed_array = $form.serializeArray();
		var indexed_array = {};
	   
			$.map(unindexed_array, function(n, i){
			   indexed_array[n['name']] = n['value']; 
			});
	   
			return indexed_array;
	   
	   }

	   models.modelo.fn.validaFormTours = function(){
		let validate = true;
		cerrarInputsFeedback();
		let last		=	$("#formVuelos").serializeArray();
		let adult  		= 	$("#adultNumber").val();
	
		let children 	= 	$("#childrenNumber").val();
		let destino 	= 	$("#destination").val();
		let destinoCode = 	$("#destinoCode").val();
		let startDate 	= 	$("#startDate").val();
	
		let adultos = parseInt(adult);
		if(parseInt(adultos)==NaN || adultos == "" || adultos<=0 || adultos >= 10){
			mostrarInputFeedback('Select a valid number', '#persons');
			
			validate=false
		}else{
			mostrarInputFeedback('', '#persons','is-valid','is-valid' );
		}
	
		// if(parseInt(children)==NaN || children == "" || children<0 || children >= 10){
		// 	mostrarInputFeedback('Select a valid number', '#child');
		// 	validate=false;
		// }else{
		// 	mostrarInputFeedback('', '#child','is-valid','is-valid' );
		// }
	
		if(destino=="" || destinoCode==""){
			mostrarInputFeedback('Select a destination', "#destination");
			validate=false;
		}else{
			mostrarInputFeedback('', '#destination','is-valid','is-valid' );
		}
	
		if(startDate==""){
			mostrarInputFeedback('Select departure date', "#startDate");
			validate=false;
		}else{
			mostrarInputFeedback('', '#startDate','is-valid','is-valid' );
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
	
	function plusOne(dato){
		// let dato = "#"+input;
		var max = parseInt($(dato).attr('max'));
		
		let valor=$(dato).val();
		valor = parseInt(valor)+1;
		if(valor<max){
			$(dato).val(valor);
		}else{
			$(dato).val(max);
		}
	
	}
	
	function lessOne(dato){
		// let dato = "#"+input;
		var min = parseInt($(dato).attr('min'));
		let valor=$(dato).val();
		valor = parseInt(valor)-1;
		if(valor>min){
			$(dato).val(valor);
		}else{
			$(dato).val(min);
		}
		
	}

	$(document).on("change", "#startDate", function(e){
		let date = new Date($("#startDate").val());		
		date.setDate(date.getDate()+5);
		let month = date.getMonth()+1;
		$("#endDate").val(`${date.getFullYear()}-${month+1 < 10 ? "0"+month : month}-${date.getDate() < 10 ? "0"+date.getDate() : date.getDate()}`);
	});

	$(document).on("click", ".carousel-indicators li", function(e){
		$(this).parent().children().removeClass("active");
		$(this).addClass("active");
	});

	$(document).on("click", ".tittle-tipo span, .tittle-tour span", function(e){
		let id_tour = $(this).data("idtour");
		models.modelo.data.forEach(function(itemTour, indexTour){
			if(itemTour.id == id_tour){
				models.modelo.selectedTour = itemTour;
				$("#tittle-tour-selected").html("");
				$("#tittle-tour-selected").append(`<i class="fa fa-arrow-left" onclick="backListGeneral()" style="cursor:pointer"></i><span> TOUR / ${itemTour.TravelExtraInfo.Name}</span>`);
				$("#description-tour-selected").append();
			}
		});
		models.modelo.fn.dibujaToursPaquetes();
		$("#resultadosTours").hide();
		$("#selectedTour").show();

	});

	function backListGeneral(){
		$("#selectedTour").hide();
		$("#resultadosTours").show();
		
	}

	models.modelo.fn.dibujaToursPaquetes = function(){
		$("#types-tour-selected").html("");
		models.modelo.selectedTour.Products.forEach(function(itemProduct, indexProduct)
		{
			let arrDates = [];
			itemProduct.Dates.forEach(function(itemDate, indexDate){
				let date = new Date(itemDate.Date).formatoFecha(5);
				date= `"${date}"`;
				arrDates.push(date);
			});
			let pricesText = "";
			itemProduct.precios.forEach(function(itemPrice, indexPrice){
				pricesText += `
			<div class="row letter-green-normal ml-1 mr-3">
				<div class="col-5 leftText">
					<span>${(itemPrice.PaxName == null || itemPrice.PaxName == "") ? "Pax " : itemPrice.PaxName} (s):</span>
				</div>
				<div class="col-7 rightText">
					<span>$ ${itemPrice.precioPublico} ${models.modelo.selectedTour.SellPriceFrom.EquivalentCurrencyCode}</span>
				</div>
			</div>`;
			});


			$("#types-tour-selected").append(`
				<div class="row tour-option" data-token-busqueda="${models.modelo.token}" data-session-token="${models.modelo.sessionToken}" data-token-tour="${models.modelo.selectedTour.uid}" data-gm-elemento="667" data-jcart-token="tour${itemProduct.uid}" data-id-tour-product="${itemProduct.uid}" data-token-product="${itemProduct.uid}">
					<div class="col-12 col-xs-12 col-sm-6 col-md-8 mt-4" id="">
						<div class="row letter-green">
							<div class="col-12">
								<span>${itemProduct.ProductName}</span>
							</div>
						</div>
						<div class="row letter-green-light">
							<div class="col-12">
								<span>Duración</span>
							</div>						
						</div>
						<div class="row letter-green-normal">
							<div class="col-12">
								<span>1 día</span>
							</div>
						</div>
						<div class="row letter-green-light mt-2">
							<div class="col-12">
								<span>Incluye</span>
							</div>
						</div>
						<div class="row letter-green-normal">
							<div class="col-12">
								<p>Edad mínima: ${itemProduct.Attributes.MinAge == null ? "0": itemProduct.Attributes.MinAge  }</p>
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia optio aut, labore modi commodi possimus eos ab debitis quia esse obcaecati ut nesciunt aperiam qui neque repellat minima nemo atque.</p>
							</div>
						</div>
						<div class="row letter-green-normal mt-2">
							<div class="col-5 col-sm-12 col-md-4">
								<div class="form-group">
									<label class="letter-green-input" for="date-${itemProduct.uid}">Date:</label>
									<input type="text" class="form-control green-input" id="date-${itemProduct.uid}" placeholder="yyyy/mm/dd" data-fechas='[${arrDates}]'>
								</div>
							</div>
							<div class="col-4 col-sm-6 col-md-4 ">
								<div class="form-group">
									<label class="letter-green-input" for="person-${itemProduct.uid}">Persons:</label>
									<div class="dropdown" id="person-${itemProduct.uid}">
										<form id="form-${itemProduct.uid}">
											<div class="form-control rectangle-select2 dropdown-toggle" id="dropdownPersons-${itemProduct.uid}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
											<a class="text-select" id="textPerson-${itemProduct.uid}">
												Person (s) 
											</a>
											
											
											</div>

											<div id="cajaPersons-${itemProduct.uid}" class="dropdown-menu cajaPersons" aria-labelledby="dropdownMenuLink" onclick="event.stopPropagation();">
																
											</div>
										</form>
									</div>
								</div>
							</div>
							<div class="col-3 col-sm-6 col-md-4 ">
								<div  class="btn-normal btn-enabled check-tour mt-3" id="check-${itemProduct.uid}" data-id-tour="${itemProduct.uid}"><span><i class="fa fa-check"></i></span></div>
								<div  class="btn-normal btn-disabled edit-tour mt-3" id="edit-${itemProduct.uid}" data-id-tour="${itemProduct.uid}"><span><i class="fa fa-edit"></i></span></div>

							</div>
						</div>
                      </div>
					  <div class="col-12 col-xs-12 col-sm-6 col-md-4 ticket-style">
						<div id="prices-${itemProduct.uid}">
							<div class="row letter-green-light mt-5 ml-3">
								<div class="col-12">
									<span>Tour</span>
								</div>
							</div>
							<div class="row letter-green  mt-2 mb-3">
								<div class="col-12">
									<span>${itemProduct.ProductName}</span>
								</div>
							</div>
							${pricesText}
							
							</div>
							<div class="row letter-green-normal mt-4 ">
								<div class="col-12">
									<label class="checkbox-personalizado">Apply B-Rewards<br>
										<span id="text-rewards-${itemProduct.uid}"></span>
										<input id="rewards-${itemProduct.uid}" data-uid="${itemProduct.uid}" data-id="${itemProduct.uid}" type="checkbox">
										<span class="checkmark"></span>
									</label>
								</div>
							</div>
							<hr>
							<div class="row mt-3">
								<div class="col-12">
									<form id="formTransfer-${itemProduct.uid}" class="jcart">
									<button class="carrito-btn carrito-btn-disabled" name="my-add-button" data-c="${itemProduct.uid}" id="btn-${itemProduct.uid}" data-id="${itemProduct.uid}"><span><i class="fa fa-shopping-cart"></i></span></button>
									</form>
								</div>
							</div>
	                      </div>
						</div>
						<hr class="mt-4 mb-5">
					`);
							/*<div class="row letter-green-normal mt-3 ml-1 mr-3">
								<div class="col-5 leftText">
									<span>Adultos:</span>
								</div>
								<div class="col-7 rightText">
									<span>$ ${itemProduct.precioPublico} ${models.modelo.selectedTour.SellPriceFrom.EquivalentCurrencyCode}</span>
								</div>
							</div>
							<div class="row letter-green-normal mt-1 ml-1 mr-3">
								<div class="col-5 leftText">
									<span>Niños:</span>
								</div>
								<div class="col-7 rightText">
									<span>$ ${itemProduct.precioPublico} ${models.modelo.selectedTour.SellPriceFrom.EquivalentCurrencyCode}</span>
								</div>
							</div>
							<div class="row letter-green-normal mt-1 ml-1 mr-3">
								<div class="col-5 leftText">
									<span>B-Rewards:</span>
								</div>
								<div class="col-7 rightText">
									<span>$ ${itemProduct.rewards} ${models.modelo.selectedTour.SellPriceFrom.EquivalentCurrencyCode}</span>
								</div>
							</div>*/

							/*<div class="row letter-green mt-1 ml-1 mr-3">
								<div class="col-5 leftText">
									<span>Socios: </span>
								</div>
								<div class="col-7 rightText">
									<span>$ ${itemProduct.precioRewards} ${models.modelo.selectedTour.SellPriceFrom.EquivalentCurrencyCode}</span>
								</div>
							</div>*/
				// 		obj+=`</div>
				// 		<div class="row letter-green-normal mt-4 ">
				// 			<div class="col-12">
				// 				<label class="checkbox-personalizado">Apply B-Rewards
				// 					<input id="rewards-${itemProduct.uid}" data-uid="${itemProduct.uid}" data-id="${itemProduct.uid}" type="checkbox">
				// 					<span class="checkmark"></span>
				// 				</label>
				// 			</div>
				// 		</div>
				// 		<hr>
				// 		<div class="row mt-3">
				// 			<div class="col-12">
				// 				<form id="formTour-${itemProduct.uid}" class="jcart">
				// 				<button class="carrito-btn carrito-btn-disabled" name="my-add-button" data-c="${itemProduct.uid}" id="btn-${itemProduct.uid}" data-id="${itemProduct.uid}"><span><i class="fa fa-shopping-cart"></i></span></button>
				// 				</form>
				// 			</div>
				// 		</div>
    //                   </div>
				// 	</div>
				// 	<hr class="mt-4 mb-5">
				// `;
				// $("#types-tour-selected").append(obj);

				var arrPersons = [];
				itemProduct.precios.forEach(function(itemPrice, indexPrice){
					let typePax = {
						name:`${itemProduct.uid}-${indexPrice}`,
						firstText:`${(itemPrice.PaxName == null || itemPrice.PaxName == "") ? "Pax " : itemPrice.PaxName} (s)`,
						secondText:`${(itemPrice.MinAge == null || itemPrice.MinAge == "" ) ? 0 : itemPrice.MinAge} to ${(itemPrice.MaxAge == null || itemPrice.MaxAge == "" ) ? 99 : itemPrice.MaxAge} years`,
						valueDefault:0,
						valueMin:0,
						valueMax:(itemPrice.MaxPax == null || itemPrice.MaxPax == "") ? 20 : itemPrice.MaxPax,
						PaxName:itemPrice.PaxName,
						uid:`${itemProduct.uid}`,
					}
					arrPersons.push(typePax);
				});
				
				crearInputPersons(arrPersons, `cajaPersons-${itemProduct.uid}`);
				


				var RangeDatesIsDisable = false;
				// let date = new Date(itemProduct.Dates[0].Date).formatoFecha(6);  
				$(`#date-${itemProduct.uid}`).datepicker({
					//maxDate: 0,
					dateFormat : 'yy-mm-dd',
					minDate: new Date(itemProduct.Dates[0].Date),
					beforeShowDay:  function(date) {
						var temFechas=$(this).data("fechas");
				
				if(temFechas.length>0){
					var isd = RangeDatesIsDisable;
					var rd = temFechas;
					var m = date.getMonth();
					var d = date.getDate();
					var y = date.getFullYear();
					for (i = 0; i < rd.length; i++) {
						var ds = rd[i].split(',');
						var di, df;
						var m1, d1, y1, m2, d2, y2;
				
						if (ds.length == 1) {
							di = ds[0].split('/');
							m1 = parseInt(di[0]);
							d1 = parseInt(di[1]);
							y1 = parseInt(di[2]);
							if (y1 == y && m1 == (m + 1) && d1 == d) return [!isd];
						} else if (ds.length > 1) {
							di = ds[0].split('/');
							df = ds[1].split('/');
							m1 = parseInt(di[0]);
							d1 = parseInt(di[1]);
							y1 = parseInt(di[2]);
							m2 = parseInt(df[0]);
							d2 = parseInt(df[1]);
							y2 = parseInt(df[2]);
				
							if (y1 >= y || y <= y2) {
								if ((m + 1) >= m1 && (m + 1) <= m2) {
									if (m1 == m2) {
										if (d >= d1 && d <= d2) return [!isd];
									} else if (m1 == (m + 1)) {
										if (d >= d1) return [!isd];
									} else if (m2 == (m + 1)) {
										if (d <= d2) return [!isd];
									} else return [!isd];
								}
							}
						}
					}
					return [isd];
				}
				
					return;
					}
				}); 
		});

	}


	$(document).on("click", ".check-tour", function(e){
		let id_tour= $(this).data("id-tour");
		let validate = validarToursDate(id_tour);
		if($( this ).hasClass( "btn-enabled" ) && validate){
			$(this).removeClass("btn-enabled");
			$(this).addClass("btn-disabled");
			$(`#edit-${id_tour}`).removeClass("btn-disabled");
			$(`#edit-${id_tour}`).addClass("btn-enabled");
			$(`#btn-${id_tour}`).removeClass("carrito-btn-disabled");
			$(`#btn-${id_tour}`).addClass("carrito-btn-enabled");
			$(`#dropdownPersons-${id_tour}`).addClass('disabled');
			$(`#date-${id_tour}`).prop('disabled', true);
		}
		

	});

	$(document).on("click", ".edit-tour", function(e){
		let id_tour= $(this).data("id-tour");
		// let validate = validarTranfersDate(id_tour);
		if($( this ).hasClass( "btn-enabled" )){
			$(this).removeClass("btn-enabled");
			$(this).addClass("btn-disabled");
			$(`#check-${id_tour}`).removeClass("btn-disabled");
			$(`#check-${id_tour}`).addClass("btn-enabled");
			$(`#btn-${id_tour}`).removeClass("carrito-btn-enabled");
			$(`#btn-${id_tour}`).addClass("carrito-btn-disabled");
			$(`#dropdownPersons-${id_tour}`).removeClass('disabled');
			$(`#date-${id_tour}`).prop('disabled', false);
		}
	});


	function validarToursDate(id_tour){
		// let validate = true;
		// let persons = $(`#person-${id_tour}`).val();

		let validate = true;
		let persons = 0;

		let productInformation = {};
		let indexProducto = "";
		models.modelo.selectedTour.Products.forEach(function(itemProduct,indexProduct){
			if(itemProduct.uid == id_tour){
				productInformation = itemProduct;
				indexProducto = indexProduct;
			}
		})
		
		let serializedArray = $(`#form-${id_tour}`).serializeArray();
		let total = 0;
		let totalPrecio = 0;
		let totalRewards = 0;
		// console.log(productInformation);
		serializedArray.forEach(function(itemType,indexType){
			let indexSelected = itemType.name.slice(0,-7);
			
			if(itemType.value != 0){
				total = parseInt(total)+parseInt(itemType.value);
				// console.log(`total: ${total} - ${productInformation.precios[indexSelected].precioPublico}`);				
				totalParcial = parseInt(itemType.value) * parseFloat(productInformation.precios[indexSelected].precioPublico);
				totalRewards = totalRewards + (parseInt(itemType.value) * parseFloat(productInformation.precios[indexSelected].rewards));
		
				totalPrecio = totalPrecio+totalParcial;
			}
		});
		//Pinta la información del ticket 
		$(`#textPerson-${id_tour}`).text(`${total} Person(s)`);
		$(`#prices-${id_tour}`).html("");
		$(`#prices-${id_tour}`).append(`
				<div class="row text-price-green">
					<div class="col-12">
						<span>Precio Socio para ${total} asientos</span>
					</div>

				</div>
		`);
		$(`#prices-${id_tour}`).append(`
				<div class="row total-price-green mt-2">
					<div class="col-12">
						<span>Total: $ ${totalPrecio} ${models.modelo.selectedTour.SellPriceFrom.EquivalentCurrencyCode}</span>
					</div>

				</div>
		`);
		$(`#text-rewards-${id_tour}`).text(`$ ${totalRewards} ${models.modelo.selectedTour.SellPriceFrom.EquivalentCurrencyCode}`);
		persons = total;

		let startDate = $(`#date-${id_tour}`).val();
		cerrarInputsFeedback(`#dropdownPersons-${id_tour}`);
		persons = parseInt(persons);
		if(parseInt(persons)==NaN || persons == "" || persons<=0 || persons >= 10){
			mostrarInputFeedback('Select a valid number', `#dropdownPersons-${id_tour}`);
			
			validate=false
		}else{
			
			mostrarInputFeedback('', `#dropdownPersons-${id_tour}`,'is-valid','is-valid' );
		}
		cerrarInputsFeedback(`#date-${id_tour}`);
		if(startDate=="" || !isValidDate(startDate)){
			mostrarInputFeedback('Select a valid date', `#date-${id_tour}`);
			validate=false;
		}else{
			
			mostrarInputFeedback('', `#date-${id_tour}`,'is-valid','is-valid' );
		}

		return validate;
	}


	function isValidDate(dateString) {
		dateString = String(dateString);
		var regEx = /^\d{4}-\d{2}-\d{2}$/;
		if(!dateString.match(regEx)) return false;  // Invalid format
		var d = new Date(dateString);
		var dNum = d.getTime();
		if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
		return d.toISOString().slice(0,10) === dateString;
	  }
	  
	  $(document).on("click", ".carrito-btn-enabled", function(e){
		let id_tour = $(this).data("id");
		var dateSelected = $(`#date-${id_tour}`).val();
		var persons = [];
		var actual=$(this).closest(".tour-option");
		var tokenTour =$(actual).attr('data-token-tour');
		var tokenBusqueda =$(actual).attr('data-token-busqueda');
		var tokenNetactica =$(actual).attr('data-session-token');
		var tokenJcart =$(actual).attr('data-jcart-token');
		var gmelemento = $(actual).data("gm-elemento");
		var idTourProduct = $(actual).data("id-tour-product");
		var idProduct = $(actual).data("token-product");
		let applyRewards = $(`#rewards-${id_tour}`).prop('checked') == true ? 1 : 0;
		let valido=false;
		let inputs=$('input ',`#form-${id_tour}`);

		for (var i = 0; i < inputs.length; i++) {
			let value=$(inputs[i]).val()
			if(value>0){
				persons.push({"tipo":$(inputs[i]).data("tipo"),"cantidad":value});
				valido=true;
			}
			
		}

		var tokens={jcartToken: tokenJcart, tokenTour, tokenBusqueda: tokenBusqueda,tokenNetactica:tokenNetactica,"gm-elemento":gmelemento,"id-tour-product":idTourProduct, "dateSelected": dateSelected, "person": JSON.stringify(persons), "token-product": idProduct, "applyRewards": applyRewards};
		if(valido){
			$.ajax({
			url : '/carrito/jcart/relay.php',
			type:"POST",
			dataType:"json",
			beforeSend: function(e) {

			},
			data: tokens,
			done:function(data){
				console.log(data);
			}
			
		});
		}
		
	
		
	});
	
	$(document).on("click", ".search-card", function(e){
		let initDate = new Date();
		initDate.setDate(initDate.getDate()+3);
		$( "#startDate" ).datepicker( "setDate", initDate);
		let date = new Date($("#startDate").val());		
		date.setDate(date.getDate()+5);
		let month = date.getMonth()+1;
		$("#endDate").val(`${date.getFullYear()}-${month+1 < 10 ? "0"+month : month}-${date.getDate() < 10 ? "0"+date.getDate() : date.getDate()}`);

		let destinationCode = $(this).data("destinationcode");
		$("#destinationCode").val(destinationCode);
		let destinationName = $(this).data("destinationname");
		$("#destination").val(destinationName);
		// let validate = validarTranfersDate(id_Tour);
		
		models.modelo.fn.cargaTours();
	});
	
	function mostrarCajaBusqueda(){
		$("#cajaReserva").show();
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

	function crearInputPersons(arrPersons, input){

		arrPersons.forEach(function(item, index) {
			let modelo = `
				<div class=" drop-item">
					<div class="row">
						<div class="col col-6 col-md-6">
							<span class="first-text">${item.firstText}</span>
							<div class="row">
								<div class="col-10 col-sm-12 second-text">
									${item.secondText}
								</div>
							</div>
						</div>
						<div class="col col-6 col-md-6 ">
							<div class="input-group input-numeric">
								<div class="input-group-prepend controlnum">
									<div class="btn-sm " id="minus-btn-${item.name}"><i class="fa fa-minus fa-less-icon" onclick="lessOne('#${item.name}-number')"></i></div>
								</div>
								<div class="line-2"></div>
								<input type="number" data-tipo="${item.PaxName}"   id="${item.name}-number" name="${index}-number" class="form-control caja-number" value="${item.valueDefault}" min="${item.valueMin}" max="${item.valueMax}" readonly>
								<div class="line-2"></div>
								<div class="input-group-prepend controlnum">
									<div class="btn-sm " id="plus-btn-${item.name}" onclick="plusOne('#${item.name}-number')"><i class="fa fa-plus fa-plus-icon"></i></div>
								</div>
							</div>
						</div>
					</div>
					
				</div>`;
				$(`#${input}`).append(modelo);
			// console.log(modelo);
	
		  });

		  $(`#${input}`).append("<hr>");
		  $(`#${input}`).append(`<div class="drop-item">
									<div class="row">
									  <div class="col-12"> 
									  		<div class="btn-normal btn-checkPerson" id="checkPerson-${arrPersons[0].uid}" data-id-tour="${arrPersons[0].uid}" data-id-product="${arrPersons[0].product}" onClick="checkPerson('${arrPersons[0].uid}')"><span><i class="fa fa-check"></i></span>
									  		</div>
										</div>
		  							</div>
								</div>`);
	
	} 

	function checkPerson(uid){
	
		let idTour = $(`#checkPerson-${uid}`).data("id-tour");
		let idProduct = $(`#checkPerson-${uid}`).data("id-product");
		let productInformation = {};
		let indexProducto = "";
		models.modelo.selectedTour.Products.forEach(function(itemProduct,indexProduct){
				if(itemProduct.uid == idTour){
				productInformation = itemProduct;
				indexProducto = indexProduct;
				}

		})

		let serializedArray = $(`#form-${idTour}`).serializeArray();
		let total = 0;
		let totalPrecio = 0;
		console.log(productInformation);
		serializedArray.forEach(function(itemType,indexType){
			let indexSelected = itemType.name.slice(0,-7);
			
			if(itemType.value != 0){
				total = parseInt(total)+parseInt(itemType.value);
				console.log(`total: ${total} - ${productInformation.precios[indexSelected].precioPublico}`);				
				totalParcial = parseInt(itemType.value) * parseFloat(productInformation.precios[indexSelected].precioPublico);
				totalPrecio = totalPrecio+totalParcial;
			}

		});

		$(`#textPerson-${idTour}`).text(`${total} Person(s)`);
		$(`#cajaPersons-${idTour}`).removeClass("show");
		// $('[data-toggle="dropdown"]').parent().removeClass('open');
		console.log(totalPrecio);

	}