$(document).ready(function(){
$(window).scroll(function(){
    if ($(window).scrollTop() >= 97) {
        $('header').addClass('fixed-header');
    }
    else {
        $('header').removeClass('fixed-header');
        
    }
});

$(document).on("keyup", "#myInput",function(e)
{
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});



//slider menu bottom desktop
$(function(){
    $(".menuMini").click(function(){
        $(".menuHide").slideToggle();
      
    }); 
});
//slider menu bottom 
$(function(){
    $("#menu-cuadro").click(function(){
        $(".showMenuBottom").slideToggle();
        $(".navigation-txt").slideToggle();
      
    }); 
});
//icon menu
$(function(){
    $(".burger-menu").click(function(){
        $(this).toggleClass("menu-on");      
    }); 
});

});