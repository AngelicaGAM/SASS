

// JavaScript Document
$(document).ready(function (e) {
	$("body").trigger("validaCheckRW");
	// get idioma
	var idioma = "";
	$.ajax({
		url:"_assets/_controllers/getLang.php",
		data:{ page: "beyondWeeks"},
		type:"POST",
		dataType:"json",
		async:false,
		success: function(data) {
			idioma = eval(data);
			//return idi;
		}
	});

	// para dispara el evento que agrega al carrito la semana
	$(document).on("click",".my-add-button",function() {
		var ele =$(this).parent().parent().parent().parent().parent();
		var es=ele.prop("id");
		//alert("dkkdkd " + ele.prop("tagName"));
		var eleCertificate = ele.find("#certificate_"+es);
		if(eleCertificate.prop("checked")) {
			$.fancybox.open({
				src  : "folioRes.php?sem="+es,
				type : 'iframe',
				opts :{
					iframe : {
						css : {
							width  : '400px',
							height : '400px'
						}
					},
				},
				beforeClose: function () {
					$("#SPP").val(0);
					$(".jcart").remove();
					PremiumPicks();
                }			
			});	

		} else {
			var elemento=$(this).data("value");
			$("#"+elemento).submit();
		}
	});
	
	/*
	$(document).on("click", ".tooltipBotton", function () {
		var $id=$(this).prop("id");
		$.fancybox.open({
			href : 'moreInfo.php?dd='+$id,
			type : 'iframe',
			padding : 0,
			margin:0,
			autoSize:true,
		});
	}); 
	*/
	/////////////////////////////////////////////
	/////// llamado a nueva pantalla | moredetails
	$(document).on("click", ".tooltipBotton", function () {
		var $id=$(this).prop("id");
		$.fancybox.open({
			src : 'moredetailsRes.php?dd='+$id,
			type : 'iframe',

		});
	});

	//galeria
	$(document).on("click", ".galleryProduct", function () {
		var $id=$(this).prop("id");
		var $urlBe = 'https://members.beyond-experience.com/';
		$.ajax({
			 url: 'moredetailsRes.php',
			 type:"POST",
			 dataType:"json",
             data:{ accion: "consultaGaleria", id:$id },
             success: function(result){
					 var keys = $.map(result.galeria, function (value, key) {
						var img = '<img class="galeriaWeek" src="'+ $urlBe + value.imagen + '" />'
						return img;
					});
					console.log(keys);
					$.fancybox.open(keys,{
						type : 'iframe',				
					});								
          }
		});		
	});

		//detalles
		$(document).on("click", ".detalleList", function () {
			var $id=$(this).prop("id");
			var $urlBe = 'https://members.beyond-experience.com/';
			$.ajax({
				 url: 'moredetailsRes.php',
				 type:"POST",
				 dataType:"json",
				 data:{ accion: "consultaList", id:$id },
				 success: function(result){
					var detalle = result.list.split('<br />');

					var sub_ul = $('<ul>', {class: "listaContent"});
					$.each(detalle, function (index, value) {
						var sub_li = $('<li/>').html(value);
						sub_ul.append(sub_li);
					});   
					var listado = $("<div/>").append(sub_ul);  
					var muestraListado =  listado.html();

					  $.fancybox.open(muestraListado,{
						type : 'iframe',				
					});	
			  }

			});		
		});
	
		//mapa
		$(document).on("click", ".mapadetalle", function () {
		
			var $id=$(this).prop("id");
			var $idmapa = $(".mapa_" + $id);
			var $urlBe = 'https://members.beyond-experience.com/';
			$.ajax({
				 url: 'moredetailsRes.php',
				 type:"POST",
				 dataType:"json",
				 data:{ accion: "consultaMapa", id:$id },
				 success: function(result){
				
				var mapa = 'https://www.google.com/maps/search/?api=1&query=' + result.mapa;
				
				$(".mapa_" + $id).attr("href", mapa)	
			
				$.fancybox.open({
					src: mapa,
			
				});

		
			
			  }

			});		
		
		});



	PremiumPicks();

	$(document).on('click', '.imgBigger', function () {
		var src = $(this).attr('src');
		var data = $(this).data('img');
		console.log('src: ', src, ', data: ', data);
		/*var res = src.replace('medium', 'bigger');
		$('.img_bigger_' + data).html('<img src="' + res + '"/>');*/
		$('.img_bigger_' + data).html('<img src="' + src + '"/>');
	});
	
	$("#buscarPW").click(	function() {
		if($("#SPP").val()!=0) {
			var idPP=$("#SPP").val();
			$('.Weeks').remove();
			PremiumPicks(idPP);
			$('.md-modal').removeClass('md-show');
		} else {
			alert("select at least one option");
		}
	});
	
	$(document).on("click", "#cerrarPP", function () {
		PremiumPicks();
		var posicon = $("#cajaReserva").offset().top;
		posicon=posicon-200;
		$("html, body").animate({scrollTop:posicon+"px"});
		$("#SPP").val(0);
	});



	//var altura = $('#cajaReserva').offset().top;

});



//list week 
function PremiumPicks(idPP) {
	$("#frame").show();
	$("#loading").show();
	$.ajax({
		url: "_assets/_controllers/getPremiumPicks_res.php",
		type:"POST",
		dataType:"json",
		data:{ idPP: idPP, id: $("#HiddenId").val() },
		success: function (data) {
			console.log($.type(data));
			console.log(data);
			$("#frame").hide();
			$("#loading").hide();
			// $("#datos_pp").html(data[0]["hotel"]);
			$("body").trigger("validaCheckRW");
			// $("input[type=checkbox]").uniform();
						
 			/*$.each(data, function(i, item) {
    		$("body").append("<ul><li>"+JSON.stringify(item)+"</li></ul>");    		
    		
			});*/

		
		
			var fuente=$("#plantillalista").html();
			plantilla=Handlebars.compile(fuente);
			var html= plantilla (data);	
			$("#template").append(html);

		}
	});
}







