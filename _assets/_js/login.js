$(document).ready( 
   
    function(){
        
        $("#access").on("click",function(){
            
            var ban=false;
            
            if(ban)
            {
                $.ajax({
                    url:"_assets/_controllers/logueo.php",
                    type:"POST",
                    data:{
                        user: $("#user").val(),
                        pass: $("#pass").val()
                    }

                }).done(function(data){
                    data = data.split(".-,");
                    console.log(data);
                    if(data[0]=="ok"){
                        window.location="inicio.php";
                    }else{
                        $("#datoscorrectos").css("display","block");
                        $("#datoscorrectos").css("display","block");
                    }
                });
            }
        });
});