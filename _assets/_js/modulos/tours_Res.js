// JavaScript Document

$(document).ready(function(e) {
  


  $ordenamiento = 1;
  $("#botonFiltro").trigger("click");

  $(document).on("click", "#botonFiltro", function() {
    if ($ordenamiento == 1) {
      $filterType = 1;
    } else {
      $filterType = "";
      if ($("#precioselect").val() == 1) {
        $filterType = 1;
      }

      if ($("#precioselect").val() == 2) {
        $filterType = 2;
      }
      if ($("#precioselect").val() == "") {
        $("#search").trigger("click");
      }
    }

    var $wrapper = $("#fichasHoteles");

    $wrapper
      .find(".hotel")
      .sort(function(a, b) {
        if ($filterType == 1) {
          var mayor = $(a)
            .find(".tablaPrecios tr:first-child .special-price")
            .attr("data-price");
          var menor = $(b)
            .find(".tablaPrecios tr:first-child .special-price")
            .attr("data-price");
        }

        if ($filterType == 2) {
          var menor = $(a)
            .find(".tablaPrecios tr:first-child .special-price")
            .attr("data-price");
          var mayor = $(b)
            .find(".tablaPrecios tr:first-child .special-price")
            .attr("data-price");
        }

        return +mayor - +menor;
      })
      .appendTo($wrapper);

    $("#fichasHoteles")
      .find(".hotel")
      .removeClass("animated fadeIn jp-hidden");
    paginacion();
  });

  $("#edades").addClass("ocultar");
  $("#laflecha").hide();
  $(".alertGood").hide();
  $(".alertBad").hide();
  $(".alertBad2").hide();
  $("#filtrosSection").hide();
  $("#otrosDetinos").hide();

  $("#destino").prop("value", "");
  $("#startDate").prop("value", "");
  $("#adultos").prop("value", 0);
  $("#ninos").prop("value", 0);
  $("#edades div:last").remove();

  var calFecha = new Date();
  var hoy = new Date(
    calFecha.getFullYear(),
    calFecha.getMonth(),
    calFecha.getDate()
  );
  var hoy2 = new Date(
    calFecha.getFullYear(),
    calFecha.getMonth(),
    calFecha.getDate() + 1
  );

  var destinos = [];




  ///////////////////////////////////////////////////////////////////////
  // funcionamiento para armar la seccion de niños
  $(document).on("click", ".cubiertoNino", function() {
    $("#edades").removeClass("ocultar");

    var actual = $(this);
    var content = actual.closest(".input-numeric");
    var idnino = content.find(".caja-number").attr("id");
    var n = $("#"+idnino).val();

    var solicitado = n;

    var totalMostrado = $("#edades .childrenYear").length;

    if (solicitado == 0) {
      for (i = 0; i < totalMostrado; i++) {
        $("#edades .childrenYear:last").remove();
        //$("#habitacion_"+id[1]).css("display","none");
      }
      //$("#habitacion_"+id[1]).css("display","none");
    } else {
      //$("#edades").css("display","block");
      if (totalMostrado < solicitado) {
        //saco la diferencia y muestro los que tengo que mostrar
        var m = solicitado - totalMostrado;
        //	for(var i=0; i<m; i++)
        //{
        //var ha=totalMostrado+(i+1);
        $.ajax({
          url: "_assets/_controllers/masEdadesToursRes.php",
          dataType: "html",
          type: "POST",
          data: {
            cantidadN: m,
            hab: 1,
            m: totalMostrado
          }
        }).done(function(data) {
          $("#edades").append(data);
        });
        ///}
      } else {
        // elimino
        var m = totalMostrado - solicitado;
        //alert(m);
        for (var i = 0; i < m; i++) {
          //alert("dsaf "+i);
          $("#edades .childrenYear:last").remove();
        }
      }
    }
  });

  // funcioamiento del slider
  $(".sliderContent").revolution({
    delay: 5000,
    startwidth: 1920,
    startheight: 251,
    hideThumbs: 10,
    fullWidth: "on",
    forceFullWidth: "on",

    touchenabled: "on",
    onHoverStop: "off"
  });

  // get idioma
  var idioma = "";
  $.ajax({
    url: "_assets/_controllers/getLang.php",
    data: { page: "tours" },
    type: "POST",
    dataType: "json",
    async: false,
    success: function(data) {
      idioma = eval(data);
      //return idi;
    }
  });

  // funcionamiento del tab de las opciones

  $("#pest li").on("click", function() {
    $("#pest li").removeClass("activo");
    var acc = $(this);
    acc.addClass("activo");

    if (acc.data("value") == "mys") {
      $("#mys").show();
      $("#otrosDetinos").hide();
    } else {
      $("#otrosDetinos").show();
      $("#mys").hide();
    }
  });

  // Menu Fixed
/*   var altura = $("#cajaReserva").offset().top;
  $(window).on("scroll", function() {
    if ($(window).scrollTop() > altura + 200) {
      $("#cajaReserva").addClass("menu-fixed");
      $("#cajaReserva").addClass("dib");
    } else {
      $("#cajaReserva").removeClass("menu-fixed");
      $("#cajaReserva").removeClass("dib");
    }
  }); */
  // funcionamiento para las opciones de los destinos de los mys

  $(".smallImg").on("click", function() {
    $(".alertGood").show();
    $(".alertBad").hide();
    $(".alertBad2").hide();

    $("#frame").show();
    $("#muestraInfo").hide();
    $("#loading").show();
    $("#pest").hide();
    $("#listado").hide();

    var auxx = $(this)
      .prop("id")
      .split(",.-");
    $("input[name=dc]").prop("value", auxx[0]);
    $("#destino").prop("value", auxx[1]);
    //var mys = auxx[2];
    mys = 1;
    console.log($(this).data("mys"));

    $("#startDate").prop(
      "value",
      $.datepicker.formatDate(
        "dd-mm-yy",
        new Date(
          calFecha.getFullYear(),
          calFecha.getMonth(),
          calFecha.getDate() + 2
        )
      )
    );

    $("#endDate").prop(
      "value",
      $.datepicker.formatDate(
        "dd-mm-yy",
        new Date(
          calFecha.getFullYear(),
          calFecha.getMonth(),
          calFecha.getDate() + 3
        )
      )
    );
    $("#endDate").datepicker("option", "minDate", hoy);

    $("#adultos").prop("value", 2);

    var last = $("#reservas").serializeArray();

    // if (mys == $(this).data('mys')) {
    // 		$.ajax({
    // 				 url:"_assets/_controllers/tourProcesaBuscador.php",
    // 				 type:"POST",
    // 				 //dataType:"html",
    // 				 data:{valueF :last}
    // 				 }).done(function(data){

    // 					if(data=="malo")
    // 					{
    // 						alert("Lo sentimos no se obtuvo resultados, intente cambiando la información de busqueda");
    // 						$("#muestraInfo").show();
    // 						$("#loading").hide();
    // 					}
    // 					else
    // 					{
    // 						window.location = 'tours/pordestino.php?destino='+normalize(auxx[1]);
    // 					}
    // 		});

    // } else {
    $.ajax({
      url: "_assets/_controllers/tourProcesaBuscador_Res.php",
      type: "POST",
      //dataType:"html",
      data: { valueF: last }
    }).done(function(data) {
      if (data == "") {
        $(".alertGood").hide();
        $(".alertBad2").hide();
        $(".alertBad").show();
        setTimeout(function() {
          $(".alertBad").hide();
        }, 5000);

        $("#loading").hide();
        $("#listado").show();
        $("#listado").html("");
        //$("#listado").html("<p>" + idioma.resultadosTours.error + "</p>");
        $("#filtrosSection").hide();
        $ordenamiento = 1;
        $("#botonFiltro").trigger("click");
      } else {
        $("#loading").hide();
        $("#listado").show();
        $("#listado").html("");
        $("#listado").html(data);
        $("#filtrosSection").show();
        $("#prit2").hide();
        $("#laflecha").show();

        $(".alertGood").hide();
        $(".alertBad2").hide();
        $(".alertBad").hide();

        paginacion();
        $ordenamiento = 1;
        $("#botonFiltro").trigger("click");

        //$("#minimo").text("$"+0+" MXN");
        //$("#max").text("$"+$("#maxprecio").val()+" MXN");

        //$('#slider-range').slider( "option", "max",$("#maxprecio").val().replace(/,/g, '') );
        //$('#slider-range').slider( "option", "values",[0,$("#maxprecio").val().replace(/,/g, '')] );
        //$('#slider-range').slider("value", $('#slider-range').slider("value"));

        var valorMaximo = parseInt(
          $("#maxprecio")
            .val()
            .replace(/,/g, "")
        );
        var valorMinimo = parseInt(
          $("#minprecio")
            .val()
            .replace(/,/g, "")
        );

        $("#minimo").text("$" + $("#minprecio").val() + " USD");
        $("#max").text("$" + $("#maxprecio").val() + " USD");

        $("#slider-range").slider("option", "min", valorMinimo);
        $("#slider-range").slider("option", "max", valorMaximo);
        $("#slider-range").slider("option", "values", [
          valorMinimo,
          valorMaximo
        ]);
        $("#slider-range").slider("value", $("#slider-range").slider("value"));
      }
    });
  });

  //$("#checkin").datepicker({minDate:hoy,dateFormat:"d/M/yy",altField:"#fecha"});
  //$( "#checkin" ).prop("value",$.datepicker.formatDate('d/M/yy', new Date()) );

  //funcionamiento del autocomplete
  $.widget("custom.catcomplete", $.ui.autocomplete, {
    _renderMenu: function(ul, items) {
      var that = this,
        currentCategory = "";
      $.each(items, function(index, item) {
        if (item.categoria != currentCategory) {
          ul.append(
            "<li class='ui-autocomplete-category'>" + item.categoria + "</li>"
          );
          currentCategory = item.categoria;
        }
        that._renderItemData(ul, item);
      });
    }
  });

  // funcionamiento para setear el slider de precios
  $("#slider-range").slider({
    range: true,
    min: 0,
    max: 100,
    values: [0, 100],
    slide: function(event, ui) {
      $("#minimo").html("$" + addCommas(ui.values[0]) + " USD");
      $("#max").html("$" + addCommas(ui.values[1]) + " USD");

      //$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
    }
  });

  // funcionamiento para el boton de buscar
  $(document).on("keypress", "#destino", function() {
    //console.log("prueba");
    $("#rowID").val("");
  });

  $("#laflecha").click(function() {
    $("#prit2").slideToggle();
  });

  $("#search").click(function() {
    //alert($("#claveD").val());
    localStorage.setItem("seleccionadoTour", "TourSel");

    var ban = true;

    if (
      $("#destino").val() == "" ||
      /^\s+$/.test($("#destino").val()) ||
      $("#rowID").val() == ""
    ) {
      $(".alertGood").hide();
      $(".alertBad").hide();
      $(".alertBad2").show();
      setTimeout(function() {
        $(".alertBad2").hide();
      }, 5000);
      ban = false;
    }
    if ($("#startDate").val() == "" && ban) {
      $(".alertGood").hide();
      $(".alertBad").hide();
      $(".alertBad2").show();
      setTimeout(function() {
        $(".alertBad2").hide();
      }, 5000);
      ban = false;
    }
    if ($("#endDate").val() == "" && ban) {
      $(".alertGood").hide();
      $(".alertBad").hide();
      $(".alertBad2").show();
      setTimeout(function() {
        $(".alertBad2").hide();
      }, 5000);
      ban = false;
    }
    if ($("#adultos").val() == 0 && ban) {
      $(".alertGood").hide();
      $(".alertBad").hide();
      $(".alertBad2").show();
      setTimeout(function() {
        $(".alertBad2").hide();
      }, 5000);
      ban = false;
    }

    var mes = calFecha.getMonth() + 1;
    var dia = calFecha.getDate();

    if (mes >= 1 && mes <= 9) {
      mes = "0" + mes;
    }
    if (dia >= 1 && dia <= 9) {
      dia = "0" + dia;
    }

    var hoyCompara = dia + "-" + mes + "-" + calFecha.getFullYear();

    if (hoyCompara == $("#startDate").val()) {
      $("#alert").show();
      $("#frame").hide();
      $(document).scrollTop($("#alert").offset().top - 200);
      ban = false;
    }
    var ch = $("#ninos").val();
    console.log(ch);
    for (var i = 0; i <= ch; i++) {
      console.log(ch);
      console.log("#edadNH_1_" + i);

      if ($("#edadNH_1_" + i).val() == "-" && ban) {
        alert("select children " + i + " age");
        ban = false;
      }
    }
    //else
    //{

    //	$("#frame").show();
    //	$("#alert").hide();
    //	$(document).scrollTop( $("#loading").offset().top-100 );
    //ban=false;
    //	}

    if (ban) {
      $(".alertGood").show();
      $(".alertBad").hide();
      $(".alertBad2").hide();

      var last = $("#reservas").serializeArray();
      $("#filtrosSection").hide();
      $("#frameContent").hide();
      $("#frame").show();
      $("#loading").show();
      $("#listado").hide();
      $("#pest").hide();
      //$("#frameGo").hide();
      //$("#toursGG").hide();
      //$("#tabHeader").hide();

      $(document).scrollTop($("#loading").offset().top - 100);

      /*var ua = navigator.userAgent.toLowerCase(); 
			if(ua.indexOf('safari') > -1 && ua.indexOf('chrome')==-1 && ua.indexOf('crios')==-1 ) { 
				var  dent3=window.open("carga.html","Carga2","directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no, width=1, height=1, top=2000");  	
					var dent=window.open("https://www.travelnet.com.mx/boxtravelnet/","ventana","directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no, width=1, height=1, top=2000"); 
				var  dent2=window.open("carga.html","Carga","directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no, width=1, height=1, top=2000");  	
			}  */

      ////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // mapeo los destinos de los mys, si cae en alguno la busqueda disparo el controlador
      // para actualizar las variables
      // de sesssion y los redirijo al landin corresponiente
      // if( $.inArray($("#rowID").val(),destinos)!=-1)
      // {

      // 	//normalize($("#destino").val());

      // 	$.ajax({
      // 		url:"_assets/_controllers/tourProcesaBuscador.php",
      // 		type:"POST",
      // 		//dataType:"html",
      // 		data:{valueF :last}
      // 		}).done(function(data){

      // 		if(data=="malo")
      // 		{
      // 			$(".alertGood").hide();
      // 			$(".alertBad2").hide();
      // 			$(".alertBad").show();
      // 			setTimeout(function() {
      // 				$(".alertBad").hide();
      // 			},5000);
      // 			alert("Lo sentimos no se obtuvo resultados, intente cambiando la información de busqueda");
      // 			$("#muestraInfo").show();
      // 			$("#loading").hide();
      // 		}
      // 		else
      // 		{
      // 			window.location = 'tours/pordestino.php?code='+normalize($("#destino").val());
      // 		}
      // 	});
      // }

      // else
      // {
      $.ajax({
        url: "_assets/_controllers/tourProcesaBuscador_Res.php",
        type: "POST",
        //dataType:"html",
        data: { valueF: last }
      }).done(function(data) {
        if (data == "") {
          $(".alertGood").hide();
          $(".alertBad2").hide();
          $(".alertBad").show();
          setTimeout(function() {
            $(".alertBad").hide();
          }, 5000);

          $("#loading").hide();
          $("#listado").show();
          $("#listado").html("");
          //$("#listado").html("<p>"+idioma.resultadosTours.error+"</p>");
          $("#filtrosSection").hide();
          $ordenamiento = 1;
          $("#botonFiltro").trigger("click");
        } else {
          $("#loading").hide();
          $("#listado").show();
          $("#listado").html("");
          $("#listado").html(data);
          $("#filtrosSection").show();
          $("#prit2").hide();
          $("#laflecha").show();

          $(".alertGood").hide();
          $(".alertBad2").hide();
          $(".alertBad").hide();

          paginacion();
          $ordenamiento = 1;
          $("#botonFiltro").trigger("click");

          //$("#minimo").text("$"+0+" USD");
          //$("#max").text("$"+$("#maxprecio").val()+" USD");

          //$('#slider-range').slider( "option", "max",$("#maxprecio").val().replace(/,/g, '') );
          //$('#slider-range').slider( "option", "values",[0,$("#maxprecio").val().replace(/,/g, '')] );
          //$('#slider-range').slider("value", $('#slider-range').slider("value"));

          var valorMaximo = parseInt(
            $("#maxprecio")
              .val()
              .replace(/,/g, "")
          );
          var valorMinimo = parseInt(
            $("#minprecio")
              .val()
              .replace(/,/g, "")
          );

          $("#minimo").text("$" + $("#minprecio").val() + " USD");
          $("#max").text("$" + $("#maxprecio").val() + " USD");

          $("#slider-range").slider("option", "min", valorMinimo);
          $("#slider-range").slider("option", "max", valorMaximo);
          $("#slider-range").slider("option", "values", [
            valorMinimo,
            valorMaximo
          ]);
          $("#slider-range").slider(
            "value",
            $("#slider-range").slider("value")
          );
        }
      });
    }
  });

  // dispara la busqueda con los filtros seleccionados
  /*		var a;
	var de;
	var val;*/
  // $(document).on("click","#botonFiltro",function(){
  // 		/*	val = $("#precioselect").val();
  // 		if (val == 2){
  // 			a = $("#minimo").html();
  // 			de = $("#max").html();
  // 			//alert("si");
  // 		}else if(val == 1){
  // 			de = $("#minimo").html();
  // 			a = $("#max").html();
  // 			//alert("no");
  // 		}*/
  // 		if($("#nh").val()=="")
  // 		{$("#hotelSel").prop("value","");}

  // 		$("#filtrosSection").hide();
  // 		$("#frame").show();
  // 		$("#listado").hide();
  // 		$("#listado").html("");
  // 		$("#loading").show();
  // 		$(document).scrollTop( ($("#frame").offset().top-300) );

  // 		$.ajax({
  // 					url:"_assets/_controllers/filtroTours.php",
  // 					type:"POST",
  // 					//dataType:"html",
  // 					data:{
  // 						/*
  // 							precioInicio :$("#minimo").html(),
  // 							precioFinal:$("#max").html()
  // 							*/
  // 						mayormenort:$("#precioselect").val(),
  // 						 }
  // 					}).done(
  // 					function(data) {
  // 						if(data=="") {
  // 							$("#loading").hide();
  // 							$("#listado").show();
  // 							$("#listado").html("");
  // 							$("#listado").html("<p>"+idioma.resultadosTours.error+"</p>");
  // 							$("#filtrosSection").hide();
  // 						}
  // 						else {
  // 							$("#filtrosSection").show();
  // 							$("#listado").show();
  // 							$("#listado").html(data);
  // 							$("#loading").hide();
  // 							$("#prit2").hide();
  // 							$("#laflecha").show();
  // 							paginacion();
  // 						}
  // 					});

  // });

  // funcionamiento para realizar la paginacion
  function paginacion() {
    $("div.holder").jPages({
      containerID: "fichasHoteles",
      perPage: 15,
      midRange: 6,
      //previous :"← Anterior",
      //next:"Siguiente →",
      previous: idioma.anterior,
      next: idioma.siguiente,
      animation: "fadeIn"
    });
  }

  $(".error_messages").each(function() {
    $(this)
      .parent()
      .after($(this));
  });

  /*
	// clic en el boton de book del tour
	$(document).on("click","#book",function(){
				dato = $(this).data("value");
				var auxx=dato.split(",.-");
				window.location = '../tours/tarifas.php?code='+auxx[1];
				
				
	});	
	
	
	// clic en el boton de leer mas
	$(document).on("click",".leer",function(){
				
				var busco="#"+$(this).parent().parent().parent().prop("id");
				dato=$(busco).find("input").data("value");
				var auxx=dato.split(",.-");
				window.location = '../tours/informacion.php?code='+auxx[1];
				
	});		
		
	
	// clic en el boton del titulo del tour mas
	$(document).on("click",".titulo",function(){
				
				var busco="#"+$(this).parent().prop("id");
				dato=$(busco).find("input").data("value");
				var auxx=dato.split(",.-");
				window.location = '../tours/informacion.php?code='+auxx[1];
	});
	
	
	// clic en la imagen de la galeria
	$(document).on("click",".imagenTour",function(){
				
		var busco=$(this).prop("id") ;
		window.location = '../tours/galeria.php?code='+busco;
				
	});*/

  function addCommas(nStr) {
    nStr += "";
    x = nStr.split(".");
    x1 = x[0];
    x2 = x.length > 1 ? "." + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, "$1" + "," + "$2");
    }
    return x1 + x2;
  }

  var normalize = (function() {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
      to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};

    for (var i = 0, j = from.length; i < j; i++)
      mapping[from.charAt(i)] = to.charAt(i);

    return function(str) {
      var ret = [];
      for (var i = 0, j = str.length; i < j; i++) {
        var c = str.charAt(i);
        if (mapping.hasOwnProperty(str.charAt(i))) ret.push(mapping[c]);
        else ret.push(c);
      }
      //return ret.join( '' );
      return ret
        .join("")
        .replace(/[^-A-Za-z0-9]+/g, "-")
        .toLowerCase();
    };
  })();

  $(".fichasInfo").on("click", function() {
    $(".overlay").css("opacity", 0);
    // var altura = $(this).offset().top;
    // // altura = altura + 175;
    // console.log("Altura {"+altura+"}");
    // $("#mover").css("top",altura).css("display","block");
    $(this)
      .find(".overlay")
      .css("opacity", 1);
  });
});
