$(document).ready(function(e) {

   
	 /// get idioma
	var idioma="";
	$.ajax({
		url:"_assets/_controllers/getLang.php",
		data:{ page: "semanasInventarioRegina"},
		type:"POST",
		dataType:"json",
		async:false,
		success: function(data){
		   idioma =eval(data);
		   //return idi;
		}
	});

	$(document).on("click",".link",function(e){
		let $val = $(this).data("value");
		window.location.href = "fichaRegina.php?x="+$val;
	});

});