function load()
{
	var contador = 0;
	$("body").find("form").find("div.mensaje").each( function( e )
	{ 
		if( $(this).text() !="" ){ contador = 1 ; }
	});
	
	if( contador == 1 )
	{
		$("body").find("div.cuadroDetalles").find("div#botoncitos > a").each( function( e )
		{
			if( $(this).attr("href") == "/reservacion/checkout.php")
			{
				$(this).empty();
			}
		});
	}
}
window.onload = load;