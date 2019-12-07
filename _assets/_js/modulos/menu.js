$(document).ready(function() {
  if ($(window).width() > 992) {
    $("nav li.dropdown").hover(
      function() {
        $(this)
          .find(".dropdown-menu")
          .addClass("show")
          .stop(true, true)
          .delay(200)
          .fadeIn(500);
      },
      function() {
        $(this)
          .find(".dropdown-menu")
          .removeClass("show")
          .stop(true, true)
          .delay(200)
          .fadeOut(500);
      }
    );
  } else {
    var fixHeight = function() {
      $(".navbar-nav").css(
        "max-height",
        document.documentElement.clientHeight - 150
      );
    };
    fixHeight();
    $(window).resize(function() {
      fixHeight();
    });

    $(".navbar .navbar-toggler").on("click", function() {
      fixHeight();
    });
  }

  $(".navbar-toggler, .overlayMenu").on("click", function() {
    $(".mobileMenu, .overlayMenu").toggleClass("open");
    $(".burger-menu").toggleClass("menu-on");
    $("body").toggleClass("fixedBody");
  });
  $(".closeMenuMobile").on("click", function() {
    $(".mobileMenu, .overlayMenu").removeClass("open");
    $(".burger-menu").removeClass("menu-on");
    $("body").removeClass("fixedBody");
  });

  //caret
});
//icon menu
/* $(function(){
    $(".burger-menu").click(function(){
        $(this).toggleClass("menu-on");      
    }); 
}); */
$(window).scroll(function() {
  var iHeight = $("body").height();
  if ($(window).scrollTop() >= 450) {
    $("header").addClass("fixed-header");
    /* $('#cintilloMFA').css('top', '78px'); */
  } else {
    $("header").removeClass("fixed-header");
    /*       $('#cintilloMFA').css('top', 'auto'); */
  }
});

//slider menu bottom desktop
$(function() {
  $(".menuMini").click(function() {
    $(".menuHide").slideToggle();
  });
  $(".cierroMini").click(function() {
    $(".menuHide").slideToggle();
  });
});
//slider menu bottom
$(function() {
  $("#menu-cuadro").click(function() {
    $(".showMenuBottom").slideToggle();
    $(".navigation-txt").slideToggle();
  });
});

$(document).ready(function() {
  //active menu section

  $("#byebye .nav-item  a").each(function() {
    if (window.location == $(this).attr("href")) {
      $(this).addClass("activ0");
    }
  });

  $(".cambiaIdioma").bind("change", function() {
    // bind change event to select
    console.log("carga");
    var url = $(this).val(); // get selected value
    if (url != "") {
      // require a URL
      window.location = url; // redirect
    }
    return false;
  });
});

//chat

var openWidget = function() {
  if ($("#fc_frame").is(":visible")) {
    $("#fc_frame").hide();
    window.fcWidget.close();
  } else {
    $("#fc_frame").show();
    window.fcWidget.open();
  }
};
