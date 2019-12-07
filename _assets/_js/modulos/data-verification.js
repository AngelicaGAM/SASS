// JavaScript Document
$( document ).ready(function() {
    $("input[type=checkbox]").uniform();
    $("#alertbad").hide();
    $("#alertbadTerminos").hide();
    if($("#numerofolios").val()!= 0){
    	hayfolio="si";
    }else{
    	hayfolio="no";
    }
    	/// get idioma
	var idioma="";
	$.ajax(
	{
		url:"_assets/_controllers/getLang.php",
		data:{ page: "data-verification"},
		type:"POST",
		dataType:"json",
		async:false,
		success: function (data) {
			idioma = eval(data);
		}
	});  
});
function tipo(valor){

	if(valor>2){
		$("#tipotarjeta2").removeClass("din" );
		$("#tipotarjeta1").addClass( "din" );
		}else{
			$("#tipotarjeta1").removeClass("din" );
			$("#tipotarjeta2").addClass( "din" );
			}	
}



function agrega(valor){

 var num = $("#input"+valor).val();

 if(num == valor){

 	$("#input"+valor).val(0);
 }
 else{
 	$("#input"+valor).val(valor);
 }

	
	$("#agrega"+valor).toggle();
	$("#agrega"+valor).addClass( "dibl" );

}
function agregaenvio(){

 var checking = $("#checkenvia").val();

 if(checking == 1){

 	$("#checkenvia").val(0);
 }
 else{
 	$("#checkenvia").val(1);
 }


}

//	Valida Formulario text & password




function verificar(archivo, formulario){ 
	var rellenados=true;
    fi = document.getElementById(formulario);
    controles = fi.getElementsByClassName("val");   
           
    for ( i=0; i<controles.length; i++)
    {
    	control = controles[i];
        if ((control.type == 'text') || (control.type == 'tel') || (control.type == 'number'))
        {

	

        	if (control.value=="" | /^\s+$/.test(control.value))
            {	rellenados=false;
            	alert ("complete los campos obligatorios la variable es"+rellenados);
            }
		}
		
	}

	
	if(rellenados=true){
								$.ajax({
				  		type: "POST",
				  		url: "_assets/_clases/"+archivo,
				  		data: $("#"+formulario).serialize()	 
						})
						.done(function() {
						//limpiaform("#frmindex");	
							//alert("Sus datos se han enviado con exito.");    	     	   	    	     	     	
			  			})
			  			.fail(function(){
			  			})
						.always(function(){
						});	

							
	}
    

}
var resta = 300;
function sendForm(){
		var email  = $("#email").val();
		var checkenviar = $("#checkenvia").val();
		var emailCotitular  = $("#emailCotitular").val();
		var ban=true;
		let listaErrores = "";
		let listaErrores2 = "";
		//let listaErrores = "error" + "<br/>";
		if(hayfolio=="no"){}else{
		ban=false;
		listaErrores += 'Validate your folio.' + "<br/>";
		}
		if($("#email").val()=="" || $("#telefono").val()=="" || $("#email").val()==""){
			ban=false;
			listaErrores += 'Complete the fields marked' + "<br/>";
		}
		if(validarEmail(email)){}else{
			listaErrores += 'Enter a valid email.' + "<br/>";
			ban=false;
		}
		if(validartelefono(telefono)){}else{
			listaErrores += 'Enter a full phone minimum of 10 numbers including area code.' + "<br/>";
			ban=false;
		}
		if(numerostelefono(telefono)){}else{
			listaErrores += 'The phone only contain numerical data.' + "<br/>";
			ban=false;
		}
		if(validarnombre(nombre)){}else{
			listaErrores += 'Enter customer name' + "<br/>";
			ban=false;
		}
		if(checkenviar == 1){}else{
			listaErrores2 += 'Accept the terms and conditions' + "<br/>";
			ban=false;
		}
		//if(validacionID("frmindex", "validar")){}else{

		//}

		if(ban){
			
		var respuesta = $.post(pathname+"/_assets/_controllers/data-verification-formulario.php",{
				nombre:$("#nombre").val(),
				email:$("#email").val(),
				telefono:$("#telefono").val(),
				telefono2Cliente:$("#telefono2Cliente").val(),
				nombreCotitular:$("#nombreCotitular").val(),
				emailCotitular:$("#emailCotitular").val(),
				telefono1Cotitular:$("#telefono1Cotitular").val(),
				telefono2Cotitular:$("#telefono2Cotitular").val(),
				
			});	
			respuesta.done(function(data){
				if(data=="ok"){
					limpiaform("frmindex");	
					localStorage.setItem("completadoformulario", "si");
					window.location.href = pathname+"/home.php"; 
				}else{
					localStorage.setItem("completadoformulario", "no");
					$("#alertbad").show();
					$("#alertbad").html("Hubo un error al guardar sus datos comuniquese a su concierge.");
				}
			});
			
			//console.log("paso");
		}else{
			if(listaErrores!=""){
			$("#alertbad").show();
			$("#alertbad").html(listaErrores);
			setTimeout(function() {$("#alertbad").hide();},5000);

		$('html,body').animate({
			scrollTop: $("#alertbad").offset().top - resta
		}, 500);
}
if(listaErrores2!=""){
					$("#alertbadTerminos").show();
			$("#alertbadTerminos").html(listaErrores2);
			setTimeout(function() {$("#alertbadTerminos").hide();},5000);
			}
		}

}
/*
function sendForm(){
	if(hayfolio=="no"){
	var email  = $("#email").val();
	var checkenviar = $("#checkenvia").val();
	var emailCotitular  = $("#emailCotitular").val();
	if(validarEmail(email)){
		if(validartelefono(telefono)){
			if(numerostelefono(telefono)){
				if(validarnombre(nombre)){
					if(checkenviar == 1){
	if(validacionID("frmindex", "validar")){

				var respuesta = $.post(pathname+"/_assets/_controllers/data-verification-formulario.php",
			{
				nombre:$("#nombre").val(),
				email:$("#email").val(),
				telefono:$("#telefono").val(),
				telefono2Cliente:$("#telefono2Cliente").val(),
				
				nombreCotitular:$("#nombreCotitular").val(),
				emailCotitular:$("#emailCotitular").val(),
				telefono1Cotitular:$("#telefono1Cotitular").val(),
				telefono2Cotitular:$("#telefono2Cotitular").val(),
				
			});	
			respuesta.done(function(data){
				if(data=="ok")
				{
		limpiaform("frmindex");	
		localStorage.setItem("completadoformulario", "si");
		window.location.href = pathname+"/home.php"; 
				}else
				{
					localStorage.setItem("completadoformulario", "no");
					$("#alertbad").show();
					$("#alertbad").html("hubo un error al guardar sus datos comuniquese a su concierge.");
					setTimeout(function() {$("#alertbad").hide();},5000);
				}
			});
	}else{
		$("#alertbad").show();
		$("#alertbad").html("Complete the fields marked");
		setTimeout(function() {$("#alertbad").hide();},5000);
	}}else{
		$("#alertbad").show();
		$("#alertbad").html("Accept the terms and conditions.");
		$("#checkenvia").addClass("alerta").focus();
		setTimeout(function() {$("#alertbad").hide();},5000);	
	}}else{
		$("#alertbad").show();
		$("#alertbad").html("Enter customer name.");
		$("#nombre").addClass("alerta").focus();
		setTimeout(function() {$("#alertbad").hide();},5000);	
	}}else{
		$("#alertbad").show();
		$("#alertbad").html("The phone only contain numerical data.");
		$("#telefono").addClass("alerta").focus();
		setTimeout(function() {$("#alertbad").hide();},5000);	
	}}else{
		$("#alertbad").show();
		$("#alertbad").html("Enter a full phone minimum of 10 numbers including area code.");
		$("#telefono").addClass("alerta").focus();
		setTimeout(function() {$("#alertbad").hide();},5000);	
	}}else{
		$("#alertbad").show();
		$("#alertbad").html("Enter a valid email.");
		$("#email").addClass("alerta").focus();
		setTimeout(function() {$("#alertbad").hide();},5000);	
	}	
}else{
			$("#alertbad").show();
		$("#alertbad").html("Validate your folio.");
		setTimeout(function() {$("#alertbad").hide();},5000);
}
}
*/


function isNumberKey(evt)

{  

    var charCode = (evt.which) ? evt.which : event.keyCode   

    if (charCode > 31 && (charCode < 48 || charCode > 57))   

        return false;

    return true;  

} 



function validacionID(id, clase){	

	var total = $("#"+id+" ."+clase+":visible").length;

	var conteo = 0;

	var flag = 1;

	var preflag = 1;

	

	$("#"+id+" ."+clase+":visible").each(function(){

		conteo++;

		var idb = $(this).attr("id");

		var valor = $(this).val();

		var tipo =document.getElementById(idb).type;		

		if(valor == "" || (tipo=="select-one" && valor == 0)){

			flag = 0;				

			$(this).addClass('alerta');

		}			

	});

	

	if(flag == 0) {		

		return false;

	} else {

		return true;

	}

}



function validarEmail(email) {

    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!expr.test(email)){

        return false;

	}else{

		return true;

	}	

}
function validarEmailCotitular(emailCotitular) {

    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!expr.test(emailCotitular)){

        return false;

	}else{

		return true;

	}	

}



function validarnombre(){
	if($("#nombre").val().length <= 0) {   
       return false;

	}else{

		return true;

	}	

}

function validarapellidoCliente(){
 	if($("#apellidoCliente").val().length <= 0) {   
       return false;

	}else{

		return true;

	}	

}

function validarnombreCotitular(){
	if($("#nombreCotitular").val().length <= 0) {   

	}else{

		return true;

	}	

}
function validarapellidoCotitular(){
	if($("#apellidoCotitular").val().length <= 0) {   

	}else{

		return true;

	}	

}
function validartelefono(){

    if($("#telefono").val().length < 10) {   

        return false;

	}else{

		return true;

	}	

}
function numerostelefono(){

    if(isNaN($("#telefono").val())) {  

        return false;

	}else{

		return true;

	}	

}
function validartelefono2Cliente(){

    if($("#telefono2Cliente").val().length < 10) {   

        return false;

	}else{

		return true;

	}	

}
function numerostelefono2Cliente(){

    if(isNaN($("#telefono2Cliente").val())) {  

        return false;

	}else{

		return true;

	}	

}
function validartelefono1Cotitular(){

    if($("#telefono1Cotitular").val().length < 10) {   

        return false;

	}else{

		return true;

	}	

}
function numerostelefono1Cotitular(){

    if(isNaN($("#telefono1Cotitular").val())) {  

        return false;

	}else{

		return true;

	}	

}
function validartelefono2Cotitular(){

    if($("#telefono2Cotitular").val().length < 10) {   

        return false;

	}else{

		return true;

	}	

}
function numerostelefono2Cotitular(){

    if(isNaN($("#telefono2Cotitular").val())) {  

        return false;

	}else{

		return true;

	}	

}

function limpiaform(id){

	$("#"+id+" input").each(function(){

		$(this).val("");

	});

	$("#"+id+" textarea").each(function(){

		$(this).val("");

	});	

}
 
	$(document).on("click","#validateFolios",function()
	{
		if($("#numerofolios").val()!=0)
		{
			var valorFolios=new Array();
			for(i = 0; i < $("#numerofolios").val(); i++){
				valorFolios[i]=$("#folio_"+i).text();
				//console.log(valorFolios[i]+"="+$("#folio_"+i).val());
			}
			$.ajax(
			{
				url: pathname + "/_assets/_controllers/data-verification-folios.php",
				data:{ 
					folios: valorFolios,
					cantidad: $("#numerofolios").val()
				},
				success: function(data)
				{
					$("#alertvalidafolios").show();  
					//setTimeout(function() {$("#alertvalidafolios").hide();},5000);
					if(data=="ok")
					{
						$("#alertvalidafolios").html("Your folios have been validated succesfully.");
						$("#alertvalidafolios").addClass('good');
						hayfolio="no";
						//$('html,body').animate({scrollTop: $("#listanotasfolios").offset().top - resta}, 500);
						setTimeout(function() {$('html,body').animate({scrollTop: $("#listanotasfolios").offset().top - resta}, 500);},5000);
					}
					else
					{
						$("#alertvalidafolios").html("There was a problem please contact your personal concierge.");
						$("#alertvalidafolios").addClass('bad');

					}
					setTimeout(function() {$("#alertvalidafolios").hide();},5000);
				}
			}).fail(function()
			{
				$("#alertvalidafolios").show();
				$("#alertvalidafolios").html("There was a problem please contact your personal concierge.");
				$("#alertvalidafolios").addClass('bad');
				setTimeout(function() {$("#alertvalidafolios").hide();},5000);
			});
		}
	});

	$(document).on("click","#enviaradicionalfolio",function()
	{
		if($("#foliosadicionales").val()!="" && $("#foliosadicionales").val().length >= 1)
		{
			$.ajax(
			{
				url: pathname + "/_assets/_controllers/data-verification-foliosextra.php",
				data:{ 
					folios: $("#foliosadicionales").val(),
				},
				success: function(data)
				{
					$("#alertvalidafoliosextra").show();
					setTimeout(function() {$("#alertvalidafoliosextra").hide();},5000);
					if(data=="ok")
					{
						$("#alertvalidafoliosextra").html("We have received the information successfully. Your Personal Concierge will contact you to continue with the validation process.");
						$("#alertvalidafoliosextra").addClass('good');
					}
					else
					{
						$("#alertvalidafoliosextra").html("There was a problem please contact your personal concierge.");
						$("#alertvalidafoliosextra").addClass('bad');
					}
				}
			}).fail(function()
			{
				$("#alertvalidafoliosextra").show();
				$("#alertvalidafoliosextra").html("There was a problem please contact your personal concierge.");
				$("#alertvalidafoliosextra").addClass('bad');
				setTimeout(function() {$("#alertvalidafoliosextra").hide();},5000);
			});	
		}
		else
		{
			$("#alertvalidafoliosextra").show();
			$("#alertvalidafoliosextra").html("Write a folio.");
			$("#alertvalidafoliosextra").addClass('bad');
			setTimeout(function() {$("#alertvalidafoliosextra").hide();},5000);
		}
	});