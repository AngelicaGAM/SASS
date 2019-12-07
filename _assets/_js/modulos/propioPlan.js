// JavaScript Document
$(document).ready(function(e) {
	
	/// get idioma
		var idioma="";
		$.ajax({
				 url:"_assets/_controllers/getLang.php",
				 data:{ page: "template"},
				 type:"POST",
				 dataType:"json",
				 async:false,
				 success: function(data){
				
						idioma =eval(data);
						//return idi;
				 }
			});
			
	$("#sendPR").on("click",function(){
		var ban=true;
		$("#idEnvio").css("display","none");
		if($("#namePP").val()=="" || /^\s+$/.test($("#namePP").val()))
		{
				$("#namePP").addClass("val").attr("value",idioma.formulario.campo1Valida);
				
				
				ban=false;
		}		
		if($("#mail").val()=="" || /^\s+$/.test($("#mail").val()))
		{
				$("#mail").addClass("val").attr("value",idioma.formulario.campo2Valida);
				
				ban=false;
		}
	
		if(ban)
		{
			
			var respuesta = $.post("../../_assets/_controllers/envioPlanPropio.php",
			{
				
				nombre:$("#namePP").val(),
				mail:$("#mail").val(),
				country:$("#country").val(),
				city:$("#city").val(),
				phone:$("#phone").val(),
				address:$("#address").val(),
				peticiones:$("#peticiones").val()
			
				
			});
			
			respuesta.done(function(data){
				
				if(data=="ok")
				{
					$("#idEnvio").css("display","block");
					$("#idEnvio").addClass("accep");
					$("#idEnvio").html(idioma.formulario.mensaje);
					
					//$.fancybox.close( true);	
					$(".input, .inputFecha, .inputTextA").prop("value","");	
					
					
				}
				else
				{
					$("#idEnvio").css("display","block");
					$("#idEnvio").removeClass("accep");
					$("#idEnvio").addClass("error");
					$("#idEnvio").html(idioma.formulario.mensajeerror);
				}
				//$.fancybox.update();
			});
		}
		
		
		
	});
	
	$(".input, .inputFecha").on("focus",function(){
		$(this).removeClass("val").attr("value","");
			
	});	
	

    
});