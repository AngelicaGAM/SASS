var progressStatus = false;
$(document).ready(function (e) {
	// para dispara el evento que agrega al carrito la semana
	$(document).on("click", ".my-add-button", function () {
		var elemento = $(this).data("value");
		$("#" + elemento).submit();
	});

	//LastMinute();
	$("#searchBuscador").click(function () {
		var $container = $(this).closest("#cajaReserva");
		var days = $container.find("input[name=LM]:checked").val();
		console.log(days);

		var mantenimiento = 0;
		if (mantenimiento == 0) {
			$("#frame").show();
		      $("#loading").show();
			if (days != 0) {
				var LM = $("#LM").val();
				var posicon = $("#datos_pp").offset().top;
				posicon = posicon - 200;
				$("html, body").animate({
					scrollTop: posicon + "px"
				});
				$("#datos_pp").html("");
				LastMinute(days);
			} else {
				var posicon = $("#datos_pp").offset().top;
				posicon = posicon - 200;
				$("html, body").animate({
					scrollTop: posicon + "px"
				});
				$("#datos_pp").html("");
				LastMinute();
				$("#LM").val(0);
			}
		} else {
			var htmlInventario = '<link href="' + pathname + '/_assets/_css/popupInventarioRegina.css?x=' + (Math.floor(Math.random() * 100)) + '" type="text/css" rel="stylesheet">' +
				'<div id="InventarioRegina" class="modal chrono-modal">' +
				'<div class="headerImagen">' +
				'<img src="' + pathname + '/_assets/_images/template/logo-1000.png"/>' +
				'</div>' +
				'<div class="fondopopup">' +
				'<span class="parrafopop" style="width:90%;">' +
				'<b>Limited inventory for maintenance.</b><br />' +
				'We apologize for any inconvenience this may cause you.<br />' +
				'Please contact your Personal Concierge for assistance.' +
				'</span>' +
				'<div class="iblockpop w70">USA/CAN: 1-888-963-7689 México: 01-800-272-0294</div>' +
				'</div>' +
				'</div>';
			$.fancybox.open(htmlInventario, {
				type: 'iframe'
			})

		}
	});

	$(this).on("click", ".botonBuscador", function () {

		var $container = $(this).closest(".itemFiltrado");
		var days = $container.find("input[name=LM]:checked").val();
		console.log(days);
		var mantenimiento = 0;
		if (mantenimiento == 0) {
			$("#frame2").show();
			$(".fichasLast").hide();
			if (days != 0) {
				var posicon = $("#datos_pp").offset().top;
				posicon = posicon - 200;
				$("html, body").animate({
					scrollTop: posicon + "px"
				});
				$("#datos_pp").html("");
				LastMinute(days);
			} else {
				var posicon = $("#datos_pp").offset().top;
				posicon = posicon - 200;
				$("html, body").animate({
					scrollTop: posicon + "px"
				});
				$("#datos_pp").html("");
				LastMinute();
				$("#LM").val(0);
			}

		} else {
			var htmlInventario = '<link href="' + pathname + '/_assets/_css/popupInventarioRegina.css?x=' + (Math.floor(Math.random() * 100)) + '" type="text/css" rel="stylesheet">' +
				'<div id="InventarioRegina" class="modal chrono-modal">' +
				'<div class="headerImagen">' +
				'<img src="' + pathname + '/_assets/_images/template/logo-1000.png"/>' +
				'</div>' +
				'<div class="fondopopup">' +
				'<span class="parrafopop" style="width:90%;">' +
				'<b>Limited inventory for maintenance.</b><br />' +
				'We apologize for any inconvenience this may cause you.<br />' +
				'Please contact your Personal Concierge for assistance.' +
				'</span>' +
				'<div class="iblockpop w70">USA/CAN: 1-888-963-7689 México: 01-800-272-0294</div>' +
				'</div>' +
				'</div>';
			$.fancybox.open(htmlInventario, {
				type: 'iframe'
			})
		}
	});


	$(document).on("click", "#cerrarPP", function () {
		LastMinute();
		$("#LM").val(0);
	});

	$(document).on("click", "#reservar_chronosoft", function () {
		var data = $(this).parent().serialize();
		$.ajax({
			type: "POST",
			//url		: "_assets/_controllers/reserveChronosoft.php",
			url: "_assets/_controllers/getLastMinuteRes.php",
			data: data,
			success: function (data) {
				console.log(data);
			}
		});
	})

	/* var altura = $('.buscadorLMinute').offset().top;
	$(window).on('scroll', function () {
		if ($(window).scrollTop() > altura + 200) {
			$('.buscadorLMinute').addClass('menu-fixed');
			// $('.buscadorLMinute').addClass('dib');
		} else {
			$('.buscadorLMinute').removeClass('menu-fixed');
			// $('.buscadorLMinute').removeClass('dib');
		}
	}); */

	$(document).on("click", ".check-chrono", function () {
		if ($(this).is(":checked")) {
			console.log("Checado");
			var price = $(this).parent().find("input[name=lm-pricefinal]").val();
			var unit = $(this).parent().find("input[name=lm-unittype]").val();
			var occupancy = $(this).parent().find("input[name=lm-occupancy]").val();
			var invtype = $(this).parent().find("input[name=lm-invtype]").val();
			var inventoryID = $(this).parent().find("input[name=lm-inventoryid]").val();
			$(this).parent().parent().parent().parent().find("input[name=gm-precioSocioCManual]").val(price);
			$(this).parent().parent().parent().parent().find("input[name=gm-precioTotalCManual]").val(price);
			$(this).parent().parent().parent().parent().find("input[name=gm-sizeCManual]").val(unit);
			$(this).parent().parent().parent().parent().find("input[name=gm-capacidadCManual]").val(occupancy);
			$(this).parent().parent().parent().parent().find("input[name=gm-invtype]").val(invtype);
			$(this).parent().parent().parent().parent().find("input[name=gm-inventoryid]").val(inventoryID);
		}
	});


	function LastMinute(dia) {
		//console.log(dia);
		//$("#frame").show();
		//$("#loading").show();
		$.ajax({
			url: "_assets/_controllers/getLastMinuteRes.php",
			type: "POST",
			beforeSend: function (e) {
                        progressStatus = true;
                        progressBarE.progressbar("option", "value", 0);
                        setTimeout(progressBar(), 200);

                  },
			data: {
				dia: dia,
				id: $("#HiddenId").val()
			},
			success: function (data) {
				$(".buscadorLMinute").show();
				$("#frame2").hide();
				$("#frame").hide();
				$("#loading").hide();
				$("#datos_pp").html(data);
				$(".botonLupa").css('opacity', '1');
				var option = $('.buscadorLMinute input[value="' + dia + '"]');
                        option.attr('checked', true);
				console.log(data);
	
				$("#datos_pp").jscroll({
					loadingHtml: '<div style="margin: 1em auto; width: 100%;"><div style="width: 100%; height: auto; margin: 0 auto; margin-top: 2em;"><img src="_assets/_images/template/loading.gif" class="loading" width="150" /><div style="font-size: 1.5em; color: #c09c74; margin: 1.5em 0 0 0; text-align: center; width: 100%;"><!--Loading......--></div></div></div>',
					padding: 20,
					autoTrigger: true,
					autoTriggerUntil: 4,
					callback: function () {
						$('.jscroll-added').children().unwrap();
						$.ajax({
							type: "POST",
							url: "carrito/jcart-ajax.php",
							success: function (data) {
								$(".jcartws").html(data);
	
							}
						});
						/*$("body").trigger("validaCheckRW");
					    $("input[type=checkbox]").uniform();
					    $(".ultratabs").hide();*/
						$(".alertBad").css("display", "none");
						$("#datos_pp>div>span:nth-child(3)").css("display", "block");
					}
				});
				$(".alertBad").css("display", "none");
				$("#datos_pp>div>span:nth-child(3)").css("display", "block");
			}
		});
	}

	$("#progress").progressbar({
		change: function () {
			$("#progress-label").text($("#progress").progressbar("value") + "%");
		},
		complete: function () {
			$("#progress-label").text("100%");
		}
	});

	var progressBarE = $("#progress");



	var progressBar = function () {
		if (progressStatus == false) {
			return false;
		}

		var val = progressBarE.progressbar("option", "value") || 0;
		var a = Math.random() * (3000 - 50) + 50;
		var b = Math.floor(Math.random() * (5 - 1)) + 1;

		if (100 - val > 5)
			progressBarE.progressbar("option", "value", val + b);

		if (val < 94) {
			setTimeout(progressBar, a);
		}
	}

    $(this).on("click", ".labelInput", function(){
	  console.log(this);
	 
	  var $content = $(this).closest(".descripcion");
	  var radios = $content.find('input[type="radio"]');
	  radios.attr('checked', false);

	  var $label = $('.labelInput');
	  $label.not(this).removeClass("activeRadio");

	  var $container = $(this).closest(".contentheaders");
	  var days = $container.find("input[type='radio']");

	  $(this).addClass("activeRadio");
	  days.attr('checked', true);
    });

  /*   $(this).on("click", ".labelInput", function(){
	console.log(this);
	var $content = $(this).closest(".descripcion");
	var radios = $content.find('input[type="radio"]');
	radios.attr('checked', false);
	
	var $container = $(this).find('input[type="radio"]');
	$container.attr('checked', true);

    
  }); */
  var $div = $('.descripcion').children('.tipo2 ').length

});

