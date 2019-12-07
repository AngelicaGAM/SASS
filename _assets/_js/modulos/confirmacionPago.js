// JavaScript Document

// template functions

$(document).ready(

	function(){
	$(".cantidadcarro2").html("0");
	
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
				 data:{ page: "hotels"},
				 type:"POST",
				 dataType:"json",
				 async:false,
				 success: function(data){
				
						idioma =eval(data);
						//return idi;
				 }
			});
		//$("#InventarioRegina").fancybox().trigger('click');
		

		if(document.getElementById("in")){
  // hacer algo aquí si el elemento existe

    if(localStorage.getItem("sesionagencia")!="NONBREG"){

		$.fancybox(
			'<link href="' + pathname + '/_assets/_css/popupInventarioRegina.css?x=' + (Math.floor(Math.random() * 100)) +'" type="text/css" rel="stylesheet">'+
			'<div id="InventarioRegina" class="modal chrono-modal">'+
				'<div class="headerImagen">'+
					'<img src="' + pathname + '/_assets/_images/template/logo-1000.png"/>'+
				'</div>'+	
				'<div class="fondopopup">'+
					'<span class="titulopop">Success!</span>'+
					'<span class="parrafopop">Your reservation has been processed correctly. In the following 24 business hours you will receive your Confirmation Number and entry Voucher containing all the details of your purchase.</span>'+
					'<div class="iblockpop w70">'+
						'<img class="telefonopop" src="https://members.beyond-experience.com/_assets/_images/popupInventarioRegina/ico-telefono.png"/>'+
						'<span class="numerospop">USA, CAN: 1-888-963-7689<br>Mexico: 1-800-272-0294</span>'+
					'</div>'+
				'</div>'+
			'</div>', 
			//'<div id="InventarioRegina" class="modal"><div class="fullin colorlogo"><img class="logopopregina" src="https://members.beyond-experience.com/_assets/_images/template/logo-1000.png"/></div><img class="fullin tira" src="https://members.beyond-experience.com/_assets/_images/popupInventarioRegina/cintillo.jpg"/><div class="fondopopup"><span class="titulopop">Success!</span><span class="parrafopop">Your reservation has been processed correctly. In the following 24 business hours you will receive your Confirmation Number and entry Voucher containing all the details of your purchase.</span><div class="centerpop"><div class="iblockpop w70"><img class="telefonopop" src="https://members.beyond-experience.com/_assets/_images/popupInventarioRegina/ico-telefono.png"/><span class="numerospop">	USA, CAN: 1-888-963-7689<br>Mexico: 1-800-272-0294</span></div></div></div></div>',
			{
				'autoDimensions'	: false,
				'width'         		: 350,
				'height'        		: 'auto',
				'transitionIn'		: 'none',
				'transitionOut'		: 'none'
			}
		).trigger('#in');
	}else{
		$.fancybox(
			'<link href="' + pathname + '/_assets/_css/popupInventarioRegina.css?x=' + (Math.floor(Math.random() * 100)) +'" type="text/css" rel="stylesheet">'+
			'<div id="InventarioRegina" class="modal chrono-modal">'+
				'<div class="headerImagen">'+
					'<img src="' + pathname + '/_assets/_images/template/logo-1000.png"/>'+
				'</div>'+	
				'<div class="fondopopup">'+
					'<span class="titulopop">Success!</span>'+
					'<span class="parrafopop">Your reservation has been processed correctly. In the following 24 business hours you will receive your Confirmation Number and entry Voucher containing all the details of your purchase.</span>'+
					'<div class="iblockpop w70">'+
						'<img class="telefonopop" src="https://members.beyond-experience.com/_assets/_images/popupInventarioRegina/ico-telefono.png"/>'+
						'<span class="numerospop"></span>'+
					'</div>'+
				'</div>'+
			'</div>', 
			//'<div id="InventarioRegina" class="modal"><div class="fullin colorlogo"><img class="logopopregina" src="https://members.beyond-experience.com/_assets/_images/template/logo-1000.png"/></div><img class="fullin tira" src="https://members.beyond-experience.com/_assets/_images/popupInventarioRegina/cintillo.jpg"/><div class="fondopopup"><span class="titulopop">¡Success!</span><span class="parrafopop">Your reservation has been processed correctly. In the following 24 business hours you will receive your Confirmation Number and entry Voucher containing all the details of your purchase.</span><div class="centerpop"><div class="iblockpop w70"><img class="telefonopop" src="https://members.beyond-experience.com/_assets/_images/popupInventarioRegina/ico-telefono.png"/><span class="numerospop">	</span></div></div></div></div>',
			{
				'autoDimensions'	: false,
				'width'         		: 350,
				'height'        		: 'auto',
				'transitionIn'		: 'none',
				'transitionOut'		: 'none'
			}
		).trigger('#in');
	}
	
	
	}else{
		console.log("no existe");
	}
	if (document.getElementById("chronoIn")) {
        // hacer algo aquí si el elemento existe
        if(localStorage.getItem("sesionagencia")!="NONBREG"){
            $.fancybox(
				'<link href="' + pathname + '/_assets/_css/popupInventarioRegina.css?x=' + (Math.floor(Math.random() * 100)) +'" type="text/css" rel="stylesheet">'+
				'<div id="InventarioRegina" class="modal chrono-modal">'+
					'<div class="headerImagen">'+
						'<img src="' + pathname + '/_assets/_images/template/logo-1000.png"/>'+
					'</div>'+	
					'<div class="fondopopup">'+
						'<span class="titulopop">Congratulations!</span>'+
						'<span class="parrafopop">Your reservation has been confirmed. Shortly, your Personal Concierge will contact you with more details.<br /><br />Thank you for your preference.</span>'+
						'<div class="iblockpop w70">'+
							'<img class="telefonopop" src="https://members.beyond-experience.com/_assets/_images/popupInventarioRegina/ico-telefono.png"/>'+
							'<span class="numerospop"><strong>USA, CAN: 1-888-963-7689<br>Mexico: 1-800-272-0294</strong></span>'+
						'</div>'+
					'</div>'+
				'</div>', 
                //'<div id="InventarioRegina" class="modal chrono-modal"><div class="fullin colorlogo"><img class="logopopregina" src="https://members.beyond-experience.com/_assets/_images/template/logo-1000.png"/></div><img class="fullin tira" src="https://members.beyond-experience.com/_assets/_images/popupInventarioRegina/cintillo.jpg"/><div class="fondopopup"><span class="titulopop">Congratulations!</span><span class="parrafopop">Your reservation has been confirmed. Shortly, your Personal Concierge will contact you with more details.<br /><br />Thank you for your preference.</span><div class="centerpop"><div class="iblockpop w70"><img class="telefonopop" src="https://members.beyond-experience.com/_assets/_images/popupInventarioRegina/ico-telefono.png"/><span class="numerospop">	<strong>USA, CAN: 1-888-963-7689<br>Mexico: 1-800-272-0294</strong></span></div></div></div></div>',
                {
                    'autoDimensions': false,
                    'width': 350,
                    'height': 'auto',
                    'transitionIn': 'none',
                    'transitionOut': 'none'
                }
                ).trigger('#chronoIn');
            }
        else{
        	$.fancybox(
				'<link href="' + pathname + '/_assets/_css/popupInventarioRegina.css?x=' + (Math.floor(Math.random() * 100)) +'" type="text/css" rel="stylesheet">'+
				'<div id="InventarioRegina" class="modal chrono-modal">'+
					'<div class="headerImagen">'+
						'<img src="' + pathname + '/_assets/_images/template/logo-1000.png"/>'+
					'</div>'+	
					'<div class="fondopopup">'+
						'<span class="titulopop">Congratulations!</span>'+
						'<span class="parrafopop">Your reservation has been confirmed. Shortly, your Personal Concierge will contact you with more details.<br /><br />Thank you for your preference.</span>'+
						'<div class="iblockpop w70">'+
							'<img class="telefonopop" src="https://members.beyond-experience.com/_assets/_images/popupInventarioRegina/ico-telefono.png"/>'+
							'<span class="numerospop"></span>'+
						'</div>'+
					'</div>'+
				'</div>', 
                //'<div id="InventarioRegina" class="modal chrono-modal"><div class="fullin colorlogo"><img class="logopopregina" src="https://members.beyond-experience.com/_assets/_images/template/logo-1000.png"/></div><img class="fullin tira" src="https://members.beyond-experience.com/_assets/_images/popupInventarioRegina/cintillo.jpg"/><div class="fondopopup"><span class="titulopop">Congratulations!</span><span class="parrafopop">Your reservation has been confirmed. Shortly, your Personal Concierge will contact you with more details.<br /><br />Thank you for your preference.</span><div class="centerpop"><div class="iblockpop w70"><img class="telefonopop" src="https://members.beyond-experience.com/_assets/_images/popupInventarioRegina/ico-telefono.png"/><span class="numerospop"></span></div></div></div></div>',
                {
                    'autoDimensions': false,
                    'width': 350,
                    'height': 'auto',
                    'transitionIn': 'none',
                    'transitionOut': 'none'
                }
			).trigger('#chronoIn');
		}
        

    } else {
        console.log("no existe");
    }
});
//if ( $("#in").length > 0 ) {
