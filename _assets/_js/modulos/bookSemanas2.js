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
			$.fancybox({
				padding:0,
				margin:0,
				autoSize:true,
				width:800,
				height:400,
				closeBtn:false,
				type:'iframe',
				href:"folio.php?sem="+es,
				helpers:{
					overlay:{
						css:{ 
							//"background":"rgba(0,84,100,0.9)",
							"border-radius":"0"
						},
					},
				}
				///validar si el usuario tiene 
			});
		} else {
			var elemento=$(this).data("value");
			$("#"+elemento).submit();
		}
	});
	
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

	PremiumPicks();

	$("#search").click(	function() {
		if($("#SPP").val()!=0) {
			var idPP=$("#SPP").val();
			var posicon = $("#datos_pp").offset().top;
			posicon=posicon-200;
			$("html, body").animate({scrollTop:posicon+"px"});
			PremiumPicks(idPP);
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
	var altura =400;
	$(window).on('scroll', function() {
		if ( $(window).scrollTop() > altura){
			$('#cajaReserva').addClass('menu-fixed');
			$('#cajaReserva').addClass('dib');
		} else {
			$('#cajaReserva').removeClass('menu-fixed');
			$('#cajaReserva').removeClass('dib');
			//$('#cajaReserva').addClass('din');
		}
	});
});

function PremiumPicks(idPP) {
	$.ajax({
		url: "_assets/_controllers/getPremiumPicks2.php",
		type:"POST",
		dataType:"html",
		data:{ idPP: idPP, id: $("#HiddenId").val() },
		success:function(data){ 
			$("#datos_pp").html(data);
			$("body").trigger("validaCheckRW");
			$("input[type=checkbox]").uniform();
		}
	});
}