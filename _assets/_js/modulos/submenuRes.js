var getcanti;
var getcanti2;
var exe;

var pathname = window.location.href.split('/').slice(0, 3).join('/');
// var pathname = "https://members.beyond-experience.com";

/*
function shop(n, exe){
	if(n>=1 && exe==1){
		console.log("hola");
		exe=0;
	}
}
*/
$( window ).load(function() {
		if(localStorage.getItem("cintilloMFA")!=1){
				$("#cintilloMFA").slideToggle();
		}

	//console.log(localStorage.getItem("MFAOK"));
	if(localStorage.getItem("MFAOK")!=1){
	localStorage.setItem("MFAOK",0);
	
	}
	//console.log(localStorage.getItem("MFAOK"));
	//$("#cintilloMFA").css("display","none");
});
//$('div.emphasis').children('p')
$(document).on("click", "#closeMFA", function () {
	localStorage.setItem("cintilloMFA",1);
	$("#cintilloMFA").slideToggle();


});
$(document).on("click", "#irMFA", function () {
	localStorage.setItem("MFAOK",1);
	window.location.assign( pathname +'/MFA.php');
});

function ultracanti(n){
	//shop(n, 1, 1);
	//console.log("llego una cantidad del carro es: "+n)
	getcanti=localStorage.setItem("ultracanti",n);
	if (n == 0) {
		localStorage.setItem("minutes", 24);
		localStorage.setItem("seconds",59);
		//console.log("no hay productos seteamos contadores minutos a"+localStorage.getItem("minutes"));
		//console.log("no hay productos seteamos contadores segundos a"+localStorage.getItem("seconds"));
		clearInterval(timer);
		clearTimeout(timer);
		clearInterval(interval);
		disparaReloj=0;
		cantidadDeProductos=0
	}
	//if(localStorage.getItem("ultracanti") != null && localStorage.getItem("ultracanti") != "" && localStorage.getItem("ultracanti") != false && localStorage.getItem("ultracanti") != undefined){
		////console.log("notifyMetime llego"+localStorage.getItem("ultracanti"));
		//notifyMetime(localStorage.getItem("ultracanti"));
	//}else{
		//console.log("notifyMetime no llego"+localStorage.getItem("ultracanti"));
	notifyMetime(localStorage.getItem("ultracanti"));
	//}
}

if (localStorage.getItem("minutes") != null && localStorage.getItem("minutes") != "" && localStorage.getItem("minutes") !== false && localStorage.getItem("minutes") !== "undefined" && localStorage.getItem("seconds") != null && localStorage.getItem("seconds") != "" && localStorage.getItem("seconds") != false && localStorage.getItem("seconds") != "undefined") {
	if (localStorage.getItem("minutes") != null && localStorage.getItem("minutes") != "" && localStorage.getItem("minutes") !== false && localStorage.getItem("minutes") !== "undefined") {
		//console.log("llegaron minutos son = "+localStorage.getItem("minutes"));
	} else {
		localStorage.setItem("minutes", 24);
		//console.log("no llegaron minutos se setean a = "+localStorage.getItem("minutes"));
	}
	if (localStorage.getItem("seconds") != null && localStorage.getItem("seconds") != "" && localStorage.getItem("seconds") != false && localStorage.getItem("seconds") != "undefined") {		
			 //console.log("llegaron segundos son: = "+localStorage.getItem("seconds"));
	} else {
		localStorage.setItem("seconds",59);
		//console.log("los habian minutos todavia? total de minutos: "+localStorage.getItem("minutes"));
		if (localStorage.getItem("minutes") >= 1) {
			localStorage.setItem("minutes", localStorage.getItem("minutes")-1);
		}
		//console.log("no llegaron segundos se setean a = "+localStorage.getItem("seconds"));
	}
} else {
	clearInterval(timer);
	clearTimeout(timer);
	clearInterval(interval);
	disparaReloj=0;
	cantidadDeProductos=0
}

var timer;
var disparaReloj = 0;
function  notifyMetime(cantidadDeProductos)  {
	//console.log("validador para disparar el reloj cantidad del producto que llego es de: "+cantidadDeProductos);

	if (cantidadDeProductos >= 1) {
		//console.log("Cantidad de producto es mayor o igual a 1 actualmente es"+cantidadDeProductos);

		disparaReloj = 1+disparaReloj;

		//console.log("se dispara el reloj por que el dispara reloj es: "+disparaReloj)
		
		if (disparaReloj == 1) {
			//console.log("se dispara el reloj con cantidad de 5 minutos milisegundos 300000");
			timer = setInterval(function(){  notifyMe() }, 300000);
			//timer = setInterval(function(){  notifyMe() }, 3000);
			//console.log("los minutos que pone son"+localStorage.getItem("minutes"));
			//console.log("los segundos que pone son"+localStorage.getItem("seconds"));

			contador_regresivo(0, 0, localStorage.getItem("minutes"), localStorage.getItem("seconds"), 2);
		} else {}
	} else if (cantidadDeProductos < 1) {
		disparaReloj=0;
		//console.log("se limpia el carrito");
		clearTimeout(timer);
		contador_regresivo(0, 0, localStorage.setItem("minutes", 24), localStorage.setItem("seconds", 59), 1);
		localStorage.setItem("minutes", 24);
		localStorage.setItem("seconds", 59); 
		//console.log("se setean los minutos a: "+localStorage.getItem("minutes", 24));
		//console.log("se setean los segundos a: "+localStorage.getItem("seconds", 59));
	}

}

var interval;
var reserva;
function contador_regresivo(d, h, m, s, n) {
	if (n == 1) {
		clearInterval(interval);
		banderitam=2;
	} else if (n == 2) {
		interval = setInterval(function () {
			if (s > 0) {
				s--; localStorage.setItem("seconds", s);
			} else {
				if (m > 0) {
					m--;
					s = 59;
					localStorage.setItem("minutes", m);
				} else {
					localStorage.setItem("minutes", 0); 
					if (h > 0) {
						h--;
						m = 59;
						s = 59;
					} else {
						if (d > 0) {
							d--;
							h = 24;
							m = 59;
							s = 59;
						} else if (/*d==-0 && h==-0 &&*/ m == 0 && s == 0) {
							if (window.location != pathname + "/reservacion/resumenCarrito.php" && window.location != pathname + "/reservacion/checkout.php") {
								clearInterval(interval);
								banderitam = 2;
								$('.jcart-remove').trigger('click');
									$.ajax({
									 	url:"_assets/_controllers/clearjcart.php",
								});
							}
							if (window.location == pathname + "/reservacion/resumenCarrito.php") {
								$('.jcart-remove').trigger('click');
								$.ajax({
									url: "../_assets/_controllers/clearjcart.php"
								});
								location.reload();
							}
							if (window.location == pathname + "/reservacion/checkout.php") {
								$('.jcart-remove').trigger('click');
								$.ajax({
									url: "../_assets/_controllers/clearjcart.php"
								});
								location.reload();
								window.location.href = pathname + "/home.php";
							}
							clearInterval(timer);
							clearTimeout(timer);
							clearInterval(interval);
							disparaReloj = 0;
							cantidadDeProductos = 0;
							ultracanti(0);
							$(".cantidadcarro2").text(0);

						}
					}
				}
			}
			if (m >= 0) {
				if (localStorage.getItem("ultracanti") == 0) {
					$('.jcart-remove').trigger('click');
					$.ajax({
						url:pathname+"/_assets/_controllers/clearjcart.php",
					});
					//location.reload();
					//window.location.href = pathname+"/home.php";
					clearInterval(timer);
					clearTimeout(timer);
					clearInterval(interval);
					disparaReloj=0;
					cantidadDeProductos=0;
					ultracanti(0);
					$(".cantidadcarro2").text(0);
					if (window.location == pathname + "/reservacion/resumenCarrito.php") {
						location.reload();
					}
				}
			}
			if (s < 10) {
				$("#contador").text(m+" : 0"+s); 
			}
			if(m<10){
				$("#contador").text("0"+m+" : "+s); 
			}
			if(m<10 && s<10){
				$("#contador").text("0"+m+" : 0"+s); 
			}
			if (m == 5 && s == 0) {
				if (window.location != pathname + "/reservacion/resumenCarrito.php" && window.location != pathname + "/reservacion/checkout.php" && window.location != pathname + "/reservacion/infoPago.php" && window.location != pathname + "/reservacion/confirmacionPago.php") {
					//alert("Seras redirigido a la reservacion");
					localStorage.setItem("reserva",1);
					window.location.href = pathname + "/reservacion/resumenCarrito.php";
				}
			}
			if (m == 2 && s == 0) {
				if (window.location == pathname + "/reservacion/checkout.php") {
					var htmlComplete = '<link href="' + pathname + '/_assets/_css/popupInventarioRegina.css?x=' + (Math.floor(Math.random() * 100)) +'" type="text/css" rel="stylesheet">'+
					'<div id="InventarioRegina" class="modal chrono-modal">'+
						'<div class="headerImagen">'+
							'<img src="' + pathname + '/_assets/_images/template/logo-1000.png"/>'+
						'</div>'+	
						'<div class="fondopopup">'+
							'<span class="titulopop">Notice!</span>'+
							'<span class="parrafopop">If you do not complete your purchase process in 2 minutes you will be redirected to the home and your purchase will be lost<br /><br />Thank you for your preference.</span>'+
							'<div class="iblockpop w70"></div>'+
						'</div>'+
					'</div>';
					$.fancybox.open(htmlComplete,{
						type : 'html',				
					}).trigger('#chronoIn');

		
				}
			}
			if (m > 10 && s > 10) {
				$("#contador").text(m+" : "+s);
			}
			//console.log (d+" d "+h+" h "+m+" m "+s+" s");

		}, 1000);
	}
}

function notifyMe() {
    var options = {
        body: "Thank you for adding this product, we remind you that the rates are changeable and we recommend you finalize your purchase as soon as possible so that you can get the most out the benefits of your membership.",
        icon: pathname+"/_assets/_images/template/BeyondLogo.png",
        dir : "ltr"				
    };
	var notification = new Notification("Beyond Experience", options);
	
	//notification.onshow = show();
    //notification.onerror = error();
    //notification.onclose = close();
	//notification.onclick = click();
	
}

//function show() {console.log("Se abrió la notificación");}
//function error() {console.log("Ocurrió un error con la notificación");}
//function close() {console.log("Se cerró la notificación");}
//function click() {console.log("Clic la notificación");}
//var valorrr = document.getElementById('#userLog').value;
$(document).ready(function () {
/*folios*/
if(localStorage.getItem("completadoformulario")=="si" && $("#data-verification-complete").val()==1){
	localStorage.setItem("completadoformulario", "no");
			var htmlFancy = '<link href="' + pathname + '/_assets/_css/popupInventarioRegina.css?x=<?php echo(rand()); ?>" type="text/css" rel="stylesheet">'+
			'<div id="InventarioRegina" class="modal chrono-modal">'+
				'<div class="headerImagen" style="background:url(' + pathname + '/_assets/_images/popupInventarioRegina/bg.jpg) no-repeat;">'+
					'<img src="' + pathname + '/_assets/_images/template/logo-1000.png"/>'+
				'</div>'+	
				'<div class="fondopopup">'+
					'<span class="parrafopop">Thank you for completing your information. Welcome to Beyond Experience.</span>'+
					'<div class="iblockpop w70">'+
						'<input  class="botonPop cancelPop" type="button" value="Access" onClick="parent.jQuery.fancybox.close();"> '+
					'</div>'+
				'</div>'+
			'</div>';
			$.fancybox.open(htmlFancy,{
				type : 'html',				
			});

}
if($("#data-verification-complete").val()!=1 && window.location != pathname +'/home.php'){
	window.location.assign( pathname +'/home.php');
}
/*termina folios*/


//console.log($("#userLog").val());

if($("#userLog").val() == 2){
	console.log("NO USER LOG: " + $("#userLog").val());
	window.location.assign('https://www.beyond-experience.com');
}else{
	console.log("USUARIO LOG ES: " + $("#userLog").val());
}

	localStorage.setItem("sesionagencia",$("#agencia").val());
	var heightscreen = 0;
	var widthscreen = 0;
	if (self.screen) {
		widthscreen = screen.width;
		heightscreen = screen.height
	} else if (self.java) {
		var jkit = java.awt.Toolkit.getDefaultToolkit();
		var scrsize = jkit.getScreenSize();
		widthscreen = scrsize.width;
		heightscreen = scrsize.width;
	}
	if (widthscreen > 0 && heightscreen > 0) {

	}
	else {

	}
	
	getcanti3 = $(".cantidadcarro2").text();
	if (getcanti3 == null || getcanti3 == "" || getcanti3 == false || getcanti3 == undefined || getcanti3 == "undefined" || getcanti3 == "null") {
		$(".cantidadcarro2").text(0); 
		ultracanti(0);
	} else {
		$(".cantidadcarro2").text(getcanti3);
		ultracanti(getcanti3);
	}
	//console.log(localStorage.getItem("reserva"));
	if (localStorage.getItem("reserva") == 1) {
		var htmlComplete = '<link href="' + pathname + '/_assets/_css/popupInventarioRegina.css?x=' + (Math.floor(Math.random() * 100)) +'" type="text/css" rel="stylesheet">'+
		'<div id="InventarioRegina" class="modal chrono-modal">'+
			'<div class="headerImagen">'+
				'<img src="' + pathname + '/_assets/_images/template/logo-1000.png"/>'+
			'</div>'+	
			'<div class="fondopopup">'+
				'<!--<span class="titulopop">Notice!</span>-->'+
				'<span class="parrafopop">You have 5 minutes to complete your purchase process or lose your products.<br /><br />Thank you for your preference.</span>'+
				'<div class="iblockpop w70"></div>'+
			'</div>'+
		'</div>';
		$.fancybox.open(htmlComplete,{
			type : 'html',				
		});

		localStorage.setItem("reserva", 0);
	}

	/*
	// Check browser support
	if (typeof(Storage) !== "undefined") {
    	// Store
    	localStorage.setItem("lastname", "Smith");
    	// Retrieve
    	document.getElementById("result").innerHTML = localStorage.getItem("lastname");
	} else {
		document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
	}
	*/

	//var valido = 0;
	//var valida = "";
	//$("#cantidadcarroi").trigger();
	
	//window.status="";
	//console.log("http"+localStorage.getItem("usuario")+" && "+localStorage.getItem("pass")+ " && " + localStorage.getItem("show"));
	//console.log("https"+Cookies.get('usuario')+" && "+Cookies.get('pass')+ " && " + Cookies.get('showcheckbox'));
	
	if( (Cookies.get('usuario') != "" && Cookies.get('usuario')!="undefined" &&  Cookies.get('usuario')!=null) && (Cookies.get('pass')!="" && Cookies.get('pass')!="undefined" && Cookies.get('pass')!=null)  )
	//if( (localStorage.getItem("usuario") != "" && localStorage.getItem("usuario")!="undefined" &&  localStorage.getItem("usuario")!=null) && (localStorage.getItem("pass")!="" && localStorage.getItem("pass")!="undefined" && localStorage.getItem("pass")!=null)  )
	{
		/*
		//	console.log("esta pasando");
		//$.post('_assets/_controllers/logueo.php',{ user:localStorage["usuario"],pass:localStorage["pass"] }, function(data){
		$.post('../_assets/_controllers/logueo.php',{ user:Cookies.get('usuario'),pass:Cookies.get('pass') }, function(data){	
		
				/// data con el login
				
				data = data.split(".-,")
				 	
				//if(data[0]=="ok")
				//{
					$("#contenidoV").html(data[1]);
					$("#menuPrincipal").html(data[2]);
				//}
				//$( "body" ).find( ".show" ).css( "display", "block" );
			
			});	*/
	}

	// funcionamieto para cambiar el valor del campo aplicarrewards valor 1 aplica el reward en el carrito
	// valor 0 no aplica el reward en el carrito
	// se aplica validación de los check rewards para que no permitá seleccionar de más
	var saldoChecked = 0;
	var saldoUser = 0;
	var saldoPendiente = 0;
	$(document).on("click","input[name^='checkRW']",function(){
		
		if ($("#modulovalidacion").val() == "hotelesRW") 
		{ var nameInput = 'gm-AplicaRewardCManual'; }

		if($("#modulovalidacion").val()=="hoteles")
		{var nameInput='TN-AplicaReward';}
		
		if($("#modulovalidacion").val()=="tours")
		{var nameInput='tourAplicaReward'}
		
		if($("#modulovalidacion").val()=="transfers")
		{var nameInput='transferAplicaReward'}
		
		if($("#modulovalidacion").val()=="transfersmys")
		{var nameInput='transferMysAplicaReward'}
		
		if($("#modulovalidacion").val()=="toursmys")
		{var nameInput='tourMysAplicaReward'}
		
		if($("#modulovalidacion").val()=="semanas")
		{var nameInput='semanasAplicaReward'}
		
		if($("#modulovalidacion").val()=="fichas")
		{var nameInput='fichaAplicaReward'}
		// carros
		if ($("#modulovalidacion").val()=="cars")
		{var nameInput='TC-applyrwcar'}
		
		precio = 0;
		precioChecked = ($(this).val()).split(",");
		for (i = 0; i < precioChecked.length; i++){
			precio += precioChecked[i];
		}
		saldoCheck = parseInt(precio);
		if ($(this).is(":checked")) {
			saldoChecked += saldoCheck;
			//console.log(saldoChecked);
			$.ajax({
				url: pathname + "/_assets/_controllers/saldoRW.php",
				type: 'POST',
				dataType: 'json',
				async: false,
				success: function (data) {
					saldoUser = data;
				}
			});
			saldoPendiente = saldoUser - saldoChecked;
			if (saldoPendiente >= 0) {
				if ($("#modulovalidacion").val() == "hotelesRW") {
					$(this).parent().parent().parent().parent().parent().parent().find("input[name^='" + nameInput + "']").attr("value", 1);
				}
				else {
					$(this).parent().parent().parent().find("input[name^='" + nameInput + "']").attr("value", 1);
				}
				// console.log("check RW: ",$(this).parent().parent().parent().find("input[name^='checkRW']").val());
				// console.log("check HD: ",$(this).parent().parent().parent().find( "input[name^='"+nameInput+"']" ).val());
			} else {
				// console.log("superas tus b-rewards");
				saldoChecked -= saldoCheck;
				if ($("#modulovalidacion").val() == "hotelesRW") {
					$(this).parent().parent().parent().parent().parent().parent().find("input[name^='" + nameInput + "']").attr("value", 0);
				}
				else {
					$(this).parent().parent().parent().find("input[name^='" + nameInput + "']").attr("value", 0);
				}
				$(this).attr("checked", false);
				$.uniform.update(this);
				var htmlRewards = '<link href="' + pathname + '/_assets/_css/popupInventarioRegina.css?x=' + (Math.floor(Math.random() * 100)) +'" type="text/css" rel="stylesheet">'+
				'<div id="InventarioRegina" class="modal chrono-modal">'+
					'<div class="headerImagen">'+
						'<img src="' + pathname + '/_assets/_images/template/logo-1000.png"/>'+
					'</div>'+	
					'<div class="fondopopup">'+
						'<span class="titulopop">Dear member,</span>'+
						'<span class="parrafopop">You do not have enough Rewards to complete this reservation. Please contact 1-888-963-74-57 for more information.</span>'+
						'<div class="iblockpop w70"></div>'+
					'</div>'+
				'</div>';

				$.fancybox.open(htmlRewards,{
					type : 'html',				
				});

			
				// console.log("check RW: ",$(this).parent().parent().parent().find("input[name^='checkRW']").val());
				// console.log("check HD: ",$(this).parent().parent().parent().find( "input[name^='"+nameInput+"']" ).val());
			}
			// console.log("saldo Check: " + saldoChecked);
			// console.log("saldo usuario: " + saldoUser);
			// console.log("saldo pendiente: " + saldoPendiente);
		} else {
			saldoChecked -= saldoCheck;
			if ($("#modulovalidacion").val() == "hotelesRW") {
				$(this).parent().parent().parent().parent().parent().parent().find("input[name^='" + nameInput + "']").attr("value", 0);
			}
			else {
				$(this).parent().parent().parent().find("input[name^='" + nameInput + "']").attr("value", 0);
			}
			// console.log("saldo Check: " + saldoChecked);
			// console.log("saldo usuario: " + saldoUser);
			// console.log("saldo pendiente: " + saldoPendiente);
		}
		
	});
	
	$(document).on("click", ".my-add-button", function () {
		saldoChecked = 0;
		var pref = typeof models !== 'undefined' && models.openMap ? 'map-' : '' ;
		$("#"+pref+"mostrar"+$(this).data("c")).slideUp(1000);
		$("#"+pref+"ultratabs"+$(this).data("c")).slideUp(1000);
		$("#hotelito_"+$(this).data("c")).removeClass("fixedMobile");
		$('body').css('overflow','auto');
		$("#hotelito_"+$(this).data("c") + " .contenedor_interno").show(200);
    });
    $(document).on("click", ".btnadd", function () {
        saldoChecked = 0;
    });
    $(document).on("click", ".btonP", function () {
        saldoChecked = 0;
    });
	
	/*if(navigator.platform==="iPad")
	{
		  var styles = "@import url(' https://members.beyond-experience.com/_assets/_css/ipadEstyles.css ');";
		  var newSS=document.createElement('link');
		  newSS.rel='stylesheet';
		  newSS.href='data:text/css,'+escape(styles);
		  document.getElementsByTagName("head")[0].appendChild(newSS);	
	}	
	*/
	
	
	/// salida
	$(document).on("click","#out",function(data){
	/*	$zopim(function() {
			//	alert("entra");
			$zopim.livechat.clearAll();
		});*/

		//Fragmento deslogeo para producción o con entrada desde una landing
		$.ajax({
			data: { action: 'logout' },
			type: 'POST',
			dataType: 'JSON',
			url: pathname + "/_assets/_controllers/login/SessionController.php",
			success: function(response) {
				if (response.logout) {
					agencia = $("#out").attr("name");
					if (agencia == "IAC110720126MH") {
						window.location.assign('https://www.infiniteallianceclub.com');
					} else {
						window.location.assign('https://www.beyond-experience.com');
					}
					localStorage.setItem("promoHome", 0);
				} else {
					console.log('Error. Logout failed.');
				}
			}
		});

		//Fragmento deslogeo para local o con entrada desde la raíz
		/*$.ajax({
			data: { logout : "true"},
			dataType: 'JSON',
			url: pathname + "/_assets/_controllers/logout.php",
			success: function( data ){				
				if( data==="ok" ){
					localStorage.setItem("promoHome", 0);											
					Cookies.remove('usuario',  { expires: -1,path: '/',domain:"beyond-experience.com" });
					Cookies.remove('pass',  { expires: -1,path: '/',domain:"beyond-experience.com" });
					Cookies.remove('showcheckbox', { expires: -1,path: '/',domain:"beyond-experience.com" });
					window.location="indexLocal.php";					
				}	
			}
		});*/
	});
	

	/*
	//permisos para el menu
	
	
		$.ajax({
			url:"../../_assets/_controllers/getPermisos.php",
			//dataType:"json",
			type:"POST",
			data:{ }	
		})
		.done(function(data){
			
			if(data!="")
			{
				var res=data.split(",.-");
				
				//if(res.length>0)
				//{
					var aux=[];
					
					for(var b=0 ; b<res.length; b++)
					{aux.push(parseInt(res[b]));}
					
					var conta=1
					//var conta2=4
					
					// menu travel services
					for(var a=0; a<5; a++)
					{
						var valor = $("#sub1 li").eq(a).prop("value");
						if($.inArray( valor, aux )==-1 && valor!=8)
						{	$("#sub1 li").eq(a).addClass("marcadoborra");}
						
					}
					
					// menu de activities
					for(var a=0; a<=3; a++)
					{
						var valor = $("#sub2 li").eq(a).prop("value");
						if(valor!=7 && valor!=8) 
						{
							if($.inArray( valor, aux )==-1)
							{	$("#sub2 li").eq(a).addClass("marcadoborra");}
						}
					}
					
					
					//elimino los li con la clase marcadoborra
					$("#sub1").find('li').each(function(){
						
						if( $(this).prop("class")!="" )
						{ $(this).remove();}
					});
					
					$("#sub2").find('li').each(function(){
						
						if( $(this).prop("class")!="" )
						{ $(this).remove();}
					});
					
					
					// oculto el menu de travel o actividades si no tiene ningun li
					if($("#sub1").find('li').length==0)
					{$("#sub1" ).parent().hide();}
					
					if($("#sub2").find('li').length==0)
					{ $("#sub2" ).parent().hide();}
				//}
				
				
			}
			
			else
				{
					
					// elimino el menu de travel services y de activities
					
					$("#menuPrincipal li").find('ul').each(function(){
					
						$(this).parent().remove()
					});
					
					//cambio de color el boder naranja del ultimo li
					$("#menuPrincipal li:last").css("border-right","1px solid #005464")
					
				}
			
		});*/
		
						

		$(document).on({
				mouseenter:function(e){
				    	
						e.preventDefault();
						
						 var estadoV = $("#nav-mobile").css("display");	
						  var ul = $(this).find(".subM");
					 		
						var tamp = $(window).width();
						//alert(tamp);
						if(tamp>=745)
						{
							$(this).css("height"	,"440px");
					 		$(".subM li").css("height","auto");
						}
						 ul.slideDown(150); 
					 
					  
					  
				},
				mouseleave:function(e){
						e.preventDefault();
					   var ul = $(this).find("ul");
					   var estadoV = $("#nav-mobile").css("display");
						$(this).css("height"	,"auto");
					 	   ul.stop().slideUp(50);	
					
					  
				}
			},"#menuPrincipal ul li");
	
		 var btn_movil = $("#nav-mobile");
		 var menu = $("#menuPrincipal ul:eq(0)");
		 // Al dar click agregar/quitar clases que permiten el despliegue del menú
		btn_movil.on("click", function (e) {
				e.preventDefault();
		 		//alert("clien");
				var el = $(this);
		 
				el.toggleClass("nav-active");
				
				if(menu.css("display")==="none")
				{
					menu.slideToggle("slow");	
				}
				else
				{
					menu.slideToggle("fast");	
				}
				//menu.toggleClass("open-menu");
				
				
			});
			
		var bntUsuarioM = $("#nav-mobile-usuario");
		var menu2 = $("#welcomeDiv .menuDiv1");
		var menu3 = $("#welcomeDiv .menuDiv2");
		bntUsuarioM.on("click",function(e){
				e.preventDefault();
				var el = $(this);
				el.toggleClass("nav-active");
				if(menu2.css("display")==="none" && menu3.css("display")==="none")
				{		
					menu.hide();
					menu2.slideToggle("slow");	
					menu3.slideToggle("slow");
						
				}
				else
				{
						menu2.slideToggle("fast");
						menu3.slideToggle("fast");
					
				}
			});
		
		/*boton promo */
		
		$("#bannerPeque").on({
			mouseenter:function(){
				$(this).find(".contenido .title").addClass("rolloverBanner");
				$(this).find(".mundo img").prop("src","_assets/_images/template/botonPromo/mundoPeque2.png");
			},
		mouseleave:function(){
				$(this).find(".contenido .title").removeClass("rolloverBanner");
				$(this).find(".mundo img").prop("src","_assets/_images/template/botonPromo/mundoPeque.png");
			},
	
	
		click: function(){
				$(this).hide(50);
				$("#bannerGrande").show(150);	
			}
		
		});
		
		$("#cerrar-bnt").on("click",function(){
			$("#bannerGrande").hide(10);
			$("#bannerPeque").show(50);	
		});
		
		$(".ownPlan").fancybox({ padding:0, height:750, autoSize:true, });
		
		var fancy = jQuery(".fancyB");
		
		//$(".fancyB").fancybox({
		fancy.fancybox({
				padding:0,
				margin:0,
				autoSize:true,
				width:550,
				height:600,
				closeBtn:false,
				beforeClose:function(){
					
					/// lllamo a un controller que valide el si el usuario tiene estado 99 si es asi sigo bloqueando al usuario y borro session 
				//	alert("demo de que cierra");
					
					$.ajax({
								url:"../../_assets/_controllers/validaUser.php",
								success: function(data){
										
										//console.log(data);
										
										if(data=="R")
										{
												$.ajax({
															url:"../../_assets/_controllers/logout.php",
															success: function(data){
																if(data==="ok")
																{
																		/*localStorage["usuario"]="";
																		localStorage["pass"]="";
																		localStorage["showcheckbox"]=0;*/
																		
																		Cookies.remove('usuario',  { expires: -1,path: '/',domain:"members.beyond-experience.com" });
																		Cookies.remove('pass',  { expires: -1,path: '/',domain:"members.beyond-experience.com" });
																		Cookies.remove('showcheckbox',  { expires: -1,path: '/',domain:"members.beyond-experience.com" });								
																		// window.location="https://www.beyond-experience.com";
																		window.parent.close();
																}	
															}
													
													});	
										}
										
										
										/*
										// valido que el formulario de logeo no se mande a llamar desde otra pagina https
										if(location.search!="")
										{
												var variables= getVarsUrl();
												
												if(variables.login=="on" )
												{
													$.ajax({
														url:"../../_assets/_controllers/urlLoginAnterior.php",
														data:{
																op:0,
																url:""
															 },
														success: function(data){
																if(data!=="")
																{
																	window.location=data;
																}	
														}
																					
													});	
												}
										}*/
										
										
								}
						});
					
					
					
					
				},
				helpers:{
							overlay:{
										css:{ "background":"rgba(0,84,100,0.9)" },
										closeClick: false
									},
							
						}
						
				///validar si el usuario tiene 
				
		});
		
		
	
	//	console.log($("body").height());
		
		var alto = $("body").height();
		
		
		$("body").on("loge",function(event, param1, param2, param3){
			
			if(param1=="ok")
			{
				//console.log(param2);
				//console.log(param3);
				$("#contenidoV").html(param2);
				$("#menuPrincipal").html(param3);
				$("body").trigger("validaCheckRW");
				// console.log("se dispara antes de cerrar");
				
				$('.fancybox-wrap').stop(true);
				$("html").removeClass("fancybox-lock");
				$('.fancybox-item, .fancybox-nav').remove();

				$('.fancybox-overlay').remove();
				$('.fancybox-wrap').remove();
				//$('.fancybox-margin').removeClass(".fancybox-margin");
				
				$(document).find(".fancybox-margin").removeClass("fancybox-margin");
				
				// console.log("ya lo cerrro");
				// console.log(" ---- "+$("body").height());
										
				//$("body").css("height",alto+"px");
				
				//$("body").css("overflow","auto");
				
				// console.log(" ---- "+$("body").height());
				parent.$("body").trigger("actualizaReg",["ok"]);
				
			}
				
		});
		
		
		/*
		
		// verifico si endonde estan dando click es una pagina con https 
		// quiere decir que lo redirijo al index y guanrdo la url desde donde se le dio click
		
		fancy.click(function(){
			if(location.protocol=="https:")
			{
				$.ajax({
						url:"../../_assets/_controllers/urlLoginAnterior.php",
						data:{
								op:1,
								url:window.location.href
							 },
						success: function(data){
								if(data==="")
								{
										console.log("aqui pàssss ");
										$.fancybox.close(true);
										window.location="https://members.beyond-experience.com/index.php?login=on"
								}	
						}
													
				});	
													
				
			}
			
			//else
			//{
			//	console.log("aqui pàssss2 ");
										$.fancybox.close(true);
			//}
		});
		
		
		// checo si existe la variable login en la url
		// quiere decir que estoy redirigiendo desde una pagina con https y disparo el fancybox para el formulario de login
		if(location.search!="")
		{
				var variables= getVarsUrl();
				
				if(variables.login=="on" )
				{fancy.trigger('click');}
		}*/
	
		
		
		// evento que dispara el buscador de los tranfers de tralvenet para checar los checkbox de rewards
		//$("body").on("validaCheckRW",function(event){
		$(document).on("validaCheckRW",function(event){ 	
			
			if($("#modulovalidacion").val()=="hoteles")
			{var nameInput='TN-AplicaReward';}
			
			if($("#modulovalidacion").val()=="tours")
			{var nameInput='tourAplicaReward'}
			
			if($("#modulovalidacion").val()=="transfers")
			{var nameInput='transferAplicaReward'}
			
			if($("#modulovalidacion").val()=="transfersmys")
			{var nameInput='transferMysAplicaReward'}
			
			if($("#modulovalidacion").val()=="toursmys")
			{var nameInput='tourMysAplicaReward'}
			
			if($("#modulovalidacion").val()=="semanas")
			{var nameInput='semanasAplicaReward'}
			
			if($("#modulovalidacion").val()=="fichas")
			{var nameInput='fichaAplicaReward'}
			
			if ($("#modulovalidacion").val()=="cars")
			{var nameInput='TC-applyrwcar'}	
				
				//console.log(nameInput);
				//console.log("protocol"+location.protocol);
				
				/*if(location.protocol=="https:")
				{
					
					var show=localStorage.getItem("showcheckbox");
				}
				else
				{
					
					
					var show=localStorage.getItem("showcheckboxHTTPS");
				}*/
				
					//console.log( " >>>>>>>> "+Cookies.get('showcheckbox') + ' >>>>>> '+ $("#valorRW").val() );
				///console.log( "fgds f  g- -- -if(("+Cookies.get('showcheckbox')+"==1) && (( "+$("#valorRW").prop("value")+">0)))");

				if( ($("#valorRW").val()>0)) //OROGIAL
				//if( (localStorage.getItem("showcheckbox")==1) && ( $("#valorRW").val()>0) )
				//if( (show==1) && ( $("#valorRW").val()>0) )
				{

					var saldo=0;
					//muestro todos los checkbox para aplicar los rewards
					$( "body" ).find( ".show" ).css( "display", "block" );
					
					
					// saco el saldo, restando el saldo que tiene con el saldo temporal que lleva hasta el momento en el carrito
					$.post(pathname + '/_assets/_controllers/saldoRW.php',{}, function(data){
						saldo = data;
						//alert("DATA antes=" + data);
						
						// recorro todo los checkbox del div contenedor y comparo si el valor del reward esta dentro del saldo actual
						// valor que no cumpla ese valor lo desabilito
						if(saldo>0){
							// console.log("hay saldo de "+saldo);
							$( "body" ).find( ".show" ).css( "display", "block" );
							
						}
						else{
							
							// console.log("hay saldo de "+saldo);
							//$( "body" ).find( ".show" ).css( "display", "none" );
							$( "body" ).find($(".show > input")).attr( "disabled", true );
							//$( "body" ).find($(".show > div > span > input")).attr( "disabled", true );
							//$( "body" ).find( ".show" ).attr( "checked", false );
						}
						$('.tarifas input[type^="checkbox"][name^="checkRW"]').each(function() {
							
							$(this).parent().parent().parent().find( "input[name^='"+nameInput+"']" ).attr( "value", 0 );
							
							// console.log($(this).val() +">"+ data)
							
							if( parseInt($(this).val())>parseInt(data) )
							{ 
								$(this).attr("disabled",true);
								$(this).attr("checked",false);
								$.uniform.update(this);
								// console.log("valo ocultado"+$(this).val()); 
							}
							else
							{
								$(this).attr("disabled",false);
								$(this).attr("checked",false);
								$.uniform.update(this);
							}
						});
						
						
					});
					
				}//if showcheckbox
				
				else
				{$( "body" ).find( ".show" ).css( "display", "none" );}

			//console.log("prprprp "+fancy);
			//fancy.close(true);
			//console.log("Cierrea ");
			
			//console.log("debecerrar");
			
		});
		


	$("body").on("actualizaReg",function(event, param1){
		// console.log("se actualiza-ahora - "+param1);
		if(param1=="ok")
			{
				
				window.location="perfil.php";
				
			}
	});
	

	$("#divisa").on("change",function() {
    	var valor=$(this).val();
        // console.log(valor);
        if (valor != "USD" && valor != "MXN" && valor != "CAD" && valor != "EUR" && valor != "BRL" && valor != "COP") {
            valor = "USD";
        }
		$.ajax({
			url: pathname + "/_assets/_controllers/divisa.php",
			data:{ divisa: valor },
			success: function(data) {
				if(data=="ok") {
					// alert("Rates in other currencies are approximate and for informative purposes. The final credit card will be charged in US Dollars (USD) and the exchange rate will be established by the different banking institutions at the moment of payment.");
					// location.reload(); 
                    var contentPop = '<link href="' + pathname + '/_assets/_css/popupInventarioRegina.css?x=' + (Math.floor(Math.random() * 100)) +'" type="text/css" rel="stylesheet">'+
                                    '<div id="InventarioRegina" class="modal chrono-modal">'+
                                        '<div class="headerImagen">'+
                                            '<img src="' + pathname + '/_assets/_images/template/logo-1000.png"/>'+
                                        '</div>'+	
                                        '<div class="fondopopup">'+
                                            '<!--<span class="titulopop">Dear member,</span>-->'+
                                            '<span class="parrafopop" style="width:100%">Rates in other currencies are approximate and for informative purposes. The final credit card will be charged in US Dollars. The exchange rate will be established by the different banking institutions at the moment of payment.</span>'+
                                        '</div>'+
                                    '</div>';
                                  
                                    $.fancybox.open(contentPop,{
                                        type : 'html',				
                                    });	                
			
					setTimeout("document.location.reload()", 7000);	
				} else {

                    var contentPop = '<link href="' + pathname + '/_assets/_css/popupInventarioRegina.css?x=' + (Math.floor(Math.random() * 100)) +'" type="text/css" rel="stylesheet">'+
                    '<div id="InventarioRegina" class="modal chrono-modal">'+
                        '<div class="headerImagen">'+
                            '<img src="' + pathname + '/_assets/_images/template/logo-1000.png"/>'+
                        '</div>'+	
                        '<div class="fondopopup">'+
                            '<!--<span class="titulopop">Dear member,</span>-->'+
                            '<span class="parrafopop" style="width:100%">There was a problem at the time of the exchange, try again or reload your page.</span>'+
                        '</div>'+
                    '</div>';
                  
                    $.fancybox.open(contentPop,{
                        type : 'html',				
                    });	 
				}
			}
		});
  	});

	//	[	Proceso para pintar de color la Seccion Actual, modifiquenlo para que funcione mejor	| 	17082016	]
   	$("#menuCL ul li a").each(function()
    {
        if(window.location==$(this).attr("href"))
        { $(this).addClass("activ0"); }
    });

	//	[	Codigo para mostrar mas informacion de acuerdo al RESCODE | 17082016]
	$(document).on("click",".rescode",function()
	{
		var x=$(this).attr("rel");
		if(x!=0)
		{
			$.ajax(
			{	
				url:"../../_assets/_controllers/rescode.php",
				data:{ rescode: x },
				success: function(data)
				{
					// console.log(data);
					if(data=="ok")
					{}
				}
			});

			swal({
				  title: "Detalles del Rescode : <strong>"+x,
				  text: 'Clientes <span style="color:tomato;"> Marcos Hernandez </span>',
				  // type: "success",
				  confirmButtonText: "Cool",
				  customClass: 'twitter'
				});
		}
	});


});

function getVarsUrl(){
    var url= location.search.replace("?", "");
    var arrUrl = url.split("&");
    var urlObj={};   
    for(var i=0; i<arrUrl.length; i++){
        var x= arrUrl[i].split("=");
        urlObj[x[0]]=x[1]
    }
    return urlObj;
};



// $(document).ready(function(e){
// 	var altura = $('#cajaReserva').offset().top;
// 	$(window).on('scroll', function(){
// 		if ( $(window).scrollTop() > altura+400){
// 			$('#cajaReserva').addClass('menu-fixed');
// 		} else {
// 			$('#cajaReserva').removeClass('menu-fixed');
// 		}
// 	});
// });

	$(document).on("click","#priceprice",function()
	{
        $.fancybox(
                '<img class="" src="https://members.beyond-experience.com/_assets/_images/tools/price.jpg"/>',
                {
                    'autoDimensions': false,
                    'width': 350,
                    'height': 'auto',
                    'transitionIn': 'none',
                    'transitionOut': 'none'
                }
        )});

    