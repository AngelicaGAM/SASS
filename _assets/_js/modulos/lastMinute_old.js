// JavaScript Document
$(document).ready(function(e) {

	
	// para dispara el evento que agrega al carrito la semana
	$(document).on("click",".my-add-button",function(){
		var elemento=$(this).data("value");
		$("#"+elemento).submit();
	});		
	
	//$('.tooltipBotton').tooltipster();
	 LastMinute();
	 $("#search").click(function(){
		if($("#LM").val()!=0)
		{
			var LM=$("#LM").val();
			var posicon = $("#datos_pp").offset().top;
			posicon=posicon-200;
			$("html, body").animate({scrollTop:posicon+"px"});
			LastMinute(LM);
		}
		else{
			alert("select at least one option");
		}			
		
	});
	$(document).on("click","#cerrarPP",function(){
		LastMinute();
		$("#LM").val(0);
	});

	var altura = $('#cajaReserva').offset().top;
	$(window).on('scroll', function(){
		if ( $(window).scrollTop() > altura-123){
			$('#cajaReserva').addClass('menu-fixed');
		} else {
			$('#cajaReserva').removeClass('menu-fixed');
		}
	});
	
});

function LastMinute(dia)
{
	$.ajax({	url:"_assets/_controllers/getLastMinute.php",
				type:"POST",
				data:{ dia : dia, id:$("#HiddenId").val()}
			}).done(function(data)
			{ 
				$("#datos_pp").html(data);
			});
}