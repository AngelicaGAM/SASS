$(document).ready(function() {
  //caja de reserva scroll
  $(window).on("resize", function() {
    hideFilter();
  });
  hideFilter();
  function hideFilter() {
    var width = $(window).width();
    var altura = 400;

    if (width > 992) {
      $(".botonLupa2").hide();
      $(window).on("scroll", function() {
        if ($(window).scrollTop() > altura) {
          /*   $('#cajaReserva').addClass('menu-fixed'); */
          /*  $('#cajaReserva').addClass('dib'); */
          $(".botonLupa").hide();
          $(".botonLupa2").hide();
          //muestra el boton
          $(".VermasDestinos").addClass("vermasFixed");
        } else {
          /*    $('#cajaReserva').removeClass('menu-fixed');
                $('#cajaReserva').removeClass('dib'); */
          $(".botonLupa").hide();
          $(".botonLupa2").hide();
          $(".VermasDestinos").removeClass("vermasFixed");
        }
      });
    } else {
      $(".botonLupa2").show();
      $(window).on("scroll", function() {
        if ($(window).scrollTop() > altura) {
          /*    $('#cajaReserva').removeClass('menu-fixed');
                $('#cajaReserva').removeClass('dib'); */
          $(".botonLupa").show();
          $(".botonLupa2").hide();
          $("#cajaReserva").addClass("md-modal");
          $(".formBuscador").addClass("md-content");

          $(".VermasDestinos").addClass("vermasFixed");
        } else {
          $(".botonLupa").hide();
          $(".botonLupa2").show();
          $(".VermasDestinos").removeClass("vermasFixed");
          $("#cajaReserva").removeClass("md-modal");
          $(".formBuscador").removeClass("md-content");
          if ($(".md-show").length) {
            $("#cajaReserva").addClass("md-modal");
            $(".formBuscador").addClass("md-content");
          }
        }
      });
    }
  }

  //modal filter
  $(function() {
    $(".md-trigger").on("click", function() {
      $(".md-modal").addClass("md-show");
    });

    $(".md-close").on("click", function() {
      $(".md-modal").removeClass("md-show");
      $("#cajaReserva").removeClass("md-modal");
      $(".formBuscador").removeClass("md-content");
    });

    $(".botonLupa2").on("click", function() {
      $("#cajaReserva").addClass("md-modal");
      $("#cajaReserva").addClass("md-show");
    });
  });

  //boton top page
  var btnTop = $("#buttonTop");
  $(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
      btnTop.addClass("showBoton");
    } else {
      btnTop.removeClass("showBoton");
    }
  });

  btnTop.on("click", function(e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "300");
  });
});
