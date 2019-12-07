function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var parms = query.split('&');
    for (var i = 0; i < parms.length; i++) {
        var pos = parms[i].indexOf('=');
        if (pos > 0 && variable == parms[i].substring(0, pos)) {
            return parms[i].substring(pos + 1);;
        }
    }
    return "";
}
$(document).ready(function(e) {
	var claveCliente = getQueryVariable("clave");
	var lang = getQueryVariable("lang");
	var mfalink = ((lang == "es") ? 'es/MFA.php' : 'MFA.php');
	
	data=0;
	$.ajax({
		url:"_assets/_controllers/logueoClave.php",
		data:{ clave: claveCliente},
		type:"POST",
		dataType:"text",
		success: function(data){ 
			console.log(data);
			if(data=="ok"){
				console.log(data);
				localStorage.setItem("MFAOK",1);
				$.ajax({
					url:"_assets/_controllers/logueoLogMFA.php",
					data:{ clave: claveCliente},
					type:"POST",
					dataType:"text",
					success: function(data){ 
						console.log(data);
						window.location.href = mfalink;
					}
				});
				
			}
		}
	});

});
