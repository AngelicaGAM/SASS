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
	

		/* calendario de reserva */
		
		var calFecha= new Date();	
		var hoy = new Date(calFecha.getFullYear(),calFecha.getMonth(),calFecha.getDate());
		var hoy2 = new Date(calFecha.getFullYear(),calFecha.getMonth(),calFecha.getDate()+1);
		
		$("#checkin").datepicker({minDate:hoy,dateFormat:"d/M/yy",altField:"#fecha"});
		$( "#checkin" ).prop("value",$.datepicker.formatDate('d/M/yy', new Date()) );
		
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
						
						url:"_assets/_controllers/getDestinosBWeeks.php",
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
		
		
		
		
		$("#search").click(
			function(){
				
				alert($("#claveD").val());
				
				if($("#destino").val()=="" || /^\s+$/.test($("#destino").val()))
				{
				
					alert("Debe seleccionar un destino");
					ban=false;
				}
				
				
				if( ban )
				{
					
					
					$("#reservasTours").submit() ;
						
				}
		});
});