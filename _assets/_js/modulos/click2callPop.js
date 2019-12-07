


$(document).on("click","#click2call-icono",function(){
      $.fancybox({
        overflow:'hidden',
        margin:0,
        //padding:0,
        autoSize:false,
        width:480,
        height:550,
        closeBtn:true,
        scrolling : 'no',
        

        

        type:'iframe',
        href:pathname+"/click2callPop.php",
        helpers:{
            overflow:'hidden',
          overlay:{
            overflow:'hidden',
            css:{
              overflow:'hidden',

              //"background":"rgba(0,84,100,0.9)",
              closeClick : true,
             // "border-radius":"0"
            },
          },
        }
        ///validar si el usuario tiene 
      });

  });
