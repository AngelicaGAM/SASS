// JavaScript Document


$(document).ready(function(e) {

	 $("#loading").hide();
	 var calFecha= new Date();	
	 var hoy = new Date(calFecha.getFullYear(),calFecha.getMonth(),calFecha.getDate());
	 var hoy2 = new Date(calFecha.getFullYear(),calFecha.getMonth(),calFecha.getDate()+1);
		
	 $(document).on('change', "#ninos", function () {
			
			
			var solicitado=$(this).val();
			
			var totalMostrado=$("#edades li").length;
			
			
			if(solicitado==0)
			{
				for(i=0; i<totalMostrado; i++)
				{		
					$("#edades li:last").remove();
					//$("#habitacion_"+id[1]).css("display","none");
				}
				//$("#habitacion_"+id[1]).css("display","none");
			}
			
			else
			{
				//$("#edades").css("display","block");
				if(totalMostrado<solicitado)
				{
					//saco la diferencia y muestro los que tengo que mostrar
					var m = solicitado-totalMostrado;
							//	for(var i=0; i<m; i++)
								//{
									//var ha=totalMostrado+(i+1);
					$.ajax({
						url:"_assets/_controllers/masEdades.php",
						dataType:"html",
						type:"POST",
						data:{
								cantidadN:m,
								hab:1,
								m:totalMostrado
							}	
						}).done(function(data){
								$("#edades").append(data);
							});
								///}
							
				}
				
				else
				{
					// elimino 	
					var m=totalMostrado-solicitado;
					//alert(m);
					for(var i=0; i<m; i++)
					{
										//alert("dsaf "+i);
						$("#edades li:last").remove();
					}
				}
			}
			
			
			
			
		});
	 
	
	 $('.sliderContent').revolution(
				{
					delay:5000,
					startwidth:1920,
					startheight:251,
					hideThumbs:10,
					fullWidth:"on",
					forceFullWidth:"on",
					
					touchenabled:"on",
					onHoverStop:"off"
				});	
	
		
		$('.sliderContent2').revolution(
				{
					delay:5000,
					startwidth:640,
					startheight:230,
					hideThumbs:10,
					fullWidth:"on",
					navigationType :"bullet",
					navigationHAlign:"right",
					navigationVAlign:"bottom",
					navigationStyle:"round",
					navigationHOffset:1,
					navigationVOffset:-15,
					touchenabled:"on",
					onHoverStop:"off"
				});
				
		/// get idioma
		var idioma="";
		$.ajax({
				 url:"../_assets/_controllers/getLang.php",
				 data:{ page: "tours"},
				 type:"POST",
				 dataType:"json",
				 async:false,
				 success: function(data){
				
						idioma =eval(data);
						//return idi;
				 }
			});
		
		
		
		
		
				
		
			
		/* calendario de reserva */
		
		
		
		//$("#checkin").datepicker({minDate:hoy,dateFormat:"d/M/yy",altField:"#fecha"});
		//$( "#checkin" ).prop("value",$.datepicker.formatDate('d/M/yy', new Date()) );
		
		
		
		$("#search").click(
			function(){
				
				//alert($("#claveD").val());
				
				$("#frameContent").hide();
				$("#loading").show();
				var ban=true;
				
				if($("#destino").val()=="" || /^\s+$/.test($("#destino").val()) || $("#rowID").val()=="")
				{
				
					alert(idioma.buscador.valida1);
					ban=false;
				}
				if($("#startDate").val()=="" && ban)
				{
					alert(idioma.buscador.valida2);
					ban=false;
				}
				if($("#endDate").val()==""  && ban)
				{
					alert(idioma.buscador.valida3);
					ban=false;
						
				}
				if($("#adultos").val()==0 && ban)
				{
					alert(idioma.buscador.valida4);
					ban=false;
				}
				
				if( ban )
				{
					
					
					var last=$("#reservas").serialize();
					$("#listado").hide();
					$("#frameGo").hide();
					$("#toursGG").hide();
					//$("#tabHeader").hide();
					$("#frame").show();
					$(document).scrollTop( $("#loading").offset().top-100 );  
					
					/*var ua = navigator.userAgent.toLowerCase(); 
					if(ua.indexOf('safari') > -1 && ua.indexOf('chrome')==-1 && ua.indexOf('crios')==-1 ) { 
						
						
						var  dent3=window.open("carga.html","Carga2","directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no, width=1, height=1, top=2000");  	
						 var dent=window.open("https://www.travelnet.com.mx/boxtravelnet/","ventana","directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no, width=1, height=1, top=2000"); 
						var  dent2=window.open("carga.html","Carga","directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no, width=1, height=1, top=2000");  	
						 
						  	
					  }  */
					  
					  
					var  mes = calFecha.getMonth()+1;
					var dia = calFecha.getDate();
					if(mes>=1 && mes <=9)
					{ mes ="0"+mes;}
					if(dia>=1 && dia<=9)
					{ dia="0"+dia; }
					
					var hoyCompara = dia+"-"+mes+"-"+calFecha.getFullYear();
					
					
					
				
					if(hoyCompara ==$("#startDate").val())
					{	
						$("#alert").show();
						$("#frame").hide();
						$(document).scrollTop( $("#alert").offset().top -200);
					
						
					}
					else
					{
						
						$("#frame").show();
						$("#alert").hide();	
						$(document).scrollTop( $("#loading").offset().top-100 ); 	
					}
					  
					  
					$("#frameContent").prop("src","https://www.travelnet.com.mx/Boxtravelnet/atracciones?"+last).iframeHeight({ debugMode : true });
					
					$("#frameContent").load(function(){
						$("#loading").hide();
						$(this).css("display","block");		
						/*if (ua.indexOf('safari') > -1 && ua.indexOf('chrome')==-1 && ua.indexOf('crios')==-1 ) { 	
								dent.close();
							 }	
						
						if (ua.indexOf('safari') > -1 && ua.indexOf('chrome')==-1 && ua.indexOf('crios')==-1 ) { 	
								dent2.close();
							 }				
				
						if (ua.indexOf('safari') > -1 && ua.indexOf('chrome')==-1 && ua.indexOf('crios')==-1 ) { 	
								dent3.close();
							 }	*/
				
					});				
						
				}
		});
		
		
	/*	
	/////////////////////////////////////////////////////////////////////////////////
	// clic en el boton de book del tour
	$(document).on("click","#book",function(){
				dato = $(this).data("value");
				var auxx=dato.split(",.-");
				window.location = '../tours/tarifas.php?code='+auxx[1];
				$.ajax({
						url:"../_assets/_controllers/urlAnterior.php",
						type:"POST",
						//dataType:"html",
						data:{ url :window.location.href }
						}).done(
						function(data){ 
							window.location = '../tours/tarifas.php?code='+auxx[1];
				});
				
	});	
	
	
	/////////////////////////////////////////////////////////////////////////////////
	// clic en el boton de leer mas
	$(document).on("click",".leer",function(){
				
				var busco="#"+$(this).parent().parent().parent().prop("id");
				dato=$(busco).find("input").data("value");
				var auxx=dato.split(",.-");
				
				$.ajax({
						url:"../_assets/_controllers/urlAnterior.php",
						type:"POST",
						//dataType:"html",
						data:{ url :window.location.href }
						}).done(
						function(data){ 
							window.location = '../tours/informacion.php?code='+auxx[1];
				});
	});		
		
	
	/////////////////////////////////////////////////////////////////////////////////
	// clic en el boton del titulo del tour mas
	$(document).on("click",".titulo",function(){
				
				var busco="#"+$(this).parent().prop("id");
				dato=$(busco).find("input").data("value");
				var auxx=dato.split(",.-");
				
				$.ajax({
						url:"../_assets/_controllers/urlAnterior.php",
						type:"POST",
						//dataType:"html",
						data:{ url :window.location.href }
						}).done(
						function(data){ 
							window.location = '../tours/informacion.php?code='+auxx[1];
				});
	});
	
	
	/////////////////////////////////////////////////////////////////////////////////
	// clic en la imagen de la galeria
	$(document).on("click",".imagenTour",function(){
				
				alert( $(this).prop("id") )
				
				var busco=$(this).prop("id") ;
				
				
				$.ajax({
						url:"../_assets/_controllers/urlAnterior.php",
						type:"POST",
						//dataType:"html",
						data:{ url :window.location.href }
						}).done(
						function(data){ 
							window.location = '../tours/galeria.php?code='+busco;
				});
	});*/
		
		
		
		
		var normalize = (function() {
			  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
				  to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
				  mapping = {};
			 
			  for(var i = 0, j = from.length; i < j; i++ )
				  mapping[ from.charAt( i ) ] = to.charAt( i );
			 
			  return function( str ) {
				  var ret = [];
				  for( var i = 0, j = str.length; i < j; i++ ) {
					  var c = str.charAt( i );
					  if( mapping.hasOwnProperty( str.charAt( i ) ) )
						  ret.push( mapping[ c ] );
					  else
						  ret.push( c );
				  }
				  //return ret.join( '' );
				  return ret.join( '' ).replace( /[^-A-Za-z0-9]+/g, '-' ).toLowerCase();
			  }
			 
			})();
		

});