// JavaScript Document
$(document).ready(function(){
    $('.slider').bxSlider({
		pager:false,
		auto:true,
		mode:"fade",
		speed: 500,
		pause: 3000
	});
  });

$(document).ready(function(e) { 
	$('.sliderContent').revolution(
				{
					delay:5000,
					startwidth:1900,
					startheight:563,
					hideThumbs:10,
					fullWidth:"on",
					forceFullWidth:"on",
					navigationType :"none",
					touchenabled:"on",
					onHoverStop:"off"
				});

	$("#Aviso").fancybox().trigger('click');
	$("#renovacion").fancybox().trigger('click');
	/* Se ejecuta pop-up de promociones*/
	var popPromoActivo = 0;
    var mostroPromoHome = localStorage.getItem("promoHome");
	if (mostroPromoHome == 0 && popPromoActivo == 1) {
		$.fancybox.open({
			type: 'iframe',
			href: '_assets/_popup/promo.php',
			autoDimensions: false,
			autoResize: true,
			autoCenter: true,
			width: 690,
			height: 700,
			transitionIn: 'none',
			transitionOut: 'none',
			closeBtn: false,
			helpers   : { 
				overlay : { closeClick: false } 
			},
			keys : {
				close : null // default value = [27]
			}
		});
		localStorage.setItem("promoHome", 1);
	}
});