// Función que al pulsar sbre el botón con clase hBack, vuelve a la página anterior 
$("#back-btn").on("click", function(e){
    e.preventDefault();
    window.history.back();
});

// Pop up para eliminar la foto
jQuery(document).ready(function($){
	//open popup
	$('.cd-popup-trigger').on('click', function(event){
		event.preventDefault();
		$('.cd-popup').addClass('is-visible');
	});
	
	//close popup
	$('.cd-popup').on('click', function(event){
		if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
			event.preventDefault();
			$(this).removeClass('is-visible');
		}
	});
	//close popup when clicking the esc keyboard button
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$('.cd-popup').removeClass('is-visible');
	    }
    });
});

$('#follow-btn').click(function () {
	$(this).text(function (_, text) {
	  return text === "Dejar de seguir" ? "Seguir" : "Dejar de seguir";
	});
	if ($(this).text() == "Seguir") {
	  $(this).removeClass('unfollow');
	} else if ($(this).text() == "Dejar de seguir") {
	  $(this).addClass('unfollow');
	}
  });