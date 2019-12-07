$(document).ready(function(e)
{

	$('.fancybox').fancybox();
	$("#medio table tr").on("click",function()
	{
		var puerto= $(this).prop("id");
		$.ajax(
		{
			url:"_assets/_controllers/getGalItinerario.php",
			type:"POST",
			dataType:"json",
			data:{ id: puerto },
			success: function(data)
			{
				$.fancybox(data); 
				$.fancybox.open();
			}
		});
	});
});