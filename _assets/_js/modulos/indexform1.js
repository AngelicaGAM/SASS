// JavaScript Document
$( document ).ready(function() {
    $("input[type=checkbox]").uniform();
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

function sendForm(){

	var email  = $("#email").val();
	var checkenviar = $("#checkenvia").val();
	var emailCotitular  = $("#emailCotitular").val();

	if(validarEmail(email)){

		if(validartelefono(telefono)){

				if(numerostelefono(telefono)){
/*
							if(validartelefono2Cliente(telefono2Cliente)){

								if(numerostelefono2Cliente(telefono2Cliente)){
*/
									if(validarnombre(nombre)){
/*
										if(validarapellidoCliente(apellidoCliente)){
	
	
	if(validarEmailCotitular(emailCotitular)){

		if(validartelefono1Cotitular(telefono1Cotitular)){

				if(numerostelefono1Cotitular(telefono1Cotitular)){
							
							if(validartelefono2Cotitular(telefono2Cotitular)){

								if(numerostelefono2Cotitular(telefono2Cotitular)){

									if(validarnombreCotitular(nombreCotitular)){

										if(validarapellidoCotitular(apellidoCotitular)){
*/
											if(checkenviar == 1){
	

		if(validacionID("frmindex", "validar")){

				$.ajax({

						type: "POST",
				  		url: "_assets/_clases/formindexclass.php",
				  		data: $("#frmindex").serialize()	 

				})

				.done(function(texto) {

					limpiaform("frmindex");	

					alert("Thank you, this information will only be used when making a purchase or when you deem it appropriate or necessary.");  

					window.location.href = "https://members.beyond-experience.com/home.php";  	     	   	    	     	     	

			  	})

			  	.fail(function(){  		



			  	})

			  	.always(function(){

			    	

			  	});				

		}else{

			alert("Complete the fields marked.");
			}}else{

		alert("Accept the terms and conditions.");

		$("#checkenvia").addClass("alerta").focus();	

	}/*}else{

		alert("Enter customer last name.");

		$("#apellidoCotitular").addClass("alerta").focus();	

	}}else{

		alert("Enter customer name.");

		$("#nombreCotitular").addClass("alerta").focus();	

				
	}}else{

		alert("The phone only contain numerical data.");

		$("#telefono2Cotitular").addClass("alerta").focus();	

	}}else{

		alert("Enter a full phone minimum of 10 numbers including area code.");

		$("#telefono2Cotitular").addClass("alerta").focus();	

	}}else{

		alert("The phone only contain numerical data.");

		$("#telefono1Cotitular").addClass("alerta").focus();	

	}}else{

		alert("Enter a full phone minimum of 10 numbers including area code.");

		$("#telefono1Cotitular").addClass("alerta").focus();	

	}}else{

		alert("Enter a valid email.");

		$("#emailCotitular").addClass("alerta").focus();	

	}}else{

		alert("Enter customer last name.");

		$("#apellidoCliente").addClass("alerta").focus();	

	}*/}else{

		alert("Enter customer name.");

		$("#nombre").addClass("alerta").focus();	

				
	}/*}else{

		alert("El telefono solo deve contener datos numericos.");

		$("#telefono2Cliente").addClass("alerta").focus();	

	}}else{

		alert("Enter a full phone minimum of 10 numbers including area code.");

		$("#telefono2Cliente").addClass("alerta").focus();	

	}*/}else{

		alert("The phone only contain numerical data.");

		$("#telefono").addClass("alerta").focus();	

	}}else{

		alert("Enter a full phone minimum of 10 numbers including area code.");

		$("#telefono").addClass("alerta").focus();	

	}}else{

		alert("Enter a valid email.");

		$("#email").addClass("alerta").focus();	

	}	

	

	

}



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