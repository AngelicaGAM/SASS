$(document).ready(function (e)
{
    $("#alertFolio").hide();
    $(document).on("click", "#enviarEl", function (e)
    {
        var folio = $("#folio").prop("value");
        var id = $("#idSemana").prop("value");

        if (folio != "")
        {
            //genero correo 
            $.ajax({
                url: "_assets/_controllers/generaNotificacionSP.php",
                type: "POST",
                data: {
                    semanaF: id,
                    folio: folio
                },
                success: function (dat) {
                    console.log(dat);
                    var data = dat.split("_");
                    console.log(data);
                    if (data[0] == "ok") {
                        $(".elemnto").css("padding-top", "50px");
                        $(".elemnto").css("height", "310px");
                        $(".conteF").css({ width: "100%", textAlign: "center", color: "#003d4c" });
                        //$("#alertFolio").show();
                        $(".conteF").html('<span class="aceptado">Congratulations! <br> Your reservation has been processed successfully. You will receive an email with the confirmation number shortly.</span>');
                    }
                    else if (data[0] == "okc" || data[0] == "c" )
                    {
                        if(data[1]!=0){
							
                            console.error("hay cuota y es: "+data[1]);
							// window.parent.$("#certificate_"+id).prop('checked' , false);
							// //console.error("data1 trae: "+data[1]);
							// window.parent.$("form#"+id).append('<input type="hidden" name="gm-folioPW" class="dele" value=" '+data[1]+"__"+folio+"__"+id+' "/>');
							// window.parent.$("form#"+id+" span.boton").trigger("click");
                            // window.parent.$("form#"+id+" input.dele[type='hidden']").remove().delay(3000);
                                //window.parent.$.fancybox.close();
							window.parent.$("#certificate_"+id).prop('checked' , false);
							window.parent.$("form#"+id).append('<input type="hidden" name="gm-folioPW" class="dele" value=" '+data[1]+"__"+folio+"__"+id+' "/>');
                            window.parent.$("form#"+id+" span.boton").submit();
                            window.parent.$("form#"+id+" input.dele[type='hidden']").remove().delay(3000);
                            window.parent.$.fancybox.close();
						} else {
                            console.error("no hay cuota: "+data[1]);
							$(".elemnto").css("padding-top", "50px");
							$(".elemnto").css("height", "310px");
							$(".conteF").css({ width: "100%", textAlign: "center", color: "#003d4c" });
							//$("#alertFolio").show();
							$(".conteF").html('<span class="aceptado">Congratulations! <br> Your reservation has been processed successfully. You will receive an email with the confirmation number shortly.</span>');
                        }
                    }
                    else if (data[0] == "") {
                        //console.log("novalido");
                        $("#folio").prop('value', '');
                        $("#alertFolio").show();
                        $("#folio").prop('value', '');
                        $("#alertFolio").html('The folio you entered is incorrect. Please check and try again.');

                        $("#folio").addClass('warning2');
                    } else if (data[0] == "checkin") {
                        //console.log("novalido");
                        $("#alertFolio").show();
                        $("#folio").prop('value', '');
                        $("#alertFolio").html('The validity of this certificate is not within the dates of the chosen lodging.');
                        $("#folio").addClass('warning2');
                    } else if (data[0] == "nouso") {
                        $.ajax({
                            url: "_assets/_controllers/fechafolio.php",
                            type: "POST",
                            data: {
                                folio: folio
                            },
                            success: function (dato) {
                                fecha = dato;
                                $("#alertFolio").show();
                                $("#folio").prop('value', '');
                                $("#alertFolio").html('This certificate is not yet in period of use. It can be applied from:' + fecha);

                                $("#folio").addClass('warning2');
                            }
                        });
                        //console.log("novalido");
                    } else if (data[0] == "nofinal") {
                        //console.log("novalido");
                        $("#alertFolio").show();
                        $("#folio").prop('value', '');
                        $("#alertFolio").html('This certificate has expired. Please enter a valid certificate.');
						$("#folio").addClass('warning2');
					} else if (data[0] == "comprada") {
						$(".parrafopop").html('<b>NO LONGER AVAILABLE</b>');
						$(".parrafopop").css({ width: "100%", padding: "3% 0" });
						$(".elemnto").css("padding-top", "50px");
						$(".elemnto").css("height", "310px");
						$(".conteF").css({ width: "100%", textAlign: "center", color: "#003d4c" });
						//$("#alertFolio").show();
						$(".conteF").html('<span class="aceptado">Dear member, <br> We regret to inform you that this week has been booked already by another member a few moments ago, so we kindly ask you to please contact us via Telephone.We will be pleased to provide you all our wide variety of available options so you can enjoy all the benefits of Beyond Experience. <br> We apologize for any inconvenience this may have caused. <br> <b>MX 01 800 845 03 46 | USA 1 800 935 2365</b></span>');
					}
                }
            });

        }
        else {
            $("#alertFolio").show();
            $("#folio").prop('value', '');
            $("#alertFolio").html('Enter Certificate Folio');
            $("#folio").addClass('warning2');

        }
        setTimeout(function () { $("#alertFolio").hide(); }, 5000);
        /*
    }
});*/
    });

});
