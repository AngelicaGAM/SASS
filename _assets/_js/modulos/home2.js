// JavaScript Document

$(document).ready(function(e) {
	
	
	

	$('.sliderContent').revolution(
				{
					delay:5000,
					startwidth:1920,
					startheight:653,
					hideThumbs:10,
					fullWidth:"on",
					
					navigationType :"none",
					touchenabled:"on",
					onHoverStop:"off"
				});
	 $('.sliderContent2').revolution(
				{
					delay:7000,
					startwidth:1002,
					startheight:150,
					hideThumbs:10,
					navigationType:"none",
				
					touchenabled:"on",
					onHoverStop:"off",
					navigationType :"none",
					
				});
	$(".servExt, .servMid").on({
		mouseenter:function(e){
			e.preventDefault();
			
			//var img = $(this).find("img").prop("src");
			var img = new Array("_assets/_images/homeInterno/directory-2.png","_assets/_images/homeInterno/wordExchange-2.png","_assets/_images/homeInterno/beyondWeeks-2.png","_assets/_images/homeInterno/cucketList-2.png","_assets/_images/homeInterno/cruses-2.png","_assets/_images/homeInterno/beyondServices-2.png");
			
			var id=$(this).prop("id");
			
			switch(id)
			{
				case "directory":{ $(this).find("img").prop("src",img[0]); } break;
				case "wordExchange":{ $(this).find("img").prop("src",img[1]); } break;
				case "beyondWeeks":{ $(this).find("img").prop("src",img[2]); } break;
				case "bucketList":{ $(this).find("img").prop("src",img[3]); } break;
				case "cruses":{ $(this).find("img").prop("src",img[4]); } break;
				case "beyondServices":{ $(this).find("img").prop("src",img[5]); } break;
					
			}
			
			
			
			
				
		},
		mouseleave:function(e){
			e.preventDefault();
			
			var img = $(this).find("img").prop("src");
			var img = new Array("_assets/_images/homeInterno/directory.png","_assets/_images/homeInterno/wordExchange.png","_assets/_images/homeInterno/beyondWeeks.png","_assets/_images/homeInterno/cucketList.png","_assets/_images/homeInterno/cruses.png","_assets/_images/homeInterno/beyondServices.png");
			
			var id=$(this).prop("id");
			
			switch(id)
			{
				case "directory":{ $(this).find("img").prop("src",img[0]); } break;
				case "wordExchange":{ $(this).find("img").prop("src",img[1]); } break;
				case "beyondWeeks":{ $(this).find("img").prop("src",img[2]); } break;
				case "bucketList":{ $(this).find("img").prop("src",img[3]); } break;
				case "cruses":{ $(this).find("img").prop("src",img[4]); } break;
				case "beyondServices":{ $(this).find("img").prop("src",img[5]); } break;
					
			}
		}
	
	});


});