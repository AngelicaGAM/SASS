


$(document).on("click","#click2call-icono",function(){
    $.fancybox.open({
      type:'iframe',
      src:pathname+"/click2callPopRes.php",
      iframe : {
        css : {
            width : '600px'
        }
    }
      ///validar si el usuario tiene 
    });

});
