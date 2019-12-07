$(document).ready(function(e){
	$(document).on("click","#botonCerrarPromo",function(){
		$.ajax({
			url:"../../_assets/_controllers/promoPop.php",
			type:"POST",
			data: { reservara : 6},
			dataType:"json",
			success: function(data){				
				if( data==="ok" ) {
					parent.$.fancybox.close();
				}	
			}
		});
	});
	$(document).on("click","#botonReservaPromo",function(){
		$.ajax({
			url:"../../_assets/_controllers/promoPop.php",
			type:"POST",
			data: { reservara : 5 },
			dataType:"json",
			success: function(data) {
				// alert(data);			
				if(data==="ok") {
					parent.$.fancybox({
						type: 'iframe',
						//'href: 'https://members.beyond-experience.com/_assets/_popup/promoPopUp.php',
						href: '_assets/_popup/formPromo.php?origen=popup',
						autoDimensions: false,
						autoResize: true,
						autoCenter: true,
						width: 970,
						height: 700,
						transitionIn: 'none',
						transitionOut: 'none',
						closeBtn:false,
						helpers   : { 
							overlay : { closeClick: false } 
						},
						keys : {
							close : null // default value = [27]
						}
					});
				}	
			}
		});
	});
});