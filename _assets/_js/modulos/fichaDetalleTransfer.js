// JavaScript Document
$(document).ready(function(e) {
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
				
				
				$.widget( "custom.catcomplete", $.ui.autocomplete,
	   {
			_renderMenu: function( ul, items )
				   {
						var that = this,
							currentCategory = "";
						$.each( items, function( index, item )
						 {
							if ( item.categoria != currentCategory ) 
							{
								ul.append( "<li class='ui-autocomplete-category'>" + item.categoria + "</li>" );
								currentCategory = item.categoria;
							}
							that._renderItemData( ul, item );
						});
					}
		});
		
		
	$( "#destino" ).catcomplete({
			
			 delay: 0,
			
			source: function(request,response)
			{
				//var termino=request.term;
				var accentMap = {
					"á": "a",
					"é": "e",
					"í": "i",
					"ó": "o",
					"ú": "u",
					"ñ": "n"
					
				};
				
				var normalize = function()
				 {
					var ret = "";
						for ( var i = 0; i < request.term.length; i++ ) {
						ret += accentMap[ request.term.charAt(i) ] || request.term.charAt(i);
						}
					return ret;
				}
				
				$.ajax({
						
						url:"_assets/_controllers/getDestinosCrucero.php",
						dataType:"json",
						type:"POST",
						data:{term:normalize	},
				
				/*--------------------------------------------------*/
				success:function(data)
				{
					
						// limpio la variable opcion para obligar a la seleccion de la lista
						
						opcion="";
						
						response($.map(data,function(item)
						{
						
								return {
										
										label:item.label,
										id:item.id,
										categoria:item.categoria,
										
									 }
							
						}));
						
					
				}
				
			  })
				
			},
		
			select: function( event, ui )
			 {
				 
				 //alert("ya");
					opcion=""; 
					opcion=ui.item.id;
					$("#claveD").prop("value",ui.item.id);
								
			 },
			 
			 search: function(){$(this).addClass('ui-autocomplete-loading');}
			 
		
		});
		
		
	/* calendario de reserva */
		var calFecha= new Date();	
		var hoy = new Date(calFecha.getFullYear(),calFecha.getMonth(),calFecha.getDate());
		$("#fecha").datepicker({minDate:hoy,dateFormat:"d/mm/yy",altField:"#checkin"});
		$( "#fecha" ).prop("value",$.datepicker.formatDate('d/mm/yy', new Date()) )
		
		
		$("#search").click(
			function(){
				
				var ban=true;
				
				
				if($("#destino").val()=="" || /^\s+$/.test($("#destino").val()) )
				{
					
					alert("Seleccione un puerto de salida");
					ban=false;
				}
				
				/*if($("#duracion").val()==0 )
				{
					
					alert("Seleccione la duracion del crucero");
					ban=false;
				}*/
				
				if(ban)
				{
						var habitaciones=[];
						var edad=[];
						
						for(var a=1; a<=$("#rooms").val(); a++)
						{
							
							if($("#nino_"+a).val()==0)
							{habitaciones.push({ habitacion:a,adulto:$("#adultos_"+a).val(),nino:$("#nino_"+a).val(),edad:0 });}
							else
							{
								habitaciones.push({ habitacion:a,adulto:$("#adultos_"+a).val(),nino:$("#nino_"+a).val() });
								
								for(var b=1; b<=$("#nino_"+a).val(); b++)
								{
									
									habitaciones.push({ habitacion:a,adulto:$("#adultos_"+a).val(),nino:$("#nino_"+a).val(),edad:$("#edadNH_"+aux+"_"+b).val() });
								}
							}
							
							
						}
						
						
						$.ajax({
						url:"_assets/_controllers/getListaCrucero.php",
						dataType:"html",
						type:"POST",
						data:{
								
								destino:$("#claveD").val(),
								fecha:$("#fecha").val(),
								duracion:$("#duracion").val(),
								cuartos:$("#rooms").val(),
								habitaciones:habitaciones,
								
								
								
							
							}	
						}).done(function(data){
								
								$("#listado").empty();
								$("#listado").html(data);
								//document.getElementById('listado').scrollIntoView();
								var target = $("#listado");
								if (target.length)
								{
									var top = target.offset().top;
									$('html,body').animate({scrollTop: top}, 900);
									
								}
								
							
							});
				}
		});

		
		
		
		// funcionamiento para cargar los campos de edad de los niños
		
		//$(".cubiertoNino").change(function(){
			
			$(document).on('change', ".cubiertoNino", function () {
			
			var id=$(this).prop("id").split("_");
			var solicitado=$(this).val();
			
			var totalMostrado=$("#habitacion_"+id[1]+" ul li").length - 2;
			
			
			if(solicitado==0)
			{
				for(i=0; i<totalMostrado; i++)
				{		
					$("#habitacion_"+id[1]+" li:last").remove();
					//$("#habitacion_"+id[1]).css("display","none");
				}
			}
			
			else
			{
				$("#habitacion_"+id[1]).css("display","block");
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
								hab:id[1],
								m:totalMostrado
							}	
						}).done(function(data){
								$("#habitacion_"+id[1]+" ul").append(data);
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
						$("#habitacion_"+id[1]+" li:last").remove();
					}
				}
			}
			
			
			
			
		});
		
		
		
		
		//funcionamiento para mostrar los campos de las habitaciones
		$("#rooms").on("change",function(){
			var cuartos =$(this).val();
			
			if(cuartos>0)
			{
				$.post("../../_assets/_controllers/masHabitacionesCrucero.php",{ solicitado:cuartos}, function(data){
					$("#habitaciones").html(data);		
					
					
				});	
				$("#totalHab").val(cuartos);	
			}
			else
			{
				$("#habitaciones").html("");		
			}
			
			
			/*
			var totalUl =$("li.referencia").length;
			var anterior=$("#totalHab").val();
			var actual=$(this).val();
			
			
			if( actual < anterior)
			{
				var resta=anterior-actual;
				
				for(var a=0; a<resta; a++)
				{$("#masHabi  li.referencia:last").remove();}
				$("#totalHab").prop("value",$("li.referencia").length);
			}
			else
			{
			
				if(totalUl<3)
				{
					var respuesta = $.post("../../_assets/_controllers/masHabitacionesCrucero.php",
					{solicitado:actual,mostrados:totalUl});
						
					respuesta.done(function(data){
						$("#masHabi").append(data);
						$("#totalHab").prop("value",$("li.referencia").length);
					});
				}
			}
			
			*/
			
			
		});
});