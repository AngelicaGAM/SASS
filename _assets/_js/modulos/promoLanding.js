// JavaScript Document


$(document).ready(function(e){
	
	var fancy = $(".fancyBReg");
		
		//$(".fancyB").fancybox({
		fancy.fancybox({
				padding:0,
				margin:0,
				autoSize:true,
				width:450,
				height:600,
				closeBtn:true,
				
				helpers:{
							overlay:{
										css:{ "background":"rgba(0,84,100,0.9)" },
										closeClick: false
									}
						},
				afterClose:function(){
					alert("clie");
					//window.location="index.php";
					console.log("entra y actualiza");
					//$("#header").html(param[1]);
					window.location="perfil.php";
				}
		});
		
		
		
		
		// cierre del fancy, redirecciono a perfil 
		$(".fancyBReg").click(function(){
			if(location.protocol=="https:")
			{
				$.ajax({
						url:"../../_assets/_controllers/urlLoginAnterior.php",
						data:{
								op:1,
								url:window.location.href
							 },
						success: function(data){
								var d = data.split(".-,");
								if(data==="")
								{
									parent.jQuery.fancybox.close(true);
									window.location="https://members.beyond-experience.com/es/index.php?login=on";
								}	
								
						}
													
				});	
													
				
			}
		});
	
	
	
    
});