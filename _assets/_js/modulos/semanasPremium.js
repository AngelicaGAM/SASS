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
		
		
		/// get idioma
		var idioma="";
		$.ajax({
				 url:"_assets/_controllers/getLang.php",
				 data:{ page: "beyondWeeks"},
				 type:"POST",
				 dataType:"json",
				 async:false,
				 success: function(data){
				
						idioma =eval(data);
						//return idi;
				 }
			});
			
			
		$(".head").on({
						 
						 mouseenter:function(e){
						 	e.preventDefault();
							
							$(this).find(".flecha .icon").removeClass("icon-chevron-down").addClass("icon-chevron-up");
							
						 },
						 mouseleave:function(e){
							e.preventDefault();
							var padre = $(this).parent();
							//alert(padre.find(".destinos").css("display"));
							if(padre.find(".destinos").css("display")=="none")
							{
								
								$(this).find(".flecha .icon").removeClass("icon-chevron-up").addClass("icon-chevron-down");
							}
						},
						/*click:function(e){
							e.preventDefault();
							/*$(".destinos").slideUp();
							$(".acordeon").removeClass("backAc");  
							$(".flecha").removeClass("backFlecha"); 
							$(".flecha .icon").removeClass("icon-chevron-up").addClass("icon-chevron-down");
							
							padre = $(this).parent();
							display= padre.find(".destinos").css("display");
							if(display=="none"){  
								padre.find(".destinos").slideDown(); 
								padre.addClass("backAc");  
								$(this).find(".flecha").addClass("backFlecha"); 
								$(this).find(".flecha .icon").removeClass("icon-chevron-down").addClass("icon-chevron-up");
							}
							if(display=="block"){ 
								padre.find(".destinos").slideUp();  
								padre.removeClass("backAc");  
								$(this).find(".flecha").removeClass("backFlecha"); 
								$(this).find(".flecha .icon").removeClass("icon-chevron-up").addClass("icon-chevron-down");
							}
						}*/
					});
			
			
			
			
			
			
			
			
			
});